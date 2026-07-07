# Spezifikation: Fotzig Atzig Mausig

## Produktidee

Die Anwendung ist ein kurzer, deutschsprachiger Fragebogen zur Einordnung in der
Dreiecksskala **Fotzig / Atzig / Mausig**. Der Ton ist semi-wissenschaftlich:
trocken, beobachtend und formal genug, dass die Absurdität nicht sofort als reiner
Meme-Test wirkt.

Neben den drei sichtbaren Basisdimensionen gibt es eine interne Schwellenlogik für
eine vierte Dimension. Sie wird in der Nutzeroberfläche vollständig verborgen, solange
der definierte Puffer nicht überschritten wird. Erst danach wird die Visualisierung
dreidimensional und die zusätzliche Dimension sichtbar.

## Zielgruppe und Nutzung

- Nutzer:innen beantworten 12 zufällig aus dem aktiven Fragenpool gewählte Situationen.
- Pro Situation wird genau eine Antwort gewählt.
- Nach Abschluss erscheint ein Ergebnis mit Prozentwerten, Visualisierung und einem
  Ergebnissatz.
- Es gibt vorerst keine zentrale Speicherung, kein Tracking und keine öffentliche Hall of
  Fame.
- Optionales Itemfeedback und ein optionales Pseudonym bleiben lokal im Browser.

## Dimensionen

### Fotzig

Selbstbewusst, scharf konturiert, leicht herrisch, mit klarer Wirkungskontrolle.

### Atzig

Kantig, direkt, genervt von Ineffizienz und sozialer Unklarheit.

### Mausig

Weich, sozial verbindend, vorsichtig, temperaturbewusst.

### Cringe

Interne Tiefenkomponente. Sie beschreibt performative Selbstbeobachtung,
überdeutliche Metakommunikation oder soziale Selbstinszenierung. In der sichtbaren
Anwendung darf sie erst ab Überschreiten der Schwelle genannt werden.

## Scoring

Jede Antwort trägt Punkte auf vier Dimensionen:

```js
{
  id: "stabile-antwort-id",
  text: "Antworttext",
  scores: { fotzig: 0, atzig: 0, mausig: 0, cringe: 0 }
}
```

Jede Frage hat zusätzlich eine stabile `id`. Mit `active: false` kann eine Frage im
Katalog bleiben, aber aus der zufälligen Ausspielung ausgeschlossen werden. Die App
mischt pro Durchlauf zuerst die aktiven Fragen und danach die Antworten jeder
ausgespielten Frage. Die Auswertung nutzt die stabilen Antwort-IDs, nicht die
angezeigte Position.

Unterhalb der Schwelle werden Cringe-Anteile proportional auf Fotzig, Atzig und
Mausig umgelegt. Die sichtbaren Werte bestehen dann nur aus diesen drei Dimensionen
und ergeben zusammen 100 Prozent.

Ab der Schwelle werden Fotzig, Atzig, Mausig und Cringe gemeinsam normalisiert. Die
vier sichtbaren Werte ergeben zusammen 100 Prozent.

Aktuelle Schwelle:

```txt
Cringe >= 20 Prozent
```

Unterhalb dieser Schwelle bleibt das Ergebnis im flachen 2D-Dreieck und enthält keinen
Hinweis auf Cringe, Tiefendimension, Pyramide oder Rotation. Ab der Schwelle wird die
3D-Pyramide aktiviert.

## Ergebnislogik

Das Ergebnis besteht aus:

- Titel aus stärkster und zweitstärkster Basisdimension
- Prozentwerte für drei oder vier Dimensionen, abhängig von der Schwelle
- Visualisierung
- einem Ergebnissatz
- einem optionalen lokal erzeugten Share-Text mit Pseudonym

Beispiele:

```txt
Fotzig-Mausig im flachen Modell
```

```txt
Atzig-Fotzig mit latenter Cringe-Aktivierung
```

## Fragenfeedback

Pro Frage kann optional markiert werden, ob das Item passend oder schwach wirkte. Diese
Rückmeldung wird nur lokal im Browser gespeichert:

```js
{
  shown: 0,
  positive: 0,
  negative: 0,
  lastRating: "positive",
  lastRatedAt: "ISO-Zeitpunkt"
}
```

Eine Frage gilt lokal als Prüfkandidat, wenn mindestens 10 Rückmeldungen vorliegen und
die negative Quote mindestens 40 Prozent beträgt. Diese Metrik ist keine automatische
Löschung, sondern ein Hinweis für die spätere redaktionelle Prüfung des Fragenpools.

## Visualisierung

### 2D

Ein SVG-Dreieck mit den Eckpunkten:

- Fotzig oben
- Atzig unten links
- Mausig unten rechts

Der Ergebnispunkt wird aus baryzentrischen Anteilen berechnet.

### 3D

Bei modellrelevantem Cringe wird eine Pyramide gezeigt:

- Grundfläche: Fotzig / Atzig / Mausig
- Spitze: Cringe
- Ergebnis: Punkt im Volumen

Die Pyramide rotiert automatisch und ist per Maus oder Touch rotierbar. Technisch wird
sie aktuell ohne externe 3D-Bibliothek über eine kleine JavaScript-Projektion in SVG
gezeichnet.

## Bewusste Entscheidungen für Version 1

- Komplett deutsch.
- Eine Antwort pro Frage.
- Eine Frage pro Screen.
- Kein Backend.
- Kein Build-Schritt.
- Kein zentrales Teilen/Speichern.
- Kein IP-Tracking und keine zentrale Nutzerstatistik.
- Lokales Itemfeedback über `localStorage` zur späteren Fragenprüfung.
- Share-Text nur lokal generieren, nicht automatisch veröffentlichen.
- Fragenkatalog direkt im Code editierbar.
