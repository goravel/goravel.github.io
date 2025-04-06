# Taak Plannen

In het verleden moet u misschien een cron configuratie invoer maken voor elke taak die gepland moest worden op uw server.
Deze aanpak kan echter snel pijn gaan doen omdat uw taakschema niet in bronbeheer is. en je moet SSH
in je server gebruiken om cron items te bekijken of te bewerken.

Goravel's opdrachtplanner biedt een frisse aanpak voor het beheren van geplande taken op uw server. Met de planner kunt u
eenvoudig en duidelijk uw opdrachtschema definiëren binnen uw Goravel applicatie. Met behulp van de planner hoeft u alleen
een cron-invoer op uw server te maken.

## Schedules definiëren

Om taken te plannen voor uw applicatie, kunt u ze definiëren in de `Schedule` methode in `app\console\kernel.go`. Laten we
een voorbeeld overwegen om dit beter te begrijpen. In dit geval willen we een sluiting plannen die elke dag om
middernacht wordt uitgevoerd. Binnen deze sluiting zullen we een databasequery uitvoeren om een tabel te wissen:

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
  geeft []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().here("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### Plannen van Artistisch Commando's

Naast het plannen van sluitingen, kan je ook [Artisan commands](./artisan). Je kan bijvoorbeeld
de 'Command' methode gebruiken om een Artisan commando te plannen met behulp van de naam of de klas.

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
  retourneer []schedule.Event{
    facades.Schedule().Command("send:emails naam").Daily(),
  }
}
```

### Logging niveau

Wanneer `app.debug` `true` is, zal de console alle logs afdrukken. Anders worden alleen `error` level logs afgedrukt.

### Schedule Frequentie Opties

We hebben al een paar voorbeelden gezien van hoe je een taak kunt configureren die uitgevoerd moet worden op de opgegeven intervals. Er zijn echter veel
meer taakschema frequenties beschikbaar om taken toe te kennen:

| 方法                       | 描述                                                 |
| ------------------------ | -------------------------------------------------- |
| `.Cron("* * * * *")`     | Taak uitvoeren op een aangepast cron schema        |
| `.EveryMinute()`         | Taak elke minuut uitvoeren                         |
| `.EveryTwoMinutes()`     | Taak om de twee minuten uitvoeren                  |
| `.EveryThreeMinutes()`   | Voer de taak elke drie minuten uit                 |
| `.EveryFourMinutes()`    | Taak elke vier minuten uitvoeren                   |
| `.EveryFiveMinutes()`    | Taak elke vijf minuten uitvoeren                   |
| `.EveryTenMinutes()`     | Taak om de tien minuten uitvoeren                  |
| `.EveryFifteenMinutes()` | Voer de taak elke vijftien minuten uit             |
| `.EveryThirtyMinutes()`  | Voer de taak elke dertig minuten uit               |
| `.Uur()`                 | Taak elk uur uitvoeren                             |
| `.HourlyAt(17)`          | Voer de taak elk uur uit om 17 minuten na het uur  |
| `.EveryTwoHours()`       | Taak om de twee uur uitvoeren                      |
| `.EveryThreeHours()`     | Voer de taak om de drie uur uit                    |
| `.EveryFourHours()`      | Taak om de vier uur uitvoeren                      |
| `.EverySixHours()`       | Voer de taak om de zes uur uit                     |
| `.Daily()`               | Voer de taak elke dag om middernacht uit           |
| `.DailyAt("13:00")`      | Voer de taak elke dag uit om 13:00 |

### Taak overlappingen voorkomen

Standaard blijven geplande taken draaien, zelfs als een vorige instantie nog actief is. Om dit te voorkomen, gebruik de volgende methoden

| 方法                       | 描述                             |
| ------------------------ | ------------------------------ |
| `.SkipIfStillRunning()`  | Overslaan als het nog bezig is |
| `.DelayIfStillRunning()` | Vertraging als nog bezig is    |

```go
facades.Schedule().Command("send:emails naam").EveryMinuute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinuuute().DelayIfRunning()
```

### Taken uitvoeren op één server

> Om deze functie te gebruiken, moet uw applicatie de memcache, dynamodb of redis cache driver als standaard
> cache driver gebruiken. Bovendien moeten alle servers communiceren met dezelfde centrale cache server.

Als de taakplanner van je applicatie op meerdere servers draait, kan je ervoor zorgen dat een geplande taak wordt uitgevoerd op slechts één van
de plannen. Laten we bijvoorbeeld zeggen dat u een geplande taak hebt die elke vrijdagavond een nieuw verslag opstelt. Als de taak
planner draait op drie worker servers, de geplande taak wordt uitgevoerd op alle drie de servers en maakt het rapport drie
keer. Dat is niet ideaal!

Om dit te voorkomen, gebruik de `OnOneServer` methode bij het definiëren van de geplande taak, die ervoor zal zorgen dat de taak
op slechts één server wordt uitgevoerd. De eerste server die deze taak ontvangt zal een atoomslot op de baan beveiligen. voorkomen dat andere servers
dezelfde taak tegelijkertijd uitvoeren:

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Geplande sluitingen moeten een naam krijgen als ze op één server uitgevoerd moeten worden:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## De Taakplanner wordt uitgevoerd

Nu we hebben geleerd hoe we geplande taken moeten definiëren, moeten we bespreken hoe we ze daadwerkelijk op onze server kunnen uitvoeren.

Voeg `go facades.Schedule().Run()` toe aan het root `main.go` bestand.

```go
Pakket main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dit bootstraps het framework en maakt het klaar voor gebruik.
  bootstrap.Boot()

  // Start schedule by facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## De Taakplanner stoppen

Je kunt de `Shutdown` methode aanroepen om de planner af te sluiten. Deze methode zal wachten tot alle taken
voltooid zijn voordat u afsluit.

```go
// main.go
bootstrap.Boot()

// Creëer een kanaal om te luisteren naar OS-signalen
quit := make(chan os.Signal)
signaal. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Start schema door facades.Schedule
go facades.Schedule(). un()

// Luister naar het OS signaal
ga func() {
  <-quit
  if err := facades. chedule().Shutdown(); err != nil {
    facades. og().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

selecteer {}
```
