import { schoolCompounds } from './school-compounds.js';
import { elements, elementSources } from './elements.js';
import { compounds as light, notes as lightNotes } from './compounds-light.js';
import { compounds as metals, notes as metalNotes } from './compounds-metals.js';
import { compounds as heavy, notes as heavyNotes } from './compounds-heavy.js';

export { elements, elementSources };
export const notes = { ...lightNotes, ...metalNotes, ...heavyNotes };
export const families = {
  alkali: ['Alkalimetalle', 'Alkalimetall'],
  alkaline: ['Erdalkalimetalle', 'Erdalkalimetall'],
  transition: ['Übergangsmetalle', 'Übergangsmetall'],
  post: ['Weitere Metalle', 'Weiteres Metall'],
  metalloid: ['Halbmetalle', 'Halbmetall'],
  nonmetal: ['Weitere Nichtmetalle', 'Nichtmetall'],
  halogen: ['Halogene', 'Halogen'],
  noble: ['Edelgase', 'Edelgas'],
  lanthanide: ['Lanthanoide', 'Lanthanoid'],
  actinide: ['Actinoide', 'Actinoid'],
  unknown: ['Zuordnung offen', 'Zuordnung offen'],
};

const furtherExamples = [
  {
    name: 'Calciumsulfat-Dihydrat', formula: 'CaSO4·2H2O', elements: ['Ca', 'S', 'O', 'H'], category: 'Alltag',
    occurrence: 'Im Mineral Gips sind Wassermoleküle fest in das Kristallgitter eingebaut.',
    use: 'Die ineinandergreifenden Gipskristalle bilden den festen Kern von Gipskartonplatten für Innenwände.',
    source: 'https://www.gips.de/wissen/rohstoffe/das-system-caso4-h2o',
  },
  {
    name: 'Ethanol', formula: 'C2H5OH', elements: ['C', 'H', 'O'], category: 'Alltag',
    occurrence: 'Hefen bilden diesen Alkohol, wenn sie Zucker vergären. Er kommt zum Beispiel in reifem Obst vor.',
    use: 'In einem Parfüm löst Ethanol viele Duftstoffe. Dadurch lassen sie sich gemeinsam als feiner Nebel versprühen.',
    source: 'https://ethz.ch/content/dam/ethz/special-interest/dual/educeth-dam/documents/Unterrichtsmaterialien/chemie/Alkohol/Leitprogramm_Alkohol.pdf',
  },
];

export const compounds = [...light, ...metals, ...heavy, ...furtherExamples, ...schoolCompounds];
export const elementBySymbol = new Map(elements.map(element => [element.symbol, element]));
export const compoundByFormula = new Map(compounds.map(compound => [compound.formula, compound]));
export const categoryIcons = { Alltag: 'cup', Technik: 'gear', Natur: 'leaf', Forschung: 'flask' };
export const familiarNames = {
  NaCl: 'Kochsalz', CaF2: 'Fluorit', CO2: 'Kohlendioxid', CaCO3: 'Kalk', C6H12O6: 'Traubenzucker',
  NaHCO3: 'Natron', SiO2: 'Quarz', C12H22O11: 'Haushaltszucker', Na2CO3: 'Soda',
  'CaSO4·2H2O': 'Gips', CaSO4: 'Anhydrit', Fe2O3: 'Hämatit', Al2O3: 'Korund', MgO: 'Periklas',
};
const elementAliases = {
  Al: ['Aluminum'], Si: ['Silizium'], Ca: ['Kalzium'], Co: ['Kobalt'], I: ['Jod'], Cs: ['Cäsium', 'Zäsium'],
  Zr: ['Zirkonium', 'Zirkon'], Bi: ['Wismut', 'Bismut'], Cd: ['Kadmium'], Cr: ['Chromium'],
  C: ['Carbon'], O: ['Oxygen'], N: ['Nitrogen'], H: ['Hydrogen'], W: ['Tungsten'],
  S: ['Sulfur'], Te: ['Tellurium'], U: ['Uranium'], Ce: ['Cerium'], Ac: ['Aktinium'],
};
const catalogueOrder = ['H2O', 'NaCl', 'CaCO3', 'CO2', 'CaF2', 'C6H12O6', 'NaHCO3', 'SiO2', 'TiO2', 'Fe2O3', 'LiFePO4', 'CaSO4·2H2O'];
const byElementOrder = {
  H: ['H2O', 'C6H12O6', 'NH3'], C: ['CO2', 'CaCO3', 'C6H12O6'], O: ['H2O', 'CO2', 'SiO2'],
  N: ['NH3', 'CO(NH2)2'], Na: ['NaCl', 'NaHCO3', 'NaF'], Mg: ['MgO'], Al: ['Al2O3'],
  Si: ['SiO2', 'SiC'], P: ['Ca5(PO4)3OH', 'LiFePO4'], S: ['CaSO4·2H2O', 'CaSO4', 'MoS2'],
  Ca: ['CaCO3', 'CaF2', 'Ca5(PO4)3OH', 'CaSO4·2H2O'], Cl: ['NaCl', 'KCl'], F: ['NaF', 'CaF2'],
  Fe: ['Fe2O3', 'Fe3O4', 'LiFePO4'], K: ['KCl', 'KIO3'], Li: ['LiFePO4', 'Li2CO3'],
};

