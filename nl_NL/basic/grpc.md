# Grpc

Grpc module kan worden beheerd door `facades.Grpc()`.

## Regelsystemen

Controllers kunnen worden gedefinieerd in de `/app/grpc/controllers` map.

```go
// app/grpc/controllers
package controllers

import (
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

type UserController {
}

func NewUserController() *UserController {
  return &UserController{}
}

func (r *UserController) Show(ctx context. ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, err error) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Definieer routering

Alle routing bestanden kunnen worden gedefinieerd in de `/routes` map, zoals `/routes/grpc.go`. Koppel dan routes in de
`app/providers/grpc_service_provider.go` bestand.

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

### Registreer routering

Registreer routing in het `app/providers/grpc_service_provider.go` bestand nadat routing is gedefinieerd.

```go
// app/providers/grpc_service_provider. o
package providers

import (
  "goravel/routes"
)

type GrpcServiceProvider bouwt {
}

func (router *GrpcServiceProvider) Register() {

}

func (router *GrpcServiceProvider) Boot() {
  routes. rpc()
}
```

## Start Grpc server

Start Grpc in het `main.go` bestand.

```go
ga func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## Interceptor

De interceptor kan worden gedefinieerd in de `app/grpc/inteceptors` map, en vervolgens geregistreerd worden in `app/grpc/kernel.go`.

**Server Interceptor**

Je kunt de server interceptors instellen in de `app/grpc/kernel.go:UnaryServerInterceptors` methode. Bijvoorbeeld:

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

Je kunt de client interceptor instellen met de `app/grpc/kernel.go:UnaryClientInterceptorGroups` methode, de methode kan
interceptors groeperen. Bijvoorbeeld 'interceptors.Client' is opgenomen in de 'traceer' groep.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryClientInterceptorGroups() kaart[string][]grpc. naryClientInterceptor {
  geeft kaart[string][]grpc.UnaryClientInterceptor{
    "traceer": {
      interceptors.Client,
    },
  }
}
```

de `traceer` groep kan worden toegepast op het configuratie item `grpc.clients. nterceptors`, op deze manier, zal de client
worden toegepast op alle interceptors onder de groep. Bijvoorbeeld:

```go
package config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", kaart[string]interface{}{
    // Grpc Configuration
    //
    // Configureer je server host
    "host": config. nv("GRPC_HOST", ""),

    // Configureer uw clienthost en onderscheppers.
    // Interceptors kan de groepsnaam van UnaryClientInterceptorGroups zijn in app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "interceptors": []string{"traceer"},
      },
    },
  })
}
```
