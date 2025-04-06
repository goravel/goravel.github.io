# Grpc

El módulo Grpc puede ser operado por `facades.Grpc()`.

## Controladores

Los controladores pueden definirse en el directorio `/app/grpc/controllers`.

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

func (r *UserController) Show(ctx context. ontext, req *protos)[video] serRequest) (protoBook *protosonancia serResponse, error error) {
  return &protos)[video] serResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Definir ruta

Todos los archivos de enrutamiento se pueden definir en el directorio `/routes`, como `/routes/grpc.go`. Luego enlaza las rutas en el archivo
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

### Registrar ruta

Registrar ruta en el archivo `app/providers/grpc_service_provider.go` después de que la ruta fue definida.

```go
// app/providers/grpc_service_provider. o
proveedores de paquetes

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (router *GrpcServiceProvider) Register() {

}

func (router *GrpcServiceProvider) Boot() {
  rutas. rpc()
}
```

## Iniciar servidor Grpc

Inicia Grpc en el archivo `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## Interceptor

El interceptor puede definirse en la carpeta `app/grpc/inteceptors` y luego registrarse en `app/grpc/kernel.go`.

**Interceptor del servidor**

Puede establecer los interceptores del servidor en el método `app/grpc/kernel.go:UnaryServerInterceptors`. Por ejemplo:

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

Puede establecer el interceptor del cliente en el método `app/grpc/kernel.go:UnaryClientInterceptorGroups`, el método puede agrupar interceptores
. Por ejemplo, `interceptors.Client` está incluido en el grupo `trace`.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. naryClientInterceptor {
  return map[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

el grupo `trace` se puede aplicar al elemento de configuración `grpc.clients. nterceptors`, de esta manera, el Cliente será
aplicado a todos los interceptores del grupo. Por ejemplo:

```go
config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", map[string]interface{}{
    // Configuración Grpc
    //
    // Configura tu servidor host
    "host": config. nv("GRPC_HOST", ""),

    // Configurar su host de cliente e interceptores.
    // Interceptores puede ser el nombre del grupo de UnaryClientInterceptorGroups en app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "puerto": configuración. nv("GRPC_USER_PORT", ""),
        "interceptors": []string{"trace"},
      },
    },
  })
}
```
