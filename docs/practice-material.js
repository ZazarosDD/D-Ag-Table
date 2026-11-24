function element(label, id) {
  return { label, kind: 'element', id };
}

function compound(label, id) {
  return { label, kind: 'verbindung', id };
}

export const detectiveCases = [
  {
    id: 'schale-und-stein', title: 'Ein Ei und ein Stück Kalkstein', years: [7],
    question: 'Eierschalen und Kalkstein bestehen zum größten Teil aus derselben Verbindung. Welche ist das?',
    choices: [element('Calcium', 'Ca'), compound('Calciumcarbonat', 'CaCO3'), compound('Kochsalz', 'NaCl')],
    answer: 'CaCO3',
    hints: ['Suche im Calcium-Steckbrief nach Eierschalen.', 'Lies bei den Verbindungen, welcher Stoff auch in natürlicher Kreide vorkommt.'],
    evidence: 'Eierschalen enthalten vor allem Calciumcarbonat (CaCO₃). Im Steckbrief von Calciumcarbonat findest du Kalkstein und Kreide als weitere Beispiele.',
  },
  {
    id: 'schrift-auf-papier', title: 'Eine graue Spur', years: [7, 8],
    question: 'Graphit aus der Bleistiftmine hinterlässt eine graue Spur. Aus welchem Element bestehen die Graphitschichten?',
    choices: [element('Silicium', 'Si'), element('Aluminium', 'Al'), element('Kohlenstoff', 'C')],
    answer: 'C',
    hints: ['Schau nach, in welchem Steckbrief eine Bleistiftmine vorkommt.', 'Dasselbe Element bildet auch Diamant.'],
    evidence: 'Graphit ist eine Form von Kohlenstoff. Beim Schreiben lösen sich dünne Graphitschichten und bleiben auf dem Papier.',
  },
  {
    id: 'hundert-liter-luft', title: 'Das häufigste Gas', years: [7, 8],
    question: 'Von 100 Litern trockener Luft entfallen rund 78 Liter auf ein Gas. Welches?',
    choices: [element('Stickstoff', 'N'), element('Sauerstoff', 'O'), element('Helium', 'He')],
    answer: 'N',
    hints: ['Vergleiche bei den drei Gasen die Angaben zur Luft.', 'Der Sauerstoffanteil ist mit etwa einem Fünftel kleiner.'],
    evidence: 'Stickstoff hat mit rund 78 von 100 Litern den größten Volumenanteil. Das Elementsymbol ist N. In der Luft liegt Stickstoff als N₂ vor.',
  },
  {
    id: 'raetsel-glashuette', title: 'Der Sand in der Glashütte', years: [8],
    question: 'Eine Glashütte verwendet Quarzsand für Fensterscheiben. Welche Verbindung bildet die Quarzkörner?',
    choices: [element('Silicium', 'Si'), compound('Magnesiumoxid', 'MgO'), compound('Siliciumdioxid', 'SiO2')],
    answer: 'SiO2',
    hints: ['Suche in den Steckbriefen nach dem Mineral Quarz.', 'Ein Baustein trägt das Symbol Si, der andere das Symbol O.'],
    evidence: 'Quarz besteht aus Siliciumdioxid (SiO₂). Der Steckbrief nennt Quarzsand als Rohstoff für Fensterglas.',
  },
  {
    id: 'tube-im-bad', title: 'Ein Stoff in der Zahnpasta', years: [8],
    question: 'Auf einer Zahnpastatube steht „mit Fluorid“. Welcher der drei Stoffe kann dieses Fluorid liefern?',
    choices: [compound('Natriumfluorid', 'NaF'), element('Fluor', 'F'), compound('Kaliumchlorid', 'KCl')],
    answer: 'NaF',
    hints: ['Suche beim Element Fluor nach Zahnpasta.', 'Der gesuchte Stoff ist eine Verbindung mit Natrium.'],
    evidence: 'Einige Zahnpasten enthalten Natriumfluorid (NaF). Das Fluorid aus diesem Salz hilft, die Zähne vor Karies zu schützen.',
  },
  {
    id: 'rot-an-der-hoehlenwand', title: 'Rot auf der Höhlenwand', years: [9],
    question: 'Roter Ocker in einer Höhlenmalerei enthält das Mineral Hämatit. Welches Oxid gibt diesem Pigment seine rote Farbe?',
    choices: [compound('Aluminiumoxid', 'Al2O3'), compound('Eisen(III)-oxid', 'Fe2O3'), compound('Zinkoxid', 'ZnO')],
    answer: 'Fe2O3',
    hints: ['Suche in den Steckbriefen nach Hämatit oder Ocker.', 'Das Metall in Hämatit hat das Symbol Fe.'],
    evidence: 'Hämatit besteht aus Eisen(III)-oxid (Fe₂O₃). Sein feines Pulver färbt roten Ocker.',
  },
  {
    id: 'spur-auf-dem-film', title: 'Das verborgene Foto', years: [9],
    question: 'Licht verändert kleine Kristalle in einem analogen Fotofilm. Welches Salz passt zu dieser Beobachtung?',
    choices: [element('Silber', 'Ag'), compound('Calciumfluorid', 'CaF2'), compound('Silberbromid', 'AgBr')],
    answer: 'AgBr',
    hints: ['Welche der drei Substanzen findest du bei den lichtempfindlichen Stoffen?', 'Die Kristalle enthalten Silber und ein Halogen.'],
    evidence: 'Viele Fotofilme enthalten lichtempfindliche Silberbromidkristalle (AgBr). Beim Entwickeln wird das durch die Belichtung entstandene Bild sichtbar.',
  },
  {
    id: 'kristall-im-objektiv', title: 'Ein Kristall im Objektiv', years: [9],
    question: 'Farbloser Fluorit eignet sich für besondere Kameralinsen. Aus welchem Salz besteht dieses Mineral?',
    choices: [compound('Calciumfluorid', 'CaF2'), compound('Calciumcarbonat', 'CaCO3'), compound('Natriumchlorid', 'NaCl')],
    answer: 'CaF2',
    hints: ['Suche im Verbindungskatalog nach dem Wort Fluorit.', 'Das Salz enthält Calcium-Ionen und Fluorid-Ionen.'],
    evidence: 'Fluorit ist der Mineralname für Calciumfluorid (CaF₂). Der Steckbrief nennt reine Kristalle als Linsenmaterial.',
  },
  {
    id: 'gas-in-der-heizung', title: 'Wärme aus Erdgas', years: [10, 11],
    question: 'Der Hauptbestandteil von Erdgas hat ein C-Atom und vier H-Atome pro Molekül. Welcher Steckbrief passt?',
    choices: [compound('Methan', 'CH4'), compound('Ammoniak', 'NH3'), compound('Kohlenstoffdioxid', 'CO2')],
    answer: 'CH4',
    hints: ['Suche bei den drei Gasen nach Erdgas.', 'Prüfe, bei welcher Formel die 4 hinter dem H steht.'],
    evidence: 'Methan (CH₄) ist der Hauptbestandteil von Erdgas. Die vier H-Atome eines Moleküls sind an ein C-Atom gebunden.',
  },
  {
    id: 'stickstoff-aufs-feld', title: 'Vom Gas zum Dünger', years: [10, 11],
    question: 'Beim Abbau stickstoffhaltiger Pflanzenreste kann ein Gas entstehen. Dasselbe Gas ist ein Rohstoff für Stickstoffdünger. Welches ist es?',
    choices: [compound('Wasser', 'H2O'), compound('Ammoniak', 'NH3'), compound('Methan', 'CH4')],
    answer: 'NH3',
    hints: ['Welche Formel enthält Stickstoff?', 'Ein Molekül des gesuchten Gases enthält drei H-Atome.'],
    evidence: 'Ammoniak (NH₃) kann beim Abbau stickstoffhaltiger Pflanzenreste entstehen. In der Industrie liefert es den Stickstoff für viele Düngemittel.',
  },
  {
    id: 'duft-im-flakon', title: 'Das Lösungsmittel im Flakon', years: [10, 11],
    question: 'Hefe bildet bei der Gärung einen Alkohol. In Parfüm löst er Duftstoffe. Welcher Stoff ist das?',
    choices: [compound('Wasser', 'H2O'), compound('Methan', 'CH4'), compound('Ethanol', 'C2H5OH')],
    answer: 'C2H5OH',
    hints: ['Suche in den Steckbriefen nach Gärung und Parfüm.', 'Sein Molekül besitzt eine OH-Gruppe an einer Kette aus zwei C-Atomen.'],
    evidence: 'Bei der alkoholischen Gärung entsteht Ethanol (C₂H₅OH). Es dient in Parfüm als Lösungsmittel für Duftstoffe.',
  },
  {
    id: 'reifende-bananen', title: 'Die grüne Bananenlieferung', years: [11, 13],
    question: 'Reife Früchte geben ein Gas ab. Im Obsthandel regt es grün geerntete Bananen zum Nachreifen an. Welches Gas ist gemeint?',
    choices: [compound('Ethen', 'C2H4'), compound('Methan', 'CH4'), compound('Ethanol', 'C2H5OH')],
    answer: 'C2H4',
    hints: ['Suche nach einem Botenstoff von Pflanzen.', 'Das Molekül besteht aus zwei C-Atomen und vier H-Atomen.'],
    evidence: 'Ethen (C₂H₄) wirkt als Botenstoff in Pflanzen. Der Obsthandel nutzt es, damit Bananen nach der Ernte gleichmäßig nachreifen.',
  },
  {
    id: 'blaues-galvanikbad', title: 'Blaue Kristalle in der Werkstatt', years: [12],
    question: 'Ein blaues Salz liefert in Wasser die Metallionen für einen kupferfarbenen Überzug. Welches Salz ist der Ausgangsstoff?',
    choices: [compound('Natriumhydroxid', 'NaOH'), compound('Kupfer(II)-sulfat-Pentahydrat', 'CuSO4·5H2O'), compound('Lithiumeisenphosphat', 'LiFePO4')],
    answer: 'CuSO4·5H2O',
    hints: ['Das Salz enthält Kupfer(II)-Ionen.', 'Zu einer Formeleinheit des Salzes gehören fünf Wassermoleküle im Kristall.'],
    evidence: 'Das blaue Kupfer(II)-sulfat-Pentahydrat (CuSO₄·5H₂O) liefert Cu²⁺-Ionen. Beim Verkupfern nehmen sie Elektronen auf. Eine Schicht aus metallischem Kupfer entsteht.',
  },
  {
    id: 'elektrode-im-e-auto', title: 'In der Elektrode eines E-Autos', years: [12],
    question: 'Beim Entladen eines Autoakkus nimmt eine Elektrode aus Eisenphosphat Lithium-Ionen und Elektronen auf. Welcher Stoff entsteht dabei?',
    choices: [compound('Kupfer(II)-sulfat-Pentahydrat', 'CuSO4·5H2O'), compound('Natriumhydrogencarbonat', 'NaHCO3'), compound('Lithiumeisenphosphat', 'LiFePO4')],
    answer: 'LiFePO4',
    hints: ['Suche einen Stoff, in dessen Formel Li und Fe vorkommen.', 'Die Phosphatgruppe PO₄ bleibt im Elektrodenmaterial erhalten.'],
    evidence: 'An der positiven Elektrode entsteht Lithiumeisenphosphat. Im vereinfachten Modell gilt FePO₄ + Li⁺ + e⁻ → LiFePO₄. Beim Laden können Lithium-Ionen das Material wieder verlassen.',
  },
  {
    id: 'blaeschen-im-teig', title: 'Gasbläschen im Teig', years: [12],
    question: 'Ein Backpulver enthält eine Säure und ein Salz. Welches Salz liefert den Kohlenstoff für die CO₂-Bläschen im feuchten Teig?',
    choices: [compound('Natriumhydrogencarbonat', 'NaHCO3'), compound('Natriumhydroxid', 'NaOH'), compound('Essigsäure', 'CH3COOH')],
    answer: 'NaHCO3',
    hints: ['Suche nach dem Namen Natron.', 'Das Anion des Salzes ist Hydrogencarbonat (HCO₃⁻).'],
    evidence: 'Natriumhydrogencarbonat (NaHCO₃) heißt auch Natron. Das Hydrogencarbonat reagiert mit der Säure. In Wasser lautet die Bilanz HCO₃⁻ + H₃O⁺ → CO₂ + 2 H₂O.',
  },
  {
    id: 'duenner-weisser-anstrich', title: 'Die deckende Wandfarbe', years: [13],
    question: 'Eine weiße Wandfarbe deckt einen dunklen Untergrund ab. Ihr Pigment kommt auch als Mineral Rutil vor. Welcher Stoff passt?',
    choices: [compound('Siliciumdioxid', 'SiO2'), compound('Titandioxid', 'TiO2'), compound('Polyethylen', '(C2H4)n')],
    answer: 'TiO2',
    hints: ['Das Pigment ist ein Metalloxid.', 'Schau beim Element Titan nach Rutil.'],
    evidence: 'Rutil ist eine Mineralform von Titandioxid (TiO₂). Im Anstrich streuen die Pigmentteilchen sichtbares Licht und sorgen für Deckkraft.',
  },
  {
    id: 'folie-und-trinkwasserrohr', title: 'Folie und Trinkwasserrohr', years: [13],
    question: 'Bei der Herstellung von Folien und Rohren wird ein Kunststoff aus Ethen verwendet. Zu welchem Material gehören die fertigen Ketten?',
    choices: [compound('Ethen', 'C2H4'), compound('Ethylacetat', 'CH3COOC2H5'), compound('Polyethylen', '(C2H4)n')],
    answer: '(C2H4)n',
    hints: ['Suche einen Stoff mit langen Molekülketten.', 'In seiner Formel zeigt ein n, dass sich ein Baustein oft wiederholt.'],
    evidence: 'Polyethylen (PE) entsteht aus Ethen. In der fertigen Kette wiederholt sich –CH₂–CH₂–. Je nach Kettenstruktur eignet sich PE für weiche Folien oder steifere Rohre.',
  },
];

