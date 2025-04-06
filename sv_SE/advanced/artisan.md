# Artisan Console

Artisan är CLI-verktyget som kommer med Goravel för att interagera med kommandoraden. Du kan komma åt den med
`fasads.Artisan()`. Detta verktyg har flera användbara kommandon som kan hjälpa dig i utvecklingen av din ansökan.
Utnyttja följande kommando för att visa alla tillgängliga kommandon.

```shell
gå kör. hantverkslista
```

Varje kommando har också en "hjälp"-funktion som visar och förklarar de argument och alternativ som är kopplade till kommandot. Till
se hjälpskärmen, lägg bara till "help" innan kommandonamnet.

```shell
gå kör. hantverkare hjälp migrera
```

Istället för att upprepa `go run. hantverkare ...` kommando, kanske du vill lägga till ett alias till din skalkonfiguration med kommandot
terminalen nedan:

```shell
eko -e "\r\nalias artisan=\"go run . artisan\"" >>~/.zshrc
```

Då kan du helt enkelt köra dina kommandon så här:

```shell
hantverkare make:controller DemoController
```

Du kan också använda `artisan` skalskript så här:

```shell
./hantverkare make:controller DemoController
```

### Genererar kommandon

Du kan använda kommandot `make:command` för att skapa ett nytt kommando i katalogen `app/console/commands`. Oroa dig inte om
denna katalog inte finns i din applikation, den kommer att skapas första gången du kör kommandot `make:command`:

```shell
gå kör. artisan make:command SendEmails
gå kör. artisan make:command user/SendEmails
```

### Kommando Struktur

Efter att ha genererat ditt kommando, tilldela lämpliga värden till signatur och beskrivningsegenskaper för strukturen.
`Handle`-metoden kommer att anropas när ditt kommando körs. Du måste implementera din logik i denna metod.

```go
paketkommandon

import (
  "github.com/goravel/frameing/contracts/console"
  "github. om/goravel/framey/contracts/console/command"
)

type SendEmails struct {
}

// Signatur Konsolkommandots namn och signatur.
func (receiver *SendEmails) Signatur() sträng {
  returnera "skicka:emails"
}

// Beskrivning Konsolkommandot beskrivning.
func (receiver *SendEmails) Beskrivning() sträng {
  returnera "Skicka e-postmeddelanden"
}

// Utöka kommandot Console förlänga.
func (mottagare *SendEmails) Extend() kommando. xtend {
  returkommando.Extend{}
}

// Hantera Utför konsolkommandot.
func (receiver *SendEmails) Handtag(ctx console.Context) fel {
  return nil
}
```

## Kommando I/O

### Retrieving Input

När du skriver konsolkommandon är det typiskt att samla in användarindata genom `arguments` eller `options`. Med Goravel är det
extremt lätt att hämta de argument och alternativ som användaren tillhandahåller.

#### Argument

Följ argumenten efter kommandot:

```shell
gå kör. hantverkare skickar: e-post NAMN EMAIL
```

Get arguments:

