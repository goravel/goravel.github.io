# Protokollierung

In order to understand the running status of the application, Goravel provides a powerful log service that can record
log messages and system errors to a file or other channels through `facades.Log()`.

## Konfiguration

Um verschiedene Log-Kanäle zu konfigurieren, können benutzerdefinierte Konfigurationen in `config/logging.go` vorgenommen werden.

`Goravel` benutzt den `stack` Kanal, um Logs standardmäßig aufzuzeichnen, `stack` erlaubt es, Logs in mehrere Kanäle weiterzuleiten.

Die `print` Konfiguration in `single` und `daily` Treiber können die Logausgabe an die Konsole steuern.

## Verfügbare Channeltreiber

| Name     | Beschreibung                 |
| -------- | ---------------------------- |
| 'stack'  | Mehrere Kanäle erlauben      |
| "Single" | Einzelne Protokolldatei      |
| "daily"  | Eine Protokolldatei pro Tag  |
| `custom` | Benutzerdefiniertes Laufwerk |

### Kontext einfügen

```go
facades.Log().WithContext(ctx)
```

## Logmeldungen schreiben

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
facades. og().Error(message)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### In einen bestimmten Kanal schreiben

Manchmal möchten Sie Nachrichten in einem anderen Kanal als dem Standardkanal der Anwendung aufzeichnen:

```go
facades.Log().Channel("single").Info(message)
```

Wenn du gleichzeitig in mehrere Kanäle schreiben möchtest, kannst du die `Stack` Methode verwenden:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Kettenmethoden

Goravel bietet bequeme Kettenmethoden, die das Einfügen nützlicherer Informationen in das Protokoll erleichtern:

```go
facades.Log().User("John").Debug(Nachricht)
```

| Methode  | Aktion                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| Code     | Legen Sie einen Code oder einen Slug fest, der das Log beschreibt.                         |
| Hinweis  | Setze einen Hinweis für schnelleres Debuggen.                                              |
| In       | Legen Sie die Objektkategorie oder die Domäne fest, in der der Logeintrag relevant ist.    |
| Besitzer | Nützlich für Warnungszwecke.                                                               |
| Anfrage  | Liefert eine http.Request.                                                 |
| Antwort  | Liefert eine http.Response.                                                |
| Tags     | Fügen Sie mehrere Tags hinzu, um die Funktion zu beschreiben, die einen Fehler zurückgibt. |
| Benutzer | Legen Sie den Benutzer fest, der dem Logeintrag zugeordnet ist.                            |
| Mit      | Fügen Sie Schlüsselpaare zum Kontext des Log-Eintrags hinzu.                               |
| Trace    | Fügen Sie dem Logeintrag Stapelinformationen hinzu.                                        |

## Neuen Kanal erstellen

Wenn du einen komplett benutzerdefinierten Kanal definieren möchtest, kannst du den `custom` Treiber in der Konfigurationsdatei `config/logging.go`
angeben.
Füge dann eine `via` Option hinzu, um eine `Framework\contracts\log\Logger` Struktur zu implementieren:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Implementierungstreiber

Implementierung `Framework\contracts\log\Logger` Schnittstelle.

```go
// Framework/contracts/log/Logger
package log

type Logger interface {
  // Pfad der Channelkonfiguration hier behandeln
  Handle(channel string) (Hook, error)
}
```

können im Ordner `app/extensions` gespeichert werden (veränderbar). Beispiel:

```go
-Paketerweiterungen

Import (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

Typ Logger struct {
}

// Pfad der Kanalkonfiguration hier behandeln
func (logger *Logger) Handle(channel string) (log. ook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Level Monitoring Level
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    Log. anicLevel,
  }
}

// Logik ausführen, wenn
func (h *Hook) Fire(Eintragsprotokoll) ausgelöst wird. ntry) Fehler {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry. ontext(), entry.Level(), entry.Time(), entry.Message())

  zurück Nil
}
```
