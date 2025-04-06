# Courrier

Goravel peut utiliser `facades.Mail()` pour envoyer facilement du courrier en local.

## Configuration

Avant d'envoyer un e-mail, vous devez configurer le fichier de configuration `config/mail.go`.

## Envoyer un mail

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Bonjour Goravel</h1>")).
  Subject("Subject").
  Send()
```

## Envoyer le courrier par file d'attente

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Bonjour Goravel</h1>")).
  Subject("Subject").
  Queue()
```

Vous pouvez également personnaliser la file d'attente :

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Bonjour Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Réglage de l'expéditeur

Framework utilise `MAIL_FROM_ ADDRESS` et `MAIL_FROM_ NAME` dans le fichier de configuration `config/mail.go` en tant qu'expéditeurs globaux.
Vous pouvez également personnaliser l'expéditeur, mais vous devez noter que l'adresse e-mail doit être compatible avec la STMP
configurée :

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Bonjour Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Utiliser Mailable

Les paramètres de l'email peuvent être définis dans un struct `Mailable`. Ces structures sont stockées dans le dossier `app/mails`.
Vous pouvez rapidement créer un `Mailable` en utilisant la commande `make:mail` Artisan :

```bash
go run . artisan make:mail OrderShipped
```

La structure générée `OrderShipped` est la suivante:

```go
importer "github. om/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped() *OrderShipped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 retourner &mail. ontent{Html: "<h1>Bonjour Goravel</h1>"}
}

func (m *OrderShipped) Envelope() *mail. nvelope {
 return &mail.Envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  De: mail.From{Address: "from@goravel. ev", Nom: "from"},
  Subject: "Goravel",
  À: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail. ueue{
    Connexion : "redis",
    File d'attente : "mail",
  }
}
```

Ensuite, vous pouvez utiliser les méthodes `Mailalbe` dans les méthodes `Send` et `Queue` :

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
