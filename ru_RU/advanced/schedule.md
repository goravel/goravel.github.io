# Планирование задач

В прошлом вам может потребоваться создать запись о конфигурации cron для каждой задачи, которая нуждается в планировании на вашем сервере.
Однако этот подход может быстро стать болью, поскольку ваш график задач не находится в исходном контроле, и вам нужно SSH
на вашем сервере, чтобы просматривать или редактировать записи cron.

Командный планировщик Goravel'а предлагает новый подход к управлению запланированными задачами на вашем сервере. With the scheduler, you
can easily and clearly define your command schedule within your Goravel application. Используя планировщик, вам нужно только
для создания одной записи cron на вашем сервере.

## Определение расписаний

Чтобы запланировать задачи вашего приложения, вы можете определить их методом `Schedule` в `app\console\kernel.go`. Давайте
рассмотрим пример, чтобы лучше понять это. В этом случае мы хотим запланировать закрытие, которое будет запускаться каждый день в
полночь. Внутри этого закрытия, мы выполним запрос к базе данных, чтобы очистить таблицу:

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
  return []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().В дальнейшем("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### Планирование ремесленных команд

В дополнение к планированию замыканий, вы также можете запланировать [Artisan commands](./artisan). For example, you may
use the `Command` method to schedule an Artisan command using either the command's name or class.

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"
)

тип Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### Уровень записи

Когда `app.debug` находится `true`, консоль будет печатать все журналы. В противном случае будут выведены только журналы уровня error.

### Параметры расписания частоты

Мы уже видели несколько примеров того, как вы можете настроить задачу для запуска с заданными интервалами. Тем не менее, существует много
больше частот, доступных для назначения задач:

| 方法                       | 描述                                                    |
| ------------------------ | ----------------------------------------------------- |
| `.Cron("* * * * *")`     | Выполнить задачу по пользовательскому расписанию cron |
| `.EveryMinute()`         | Запускать задачу каждую минуту                        |
| `.EveryTwoMinutes()`     | Запуск задачи каждые две минуты                       |
| `.EveryThreeMinutes()`   | Запускать задачу каждые три минуты                    |
| `.EveryFourMinutes()`    | Запуск задачи каждые четыре минуты                    |
| `.EveryFiveMinutes()`    | Запуск задачи каждые пять минут                       |
| `.EveryTenMinutes()`     | Запускать задачу каждые десять минут                  |
| `.EveryFifteenMinutes()` | Запускать задачу каждые пятнадцать минут              |
| `.EveryThirtyMinutes()`  | Запускать задачу каждые тридцать минут                |
| `.Час()`                 | Запускать задачу каждый час                           |
| `.ЧасыAt(17)`            | Запускать задачу каждый час за 17 минут после часа    |
| `.EveryTwoHours()`       | Запуск задачи каждые два часа                         |
| `.EveryThreeHours()`     | Запуск задачи каждые три часа                         |
| `.EveryFourHours()`      | Запуск задачи каждые четыре часа                      |
| `.EverySixHours()`       | Запуск задачи каждые шесть часов                      |
| `.Daily()`               | Запускать задачу каждый день в полночь                |
| `.DailyAt("13:00")`      | Выполнять задачу каждый день в 13:00  |

### Предотвращение наложения задач

По умолчанию запланированные задачи будут выполняться, даже если запущен предыдущий экземпляр. To prevent this, use the
following methods:

| 方法                       | 描述                                |
| ------------------------ | --------------------------------- |
| `.SkipIfStillRunning()`  | Пропустить, если всё ещё запущено |
| `.DelayIfStillRunning()` | Задержка если всё ещё выполняется |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### Запуск задач на одном сервере

> Для использования этой функции ваша программа должна использовать драйвер кэша memcached, dynamodb или redis в качестве стандартного драйвера кэша
> . Кроме того, все серверы должны взаимодействовать с одним центральным сервером кэша.

Если планировщик вашего приложения работает на нескольких серверах, вы можете убедиться, что запланированная работа выполняется только на одном из
них. Например, скажем, у вас есть запланированная задача, которая создает новый отчет каждую пятницу вечером. If the task
scheduler runs on three worker servers, the scheduled task will run on all three servers and create the report three
times. Это не идеально!

To prevent this, use the `OnOneServer` method when defining the scheduled task, which will make sure that the task runs
on only one server. Первый сервер, получивший задание, защитит атомарный замок от работы, предотвращение выполнения других серверов
одной и той же задачи одновременно:

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

Запланированные замыкания должны быть назначены имя, если они предназначены для запуска на одном сервере:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Запуск планировщика

Теперь, когда мы научились определять запланированные задачи, давайте обсудим, как на самом деле запустить их на нашем сервере.

Добавьте `go facades.Schedule().Run()` в файл `main.go`.

```go
пакет main

import (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // This bootstraps the framework and make it ready for use.
  bootstrap.Boot()

  // Запуск расписания по facades.Schedule
  go facades.Schedule().Run()

  select {}
}
```

## Остановка планировщика

Вы можете вызвать метод «Выключение», чтобы изящно выключить планировщик. This method will wait for all tasks to
complete before shutting down.

```go
// main.go
bootstrap.Boot()

// Создание канала для прослушивания сигналов ОС
quit := make(chan os.Signal)
. otify(quit, syscall.SIGINT, syscall.SIGTERM)

// Начало расписания по facades.Schedule
идти facades.Schedule(). un()

// Слушаем сигнал ОС
go func() {
  <-quit
  if err := facades. chedule().Shutdown(); err != nil {
    facades. og().Ошибка("Ошибка завершения планирования: %v", ошибка)
  }

  os.Exit(0)
}()

выберите {}
```
