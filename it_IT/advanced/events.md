# Eventi

Gli eventi di Goravel forniscono una semplice implementazione del modello di osservatore, consentendo di iscriversi e ascoltare i vari eventi
che si verificano all'interno della tua applicazione. Le classi di eventi sono tipicamente memorizzate nella directory `app/events`, mentre i loro ascoltatori
sono memorizzati in `app/listeners`. Non preoccuparti se non vedi queste directory nella tua applicazione in quanto saranno
create per te mentre genererai eventi e ascoltatori usando i comandi della console Artisan.

Gli eventi servono come un ottimo modo per disaccoppiare vari aspetti della vostra applicazione, come un singolo evento può avere più ascoltatori
che non dipendono l'uno dall'altro. For example, you may wish to send a Slack notification to your user each
time an order is shipped. Invece di abbinare il codice di elaborazione degli ordini al codice di notifica Slack puoi aumentare
un evento `app\events\OrderShipped` che un ascoltatore può ricevere e utilizzare per inviare una notifica Slack .

## Registrare Eventi & Ascoltatori

Il file `app\providers\EventServiceProvider` incluso con la tua applicazione Goravel fornisce un luogo conveniente per registrare
tutti gli ascoltatori di eventi della tua applicazione. Il metodo `listen` contiene un array di tutti gli eventi (chiavi) e i loro ascoltatori
(valori). È possibile aggiungere tutti gli eventi a questo array come richiesto dall'applicazione. Ad esempio, aggiungiamo un evento
`OrderShipped`:

```go
package provider

import (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]event. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Generare Eventi E Ascoltatori

Puoi usare i comandi `make:event` e `make:listener` Artigiano per generare singoli eventi e ascoltatori:

```go
go run . artisan make:event PodcastProcessed
go run . artisan make:event user/PodcastProcessed

go run . artisan make:listener SendPodcastNotification
go run . artisan make:listener user/SendPodcastNotification
```

## Definizione Di Eventi

Una classe di eventi è essenzialmente un contenitore di dati che contiene le informazioni relative all'evento, il metodo `Handle` di
`event` passa e restituisce l'evento `[]. struttura rg`, che può essere utilizzata per elaborare i dati. I dati elaborati saranno
quindi trasmessi a tutti i `listeners` associati. Ad esempio, assumiamo un evento `app\events\OrderShipped`:

```go
package events

import "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receiver *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Definizione Degli Ascoltatori

Successivamente, diamo un'occhiata all'ascoltatore per il nostro evento di esempio. Gli ascoltatori degli eventi ricevono `[]event.Arg` del metodo `Handle` dell'evento
restituisce. Nel metodo `Handle`, puoi eseguire tutte le azioni necessarie per rispondere all'evento:

```go
package listeners

import (
  "github. om/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (receiver *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (receiver *SendShipmentNotification) Queue(args . .any) event.Queue {
  return event. ueue{
    Enable: false,
    Connessione: "",
    Coda: "",
  }
}

func (ricevitore *InvioNotifica) maneggio(args . .any) errore {
  return nil
}
```

### Interrompere La Propagazione Di Un Evento

A volte, potresti voler fermare la propagazione di un evento ad altri ascoltatori. You may do so by returning an error from
your listener's `Handle` method.

## Ascoltatori Eventi In Coda

L'accodamento degli ascoltatori può essere utile se il tuo ascoltatore sta per eseguire un'attività lenta come l'invio di una e-mail o la realizzazione di una richiesta HTTP
. Prima di usare gli ascoltatori in coda, assicurati di [configurare la coda](queues) e avvia un worker
sul tuo server o sull'ambiente di sviluppo locale.

```go
listeners

...

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event. ueue{
    Enable: false,
    Connessione: "", Coda
    : "",
  }
}

func (ricevitore *InvioNotifica) maneggio(args . .any) error {
  name := args[0]

  return nil
}
```

### Ascoltatori Di Eventi In Coda E Transazioni Del Database

Quando gli ascoltatori in coda vengono spediti all'interno delle transazioni del database, la coda può elaborarli prima che la transazione
del database sia stata effettuata. Quando questo accade, gli aggiornamenti che hai fatto ai modelli o ai record di database durante la transazione del database
potrebbero non essere ancora riflessi nel database. Inoltre, eventuali modelli o record di database creati
all'interno della transazione potrebbero non esistere nel database. Se il tuo ascoltatore dipende da questi modelli, gli errori inattesi possono
verificarsi quando il lavoro che invia il listener in coda viene elaborato. In questo momento, l'evento deve essere collocato al di fuori di
le transazioni del database.

## Eventi Di Dispatching

Possiamo inviare Eventi con il metodo `facades.Event().Job().Dispatch()`.

```go
package controller

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []event. rg{
    {Type: "string", Value: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Tipi Supportati

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
