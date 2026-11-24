// Potentials are tabulated as reductions against SHE, in volts at 25 °C.
// The two displayed half-reactions describe discharge.
export const redoxCells = [
  {
    id: 'daniell', name: 'Daniell-Element', context: 'Zink und Kupfer', type: 'Historische galvanische Zelle',
    use: 'Das Daniell-Element gehörte zu den ersten verlässlichen Stromquellen. Im Schulmodell lässt sich an zwei getrennten Halbzellen verfolgen, wie eine chemische Reaktion Strom liefert.',
    medium: 'Zinksalzlösung und Kupfer(II)-Salzlösung sind im Modell durch eine Salzbrücke mit Kaliumnitrat (KNO₃) verbunden.',
    inside: 'In der Salzbrücke wandern negative Ionen zur Zinkseite und positive Ionen zur Kupferseite. So gleichen sich Ladungen in beiden Lösungen aus.',
    negative: { material: 'Zink', label: 'Zn', equation: 'Zn → Zn²⁺ + 2 e⁻', potential: -0.76,
      explanation: 'Ein Zinkatom gibt zwei Elektronen ab. Das entstandene Zink-Ion geht in Lösung.' },
    positive: { material: 'Kupfer', label: 'Cu', equation: 'Cu²⁺ + 2 e⁻ → Cu', potential: 0.34,
      explanation: 'Ein Kupfer(II)-Ion nimmt zwei Elektronen auf. Ein Kupferatom lagert sich an der Elektrode ab.' },
    total: 'Zn + Cu²⁺ → Zn²⁺ + Cu', decimals: 2,
    sources: [
      { label: 'LEIFIchemie · Das Daniell-Element', url: 'https://www.leifichemie.de/redoxreaktionen-und-elektrochemie/einfuehrung-die-elektrochemie/versuche/das-daniell-element' },
      { label: 'OpenStax · Daniell-Element und Salzbrücke', url: 'https://openstax.org/books/chemistry-2e/pages/17-5-batteries-and-fuel-cells' },
      { label: 'OpenStax · Standardpotenziale von Zink und Kupfer', url: 'https://openstax.org/books/chemistry-2e/pages/l-standard-electrode-half-cell-potentials' },
    ],
  },
  {
    id: 'silberoxid', name: 'Silberoxid-Zink-Zelle', context: 'Knopfzelle für Uhren', type: 'Primärzelle',
    use: 'In vielen analogen Armbanduhren liefert eine kleine Silberoxid-Knopfzelle über lange Zeit eine nahezu gleichbleibende Spannung.',
    medium: 'Alkalischer Elektrolyt zwischen Zink und Silber(I)-oxid.',
    inside: 'Am Silberoxid entstehen Hydroxid-Ionen (OH⁻). Sie können durch den feuchten Separator zur Zinkseite gelangen und dort reagieren.',
    negative: { material: 'Zink', label: 'Zn', equation: 'Zn + 2 OH⁻ → ZnO + H₂O + 2 e⁻', potential: -1.260,
      explanation: 'Zink gibt Elektronen ab. Mit Hydroxid-Ionen entstehen Zinkoxid und Wasser.' },
    positive: { material: 'Silber(I)-oxid', label: 'Ag₂O', equation: 'Ag₂O + H₂O + 2 e⁻ → 2 Ag + 2 OH⁻', potential: 0.342,
      explanation: 'Das Silber im Silberoxid nimmt Elektronen auf. Zurück bleibt metallisches Silber.' },
    total: 'Zn + Ag₂O → ZnO + 2 Ag', decimals: 3, nominal: '1,55 V',
    sources: [
      { label: 'University of California San Diego · Teilreaktionen und Standardpotenziale, Tabelle 4', url: 'https://escholarship.org/content/qt22g780fz/qt22g780fz.pdf#page=34' },
      { label: 'Jauch · Silberoxid-Uhrenbatterien und Nennspannung', url: 'https://www.jauch.com/en-GB/products/battery_technology/getPrm/batteries/watch%20batteries/' },
    ],
  },
  {
    id: 'alkali-mangan', name: 'Alkali-Mangan-Zelle', context: 'AA- und AAA-Batterie', type: 'Primärzelle',
    use: 'Viele Fernbedienungen und Taschenlampen verwenden Alkali-Mangan-Batterien. Hier siehst du die erste Entladestufe im Modell mit gelöstem Zinkat.',
    medium: 'Kalilauge zwischen Zink und Mangandioxid.',
    inside: 'Der Separator hält die Elektroden getrennt und lässt Ionen passieren. Am Mangandioxid entstehen Hydroxid-Ionen, an der Zinkseite werden sie verbraucht.',
    negative: { material: 'Zink', label: 'Zn', equation: 'Zn + 4 OH⁻ → [Zn(OH)₄]²⁻ + 2 e⁻', potential: -1.199,
      explanation: 'Zink gibt zwei Elektronen ab und bildet mit Hydroxid-Ionen gelöstes Zinkat.' },
    positive: { material: 'Mangandioxid', label: 'MnO₂', equation: '2 MnO₂ + 2 H₂O + 2 e⁻ → 2 MnOOH + 2 OH⁻', potential: 0.250,
      explanation: 'Jedes der beiden Manganatome nimmt formal ein Elektron auf. Seine Oxidationszahl sinkt von +IV auf +III.' },
    total: 'Zn + 2 MnO₂ + 2 H₂O + 2 OH⁻ → [Zn(OH)₄]²⁻ + 2 MnOOH', decimals: 3, nominal: '1,5 V',
    sources: [
      { label: 'Batteries · Alkalische Zn–MnO₂-Zelle, Abschnitt 2.1, Gleichungen 1 und 2', url: 'https://www.mdpi.com/2313-0105/9/6/311' },
      { label: 'Energizer · Nennspannung einer AA-Alkalibatterie', url: 'https://data.energizer.com/pdfs/E91NA0426.pdf' },
    ],
  },
  {
    id: 'bleiakku', name: 'Bleiakku', context: 'Starterbatterie im Auto', type: 'Wiederaufladbarer Akku',
    use: 'Eine 12-V-Starterbatterie im Auto enthält sechs Bleizellen in Reihe. Hier ist die Entladung einer einzelnen Zelle dargestellt. Beim Laden laufen die Reaktionen in umgekehrter Richtung ab.',
    medium: 'Schwefelsäure zwischen Blei und Blei(IV)-oxid.',
    inside: 'Die Ionen in der Schwefelsäure schließen den inneren Stromkreis. Beim Entladen entsteht an beiden Elektroden Bleisulfat, und der Säuregehalt sinkt.',
    negative: { material: 'Blei', label: 'Pb', equation: 'Pb + SO₄²⁻ → PbSO₄ + 2 e⁻', potential: -0.356,
      explanation: 'Metallisches Blei gibt Elektronen ab. Mit Sulfat bildet es festes Blei(II)-sulfat.' },
    positive: { material: 'Blei(IV)-oxid', label: 'PbO₂', equation: 'PbO₂ + SO₄²⁻ + 4 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O', potential: 1.685,
      explanation: 'Blei im Oxid nimmt Elektronen auf. Seine Oxidationszahl sinkt von +IV auf +II.' },
    total: 'Pb + PbO₂ + 2 SO₄²⁻ + 4 H⁺ → 2 PbSO₄ + 2 H₂O', decimals: 3, nominal: '2,0 V',
    sources: [
      { label: 'MIT OpenCourseWare · Bleiakku, Gleichungen 16 bis 18 und 23 bis 24', url: 'https://ocw.mit.edu/courses/10-626-electrochemical-energy-systems-spring-2014/e87232109522238685488ab736f21e4d_MIT10_626S14_S11lec09.pdf#page=5' },
      { label: 'Universität Leipzig · Bleiakkumulator und Nennspannung', url: 'https://home.uni-leipzig.de/energy/energie-grundlagen/10.html' },
    ],
  },
];

export function cellsForStage(stage) {
  if (!stage.redox) return [];
  if (stage.year === 9 || stage.year === 11) return redoxCells.slice(0, 2);
  return redoxCells;
}

export function cellForStage(stage, id) {
  const available = cellsForStage(stage);
  return available.find(cell => cell.id === id) || available[0];
}
