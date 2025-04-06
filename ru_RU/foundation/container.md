# Сервисный контейнер

Контейнер услуг Goravel является мощным инструментом для управления зависимостями класса и выполнения инъекций зависимостей. Она
содержит все модули Goravel, и позволяет связать свои собственные сервисы с контейнерами и решать их при необходимости.
Сервисный контейнер обеспечивает мощную поддержку сторонних пакетов вокруг Goravel.

## Привязка

### Простые привязки

Почти все привязки контейнеров вашего сервиса будут зарегистрированы в [сервис-провайдера](./providers).
Внутри поставщика услуг вы всегда имеете доступ к контейнеру через параметр `app`, затем зарегистрируйте привязку
с помощью метода `Bind`, передавая ключ `key`, который мы хотим зарегистрироваться, вместе с закрытием, который возвращает экземпляр класса
:

```go
маршрут пакета

импорт (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(app foundation. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Как уже упоминалось, вы обычно взаимодействуете с контейнером внутри поставщиков услуг; Однако, если вы хотите, чтобы
взаимодействовал с контейнером вне поставщика услуг, вы можете сделать это через фасад `App`:

```go
facades.App().Bind("ключ", function (foundation.Application) (любой, ошибка) {
    ...
})
```

### Привязка синглета

Метод `Singleton` связывает класс или интерфейс в контейнер, который должен быть разрешен только один раз. Как только
разрешит привязку синглетта, тот же экземпляр будет возвращен при последующих вызовах в контейнер:

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Привязка экземпляров

Вы также можете связать существующий объект с контейнером, используя метод `Instance`. Данный экземпляр
всегда будет возвращен при последующих вызовах в контейнер:

```go
app.Instance(ключ, например)
```

### Привязка с параметром

Если вам нужны дополнительные параметры для построения провайдера услуг, вы можете использовать метод `BindWith` для передачи параметров
замыкающему:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Разрешение

### Метод «Заделать марку»

Вы можете использовать метод `Make` для разрешения экземпляра класса из контейнера. Метод `Make` принимает `key`, который вы
хотите разрешить:

```go
например, err := app.Make(ключ)
```

If you are outside of a service provider in a location of your code that does not have access to the `app` variable, you
may use the `App` facade to resolve a class instance from the container:

```go
например, err := facades.App().Make(key)
```

### Метод `MakeWith`

Если некоторые зависимости вашего класса не могут быть разрешены через контейнер, вы можете их внедрить, передав их в качестве ассоциативного массива
в метод `MakeWith`, соответствующий методу привязки `BindWith`:

```go
например, err := app.MakeWith(ключ, карта[string]any{"id": 1})
```

### Другие методы

Фреймворк предоставляет несколько удобных методов для быстрого разрешения различных фасадов: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation\`.
