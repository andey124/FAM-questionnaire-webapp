# Fotzig Atzig Mausig

Eine kleine statische Webapp zur semi-wissenschaftlichen Einordnung in der Dreiecksskala
**Fotzig / Atzig / Mausig** mit versteckter Schwellenlogik für Sonderfälle.

Die App braucht kein Backend und keinen Build-Schritt. Sie besteht nur aus HTML, CSS und
JavaScript und kann dadurch kostenlos auf GitHub Pages oder klassischem Webspace wie Netcup
Webhosting veröffentlicht werden.

## Lokal starten

Am einfachsten:

1. `index.html` im Browser öffnen.
2. Test ausfüllen. Pro Durchlauf werden 12 aktive Fragen zufällig aus dem Pool gewählt;
   auch die Antworten erscheinen in zufälliger Reihenfolge.
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

Fragen und Antworten haben stabile IDs. Mit `active: false` bleibt eine Frage im
Katalog, wird aber nicht zufällig ausgespielt.

Die Auswertung, Schwellenlogik und Ergebnistexte liegen in:

```txt
src/scoring.js
```

## Fragen erstellen

Für externe Vorschläge gibt es ein separates Zero-Setup-Tool:

```txt
fragen-tool.html
```

Die Datei kann direkt im Browser geöffnet werden. Dort lassen sich beliebig viele
Fragen und Antworten anlegen und als Datei herunterladen. Die exportierte Datei
enthält ein Array im gleichen Grundformat wie der interne Fragenkatalog:

Die Haupt-App verlinkt dieses Tool nur als separaten Vorschlagsweg. Eine automatische
Übernahme in den laufenden Fragenkatalog ist nicht vorgesehen.

```js
{
  id: "stabile-frage-id",
  active: true,
  text: "Situationsbeschreibung",
  answers: [
    {
      id: "stabile-antwort-id",
      text: "Antworttext",
      scores: { fotzig: 0, atzig: 0, mausig: 0, cringe: 0 }
    }
  ]
}
```

Die aktuelle Schwelle liegt bei 20 Prozent. Werte darunter werden proportional auf Fotzig, Atzig und Mausig umgelegt, sodass die sichtbaren Werte immer 100 Prozent ergeben.

## Feedback und Datenschutz

Pro Frage kann lokal markiert werden, ob das Item passend oder schwach wirkte. Diese
Rückmeldungen werden ausschließlich im `localStorage` des Browsers gespeichert und
nicht übertragen. Die App speichert keine IP-Adresse, nutzt keine Analytics und hat
keine zentrale Hall of Fame.

Ein optionales Pseudonym nach der Auswertung dient nur dazu, lokal einen teilbaren
Ergebnissatz zu erzeugen. Es wird nicht automatisch gespeichert oder veröffentlicht.

## Kodierung

Die Anwendung verwendet UTF-8. Deutsche Umlaute wie ä, ö und ü sollen direkt in UI,
Fragen und Dokumentation stehen.

## Dokumentation

- [Spezifikation](docs/specifikation.md)
- [Umsetzungsplan](docs/umsetzungsplan.md)
- [Hosting](docs/hosting.md)
- [Datenschutzhinweis](datenschutz.html)
