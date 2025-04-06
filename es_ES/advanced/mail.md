# Correo

Goravel puede usar `facades.Mail()` para enviar correo localmente fácilmente.

## Configuración

Antes de enviar un correo electrónico, necesita configurar el archivo de configuración `config/mail.go`.

## Enviar Correo

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  A("
  Send()
```

## Enviar correo por cola

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hola Goravel</h1>")).
  A("
  Queue()
```

También puedes personalizar la cola:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Subject("Subject").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Configurar remitente

Framework utiliza `MAIL_FROM_ ADDRESS` y `MAIL_FROM_ NAME` en el archivo de configuración `config/mail.go` como remitentes globales.
También puede personalizar el remitente, pero necesita tener en cuenta que la dirección de correo debe ser consistente con la
STMP:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  De(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Attach([]string{"file.png"}).
  Content(mail.Html("<h1>Hola Goravel</h1>")).
  Tema("Tema").
  Cola (mail.Queue().Connection("redis").Queue("correo"))
```

## Usando Mailable

Los parámetros del correo electrónico se pueden establecer en una estructura `Mailable`. Estas estructuras se almacenan en el directorio `app/mails`.
Puedes crear rápidamente un 'Mailable' usando el comando 'make:mail' Artisan:

```bash
go run . artisan make:mail Pedido Enviado
```

La estructura generada `OrderShipped` es la siguiente:

```go
importar "github. om/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

func (m *OrderShipped) Content() *mail.Content {
 return &mail. ontent{Html: "<h1>Hola Goravel</h1>"}
}

func (m *OrderShipped) Envelope() *mail. nvelope {
 return &mail.Envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  De: correo.From{Dirección: "from@goravel. ev", Nombre: "desde"},
  Asunto: "Goravel",
  A: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail. ue{
    Conexión: "redis",
    Colas: "correo",
  }
}
```

Luego puedes usar el `Mailalbe` en los métodos `Send` y `Queue`:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
