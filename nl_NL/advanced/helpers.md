# Helpers

## Beschikbare methoden

### Paden

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Tijd

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

### Kaarten

|                                                               |                                                                  |                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)    | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)    | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)  | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.here()](#maps-where) |                                                                  |                                                                  |

### Converteren

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Verzamelen

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Paden

### `path.App()`

De `path.App()` functie keert het pad terug naar de app directory. U kunt ook de 'path.App()'
functie gebruiken om een pad te genereren naar een bestand relatief aan de toepassing directory:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

De `path.Base()` functie keert het pad terug naar de hoofdmap van je applicatie. Je kunt ook de functie `path.Base()`
gebruiken om een pad te genereren naar een gegeven bestand relatief aan de hoofdmap van het project:

```go
pad := path.Base()
path := path.Base("vendor/bin")
```

### `path.Config()`

De `path.Config()` functie keert het pad terug naar de configuratie map van uw applicatie. U kunt ook de functie
`path.Config()` gebruiken om een pad naar een bepaald bestand te genereren binnen de configuratiemap van de applicatie:

```go
path := path.Config()
path := path.Config("app.go")
```

### `path.Database()`

De `path.Database()` functie keert het pad terug naar de database map van je applicatie. Je kunt ook de functie
`path.Database()` gebruiken om een pad naar een gegeven bestand te genereren binnen de `database` map:

```go
path := path.Database()
path := path.Database("fabrieken/user_factory.go")
```

### `path.Storage()`

De `path.Storage()` functie keert het pad terug naar de opslagmap van je applicatie. Je kunt ook de functie
`path.Storage()` gebruiken om een pad naar een bepaald bestand te genereren binnen de `storage` map:

```go
path := path.Storage()
path := path.Storage("app/file.txt")
```

### `path.Public()`

De `path.Public()` functie keert het pad terug naar de publieke map van je applicatie. Je kunt ook de
`path.Public()` functie gebruiken om een pad naar een bepaald bestand te genereren in de `publiek` map:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

De `path.Lang()` functie keert het pad terug naar de `lang` map. Je kunt ook de `path.Lang()` functie gebruiken om
een pad te genereren naar een bepaald bestand in de `lang` map:

```go
path := path.Lang()
path := path.Lang("en.json")
```

## Tijd

De `carbon` module van Goravel is een uitbreiding met [golang-module/carbon](https://github.com/golang-module/carbon), de
hoofdfunctie is de realisatie van tijd backtracking, raadpleeg de officiële documentatie voor meer informatie.

### `carbon.Now()`

Huidige tijd krijgen:

```go
import "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Tijdzone instellen：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

Krijg het `Carbon` object door String:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Krijg `Carbon` object volgens tijdstempel:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Krijg `Carbon` object volgens datum tijd:

```go
carbon.FromDateTime(2020, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Krijg `Carbon` object op datum:

```go
Carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Krijg `Carbon` object per keer:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Krijg het `Carbon` object met `time.Time`:

```go
carbon.FromStdTime(tijd.Now())
```

### `carbon.IsTestNow()`

Bepaal of de tijd een testwaarde is:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Zet de tijd op een testwaarde:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Herstel de tijd naar een normale waarde:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` kan elke variabele weergeven:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` kan elke variabele weergeven naar `io.Writer`:

```go
importeer "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` kan elke variabele naar `string` afdrukken:

```go
importeer "github.com/goravel/framework/support/debug"

debug.SDump(my1, myVar2, ...)
```

## Kaarten

### `maps.Add()`

De `maps.Add()` functie voegt een nieuwe sleutelwaarde paar toe aan de opgegeven kaart als de sleutel nog niet bestaat in de kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
kaarten. dd(mp, "leeftijd", 22)
// map[string]any{"name": "Krishan", "leeftijd": 22}

mp2 := map[string]string{}
kaarten. dd(mp2, "naam", "Bowen")
maps.Add(mp2, "naam", "Krishan")
// map[string]string{"name": "Bowen"}
```

### `maps.Exists()`

De functie 'Maps.Exists()' bepaalt of de opgegeven sleutel bestaat in de opgegeven kaart:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

bestaat := maps.Exists(mp, "name") // true

bestaat = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

De `maps.Forget()` functie verwijdert de opgegeven sleutel(s) van de geleverde kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

De functie 'maps.Get()' haalt de waarde van de gegeven sleutel op van de opgegeven kaart. Als de sleutel niet bestaat, zal de standaardwaarde van
worden teruggegeven:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

waarde := kaarten. et(mp, "naam", "Krishan")
// Bowen

waarde = maps.Get(mp, "leeftijd", 22)
// 22
```

### `maps.Has()`

De functie 'maps.Has()' bepaalt of de opgegeven sleutel(s) bestaat in de opgegeven kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

bestaat := kaarten. as(mp, "naam", "taal")
// true

bestaat = maps.Has(mp, "naam", "leeftijd")
// false
```

### `maps.HasAny()`

De functie 'maps.HasAny()' bepaalt of een van de opgegeven sleutel(s) bestaat in de opgegeven kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

bestaat := kaarten. asAny(mp, "naam", "leeftijd")
// true

bestaat = maps.HasAny(mp, "leeftijd", "email")
// false
```

### `maps.Only()`

De functie 'maps.Only()' gebruikt alleen de opgegeven sleutel(s) van de opgegeven kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// map[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// map[string]any{"name": "Goravel"}
```

### `maps.Pull()`

De functie 'maps.Pull()' gebruikt en verwijderd de gegeven sleutel van de opgegeven kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

naam := kaarten. ull(mp, "naam")
// naam = "Goravel"
// mp = map[string]eender wat {"language": "Go"}
```

Een standaardwaarde kan worden verstrekt als het derde argument voor de 'maps.Pull()' functie. Deze waarde wordt geretourneerd als de
sleutel niet bestaat in de kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

naam := kaarten. ull(mp, "leeftijd", "default")
// naam = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

De functie 'maps.Set()' bepaalt de opgegeven sleutel en waarde in de opgegeven kaart:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "taal": "Go"}
```

### `maps.Where()`

De `maps.Where()` functie filtert de opgegeven kaart met behulp van de opgegeven callback:

```go
importeer "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. hier(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Converteren

### `convert.Tap()`

De `convert.Tap()` functie geeft de gegeven waarde door naar de opgegeven callback en retourneert de waarde:

```go
import "github.com/goravel/framework/support/convert"

waarde := convert.Tap("Goravel", func(value string) {
    fmt. rintln(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := converteren. ap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// map[string]string{"name": "Goravel", "taal": "Go"}
```

### `convert.Transform()`

De `convert.Transform()` transformeert de gegeven waarde met behulp van de opgegeven callback en keert het resultaat terug:

```go
importeer "github.com/goravel/framework/support/convert"

waarde := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", functie(s string) *foo {
      return &foo{Name: s}
})
// &foo{Name: "foo"}
```

### `convert.With()`

De `convert.With()` voert de gegeven callback uit met de opgegeven waarde en geeft het resultaat van de callback:

```go
import "github.com/goravel/framework/support/convert"

waarde := convert.With("Goravel", func(value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

De `convert.Default()` methode geeft eerst de niet-nulwaarde weer. Als alle waarden nul zijn, geeft het nul waarde.

```go
importeer "github.com/goravel/framework/support/convert"

waarde := convert.Default("", "foo")
// foo

waarde = convert. efault("bar", "foo")
// bar

waarde = convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

De `convert.Pointer()` methode geeft de aanwijzer van de opgegeven waarde terug.

```go
importeer "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Verzamelen

### `collect.Count()`

De `collect.Count()` functie retourneert het aantal items in de gegeven collectie:

```go
importeer "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

De `collect.CountBy()` functie telt de gebeurtenissen waarvoor de voorspelling waar is:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

De `collect.Each()` functie herhaalt zich over de items in de gegeven collectie en passeert elk item naar de gegeven
callback:

```go
importeer "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

De `collect.Filter()` functie filtert de items in de collectie met de gegeven callback:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

De functie `collect.GroupBy()` groepeert de items in de collectie op basis van de gegeven callback:

```go
importeer "github.com/goravel/framework/support/collect"

// gebruik voorbeeld van complexe map slice (gebruik ander voorbeeld)
newCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Naam": "Rohan"},
    {"class": "2", "Naam": "Bowen"},
    {"class": "2", "Naam": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}}, ,
// "2": []map[string]string{{"class": "2", "Naam": "Bowen"}, {"class": "2", "Naam": "Krishan"}},
// }
```

### `collect.Keys()`

De `collect.Keys()` functie retourneert alle sleutels voor de items in de collectie:

```go
importeer "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// ["name", "language"}
```

### `collect.Map()`

De `collect.Map()` functie converteert een type collectie naar een ander met behulp van de gegeven iteraat:

```go
importeer "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

De `collect.Max()` functie retourneert de maximale waarde van de gegeven collectie:

```go
importeer "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

De `collect.Merge()` functie voegt de gegeven kaarten samen in één kaart:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

De `collect.Min()` functie geeft de minimale waarde van de gegeven collectie:

```go
importeer "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

De `collect.Reverse()` functie draait de items in de collectie om:

```go
importeer "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

De `collect.Shuffle()` functie schakelt de items in de collectie:

```go
importeer "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 1, 5, 2, 4}(voorbeeld)
```

### `collect.Split()`

De `collect.Split()` functie splitst een collectie in de groepen van de gegeven lengte. If the collection can't be split
evenly, the final chunk will contain the remaining items:

```go
importeer "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// []int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

De `collect.Sum()` functie retourneert de som van alle items in de collectie:

```go

import "github.com/goravel/framework/support/collect"

som := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

De `collect.Unique()` methode retourneert de dubbele gratis collectie waarbij in het geval van dubbele waarden alleen de eerste
gebeurtenis zal worden bewaard:

```go
importeer "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

De `collect.Values()` functie retourneert alle waarden van de opgegeven collectie:

```go
importeer "github.com/goravel/framework/support/collect"

waarden := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
