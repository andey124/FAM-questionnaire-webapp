# Umsetzungsplan

## Phase 1: Statische Basis

- `index.html` als Einstiegspunkt.
- `src/app.js` fuer UI, Navigation und Rendering.
- `src/questions.js` fuer Fragen und Antwortscores.
- `src/scoring.js` fuer Auswertung, Ergebnistext und Koordinaten.
- `src/styles.css` fuer pastell-chaotisches, aber formal wirkendes Interface.

Status: umgesetzt.

## Phase 2: Inhaltliche Kalibrierung

- Fragen lesen und Ton pruefen.
- Antwortoptionen schaerfen.
- Scores nachjustieren.
- Ergebnisformulierungen erweitern.
- Cringe-Schwelle testen.

Empfehlung: Erst mit 5 bis 10 Personen ausprobieren und schauen, ob die Ergebnisse
gefuehlt passen. Danach Scores feinjustieren.

## Phase 3: Visueller Test

- Pastell/chaotische Richtung im Browser pruefen.
- Lesbarkeit auf Mobilgeraeten pruefen.
- 3D-Pyramide mit Maus und Touch testen.
- Gegebenenfalls Farben, Groessen und Abstaende reduzieren oder mutiger machen.

## Phase 4: Hosting

Primaer:

- GitHub Pages direkt aus dem Repository.

Fallback:

- Dateien per FTP/SFTP auf Netcup-Webspace laden.

Da die App keinen Build-Schritt braucht, kann exakt derselbe Stand auf beiden Wegen
veroeffentlicht werden.

## Moegliche Erweiterungen

- Ergebnis als Bild exportieren.
- Share-Text generieren.
- Mehr Ergebnisprofile statt nur dynamischer Satz.
- Optionaler Debug-Modus fuer Score-Anzeige pro Antwort.
- Fragebogen als JSON auslagern, damit Nicht-Code-Editing leichter wird.
- Three.js oder React spaeter nachziehen, wenn die 3D-Visualisierung komplexer werden soll.

