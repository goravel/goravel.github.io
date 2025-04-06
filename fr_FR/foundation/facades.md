# Façades

`facades` fournit une interface "statique" pour les fonctionnalités principales de l'application et fournit une syntaxe plus flexible, plus
élégante, et facile à tester.

Toutes les `facades` de Goravel sont définies dans `github.com/goravel/framework/facades`. Nous pouvons facilement utiliser les `facades`:

```go
importer "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Comment fonctionnent les façades

`facades` sont généralement instanciés dans l'étape `Register` ou `Boot` de chaque module `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Si les `facades` utilisent d'autres `facades`, instanciez-les alors dans la phase `Boot` du `ServerProvider`:

```go
func (base de données *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Référence de classe de façade

| Façade          | Document                                     |
| --------------- | -------------------------------------------- |
| Application     | [Container](../foundation/container)         |
| Artisan         | [Console de commande](../advanced/artisan)   |
| Auteur          | [Authentication](../security/authentication) |
| Cache           | [Cache](../advanced/cache)                   |
| Configuration   | [Configuration](../quickstart/configuration) |
| Crypte          | [Encryption](../security/encryption)         |
| Evénement       | [Event](../advanced/events)                  |
| Portail         | [Authorization](../security/authorization)   |
| Grpc            | [Grpc](../basic/grpc)                        |
| Hachage         | [Hashing](../security/hashing)               |
| Logs            | [Log](../basic/logging)                      |
| Courrier        | [Mail](../advanced/mail)                     |
| Orme            | [ORM](../orm/quickstart)                     |
| File d'attente  | [Queue](../advanced/queues)                  |
| Limite de notes | [RateLimiter](../basic/routing)              |
| Itinéraire      | [Route](../basic/routing)                    |
| Seeder          | [Seeder](../orm/seeding)                     |
| Planifier       | [Schedule](../advanced/schedule)             |
| Stockage        | [Storage](../advanced/schedule)              |
| Tests en cours  | [Testing](../testing/quickstart)             |
| Validation      | [Validation](../advanced/schedule)           |
