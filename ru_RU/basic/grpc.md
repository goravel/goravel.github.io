# Грпк

Модуль Grpc может управляться `facades.Grpc()`.

## Контроллеры

Контроллеры могут быть определены в папке `/app/grpc/controllers`.

```go
// ap/grpc/controllers
package controllers

import (
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

тип UserController struct {
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

## Определить маршрутизацию

Все файлы маршрутизации могут быть определены в папке `/routes`, например `/routes/grpc.go`. Then bind routes in the
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

### Регистрация маршрутизации

Регистрация маршрутизации в файле `app/providers/grpc_service_provider.go` после определения маршрутизации.

```go
// app/providers/grpc_service_provider. o
package providers

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

## Запустить Grpc Server

Запустите Grpc в файле `main.go`.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Ошибка запуска Grpc": %v", err)
  }
}()
```

## Перехватчик

Перехватчик может быть определен в папке `app/grpc/inteceptors`, а затем зарегистрирован в папке `app/grpc/kernel.go`.

**Перехватчик сервера**

Вы можете задать перехватчики сервера методом `app/grpc/kernel.go:UnaryServerInterceptors`. Например:

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

**Перехватчик клиентов**

Вы можете установить клиентский перехватчик в методе `app/grpc/kernel.go:UnaryClientInterceptorGroups`, метод может группировать
перехватчиков. Например, `interceptors.Client` входит в группу `trace`.

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (ядро *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. naryClientInterceptor {
  возвращение карты[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

`trace` группа может быть применена к конфигурационному элементу `grpc.clients. nterceptors`, таким образом, клиент будет
применяться ко всем перехватчикам в группе. Например:

```go
package config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", map[string]interface{}{
    // Конфигурация Grpc
    //
    // Настройка хоста сервера
    "host": config. nv("GRPC_HOST", ""),

    // Настройка вашего клиентского хоста и перехватчиков.
    // Перехватчики могут быть именем группы UnaryClientInterceptorGroups в app/grpc/kernel.go.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "interceptors": []string{"trace"},
      },
    },
  })
}
```
