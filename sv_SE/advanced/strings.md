# Strängar

Goravel ger en flytande sträng manipulation bibliotek som gör att du enkelt kan manipulera strängar. Fluent Strings
låter dig kombinera flera strängoperationer genom metodkedjning, där de flesta metoderna returnerar en instans
av `support/str. tring`, så att du kedja ytterligare metoder. För att få det slutliga strängvärdet efter att ha använt den kedjade
-operationen, kan du anropa `String`-metoden, som returnerar det underliggande `string`-värdet.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Tillgängliga metoder

### `Of`

`Of`-metoden skapar en ny flytande stränginstans från en given sträng.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel")
```

### \`Efter"

\`Efter-metoden returnerar delen av en sträng som visas efter ett angivet värde. Om värdet är en tom sträng
eller inte existerar i den ursprungliga strängen, returneras hela strängen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Hello World!").After("Hello").String() // " World!"
```

### `AfterLast`

`AfterLast`-metoden returnerar delen av en sträng som visas efter den sista förekomsten av ett angivet värde. Om
värdet är en tom sträng eller inte existerar i den ursprungliga strängen, returneras hela strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Lägg till`

`Append`-metoden lägger till det angivna värdet i slutet av strängen.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basnamn`

`Basename`-metoden returnerar den efterföljande namnkomponenten i en sökväg, som eventuellt tar bort ett specificerat suffix från basnamnet
.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("frameing/support/str.go").Basename(".go").String() // "str"
```

### `För`

`Frame`-metoden returnerar delen av en sträng som visas före ett angivet värde. Om värdet är en tom
sträng eller inte existerar i den ursprungliga strängen returneras hela strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Hello "
```

### `BeforeLast`

`BeforeLast`-metoden returnerar delen av en sträng som visas innan den sista förekomsten av ett angivet värde. Om
värdet är en tom sträng eller inte existerar i den ursprungliga strängen, returneras hela strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

`Between`-metoden returnerar delen av en sträng mellan två givna värden.

```go
importera "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hej"
```

### `BetweenFirst`

`BetweenFirst`-metoden returnerar delen av en sträng mellan den första förekomsten av två givna värden.

```go
importera "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hej"
```

### `Camel`

`Camel`-metoden konverterar strängen till `camelCase`.

```go
importera "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

`CharAt`-metoden returnerar tecknet på det angivna indexet. Om indexet är utanför gränserna kommer en tom sträng att returneras till

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `Chopend`

`ChopEnd`-metoden tar bort det angivna värdet från slutet av strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

`ChopStart`-metoden tar bort det angivna värdet från början av strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Innehåller`

`Innehåller`-metoden avgör om den angivna strängen innehåller det angivna värdet. Metoden är skiftlägeskänslig. Om flera
-värden anges, kommer det att returnera `true` om strängen innehåller något av värdena.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Goravel").Innehåller("Gor") // true

str.Of("Hello World").Innehåller("Gor", "Hello") // true
```

### `ContainsAll`

`ContainsAll`-metoden avgör om den angivna strängen innehåller alla angivna värden. Metoden är skiftlägeskänslig.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirname`

`Dirname`-metoden returnerar den överordnade delen av en sökväg.

```go
import "github.com/goravel/frameing/support/str"

str.Of("frameing/support/str").Dirname().String() // "frameing/support"
```

