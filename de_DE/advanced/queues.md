# Warteschlangen

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Glücklicherweise bietet Goravel eine Lösung an, indem es dir erlaubt, Warteschlangen zu erstellen, die
im Hintergrund ausführen kann. Auf diese Weise werden zeitintensive Aufgaben in eine Warteschlange verschoben Ihre Anwendung kann schneller auf Web-
-Anfragen reagieren und Ihren Kunden ein besseres Benutzererlebnis bieten. Um dieses Feature zu implementieren, verwenden wir
`facades.Queue()`.

Goravel's Warteschlangen-Konfigurationsoptionen werden in der Konfigurationsdatei `config/queue.go` deiner Anwendung gespeichert. Goravel
unterstützt zwei Treiber: `redis` und `sync`.

### Verbindungen Vs. Warteschlangen

Bevor man in die Goravel-Warteschlangen einsteigt, ist es wichtig, den Unterschied zwischen "Verbindungen" und "Warteschlangen" zu verstehen. In
der Konfigurationsdatei, `config/queue.go`, werden Sie ein Array für `connections` Konfiguration finden. Diese Option spezifiziert
die Verbindungen zu Backend-Warteschlangendiensten wie Redis. Jedoch kann jede Warteschlangen-Verbindung mehrere "Warteschlange" haben, die
als verschiedene Stapel oder Haufen von Aufträgen in der Warteschlange angesehen werden kann.

Es ist wichtig zu beachten, dass jedes Verbindungskonfigurationsbeispiel in der Queue Konfigurationsdatei ein Attribut `queue`
enthält. Dieses Attribut ist die Standardwarteschlange, an die Jobs versandt werden, wenn sie an eine bestimmte
-Verbindung gesendet werden. Einfacher ausgedrückt, wenn Sie einen Job versenden, ohne explizit festzulegen, in welcher Warteschlange er versandt werden soll
der Auftrag wird in der Warteschlange, die in der Warteschlangen-Attribut der Verbindungskonfiguration definiert ist, platziert.

```go
// Dieser Job wird an die Standardwarteschlange der Standardverbindung
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Typ: "int", Wert: 1},
}). ispatch()

// Dieser Job wird an die Warteschlange der Standardverbindung "E-Mails"
err := facades.Queue() gesendet. ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", Wert: 1},
}).OnQueue("emails").Dispatch()
```

## Jobs erstellen

### Generiere Job-Klassen

Standardmäßig werden alle Jobs für deine Anwendung im `app/jobs`-Verzeichnis gespeichert. Wenn das `app/Jobs` Verzeichnis
nicht existiert, wird es erstellt wenn du den `make:job` Artisan Befehl ausführst:

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Klassenstruktur

Job-Klassen sind sehr einfach, bestehend aus zwei Methoden: `Signature` und `Handle`. `Signature` dient als
eindeutige Identifikation, während `Handle` ausgeführt wird, wenn die Warteschlange die Aufgabe verarbeitet. Zusätzlich übergab die `[]queue.Arg{}`
wenn der Task ausgeführt wird, an `Handle`:

```go
Paketaufträge

Typ ProcessPodcast struct {
}

// Signatur Name und Unterschrift des Auftrags.
func (Empfänger *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Den Job ausführen.
Func (Empfänger *ProcessPodcast) Handle(args ...any) Fehler {
  return nil
}
```

### Job registrieren

Nachdem Sie den Job erstellt haben, müssen Sie ihn in `app/provides/queue_service_provider.go` registrieren, damit er korrekt
aufgerufen werden kann.

```go
func (Empfänger *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Starte Warteschlange Server

Starte den Warteschlangen-Server in `main.go` im Root-Verzeichnis.

```go
Paket Haupt-

Import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Dies ist ein Bootstraps für das Framework und wird für den Einsatz vorbereitet.
  bootstrap.Boot()

  // Warteschlange Server durch Fassaden starten. ueue().
  go func() {
    if err := facades. ueue().Worker().Run(); err != nil {
      Fassaden. og().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

Verschiedene Parameter können in der `facades.Queue().Worker` Methode übergeben werden. Sie können mehrere Warteschlangen überwachen indem Sie
mehrere `facades.Queue().Worker` starten.

```go
// Keine Parameter, Standardeinstellung lauscht auf die Konfiguration in der `config/queue. o`, und die Anzahl der Nebenwährungen ist 1
go func() {
  wenn err := Fassaden. ueue().Worker().Run(); err != nil {
    Fassaden. og().Errorf("Queue run error: %v", err)
  }
}()

// Überwachung der Warteschlange für redis Link, und die Anzahl der Nebenwährungen ist 10
go func() {
  wenn err := Fassaden. ueue().Arbeit(Warteschlange. rgs{
    Verbindung: "redis",
    Warteschlange: "Verarbeiten",
    Gleichlauf: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## Versendende Jobs

Sobald du die Jobklasse geschrieben hast, kannst du sie mit der Methode `Dispatch` auf den Job selbst verschicken:

```go
Paket Controller

Import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}). ispatch()
  wenn err != nil {
    // etwas
  }
}
```

### Synchrones Senden

Wenn du einen Job sofort verschicken möchtest (synchron) kannst du die `DispatchSync` Methode verwenden. Wenn diese
-Methode verwendet wird, wird der Job nicht in der Warteschlange stehen und wird sofort innerhalb des aktuellen Prozesses ausgeführt:

```go
Paket Controller

Import (
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

Mit der Job-Verkettung können Sie eine Liste von Aufträgen angeben, die in einer bestimmten Reihenfolge ausgeführt werden. If any job in the sequence
fails, the rest of the jobs will not be executed. Um eine Warteschlange Jobkette auszuführen, kannst du die `Chain` Methode verwenden, die von
zur Verfügung gestellt wird:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue. rg{
      {Typ: "int", Wert: 1},
    },
  },
  {
    Job: &jobs est1{},
    Args: []Warteschlange. rg{
      {Typ: "int", Wert: 2},
    },
  },
}).Dispatch()
```

### Verzögerter Versand

Wenn Sie angeben möchten, dass ein Job nicht sofort von einem Warteschlangenarbeiter bearbeitet werden soll, du kannst die Methode `Delay`
beim Jobversand verwenden. For example, let's specify that a job should not be available for processing after 100
seconds of dispatching:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Anpassen der Warteschlange & Verbindung

#### Versand zu einer bestimmten Warteschlange

Indem du Jobs in verschiedene Warteschlangen schiebst, kannst du deine in der Warteschlange befindlichen Jobs "kategorisieren" und sogar priorisieren, wie viele Arbeitnehmer du
verschiedenen Warteschlangen zuordnet.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Versand zu einer bestimmten Verbindung

Wenn deine Anwendung mit mehreren Warteschlangenverbindungen interagiert, kannst du die `OnConnection` Methode verwenden, um die
Verbindung anzugeben, zu der die Aufgabe gepusht wird.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Du kannst die `OnConnection` und `OnQueue` Methoden zusammen verketten, um die Verbindung und die Warteschlange für einen Job anzugeben:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` Unterstützte Typen

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
