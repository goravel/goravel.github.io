# Gráfico

Módulo Grpc pode ser operado por `facades.Grpc()`.

## Controles

Controles podem ser definidos no diretório `/app/grpc/controllers`.

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

func NewUserController() *UserController{
  return &UserController{}
}

func (r *UserController) Show(ctx context. ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, err error) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Definir roteamento

Todos os arquivos de roteamento podem ser definidos no diretório `/routes`, como `/routes/grpc.go`. Em seguida, vincule rotas no arquivo
`app/providers/grpc_service_provider.go`.

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

### Registrar roteamento

Registrar roteamento no arquivo `app/providers/grpc_service_provider.go` após o roteamento ser definido.

```go
// app/providers/grpc_service_provider. o
provedor de pacotes

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (roteador *GrpcServiceProvider) Register() {

}

func (roteador *GrpcServiceProvider) Boot() {
  rotas. rpc()
}
```

## Iniciar servidor Grpc

Inicie Grpc no arquivo `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Erro de execução Grpc: %v", err)
  }
}()
```

## Interceptor

O interceptor pode ser definido na pasta `app/grpc/inteceptors`, e então registrado em `app/grpc/kernel.go`.

**Interceptador de servidor**

Você pode definir os interceptores de servidor no método `app/grpc/kernel.go:UnaryServerInterceptors`. Por exemplo:

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

**Interceptor de cliente**

Você pode definir o interceptador do cliente no método `app/grpc/kernel.go:UnaryClientInterceptorGroups`, o método pode agrupar
interceptadores. Por exemplo, `interceptors.Client` está incluído sob o grupo `trace`.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryClientInterceptorGroups()[string][]grpc. naryClientInterceptor {
  mapa de retorno[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

o grupo `trace` pode ser aplicado ao item de configuração `grpc.clients. nterceptors`, desta forma, o cliente será
aplicado a todos os interceptores sob o grupo. Por exemplo:

```go
package config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config.Add("grpc", map[string]interface{}{
    // Grpc Configuration
    //
    // Configure your server host
    "host": config.Env("GRPC_HOST", ""),

    // Configure your client host and interceptors.
    // Interceptors can be the group name of UnaryClientInterceptorGroups in app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host":         config.Env("GRPC_USER_HOST", ""),
        "port":         config.Env("GRPC_USER_PORT", ""),
        "interceptors": []string{"trace"},
      },
    },
  })
}
```
