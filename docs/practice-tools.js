import { escapeHtml, formatFormula } from './details.js';
import { elementBySymbol } from './catalogue.js';
import { shellDiagram } from './atom-model.js';
import { measurementLabel } from './comparison.js';
import { detectiveCases } from './practice-material.js';
import { molecules, lewisDrawing, spatialDrawing } from './practice-molecules.js';
import { electrodes, cellResult } from './practice-electrodes.js';
import { btn, selector, result, inputField, reference } from './practice-ui.js';

function casesFor(stage) {
  return detectiveCases.filter(c => c.years.includes(stage.year) && c.choices.every(item => item.kind === 'element' ? stage.symbols.has(item.id) : stage.byFormula.has(item.id)));
}

function detectiveDraft(stage) {
  return { id: casesFor(stage)[0].id, guess: '', evidence: '', hints: 0, checked: false };
}

function renderDetective(s, stage) {
  const cases = casesFor(stage);
  const c = cases.find(item => item.id === s.id);
  const correct = s.guess === c.answer;
  const links = c.choices.map(item => `<button type="button" class="pr-profile" data-${item.kind === 'element' ? 'element' : 'compound'}="${escapeHtml(item.id)}" aria-label="Steckbrief von ${escapeHtml(item.label)} öffnen">${escapeHtml(item.label)}</button>`).join('');
  return selector('Fall', 'case', cases.map(x => [x.id, x.title]), s.id) +
    `<h3 class="pr-question">${escapeHtml(c.question)}</h3><div class="pr-options" role="group" aria-label="Vermutung">${c.choices.map(item => btn(item.label, 'guess', item.id, { pressed: s.guess === item.id })).join('')}</div>
      <div class="pr-investigate"><b>Im Atlas nachschlagen</b><div>${links}</div></div>
      <label class="pr-field"><span>Welcher Fund stützt deine Vermutung?</span><textarea data-pr-input="evidence" rows="2" placeholder="Im Steckbrief steht …">${escapeHtml(s.evidence)}</textarea></label>
      ${s.hints ? '<ul class="pr-hints">' + c.hints.slice(0, s.hints).map(hint => '<li>' + escapeHtml(hint) + '</li>').join('') + '</ul>' : ''}
      <div class="pr-actions">${btn('Fall prüfen', 'check', '', { primary: true })}${s.hints < c.hints.length ? btn('Hinweis ' + (s.hints + 1) + ' zeigen', 'hint') : ''}</div>` +
    (s.checked ? result(!s.guess ? 'Wähle einen Stoff als Vermutung.' : !s.evidence.trim() ? 'Ergänze einen kurzen Beleg aus einem Steckbrief.' : correct ? 'Vergleiche deinen Beleg mit dieser Begründung. ' + c.evidence : 'Welcher Stoff erklärt alle Hinweise? Schau noch einmal in die Steckbriefe.', correct && Boolean(s.evidence.trim()), correct && s.evidence.trim() ? 'Deine Stoffwahl passt.' : 'Ermittle weiter.') : '');
}

function detectiveAction(s, action, value, stage) {
  if (action === 'set:case') Object.assign(s, detectiveDraft(stage), { id: value });
  if (action === 'guess') { s.guess = value; s.checked = false; }
  if (action === 'hint') s.hints = Math.min(2, s.hints + 1);
  if (action === 'check') s.checked = true;
}

const salts = [
  { id: 'MgCl2', name: 'Magnesiumchlorid', plus: ['Mg²⁺', 2], minus: ['Cl⁻', -1], ratio: [1, 2] },
  { id: 'NaCl', name: 'Natriumchlorid', plus: ['Na⁺', 1], minus: ['Cl⁻', -1], ratio: [1, 1] },
  { id: 'Al2O3', name: 'Aluminiumoxid', plus: ['Al³⁺', 3], minus: ['O²⁻', -2], ratio: [2, 3] },
  { id: 'CaF2', name: 'Calciumfluorid', plus: ['Ca²⁺', 2], minus: ['F⁻', -1], ratio: [1, 2] }
];

