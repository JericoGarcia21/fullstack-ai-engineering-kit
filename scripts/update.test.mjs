import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {initializeWorkspace} from './workspace.mjs';
import {bundleEntries,manifestPath,inventory,installationStatus,readManifest} from './state.mjs';
import {destinations} from './install.mjs';
import {updateWorkspace,checkUpdates,compareVersions} from './update.mjs';

const source=fileURLToPath(new URL('..',import.meta.url));
const cli=path.join(source,'bin','cli.mjs');
function copySource(from,to) {fs.mkdirSync(to);for(const entry of bundleEntries)if(fs.existsSync(path.join(from,entry)))fs.cpSync(path.join(from,entry),path.join(to,entry),{recursive:true});}
function version(dir,value) {const file=path.join(dir,'package.json');const pkg=JSON.parse(fs.readFileSync(file,'utf8'));pkg.version=value;fs.writeFileSync(file,JSON.stringify(pkg,null,2)+'\n');}
function fixture(run) {
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'kit-update-'));
  const old=path.join(temp,'original source'),incoming=path.join(temp,'incoming source'),target=path.join(temp,'user project');
  const cleanup=()=>fs.rmSync(temp,{recursive:true,force:true});
  try {
    copySource(source,old);version(old,'0.1.0');copySource(old,incoming);version(incoming,'0.2.0');fs.mkdirSync(target);
    const result=run({temp,old,incoming,target});
    if(result&&typeof result.then==='function')return result.finally(cleanup);
    cleanup();return result;
  }catch(error){cleanup();throw error;}
}
function append(dir,file,text) {fs.appendFileSync(path.join(dir,file),text);}
function ownedSnapshot(root) {
  const result={};
  function walk(dir,relative='') {
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {
      if(['.engineering-kit-backups','.engineering-kit-update.lock'].includes(entry.name))continue;
      const rel=relative?relative+'/'+entry.name:entry.name;const file=path.join(dir,entry.name);
      if(entry.isSymbolicLink())result[rel]=fs.readlinkSync(file);
      else if(entry.isDirectory())walk(file,rel);
      else result[rel]=fs.readFileSync(file,'utf8');
    }
  }
  walk(root);return result;
}

for(const agent of ['codex','claude','cursor','opencode','portable'])test(`${agent}: tracked update, dry run, backup, instructions and unrelated files`,()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent,target,source:old});
  assert.equal(installationStatus({target}).version,'0.1.0');assert.deepEqual(installationStatus({target}).changes,[]);
  const instruction=agent==='cursor'?'.cursor/rules/fullstack-ai-engineering-kit.mdc':agent==='claude'?'CLAUDE.md':agent==='portable'?null:'AGENTS.md';
  if(instruction)append(target,instruction,'\nUser customization must survive.\n');
  fs.writeFileSync(path.join(target,'app.txt'),'application');
  if(agent!=='portable'){fs.mkdirSync(path.join(target,destinations[agent],'personal-skill'));fs.writeFileSync(path.join(target,destinations[agent],'personal-skill','SKILL.md'),'personal');}
  append(incoming,'README.md','\nIncoming feature.\n');
  const before=ownedSnapshot(target);
  const preview=updateWorkspace({target,source:incoming,dryRun:true});assert.equal(preview.conflicts.length,0);assert.ok(preview.operations.some(op=>op.path==='.engineering-kit/README.md'));assert.deepEqual(ownedSnapshot(target),before);assert.ok(!fs.existsSync(path.join(target,'.engineering-kit-backups')));
  const result=updateWorkspace({target,source:incoming});assert.ok(result.backup);assert.equal(result.conflicts.length,0);
  assert.equal(installationStatus({target}).version,'0.2.0');assert.deepEqual(installationStatus({target}).changes,[]);
  assert.equal(fs.readFileSync(path.join(target,'app.txt'),'utf8'),'application');
  if(instruction)assert.equal(fs.readFileSync(path.join(target,instruction),'utf8'),before[instruction]);
  if(agent!=='portable')assert.equal(fs.readFileSync(path.join(target,destinations[agent],'personal-skill','SKILL.md'),'utf8'),'personal');
  const recovery=JSON.parse(fs.readFileSync(path.join(target,result.backup,'recovery.json'),'utf8'));assert.equal(recovery.state,'complete');
  const readme=recovery.operations.find(op=>op.path==='.engineering-kit/README.md');assert.equal(fs.readFileSync(path.join(target,result.backup,`old-${readme.index}`),'utf8'),before['.engineering-kit/README.md']);
  assert.equal(updateWorkspace({target,source:incoming}).unchanged,true);
}));

