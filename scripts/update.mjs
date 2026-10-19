import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {destinations} from './install.mjs';
import {validate} from './validate.mjs';
import {bundleEntries,manifestPath,repository,exists,safePath,projectRoot,inventory,desiredState,readManifest,fileHash,linkMatches,installationStatus,hash} from './state.mjs';

const defaultSource=fileURLToPath(new URL('..',import.meta.url));
function oldState(root,{agent,baseline}) {
  const recorded=readManifest(root);
  if(recorded) {
    if(agent&&agent!==recorded.agent)throw Error('Agent differs from installed manifest; update does not switch agents.');
    if(baseline)throw Error('--baseline is only for untracked legacy installations.');
    return recorded;
  }
  if(!exists(safePath(root,'.engineering-kit')))throw Error('No toolkit installation found. Run init first.');
  if(!agent||!baseline)throw Error('Legacy update requires --agent and --baseline pointing to the original, unmodified toolkit source.');
  const original=fs.realpathSync(baseline);const snapshot=inventory(original);
  if(path.resolve(original)===path.resolve(root,'.engineering-kit'))throw Error('Baseline must be an independent original source, not the installed bundle.');
  const pkg=JSON.parse(fs.readFileSync(safePath(root,'.engineering-kit/package.json'),'utf8'));
  if(pkg.version!==snapshot.version)throw Error('Legacy baseline version does not match the installed bundle.');
  let mode='copy';
  if(agent==='codex') {
    const skills=[...new Set(Object.keys(snapshot.files).filter(n=>n.startsWith('skills/')).map(n=>n.split('/')[1]))];
    const linked=skills.filter(skill=>{const file=safePath(root,`${destinations.codex}/${skill}`,{leafLink:true});return exists(file)&&fs.lstatSync(file).isSymbolicLink();});
    if(linked.length&&linked.length!==skills.length)throw Error('Mixed legacy links/copies need manual reconciliation before update.');
    if(linked.length)mode='link';
  }
  return desiredState({agent,mode,snapshot,source:original});
}
export function planUpdate({target,source=defaultSource,agent,baseline}) {
  const root=projectRoot(target);source=fs.realpathSync(source);
  if(root===source||root.startsWith(source+path.sep))throw Error('Choose a project outside the toolkit source directory.');
  const installedBundle=path.join(root,'.engineering-kit');
  if(source===installedBundle||source.startsWith(installedBundle+path.sep))throw Error('Incoming source must be independent of the installed bundle. Run a newer external CLI or pass --source.');
  const snapshot=inventory(source);
  const validation=validate(source,{checkTree:false});
  if(validation.errors.length)throw Error('Incoming toolkit validation failed: '+validation.errors.join('; '));
  for(const name of bundleEntries)if(!exists(path.join(source,name)))throw Error(`Missing package resource: ${name}`);
  const previous=oldState(root,{agent,baseline});
  const next=desiredState({agent:previous.agent,mode:previous.nativeMode,snapshot,source});
  if(compareVersions(next.source.version,previous.source.version)<0)throw Error('Incoming version is older than the installed toolkit. Downgrades are not supported.');
  const operations=[];const conflicts=[];const preserved=[];
  for(const name of new Set([...Object.keys(previous.files),...Object.keys(next.files)])) {
    let current;
    try {current=fileHash(root,name);}catch(e){conflicts.push({path:name,reason:e.message});continue;}
    const before=previous.files[name]??null;const after=next.files[name]??null;
    if(current===after)continue;
    if(before===after) {preserved.push(name);continue;}
    if(current!==before) {conflicts.push({path:name,reason:'Local content differs from the recorded baseline and incoming version.'});continue;}
    const relative=name.startsWith('.engineering-kit/')?name.slice('.engineering-kit/'.length):'skills/'+name.split('/').slice(2).join('/');
    operations.push({path:name,action:after===null?'remove':before===null?'add':'change',before,after,source:after===null?null:safePath(source,relative)});
  }
  for(const name of new Set([...Object.keys(previous.links),...Object.keys(next.links)])) {
    const before=previous.links[name];const after=next.links[name];
    try {
      const file=safePath(root,name,{leafLink:true});
      if(exists(file)) {
        if(!before||!linkMatches(root,name,before)) {conflicts.push({path:name,reason:'Native skill path is not the recorded toolkit link.'});continue;}
        if(before===after)continue;
        operations.push({path:name,action:'unlink',target:before});
      }
      if(after)operations.push({path:name,action:'link',target:after});
    }catch(e){conflicts.push({path:name,reason:e.message});}
  }
  return {root,source,previous,next,operations,conflicts,preserved,legacy:!readManifest(root),from:previous.source.version,to:next.source.version};
}
function removeLink(file) {if(process.platform==='win32')fs.rmdirSync(file);else fs.unlinkSync(file);}
function createLink(root,operation) {
  const file=safePath(root,operation.path);fs.mkdirSync(path.dirname(file),{recursive:true});
  const target=safePath(root,operation.target);
  fs.symlinkSync(process.platform==='win32'?target:path.relative(path.dirname(file),target),file,process.platform==='win32'?'junction':'dir');
}
function replaceFile(backup,stored,file) {
  // Publish a new inode so existing hardlinks cannot redirect writes elsewhere.
  const temporary=path.join(backup,`publish-${crypto.randomUUID()}`);
  try {fs.copyFileSync(path.join(backup,stored),temporary,fs.constants.COPYFILE_EXCL);fs.renameSync(temporary,file);}
  finally {if(exists(temporary))fs.unlinkSync(temporary);}
}
export function updateWorkspace(options) {
  if(options.dryRun)return planUpdate(options);
  const root=projectRoot(options.target);const lock=safePath(root,'.engineering-kit-update.lock');
  let handle;
  try {handle=fs.openSync(lock,'wx');}catch(e){if(e.code==='EEXIST')throw Error('An update lock exists. Ensure no updater is running; inspect recovery notes before removing a stale lock.');throw e;}
  let backup=null;const applied=[];let plan;
  try {
    fs.writeFileSync(handle,JSON.stringify({pid:process.pid,startedAt:new Date().toISOString()})+'\n');
    plan=planUpdate(options);
    if(plan.conflicts.length)return plan;
    const current=readManifest(root);
    if(!plan.operations.length&&current?.source.contentHash===plan.next.source.contentHash)return {...plan,unchanged:true};
    const id=new Date().toISOString().replace(/[:.]/g,'-')+'-'+crypto.randomUUID();
    const relative=`.engineering-kit-backups/${id}`;
    backup=safePath(root,relative);fs.mkdirSync(backup,{recursive:true});
    const record={schemaVersion:1,state:'preparing',from:plan.from,to:plan.to,operations:plan.operations.map(({source,...op})=>op),hadManifest:!!current};
    fs.writeFileSync(path.join(backup,'recovery.json'),JSON.stringify(record,null,2)+'\n');
    // Stage every incoming byte and preserve every overwritten/deleted file before mutation.
    const operations=[...plan.operations,{path:manifestPath,action:current?'change':'add',manifest:true,before:fileHash(root,manifestPath)}];
    for(const [index,operation] of operations.entries()) {
      operation.index=index;
      if(!['link','unlink'].includes(operation.action)) {
        const file=safePath(root,operation.path);
        if(exists(file))fs.copyFileSync(file,path.join(backup,`old-${index}`),fs.constants.COPYFILE_EXCL);
        if(operation.action!=='remove') {
          const bytes=operation.manifest?Buffer.from(JSON.stringify(plan.next,null,2)+'\n'):fs.readFileSync(operation.source);
          if(!operation.manifest&&hash(bytes)!==operation.after)throw Error('Source changed while preparing update. Retry from an unchanged source.');
          fs.writeFileSync(path.join(backup,`new-${index}`),bytes,{flag:'wx',mode:operation.manifest?0o644:fs.statSync(operation.source).mode&0o777});
        }
      }
    }
    record.operations=operations.map(({source,...op})=>op);record.state='applying';
    fs.writeFileSync(path.join(backup,'recovery.json'),JSON.stringify(record,null,2)+'\n');
    for(const operation of operations) {
      const file=safePath(root,operation.path,{leafLink:operation.action==='unlink'});
      if(operation.action==='link') {
        if(exists(file))throw Error(`Destination appeared during update: ${operation.path}`);
      } else if(operation.action==='unlink') {
        if(!linkMatches(root,operation.path,operation.target))throw Error(`Link changed during update: ${operation.path}`);
      } else if(fileHash(root,operation.path)!==operation.before)throw Error(`File changed during update: ${operation.path}`);
      applied.push(operation);
      if(operation.action==='link')createLink(root,operation);
      else if(operation.action==='unlink')removeLink(file);
      else if(operation.action==='remove')fs.unlinkSync(file);
      else {fs.mkdirSync(path.dirname(file),{recursive:true});replaceFile(backup,`new-${operation.index}`,file);}
    }
    record.state='complete';fs.writeFileSync(path.join(backup,'recovery.json'),JSON.stringify(record,null,2)+'\n');
    return {...plan,backup:relative};
  }catch(error) {
    const rollbackErrors=[];
    for(const operation of applied.reverse()) {
      try {
        const file=safePath(root,operation.path,{leafLink:operation.action==='link'});
        if(operation.action==='link') {if(exists(file))removeLink(file);}
        else if(operation.action==='unlink')createLink(root,operation);
        else if(exists(path.join(backup,`old-${operation.index}`)))replaceFile(backup,`old-${operation.index}`,file);
        else if(exists(file))fs.unlinkSync(file);
      }catch(e){rollbackErrors.push(e.message);}
    }
    if(backup) {
      try {const file=path.join(backup,'recovery.json');const record=JSON.parse(fs.readFileSync(file,'utf8'));record.state=rollbackErrors.length?'rollback-incomplete':'rolled-back';record.rollbackErrors=rollbackErrors;fs.writeFileSync(file,JSON.stringify(record,null,2)+'\n');}catch{}
    }
    throw Error(`${error.message}${backup?` Backup: ${backup}. ${rollbackErrors.length?'Rollback incomplete; inspect recovery.json.':'Applied changes rolled back.'}`:''}`);
  }finally {fs.closeSync(handle);fs.unlinkSync(lock);}
}

