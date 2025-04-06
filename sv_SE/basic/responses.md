# HTTP svar

Du kan använda `ctx.Response()` för HTTP-svar i Controller.

## Sträng

```go
importera "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hej Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hej": "Goravel",
})

ctx. esponse().Json(http. tatusOK, struct {
  ID uint `json:"id"`
  Name string `json:"name"`
}{
  Id: 1,
  Framsida: "Goravel",
})
```

## Anpassad retur

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Svarsfil

```go
importera "net/http"

ctx.Response().File("./public/logo.png")
```

## Ladda ner fil

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Bifoga sidhuvud

```go
importera "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Kaka

### Ställ in kaka

Använd `Cookie`-metoden på `response`-instansen för att sätta en `cookie`. `Cookie`-metoden accepterar en `http.Cookie`
-instans, som låter dig ställa in olika cookie-alternativ.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Namn: "namn",
  värde: "Goravel",
  Sökväg: "/",
  Domän: "goravel. ev",
  Utgång: time.Now().Add(24 * time.Time),
  Säkert: sant,
  HttpOnly: sant,
})
```

### Upphör med kakan

Använd metoden `WithoutCookie` för att ta bort en cookie.

```go
ctx.Response().UtanförCookie("namn")
```

## Retur lyckades

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Anpassad kod

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Retur flöde

```go
ctx.Response().Stream(http.StatusSkapad, funktion(w http. treamWriter) fel {
  data := []string{"a", "b", "c"}
  for _, item := range data {
    if _, err := w. rite([]byte(artikel + "\n")); err != nil {
      return err
    }

    om err := w. lush(); err != nil {
      return err
    }

    gång.Sömn(1 * gång.
  }

  return nil
})
```

## Omdirigera

```go
ctx.Response().Redirect(http.StatusMovedPermanent, "https://goravel.dev")
```

## Inget innehåll

```go
ctx.Response().NejContent()
ctx.Response().NejContent(http.StatusOk)
```

## Få svar

Du kan få all information från `ctx.Response()`, som är vanligt förekommande i HTTP middleware:

```go
ursprung := ctx.Response().Origin()
```

`origin` innehåller några metoder som visas nedan：

| Metod   | Åtgärd          |
| ------- | --------------- |
| Kropp   | Hämta svarsdata |
| Rubrik  | Få svarshuvud   |
| Storlek | Få svarsstorlek |
| Status  | Få svarsstatus  |
