# Chaînes de caractères

Goravel fournit une bibliothèque de manipulation fluide de chaînes de caractères qui vous permet de manipuler facilement des chaînes. Fluent Strings
vous permet de combiner plusieurs opérations de chaînes de caractères à travers le chainage de méthodes, où la plupart des méthodes retournent une instance
de `support/str. , vous permettant d'enchaîner des méthodes supplémentaires. Pour obtenir la valeur finale de la chaîne après avoir appliqué les opérations
enchaînées, vous pouvez appeler la méthode `String`, qui retourne la valeur sous-jacente `string\`.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Méthodes disponibles

### `Of`

La méthode `Of` crée une nouvelle instance de chaîne de caractères fluide à partir d'une chaîne donnée.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `Après-`

La méthode `After` retourne la portion d'une chaîne qui apparaît après une valeur spécifiée. Si la valeur est une chaîne de caractères
vide ou n'existe pas dans la chaîne d'origine, la chaîne entière est retournée.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // " World!"
```

### `AfterLast`

La méthode `AfterLast` retourne la portion d'une chaîne qui apparaît après la dernière occurrence d'une valeur spécifiée. Si
la valeur est une chaîne vide ou n'existe pas dans la chaîne d'origine, la chaîne entière est retournée.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Ajouter`

La méthode `Ajouter` ajoute la valeur spécifiée à la fin de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Nom de base`

La méthode `Basename` retourne le composant de nom final d'un chemin, supprimant éventuellement un suffixe spécifié du nom de base
.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Avant`

La méthode `Before` retourne la portion d'une chaîne qui apparaît avant une valeur spécifiée. Si la valeur est une chaîne
vide ou n'existe pas dans la chaîne d'origine, la chaîne entière est retournée.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Bonjour"
```

### `Avant-Dernière`

La méthode `BeforeLast` retourne la portion d'une chaîne qui apparaît avant la dernière occurrence d'une valeur spécifiée. Si
la valeur est une chaîne vide ou n'existe pas dans la chaîne d'origine, la chaîne entière est retournée.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Bière`

La méthode `Between` retourne la portion d'une chaîne entre deux valeurs données.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Bonjour"
```

### `BetweenFirst`

La méthode `BetweenFirst` retourne la portion d'une chaîne entre la première occurrence de deux valeurs données.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Bonjour"
```

### `Camel`

La méthode `Camel` convertit la chaîne en `camelCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

La méthode `CharAt` retourne le caractère à l'index donné. If the index is out of bounds, an empty string will be
returned.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

La méthode `ChopEnd` supprime la(les) valeur(s) donnée(s) de la fin de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

La méthode `ChopStart` supprime la(les) valeur(s) donnée(s) du début de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Contenu`

La méthode `Contains` détermine si la chaîne donnée contient la valeur donnée. La méthode est sensible à la casse. Si plusieurs valeurs
sont fournies, elles retourneront `true` si la chaîne contient l'une des valeurs.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `ContainsAll`

La méthode `ContainsAll` détermine si la chaîne donnée contient toutes les valeurs données. La méthode est sensible à la casse.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Bonjour", "Gor") // false
```

### `Dirname`

La méthode `Dirname` retourne la partie parente d'un chemin.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

En option, vous pouvez fournir le niveau de répertoire à couper du chemin.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

La méthode `EndsWith` détermine si la chaîne donnée se termine par la valeur donnée. La méthode est sensible à la casse.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Vous pouvez passer plusieurs valeurs à la méthode pour déterminer si la chaîne se termine par une des valeurs.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exactement`

La méthode `Exactly` détermine si la chaîne donnée est exactement égale à la valeur donnée. La méthode est sensible à la casse.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Except`

La méthode `Except` extrait un extrait de la chaîne qui correspond à la première occurrence de la valeur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("C'est un beau matin").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is a beautiful morn...
```

De plus, vous pouvez utiliser l'option `Omission` pour changer la chaîne utilisée pour indiquer l'extrémité.

```go
import "github.com/goravel/framework/support/str"

str.Of("C'est un beau matin").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explode`

La méthode `Explode` divise la chaîne en un tableau de chaînes en utilisant le délimiteur donné.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Hello", "World"}
```

### `Terminer`

