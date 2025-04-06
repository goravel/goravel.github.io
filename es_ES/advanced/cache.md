# Caché

Goravel proporciona un módulo de caché expandible que puede ser operado usando `facades.Cache()`. Goravel viene con un controlador
`memory`, para otros controladores, por favor revisa los paquetes de extensión independientes:

| Conductor | Enlace                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Redis     | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Configuración

Crea todas las configuraciones personalizadas en `config/cache.go`.

## Uso de caché

### Inyectar contexto

```go
facades.Cache().WithContext(ctx)
```

### Acceder a múltiples tiendas de caché

Puede acceder a varias tiendas de caché mediante el método `Store`. La clave pasada al método `Store` debe corresponder a
una de las tiendas listadas en el array de configuración "stores" en el archivo de configuración de tu caché:

```go
value := facades.Cache().Store("redis").Get("foo")
```

### Recuperar elementos de la caché

```go
value := facades.Cache().Get("goravel", "default")
value := facades.Cache().GetBool("goravel", true)
value := facades.Cache().GetInt("goravel", 1)
value := facades.Cache().GetString("goravel", "default")
```

Puede pasar una `func` como valor predeterminado. Si los datos especificados no existen en la caché, el resultado de `func` será devuelto
. El método de cierre transitorio le permite obtener valores predeterminados de la base de datos u otros servicios externos
. Tenga en cuenta la estructura de cierre `func() any`.

```go
value := facades.Cache().Get("goravel", func() cualquier {
    return "default"
})
```

### Comprobando la existencia del elemento

```go
bool := facades.Cache().Has("goravel")
```

### Incrementar / Reducir Valores

Los métodos `Increment` y `Decrement` pueden utilizarse para ajustar el valor de elementos enteros en la caché. Ambos métodos
aceptan un segundo argumento opcional que indica la cantidad por la que incrementar o disminuir el valor del artículo:

```go
facades.Cache().Increment("key")
facades.Cache().Increment("key", amount)
facades.Cache().Decrement("key")
facades.Cache().Decrement("key", amount)
```

### Recuperar y tienda

A veces puedes querer obtener datos de la caché, y cuando el elemento de caché solicitado no existe, el programa puede
almacenar un valor predeterminado para usted.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Segundo, func() (any, error) {
    return "goravel", nil
})
```

Si los datos que quieres no existen en la caché, se ejecutará el cierre pasado al método `Recordar`, y luego
el resultado será devuelto y colocado en la caché.

Puedes usar el método `RememberForever` para recuperar datos de la caché o guardarlo permanentemente:

```go
value, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Recuperar y eliminar

```go
value := facades.Cache().Pull("goravel", "default")
```

### Almacenar elementos en el caché

```go
err := facades.Cache().Put("goravel", "value", 5*time.Segundd)
```

Si el tiempo de caducidad de la caché se establece en `0`, la caché será válida para siempre:

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### Guardar si no está presente

El método `Agregar` almacena datos sólo si no está en la caché. Devuelve `true` si el almacenamiento tiene éxito y `falso` si
no lo es.

```go
bool := facades.Cache().Add("goravel", "value", 5*time.Segundd)
```

### Almacenar objetos para siempre

El método `Forever` se puede utilizar para almacenar datos persistentemente en la caché. Because these data will not expire, they must
be manually deleted from the cache through the `Forget` method:

```go
bool := facades.Cache().Forever("goravel", "value")
```

### Eliminando elementos de la caché

```go
bool := facades.Cache().Forget("goravel")
```

Puedes usar el método `Flush` para borrar todos los cachés:

```go
bool := facades.Cache().Flush()
```

## Bloques atómicos

### Gestionando bloqueos

Las cerraduras atómicas permiten la manipulación de cerraduras distribuidas sin preocuparse por las condiciones de la carrera. You may create and
manage locks using the `Lock` method:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Bloquear adquirido durante 10 segundos...

    lock.Release()
}
```

El método `Get` también acepta un cierre. Después de ejecutar el cierre, Goravel liberará automáticamente el bloqueo:

```go
facades.Cache().Lock("foo").Get(func () {
    // Bloqueo adquirido durante 10 segundos y lanzado automáticamente...
});
```

Si el bloqueo no está disponible en el momento de solicitarlo, puedes indicar a Goravel que espere un número especificado de
segundos. Si el bloqueo no puede ser adquirido dentro del límite de tiempo especificado, devolverá `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Segundd)
// Bloquear adquirido después de esperar un máximo de 5 segundos...
if (lock.Block(5*time.secondd)) {
    lock.Release()
}
```

El ejemplo anterior puede simplificarse pasando un cierre al método `Block`. Cuando se pasa un cierre a este método,
Goravel intentará adquirir el bloqueo por el número especificado de segundos y liberará automáticamente el bloqueo
una vez que se haya ejecutado el cierre:

```go
facades.Cache().Lock("foo", 10*time.Segundo).Block(5*time.Segundo, func () {
    // Bloqueo adquirido después de esperar un máximo de 5 segundos...
})
```

Si desea liberar un bloqueo sin respetar a su propietario actual, puede utilizar el método `ForceRelease`:

```go
facades.Cache().Lock("procesando").ForceRelease();
```

## Añadiendo controladores de caché personalizados

### Configuración

Si desea definir un controlador completamente personalizado, puede especificar el tipo de controlador `custom` en el archivo de configuración `config/cache.go`
.
Luego incluye una opción `via` para implementar una interfaz `framework/contracts/cache/Driver`:

```go
//config/cache. o
"stores": map[string]interface{}{
    "memory": map[string]any{
        "driver": "memory",
    },
    "custom": mapear interfaz[string]{}{
        "driver": "custom",
        "vía": &Logger{},
    },
},
```

### Implementar controlador personalizado

Implementar la interfaz `framework/contracts/cache/Driver`, los archivos pueden almacenarse en la carpeta `app/extensions` (
modificable).

```go
// framework/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Agrega un elemento en la caché si la clave no existe.
    Añadir(cadena de clave, valor alguno, t tiempo. uración) bool
    Decrement(cadena de clave, valor ... nt) (int, error)
    // Controlar un elemento indefinidamente en la caché.
    Forever(key string, value any) bool
    // Olvida eliminar un elemento de la caché.
    Forget(key string) bool
    // Borrar todos los elementos de la caché.
    Flush() bool
    // Obtener un elemento de la caché por clave.
    Get(key string, def . .any) cualquier
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... tring) cadena
    // Ha comprobado que existe un elemento en la caché.
    Has(key string) bool
    Increment(key string, value. .int) (int, error)
    Lock(key string, t ...time. uration) Lock
    // Coloca un elemento del controlador en la caché por un tiempo.
    Put(cadena de clave, valor alguno, t tiempo. uration) error
    // Recuperar un elemento de la caché y eliminarlo.
    Pull(key string, def ... ny) cualquier
    // Recuerda Obtener un elemento de la caché, o ejecutar el Closure dado y almacenar el resultado.
    Recuerde (cadena clave, tiempo ttl. uration, callback func() (any, error)) (any, error)
    // Recordar para siempre Obtener un elemento de la caché, o ejecute el Closure dado y almacene el resultado para siempre.
    RecordarForever(cadena de clave, función callback () (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
