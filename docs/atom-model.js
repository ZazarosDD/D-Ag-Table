import { icon } from './icons.js';

// Shell counts and diagrams all use the same neutral ground-state configuration.
// PDG / NIST atomic data through Hs; RSC configurations for Mt through Og.
const groundConfigurations = {
  H: '1s1',
  He: '1s2',
  Li: '[He] 2s1',
  Be: '[He] 2s2',
  B: '[He] 2s2 2p1',
  C: '[He] 2s2 2p2',
  N: '[He] 2s2 2p3',
  O: '[He] 2s2 2p4',
  F: '[He] 2s2 2p5',
  Ne: '[He] 2s2 2p6',
  Na: '[Ne] 3s1',
  Mg: '[Ne] 3s2',
  Al: '[Ne] 3s2 3p1',
  Si: '[Ne] 3s2 3p2',
  P: '[Ne] 3s2 3p3',
  S: '[Ne] 3s2 3p4',
  Cl: '[Ne] 3s2 3p5',
  Ar: '[Ne] 3s2 3p6',
  K: '[Ar] 4s1',
  Ca: '[Ar] 4s2',
  Sc: '[Ar] 3d1 4s2',
  Ti: '[Ar] 3d2 4s2',
  V: '[Ar] 3d3 4s2',
  Cr: '[Ar] 3d5 4s1',
  Mn: '[Ar] 3d5 4s2',
  Fe: '[Ar] 3d6 4s2',
  Co: '[Ar] 3d7 4s2',
  Ni: '[Ar] 3d8 4s2',
  Cu: '[Ar] 3d10 4s1',
  Zn: '[Ar] 3d10 4s2',
  Ga: '[Ar] 3d10 4s2 4p1',
  Ge: '[Ar] 3d10 4s2 4p2',
  As: '[Ar] 3d10 4s2 4p3',
  Se: '[Ar] 3d10 4s2 4p4',
  Br: '[Ar] 3d10 4s2 4p5',
  Kr: '[Ar] 3d10 4s2 4p6',
  Rb: '[Kr] 5s1',
  Sr: '[Kr] 5s2',
  Y: '[Kr] 4d1 5s2',
  Zr: '[Kr] 4d2 5s2',
  Nb: '[Kr] 4d4 5s1',
  Mo: '[Kr] 4d5 5s1',
  Tc: '[Kr] 4d5 5s2',
  Ru: '[Kr] 4d7 5s1',
  Rh: '[Kr] 4d8 5s1',
  Pd: '[Kr] 4d10',
  Ag: '[Kr] 4d10 5s1',
  Cd: '[Kr] 4d10 5s2',
  In: '[Kr] 4d10 5s2 5p1',
  Sn: '[Kr] 4d10 5s2 5p2',
  Sb: '[Kr] 4d10 5s2 5p3',
  Te: '[Kr] 4d10 5s2 5p4',
  I: '[Kr] 4d10 5s2 5p5',
  Xe: '[Kr] 4d10 5s2 5p6',
  Cs: '[Xe] 6s1',
  Ba: '[Xe] 6s2',
  La: '[Xe] 5d1 6s2',
  Ce: '[Xe] 4f1 5d1 6s2',
  Pr: '[Xe] 4f3 6s2',
  Nd: '[Xe] 4f4 6s2',
  Pm: '[Xe] 4f5 6s2',
  Sm: '[Xe] 4f6 6s2',
  Eu: '[Xe] 4f7 6s2',
  Gd: '[Xe] 4f7 5d1 6s2',
  Tb: '[Xe] 4f9 6s2',
  Dy: '[Xe] 4f10 6s2',
  Ho: '[Xe] 4f11 6s2',
  Er: '[Xe] 4f12 6s2',
  Tm: '[Xe] 4f13 6s2',
  Yb: '[Xe] 4f14 6s2',
  Lu: '[Xe] 4f14 5d1 6s2',
  Hf: '[Xe] 4f14 5d2 6s2',
  Ta: '[Xe] 4f14 5d3 6s2',
  W: '[Xe] 4f14 5d4 6s2',
  Re: '[Xe] 4f14 5d5 6s2',
  Os: '[Xe] 4f14 5d6 6s2',
  Ir: '[Xe] 4f14 5d7 6s2',
  Pt: '[Xe] 4f14 5d9 6s1',
  Au: '[Xe] 4f14 5d10 6s1',
  Hg: '[Xe] 4f14 5d10 6s2',
  Tl: '[Xe] 4f14 5d10 6s2 6p1',
  Pb: '[Xe] 4f14 5d10 6s2 6p2',
  Bi: '[Xe] 4f14 5d10 6s2 6p3',
  Po: '[Xe] 4f14 5d10 6s2 6p4',
  At: '[Xe] 4f14 5d10 6s2 6p5',
  Rn: '[Xe] 4f14 5d10 6s2 6p6',
  Fr: '[Rn] 7s1',
  Ra: '[Rn] 7s2',
  Ac: '[Rn] 6d1 7s2',
  Th: '[Rn] 6d2 7s2',
  Pa: '[Rn] 5f2 6d1 7s2',
  U: '[Rn] 5f3 6d1 7s2',
  Np: '[Rn] 5f4 6d1 7s2',
  Pu: '[Rn] 5f6 7s2',
  Am: '[Rn] 5f7 7s2',
  Cm: '[Rn] 5f7 6d1 7s2',
  Bk: '[Rn] 5f9 7s2',
  Cf: '[Rn] 5f10 7s2',
  Es: '[Rn] 5f11 7s2',
  Fm: '[Rn] 5f12 7s2',
  Md: '[Rn] 5f13 7s2',
  No: '[Rn] 5f14 7s2',
  Lr: '[Rn] 5f14 7s2 7p1',
  Rf: '[Rn] 5f14 6d2 7s2',
  Db: '[Rn] 5f14 6d3 7s2',
  Sg: '[Rn] 5f14 6d4 7s2',
  Bh: '[Rn] 5f14 6d5 7s2',
  Hs: '[Rn] 5f14 6d6 7s2',
  Mt: '[Rn] 5f14 6d7 7s2',
  Ds: '[Rn] 5f14 6d9 7s1',
  Rg: '[Rn] 5f14 6d10 7s1',
  Cn: '[Rn] 5f14 6d10 7s2',
  Nh: '[Rn] 5f14 6d10 7s2 7p1',
  Fl: '[Rn] 5f14 6d10 7s2 7p2',
  Mc: '[Rn] 5f14 6d10 7s2 7p3',
  Lv: '[Rn] 5f14 6d10 7s2 7p4',
  Ts: '[Rn] 5f14 6d10 7s2 7p5',
  Og: '[Rn] 5f14 6d10 7s2 7p6',
};


