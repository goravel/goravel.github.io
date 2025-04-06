# 队列

构建您的 web 应用程序时，可能有一些任务，例如解析和存储上传的 CSV 文件， 这需要太长的
才能在网页请求中完成。 幸运的是，Goravel提供了一种解决办法，允许您创建
可以在后台运行的排队作业。 这样，将时间密集的任务移到队列， 您的应用程序可以响应Web
请求更快，为您的客户提供更好的用户体验。 要实现此功能，我们请使用
`facades.Queue()` 。

Goravel的队列配置选项已保存在您的应用程序的`config/队列e.go`配置文件中。 Goravel
支持两个驱动程序：`redis` 和 `sync`。

### 连接 V。 队列

在深入到Goravel队列之前，理解“连接”和“队列”之间的区别是重要的。 在
的配置文件中，`config/queue.go`，你会找到一个`connections`的数组。 此选项指定了
连接到后端队列服务，例如Redis。 然而，每个队列连接都可以有多个“队列”，可以认为
是不同的堆栈或大堆排队的工作。

必须注意到队列配置文件中的每个连接配置示例都包含 "队列"
属性。 此属性是发送到指定的
连接时作业将被派往的默认队列。 更简单地说，如果你发送了一份作业，却没有明确定义它应该被派往哪个队列
此作业将被放置在连接配置队列属性中定义的队列中。

```go
// 此作业被发送到默认连接队列
err := facades.Queue().Job(&jobs.Test{}, []队列.Argo.
  {Type: "int", Value},
})。 ispatch()

// 此作业被发送到默认连接的“电子邮件”队列
err := facades.Queue(). ob(&jobs.Test{}, []队列.Argo.
  {Type: "int", 值: 1},
}).OnQueue("emails").Dispatch()
```

## 创建作业

### 生成工作类

默认情况下，应用程序的所有任务都保存在`app/jobs`目录中。 如果`app/Jobs`目录
不存在，当你运行`make:job`Artisan命令时将会创建：

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### 类结构

作业类非常简单，由两种方法组成：“签名”和“手工操作”。 “签名”是一个任务的
不同标识符，而“处理”是在队列处理任务时执行的。 此外，`[]队列.Arg{}` 经过了
当任务执行将被传输到 `Handle`：

```go
package jobs

type ProcessPodcast struct {
}

// Signature The name and signature of the job.
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Handle Execute the job.
func (receiver *ProcessPodcast) Handle(args ...any) error {
  return nil
}
```

### 注册作业

创建作业后，您需要在 `app/provides/queue_service_provider.go` 中注册它，以便它能够被正确地调用
。

```go
func (receiver *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## 启动队列服务器

在根目录的`main.go`中启动队列服务器。

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // This bootstraps the framework and gets it ready for use.
  bootstrap.Boot()

  // Start queue server by facades.Queue().
  go func() {
    if err := facades.Queue().Worker().Run(); err != nil {
      facades.Log().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

可以在 `facades.Queue().Worker` 方法中传递不同的参数，你可以通过启动
来监视多个队列. Queue().Worker\`.

```go
// No parameters, default listens to the configuration in the `config/queue.go`, and the number of concurrency is 1
go func() {
  if err := facades.Queue().Worker().Run(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()

// Monitor processing queue for redis link, and the number of concurrency is 10
go func() {
  if err := facades.Queue().Worker(queue.Args{
    Connection: "redis",
    Queue: "processing",
    Concurrent: 10,
  }).Run(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## 正在发送任务

一旦你写了作业类，你可以在作业本身使用 "调度" 方法来调度它：

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Dispatch()
  if err != nil {
    // do something
  }
}
```

### 同步发送

如果您想要立即发送作业(同步)，您可以使用 `DispatchSync` 方法。 当使用此
方法时，任务将不会排队，将在当前进程中立即执行：

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).DispatchSync()
  if err != nil {
    // do something
  }
}
```

### Job链接

Job链允许您指定一个按特定顺序执行的排队任务列表。 如果序列
中的任何任务失败，其余任务将不会执行。 要运行队列中的作业链，您可以使用
提供的 "facades.Queue()" 方法：

```go
err := facades.Queue().Chain([]队列e.JobsPo.
  Power
    Job: &jobs.Test{},
    Args: []队列. rg@un.org.
      {Type: "int", Value: 1},
    },
  }，
  Power
    Job：&job. est1{},
    参数: []队列。 rg□
      {Type: "int", Value: 2},
    },
  },
}).Dispatch()
```

### 延迟发送

如果您想要指定一个作业不应由队列工人立即处理， 您可以在作业调度过程中使用 `Delay`
方法。 例如，我们要指定一个作业不应该在 100
秒发送后进行处理：

```go
err := facades.Queue().Job(&jobs.Test{}, []队列e.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### 自定义队列和连接

#### 正在发送到一个特定队列

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []队列.Arg{}).OnQueue("processing").Dispatch()
```

#### 正在发送到一个特殊连接

如果您的应用程序与多个队列连接交互，您可以使用 `OnConnection` 方法来指定任务被推送到的
连接。

```go
err := facades.Queue().Job(&jobs.Test{}, []队列e.Arg{}).OnConnection("sync").Dispatch()
```

您可以将 `OnConnection` 和 `OnQueue` 方法连结在一起来指定一个工作的连接和队列：

```go
err := facades.Queue().Job(&jobs.Test{}, []队列e.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## "队列.Arg.Type" 支持类型

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
