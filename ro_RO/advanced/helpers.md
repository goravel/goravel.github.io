# Helpers

## Metode disponibile

### Cale

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Timp

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

### Hărţi

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Uit()](#maps-forget)    |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Convertește

|                                                                           |                                                                          |                                                                              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)          | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Implicit()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Colectează

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Cale

### `path.App()`

Funcţia `path.App()` returnează calea către directorul aplicaţiei dvs. Puteți folosi, de asemenea, funcția
'path.App()' pentru a genera o cale către un fișier relativ la directorul aplicației:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

Funcția `path.Base()` returnează calea către directorul rădăcină al aplicației tale. Puteți folosi, de asemenea, funcția
'path.Base()' pentru a genera o cale către un fișier dat în raport cu directorul rădăcină al proiectului:

```go
path := path.Base()
path := path.Base("vendor/bin")
```

### `path.Config()`

Funcția `path.Config()` returnează calea către directorul de configurare al aplicației tale. De asemenea, puteți folosi funcția
`path.Config()` pentru a genera o cale către un fișier dat în directorul de configurare al aplicației:

```go
calea := path.Config()
calea := path.Config("app.go")
```

### `path.Database()`

Funcția `path.Database()` returnează calea către directorul de baze de date al aplicației tale. Puteţi folosi, de asemenea, funcţia
`path.Database()` pentru a genera o cale către un fişier dat în directorul `database`:

```go
calea := path.Database()
calea := path.Database("factories/user_factory.go")
```

### `path.Storage()`

Funcția `path.Storage()` returnează calea către directorul de stocare al aplicației tale. Puteți folosi, de asemenea, funcția
`path.Storage()` pentru a genera o cale către un fișier dat în directorul `storage`:

```go
calea := path.Storage()
calea := path.Storage("app/file.txt")
```

### `path.Public()`

Funcția `path.Public()` returnează calea către directorul public al aplicației tale. Puteţi folosi, de asemenea, funcţia
`path.Public()` pentru a genera o cale către un fişier dat în folderul `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

Funcţia `path.Lang()` returnează calea către directorul `lang`. You may also use the `path.Lang()` function to
generate a path to a given file within the `lang` directory:

```go
calea := path.Lang()
calea := path.Lang("en.json")
```

## Timp

Modulul `carbon` al Goravel este o expansiune de [golang-module/carbon](https://github.com/golang-module/carbon), caracteristica principală
este realizarea backtracking-ului în timp, vă rugăm să consultaţi documentaţia oficială pentru detalii.

### `carbon.Now()`

Obține ora curentă:

```go
import "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Setează fusul orar：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

Obțineți obiectul `Carbon` string:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Objectul `Carbon` de timestamp:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Objectează `Carbon` după dată:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0)
```

### `carbon.FromDate()`

Object `Carbon` până la data:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Object `Carbon` în funcţie de timp:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Object `Carbon` de `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

Determinați dacă ora este o valoare de test:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Setaţi ora la o valoare de test:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Restabiliți timpul la o valoare normală:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` poate imprima orice variabilă:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` poate imprima orice variabilă în `io.Writer`:

```go
import "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` poate imprima orice variabilă în `string`:

```go
import "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Hărţi

### `maps.Add()`

Funcţia `maps.Add()` adaugă o nouă pereche cheie-valoare pe harta dată dacă cheia nu există deja pe hartă:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"} Hărţi
. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{} hartă
. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// harta[string]string{"name": "Bowen"}
```

### `maps.Exists()`

Funcţia `maps.Exists()` determină dacă cheia dată există în harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

există := maps.Exists(mp, "name") // true

există = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

Funcția `maps.Forget()` elimină cheile date de pe harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

Funcția `maps.Get()` recuperează valoarea cheii date de pe harta furnizată. Dacă cheia nu există, valoarea implicită
va fi returnată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

valoare := hărți. et(mp, "nume", "Krishan")
// Bowen

valoare = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

Funcţia `maps.Has()` determină dacă cheile date există în harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

există:= hărți. as(mp, "nume", "limbă")
// true

există = maps.Has(mp, "nume", "vârstă")
// false
```

### `maps.HasAny()`

Funcţia `maps.HasAny()` determină dacă oricare dintre cheile date există în harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

există:= hărți. asAny(mp, "name", "age")
// true

există = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

Funcția `maps.Only()` regăsește doar cheia (cheile) dată de pe harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := hărți. n nly(mp, "name")
// harta[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "nume", "vârstă")
// harta[string]oricare {"nume": "Goravel"}
```

### `maps.Pull()`

Funcţia `maps.Pull()` recuperează şi elimină cheia dată de pe harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

