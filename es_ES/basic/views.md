# Vistas

Por supuesto, no es práctico devolver cadenas completas de documentos HTML directamente desde tus rutas y controladores.
Afortunadamente, las vistas proporcionan una manera conveniente de colocar todo nuestro HTML en archivos separados. Las vistas separan la lógica del controlador /
de la aplicación de tu lógica de presentación y se almacenan en el directorio `resources/views`.

## Creando y renderizando Vistas

Cuando se utiliza la plantilla predeterminada `html/template`, puedes crear vistas agregando un archivo con la extensión `.tmpl`
en el directorio `resources/views` de la aplicación.

```
// recursos/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Hola, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Después de crear la vista, puede utilizar el método `View` para devolver la vista desde una ruta o controlador en la aplicación:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Directorios de vista anidados

Las vistas también pueden anidarse dentro de subdirectorios del directorio `resources/views`. Por ejemplo, si la vista se almacena
en `resources/views/admin/profile. mpl`, puedes retornarlo desde una de las rutas o controladores de tu aplicación, ten en cuenta
que la vista necesita ser definida como `define "admin/profile. mpl"` como se muestra a continuación:

```go
// recursos/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Bienvenido al Panel de Administración</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", mapa[string]any{
  "name": "Goravel",
})
```

### Creando la Primera Vista Disponible

Usando el método `Primero`, puedes usar la primera vista que existe en un array de vistas determinado. Esto puede ser útil si su
aplicación o paquete permite personalizar o sobrescribir las vistas:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, mapear[string]any{
  "name": "Goravel",
})
```

### Determinar si existe una vista

Si necesitas determinar si existe una vista, puedes usar el método `facades.View()`:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Pasar datos a las vistas

Como se vio en los ejemplos anteriores, se puede pasar un array de datos a las vistas para poner esos datos a disposición de la vista.
Tenga en cuenta que el formato de los datos pasados debe cambiar de acuerdo al controlador de plantilla utilizado. en el siguiente ejemplo
, usando el controlador predeterminado `html/template`:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Compartir datos con todas las vistas

Ocasionalmente, puede que necesite compartir datos con todas las vistas renderizadas por su aplicación. Puedes hacerlo utilizando el método
`Compartir` en `facades.View()`. Normalmente, se deben realizar llamadas al método `Share` dentro del método
`Boot` de un service provider. Es libre de añadirlos a la clase `app/providers/app_service_provider.go` o generar un proveedor de servicio
separado para alojarlos:

```go
proveedores de paquetes

importar (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

escribe AppServiceProvider struct {
}

func (receptor *AppServiceProvider) Register(fundación de aplicaciones. pplicación) {
}

func (receptor *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
