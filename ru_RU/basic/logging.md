# Ведение журнала

In order to understand the running status of the application, Goravel provides a powerful log service that can record
log messages and system errors to a file or other channels through `facades.Log()`.

## Конфигурация

Для настройки различных каналов журнала, пользовательские настройки могут быть сделаны в файле `config/logging.go`.

`Goravel` использует `stack` канал для записи журналов по умолчанию, `stack` позволяет перенаправлять журналы на несколько каналов.

Конфигурация «print» в драйверах «single» и «daily» может контролировать вывод журнала в консоль.

## Доступные драйверы каналов

| Наименование | Описание                    |
| ------------ | --------------------------- |
| `stack`      | Разрешить несколько каналов |
| `single`     | Одиночный лог               |
| «ежедневно»  | Один файл журнала в день    |
| `custom`     | Настраиваемый диск          |

### Вставить контекст

```go
facades.Log().WithContext(ctx)
```

## Записывать сообщения журнала

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warning().Warningf(message, args)
facades. og().Ошибка(сообщение)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### Записать в определенный канал

Иногда вы можете захотеть записать сообщения на канал, отличный от канала по умолчанию:

```go
facades.Log().Channel("single").Info(сообщение)
```

Если вы хотите записать в несколько каналов одновременно, используйте метод `Stack`:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Методы цепи

Горавель предоставляет удобные методы цепи, которые позволяют легко вставить в лог более полезную информацию:

```go
facades.Log().User("John").Debug(message)
```

| Метод        | Действие                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Код          | Установите код или слаг, который описывает журнал.                               |
| Подсказка    | Установить подсказку для ускорения отладки.                                      |
| В            | Задайте категорию свойств или домен, в котором соответствующая запись в журнале. |
| Владелец     | Полезно для целей оповещения.                                                    |
| Запросить    | Обеспечивает http.Request.                                       |
| Замечание    | Предоставляет http.Response.                                     |
| Теги         | Добавьте несколько тегов, описывая функцию, возвращающую ошибку.                 |
| Пользователь | Установить пользователя, связанного с записью журнала.                           |
| С            | Добавить пары ключевого значения в контекст записи журнала.                      |
| Отписаться   | Добавить информацию о стеке в запись журнала.                                    |

## Создать пользовательский канал

Если вы хотите определить полностью пользовательский канал, вы можете указать тип драйвера `custom` в конфигурационном файле `config/logging.go`
.
Затем включите опцию `via` для реализации структуры `framework\contracts\log\Logger`:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Реализовать драйвер

Реализовать `framework\contracts\log\Logger` интерфейс.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Путь к конфигурации канала передач здесь
  Handle pass channel string) (Hook, error)
}
```

файлы могут храниться в папке `app/extensions` (modifiable). Например:

```go
расширений пакетов

импорт (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Обработка пути канала передачи маршрута здесь
func (logger *Logger) Handle(channel string) (log. ook, error) {
  return &Hook{}, nil
}

тип Hook struct {
}

// Levels monitoring level
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Выполнение логики при срабатывании
func (h *Hook) Fire(запись журнала. ntry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
