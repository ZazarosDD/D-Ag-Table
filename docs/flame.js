import { icon } from './icons.js';

// Each colour describes the light seen from a salt in a flame test.
// A missing colour and an uncharacteristic test are different observations.
const saltFlames = {
  Li: {
    label: 'Karminrot', colour: '#e82750', light: '#ff9ca9',
    detail: 'Lithiumatome geben besonders viel rotes Licht mit einer Wellenlänge von rund 671 Nanometern ab.',
  },
  Na: {
    label: 'Intensiv gelb', colour: '#ffcd18', light: '#fff5a1',
    detail: 'Das auffällige Gelb stammt von Licht bei rund 589 Nanometern. Schon Spuren von Natrium können andere Flammenfarben überdecken.',
  },
  K: {
    label: 'Blassviolett', colour: '#b491e8', light: '#f0dbff',
    detail: 'Kaliumsalze geben eine zarte Färbung. Enthält die Probe auch Natrium, kann dessen kräftiges Gelb das Violett überdecken.',
  },
  Rb: {
    label: 'Rot bis rotviolett', colour: '#cf497d', light: '#eda8cf',
    detail: 'Das Spektrum von Rubidium enthält tiefrote und violette Linien. In der Flamme überlagern sich diese Lichtanteile.',
  },
  Cs: {
    label: 'Blauviolett', colour: '#7868ec', light: '#bfc6ff',
    detail: 'Mit einem Spektroskop lässt sich das Licht in seine Farben zerlegen. Bei Caesium fallen blaue Spektrallinien auf.',
  },
  Fr: {
    label: 'Flammenfarbe unbekannt',
    detail: 'Francium kommt nur in winzigen Mengen vor und zerfällt rasch. Eine typische Flammenfarbe seiner Salze ist bisher nicht belegt.',
  },
  Be: {
    label: 'Keine charakteristische Färbung',
    detail: 'Bei Berylliumsalzen bleibt die Eigenfarbe der Brennerflamme sichtbar. Eine gewöhnliche Flammenprobe eignet sich daher kaum zum Nachweis von Beryllium.',
  },
  Mg: {
    label: 'Keine charakteristische Färbung',
    detail: 'Magnesiumsalze geben der Brennerflamme keine typische Farbe. Das helle weiße Licht von brennendem Magnesium entsteht bei der Verbrennung des Metalls.',
  },
  Ca: {
    label: 'Ziegelrot bis orangerot', colour: '#f36c40', light: '#ffb58c',
    detail: 'Die Wärme regt Teilchen der Probe an. Wenn diese Energie als sichtbares Licht abgeben, entsteht bei Calciumsalzen der warme Rotton.',
  },
  Sr: {
    label: 'Kräftiges Rot', colour: '#ed393c', light: '#ff9c8d',
    detail: 'Das Licht von Strontiumsalzen enthält besonders kräftige rote Anteile. Ihr Leuchten ist mit bloßem Auge gut zu erkennen.',
  },
  Ba: {
    label: 'Hellgrün bis apfelgrün', colour: '#8bd44e', light: '#dcf59d',
    detail: 'Im Spektrum von Bariumverbindungen fallen grüne Lichtanteile bei rund 514 und 524 Nanometern auf.',
  },
  Ra: {
    label: 'Karminrot', colour: '#dc2843', light: '#ffa1a6',
    detail: 'Für Radiumsalze ist dieser Rotton in der Fachliteratur beschrieben. Wegen der Radioaktivität wird Radium im Schulunterricht nur als Literaturbeispiel behandelt.',
  },
};

