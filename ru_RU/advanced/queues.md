# Очереди

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Fortunately, Goravel offers a solution by allowing you to create queued jobs that
can run in the background. Таким образом, перемещая трудоемкие задачи в очередь, ваше приложение может отвечать на запросы веб-
гораздо быстрее и обеспечивает лучший пользовательский опыт для ваших клиентов. To implement this feature, we use
`facades.Queue()`.

Настройки очереди Goravel, сохранены в конфигурационном файле `config/queue.go` вашего приложения. Goravel
поддерживает два драйвера: `redis` и `sync`.

### Соединения V Очереди

Прежде чем отправиться в очереди Горавеля, важно понимать разницу между "связями" и "очередями". В
конфигурационном файле, `config/queue.go`, вы найдете массив для конфигурации `connections`. Эта опция определяет
подключений к службам backend очереди, таким как Redis. Однако каждая очередь соединения может иметь несколько "очереди", которые
можно считать различными стеками или кучами очереди заданий.

Важно заметить, что каждый пример конфигурации подключения в файле конфигурации очереди содержит атрибут `queue`
. This attribute is the default queue to which jobs will be dispatched when they are sent to a given
connection. В более простых условиях, если вы отправляете задание без явного указания очереди, он должен быть отправлен,
работа будет размещена в очереди, определенной в атрибуте очереди конфигурации подключения.

```go
// This job is sent to the default connection's default queue
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).Dispatch()

// This job is sent to the default connection's "emails" queue
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).OnQueue("emails").Dispatch()
```

## Создание заданий

### Создание классов заданий

По умолчанию все задания для вашего приложения хранятся в папке `app/jobs`. Если папка `app/Jobs`
не существует, она будет создана при запуске команды `make:job`:

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Структура класса

Классы должностей очень просты, состоящие из двух методов: "Подпись" и "Ручка". `Signature` служит
отдельным идентификатором задачи, в то время как `Handle` выполняется, когда очередь обрабатывает задачу. Кроме того, очередь `[]queue.Arg{}` прошла
после выполнения задачи будет передана в `Handle`:

```go
запускает

тип ProcessPodcast struct {
}

// Подписывание имя и подпись задания.
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Handle Execute the job.
func (receiver *ProcessPodcast) Handle(args ...any) error {
  return nil
}
```

### Регистрация Вакансии

После создания задания, вам нужно зарегистрировать его в `app/provides/queue_service_provider.go`, чтобы его можно было называть
правильно.

```go
func (receiver *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Сервер очереди запуска

Запустите сервер очереди в `main.go` в корневом каталоге.

```go
пакет main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // This bootstraps the framework and make it ready for use.
  bootstrap.Boot()

  // Запуск очереди сервера фасадами.
  go func() {
    if err := facades. ueue().Worker().Run(); err != nil {
      facades. og().Ошибка("Ошибка выполнения очереди %v", ошибка)
    }
  }()

  выберите {}
}
```

Различные параметры могут быть переданы методом `facades.Queue().Worker`, вы можете контролировать несколько очередей запустив
несколько `facades.Queue().Worker`.

```go
// Нет параметров, по умолчанию прослушивает конфигурацию в папке `config/queue. o`, а количество concurrency равно 1
go func() {
  if err := facades. ueue().Worker().Run(); err != nil {
    facades. og().Ошибка(("Ошибка выполнения очереди %v", ошибка)
  }
}()

// Обработка очереди мониторинга для ссылки redis, и количество concurrency равно 10
go func() {
  if err := facades. ue().Worker(очередь). rgs{
    Подключение: "redis",
    Очередь: "processing",
    Параметры: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Ошибка запуска очереди: %v", err)
  }
}()
```

## Отправка заданий

Как только вы написали класс работы, вы можете отправить его, используя метод `Dispatch` на самой задаче:

```go
импортировать пакетные контроллеры

(
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
    // делать что-то
  }
}
```

### Синхронная диспетчеризация

Если вы хотите отправить задание сразу (синхронно), воспользуйтесь методом «DispatchSync». При использовании метода
работа не будет поставлена в очередь и будет выполнена сразу в рамках текущего процесса:

```go
импортировать пакетные контроллеры

(
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

### Связь заданий

Цепочка заданий позволяет указать список очереди работ в определенном порядке. Если какое-либо задание в последовательности
не удается, остальные задания не будут выполняться. Чтобы запустить цепочку заданий, вы можете использовать метод `Chain`, предоставленный
`facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue. rg{
      {Type: "int", Значение: 1},
    },
  },
  {
    Job: &jobs. est1{},
    Арг: []очередь. rg{
      {Type: "int", Значение: 2},
    },
  },
}).Dispatch()
```

### Отложенная отправка

Если вы хотите указать, что работа не должна быть немедленно обработана в очереди работника, вы можете использовать метод `Delay`
во время отправки задания. For example, let's specify that a job should not be available for processing after 100
seconds of dispatching:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Настройка очереди и подключения

#### Отправка в очередь

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Отправка к самому соединению

If your application interacts with multiple queue connections, you can use the `OnConnection` method to specify the
connection to which the task is pushed.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Вы можете связать методы `OnConnection` и `OnQueue` вместе, чтобы указать соединение и очередь для задания:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` поддерживаемые типы

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
