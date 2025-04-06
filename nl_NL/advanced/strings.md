# Tekenreeks

Goravel biedt een vloeiende tekenreeks-manipulatie bibliotheek waarmee je gemakkelijk tekenreeksen kunt manipuleren. Fluent Strings
stelt u in staat meerdere string bewerkingen te combineren door middel van methode-ketening, waarbij de meeste methoden een instantie retourneren
van `support/str. tring`, laat je extra methodes ketenen. Om de uiteindelijke tekenreekswaarde te krijgen na het toepassen van de geketende
bewerkingen, kunt u de 'String'-methode aanroepen, die de onderliggende 'string' waarde teruggeeft.

```go
import van "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Beschikbare methoden

### `Of`

De `Of` methode maakt een nieuwe soepele string instance uit een bepaalde string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `Na`

De `After` methode geeft het gedeelte van een tekenreeks terug dat na een opgegeven waarde verschijnt. Als de waarde een lege tekenreeks
is of niet bestaat in de oorspronkelijke tekenreeks, wordt de volledige tekenreeks geretourneerd.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // " Wereld!"
```

### `AfterLaatste`

De 'AfterLast' methode geeft het gedeelte van een string terug dat wordt weergegeven na het laatste optreden van een opgegeven waarde. Als
de waarde een lege tekenreeks is of niet bestaat in de oorspronkelijke tekenreeks, wordt de volledige tekenreeks geretourneerd.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Append`

De `Append` methode voegt de opgegeven waarde toe aan het einde van de tekenreeks.

```go
import van "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basenaam`

De `Basename` methode geeft het trailing naam component van een pad weer, eventueel een gespecificeerd achtervoegsel van de
basisnaam verwijderd.

```go
import van "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Voor al`

De 'Vooruit' methode geeft het gedeelte terug van een tekenreeks dat voor een opgegeven waarde verschijnt. Als de waarde een lege
tekenreeks is of niet bestaat in de oorspronkelijke tekenreeks, wordt de volledige tekenreeks geretourneerd.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Hello "
```

### `Laatste`

De 'BeforeLast' methode geeft het gedeelte van een string terug dat wordt weergegeven voor het laatste optreden van een opgegeven waarde. Als
de waarde een lege tekenreeks is of niet bestaat in de oorspronkelijke tekenreeks, wordt de volledige tekenreeks geretourneerd.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

De 'Between'-methode geeft het gedeelte van een string tussen twee opgegeven waarden terug.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("[Hello] Wereld!").Between("[", "]").String() // "Hello"
```

### `BetweenFirst`

De 'BetweenFirst'-methode geeft het gedeelte van een string terug tussen het eerste optreden van twee opgegeven waarden.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hello"
```

### `Camel`

De `Camel` methode converteert de string naar `camelCase`.

```go
import van "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "halloWorld"
```

### `CharAt`

De `CharAt` methode geeft het karakter weer op de opgegeven index. Als de index buiten bereik is, wordt een lege string
geretourneerd.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

De `ChopEnd` methode verwijdert de gegeven waarde(s) van het einde van de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

De `ChopStart` methode verwijdert de gegeven waarde(n) uit het begin van de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Contains`

De `Contains` methode bepaalt of de gegeven string de gegeven waarde bevat. De methode is hoofdlettergevoelig. Als meerdere
waarden worden opgegeven, zal het 'waar' teruggeven als de string een van de waarden bevat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `ContainsAll`

De `ContainsAll` methode bepaalt of de gegeven string alle opgegeven waarden bevat. De methode is hoofdlettergevoelig.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hallo", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirnaam`

De `Dirname` methode retourneert het bovenliggende gedeelte van een pad.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

U kunt optioneel het adresniveau opgeven om bij te snijden van het pad.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

De methode `EndsWith` bepaalt of de opgegeven string eindigt met de opgegeven waarde. De methode is hoofdlettergevoelig.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

