# Șiruri

Goravel oferă o bibliotecă fluentă de manipulare a șirurilor care îți permite să manipulezi cu ușurință șirurile. Fluent Șiruri
vă permite să combinați mai multe operațiuni de șiruri prin lanțarea metodei, unde majoritatea metodelor returnează o instanță
de `support/str. tring", lăsând lanţuri metode suplimentare. Pentru a obține valoarea finală a șirului după aplicarea operațiunilor chained
puteți apela metoda `String`, care returnează valoarea de bază `string\`.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Metode disponibile

### `OCE`

Metoda `Of` creează o nouă instanță de șir fluent dintr-un șir dat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `After`

Metoda `After` returnează porțiunea dintr-un șir care apare după o valoare specificată. Dacă valoarea este un şir gol
sau nu există în şirul original, întregul şir este returnat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // " World!"
```

### `AfterLast`

Metoda `AfterLast` returnează porțiunea dintr-un șir care apare după ultima apariție a unei valori specificate. Dacă
valoarea este un şir gol sau nu există în şirul original, întregul şir este returnat.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Anexă`

Metoda `Append` adaugă valoarea specificată la sfârşitul şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basename`

Metoda `Basename` returnează numele de urmărire al componentei unei căi, opțional eliminând un sufix specificat din numele de bază

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Înainte`

Metoda `Before` returnează partea dintr-un şir care apare înaintea unei valori specificate. Dacă valoarea este un șir
gol sau nu există în șirul original, întregul șir este returnat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Hello "
```

### `BeforeLast`

Metoda `BeforeLast` returnează porțiunea dintr-un șir care apare înainte de ultima apariție a unei valori specificate. Dacă
valoarea este un şir gol sau nu există în şirul original, întregul şir este returnat.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

Metoda `Between` returnează porțiunea dintr-un șir între două valori date.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Salut"
```

### `BetweenFirst`

Metoda `BetweenFirst` returnează partea dintr-un șir între prima apariție a două valori date.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Salut"
```

### `Camel`

Metoda `Camel` converteşte şirul în `camelCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

Metoda `CharAt` returnează caracterul la indexul dat. Dacă indexul este în afara limitelor, un şir gol va fi
returnat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

Metoda `ChopEnd` elimină valoarea(le) dată(e) de la sfârșitul șirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

Metoda `ChopStart` elimină valoarea(ile) dată de la începutul șirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Conţine`

Metoda `Conține` determină dacă șirul dat conține valoarea dată. Metoda este sensibilă. Dacă sunt furnizate valori
multiple, acesta va returna `true` dacă șirul conține oricare dintre valori.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Salut") // true
```

### `ContainsAll`

Metoda `ContainsAll` determină dacă șirul dat conține toate valorile date. Metoda este sensibilă.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirname`

Metoda `Dirname` returnează partea părinte a unei căi.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

Opţional, puteţi oferi nivelul directorului pentru a trasa din cale.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

Metoda `EndsWith` determină dacă șirul dat se termină cu valoarea dată. Metoda este sensibilă.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Puteți trece mai multe valori la metodă pentru a determina dacă șirul se termină cu oricare dintre valori.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exactly`

Metoda `Exactly` determină dacă şirul dat este exact egal cu valoarea dată. Metoda este sensibilă.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Except`

Metoda `Except` extrage un extras din şirul care se potriveşte cu prima apariţie a valorii date.

```go
import "github.com/goravel/framework/support/str"

str.Of("Aceasta este o dimineaţă frumoasă").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...este o dimineaţă frumoasă...
```

Adițional, puteți folosi opțiunea `Omission` pentru a schimba șirul care este folosit pentru a indica extrasul.

```go
import "github.com/goravel/framework/support/str"

str.Of("Aceasta este o frumoasă dimineaţă").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)este un morn(...)"
```

### `Explodă`

Metoda `Explodează` împarte şirul într-o serie de şiruri folosind delimitatorul dat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Salut", "World"}
```

### `Finish`

Metoda `Finish` asigură că șirul dat se termină cu valoarea dată. Dacă șirul se termină deja cu valoarea,
nu va fi adăugat din nou.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Headline`

Metoda `Headline` converteşte şirul într-un titlu.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `I`

Metoda `Is` determină dacă şirul dat se potriveşte cu modelul dat. Metoda este sensibilă.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

Metoda `IsEmpty` determină dacă şirul dat este gol.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

Metoda `IsNotEmpty` determină dacă șirul dat nu este gol.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