// Strict SemVer comparison keeps prereleases below their corresponding stable release.
export function compareVersions(a,b) {
  const parse=value=>{const m=/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.exec(value);if(!m||m[4]?.split('.').some(id=>/^0\d+$/.test(id)))throw Error(`Unsupported version: ${value}`);return m;};
  const x=parse(a),y=parse(b);
  for(let i=1;i<=3;i++)if(BigInt(x[i])!==BigInt(y[i]))return BigInt(x[i])>BigInt(y[i])?1:-1;
  if(x[4]===y[4])return 0;
  if(!x[4]||!y[4])return x[4]?-1:1;
  const left=x[4].split('.'),right=y[4].split('.');
  for(let i=0;i<Math.max(left.length,right.length);i++) {
    if(left[i]===right[i])continue;
    if(left[i]===undefined||right[i]===undefined)return left[i]===undefined?-1:1;
    const ln=/^\d+$/.test(left[i]),rn=/^\d+$/.test(right[i]);
    if(ln&&rn)return BigInt(left[i])>BigInt(right[i])?1:-1;
    if(ln!==rn)return ln?-1:1;
    return left[i]>right[i]?1:-1;
  }
  return 0;
}
export async function checkUpdates({target,source,fetchImpl=fetch}) {
  const status=installationStatus({target});
  if(source) {
    const incoming=inventory(fs.realpathSync(source));
    return {installed:status.version,available:incoming.version,updateAvailable:compareVersions(incoming.version,status.version)>0,contentChanged:status.source?status.source.contentHash!==desiredState({agent:'portable',snapshot:incoming,source}).source.contentHash:null,channel:'local'};
  }
  const response=await fetchImpl(`https://api.github.com/repos/${repository}/releases/latest`,{headers:{Accept:'application/vnd.github+json','User-Agent':'fullstack-ai-engineering-kit'},signal:AbortSignal.timeout(10000),redirect:'error'});
  if(response.status===404)return {installed:status.version,available:null,updateAvailable:false,channel:'github',message:'No public stable release found (or repository unavailable). A git push alone is not a release.'};
  if(!response.ok)throw Error(`GitHub update check failed (HTTP ${response.status}). No project files changed. Retry later; rate limits or network access may apply.`);
  const release=await response.json();
  if(release.draft||release.prerelease||typeof release.tag_name!=='string')throw Error('GitHub returned an unsupported release.');
  const version=release.tag_name.replace(/^v/,'');
  return {installed:status.version,available:version,updateAvailable:compareVersions(version,status.version)>0,channel:'github',releaseUrl:`https://github.com/${repository}/releases/tag/${encodeURIComponent(release.tag_name)}`,message:'Read the release notes. Run the selected newer CLI package to preview and apply its local source.'};
}