U kunt meerdere waarden doorgeven aan de methode om te bepalen of de tekenreeks eindigt met een van de waarden.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exactly`

De `Exactly` methode bepaalt of de opgegeven string precies gelijk is aan de opgegeven waarde. De methode is hoofdlettergevoelig.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Except`

De 'Except'-methode pakt een fragment uit de string die overeenkomt met het eerste optreden van de opgegeven waarde.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Dit is een mooie ochtend").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is een prachtige morn...
```

Daarnaast kunt u de 'Omission' optie gebruiken om de string te wijzigen die wordt gebruikt om het excerpt.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Dit is een mooie ochtend").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is een prachtige morn(...)"
```

### 'Explode'

De `Explode` methode splitst de string in een array van tekenreeksen met behulp van het gegeven scheidingsteken.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Hello", "World"}
```

### `Afronden`

De `Finish` methode zorgt ervoor dat de opgegeven string eindigt met de opgegeven waarde. Als de tekenreeks al eindigt met de waarde,
zal het niet meer worden toegevoegd.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Kop`

De `Headline` methode zet de string om naar een kop.

```go
import van "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### \`Es

De `Is` methode bepaalt of de gegeven string overeenkomt met het opgegeven patroon. De methode is hoofdlettergevoelig.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // waar
```

### `IsEmpty`

De `IsEmpty` methode bepaalt of de opgegeven string leeg is.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // waar
```

### `IsNotEmpty`

De `IsNotEmpty` methode bepaalt of de opgegeven string niet leeg is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // waar
```

### `IsAscii`

De `IsAscii` methode bepaalt of de gegeven string alleen ASCII tekens bevat.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("→").IsAscii() // false
```

### `IsSlice`

De `IsSlice` methode bepaalt of de opgegeven string een plak is.

```go
importeer "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

De `IsMap` methode bepaalt of de opgegeven string een kaart is.

```go
importeer "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"Alice"}]`).IsMap() // false
```

### `IsUlid`

De `IsUlid` methode bepaalt of de opgegeven string een ULID is.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6Z).IsUlid() // true

str.Of("krishan").IsUlid() // vals
```

### `IsUuid`

De `IsUuid` methode bepaalt of de opgegeven string een UUID is.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

De `Kebab` methode zet de string om naar `kebab-case`.

```go
import van "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

De `LcFirst` methode converteert het eerste karakter van de string naar kleine letters.

```go
import van "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### 'Lengte'

De 'Lengte' methode retourneert de lengte van de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limit`

De methode `Limit` trunceert de string tot de gegeven lengte.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Dit is een mooie ochtend").Limit(7).String() // "Dit is..."
```

Optioneel kan je het tweede argument opgeven om de tekenreeks te wijzigen die wordt gebruikt om de tekenreeks aan te geven.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Dit is een prachtige ochtend").Limit(7, " (**)").String() // "Dit is (**)**)"
```

### `Loop`

De `Lower` methode zet de string om naar kleine letters.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

De `LTrim` methode trimt de linkerkant van de tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Masker`

De `Mask` methode maskeert de string met het opgegeven masker-karakter.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri****************************" "
```

Indien nodig, kunt u een negatief getal opgeven om de methode te maskeren vanaf het einde van de
tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**************" **"
```

### `Wedstrijden`

De `Match` methode bepaalt of de opgegeven string overeenkomt met de opgegeven reguliere expressie.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Dit is een (test) string").Match(`\([^)]+\).String() // (test)
```

### `MatchAll`

De `MatchAll` methode bepaalt of de opgegeven string overeenkomt met alle opgegeven reguliere expressies.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

De `IsMatch` methode bepaalt of de opgegeven string overeenkomt (een van) de opgegeven reguliere expressie.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

De `NewLine` methode voegt een nieuwe regel toe aan de tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

De methode 'PadBoth' paait beide kanten van de tekenreeks.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

De methode `PadLeft` plaatst de linkerkant van de tekenreeks.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

De methode `PadRight` pads de rechterkant van de tekenreeks.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello___"
```