test('preserves unchanged local edits and reports them after update',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'claude',target,source:old});
  const local='.claude/skills/diagnostics/SKILL.md';append(target,local,'\nLocal diagnostics policy.\n');
  const result=updateWorkspace({target,source:incoming});assert.ok(result.preserved.includes(local));
  assert.ok(fs.readFileSync(path.join(target,local),'utf8').includes('Local diagnostics policy.'));
  assert.ok(installationStatus({target}).changes.some(item=>item.path===local));
}));

test('upstream and local conflict blocks every write including manifest',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'codex',target,source:old});
  append(target,'.engineering-kit/README.md','\nLocal change.\n');append(incoming,'README.md','\nUpstream change.\n');
  const before=ownedSnapshot(target);const result=updateWorkspace({target,source:incoming});
  assert.ok(result.conflicts.some(item=>item.path==='.engineering-kit/README.md'));assert.deepEqual(ownedSnapshot(target),before);assert.ok(!fs.existsSync(path.join(target,'.engineering-kit-backups')));
}));

test('adds and removes skill files and Codex links while preserving unrelated content',()=>fixture(({old,incoming,target})=>{
  for(const dir of [old,incoming]) {
    const skill=path.join(dir,'skills','retired-example');fs.mkdirSync(path.join(skill,'references'),{recursive:true});
    fs.writeFileSync(path.join(skill,'SKILL.md'),'---\nname: retired-example\ndescription: "An example skill."\nlicense: MIT\n---\n\n# Example\nUse it.\n');fs.writeFileSync(path.join(skill,'references','guide.md'),'# Guide\n');
  }
  initializeWorkspace({agent:'codex',target,source:old});
  // Fixture-only removal: explicit absolute temporary path, never user files.
  fs.rmSync(path.join(incoming,'skills','retired-example'),{recursive:true});
  const added=path.join(incoming,'skills','new-example');fs.mkdirSync(path.join(added,'references'),{recursive:true});
  fs.writeFileSync(path.join(added,'SKILL.md'),'---\nname: new-example\ndescription: "A new example."\nlicense: MIT\n---\n\n# New example\nUse it.\n');fs.writeFileSync(path.join(added,'references','guide.md'),'# Guide\n');
  const newFile=path.join(incoming,'skills','diagnostics','references','extra.md');fs.writeFileSync(newFile,'# New guide\n');
  const result=updateWorkspace({target,source:incoming});assert.equal(result.conflicts.length,0);
  assert.ok(!fs.existsSync(path.join(target,'.agents','skills','retired-example')));
  assert.ok(fs.lstatSync(path.join(target,'.agents','skills','new-example')).isSymbolicLink());
  assert.ok(fs.existsSync(path.join(target,'.agents','skills','diagnostics','references','extra.md')));
}));

test('new incoming file cannot overwrite untracked content',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  fs.writeFileSync(path.join(incoming,'references','new-guide.md'),'upstream');fs.writeFileSync(path.join(target,'.engineering-kit','references','new-guide.md'),'user');
  const result=updateWorkspace({target,source:incoming});assert.ok(result.conflicts.some(item=>item.path.endsWith('new-guide.md')));assert.equal(fs.readFileSync(path.join(target,'.engineering-kit','references','new-guide.md'),'utf8'),'user');
}));

test('local deletion conflicts when upstream changes that file',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  fs.unlinkSync(path.join(target,'.engineering-kit','README.md'));append(incoming,'README.md','\nchanged\n');
  assert.ok(updateWorkspace({target,source:incoming}).conflicts.some(item=>item.path==='.engineering-kit/README.md'));
}));

test('legacy migration requires an independent original baseline',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'codex',target,source:old});fs.unlinkSync(path.join(target,manifestPath));
  assert.equal(installationStatus({target}).legacy,true);
  assert.throws(()=>updateWorkspace({target,source:incoming}),/Legacy update requires/);
  assert.throws(()=>updateWorkspace({target,source:incoming,agent:'codex',baseline:path.join(target,'.engineering-kit')}),/independent original/);
  const result=updateWorkspace({target,source:incoming,agent:'codex',baseline:old});assert.equal(result.conflicts.length,0);assert.equal(installationStatus({target}).legacy,false);
}));

test('legacy migration detects local customization instead of treating it as baseline',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'claude',target,source:old});fs.unlinkSync(path.join(target,manifestPath));
  append(target,'.claude/skills/diagnostics/SKILL.md','\ncustom\n');append(incoming,'skills/diagnostics/SKILL.md','\nupstream\n');
  assert.ok(updateWorkspace({target,source:incoming,agent:'claude',baseline:old}).conflicts.some(item=>item.path.startsWith('.claude/')));
}));