export const atomSources = [
  { label: 'Particle Data Group / NIST · Elektronenkonfigurationen im Grundzustand', url: 'https://pdg.lbl.gov/2025/reviews/rpp2025-rev-elements-electronic-struct.pdf' },
  { label: 'Royal Society of Chemistry · Elektronenkonfigurationen schwerer Elemente', url: 'https://periodic-table.rsc.org/' },
  { label: 'LEIFIphysik · Schalen, Unterschalen und Orbitale', url: 'https://www.leifiphysik.de/atomphysik/quantenmech-atommodell/grundwissen/quantenmechanische-systematisierung-des-periodensystems' },
  { label: 'OpenStax · Orbitalbelegung und Hundsche Regel', url: 'https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations' },
  { label: 'OpenStax · Lewis-Symbole und Außenelektronen', url: 'https://openstax.org/books/chemistry-2e/pages/7-3-lewis-symbols-and-structures' },
];

const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
const orbitalsPerSubshell = { s: 1, p: 3, d: 5, f: 7 };

function expandedConfiguration(symbol) {
  const terms = groundConfigurations[symbol].split(' ');
  if (!terms[0].startsWith('[')) return terms;
  const core = terms.shift().slice(1, -1);
  return [...expandedConfiguration(core), ...terms];
}

