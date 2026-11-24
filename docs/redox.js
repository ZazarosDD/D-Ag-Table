import { escapeHtml } from './details.js';
import { cellsForStage } from './redox-cells.js';
import { icon } from './icons.js';
import { createPathDraft, pathSketch, editPathDraft } from './practice-paths.js';
import { steps, stepIndex, particleBalance, modelVoltage, stepCard, settingValues, settingsMarkup } from './redox-model.js';
import { scenePieces, createScene } from './redox-scene.js';

const electrodeReference = { label: 'OpenStax · Elektrodenpotenziale und Zellspannung', url: 'https://openstax.org/books/chemistry-2e/pages/17-3-electrode-and-cell-potentials' };
const g9 = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_ch_klp_3415_2019_06_23.pdf';
const ge = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/klp_ge_nw.pdf';
const gost = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/gost_klp_ch_2022_06_07.pdf';
const redoxPlanSources = [
  { label: 'Gymnasium G9 · Elektronenübertragung, IF 7, S. 31', url: g9 + '#page=31' },
  { label: 'Gesamtschule · Fachunterricht Chemie, IF 6, S. 86', url: ge + '#page=86' },
  { label: 'Einführungsphase · Oxidationsreihe der Alkanole, S. 28', url: gost + '#page=28' },
  { label: 'Qualifikationsphase · Elektrochemie im Grundkurs, S. 40–41', url: gost + '#page=41' },
  { label: 'Qualifikationsphase · Elektrochemie im Leistungskurs, S. 50–51', url: gost + '#page=50' },
];

function links(sources) {
  return '<ul class="rx-links">' + sources.map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join('') + '</ul>';
}

export function redoxFocus(stage) {
  if (stage.year === 9) return ['Elektronenübertragung', 'Wer gibt Elektronen ab, wer nimmt sie auf? Verfolge die Teilchen und prüfe am Ende die Stoffbilanz.'];
  if (stage.year === 11) return ['EF · Transfer aus der organischen Chemie', 'Du kennst Redoxreaktionen von Alkoholen. Hier verfolgst du die Elektronenübertragung an getrennten Elektroden.'];
  if (stage.year === 13) return ['Q2 · Wiederholung der Elektrochemie', 'Vergleiche die Teilreaktionen und leite aus zwei Standardpotenzialen die Spannung einer Zelle ab.'];
  if (stage.course === 'lk') return ['Q1 · Elektrochemie im Leistungskurs', 'Unterscheide Standardbedingungen und reale Zelle. Am Daniell-Element siehst du den Einfluss der Ionenaktivitäten.'];
  if (stage.year === 12) return ['Q1 · Galvanische Zellen', 'Ordne den Polen ihre Teilreaktionen zu und berechne die Standardzellspannung.'];
  return ['Galvanische Zellen im Vergleich', 'Erkunde typische Stromquellen vom Daniell-Element bis zur modernen Knopfzelle.'];
}

export function redoxCurriculum(stage) {
  const selected = stage.all ? redoxPlanSources : stage.year === 9 ? redoxPlanSources.slice(0, 2) :
    [redoxPlanSources[stage.year === 11 ? 2 : stage.course === 'lk' ? 4 : 3]];
  return '<p>Im Atlas führt Klasse 9 die Elektronenübertragung ein. Die EF nutzt Batterien zum Transfer. Die ausführliche Elektrochemie liegt hier in Q1 und steht in Q2 zur Wiederholung bereit. Über die zeitliche Zuordnung entscheidet die Fachkonferenz.</p>' + links(selected);
}

export function redoxChoices(stage) {
  return cellsForStage(stage).map(cell => `<button type="button" class="rx-choice" data-cell="${cell.id}" aria-pressed="false" aria-controls="redox-study"><strong>${cell.name}</strong><span>${cell.context}</span></button>`).join('');
}

