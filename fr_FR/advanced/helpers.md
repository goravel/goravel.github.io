# Helpers

## Méthodes disponibles

### Chemins

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### Date et heure

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

### Cartes

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### Convertir

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### Collecter

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## Chemins

### `path.App()`

La fonction `path.App()` retourne le chemin vers le répertoire d'application de votre application. Vous pouvez également utiliser la fonction `path.App()`
pour générer un chemin vers un fichier relatif au répertoire de l'application :

```go
importez "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

La fonction `path.Base()` retourne le chemin vers le répertoire racine de votre application. Vous pouvez également utiliser la fonction `path.Base()`
pour générer un chemin vers un fichier donné relatif au répertoire racine du projet:

```go
chemin := path.Base()
chemin := path.Base("vendor/bin")
```

### `path.Config()`

La fonction `path.Config()` retourne le chemin vers le répertoire de configuration de votre application. Vous pouvez également utiliser la fonction
`path.Config()` pour générer un chemin vers un fichier donné dans le répertoire de configuration de l'application :

```go
chemin := path.Config()
chemin := path.Config("app.go")
```

### `path.Database()`

La fonction `path.Database()` retourne le chemin vers le répertoire de base de données de votre application. Vous pouvez également utiliser la fonction
`path.Database()` pour générer un chemin vers un fichier donné dans le répertoire `database` :

```go
chemin := path.Database()
path := path.Database("factories/user_factory.go")
```

### `path.Storage()`

La fonction `path.Storage()` retourne le chemin vers le répertoire de stockage de votre application. Vous pouvez également utiliser la fonction
`path.Storage()` pour générer un chemin vers un fichier donné dans le répertoire `storage`:

```go
chemin := path.Storage()
chemin := path.Storage("app/file.txt")
```

### `path.Public()`

La fonction `path.Public()` retourne le chemin vers le répertoire public de votre application. Vous pouvez également utiliser la fonction
`path.Public()` pour générer un chemin vers un fichier donné dans le répertoire `public` :

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

La fonction `path.Lang()` retourne le chemin vers le dossier `lang`. Vous pouvez également utiliser la fonction `path.Lang()` pour
générer un chemin vers un fichier donné dans le répertoire `lang` :

```go
chemin := path.Lang()
chemin := path.Lang("en.json")
```

## Date et heure

Le module `carbon` de Goravel est une extension par [golang-module/carbone](https://github.com/golang-module/carbon), la fonctionnalité
principale est la réalisation du backtracking de temps, veuillez vous référer à la documentation officielle pour plus de détails.

### `carbon.Now()`

Obtenir l'heure actuelle:

```go
importez "github.com/goravel/framework/support/carbone"

carbon.Now()
```

### `carbon.SetTimezone()`

Définir le fuseau horaire：

```go
Fixer le fuseau horaire (carbon.UTC)
```

### `carbon.Parse()`

Récupère l'objet `Carbon` en chaîne de caractères:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

Récupère l'objet `Carbon` par timestamp :

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

Obtenir `Carbon` Object par date :

```go
carbon.FromDateTime(2020, 1, 0, 0, 0)
```

### `carbon.FromDate()`

Récupérez l'objet `Carbon` par date:

```go
carbone.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

Obtenez un objet `Carbon` par temps:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

Obtenez `Carbon` Object by `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

Détermine si l'heure est une valeur de test :

```go
carbone.IsTestNow()
```

### `carbon.SetTestNow()`

Définir l'heure à une valeur de test :

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

Restaurer le temps à une valeur normale :

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` peut afficher n'importe quelle variable:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` peut afficher n'importe quelle variable dans `io.Writer`:

```go
importer "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` peut afficher n'importe quelle variable dans `string`:

