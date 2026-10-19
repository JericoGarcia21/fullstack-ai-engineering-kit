#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import {initializeWorkspace} from '../scripts/workspace.mjs';
import {installationStatus} from '../scripts/state.mjs';
import {checkUpdates,updateWorkspace} from '../scripts/update.mjs';

const help=`fullstack-ai-engineering-kit

Usage:
  fullstack-ai-engineering-kit init --agent <codex|claude|cursor|opencode|portable>
  fullstack-ai-engineering-kit status [--json]
  fullstack-ai-engineering-kit check-updates [--source <toolkit-path>] [--json]
  fullstack-ai-engineering-kit update [--dry-run] [--source <toolkit-path>]

Options:
  --target <path>    Project directory (defaults to current directory)
  --source <path>    Local incoming toolkit; update defaults to this CLI's package
  --dry-run          Preview init/update without writing
  --agent <agent>    Required for init and legacy migration
  --baseline <path>  Original unmodified source for a legacy update
  --json             Machine-readable status/check-updates/update results
  --help             Show this help
  --version          Show this CLI package version

init preserves existing files; Codex can repair missing discovery folders.
update backs up changed files, preserves unchanged local edits, and stops on
conflicts. Project instructions and unrelated skills are never updated.
check-updates explicitly checks public GitHub releases; it installs nothing.
To update, run a selected newer CLI package (or pass a local --source).
portable provides files for manual use without claiming native agent support.
`;
try {
  const args=process.argv.slice(2);
  if(!args.length||args.length===1&&['--help','-h'].includes(args[0]))console.log(help);
  else if(args.length===1&&args[0]==='--version')console.log(JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8')).version);
  else {
    const command=args.shift();
    const allowed={init:['--agent','--target','--dry-run'],status:['--target','--json'],'check-updates':['--target','--source','--json'],update:['--target','--source','--agent','--baseline','--dry-run','--json']}[command];
    if(!allowed)throw Error('Unknown command. Use --help for usage.');
    const options={target:process.cwd()};const seen=new Set();
    for(let i=0;i<args.length;i++) {
      const arg=args[i];
      if(!allowed.includes(arg))throw Error(`Unknown option for ${command}: ${arg}`);
      if(seen.has(arg))throw Error(`Duplicate option: ${arg}`);seen.add(arg);
      if(arg==='--dry-run')options.dryRun=true;
      else if(arg==='--json')options.json=true;
      else if(args[i+1]&&!args[i+1].startsWith('--'))options[arg.slice(2)]=args[++i];
      else throw Error(`Incomplete option: ${arg}`);
    }
    for(const key of ['target','source','baseline'])if(options[key])options[key]=path.resolve(options[key]);
    if(command==='init') {
      const result=initializeWorkspace(options);
      console.log(`${options.dryRun?'Preview':'Installed'}: ${result.agent} in ${result.target}`);
      for(const item of result.paths)console.log(`  ${item}`);
      if(options.dryRun)console.log('No files changed. Remove --dry-run to install.');
      else {
        console.log('Templates, checklists, and all skills: .engineering-kit/ (new installs include a version manifest).');
        if(result.agent==='codex')console.log('Discovery: .agents/skills/ (linked to .engineering-kit/skills/).');
        console.log(result.agent==='portable'?'Provide .engineering-kit/docs/portable-master-instructions.md to your agent. Native discovery is unverified.':'Reload your coding agent and verify that project-discovery is available.');
        console.log('Updates: run status and check-updates explicitly; no background network checks.');
        console.log('Start: Follow .engineering-kit/templates/project-initialization.md to plan my project before implementation.');
      }
    } else if(command==='status') {
      const result=installationStatus(options);
      if(options.json)console.log(JSON.stringify(result,null,2));
      else {
        console.log(`Installed: ${result.version}${result.legacy?' (legacy, untracked)':` (${result.agent}, ${result.nativeMode})`}`);
        if(result.source)console.log(`Content: ${result.source.contentHash}`);
        if(result.message)console.log(result.message);
        console.log(`Tracked changes: ${result.legacy?'unknown':result.changes.length}`);
        for(const item of result.changes)console.log(`  ${item.status}: ${item.path}`);
      }
    } else if(command==='check-updates') {
      const result=await checkUpdates(options);
      if(options.json)console.log(JSON.stringify(result,null,2));
      else {
        console.log(`Installed: ${result.installed}; available: ${result.available??'unknown'}`);
        console.log(result.updateAvailable?'Update available.':result.available?'No newer version in this channel.':'Release availability not verified.');
        if(result.contentChanged)console.log('The local source content differs (including possible same-version changes).');
        if(result.releaseUrl)console.log(`Release notes: ${result.releaseUrl}`);
        if(result.message)console.log(result.message);
      }
    } else {
      const result=updateWorkspace(options);
      const summary={from:result.from,to:result.to,legacy:result.legacy,dryRun:!!options.dryRun,unchanged:!!result.unchanged,operations:result.operations.map(({path,action,target})=>({path,action,...(target?{target}:{})})),conflicts:result.conflicts,preserved:result.preserved,backup:result.backup??null};
      if(options.json)console.log(JSON.stringify(summary,null,2));
      else {
        console.log(`${result.conflicts.length?'Blocked':options.dryRun?'Preview':result.unchanged?'Unchanged':'Updated'}: ${result.from} -> ${result.to}`);
        for(const op of summary.operations)console.log(`  ${op.action}: ${op.path}`);
        for(const conflict of result.conflicts)console.log(`  CONFLICT: ${conflict.path}: ${conflict.reason}`);
        for(const file of result.preserved)console.log(`  preserved local change: ${file}`);
        if(result.backup)console.log(`Backup and recovery log: ${result.backup}`);
        if(options.dryRun||result.conflicts.length)console.log('No project files changed.');
        else if(!result.unchanged)console.log('Reload your coding agent to load updated skills.');
      }
      if(result.conflicts.length)process.exitCode=2;
    }
  }
}catch(error){console.error(`Error: ${error.message}`);process.exitCode=1;}
