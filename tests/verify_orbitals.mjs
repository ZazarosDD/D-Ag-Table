import assert from 'node:assert/strict';
import { elements } from '../docs/elements.js';
import { electronStructure, atomVisuals } from '../docs/atom-model.js';
import { elementDetail, helpDetail, sourcesDetail } from '../docs/details.js';

// Independent reference cases cover partial p, d and f subshells and exceptional configurations.
const expected = {
  H: [1, 1], He: [1, 1], Li: [2, 2], C: [2, 4], N: [2, 5], O: [2, 5], Ne: [2, 5],
  Na: [3, 6], Mg: [3, 6], Ar: [3, 9], Cr: [4, 15], Fe: [4, 15], Cu: [4, 15],
  Pd: [4, 23], Gd: [6, 36], Au: [6, 40], Lr: [7, 52], Og: [7, 59],
};
const blockCapacity = {s: 1, p: 3, d: 5, f: 7};
const expectedShells = {
  O: [[2, 1], [6, 4]], Na: [[2, 1], [8, 4], [1, 1]],
  Cr: [[2, 1], [8, 4], [13, 9], [1, 1]],
  Pd: [[2, 1], [8, 4], [18, 9], [18, 9]],
  Og: [[2, 1], [8, 4], [18, 9], [32, 16], [32, 16], [18, 9], [8, 4]],
};
for (const el of elements) {
  const structure = electronStructure(el);
  const {shells, occupiedOrbitals} = structure;
  const rendered = elementDetail(el, 6);
  assert.ok(rendered.includes('<dt>Besetzte Orbitale</dt><dd>'+occupiedOrbitals+'</dd>'), el.symbol);
  assert.ok(rendered.includes('<dt>Besetzte Elektronenschalen</dt><dd>'+shells.length+' ('), el.symbol);
  if (expected[el.symbol]) assert.deepEqual([shells.length, occupiedOrbitals], expected[el.symbol], el.symbol);
  if (expectedShells[el.symbol]) {
    assert.deepEqual(shells.map(s=>[s.electrons,s.occupiedOrbitals]), expectedShells[el.symbol], el.symbol);
  }
  assert.equal(shells.reduce((n,s)=>n+s.electrons,0), el.n, el.symbol);
  assert.equal(shells.reduce((n,s)=>n+s.occupiedOrbitals,0), occupiedOrbitals, el.symbol);
  const panels = [...rendered.matchAll(/<details class="orbital-shell"([^>]*)>([\s\S]*?)<\/details>/g)];
  assert.equal(panels.length, shells.length, el.symbol);
  let diagramElectrons = 0, nonemptyBoxes = 0;
  for (const [idx,shell] of shells.entries()) {
    const [block, attributes, body] = panels[idx];
    assert.equal(shell.n, idx+1);
    assert.ok(shell.occupiedOrbitals > 0 && shell.occupiedOrbitals <= shell.n*shell.n && shell.electrons <= 2*shell.occupiedOrbitals, el.symbol);
    assert.equal(attributes.trim(), idx===shells.length-1 ? 'open' : '');
    assert.ok(body.includes('aria-label="'+shell.name+'-Schale'), el.symbol);
    assert.ok(body.includes('<b>'+shell.occupiedOrbitals+'</b><small> / '+shell.n**2+'</small>'), el.symbol);
    const orbitalRows = [...block.matchAll(/<span class="orbital-boxes" aria-hidden="true">([^\n]+)<\/span>/g)];
    assert.equal(orbitalRows.length, shell.subshells.length);
    for (const [index,subshell] of shell.subshells.entries()) {
      const boxes = [...orbitalRows[index][1].matchAll(/<span class="orbital-box">(↑↓|↑|)<\/span>/g)].map(m=>m[1]);
      const capacity = blockCapacity[subshell.label.at(-1)];
      assert.equal(boxes.length, capacity, el.symbol+' '+subshell.label);
      const singles = boxes.filter(x=>x==='↑').length, pairs = boxes.filter(x=>x==='↑↓').length;
      const count = singles+2*pairs;
      assert.equal(count, subshell.electrons);
      assert.equal(singles+pairs,subshell.occupied);
      assert.ok(pairs===0 || boxes.every(Boolean),el.symbol+' Hund '+subshell.label);
      diagramElectrons += count;
      nonemptyBoxes += pairs+singles;
    }
  }
  assert.equal(diagramElectrons,el.n,el.symbol);
  assert.equal(nonemptyBoxes,occupiedOrbitals,el.symbol);
  assert.ok(atomVisuals(el).includes('Orbitale je Schale'));
  if (structure.predicted) assert.ok(rendered.includes('vorhergesagten Elektronenkonfiguration'));
}
assert.equal(elements.length,118);
assert.ok(helpDetail().includes('Hundschen Regel'));
assert.ok(sourcesDetail().includes('Orbitalbelegung'));
console.log('Geprüft: 118 Orbitalschemata und Steckbriefe, Elektronensummen, Einzel- und Doppelbelegung, Schalenkapazitäten und 18 Referenzfälle.');
