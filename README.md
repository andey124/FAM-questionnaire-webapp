# Fotzig Atzig Mausig

Eine kleine statische Webapp zur semi-wissenschaftlichen Einordnung in der Dreiecksskala
**Fotzig / Atzig / Mausig** mit versteckter Schwellenlogik für Sonderfälle.

Die App braucht kein Backend und keinen Build-Schritt. Sie besteht nur aus HTML, CSS und
JavaScript und kann dadurch kostenlos auf GitHub Pages oder klassischem Webspace wie Netcup
Webhosting veröffentlicht werden.

## Lokal starten

Am einfachsten:

1. `index.html` im Browser öffnen.
2. Test ausfüllen.
3. Ergebnis im 2D-Dreieck ansehen. Nur bei überschrittener Schwelle erscheint eine zusätzliche 3D-Auswertung.

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

Die Auswertung, Schwellenlogik und Ergebnistexte liegen in:

```txt
src/scoring.js
```

Die aktuelle Schwelle liegt bei 20 Prozent. Werte darunter werden proportional auf Fotzig, Atzig und Mausig umgelegt, sodass die sichtbaren Werte immer 100 Prozent ergeben.

## Kodierung

Die Anwendung verwendet UTF-8. Deutsche Umlaute wie ä, ö und ü sollen direkt in UI,
Fragen und Dokumentation stehen.

## Dokumentation

- [Spezifikation](docs/specifikation.md)
- [Umsetzungsplan](docs/umsetzungsplan.md)
- [Hosting](docs/hosting.md)
