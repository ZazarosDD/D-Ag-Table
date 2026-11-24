import assert from 'node:assert/strict';
import { redoxCells, cellsForStage, cellForStage } from '../docs/redox-cells.js';
import { schoolStage, stageKeys } from '../docs/school.js';
import { redoxStudy, redoxChoices, redoxHelp, redoxSources, electronPosition } from '../docs/redox.js';
import { particleBalance, modelVoltage, steps, stepIndex, stepCard, settingValues } from '../docs/redox-model.js';
import { speciesInfo } from '../docs/redox-species.js';
import { createScene, scenePieces } from '../docs/redox-scene.js';

const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const subscript = '₀₁₂₃₄₅₆₇₈₉';
function formulaParts(formula) {
  const charged = formula.match(/([⁰¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])$/);
  const magnitude = charged ? Number([...charged[1]].map(c=>superscript.indexOf(c)).join('') || 1) : 0;
  const charge = charged?.[2] === '⁻' ? -magnitude : magnitude;
  const base = formula.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]$/,'').replace(/[₀₁₂₃₄₅₆₇₈₉]/g,x=>subscript.indexOf(x));
  const stack=[{}];
  const tokens=base.match(/[A-Z][a-z]?|e|[()[\]]|\d+/g);
  assert.equal(tokens.join(''),base);
  for(let i=0;i<tokens.length;i++){
    const t=tokens[i];
    if (t === '[' || t === '(') { stack.push({}); continue; }
    if (t === 'e') continue;
    let pieces;
    if (t === ']' || t === ')') pieces=stack.pop();
    else {assert.match(t,/^[A-Z][a-z]?$/);pieces={[t]:1};}
    const count=/^\d+$/.test(tokens[i+1])?Number(tokens[++i]):1;
    for(const [element,n] of Object.entries(pieces))stack.at(-1)[element]=(stack.at(-1)[element]||0)+n*count;
  }
  assert.equal(stack.length,1);
  return {...stack[0],charge};
}
function counts(side) {
  const masses={},molecules={};
  for(const term of side.split(' + ')){
    const [,number,species]=term.match(/^(?:(\d+) )?(\S+)$/);
    const count=Number(number || 1);
    molecules[species]=(molecules[species]||0)+count;
    for(const [atom,amount] of Object.entries(formulaParts(species)))masses[atom]=(masses[atom]||0)+count*amount;
  }
  return {masses,molecules};
}
function reaction(eq){
  const sides=eq.split(' → ');assert.equal(sides.length,2,eq);
  const [left,right]=sides.map(counts);
  assert.deepEqual(left.masses,right.masses,eq);
  return Object.fromEntries([...new Set([...Object.keys(left.molecules),...Object.keys(right.molecules)])].map(s=>[s,(right.molecules[s]||0)-(left.molecules[s]||0)]));
}
const reference={'daniell':1.10,'silberoxid':1.602,'alkali-mangan':1.449,'bleiakku':2.041};
for(const cell of redoxCells){
  const ox=reaction(cell.negative.equation),red=reaction(cell.positive.equation),net=reaction(cell.total);
  assert.equal(ox['e⁻'],2);assert.equal(red['e⁻'],-2);assert.ok(!net['e⁻']);
  for(const species of new Set([...Object.keys(ox),...Object.keys(red),...Object.keys(net)]))assert.equal((ox[species]||0)+(red[species]||0),net[species]||0,cell.id+' '+species);
  assert.ok(Math.abs(cell.positive.potential-cell.negative.potential-reference[cell.id])<1e-10);
  assert.ok(cell.sources.length>=2);
  const html=redoxStudy(cell,schoolStage('12-gk'));
  assert.match(html,/data-rx-particle/);
  assert.match(html,/Standard-Reduktionspotenziale/);
  assert.ok(html.includes(reference[cell.id].toFixed(cell.decimals).replace('.',',')+' V'));
  for(const key of [cell.negative,cell.positive])assert.ok(html.includes(Math.abs(key.potential).toFixed(cell.decimals).replace('.',',')+' V'));
  assert.equal(html.includes('<details class="rx-potentials" open>'),true);
  assert.equal(html.includes('Nennspannung pro handelsüblicher Zelle'),!!cell.nominal);
  assert.equal(html.includes('class="rx-bridge-wall"'),cell.id==='daniell');
  assert.ok(redoxSources(cell,schoolStage('alle')).includes(cell.sources[0].url));
}
const allowed=new Set(['9','11','12-gk','12-lk','13-gk','13-lk','alle']);
for(const key of stageKeys){
  const stage=schoolStage(key);const cells=cellsForStage(stage);
  assert.equal(stage.redox,allowed.has(key));
  assert.equal(cells.length,!allowed.has(key)?0:['9','11'].includes(key)?2:4);
  assert.equal((redoxChoices(stage).match(/data-cell="/g)||[]).length,cells.length);
  if(!cells.length) {assert.equal(cellForStage(stage,'bleiakku'),undefined);continue;}
  assert.equal(cellForStage(stage,'unknown').id,'daniell');
  assert.match(redoxHelp(stage),/Teilreaktionen|Gleichungen/);
  const html=redoxStudy(cells[0],stage);
  assert.equal(html.includes('<details class="rx-potentials" open>'),stage.all||stage.year>=12);
  assert.equal(html.includes('log₁₀'), stage.orbitals);
  assert.equal(html.includes('CH₃CH₂OH → CH₃CHO'),stage.year===11);
}
assert.deepEqual(electronPosition(0),[86,100]);assert.deepEqual(electronPosition(1),[394,100]);
assert.deepEqual(electronPosition(0.5),[240,42]);
for(let i=0;i<=200;i++) {
  const [x,y]=electronPosition(i/200);assert.ok(x>=86&&x<=394&&y>=42&&y<=100);
  assert.ok(x===86||x===394||y===42);
}
const finalMaterial = {
  daniell: [['Zn²⁺'], ['Cu']],
  silberoxid: [['ZnO','H₂O'], ['Ag','OH⁻']],
  'alkali-mangan': [['[Zn(OH)₄]²⁻'], ['MnOOH','OH⁻']],
  bleiakku: [['PbSO₄'], ['PbSO₄','H₂O']]
};
assert.deepEqual(steps.map(s => stepIndex(s.position)),[0,1,2,3,4]);
for (const [position,phase] of [[.279,1],[.28,2],[.719,2],[.72,3],[.939,3],[.94,4]]) assert.equal(stepIndex(position),phase);
for (const [formula,phase] of Object.entries({Zn:'s','Zn²⁺':'aq',Cu:'s','Cu²⁺':'aq',Ag:'s','OH⁻':'aq','H₂O':'l',MnOOH:'s','[Zn(OH)₄]²⁻':'aq','PbSO₄':'s','e⁻':'wire'})) {
  assert.equal(speciesInfo[formula].phase,phase);
}
for (const cell of redoxCells) {
  const markup=scenePieces(cell), nodes=new Map(), density={};
  function makeNode() {
    return {attrs:{}, dataset:{}, setAttribute(k,v){this.attrs[k]=v;}};
  }
  const root={
    querySelector(selector) {
      assert.ok(markup.includes(selector.slice(1,-1)),selector+' in '+cell.id);
      if (!nodes.has(selector)) nodes.set(selector,makeNode());
      return nodes.get(selector);
    },
    querySelectorAll(selector) {
      const key=selector.match(/data-rx-density="([^"]+)"/)[1];
      if (!density[key]) density[key]=[.01,.01,.1,.1,.1,.1,1,1,1,1,1,1].map(n=>Object.assign(makeNode(),{dataset:{density:n}}));
      return density[key];
    }
  };
  const api=createScene(root,cell,electronPosition);
  const high=settingValues(schoolStage('12-lk'),cell), low=settingValues(schoolStage('9'),cell);
  assert.deepEqual(Object.keys(low),['speed','amount']);
  assert.equal('zinc' in high,cell.id==='daniell');
  assert.equal('copper' in high,cell.id==='daniell');
  for (const count of high.amount) {
    const b=particleBalance(cell,count);
    api.configure(b,{zinc:.01,copper:.1});
    const changes=Object.fromEntries(Object.entries(b).map(([key,r])=>[key,reaction(r.text)]));
    assert.equal(changes.negative['e⁻'],2*count);assert.equal(changes.positive['e⁻'],-2*count);assert.ok(!changes.net['e⁻']);
    for(const term of new Set(Object.values(changes).flatMap(map=>Object.keys(map)))) {
      assert.equal((changes.negative[term]||0)+(changes.positive[term]||0),changes.net[term]||0);
    }
    for (const [sideIndex,side] of ['negative','positive'].entries()) {
      const balance=b[side];
      assert.deepEqual(balance.after.filter(t=>t.formula!=='e⁻').map(t=>t.formula),finalMaterial[cell.id][sideIndex]);
      const card=stepCard(cell,sideIndex===0?1:3,b);
      assert.ok(card.includes(balance.text));assert.ok(card.includes(2*count+' Elektronen'));
      for (const type of ['before','after']) {
        const terms=balance[type].filter(t=>t.formula!=='e⁻');
        for(const [i,term] of terms.entries()) {
          const id=side+'-'+type+(i?'-'+i:'');
          assert.equal(root.querySelector('[data-rx-label="'+id+'"]').textContent,(term.count>1?term.count+' ':'')+term.formula);
          assert.ok(card.includes('data-state="'+speciesInfo[term.formula].phase+'">'+term.count+' × '+term.formula));
          api.draw(0,true);
          const node=root.querySelector('[data-rx-piece="'+id+'"]');
          assert.equal(Number(node.attrs.opacity),type==='before'?1:0);
          api.draw(1,true);assert.equal(Number(node.attrs.opacity),type==='after'?1:0);
          assert.ok(!node.attrs.transform.includes('NaN'));
        }
      }
    }
    assert.ok(stepCard(cell,4,b).includes(b.net.text));
    assert.ok(stepCard(cell,2,b).includes(2*count+' Elektronen'));
    assert.match(stepCard(cell,2,b,false),/Stromkreis fließen keine Elektronen/);
    for (const closed of [true,false]) {
      api.draw(.5,closed);
      const visible=[...nodes].filter(([k,n])=>/^\[data-rx-(?:particle|electron=)/.test(k)&&n.attrs.opacity==='1');
      assert.equal(visible.length,closed?2*count:0);
      assert.equal(root.querySelector('[data-rx-switch]').attrs.d,closed?'M116 42L147 42':'M116 42L144 27');
      if (cell.id==='daniell') {
        assert.equal(root.querySelector('[data-rx-bridge-ion="anion"]').attrs.opacity,closed?'1':'0');
        assert.equal(root.querySelector('[data-rx-bridge-ion="cation"]').attrs.opacity,closed?'1':'0');
        assert.equal(density.zinc.filter(n=>n.attrs.opacity==='1').length,2);
        assert.equal(density.copper.filter(n=>n.attrs.opacity==='1').length,6);
      } else assert.equal(root.querySelector('[data-rx-interior-signal]').attrs.opacity,closed?'1':'0');
    }
  }
  for (const series of high.series) {
    for (const zinc of [.01,.1,1]) for (const copper of [.01,.1,1]) {
      const decades={'0.01':-2,'0.1':-1,'1':0};
      const variation=cell.id==='daniell'?.02958*(decades[copper]-decades[zinc]):0;
      assert.ok(Math.abs(modelVoltage(cell,zinc,copper,series)-(reference[cell.id]+variation)*series)<1e-10);
    }
  }
}
console.log('4 Zellen, 12 Teilchenbilanzen und 144 Spannungsfälle geprüft, einschließlich Elektroden, Elektronen, Ionen, Teilschritten, Schalter und Jahrgängen.');
