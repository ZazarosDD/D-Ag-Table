// Figure 10.4 gives the gas-phase bond angles rounded for use in the classroom.
const source = 'https://jan.ucc.nau.edu/ah476/videonotes/VSEPRnotes.pdf';

export const molecules = [
  {
    id: 'H2O', name: 'Wasser', center: 'O', outer: ['H', 'H'],
    pairs: 2, orders: [1, 1], geometry: 'gewinkelt', angle: 104.5, source
  },
  {
    id: 'NH3', name: 'Ammoniak', center: 'N', outer: ['H', 'H', 'H'],
    pairs: 1, orders: [1, 1, 1], geometry: 'trigonal-pyramidal', angle: 107, source
  },
  {
    id: 'CH4', name: 'Methan', center: 'C', outer: ['H', 'H', 'H', 'H'],
    pairs: 0, orders: [1, 1, 1, 1], geometry: 'tetraedrisch', angle: 109.5, source
  }
];

const lewisLayout = {
  H2O: { y: 86, arms: [143, 37], dots: [-135, -45, 90, -90] },
  NH3: { y: 85, arms: [180, 90, 0], dots: [-90, -143, -37, 138] },
  CH4: { y: 102, arms: [-90, 0, 90, 180], dots: [-135, -45, 45, 135] }
};

const atomColors = { O: '#ba414c', N: '#4467a2', C: '#484254', H: '#faf9fc' };
const radians = degrees => degrees * Math.PI / 180;
const coordinate = value => value.toFixed(2);
const integerInRange = (value, limit) => Math.min(limit, Math.max(0, Math.trunc(Number(value) || 0)));

