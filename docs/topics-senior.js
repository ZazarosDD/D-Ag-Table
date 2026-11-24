const organic = 'Reaktionswege in der organischen Chemie';
const materials = 'Moderne Werkstoffe';
const curriculum = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/gost_klp_ch_2022_06_07.pdf';

export const seniorTopics = [
  {
    id: 'q13-struktur',
    title: 'Stoffklassen an Bindungen und Molekülform erkennen',
    ref: organic,
    visual: {
      title: 'Vier Verbindungen mit je zwei C-Atomen',
      columns: ['Probe', 'Struktur', 'Strukturhinweis'],
      rows: [
        ['A', 'CH₃–CH₃', 'Jedes C-Atom hat vier Nachbaratome.'],
        ['B', 'HC≡CH', 'Jedes C-Atom hat zwei Nachbaratome.'],
        ['C', 'CH₃–CH₂–NH₂', 'Am N-Atom liegt ein freies Elektronenpaar.'],
        ['D', 'CH₃–CH₂–Cl', 'Ein C-Atom trägt ein Chloratom.'],
      ],
    },
    questions: [
      {
        prompt: 'Bei welcher Probe beträgt der H–C–C-Bindungswinkel 180°?',
        choices: ['A · Ethan', 'B · Ethin', 'D · Chlorethan'],
        answer: 1,
        hint: 'Zähle am mittleren C des Winkels die Richtungen, in die Bindungen zeigen. Eine Mehrfachbindung zählt als eine Richtung.',
        explanation: 'Beim Ethin hat jedes C-Atom zwei Bindungsbereiche. Im EPA-Modell liegen sie auf einer Geraden. Daraus ergibt sich für H–C≡C der Winkel 180°.',
      },
      {
        prompt: 'Welche Probe macht Wasser durch Protonenaufnahme basisch?',
        choices: ['B · Ethin', 'D · Chlorethan', 'C · Ethylamin'],
        answer: 2,
        hint: 'Eine Base braucht ein verfügbares Elektronenpaar, mit dem sie ein Proton binden kann. Suche die passende funktionelle Gruppe.',
        explanation: 'Das N-Atom der Aminogruppe kann ein Proton von Wasser aufnehmen. Dabei entstehen Ethylammonium- und Hydroxid-Ionen. CH₃CH₂NH₂ + H₂O ⇌ CH₃CH₂NH₃⁺ + OH⁻.',
      },
    ],
  },
  {
    id: 'q13-oxidation',
    title: 'Einen organischen Reaktionsweg aufklären',
    ref: organic,
    visual: {
      title: 'Vom Alkohol zur Carbonsäure. Das Gerüst aus drei C-Atomen bleibt erhalten.',
      columns: ['Probe', 'Struktur', 'Beobachtung im Modellversuch'],
      rows: [
        ['A', 'CH₃–CH₂–CH₂OH', 'Fehling-Probe negativ'],
        ['B', 'CH₃–CH₂–CHO', 'Fehling-Probe positiv (roter Niederschlag)'],
        ['C', 'CH₃–CH₂–COOH', 'Mit Hydrogencarbonat entsteht CO₂'],
      ],
    },
    questions: [
      {
        prompt: 'Propanal (B) wird zu Propansäure (C) oxidiert. Wie ändert sich die Oxidationszahl des C-Atoms in der –CHO-Gruppe?',
        choices: ['Von +I auf +III.', 'Von +III auf +I.', 'Von −I auf +I.'],
        answer: 0,
        hint: 'Betrachte in beiden Strukturen dasselbe endständige C-Atom. Eine C–C-Bindung trägt hier 0 zur Oxidationszahl bei.',
        explanation: 'Im Propanal zählt C=O doppelt positiv und C–H einfach negativ. Das ergibt +I. In der Carboxygruppe zählen C=O doppelt und C–O einfach positiv. Das ergibt +III.',
      },
      {
        prompt: 'Welche Art von Isomerie liegt bei Propanal (CH₃–CH₂–CHO) und Propanon (CH₃–CO–CH₃) vor?',
        choices: ['Es sind zwei Zeichnungen desselben Moleküls.', 'Es sind Konstitutionsisomere.', 'Es sind cis-trans-Isomere.'],
        answer: 1,
        hint: 'Vergleiche zuerst die Summenformeln. Prüfe dann, welche Atome am Carbonyl-C sitzen.',
        explanation: 'Beide haben die Summenformel C₃H₆O, aber unterschiedliche Verknüpfungen. Am Carbonyl-C trägt Propanal ein H-Atom, Propanon zwei C-Reste. Von diesen beiden Verbindungen bildet nur Propanal bei der Fehling-Probe roten Cu₂O-Niederschlag.',
      },
    ],
  },
  {
    id: 'q13-addition',
    title: 'Addition und Substitution unterscheiden',
    ref: organic,
    visual: {
      title: 'Zwei Reaktionen im Teilchenmodell',
      columns: ['Modell', 'Gesamtgleichung', 'Hinweis zum Verlauf'],
      rows: [
        ['A', 'CH₂=CH₂ + HBr → CH₃–CH₂Br', 'Das H-Atom in HBr ist positiv polarisiert.'],
        ['B', 'CH₄ + Cl₂ → CH₃Cl + HCl', 'Licht kann Cl₂ in zwei Chlorradikale spalten.'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Bindung entsteht im ersten Schritt der elektrophilen Addition von HBr an Ethen (A)?',
        choices: ['Eine C–Br-Bindung durch Angriff von Br⁻ auf neutrales Ethen.', 'Eine H–H-Bindung zwischen zwei Ethenmolekülen.', 'Eine C–H-Bindung aus dem π-Elektronenpaar des Ethens.'],
        answer: 2,
        hint: 'In HBr ist das H-Atom positiv polarisiert. Welcher Teil des Ethens kann ein Elektronenpaar für eine neue Bindung liefern?',
        explanation: 'Das π-Elektronenpaar bindet das H-Atom. Die H–Br-Bindung wird dabei heterolytisch gespalten. Br⁻ bindet anschließend an das positiv geladene C-Atom. Die C–C-Einfachbindung bleibt erhalten.',
      },
      {
        prompt: 'Welcher Schritt pflanzt die Radikalkette in Reaktion B fort?',
        choices: ['CH₃· + Cl₂ → CH₃Cl + Cl·', 'Cl· + Cl· → Cl₂', 'Cl₂ → 2 Cl· (durch Licht)'],
        answer: 0,
        hint: 'Der Punkt kennzeichnet ein Radikal. Bei der Kettenfortpflanzung wird ein Radikal verbraucht und ein neues gebildet.',
        explanation: 'Das Methylradikal übernimmt ein Cl-Atom aus Cl₂. Das verbleibende Chlorradikal kann einem weiteren Methanmolekül ein H-Atom entziehen. So läuft die Kette weiter.',
      },
    ],
  },
  {
    id: 'q13-fette',
    title: 'Fettsäuren vergleichen und Fette auswählen',
    ref: organic,
    visual: {
      title: 'Reine Fettsäuren mit 18 C-Atomen, gerundete Schmelzpunkte',
      columns: ['Fettsäure', 'C=C-Bindungen in der Kette', 'Schmelzpunkt'],
      rows: [
        ['Stearinsäure', '0', '69 °C'],
        ['Ölsäure', '1, cis', '13 °C'],
        ['Elaidinsäure', '1, trans', '45 °C'],
      ],
    },
    questions: [
      {
        prompt: 'Warum schmilzt Ölsäure bei einer niedrigeren Temperatur als Elaidinsäure?',
        choices: ['Die trans-Form hat eine längere Kohlenstoffkette.', 'Der Knick der cis-Form erschwert die dichte Packung.', 'An der cis-Doppelbindung können die Kettenstücke frei rotieren.'],
        answer: 1,
        hint: 'Beide Moleküle besitzen 18 C-Atome und eine Doppelbindung an derselben Stelle. Vergleiche die räumliche Form.',
        explanation: 'Ölsäure und Elaidinsäure sind cis-trans-Isomere. In der cis-Form zeigen die beiden Kettenstücke auf dieselbe Seite der C=C-Bindung. Die geknickten Moleküle packen im Feststoff weniger dicht als die trans-Form.',
      },
      {
        prompt: 'Drei Fette unterscheiden sich vor allem im häufigsten Fettsäurerest. Welches bleibt bei 20 °C am ehesten flüssig?',
        choices: ['Das Fett mit vielen Stearinsäureresten.', 'Das Fett mit vielen trans-Elaidinsäureresten.', 'Das Fett mit vielen cis-Ölsäureresten.'],
        answer: 2,
        hint: 'Übertrage den Einfluss der Kettenform auf die Packung der Fettmoleküle.',
        explanation: 'In Fetten sind Fettsäurereste an Glycerin verestert. Viele geknickte cis-Reste erschweren die Packung. Die Werte der reinen Fettsäuren erlauben eine Tendenz. Der genaue Schmelzbereich eines Fettes hängt von seiner Zusammensetzung ab.',
      },
    ],
  },
  {
    id: 'q13-ester',
    title: 'Ausbeute und Geschwindigkeit bei der Esterbildung',
    ref: organic,
    visual: {
      title: 'Esterbildung bei gleicher Temperatur. Anfangs sind weder Ester noch Wasser vorhanden.',
      columns: ['Ansatz', 'Ethansäure / Ethanol zu Beginn', 'Ester nach 10 min / im Gleichgewicht (gerundet)'],
      rows: [
        ['A', '1,00 mol / 1,00 mol', '0,10 mol / 0,67 mol'],
        ['B, mit Säurekatalysator', '1,00 mol / 1,00 mol', '0,55 mol / 0,67 mol'],
        ['C, mit Säurekatalysator', '1,00 mol / 2,00 mol', '0,76 mol / 0,85 mol'],
      ],
    },
    questions: [
      {
        prompt: 'Was zeigen die Ansätze A und B über die Wirkung des Katalysators?',
        choices: ['Nach 10 min ist mehr Ester entstanden. Die Gleichgewichtsmenge bleibt gleich.', 'Nach 10 min ist gleich viel Ester entstanden. Die Gleichgewichtsmenge steigt.', 'Sowohl nach 10 min als auch im Gleichgewicht ist mehr Ester vorhanden.'],
        answer: 0,
        hint: 'Lies für A und B jeweils beide Messzeitpunkte.',
        explanation: 'Nach 10 min enthält B bereits 0,55 mol Ester, A erst 0,10 mol. Im Gleichgewicht enthalten beide 0,67 mol. Der Katalysator beschleunigt Hin- und Rückreaktion. Bei gleicher Temperatur bleibt die Gleichgewichtskonstante gleich.',
      },
      {
        prompt: 'Warum reagiert in C ein größerer Anteil der eingesetzten Ethansäure als in B?',
        choices: ['C enthält zu Beginn mehr Ethansäure.', 'Der Ethanolüberschuss begünstigt die Bildung von Ester und Wasser.', 'Der Säurekatalysator ist nur in C vorhanden.'],
        answer: 1,
        hint: 'Vergleiche die Startmengen und den Katalysator in B und C. Welcher Faktor wurde verändert?',
        explanation: 'In B und C startet je 1,00 mol Ethansäure. C enthält doppelt so viel Ethanol. Durch die Verschiebung des Gleichgewichts entstehen 0,85 statt 0,67 mol Ester. Das entspricht rund 85 % statt 67 % Säureumsatz.',
      },
    ],
  },
  {
    id: 'q13-ketten',
    title: 'Vom Alken zur Kunststoffkette',
    ref: materials,
    visual: {
      title: 'Monomere und zwei Ausschnitte aus Kunststoffketten',
      columns: ['Stoff oder Kette', 'Struktur'],
      rows: [
        ['Ethen', 'CH₂=CH₂'],
        ['Propen', 'CH₂=CH–CH₃'],
        ['Kette A', '…–CH₂–CH₂–CH₂–CH₂–…'],
        ['Kette B', '…–CH₂–CH(CH₃)–CH₂–CH(CH₃)–…'],
      ],
    },
    questions: [
      {
        prompt: 'Aus welchem Monomer entsteht Kette B durch Polymerisation?',
        choices: ['Ethen · CH₂=CH₂', 'But-1-en · CH₂=CH–CH₂–CH₃', 'Propen · CH₂=CH–CH₃'],
        answer: 2,
        hint: 'Suche den Seitenrest an jedem zweiten C-Atom im Kettenrückgrat.',
        explanation: 'Der Seitenrest ist CH₃. Er stammt vom Propen. Die beiden C-Atome der früheren Doppelbindung sind Teil des Kettenrückgrats. Die Einheit –CH₂–CH(CH₃)– wiederholt sich.',
      },
      {
        prompt: '100 Ethenmoleküle werden in Kette A eingebaut. Wie viele C-Atome liefern sie?',
        choices: ['100 C-Atome.', '200 C-Atome.', '400 C-Atome.'],
        answer: 1,
        hint: 'Zähle die C-Atome in einem Ethenmolekül. Bei dieser Polymerisation bleiben sie alle erhalten.',
        explanation: 'Jedes Ethenmolekül liefert zwei C-Atome. 100 × 2 = 200. Die Wiederholungseinheit in Polyethylen lautet –CH₂–CH₂–.',
      },
    ],
  },
  {
    id: 'q13-vernetzung',
    title: 'Welcher Kunststoff passt zu Deckel und Dichtung?',
    ref: materials,
    visual: {
      title: 'Befunde an drei Kunststoffproben',
      columns: ['Probe', 'Beobachtung', 'Kettenmodell'],
      rows: [
        ['A', 'Erweicht und lässt sich erneut formen.', 'Lange Ketten, ohne feste Querverbindungen'],
        ['B', 'Dehnt sich und kehrt nach dem Loslassen zurück.', 'Weitmaschiges kovalentes Netz'],
        ['C', 'Bleibt beim Erwärmen formstabil und zersetzt sich bei starker Hitze.', 'Engmaschiges kovalentes Netz'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Probe eignet sich für einen Deckel, dessen saubere Materialreste erneut warm geformt werden sollen?',
        choices: ['Probe A.', 'Probe B.', 'Probe C.'],
        answer: 0,
        hint: 'Suche ein Material, dessen Ketten sich beim Erwärmen dauerhaft gegeneinander verschieben können.',
        explanation: 'A ist ein Thermoplast. Seine Ketten besitzen keine festen Querverbindungen. Beim Erwärmen können sie gegeneinander gleiten. Saubere, sortenreine Reste lassen sich so erneut formen.',
      },
      {
        prompt: 'Warum nimmt eine Dichtung aus Probe B nach dem Dehnen wieder ihre Form an?',
        choices: ['Die Ketten gleiten dauerhaft aneinander vorbei.', 'Ein engmaschiges Netz fixiert die Abschnitte in gestreckter Lage.', 'Bewegliche Kettenstücke können sich zurückknäueln. Wenige Querverbindungen halten das Netz zusammen.'],
        answer: 2,
        hint: 'Überlege, was zwischen zwei festen Verknüpfungen mit einem beweglichen Kettenstück geschieht.',
        explanation: 'B ist ein Elastomer. Beim Dehnen richten sich Kettenstücke aus. Nach dem Loslassen nehmen sie wieder stärker geknäuelte Formen an. Die Vernetzung verhindert, dass die Ketten dauerhaft auseinander gleiten.',
      },
    ],
  },
  {
    id: 'q13-quellgel',
    title: 'Wie ein Funktionspolymer Wasser speichert',
    ref: materials,
    visual: {
      title: 'Modellversuch mit je 1,0 g trockenem, vernetztem Natriumpolyacrylat',
      columns: ['Flüssigkeit im Überschuss', 'Masse des Gels nach gleicher Quellzeit'],
      rows: [
        ['Entsalztes Wasser', '121 g'],
        ['Verdünnte Natriumchloridlösung', '31 g'],
      ],
    },
    questions: [
      {
        prompt: 'Wie vielmal so viel Flüssigkeit nimmt das Gel in entsalztem Wasser auf wie in der Salzlösung?',
        choices: ['3,9-mal.', '4,0-mal.', '90-mal.'],
        answer: 1,
        hint: 'Die Waage erfasst auch das trockene Polymer. Welche Masse musst du bei beiden Proben abziehen?',
        explanation: 'Aus 121 g Gel und 1,0 g Polymer folgen 120 g aufgenommenes Wasser. In der Salzlösung sind es 31 g − 1,0 g = 30 g Flüssigkeit. Das Verhältnis der aufgenommenen Massen ist 120 : 30 = 4.',
      },
      {
        prompt: 'Warum nimmt das Polymer aus der Salzlösung weniger Flüssigkeit auf?',
        choices: ['Salz schwächt die Abstoßung der geladenen Gruppen und den osmotischen Antrieb.', 'Salz erhöht den osmotischen Antrieb zur Wasseraufnahme.', 'Die Natrium-Ionen knüpfen zusätzliche kovalente Querverbindungen zwischen den Ketten.'],
        answer: 0,
        hint: 'Überlege, was die Ionen außerhalb des Gels für den Konzentrationsunterschied und die elektrischen Ladungen bedeuten.',
        explanation: 'Im Gel sitzen negative Carboxylatgruppen fest an den Ketten. Die Gegenionen sind beweglich. Salz in der Außenlösung schirmt Ladungen ab und verringert den Unterschied im osmotischen Druck. Das Gel quillt weniger stark.',
      },
    ],
  },
  {
    id: 'q13-kreislauf',
    title: 'Verpackungen sortieren und ihren Lebensweg bewerten',
    ref: materials,
    visual: {
      title: 'Modell einer Sammelcharge, reine kompakte Flakes',
      columns: ['Material', 'Masse', 'Dichte'],
      rows: [
        ['PE aus fossilem oder biogenem Ethen', '600 kg', '0,95 g/cm³'],
        ['PET', '400 kg', '1,37 g/cm³'],
        ['Wasser als Trennmedium', '–', '1,00 g/cm³'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Kunststoffmasse schwimmt im idealen Trennbecken auf dem Wasser?',
        choices: ['400 kg PET.', '1.000 kg aus PE und PET.', '600 kg PE.'],
        answer: 2,
        hint: 'Vergleiche die Dichte jedes Materials mit 1,00 g/cm³.',
        explanation: 'PE ist mit 0,95 g/cm³ weniger dicht als Wasser und schwimmt. PET mit 1,37 g/cm³ sinkt. Im Modell entstehen so 600 kg sauberes PE als schwimmende Fraktion.',
      },
      {
        prompt: 'Zwei PE-Verpackungen erfüllen dieselbe Aufgabe gleich lange. Welcher Vergleich hilft bei der Wahl zwischen fossilem und biogenem PE?',
        choices: ['Nur die Herkunft der Kohlenstoffatome vergleichen.', 'Gewinnung, Herstellung, Nutzung und Verwertung pro gleicher Verpackungsleistung vergleichen.', 'Nur die pro Kilogramm gewinnbare Verbrennungswärme vergleichen.'],
        answer: 1,
        hint: 'Lege für beide Verpackungen zuerst dieselbe Vergleichseinheit fest.',
        explanation: 'Bei gleichem Aufbau hat PE aus beiden Quellen dieselben Materialeigenschaften. Eine tragfähige Bewertung betrachtet den ganzen Lebensweg, etwa Rohstoffbedarf, Emissionen, Kosten und Arbeitsbedingungen. Biogener Ursprung allein macht PE noch nicht kompostierbar.',
      },
    ],
  },
  {
    id: 'q13-substitution',
    title: 'Substitutionsmechanismen an Messdaten erkennen',
    course: 'lk',
    ref: organic,
    materialSource: { label: 'OpenStax · Kinetik und räumlicher Verlauf von SN2', url: 'https://openstax.org/books/organic-chemistry/pages/11-2-the-sn2-reaction' },
    visual: {
      title: 'Relative Anfangsgeschwindigkeiten zweier Substitutionen bei konstanter Temperatur',
      columns: ['Konzentration von Substrat / Nucleophil', 'Reaktion A', 'Reaktion B'],
      rows: [
        ['Beide unverändert', '1', '1'],
        ['Nur Substrat verdoppelt', '2', '2'],
        ['Nur Nucleophil verdoppelt', '2', '1'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Zuordnung von SN1 und SN2 passt zu den gemessenen Anfangsgeschwindigkeiten?',
        choices: ['A passt zu SN2, B zu SN1.', 'A passt zu SN1, B zu SN2.', 'A und B passen beide zu SN2.'],
        answer: 0,
        hint: 'Vergleiche besonders die Messungen, in denen nur die Nucleophilkonzentration verdoppelt wurde.',
        explanation: 'Bei A verdoppelt sich die Rate, wenn entweder die Substrat- oder die Nucleophilkonzentration verdoppelt wird. Das passt zu SN2. Bei B ändert nur die Substratkonzentration die gemessene Rate. Das passt zu SN1. Die Daten stützen diese Modelle, beweisen den Mechanismus aber nicht allein.',
      },
      {
        prompt: 'Am reagierenden C-Atom sitzen vier verschiedene Substituenten. Wie verändert ein SN2-Rückseitenangriff deren räumliche Anordnung?',
        choices: ['Das Produkt entsteht zwingend als 1 : 1-Gemisch beider Spiegelbilder.', 'Die drei verbleibenden Gruppen behalten ihre Anordnung relativ zur eintretenden Gruppe bei.', 'Die räumliche Anordnung am Reaktionszentrum kehrt sich um.'],
        answer: 2,
        hint: 'Stell dir das Nucleophil auf der gegenüberliegenden Seite der abgehenden Gruppe vor.',
        explanation: 'Beim Rückseitenangriff entsteht am reagierenden C-Atom eine Inversion. Ob der Buchstabe R oder S nach der Reaktion wechselt, hängt zusätzlich von den Prioritäten der Substituenten ab.',
      },
    ],
  },
  {
    id: 'q13-aromaten',
    title: 'Bindungslängen und Reaktivität im Benzolring',
    course: 'lk',
    ref: organic,
    visual: {
      title: 'C–C-Abstände in drei Molekülen, gerundet',
      columns: ['Molekül', 'C–C-Abstand', 'Anordnung'],
      rows: [
        ['Ethan', '154 pm', 'Einfachbindung'],
        ['Ethen', '134 pm', 'Doppelbindung'],
        ['Benzol', '139 pm an allen sechs Positionen', 'Ebener Sechsring'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Beschreibung erklärt die sechs gleichen C–C-Abstände im Benzolring?',
        choices: ['Das Molekül wechselt fortlaufend zwischen zwei unterschiedlichen Ringstrukturen.', 'Sechs π-Elektronen sind über den Ring delokalisiert.', 'Jede C–C-Bindung entspricht einer isolierten Einfachbindung wie in Ethan.'],
        answer: 1,
        hint: 'Vergleiche alle sechs Ringabstände mit den Werten von Ethan und Ethen.',
        explanation: '139 pm liegt zwischen den Vergleichswerten von Einfach- und Doppelbindung. Alle sechs C–C-Bindungen sind gleichwertig. Die mesomeren Grenzformeln zeigen verschiedene Zeichnungen derselben Elektronenstruktur.',
      },
      {
        prompt: 'Nach dem Angriff von E⁺ am Benzolring ist ein σ-Komplex entstanden. Welcher Schritt führt zum Substitutionsprodukt C₆H₅E?',
        choices: ['Am angegriffenen C-Atom wird ein Proton abgegeben.', 'Ein zweites Elektrophil addiert sich an das Nachbaratom.', 'Das angegriffene C-Atom gibt ein Hydrid-Ion H⁻ ab.'],
        answer: 0,
        hint: 'Suche den Schritt, bei dem die sechs π-Elektronen im Ring wieder delokalisiert werden können.',
        explanation: 'Eine Base nimmt am C-Atom mit dem neuen Rest E ein Proton auf. Das Elektronenpaar der C–H-Bindung wird Teil des π-Systems. Der Ring wird wieder aromatisch.',
      },
    ],
  },
  {
    id: 'q13-farbstoffe',
    title: 'Farbstoffe durch Chromatografie und Spektren untersuchen',
    course: 'lk',
    ref: organic,
    materialSource: { label: 'University of Wisconsin–Madison · Dünnschichtchromatografie', url: 'https://www2.chem.wisc.edu/deptfiles/OrgLab/handouts/CHEM%20344%20TLC%20info.pdf' },
    visual: {
      title: 'Modellmessungen derselben Dünnschichtplatte, Laufmittelfront bei 8,0 cm',
      columns: ['Probe', 'Fleckabstand vom Start', 'Stärkste sichtbare Absorption'],
      rows: [
        ['Referenz A (–N=N– zwischen aromatischen Ringen)', '2,0 cm', 'ca. 450 nm (blau)'],
        ['Referenz B', '6,0 cm', 'ca. 590 nm (gelborange)'],
        ['Tintenprobe', '2,0 cm und 6,0 cm', 'Maxima bei ca. 450 und 590 nm'],
      ],
    },
    questions: [
      {
        prompt: 'Welche Aussage über die Tinte stützen Chromatogramm und Absorptionsmessung?',
        choices: ['Die beiden Rf-Werte betragen 2,0 und 6,0.', 'Die zwei Flecken zeigen, dass genau ein reiner Farbstoff vorliegt.', 'Die Flecken und Absorptionsmaxima sind mit Farbstoffen A und B vereinbar.'],
        answer: 2,
        hint: 'Berechne jeden Rf-Wert aus Fleckabstand geteilt durch Frontabstand. Vergleiche zusätzlich die Absorptionsmaxima.',
        explanation: 'Für die Tinte gilt Rf = 2,0/8,0 = 0,25 und 6,0/8,0 = 0,75. Auch ihre Absorptionsmaxima stimmen mit denen der Referenzen überein. Andere Stoffe können unter denselben Bedingungen ähnliche Werte liefern. Eine eindeutige Strukturzuordnung erfordert weitere Befunde.',
      },
      {
        prompt: 'Referenz A absorbiert besonders stark bei 450 nm. Welche Aussage zu diesem Azofarbstoff passt?',
        choices: ['Die Probe muss blau erscheinen, weil sie blaues Licht absorbiert.', 'Die N=N-Gruppe ist Teil eines konjugierten π-Systems. Im durchgelassenen Licht ist der Blauanteil vermindert.', 'Die Wellenlänge 450 nm ist für jeden Azofarbstoff gleich.'],
        answer: 1,
        hint: 'Unterscheide den Spektralanteil, den die Probe absorbiert, vom Licht, das nach dem Durchgang das Auge erreicht.',
        explanation: 'Eine Azogruppe (–N=N–) verbindet hier zwei aromatische Systeme. Sichtbares Licht kann die delokalisierten Elektronen anregen. Bei 450 nm wird besonders viel blaues Licht absorbiert. Für den Farbeindruck zählt das gesamte verbleibende Spektrum.',
      },
    ],
  },
  {
    id: 'q13-katalyse',
    title: 'Zwei technische Wege zu Polyethylen',
    course: 'lk',
    ref: materials,
    visual: {
      title: 'Industrieverfahren im vereinfachten Vergleich',
      columns: ['Route', 'Kettenwachstum', 'Typisches Produkt'],
      rows: [
        ['A, radikalische Polymerisation', 'Radikalisches Kettenende addiert Ethen.', 'Stärker verzweigte Ketten (LDPE)'],
        ['B, Koordinationspolymerisation', 'Ethen bindet über seine π-Elektronen an ein Metallzentrum und wird in die Metall–C-Bindung eingefügt.', 'Unter geeigneten Bedingungen weitgehend lineare Ketten (HDPE)'],
      ],
    },
    questions: [
      {
        prompt: 'Zwei radikalische Kettenenden bilden miteinander eine kovalente Bindung. Zu welcher Phase gehört dieser Schritt?',
        choices: ['Kettenabbruch durch Kombination.', 'Kettenstart.', 'Kettenfortpflanzung durch Monomeraddition.'],
        answer: 0,
        hint: 'Verfolge die beiden ungepaarten Elektronen vor und nach dem Schritt.',
        explanation: 'Die zwei ungepaarten Elektronen bilden ein Bindungspaar. Beide radikalischen Kettenenden sind damit verbraucht. Die Kombination ist eine mögliche Form des Kettenabbruchs.',
      },
      {
        prompt: 'Für ein Bauteil werden dicht packende PE-Ketten gesucht. Was spricht im dargestellten Verfahren für Route B?',
        choices: ['Der Katalysator erhöht die Gleichgewichtskonstante der Polymerisation.', 'Jede C–C-Bindung der Kette enthält nach der Reaktion ein Metallatom.', 'Der gesteuerte Einbau von Ethen kann weitgehend unverzweigte Ketten liefern.'],
        answer: 2,
        hint: 'Vergleiche die Kettenverzweigung in den Produktspalten.',
        explanation: 'Ethen koordiniert am Metallzentrum und wird in die Metall–C-Bindung eingefügt. Im dargestellten Verfahren entstehen weitgehend lineare Ketten, die dicht packen können. Für die Umweltbewertung des Verfahrens wären außerdem Energie-, Rohstoff- und Abfalldaten nötig.',
      },
    ],
  },
  {
    id: 'q13-nanoflaechen',
    title: 'Nanostrukturen und wasserabweisende Oberflächen',
    course: 'lk',
    ref: materials,
    materialSource: { label: 'Experimentalstudie · Benetzung und Selbstreinigung', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5137015/' },
    visual: {
      title: 'Zwei Modelle für Oberflächen',
      columns: ['Vergleich', 'Ausgangszustand', 'Veränderung'],
      rows: [
        ['Würfel aus demselben Stoff', 'Ein Würfel mit 100 nm Kantenlänge', 'Zerlegt in frei liegende Würfel mit je 10 nm Kantenlänge'],
        ['Gleich beschichtete Proben, Modellmessung', 'Glatte wasserabweisende Fläche, Kontaktwinkel 105°', 'Mikro- und nanostrukturierte Fläche, Kontaktwinkel 155°'],
      ],
    },
    questions: [
      {
        prompt: 'Um welchen Faktor ändert sich die gesamte zugängliche Oberfläche beim Zerteilen in frei liegende 10-nm-Würfel?',
        choices: ['Faktor 1.', 'Faktor 10.', 'Faktor 1.000.'],
        answer: 1,
        hint: 'Berechne zuerst die Zahl der kleinen Würfel. Die Oberfläche eines einzelnen Würfels ist 6 · a².',
        explanation: 'Der Ausgangswürfel hat 6 × (100 nm)² = 60.000 nm² Oberfläche. Die 1.000 kleinen Würfel haben zusammen 1.000 × 6 × (10 nm)² = 600.000 nm². Bei gleicher Gesamtmasse wächst die zugängliche Fläche auf das Zehnfache.',
      },
      {
        prompt: 'Die strukturierte Beschichtung wird als selbstreinigend beworben. Welcher Test prüft diese Behauptung unmittelbar?',
        choices: ['Nur den Kontaktwinkel der trockenen, sauberen Probe erneut messen.', 'Nur die Oberflächenstruktur bei stärkerer Vergrößerung betrachten.', 'Bei gleicher Verschmutzung und Neigung messen, wie viel Schmutz abrollende Wassertropfen mitnehmen.'],
        answer: 2,
        hint: 'Welches Messergebnis würde direkt zeigen, dass Schmutz von einer Fläche verschwindet?',
        explanation: 'Ein Kontaktwinkel von 155° deutet auf geringe Benetzung hin. Ob Tropfen abrollen und Schmutz mitnehmen, ist eine weitere Frage. Vergleiche dafür beide Flächen bei gleicher Schmutz- und Wassermenge und gleicher Neigung.',
      },
    ],
  },
].map(topic => {
  const page = topic.ref === organic
    ? (topic.course === 'lk' ? 53 : 43)
    : (topic.course === 'lk' ? 55 : 45);
  return { ...topic, year: 13, source: curriculum + '#page=' + page };
});
