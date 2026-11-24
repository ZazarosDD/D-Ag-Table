import { elementBySymbol, elementSources, families, notes, examplesByElement, familiarNames, categoryIcons } from './catalogue.js';
import { icon } from './icons.js';
import { measurementLabel, comparisonSources } from './comparison.js';
import { atomVisuals, schoolAtomVisuals, schoolOrbitalVisuals, atomSources, electronStructure } from './atom-model.js';
import { flameVisual, flameSources } from './flame.js';
import { elementPictures, profiles } from './profiles.js';
import { hazardIcons } from './hazard-icons.js';

import { stageExamples, mainGroup } from './school.js';
import { introductoryFacts, introductoryCaptions, introductorySources } from './school-intro.js';
import { elementLearning, compoundLearning, learningSources } from './school-chemistry.js';
import { curriculumSources, planningNotes } from './school-sources.js';

const htmlCharacters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => htmlCharacters[character]);

export function formatFormula(formula) {
  const charge = formula.match(/[+−-]$/)?.[0] ?? '';
  const base = charge ? formula.slice(0, -1) : formula;
  // After the hydration dot, a leading number counts complete water molecules.
  const parts = base.split('·').map(part => {
    const coefficient = part.match(/^\d+/)?.[0] ?? '';
    const atoms = escapeHtml(part.slice(coefficient.length)).replace(/\d+/g, digits => `<sub>${digits}</sub>`);
    return coefficient + atoms;
  });
  return parts.join('·').replace(/[)]n$/, ')<sub>n</sub>') + (charge ? `<sup>${escapeHtml(charge)}</sup>` : '');
}

export function categoryLabel(category) {
  return `<span class="category-label">${icon(categoryIcons[category])}${escapeHtml(category)}</span>`;
}

function sourceLink(url, label) {
  return `<a class="source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${icon('link')}${escapeHtml(label)}</a>`;
}

