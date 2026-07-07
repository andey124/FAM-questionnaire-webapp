export const questions = [
  {
    id: "raum-unerwartet",
    active: true,
    text: "Sie betreten einen Raum, in dem Sie niemand erwartet.",
    answers: [
      {
        id: "raum-plan",
        text: "Ich wirke so, als sei meine Anwesenheit Teil eines größeren Plans.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 1 },
      },
      {
        id: "raum-randplatz",
        text: "Ich nicke kurz, scanne die Lage und besetze den besten Randplatz.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "raum-richtig",
        text: "Ich frage leise, ob ich hier richtig bin, obwohl ich es weiß.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "raum-variable",
        text: "Ich sage: 'Keine Sorge, ich bin nur eine soziale Variable.'",
        scores: { fotzig: 0, atzig: 1, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "halbgares-kompliment",
    active: true,
    text: "Jemand macht Ihnen ein halbgares Kompliment.",
    answers: [
      {
        id: "kompliment-preis",
        text: "Ich bedanke mich, als hätte ich gerade einen Preis entgegengenommen.",
        scores: { fotzig: 2, atzig: 0, mausig: 1, cringe: 0 },
      },
      {
        id: "kompliment-knapp",
        text: "Ich sage trocken: 'Das war knapp unter akzeptabel formuliert.'",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "kompliment-speichern",
        text: "Ich nehme es wohlwollend an und speichere es für später.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "kompliment-unsicherheit",
        text: "Ich analysiere laut, welche Unsicherheit hinter dem Kompliment stand.",
        scores: { fotzig: 1, atzig: 0, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "gruppenessen-entscheidung",
    active: true,
    text: "In der Gruppe muss entschieden werden, wo gegessen wird.",
    answers: [
      {
        id: "essen-demokratisch",
        text: "Ich entscheide, aber verpacke es als demokratischen Impuls.",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "essen-nicht-will",
        text: "Ich sage, was ich nicht will, und lasse den Rest eskalieren.",
        scores: { fotzig: 1, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "essen-alle-finden",
        text: "Ich wähle den Ort, bei dem alle etwas finden.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "essen-matrix",
        text: "Ich erstelle spontan eine Bewertungsmatrix mit Bauchgefühl-Korrektur.",
        scores: { fotzig: 0, atzig: 1, mausig: 1, cringe: 3 },
      },
    ],
  },
  {
    id: "overdressed",
    active: true,
    text: "Sie merken, dass Sie overdressed sind.",
    answers: [
      {
        id: "overdressed-under",
        text: "Ich behaupte innerlich, die anderen seien underdressed.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 0 },
      },
      {
        id: "overdressed-durchziehen",
        text: "Ich ziehe es durch und bewege mich weniger, aber bestimmter.",
        scores: { fotzig: 1, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "overdressed-witz",
        text: "Ich mache einen kleinen Witz auf eigene Kosten.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "overdressed-dialogisch",
        text: "Ich erkläre, dass Kleidung ein dialogisches Missverständnis ist.",
        scores: { fotzig: 0, atzig: 0, mausig: 1, cringe: 3 },
      },
    ],
  },
  {
    id: "lange-geschichte",
    active: true,
    text: "Eine Person erzählt eine sehr lange Geschichte ohne erkennbaren Punkt.",
    answers: [
      {
        id: "geschichte-relevant",
        text: "Ich frage: 'Und an welcher Stelle wird das für uns relevant?'",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "geschichte-konsequenzen",
        text: "Ich halte Blickkontakt, aber mein Gesicht kündigt Konsequenzen an.",
        scores: { fotzig: 1, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "geschichte-landen",
        text: "Ich gebe kleine Signale, damit die Person sicher landen kann.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "geschichte-dramaturgisch",
        text: "Ich sage: 'Narrativ interessant, dramaturgisch offen.'",
        scores: { fotzig: 1, atzig: 0, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "sprachnachricht",
    active: true,
    text: "Sie bekommen eine Sprachnachricht von 4:37 Minuten.",
    answers: [
      {
        id: "sprachnachricht-krass",
        text: "Ich antworte nach acht Sekunden mit 'Krass'.",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "sprachnachricht-stichpunkte",
        text: "Ich höre sie auf 1,8-facher Geschwindigkeit und mache Stichpunkte.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 1 },
      },
      {
        id: "sprachnachricht-komplett",
        text: "Ich höre sie komplett und antworte verhältnismäßig.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "sprachnachricht-protokoll",
        text: "Ich transkribiere sie gedanklich als Beziehungsprotokoll.",
        scores: { fotzig: 0, atzig: 0, mausig: 1, cringe: 3 },
      },
    ],
  },
  {
    id: "outfit-kommentar",
    active: true,
    text: "Ihr Outfit wird kommentiert.",
    answers: [
      {
        id: "outfit-befund",
        text: "Ich nehme es als bestätigten Befund meiner Wirkung.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 0 },
      },
      {
        id: "outfit-beobachtung",
        text: "Ich frage zurück, ob das eine Beobachtung oder eine Bitte war.",
        scores: { fotzig: 2, atzig: 2, mausig: 0, cringe: 0 },
      },
      {
        id: "outfit-freuen",
        text: "Ich freue mich sichtbar, aber kontrolliert.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "outfit-farbtemperatur",
        text: "Ich erkläre die emotionale Farbtemperatur meiner Entscheidung.",
        scores: { fotzig: 0, atzig: 0, mausig: 1, cringe: 3 },
      },
    ],
  },
  {
    id: "spielabend-regeln",
    active: true,
    text: "Bei einem Spielabend sind die Regeln unklar.",
    answers: [
      {
        id: "regeln-vorbehalt",
        text: "Ich lege eine Auslegung fest und gewinne unter Vorbehalt.",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "regeln-klarheit",
        text: "Ich bestehe auf Regelklarheit, bevor irgendwer Stimmung hat.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "regeln-niemand-frustriert",
        text: "Ich suche die Version, bei der niemand frustriert aussteigt.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "regeln-experiment",
        text: "Ich führe Hausregeln als soziales Experiment ein.",
        scores: { fotzig: 1, atzig: 0, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "spontan-sein",
    active: true,
    text: "Jemand sagt: 'Lass mal spontan sein.'",
    answers: [
      {
        id: "spontan-meine-idee",
        text: "Ich sage ja, aber nur wenn es am Ende wie meine Idee wirkt.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 0 },
      },
      {
        id: "spontan-zeitfenster",
        text: "Ich frage nach einem Zeitfenster für die Spontaneität.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 1 },
      },
      {
        id: "spontan-ueberfordert",
        text: "Ich bin dabei, solange niemand überfordert wird.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "spontan-chaos",
        text: "Ich nenne es 'kuratiertes Chaos' und fühle mich vorbereitet.",
        scores: { fotzig: 0, atzig: 1, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "fensterspiegelung",
    active: true,
    text: "Sie sehen sich zufällig in einer Fensterspiegelung.",
    answers: [
      {
        id: "spiegelung-realitaet",
        text: "Ich prüfe kurz, ob die Realität mithalten kann.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 0 },
      },
      {
        id: "spiegelung-haltung",
        text: "Ich korrigiere minimal meine Haltung und gehe weiter.",
        scores: { fotzig: 1, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "spiegelung-peinlich",
        text: "Ich lächle peinlich berührt und tue so, als wäre nichts.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "spiegelung-aussenwahrnehmung",
        text: "Ich denke: 'Interessante Außenwahrnehmung des Selbst.'",
        scores: { fotzig: 0, atzig: 0, mausig: 1, cringe: 3 },
      },
    ],
  },
  {
    id: "chat-ok",
    active: true,
    text: "Im Chat schreibt jemand nur 'ok'.",
    answers: [
      {
        id: "ok-allein",
        text: "Ich lasse die Person mit ihrer Entscheidung allein.",
        scores: { fotzig: 3, atzig: 1, mausig: 0, cringe: 0 },
      },
      {
        id: "ok-interpunktion",
        text: "Ich analysiere die Interpunktion, aber reagiere nicht.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 1 },
      },
      {
        id: "ok-nachfragen",
        text: "Ich frage nach, ob alles gut ist.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "ok-zustand",
        text: "Ich schreibe: 'Ok als Zustand oder als Urteil?'",
        scores: { fotzig: 1, atzig: 0, mausig: 0, cringe: 3 },
      },
    ],
  },
  {
    id: "kurz-vorstellen",
    active: true,
    text: "Sie werden gebeten, sich kurz vorzustellen.",
    answers: [
      {
        id: "vorstellen-marke",
        text: "Ich liefere eine knappe Version mit spürbarer Markenführung.",
        scores: { fotzig: 3, atzig: 0, mausig: 0, cringe: 0 },
      },
      {
        id: "vorstellen-effizient",
        text: "Ich sage die relevanten Fakten und beende den Vorgang effizient.",
        scores: { fotzig: 0, atzig: 3, mausig: 0, cringe: 0 },
      },
      {
        id: "vorstellen-harmlos",
        text: "Ich erwähne etwas Harmloses, damit alle gut andocken können.",
        scores: { fotzig: 0, atzig: 0, mausig: 3, cringe: 0 },
      },
      {
        id: "vorstellen-prozess",
        text: "Ich beginne mit: 'Ich würde mich als Prozess beschreiben.'",
        scores: { fotzig: 0, atzig: 0, mausig: 0, cringe: 3 },
      },
    ],
  },
];