### `Pipe`

Met de `Pipe` methode kunt u de string transformeren met een bepaalde sluiting.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    geeft terug s + " Framework"
}).String() // "Goravel Framework"
```

### `Voorlopig`

De `Prepend` methode houdt de gegeven waarde in op de string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### 'Verwijderen'

De `Verwijder` methode verwijdert de gegeven waarde(n) uit de string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hello "

str.Of("Hello World").Remove("Wereld", "Hello").String() // " "
```

### `Herhaal`

De `Herhaal` methode herhaalt de string een aantal keer.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Vervang`

De `Vervang` methode vervangt de opgegeven waarde in de string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("World", "Krishan").String() // "Hello Krishan"
```

Standaard is de `Replace` methode hoofdlettergevoelig. Als u wilt dat de methode hoofdlettergevoelig is, kunt u
`false` als het derde argument gebruiken.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("wereld", "Krishan", false).String() // "Hello Krishan"
```

### `VervangEnd`

De `ReplaceEnd` methode vervangt de laatste gebeurtenis van de gegeven waarde in de string alleen als het aan het einde van de
string is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `ReplaceFirst`

De `ReplaceFirst` methode vervangt het eerste optreden van de gegeven waarde in de string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Hello Goravel"
```

### `VervangLaatste`

De methode 'Vervangen' vervangt de laatste verschijning van de gegeven waarde in de string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Hello Goravel"
```

### `Vervangsten`

De `ReplaceMatches` methode vervangt de opgegeven reguliere expressie overeenkomsten in de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Hallo, Krishan!"
```

### `Vervangstarten`

De `ReplaceStart` methode vervangt het eerste optreden van de gegeven waarde in de string alleen als het aan het begin van
de string is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

De 'RTrim' methode trimt de rechterkant van de tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Slang`

De `Snake` methode converteert de string naar `snake_case`.

```go
import van "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Split`

De `Split` methode splitst de string in een array van tekenreeksen met behulp van het gegeven scheidingsteken.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

De `Squish` methode vervangt opeenvolgende witruimte tekens met één spatie.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Start`

De `Start` methode voegt een enkel exemplaar van de opgegeven waarde toe aan het begin van de string als deze nog niet
met de waarde begint.

```go
import van "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `BeginnenMet`

De `StartsWith` methode bepaalt of de opgegeven string begint met (een) gegeven waarde(n). De methode is hoofdlettergevoelig.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `String`

De `String` methode heeft de string geretourneerd.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Studly`

De 'Studly'-methode converteert de string naar 'StudlyCase'.

```go
import van "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

De `Substr` methode geeft het gedeelte terug van de tekenreeks die begint bij de opgegeven index en doorgaat met de gegeven lengte.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

De 'Swap' methode wisselt meerdere waarden in de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Gexplains is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### `Tap`

De `Tap` methode passeert de string naar de gegeven sluiting en retourneert de tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Test`

De `Test` methode bepaalt of de opgegeven string overeenkomt met de opgegeven reguliere expressie.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").Test(`goravel!(.*)`) // waar
```

### `Title`

De `Title` methode zet de string om naar `Title Case`.

```go
import van "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Knippen`

De 'Trim' methode trimt de tekenreeks.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

De `UcFirst` methode converteert het eerste karakter van de string naar hoofdletters.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

De `UcSplit` methode splitst de string in een reeks tekenreeksen met behulp van hoofdletters.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Ongeldig`

De `Unless` methode geeft de string door naar de gegeven sluiting en retourneert de string als de gegeven voorwaarde `false` is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String) *String {
        retourneer Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Boven`

De 'Boven' methode zet de string om naar hoofdletters.

