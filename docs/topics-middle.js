const plan = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/gost_klp_ch_2022_06_07.pdf';

const organics = { year: 11, ref: 'Organische Stoffklassen', page: 28 };
const equilibria = { year: 11, ref: 'Reaktionsgeschwindigkeit und chemisches Gleichgewicht', page: 30 };
const analysis = { year: 12, ref: 'Säuren, Basen und analytische Verfahren', page: 38, lkPage: 47 };
const electrochemistry = { year: 12, ref: 'Elektrochemische Prozesse und Energetik', page: 40, lkPage: 50 };

const titrationSource = { label: 'OpenStax · Säure-Base-Titrationen', url: 'https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations' };
const voltageSource = { label: 'OpenStax · Zellspannung und freie Enthalpie', url: 'https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium' };
const materialSources = {
  'q12-titration': titrationSource,
  'q12-puffer': { label: 'OpenStax · Puffer und pH', url: 'https://openstax.org/books/chemistry-2e/pages/14-6-buffers' },
  'q12-titrationskurve': { label: 'PubChem · Säurekonstante der Ethansäure bei 25 °C', url: 'https://pubchem.ncbi.nlm.nih.gov/compound/Acetic-acid#section=Dissociation-Constants' },
  'q12-nernst': voltageSource,
  'q12-faraday': { label: 'OpenStax · Stoffumsatz bei der Elektrolyse', url: 'https://openstax.org/books/chemistry-2e/pages/17-7-electrolysis' },
  'q12-freie-enthalpie': voltageSource,
};

function topic(field, id, title, visual, questions, course) {
  const page = course === 'lk' ? field.lkPage : field.page;
  return { id, year: field.year, ...(course ? { course } : {}), title, ref: field.ref,
    source: plan + '#page=' + page, materialSource: materialSources[id], visual, questions };
}

function table(title, columns, rows) {
  return { title, columns, rows };
}

function question(prompt, choices, answer, explanation, hint) {
  return { prompt, choices, answer, explanation, hint };
}