function ionDraft() { return { id: salts[0].id, plus: 0, minus: 0, formula: '', checked: false }; }
function plainFormula(value) { return value.trim().replace(/[₀-₉]/g, c => '₀₁₂₃₄₅₆₇₈₉'.indexOf(c)); }
function renderIons(s) {
  const salt = salts.find(item => item.id === s.id);
  const charge = s.plus * salt.plus[1] + s.minus * salt.minus[1];
  const countsOK = s.plus === salt.ratio[0] && s.minus === salt.ratio[1];
  const formulaOK = plainFormula(s.formula) === salt.id;
  const bowl = (key, label) => `<div class="pr-ion-set ${key}"><h4>${label} · ${salt[key][0]}</h4><div class="pr-ions" aria-label="${s[key]} Ionen">${Array.from({ length: s[key] }, () => '<i>' + salt[key][0] + '</i>').join('') || '<span>noch leer</span>'}</div><div class="pr-stepper">${btn('−', 'count', key + '-', { disabled: !s[key], aria: label + ' entfernen' })}<output>${s[key]}</output>${btn('+', 'count', key + '+', { disabled: s[key] >= 8, aria: label + ' hinzufügen' })}</div></div>`;
  let feedback = '';
  if (s.checked) {
    const why = !s.plus || !s.minus ? 'Lege mindestens ein Ion jeder Sorte in das Modell.' :
      charge ? 'Die Ladungen gleichen sich noch nicht aus. Ergänze oder entferne Ionen, bis die Gesamtladung null ist.' :
      !countsOK ? 'Dein Modell ist neutral. Kürze die Anzahlen auf das kleinste ganzzahlige Verhältnis.' :
      !formulaOK ? 'Die Anzahl stimmt. Schreibe zuerst das Kation und dann das Anion. Eine 1 wird weggelassen.' :
      `${s.plus} × ${salt.plus[0]} und ${s.minus} × ${salt.minus[0]} ergeben die kleinste neutrale Formeleinheit.`;
    feedback = result(why, countsOK && formulaOK);
  }
  return selector('Salz', 'salt', salts.map(x => [x.id, x.name]), s.id) +
    `<h3 class="pr-question">Baue die kleinste neutrale Formeleinheit für ${salt.name}.</h3><div class="pr-split">${bowl('plus', 'Kationen')}${bowl('minus', 'Anionen')}</div>
      <p class="pr-charge" aria-live="polite">Gesamtladung <strong>${charge > 0 ? '+' : charge < 0 ? '−' : ''}${Math.abs(charge)} e</strong> <small>in Elementarladungen</small></p>
      ${inputField('Deine Verhältnisformel', 'formula', s.formula, 'Ziffern kannst du normal eintippen')}<div class="pr-actions">${btn('Modell und Formel prüfen', 'check', '', { primary: true })}</div>${feedback}`;
}
function ionAction(s, action, value) {
  if (action === 'set:salt') Object.assign(s, ionDraft(), { id: value });
  if (action === 'count') {
    const key = value.slice(0, -1);
    s[key] = Math.max(0, Math.min(8, s[key] + (value.endsWith('+') ? 1 : -1))); s.checked = false;
  }
  if (action === 'check') s.checked = true;
}

function lewisDraft(id = 'H2O') {
  const m = molecules.find(item => item.id === id);
  return { id, orders: m.orders.map(() => 0), pairs: 0, checked: false, yaw: 20, pitch: -10 };
}

const hydrogenPositions = {
  H2O: ['links', 'rechts'], NH3: ['links', 'unten', 'rechts'], CH4: ['oben', 'rechts', 'unten', 'links']
};

