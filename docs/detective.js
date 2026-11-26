import { schoolStage } from './school.js';
import { escapeHtml as esc } from './details.js';

const candidates = schoolStage('8').elements;
const clues = [
  ['Materialuntersuchung', 'Die Probe ist ein silbrig glänzendes Metall.'],
  ['Untersuchung des Atombaus', 'Die Atome besitzen drei besetzte Elektronenschalen.'],
  ['Analyse der Außenschale', 'Die Atome besitzen zwei Außenelektronen.'],
  ['Protokoll eines Verbrennungsversuchs', 'Die Probe verbrannte mit intensiv weißem Licht. Dies ist eine Beobachtung aus einem vorhandenen Laborprotokoll, kein Experimentierauftrag.'],
];
const hints = [
  'Vergleiche die Stoffklasse in den Elementsteckbriefen. Eine metallische Probe ist kein Edelgas.',
  'Suche den Zusammenhang zwischen Periodennummer und Anzahl besetzter Schalen.',
  'Vergleiche die Atommodelle der Hauptgruppenelemente in der dritten Periode.',
  'Unterscheide zwischen der Beobachtung beim Verbrennen des Metalls und der Flammenfärbung eines Salzes.',
];
const storageKey = 'dag-detektiv-001-v1';
const fresh = () => ({revealed:1, excluded:[], hypothesis:'', notes:['','','',''], answer:'', reason:'', reflection:'', hints:[], checked:false});
function load() {
  try {
    const s = JSON.parse(sessionStorage.getItem(storageKey));
    if (s && Array.isArray(s.notes) && s.notes.length===4 && Array.isArray(s.excluded) && Array.isArray(s.hints) && Number.isInteger(s.revealed) && s.revealed>=1 && s.revealed<=4) return {...fresh(),...s};
  } catch {}
  return fresh();
}
let state = load();
function save() { try { sessionStorage.setItem(storageKey,JSON.stringify(state)); } catch {} }
const solution = 'Magnesium (Mg) ist ein silbrig glänzendes Metall in der dritten Periode und zweiten Hauptgruppe. Das Schalenmodell zeigt drei besetzte Schalen mit 2, 8 und 2 Elektronen. Natrium und Aluminium haben ebenfalls drei Schalen, aber ein bzw. drei Außenelektronen. Calcium besitzt zwei Außenelektronen, jedoch vier besetzte Schalen. Die intensive weiße Lichterscheinung beim Verbrennen stützt die Identifikation. Die Kombination der Indizien, nicht der Metallglanz allein, macht die Zuordnung eindeutig.';
function report() {
  return [
    'D[Ag] Table – Chemiedetektive', 'Ermittlungsakte 001 · Das verschwundene Etikett · Klasse 8',
    'Datum: '+new Date().toLocaleDateString('de-DE'), '',
    'Erste Hypothese: '+state.hypothesis, '',
    ...clues.slice(0,state.revealed).flatMap((c,i)=>['Indiz '+(i+1)+': '+c[0],c[1],'Auswertung: '+state.notes[i],'']),
    'Ausgeschlossene Elemente: '+(state.excluded.join(', ')||'keine'),
    'Verbleibende Elemente: '+candidates.filter(e=>!state.excluded.includes(e.symbol)).map(e=>e.symbol).join(', '),
    'Identifiziertes Element: '+(candidates.find(e=>e.symbol===state.answer)?.name||'–'),
    'Begründung: '+state.reason,'Reflexion: '+state.reflection,
    'Genutzte Hilfen: '+(state.hints.map(n=>n+1).join(', ')||'keine'),
  ].join('\n');
}
function exportText() {
  const url=URL.createObjectURL(new Blob([report()],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='Chemiedetektive-Ermittlungsbericht.txt';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function printReport() {
  const node=document.createElement('section');
  node.id='det-print-report';
  const pre=document.createElement('pre');pre.textContent=report();node.append(pre);
  document.body.append(node);document.body.classList.add('det-print');
  const cleanup=()=>{document.body.classList.remove('det-print');node.remove();};
  window.addEventListener('afterprint',cleanup,{once:true});
  try {window.print();} finally {cleanup();}
}
function complete() {
  return state.revealed===4 && state.hypothesis.trim() && state.notes.every(n=>n.trim()) && state.answer && state.reason.trim() && state.reflection.trim();
}
function refresh(root) {
  root.querySelectorAll('[data-det-toggle]').forEach(b=>{
    const off=state.excluded.includes(b.dataset.detToggle);
    b.setAttribute('aria-pressed',String(off));
    b.closest('.det-element').classList.toggle('det-excluded',off);
    b.textContent=off?'↶':'×';
    b.setAttribute('aria-label',(off?'Wieder aufnehmen: ':'Ausschließen: ')+b.dataset.detToggle);
  });
  root.querySelector('#det-count').textContent=(candidates.length-state.excluded.length)+' von '+candidates.length+' Elementen verbleiben';
  root.querySelector('#det-check').disabled=!complete();
  root.querySelector('#det-next')?.toggleAttribute('disabled',!state.hypothesis.trim()||!state.notes[state.revealed-1].trim());
  const result=root.querySelector('#det-result');
  result.hidden=!state.checked;
  if (state.checked) {
    result.querySelector('strong').textContent=state.answer==='Mg'?'Identifikation richtig.':'Vergleiche deine Identifikation mit der Musterlösung.';
    result.querySelector('p').textContent=solution;
  }
}
function render(root) {
  root.innerHTML='<div class="det-hero"><span class="det-kicker">Ermittlungsakte 001 · Klasse 8 · Partnerarbeit</span><h2>Das verschwundene Etikett</h2><p>Bei der Inventur eines Chemielabors fällt eine Materialprobe ohne Etikett auf. Es gibt nur einige dokumentierte Untersuchungsergebnisse. Bevor die Probe zugeordnet werden kann, müsst ihr ihre Identität klären.</p><p><strong>Auftrag:</strong> Identifiziert das unbekannte Element und begründet eure Entscheidung anhand der Indizien. Ihr untersucht ausschließlich digitale Modelle und vorhandene Befunde.</p></div>'+
  '<section class="det-panel"><h3>1 · Erste Vermutung</h3><label for="det-hypothesis">Welche Elemente könnten infrage kommen? Was müsst ihr herausfinden?</label><textarea id="det-hypothesis" data-det-field="hypothesis" rows="3">'+esc(state.hypothesis)+'</textarea></section>'+
  '<section class="det-panel"><div class="det-head"><h3>2 · Indizien auswerten</h3><span>'+state.revealed+' / 4 freigegeben</span></div><progress max="4" value="'+state.revealed+'" aria-label="Freigegebene Indizien"></progress><div class="det-clues">'+clues.map((c,i)=>i<state.revealed?
    '<article class="det-clue"><span class="det-kicker">Indiz '+(i+1)+'</span><h4>'+esc(c[0])+'</h4><p>'+esc(c[1])+'</p><label for="det-note-'+i+'">Was folgert ihr? Welche Elemente könnt ihr ausschließen und warum?</label><textarea id="det-note-'+i+'" data-det-note="'+i+'" rows="2">'+esc(state.notes[i])+'</textarea><button type="button" class="det-small" data-det-hint="'+i+'" aria-expanded="'+state.hints.includes(i)+'">'+(state.hints.includes(i)?'Hinweis ausblenden':'Tipp anzeigen')+'</button><p class="det-hint" '+(state.hints.includes(i)?'':'hidden')+'>'+esc(hints[i])+'</p></article>':
    '<article class="det-clue det-locked"><strong>Indiz '+(i+1)+'</strong><p>Noch nicht freigegeben</p></article>').join('')+'</div>'+
  (state.revealed<4?'<button type="button" class="det-primary" id="det-next" data-det-action="next">Nächstes Indiz freigeben</button><p class="det-muted">Notiert zunächst eure Vermutung und die Auswertung des aktuellen Indizes.</p>':'')+'</section>'+
  '<section class="det-panel"><div class="det-head"><h3>3 · Periodensystem untersuchen</h3><span id="det-count" role="status"></span></div><p>Öffnet mit dem Elementsymbol den Steckbrief. Mit × schließt ihr ein Element aus; mit ↶ nehmt ihr es wieder auf. Nichts wird automatisch ausgeschlossen.</p><div class="det-scroll" tabindex="0" role="region" aria-label="Periodensystem der Klasse 8">'+
  '<div class="det-grid">'+Array.from({length:18},(_,i)=>'<span class="det-axis" style="grid-column:'+(i+2)+';grid-row:1">'+(i+1)+'</span>').join('')+
  Array.from({length:Math.max(...candidates.map(e=>e.period))},(_,i)=>'<span class="det-axis" style="grid-column:1;grid-row:'+(i+2)+'">'+(i+1)+'</span>').join('')+
  candidates.map(e=>'<div class="det-element fam-'+esc(e.family)+'" style="grid-column:'+(e.group+1)+';grid-row:'+(e.period+1)+'"><button type="button" class="det-open" data-element="'+esc(e.symbol)+'" title="Steckbrief: '+esc(e.name)+'" aria-label="Steckbrief: '+esc(e.name)+'"><small>'+e.n+'</small><b>'+esc(e.symbol)+'</b><span>'+esc(e.name)+'</span></button><button type="button" class="det-toggle" data-det-toggle="'+esc(e.symbol)+'">×</button></div>').join('')+'</div></div><button type="button" class="det-small" data-det-action="restore">Alle Elemente wieder aufnehmen</button></section>'+
  '<section class="det-panel"><h3>4 · Ermittlungsbericht</h3><label for="det-answer">Welches Element habt ihr identifiziert?</label><select id="det-answer" data-det-field="answer"><option value="">Bitte auswählen</option>'+candidates.map(e=>'<option value="'+esc(e.symbol)+'" '+(state.answer===e.symbol?'selected':'')+'>'+esc(e.name)+' ('+esc(e.symbol)+')</option>').join('')+'</select><label for="det-reason">Begründet eure Entscheidung. Verknüpft mindestens zwei Indizien und nennt ein ausgeschlossenes Element mit Begründung.</label><textarea id="det-reason" data-det-field="reason" rows="4">'+esc(state.reason)+'</textarea><label for="det-reflection">Welches Indiz war besonders aussagekräftig? Warum genügte ein einzelnes Indiz nicht unbedingt?</label><textarea id="det-reflection" data-det-field="reflection" rows="3">'+esc(state.reflection)+'</textarea><button type="button" class="det-primary" id="det-check" data-det-action="check">Mit Musterlösung vergleichen</button><p class="det-muted">Die Identifikation wird geprüft. Vergleicht eure Freitexte selbst mit der Musterlösung; sie werden nicht automatisch bewertet.</p><div id="det-result" class="det-feedback" role="status" hidden><strong></strong><p></p></div></section>'+
  '<section class="det-panel"><h3>5 · Ergebnisse sichern</h3><p>Das Protokoll bleibt in diesem Browser-Tab gespeichert. Es wird nicht an einen Server gesendet. Übergebt den Bericht selbst an eure Lehrkraft.</p><div class="det-actions"><button type="button" class="det-primary" data-det-action="print">Bericht drucken / als PDF speichern</button><button type="button" class="det-small" data-det-action="download">Textdatei speichern</button><button type="button" class="det-small" data-det-action="reset">Fall zurücksetzen</button></div></section>';
  refresh(root);
}
export function showDetective(root,stage) {
  if(stage.key!=='8') {
    root.innerHTML='<div class="det-hero"><span class="det-kicker">Ermittlungsakte 001 · Klasse 8</span><h2>Das verschwundene Etikett</h2><p>Dieser erste Fall ist auf das Schalenmodell und die Elementfamilien in Klasse 8 abgestimmt.</p><a class="det-primary" href="#detektive?stufe=8">Ermittlung in Klasse 8 starten</a></div>';
    return;
  }
  render(root);
  root.oninput=e=>{
    const el=e.target;
    if(el.dataset.detField) state[el.dataset.detField]=el.value;
    else if(el.dataset.detNote!==undefined) state.notes[Number(el.dataset.detNote)]=el.value;
    else return;
    state.checked=false;save();refresh(root);
  };
  root.onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.detToggle) {
      const s=b.dataset.detToggle;
      state.excluded=state.excluded.includes(s)?state.excluded.filter(x=>x!==s):[...state.excluded,s];
      state.checked=false;save();refresh(root);
    } else if(b.dataset.detHint!==undefined) {
      const n=Number(b.dataset.detHint);
      if(!state.hints.includes(n))state.hints.push(n);
      const p=b.nextElementSibling;p.hidden=!p.hidden;
      b.textContent=p.hidden?'Tipp anzeigen':'Hinweis ausblenden';
      b.setAttribute('aria-expanded',String(!p.hidden));save();
    } else {
      switch(b.dataset.detAction) {
        case 'next':if(state.revealed<4 && state.hypothesis.trim() && state.notes[state.revealed-1].trim()){state.revealed++;save();render(root);root.querySelector('#det-note-'+(state.revealed-1)).focus();}break;
        case 'restore':state.excluded=[];state.checked=false;save();refresh(root);break;
        case 'check':if(complete()){state.checked=true;save();refresh(root);}break;
        case 'print':printReport();break;
        case 'download':exportText();break;
        case 'reset':if(confirm('Den bisherigen Ermittlungsbericht wirklich löschen?')){state=fresh();save();render(root);root.querySelector('#det-hypothesis').focus();}break;
      }
    }
  };
}
