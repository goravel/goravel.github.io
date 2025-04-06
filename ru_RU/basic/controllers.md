# Контроллеры

Вместо определения логики обработки запросов в виде закрытия в отдельном маршруте, контроллер может быть использован
для интеграции. Контроллеры хранятся в папке `app/http/controllers`.

## Определить контроллеры

Ниже приведен пример базового контроллера:

```go
пакетные контроллеры

импорт (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
)

type UserController struct {
  // Зависимые службы
}

func NewUserController() *UserController {
  return &UserController{
    // Inject services
  }
}

func (r *UserController) Show(ctx http. ontext) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "Hello": "Goravel",
  })
}
```

Определить маршрут:

```go
маршруты пакетов

import (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Создать контроллер

```shell
go run . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Контроллеры ресурсов

If you think of each Eloquent model in your application as a "resource", it is typical to perform the same sets of
actions against each resource in your application. For example, imagine your application contains a `Photo` model and a
`Movie` model. Вероятно, пользователи могут создавать, читать, обновлять или удалять эти ресурсы.

Because of this common use case, Goravel resource routing assigns the typical create, read, update, and delete ("CRUD")
routes to a controller with a single line of code. Чтобы начать, мы можем использовать опцию `make:controller` Artisan команды
`--resource`, чтобы быстро создать контроллер для выполнения этих действий:

```shell
Перейти . artisan make:controller --resource PhotoController
```

Эта команда создаст контроллер по адресу `app/http/controllers/photo_controller.go`. The controller will contain a
method for each of the available resource operations. Next, you may register a resource route that points to the
controller:

```go
facades.Route().Resource("photos", controllers.NewPhotoController())
```

| Глагол   | URI               | Действие   |
| -------- | ----------------- | ---------- |
| ПОЛУЧИТЬ | `/photos`         | Индекс     |
| ПОСТ     | `/photos`         | Магазин    |
| ПОЛУЧИТЬ | `/photos/{photo}` | Показать   |
| Пут/ПАТЧ | `/photos/{photo}` | Обновить   |
| УДАЛИТЬ  | `/photos/{photo}` | Уничтожить |
