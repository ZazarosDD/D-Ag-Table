import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stageKeys, schoolStage, stageExamples, mainGroup } from '../docs/school.js';
import { compounds, elementBySymbol, findElements, findCompounds } from '../docs/catalogue.js';
import { curriculumSources } from '../docs/school-sources.js';
import { introductoryFacts, introductorySources, introductoryCaptions } from '../docs/school-intro.js';
import { elementDetail, compoundDetail, helpDetail, curriculumInfo } from '../docs/details.js';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
assert.deepEqual([...html.matchAll(/data-grade="([^"]+)"/g)].map(m => m[1]), ['7','8','9','10','11','12','13','alle']);
assert.equal(new Set(compounds.map(item => item.formula)).size, compounds.length);
assert.equal(curriculumSources.length, 4);
const all = schoolStage('alle');
const stageTitles = new Set();
let profiles = 0;
let compoundViews = 0;
for (const key of stageKeys) {
  const stage = schoolStage(key);
  assert.equal(stage.elements.length, stage.symbols.size);
  assert.equal(stage.compounds.length, stage.byFormula.size);
  assert.equal(stageTitles.has(stage.title), false);
  stageTitles.add(stage.title);
  if (stage.all) continue;
  assert.ok(stage.elements.length < 30 && stage.compounds.length < 15);
  assert.equal(stage.en, stage.year >= 10);
  assert.equal(stage.radius, stage.year >= 11);
  assert.equal(stage.orbitals, stage.course === 'lk');
  assert.match(helpDetail(stage), new RegExp(stage.label));
  assert.match(curriculumInfo(stage), new RegExp(stage.label));
  for (const element of stage.elements) {
    profiles++;
    const sign = element.symbol;
    const body = elementDetail(element, 99, stage);
    assert.ok(body.includes('id="dialog-title">' + element.name + '</h2>'));
    assert.match(body, /class="specimen-card"/);
    assert.match(body, /id="element-hazards"/);
    assert.match(body, /Quelle zum Kurzfakt/);
    assert.doesNotMatch(body, /undefined|null<\/|NaN/);
    const ids = [...body.matchAll(/ id="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'Doppelte IDs · ' + key + ' ' + sign);
    assert.equal(body.includes('Elektronegativität (Pauling)'), stage.en);
    assert.equal(body.includes('Atomradius (kovalenter Modellwert)'), stage.radius);
    assert.equal(body.includes('Orbitale je Schale'), stage.orbitals);
    assert.equal(body.includes('Lewis-Schreibweise'), Boolean(mainGroup(element)) && stage.year >= 10);
    assert.equal(body.includes('class="atom-shell-card"'), Boolean(mainGroup(element)) && stage.year >= 8 || stage.orbitals);
    assert.equal(body.includes('class="school-learning"'), stage.year >= 9);
    if (stage.year <= 8) {
      assert.ok(mainGroup(element));
      assert.ok(introductoryFacts[sign] && introductoryCaptions[sign] && introductorySources[sign]);
      assert.ok(body.includes(introductoryFacts[sign]));
      assert.doesNotMatch(body, /Ionenbindung|Orbitale je Schale|Molare Masse/);
    }
    if (stage.year === 7) assert.doesNotMatch(body, /Atommasse|Hauptgruppe|Außenschale/);
    const examples = stageExamples(sign, stage);
    assert.deepEqual(new Set([...body.matchAll(/data-compound="([^"]+)"/g)].map(m => m[1])), new Set(examples.map(c=>c.formula)));
    for (const c of examples) assert.ok(stage.byFormula.has(c.formula) && c.elements.includes(sign));
    assert.deepEqual(findElements(sign, 'all', stage.elements), [element]);
  }
  for (const c of stage.compounds) {
    compoundViews++;
    const body = compoundDetail(c, stage);
    assert.ok(c.source.startsWith('https://'));
    assert.ok(c.use && c.occurrence && c.name);
    assert.ok(body.includes('Quelle zur Verbindung'));
    const constituent = [...body.matchAll(/data-element="([^"]+)"/g)].map(m=>m[1]);
    assert.deepEqual(constituent,c.elements);
    for (const symbol of c.elements) assert.ok(stage.symbols.has(symbol));
    assert.equal(body.includes('class="school-learning"'), stage.year >= 9);
    assert.equal(findCompounds(c.formula, 'all', stage.compounds)[0], c);
  }
  assert.deepEqual(findElements('Og','all',stage.elements), []);
}
assert.equal(all.elements.length,118);
assert.equal(all.compounds.length,108);
assert.match(helpDetail(schoolStage('9')), /Oktettregel/);
assert.match(compoundDetail(schoolStage('10').byFormula.get('H2O'),schoolStage('10')), /104,5°/);
assert.match(elementDetail(elementBySymbol.get('Cu'),3,schoolStage('12-lk')), /1,10 V/);
assert.match(compoundDetail(schoolStage('13-lk').byFormula.get('PdCl2'),schoolStage('13-lk')), /koordinativ|Ligand/i);
assert.deepEqual(findCompounds('Küchenpapier','all',schoolStage('7').compounds).filter(c=>!schoolStage('7').byFormula.has(c.formula)),[]);
console.log('Neun Unterrichtsansichten, ' + profiles + ' Elementsteckbriefe, ' + compoundViews + ' Verbindungssteckbriefe, Quellen, Modellgrenzen, Stufensuche und alle Querverweise geprüft.');
