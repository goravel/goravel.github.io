# Fassaden

`facades` provide a "static" interface for the core functionality of the application and provide a more flexible, more
elegant, and easy-to-test syntax.

Alle `Fassaden` von Goravel sind unter `github.com/goravel/framework/facades` definiert. Wir können einfach "Fassaden" verwenden:

```go
importieren "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Wie Fassaden funktionieren

`facades` werden im Allgemeinen in der `Register` oder `Boot` Phase jedes Moduls `ServerProvider` instanziiert.

```go
func (config *ServiceProvider) Register() {
  app := Anwendung{}
  facades.Config = app.Init()
}
```

Wenn die `facades` andere `facades` verwenden, dann instantiiere sie in der `Boot` Phase des `ServerProvider`:

```go
func (Datenbank *ServiceProvider) Boot() {
  app := Anwendung{}
  facades.DB = app.Init()
}
```

## Fassade Klassenreferenz

| Fassade       | Dokument                                     |
| ------------- | -------------------------------------------- |
| App           | [Container](../foundation/container)         |
| Artisan       | [Befehlskonsole](../advanced/artisan)        |
| Audi          | [Authentication](../security/authentication) |
| Cache         | [Cache](../advanced/cache)                   |
| Konfiguration | [Configuration](../quickstart/configuration) |
| Krypta        | [Encryption](../security/encryption)         |
| Ereignis      | [Event](../advanced/events)                  |
| Tor           | [Authorization](../security/authorization)   |
| Grpc          | [Grpc](../basic/grpc)                        |
| Hash          | [Hashing](../security/hashing)               |
| Log           | [Log](../basic/logging)                      |
| Mail          | [Mail](../advanced/mail)                     |
| Orm           | [ORM](../orm/quickstart)                     |
| Warteschlange | [Queue](../advanced/queues)                  |
| RateLimiter   | [RateLimiter](../basic/routing)              |
| Route         | [Route](../basic/routing)                    |
| Seemann       | [Seeder](../orm/seeding)                     |
| Zeitplan      | [Schedule](../advanced/schedule)             |
| Speicher      | [Storage](../advanced/schedule)              |
| Testen        | [Testing](../testing/quickstart)             |
| Validierung   | [Validation](../advanced/schedule)           |
