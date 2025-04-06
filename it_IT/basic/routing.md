# Routing

Il modulo di routing Goravel può essere gestito da `facades.Route()`.

## Driver HTTP

Goravel utilizza [gin](https://github.com/gin-gonic/gin) come driver HTTP predefinito. Per utilizzare altri driver, configurarli in
il file `config/http.go`. Il valore predefinito ufficiale supporta [gin](https://github.com/gin-gonic/gin)
e [fiber](https://github.com/gofiber/fiber).

| Driver | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Gin    | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fibra  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## File Routing Predefinito

Per definire i file di routing, basta passare alla directory `/routes`. Per impostazione predefinita, il framework utilizza un esempio di percorso
situato in `/routes/web.go`. Per stabilire il collegamento di routing, il metodo `func Web()` è registrato nel file `app/providers/route_service_provider.go`
.

If you require more precise management, you can add routing files to the `/routes` directory and register them in the
`app/providers/route_service_provider.go` file.

## Avvia Server HTTP

Avvia il server HTTP in `main.go` nella directory root chiamando `facades.Route().Run()`. Questo recupererà automaticamente
la configurazione `route.host`.

```go
pacchetto principale di importazione

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Questo bootstraps il framework e lo rende pronto per l'uso.
  bootstrap. oot()

  // Avvia il server http per facades.Route().
  go func() {
    if err := facades. oute().Run(); err != nil {
      facades. og().Errorf("Errore di esecuzione del percorso: %v", err)
    }
  }()

  select {}
}
```

## Avvia Server HTTPS

Si prega di completare la configurazione di `http.tls` in `config/http.go` prima di utilizzare HTTPS, il metodo `facades.Route().RunTLS()`
avvierà il server HTTPS secondo la relativa configurazione:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

Puoi anche usare il metodo `facades.Route().RunTLSWithCert()` per personalizzare l'host e il certificato.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## Chiudi Server HTTP/HTTPS

Puoi chiudere con grazia il server HTTP/HTTPS chiamando il metodo `Shutdown`, che aspetterà che tutte le richieste siano elaborate
prima di chiudere.

```go
// main.go
bootstrap.Boot()

// Crea un canale per ascoltare i segnali OS
quit := make(chan os.Signal)
signal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Avvia server http da facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Errore di esecuzione del percorso: %v", err)
  }
}()

// Ascolta per il segnale OS
go func() {
  <-quit
  if err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Errore di arresto del percorso: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### Metodi Di Routing

| Metodi     | Azione                               |
| ---------- | ------------------------------------ |
| Gruppo     | [Group Routing](#group-routing)      |
| Prefisso   | [Prefisso Routing](#routing-prefix)  |
| ServeHTTP  | [Testing Routing](#testing-routing)  |
| Ottieni    | [Basic Routing](#basic-routing)      |
| Post       | [Basic Routing](#basic-routing)      |
| Metti      | [Basic Routing](#basic-routing)      |
| Elimina    | [Basic Routing](#basic-routing)      |
| Patch      | [Basic Routing](#basic-routing)      |
| Opzioni    | [Basic Routing](#basic-routing)      |
| Qualsiasi  | [Basic Routing](#basic-routing)      |
| Risorsa    | [Routing Risorse](#resource-routing) |
| Statico    | [File Routing](#file-routing)        |
| StaticFile | [File Routing](#file-routing)        |
| StaticFS   | [File Routing](#file-routing)        |
| Middleware | [Middleware](#middleware)            |

## Routing Base

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Hello": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
facades. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Routing Risorse

```go
import "github.com/goravel/framework/contracts/http"

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

## Routing Di Gruppo

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Prefisso Routing

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## File Routing

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Parametri Di Routing

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Dettaglio [Request](./requests)

## Middleware

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Dettaglio [Middleware](./middlewares)

## Percorsi Di Fallback

Usando il metodo `Fallback`, puoi definire un percorso che verrà eseguito quando nessun altro percorso corrisponde alla richiesta
in arrivo.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## Limite Di Tasso

### Definizione Dei Limitatori Di Tasso

Goravel include potenti e personalizzabili servizi di limitazione della velocità che si possono utilizzare per limitare la quantità di traffico
per un determinato percorso o gruppo di rotte. Per iniziare, dovresti definire le configurazioni del limitatore di velocità che soddisfino le esigenze della tua applicazione
. Tipicamente, questo dovrebbe essere fatto all'interno del metodo `configureRateLimiting` della classe
della tua applicazione `app/providers/route_service_provider.go`.

I limitatori di velocità sono definiti usando il metodo `facades.RateLimiter()`'s `For`. Il metodo `For` accetta un nome
del limitatore di velocità e una chiusura che restituisce la configurazione limite che dovrebbe applicarsi agli itinerari assegnati al limitatore di velocità.
Il nome del limitatore di velocità può essere qualsiasi stringa desiderata:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Se la richiesta in arrivo supera il limite di velocità specificato, una risposta con un codice di stato HTTP 429 sarà automaticamente
restituito da Goravel. Se si desidera definire la propria risposta che dovrebbe essere restituita da un limite di tasso, è possibile utilizzare
il metodo di risposta:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Dal momento che i callback del limitatore di velocità ricevono l'istanza di richiesta HTTP in arrivo, è possibile costruire il limite di velocità appropriato
dinamicamente in base alla richiesta in arrivo o all'utente autenticato:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Suppose
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Limiti Di Tasso Di Segmentazione

A volte si può desiderare segmentare i limiti di tasso da qualche valore arbitrario. Ad esempio, potresti voler consentire agli utenti di
di accedere a un determinato percorso 100 volte al minuto per indirizzo IP. Per ottenere questo risultato, è possibile utilizzare il metodo `By` quando si costruisce
il limite di tasso:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Per illustrare questa funzione utilizzando un altro esempio, possiamo limitare l'accesso al percorso a 100 volte al minuto per
ID utente autenticato o 10 volte al minuto per indirizzo IP per gli ospiti:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Limiti Di Frequenza Multipla

Se necessario, è possibile restituire una serie di limiti di velocità per una data configurazione del limitatore di velocità. Ogni limite di tasso sarà valutato
per il percorso in base all'ordine che vengono effettuati all'interno dell'array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Collegare Limitatori Di Tasso Alle Itinerari

I limitatori di velocità possono essere collegati a rotte o a gruppi di rotte utilizzando il middleware dell'acceleratore. Il middleware dell'acceleratore accetta
il nome del limitatore di velocità che si desidera assegnare al percorso:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Condivisione Risorse Di Origine Superiore (COrs)

Goravel ha il CORS abilitato per impostazione predefinita, la configurazione può essere modificata in `config/cors.go`.

> Per ulteriori informazioni sulle intestazioni CORS e CORS, consultare
> la [documentazione web MDN sul CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
