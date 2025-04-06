# 路由

Goravel路由模块可以通过 `facades.Route()`来操作。

## HTTP 驱动程序

Goravel 使用 [gin](https://github.com/gin-gonic/gin作为默认的 HTTP 驱动程序。 若要使用其他驱动程序，请在
的 `config/http.go` 文件中配置它们。 官方默认支持 [gin](https://github.com/gin-gonic/gin)
和 [fiber](https://github.com/gofiber/fiber)。

| 驱动程序 | 链接                                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- |
| Gin  | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| 纤维化  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## 默认路由文件

要定义路由文件，只需导航到 `/routes` 目录。 默认情况下，框架使用位于`/routes/web.go`中的示例路
。 要建立路由绑定，`func Web()`方法注册在
`app/providers/Rute_service_provider.go` 文件中。

如果你需要更精确的管理，你可以将路由文件添加到 "/routes" 目录并注册到
"app/providers/route_service_provider.go" 文件。

## 启动 HTTP 服务器

以 `facades.Route().Run()`启动根目录`main.go`中的 HTTP 服务器。 This will automatically
fetch the `route.host` configuration.

```go
软件包

正在导入(
  "github. om/goravel/framework/facades”

  "goravel/bootstrap"
)

func main() 请您注意，
  // 此引导框架并准备使用。
  引导。 oot()

  // 以 facades.Route() 启动http 服务器
  go func() por
    if err := facades. Oute().Run(); err != nil power
      facades. og().Errorf("路由运行错误： %v", err)
    }
  }()

  选择 {}
}
```

## 启动 HTTPS 服务器

请先完成`config/http.go`中的`http.tls`的配置，然后使用 HTTPS，`facades.Route().RunTLS()`
方法将根据相关配置启动HTTPS 服务器：

```go
// main.go
if err := facades.Route().RunTLS(); err != nil 然后再见
  facades.Log().Errorf("Route run error: %v", err)
}
```

您也可以使用 `facades.Route().RunTLSWORT()` 方法自定义主机和证书。

```go
// main.go
if err := facades.Route().RunTLSWORCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil w
  facades.Log().Errorf("Route 运行错误: %v", err)
}
```

## 关闭 HTTP/HTTPS 服务器

您可以通过调用 `Shutdown` 方法来愉快地关闭HTTP/HTTPS 服务器，该方法将等待所有请求被
处理后关闭。

```go
// main.go
bootstrap.Boot()

// Create a channel to listen for OS signals
quit := make(chan os.Signal)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// Start http server by facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log().Errorf("Route run error: %v", err)
  }
}()

// Listen for the OS signal
go func() {
  <-quit
  if err := facades.Route().Shutdown(); err != nil {
    facades.Log().Errorf("Route shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### 路由方法

| 方法                                                    | 行 动                                   |
| ----------------------------------------------------- | ------------------------------------- |
| 组别                                                    | [Group Routing](#group-routing)       |
| 前缀                                                    | [路由前缀](#routing-prefix)               |
| ServeHTTP                                             | [测试路由](#testing-routing)              |
| 获取                                                    | [Basic Routing](#basic-routing)       |
| 帖子                                                    | [Basic Routing](#basic-routing)       |
| 放入... | [Basic Routing](#basic-routing)       |
| 删除                                                    | [Basic Routing](#basic-routing)       |
| 补丁                                                    | [Basic Routing](#basic-routing)       |
| 备选方案                                                  | [Basic Routing](#basic-routing)       |
| 任何                                                    | [Basic Routing](#basic-routing)       |
| 资源                                                    | [Resource Routing](#resource-routing) |
| 静态的                                                   | [File Routing](#file-routing)         |
| StaticFile                                            | [File Routing](#file-routing)         |
| StaticFS                                              | [File Routing](#file-routing)         |
| 中间件                                                   | [Middleware](#middleware)             |

## 基本路由

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http.Json{
    "Hello": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
facades.Route().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## 资源路由

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route().Resource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http.Context) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http.Context) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http.Context) {}
// DELETE /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## 组路由

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## 路由前缀

```go
Route().Prefix("users").Get("/", userController.Show)
```

## 文件路由

```go
导入 "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## 路由参数

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

详情 [Request](./requests)

## 中间件

```go
导入 "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors().Get("users", userController.Show)
```

详情 [Middleware](./middlewares)

## 备用路由

使用 `Fallback` 方法，您可以定义当没有其他路由匹配传入的
请求时将执行的路由。

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## 评分限制

### 定义速率限制

Goravel包含强大和可定制的限制费率服务，您可以使用这些服务来限制指定路线或组路由的
的交通量。 要开始, 您应该定义符合您的
应用程序需要的比率限制器配置。 通常，这应该在你的应用程序的
的 `app/providers/route_service_provider.go` 类的 `configureRateLimiting` 方法内进行。

比率限制器使用`facades.RateLimiter()`的`For`方法来定义。 "For" 方法接受一个比率限制器名称
和一个关闭，返回应该适用于分配给比率限制器的路由的限制配置。
比率限制器名称可能是您想要的字符串：

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

If the incoming request exceeds the specified rate limit, a response with a 429 HTTP status code will automatically be
returned by Goravel. 如果你想要定义你自己的响应，应该以一个比率限制返回，你可以使用
的响应方式：

```go
Facades.RateLimiter().For("global", func(ctx http.Contextt) http.Limit ow.
  return limit.PerMinute(1000).Response(funfunc(ctx http.Contextt) own
    ctx.Request().AbortWithStatus(httpStatusTooManyRequests)
  })
})
```

因为Rate limiter callback收到传入的 HTTP 请求实例 您可以根据传入请求或认证用户动态构建适当的速率限制
：

```go
RateLimiter().For("global", func(ctx contracttshttp.Context) contractshttp.Limit Power
  // Suppose
  if is_vip() v.
    return limit.PerMinute(100)
  }

  return nil
})
```

#### 分区率限制

有时您可能希望将比率限制分割成任意的数值。 例如，您可能希望允许用户访问
给定的路由每分钟的 IP 地址100次。 为了实现这一点，您可以使用 'By' 方法来构建您的速度限制：

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

使用另一个例子来说明这个功能 我们可以限制每个
认证用户ID每分钟100次，或每个IP地址每分钟10次的访客：

```go
Facades.RateLimiter().For("global", func(ctx contracttshttp.Context) contractshttp.Limit volume
  if userID != 0 vow
    return limit.PerMinute(100).By(userID)


  return limit.PerMinute(10).By(ctx.t()Ip())
})
```

#### 多速率限制

如果需要，您可以返回给定比率限制配置的数组费率限制。 Each rate limit will be
evaluated for the route based on the order they are placed within the array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### 附加速率限制到路由

频率限制器可以附加到使用温度中间件的路线或路线组。 温度中间件接受了
您想要分配给路由的速率限制器名称：

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## 跨源资源共享 (CORS)

Goravel默认启用了 CORS ，配置可以在 `config/cors.go` 中修改。

> 关于CORS 和 CORS 标题的更多信息，请访问
> [[MDN 网络文档在 CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers)。
