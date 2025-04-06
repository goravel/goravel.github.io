# Aufgabenplanung

In der Vergangenheit müssen Sie möglicherweise einen Cron-Konfigurationseintrag für jede Aufgabe erstellen, die auf Ihrem Server geplant werden musste.
Dieser Ansatz kann jedoch schnell zu einem Schmerz werden, da Ihr Aufgabenplan nicht in der Quellenkontrolle ist und Sie müssen SSH
in Ihren Server einbinden, um cron-Einträge anzuzeigen oder hinzuzufügen/bearbeiten zu können.

Goravels Kommandoplaner bietet einen neuen Ansatz zur Verwaltung von geplanten Aufgaben auf Ihrem Server. Mit dem Scheduler können Sie
innerhalb Ihrer Goravel-Anwendung einfach und klar definieren. Mit dem Scheduler brauchen Sie nur
, um einen einzelnen Cron-Eintrag auf Ihrem Server zu erstellen.

## Definiere Schedules

Um Aufgaben für deine Anwendung zu planen, kannst du sie in der `Schedule` Methode in `app\console\kernel.go` definieren. Lass uns
ein Beispiel in Betracht ziehen, um dies besser zu verstehen. In diesem Fall wollen wir eine Schließung planen, die jeden Tag um
Mitternacht läuft. Innerhalb dieser Schließung führen wir eine Datenbankabfrage aus, um eine Tabelle zu löschen:

```go
Paket Konsole

importieren (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"

  "goravel/app/models"
)

Type Kernel struct {
}

func (kernel Kernel) Schedule() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().Where("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### Artisan Befehle planen

Zusätzlich zur Terminplanung können Sie auch [Artisan Befehle](./artisan) planen. Zum Beispiel kannst du
die `Command`-Methode verwenden, um einen Artisan-Befehl mit dem Namen oder der Klasse des Befehls zu planen.

```go
Paket Konsole

importieren (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"
)

Type Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### Protokollierungsstufe

Wenn `app.debug` `true` ist, wird die Konsole alle Logs ausgeben. Andernfalls werden nur `error` Level Logs ausgegeben.

### Zeitplan-Frequenzoptionen

Wir haben bereits einige Beispiele dafür gesehen, wie Sie eine Aufgabe konfigurieren können, die in bestimmten Intervallen ausgeführt werden soll. Es gibt jedoch viele
weitere Aufgabenplanfrequenzen, um Aufgaben zuzuweisen:

| 方法                       | 描述                                                                |
| ------------------------ | ----------------------------------------------------------------- |
| `.Cron("* * * * *")`     | Die Aufgabe mit einem benutzerdefinierten Cron-Zeitplan ausführen |
| `.EveryMinute()`         | Die Aufgabe jede Minute ausführen                                 |
| `.EveryTwoMinutes()`     | Die Aufgabe alle zwei Minuten ausführen                           |
| `.EveryThreeMinutes()`   | Die Aufgabe alle drei Minuten ausführen                           |
| `.EveryFourMinutes()`    | Die Aufgabe alle vier Minuten ausführen                           |
| `.EveryFiveMinutes()`    | Die Aufgabe alle fünf Minuten ausführen                           |
| `.EveryTenMinutes()`     | Die Aufgabe alle zehn Minuten ausführen                           |
| `.EveryFifteenMinutes()` | Die Aufgabe alle fünfzehn Minuten ausführen                       |
| `.EveryThirtyMinutes()`  | Die Aufgabe alle 30 Minuten ausführen                             |
| `.Stunde()`              | Die Aufgabe jede Stunde ausführen                                 |
| `.HourlyAt(17)`          | Führe die Aufgabe jede Stunde um 17 Minuten nach der Stunde aus   |
| `.EveryTwoHours()`       | Die Aufgabe alle zwei Stunden ausführen                           |
| `.EveryThreeHours()`     | Die Aufgabe alle drei Stunden ausführen                           |
| `.EveryFourHours()`      | Die Aufgabe alle vier Stunden ausführen                           |
| `.EverySixHours()`       | Die Aufgabe alle sechs Stunden ausführen                          |
| `.Daily()`               | Täglich um Mitternacht ausführen                                  |
| `.DailyAt("13:00")`      | Täglich um 13:00 Uhr starten                      |

### Überlappende Aufgaben verhindern

Standardmäßig werden geplante Aufgaben auch dann weiterhin ausgeführt, wenn eine vorherige Instanz noch läuft. Um dies zu verhindern, verwenden Sie die folgenden
Methoden:

| 方法                       | 描述                             |
| ------------------------ | ------------------------------ |
| `.SkipIfStillRunning()`  | Überspringen, wenn noch läuft  |
| `.DelayIfStillRunning()` | Verzögerung bei noch laufendem |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### Aufgaben auf einem Server ausführen

> Um diese Funktion nutzen zu können, muss Ihre Anwendung den memcached, dynamodb oder redis cache Treiber als Standard
> Cache Treiber verwenden. Zusätzlich müssen alle Server mit dem gleichen zentralen Cache-Server kommunizieren.

Wenn der Zeitplaner Ihrer Anwendung auf mehreren Servern läuft, können Sie sicherstellen, dass ein geplanter Job nur auf einem von
ausgeführt wird. Nehmen wir zum Beispiel an, dass Sie eine geplante Aufgabe haben, die jeden Freitag Abend einen neuen Bericht erstellt. Wenn der Task
Zeitplaner auf drei Worker-Servern läuft, die geplante Aufgabe läuft auf allen drei Servern und erstellt den Bericht drei
mal. Das ist nicht ideal!

Um dies zu verhindern, verwenden Sie die `OnOneServer` Methode, um die geplante Aufgabe zu definieren, die sicherstellt, dass die Aufgabe
nur auf einem Server läuft. Der erste Server, der die Aufgabe erhält, sichert eine atomare Sperre für den Auftrag, verhindert, dass andere Server
die gleiche Aufgabe gleichzeitig ausführen:

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Geplante Schließungen müssen einem Namen zugewiesen werden, wenn sie auf einem Server ausgeführt werden sollen:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Der Scheduler wird ausgeführt

Jetzt, da wir gelernt haben, wie wir geplante Aufgaben definieren, lassen Sie uns diskutieren, wie sie tatsächlich auf unserem Server ausgeführt werden.

Füge `go facades.Schedule().Run()` zum Root `main.go` hinzu.

```go
Paket Haupt-

Import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dies ist ein Bootstraps für das Framework und wird für den Einsatz vorbereitet.
  bootstrap.Boot()

  // Start Zeitplan von facades.Schedule
  gehen facades.Schedule().Run()

  wählen Sie {}
}
```

## Den Scheduler stoppen

Du kannst die `Shutdown` Methode aufrufen, um den Scheduler würdevoll herunterzufahren. Diese Methode wartet vor dem Herunterfahren auf alle Aufgaben
.

```go
// main.go
bootstrap.Boot()

// Erstellen Sie einen Kanal um auf OS-Signale
zu hören := make(chan os.Signal)
Signal. otify(beenden, syscall.SIGINT, syscall.SIGTERM)

// Start Zeitplan von facades.Schedule
go facades.Schedule(). un()

// Das OS-Signal
gehen Sie func() {
  <-quit
  wenn err := Fassaden. chedule().Shutdown(); err != nil {
    Fassaden. og().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```
