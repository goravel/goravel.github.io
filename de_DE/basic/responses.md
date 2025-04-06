# HTTP-Antwort

Du kannst `ctx.Response()` für HTTP-Antwort im Controller verwenden.

## String

```go
importieren "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hallo Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx. esponse().Json(http. tatusOK, struct {
  ID uint `json:"id"`
  Name string `json:"name"`
}{
  Id: 1,
  Front: "Goravel",
})
```

## Eigene Retouren

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Antwortdatei

```go
import "net/http"

ctx.Response().File("./public/logo.png")
```

## Datei herunterladen

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Kopfzeile anhängen

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hallo Goravel")
```

## Cookie

### Cookie setzen

Benutze die `Cookie` Methode in der `response` Instanz um einen `Cookie` zu setzen. Die `Cookie` Methode akzeptiert eine `http.Cookie`
Instanz und erlaubt es dir, verschiedene Cookie-Optionen zu setzen.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Name: "name",
  Wert: "Goravel",
  Pfad: "/",
  Domain: "goravel. ev",
  Läuft ab: time.Now().Add(24 * time.Hour),
  Sicher: true
  HttpOnly: true
})
```

### Ablauf-Cookie

Benutze die `WithoutCookie` Methode, um ein Cookie zu entfernen.

```go
ctx.Response().WithoutCookie("name")
```

## Rücksendung erfolgreich

```go
ctx.Response().Success().String("Hallo Goravel")
ctx.Response().Success().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Eigener Code

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Return Stream

```go
ctx.Response().Stream(http.StatusCreated, func(w http. treamWriter) Fehler {
  Daten := []string{"a", "b", "c"}
  für _, item := range data {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    mal.Sleep(1 * Mal. econd)
  }

  zurück Nil
})
```

## Umleitung

```go
ctx.Response().Redirect(http.StatusMovedPermanently "https://goravel.dev")
```

## Kein Inhalt

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Antwort erhalten

Sie können alle Informationen von `ctx.Response()` erhalten, was häufig in HTTP-Middleware verwendet wird:

```go
origin := ctx.Response().Origin()
```

`origin` enthält einige Methoden wie unten gezeigt：

| Methode   | Aktion                  |
| --------- | ----------------------- |
| Körper    | Antwortdaten abrufen    |
| Kopfzeile | Antwort-Header erhalten |
| Größe     | Antwortgröße erhalten   |
| Status    | Antwortstatus erhalten  |
