# 邮件

Goravel可以使用 `facades.Mail()` 轻松发送本地邮件。

## 配置

在发送电子邮件之前，您需要配置 `config/mail.go` 配置文件。

## 发送邮件

```go
导入 "github.com/goravel/framework"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  附件([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>").
  Subject(").
  Send()
```

## 通过队列发送邮件

```go
导入 "github.com/goravel/framework"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  附件([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>").
  Subject(").
  Queue()
```

您也可以自定义队列：

```go
导入 "github.com/goravel/framework"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>").
  Subject").
  Queue(mail.Queue()Connection("redis").Queue("mail"))
```

## 设置发件人

Framework 在 `config/mail.go` 配置文件中使用 `MAIL_FROM_ADDRESS` 和 `MAIL_FROM_NAME` 作为全局发送器。
您也可以自定义发件人，但您需要注意邮件地址需要与已配置的
STMP一致：

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## 使用邮件

电子邮件的参数可以在 `Mailable` 结构中设置。 这些结构存储在`app/mails`目录中。
您可以使用 `make:mail` Artisan 命令快速创建 `Mailable` 命令：

```bash
去运行。个体人make:mail ordershed
```

生成的 `OrderShiped` 结构如下：

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

然后你可以在 `Send` 和 `Queue` 中使用 `Mailalbek` 方法：

```go
err := facades.Mail().Send(mails.NewOrderShiped())
err := facades.Mail().Queue(mails.NewOrderShiped())
```
