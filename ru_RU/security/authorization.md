# Авторизация

Горавель предлагает встроенные сервисы [authentication](./authentication) и легкую в использовании функцию авторизации для
управления действиями пользователей на ресурсах. Even if a user is authenticated, they may not have the authority to modify or delete
certain Eloquent models or database records. Goravel's authorization feature allows for a systematic way of managing
these authorization checks.

Существует два способа авторизации действий в Горавеле: [gates](#gates) и [policies](#policies). Imagine gates and
policies as similar to routes and controllers. Gates are based on closures and provide a simple approach to
authorization, whereas policies group logic around a specific resource, similar to controllers. This documentation will
first cover gates and then delve into policies.

При построении приложения не обязательно использовать только ворота или политики. Большинство приложений будут использовать комбинацию
и что совершенно приемлемо!

## Ворота

### Пишущие ворота

Ворота служат замыканиями, проверяющими, имеет ли пользователь право выполнять определенное действие. They are commonly set up
in the `app/providers/auth_service_provider.go` file's `Boot` method using the Gate facade.

В этом сценарии, мы создадим ворота, чтобы проверить, может ли пользователь изменить конкретную модель поста, сравнивая ее ID с
user_id создателя поста.

```go
поставщики пакетов

импорт (
  "context"

  контракты "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (receiver *AuthServiceProvider) Register(app foundation. pplication) {

}

func (receiver *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Define("update-post",
    func(ctx context.Context, arguments map[string]any) contractsaccess. esponse {
      пользователя := ctx.Value("user").(models.User)
      пост := arguments["post"].(модели. ost)

      if user.ID == post.UserID {
        return access. ewAllowResponse()
      } else {
        return access. ewDenyResponse("Ошибка")
      }
    },
  )
}
```

### Авторизация действий

Для авторизации действия с помощью ворот, вы должны использовать методы «Разрешить» или «Отнять», предоставленные фасадом ворот:

```go
пакетные контроллеры

import (
  "github.com/goravel/framework/facades"
)

type UserController struct {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

Вы можете авторизовать несколько действий одновременно, используя методы «Any» или «None».

```go
если facades.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Пользователь может обновить или удалить пост. .
}

if facades. ate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Пользователь не может обновить или удалить пост. .
}
```

### Ответы Ворот

Метод `Allows` возвращает логическое значение. Для получения полного ответа авторизации используйте метод «Инспекция».

```go
ответ := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // Действие авторизовано...
} else {
    fmt.Println(response.Message())
}
```

### Перехват проверки ворот

Иногда вы можете захотеть предоставить все возможности определенному пользователю. You can define a closure using the `Before` method,
which runs before any other authorization checks:

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Если закрытие `Bore` возвращает не-нуль, то результат будет считаться результатом проверки авторизации.

Метод `After` может быть использован для определения замыкания, которое будет выполняться после всех остальных проверок авторизации.

```go
facades.Gate().After(func(ctx context.Context, ability string, arguments map[string]any, result contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Примечание: Возвращаемый результат `After` будет применен только тогда, когда `facades.Gate().Define` возвращает nil.

### Вставить контекст

`context` будет передан в методы `Bore`, `After`, and `Define`.

```go
facades.Gate().WithContext(ctx).Разрешено ("update-post", map[string]any{
  "post": post,
})
```

## Политики

### Генерация политик

Вы можете использовать команду «make:policy» для формирования политики. Сгенерированная политика будет сохранена в директории
`app/policies`. Если каталог в вашем приложении не существует, Goravel создаст его для вас.

```go
go run . artisan make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### Политики писания

Давайте определим метод `Update` на `PostPolicy`, чтобы проверить, может ли `User` обновить `Post`.

```go
политики пакетов

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"
)

тип PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("У вас нет этого поста.")
  }
}
```

Затем мы можем зарегистрировать политику в `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

Когда вы работаете над разрешением различных действий, вы можете добавить больше методов в свою политику. Например, вы можете создать методы
`View` или `Delete` для авторизации различных действий, связанных с моделями. Feel free to name your policy methods as you see
fit.
