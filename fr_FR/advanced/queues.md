# Queues

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Heureusement, Goravel offre une solution en vous permettant de créer des tâches en file d'attente que
peut exécuter en arrière-plan. De cette façon, en déplaçant des tâches à forte intensité de temps dans une file d'attente, votre application peut répondre aux demandes Web
beaucoup plus rapidement et fournir une meilleure expérience utilisateur pour vos clients. Pour implémenter cette fonctionnalité, nous utilisons
`facades.Queue()`.

Les options de configuration de la file d'attente de Goravel sont enregistrées dans le fichier de configuration `config/queue.go` de votre application. Goravel
supporte deux drivers: `redis` et `sync`.

### Connexions contre Queues

Avant d'entrer dans les files d'attente de Goravel, il est important de comprendre la différence entre les « connexions » et les « files d'attente. Dans
le fichier de configuration, `config/queue.go`, vous trouverez un tableau pour la configuration de `connections`. Cette option spécifie
les connexions aux services de file d'attente d'arrière-plan comme Redis. Cependant, chaque connexion de file d'attente peut avoir plusieurs "files d'attente", que
peut être considéré comme des piles différentes ou des tas de tâches en file d'attente.

Il est essentiel de noter que chaque exemple de configuration de connexion dans le fichier de configuration de la file d'attente inclut un attribut `queue`
. Cet attribut est la file d'attente par défaut dans laquelle les tâches seront envoyées à une connexion
donnée. En termes plus simples, si vous envoyez un job sans définir explicitement à quelle file d'attente il doit être envoyé,
la tâche sera placée dans la file d'attente définie dans l'attribut file d'attente de la configuration de la connexion.

```go
// Cette tâche est envoyée à la file d'attente par défaut de la connexion
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}). ispatch()

// Cette tâche est envoyée à la queue "emails" de la connexion par défaut
err := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).OnQueue("emails").Dispatch()
```

## Création de Jobs

### Génération des classes de tâche

Par défaut, toutes les tâches de votre application sont stockées dans le répertoire `app/jobs`. Si le répertoire `app/Jobs`
n'existe pas, il sera créé lorsque vous exécutez la commande `make:job` Artisan:

```shell
allez exécuter. artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Structure de classe

Les classes de job sont très simples, composées de deux méthodes : `Signature` et `Handle`. `Signature` sert d'identifiant distinctif
d'une tâche, tandis que `Handle` s'exécute lorsque la file d'attente traite la tâche. De plus, le `[]queue.Arg{}` a passé
lorsque la tâche exécutée sera transmise dans `Handle` :

```go
jobs de paquet

type ProcessPodcast struct {
}

// Signature Le nom et la signature du job.
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Traite l'exécution de la tâche.
func (récepteur *ProcessPodcast) Handle(args ...any) erreur {
  return nil
}
```

### Inscrire une tâche

Après avoir créé le job, vous devez l'enregistrer dans `app/provides/queue_service_provider.go`, afin qu'il puisse être appelé
correctement.

```go
func (récepteur *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
 } }
```

## Démarrer le serveur de file d'attente

Démarrez le serveur de file dans `main.go` dans le répertoire racine.

```go
import du paquet principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Ce bootstrap le framework et le prépare à l'emploi.
  bootstrap.Boot()

  // Démarre le serveur de file par façades. ueue().
  go func() {
    if err := facades. ueue().Worker().Run(); errr != nil {
      façades. og().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

Différents paramètres peuvent être passés dans la méthode `facades.Queue().Worker`, vous pouvez surveiller plusieurs files d'attente en démarrant
plusieurs `facades.Queue().Worker`.

```go
// Aucun paramètre, par défaut écoute la configuration dans la `config/queue. o`, et le nombre de concurrency est de 1
go func() {
  si err := facades. ueue().Worker().Run(); err != nil {
    façades. og().Errorf("Queue run error: %v", err)
  }
}()

// Surveiller le traitement de la file d'attente pour le lien redis, et le nombre de concurrency est 10
go func() {
  if err := facades. ueue().Worker(queue. rgs{
    Connexion : "redis",
    File d'attente: "traitement",
    Concurrence : 10,
  }). un(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## Expédition des tâches

Une fois que vous avez écrit la classe de poste, vous pouvez l'expédier en utilisant la méthode `Dispatch` sur le job lui-même :

```go
contrôleurs de paquets

import (
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
    // do something
  }
}
```

### Expédition synchronisée

Si vous voulez envoyer une tâche immédiatement (synchronisément), vous pouvez utiliser la méthode `DispatchSync`. Lorsque vous utilisez cette méthode
, la tâche ne sera pas mise en file d'attente et sera exécutée immédiatement dans le processus en cours :

```go
contrôleurs de paquets

import (
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
    // do something
  }
}
```

### Chaîne d'emplois

L'enchaînement de tâches vous permet de spécifier une liste de tâches en attente à exécuter dans un ordre spécifique. Si une tâche de la séquence
échoue, le reste des tâches ne sera pas exécuté. Pour exécuter une chaîne de travail en file d'attente, vous pouvez utiliser la méthode `Chain` fournie par
la `facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue. rg{
      {Type: "int", Value: 1},
    },
  },
  {
    Job: &jobs est1{},
    Args: []queue. rg{
      {Type: "int", Value: 2},
    },
  },
}).Dispatch()
```

### Expédition retardée

Si vous souhaitez spécifier qu'une tâche ne doit pas être traitée immédiatement par un travailleur de file d'attente, vous pouvez utiliser la méthode `Delay`
pendant l'envoi de tâches. Par exemple, précisons qu'une tâche ne devrait pas être disponible pour être traitée après 100
secondes d'expédition :

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Personnalisation de la file d’attente et de la connexion

#### Expédition vers une file d’attente particulière

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Expédition vers une connexion particulière

Si votre application interagit avec plusieurs connexions de file d'attente, vous pouvez utiliser la méthode `OnConnection` pour spécifier la connexion
à laquelle la tâche est poussée.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Vous pouvez chaîner les méthodes `OnConnection` et `OnQueue` ensemble pour spécifier la connexion et la file d'attente pour une tâche :

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## Types supportés par `queue.Arg.Type`

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
