# Artisan Console

Artisan is het CLI-gereedschap dat wordt geleverd met Goravel voor interactie met de opdrachtregel. Je hebt toegang met
`facades.Artisan()`. Dit hulpprogramma heeft verschillende handige commando's die je kunnen helpen bij de ontwikkeling van je applicatie.
Gebruik de volgende opdracht om alle beschikbare commando's te bekijken.

```shell
uitvoeren . artiestenlijst uitvoeren
```

Elk commando heeft ook een "help"-functie die de argumenten en opties die zijn gekoppeld aan de opdracht laat zien en uitleggen. Om
het help scherm te zien, voeg gewoon "help" toe voor de command naam.

```shell
uitvoeren . Help met het migreren van artiesten
```

In plaats van `go run te herhalen. artisan ...` commando, je kan een alias toevoegen aan je shell configuratie met de
terminal opdracht:

```shell
echo -e "\r\nalias artisan=\"go run . artisan\"" >~/.zshrc
```

Dan kun je simpelweg je commando's zo uitvoeren:

```shell
artisan make:controller DemoController
```

Je kan ook het `artisan` shell script als volgt gebruiken:

```shell
./artisan make:controller DemoController
```

### Genereren van opdrachten

Je kunt het `make:command` commando gebruiken om een nieuw commando te maken in de `app/console/commands` map. Maak je geen zorgen als
deze map niet bestaat in jouw applicatie, het zal worden gemaakt de eerste keer dat je de `make:command` opdracht uitvoert:

```shell
uitvoeren . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Commando structuur

Na het genereren van de opdracht, wijs geschikte waarden toe aan de handtekening en beschrijving eigenschappen van de bouw. De
`Handle` methode zal worden aangeroepen wanneer je commando wordt uitgevoerd. U moet uw logica toepassen in deze methode.

```go
package commands

import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

type SendEmails bouwden {
}

// Ondertekening de naam en handtekening van de console opdracht.
func (ontvanger *SendEmails) Signature() string {
  return "send:emails"
}

// Beschrijving van de console-opdracht.
func (ontvanger *SendEmails) Description() string {
  retourneer "Send emails"
}

// Verbreek de console command extend.
func (ontvanger *SendEmails) Extend() commando. xtend {
  return command.Extend{}
}

