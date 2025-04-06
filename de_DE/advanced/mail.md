# Mail

Goravel kann `facades.Mail()` verwenden, um einfach E-Mails lokal zu versenden.

## Konfiguration

Bevor du eine E-Mail sendest, musst du die Konfigurationsdatei `config/mail.go` konfigurieren.

## E-Mail senden

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().An([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hallo Goravel</h1>")).
  Subject("subject").
  Send()
```

## Mail per Warteschlange senden

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().An([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hallo Goravel</h1>")).
  subject("subject").
  Queue() png"}).
```

Sie können auch die Warteschlange anpassen:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().An([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hallo Goravel</h1>")).
  Subject("Subject").
  Queue().Connection("redis").Queue("mail"))
```

## Sendungseinstellung

Framework verwendet `MAIL_FROM_ ADDRESS` und `MAIL_FROM_ NAME` in der Konfigurationsdatei `config/mail.go` als globale Absender.
Sie können den Absender auch anpassen, aber Sie müssen beachten, dass die Mail-Adresse konsistent mit dem konfigurierten
STMP sein muss:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().An([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hallo Goravel</h1>")).
  Betreff:
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Benutze Mailable

Die Parameter der E-Mail können in einer `Mailable` Struktur gesetzt werden. Diese Strukturen werden im `app/mails` Verzeichnis gespeichert.
Du kannst schnell ein `Mailable` mit dem `make:mail` Artisan Befehl erstellen:

```bash
go run . handwerklicher make:mail OrderShipped
```

Der generierte `OrderShipped` strukt ist wie folgt:

```go
importieren "github. om/goravel/framework/contracts/mail"

Typ OrderShipped struct {
}

func NewOrderShipped() *OrderShipped() *OrderShippped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 return &mail. ontent{Html: "<h1>Hallo Goravel</h1>"}
}

func (m *OrderShipped) Envelope() *mail. nvelope {
 return &mail.envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  Von: mail.Von{Adresse: "from@goravel. ev", Name: "von"},
  Betreff: "Goravel",
  An: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail. ueue{
    Verbindung: "redis",
    Warteschlange: "mail",
  }
}
```

Dann kannst du die `Mailalbe` in den `Send` und `Queue` Methoden verwenden:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Warteschlange (mails.NewOrderShipped())
```
