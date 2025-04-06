# События

События Горавела обеспечивают простую реализацию шаблона для наблюдателей, позволяя подписаться и прослушивать различные
события, которые происходят внутри вашего приложения. Классы событий обычно хранятся в папке `app/events`, в то время как их
слушатели хранятся в `app/listeners`. Don't worry if you don't see these directories in your application as they will
be created for you as you generate events and listeners using Artisan console commands.

События служат отличным способом разрезать различные аспекты вашего приложения, как одно событие может иметь несколько
слушателей, которые не зависят друг от друга. For example, you may wish to send a Slack notification to your user each
time an order is shipped. Вместо того, чтобы объединять код вашего заказа в код уведомления Slack вы можете забрать
событие `app\events\OrderShipped`, которое слушатель может получать и использовать для отправки уведомления о Slack.

## Регистрация событий и слушателей

`app\providers\EventServiceProvider` включен в ваше приложение Goravel предоставляет удобное место для регистрации
всех слушателей событий вашего приложения. The `listen` method contains an array of all events (keys) and their
listeners (values). Вы можете добавить столько событий в этот массив, сколько требует ваше приложение. For example, let's add an
`OrderShipped` event:

```go
поставщики пакетов

импорт (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

. .

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]event. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Создание событий и слушателей

Вы можете использовать команды «make:event» и «make:listener» для создания отдельных событий и слушателей:

```go
go run . artisan make:event PodcastProcessed
go run . artisan make:event user/PodcastProcessed

go run . artisan make:listener SendPodcastNotification
go run . artisan make:listener user/SendPodcastNotification
```

## Определение событий

Класс события - это по сути контейнер данных, который содержит информацию, связанную с событием, метод `Handle` для
`event` проходит и возвращает событие `[]. Структура rg, которая может использоваться для обработки данных. The processed data will
then be passed on to all associated `listeners`. Например, давайте предполагаем событие `app\events\OrderShipped\`:

```go
события пакета

импортировать "github.com/goravel/framework/contracts/event"

тип OrderShipped struct {
}

func (receiver *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Определение слушателей

Далее, давайте посмотрим на слушателя для нашего примера. Слушатели событий получают `[]event.Arg` события
'Handle`возвращается. С помощью метода`Handle\` вы можете выполнить любые действия, необходимые для ответа на событие:

```go
обработчики пакетов

импорт (
  "github. om/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (receiver *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (receiver *SendShipmentNotification) Queue(args . .any) event.Queue {
  return event. ue{
    Включен: false,
    Соединение: "",
    Очередь: "",
  }
}

func (приемник *SendShipmentNotification) Handle(args . .any) ошибка {
  return nil
}
```

### Остановка распространения события

Иногда, возможно, вы захотите остановить распространение события другим слушателям. You may do so by returning an error from
your listener's `Handle` method.

## Прослушиватель очереди событий

Очередь слушателей может быть полезной, если ваш слушатель будет выполнять медленную задачу, такую как отправка письма или создание
HTTP запроса. Before using queued listeners, make sure to [configure your queue](queues) and start a queue worker
on your server or local development environment.

```go
обработчики пакетов

...

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event. ue{
    Включить: false,
    соединение: "",
    Очередь: "",
  }
}

func (приемник *SendShipmentNotification) Handle(args . .any) ошибка {
  имя := args[0]

  return nil
}
```

### Прослушиватели событий и транзакции в очереди

Когда в очереди слушатели отправляются в рамках транзакций с базой данных, очередь может обрабатывать их до того, как транзакция с базой данных
была совершена. Когда это происходит, любые обновления, которые вы сделали для моделей или записей базы данных во время операции с базой данных
могут не быть отражены в базе данных. Кроме того, в базе данных могут отсутствовать любые модели или записи базы данных, созданные
в рамках транзакции. If your listener depends on these models, unexpected errors can
occur when the job that dispatches the queued listener is processed. At this time, the event needs to be placed outside
the database transactions.

## Диспетчер событий

Мы можем отправлять события по методу `facades.Event().Job().Dispatch()`.

```go
импортировать пакетные контроллеры

(
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

тип UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []event. rg{
    {Тип: "string", Значение: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## Поддерживаемые типы `event.Arg.Type`

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
