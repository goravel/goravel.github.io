# Routering

De Goravel routing module kan worden beheerd door `facades.Route()`.

## HTTP Chauffeur

Goravel gebruikt [gin](https://github.com/gin-gonic/gin) als standaard HTTP-driver. Om andere chauffeurs te gebruiken, configureer ze in
het `config/http.go` bestand. De officiële standaard ondersteunt [gin](https://github.com/gin-gonic/gin)
en [fiber](https://github.com/gofiber/fiber).

| Chauffeur | Koppeling                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Gin       | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Vezel     | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Standaard routeringsbestand

Om routing bestanden te definiëren, navigeer naar de `/routes` map. Standaard gebruikt het framework een voorbeeld route
gelegen in `/routes/web.go`. Om routing binding op te zetten, is de `func Web()` methode geregistreerd in de
`app/providers/route_service_provider.go` bestand.

Als u preciezer beheer nodig heeft, kunt u routing bestanden toevoegen aan de `/routes` map en ze registreren in de
`app/providers/route_service_provider.go` bestand.

## HTTP-server starten

Start de HTTP-server in `main.go` in de hoofdmap door `facades.Route().Run()` aan te roepen. Dit zal automatisch
de `route.host` configuratie ophalen.

```go
Pakket main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dit bootstraps het framework en maakt het klaar voor gebruik.
  Bootstrap. oot()

  // Start http server door facades.Route().
  ga func() {
    als err := facades. oute().Run(); err != nil {
      facades. og().Errorf("Route run fout: %v", err)
    }
  }()

  select {}
}
```

## HTTPS-server starten

Voltooi de configuratie van `http.tls` in `config/http.go` voordat u HTTPS, de `facades.Route().RunTLS()`
methode start de HTTPS server volgens de relevante configuratie:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

U kunt ook de `facades.Route().RunTLSWithCert()` methode gebruiken om de host en het certificaat aan te passen.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.0.3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Error("Route run error: %v", err)
}
```

## Sluit HTTP/HTTPS Server

Je kunt de HTTP/HTTPS server in alle opzichten sluiten door de `Shutdown` methode aan te roepen die wacht tot alle verzoeken
zijn verwerkt voordat je afsluit.

```go
// main.go
bootstrap.Boot()

// Creëer een kanaal om te luisteren naar OS signalen
quit := make(chan os.Signal)
signal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Start http server door facades.Route().
ga func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Route run error: %v", err)
  }
}()

// Luister naar het OS signaal
ga func() {
  <-quit
  als err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Route shutdown fout: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### Routing methoden

| Methoden     | actie                                 |
| ------------ | ------------------------------------- |
| Groeperen    | [Groep Uitgaven](#group-routing)      |
| Voorvoegsel  | [Voorvoegsel](#routing-prefix)        |
| ServeHTTP    | [Testen Uitgang](#testing-routing)    |
| Verkrijg     | [Basic Routing](#basic-routing)       |
| Plaatsen     | [Basic Routing](#basic-routing)       |
| Zet          | [Basic Routing](#basic-routing)       |
| Verwijderen  | [Basic Routing](#basic-routing)       |
| Patch        | [Basic Routing](#basic-routing)       |
| Instellingen | [Basic Routing](#basic-routing)       |
| Elk          | [Basic Routing](#basic-routing)       |
| Bron         | [Resource Routing](#resource-routing) |
| statisch     | [File Routing](#file-routing)         |
| StaticFile   | [File Routing](#file-routing)         |
| StaticFS     | [File Routing](#file-routing)         |
| Middleware   | [Middleware](#middleware)             |

## Basis routering

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  retourneert ctx.Response().Json(http.StatusOK, http. son{
    "Hallo": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
facades. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Bron routering

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route().Resource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http.Context) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http.Context) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http.Context) {}
// DELETE /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Groepeer routering

```go
facades.Route().Group(functie(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Routering voorvoegsel

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## Bestand routeren

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-bestand", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Routering parameters

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detail [Request](./requests)

## Middleware

```go
importeer "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detail [Middleware](./middlewares)

## Terugval routes

Met de `Fallback` methode kunt u een route definiëren die zal worden uitgevoerd wanneer geen andere route overeenkomt met het inkomende
verzoek.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  retourneer ctx.Response().String(404, "niet gevonden")
})
```

## Tarief Limiet

### Definiëren van tarief

Goravel includes powerful and customizable rate-limiting services that you may utilize to restrict the amount of traffic
for a given route or group of routes. Om te beginnen, moet u tarieflimietconfiguraties definiëren die voldoen aan de behoeften van uw
applicatie. Meestal moet dit worden gedaan binnen de `configureRateLimiting` methode van je applicatie 's
`app/providers/route_service_provider.go` class.

Rate limiters zijn gedefinieerd met behulp van de `facades.RateLimiter()`'s `For` methode. De `For` methode accepteert een tarieflimiter naam
en een sluiting die de limiet configuratie teruggeeft die moet gelden voor routes die zijn toegewezen aan de tarief limiet.
De snelheidsbegrenzer naam kan een string zijn die u wilt:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Als de inkomende aanvraag de ingestelde tarieflimiet overschrijdt, zal een antwoord met een HTTP-statuscode van 429 automatisch
gegeven door Goravel. Als u uw eigen reactie wilt bepalen die moet worden geretourneerd aan de hand van een tarieflimiet, kunt u
de responsmethode gebruiken:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Omdat tarief limiter callbacks ontvangen van het inkomende HTTP-verzoek instantie, u kunt de juiste tarieflimiet
opbouwen op basis van het inkomende verzoek of geauthenticeerde gebruiker:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Suppose
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Segmentsnelheid limieten

Soms kunt u segmenteren tarieflimieten door een willekeurige waarde. U kunt gebruikers bijvoorbeeld toestaan om
100 keer per minuut per IP-adres toegang te geven tot een bepaalde route. Om dit te volbrengen, kunt u de 'By' methode gebruiken bij het bouwen van
uw aantal limiet:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Om deze functie te illustreren met een ander voorbeeld, we kunnen toegang tot de route beperken tot 100 keer per minuut per
geverifieerde gebruikers-ID of 10 keer per minuut per IP-adres voor gasten:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Meerdere Ratio Limieten

Indien nodig kan je een array van tarieven limieten voor een bepaalde rate limiter configuratie retourneren. Elke tarieflimiet zal
geëvalueerd worden voor de route op basis van de bestelling die ze in het matrix geplaatst worden:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinuute(100).By(ctx.Request().Ip()),
  }
})
```

### Beperkingen van wisselkoersen aan routes koppelen

Beeldbegrenzers kunnen worden gekoppeld aan routes of route groepen met behulp van de gas middleware. Het midden-uurwerk accepteert
de naam van de snelheidsbegrenzer die u aan de route wilt toewijzen:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.middleware.Throttle("global").Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Resource Sharing Cross-Origin (CORS)

Goravel heeft CORS standaard ingeschakeld, de configuratie kan worden gewijzigd in `config/cors.go`.

> Voor meer informatie over CORS en CORS headers, raadpleeg
> de [MDN web documentatie over CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
