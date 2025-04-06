# Medios

El Middleware proporciona un mecanismo conveniente para inspeccionar y filtrar las peticiones HTTP que entran en la aplicación.

## Definir Middleware

Puedes crear tu propio middleware en el directorio `app/http/middleware`, la estructura es la siguiente.

```go
paquete middleware

importar (
  "github.com/goravel/framework/contracts/http"
)

func Auth() http.Middleware {
  return func(ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Crear Middleware por Comando

```
go run . artisan make:middleware Auth

// Soporta carpetas anidadas
go run . artisan make:middleware user/Auth
```

## Registrar Middleware

### Middleware global

Si desea aplicar middleware para cada petición HTTP de su aplicación, solo necesitas registrar el middleware en
el `Middleware` en `app/http/kernel. o` archivo.

```go
// app/http/kernel.go importación
paquete http

(
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Asignar Middleware para la ruta

Puede registrar el middleware para algunas rutas por separado:

```go
importar "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("usuarios", userController.Show)
```

## Anular solicitud

En middleware, si necesita interrumpir la solicitud, puede utilizar el método `Abort`.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "No encontrado").Abort()
```
