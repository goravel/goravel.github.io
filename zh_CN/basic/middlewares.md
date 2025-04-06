# 中间件

中间件提供了一个方便的机制，用于检查和过滤 HTTP 请求进入您的应用程序。

## 定义中间件

您可以在 "app/http/middleware" 目录中创建您自己的中间件。结构如下所示。

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

### 按命令创建中间件

```
开始运行。手工匠:make:midleware Auth

// 支持嵌套文件夹
运行。手工匠:make:midleware 用户/身份验证程序
```

## 注册中间件

### 全局中间件

If you want to apply middleware for every HTTP request of your application, you only need to register the middleware in
the `Middleware` in the `app/http/kernel.go` file.

```go
// app/http/kernel.go
package http

import (
  "github.com/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### 分配中间件进行路由

您可以分别注册某些路由的中间件：

```go
导入 "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## 中止请求

在中间，如果您需要中断请求，您可以使用 "中止" 方法。

```go
ctx.Request().Abort()
ctx.Request().Abort(httpStatusNotFound)
ctx.Response().String(http.StatusNotFound, "Not Found").Abort()
```
