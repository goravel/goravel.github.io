# Grpc

Le module Grpc peut être géré par `facades.Grpc()`.

## Contrôleurs

Les contrôleurs peuvent être définis dans le répertoire `/app/grpc/controllers`.

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

func (r *UserController) Show(ctx contextuel. ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, error) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Définir le routage

Tous les fichiers de routage peuvent être définis dans le répertoire `/routes`, comme `/routes/grpc.go`. Ensuite liez les routes dans le fichier
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

### Enregistrer le routage

Enregistrez le routage dans le fichier `app/providers/grpc_service_provider.go` après que le routage ait été défini.

```go
// app/providers/grpc_service_provider. o
packages providers

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (routeur *GrpcServiceProvider) Register() {

}

func (routeur *GrpcServiceProvider) Boot() {
  routes. rpc()
}
```

## Démarrer le serveur Grpc

Démarrez Grpc dans le fichier `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## Intercepteur

L'intercepteur peut être défini dans le dossier `app/grpc/inteceptors`, puis enregistré dans `app/grpc/kernel.go`.

**Intercepteur de serveur**

Vous pouvez définir les intercepteurs de serveur dans la méthode `app/grpc/kernel.go:UnaryServerInterceptors`. Par exemple :

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

**Intercepteur du client**

Vous pouvez définir l'intercepteur client dans la méthode `app/grpc/kernel.go:UnaryClientInterceptorGroups`, la méthode peut regrouper les intercepteurs
. Par exemple, `interceptors.Client` est inclus dans le groupe `trace`.

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

le groupe `trace` peut être appliqué à l'élément de configuration `grpc.clients. nterceptors`, de cette façon, le client sera
appliqué à tous les intercepteurs du groupe. Par exemple :

```go
config du paquet

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", map[string]interface{}{
    // Grpc Configuration
    //
    // Configurer votre hôte serveur
    "host": config. nv("GRPC_HOST", ""),

    // Configurez votre hôte client et vos intercepteurs.
    // Les intercepteurs peuvent être le nom du groupe UnaryClientInterceptorGroups dans app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "intercepteurs": []string{"trace"},
      },
    },
  })
}
```