```go
importer "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## Cartes

### `maps.Add()`

La fonction `maps.Add()` ajoute une nouvelle paire clé-valeur à la carte donnée si la clé n'existe pas déjà dans la carte:

```go
importez "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
maps. dd(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
maps. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// map[string]string{"name": "Bowen"}
```

### `maps.Exists()`

La fonction `maps.Exists()` détermine si la clé donnée existe dans la carte fournie :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

existe := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

La fonction `maps.Forget()` supprime le(s) clé(s) donnée(s) de la carte fournie:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

La fonction `maps.Get()` récupère la valeur de la clé donnée à partir de la carte fournie. Si la clé n'existe pas, la valeur par défaut
sera retournée :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

valeur := maps. et(mp, "name", "Krishan")
// Valeur Bowen

= maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

La fonction `maps.Has()` détermine si le(s) clé(s) spécifiée(s) existe dans la carte fournie:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. as(mp, "name", "language")
// true

existe = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

La fonction `maps.HasAny()` détermine si l'une des clé(s) spécifiée existe dans la carte fournie :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

existe := maps. asAny(mp, "name", "age")
// true

existe = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

La fonction `maps.Only()` ne récupère que le(s) clé(s) donnée(s) de la carte fournie:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// carte[string]any{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// carte[string]any{"name": "Goravel"}
```

### `maps.Pull()`

La fonction `maps.Pull()` récupère et supprime la clé donnée de la carte fournie :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "name")
// name = "Goravel"
// mp = map[string]any{"language": "Go"}
```

Une valeur par défaut peut être fournie comme troisième argument de la fonction `maps.Pull()`. Cette valeur sera retournée si la clé
n'existe pas dans la carte :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

La fonction `maps.Set()` définit la clé donnée et la valeur dans la carte fournie:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

La fonction `maps.Where()` filtre la carte fournie en utilisant le rappel donné :

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. here(mp, func(key string, value string) bool {
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## Convertir

### `convert.Tap()`

La fonction `convert.Tap()` passe la valeur donnée à la fonction de rappel fournie et retourne la valeur :

```go
importez "github.com/goravel/framework/support/convert"

valeur := convert.Tap("Goravel", func(value string) {
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

Le `convert.Transform()` transforme la valeur donnée en utilisant le callback fourni et retourne le résultat:

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

`convert.With()` exécute le callback donné avec la valeur fournie et retourne le résultat du callback:

```go
import "github.com/goravel/framework/support/convert"

valeur := convert.With("Goravel", func(value string) string {
    return value + " Framework"
})
// Goravel Framework
```

### `convert.Default()`

La méthode `convert.Default()` retourne la première valeur non nulle. Si toutes les valeurs sont nulles, elles retournent la valeur zéro.

```go
import "github.com/goravel/framework/support/convert"

value := convert.Default("", "foo")
// foo

valeur = convert. efault("bar", "foo")
// barre

valeur = convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

La méthode `convert.Pointer()` retourne le pointeur de la valeur donnée.

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## Collecter

### `collect.Count()`

La fonction `collect.Count()` retourne le nombre d'éléments dans la collection donnée :

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

La fonction `collect.CountBy()` compte les occurrences pour lesquelles le prédicat est vrai :

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

La fonction `collect.Each()` itère les éléments de la collection donnée et transmet chaque élément au rappel
donné :

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

La fonction `collect.Filter()` filtre les éléments de la collection en utilisant la fonction de rappel donnée :

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

La fonction `collect.GroupBy()` regroupe les éléments de la collection par le résultat de la fonction de rappel donnée :

```go
import "github.com/goravel/framework/support/collect"

// utilise un exemple de découpe de carte complexe (utiliser un exemple différent)
newCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Nom": "Bowen"},
    {"class": "2", "Nom": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
// "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
// "2": []map[string]string{{"class": "2", "Name": "Bowen"}, {"class": "2", "Name": "Krishan"}},
// }
```

### `collect.Keys()`

La fonction `collect.Keys()` retourne toutes les clés des éléments de la collection :

```go
import "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

La fonction `collect.Map()` convertit un type de collection en un autre en utilisant l'itérat donné:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

La fonction `collect.Max()` retourne la valeur maximale de la collection donnée :

```go
import "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

La fonction `collect.Merge()` fusionne les cartes données dans une seule carte :

```go
import "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

La fonction `collect.Min()` retourne la valeur minimale de la collection donnée:

```go
import "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

La fonction `collect.Reverse()` inverse les éléments de la collection :

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

La fonction `collect.Shuffle()` mélange les éléments de la collection:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(exemple)
```

### `collect.Split()`

La fonction `collect.Split()` divise une collection en groupes de la longueur donnée. If the collection can't be split
evenly, the final chunk will contain the remaining items:

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [][]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

La fonction `collect.Sum()` retourne la somme de tous les éléments de la collection :

```go

import "github.com/goravel/framework/support/collect"

sum := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

La méthode `collect.Unique()` retourne la collection sans doublons où en cas de valeurs dupliquées, seule la première occurrence
sera conservée :

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

La fonction `collect.Values()` retourne toutes les valeurs de la collection donnée:

```go
import "github.com/goravel/framework/support/collect"

valeurs := collect.Values(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