export const worksheetTasks = [
  {
    id: '7-kalk-bausteine', years: [7], subject: 'Calciumcarbonat',
    prompt: 'Auf einer Karte steht Ca, auf einer anderen CaCO₃. Welche Karte passt zum Kalk in einer Eierschale? Lies ab, welche Elemente er enthält.',
    solution: 'CaCO₃ steht für Calciumcarbonat, den Hauptbestandteil der Eierschale. Die Formel nennt Calcium (Ca), Kohlenstoff (C) und Sauerstoff (O). Ca allein ist das Zeichen für Calcium.',
  },
  {
    id: '7-kalk-weg', years: [7], subject: 'Calciumcarbonat',
    prompt: 'Ordne Kalkstein, Beton und Zement vom Rohstoff bis zur fertigen Betonwand. Wozu braucht man dabei den Zement?',
    solution: 'Kalkstein liefert Calciumcarbonat für die Herstellung von Zement. Im frischen Beton reagiert der Zement mit Wasser. Dabei bindet er Sand und Kies zu einem festen Baustoff.',
  },
  {
    id: '7-luftprobe', years: [7], subject: 'Stickstoff',
    prompt: '100 Liter trockene Luft enthalten rund 78 Liter Stickstoff. Wie viel Stickstoff entfällt bei gleichem Druck und gleicher Temperatur auf 50 Liter Luft?',
    solution: 'Der Anteil bleibt bei rund 78 Prozent. In der halb so großen Luftprobe stecken deshalb rund 39 Liter Stickstoff (0,78 · 50 L = 39 L).',
  },
  {
    id: '7-luft-bestandteile', years: [7], subject: 'Stickstoff',
    prompt: 'Von 100 Litern trockener Luft sind rund 78 Liter Stickstoff und 21 Liter Sauerstoff. Wie groß ist der Rest? Erkläre mit diesen Zahlen, warum Luft ein Gemisch ist.',
    solution: '100 L − 78 L − 21 L = rund 1 L. Trockene Luft enthält mehrere Gase. Der größte Anteil ist Stickstoff, der zweitgrößte Sauerstoff. Im Rest stecken zum Beispiel Argon und Kohlenstoffdioxid.',
  },
  {
    id: '7-wasser-symbol', years: [7], subject: 'Wasser',
    prompt: 'Lies die Formel H₂O. Wie viele Atome welcher Sorte gehören zu einem Wassermolekül?',
    solution: 'Die 2 hinter H steht für zwei Wasserstoffatome. Hinter O steht keine Zahl. Das bedeutet ein Sauerstoffatom. Ein Wassermolekül besteht also aus drei Atomen.',
  },
  {
    id: '7-wasser-zustaende', years: [7], subject: 'Wasser',
    prompt: 'Ein Eiswürfel schmilzt. Später verdunstet das Wasser. Nenne den Zustand des Wassers vor und nach jeder Veränderung. Welche Formel gilt jeweils?',
    solution: 'Beim Schmelzen wird festes Eis zu flüssigem Wasser. Beim Verdunsten wird daraus gasförmiger Wasserdampf. Die Wassermoleküle behalten in allen drei Zuständen die Formel H₂O.',
  },
  {
    id: '8-natrium-lesen', years: [8], subject: 'Natrium',
    prompt: 'Ein neutrales Natriumatom hat die Schalenbesetzung 2 | 8 | 1. Welche Periode und welche Hauptgruppe kannst du daraus ablesen?',
    solution: 'Drei besetzte Schalen ergeben Periode 3. Ein Elektron auf der äußeren Schale ergibt bei Natrium die 1. Hauptgruppe.',
  },
  {
    id: '8-kalium-prognose', years: [8], subject: 'Kalium',
    prompt: 'Kalium steht in Periode 4, in derselben Hauptgruppe wie Natrium (2 | 8 | 1). Wie viele Schalen sind beim neutralen Kaliumatom besetzt? Wie viele Elektronen sitzen außen?',
    solution: 'Die 4. Periode steht für vier besetzte Schalen. Wie Natrium hat Kalium ein Außenelektron. Zur Kontrolle ergibt sich die Verteilung 2 | 8 | 8 | 1.',
  },
  {
    id: '8-chlor-aussen', years: [8], subject: 'Chlor',
    prompt: 'Chlor steht in Periode 3 und Hauptgruppe 7. Innen sitzen 2 und 8 Elektronen. Ergänze die dritte Schale und berechne die Elektronenzahl des neutralen Atoms.',
    solution: 'Die 7. Hauptgruppe liefert sieben Außenelektronen. Die Schalenbesetzung ist 2 | 8 | 7. Insgesamt sind es 2 + 8 + 7 = 17 Elektronen.',
  },
  {
    id: '8-chlor-verwandt', years: [8], subject: 'Chlor',
    prompt: 'Fluor hat die Schalenbesetzung 2 | 7, Chlor 2 | 8 | 7. Woran erkennst du die gemeinsame Familie und die unterschiedlichen Perioden?',
    solution: 'Bei beiden sitzen sieben Elektronen außen. Beide gehören zu den Halogenen. Fluor hat zwei besetzte Schalen (Periode 2), Chlor hat drei (Periode 3).',
  },
  {
    id: '8-natrium-nachbar', years: [8], subject: 'Natrium',
    prompt: 'Natrium hat die Ordnungszahl 11 und die Schalenbesetzung 2 | 8 | 1. Magnesium steht direkt rechts daneben. Leite Ordnungszahl und Schalenbesetzung für das neutrale Magnesiumatom ab.',
    solution: 'Die Ordnungszahl steigt auf 12. Ein neutrales Magnesiumatom besitzt zwölf Protonen und zwölf Elektronen. Das zusätzliche Elektron kommt auf die dritte Schale. Die Besetzung lautet 2 | 8 | 2.',
  },
  {
    id: '8-helium-schale', years: [8], subject: 'Helium',
    prompt: 'Vergleiche Helium (2) mit Neon (2 | 8). Warum gehört auch Helium mit nur zwei Außenelektronen zu den Edelgasen?',
    solution: 'Heliums einzige Schale ist die erste. In sie passen höchstens zwei Elektronen. Bei Neon ist die zweite Schale mit acht Elektronen voll. Beide Edelgase haben damit eine volle Außenschale.',
  },
  {
    id: '9-magnesium-ion', years: [9], subject: 'Magnesium',
    prompt: 'Ein neutrales Mg-Atom hat zwölf Protonen und zwölf Elektronen. Es gibt zwei Elektronen ab. Gib die Elektronenzahl des Ions an und schreibe die Teilgleichung.',
    solution: 'Zwölf Protonen und zehn Elektronen ergeben die Ladung 2+. Bei der Oxidation gilt Mg → Mg²⁺ + 2 e⁻.',
  },
  {
    id: '9-magnesium-chlorid', years: [9], subject: 'Magnesium',
    prompt: 'Wie viele Cl⁻-Ionen gleichen die Ladung eines Mg²⁺-Ions aus? Leite die Verhältnisformel für Magnesiumchlorid ab.',
    solution: 'Ein Mg²⁺-Ion und zwei Cl⁻-Ionen ergeben die Ladungssumme (+2) + 2 · (−1) = 0. Im Ionengitter ist das kleinste Zahlenverhältnis 1 zu 2. Die Formel lautet MgCl₂.',
  },
  {
    id: '9-aluminiumoxid', years: [9], subject: 'Aluminiumoxid',
    prompt: 'In Aluminiumoxid kommen Al³⁺ und O²⁻ vor. Bestimme das kleinste Zahlenverhältnis mit Ladungssumme null und schreibe die Salzformel.',
    solution: 'Zwei Al³⁺-Ionen liefern zusammen +6, drei O²⁻-Ionen zusammen −6. Die Ladungen gleichen sich aus. Das Verhältnis 2 zu 3 ergibt Al₂O₃.',
  },
  {
    id: '9-kupfer-elektronen', years: [9], subject: 'Kupfer',
    prompt: 'Aus einem gelösten Cu²⁺-Ion wird ein Kupferatom. Auf welche Seite der Teilgleichung gehören die Elektronen? Benenne den Vorgang.',
    solution: 'Cu²⁺ + 2 e⁻ → Cu. Das Ion nimmt zwei Elektronen auf. Diese Elektronenaufnahme heißt Reduktion.',
  },
  {
    id: '9-kupfer-zink', years: [9], subject: 'Kupfer',
    prompt: 'Aus Zink und gelösten Cu²⁺-Ionen entstehen Zn²⁺-Ionen und Kupfer. Schreibe beide Teilgleichungen und kennzeichne den Elektronenspender.',
    solution: 'Das Zinkatom ist der Elektronenspender. Bei der Oxidation gilt Zn → Zn²⁺ + 2 e⁻. Das Cu²⁺-Ion nimmt die beiden Elektronen auf. Bei der Reduktion gilt Cu²⁺ + 2 e⁻ → Cu.',
  },
  {
    id: '9-calciumfluorid', years: [9], subject: 'Calciumfluorid',
    prompt: 'Eine Lerngruppe schlägt für das Salz aus Ca²⁺ und F⁻ die Formel CaF vor. Prüfe die Ladungssumme und gib die passende Verhältnisformel an.',
    solution: 'Mit je einem Ion wäre die Summe (+2) + (−1) = +1. Zwei Fluorid-Ionen gleichen die Ladung eines Calcium-Ions aus. Calciumfluorid hat die Formel CaF₂.',
  },
  {
    id: '10-wasser-lewis', years: [10, 11], subject: 'Wasser',
    prompt: 'Zeichne die Lewis-Formel von H₂O. Zeige, wie sich die insgesamt acht Valenzelektronen auf Bindungen und freie Paare verteilen.',
    solution: 'H–O–H hat zwei Einfachbindungen und am O-Atom zwei freie Elektronenpaare. Vier Elektronen liegen in den beiden Bindungen, vier in den freien Paaren.',
  },
  {
    id: '10-wasser-dipol', years: [10, 11], subject: 'Wasser',
    prompt: 'Skizziere ein gewinkeltes Wassermolekül. Sauerstoff zieht die Bindungselektronen stärker an als Wasserstoff. Markiere die Teilladungen. Warum ist Wasser ein Dipol?',
    solution: 'Am O-Atom steht δ⁻, an jedem H-Atom δ⁺. Wegen der gewinkelten Form heben sich die beiden Bindungsdipole nicht auf. Das Molekül hat eine negative Seite beim Sauerstoff und eine positive Seite bei den Wasserstoffatomen.',
  },
  {
    id: '10-co2-lewis', years: [10], subject: 'Kohlenstoffdioxid',
    prompt: 'CO₂ besitzt insgesamt 16 Valenzelektronen. Zeichne eine Lewis-Formel, in der alle drei Atome ein Oktett erreichen. Trage auch die freien Elektronenpaare ein.',
    solution: 'In O=C=O verbindet je eine Doppelbindung das C-Atom mit einem O-Atom. Jedes O trägt zwei freie Elektronenpaare. Damit stecken acht Elektronen in den Bindungen und acht in den freien Paaren.',
  },
  {
    id: '10-co2-vergleich', years: [10], subject: 'Kohlenstoffdioxid',
    prompt: 'Beide C=O-Bindungen in CO₂ sind polar. Wie erklärt die lineare Anordnung O=C=O, dass das ganze Molekül kein Dipolmoment hat?',
    solution: 'Beide O-Atome ziehen die Bindungselektronen gleich stark zu sich. Die beiden gleich großen Bindungsdipole zeigen in entgegengesetzte Richtungen. Zusammen ergeben sie null.',
  },
  {
    id: '10-methan-lewis', years: [10], subject: 'Methan',
    prompt: 'Zeichne die Lewis-Formel von CH₄. Zähle die Bindungselektronen, die zur Außenschale von C gehören, und anschließend die an einem einzelnen H.',
    solution: 'C bildet vier Einfachbindungen zu vier H-Atomen. C zählt alle vier gemeinsamen Elektronenpaare, also acht Elektronen. Jedes H zählt das eine Paar seiner Bindung, also zwei Elektronen.',
  },
  {
    id: '11-ammoniak-prognose', years: [11], subject: 'Ammoniak',
    prompt: 'Leite aus der Lewis-Formel von NH₃ die Molekülform ab. Berücksichtige das freie Elektronenpaar am Stickstoff.',
    solution: 'Drei N–H-Bindungen und ein freies Paar ergeben am N vier Elektronenpaarbereiche. Diese liegen annähernd tetraedrisch. Die Atomkerne bilden eine dreiseitige Pyramide mit N an der Spitze.',
  },
  {
    id: '11-kohlenstoffdioxid-prognose', years: [11], subject: 'Kohlenstoffdioxid',
    prompt: 'Welchen O–C–O-Winkel erwartest du für O=C=O? Begründe ihn mit der Zahl der Elektronenpaarbereiche am C-Atom.',
    solution: 'Jede Doppelbindung zählt im Elektronenpaarabstoßungsmodell als ein Bereich. Am C liegen zwei solcher Bereiche und kein freies Elektronenpaar. Die Bereiche richten sich einander gegenüber aus. Der Winkel beträgt 180°.',
  },
  {
    id: '11-ethanol-gruppe', years: [11], subject: 'Ethanol',
    prompt: 'Skizziere eine mögliche Wasserstoffbrücke zwischen Ethanol (CH₃–CH₂–OH) und Wasser. Markiere die funktionelle Gruppe des Ethanols.',
    solution: 'Die funktionelle Gruppe ist –OH. Eine mögliche Brücke ist CH₃CH₂–O–H···OH₂. Die Punkte verbinden das partiell positive H der Hydroxygruppe mit dem O des Wassers, das ein freies Elektronenpaar besitzt. Auch Wasser kann das H für eine solche Brücke bereitstellen.',
  },
  {
    id: '11-ethylacetat-gleichgewicht', years: [11], subject: 'Ethylacetat',
    prompt: 'Essigsäure und Ethanol bilden Ethylacetat und Wasser. Schreibe die Gleichung. Dem Gemisch im Gleichgewicht wird bei gleicher Temperatur etwas Wasser entzogen. Welche Reaktionsrichtung wird begünstigt?',
    solution: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Der Wasserentzug begünstigt die Hinreaktion. Essigsäure und Ethanol reagieren zu weiterem Ester und Wasser, bis sich ein neues Gleichgewicht einstellt.',
  },
  {
    id: '12-kupfer-halbzellen', years: [12, 13], subject: 'Kupfer',
    prompt: 'Ein Daniell-Element aus Zn/Zn²⁺ und Cu/Cu²⁺ entlädt sich. Formuliere beide Teilgleichungen und beschreibe den Elektronenweg im äußeren Stromkreis.',
    solution: 'Am Minuspol (Zinkanode) gilt Zn → Zn²⁺ + 2 e⁻. Die Elektronen fließen im äußeren Leiter zum Pluspol (Kupferkathode). Dort nimmt ein gelöstes Cu²⁺-Ion zwei Elektronen auf, und Kupfer scheidet sich ab. Cu²⁺ + 2 e⁻ → Cu.',
  },
  {
    id: '12-kupfer-spannung', years: [12, 13], subject: 'Kupfer',
    prompt: 'Die Standard-Reduktionspotenziale sind −0,76 V für Zn²⁺/Zn und +0,34 V für Cu²⁺/Cu. Welcher Pol ist beim Entladen positiv? Berechne die Standardzellspannung.',
    solution: 'Cu²⁺/Cu hat das höhere Standard-Reduktionspotenzial. Die Kupferelektrode ist der Pluspol. E°(Zelle) = E°(Kathode) − E°(Anode) = 0,34 V − (−0,76 V) = 1,10 V.',
  },
  {
    id: '12-silber-elektronen', years: [12], subject: 'Silber',
    prompt: 'Ag⁺/Ag (+0,80 V) und Cu²⁺/Cu (+0,34 V) bilden eine galvanische Zelle. Formuliere die Gesamtgleichung und berechne die Spannung unter Standardbedingungen.',
    solution: 'Zwei Ag⁺-Ionen nehmen je ein Elektron auf. Ein Cu-Atom gibt beide ab. Die Bilanz lautet Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag. Die Standardzellspannung ist 0,80 V − 0,34 V = 0,46 V. Der Faktor 2 zählt Silberionen. Das Potenzial bleibt +0,80 V.',
  },
  {
    id: '12-chlorwasserstoff-proton', years: [12], subject: 'Chlorwasserstoff',
    prompt: 'Chlorwasserstoff reagiert mit Wasser. Schreibe die Gleichung und kennzeichne für diese Reaktion den Protonendonator und den Protonenakzeptor.',
    solution: 'HCl + H₂O → H₃O⁺ + Cl⁻. HCl gibt ein Proton ab und ist der Donator. Wasser nimmt das Proton auf und ist der Akzeptor.',
  },
  {
    id: '12-lfp-entladen', years: [12], subject: 'Lithiumeisenphosphat',
    prompt: 'Beim Entladen gilt am Pluspol vereinfacht FePO₄ + Li⁺ + e⁻ → LiFePO₄. Welchen Weg nehmen Li⁺ und e⁻ zum Pluspol? Welches Element wird dort reduziert?',
    solution: 'Li⁺ wandert durch den Elektrolyten zum Pluspol. Das Elektron gelangt über den äußeren Leiter dorthin. Eisen wird von der Oxidationszahl +III zu +II reduziert. Lithium bleibt als Li⁺ im Material.',
  },
  {
    id: '12-lk-kupfer-nernst', years: [12], course: 'lk', subject: 'Kupfer',
    prompt: 'Für Cu²⁺/Cu gilt bei 25 °C im Konzentrationsmodell E = 0,34 V + 0,0296 V · lg(c/c°), mit c° = 1 mol/L. Berechne das Elektrodenpotenzial bei c(Cu²⁺) = 0,010 mol/L.',
    solution: 'Das Verhältnis c/c° ist 0,010. Sein Zehnerlogarithmus ist −2. Damit ergibt sich E = 0,34 V − 0,0592 V ≈ +0,28 V gegen die Standard-Wasserstoffelektrode. Das ist rund 0,06 V weniger als E°.',
  },
  {
    id: '13-ethen-kette', years: [13], subject: 'Ethen',
    prompt: 'Zeichne H₂C=CH₂ neben einen Kettenausschnitt aus zwei Wiederholungseinheiten von Polyethylen. Markiere eine Bindung, die zwei ehemalige Ethenmoleküle verknüpft.',
    solution: 'Der Ausschnitt lautet …–CH₂–CH₂–CH₂–CH₂–… . Zwischen dem zweiten und dritten C-Atom liegt die Verknüpfung der beiden Einheiten. Aus jeder C=C-Doppelbindung ist in der Kette eine Einfachbindung geworden.',
  },
  {
    id: '13-pe-rohr', years: [13], subject: 'Polyethylen',
    prompt: 'Zwei PE-Proben haben ähnlich lange Ketten. Probe A ist stark verzweigt, Probe B fast unverzweigt. Welche erwartest du bei Raumtemperatur als steiferes Rohrmaterial? Begründe deine Wahl.',
    solution: 'Probe B. Ihre wenig verzweigten Ketten können sich enger und regelmäßiger anordnen. Dadurch ist der kristalline Anteil bei vergleichbarer Verarbeitung meist höher, und das Material ist steifer.',
  },
  {
    id: '13-pe-zaehlen', years: [13], subject: 'Polyethylen',
    prompt: 'Ein innerer Abschnitt einer PE-Kette enthält 25 Einheiten –CH₂–CH₂–. Wie viele C- und H-Atome gehören zu diesem Abschnitt?',
    solution: 'Eine Einheit enthält zwei C-Atome und vier H-Atome. Der Abschnitt umfasst 25 · 2 = 50 C-Atome und 25 · 4 = 100 H-Atome.',
  },
  {
    id: '13-lk-ethen-katalyse', years: [13], course: 'lk', subject: 'Ethen',
    prompt: 'Ethen, Wasserdampf und Ethanol befinden sich bereits im Gleichgewicht. Bei gleicher Temperatur und gleichem Volumen kommt ein Katalysator hinzu. Was geschieht mit den Teilreaktionsgeschwindigkeiten und dem Ethanolanteil?',
    solution: 'Hin- und Rückreaktion laufen schneller und weiterhin gleich schnell. Weil das Gemisch schon im Gleichgewicht war, bleibt sein Ethanolanteil gleich. Der Katalysator eröffnet einen anderen Reaktionsweg. Die Gleichgewichtskonstante bleibt bei gleicher Temperatur unverändert.',
  },
];
