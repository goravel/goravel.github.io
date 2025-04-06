# Loggando

In order to understand the running status of the application, Goravel provides a powerful log service that can record
log messages and system errors to a file or other channels through `facades.Log()`.

## Configuración

Para configurar varios canales de registro, se pueden hacer configuraciones personalizadas en `config/logging.go`.

`Goravel` usa el canal `stack` para grabar los registros por defecto, `stack` permite que los registros sean reenviados a varios canales.

La configuración de `print` en `single` y `daily` controlan la salida del registro en la consola.

## Controladores de canal disponibles

| Nombre          | Descripción                    |
| --------------- | ------------------------------ |
| `pila`          | Permitir múltiples canales     |
| `single`        | Archivo de registro único      |
| `diario`        | Un archivo de registro por día |
| `personalizado` | Unidad personalizada           |

### Inyectar contexto

```go
facades.Log().WithContext(ctx)
```

## Escribir mensajes de registro

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
facades. og().Error(message)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### Escribir a un canal específico

A veces, puede querer grabar mensajes en un canal que no sea el canal predeterminado de la aplicación:

```go
facades.Log().Channel("single").Info(message)
```

Si desea escribir en varios canales al mismo tiempo, puede utilizar el método `Stack`:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Métodos de cain

Goravel proporciona métodos de cadena convenientes, que facilitan la inserción de información más útil en el registro:

```go
facades.Log() ("John").Debug(message)
```

| Método      | Accin                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Código      | Establezca un código o un slug que describa el registro.                                              |
| Pista       | Establecer una pista para una depuración más rápida.                                                  |
| En          | Establece la categoría de características o el dominio en el que la entrada de registro es relevante. |
| Propietario | Útil con fines de alerta.                                                                             |
| Solicitud   | Suministra un http.Request.                                                           |
| Respuesta   | Suministra un http.Response.                                                          |
| Etiquetas   | Añadir múltiples etiquetas, describiendo la característica que devuelve un error.                     |
| Usuario     | Establecer el usuario asociado con la entrada de registro.                                            |
| Con         | Agrega pares clave-valor al contexto de la entrada de registro.                                       |
| WithTrace   | Añadir información de la pila a la entrada del registro.                                              |

## Crear un canal personalizado

Si quieres definir un canal completamente personalizado, puedes especificar el controlador `custom` en el archivo de configuración `config/logging.go`
.
Luego incluye una opción `via` para implementar una estructura `framework\contracts\log\Logger`:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Controlador de Implementación

Implementa la interfaz `framework\contracts\log\Logger`.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Maneja la ruta de configuración del canal pase aquí
  Handle(channel string) (Hook, error)
}
```

pueden almacenarse en la carpeta `app/extensions` (modificable). Ejemplo:

```go
extensiones de paquete

importar (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Maneja la ruta de configuración del canal de pase aquí
func (logger *Logger) Handle(channel string) (log. ook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Levanta el nivel de monitorización
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Disparar la lógica cuando se activa
func (h *Hook) Fire(registro de entrada. ntry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entrada. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
