# Coda

Quando si costruisce la tua applicazione web, ci possono essere attività, come l'analisi e la memorizzazione di un file CSV caricato, che richiedono troppo
tempo per completare durante una richiesta web. Fortunatamente, Goravel offre una soluzione consentendo di creare lavori in coda che
può eseguire in background. In questo modo, spostando i compiti ad alta intensità di tempo in una coda, la tua applicazione può rispondere alle richieste web
molto più velocemente e fornire una migliore esperienza utente per i tuoi clienti. Per implementare questa funzionalità, utilizziamo
`facades.Queue()`.

Le opzioni di configurazione della coda di Goravel sono salvate nel file di configurazione `config/queue.go` della tua applicazione. Goravel
supporta due driver: `redis` e `sync`.

### Connessioni Vs. Coda

Prima di entrare nelle code di Goravel, è importante capire la differenza tra "connessioni" e "code". In
il file di configurazione, `config/queue.go`, troverai un array per la configurazione di `connections`. Questa opzione specifica
le connessioni ai servizi di coda di backend come Redis. Tuttavia, ogni connessione in coda può avere più "code", di cui
può essere pensato come stack diversi o mucchi di lavori in coda.

È essenziale notare che ogni esempio di configurazione della connessione nel file di configurazione della coda include un attributo `queue`
. Questo attributo è la coda predefinita a cui verranno inviati i processi quando vengono inviati a una data connessione
. In termini più semplici, se si invia un lavoro senza definire esplicitamente quale coda dovrebbe essere inviato,
il lavoro verrà inserito nella coda definita nell'attributo coda della configurazione della connessione.

```go
// Questo lavoro viene inviato alla coda predefinita della connessione predefinita
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}). ispatch()

// Questo lavoro viene inviato alla coda "emails" della connessione predefinita
err := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", Valore: 1},
}).OnQueue("emails").Dispatch()
```

## Creare Processi

### Generazione Lezioni Di Lavoro

Per impostazione predefinita, tutti i processi per la tua applicazione sono memorizzati nella directory `app/jobs`. Se la directory `app/Jobs`
non esiste, verrà creata quando esegui il comando `make:job` Artigiano:

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Struttura Della Classe

Le classi di lavoro sono molto semplici, consistenti in due metodi: `Signature` e `Handle`. `Signature` funge da identificatore distinto
di un compito, mentre `Handle` esegue quando la coda elabora l'attività. Inoltre, la `[]queue.Arg{}` passata
quando il task esegue verrà trasmesso in `Handle`:

```go
package jobs

type ProcessPodcast struct {
}

// Firma Il nome e la firma del lavoro.
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Handle Execute the job.
func (ricevitore *ProcessPodcast) Errore manico(args ...any) {
  return nil
}
```

### Registra Lavoro

Dopo aver creato il lavoro, è necessario registrarlo in `app/provides/queue_service_provider.go`, in modo che possa essere chiamato correttamente
.

```go
func (receiver *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Avvia Il Server Coda

Avvia il server coda in `main.go` nella directory root.

```go
pacchetto principale di importazione

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Questo bootstraps il framework e lo rende pronto per l'uso.
  bootstrap.Boot()

  // Avvia il server coda per facciate. ueue().
  go func() {
    if err := facades. ueue().Worker().Run(); err != nil {
      facades. og().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

Parametri diversi possono essere passati nel metodo `facades.Queue().Worker`, è possibile monitorare più code avviando
multipli `facades.Queue().Worker`.

```go
// Nessun parametro, predefinito ascolta la configurazione nella `config/queue. o`, e il numero di convaluta è 1
go func() {
  if err := facades. ueue().Worker().Run(); err != nil {
    facades. og().Errorf("Queue run error: %v", err)
  }
}()

// Monitor processing queue for redis link, and the number of concurrency is 10
go func() {
  if err := facades. ueue().Worker(queue. rgs{
    Connection: "redis",
    Queue: "processing",
    Concorrente: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## Trasmissione Processi

Una volta scritta la classe di lavoro, puoi inviarla con il metodo `Dispatch` sul lavoro stesso:

```go
package controller

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

### Spedizione Sincrona

Se si desidera inviare un lavoro immediatamente (sincronizzato), è possibile utilizzare il metodo `DispatchSync`. Quando si utilizza questo metodo
, il processo non verrà accodato e verrà eseguito immediatamente all'interno del processo corrente:

```go
package controller

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

### Job Chaining

Job chaining consente di specificare un elenco di processi in coda da eseguire in un ordine specifico. Se un job nella sequenza
fallisce, il resto dei lavori non verrà eseguito. Per eseguire una catena di lavoro in coda, puoi usare il metodo `Chain` fornito da
le `facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue. rg{
      {Type: "int", Valore: 1},
    },
  },
  {
    Lavoro: &jobs est1{},
    Args: []coda. rg{
      {Type: "int", Value: 2},
    },
  },
}).Dispatch()
```

### Spedizione Ritardata

Se si desidera specificare che un lavoro non deve essere immediatamente elaborato da un lavoratore in coda, puoi usare il metodo `Delay`
durante l'invio del lavoro. Ad esempio, specificiamo che un lavoro non dovrebbe essere disponibile per l'elaborazione dopo 100
secondi di spedizione:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Personalizzare La Coda E La Connessione

#### Dispatching In Una Coda Particolare

Spingendo i lavori in code diverse, puoi "categorizzare" i tuoi lavori in coda e persino dare la priorità a quanti lavoratori
assegnano alle code diverse.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Spedizione A Una Connessione Particolare

Se l'applicazione interagisce con più connessioni in coda, è possibile utilizzare il metodo `OnConnection` per specificare la connessione
a cui l'attività viene spinta.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Puoi incatenare i metodi `OnConnection` e `OnQueue` insieme per specificare la connessione e la coda per un lavoro:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` Tipi Supportati

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
