# Среднее

Middleware предоставляет удобный механизм проверки и фильтрации HTTP-запросов, входящих в ваше приложение.

## Определить среднюю программу

Вы можете создать своё собственное middleware в каталоге `app/http/middleware`, структура следует.

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

### Создать программу по команде

```
go run . artisan make:middleware Auth

// Support nested folders
go run . artisan make:middleware user/Auth
```

## Регистрация Middleware

### Глобальное приложение

Если вы хотите применить middleware для каждого HTTP запроса вашего приложения, вам нужно только зарегистрировать middleware в
`Middleware` в `app/http/kernel. o` файл.

```go
// import app/http/kernel.go
package http

(
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Назначить Middleware для маршрутизации

Вы можете зарегистрировать middleware для некоторых маршрутизаторов отдельно:

```go
импорт "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Прервать запрос

Если вам нужно прерывать запрос, вы можете использовать метод «Аборт».

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Не найден").Abort()
```
