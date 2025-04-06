# Artisan Console

Artisan è lo strumento CLI che viene fornito con Goravel per interagire con la riga di comando. Puoi accedervi usando
`facades.Artisan()`. Questo strumento ha diversi comandi utili che possono aiutarvi nello sviluppo della vostra applicazione.
Utilizzare il seguente comando per visualizzare tutti i comandi disponibili.

```shell
go run . artisan list
```

Ogni comando ha anche una funzione "help" che mostra e spiega gli argomenti e le opzioni associati al comando. Per
vedere la schermata di aiuto, basta aggiungere "help" prima del nome del comando.

```shell
go run . artisan help migrate
```

Invece di ripetere `go run . comando artisan ...`, potresti voler aggiungere un alias alla tua configurazione di shell con il comando di terminale
qui sotto:

```shell
echo -e "\r\nalias artisan=\"go run . artisan\"" >>~/.zshrc
```

Quindi puoi semplicemente eseguire i tuoi comandi in questo modo:

```shell
artigianato make:controller DemoController
```

Puoi anche usare lo script di shell `artisan` in questo modo:

```shell
./artigianale make:controller DemoController
```

### Generazione Dei Comandi

Puoi usare il comando `make:command` per creare un nuovo comando nella directory `app/console/commands`. Non preoccuparti se
questa directory non esiste nella tua applicazione, verrà creata la prima volta che esegui il comando `make:command`:

```shell
go run . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Struttura Dei Comandi

Dopo aver generato il tuo comando, assegna valori adeguati alle proprietà della firma e della descrizione della struttura. Il metodo
`Handle` verrà chiamato quando il tuo comando viene eseguito. Devi implementare la tua logica in questo metodo.

```go
package comands

import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Firma Il nome e la firma del comando console.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Descrizione La descrizione del comando della console.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Estendi l'estensione del comando console.
func (receiver *SendEmails) comando Extend(). xtend {
  return command.Extend{}
}

// Gestisci Esegui il comando della console.
func (ricevitore *SendEmails) Errore Handle(ctx console.Context) {
  return nil
}
```

## Comando I/O

### Retrieving Input

Quando si scrivono i comandi della console, è tipico raccogliere l'input dell'utente attraverso `arguments` o `options`. With Goravel, it's
extremely easy to retrieve the arguments and options that the user provides.

#### Argomenti

Seguire gli argomenti dopo il comando:

```shell
go run . artisan send:emails NOME EMAIL
```

Get arguments:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Opzioni

Le opzioni, come gli argomenti, sono un'altra forma di input utente. Le opzioni sono prefissate da due trattini (--) quando sono fornite
tramite la riga di comando.

Definizione：

```go
func (receiver *ListCommand) Extend() command.Extend {
  return command. xtend{
    Flags: []command.Flag{
      &command. tringFlag{
        Name: "lang",
        Valore: "default",
        Aliases: []string{"l"},
        Utilizzo: "lingua per il saluto",
      },
    },
  }
}
```

Ottieni：

```go
func (receiver *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

Utilizzo：

```shell
go run . email artigianali --lang cinese
go run . email artigianali -l cinese
```

Avviso: Quando si utilizzano sia argomenti che opzioni, definire le opzioni prima degli argomenti. Esempio:

```shell
// Right
go run . artisan emails --lang=Chinese name
// Wrong
go run . artisan emails name --lang=Chinese name
```

Tranne `command.StringFlag`, possiamo anche usare altri tipi `Flag` e `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Prompting For Input

#### Far Domanda

Oltre agli argomenti e alle opzioni, si può anche chiedere all'utente di immettere durante l'esecuzione di un comando. Il metodo
`Ask` chiederà all'utente con la domanda data e restituirà la loro risposta:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  email, err := ctx.Ask("What is your email address?")
  
  return err
}
```

Inoltre, puoi passare le opzioni al metodo `Ask` come secondo argomento opzionale:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    name, err := ctx.Ask("Qual è il tuo nome?", console. skOption{
        Default: "Krishan",
    })
    
    return err
}

