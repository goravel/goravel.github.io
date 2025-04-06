# Desarrollo de paquetes

Los paquetes son la forma principal de añadir funcionalidad a Goravel. Estos paquetes pueden contener rutas, controladores y configuraciones
que están específicamente diseñadas para mejorar una aplicación de Goravel. This guide focuses on developing
Goravel-specific packages.

Aquí hay un ejemplo para construir un paquete
de terceros: [goravel/example-package](https://github.com/goravel/example-package)

## Crear un paquete

Puede crear fácilmente una plantilla de paquete usando el comando Artisan:

```shell
go run . artisan make:package sms
```

Los archivos creados se guardan por defecto en la carpeta raíz `packages`, puedes usar la opción `--root` para personalizar:

```shell
go run . artisan make:package --root=pkg sms
```

## Proveedores de servicios

[Proveedores de servicios](../foundation/providers) actúa como el puente entre tu paquete y Goravel.
Normalmente se encuentran en la raíz del paquete como un archivo `service_provider.go`. Su función principal es vincular elementos
al contenedor de servicio de Goravel y guiar a Goravel en la carga de recursos de paquetes.

## Uso

Registra el `ServiceProvider` en el paquete a `config/app.go::providers`, luego exporta `facades` a la aplicación.
Para pasos detallados, consulte [goravel/paquete de ejemplo](https://github.com/goravel/example-package).

## Recursos

### Configuración

Por lo general, necesitará publicar el archivo de configuración de su paquete en el directorio `config` de la aplicación. This will
allow users of your package to easily override your default configuration options. Para permitir que tus archivos de configuración
sean publicados, llama al método `Publishes` desde el método `Boot` de tu proveedor de servicios, el primer parámetro es el nombre del paquete
, y el segundo parámetro es el mapeo entre la ruta actual del archivo de paquete y la ruta del proyecto:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Rutas

Si hay [routes](../basic/routing) en tu paquete, puedes usar `app.MakeRoute()` para resolver
`facades.Route()`, luego añade las rutas al proyecto:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migraciones

Si hay [migrations](../orm/migrations) en tu paquete, puedes publicarlos mediante el método `Publishes`:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Comandos

Puedes registrar el comando `Artisan` mediante el método `Commands`, puedes ejecutar los comandos
usando [Artisan CLI](../advanced/artisan) después de registrarlos.

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewworthsCommand(),
 })
}
```

## Recursos públicos

Su paquete puede tener activos como JavaScript, CSS e imágenes. Para publicar estos recursos en el directorio `public`
de la aplicación, utiliza el método `Publishes` del proveedor de servicios:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Publicando grupos de archivos

Si desea publicar grupos específicos de recursos y recursos del paquete por separado, puedes usar etiquetas al llamar al método
`Publishes` del proveedor de servicios del paquete. This allows you to give users the option to publish certain
files, like configuration files, without having to publish all the package's assets. Para ilustrar, puedes definir dos grupos
publicar para el paquete `sms` (`sms-config` y `sms-migrations`) usando etiquetas en el método `Boot` del proveedor de servicios de
.

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("migraciones"),
  }, "sms-migrations")
}
```

## Publicar Recursos

En el proyecto, puedes publicar los recursos registrados en un paquete usando el comando 'vendor:publish' Artisan:

```shell
ve a ejecutar. artisan vendor:publish --package={You package name}
```

El comando puede usar las siguientes opciones:

| Nombre de opción | Alias | Accin                                                                                                                                                                                                                                                                                          |
| ---------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --paquete        | -p    | Nombre del paquete, puede ser un paquete remoto: `github.com/goravel/example-package`, y también puede ser un paquete local: `. packages/example-package`, tenga en cuenta que al usar un nombre de paquete local, necesita comenzar con `./`. |
| --tag            | -t    | Grupo de recursos                                                                                                                                                                                                                                                                              |
| --forzar         | -f    | Sobrescribir cualquier archivo existente                                                                                                                                                                                                                                                       |
| --existente      | -e    | Publicar y sobrescribir sólo los archivos que ya han sido publicados                                                                                                                                                                                                                           |
