// Standard reduction potentials in aqueous solution at 25 °C, in volts vs. SHE.
const source = 'https://lehrerfortbildung-bw.de/u_matnatech/chemie/gym/bp2004/fb3/modul1/2_mat_2/e2_045/';

export const electrodes = [
  { symbol: 'Zn', name: 'Zink', ion: 'Zn²⁺', charge: 2, potential: -0.76, source },
  { symbol: 'Cu', name: 'Kupfer', ion: 'Cu²⁺', charge: 2, potential: 0.34, source },
  { symbol: 'Ag', name: 'Silber', ion: 'Ag⁺', charge: 1, potential: 0.80, source },
  { symbol: 'Fe', name: 'Eisen', ion: 'Fe²⁺', charge: 2, potential: -0.44, source },
];

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function term(count, species) {
  return count === 1 ? species : count + ' ' + species;
}

export function cellResult(left, right) {
  if (!left || !right || left.symbol === right.symbol) return null;

  const [anode, cathode] = left.potential < right.potential ? [left, right] : [right, left];
  const electrons = anode.charge * cathode.charge / gcd(anode.charge, cathode.charge);
  const oxidizedAtoms = electrons / anode.charge;
  const reducedIons = electrons / cathode.charge;
  const anodeMetal = term(oxidizedAtoms, anode.symbol);
  const anodeIons = term(oxidizedAtoms, anode.ion);
  const cathodeMetal = term(reducedIons, cathode.symbol);
  const cathodeIons = term(reducedIons, cathode.ion);
  const transferred = term(electrons, 'e⁻');

  return {
    anode,
    cathode,
    voltage: Number((cathode.potential - anode.potential).toFixed(2)),
    electrons,
    oxidation: anodeMetal + ' → ' + anodeIons + ' + ' + transferred,
    reduction: cathodeIons + ' + ' + transferred + ' → ' + cathodeMetal,
    total: anodeMetal + ' + ' + cathodeIons + ' → ' + anodeIons + ' + ' + cathodeMetal,
  };
}