```go
func (receiver *SendEmails) Handtag(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Alternativ

Alternativ, som argument, är en annan form av användarinmatning. Alternativen föregås av två bindestreck (--) när de tillhandahålls
via kommandoraden.

Definition：

```go
func (receiver *ListCommand) Extend() kommando.Utöka {
  returkommando. xtend{
    Flaggor: []command.Flag{
      &command. tringFlag{
        Namn: "lang",
        Värde: "default",
        Alias: []string{"l"},
        Användning: "språk för hälsning",
      },
    },
  }
}
```

Skaffa：

```go
func (receiver *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

Användning：

```shell
gå kör. hantverkare e-post --lang Kinesiska
gå kör. hantverkare e-post -l Kinesiska -l
```

Observera: När du använder både argument och alternativ, ange alternativen före argumenten. Exempel:

```shell
// Höger
gå köra . hantverkare e-post --lang=Kinesiska namn
// Fel
gå köra . hantverkare e-post namn --lang=Kinesiska namn
```

Förutom `command.StringFlag`, kan vi också använda andra typer `Flag` och `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Fråga för inmatning

#### Frågar frågor

Förutom argument och alternativ kan du också uppmana användaren att skriva in under körning av ett kommando.
`Ask`-metoden kommer att uppmana användaren med den givna frågan och returnera sitt svar:

```go
func (receiver *SendEmails) Hantera (ctx console.Context) error {
  email, err := ctx.Ask("Vad är din e-postadress?")
  
  return err
}
```

Dessutom kan du skicka alternativ till `Ask`-metoden som valfritt andra argument:

```go
func (receiver *SendEmails) Handtag(ctx console.Context) error {
    name, err := ctx.Ask("Vad är ditt namn?", konsol. skOption{
        Standard: "Krishan",
    })
    
    return err
}

// Available options
type AskOption struct {
    // Default the default value for the input.
    Standardsträng
    // Beskrivning av inmatningsbeskrivningen.
    Beskrivning sträng
    // Linjer antalet rader för inmatningen. använd för flera raders text)
    rader int
    // Begränsa teckengränsen för inmatningen.
    Limit int
    // Multipel avgör om inmatningen är en rad eller flera rader text
    Multipel Bool
    // Platshållare ingången platshållare.
    Platshållare sträng
    // Förstärk meddelandet. använd för enkel radingång)
    Prompt-sträng
    // Validera valideringsfunktionen.
    Validera funktion(sträng) fel
}
```

Ibland kan du behöva dölja användarens indata, till exempel när du ber om ett lösenord. Du kan använda `Secret`-metoden för att
dölja användarinmatningen:

```go
func (receiver *SendEmails) Handtag(ctx console.Context) error {
    password, err := ctx.Secret("Vad är lösenordet?", konsol. ecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                returnera fel. ew("Lösenordet längd bör vara minst 8")
            }
            return nil
        },
    })
    
    return err
}

// Tillgängliga alternativ
type SecretOption struct {
    // Default the default value for the input.
    Standardsträng
    // Beskrivning av inmatningsbeskrivningen.
    Beskrivning sträng
    // Begränsa teckengränsen för inmatningen.
    Limit int
    // Placeholder the input placeholder.
    Platshållare sträng
    // Validera valideringsfunktionen.
    Validera funktion(sträng) fel
}
```

#### Bekräftar åtgärder

Om du behöver be användaren att bekräfta en åtgärd innan du fortsätter, kan du använda `Confirm`-metoden. Som standard kommer denna
metod returnera `false` om inte användaren väljer affirmativ alternativ.

```go
om svar, _ := ctx.Confirm("Vill du fortsätta?"); !answer {
    // ...
}
```

Du kan också skicka ett andra argument till `Confirm`-metoden för att anpassa standardvärdet, etikett för affirmativa och
negativa knappar:

```go
om svaret, _ := ctx.Confirm("Vill du fortsätta?", konsol. onfirmOption; ! nswer {
 Standard: true,
 Beirmative : "Ja",
 Negativ : "Nej",
}) {
    // . .
}

// Tillgängliga alternativ
type ConfirmOption struct {
    // Reirmative label for the affirmative button.
    Reirmativ sträng
    // Standard standardvärdet för inmatningen.
    Standard Bool
    // Beskrivning av inmatningsbeskrivningen.
    Beskrivning sträng
    // Negativ etikett för den negativa knappen.
    Negativ sträng
}
```

#### Enstaka frågor

Om du behöver be användaren att välja ett alternativ från en lista med alternativ kan du använda `Choice`-metoden. `Choice`
metoden kommer att returnera värdet för det valda alternativet:

```go
fråga := "Vilket är ditt favoritprogrammeringsspråk?"
alternativ := []console. hoice{
    {Key: "go", Värde: "Go"},
    {Key: "php", Värde: "PHP"},
    {Key: "python", Värde: "Python"},
    {Key: "cpp", Värde: "C++", Vald: true},
}
färg, err := ctx. hoice(fråga, alternativ)
```

Dessutom kan du skicka alternativ till `Choice`-metoden som valfritt andra argument:

```go
fråga := "Vilket är ditt favoritprogrammeringsspråk?"
alternativ := []console. hoice{
    {Key: "go", Värde: "Go"},
    {Key: "php", Värde: "PHP"},
    {Key: "python", Värde: "Python"},
    {Key: "cpp", Värde: "C++", Vald: true},
}

färg, err := ctx. hoice (fråga, alternativ, konsol. hoiceOption{
    Standard: "gå",
})

