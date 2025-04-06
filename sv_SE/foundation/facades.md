# Fasader

`facades` ger ett "statiskt" gränssnitt för kärnfunktionaliteten i programmet och ger en mer flexibel, mer
elegant och lätt att testa syntax.

Alla `facades` i Goravel definieras under `github.com/goravel/frameing/facades`. Vi kan enkelt använda `fasader`:

```go
import "github.com/goravel/frameing/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Hur fasader fungerar

`facades` är i allmänhet instantiserade i `Register` eller `Boot` -stadiet i varje modul `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Om `facades` använder andra `facades`, så instantisera dem i `Boot`-fasen av `ServerProvider`:

```go
func (databas *Serviceleverantör) Boot() {
  app := Application{}
  fasades.DB = app.Init()
}
```

## Fasad klass referens

| Fasad         | Dokument                                     |
| ------------- | -------------------------------------------- |
| App           | [Container](../foundation/container)         |
| Artisan       | [Kommandotolken](../advanced/artisan)        |
| Auth          | [Authentication](../security/authentication) |
| Cache         | [Cache](../advanced/cache)                   |
| Konfiguration | [Configuration](../quickstart/configuration) |
| Krypta        | [Encryption](../security/encryption)         |
| Händelse      | [Event](../advanced/events)                  |
| Grind         | [Authorization](../security/authorization)   |
| Grpc          | [Grpc](../basic/grpc)                        |
| Hash          | [Hashing](../security/hashing)               |
| Logg          | [Log](../basic/logging)                      |
| E-post        | [Mail](../advanced/mail)                     |
| Orm           | [ORM](../orm/quickstart)                     |
| Kö            | [Queue](../advanced/queues)                  |
| HateLimiter   | [RateLimiter](../basic/routing)              |
| Rutt          | [Route](../basic/routing)                    |
| Seeder        | [Seeder](../orm/seeding)                     |
| Schema        | [Schedule](../advanced/schedule)             |
| Lagring       | [Storage](../advanced/schedule)              |
| Testar        | [Testing](../testing/quickstart)             |
| Validering    | [Validation](../advanced/schedule)           |