Metoda `IsAscii` determină dacă şirul dat conţine doar caractere ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> ").IsAscii() // false
```

### `IsSlice`

Metoda `IsSlice` determină dacă şirul dat este o felie.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "}`).IsSlice() // false
```

### `IsMap`

Metoda `IsMap` determină dacă şirul dat este o hartă.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

Metoda `IsUlid` determină dacă şirul dat este un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z6Z6Z6Z6Z1Z6Z6Z1Z6Z1Z1Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

Metoda `IsUuid` determină dacă şirul dat este un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

Metoda `Kebab` converteşte şirul în `kebab-case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

Metoda `LcFirst` converteşte primul caracter al şirului în litere mici.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Lungime`

Metoda `Lungime` returnează lungimea şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limit`

Metoda `Limit` trunchiază şirul la lungimea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Aceasta este o frumoasă dimineaţă").Limit(7).String() // "Asta este..."
```

Opţional, puteţi oferi al doilea argument pentru a schimba şirul folosit pentru a indica tracţiunea.

```go
import "github.com/goravel/framework/support/str"

str.Of("Aceasta este o frumoasă dimineaţă").Limit(7, " (****)").String() // "Aceasta este (****)"
```

### `Mai jos`

Metoda `Lower` converteşte şirul în litere mici.

```go
import "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

Metoda `LTrim` decupează partea stângă a şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Mask`

Metoda `Mask` maschează șirul cu personajul dat al masei.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**********"
```

Dacă este necesar, puteți oferi un număr negativ pentru a masca metoda care instruiește metoda de a începe să mascheze de la sfârșitul șirului
.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris************"
```

### `Potrivire`

Metoda `Potrivire` determină dacă şirul dat se potriveşte cu expresia regulată.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a (test) string").Match(`\([^)]+\)`).String() // (test)
```

### `MatchAll`

Metoda `MatchAll` determină dacă şirul dat se potriveşte cu toate expresiile regulate date.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

Metoda `IsMatch` determină dacă șirul dat se potrivește (din) cu o anumită expresie regulată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch(?i)goravel", `goravel!(.*)`) // true
```

### `NewLine`

Metoda `NewLine` adaugă un caracter nou la şir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

Metoda `PadBoth` cuprinde ambele părţi ale şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

Metoda `PadLeft` umple partea stângă a șirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

Metoda `PadRight` face pad-ul în partea dreaptă a șirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### `Conducta`

Metoda `Pipe` îți permite să transformi șirul folosind o anumită închidere.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Prepend`

Metoda `Prepend` pregăteşte valoarea dată şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Elimină`

Metoda `Elimină` elimină valoarea(valorii) dată (date) din șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hello "

str.Of("Hello World").Remove("World", "Hello").String() // "
```

### `Repetă`

Metoda "Repetă" repetă șirul de caractere de un anumit număr de ori.

```go
import "github.com/goravel/framework/support/str"

str.Of("a").Repetat(2).String() // "aa"
```

### `Înlocuiește`

Metoda `Înlocuiește` înlocuiește valoarea dată în șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("World", "Krishan").String() // "Hello Krishan"
```

În mod implicit, metoda `Înlocuiește` este de majuscule. Dacă doriţi ca metoda să fie sensibilă la majuscule, puteţi trece de
`false` ca al treilea argument.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("world", "Krishan", false).String() // "Hello Krishan"
```

### `Înlocuire`

Metoda \`Înlocuiește locul ultimei apariții a valorii date în șir numai dacă este la sfârșitul șirului

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `ReplaceFirst`

Metoda `ReplaceFirst` înlocuiește prima apariție a valorii date în șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Hello Goravel"
```

### `Înlocuiește`

Metoda `Înlocuiește ultimul` înlocuiește ultima apariție a valorii date în șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Hello Goravel"
```

### `ReplaceMatches`

Metoda `ReplaceMatches` înlocuiește expresia obișnuită dată se potrivește în șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Salut, Krishan!"
```

### `ReplaceStart`

Metoda `ReplaceStart` înlocuiește prima apariție a valorii date în șir numai dacă este la începutul lui
șirul.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

Metoda `RTrim` decupează partea dreaptă a şirului.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() /framework"
```

### `Snake`

Metoda `Snake` converteşte şirul în `snake_case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Split`

Metoda `Split` împarte şirul într-o serie de şiruri folosind delimitatorul dat.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Salut", "World"}
```

### `Squish`