La méthode `Finish` garantit que la chaîne donnée se termine par la valeur donnée. Si la chaîne se termine déjà avec la valeur,
elle ne sera plus ajoutée.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Titre`

La méthode `Headline` convertit la chaîne en titre.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `Est `

La méthode `Is` détermine si la chaîne donnée correspond au motif donné. La méthode est sensible à la casse.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

La méthode `IsEmpty` détermine si la chaîne donnée est vide.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

La méthode `IsNotEmpty` détermine si la chaîne donnée n'est pas vide.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

La méthode `IsAscii` détermine si la chaîne donnée ne contient que des caractères ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> ").IsAscii() // false
```

### `IsSlice`

La méthode `IsSlice` détermine si la chaîne donnée est une slice.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

La méthode `IsMap` détermine si la chaîne donnée est une carte.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

La méthode `IsUlid` détermine si la chaîne donnée est un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z1Z6Z1Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

La méthode `IsUuid` détermine si la chaîne donnée est un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

La méthode `Kebab` convertit la chaîne en `kebab-case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

La méthode `LcFirst` convertit le premier caractère de la chaîne en minuscules.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Longueur`

La méthode `Length` retourne la longueur de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limite`

La méthode `Limit` tronque la chaîne à la longueur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("C'est un beau matin").Limit(7).String() // "Ceci est..."
```

Optionnellement, vous pouvez fournir le deuxième argument pour changer la chaîne utilisée pour indiquer la troncation.

```go
import "github.com/goravel/framework/support/str"

str.Of("C'est un beau matin").Limit(7, " (****)").String() // "Ceci est (****)"
```

### `Bas`

La méthode `Lower` convertit la chaîne en minuscule.

```go
importez "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

La méthode `LTrim` coupe le côté gauche de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Masque`

La méthode `Mask` masque la chaîne avec le caractère de masque donné.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**********"
```

Si nécessaire, vous pouvez fournir un nombre négatif pour masquer la méthode qui indique à la méthode de commencer à masquer à partir de la fin de la chaîne
.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**********"
```

### `Correspondre`

La méthode `Match` détermine si la chaîne donnée correspond à l'expression régulière donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ceci est une chaîne de (test)").Match(`\([^)]+\)`).String() // (test)
```

### `MatchAll`

La méthode `MatchAll` détermine si la chaîne donnée correspond à toutes les expressions régulières données.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

La méthode `IsMatch` détermine si la chaîne donnée correspond (ou plusieurs) à l'expression régulière donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

La méthode `NewLine` ajoute un caractère de nouvelle ligne à la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

La méthode `PadBoth` pads les deux côtés de la chaîne.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___
```

### `PadLeft`

La méthode `PadLeft` pads le côté gauche de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

La méthode `PadRight` pads le côté droit de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### `Tuyau`

La méthode `Pipe` vous permet de transformer la chaîne en utilisant une fermeture donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Précédent`

La méthode `Prepend` ajoute la valeur donnée à la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Supprimer`

La méthode `Remove` supprime la(les) valeur(s) donnée(s) de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hello "

str.Of("Hello World").Remove("World", "Hello").String() // "
```

### `Répéter`

La méthode `Repeat` répète la chaîne de caractères un nombre donné de fois.

```go
importez "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Remplacer`

La méthode `Replace` remplace la valeur donnée dans la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("World", "Krishan").String() // "Bonjour Krishan"
```

Par défaut, la méthode `Replace` est sensible à la casse. Si vous voulez que la méthode soit insensible à la casse, vous pouvez passer
`false` comme troisième argument.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("world", "Krishan", false).String() // "Hello Krishan"
```

### `RemplacerEnd`

La méthode `ReplaceEnd` remplace la dernière occurrence de la valeur donnée dans la chaîne de caractères uniquement si elle est à la fin de la chaîne
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `Remplacer d'abord`

La méthode `ReplaceFirst` remplace la première occurrence de la valeur donnée dans la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Bonjour Goravel"
```

### `Remplacer Last`

La méthode `ReplaceLast` remplace la dernière occurrence de la valeur donnée dans la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Bonjour Goravel"
```

### `Remplacer les Matches`

La méthode `ReplaceMatches` remplace l'expression régulière donnée dans la chaîne.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Bonjour, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Bonjour, Krishan!"
```

### `ReplaceStart`

La méthode `ReplaceStart` remplace la première occurrence de la valeur donnée dans la chaîne de caractères seulement si elle est au début de
la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

La méthode `RTrim` coupe le côté droit de la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Snake`

