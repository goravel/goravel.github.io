# Eventos

Goravel's events provide a simple observer pattern implementation, allowing you to subscribe and listen to various
events that occur within your application. Las clases de eventos normalmente se almacenan en el directorio `app/events`, mientras que sus oyentes
se almacenan en `app/listeners`. No te preocupes si no ves estos directorios en tu aplicación ya que se creará
a medida que generes eventos y oyentes usando comandos de consola Artisan.

Los eventos sirven como una excelente manera de desacoplar varios aspectos de su solicitud, como un solo evento puede tener múltiples oyentes
que no dependen unos de otros. For example, you may wish to send a Slack notification to your user each
time an order is shipped. En lugar de vincular el código de procesamiento de su pedido a su código de notificación de Slack, puedes elevar
un evento `app\events\OrderShipped` que un oyente puede recibir y usar para enviar una notificación de Slack.

## Registrando eventos y oyentes

El `app\providers\EventServiceProvider` incluido en tu aplicación de Goravel proporciona un lugar conveniente para registrar
todos los detectores de eventos de tu aplicación. El método `listen` contiene un array de todos los eventos (claves) y sus oyentes
(valores). Puede añadir tantos eventos a esta matriz como requiera su aplicación. Por ejemplo, vamos a añadir un evento
`OrderShipped`:

```go
proveedores de paquetes

importar (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (receptor *EventServiceProvider) listen() mapa[event.Event][]event.Listener {
  mapa de retorno[event.Event][]evento. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Generar eventos y oyentes

Puedes usar los comandos de Artisan `make:event` y `make:listener` para generar eventos y oyentes individuales:

```go
go run . artisan make:event PodcastProcessed
go run . artisan make:event user/PodcastProcessed

go run . artisan make:listener SendPodcastNotification
go run . artisan make:listener user/SendPodcastNotification
```

## Definición de eventos

Una clase de evento es esencialmente un contenedor de datos que contiene la información relacionada con el evento, el método `Handle` de
`event` pasa y devuelve el `[]evento. estructura rg`, que puede ser usada para procesar datos. Los datos procesados
luego serán pasados a todos los `listeners` asociados. Por ejemplo, asumamos un evento `app\events\OrderShipped`:

```go
eventos de paquete

importar "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receptor *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Definir oyentes

A continuación, echemos un vistazo al oyente de nuestro evento de ejemplo. Los oyentes de eventos reciben `[]event.Arg` del método
`Handle` devuelve. Dentro del método `Handle`, puedes realizar cualquier acción necesaria para responder al evento:

```go
paquete listeners

import (
  "github. om/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (receptor *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (receptor *SendShipmentNotification) Queue(args . .any) event.Queue {
  evento de retorno. ue{
    Activar: falso,
    Conexión: "",
    Cola: "",
  }
}

func (receptor *SendShipmentNotification) Manejo(args . .any) error {
  return nil
}
```

### Detener la propagación de un evento

A veces, puede que desee detener la propagación de un evento a otros oyentes. Puedes hacerlo devolviendo un error desde
el método `Handle` de tu oyente.

## Escuchadores de eventos en cola

Los oyentes en cola pueden ser beneficiosos si su oyente va a realizar una tarea lenta como enviar un correo electrónico o hacer
una solicitud HTTP. Antes de usar listeners en cola, asegúrate de [configurar tu cola](queues) e inicia un worker de cola
en tu servidor o entorno de desarrollo local.

```go
package listeners

...

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event.Queue{
    Enable:     false,
    Connection: "",
    Queue:      "",
  }
}

func (receiver *SendShipmentNotification) Handle(args ...any) error {
  name := args[0]

  return nil
}
```

### Eventos en cola listeners y transacciones de base de datos

When queued listeners are dispatched within database transactions, the queue may process them before the database
transaction has been committed. Cuando esto ocurra, cualquier actualización que haya hecho en los modelos o registros de bases de datos durante la transacción
puede que aún no se refleje en la base de datos. Además, es posible que no existan en la base de datos modelos o registros creados
dentro de la transacción. Si tu oyente depende de estos modelos, pueden ocurrir errores inesperados
cuando el trabajo que envía el listener en cola es procesado. At this time, the event needs to be placed outside
the database transactions.

## Despachando eventos

Podemos enviar eventos por el método `facades.Event().Job().Dispatch()`.

```go
controladores

importar (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []event. rg{
    {Type: "string", Valor: "Goravel"},
    {Type: "int", Valor: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Tipos soportados

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
