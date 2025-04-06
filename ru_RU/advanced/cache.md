# Кэш

Goravel предоставляет расширяемый модуль кэша, который может работать с помощью `facades.Cache()`. Goravel поставляется с драйвером `memory`
для других драйверов, пожалуйста, проверьте соответствующие независимые пакеты расширений:

| Водитель | Ссылка                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Редис    | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Конфигурация

Сделать все пользовательские настройки в файле `config/cache.go`.

## Использование кэша

### Вставить контекст

```go
Cache().WithContext(ctx)
```

### Доступ к нескольким хранилищам кэша

Вы можете получить доступ к различным хранилищам с помощью метода `Store`. Ключ, передаваемый методу `Store`, должен соответствовать
одному из магазинов, перечисленных в списке конфигураций "магазинов" в файле конфигурации кэша:

```go
значение := facades.Cache().Store("redis").Get("foo")
```

### Получение элементов из кэша

```go
значение := facades.Cache().Get("goravel", "по умолчанию")
значение := facades.Cache().GetBool("goravel", true)
значение := facades.Cache().GetInt("goravel", 1) значение
значение := facades.Cache().GetString("goravel", "по умолчанию")
```

Вы можете передать функцию в качестве значения по умолчанию. If the specified data does not exist in the cache, the result of `func` will
be returned. Переходный метод закрытия позволяет получить значения по умолчанию из базы данных или других внешних сервисов
. Обратите внимание на структуру закрытия `func() any`.

```go
значение := facades.Cache().Get("goravel", func() any {
    return "default"
})
```

### Проверка существования предмета

```go
bool := facades.Cache().Хас("goravel")
```

### Увеличивание / уменьшение значений

Методы `Increment` и `Decrement` могут использоваться для настройки значения целочисленных элементов в кэше. Both methods
accept an optional second argument indicating the amount by which to increment or decrement the item's value:

```go
facades.Cache().Increment("ключ")
facades.Cache().Increment("ключ", amount)
facades.Cache().Decrement("ключ")
facades.Cache().Decrement("ключ", amount)
```

### Получить и магазин

Sometimes you may want to get data from the cache, and when the requested cache item does not exist, the program can
store a default value for you.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Second, func() (любой, ошибка) {
    return "goravel", nil
})
```

Если нужные данные не существуют в кэше, то будет выполнено закрытие для метода `Remember`, и затем
результат будет возвращен и помещен в кэш.

Вы можете использовать метод `RememberForever` для получения данных из кэша или его хранения навсегда:

```go
value, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Получить и удалить

```go
значение := facades.Cache().Pull("goravel", "по умолчанию")
```

### Хранение элементов в кэше

```go
err := facades.Cache().Put("goravel", "value", 5*time.Second)
```

Если время истечения кэша установлено в `0`, кэш будет действительным навсегда:

```go
err := facades.Cache().Put("goravel", "значение", 0)
```

### Магазин если нет

Метод `Add` сохраняет данные только если они не в кэше. Он возвращает `true`, если хранилище успешно и `false`, если
это не так.

```go
bool := facades.Cache().Add("goravel", "value", 5*time.Second)
```

### Хранить вещи навсегда

Метод `Forever` может использоваться для постоянного хранения данных в кэше. Because these data will not expire, they must
be manually deleted from the cache through the `Forget` method:

```go
bool := facades.Cache().Forever("goravel", "значение")
```

### Удаление элементов из кэша

```go
bool := facades.Cache().Forget("goravel")
```

Вы можете использовать метод `Flush` для очистки всех тайников:

```go
bool := facades.Cache().Flush()
```

## Атомные блокировки

### Управление блокировками

Атомарные замки позволяют манипулировать распределенными замками, не беспокоясь о состоянии гонки. You may create and
manage locks using the `Lock` method:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Получена блокировка в течение 10 секунд...

    lock.Release()
}
```

Метод «Get» также принимает замыкание. После закрытия Goravel автоматически освободит замок:

```go
facades.Cache().Lock("foo").Get(func () {
    // Блокировка приобретена на 10 секунд и автоматически освобождена...
});
```

Если замок не доступен в данный момент, вы можете поручить Горавелю дождаться указанного количества
секунд. Если замок не может быть получен в течение указанного срока, будет возвращено `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Заблокировка после ожидания максимум 5 секунд...
if (lock.Block(5*time.Second)) {
    lock.Release()
}
```

Пример выше можно упростить, передав замыкание методу "Блок". Когда закрытие передается этому методу,
Goravel попытается получить замок на указанное количество секунд и автоматически освободит замок
после того, как закрытие будет выполнено:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Блокировка приобретенной после ожидания максимум 5 секунд...
})
```

Если вы хотите освободить замок без уважения к его владельцу, вы можете использовать метод `ForceRelease`:

```go
Cache().Lock("processing").ForceRelease();
```

## Добавление драйверов кэша

### Конфигурация

Если вы хотите определить полностью пользовательский драйвер, вы можете указать тип драйвера `custom` в конфигурационном файле `config/cache.go`
.
Затем включите опцию `via` для реализации интерфейса `framework/contracts/cache/Driver`:

```go
//config/cache. o
"stores": интерфейс карты[string]{}{
    "memory": map[string]any{
        "driver": "memory",
    },
    "custom": интерфейс карты[string]{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Реализация собственного драйвера

Implement the `framework/contracts/cache/Driver` interface, files can be stored in the `app/extensions` folder (
modifiable).

```go
// framework/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Добавить драйвер элемента в кэш, если ключ не существует.
    Add(key string, value any, t time. uration) bool
    Decrement(key string, value ... nt) (int, error)
    // Неопределённый элемент в кэше.
    Forever(key string, value any) bool
    // Забыли удалить элемент из кэша.
    Бул Forget(key string)
    // Удалить все элементы из кэша.
    Fush() bool
    // Получить элемент из кэша по ключу.
    Get(key string, def . .any) any
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... tring) строка
    // Проверка элемента существует в кэше.
    Has(key string) бул
    Increment(key string, value . .int) (int, error)
    Lock(key string, t ...time. uration) Lock
    // Поместите элемент в кэш на заданное время.
    Put(key string, value any, t time. ошибка uration)
    // Pull Retrieve элемент из кэша и удалить его.
    Pull(клавиша строка, def ... ny) любой
    // Запомните получение элемента из кэша или выполните заданное Закрытие и сохраните результат.
    Запоминание(строка клавиш, время ttl. uration, callback func() (любой, ошибка) (любой, ошибка)
    // RememberForever Получить предмет из кэша, или выполнить заданное Закрытие и сохранить результат навсегда.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
