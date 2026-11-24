"""Fetch reusable bibliographic metadata, not article bodies or abstracts."""
import datetime as dt
import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

JOURNALS = {
    "1433-7851": "Angewandte Chemie International Edition",
    "0002-7863": "Journal of the American Chemical Society",
    "2041-6539": "Chemical Science",
    "1463-9262": "Green Chemistry",
    "2374-7943": "ACS Central Science",
}
TOPICS = {
    "Energie": r"batter(?:y|ies)|electroly[sz]|fuel cell|hydrogen|photovoltaic|energy stor|supercapacitor",
    "Umwelt": r"recycl|pollut|carbon capture|carbon dioxide|remediation|water treatment|microplastic|waste",
    "Medizin": r"drug|therap|protein|enzyme|antibiotic|cancer|bioimaging|biosensor|medicinal",
    "Materialien": r"polymer|material|nanoparticle|nanostructure|semiconductor|membrane|graphene|perovskite",
    "Katalyse": r"cataly|electrocataly|photocataly",
}
# Match explicit element names, not ambiguous chemical symbols or inferred claims.
ELEMENTS = {
    "H": "hydrogen|wasserstoff|deuterium", "Li": "lithium", "Be": "beryllium",
    "B": "boron|borane|boronic", "C": "carbon|graphene|graphite|kohlenstoff",
    "N": "nitrogen|stickstoff", "O": "oxygen|sauerstoff", "F": "fluorine|fluoride|fluorid",
    "Na": "sodium|natrium", "Mg": "magnesium", "Al": "aluminium|aluminum",
    "Si": "silicon|silicium", "P": "phosphorus|phosphate|phosphat",
    "S": "sulfur|sulphur|schwefel", "Cl": "chlorine|chloride|chlorid",
    "K": "potassium|kalium", "Ca": "calcium", "Sc": "scandium",
    "Ti": "titanium|titan", "V": "vanadium", "Cr": "chromium|chrom",
    "Mn": "manganese|mangan", "Fe": "iron|eisen", "Co": "cobalt|kobalt",
    "Ni": "nickel", "Cu": "copper|kupfer", "Zn": "zinc|zink",
    "Ga": "gallium", "Ge": "germanium", "As": "arsenic|arsen",
    "Se": "selenium|selen", "Br": "bromine|bromide|bromid",
    "Rb": "rubidium", "Sr": "strontium", "Y": "yttrium", "Zr": "zirconium|zirkonium",
    "Nb": "niobium", "Mo": "molybdenum|molybdän", "Ru": "ruthenium",
    "Rh": "rhodium", "Pd": "palladium", "Ag": "silver|silber",
    "Cd": "cadmium", "In": "indium", "Sn": "tin|zinn", "Sb": "antimony|antimon",
    "Te": "tellurium|tellur", "I": "iodine|iodide|iodid", "Xe": "xenon",
    "Cs": "cesium|caesium", "Ba": "barium", "La": "lanthanum|lanthan",
    "Ce": "cerium", "Nd": "neodymium|neodym", "Eu": "europium",
    "Gd": "gadolinium", "Hf": "hafnium", "Ta": "tantalum|tantal",
    "W": "tungsten|wolfram", "Re": "rhenium", "Os": "osmium",
    "Ir": "iridium", "Pt": "platinum|platin", "Au": "gold",
    "Hg": "mercury|quecksilber", "Pb": "lead|blei", "Bi": "bismuth|bismut",
    "Th": "thorium", "U": "uranium|uran", "Pu": "plutonium",
}
def clean(value):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", "", value)).split())

def record(item, journal, today):
    title = clean((item.get("title") or [""])[0])
    doi = item.get("DOI", "")
    parts = item.get("published", {}).get("date-parts", [[]])[0]
    if not title or not re.fullmatch(r"10\.\d{4,9}/\S+", doi) or len(parts) < 3:
        return None
    if re.search(r"^(correction|retraction|erratum|editorial|cover|inside cover|front cover|back cover|table of contents|issue information)\b", title, re.I):
        return None
    try:
        date = dt.date(*parts[:3])
    except (ValueError, TypeError):
        return None
    if date > today or date < today - dt.timedelta(days=90):
        return None
    topics = [name for name, pattern in TOPICS.items() if re.search(pattern, title, re.I)]
    # Exclude ambiguous "lead" without a chemistry context.
    tags = [symbol for symbol, pattern in ELEMENTS.items()
            if re.search(r"\b(?:" + pattern + r")\b", title, re.I)
            and (symbol != "Pb" or re.search(r"\blead[- ](?:free|based|halide|ion|acetate|oxide|perovskite)|\bblei\b", title, re.I))]
    return {"title": title, "source": journal, "date": date.isoformat(),
            "doi": doi, "url": "https://doi.org/" + urllib.parse.quote(doi, safe="/:"),
            "topics": topics or ["Grundlagenforschung"], "elements": tags}

def main():
    today = dt.datetime.now(dt.timezone.utc).date()
    target = Path("docs/research-news.json")
    old = json.loads(target.read_text(encoding="utf-8")) if target.exists() else {"items": []}
    records = {x["doi"].lower(): x for x in old.get("items", [])
               if x.get("date", "") >= (today-dt.timedelta(days=90)).isoformat()}
    successes = 0
    for issn, journal in JOURNALS.items():
        params = urllib.parse.urlencode({
            "filter": f"type:journal-article,from-pub-date:{today-dt.timedelta(days=90)},until-pub-date:{today}",
            "sort": "published", "order": "desc", "rows": 35,
            "select": "DOI,title,published",
        })
        url = f"https://api.crossref.org/journals/{issn}/works?{params}"
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "DAgTableResearch/1.0 (https://github.com/ZazarosDD/D-Ag-Table)"})
            with urllib.request.urlopen(request, timeout=25) as response:
                items = json.load(response)["message"]["items"]
            for item in items:
                row = record(item, journal, today)
                if row:
                    records[row["doi"].lower()] = row
            successes += 1
        except (OSError, ValueError, KeyError, TypeError) as exc:
            print(f"{journal}: {exc}")
        time.sleep(1)
    if not successes or not records:
        # On a total outage keep the already deployed site unchanged.
        raise SystemExit("No research data available; deployment stopped.")
    data = {"updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
            "sources_ok": successes, "sources_total": len(JOURNALS),
            "items": sorted(records.values(), key=lambda x: (x["date"], x["doi"]), reverse=True)[:175]}
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

if __name__ == "__main__":
    main()
