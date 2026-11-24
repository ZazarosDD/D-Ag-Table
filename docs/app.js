import { cellForStage } from './redox-cells.js';
import { createPractice, practiceTool, practiceFocus, practiceCurriculum, practiceHelp } from './practice.js';
import { redoxChoices, redoxStudy, redoxFocus, redoxCurriculum, redoxHelp, redoxSources, createRedoxPlayer } from './redox.js';
import { schoolStage, stageKeys, mainGroup } from './school.js';
import {
  elements, compounds, elementBySymbol, compoundByFormula, families, notes,
  examplesByElement, findElements, findCompounds,
} from './catalogue.js';
import { icon, fillIcons } from './icons.js';
import { measurements, measurementLabel, measurementStyle, scaleLegend } from './comparison.js';
import { escapeHtml, formatFormula, categoryLabel, elementDetail, compoundDetail, helpDetail, sourcesDetail, curriculumInfo } from './details.js';

const $ = selector => document.querySelector(selector);
const table = $('#periodic-table');
const dialog = $('#detail-dialog');
const dialogBody = $('#dialog-body');
const elementSearch = $('#element-query');
const compoundSearch = $('#compound-query');
const familySelect = $('#family-select');
const categorySelect = $('#category-select');
const practice = createPractice($('#practice-root'));
const pageSize = 12;
const storageKey = 'dag-table-jahrgang';
function wantsRedox() {
  return /^#redox(?:[/?]|$)/.test(location.hash);
}
function linkedStage() {
  const key = new URLSearchParams(location.hash.split('?')[1] || '').get('stufe');
  return stageKeys.includes(key) ? key : null;
}
function initialStage() {
  if (linkedStage()) return linkedStage();
  if (/^#(?:periodensystem|verbindungen)\/(?:element|verbindung)\//.test(location.hash)) return 'alle';
  try {
    const saved = localStorage.getItem(storageKey);
    if (stageKeys.includes(saved) && (!wantsRedox() || schoolStage(saved).redox)) return saved;
  } catch { /* Storage can be unavailable when opening a classroom file locally. */ }
  return wantsRedox() ? '9' : '7';
}
let stage = schoolStage(initialStage());
let lastCourse = stage.course || 'gk';
let view = stage.year !== 7 && window.matchMedia('(max-width: 640px)').matches ? 'list' : 'grid';
let measure = 'families';
let selectedSymbol = 'Na';
let focusedSymbol = 'H';
let matches = stage.elements;
let compoundLimit = pageSize;
let exampleLimit = 3;
let page = '';
let route = {};
let redoxPlayer = null;
let renderedCell = '';
let lastHash = null;
let trigger = null;
let triggerData = null;

function gridPosition(element) {
  if (stage.year === 7) {
    const i = stage.elements.indexOf(element);
    const cols = window.matchMedia('(max-width: 640px)').matches ? 3 : 6;
    return { column: i % cols + 1, row: Math.floor(i / cols) + 1 };
  }
  if (stage.year === 8 && !stage.elements.some(e => mainGroup(e) === null)) return { column: mainGroup(element) + 1, row: element.period + 1 };
  if (element.family === 'lanthanide') return { column: element.n - 57 + 4, row: 10 };
  if (element.family === 'actinide') return { column: element.n - 89 + 4, row: 11 };
  return { column: element.group + 1, row: element.period + 1 };
}

function tile(element) {
  const position = gridPosition(element);
  const placement = stage.year === 7 ? '' : `grid-column:${position.column};grid-row:${position.row};`;
  const scale = measurements[measure];
  const value = scale ? measurementLabel(element, measure) : '';
  const reading = scale ? ` · ${scale.title}: ${value === '—' ? 'kein Tabellenwert' : value}` : '';
  const label = `${element.name}, ${element.symbol}, Ordnungszahl ${element.n}${reading}`;
  return `<button type="button" class="tile fam-${element.family}" data-element="${element.symbol}" style="${placement}${measurementStyle(element, measure)}" tabindex="-1" title="${label}" aria-label="${label}">
    <span class="tile-number">${element.n}</span><span class="tile-symbol">${element.symbol}</span><span class="tile-name">${escapeHtml(element.name)}</span>${scale ? `<span class="tile-reading">${value}</span>` : ''}
  </button>`;
}

function seriesMarker(family, row, range, symbols) {
  const name = families[family][0];
  return `<button type="button" class="series-jump fam-${family}" style="grid-column:4;grid-row:${row}" data-series="${family}" title="${name} in der ausgelagerten Reihe hervorheben" aria-label="${name}, Elemente ${range}"><span>${range}</span><b>${symbols}</b></button>`;
}

function renderGrid() {
  const html = [];
  const main = stage.year === 8 && !stage.elements.some(e => mainGroup(e) === null);
  const intro = stage.year === 7;
  const periods = Math.max(...stage.elements.map(element => element.period));
  table.classList.toggle('entry-grid', intro);
  table.classList.toggle('main-group-grid', main);
  table.classList.toggle('school-selection', !stage.all && !intro && !stage.elements.some(e => e.family === 'lanthanide' || e.family === 'actinide'));
  table.style.setProperty('--school-periods', periods);
  if (!intro) {
    html.push(main ? '<span class="axis axis-corner" title="Hauptgruppe">HG</span>' : '<span class="axis axis-corner" title="Gruppennummer">Gr.</span>');
    for (let group = 1; group <= (main ? 8 : 18); group++) {
      const iupac = main && group >= 3 ? group + 10 : group;
      const names = {1:'Alkali­metalle',2:'Erdalkali­metalle',13:'Bor­gruppe',14:'Kohlenstoff­gruppe',15:'Stickstoff­gruppe',16:'Chalko­gene',17:'Halo­gene',18:'Edel­gase'};
      const roman = {1:'I',2:'II',13:'III',14:'IV',15:'V',16:'VI',17:'VII',18:'VIII'};
      const name = names[iupac];
      html.push(`<span class="axis group-heading" style="grid-row:1;grid-column:${group + 1}" title="${name ? name.replaceAll('­','') + ' · ' + roman[iupac] + '. Hauptgruppe' : 'Nebengruppe'} · IUPAC-Gruppe ${iupac}"><span class="group-name">${name || ''}</span><span class="group-number">${iupac}${name ? ' · ' + roman[iupac] : ''}</span></span>`);
    
    }
    if (!main) html.push('<span class="axis subgroup-heading" style="grid-row:1;grid-column:4/14">Nebengruppen (Übergangsmetalle)</span>');
    for (let period = 1; period <= periods; period++) {
      html.push(`<span class="axis period" style="grid-column:1;grid-row:${period + 1}" title="Periode ${period}">${period}</span>`);
    }
  }
  html.push(...stage.elements.map(tile));
  if (stage.elements.some(e => e.family === 'lanthanide')) {
    html.push(seriesMarker('lanthanide', 7, '57–71', 'La–Lu'), '<span class="series-label fam-lanthanide" style="grid-column:1/4;grid-row:10">Lanthanoide</span>');
  }
  if (stage.elements.some(e => e.family === 'actinide')) {
    html.push(seriesMarker('actinide', 8, '89–103', 'Ac–Lr'), '<span class="series-label fam-actinide" style="grid-column:1/4;grid-row:11">Actinoide</span>');
  }
  if (stage.all) html.push('<div class="table-feature" id="table-feature"></div>');
  table.innerHTML = html.join('');
  table.classList.toggle('shows-measurement', Boolean(measurements[measure]));
  updateFeature();
}

function buildTable() {
  renderGrid();
  familySelect.length = 1;
  categorySelect.length = 1;
  const legend = [];
  const visibleFamilies = new Set(stage.elements.map(element => element.family));
  for (const [key, [name]] of Object.entries(families)) {
    if (!visibleFamilies.has(key)) continue;
    familySelect.add(new Option(name, key));
    legend.push(`<button type="button" class="legend-button fam-${key}" data-family="${key}" aria-pressed="false" title="${name} filtern"><span class="swatch"></span>${name}</button>`);
  }
  for (const category of ['Alltag', 'Technik', 'Natur', 'Forschung']) {
    if (stage.compounds.some(c => c.category === category)) categorySelect.add(new Option(category, category));
  }
  $('#legend-items').innerHTML = legend.join('');
  $('#school-course').hidden = !stage.course;
  for (const button of document.querySelectorAll('button[data-grade]')) {
    button.setAttribute('aria-pressed', button.dataset.grade === (stage.all ? 'alle' : String(stage.year)));
  }
  for (const button of document.querySelectorAll('button[data-course]')) {
    button.setAttribute('aria-pressed', button.dataset.course === lastCourse);
  }
  $('#element-heading').textContent = stage.year === 7 ? 'Elementkarten' : 'Elemente erkunden';
  $('#family-legend').hidden = stage.year === 7 || measure !== 'families';
  familySelect.closest('label').hidden = stage.year === 7;
  $('.measure-bar').hidden = !stage.en;
  for (const button of document.querySelectorAll('button[data-measure]')) {
    button.hidden = (button.dataset.measure === 'radius' && !stage.radius) || (button.dataset.measure === 'en' && !stage.en);
    button.setAttribute('aria-pressed', button.dataset.measure === measure);
  }
  $('#measure-key').innerHTML = scaleLegend(measure);
  $('.mineral-label').hidden = !stage.byFormula.has('CaF2');
  $('#table-scroll').setAttribute('aria-label', stage.year === 7 ? 'Elementauswahl für Klasse 7' : 'Periodensystem, Gruppen und Perioden');
}

function chooseStage(key, keepDetail = false) {
  if (!stageKeys.includes(key) || key === stage.key) return;
  if (keepDetail) history.replaceState(sessionEntry(history.state?.depth || 0), '', hashFor(route, key));
  else history.pushState(sessionEntry(0), '', hashFor({ page, tool: route.tool }, key));
  applyRoute();
}

function setMeasure(next) {
  if ((next === 'en' && !stage.en) || (next === 'radius' && !stage.radius)) return;
  if (next === measure || (next !== 'families' && !Object.hasOwn(measurements, next))) return;
  measure = next;
  for (const button of document.querySelectorAll('button[data-measure]')) {
    button.setAttribute('aria-pressed', button.dataset.measure === measure);
  }
  $('#measure-key').innerHTML = scaleLegend(measure);
  $('#family-legend').hidden = measure !== 'families';
  renderGrid();
  updateElements(true);
}

function updateFeature() {
  if (!stage.all) return;
  const element = elementBySymbol.get(selectedSymbol);
  const scale = measurements[measure];
  if (scale) {
    const value = measurementLabel(element, measure);
    $('#table-feature').innerHTML = `<button type="button" class="focus-tile measure-focus" style="${measurementStyle(element, measure)}" data-element="${element.symbol}" aria-label="Steckbrief von ${element.name}"><span class="focus-n">${element.n}</span><b>${element.symbol}</b><span class="focus-name">${value}</span></button>
      <div class="focus-copy"><div class="feature-kicker">${icon(measure === 'en' ? 'molecule' : 'radius')}${scale.unitLabel}</div><h3>${scale.title}</h3><p>${scale.explanation}</p><button class="feature-link" type="button" data-element="${element.symbol}">${icon('file')}Steckbrief zu ${element.name}</button></div>`;
    return;
  }
  const first = examplesByElement.get(selectedSymbol)[0];
  let description = first ? `Eine Verbindung mit ${element.name} ist ${first.name}.` : notes[selectedSymbol];
  if (selectedSymbol === 'Na') description = 'In Kochsalz findest du Natrium als positiv geladenes Ion.';
  $('#table-feature').innerHTML = `<button type="button" class="focus-tile fam-${element.family}" data-element="${element.symbol}" aria-label="Steckbrief von ${element.name}"><span class="focus-n">${element.n}</span><b>${element.symbol}</b><span class="focus-name">${escapeHtml(element.name)}</span></button>
    <div class="focus-copy"><div class="feature-kicker">${icon('focus')}Element im Fokus</div><h3>${escapeHtml(element.name)}</h3><p>${escapeHtml(description)}</p><button type="button" class="feature-link" data-element="${element.symbol}" data-section="element-connections">${icon('molecule')}Verbindungen ansehen</button></div>`;
}

function emptyResults(kind) {
  const isElement = kind === 'elements';
  return `<div class="empty-results"><h3>${isElement ? 'Kein passendes Element' : 'Keine passende Verbindung'} gefunden</h3><p>${isElement ? 'Versuche es mit einem anderen Namen, Symbol oder einer Ordnungszahl.' : 'Versuche es mit einem anderen Namen, einer Formel oder einer Verwendung.'}</p><button type="button" class="soft-button" data-action="reset-${kind}">Suche und Filter zurücksetzen</button></div>`;
}

function renderList() {
  const list = $('#element-list');
  list.classList.toggle('entry-list', stage.year === 7);
  if (!matches.length) {
    list.innerHTML = emptyResults('elements');
    return;
  }
  const scale = measurements[measure];
  if (stage.year === 7) {
    const header = '<div class="list-row list-head"><span>Nr.</span><span>Element</span><span class="list-state">Zustand bei 20 °C</span></div>';
    list.innerHTML = header + matches.map(e => `<button class="list-row list-entry fam-${e.family}" type="button" data-element="${e.symbol}"><span class="list-number">${e.n}</span><span class="list-name"><span class="compact-symbol">${e.symbol}</span><b>${escapeHtml(e.name)}</b></span><span class="list-state">${escapeHtml(e.state)}</span></button>`).join('');
    return;
  }
  const atomicMass = stage.year === 8 || stage.year === 9;
  const column = scale ? scale.title : atomicMass ? 'Atommasse' : 'Molare Masse / [A]';
  const header = `<div class="list-row list-head" aria-hidden="true"><span>Nr.</span><span>Element</span><span class="list-family">Familie</span><span class="list-mass">${column}</span><span class="list-state">Zustand bei 20 °C</span></div>`;
  const entries = matches.map(element => {
    const mass = element.mass.startsWith('[') ? element.mass : `${element.mass} <small>${atomicMass ? 'u' : 'g/mol'}</small>`;
    const value = scale ? measurementLabel(element, measure) : mass;
    const reading = scale ? `, ${scale.title}: ${value === '—' ? 'kein Tabellenwert' : value}` : '';
    return `<button class="list-row list-entry fam-${element.family}" type="button" data-element="${element.symbol}" aria-label="${element.name}, Ordnungszahl ${element.n}${reading}, Steckbrief öffnen"><span class="list-number">${element.n}</span><span class="list-name"><span class="compact-symbol" style="${measurementStyle(element, measure)}">${element.symbol}</span><b>${escapeHtml(element.name)}</b></span><span class="list-family"><i class="swatch"></i>${families[element.family][1]}</span><span class="list-mass">${value}</span><span class="list-state">${element.state}</span></button>`;
  });
  list.innerHTML = header + entries.join('');
}

function keepColumnVisible(symbol) {
  if (view !== 'grid') return;
  const scroller = $('#table-scroll');
  const target = table.querySelector(`.tile[data-element="${symbol}"]`);
  if (!target || !scroller.clientWidth || scroller.scrollWidth <= scroller.clientWidth) return;
  const bounds = scroller.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  if (rect.left < bounds.left + 6) scroller.scrollLeft += rect.left - bounds.left - 10;
  if (rect.right > bounds.right - 6) scroller.scrollLeft += rect.right - bounds.right + 10;
}

function updateElements(scrollToMatch = false) {
  const family = familySelect.value;
  matches = findElements(elementSearch.value, family, stage.elements);
  const symbols = new Set(matches.map(element => element.symbol));
  if (!symbols.has(focusedSymbol)) focusedSymbol = matches[0]?.symbol ?? 'H';
  const filtered = Boolean(elementSearch.value.trim()) || family !== 'all';
  $('#element-filter-status').hidden = !filtered;
  $('#element-result-count').textContent = `${matches.length} von ${stage.elements.length} Elementen`;
  $('#table-panel').hidden = view !== 'grid';
  $('#element-list').hidden = view !== 'list';
  $('#grid-view').setAttribute('aria-pressed', view === 'grid');
  $('#list-view').setAttribute('aria-pressed', view === 'list');
  for (const button of table.querySelectorAll('.tile')) {
    const active = symbols.has(button.dataset.element);
    button.disabled = !active;
    button.classList.toggle('is-muted', !active);
    button.classList.toggle('is-emphasized', filtered && active && matches.length === 1);
    button.tabIndex = active && button.dataset.element === focusedSymbol ? 0 : -1;
  }
  for (const button of document.querySelectorAll('.legend-button')) {
    button.setAttribute('aria-pressed', button.dataset.family === family);
    button.classList.toggle('is-dim', family !== 'all' && button.dataset.family !== family);
  }
  const noMatches = matches.length === 0;
  $('#table-scroll').hidden = noMatches;
  $('.mobile-hint').hidden = noMatches || stage.year === 7;
  $('#empty-grid').hidden = !noMatches;
  if (noMatches) $('#empty-grid').innerHTML = emptyResults('elements');
  if (stage.all) $('#table-feature').style.visibility = !measurements[measure] && filtered && !symbols.has(selectedSymbol) ? 'hidden' : 'visible';
  if (view === 'list') renderList();
  if (scrollToMatch && filtered && matches.length) keepColumnVisible(matches[0].symbol);
}

function compoundCard(compound) {
  const name = escapeHtml(compound.name);
  return `<article class="compound-card cat-${compound.category.toLowerCase()}">
    <span class="compound-top"><span class="formula-display"><span class="formula-plain">${formatFormula(compound.formula)}</span></span>${categoryLabel(compound.category)}</span>
    <h3><button type="button" class="card-opener" data-compound="${escapeHtml(compound.formula)}" aria-label="${name}, Verbindung erkunden">${name}</button></h3><p>${escapeHtml(compound.use)}</p>
    <span class="card-elements" aria-label="Enthaltene Elemente">${compound.elements.map(symbol => `<span>${symbol}</span>`).join('')}</span>
  </article>`;
}

function updateCompounds() {
  const results = findCompounds(compoundSearch.value, categorySelect.value, stage.compounds);
  const filtered = Boolean(compoundSearch.value.trim()) || categorySelect.value !== 'all';
  $('#compound-filter-status').hidden = !filtered;
  $('#compound-result-count').textContent = `${results.length} von ${stage.compounds.length} Verbindungen`;
  $('#compound-cards').innerHTML = results.length ? results.slice(0, compoundLimit).map(compoundCard).join('') : emptyResults('compounds');
  const remains = Math.max(0, results.length - compoundLimit);
  $('#load-row').innerHTML = remains ? `<span>${compoundLimit} von ${results.length} Verbindungen</span><button class="soft-button" type="button" data-action="load-compounds">${icon('plus')}Weitere ${Math.min(pageSize, remains)} anzeigen</button>` : '';
}

const siteName = 'D[Ag] Table';
const pageInfo = {
  periodensystem: { title: siteName, description: 'Erkunde das Periodensystem und entdecke, in welchen Verbindungen dir die Elemente im Alltag begegnen.', stats: [['table', elements.length, 'Elemente'], ['columns', 18, 'Gruppen'], ['rows', 7, 'Perioden']] },
  redox: { title: 'Redox & Batterien', description: 'Verfolge beim Entladen den Weg der Elektronen vom Minuspol zum Pluspol.', stats: [] },
  ueben: { title: 'Üben', description: 'Löse eine Frage aus dem Unterricht oder erprobe deine Idee an einem Modell.', stats: [] },
  verbindungen: { title: 'Chemische Verbindungen', description: 'Vom Kochsalz bis zur Kameralinse. Entdecke, welche Elemente in einem Stoff stecken und wofür wir ihn verwenden.', stats: [['molecule', compounds.length, 'Verbindungen'], ['layers', 4, 'Bereiche']] },
};

function showPage(newPage) {
  const changed = Boolean(page) && page !== newPage;
  page = newPage;
  const info = pageInfo[page];
  const isRedox = page === 'redox';
  const isPractice = page === 'ueben';
  document.body.classList.toggle('on-redox', isRedox);
  document.body.classList.toggle('on-practice', isPractice);
  if (!isPractice) practice.deactivate();
  document.body.classList.toggle('redox-available', stage.redox);
  $('#redox-nav').hidden = !stage.redox;
  $('#redox-section').hidden = !isRedox;
  $('#practice-section').hidden = !isPractice;
  $('#hero-stats').hidden = isRedox || isPractice;
  const [topic, focus] = isPractice ? practiceFocus(stage) : isRedox ? redoxFocus(stage) : [stage.title, stage.focus];
  $('#school-topic').textContent = topic;
  $('#school-focus').textContent = focus;
  $('#school-curriculum').innerHTML = isPractice ? practiceCurriculum(stage) : isRedox ? redoxCurriculum(stage) : curriculumInfo(stage);
  $('#page-title').textContent = info.title;
  $('#page-description').textContent = stage.all || isRedox || isPractice ? info.description : page === 'periodensystem'
    ? 'Wähle ein Element und entdecke seine Eigenschaften und Verbindungen.'
    : 'Entdecke, wo diese Stoffe vorkommen, welche Elemente sie enthalten und wofür wir sie verwenden.';
  $('#hero-stats').setAttribute('aria-label', page === 'periodensystem' ? 'Aufbau des Periodensystems' : 'Umfang des Verbindungskatalogs');
  const stats = stage.all ? info.stats : [['table', stage.elements.length, 'Elemente'], ['molecule', stage.compounds.length, 'Verbindungen']];
  $('#hero-stats').innerHTML = stats.map(([symbol, value, text]) => `<span>${icon(symbol)}<b>${value}</b> ${text}</span>`).join('');
  $('#element-section').hidden = page !== 'periodensystem';
  $('#compound-section').hidden = page !== 'verbindungen';
  $('.brand').setAttribute('href', hashFor({ page: 'periodensystem' }));
  for (const link of document.querySelectorAll('.main-nav a')) {
    link.setAttribute('href', hashFor({ page: link.dataset.page }));
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (isRedox) {
    $('#redox-choices').innerHTML = redoxChoices(stage);
  } else {
    if (redoxPlayer) {
      redoxPlayer.dispose();
      redoxPlayer = null;
      renderedCell = '';
      $('#redox-choices').innerHTML = '';
      $('#redox-study').innerHTML = '';
    }
    if (page === 'verbindungen') updateCompounds();
    else if (!isPractice) updateElements();
  }
  if (changed) window.scrollTo(0, 0);
}

// Each detail has a link students can reuse. Browser Back retraces element/compound hops.
function readRoute() {
  let parts;
  try { parts = location.hash.slice(1).split('?')[0].split('/').map(decodeURIComponent); }
  catch { return { page: 'periodensystem' }; }
  if (parts[0] === 'redox' && !stage.redox) return { page: 'periodensystem' };
  const newPage = ['verbindungen', 'redox', 'ueben'].includes(parts[0]) ? parts[0] : 'periodensystem';
  const destination = { page: newPage };
  if (newPage === 'ueben') destination.tool = practiceTool(stage, new URLSearchParams(location.hash.split('?')[1] || '').get('werkzeug'));
  if (newPage === 'redox') {
    const requested = new URLSearchParams(location.hash.split('?')[1] || '').get('zelle');
    destination.cell = cellForStage(stage, requested).id;
  }
  const [, kind, id] = parts;
  if (kind === 'element' && elementBySymbol.has(id)) return { ...destination, kind, id };
  if (kind === 'verbindung' && compoundByFormula.has(id)) return { ...destination, kind, id };
  if (kind === 'lernhilfe' || kind === 'quellen') return { ...destination, kind };
  return destination;
}

function hashFor(destination, key = stage.key) {
  const target = key === stage.key ? stage : schoolStage(key);
  if (destination.page === 'redox' && !target.redox) return '#periodensystem?stufe=' + key;
  const path = [destination.page, destination.kind, destination.id].filter(Boolean).map(encodeURIComponent).join('/');
  const cell = destination.page === 'redox' ? cellForStage(target, destination.cell || route.cell) : null;
  const tool = destination.page === 'ueben' ? practiceTool(target, destination.tool ?? (destination.kind ? route.tool : '')) : '';
  return '#' + path + '?stufe=' + key + (cell ? '&zelle=' + cell.id : '') + (tool ? '&werkzeug=' + tool : '');
}

function showRedoxCell() {
  const cell = cellForStage(stage, route.cell);
  const signature = stage.key + '/' + cell.id;
  if (renderedCell !== signature) {
    redoxPlayer?.dispose();
    const study = $('#redox-study');
    study.innerHTML = redoxStudy(cell, stage);
    redoxPlayer = createRedoxPlayer(study, cell, stage);
    renderedCell = signature;
    for (const choice of document.querySelectorAll('#redox-choices [data-cell]')) {
      choice.setAttribute('aria-pressed', choice.dataset.cell === cell.id);
    }
  }
  if (route.kind) redoxPlayer.pause();
}

function sessionEntry(depth) { return { elementatlas: true, depth }; }

function navigate(destination, opener) {
  const hash = hashFor(destination);
  if (hash === location.hash) return;
  if (!route.kind && destination.kind) {
    trigger = opener ?? document.activeElement;
    triggerData = trigger?.dataset.element ? ['element', trigger.dataset.element] : trigger?.dataset.compound ? ['compound', trigger.dataset.compound] : null;
  }
  const depth = destination.kind ? (history.state?.depth ?? 0) + 1 : 0;
  history.pushState(sessionEntry(depth), '', hash);
  applyRoute();
}

function closeDetail() {
  const depth = history.state?.elementatlas ? history.state.depth : 0;
  if (depth > 0) history.go(-depth);
  else {
    history.replaceState(sessionEntry(0), '', hashFor({ page, tool: route.tool }));
    applyRoute();
  }
}

function restoreTrigger() {
  let focus = trigger;
  if (!focus?.isConnected || !focus.getClientRects().length) {
    focus = triggerData ? [...document.querySelectorAll(`[data-${triggerData[0]}]`)].find(node => node.dataset[triggerData[0]] === triggerData[1] && node.getClientRects().length) : null;
  }
  (focus ?? $('.main-nav [aria-current="page"]'))?.focus({ preventScroll: true });
  trigger = null;
  triggerData = null;
}

function drawDialog() {
  const { kind, id } = route;
  const labels = { element: ['table', 'Elementsteckbrief'], verbindung: ['molecule', 'Verbindungssteckbrief'], lernhilfe: ['book', 'Lernhilfe'], quellen: ['book-open', 'Datenquellen'] };
  const [symbol, label] = labels[kind];
  const back = (history.state?.depth ?? 0) > 1 ? '<button type="button" class="back-button" data-action="back">Zurück</button><span class="context-divider" aria-hidden="true">/</span>' : '';
  $('#dialog-context').innerHTML = `${back}<span class="dialog-kicker">${icon(symbol)}${label}</span>`;
  if ((kind === 'element' && !stage.symbols.has(id)) || (kind === 'verbindung' && !stage.byFormula.has(id))) {
    dialogBody.innerHTML = `<h2 id="dialog-title">Außerhalb dieser Auswahl</h2><p>Dieser Steckbrief gehört zur Gesamtansicht. Du lernst gerade mit der Auswahl für ${escapeHtml(stage.label)}.</p><button type="button" class="soft-button" data-action="open-full">In der Gesamtansicht öffnen</button>`;
    return;
  }
  if (kind === 'element') dialogBody.innerHTML = elementDetail(elementBySymbol.get(id), exampleLimit, stage);
  if (kind === 'verbindung') dialogBody.innerHTML = compoundDetail(stage.byFormula.get(id), stage);
  if (kind === 'lernhilfe') dialogBody.innerHTML = page === 'ueben' ? practiceHelp(stage, false) : page === 'redox' ? redoxHelp(stage) : helpDetail(stage);
  if (kind === 'quellen') dialogBody.innerHTML = page === 'ueben' ? practiceHelp(stage, true) : page === 'redox' ? redoxSources(cellForStage(stage, route.cell), stage) : sourcesDetail(stage);
}

function applyRoute() {
  if (lastHash === location.hash) return;
  lastHash = location.hash;
  const newKey = linkedStage() || initialStage();
  const changedStage = stage.key !== newKey;
  if (changedStage) {
    stage = schoolStage(newKey);
    lastCourse = stage.course || lastCourse;
    try { localStorage.setItem(storageKey, newKey); } catch { /* Optional preference. */ }
    measure = 'families';
    selectedSymbol = stage.symbols.has('Na') ? 'Na' : stage.elements[0].symbol;
    focusedSymbol = stage.elements[0].symbol;
    elementSearch.value = compoundSearch.value = '';
    familySelect.value = categorySelect.value = 'all';
    compoundLimit = pageSize;
    buildTable();
  }
  route = readRoute();
  if ((wantsRedox() || route.page === 'ueben') && location.hash !== hashFor(route)) {
    history.replaceState(history.state || sessionEntry(0), '', hashFor(route));
    lastHash = location.hash;
  }
  if (route.page !== page || changedStage) showPage(route.page);
  if (route.page === 'redox') showRedoxCell();
  if (route.page === 'ueben') practice.activate(stage, route.tool);
  if (!route.kind) {
    document.title = page === 'periodensystem' ? siteName : `${pageInfo[page].title} · ${siteName}`;
    if (dialog.open) {
      dialog.close();
      document.body.classList.remove('dialog-open');
      restoreTrigger();
    }
    return;
  }
  exampleLimit = 3;
  if (route.kind === 'element' && route.id !== selectedSymbol && stage.symbols.has(route.id)) {
    selectedSymbol = route.id;
    updateFeature();
    updateElements();
  }
  drawDialog();
  dialogBody.scrollTop = 0;
  document.title = `${$('#dialog-title').textContent} · ${siteName}`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  $('#dialog-close').focus({ preventScroll: true });
}

function resetElements() {
  elementSearch.value = '';
  familySelect.value = 'all';
  updateElements();
  elementSearch.focus({ preventScroll: true });
}

function resetCompounds() {
  compoundSearch.value = '';
  categorySelect.value = 'all';
  compoundLimit = pageSize;
  updateCompounds();
  compoundSearch.focus({ preventScroll: true });
}

function toggleFamily(family) {
  familySelect.value = familySelect.value === family ? 'all' : family;
  updateElements(true);
}

function handleAction(action, button) {
  if (action === 'open-full') return chooseStage('alle', true);
  if (action === 'toggle-picture') {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    const label = expanded ? 'Bild verkleinern' : 'Bild vergrößern';
    button.closest('figure').dataset.expanded = String(expanded);
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', label);
    button.title = label;
    return;
  }
  if (action === 'help' || action === 'sources') navigate({ page, kind: action === 'help' ? 'lernhilfe' : 'quellen' }, button);
  if (action === 'back') history.back();
  if (action === 'reset-elements') resetElements();
  if (action === 'reset-compounds') resetCompounds();
  if (action === 'load-compounds') {
    const oldLimit = compoundLimit;
    compoundLimit += pageSize;
    updateCompounds();
    $('#compound-cards').children[oldLimit]?.querySelector('button')?.focus({ preventScroll: true });
  }
  if (action === 'more-examples') {
    const previous = exampleLimit;
    exampleLimit += 6;
    const top = dialogBody.scrollTop;
    drawDialog();
    dialogBody.scrollTop = top;
    $('#element-examples').children[previous]?.querySelector('button')?.focus({ preventScroll: true });
  }
}

function jumpToSection(section) {
  const destination = document.getElementById(section);
  if (dialog.open && destination && dialogBody.contains(destination)) {
    destination.focus({ preventScroll: true });
    destination.scrollIntoView({ block: 'start' });
  }
}

document.addEventListener('click', event => {
  const button = event.target.closest('button,a');
  if (!button || button.disabled) return;
  const { page: nextPage, element, compound, family, series, action, measure: nextMeasure, section } = button.dataset;
  if (button.dataset.redoxAction && page === 'redox') {
    redoxPlayer?.action(button.dataset.redoxAction);
    return;
  }
  if (button.dataset.cell && page === 'redox') {
    navigate({ page, cell: button.dataset.cell }, button);
    return;
  }
  if (button.dataset.grade) {
    const grade = button.dataset.grade;
    chooseStage(grade === '12' || grade === '13' ? grade + '-' + lastCourse : grade);
    return;
  }
  if (button.dataset.course && stage.course) return chooseStage(stage.year + '-' + button.dataset.course);
  if (nextPage) {
    if (nextPage === 'redox' && !stage.redox) { event.preventDefault(); return; }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate({ page: nextPage, tool: button.dataset.tool });
  } else if (element) {
    navigate({ page, kind: 'element', id: element }, button);
    if (section) jumpToSection(section);
  } else if (section) jumpToSection(section);
  else if (nextMeasure) setMeasure(nextMeasure);
  else if (compound) navigate({ page, kind: 'verbindung', id: compound }, button);
  else if (family) toggleFamily(family);
  else if (series) {
    familySelect.value = series;
    elementSearch.value = '';
    updateElements(true);
    const first = table.querySelector(`.tile.fam-${series}`);
    first?.focus();
  } else if (action) handleAction(action, button);
});

for (const choice of ['grid', 'list']) {
  $(`#${choice}-view`).addEventListener('click', () => {
    view = choice;
    updateElements(true);
  });
}
elementSearch.addEventListener('input', () => updateElements(true));
$('#redox-study').addEventListener('change', event => {
  if (page === 'redox' && event.target.dataset.rxSetting) redoxPlayer?.changeSetting(event.target.dataset.rxSetting,event.target.value);
});
familySelect.addEventListener('change', () => updateElements(true));
for (const field of [compoundSearch, categorySelect]) {
  field.addEventListener(field === compoundSearch ? 'input' : 'change', () => {
    compoundLimit = pageSize;
    updateCompounds();
  });
}
elementSearch.addEventListener('keydown', event => {
  if (event.key === 'Enter' && matches.length === 1) navigate({ page, kind: 'element', id: matches[0].symbol }, elementSearch);
});
compoundSearch.addEventListener('keydown', event => {
  const results = findCompounds(compoundSearch.value, categorySelect.value, stage.compounds);
  if (event.key === 'Enter' && results.length === 1) navigate({ page, kind: 'verbindung', id: results[0].formula }, compoundSearch);
});

table.addEventListener('focusin', event => {
  if (!event.target.matches('.tile')) return;
  const previous = table.querySelector('.tile[tabindex="0"]');
  if (previous) previous.tabIndex = -1;
  event.target.tabIndex = 0;
  focusedSymbol = event.target.dataset.element;
});

table.addEventListener('keydown', event => {
  const source = event.target.closest('.tile');
  if (!source || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const current = gridPosition(elementBySymbol.get(source.dataset.element));
  let target;
  if (event.key === 'Home' || event.key === 'End') target = event.key === 'Home' ? matches[0] : matches.at(-1);
  else {
    const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const candidates = matches.map(element => ({ element, ...gridPosition(element) }));
    const possible = candidates.filter(cell => horizontal ? cell.row === current.row && (cell.column - current.column) * direction > 0 : (cell.row - current.row) * direction > 0);
    const distance = cell => horizontal ? Math.abs(cell.column - current.column) : 20 * Math.abs(cell.row - current.row) + Math.abs(cell.column - current.column);
    possible.sort((a, b) => distance(a) - distance(b));
    target = possible[0]?.element;
  }
  if (target) table.querySelector(`.tile[data-element="${target.symbol}"]`).focus();
});

$('#dialog-close').addEventListener('click', closeDetail);
dialog.addEventListener('cancel', event => { event.preventDefault(); closeDetail(); });
dialog.addEventListener('click', event => {
  if (event.target === dialog && event.clientX < dialog.getBoundingClientRect().left) closeDetail();
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && (page === 'periodensystem' || page === 'verbindungen') && !dialog.open && !event.altKey && !event.ctrlKey && !event.metaKey && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    (page === 'verbindungen' ? compoundSearch : elementSearch).focus();
  }
});
$('.skip').addEventListener('click', event => { event.preventDefault(); $('#inhalt').focus(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) redoxPlayer?.pause(); });
window.addEventListener('popstate', applyRoute);
window.addEventListener('hashchange', applyRoute);

fillIcons();
$('#table-scroll').insertAdjacentHTML('afterend', '<div id="empty-grid" hidden></div>');
buildTable();
const initial = readRoute();
if (!history.state?.elementatlas) {
  history.replaceState(sessionEntry(0), '', hashFor({ page: initial.page, cell: initial.cell, tool: initial.tool }));
  if (initial.kind) history.pushState(sessionEntry(1), '', hashFor(initial));
}
applyRoute();
