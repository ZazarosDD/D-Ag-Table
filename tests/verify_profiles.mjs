import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { elements } from '../docs/elements.js';
import { elementPictures, profiles } from '../docs/profiles.js';
import { hazardIcons } from '../docs/hazard-icons.js';
import { elementDetail } from '../docs/details.js';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const subjects = new Set(elements.map(e=>e.symbol));
const hashes = new Map();
const facts = new Set();
const records = [];
assert.equal(subjects.size,118);
assert.deepEqual(new Set(Object.keys(profiles)),subjects);
assert.deepEqual(new Set(Object.keys(elementPictures)),subjects);
for (const e of elements) {
  const s=e.symbol,p=profiles[s],image=elementPictures[s];
  for(const field of ['fact','factUrl','form','hazard','hazardUrl','status']) assert.ok(p[field]?.trim(),s+' '+field);
  for(const field of ['src','kind','caption','credit']) assert.ok(image[field]?.trim(),s+' '+field);
  for(const url of [p.factUrl,p.hazardUrl,image.sourceUrl,image.licenseUrl].filter(Boolean)) assert.equal(new URL(url).protocol,'https:',s+' source');
  assert.ok(['unknown','classified','none'].includes(p.status),s);
  assert.equal(p.status==='classified',p.pictograms.length>0,s);
  assert.equal(new Set(p.pictograms).size,p.pictograms.length,s);
  assert.equal(p.radiation,[43,61].includes(e.n)||e.n>=84,s);
  assert.ok(!facts.has(p.fact), 'Wiederholter Merksatz '+s); facts.add(p.fact);
  for(const code of p.pictograms) assert.match(code,/^GHS0[1-9]$/);
  const content=elementDetail(e,6);
  for(const id of ['element-specimen','element-hazards','element-atom','element-connections','dialog-title']) assert.equal(content.split('id="'+id+'"').length,2,s+' '+id);
  assert.doesNotMatch(content,/\bundefined\b|\bNaN\b|\bnull\b/);
  assert.ok(content.includes('src="'+image.src+'"'),s);
  assert.ok(content.includes('aria-controls="element-picture-image"'),s);
  assert.ok(content.includes('Quelle zum Kurzfakt')&&content.includes('Quelle zum Gefahrenhinweis'),s);
  const used=new Set(p.radiation?[...p.pictograms,'radiation']:p.pictograms);
  for(const [code,icon] of Object.entries(hazardIcons)){assert.equal(content.includes(icon.src),used.has(code),s+' '+code);assert.ok(existsSync('../docs/'+icon.src));}
  const bytes=readFileSync('../docs/'+image.src);
  assert.ok(bytes.length>500,s);
  const hash=createHash('sha256').update(bytes).digest('hex');
  assert.ok(!hashes.has(hash), 'Identische Bilder: '+s+' und '+hashes.get(hash)); hashes.set(hash,s);
  records.push([e.n,s,p.status,p.radiation,used.size]);
}
console.log(records.length+' Steckbriefe: individuelle Bilddatei und Kurzfakt, Quellen, Ansichten, zugeordnete Gefahrensymbole und Stoffformen geprüft.');