// Tillgängliga alternativ
typ ChoiceOption struct {
    // Standard standardvärdet för inmatningen.
    Standardsträng
    // Beskrivning av inmatningsbeskrivningen.
    Beskrivning sträng
    // Validera valideringsfunktionen.
    Validera funktion(sträng) fel
}
```

#### Flera utvalda frågor

Om du behöver be användaren att välja flera alternativ från en lista med alternativ, kan du använda `MultiSelect`-metoden.
`MultiSelect`-metoden kommer att returnera värdena för de valda alternativen:

```go
fråga := "Vilka är dina favoritprogrammeringsspråk?"
alternativ := []console. hoice{
    {Key: "go", Värde: "Go"},
    {Key: "php", Värde: "PHP"},
    {Key: "python", Värde: "Python"},
    {Key: "cpp", Värde: "C++", Vald: true},
}
färger, err := ctx. ultiSelect(fråga, alternativ)
```

Dessutom kan du skicka alternativ till `MultiSelect`-metoden som valfritt andra argument:

```go
fråga := "Vilka är dina favoritprogrammeringsspråk?"
alternativ := []console. hoice{
    {Key: "go", Värde: "Go"},
    {Key: "php", Värde: "PHP"},
    {Key: "python", Värde: "Python"},
    {Key: "cpp", Värde: "C++", Vald: true},
}

färger, err := ctx. ultiSelect(fråga, alternativ, konsol. ultiSelectOption{
    Standard: []string{"go", "php"},
})

// Tillgängliga alternativ
typ MultiSelectOption struct {
    // Standard standardvärdet för inmatningen.
    Standard []sträng
    // Beskrivning av inmatningsbeskrivningen.
    Beskrivning sträng
    // Filtrerbar avgör om valen kan filtreras, skriv `/` för att starta filtret.
    Filterbar bool
    // Begränsa antalet val som kan väljas.
    Limit int
    // Validera valideringsfunktionen.
    Validera funktion([]string) fel
}
```

### Skriver utdata

Ibland kan du behöva skriva utdata till konsolen. Goravel ger flera metoder för att hjälpa dig att skriva utdata
till konsolen. Var och en av metoden har deras lämpliga färgad utgång. Till exempel kommer `Error` att visa texten
i rött.

```go
func (receiver *SendEmails) Handtag(ctx console.Context) error {
  ctx. omment("Detta är ett kommentarsmeddelande")
  ctx.Info("Detta är ett informationsmeddelande")
  ctx. rror("Detta är ett felmeddelande")
  ctx.Line("Detta är ett radmeddelande")
  ctx. arning("Detta är ett varningsmeddelande")
  return nil
}
```

Du kan använda `NewLine`-metoden för att skriva en ny rad till konsolen:

```go
// skriv en blank rad
ctx.NewLine()

// skriv flera tomma rader
ctx.NewLine(2)
```

#### Framsteg staplar

För långvariga uppgifter är det ofta bra att ge användaren viss indikation på hur lång tid uppgiften kommer att ta
. Du kan använda `WithProgressBar`-metoden för att visa en förloppsindikator.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

Ibland kan du behöva uppdatera förloppsindikatorn manuellt. Du kan använda `CreateProgressBar`-metoden för att uppdatera
förloppsindikatorn:

```go
användare := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

för _, användare := range users {
    // process user
    bar. dvance()
 
 // sova ett tag för att simulera bearbetning 
    tid. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Spinnare

Om du behöver visa en spinnare medan en uppgift körs, kan du använda `Spinner`-metoden.

```go
err := ctx.Spinner("Laddar...", konsol. pinnerOption{
    Åtgärd: func() error {
        // when to stop the spinner
        time. leep(2 * time.Second)
        return nil
    },
})
```

## Kategori

Du kan ställa in en uppsättning kommandon till samma kategori, bekvämt i `go run . hantverkarlista`:

```go
// Förläng konsolkommandot förlängning.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Kategori: "make",
  }
}
```

## Registrerar kommandon

Alla dina konsolkommandon måste registreras i funktionen `Kommands` i `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Programmatiskt Utför kommandon

Ibland kanske du vill köra ett Artisan-kommando utanför CLI, kan du använda `Call`-metoden på
`fasader. rtisan()` för att hantera detta.

```go
facades.Route().Get("/", func(c *gin.Context) {
  fasader.Artisan().Samtal ("e-post")
  fasader.Artisan().Samtal ("e-post --lang kinesiskt namn") // Med argument och alternativ
})
```
