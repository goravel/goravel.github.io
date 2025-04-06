# Planification des tâches

Dans le passé, vous pourriez avoir besoin de créer une entrée de configuration cron pour chaque tâche qui devait être planifiée sur votre serveur.
Cependant, cette approche peut rapidement devenir une douleur car votre calendrier de tâches n'est pas en mesure de contrôler la source. et vous devez SSH
dans votre serveur pour voir ou ajouter/éditer des entrées cron.

Le planificateur de commandes de Goravel offre une nouvelle approche pour gérer les tâches planifiées sur votre serveur. Avec le planificateur, vous
pouvez facilement et clairement définir votre planning de commandes dans votre application Goravel. En utilisant le planificateur, vous n'avez besoin que de
pour créer une seule entrée cron sur votre serveur.

## Définition des calendriers

Pour planifier des tâches pour votre application, vous pouvez les définir dans la méthode `Schedule` dans `app\console\kernel.go`.
considérons un exemple pour mieux comprendre cela. Dans ce cas, nous voulons planifier une fermeture qui fonctionnera tous les jours à
minuit. À l'intérieur de cette fermeture, nous allons exécuter une requête de base de données pour effacer une table:

```go
console de paquet

import (
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

### Planification des commandes Artisan

En plus de planifier des fermetures, vous pouvez aussi planifier des [commandes Artisanes](./artisan). Par exemple, vous pouvez
utiliser la méthode `Command` pour planifier une commande Artisan en utilisant le nom de la commande ou la classe.

```go
console de paquet

import (
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

### Niveau de journalisation

Quand `app.debug` est `true`, la console affichera tous les logs. Sinon, seuls les logs de niveau `erreur` seront affichés.

### Options de fréquence du planning

Nous avons déjà vu quelques exemples de la façon dont vous pouvez configurer une tâche à exécuter à des intervalles spécifiés. Cependant, il y a beaucoup
de fréquences de planification de tâches disponibles pour assigner aux tâches :

| 方法                       | 描述                                                             |
| ------------------------ | -------------------------------------------------------------- |
| `.Cron("* * * * *")`     | Exécuter la tâche sur un planning cron personnalisé            |
| `.EveryMinute()`         | Exécuter la tâche chaque minute                                |
| `.EveryTwoMinutes()`     | Exécuter la tâche toutes les deux minutes                      |
| `.EveryThreeMinutes()`   | Exécuter la tâche toutes les trois minutes                     |
| `.EveryFourMinutes()`    | Exécuter la tâche toutes les quatre minutes                    |
| `.EveryFiveMinutes()`    | Exécuter la tâche toutes les cinq minutes                      |
| `.EveryTenMinutes()`     | Exécuter la tâche toutes les dix minutes                       |
| `.EveryFifteenMinutes()` | Exécuter la tâche toutes les quinze minutes                    |
| `.EveryThirtyMinutes()`  | Exécuter la tâche toutes les trente minutes                    |
| `.Hourly()`              | Exécuter la tâche toutes les heures                            |
| `.HourlyAt(17)`          | Exécuter la tâche toutes les heures à 17 minutes après l'heure |
| `.EveryTwoHours()`       | Exécuter la tâche toutes les deux heures                       |
| `.EveryThreeHours()`     | Exécuter la tâche toutes les trois heures                      |
| `.EveryFourHours()`      | Exécuter la tâche toutes les quatre heures                     |
| `.EverySixHours()`       | Exécuter la tâche toutes les six heures                        |
| `.Daily()`               | Exécuter la tâche tous les jours à minuit                      |
| `.DailyAt("13:00")`      | Exécuter la tâche tous les jours à 13:00       |

### Empêcher les chevauchements de tâches

Par défaut, les tâches planifiées continueront d'être exécutées même si une instance précédente est toujours en cours d'exécution. Pour éviter cela, utilisez les méthodes
suivantes :

| 方法                       | 描述                                       |
| ------------------------ | ---------------------------------------- |
| `.SkipIfStillRunning()`  | Ignorer si toujours en cours d'exécution |
| `.DelayIfStillRunning()` | Délai si toujours en cours d'exécution   |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### Tâches en cours sur un seul serveur

> Pour utiliser cette fonctionnalité, votre application doit utiliser le pilote de cache memcached, dynamodb, ou redis comme pilote de cache par défaut
> . En outre, tous les serveurs doivent communiquer avec le même serveur de cache central.

If your application's scheduler runs on multiple servers, you can ensure that a scheduled job is executed on only one of
them. Par exemple, disons que vous avez une tâche planifiée qui génère un nouveau rapport chaque vendredi soir. Si le planificateur de tâche
s'exécute sur trois serveurs de travail, la tâche planifiée s'exécutera sur les trois serveurs et créera le rapport trois
fois. Ce n'est pas idéal!

Pour éviter cela, utilisez la méthode `OnOneServer` lors de la définition de la tâche planifiée, qui s'assurera que la tâche exécute
sur un seul serveur. Le premier serveur à recevoir la tâche va sécuriser un verrou atomique sur la tâche, empêchant d'autres serveurs
d'exécuter la même tâche en même temps :

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Les fermetures planifiées doivent être assignées à un nom si elles sont destinées à être exécutées sur un serveur:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Exécuter le planificateur

Maintenant que nous avons appris à définir des tâches planifiées, nous allons discuter de la façon de les exécuter sur notre serveur.

Ajoute `go facades.Schedule().Run()` au fichier `main.go` de la racine.

```go
import du paquet principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Ce bootstrap le framework et le prépare à l'emploi.
  bootstrap.Boot()

  // Démarre le planning par facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## Arrêt du planificateur

Vous pouvez appeler la méthode `Shutdown` pour fermer gracieusement le planificateur. This method will wait for all tasks to
complete before shutting down.

```go
// main.go
bootstrap.Boot()

// Créer un canal pour écouter les signaux
quit := make(chan os.Signal)
. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Démarrer le planning par facades.Schedule
go facades.Schedule(). un()

// Écouter le signal
aller func() {
  <-quit
  si err := facades. chedule().Shutdown(); errr != nil {
    façades. og().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```
