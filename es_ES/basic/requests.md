# Peticiones HTTP

El método `contracts/http/Request` de Goravel puede interactuar con la solicitud HTTP actual procesada por la aplicación,
y obtener la entrada y los archivos presentados juntos.

## Interactuando con la solicitud

La instancia de `http.Context` se inyecta automáticamente en el controlador:

```go
importar "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Recuperar la ruta de la solicitud

```go
ruta := ctx.Request().Path() // /users
```

### Recuperar la URL de la solicitud

```go
url := ctx.Request())[video] rl() // /users?name=Goravel
```

### Recuperando el HOST de la solicitud

```go
url := ctx.Request().Host()
```

### Recuperando la URL completa de la solicitud

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Recuperando el método de solicitud

```go
método := ctx.Request().Method()
```

### Solicitar cabeceras

```go
cabecera := ctx.Request().Header("X-Header-Name", "default")
cabeceras := ctx.Request().Headers()
```

### Solicitar dirección IP

```go
ip := ctx.Request().Ip()
```

## Input

### Recuperando todos los datos de entrada

Puedes recuperar todos los datos de entrada de la solicitud como `map[string]any` usando el método `All`, que es una colección
de `json`, `form` y `query`(prioridad de frente a atrás).

```go
datos := ctx.Request().All()
```

### Recuperando un valor de ruta

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Recuperar entrada de la cadena de consulta

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
name := ctx.Request().QueryInt64("id")
name := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
names := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
names := ctx.Request().QueryMap("names")

queries := ctx.Request().Queries()
```

> Nota: Sólo se pueden obtener datos Json unidimensionales, de lo contrario se devolverá vacío.

### Recuperar un valor de entrada

Acceda a toda la entrada del usuario sin preocuparse por qué verbo HTTP fue utilizado para la solicitud. Recuperar orden: `json`,
`form`.

```go
name := ctx.Request().Input("name")
name := ctx.Request().Input("name", "goravel")
name := ctx.Request().InputInt("name")
name := ctx.Request(). nputInt64("name")
name := ctx.Request().InputBool("name")
name := ctx.Request().InputArray("name")
name := ctx.Request().InputMap("name")
```

### Enlazar Json/Formulario

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user User
err := ctx.Request().Bind(&user)
```

```go
var user map[string]cualquier
err := ctx.Request().Bind(&user)
```

### Enlazar Consulta

Solo soporta bind Query a struct:

```go
type Test struct {
  ID string `form:"id"`
}
var test
err := ctx.Request().BindQuery(&test)
```

## Galleta

### Recuperando un valor de cookie

Goravel proporciona una forma sencilla de trabajar con `cookie`. Usa el método `Cookie` en la instancia `Request` para recuperar un valor
`cookie`, devolverá una cadena vacía si `cookie` no está presente. También puede definir un valor por defecto en el segundo argumento
.

```go
value := ctx.Request().Cookie("name")
value := ctx.Request().Cookie("name", "default") 
```

## Fichero

### Recuperando archivo

```go
file, err := ctx.Request().File("file")
```

### Guardar archivo

```go
file, err := ctx.Request().File("file")
file.Store("./public")
```

### Solicitud de origen

```go
request := ctx.Request().Origin()
```

### Adjuntar datos

```go
ctx.WithValue("user", "Goravel")
```

### Obtener datos

```go
user := ctx.Value("usuario")
```

### Obtener Contexto

```go
ctx := ctx.Context()
```

## Recuperación personalizada

Puedes establecer un `recovery` personalizado llamando al método `Recover` en el archivo `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receptor *RouteServiceProvider) Boot(app foundation.Application) {
  // Añadir HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // o
    // ctx.Response(). tring(500, "Error interno del servidor").Abort()
  })
  ...
}
```
