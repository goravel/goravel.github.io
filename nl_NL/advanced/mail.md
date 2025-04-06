# E-mailen

Goravel kan `facades.Mail()` gebruiken om gemakkelijk lokaal e-mail te versturen.

## Configuratie

Voordat u een e-mail verstuurt, moet u het `config/mail.go` configuratiebestand configureren.

## E-mail verzenden

```go
importeer "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Send()
```

## Stuur e-mail per wachtrij

```go
importeer "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue()
```

U kunt ook de wachtrij aanpassen:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html(<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Connection("mail.reQudis)"mail)"mail.eue)"). ("mail)")
```

## Afzender instellen

Framework gebruikt `MAIL_FROM_ ADDRESS` en `MAIL_FROM_ NAME` in het `config/mail.go` configuratiebestand als globale afzenders.
U kunt ook de afzender aanpassen, maar u moet weten dat het e-mail adres consistent moet zijn met de geconfigureerde
STMP:

```go
importeer "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Bijlage ([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Mailable gebruiken

De parameters van de e-mail kunnen worden ingesteld in een `Mailable` structuur. Deze constructies worden opgeslagen in de `app/mails` map.
Je kunt snel een `Mailable` aanmaken door het `make:mail` Artisan commando te gebruiken:

```bash
uitvoeren . artisan make:mail OrderVerzonden
```

De gegenereerde `OrderShipped` bouwt is als volgt:

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

Dan kun je de `Mailigh` methode gebruiken in de `Send` en `Queue`-methoden:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
