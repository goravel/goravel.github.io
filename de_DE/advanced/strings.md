# Zeichenketten

Goravel stellt eine fließende Bibliothek zur Manipulation von Strings zur Verfügung, die Ihnen die einfache Manipulation von Strings ermöglicht. Fluent Strings
erlaubt es Ihnen, mehrere String-Operationen durch Methodenketten zu kombinieren, wobei die meisten der Methoden eine Instanz
von `support/str. tring`, so dass Sie zusätzliche Methoden verketten. Um den endgültigen String-Wert nach Anwendung der verketteten
-Operationen zu erhalten, kannst du die `String`-Methode aufrufen, die den zugrunde liegenden `string` zurückgibt.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Verfügbare Methoden

### `Of`

Die `Of` Methode erzeugt eine neue fließende String-Instanz aus einem angegebenen String.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `Nachher`

Die `After` Methode gibt den Teil eines Strings zurück, der nach einem angegebenen Wert erscheint. Wenn der Wert ein leerer String
ist oder nicht innerhalb des ursprünglichen Strings existiert, wird der gesamte String zurückgegeben.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World!").After("Hallo").String() // " World!"
```

### `Nachletzt`

Die `AfterLast` Methode gibt den Teil eines Strings zurück, der nach dem letzten Auftreten eines angegebenen Wertes erscheint. Wenn
der Wert ein leerer String ist oder nicht innerhalb des Original-Strings existiert, wird der vollständige String zurückgegeben.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### 'Append'

Die `Append` Methode fügt den angegebenen Wert an das Ende des Strings an.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### "Basename"

Die Methode `Basename` gibt die nachfolgende Namenskomponente eines Pfades zurück. Optional wird ein spezifiziertes Suffix aus dem
Basisnamen entfernt.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### "Vorhersehen"

Die `Before` Methode gibt den Teil eines Strings zurück, der vor einem angegebenen Wert erscheint. Wenn der Wert ein leerer
-String ist oder nicht innerhalb des ursprünglichen Strings existiert, wird der gesamte String zurückgegeben.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World!").Before("World").String() // "Hallo "
```

### `Vorhergehend`

Die `BeforeLast` Methode gibt den Teil eines Strings zurück, der vor dem letzten Auftreten eines angegebenen Wertes erscheint. Wenn
der Wert ein leerer String ist oder nicht innerhalb des Original-Strings existiert, wird der vollständige String zurückgegeben.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### 'Between'

Die Methode `Between` gibt den Teil eines Strings zwischen zwei angegebenen Werten zurück.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hallo"
```

### "BetweenFirst"

Die `BetweenFirst` Methode gibt den Teil eines Strings zwischen dem ersten Auftreten von zwei angegebenen Werten zurück.

```go
importieren "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hallo"
```

### `Camel`

Die `Camel` Methode konvertiert den String in `camelCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld" importieren
```

### `CharAt`

Die `CharAt` Methode gibt das Zeichen am angegebenen Index zurück. Wenn der Index außerhalb der Grenzen ist, wird ein leerer String
zurückgegeben.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

Die `ChopEnd` Methode entfernt den angegebenen Werte(n) vom Ende des Strings.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

Die `ChopStart` Methode entfernt den angegebenen Werte(n) vom Anfang des Strings.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### 'Enthält'

Die `Contains` Methode bestimmt, ob der angegebene String den angegebenen Wert enthält. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich. Wenn mehrere
Werte angegeben werden, wird `true` zurückgegeben, wenn der String einen der Werte enthält.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hallo World").Contains("Gor", "Hallo") // true
```

### 'EnthältAll'

Die `ContainsAll` Methode bestimmt, ob der angegebene String alle angegebenen Werte enthält. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").ContainsAll("Hallo", "World") // true

