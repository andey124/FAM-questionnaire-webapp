# Hosting

## Empfehlung: GitHub Pages

GitHub Pages ist fuer diese App die einfachste kostenlose Loesung. Die App ist statisch
und braucht im Betrieb nur HTML, CSS und JavaScript.

Vorgehen:

1. Repository zu GitHub pushen.
2. In GitHub: `Settings` -> `Pages`.
3. Als Quelle den Branch auswaehlen, z. B. `main`.
4. Als Ordner `/root` verwenden.
5. Speichern.

Danach ist die App typischerweise unter dieser Form erreichbar:

```txt
https://BENUTZERNAME.github.io/REPOSITORY/
```

Wenn spaeter eine eigene Domain genutzt werden soll, kann GitHub Pages ebenfalls eine
Custom Domain verwenden.

## Alternative: Netcup Webhosting

Die App kann auch auf klassischem Webspace liegen, weil kein Node.js, Python oder Backend
notwendig ist.

Vorgehen:

1. Per FTP/SFTP mit dem Webspace verbinden.
2. Diese Dateien und Ordner hochladen:

```txt
index.html
src/
docs/ optional
README.md optional
```

3. Zielordner ist je nach Domain/Subdomain der oeffentliche Webordner im Netcup Hosting.

Wichtig: Auf dem Server muss nichts installiert werden. Der Browser der Besucher:innen
fuehrt das JavaScript aus.

## Warum kein React/Vite in Version 1?

React/Vite waere technisch gut moeglich, braucht aber lokal oder in GitHub Actions einen
Build-Schritt. Fuer den ersten Prototypen ist eine statische App ohne Build-Schritt
praktischer:

- direkt testbar
- weniger Einrichtung
- kompatibel mit GitHub Pages und Netcup
- keine Abhaengigkeiten
- keine Node-Laufzeit im Hosting

Falls die App groesser wird, kann sie spaeter immer noch auf Vite/React migriert werden.

