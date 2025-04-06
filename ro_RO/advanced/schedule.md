# Programarea sarcinilor

In trecut, s-ar putea sa fie nevoie sa creezi o configurare cron pentru fiecare sarcina care avea nevoie de programarea pe serverul tau.
Totuşi, această abordare poate deveni rapid o durere, deoarece programul dumneavoastră de lucru nu este în controlul sursei, si trebuie sa ai SSH
pe serverul tau pentru a vedea sau adauga/edita intrari cron.

Comanda programatorului Goravel oferă o nouă abordare pentru gestionarea sarcinilor programate pe serverul dvs. With the scheduler, you
can easily and clearly define your command schedule within your Goravel application. Folosind programul de programare, ai nevoie doar de
pentru a crea o singură înregistrare cron pe serverul tău.

## Definirea programelor

Pentru a programa sarcinile pentru aplicația dvs., le puteți defini în metoda `Schedule` în `app\console\kernel.go`. Let's
consider an example to understand this better. În acest caz, dorim să programăm o închidere care va rula în fiecare zi la
miezul nopții. În această închidere, vom executa o interogare a bazei de date pentru a șterge un tabel:

```go
consola

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
    }).Zilnic(),
  }
}
```

### Programarea Comenzi Artizan

În plus față de programarea închiderilor, puteți programa și [Comenzi Artizanale](./artisan). For example, you may
use the `Command` method to schedule an Artisan command using either the command's name or class.

```go
consola

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"
)

tip Kernel struct {
}

func (kernel *Kernel) Schedule() []plane. Evenimentul {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### Nivel de logare

Când `app.debug` este `true`, consola va printa toate jurnalele. În caz contrar, numai jurnalele de nivel `error` vor fi tipărite.

### Programarea Opţiunilor de Frecvenţă

Am văzut deja câteva exemple despre cum poți configura o sarcină care să ruleze la intervale specificate. Cu toate acestea, există mult
mai multe frecvenţe disponibile pentru a atribui sarcinilor:

| 方法                       | 描述                                                         |
| ------------------------ | ---------------------------------------------------------- |
| `.Cron("* * * * *")`     | Rulează sarcina după un program personalizat de cron       |
| `.EveryMinute()`         | Rulează sarcina în fiecare minut                           |
| `.EveryTwoMinutes()`     | Rulează sarcina la fiecare două minute                     |
| `.EveryThreeMinutes()`   | Rulează sarcina la fiecare trei minute                     |
| `.EveryFourMinutes()`    | Rulează sarcina la fiecare patru minute                    |
| `.EveryFiveMinutes()`    | Rulează sarcina la fiecare cinci minute                    |
| `.EveryTenMinutes()`     | Rulează sarcina la fiecare zece minute                     |
| `.EveryFifteenMinutes()` | Rulează sarcina la fiecare 15 minute                       |
| `.EveryThirtyMinutes()`  | Execută sarcina la fiecare treizeci de minute              |
| `.Hourly()`              | Rulează sarcina în fiecare oră                             |
| `.HourlyAt(17)`          | Rulează sarcina în fiecare oră la 17 minute după oră       |
| `.EveryTwoHours()`       | Rulează sarcina la fiecare două ore                        |
| `.EveryThreeHours()`     | Rulează sarcina la fiecare trei ore                        |
| `.EveryFourHours()`      | Rulează sarcina la fiecare patru ore                       |
| `.EverySixHours()`       | Rulează sarcina la fiecare șase ore                        |
| `.Daily()`               | Execută sarcina în fiecare zi la miezul nopții             |
| `.DailyAt("13:00")`      | Execută sarcina în fiecare zi la ora 13:00 |

### Prevenirea suprapunerii sarcinilor

În mod implicit, sarcinile programate vor continua să ruleze chiar dacă o instanță anterioară este încă în funcțiune. Pentru a preveni acest lucru, folosiți metodele
următoare:

| 方法                       | 描述                                    |
| ------------------------ | ------------------------------------- |
| `.SkipIfStillRunning()`  | Omite dacă rulează în continuare      |
| `.DelayIfStillRunning()` | Întârziere dacă rulează în continuare |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillning()
```

### Activități executate pe un singur server

> Pentru a utiliza această caracteristică, aplicația ta trebuie să folosească memcached, dynamodb sau să refacă cache-ul ca șofer implicit
> . În plus, toate serverele trebuie să comunice cu acelaşi server central de memorie.

În cazul în care programatorul aplicației rulează pe mai multe servere, te poți asigura că o sarcină programată este executată doar pe unul dintre cei de la
. De exemplu, să presupunem că aveţi o sarcină programată care generează un nou raport în fiecare vineri seara. Dacă programul de lucru
rulează pe trei servere de lucru, sarcina programată va rula pe toate cele trei servere şi va crea raportul de trei
ori. Nu este ideal!

Pentru a preveni acest lucru, folosiți metoda `OnOneServer` atunci când definiți sarcina programată, care se va asigura că sarcina rulează
pe un singur server. Primul server care va primi sarcina va asigura o blocare atomică la locul de muncă, împiedică alte servere
să execute aceeași sarcină în același timp:

```go
fațades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Închiderile programate trebuie să primească un nume dacă sunt destinate să ruleze pe un singur server:

```go
faades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Rulează Programatorul

Acum că am învăţat cum să definim sarcinile programate, haideţi să discutăm cum să le rulăm de fapt pe serverul nostru.

Adăugați `go facades.Schedule().Run()` în fișierul rădăcină `main.go`.

```go
importarea pachetului principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Acest bootstraps cadrul şi îl pregăteşte pentru utilizare.
  bootstrap.Boot()

  // Începe programul cu facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## Oprirea programatorului

Puteți apela metoda `Shutdown` pentru a închide cu grație planificatorul. This method will wait for all tasks to
complete before shutting down.

```go
// main.go
bootstrap.Boot()

// Creați un canal pentru a asculta semnalele OS
renunțați := make(chan os.signal)
. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Începe programul cu faades.Schedule
go facades.Schedule(). un()

// Ascultați funcția semnalului
al sistemului OS () {
  <-quit
  dacă err := fațades. chedule().Shutdown(); err != nil {
    fațades. og().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```
