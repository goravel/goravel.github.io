# Fațete

`faţades` oferă o interfaţă "statică" pentru funcţionalitatea de bază a aplicaţiei şi oferă o sintaxă mai flexibilă, mai mult
elegant, şi uşor de testat.

Toate `fațades` din Goravel sunt definite la `github.com/goravel/framework/facades`. Putem folosi cu ușurință `fațades`:

```go
import "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Cum funcționează fațadele

`facades` sunt în general instantiate în etapa `Register` sau `Boot` a fiecărui modul `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

Dacă `faţades` utilizaţi alt `faţades`, atunci instanti-le în faza `Boot` a `ServerProvider`:

```go
func (bază de date *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Referința clasei fațadei

| Facade      | Document                                     |
| ----------- | -------------------------------------------- |
| Aplicație   | [Container](../foundation/container)         |
| Artisan     | [Consolă de comandă](../advanced/artisan)    |
| Autorizare  | [Authentication](../security/authentication) |
| Geocutie    | [Cache](../advanced/cache)                   |
| Configurare | [Configuration](../quickstart/configuration) |
| Criptare    | [Encryption](../security/encryption)         |
| Eveniment   | [Event](../advanced/events)                  |
| Poartă      | [Authorization](../security/authorization)   |
| Grătar      | [Grpc](../basic/grpc)                        |
| Hash        | [Hashing](../security/hashing)               |
| Jurnal      | [Log](../basic/logging)                      |
| E-mail      | [Mail](../advanced/mail)                     |
| Orm         | [ORM](../orm/quickstart)                     |
| Coadă       | [Queue](../advanced/queues)                  |
| Limitator   | [RateLimiter](../basic/routing)              |
| Ruta        | [Route](../basic/routing)                    |
| Căutător    | [Seeder](../orm/seeding)                     |
| Programare  | [Schedule](../advanced/schedule)             |
| Depozitare  | [Storage](../advanced/schedule)              |
| Testare     | [Testing](../testing/quickstart)             |
| Validare    | [Validation](../advanced/schedule)           |
