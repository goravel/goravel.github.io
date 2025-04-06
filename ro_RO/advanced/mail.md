# E-mail

Goravel poate folosi `facades.Mail()` pentru a trimite cu ușurință mail local.

## Configurare

Înainte de a trimite un e-mail, trebuie să configurați fișierul de configurare `config/mail.go`.

## Trimite Mail

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subiect ("Subject
  Send()
```

## Trimite email prin coadă

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subiect ("Subject
  Que(Queu)
```

De asemenea, poți personaliza coada:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@exemplu@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subiect ("Subject
  Queu(mail.re)("Queu)(Connece)("Queu)"mail")"))".dis))
```

## Setare expeditor

Framework folosește `MAIL_FROM_ ADDRESS` și `MAIL_FROM_ NAME` în fișierul de configurare `config/mail.go` ca expeditori globali.
De asemenea, puteți personaliza expeditorul, dar trebuie să rețineți că adresa de e-mail trebuie să fie în concordanță cu cea configurată
STMP:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subiect ("Subiect").
  coada (mail.Queue().Connection("redis").Coada ("mail"))
```

## Folosind Mailable

Parametrii e-mailului pot fi setați într-un mod `Mailable`. Aceste lovituri sunt stocate în folderul `app/mails`.
Puteți crea rapid un `Mailable` folosind comanda `make:mail` Artizanal:

```bash
mergi să rulezi . make:mail OrderShiped
```

Sistemul `OrderShipped` generat este următorul:

```go
import "github.com/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{"../logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 return &mail.Content{Html: "<h1>Hello Goravel</h1>"}
}

func (m *OrderShipped) Envelope() *mail.Envelope {
 return &mail.Envelope{
  Bcc:     []string{"bcc@goravel.dev"},
  Cc:      []string{"cc@goravel.dev"},
  From:    mail.From{Address: "from@goravel.dev", Name: "from"},
  Subject: "Goravel",
  To:      []string{"to@goravel.dev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail.Queue{
    Connection: "redis",
    Queue:      "mail",
  }
}
```

Apoi puteţi utiliza metodele `Mailalbe` în metodele `Send` şi \`Coadă":

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