export function redoxHelp(stage) {
  const higher = stage.all || stage.year >= 12;
  return `<h2 id="dialog-title">Lernhilfe · Redox &amp; Batterien</h2>
    <section class="learn-item"><h3>Wo bleiben die Elektronen?</h3><p>Beim Entladen laufen zwei Reaktionen gleichzeitig ab. Am Minuspol gibt ein Stoff Elektronen ab. Durch den geschlossenen äußeren Stromkreis gelangen sie zum Pluspol. Im Elektrolyten tragen bewegliche Ionen die Ladung.</p></section>
    <section class="learn-item"><h3>Wie lese ich die Gleichungen?</h3><p>Bei der Oxidation stehen die abgegebenen Elektronen rechts vom Reaktionspfeil. Bei der Reduktion stehen die aufgenommenen Elektronen links. Addiere beide Gleichungen und kürze alle Teilchen, die auf beiden Seiten stehen.</p></section>
    <section class="learn-item"><h3>Wie bediene ich das Modell?</h3><p>Mit „Nächster Schritt“ wechselst du zwischen Abgabe, Transport, Aufnahme und Bilanz. Du kannst jeden Schritt auch direkt auswählen. Öffne den Stromkreis, um den Stromfluss zu unterbrechen. Unter „Parameter verändern“ stellst du das Tempo und die Menge der reagierenden Teilchen ein.</p></section>
    ${higher ? '<section class="learn-item"><h3>Wie berechne ich die Spannung?</h3><p>Lies für beide Elektroden das Standardpotenzial in Reduktionsrichtung ab. Ziehe den Wert am Minuspol vom Wert am Pluspol ab. Beim Anpassen der Teilgleichungen bleibt das jeweilige Potenzial gleich.</p></section>' : ''}`;
}

function cellSources(cell, stage) {
  const sources = [...cell.sources, electrodeReference];
  if ((stage.all || stage.year >= 12) && cell.id === 'daniell') {
    sources.push({ label: 'OpenStax · Zellspannung und Nernst-Gleichung', url: 'https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium' });
  }
  return links(sources);
}

export function redoxSources(cell, stage) {
  return `<h2 id="dialog-title">Quellen · Redox &amp; Batterien</h2><section class="learn-item"><h3>${cell.name}</h3>${cellSources(cell, stage)}</section><section class="learn-item"><h3>Lehrplanbezug NRW</h3>${redoxCurriculum(stage)}</section>`;
}

const wire = [[86, 100], [86, 42], [394, 42], [394, 100]];
const lengths = wire.slice(1).map(([x, y], i) => Math.hypot(x - wire[i][0], y - wire[i][1]));
const wireLength = lengths.reduce((total, length) => total + length, 0);

export function electronPosition(fraction) {
  let distance = Math.max(0, Math.min(1, fraction)) * wireLength;
  for (let i = 0; i < lengths.length; i++) {
    if (distance <= lengths[i]) {
      const [x, y] = wire[i];
      const ratio = distance / lengths[i];
      return [x + ratio * (wire[i + 1][0] - x), y + ratio * (wire[i + 1][1] - y)];
    }
    distance -= lengths[i];
  }
  return wire.at(-1);
}

