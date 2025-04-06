# البريد

يمكن لـ Goravel استخدام 'facades.Mail()' لإرسال البريد بسهولة محليا.

## الإعدادات

قبل إرسال بريد إلكتروني، تحتاج إلى تكوين ملف تكوين \`config/mail.go'.

## إرسال البريد

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

## إرسال البريد حسب قائمة الانتظار

```go
استيراد "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  ملحق ([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue()
```

يمكنك أيضا تخصيص قائمة الانتظار:

```go
استيراد "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  ملحق ([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue (mail.Queu(mail.Connection")"Queu").
```

## تعيين المرسل

يستخدم الإطار `MAIL_FROM_ADDRESS` و`MAIL_FROM_NAME` في ملف تكوين `config/mail.go` كمرسلين عالميين.
يمكنك أيضًا تخصيص المرسل، لكنك تحتاج إلى ملاحظة أن عنوان البريد يجب أن يكون متسقاً مع التكوين
STMP:

```go
استيراد "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  attachach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail").
```

## استخدام البريد

يمكن تعيين معلمات البريد الإلكتروني في بنية "البريد الإلكتروني". يتم تخزين هذه الهياكل في دليل "app/mails".
يمكنك إنشاء 'Mailable' بسرعة باستخدام الأمر الفني 'make:mail' Artisan:

```bash
اذهب للتشغيل. اصنع حرفي: البريد طلب الشحن
```

وفيما يلي هيكل `الطلب` الذي تم إنشاؤه:

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

ثم يمكنك استخدام "Mailalbe" في طريقتي "Send" و"قائمة الانتظار":

```go
err := facades.Mail().Send(mails.NewOrderShipped())
: = facades.Mail().Queue(mails.NewOrderShipped())
```