// Handle Execute the console commando.
func (ontvanger *SendEmails) Handle(ctx console.Context) fout {
  return nil
}
```

## Commando I/O

### Retrieving Input

Wanneer je console-commando's schrijft, is het typisch om gebruikersinvoer te verzamelen via `arguments` of `options`. Met Goravel is het
extreem eenvoudig om de argumenten en opties van de gebruiker op te halen.

#### Argumenten

Volg de argumenten na de opdracht:

```shell
start . artisan send:email NAME E-MAIL
```

Get arguments:

```go
func (ontvanger *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  alles := ctx.Arguments()

  return nil
}
```

#### Instellingen

Opties, zoals argumenten, zijn een andere vorm van gebruikersinput. Opties zijn voorafgegaan door twee koppeltekens (--) wanneer ze verstrekt worden
via de opdrachtregel.

Definitie：

```go
func (ontvanger *ListCommand) Extend() command.Extend {
  return command. xtend{
    Vlags: []command.Flag{
      &command. tringFlag{
        Naam: "lang",
        Waarde: "standaard",
        Aliassen: []string{"l"},
        Gebruik: "taal voor de groet",
      },
    },
  }
}
```

Get：

```go
func (ontvanger *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

Usage：

```shell
run . artisan e-mails --lang Chinees
ga rennen. artisan e-mails -l Chinees
```

Let op: als u zowel argumenten als opties gebruikt, geef dan de opties op voor de argumenten. Voorbeeld:

```shell
// Right
go run . artisan emails --lang=Chinese naam
// Wrong
go run . artisan emails name --lang=Chinese naam
```

Behalve `command.StringFlag`, kunnen we ook een ander type `Flag` en `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `, `Int64SliceFlag\`.

### Vragen voor invoer

#### Vragen stellen

Naast argumenten en opties, kan je de gebruiker ook om invoer vragen tijdens de uitvoering van een commando. De
`Ask` methode zal de gebruiker om de gegeven vraag vragen vragen en hun antwoord retourneren:

```go
func (ontvanger *SendEmails) Handle(ctx console.Context) error {
  email, err := ctx.Ask("Wat is je emailadres?")
  
  return err
}
```

Daarnaast kan je opties aan de 'Ask'-methode doorgeven als optioneel tweede argument:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    name, err := ctx.Ask("What is your name?", console.AskOption{
        Default: "Krishan",
    })
    
    return err
}

// Available options
type AskOption struct {
    // Default the default value for the input.
    Default string
    // Description the input description.
    Description string
    // Lines the number of lines for the input.(use for multiple lines text)
    Lines int
    // Limit the character limit for the input.
    Limit int
    // Multiple determines if input is single line or multiple lines text
    Multiple bool
    // Placeholder the input placeholder.
    Placeholder string
    // Prompt the prompt message.(use for single line input)
    Prompt string
    // Validate the input validation function.
    Validate func(string) error
}
```

Soms moet je de gebruikersinvoer verbergen, zoals wanneer je om een wachtwoord vraagt. Je kunt de 'Geheim' methode gebruiken om
het gebruikersinvoer te verbergen:

```go
func (ontvanger *SendEmails) Handle(ctx console.Context) error {
    wachtwoord, err := ctx.Secret("Wat is het wachtwoord?", console. ecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors. (("lengte van het wachtwoord moet minimaal 8")
            }
            retourneert nil
        },
    })
    
    return err
}

// Beschikbare opties
type GeheimOptie struct {
    // Standaard de standaard waarde voor de invoer.
    Standaard string
    // Beschrijving van de invoerbeschrijving.
    Beschrijving string
    // Beperk de tekenlimiet voor de invoer.
    Limiet int
    // Plaats de input placeholder.
    Placeholder string
    // valideren de input validatie functie.
    Valideer functie(string) fout
}
```

#### Acties bevestigen

Als u de gebruiker wilt vragen een actie te bevestigen alvorens verder te gaan, kunt u de `Bevestigen` methode gebruiken. Standaard zal deze
methode `false` teruggeven, tenzij de gebruiker bevestigend selecteert.

```go
if antwoord, _ := ctx.Confirm("Wilt u doorgaan?"); !answer {
    // ...
}
```

Je kunt ook een tweede argument doorgeven aan de 'Bevestigen' methode om de standaardwaarde aan te passen, label van de bevestigende en
negatieve knoppen:

```go
if antwoord, _ := ctx.Confirm("Wilt u doorgaan?", console. onfirmOpe; ! Nswer {
 Standaard : waar,
 Affirmative : "Ja",
 Negatief : "Nee",
}) {
    // . .
}

// Beschikbare opties
type ConfirmOption struct {
    // Affirmative label voor de positieve knop.
    Affirmative string
    // Standaard de standaard waarde voor de invoer.
    Standaard Bool
    // Beschrijving van de invoerbeschrijving.
    Beschrijving string
    // Negatief label voor de negatieve knop.
    negatieve tekenreeks
}
```

#### Enkelvoudige selectie vragen

Als u de gebruiker wilt vragen een optie te selecteren uit een lijst met opties, dan kunt u de 'Keuze' methode gebruiken. De `Choice`
methode geeft de waarde van de geselecteerde optie terug:

```go
vraag := "Wat is je favoriete programmeertaal?"
opties := []console. hoice{
    {Key: "go", Waarde: "Go"},
    {Key: "php", Waarde: "PHP"},
    {Key: "python", Waarde: "Python"},
    {Key: "cpp", Waarde: "C++", Geselecteerd: true},
}
kleur, err := ctx. hoice(vraag, opties)
```

Daarnaast kunt u opties aan de 'Keuze' methode doorgeven als optioneel tweede argument:

```go
vraag := "Wat is je favoriete programmeertaal?"
opties := []console. hoice{
    {Key: "go", Waarde: "Go"},
    {Key: "php", Waarde: "PHP"},
    {Key: "python", Waarde: "Python"},
    {Key: "cpp", Waarde: "C++", Geselecteerd: true},
}

kleur, err := ctx. gat(vraag, opties, console. hoiceOption{
    Standaard: "go",
})

// Beschikbare opties
type ChoiceOptie struct {
    // Standaard de standaard waarde voor de invoer.
    Standaard string
    // Beschrijving van de invoerbeschrijving.
    Beschrijving string
    // Valideer de invoervalidatie functie.
    Valideer functie(string) fout
}
```

#### Vraag meervoudig selecteren

Als u de gebruiker wilt vragen om meerdere opties te selecteren uit een lijst met opties, kunt u de `MultiSelect` methode gebruiken. De
`MultiSelect` methode geeft de waarden van de geselecteerde opties terug:

```go
vraag := "Wat zijn uw favoriete programmeertalen?"
opties := []console. hoice{
    {Key: "go", Waarde: "Go"},
    {Key: "php", Waarde: "PHP"},
    {Key: "python", Waarde: "Python"},
    {Key: "cpp", Waarde: "C++", Geselecteerd: true},
}
kleuren, err := ctx. ultiSelect(vraag, opties)
```

Daarnaast kun je opties aan de 'MultiSelect'-methode doorgeven als optioneel tweede argument:

```go
vraag := "Wat zijn uw favoriete programmeertalen?"
opties := []console. hoice{
    {Key: "go", Waarde: "Go"},
    {Key: "php", Waarde: "PHP"},
    {Key: "python", Waarde: "Python"},
    {Key: "cpp", Waarde: "C++", Geselecteerd: true},
}

kleuren, err := ctx. ultiSelect(vraag, opties, console. ultiSelectOption{
    Standaard: []string{"go", "php"},
})

// Beschikbare opties
type MultiSelectOptie struct {
    // Standaard de standaard waarde voor de invoer.
    Standaard []string
    // Beschrijf de invoerbeschrijving.
    Beschrijving string
    // Filterbaar bepaalt of de keuzes gefilterd kunnen worden, typ `/` om het filter te starten.
    Filterable bool
    // Beperk het aantal keuzes dat geselecteerd kan worden.
    Limiet int
    // Valideer de input validation functie.
    Valideer functie([]string) fout
}
```

### Uitvoer schrijven

Soms moet u uitvoer naar de console schrijven. Goravel biedt verschillende methodes om je te helpen bij het schrijven van uitvoer
naar de console. Elk van de methode heeft zijn eigen gekleurde uitvoer. Bijvoorbeeld, `Fout` zal de
rode tekst tonen.

```go
func (ontvanger *SendEmails) Handle(ctx console.Context) error {
  ctx. omment("Dit is een reactiebericht")
  ctx.Info("Dit is een info-bericht")
  ctx. rror("Dit is een foutmelding")
  ctx.Line("Dit is een regelbericht")
  ctx. arning("Dit is een waarschuwingsbericht") retourneer
  nil
}
```

Je kunt de `NewLine` methode gebruiken om een nieuwe regel naar de console te schrijven:

```go
// Schrijf enkele lege regel
ctx.NewLine()

// schrijf meerdere blanco regels
ctx.NewLine(2)
```

#### Voortgang Balken

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. U kunt de `WithProgressBar` methode gebruiken om een voortgangsbalk weer te geven.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) fout {
    // performTask(item)
    return nil
})
```

Soms moet u de voortgangsbalk handmatig bijwerken. Je kunt de methode 'CreateProgressBar' gebruiken om de
progress bar bij te werken:

```go
users := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

voor _, gebruiker := range users {
    // proces gebruiker
    bar. dvance()
 
 // slaap voor een tijdje om verwerking 
    tijd te simuleren. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Spinner

Als je een spinner wilt weergeven terwijl een taak wordt uitgevoerd, kun je de `Spinner` methode gebruiken.

```go
err := ctx.Spinner("Laden...", console. pinnerOption{
    Action: func() error {
        // when to stop the spinner
        time. leep(2 * tijd.Second)
        retourneer nil
    },
})
```

## categorie

Je kunt een set commando's instellen op dezelfde categorie, handig in `go run . artiesten lijst`:

```go
// Verleng de console command extend.
func (ontvanger *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## Registreren Commando's

Al je console-commando's moeten worden geregistreerd binnen de `Commands` functie in `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Programmatisch uitvoeren van commando's

Soms kunt u een Artisan commando buiten de CLI uitvoeren, u kunt de `Call` methode gebruiken op de
`facades. rtisan()` om dit te bedienen.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinees naam") // met argumenten en opties
})
```
