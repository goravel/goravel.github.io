# Verzeichnisstruktur

Die Standard-Dateistruktur kann Ihnen den Projektfortschritt verbessern, und Sie können auch frei neue Ordner hinzufügen, aber
ändern Sie die Standardordner nicht.

## Root-Verzeichnis

### `app` Verzeichnis

`app` enthält den Kerncode des Programms. Fast die gesamte Logik des Programms wird in diesem Ordner.

### `bootstrap` Directory

Das Verzeichnis `bootstrap` enthält die Frameworkstart-Datei `app.go`.

### `config` Verzeichnis

Das `config` Verzeichnis enthält alle Konfigurationsdateien der Anwendung. Es ist am besten, diese Dateien zu durchsuchen und
sich mit allen verfügbaren Optionen vertraut zu machen.

### `database` Verzeichnis

Das Verzeichnis `database` enthält Migrationsdateien für Datenbanken.

### `public` Verzeichnis

Das `public` Verzeichnis enthält einige statische Ressourcen wie Bilder, Zertifikate, etc.

### `resources` Verzeichnis

Das `resources` Verzeichnis enthält deine [views](../basic/views) sowie deine rohe, nicht kompilierte Assets wie
CSS oder JavaScript.

### `routes` Verzeichnis

Das Verzeichnis `routes` enthält alle Routendefinitionen der Anwendung.

### "Speicher"-Verzeichnis

Das Verzeichnis `storage` enthält das `logs` Verzeichnis und das `logs` Verzeichnis enthält die Protokolldateien der Anwendung.

### `tests` Verzeichnis

The `tests` directory contains your automated tests.

## `app` Verzeichnis

### `console` Directory

The `console` directory contains all the custom `Artisan` commands of the application, and the console boot file
`kernel.go`, which can be registered in this file [Task Scheduling](../advanced/schedule)

### `http` Directory

The `http` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Web are processed here.

### `grpc` Directory

The `grpc` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Grpc are processed here.

### `models` Directory

The `models` directory contains all data models.

### `providers` Directory

The `providers` directory contains all [Service Providers](../foundation/providers) in the
program. The service provider guides the application to respond to incoming requests by binding services, registering
for events, or performing any other tasks.
