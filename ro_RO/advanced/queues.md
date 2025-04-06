# Cozi

Când construiești aplicația ta web, pot exista sarcini, cum ar fi parsarea și stocarea unui fișier CSV încărcat, care durează prea mult
pentru a completa în timpul unei solicitări web. Din fericire, Goravel oferă o soluție, permițându-vă să creați locuri de muncă la coadă pe care
le poate rula în fundal. Astfel, prin deplasarea sarcinilor cu timp îndelungat la coadă, aplicația ta poate răspunde la cererile web
mult mai rapid și poate oferi o experiență mai bună clienților tăi. Pentru a implementa această caracteristică, folosim
`facades.Queue()`.

Opțiunile de configurare în coadă ale Goravel sunt salvate în fișierul de configurare `config/queue.go` al aplicației. Goravel
suportă doi şoferi: `redis` şi `sync`.

### Conexiuni V. Cozi

Înainte de a trece în cozile de la Goravel, este important să înțelegem diferența dintre „conexiuni” și „cozi”. În
fișierul de configurare, `config/queue.go`, vei găsi un array pentru configurația `connections`. Această opțiune specifică
conexiunile pentru serviciile din backend în așteptare precum Redis. Cu toate acestea, fiecare conexiune în coadă poate avea mai multe "cozi", pe care
le poate considera ca fiind diferite stive sau grămezi de joburi în coadă.

Este esențial să rețineți că fiecare exemplu de configurare a conexiunii din fișierul de configurare a cozii include un atribut
\`coadă. Acest atribut este coada de așteptare implicită la care vor fi expediate joburile atunci când sunt trimise la o conexiune
dată. În termeni mai simpli, dacă expediezi un job fără a defini în mod explicit ce coadă ar trebui să fie expediată,
treaba va fi plasată în coada de așteptare definită în atributul de configurare a conexiunii.

```go
// Această sarcină este trimisă la coada de așteptare implicită
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", valoare: 1},
}). ispatch()

// Această sarcină este trimisă la coada de așteptare
err a conexiunii implicite := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", value: 1},
}).OnQueue("emails").Dispatch()
```

## Crearea de joburi

### Generarea claselor de muncă

În mod implicit, toate sarcinile pentru aplicația dvs. sunt stocate în directorul `app/jobs`. Dacă directorul `app/Jobs`
nu există, acesta va fi creat atunci când executați comanda `make:job` Artisan:

```shell
mergi să rulezi . make:job ProcessPodcast
mergi să rulezi . make:job utilizator/ProcessPodcast
```

### Structura clasei

Clasele de locuri de muncă sunt foarte simple, constând din două metode: `Signature` şi `Handle`. `Signature` serveşte ca identificator distinct al sarcinii
în timp ce `Handle` se execută atunci când coada procesează sarcina. În plus, `[]queue.Arg{}` a trecut de
când sarcina executată va fi transmisă în `Handle`:

```go
pachetele de joburi

tip ProcessPodcast struct {
}

// Semnează numele și semnătura lucrării. Șirul
func (receptor *ProcessPodcast) signature() {
  returnează "proces_podcast"
}

// Handle execută sarcina.
func (receptor *ProcessPodcast) Eroare de manipulare (argi ...any) {
  return nil
}
```

### Înregistrează job

După crearea postului, trebuie să îl înregistrați în `app/provides/queue_service_provider.go`, astfel încât să poată fi numit
corect.

```go
func (receptor *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Pornire server de coadă

Porniți coada de server în `main.go` în directorul rădăcină.

```go
importarea pachetului principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Acest bootstraps cadrul şi îl pregăteşte pentru utilizare.
  bootstrap.Boot()

  // Pornește serverul de coadă de fațade. ueue().
  go func() {
    if err := facades. ueue().Worker().Run(); err != nil {
      fațades. og().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

Different parameters can be passed in the `facades.Queue().Worker` method, you can monitor multiple queues by starting
multiple `facades.Queue().Worker`.

```go
// Fără parametri, ascultă configurația implicită în `config/coadă. o`, iar numărul de concurrency este 1
go func() {
  if err := facades. ueue().Worker().Run(); err != nil {
    fațades. og().Errorf("Queue run error: %v", eroare)
  }
}()

// Monitorizează lista de procesare pentru link-ul de redis, iar numărul de concurrency este 10
go func() {
  if err := facades. ueu().Worker(coadă. rgs{
    Conexiune: "redis",
    Coadă: "processing",
    Concurent: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## Expediere Joburi

Odată ce ai scris clasa de lucru, o poți expedia folosind metoda `Dispatch` la locul de muncă însuși:

```go
controlerele

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
  dacă err != nil {
    // fă ceva
  }
}
```

### Dispecerat sincron

Dacă doriți să expediați imediat un job (sincronizat), puteți utiliza metoda `DispatchSync`. Când se utilizează această metodă
, sarcina nu va fi pusă în coadă și va fi executată imediat în cadrul procesului curent:

```go
controlerele

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
  dacă err != nil {
    // fă ceva
  }
}
```

### Lanț de muncă

Colectarea de locuri de muncă vă permite să specificați o listă de joburi în coadă care vor fi executate într-o anumită ordine. În cazul în care o sarcină din secvența
eșuează, restul funcțiilor nu vor fi executate. Pentru a rula un lanţ de locuri de muncă, puteţi utiliza metoda `Chain` furnizată de
`facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []coadă. rg{
      {Type: "int", Value: 1},
    },
  },
  {
    Job: &job-uri. est1{},
    Args: []coadă. rg{
      {Type: "int", value: 2},
    },
  },
}).Dispatch()
```

### Expedierea cu întârziere

Dacă doriți să specificați că un job nu ar trebui să fie procesat imediat de către un lucrător în așteptare, puteți utiliza metoda `Delay`
în timpul expedierii job-ului. De exemplu, să specificăm că o sarcină nu ar trebui să fie disponibilă pentru procesare după 100
secunde de expediere:

```go
err := facades.coadă().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second).Dispatch()
```

### Personalizând coada și conexiunea

#### Expediere la o coadă specială

Prin împingerea joburilor la diferite cozi, poți "clasifica" joburile tale de coadă și chiar să prioritizezi numărul de muncitori
atribui mai multor cozi.

```go
err := facades.coadă().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Expediere către o conexiune specială

În cazul în care aplicația interacționează cu mai multe conexiuni în coadă, puteți utiliza metoda `OnConnection` pentru a specifica conexiunea
la care sarcina este apăsată.

```go
err := facades.coadă().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Poți să lanțezi metodele `OnConnection` și `OnQueue` împreună pentru a specifica conexiunea și coada pentru un job:

```go
err := facades.coadă().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` Tipuri suportate

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
