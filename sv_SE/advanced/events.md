# Händelser

Gorfels händelser ger en enkel implementering av observatörsmönster, så att du kan prenumerera och lyssna på olika
händelser som inträffar i din ansökan. Händelseklasser lagras vanligtvis i katalogen `app/events` medan deras
lyssnare lagras i `app/listeners`. Oroa dig inte om du inte ser dessa kataloger i din applikation eftersom de kommer
skapas åt dig när du genererar händelser och lyssnare med hjälp av kommandon för Artisan consol.

Händelser fungerar som ett bra sätt att frikoppla olika aspekter av din ansökan, som en enda händelse kan ha flera
lyssnare som inte är beroende av varandra. Du kan till exempel vilja skicka en Slack notifiering till din användare varje
gång en order skickas. Istället för att koppla din orderbehandlingskod till din Slack notifikationskod, du kan höja
en `app\events\OrderShipped` händelse som en lyssnare kan ta emot och använda för att skicka en Slack notifiering.

## Registrering av evenemang och lyssnare

`app\providers\EventServiceProvider` ingår med din Goravel applikation ger en bekväm plats att registrera
alla din applikations händelselyssnare. `lyssna` -metoden innehåller en samling av alla händelser (nycklar) och deras
lyssnare (värden). Du kan lägga till så många händelser till denna array som din ansökan kräver. Till exempel, låt oss addera en
`OrderShipped`-händelse:

```go
paketleverantörer

import (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/frameing/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (receiver *EventServiceProvider) listen() karta[event.Event][]event.Listener {
  returnera kartan[event.Event][]event. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Genererar händelser och lyssnare

Du kan använda kommandot `make:event` och `make:listener` Artisan för att generera enskilda händelser och lyssnare:

```go
gå kör. hantverkare make:event PodcastProcessed
go run . hantverkare make:event user/PodcastProcessed

go run . hantverkare make:lyssener SendPodcastNotification
gå kör. hantverkare make:lyssener användare/SendPodcastNotifiering
```

## Definierar händelser

En händelseklass är i huvudsak en databehållare som innehåller information om händelsen, `Handle` -metoden för
`event` passerar in och returnerar `[]händelsen. rg`-struktur, som kan användas för att bearbeta data. De bearbetade uppgifterna kommer
sedan vidarebefordras till alla associerade `lyssnare`. Till exempel, låt oss anta en `app\events\OrderShipped` händelse:

```go
paket händelser

importera "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receiver *OrderShipped) Handtag(args []event.Arg) ([]event.Arg, fel) {
  return args, nil
}
```

## Definiera lyssnare

Låt oss sedan ta en titt på lyssnaren för vårt exempel. Händelselyssnare tar emot `[]event.Arg` av händelsen
`Handle`-metoden återvänder. Inom `Handle`-metoden kan du utföra alla åtgärder som krävs för att svara på händelsen:

```go
paketlyssnare

import (
  "github. om/goravel/frameing/contracts/event"
)

type SendShipmentNotification struct {
}

func (receiver *SendShipmentNotification) Signature() string {
  returnera "send_shipment_notification"
}

func (receiver *SendShipmentNotification) kö(args . .any) event.Queue {
  returhändelse. ueue{
    Aktivera: falska,
    Anslutning: "",
    Kö: "",
  }
}

func (mottagare *SendShipmentNotification) Handtag(args . .any) fel {
  return nil
}
```

### Stoppa förökningen av en händelse

Ibland kanske du vill stoppa spridningen av en händelse till andra lyssnare. Du kan göra det genom att returnera ett fel från
lyssnarens `Handle`-metod.

## Köade händelselyssnare

Att köa lyssnare kan vara fördelaktigt om din lyssnare kommer att utföra en långsam uppgift, som att skicka ett mail eller göra
en HTTP-begäran. Innan du använder köade lyssnare, se till att [konfigurera din kö](queues) och starta en köarbetare
på din server eller lokal utvecklingsmiljö.

```go
paketlyssnare

...

func (mottagare *SendShipmentNotification) kö(args ...any) händelse.Köa {
  returhändelse. ueue{
    Aktivera: falska,
    Anslutning: "",
    kö: "",
  }
}

func (mottagare *SendShipmentNotification) Handtag(args. .any) error {
  name := args[0]

  return nil
}
```

### Köade händelselyssnare & Databastransaktioner

När köade lyssnare skickas inom databastransaktioner, kan kön bearbeta dem innan databasen
transaktionen har begåtts. När detta händer, eventuella uppdateringar som du har gjort till modeller eller databasposter under
databastransaktionen kanske ännu inte återspeglas i databasen. Dessutom kan alla modeller eller databasposter som skapats
inom transaktionen inte existera i databasen. If your listener depends on these models, unexpected errors can
occur when the job that dispatches the queued listener is processed. Vid denna tidpunkt måste händelsen placeras utanför
databastransaktioner.

## Skicka händelser

Vi kan skicka händelser med `facades.Event().Job().Dispatch()` metod.

```go
paketstyrningar

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/frameing/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Jobb (&events.OrderShipped{}, []händelse. rg{
    {Typ: "string", Värde: "Goravel"},
    {Typ: "int", Värde: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Stöds typer

```go
Bool
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
