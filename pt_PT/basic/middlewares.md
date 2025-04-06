# Mediador

Middleware fornece um mecanismo conveniente para inspecionar e filtrar solicitações HTTP que entram em sua aplicação.

## Definir Middleware

Você pode criar seu próprio middleware no diretório `app/http/middleware`, a estrutura é a seguinte.

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

### Criar Mediador Com Comando

```
vá rodar . artisan make:middleware Auth

// Suporte a pastas aninhadas
vá rodar . artisan make:middleware user/Auth
```

## Registrar Middleware

### Middleware Global

Se você deseja aplicar o middleware para cada requisição HTTP da sua aplicação, você só precisa registrar o middleware em
o `Middleware` no `app/http/kernel. o` arquivo.

```go
// app/http/kernel.go
package http

import (
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

função(kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Atribuir Middleware para roteamento

Você pode registrar o middleware para alguns roteamentos separadamente:

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Abortar Solicitação

No meio, se você precisar interromper o pedido, você pode usar o método `Abort`.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Não encontrado").Abort()
```
