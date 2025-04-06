# Middleware

Middleware fornisce un meccanismo conveniente per ispezionare e filtrare le richieste HTTP che entrano nell'applicazione.

## Definisci Middleware

Puoi creare il tuo middleware nella directory `app/http/middleware`, la struttura è la seguente.

```go
package middleware

import (
  "github.com/goravel/framework/contracts/http"
)

func Auth() http.Middleware {
  return func(ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Crea Middleware Per Comando

```
go run . artisan make:middleware Auth

// Supporta le cartelle annidate
go run . artisan make:middleware user/Auth
```

## Registra Middleware

### Middleware Globale

Se si desidera applicare middleware per ogni richiesta HTTP della vostra applicazione, devi solo registrare il middleware in
il `Middleware` nel `app/http/kernel. file o`.

```go
// app/http/kernel.go
package http

import (
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Assegna Middleware per Routing

È possibile registrare il middleware per alcuni routing separatamente:

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Annulla Richiesta

Nel middleware, se hai bisogno di interrompere la richiesta, puoi usare il metodo `Abort`.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Not Found").Abort()
```
