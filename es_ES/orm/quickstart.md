# Comenzando

Goravel hace fácil para los desarrolladores interactuar con bases de datos usando `facades.Orm()`. Actualmente, proporciona soporte oficial
para las siguientes cuatro bases de datos:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Antes de comenzar, configure la base de datos en `.env` y confirme la configuración `default` en `config/database.go`.

# Configuración

Para configurar bases de datos, vaya a `config/database.go`. Aquí es donde puedes personalizar todas las conexiones de base de datos y
elegir una conexión `por defecto`. La configuración en este archivo se basa en las variables de entorno del proyecto y
muestra varias configuraciones de base de datos que Goravel soporta.

### DSN

También puedes usar DSN para conectarte a la base de datos directamente, simplemente configura el campo `dsn` en el archivo de configuración:

```go
"postgres": map[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Conexiones de lectura y escritura

A veces puedes querer usar una conexión de base de datos para las sentencias `SELECT`, y otra para las sentencias `INSERT`, `UPDATE` y
`DELETE`. Goravel hace que esto sea una brisa.

Para ver cómo deben configurarse las conexiones de lectura/escritura, veamos este ejemplo:

```go
importar "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": mapear[string]any{
  "mañql": mapear[string]any{
    "driver": "mañql",
    "leído": []base de datos. onfig{
      {Host: "192.168.1. ", Puerto: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database. onfig{
      {Host: "192.168.1. ", Puerto: 3306, Base de datos: "forge", Nombre de usuario: "root", Password: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "puerto": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Hemos actualizado el array de configuración con dos nuevas claves - `read` y `write`. La conexión `read` usará
`192.168.1.1` como host, mientras que la conexión `write` usará `192.168.1.2`. Ambas conexiones compartirán el mismo prefijo
de base de datos, conjunto de caracteres y otras opciones especificadas en el array principal de GNUql. En caso de valores múltiples en el array de configuración
`host`, un host de base de datos será seleccionado aleatoriamente para cada solicitud.

### Pool de Conexión

Puede configurar un conjunto de conexiones en el archivo de configuración, una configuración razonable de los parámetros del pool de conexión
puede mejorar enormemente el rendimiento de la concurrencia:

| Clave                                                                         | Accin                                 |
| ----------------------------------------------------------------------------- | ------------------------------------- |
| pool.max_idle_conns | Máximo de conexiones inactivas        |
| max_abrir_conns                     | Máximo de conexiones abiertas         |
| tiempo de espera máximo                                                       | Tiempo máximo de espera de conexiones |
| tiempo de vida máximo                                                         | Tiempo de vida máximo de conexiones   |

### Esquema

Postgres y Sqlserver soportan la configuración de Schema. Postgres puede establecer directamente el esquema en el archivo de configuración, mientras que
Sqlserver necesita especificar el esquema a través del método `TableName` en el modelo.

#### Postgres

```go
"connections": map[string]any{
  "postgres": map[string]any{
    "driver": "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### Sqlserver

```go
func (r *Usuario) TableName() cadena {
  return "goravel.users"
}
```

### Obtener información de base de datos

Puedes usar el comando `db:show` para ver todas las tablas en la base de datos.

```bash
go run . artisan db:show
```

También puedes usar el comando `db:table` para ver la estructura de una tabla específica.

```bash
go run . artisan db:table
go run. artisan db:table users
```

## Definición del modelo

Para crear un modelo personalizado, consulte el archivo de modelo `app/models/user.go` que está incluido en el framework. El `struct`
en `app/models/user.go` contiene dos frameworks incrustados: `orm.Model` y `orm.SoftDeletes`. Estos frameworks definen las propiedades
`id`, `created_at`, `updated_at`, y `deleted_at` respectivamente. Con `orm.SoftDeletes`, puede habilitar la eliminación suave
para el modelo.

### Convención de modelos

1. El modelo recibe el nombre de una gran joroba;
2. Usar la forma plural del modelo "snake naming" como el nombre de la tabla;

Por ejemplo, el nombre del modelo es `UserOrder`, y el nombre de la tabla es `user_orders`.

### Crear modelo

Usa el comando `make:model` para crear un modelo:

```shell
go run . artisan make:model User
go run . artisan make:model user/User
```

El archivo de modelo creado se encuentra en el archivo `app/models/user.go`, el contenido es el siguiente:

```go
los modelos de paquete

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nombre cadena
  Cadena de avatar
  orm.SoftDeletes
}
```

Si desea establecer el campo modelo a `any`, necesita agregar una etiqueta adicional: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Detalle cualquier `gorm:"type:text"`
  orm.SoftDeletes
}
```

Más detalles de uso de etiquetas en: <https://gorm.io/docs/models.html>.

### Especificar nombre de tabla

```go
los modelos de paquete

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nombre cadena
  Cadena de avatar
  orm. oftDeletes
}

func (r *Usuario) TableName() string {
  return "goravel_user"
}
```

### Conexiones de base de datos

Por defecto, todos los modelos utilizan la conexión de base de datos predeterminada configurada para su aplicación. Si desea especificar una conexión
distinta que se utilizará al interactuar con un modelo en particular, necesita definir un método `Connection` en el modelo
.

```go
los modelos de paquete

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nombre cadena
  Cadena de avatar
  orm. oftDeletes
}

func (r *Usuario) Connection() string {
  return "postgres"
}
```

## facades.Orm() funciones disponibles

| Nombre      | Accin                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Conexión    | [Conexión de base de datos](#specify-database-connection)                                       |
| BD          | [Interfaz de base de datos genérica sql.DB](#generic-database-interface-sql-db) |
| Consulta    | [Obtener instancia de base de datos](#get-database-instance)                                    |
| Transacción | [Transaction](#transaction)                                                                     |
| Contexto    | [Contexto de Inyectación](#inject-context)                                                      |

## facades.Orm().Query() funciones disponibles

| Funciones           | Accin                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Comenzar            | [Transacción inicial](#transaction)                                                                             |
| Compromiso          | [Transacción de transacción](#transaction)                                                                      |
| Contador            | [Count](#count)                                                                                                 |
| Crear               | [Create](#create)                                                                                               |
| Cursor              | [Cursor](#cursor)                                                                                               |
| Eliminar            | [Delete](#delete)                                                                                               |
| Distinto            | [Repetición de filtro](#filter-repetition)                                                                      |
| Conductor           | [Get Driver](#get-driver)                                                                                       |
| Exec                | [Ejecutar actualización nativa SQL](#execute-native-update-sql)                                                 |
| Existe              | [Exists](#exists)                                                                                               |
| Buscar              | [Consulta una o varias líneas por ID](#query-one-or-multiple-lines-by-id)                                       |
| FindOrFail          | [Error de devolución no encontrado](#not-found-return-error)                                                    |
| Primero             | [Consulta una línea](#query-one-line)                                                                           |
| O primero           | [Consulta o devuelve datos a través de callback](#query-one-line)                                               |
| FirstOrCreate       | [Recuperando o Creando Modelos](#retrieving-or-creating-models)                                                 |
| PrimeroNuevo        | [Recuperando o nuevos modelos](#retrieving-or-creating-models)                                                  |
| FirstOrFail         | [Error no encontrado](#not-found-error)                                                                         |
| Forzar borrado      | [Forzar eliminación](#delete)                                                                                   |
| Obtener             | [Consultar múltiples líneas](#query-multiple-lines)                                                             |
| Grupo               | [Group](#group-by--having)                                                                                      |
| Tener               | [Having](#group-by-having)                                                                                      |
| Unirse              | [Join](#join)                                                                                                   |
| Límite              | [Limit](#limit)                                                                                                 |
| LockForUpdate       | [Bloqueo pesimista](#pessimistic-locking)                                                                       |
| Modelo              | [Especificar un modelo](#specify-table-query)                                                                   |
| Desplazamiento      | [Offset](#offset)                                                                                               |
| Pedido              | [Order](#order)                                                                                                 |
| Ordenar por         | [Order](#order)                                                                                                 |
| OrderByDesc         | [Order](#order)                                                                                                 |
| Orden aleatoria     | [Order](#order)                                                                                                 |
| Ordónde             | [OrWhere](#where)                                                                                               |
| En qué no           | [OrWhereNotIn](#where)                                                                                          |
| OrWhereNull         | [OrWhereNull](#where)                                                                                           |
| OrdóndeEn           | [OrWhereIn](#where)                                                                                             |
| Paginar             | [Paginate](#paginate)                                                                                           |
| Cortar              | [Solicitar columna](#query-single-column)                                                                       |
| Rápido              | [Ejecutar SQL nativo](#execute-native-sql)                                                                      |
| Restaurar           | [Restore](#restore)                                                                                             |
| Rollback            | [Transacción de devolución](#transaction)                                                                       |
| Guardar             | [Actualizar un modelo existente](#update-a-existing-model)                                                      |
| Ahorrar en silencio | [Guardando un modelo único sin eventos](#saving-a-single-model-without-events)                                  |
| Escanear            | [Escanear estructura](#execute-native-sql)                                                                      |
| Ámbitos             | [Scopes](#scopes)                                                                                               |
| Seleccionar         | [Especificar campos](#specify-fields)                                                                           |
| Bloqueo compartido  | [Bloqueo pesimista](#pessimistic-locking)                                                                       |
| Sum                 | [Sum](#sum)                                                                                                     |
| Tabla               | [Especificar una tabla](#specify-table-query)                                                                   |
| ToSql               | [Get SQL](#get-sql)                                                                                             |
| ToRawSql            | [Get SQL](#get-sql)                                                                                             |
| Actualizar          | [Actualizar una sola columna](#update-a-single-column)                                                          |
| Actualizar          | [Actualizar o crear] (#update-or-create) |
| Donde               | [Where](#where)                                                                                                 |
| DóndeEntre          | [WhereBetween](#where)                                                                                          |
| Donde no entre      | [WhereNotBetween](#where)                                                                                       |
| No En               | [WhereNotIn](#where)                                                                                            |
| Con Nulo            | [WhereNull](#where)                                                                                             |
| Dondequiera         | [WhereIn](#where)                                                                                               |
| RetiradosEventos    | [Silenciando eventos](#muting-events)                                                                           |
| Con-basura          | [Query soft delete data](#query-soft-delete-data)                                                               |

## Constructor de consultas

### Inyectar contexto

```go
facades.Orm().WithContext(ctx)
```

### Especificar Conexión de Base de Datos

Si múltiples conexiones de base de datos están definidas en `config/database.go`, puedes usarlas a través de la función `Connection`
de `facades.Orm()`. El nombre de conexión pasado a `Connection` debe ser una de las conexiones configuradas en
`config/database.go`:

```go
facades.Orm().Connection("mañql")
```

### Interfaz de base de datos genérica sql.DB

Interfaz genérica de base de datos sql.DB, luego utilice la funcionalidad que proporciona:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mañql").DB()

// Ping
db.Ping()

// Cerrar
db. lose()

// Devuelve las estadísticas de la base de datos
db.Stats()

// SetMaxIdleConns establece el número máximo de conexiones en el pool de conexiones inactivas
db. etMaxIdleConns(10)

// SetMaxOpenConns establece el número máximo de conexiones abiertas a la base de datos
db. etMaxOpenConns(100)

// SetConnMaxLifetime establece la cantidad máxima de tiempo que una conexión puede ser reutilizada
db.SetConnMaxLifetime(time.Hour)
```

### Obtener Instancia de Base de Datos

Antes de cada operación específica de base de datos, es necesario obtener una instancia de la base de datos.

```go
facades.Orm().Query()
facades.Orm().Connection("mañql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Seleccionar

#### Consulta una línea

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

A veces puede querer realizar alguna otra acción si no se encuentran resultados. El método `FirstOr` devolverá una única instancia del modelo
o, si no se encuentran resultados, ejecutará el cierre dado. Puede establecer los valores a modelo en closure:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Consulta una o varias líneas por ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var users []models. ser
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Error de retorno no encontrado

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Cuando la clave primaria de la tabla de usuario es tipo `string`, necesita especificar la clave primaria cuando se llama

Método `Buscar`

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuuid` = "a";
```

#### Consultar múltiples líneas

```go
var users []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### Recuperar o crear modelos

El método `FirstOrCreate` busca un registro de base de datos usando los pares de columnas y valores especificados. Si el modelo no puede ser
encontrado en la base de datos, crea un nuevo registro con los atributos de combinar el primer argumento con el segundo argumento opcional
.

Del mismo modo, el método `FirstOrNew` también intenta localizar un registro en la base de datos basado en los atributos dados. Sin embargo,
si no se encuentra, se devuelve una nueva instancia del modelo. Es importante tener en cuenta que este nuevo modelo aún no ha sido guardado
en la base de datos y necesitas llamar manualmente al método `Save` para hacerlo.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Nombre: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, modelos. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

var user models. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, modelos. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Error no encontrado

Cuando el elemento solicitado no se encuentra, el método `First` no genera un error. Para generar un error, utiliza el método
`FirstOrFail`:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Donde

```go
facades.Orm().Query().Where("nombre", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("nombre", []any{"a"})
facades. rm().Query().WhereNull("nombre")
facades.Orm().Query().WhereIn("nombre", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("nombre", []any{"a"})
facades.Orm().Query().OrWhereNull("nombre")
facades.Orm().Query().OrWhereIn("nombre", []any{"a"})
```

### Límite

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Desplazamiento

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Pedido

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades. rm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). here("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Paginar

```go
Usuarios var []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &users, &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Consulta única columna

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Especificar consulta de tabla

Si desea consultar algunos datos agregados, necesita especificar una tabla específica.

Especificar un modelo

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Especificar una tabla

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // obtener todos los registros, ya sean eliminados o no
```

### Get SQL

Obtener SQL con marcador de posición:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECTO * FROM "users" WHERE "id" = $1 AND "users"."deleted_at" IS NULL
```

Obtener SQL con valor:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECTO * FROM "users" WHERE "id" = 1 AND "users"."deleted_at" IS NULL
```

Los métodos pueden llamarse después de `ToSql` y `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Contador

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### Especificar Campos

`Select` le permite especificar qué campos recuperar de la base de datos, por defecto el ORM recupera todos los campos.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Agrupar por y tener

```go
type Result struct {
  Name string
  Total int
}

var result Result
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Unirse

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Crear

```go
user := models.User{Nombre: "tom", Age: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT INTO users (name, age, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00");

// No se disparan eventos del modelo
err := facades. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Trigger model events
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### Creación múltiple

```go
users := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users"). reate(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). uery().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` y `updated_at` se llenarán automáticamente.

### Cursor

Puede utilizarse para reducir significativamente el consumo de memoria de su aplicación al iterar a través de decenas de miles de registros de modelo
Eloquent. Ten en cuenta que el método `Cursor` se puede utilizar con `With` al mismo tiempo, por favor
usa [Lazy Eager Loading](./relationships#lazy-eager-loading) para cargar la relación en la lógica `for`.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var user models. ser
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### Guardar modelo

#### Actualizar un modelo existente

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Actualizar columnas

```go
facades.Orm().Query().Model(&models.User{}).Where("nombre", "tom"))[video] pdate("nombre", "hola")
// UPDATE `usuarios` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("nombre", "tom"))[video] pdate(modelos. ser{Nombre: "hola", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("nombre", "tom")parampdate(map[string]any{"name": "hola", "age": 18})
// UPDATE `usuarios` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> Al actualizar con `struct`, Orm sólo actualizará campos que no sean cero. Puede que quieras usar `map` para actualizar atributos o
> usar `Select` para especificar campos a actualizar. Note that `struct` can only be `Model`, if you want to update with non
> `Model`, you need to use `.Table("users")`, however, the `updated_at` field cannot be updated automatically at this
> time.

#### Actualizar o crear

Consulta por `name`, si no existe, crea por `name`, `avatar`, si existe, actualiza `avatar` basado en `name`:

```go
facades.Orm().Query())[video] pdateOrCreate(&user, models.User{Nombre: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` ES NULL ORDER POR `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL AND `id` = 1;
```

### Eliminar

Eliminar por modelo, el número de registros afectados por el comando es devuelto por el método:

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

Borrado múltiple

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE FROM `users` WHERE name = 'tom';
```

Desea forzar la eliminación de datos blandos.

```go
facades.Orm().Query().Where("nombre", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("nombre", "tom").ForceDelete()
facades.Orm().Query().Table("usuarios").Where("nombre", "tom").ForceDelete()
```

Puede eliminar registros con asociaciones de modelo a través de `Select`:

```go
// Delete Account of user when deleting user
facades.Orm().Query().Select("Account").Delete(&user)

// Delete Orders and CreditCards of user when deleting user
facades.Orm().Query().Select("Orders", "CreditCards").Delete(&user)

// Delete all child associations of user when deleting user
facades.Orm().Query().Select(orm.Associations).Delete(&user)

// Delete all Account of users when deleting users
facades.Orm().Query().Select("Account").Delete(&users)
```

Nota: Las asociaciones se eliminarán sólo si la clave principal del registro no está vacía, y Orm utiliza estas teclas
primarias como condiciones para eliminar registros asociados:

```go
// Elimina el usuario que nombre='goravel', pero no borres la cuenta del usuario
facades.Orm().Query().Select("Cuenta").Where("name = ?", "goravel"). elete(&models.User{})

// Elimina el usuario que nombre='goravel' e id = 1, y elimina la cuenta del usuario
facades. rm().Query().Select("Cuenta").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// Elimina el usuario que id = 1 y elimina la cuenta de ese usuario
facades.Orm().Query().Select("Cuenta").Delete(&models.User{ID: 1})
```

Si se ejecuta la eliminación por lotes sin ninguna condición, ORM no lo hace y devuelve un error. Así que tiene que añadir algunas condiciones
o utilizar SQL nativo.

### Consultar datos de borrado suave

```go
var user models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Repetición de filtro

```go
Usuarios var []models.User
facades.Orm().Query().Distinct("nombre").Find(&usuarios)
```

### Conseguir conductor

```go
driver := facades.Orm().Query().Driver()

// Judge driver
if driver == orm.DriverMysql {}
```

### Ejecutar SQL nativo

```go
type Result struct {
  ID int
  Name string
  Age int
}

var result Result
facades. rm().Query().Raw("SELECT id, name, age FROM users WHERE name = ?", "tom").Scan(&resultado)
```

### Ejecutar SQL de actualización nativa

El número de registros afectados por el comando es devuelto por el método:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Existe

```go
var existe bool
facades.Orm().Query().Model(&models.User{}).Where("nombre", "tom").Exists(&existes)
```

### Restaurar

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transacción

Puedes ejecutar una transacción con la función `Transaction`.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

error return facades.Orm().Transaction(func(tx orm.Query) {
  var user models.User

  return tx.Find(&user, user.ID)
})
```

También puede controlar manualmente el flujo de la transacción usted mismo:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Nombre: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Ámbitos

Le permite especificar consultas comúnmente usadas que pueden ser referenciadas cuando se llama al método.

```go
func Paginator(page string, limit string) function (methods orm.Query) orm. uery {
  return func(query orm.Query) orm.Query {
    page, _ := strconv. toi(page)
    limit, _ := strconv. toi(limit)
    offset := (página - 1) * limit

    return query. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator es una función personalizada: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### Expresiones sin procesar

Puedes usar el método `db.Raw` para actualizar los campos:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user))[video] pdate("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Bloqueo pesimista

El generador de consultas también incluye algunas funciones para ayudarte a lograr "bloqueo pesimista" al ejecutar tus proposiciones `select`
.

Para ejecutar una sentencia con un "bloqueo compartido", se puede llamar al método `SharedLock`. Un bloqueo compartido evita que las filas
seleccionadas sean modificadas hasta que su transacción sea confirmada:

```go
Usuarios var []models.User
facades.Orm().Query().Where("votos", ">", 100).SharedLock().Get(&usuarios)
```

Alternativamente, puede utilizar el método `LockForUpdate`. Un bloqueo "para actualizar" evita que los registros seleccionados sean
modificados o sean seleccionados con otro bloqueo compartido:

```go
Usuarios var []models.User
facades.Orm().Query().Where("votos", ">", 100).LockForUpdate().Get(&usuarios)
```

### Sum

```go
var sum int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(suma)
```

## Eventos

Los modelos orm despachan varios eventos, permitiéndole engancharse en los siguientes momentos en el ciclo de vida de un modelo: `Recuperado`,
`Creating`, `Creado`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

El evento `Recuperado` se enviará cuando un modelo existente sea recuperado de la base de datos. Cuando se guarda un nuevo modelo para
la primera vez, los eventos `Creating` y `Created` se enviarán. Los eventos `Updating` / `Updated` enviarán cuando
se modifique un modelo existente y se llame al método `Save`. Los eventos `Saving` / `Saved` enviarán cuando un modelo
sea creado o actualizado - incluso si los atributos del modelo no han sido cambiados. Los nombres de eventos que terminan con `-ing` son
enviados antes de que persistan los cambios en el modelo, mientras que los eventos terminan con `-ed` son enviados después de que los cambios
en el modelo persisten.

Para empezar a escuchar eventos modelos, define un método `DispatchesEvents` en tu modelo. Esta propiedad mapea varios puntos
del ciclo de vida del modelo a sus propias clases de eventos.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm. odel
 Nombre cadena
}

func (u *Usuario) DispatchesEvents() mapea[contractsorm.EventType]func(contractsorm. vent) error {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreating: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.EventSaved: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.EventUpdated: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventDeleting: error {
   return nil
  }(event contractsorm.Event) de función:
  contractsorm. ventEliminado: error {
   return nil
  }(event contractsorm.Event) de funciónformat@@2,
  contractsorm.EventForceDeleting: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventForceDeleted: error de función (event contractsorm.Event) {
   return nil
  },
  contractsorm.EventRetrieved: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventRestored: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestoring: function (event contractsorm.Event) error {
   return nil
  },
 }
}
```

> Nota: Sólo tienes que registrar los eventos que necesitas. Los eventos del modelo no se envían cuando se realizan operaciones por lotes a través de Orm.

### Observadores

#### Definiendo observadores

Si está escuchando muchos eventos en un modelo determinado, puedes usar observadores para agrupar a todos tus oyentes en una única clase
. Las clases observserver tienen nombres de métodos que reflejan los eventos Eloquent que desea escuchar. Cada uno de estos métodos
recibe el modelo afectado como su único argumento. The `make:observer` Artisan command is the easiest way to create a
new observer class:

```shell
ve a ejecutar. artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

Este comando colocará el nuevo observador en tu directorio `app/observers`. Si este directorio no existe, Artisan
lo creará para usted. Tu nuevo observador se verá así:

```go
observadores de paquetes

importar (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Created(event orm. vent) error {
 return nil
}

func (u *UserObserver) actualizado (event orm.Event) error {
 return nil
}

func (u *UserObserver) eliminado (evento orm. vent) error {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) error {
 return nil
}
```

El observador de plantillas sólo contiene algunos eventos, puede añadir otros eventos de acuerdo a sus necesidades.

Para registrar un observador, necesita llamar al método `Observe` en el modelo que desea observar. Puedes registrar observadores
en el método `Boot` de tu aplicación `app/providers/event_service_provider.go::Boot`:

```go
proveedores de paquetes

importar (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

type EventServiceProvider struct {
}

func (receptor *EventServiceProvider) Register(fundación de aplicaciones. pplicación) {
 facades.Event().Register(receiver. isten())
}

func (receptor *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

func (receptor *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Nota: Si estableces `DispatchesEvents` y `Observer` al mismo tiempo, sólo se aplicará `DispatchesEvents`.

#### Parámetro en observador

El parámetro `event` se pasará a todos los observadores:

| Método           | Accin                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Contexto         | Obtener contexto que pasa por `facades.Orm().WithContext()`                                                       |
| Obtener atributo | Obtener el valor modificado, si no se modifica, obtener el valor original, si no hay valor original, devolver nil |
| GetOriginal      | Obtener el valor original, si no hay valor original, devolver nil                                                 |
| Issucia          | Determinar si el campo ha sido modificado                                                                         |
| IsClean          | IsDirty inverso                                                                                                   |
| Consulta         | Obtener una nueva consulta, que se puede utilizar con la transacción                                              |
| SetAttribute     | Establecer un nuevo valor para un campo                                                                           |

### Silenciar eventos

De vez en cuando puede necesitar "silenciar" temporalmente todos los eventos lanzados por un modelo. Puedes lograr esto utilizando el método
`WithoutEvents`:

```go
var user models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Guardando un modelo único sin eventos

A veces se puede "guardar" un modelo determinado sin enviar ningún evento. Puedes completar esto con el método
`SaveQuietly`:

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
