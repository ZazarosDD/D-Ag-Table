import { escapeHtml } from './details.js';

export function btn(label, act, value = '', options = {}) {
  const { primary, pressed, disabled, aria } = options;
  return `<button type="button" class="pr-btn${primary ? ' pr-primary' : ''}" data-pr="${escapeHtml(act)}" data-value="${escapeHtml(value)}"${pressed == null ? '' : ' aria-pressed="' + Boolean(pressed) + '"'}${aria ? ' aria-label="' + escapeHtml(aria) + '"' : ''}${disabled ? ' disabled' : ''}>${escapeHtml(label)}</button>`;
}

export function selector(label, field, items, selected) {
  return `<label class="pr-field"><span>${escapeHtml(label)}</span><select data-pr-field="${field}">${items.map(([value, name]) => `<option value="${escapeHtml(value)}"${String(value) === String(selected) ? ' selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></label>`;
}

export function inputField(label, field, value, placeholder = '') {
  return `<label class="pr-field"><span>${escapeHtml(label)}</span><input type="text" data-pr-input="${field}" value="${escapeHtml(value || '')}" placeholder="${escapeHtml(placeholder)}" autocomplete="off" spellcheck="false"></label>`;
}

export function result(text, correct, title = correct ? 'Richtig.' : 'Prüfe deinen Entwurf.') {
  if (!text) return '';
  return `<div class="pr-result ${correct ? 'pr-success' : 'pr-review'}" role="status"><b>${escapeHtml(title)}</b> ${escapeHtml(text)}</div>`;
}

export function visualTable(visual) {
  if (!visual) return '';
  return `<div class="pr-table-wrap" role="region" aria-label="${escapeHtml(visual.title)}" tabindex="0"><table class="pr-table"><caption>${escapeHtml(visual.title)}</caption><thead><tr>${visual.columns.map(item => '<th scope="col">' + escapeHtml(item) + '</th>').join('')}</tr></thead><tbody>${visual.rows.map(row => '<tr>' + row.map((item, index) => index === 0 ? '<th scope="row">' + escapeHtml(item) + '</th>' : '<td>' + escapeHtml(item) + '</td>').join('') + '</tr>').join('')}</tbody></table></div>`;
}

export function reference(url, label) {
  return `<a class="pr-ref" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

export function toolLink(stage, id, label, extra = '') {
  return `<a class="${extra || 'pr-link'}" data-page="ueben" data-tool="${id}" href="#ueben?stufe=${stage.key}${id ? '&amp;werkzeug=' + id : ''}">${label}</a>`;
}

