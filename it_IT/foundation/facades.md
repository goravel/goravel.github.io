# Facciate

`facades` fornisce un'interfaccia "statica" per la funzionalità principale dell'applicazione e fornisce una sintassi più flessibile, più
elegante e facile da testare.

Tutte le `facades` di Goravel sono definite in `github.com/goravel/framework/facades`. Possiamo facilmente usare `facades`:

```go
import "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Come Funzionano Le Facciate

`facades` sono generalmente istanziati nella fase `Register` o `Boot` di ogni modulo `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Se le `facades` usano altre `facades`, allora li instanziano nella fase `Boot` del `ServerProvider`:

```go
func (database *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Riferimento Classe Facciata

| Facciata       | Documento                                    |
| -------------- | -------------------------------------------- |
| App            | [Container](../foundation/container)         |
| Artisan        | [Console Dei Comandi](../advanced/artisan)   |
| Autenticazione | [Authentication](../security/authentication) |
| Cache          | [Cache](../advanced/cache)                   |
| Configurazione | [Configuration](../quickstart/configuration) |
| Cripta         | [Encryption](../security/encryption)         |
| Evento         | [Event](../advanced/events)                  |
| Cancello       | [Authorization](../security/authorization)   |
| Grpc           | [Grpc](../basic/grpc)                        |
| Hash           | [Hashing](../security/hashing)               |
| Registro       | [Log](../basic/logging)                      |
| Posta          | [Mail](../advanced/mail)                     |
| Orm            | [ORM](../orm/quickstart)                     |
| Coda           | [Queue](../advanced/queues)                  |
| RateLimiter    | [RateLimiter](../basic/routing)              |
| Percorso       | [Route](../basic/routing)                    |
| Seeder         | [Seeder](../orm/seeding)                     |
| Pianificazione | [Schedule](../advanced/schedule)             |
| Archiviazione  | [Storage](../advanced/schedule)              |
| Test           | [Testing](../testing/quickstart)             |
| Convalida      | [Validation](../advanced/schedule)           |
