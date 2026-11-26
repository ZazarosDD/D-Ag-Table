import { schoolStage } from './school.js';
import { escapeHtml as esc } from './details.js';

const candidates = schoolStage('8').elements;
const storageKey = 'dag-detektiv-001-v2';
const firstClue = 'Die Probe ist ein silbrig glänzendes Metall. Die Atome besitzen drei besetzte Elektronenschalen.';
const secondClue = 'Die Atome besitzen zwei Außenelektronen. Im vorhandenen Versuchsprotokoll ist außerdem eine intensive weiße Lichterscheinung beim Verbrennen dokumentiert.';
const solution = 'Magnesium (Mg) steht in der dritten Periode und zweiten Hauptgruppe. Sein Schalenmodell zeigt 2 | 8 | 2 Elektronen. Natrium und Aluminium sind ebenfalls Metalle der dritten Periode, besitzen aber nur ein bzw. drei Außenelektronen. Die weiße Lichterscheinung stützt die Identifikation. Metallglanz allein reicht nicht aus.';
const fresh = () => ({step:1, selected:[], answer:'', firstReason:'', secondReason:'', reason:'', checked:false, hint:false});
function load() {
  try {
    const s=JSON.parse(sessionStorage.getItem(storageKey));
    if(s && [1,2,3].includes(s.step) && Array.isArray(s.selected)) { const restored={...fresh(),...s,selected:s.selected.filter(x=>candidates.some(e=>e.symbol===x))}; if(!restored.firstReason.trim()){restored.step=1;restored.checked=false;}else if(restored.step===3&&!restored.secondReason.trim()){restored.step=2;restored.checked=false;}return restored; }
  } catch {}
  return fresh();
}
let state=load();
function save(){try{sessionStorage.setItem(storageKey,JSON.stringify(state));}catch{}}
const chosen=()=>candidates.filter(e=>state.selected.includes(e.symbol));
const firstReady=()=>state.selected.length>0 && Boolean(state.firstReason.trim());
const secondReady=()=>state.selected.includes(state.answer) && Boolean(state.secondReason.trim());
const complete=()=>state.step===3 && firstReady() && secondReady() && Boolean(state.reason.trim());
const specimen = '<svg viewBox="0 0 340 205" role="img" aria-labelledby="det-probe-title det-probe-desc" xmlns="http://www.w3.org/2000/svg"><title id="det-probe-title">Unbekannte Metallprobe</title><desc id="det-probe-desc">Schematische Darstellung eines silbrig glänzenden Metallbandes in einer flachen Laborschale mit dem Etikett Probe A.</desc><defs><linearGradient id="det-metal" x1="0" y1="0" x2="0.65" y2="1"><stop stop-color="#f9fbfc"/><stop offset=".28" stop-color="#c7cfd7"/><stop offset=".48" stop-color="#fff"/><stop offset=".7" stop-color="#a5aeb9"/><stop offset="1" stop-color="#dfe4e9"/></linearGradient><radialGradient id="det-dish"><stop stop-color="#fff"/><stop offset=".8" stop-color="#edf1f5"/><stop offset="1" stop-color="#c4cfda"/></radialGradient></defs><rect width="340" height="205" rx="14" fill="#eef0f5"/><ellipse cx="165" cy="118" rx="128" ry="67" fill="#b3bcc9" opacity=".28"/><ellipse cx="165" cy="108" rx="128" ry="66" fill="url(#det-dish)" stroke="#b5bfcd" stroke-width="2"/><ellipse cx="165" cy="108" rx="113" ry="54" fill="none" stroke="#fff" stroke-width="2"/><path d="M83 114 Q106 74 141 96 T205 90 Q227 77 253 89 L250 105 Q226 93 207 108 T143 113 Q109 94 88 132 Z" fill="#85909e" opacity=".35" transform="translate(0 5)"/><path d="M83 106 Q106 66 141 88 T205 82 Q227 69 253 81 L250 97 Q226 85 207 100 T143 105 Q109 86 88 124 Z" fill="url(#det-metal)" stroke="#8994a1" stroke-width="1.4"/><path d="M89 108 Q111 77 141 94 T206 88 Q227 76 248 88" fill="none" stroke="#fff" stroke-width="1.6" opacity=".85"/><g transform="translate(220 140) rotate(-5)"><rect width="90" height="39" rx="4" fill="#fff" stroke="#c9bfda"/><text x="45" y="16" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6b518c">PROBE A</text><text x="45" y="30" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#45325d">Unbekannt</text></g></svg>';
function report(){
  return ['D[Ag] Table – Chemiedetektive','Ermittlungsakte 001 · Klasse 8','Datum: '+new Date().toLocaleDateString('de-DE'),'','Befund 1: '+firstClue,'Erste Auswahl: '+chosen().map(e=>e.name+' ('+e.symbol+')').join(', '),'Auswertung Befund 1: '+state.firstReason,'',...(state.step>=2?['Befund 2: '+secondClue,'Identifiziertes Element: '+(candidates.find(e=>e.symbol===state.answer)?.name||'–'),'Auswertung Befund 2: '+state.secondReason]:[]),'','Begründung: '+state.reason].join('\n');
}
function exportText(){
  const url=URL.createObjectURL(new Blob([report()],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='Chemiedetektive-Ermittlungsbericht.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function printReport(){
  const node=document.createElement('section');node.id='det-print-report';
  const pre=document.createElement('pre');pre.textContent=report();node.append(pre);
  document.body.append(node);document.body.classList.add('det-print');
  const cleanup=()=>{document.body.classList.remove('det-print');node.remove();};
  window.addEventListener('afterprint',cleanup,{once:true});try{window.print();}finally{cleanup();}
}
function tile(e,final=false){
  const active=final?state.answer===e.symbol:state.selected.includes(e.symbol);
  return '<div class="det-element fam-'+esc(e.family)+(active?' det-selected':'')+'" '+(final?'':'style="grid-column:'+(e.group+1)+';grid-row:'+(e.period+1)+'"')+'><button type="button" class="det-choice" data-det-'+(final?'answer':'toggle')+'="'+esc(e.symbol)+'" aria-pressed="'+active+'" aria-label="'+(final?'Als Lösung wählen: ':'Als möglich markieren: ')+esc(e.name)+'"><small>'+e.n+'</small><b>'+esc(e.symbol)+'</b><span>'+esc(e.name)+'</span><i aria-hidden="true">'+(active?'✓':'+')+'</i></button><button type="button" class="det-profile" data-element="'+esc(e.symbol)+'" aria-label="Steckbrief: '+esc(e.name)+'">Steckbrief</button></div>';
}
function grid(){
  return '<div class="det-scroll" tabindex="0" role="region" aria-label="Periodensystem der Klasse 8"><div class="det-grid">'+Array.from({length:18},(_,i)=>'<span class="det-axis" style="grid-column:'+(i+2)+';grid-row:1">'+(i+1)+'</span>').join('')+Array.from({length:Math.max(...candidates.map(e=>e.period))},(_,i)=>'<span class="det-axis" style="grid-column:1;grid-row:'+(i+2)+'">'+(i+1)+'</span>').join('')+candidates.map(e=>tile(e)).join('')+'</div></div>';
}
function refresh(root){
  root.querySelectorAll('[data-det-toggle],[data-det-answer]').forEach(b=>{
    const active=b.dataset.detToggle?state.selected.includes(b.dataset.detToggle):state.answer===b.dataset.detAnswer;
    b.setAttribute('aria-pressed',String(active));b.closest('.det-element').classList.toggle('det-selected',active);b.querySelector('i').textContent=active?'✓':'+';
  });
  const count=root.querySelector('#det-count');
  if(count)count.textContent=state.selected.length+' mögliche Elemente ausgewählt'+(state.selected.length?': '+chosen().map(e=>e.symbol).join(', '):'');
  const next=root.querySelector('#det-next');
  if(next)next.disabled=state.step===1?!firstReady():!secondReady();
  const check=root.querySelector('#det-check');if(check)check.disabled=!complete();
  const result=root.querySelector('#det-result');
  if(result){result.hidden=!state.checked;result.querySelector('strong').textContent=state.answer==='Mg'?'Identifikation richtig.':'Überprüft eure Entscheidung.';result.querySelector('p').textContent=solution;}
}
function render(root){
  const intro='<div class="det-hero"><div><span class="det-kicker">Ermittlungsakte 001 · Klasse 8</span><h2>Das verschwundene Etikett</h2><p>Eine Metallprobe im Labor hat kein Etikett mehr. Findet heraus, um welches Element es sich handelt. Nutzt die vorhandenen Befunde – ihr müsst nichts selbst verbrennen oder anfassen.</p></div><figure class="det-specimen">'+specimen+'<figcaption>Probe A · schematische Darstellung</figcaption></figure></div>';
  const steps=['Elemente wählen & begründen','Element bestimmen & begründen','Fazit & Abgabe'];
  const guide='<ol class="det-guide" aria-label="So geht ihr vor">'+steps.map((s,i)=>'<li '+(state.step===i+1?'aria-current="step"':'')+'><span>'+(i+1)+'</span><strong>'+s+'</strong></li>').join('')+'</ol>';
  let content='';
  if(state.step===1){
    content='<section class="det-panel"><span class="det-kicker">Schritt 1 von 3</span><h3 tabindex="-1" id="det-step-title">Welche Elemente kommen infrage?</h3><div class="det-befund"><strong>Befund 1 · Aussehen und Atombau</strong><p>'+esc(firstClue)+'</p></div><p>Markiert im Periodensystem nur die Elemente, auf die beide Hinweise zutreffen. Mit „Steckbrief“ könnt ihr nachschauen. Erneutes Antippen hebt die Auswahl auf.</p>'+grid()+'<p id="det-count" role="status"></p><label for="det-first-reason">Wie habt ihr Befund 1 ausgewertet? Begründet kurz, warum eure ausgewählten Elemente infrage kommen und warum mindestens ein anderes Element nicht passt.</label><textarea id="det-first-reason" rows="2" placeholder="Diese Elemente kommen infrage, weil …">'+esc(state.firstReason)+'</textarea><div class="det-actions"><button type="button" class="det-primary" id="det-next" data-det-action="next">Weiter zum nächsten Befund</button><button type="button" class="det-small" data-det-action="clear">Auswahl löschen</button></div></section>';
  }else if(state.step===2){
    content='<section class="det-panel"><span class="det-kicker">Schritt 2 von 3</span><h3 tabindex="-1" id="det-step-title">Welches Element passt zu allen Befunden?</h3><div class="det-befund"><strong>Befund 1</strong><p>'+esc(firstClue)+'</p><strong>Befund 2 · Außenschale und Reaktion</strong><p>'+esc(secondClue)+'</p></div><p>Vergleicht die Atommodelle eurer ausgewählten Elemente und wählt genau eines aus. Fehlt euch ein Element? Geht zurück und ergänzt eure Auswahl.</p><div class="det-shortlist">'+chosen().map(e=>tile(e,true)).join('')+'</div><label for="det-second-reason">Was verrät euch Befund 2? Erklärt kurz, warum ihr euch für dieses Element entscheidet und ein anderer Kandidat ausscheidet.</label><textarea id="det-second-reason" rows="2" placeholder="Das Atom besitzt … Deshalb …">'+esc(state.secondReason)+'</textarea><div class="det-actions"><button class="det-small" type="button" data-det-action="back">Zurück zur Auswahl</button><button class="det-primary" type="button" id="det-next" data-det-action="next">Weiter zum Ermittlungsbericht</button></div></section>';
  }else{
    const e=candidates.find(e=>e.symbol===state.answer);
    content='<section class="det-panel"><span class="det-kicker">Schritt 3 von 3</span><h3 tabindex="-1" id="det-step-title">Euer Ermittlungsbericht</h3><p>Ihr habt <strong>'+esc(e?.name||'–')+' ('+esc(e?.symbol||'–')+')</strong> gewählt.</p><div class="det-befund"><strong>Die Befunde im Überblick</strong><p>'+esc(firstClue)+'</p><p>'+esc(secondClue)+'</p></div><div class="det-befund"><strong>Eure bisherigen Überlegungen</strong><p><b>Befund 1:</b> '+esc(state.firstReason)+'</p><p><b>Befund 2:</b> '+esc(state.secondReason)+'</p></div><label for="det-reason">Fazit: Welches Element ist die Probe? Fasst eure Erkenntnisse in ein bis zwei Sätzen zusammen. Welcher Hinweis war entscheidend?</label><textarea id="det-reason" rows="4" placeholder="Wir vermuten …, weil …">'+esc(state.reason)+'</textarea><div class="det-actions"><button class="det-small" type="button" data-det-action="back">Zurück</button><button class="det-primary" type="button" id="det-check" data-det-action="check">Lösung überprüfen</button></div><div id="det-result" class="det-feedback" role="status" hidden><strong></strong><p></p><small>Vergleicht eure Begründung selbst mit der Musterlösung.</small><div class="det-actions"><button type="button" class="det-primary" data-det-action="print">Bericht drucken / PDF speichern</button><button type="button" class="det-small" data-det-action="download">Textdatei speichern</button></div></div></section>';
  }
  const hint=state.step===1?'Die Periodennummer verrät euch bei diesen Atomen, wie viele Schalen besetzt sind. Achtet zusätzlich auf die Stoffklasse.':state.step===2?'Vergleicht die äußerste besetzte Schale in den Atommodellen.':'Verbindet beide Beobachtungen mit der Position im Periodensystem.';
  root.innerHTML=intro+guide+content+'<div class="det-footer"><button type="button" class="det-small" data-det-action="hint" aria-expanded="'+state.hint+'">'+(state.hint?'Tipp ausblenden':'Tipp anzeigen')+'</button><button type="button" class="det-small" data-det-action="reset">Fall neu starten</button><p class="det-hint" '+(state.hint?'':'hidden')+'>'+esc(hint)+'</p><small>Der Fortschritt bleibt in diesem Browser-Tab. Keine Antworten werden an einen Server gesendet.</small></div>';
  refresh(root);
}
function move(root,step){state.step=step;state.hint=false;state.checked=false;save();render(root);root.querySelector('#det-step-title')?.focus();}
export function showDetective(root,stage){
  if(stage.key!=='8'){
    root.innerHTML='<div class="det-hero"><div><span class="det-kicker">Ermittlungsakte 001 · Klasse 8</span><h2>Das verschwundene Etikett</h2><p>Der erste Fall ist für Klasse 8 entwickelt.</p><a class="det-primary" href="#detektive?stufe=8">Ermittlung starten</a></div></div>';return;
  }
  render(root);
  root.oninput=e=>{const field={'det-reason':'reason','det-first-reason':'firstReason','det-second-reason':'secondReason'}[e.target.id];if(field){state[field]=e.target.value;state.checked=false;save();refresh(root);}};
  root.onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.detToggle){
      const s=b.dataset.detToggle;
      state.selected=state.selected.includes(s)?state.selected.filter(x=>x!==s):[...state.selected,s];
      if(!state.selected.includes(state.answer))state.answer='';
      state.checked=false;save();refresh(root);return;
    }
    if(b.dataset.detAnswer){state.answer=b.dataset.detAnswer;state.checked=false;save();refresh(root);return;}
    switch(b.dataset.detAction){
      case 'next':if(state.step===1&&firstReady())move(root,2);else if(state.step===2&&secondReady())move(root,3);break;
      case 'back':if(state.step>1)move(root,state.step-1);break;
      case 'clear':state.selected=[];state.answer='';state.firstReason='';state.secondReason='';state.checked=false;save();render(root);break;
      case 'check':if(complete()){state.checked=true;save();refresh(root);}break;
      case 'hint':state.hint=!state.hint;save();b.setAttribute('aria-expanded',String(state.hint));b.textContent=state.hint?'Tipp ausblenden':'Tipp anzeigen';root.querySelector('.det-hint').hidden=!state.hint;break;
      case 'print':if(state.checked)printReport();break;
      case 'download':if(state.checked)exportText();break;
      case 'reset':if(confirm('Den Fall neu starten? Der bisherige Bericht wird gelöscht.')){state=fresh();move(root,1);}break;
    }
  };
}
