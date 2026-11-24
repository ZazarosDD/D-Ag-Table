export const compoundLearning = {
  NaCl: {
    ions: 'Ein Natrium-Ion Na⁺ trägt eine positive, ein Chlorid-Ion Cl⁻ eine negative Ladung. Im Salzkristall kommen beide im Verhältnis 1 zu 1 vor, sodass der Kristall insgesamt neutral ist.',
    polar: 'Im festen Kochsalz ziehen sich Na⁺- und Cl⁻-Ionen im Gitter an. Beim Lösen in Wasser richtet sich die Sauerstoffseite der Wassermoleküle zu Na⁺ aus, die Wasserstoffseite zu Cl⁻.',
    electrochem: 'In einer Kochsalzlösung bewegen sich Na⁺ und Cl⁻ unter dem Einfluss einer elektrischen Spannung in entgegengesetzte Richtungen. Beide Ionenarten tragen so zum Strom in der Lösung bei.',
  },
  KCl: {
    ions: 'Im Kristall kommen K⁺ und Cl⁻ gleich häufig vor. Jedes Ion ist von mehreren entgegengesetzt geladenen Nachbarn umgeben.',
  },
  MgO: {
    ions: 'Ein Magnesium-Ion Mg²⁺ und ein Oxid-Ion O²⁻ gleichen ihre Ladungen aus. Ihr Zahlenverhältnis im Kristall ist deshalb 1 zu 1.',
  },
  CaF2: {
    ions: 'Ein Calcium-Ion Ca²⁺ braucht zum Ladungsausgleich zwei Fluorid-Ionen F⁻. Die kleine 2 in CaF₂ gibt dieses Verhältnis an.',
  },
  Al2O3: {
    ions: 'Zwei Aluminium-Ionen Al³⁺ tragen zusammen sechs positive Ladungen. Drei Oxid-Ionen O²⁻ gleichen sie aus, daher lautet die Formel Al₂O₃.',
  },
  CaCO3: {
    ions: 'Im Kalkstein stehen Calcium-Ionen Ca²⁺ und Carbonat-Ionen CO₃²⁻ im Verhältnis 1 zu 1. Die zweifache negative Ladung gehört zum ganzen Carbonat-Ion.',
  },
  CaSO4: {
    ions: 'Ein Calcium-Ion Ca²⁺ und ein Sulfat-Ion SO₄²⁻ gleichen ihre Ladungen aus. Die 4 zählt die Sauerstoffatome in jedem Sulfat-Ion.',
  },
  Fe2O3: {
    ions: 'Drei Oxid-Ionen O²⁻ tragen zusammen sechs negative Ladungen. Zum Ausgleich gehören zwei Eisen(III)-Ionen Fe³⁺ in die Verhältnisformel Fe₂O₃.',
  },
  ZnO: {
    ions: 'Im Ionenmodell trägt Zink in Zinkoxid zwei positive und Sauerstoff zwei negative Ladungen. Daher kommen Zink und Sauerstoff im Kristall im Verhältnis 1 zu 1 vor.',
  },
  AgBr: {
    ions: 'In Silberbromid stehen Silber-Ionen Ag⁺ und Bromid-Ionen Br⁻ im Verhältnis 1 zu 1. So ergibt sich für den Kristall die Gesamtladung null.',
    advancedElectrochem: 'Für das Elektrodenpaar AgBr/Ag lautet die Reduktion AgBr + e⁻ → Ag + Br⁻. Steigt die Bromid-Aktivität, sinkt das Reduktionspotenzial.',
  },
  H2O: {
    polar: 'Sauerstoff zieht die Bindungselektronen stärker an als Wasserstoff. Weil das Molekül gewinkelt ist, trägt die Sauerstoffseite eine negative und die Wasserstoffseite eine positive Teilladung.',
    geometry: 'Am Sauerstoff stoßen sich zwei bindende und zwei freie Elektronenpaare ab. Im Elektronenpaarabstoßungsmodell (EPA) ergibt sich eine gewinkelte Molekülform mit einem H–O–H-Winkel von rund 104,5°.',
    interactions: 'Zwischen den Molekülen zieht ein teilweise positiv geladenes H-Atom ein freies Elektronenpaar am Sauerstoff eines Nachbarmoleküls an. Diese Wasserstoffbrücken halten die Moleküle im flüssigen Wasser zusammen.',
    electrochem: 'Wasser kann ein Proton aufnehmen und zu H₃O⁺ werden oder ein Proton abgeben und zu OH⁻ werden. Solche Teilchen heißen Ampholyte.',
    advancedElectrochem: 'Bei 25 °C hat neutrales Wasser einen pH-Wert von 7. Bei anderen Temperaturen verschiebt sich der Neutralpunkt, weil sich das Ionenprodukt des Wassers ändert.',
  },
  CO2: {
    polar: 'Jede C=O-Bindung ist polar. Im linearen Molekül weisen die beiden gleich starken Bindungsdipole in entgegengesetzte Richtungen und heben sich auf.',
    geometry: 'Im EPA-Modell zählt jede C=O-Doppelbindung als ein Bereich hoher Elektronendichte. Die beiden Bereiche am Kohlenstoff liegen einander bei 180° gegenüber.',
    interactions: 'Auch zwischen CO₂-Molekülen wirken Anziehungskräfte. Kurzzeitige Verschiebungen der Elektronen erzeugen London-Kräfte zwischen benachbarten Molekülen.',
  },
  NH3: {
    polar: 'Stickstoff zieht die Elektronen jeder N–H-Bindung stärker an als Wasserstoff. Durch die Pyramidenform hat das Molekül insgesamt einen negativen Pol auf der Stickstoffseite.',
    geometry: 'Drei bindende Elektronenpaare und ein freies Elektronenpaar umgeben den Stickstoff. Die drei Wasserstoffatome bilden die Grundfläche einer Pyramide, an deren Spitze der Stickstoff sitzt.',
    interactions: 'Ammoniakmoleküle können untereinander Wasserstoffbrücken bilden. Das freie Elektronenpaar am Stickstoff zieht dabei ein teilweise positiv geladenes H-Atom eines Nachbarmoleküls an.',
    electrochem: 'Ammoniak nimmt von Wasser ein Proton auf. Im Gleichgewicht NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ machen die Hydroxid-Ionen die Lösung basisch.',
    advancedElectrochem: 'NH₃ und NH₄⁺ bilden in Lösung ein Puffersystem. NH₃ fängt zugesetzte Protonen ab, NH₄⁺ kann Protonen an eine zugesetzte Base abgeben.',
  },
  HCl: {
    polar: 'Im Chlorwasserstoffmolekül zieht Chlor die gemeinsamen Elektronen stärker an als Wasserstoff. Chlor trägt die negative Teilladung δ⁻ und Wasserstoff die positive Teilladung δ⁺.',
    electrochem: 'Chlorwasserstoff überträgt in Wasser ein Proton auf ein Wassermolekül. Die so entstehende Lösung von Oxonium-Ionen H₃O⁺ und Chlorid-Ionen Cl⁻ heißt Salzsäure.',
    advancedElectrochem: 'Bei der Titration von Salzsäure mit Natronlauge liegt der Äquivalenzpunkt bei 25 °C bei pH 7. An diesem Punkt entsprechen sich die umgesetzten Stoffmengen an H₃O⁺ und OH⁻.',
  },
  CH4: {
    polar: 'Die vier H-Atome umgeben den Kohlenstoff symmetrisch. Die schwachen Bindungsdipole heben sich auf, daher hat Methan keinen dauerhaften Dipol.',
    geometry: 'Im EPA-Modell zeigen die vier C–H-Bindungen zu den Ecken eines Tetraeders. Der Winkel zwischen zwei Bindungen beträgt rund 109,5°.',
    interactions: 'Die Elektronen in Methanmolekülen sind ständig in Bewegung. Kurzlebige Dipole erzeugen auch zwischen diesen unpolaren Molekülen eine Anziehung, die London-Kräfte.',
    materials: 'Am Methanmolekül siehst du die vier Einfachbindungen, die ein Kohlenstoffatom bilden kann. In einem unverzweigten Abschnitt einer Polyethylenkette binden zwei davon an Wasserstoff und zwei an benachbarte Kohlenstoffatome.',
    orbitals: 'Im Hybridisierungsmodell ist jede der vier C–H-Bindungen eine σ-Bindung. Dafür überlappt jeweils ein sp³-Hybridorbital des Kohlenstoffs mit einem 1s-Orbital des Wasserstoffs.',
  },
  C2H4: {
    geometry: 'Jedes C-Atom ist von drei Bindungsbereichen umgeben, denn die Doppelbindung zählt im EPA-Modell als ein Bereich. Alle sechs Atome liegen in einer Ebene, die Winkel betragen etwa 120°.',
    organic: 'Die C=C-Doppelbindung kennzeichnet Ethen als Alken. Bei einer Addition können sich an die beiden C-Atome neue Bindungspartner anlagern.',
    materials: 'Bei der Polymerisation verbinden sich viele Ethenmoleküle zu einer Polyethylenkette. Aus jeder C=C-Doppelbindung wird eine C–C-Einfachbindung, und es entstehen neue Bindungen zwischen den Bausteinen.',
    orbitals: 'Jedes C-Atom bildet mit drei sp²-Hybridorbitalen drei σ-Bindungen. Die seitliche Überlappung der beiden übrigen p-Orbitale erzeugt den π-Anteil der C=C-Doppelbindung.',
  },
  C2H2: {
    orbitals: 'Jedes C-Atom in Ethin bildet zwei sp-Hybridorbitale, die sich bei 180° gegenüberliegen. Die C≡C-Dreifachbindung besteht aus einer σ-Bindung und zwei π-Bindungen.',
  },
  C2H5OH: {
    polar: 'In der OH-Gruppe des Ethanols zieht Sauerstoff die Bindungselektronen stark an. Neben diesem polaren Teil besitzt das Molekül einen nahezu unpolaren Kohlenwasserstoffrest.',
    geometry: 'Das O-Atom der OH-Gruppe trägt zwei freie Elektronenpaare und ist mit C und H verbunden. Deshalb verläuft die Atomfolge C–O–H gewinkelt.',
    organic: 'Die Hydroxygruppe (–OH) am Kohlenstoffgerüst kennzeichnet Ethanol als Alkohol. Die Formel CH₃–CH₂–OH zeigt, an welchem der beiden C-Atome sie sitzt.',
    interactions: 'Die OH-Gruppe bildet mit Wassermolekülen Wasserstoffbrücken. Dadurch lässt sich Ethanol trotz seines unpolaren Ethylrests in jedem Verhältnis mit Wasser mischen.',
    equilibrium: 'Bei der Reaktion mit Essigsäure entstehen aus Ethanol ein Ester und Wasser. Im geschlossenen System läuft auch die Rückreaktion ab.',
    materials: 'Ethanol kann mit seiner einen Hydroxygruppe bei einer Veresterung ein Kettenende bilden. Für lange Polyesterketten eignen sich zum Beispiel Alkohole mit zwei Hydroxygruppen zusammen mit Säuren mit zwei Carboxygruppen.',
  },
  CH3COOH: {
    organic: 'Die Carboxygruppe (–COOH) macht Essigsäure zu einer Carbonsäure. In ihr sitzen eine C=O-Bindung und eine OH-Gruppe am selben Kohlenstoffatom.',
    geometry: 'Am Kohlenstoff der Carboxygruppe liegen drei Bindungsbereiche. Im EPA-Modell sind sie annähernd dreieckig in einer Ebene angeordnet.',
    interactions: 'Zwei Essigsäuremoleküle können ihre Carboxygruppen über zwei Wasserstoffbrücken paarweise verbinden. Solche Paare treten zum Beispiel in der Gasphase auf.',
    equilibrium: 'Essigsäure reagiert mit Ethanol zu Essigsäureethylester und Wasser. Im Gleichgewicht entstehen pro Zeit ebenso viele Estermoleküle, wie bei der Rückreaktion verbraucht werden.',
    electrochem: 'Essigsäure gibt in Wasser nur teilweise Protonen ab. Die dabei entstehenden Acetat-Ionen CH₃COO⁻ können Protonen wieder aufnehmen.',
    advancedElectrochem: 'Bei der Titration mit Natronlauge liegt am Halbäquivalenzpunkt gleich viel Essigsäure wie Acetat vor. In verdünnter Lösung gilt dann näherungsweise pH = pKₛ.',
    materials: 'Eine Carbonsäure mit zwei Carboxygruppen kann zusammen mit einem zweiwertigen Alkohol lange Polyesterketten bilden. Essigsäure besitzt nur eine Carboxygruppe und kann die Kette an diesem Ende abschließen.',
  },
  CH3COOC2H5: {
    organic: 'Im Essigsäureethylester verbindet die Gruppe –C(=O)–O– zwei Kohlenstoffreste. Der eine stammt aus Essigsäure, der andere aus Ethanol.',
    equilibrium: 'Für die Esterbildung gilt CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Wird zu einem Gleichgewichtsgemisch Wasser gegeben, begünstigt das die Rückreaktion zu Säure und Alkohol.',
    interactions: 'Wassermoleküle können Wasserstoffbrücken zu den Sauerstoffatomen des Esters bilden. Die Estermoleküle selbst tragen keine OH-Gruppe und können einander deshalb keine solchen Wasserstoffbrücken spenden.',
    materials: 'In einem Polyester verbinden viele Estergruppen die Kettenbausteine. Beim Essigsäureethylester lässt sich die gleiche Gruppe an einem einzelnen kleinen Molekül erkennen.',
  },
  C6H12O6: {
    organic: 'Ein Glucosemolekül besitzt fünf Hydroxygruppen. In Wasser liegt Glucose überwiegend in Ringform vor.',
    interactions: 'Die vielen OH-Gruppen der Glucose können Wasserstoffbrücken zu Wassermolekülen bilden. Dadurch löst sich Traubenzucker gut in Wasser.',
    materials: 'In Cellulose sind Glucosebausteine zu langen, unverzweigten Ketten verbunden. Wasserstoffbrücken zwischen benachbarten Ketten tragen zur Zugfestigkeit von Pflanzenfasern bei.',
  },
  NaOH: {
    electrochem: 'In Wasser liefert Natriumhydroxid Na⁺- und OH⁻-Ionen. Bei der Neutralisation nimmt OH⁻ ein Proton von H₃O⁺ auf, sodass zwei Wassermoleküle entstehen.',
    advancedElectrochem: 'Für eine Titration mit Natronlauge lässt sich die zugegebene Stoffmenge an OH⁻ aus Konzentration mal Volumen berechnen. Am Äquivalenzpunkt entspricht sie bei einer einprotonigen Säure deren anfänglicher Stoffmenge.',
  },
  NaHCO3: {
    electrochem: 'Das Hydrogencarbonat-Ion HCO₃⁻ kann ein Proton abgeben und zu CO₃²⁻ werden. Es kann auch ein Proton aufnehmen und zu Kohlensäure H₂CO₃ werden.',
    advancedElectrochem: 'HCO₃⁻ steht zwischen den beiden Säure-Base-Paaren H₂CO₃/HCO₃⁻ und HCO₃⁻/CO₃²⁻. Welches Paar vor allem zum Puffern beiträgt, hängt vom pH-Wert ab.',
  },
  Na2CO3: {
    electrochem: 'In Wasser nimmt ein Teil der Carbonat-Ionen CO₃²⁻ ein Proton von Wasser auf. Es entstehen HCO₃⁻ und OH⁻, deshalb reagiert die Lösung basisch.',
    advancedElectrochem: 'Bei der Titration mit einer starken Säure nimmt CO₃²⁻ schrittweise zwei Protonen auf. Zur ersten Stufe wird ein Mol H⁺ je Mol Carbonat benötigt, zur vollständigen Umsetzung insgesamt zwei.',
  },
  C6H8O7: {
    electrochem: 'Citronensäure hat drei Carboxygruppen. Das Molekül kann in drei aufeinanderfolgenden Schritten je ein Proton abgeben.',
    advancedElectrochem: 'Bis zur vollständigen Neutralisation werden drei Mol OH⁻ je Mol Citronensäure verbraucht. Ihre drei Säurestufen liegen so nah beieinander, dass man in der üblichen Titrationskurve keine drei getrennten pH-Sprünge sieht.',
  },
  'CuSO4·5H2O': {
    electrochem: 'Gelöstes Kupfer(II)-sulfat liefert im Daniell-Element Cu²⁺-Ionen. An der Kupferelektrode nimmt jedes dieser Ionen zwei Elektronen auf und wird zu metallischem Kupfer.',
    advancedElectrochem: 'Für Cu²⁺ + 2 e⁻ ⇌ Cu steigt das Elektrodenpotenzial bei 25 °C um rund 0,030 V, wenn die Aktivität der Cu²⁺-Ionen auf das Zehnfache steigt. Der Faktor 2 im Nernst-Term steht für die zwei übertragenen Elektronen.',
    complex: 'In verdünnter wässriger Lösung umgeben Wassermoleküle das Cu²⁺-Ion und wirken als Liganden. Der hellblaue Aquakomplex wird als [Cu(H₂O)₆]²⁺ beschrieben.',
  },
  LiFePO4: {
    electrochem: 'Beim Entladen eines Lithium-Eisenphosphat-Akkus wandern Li⁺-Ionen durch den Elektrolyten zur positiven Elektrode. Dort nimmt Eisenphosphat gleichzeitig Lithium-Ionen und Elektronen auf, und es entsteht LiFePO₄.',
    advancedElectrochem: 'Die Teilreaktion an der positiven Elektrode beim Entladen lautet FePO₄ + Li⁺ + e⁻ → LiFePO₄. Die Oxidationszahl des Eisens sinkt dabei von +III auf +II.',
  },
  MnO2: {
    electrochem: 'In einer Alkali-Mangan-Batterie nimmt Mangandioxid beim Entladen an der positiven Elektrode Elektronen auf. An der negativen Elektrode gibt Zink Elektronen ab.',
    advancedElectrochem: 'Im ersten Reduktionsschritt der Alkali-Mangan-Batterie gilt MnO₂ + H₂O + e⁻ → MnOOH + OH⁻. Mangan wechselt von der Oxidationszahl +IV zu +III.',
  },
  'Ni(OH)2': {
    electrochem: 'Beim Entladen eines Nickel-Metallhydrid-Akkus nimmt Nickeloxidhydroxid an der positiven Elektrode Elektronen auf. Dabei entsteht Nickel(II)-hydroxid.',
    advancedElectrochem: 'Die Reduktion beim Entladen lautet NiOOH + H₂O + e⁻ → Ni(OH)₂ + OH⁻. Beim Laden läuft sie in Gegenrichtung.',
  },
  '(C2H4)n': {
    materials: 'Wenig verzweigte Polyethylenketten lassen sich dichter packen und bilden meist einen steiferen Kunststoff als stark verzweigte Ketten. Beim Erwärmen können unvernetzte Ketten aneinander vorbeigleiten, während die engen Querverbindungen eines Duroplasts dieses Fließen verhindern.',
  },
  SiO2: {
    materials: 'In Quarz ist jedes Siliciumatom über vier Sauerstoffatome mit benachbarten Siliciumatomen verbunden. Dieses räumliche Netzwerk trägt zur Härte bei und bleibt im Quarzglas ohne die regelmäßige Fernordnung des Kristalls erhalten.',
  },
  TiO2: {
    materials: 'Als Pigment streuen Titandioxidteilchen das sichtbare Licht besonders stark. So kann ein dünner weißer Anstrich den dunklen Untergrund verdecken.',
  },
  SiC: {
    materials: 'In Siliciumcarbid bilden Silicium und Kohlenstoff ein dreidimensionales Netzwerk starker Bindungen. Diese Struktur macht die Keramik hart genug für Schleifkörner.',
  },
  ZrO2: {
    materials: 'Bei bestimmten Zirconiumdioxid-Keramiken können sich Kristallbereiche an der Spitze eines Risses umwandeln und dabei etwas ausdehnen. Der entstehende Druck bremst das Wachstum des Risses.',
  },
  PdCl2: {
    complex: 'Im Kristall von Palladium(II)-chlorid können Chloridliganden benachbarte Palladiumzentren verbinden. Im Komplex [PdCl₄]²⁻ umgeben vier Chloridliganden ein Pd(II)-Zentrum quadratisch-planar.',
  },
};

