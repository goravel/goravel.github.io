# 라우팅

Goravel 라우팅 모듈은 `facades.Route()`를 통해 작동할 수 있습니다.

## HTTP 드라이버

Goravel은 기본 HTTP 드라이버로 [gin](https://github.com/gin-gonic/gin)을 사용합니다. 다른 드라이버를 사용하려면 `config/http.go` 파일에서 구성하세요. 공식적으로 기본 지원되는 드라이버는 [gin](https://github.com/gin-gonic/gin)과 [fiber](https://github.com/gofiber/fiber)입니다.

| Driver | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Gin    | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fiber  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## 기본 라우팅 파일

라우팅 파일을 정의하려면 `/routes` 디렉토리로 이동하기만 하면 됩니다. 기본적으로 프레임워크는 `/routes/web.go`에 위치한 샘플 라우트를 사용합니다. 라우팅 바인딩을 설정하기 위해 `func Web()` 메서드가 `app/providers/route_service_provider.go` 파일에 등록됩니다.

더 정확한 관리가 필요한 경우, `/routes` 디렉토리에 라우팅 파일을 추가하고 `app/providers/route_service_provider.go` 파일에 등록할 수 있습니다.

## HTTP 서버 시작하기

루트 디렉토리의 `main.go`에서 `facades.Route().Run()`을 호출하여 HTTP 서버를 시작합니다. 이렇게 하면 자동으로 `route.host` 구성을 가져옵니다.

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // 이것은 프레임워크를 부트스트랩하고 사용할 준비를 합니다.
  bootstrap.Boot()

  // facades.Route()로 http 서버를 시작합니다.
  go func() {
    if err := facades.Route().Run(); err != nil {
      facades.Log().Errorf("Route run error: %v", err)
    }
  }()

  select {}
}
```

## HTTPS 서버 시작

HTTPS를 사용하기 전에 `config/http.go`에서 `http.tls` 구성을 완료해 주세요. `facades.Route().RunTLS()` 메서드는 관련 구성에 따라 HTTPS 서버를 시작합니다:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

`facades.Route().RunTLSWithCert()` 메서드를 사용하여 호스트와 인증서를 사용자 정의할 수도 있습니다.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## HTTP/HTTPS 서버 종료

HTTP/HTTPS 서버를 `Shutdown` 메서드를 호출하여 정상적으로 종료할 수 있습니다. 이 메서드는 종료하기 전에 모든 요청이 처리될 때까지 기다립니다.

```go
// main.go
bootstrap.Boot()

// OS 신호를 수신하기 위한 채널 생성
quit := make(chan os.Signal)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// facades.Route()로 http 서버 시작
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log().Errorf("Route run error: %v", err)
  }
}()

// OS 신호 수신 대기
go func() {
  <-quit
  if err := facades.Route().Shutdown(); err != nil {
    facades.Log().Errorf("Route shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### 라우팅 메소드

| 메소드        | Action                       |
| ---------- | ---------------------------- |
| 그룹         | [그룹 라우팅](#group-routing)     |
| 접두사        | [라우팅 접두사](#routing-prefix)   |
| ServeHTTP  | [라우팅 테스트](#testing-routing)  |
| 가져오기       | [기본 라우팅](#basic-routing)     |
| 게시         | [기본 라우팅](#basic-routing)     |
| 넣기         | [기본 라우팅](#basic-routing)     |
| 삭제         | [기본 라우팅](#basic-routing)     |
| 패치         | [기본 라우팅](#basic-routing)     |
| Options    | [기본 라우팅](#basic-routing)     |
| 모두         | [기본 라우팅](#basic-routing)     |
| 리소스        | [리소스 라우팅](#resource-routing) |
| 정적         | [파일 라우팅](#file-routing)      |
| 정적 파일      | [파일 라우팅](#file-routing)      |
| 정적 파일 시스템  | [파일 라우팅](#file-routing)      |
| Middleware | [미들웨어](#middleware)          |

## 기본 라우팅

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

## 리소스 라우팅

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

## 그룹 라우팅

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## 라우팅 접두사

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## 파일 라우팅

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Routing Parameters

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detail [Request](./requests)

## Middleware

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detail [Middleware](./middlewares)

## Fallback Routes

Using the `Fallback` method, you may define a route that will be executed when no other route matches the incoming
request.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## Rate Limiting

### Defining Rate Limiters

Goravel includes powerful and customizable rate-limiting services that you may utilize to restrict the amount of traffic
for a given route or group of routes. To get started, you should define rate limiter configurations that meet your
application's needs. Typically, this should be done within the `configureRateLimiting` method of your application's
`app/providers/route_service_provider.go` class.

Rate limiters are defined using the `facades.RateLimiter()`'s `For` method. The `For` method accepts a rate limiter name
and a closure that returns the limit configuration that should apply to routes that are assigned to the rate limiter.
The rate limiter name may be any string you wish:

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
returned by Goravel. If you would like to define your own response that should be returned by a rate limit, you may use
the response method:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Since rate limiter callbacks receive the incoming HTTP request instance, you may build the appropriate rate limit
dynamically based on the incoming request or authenticated user:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Suppose
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Segmenting Rate Limits

Sometimes you may wish to segment rate limits by some arbitrary value. For example, you may wish to allow users to
access a given route 100 times per minute per IP address. To accomplish this, you may use the `By` method when building
your rate limit:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

To illustrate this feature using another example, we can limit access to the route to 100 times per minute per
authenticated user ID or 10 times per minute per IP address for guests:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Multiple Rate Limits

If needed, you may return an array of rate limits for a given rate limiter configuration. Each rate limit will be
evaluated for the route based on the order they are placed within the array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Attaching Rate Limiters To Routes

Rate limiters may be attached to routes or route groups using the throttle middleware. The throttle middleware accepts
the name of the rate limiter you wish to assign to the route:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Cross-Origin Resource Sharing (CORS)

Goravel has CORS enabled by default, the configuration can be modified in `config/cors.go`.

> For more information on CORS and CORS headers, please consult
> the [MDN web documentation on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
