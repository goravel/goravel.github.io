# 格尔普克

Grpc 模块可以由“facades.Grpc()”操作。

## 控制器

控制器可以在 `/app/grpc/controllers` 目录中定义。

```go
// 应用/grpc/controllers
包控制器

导入(
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

类型 UserController struct v.
}

func NewUserController() *UserController
  return &UserController{}
}

func (r *UserController) Show(ctx contexer)。 ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, err error) 电子邮件：
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## 定义路由

所有路由文件都可以在 "/routes" 目录中定义，如"/routes/grpc.go"。 然后将路由绑定到
`app/providers/grpc_service_provider.go` 文件。

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

### 注册路由

定义路由后在 `app/providers/grpc_service_provider.go` 文件中注册路由。

```go
// app/providers/grpc_service_provider.go
package providers

import (
  "goravel/routes"
)

type GrpcServiceProvider struct {
}

func (router *GrpcServiceProvider) Register() {

}

func (router *GrpcServiceProvider) Boot() {
  routes.Grpc()
}
```

## 启动 Grpc 服务器

在 `main.go` 文件中启动 Grpc 。

```go
go func() v.
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil w
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## 拦截器

拦截器可以在 `app/grpc/intestors` 文件夹中定义，然后注册到 \`app/grpc/kernel.go'。

**服务器拦截器**

您可以在“app/grpc/kernel.go:UnaryServerInterceptors”方法中设置服务器拦截器。 例如：

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/拦截器"

  "google.golang.org/grpc"
)

func (kernel *Kernel) UnaryServerIntercetors() []grpc.UnaryServerInterceptor v.
  return []grpc.UnaryServerInterceptor{
    interceptors.Server,
  }
}
```

**客户端拦截器**

您可以在 `app/grpc/kernel.go:UnaryClientInterceptorGroups` 方法中设置客户端拦截器，该方法可以对拦截器进行分组。 例如，`拦截器.Client`包含在“追踪”组内。

```go
// app/grpc/kernel.go
import (
  "goravel/app/grpc/stamptors"

  "google.golang.org/grpc"


func (kernel *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. naryClientIntercestor v.
  return map[string][]grpc.UnaryClientInterceptorp
    "Trace": {
      interceptors.Client,
    },
  }
}
```

可以将 `trace` 组应用于配置项 `grpc.clients.interceptors`，这样，客户端将应用该组下的所有拦截器。 例如：

```go
package config

import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config.Add("grpc", map[string]interface{}{
    // Grpc 配置
    //
    // 配置您的服务器主机
    "host": config.Env("GRPC_HOST", ""),

    // 配置您的客户端主机和拦截器。
    // 拦截器可以是 app/grpc/kernel.go 中 UnaryClientInterceptorGroups 的组名。
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
