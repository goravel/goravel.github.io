# Facas

`facades` fornecem uma interface "estática" para a funcionalidade central da aplicação e fornecem uma sintaxe mais flexível, mais
elegante e fácil de testar.

Todos os `facades` de Goravel são definidos em `github.com/goravel/framework/facades`. Podemos usar facilmente `facades`:

```go
import "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Como as Facades funcionam

`facades` são geralmente instanciados na etapa `Register` ou `Boot` de cada módulo `ServerProvider`.

```go
func (config *ServiceProvider) Registrar) {
  app := Application{}
  facades.Config = app.Init()
}
```

Se as `facas` usam outras `facades`, então instancie-as na fase `Boot` do `ServerProvider`:

```go
func (banco de dados *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Referência da Classe Facade

| Faculdade     | Documento                                    |
| ------------- | -------------------------------------------- |
| Aplicativo    | [Container](../foundation/container)         |
| Artisan       | [Console de Comando](../advanced/artisan)    |
| Autenticação  | [Authentication](../security/authentication) |
| Cachear       | [Cache](../advanced/cache)                   |
| Configuração  | [Configuration](../quickstart/configuration) |
| Cripta        | [Encryption](../security/encryption)         |
| Evento        | [Event](../advanced/events)                  |
| Portão        | [Authorization](../security/authorization)   |
| Gráfico       | [Grpc](../basic/grpc)                        |
| Hash          | [Hashing](../security/hashing)               |
| Registro      | [Log](../basic/logging)                      |
| Correio       | [Mail](../advanced/mail)                     |
| Orm           | [ORM](../orm/quickstart)                     |
| Fila          | [Queue](../advanced/queues)                  |
| RateLimiter   | [RateLimiter](../basic/routing)              |
| Rota          | [Route](../basic/routing)                    |
| Semeador      | [Seeder](../orm/seeding)                     |
| Agendamento   | [Schedule](../advanced/schedule)             |
| Armazenamento | [Storage](../advanced/schedule)              |
| Testando      | [Testing](../testing/quickstart)             |
| Validação     | [Validation](../advanced/schedule)           |
