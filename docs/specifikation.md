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

- Nutzer:innen beantworten 12 Situationen.
- Pro Situation wird genau eine Antwort gewählt.
- Nach Abschluss erscheint ein Ergebnis mit Prozentwerten, Visualisierung und einem
  Ergebnissatz.
- Es gibt vorerst keine Speicherung, kein Teilen und kein Tracking.

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
{ fotzig: 0, atzig: 0, mausig: 0, cringe: 0 }
```

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

Beispiele:

```txt
Fotzig-Mausig im flachen Modell
```

```txt
Atzig-Fotzig mit latenter Cringe-Aktivierung
```

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
- Kein Teilen/Speichern.
- Fragenkatalog direkt im Code editierbar.
