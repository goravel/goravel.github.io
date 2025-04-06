# Lebenszyklus anfordern

Die Datei `main.go` dient als Einstiegspunkt für alle Anfragen in der Goravel-Anwendung. Es verwendet die
`bootstrap.Boot()` Funktion, um das Framework zu initialisieren.

Dann wird eine Goravel-Instanz von `app := foundation.NewApplication()` in `bootstrap/app.go` erstellt.

Danach benutze `app.Boot()` um den [Service Provider](providers) registrierten und `config.Boot()` um
die Konfigurationsdateien unter das Config Verzeichnis zu laden.

Starten Sie schließlich den HTTP-Server mit `facades.Route().Run(facades.Config().GetString("app.host"))` in `main.go`.