str.Of("Hallo World").ContainsAll("Hallo", "Gor") // false
```

### 'Dirname'

Die Methode `Dirname` gibt den übergeordneten Teil eines Pfades zurück.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

Optional können Sie die Verzeichnisebene angeben, um aus dem Pfad auszuschneiden.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

Die `EndsWith` Methode bestimmt, ob der angegebene String mit dem angegebenen Wert endet. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Sie können mehrere Werte an die Methode übergeben, um festzustellen, ob der String mit einem der Werte endet.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### "Genauig"

Die `Exactly` Methode bestimmt, ob der angegebene String genau dem angegebenen Wert entspricht. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### "Außerdem"

Die `Except` Methode extrahiert einen Auszug aus dem String, der mit dem ersten Auftreten des angegebenen Wertes übereinstimmt.

```go
import "github.com/goravel/framework/support/str"

str.Of("Dies ist ein schöner Morgen").
 Auszug ("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...ist ein schöner Morgen...
```

Zusätzlich kannst du die `Omission`-Option verwenden, um den String zu ändern, der verwendet wird, um den Auszug anzuzeigen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Dies ist ein schöner Morgen").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)ist ein schöner Morgen(...)"
```

### "Explodieren"

Die `Explode` Methode teilt den String in ein Array von Strings mit dem angegebenen Trennzeichen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Explode(" ") // []string{"Hallo", "Welt"}
```

### `Beenden`

Die `Finish` Methode stellt sicher, dass der angegebene String mit dem angegebenen Wert endet. If the string already ends with the value,
it will not be added again.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### "Headline"

Die `Headline` Methode konvertiert den String in eine Überschrift.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hallo World"
```

### `Is`

Die `Is` Methode bestimmt, ob der angegebene String mit dem angegebenen Muster übereinstimmt. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

Die `IsEmpty` Methode bestimmt, ob der angegebene String leer ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

Die `IsNotEmpty` Methode bestimmt, ob der angegebene String nicht leer ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

Die `IsAscii` Methode bestimmt, ob der angegebene String nur ASCII-Zeichen enthält.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> ").IsAscii() // false
```

### `IsSlice`

Die `IsSlice` Methode bestimmt, ob der angegebene String ein Slice ist.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

Die `IsMap` Methode bestimmt, ob der angegebene String eine Karte ist.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

Die `IsUlid` Methode bestimmt, ob der angegebene String eine ULID ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z6Z1Z6Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

Die `IsUuid` Methode bestimmt, ob der angegebene String eine UUID ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

Die `Kebab` Methode konvertiert den String in `kebab-case`.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

Die `LcFirst` Methode konvertiert das erste Zeichen des Strings in Kleinbuchstaben.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Länge`

Die `Length` Methode gibt die Länge des Strings zurück.

```go
importieren "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limit`

Die `Limit` Methode kürzt den String auf die angegebene Länge.

```go
import "github.com/goravel/framework/support/str"

str.Of("Dies ist ein schöner Morgen").Limit(7).String() // "This is..."
```

Optional können Sie das zweite Argument angeben, um den String zu ändern, der verwendet wird, um die Störung anzuzeigen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Dies ist ein schöner Morgen").Limit(7, " (****)").String() // "This is (****)"
```

### "Tiefer"

Die Methode `Lower` konvertiert den String in Kleinbuchstaben.

```go
importieren "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

Die `LTrim` Methode schneidet die linke Seite des Strings ab.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### "Maske"

Die `Mask` Methode maskiert den String mit dem angegebenen Masken-Zeichen.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**********"
```

Bei Bedarf können Sie eine negative Nummer zur Maskierungsmethode angeben, die die Methode anweist, am Ende des
Zeichenketten zu maskieren.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris******"
```

### `Match`

Die Methode `Match` bestimmt, ob der angegebene String mit dem angegebenen regulären Ausdruck übereinstimmt.

```go
import "github.com/goravel/framework/support/str"

str.Of("Dies ist ein (Test-)String").Match(`\([^)]+\)`).String() // (test)
```

### "MatchAll"

Die Methode `MatchAll` bestimmt, ob der angegebene String mit allen angegebenen regulären Ausdrücken übereinstimmt.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

Die `IsMatch` Methode bestimmt, ob der angegebene String (einer der) den angegebenen regulären Ausdruck trifft.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

Die `NewLine` Methode fügt dem String ein Zeilenzeichen an.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework" importieren
```

### "PadBoth"

Die Methode `PadBoth` legt beide Seiten des Strings an.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo").PadBoth(10, "_").String() // "__Hello___ " importieren
```

