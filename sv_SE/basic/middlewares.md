# Middleware

Middleware ger en bekväm mekanism för att inspektera och filtrera HTTP-förfrågningar som matar in ditt program.

## Definiera Middleware

Du kan skapa din egen middleware i katalogen `app/http/middleware` , strukturen är som följer.

```go
package middleware

import (
  "github.com/goravel/frameing/contracts/http"
)

func Auth() http.Middleware {
  returfunktion (ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Skapa Middleware efter kommando

```
gå kör. hantverkare make:middleware Auth

// Stöd nästlade mappar
gå att köra. hantverkare make:middleware användare/Auth
```

## Registrera Middleware

### Global Middleware

Om du vill tillämpa middleware för varje HTTP-begäran i din applikation, du behöver bara registrera middleware i
i `Middleware` i `app/http/kernel. o` fil.

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

### Tilldela Middleware för Routing

Du kan registrera middleware för vissa routing separat:

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("användare", userController.Show)
```

## Avbryt begäran

I mittprogram, om du behöver avbryta begäran, kan du använda `Abort`-metoden.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Hittades inte").Abort()
```
