# Stringhe

Goravel fornisce una fluente libreria di manipolazione delle stringhe che consente di manipolare facilmente le stringhe. Stringhe Fluent
ti permette di combinare più operazioni di stringa attraverso la catena di metodo, dove la maggior parte dei metodi restituisce un'istanza
di `support/str. tring`, permettendoti di catenare metodi aggiuntivi. Per ottenere il valore finale della stringa dopo aver applicato le operazioni incatenate
, puoi chiamare il metodo `String`, che restituisce il valore `string` sottostante.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Metodi Disponibili

### `Of`

Il metodo `Of` crea una nuova istanza stringa fluente da una determinata stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `After`

Il metodo `After` restituisce la porzione di una stringa che appare dopo un valore specificato. Se il valore è una stringa vuota
o non esiste nella stringa originale, viene restituita la stringa completa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao Mondo!").After("Hello").String() // " World!"
```

### `AfterLast`

Il metodo `AfterLast` restituisce la porzione di una stringa che appare dopo l'ultima occorrenza di un valore specificato. Se
il valore è una stringa vuota o non esiste nella stringa originale, viene restituita la stringa completa.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Append`

Il metodo `Append` aggiunge il valore specificato alla fine della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basename`

Il metodo `Basename` restituisce il componente del nome finale di un percorso, eliminando opzionalmente un suffisso specificato dal nome di base
.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Before`

Il metodo `Before` restituisce la porzione di una stringa che appare prima di un valore specificato. Se il valore è una stringa
vuota o non esiste nella stringa originale, viene restituita la stringa completa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao Mondo!").Before("World").String() // "Ciao "
```

### `BeforeLast`

Il metodo `BeforeLast` restituisce la porzione di una stringa che appare prima dell'ultima occorrenza di un valore specificato. Se
il valore è una stringa vuota o non esiste nella stringa originale, viene restituita la stringa completa.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

Il metodo `Between` restituisce la porzione di una stringa tra due valori dati.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hello"
```

### `BetweenFirst`

Il metodo `BetweenFirst` restituisce la porzione di una stringa tra la prima occorrenza di due valori dati.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hello"
```

### `Camel`

Il metodo `Camel` converte la stringa in `camelCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

Il metodo `CharAt` restituisce il carattere all'indice specificato. Se l'indice è fuori dai limiti, verrà restituita una stringa vuota
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

Il metodo `ChopEnd` rimuove il valore dato dalla fine della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

Il metodo `ChopStart` rimuove i valori specificati dall'inizio della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Contiene`

Il metodo `Contains` determina se la stringa data contiene il valore dato. Il metodo è sensibile al caso. Se vengono forniti più valori
, restituirà `true` se la stringa contiene uno qualsiasi dei valori.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Ciao World").Contiene("Gor", "Hello") // true
```

### `ContieneAll`

Il metodo `ContainsAll` determina se la stringa data contiene tutti i valori indicati. Il metodo è sensibile al caso.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirname`

Il metodo `Dirname` restituisce la parte padre di un percorso.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

Facoltativamente, è possibile fornire il livello di directory per tagliare dal percorso.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

Il metodo `EndsWith` determina se la stringa data termina con il valore dato. Il metodo è sensibile al caso.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

È possibile passare più valori al metodo per determinare se la stringa termina con uno qualsiasi dei valori.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Esattamente`

Il metodo `Exactly` determina se la stringa data è esattamente uguale al valore dato. Il metodo è sensibile al caso.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Except`

Il metodo `Except` estrae un estratto dalla stringa che corrisponde alla prima occorrenza del valore dato.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning ning").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is a beautiful morn...
```

Inoltre, puoi usare l'opzione `Omission` per cambiare la stringa usata per indicare l'estratto.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explode`

Il metodo `Explode` divide la stringa in un array di stringhe usando il delimitatore dato.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").Explode(" ") // []string{"Hello", "World"}
```

### `Finish`

Il metodo `Finish` assicura che la stringa data finisca con il valore dato. Se la stringa termina già con il valore,
non verrà aggiunto di nuovo.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Headline`

