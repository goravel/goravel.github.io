# Helpers

## Tillgängliga metoder

### Sökvägar

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [sökväg.Base()](#path-base)     | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Tid

|                                                                                 |                                                                                  |                                                                           |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [kol.Now()](#carbon-now)                     | [kol.SetTidszon()](#carbon-settimezone)       | [carbon.Parse()](#carbon-parse)        |
| [kol.FromTimestamp()](#carbon-fromtimestamp) | [kol.FrånDateTime()](#carbon-fromdatetime)    | [kol.FromDate()](#carbon-fromdate)     |
| [carbon.FromTime()](#carbon-fromtime)        | [kol.FrånStdTime()](#carbon-fromstdtime)      | [kol.IsTestNow()](#istestnow-fromdate) |
| [carbon.SetTestNow()](#carbon-settestnow)    | [carbon.UnsetTestNow()](#carbon-unsettestnow) |                                                                           |

### Debug

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [debug.Dump()](#debug-dump) | [debug.SDump()](#debug-sdump) | [debug.FDump()](#debug-fdump) |

### Kartor

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Konvertera

|                                                                          |                                                                             |                                                                              |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)          | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [konvertera.Pointer()](#convert-pointer) |                                                                              |

### Samla

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Sökvägar

### `path.App()`

Funktionen `path.App()` returnerar sökvägen till appens appkatalog. Du kan också använda funktionen `path.App()`
för att generera en sökväg till en fil i förhållande till programkatalogen:

```go
importera "github.com/goravel/frameing/support/path"

sökväg := path.App()
sökväg := path.App("http/controllers/controller.go")
```

### `path.Base()`

Funktionen `path.Base()` returnerar sökvägen till din applikations rotkatalog. Du kan också använda funktionen `path.Base()`
för att generera en sökväg till en given fil i förhållande till projektets rotkatalog:

```go
sökväg := sökväg.Base()
sökväg := sökväg.Base("leverantör/bin")
```

### `path.Config()`

Funktionen `path.Config()` returnerar sökvägen till din applikations konfigurationskatalog. Du kan också använda funktionen
`path.Config()` för att generera en sökväg till en given fil i programmets konfigurationskatalog:

```go
sökväg := sökväg.Config()
sökväg := sökväg.Config("app.go")
```

### `path.Database()`

Funktionen `path.Database()` returnerar sökvägen till din applikations databaskatalog. Du kan också använda funktionen
`path.Database()` för att generera en sökväg till en given fil i katalogen `database` :

```go
sökväg := sökväg.Database()
sökväg := sökväg.Database("factories/user_factory.go")
```

### `path.Storage()`

Funktionen `path.Storage()` returnerar sökvägen till din applikations lagringskatalog. Du kan också använda funktionen
`path.Storage()` för att generera en sökväg till en given fil i katalogen `storage` :

```go
sökväg := sökväg.Storage()
sökväg := sökväg.Storage("app/file.txt")
```

### `path.Public()`

Funktionen `path.Public()` returnerar sökvägen till din applikations offentliga katalog. Du kan också använda funktionen
`path.Public()` för att generera en sökväg till en given fil i katalogen `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

Funktionen `path.Lang()` returnerar sökvägen till katalogen `lang`. Du kan också använda funktionen `path.Lang()` till
generera en sökväg till en given fil i katalogen `lang`:

```go
sökväg := path.Lang()
sökväg := path.Lang("en.json")
```

## Tid

Modulen `carbon` i Goravel är en expansion av [golang-module/carbon](https://github.com/golang-module/carbon), den viktigaste funktionen
är förverkligandet av tid backracking, vänligen se den officiella dokumentationen för detaljer.

### `carbon.Now()`

Få aktuell tid:

```go
importera "github.com/goravel/frameing/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Ange tidszon：

```go
SetTidszon (carbon.UTC)
```

### `carbon.Parse()`

Hämta `Carbon`-objekt genom sträng:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Skaffa `Carbon`-objekt med tidsstämpel:

```go
kol.FrånTidsstämpel (1577836800)
```

### `carbon.FromDateTime()`

Hämta `Carbon`-objekt efter datumtid:

```go
karbon.FrånDatum(2020, 1, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Hämta `Carbon`-objekt per datum:

```go
karbon.FrånDatum(2020, 1, 1)
```

### `carbon.FromTime()`

Hämta `Carbon`-objekt i tid:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Hämta `Carbon`-objekt med `time.Time`:

```go
carbon.FrånStdTime(tid.Now())
```

### `carbon.IsTestNow()`

Bestäm om tiden är ett testvärde:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Ange tid till ett testvärde:

```go
SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Återställ tiden till ett normalt värde:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` kan skriva ut valfri variabel:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` kan skriva ut vilken variabel som helst till `io.Writer`:

```go
import "github.com/goravel/frameing/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` kan skriva ut vilken variabel som helst till `string`:

```go
import "github.com/goravel/frameing/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Kartor

### `maps.Add()`

Funktionen `maps.Add()` lägger till ett nytt nyckelvärde-par till den angivna kartan om nyckeln inte redan finns i kartan:

```go
importera "github.com/goravel/frameing/support/maps"

mp := karta[string]any{"name": "Krishan"}
maps. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
maps. dd(mp2, "namn", "Bowen")
maps.Add(mp2, "namn", "Krishan")
// karta[string]string{"namn": "Bowen"}
```

### `maps.Exists()`

Funktionen `maps.Exists()` avgör om den angivna nyckeln finns i den angivna kartan:

```go
import "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Krishan", "age": 22}

finns := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

Funktionen `maps.Forget()` tar bort de angivna nycklarna från den angivna kartan:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

Funktionen `maps.Get()` hämtar värdet på den angivna nyckeln från den angivna kartan. Om nyckeln inte finns kommer standardvärdet
att returneras:

```go
importera "github.com/goravel/frameing/support/maps"

mp := karta[string]any{"name": "Bowen"}

värde := maps. et(mp, "namn", "Krishan")
// Bowen

värde = maps.Get(mp, "ålder", 22)
// 22
```

### `maps.Has()`

Funktionen `maps.Has()` avgör om de angivna nycklarna finns i den angivna kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Goravel", "language": "Go"}

finns := maps. as(mp, "namn", "språk")
// true

finns = kartor.Has(mp, "namn", "ålder")
// false
```

### `maps.HasAny()`

Funktionen `maps.HasAny()` avgör om någon av de angivna nycklarna finns i den angivna kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Goravel", "language": "Go"}

finns := maps. asAny(mp, "name", "age")
// true

finns = kartor.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

Funktionen `maps.Only()` hämtar endast de angivna nycklarna från den angivna kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// map[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// map[string]any{"name": "Goravel"}
```

### `maps.Pull()`

Funktionen `maps.Pull()` hämtar och tar bort den angivna nyckeln från den angivna kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Goravel", "language": "Go"}

namn := maps. ull(mp, "namn")
// namn = "Goravel"
// mp = karta[string]any{"language": "Go"}
```

Ett standardvärde kan anges som det tredje argumentet till `maps.Pull()` -funktionen. Detta värde kommer att returneras om
-nyckeln inte finns i kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := karta[string]any{"name": "Goravel", "language": "Go"}

namn := maps. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

Funktionen `maps.Set()` sätter den angivna nyckeln och värdet i den angivna kartan:

```go
importera "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

Funktionen `maps.Where()` filtrerar den angivna kartan med hjälp av angiven callback:

```go
importera "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. här(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Konvertera

### `convert.Tap()`

Funktionen `convert.Tap()` skickar det angivna värdet till den angivna callback och returnerar värdet:

```go
import "github.com/goravel/framey/support/convert"

värde := convert.Tap("Goravel", func(value string) {
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

`convert.Transform()` omvandlar det angivna värdet med den angivna callback och returnerar resultatet:

```go
import "github.com/goravel/framey/support/convert"

värde := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s sträng) *foo {
      return &foo{Name: s}
})
// &foo{Name: "foo"}
```

### `convert.With()`

`convert.With()` exekverar den angivna callback med det angivna värdet och returnerar resultatet av callback:

```go
importera "github.com/goravel/frameing/support/convert"

värde := convert.With("Goravel", func(value string) string {
    returnera värde + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

`convert.Default()` metoden returnerar först icke-nollvärde. Om alla värden är noll, returnerar den nollvärde.

```go
import "github.com/goravel/framey/support/convert"

värde := convert.Default("", "foo")
// foo

värde = convert. efault("bar", "foo")
// bar

värde = konvertera.Standard(0, 1)
// 1
```

### `convert.Pointer()`

Metoden `convert.Pointer()` returnerar pekaren för det angivna värdet.

```go
import "github.com/goravel/framey/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Samla

### `collect.Count()`

Funktionen `collect.Count()` returnerar antalet objekt i den angivna samlingen:

```go
importera "github.com/goravel/frameing/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

Funktionen `collect.CountBy()` räknar förekomster för vilka predikatet är sant:

```go
importera "github.com/goravel/frameing/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    returnera strängar.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

Funktionen `collect.Each()` itererar över objekten i den angivna samlingen och skickar varje objekt till den angivna
callback:

```go
importera "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

Funktionen `collect.Filter()` filtrerar objekten i samlingen med hjälp av anropet:

```go
importera "github.com/goravel/frameing/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    returnera strängar.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

Funktionen `collect.GroupBy()` grupper objekten i samlingen med resultatet av den angivna callback:

```go
importera "github.com/goravel/frameing/support/collect"

// använd exempel på komplex kartskiva (använd ett annat exempel)
newCollection := collect. roupBy([]karta[string]string{
    {"class": "1", "Namn": "Rohan"},
    {"class": "2", "Namn": "Bowen"},
    {"class": "2", "Namn": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Namn": "Bowen"}, {"class": "2", "Namn": "Krishan"}},
// }
```

### `collect.Keys()`

Funktionen `collect.Keys()` returnerar alla nycklar för objekten i samlingen:

```go
importera "github.com/goravel/framework/support/collect"

nycklar := collect.Keys(karta[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

Funktionen `collect.Map()` omvandlar en typ av samling till en annan med hjälp av den angivna iterateen:

```go
importera "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    returnera strängar.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

Funktionen `collect.Max()` returnerar det maximala värdet för den angivna samlingen:

```go
importera "github.com/goravel/frameing/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

Funktionen `collect.Merge()` sammanfogar de angivna kartorna till en enda karta:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(karta[string]string{"name": "Goravel"}, karta[string]string{"language": "Go"})
// karta[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(karta[string]string{"name": "Goravel"}, karta[string]string{"name": "Framework"})
// karta[string]string{"name": "Framework"}
```

### `collect.Min()`

Funktionen `collect.Min()` returnerar minimivärdet för den angivna samlingen:

```go
importera "github.com/goravel/frameing/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

Funktionen `collect.Reverse()` reverserar objekten i samlingen:

```go
importera "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

Funktionen `collect.Shuffle()` blandar objekten i samlingen:

```go
importera "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(exempel)
```

### `collect.Split()`

Funktionen `collect.Split()` delar upp en samling i grupper av den angivna längden. Om samlingen inte kan delas
jämnt, kommer den sista biten att innehålla de återstående objekten:

```go
importera "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// []int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

Funktionen `collect.Sum()` returnerar summan av alla objekt i samlingen:

```go

importera "github.com/goravel/framework/support/collect"

summa := collect.([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

`collect.Unique()` -metoden returnerar den dubblettfria samlingen där endast den första
förekomsten kommer att behållas:

```go
importera "github.com/goravel/frameing/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

Funktionen `collect.Values()` returnerar alla värden för den angivna samlingen:

```go
importera "github.com/goravel/framework/support/collect"

värden := collect.Values(karta[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
