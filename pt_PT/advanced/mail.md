# Correio

Goravel pode usar `facades.Mail()` para enviar facilmente e-mails localmente.

## Configuração

Antes de enviar um e-mail, você precisa configurar o arquivo de configuração `config/mail.go`.

## Enviar e-mail

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Anexo ([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Assunto("Sujeto").
  Send()
```

## Enviar E-mail por Fila

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Anexo ([]string{"file.png"}).
  Content(mail.Html("<h1>Hello Goravel</h1>")).
  Assunto ("Sujeto").
  Queue()
```

Você também pode personalizar a fila:

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

## Configuração do remetente

Framework usa o arquivo de configuração `MAIL_FROM_ ENDRESS` e `MAIL_FROM_ NAME` no arquivo de configuração `config/mail.go` como remetentes globais.
Você também pode personalizar o remetente, mas você precisa notar que o endereço de email precisa ser consistente com o
STMP:

```go
import "github.com/goravel/framework/mail"

err := facades.Mail().To([]string{"example@example.com"}).
  From(mail.Address(testFromAddress, testFromName)).
  Cc([]string{"example@example.com"}).
  Bcc([]string{"example@example.com"}).
  Anexo ([]string{"file.png"}).
  Conteúdo (mail.Html("<h1>Hello Goravel</h1>")).
  Assunto ("Assunto").
  Queue(mail.Queue().Connection("redis").Queue("mail"))
```

## Usando Mailable

Os parâmetros do e-mail podem ser definidos em uma estrutura de 'Mailable'. Estas instruções são armazenadas no diretório `app/mails`.
Você pode criar rapidamente um `Mailable` usando o comando `make:mail` Artisan:

```bash
vá executar . artisan make:mail OrderShipejada
```

O struct `OrderShipped` gerado é o seguinte:

```go
importar "github. om/goravel/framework/contracts/mail"

type OrderShipped struct {
}

func NewOrderShipped() *OrderShipped() {
 return &OrderShipped{}
}

func (m *OrderShipped) Attachments() []string {
 return []string{". /logo.png"}
}

função(m *OrderShipped) Content() *mail.Content {
 return &mail. ontent{Html: "<h1>Olá Goravel</h1>"}
}

função(m *OrderShipped) Envelope() *email. nvelope {
 return &mail.Envelope{
  Bcc: []string{"bcc@goravel.dev"},
  Cc: []string{"cc@goravel. ev"},
  De: mail.From{Address: "from@goravel. ev", Nome: "from"},
  Assunto: "Goravel",
  Para: []string{"to@goravel. ev"},
 }
}

func (m *OrderShipped) Queue() *mail.Queue {
  return &mail. ueue{
    Conexão: "redis",
    Fila: "email",
  }
}
```

Então você pode usar o `Mailalbe` no `Send` e os métodos do `Queue`:

```go
err := facades.Mail().Send(mails.NewOrderShipped())
err := facades.Mail().Queue(mails.NewOrderShipped())
```
