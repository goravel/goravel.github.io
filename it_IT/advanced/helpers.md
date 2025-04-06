# Helpers

## Metodi Disponibili

### Percorsi

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Tempo

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

### Mappe

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Converti

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Raccogli

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Percorsi

### `path.App()`

La funzione `path.App()` restituisce il percorso alla directory dell'app della tua applicazione. Puoi anche usare la funzione `path.App()`
per generare un percorso a un file relativo alla directory dell'applicazione:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

La funzione `path.Base()` restituisce il percorso alla directory principale della tua applicazione. Puoi anche usare la funzione `path.Base()`
per generare un percorso a un dato file relativo alla directory radice del progetto:

```go
path := path.Base()
path := path.Base("vendor/bin")
```

### `path.Config()`

La funzione `path.Config()` restituisce il percorso alla cartella di configurazione della tua applicazione. Puoi anche usare la funzione `path.Config()`
per generare un percorso a un dato file nella directory di configurazione dell'applicazione:

```go
path := path.Config()
path := path.Config("app.go")
```

### `path.Database()`

La funzione `path.Database()` restituisce il percorso alla directory del database della tua applicazione. Puoi anche usare la funzione `path.Database()`
per generare un percorso a un dato file nella directory `database`:

```go
path := path.Database()
path := path.Database("factories/user_factory.go")
```

### `path.Storage()`

La funzione `path.Storage()` restituisce il percorso alla directory di archiviazione della tua applicazione. Puoi anche usare la funzione `path.Storage()`
per generare un percorso a un dato file nella directory `storage`:

```go
path := path.Storage()
path := path.Storage("app/file.txt")
```

### `path.Public()`

La funzione `path.Public()` restituisce il percorso alla directory pubblica della tua applicazione. Puoi anche usare la funzione `path.Public()`
per generare un percorso a un dato file nella directory `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

La funzione `path.Lang()` restituisce il percorso alla directory `lang`. You may also use the `path.Lang()` function to
generate a path to a given file within the `lang` directory:

```go
path := path.Lang()
path := path.Lang("en.json")
```

## Tempo

Il modulo `carbon` di Goravel è un'espansione di [modulo golang/carbonio](https://github.com/golang-module/carbon), la caratteristica principale
è la realizzazione del backtracking, si prega di fare riferimento alla documentazione ufficiale per i dettagli.

### `carbon.Now()`

Ottieni ora attuale:

```go
import "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Imposta fuso orario：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

Ottieni oggetto `Carbon` dalla Stringa:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Ottieni oggetto `Carbon` per timestamp:

```go
carbon.DaTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Ottieni oggetto `Carbon` per data ora:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Ottieni oggetto `Carbon` per data:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Ottieni oggetto `Carbon` per tempo:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Ottieni oggetto `Carbon` da `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

Determinare se il tempo è un valore di prova:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Imposta l'ora a un valore di test:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Ripristina il tempo a un valore normale:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` può stampare qualsiasi variabile:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` può stampare qualsiasi variabile su `io.Writer`:

```go
import "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` può stampare qualsiasi variabile in `string`:

```go
import "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Mappe

### `maps.Add()`

La funzione `maps.Add()` aggiunge una nuova coppia chiave-valore alla mappa data se la chiave non esiste già nella mappa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
mappe. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// mappa[string]stringa{"name": "Bowen"}
```

### `maps.Exists()`

La funzione `maps.Exists()` determina se la chiave specificata esiste nella mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

exists := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

La funzione `maps.Forget()` rimuove i tasti specificati dalla mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

La funzione `maps.Get()` recupera il valore della chiave data dalla mappa fornita. Se la chiave non esiste, il valore predefinito
sarà restituito:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

