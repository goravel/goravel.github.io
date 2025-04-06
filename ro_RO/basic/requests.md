# Cereri HTTP

Metoda `contracte/http/Request` Goravel poate interacţiona cu cererea curentă HTTP procesată de aplicaţie,
şi obţine datele de intrare şi fişierele trimise împreună.

## Interacționează cu cererea

Instanţa `http.Context` este injectată automat în dispozitivul de control:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(tx http.Context) {

})
```

### Preluarea Căii de solicitare

```go
calea := ctx.Request().Path() //utilizatori
```

### Preluarea URL-ului de solicitare

```go
url := ctx.Request().Url() /utilizatori?name=Goravel
```

### Preluarea solicitării HOST

```go
url := ctx.Request().Host()
```

### Preluarea URL-ului de cerere completă

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Preluarea metodei de solicitare

```go
metoda := ctx.Request().Metodă()
```

### Antetele cererii

```go
header := ctx.Request().Header("X-Header-Name", "default")
headers := ctx.Request().Headers()
```

### Solicită adresa IP

```go
ip := ctx.Request().Ip()
```

## Input

### Preluarea tuturor datelor de intrare

Puteți prelua toate datele de intrare ale cererii ca `map[string]any` folosind metoda `All`, care este o colecție
de `json`, `form` și `query`(prioritate din față în spate).

```go
date := ctx.Request().All()
```

### Preluarea valorii traseului

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt(id)
```

### Preia intrare din șirul de interogare

```go
// /users?name=goravel
name := ctx.Request().Query("name")
nume := ctx.Request().Query("name", "default")

// /users?id=1
nume := ctx. equest().QueryInt("id")
nume := ctx.Request().QueryInt64("id")
numele := ctx.Request(). ueryBool("id")

//users?names=goravel1&names=goravel2
nume := ctx.Request().QueryArray("nume")

// /users?nume[a]=goravel1&names[b]=goravel2
nume:= ctx.Request().QueryMap("nume")

căutări := ctx.Request().Queries()
```

> Notă: Numai datele one-dimensionale Json pot fi obținute, altfel se va returna gol.

### Preluarea unei valori de intrare

Accesează toate datele de intrare ale utilizatorului fără a fi îngrijorător pentru care HTTP verb a fost folosit pentru solicitare. Recuperează ordinul: `json`,
`form`.

```go
numele := ctx.Request().Input("name")
numele := ctx.Request().Input("name", "goravel")
numele := ctx.Request().Input("nume")
numele := ctx.Request(). Numele nputInt64("nume")
:= ctx.Request().InputBool("name")
nume := ctx.Request().InputArray("name")
numele := ctx.Request().InputMap("name")
```

### Leagă Json/Formular

```go
type User struct {
  Nume `form:"code" json:"code"`
}

var user user
err := ctx.Request().Bind(&user)
```

```go
var user map[string]any
err := ctx.Request().Bind(&user)
```

### Legare interogare

Doar suportul leagă Interogarea de lovit:

```go
type Test struct {
  ID șir `form:"id"`
}
var test
err := ctx.Request().BindQuery(&test)
```

## Cookie

### Preluarea unei valori a Cookie

Goravel oferă o modalitate simplă de a lucra cu `cookie`. Utilizaţi metoda `Cookie` în instanţa `Request` pentru a prelua o valoare
`cookie` va returna un şir gol dacă `cookie` nu este prezent. De asemenea, puteți defini o valoare implicită în
al doilea argument.

```go
valoare := ctx.Request().Cookie("name")
valoare := ctx.Request().Cookie("nume", "implicit") 
```

## Fişier

### Preluarea fișierului

```go
fișier, err := ctx.Request().Fișier ("fișier")
```

### Salveaza fisier

```go
fișier, err := ctx.Request().File("fișier")
file.Store("./public")
```

### Solicitare de origine

```go
cerere := ctx.Request().Origin()
```

### Atașează date

```go
ctx.WithValue("utilizator", "Goravel")
```

### Obțineți date

```go
utilizator := ctx.Value("utilizator")
```

### Obține context

```go
ctx := ctx.Context()
```

## Recuperare personalizată

Puteţi seta un fişier personalizat `recovery` apelând metoda `Recuperare` în fişierul `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Add HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...)
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request().Abort()
    // or
    // ctx.Response().String(500, "Internal Server Error").Abort()
  })
  ...
}
```
