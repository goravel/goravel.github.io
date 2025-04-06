# Configuración

Todos los archivos de configuración del framework Goravel se almacenan en el directorio `config`. Puede ver instrucciones
específicas y configurarlas flexiblemente según las necesidades del proyecto.

## Configuración del entorno

Ejecutar aplicaciones en diferentes entornos normalmente requiere configuraciones diferentes. For example, you may want to
turn on the Debug mode locally but don't need it in the production environment.

Por lo tanto, el framework proporciona el archivo `.env.example` en el directorio raíz. Necesitas copiar este archivo, renombrarlo
a `.env` antes de iniciar el desarrollo, y modificar los elementos de configuración en el `. archivo nv` de acuerdo a sus necesidades
proyecto.

Tenga en cuenta que el `. el archivo nv` no debe ser añadido al control de versiones, porque cuando varias personas colaboran, diferentes
desarrolladores pueden usar diferentes configuraciones, y diferentes configuraciones de entorno de despliegue son diferentes.

Además, si un intruso obtiene acceso al repositorio de código, habrá un riesgo de exponer la configuración sensible
. Si desea agregar un nuevo elemento de configuración, puede añadirlo al archivo `.env.example` para sincronizar la configuración
de todos los desarrolladores.

## Recuperar configuración de entorno

Usa el siguiente método para obtener los elementos de configuración en el archivo `.env`:

```go
// El primer parámetro es la clave de configuración, y el segundo parámetro es el valor predeterminado
facades.Config().Env("APP_NAME", "goravel")
```

## Acceder a Valores de Configuración

Puedes usar fácilmente la función global `facades.Config()` en cualquier lugar de la aplicación para acceder a los valores de configuración
en el directorio `config`. El acceso al valor de configuración puede usar la sintaxis "." . También puede especificar un valor
predeterminado, si la opción de configuración no existe, se devuelve el valor predeterminado:

```go
// Obtener la configuración a través de la aserción
facades.Config().Get("app.name", "goravel")

// Obtener la configuración del tipo de cadena
facades.Config().GetString("app. ame", "goravel")

// Obtener la configuración del tipo int
facades.Config().GetInt("app. nt", 1)

// Obtener la configuración del tipo bool
facades.Config().GetBool("app.debug", true)
```

## Configurar

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Obtener información del proyecto

Puede utilizar el comando `artisan about` para ver la versión del framework, configuración, etc.

```bash
go run . artisan about
```