function renderLewis(s) {
  const m = molecules.find(item => item.id === s.id);
  const bondsOK = s.orders.every((n, i) => n === m.orders[i]);
  const correct = bondsOK && s.pairs === m.pairs;
  const hint = s.orders.some(n => n > 1) ? 'Jedes H-Atom bildet hier genau eine Einfachbindung. Verringere die betreffende Bindungsordnung.' :
    !bondsOK ? 'Mindestens ein H-Atom hat noch keine Bindung. Ergänze die fehlenden Bindungsstriche.' :
    s.pairs < m.pairs ? 'Die Bindungen stimmen. Dem Zentralatom fehlen noch freie Elektronenpaare für sein Oktett.' :
    'Die Bindungen stimmen. Zähle am Zentralatom bindende und freie Elektronenpaare zusammen. Für das Oktett braucht es vier Paare.';
  const spatial = correct && s.checked ? `<section class="pr-spatial"><h4>Räumliches Modell</h4><p>Ziehe das Molekül mit der Maus oder dem Finger. Du kannst es auch mit den Schaltflächen drehen.</p><div data-spatial>${spatialDrawing(m, s.yaw, s.pitch)}</div><div class="pr-actions">${btn('Links drehen', 'turn', 'left')}${btn('Rechts drehen', 'turn', 'right')}${btn('Nach oben kippen', 'turn', 'up')}${btn('Nach unten kippen', 'turn', 'down')}</div><p>Das Molekül ist ${m.geometry}. Der Bindungswinkel beträgt etwa ${m.angle.toLocaleString('de-DE')}°.</p>${reference(m.source, 'Molekülgeometrien und Bindungswinkel')}</section>` : '';
  return selector('Molekül', 'molecule', molecules.map(x => [x.id, x.name]), s.id) +
    `<h3 class="pr-question">Zeichne die Lewis-Struktur von ${m.name} (${formatFormula(m.id)}).</h3><div class="pr-model-lab"><div class="pr-model">${lewisDrawing(m, s.orders, s.pairs)}</div><div><p>Beginne bei einem H-Atom. Mit jedem Klick wechselst du zwischen null, einem, zwei und drei Bindungsstrichen.</p><div class="pr-actions">${s.orders.map((n, i) => btn('H ' + hydrogenPositions[m.id][i] + ' · ' + n + (n === 1 ? ' Strich' : ' Striche'), 'bond', i)).join('')}</div>
      <h4>Freie Elektronenpaare am ${m.center}-Atom</h4><div class="pr-stepper">${btn('−', 'pairs', '-1', { disabled: !s.pairs, aria: 'Ein freies Elektronenpaar entfernen' })}<output>${s.pairs}</output>${btn('+', 'pairs', '1', { disabled: s.pairs >= 4, aria: 'Ein freies Elektronenpaar ergänzen' })}</div></div></div>
      <div class="pr-actions">${btn('Struktur prüfen', 'check', '', { primary: true })}</div>${s.checked ? result(correct ? 'Alle H-Atome erreichen zwei, das Zentralatom acht Außenelektronen.' : hint, correct) : ''}${spatial}`;
}

function lewisAction(s, action, value) {
  if (action === 'set:molecule') Object.assign(s, lewisDraft(value));
  if (action === 'bond') { s.orders[Number(value)] = (s.orders[Number(value)] + 1) % 4; s.checked = false; }
  if (action === 'pairs') { s.pairs = Math.max(0, Math.min(4, s.pairs + Number(value))); s.checked = false; }
  if (action === 'check') s.checked = true;
  if (action === 'turn') {
    if (value === 'left' || value === 'right') s.yaw += value === 'left' ? -20 : 20;
    else s.pitch = (s.pitch + (value === 'up' ? 15 : -15)) % 360;
  }
}

export function enableModelRotation(root, getDraft) {
  let drag = null;
  root.addEventListener('pointerdown', event => {
    const box = event.target.closest('[data-spatial]');
    const draft = getDraft();
    if (!box || !draft || !event.isPrimary || event.button !== 0) return;
    box.setPointerCapture(event.pointerId);
    drag = { box, draft, id: event.pointerId, x: event.clientX, y: event.clientY, yaw: draft.yaw, pitch: draft.pitch };
  });
  root.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId || drag.draft !== getDraft()) return;
    const s = drag.draft;
    s.yaw = (drag.yaw + (event.clientX - drag.x) * .7) % 360;
    s.pitch = (drag.pitch + (event.clientY - drag.y) * .7) % 360;
    drag.box.innerHTML = spatialDrawing(molecules.find(item => item.id === s.id), s.yaw, s.pitch);
  });
  function stop(event) { if (drag?.id === event.pointerId) drag = null; }
  root.addEventListener('pointerup', stop);
  root.addEventListener('pointercancel', stop);
  root.addEventListener('lostpointercapture', stop);
}

