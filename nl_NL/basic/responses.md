# HTTP Antwoord

U kunt `ctx.Response()` gebruiken voor het HTTP antwoord in de Controller.

## Tekenreeks

```go
importeer "github.com/goravel/framework/contracts/http"

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

ctx. esponse().Json(http. tatusOK, Maak {
  ID uint `json:"id"`
  Name string `json:"name"`
}{
  Id: 1,
  Front: "Goravel",
})
```

## Aangepaste retour

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Antwoord bestand

```go
importeer "net/http"

ctx.Response().File("./public/logo.png")
```

## Download bestand

```go
importeer "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Koptekst bijvoegen

```go
importeer "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Koekje

### Cookie instellen

Gebruik de 'Cookie' methode op de 'response' instantie om een 'cookie' in te stellen. De `Cookie` methode accepteert een `http.Cookie`
bijvoorbeeld, waarmee je verschillende cookie opties kunt instellen.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Naam: "naam",
  Waarde: "Goravel",
  Pad: "/",
  Domain: "goravel. ev",
  Vervalt: time.Now().Add(24 * tijd.ur),
  Secure: waar,
  HttpOnly: waar,
})
```

### Cookie verlopen

Gebruik de `WithoutCookie` methode om een cookie te verwijderen.

```go
ctx.Response().WithoutCookie("naam")
```

## Retourzending geslaagd

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Aangepaste code

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hallo": "Goravel",
})
```

## Retour stream

```go
ctx.Response().Stream(http.StatusCreated, func(w http. treamWriter) fout {
  data := []string{"a", "b", "c"}
  voor _, item := range data {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    time.Sleep(1 * tijd. econd)
  }

  retourneert nil
})
```

## Doorverwijzen

```go
ctx.Response().Redirect(http.StatusMovedPermanent "https://goravel.dev")
```

## Geen inhoud

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Antwoord krijgen

U kunt alle informatie verkrijgen van `ctx.Response()`, die vaak gebruikt wordt in HTTP middleware:

```go
oorsprong := ctx.Response().Origin()
```

`origin` bevat sommige methoden zoals hieronder weergegeven：

| Methode  | actie                    |
| -------- | ------------------------ |
| Lichaam  | Antwoordgegevens ophalen |
| Koptekst | Krijg antwoordkop        |
| Grootte  | Krijg antwoord grootte   |
| status   | Krijg antwoord status    |
