import { escapeHtml } from './details.js';
import { shellDiagram } from './atom-model.js';
import { elementBySymbol } from './catalogue.js';
import { hazardIcons } from './hazard-icons.js';
import { visualTable } from './practice-ui.js';

const numberDE = value => Number.parseFloat(String(value).replace('−','-').replace(',','.'));
const labelDE = value => Number(value).toLocaleString('de-DE', { maximumFractionDigits: 2 });

function svg(width, height, description, marks) {
  return `<svg class="pr-plot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(description)}"><title>${escapeHtml(description)}</title>${marks}</svg>`;
}
function textAt(x, y, label, anchor = 'start', cls = '') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${escapeHtml(label)}</text>`;
}

function metalBars(v) {
  const left = 80;
  const scale = 2.85;
  const rows = v.rows.map(([metal, mass], i) => {
    const y = 25 + i * 34;
    const width = numberDE(mass) * scale;
    return textAt(left - 7, y + 4, metal, 'end') +
      `<rect x="${left}" y="${y - 7}" width="${width}" height="14" rx="3" class="pr-mark"/>` +
      textAt(left + width + 5, y + 4, mass);
  }).join('');
  const ticks = [0,25,50,75,100].map(value => textAt(left + scale * value, 130, value, 'middle')).join('');
  return svg(425, 160, 'Masse bei gleichem Volumen. ' + v.rows.map(r => r[0] + ' ' + r[1]).join(', '),
    rows + '<path class="pr-axis" d="M80 12V113H365"/>' + ticks + textAt(222,151,'Masse in g','middle')) +
    '<p>Alle Würfel haben ein Volumen von 10 cm³. Aluminium und Eisen sind silbrig, Kupfer ist rötlich.</p>';
}

function shellSamples() {
  return '<div class="pr-shell-gallery">' + ['He','O','S','Ar'].map(symbol => {
    const element = elementBySymbol.get(symbol);
    return '<div><strong>' + element.name + ' · Periode ' + element.period + '</strong>' + shellDiagram(element) + '</div>';
  }).join('') + '</div>';
}

function hazardLabel() {
  const icon = hazardIcons.GHS07;
  return '<div class="pr-hazard-label"><img width="72" height="72" src="' + icon.src + '" alt="GHS07. Schwarzes Ausrufezeichen in einer roten Raute."><div><strong>Achtung</strong><p>H319 · Verursacht schwere Augenreizung.</p></div></div>';
}

function particleStates(v) {
  const solid = Array.from({ length: 12 }, (_, i) => [37 + (i % 4) * 15, 47 + Math.floor(i / 4) * 14]);
  const liquid = [[27,71],[42,74],[57,70],[73,74],[90,73],[35,58],[51,57],[67,60],[82,59],[46,44],[61,45],[75,46]];
  const gas = [[13,13],[49,22],[84,10],[111,28],[26,45],[65,41],[94,50],[9,72],[40,79],[62,67],[84,83],[111,72]];
  return '<div class="pr-networks">' + [solid, liquid, gas].map((points,i) => {
    const description = v.rows[i][1];
    const dots = points.map(([x,y]) => '<circle cx="' + x + '" cy="' + y + '" r="5.7" class="pr-mark"/>').join('');
    return '<div class="pr-polymer-sample"><strong>Modell ' + v.rows[i][0] + '</strong>' + svg(125,95,description,dots) + '<small>' + escapeHtml(description) + '</small></div>';
  }).join('') + '</div><p>Jeder Kreis steht für ein Teilchen desselben Stoffes.</p>';
}

function lattice(v) {
  const columns = [0,1,2,3];
  const points = columns.flatMap(col => [0,1,2].map(row => {
    const plus = (row + col) % 2 === 0;
    const x = 29 + col * 35, y = 24 + row * 32;
    return `<circle cx="${x}" cy="${y}" r="14" fill="${plus ? '#d9d0ed' : '#cce6de'}" stroke="${plus ? '#765794' : '#4a796c'}"/>` + textAt(x, y + 4, plus ? 'Na⁺' : 'Cl⁻','middle');
  })).join('');
  const left = svg(164,110,'Festes Natriumchlorid. Ausschnitt aus einer Ebene mit abwechselnd positiv und negativ geladenen Ionen.',points);
  return '<div class="pr-model-lab pr-lattice"><div><b>Ausschnitt aus einem festen Kristall</b>' + left + '</div><div><b>Leitfähigkeit im Versuch</b>' +
    '<ul>' + v.rows.map(r => '<li>' + escapeHtml(r[0]) + ' · ' + escapeHtml(r[1]) + '</li>').join('') + '</ul></div></div>';
}

function energy(v) {
  const [without, withCat] = v.rows;
  const y = val => 173 - val * .88;
  const x0 = 57, xp = 207, xe = 362;
  const grid = [0,50,100,150].map(n => `<path class="pr-gridline" d="M${x0} ${y(n)}H${xe}"/>` + textAt(47,y(n)+4,n,'end')).join('');
  function curve(r, second) {
    const [start, peak, end] = r.slice(1).map(numberDE).map(y);
    return `<path class="pr-curve ${second ? 'pr-dashed' : ''}" d="M${x0} ${start} C123 ${start} 152 ${peak} ${xp} ${peak} S291 ${end} ${xe} ${end}"/>`;
  }
  return svg(410,217,'Energieprofile eines schematischen Reaktionsverlaufs. Die Werte für Start, höchsten Punkt und Ende sind ' + without.slice(1).join(', ') + ' ohne Katalysator und ' + withCat.slice(1).join(', ') + ' mit Katalysator.',
    grid + '<path class="pr-axis" d="M57 27V173H367"/>' + textAt(9,16,'Energie in Modelleinheiten') + curve(without,false) + curve(withCat,true) +
    textAt(xp+1,y(numberDE(without[2]))-8,without[2],'middle') + textAt(xp,y(numberDE(withCat[2]))+16,withCat[2],'middle') +
    textAt(x0+3,y(numberDE(without[1]))-7,without[1]) + textAt(xe,y(numberDE(without[3]))-8,without[3],'end') + textAt(209,202,'Reaktionsverlauf','middle')) +
    '<p><span class="pr-line-key"></span> Ohne Katalysator &emsp;<span class="pr-line-key dashed"></span> Mit Katalysator</p>';
}

function xy(v, mode) {
  const rate = mode === 'rate';
  const maxX = rate ? 30 : 25;
  const maxY = rate ? .30 : 14;
  const points = v.rows.map(([x, y]) => [numberDE(x), numberDE(y)]);
  const left = 57, right = 352, bottom = 165, top = 29;
  const x = val => left + val / maxX * (right - left);
  const y = val => bottom - val / maxY * (bottom - top);
  const yTicks = rate ? [0,.1,.2,.3] : [0,2,4,6,8,10,12,14];
  const xTicks = rate ? [0,10,20,30] : [0,5,10,15,20,25];
  const grid = yTicks.map(n => `<path class="pr-gridline" d="M${left} ${y(n)}H${right}"/>` + textAt(left-8, y(n)+4, labelDE(n),'end')).join('');
  const ticks = xTicks.map(n => textAt(x(n),bottom+17,n,'middle')).join('');
  const line = rate ? `<polyline class="pr-curve" points="${points.map(p => x(p[0])+','+y(p[1])).join(' ')}"/>` : '';
  const marks = points.map(([a,b], i) => `<circle class="pr-point" cx="${x(a)}" cy="${y(b)}" r="4.3"/>` +
    textAt(x(a) + (i === 0 ? 7 : 0), y(b)-8, labelDE(b), i === 0 ? 'start' : 'middle')).join('');
  const yLabel = rate ? 'c(P) in mol/L' : 'pH';
  const xLabel = rate ? 'Zeit in s' : 'Zugegebene Natronlauge in mL';
  return svg(404,214,yLabel + ' in Abhängigkeit von ' + xLabel + '. ' + v.rows.map(r => r.join(' entspricht ')).join(', '),
    grid + '<path class="pr-axis" d="M57 26V165H357"/>' + textAt(8,16,yLabel) + ticks + line + marks + textAt(200,204,xLabel,'middle')) +
    '<p>' + (rate ? 'Jeder Punkt steht für eine Modellmessung. Die Linie verbindet die Messpunkte.' : 'Gezeigt sind vier berechnete Punkte der Titration. Vergleiche insbesondere die pH-Werte bei 10 und 20 mL.') + '</p>';
}

function potentials(v) {
  const x = n => 201 + 142 * n;
  const axis = '<path class="pr-axis" d="M59 69H343"/>';
  const ticks = [-1,-.5,0,.5,1].map(n => `<path class="pr-axis" d="M${x(n)} 65v8"/>` + textAt(x(n),89,labelDE(n),'middle')).join('');
  const points = v.rows.map(([name, val]) => {
    const pos = x(numberDE(val));
    return textAt(pos,26,name,'middle') + textAt(pos,43,val,'middle') + `<path class="pr-gridline" d="M${pos} 47V69"/><circle class="pr-point" cx="${pos}" cy="69" r="5"/>`;
  }).join('');
  return svg(406,122,v.title + '. ' + v.rows.map(r => r.join(' ')).join(', '),axis + ticks + points + textAt(201,114,'Standard-Reduktionspotenzial E° in V','middle'));
}

function polymerNetworks(v, senior) {
  const probe = v.rows.map((row,index) => {
    const cols = index === 0 ? [] : index === 1 ? [[2,0],[4,1]] : [[0,0],[1,1],[2,0],[3,1],[4,0],[5,1],[6,0]];
    const height = (i,j) => 18 + j * 22 + Math.sin(i * .93 + j * .64) * 6;
    const chain = j => Array.from({length:9},(_,i) => (10+i*17) + ',' + height(i,j).toFixed(2)).join(' ');
    const lines = cols.map(([i,j]) => {
      const x = 10 + (i+1)*17;
      return `<path class="pr-crosslink" d="M${x} ${height(i+1,j)}V${height(i+1,j+1)}"/>`;
    }).join('') + [0,1,2].map(j => `<polyline class="pr-polymer" points="${chain(j)}"/>`).join('');
    const model = senior ? row[2] : row[1];
    const observation = senior ? row[1] : row[2];
    const name = senior ? 'Probe ' + row[0] : row[0];
    return '<div class="pr-polymer-sample"><strong>' + escapeHtml(name) + '</strong>' + svg(157,86,model,lines) +
      '<small>' + escapeHtml(observation) + '</small></div>';
  }).join('');
  return '<div class="pr-networks">' + probe + '</div><p>Modellausschnitte. Die langen Linien stellen Polymerketten dar. Die kurzen Querstriche stehen für feste Vernetzungen.</p>';
}

function chromatography(v) {
  const y = distance => 165 - distance * 15.5;
  const start = y(0), front = y(8);
  const spots = [[2],[6],[2,6]].map((values,i) => values.map(cm => `<ellipse class="pr-tlc-spot" cx="${107+i*72}" cy="${y(cm)}" rx="8" ry="4"/>`).join('')).join('');
  const measure = [0,2,4,6,8].map(n => textAt(52,y(n)+4,n,'end') + `<path class="pr-gridline" d="M60 ${y(n)}H280"/>`).join('');
  const xLabels = ['Ref. A','Ref. B','Tinte'].map((label,i) => textAt(107+i*72,188,label,'middle')).join('');
  return svg(372,201,'Modell einer Dünnschichtplatte. Referenz A hat einen Fleck bei 2 cm, Referenz B bei 6 cm und die Tinte bei 2 und 6 cm. Die Laufmittelfront liegt bei 8 cm.',
    '<rect x="60" y="28" width="220" height="147" rx="4" fill="#f5f4f7" stroke="#b8afc0"/>' + measure +
    `<path class="pr-axis" d="M60 ${start}H280"/><path class="pr-front" d="M60 ${front}H280"/>` +
    textAt(8,15,'Weg in cm') + textAt(285,front+4,'Front') + textAt(285,start+4,'Start') + xLabels + spots) +
    '<p>Die Punkte markieren die Lage der Flecken. Referenz A enthält eine Azogruppe und absorbiert am stärksten bei rund 450 nm, B bei 590 nm. Die Tinte zeigt beide Maxima.</p>';
}

const figures = {
  'j7-stoffeigenschaften': metalBars, 'j7-etikett': hazardLabel, 'j7-teilchen': particleStates,
  'j8-schalen': shellSamples, 'j9-ionengitter': lattice,
  'j10-katalyse': energy, 'j10-kunststoffe': v => polymerNetworks(v,false),
  'e11-reaktionsgeschwindigkeit': v => xy(v,'rate'), 'q12-galvanisch': potentials,
  'q12-titrationskurve': v => xy(v,'titration'), 'q13-vernetzung': v => polymerNetworks(v,true),
  'q13-farbstoffe': chromatography
};

export function lessonVisual(topicId, v, print = false) {
  if (!v || !figures[topicId]) return visualTable(v);
  const table = visualTable(v);
  const alternative = print ? table : `<details class="pr-details pr-source-data" data-pr-stay-open="${topicId}"><summary>Daten als Tabelle lesen</summary>${table}</details>`;
  return `<div class="pr-lesson-figure"><h4>${escapeHtml(v.title)}</h4>${figures[topicId](v)}</div>${alternative}`;
}

