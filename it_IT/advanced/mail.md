# Posta

Goravel può usare `facades.Mail()` per inviare facilmente la posta localmente.

## Configurazione

Prima di inviare un'email, è necessario configurare il file di configurazione `config/mail.go`.

## Invia Email

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Send()
```

## Invia Email Per Coda

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue()
```

Puoi anche personalizzare la coda:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Impostazione Mittente

Il framework utilizza `MAIL_FROM_ ADDRESS` e `MAIL_FROM_ NAME` nel file di configurazione `config/mail.go` come mittenti globali.
È anche possibile personalizzare il mittente, ma è necessario notare che l'indirizzo email deve essere coerente con il STMP configurato
:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Allegato([]string{"file.png"}).
  Content(mail.Html("<h1>Ciao Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Usare Mailable

I parametri dell'email possono essere impostati in una struttura `Mailable`. Queste strutture sono memorizzate nella directory `app/mails`.
Puoi creare rapidamente un `Mailable` usando il comando `make:mail` Artigiano:

```bash
go run . artigianale make:mail OrderShipped
```

La struttura `OrderShipped` generata è la seguente:

```go
importa "github. om/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 return &mail. ontent{Html: "<h1>Ciao Goravel</h1>"}
}

func (m *OrderShipped) Envelope() *mail. nvelope {
 return &mail.Envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  Da: mail.From{Indirizzo: "from@goravel. ev", Nome: "from"},
  Oggetto: "Goravel",
  A: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail. ueue{
    Connection: "redis",
    Coda: "mail",
  }
}
```

Quindi puoi usare il file `Mailalbe` nei metodi `Send` e `Queue`:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
