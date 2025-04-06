# Fábricas

Al probar su aplicación o sembrar su base de datos, podría ser necesario insertar algunos registros en su base de datos
de antemano. En lugar de introducir manualmente valores para cada columna, Goravel te permite definir un conjunto de atributos
predeterminados para cada uno de tus modelos mediante la creación de fábricas de modelos.

Para ver un ejemplo de cómo escribir una fábrica, puedes revisar el archivo `user_factory.go` ubicado en el directorio
`database/factories` de tu aplicación.

```go
fábricas de paquetes

type UserFactory struct {
}

// Definición Definición del estado predeterminado del modelo.
func (f *UserFactory) Definition() mapa[string]cualquier {
  return map[string]any{
    "Nombre": "Goravel",
  }
}
```

Como puedes ver, en su forma más básica, las fábricas son estructuras que tienen un método `Definition`. El método devuelve el conjunto predeterminado
de valores de atributos que deben utilizarse al crear un modelo con la fábrica. Para generar un rango de datos aleatorios
, puedes confiar en [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Generando Fábricas

Para crear una fábrica, ejecuta el comando Artisan 'make:factory':

```
go run . artisan make:factory PostFactory
```

La nueva fábrica `struct` se colocará en tu directorio `database/factories`.

### Convenciones de descubrimiento de modelos y fábricas

Después de definir una fábrica, puede utilizar el método `Factory()` en el modelo para enlazar la fábrica al modelo:

```go
los modelos de paquete

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/factories"
)

type User struct {
  orm. odel
  Nombre cadena
  Cadena de avatar
  orm. oftDeletes
}

func (u *Usuario) Factory() factory.Factory {
  return &factories)[video] serFactory{}
}
```

## Crear modelos usando fábricas

### Instanciando Modelos

Podemos usar el método `Make` para crear modelos sin persistir en la base de datos:

```go
var user models.User
err := facades.Orm().Factory().Make(&user)
```

Puede crear una colección de muchos modelos utilizando el método `Count`:

```go
Usuarios de var []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Si desea sobrescribir algunos de los valores predeterminados de sus modelos, puede pasar `map[string]any` al método `Make`
. Solo los atributos especificados serán reemplazados mientras que el resto de los atributos permanezcan establecidos a sus valores
predeterminados especificados por la fábrica:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Modelos persistentes

El método `Create` crea y guarda las instancias de los modelos en la base de datos utilizando el método `Save` de Orm.

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Puedes sobrescribir los atributos por defecto de la fábrica pasando `map[string]any` de los atributos al método `Create`
:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Evento Modelo Ignorar

Puede haber [evento modelo](../orm/quickstart#events) definido en el modelo, puedes ignorar esos eventos con el método
`CreateQuietly`:

```go
var user models.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
