# Rutare

Modulul de rutare Goravel poate fi operat de `facades.Route()`.

## Șofer HTTP

Goravel folosește [gin](https://github.com/gin-gonic/gin) ca șofer HTTP implicit. Pentru a folosi alţi şoferi, configuraţi-le în
fişierul `config/http.go`. Implicit acceptă [gin](https://github.com/gin-gonic/gin)
şi [fiber](https://github.com/gofiber/fiber).

| Șofer | Link-ul                                                                                              |
| ----- | ---------------------------------------------------------------------------------------------------- |
| Gin   | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fibră | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Fişier de rutare implicit

Pentru a defini fișierele de rutare, navigați pur și simplu la directorul `/routes`. În mod implicit, cadrul utilizează o probă de rută
localizată în `/routes/web.go`. Pentru a stabili legarea de rutare, metoda `func Web()` este înregistrată în fişierul
`app/providers/route_provider.go`.

Dacă ai nevoie de o gestionare mai precisă, poți adăuga fișiere de rutare în directorul `/routes` și să le înregistrezi în fișierul
`app/providers/route_service_provider.go`.

## Pornire server HTTP

Porniți serverul HTTP în `main.go` în directorul rădăcină apelând `facades.Route().Run()`. Acest lucru va prelua automat
configurația `route.host`.

```go
importarea pachetului principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Acest bootstraps cadrul şi îl pregăteşte pentru utilizare.
  bootstrap. oot()

  // Pornește serverul http cu fațades.Route().
  mergeți func() {
    if err := faades. oute().Run(); err != nil {
      fațades. og().Errorf("Rute run error: %v", err)
    }
  }()

  select {}
}
```

## Pornire server HTTPS

Vă rugăm să completați configurația `http.tls` în `config/http.go` înainte de a utiliza HTTPS, metoda `facades.Route().RunTLS()`
va porni serverul HTTPS în conformitate cu configurația relevantă:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Rute run error: %v", err)
}
```

Puteți folosi, de asemenea, metoda `facades.Route().RunTLSWithCert()` pentru a personaliza gazda și certificatul.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.1:3000", "ca.pem", "ca.key"); err != nil {
  faades.Log().Errorf("Rute run error: %v", eroare)
}
```

## Închide serverul HTTP/HTTPS

Puteți închide grațios serverul HTTP/HTTPS apelând metoda `Shutdown`, care va aștepta ca toate cererile să fie
procesate înainte de a închide.

```go
// main.go
bootstrap.Boot()

// Creați un canal pentru a asculta semnalele OS
renunțați := make(chan os.Signal)
semnal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Pornește serverul http cu fațades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    faades.Log(). rrorf("Ruta eroare: %v", eroare)
  }
}()

// Ascultați semnalul OS
mergeți funcțional () {
  <-quit
  dacă err := fațades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Eroare de închidere a rutei: %v", eroare)
  }

  os.Exit(0)
}()

selectează {}
```

### Metode de rutare

| Metode     | Acțiune                                 |
| ---------- | --------------------------------------- |
| Grup       | [Routing de grup](#group-routing)       |
| Prefix     | [Prefix de rutare](#routing-prefix)     |
| ServeHTTP  | [Testare rută](#testing-routing)        |
| Ia         | [Rutare de bază](#basic-routing)        |
| Postează   | [Rutare de bază](#basic-routing)        |
| Pune       | [Rutare de bază](#basic-routing)        |
| Ștergere   | [Rutare de bază](#basic-routing)        |
| Pastă      | [Rutare de bază](#basic-routing)        |
| Opţiuni    | [Rutare de bază](#basic-routing)        |
| Oricare    | [Rutare de bază](#basic-routing)        |
| Resursă    | [Routing de resurse](#resource-routing) |
| Statică    | [Rutare fișiere](#file-routing)         |
| StaticFile | [Rutare fișiere](#file-routing)         |
| StaticFS   | [Rutare fișiere](#file-routing)         |
| Middleware | [Middleware](#middleware)               |

## Rutare de bază

```go
facades.Route().Get("/", funcţie (ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Hello": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
fațade. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/userController.Show)
facades.Route().Any("/", userController.Show)
```

## Rutare resurse

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource(„/resource”), resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) how(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// DELETE /resource/{id}
func c (c *ResourceController) Destroy(ctx http.Context) {}
```

## Rutare grup

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Prefix dirijare

```go
facades.Route().Prefix("utilizatori").Get("/", userController.Show)
```

## Rutare fişiere

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Parametri de rutare

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detaliu [Request](./requests)

## Middleware

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detaliu [Middleware](./middlewares)

## Rute de întoarcere

Folosind metoda `Fallback`, poți defini o rută care va fi executată atunci când nici o altă rută nu corespunde solicitării de la
primite.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "nu a fost găsit")
})
```

## Rata de limitare

### Limitare rată de definire

Goravel include servicii puternice şi personalizabile de limitare a vitezei pe care le puteţi utiliza pentru a restricţiona traficul
pentru un anumit traseu sau grup de rute. Pentru a începe, ar trebui să definiți configurațiile limiterului de rate care satisfac nevoile aplicației
. De obicei, acest lucru ar trebui să se facă în cadrul clasei `configureRateLimiting` a aplicaţiei
`app/providers/route_service_provider.go`.

Limitele ratei sunt definite folosind metoda `facades.RateLimiter()`'s `For`. Metoda `pentru` acceptă un nume de limită de rate
şi o închidere care returnează limita de configuraţie care ar trebui să se aplice rutelor care sunt alocate limitatorului de rate.
Numele limiterului de rate poate fi orice şir dorit:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (receptor *RouteServiceProvider) configureRateLimiting() {
  fațades. ateLimiter().For("global", func(tx contractshΠ.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Dacă cererea de intrare depășește limita de rate specificată, un răspuns cu un cod de stare HTTP 429 va fi automat
returnat de Goravel. Dacă doriți să vă definiți propriul răspuns, care ar trebui returnat printr-o limită de rată, puteți utiliza
metoda de răspuns:

```go
facades.RateLimiter().For("global", functii (ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Din moment ce limiterul de rate primesc apeluri HTTP primite, puteți construi limita de rată corespunzătoare
în mod dinamic bazat pe cererea de intrare sau pe utilizatorul autentificat:

```go
facades.RateLimiter().For("global", func(tx contractshttp.Context) contractshΠ.Limit {
  // Previne
  dacă is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Limitele ratei de segregare

Uneori poate doriți să segmentați limitele ratei după o valoare arbitrară. For example, you may wish to allow users to
access a given route 100 times per minute per IP address. Pentru a realiza acest lucru, poți folosi metoda `By` când construiești punctul
limita de rată:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Pentru a ilustra această caracteristică folosind un alt exemplu, putem limita accesul la rută de 100 de ori pe minut per
autentificat ID utilizator sau de 10 ori pe minut per adresă IP pentru vizitatori:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Limite rate multiple

Dacă este necesar, puteți returna o serie de limite ale ratei pentru o configurație dată a limiterului de rate Fiecare limită de rată va fi
evaluată pentru ruta în funcție de ordinea pe care o plasează în array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshΠ.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Atașare rate de limitare la rute

Limitele de rate pot fi ataşate la rutele sau grupurile de rute folosind middleware-ul cu acceleraţie. Middleware-ul de accelerare acceptă
numele limitatorului de rate pe care doriți să îl atribuiți rutei:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Salut": "Goravel",
  })
})
```

## Distribuire între resurse de origine (CORS)

Goravel are CORS activat implicit, configurația poate fi modificată în `config/cors.go`.

> Pentru mai multe informaţii despre CORS şi CORS vă rugăm să consultaţi
> [documentaţia web MDN pe CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
