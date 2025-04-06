# Évènements

Les événements de Goravel fournissent une simple implémentation de patrons d'observateurs, vous permettant de vous abonner et d'écouter les différents événements
qui se produisent dans votre application. Les classes d'événements sont généralement stockées dans le répertoire `app/events`, tandis que leurs auditeurs
sont stockés dans `app/listeners`. Don't worry if you don't see these directories in your application as they will
be created for you as you generate events and listeners using Artisan console commands.

Events serve as a great way to decouple various aspects of your application, as a single event can have multiple
listeners that do not depend on each other. Par exemple, vous pouvez envoyer une notification Slack à votre utilisateur chaque
fois qu'une commande est expédiée. Au lieu de coupler le code de traitement de votre commande à votre code de notification Slack vous pouvez lever
un événement `app\events\OrderShipped` qu'un listener peut recevoir et utiliser pour envoyer une notification Slack.

## Inscription d'événements et d'écouteurs

L'`app\providers\EventServiceProvider` inclus avec votre application Goravel fournit un endroit pratique pour enregistrer
tous les event listeners de votre application. La méthode `listen` contient un tableau de tous les événements (clés) et leurs auditeurs
(valeurs). Vous pouvez ajouter autant d'événements à ce tableau que votre application l'exige. Par exemple, ajoutons un événement
`OrderShipped` :

```go
importateurs de packages

(
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

### Génération d'événements et d'écouteurs

Vous pouvez utiliser les commandes Artisan `make:event` et `make:listener` pour générer des événements individuels et des écouteurs :

```go
go run . artisan make:event PodcastProcessed
go run . artisan make:event user/PodcastProcessed

go run . make:listener SendPodcastNotification
exécutez . artisan make:listener user/SendPodcastNotification
```

## Définition des événements

Une classe d'événement est essentiellement un conteneur de données qui contient les informations relatives à l'événement, la méthode `Handle` de
`event` passe et renvoie l'événement `[]. structure rg`, qui peut être utilisée pour traiter les données. Les données traitées seront
puis transmises à tous les `listeners` associés. Par exemple, supposons un événement `app\events\OrderShipped` :

```go
événements de paquet

import "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receiver *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Définition des auditeurs

Ensuite, jetons un coup d'œil à l'écouteur pour notre événement exemplaire. Les event listeners reçoivent `[]event.Arg` de la méthode d'événement
`Handle` retourne. Dans la méthode `Handle`, vous pouvez effectuer toutes les actions nécessaires pour répondre à l'événement :

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
  événement de retour. ueue{
    Activer : false,
    Connexion : "",
    File d'attente : "",
  }
}

func (récepteur *SendShipmentNotification) Handle(args . .any) erreur {
  return nil
}
```

### Arrêt de la propagation d'un événement

Parfois, vous pouvez vouloir arrêter la propagation d'un événement à d'autres auditeurs. Vous pouvez le faire en renvoyant une erreur de
la méthode `Handle` de votre écouteur.

## Écouteurs d'événements en file d'attente

Queueing listeners can be beneficial if your listener is going to perform a slow task such as sending an email or making
an HTTP request. Avant d'utiliser des auditeurs en file d'attente, assurez-vous de [configurer votre file d'attente] (queues) et de démarrer un processus de file d'attente
sur votre serveur ou votre environnement de développement local.

```go
package listeners

...

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event. ueue{
    Activer : false,
    Connexion : "",
    File : "",
  }
}

func (récepteur *SendShipmentNotification) Handle(args . .any) erreur {
  nom := args[0]

  return nil
}
```

### Écouteurs d'événements en file d'attente et transactions de base de données

Lorsque les auditeurs en file d'attente sont envoyés dans les transactions de la base de données, la file d'attente peut les traiter avant que la transaction
de la base de données ait été livrée. Quand cela se produit, toute mise à jour que vous avez faite aux modèles ou aux enregistrements de base de données pendant la transaction de la base de données
peut ne pas être reflétée dans la base de données. En outre, tous les modèles ou enregistrements de base de données créés
dans la transaction peuvent ne pas exister dans la base de données. If your listener depends on these models, unexpected errors can
occur when the job that dispatches the queued listener is processed. Pour l'instant, l'événement doit être placé en dehors de
les transactions de la base de données.

## Événements d'expédition

Nous pouvons envoyer des événements par la méthode `facades.Event().Job().Dispatch()`.

```go
contrôleurs de paquet

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

## Types supportés par `event.Arg.Type`

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
