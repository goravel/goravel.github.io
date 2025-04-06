# Relaciones

Es común que las tablas de base de datos estén interconectadas. Por ejemplo, una entrada en un blog puede tener muchos comentarios, o un pedido puede
estar vinculado al usuario que la realizó. `Orm` simplifies managing and dealing with such relationships, and it can handle
various common relationships:

- [Uno a Uno](#one-to-one)
- [Uno a muchos](#one-to-many)
- [Mucho a muchos] (#Many-To-Many)
- [Polymorphic](#polymorphic)

## Definiendo relaciones

### Uno a Uno

Una relación uno a uno es un tipo muy básico de relación de base de datos. Por ejemplo, un modelo `User` podría estar asociado
con un modelo `Phone`.

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Teléfono *Teléfono
}

escribe Teléfono {
  orm. odel
  uint UserID
  Cadena de nombre
}
```

Cuando se usa `Orm`, automáticamente asigna la clave foránea a la relación basada en el nombre del modelo padre. Para la instancia
, se asume que el modelo `Phone` tiene una clave foránea `UserID` por defecto. Sin embargo, si deseas cambiar esta convención
, puedes añadir una etiqueta `foreignKey` al campo `Teléfono` en el modelo `User`. (Esto también se aplica a otras relaciones
.)

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Teléfono *`gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm. odel
  Cadena UserName
  Cadena de nombre
}
```

Además, cuando se usa `Orm`, se asume que la clave foránea debe coincidir con la columna de clave primaria del padre.
Esto significa que `Orm` buscará el valor de la columna `ID` del usuario en la columna `UserId` del registro `Phone`. Si usted
desea utilizar un valor de clave principal distinto de `ID`, puedes añadir una referencia "Etiqueta" al campo `Teléfono` en el modelo `User`. To
do this, simply pass a third argument to the `hasOne` method. (Otras configuraciones de relaciones son similares)

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Teléfono *Teléfono `gorm:"foreignKey:UserName; eferences:name"`
}

type Phone struct {
  orm. odel
  Cadena UserName
  Cadena de nombre
}
```

#### Definir lo inverso de la relación

Podemos acceder al modelo `Phone` desde nuestro modelo `User`. Ahora, necesitamos establecer una relación en el modelo `Phone` que
nos permita acceder al propietario del teléfono. Para hacer esto, podemos definir un campo `User` en el modelo `Phone`.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  UserID uint
  Nombre cadena
  Usuario *Usuario
}
```

### Uno a Muchos

Una relación de uno a muchos se utiliza para definir relaciones donde un modelo individual es el padre de uno o más modelos hijos
. Por ejemplo, una entrada en un blog puede tener un número infinito de comentarios. Como todas las demás relaciones `Orm`,
relaciones uno-a-muchos se definen definiendo un campo en tu modelo `Orm`:

```go
type Post struct {
  orm. odel
  Nombre cadena
  Comentarios []*Comentario
}

tipo Comentario {
  orm. odel
  uint de PostID
  cadena de nombre
}
```

Recuerda, `Orm` determinará automáticamente la columna de clave foránea apropiada para el modelo `Comentario`. Por convención, Orm
tomará el nombre del "caso molesto" del modelo padre y lo sufijo con `ID`. Así que, en este ejemplo, Orm asumirá que la columna
clave foránea en el modelo `Comentario` es `PostID`.

### Uno a Muchos (Inverse) / Below A

Ahora que podemos acceder a todos los comentarios de una publicación, vamos a definir una relación para permitir que un comentario acceda a su publicación
padre. Para definir el inverso de una relación `Uno a muchos`, define un método de relación en el modelo secundario que llama
el método `belongsTo`:

```go
type Post struct {
  orm. odel
  Nombre cadena
  Comentarios []*Comentario
}

tipo Comentario {
  orm. odel
  uint PostID
  Nombre cadena
  Post *Post
}
```

## Relaciones entre muchos y muchos

Las relaciones muchos-a-muchos son ligeramente más complicadas que las relaciones `One To One` y `One To Muy`. Un ejemplo de una relación
muchos-a-muchos es un usuario que tiene muchos roles y esos roles también son compartidos por otros usuarios en la aplicación
. Por ejemplo, un usuario puede ser asignado el rol de "Author" y "Editor"; sin embargo, esos roles también pueden estar asignados
a otros usuarios. Por lo tanto, un usuario tiene muchos roles y un rol tiene muchos usuarios.

### Estructura de tabla

Para definir esta relación, se necesitan tres tablas de base de datos: `users`, `roles`, y `role_user`. La tabla `role_user` nomenclatura
puede ser personalizada y contiene columnas `user_id` y `role_id`. Esta tabla se utiliza como una tabla intermedia
vinculando usuarios y roles.

Recuerda, dado que un rol puede pertenecer a muchos usuarios, no podemos simplemente colocar una columna `user_id` en la tabla `roles`. Esta
significaría que un rol solo podría pertenecer a un solo usuario. Para proporcionar soporte para roles asignados a
múltiples usuarios, se necesita la tabla `role_user`. Podemos resumir la estructura de la tabla de la relación así:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_id - integer
  role_id - integer - entero
```

### Estructura del modelo

Podemos definir un campo `Roles` en el modelo `User`:

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Rol []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Nombre cadena
}
```

### Definir lo inverso de la relación

Para definir el reverso de la relación, simplemente define un campo `Users` en el modelo `Role` y añade un Tag.

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Rol []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Nombre cadena
  Usuarios []*Usuario `gorm:"many2many:role_user"`
}
```