value := maps. et(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

La funzione `maps.Has()` determina se la chiave specificata esiste nella mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

esiste := maps. as(mp, "name", "language")
// true

exists = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

La funzione `maps.HasAny()` determina se uno dei tasti specificati esiste nella mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

esiste := maps. asAny(mp, "name", "age")
// true

exists = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

La funzione `maps.Only()` recupera solo i tasti dati dalla mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// map[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// map[string]any{"name": "Goravel"}
```

### `maps.Pull()`

La funzione `maps.Pull()` recupera e rimuove la chiave data dalla mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "name")
// name = "Goravel"
// mp = map[string]any{"language": "Go"}
```

Un valore predefinito può essere fornito come terzo argomento alla funzione `maps.Pull()`. Questo valore verrà restituito se la chiave
non esiste nella mappa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

La funzione `maps.Set()` imposta la chiave e il valore indicati nella mappa fornita:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

La funzione `maps.Where()` filtra la mappa fornita utilizzando il callback specificato:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. here(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Converti

### `convert.Tap()`

La funzione `convert.Tap()` passa il valore dato al callback fornito e restituisce il valore:

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
// map[string]string{"name": "Goravel", "language": "Go"}
```

### `convert.Transform()`

Il `convert.Transform()` trasforma il valore dato usando il callback fornito e restituisce il risultato:

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

Il `convert.With()` esegue il callback dato con il valore fornito e restituisce il risultato del callback:

```go
import "github.com/goravel/framework/support/convert"

value := convert.With("Goravel", func(value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

Il metodo `convert.Default()` restituisce il primo valore diverso da zero. Se tutti i valori sono zero, restituisce il valore zero.

```go
import "github.com/goravel/framework/support/convert"

value := convert.Default("", "foo")
// foo

value = convert. efault("bar", "foo")
// bar

value = convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

Il metodo `convert.Pointer()` restituisce il puntatore del valore dato.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Raccogli

### `collect.Count()`

La funzione `collect.Count()` restituisce il numero di elementi nella collezione specificata:

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

La funzione `collect.CountBy()` conta le occorrenze per le quali il predicato è vero:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

La funzione `collect.Each()` aleggia sugli elementi della collezione data e passa ogni elemento al callback
dato:

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

La funzione `collect.Filter()` filtra gli elementi della collezione usando il callback specificato:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

La funzione `collect.GroupBy()` raggruppa gli elementi della collezione in base al risultato del callback dato:

```go
import "github.com/goravel/framework/support/collect"

// use example of complex map slice (use different example)
newCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Name": "Bowen"},
    {"class": "2", "Name": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Name": "Bowen"}, {"class": "2", "Name": "Krishan"}},
// }
```

### `collect.Keys()`

La funzione `collect.Keys()` restituisce tutte le chiavi per gli oggetti della collezione:

```go
import "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

La funzione `collect.Map()` converte un tipo di collezione in un altro usando l'iterato specificato:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

La funzione `collect.Max()` restituisce il valore massimo della collezione specificata:

```go
import "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

La funzione `collect.Merge()` unisce le mappe date in una singola mappa:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

La funzione `collect.Min()` restituisce il valore minimo della collezione specificata:

```go
import "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

La funzione `collect.Reverse()` inverte gli elementi della collezione:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

La funzione `collect.Shuffle()` mescola gli oggetti nella collezione:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(example)
```

### `collect.Split()`

La funzione `collect.Split()` divide una collezione nei gruppi della lunghezza indicata. Se la collezione non può essere divisa uniformemente
, il pezzo finale conterrà gli elementi rimanenti:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

La funzione `collect.Sum()` restituisce la somma di tutti gli elementi della collezione:

```go

import "github.com/goravel/framework/support/collect"

sum := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

Il metodo `collect.Unique()` restituisce la collezione duplicata-free dove in caso di valori duplicati verrà conservata solo la prima occorrenza
:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Valori()`

La funzione `collect.Values()` restituisce tutti i valori della collezione specificata:

```go
import "github.com/goravel/framework/support/collect"

values := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
