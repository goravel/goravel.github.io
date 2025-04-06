# Middleware

Middleware bietet einen praktischen Mechanismus zur Überprüfung und Filterung von HTTP-Anforderungen, die in Ihre Anwendung eindringen.

## Middleware definieren

Du kannst deine eigene Middleware im `app/http/middleware` Verzeichnis erstellen, die Struktur ist wie folgt.

```go
Paket Middleware

Import (
  "github.com/goravel/framework/contracts/http"
)

func Auth() http.Middleware {
  return func(ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Middleware per Kommando erstellen

```
go run . artisan make:middleware Auth

// Verschachtelte Ordner unterstützen
go run . artisan make:middleware user/Auth
```

## Middleware registrieren

### Globale Middleware

Wenn Sie Middleware für jede HTTP-Anfrage Ihrer Anwendung anwenden möchten Sie müssen nur die Middleware in
registrieren, die `Middleware` im `app/http/kernel. o` Datei.

```go
// app/http/kernel.go
Paket http

importieren (
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

Type Kernel struct {
}

func (kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Middleware für Routing zuweisen

Sie können die Middleware für einige Routing separat registrieren:

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Anfrage abbrechen

In der Middleware können Sie, falls Sie die Anfrage unterbrechen müssen, die "Abort"-Methode verwenden.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Nicht Found").Abort()
```
