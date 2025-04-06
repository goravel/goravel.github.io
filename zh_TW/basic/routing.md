# 路由

Goravel 路由模組可以通過 `facades.Route()` 操作。

## HTTP 驅動

Goravel 使用 [gin](https://github.com/gin-gonic/gin) 作為其預設 HTTP 驅動。 要使用其他驅動，請在 `config/http.go` 檔案中進行配置。 官方預設支援 [gin](https://github.com/gin-gonic/gin) 和 [fiber](https://github.com/gofiber/fiber)。

| Driver | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Gin    | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fiber  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## 預設路由檔案

要定義路由檔案，只需導航至 `/routes` 目錄。 預設情況下，框架使用位於 `/routes/web.go` 的範例路由。 要建立路由綁定，`func Web()` 方法會在 `app/providers/route_service_provider.go` 檔案中註冊。

如果您需要更精確的管理，可以將路由檔案添加到 `/routes` 目錄，並在 `app/providers/route_service_provider.go` 檔案中註冊它們。

## 啟動 HTTP 伺服器

在根目錄的 `main.go` 中通過呼叫 `facades.Route().Run()` 啟動 HTTP 伺服器。 這將自動獲取 `route.host` 配置。

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // 這會引導框架並使其準備好使用。
  bootstrap.Boot()

  // 通過 facades.Route() 啟動 http 伺服器。
  go func() {
    if err := facades.Route().Run(); err != nil {
      facades.Log().Errorf("Route run error: %v", err)
    }
  }()

  select {}
}
```

## 啟動 HTTPS 伺服器

在使用 HTTPS 之前，請先完成 `config/http.go` 中 `http.tls` 的配置，`facades.Route().RunTLS()` 方法將根據相關配置啟動 HTTPS 伺服器：

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

您也可以使用 `facades.Route().RunTLSWithCert()` 方法來自定義主機和憑證。

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## 關閉 HTTP/HTTPS 伺服器

您可以通過調用 `Shutdown` 方法來優雅地關閉 HTTP/HTTPS 伺服器，該方法將等待所有請求處理完成後再關閉。

```go
// main.go
bootstrap.Boot()

// 創建一個通道來監聽操作系統信號
quit := make(chan os.Signal)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// 通過 facades.Route() 啟動 http 伺服器
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log().Errorf("Route run error: %v", err)
  }
}()

// 監聽操作系統信號
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

| 方法         | Action                    |
| ---------- | ------------------------- |
| 群組         | [群組路由](#group-routing)    |
| 前綴         | [路由前綴](#routing-prefix)   |
| ServeHTTP  | [測試路由](#testing-routing)  |
| 獲取         | [基本路由](#basic-routing)    |
| 發布         | [基本路由](#basic-routing)    |
| 更新         | [基本路由](#basic-routing)    |
| 刪除         | [基本路由](#basic-routing)    |
| 修補         | [基本路由](#basic-routing)    |
| Options    | [基本路由](#basic-routing)    |
| 任何         | [基本路由](#basic-routing)    |
| 資源         | [資源路由](#resource-routing) |
| 靜態         | [檔案路由](#file-routing)     |
| StaticFile | [檔案路由](#file-routing)     |
| StaticFS   | [檔案路由](#file-routing)     |
| Middleware | [中介軟體](#middleware)       |

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

## 資源路由

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

## 群組路由

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## 路由前綴

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## 檔案路由

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## 路由參數

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

詳情 [請求](./requests)

## Middleware

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

詳情 [中間件](./middlewares)

## 後備路由

使用 `Fallback` 方法，您可以定義一個路由，當沒有其他路由匹配傳入的請求時將執行該路由。

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "找不到")
})
```

## 速率限制

### 定義速率限制器

Goravel 包含強大且可自定義的速率限制服務，您可以使用它來限制給定路由或路由組的流量。 要開始使用，您應該定義符合應用程式需求的速率限制器配置。 通常，這應該在應用程式的 `app/providers/route_service_provider.go` 類的 `configureRateLimiting` 方法中完成。

速率限制器使用 `facades.RateLimiter()` 的 `For` 方法定義。 `For` 方法接受一個速率限制器名稱和一個閉包，該閉包返回應用於分配給該速率限制器的路由的限制配置。
速率限制器名稱可以是您希望的任何字符串：

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

如果傳入請求超過指定的速率限制，Goravel 將自動返回一個帶有 429 HTTP 狀態碼的響應。 如果您想定義速率限制應返回的自定義響應，可以使用 response 方法：

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

由於速率限制器回調會接收傳入的 HTTP 請求實例，您可以根據傳入的請求或已認證的用戶動態構建適當的速率限制：

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // 假設
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### 分段速率限制

有時您可能希望按某些任意值對速率限制進行分段。 例如，您可能希望允許用戶每分鐘按 IP 地址訪問給定路由 100 次。 要實現這一點，您可以在構建速率限制時使用 `By` 方法：

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

為了使用另一個例子來說明此功能，我們可以限制路由的訪問次數為每分鐘每個已認證用戶ID 100次，或者對於訪客每分鐘每個IP地址10次：

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### 多重速率限制

如有需要，您可以為給定的速率限制器配置返回一個速率限制數組。 每個速率限制將根據它們在數組中的放置順序對路由進行評估：

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### 將速率限制器附加到路由

速率限制器可以使用throttle中間件附加到路由或路由組。 節流中間件接受
您希望分配給路由的速率限制器的名稱：

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## 跨來源資源共享 (CORS)

Goravel 預設已啟用 CORS，可以在 `config/cors.go` 中修改配置。

> 有關 CORS 和 CORS 標頭的更多信息，請參閱
> [MDN 網頁文檔中關於 CORS 的部分](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers)。
