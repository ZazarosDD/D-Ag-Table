import { elements, orderedCompounds, examplesByElement, compoundByFormula } from './catalogue.js';
import { schoolLevels } from './school-levels.js';
import { introductoryCompounds } from './school-intro.js';

export const stageKeys = ['7', '8', '9', '10', '11', '12-gk', '12-lk', '13-gk', '13-lk', 'alle'];

export function schoolStage(key) {
  const all = key === 'alle';
  const level = schoolLevels[key];
  if (!all && !level) throw new Error('Unbekannte Jahrgangsansicht');
  const year = all ? 0 : parseInt(key, 10);
  const course = key.split('-')[1] || '';
  const symbols = new Set(all ? elements.map(e => e.symbol) : level.symbols);
  const selected = all ? orderedCompounds : level.formulas.map(formula => {
    const compound = compoundByFormula.get(formula);
    return year <= 8 ? { ...compound, ...introductoryCompounds[formula] } : compound;
  });
  const byFormula = new Map(selected.map(c => [c.formula, c]));
  return {
    key, all, year, course, symbols, byFormula,
    elements: elements.filter(e => symbols.has(e.symbol)), compounds: selected,
    label: all ? 'Gesamtansicht' : 'Klasse ' + year + (course ? ' · ' + course.toUpperCase() : ''),
    title: all ? 'Das vollständige Periodensystem' : level.title,
    focus: all ? 'Erkunde alle 118 Elemente mit ihren Steckbriefen und Verbindungen.' : level.focus,
    redox: all || year === 9 || year >= 11,
    en: all || year >= 10, radius: all || year >= 11, orbitals: all || course === 'lk',
  };
}

export function stageExamples(symbol, stage) {
  const examples = examplesByElement.get(symbol);
  if (stage.all) return examples;
  return examples.filter(c => stage.byFormula.has(c.formula)).map(c => stage.byFormula.get(c.formula));
}

export function mainGroup(element) {
  if (element.group === 1 || element.group === 2) return element.group;
  return element.group >= 13 ? element.group - 10 : null;
}
