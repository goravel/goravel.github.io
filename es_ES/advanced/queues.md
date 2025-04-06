# Colas

Al construir su aplicación web, puede haber tareas, como analizar y almacenar un archivo CSV subido, que tarda demasiado
en completarse durante una solicitud web. Afortunadamente, Goravel ofrece una solución al permitirte crear trabajos en cola que
puede ejecutar en segundo plano. De esta manera, moviendo las tareas intensivas en tiempo a una cola, tu aplicación puede responder a las solicitudes
web mucho más rápido y proporcionar una mejor experiencia de usuario para tus clientes. Para implementar esta función, usamos
`facades.Queue()`.

Las opciones de configuración de cola de Goravel se guardan en el archivo de configuración `config/queue.go` de tu aplicación. Goravel
soporta dos controladores: `redis` y `sync`.

### Conexiones vs. Colas

Antes de profundizar en las colas de Goravel, es importante entender la diferencia entre "conexiones" y "colas". En
el archivo de configuración, `config/queue.go`, encontrarás un array para la configuración `connections`. Esta opción especifica
las conexiones a los servicios de cola de backend como Redis. Sin embargo, cada conexión de cola puede tener múltiples "colas", en las que se puede pensar
como diferentes pilas o pilas de trabajos en cola.

Es esencial tener en cuenta que cada ejemplo de configuración de conexión en el archivo de configuración de cola incluye un atributo `cola`
. Este atributo es la cola predeterminada a la que se enviarán los trabajos cuando se envíen a una conexión
dada. En términos más sencillos, si envía un trabajo sin definir explícitamente a qué cola debe ser enviada,
el trabajo se colocará en la cola definida en el atributo de cola de la configuración de conexión.

```go
// Este trabajo se envía a la cola por defecto de la conexión
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Valor: 1},
}). ispatch()

// Este trabajo se envía a la cola de "emails" de la conexión predeterminada
err := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", Valor: 1},
}).OnQueue("emails").Dispatch()
```

## Creando puestos

### Generando Clases de Job

Por defecto, todos los trabajos de tu aplicación se almacenan en el directorio `app/jobs`. Si el directorio `app/Jobs`
no existe, se creará cuando ejecutes el comando de Artisan `make:job`:

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Estructura de clase

Las clases de trabajo son muy sencillas, consistentes en dos métodos: `Signature` y `Handle`. `Signature` sirve como un identificador distinto
de tarea, mientras que `Handle` se ejecuta cuando la cola procesa la tarea. Además, el `[]queue.Arg{}` ha pasado
cuando la tarea ejecuta se transmitirá a `Handle`:

```go
trabajos de paquete

type ProcessPodcast struct {
}

// Firma el nombre y firma del trabajo.
func (receptor *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Maneja el trabajo.
func (receptor *ProcessPodcast) Handle(args ...any) error {
  return nil
}
```

### Registrar trabajo

Después de crear el trabajo, necesitas registrarlo en `app/provides/queue_service_provider.go`, para que pueda ser llamado
correctamente.

```go
func (receptor *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Iniciar servidor de cola

Inicia el servidor de cola en `main.go` en el directorio raíz.

```go
importación

paquete principal (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Esto arranca el framework y lo prepara para su uso.
  bootstrap.Boot()

  // Iniciar servidor de cola por fachadas. ue().
  go func() {
    if err := facades. ue().Worker().Run(); err != nil {
      facades. og().Errorf("Error de ejecución de cola: %v", err)
    }
  }()

  select {}
}
```

Diferentes parámetros se pueden pasar en el método `facades.Queue().Worker`, puedes monitorear múltiples colas iniciando
múltiples `facades.Queue().Worker`.

```go
// No hay parámetros, por defecto escucha la configuración en `config/queue. o`, y el número de concurrencia es 1
go func() {
  if err := facades. ue().Worker().Run(); err != nil {
    facades. og().Errorf("Queue run error: %v", err)
  }
}()

// Monitorizar la cola de procesamiento para el enlace redis, y el número de concurrencia es 10
go func() {
  if err := facades. ueue().Worker(cola. rgs{
    Conexión: "redis",
    Cola: "procesando",
    Concurrente: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## Enviando Jobs

Una vez que hayas escrito la clase de trabajo, puedes enviarla utilizando el método `Dispatch` en el propio trabajo:

```go
controladores

importar (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}). ispatch()
  if err != nil {
    // hacer algo
  }
}
```

### Envío sincrónico

Si desea enviar un trabajo inmediatamente (sincrónicamente), puede utilizar el método `DispatchSync`. Cuando se utiliza este método
, el trabajo no se pondrá en cola y se ejecutará inmediatamente dentro del proceso actual:

```go
controladores

importar (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}). ispatchSync()
  if err != nil {
    // hacer algo
  }
}
```

### Funcionamiento

La cadena de trabajos le permite especificar una lista de trabajos en cola para ser ejecutados en un orden específico. Si cualquier trabajo en la secuencia
falla, el resto de los trabajos no se ejecutarán. Para ejecutar una cadena de trabajo en cola, puedes usar el método `Chain` proporcionado por
el `facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []cola. rg{
      {Type: "int", Valor: 1},
    },
  },
  {
    Trabajo: &jobs. est1{},
    Args: []cola. rg{
      {Type: "int", Valor: 2},
    },
  },
}).Dispatch()
```

### Retraso de envío

Si desea especificar que un trabajo no debe ser procesado inmediatamente por un trabajador en cola, puedes usar el método `Delay`
durante el envío del trabajo. Por ejemplo, especificemos que un trabajo no debe estar disponible para su procesamiento después de 100
segundos de envío:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Segundo).Dispatch()
```

### Personalizar la cola y la conexión

#### Enviando a una cola particular

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("procesando").Dispatch()
```

#### Enviando a una conexión Particular

Si tu aplicación interactúa con múltiples conexiones de cola, puedes usar el método `OnConnection` para especificar la conexión
a la que se empuja la tarea.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Puedes encadenar los métodos `OnConnection` y `OnQueue` juntos para especificar la conexión y la cola para un trabajo:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("procesando").Dispatch()
```

## `queue.Arg.Type` Tipos soportados

```go
bool
int
int8
int16
int32
int64
uint
uint8
uint16
uint32
uint64
float32
float64
string
[]bool
[]int
[]int8
[]int16
[]int32
[]int64
[]uint
[]uint8
[]uint16
[]uint32
[]uint64
[]float32
[]float64
[]string
```
