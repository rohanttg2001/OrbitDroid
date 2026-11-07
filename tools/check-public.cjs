'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),files=[],errors=[];
const permitted=/^(?:README\.md|PUBLISH\.md|ASSET_CREDITS\.md|CONTRIBUTING\.md|SECURITY\.md|LICENSE|SHA256SUMS\.txt|package\.json|\.gitignore|\.vscode\/(?:settings|tasks)\.json|\.github\/ISSUE_TEMPLATE\/bug_report\.yml|tools\/check-public\.cjs|licenses\/OrbitDroid-0\.3-MIT\.txt|docs\/(?:INSTALL|HOW_TO_USE|PRIVACY_AND_SAFETY|TROUBLESHOOTING|COMPARISON|SOURCES)\.md|assets\/(?:logo\.svg|emerald-orbit\.webp|screenshots\/(?:dashboard-community|android-running|extended-controls|macos-warning)\.png|guides\/open-anyway\.(?:pdf|png)|graphics\/(?:readme-hero\.png|quick-start\.png|everyday-use\.png|smooth-settings\.png|support-card\.png|badge-(?:version|free|mac|chips|android)\.svg|install-guide\.gif|macos-guide\.gif|install-poster\.png|security-poster\.png|features\.svg|privacy-map\.svg)))$/;
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
 const abs=path.join(dir,ent.name),rel=path.relative(root,abs).split(path.sep).join('/');
 if(ent.isSymbolicLink()){errors.push('Unexpected symlink: '+rel);continue;}
 if(ent.isDirectory())walk(abs);else files.push(rel);
}}
walk(root);
const text=new Map(),anchors=new Map();
const slug=s=>s.replace(/<[^>]+>/g,'').replace(/[`*_]/g,'').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
for(const rel of files){
 if(!permitted.test(rel))errors.push('Review unexpected file before upload: '+rel);
 const buf=fs.readFileSync(path.join(root,rel));
 if(buf.length>25*1024*1024)errors.push('File exceeds browser upload target: '+rel);
 if(/\.(md|json|cjs|yml|svg|txt)$/.test(rel)||rel==='LICENSE'){
  const s=buf.toString('utf8');text.set(rel,s);
  if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(s)||/\b(?:ghp|github_pat)_[A-Za-z0-9_]{25,}\b/.test(s)||/\bOD4\.[A-Za-z0-9_-]{40,}\.[A-Za-z0-9_-]{40,}\b/.test(s))errors.push('Possible credential: '+rel);
  if(/\blibfile_[a-f0-9]{20,}|\/workspace\/scratch\//.test(s))errors.push('Private workspace reference: '+rel);
  if(rel.endsWith('.json'))try{JSON.parse(s);}catch{errors.push('Invalid JSON: '+rel);}
  if(rel.endsWith('.md')){
   const ids=[...s.matchAll(/^#{1,6} (.+)$/gm)].map(m=>slug(m[1]));
   for(const m of s.matchAll(/<a\s+name="([^"]+)"/g))ids.push(m[1]);
   if(new Set(ids).size!==ids.length)errors.push('Duplicate section anchor: '+rel);
   anchors.set(rel,new Set(ids));
   if(/<(?:script|style|iframe|link|form|input|button)\b|\s(?:style|class|id|onclick)=/i.test(s))errors.push('Unsupported executable/custom CSS markup: '+rel);
  }
  if(rel.endsWith('.cjs'))new vm.Script(s,{filename:rel});
 }
}
let checked=0;
function link(from,raw){
 if(!raw||/^(?:https?:|mailto:|data:)/i.test(raw))return;
 if(from==='README.md'&&raw.startsWith('../../releases/'))return;
 const [base,fragment]=raw.split('#');let target;
 try{target=base?path.posix.normalize(path.posix.join(path.posix.dirname(from),decodeURIComponent(base.split('?')[0]))):from;}catch{errors.push('Bad URL: '+from);return;}
 checked++;
 if(target.startsWith('../')||!files.includes(target))errors.push('Missing local target in '+from+': '+raw);
 else if(fragment&&anchors.has(target)&&!anchors.get(target).has(fragment))errors.push('Missing anchor in '+from+': '+raw);
}
for(const [rel,s] of text)if(rel.endsWith('.md')){
 for(const m of s.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g))link(rel,m[1]);
 for(const m of s.matchAll(/\b(?:src|href)="([^"]+)"/g))link(rel,m[1]);
 for(const m of s.matchAll(/<img\b([^>]*)>/g))if(!/\balt="[^"]*"/.test(m[1]))errors.push('Missing image alt: '+rel);
}
for(const name of ['README.md','PUBLISH.md','LICENSE','SECURITY.md','ASSET_CREDITS.md','SHA256SUMS.txt','docs/INSTALL.md','docs/HOW_TO_USE.md','docs/PRIVACY_AND_SAFETY.md','docs/TROUBLESHOOTING.md','docs/COMPARISON.md','docs/SOURCES.md','assets/graphics/readme-hero.png','assets/graphics/install-guide.gif','assets/graphics/macos-guide.gif','assets/screenshots/dashboard-community.png','assets/screenshots/android-running.png','assets/screenshots/extended-controls.png','assets/screenshots/macos-warning.png','assets/guides/open-anyway.pdf'])if(!files.includes(name))errors.push('Required file missing: '+name);
if(files.some(f=>/\.(?:html|css|zip|pem|key|asar)$|(?:^|\/)(?:node_modules|\.git|\.openai|app|issued|private)(?:\/|$)/.test(f)))errors.push('Website, private, binary or build file found.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Public README package passed: ${files.length} allowlisted files, ${checked} local links/anchors; required media, syntax and known credential patterns checked. No website files. This is not an app security audit.`);
