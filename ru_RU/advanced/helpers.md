# Helpers

## Доступные методы

### Пути

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Время

|                                                                                    |                                                                                  |                                                                              |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [carbon.Now()](#carbon-now)                     | [carbon.SetTimezone()](#carbon-settimezone)   | [carbon.Parse()](#carbon-parse)           |
| [carbon.FromTimestamp()](#carbon-fromtimestamp) | [carbon.FromDateTime()](#carbon-fromdatetime) | [carbon.FromDate()](#carbon-fromdate)     |
| [carbon.FromTime()](#carbon-fromtime)           | [carbon.FromStdTime()](#carbon-fromstdtime)   | [carbon.IsTestNow()](#istestnow-fromdate) |
| [carbon.SetTestNow()](#carbon-settestnow)       | [carbon.UnsetTestNow()](#carbon-unsettestnow) |                                                                              |

### Debug

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [debug.Dump()](#debug-dump) | [debug.SDump()](#debug-sdump) | [debug.FDump()](#debug-fdump) |

### Карты

|                                                               |                                                                  |                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [карты.Add()](#maps-add)   | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)    | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)  | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [карты.где()](#maps-where) |                                                                  |                                                                  |

### Конвертировать

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Собрать

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Пути

### `path.App()`

Функция `path.App()` возвращает путь к каталогу приложения вашего приложения. Вы также можете использовать функцию `path.App()`
для создания пути к файлу относительно каталога приложения:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

Функция `path.Base()` возвращает путь к корневому каталогу вашего приложения. Вы также можете использовать функцию `path.Base()`
для создания пути к заданному файлу относительно корневой директории проекта:

```go
путь := path.Base()
путь := path.Base("vendor/bin")
```

### `path.Config()`

Функция `path.Config()` возвращает путь к папке конфигурации вашего приложения. Вы также можете использовать функцию
`path.Config()` для создания пути к заданному файлу в каталоге конфигурации приложения:

```go
путь := path.Config()
путь := path.Config("app.go")
```

### `path.Database()`

Функция `path.Database()` возвращает путь к базе данных вашего приложения. Вы также можете использовать функцию
`path.Database()` для создания пути к заданному файлу в папке `database`:

```go
путь := path.Database()
путь := path.Database("factories/user_factory.go")
```

### `path.Storage()`

Функция `path.Storage()` возвращает путь к каталогу хранения вашего приложения. Вы также можете использовать функцию
`path.Storage()` для создания пути к заданному файлу в папке `storage`:

```go
путь := path.Storage()
путь := path.Storage("app/file.txt")
```

### `path.Public()`

Функция `path.Public()` возвращает путь к публичному каталогу вашего приложения. Вы также можете использовать функцию
`path.Public()` для создания пути к заданному файлу в папке `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

Функция `path.Lang()` возвращает путь в папку `lang`. Вы также можете использовать функцию `path.Lang()` для
сгенерировать путь к заданному файлу в папке `lang`:

```go
путь := path.Lang()
путь := path.Lang("en.json")
```

## Время

Модуль «карбон» Горавеля - это расширение [golang-module/carbon](https://github.com/golang-module/carbon), основной функцией
является реализация обратного периода времени, пожалуйста, обратитесь к официальной документации за подробностями.

### `carbon.Now()`

Получить текущее время:

```go
импортировать "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Установить часовой пояс：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

Получите `Carbon` объект, строка:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Получить объект `Carbon` по метке времени:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Получить `Carbon` объект по дате времени:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0)
```

### `carbon.FromDate()`

Получить объект `Carbon` по дате:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Получить `Carbon` объект по времени:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Получить `Carbon` объект по `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

Определяет, является ли время тестовое значение:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Установите время на тестовое значение:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Восстановить время до нормального значения:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` может печатать любую переменную:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` может печатать любую переменную в `io.Writer`:

```go
импортировать "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` может печатать любую переменную в `string`:

```go
импортировать "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Карты

### `maps.Add()`

Функция `maps.Add()` добавляет на заданную карту новую пару ключей в том случае, если ключ еще не существует на карте:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
maps. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
maps. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// map[string]string{"name": "Bowen"}
```

### `maps.Существует()`

Функция `maps.Exists()` определяет, существует ли данный ключ в представленной карте:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

существует := maps.Exists(mp, "name") // true

существует = maps.Exists(mp, "email") // ложное
```

### `maps.Forget()`

Функция `maps.Forget()` удаляет заданный ключ (ключи) из предоставленной карты:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

Функция `maps.Get()` возвращает значение заданного ключа на предоставленной карте. Если ключ не существует, значение
по умолчанию будет возвращено:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

value := maps. et(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

Функция `maps.Has()` определяет, существует ли указанная клавиша (клавиши) на предоставленной карте:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

существует := maps. as(mp, "name", "language")
// true

существует = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

Функция `maps.HasAny()` определяет, существует ли какая-либо из заданных ключей(ов) на предоставленной карте:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

существует := maps. asAny(mp, "name", "age")
// true

существует = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

Функция `maps.Only()` извлекает только заданный ключ(ы) из предоставленной карты:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// map[string]any{"name": "Горавель"}

newMap = maps.Only(mp, "name", "age")
// map[string]any{"name": "Горавель"}
```

### `maps.Pull()`

Функция `maps.Pull()` извлекает и удаляет заданный ключ с предоставленной карты:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "name")
// name = "Goravel"
// mp = map[string]any{"language": "Go"}
```

Значение по умолчанию может быть передано в качестве третьего аргумента функции `maps.Pull()`. Это значение будет возвращено, если ключ
не существует на карте:

```go
импорт "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

Функция `maps.Set()` устанавливает заданный ключ и значение на предоставленной карте:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

Функция `maps.Where()` фильтрует предоставленную карту, используя заданный обратный вызов:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. here(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Конвертировать

### `convert.Tap()`

Функция `convert.Tap()` передает заданное значение в предоставленную обратную связь и возвращает значение:

```go
import "github.com/goravel/framework/support/convert"

value := convert.Tap("Goravel", func(value string) {
    fmt. rintln(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := convert. ap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// map[string]string{"name": "Горавел", "language": "Go"}
```

### `convert.Transform()`

`convert.Transform()` преобразует заданное значение, используя предоставленную обратную связь, и возвращает результат:

```go
import "github.com/goravel/framework/support/convert"

value := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s string) *foo {
      return &foo{Name: s}
})
// &foo{Name: "foo"}
```

### `convert.With()`

`convert.With()` выполняет заданное значение обратного вызова и возвращает результат обратного вызова:

```go
import "github.com/goravel/framework/support/convert"

value := convert.With("Goravel", func(value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

Метод `convert.Default()` возвращает первое не-нулевое значение. Если все значения равны нулю, он возвращает нулевое значение.

```go
import "github.com/goravel/framework/support/convert"

value := convert.Default("", "foo")
// foo

value = convert. efault("bar", "foo")
// значение бара

= convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

Метод `convert.Pointer()` возвращает указатель заданного значения.

```go
импортируйте "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Собрать

### `collect.Count()`

Функция `collect.Count()` возвращает количество элементов в данной коллекции:

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

Функция `collect.CountBy()` подсчитывает случаи, при которых предикат верен:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

 // 1
```

### `collect.Each()`

Функция `collect.Each()` повторяет элементы в заданной коллекции и передает каждый элемент заданному
callback:

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

Функция `collect.Filter()` фильтрует элементы коллекции, используя заданный обратный вызов:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

Функция `collect.GroupBy()` группирует элементы в коллекции по результатам данного обратного вызова:

```go
импортируйте "github.com/goravel/framework/support/collect"

// используйте пример сложного кусочека карт (используйте другой пример)
newCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Название: "Боуен"},
    {"класс": "2", "Имя": "Кришан"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Name": "Bowen"}, {"class": "2", "Name": "Krishan"}},
// }
```

### `collect.Keys()`

Функция `collect.Keys()` возвращает все ключи для элементов в коллекции:

```go
import "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

Функция `collect.Map()` преобразует один тип коллекции в другой, используя заданную итерацию:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

Функция `collect.Max()` возвращает максимальное значение данной коллекции:

```go
импорт "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

Функция «collect.Merge()» объединяет заданные карты в одну карту:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

Функция `collect.Min()` возвращает минимальное значение данной коллекции:

```go
импорт "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

Функция `collect.Reverse()` возвращает элементы в коллекции:

```go
импорт "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

Функция `collect.Shuffle()` перемешивает элементы в коллекции:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(example)
```

### `collect.Split()`

Функция `collect.Split()` разбивает коллекцию на группы заданной длины. If the collection can't be split
evenly, the final chunk will contain the remaining items:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

Функция «collect.Sum()» возвращает сумму всех элементов в коллекции:

```go

import "github.com/goravel/framework/support/collect"

sum := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

Метод `collect.Unique()` возвращает коллекцию, свободную от дубликатов, где в случае повторяющихся значений сохранится только первая коллекция
:

```go
импортировать "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

Функция «collect.Values()» возвращает все значения данной коллекции:

```go
import "github.com/goravel/framework/support/collect"

values := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
