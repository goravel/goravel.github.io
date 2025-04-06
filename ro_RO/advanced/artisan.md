# Artisan Console

Artizan este instrumentul CLI care vine cu Goravel pentru a interacționa cu linia de comandă. Îl puteţi accesa folosind
`facades.Artisan()`. Acest instrument are mai multe comenzi utile care te pot ajuta în dezvoltarea aplicației tale.
Foloseste urmatoarea comanda pentru a vedea toate comenzile disponibile.

```shell
mergi să rulezi . lista artizană
```

Fiecare comandă are de asemenea o caracteristică de "ajutor" care arată şi explică argumentele şi opţiunile asociate comenzii. Pentru
a vedea ecranul de ajutor, doar adaugă "ajutor" înainte de numele comenzii.

```shell
mergi să rulezi . artizan ajutor migrare
```

În loc să se repete `go run . comandă artizanală ...`, poate doriţi să adăugaţi un alias la configuraţia shell cu comanda
terminal de mai jos:

```shell
echo -e "\r\nalias artisan=\"mergi să rulezi . artisan\"" >>~/.zshrc
```

Apoi poți pur și simplu să rulezi comenzile astfel:

```shell
Mărcă artizanală:controller DemoController
```

Poți folosi, de asemenea, scriptul de shell `artisan` în felul următor:

```shell
./com. artizan:controller DemoController
```

### Generare comenzi

Poți folosi comanda `make:command` pentru a crea o nouă comandă în directorul `app/consolă/comandă`. Nu-ți face griji dacă
acest director nu există în aplicația ta, va fi creat prima dată când rulezi comanda `make:command`:

```shell
mergi să rulezi . artisan:command SendEmails
mergi să rulezi . artizan:command user/SendEmails
```

### Structură de comandă

După generarea comenzii, atribuiți valori adecvate semnăturii și descrierii proprietăților de șubred. Metoda
`Handle` va fi apelată atunci când comanda este executată. Trebuie să implementezi logica ta în această metodă.

```go
package commands

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Signature The name and signature of the console command.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Description The console command description.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Extend The console command extend.
func (receiver *SendEmails) Extend() command.Extend {
  return command.Extend{}
}

// Handle Execute the console command.
func (receiver *SendEmails) Handle(ctx console.Context) error {
  return nil
}
```

## Comanda I/O

### Retrieving Input

Când scrii comenzi de consolă, este tipic să colectezi datele utilizatorului prin `arguments` sau `options`. Cu Goravel, este
extrem de uşor să recuperezi argumentele şi opţiunile pe care le oferă utilizatorul.

#### Argumente

Urmărește argumentele după comandă:

```shell
mergi să rulezi . artizan:emails NAME EMAIL
```

Get arguments:

