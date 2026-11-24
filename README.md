# Elementatlas – PSE lernen

Das interaktive Periodensystem trägt im Unterricht den Namen **D[Ag] Table**. Dieser Export enthält den Quellstand der veröffentlichten Version 9. Alle 118 Elementsteckbriefe, Bilder, Schriften, Verbindungen, Jahrgangsansichten, Übungen und Redoxsimulationen liegen im Ordner `docs/`. Der Atlas läuft als statische Website im Browser. Er benötigt weder einen API-Schlüssel noch eine ChatGPT-Anmeldung, eine Datenbank oder einen Build-Schritt.

## Lokal starten

1. Entpacke die ZIP-Datei und öffne den Ordner `elementatlas-pse-lernen`. Hier liegen diese README und der Ordner `docs`.
2. Öffne ein Terminal in diesem Ordner. Starte mit Python 3 einen lokalen Webserver.

   ```sh
   python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
   ```

   Unter Windows kannst du `python3` durch `py -3` ersetzen.
3. Öffne [den lokalen Atlas](http://127.0.0.1:8000/) im Browser. Beende den Server mit `Strg+C`. Der Server ermöglicht das Laden der JavaScript-Module. Die Unterrichtsfunktionen laufen lokal auch ohne Internet. Verlinkte externe Quellen benötigen eine Verbindung.

## Auf GitHub Pages veröffentlichen

1. Erstelle auf GitHub ein **neues öffentliches Repository**, beispielsweise `elementatlas-pse-lernen`. Die Anleitung verwendet den Branch `main`. Ein öffentliches Repository lässt sich mit GitHub Free über Pages veröffentlichen.
2. Klone das neue Repository, zum Beispiel mit GitHub Desktop über **File → Clone repository**. Kopiere den **Inhalt** des entpackten Projektordners in den geklonten Ordner. Im Repository muss die Startdatei unter `docs/index.html` liegen. Kopiere den gesamten Ordner `docs` einschließlich `.nojekyll`.
3. Speichere die Dateien mit **Commit to main** und übertrage sie mit **Publish branch** oder **Push origin** auf GitHub.
4. Öffne im Repository **Settings → Pages**. Wähle unter **Build and deployment** die Quelle **Deploy from a branch**, dann den Branch **main** und den Ordner **/docs**. Klicke auf **Save**.
5. Sobald GitHub die Veröffentlichung abgeschlossen hat, öffne **Visit site**. Bei einem Projekt-Repository lautet die Adresse üblicherweise `https://BENUTZERNAME.github.io/REPOSITORYNAME/`. Nutze die in Pages angezeigte Adresse. Spätere Änderungen in `docs/` veröffentlichst du mit einem weiteren Commit und Push.

Eine schnelle Funktionsprobe nach der Veröffentlichung: Wähle **Gesamtansicht**, öffne den Steckbrief von Natrium und tippe auf Natriumchlorid. Wechsle dann zur Redoxsimulation und zur Übungsansicht. Falls GitHub eine 404-Seite zeigt, kontrolliere den ausgewählten Branch und den genauen Pfad `docs/index.html`.

[Offizielle Anleitung zu Veröffentlichungsquellen für GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Quellcode bearbeiten

| Pfad | Inhalt |
| --- | --- |
| `docs/index.html`, `docs/app.js` | Startseite, Suche, Filter, Navigation und Ansichten |
| `docs/*.css` | Layout, responsive Darstellung, Farben und Unterrichtsansichten |
| `docs/elements.js`, `docs/profile-*.js`, `docs/compounds-*.js` | Elementdaten, Kurzfakten, Gefahrenhinweise, Verbindungen und Anwendungen |
| `docs/atom-model.js`, `docs/flame.js`, `docs/comparison.js` | Atommodelle, Flammenfarben und Eigenschaftsvergleiche |
| `docs/school*.js`, `docs/practice*.js`, `docs/topics-*.js`, `docs/redox*.js` | Didaktische Reduktion, Aufgaben, Lehrkraftwerkzeuge und Simulationen |
| `docs/assets/` | Bilder, Gefahrenzeichen, Logo, lokale Roboto-Schriften und Schriftlizenz |
| `tests/` | Prüfungen für Steckbriefe und Bilder, Schalen und Orbitale, Jahrgänge, Aufgaben und Redox |

Alle Ressourcenpfade sind relativ. Links zu Ansichten und Steckbriefen verwenden ein `#` und funktionieren auch unter einem Repository-Unterpfad. Halte beim Umbenennen von Dateien die Groß- und Kleinschreibung in allen Verweisen ein.

Die mitgelieferten Tests lassen sich optional mit Node.js 24 aus dem Projektordner ausführen, beispielsweise mit `node tests/verify_profiles.mjs`. Die vier weiteren `.mjs`-Dateien werden auf dieselbe Weise einzeln gestartet.

## Bildnachweise und Datenquellen

Im Atlas führen **Datenquellen** und die Nachweise in den Steckbriefen zu den jeweiligen Quellen. Bildurheber, Bearbeitungsvermerke und Lizenzen stehen bei den einzelnen Motiven. Behalte diese Angaben bei einer Weiterveröffentlichung bei. Die Schriftlizenz liegt in `docs/assets/Roboto-LICENSE.txt`.
