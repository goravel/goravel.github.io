# Ereignisse

Die Ereignisse von Goravel bieten eine einfache Beobachtermuster-Implementierung, mit der Sie verschiedene
-Ereignisse abonnieren und hören können, die innerhalb Ihrer Anwendung auftreten. Ereignisklassen werden normalerweise im `app/events`-Verzeichnis gespeichert, während ihre
Hörer in `app/listeners` gespeichert werden. Keine Sorge, wenn Sie diese Verzeichnisse nicht in Ihrer Anwendung sehen, da sie
für Sie erstellt werden, während Sie Ereignisse und Hörer mit Artisan Konsolen Befehlen generieren.

Veranstaltungen dienen als hervorragende Möglichkeit, verschiedene Aspekte Ihrer Anwendung zu entkoppeln als einzelnes Ereignis können mehrere
Hörer haben, die nicht voneinander abhängig sind. For example, you may wish to send a Slack notification to your user each
time an order is shipped. Anstatt Ihren Bestell-Verarbeitungscode an Ihren Slack Benachrichtigungscode zu koppeln du kannst
ein `app\events\OrderShipped` Event anheben, das ein Hörer erhalten und verwenden kann, um eine Slack Benachrichtigung zu versenden.

## Ereignisse & Hörer registrieren

The `app\providers\EventServiceProvider` included with your Goravel application provides a convenient place to register
all of your application's event listeners. Die `listen` Methode enthält ein Array aller Ereignisse (Schlüssel) und deren
Hörer (Werte). Sie können diesem Array beliebig viele Ereignisse hinzufügen, wie es Ihre Anwendung erfordert. Fügen wir zum Beispiel ein
`OrderShipped` Event hinzu:

```go
Paket Provider

importieren (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (Empfänger *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]event. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Ereignisse & Hörer werden generiert

Du kannst die Befehle `make:event` und `make:listener` Artisan verwenden, um individuelle Ereignisse und Hörer zu generieren:

```go
go run . artisan make:event PodcastProcessed
go run . künstlerische make:event user/PodcastProcessed

go run . artisan make:listener SendPodcastNotification
go run . artisan make:listener user/SendPodcastNotification
```

## Ereignisse definieren

Eine Ereignis-Klasse ist im Wesentlichen ein Daten-Container, der die mit dem Ereignis verbundenen Informationen enthält die `Handle` Methode von
`event` geht an und gibt das `[]Event zurück. rg`-Struktur, die zur Verarbeitung von Daten verwendet werden kann. Die verarbeiteten Daten werden
dann an alle zugehörigen 'Zuhörer' weitergegeben. Nehmen wir zum Beispiel ein `app\events\OrderShipped` Event an:

```go
Paket-Ereignisse

Import "github.com/goravel/framework/contracts/event"

Typ OrderVerschiffter struct {
}

func (Empfänger *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Hörer definieren

Dann werfen wir einen Blick auf den Zuhörer für unsere Beispiel-Veranstaltung. Ereignishörer erhalten `[]event.Arg` des Ereignisses
`Handle` zurückgegeben. Innerhalb der `Handle` Methode kannst du alle notwendigen Aktionen ausführen, um auf das Ereignis zu antworten:

```go
package listeners

import (
  "github. om/goravel/framework/contracts/event"
)

Typ SendShipmentNotification struct {
}

func (Empfänger *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (Empfänger *SendShipmentNotification) Queue(args . .any) event.Queue {
  return event. ueue{
    Aktivieren: false,
    Verbindung: "",
    Warteschlange: "",
  }
}

func (Empfänger *SendShipmentNotification) Handle (args . .any) Fehler {
  return nil
}
```

### Die Ausbreitung eines Ereignisses stoppen

Manchmal möchten Sie die Weitergabe eines Ereignisses an andere Zuhörer stoppen. Du kannst dies tun, indem du einen Fehler von
der `Handle` Methode deines Zuhörers zurückgibst.

## Warteschlange Ereignishörer

Die Warteschlange kann vorteilhaft sein, wenn Ihr Zuhörer eine langsame Aufgabe wie das Senden einer E-Mail oder das Erstellen von
zu einer HTTP-Anfrage ausführen wird. Bevor Sie Warteschlange verwenden, stellen Sie sicher, dass Sie [Ihre Warteschlange konfigurieren](queues) und starten Sie einen Warteschlangenarbeiter
auf Ihrem Server oder Ihrer lokalen Entwicklungsumgebung.

```go
Paket Listeners

...

func (Empfänger *SendShipmentNotification) Warteschlange (args ...any) event.Queue {
  return event. ueue{
    Aktivieren: false,
    Verbindung: "",
    Warteschlange: "",
  }
}

Func (Empfänger *SendShipmentNotification) Handle (args . .any) Fehler {
  name := args[0]

  return nil
}
```

### Warteschlange Ereignishörer & Datenbanktransaktionen

Wenn Hörer in der Warteschlange in Datenbanktransaktionen versandt werden, kann die Warteschlange diese verarbeiten, bevor die
-Transaktion durchgeführt wurde. Wenn dies geschieht, alle Aktualisierungen, die du während der
Datenbank-Transaktion an Modelle oder Datensätze vorgenommen hast, werden möglicherweise noch nicht in der Datenbank reflektiert. Darüber hinaus können Modelle oder Datenbankeinträge
innerhalb der Transaktion nicht in der Datenbank existieren. Wenn Ihr Zuhörer von diesen Modellen abhängt, können unerwartete Fehler
auftreten, wenn der Job bearbeitet wird, der den Listener in der Warteschlange versendet. Zu diesem Zeitpunkt muss das Ereignis außerhalb von
der Datenbanktransaktionen platziert werden.

## Versandvorgänge

Wir können Events per `facades.Event().Job().Dispatch()` Methode versenden.

```go
Paket Controller

importieren (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []event. rg{
    {Typ: "string", Wert: "Goravel"},
    {Typ: "int", Wert: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Unterstützte Typen

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