export const elementLearning = {
  H: {
    polar: 'Im H₂-Molekül ziehen beide Wasserstoffatome die Bindungselektronen gleich stark an. In HCl zieht Chlor stärker, und das Wasserstoffatom trägt eine positive Teilladung.',
    trend: 'Das einzige Elektron des Wasserstoffatoms besetzt die erste Schale. Ein Lithiumatom hat bereits eine zweite besetzte Schale und einen größeren Atomradius.',
    electrochem: 'Eine Brønsted-Säure überträgt ein Proton auf eine Base. In Wasser bindet ein Proton an ein Wassermolekül und bildet H₃O⁺.',
    materials: 'An einem unverzweigten Polyethylenabschnitt wiederholt sich die Gruppe –CH₂–. Die Kette enthält dort C–H- und C–C-Bindungen und hat kaum polare Stellen, weshalb Wasser auf dem Kunststoff schlecht haftet.',
  },
  He: {
    trend: 'Helium besitzt eine vollständig besetzte erste Schale. Weil seine Atome meist einzeln bleiben, beschreibt man ihre Größe häufig mit dem Van-der-Waals-Radius, der aus Abständen zwischen ungebundenen Atomen folgt.',
  },
  Li: {
    ions: 'Ein Lithiumatom kann sein einzelnes Außenelektron abgeben. Das entstandene Li⁺-Ion hat noch zwei Elektronen in der ersten Schale.',
    polar: 'Bei Lithiumfluorid ist der Unterschied in der Elektronegativität besonders groß. Im festen Stoff ziehen sich positiv geladene Li⁺- und negativ geladene F⁻-Ionen an.',
    trend: 'Lithium, Natrium und Kalium haben jeweils ein Außenelektron. Von Lithium über Natrium zu Kalium kommt jeweils eine besetzte Schale hinzu, und der Atomradius nimmt zu.',
    electrochem: 'Beim Entladen eines Lithium-Ionen-Akkus bewegen sich Li⁺-Ionen im Elektrolyten zur positiven Elektrode. Die Elektronen gelangen über den äußeren Stromkreis dorthin und können dabei ein Gerät betreiben.',
  },
  Be: {
    trend: 'Lithium und Beryllium haben gleich viele besetzte Schalen. Die höhere Kernladung des Berylliums zieht seine Elektronen stärker an, deshalb ist sein Atomradius kleiner.',
  },
  B: {
    polar: 'Im BF₃-Molekül zieht Fluor an jeder B–F-Bindung stärker als Bor. Da die drei Bindungen in der Ebene symmetrisch liegen, heben sich ihre Dipole auf.',
    geometry: 'Im BF₃-Molekül liegen um Bor drei Bindungsbereiche ohne freies Elektronenpaar. Sie ordnen sich im EPA-Modell in einer Ebene mit 120° Abstand an.',
    trend: 'Von Bor über Kohlenstoff zu Stickstoff wächst die Kernladung bei gleicher Zahl besetzter Schalen. Die Atomradien werden in dieser Reihe kleiner.',
    materials: 'Borosilicatglas dehnt sich beim Erwärmen vergleichsweise wenig aus. Daher vertragen daraus hergestellte Laborgefäße Temperaturwechsel gut.',
  },
  C: {
    ions: 'In Calciumcarbonat gehört Kohlenstoff zum Carbonat-Ion CO₃²⁻. Die zweifache negative Ladung gilt für die ganze Gruppe aus einem Kohlenstoff- und drei Sauerstoffatomen.',
    polar: 'An einer C=O-Bindung trägt Kohlenstoff eine positive Teilladung, weil Sauerstoff die gemeinsamen Elektronen stärker anzieht. Eine C–C-Bindung zwischen gleichartigen Kohlenstoffatomen ist im einfachen Bindungsmodell unpolar.',
    trend: 'Kohlenstoff und Silicium besitzen je vier Außenelektronen. Silicium hat eine besetzte Schale mehr, einen größeren Atomradius und eine geringere Elektronegativität als Kohlenstoff.',
    electrochem: 'In vielen Lithium-Ionen-Akkus besteht die negative Elektrode aus Graphit. Beim Laden werden Lithium-Ionen zwischen seine Kohlenstoffschichten eingelagert, während Elektronen über den äußeren Stromkreis zufließen.',
    materials: 'In Diamant bildet jedes Kohlenstoffatom vier Bindungen in einem harten räumlichen Netzwerk. In Graphit bilden die Atome Schichten, die leicht gegeneinander gleiten.',
    orbitals: 'Ein freies Kohlenstoffatom hat im Grundzustand die Elektronenkonfiguration 1s² 2s² 2p². Im Methanmolekül beschreibt man seine vier gleichwertigen Bindungsrichtungen mit vier sp³-Hybridorbitalen.',
  },
  N: {
    polar: 'Im N₂-Molekül ziehen beide Stickstoffatome gleich stark an den Bindungselektronen. In einer N–H-Bindung trägt der Stickstoff eine negative Teilladung.',
    trend: 'Stickstoff und Phosphor stehen in derselben Gruppe. Weil die Außenelektronen des Phosphors eine weitere Schale besetzen, ist sein Atomradius größer.',
    electrochem: 'Das freie Elektronenpaar am Stickstoff von NH₃ kann ein Proton binden. Aus der Base Ammoniak entsteht dabei ihre zugehörige Säure, das Ammonium-Ion NH₄⁺.',
    materials: 'In Polyamiden wie Nylon gehören Stickstoffatome zur wiederkehrenden Gruppe –CO–NH–. Zwischen den Ketten können sich Wasserstoffbrücken bilden, die zum Zusammenhalt der Fasern beitragen.',
    complex: 'Das Stickstoffatom in Ammoniak kann einem Metall-Ion ein freies Elektronenpaar für eine Bindung zur Verfügung stellen. Ammoniak wirkt dann als Ligand.',
  },
  O: {
    ions: 'Ein Sauerstoffatom hat sechs Außenelektronen. Durch Aufnahme von zwei weiteren Elektronen entsteht ein zweifach negativ geladenes Oxid-Ion O²⁻.',
    polar: 'In Wasser zieht Sauerstoff die Elektronen der O–H-Bindungen zu sich. Deshalb trägt das Sauerstoffatom eine negative Teilladung.',
    trend: 'O²⁻ und F⁻ haben je zehn Elektronen. Das Oxid-Ion hat ein Proton weniger und hält diese Elektronen weniger stark fest, deshalb ist sein Ionenradius größer.',
    interactions: 'Das positiv polarisierte H-Atom eines Wassermoleküls kann zu einem freien Elektronenpaar an Sauerstoff eine Wasserstoffbrücke bilden. Solche freien Elektronenpaare kommen auch in Alkoholen und Estern vor.',
    electrochem: 'Beim Rosten von Eisen kann gelöster Sauerstoff Elektronen aufnehmen. In neutralem Wasser beschreibt die Gleichung O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻ diesen Teilschritt.',
    materials: 'In Polyestern sitzen Sauerstoffatome in den wiederkehrenden Estergruppen –C(=O)–O–. An diesen Gruppen kann Wasser unter geeigneten Bedingungen die Ketten spalten.',
  },
  F: {
    ions: 'Ein Fluoratom hat sieben Außenelektronen. Nimmt es ein Elektron auf, entsteht das einfach negativ geladene Fluorid-Ion F⁻.',
    polar: 'Fluor hat auf der Pauling-Skala die höchste Elektronegativität. In einer H–F-Bindung liegen die gemeinsamen Elektronen deshalb näher am Fluor.',
    trend: 'F⁻ und Na⁺ besitzen jeweils zehn Elektronen. Der Kern des Natriums hat zwei Protonen mehr und zieht diese Elektronen stärker an, daher ist Na⁺ kleiner als F⁻.',
    electrochem: 'Fluorwasserstoff HF und das Fluorid-Ion F⁻ bilden ein Säure-Base-Paar. Nimmt F⁻ ein Proton auf, entsteht HF.',
    materials: 'Im Kunststoff PTFE wiederholt sich der Baustein –CF₂–CF₂–. Starke C–F-Bindungen und die Fluoratome um das Kohlenstoffgerüst machen das Material besonders beständig gegen viele Chemikalien.',
  },
  Ne: {
    trend: 'Das Neonatom und die Ionen F⁻, Na⁺ und Mg²⁺ haben jeweils zehn Elektronen. In der Ionenreihe F⁻, Na⁺, Mg²⁺ steigt die Kernladung und der Ionenradius nimmt ab.',
  },
  Na: {
    ions: 'Ein Natriumatom kann sein einziges Außenelektron abgeben. Zurück bleibt das Natrium-Ion Na⁺ mit elf Protonen und zehn Elektronen.',
    polar: 'Natrium und Chlor unterscheiden sich stark in ihrer Elektronegativität. Im Kochsalzkristall beschreibt man ihre Anziehung als Ionenbindung zwischen Na⁺ und Cl⁻.',
    trend: 'Beim Übergang vom Natriumatom zu Na⁺ fällt die dritte besetzte Schale weg. Der Ionenradius von Na⁺ ist deshalb deutlich kleiner als der Atomradius von Natrium.',
    electrochem: 'In Natronlauge gehören Na⁺ und OH⁻ zu den gelösten Ionen. Bei der Neutralisation mit Salzsäure bleibt Na⁺ in Lösung, während OH⁻ ein Proton aufnimmt.',
    materials: 'Natriumoxid verringert im Natron-Kalk-Glas die Zahl der Brücken zwischen den Silicatbausteinen. Das Glas lässt sich dadurch bei niedrigeren Temperaturen verarbeiten als reines Quarzglas.',
  },
  Mg: {
    ions: 'Ein Magnesiumatom kann seine zwei Außenelektronen abgeben. Dem entstandenen Magnesium-Ion Mg²⁺ bleiben zwölf Protonen und zehn Elektronen.',
    polar: 'Sauerstoff zieht Elektronen wesentlich stärker an als Magnesium. Magnesiumoxid lässt sich im Schulmodell als Ionengitter aus Mg²⁺ und O²⁻ beschreiben.',
    trend: 'Mg²⁺ und Na⁺ haben beide zehn Elektronen. Mg²⁺ hat ein Proton mehr und zieht die Elektronenhülle stärker zusammen, sodass sein Ionenradius kleiner ist.',
    electrochem: 'Magnesium kann als Opferanode mit Stahl verbunden sein. Wenn es Elektronen an den Stahl liefert und selbst zu Mg²⁺ oxidiert wird, schützt es das Eisen vor Oxidation.',
    materials: 'Magnesiumlegierungen haben eine geringe Dichte und eignen sich für Bauteile, die leicht sein sollen. Zusätze wie Aluminium können die Festigkeit des Werkstoffs erhöhen.',
  },
  Al: {
    ions: 'Gibt ein Aluminiumatom drei Elektronen ab, entsteht ein Al³⁺-Ion. In Aluminiumoxid gleichen drei Oxid-Ionen O²⁻ die Ladung von zwei Al³⁺-Ionen aus.',
    polar: 'Chlor zieht die gemeinsamen Elektronen einer Al–Cl-Bindung stärker an als Aluminium. Die Chlorseite trägt deshalb eine negative Teilladung.',
    trend: 'Al³⁺, Mg²⁺ und Na⁺ besitzen jeweils zehn Elektronen. Bei Al³⁺ zieht die größte Kernladung die Elektronen am stärksten an, sodass Al³⁺ von den drei Ionen den kleinsten Radius hat.',
    electrochem: 'Aluminiumatome können zu Al³⁺ oxidiert werden. Die fest haftende Oxidschicht an der Oberfläche bremst unter vielen Alltagsbedingungen die weitere Reaktion.',
    materials: 'An Luft bildet Aluminium eine dünne, fest haftende Oxidschicht. Sie schützt das darunterliegende Metall vor weiterer Oxidation und trägt zur Beständigkeit von Aluminiumbauteilen bei.',
  },
  Si: {
    polar: 'In einer Si–O-Bindung zieht Sauerstoff die Elektronen stärker an als Silicium. Im Quarz verknüpfen solche polaren Bindungen die Atome zu einem durchgehenden Netzwerk.',
    trend: 'Silicium und Phosphor haben drei besetzte Schalen. Weil die Kernladung zum Phosphor hin zunimmt, sinkt der Atomradius.',
    materials: 'In Quarzglas sind SiO₄-Tetraeder über gemeinsame Sauerstoffatome zu einem Netzwerk verbunden. Die fehlende regelmäßige Anordnung über große Abstände kennzeichnet das Glas.',
  },
  P: {
    polar: 'Phosphor und Wasserstoff haben auf der Pauling-Skala fast dieselbe Elektronegativität. Die Elektronen einer P–H-Bindung sind daher annähernd gleich verteilt.',
    trend: 'Von Phosphor über Schwefel zu Chlor wächst bei gleicher Zahl besetzter Schalen die wirksame Kernanziehung. Die Atomradien nehmen in dieser Reihe ab und die Elektronegativitäten steigen.',
    electrochem: 'In Lithium-Eisenphosphat gehört Phosphor zur Phosphatgruppe PO₄³⁻. Beim Entladen nimmt das Eisen Elektronen auf, während die Oxidationszahl des Phosphors bei +V bleibt.',
    materials: 'Phosphatgruppen sind Teil des Kristallgerüsts einer Lithium-Eisenphosphat-Elektrode. Dieses Gerüst ermöglicht es, Lithium-Ionen beim Laden und Entladen wiederholt aus- und einzulagern.',
  },
  S: {
    ions: 'In Metallsulfiden kann Schwefel als Sulfid-Ion S²⁻ vorliegen. In Sulfaten gehört er zum mehratomigen Sulfat-Ion SO₄²⁻.',
    polar: 'An einer S–O-Bindung zieht Sauerstoff die Bindungselektronen stärker an als Schwefel. Am Sauerstoff entsteht deshalb eine negative Teilladung.',
    trend: 'Ein Sulfid-Ion S²⁻ hat bei gleicher Kernladung zwei Elektronen mehr als das neutrale Schwefelatom. Die Elektronen stoßen einander stärker ab, und die Hülle wird größer.',
    electrochem: 'In einer Kupfersulfat-Halbzelle trägt Sulfat als gelöstes Ion zur Leitfähigkeit bei. Die Elektronenübertragung an der Kupferelektrode betrifft das Paar Cu²⁺/Cu.',
    materials: 'Schwefelbrücken verknüpfen die langen Ketten von Kautschuk. Bei geringer Vernetzung lässt sich der Gummi dehnen und kehrt nach dem Loslassen weitgehend in seine ursprüngliche Form zurück.',
  },
  Cl: {
    ions: 'Ein Chloratom kann ein Elektron aufnehmen und wird dadurch zum Chlorid-Ion Cl⁻. Es besitzt nun ein Elektron mehr als Protonen.',
    polar: 'In Cl₂ teilen beide Atome das bindende Elektronenpaar gleichmäßig. In HCl zieht Chlor stärker am Elektronenpaar und trägt dadurch die negative Teilladung.',
    trend: 'Ein Chlorid-Ion Cl⁻ besitzt ein Elektron mehr als das Chloratom und hat einen größeren Radius. Von Fluor über Chlor zu Brom nehmen die Atomradien mit jeder zusätzlichen Schale zu, während die Elektronegativität sinkt.',
    electrochem: 'Wenn HCl in Wasser ein Proton abgibt, bleibt Cl⁻ zurück. HCl und Cl⁻ sind ein zugehöriges Säure-Base-Paar.',
    materials: 'Der Kettenbaustein von Polyvinylchlorid lautet –CH₂–CHCl–. Das Chlor macht die Kette polar und trägt dazu bei, dass PVC ohne Weichmacher bei Raumtemperatur hart ist.',
  },
  Ar: {
    trend: 'Ar, Cl⁻, K⁺ und Ca²⁺ besitzen je 18 Elektronen. Unter den drei Ionen hat Ca²⁺ die größte Kernladung und damit den kleinsten Ionenradius.',
  },
  K: {
    ions: 'Gibt ein Kaliumatom sein Außenelektron ab, entsteht K⁺. In Kaliumchlorid gleicht ein Chlorid-Ion die positive Ladung jedes Kalium-Ions aus.',
    trend: 'Ein Kaliumatom besitzt eine besetzte Schale mehr als ein Natriumatom. Auch die Ionen K⁺ und Na⁺ unterscheiden sich um eine besetzte Schale, deshalb ist K⁺ größer.',
    electrochem: 'Im Daniell-Element mit einer Kaliumnitrat-Salzbrücke wandern K⁺-Ionen in die Kupferhalbzelle. Dort gleichen sie Ladung aus, weil an der Elektrode Cu²⁺-Ionen aus der Lösung verbraucht werden.',
  },
  Ca: {
    ions: 'Ein Calciumatom bildet durch Abgabe von zwei Elektronen ein Ca²⁺-Ion. In Calciumfluorid gleichen zwei einfach negative Fluorid-Ionen diese Ladung aus.',
    trend: 'Ca²⁺ und K⁺ haben je 18 Elektronen. Bei Ca²⁺ zieht ein zusätzliches Proton die Hülle stärker an, daher ist dieses Ion kleiner.',
    electrochem: 'Bei der Reaktion von Calciumcarbonat mit Säure nimmt das Carbonat Protonen auf, und Kohlenstoffdioxid entsteht. Die Calcium-Ionen gehen dabei in Lösung.',
    materials: 'Feine Calciumcarbonatpartikel dienen als mineralischer Füllstoff in Kunststoffen. Je nach Menge und Teilchengröße können sie zum Beispiel die Biegesteifigkeit des Materials erhöhen.',
  },
  Ti: {
    materials: 'Titandioxid wird in Kunststoffen als Weißpigment verwendet. Wie gut es den Untergrund abdeckt, hängt auch von der Größe und Verteilung der Teilchen ab.',
  },
  Cr: {
    electrochem: 'Chrom trägt bei rostfreien Stählen zur Bildung einer schützenden, chromreichen Oxidschicht bei. Diese Passivschicht bremst die weitere Oxidation des Metalls.',
  },
  Mn: {
    electrochem: 'Mangandioxid bildet das aktive Material der positiven Elektrode in einer Alkali-Mangan-Batterie. Beim Entladen nimmt Mangan im ersten Schritt ein Elektron auf und wechselt von +IV zu +III.',
  },
  Fe: {
    ions: 'Eisen kann zum Beispiel Fe²⁺- oder Fe³⁺-Ionen bilden. Im Namen Eisen(III)-oxid gibt die römische Zahl an, dass das Eisen in diesem Oxid die Ladung 3⁺ trägt.',
    electrochem: 'Beim Rosten geben Eisenatome Elektronen ab. An anderen Stellen der feuchten Metalloberfläche nimmt gelöster Sauerstoff Elektronen auf.',
    materials: 'Der Kohlenstoffgehalt beeinflusst die Härte und Verformbarkeit von Stahl. Weitere Legierungselemente und die Wärmebehandlung verändern seine Eigenschaften zusätzlich.',
  },
  Co: {
    electrochem: 'Ein mögliches Material der positiven Elektrode in Lithium-Ionen-Akkus ist Lithiumcobaltoxid (LiCoO₂). Beim Laden verlassen Lithium-Ionen das Gitter und die mittlere Oxidationszahl des Cobalts steigt.',
    complex: 'Der Aquakomplex [Co(H₂O)₆]²⁺ erscheint rosa, der Chloridkomplex [CoCl₄]²⁻ blau. Bei gleicher Oxidationsstufe +II beeinflussen die Liganden und ihre räumliche Anordnung, welche Lichtanteile der Komplex absorbiert.',
  },
  Ni: {
    electrochem: 'In einem Nickel-Metallhydrid-Akku wechselt Nickel an der positiven Elektrode zwischen +II und +III. Beim Entladen wird Nickel(III) zu Nickel(II) reduziert.',
    materials: 'Nickel ist ein Bestandteil vieler austenitischer rostfreier Stähle. Es stabilisiert dort ein Kristallgitter, in dem sich der Stahl gut verformen lässt.',
  },
  Cu: {
    ions: 'Kupfer kann in Salzen als Cu⁺ oder Cu²⁺ vorliegen. Bei Kupfer(II)-sulfat zeigt die römische Zahl II die zweifach positive Ladung des Kupfer-Ions an.',
    trend: 'Ein Kupferatom kann Elektronen an Reaktionspartner abgeben und ein Kation bilden. Das Cu²⁺-Ion ist kleiner als das neutrale Kupferatom.',
    electrochem: 'Im Daniell-Element gelangen Elektronen von der Zinkelektrode durch den äußeren Leiter zur Kupferelektrode. An dieser Kathode entsteht aus Cu²⁺ und zwei Elektronen metallisches Kupfer.',
    advancedElectrochem: 'Das Standardpotenzial von Cu²⁺/Cu beträgt rund +0,34 V, das von Zn²⁺/Zn rund −0,76 V. Die Differenz ergibt für das Daniell-Element unter Standardbedingungen rund 1,10 V.',
    materials: 'Im Kupfer können sich Elektronen durch das Metall bewegen und Ladung transportieren. Seine hohe elektrische Leitfähigkeit und gute Verformbarkeit machen es zu einem Werkstoff für Kabel.',
    complex: 'In verdünnter wässriger Lösung ist der Aquakomplex [Cu(H₂O)₆]²⁺ hellblau. Sind vier Wassermoleküle durch Ammoniak ersetzt, erscheint der Komplex [Cu(NH₃)₄(H₂O)₂]²⁺ tiefblau.',
  },
  Zn: {
    ions: 'Ein Zinkatom kann zwei Elektronen abgeben und so zu Zn²⁺ werden. In Zinkoxid gleicht ein Oxid-Ion O²⁻ die zweifache positive Ladung aus.',
    electrochem: 'Am Minuspol des Daniell-Elements gibt ein Zinkatom zwei Elektronen ab und geht als Zn²⁺ in Lösung. Diese Oxidation findet an der Anode statt.',
    advancedElectrochem: 'Für die Leerlaufspannung eines Daniell-Elements in verdünnter Lösung gilt bei 25 °C näherungsweise U = 1,10 V − 0,0296 V · lg(c(Zn²⁺)/c(Cu²⁺)). Verzehnfacht sich bei konstanter Cu²⁺-Konzentration die Zn²⁺-Konzentration, sinkt die Spannung um rund 0,030 V.',
    materials: 'Eine Zinkschicht hält Wasser und Sauerstoff vom Stahl fern. Wird die Schicht angeritzt, kann benachbartes Zink bevorzugt oxidiert werden und den freiliegenden Stahl weiter schützen.',
  },
  Br: {
    ions: 'Ein Bromatom kann ein zusätzliches Elektron aufnehmen und ein Bromid-Ion Br⁻ bilden. In Silberbromid gleicht jeweils ein Ag⁺ die negative Ladung von Br⁻ aus.',
    polar: 'In Br₂ sind die Bindungselektronen gleichmäßig verteilt. In einer H–Br-Bindung zieht Brom stärker am Elektronenpaar, sodass ein Bindungsdipol entsteht.',
    trend: 'Brom steht im Periodensystem unter Chlor. Seine zusätzliche besetzte Elektronenschale macht sowohl das Bromatom als auch das Br⁻-Ion größer als die entsprechenden Chlorteilchen.',
    advancedElectrochem: 'An einer Silber/Silberbromid-Elektrode sind AgBr, Br⁻ und metallisches Ag am Gleichgewicht beteiligt. Deshalb ändert sich ihr Potenzial mit der Bromid-Aktivität der Lösung.',
    materials: 'Silberbromidkristalle machen die Schicht eines analogen Schwarzweißfilms lichtempfindlich. Nach der Entwicklung bilden feine Silberteilchen die dunklen Stellen des Negativs.',
  },
  Zr: {
    materials: 'Zirconiumdioxid ist ein Werkstoff für keramische Schneidkanten. Bei geeigneter Kristallstruktur bremst eine lokale Umwandlung des Materials die Ausbreitung kleiner Risse.',
  },
  Ag: {
    ions: 'In Silberbromid trägt Silber als Ag⁺ eine positive Ladung. Zu jedem Ag⁺ gehört in der Verhältnisformel ein einfach negatives Br⁻.',
    electrochem: 'Ein Ag⁺-Ion kann an einer Kathode ein Elektron aufnehmen. Dabei entsteht metallisches Silber, das sich auf der Elektrode abscheidet.',
  },
  Pd: {
    complex: 'Vier Chloridliganden können sich in einer Ebene um Palladium(II) anordnen. Für die Ladung des Komplexes [PdCl₄]²⁻ zählen einmal +2 und viermal −1.',
  },
  I: {
    polar: 'Ein I₂-Molekül besitzt keinen dauerhaften Dipol. Seine ausgedehnte Elektronenhülle lässt sich leicht verschieben, wodurch sich benachbarte I₂-Moleküle merklich anziehen.',
    materials: 'In manchen Polarisationsfolien liegen langgestreckte Polyiodid-Ionen entlang ausgerichteter Polymerketten. So absorbiert die Folie Licht einer Schwingungsrichtung stärker als Licht der dazu senkrechten Schwingungsrichtung.',
  },
  Pt: {
    electrochem: 'In der Standardwasserstoffelektrode vermittelt Platin den Elektronenaustausch zwischen H₂ und H⁺. Das Standardpotenzial dieser Referenzelektrode beträgt per Definition 0 V.',
    complex: 'Bei quadratisch-planaren Platin(II)-Komplexen können zwei gleichartige Liganden nebeneinander oder einander gegenüberliegen. Diese Anordnungen heißen cis und trans.',
  },
};

