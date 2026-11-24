// Die Auswahl bietet Beispiele für den jeweiligen Unterrichtsschwerpunkt.
export const schoolLevels = {
  '7': {
    title: 'Elemente im Alltag',
    focus: 'Du entdeckst, was Sauerstoff mit der Luft, Aluminium mit Küchenfolie und Natrium mit Kochsalz zu tun haben.',
    symbols: ['H', 'He', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'Si', 'S', 'Cl', 'Ca'],
    formulas: ['H2O', 'NaCl', 'CO2', 'CaCO3', 'C12H22O11'],
  },
  '8': {
    title: 'Elementfamilien und Elektronenschalen',
    focus: 'Du vergleichst die Außenschalen von Lithium, Natrium und Kalium und erklärst, warum die drei zu einer Elementfamilie gehören.',
    symbols: [
      'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg',
      'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Br', 'Kr', 'I',
    ],
    formulas: ['H2O', 'NaCl', 'KCl', 'NaF', 'MgO', 'CO2', 'SiO2'],
  },
  '9': {
    title: 'Ionen, Salze und Elektronenübertragung',
    focus: 'Du erklärst, wie Atome Elektronen abgeben oder aufnehmen und wie die Ladungen der Ionen die Formel eines Salzes bestimmen.',
    symbols: ['Li', 'C', 'O', 'F', 'Na', 'Mg', 'Al', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Br', 'Ag'],
    formulas: ['NaCl', 'KCl', 'MgO', 'CaF2', 'Al2O3', 'CaCO3', 'CaSO4', 'Fe2O3', 'ZnO', 'AgBr'],
  },
  '10': {
    title: 'Molekülbau und Polarität',
    focus: 'Du nutzt Elektronegativität und Molekülform, um zu erklären, warum Wasser ein Dipol ist und Kohlenstoffdioxid keinen Gesamtdipol besitzt.',
    symbols: ['H', 'Li', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Br', 'I'],
    formulas: ['H2O', 'CO2', 'NH3', 'CH4', 'HCl', 'C2H5OH', 'NaCl'],
  },
  '11': {
    title: 'Alkohole, Ester und Gleichgewichte',
    focus: 'Du vergleichst Elektronegativitäten, erklärst Molekülformen mit dem Elektronenpaarabstoßungsmodell und untersuchst das Gleichgewicht bei der Esterbildung.',
    symbols: [
      'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg',
      'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Cu', 'Br',
    ],
    formulas: ['CH4', 'C2H4', 'C2H5OH', 'CH3COOH', 'CH3COOC2H5', 'H2O', 'CO2', 'NH3', 'C6H12O6'],
  },
  '12-gk': {
    title: 'Säuren, Basen und Batterien',
    focus: 'Du erklärst eine Neutralisation durch Protonenübertragung und verfolgst den Weg der Elektronen in einer galvanischen Zelle.',
    symbols: ['H', 'Li', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Ag'],
    formulas: ['H2O', 'HCl', 'NaOH', 'CH3COOH', 'NH3', 'NaCl', 'NaHCO3', 'CuSO4·5H2O', 'LiFePO4'],
  },
  '12-lk': {
    title: 'Titrationen, Puffer und Elektrodenpotenziale',
    focus: 'Du deutest den Pufferbereich einer Titrationskurve und berechnest mit der Nernst-Gleichung, wie Ionenkonzentrationen ein Elektrodenpotenzial verändern.',
    symbols: [
      'H', 'Li', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'P', 'S', 'Cl',
      'K', 'Ca', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Br', 'Ag', 'Pt',
    ],
    formulas: [
      'H2O', 'HCl', 'NaOH', 'CH3COOH', 'NH3', 'NaHCO3', 'Na2CO3', 'C6H8O7',
      'CuSO4·5H2O', 'MnO2', 'Ni(OH)2', 'LiFePO4', 'AgBr',
    ],
  },
  '13-gk': {
    title: 'Vom Ethen zum Kunststoff',
    focus: 'Du verfolgst den Weg von Ethen zu Polyethylen und erklärst, wie die Kettenstruktur die Eigenschaften des Kunststoffs beeinflusst.',
    symbols: ['H', 'C', 'N', 'O', 'F', 'Al', 'Si', 'P', 'S', 'Cl', 'Ca', 'Ti', 'Fe', 'Ni', 'Cu', 'Br'],
    formulas: ['CH4', 'C2H4', '(C2H4)n', 'C2H5OH', 'CH3COOH', 'CH3COOC2H5', 'SiO2', 'TiO2'],
  },
  '13-lk': {
    title: 'Synthesewege, Katalyse und Werkstoffe',
    focus: 'Du vergleichst katalysierte Synthesewege und leitest aus Verzweigung und Vernetzung ab, wie sich Kunststoffe beim Erwärmen verhalten.',
    symbols: [
      'H', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl',
      'Ca', 'Ti', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Br', 'Zr', 'Pd', 'I', 'Pt',
    ],
    formulas: [
      'CH4', 'C2H2', 'C2H4', '(C2H4)n', 'C2H5OH', 'CH3COOH', 'CH3COOC2H5',
      'C6H12O6', 'SiO2', 'TiO2', 'SiC', 'ZrO2', 'PdCl2',
    ],
  },
};
