import { worksheetTasks } from './practice-material.js';
import { topicsFor } from './practice-topics.js';
import { escapeHtml } from './details.js';
import { selector, btn } from './practice-ui.js';
import { lessonVisual } from './practice-figures.js';

export function teacherBank(stage) {
  const material = worksheetTasks.filter(t => t.years.includes(stage.year) && (!t.course || t.course === stage.course)).map(t => ({ ...t, group: 'Stoffe' }));
  const topical = topicsFor(stage).flatMap(t => t.questions.map((q, index) => ({
    id: t.id + '/' + index, subject: t.title, group: 'Themen', prompt: q.prompt, solution: q.choices[q.answer] + ' ' + q.explanation,
    choices: q.choices, visual: t.visual, topicId: t.id
  })));
  return [...material, ...topical];
}
function teacherDraft(stage) {
  return { group: 'Themen', subject: topicsFor(stage)[0].title, ids: [], view: 'build', slide: 0, reveal: false, paused: false };
}
function orderedTasks(s, stage) {
  const lookup = new Map(teacherBank(stage).map(t => [t.id, t]));
  return s.ids.map(id => lookup.get(id)).filter(Boolean);
}
function taskChoices(t) {
  return t.choices ? '<ol class="pr-paper-options" type="A">' + t.choices.map(item => '<li>' + escapeHtml(item) + '</li>').join('') + '</ol>' : '';
}
function paperTask(t, index, answers) {
  return `<section class="pr-paper-task"><h3>Aufgabe ${index + 1} · ${escapeHtml(t.subject)}</h3><p class="pr-paper-prompt">${escapeHtml(t.prompt)}</p>${answers ? '' : lessonVisual(t.topicId,t.visual,true)}
    ${answers ? '<p class="pr-model-answer"><strong>Musterlösung</strong> · ' + escapeHtml(t.solution) + '</p>' : taskChoices(t) + '<div class="pr-writing-lines" aria-hidden="true"></div>'}</section>`;
}
export function worksheetDocument(s, stage, answers) {
  const tasks = orderedTasks(s, stage);
  return `<article class="pr-paper"><header><small>D[Ag] Table · Chemie · ${escapeHtml(stage.label)}</small><h1>${answers ? 'Lösungsblatt' : 'Arbeitsblatt'}</h1>${answers ? '' : '<p>Name __________________________________ &emsp; Datum __________________</p>'}</header>${tasks.map((t, i) => paperTask(t, i, answers)).join('')}</article>`;
}
function slideView(s, stage) {
  const tasks = orderedTasks(s, stage);
  const t = tasks[s.slide];
  return `<div class="pr-projector"><div class="pr-slide-top"><span>${escapeHtml(stage.label)} · Aufgabe ${s.slide + 1} von ${tasks.length}</span>${btn('Beameransicht beenden', 'end')}</div>
    ${s.paused ? '<div class="pr-paused"><h3>Denkpause</h3></div>' : `<h3 class="pr-slide-title">${escapeHtml(t.subject)}</h3><h4 class="pr-slide-question">${escapeHtml(t.prompt)}</h4>${lessonVisual(t.topicId,t.visual)}${taskChoices(t)}${s.reveal ? '<div class="pr-result pr-success"><b>Musterlösung</b><p>' + escapeHtml(t.solution) + '</p></div>' : ''}`}
    <div class="pr-actions">${btn('Zurück', 'prev', '', { disabled: s.slide === 0 })}${btn(s.reveal ? 'Lösung ausblenden' : 'Lösung zeigen', 'reveal', '', { primary: true, disabled: s.paused })}${btn(s.paused ? 'Fortsetzen' : 'Denkpause', 'pause')}${btn('Weiter', 'next', '', { disabled: s.slide + 1 >= tasks.length })}</div></div>`;
}
function renderTeacher(s, stage) {
  if (s.view === 'slides') return slideView(s, stage);
  const bank = teacherBank(stage);
  const records = bank.filter(t => t.group === s.group);
  const subjects = [...new Set(records.map(t => t.subject))];
  const available = records.filter(t => t.subject === s.subject);
  const chosen = orderedTasks(s, stage);
  const none = !chosen.length;
  return `<div class="pr-teacher-grid"><section><h3>Aufgaben auswählen</h3><p>Kombiniere Aufgaben aus verschiedenen Themen oder Stoffsteckbriefen für ${escapeHtml(stage.label)}.</p>
    ${selector('Aufgabenpool', 'group', [['Themen','Themen der Stufe'], ['Stoffe','Stoffe und Steckbriefe']], s.group)}
    ${selector(s.group === 'Themen' ? 'Unterrichtsthema' : 'Stoff', 'subject', subjects.map(x => [x, x]), s.subject)}
    <div class="pr-bank">${available.map(t => `<label><input type="checkbox" data-pr-field="pick" value="${escapeHtml(t.id)}"${s.ids.includes(t.id) ? ' checked' : ''}><span>${escapeHtml(t.prompt)}</span></label>`).join('')}</div></section>
    <aside class="pr-selection"><h3>Meine Auswahl <span>${chosen.length}</span></h3>${none ? '<p>Gewählte Aufgaben erscheinen hier in der Reihenfolge, in der du sie hinzufügst.</p>' :
      '<ol>' + chosen.map(t => '<li><div><b>' + escapeHtml(t.subject) + '</b><p>' + escapeHtml(t.prompt) + '</p></div>' + btn('×', 'remove', t.id, { aria: 'Aufgabe entfernen: ' + t.prompt }) + '</li>').join('') + '</ol>'}
    <div class="pr-actions">${btn('Arbeitsblatt drucken', 'print-tasks', '', { primary: true, disabled: none })}${btn('Lösungen drucken', 'print-answers', '', { disabled: none })}${btn('Beameransicht öffnen', 'slides', '', { disabled: none })}</div></aside></div>`;
}
function teacherAction(s, action, value, stage) {
  const bank = teacherBank(stage);
  if (action === 'set:group') { s.group = value; s.subject = bank.find(t => t.group === value).subject; }
  if (action === 'set:subject') s.subject = value;
  if ((action === 'set:pick' || action === 'remove') && bank.some(t => t.id === value)) {
    if (s.ids.includes(value)) s.ids = s.ids.filter(id => id !== value);
    else if (action === 'set:pick') s.ids.push(value);
  }
  if (!s.ids.length) return;
  if (action === 'print-tasks' || action === 'print-answers') {
    document.getElementById('practice-print').innerHTML = worksheetDocument(s, stage, action === 'print-answers');
    document.body.classList.add('pr-printing');
    window.print();
    return;
  }
  if (action === 'slides') { s.view = 'slides'; s.slide = 0; s.reveal = false; s.paused = false; }
  if (action === 'end') s.view = 'build';
  if (action === 'prev' || action === 'next') {
    s.slide = Math.min(s.ids.length - 1, Math.max(0, s.slide + (action === 'prev' ? -1 : 1)));
    s.reveal = false; s.paused = false;
  }
  if (action === 'reveal' && !s.paused) s.reveal = !s.reveal;
  if (action === 'pause') s.paused = !s.paused;
}
export const teacherWorkshop = { initial: teacherDraft, render: renderTeacher, act: teacherAction };

