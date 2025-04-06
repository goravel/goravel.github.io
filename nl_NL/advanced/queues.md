# Wachtrijen

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Gelukkig biedt Goravel een oplossing door het maken van in de wachtrij geplaatste banen die
op de achtergrond kan uitvoeren. Op deze manier worden tijdrovende taken naar de wachtrij verplaatst. uw applicatie kan veel sneller reageren op web
verzoeken en een betere gebruikerservaring bieden voor uw klanten. Om deze functie te implementeren, gebruiken we
`facades.Queue()`.

Goravel's wachtrij configuratieopties worden opgeslagen in het `config/queue.go` configuratiebestand van je applicatie. Goravel
ondersteunt twee drivers: `redis` en `sync`.

### Verbindingen vs. Wachtrijen

Voordat je in Goravel wachtrijen gaat bewegen, moet je het verschil begrijpen tussen "verbindingen" en "wachtrijen". In
het configuratiebestand, `config/queue.go`, vindt u een array voor `connections` configuratie. Deze optie specificeert
de verbindingen naar de backend wachtrij services zoals Redis. Elke wachtrij verbinding kan echter meerdere "wachtrijen" hebben, wat
kan worden beschouwd als verschillende stapels of stapels in de wachtrij.

Het is essentieel om op te merken dat elk verbindingsconfiguratie voorbeeld in het wachtrij configuratiebestand een `wachtrij`
attribuut bevat. Dit attribuut is de standaard wachtrij waarnaar taken worden verzonden wanneer ze naar een bepaalde
verbinding worden verzonden. Eenvoudiger gezegd: als je een taak verstuurt zonder expliciet te definiëren naar welke wachtrij het verzonden moet worden.
de taak zal worden geplaatst in de wachtrij gedefinieerd in de wachtrij attribuut van de verbindingsconfiguratie.

```go
// Deze taak wordt verzonden naar de standaard wachtrij
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Waarde: 1},
}). ispatch()

// Deze taak wordt verzonden naar de standaard connectie's "emails" queue
err := facades.Queue(). ob(&jobs.Test{}, []wachtrij.Arg{
  {Type: "int", Waarde: 1},
}).OnQueue("emails").Dispatch()
```

## Jobs aanmaken

### Vacature lessen genereren

Standaard worden alle taken voor je applicatie opgeslagen in de `app/jobs` map. Als de `app/Jobs` map
niet bestaat, zal deze worden gemaakt wanneer je het `make:job` commando uitvoert:

```shell
uitvoeren . artisan make:job ProcessPodcast
ga uit. artisan make:job user/ProcessPodcast
```

### Les structuur

Job classes zijn erg eenvoudig, bestaande uit twee methoden: `Signature` en `Handle`. `Signature` dient als een taak's
verschillende ID, terwijl `Handle` uitvoert wanneer de wachtrij de taak verwerkt. Daarnaast is de `[]queue.Arg{}` overhandigd
wanneer de taakuitvoeringen zullen worden verzonden naar `Handle`:

```go
package jobs

type ProcessPodcast struct {
}

// Signature The name and signature of the job.
func (ontvanger *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Behandeling de job.
func (ontvanger *ProcessPodcast) Handle(args ...any) error {
  return nil
}
```

### Taak registreren

Na het aanmaken van de job moet u het registreren in `app/provides/queue e_service_provider.go`, zodat het correct kan worden genoemd

```go
func (ontvanger *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Start wachtrij server

Start de wachtrij server in `main.go` in de hoofdmap.

```go
Pakket main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dit bootstraps het framework en maakt het klaar voor gebruik.
  bootstrap.Boot()

  // Start wachtrij server door facades. ueue().
  ga func() {
    als err := facades. ueue().Worker().Run(); err != nil {
      facades. og().Errorf("Wachtrij run fout: %v", err)
    }
  }()

  select {}
}
```

Verschillende parameters kunnen worden doorgegeven in de `facades.Queue().Worker` methode, u kunt meerdere wachtrijen controleren door
meerdere `facades.Queue().Worker` te starten.

```go
// Geen parameters, standaard luistert naar de configuratie in de `config/queue. o`, en het aantal concurrency is 1
ga func() {
  als err := facades. ueue().Worker().Run(); err != nil {
    facades. og().Errorf("Wachtrij uitvoeren fout: %v", err)
  }
}()

// Monitor verwerken wachtrij voor redis link, en het aantal concurrency is 10
go func() {
  als err := facades. ueue().Worker(wachtrij). rgs{
    Verbinding: "redis",
    Wachtrij: "verwerking",
    momenteel: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Foutmelding in de wachtrij: %v", err)
  }
}()
```

## Verzend taken

Zodra je de job class hebt geschreven, kun je deze verzenden met de `Dispatch` methode op de job zelf:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Dispatch()
  if err != nil {
    // do something
  }
}
```

### Synchroon verzenden

Als u een taak onmiddellijk (synchronisatief) wilt verzenden, kunt u de `DispatchSync` methode gebruiken. Wanneer deze
methode wordt gebruikt, wordt de taak niet in de wachtrij geplaatst en wordt deze uitgevoerd onmiddellijk binnen het huidige proces:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).DispatchSync()
  if err != nil {
    // do something
  }
}
```

### Ketting werk

Job chaining geeft een lijst met taken in de wachtrij die moeten worden uitgevoerd in een specifieke volgorde. Als een baan in de reeks
mislukt, zal de rest van de vacatures niet worden uitgevoerd. Om een taakketen in de wachtrij te gebruiken, kunt u de `Chain` methode gebruiken die wordt geboden door
de `facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []wachtrij. rg{
      {Type: "int", Waarde: 1},
    },
  },
  {
    Job: &jobs. est1{},
    Args: []queue. rg{
      {Type: "int", Waarde: 2},
    },
  },
}).Dispatch()
```

### Vertraagde verzending

Als u wilt specificeren dat een taak niet onmiddellijk door een wachtrij moet worden verwerkt, U kunt de \`Vertraging
methode gebruiken tijdens het verzenden van een vacature Laten we bijvoorbeeld aangeven dat een vacature niet beschikbaar mag zijn voor verwerking na 100
seconden van verzending:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second).Dispatch()
```

### Aanpassen van de wachtrij & verbinding

#### Verzenden naar een bijzondere wachtrij

Door taken naar verschillende wachtrijen te pushen, kunt u uw in de wachtrij geplaatste taken "categoriseren" en zelfs voorrang geven aan het aantal medewerkers dat u
aan verschillende wachtrijen toewijst.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Verzenden naar een bijzondere verbinding

Als je applicatie meerdere wachtrij verbindingen gebruikt, kun je de `OnConnection` methode gebruiken om de
verbinding te specificeren waarnaar de taak wordt gepushd.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Je kunt de `OnConnection` en `OnQueue` methoden samenvoegen om de verbinding en de wachtrij voor een taak op te geven:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `wachtrij.Arg.Type` Ondersteunde Types

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
