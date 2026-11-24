import { icon } from './icons.js';
import { escapeHtml } from './details.js';
import { workshops, enableModelRotation } from './practice-tools.js';
import { topicWorkshop, topicsFor } from './practice-topics.js';
import { teacherWorkshop } from './practice-teacher.js';
import { toolLink, reference } from './practice-ui.js';

const toolsByName = { ...workshops, themen: topicWorkshop, unterricht: teacherWorkshop };
const descriptions = {
  themen: ['Themen der Stufe', 'Werte Messdaten, Modelle und Fallbeispiele aus.', 'book-open'],
  detektiv: ['Stoffdetektiv', 'Prüfe eine Vermutung mit Belegen aus den Steckbriefen.', 'search'],
  trends: ['PSE-Vorhersage', 'Ordne Elemente und überprüfe deinen vermuteten Trend.', 'rows'],
  ionen: ['Ionenbaukasten', 'Baue aus einzelnen Ionen eine neutrale Formeleinheit.', 'layers'],
  lewis: ['Lewis-Werkstatt', 'Zeichne Elektronenpaare und drehe das fertige Molekül.', 'molecule'],
  zelle: ['Eigene galvanische Zelle', 'Kombiniere Halbzellen und sage Polung und Spannung voraus.', 'battery'],
  unterricht: ['Unterrichtsmodus', 'Arbeitsblätter zusammenstellen und Aufgaben projizieren.', 'file']
};
const years = {
  7: ['Stoffe und Reaktionen', ['detektiv']],
  8: ['Elementfamilien und Atombau', ['trends','detektiv']],
  9: ['Salze und Elektronenübertragung', ['ionen','detektiv','trends']],
  10: ['Moleküle, Säuren und organische Stoffe', ['lewis','trends','detektiv']],
  11: ['Organische Stoffklassen, Reaktionsgeschwindigkeit und Gleichgewichte', ['lewis','trends','detektiv']],
  12: ['Säuren, Basen, Analytik und Elektrochemie', ['zelle','detektiv']],
  13: ['Organische Reaktionswege und moderne Werkstoffe', ['detektiv','zelle']]
};

export function practiceTool(stage, requested) {
  if (stage.all) return requested === 'unterricht' ? requested : '';
  const keys = ['themen', ...years[stage.year][1], 'unterricht'];
  return keys.includes(requested) ? requested : '';
}

export function practiceFocus(stage) {
  return stage.all ? ['Üben nach Jahrgang', 'Wähle oben eine Klasse für passende Aufgaben und Modelle.'] :
    [years[stage.year][0], stage.label + ' · ' + topicsFor(stage).length + ' Themen mit Aufgaben und Musterlösungen'];
}

export function practiceCurriculum(stage) {
  const links = stage.all || stage.year <= 10 ? [
    reference('https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_ch_klp_3415_2019_06_23.pdf','Gymnasium G9 · Sekundarstufe I'),
    reference('https://lehrplannavigator.nrw.de/system/files/media/document/file/klp_ge_nw.pdf','Gesamtschule · Fachunterricht Chemie')
  ] : [];
  if (stage.all || stage.year >= 11) links.push(reference('https://lehrplannavigator.nrw.de/system/files/media/document/file/gost_klp_ch_2022_06_07.pdf','Gymnasium/Gesamtschule · Oberstufe'));
  return '<p>Die Aufgaben richten sich nach den NRW-Kernlehrplänen im Schuljahr 2026/27. Die Verteilung auf einzelne Jahrgänge ist ein Unterrichtsvorschlag. Die Fachkonferenz legt die Reihenfolge an ihrer Schule fest. Die Fundstelle steht bei jeder Themenaufgabe.</p><p class="pr-sources">' + links.join(' · ') + '</p>';
}

export function practiceHelp(stage, sources) {
  if (sources) return '<h2 id="dialog-title">Quellen · Üben</h2><section class="learn-item"><h3>Unterrichtsthemen</h3>' + practiceCurriculum(stage) + '<p>Die Quellen zu Bindungswinkeln und Halbzellenpotenzialen stehen direkt im jeweiligen Modell.</p></section>';
  return '<h2 id="dialog-title">Lernhilfe · Üben</h2><section class="learn-item"><h3>Mit einer Frage beginnen</h3><p>Wähle deine Klasse und öffne „Themen der Stufe“. Lies die Darstellung, entscheide dich für eine Antwort und vergleiche deine Überlegung mit der Erklärung. Du kannst jederzeit das Thema wechseln.</p></section><section class="learn-item"><h3>Ein Modell ausprobieren</h3><p>In den Werkstätten kannst du deine Eingaben ändern und erneut prüfen. Im Stoffdetektiv bleiben deine Notizen beim Nachschlagen im Atlas erhalten.</p></section><section class="learn-item"><h3>Für Lehrkräfte</h3><p>Unter „Unterrichtsmodus“ lassen sich Aufgaben aus mehreren Themen und Steckbriefen kombinieren, getrennt mit Lösungen drucken oder einzeln am Beamer zeigen.</p></section>';
}