export function normalize(value) {
  return String(value).toLocaleLowerCase('de').normalize('NFKD').replace(/\p{M}/gu, '').replaceAll('ß', 'ss').trim();
}

function prioritize(items, formulaOrder) {
  const order = new Map(formulaOrder.map((formula, index) => [formula, index]));
  return [...items].sort((left, right) => {
    const byPriority = (order.get(left.formula) ?? order.size) - (order.get(right.formula) ?? order.size);
    if (byPriority !== 0) return byPriority;
    const researchLast = Number(left.category === 'Forschung') - Number(right.category === 'Forschung');
    return researchLast || left.name.localeCompare(right.name, 'de');
  });
}

export const orderedCompounds = prioritize(compounds, catalogueOrder);
export const examplesByElement = new Map(elements.map(element => [
  element.symbol,
  prioritize(compounds.filter(compound => compound.elements.includes(element.symbol)), byElementOrder[element.symbol] ?? []),
]));

export function findElements(query, family, pool = elements) {
  const term = normalize(query);
  const candidates = family === 'all' ? pool : pool.filter(element => element.family === family);
  if (!term) return candidates;
  if (/^\d+$/.test(term)) return candidates.filter(element => element.n === Number(term));
  const exact = candidates.filter(element => normalize(element.symbol) === term || normalize(element.name) === term);
  if (exact.length) return exact;
  if (elements.some(element => normalize(element.symbol) === term || normalize(element.name) === term)) return [];
  return candidates.filter(element => [element.symbol, element.name, ...(elementAliases[element.symbol] ?? [])].some(value => normalize(value).includes(term)));
}

const compoundIndex = new Map(compounds.map(compound => {
  const names = compound.elements.map(symbol => elementBySymbol.get(symbol).name);
  const text = [compound.name, compound.formula, familiarNames[compound.formula] ?? '', compound.occurrence, compound.use, ...names].join(' ');
  return [compound.formula, normalize(text)];
}));

export function findCompounds(query, category, pool = orderedCompounds) {
  const term = normalize(query);
  const candidates = category === 'all' ? pool : pool.filter(compound => compound.category === category);
  if (!term) return candidates;
  const matchesIdentity = compound => normalize(compound.formula) === term || normalize(compound.name) === term;
  const exact = candidates.filter(compound => matchesIdentity(compound) || matchesIdentity(compoundByFormula.get(compound.formula)));
  if (exact.length) return exact;
  if (compounds.some(matchesIdentity)) return [];
  return candidates.filter(compound => {
    if (compoundByFormula.get(compound.formula) === compound) return compoundIndex.get(compound.formula).includes(term);
    const names = compound.elements.map(symbol => elementBySymbol.get(symbol).name);
    return normalize([compound.name, compound.formula, compoundByFormula.get(compound.formula).name, compound.occurrence, compound.use, ...names].join(' ')).includes(term);
  });
}
