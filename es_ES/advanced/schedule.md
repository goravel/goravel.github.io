# Programación de tareas

En el pasado, puede que necesite crear una entrada de configuración cron para cada tarea que necesitara programar en su servidor.
Sin embargo, este enfoque puede convertirse rápidamente en un dolor ya que su programa de tareas no está bajo control de fuente. y tienes que SSH
en tu servidor para ver o añadir/editar entradas de cron.

El planificador de comandos de Goravel ofrece un enfoque fresco para gestionar las tareas programadas en su servidor. Con el programador,
puede definir fácil y claramente su programación de comandos dentro de su aplicación de Goravel. Usando el programador, solo necesitas
para crear una única entrada de cron en tu servidor.

## Definir horarios

Para programar tareas para tu aplicación, puedes definirlas en el método `Schedule` en `app\console\kernel.go`. Let's
consider an example to understand this better. In this case, we want to schedule a closure that will run every day at
midnight. Dentro de este cierre, ejecutaremos una consulta de base de datos para borrar una tabla:

```go
consola de paquete

importar (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"

  "goravel/app/models"
)

type Kernel struct {
}

func (kernel Kernel) Schedule() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().Where("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### Programación de Comandos Artesanos

Además de programar cierres de programación, también puedes programar [comandos de Artisan](./artisan). Por ejemplo, puede usar
el método `Command` para programar un comando Artisan usando ya sea el nombre del comando o la clase.

```go
consola de paquete

importar (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"
)

type Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### Nivel de registro

Cuando `app.debug` es `true`, la consola imprimirá todos los registros. De lo contrario, sólo se imprimirán los registros de nivel `error`.

### Opciones de frecuencia de Schedule

Ya hemos visto algunos ejemplos de cómo puede configurar una tarea para que se ejecute en intervalos especificados. Sin embargo, hay muchos
más frecuencias de programación de tareas disponibles para asignar a tareas:

| 方法                       | 描述                                                           |
| ------------------------ | ------------------------------------------------------------ |
| `.Cron("* * * * *")`     | Ejecutar la tarea en un programa personalizado de cron       |
| `.EveryMinute()`         | Ejecutar la tarea cada minuto                                |
| `.EveryTwoMinutes()`     | Ejecutar la tarea cada dos minutos                           |
| `.EveryThreeMinutes()`   | Ejecutar la tarea cada tres minutos                          |
| `.EveryFourMinutes()`    | Ejecutar la tarea cada cuatro minutos                        |
| `.EveryFiveMinutes()`    | Ejecutar la tarea cada cinco minutos                         |
| `.EveryTenMinutes()`     | Ejecutar la tarea cada diez minutos                          |
| `.EveryFifteenMinutes()` | Ejecutar la tarea cada quince minutos                        |
| `.EveryThirtyMinutes()`  | Ejecutar la tarea cada treinta minutos                       |
| `.Hourly()`              | Ejecutar la tarea cada hora                                  |
| `.HoraAt(17)`            | Ejecutar la tarea cada hora a 17 minutos después de la hora  |
| `.EveryTwoHours()`       | Ejecutar la tarea cada dos horas                             |
| `.EveryThreeHours()`     | Ejecutar la tarea cada tres horas                            |
| `.EveryFourHours()`      | Ejecutar la tarea cada cuatro horas                          |
| `.EverySixHours()`       | Ejecutar la tarea cada seis horas                            |
| `.Daily()`               | Ejecutar la tarea todos los días a medianoche                |
| `.DailyAt("13:00")`      | Ejecutar la tarea todos los días a las 13:00 |

### Prevención de tareas generales

De forma predeterminada, las tareas programadas continuarán ejecutándose incluso si una instancia anterior sigue ejecutándose. Para prevenir esto, utiliza los métodosformat@@0
siguientes:

| 方法                       | 描述                             |
| ------------------------ | ------------------------------ |
| `.SkipIfStillRunning()`  | Saltar si todavía se ejecuta   |
| `.DelayIfStillRunning()` | Retrasar si todavía se ejecuta |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### Ejecutar tareas en un servidor

> Para utilizar esta función, su aplicación debe estar usando el controlador de caché memcached, dynamodb o redis como controlador de caché predeterminado
> . Además, todos los servidores deben estar comunicados con el mismo servidor de caché central.

Si el planificador de su aplicación se ejecuta en varios servidores, puede asegurarse de que un trabajo programado se ejecuta solo en uno de
ellos. Por ejemplo, digamos que tiene una tarea programada que genera un nuevo informe cada viernes por la noche. Si la tarea
planificador se ejecuta en tres servidores de trabajadores, la tarea programada se ejecutará en los tres servidores y creará el informe tres
veces. ¡Esto no es ideal!

Para evitar esto, utilice el método `OnOneServer` al definir la tarea programada, que se asegurará de que la tarea ejecute
solo en un servidor. El primer servidor en recibir la tarea asegurará un bloqueo atómico en el trabajo, impidiendo que otros servidores
ejecuten la misma tarea al mismo tiempo:

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Los cierres programados deben ser asignados a un nombre si están destinados a ser ejecutados en un servidor:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Ejecutar el programador

Ahora que hemos aprendido a definir tareas programadas, vamos a discutir cómo ejecutarlas realmente en nuestro servidor.

Añade `go facades.Schedule().Run()` al archivo raíz `main.go`.

```go
importación

paquete principal (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Esto arranca el framework y lo prepara para su uso.
  bootstrap.Boot()

  // Iniciar programación por facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## Detener el planificador

Puede llamar al método `Shutdown` para apagar el planificador. Este método esperará todas las tareas a
completadas antes de cerrar.

```go
// main.go
bootstrap.Boot()

// Crea un canal para escuchar señales de OS
quit := make(chan os.Signal)
señal. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Iniciar programa por facades.Schedule
go facades.Schedule(). un()

// Escucha la señal del sistema operativo
go func() {
  <-quit
  if err := facades. chedule().Shutdown(); err != nil {
    facades. og().Errorf("Error de Apagamiento de Schedule: %v", err)
  }

  os.Exit(0)
}()

select {}
```