La méthode `Snake` convertit la chaîne en `snake_case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Split`

La méthode `Split` divise la chaîne en un tableau de chaînes en utilisant le délimiteur donné.

```go
importez "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

La méthode `Squish` remplace les caractères d'espacement consécutifs par un espace unique.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Démarrer`

La méthode `Start` ajoute une seule instance de la valeur donnée au début de la chaîne si elle ne commence pas déjà
avec la valeur.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `StartsWith`

La méthode `StartsWith` détermine si la chaîne donnée commence par une (une) valeur donnée. La méthode est sensible à la casse.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `Chaîne`

La méthode `String` retourne la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Étudiant`

La méthode `Studly` convertit la chaîne en `StudlyCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

La méthode `Substr` retourne la portion de la chaîne commençant à l'index donné et continuant pour la longueur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

La méthode `Swap` permet d'échanger plusieurs valeurs dans la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### `Tapoter`

La méthode `Tap` passe la chaîne à la fermeture donnée et retourne la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Test`

La méthode `Test` détermine si la chaîne donnée correspond à l'expression régulière donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bonjour, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

La méthode `Title` convertit la chaîne en `Title Case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Couper`

La méthode `Trim` coupe la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

La méthode `UcFirst` convertit le premier caractère de la chaîne en majuscule.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

La méthode `UcSplit` divise la chaîne en un tableau de chaînes en utilisant des caractères majuscules.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Moins`

La méthode `Unless` passe la chaîne à la fermeture donnée et retourne la chaîne si la condition donnée est `false`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Supérieur`

La méthode `Upper` convertit la chaîne en majuscule.

```go
importez "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `Quand`

La méthode `When` passe la chaîne à la fermeture donnée et retourne la chaîne si la condition donnée est `true`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Si nécessaire, vous pouvez fournir le troisième argument à la méthode `When` qui est une fermeture qui sera exécutée lorsque la condition
est `false`.

### `WhenContains`

La méthode `WhenContains` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée contient la valeur
donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bonjour Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bonjour Bowen Han"
```

Si nécessaire, vous pouvez fournir le troisième argument à la méthode `WhenContains` qui est une fermeture qui sera exécutée
quand la chaîne ne contient pas la valeur donnée.

### `WhenContainsAll`

La méthode `WhenContainsAll` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée contient
toutes les valeurs données.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bonjour Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bonjour Bowen Han"
```

Si nécessaire, vous pouvez fournir le troisième argument à la méthode `WhenContainsAll` qui est une fermeture qui sera
exécutée lorsque la chaîne ne contient pas toutes les valeurs données.

### `WhenEmpty`

La méthode `WhenEmpty` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée est vide.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

The `WhenIsAscii` method passes the string to the given closure and returns the string if the given string contains only
ASCII characters.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> <unk> ").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "<unk> <unk> "
```

### `WhenNotEmpty`

The `WhenNotEmpty` method passes the string to the given closure and returns the string if the given string is not
empty.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsWith`

La méthode `WhenStartsWith` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée commence
avec la valeur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenEndsWith`

La méthode `WhenEndsWith` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée se termine par
la valeur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenExactly`

La méthode `WhenExactly` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée est exactement
égale à la valeur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNotExactly`

La méthode `WhenNotExactly` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée n'est pas
exactement égale à la valeur donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `Quand`

La méthode `WhenIs` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée correspond au motif
donné.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

La méthode `WhenIsUlid` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée est un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z1Z6Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6"
```

### `WhenIsUuid`

La méthode `WhenIsUuid` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée est un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `WhenTest`

La méthode `WhenTest` passe la chaîne à la fermeture donnée et retourne la chaîne si la chaîne donnée correspond à l'expression régulière
donnée.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

La méthode `WordCount` retourne le nombre de mots dans la chaîne.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, World!").WordCount() // 2
```

### `Mots`

La méthode `Words` limite le nombre de mots dans la chaîne. Si nécessaire, vous pouvez fournir le deuxième argument pour changer
la chaîne utilisée pour indiquer la troncation.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, World!").Words(1) // "Hello..."

str.Of("Hello, World!").Words(1, " (****)") // "Bonjour (****)"
```
