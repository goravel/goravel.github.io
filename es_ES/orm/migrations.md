# Migraciones

Cuando varias personas colaboran en el desarrollo de aplicaciones, es crucial tener una estructura de base de datos estandarizada para la sincronización
. Sin esto, podría haber caos ya que los datos individuales de todos no coincidierán. Database migration is
the solution to this problem. The database structure is version-controlled to ensure its consistency within all
developers.

## Configuración

Los archivos de migración de base de datos se almacenan en el directorio `database/migrations`. Puedes configurar la base de datos
información de conexión en el archivo `config/database.go`. Actualmente hay dos controladores disponibles para migraciones: Ir
migración de idioma y migración de SQL. Sin embargo, la migración de SQL se eliminará en futuras versiones.

```go
// Motivadores disponibles: "default", "sql"
"migrations": mapa[string]any{
  "driver": "default",
  // Puedes cumstomizar el nombre de la tabla de las migraciones
  "table": "migrations",
},
```

## Crear Migraciones

Usa el comando `make:migration` para crear la migración:

```shell
go run . artisan make:migration create_users_table
```

Este comando generará archivos de migración en el directorio `database/migrations`. Cada archivo de migración comenzará con una marca de tiempo
, que Goravel utilizará para determinar el orden de ejecución de los archivos de migración.

### Crear rápidamente

Usa `create_users_table` para generar automáticamente una tabla que contiene la infraestructura de `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Usa `add_avatar_to_users_table` para generar automáticamente una estructura para añadir campos a la tabla `usuarios`:

```
_(a|desde|in)_(\w+)_table$
_(a|desde|in)_(\w+)$
```

Si las condiciones anteriores no coinciden, el framework generará un archivo de migración vacío.

## Estructura de Migración

### Migración de Idioma

La estructura de migración contiene dos métodos: `Up` y `Downn`. El método `Up` se utiliza para agregar nuevas tablas, columnas o índices
a la base de datos, mientras que el método `Down` se usa para deshacer las operaciones realizadas por el método `Up`. In these
two methods, you can use `facades.Schema()` to create and operate database tables. Para métodos disponibles, vea
la [documentation](#tables). La siguiente migración creará una tabla de `usuarios`:

```go
paquete migraciones

importar (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Firma La firma única para la migración.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Ejecutar las migraciones.
func (r *M20241207095921CreateUsersTable) Error {
 if !facades. chema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   table. imestamps()
  })
 }

 return nil
}