const trends = [
  { id: 'alkali', years: [8, 9, 11], title: 'Besetzte Schalen der Alkalimetalle', order: ['K', 'Li', 'Na'], field: 'period', reason: 'Mit jeder neuen Periode kommt bei diesen Hauptgruppenelementen eine besetzte Schale hinzu.' },
  { id: 'halogene', years: [8, 10, 11], title: 'Besetzte Schalen der Halogene', order: ['Br', 'F', 'Cl'], field: 'period', reason: 'Fluor, Chlor und Brom stehen in derselben Hauptgruppe, aber in drei aufeinanderfolgenden Perioden.' },
  { id: 'en', years: [10, 11], title: 'Elektronegativität in einer Periode', order: ['O', 'C', 'N'], field: 'electronegativity', reason: 'In dieser Reihe zieht das gebundene Atom die Bindungselektronen nach rechts im Periodensystem stärker an.' },
  { id: 'radius', years: [11], title: 'Kovalente Radien der Alkalimetalle', order: ['Na', 'K', 'Li'], field: 'covalentRadiusPm', reason: 'Innerhalb der Gruppe kommt nach unten eine besetzte Schale hinzu. Damit nimmt hier auch der kovalente Einfachbindungsradius zu.' }
];
function trendsFor(stage) { return trends.filter(t => t.years.includes(stage.year) && t.order.every(symbol => stage.symbols.has(symbol))); }
function trendDraft(stage, id) {
  const options = trendsFor(stage);
  const defaultId = stage.year === 11 ? 'radius' : stage.year === 10 ? 'en' : 'alkali';
  const task = options.find(t => t.id === (id || defaultId)) || options[0];
  return { id: task.id, order: [...task.order], checked: false };
}
function renderTrends(s, stage) {
  const options = trendsFor(stage);
  const task = options.find(t => t.id === s.id);
  const sorted = [...task.order].sort((a, b) => elementBySymbol.get(a)[task.field] - elementBySymbol.get(b)[task.field]);
  const correct = sorted.join() === s.order.join();
  function reading(symbol) {
    const e = elementBySymbol.get(symbol);
    return task.field === 'period' ? e.period + ' Schalen' : measurementLabel(e, task.field === 'electronegativity' ? 'en' : 'radius');
  }
  return selector('Vergleich', 'trend', options.map(t => [t.id, t.title]), s.id) +
    `<h3 class="pr-question">Ordne vom kleinsten zum größten Wert.</h3><p>${escapeHtml(task.title)}. Verschiebe die Elemente mit den Pfeiltasten neben ihren Namen.</p>
    <ol class="pr-order">${s.order.map((symbol, i) => `<li><b>${symbol}</b><span>${elementBySymbol.get(symbol).name}</span>${btn('↑', 'move', i + ':-1', { disabled: i === 0, aria: symbol + ' nach vorn' })}${btn('↓', 'move', i + ':1', { disabled: i === s.order.length - 1, aria: symbol + ' nach hinten' })}</li>`).join('')}</ol>
    <div class="pr-actions">${btn('Vorhersage vergleichen', 'check', '', { primary: true })}</div>
    ${s.checked ? result(sorted.map(symbol => symbol + ' · ' + reading(symbol)).join(' < ') + '. ' + task.reason, correct) : ''}
    ${s.checked && task.field === 'period' ? '<details class="pr-details"><summary>Schalenmodelle vergleichen</summary><div class="pr-shell-gallery">' + sorted.map(symbol => shellDiagram(elementBySymbol.get(symbol))).join('') + '</div></details>' : ''}`;
}
function trendAction(s, action, value, stage) {
  if (action === 'set:trend') Object.assign(s, trendDraft(stage, value));
  if (action === 'move') {
    const [i, delta] = value.split(':').map(Number);
    if (i + delta < 0 || i + delta >= s.order.length) return;
    [s.order[i], s.order[i + delta]] = [s.order[i + delta], s.order[i]]; s.checked = false;
  }
  if (action === 'check') s.checked = true;
}

