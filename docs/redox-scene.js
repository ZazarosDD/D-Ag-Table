import { speciesInfo } from './redox-species.js';
import { particleBalance } from './redox-model.js';

const stateName = { s: 'fest', aq: 'in Lösung' };
const locations = {
  negative: { s: [82,169], aq: [120,164] },
  positive: { s: [398,169], aq: [351,164] }
};
const electronsMax = 6;
const clamp = n => Math.max(0,Math.min(1,n));
const mix = (a,b,f) => a + (b-a)*f;
const shift = (node,x,y) => node.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');

function termList(balance, side, type) {
  return balance[side][type].filter(term => term.formula !== 'e⁻');
}

function pieceId(side, type, index) {
  return side + '-' + type + (index ? '-' + index : '');
}

function material(side, type, term, index) {
  const info = speciesInfo[term.formula];
  const id = pieceId(side,type,index);
  if (index) {
    const width = Math.max(54,term.formula.length * 7.8 + 30);
    return `<g class="rx-material rx-reagent rx-form-${info.phase}" data-rx-piece="${id}" opacity="0">
      <rect x="${-width/2}" y="-10" width="${width}" height="20" rx="9"/>
      <text class="rx-symbol" data-rx-label="${id}" y="4">${term.formula}</text></g>`;
  }
  const width = Math.max(58, term.formula.length * 8.3 + 32);
  return `<g class="rx-material rx-form-${info.phase} rx-kind-${type}" data-rx-piece="${id}" opacity="0">
    <rect x="${-width/2}" y="-13" width="${width}" height="25" rx="${info.phase === 'aq' ? 13 : 4}"/>
    <text class="rx-symbol" data-rx-label="${id}" y="5">${term.formula}</text>
    <text class="rx-material-state" y="28">${stateName[info.phase]}</text></g>`;
}

function bridgeIon(key, formula) {
  return `<g class="rx-bridge-ion ${key}" data-rx-bridge-ion="${key}" opacity="0"><rect x="-18" y="-9" width="36" height="18" rx="8"/><text y="4">${formula}</text></g>`;
}

const dots = [[36,151],[54,177],[100,143],[123,188],[148,162],[162,184],[39,194],[63,145],[112,176],[141,146],[73,189],[162,152]];
function solutionDots(side, mirrored) {
  return '<g data-rx-density="' + side + '" aria-hidden="true">' + dots.map(([x,y],i) =>
    `<circle class="rx-solute-dot ${side}" cx="${mirrored ? 480-x : x}" cy="${y}" r="2.8" data-density="${i < 2 ? .01 : i < 6 ? .1 : 1}"/>`).join('') + '</g>';
}

export function scenePieces(cell) {
  const rx = particleBalance(cell,1);
  return `<g aria-hidden="true">${cell.id === 'daniell' ? solutionDots('zinc',false) + solutionDots('copper',true) : ''}
    ${['negative','positive'].flatMap(side => ['before','after'].flatMap(type =>
      termList(rx,side,type).map((term,index) => material(side,type,term,index)))).join('')}
    ${cell.id === 'daniell' ? bridgeIon('anion','NO₃⁻') + bridgeIon('cation','K⁺') : '<g class="rx-ion-flow" data-rx-interior-signal opacity="0"><rect x="196" y="86" width="88" height="21" rx="8"/><text x="240" y="101">Ionen leiten</text></g>'}
    <g class="rx-switch"><rect x="113" y="33" width="38" height="16"/><circle cx="116" cy="42" r="2.6"/><circle cx="147" cy="42" r="2.6"/><path data-rx-switch d="M116 42L147 42"/></g>
    ${Array.from({length:electronsMax},(_,i) => `<g class="rx-electron" ${i === 0 ? 'data-rx-particle' : 'data-rx-electron="'+i+'"'} opacity="0" transform="translate(86 100)"><circle r="10"/><text text-anchor="middle" y="4">e⁻</text></g>`).join('')}</g>`;
}