export function electronStructure(element) {
  const shells = [];
  for (const term of expandedConfiguration(element.symbol)) {
    const n = Number(term[0]);
    const electrons = Number(term.slice(2));
    const slots = orbitalsPerSubshell[term[1]];
    // Hund's rule: each orbital in this subshell receives one electron before pairing.
    const occupied = Math.min(electrons, slots);
    const shell = shells[n - 1] ??= {
      n, name: shellNames[n - 1], electrons: 0, occupiedOrbitals: 0, subshells: [],
    };
    shell.electrons += electrons;
    shell.occupiedOrbitals += occupied;
    shell.subshells.push({ label: term.slice(0, 2), electrons, slots, occupied });
  }
  return {
    shells,
    occupiedOrbitals: shells.reduce((sum, shell) => sum + shell.occupiedOrbitals, 0),
    predicted: element.n >= 103 || element.symbol === 'Md',
  };
}

function configurationMarkup(symbol) {
  return groundConfigurations[symbol].split(' ').map(term => {
    if (term.startsWith('[')) return `<span>${term}</span>`;
    return `<span>${term.slice(0, 2)}<sup>${term.slice(2)}</sup></span>`;
  }).join(' ');
}

export function shellDiagram(element, counts = electronStructure(element).shells.map(shell => shell.electrons)) {
  const rings = counts.map((occupancy, index) => {
    const outer = index === counts.length - 1;
    const radius = counts.length === 1 ? 55 : 28 + 49 * index / (counts.length - 1);
    const dotSize = occupancy > 18 ? 2.4 : 3.2;
    const electrons = Array.from({ length: occupancy }, (_, i) => {
      const angle = (i / occupancy) * 2 * Math.PI - Math.PI / 2 + index * 0.34;
      const x = (98 + radius * Math.cos(angle)).toFixed(2);
      const y = (85 + radius * Math.sin(angle)).toFixed(2);
      return `<circle class="atom-electron" cx="${x}" cy="${y}" r="${dotSize}"/>`;
    });
    return `<g class="atom-shell${outer ? ' atom-shell-outer' : ''}"><circle class="atom-orbit" cx="98" cy="85" r="${radius.toFixed(2)}"/>${electrons.join('')}</g>`;
  }).join('');
  const totals = counts.map((count, index) => `<li title="${shellNames[index]}-Schale: ${count} ${count === 1 ? 'Elektron' : 'Elektronen'}"><span>${shellNames[index]}</span><b>${count}</b></li>`).join('');
  return `<figure class="atom-shell-card">
    <figcaption>Schalenmodell</figcaption>
    <svg class="atom-shell-drawing" viewBox="0 0 196 170" role="img" aria-label="Neutrales ${element.name}-Atom, ${element.n} Elektronen. Schalen von innen nach außen: ${counts.join(', ')}.">
      ${rings}<circle class="atom-kern" cx="98" cy="85" r="17.5"/><text class="atom-kern-symbol" x="98" y="85" dy=".34em" text-anchor="middle">${element.symbol}</text>
    </svg>
    <div class="atom-shell-key"><span>Elektronen je Schale</span><ol aria-label="Schalen von innen nach außen">${totals}</ol></div>
  </figure>`;
}

