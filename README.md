# Fotzig Atzig Mausig

Eine kleine statische Webapp zur semi-wissenschaftlichen Einordnung in der Dreiecksskala
**Fotzig / Atzig / Mausig** mit latenter Tiefendimension **Cringe**.

Die App braucht kein Backend und keinen Build-Schritt. Sie besteht nur aus HTML, CSS und
JavaScript und kann dadurch kostenlos auf GitHub Pages oder klassischem Webspace wie Netcup
Webhosting veröffentlicht werden.

## Lokal starten

Am einfachsten:

1. `index.html` im Browser öffnen.
2. Test ausfüllen.
3. Ergebnis im 2D-Dreieck oder in der rotierbaren 3D-Pyramide ansehen.

Falls ein lokaler Webserver gewünscht ist:

```powershell
python -m http.server 8080
```

Dann `http://localhost:8080` öffnen.

## Inhalte ändern

Der Fragenkatalog liegt in:

```txt
src/questions.js
```

Jede Antwort hat Scores für:

```js
{ fotzig: 0, atzig: 0, mausig: 0, cringe: 0 }
```

Die Auswertung und Ergebnistexte liegen in:

```txt
src/scoring.js
```

Die aktuelle Cringe-Schwelle liegt bei 20 Prozent.

## Dokumentation

- [Spezifikation](docs/specifikation.md)
- [Umsetzungsplan](docs/umsetzungsplan.md)
- [Hosting](docs/hosting.md)

