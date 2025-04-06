# Фасады

`facades` provide a "static" interface for the core functionality of the application and provide a more flexible, more
elegant, and easy-to-test syntax.

Все фасады Горавеля определены в разделе `github.com/goravel/framework/facades`. Мы можем легко использовать `facades`:

```go
импортировать "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Как работают фасады

`facades` обычно копируется на этапе `Register` или `Boot` каждого модуля `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Если `facades` используйте другой `facades`, затем создайте экземпляр в фазе `Boot` `ServerProvider`:

```go
func (database *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Артикул класса фасада

| Фасад                 | Документ                                     |
| --------------------- | -------------------------------------------- |
| Приложение            | [Container](../foundation/container)         |
| Artisan               | [консоль команд](../advanced/artisan)        |
| Авто                  | [Authentication](../security/authentication) |
| Кэш                   | [Cache](../advanced/cache)                   |
| Настройка             | [Configuration](../quickstart/configuration) |
| Склеп                 | [Encryption](../security/encryption)         |
| Событие               | [Event](../advanced/events)                  |
| Ворота                | [Authorization](../security/authorization)   |
| Грпк                  | [Grpc](../basic/grpc)                        |
| Хэш                   | [Hashing](../security/hashing)               |
| Журнал                | [Log](../basic/logging)                      |
| Почта                 | [Mail](../advanced/mail)                     |
| Орм                   | [ORM](../orm/quickstart)                     |
| Очередь               | [Queue](../advanced/queues)                  |
| Ограничитель Рейтинга | [RateLimiter](../basic/routing)              |
| Маршрут               | [Route](../basic/routing)                    |
| Сидер                 | [Seeder](../orm/seeding)                     |
| График                | [Schedule](../advanced/schedule)             |
| Хранилище             | [Storage](../advanced/schedule)              |
| Тестирование          | [Testing](../testing/quickstart)             |
| Проверка              | [Validation](../advanced/schedule)           |
