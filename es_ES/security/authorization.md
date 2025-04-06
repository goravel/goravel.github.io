# Autorización

Goravel offers built-in [authentication](./authentication) services and an easy-to-use authorization feature to
manage user actions on resources. Incluso si un usuario está autenticado, puede que no tenga la autoridad para modificar o eliminar
ciertos modelos Eloquent o registros de base de datos. La función de autorización de Goravel permite una forma sistemática de gestionar
estas comprobaciones de autorización.

Hay dos maneras de autorizar acciones en Goravel: [gates](#gates) y [policies](#policies). Imagina que las compuertas y las políticas
son similares a las rutas y controladores. Las puertas se basan en cierres y proporcionan un enfoque simple para la autorización
, mientras que las políticas agrupan la lógica alrededor de un recurso específico, similar a los controladores. This documentation will
first cover gates and then delve into policies.

No es necesario utilizar exclusivamente compuertas o políticas cuando se construye una aplicación. Most applications will use a
combination of both, which is perfectly acceptable!

## Puerta

### Puertas escritas

Gates sirve como cierres que verifican si un usuario está autorizado a realizar una acción específica. Son comúnmente configurados como
en el método `Boot` del archivo `app/providers/auth_service_provider.go` usando la facade Gate.

En este escenario, estableceremos una puerta para comprobar si un usuario puede modificar un modelo Post determinado comparando su ID con
el user_id del creador del post.

```go
proveedores de paquetes

importar (
  "context"

  contractsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (receptor *AuthServiceProvider) Register(fundación de aplicaciones. pplicación) {

}

func (receptor *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Define("update-post",
    func(ctx context.Context, arguments map[string]any) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(modelos. ost)

      if user.ID == post.UserID {
        return access. ewAllowResponse()
      } else {
        acceso de retorno. ewDenyResponse("error")
      }
    },
  )
}
```

### Acciones autorizadas

Para autorizar una acción usando compuertas, debe utilizar los métodos `Permitidos` o `Denies` proporcionados por la fachada Gate:

```go
package controllers

import (
  "github.com/goravel/framework/facades"
)

type UserController struct {

func (r *UserController) Show(ctx http.Context) http.Response {
  var post models.Post
  if facades.Gate().Allows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

Puedes autorizar múltiples acciones simultáneamente utilizando los métodos `Any` o `Ninguno`.

```go
si facades.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // El usuario puede actualizar o eliminar el mensaje. .
}

si se fachan. ate().ichard ([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // El usuario no puede actualizar o eliminar el post. .
}
```

### Respuestas de puerta

El método `Allows` devuelve un valor booleano. Para obtener la respuesta completa de autorización, utiliza el método `Inspect`.

```go
response := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // La acción está autorizada...
} else {
    fmt.Println(response.Message())
}
```

### Interceptando cheques de puerta

A veces, es posible que desees conceder todas las capacidades a un usuario específico. Puede definir un cierre utilizando el método `Before`,
que se ejecuta antes de cualquier otra comprobación de autorización:

```go
facades.Gate().Before(func(ctx context.Context, cadena de habilidad, argumentos mapean[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Si el cierre de `Before` devuelve un resultado no nulo, ese resultado será considerado el resultado de la comprobación de autorización.

El método `After` se puede utilizar para definir un cierre que se ejecutará después de todas las demás comprobaciones de autorización.

```go
facades.Gate().After(func(ctx context.Context, cadena de habilidad, argumentos mapean[string]ninguno, resultado contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Aviso: El resultado de retorno de `After` se aplicará sólo cuando `facades.Gate().Define` regrese nil.

### Inyectar contexto

El `context` será pasado a los métodos `Before`, `After`, y `Define`.

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## Políticas

### Generar políticas

Puedes usar el comando 'make:policy' Artisan para generar una política. La política generada se guardará en el directorio
`app/polices`. Si el directorio no existe en tu aplicación, Goravel lo creará para ti.

```go
go run . artisan make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### Políticas de escritura

Vamos a definir un método `Update` en `PostPolicy` para comprobar si un `User` puede actualizar un `Post`.

```go
políticas de paquete

importar (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, argumentos mapean[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("You do not own this post.")
  }
}
```

Entonces podemos registrar la política en `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", polices.NewPostPolicy())[video] pdate)
```

A medida que trabajas en autorizar diferentes acciones, puedes añadir más métodos a tu política. Por ejemplo, puedes crear métodos
`View` o `Delete` para autorizar varias acciones relacionadas con modelos. Siéntete libre de nombrar tus métodos de política a medida que veas
encajar.