function diagram(label, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 204" role="img" aria-label="${label}" focusable="false" style="display:block;width:100%;max-width:370px;height:auto;margin-inline:auto" font-family="Inter,Roboto,Arial,sans-serif">
    <title>${label}</title>${content}
  </svg>`;
}

function atomLabel(symbol, x, y, size, fill) {
  return `<text x="${coordinate(x)}" y="${coordinate(y)}" dy=".34em" text-anchor="middle" font-size="${size}" font-weight="700" fill="${fill}">${symbol}</text>`;
}

export function lewisDrawing(molecule, orders = molecule.orders, pairs = molecule.pairs) {
  const layout = lewisLayout[molecule.id];
  const x = 140;
  const y = layout.y;
  const armLength = 66;
  const entryOrders = molecule.outer.map((_, i) => integerInRange(orders[i], 3));
  const entryPairs = integerInRange(pairs, layout.dots.length);
  const strokes = [];
  const labels = [atomLabel(molecule.center, x, y, 29, atomColors[molecule.center])];

  layout.arms.forEach((angle, i) => {
    const dx = Math.cos(radians(angle));
    const dy = Math.sin(radians(angle));
    const order = entryOrders[i];
    for (let n = 0; n < order; n++) {
      const offset = (n - (order - 1) / 2) * 5;
      const ox = x - dy * offset;
      const oy = y + dx * offset;
      strokes.push(`<line x1="${coordinate(ox + 18 * dx)}" y1="${coordinate(oy + 18 * dy)}" x2="${coordinate(ox + (armLength - 15) * dx)}" y2="${coordinate(oy + (armLength - 15) * dy)}"/>`);
    }
    labels.push(atomLabel(molecule.outer[i], x + armLength * dx, y + armLength * dy, 24, '#403b4d'));
  });

  const dots = [];
  for (const angle of layout.dots.slice(0, entryPairs)) {
    const dx = Math.cos(radians(angle));
    const dy = Math.sin(radians(angle));
    for (const offset of [-4, 4]) {
      dots.push(`<circle cx="${coordinate(x + 22 * dx - offset * dy)}" cy="${coordinate(y + 22 * dy + offset * dx)}" r="2.6"/>`);
    }
  }
  const freePairs = entryPairs === 1 ? 'ein freies Elektronenpaar' : `${entryPairs} freie Elektronenpaare`;
  const aria = `Lewis-Schreibweise von ${molecule.name}. Die Bindungsordnungen zu den Wasserstoffatomen lauten der Reihe nach ${entryOrders.join(', ')}. Am Zentralatom zeigt die Zeichnung ${freePairs}.`;
  return diagram(aria, `<g stroke="#554b63" stroke-width="2.7" stroke-linecap="round">${strokes.join('')}</g><g fill="#623a9b">${dots.join('')}</g>${labels.join('')}`);
}

// Vectors from the central atom have unit length. y points down in the view.
function bondVectors(molecule) {
  if (molecule.id === 'H2O') {
    const halfAngle = radians(molecule.angle / 2);
    const dx = Math.sin(halfAngle);
    const dy = Math.cos(halfAngle);
    return [[-dx, dy, 0], [dx, dy, 0]];
  }
  // For three sites 120° apart about the y axis, cos(H–X–H) = (3y² − 1)/2.
  const methane = molecule.id === 'CH4';
  const y = methane ? 1 / 3 : Math.sqrt((1 + 2 * Math.cos(radians(molecule.angle))) / 3);
  const radius = Math.sqrt(1 - y * y);
  const base = [15, 135, 255].map(angle => [
    radius * Math.cos(radians(angle)), y, radius * Math.sin(radians(angle))
  ]);
  return methane ? [[0, -1, 0], ...base] : base;
}

function project([x, y, z], yaw, pitch) {
  const horizontal = x * Math.cos(yaw) + z * Math.sin(yaw);
  const depth = z * Math.cos(yaw) - x * Math.sin(yaw);
  return {
    x: 140 + 69 * horizontal,
    y: 102 + 69 * (y * Math.cos(pitch) - depth * Math.sin(pitch)),
    z: y * Math.sin(pitch) + depth * Math.cos(pitch)
  };
}

function atomBall(atom) {
  const hydrogen = atom.symbol === 'H';
  const textColor = hydrogen ? '#494452' : '#fff';
  const stroke = hydrogen ? '#a49bad' : atomColors[atom.symbol];
  return `<g><circle cx="${coordinate(atom.x)}" cy="${coordinate(atom.y)}" r="${coordinate(atom.radius)}" fill="${atomColors[atom.symbol]}" stroke="${stroke}" stroke-width="1.5"/>${atomLabel(atom.symbol, atom.x, atom.y, hydrogen ? 15 : 20, textColor)}</g>`;
}

export function spatialDrawing(molecule, yaw = 15, pitch = -17) {
  const yawDegrees = Number(yaw);
  const pitchDegrees = Number(pitch);
  const heading = radians(Number.isFinite(yawDegrees) ? yawDegrees : 15);
  const tilt = radians(Number.isFinite(pitchDegrees) ? pitchDegrees : -17);
  const center = { x: 140, y: 102, z: 0, symbol: molecule.center, radius: 19 };
  const layers = [{ z: 0, shape: atomBall(center) }];

  bondVectors(molecule).forEach((vector, i) => {
    const atom = project(vector, heading, tilt);
    atom.symbol = molecule.outer[i];
    atom.radius = 14 + atom.z * 1.8;
    layers.push({ z: atom.z, shape: atomBall(atom) });

    const dx = atom.x - center.x;
    const dy = atom.y - center.y;
    const length = Math.hypot(dx, dy);
    // When viewed end-on, the nearer atom occludes the bond completely.
    if (length <= center.radius + atom.radius) return;
    const start = (center.radius - .5) / length;
    const end = 1 - (atom.radius - .5) / length;
    const color = atom.z < 0 ? '#afa6bb' : '#82768f';
    const line = `<line x1="${coordinate(center.x + start * dx)}" y1="${coordinate(center.y + start * dy)}" x2="${coordinate(center.x + end * dx)}" y2="${coordinate(center.y + end * dy)}" stroke="${color}" stroke-width="${coordinate(5 + atom.z)}" stroke-linecap="round"/>`;
    layers.push({ z: atom.z / 2, shape: line });
  });
  const content = layers.sort((a, b) => a.z - b.z).map(layer => layer.shape).join('');
  const angle = String(molecule.angle).replace('.', ',');
  const label = `Räumliches Kugel-Stab-Modell von ${molecule.name}. Das Molekül ist ${molecule.geometry}. Der Bindungswinkel beträgt ungefähr ${angle} Grad.`;
  return diagram(label, content);
}
