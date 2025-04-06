# Schemaläggning av uppgifter

Förr i tiden kan du behöva skapa en cronkonfigurationspost för varje uppgift som behövde schemaläggas på din server.
Men detta tillvägagångssätt kan snabbt bli en smärta som din uppgift schema inte är i källkontroll, och du måste SSH
till din server för att se eller lägga till/redigera cronposter.

Goravels kommandotablat erbjuder en ny metod för att hantera schemalagda uppgifter på din server. Med schemaläggaren kan du
enkelt och tydligt definiera ditt kommando schema inom din Goravel ansökan. Med hjälp av schemaläggaren behöver du bara
för att skapa en enda cron-post på din server.

## Definiera scheman

För att schemalägga uppgifter för din applikation, kan du definiera dem i `Schedule`-metoden i `app\console\kernel.go`. Låt oss
överväga ett exempel för att förstå detta bättre. I detta fall vill vi schemalägga en stängning som kommer att köras varje dag vid
midnatt. Inuti denna stängning kommer vi att köra en databasfråga för att rensa en tabell:

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/frameing/facades"

  "goravel/app/models"
)

type Kernel struct {
}

func (kernel Kernel) Schedule() []schedule. {
  retur []schedule.Event{
    fasader.Schema().Samtal(funktion() {
      fasader. rm().Query().Where("1 = 1").Ta bort (&modeller.User{})
    }).Daily(),
  }
}
```

### Schemaläggning av Hantverkskommandon

Förutom schemaläggning stängningar, kan du även schemalägga [Hantverkskommandoner](./artisan). Till exempel kan du
använda `Kommando-metoden` för att schemalägga ett Artisan-kommando med antingen kommandots namn eller klass.

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/frameing/facades"
)

type Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule. {
  return []schedule.Event{
    facades.Schedule().Command("skicka: e-post namn").Daily(),
  }
}
```

### Loggningsnivå

När `app.debug` är `true`, kommer konsolen skriva ut alla loggar. Annars kommer endast `error`-nivåloggar att skrivas ut.

### Alternativ för schemalagd frekvens

Vi har redan sett några exempel på hur du kan konfigurera en uppgift att köra med angivna intervaller. Det finns dock många
fler aktivitetsschema frekvenser som finns att tilldela till uppgifter:

| 方法                       | 描述                                                   |
| ------------------------ | ---------------------------------------------------- |
| `.Cron("* * * * *")`     | Kör uppgiften på ett anpassat cron-schema            |
| `.EveryMinute()`         | Kör uppgiften varje minut                            |
| `.EveryTwoMinutes()`     | Kör uppgiften varannan minut                         |
| `.EveryThreeMinutes()`   | Kör uppgiften var tredje minut                       |
| `.EveryFourMinutes()`    | Kör uppgiften var fjärde minut                       |
| `.EveryFiveMinutes()`    | Kör uppgiften var femte minut                        |
| `.EveryTenMinutes()`     | Kör uppgiften var tionde minut                       |
| `.EveryFifteenMinutes()` | Kör uppgiften var 15:e minut         |
| `.EveryThirtyMinutes()`  | Kör uppgiften var 30:e minut         |
| `.Timme()`               | Kör uppgiften varje timme                            |
| `.HourlyAt(17)`          | Kör uppgiften varje timme på 17 minuter förbi timmen |
| `.EveryTwoTims()`        | Kör uppgiften varannan timme                         |
| `.EveryThreeTims()`      | Kör uppgiften var tredje timme                       |
| `.EveryFourHours()`      | Kör uppgiften var fjärde timme                       |
| `.EverySixHours()`       | Kör uppgiften var sjätte timme                       |
| `.Daily()`               | Kör uppgiften varje dag vid midnatt                  |
| `.DailyAt("13:00")`      | Kör uppgiften varje dag kl 13:00     |

### Förhindra överlappning av uppgifter

Som standard kommer schemalagda uppgifter att fortsätta köras även om en tidigare instans fortfarande körs. För att förhindra detta, använd
följande metoder:

| 方法                       | 描述                              |
| ------------------------ | ------------------------------- |
| `.SkipIfStillRunning()`  | Hoppa över om fortfarande körs  |
| `.DelayIfStillRunning()` | Fördröjning om fortfarande körs |

```go
facades.Schedule().Command("skicka:e-post namn").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("skicka:e-post namn").EveryMinute().DelayIfStillRunning()
```

### Kör uppgifter på en server

> För att använda den här funktionen måste din applikation använda memcached, dynamodb eller redis cache-drivrutinen som standard
> cache-drivrutin. Dessutom måste alla servrar kommunicera med samma centrala cache-server.

Om din applikations schemaläggare körs på flera servrar, kan du se till att ett schemalagt jobb utförs på endast en av
dem. Till exempel, låt oss säga att du har en schemalagd uppgift som genererar en ny rapport varje fredag kväll. Om uppgiften
schemaläggaren körs på tre arbetarservrar, schemalagd uppgift kommer att köras på alla tre servrar och skapa rapporten tre
gånger. Det är inte idealt!

För att förhindra detta, använd `OnOneServer`-metoden när du definierar schemalagd uppgift, vilket kommer att se till att uppgiften körs
på endast en server. Den första servern som tar emot uppgiften kommer att säkra ett atomlås på jobbet, hindrar andra servrar
från att utföra samma uppgift samtidigt:

```go
facades.Schedule().Kommando ("rapport:generate").Daily().OnOneServer()
```

Schemalagda stängningar måste tilldelas ett namn om de är avsedda att köras på en server:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Namn("goravel")
```

## Kör Schemaläggaren

Nu när vi har lärt oss att definiera schemalagda uppgifter, låt oss diskutera hur man faktiskt kör dem på vår server.

Lägg till `go facades.Schedule().Run()` till root `main.go` -filen.

```go
paket main

import (
  "github. om/goravel/frameing/facades"

  "goravel/bootstrap"
)

func main() {
  // Detta bootstraps ramverket och blir klart för användning.
  bootstrap.Boot()

  // Starta schema av facades.Schema
  go facades.Schedule().Run()

  select {}
}
```

## Stoppar Schemaläggaren

Du kan anropa `Shutdown`-metoden för att graciöst stänga av schemaläggaren. Denna metod kommer att vänta på att alla uppgifter till
slutförs innan de stängs.

```go
// main.go
bootstrap.Boot()

// Skapa en kanal för att lyssna på OS-signaler
avsluta := make(chan os.Signal)
-signal. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Starta schema efter fasader.Schema
gå fasader.Schema(). un()

// Lyssna på OS-signalen
go func() {
  <-quit
  om err := fasader. chedule().avstängning(); err != nil {
    fasader. og().Errorf("Schema Avstängningsfel: %v", err)
  }

  os.Exit(0)
}()

select {}
```