### "PadLinks"

Die Methode `PadLeft` legt die linke Seite des Strings an.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo").PadLeft(10, "_").String() // "_____Hello"
```

### "PadRight"

Die Methode `PadRight` legt die rechte Seite des Strings an.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo").PadRight(10, "_").String() // "Hello_____"
```

### "Pipe"

Die `Pipe` Methode erlaubt es dir, den String mit einem gegebenen Schließen zu transformieren.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### 'Prepend'

Die `Prepend` Methode stellt dem String den angegebenen Wert vor.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Entfernen`

Die `Entfernen` Methode entfernt den angegebenen Werte(n) aus dem String.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Remove("World").String() // "Hallo "

str.Of("Hallo World").Remove("World", "Hallo").String() // "
```

### "Wiederholen"

Die `Wiederholen` Methode wiederholt den String eine bestimmte Anzahl an Malen.

```go
importieren "github.com/goravel/framework/support/str"

str.Of("a").Wiederholung(2).String() // "aa"
```

### `Ersetzen`

Die Methode `Replace` ersetzt den angegebenen Wert im String.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Replace("World", "Krishan").String() // "Hallo Krishan"
```

Standardmäßig ist die Methode `Replace` Groß- und Kleinschreibung zu beachten. Wenn Sie möchten, dass die Methode Groß- und Kleinschreibung nicht beachtet wird, können Sie
`false` als drittes Argument übergeben.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Replace("world", "Krishan", false).String() // "Hallo Krishan"
```

### `ErsetzenEnd`

Die `ReplaceEnd` Methode ersetzt das letzte Vorkommen des angegebenen Wertes im String nur, wenn sie am Ende des Strings
steht.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").ReplaceEnd("World", "Goravel").String() // "Hallo Goravel"

str.Of("Hallo World").ReplaceEnd("Hallo", "Goravel").String() // "Hallo World"
```

### `ErsetzeFirst`

Die Methode `ReplaceFirst` ersetzt das erste Vorkommen des angegebenen Wertes im String.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").ReplaceFirst("World", "Goravel").String() // "Hallo Goravel"
```

### `ErsetzenLetzt`

Die `ReplaceLast` Methode ersetzt das letzte Vorkommen des angegebenen Wertes im String.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").ReplaceLast("World", "Goravel").String() // "Hallo Goravel"
```

### `ErsetzeMatches`

Die Methode `ReplaceMatches` ersetzt die angegebenen regulären Ausdrücke im String.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo, Goravel!").ReplaceMatch(`goravel!(.*)`, "Krishan") // "Hallo, Krishan!"
```

### `ErsetzenStart`

Die `ReplaceStart` Methode ersetzt das erste Vorkommen des angegebenen Wertes im String nur, wenn es am Anfang von
den String ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").ReplaceStart("Hallo", "Goravel").String() // "Goravel World"

str.Of("Hallo World").ReplaceStart("World", "Goravel").String() // "Hallo World"
```

### `RTrim`

Die `RTrim` Methode schneidet die rechte Seite des Strings ab.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### "Schlangen"

Die `Snake` Methode konvertiert den String in `snake_case`.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### "Split"

Die `Split` Methode teilt den String in ein Array von Strings mit dem angegebenen Trennzeichen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Split(" ") // []string{"Hallo", "Welt"}
```

### `Squish`

Die `Squish` Methode ersetzt aufeinanderfolgende Leerzeichen durch ein einziges Leerzeichen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo World").Squish().String() // "Hallo World"
```

### `Start`

Die `Start` Methode fügt eine einzelne Instanz des angegebenen Wertes am Anfang des Strings hinzu, wenn sie nicht bereits
mit dem Wert startet.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### "StartsWith"

Die `StartsWith` Methode bestimmt, ob die angegebene Zeichenkette mit (einen) angegebenen Werte(n) beginnt. Die Methode ist bei der Groß- und Kleinschreibung unterschiedlich.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hallo World").StartsWith("Gor", "Hallo") // true
```

### "String"

Die `String` Methode gibt den String zurück.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### "Studly"

