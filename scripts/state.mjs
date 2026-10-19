import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {destinations} from './install.mjs';

export const bundleEntries=['README.md','LICENSE','CHANGELOG.md','AGENTS.md','CLAUDE.md','CONTRIBUTING.md','package.json','bin','scripts','skills','templates','checklists','references','examples','docs','.github','.cursor'];
export const manifestPath='.engineering-kit/installation.json';
export const agents=['portable',...Object.keys(destinations)];
export const repository='JericoGarcia21/fullstack-ai-engineering-kit';
export const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export function exists(file) {try {fs.lstatSync(file);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}}
export function relativePath(value) {
  if(typeof value!=='string'||!value||value.includes('\\')||value.includes(':')||value.includes('\0')||value.split('/').some(p=>!p||p==='.'||p==='..'||/[. ]$/.test(p))||path.isAbsolute(value))throw Error(`Unsafe relative path: ${value}`);
  return value;
}
export function safePath(root,relative,{leafLink=false}={}) {
  relativePath(relative);let current=root;const parts=relative.split('/');
  for(let i=0;i<parts.length;i++) {
    current=path.join(current,parts[i]);
    if(exists(current)) {
      const stat=fs.lstatSync(current);
      if(stat.isSymbolicLink()&&!(leafLink&&i===parts.length-1))throw Error(`Refusing symlink destination: ${relative}`);
      if(i<parts.length-1&&!stat.isDirectory())throw Error(`Path parent is not a directory: ${relative}`);
    }
  }
  return current;
}
export function projectRoot(target) {
  if(!path.isAbsolute(target)||!fs.existsSync(target)||!fs.statSync(target).isDirectory())throw Error('Target must be an existing project directory.');
  return fs.realpathSync(target);
}
export function inventory(root) {
  const result={};
  function walk(relative) {
    const file=safePath(root,relative);const stat=fs.lstatSync(file);
    if(stat.isDirectory())for(const name of fs.readdirSync(file).sort())walk(`${relative}/${name}`);
    else if(stat.isFile())result[relative]=hash(fs.readFileSync(file));
    else throw Error(`Unsupported package entry: ${relative}`);
  }
  for(const entry of bundleEntries)if(exists(path.join(root,entry)))walk(entry);
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  if(pkg.name!=='fullstack-ai-engineering-kit'||!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(pkg.version)||!Object.keys(result).some(k=>k.startsWith('skills/')))throw Error('Source is not a versioned engineering toolkit.');
  return {files:result,version:pkg.version};
}
export function sourceIdentity(source,snapshot) {
  const pkg=JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8'));
  let revision=/^[a-f0-9]{40}$/i.test(pkg.gitHead??'')?pkg.gitHead:null;
  if(!revision&&exists(path.join(source,'.git'))) {
    const git=spawnSync('git',['-C',source,'rev-parse','HEAD'],{encoding:'utf8',windowsHide:true});
    if(git.status===0&&/^[a-f0-9]{40}$/i.test(git.stdout.trim()))revision=git.stdout.trim();
  }
  return {version:snapshot.version,revision,contentHash:hash(JSON.stringify(Object.entries(snapshot.files).sort(([a],[b])=>a<b?-1:a>b?1:0)))};
}
export function desiredState({agent,mode='copy',snapshot,source}) {
  if(!agents.includes(agent)||!['copy','link'].includes(mode)||mode==='link'&&agent!=='codex')throw Error('Invalid agent or native skill mode.');
  const files={};const links={};
  for(const [name,digest] of Object.entries(snapshot.files)) {
    files[`.engineering-kit/${name}`]=digest;
    if(agent!=='portable'&&name.startsWith('skills/')) {
      const [,skill,...rest]=name.split('/');
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill)||!rest.length)throw Error(`Invalid skill path: ${name}`);
      if(mode==='link')links[`${destinations[agent]}/${skill}`]=`.engineering-kit/skills/${skill}`;
      else files[`${destinations[agent]}/${skill}/${rest.join('/')}`]=digest;
    }
  }
  return {schemaVersion:1,agent,nativeMode:mode,source:sourceIdentity(source,snapshot),installedAt:new Date().toISOString(),files,links};
}
function ownedFile(name,agent) {
  relativePath(name);
  if(name===manifestPath)return false;
  if(name.startsWith('.engineering-kit/'))return bundleEntries.includes(name.split('/')[1])&&name.split('/').length>=2;
  return agent!=='portable'&&name.startsWith(destinations[agent]+'/')&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name.split('/')[2]??'')&&name.split('/').length>=4;
}
export function readManifest(root) {
  const file=safePath(root,manifestPath);
  if(!exists(file))return null;
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  if(data.schemaVersion!==1||!agents.includes(data.agent)||!['copy','link'].includes(data.nativeMode)||data.nativeMode==='link'&&data.agent!=='codex'||!data.source||typeof data.source.version!=='string'||!/^[a-f0-9]{64}$/.test(data.source.contentHash??'')||data.source.revision!==null&&!/^[a-f0-9]{40}$/i.test(data.source.revision??'')||!data.files||Array.isArray(data.files)||typeof data.files!=='object'||!data.links||Array.isArray(data.links)||typeof data.links!=='object')throw Error('Invalid installation manifest.');
  for(const [name,digest] of Object.entries(data.files))if(!ownedFile(name,data.agent)||!/^([a-f0-9]{64})$/.test(digest))throw Error(`Invalid manifest file: ${name}`);
  for(const [name,target] of Object.entries(data.links)) {
    relativePath(name);relativePath(target);
    const skill=name.split('/')[2];
    if(data.agent!=='codex'||data.nativeMode!=='link'||name!==`${destinations.codex}/${skill}`||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill)||target!==`.engineering-kit/skills/${skill}`)throw Error(`Invalid manifest link: ${name}`);
  }
  return data;
}
export function writeManifest(root,data) {
  fs.writeFileSync(safePath(root,manifestPath),JSON.stringify(data,null,2)+'\n',{flag:'wx'});
}
export function fileHash(root,name) {
  const file=safePath(root,name);
  if(!exists(file))return null;
  if(!fs.lstatSync(file).isFile())throw Error(`Expected a regular file: ${name}`);
  return hash(fs.readFileSync(file));
}
export function linkMatches(root,name,target) {
  const file=safePath(root,name,{leafLink:true});
  if(!exists(file))return false;
  return fs.lstatSync(file).isSymbolicLink()&&path.resolve(path.dirname(file),fs.readlinkSync(file))===path.resolve(root,target);
}
export function installationStatus({target}) {
  const root=projectRoot(target);const manifest=readManifest(root);
  if(!manifest) {
    const bundle=safePath(root,'.engineering-kit');
    if(!exists(bundle))throw Error('No .engineering-kit installation found. Run init first.');
    const snapshot=inventory(bundle);
    return {legacy:true,version:snapshot.version,changes:[],message:'Untracked legacy installation. Update requires --agent and --baseline pointing to its original toolkit source.'};
  }
  const changes=[];
  for(const [name,digest] of Object.entries(manifest.files)) {
    try {const current=fileHash(root,name);if(current!==digest)changes.push({path:name,status:current===null?'missing':'modified'});}catch(e){changes.push({path:name,status:'unsafe',reason:e.message});}
  }
  for(const [name,target] of Object.entries(manifest.links)) {
    try {if(!linkMatches(root,name,target))changes.push({path:name,status:'missing or changed link'});}catch(e){changes.push({path:name,status:'unsafe',reason:e.message});}
  }
  return {legacy:false,version:manifest.source.version,source:manifest.source,agent:manifest.agent,nativeMode:manifest.nativeMode,changes};
}
