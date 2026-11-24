import { speciesInfo, particleNotes } from './redox-species.js';
import { escapeHtml } from './details.js';

export const steps = [
  { id: 'bereit', title: 'Ausgangslage', position: 0 },
  { id: 'abgabe', title: 'Abgabe', position: 0.24 },
  { id: 'leiter', title: 'Transport', position: 0.50 },
  { id: 'aufnahme', title: 'Aufnahme', position: 0.88 },
  { id: 'bilanz', title: 'Bilanz', position: 1 }
];

export function stepIndex(position) {
  if (position === 0) return 0;
  if (position < .28) return 1;
  if (position < .72) return 2;
  if (position < .94) return 3;
  return 4;
}

function parseSide(side, amount) {
  return side.split(' + ').map(term => {
    const parts = term.match(/^(?:(\d+) )?(.+)$/);
    return { formula: parts[2], count: Number(parts[1] || 1) * amount };
  });
}

export function scaledReaction(equation, amount) {
  const [left, right] = equation.split(' → ');
  const before = parseSide(left, amount);
  const after = parseSide(right, amount);
  const sideText = terms => terms.map(t => (t.count > 1 ? t.count + ' ' : '') + t.formula).join(' + ');
  return { before, after, text: sideText(before) + ' → ' + sideText(after) };
}

export function particleBalance(cell, amount) {
  return {
    negative: scaledReaction(cell.negative.equation, amount),
    positive: scaledReaction(cell.positive.equation, amount),
    net: scaledReaction(cell.total, amount)
  };
}

export function modelVoltage(cell, zinc, copper, series = 1) {
  const standard = cell.positive.potential - cell.negative.potential;
  const correction = cell.id === 'daniell' ? (0.05916 / 2) * Math.log10(zinc / copper) : 0;
  return (standard - correction) * series;
}

const phases = { s: 'fest', aq: 'in Lösung', l: 'flüssig', wire: 'im Leiter' };

function inventory(label, terms) {
  return `<section><h5>${label}</h5><ul class="rx-inventory">${terms.map(({ formula, count }) => {
    const species = speciesInfo[formula];
    return `<li><span class="rx-chemical" data-state="${species.phase}">${count} × ${formula}</span><span>${species.name}<small>${phases[species.phase]}</small></span></li>`;
  }).join('')}</ul></section>`;
}

export function stepCard(cell, index, balance, closed = true) {
  const note = particleNotes[cell.id];
  if (index === 0) return `<h3>Was ist zu Beginn vorhanden?</h3><div class="rx-before-poles"><p><strong>Links · Minuspol</strong>${escapeHtml(cell.negative.material)}</p><p><strong>Rechts · Pluspol</strong>${escapeHtml(cell.positive.material)}</p></div><p>${escapeHtml(cell.medium)}</p><p class="rx-smallprint">Wähle einen Schritt oder starte die Animation. Die Zeichen zeigen einen vergrößerten Ausschnitt aus der Zelle.</p>`;
  if (index === 2) {
    const count = balance.negative.after.find(item => item.formula === 'e⁻').count;
    if (!closed) return '<h3>Was ändert der offene Schalter?</h3><p>Der Leiter ist unterbrochen. Durch den äußeren Stromkreis fließen keine Elektronen mehr. Die gekoppelte Entladung kommt zum Stillstand.</p><p class="rx-smallprint">Schließe den Schalter, um den Teilchentransport weiterzuverfolgen.</p>';
    return `<h3>Wie wird Ladung transportiert?</h3><div class="rx-route-read"><b>Außen · Elektronen</b><p>Im Modell fließen ${count} Elektronen vom Minuspol über den Verbraucher zum Pluspol.</p><b>Innen · Ionen</b><p>${escapeHtml(note.transport)}</p></div>`;
  }
  const negative = index === 1;
  const both = index === 4;
  const reaction = both ? balance.net : negative ? balance.negative : balance.positive;
  const heading = both ? 'Was hat sich insgesamt verändert?' : negative ? 'Oxidation am Minuspol' : 'Reduktion am Pluspol';
  const explanation = both ? note.deposit : (negative ? cell.negative : cell.positive).explanation;
  const matter = terms => terms.filter(term => term.formula !== 'e⁻');
  const electrons = balance.negative.after.find(term => term.formula === 'e⁻').count;
  const transfer = both ? '' : '<p class="rx-electron-tally"><b>' + electrons + ' Elektronen</b> ' + (negative ? 'werden an den Leiter abgegeben.' : 'werden aus dem Leiter aufgenommen.') + '</p>';
  return `<h3>${heading}</h3><p class="rx-live-eq">${reaction.text}</p><div class="rx-ledger">${inventory('Wird umgesetzt',matter(reaction.before))}${inventory('Entsteht',matter(reaction.after))}</div>${transfer}<p class="rx-smallprint"><b>Bei einfacher Menge (1×)</b> · ${escapeHtml(explanation)}</p>`;
}

export function settingValues(stage, cell) {
  const choices = { speed: [.5,1,2], amount: [1,2,3] };
  if (stage.all || stage.year >= 12) {
    choices.series = [1,2,3,6];
    if (cell.id === 'daniell') { choices.zinc = [.01,.1,1]; choices.copper = [.01,.1,1]; }
  }
  return choices;
}

function choice(field, label, values, options) {
  return `<label class="rx-field"><span>${label}</span><select data-rx-setting="${field}">${values.map((n,i) => '<option value="' + n + '"' + (n === 1 ? ' selected' : '') + '>' + options[i] + '</option>').join('')}</select></label>`;
}

export function settingsMarkup(stage, cell) {
  const fields = settingValues(stage,cell);
  const concentration = ['0,01 mol/L','0,10 mol/L','1,00 mol/L'];
  return `<details class="rx-settings"><summary>Parameter verändern</summary><div class="rx-settings-content"><div class="rx-fields">
    ${choice('amount','Menge der reagierenden Teilchen',fields.amount,['Einfache Menge · 1×','Doppelte Menge · 2×','Dreifache Menge · 3×'])}
    ${choice('speed','Wiedergabetempo',fields.speed,['Langsam · 0,5×','Normal · 1×','Schnell · 2×'])}
    ${fields.series ? choice('series','Gleiche Zellen in Reihe',fields.series,['1 Zelle','2 Zellen','3 Zellen','6 Zellen']) : ''}
    ${fields.zinc ? choice('zinc','Zink-Ionen · c(Zn²⁺)',fields.zinc,concentration) + choice('copper','Kupfer-Ionen · c(Cu²⁺)',fields.copper,concentration) : ''}</div>
    <p class="rx-smallprint">Bei 2× reagieren in jeder Zelle doppelt so viele Teilchen wie in der angegebenen Gesamtgleichung. Änderst du die Menge, beginnt die Animation wieder am Anfang. Das Tempo steuert die Wiedergabe.</p>
    ${fields.series ? '<p class="rx-smallprint">Die Zeichnung zeigt eine einzelne Zelle. In der Reihenschaltung addieren sich die Spannungen gleich gepolter Zellen.</p>' : ''}
    ${fields.zinc ? '<p class="rx-smallprint">Die Hintergrundpunkte deuten die Konzentration in jeder Lösung an. Das Modell berechnet die Leerlaufspannung bei 25 °C. Es setzt für die Aktivitäten näherungsweise die Konzentrationen bezogen auf 1 mol/L ein und hält sie während eines Durchlaufs konstant.</p>' : ''}</div></details>`;
}