```go
import van "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### 'Wanneer'

De `Wanneer` methode geeft de string door naar de gegeven sluiting en retourneert de string als de gegeven voorwaarde `true` is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Indien nodig je kan het derde argument opgeven aan de `Wanneer` methode die een sluiting is die zal worden uitgevoerd wanneer de
voorwaarde `false` is.

### `WanneerContains`

De `WhenContains` methode geeft de string door naar de gegeven sluiting en geeft de string terug als de gegeven string de
gegeven waarde bevat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Indien nodig u kunt het derde argument opgeven aan de `WhenContains` methode, wat een sluiting is die zal worden uitgevoerd
wanneer de string de opgegeven waarde niet bevat.

### `WhenContainsAll`

De `WhenContainsAll` methode passeert de string naar de gegeven sluiting en retourneert de string als de opgegeven string
alle opgegeven waarden bevat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() "Hallo Bowen Han"
```

Indien nodig u kunt het derde argument opgeven aan de `WhenContainsAll` methode, dat een sluiting is die
wordt uitgevoerd wanneer de string niet alle opgegeven waarden bevat.

### 'Wanneer'

De `WhenEmpty` methode geeft de string door naar de gegeven sluiting en geeft de string terug als de ingevoerde string leeg is.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WanneerIsAscii`

De `WhenIsAscii` methode passeert de string naar de gegeven sluiting en retourneert de string als de gegeven string alleen
ASCII tekens bevat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("《").WhenIsAscii(func(s *str.String) *str.String {
    retourneert s.Append(" Framework")
}).String() // "~"
```

### 'Wanneer'

De `WhenNotEmpty` methode geeft de string door naar de gegeven sluiting en geeft de string terug als de gegeven string niet
leeg is.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `Wanneer StartsWith`

De `WhenStartsWith` methode geeft de string door naar de gegeven sluiting en retourneert de string als de ingevoerde string begint
met de opgegeven waarde.

```go
import "github.com/goravel/framework/support/str"

str.Of("hlo world").WhenStartsWith("hallo", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenEndsWith`

De `WhenEndsWith` methode passeert de string naar de gegeven sluiting en geeft de string terug als de string eindigt met
de opgegeven waarde.

```go
import "github.com/goravel/framework/support/str"

str.Of("hallo world").WhenEndsWith("wereld", func(s *str.String) *str.String {
    retourneert s.Title()
}).String() // "Hello World"
```

### 'WanneerExactly'

De `WhenExactly` methode passeert de string naar de gegeven sluiting en retourneert de string als de ingevoerde string precies
gelijk is aan de opgegeven waarde.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### 'WhenNotExactly'

De `WhenNotExactly` methode passeert de string naar de gegeven sluiting en retourneert de string als de ingevoerde string niet
exact gelijk is aan de opgegeven waarde.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `Wanneer`

De `WhenIs` methode geeft de string door naar de gegeven sluiting en retourneert de string als de ingevoerde string overeenkomt met het gegeven
patroon.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    retourneert s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WanneerIsUlid`

De `WhenIsUlid` methode passeert de string naar de gegeven sluiting en retourneert de string als de opgegeven string een ULID is.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6Z).WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z1Z6Z6"
```

### `WanneerIsUuid`

De `WhenIsUuid` methode geeft de string door naar de gegeven sluiting en geeft de string terug als de opgegeven string een UUID is.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### 'Wanneer'

De `WhenTest` methode geeft de string door naar de gegeven sluiting en retourneert de string als de opgegeven string overeenkomt met de
gegeven reguliere expressie.

```go
Import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

De `WordCount` methode retourneert het aantal woorden in de string.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello, World!").WordCount() // 2
```

### 'Woorden'

De `Words` methode beperkt het aantal woorden in de string. Indien nodig kan je het tweede argument gebruiken om
de tekenreeks te wijzigen die wordt gebruikt om de afwerking aan te geven.

```go
importeer "github.com/goravel/framework/support/str"

str.Of("Hello, World!").Words(1) // "Hello..."

str.Of("Hello, World!").Words(1, " (**)") // "Hello (******)"
```