test('installed bundle cannot be used as incoming source to adopt local edits',()=>fixture(({old,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});append(target,'.engineering-kit/README.md','\nlocal\n');
  assert.throws(()=>updateWorkspace({target,source:path.join(target,'.engineering-kit')}),/independent of the installed bundle/);
  assert.ok(installationStatus({target}).changes.some(change=>change.path==='.engineering-kit/README.md'));
}));

test('repairing portable discovery preserves the original baseline for local edits',()=>fixture(({old,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});append(target,'.engineering-kit/README.md','\nlocal\n');
  initializeWorkspace({agent:'codex',target,source:old});
  assert.ok(installationStatus({target}).changes.some(change=>change.path==='.engineering-kit/README.md'));
}));

test('legacy bundle gains optional specialist skills and keeps copied Codex layout',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'codex',target,source:old});fs.unlinkSync(path.join(target,manifestPath));
  for(const skill of fs.readdirSync(path.join(old,'skills'))) {
    const link=path.join(target,'.agents','skills',skill);
    if(process.platform==='win32')fs.rmdirSync(link);else fs.unlinkSync(link);
    if(!['ai-engineering','cinematic-product-video'].includes(skill))fs.cpSync(path.join(old,'skills',skill),link,{recursive:true});
  }
  for(const skill of ['ai-engineering','cinematic-product-video']) {
    fs.rmSync(path.join(old,'skills',skill),{recursive:true});
    fs.rmSync(path.join(target,'.engineering-kit','skills',skill),{recursive:true});
  }
  const result=updateWorkspace({target,source:incoming,baseline:old,agent:'codex'});assert.equal(result.conflicts.length,0);
  assert.equal(readManifest(target).nativeMode,'copy');
  assert.ok(fs.existsSync(path.join(target,'.agents','skills','ai-engineering','SKILL.md')));
  assert.ok(!fs.lstatSync(path.join(target,'.agents','skills','cinematic-product-video')).isSymbolicLink());
}));

test('malicious manifest paths cannot claim root instructions or escape the project',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  const manifest=readManifest(target);const file=path.join(target,manifestPath);
  for(const name of ['../outside.txt','AGENTS.md','.engineering-kit/../../outside.txt']) {
    fs.writeFileSync(file,JSON.stringify({...manifest,files:{...manifest.files,[name]:'a'.repeat(64)}}));
    assert.throws(()=>updateWorkspace({target,source:incoming}),/Unsafe relative path|Invalid manifest file/);
  }
}));

test('unexpected junctions cannot redirect toolkit writes',()=>fixture(({old,incoming,target,temp})=>{
  initializeWorkspace({agent:'codex',target,source:old});
  const other=path.join(temp,'outside');fs.mkdirSync(other);
  const linked=path.join(target,'.agents','skills','diagnostics');
  if(process.platform==='win32')fs.rmdirSync(linked);else fs.unlinkSync(linked);
  fs.symlinkSync(other,linked,process.platform==='win32'?'junction':'dir');
  const result=updateWorkspace({target,source:incoming});assert.ok(result.conflicts.some(item=>item.path==='.agents/skills/diagnostics'));assert.deepEqual(fs.readdirSync(other),[]);
}));

test('exclusive lock blocks another update and dry run remains read-only',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  const lock=path.join(target,'.engineering-kit-update.lock');fs.writeFileSync(lock,'another updater');
  assert.throws(()=>updateWorkspace({target,source:incoming}),/update lock exists/);
  assert.equal(updateWorkspace({target,source:incoming,dryRun:true}).conflicts.length,0);assert.equal(fs.readFileSync(lock,'utf8'),'another updater');
}));

test('write failure restores files and manifest from backup',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});append(incoming,'README.md','\nchanged\n');
  const before=ownedSnapshot(target);const original=fs.renameSync;let failed=false;
  fs.renameSync=(from,to,...args)=>{if(!failed&&to===path.join(target,'.engineering-kit','package.json')){failed=true;throw Error('simulated disk failure');}return original(from,to,...args);};
  try {assert.throws(()=>updateWorkspace({target,source:incoming}),/Applied changes rolled back/);}finally {fs.renameSync=original;}
  assert.equal(failed,true);assert.deepEqual(ownedSnapshot(target),before);assert.deepEqual(installationStatus({target}).changes,[]);
  const backup=fs.readdirSync(path.join(target,'.engineering-kit-backups'))[0];assert.equal(JSON.parse(fs.readFileSync(path.join(target,'.engineering-kit-backups',backup,'recovery.json'),'utf8')).state,'rolled-back');
}));

test('replacing a hardlinked managed file does not modify the other link',()=>fixture(({old,incoming,target,temp})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  const managed=path.join(target,'.engineering-kit','README.md'),other=path.join(temp,'unrelated-hardlink.md');
  fs.linkSync(managed,other);const original=fs.readFileSync(other,'utf8');append(incoming,'README.md','\nnew version\n');
  assert.equal(updateWorkspace({target,source:incoming}).conflicts.length,0);assert.equal(fs.readFileSync(other,'utf8'),original);assert.notEqual(fs.readFileSync(managed,'utf8'),original);
}));

