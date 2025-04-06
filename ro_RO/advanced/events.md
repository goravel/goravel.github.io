# Evenimente

Evenimentele Goravel oferă o simplă implementare a modelului de observator, permițându-vă să vă abonați și să ascultați diferite evenimente
care au loc în aplicația dvs. Clasele de evenimente sunt de obicei stocate în folderul `app/events`, în timp ce ascultătorii
sunt stocați în `app/listeners`. Don't worry if you don't see these directories in your application as they will
be created for you as you generate events and listeners using Artisan console commands.

Evenimentele servesc ca un mod excelent de a decupla diverse aspecte ale aplicației tale, ca un singur eveniment poate avea mai mulți ascultători
care nu depind unii de alții. For example, you may wish to send a Slack notification to your user each
time an order is shipped. În loc să vă cuplați codul de procesare a comenzii la codul de notificare Slack poți ridica
un eveniment `app\events\OrderShipped` pe care un ascultător îl poate primi și folosi pentru a expedia o notificare Slack.

## Înregistrare evenimente și ascultători

`app\providers\EventServiceProvider` inclus în aplicația ta Goravel oferă un loc convenabil pentru înregistrarea
a tuturor ascultătorilor de evenimente ai aplicației tale. Metoda `ascultă` conţine un array cu toate evenimentele (tastele) şi ascultătorii lor
(valori). Puteți adăuga la acest array câte evenimente necesită aplicația dvs. De exemplu, hai să adăugăm un eveniment
`OrderShipped`:

```go
furnizorii de pachete

import (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (destinatar *EventServiceProvider) ascultă() harta[event.Event][]event.Listener {
  return map[event.Event][]eveniment. istener{
    &events.OrderShipped{}: {
      &ascultători endShipmentNotification{},
    },
  }
}
```

### Genereaza evenimente si ascultatori

Puteți folosi comenzile `make:event` și `make:listener` Artizan pentru a genera evenimente și ascultători individuali:

```go
mergi să rulezi . artizan:event PodcastProcessed
mergi . artizan make:event user/PodcastProcessed

mergi . Mama artizanală:listener SendPodcastNotification
rulați . Mama artizanală:listener user/SendPodcastNotification
```

## Definirea Evenimentelor

O clasă de evenimente este în esență un container de date care conține informațiile referitoare la eveniment, metoda `Handle` a lui
trece şi returnează `[]evenimentul. structura rg, care poate fi folosită pentru procesarea datelor. The processed data will
then be passed on to all associated `listeners`. De exemplu, să presupunem un eveniment `app\events\OrderShipped\`:

```go
evenimente

import "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receptor *OrderShipped) Handle(args []event.Arg) ([]event.Arg, eroare) {
  return args, nil
}
```

## Definirea Ascultătorilor

Apoi, hai să aruncăm o privire la ascultător pentru exemplul nostru eveniment. Ascultatorii evenimentului primesc `[]event.Arg` al evenimentului
metoda `Handle` returnează. În cadrul metodei `Handle`, puteţi efectua orice acţiuni necesare pentru a răspunde la eveniment:

```go
ascultătorii

de import (
  "github. om/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (destinatar *SendShipmentNotification) Signature() {
  return "send_shipment_notification"
}

func (destinatar *SendShipmentNotification) Queue(args . .any) eveniment.Queue {
  return event ueue{
    Active: false,
    Conexiune: "", coada
    : "",
  }
}

func (receptor *SendShipmentNotification) Handle(argi . .any) eroare {
  return nil
}
```

### Oprirea propagării unui eveniment

Uneori, poate doriţi să opriţi propagarea unui eveniment pentru alţi ascultători. Poți face acest lucru prin returnarea unei erori de la
metoda `Handle` a ascultătorului tău.

## Ascultători de Evenimente în așteptare

Ascultatorii care stau în așteptare pot fi benefici dacă ascultătorul tău va efectua o sarcină lentă, cum ar fi trimiterea unui e-mail sau trimiterea de
o cerere HTTP. Înainte de a folosi lista de ascultători, asigură-te că [configurezi coada de așteptare](queues) și pornește un lucrător în coadă
pe serverul tău sau mediul de dezvoltare locală.

```go
listeners

...

func (destinatar *SendShipmentNotification) coadă (incarcări ...any) eveniment.Coada {
  returnează evenimentul. ueue{
    Active: false,
    Conexiune: "",
    coada: "",
  }
}

func (receptor *SendShipmentNotification) Handle(args . .any) nume {
  := args[0]

  return nil
}
```

### Ascultători de Evenimente și Tranzacții în Baza de Date

Când ascultătorii de coadă sunt expediați în tranzacțiile din baza de date, coada de redare poate fi procesată înainte ca baza de date
să fi fost angajată tranzacția. Când se întâmplă acest lucru, orice actualizări pe care le-ați făcut la modelele sau bazele de date înregistrate în timpul operațiunii
este posibil ca tranzacția să nu fie încă reflectată în baza de date. În plus, orice modele sau baze de date de înregistrare create
în cadrul tranzacției ar putea să nu existe în baza de date. Dacă ascultătorul dvs. depinde de aceste modele, erorile neașteptate pot apărea
atunci când sarcina care expediază lista de ascultare este procesată. În acest moment, evenimentul trebuie plasat în afara lui
a bazei de date.

## Evenimente de expediere

Putem expedia evenimente prin metoda `facades.Event().Job().Dispatch()`.

```go
controlerele

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []eveniment. rg{
    {Tipul: "string", Value: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` Tipuri suportate

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