// Opzioni disponibili
type AskOption struct {
    // Predefinito il valore predefinito per l'input.
    Stringa predefinita
    // Descrizione della descrizione dell'input.
    Descrizione stringa
    // Linee il numero di righe per l'ingresso. usa per il testo di più righe)
    Linee int
    // Limita il limite di caratteri per l'ingresso.
    Limite int
    // Multiple determina se l'input è testo a riga singola o a righe multiple
    Bool multiplo
    // Segnala il segnaposto in ingresso.
    Stringa Segnaposto
    // Chiede il messaggio di richiesta. use for single line input)
    Prompt string
    // Convalida la funzione di convalida dell'input.
    Errore di convalida func(stringa)
}
```

A volte potrebbe essere necessario nascondere l'input dell'utente, ad esempio quando si richiede una password. Puoi usare il metodo `Secret` per
nascondere l'input dell'utente:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    password, err := ctx.Secret("What is the password?", console. ecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors. ew("la lunghezza della password deve essere almeno 8")
            }
            return nil
        },
    })
    
    return err
}

// Opzioni disponibili
type SecretOption struct {
    // Predefinito il valore predefinito per l'input.
    Stringa predefinita
    // Descrizione della descrizione dell'input.
    Stringa di descrizione
    // Limita il limite di caratteri per l'ingresso.
    Limite int
    // Segnala il segnaposto in ingresso.
    Stringa Segnaposto
    // Convalida la funzione di convalida dell'ingresso.
    Errore di convalida func(stringa)
}
```

#### Azioni Di Conferma

Se è necessario chiedere all'utente di confermare un'azione prima di procedere, è possibile utilizzare il metodo `Confirm`. Per impostazione predefinita, questo metodo
restituirà `false` a meno che l'utente non selezionerà l'opzione affermativa.

```go
if answer, _ := ctx.Confirm("Do you wish to continue?"); !answer {
    // ...
}
```

Puoi anche passare un secondo argomento al metodo `Confirm` per personalizzare il valore predefinito, l'etichetta dei pulsanti positivi e
negativi:

```go
if answer, _ := ctx.Confirm("Do you want to continue?", console. onfirmOption; ! nswer {
 Default : true,
 Affirmative : "Sì",
 Negativo : "No",
}) {
    // . .
}

// Opzioni disponibili
tipo ConfermaOpzione struct {
    // Etichetta adesiva per il pulsante affermativo.
    Stringa adesiva
    // Predefinito il valore predefinito per l'ingresso.
    Bool predefinito
    // Descrizione della descrizione dell'input.
    Descrizione stringa
    // Etichetta negativa per il pulsante negativo.
    Stringa negativa
}
```

#### Singola Seleziona Domande

Se hai bisogno di chiedere all'utente di selezionare un'opzione da un elenco di opzioni, puoi usare il metodo `Choice`. Il metodo `Choice`
restituirà il valore dell'opzione selezionata:

```go
domanda := "Qual è il tuo linguaggio di programmazione preferito?"
opzioni := []console. hoice{
    {Key: "go", Valore: "Go"},
    {Key: "php", Valore: "PHP"},
    {Key: "python", Valore: "Python"},
    {Key: "cpp", Valore: "C++", Selezionato: true},
}
colore, err := ctx. hoice(domanda, opzioni)
```

Inoltre, puoi passare le opzioni al metodo `Choice` come secondo argomento opzionale:

```go
domanda := "Qual è il tuo linguaggio di programmazione preferito?"
opzioni := []console. hoice{
    {Key: "go", Valore: "Go"},
    {Key: "php", Valore: "PHP"},
    {Key: "python", Valore: "Python"},
    {Key: "cpp", Valore: "C++", Selezionato: true},
}

colore, err := ctx. hoice(domanda, opzioni, console. hoiceOption{
    Default: "go",
})

// Opzioni disponibili
tipo ChoiceOption struct {
    // Predefinito il valore predefinito per l'input.
    Stringa predefinita
    // Descrizione della descrizione dell'input.
    Stringa di descrizione
    // Convalida la funzione di convalida dell'ingresso.
    Errore di convalida func(stringa)
}
```