function hub(stage) {
  if (stage.all) return '<div class="pr-card pr-empty"><h2>Mit einem Jahrgang beginnen</h2><p>Wähle oben eine Jahrgangsstufe von 7 bis 13. Für Q1 und Q2 kannst du zusätzlich den Grund- oder Leistungskurs einstellen.</p></div>';
  const topics = topicsFor(stage);
  const featured = toolLink(stage, 'themen', `<span class="pr-lead-icon">${icon('book-open')}</span><span><strong>Thementraining öffnen</strong><small>${topics.length} Themen · ${topics.reduce((n, t) => n + t.questions.length, 0)} Aufgaben</small></span>`, 'pr-feature');
  const cards = years[stage.year][1].map(id => {
    const [name, description, glyph] = descriptions[id];
    return toolLink(stage, id, `<span class="pr-card-icon">${icon(glyph)}</span><span><strong>${name}</strong><small>${description}</small></span>`, 'pr-tool-card');
  });
  return `<div class="pr-home"><section class="pr-topic-intro"><h2>Themen der Stufe</h2>${featured}<details class="pr-details"><summary>Welche Themen sind dabei?</summary><ul>${topics.map(t => '<li>' + escapeHtml(t.title) + '</li>').join('')}</ul></details></section><section><h2>Werkstätten</h2><div class="pr-cards">${cards.join('')}</div></section></div>
    <div class="pr-teacher-link">${icon('file')}<span>Für Lehrkräfte</span>${toolLink(stage, 'unterricht', 'Unterrichtsmodus öffnen')}</div>`;
}

export function createPractice(root) {
  const drafts = new Map();
  let stage = null;
  let key = '';
  let tool = '';
  let draft = null;
  function paint() {
    const slides = tool === 'unterricht' && draft?.view === 'slides';
    document.body.classList.toggle('pr-projecting', slides);
    if (stage.all || !tool) { root.innerHTML = hub(stage); return; }
    const [name, description] = descriptions[tool];
    const header = slides ? '' : `<div class="pr-crumb">${toolLink(stage, '', 'Zur Übungsübersicht')}<span>${escapeHtml(stage.label)}</span></div><header class="pr-heading"><h2 tabindex="-1" data-pr-heading>${name}</h2><p>${description}</p></header>`;
    root.innerHTML = header + '<div class="pr-card">' + toolsByName[tool].render(draft, stage) + '</div>';
  }
  function activate(nextStage, requested) {
    const nextTool = practiceTool(nextStage, requested);
    const signature = nextStage.key + '/' + nextTool;
    if (key === signature) return;
    const refocus = Boolean(key);
    if (tool === 'unterricht' && draft) draft.view = 'build';
    key = signature; stage = nextStage; tool = nextTool;
    if (tool && !stage.all && !drafts.has(key)) drafts.set(key, toolsByName[tool].initial(stage));
    draft = drafts.get(key) || null;
    paint();
    if (refocus) root.querySelector('[data-pr-heading]')?.focus({ preventScroll: true });
  }
  function deactivate() {
    if (tool === 'unterricht' && draft) draft.view = 'build';
    key = ''; tool = ''; stage = null; draft = null;
    document.body.classList.remove('pr-projecting');
  }
  function update(action, value, field, focusKey) {
    if (!draft || !tool) return;
    const openTables = new Set([...root.querySelectorAll('details[data-pr-stay-open][open]')].map(node => node.dataset.prStayOpen));
    toolsByName[tool].act(draft, action, value, stage);
    paint();
    for (const detail of root.querySelectorAll('details[data-pr-stay-open]')) detail.open = openTables.has(detail.dataset.prStayOpen);
    const candidates = root.querySelectorAll(field ? '[data-pr-field]' : '[data-pr]');
    const next = [...candidates].find(node => !node.disabled && (field ? node.dataset.prField === field && (!['pick','answer'].includes(field) || node.value === value) : node.dataset.pr === action && (node.dataset.value || '') === (focusKey || '')));
    if (tool === 'themen' && ['set:topic','next','previous'].includes(action)) {
      root.querySelector('[data-pr-question]')?.focus();
    } else if (tool === 'themen' && (action === 'check' || action === 'solution')) {
      root.querySelector('[data-pr-feedback]')?.focus();
    } else {
      const fallback = action === 'slides' ? '[data-pr="reveal"]' : action === 'end' ? '[data-pr="slides"]' : '[data-pr-heading]';
      (next || root.querySelector(fallback))?.focus({ preventScroll: true });
    }
  }
  root.addEventListener('click', event => {
    const b = event.target.closest('button[data-pr]');
    if (b && !b.disabled) update(b.dataset.pr, b.dataset.value || '', '', b.dataset.value);
  });
  root.addEventListener('change', event => {
    const field = event.target.dataset.prField;
    if (field) update('set:' + field, event.target.value, field);
  });
  root.addEventListener('input', event => {
    const field = event.target.dataset.prInput;
    if (field && draft && Object.hasOwn(draft, field)) {
      draft[field] = event.target.value;
      draft.checked = false;
      if (Object.hasOwn(draft,'showSolution')) draft.showSolution = false;
      const stale = root.querySelector('.pr-result');
      if (stale) stale.hidden = true;
      const equations = root.querySelector('.pr-equations');
      if (equations) equations.hidden = true;
      const reveal = root.querySelector('[data-pr="solution"]');
      if (reveal) reveal.hidden = true;
    }
  });
  enableModelRotation(root, () => tool === 'lewis' ? draft : null);
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('pr-printing');
    document.getElementById('practice-print').innerHTML = '';
  });
  return { activate, deactivate };
}

