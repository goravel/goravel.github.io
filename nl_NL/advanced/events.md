# Evenementen

Goravels gebeurtenissen bieden een eenvoudige implementatie van waarnemerspatroonimplementatie, waardoor u kunt abonneren op en luisteren naar verschillende
gebeurtenissen die zich binnen uw applicatie voordoen. Event classes worden meestal opgeslagen in de `app/events` directory, terwijl hun
luisteraars worden opgeslagen in `app/luisteraars`. Maak je geen zorgen als je deze mappen niet ziet in je applicatie, omdat ze
voor je zullen worden gemaakt als je gebeurtenissen en luisteraars genereert met behulp van Artisan console commando's.

Gebeurtenissen dienen als een geweldige manier om verschillende aspecten van uw applicatie los te koppelen, als één gebeurtenis kan meerdere
luisteraars hebben die niet van elkaar afhankelijk zijn. U kunt bijvoorbeeld elke
wanneer een bestelling wordt verzonden een Slack-melding naar uw gebruiker sturen. In plaats van de verwerkingscode van uw bestelling te koppelen aan uw Slack-meldingscode u kunt
een `app\events\OrderShipped` event verhogen dat een luisteraar kan ontvangen en gebruiken om een Slack-melding te verzenden.

## Gebeurtenissen & luisteraars registreren

De `app\providers\EventServiceProvider` met uw Goravel applicatie biedt een handige plaats om
al de event luisteraars van uw applicatie te registreren. De `luister` methode bevat een reeks van alle evenementen (sleutels) en hun
luisteraars (waarden). Je kunt zoveel evenementen aan deze array toevoegen als je applicatie vereist. Bijvoorbeeld, laten we een
`OrderShipped` event toevoegen:

```go
package providers

import (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/luisteraars"
)

type EventServiceProvider struct {
}

. .

func (ontvanger *EventServiceProvider) listen() map[event.Event][]event.Listener {
  retourneer kaart[event.Event][]event. istener{
    &events.OrderShipped{}: {
      &luisteraars. endShipmentNotificatie{},
    },
  }
}
```

### Events en luisteraars genereren

Je kunt de `make:event` en `make:luisteraar` Artisaanse commando's gebruiken om individuele evenementen en luisteraars te genereren:

```go
uitvoeren . artisan make:event PodcastProcessed
go run . artisan make:event user/Podcasted

go run . artisan make:listener SendPodcastNotification
start . artisan make:listener user/SendPodcastNotificatie
```

## Gebeurtenissen definiëren

Een event klasse is in wezen een datacontainer die de informatie met betrekking tot het evenement behoudt de `Handle` methode van
`event` gaat door in en retourneert het `[]event. rg` structuur, die kan worden gebruikt om gegevens te verwerken. De verwerkte gegevens zullen
worden doorgegeven aan alle `luisteraars`. Neem bijvoorbeeld een `app\events\OrderShipped` event:

```go
pakketgebeurtenissen

importeren "github.com/goravel/framework/contracts/event"

type OrderVerzonden struct {
}

func (ontvanger *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Luisteraars definiëren

Laten we dan eens kijken naar de luisteraar voor ons voorbeeld evenement. Event luisteraars ontvangen `[]event.Arg` van de event
`Handle` methode returns. Binnen de 'Handle'-methode kunt u alle acties uitvoeren die nodig zijn om te reageren op het evenement:

```go
package listeners

import (
  "github. om/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (ontvanger *SendShipmentNotificatie) Signature() string {
  retourneert "send_shipment_notification"
}

func (ontvanger *SendShipmentNotificatie) Queue(args . .any) event.Queue {
  return event. ueue{
    Ingeschakeld: false,
    verbinding: "",
    Wachtrij: "",
  }
}

func (ontvanger *SendShipmentNotificatie) Handle(args . .any) fout {
  return nil
}
```

### Stop Propagatie van een Evenement

Soms wil je misschien stoppen met het propageren van een evenement naar andere luisteraars. U kunt dit doen door een foutmelding van
van uw luisteraar 'Handle' methode te retourneren.

## Event luisteraars in wachtrij

Luisteraars in de wachtrij kunnen gunstig zijn als uw luisteraar een trage taak gaat uitvoeren, zoals het verzenden van een e-mail of het maken van
een HTTP-verzoek. Voordat u in de wachtrij luisteraars gebruikt, zorg ervoor dat u [uw wachtrij configureren] (queues) en start een wachtrij-werknemer
op uw server of lokale ontwikkelingsomgeving.

```go
pakket luisteraars

...

func (ontvanger *SendShipmentNotificatie) Wachtrij (args ...any) event.Queue {
  return event. ueue{
    Ingeschakeld: false,
    Verbinding: "",
    Wachtrij: "",
  }
}

func (ontvanger *SendShipmentNotificatie) Handle(args . .any) fout {
  name := args[0]

  return nil
}
```

### Event Listeners & Database Transacties in de wachtrij

Als luisteraars in de wachtrij worden verzonden binnen databasetransacties, kan de wachtrij ze verwerken voordat de transactie
is uitgevoerd. Wanneer dit gebeurt, eventuele updates die u hebt gemaakt naar modellen of databaserecords tijdens de
database-transactie kunnen nog niet worden weerspiegeld in de database. Bovendien mogen modellen of databasegegevens die
binnen de transactie worden gemaakt niet bestaan in de database. Als je luisteraar afhankelijk is van deze modellen, kunnen onverwachte fouten
optreden wanneer de taak die verzonden wordt in de wachtrij van de luisteraar wordt verwerkt. Op dit moment moet de gebeurtenis worden geplaatst buiten
de databasetransacties.

## Versturen gebeurtenissen

We kunnen Events versturen door de `facades.Event().Job().Dispatch()` methode.

```go
package controllers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http.Context) {
  err := facades.Event().Job(&events.OrderShipped{}, []event.Arg{
    {Type: "string", Value: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Ondersteunde Types

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