export const middleTopics = [
  topic(organics, 'e11-struktur', 'Strukturformeln lesen',
    table('Drei Moleküle mit je drei C-Atomen', ['Molekül', 'Halbstrukturformel'], [
      ['A', 'CH₃–CH₂–CH₂–OH'],
      ['B', 'CH₃–CH(OH)–CH₃'],
      ['C', 'CH₃–C(=O)–CH₃']
    ]), [
      question('Welche beiden Moleküle haben dieselbe Summenformel, aber unterschiedlich verknüpfte Atome?',
        ['A und C', 'A und B', 'B und C'], 1,
        'A und B haben die Summenformel C₃H₈O. Die OH-Gruppe sitzt bei A am ersten und bei B am zweiten C-Atom. Solche Stoffe heißen Konstitutionsisomere.',
        'Zähle auch das H-Atom der OH-Gruppe mit.'),
      question('Wie sind die drei Bindungsrichtungen am mittleren C-Atom von Molekül C angeordnet?',
        ['Tetraedrisch, mit Winkeln um 109,5°.', 'Linear, mit einem Winkel von 180°.', 'In einer Ebene, mit Winkeln um 120°.'], 2,
        'Im Elektronenpaarabstoßungsmodell (EPA) zählt die C=O-Doppelbindung als ein Bereich. Zusammen mit den beiden C–C-Bindungen ergeben sich drei Bereiche. Sie liegen annähernd trigonal-planar.',
        'Zähle am mittleren C-Atom die Bindungsrichtungen. Jede Mehrfachbindung zählt als eine Richtung.')
    ]),

  topic(organics, 'e11-wechselwirkungen', 'Siedetemperatur und Mischbarkeit erklären',
    table('Unverzweigte Alkohole bei Normaldruck', ['Alkohol', 'Siedetemperatur, gerundet', 'Mischbarkeit mit Wasser bei 20 °C'], [
      ['Ethanol', '78 °C', 'vollständig'],
      ['Propan-1-ol', '97 °C', 'vollständig'],
      ['Butan-1-ol', '118 °C', 'begrenzt']
    ]), [
      question('Warum steigt die Siedetemperatur in dieser Reihe?',
        ['Längere Ketten ziehen sich durch stärkere London-Kräfte an.', 'Längere Ketten tragen mehr OH-Gruppen und bilden dadurch mehr Wasserstoffbrücken.', 'Sieden trennt bei längeren Ketten mehr C–C-Bindungen.'], 0,
        'Alle drei Alkohole haben je eine OH-Gruppe. Mit der Kettenlänge wächst die polarisierbare Elektronenhülle. Die stärkeren Anziehungskräfte zwischen den Molekülen erhöhen die Siedetemperatur.',
        'Vergleiche, wie sich Kettenlänge und Anzahl der OH-Gruppen ändern.'),
      question('Warum ist Butan-1-ol nur begrenzt mit Wasser mischbar?',
        ['Seine OH-Gruppe kann keine Wasserstoffbrücken mehr bilden.', 'Sein größerer unpolarer Kettenanteil erschwert das Mischen.', 'Die OH-Gruppe macht das ganze Molekül unpolar.'], 1,
        'Die OH-Gruppe bildet mit Wasser Wasserstoffbrücken. Die unpolare Kohlenstoffkette wechselwirkt schwächer mit Wasser. Bei Butan-1-ol fällt dieser Anteil stärker ins Gewicht als bei Ethanol.',
        'Betrachte die OH-Gruppe und den übrigen Teil des Moleküls getrennt.')
    ]),

  topic(organics, 'e11-oxidation', 'Die Oxidation von Alkoholen verfolgen',
    table('Schrittweise Oxidation von Ethanol', ['Station', 'Struktur', 'Merkmal'], [
      ['1 · Ethanol', 'CH₃–CH₂–OH', 'Alkoholgruppe'],
      ['2 · Ethanal', 'CH₃–CHO', 'Aldehydgruppe'],
      ['3 · Ethansäure', 'CH₃–COOH', 'Carboxygruppe']
    ]), [
      question('Verfolge das C-Atom, das anfangs die OH-Gruppe trägt. Wie ändern sich seine Oxidationszahlen?',
        ['−III, −I, +I', '−I, +I, +III', '+I, −I, −III'], 1,
        'Bei diesem C-Atom zählt jede Bindung zu H als −I, jede Bindung zu O als +I und die Bindung zu C als 0. Die C=O-Doppelbindung zählt zweimal. So steigt die Oxidationszahl von −I über +I auf +III.',
        'Beginne mit dem CH₂ in Ethanol. Es ist mit zwei H-Atomen und einem O-Atom verbunden.'),
      question('Welches Produkt entsteht bei der Oxidation von Propan-2-ol, wenn die C-Kette erhalten bleibt?',
        ['Propanal', 'Propansäure', 'Propanon'], 2,
        'Bei diesem sekundären Alkohol wird die mittlere CH–OH-Gruppe zur C=O-Gruppe. Das Produkt ist das Keton Propanon. Ein Aldehydnachweis fällt bei einer reinen Probe davon negativ aus.',
        'Die OH-Gruppe sitzt am mittleren C-Atom. Dort entsteht die Carbonylgruppe.')
    ]),

  topic(organics, 'e11-ester', 'Einen Ester im Fruchtaroma erkennen',
    table('Ethansäureethylester in zwei Modellgetränken', ['Angabe', 'Information'], [
      ['Bildung des Esters', 'CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O'],
      ['Getränk A', '5 mg reiner Ester je Liter, aus Früchten gewonnen'],
      ['Getränk B', '5 mg reiner Ester je Liter, aus Ethansäure und Ethanol hergestellt']
    ]), [
      question('Welche Bindungsfolge gehört zur Estergruppe?',
        ['–C(=O)–O–C–', '–C(=O)–OH', '–C–O–H'], 0,
        'Im Ester grenzt die C=O-Gruppe an ein zweites O-Atom, das mit einem weiteren C-Atom verbunden ist. Das unterscheidet die Estergruppe von der Carboxygruppe einer Säure.',
        'Suche in der Produktformel das Carbonyl-C und seinen zweiten O-Nachbarn.'),
      question('Welche Aussage über das Aroma in A und B ist durch die Angaben belegt?',
        ['Eine gleich große Portion von A enthält weniger Ester.', 'Der Ester in B hat durch die Herstellung eine andere Struktur.', 'Beide Getränke enthalten pro Liter gleich viele Moleküle dieses Esters.'], 2,
        'In beiden Fällen ist der Stoff Ethansäureethylester. Gleiche Massen desselben Stoffs enthalten gleich viele Moleküle.',
        'Prüfe, welchen Einfluss die Herkunft auf die Summenformel und die molare Masse hat.')
    ]),

  topic(equilibria, 'e11-reaktionsgeschwindigkeit', 'Reaktionsgeschwindigkeit aus Messdaten bestimmen',
    table('Wie schnell bildet sich das Produkt P?', ['Zeit', 'Konzentration c(P)'], [
      ['0 s', '0,00 mol/L'], ['10 s', '0,14 mol/L'], ['20 s', '0,22 mol/L'], ['30 s', '0,26 mol/L']
    ]), [
      question('Wie schnell bildet sich P im Mittel zwischen 10 s und 30 s?',
        ['0,012 mol/(L·s)', '0,0060 mol/(L·s)', '0,0087 mol/(L·s)'], 1,
        'Die Konzentration steigt um 0,26 − 0,14 = 0,12 mol/L. Das Zeitintervall beträgt 20 s. Die mittlere Bildungsgeschwindigkeit ist 0,12 mol/L ÷ 20 s = 0,0060 mol/(L·s).',
        'Verwende die Differenz der beiden Konzentrationen und die Dauer genau dieses Intervalls.'),
      question('Eine feste Probe reagiert mit einer Lösung. Welcher Vergleich untersucht nur den Einfluss der Korngröße?',
        ['Gleiche Probenmasse fein oder grob, gleiche Lösung und Temperatur.', 'Gleiche Probenmasse fein oder grob, die feine Probe zusätzlich erwärmen.', 'Gleiche Probenmasse fein oder grob, die grobe Probe in stärker konzentrierte Lösung geben.'], 0,
        'Bei gleicher Masse hat die feinere Probe eine größere Kontaktfläche zur Lösung. Vergleiche den Anstieg von c(P) zu Beginn beider Versuche. Temperatur, Lösungsvolumen, Konzentration und Rühren bleiben gleich.',
        'Für einen fairen Vergleich veränderst du nur eine Versuchsbedingung.')
    ]),

  topic(equilibria, 'e11-katalyse', 'Ein dynamisches Gleichgewicht erkennen',
    table('Modellreaktion A ⇌ B bei gleicher Temperatur und Zusammensetzung', ['Bedingung', 'Reaktionen A → B je Minute', 'Reaktionen B → A je Minute'], [
      ['ohne Katalysator', '8', '8'], ['mit Katalysator', '24', '24']
    ]), [
      question('Warum bleibt der Anteil von B in beiden Ansätzen konstant?',
        ['Im Gleichgewicht haben alle Teilchen aufgehört zu reagieren.', 'Im Gleichgewicht müssen gleich viele A- und B-Teilchen vorliegen.', 'In jeder Minute entsteht so viel B, wie wieder verbraucht wird.'], 2,
        'Im ersten Ansatz gibt es in jeder Richtung 8, im zweiten jeweils 24 Reaktionen pro Minute. Die Stoffmengen bleiben gleich, während weiterhin Teilchen reagieren. Das ist ein dynamisches Gleichgewicht.',
        'Vergleiche die Zahl der Hin- und Rückreaktionen innerhalb derselben Zeile.'),
      question('Zwei gleiche Startgemische stehen noch nicht im Gleichgewicht. Was bewirkt ein Katalysator in einem der beiden?',
        ['Dasselbe Gleichgewicht stellt sich schneller ein.', 'Im Gleichgewicht liegt ein größerer Anteil B vor.', 'Die Hinreaktion wird schneller, die Rückreaktion behält ihr Tempo.'], 0,
        'Der Katalysator erleichtert Hin- und Rückreaktion. Bei gleicher Temperatur bleibt die Gleichgewichtskonstante gleich. Mit identischer Ausgangszusammensetzung entstehen dieselben Gleichgewichtsanteile.',
        'Unterscheide die Zeit bis zum Gleichgewicht von der Zusammensetzung im Gleichgewicht.')
    ]),

  topic(equilibria, 'e11-massenwirkung', 'Eine Gleichgewichtsmischung auswerten',
    table('Modell einer homogenen Mischung bei konstantem Volumen und konstanter Temperatur', ['Stoff', 'Konzentration im Gleichgewicht'], [
      ['Ethansäure', '0,50 mol/L'], ['Ethanol', '0,50 mol/L'], ['Ethansäureethylester', '1,00 mol/L'], ['Wasser', '1,00 mol/L']
    ]), [
      question('Für Säure + Alkohol ⇌ Ester + Wasser gilt das Massenwirkungsgesetz. Wie groß ist K꜀?',
        ['0,25', '4,0', '2,0'], 1,
        'K꜀ = [c(Ester) · c(Wasser)] / [c(Säure) · c(Alkohol)]. Einsetzen der Gleichgewichtswerte ergibt (1,00 · 1,00) / (0,50 · 0,50) = 4,0.',
        'Alle vier Stoffe stehen mit dem Koeffizienten 1 in der Reaktionsgleichung. Die Produktkonzentrationen gehören in den Zähler.'),
      question('Aus der Gleichgewichtsmischung wird nur Ester entfernt. Welche Reaktionsrichtung überwiegt direkt danach?',
        ['Die Rückreaktion zu Säure und Alkohol.', 'Hin- und Rückreaktion bleiben gleich schnell.', 'Die Hinreaktion zu Ester und Wasser.'], 2,
        'Durch die Entnahme sinkt die Esterkonzentration. Der Reaktionsquotient liegt nun unter K꜀. Netto entstehen Ester und Wasser, bis sich ein neues Gleichgewicht einstellt.',
        'Überlege, welche Seite des Massenwirkungsausdrucks durch die Entnahme kleiner wird.')
    ]),

  topic(equilibria, 'e11-sprudelwasser', 'Was hält Kohlendioxid im Sprudelwasser?',
    table('CO₂ im Gleichgewicht mit Wasser. Relative Mengen je Liter', ['Temperatur', 'CO₂-Partialdruck', 'Gelöste Menge, relativ'], [
      ['10 °C', '1 bar', '1,0'], ['10 °C', '2 bar', '2,0'], ['25 °C', '1 bar', '0,6']
    ]), [
      question('Beim Öffnen der Flasche sinkt der CO₂-Partialdruck über dem Wasser. Was passiert mit dem gelösten CO₂?',
        ['Mehr CO₂ geht aus der Luft in das Wasser über.', 'Ein Teil des gelösten CO₂ entweicht als Gas.', 'Die gelöste Menge bleibt bei gleicher Temperatur gleich.'], 1,
        'Der CO₂-Partialdruck ist der Anteil des Gasdrucks, der auf CO₂ entfällt. Bei niedrigerem CO₂-Partialdruck enthält das Wasser im Gleichgewicht weniger gelöstes CO₂. Überschüssiges Gas kann ausperlen.',
        'Vergleiche bei gleicher Temperatur die Zeilen mit unterschiedlichem Druck.'),
      question('Welche Aussage zum Kühlen bei der Abfüllung wird durch den Vergleich bei 1 bar gestützt?',
        ['Bei 10 °C kann sich mehr CO₂ lösen als bei 25 °C.', 'Bei 10 °C löst sich dieselbe CO₂-Menge wie bei 25 °C.', 'Bei 25 °C kann sich mehr CO₂ lösen als bei 10 °C.'], 0,
        'Bei gleichem CO₂-Partialdruck steigt der relative Wert von 0,6 auf 1,0, wenn das Wasser gekühlt wird. Für eine Betriebsentscheidung wäre zusätzlich der Energiebedarf der Kühlung wichtig.',
        'Halte den Druck beim Vergleich gleich. Welche beiden Zeilen kommen dafür infrage?')
    ]),

  topic(equilibria, 'e11-kohlenstoff', 'Die Kohlenstoffbilanz der Atmosphäre lesen',
    table('Kohlenstoffflüsse in einem Modelljahr. Alle Zahlen haben dieselbe Mengeneinheit', ['Weg des Kohlenstoffs', 'Menge'], [
      ['Fossile Energieträger → Atmosphäre', '10'],
      ['Atmosphäre → Ozean, netto', '3'], ['Atmosphäre → Landökosysteme, netto', '2']
    ]), [
      question('Um wie viele Einheiten ändert sich der Kohlenstoffvorrat der Atmosphäre?',
        ['Er steigt um 5.', 'Er steigt um 15.', 'Er sinkt um 5.'], 0,
        'Die Atmosphäre nimmt 10 Einheiten auf und gibt netto 3 an den Ozean und 2 an Landökosysteme ab. Ihre Bilanz ist 10 − 3 − 2 = +5.',
        'Zähle Zuflüsse zur Atmosphäre positiv und Abflüsse negativ.'),
      question('Im selben Jahr gelangen insgesamt 23 Einheiten von der Atmosphäre in den Ozean. Wie viele fließen zurück?',
        ['3 Einheiten', '20 Einheiten', '26 Einheiten'], 1,
        'Der Ozean nimmt netto 3 Einheiten auf. Bei 23 Einheiten Zufluss müssen 20 zurück in die Atmosphäre geflossen sein. So können eine große Bruttoaufnahme und ein kleiner Nettofluss zusammenpassen.',
        'Nettoaufnahme des Ozeans = Zufluss aus der Atmosphäre − Rückfluss zur Atmosphäre.')
    ]),

  topic(analysis, 'q12-protolyse', 'Protonenübertragung und Säurestärke',
    table('Säuren mit gleicher Ausgangskonzentration in Wasser bei 25 °C', ['Säure', 'Protonenabgabe an Wasser', 'pH, gerundet'], [
      ['Chlorwasserstoff, 0,010 mol/L', 'praktisch vollständig', '2,0'],
      ['Ethansäure, 0,010 mol/L', 'teilweise', '3,4']
    ]), [
      question('Welche Rolle spielt Wasser bei CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺?',
        ['Es gibt ein Proton ab.', 'Es nimmt ein Elektron auf.', 'Es nimmt ein Proton auf.'], 2,
        'Wasser wird durch Protonenaufnahme zu H₃O⁺. Es wirkt hier als Brønsted-Base. Die Ethansäure gibt das Proton ab. Ihr Säure-Base-Paar lautet CH₃COOH/CH₃COO⁻.',
        'Vergleiche H₂O auf der linken mit H₃O⁺ auf der rechten Seite.'),
      question('Beide Säuren haben dieselbe Ausgangskonzentration. Warum hat die Ethansäurelösung den höheren pH?',
        ['Ein kleinerer Anteil ihrer Moleküle gibt ein Proton an Wasser ab.', 'Ihre Ausgangskonzentration ist kleiner.', 'Sie bildet mehr H₃O⁺ als die Salzsäure.'], 0,
        'Die schwache Ethansäure bildet bei gleicher Ausgangskonzentration weniger H₃O⁺. Ihr pH ist deshalb höher.',
        'Nutze die Spalten zur Umsetzung und zum pH gemeinsam.')
    ]),

  topic(analysis, 'q12-ph', 'pH und Verdünnung berechnen',
    table('Verdünnte Lösungen bei 25 °C, vollständige Dissoziation', ['Lösung', 'Konzentration'], [
      ['A · Salzsäure', '0,0010 mol/L'], ['B · Natronlauge', '0,010 mol/L'], ['Beziehung', 'pH + pOH = 14,00']
    ]), [
      question('Welchen pH hat die Natronlauge B?',
        ['2,00', '12,00', '10,00'], 1,
        'NaOH liefert je Formeleinheit ein OH⁻-Ion. Aus c(OH⁻) = 0,010 mol/L folgt pOH = 2,00. Bei 25 °C gilt damit pH = 14,00 − 2,00 = 12,00.',
        'Berechne zuerst den pOH.'),
      question('10 mL Salzsäure A werden mit Wasser auf insgesamt 100 mL verdünnt. Welcher pH ergibt sich im Modell?',
        ['4,00', '2,00', '3,00'], 0,
        'Das Volumen steigt auf das Zehnfache. Die Stoffmenge bleibt gleich, die Konzentration sinkt auf 0,00010 mol/L. Der pH steigt von 3 auf 4.',
        'Wie ändert sich c(H₃O⁺), wenn das Volumen auf das Zehnfache steigt?')
    ]),

  topic(analysis, 'q12-ionennachweis', 'Unbekannte Salze identifizieren',
    table('Zwei getrennte Proben mit jeweils einem reinen Salz', ['Probe', 'Ausgewählter Laborbefund'], [
      ['A', 'Mit Ag⁺ in salpetersaurer Lösung entsteht ein weißer Niederschlag.'],
      ['B', 'Bei Säurezugabe entweicht ein Gas, das Kalkwasser trübt.'],
      ['Mögliche Salze', 'Natriumchlorid, Natriumcarbonat, Natriumnitrat']
    ]), [
      question('Welche Ionengleichung erklärt den weißen Niederschlag bei Probe A?',
        ['Na⁺ + NO₃⁻ → NaNO₃(s)', 'Ag⁺ + Cl⁻ → AgCl(s)', '2 H⁺ + CO₃²⁻ → CO₂ + H₂O'], 1,
        'Schwer lösliches Silberchlorid bildet den weißen Niederschlag. Von den drei vorgeschlagenen Salzen liefert nur Natriumchlorid die dafür nötigen Cl⁻-Ionen.',
        'Das Zeichen (s) kennzeichnet einen Feststoff. Prüfe auch, welche Ionen zugegeben wurden.'),
      question('Welches der drei Salze passt zum Gasnachweis bei Probe B?',
        ['Natriumnitrat', 'Natriumchlorid', 'Natriumcarbonat'], 2,
        'Carbonat setzt mit Säure CO₂ frei. Im Kalkwasser entsteht daraus ein weißer Calciumcarbonat-Niederschlag. Beobachtet wird eine Reaktion des Anions. Das Kation Na⁺ ist in der Auswahlliste vorgegeben.',
        'Das Gas trübt Kalkwasser. Welches Anion kann dieses Gas mit Säure bilden?')
    ]),

  topic(analysis, 'q12-titration', 'Eine Titrationsreihe auswerten',
    table('Je 20,0 mL Salzsäure werden mit Natronlauge (0,100 mol/L) titriert. Der Endpunkt gilt zunächst als Äquivalenzpunkt.', ['Messung', 'Verbrauch an Natronlauge'], [
      ['1', '15,9 mL'], ['2', '16,0 mL'], ['3', '16,1 mL']
    ]), [
      question('Welche Konzentration hat die Salzsäure? Verwende den Mittelwert und das Stoffmengenverhältnis 1 : 1.',
        ['0,0800 mol/L', '0,125 mol/L', '0,0160 mol/L'], 0,
        'Im Mittel werden 16,0 mL NaOH-Lösung verbraucht. Das entspricht 0,100 mol/L × 0,0160 L = 0,00160 mol OH⁻. Die gleiche Stoffmenge H₃O⁺ in 0,0200 L ergibt 0,0800 mol/L.',
        'Berechne zuerst die Stoffmenge OH⁻ aus dem mittleren Verbrauch.'),
      question('Der Endpunkt wird bei jeder Titration um einen Tropfen überschritten. Wie verändert das die berechnete Säurekonzentration?',
        ['Sie bleibt im Mittel unverändert.', 'Sie fällt systematisch zu hoch aus.', 'Sie fällt systematisch zu niedrig aus.'], 1,
        'Für jede Probe wird ein zu großes NaOH-Volumen abgelesen. Dadurch wird zu viel Säure berechnet. Wiederholungen beseitigen einen gleichgerichteten Fehler nicht.',
        'Was passiert im Produkt aus Konzentration und Volumen der Maßlösung?')
    ]),

  topic(analysis, 'q12-kalorimetrie', 'Wärme einer Neutralisation bilanzieren',
    table('Neutralisation bei konstantem Druck. In der ersten Rechnung nimmt nur die Lösung Wärme auf.', ['Größe', 'Wert'], [
      ['Masse der Lösung', '100 g'], ['Spezifische Wärmekapazität', '4,18 J/(g·K)'],
      ['Temperaturanstieg', '2,70 K'], ['Gebildetes Wasser', '0,0200 mol']
    ]), [
      question('Welche Wärme gibt die Reaktion pro Mol gebildetes Wasser ab? Gib die Neutralisationsenthalpie mit Vorzeichen an.',
        ['+56,4 kJ/mol', '−1,13 kJ/mol', '−56,4 kJ/mol'], 2,
        'Die Lösung nimmt 100 g × 4,18 J/(g·K) × 2,70 K = 1,13 kJ auf. Die Reaktion gibt die Wärme ab. Bezogen auf 0,0200 mol Wasser ergibt sich ΔH ≈ −56,4 kJ/mol.',
        'Rechne mit q = m · c · ΔT. Für den molaren Wert teilst du durch die Stoffmenge des gebildeten Wassers.'),
      question('Auch die Gefäßwand wird warm. Wie verändert es den berechneten Betrag von ΔH, wenn nur die Lösung berücksichtigt wird?',
        ['Der Betrag fällt zu klein aus.', 'Der Betrag fällt zu groß aus.', 'Der Betrag bleibt gleich.'], 0,
        'Ein Teil der frei werdenden Wärme geht in die Gefäßwand. Die Erwärmung der Lösung allein erfasst daher nur einen Teil der abgegebenen Wärme.',
        'Überlege, wo die frei werdende Wärme ankommt.')
    ]),

  topic(electrochemistry, 'q12-galvanisch', 'Stromwege und Zellspannung erklären',
    table('Halbzellen unter Standardbedingungen, Bezug Wasserstoffelektrode', ['Reduktionspaar', 'Standardpotenzial'], [
      ['Zn²⁺/Zn', '−0,76 V'], ['Cu²⁺/Cu', '+0,34 V']
    ]), [
      question('Welches Metall wird beim Entladen oxidiert, und wie groß ist die Standardzellspannung?',
        ['Kupfer · 0,42 V', 'Zink · 1,10 V', 'Kupfer · 1,10 V'], 1,
        'Zink gibt Elektronen ab, Cu²⁺ nimmt sie auf. Aus den Reduktionspotenzialen folgt E°(Kathode) − E°(Anode) = 0,34 V − (−0,76 V) = 1,10 V.',
        'Bei der freiwilligen Entladung ist die Halbzelle mit dem höheren Reduktionspotenzial die Kathode.'),
      question('Der Draht bleibt angeschlossen. Warum kann nach dem Entfernen der Salzbrücke kein dauerhafter Strom fließen?',
        ['Der Kupferdraht verliert seine Leitfähigkeit.', 'Die Kupfer-Ionen können innerhalb ihrer Lösung nicht mehr wandern.', 'Der Ladungsausgleich zwischen den Halbzellen fehlt.'], 2,
        'An der Zinkseite entstehen Zn²⁺-Ionen, an der Kupferseite werden Cu²⁺-Ionen verbraucht. Ohne die Ionenverbindung zwischen den Halbzellen hemmt der Ladungsaufbau den weiteren Umsatz. In jeder Lösung bleiben die Ionen beweglich.',
        'Unterscheide den Elektronenweg im Draht und den Ionenweg zwischen den Halbzellen.')
    ]),

  topic(electrochemistry, 'q12-energiewandler', 'Wasserstoff als Energiespeicher bewerten',
    table('Vereinfachte Energiekette, Verluste durch Speicherung und Transport ausgeklammert', ['Schritt', 'Nutzbarer Energieanteil'], [
      ['Elektrolyse mit Strom → Wasserstoff', '75 %'], ['Brennstoffzelle mit H₂ und O₂ → Strom', '50 %']
    ]), [
      question('Die Elektrolyse erhält 120 kWh elektrische Energie. Wie viel elektrische Energie liefert die Brennstoffzelle danach?',
        ['45 kWh', '75 kWh', '90 kWh'], 0,
        'Die Elektrolyse speichert 120 kWh × 0,75 = 90 kWh als chemische Energie. Die Brennstoffzelle liefert davon 50 % als elektrische Energie. Das sind 45 kWh oder 37,5 % der Ausgangsenergie.',
        'Der zweite Wirkungsgrad bezieht sich auf die Energie nach der Elektrolyse.'),
      question('Welche Aufgabe hat der feste Katalysator an der Elektrode einer Brennstoffzelle?',
        ['Er liefert die chemische Energie für den Dauerbetrieb.', 'Seine Oberfläche erleichtert die Teilschritte der Elektrodenreaktion.', 'Er erhöht die Gleichgewichtskonstante der Wasserbildung.'], 1,
        'Die gasförmigen Reaktionspartner treffen auf eine feste Oberfläche. Das ist heterogene Katalyse. Die chemische Energie stammt aus der Umsetzung von H₂ und O₂ zu Wasser.',
        'Trenne die Rolle der Oberfläche von der Rolle der Reaktionsstoffe.')
    ]),

  topic(electrochemistry, 'q12-akku', 'Laden und Entladen eines Akkus vergleichen',
    table('Reversibler Modellakku mit zwei verschiedenen Metallen M und X', ['Elektrode', 'Teilreaktion beim Entladen'], [
      ['M', 'M → M²⁺ + 2 e⁻'], ['X', 'X²⁺ + 2 e⁻ → X'], ['Ladevorgang', 'Eine äußere Spannungsquelle treibt die umgekehrte Gesamtreaktion an.']
    ]), [
      question('Welche Teilreaktion läuft beim Laden an der M-Elektrode ab?',
        ['M → M²⁺ + 2 e⁻', 'X²⁺ + 2 e⁻ → X', 'M²⁺ + 2 e⁻ → M'], 2,
        'Beim Laden liefert die Spannungsquelle der M-Elektrode Elektronen. M²⁺ wird dort zu Metall reduziert. Die M-Elektrode ist beim Laden die Kathode.',
        'Kehre die Entladereaktion der M-Elektrode um.'),
      question('In welcher Richtung wird beim Laden und Entladen Energie übertragen?',
        ['Beim Laden nimmt der Akku elektrische Arbeit auf, beim Entladen kann er elektrische Arbeit abgeben.', 'Beim Laden gibt der Akku elektrische Arbeit ab, beim Entladen nimmt er sie auf.', 'Bei beiden Vorgängen liefert der Akku elektrische Arbeit an das angeschlossene Gerät.'], 0,
        'Beim Laden treibt die Spannungsquelle die chemische Rückreaktion an. Beim Entladen kann die freiwillige Reaktion elektrische Arbeit liefern. In realen Akkus wird bei beiden Vorgängen auch Energie als Wärme abgegeben.',
        'Wann liefert die angeschlossene Spannungsquelle Energie an den Akku?')
    ]),

  topic(electrochemistry, 'q12-korrosion', 'Eine beschädigte Schutzschicht untersuchen',
    table('Zwei Modellbleche mit Kratzer in feuchter, sauerstoffhaltiger Luft', ['Blech', 'Schicht und Kontakt'], [
      ['A', 'Stahl mit Zinküberzug, Zink und Stahl leitend verbunden'],
      ['B', 'Stahl mit Lacküberzug, Stahl am Kratzer offen'],
      ['Standard-Reduktionspotenziale zur Orientierung', 'Zn²⁺/Zn −0,76 V · Fe²⁺/Fe −0,44 V']
    ]), [
      question('Welcher Überzug kann den Stahl trotz Kratzer elektrochemisch schützen?',
        ['Lack an B, weil er dem Stahl Elektronen liefert.', 'Beide, weil ein Elektrolyt vorhanden ist.', 'Zink an A, weil es als Opferanode Elektronen abgibt.'], 2,
        'Zink kann zu Zn²⁺ oxidiert werden. Der leitende Kontakt zum Stahl und der feuchte Elektrolyt ermöglichen den Schutz am Kratzer. Dabei wird Zink verbraucht.',
        'Vergleiche die beiden Metallpotenziale. Welches Metall lässt sich leichter oxidieren?'),
      question('Welche Teilgleichung zeigt die Reduktion von gelöstem Sauerstoff bei annähernd neutralem pH?',
        ['O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻', 'Fe → Fe²⁺ + 2 e⁻', '2 H₂O → O₂ + 4 H⁺ + 4 e⁻'], 0,
        'Gelöster Sauerstoff nimmt Elektronen auf. Mit Wasser entstehen Hydroxid-Ionen. In diesem Modell ist das die kathodische Reaktion.',
        'Achte darauf, auf welcher Seite O₂ und die Elektronen stehen.')
    ]),

  topic(electrochemistry, 'q12-hess', 'Reaktionsenthalpien aus Teilreaktionen bestimmen',
    table('Standardreaktionsenthalpien bei 25 °C, gerundet', ['Teilreaktion', 'ΔᵣH° je Formelumsatz'], [
      ['C(Graphit) + ½ O₂(g) → CO(g)', '−110,5 kJ/mol'], ['CO(g) + ½ O₂(g) → CO₂(g)', '−283,0 kJ/mol']
    ]), [
      question('Wie groß ist ΔᵣH° für C(Graphit) + O₂(g) → CO₂(g)?',
        ['−172,5 kJ/mol', '−393,5 kJ/mol', '+393,5 kJ/mol'], 1,
        'Addiere beide Teilreaktionen. CO kürzt sich heraus. Weil die Enthalpie vom Anfangs- und Endzustand abhängt, gilt nach dem Satz von Hess ΔᵣH° = −110,5 − 283,0 = −393,5 kJ/mol.',
        'Welche Teilreaktion liefert CO, und welche verbraucht es wieder?'),
      question('Welche Reaktionsenthalpie gehört zur umgekehrten Reaktion CO₂(g) → CO(g) + ½ O₂(g)?',
        ['−283,0 kJ/mol', '+110,5 kJ/mol', '+283,0 kJ/mol'], 2,
        'Beim Umkehren tauschen Edukte und Produkte ihre Rollen. Die Enthalpiedifferenz wechselt ihr Vorzeichen. Der Betrag bleibt hier bei 283,0 kJ/mol.',
        'Suche in der Tabelle dieselben Stoffe auf den jeweils anderen Seiten.')
    ]),

  topic(analysis, 'q12-puffer', 'Puffer-pH berechnen und Pufferwirkung erklären',
    table('Ethansäure/Ethanoat bei 25 °C, pKₛ = 4,76', ['Gemisch', 'c(HA)', 'c(A⁻)'], [
      ['P', '0,10 mol/L', '0,10 mol/L'], ['Q', '0,010 mol/L', '0,10 mol/L']
    ]), [
      question('Welchen pH haben P und Q näherungsweise? Nutze pH = pKₛ + lg[c(A⁻)/c(HA)].',
        ['P 4,76 · Q 5,76', 'P 4,76 · Q 3,76', 'P 4,76 · Q 4,76'], 0,
        'In P beträgt c(A⁻)/c(HA) = 1. In Q beträgt es 10. Mit lg(1) = 0 und lg(10) = 1 ergeben sich die pH-Werte 4,76 und 5,76.',
        'Berechne das Verhältnis für jedes Gemisch einzeln.'),
      question('Zu P kommt wenig Säure. Welcher Teil des Puffers bindet die zusätzlichen Oxonium-Ionen?',
        ['HA durch Protonenabgabe.', 'A⁻ durch Protonenaufnahme.', 'Beide Pufferbestandteile durch Elektronenaufnahme.'], 1,
        'Ethanoat nimmt ein Proton auf. Es gilt A⁻ + H₃O⁺ → HA + H₂O. Bei einer kleinen Zugabe ändert sich das Verhältnis der Pufferpartner nur wenig und damit auch der pH.',
        'Ordne der Säure HA ihre konjugierte Base zu.')
    ], 'lk'),

  topic(analysis, 'q12-titrationskurve', 'Kennpunkte einer Titrationskurve lesen',
    table('20,0 mL Ethansäure (0,100 mol/L) mit Natronlauge (0,100 mol/L). Modellwerte bei 25 °C.', ['V(NaOH)', 'pH'], [
      ['0,0 mL', '2,88'], ['10,0 mL', '4,76'], ['20,0 mL', '8,73'], ['25,0 mL', '12,05']
    ]), [
      question('Bei welchem Volumen zugegebener Natronlauge kannst du pKₛ näherungsweise direkt als pH ablesen?',
        ['0,0 mL', '20,0 mL', '10,0 mL'], 2,
        'Bei 10,0 mL ist die Hälfte der anfänglichen Ethansäure neutralisiert. Die Konzentrationen von Ethansäure und Ethanoat sind ungefähr gleich. Am Halbäquivalenzpunkt gilt damit pH ≈ pKₛ = 4,76.',
        'Suche zuerst das Volumen am Äquivalenzpunkt. Wann ist die Hälfte der Säure umgesetzt?'),
      question('Warum liegt der pH am Äquivalenzpunkt bei 20,0 mL über 7?',
        ['Ethanoat nimmt von Wasser Protonen auf. Dabei entsteht OH⁻.', 'Die zugegebene Natronlauge liegt bereits im stöchiometrischen Überschuss vor.', 'Das Natrium-Ion gibt in Wasser ein Proton ab.'], 0,
        'Die zugegebene Stoffmenge OH⁻ entspricht der anfänglichen Stoffmenge Ethansäure. In der Lösung ist Ethanoat entstanden. Es reagiert als schwache Base mit Wasser: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻.',
        'Welches Teilchen bleibt nach der Umsetzung der schwachen Säure in Lösung?')
    ], 'lk'),

  topic(analysis, 'q12-salzgleichgewicht', 'Löslichkeit und Energie beim Lösen',
    table('Zwei unabhängige Modellfälle bei 25 °C', ['Fall', 'Daten'], [
      ['AgCl direkt nach dem Mischen', 'Kₗ ≈ 1,8 · 10⁻¹⁰ (mol/L)². Anfangs je 1,0 · 10⁻⁴ mol/L Ag⁺ und Cl⁻.'],
      ['Salz X in Wasser', 'Das Salz löst sich freiwillig in reinem Wasser. Der Lösungsvorgang ist endotherm (ΔH > 0).']
    ]), [
      question('Ist die Mischung mit Ag⁺ und Cl⁻ untersättigt, gesättigt oder übersättigt?',
        ['Untersättigt. Das Ionenprodukt liegt unter Kₗ.', 'Übersättigt. Das Ionenprodukt liegt über Kₗ.', 'Gesättigt. Die Ionenkonzentrationen sind gleich.'], 1,
        'Das anfängliche Ionenprodukt ist 10⁻⁴ × 10⁻⁴ = 10⁻⁸ (mol/L)². Es übersteigt Kₗ. Damit ist die Fällung von AgCl thermodynamisch begünstigt.',
        'Multipliziere beide Ionenkonzentrationen. Vergleiche erst dann mit Kₗ.'),
      question('Das Lösen von Salz X ist endotherm. Wie kann es bei 25 °C und konstantem Druck trotzdem freiwillig ablaufen?',
        ['TΔS ist negativ und sein Betrag größer als ΔH.', 'ΔS ist null, sodass nur ΔH den Vorgang bestimmt.', 'TΔS ist positiv und größer als ΔH.'], 2,
        'Bei konstantem T und p gilt für die Gibbs-Energie ΔG = ΔH − TΔS. Für freiwilliges Lösen muss ΔG negativ sein. Trotz positiver Lösungsenthalpie gelingt das, wenn der Entropieterm TΔS größer ist.',
        'Setze in ΔG = ΔH − TΔS zuerst die Vorzeichen von ΔH und ΔG ein.')
    ], 'lk'),

  topic(electrochemistry, 'q12-nernst', 'Eine Konzentrationszelle vorhersagen',
    table('Zwei Cu²⁺/Cu-Halbzellen bei 25 °C. Modell mit idealen Lösungen und ohne Diffusionspotenzial.', ['Angabe', 'Wert'], [
      ['c(Cu²⁺) links', '0,010 mol/L'], ['c(Cu²⁺) rechts', '1,00 mol/L'], ['Potenzial rechts minus Potenzial links', 'ΔE = (0,0592 V / 2) · lg[c(rechts)/c(links)]']
    ]), [
      question('Welche Leerlaufspannung ergibt sich für die beiden Kupferhalbzellen?',
        ['0,0592 V', '0,1184 V', '0 V'], 0,
        'Die rechte Lösung ist 100-mal so konzentriert wie die linke. Mit lg(100) = 2 folgt ΔE = (0,0592 V / 2) × 2 = 0,0592 V.',
        'Bestimme das Verhältnis c(rechts)/c(links) und seinen Zehnerlogarithmus.'),
      question('Im Metallleiter wird der Stromkreis geschlossen. Wohin fließen die Elektronen netto?',
        ['Von rechts nach links. Rechts wird Kupfer oxidiert.', 'Von links nach rechts. Links wird Kupfer oxidiert.', 'Es fließen keine Elektronen, weil beide Elektroden aus Kupfer sind.'], 1,
        'Links geht Cu als Cu²⁺ in die verdünntere Lösung. Rechts werden Cu²⁺-Ionen zu Cu reduziert. Elektronen fließen außen von links nach rechts, die Konzentrationen nähern sich einander an.',
        'Die Halbzelle mit höherem Reduktionspotenzial nimmt beim Entladen die Elektronen auf.')
    ], 'lk'),

  topic(electrochemistry, 'q12-faraday', 'Stoffumsatz und Verluste bei der Elektrolyse',
    table('Modell einer elektrolytischen Kupferabscheidung', ['Größe', 'Wert'], [
      ['Kathodenreaktion', 'Cu²⁺ + 2 e⁻ → Cu'], ['Geflossene Ladung', '1 930 C'],
      ['Konstanten', 'F ≈ 96 500 C/mol · M(Cu) ≈ 63,5 g/mol'], ['Gemessener Massenzuwachs', '0,508 g']
    ]), [
      question('Wie viel Kupfer könnte die gemessene Ladung bei 100 % Stromausbeute abscheiden?',
        ['1,27 g', '0,318 g', '0,635 g'], 2,
        '1 930 C / (96 500 C/mol) = 0,0200 mol Elektronen. Zwei Elektronen scheiden ein Cu-Atom ab. 0,0100 mol Cu × 63,5 g/mol = 0,635 g.',
        'Rechne die Ladung mit F in eine Stoffmenge Elektronen um. Nutze dann die Kathodenreaktion.'),
      question('Der Massenzuwachs beträgt 0,508 g. Welche Stromausbeute folgt für die Kupferabscheidung?',
        ['80 %', '125 %', '50 %'], 0,
        'Gemessene Masse / theoretische Masse = 0,508 g / 0,635 g = 0,800. Im Modell entfallen 80 % der Ladung auf die Abscheidung. Welche Nebenreaktion den übrigen Strom verbraucht hat, lässt sich aus der Masse allein nicht ablesen.',
        'Setze die gemessene Masse zur theoretisch möglichen Masse ins Verhältnis.')
    ], 'lk'),

  topic(electrochemistry, 'q12-ueberspannung', 'Theoretische und reale Elektrolysespannung',
    table('Wasserelektrolyse bei 25 °C, Standardzustände als thermodynamischer Bezug', ['Angabe', 'Spannung'], [
      ['Reversible Mindestspannung', '1,23 V'], ['Gerät A bei gewählter Stromdichte', '1,80 V'], ['Gerät B bei gleicher Stromdichte', '1,65 V']
    ]), [
      question('Warum braucht Gerät A im Betrieb 1,80 V, obwohl die reversible Spannung 1,23 V beträgt?',
        ['Überspannungen an den Elektroden und Spannungsabfälle an Widerständen kommen hinzu.', 'Ein Katalysator erhöht die reversible Spannung auf den Betriebswert.', 'Die höhere Spannung ergibt sich allein aus der größeren Wassermenge im Gerät.'], 0,
        'Für einen endlichen Strom sind zusätzliche Spannungen an den Elektroden nötig. Strom verursacht außerdem ohmsche Spannungsabfälle. Zusammen erklären diese Beiträge im Modell 1,80 V − 1,23 V = 0,57 V.',
        'Vergleiche das thermodynamische Gleichgewicht mit dem Betrieb bei fließendem Strom.'),
      question('Beide Geräte setzen dieselbe Ladung bei gleicher Stromausbeute um. Welches braucht für dieselbe Wasserstoffmenge weniger elektrische Energie?',
        ['A bei 1,80 V.', 'B bei 1,65 V.', 'Beide brauchen gleich viel.'], 1,
        'Für konstante Spannung gilt W = U · Q. Bei gleicher Ladung ist 1,65 V × Q kleiner als 1,80 V × Q. Der Vergleich bezieht sich auf die angegebenen Betriebsbedingungen.',
        'Welche Größe unterscheidet sich in W = U · Q?')
    ], 'lk'),

  topic(electrochemistry, 'q12-redoxtitration', 'Vitamin C mit einer Redoxtitration bestimmen',
    table('Modellprobe mit Ascorbinsäure als einzigem Reduktionsmittel', ['Größe', 'Wert'], [
      ['Probenvolumen', '10,0 mL'], ['Iodmaßlösung', '0,0200 mol/L I₂-Äquivalente'], ['Verbrauch am Endpunkt', '6,00 mL'],
      ['Elektronenumsatz', 'Ascorbinsäure gibt 2 e⁻ ab. I₂ nimmt 2 e⁻ auf und bildet 2 I⁻.']
    ]), [
      question('Wie groß ist die Konzentration der Ascorbinsäure in der Modellprobe?',
        ['3,33 mmol/L', '12,0 mmol/L', '24,0 mmol/L'], 1,
        'Verbraucht wurden 0,0200 mol/L × 0,00600 L = 0,000120 mol I₂. Das Stoffmengenverhältnis von Ascorbinsäure zu I₂ beträgt 1 : 1. Für 0,0100 L Probe folgt c = 0,0120 mol/L = 12,0 mmol/L.',
        'Leite aus den abgegebenen und aufgenommenen Elektronen das Stoffmengenverhältnis ab.'),
      question('Im Fruchtsaft reduziert auch ein anderer Stoff das Iod. Was ergibt sich, wenn die gesamte verbrauchte Iodmenge dem Vitamin C zugerechnet wird?',
        ['Ein zu niedriger Vitamin-C-Gehalt.', 'Der richtige Vitamin-C-Gehalt.', 'Ein zu hoher Vitamin-C-Gehalt.'], 2,
        'Der zweite Stoff verbraucht einen Teil des Iods. Wird auch dieser Verbrauch dem Vitamin C zugerechnet, erscheint dessen Gehalt zu hoch. Die Methode müsste beide Stoffe unterscheiden können.',
        'Vergleiche die Iodmenge für Vitamin C allein mit dem gesamten Iodverbrauch.')
    ], 'lk'),

  topic(electrochemistry, 'q12-freie-enthalpie', 'Freie Enthalpie und elektrische Arbeit',
    table('Reversibles galvanisches Modell unter Standardbedingungen', ['Größe', 'Wert'], [
      ['Zellspannung E°', '1,10 V'], ['Elektronen je Formelumsatz, z', '2'], ['Faraday-Konstante', '96 485 C/mol'],
      ['Verknüpfung', 'ΔᵣG° = −z·F·E°']
    ]), [
      question('Welche freie Standardreaktionsenthalpie ergibt sich pro Mol Formelumsatz?',
        ['etwa −212 kJ/mol', 'etwa −53 kJ/mol', 'etwa +212 kJ/mol'], 0,
        'ΔᵣG° = −2 × 96 485 C/mol × 1,10 V ≈ −212 000 J/mol = −212 kJ/mol. Unter Standardbedingungen ist die angegebene Entladereaktion thermodynamisch begünstigt.',
        'Verwende 1 V · C = 1 J und rechne das Ergebnis in kJ um.'),
      question('Wofür steht −ΔᵣG bei einer freiwillig entladenden Zelle mit konstantem Druck und konstanter Temperatur?',
        ['Für die Wärme, die jede reale Zelle pro Mol abgibt.', 'Für die höchstens gewinnbare elektrische Arbeit pro Mol Formelumsatz, wenn nur diese Nichtvolumenarbeit geleistet wird.', 'Für die Reaktionsgeschwindigkeit pro Mol Formelumsatz.'], 1,
        'Der reversible Grenzfall liefert die maximal nutzbare Nichtvolumenarbeit. Ist dies elektrische Arbeit, entspricht sie pro Mol Formelumsatz −ΔᵣG. Reale Verluste verringern die abgegebene elektrische Arbeit.',
        'Welche Energieform kann eine galvanische Zelle über ihre Pole nach außen abgeben?')
    ], 'lk')
];