function lewisDiagram(element, outerCount) {
  const pairs = element.symbol === 'He' ? 1 : Math.max(0, outerCount - 4);
  const single = outerCount - pairs * 2;
  // A pair sits side by side, including the two 1s electrons of helium.
  const sides = [[88, 54, 0, 1], [58, 24, 1, 0], [28, 54, 0, 1], [58, 84, 1, 0]];
  const dots = sides.map(([x, y, dx, dy], side) => {
    const count = (side < pairs ? 2 : Number(side < pairs + single));
    return Array.from({ length: count }, (_, i) => {
      const gap = count === 2 ? (i * 2 - 1) * 5 : 0;
      return `<circle class="atom-lewis-dot" cx="${x + gap * dx}" cy="${y + gap * dy}" r="3.4"/>`;
    }).join('');
  }).join('');
  const groups = [];
  if (pairs) groups.push(`${pairs} ${pairs === 1 ? 'Paar' : 'Paare'}`);
  if (single) groups.push(`${single} ${single === 1 ? 'einzelner Punkt' : 'einzelne Punkte'}`);
  return `<figure class="atom-lewis-card">
    <figcaption>Lewis-Schreibweise</figcaption>
    <svg class="atom-lewis-drawing" viewBox="0 0 116 108" role="img" aria-label="Lewis-Symbol ${element.symbol} mit ${outerCount} ${outerCount === 1 ? 'Punkt' : 'Punkten'}: ${groups.join(' und ')}.">
      <text x="58" y="54" dy=".34em" text-anchor="middle">${element.symbol}</text>${dots}
    </svg>
    <div class="atom-lewis-key"><strong>${outerCount} ${outerCount === 1 ? 'Außenelektron' : 'Außenelektronen'}</strong><span>${groups.join(' · ')}</span></div>
  </figure>`;
}

function configurationCard(element, counts) {
  const outerCount = counts.at(-1);
  return `<figure class="atom-config-card">
    <figcaption>Elektronenkonfiguration</figcaption>
    <p class="atom-config-text" aria-label="Elektronenkonfiguration ${groundConfigurations[element.symbol]}">${configurationMarkup(element.symbol)}</p>
    <p class="atom-config-shell">${outerCount} ${outerCount === 1 ? 'Elektron' : 'Elektronen'} in der äußersten besetzten Schale (${shellNames[counts.length - 1]}).</p>
  </figure>`;
}

function subshellDiagram({ label, electrons, slots, occupied }) {
  const pairs = electrons - occupied;
  const arrows = Array.from({ length: slots }, (_, i) => {
    const spin = i < pairs ? '↑↓' : i < occupied ? '↑' : '';
    return `<span class="orbital-box">${spin}</span>`;
  }).join('');
  const description = `${label}, ${electrons} ${electrons === 1 ? 'Elektron' : 'Elektronen'}. ${pairs} doppelt besetzt, ${occupied - pairs} einfach besetzt, ${slots - occupied} leer.`;
  return `<div class="orbital-subshell" role="img" aria-label="${description}">
    <span class="orbital-subshell-label" aria-hidden="true">${label}<sup>${electrons}</sup></span>
    <span class="orbital-boxes" aria-hidden="true">${arrows}</span>
  </div>`;
}

function orbitalPanel(shells) {
  const rows = shells.map(shell => {
    const possible = shell.n ** 2;
    const description = `${shell.name}-Schale, n gleich ${shell.n}. ${shell.electrons} ${shell.electrons === 1 ? 'Elektron' : 'Elektronen'}. Besetzte Orbitale ${shell.occupiedOrbitals}, mögliche Orbitale ${possible}.`;
    return `<details class="orbital-shell"${shell === shells.at(-1) ? ' open' : ''}>
      <summary aria-label="${description}">
        <span class="orbital-shell-name"><b>${shell.name}</b><small>n = ${shell.n}</small></span>
        <span>${shell.electrons}</span><span><b>${shell.occupiedOrbitals}</b><small> / ${possible}</small></span>${icon('chevron-down')}
      </summary>
      <div class="orbital-subshells">${shell.subshells.map(subshellDiagram).join('')}</div>
    </details>`;
  }).join('');
  return `<section class="orbital-panel" aria-labelledby="orbital-panel-title">
    <h4 id="orbital-panel-title">Orbitale je Schale</h4>
    <p>Öffne eine Schale für ihr Kästchenschema. Jedes Kästchen ist ein Orbital mit Platz für zwei Elektronen. Jeder Pfeil steht für ein Elektron.</p>
    <div class="orbital-head" aria-hidden="true"><span>Schale</span><span>Elektronen</span><span>Orbitale<small>besetzt / möglich</small></span></div>
    ${rows}
    <p class="orbital-foot">Eine Schale mit der Nummer n hat n² mögliche Orbitale. Das Schema zeigt alle Unterschalen, die Elektronen enthalten.</p>
  </section>`;
}