nume := hărți. ull(mp, "name")
// nume = "Goravel"
// mp = harta[string]any{"language": "Go"}
```

O valoare implicită poate fi furnizată ca al treilea argument la funcţia `maps.Pull()`. Această valoare va fi returnată dacă cheia
nu există pe hartă:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

nume := hărți. ull(mp, "age", "default")
// nume = "default"
// mp = harta[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

Funcţia `maps.Set()` stabileşte cheia şi valoarea dată în harta furnizată:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// harta[string]orice {"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

Funcţia `maps.Where()` filtrează harta furnizată folosind callback-ul dat:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := hărți. aici (mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Convertește

### `convert.Tap()`

Funcția `convert.Tap()` trece valoarea dată la callback-ul furnizat și returnează valoarea:

```go
import "github.com/goravel/framework/support/convert"

valoare := convert.Tap("Goravel", function (value string) {
    fmt. rintln(valoare + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := convert. ap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// map[string]string{"name": "Goravel", "language": "Go"}
```

### `convert.Transform()`

`convert.Transform()` transformă valoarea dată folosind callback-ul furnizat și returnează rezultatul:

```go
import "github.com/goravel/framework/support/convert"

valoare := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s șir) *foo {
      return &foo{Name: s}
})
// &foo{Nume: "foo"}
```

### `convert.With()`

`convert.With()` execută callback-ul dat cu valoarea furnizată şi returnează rezultatul callback-ului:

```go
import "github.com/goravel/framework/support/convert"

valoare := convert.With("Goravel", func(valoare string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

Metoda `convert.Implic()` returnează prima valoare non-zero. Dacă toate valorile sunt zero, returnează valoarea zero.

```go
import "github.com/goravel/framework/support/convert"

valoare := convert.Implic("", "foo")
// foo

valoare = convertit. valoare efault("bar", "foo")
// bar

= convert.Implicit (0, 1)
// 1
```

### `convert.Pointer()`

Metoda `convert.Pointer()` returnează indicatorul valorii date.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Colectează

### `collect.Count()`

Funcţia `collect.Count()` returnează numărul de elemente din colecţia dată:

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

Funcția `collect.CountBy()` numără evenimentele pentru care predicția este adevărată:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(stratul de valori) bool {
    return strings.Contains(valoare, "Goravel")
})
// 1
```

### `collect.Each()`

Funcția `collect.Each()` reiterează elementele din colecția dată și trece fiecare element la callback-ul dat
:

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

Funcţia `collect.Filter()` filtrează elementele din colecţie folosind callback-ul dat:

```go
import "github.com/goravel/framework/support/collect"

newColection := collect.Filter([]string{"Goravel", "Framework"}, func(value-string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

Funcţia `collect.GroupBy()` grupează elementele din colecţie după rezultatul unui retroapel:

```go
import "github.com/goravel/framework/support/collect"

// use example of complex map slice (use different example)
newColection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Nume": "Bowen"},
    {"class": "2", "Nume": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Nume": "Bowen"}, {"class": "2", "Nume": "Krishan"}},
// }
```

### `collect.Keys()`

Funcția `collect.Keys()` returnează toate cheile pentru elementele din colecție:

```go
import "github.com/goravel/framework/support/collect" Cheile

:= collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

Funcţia `collect.Map()` converteşte un tip de colecţie în altul folosind iteratul dat:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(valuing, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

Funcția `collect.Max()` returnează valoarea maximă a colecției date:

```go
import "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

Funcţia `collect.Merge()` îmbină hărţile date într-o singură hartă:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = colectare. erge(harta[string]string{"name": "Goravel"}, harta[string]string{"name": "Framework"})
// harta[string]string{"name": "Framework"}
```

### `collect.Min()`

Funcţia `collect.Min()` returnează valoarea minimă a colecţiei date:

```go
import "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

Funcţia `collect.Reverse()` inversează elementele din colecţie:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

Funcţia `collect.Shuffle()` amestecă obiectele din colectare:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(exemplu)
```

### `collect.Split()`

Funcția `collect.Split()` împarte o colecție în grupuri de lungime dată. În cazul în care colecția nu poate fi împărțită
uniform, chunk-ul final va conține elementele rămase:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

Funcţia `collect.Sum()` returnează suma tuturor elementelor din colectare:

```go

import "github.com/goravel/framework/support/collect"

suma := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

Metoda `collect.Unique()` returnează colecția duplicat-free unde în cazul valorilor duplicat, doar primul eveniment
va fi păstrat:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

Funcţia `collect.Values()` returnează toate valorile din colecţia dată:

```go
import "github.com/goravel/framework/support/collect"

values := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
