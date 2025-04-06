# Маршрутизация

Модуль маршрутизации Goravel может работать с помощью `facades.Route()`.

## HTTP драйвер

Горавель использует в качестве стандартного HTTP драйвера [gin](https://github.com/gin-gonic/gin). To use other drivers, configure them in
the `config/http.go` file. Официальный по умолчанию поддерживает [gin](https://github.com/gin-gonic/gin)
и [fiber](https://github.com/gofiber/fiber).

| Водитель | Ссылка                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Gin      | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Волокно  | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Файл маршрутизации по умолчанию

Чтобы определить файлы маршрутизации, просто перейдите в каталог `/routes`. By default, the framework utilizes a sample route
located in `/routes/web.go`. Чтобы установить привязку маршрутизации, метод `func Web()` зарегистрирован в файле
`app/providers/route_service_provider.go`.

If you require more precise management, you can add routing files to the `/routes` directory and register them in the
`app/providers/route_service_provider.go` file.

## Запустить HTTP-сервер

Запустите HTTP-сервер в `main.go` в корневом каталоге, вызвав `facades.Route().Run()`. Автоматически
получит конфигурацию `route.host`.

```go
пакет main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // This bootstraps the framework and make it ready for use.
  загрузка. oot()

  // Запуск http сервера с помощью facades.Route().
  go func() {
    if err := facades. oute().Run(); err != nil {
      фасадов. og().Ошибка("Ошибка запуска маршрута: %v", ошибка)
    }
  }()

  выберите {}
}
```

## Запустить HTTPS сервер

Пожалуйста, завершите конфигурацию `http.tls` в `config/http.go` перед использованием HTTPS, метод `facades.Route().RunTLS()`
запустит HTTPS сервер согласно соответствующей конфигурации:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Ошибка запуска маршрута: %v", ошибка)
}
```

Вы также можете использовать метод `facades.Route().RunTLSWithCert()` для настройки хоста и сертификата.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Ошибка запуска маршрута: %v", err)
}
```

## Закрыть HTTP/HTTPS сервер

Вы можете изящно закрыть HTTP/HTTPS сервер, позвонив в метод `Shutdown`, который будет ждать обработки всех запросов
перед закрытием.

```go
// main.go
bootstrap.Boot()

// Создание канала для прослушивания сигналов ОС
quit := make(chan os.Signal)
signal.Notify(quit, syscall). IGINT, syscall.SIGTERM)

// Запуск http сервера по facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Ошибка запуска маршрута: %v", err)
  }
}()

// Слушаем сигнал OS
go func() {
  <-quit
  if err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Ошибка остановки маршрута: %v", ошибка)
  }

  os.Exit(0)
}()

выберите {}
```

### Методы маршрутизации

| Методы     | Действие                                       |
| ---------- | ---------------------------------------------- |
| Группа     | [Маршрутизация группы](#group-routing)         |
| Префикс    | [Префикс маршрута](#routing-prefix)            |
| ServeHTTP  | [Маршрутизация тестирования](#testing-routing) |
| Приобрести | [Базовая маршрутизация](#basic-routing)        |
| Пост       | [Базовая маршрутизация](#basic-routing)        |
| Положить   | [Базовая маршрутизация](#basic-routing)        |
| Удалить    | [Базовая маршрутизация](#basic-routing)        |
| Патч       | [Базовая маршрутизация](#basic-routing)        |
| Варианты   | [Базовая маршрутизация](#basic-routing)        |
| Любая      | [Базовая маршрутизация](#basic-routing)        |
| Ресурс     | [Маршрутизация ресурсов](#resource-routing)    |
| Статичный  | [Маршрутизация файлов](#file-routing)          |
| StaticFile | [Маршрутизация файлов](#file-routing)          |
| StaticFS   | [Маршрутизация файлов](#file-routing)          |
| Среднее    | [Middleware](#middleware)                      |

## Базовая маршрутизация

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Привет": "Горавел",
  })
})
фасадовes.Route().Post("/", userController.Show)
фасады. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Маршрутизация ресурсов

```go
импортируйте "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// УДАЛИТЬ /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Маршрутизация групп

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Префикс маршрутизации

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## Маршрутизация файлов

```go
Импорт "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Параметры маршрутизации

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detail [Request](./requests)

## Среднее

```go
импорт "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("пользователи", userController.Show)
```

Detail [Middleware](./middlewares)

## Резервные маршруты

Используя метод `Fallback`, вы можете определить маршрут, который будет выполняться, если ни один другой маршрут не соответствует входящему
запросу.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "не найден")
})
```

## Ограничение тарифа

### Определение лимитов

Goravel includes powerful and customizable rate-limiting services that you may utilize to restrict the amount of traffic
for a given route or group of routes. Чтобы начать, вы должны определить частоту ограниченных конфигураций, удовлетворяющих потребностям вашего приложения
. Typically, this should be done within the `configureRateLimiting` method of your application's
`app/providers/route_service_provider.go` class.

Ограничения скорости определяются методом `facades.RateLimiter()`. Метод `For` принимает ограниченное имя
и замыкание, которое возвращает ограниченную конфигурацию, которая должна применяться к маршрутам, назначенным для ограничения лимита.
Имя лимита может быть любой строкой, которую вы хотите:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("глобальный", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

If the incoming request exceeds the specified rate limit, a response with a 429 HTTP status code will automatically be
returned by Goravel. Если вы хотите определить свой собственный ответ, который должен быть возвращен в результате ограничения скорости, вы можете использовать
метод ответа:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Поскольку ограничитель обратных вызовов получает экземпляр входящего HTTP-запроса, вы можете установить соответствующий лимит частоты
динамически на основе входящего запроса или аутентифицированного пользователя:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Предположим
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Пределы скорости сегмента

Иногда вы можете захотеть использовать ограничения скорости по некоторому произвольному значению. For example, you may wish to allow users to
access a given route 100 times per minute per IP address. Чтобы выполнить это, вы можете использовать метод `By` при построении
лимит скорости:

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

#### Множественные ограничения

При необходимости вы можете вернуть массив лимитов для данной конфигурации ограничения скорости. Each rate limit will be
evaluated for the route based on the order they are placed within the array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Прикрепляющие ограничения в маршруты

Ограничители тарифов могут быть привязаны к маршрутам или группам маршрутов с помощью средней системы дросселя. The throttle middleware accepts
the name of the rate limiter you wish to assign to the route:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Совместное использование ресурсов из разных источников (CORS)

В Горавеле по умолчанию включен CORS, конфигурация может быть изменена в `config/cors.go`.

> Для получения дополнительной информации о CORS и CORS заголовках обратитесь к
> веб-документации MDN в CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
