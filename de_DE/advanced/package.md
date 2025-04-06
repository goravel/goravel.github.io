# Paketentwicklung

Pakete sind der primäre Weg, um Goravel Funktionalität hinzuzufügen. Diese Pakete können Routen, Controller und
Konfigurationen enthalten, die speziell darauf ausgelegt sind, eine Goravel-Anwendung zu verbessern. Diese Anleitung konzentriert sich auf die Entwicklung von
Goravel-spezifischen Paketen.

Hier ist ein Beispiel für das Erstellen eines Drittanbieter-
-Pakets: [goravel/beispiel-Paket](https://github.com/goravel/example-package)

## Ein Paket erstellen

Sie können einfach eine Paketvorlage mit dem Artisan-Befehl erstellen:

```shell
go run . handwerkliche make:package sms
```

Die erstellten Dateien werden standardmäßig im Root-Ordner `packages` gespeichert, du kannst die `--root` Option verwenden, um sie anzupassen:

```shell
go run . artisan make:package --root=pkg sms
```

## Diensteanbieter

[Diensteanbieter](../foundation/providers) fungieren als Brücke zwischen Ihrem Paket und Goravel.
Sie befinden sich typischerweise im Stammverzeichnis des Pakets als `service_provider.go`-Datei. Ihre Hauptfunktion besteht darin,
Elemente in Goravels Dienstcontainer zu binden und Goravel beim Laden von Paketressourcen zu leiten.

## Auslastung

Registriere den `ServiceProvider` im Paket zu `config/app.go::providers`, dann exportiere `facades` in die Anwendung.
Detaillierte Schritte finden Sie unter [goravel/example-package](https://github.com/goravel/example-package).

## Ressourcen

### Konfiguration

Normalerweise musst du die Konfigurationsdatei deines Paketes im `config`-Verzeichnis der Anwendung veröffentlichen. This will
allow users of your package to easily override your default configuration options. Um zu erlauben, dass deine Konfigurationsdateien
veröffentlicht werden, rufe die `Publishes` Methode von der `Boot` Methode deines Diensteanbieters auf, der erste Parameter ist der
Paketname, der zweite Parameter ist das Mapping zwischen dem aktuellen Paketdateipfad und dem Projektpfad:

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Routen

Wenn es [routes](../basic/routing) in Ihrem Paket gibt, können Sie `app.MakeRoute()` verwenden, um
`facades.Route()` zu lösen und dann die Routen dem Projekt hinzufügen:

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migrationen

Wenn es [migrations](../orm/migrations) in deinem Paket gibt, kannst du diese nach der `Veröffentlichung`-Methode veröffentlichen:

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Befehle

Du kannst `Artisan` Befehl mit der `Commands` Methode registrieren. Du kannst die Befehle
mit [Artisan CLI](../advanced/artisan) ausführen, nachdem du sie registriert hast.

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Öffentliche Vermögenswerte

Ihr Paket kann Assets wie JavaScript, CSS und Bilder enthalten. Um diese Assets im `public`
Verzeichnis der Anwendung zu veröffentlichen, verwenden Sie die Methode `Publishes` des Dienstanbieters:

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Veröffentlichen von Datei-Gruppen

Wenn Sie bestimmte Gruppen von Paketen und Ressourcen separat veröffentlichen möchten, du kannst Tags verwenden, wenn du die
`Publishes` Methode vom Diensteanbieter des Pakets aufrufst. Damit können Sie Benutzern die Möglichkeit geben, bestimmte
-Dateien, wie z.B. Konfigurationsdateien, zu veröffentlichen, ohne alle Dateien des Pakets veröffentlichen zu müssen. Zum illustrieren, du kannst zwei
Gruppen für das Paket `sms` (`sms-config` und `sms-migrations`) mit Tags in der Methode `Boot` des Dienstanbieters des
definieren.

```go
func (Empfänger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("migrations"),
  }, "sms-migrations")
}
```

## Ressourcen veröffentlichen

Im Projekt kannst du die in einem Paket registrierten Ressourcen mit dem Befehl `vendor:publish` Artisan veröffentlichen:

```shell
go run . artisan vendor:publish --package={You package name}
```

Der Befehl kann folgende Optionen verwenden:

| Optionsname | Alias | Aktion                                                                                                                                                                                                                                                                                             |
| ----------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --Paket     | -p    | Paketname kann ein entferntes Paket sein: `github.com/goravel/example-package`, und kann auch ein lokales Paket sein: `. packages/example-package`, beachten Sie, dass bei der Verwendung eines lokalen Paketnamens mit `./` begonnen werden muss. |
| --Tag       | -t    | Ressourcen-Gruppe                                                                                                                                                                                                                                                                                  |
| --erzwingen | -f    | Bestehende Dateien überschreiben                                                                                                                                                                                                                                                                   |
| --vorhanden | -e    | Nur bereits veröffentlichte Dateien veröffentlichen und überschreiben                                                                                                                                                                                                                              |
