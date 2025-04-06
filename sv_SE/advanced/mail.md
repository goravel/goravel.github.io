# E-post

Goravel kan använda `facades.Mail()` för att enkelt skicka e-post lokalt.

## Konfiguration

Innan du skickar ett e-postmeddelande måste du konfigurera konfigurationsfilen `config/mail.go`.

## Skicka e-post

```go
importera "github.com/goravel/frameing/mail"

err := facades.Mail().To([]string{"exempel@example.com"}).
  Cc([]string{"exempel@example.com"}).
  Bcc([]string{"exempel@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Send()
```

## Skicka e-post via kö

```go
importera "github.com/goravel/frameing/mail"

err := facades.Mail().To([]string{"exempel@example.com"}).
  Cc([]string{"exempel@example.com"}).
  Bcc([]string{"exempel@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue()
```

Du kan också anpassa kön:

```go
importera "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"exempel@example.com"}).
  Cc([]string{"exempel@example.com"}).
  Bcc([]string{"exempel@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Ämne").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Sätter avsändare

Ramverket använder `MAIL_FROM_ ADDRESS` och `MAIL_FROM_ NAME` i konfigurationsfilen `config/mail.go` som globala avsändare.
Du kan också anpassa avsändaren, men du måste notera att e-postadressen måste vara förenlig med den konfigurerade
STMP:

```go
importera "github.com/goravel/frameing/mail"

err := facades.Mail().To([]string{"exempel@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"exempel@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hej Goravel</h1>")).
  Ämne ("Ämne").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Använda Mailable

Parametrarna för e-postmeddelandet kan ställas in i en `Mailable`-struktur. Dessa strukturer lagras i `app/mails`-katalogen.
Du kan snabbt skapa ett `Mailable` med kommandot `make:mail` Artisan:

```bash
gå kör. hantverkare make:mail Beställ Levereras
```

Den genererade `OrderShipped` struct är följande:

```go
importera "github". om/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 returnera &mail. ontent{Html: "<h1>Hej Goravel</h1>"}
}

func (m *OrderShippad) Kuvert() *mail. nvelope {
 returnera &mail.Envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  Från: mail.Från{Adress: "from@goravel. ev", Namn: "från"},
  Ämne: "Goravel",
  Till: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  returnera &mail. ueue{
    Anslutning: "redis",
    kö: "mail",
  }
}
```

Då kan du använda `Mailalbe` i `Send` och `Queue`-metoderna:

```go
err := fasader.Mail().Send(mails.NewOrderShipped())
err := fasader.Mail().Kö(mails.NewOrderShipped())
```
