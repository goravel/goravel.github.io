# Pianificazione Attività

In passato, potrebbe essere necessario creare una voce di configurazione cron per ogni attività che ha richiesto la pianificazione sul server.
Tuttavia, questo approccio può rapidamente diventare un dolore come il vostro programma di attività non è nel controllo sorgente, e devi inserire SSH
nel tuo server per visualizzare o aggiungere/modificare le voci cron.

Lo scheduler dei comandi di Goravel offre un nuovo approccio alla gestione delle attività pianificate sul tuo server. Con lo scheduler,
è in grado di definire facilmente e chiaramente la pianificazione dei comandi all'interno dell'applicazione Goravel. Utilizzando lo scheduler, hai solo bisogno di
per creare una singola voce cron sul tuo server.

## Definizione Di Schedules

Per pianificare le attività per la tua applicazione, puoi definirle nel metodo `Schedule` in `app\console\kernel.go`. Let's
consider an example to understand this better. In questo caso, vogliamo programmare una chiusura che si svolgerà ogni giorno a mezzanotte
. All'interno di questa chiusura, eseguiremo una query di database per cancellare una tabella:

```go
package console

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

### Pianificazione Comandi Artigiani

Oltre alle chiusure di pianificazione, puoi anche pianificare [Comandi artigianali](./artisan). Ad esempio, puoi usare
il metodo `Command` per pianificare un comando Artigiano usando il nome del comando o la classe.

```go
package console

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

### Livello Di Registrazione

Quando `app.debug` è `true`, la console stamperà tutti i registri. Altrimenti, verranno stampati solo i log di livello `error`.

### Opzioni Di Pianificazione Frequenza

Abbiamo già visto alcuni esempi di come configurare un'attività da eseguire a intervalli specificati. Tuttavia, ci sono molte frequenze di pianificazione di attività
più disponibili da assegnare alle attività:

| 方法                       | 描述                                                          |
| ------------------------ | ----------------------------------------------------------- |
| `.Cron("* * * * *")`     | Esegue l'attività su una pianificazione cron personalizzata |
| `.EveryMinute()`         | Esegui l'attività ogni minuto                               |
| `.EveryTwoMinutes()`     | Esegui l'attività ogni due minuti                           |
| `.EveryThreeMinutes()`   | Esegui l'attività ogni tre minuti                           |
| `.EveryFourMinutes()`    | Esegui l'attività ogni quattro minuti                       |
| `.EveryFiveMinutes()`    | Esegui l'attività ogni cinque minuti                        |
| `.EveryTenMinutes()`     | Esegui l'attività ogni dieci minuti                         |
| `.EveryFifteenMinutes()` | Esegui l'attività ogni quindici minuti                      |
| `.EveryThirtyMinutes()`  | Esegui l'attività ogni trenta minuti                        |
| `.Hourly()`              | Esegui l'attività ogni ora                                  |
| `.HourlyAt(17)`          | Eseguire l'attività ogni ora a 17 minuti dopo l'ora         |
| `.EveryTwoHours()`       | Esegui l'attività ogni due ore                              |
| `.EveryThreeHours()`     | Esegui l'attività ogni tre ore                              |
| `.EveryFourHours()`      | Esegui l'attività ogni quattro ore                          |
| `.EverySixHours()`       | Esegui l'attività ogni sei ore                              |
| `.Daily()`               | Esegui l'attività ogni giorno a mezzanotte                  |
| `.DailyAt("13:00")`      | Eseguire il compito ogni giorno alle 13:00  |

### Prevenire Sovrapposizioni Attività

Per impostazione predefinita, le attività pianificate continueranno ad essere eseguite anche se un'istanza precedente è ancora in esecuzione. To prevent this, use the
following methods:

| 方法                       | 描述                              |
| ------------------------ | ------------------------------- |
| `.SkipIfStillRunning()`  | Salta se ancora in esecuzione   |
| `.DelayIfStillRunning()` | Ritardo se ancora in esecuzione |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### Esecuzione Di Compiti Su Un Server

> Per utilizzare questa funzione, la tua applicazione deve usare il driver cache memcached, dynamodb o redis come driver cache predefinito
> . Inoltre, tutti i server devono comunicare con lo stesso server cache centrale.

Se lo scheduler della tua applicazione viene eseguito su più server, puoi assicurarti che un lavoro programmato venga eseguito solo su uno di essi
. Per esempio, diciamo che hai un compito programmato che genera un nuovo rapporto ogni venerdì sera. Se lo scheduler dell'attività
viene eseguito su tre server worker, l'attività pianificata verrà eseguita su tutti e tre i server e creare il report tre volte
. Questo non è ideale!

Per evitare ciò, utilizzare il metodo `OnOneServer` quando si definisce l'attività pianificata, che assicurerà che l'attività esegua
su un solo server. Il primo server a ricevere l'attività proteggerà un blocco atomico sul lavoro, impedire ad altri server
di eseguire contemporaneamente la stessa attività:

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Le chiusure pianificate devono essere assegnate a un nome se sono destinate ad essere eseguite su un server:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Eseguire Lo Scheduler

Ora che abbiamo imparato a definire le attività pianificate, discutiamo come eseguirle sul nostro server.

Aggiungi `go facades.Schedule().Run()` al file radice `main.go`.

```go
pacchetto principale di importazione

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Questo bootstraps il framework e lo rende pronto per l'uso.
  bootstrap.Boot()

  // Start schedule by facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## Interrompere Lo Scheduler

Puoi chiamare il metodo `Shutdown` per spegnere con grazia lo scheduler. Questo metodo aspetterà che tutte le attività siano completate da
prima di chiudersi.

```go
// main.go
bootstrap.Boot()

// Crea un canale per ascoltare i segnali OS
quit := make(chan os.Signal)
segnale. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Start schedule by facades.Schedule
go facades.Schedule(). un()

// Ascolta per il segnale OS
go func() {
  <-quit
  if err := facades. chedule().Shutdown(); err != nil {
    facades. og().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```