Il metodo `Headline` converte la stringa in un titolo.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Ciao Mondo"
```

### `Is`

Il metodo `Is` determina se la stringa data corrisponde al modello specificato. Il metodo è sensibile al caso.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

Il metodo `IsEmpty` determina se la stringa data è vuota.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

Il metodo `IsNotEmpty` determina se la stringa data non è vuota.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

Il metodo `IsAscii` determina se la stringa fornita contiene solo caratteri ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("한").IsAscii() // false
```

### `IsSlice`

Il metodo `IsSlice` determina se la stringa data è un ritaglio.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

Il metodo `IsMap` determina se la stringa data è una mappa.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

Il metodo `IsUlid` determina se la stringa data è un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z1Z6Z1Z1Z6Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

Il metodo `IsUuid` determina se la stringa data è un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

Il metodo `Kebab` converte la stringa in `kebab-case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

Il metodo `LcFirst` converte il primo carattere della stringa in minuscolo.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Length`

Il metodo `Length` restituisce la lunghezza della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limit`

Il metodo `Limit` tronca la stringa alla lunghezza indicata.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful mattning").Limit(7).String() // "This is..."
```

Facoltativamente, puoi fornire il secondo argomento per cambiare la stringa usata per indicare la troncatura.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning ning").Limit(7, " (****)").String() // "This is (****)"
```

### `Lower`

Il metodo `Lower` converte la stringa in minuscolo.

```go
import "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

Il metodo `LTrim` taglia il lato sinistro della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Maschera`

Il metodo `Mask` maschera la stringa con il carattere maschera specificato.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**************"
```

Se necessario, è possibile fornire numero negativo per il metodo maschera che istruisce il metodo per iniziare a mascherare dalla fine della stringa
.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**************"
```

### `Match`

Il metodo `Match` determina se la stringa data corrisponde all'espressione regolare data.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a (test) string").Match(`\([^)]+\)`).String() // (test)
```

### `MatchAll`

Il metodo `MatchAll` determina se la stringa data corrisponde a tutte le espressioni regolari date.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

Il metodo `IsMatch` determina se la stringa data corrisponde (qualsiasi) all'espressione regolare data.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

Il metodo `NewLine` aggiunge un carattere newline alla stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

Il metodo `PadBoth` pad entrambi i lati della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

Il metodo `PadLeft` riempie il lato sinistro della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

Il metodo `PadRight` pad il lato destro della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### `Pipe`

Il metodo `Pipe` ti permette di trasformare la stringa usando una data chiusura.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Prepend`

Il metodo `Prepend` precede il valore dato alla stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Remove`

Il metodo `Remove` rimuove i valori specificati dalla stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").Remove("World").String() // "Ciao "

str.Of("Ciao World").Remove("World", "Hello").String() // " "
```

### `Ripeti`

Il metodo `Repeat` ripete la stringa un certo numero di volte.

```go
import "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Sostituisci`

Il metodo `Replace` sostituisce il valore dato nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").Replace("World", "Krishan").String() // "Ciao Krishan"
```

Per impostazione predefinita, il metodo `Replace` è sensibile all'uso di maiuscolo/minuscolo. Se vuoi che il metodo sia insensibile alle maiuscole e minuscole, puoi passare il file `false`
come terzo argomento.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").Replace("world", "Krishan", false).String() // "Ciao Krishan"
```

### `ReplaceEnd`

Il metodo `ReplaceEnd` sostituisce l'ultima occorrenza del valore dato nella stringa solo se è alla fine della stringa
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `ReplaceFirst`

Il metodo `ReplaceFirst` sostituisce la prima occorrenza del valore dato nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").ReplaceFirst("World", "Goravel").String() // "Ciao Goravel"
```

### `ReplaceLast`

Il metodo `ReplaceLast` sostituisce l'ultima occorrenza del valore dato nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").ReplaceLast("World", "Goravel").String() // "Ciao Goravel"
```

### `ReplaceMatches`

Il metodo `ReplaceMatches` sostituisce la data espressione regolare corrisponde nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Ciao, Krishan!"
```

### `ReplaceStart`

Il metodo `ReplaceStart` sostituisce la prima occorrenza del valore dato nella stringa solo se è all'inizio di
la stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Ciao World").ReplaceStart("World", "Goravel").String() // "Ciao World"
```

### `RTrim`

