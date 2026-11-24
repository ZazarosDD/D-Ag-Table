// Phases refer to the discharge models in redox-cells.js.
// In aqueous equations H⁺ denotes a hydrated proton.
export const speciesInfo = {
  'Zn': { name: 'Metallisches Zink', phase: 's' },
  'Zn²⁺': { name: 'Zink-Ion', phase: 'aq' },
  'Cu²⁺': { name: 'Kupfer(II)-Ion', phase: 'aq' },
  'Cu': { name: 'Metallisches Kupfer', phase: 's' },
  'K⁺': { name: 'Kalium-Ion', phase: 'aq' },
  'NO₃⁻': { name: 'Nitrat-Ion', phase: 'aq' },
  'OH⁻': { name: 'Hydroxid-Ion', phase: 'aq' },
  'ZnO': { name: 'Zinkoxid', phase: 's' },
  'H₂O': { name: 'Wasser', phase: 'l' },
  'Ag₂O': { name: 'Silber(I)-oxid', phase: 's' },
  'Ag': { name: 'Metallisches Silber', phase: 's' },
  '[Zn(OH)₄]²⁻': { name: 'Zinkat-Ion', phase: 'aq' },
  'MnO₂': { name: 'Mangandioxid', phase: 's' },
  'MnOOH': { name: 'Mangan(III)-oxidhydroxid', phase: 's' },
  'Pb': { name: 'Metallisches Blei', phase: 's' },
  'PbO₂': { name: 'Blei(IV)-oxid', phase: 's' },
  'SO₄²⁻': { name: 'Sulfat-Ion', phase: 'aq' },
  'PbSO₄': { name: 'Blei(II)-sulfat', phase: 's' },
  'H⁺': { name: 'An Wasser gebundenes Proton', phase: 'aq' },
  'e⁻': { name: 'Elektron', phase: 'wire' },
};

// Only the Daniell model has a separate salt bridge with named spectator ions.
export const particleNotes = {
  daniell: {
    anion: 'NO₃⁻', cation: 'K⁺',
    transport: 'Aus der Salzbrücke wandern Nitrat-Ionen in die Zinklösung und Kalium-Ionen in die Kupferlösung. So gleichen sich die Ladungen in beiden Lösungen aus.',
    deposit: 'Ein Zinkatom geht als Zn²⁺ in Lösung. Gleichzeitig nimmt ein Cu²⁺-Ion zwei Elektronen auf. Das neue Kupferatom sitzt im Metallgitter der Kupferelektrode.',
  },
  silberoxid: {
    anion: null, cation: null,
    transport: 'An der Silberoxidseite entstehen Hydroxid-Ionen. An der Zinkseite werden Hydroxid-Ionen verbraucht. Ionen tragen die Ladung durch den feuchten Separator.',
    deposit: 'Aus einer Formeleinheit Silberoxid entstehen zwei Silberatome im Metall. Aus dem Zink entsteht festes Zinkoxid. Wasser und Hydroxid-Ionen kürzen sich in der Gesamtgleichung heraus.',
  },
  'alkali-mangan': {
    anion: null, cation: null,
    transport: 'Ionen können den feuchten Separator durchqueren. Am Mangandioxid entstehen Hydroxid-Ionen, an der Zinkseite werden sie verbraucht.',
    deposit: 'In dieser ersten Entladestufe geht Zink als Zinkat-Ion in Lösung. Aus zwei Formeleinheiten MnO₂ entstehen zwei Formeleinheiten festes MnOOH.',
  },
  bleiakku: {
    anion: null, cation: null,
    transport: 'Ionen bewegen sich durch die Schwefelsäure und die Poren des Separators. An beiden Elektroden wird Sulfat gebunden. H⁺ steht für an Wasser gebundene Protonen.',
    deposit: 'An beiden Elektroden entsteht festes Bleisulfat. Am Pluspol bildet sich außerdem Wasser. Beim Entladen sinkt der Säuregehalt.',
  },
};
