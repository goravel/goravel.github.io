# Eventos

Os eventos de Goraveli fornecem uma simples implementação de padrão de observadores, permitindo que você assine e ouça vários eventos
que ocorrem dentro de sua aplicação. As classes de evento são normalmente armazenadas no diretório `app/events`, enquanto seus
ouvintes são armazenados em `app/listeners`. Não se preocupe se você não ver esses diretórios no seu aplicativo pois eles serão
criados para você, pois você gera eventos e ouvintes usando os comandos do console Artisan.

Eventos servem como uma ótima maneira de separar vários aspectos do seu aplicativo, como um único evento pode ter vários
ouvintes que não dependem um do outro. Por exemplo, você pode querer enviar uma notificação do Slack ao usuário a cada
vez que um pedido é enviado. Em vez de associar seu código de processamento de pedidos ao seu código de notificação Slack, você pode criar
um evento `app\events\OrderShipped` que um ouvinte pode receber e usar para enviar uma notificação Slack.

## Registrando Eventos e Ouvintes

O `app\providers\EventServiceProvider` incluído no seu aplicativo Goravel fornece um lugar conveniente para registrar
todos os ouvintes de eventos de seu aplicativo. O método `listen` contém um array de todos os eventos (chaves) e seus ouvintes
(valores). Você pode adicionar tantos eventos a esse array quanto sua aplicação precisar. Por exemplo, vamos adicionar um evento
`OrderShipped`:

```go
provedores de pacote

import (
  "github.com/goravel/framework/contracts/event"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

tipo EventServiceProvider struct {
}

. .

função (destinatário *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]evento. istener{
    &events.OrderShipped{}: {
      &listeners. endShipmentNotification{},
    },
  }
}
```

### Gerando Eventos & Ouvintes

Você pode usar os comandos `make:event` e `make:listener` do Artisan para gerar eventos e ouvintes individuais:

```go
go run . artisan make:event PodcastProcessed
go run . artisan make:event user/PodcastProcessed

go run . format@@0 artisan make:listener SendPodcastNotification
go run . artisan make:listener user/SendPodcastNotification
```

## Definindo Eventos

Uma classe de evento é essencialmente um recipiente de dados que contém a informação relacionada ao evento, o método `Handle` de
`event` passa e retorna o evento `[]. Estrutura rg`, que pode ser usada para processar dados. Os dados processados serão
então transmitidos para todos os 'ouvintes' associados. Por exemplo, vamos assumir um evento `app\events\OrderShipped`:

```go
evento de pacote

import "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receiver *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## Definindo ouvintes

Em seguida, vamos dar uma olhada no ouvinte para o nosso evento de exemplo. Os ouvintes do evento recebem `[]event.Arg` do evento
método `Handle` retorna. Dentro do método `Handle`, você pode executar quaisquer ações necessárias para responder ao evento:

```go
package listeners

import (
  "github. om/goravel/framework/contrats/event"
)

type SendShipmentNotification struct {
}

func (destinatário *SendShipmentNotification) Assinatura() string {
  return "send_shipment_notification"
}

func (destinatário *SendShipmentNotification) Queue(args . .any) event.Queue {
  evento de retorno. ueue{
    Ativar: falso,
    conexão: "",
    Fila: "",
  }
}

função(receptor *EnviarNotificação) Handle(args . .any) erro {
  return nil
}
```

### Parando a Propagação de um evento

Às vezes, você pode querer parar a propagação de um evento para outros ouvintes. You may do so by returning an error from
your listener's `Handle` method.

## Ouvintes de eventos na fila

Na fila, os ouvintes podem ser benéficos se seu ouvinte realizar uma tarefa lenta, como enviar um e-mail ou fazer
uma solicitação HTTP. Antes de usar ouvintes enfileirados, certifique-se de [configurar sua fila](queues) e iniciar um trabalhador da fila
no seu servidor ou ambiente de desenvolvimento local.

```go
receptores de pacote

...

funcionismo (destinatário *SendShipmentNotification) Fila(args ...qualquer) event.Queue {
  evento de retorno. ueue{
    Ativar: falso,
    Conexão: "",
    Fila: "",
  }
}

função(receptor *EnviarNotificação) Handle(args . .any) erro {
  nome := args[0]

  return nil
}
```

### Ouvintes de eventos e transações de banco de dados na fila

Quando ouvintes na fila são enviados dentro das transações de banco de dados, a fila pode processá-los antes que a transação do banco de dados
seja confirmada. When this happens, any updates you have made to models or database records during the
database transaction may not yet be reflected in the database. Além disso, quaisquer modelos ou registros de banco de dados criados
dentro da transação pode não existir no banco de dados. If your listener depends on these models, unexpected errors can
occur when the job that dispatches the queued listener is processed. Neste momento, o evento precisa ser colocado fora
das transações de banco de dados.

## Enviando eventos

Podemos enviar Eventos usando o método `facades.Event().Job().Dispatch()`.

```go
package controllers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/events"
)

tipo UserController struct {
}

func (r UserController) Show(ctx http. ontext) {
  err := facades.Event().Job(&events.OrderShipped{}, []evento. rg{
    {Type: "string", Valor: "Goravel"},
    {Type: "int", Valor: 1},
  }).Dispatch()
}
```

## Tipos suportados `event.Arg.Type`

```go
bool
int
int8
int16
int32
int64
uint
uint8
uint16
uint32
uint64
float32
float64
string
[]bool
[]int
[]int8
[]int16
[]int32
[]int64
[]uint
[]uint8
[]uint16
[]uint32
[]uint64
[]float32
[]float64
[]string
```