function diagram(cell) {
  const daniell = cell.id === 'daniell';
  const vessels = daniell ? `<path class="rx-glass" d="M28 100V198Q28 210 40 210H169Q181 210 181 198V100M299 100V198Q299 210 311 210H440Q452 210 452 198V100"/>
    <path fill="#dfecf4" d="M31 126Q65 122 106 126T178 126V198Q178 207 168 207H41Q31 207 31 197Z"/>
    <path fill="#b8dfe9" d="M302 126Q338 122 374 126T449 126V198Q449 207 439 207H312Q302 207 302 197Z"/>
    <path class="rx-bridge-wall" d="M148 147V121Q148 94 174 94H306Q332 94 332 121V147"/>
    <path class="rx-bridge-fill" d="M148 147V121Q148 94 174 94H306Q332 94 332 121V147"/>
    <text class="rx-small-label" x="240" y="122">Salzbrücke</text>` :
    `<rect class="rx-cutaway" x="30" y="101" width="420" height="109" rx="12"/>
    <path class="rx-liquid" d="M34 126Q96 122 160 126T286 126T446 126V195Q446 206 435 206H45Q34 206 34 195Z"/>
    <rect class="rx-separator" x="231" y="105" width="18" height="101" rx="3"/>
    <path class="rx-separator-dots" d="M237 111V200M244 111V200"/>
    <text class="rx-small-label" x="240" y="227">Separator</text>`;
  const pathPoints = wire.map(point => point.join(',')).join(' ');
  return `<svg class="rx-sketch" data-cell-type="${cell.id}" viewBox="0 0 480 238" role="img" aria-labelledby="rx-diagram-title rx-diagram-desc">
    <title id="rx-diagram-title">Elektronenweg im Modell der Zelle · ${cell.name}</title>
    <desc id="rx-diagram-desc">Außen wandern Elektronen von ${cell.negative.material} links über einen Verbraucher zur Elektrode aus ${cell.positive.material} rechts. Innen übernehmen Ionen den Ladungstransport.</desc>
    ${vessels}
    <rect class="rx-plate minus" x="77" y="94" width="18" height="66" rx="3"/>
    <rect class="rx-plate plus" x="385" y="94" width="18" height="66" rx="3"/>
    <polyline class="rx-wire" points="${pathPoints}"/>
    <rect class="rx-load" x="212" y="35" width="56" height="14" rx="2"/>
    <text class="rx-small-label" x="240" y="24">Verbraucher</text>
    <path class="rx-direction" d="m156 37 7 5-7 5m158-10 7 5-7 5"/>
    <g class="rx-pole minus"><circle cx="54" cy="84" r="12"/><text x="54" y="90">−</text></g>
    <g class="rx-pole plus"><circle cx="426" cy="84" r="12"/><text x="426" y="90">+</text></g>
    <text class="rx-electrode-label" x="93" y="227">${cell.negative.label} · Anode</text>
    <text class="rx-electrode-label" x="387" y="227">${cell.positive.label} · Kathode</text>
    ${scenePieces(cell)}
    </svg>`;
}

function equation(text) {
  return escapeHtml(text).replace(/(?:2 )?e⁻/g, term => '<span class="rx-e-term">' + term + '</span>');
}

function reaction(electrode, negative) {
  return `<section class="rx-half ${negative ? 'rx-negative' : 'rx-positive'}">
    <div class="rx-half-heading"><h4>${negative ? 'Oxidation' : 'Reduktion'}</h4><span>${negative ? 'Minuspol · Anode' : 'Pluspol · Kathode'}</span></div>
    <p class="rx-equation">${equation(electrode.equation)}</p><p>${escapeHtml(electrode.explanation)}</p></section>`;
}

function voltage(value, digits, signed = false) {
  const sign = value < 0 ? '−' : signed ? '+' : '';
  return sign + Math.abs(value).toFixed(digits).replace('.', ',') + ' V';
}

function potentials(cell, stage) {
  const u = cell.positive.potential - cell.negative.potential;
  const digits = cell.decimals;
  const minus = voltage(cell.negative.potential, digits, true);
  const plus = voltage(cell.positive.potential, digits, true);
  const reductionAtMinus = cell.negative.equation.split(' → ').reverse().join(' → ');
  const quantitative = stage.all || stage.year >= 12;
  const lk = (stage.course === 'lk' || stage.all) && cell.id === 'daniell';
  return `<details class="rx-potentials"${quantitative ? ' open' : ''}><summary>Standardpotenziale und Zellspannung</summary>
    <div class="rx-potential-body"><p>Beide Tabellenwerte gelten für die <b>Reduktion</b>. Beim Entladen läuft die Reaktion am Minuspol in Gegenrichtung ab.</p>
    <table class="rx-values"><caption>Standard-Reduktionspotenziale gegen die Standard-Wasserstoffelektrode</caption>
    <thead><tr><th scope="col">Pol</th><th scope="col">Halbreaktion als Reduktion</th><th scope="col">E°</th></tr></thead>
    <tbody><tr><th scope="row">Minus</th><td>${equation(reductionAtMinus)}</td><td>${minus}</td></tr>
    <tr><th scope="row">Plus</th><td>${equation(cell.positive.equation)}</td><td>${plus}</td></tr></tbody></table>
    <div class="rx-calculation"><span>Standardzellspannung · E°<sub>Pluspol</sub> − E°<sub>Minuspol</sub></span>
    <p>${plus} − (${minus}) = <strong>${voltage(u, digits)}</strong></p></div>
    <p class="rx-condition">Tabellenwerte bei 25 °C und Standardaktivitäten. Die Standard-Wasserstoffelektrode hat das Bezugspotenzial 0 V.</p>
    ${cell.nominal ? `<p><b>Nennspannung pro handelsüblicher Zelle · ${cell.nominal}.</b> Diese Herstellerangabe beschreibt den Betrieb. Die tatsächlich gemessene Spannung hängt unter anderem vom Ladezustand und von der Belastung ab.</p>` : ''}
    ${lk ? '<details class="rx-note"><summary>LK-Vertiefung · Einfluss der Ionenaktivitäten</summary><p>Für das Daniell-Element gilt bei 25 °C näherungsweise E = E° − (0,0592 V / 2) · log₁₀[a(Zn²⁺) / a(Cu²⁺)]. Bei einem Aktivitätsverhältnis von 100 sinkt die Zellspannung von 1,10 V auf rund 1,04 V.</p></details>' : ''}
    </div></details>`;
}