export const flameSources = [
  { label: 'LEIFIchemie · Flammenfarben, Spektrallinien und ihre Entstehung', url: 'https://www.leifichemie.de/analytische-methoden/einfuehrung-die-analytischen-methoden/grundwissen/flammenfaerbung' },
  { label: 'Universität Wuppertal · Flammenfärbung von Alkali- und Erdalkalimetallsalzen', url: 'https://chemiemitlicht.uni-wuppertal.de/de/experimente/flammenfaerbungen-durch-alkalimetallverbindungen/flammenfaerbung-durch-alkali-und-erdalkalimetallverbindungen/' },
  { label: 'Singapore Examinations and Assessment Board · Rotviolett bei Rubidium, Blauviolett bei Caesium (Tabelle 8.1)', url: 'https://www.seab.gov.sg/docs/default-source/national-examinations/syllabus/olevel/2024syllabus/6092_y24_sp_2.pdf' },
  { label: 'University of Lethbridge · Beryllium- und Magnesiumsalze in der Flammenprobe', url: 'https://scholar.ulethbridge.ca/sites/default/files/susanfindlay/files/chem1000_lecture17-18_group_2.pdf' },
  { label: 'Institut für Brand- und Katastrophenschutz · Datenlage zur Flammenfarbe von Francium (Anhang A1)', url: 'https://ibk-heyrothsberge.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MI/IDF/IBK/Dokumente/Forschung/Fo_Publikationen/imk_ber/imk-bericht_189.pdf' },
  { label: 'Royal Society of Chemistry · Das karminrote Leuchten von Radiumsalzen', url: 'https://edu.rsc.org/feature/four-curie-centennial-elements/2020149.article' },
];

function saltFlameDiagram(symbol, sample) {
  const prefix = `salt-flame-${symbol}`;
  return `<div class="flame-scene" aria-hidden="true">
    <svg viewBox="0 0 140 130" preserveAspectRatio="xMidYMax meet" focusable="false">
      <defs>
        <radialGradient id="${prefix}-halo"><stop stop-color="${sample.colour}" stop-opacity=".32"/><stop offset="1" stop-color="${sample.colour}" stop-opacity="0"/></radialGradient>
        <linearGradient id="${prefix}-edge" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="${sample.colour}" stop-opacity=".52"/><stop offset=".52" stop-color="${sample.colour}"/><stop offset=".84" stop-color="${sample.light}"/><stop offset="1" stop-color="#65738a"/></linearGradient>
        <linearGradient id="${prefix}-cone" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="${sample.light}" stop-opacity=".18"/><stop offset=".72" stop-color="${sample.light}"/><stop offset="1" stop-color="#afd6f0"/></linearGradient>
        <linearGradient id="${prefix}-metal" x1="0" x2="1" y2="0"><stop stop-color="#383b47"/><stop offset=".34" stop-color="#99a1ad"/><stop offset=".56" stop-color="#5b6372"/><stop offset="1" stop-color="#30343f"/></linearGradient>
      </defs>
      <ellipse cx="70" cy="69" rx="62" ry="60" fill="url(#${prefix}-halo)"/>
      <path d="M60 107C50 101 46 88 49 73c3-15 14-31 17-46 2-7 2-13 1-19 13 12 17 28 15 45 5-6 7-11 8-17 7 16 5 30 1 43-4 13-10 24-16 28Z" fill="url(#${prefix}-edge)"/>
      <path d="M63 107c-7-8-10-18-8-28 2-12 12-24 15-40 7 11 6 22 5 31 4-4 7-10 9-17 3 19-1 42-12 54Z" fill="url(#${prefix}-cone)"/>
      <path d="M61 107c3-6 6-14 9-23 3 8 6 16 8 23Z" fill="#526c9c" opacity=".86"/>
      <rect x="59" y="108" width="22" height="22" fill="url(#${prefix}-metal)"/>
      <rect x="56" y="106" width="28" height="4" rx="1.3" fill="#9ca4af"/>
      <ellipse cx="70" cy="106" rx="14" ry="2.2" fill="#434857"/>
    </svg>
  </div>`;
}

export function flameVisual(element) {
  const sample = saltFlames[element.symbol];
  if (!sample) return '';
  const diagram = sample.colour ? saltFlameDiagram(element.symbol, sample) : '';
  const caption = sample.colour ? '<span class="flame-caption">Schematische Darstellung</span>' : '';
  return `<section class="salt-flame" aria-label="Flammenfärbung der Salze">
    <h3 class="section-heading">${icon('flask')}Flammenfärbung der Salze</h3>
    <div class="flame-card${diagram ? ' flame-with-scene' : ''}">
      ${diagram}
      <div class="flame-reading"><h4>${sample.label}</h4><p>${sample.detail}</p>${caption}</div>
    </div>
  </section>`;
}
