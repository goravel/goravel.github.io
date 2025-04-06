# Controladores

En lugar de definir toda la lógica de procesamiento de solicitudes en forma de cierre en una ruta separada, un controlador puede utilizarse
para la integración. Los controladores se almacenan en el directorio `app/http/controllers`.

## Definir Controladores

El siguiente es un ejemplo de un controlador básico:

```go
controladores

importar (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
)

type UserController struct {
  // Dependent services
}

func NewUserController() *UserController {
  return &UserController{
    // Inyectar servicios
  }
}

func (r *UserController) Show(ctx http. ontext) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "Hola": "Goravel",
  })
}
```

La ruta definida:

```go
rutas de paquetes

importar (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controladores. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Crear controlador

```shell
go run . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Controladores de recursos

Si piensas en cada modelo Eloquent en tu aplicación como un "recurso", es típico realizar los mismos conjuntos de acciones
contra cada recurso de tu aplicación. Por ejemplo, imagina que tu aplicación contiene un modelo `Foto` y un modelo
`Movimiento`. Es probable que los usuarios puedan crear, leer, actualizar o eliminar estos recursos.

Debido a este caso de uso común, la ruta de recursos de Goravel asigna la creación típica, leer, actualice y borre ("CRUD")
rutas a un controlador con una sola línea de código. Para empezar, podemos usar la opción 'make:controller' del comando Artisan
`--resource` para crear rápidamente un controlador para manejar estas acciones:

```shell
go run . artisan make:controller --resource Photo Controller
```

Este comando generará un controlador en `app/http/controllers/photo_controller.go`. El controlador contendrá un método
para cada una de las operaciones de recursos disponibles. A continuación, se puede registrar una ruta de recursos que apunta al controlador
:

```go
facades.Route().Resource("fotos", controladores.NewPhoto Controller())
```

| Verbo     | URI              | Accin      |
| --------- | ---------------- | ---------- |
| RECOGER   | `/fotos`         | Índice     |
| POST      | `/fotos`         | Tienda     |
| RECOGER   | `/fotos/{photo}` | Mostrar    |
| PUT/PATCH | `/fotos/{photo}` | Actualizar |
| BORRAR    | `/fotos/{photo}` | Destruir   |