export function redoxStudy(cell, stage) {
  return `<header class="rx-study-heading"><div><h2 id="rx-cell-title">${cell.name}</h2><p>${escapeHtml(cell.use)}</p></div><span class="rx-cell-type">${cell.type}</span></header>
    ${cell.id === 'daniell' ? '<section class="rx-prediction" data-rx-prediction aria-label="Vorhersage zum Daniell-Element"></section>' : ''}
    <div class="rx-solution"><div class="rx-step-tabs" role="group" aria-label="Beobachtungsschritt wählen">${steps.map(s => '<button type="button" data-redox-action="seek-' + s.id + '" aria-pressed="' + (s.id === 'bereit') + '">' + s.title + '</button>').join('')}</div>
    <div class="rx-workbench" data-rx-board data-phase="bereit">
      <figure class="rx-figure"><figcaption><h3>Teilchen beim Entladen</h3></figcaption>
        ${diagram(cell)}
        <div class="rx-controls" role="group" aria-label="Animation steuern">
          <button class="rx-play" type="button" data-redox-action="play">Animation starten</button>
          <button type="button" data-redox-action="backstep" disabled>Schritt zurück</button>
          <button type="button" data-redox-action="step">Nächster Schritt</button>
          <button type="button" data-redox-action="circuit">Stromkreis öffnen</button>
        </div>
        <p class="rx-status" role="status" aria-live="polite" data-rx-status></p>
        <p class="rx-smallprint">Die Schritte zeigen nacheinander, was an verschiedenen Orten geschieht. In der arbeitenden Zelle laufen beide Teilreaktionen und der Ladungstransport gekoppelt ab.</p>
      </figure>
      <section class="rx-live-card" data-rx-card aria-label="Teilchen im gewählten Schritt">${stepCard(cell,0,particleBalance(cell,1))}</section>
    </div>
    ${settingsMarkup(stage,cell)}
    ${stage.all || stage.year >= 12 ? '<div class="rx-meter" role="status"><span>Berechnete Leerlaufspannung</span><b data-rx-voltage></b><small data-rx-voltage-detail></small></div>' : ''}
    <details class="rx-note rx-all-equations"><summary>Alle Reaktionsgleichungen bei einfacher Menge (1×)</summary><div class="rx-reactions">
        ${reaction(cell.negative, true)}${reaction(cell.positive, false)}
        <section class="rx-net"><h4>Gesamtreaktion</h4><p class="rx-equation">${equation(cell.total)}</p></section>
    </div></details>
    ${potentials(cell, stage)}
    ${stage.year === 11 ? '<aside class="rx-transfer"><h3>Verbindung zur EF · Oxidation von Alkoholen</h3><p>Auch bei Ethanol lässt sich eine Elektronenabgabe bilanzieren. Bei der Oxidation zu Ethanal steigt die Oxidationszahl des C-Atoms an der OH-Gruppe von −I auf +I.</p><p class="rx-equation">CH₃CH₂OH → CH₃CHO + 2 H⁺ + 2 e⁻</p><p>Diese Teilgleichung gilt für die Bilanz im sauren Medium.</p></aside>' : ''}
    <details class="rx-note rx-sources"><summary>Elektrolyt und Quellen zur Zelle</summary><p><b>Elektrolyt</b> · ${escapeHtml(cell.medium)}</p>${cellSources(cell, stage)}</details></div>`;
}

