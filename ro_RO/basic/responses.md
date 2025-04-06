# Răspuns HTTP

Puteți utiliza `ctx.Response()` pentru răspunsul HTTP în Controler.

## Şir

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
  "Salut": "Goravel",
})

ctx. esponse().Json(http. tatuOK, struct {
  ID uint `json:"id"`
  Numele de şir `json:"name"`
}{
  Id: 1,
  Front: "Goravel",
})
```

## Returnare personalizată

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Fișier de răspuns

```go
import "net/http"

ctx.Response().File("./public/logo.png")
```

## Descarcă fișier

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Atașare antet

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Cookie

### Setează cookie

Folosiți metoda `Cookie` pe instanța `response` pentru a seta un `cookie`. Metoda `Cookie` acceptă o instanţă `http.Cookie`
care vă permite să setaţi diverse opţiuni de cookie.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Nume: "name",
  Valoarea "Goravel",
  Cale: "/",
  Domeniu: "goravel. ev",
  Expires: time.Now().Add(24 * time.Hour),
  Securizat: true,
  HtrolOnly: true,
})
```

### Expiră cookie

Folosiți metoda `WithoutCookie` pentru a elimina un cookie.

```go
ctx.Response().WithoutCookie("nume")
```

## Returnare cu succes

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Cod personalizat

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Returnare Stream

```go
ctx.Response().Stream(http.StatusCreated, func(w http.StreamWriter) error {
  data := []string{"a", "b", "c"}
  for _, item := range data {
    if _, err := w.Write([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w.Flush(); err != nil {
      return err
    }

    time.Sleep(1 * time.Second)
  }

  return nil
})
```

## Redirecționare

```go
ctx.Response().Redirect(http.StatusMovedPermanent, "https://goravel.dev")
```

## Nici un conținut

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Obțineți răspuns

Puteți obține toate informațiile din `ctx.Response()`, care este utilizat în mod obișnuit în HTTP middleware:

```go
origine := ctx.Response().Origin()
```

`origin` conţine unele metode ca cele indicate mai jos：

| Metodă     | Acțiune                       |
| ---------- | ----------------------------- |
| Corp       | Obțineți date de răspuns      |
| Antet      | Obține antet de răspuns       |
| Dimensiune | Obține dimensiunea de răspuns |
| Status     | Obțineți starea răspunsului   |
