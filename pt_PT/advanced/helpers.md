# Helpers

## Métodos disponíveis

### Caminhos

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Horário

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

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Converter

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Pegar

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [coletar.Filtro()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Caminhos

### `path.App()`

A função `path.App()` retorna o caminho para o diretório do aplicativo da sua aplicação. Você também pode usar a função `path.App()`
para gerar um caminho para um arquivo relativo ao diretório da aplicação:

```go
import "github.com/goravel/framework/support/path"

caminho := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

A função `path.Base()` retorna o caminho para o diretório raiz do seu aplicativo. Você também pode usar a função `path.Base()`
para gerar um caminho para um determinado arquivo relativo ao diretório raiz do projeto:

```go
caminho := path.Base()
caminho := path.Base("vendor/bin")
```

### `path.Config()`

A função `path.Config()` retorna o caminho para o diretório de configuração do seu aplicativo. Você também pode usar a função
`path.Config()` para gerar um caminho para um determinado arquivo dentro do diretório de configuração da aplicação:

```go
caminho := path.Config()
caminho := path.Config("app.go")
```

### `path.Database()`

A função `path.Database()` retorna o caminho para o diretório de banco de dados do seu aplicativo. Você também pode usar a função
`path.Database()` para gerar um caminho para um determinado arquivo dentro do diretório `database`:

```go
caminho := path.Database()
caminho := path.Database("factories/user_factory.go")
```

### `path.Storage()`

A função `path.Storage()` retorna o caminho para o diretório de armazenamento do seu aplicativo. Você também pode usar a função
`path.Storage()` para gerar um caminho para um determinado arquivo dentro do diretório `storage`:

```go
caminho := path.Storage()
caminho := path.Storage("app/file.txt")
```

### `path.Public()`

A função `path.Public()` retorna o caminho para o diretório público do seu aplicativo. Você também pode usar a função
`path.Public()` para gerar um caminho para um determinado arquivo dentro do diretório `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

A função `path.Lang()` retorna o caminho para o diretório `lang`. Você também pode usar a função `path.Lang()` para
gerar um caminho para um determinado arquivo dentro do diretório `lang`:

```go
caminho := path.Lang()
caminho := path.Lang("en.json")
```

## Horário

O módulo `carbon` de Goravel é uma expansão por [golang-module/carbon](https://github.com/golang-module/carbon), o recurso
principal é a realização do rastreamento de tempo parcial, por favor, consulte a documentação oficial para obter detalhes.

### `carbon.Now()`

Tempo atual:

```go
import "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

Definir fuso horário：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

Obtenha o objeto `Carbon` através da String:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Obtenha o objeto `Carbon` pelo timestamp:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Obtenha o objeto `Carbon` por data e hora:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Obtenha o objeto `Carbon` por data:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Obtenha o objeto `Carbon` a tempo:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Obtenha o objeto `Carbon` por `time.Time`:

```go
carbon.FromStdTime(tempo.Now())
```

### `carbon.IsTestNow()`

Determinar se o tempo é um valor de teste:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

Definir o tempo para o valor de teste:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Restaurar a hora para um valor normal:

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` pode imprimir qualquer variável:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` pode imprimir qualquer variável para `io.Writer`:

```go
import "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` pode imprimir qualquer variável para `string`:

```go
import "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Mapas

### `maps.Add()`

A função `maps.Add()` adiciona um novo par de chave-valor ao mapa dado se a chave já não existir no mapa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
mapas. dd(mp, "idade", 22)
// mapa[string]qual{"name": "Krishan", "idade": 22}

mp2 := map[string]string{}
mapas. dd(mp2, "nome", "Arco")
maps.Add(mp2, "nome", "Krishan")
// mapa[string]string{"nome": "Bowen"}
```

### `maps.Exists()`

A função `maps.Exists()` determina se a chave dada existe no mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

existe := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

A função `maps.Forget()` remove a(s) chave(s) informada(s) do mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

A função `maps.Get()` recupera o valor da chave dada do mapa fornecido. Se a chave não existir, o valor
padrão será retornado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

valor := maps. et(mp, "name", "Krishan")
// valor Bowen

= maps.Get(mp, "idade", 22)
// 22
```

### `maps.Has()`

A função `maps.Has()` determina se a(s) chave(s) informada(s) existe no mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. as(mp, "name", "language")
// true

exists = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

A função `maps.HasAny()` determina se alguma das chaves fornecidas existe no mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. asAny(mp, "name", "age")
// true

exists = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

A função `maps.Only()` recupera somente a(s) chave(s) informada(s) do mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// mapa[string]qual{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// mapa[string]qual{"name": "Goravel"}
```

### `maps.Pull()`

A função `maps.Pull()` recupera e remove a chave dada do mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "name")
// nome = "Goravel"
// mp = map[string]any{"language": "Go"}
```

Um valor padrão pode ser fornecido como o terceiro argumento para a função `maps.Pull()`. Este valor será retornado se a chave
não existir no mapa:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "idade", "default")
// nome = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

A função `maps.Set()` define a chave e o valor dado no mapa fornecido:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// mapa[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

A função `maps.Where()` filtra o mapa fornecido usando o callback informado:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. here(mp, func(key string, value string) bool {
    return key == "name"
})
// mapa[string]string{"name": "Goravel"}
```

## Converter

### `converte.Tap()`

A função `convert.Tap()` passa o valor dado para o callback fornecido e retorna o valor:

```go
import "github.com/goravel/framework/support/convert"

value := convert.Tap("Goravel", function (value string) {
    fmt. rintln(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := convert. ap(mp, func(valor mapa[string]string) {
    mp["language"] = "Go"
})
// mapa[string]string{"name": "Goravel", "language": "Go"}
```

### `converter.Transform()`

O `convert.Transform()` transforma o valor dado usando o callback fornecido e retorna o resultado:

```go
import "github.com/goravel/framework/support/convert"

value := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s string) *foo {
      return &foo{Name: s}
})
// &foo{Name: "foo"}
```

### `converter.With()`

O `convert.With()` executa o callback fornecido com o valor fornecido e retorna o resultado da callback:

```go
import "github.com/goravel/framework/support/convert"

value := convert.With("Goravel", function (value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `converter.Default()`

O método `convert.Default()` retornou primeiro valor diferente de zero. Se todos os valores forem zero, ele retorna valor zero.

```go
import "github.com/goravel/framework/support/convert"

value := convert.Default("", "foo")
// valor foo

= converter. efault("bar", "foo")
// bar

valor = convert.Default(0, 1)
// 1
```

### `convertet.Pointer()`

O método `convert.Pointer()` retorna o ponteiro do valor dado.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Pegar

### `collect.Count()`

A função `collect.Count()` retorna o número de itens da coleção fornecida:

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

A função `collect.CountBy()` conta as ocorrências para as quais o predicado é verdadeiro:

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `coletar.Each()`

A função `collect.Each()` itera sobre os itens da coleção dada e passa cada item para o
dado callback:

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `coletar.Filtro()`

A função `collect.Filter()` filtra os itens na coleção usando o callback informado:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

A função `collect.GroupBy()` agrupa os itens na coleção pelo resultado da chamada dada:

```go
import "github.com/goravel/framework/support/collect"

// use exemplo de fatia complexa de mapa (use exemplo diferente)
newCollection := collect. roupBy([]mapa[string]string{
    {"class": "1", "Nome": "Rohan"},
    {"class": "2", "Name": "Bowen"},
    {"class": "2", "Nome": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// mapa[string][]map[string]string{
// "1": []mapa[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []mapa[string]string{{"class": "2", "Nome": "Bowen"}, {"class": "2", "Nome": "Krishan"}},
// }
```

### `coletar.Chaves()`

A função `collect.Keys()` retorna todas as chaves para os itens da coleção:

```go
import "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

A função `collect.Map()` converte um tipo de coleção em outro usando a iteração informada:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `coletar.Max()`

A função `collect.Max()` retorna o valor máximo da determinada coleção:

```go
import "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `coletar.Mesge()`

A função `collect.Merge()` mescla os mapas dados em um único mapa:

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// mapa[string]string{"name": "Framework"}
```

### `coletar.Min()`

A função `collect.Min()` retorna o valor mínimo da determinada coleção:

```go
import "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

A função `collect.Reverse()` inverte os itens na coleção:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

A função `collect.Shuffle()` encolhe os itens na coleção:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(exemplo)
```

### `collect.Split()`

A função `collect.Split()` divide uma coleção em grupos de tamanho dado. Se a coleção não pode ser dividida
igualmente, o último pedaço conterá os itens restantes:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `coletar.Sum()`

A função `collect.Sum()` retorna a soma de todos os itens da coleção:

```go

import "github.com/goravel/framework/support/collect"

sum := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `coletar.Unique()`

O método `collect.Unique()` retorna a coleção não duplicada onde no caso de valores duplicados, apenas o primeiro
ocorrência será mantido:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

A função `collect.Values()` retorna todos os valores da coleção fornecida:

```go
import "github.com/goravel/framework/support/collect"

values := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