function fact(label, value) {
  return `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function pictureCredit(picture) {
  const credit = picture.credit || 'Bildquelle';
  const author = picture.sourceUrl ? sourceLink(picture.sourceUrl, credit) : escapeHtml(credit);
  const license = picture.licenseUrl ? sourceLink(picture.licenseUrl, picture.license) : escapeHtml(picture.license || '');
  return `<small class="picture-credit">${author}${license ? ' · ' + license : ''}</small>`;
}

function profilePicture(picture) {
  const wide = picture.layout === 'wide' || ['Namensgeber', 'Forschung'].includes(picture.kind);
  const description = picture.alt || picture.caption;
  return `<figure class="specimen-card" id="element-specimen" tabindex="-1" data-layout="${wide ? 'wide' : 'compact'}">
    <button class="picture-stage" type="button" data-action="toggle-picture" aria-label="Bild vergrößern" aria-expanded="false" aria-controls="element-picture-image" title="Bild vergrößern"><img id="element-picture-image" src="${escapeHtml(picture.src)}" alt="${escapeHtml(description)}"><span class="picture-zoom" aria-hidden="true">${icon('search')}</span></button>
    <figcaption><b class="picture-kind">${escapeHtml(picture.kind)}</b><p>${escapeHtml(picture.caption)}</p>${pictureCredit(picture)}</figcaption>
  </figure>`;
}

function hazardSection(profile) {
  const codes = profile.radiation ? [...profile.pictograms, 'radiation'] : profile.pictograms;
  const symbols = codes.map(code => {
    const sign = hazardIcons[code];
    return `<li><img src="${escapeHtml(sign.src)}" width="44" height="44" alt=""><span>${escapeHtml(sign.name)}<small>${code === 'radiation' ? 'W003' : code}</small></span></li>`;
  }).join('');
  const classification = {
    none: 'Kein GHS-Piktogramm laut Quelle.',
    unknown: 'GHS-Einstufung für diese Stoffform offen.',
    classified: '',
  }[profile.status];
  return `<section id="element-hazards" class="profile-section" tabindex="-1" aria-labelledby="hazards-heading">
    <h3 class="section-heading" id="hazards-heading">${icon('shield')}Gefahrenhinweise</h3>
    <div class="hazard-card"><p class="hazard-form"><span>Stoffform</span>${escapeHtml(profile.form)}</p>
      ${symbols ? `<ul class="hazard-symbols" aria-label="Gefahrenzeichen">${symbols}</ul>` : ''}
      <p>${escapeHtml(profile.hazard)}</p>
      ${classification ? `<p class="hazard-status">${classification}</p>` : ''}
      ${sourceLink(profile.hazardUrl, 'Quelle zum Gefahrenhinweis')}
    </div></section>`;
}

function exampleCard(compound) {
  const formula = escapeHtml(compound.formula);
  return `<article class="chem-example">
    <div class="chem-title"><button type="button" data-compound="${formula}">${escapeHtml(compound.name)}</button><span class="formula-badge">${formatFormula(compound.formula)}</span></div>
    <p>${escapeHtml(compound.occurrence)}</p>
    <p class="example-use"><b>Verwendung</b> · ${escapeHtml(compound.use)}</p>
    <button class="example-more" type="button" data-compound="${formula}">${icon('molecule')}Verbindung erkunden</button>
  </article>`;
}

const topicTitles = {
  ions: 'Ionen und Ladungsausgleich', polar: 'Polarität', geometry: 'Räumlicher Bau',
  trend: 'Trends im Periodensystem', interactions: 'Kräfte zwischen Molekülen',
  organic: 'Struktur und Reaktion', equilibrium: 'Chemisches Gleichgewicht',
  electrochem: 'Säure-Base- oder Redoxreaktion', advancedElectrochem: 'Vertiefung im Leistungskurs',
  materials: 'Struktur und Werkstoffeigenschaften', orbitals: 'LK-Vertiefung · Orbitalmodell und Bindung',
  complex: 'Koordinative Bindung und Komplexe',
};
const topicsByYear = {
  9: ['ions'], 10: ['polar', 'geometry', 'ions'],
  11: ['organic', 'equilibrium', 'geometry', 'interactions', 'trend'],
  12: ['electrochem', 'advancedElectrochem', 'ions', 'complex'],
  13: ['materials', 'organic', 'complex', 'orbitals', 'interactions'],
};
function topicsFor(stage) {
  const keys = topicsByYear[stage?.year] || [];
  return keys.filter(topic => stage.orbitals || !['orbitals', 'complex', 'advancedElectrochem'].includes(topic));
}
function schoolLearning(record, stage) {
  if (!stage || !record) return '';
  const topics = topicsFor(stage).filter(topic => record[topic]);
  return topics.slice(0, 3).map(topic => `<section class="school-learning"><h3>${topicTitles[topic]}</h3><p>${escapeHtml(record[topic])}</p></section>`).join('');
}

function schoolElementDetail(element, limit, stage) {
  const { symbol, family } = element;
  const profile = profiles[symbol];
  const picture = elementPictures[symbol];
  const intro = stage.year <= 8;
  const caption = intro && introductoryCaptions[symbol];
  const shortFact = introductoryFacts[symbol] || profile.fact;
  const source = introductorySources[symbol] || profile.factUrl;
  const examples = stageExamples(symbol, stage);
  const group = mainGroup(element);
  const metalType = ['alkali', 'alkaline', 'post', 'transition'].includes(family) ? 'Metall' : family === 'metalloid' ? 'Halbmetall' : 'Nichtmetall';
  const facts = [fact('Ordnungszahl', element.n), fact('Zustand bei 20 °C', element.state)];
  if (stage.year >= 8) {
    const position = group ? `${group}. Hauptgruppe (Gruppe ${element.group})` : 'Gruppe ' + element.group;
    facts.push(fact('Position im Periodensystem', `${position} · ${element.period}. Periode`));
    facts.push(stage.year <= 9 ? fact('Mittlere Atommasse', element.mass + ' u') : fact('Molare Masse der Atome', element.mass + ' g/mol'));
  }
  if (stage.en) facts.push(fact('Elektronegativität (Pauling)', element.electronegativity == null ? 'Kein Tabellenwert' : measurementLabel(element, 'en')));
  if (stage.radius) facts.push(fact('Atomradius (kovalenter Modellwert)', measurementLabel(element, 'radius')));
  const safetySigns = [...profile.pictograms, ...(profile.radiation ? ['radiation'] : [])].map(code => {
    const sign = hazardIcons[code];
    return `<img width="25" height="25" src="${escapeHtml(sign.src)}" alt="${escapeHtml(sign.name)}">`;
  }).join('');
  const schoolAtom = stage.year >= 8 && group ? schoolAtomVisuals(element, stage.year >= 10) : '';
  const atomExtension = stage.orbitals ? `<details class="school-extra"><summary>LK-Vertiefung · Schalen und Orbitale</summary>${schoolOrbitalVisuals(element, !group)}</details>` : '';
  const flame = stage.year >= 8 ? flameVisual(element) : '';
  return `<div class="identity fam-${family}">
    <div class="detail-tile" aria-hidden="true"><span>${element.n}</span><b>${symbol}</b></div>
    <div><h2 id="dialog-title">${escapeHtml(element.name)}</h2><p class="list-name"><span class="swatch"></span>${escapeHtml(stage.year === 7 ? metalType : families[family][1])}</p></div></div>
    <div class="element-highlight">${icon('bulb')}<div><p>${escapeHtml(shortFact)}</p>${sourceLink(source, 'Quelle zum Kurzfakt')}</div></div>
    ${profilePicture(caption ? { ...picture, caption, alt: caption } : picture)}
    <dl class="facts">${facts.join('')}</dl>
    ${examples.length ? `<h3 class="section-heading" id="element-connections">${icon('molecule')}Verbindungen und Verwendung</h3>
    <div id="element-examples">${examples.slice(0, limit).map(exampleCard).join('')}</div>
    ${examples.length > limit ? `<button type="button" class="soft-button more-examples" data-action="more-examples">Weitere Verbindungen (${examples.length - limit})</button>` : ''}` : ''}
    ${schoolLearning(elementLearning[symbol], stage)}
    ${schoolAtom}${atomExtension}
    ${flame ? `<details class="school-extra"><summary>Flammenfärbung der Salze</summary>${flame}</details>` : ''}
    <details class="school-safety"><summary>Gefahrenhinweise <span class="school-signs">${safetySigns}</span></summary>${hazardSection(profile)}</details>`;
}

const gradeReferences = {
  7: 'Einstieg über Stoffeigenschaften, Verbrennung und Metalle (Gymnasium, Inhaltsfelder 1, 3 und 4).',
  8: 'Elementfamilien und Schalenmodell (Gymnasium, Inhaltsfeld 5). In der Tabelle stehen die acht Hauptgruppen nebeneinander.',
  9: 'Salze und Ionen sowie chemische Reaktionen durch Elektronenübertragung (Gymnasium, Inhaltsfelder 6 und 7).',
  10: 'Molekülverbindungen, Lewis-Schreibweise, EPA-Modell und Dipole (Gymnasium, Inhaltsfeld 8).',
  11: 'Einführungsphase · Organische Stoffklassen sowie Reaktionsgeschwindigkeit und chemisches Gleichgewicht.',
  12: 'Qualifikationsphase · Säuren, Basen und analytische Verfahren sowie elektrochemische Prozesse und Energetik.',
  13: 'Qualifikationsphase · Reaktionswege in der organischen Chemie und moderne Werkstoffe.',
};
export function curriculumInfo(stage) {
  const current = stage && !stage.all ? '<p><b>' + escapeHtml(stage.label) + '</b> · ' + escapeHtml(gradeReferences[stage.year]) + '</p>' : '';
  return current + planningNotes.map(note => '<p>' + escapeHtml(note) + '</p>').join('') + sourceList(curriculumSources);
}

export function elementDetail(element, limit, stage) {
  if (stage && !stage.all) return schoolElementDetail(element, limit, stage);
  const examples = examplesByElement.get(element.symbol);
  const isotope = element.mass.startsWith('[');
  const position = element.group ? `Gruppe ${element.group} · Periode ${element.period}` : `${families[element.family][0]} · Periode ${element.period}`;
  const more = examples.length - limit;
  const profile = profiles[element.symbol];
  const picture = elementPictures[element.symbol];
  const structure = electronStructure(element);
  const shellNames = structure.shells.map(shell => shell.name).join(', ');
  const stateNote = structure.predicted
    ? 'Die Schalen- und Orbitalzahlen folgen der vorhergesagten Elektronenkonfiguration des neutralen Atoms im Grundzustand.'
    : 'Die Schalen- und Orbitalzahlen gelten für das neutrale Atom im Grundzustand.';
  const flame = flameVisual(element);
  const en = element.electronegativity == null ? 'Kein Tabellenwert' : measurementLabel(element, 'en');
  const interpreted = element.n >= 104 ? '<p class="mass-note">Der kovalente Radius dieses superschweren Elements beruht auf berechneten Bindungslängen.</p>' : '';
  return `<div class="identity fam-${element.family}">
      <div class="detail-tile" aria-hidden="true"><span>${element.n}</span><b>${element.symbol}</b></div>
      <div><h2 id="dialog-title">${escapeHtml(element.name)}</h2><p class="list-name"><span class="swatch"></span>${families[element.family][1]}</p></div>
    </div>
    <div class="element-highlight">${icon('bulb')}<div><p>${escapeHtml(profile.fact)}</p>${sourceLink(profile.factUrl, 'Quelle zum Kurzfakt')}</div></div>
    <nav class="profile-links" aria-label="Abschnitte im Elementsteckbrief">
      <button type="button" data-section="element-hazards">Gefahrenhinweise</button>
      <button type="button" data-section="element-connections">Verbindungen${examples.length ? ` (${examples.length})` : ''}</button>
      <button type="button" data-section="element-atom">Atombau</button>
      ${flame ? '<button type="button" data-section="element-flame">Flammenfärbung</button>' : ''}
    </nav>
    ${profilePicture(picture)}
    <dl class="facts">
      ${fact('Ordnungszahl', element.n)}
      ${fact(isotope ? 'Massenzahl des Referenzisotops' : 'Molare Masse der Atome', isotope ? element.mass : `${element.mass} g/mol`)}
      ${fact('Position im Periodensystem', position)}
      ${fact('Zustand bei 20 °C und Normaldruck', element.state)}
      ${fact('Elektronegativität (Pauling)', en)}
      ${fact('Atomradius (kovalenter Modellwert)', measurementLabel(element, 'radius'))}
      ${fact('Besetzte Elektronenschalen', `${structure.shells.length} (${shellNames})`)}
      ${fact('Besetzte Orbitale', structure.occupiedOrbitals)}
    </dl>
    <p class="mass-note">${stateNote}${element.symbol === 'Pd' ? ' Bei Palladium ist die 4d-Unterschale voll besetzt und das 5s-Orbital leer.' : ''}</p>
    ${isotope ? '<p class="mass-note">Die Zahl in Klammern zählt Protonen und Neutronen eines ausgewählten Isotops.</p>' : ''}
    ${interpreted}
    ${hazardSection(profile)}
    <div id="element-atom" tabindex="-1" class="profile-section">${atomVisuals(element, structure)}</div>
    ${flame ? `<div id="element-flame" tabindex="-1" class="profile-section">${flame}</div>` : ''}
    <h3 class="section-heading profile-section" id="element-connections" tabindex="-1">${icon('molecule')}Verbindungen und Verwendung${examples.length ? `<span class="small-meta">${examples.length}</span>` : ''}</h3>
    ${notes[element.symbol] ? `<p class="note-box">${escapeHtml(notes[element.symbol])}</p>` : ''}
    <div id="element-examples">${examples.slice(0, limit).map(exampleCard).join('')}</div>
    ${more > 0 ? `<button class="soft-button more-examples" type="button" data-action="more-examples">${icon('plus')}Weitere Verbindungen (${more})</button>` : ''}
    <div class="element-source-row"><button class="text-button" type="button" data-action="sources">${icon('book-open')}&nbsp; Quellen zu den Elementdaten</button></div>`;
}

function moleculeShape(formula, stage) {
  if (![10, 11].includes(stage?.year) || !['H2O', 'CO2'].includes(formula)) return '';
  const water = formula === 'H2O';
  const atoms = water ? [['H', 64, 108], ['O', 130, 57], ['H', 196, 108]] : [['O', 51, 83], ['C', 130, 83], ['O', 209, 83]];
  const bonds = water ? 'M80 96L114 69M146 69L180 96' : 'M72 80H109M72 86H109M151 80H188M151 86H188';
  const caption = water ? 'Wasser ist gewinkelt. Die beiden Bindungsdipole ergeben zusammen einen Moleküldipol.' : 'Kohlenstoffdioxid ist linear. Die gleich großen Bindungsdipole zeigen in entgegengesetzte Richtungen und heben sich auf.';
  const label = water ? 'H–O–H mit einem Bindungswinkel von 104,5 Grad' : 'O=C=O mit einem Bindungswinkel von 180 Grad';
  const drawing = atoms.map(([symbol, x, y]) => `<g transform="translate(${x} ${y})"><circle class="mol-${symbol}" r="18"/><text y="6">${symbol}</text></g>`).join('');
  return `<figure class="molecule-shape"><svg viewBox="0 16 260 115" role="img" aria-label="${label}">
    <path class="mol-bond" d="${bonds}"/>${drawing}
    <text class="mol-angle" x="130" y="${water ? 109 : 47}">${water ? '104,5°' : '180°'}</text></svg>
    <figcaption>${escapeHtml(caption)}</figcaption></figure>`;
}

export function compoundDetail(compound, stage) {
  const alias = familiarNames[compound.formula];
  const commonName = alias && alias !== compound.name && (!stage || stage.all || stage.year >= 9) ? alias : '';
  const chips = compound.elements.map(symbol => {
    const element = elementBySymbol.get(symbol);
    return `<button type="button" class="element-chip fam-${element.family}" data-element="${symbol}"><b>${symbol}</b>${escapeHtml(element.name)}</button>`;
  }).join('');
  return `${compound.formula === 'CaF2' ? '<img class="chem-image" src="assets/fluorit.webp" alt="Illustration einer violetten Fluoritstufe mit würfelförmigen Kristallen" width="1680" height="611">' : ''}
    <div class="compound-identity cat-${compound.category.toLowerCase()}">
      <div class="formula-display"><span class="formula-plain">${formatFormula(compound.formula)}</span></div>
      <h2 id="dialog-title">${escapeHtml(compound.name)}</h2>
      <div class="small-meta-line">${categoryLabel(compound.category)}${commonName ? `<span class="common-name">${escapeHtml(commonName)}</span>` : ''}</div>
    </div>
    <div class="compound-information">
      <h3>${icon('pin')}Wo kommt die Verbindung vor?</h3><p>${escapeHtml(compound.occurrence)}</p>
      <div class="application-box"><h3>${icon('bulb')}Wofür wird sie verwendet?</h3><p>${escapeHtml(compound.use)}</p></div>
      ${moleculeShape(compound.formula, stage)}${schoolLearning(compoundLearning[compound.formula], stage)}
      <h3>${icon('molecule')}Enthaltene Elemente</h3><div class="element-chips">${chips}</div>
      ${sourceLink(compound.source, 'Quelle zur Verbindung')}
    </div>`;
}

function schoolHelp(stage) {
  const item = (heading, body) => `<section class="learn-item"><h3>${heading}</h3><p>${body}</p></section>`;
  const guides = [
    item('Wie lese ich eine Elementkarte?', 'Das große Zeichen ist das Elementsymbol. O steht für Sauerstoff. Die kleine Zahl ist die Ordnungszahl. Sie bestimmt den Platz des Elements im Periodensystem. Wähle eine Karte, um das Bild und den Steckbrief zu öffnen.'),
    item('Wie finde ich eine Verbindung?', 'Öffne „Verbindungen“ oder wähle ein Beispiel im Elementsteckbrief. In einer Verbindung sind verschiedene Elemente chemisch miteinander verbunden. Wasser enthält Wasserstoff und Sauerstoff.'),
  ];
  if (stage.year === 8 || stage.year === 9) guides.push(item('Was verraten Periode und Hauptgruppe?', 'Bei den Hauptgruppenelementen gibt die Periode die Zahl der besetzten Schalen an. Die erste bis achte Hauptgruppe verrät die Zahl der Außenelektronen. Helium hat zwei Außenelektronen und gehört zu den Edelgasen. Die Ordnungszahl zählt die Protonen. Zusätzlich können im Kern Neutronen sitzen. Isotope eines Elements unterscheiden sich in der Zahl der Neutronen. Für die mittlere Atommasse verwenden wir die atomare Masseneinheit u.'));
  if (stage.year === 9 || stage.year === 10) guides.push(item('Wie lese ich eine Salzformel?', 'Kochsalz enthält einfach positive Natrium-Ionen und einfach negative Chlorid-Ionen. Ihre Ladungen gleichen sich im Verhältnis eins zu eins aus. Darum lautet die Formel NaCl.'));
  if (stage.year === 10 || stage.year === 11) guides.push(item('Wie erkenne ich eine polare Bindung?', 'Eine höhere Elektronegativität bedeutet, dass ein Atom die Bindungselektronen stärker anzieht. Im Wassermolekül zieht Sauerstoff stärker als Wasserstoff. Durch die gewinkelte Form hat das Molekül zwei unterschiedlich geladene Seiten. Das EPA-Modell beschreibt die Form mithilfe der Elektronenpaare.'));
  if (stage.year === 11) guides.push(item('Welche Größe vergleiche ich?', 'Unter „Atomradius“ findest du kovalente Radien in Pikometern (pm). Sie beschreiben, welchen Anteil ein gebundenes Atom ungefähr zum Abstand zwischen zwei Atomkernen beiträgt. Ein Ion kann deutlich größer oder kleiner als sein neutrales Atom sein.'));
  if (stage.year === 9) guides.push(item('Was ist die Edelgasregel?', 'Viele Hauptgruppenatome können durch Aufnahme oder Abgabe von Elektronen eine volle Außenschale erreichen. Meist sind das acht Elektronen, daher heißt die Regel auch Oktettregel. Bei der ersten Schale genügen zwei. Aus einem Natriumatom mit elf Elektronen entsteht durch Abgabe eines Elektrons ein Na⁺-Ion.'));
  if (stage.year === 12) guides.push(item('Was wird bei einer Reaktion übertragen?', 'Bei Säure-Base-Reaktionen werden Protonen übertragen. In einer Batterie laufen Redoxreaktionen ab. Elektronen gelangen durch den äußeren Stromkreis von der einen Elektrode zur anderen. Öffne Kupfer oder Zink für das Beispiel einer galvanischen Zelle.'));
  if (stage.year === 13) guides.push(item('Wie wird aus einem Gas ein Werkstoff?', 'Viele Ethenmoleküle können sich zu langen Polyethylenketten verbinden. Wie dicht sich die Ketten nebeneinander packen, beeinflusst etwa die Steifigkeit des Kunststoffs. Vergleiche die Steckbriefe von Ethen und Polyethylen.'));
  if (stage.year >= 11) guides.push(item('Was beschreibt das Ladungswolkenmodell?', 'Eine Ladungswolke steht im Modell für einen Bereich, in dem sich bis zu zwei Außenelektronen aufhalten können. Im Methanmolekül sind die vier bindenden Elektronenpaare um den Kohlenstoff tetraedrisch angeordnet.'));
  if (stage.orbitals) guides.push(item('Wie lese ich das Kästchenschema?', 'In der freiwilligen LK-Vertiefung entspricht ein Kästchen einem Orbital. Jeder Pfeil steht für ein Elektron. Eine s-Unterschale hat ein Orbital, eine p-Unterschale drei und eine d-Unterschale fünf.'));
  guides.push(item('Für welchen Stoff gilt ein Gefahrenzeichen?', 'Unter „Gefahrenhinweise“ steht die genaue Stoffform. Bei Sauerstoff in einer Druckgasflasche warnt das Flaschensymbol vor dem Druck. Die Luft im Klassenraum hat diese Kennzeichnung nicht.'));
  return `<h2 id="dialog-title">Lernhilfe · ${escapeHtml(stage.label)}</h2>${guides.join('')}`;
}

export function helpDetail(stage) {
  if (stage && !stage.all) return schoolHelp(stage);
  return `<h2 id="dialog-title">Lernhilfe</h2>
    <p class="help-intro">Das Periodensystem ordnet die Elemente nach der Zahl der Protonen in ihrem Atomkern.</p>
    <section class="learn-item"><h3>Wie lese ich eine Kachel?</h3><p>Oben steht die Ordnungszahl. Bei Natrium ist das die 11, also hat jedes Natriumatom elf Protonen. Das große <b>Na</b> ist sein Elementsymbol. In der Ansicht „Elementfamilien“ verrät die Farbe die Elementfamilie.</p></section>
    <section class="learn-item"><h3>Was sind Gruppen und Perioden?</h3><p>Die 18 senkrechten Spalten heißen Gruppen. In einer Gruppe stehen oft Elemente mit ähnlichen Eigenschaften. Die sieben waagerechten Zeilen heißen Perioden.</p><p>Die Lanthanoide und Actinoide gehören zur sechsten und siebten Periode. Ihre beiden Reihen stehen unten, damit die Tabelle übersichtlich bleibt.</p></section>
    <section class="learn-item"><h3>Was zeigt die Elektronegativität?</h3><p>Sie beschreibt, wie stark ein Atom die gemeinsamen Elektronen einer Bindung anzieht. In Wasser zieht Sauerstoff (3,44) diese Elektronen stärker an als Wasserstoff (2,20). Die Werte der Pauling-Skala haben keine Einheit.</p><p>Mit „Elektronegativität“ siehst du die Werte auf allen Kacheln. Dunklere Kacheln stehen für höhere Werte. Ein Strich auf schraffiertem Grund bedeutet, dass die verwendete Tabelle keinen Wert angibt.</p></section>
    <section class="learn-item"><h3>Wie groß ist ein Atom?</h3><p>Ein Atom hat keine scharfe Außenkante. Die Tabelle zeigt den kovalenten Radius für Einfachbindungen. Die Radien zweier gebundener Atome ergeben zusammen ungefähr den Abstand ihrer Kerne. Ein Pikometer (pm) ist ein Billionstel Meter.</p><p>Wähle „Atomradius“, um die Modellwerte zu vergleichen. Innerhalb einer Hauptgruppe wachsen die Radien meist von oben nach unten, weil weitere Elektronenschalen hinzukommen.</p></section>
    <section class="learn-item"><h3>Wie zähle ich Schalen und Orbitale?</h3><p>Die K-Schale hat die Hauptquantenzahl n = 1, die L-Schale n = 2. Jede Schale umfasst Unterschalen. Eine s-Unterschale hat ein Orbital, eine p-Unterschale drei, eine d-Unterschale fünf und eine f-Unterschale sieben.</p><p>Im Kästchenschema steht jeder Pfeil für ein Elektron. Gleichenergetische Orbitale werden nach der Hundschen Regel zuerst einzeln mit gleichem Spin besetzt. Ein zweites Elektron im selben Orbital hat entgegengesetzten Spin. Zähle jedes Kästchen mit mindestens einem Pfeil einmal. Bei Sauerstoff ergeben sich fünf besetzte Orbitale auf zwei Schalen.</p></section>
    <section class="learn-item"><h3>Wie lese ich das Lewis-Symbol?</h3><p>Bei einem Hauptgruppenelement steht jeder Punkt für ein Elektron auf der äußersten Schale des neutralen Atoms. Sauerstoff hat sechs Punkte, davon zwei Paare und zwei einzelne Punkte. Helium hat ein Paar auf seiner einzigen Schale.</p><p>Bei den Elementen des d- und f-Blocks können mehrere Unterschalen zur Bindung beitragen. Im Steckbrief zeigt die Elektronenkonfiguration, wie sie besetzt sind. Im Schalenmodell stehen die Ringe für Energieniveaus.</p></section>
    <section class="learn-item"><h3>Woher kommt die Flammenfarbe?</h3><p>In der heißen Flamme nehmen Teilchen einer Salzprobe Energie auf. Beim Übergang in einen energieärmeren Zustand geben sie Licht bestimmter Wellenlängen ab. Natriumsalze färben die Flamme dadurch gelb. Die Illustrationen zeigen den ungefähren Farbeindruck.</p></section>
    <section class="learn-item"><h3>Für welchen Stoff gilt ein Gefahrenzeichen?</h3><p>Über den Zeichen steht die genaue Stoffform. Bei Sauerstoff und Stickstoff in einer Druckgasflasche weist das Flaschensymbol auf den hohen Druck hin. Für die Luft im Klassenzimmer gilt diese Kennzeichnung nicht. Auch ein Metallstück und ein feines Pulver können unterschiedliche Gefahren haben.</p><p>Rote Rauten warnen vor Gefahren wie Bränden, Vergiftungen oder Schäden an Wasserlebewesen. Das gelbe Dreieck mit dem Strahlenzeichen warnt vor ionisierender Strahlung. Zu jedem Steckbrief gehört ein Link zur Quelle.</p></section>
    <section class="learn-item"><h3>Was bedeutet g/mol?</h3><p>Die molare Masse gibt an, wie viel ein Mol wiegt. Ein Mol enthält rund 6,022 · 10<sup>23</sup> Teilchen. Ein Mol Sauerstoffatome (O) wiegt etwa 16 Gramm, ein Mol Sauerstoffmoleküle (O<sub>2</sub>) etwa 32 Gramm.</p><p>Bei Elementen ohne Standardatomgewicht steht in eckigen Klammern die Massenzahl eines ausgewählten Isotops.</p></section>
    <section class="learn-item"><h3>Was verrät die Formel einer Verbindung?</h3><p>Eine Verbindung enthält mindestens zwei verschiedene Elemente. In H<sub>2</sub>O sind zwei Wasserstoffatome mit einem Sauerstoffatom verbunden. Bei Salzen beschreibt die Formel ein Zahlenverhältnis. In Kochsalz (NaCl) kommt auf jedes Natrium-Ion ein Chlorid-Ion.</p></section>
    <section class="learn-item"><h3>Wie erkunde ich die Tabelle?</h3><p>Wähle eine Kachel für den Steckbrief. Suche nach Name, Symbol oder Ordnungszahl. Über die Farblegende kannst du eine Familie hervorheben. In der Liste siehst du die passenden Elemente untereinander.</p><p>Mit der Tabulatortaste erreichst du die Tabelle, mit den Pfeiltasten wechselst du zwischen Elementen. Die Eingabetaste öffnet den Steckbrief, Escape schließt ihn. Die Taste <b>/</b> springt zur Suche.</p></section>`;
}

function sourceList(sources) {
  return `<ul class="sources-list">${sources.map(source => `<li>${sourceLink(source.url, source.label)}</li>`).join('')}</ul>`;
}

export function sourcesDetail(stage) {
  if (stage && !stage.all) {
    const topics = topicsFor(stage);
    const visible = learningSources.filter(source => source.topics.some(topic => topics.includes(topic)));
    return `<h2 id="dialog-title">Datenquellen · ${escapeHtml(stage.label)}</h2>
      <p class="source-intro">Im Steckbrief findest du die Herkunft von Bild, Kurzfakt und Gefahrenhinweisen. Jede Verbindung nennt ihre eigene Quelle.</p>
      ${sourceList(elementSources)}${visible.length ? `<section class="learn-item"><h3>Zum Unterrichtsthema</h3>${sourceList(visible)}</section>` : ''}
      <details class="school-plan"><summary>Lehrplanbezug NRW</summary>${curriculumInfo(stage)}</details>`;
  }
  return `<h2 id="dialog-title">Datenquellen</h2>
    <p class="source-intro">Die molaren Massen sind gerundete Werte für Atome mit natürlicher Isotopenverteilung. Der Aggregatzustand bezieht sich auf 20 °C und Normaldruck. Für einige sehr schwere Elemente gibt es bisher nur Vorhersagen.</p>
    ${sourceList(elementSources)}
    <section class="learn-item"><h3>Elektronegativität und Atomradius</h3><p>Die Elektronegativitäten folgen einer gemeinsamen Pauling-Tabelle. Einige Werte seltener Elemente sind Schätzungen. Die Radien für Einfachbindungen nach Pyykkö und Atsumi sind aus experimentellen und theoretischen Bindungslängen abgeleitet.</p>${sourceList(comparisonSources)}</section>
    <section class="learn-item"><h3>Schalen, Orbitale und Lewis-Symbole</h3><p>Die Angaben gelten für freie, neutrale Atome im Grundzustand. Die Zahl der besetzten Orbitale wird aus der veröffentlichten Elektronenkonfiguration mit der Hundschen Regel abgeleitet. Vorhergesagte Konfigurationen sind im Steckbrief gekennzeichnet.</p>${sourceList(atomSources)}</section>
    <section class="learn-item"><h3>Flammenfarben der Salze</h3>${sourceList(flameSources)}</section>
    <div class="learn-item"><h3>Verbindungen und Anwendungen</h3><p>Jede Verbindung hat einen eigenen Quellenlink. Öffne dazu ihren Steckbrief und wähle „Quelle zur Verbindung“.</p></div>
    <section class="learn-item"><h3>Kurzfakten und Bilder</h3><p>Die Quelle unter dem Kurzfakt führt zur Erklärung der jeweiligen Eigenschaft oder Geschichte. Die Bildunterschrift nennt das Motiv und den Bildnachweis. Bei kurzlebigen Elementen findest du auch historische Aufnahmen, Namensgeber und Orte der Forschung.</p></section>
    <section class="learn-item"><h3>Gefahrenkennzeichnung</h3><p>Jeder Steckbrief nennt die behandelte Stoffform und die Quelle ihrer Einstufung. Für viele kurzlebige Forschungselemente fehlen chemische Gefahrendaten. Radioaktivität ist mit einem eigenen Strahlenzeichen gekennzeichnet.</p>${sourceList([{url:'https://www.baua.de/DE/Themen/Chemikalien-Biostoffe/Gefahrstoffe/Einstufung-und-Kennzeichnung/Kennzeichnungselemente/Gefahrenpiktogramme-und-Signalwoerter',label:'BAuA · Bedeutung der Gefahrenpiktogramme'},{url:'https://unece.org/labels-ghs',label:'UNECE · GHS-Piktogramme'}])}</section>`;
}