### Tabla intermedia personalizada

En general, la clave foránea de la tabla intermedia es nombrada por el "snake case" del nombre del modelo padre, puedes sobrescribir
ellos por `joinForeignKey`, `joinReferences`:

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Rol []*Rol `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

type Role struct {
  orm. odel
  Nombre cadena
}
```

Estructura de tabla:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_name - integer
  role_name - integer
```

## Polimórfico

Una relación polimórfica permite al modelo hijo pertenecer a más de un tipo de modelo utilizando una sola asociación.
Por ejemplo, imagina que estás construyendo una aplicación que permite a los usuarios compartir entradas y videos de blog. En una aplicación
, un modelo `Comentario` podría pertenecer tanto a los modelos `Post` como `Video`.

### Estructura de tabla

Una relación polimórfica es similar a una relación normal; sin embargo, el modelo hijo puede pertenecer a más de un tipo de modelo
usando una sola asociación. Por ejemplo, un blog `Post` y un `User` pueden compartir una relación polimórfica con un modelo `Image`
. Usar una relación polimórfica le permite tener una sola tabla de imágenes únicas que pueden estar asociadas con las publicaciones
y usuarios. Primero, examinemos la estructura de la tabla:

```
posts
  id - integer
  name - string

videos
  id - integer
  name - string

images
  id - integer
  url - string
  imageable_id - integer
  imageable_type - string

comments
  id - integer
  body - text
  commentable_id - integer
  commentable_type - string
```

Ten en cuenta las columnas `imageable_id` y `imageable_type` en la tabla `images`. La columna `imageable_id` contendrá el valor
ID del post o usuario, mientras que la columna `imageable_type` contendrá el nombre de clase del modelo padre. La columna
`imageable_type` es utilizada por Orm para determinar qué "tipo" del modelo padre retornar al acceder a la relación
`imageable`. La tabla `comentarios` es similar.

### Estructura del modelo

A continuación, vamos a examinar las definiciones de modelo necesarias para construir esta relación:

```go
type Post struct {
  orm. odel
  Nombre cadena
  Imagen *Imagen `gorm:"polymorphic:Imageable"`
  Comentarios []*Comentario `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm. odel
  Nombre cadena
  Imagen *Imagen `gorm:"polymorphic:Imageable"`
  Comentarios []*Comentario `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  Name string
  ImageableID uint
  ImageableType string
}

