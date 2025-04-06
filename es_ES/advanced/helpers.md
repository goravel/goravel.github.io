# Helpers

## Métodos disponibles

### Rutas

|                                                                           |                                                                    |                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [ruta.App()](#path-app)                | [ruta.Base()](#path-base)       | [ruta.Config()](#path-config) |
| [ruta.Base de datos()](#path-database) | [ruta.Storage()](#path-storage) | [ruta.Public()](#path-public) |

### Hora

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

### Mapas

|                                                                 |                                                                  |                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)      | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)      | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)    | [mapas.Pull()](#maps-pull)    | [maps.Set()](#maps-set)       |
| [mapas.Where()](#maps-where) |                                                                  |                                                                  |

### Convertir

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Recoger

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Rutas

### `path.App()`

La función `path.App()` devuelve la ruta al directorio de aplicaciones de tu aplicación. También puedes usar la función `path.App()`
para generar una ruta a un archivo relativa al directorio de la aplicación:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `ruta.Base()`

La función `path.Base()` devuelve la ruta al directorio raíz de tu aplicación. También puedes usar la función `path.Base()`
para generar una ruta a un archivo determinado relativa al directorio raíz del proyecto:

```go
ruta := path.Base()
ruta := path.Base("vendor/bin")
```

### `ruta.Config()`

La función `path.Config()` devuelve la ruta al directorio de configuración de la aplicación. También puedes usar la función
`path.Config()` para generar una ruta a un archivo determinado dentro del directorio de configuración de la aplicación:

```go
ruta := path.Config()
ruta := path.Config("app.go")
```

### `path.Database()`

La función `path.Database()` devuelve la ruta al directorio de base de datos de tu aplicación. También puedes usar la función
`path.Database()` para generar una ruta a un archivo determinado dentro del directorio `database`:

```go
ruta := path.Database()
ruta := path.Database("factories/user_factory.go")
```

### `path.Storage()`

La función `path.Storage()` devuelve la ruta al directorio de almacenamiento de tu aplicación. También puedes usar la función
`path.Storage()` para generar una ruta a un archivo determinado dentro del directorio `storage`:

```go
ruta := path.Storage()
ruta := path.Storage("app/file.txt")
```

### `ruta.Public()`

La función `path.Public()` devuelve la ruta al directorio público de tu aplicación. También puedes usar la función
`path.Public()` para generar una ruta a un archivo determinado dentro del directorio `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

La función `path.Lang()` devuelve la ruta al directorio `lang`. También puedes usar la función `path.Lang()` para
generar una ruta a un archivo determinado dentro del directorio `lang`:

```go
ruta := path.Lang()
ruta := path.Lang("en.json")
```

## Hora

El módulo `carbon` de Goravel es una expansión de [golang-module/carbon](https://github.com/golang-module/carbon), la característica principal
es la realización del seguimiento de tiempo, por favor consulte la documentación oficial para más detalles.

### `carbon.Now()`

Obtener hora actual:

```go
importar "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Establecer zona horaria：

```go
carbon.SetTimezone(carbono TC)
```

### `carbon.Parse()`

Obtén el objeto `Carbon` por String:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Obtiene el objeto `Carbon` por fecha y hora:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Obtén el objeto `Carbon` por fecha y hora:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0)
```

### `carbon.FromDate()`

Obtiene el objeto `Carbon` por fecha:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Obtén el objeto `Carbon` por tiempo:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Obtiene el objeto `Carbon` por `time.Time`:

```go
carbon.FromStdTime(tiempo.Now())
```

### `carbon.IsTestNow()`

Determinar si el tiempo es un valor de prueba:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Establecer el tiempo a un valor de prueba:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Restaurar el tiempo a un valor normal:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` puede imprimir cualquier variable:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` puede imprimir cualquier variable a `io.Writer`:

```go
importar "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` puede imprimir cualquier variable en `string`:

```go
importar "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Mapas

### `maps.Add()`

La función `maps.Add()` añade un nuevo par clave-valor al mapa dado si la clave no existe en el mapa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
maps. dd(mp, "age", 22)
// mapear[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
mapas. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// mapear[string]string{"name": "Bowen"}
```

### `maps.Existas()`

La función `maps.Exists()` determina si la clave dada existe en el mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

exists := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

La función `maps.Forget()` elimina la(s) clave(s) dada(s) del mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// mapea[string]string{}
```

### `maps.Get()`

La función `maps.Get()` recupera el valor de la clave dada del mapa proporcionado. Si la clave no existe, se devolverá el valor predeterminado
:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

value := maps. et(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

La función `maps.Has()` determina si las llave(s) dadas existen en el mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. as(mp, "name", "language")
// true

exists = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

La función `maps.HasAny()` determina si alguna de las tecla(s) dadas existe en el mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. asAny(mp, "name", "age")
// true

exists = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

La función `maps.Only()` solo recupera la(s) clave(s) dadas del mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps.Only(mp, "name")
// map[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// map[string]any{"name": "Goravel"}
```

### `maps.Pull()`

La función `maps.Pull()` recupera y elimina la clave dada del mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps.Pull(mp, "name")
// name = "Goravel"
// mp = map[string]any{"language": "Go"}
```

Un valor por defecto puede ser proporcionado como tercer argumento a la función `maps.Pull()`. Este valor se devolverá si la tecla
no existe en el mapa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps.Pull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

La función `maps.Set()` establece la clave y el valor dados en el mapa proporcionado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

La función `maps.Where()` filtra el mapa proporcionado usando el callback dado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps.Where(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Convertir

### `convertir.Tap()`

La función `convert.Tap()` pasa el valor dado al callback proporcionado y devuelve el valor:

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
// mapear[string]string{"name": "Goravel", "language": "Go"}
```

### `convertir.Transform()`

El `convert.Transform()` transforma el valor dado usando el callback proporcionado y devuelve el resultado:

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

El `convert.With()` ejecuta el callback dado con el valor proporcionado y devuelve el resultado del callback:

```go
import "github.com/goravel/framework/support/convert"

value := convert.With("Goravel", func(value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convertir.Predeterminado()`

El método `convert.Default()` devuelve el primer valor distinto de cero. Si todos los valores son cero, devuelve un valor cero.

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

El método `convert.Pointer()` devuelve el puntero del valor dado.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Recoger

### `collect.Count()`

La función `collect.Count()` devuelve el número de elementos en la colección dada:

```go
importar "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

La función `collect.CountBy()` cuenta las ocurrencias para las cuales el predicado es verdadero:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

La función `collect.Each()` itera sobre los elementos de la colección dada y pasa cada elemento al callback
dado:

```go
importar "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

La función `collect.Filter()` filtra los elementos de la colección usando el callback dado:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

La función `collect.GroupBy()` agrupa los elementos de la colección por el resultado del callback dado:

```go
import "github.com/goravel/framework/support/collect"

// usar ejemplo de rebanada de mapa compleja (usar un ejemplo diferente)
newCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Nombre": "Nombre"},
    {"clase": "2", "Nombre": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Nombre": "Bowen"}, {"class": "2", "Nombre": "Krishan"}},
// }
```

### `collect.Keys()`

La función `collect.Keys()` devuelve todas las claves de los elementos de la colección:

```go
import "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

La función `collect.Map()` convierte un tipo de colección en otra usando el iterate dado:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

La función `collect.Max()` devuelve el valor máximo de la colección dada:

```go
import "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

La función `collect.Merge()` combina los mapas dados en un solo mapa:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

La función `collect.Min()` devuelve el valor mínimo de la colección dada:

```go
import "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

La función `collect.Reverse()` revierte los elementos de la colección:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

La función `collect.Shuffle()` baraja los elementos de la colección:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(ejemplo)
```

### `collect.Split()`

La función `collect.Split()` divide una colección en los grupos de la longitud dada. Si la colección no puede dividirse
de manera equitativa, el fragmento final contendrá los elementos restantes:

```go
importar "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

La función `collect.Sum()` devuelve la suma de todos los elementos de la colección:

```go

importar "github.com/goravel/framework/support/collect"

suma := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

El método `collect.Unique()` devuelve la colección duplicada libre donde en caso de duplicación de valores, sólo la primera ocurrencia
estará cerrada:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Valores()`

La función `collect.Values()` devuelve todos los valores de la colección dada:

```go
import "github.com/goravel/framework/support/collect"

values := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