Il metodo `RTrim` taglia il lato destro della stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Serpente`

Il metodo `Snake` converte la stringa in `snake_case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Split`

Il metodo `Split` divide la stringa in un array di stringhe usando il delimitatore dato.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

Il metodo `Squish` sostituisce i caratteri consecutivi dello spazio bianco con un singolo spazio.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao Mondo").Squish().String() // "Ciao Mondo"
```

### `Start`

Il metodo `Start` aggiunge una singola istanza del valore dato all'inizio della stringa se non già avvia
con il valore.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `StartsWith`

Il metodo `StartsWith` determina se la stringa data inizia con (qualsiasi) valori dati. Il metodo è sensibile al caso.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Ciao Mondo").StartsWith("Gor", "Hello") // true
```

### `String`

Il metodo `String` restituisce la stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Studly`

Il metodo `Studly` converte la stringa in `StudlyCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

Il metodo `Substr` restituisce la porzione della stringa partendo dall'indice specificato e continuando per la lunghezza specificata.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

Il metodo `Swap` scambia più valori nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### `Tap`

Il metodo `Tap` passa la stringa alla chiusura data e restituisce la stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Test`

Il metodo `Test` determina se la stringa data corrisponde all'espressione regolare data.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

Il metodo `Title` converte la stringa in `Title Case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Trim`

Il metodo `Trim` taglia la stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

Il metodo `UcFirst` converte il primo carattere della stringa in maiuscolo.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

Il metodo `UcSplit` divide la stringa in un array di stringhe usando caratteri maiuscoli.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Unless`

Il metodo `Unless` passa la stringa alla chiusura data e restituisce la stringa se la condizione data è `false`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Upper`

Il metodo `Upper` converte la stringa in maiuscolo.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `Quando`

Il metodo `When` passa la stringa alla chiusura specificata e restituisce la stringa se la condizione data è `true`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Se necessario, puoi fornire il terzo argomento al metodo `When` che è una chiusura che verrà eseguita quando la condizione
è `false`.

### `WhenContains`

Il metodo `WhenContains` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data contiene il valore
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Se necessario, puoi fornire il terzo argomento al metodo `WhenContains` che è una chiusura che verrà eseguita
quando la stringa non contiene il valore specificato.

### `WhenContainsAll`

Il metodo `WhenContainsAll` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa fornita contiene
tutti i valori indicati.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Ciao Bowen Han"
```

Se necessario, puoi fornire il terzo argomento al metodo `WhenContainsAll` che è una chiusura che sarà eseguita
quando la stringa non contiene tutti i valori indicati.

### `WhenEmpty`

Il metodo `WhenEmpty` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data è vuota.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

Il metodo `WhenIsAscii` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa fornita contiene solo caratteri ASCII
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("한").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "◆ "
```

### `WhenNotEmpty`

Il metodo `WhenNotEmpty` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data non è
vuota.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsWith`

Il metodo `WhenStartsWith` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data inizia
con il valore specificato.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenEndsWith`

Il metodo `WhenEndsWith` passa la stringa alla chiusura data e restituisce la stringa se la stringa data termina con
il valore specificato.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenExactly`

Il metodo `WhenExactly` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data è esattamente
uguale al valore dato.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNotExactly`

Il metodo `WhenNotExactly` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data non è
esattamente uguale al valore dato.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `WhenIs`

Il metodo `WhenIs` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa specificata corrisponde al modello
.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

Il metodo `WhenIsUlid` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data è un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z1Z6Z1Z6Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z66"
```

### `WhenIsUuid`

Il metodo `WhenIsUuid` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data è un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `WhenTest`

Il metodo `WhenTest` passa la stringa alla chiusura specificata e restituisce la stringa se la stringa data corrisponde alla
data espressione regolare.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

Il metodo `WordCount` restituisce il numero di parole nella stringa.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao, World!").WordCount() // 2
```

### `Words`

Il metodo `Words` limita il numero di parole nella stringa. Se necessario, puoi fornire il secondo argomento per cambiare
la stringa che viene usata per indicare la troncatura.

```go
import "github.com/goravel/framework/support/str"

str.Of("Ciao, Mondo!").Words(1) // "Hello..."

str.Of("Ciao, Mondo!").Words(1, " (****)") // "Ciao (****)"
```