export const learningSources = [
  { topics: ['ions'], label: 'OpenStax · Ionen und Verhältnisformeln', url: 'https://openstax.org/books/chemistry-2e/pages/2-6-ionic-and-molecular-compounds' },
  { topics: ['polar', 'geometry'], label: 'OpenStax · Molekülform und Polarität', url: 'https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity' },
  { topics: ['trend'], label: 'OpenStax · Periodische Trends und Ionenradien', url: 'https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties' },
  { topics: ['interactions'], label: 'OpenStax · Zwischenmolekulare Kräfte', url: 'https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces' },
  { topics: ['organic', 'equilibrium'], label: 'Klett · Veresterung und Esterspaltung', url: 'https://asset.klett.de/assets/587a9808/Probeseiten_Elemente_Chemie_SekII_Kap3_756915.pdf' },
  { topics: ['electrochem'], label: 'OpenStax · Säuren, Basen, Puffer und Titration', url: 'https://openstax.org/books/chemistry-2e/pages/14-summary' },
  { topics: ['advancedElectrochem'], label: 'OpenStax · Elektrodenpotenziale und Nernst-Gleichung', url: 'https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium' },
  { topics: ['electrochem'], label: 'OpenStax · Galvanische Zellen und Batterien', url: 'https://openstax.org/books/chemistry-2e/pages/17-5-batteries-and-fuel-cells' },
  { topics: ['electrochem'], label: 'Massachusetts Institute of Technology · Lithium-Ionen-Akkus', url: 'https://climate.mit.edu/explainers/batteries' },
  { topics: ['orbitals'], label: 'OpenStax · Hybridorbitale', url: 'https://openstax.org/books/chemistry-2e/pages/8-2-hybrid-atomic-orbitals' },
  { topics: ['materials'], label: 'OpenStax · Struktur und Eigenschaften von Kunststoffen', url: 'https://openstax.org/books/organic-chemistry/pages/31-7-polymer-structure-and-physical-properties' },
  { topics: ['complex'], label: 'WJEC · Ligandenaustausch bei Kupfer und Cobalt', url: 'https://resource.download.wjec.co.uk/vtc/2019-20/KO19-20_1-28-i/pdf/WJEC/unit-3-4-transition-metals.pdf' },
  { topics: ['complex'], label: 'OpenStax · Lichtabsorption und Farbe von Komplexen', url: 'https://openstax.org/books/chemistry-2e/pages/19-3-spectroscopic-and-magnetic-properties-of-coordination-compounds' },
];
