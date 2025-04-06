# Base de datos: Sembrado

Goravel incluye la capacidad de sembrar tu base de datos con datos usando la estructura de semilla. Todas las estructuras de semilla se almacenan en el directorio
`database/seeders`. Por defecto, una estructura `DatabaseSeeder` está definida para usted.

## Escribir Seeders

Para generar un seeder, ejecuta el `make:seeder` [comando Artisan](../advanced/artisan). Todos los seeders
generados por el framework serán almacenados en el directorio `database/seeders`:

```shell
go run . artisan make:seeder UserSeeder
```

Por defecto, una estructura de seeder tiene dos métodos: `Signature` y `Run`. El método `Signature` establece el nombre del seeder,
mientras que el método `Run` se activa cuando se ejecuta el comando `db:seed` Artisan. You can use the `Run` method to
insert data into your database in any way you prefer.

Para ilustrar, podemos personalizar la estructura `DatabaseSeeder` añadiendo una instrucción de inserción de base de datos al método `Run`.

```go
paquete seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Firma El nombre y firma del seeder.
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Ejecuta la lógica de seeder.
func (s *DatabaseSeeder) Error Run() {
 user := models. ser{
  Nombre: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Llamando a Seeders Adicionales

Dentro de la estructura `DatabaseSeeder`, puede utilizar el método `Call` para ejecutar estructuras de semilla adicionales. Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. El método `Call` acepta un array de estructuras de seeder que deben ser ejecutadas:

```go
// Ejecuta la lógica del seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework también proporciona un método `CallOnce`, un seeder se ejecutará sólo una vez en el comando `db:seed`:

```go
// Ejecuta la lógica del seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Seeders en ejecución

Puedes ejecutar el comando de Artisan `db:seed` para sembrar tu base de datos. Por defecto, el comando `db:seed` ejecuta el archivo
`database/seeders/database_seeder.go`, que a su vez puede invocar otras clases de semilla. Sin embargo, puedes usar la opción
`--seeder` para especificar una clase de seeder específica para ejecutarla individualmente:

```shell
go run . artisan db:seed
```

Si quieres ejecutar otros seeders cuando ejecutes el comando `db:seed`, puedes registrar el seeder en
`app/providers/database_service_provider.go`:

```go
// app/providers/database_service_provider.go
func (receptor *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders. hotoSeeder{},
 })
}

vaya a ejecutar. artisan db:seed --seeder=UserSeeder FotoSeeder // La firma del seeder
```

También puedes sembrar tu base de datos usando el comando `migrate:fresh` y `migrate:refresh` en combinación con la opción `--seed`
, que eliminará todas las tablas y reejecutará todas sus migraciones. Este comando es útil para reconstruir completamente
su base de datos. La opción `--seeder` puede utilizarse para especificar un seeder específico a ejecutar:

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Obligando a los Seeders a correr en producción

Algunas operaciones de siembra pueden causar alterar o perder datos. Con el fin de protegerte de ejecutar comandos
de tu base de datos de producción, se te pedirá confirmación antes de que los seeders sean ejecutados en el entorno
`production`. Para forzar que los seeders se ejecuten sin una indicación, usa la bandera `--force`:

```shell
go run . artisan db:seed --force
```
