# 事件

Goravel的事件提供了一个简单的观察模式实现, 允许你订阅和聆听在你的应用程序中发生的各种
事件。 事件类通常保存在`app/events`目录中，而他们的
监听器则保存在`app/侦听器`中。 如果您在您的应用程序中看不到这些目录，请不要担心，因为当您使用 Artisan 控制台命令生成事件和侦听器时，它们将为
创建。

活动是解析您应用程序各个方面的极好方式。 作为一个单一事件可以有多个不依赖于彼此的
监听器。 例如，您可能希望每次
发货时向您的用户发送Slack 通知。 不要将您的订单处理代码与您的 Slack 通知代码相配对。 你可以提出一个
一个`app\events\OrderShiped` 事件，一个监听器可以接收并使用它来发送一个 Slack 通知。

## 注册事件和监听器

The `app\providers\EventServiceProvider` included with your Goravel application provides a convenient place to register
all of your application's event listeners. “监听”方法包含一个数组所有事件 (keys) 和
监听器 (值)。 您可以根据您的应用程序的需要将尽可能多的事件添加到这个数组。 例如，让我们添加一个
`orderShiped` 事件：

```go
package providers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

...

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]event.Listener{
    &events.OrderShipped{}: {
      &listeners.SendShipmentNotification{},
    },
  }
}
```

### 生成事件和监听器

您可以使用 `make:event` 和 `make:listener` Artisan 命令来生成个别事件和听众：

```go
去运行。个体操者make:event PodcastProcessed
开始运行。个体操者make:event user/PodcastProcessed

开始运行。 艺人make:listener SendPodcastNotification
转运行。个体人make:listener user/SendPodcastNotification
```

## 定义事件

事件类别基本上是一个拥有与事件有关的信息的数据容器。
的 `Handle` 方法传递到并返回 `[]事件。 可用于处理数据的 rg` 结构。 处理过的数据将为
然后传递给所有相关的“侦听器”。 例如，让我们假定一个 "app\events\OrderShiped" 事件：

```go
package events

import "github.com/goravel/framework/contracts/event"

type OrderShipped struct {
}

func (receiver *OrderShipped) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## 定义监听器

接下来，让我们看看我们的示例活动的听众。 事件监听器收到事件的 []event.Arg`返回的`Handle`方法。 在`Handle\` 方法中，您可以执行任何必要的操作来响应事件：

```go
package listeners

import (
  "github.com/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (receiver *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event.Queue{
    Enable:     false,
    Connection: "",
    Queue:      "",
  }
}

func (receiver *SendShipmentNotification) Handle(args ...any) error {
  return nil
}
```

### 停止一个事件的传播

有时，您可能希望停止向其他听众传播某个事件。 您可以通过从
你的监听器的 `Handle` 方法返回一个错误来这样做。

## 队列事件监听器

如果您的监听器将执行一个缓慢的任务，例如发送电子邮件或将
作为一个 HTTP 请求，排队监听器可能是有益的。 在使用队列侦听器之前，请确保[配置您的队列](queues)并在您的服务器或本地开发环境中开始队列工作人员
。

```go
软件包监听器

... 一个有趣的 (receiver *SendShipmentNotification) 队列(args ...any) event.Queue Power
  return activities. ueue@un.org
    启用：false，
    连接: "",
    队列: "",
  }
}

func (receiver *发送通知) Handle(args . .any错误，然后重新返回
  name := args[0]

  return nil
}
```

### 排队的事件监听器和数据库交易

当队列侦听器在数据库交易中被发送时，队列可能会在数据库
交易完成之前处理它们。 发生这种情况时，
数据库交易过程中您对模型或数据库记录的任何更新可能尚未反映在数据库中。 In addition, any models or database records created
within the transaction may not exist in the database. If your listener depends on these models, unexpected errors can
occur when the job that dispatches the queued listener is processed. 此时，需要将该事件置于数据库交易外的
之外。

## 正在发送事件

我们可以通过 `facades.Event().Job().Dispatch()` 方法来发送事件。

```go
package controllers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http.Context) {
  err := facades.Event().Job(&events.OrderShipped{}, []event.Arg{
    {Type: "string", Value: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## `event.Arg.Type` 支持的类型

```go
bool
int

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
[]24 [float32
[]float64
[]string
```
