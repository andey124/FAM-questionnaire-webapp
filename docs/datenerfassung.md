# Datenerfassung: Möglichkeiten, Rechtslage, blinde Flecken

Stand: Juli 2026. Setup: statisches Hosting (GitHub Pages), kein Backend.
Produktregel: keine Analytics, keine IP-Speicherung, keine zentrale Datensammlung.

## Was heute schon anfällt

- **GitHub Pages** verarbeitet beim Abruf zwangsläufig IP-Adressen in eigenen
  Logs. Für den Betreiber weder einsehbar noch abschaltbar; in
  `datenschutz.html` bereits erwähnt.
- **Repo-Insights → Traffic**: GitHub zeigt aggregierte Views und Unique
  Visitors der letzten 14 Tage. Das ist die einzige bereits verfügbare,
  regelkonforme „Statistik" — ohne eigenen Code, ohne Einwilligungsbedarf.
- **localStorage-Itemfeedback** (`fam-question-feedback-v1`): bleibt im
  Browser, keine Übertragung. Als für die genutzte Funktion erforderliche
  Speicherung nach § 25 Abs. 2 TDDDG ohne Einwilligung vertretbar; in
  `datenschutz.html` beschrieben.

## Technisch möglich mit aktuellem Setup

1. **Drittanbieter-Analytics per Script** (Plausible, GoatCounter, Umami
   Cloud …): eine Zeile HTML. Auch „cookielose" Anbieter verarbeiten
   IP-Adressen → personenbezogene Daten (DSGVO). Reine Aggregatzählung ohne
   Gerätezugriff ist über berechtigtes Interesse (Art. 6 Abs. 1 lit. f)
   argumentierbar; sobald etwas auf dem Gerät gespeichert/ausgelesen wird
   oder Fingerprinting stattfindet, braucht es Einwilligung (§ 25 Abs. 1
   TDDDG) und damit ein Banner. Bricht in jedem Fall Produktregel und
   `datenschutz.html`.
2. **Selbst gehostete Analytics** (z. B. Matomo): braucht einen Server —
   durch „kein Backend" ausgeschlossen.
3. **Nutzerinitiierte Kanäle**: Share-Text, Export aus `fragen-tool.html`,
   denkbar auch ein Ergebnis-Link mit kodiertem Resultat im URL-Fragment.
   Daten fließen nur durch aktive Handlung der Nutzer; rechtlich
   unkritisch, müsste bei Einführung aber in `datenschutz.html` erscheinen.
4. **Erweiterte lokale Speicherung** (z. B. Ergebnis-Historie im
   localStorage): technisch trivial, rechtlich wie das Itemfeedback, keine
   zentrale Sammlung.

## Rechtlicher Rahmen (Deutschland)

- **DSGVO**: IP-Adressen und Ergebnisprofile sind personenbezogen, sobald
  sie den Browser verlassen. Ein Persönlichkeitstest-Ergebnis zentral zu
  sammeln wäre nur mit ausdrücklicher Einwilligung sauber (Nähe zu Art. 9).
- **TDDDG § 25**: Jeder nicht unbedingt erforderliche Zugriff auf
  Endgerät-Speicher braucht Einwilligung — egal ob Cookie oder localStorage.
- **Konsequenz**: „Echte" Analytics bedeutet Datenschutzerklärung erweitern
  und je nach Verfahren ein Consent-Banner — das kollidiert mit dem
  Produktversprechen. Eine solche Entscheidung wäre eine Produktänderung,
  kein technisches Detail.

## Blinde Flecken

1. **Kein Impressum.** § 5 DDG verlangt eines für nicht rein
   persönlich-familiäre Websites; ein öffentlich gehosteter Test ist
   mindestens Grauzone. Ein Impressum zu ergänzen wäre der sichere Weg —
   größter offener Punkt.
2. **Hoster nur vage benannt.** `datenschutz.html` sollte GitHub Pages
   ausdrücklich als Hoster nennen und auf GitHubs Privacy Statement
   verweisen (US-Übermittlung; GitHub ist nach eigener Angabe
   DPF-zertifiziert).
3. **Repo-Traffic-Insights** existieren bereits als aggregierte Statistik —
   bewusst machen, dass das die einzige regelkonforme „Analytics" ist.
4. **Keine externen Ressourcen** (Fonts/CDN) eingebunden — gut so; bei
   künftigen Änderungen beibehalten, sonst entstehen neue IP-Abflüsse an
   Dritte.
