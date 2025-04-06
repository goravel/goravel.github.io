# Contenedor de servicio

El service container de Goravel es una potente herramienta para gestionar las dependencias de clases y realizar inyecciones de dependencias.
contiene todos los módulos de Goravel, y le permite enlazar sus propios servicios para contenedor y resolverlos cuando sea necesario.
El service container proporciona un poderoso soporte para paquetes de terceros alrededor de Goravel.

## Enlazando

### Enlaces simples

Casi todos sus enlaces al service container serán registrados dentro de [service providers](./providers).
Dentro de un proveedor de servicios, siempre tienes acceso al contenedor a través del parámetro `app`, luego registra un enlace
usando el método `Bind`, pasando la `llave` que deseamos registrar junto con un cierre que devuelve una instancia de la clase
:

```go
ruta de paquete

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(fundación de aplicaciones. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (ruta *ServiceProvider) Boot(app foundation.Application) {

}
```

Como se ha mencionado, normalmente estarás interactuando con el contenedor dentro de los proveedores de servicios; sin embargo, si quieres que
interactúe con el contenedor fuera de un proveedor de servicios, puedes hacerlo a través de la facade `App`:

```go
facades.App().Bind("key", func(app foundation.Application) (alguna, error) {
    ...
})
```

### Enlazar un Singleton

El método `Singleton` une una clase o interfaz en el contenedor que solo debería resolverse una vez. Once a
singleton binding is resolved, the same object instance will be returned on subsequent calls into the container:

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Enlazar instancias

También puede enlazar una instancia de objeto existente en el contenedor utilizando el método `Instance`. La instancia dada
siempre será devuelta en llamadas posteriores al contenedor:

```go
app.Instance(clave, instancia)
```

### Enlazar con el parámetro

Si necesita algunos parámetros adicionales para construir el proveedor de servicios, puede utilizar el método `BindWith` para pasar parámetros
al cierre:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Resolviendo

### El método `Make`

Puede utilizar el método `Make` para resolver una instancia de clase desde el contenedor. The `Make` method accepts the `key` you
wish to resolve:

```go
ejemplo, err := app.Make(key)
```

If you are outside of a service provider in a location of your code that does not have access to the `app` variable, you
may use the `App` facade to resolve a class instance from the container:

```go
instance, err := facades.App().Make(key)
```

### El método `MakeWith`

Si algunas de las dependencias de tu clase no se pueden resolver a través del contenedor, puedes inyectarlos pasándolos como un array asociativo
en el método `MakeWith`, correspondiente al método de enlace `BindWith`:

```go
instance, err := app.MakeWith(key, map[string]any{"id": 1})
```

### Otros métodos

El framework proporciona algunos métodos convenientes para resolver rápidamente varias fachadas: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
