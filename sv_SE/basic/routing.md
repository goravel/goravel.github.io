# Rutt

Goravels routingmodul kan manövreras av `fasades.Route()`.

## HTTP drivrutin

Goravel använder [gin](https://github.com/gin-gonic/gin) som standard HTTP-drivrutin. För att använda andra drivrutiner, konfigurera dem i
filen `config/http.go`. Den officiella standardinställningen stöder [gin](https://github.com/gin-gonic/gin)
och [fiber](https://github.com/gofiber/fiber).

| Förare | Länk                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Gin    | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fiber  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Standardfil för routing

För att definiera routing-filer, navigera helt enkelt till katalogen '/ routes'. Som standard använder ramverket en exempelväg
som finns i `/routes/web.go`. För att fastställa routing bindning, är `func Web()` -metoden registrerad i
`app/providers/route_service_provider.go` -filen.

Om du behöver mer exakt hantering kan du lägga till routing-filer till katalogen '/routes' och registrera dem i filen
'app/providers/route_service_provider.go'.

## Starta HTTP-server

Starta HTTP-servern i `main.go` i rotkatalogen genom att anropa `facades.Route().Run()`. Detta kommer automatiskt
hämta konfigurationen `route.host`.

```go
paket main

import (
  "github. om/goravel/frameing/facades"

  "goravel/bootstrap"
)

func main() {
  // Detta bootstraps ramverket och blir klart för användning.
  bootstrap. oot()

  // Starta http-servern av facades.Route().
  go func() {
    if err := fasader. oute().Kör(); err != nil {
      fasader. og().Errorf("Route run fel: %v", err)
    }
  }()

  select {}
}
```

## Starta HTTPS Server

Vänligen fyll i konfigurationen av `http.tls` i `config/http.go` innan du använder HTTPS, `facades.Route().RunTLS()`
-metoden startar HTTPS-servern enligt relevant konfiguration:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run fel: %v", err)
}
```

Du kan också använda `facades.Route().RunTLSWithCert()` metod för att anpassa värd och certifikat.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## Stäng HTTP/HTTPS Server

Du kan graciöst stänga HTTP/HTTPS-servern genom att anropa `Shutdown`-metoden, vilket kommer att vänta på att alla förfrågningar ska
bearbetas innan de stängs.

```go
// main.go
bootstrap.Boot()

// Skapa en kanal för att lyssna på OS-signaler
avsluta := make(chan os.Signal)
signal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Starta http-servern av fasades.Route().
go func() {
  if err := facades.Route().Kör(); err != nil {
    fasader.Log(). rrorf("Route run fel: %v", err)
  }
}()

// Lyssna på OS-signalen
go func() {
  <-quit
  if err := fasader. oute().Avstängning(); err != nil {
    fasader.Log(). rrorf("Route avstängningsfel: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### Rutter metoder

| Metoder    | Åtgärd                                  |
| ---------- | --------------------------------------- |
| Grupp      | [Grupp Routing](#group-routing)         |
| Prefix     | [Routing Prefix](#routing-prefix)       |
| ServeHTTP  | [Testar routing](#testing-routing)      |
| Hämta      | [Grundläggande routing](#basic-routing) |
| Inlägg     | [Grundläggande routing](#basic-routing) |
| Sätt       | [Grundläggande routing](#basic-routing) |
| Radera     | [Grundläggande routing](#basic-routing) |
| Patch      | [Grundläggande routing](#basic-routing) |
| Alternativ | [Grundläggande routing](#basic-routing) |
| Valfri     | [Grundläggande routing](#basic-routing) |
| Resurs     | [Resurs Routing](#resource-routing)     |
| Statisk    | [Filroutning](#file-routing)            |
| StaticFile | [Filroutning](#file-routing)            |
| StaticFS   | [Filroutning](#file-routing)            |
| Middleware | [Middleware](#middleware)               |

## Grundläggande routing

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  returnera ctx.Response().Json(http.StatusOK, http. son{
    "Hej": "Goravel",
  })
})
fasades.Route().Post("/", userController.Show)
fasader. oute().Put("/", userController.Show)
fasader.Route().Ta bort ("/", userController.Show)
fasades.Route().Patch("/", userController.Show)
fasades.Route().Alternativ("/", userController.Show)
fasader.Route().Any("/", userController.Show)
```

## Resurs routing

```go
importera "github.com/goravel/frameing/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// DELETE /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Grupp Routing

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Prefix för routing

```go
facades.Route().Prefix("användare").Get("/", userController.Show)
```

## Fil Routing

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Parametrar för routing

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detalj [Request](./requests)

## Middleware

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("användare", userController.Show)
```

Detalj [Middleware](./middlewares)

## Fallback Rutter

Med hjälp av `Fallback`-metoden kan du definiera en rutt som kommer att köras när ingen annan rutt matchar den inkommande
-begäran.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## Betygsätt Begränsning

### Definierar hastighetsbegränsningar

Goravel innehåller kraftfulla och anpassningsbara hastighetsbegränsande tjänster som du kan använda för att begränsa mängden trafik
för en viss rutt eller grupp av rutter. För att komma igång bör du definiera hastighetsbegränsarkonfigurationer som uppfyller dina
-applikationers behov. Vanligtvis bör detta göras inom `configureRateLimiting` -metoden för din applikations
`app/providers/route_service_provider.go` -klassen.

Betygsbegränsare definieras med `facades.RateLimiter()`'s `For`-metoden. `For`-metoden accepterar ett hastighetsbegränsarnamn
och en stängning som returnerar den gränskonfiguration som ska gälla för rutter som tilldelas hastighetsbegränsaren.
Namnet på hastighetsbegränsaren kan vara vilken sträng du vill:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/frameing/facades"
  "github. om/goravel/framee/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  fasader. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Om den inkommande begäran överskrider den angivna hastighetsgränsen, kommer ett svar med en 429 HTTP-statuskod automatiskt att
returneras av Goravel. Om du vill definiera ditt eget svar som ska returneras med en hastighetsgräns, kan du använda
svarsmetoden:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Eftersom hastighetsbegränsare callbacks tar emot inkommande HTTP-begäran instans, du kan bygga lämplig hastighetsgräns
dynamiskt baserat på inkommande begäran eller autentiserad användare:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Antag
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Gränser för segmenteringshastighet

Ibland kan du vilja segmentera hastighetsgränser med något godtyckligt värde. Du kanske till exempel vill tillåta användare att
komma åt en given rutt 100 gånger per minut per IP-adress. För att uppnå detta kan du använda `By`-metoden när du bygger
din hastighetsbegränsning:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

För att illustrera denna funktion med ett annat exempel, vi kan begränsa åtkomsten till rutten till 100 gånger per minut per
autentiserad användar-ID eller 10 gånger per minut per IP-adress för gäster:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Flera hastighetsgränser

Om det behövs, kan du returnera en rad hastighetsgränser för en given hastighetsbegränsare konfiguration. Varje hastighetsgräns kommer att
utvärderas för rutten baserat på den ordning de placeras inom arrayen:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Koppla hastighetsbegränsningar till rutter

Hastighetsbegränsare kan anslutas till rutter eller ruttgrupper med hjälp av spjällmittdleware. Gasen middleware accepterar
namnet på hastighetsbegränsaren du vill tilldela rutten:

```go
import github.com/goravel/frameing/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hej": "Goravel",
  })
})
```

## Cross-Origin Resource Sharing (CORS)

Goravel har CORS aktiverat som standard, konfigurationen kan ändras i `config/cors.go`.

> För mer information om CORS och CORS rubriker, vänligen se
> [MDN webbdokumentation på CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
