const gymChemistry = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/g9_ch_klp_3415_2019_06_23.pdf';
const geChemistry = 'https://lehrplannavigator.nrw.de/system/files/media/document/file/klp_ge_nw.pdf';

function juniorTable(title, columns, rows) {
  return { title, columns, rows };
}

function juniorQuestion(prompt, choices, answer, explanation, hint) {
  return { prompt, choices, answer, explanation, hint };
}

export const juniorTopics = [
  {
    id: 'j7-stoffeigenschaften', year: 7, title: 'Welches Metall ist das?',
    ref: 'Gym. IF 1 · GE IF 1', source: gymChemistry + '#page=20',
    visual: juniorTable('Metallwürfel mit jeweils 10 cm³ Volumen, gerundete Massen', ['Metall', 'Masse', 'Farbe'], [
      ['Aluminium', '27 g', 'silbrig'],
      ['Eisen', '79 g', 'silbrig bis grau'],
      ['Kupfer', '90 g', 'rötlich'],
    ]),
    questions: [
      juniorQuestion('Ein silbriges Stück Metall hat ein Volumen von 20 cm³ und eine Masse von 54 g. Welches Metall passt zur Tabelle?', [
        'Aluminium',
        'Eisen',
        'Kupfer',
      ], 0, 'Die Tabelle vergleicht 10 cm³. Die Hälfte des Stücks hat dieses Volumen und eine Masse von 27 g. Das passt zu Aluminium.',
        'Bringe die Probe und die Tabellenwerte auf dasselbe Volumen.'),
      juniorQuestion('Zwei silbrige Metallstücke sind unterschiedlich groß. Wie berechnest du für jedes die Dichte in g/cm³?', [
        'Die Massen direkt vergleichen.',
        'Für beide das Volumen durch die Masse teilen.',
        'Für beide die Masse durch das Volumen teilen.',
      ], 2, 'Die Dichte ist Masse pro Volumen. Ihr Wert in g/cm³ lässt sich auch bei unterschiedlich großen Stücken vergleichen.',
        'Welche Einheit hat die Dichte, wenn du Gramm und Kubikzentimeter verwendest?'),
    ],
  },
  {
    id: 'j7-etikett', year: 7, title: 'Ein Gefahrstoffetikett lesen',
    ref: 'Sicheres Arbeiten · Gym. IF 1 · GE IF 1', source: gymChemistry + '#page=20',
    materialSource: { label: 'ECHA · Angaben auf dem Kennzeichnungsetikett', url: 'https://echa.europa.eu/de/what-does-the-label-contain' },
    visual: juniorTable('Ausschnitt aus einem Übungsetikett', ['Kennzeichnung', 'Auf der Probe steht'], [
      ['Piktogramm', 'GHS07 · Ausrufezeichen'], ['Signalwort', 'Achtung'],
      ['Gefahrenhinweis H319', 'Verursacht schwere Augenreizung.'],
    ]),
    questions: [
      juniorQuestion('Das Etikett warnt vor schwerer Augenreizung. Was schützt die Augen beim Arbeiten mit der Probe?', [
        'Die Probe vor hellem Licht schützen.',
        'Eine geeignete Schutzbrille tragen.',
        'Nur die eigenen Hände vor Spritzern schützen.',
      ], 1, 'Eine geeignete Schutzbrille hält Spritzer von den Augen fern. Die Lehrkraft erklärt die Schutzmaßnahmen für den Versuch.',
        'Welchen Teil des Körpers nennt der Gefahrenhinweis H319?'),
      juniorQuestion('Auf zwei Flaschen steht ein Ausrufezeichen. Wie findest du heraus, welche konkrete Gefahr für jede Probe angegeben ist?', [
        'Auf beiden Etiketten die Gefahrenhinweise lesen.',
        'Nur das Wort „Achtung“ auf beiden Etiketten vergleichen.',
        'Allein aus dem gleichen Bild auf die gleiche Gefahr schließen.',
      ], 0, 'Das Ausrufezeichen kann auf verschiedene Gefahren hinweisen. Der Text des Gefahrenhinweises beschreibt die jeweilige Wirkung.',
        'Vergleiche, was du allein aus dem Bild und was du aus dem Satz daneben erfährst.'),
    ],
  },
  {
    id: 'j7-teilchen', year: 7, title: 'Fest, flüssig oder gasförmig im Teilchenmodell',
    ref: 'Gym. IF 1 · GE IF 1', source: gymChemistry + '#page=20',
    visual: juniorTable('Derselbe reine Stoff in drei Zuständen', ['Modell', 'Teilchenanordnung und Bewegung'], [
      ['A', 'Die Teilchen sitzen dicht an festen Plätzen und schwingen.'],
      ['B', 'Die Teilchen liegen dicht beieinander und können aneinander vorbeigleiten.'],
      ['C', 'Die Teilchen sind weit voneinander entfernt und bewegen sich frei im Raum.'],
    ]),
    questions: [
      juniorQuestion('Wasser nimmt die Form eines Kruges an. Sein Volumen ändert sich beim Umgießen kaum. Welches Modell erklärt beides?', [
        'A. Die Teilchen schwingen um feste Plätze.',
        'C. Die Teilchen bewegen sich mit großen Abständen.',
        'B. Die Teilchen liegen dicht und können ihre Plätze wechseln.',
      ], 2, 'Die Wasserteilchen bleiben nahe beieinander. Beim Umgießen gleiten sie aneinander vorbei, sodass die Flüssigkeit die neue Form annimmt.',
        'Suche das Modell, das Nähe und Beweglichkeit zugleich zeigt.'),
      juniorQuestion('Ein reiner Stoff verdampft. Was änderst du in deiner Zeichnung einer gleich großen Teilchenzahl?', [
        'Die Größe jedes Teilchens.',
        'Den mittleren Abstand zwischen den Teilchen.',
        'Die Art der Teilchen.',
      ], 1, 'Beim Verdampfen bleibt der Stoff derselbe. Seine Teilchen verteilen sich im Gas mit größerem mittlerem Abstand.',
        'Beim Zustandswechsel bleiben die Stoffteilchen erhalten.'),
    ],
  },
  {
    id: 'j7-trennen', year: 7, title: 'Sand, Salz und Wasser trennen',
    ref: 'Gym. IF 1 · GE IF 1', source: gymChemistry + '#page=20',
    visual: juniorTable('Eine Wasserprobe mit Sand und gelöstem Kochsalz', ['Trennschritt', 'Beobachtung'], [
      ['Filtrieren', 'Sand bleibt im Filter. Die klare Flüssigkeit enthält noch Salz.'],
      ['Verdunsten', 'Wasser geht in die Luft über. Salzkristalle bleiben zurück.'],
      ['Destillieren', 'Wasserdampf wird abgekühlt. Flüssiges Wasser sammelt sich getrennt vom Salz.'],
    ]),
    questions: [
      juniorQuestion('Du willst Sand, Salz und Wasser einzeln zurückgewinnen. Welche Reihenfolge passt?', [
        'Zuerst filtrieren, dann die klare Flüssigkeit erneut filtrieren.',
        'Zuerst filtrieren, dann das Salzwasser destillieren.',
        'Zuerst das Wasser verdunsten lassen, dann den Rückstand sieben.',
      ], 1, 'Im Filter bleibt der Sand. Bei der Destillation verdampft das Wasser und wird nach dem Abkühlen aufgefangen. Das Salz bleibt im ersten Gefäß.',
        'Verfolge jeden der drei Stoffe. In welchem Schritt fängst du auch das Wasser auf?'),
      juniorQuestion('Wasserdampf bildet Tropfen an einer kühlen Fläche. Was geschieht mit seinen Teilchen?', [
        'Die Wasserteilchen rücken näher zusammen.',
        'Jedes Wasserteilchen wird kleiner.',
        'Aus Wasserteilchen entstehen Salzteilchen.',
      ], 0, 'Beim Kondensieren wird aus gasförmigem Wasser flüssiges Wasser. Der Abstand der Teilchen wird kleiner, ihre Größe bleibt gleich.',
        'Vergleiche im Modell den Abstand der Teilchen mit der Größe eines einzelnen Teilchens.'),
    ],
  },
  {
    id: 'j7-reaktion', year: 7, title: 'Neue Stoffe und Energie',
    ref: 'Gym. IF 2 · GE IF 2', source: gymChemistry + '#page=21',
    visual: juniorTable('Drei Beobachtungen im Alltag', ['Vorgang', 'Was sich beobachten lässt'], [
      ['Kerzenwachs schmilzt', 'Das flüssige Wachs wird beim Abkühlen wieder fest.'],
      ['Kerzenwachs verbrennt', 'Nach dem Anzünden entstehen unter anderem Wasser und Kohlenstoffdioxid.'],
      ['Ein Eisenstück rostet', 'Auf dem Metall bildet sich allmählich rotbrauner Rost.'],
    ]),
    questions: [
      juniorQuestion('Bei welchen beiden Vorgängen entstehen neue Stoffe?', [
        'Wachs schmilzt und Eisen rostet.',
        'Wachs schmilzt und Wachs verbrennt.',
        'Wachs verbrennt und Eisen rostet.',
      ], 2, 'Beim Verbrennen entstehen unter anderem Wasser und Kohlenstoffdioxid. Beim Rosten bildet sich Rost. Geschmolzenes Wachs ist weiterhin Wachs.',
        'Prüfe bei jedem Vorgang, welcher Stoff anschließend vorliegt.'),
      juniorQuestion('Warum muss man eine Kerze erst anzünden, obwohl sie beim Brennen Wärme abgibt?', [
        'Die gesamte später abgegebene Wärme stammt vom Streichholz.',
        'Zum Start braucht die Reaktion Energie. Danach setzt die Verbrennung Energie frei.',
        'Das Wachs gibt ausschließlich die beim Schmelzen gespeicherte Wärme ab.',
      ], 1, 'Die zum Start nötige Energie heißt Aktivierungsenergie. Anschließend setzt die Reaktion von Wachs mit Sauerstoff Energie als Wärme und Licht frei.',
        'Unterscheide den Start der Reaktion von ihrem weiteren Verlauf.'),
    ],
  },
  {
    id: 'j7-verbrennung', year: 7, title: 'Wohin geht die Masse beim Verbrennen?',
    ref: 'Gym. IF 3 · GE IF 2 und 4', source: gymChemistry + '#page=22',
    visual: juniorTable('Vollständige Verbrennung von Kohlenstoff im geschlossenen Modellgefäß', ['Stoff', 'Vorher', 'Nachher'], [
      ['Kohlenstoff', '6 g', '0 g'],
      ['Sauerstoff', '20 g', '4 g'],
      ['Kohlenstoffdioxid', '0 g', '?'],
    ]),
    questions: [
      juniorQuestion('Wie viel Kohlenstoffdioxid entsteht im geschlossenen Gefäß?', [
        '6 g',
        '22 g',
        '26 g',
      ], 1, '16 g Sauerstoff reagieren mit 6 g Kohlenstoff. So entstehen 22 g Kohlenstoffdioxid. Weitere 4 g Sauerstoff bleiben übrig.',
        'Berechne zuerst, wie viel Sauerstoff verbraucht wird.'),
      juniorQuestion('Holzkohle glüht an der Luft und wird leichter. Wohin gelangt ein großer Teil ihres Kohlenstoffs?', [
        'Als Kohlenstoffdioxid in die Luft.',
        'Als Sauerstoffgas in die Luft.',
        'Als fester Kohlenstoff in die zurückbleibende Asche.',
      ], 0, 'Kohlenstoff reagiert mit Sauerstoff. Das gasförmige Kohlenstoffdioxid entweicht. Beim Wiegen der Kohle fehlt dann die Masse des abgegebenen Kohlenstoffs.',
        'Welche Produkte erfasst eine Waage unter einem offenen Gefäß?'),
    ],
  },
  {
    id: 'j7-luft-wasser', year: 7, title: 'Was unterscheidet Luft von reinem Wasser?',
    ref: 'Gym. IF 3 · GE IF 4', source: geChemistry + '#page=83',
    visual: juniorTable('Trockene Luft und reines Wasser im Vergleich', ['Stoffprobe', 'Woraus besteht sie?'], [
      ['100 L trockene Luft', 'Rund 78 L Stickstoff, 21 L Sauerstoff und 1 L weitere Gase.'],
      ['Reines Wasser', 'Jedes Wassermolekül enthält zwei Wasserstoffatome und ein Sauerstoffatom.'],
      ['Zerlegung von Wasser', 'Bei der Elektrolyse entstehen die Gase Wasserstoff und Sauerstoff.'],
    ]),
    questions: [
      juniorQuestion('Eine Sporthalle enthält 2 000 m³ trockene Luft. Welches Volumen entfällt ungefähr auf Sauerstoff?', [
        '420 m³',
        '1 560 m³',
        '20 m³',
      ], 0, 'Sauerstoff macht etwa 21 % des Luftvolumens aus. 0,21 × 2 000 m³ = 420 m³.',
        'Lies den Sauerstoffanteil für 100 L ab und übertrage den Anteil auf die Halle.'),
      juniorQuestion('Was geschieht mit reinem Wasser bei einer Destillation?', [
        'Wasserstoff und Sauerstoff kondensieren getrennt.',
        'Es bildet sich Sauerstoffgas, während flüssiges Wasser zurückbleibt.',
        'Wasser verdampft und kondensiert wieder als Wasser.',
      ], 2, 'Die Wasserteilchen bleiben bei der Destillation erhalten. Um Wasser in die Elemente Wasserstoff und Sauerstoff zu zerlegen, braucht es eine chemische Reaktion.',
        'Vergleiche die Vorgänge Destillation und Elektrolyse.'),
    ],
  },
  {
    id: 'j7-metalle', year: 7, title: 'Kupfer gewinnen und wiederverwenden',
    ref: 'Gym. IF 4 · GE IF 3', source: gymChemistry + '#page=24',
    visual: juniorTable('Zwei Wege zum Metall', ['Ausgangsstoffe', 'Was geschieht?'], [
      ['Kupferoxid und Eisen', 'Es bilden sich Kupfer und Eisenoxid.'],
      ['Sortiertes Altkupfer', 'Das Metall lässt sich einschmelzen und neu formen.'],
    ]),
    questions: [
      juniorQuestion('Kupferoxid reagiert mit Eisen. Auf welchen Stoff wird der Sauerstoff übertragen?', [
        'Auf das entstehende Kupfer.',
        'Auf das eingesetzte Eisen.',
        'Auf die Umgebungsluft.',
      ], 1, 'Vor der Reaktion ist der Sauerstoff im Kupferoxid gebunden, danach im Eisenoxid. Dabei wird aus dem Kupferoxid metallisches Kupfer.',
        'Suche den Sauerstoff in den Namen der Ausgangsstoffe und der Produkte.'),
      juniorQuestion('Was spart das Einschmelzen sortierter Kupferrohre gegenüber der Gewinnung von neuem Kupfer aus Erz?', [
        'Es erspart das Sortieren des Altmetalls.',
        'Es erspart jede Energiezufuhr für die Verarbeitung.',
        'Es erspart Erz und Schritte der Metallgewinnung.',
      ], 2, 'Alte Rohre enthalten bereits metallisches Kupfer. Für neues Kupfer aus Erz wären weitere Gewinnungsschritte nötig. Das Einschmelzen selbst braucht Energie.',
        'In welcher Form liegt das Kupfer im Rohr bereits vor?'),
    ],
  },
  {
    id: 'j8-isotope', year: 8, title: 'Was macht Chlor zu Chlor?',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=28',
    materialSource: { label: 'IUPAC/CIAAW · Isotopenmassen und Häufigkeiten von Chlor', url: 'https://ciaaw.org/chlorine.htm' },
    visual: juniorTable('Drei neutrale Atome', ['Atom', 'Protonen', 'Neutronen'], [
      ['Chlor-35', '17', '18'],
      ['Chlor-37', '17', '20'],
      ['Argon-40', '18', '22'],
    ]),
    questions: [
      juniorQuestion('Welche Teilchenzahl ist bei Chlor-35 und Chlor-37 gleich?', [
        'Die Zahl aller Protonen und Neutronen zusammen.',
        'Die Zahl der Neutronen im Kern.',
        'Die Zahl der Protonen im Kern.',
      ], 2, 'Beide Kerne enthalten 17 Protonen. Die Protonenzahl bestimmt das Element. Die beiden Chlorisotope unterscheiden sich in der Zahl ihrer Neutronen.',
        'Vergleiche die beiden Chlorzeilen Spalte für Spalte.'),
      juniorQuestion('Eine Modellprobe enthält drei Atome Chlor-35 und ein Atom Chlor-37. Wie groß ist der Mittelwert ihrer Massenzahlen?', [
        '36',
        '35,5',
        '37',
      ], 1, '(3 × 35 + 37) ÷ 4 = 35,5. Die Massenzahl zählt Protonen und Neutronen. Für die Atommasse im Periodensystem werden die tatsächlichen Isotopenmassen nach ihrer natürlichen Häufigkeit gewichtet.',
        'Schreibe für jedes der vier Atome seine Massenzahl auf.'),
    ],
  },
  {
    id: 'j8-streuung', year: 8, title: 'Wie kam man dem Atomkern auf die Spur?',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=28',
    visual: juniorTable('Beobachtungen aus Rutherfords Streuversuch', ['Bahn positiv geladener Teilchen', 'Häufigkeit an dünner Goldfolie'], [
      ['Nahezu geradlinig', 'Die weitaus meisten Teilchen'],
      ['Deutlich abgelenkt', 'Wenige Teilchen'],
      ['Zurückgestreut', 'Sehr wenige Teilchen'],
    ]),
    questions: [
      juniorQuestion('Die meisten Teilchen fliegen fast geradeaus, wenige werden stark abgelenkt. Welches Atommodell erklärt beides?', [
        'Das Atom ist eine durchgehend massive Kugel.',
        'Ein kleiner positiver Kern liegt in einer viel größeren Hülle.',
        'Die positive Ladung ist gleichmäßig im Atom verteilt.',
      ], 1, 'Die meisten Teilchen kommen keinem Kern nahe. Nur wenige nähern sich einem positiven Kern so weit, dass die elektrische Abstoßung sie stark ablenkt.',
        'Ein passendes Modell muss auch die seltenen großen Ablenkungen erklären.'),
      juniorQuestion('In einem Modellbild ist der Atomkern deutlich zu sehen. Welche Bildunterschrift passt zu den Streuergebnissen?', [
        'Der Kern ist im Bild stark vergrößert.',
        'Der Kern nimmt etwa die Hälfte des Atomdurchmessers ein.',
        'Die Kugel in der Mitte zeigt ein Elektron.',
      ], 0, 'Der Kern ist gegenüber der Atomhülle sehr klein. In Zeichnungen wird er häufig vergrößert, damit man ihn erkennen kann.',
        'Wie häufig kommen die Teilchen dem Kern im Versuch sehr nahe?'),
    ],
  },
  {
    id: 'j8-schalen', year: 8, title: 'Schalen, Gruppen und Perioden',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=28',
    visual: juniorTable('Elektronen neutraler Atome von innen nach außen', ['Element', 'Elektronen je Schale', 'Periode'], [
      ['Helium', '2', '1'],
      ['Sauerstoff', '2 | 6', '2'],
      ['Schwefel', '2 | 8 | 6', '3'],
      ['Argon', '2 | 8 | 8', '3'],
    ]),
    questions: [
      juniorQuestion('Welche Gemeinsamkeit erklärt, warum Sauerstoff und Schwefel in derselben Hauptgruppe stehen?', [
        'Die gleiche Gesamtzahl an Elektronen.',
        'Die gleiche Zahl besetzter Schalen.',
        'Die gleiche Zahl an Außenelektronen.',
      ], 2, 'Beide Atome besitzen außen sechs Elektronen. Schwefel hat eine besetzte Schale mehr und steht deshalb eine Periode tiefer.',
        'Die Tabelle nennt die Elektronen von innen nach außen. Vergleiche die letzte Zahl.'),
      juniorQuestion('Welches Beispiel zeigt, dass eine Edelgasschale schon mit weniger als acht Elektronen voll sein kann?', [
        'Helium mit zwei Elektronen auf der ersten Schale.',
        'Schwefel mit sechs Elektronen auf der dritten Schale.',
        'Argon mit acht Elektronen auf der äußersten Schale.',
      ], 0, 'Helium besitzt nur die erste Schale. Sie kann höchstens zwei Elektronen aufnehmen.',
        'Suche ein Edelgas und prüfe, welche Schale seine äußerste ist.'),
    ],
  },
  {
    id: 'j8-familien', year: 8, title: 'Elementfamilien an Eigenschaften erkennen',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=28',
    visual: juniorTable('Drei Familien und Beispiele bei Raumtemperatur', ['Familie', 'Beispiele', 'Gemeinsames Merkmal'], [
      ['Alkalimetalle', 'Lithium, Natrium', 'Weiche Metalle, die leicht reagieren.'],
      ['Halogene', 'Chlor, Brom', 'Reaktive Nichtmetalle, die mit Metallen Salze bilden.'],
      ['Edelgase', 'Neon, Argon', 'Gase mit sehr geringer Reaktionsbereitschaft.'],
    ]),
    questions: [
      juniorQuestion('Ein reaktives Nichtmetall bildet mit Natrium ein Salz. Zu welcher der drei Familien in der Tabelle passt es?', [
        'Edelgase',
        'Halogene',
        'Alkalimetalle',
      ], 1, 'Unter diesen drei Familien passen die Halogene. Chlor gehört zu ihnen und bildet mit Natrium Natriumchlorid.',
        'Achte auf beide Merkmale des Stoffes.'),
      juniorQuestion('Chlor und Argon sind bei Raumtemperatur Gase. Welches Merkmal trennt ihre Familien in der Tabelle?', [
        'Dass beide keinen festen Körper bilden.',
        'Dass beide den verfügbaren Raum ausfüllen.',
        'Wie leicht sie Verbindungen eingehen.',
      ], 2, 'Chlor reagiert leicht mit anderen Stoffen. Argon ist unter üblichen Bedingungen sehr reaktionsträge.',
        'Gesucht ist ein Unterschied zwischen den Gasen.'),
    ],
  },
  {
    id: 'j8-flammenfarben', year: 8, title: 'Spuren im Licht einer Flamme',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=28',
    visual: juniorTable('Beobachtete Flammenfarben von Salzproben', ['Salz mit …', 'Flammenfarbe'], [
      ['Lithium', 'karminrot'],
      ['Natrium', 'kräftig gelb'],
      ['Kalium', 'blassviolett'],
      ['Calcium', 'orangerot'],
    ]),
    questions: [
      juniorQuestion('Eine unbekannte Salzprobe färbt die Flamme blassviolett. Auf welches Element deutet diese Farbe hin?', [
        'Kalium',
        'Calcium',
        'Natrium',
      ], 0, 'Das blasse Violett passt unter den Vergleichsproben zu Kalium.',
        'Vergleiche besonders Violett, Gelb und die beiden Rottöne.'),
      juniorQuestion('Die Flamme einer Salzmischung leuchtet gelb. Warum lassen sich andere Metalle dadurch nicht ausschließen?', [
        'Alle Metalle der Tabelle senden überwiegend gelbes Licht aus.',
        'Intensives Natriumgelb kann schwächere Flammenfarben überdecken.',
        'Im Gemisch hat jede Flammenfarbe dieselbe Helligkeit.',
      ], 1, 'Eine deutlich sichtbare Farbe liefert einen Hinweis auf Natrium. Bestandteile mit schwächerem Leuchten können im Gemisch leicht übersehen werden.',
        'Wie wirkt sich ein besonders helles Signal auf die anderen Signale aus?'),
    ],
  },
  {
    id: 'j8-elemente-im-alltag', year: 8, title: 'Ein Element in verschiedenen Stoffen',
    ref: 'Gym. IF 5 · GE IF 5', source: gymChemistry + '#page=29',
    visual: juniorTable('Aluminium im Alltag', ['Material', 'Eigenschaft', 'Beispiel'], [
      ['Metallisches Aluminium', 'Leicht und verformbar', 'Aluminiumfolie'],
      ['Aluminiumoxid', 'Hart', 'Schleifkorn'],
      ['Aluminiumlegierung', 'Leicht und je nach Zusammensetzung fest', 'Fahrradrahmen'],
    ]),
    questions: [
      juniorQuestion('Ein hartes Schleifkorn enthält Aluminium. Welcher Stoff aus der Tabelle passt am besten?', [
        'Metallisches Aluminium.',
        'Eine Aluminiumlegierung für Fahrradrahmen.',
        'Aluminiumoxid.',
      ], 2, 'Aluminiumoxid ist eine Verbindung von Aluminium und Sauerstoff. Es ist hart und wird als Schleifmittel genutzt. Metallisches Aluminium lässt sich leicht verformen.',
        'Suche die Zeile, die zur Eigenschaft und zum Einsatz passt.'),
      juniorQuestion('Die Kette eines Fahrrads ist defekt, sein Aluminiumrahmen intakt. Wie lässt sich der Rahmen direkt weiterverwenden?', [
        'Die Kette ersetzen und den vorhandenen Rahmen behalten.',
        'Den Rahmen einschmelzen und einen neuen herstellen.',
        'Den Rahmen gegen ein Neuteil austauschen.',
      ], 0, 'Eine neue Kette macht den weiteren Gebrauch des bestehenden Rahmens möglich. Einschmelzen und Neufertigen entfallen.',
        'Unterscheide das Weiterverwenden eines Bauteils vom Recycling seines Materials.'),
    ],
  },
  {
    id: 'j9-ionen-formeln', year: 9, title: 'Vom Atom zur Salzformel',
    ref: 'Gym. IF 6 · GE IF 5', source: gymChemistry + '#page=29',
    visual: juniorTable('Was sich an der Außenschale ändert', ['Atom', 'Elektronenwechsel', 'Ion'], [
      ['Natrium', 'gibt ein Elektron ab', 'Na⁺'],
      ['Magnesium', 'gibt zwei Elektronen ab', 'Mg²⁺'],
      ['Chlor', 'nimmt ein Elektron auf', 'Cl⁻'],
      ['Sauerstoff', 'nimmt zwei Elektronen auf', 'O²⁻'],
    ]),
    questions: [
      juniorQuestion('In welchem kleinsten Zahlenverhältnis kommen Mg²⁺ und Cl⁻ in neutralem Magnesiumchlorid vor? Gefragt ist Mg²⁺ zu Cl⁻.', [
        '2 : 1',
        '1 : 2',
        '1 : 1',
      ], 1, 'Ein Mg²⁺ bringt zwei positive Ladungen mit. Zwei Cl⁻ gleichen sie aus. Die Verhältnisformel ist MgCl₂.',
        'Addiere die Ladungen für jedes vorgeschlagene Verhältnis.'),
      juniorQuestion('Ein neutrales Sauerstoffatom hat acht Protonen und acht Elektronen. Wie ist das Oxid-Ion O²⁻ aufgebaut?', [
        'Zehn Protonen und acht Elektronen.',
        'Acht Protonen und sechs Elektronen.',
        'Acht Protonen und zehn Elektronen.',
      ], 2, 'Der Kern bleibt unverändert. Das Atom nimmt zwei Elektronen auf und trägt deshalb eine zweifach negative Ladung.',
        'Das Elementsymbol bleibt O. Überlege, welche Teilchen eine negative Ladung tragen.'),
    ],
  },
  {
    id: 'j9-ionengitter', year: 9, title: 'Wann leitet Kochsalz Strom?',
    ref: 'Gym. IF 6 · GE IF 5', source: gymChemistry + '#page=29',
    visual: juniorTable('Vergleich aus dem Laborprotokoll', ['Probe', 'Gemessene Leitfähigkeit'], [
      ['Trockenes, festes Kochsalz', 'Sehr gering'],
      ['Geschmolzenes Kochsalz', 'Deutlich'],
      ['Kochsalz in Wasser gelöst', 'Deutlich'],
      ['Zucker in reinem Wasser gelöst', 'Sehr gering'],
    ]),
    questions: [
      juniorQuestion('Welche Teilchen tragen den elektrischen Strom durch die Kochsalzlösung?', [
        'Bewegliche Na⁺- und Cl⁻-Ionen.',
        'Elektronen, die frei zwischen Wassermolekülen wandern.',
        'Neutrale Teilchen aus Natriumchlorid und Wasser.',
      ], 0, 'In der Lösung sind die Ionen beweglich. Im elektrischen Feld wandern positive und negative Ionen in entgegengesetzte Richtungen.',
        'Ein Ladungsträger muss geladen sein und sich durch die Probe bewegen können.'),
      juniorQuestion('Festes Kochsalz enthält schon Ionen. Warum leitet es bei Raumtemperatur nur sehr schwach?', [
        'Im festen Salz sind Natrium- und Chloratome neutral.',
        'Die Ionen sind weitgehend an ihre Gitterplätze gebunden.',
        'Die Ionen entstehen erst beim Schmelzen.',
      ], 1, 'Im festen Gitter können sich die Ionen kaum durch den Kristall bewegen. In der Schmelze und in wässriger Lösung sind sie beweglich.',
        'Vergleiche die Beweglichkeit der Ladungsträger in Kristall und Schmelze.'),
    ],
  },
  {
    id: 'j9-salzgehalt', year: 9, title: 'Salzgehalte fair vergleichen',
    ref: 'Gym. IF 6 · GE IF 4 und 7', source: gymChemistry + '#page=30',
    visual: juniorTable('Zwei Modellproben enthalten nur Wasser und Kochsalz', ['Probe', 'Masse der Lösung', 'Salz nach dem Verdunsten'], [
      ['A', '50 g', '1,5 g'],
      ['B', '100 g', '2,0 g'],
    ]),
    questions: [
      juniorQuestion('Welche Probe hat den höheren Massenanteil an Kochsalz?', [
        'B mit 2,0 g Rückstand gegenüber 1,5 g bei A.',
        'Beide Proben haben denselben Massenanteil.',
        'A mit 3 % gegenüber 2 % bei B.',
      ], 2, 'Für A ergibt sich 1,5 g ÷ 50 g = 0,03, also 3 %. Für B ergibt sich 2,0 g ÷ 100 g = 0,02, also 2 %.',
        'Beziehe die Salzmasse jeweils auf die Masse der ganzen Lösung.'),
      juniorQuestion('Im Rückstand einer Bachwasserprobe findest du Kochsalz und Kalk. Was verrät die Masse des gesamten Rückstands?', [
        'Sie umfasst beide Stoffe. Die Kochsalzmasse ist damit allein noch unbekannt.',
        'Sie entspricht genau der enthaltenen Kochsalzmasse.',
        'Sie entspricht genau der enthaltenen Kalkmasse.',
      ], 0, 'Beim Verdunsten bleiben beide festen Stoffe zurück. Um den Kochsalzanteil zu bestimmen, musst du wissen, wie viel des Rückstands Kochsalz ist.',
        'Welche Stoffe erfasst die Waage gemeinsam?'),
    ],
  },
  {
    id: 'j9-redox', year: 9, title: 'Wer gibt Elektronen an wen ab?',
    ref: 'Gym. IF 7 · GE IF 6', source: gymChemistry + '#page=31',
    visual: juniorTable('Teilchenbilanz einer Reaktion', ['Vorher', 'Nachher'], [
      ['Ein Zinkatom, Zn', 'Ein Zink-Ion, Zn²⁺'],
      ['Ein Kupfer-Ion, Cu²⁺', 'Ein Kupferatom, Cu'],
    ]),
    questions: [
      juniorQuestion('Welche Teilgleichung beschreibt die Elektronenabgabe in dieser Reaktion?', [
        'Zn → Zn²⁺ + 2 e⁻',
        'Cu²⁺ + 2 e⁻ → Cu',
        'Zn²⁺ + 2 e⁻ → Zn',
      ], 0, 'Ein Zinkatom gibt zwei Elektronen ab. Diese Abgabe heißt Oxidation. Das Cu²⁺-Ion nimmt zwei Elektronen auf und wird reduziert.',
        'Auf welcher Seite der Gleichung stehen abgegebene Elektronen?'),
      juniorQuestion('Ein Zinkatom wird zu Zn²⁺. Wie viele Ag⁺-Ionen können mit den abgegebenen Elektronen zu Silberatomen werden?', [
        'Ein Ag⁺-Ion.',
        'Vier Ag⁺-Ionen.',
        'Zwei Ag⁺-Ionen.',
      ], 2, 'Ein Zinkatom liefert zwei Elektronen. Jedes Ag⁺-Ion nimmt ein Elektron auf. Es entstehen zwei Silberatome.',
        'Vergleiche die Ladung jedes Silber-Ions mit der Zahl der abgegebenen Elektronen.'),
    ],
  },
  {
    id: 'j9-daniell', year: 9, title: 'Zwei Wege im Daniell-Element',
    ref: 'Gym. IF 7 · GE IF 6', source: gymChemistry + '#page=31',
    materialSource: { label: 'OpenStax · Galvanische Zellen und Rolle der Salzbrücke', url: 'https://openstax.org/books/chemistry-2e/pages/17-2-galvanic-cells' },
    visual: juniorTable('Das Daniell-Element liefert Strom', ['Bauteil', 'Beobachtung oder Prozess'], [
      ['Zinkelektrode', 'Zinkatome geben Elektronen ab und gehen als Zn²⁺ in Lösung.'],
      ['Kupferelektrode', 'Cu²⁺ aus der Lösung nehmen Elektronen auf. Kupfer scheidet sich ab.'],
      ['Draht', 'Verbindet die beiden Metalle außen.'],
      ['Salzbrücke', 'Verbindet die Lösungen. Ionen können durch die Brücke zum Ladungsausgleich beitragen.'],
    ]),
    questions: [
      juniorQuestion('Wo und in welche Richtung fließen Elektronen beim Entladen des Daniell-Elements?', [
        'Durch die Salzbrücke von Kupfer zu Zink.',
        'Durch den äußeren Draht von Zink zu Kupfer.',
        'Durch die Salzbrücke von Zink zu Kupfer.',
      ], 1, 'Zinkatome geben Elektronen ab. Diese fließen durch den Draht zur Kupferelektrode. In den Lösungen tragen Ionen die Ladung.',
        'Suche die Elektrode der Elektronenabgabe und den metallischen Verbindungsweg.'),
      juniorQuestion('Die Salzbrücke wird entfernt, der Draht bleibt angeschlossen. Weshalb endet der anhaltende Stromfluss?', [
        'Der Ionenweg zwischen den Halbzellen ist unterbrochen. Der Ladungsausgleich fällt aus.',
        'Der Draht verbindet die beiden Elektroden jetzt nicht mehr.',
        'Die Ionen können sich in den einzelnen Lösungen nicht mehr bewegen.',
      ], 0, 'Links entstehen Zn²⁺-Ionen, rechts werden Cu²⁺-Ionen verbraucht. Ohne die Salzbrücke fehlt der Ladungsausgleich zwischen den Halbzellen. Innerhalb jeder Lösung bleiben die Ionen beweglich.',
        'Prüfe den äußeren und den inneren Stromweg getrennt. Welcher Weg wurde unterbrochen?'),
    ],
  },
  {
    id: 'j9-elektrolyse', year: 9, title: 'Was geschieht an den Kupferelektroden?',
    ref: 'Gym. IF 7 · GE IF 6', source: gymChemistry + '#page=31',
    visual: juniorTable('Modell einer Elektrolyse mit zwei Kupferelektroden in Kupfersulfatlösung', ['Ort', 'Beobachtung an der Elektrode'], [
      ['Pluspol der angeschlossenen Stromquelle', 'Die Masse der Kupferelektrode nimmt ab.'],
      ['Minuspol der angeschlossenen Stromquelle', 'Kupfer scheidet sich ab. Die Masse der Elektrode nimmt zu.'],
    ]),
    questions: [
      juniorQuestion('An der Elektrode am Minuspol nimmt die Kupfermasse zu. Welche Teilgleichung erklärt das?', [
        'Cu → Cu²⁺ + 2 e⁻',
        'Cu²⁺ + 2 e⁻ → Cu',
        'Cu²⁺ → Cu + 2 e⁻',
      ], 1, 'Ein gelöstes Cu²⁺-Ion nimmt zwei Elektronen auf. Das entstandene Kupferatom lagert sich am Metall an. Diese Aufnahme von Elektronen heißt Reduktion.',
        'Gesucht ist eine ausgeglichene Gleichung mit festem Kupfer auf der Produktseite.'),
      juniorQuestion('Wie unterscheiden sich die Energieumwandlungen bei dieser Elektrolyse und beim Entladen des Daniell-Elements?', [
        'Beide Vorgänge liefern elektrische Energie an eine äußere Stromquelle.',
        'Beide Vorgänge werden von einer äußeren Stromquelle angetrieben.',
        'Die Elektrolyse braucht elektrische Energie. Das Daniell-Element liefert elektrische Energie.',
      ], 2, 'Eine äußere Stromquelle treibt die Elektrolyse an. Beim Entladen des Daniell-Elements kann die chemische Reaktion elektrische Arbeit leisten. In beiden Fällen laufen Oxidation und Reduktion gekoppelt ab.',
        'Welcher Aufbau ist mit einer Stromquelle, welcher mit einem Verbraucher verbunden?'),
    ],
  },
  {
    id: 'j9-energiespeicher', year: 9, title: 'Batterie, Akku oder Brennstoffzelle?',
    ref: 'Gym. IF 7 · GE IF 6', source: geChemistry + '#page=86',
    visual: juniorTable('Wo die Reaktionsstoffe herkommen', ['System', 'Betrieb'], [
      ['Primärbatterie', 'Enthält ihre Reaktionsstoffe. Für einmaliges Entladen ausgelegt.'],
      ['Akkumulator', 'Enthält seine Reaktionsstoffe. Eine Stromquelle kann die Entladereaktion weitgehend umkehren.'],
      ['Wasserstoff-Brennstoffzelle', 'Wasserstoff und Sauerstoff werden im Betrieb fortlaufend zugeführt.'],
    ]),
    questions: [
      juniorQuestion('Wasserstoff strömt aus einem Tank zu, Sauerstoff aus der Luft. Welches System erzeugt daraus Strom?', [
        'Eine Primärbatterie.',
        'Ein Akkumulator beim Aufladen.',
        'Eine Wasserstoff-Brennstoffzelle.',
      ], 2, 'Eine Wasserstoff-Brennstoffzelle verwendet laufend zugeführten Wasserstoff und Sauerstoff. Dabei entstehen Wasser, elektrische Energie und Wärme.',
        'Welche Zeile beschreibt eine fortlaufende Zufuhr von Reaktionsstoffen?'),
      juniorQuestion('Was haben das Laden eines Akkus und eine Elektrolyse gemeinsam?', [
        'Beide liefern beim beschriebenen Vorgang Strom an einen Verbraucher.',
        'Eine äußere Stromquelle treibt eine chemische Reaktion an.',
        'In beiden wird Ladung wie in einem Kondensator gespeichert, ohne dass sich die Stoffe ändern.',
      ], 1, 'Beim Laden und bei der Elektrolyse wird elektrische Energie zugeführt. Im Akku entstehen dabei wieder Stoffe, die bei der nächsten Entladung reagieren können.',
        'Überlege, in welche Richtung die elektrische Energie bei beiden Vorgängen fließt.'),
    ],
  },
  {
    id: 'j10-molekuele', year: 10, title: 'Von der Bindung zum Dipol',
    ref: 'Gym. IF 8 · GE IF 7', source: gymChemistry + '#page=32',
    visual: juniorTable('Molekülmodelle und Elektronenverteilung', ['Molekül', 'Elektronenpaare am Zentralatom', 'Molekülform'], [
      ['Wasser, H₂O', 'Zwei O–H-Bindungen und zwei freie Paare am O', 'gewinkelt'],
      ['Kohlenstoffdioxid, CO₂', 'Zwei C=O-Doppelbindungen und kein freies Paar am C', 'linear'],
      ['Ammoniak, NH₃', 'Drei N–H-Bindungen und ein freies Paar am N', 'pyramidal'],
    ]),
    questions: [
      juniorQuestion('H₂O und CO₂ haben polare Bindungen. Warum ist nur das Wassermolekül ein Dipol?', [
        'Im gewinkelten H₂O heben sich die Bindungsdipole nicht auf. Im linearen CO₂ tun sie es.',
        'Nur die O–H-Bindung ist polar, weil Doppelbindungen unpolar sind.',
        'In CO₂ ziehen beide O-Atome die Bindungselektronen in dieselbe Richtung.',
      ], 0, 'Sauerstoff zieht die Bindungselektronen zu sich. Im CO₂ zeigen die beiden gleich starken Bindungsdipole in entgegengesetzte Richtungen. Im gewinkelten Wassermolekül bleibt ein Gesamtdipol.',
        'Zeichne für jede Bindung einen Pfeil zum Sauerstoff. Vergleiche die Pfeilrichtungen.'),
      juniorQuestion('Wie richten sich Wassermoleküle bevorzugt um ein Na⁺-Ion aus?', [
        'Mit der positiven H-Seite zum Ion.',
        'Mit der negativen O-Seite zum Ion.',
        'Mit beiden Seiten gleich häufig zum Ion.',
      ], 1, 'Der Sauerstoff trägt eine negative Teilladung. Das positive Na⁺-Ion zieht diese Seite der Wassermoleküle an. Um das Ion bildet sich eine Hydrathülle.',
        'Betrachte die Teilladungen im Wassermolekül und die Ladung des Ions.'),
    ],
  },
  {
    id: 'j10-katalyse', year: 10, title: 'Zwei Reaktionswege zu Ammoniak',
    ref: 'Gym. IF 8 · GE IF 9 (E-Kurs)', source: gymChemistry + '#page=33',
    visual: juniorTable('Vereinfachtes Energieprofil in Modelleinheiten', ['Reaktionsweg', 'Start', 'Höchster Punkt', 'Ende'], [
      ['Ohne Katalysator', '80', '155', '35'],
      ['Mit Katalysator', '80', '115', '35'],
    ]),
    questions: [
      juniorQuestion('Wie groß ist im Modell die Aktivierungsenergie für den Weg mit Katalysator?', [
        '115 Einheiten',
        '45 Einheiten',
        '35 Einheiten',
      ], 2, 'Die Energiebarriere reicht vom Start bis zum höchsten Punkt des Wegs. Mit Katalysator beträgt sie 115 − 80 = 35 Einheiten.',
        'Lies Startwert und höchsten Wert desselben Reaktionswegs ab.'),
      juniorQuestion('Stickstoff reagiert mit Wasserstoff zu Ammoniak. Welche Gleichung stimmt auch mit Katalysator?', [
        'N₂ + H₂ → 2 NH₃',
        'N₂ + 3 H₂ → 2 NH₃',
        '2 N₂ + 3 H₂ → 2 NH₃',
      ], 1, 'Links und rechts stehen jeweils zwei N- und sechs H-Atome. Der Katalysator verändert den Reaktionsweg. Er wird am Ende seines Reaktionszyklus zurückgebildet.',
        'Zähle N- und H-Atome auf jeder Seite getrennt.'),
    ],
  },
  {
    id: 'j10-saeure-base', year: 10, title: 'Wann ist eine Lösung neutral?',
    ref: 'Gym. IF 9 · GE IF 7', source: gymChemistry + '#page=34',
    visual: juniorTable('Modelldaten bei 25 °C für je 20 mL Salzsäure mit 0,10 mol/L', ['Zugegebene Natronlauge (0,10 mol/L)', 'Universalindikator', 'pH-Bereich'], [
      ['10 mL', 'rot', 'unter 7'],
      ['20 mL', 'grün', 'etwa 7'],
      ['30 mL', 'blauviolett', 'über 7'],
    ]),
    questions: [
      juniorQuestion('20 mL Salzsäure werden mit 10 mL gleich konzentrierter Natronlauge gemischt. Warum bleibt das Gemisch sauer?', [
        'H₃O⁺-Ionen bleiben im Überschuss.',
        'OH⁻-Ionen bleiben im Überschuss.',
        'Die Konzentrationen von H₃O⁺ und OH⁻ sind gleich.',
      ], 0, 'H₃O⁺ und OH⁻ reagieren im Verhältnis 1 : 1 zu Wasser. Die Lauge liefert hier nur halb so viele OH⁻-Ionen, wie die Säure H₃O⁺-Ionen liefert.',
        'Bei gleicher Konzentration kannst du die Stoffmengen über die Volumina vergleichen.'),
      juniorQuestion('Jetzt hat die Natronlauge 0,20 mol/L. Welches Volumen neutralisiert 20 mL Salzsäure mit 0,10 mol/L?', [
        '40 mL',
        '20 mL',
        '10 mL',
      ], 2, 'Die Salzsäure enthält 0,10 mol/L × 0,020 L = 0,0020 mol H₃O⁺. Für ebenso viel OH⁻ braucht man 0,0020 mol ÷ 0,20 mol/L = 0,010 L Natronlauge. Das sind 10 mL.',
        'Berechne zuerst n = c × V für die Säure. Setze das Volumen in Litern ein.'),
    ],
  },
  {
    id: 'j10-loesen', year: 10, title: 'Warum ändert sich beim Lösen die Temperatur?',
    ref: 'Gym. IF 8 · Wechselwirkungen beim Lösen', source: gymChemistry + '#page=33',
    materialSource: { label: 'OpenStax · Energiebilanz beim Lösen', url: 'https://openstax.org/books/chemistry-2e/pages/11-1-the-dissolution-process' },
    visual: juniorTable('Energiebilanz beim Lösen zweier Modellsalze, jeweils für die gleiche Stoffmenge', ['Modellsalz', 'Ionengitter trennen', 'Hydrathüllen bilden'], [
      ['A', '80 Energieeinheiten nötig', '95 Energieeinheiten werden frei'],
      ['B', '75 Energieeinheiten nötig', '60 Energieeinheiten werden frei'],
    ]),
    questions: [
      juniorQuestion('Modellsalz A löst sich in Wasser. Welche Temperaturänderung erwartest du im gut isolierten Gefäß?', [
        'Die Lösung kühlt ab. Es fehlen 15 Energieeinheiten.',
        'Die Temperatur bleibt gleich. Die beiden Beiträge sind gleich groß.',
        'Die Lösung erwärmt sich. Insgesamt werden 15 Energieeinheiten frei.',
      ], 2, 'Das Trennen des Gitters braucht 80 Einheiten. Bei der Hydratation werden 95 Einheiten frei. Der Überschuss von 15 Einheiten erwärmt die Lösung.',
        'Ordne den beiden Energiebeträgen unterschiedliche Vorzeichen zu.'),
      juniorQuestion('Die Lösung von Modellsalz B kühlt ab. Welche Deutung passt zu den Tabellenwerten?', [
        'Die Hydratation setzt Energie frei. Sie liefert weniger, als das Trennen des Gitters kostet.',
        'Beim Trennen des Gitters wird mehr Energie frei als bei der Hydratation.',
        'Die Wassermoleküle bilden beim Lösen von B keine Hydrathüllen.',
      ], 0, '75 Einheiten werden benötigt, 60 werden frei. Insgesamt nimmt der Lösevorgang 15 Einheiten auf und die Lösung kühlt ab. Für eine Vorhersage der Löslichkeit braucht man weitere Angaben.',
        'Vergleiche den Energiebedarf beim Trennen mit dem Gewinn bei der Hydratation.'),
    ],
  },
  {
    id: 'j10-alkanole', year: 10, title: 'Alkane und Alkanole vergleichen',
    ref: 'Gym. IF 8 und 10 · GE IF 8', source: gymChemistry + '#page=35',
    visual: juniorTable('Struktur und gerundete Siedetemperatur bei Normaldruck', ['Stoff', 'Vereinfachte Struktur', 'Siedetemperatur'], [
      ['Ethan', 'CH₃–CH₃', '−89 °C'],
      ['Propan', 'CH₃–CH₂–CH₃', '−42 °C'],
      ['Ethanol', 'CH₃–CH₂–OH', '78 °C'],
      ['Propan-1-ol', 'CH₃–CH₂–CH₂–OH', '97 °C'],
    ]),
    questions: [
      juniorQuestion('Woran erkennst du die beiden Alkanole in den Strukturformeln?', [
        'Sie enthalten ausschließlich C und H.',
        'An der Kohlenstoffkette sitzt jeweils eine Hydroxygruppe (–OH).',
        'Beide Ketten enthalten genau drei C-Atome.',
      ], 1, 'Ethanol und Propan-1-ol besitzen eine Hydroxygruppe. Die Endung „-ol“ weist auf die Alkoholgruppe hin.',
        'Vergleiche bei gleicher Kettenlänge jeweils das Alkan mit dem Alkanol.'),
      juniorQuestion('Warum siedet Ethanol bei Normaldruck deutlich höher als Ethan?', [
        'Ethanolmoleküle können untereinander Wasserstoffbrücken bilden.',
        'Beim Sieden des Ethanols müssen C–C-Bindungen im Molekül brechen.',
        'Ethanol hat mehr Kohlenstoffatome pro Molekül als Ethan.',
      ], 0, 'Zwischen Ethanolmolekülen wirken zusätzlich zu den London-Kräften Wasserstoffbrücken. Beim Verdampfen müssen die Moleküle diese Anziehung überwinden.',
        'Überlege, welche Anziehung zwischen zwei Molekülen durch eine OH-Gruppe möglich wird.'),
    ],
  },
  {
    id: 'j10-kohlenstoff', year: 10, title: 'Welchen Weg nimmt der Kohlenstoff?',
    ref: 'Gym. IF 10 · GE IF 4 und 8', source: geChemistry + '#page=89',
    visual: juniorTable('Kohlenstoffspeicher vor und nach einem Vorgang', ['Vorgang', 'Vorher', 'Nachher'], [
      ['Pflanzen wachsen', 'CO₂ in der Luft', 'Kohlenstoff in der Biomasse'],
      ['Gärung von Pflanzenzucker', 'Zucker', 'Ethanol und CO₂'],
      ['Vollständige Verbrennung von Ethanol', 'Ethanol', 'CO₂ in der Luft'],
      ['Vollständige Verbrennung von fossilem Erdgas', 'Kohlenstoff aus geologischen Lagerstätten', 'CO₂ in der Luft'],
    ]),
    questions: [
      juniorQuestion('Bei welchem Vorgang gelangt Kohlenstoff aus geologischen Lagerstätten als CO₂ in die heutige Atmosphäre?', [
        'Beim Wachsen einer Pflanze.',
        'Bei der Gärung von frisch geerntetem Pflanzenzucker.',
        'Bei der Verbrennung von fossilem Erdgas.',
      ], 2, 'Der Kohlenstoff im fossilen Erdgas war über geologische Zeiträume gespeichert. Beim Verbrennen wird er als Kohlenstoffdioxid in die Luft abgegeben.',
        'Verfolge in der Tabelle, wo der Kohlenstoff vor dem jeweiligen Vorgang gespeichert war.'),
      juniorQuestion('Wie prüfst du die Aussage „Kraftstoff aus Pflanzenethanol ist klimaneutral“ für ein bestimmtes Produkt?', [
        'Nur die CO₂-Aufnahme der Pflanzen erfassen.',
        'Anbau, Landnutzung, Herstellung, Transport und Verbrennung zusammen bilanzieren.',
        'Nur die CO₂-Abgabe des Motors erfassen.',
      ], 1, 'Die Bilanz umfasst CO₂-Aufnahme beim Wachsen und Treibhausgasemissionen über den gesamten Lebensweg. Auch Veränderungen von Kohlenstoffspeichern durch die Landnutzung zählen.',
        'Welche Schritte liegen zwischen dem Acker und dem Einsatz im Motor?'),
    ],
  },
  {
    id: 'j10-kunststoffe', year: 10, title: 'Kunststoffketten und Recycling',
    ref: 'Gym. IF 10 · GE IF 9', source: geChemistry + '#page=90',
    visual: juniorTable('Drei Kunststoffproben im Modell', ['Probe', 'Anordnung der Ketten', 'Beobachtung'], [
      ['Thermoplast', 'Lange, unvernetzte Ketten', 'Wird beim Erwärmen formbar und beim Abkühlen wieder fest.'],
      ['Elastomer', 'Weitmaschig vernetzte Ketten', 'Lässt sich dehnen und federt zurück.'],
      ['Duroplast', 'Engmaschig vernetztes Gerüst', 'Bleibt formstabil und zersetzt sich bei starker Erwärmung.'],
    ]),
    questions: [
      juniorQuestion('Welche der drei Modellproben lässt sich durch Erwärmen erneut formen?', [
        'Der Thermoplast.',
        'Der Duroplast.',
        'Das Elastomer.',
      ], 0, 'Die unvernetzten Ketten des Thermoplasts können bei ausreichend hoher Temperatur aneinander vorbeigleiten. Feste Quervernetzungen verhindern dieses Fließen bei den anderen Modellproben.',
        'Prüfe im Modell, ob die Ketten durch feste Querverbindungen zusammenhängen.'),
      juniorQuestion('Ethen (CH₂=CH₂) wird zu Polyethylen. Was geschieht dabei mit den Bindungen?', [
        'Die Moleküle bleiben durchgehend über C=C-Doppelbindungen verknüpft.',
        'Die einzelnen Ethenmoleküle lagern sich ohne neue Bindungen aneinander.',
        'Aus den Doppelbindungen werden Einfachbindungen. Neue C–C-Bindungen verknüpfen die Bausteine.',
      ], 2, 'Bei der Polymerisation entsteht eine Kette mit der Wiederholungseinheit –CH₂–CH₂–. Die Kohlenstoff- und Wasserstoffatome der Ethenmoleküle bleiben erhalten.',
        'Vergleiche die Bindungen in CH₂=CH₂ mit einem Ausschnitt aus der fertigen Kette.'),
    ],
  },
];