export function createScene(root, cell, positionOnWire) {
  const initial = particleBalance(cell,1);
  const nodes = {};
  for (const side of ['negative','positive']) {
    nodes[side] = {};
    for (const type of ['before','after']) {
      nodes[side][type] = termList(initial,side,type).map((term,index) => {
        const key = pieceId(side,type,index);
        return { group: root.querySelector('[data-rx-piece="' + key + '"]'), text: root.querySelector('[data-rx-label="' + key + '"]') };
      });
    }
  }
  const electrons = Array.from({length:electronsMax},(_,i) => root.querySelector(i === 0 ? '[data-rx-particle]' : '[data-rx-electron="'+i+'"]'));
  const bridge = cell.id === 'daniell' ? ['anion','cation'].map(key => root.querySelector('[data-rx-bridge-ion="'+key+'"]')) : [];
  const signal = cell.id === 'daniell' ? null : root.querySelector('[data-rx-interior-signal]');
  const lever = root.querySelector('[data-rx-switch]');
  let balance, electronCount;
  function configure(model, settings) {
    balance = model;
    electronCount = model.negative.after.find(term => term.formula === 'e⁻').count;
    for (const side of ['negative','positive']) {
      for (const type of ['before','after']) {
        termList(balance,side,type).forEach((term,i) => {
          nodes[side][type][i].text.textContent = (term.count > 1 ? term.count + ' ' : '') + term.formula;
        });
      }
    }
    if (bridge.length) {
      for (const key of ['zinc','copper']) {
        for (const dot of root.querySelectorAll('[data-rx-density="' + key + '"] circle')) {
          dot.setAttribute('opacity', Number(dot.dataset.density) <= settings[key] ? '1' : '0');
        }
      }
    }
  }
  function transformSide(side, progress) {
    const reactant = balance[side].before[0].formula, product = balance[side].after[0].formula;
    const surface = locations[side].s;
    const start = locations[side][speciesInfo[reactant].phase], end = locations[side][speciesInfo[product].phase];
    const before = nodes[side].before[0].group, after = nodes[side].after[0].group;
    const arrive = clamp(progress*2), depart = clamp((progress-.42)/.58);
    const reveal = clamp((progress-.38)/.24);
    shift(before,mix(start[0],surface[0],arrive),mix(start[1],surface[1],arrive));
    shift(after,mix(surface[0],end[0],depart),mix(surface[1],end[1],depart));
    before.setAttribute('opacity',(1-reveal).toFixed(2));
    after.setAttribute('opacity',reveal.toFixed(2));
    // Additional dissolved species and water approach or leave each electrode.
    const direction = side === 'negative' ? 1 : -1;
    for (const type of ['before','after']) {
      const extras = nodes[side][type];
      const distance = type === 'before' ? mix(92,46,arrive) : mix(46,92,depart);
      const opacity = type === 'before' ? 1-reveal : reveal;
      for (let i=1;i<extras.length;i++) {
        shift(extras[i].group,surface[0] + direction*distance,i === 1 ? 134 : 193);
        extras[i].group.setAttribute('opacity',opacity.toFixed(2));
      }
    }
  }
  function draw(position, closed) {
    const oxidation = clamp(position/.22), reduction = clamp((position-.72)/.15);
    transformSide('negative',oxidation);
    transformSide('positive',reduction);
    const moving = clamp((position-.28)/.44);
    for (let i=0;i<electronsMax;i++) {
      const lag = i * .065;
      const fraction = clamp((moving-lag) / (1-(electronCount-1)*.065));
      const [x,y] = positionOnWire(fraction);
      // Spread waiting markers around the terminal, then merge them onto the wire.
      const spread = 1 - clamp(Math.min(fraction,1-fraction)/.055);
      const inCluster = position > .08 && position < .84;
      const column = i % 3, row = Math.floor(i/3);
      const dx = inCluster && i > 0 ? (column === 1 ? 20 : column === 2 ? -20 : 0) * spread : 0;
      const dy = inCluster && i > 0 ? (row ? 19 : 0) * spread : 0;
      shift(electrons[i],x+dx,y+dy);
      const visible = i < electronCount && closed && inCluster;
      electrons[i].setAttribute('opacity',visible ? '1' : '0');
    }
    const ionProgress = clamp((position-.29)/.42);
    for (let i=0;i<bridge.length;i++) {
      const start = i ? 262 : 218, finish = i ? 332 : 148;
      shift(bridge[i],mix(start,finish,clamp(ionProgress/.63)),mix(94,136,clamp((ionProgress-.63)/.37)));
      bridge[i].setAttribute('opacity',closed && ionProgress > 0 && ionProgress < 1 ? '1' : '0');
    }
    if (signal) signal.setAttribute('opacity',closed && moving > 0 && moving < 1 ? '1' : '0');
    lever.setAttribute('d',closed ? 'M116 42L147 42' : 'M116 42L144 27');
  }
  return { configure, draw };
}