Metoda `Squish` înlocuiește caracterele consecutive de spațiu alb cu un singur spațiu.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Start`

Metoda `Start` adaugă o singură instanță a valorii date la începutul șirului dacă nu începe deja
cu valoarea.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `StartsWith`

Metoda `StartsWith` determină dacă șirul dat începe cu (orice) valoare dată. Metoda este sensibilă.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Salut") // true
```

### `String`

Metoda `String` returnează şirul.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Studly`

Metoda `Studly` converteşte şirul în `StudlyCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

Metoda `Substr` returnează partea din şir începând de la indicele dat şi continuând pentru lungimea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

Metoda `Swap` schimbă valori multiple în șir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Du-te excelent"
```

### `Tap`

Metoda `Tap` trece şirul la închiderea dată şi returnează şirul.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Test`

Metoda `Test` determină dacă şirul dat se potriveşte cu expresia regulată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

Metoda `Title` converteşte şirul în `Title Case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Trim`

Metoda `Trim` decupează şirul.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

Metoda `UcFirst` convertește primul caracter al șirului în majusculă.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

Metoda `UcSplit` împarte șirul într-o serie de șiruri folosind caractere cu majuscule.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Fără excepţie`

Metoda `cu excepţia cazului în care " trece şirul la închiderea dată şi returnează şirul dacă condiţia dată este `false\`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Superior`

Metoda `Superior` converteşte şirul în majusculă.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `Când`

Metoda `Când` trece şirul la închiderea dată şi returnează şirul dacă condiţia dată este `true`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Dacă este necesar, puteți furniza al treilea argument metodei `Când` care este o închidere ce va fi executată atunci când condiția
este `false`.

### `WhenContains`

Metoda `WhenContains` trece șirul la închiderea dată și returnează șirul în cazul în care șirul dat conține valoarea dată
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Dacă este necesar, puteți furniza al treilea argument la metoda `CândContains` care este o închidere ce va fi executată
atunci când șirul nu conține valoarea dată.

### `WhenContainsAll`

Metoda `WhenContainsAll` trece șirul la închiderea dată și returnează șirul în cazul în care șirul dat conține
toate valorile date.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Dacă este necesar, puteți furniza al treilea argument la metoda `WhenContainsAll` care este o închidere care va fi executată
atunci când șirul nu conține toate valorile date.

### `WhenEmpty`

Metoda `WhenEmpty` trece șirul la închiderea dată și returnează șirul dacă șirul dat este gol.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

Metoda `WhenIsAscii` trece șirul la închiderea dată și returnează șirul dacă șirul dat conține doar
caractere ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> ").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "<unk> "
```

### `WhenNotEmpty`

Metoda `WhenNotEmpty` trece șirul la închiderea dată și returnează șirul dacă șirul dat nu este
gol.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsWith`

Metoda `WhenStartsWith` trece șirul la închiderea dată și returnează șirul dacă șirul dat începe
cu valoarea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `Când enEndsWith`

Metoda `WhenenddsWith` trece șirul la închiderea dată și returnează șirul dacă șirul dat se termină cu
valoarea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenExactly`

Metoda `WhenExactly` trece șirul la închiderea dată și returnează șirul dacă șirul dat este exact
egal cu valoarea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNotExactly`

Metoda `WhenNotExactly` trece șirul la închiderea dată și returnează șirul dacă șirul dat nu este
exact egal cu valoarea dată.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `WhenI`

Metoda `WhenIs` trece șirul la închiderea dată și returnează șirul dacă șirul dat se potrivește cu modelul
dat.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

Metoda `WhenIsUlid` trece șirul la închiderea dată și returnează șirul dacă șirul dat este un ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z6Z6Z1Z6Z1Z6Z6Z1Z6Z1Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z1Z66"
```

### `WhenIsUuid`

Metoda `WhenIsUuid` trece șirul la închiderea dată și returnează șirul dacă șirul dat este un UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `WhenTest`

Metoda `WhenTest` trece șirul la închiderea dată și returnează șirul în cazul în care șirul dat se potrivește cu
dată expresia regulată.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" este minunat")
}).String() // "goravel framework este minunat"
```

### `WordCount`

Metoda `WordCount` returnează numărul de cuvinte din şir.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, World!").WordCount() // 2
```

### `Words`

Metoda "Cuvinte" limitează numărul de cuvinte din şir. Dacă este necesar, puteți oferi al doilea argument pentru a schimba adresa
șirul folosit pentru a indica truncția.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bună, lume!").Words(1) // "Salut..."

str.Of("Bună, lume!").Words(1, " (****)") // "Bună (****)"
```