// Invertir las migraciones.
func (r *M20241207095921CreateUsersTable) Down() error {
 return facades.Schema().DropIfExists("usuarios")
}
```

#### Establecer conexión de Migración

Si la migración interactuará con una conexión de base de datos distinta a la conexión de base de datos predeterminada de la aplicación,
debe utilizar el método `Conexión de` de la migración:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### Migración SQL

El comando de migración generará dos archivos de migración: `***.up.sql` y `***.down.sql`, correspondientes a ejecución y rollback
, respectivamente. Puede escribir sentencias SQL directamente en estos dos archivos.

```sql
-- ***.up.sql
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***.down.sql
DROP TABLE `users`;
```

## Registrar Migraciones

Al usar migraciones de idioma Goo, necesitas registrar los archivos de migración en el archivo `database/kernel.go` después de que se generen los archivos de migración
:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

Las migraciones SQL no necesitan ser registradas, ya que el framework escaneará automáticamente los archivos SQL en el directorio
`database/migrations`.

## Ejecutar Migraciones

Para ejecutar todas tus migraciones pendientes, ejecuta el comando Artisan 'migrate':

```shell
go run . artisan migrate
```

Si quieres ver qué migraciones se han ejecutado hasta ahora, puedes usar el comando Artisan `migrate:status`:

```shell
go run . artisan migrate:status
```

## Migraciones traseras

Para deshacer la última migración, utiliza el comando 'rollback' Artisan. Este comando deshace el último "batch" de migraciones
, que puede incluir múltiples archivos de migración:

```shell
go run . artisan migrate:rollback
```

Puedes hacer retroceder un número limitado de migraciones proporcionando la opción `step` al comando `rollback`. Por ejemplo,
el siguiente comando deshará las últimas cinco migraciones:

```shell
go run . artisan migrate:rollback --step=5
```

El comando `migrate:reset` hará retroceder todas las migraciones de tu aplicación:

```shell
go run . artisan migrate:reset
```

### Volver atrás y mutar usando un solo comando

El comando `migrate:refresh` deshará todas tus migraciones y luego ejecutará el comando `migrate`. Este comando
recrea eficazmente toda la base de datos:

```shell
go run . artisan migrate:refresh
```

Puedes deshacer y volver a migrar un número limitado de migraciones proporcionando la opción `step` al comando `refresh`.
Por ejemplo, el siguiente comando retrocederá y volverá a migrar las últimas cinco migraciones:

```shell
go run . artisan migrate:refresh --step=5
```

### Soltar todas las mesas y mutar

El comando `migrate:fresh` eliminará todas las tablas de la base de datos y luego ejecutará el comando `migrate`:

```shell
go run . artisan migrate:fresh
```

## Tablas

### Crear tabla

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Marcar si la Tabla / Columna existe

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {} }
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Conexión de base de datos

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### Actualizar tabla

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Renombrar / Soltar Tabla

```go
facades.Schema().Rename("users", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("users")

```

## Columnas

### Tipos de columna disponibles

|                     |                      |                       |                             |
| ------------------- | -------------------- | --------------------- | --------------------------- |
| BigIncrementos      | BigInteger           | Boolean               | Char                        |
| Fecha               | Fecha y hora         | Fecha y hora          | Decimal                     |
| Doble               | [Enum](#enum)        | Ropa                  | [ID](#id)                   |
| Incrementos         | Entero               | Incrementos enteros   | Json                        |
| Incrementos         | LongText             | Incrementos Medianos  | MediumInteger               |
| Texto Medio         | Incrementos pequeños | Entero pequeño        | [SoftDeletes](#softdeletes) |
| Borrar Soft Tz      | Cadena               | Texto                 | Hora                        |
| Tiempo Tz           | Timestamp            | Marcas de tiempo      | Tz                          |
| TimestampTz         | UnsignedBigInteger   | Pequeños incrementos  | TinyInteger                 |
| TinyText            | UnsignedInteger      | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                      |                       |                             |

#### Enum

Crea un campo `Enum` que puede almacenarse en `Mysql` de acuerdo al tipo en `[]any`, pero en las bases de datos `Postgres`, `Sqlite`, y
`Sqlserver`, es un tipo `String`.

```go
table.Enum("dificultad", []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

El método `ID` es un alias del método `BigIncrements`. Por defecto, este método creará una columna `id`; sin embargo,
si desea asignar un nombre diferente a la columna, puede pasar el nombre de la columna:

```go
table.ID()
table.ID("user_id")
```

#### Borrados

El método `SoftDeletes` añade una columna nullable `deleted_at` `TIMESTAMP`. Esta columna está diseñada para almacenar la marca de tiempo
`deleted_at` requerida para la función Orm "soft delete":

```go
table.SoftDeletes()
```

#### Columna personalizada

Si estás usando tipos de columna que el framework aún no soporta, puedes utilizar el método `Column` para personalizar el tipo de campo
:

```go
table.Column("geometry", "geometry")
```

### Modificadores de columna

Además de los tipos de columna listados anteriormente, al agregar una columna a una tabla de la base de datos, también puede agregar "modificadores" a
la columna. Por ejemplo, para permitir que una columna sea "nullable", puedes usar el método `Nullable`:

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

La siguiente tabla contiene todos los modificadores de columna disponibles:

| Modificado                     | Descripción                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`             | Establece una columna entera como auto-incrementante (clave primaria)                                                                  |
| `.Comentario("mi comentario")` | Añade un comentario a la columna (MySQL / PostgreSQL)                                                                                  |
| `.Por defecto (valor)`         | Establece el valor por defecto de la columna                                                                                                              |
| `.Nullable()`                  | Permite insertar valores NULL en la columna                                                                                                               |
| `.Unsigned()`                  | Establece una columna entera como SIGNED (sólo MySQL)                                                                                  |
| `Current()`                    | Establece una columna de marca de tiempo para usar CURRENT_TIMESTAMP como valor predeterminado                                       |
| `isCurrentOnUpdate()`          | Establece una columna de marca de tiempo para usar CURRENT_TIMESTAMP cuando el registro se actualiza (sólo MySQL) |

### Soltar Columna

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Índice

### Crear índice

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Añadir la clave primaria
  table. rimary("id")
  // Añadir la clave primaria compuesta
  table.Primary("id", "name")

  // Añadir tabla de índice
  única. nique("name")
  table.Unique("name", "age")

  // Agregar tabla del índice
  table.Index("name")
  . ndex("name", "age")

  // Añadir índice de texto completo
  table.FullText("name")
  table.FullText("name", "age")
})
```

### Renombrar índice

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Suprimir índice

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_unique")
  table.DropIndex("name")
  table.DropIndexByName("name_index")
  table.DropFullText("name")
  table.DropFullTextByName("name_fulltext")
})
```

### Crear Clave Foránea

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("usuarios")
})
```

### Soltar Llave Foránea

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
