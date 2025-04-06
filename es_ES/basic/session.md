# Sesión

La sesión le permite almacenar información de usuario a través de múltiples peticiones, proporcionando una experiencia de estado dentro del protocolo HTTP
inherentemente sin estado. Esta información de usuario se almacena persistentemente en el lado del servidor. Goravel offers a
unified interface for interacting with various persistent storage drivers.

## Configuración

El archivo de configuración `session` se encuentra en `config/session.go`. El controlador predeterminado es `file`, el cual almacena las sesiones
en el directorio `storage/framework/sessions`. Goravel te permite crear un controlador personalizado `session` implementando
la interfaz `contracts/session/driver`.

### Registrar Middleware

De forma predeterminada, Goravel no inicia una sesión automáticamente. Sin embargo, proporciona middleware para iniciar una sesión. You can
register the session middleware in the `app/http/kernel.go` file to apply it to all routes, or you can add it to
specific routes:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
) Func

(kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Interactuando con la sesión

### Recuperando datos

Puede utilizar el método `Get` para recuperar los datos de la sesión. Si el valor no existe, se devolverá `nil`.

```go
value := ctx.Request().Session().Get("key")
```

También puede pasar un valor por defecto como segundo argumento al método `Get`. Este valor será devuelto si la clave
especificada no existe en la sesión:

```go
value := ctx.Request().Session().Get("key", "default")
```

### Recuperando todos los datos

Si desea recuperar todos los datos de la sesión, puede utilizar el método `All`:

```go
datos := ctx.Request().Session().All()
```

### Recuperando un subconjunto de datos

Si desea recuperar un subconjunto de los datos de la sesión, puede utilizar el método `Only`:

```go
data := ctx.Request().Session().Only([]string{"username", "email"})
```

### Determinar si un elemento existe en la sesión

Para determinar si un elemento está presente en la sesión, puede utilizar el método `Has`. El método `Has` devuelve `true` si el elemento
está presente y no es `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Para determinar si un elemento está presente e incluso si es `nil`, puedes usar el método `Existas`:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Para determinar si un elemento no está presente en la sesión, puede utilizar el método `Missing`:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Almacenando datos

Puede utilizar el método `Put` para almacenar datos en la sesión:

```go
ctx.Request().Session().Put("key", "value")
```

### Recuperando y eliminando datos

Si desea recuperar un elemento de la sesión y luego eliminarlo, puede utilizar el método `Pull`:

```go
value := ctx.Request().Session().Pull("key")
```

### Eliminando datos

El método `Forget` se puede utilizar para eliminar una porción de datos de la sesión. Si desea eliminar todos los datos de
la sesión, puede utilizar el método `Flush`:

```go
ctx.Request().Session().Forget("nombre de usuario", "email")

ctx.Request().Session().Flush()
```

### Regenerar el ID de sesión

La regeneración del ID de sesión se realiza a menudo para evitar que los usuarios maliciosos exploten un ataque de fijación de sesión
a su aplicación. Puede regenerar el ID de sesión utilizando el método `Regenerate`:

```go
ctx.Request().Session().Regenerate()
```

Si desea regenerar el ID de sesión y olvidar todos los datos que estaban en la sesión, puede utilizar el método `Invalidate`
:

```go
ctx.Request().Session().Invalidate()
```

Luego, necesita guardar la nueva sesión en la cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Nombre: ctx.Request().Session().GetName(),
  Valor: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  ruta: facades.Config().GetString("sesión. ath"),
  Dominio: facades.Config().GetString("session.domain"),
  Seguro: facades.Config().GetBool("sesión. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Datos Flash

Los datos Flash son datos de sesión que sólo estarán disponibles durante la petición HTTP posterior, y luego serán eliminados.
Los datos Flash son útiles para almacenar mensajes temporales como mensajes de estado. You may use the `Flash` method to store
flash data in the session:

```go
ctx.Request().Session().Flash("status", "Tarea fue exitosa!")
```

Si desea guardar sus datos flash alrededor para una petición adicional, puede utilizar el método `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Si desea conservar datos flash específicos para una petición adicional, puede utilizar el método `Keep`:

```go
ctx.Request().Session().Keep("status", "username")
```

Si desea conservar datos específicos para su uso inmediato, puede utilizar el método `Now`:

```go
ctx.Request().Session().Now("status", "Tarea fue exitosa!")
```

## Interactuando con el administrador de sesiones

### Construir una sesión personalizada

Usa la fachada `Session` para construir una sesión personalizada. La fachada `Session` proporciona el método `BuildSession`, que toma
una instancia del controlador y un ID de sesión opcional si desea especificar un ID de sesión personalizado:

```go
importar "github.com/goravel/framework/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Añadir controladores de sesión personalizados

#### Implementar el conductor

Para implementar un controlador de sesión personalizado, el controlador debe implementar la interfaz `contracts/session/driver`.

```go
// Driver is the interface for Session handlers.
type Driver interface {
  // Close closes the session handler.
  Close() error
  // Destroy destroys the session with the given ID.
  Destroy(id string) error
  // Gc performs garbage collection on the session handler with the given maximum lifetime.
  Gc(maxLifetime int) error
  // Open opens a session with the given path and name.
  Open(path string, name string) error
  // Read reads the session data associated with the given ID.
  Read(id string) (string, error)
  // Write writes the session data associated with the given ID.
  Write(id string, data string) error
}
```

#### Registrar el conductor

Después de implementar el driver, necesita registrarlo en Goravel. Puedes hacer esto usando el método `Extend` del
`facades.Session`. Debes llamar al método `Extend` en el método `boot` de `app/providers/app_service_provider.go`:

```go
importar "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Una vez que el controlador está registrado, puedes usarlo estableciendo la opción `driver` en el archivo de configuración de sesión a
`redis` o estableciendo la variable de entorno `SESSION_DRIVER` a `redis`.

### Recuperando instancia del controlador

Utilice el método `Driver` para recuperar la instancia del controlador del gestor de sesiones. Acepta un nombre de controlador opcional, si
no proporcionado, devuelve la instancia de controlador predeterminada:

```go
driver, err := facades.Session().Driver("file")
```

### Iniciando una nueva sesión

```go
session := facades.Session().BuildSession(driver)
session.Start()
```

### Guardando los datos de la sesión

```go
session := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Adjuntar la sesión a la solicitud

```go
session := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Comprobando si la solicitud tiene sesión

```go
if ctx.Request().HasSession() {
    //
}
```
