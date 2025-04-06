# Проверка подлинности

Аутентификация является незаменимой функцией в веб-приложениях, модуль `facades.Auth()` Goravel обеспечивает поддержку
для JWT.

## Конфигурация

Вы можете настроить защиту `defaults` и несколько `guards` в файле `config/auth.go` для переключения разных пользователей
в приложении.

Вы можете настроить параметры JWT в файле `config/jwt.go`, например, `secret`, `ttl`, `refresh_ttl`.

### Настроить TTL для различных Стражей

Вы можете установить TTL для каждой гвардии отдельно в файле `config/auth.go`, если не задано, конфигурация `jwt.ttl` используется
по умолчанию.

```go
// config/auth.go
"guards": map[string]any{
  "user": map[string]any{
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## Сгенерировать JWT токен

```shell
go run . artisan jwt:secret
```

## Сгенерировать токен с использованием пользователя

You can generate a token by Model, there is no extra configuration if the model uses `orm.Model`, otherwise, you need to
configure Tag on the model primary key field, for example:

```go
type User struct {
  ID uint `gorm:"primaryKey"`
  Name string
}

var user models. ser
user.ID = 1

токен, err := facades.Auth(ctx).Login(&user)
```

## Сгенерировать токен с помощью ID

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

Через `payload` вы можете получить:

1. Охранник: нынешняя охрана;
2. `Ключ`: Флаг пользователя;
3. \`Истекает срок действия;
4. `IssuedAt`: выпущенное время;

> Если `err` не является пустым, кроме `ErrorTokenExpired`, то загрузчик должен быть nil.

Вы можете судить об ошибке токен:

```go
"errors"
"github.com/goravel/framework/auth"

errors.Is(err, auth.ErrorTokenExpired)
```

> Токен может быть обработан обычно с или без префикса носителя.

## Получить пользователя

Вам нужно сгенерировать токен при помощи `Parse` перед тем как получить пользователя, процесс может быть обработан в HTTP middleware.

```go
var user models.User
err := facades.Auth(ctx).User(&user) // Необходимая точка
id, err := facades.Auth(ctx).ID()
```

## Обновить токен

Вам нужно сгенерировать токен от `Parse` перед обновлением пользователя.

```go
token, err := facades.Auth(ctx).Refresh()
```

## Выйти

```go
err := facades.Auth(ctx).Logout()
```

## Несколько Стражей

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> При отсутствии охранника по умолчанию перед вызовом вышеуказанных методов необходимо вызвать метод «Стража».