type Comment struct {
  orm. odel
  Name string
  CommentableID uint
  CommentableType string
}
```

Puedes cambiar el valor polimórfico por la etiqueta `polymorphicValue`, como:

```go
type Post struct {
  orm.Model
  Name string
  Image *Image `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Consultando Asociaciones

Por ejemplo, imagina una aplicación de blog en la que un modelo `User` tiene muchos modelos `Post` asociados:

```go
tipo Estructura de usuario {
  orm. odel
  Nombre cadena
  Mensajes []*Post
}

type Post struct {
  orm. odel
  uint UserID
  Cadena de nombre
}
```

### Crear o actualizar asociaciones

Puede utilizar los métodos `Select`, `Omit` para controlar la creación y actualización de asociaciones. These two method cannot be
used at the same time and the associated control functions are only applicable to `Create`, `Update`, `Save`:

```go
user := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Crear todas las asociaciones secundarias mientras se crea el usuario
facades. rm().Query().Select(orm.Associations).Create(&user)

// Sólo crear Post al crear Usuario. Nota: Si no utiliza `orm.Associations`, pero personaliza las asociaciones de niños específicas por separado, todos los campos del modelo padre también deberían estar listados en este momento.
facades.Orm().Query().Select("Nombre", "Posts"). reate(&user)

// Al crear un usuario, ignora el Post, pero crea todas las otras asociaciones secundarias
facades.Orm().Query(). mit("Posts").Create(&user)

// Al crear Usuario, ignora el campo Nombre, pero crea todas las asociaciones secundarias facades
. rm().Query().Omit("Nombre").Create(&user)

// Al crear Usuario, ignorar el campo Nombre y todas las asociaciones secundarias
facades.Orm().Query().Omit("Nombre", orm.Associations).Create(&user)
```

### Buscar Asociaciones

```go
// Encuentra todos los registros relacionados que coincidan
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Encuentra asociaciones con las condiciones
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Añadir asociaciones

Añadir nuevas asociaciones para `Muchos a muchos`, `Uno a muchos`, reemplazar la asociación actual para `Uno a One`,
`Uno a One(revers)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Reemplazar asociaciones

Reemplaza las asociaciones actuales con las nuevas:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Eliminar Asociaciones

Eliminar la relación entre el origen y los argumentos si existe, sólo eliminar la referencia, no eliminará esos objetos de
DB, la clave foránea debe ser NULL:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Limpiar asociaciones

Eliminar toda referencia entre origen y asociación, no eliminará esas asociaciones:

```go
facades.Orm().Query().Model(&usuario).Association("Posts").Clear()
```

### Contar Asociaciones

Devolver el recuento de las asociaciones actuales:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Cuenta con condiciones
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Association("Posts").Count()
```

### Datos de Lote

```go
// Encuentra todos los roles para todos los usuarios
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Elimina el usuario A de todas las fachadas
de los posts. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Obtener un conteo distinto de las fachadas
de los mensajes de todos los usuarios. rm().Query().Model(&users).Association("Posts"). ount()

// Para `Append`, `Replace` con datos por lotes, la longitud de los argumentos debe ser igual a la longitud de los datos o devolverá un error
var users = []modelos. ser{user1, user2, user3}

// Tenemos 3 usuarios, añadir userA al equipo del usuario1, añadir userB al equipo de user2, añadir userA, userB y userC a las facades
del equipo de user3. rm().Query().Model(&users).Association("Equipo").Append(&userA, &userB, &[]modelos. ser{userA, userB, userC})

// Restablecer el equipo del usuario 1 a userA,restablecer el equipo del usuario 2 a userB, restablecer el equipo del usuario 3 a las fachadas userA, userB y userC
. rm().Query().Model(&users).Association("Equipo").Replace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Carga temprana

Facilidades de carga para la consulta de múltiples modelos, y para el problema de la consulta "N + 1". Para ilustrar el problema N +
1, considere un modelo `Book` que "pertenece a" un modelo `Author`:

```go
type Author struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  Name string
  Author *Author
}
```

Ahora, recuperemos todos los libros y sus autores:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Para recuperar todos los libros de la tabla de base de datos junto con sus autores, el código del bucle ejecuta una consulta para cada libro.
Esto significa que para una colección de 25 libros, el bucle ejecutaría 26 consultas: una para la colección de libros y 25
más para obtener el autor de cada libro.

Sin embargo, podemos simplificar este proceso utilizando una carga ansiosa. Al usar el método `With`, podemos especificar las relaciones
que necesitan ser cargadas con entusiasmo y reducir el número de consultas a solo dos.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

for _, book := range books {
  fmt.Println(book.Author)
}
```

For this operation, only two queries will be executed - one query to retrieve all books and one query to retrieve
authors for all of the books:

```sql
select * from `libros`;

select * from `authors` where `id` in (1, 2, 3, 4, 5, ...);
```

### Carga Previa de Relaciones Múltiples

A veces puede que necesites cargar con ansia varias relaciones diferentes. Para hacerlo, simplemente llama al método `With` múltiples
veces:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Carga Anidada

Para cargar con ansia las relaciones de una relación, se puede utilizar la sintaxis de "punto". Por ejemplo, cargemos con impaciencia todos los autores
del libro y todos los contactos personales del autor:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Restringiendo Cargas Antiguas

A veces puede desear cargar una relación con impaciencia, pero también especificar condiciones de consulta adicionales para la carga ansiosa
consulta. Puedes conseguir esto a continuación:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

En este ejemplo, Orm sólo cargará publicaciones ansiosas donde la columna `name` del post sea igual a la palabra `author`.

### Carga perezosa

A veces puede que necesite cargar una relación ansiosa después de que el modelo padre ya ha sido recuperado. Por ejemplo, esta
puede ser útil si necesitas decidir dinámicamente si cargar modelos relacionados:

```go
var books models.Book
facades.Orm().Query(). ind(&books)

for _, book := range books {
  if someCondition {
    err := facades. rm().Query().Load(&book, "Autor")
  }
}
```

Si necesita establecer restricciones de consulta adicionales en la consulta de carga ansiosa, puede utilizar el código siguiente:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Para cargar una relación sólo cuando no ha sido cargada, utiliza el método `LoadMissing`:

```go
facades.Orm().Query().LoadMissing(&book, "Author")
```