Alternativt kan du ange katalognivån för att trimma från sökvägen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("frameing/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

`EndsWith`-metoden avgör om den angivna strängen slutar med det angivna värdet. Metoden är skiftlägeskänslig.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Du kan skicka flera värden till metoden för att avgöra om strängen slutar med något av värdena.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exakthet`

`Exakt `-metoden avgör om den angivna strängen är exakt lika med det angivna värdet. Metoden är skiftlägeskänslig.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").Exaktly("Goravel") // true
```

### `Undantag`

`Except`-metoden extraherar ett utdrag från strängen som matchar den första förekomsten av det angivna värdet.

```go
import "github.com/goravel/framework/support/str"

str.Of("Detta är en vacker morgon").
 Utdrag("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is a beautiful morn...
```

Dessutom kan du använda `Utelämnande`-alternativet för att ändra strängen som används för att indikera utdraget.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Detta är en vacker morgon").
    Utdrag("beautiful", str.ExcerptOption{
        Radius: 5,
        Utelämnande: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explodera`

`Explode`-metoden delar upp strängen i en rad strängar med hjälp av den angivna avgränsaren.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode("") // []string{"Hello", "World"}
```

### `Slutförd`

`Finish`-metoden säkerställer att den angivna strängen slutar med det angivna värdet. Om strängen redan slutar med värdet,
kommer den inte att läggas till igen.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "frameing/"

str.Of("frameing/").Finish("/").String() // "frameing/"
```

### `Headline`

`Headline`-metoden konverterar strängen till en rubrik.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `Is`

`I`-metoden avgör om den angivna strängen matchar det angivna mönstret. Metoden är skiftlägeskänslig.

```go
import "github.com/goravel/frameing/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

`IsEmpty`-metoden avgör om den angivna strängen är tom.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

`IsNotEmpty`-metoden avgör om den angivna strängen inte är tom.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

`IsAscii`-metoden avgör om den angivna strängen endast innehåller ASCII-tecken.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> <unk> ").IsAscii() // false
```

### `IsSlice`

`IsSlice`-metoden avgör om den angivna strängen är en skiva.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

`IsMap`-metoden avgör om den angivna strängen är en karta.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

`IsUlid`-metoden avgör om den angivna strängen är en ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

`IsUuid`-metoden avgör om den angivna strängen är ett UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

`Kebab`-metoden konverterar strängen till `kebab-case`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

`LcFirst`-metoden konverterar det första tecknet i strängen till gemenen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Längd`

`Length`-metoden returnerar längden på strängen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").Length() // 7
```

### `Begränsa`

`Limit`-metoden trunkerar strängen till den angivna längden.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Detta är en vacker morgon").Begränsning(7).String() // "Detta är..."
```

Alternativt kan du ange det andra argumentet för att ändra strängen som används för att indikera trunkationen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Detta är en vacker morgon").Begränsning(7, " (**)").String() // "Detta är (**)"
```

### \`Låg'

`Lower`-metoden omvandlar strängen till gemener.

```go
import "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

`LTrim`-metoden trimmar den vänstra sidan av strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### \`Mask'

Metoden `Mask` maskerar strängen med den givna maskkaraktären.

```go
import "github.com/goravel/frameing/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri************"
```

Om det behövs kan du ange negativt tal till maskmetoden som instruerar metoden att börja maskera från slutet av
strängen.

```go
import "github.com/goravel/frameing/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**************"
```

### `Match`

`Match`-metoden avgör om den angivna strängen matchar det givna reguljära uttrycket.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Detta är en (test) sträng").Match(`\([^)]+\)`).String() // (test)
```

### `MatchAll`

`MatchAll`-metoden avgör om den angivna strängen matchar alla de givna reguljära uttrycken.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

`IsMatch`-metoden avgör om den angivna strängen matchar (något av) det givna reguljära uttrycket.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Hej, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

Metoden `NewLine` lägger till ett nytt linjetecken till strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

`PadBoth`-metoden pads båda sidor av strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hej").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

Metoden `PadLeft` lägger den vänstra sidan av strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hej").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

Metoden `PadRight` pads den högra sidan av strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hej").PadRight(10, "_").String() // "Hello_____"
```

### `Pipe`

Med `Pipe`-metoden kan du omvandla strängen med hjälp av en given stängning.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").Pipe(func(s string) sträng {
    returnera s + " Framework"
}).String() // "Goravel Framework"
```

### `Prepend`

`Prepend`-metoden föregår det angivna värdet för strängen.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Ta bort`

`Ta bort` -metoden tar bort det angivna värdet från strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hello "

str.Of("Hello World").Remove("World", "Hello").String() // " " "
```

### `Upprepa`

`Repeat`-metoden upprepar strängen ett givet antal gånger.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Ersätt`

`Replace`-metoden ersätter det angivna värdet i strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("World", "Krishan").String() // "Hello Krishan"
```

Som standard är `Replace`-metoden skiftlägeskänslig. Om du vill att metoden ska vara fall-okänslig kan du passera
`false` som det tredje argumentet.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("world", "Krishan", false).String() // "Hello Krishan"
```

### `Ersätteend`

`ReplaceEnd`-metoden ersätter den sista förekomsten av det angivna värdet i strängen endast om det är i slutet av
-strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `ReplaceFirst`

`ReplaceFirst`-metoden ersätter den första förekomsten av det angivna värdet i strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Hello Goravel"
```

### `ReplaceLast`

`ReplaceLast`-metoden ersätter den sista förekomsten av det angivna värdet i strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Hello Goravel"
```

### `ErsätteMatches`

`ReplaceMatches`-metoden ersätter det givna reguljära uttrycket matchar i strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hej, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Hej, Krishan!"
```

### `ErsätteStart`

`ReplaceStart`-metoden ersätter den första förekomsten av det angivna värdet i strängen endast om det är i början av
strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

`RTrim`-metoden trimmar den högra sidan av strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Snake`

`Snake`-metoden konverterar strängen till `snake_case`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Dela`

`Split`-metoden delar upp strängen i en rad strängar med hjälp av den angivna avgränsaren.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

`Squish`-metoden ersätter på varandra följande blanksteg med ett enda mellanslag.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Start`

`Start`-metoden lägger till en enda instans av det angivna värdet till början av strängen om den inte redan startar
med värdet.

```go
importera "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `StartsWith`

`StartsWith`-metoden avgör om den angivna strängen börjar med (någon) givet värde. Metoden är skiftlägeskänslig.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `Sträng`

`String`-metoden returnerar strängen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Studly`

`Studly`-metoden konverterar strängen till `StudlyCase`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

`Substr`-metoden returnerar den del av strängen som börjar vid det angivna indexet och fortsätter för den angivna längden.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

`Swap`-metoden byter flera värden i strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang är awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### `Tap`

`Tap`-metoden skickar strängen till den givna stängningen och returnerar strängen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Test`

`Test`-metoden avgör om den angivna strängen matchar det givna reguljära uttrycket.

```go
import "github.com/goravel/frameing/support/str"

str.Of("Hej, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

`Title`-metoden konverterar strängen till `Titelfall`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Trim`

`Trim`-metoden trimmar strängen.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/frameing/").Trim("/").String() // "framework"
```

### `UcFirst`

`UcFirst`-metoden konverterar det första tecknet i strängen till versalen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

`UcSplit`-metoden delar upp strängen i en rad strängar med versaler.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Omindre`

`Omindre`-metoden skickar strängen till den angivna stängningen och returnerar strängen om det angivna villkoret är `false`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Övrigt`

`Upper`-metoden konverterar strängen till versalen.

```go
import "github.com/goravel/frameing/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### \`När'

`När`-metoden skickar strängen till den angivna stängningen och returnerar strängen om det angivna villkoret är `true`.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Bowen").När(true, func(s *str.String) *str.String {
    returnera s.Append(" Han")
}).String() // "Bowen Han"
```

Om nödvändigt, du kan ge det tredje argumentet till `När`-metoden som är en stängning som kommer att köras när
-villkoret är `false`.

### `Närinnehåller`

`NärContains`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen innehåller det
angivna värdet.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").NärContains("Hej", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Om nödvändigt, du kan ange det tredje argumentet till `WhenContains`-metoden som är en stängning som kommer att köras
när strängen inte innehåller det angivna värdet.

### `NärinnehållerAlla`

`NärContainsAll`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen innehåller
alla angivna värden.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").NärContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    returnera s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Om nödvändigt, du kan ge det tredje argumentet till `WhenContainsAll`-metoden som är en stängning som kommer att köras
när strängen inte innehåller alla angivna värden.

### `Närtom`

`WhenEmpty`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen är tom.

```go
importera "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    returnera s.Append("Goravel")
}).String() // "Goravel"
```

### `NärisAscii`

`WhenIsAscii`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen endast innehåller
ASCII-tecken.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").NärisAscii(func(s *str.String) *str.String {
    returnera s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> ").NärisAscii(func(s *str.String) *str.String {
    returnera s.Append(" Framework")
}).String() // "<unk> "
```

### `NärNotEmpty`

`WhenNotEmpty`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen inte är
tom.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    returnera s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `NärStartsWith`

`WhenStartsWith`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen startar
med det angivna värdet.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `NärEndsWith`

`WhenEndsWith`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen slutar med
det angivna värdet.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `NärExakthet`

`NärExaktt`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen är exakt
lika med det angivna värdet.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").NärExaktly("Goravel", func(s *str.String) *str.String {
    returnera s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `NärnotExakthet`

`WhenNotExactly`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen inte är
exakt lika med det angivna värdet.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    returnera s.Append(" Framework")
}).String() // "Goravel"
```

