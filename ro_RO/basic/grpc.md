# Grătar

Modulul Grpc poate fi operat de `facades.Grpc()`.

## Controlori

Controlorii pot fi definiţi în folderul `/app/grpc/controllers`.

```go
// app/grpc/controllers
pachete controllers

import (
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

type UserController a struct {
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

## Definește rutarea

Toate fișierele de rutare pot fi definite în directorul `/routes`, cum ar fi `/routes/grpc.go`. Apoi leagă rutele din fișierul
`app/providers/grpc_service_provider.go`.

```go
// rute/grpc.go
pachete de rute

import (
  "github.com/goravel/grpc/protos"
  "github.com/goravel/framework/framework/facades"

  "goravel/app/grpc/controllers"
)

func Grpc() {
  protos.RegisterUserServer(adefacs.Grpc().Server(), controllers.NewUserController())
}
```

### Înregistrează rutarea

Înregistrează rutarea în fișierul `app/providers/grpc_service_provider.go` după ce rutarea a fost definită.

```go
// app/providers/grpc_service_provider. o
furnizori de pachete

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (router *GrpcServiceProvider) Register() {

}

func (router *GrpcServiceProvider) Boot() {
  rutes. rpc()
}
```

## Pornește serverul Grpc

Porniți Grpc în fișierul `main.go`.

```go
mergi la func() {
  dacă err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Eroare de execuție Grpc: %v", er)
  }
}()
```

## Interceptor

Interceptorul poate fi definit în folderul `app/grpc/inteceptors` şi apoi înregistrat în `app/grpc/kernel.go`.

**Interceptor de Server**

Poți seta interceptorii serverului în metoda `app/grpc/kernel.go:UnaryServerInterceptors`. De exemplu:

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

**Interceptor Client**

Puteți seta interceptorul clientului în metoda `app/grpc/kernel.go:UnaryClientInterceptorGroups`, metoda poate grupa
interceptori. De exemplu, `interceptors.Client` este inclus în grupul `trace`.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryClientInterceptorGroups() harta[string][]grpc. naryClientInterceptor {
  return map[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

grupul `trace` poate fi aplicat la elementul de configurare \`grpc.clients. nterceptori", în acest fel, clientul va fi
aplicat tuturor interceptorilor din grup. De exemplu:

```go
pachet config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd ("grpc", harta[string]interface{}{
    // Grpc Configuration
    //
    // Configurare server gazdă
    "host": config. nv("GRPC_HOST", ""),

    // Configurați gazda și interceptorii dvs. de client.
    // Interceptorii pot fi numele grupului UnaryClientInterceptorGroups în app/grpc/kernel.go.
    "clienţi": harta[string]any{
      "user": harta[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "interceptori": []string{"trace"},
      },
    },
  })
}
```