```go
func (receptor *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  e-mail := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Opţiuni

Opțiunile, ca și argumentele, reprezintă o altă formă de introducere a utilizatorului. Opțiunile sunt prestabilite de două cratime (--) atunci când sunt furnizate
prin linia de comandă.

Definiție：

```go
func (receptor *ListCommand) Extend() command.Extinde {
  comanda return command. xtend{
    Flags: []command.Flag{
      &command. tringFlag{
        Nume: "lang",
        Valoare: "implicit",
        Aliases: []string{"l"},
        Utilizare: „limba pentru salutare”,
      },
    },
  }
}
```

Obține：

```go
func (receptor *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

Utilizare：

```shell
accesați . e-mailuri artizanale --lang chinezesc
mergi să rulezi . e-mailuri artizane l chinezesc
```

Atenție: Atunci când se utilizează ambele argumente și opțiuni, se definesc opțiunile de dinaintea argumentelor. Exemplu:

```shell
// Right
go go run . artisan emails --lang=nume chinezesc
// Wrong
go run . artisan emails name --lang=Chinese name
```

Cu excepția `command.StringFlag`, putem folosi și alt tip `Flag` și `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`, `Int64SliceFlag`.

### Se solicită intrări

#### Cere Întrebări

În plus față de argumente și opțiuni, poți de asemenea să îl înștiințezi pe utilizator în timpul executării unei comenzi. Metoda
`Ask` va determina utilizatorul cu întrebarea dată şi va returna răspunsul lor:

```go
func (receptor *SendEmails) Handle(ctx console.Context) eroare {
  email, err := ctx.Ask("Care este adresa dvs. de e-mail?")
  
  return err
}
```

Adițional, puteți trece opțiuni la metoda `Ask` ca al doilea argument opțional:

```go
func (receptor *SendEmails) Handle(ctx console.Context) error {
    name, err := ctx.Ask("Care este numele tău?", consolă. skOption{
        Implicit: "Krishan",
    })
    
    return err
}

// Opțiuni disponibile
tip AskOption struct {
    // Implicit valoarea implicită pentru intrare.
    Șirul implicit
    // Descriere descrierea intrării.
    Descrierea șirului
    // Liniază numărul de linii pentru intrare. utilizează pentru mai multe linii text)
    Linii int
    // Limitează limita de caractere pentru intrare.
    Limita int
    // Multiple determină dacă intrarea este o singură linie sau mai multe linii de text
    Multiple bool
    // Înlocuiește substituentul.
    Substituent șirul
    // Solicită mesajul prompt. utilizați pentru introducerea unei singure linii)
    Prompt șir
    // Validați funcția de validare a intrării.
    Validare funcție (șir) eroare
}
```

Uneori poate fi necesar să ascundeți datele de intrare ale utilizatorului, cum ar fi atunci când solicitați o parolă. Poți folosi metoda `Secre` pentru a
ascunde datele utilizatorului:

```go
func (receptor *SendEmails) Handle(ctx console.Context) error {
    password, err := ctx.Secret ("Care este parola?", consolă. ecretOption{
        Validate: func (s string) error {
            dacă lenjeria < 8 {
                returnează erori. ew("lungimea parolei trebuie să fie cel puțin 8")
            }
            returnează nil
        },
    })
    
    return err
}

// Opţiunile disponibile tip
Opţiune structă {
    // Implicit valoarea implicită pentru intrare.
    Șirul implicit
    // Descriere descrierea intrării.
    Descriere şir
    // Limitează limita de caractere pentru intrare.
    Limita de intrare
    // Înlocuiește substituentul.
    Șirul substituent
    // Validează funcția de validare a intrării.
    Validare funcție (șir) eroare
}
```

#### Confirmă Acțiuni

Dacă trebuie să cereți utilizatorului să confirme o acțiune înainte de a continua, puteți folosi metoda `Confirm`. În mod implicit, această metodă
va returna `false` cu excepția cazului în care utilizatorul selectează opțiunea pozitivă.

```go
dacă răspundeți, _ := ctx.Confirm("Doriți să continuați?"); !răspuns {
    // ...
}
```

De asemenea, puteţi trece un al doilea argument la metoda `Confirm` pentru a personaliza valoarea implicită, eticheta butoanelor pozitive şi
negative:

```go
dacă răspundeți, _ := ctx.Confirm("Doriți să continuați?", consolă. onfirmOpce; nswer {
 Implicit: true,
 Affirmative: "Da",
 Negativ: "Nu",
}) {
    // . .
}

// Opțiunile disponibile
tip Confirmare strucționată {
    // Eticheta pozitivă a butonului pozitiv.
    Șirul comercial
    // Implicit valoarea implicită pentru intrare.
    Implicit bool
    // Descriere descrierea intrării.
    Descriere sir
    // Etichetă negativă pentru butonul negativ.
    Șir negativ
}
```

#### Selectare singură Întrebări

Dacă trebuie să cereți utilizatorului să selecteze o opțiune dintr-o listă de opțiuni, puteți utiliza metoda `Choice`. Metoda `Choice`
va returna valoarea opțiunii selectate:

```go
Întrebarea := "Care este limbajul preferat de programare?"
opţiuni := []consolă. hoice{
    {Key: "go", Value: "Go"},
    {Cheie: "php", valoare: "PHP"},
    {Cheie: "python", Valoare: "Python"},
    {Cheie: "cpp", valoare: "C++", selectate: true},
}
culoare, err := ctx. hoice(întrebare, opțiuni)
```

Adițional, puteți trece opțiuni la metoda `Choice` ca al doilea argument opțional:

```go
Întrebarea := "Care este limbajul preferat de programare?"
opţiuni := []consolă. hoice{
    {Key: "go", Value: "Go"},
    {Cheie: "php", valoare: "PHP"},
    {Cheie: "python", Valoare: "Python"},
    {Cheie: "cpp", valoare: "C++", selectate: true},
}

culoare, err := ctx. hoice(întrebare, opțiuni, consolă. hoiceOption{
    Default: "go",
})

// Opţiunile disponibile
tip Opţiune selectată {
    // Implicit valoarea implicită pentru intrare.
    Șirul implicit
    // Descriere descrierea intrării.
    Descriere șir
    // Validați funcția de validare a intrării.
    Validare funcţie (şir) eroare
}
```

#### Selectați mai multe întrebări

Dacă aveţi nevoie să cereţi utilizatorului să selecteze mai multe opţiuni dintr-o listă de opţiuni, puteţi utiliza metoda `MultiSelect`. Metoda
`MultiSelect` va returna valorile opțiunilor selectate:

```go
Întrebarea := "Care sunt limbile tale preferate de programare?"
opţiuni := []consolă. hoice{
    {Key: "go", Value: "Go"},
    {Cheie: "php", valoare: "PHP"},
    {Cheie: "python", Valoare: "Python"},
    {Cheie: "cpp", valoare: "C++", selectate: true},
}
culori, err := ctx. ultiSelect(întrebare, opțiuni)
```

Adițional, puteți trece opțiuni la metoda `MultiSelect` ca al doilea argument opțional:

```go
Întrebarea := "Care sunt limbile tale preferate de programare?"
opţiuni := []consolă. hoice{
    {Key: "go", Value: "Go"},
    {Cheie: "php", valoare: "PHP"},
    {Cheie: "python", Valoare: "Python"},
    {Cheie: "cpp", valoare: "C++", selectate: true},
}

culori, err := ctx. ultiSelect(întrebare, opțiuni, consolă. ultiSelectOption{
    Implicit: []string{"go", "php"},
})

// Opţiunile disponibile
tip MultiSelectOption struct {
    // Implicit valoarea implicită pentru intrare.
    Implicit []șir
    // Descriere descriere intrare.
    Textul de descriere
    // determină dacă opțiunile pot fi filtrate, tastați `/` pentru a începe filtrul.
    bool filtrabil
    // Limitează numărul de opțiuni care pot fi selectate. Limita
    int
    // Validați funcția de validare de intrare.
    Funcţie validată ([]string) eroare
}
```

### Ieșire din scris

Uneori ar putea fi necesar să scrieți ieșiri în consolă. Goravel oferă consolei mai multe metode de a te ajuta în scrierea output-ului
. Fiecare metodă are rezultatul lor colorat corespunzător. De exemplu, `Error` va afișa textul
în roșu.

```go
eroare func (receptor *SendEmails) Handle(ctx console.Context) {
  ctx. omment("Acesta este un mesaj de comentarii")
  ctx.Info("Acesta este un mesaj de informare")
  ctx. rror("Acesta este un mesaj de eroare")
  ctx.Line("Acesta este un mesaj de linie")
  ctx. arning("Acesta este un mesaj de avertizare")
  returnează nil
}
```

Puteţi utiliza metoda `NewLine` pentru a scrie o nouă linie în consolă:

```go
// scrie o linie singură necompletată
ctx.NewLine()

// scrie mai multe linii libere
ctx.NewLine(2)
```

#### Bare de progres

Pentru sarcini de lungă durată, este adesea util să se ofere utilizatorului indicații cu privire la timpul pe care sarcina îl va lua
. Puteţi utiliza metoda `Retrage ProgressBar` pentru a afişa o bară de progres.

```go
item:= []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

Uneori poate fi nevoie să actualizezi manual bara de progres. Poți folosi metoda `CreateProgressBar` pentru a actualiza bara de progres
:

```go
utilizatori := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

pentru _, user := range users {
    // process user
    bar. dvance()
 
 dorm pentru o perioadă de timp pentru a simula procesarea 
    timp. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Învârtire

Dacă aveţi nevoie să afişaţi un spinner în timp ce o sarcină rulează, puteţi utiliza metoda `Spinner`.

```go
err := ctx.Spinner("Loading...", console.SpinnerOption{
    Action: func() error {
        // when to stop the spinner
        time.Sleep(2 * time.Second)
        return nil
    },
})
```

## Categorie

Poți seta un set de comenzi la aceeași categorie, convenabil în \`go run . lista artizanală':

```go
// Extinde comanda extend consola.
func (receptor *ConsoleMakeCommand) Extend() command.Extinde {
  return command.Extend{
    Category: "make",
  }
}
```

## Comenzi de înregistrare

Toate comenzile de consolă trebuie să fie înregistrate în cadrul funcţiei `Commands` din `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Executarea Programatică a Comenzilor

Uneori poate doriți să executați o comandă artizană în afara CLI, puteți utiliza metoda `Call` pe
`fațades. rtian()` pentru a opera acest lucru.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  faades.Artisan().Call("emails --lang Nume chinezesc") // Cu argumente și opțiuni
})
```
