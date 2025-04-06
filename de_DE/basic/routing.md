# Routing

Das Goravel Routing-Modul kann mit `facades.Route()` betrieben werden.

## HTTP-Treiber

Goravel verwendet [gin](https://github.com/gin-gonic/gin) als Standard-HTTP-Treiber. Um andere Treiber zu verwenden, konfigurieren Sie sie in
der `config/http.go` Datei. Der offizielle Standard unterstützt [gin](https://github.com/gin-gonic/gin)
und [fiber](https://github.com/gofiber/fiber).

| Fahrer | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Gin    | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Faser  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Standard-Routing-Datei

Um Routing-Dateien zu definieren, navigieren Sie einfach zum `/routes`-Verzeichnis. Standardmäßig verwendet das Framework eine Beispielroute
die sich in `/routes/web.go` befindet. Um Routing Binding zu etablieren, wird die Methode `func Web()` in der
`app/providers/route_service_provider.go` Datei registriert.

Wenn du eine genauere Verwaltung benötigst, kannst du Routing-Dateien in das `/routes`-Verzeichnis hinzufügen und sie in der
`app/providers/route_service_provider.go` Datei registrieren.

## HTTP-Server starten

Starte den HTTP-Server in `main.go` im Root-Verzeichnis, indem du `facades.Route().Run()` aufrufst. Dies wird automatisch
die `route.host` Konfiguration abrufen.

```go
Paket Haupt-

Import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dies ist ein Bootstraps für das Framework und wird für den Einsatz vorbereitet.
  Bootstrap. oot()

  // Start des http-Servers durch facades.Route().
  go func() {
    if err := facades. oute().Run(); err != nil {
      Fassaden. og().Errorf("Route Run error: %v", err)
    }
  }()

  select {}
}
```

## HTTPS-Server starten

Bitte vervollständigen Sie die Konfiguration von `http.tls` in `config/http.go` bevor Sie HTTPS verwenden, die Methode `facades.Route().RunTLS()`
startet den HTTPS-Server gemäß der entsprechenden Konfiguration:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

Sie können auch `facades.Route().RunTLSWithCert()` Methode verwenden, um den Host und das Zertifikat anzupassen.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## HTTP/HTTPS-Server schließen

Du kannst den HTTP/HTTPS-Server würdevoll schließen, indem du die `Shutdown`-Methode aufrufst, die darauf wartet, dass alle Anfragen
vor dem Schließen bearbeitet werden.

```go
// main.go
bootstrap.Boot()

// Erstellen Sie einen Kanal, um auf OS-Signale
zu hören := make(chan os.Signal)
signal.Notify(beenden, syscall. IGINT, syscall.SIGTERM)

// Start http server by facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Routenlauf Fehler: %v", err)
  }
}()

// Das OS-Signal
go func() {
  <-quit
  if err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Route Herunterfahren Fehler: %v", err)
  }

  os.Exit(0)
}()

wählen Sie {}
```

### Routing-Methoden

| Methoden   | Aktion                                  |
| ---------- | --------------------------------------- |
| Gruppe     | [Gruppen-Routing](#group-routing)       |
| Präfix     | [Routing Präfix](#routing-prefix)       |
| ServeHTTP  | [Testen von Routing](#testing-routing)  |
| Erhalten   | [Basic Routing](#basic-routing)         |
| Posten     | [Basic Routing](#basic-routing)         |
| Legen      | [Basic Routing](#basic-routing)         |
| Löschen    | [Basic Routing](#basic-routing)         |
| Patch      | [Basic Routing](#basic-routing)         |
| Optionen   | [Basic Routing](#basic-routing)         |
| Alle       | [Basic Routing](#basic-routing)         |
| Ressource  | [Ressourcen-Routing](#resource-routing) |
| Statisch   | [Datei-Routing](#file-routing)          |
| StaticFile | [Datei-Routing](#file-routing)          |
| StaticFS   | [Datei-Routing](#file-routing)          |
| Middleware | [Middleware](#middleware)               |

## Einfaches Routen

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Hallo": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
Fassaden. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Ressourcen-Routing

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
// LÖSCHE /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Gruppenrouting

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
 }) 
 })
```

## Routing Präfix

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## Datei-Routing

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Routing-Parameter

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
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detail [Middleware](./middlewares)

## Fallback-Routen

Mit der `Fallback`-Methode kannst du eine Route definieren, die ausgeführt wird, wenn keine andere Route mit der eingehenden
-Anfrage übereinstimmt.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## Bewertungsbegrenzung

### Definition der Ratenbegrenzer

Goravel beinhaltet leistungsstarke und anpassbare Dienste zur Begrenzung der Rate, die Sie nutzen können, um die Menge des Verkehrs
für eine bestimmte Route oder Gruppe von Routen zu begrenzen. Um loszulegen, sollten Sie die Preislimiter-Konfigurationen festlegen, die den Anforderungen Ihrer
Anwendung entsprechen. Normalerweise sollte dies innerhalb der `configureRateLimiting` Methode der
`app/providers/route_service_provider.go` Klasse geschehen.

Ratenbegrenzer werden mit der `facades.RateLimiter()`'s `For` Methode definiert. Die `For` Methode akzeptiert einen Preislimiter-Namen
und eine Schließung, die die Grenzkonfiguration zurückgibt, die auf Routen angewendet werden soll, die dem Preislimiter zugewiesen sind.
Der Name des Kurslimiters kann beliebiger String sein:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (Empfänger *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Wenn die eingehende Anfrage das angegebene Preislimit überschreitet, wird eine Antwort mit einem 429 HTTP-Statuscode automatisch
von Goravel zurückgegeben. Wenn du deine eigene Antwort definieren möchtest, die durch ein Kurslimit zurückgegeben werden soll, kannst du die Antwortmethode
verwenden:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Da Ratenbegrenzer Callbacks die eingehende HTTP-Anfrageinstanz erhalten du kannst das entsprechende Preislimit
dynamisch basierend auf der eingehenden Anfrage oder dem authentifizierten Benutzer erstellen:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Angenommen
  wenn is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Begrenzung der Segmentierungsrate

Manchmal kann es vorkommen, dass Sie Grenzwerte um einen beliebigen Wert verteilen möchten. Zum Beispiel möchten Sie vielleicht Benutzern erlauben, auf eine bestimmte Route 100 Mal pro Minute pro IP-Adresse zuzugreifen. Um dies zu erreichen, kannst du die `By` Methode verwenden, wenn du
dein Kurslimit erstellst:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Um diese Funktion mit einem anderen Beispiel zu illustrieren wir können den Zugriff auf die Route auf 100 mal pro Minute pro
authentifizierte Benutzer-ID beschränken oder 10 mal pro Minute pro IP-Adresse für Gäste:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Limit für mehrere Raten

Bei Bedarf können Sie ein Array von Ratenlimits für eine bestimmte Ratenbegrenzerkonfiguration zurückgeben. Jedes Preislimit wird
für die Route anhand der Reihenfolge innerhalb des Arrays ausgewertet:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Ratenbegrenzer an Routen anhängen

Mit der Drossel-Middleware können Ratenbegrenzer an Routen oder Gruppen angehängt werden. Die Drossel-Middleware akzeptiert
den Namen des Kurslimiters, den Sie der Route zuweisen möchten:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Cross-Origin Resource Sharing (CORS)

Goravel hat CORS standardmäßig aktiviert, die Konfiguration kann in `config/cors.go` geändert werden.

> Für weitere Informationen zu CORS und CORS Kopfzeilen konsultieren Sie bitte
> die [MDN Web-Dokumentation zu CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
