# Hosting

## Empfehlung: GitHub Pages

GitHub Pages ist für diese App die einfachste kostenlose Lösung. Die App ist statisch
und braucht im Betrieb nur HTML, CSS und JavaScript.

Vorgehen:

1. Repository zu GitHub pushen.
2. In GitHub: `Settings` -> `Pages`.
3. Als Quelle den Branch auswählen, z. B. `main`.
4. Als Ordner `/root` verwenden.
5. Speichern.

Danach ist die App typischerweise unter dieser Form erreichbar:

```txt
https://BENUTZERNAME.github.io/REPOSITORY/
```

Wenn später eine eigene Domain genutzt werden soll, kann GitHub Pages ebenfalls eine
Custom Domain verwenden.

## Alternative: Netcup Webhosting

Die App kann auch auf klassischem Webspace liegen, weil kein Node.js, Python oder Backend
notwendig ist.

Vorgehen:

1. Per FTP/SFTP mit dem Webspace verbinden.
2. Diese Dateien und Ordner hochladen:

```txt
index.html
datenschutz.html
src/
docs/ optional
README.md optional
```

3. Zielordner ist je nach Domain/Subdomain der öffentliche Webordner im Netcup Hosting.

Wichtig: Auf dem Server muss nichts installiert werden. Der Browser der Besucher:innen
führt das JavaScript aus.

## Datenschutz beim statischen Hosting

Die App selbst sendet kein Feedback, keine Namen und keine Ergebnisse an einen Server.
Optionales Itemfeedback wird nur im lokalen Speicher des Browsers abgelegt.

Der jeweilige Hosting-Anbieter kann trotzdem technische Zugriffsdaten verarbeiten,
zum Beispiel IP-Adresse und Abrufzeitpunkt zur Auslieferung und Absicherung der
Website. Bei GitHub Pages sollte darauf im verlinkten `datenschutz.html` hingewiesen
werden.

## Warum kein React/Vite in Version 1?

React/Vite wäre technisch gut möglich, braucht aber lokal oder in GitHub Actions einen
Build-Schritt. Für den ersten Prototypen ist eine statische App ohne Build-Schritt
praktischer:

- direkt testbar
- weniger Einrichtung
- kompatibel mit GitHub Pages und Netcup
- keine Abhängigkeiten
- keine Node-Laufzeit im Hosting

Falls die App größer wird, kann sie später immer noch auf Vite/React migriert werden.
