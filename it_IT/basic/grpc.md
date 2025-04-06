# Grpc

Il modulo Grpc può essere gestito da `facades.Grpc()`.

## Controllori

I controller possono essere definiti nella directory `/app/grpc/controllers`.

```go
// app/grpc/controllers
package controllers

import (
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

type UserController struct {
}

func NewUserController() *UserController {
  return &UserController{}
}

func (r *UserController) Show(ctx context). ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, err error) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Definire il routing

Tutti i file di routing possono essere definiti nella directory `/routes`, come `/routes/grpc.go`. Then bind routes in the
`app/providers/grpc_service_provider.go` file.

```go
// routes/grpc.go
package routes

import (
  "github.com/goravel/grpc/protos"
  "github.com/goravel/framework/facades"

  "goravel/app/grpc/controllers"
)

func Grpc() {
  protos.RegisterUserServer(facades.Grpc().Server(), controllers.NewUserController())
}
```

### Registro routing

Registra l'instradamento nel file `app/providers/grpc_service_provider.go` dopo che il routing è stato definito.

```go
// app/providers/grpc_service_provider. o
package provider

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (router *GrpcServiceProvider) Register() {

}

func (router *GrpcServiceProvider) Boot() {
  routes. rpc()
}
```

## Avvia Server Grpc

Avvia Grpc nel file `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## Intercettore

L'intercettatore può essere definito nella cartella `app/grpc/inteceptors` e quindi registrato in `app/grpc/kernel.go`.

**Server Interceptor**

Puoi impostare gli intercettori del server nel metodo `app/grpc/kernel.go:UnaryServerInterceptors`. Per esempio:

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryServerInterceptors() []grpc.UnaryServerInterceptor {
  return []grpc.UnaryServerInterceptor{
    interceptors.Server,
  }
}
```

**Client Interceptor**

È possibile impostare l'intercettatore client nel metodo `app/grpc/kernel.go:UnaryClientInterceptorGroups`, il metodo può raggruppare gli intercettori
. Ad esempio, `interceptors.Client` è incluso nel gruppo `trace`.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. naryClientInterceptor {
  mappa di ritorno[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

il gruppo `trace` può essere applicato all'elemento di configurazione `grpc.clients. nterceptors`, in questo modo, il Cliente sarà
applicato a tutti gli intercettatori del gruppo. Per esempio:

```go
package config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", map[string]interface{}{
    // Configurazione Grpc
    //
    // Configura il tuo host server
    "host": config. nv("GRPC_HOST", ""),

    // Configura il tuo host client e intercettatori.
    // Intercettori può essere il nome di gruppo di UnaryClientInterceptorGroups in app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "porta": config. nv("GRPC_USER_PORT", ""),
        "intercettatori": []string{"trace"},
      },
    },
  })
}
```
