# Facades

`facades` biedt een "statische" interface voor de kernfunctionaliteit van de applicatie en biedt een flexibeler, meer
elegant en eenvoudig te testen syntax.

Alle `facades` van Goravel zijn gedefinieerd onder `github.com/goravel/framework/facades`. We kunnen makkelijk `facades` gebruiken:

```go
import "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Hoe Facades werken

`facades` zijn meestal geïnstantieerd in de `Register` of `Boot` fase van elke module `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Als de `facades` gebruik maakt van andere `facades`, instantieer ze dan in de `Boot` fase van de `ServerProvider`:

```go
func (database *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Facadeles Referentie

| Gevlochten      | Document                                     |
| --------------- | -------------------------------------------- |
| App             | [Container](../foundation/container)         |
| Artisan         | [Commando Console](../advanced/artisan)      |
| Authenticatie   | [Authentication](../security/authentication) |
| Cachegeheugen   | [Cache](../advanced/cache)                   |
| Configuratie    | [Configuration](../quickstart/configuration) |
| Grafiek         | [Encryption](../security/encryption)         |
| Gebeurtenis     | [Event](../advanced/events)                  |
| Poort           | [Authorization](../security/authorization)   |
| Grpc            | [Grpc](../basic/grpc)                        |
| Toegangssleutel | [Hashing](../security/hashing)               |
| Logboek         | [Log](../basic/logging)                      |
| E-mailen        | [Mail](../advanced/mail)                     |
| Orm             | [ORM](../orm/quickstart)                     |
| Wachtrij        | [Queue](../advanced/queues)                  |
| RateLimiter     | [RateLimiter](../basic/routing)              |
| Route           | [Route](../basic/routing)                    |
| Seeder          | [Seeder](../orm/seeding)                     |
| Planning        | [Schedule](../advanced/schedule)             |
| Opslagruimte    | [Storage](../advanced/schedule)              |
| Testen          | [Testing](../testing/quickstart)             |
| Validatie       | [Validation](../advanced/schedule)           |
