import { juniorTopics } from './topics-junior.js';
import { middleTopics } from './topics-middle.js';
import { seniorTopics } from './topics-senior.js';
import { escapeHtml } from './details.js';
import { selector, btn, reference } from './practice-ui.js';
import { lessonVisual } from './practice-figures.js';

const curriculum = [...juniorTopics, ...middleTopics, ...seniorTopics];

export function topicsFor(stage) {
  return curriculum.filter(t => t.year === stage.year && (!t.course || t.course === stage.course));
}

function topicDraft(stage) {
  return { id: topicsFor(stage)[0].id, index: 0, answer: null, checked: false, showSolution: false, completed: new Set() };
}

function answerFeedback(s,q,topic) {
  if (!s.checked) return '';
  if (s.answer === q.answer) return '<div role="status" data-pr-feedback tabindex="-1" class="pr-result pr-success"><strong>Richtig.</strong> ' + escapeHtml(q.explanation) + '</div>';
  if (s.showSolution) return '<div role="status" data-pr-feedback tabindex="-1" class="pr-result pr-solution"><strong>So lässt sich die Aufgabe lösen</strong><p>' + escapeHtml(q.choices[q.answer]) + '</p><p>' + escapeHtml(q.explanation) + '</p></div>';
  return '<div role="status" data-pr-feedback tabindex="-1" class="pr-result pr-review"><strong>Noch nicht ganz.</strong> ' +
    escapeHtml(q.hint || topic.hint || 'Lies die Angaben im Material noch einmal und vergleiche sie mit deiner Antwort.') +
    '<p>Du kannst eine andere Antwort ausprobieren.</p></div>';
}

function renderTopic(s, stage) {
  const topics = topicsFor(stage);
  const t = topics.find(item => item.id === s.id);
  const q = t.questions[s.index];
  const done = topics.filter(item => item.questions.every((_, i) => s.completed.has(item.id + '/' + i))).length;
  const correct = s.checked && s.answer === q.answer;
  const last = s.index === t.questions.length - 1;
  const lastTopic = t === topics.at(-1);
  const progress = done === topics.length ? 'Alle Themen dieser Stufe bearbeitet.' : done + ' von ' + topics.length + ' Themen vollständig gelöst';
  const options = q.choices.map((choice,i) => `<label class="pr-answer-choice"><input type="radio" name="themenantwort" data-pr-field="answer" value="${i}"${s.answer === i ? ' checked' : ''}><span>${escapeHtml(choice)}</span></label>`).join('');
  return `<div class="pr-topic-picker">${selector('Thema wählen', 'topic', topics.map(item => [item.id, item.title]), t.id)}<small>${progress}</small></div>
    <div class="pr-count">Aufgabe ${s.index + 1} von ${t.questions.length}</div><h3 class="pr-question" tabindex="-1" data-pr-question>${escapeHtml(q.prompt)}</h3>
    <div class="pr-study-layout"><section class="pr-study-material" aria-label="Material zur Aufgabe">${lessonVisual(t.id, t.visual)}</section>
    <div class="pr-study-response"><fieldset class="pr-answers"><legend>Wähle eine Antwort.</legend>${options}</fieldset>
    ${answerFeedback(s,q,t)}
    <div class="pr-actions">${!correct ? btn('Antwort prüfen', 'check', '', { primary: true, disabled: s.answer === null || s.checked }) : ''}${s.checked && !correct && !s.showSolution ? btn('Lösungsweg ansehen','solution') : ''}${btn(last ? lastTopic ? 'Zum ersten Thema' : 'Zum nächsten Thema' : 'Zur nächsten Aufgabe', 'next','',{primary: correct})}${s.index > 0 ? btn('Vorherige Aufgabe','previous') : ''}</div></div></div>
    <details class="pr-details"><summary>Lehrplanbezug und Quellen</summary><p>${escapeHtml(t.ref)} · ${reference(t.source,'Offizieller Kernlehrplan NRW')}${t.materialSource ? ' · ' + reference(t.materialSource.url,t.materialSource.label) : ''}</p></details>`;
}
function topicAction(s, action, value, stage) {
  const topics = topicsFor(stage);
  const index = topics.findIndex(t => t.id === s.id);
  const t = topics[index];
  if (action === 'answer' || action === 'set:answer') { s.answer = Number(value); s.checked = false; s.showSolution = false; }
  if (action === 'solution' && s.checked && s.answer !== t.questions[s.index].answer) s.showSolution = true;
  if (action === 'check' && s.answer !== null) {
    s.checked = true;
    if (s.answer === t.questions[s.index].answer) s.completed.add(t.id + '/' + s.index);
  }
  if (action === 'set:topic' || action === 'next' || action === 'previous') {
    if (action === 'set:topic') { s.id = value; s.index = 0; }
    else if (action === 'previous') s.index = Math.max(0,s.index-1);
    else if (s.index + 1 < t.questions.length) s.index++;
    else { s.id = topics[(index + 1) % topics.length].id; s.index = 0; }
    s.answer = null; s.checked = false; s.showSolution = false;
  }
}

export const topicWorkshop = { initial: topicDraft, render: renderTopic, act: topicAction };

