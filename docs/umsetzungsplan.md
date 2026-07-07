# Umsetzungsplan

## Phase 1: Statische Basis

- `index.html` als Einstiegspunkt.
- `src/app.js` für UI, Navigation und Rendering.
- `src/questions.js` für Fragen und Antwortscores.
- `src/scoring.js` für Auswertung, Ergebnistext und Koordinaten.
- `src/styles.css` für pastell-chaotisches, aber formal wirkendes Interface.

Status: umgesetzt.

## Phase 2: Inhaltliche Kalibrierung

- Fragen lesen und Ton prüfen.
- Antwortoptionen schärfen.
- Scores nachjustieren.
- Lokales Itemfeedback beobachten: Fragen mit mindestens 10 Rückmeldungen und
  negativer Quote ab 40 Prozent redaktionell prüfen.
- Ergebnisformulierungen erweitern.
- Schwellenlogik testen: unterhalb verborgen, ab Schwelle sichtbar.

Empfehlung: Erst mit 5 bis 10 Personen ausprobieren und schauen, ob die Ergebnisse
gefühlt passen. Danach Scores feinjustieren.

## Phase 3: Visueller Test

- Pastell/chaotische Richtung im Browser prüfen.
- Lesbarkeit auf Mobilgeräten prüfen.
- 3D-Pyramide mit automatischer Rotation, Maus und Touch testen.
- Gegebenenfalls Farben, Größen und Abstände reduzieren oder mutiger machen.

## Phase 4: Hosting

Primär:

- GitHub Pages direkt aus dem Repository.

Fallback:

- Dateien per FTP/SFTP auf Netcup-Webspace laden.

Da die App keinen Build-Schritt braucht, kann exakt derselbe Stand auf beiden Wegen
veröffentlicht werden.

## Mögliche Erweiterungen

- Ergebnis als Bild exportieren.
- Zentral auswertbares Feedback nur mit Backend, Datenschutzerklärung und klarem
  Opt-in-Konzept.
- Öffentliche Hall of Fame nur mit freiwilligem Pseudonym und Löschmöglichkeit.
- Mehr Ergebnisprofile statt nur dynamischer Satz.
- Optionaler Debug-Modus für Score-Anzeige pro Antwort.
- Fragebogen als JSON auslagern, damit Nicht-Code-Editing leichter wird.
- Three.js oder React später nachziehen, wenn die 3D-Visualisierung komplexer werden soll.
