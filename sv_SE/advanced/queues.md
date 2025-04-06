# Köer

När du bygger din webbapplikation kan det finnas uppgifter, som att parsa och lagra en uppladdad CSV-fil, som tar för
lång tid att slutföra under en webbförfrågan. Lyckligtvis erbjuder Goravel en lösning genom att låta dig skapa köade jobb som
kan köra i bakgrunden. På detta sätt genom att flytta tidskrävande uppgifter till en kö, din applikation kan svara på webb
begär mycket snabbare och ger en bättre användarupplevelse för dina kunder. För att implementera denna funktion använder vi
`facades.Queue()`.

Goravels kökonfigurationsalternativ sparas i konfigurationsfilen för din applikation 'config/queue.go'. Goravel
stöder två drivrutiner: `redis` och `sync`.

### Anslutningar Vs. Köer

Innan du gräver i Goravel köer är det viktigt att förstå skillnaden mellan "anslutningar" och "köer". I
konfigurationsfilen, `config/queue.go`, hittar du en matris för `connections` konfiguration. Det här alternativet anger
anslutningarna till backend-kötjänster som Redis. Varje köanslutning kan dock ha flera "köer", vilket
kan betraktas som olika stackar eller högar av köade jobb.

Det är viktigt att notera att varje anslutningsexempel i kökonfigurationsfilen innehåller ett `queue`
-attribut. Detta attribut är standardkön som jobb kommer att skickas till när de skickas till en given
-anslutning. I enklare termer, om du skickar ett jobb utan att uttryckligen definiera vilken kö det ska skickas till,
jobbet kommer att placeras i kön definierad i kö-attribut för anslutningskonfigurationen.

```go
// Detta jobb skickas till standardanslutningens standardkö
err := facades.Queue().Jobb(&jobs.Test{}, []queue.Arg{
  {Typ: "int", Värde: 1},
}). ispatch()

// Detta jobb skickas till standardanslutningens "e-post"-kö
err := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", värde: 1},
}).OnQueue("e-post").Dispatch()
```

## Skapar jobb

### Genererar jobbklasser

Som standard lagras alla jobb för din applikation i katalogen 'app/job'. Om `app/Jobs`-katalogen
inte existerar, skapas den när du kör `make:job` Artisan-kommandot:

```shell
gå kör. hantverkare make:job ProcessPodcast
gå att köra. hantverkare make:job user/ProcessPodcast
```

### Klassens struktur

Jobbklasser är mycket enkla, bestående av två metoder: `Signatur` och `Handle`. `Signatur` fungerar som en uppgifts
distinkt identifierare, medan `Handle` körs när kön bearbetar uppgiften. Dessutom skickade `[]queue.Arg{}`
när uppgiften körs överförs till `Handle`:

```go
package jobs

type ProcessPodcast struct {
}

// Signatur Jobbets namn och signatur.
func (receiver *ProcessPodcast) Signatur() sträng {
  returnera "process_podcast"
}

// Handle Utför jobbet.
func (receiver *ProcessPodcast) Handtag(args ...any) fel {
  return nil
}
```

### Registrera jobb

Efter att du skapat jobbet måste du registrera det i `app/provides/queue_service_provider.go`, så att det kan kallas
korrekt.

```go
func (receiver *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Starta köserver

Starta köservern i `main.go` i rotkatalogen.

```go
paket main

import (
  "github. om/goravel/frameing/facades"

  "goravel/bootstrap"
)

func main() {
  // Detta bootstraps ramverket och blir klart för användning.
  bootstrap.Boot()

  // Starta köserver av fasader. ueue().
  go func() {
    if err := fasader. ueue().Arbetare().Kör(); err != nil {
      fasader. og().Errorf("Kökörning fel: %v", err)
    }
  }()

  select {}
}
```

Olika parametrar kan skickas i `facades.Queue().Arbetar`-metoden, du kan övervaka flera köer genom att starta
flera `facades.Queue().Worker`.

```go
// Inga parametrar, standard lyssnar på konfigurationen i `config/queue. o`, och antalet concurrency är 1
go func() {
  om err := fasader. ueue().Arbetare().Kör(); err != nil {
    fasader. og().Errorf("Kökörning fel: %v", err)
  }
}()

// Övervaka bearbetning kö för redis länk, och antalet concurrency är 10
go func() {
  om err := fasader. ueue().Arbetare(kö. rgs{
    Anslutning: "redis",
    Kö: "bearbetning",
    Samgående: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Kökörning fel: %v", err)
  }
}()
```

## Skicka jobb

När du har skrivit jobbklassen kan du skicka den med hjälp av metoden `Dispatch` på jobbet själv:

```go
paketstyrningar

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/frameing/contracts/http"
  "github. om/goravel/frameing/facades"

  "goravel/app/jobb"
)

type UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Jobb(&jobs.Test{}, []queue.Arg{}). ispatch()
  if err != nil {
    // do something
  }
}
```

### Synkron avsändning

Om du vill skicka ett jobb omedelbart (synkroniserat) kan du använda `DispatchSync`-metoden. När du använder denna
-metod kommer jobbet inte att köas och kommer att köras omedelbart inom den aktuella processen:

```go
paketstyrningar

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/frameing/contracts/http"
  "github. om/goravel/frameing/facades"

  "goravel/app/jobb"
)

type UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Jobb(&jobs.Test{}, []queue.Arg{}). ispatchSync()
  if err != nil {
    // do something
  }
}
```

### Jobb Kedjning

Jobbkedjning gör att du kan ange en lista över köade jobb som ska utföras i en viss ordning. Om något jobb i sekvensen
misslyckas, kommer resten av jobben inte att utföras. För att köra en köad jobbkedja kan du använda `Chain`-metoden som tillhandahålls av
`facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobb{
  {
    Jobb: &jobs.Test{},
    Arger: []queue. rg{
      {Typ: "int", Värde: 1},
    },
  },
  {
    Jobb: &jobb. est1{},
    Arger: []kö. rg{
      {Typ: "int", Värde: 2},
    },
  },
}).Dispatch()
```

### Försenad avsändning

Om du vill specificera att ett jobb inte omedelbart ska behandlas av en köarbetare, du kan använda `fördröjning`
-metoden under jobbsändning. Till exempel, låt oss ange att ett jobb inte ska vara tillgängligt för behandling efter 100
sekunder efter avsändning:

```go
err := facades.Queue().Jobb (&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Anpassa kön & anslutning

#### Avsändande till en särskild kö

Genom att skjuta jobb till olika köer kan du "kategorisera" dina köjobb och till och med prioritera hur många arbetare du
tilldelar olika köer.

```go
err := facades.Queue().Jobb (&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Skicka till en särskild anslutning

Om ditt program interagerar med flera köanslutningar, kan du använda `OnConnection`-metoden för att ange
-anslutningen som uppgiften trycks på.

```go
err := facades.Queue().Jobb (&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Du kan kedja metoderna `OnConnection` och `OnQueue` tillsammans för att ange anslutningen och kön för ett jobb:

```go
err := facades.Queue().Jobb (&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` Stöds typer

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
