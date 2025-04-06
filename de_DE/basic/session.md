# Sitzung

Session ermöglicht es Ihnen, Benutzerinformationen über mehrere Anfragen zu speichern, was ein zustandsloses Erlebnis innerhalb des von
per se zustandslosen HTTP-Protokolls ermöglicht. Diese Benutzerinformationen werden dauerhaft auf der Serverseite gespeichert. Goravel bietet eine
einheitliche Schnittstelle für die Interaktion mit verschiedenen persistenten Speichertreibern.

## Konfiguration

Die Konfigurationsdatei `session` befindet sich unter `config/session.go`. Der Standardtreiber ist `file`, der Sessions
im `storage/framework/sessions` Verzeichnis speichert. Goravel erlaubt es dir, einen benutzerdefinierten `session` Treiber zu erstellen, indem du
die `contracts/session/driver` Schnittstelle implementierst.

### Middleware registrieren

Standardmäßig startet Goravel keine Sitzung automatisch. Es bietet jedoch Middleware zum Starten einer Sitzung. Sie können
die Session Middleware im `app/http/kernel registrieren. o` Datei um es auf alle Routen anzuwenden, oder du kannst es zu
spezifischen Routen hinzufügen:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
 } 
 }
```

## Interagieren mit der Sitzung

### Daten abrufen

Du kannst die `Get`-Methode verwenden, um Daten aus der Sitzung abzurufen. Wenn der Wert nicht existiert, wird `nil` zurückgegeben.

```go
value := ctx.Request().Session().Get("key")
```

Du kannst auch einen Standardwert als zweites Argument an die `Get`-Methode übergeben. Dieser Wert wird zurückgegeben, wenn der
angegebene Schlüssel in der Sitzung nicht existiert:

```go
value := ctx.Request().Session().Get("key", "default")
```

### Alle Daten werden abgerufen

Wenn du alle Daten der Sitzung abrufen möchtest, kannst du die `All` Methode verwenden:

```go
Daten := ctx.Request().Session().All()
```

### Datenunterlage abrufen

Wenn du eine Teilmenge der Sitzungsdaten abrufen möchtest, kannst du die 'Only'-Methode verwenden:

```go
Daten := ctx.Request().Session().Nur ([]string{"username", "email"})
```

### Bestimme ob ein Element in der Sitzung vorhanden ist

Um festzustellen, ob ein Element in der Sitzung vorhanden ist, kannst du die `Has` Methode verwenden. Die `Has` Methode gibt `true` zurück, wenn das
Element vorhanden ist und nicht `nil` ist:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Um festzustellen, ob ein Element vorhanden ist und selbst wenn es `nil` ist, kannst du die `Exists` Methode verwenden:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Um festzustellen, ob ein Element in der Sitzung nicht vorhanden ist, kannst du die `Missing`-Methode verwenden:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Daten speichern

Du kannst die `Put` Methode verwenden, um Daten in der Sitzung zu speichern:

```go
ctx.Request().Session().Put("key", "value")
```

### Abrufen und Löschen von Daten

Wenn du ein Element aus der Sitzung abrufen und löschen möchtest, kannst du die `Pull` Methode verwenden:

```go
value := ctx.Request().Session().Pull("key")
```

### Lösche Daten

Die `Forget` Methode kann verwendet werden, um ein Stück Daten aus der Sitzung zu entfernen. Wenn du alle Daten von der
Sitzung entfernen möchtest, kannst du die `Flush` Methode verwenden:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### Die Session-ID wird neu erzeugt

Das Regenerieren der Session-ID wird oft durchgeführt, um böswillige Benutzer daran zu hindern, einen Session-Fixierungsangriff
auf Ihre Anwendung auszunutzen. Du kannst die Session-ID mit der `Regenerate` Methode neu generieren:

```go
ctx.Request().Session().Regenerate()
```

Wenn du die Session-ID regenerieren möchtest und alle Daten in der Sitzung vergessen möchtest, kannst du die `Invalidate`
Methode verwenden:

```go
ctx.Request().Session().Invalidate()
```

Dann müssen Sie die neue Sitzung im Cookie speichern:

```go
ctx.Response().Cookie(http.Cookie{
  Name: ctx.Request().Session().GetName(),
  Wert: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Pfad: facades.Config().GetString("session. ath"),
  Domain: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Flash-Daten

Flash-Daten sind Sitzungsdaten, die nur während der nachfolgenden HTTP-Anfrage zur Verfügung stehen und dann gelöscht werden.
Flash-Daten sind nützlich, um temporäre Nachrichten wie Statusmeldungen zu speichern. Du kannst die `Flash`-Methode verwenden, um
Flash-Daten in der Sitzung zu speichern:

```go
ctx.Request().Session().Flash("status", "Aufgabe war erfolgreich!")
```

Wenn du deine Flash-Daten für eine zusätzliche Anfrage behalten möchtest, kannst du die `Reflash` Methode verwenden:

```go
ctx.Request().Session().Reflash()
```

Wenn du bestimmte Flash-Daten für eine zusätzliche Anfrage behalten möchtest, kannst du die `Keep` Methode verwenden:

```go
ctx.Request().Session().Keep("status", "Benutzername")
```

Wenn du bestimmte Daten für den sofortigen Gebrauch behalten möchtest, kannst du die `Now` Methode verwenden:

```go
ctx.Request().Session().Jetzt ("status", "Aufgabe war erfolgreich!")
```

## Interagieren mit Session Manager

### Eine benutzerdefinierte Sitzung erstellen

Benutze die "Session"-Fassade um eine benutzerdefinierte Sitzung zu erstellen. Die `Session` Fassade liefert die `BuildSession` Methode, die
eine Treiber-Instanz und eine optionale Sitzungs-ID benötigt, wenn Sie eine benutzerdefinierte Sitzungs-ID angeben möchten:

```go
importieren "github.com/goravel/framework/facades"

Session := facades.Session().BuildSession(Treiber, "sessionID")
```

### Eigene Session-Treiber hinzufügen

#### Implementierung des Treibers

Um einen benutzerdefinierten Session-Treiber zu implementieren, muss der Treiber die Schnittstelle `contracts/session/driver` implementieren.

```go
// Treiber ist die Schnittstelle für Session-Handler.
Typ Treiberschnittstelle {
  // Schließen schließt den Session-Handler.
  Close() Fehler
  // Destroy zerstört die Session mit der angegebenen ID.
  Destroy(id string) Fehler
  // Gc führt Garbage Collection auf dem Session-Handler mit der angegebenen maximalen Lebensdauer durch.
  Gc(maxLifetime int) Fehler
  // Öffnet eine Sitzung mit dem angegebenen Pfad und Namen.
  Open(path string, name string) error
  // Liest die Session-Daten der angegebenen ID vor.
  Read(id string) (String, error)
  // Schreiben schreibt die Session-Daten der angegebenen ID.
  Schreibfehler (id string, data string)
}
```

#### Registrierung des Fahrers

Nach der Implementierung des Treibers müssen Sie ihn in Goravel registrieren. Du kannst dies mit der `Extend` Methode der
`facades.Session` tun. Du solltest die `Extend` Methode in der `boot` Methode von `app/providers/app_service_provider.go` aufrufen:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Sobald der Fahrer registriert ist, du kannst es verwenden, indem du die `driver` Option in der Session-Konfigurationsdatei auf
`redis` setzst oder indem du die `SESSION_DRIVER` Umgebungsvariable auf `redis` setzst.

### Treiber-Instanz abrufen

Benutze die `Driver` Methode, um die Treiberinstanz vom Session-Manager abzurufen. Es akzeptiert einen optionalen Treibernamen, falls
nicht angegeben wird, gibt er die Standard-Treiberinstanz zurück:

```go
treiber, err := facades.Session().Driver("file")
```

### Starte eine neue Sitzung

```go
session := facades.Session().BuildSession(driver)
session.Start()
```

### Speicherung der Sitzungsdaten

```go
session := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Sitzung an die Anfrage anhängen

```go
session := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Überprüft, ob die Anfrage eine Sitzung hat

```go
if ctx.Request().HasSession() {
    //
}
```