export function schoolOrbitalVisuals(element, showShell) {
  const structure = electronStructure(element);
  const counts = structure.shells.map(shell => shell.electrons);
  return `<p>Im neutralen ${element.name}-Atom ${structure.occupiedOrbitals === 1 ? 'ist ein Orbital auf einer Schale' : 'sind ' + structure.occupiedOrbitals + ' Orbitale auf ' + counts.length + ' Schalen'} besetzt.</p>
    <div class="atom-pair">${showShell ? shellDiagram(element, counts) : ''}${configurationCard(element, counts)}</div>${orbitalPanel(structure.shells)}`;
}

export function schoolAtomVisuals(element, showLewis) {
  const counts = electronStructure(element).shells.map(shell => shell.electrons);
  const outer = counts.at(-1);
  const nucleus = `Das neutrale Atom hat ${element.n} ${element.n === 1 ? 'Proton und ein Elektron' : 'Protonen und ebenso viele Elektronen'}.`;
  const period = `Die Periodennummer ${element.period} gibt die Zahl seiner besetzten Schalen an.`;
  const outerShell = element.symbol === 'He' ? 'Bei Helium ist die einzige Schale mit zwei Elektronen voll.' :
    `Auf der Außenschale ${outer === 1 ? 'sitzt ein Elektron' : 'sitzen ' + outer + ' Elektronen'}. Diese Zahl entspricht bei diesem Element der Hauptgruppennummer.`;
  return `<section class="atom-visuals school-atom" id="element-atom" aria-labelledby="atom-visuals-title">
    <h3 id="atom-visuals-title" class="section-heading">${icon('atom')}Atombau</h3>
    <p class="atom-model-note">${nucleus} ${period} ${outerShell}</p>
    <div class="atom-pair">${shellDiagram(element, counts)}${showLewis ? lewisDiagram(element, outer) : ''}</div>
    ${showLewis ? '<p class="atom-model-note">Jeder Punkt am Elementsymbol steht für ein Außenelektron.</p>' : ''}
  </section>`;
}

export function atomVisuals(element, structure = electronStructure(element)) {
  const counts = structure.shells.map(shell => shell.electrons);
  const mainGroup = element.group === 1 || element.group === 2 || element.group >= 13;
  const diagram = mainGroup ? lewisDiagram(element, counts.at(-1)) : configurationCard(element, counts);
  const explanation = mainGroup
    ? 'Die Ringe zeigen die besetzten Schalen von innen nach außen. Jeder Punkt im Lewis-Symbol zählt ein Elektron der äußersten Schale.'
    : 'Die Lewis-Punktregel gilt für die Hauptgruppen. In dieser Elementreihe können mehrere Unterschalen an Bindungen beteiligt sein. Die Elektronenkonfiguration gibt ihre Besetzung an.';
  const modelNote = structure.predicted ? '<p class="atom-model-note atom-prediction"><strong>Theoretische Zuordnung.</strong> Die gezeigte Verteilung beruht für dieses Atom auf einer Vorhersage.</p>' : '';
  return `<section class="atom-visuals" aria-labelledby="atom-visuals-title">
    <h3 id="atom-visuals-title" class="section-heading">${icon('atom')}Atombau</h3>
    <div class="atom-pair">${shellDiagram(element, counts)}${diagram}</div>
    <p class="atom-model-note">${explanation}</p>${modelNote}
    ${orbitalPanel(structure.shells)}
  </section>`;
}
