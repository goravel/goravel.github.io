# Helpers

## Verfügbare Methoden

### Pfade

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Zeit

|                                                                                    |                                                                                  |                                                                              |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [carbon.Now()](#carbon-now)                     | [carbon.SetTimeZone()](#carbon-settimezone)   | [carbon.Parse()](#carbon-parse)           |
| [Carbon.FromTimestamp()](#carbon-fromtimestamp) | [carbon.FromDateTime()](#carbon-fromdatetime) | [carbon.VromDate()](#carbon-fromdate)     |
| [carbon.FromTime()](#carbon-fromtime)           | [Carbon.FromStdTime()](#carbon-fromstdtime)   | [carbon.IsTestNow()](#istestnow-fromdate) |
| [carbon.SetTestNow()](#carbon-settestnow)       | [carbon.UnsetTestNow()](#carbon-unsettestnow) |                                                                              |

### Debug

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [debug.Dump()](#debug-dump) | [debug.SDump()](#debug-sdump) | [debug.FDump()](#debug-fdump) |

### Karten

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Konvertieren

|                                                                                |                                                                         |                                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [konvertieren.Tap()](#convert-tap)          | [convert.with()](#convert-with)      | [convert.Transform()](#convert-transform) |
| [konvertieren.Standard()](#convert-default) | [convert.Zeiger()](#convert-pointer) |                                                                              |

### Sammeln

|                                                                         |                                                                             |                                                                          |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Sammle ein.Count()](#collect-count) | [Sammle ein.CountBy()](#collect-countby) | [Sammle Each()](#collect-each)                        |
| [Sammle Filter()](#collect-filter)                   | [Collect.GroupBy()](#collect-groupby)    | [Sammle Keys()](#collect-keys)                        |
| [Sammle Map()](#collect-map)                         | [Sammeln.Max()](#collect-max)            | [Collect.Merge()](#collect-merge)     |
| [Sammle Min()](#collect-min)                         | [Sammeln.Umkehr()](#collect-reverse)     | [collect.Shuffle()](#collect-shuffle) |
| [Sammle Split()](#collect-split)                     | [Sammle Sum()](#collect-sum)                             | [Collect.Unique()](#collect-unique)   |
| [Sammle Werte()](#collect-values)                    |                                                                             |                                                                          |

## Pfade

### `path.App()`

Die Funktion `path.App()` gibt den Pfad zum App-Verzeichnis deiner Anwendung zurück. Du kannst auch die `path.App()`
Funktion verwenden, um einen Pfad zu einer Datei relativ zum Anwendungsverzeichnis zu generieren:

```go
importieren "github.com/goravel/framework/support/path"

Pfad := path.App()
Pfad := path.App("http/controllers/controller.go")
```

### `path.Base()`

Die Funktion `path.Base()` gibt den Pfad zum Wurzelverzeichnis deiner Anwendung zurück. Du kannst auch die `path.Base()`
Funktion verwenden, um einen Pfad zu einer bestimmten Datei relativ zum Projektverzeichnis zu generieren:

```go
path := path.Base()
Pfad := path.Base("vendor/bin")
```

### `path.Config()`

Die Funktion `path.Config()` gibt den Pfad zum Konfigurationsverzeichnis Ihrer Anwendung zurück. Du kannst auch die
`path.Config()` Funktion verwenden, um einen Pfad zu einer bestimmten Datei im Konfigurationsverzeichnis der Anwendung zu generieren:

```go
path := path.Config()
Pfad := path.Config("app.go")
```

### `path.Database()`

Die Funktion `path.Database()` gibt den Pfad zum Datenbankverzeichnis deiner Anwendung zurück. Du kannst auch die
`path.Database()` Funktion verwenden, um einen Pfad zu einer gegebenen Datei im `database` Verzeichnis zu generieren:

```go
path := path.Database()
Pfad := path.Database("factories/user_factory.go")
```

### `path.Storage()`

Die Funktion `path.Storage()` gibt den Pfad zum Speicherverzeichnis deiner Anwendung zurück. Du kannst auch die
`path.Storage()` Funktion verwenden, um einen Pfad zu einer gegebenen Datei im `storage` Verzeichnis zu generieren:

```go
path := path.Storage()
Pfad := path.Storage("app/file.txt")
```

### `path.Public()`

Die Funktion `path.Public()` gibt den Pfad zum öffentlichen Verzeichnis deiner Anwendung zurück. Du kannst auch die
`path.Public()` Funktion verwenden, um einen Pfad zu einer gegebenen Datei im `public` Verzeichnis zu generieren:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

Die Funktion `path.Lang()` gibt den Pfad zum `lang` Verzeichnis zurück. You may also use the `path.Lang()` function to
generate a path to a given file within the `lang` directory:

```go
path := path.Lang()
Pfad := path.Lang("de.json")
```

## Zeit

Das `carbon` Modul von Goravel ist eine Erweiterung von [golang-module/carbon](https://github.com/golang-module/carbon), die
Hauptfunktion ist die Realisierung der Zeiterfassung, bitte konsultieren Sie die offizielle Dokumentation für Details.

### `carbon.Now()`

Aktuelle Zeit:

```go
importiere "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimeZone()`

Zeitzone： festlegen

```go
carbon.SetTimeZone (carbon.UTC)
```

### `carbon.Parse()`

Erhalte `Carbon` Objekt durch String:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Holen Sie sich `Carbon` Objekt nach Zeitstempel:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Holen Sie sich `Carbon` Objekt nach Datum:

```go
carbon.FromDateTime(2020, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Erhalte `Carbon` Objekt nach Datum:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Erhalte `Carbon` Objekt nach Zeit:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Erhalte `Carbon` Objekt von `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

Legen Sie fest, ob die Zeit ein Testwert ist:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Setze die Zeit auf einen Testwert:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Wiederherstellen der Zeit auf einen normalen Wert:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` kann jede Variable ausdrucken:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` kann jede Variable nach `io.Writer` ausdrucken:

```go
importieren "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` kann jede Variable nach `string` ausdrucken:

```go
importieren "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Karten

### `maps.Add()`

Die Funktion `maps.Add()` fügt der angegebenen Karte ein neues Schlüssel-Wert-Paar hinzu, wenn der Schlüssel nicht bereits in der Karte vorhanden ist:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
Karten. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
karten. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// Map[string]string{"name": "Bowen"}
```

### `maps.Exists()`

Die `maps.Exists()` Funktion bestimmt, ob der angegebene Schlüssel in der angegebenen Karte existiert:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

exists := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

Die Funktion `maps.Forget()` entfernt die angegebenen Schlüssel(e) aus der angegebenen Karte:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "alter")
// Map[string]string{}
```

### `maps.Get()`

Die Funktion `maps.Get()` ruft den Wert des angegebenen Schlüssels aus der übergebenen Karte ab. Wenn der Schlüssel nicht existiert, wird der Standardwert
zurückgegeben:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

value := karten. et(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

Die `maps.Has()` Funktion bestimmt, ob der angegebene Schlüssel(e) in der angegebenen Karte existiert:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

exists := maps. as(mp, "name", "language")
// true

exists = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

Die `maps.HasAny()` Funktion bestimmt, ob einer der angegebenen Schlüssel(e) in der angegebenen Karte existiert:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

exists := maps. asAny(mp, "name", "age")
// true

exists = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

Die Funktion `maps.Only()` holt nur die angegebenen Schlüssel(e) aus der angegebenen Karte:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// Map[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// Map[string]any{"name": "Goravel"}
```

### `maps.Pull()`

Die Funktion `maps.Pull()` holt und entfernt die angegebene Taste aus der übergebenen Karte:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := karten. ull(mp, "name")
// name = "Goravel"
// mp = Map[string]any{"language": "Go"}
```

Ein Standardwert kann als drittes Argument der Funktion `maps.Pull()` angegeben werden. Dieser Wert wird zurückgegeben, wenn der
Schlüssel nicht in der Karte existiert:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := karten. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

Die Funktion `maps.Set()` legt den angegebenen Schlüssel und den Wert in der angegebenen Karte fest:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// Map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

Die Funktion `maps.Where()` filtert die angegebene Karte mit dem angegebenen Callback:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. hierher(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Konvertieren

### `convert.Tap()`

Die `convert.Tap()` Funktion übergibt den angegebenen Wert an den angegebenen Callback und gibt den Wert zurück:

```go
import "github.com/goravel/framework/support/convert"

Wert := convert.Tap("Goravel", func(value string) {
    fmt. rintln(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := konvertieren. ap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// Map[string]string{"name": "Goravel", "language": "Go"}
```

### `convert.Transform()`

Die `convert.Transform()` transformiert den angegebenen Wert mit dem angegebenen Callback und gibt das Ergebnis zurück:

```go
import "github.com/goravel/framework/support/convert"

value := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s string) *foo {
      return &foo{Name: s}
})
// &foo{Name: "foo"}
```

### `convert.with()`

Die `convert.with()` führt den angegebenen Callback mit dem angegebenen Wert aus und gibt das Ergebnis des Callbacks zurück:

```go
import "github.com/goravel/framework/support/convert"

Wert := convert.With("Goravel", func(value string) string {
    return value value + " Framework"
})
// Goravel Framework
```

### `convert.Standard()`

Die Methode `convert.Default()` gibt den ersten Wert zurück, der nicht null ist. Wenn alle Werte Null sind, wird Null zurückgegeben.

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

Die Methode `convert.Pointer()` gibt den Zeiger auf den angegebenen Wert zurück.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Sammeln

### `collect.Count()`

Die `collect.Count()` Funktion gibt die Anzahl der Elemente in der angegebenen Sammlung zurück:

```go
import "github.com/goravel/framework/support/collecct"

sammeln.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

Die Funktion `collect.CountBy()` zählt die Vorkommnisse, für die das Prädikat wahr ist:

```go
import "github.com/goravel/framework/support/collecct"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

Die Funktion `collect.Each()` iteriert über die Elemente in der angegebenen Sammlung und übergibt jedes Element an den angegebenen
Callback:

```go
import "github.com/goravel/framework/support/collecct"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, wert)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

Die Funktion `collect.Filter()` filtert die Elemente in der Sammlung mit dem angegebenen Callback:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

Die `collect.GroupBy()` Funktion gruppiert die Elemente in der Sammlung nach dem Ergebnis des angegebenen Callbacks:

```go
import "github.com/goravel/framework/support/collecct"

// Beispiel von komplexem Kartenschnitt (verwenden Sie ein anderes Beispiel)
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

Die `collect.Keys()` Funktion gibt alle Schlüssel für die Items in der Sammlung zurück:

```go
import "github.com/goravel/framework/support/collecct"

Tasten := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

Die Funktion `collect.Map()` wandelt einen Sammlungstyp in eine andere mit Hilfe des angegebenen Iteratees:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `Collect.Max()`

Die `collect.Max()` Funktion gibt den maximalen Wert der angegebenen Sammlung zurück:

```go
import "github.com/goravel/framework/support/collecct"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

Die Funktion `collect.Merge()` fügt die angegebenen Karten zu einer einzigen Karte zusammen:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, mappe[string]string{"name": "Framework"})
// Map[string]string{"name": "Framework"}
```

### `collect.Min()`

Die `collect.Min()` Funktion gibt den Mindestwert der angegebenen Sammlung zurück:

```go
import "github.com/goravel/framework/support/collecct"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

Die `collect.Reverse()` Funktion umgekehrt die Elemente in der Sammlung:

```go
import "github.com/goravel/framework/support/collecct"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

Die `collect.Shuffle()` Funktion mischt die Gegenstände in der Sammlung:

```go
import "github.com/goravel/framework/support/collecct"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(Beispiel)
```

### `collect.Split()`

Die Funktion `collect.Split()` teilt eine Sammlung in die Gruppen der angegebenen Länge auf. Wenn die Sammlung nicht gleichmäßig in
geteilt werden kann, wird der letzte Chunk die restlichen Items enthalten:

```go
import "github.com/goravel/framework/support/collecct"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]in{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

Die `collect.Sum()` Funktion gibt die Summe aller Items in der Sammlung zurück:

```go

Import "github.com/goravel/framework/support/collecct"

summe := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

Die Methode `collect.Unique()` gibt die doppelte Sammlung zurück, wobei im Falle von doppelten Werten nur das erste
Vorkommen beibehalten wird:

```go
import "github.com/goravel/framework/support/collecct"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

Die `collect.Values()` Funktion gibt alle Werte der angegebenen Sammlung zurück:

```go
import "github.com/goravel/framework/support/collecct"

Werte := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
