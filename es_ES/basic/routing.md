# Ruta

El módulo de enrutamiento de Goravel puede ser operado por `facades.Route()`.

## Controlador HTTP

Goravel usa [gin](https://github.com/gin-gonic/gin) como su controlador HTTP predeterminado. Para usar otros controladores, configúrelos en
el archivo `config/http.go`. El predeterminado oficial soporta [gin](https://github.com/gin-gonic/gin)
y [fiber](https://github.com/gofiber/fiber).

| Conductor | Enlace                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Gin       | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fibra     | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Archivo de ruta por defecto

Para definir archivos de ruta, simplemente navega al directorio `/routes`. Por defecto, el framework utiliza una ruta de ejemplo
ubicada en `/routes/web.go`. Para establecer el enlace de enrutamiento, el método `func Web()` está registrado en el archivo
`app/providers/route_service_provider.go`.

Si necesita una gestión más precisa, puede añadir archivos de enrutamiento al directorio `/routes` y registrarlos en el archivo
`app/providers/route_service_provider.go`.

## Iniciar servidor HTTP

Inicia el servidor HTTP en `main.go` en el directorio raíz llamando a `facades.Route().Run()`. Esto automáticamente
obtendrá la configuración `route.host`.

```go
importación

paquete principal (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Esto arranca el framework y lo prepara para su uso.
  arrastre. oot()

  // Iniciar servidor http por facades.Route().
  go func() {
    if err := facades. oute().Run(); err != nil {
      facades. og().Errorf("Error de ejecución de ruta: %v", err)
    }
  }()

  select {}
}
```

## Iniciar servidor HTTPS

Por favor, completa la configuración de `http.tls` en `config/http.go` antes de usar HTTPS, el método `facades.Route().RunTLS()`
iniciará el servidor HTTPS de acuerdo con la configuración relevante:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

También puede utilizar el método `facades.Route().RunTLSWithCert()` para personalizar el host y el certificado.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## Cerrar servidor HTTP/HTTPS

Puedes cerrar el servidor HTTP/HTTPS llamando al método `Shutdown`, el cual esperará a que todas las solicitudes sean procesadas
antes de cerrar.

```go
// main.go
bootstrap.Boot()

// Crea un canal para escuchar señales de OS
quit := make(chan os.Signal)
signal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Iniciar servidor http por facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Error de ejecución de ruta: %v", err)
  }
}()

// Escucha la señal del sistema operativo
go func() {
  <-quit
  if err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Error de cierre de ruta: %v", err)
  }

  os.Exit(0)
}()

select {}
```

### Métodos de ruta

| Métodos    | Accin                                     |
| ---------- | ----------------------------------------- |
| Grupo      | [Enrutamiento de grupo](#group-routing)   |
| Prefijo    | [Prefijo de ruta](#routing-prefix)        |
| ServeHTTP  | [Probando enrutamiento](#testing-routing) |
| Obtener    | [Enrutamiento Básico](#basic-routing)     |
| Publicar   | [Enrutamiento Básico](#basic-routing)     |
| Poner      | [Enrutamiento Básico](#basic-routing)     |
| Eliminar   | [Enrutamiento Básico](#basic-routing)     |
| Parche     | [Enrutamiento Básico](#basic-routing)     |
| Opciones   | [Enrutamiento Básico](#basic-routing)     |
| Cualquier  | [Enrutamiento Básico](#basic-routing)     |
| Recurso    | [Ruta de recursos](#resource-routing)     |
| Estático   | [Enrutamiento de archivo](#file-routing)  |
| StaticFile | [Enrutamiento de archivo](#file-routing)  |
| StaticFS   | [Enrutamiento de archivo](#file-routing)  |
| Medios     | [Middleware](#middleware)                 |

## Ruta básica

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Hola": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
facades. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Ruta de recursos

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// DELETE /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Ruta de grupo

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Prefijo de ruta

```go
facades.Route().Prefix("usuarios").Get("/", userController.Show)
```

## Ruta de archivos

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Parámetros de ruta

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detalle [Request](./requests)

## Medios

```go
importar "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detalle [Middleware](./middlewares)

## Rutas de Fallback

Utilizando el método `Fallback`, puedes definir una ruta que se ejecutará cuando ninguna otra ruta coincida con la solicitud
entrante.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "no encontrado")
})
```

## Limitar tasa

### Definir límites de tasa

Goravel incluye potentes y personalizables servicios de limitación de tarifas que puede utilizar para restringir la cantidad de tráfico
para una ruta o grupo de rutas. Para empezar, debe definir configuraciones de limitadores de tasa que satisfagan las necesidades de su
aplicación. Normalmente, esto debe hacerse dentro del método `configureRateLimiting` de la clase
`app/providers/route_service_provider.go`.

Los limitadores de velocidad se definen usando el método `For` de `facades.RateLimiter()`. El método `For` acepta un nombre de limitador de tasa
y un cierre que devuelve la configuración de límite que debería aplicarse a las rutas que están asignadas al limitador de velocidad.
El nombre del limitador de velocidad puede ser cualquier cadena que desee:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (receptor *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Si la solicitud entrante excede el límite de tasa especificado, una respuesta con un código de estado HTTP 429 será automáticamente devuelta
por Goravel. Si desea definir su propia respuesta que debe ser devuelta por un límite de tasa, puede utilizar
el método de respuesta:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Dado que los limitadores de velocidad reciben la instancia de petición HTTP entrante, puedes construir el límite de velocidad adecuado
dinámicamente basado en la solicitud entrante o usuario autenticado:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Supongamos
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Límites de tasa de segmentación

A veces se puede desear segmentar los límites de tasa por algún valor arbitrario. For example, you may wish to allow users to
access a given route 100 times per minute per IP address. Para lograr esto, puedes usar el método `By` al construir
tu límite de velocidad:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Para ilustrar esta característica usando otro ejemplo, podemos limitar el acceso a la ruta a 100 veces por minuto por
ID de usuario autenticado o 10 veces por minuto por dirección IP para invitados:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Múltiples límites de tasa

Si es necesario, puede devolver un array de límites de velocidad para una configuración de limitación de velocidad determinada. Cada límite de velocidad se evaluará
para la ruta en función del orden en que se coloquen dentro del arreglo:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Adjuntar Limitadores de Tasa a Rutas

Los limitadores de tarifas pueden estar conectados a rutas o grupos de rutas usando el middleware del acelerador. El middleware del acelerador acepta
el nombre del limitador de velocidad que desea asignar a la ruta:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global").Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Compartir recursos de origen cruzado (CORS)

Goravel tiene CORS habilitado por defecto, la configuración puede ser modificada en `config/cors.go`.

> Para más información sobre los encabezados CORS y CORS, por favor consulte
> la [documentación web de MDN sobre CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
