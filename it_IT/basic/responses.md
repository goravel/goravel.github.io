# Risposta HTTP

Puoi usare `ctx.Response()` per la risposta HTTP nel Controller.

## Stringa

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hello Goravel")
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

## Reso Personalizzato

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## File Di Risposta

```go
import "net/http"

ctx.Response().File("./public/logo.png")
```

## Scarica File

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Allega Intestazione

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Cookie

### Imposta Cookie

Usa il metodo `Cookie` sull'istanza `response` per impostare un `cookie`. Il metodo `Cookie` accetta un'istanza `http.Cookie`
che consente di impostare varie opzioni di cookie.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Name: "name",
  Value: "Goravel",
  Path: "/",
  Dominio: "goravel. ev",
  Scadenza: ora().Add(24 * ora),
  Secure: true,
  HttpOnly: true,
})
```

### Scadenza Cookie

Usa il metodo `WithoutCookie` per rimuovere un cookie.

```go
ctx.Response().WithoutCookie("name")
```

## Restituzione Riuscita

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Codice Personalizzato

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Restituisci Stream

```go
ctx.Response().Stream(http.StatusCreated, func(w http. treamWriter) error {
  data := []string{"a", "b", "c"}
  for _, item := range data {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    se err := w. lush(); err != nil {
      return err
    }

    volta.Sonno (1 * volta). secondo)
  }

  restituisce nil
})
```

## Reindirizzamento

```go
ctx.Response().Redirect(http.StatusMovedPermanently, "https://goravel.dev")
```

## Nessun Contenuto

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Ottieni Risposta

È possibile ottenere tutte le informazioni da `ctx.Response()`, che è comunemente usato in HTTP middleware:

```go
origine := ctx.Response().Origin()
```

`origin` contiene alcuni metodi come mostrato sotto：

| Metodo       | Azione                        |
| ------------ | ----------------------------- |
| Corpo        | Ottieni dati di risposta      |
| Intestazione | Ottieni intestazione risposta |
| Dimensione   | Ottieni dimensione risposta   |
| Stato        | Ottieni stato risposta        |
