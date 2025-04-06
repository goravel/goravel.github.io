# Estructura de directorio

La estructura de archivos por defecto puede hacerle mejor iniciar el avance del proyecto, y también puede añadir carpetas nuevas libremente, pero
no modifique las carpetas predeterminadas.

## Directorio Root

### directorio `app`

`app` contiene el código central del programa. Casi toda la lógica del programa estará en esta carpeta.

### `bootstrap` Directory

El directorio `bootstrap` contiene el archivo de inicio del framework `app.go`.

### Directorio `config`

El directorio `config` contiene todos los archivos de configuración de la aplicación. Es mejor navegar a través de estos archivos y
familiarizarse con todas las opciones disponibles.

### Directorio `database`

El directorio `database` contiene archivos de migración de base de datos.

### Directorio `public`

El directorio `public` contiene algunos recursos estáticos, como imágenes, certificados, etc.

### Directorio `resources`

El directorio `resources` contiene tu [views](../basic/views) así como tus activos crudos, sin compilar como
CSS o JavaScript.

### Directorio `routes`

El directorio `routes` contiene todas las definiciones de ruta de la aplicación.

### Directorio `storage`

El directorio `storage` contiene el directorio `logs`, y el directorio `logs` contiene los archivos de registro de la aplicación.

### directorio `tests`

The `tests` directory contains your automated tests.

## directorio `app`

### `console` Directory

The `console` directory contains all the custom `Artisan` commands of the application, and the console boot file
`kernel.go`, which can be registered in this file [Task Scheduling](../advanced/schedule)

### `http` Directory

The `http` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Web are processed here.

### `grpc` Directory

The `grpc` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Grpc are processed here.

### `models` Directory

The `models` directory contains all data models.

### `providers` Directory

The `providers` directory contains all [Service Providers](../foundation/providers) in the
program. The service provider guides the application to respond to incoming requests by binding services, registering
for events, or performing any other tasks.
