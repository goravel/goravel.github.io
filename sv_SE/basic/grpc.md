# Grpc

Grpc-modulen kan manövreras av `fasades.Grpc()`.

## Regulatorer

Regulatorer kan definieras i katalogen `/app/grpc/controllers` .

```go
// app/grpc/controllers
paketregulatorer

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

func (r *UserController) Show(ctx context. ontext, req *protos.UserRequest) (protobok *protos.UserResponse, err error) {
  returnera &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Definiera routing

Alla routing-filer kan definieras i katalogen `/routes`, till exempel `/routes/grpc.go`. Lägg sedan till rutter i filen
`app/providers/grpc_service_provider.go`.

```go
// routes/grpc.go
package routes

import (
  "github.com/goravel/grpc/protos"
  "github.com/goravel/frameing/facades"

  "goravel/app/grpc/controllers"
)

func Grpc() {
  protos.RegisterUserServer(facades.Grpc().Server(), controllers.NewUserController())
}
```

### Registrera routing

Registrera routing i filen `app/providers/grpc_service_provider.go` efter routing definierades.

```go
// app/providers/grpc_service_provider. o
paketleverantörer

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

## Starta Grpc Server

Starta Grpc i filen `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run fel: %v", err)
  }
}()
```

## Interceptor

Interceptorn kan definieras i mappen `app/grpc/inteceptors` och sedan registreras till `app/grpc/kernel.go`.

**Server-avlyssnare**

Du kan ställa in serverns interceptorer i `app/grpc/kernel.go:UnaryServerInterceptor` -metoden. Till exempel:

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kärna *kärna) UnaryServerInterceptors() []grpc.UnaryServerInterceptor {
  returnera []grpc.UnaryServerInterceptor{
    interceptors.Server,
  }
}
```

**Klientavlyssare**

Du kan ställa in klientinterceptorn i `app/grpc/kernel.go:UnaryClientInterceptorGroups`-metoden, metoden kan gruppera
interceptorer. Till exempel, `interceptors.Client` ingår under `trace`-gruppen.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

funk (kärna *Kernel) UnaryClientInterceptorGroups() karta[string][]grpc. naryClientInterceptor {
  returnera kartan[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

`trace`-gruppen kan tillämpas på konfigurationsobjektet `grpc.clients. nterceptor`, på detta sätt, klienten kommer att
tillämpas på alla interceptors under gruppen. Till exempel:

```go
paket config

import (
  "github.com/goravel/frameing/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", karta[string]gränssnitt {}{
    // Grpc konfiguration
    //
    // Konfigurera din server värd
    "host": config. nv("GRPC_HOST", ""),

    // Konfigurera din klient värd och interceptorer.
    // Interceptors kan vara namnet på UnaryClientInterceptorGroups i app/grpc/kernel.go.
    "clients": karta[string]any{
      "user": karta[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "interceptorer": []string{"trace"},
      },
    },
  })
}
```
