# Konfiguration

Alle Konfigurationsdateien des Goravel Frameworks werden im `config` Verzeichnis gespeichert. Sie können spezifische
-Anweisungen anzeigen und flexibel nach Projektanforderungen konfigurieren.

## Umgebungskonfiguration

Um Anwendungen in verschiedenen Umgebungen ausführen zu können, sind in der Regel unterschiedliche Konfigurationen erforderlich. Zum Beispiel möchtest du den Debug-Modus
lokal aktivieren, aber benötigst ihn nicht in der Produktionsumgebung.

Daher stellt das Framework die `.env.example` Datei im Root-Verzeichnis zur Verfügung. Du musst diese Datei kopieren, sie muss
in `.env` umbenennen, bevor du die Entwicklung startest und die Konfigurationselemente im `. nv` Datei entsprechend Ihrem Projekt
benötigt.

Beachten Sie, dass die `. nv` Datei sollte nicht zur Versionsverwaltung hinzugefügt werden, denn wenn mehrere Personen zusammenarbeiten, verschiedene
Entwickler können unterschiedliche Konfigurationen verwenden und unterschiedliche Umgebungskonfigurationen sind unterschiedlich.

Wenn ein Eindringling Zugriff auf Ihr Code-Repository erhält, besteht außerdem die Gefahr, dass die empfindliche
-Konfiguration aufgedeckt wird. Wenn du ein neues Konfigurationselement hinzufügen möchtest, kannst du es zur `.env.example` Datei hinzufügen, um die
Konfiguration aller Entwickler zu synchronisieren.

## Umgebungskonfiguration abrufen

Benutze die folgende Methode, um die Konfigurationselemente in der `.env`-Datei zu erhalten:

```go
// Der erste Parameter ist der Konfigurationsschlüssel, der zweite Parameter ist der Standardwert
facades.Config().Env("APP_NAME", "goravel")
```

## Zugriffskonfigurationswerte

Du kannst die globale Funktion `facades.Config()` überall in der Anwendung verwenden, um auf die Konfigurationswerte
im `config` Verzeichnis zuzugreifen. Der Zugriff auf den Konfigurationswert kann die "." Syntax verwenden. Sie können auch einen Standardwert
angeben, falls die Konfigurationsoption nicht existiert, wird der Standardwert zurückgegeben:

```go
// Erhalten Sie die Konfiguration durch die Zuweisung
facades.Config().Get("app.name", "goravel")

// Die Konfiguration des Strings Typ
facades.Config().GetString("app. ame", "goravel")

// Die Konfiguration des Ints Typ
facades.Config().GetInt("app. nt", 1)

// Holen Sie die Konfiguration des Bool-Typs
facades.Config().GetBool("app.debug", true)
```

## Set-Konfiguration

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Projektinformationen abrufen

Du kannst den `handwerklichen About`-Befehl verwenden, um die Framework-Version, Konfiguration, etc. anzusehen.

```bash
go run . handwerklich über
```
