# Facadas

`facades` proporciona una interfaz "estática" para la funcionalidad principal de la aplicación y proporciona una sintaxis más flexible, más
elegante y fácil de probar.

Todas las `facades` de Goravel están definidas bajo `github.com/goravel/framework/facades`. Podemos usar fácilmente `facades`:

```go
importar "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## Cómo funcionan las fachadas

Las `facades` generalmente se instancian en la etapa `Register` o `Boot` de cada módulo `ServerProvider`.

```go
func (config *ServiceProvider) Register() {
  app := Aplicación{}
  facades.Config = app.Init()
}
```

Si las `facades` usan otras `facades`, entonces instancialas en la fase `Boot` del `ServerProvider`:

```go
func (base de datos *ServiceProvider) Boot() {
  app := Applicación{}
  facades.DB = app.Init()
}
```

## Referencia de clase Facade

| Facada            | Documento                                    |
| ----------------- | -------------------------------------------- |
| App               | [Container](../foundation/container)         |
| Artisan           | [Consola de comando](../advanced/artisan)    |
| Aut               | [Authentication](../security/authentication) |
| Caché             | [Cache](../advanced/cache)                   |
| Configuración     | [Configuration](../quickstart/configuration) |
| Cripta            | [Encryption](../security/encryption)         |
| Evento            | [Event](../advanced/events)                  |
| Puerta            | [Authorization](../security/authorization)   |
| Grpc              | [Grpc](../basic/grpc)                        |
| Hash              | [Hashing](../security/hashing)               |
| Logo              | [Log](../basic/logging)                      |
| Correo            | [Mail](../advanced/mail)                     |
| Orm               | [ORM](../orm/quickstart)                     |
| Cola              | [Queue](../advanced/queues)                  |
| Limitador de tasa | [RateLimiter](../basic/routing)              |
| Ruta              | [Route](../basic/routing)                    |
| Seeder            | [Seeder](../orm/seeding)                     |
| Programar         | [Schedule](../advanced/schedule)             |
| Almacenamiento    | [Storage](../advanced/schedule)              |
| Pruebas           | [Testing](../testing/quickstart)             |
| Validación        | [Validation](../advanced/schedule)           |