export function createRedoxPlayer(root, cell, stage = { year: 9 }) {
  const board = root.querySelector('[data-rx-board]');
  const scene = createScene(root,cell,electronPosition);
  const card = root.querySelector('[data-rx-card]');
  const status = root.querySelector('[data-rx-status]');
  const play = root.querySelector('[data-redox-action="play"]');
  const step = root.querySelector('[data-redox-action="step"]');
  const back = root.querySelector('[data-redox-action="backstep"]');
  const circuit = root.querySelector('[data-redox-action="circuit"]');
  const tabs = steps.map(s => root.querySelector('[data-redox-action="seek-' + s.id + '"]'));
  const meter = stage.all || stage.year >= 12 ? root.querySelector('[data-rx-voltage]') : null;
  const meterDetail = meter ? root.querySelector('[data-rx-voltage-detail]') : null;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panel = cell.id === 'daniell' ? root.querySelector('[data-rx-prediction]') : null;
  const solution = root.querySelector('.rx-solution');
  const draft = createPathDraft();
  let gate = panel ? 'ready' : 'model';
  let requested = '';
  function paintGate(focus = '') {
    root.dataset.prediction = gate;
    if (!panel) return;
    solution.hidden = gate !== 'model';
    const buttons = (name, label, primary = false) => '<button type="button" data-redox-action="' + name + '"' + (primary ? ' class="rx-play"' : '') + '>' + label + '</button>';
    if (gate === 'ready') panel.innerHTML = '<h3>Vorhersagestopp</h3><p>Links steht die Zinkhalbzelle, rechts die Kupferhalbzelle. Wohin wandern die Elektronen und die beiden Ionen der Salzbrücke beim Entladen?</p><div class="rx-controls">' + buttons('predict', 'Teilchenwege zeichnen', true) + buttons('model', 'Direkt zur Animation') + '</div>';
    if (gate === 'drawing') panel.innerHTML = pathSketch(draft) + '<div class="rx-controls rx-to-model">' + buttons('model', draft.checked ? 'Modell und Animation öffnen' : 'Vorhersage überspringen') + '</div>';
    if (gate === 'model') panel.innerHTML = '<div class="rx-controls">' + buttons('predict', 'Zur eigenen Vorhersage') + '</div>';
    if (focus) (panel.querySelector('[data-redox-action="' + focus + '"]:not(:disabled)') || panel.querySelector('button:not(:disabled)'))?.focus({ preventScroll: true });
  }
  const values = settingValues(stage,cell);
  const settings = { amount: 1, speed: 1, series: 1, zinc: 1, copper: 1 };
  let balance = particleBalance(cell,1);
  let closed = true;
  let lastIndex = -1;
  const messages = {
    bereit: 'Der äußere Stromkreis ist geschlossen. Links und rechts siehst du die Ausgangsstoffe.',
    abgabe: 'Am Minuspol wird ein Stoff oxidiert und gibt Elektronen ab.',
    leiter: 'Außen fließen Elektronen durch den Leiter. Innen bewegen sich Ionen.',
    aufnahme: 'Am Pluspol nimmt ein Stoff Elektronen auf und wird reduziert.',
    bilanz: 'Die Gesamtgleichung zeigt, was verbraucht wird und was entsteht.',
  };
  let position = 0;
  let running = false;
  let frame = null;
  let previous = null;
  function configure() {
    scene.configure(balance,settings);
    if (meter) {
      const single = modelVoltage(cell,settings.zinc,settings.copper);
      meter.textContent = voltage(modelVoltage(cell,settings.zinc,settings.copper,settings.series),cell.decimals);
      meterDetail.textContent = (settings.series === 1 ? 'Eine Zelle' : settings.series + ' Zellen in Reihe · je ' + voltage(single,cell.decimals)) +
        (cell.id === 'daniell' ? ' · ideale Lösungen, 25 °C' : ' · Standardbedingungen');
    }
  }
  function paint() {
    scene.draw(position,closed);
    const index = stepIndex(position), phase = steps[index].id;
    board.dataset.phase = phase;
    board.dataset.circuit = closed ? 'closed' : 'open';
    if (lastIndex !== index) {
      card.innerHTML = stepCard(cell,index,balance,closed);
      lastIndex = index;
    }
    const message = closed ? messages[phase] : 'Stromkreis offen. Der Stromfluss ist unterbrochen. Schließe den Schalter, um fortzufahren.';
    if (status.textContent !== message) status.textContent = message;
    const label = running ? 'Pausieren' : position === 0 ? 'Animation starten' : position >= 1 ? 'Erneut starten' : 'Fortsetzen';
    if (play.textContent !== label) play.textContent = label;
    play.hidden = motion.matches;
    play.disabled = !closed;
    step.disabled = !closed || index === steps.length-1;
    back.disabled = !closed || index === 0;
    const switchLabel = closed ? 'Stromkreis öffnen' : 'Stromkreis schließen';
    if (circuit.textContent !== switchLabel) circuit.textContent = switchLabel;
    for (let i=0;i<tabs.length;i++) {
      const active = String(index === i);
      if (tabs[i].getAttribute('aria-pressed') !== active) tabs[i].setAttribute('aria-pressed',active);
      tabs[i].disabled = !closed;
    }
  }
  function pause() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previous = null;
    running = false;
    paint();
  }
  function tick(now) {
    if (!running) return;
    if (previous !== null) position = Math.min(1, position + (now - previous) * settings.speed / 10500);
    previous = now;
    if (position >= 1) { pause(); return; }
    paint();
    frame = window.requestAnimationFrame(tick);
  }
  function action(name) {
    if (panel && name === 'model') {
      gate = 'model'; paintGate();
      const resume = requested; requested = '';
      if (resume) action(resume);
      (closed ? motion.matches ? step : play : circuit).focus({ preventScroll: true });
      return;
    }
    if (panel && (name === 'predict' || (gate !== 'model' && (name === 'play' || name === 'step')))) {
      pause(); position = 0; paint();
      requested = name === 'predict' ? '' : name;
      gate = 'drawing'; paintGate('path-carrier-e'); return;
    }
    if (panel && gate === 'drawing' && name.startsWith('path-')) {
      editPathDraft(draft, name); paintGate(name); return;
    }
    if (gate !== 'model') return;
    if (name === 'circuit') {
      closed = !closed; lastIndex = -1; pause(); return;
    }
    if (!closed && name !== 'reset') return;
    if (name === 'play' && !motion.matches) {
      if (running) { pause(); return; }
      if (position >= 1) position = 0;
      running = true;
      previous = null;
      frame = window.requestAnimationFrame(tick);
    } else {
      pause();
      const i = stepIndex(position);
      if (name === 'step') position = steps[Math.min(steps.length-1,i+1)].position;
      if (name === 'backstep') position = steps[Math.max(0,i-1)].position;
      if (name.startsWith('seek-')) position = (steps.find(s => s.id === name.slice(5)) || steps[i]).position;
      if (name === 'reset') position = 0;
    }
    paint();
  }
  function changeSetting(key, raw) {
    const next = Number(raw);
    if (gate !== 'model' || !values[key]?.includes(next) || settings[key] === next) return;
    settings[key] = next;
    if (key === 'amount') {
      pause(); position = 0; lastIndex = -1;
      balance = particleBalance(cell,next);
    }
    if (key === 'speed') previous = null;
    configure(); paint();
  }
  function motionChanged() { pause(); }
  motion.addEventListener?.('change', motionChanged);
  if (solution) solution.hidden = false;
  paintGate();
  configure();
  paint();
  return { action, changeSetting, pause, dispose() { pause(); motion.removeEventListener?.('change', motionChanged); } };
}