Die `Studly` Methode konvertiert den String in `StudlyCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

Die `Substr` Methode gibt den Teil des Strings zurück, der am angegebenen Index beginnt und für die angegebene Länge fortfährt.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora" importieren
```

### "Swap"

Die `Swap` Methode tauscht mehrere Werte im String aus.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### "Tap"

Die Methode `Tap` übergibt den String an die angegebene Schließung und gibt den String zurück.

```go
importiere "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### "Test"

Die `Test` Methode bestimmt, ob der angegebene String mit dem angegebenen regulären Ausdruck übereinstimmt.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

Die `Title` Methode konvertiert den String in `Title Case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### "Trim"

Die `Trim` Methode schneidet den String ab.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

Die `UcFirst` Methode konvertiert das erste Zeichen des Strings in Großbuchstaben.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel Framework"
```

### `UcSplit`

Die `UcSplit` Methode teilt den String in ein Array mit Großbuchstaben auf.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### 'Unwenig'

Die `Unless` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn die angegebene Bedingung `false` ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### "Upper"

Die `Upper` Methode konvertiert den String in Großbuchstaben.

```go
importieren "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### "Wann"

Die `When` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn die angegebene Bedingung `true` ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Bei Bedarf du kannst das dritte Argument für die `When`-Methode angeben, die eine Schließung ist, die ausgeführt wird, wenn die
-Bedingung `false` ist.

### `Wann enthält`

Die `WhenContains` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der gegebene String den
angegebenen Wert enthält.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo Bowen").WhenContains("Hallo", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hallo Bowen Han"
```

Bei Bedarf du kannst das dritte Argument für die `WhenContains` Methode angeben, die eine Schließung ist, die
ausgeführt wird, wenn der String nicht den angegebenen Wert enthält.

### "When ContainsAll"

The `WhenContainsAll` method passes the string to the given closure and returns the string if the given string contains
all of the given values.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo Bowen").WhenContainsAll([]string{"Hallo", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hallo Bowen Han"
```

Bei Bedarf du kannst das dritte Argument für die `WhenContainsAll` Methode angeben, die eine Schließung ist, die
ausgeführt wird, wenn der String nicht alle angegebenen Werte enthält.

### `Wann leer`

Die `WhenEmpty` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der angegebene String leer ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WennIsAscii`

Die `WhenIsAscii` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der gegebene String nur
ASCII Zeichen enthält.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> ").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "<unk> <unk> "
```

### `WennenNotEmpty`

The `WhenNotEmpty` method passes the string to the given closure and returns the string if the given string is not
empty.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### "Wann StartsWith"

Die `WhenStartsWith` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der gegebene String
mit dem angegebenen Wert startet.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo world").WhenStartsWith("hallo", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hallo World"
```

### "Wann Endewith"

Die `WhenEndsWith` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der gegebene String mit
den angegebenen Wert endet.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hallo World"
```

### `Wennexakt`

Die `WhenExactly` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der angegebene String genau
gleich dem angegebenen Wert ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WennNotExaktly`

The `WhenNotExactly` method passes the string to the given closure and returns the string if the given string is not
exactly equal to the given value.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### "Wenn"

Die `WhenIs` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der angegebene String mit dem angegebenen
Muster übereinstimmt.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `Wann Ulid`

Die `WhenIsUlid` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der angegebene String eine ULID ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z1Z6Z1Z1Z6Z1Z6Z6Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6Z6Z6"
```

### `WennIsUuid`

Die `WhenIsUuid` Methode übergibt den String an die angegebene Verschließung und gibt den String zurück, wenn der angegebene String eine UUID ist.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `Wenntest`

The `WhenTest` method passes the string to the given closure and returns the string if the given string matches the
given regular expression.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### "WordCount"

Die Methode `WordCount` gibt die Anzahl der Wörter im String zurück.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo, World!").WordCount() // 2
```

### `Worte`

Die Methode `Words` begrenzt die Anzahl der Wörter in der Zeichenkette. If necessary, you may provide the second argument to change
the string that is used to indicate the truncation.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hallo, World!").Words(1) // "Hallo..."

str.Of("Hallo, Welt!").Words(1, " (****)") // "Hallo (****)"
```