test('a failure publishing the manifest rolls back newly added Codex links and files',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'codex',target,source:old});
  const skill=path.join(incoming,'skills','added-example');fs.mkdirSync(path.join(skill,'references'),{recursive:true});
  fs.writeFileSync(path.join(skill,'SKILL.md'),'---\nname: added-example\ndescription: "An added skill."\nlicense: MIT\n---\n\n# Added\nUse it.\n');fs.writeFileSync(path.join(skill,'references','guide.md'),'# Guide\n');
  const before=ownedSnapshot(target),original=fs.renameSync;let failed=false;
  fs.renameSync=(from,to,...args)=>{if(!failed&&to===path.join(target,manifestPath)){failed=true;throw Error('manifest publish failure');}return original(from,to,...args);};
  try {assert.throws(()=>updateWorkspace({target,source:incoming}),/Applied changes rolled back/);}finally {fs.renameSync=original;}
  assert.equal(failed,true);assert.deepEqual(ownedSnapshot(target),before);assert.deepEqual(installationStatus({target}).changes,[]);
}));

test('same version content changes are detectable and older incoming versions are rejected',()=>fixture(async({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});version(incoming,'0.1.0');append(incoming,'README.md','\nnew content\n');
  const result=await checkUpdates({target,source:incoming});assert.equal(result.updateAvailable,false);assert.equal(result.contentChanged,true);
  assert.equal(updateWorkspace({target,source:incoming}).conflicts.length,0);version(incoming,'0.0.9');assert.throws(()=>updateWorkspace({target,source:incoming}),/older than/);
}));

test('release checks are explicit, read-only, and handle errors',async()=>{
  // Async fixtures must outlive awaited checks.
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'kit-release-'));
  try {
    initializeWorkspace({agent:'portable',target:temp});const before=ownedSnapshot(temp);
    const fetchImpl=async(url,options)=>{assert.ok(url.endsWith('/releases/latest'));assert.equal(options.redirect,'error');assert.ok(options.signal);return {ok:true,status:200,json:async()=>({tag_name:'v0.3.0',draft:false,prerelease:false})};};
    assert.equal((await checkUpdates({target:temp,fetchImpl})).updateAvailable,true);
    assert.match((await checkUpdates({target:temp,fetchImpl:async()=>({status:404})})).message,/No public stable release/);
    await assert.rejects(checkUpdates({target:temp,fetchImpl:async()=>({status:403,ok:false})}),/HTTP 403/);
    await assert.rejects(checkUpdates({target:temp,fetchImpl:async()=>{throw Error('offline');}}),/offline/);
    await assert.rejects(checkUpdates({target:temp,fetchImpl:async()=>({ok:true,json:async()=>({tag_name:'not-a-version'})})}),/Unsupported version/);
    assert.deepEqual(ownedSnapshot(temp),before);
  }finally {fs.rmSync(temp,{recursive:true,force:true});}
});

test('version comparison handles stable, prerelease, numeric identifiers and build metadata',()=>{
  assert.equal(compareVersions('v1.2.3','1.2.3+build'),0);assert.equal(compareVersions('1.2.3','1.2.3-beta.9'),1);assert.equal(compareVersions('1.2.3-beta.10','1.2.3-beta.2'),1);assert.equal(compareVersions('1.10.0','1.9.9'),1);assert.equal(compareVersions('1.0.0-1','1.0.0-beta'),-1);assert.throws(()=>compareVersions('latest','1.0.0'));
});

test('CLI exposes status, local check, preview, update, and strict option errors',()=>fixture(({old,incoming,target})=>{
  initializeWorkspace({agent:'portable',target,source:old});
  const run=(...args)=>spawnSync(process.execPath,[cli,...args,'--target',target],{encoding:'utf8'});
  assert.equal(JSON.parse(run('status','--json').stdout).version,'0.1.0');
  assert.equal(JSON.parse(run('check-updates','--source',incoming,'--json').stdout).updateAvailable,true);
  const preview=run('update','--source',incoming,'--dry-run','--json');assert.equal(preview.status,0,preview.stderr);assert.equal(JSON.parse(preview.stdout).dryRun,true);
  const update=run('update','--source',incoming,'--json');assert.equal(update.status,0,update.stderr);assert.ok(JSON.parse(update.stdout).backup);
  assert.equal(run('status','--source',incoming).status,1);assert.equal(run('update','--force').status,1);assert.equal(run('status','--json','--json').status,1);
}));
