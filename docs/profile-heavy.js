const rsc = (number, name) => `https://periodic-table.rsc.org/element/${number}/${name}`;

function radioactive(fact, factUrl, form, hazard, hazardUrl = factUrl) {
  return { fact, factUrl, form, pictograms: [], hazard, hazardUrl, status: "unknown", radiation: true };
}

function researchAtoms(number, name, fact, factUrl = rsc(number, name)) {
  return radioactive(
    fact,
    factUrl,
    "Einzelne Atome im Forschungsexperiment",
    "Die nachgewiesenen Atomkerne zerfallen und geben dabei Strahlung ab. Für eine chemische Gefahreneinstufung einer Stoffprobe fehlen belastbare Daten.",
    rsc(number, name)
  );
}

export const heavyProfiles = {
  Hg: {
    fact: "Früher wurden Löcher in Zähnen häufig mit Amalgam gefüllt. Darin ist Quecksilber mit Silber, Zinn und Kupfer zu einer festen Legierung verbunden.",
    factUrl: "https://www.bundesumweltministerium.de/fileadmin/Daten_BMU/Download_PDF/Chemikaliensicherheit/nationaler_aktionsplan_dentalamalgam_bf.pdf",
    form: "Flüssiges, elementares Quecksilber",
    pictograms: ["GHS06", "GHS08", "GHS09"],
    hazard: "Schon bei Raumtemperatur verdampft etwas Quecksilber. Das Einatmen der Dämpfe kann tödlich sein. Wiederholte Aufnahme schädigt Organe. Quecksilber ist auch für Wasserlebewesen sehr giftig.",
    hazardUrl: "https://www.carlroth.com/medias/SDB-7594-DE-DE.pdf?context=bWFzdGVyfHNlY3VyaXR5RGF0YXNoZWV0c3w0MzEyNDB8YXBwbGljYXRpb24vcGRmfGFHRXdMMmhpTmk4NU1qSXpNVEE1TlRjME5qZzJMMU5FUWw4M05UazBYMFJGWDBSRkxuQmtaZ3xmMGVjYmI3YWQ2OTEzOTZkMGQ3YzJkYjc2MzE0ZDVkMTQ5OTA5OTM5MTAwYzU1OTZkZGFiYjQxZTBmZjU3YmE3",
    status: "classified",
    radiation: false,
  },
  Tl: {
    fact: "Eine leuchtend grüne Linie im Lichtspektrum verriet William Crookes 1861, dass seine Probe ein unbekanntes Element enthielt. Er nannte es Thallium, nach dem griechischen Wort für einen grünen Trieb.",
    factUrl: rsc(81, "thallium"),
    form: "Metallisches Thallium als Granulat",
    pictograms: ["GHS06", "GHS08"],
    hazard: "Verschlucktes Thallium oder eingeatmeter Thalliumstaub kann tödlich wirken. Bei wiederholter Aufnahme können Organe Schaden nehmen.",
    hazardUrl: "https://static.cymitquimica.com/products/08/pdf/sds-81-0054.pdf",
    status: "classified",
    radiation: false,
  },
  Pb: {
    fact: "In vielen Autos liefert ein Bleiakku den Strom zum Starten. Eine seiner Elektroden besteht im geladenen Zustand aus metallischem Blei.",
    factUrl: "https://www.energy.gov/documents/doe-hdbk-1084-95",
    form: "Metallisches Blei als Granulat",
    pictograms: ["GHS08", "GHS09"],
    hazard: "Blei kann die Fruchtbarkeit und die Entwicklung des ungeborenen Kindes schädigen. Wiederholte Aufnahme schädigt unter anderem Nerven und Nieren. Blei ist sehr giftig für Wasserlebewesen.",
    hazardUrl: "https://www.carlroth.com/downloads/sdb/de/2/SDB_2734_DE_DE.pdf",
    status: "classified",
    radiation: false,
  },
  Bi: {
    fact: "Wismut dehnt sich beim Erstarren aus. Deshalb kann ein festes Stück Wismut auf seiner eigenen Schmelze schwimmen, ähnlich wie Eis auf Wasser.",
    factUrl: rsc(83, "bismuth"),
    form: "Metallisches Wismut in Stücken",
    pictograms: [],
    hazard: "Für die beschriebenen Metallstücke gibt der Hersteller keine GHS-Piktogramme an.",
    hazardUrl: "https://www.carlroth.com/downloads/sdb/de/1/SDB_1L6H_DE_DE.pdf",
    status: "none",
    radiation: false,
  },
  Po: radioactive(
    "Marie und Pierre Curie entdeckten Polonium 1898. Der Name erinnert an Polen, das Geburtsland von Marie Curie.",
    rsc(84, "polonium"),
    "Polonium-210, elementar",
    "Polonium-210 sendet Alphateilchen aus. Gelangt es in den Körper, kann die Strahlung das umliegende Gewebe schwer schädigen.",
    "https://archiv.bge.de/archiv/www.endlager-morsleben.de/DE/themen/ion/wirkung/radioaktive-stoffe/polonium/polonium_node.html"
  ),
  At: radioactive(
    "Selbst beim langlebigsten Astat-Isotop ist nach rund acht Stunden die Hälfte der Atomkerne zerfallen.",
    rsc(85, "astatine"),
    "Astat in winzigen Forschungsmengen",
    "Alle Astat-Isotope sind radioaktiv. Den kurzlebigen Stoff konnten Forschende bisher nur in winzigen Mengen untersuchen."
  ),
  Rn: radioactive(
    "Das geruchlose Edelgas Radon entsteht im Boden. Es kann durch Risse im Fundament in ein Haus gelangen und sich in der Raumluft ansammeln.",
    "https://www.bundesumweltministerium.de/themen/strahlenschutz/ionisierende-strahlung/radon",
    "Radon-222 als Gas in der Raumluft",
    "Beim Einatmen gelangen auch radioaktive Zerfallsprodukte in die Atemwege. Wer über Jahre höheren Radonkonzentrationen ausgesetzt ist, hat ein erhöhtes Lungenkrebsrisiko."
  ),
  Fr: radioactive(
    "Marguerite Perey entdeckte Francium 1939 in Paris. Der Name des Elements erinnert an ihr Heimatland Frankreich.",
    rsc(87, "francium"),
    "Francium-223 in Spuren",
    "Francium-223 zerfällt schnell. Nach etwa 22 Minuten ist die Hälfte seiner Atomkerne zerfallen und hat dabei Strahlung abgegeben."
  ),
  Ra: radioactive(
    "Alte Uhren hatten mitunter Zifferblätter, die im Dunkeln leuchteten. Strahlung von Radium-226 regte einen Leuchtstoff in der Farbe zum Leuchten an.",
    "https://response.epa.gov/site/site_profile.aspx?site_id=6560",
    "Radium-226",
    "Radium-226 hat eine Halbwertszeit von rund 1.600 Jahren. Dauerhaft hohe Belastungen mit Radium erhöhen unter anderem das Risiko für Knochenkrebs.",
    "https://www.epa.gov/radiation/radionuclide-basics-radium"
  ),
  Ac: radioactive(
    "Im Dunkeln kann die Luft rund um Actinium bläulich leuchten. Die Strahlung des Metalls regt die Luft dazu an, Licht auszusenden.",
    rsc(89, "actinium"),
    "Metallisches Actinium",
    "Actinium ist radioaktiv. Das natürlich vorkommende Actinium-227 hat eine Halbwertszeit von rund 22 Jahren."
  ),
  Th: {
    fact: "Frühere Gaslampen hatten einen Glühstrumpf mit Thoriumoxid. Die Gasflamme erhitzte das Oxid so stark, dass es helles weißes Licht abgab.",
    factUrl: rsc(90, "thorium"),
    form: "Feines Pulver aus metallischem Thorium",
    pictograms: ["GHS02", "GHS08"],
    hazard: "Das Pulver kann sich an der Luft selbst entzünden. Eingeatmeter Staub schädigt die Lunge und kann Krebs verursachen. Thorium sendet ionisierende Strahlung aus.",
    hazardUrl: "https://www.inchem.org/documents/icsc/icsc/eics0337.htm",
    status: "classified",
    radiation: true,
  },
  Pa: radioactive(
    "Protactinium steht hinter Thorium, obwohl seine mittlere Atommasse kleiner ist. Seine Atome haben ein Proton mehr. Nach dieser Zahl ist das Periodensystem geordnet.",
    rsc(91, "protactinium"),
    "Metallisches Protactinium",
    "Das silbrige Metall ist radioaktiv. In Uranerzen kommt es von Natur aus nur in Spuren vor."
  ),
  U: {
    fact: "Zirkonkristalle enthalten oft ein wenig Uran, das mit der Zeit zu Blei zerfällt. Am Verhältnis von Uran- zu Blei-Isotopen können Geologen das Alter eines Kristalls ablesen.",
    factUrl: "https://pubs.usgs.gov/circ/1400/circ1400.pdf",
    form: "Metallisches Uran als Labor-Referenzmaterial",
    pictograms: ["GHS02", "GHS06", "GHS08", "GHS09"],
    hazard: "Uran ist radioaktiv und chemisch giftig. Eingeatmeter oder verschluckter Uranstaub kann lebensgefährlich sein. Fein verteiltes Metall kann sich an der Luft entzünden. Uran kann Organe und Wasserlebewesen langfristig schädigen.",
    hazardUrl: "https://science.osti.gov/-/media/nbl/pdf/price-lists/SDS/SDS-Uranium_Metal.pdf",
    status: "classified",
    radiation: true,
  },
  Np: radioactive(
    "Neptunium folgt im Periodensystem direkt auf Uran. Das spiegelt sich in den Namen wider. Im Sonnensystem folgt auf den Planeten Uranus der Planet Neptun.",
    rsc(93, "neptunium"),
    "Metallisches Neptunium",
    "Neptunium ist ein radioaktives Metall. Es kommt in manchen Uranerzen in sehr kleinen Mengen vor."
  ),
  Pu: radioactive(
    "Der Marsrover Perseverance gewinnt Strom aus der Wärme, die beim Zerfall von Plutonium-238 entsteht. Ein Teil der Wärme hält seine Technik auf dem kalten Mars warm.",
    "https://science.nasa.gov/resource/441839/",
    "Plutonium-238, auch als feine Partikel",
    "Plutonium-238 sendet Alphateilchen aus. Eingeatmete Partikel können in der Lunge bleiben und dort das Gewebe schädigen.",
    "https://www.epa.gov/radiation/radionuclide-basics-plutonium"
  ),
  Am: radioactive(
    "In manchen Rauchmeldern macht Americium-241 die Luft in einer Messkammer elektrisch leitfähig. Dringt Rauch ein, wird der Strom schwächer und der Alarm löst aus.",
    "https://www.nrc.gov/regulations-legislation/fact-sheets-brochures/backgrounder-on-smoke-detectors",
    "Americium-241 in einer umschlossenen Strahlenquelle",
    "Americium-241 sendet vor allem Alphateilchen aus. Bei bestimmungsgemäßem Gebrauch bleibt die Quelle im intakten Rauchmelder eingeschlossen. Aufgenommenes Americium kann Gewebe über Jahre bestrahlen.",
    "https://www.epa.gov/radiation/radionuclide-basics-americium-241"
  ),
  Cm: radioactive(
    "Ein Messgerät auf dem Mars nutzte Strahlung von Curium-244, um die chemischen Elemente in Steinen und im Marsboden zu bestimmen.",
    "https://planetarydata.jpl.nasa.gov/img/data/mpf/rover/mprv_0001/document/apxsinst.htm",
    "Curium-244 in einer Strahlenquelle",
    "Curium-244 gibt beim Zerfall Alphateilchen ab. Bei dem Messgerät nutzten Forschende diese Strahlung zur Untersuchung von Gestein."
  ),
  Bk: radioactive(
    "Berkelium trägt den Namen der kalifornischen Stadt Berkeley. Dort wies ein Forschungsteam das Element 1949 erstmals nach.",
    "https://www.gsi.de/forschungbeschleuniger/forschung_ein_ueberblick/neue_elemente/stadt_land_fluss?no_cache=1",
    "Metallisches Berkelium in kleinen Forschungsmengen",
    "Berkelium ist ein radioaktives Metall. Für Untersuchungen stehen nur sehr kleine Mengen zur Verfügung.",
    rsc(97, "berkelium")
  ),
  Cf: radioactive(
    "Mit Neutronen aus Californium-252 lässt sich die Feuchtigkeit im Untergrund untersuchen. Die Wasserstoffkerne im Wasser bremsen die Neutronen ab.",
    rsc(98, "californium"),
    "Californium-252 in einer Strahlenquelle",
    "Californium-252 sendet Alphateilchen und Neutronen aus. Die Neutronenstrahlung kann auch von außen auf den Körper einwirken.",
    "https://www.uwyo.edu/safety/_files/docs/procedures/nuclearsafetydatasheets/252cf.pdf"
  ),
  Es: radioactive(
    "2021 genügten weniger als 250 Nanogramm Einsteinium, um erstmals einen Bindungsabstand zu messen. Dieser Abstand gibt an, wie weit zwei gebundene Atome voneinander entfernt sind.",
    "https://isotopes.gov/einsteinium/chemistry",
    "Einsteinium in winzigen Forschungsmengen",
    "Einsteinium ist stark radioaktiv. Für chemische Messungen an den kleinen Proben braucht das Forschungsteam besonderen Strahlenschutz."
  ),
  Fm: radioactive(
    "Bei Fermium erreicht das Periodensystem erstmals eine dreistellige Ordnungszahl. Jeder Fermiumkern hat genau 100 Protonen. Der Name ehrt den Physiker Enrico Fermi.",
    rsc(100, "fermium"),
    "Fermium in Spuren",
    "Fermium ist radioaktiv. Selbst für die Forschung stehen nur Spuren des Elements zur Verfügung."
  ),
  Md: researchAtoms(
    101, "mendelevium",
    "Bei der Entdeckung von Mendelevium im Jahr 1955 entstanden gerade einmal 17 Atome. Das Element trägt den Namen von Dmitri Mendelejew, einem der Begründer des Periodensystems."
  ),
  No: researchAtoms(
    102, "nobelium",
    "In wässriger Lösung sind die zweifach positiv geladenen Ionen von Nobelium besonders stabil. Einem solchen Ion fehlen gegenüber dem neutralen Atom zwei Elektronen.",
    "https://pubmed.ncbi.nlm.nih.gov/17749450/"
  ),
  Lr: researchAtoms(
    103, "lawrencium",
    "Lawrencium ist nach Ernest Lawrence benannt. Er erfand das Zyklotron, einen Teilchenbeschleuniger, der die Erforschung neuer Elemente ermöglichte."
  ),
  Rf: researchAtoms(
    104, "rutherfordium",
    "Selbst mit einzelnen Atomen ließ sich die Chemie von Rutherfordium untersuchen. In Lösung verhält es sich ähnlich wie Zirconium und Hafnium, die im Periodensystem direkt darüber stehen."
  ),
  Db: researchAtoms(
    105, "dubnium",
    "Im russischen Dubna und im amerikanischen Berkeley untersuchten zwei Forschungsteams Element 105 unabhängig voneinander. Im Namen Dubnium ist der Forschungsort Dubna verewigt."
  ),
  Sg: researchAtoms(
    106, "seaborgium",
    "Glenn Seaborg konnte seinen eigenen Namen im Periodensystem lesen. 1997 wurde das Element Seaborgium offiziell nach dem damals noch lebenden Chemiker benannt.",
    "https://iupac.org/cms/wp-content/uploads/2016/06/names-and-symbols-of-elements.pdf"
  ),
  Bh: researchAtoms(
    107, "bohrium",
    "Der Name Bohrium erinnert an Niels Bohr. Sein Atommodell beschreibt, dass die Elektronen eines Atoms nur bestimmte Energien haben können.",
    "https://www.gsi.de/forschungbeschleuniger/forschung_ein_ueberblick/neue_elemente"
  ),
  Hs: researchAtoms(
    108, "hassium",
    "Sieben nachgewiesene Hassiumatome genügten für ein chemisches Experiment. Sie bildeten mit Sauerstoff eine flüchtige Verbindung, ähnlich wie das verwandte Osmium.",
    "https://www.nature.com/articles/nature00980"
  ),
  Mt: researchAtoms(
    109, "meitnerium",
    "Als Forschende 1982 in Darmstadt Meitnerium entdeckten, erkannten sie das neue Element an den Teilchen, die seine Atomkerne beim Zerfall aussandten.",
    "https://www.gsi.de/ueber_uns/50_jahre_gsi/zeitstrahl_1969_2019"
  ),
  Ds: researchAtoms(
    110, "darmstadtium",
    "Beim ersten Darmstadtium-Atom ist sogar die Uhrzeit überliefert. Am 9. November 1994 um 16.39 Uhr wurde es in Darmstadt nachgewiesen.",
    "https://pubchem.ncbi.nlm.nih.gov/element/110"
  ),
  Rg: researchAtoms(
    111, "roentgenium",
    "Roentgenium trägt den Namen von Wilhelm Conrad Röntgen. Er entdeckte die Strahlung, mit der Ärztinnen und Ärzte heute Knochen im Körper sichtbar machen.",
    "https://www.gsi.de/forschungbeschleuniger/forschung_ein_ueberblick/neue_elemente"
  ),
  Cn: researchAtoms(
    112, "copernicium",
    "Wie fest haftet ein einzelnes Atom auf Gold? Mit dieser Messung fanden Forschende heraus, dass sich Copernicium ähnlich wie das verwandte Quecksilber metallisch verhält.",
    "https://onlinelibrary.wiley.com/doi/10.1002/anie.200705019/abstract"
  ),
  Nh: researchAtoms(
    113, "nihonium",
    "Nihonium wurde in Japan entdeckt. „Nihon“ ist ein japanischer Name für das Land und bedeutet „Ursprung der Sonne“.",
    "https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/"
  ),
  Fl: researchAtoms(
    114, "flerovium",
    "An insgesamt acht Atomen untersuchte ein Team, wie Flerovium an Oberflächen haftet. Die Messungen zeigten, dass es ein sehr flüchtiges Metall ist.",
    "https://superheavies.uni-mainz.de/files/2022/09/2022-09-15_press-release_flerovium-chemistry.pdf"
  ),
  Mc: researchAtoms(
    115, "moscovium",
    "Moscovium trägt den Namen der Region Moskau. Dort liegt Dubna, wo ein internationales Forschungsteam die ersten Atome des Elements beobachtete.",
    "https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/"
  ),
  Lv: researchAtoms(
    116, "livermorium",
    "Bei der Entdeckung von Livermorium arbeiteten Forschende aus Dubna und dem kalifornischen Livermore zusammen. Stadt und Forschungslabor in Kalifornien gaben dem Element seinen Namen.",
    "https://pls.llnl.gov/research-and-development/livermorium"
  ),
  Ts: researchAtoms(
    117, "tennessine",
    "Der Name Tenness ehrt Forschungseinrichtungen im US-Bundesstaat Tennessee. Das Element steht unter Astat in derselben Spalte wie Fluor, Chlor und Iod.",
    "https://iupac.org/wp-content/uploads/2016/11/pac20160501-AOP.pdf"
  ),
  Og: researchAtoms(
    118, "oganesson",
    "Ein Oganessonkern enthält 118 Protonen. Damit steht das Element am Ende der siebten Periode, in derselben Spalte wie Helium und Neon."
  ),
};
