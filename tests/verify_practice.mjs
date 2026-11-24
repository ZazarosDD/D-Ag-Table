import assert from 'node:assert/strict';
import { stageKeys, schoolStage } from '../docs/school.js';
import { practiceTool } from '../docs/practice.js';
import { topicsFor, topicWorkshop } from '../docs/practice-topics.js';
import { teacherBank, teacherWorkshop, worksheetDocument } from '../docs/practice-teacher.js';
import { workshops } from '../docs/practice-tools.js';
import { lessonVisual } from '../docs/practice-figures.js';
import { detectiveCases, worksheetTasks } from '../docs/practice-material.js';
import { electrodes, cellResult } from '../docs/practice-electrodes.js';
import { molecules } from '../docs/practice-molecules.js';
import { escapeHtml } from '../docs/details.js';
import { elementBySymbol } from '../docs/catalogue.js';

const counts = {7:8,8:6,9:7,10:7,11:9,'12-gk':10,'12-lk':18,'13-gk':9,'13-lk':14};
const all = new Map(), allQs = new Set(), charts = new Set();
for(const key of stageKeys.filter(k => k !== 'alle')){
  const s = schoolStage(key), topics = topicsFor(s), draft = topicWorkshop.initial(s);
  const bank = teacherBank(s);
  assert.equal(topics.length,counts[key]);
  assert.equal(bank.filter(t => t.group === 'Themen').length,counts[key]*2);
  assert.ok(bank.filter(t => t.group === 'Stoffe').length >= 5);
  for(const t of topics){
    assert.equal(t.year,s.year);assert.ok(!t.course || t.course === s.course);
    all.set(t.id,t);
    assert.ok(t.visual.rows.every(row=>row.length===t.visual.columns.length));
    assert.match(t.source,/^https:\/\/lehrplannavigator\.nrw\.de\//u);
    assert.ok(t.questions.length >= 2);
    assert.doesNotMatch(lessonVisual(t.id,t.visual),/\b(?:NaN|undefined)\b/);
    if(lessonVisual(t.id,t.visual).includes('pr-lesson-figure'))charts.add(t.id);
    topicWorkshop.act(draft,'set:topic',t.id,s);
    for(const [i,q] of t.questions.entries()){
      assert.equal(draft.index,i);assert.equal(draft.id,t.id);
      allQs.add(q.prompt);
      let html=topicWorkshop.render(draft,s);
      assert.ok(html.includes(escapeHtml(q.prompt)));assert.ok(!html.includes('class="pr-result'));
      const wrong=(q.answer+1)%q.choices.length;
      assert.ok(q.hint?.trim().length>6);
      assert.equal((html.match(/name="themenantwort"/g)||[]).length,3);
      topicWorkshop.act(draft,'set:answer',String(wrong),s);topicWorkshop.act(draft,'check','',s);
      assert.ok(topicWorkshop.render(draft,s).includes(escapeHtml(q.hint)));
      assert.ok(!topicWorkshop.render(draft,s).includes(escapeHtml(q.explanation)));
      topicWorkshop.act(draft,'solution','',s);
      assert.ok(topicWorkshop.render(draft,s).includes(escapeHtml(q.explanation)));
      assert.ok(!draft.completed.has(t.id+'/'+i));
      topicWorkshop.act(draft,'answer',String(q.answer),s);topicWorkshop.act(draft,'check','',s);
      assert.match(topicWorkshop.render(draft,s),/pr-success/);assert.ok(draft.completed.has(t.id+'/'+i));
      topicWorkshop.act(draft,'next','',s);
    }
  }
  assert.equal(draft.completed.size,topics.length*2);
  assert.match(topicWorkshop.render(draft,s),/Alle Themen dieser Stufe bearbeitet/);
  for(const [id,workshop] of Object.entries(workshops)){
    if(practiceTool(s,id)!==id) continue;
    const d=workshop.initial(s);
    assert.doesNotMatch(workshop.render(d,s),/NaN|undefined/);
  }
  const cases=detectiveCases.filter(c => c.years.includes(s.year));
  for(const c of cases){
    const d=workshops.detektiv.initial(s);
    workshops.detektiv.act(d,'set:case',c.id,s);
    for(const ch of c.choices) assert.ok(ch.kind==='element'?s.symbols.has(ch.id):s.byFormula.has(ch.id));
    workshops.detektiv.act(d,'guess',c.answer,s);
    workshops.detektiv.act(d,'check','',s);
    assert.match(workshops.detektiv.render(d,s),/Ergänze einen kurzen Beleg/);
    workshops.detektiv.act(d,'hint','',s);workshops.detektiv.act(d,'hint','',s);
    d.evidence='Mein eigener Beleg <img onerror=x>';workshops.detektiv.act(d,'check','',s);
    const html=workshops.detektiv.render(d,s);assert.ok(html.includes(escapeHtml(c.evidence)));assert.ok(html.includes(escapeHtml(c.hints[1])));
    assert.ok(!html.includes('<img onerror=x>'));
  }
  const td=teacherWorkshop.initial(s);
  const first=bank.find(t=>t.group==='Themen'),other=bank.find(t=>t.group==='Stoffe');
  teacherWorkshop.act(td,'set:pick',first.id,s);
  teacherWorkshop.act(td,'set:group','Stoffe',s);
  teacherWorkshop.act(td,'set:subject',other.subject,s);
  teacherWorkshop.act(td,'set:pick',other.id,s);
  const work=worksheetDocument(td,s,false),answer=worksheetDocument(td,s,true);
  for(const task of [first,other]){assert.ok(work.includes(escapeHtml(task.prompt)));assert.ok(!work.includes(escapeHtml(task.solution)));assert.ok(answer.includes(escapeHtml(task.solution)))}
  assert.ok(!work.includes('Musterlösung'));assert.match(work,/pr-writing-lines/);
  teacherWorkshop.act(td,'slides','',s);
  assert.ok(!teacherWorkshop.render(td,s).includes(escapeHtml(first.solution)));
  teacherWorkshop.act(td,'reveal','',s);assert.ok(teacherWorkshop.render(td,s).includes(escapeHtml(first.solution)));
  teacherWorkshop.act(td,'pause','',s);assert.ok(!teacherWorkshop.render(td,s).includes(escapeHtml(first.prompt)));
  teacherWorkshop.act(td,'next','',s);assert.ok(!td.paused && !td.reveal && td.slide===1);
  teacherWorkshop.act(td,'end','',s);teacherWorkshop.act(td,'remove',first.id,s);assert.deepEqual(td.ids,[other.id]);
  console.log(s.label,topics.length+' Themen',topics.length*2+' Aufgaben',cases.length+' Stoffrätsel');
}
assert.equal(all.size,69);assert.equal(allQs.size,138);assert.equal(charts.size,12);
assert.equal(detectiveCases.length,17);assert.equal(worksheetTasks.length,37);
const nine=schoolStage('9'), ion=workshops.ionen;
for(const [id,plus,minus,formula] of [['MgCl2',1,2,'MgCl₂'],['NaCl',1,1,'NaCl'],['Al2O3',2,3,'Al₂O₃'],['CaF2',1,2,'CaF2']]){
 const d=ion.initial(nine);ion.act(d,'set:salt',id);ion.act(d,'check','');assert.match(ion.render(d),/mindestens ein Ion/);
 for(const [k,n] of [['plus',plus],['minus',minus]])for(let i=0;i<n;i++)ion.act(d,'count',k+'+');
 d.formula='X';ion.act(d,'check');assert.match(ion.render(d),/Die Anzahl stimmt/);
 d.formula=formula;ion.act(d,'check');assert.match(ion.render(d),/pr-success/);
 for(const [k,n] of [['plus',plus],['minus',minus]])for(let i=0;i<n;i++)ion.act(d,'count',k+'+');
 ion.act(d,'check');assert.match(ion.render(d),/Kürze die Anzahlen/);
}
const l=workshops.lewis;
for(const m of molecules){
 const d=l.initial();l.act(d,'set:molecule',m.id);
 assert.ok(!l.render(d).includes('data-spatial'));l.act(d,'check');assert.match(l.render(d),/keine Bindung/);
 m.orders.forEach((_,i)=>l.act(d,'bond',String(i)));
 for(let i=0;i<m.pairs;i++)l.act(d,'pairs','1');
 l.act(d,'check');assert.match(l.render(d),/data-spatial/);assert.match(l.render(d),/pr-success/);
 const old=l.render(d);l.act(d,'turn','right');assert.notEqual(old,l.render(d));
 l.act(d,'bond','0');l.act(d,'check');assert.match(l.render(d),/genau eine Einfachbindung/);assert.ok(!l.render(d).includes('data-spatial'));
}
for(const [key,id,field] of [['8','alkali','period'],['10','en','electronegativity'],['11','radius','covalentRadiusPm']]){
 const s=schoolStage(key),w=workshops.trends,d=w.initial(s);
 assert.equal(d.id,id);assert.ok(!w.render(d,s).includes('pr-result'));
 const sorted=[...d.order].sort((a,b)=>elementBySymbol.get(a)[field]-elementBySymbol.get(b)[field]);
 for(let i=0;i<sorted.length;i++){let j=d.order.indexOf(sorted[i]);while(j>i){w.act(d,'move',j+':-1',s);j--;}}
 w.act(d,'check','',s);assert.match(w.render(d,s),/pr-success/);
}
const c=workshops.zelle;
for(const left of electrodes)for(const right of electrodes){
 const d=c.initial();c.act(d,'set:left',left.symbol);c.act(d,'set:right',right.symbol);
 if(left===right){assert.match(c.render(d),/0,00 V/);continue}
 const g=cellResult(left,right);
 c.act(d,'pole',g.anode===left?'left':'right');c.act(d,'direction',g.cathode===left?'left':'right');
 d.voltage=String(g.voltage).replace('.',',');c.act(d,'check');
 const html=c.render(d);assert.match(html,/pr-success/);assert.ok(html.includes(g.total));
 c.act(d,'direction',g.cathode===left?'right':'left');c.act(d,'check');assert.match(c.render(d),/pr-review/);
}
console.log('69 Themen, 138 eindeutige Fragen, 12 ergänzende Grafiken/Modelle, 17 Stoffrätsel, 37 zusätzliche Arbeitsaufgaben und alle Werkstätten validiert.');