function cellDraft() { return { left: 'Zn', right: 'Cu', negative: '', direction: '', voltage: '', checked: false, showSolution: false }; }
const volts = value => value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' V';
function renderCell(s) {
  const options = electrodes.map(x => [x.symbol, x.name + ' · ' + x.ion + '/' + x.symbol]);
  const [left, right] = [s.left, s.right].map(symbol => electrodes.find(x => x.symbol === symbol));
  const cell = cellResult(left, right);
  const select = `<div class="pr-split">${selector('Halbzelle links', 'left', options, s.left)}${selector('Halbzelle rechts', 'right', options, s.right)}</div>`;
  if (!cell) return select + '<div class="pr-result" role="status">Gleiche Halbzellen unter Standardbedingungen ergeben 0,00 V. Wähle zwei unterschiedliche Metalle für die Vorhersage.</div>';
  const minus = cell.anode === left ? 'left' : 'right';
  const direction = minus === 'left' ? 'right' : 'left';
  const num = Number(s.voltage.trim().replace(',', '.'));
  const correct = s.negative === minus && s.direction === direction && s.voltage.trim() !== '' && Math.abs(num - cell.voltage) < 0.006;
  const complete = Boolean(s.negative && s.direction && s.voltage.trim() && Number.isFinite(num));
  const feedback = !complete ? 'Markiere den Minuspol, wähle die Elektronenrichtung und trage eine Spannung als Zahl ein.' :
    s.negative !== minus ? 'Vergleiche die Reduktionspotenziale. Die Halbzelle mit dem niedrigeren Wert liefert beim Entladen die Elektronen.' :
    s.direction !== direction ? 'Die Polung stimmt. Wo starten die Elektronen, wenn das Metall am Minuspol oxidiert wird?' :
    !correct ? 'Polung und Richtung stimmen. Ziehe das Reduktionspotenzial am Minuspol von dem am Pluspol ab. Achte auf das Vorzeichen.' :
    'Polung, Elektronenrichtung und Spannung stimmen.';
  const reading = elec => (elec.potential > 0 ? '+' : '') + volts(elec.potential);
  const compare = s.checked && complete && (correct || s.showSolution) ? `<div class="pr-equations"><h4>Modelllösung</h4><dl><dt>Oxidation · Minuspol</dt><dd>${cell.oxidation}</dd><dt>Reduktion · Pluspol</dt><dd>${cell.reduction}</dd><dt>Gesamtreaktion</dt><dd>${cell.total}</dd><dt>Standardzellspannung</dt><dd>E°(${cell.cathode.symbol}) − E°(${cell.anode.symbol}) = ${reading(cell.cathode)} − (${reading(cell.anode)}) = ${volts(cell.voltage)}</dd></dl></div>` : '';
  return select + `<div class="pr-cell-line"><span>${left.symbol} | ${left.ion}</span><b aria-live="polite">${s.direction === 'left' ? '← e⁻' : s.direction === 'right' ? 'e⁻ →' : '— Draht —'}</b><span>${right.ion} | ${right.symbol}</span></div>
    <p>Standard-Reduktionspotenziale bei 25 °C gegenüber der Standard-Wasserstoffelektrode: ${left.symbol} <b>${reading(left)}</b> und ${right.symbol} <b>${reading(right)}</b>.</p>
    <h4>Welche Elektrode ist beim Entladen der Minuspol?</h4><div class="pr-actions">${btn('Links · ' + left.symbol, 'pole', 'left', { pressed: s.negative === 'left' })}${btn('Rechts · ' + right.symbol, 'pole', 'right', { pressed: s.negative === 'right' })}</div>
    <h4>Zeichne den Elektronenpfeil im äußeren Leiter.</h4><div class="pr-actions">${btn('← nach links', 'direction', 'left', { pressed: s.direction === 'left' })}${btn('nach rechts →', 'direction', 'right', { pressed: s.direction === 'right' })}</div>
    ${inputField('Berechnete Standardzellspannung in Volt', 'voltage', s.voltage, 'z. B. 0,50')}<div class="pr-actions">${btn('Vorhersage prüfen', 'check', '', { primary: true })}</div>
    ${s.checked ? result(feedback,correct) : ''}${s.checked && complete && !correct && !s.showSolution ? btn('Lösungsweg ansehen', 'solution') : ''}${compare}<p>${reference(left.source, 'Quelle der Standardpotenziale')}</p>`;
}
function cellAction(s, action, value) {
  if (action === 'set:left' || action === 'set:right') {
    const pair = { left: s.left, right: s.right, [action.slice(4)]: value };
    Object.assign(s, cellDraft(), pair);
  }
  if (action === 'pole') { s.negative = value; s.checked = false; s.showSolution = false; }
  if (action === 'direction') { s.direction = value; s.checked = false; s.showSolution = false; }
  if (action === 'solution') s.showSolution = true;
  if (action === 'check') s.checked = true;
}

export const workshops = {
  detektiv: { initial: detectiveDraft, render: renderDetective, act: detectiveAction },
  ionen: { initial: ionDraft, render: renderIons, act: ionAction },
  lewis: { initial: () => lewisDraft(), render: renderLewis, act: lewisAction },
  trends: { initial: trendDraft, render: renderTrends, act: trendAction },
  zelle: { initial: cellDraft, render: renderCell, act: cellAction }
};

