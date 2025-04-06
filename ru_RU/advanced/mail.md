# Почта

Горавель может использовать `facades.Mail()` чтобы легко отправлять почту локально.

## Конфигурация

Перед отправкой электронной почты необходимо настроить конфигурационный файл `config/mail.go`.

## Отправить почту

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Send() 
 Send()
```

## Отправить почту в очереди

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue()
```

Вы также можете настроить очередь:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("Очередь"))
```

## Настройка отправителя

Framework использует `MAIL_FROM_ ADDRESS` и `MAIL_FROM_ NAME` в конфигурационном файле `config/mail.go` как глобальные отправители.
Вы также можете настроить отправителя, но вы должны иметь в виду, что почтовый адрес должен соответствовать настроенному
STMP:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Почтовая рассылка

Параметры электронной почты можно задать в структуре «Почтовый ящик». Эти структуры хранятся в папке `app/mails`.
Вы можете быстро создать `Mailable`, используя команду `make:mail`:

```bash
запустить . artisan make:mail Отправлено
```

Сгенерированная структура `OrderShipped` выглядит следующим образом:

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

Затем вы можете использовать `Mailalbe` в методах `Send` и `Queue`:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Очередь (mails.NewOrderShipped())
```