#### Più Domande Di Selezione

Se devi chiedere all'utente di selezionare più opzioni da un elenco di opzioni, puoi usare il metodo `MultiSelect`. Il metodo
`MultiSelect` restituirà i valori delle opzioni selezionate:

```go
domanda := "Quali sono i tuoi linguaggi di programmazione preferiti?"
opzioni := []console. hoice{
    {Key: "go", Valore: "Go"},
    {Key: "php", Valore: "PHP"},
    {Key: "python", Valore: "Python"},
    {Key: "cpp", Valore: "C++", Selezionato: true},
}
colori, err := ctx. ultiSelect(domanda, opzioni)
```

Inoltre, puoi passare le opzioni al metodo `MultiSelect` come secondo argomento opzionale:

```go
domanda := "Quali sono i tuoi linguaggi di programmazione preferiti?"
opzioni := []console. hoice{
    {Key: "go", Valore: "Go"},
    {Key: "php", Valore: "PHP"},
    {Key: "python", Valore: "Python"},
    {Key: "cpp", Valore: "C++", Selezionato: true},
}

colori, err := ctx. ultiSelect(domanda, opzioni, console. ultiSelectOption{
    Default: []string{"go", "php"},
})

// Opzioni disponibili
tipo MultiSelectOption struct {
    // Predefinito il valore predefinito per l'input.
    Predefinito []string
    // Descrizione della descrizione dell'input.
    Stringa di descrizione
    // Filtrabile determina se le scelte possono essere filtrate, digita `/` per avviare il filtro.
    Bool filtrabile
    // Limita il numero di scelte selezionabili.
    Limit int
    // Convalida la funzione di convalida dell'input.
    Errore di convalida func([]string)
}
```

### Output Di Scrittura

A volte potrebbe essere necessario scrivere l'output sulla console. Goravel fornisce diversi metodi per aiutarvi a scrivere l'output
alla console. Ognuno del metodo ha la loro uscita colorata appropriata. Ad esempio, `Error` mostrerà il testo
in rosso.

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  ctx. omment("Questo è un messaggio di commento")
  ctx.Info("Questo è un messaggio informazione")
  ctx. rror("Questo è un messaggio di errore")
  ctx.Line("Questo è un messaggio di riga")
  ctx. arning("Questo è un messaggio di avvertimento")
  return nil
}
```

Puoi usare il metodo `NewLine` per scrivere una nuova riga sulla console:

```go
// scrivi una singola linea vuota
ctx.NewLine()

// scrivi più righe vuote
ctx.NewLine(2)
```

#### Barre Di Avanzamento

Per le attività di lunga durata, è spesso utile fornire all'utente qualche indicazione di quanto tempo il compito richiederà
. Puoi usare il metodo `WithProgressBar` per visualizzare una barra di avanzamento.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

A volte potrebbe essere necessario aggiornare manualmente la barra di avanzamento. Puoi usare il metodo `CreateProgressBar` per aggiornare la barra di avanzamento
:

```go
users := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range users {
    // process user
    bar. dvance()
 
 // sleep per un po 'per simulare l'elaborazione 
    volta. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Spinner

Se hai bisogno di visualizzare uno spinner mentre un task è in esecuzione, puoi usare il metodo `Spinner`.

```go
err := ctx.Spinner("Caricamento...", console. pinnerOption{
    Action: func() error {
        // when to stop the spinner
        time. leep(2 * tempo.Secondo)
        return nil
    },
})
```

## Categoria

È possibile impostare un insieme di comandi per la stessa categoria, comodo in `go run . elenco degli artigiani`:

```go
// Estendi l'estensione del comando console.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Categoria: "make",
  }
}
```

## Comandi Di Registrazione

Tutti i comandi della console devono essere registrati all'interno della funzione `Commands` in `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Esecuzione Programmatica Dei Comandi

A volte potresti voler eseguire un comando Artigiano al di fuori della CLI, puoi usare il metodo `Call` sulle `facciateformat@@0 di
. rtisan()` per operare questo.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("email --lang Chinese name") // Con argomenti e opzioni
})
```
