// Run via npm run test:package so npm_execpath identifies npm on every OS.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'engineering-package-'));
function run(command,args,cwd=root) {
  const result=spawnSync(command,args,{cwd,encoding:'utf8',env:{...process.env,npm_config_cache:path.join(temp,'cache')}});
  if(result.error)throw result.error;
  assert.equal(result.status,0,result.stderr||result.stdout);return result.stdout;
}
try {
  if(!process.env.npm_execpath)throw Error('Run this check using npm run test:package.');
  const npm=(args,cwd)=>run(process.execPath,[process.env.npm_execpath,...args],cwd);
  const packed=JSON.parse(npm(['pack','--ignore-scripts','--json','--pack-destination',temp]));
  const artifact=path.join(temp,packed[0].filename);
  const consumer=path.join(temp,'consumer');fs.mkdirSync(consumer);
  npm(['install','--prefix',consumer,'--ignore-scripts','--no-audit','--no-fund','--offline',artifact]);
  const installed=path.join(consumer,'node_modules','fullstack-ai-engineering-kit');
  const incoming=path.join(temp,'incoming');fs.cpSync(installed,incoming,{recursive:true});
  const incomingPackage=path.join(incoming,'package.json');const metadata=JSON.parse(fs.readFileSync(incomingPackage,'utf8'));metadata.version='0.2.1';fs.writeFileSync(incomingPackage,JSON.stringify(metadata,null,2)+'\n');
  fs.appendFileSync(path.join(incoming,'skills','diagnostics','SKILL.md'),'\nPackage update smoke fixture.\n');
  assert.ok(fs.existsSync(path.join(consumer,'node_modules','.bin',process.platform==='win32'?'fullstack-ai-engineering-kit.cmd':'fullstack-ai-engineering-kit')));
  for(const agent of ['codex','claude','cursor','opencode','portable']) {
    const workspace=path.join(temp,`workspace ${agent}`);fs.mkdirSync(workspace);
    // npm exec resolves the installed bin. GitHub fetch and registry publishing
    // are intentionally outside this offline artifact test.
    const output=npm(['exec','--offline','--prefix',consumer,'--','fullstack-ai-engineering-kit','init','--agent',agent,'--target',workspace],consumer);
    assert.ok(output.includes('Installed: '+agent));
    assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','templates','project-initialization.md')));
    for(const file of ['guide.md','retrieval.md','agents.md','evaluation.md','training.md']) assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','skills','ai-engineering','references',file)));
    assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','templates','ai-feature-plan.md')));
    for(const file of ['guide.md','capture.md','remotion.md','audio-captions.md','video-qa.md']) assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','skills','app-video-tutorials','references',file)));
    assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','templates','app-video-plan.md')));
    assert.ok(fs.existsSync(path.join(workspace,'.engineering-kit','skills','security-engineering','references','http-security-headers.md')));
    const native={codex:'.agents/skills',claude:'.claude/skills',cursor:'.cursor/skills',opencode:'.opencode/skills'}[agent];
    if(native) {
      assert.ok(fs.existsSync(path.join(workspace,native,'ai-engineering','references','agents.md')));
      assert.ok(fs.existsSync(path.join(workspace,native,'app-video-tutorials','references','remotion.md')));
      assert.ok(fs.existsSync(path.join(workspace,native,'security-engineering','references','http-security-headers.md')));
    }
    const invoke=(args)=>npm(['exec','--offline','--prefix',consumer,'--','fullstack-ai-engineering-kit',...args,'--target',workspace],consumer);
    const status=JSON.parse(invoke(['status','--json']));assert.equal(status.version,'0.2.0');assert.deepEqual(status.changes,[]);
    assert.equal(JSON.parse(invoke(['check-updates','--source',incoming,'--json'])).updateAvailable,true);
    const manifest=path.join(workspace,'.engineering-kit','installation.json');const before=fs.readFileSync(manifest,'utf8');
    assert.equal(JSON.parse(invoke(['update','--source',incoming,'--dry-run','--json'])).dryRun,true);assert.equal(fs.readFileSync(manifest,'utf8'),before);
    assert.ok(JSON.parse(invoke(['update','--source',incoming,'--json'])).backup);
    assert.equal(JSON.parse(invoke(['status','--json'])).version,'0.2.1');
    if(native)assert.ok(fs.readFileSync(path.join(workspace,native,'diagnostics','SKILL.md'),'utf8').includes('Package update smoke fixture.'));
  }
  console.log('PASS: npm pack, offline tarball install, executable resolution, and init/status/check/preview/update in 5 workspace modes.');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
