# Middleware

Middleware biedt een handig mechanisme voor het inspecteren en filteren van HTTP-verzoeken die uw applicatie invoeren.

## Middleware definiëren

Je kunt je eigen middleware aanmaken in de `app/http/middleware` map, de structuur is als volgt.

```go
pakket middleware

import (
  "github.com/goravel/framework/contracts/http"
)

func Auth() http.Middleware {
  return func(ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Aanmaken Middleware Door Opdracht

```
ga uit. artisan make:middleware Auth

// Steun geneste mappen
go run . artisan make:middleware user/Auth
```

## Registreer Middleware

### Globaal Middleware

Als u middel-ware wilt toepassen voor elk HTTP-verzoek van uw applicatie, u hoeft alleen het middleware in
de `Middleware` te registreren in `app/http/kernel. o` bestand.

```go
// app/http/kernel.go
package http

import (
  "github.com/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Middleware toewijzen voor routering

U kunt het middleware voor sommige routers apart registreren:

```go
importeer "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Verzoek afbreken

In het middleware, als je het verzoek moet onderbreken, kun je de `Abort` methode gebruiken.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Not Found").Abort()
```