### \`När'

\`När-I'-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen matchar det givna
-mönstret.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `NärisUlid`

`WhenIsUlid`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen är en ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6").NärIsUlid(func(s *str.String) *str.String {
    returnera s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6Z6"
```

### `NärIsUuid`

`WhenIsUuid`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen är ett UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").NärIsUuid(func(s *str.String) *str.String {
    returnera s.Substr(0, 8)
}).String() // "550e8400"
```

### `Närtest`

`WhenTest`-metoden skickar strängen till den angivna stängningen och returnerar strängen om den angivna strängen matchar det
givna reguljära uttrycket.

```go
import "github.com/goravel/frameing/support/str"

str.Of("goravel framework").Närtest(`goravel(.*)`, func(s *str.String) *str.String {
    returnerar s.Append(" är awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

`WordCount`-metoden returnerar antalet ord i strängen.

```go
importera "github.com/goravel/frameing/support/str"

str.Of("Hej, World!").WordCount() // 2
```

### `Ord`

`Words`-metoden begränsar antalet ord i strängen. Om det behövs, kan du ange det andra argumentet för att ändra
strängen som används för att indikera trunkationen.

```go
importera "github.com/goravel/framework/support/str"

str.Of("Hello, World!").Words(1) // "Hello..."

str.Of("Hello, World!").Words(1, " (**)") // "Hello (****)"
```
