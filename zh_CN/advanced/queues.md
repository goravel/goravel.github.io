# 队列

在构建Web应用程序时，可能会有一些任务，如解析和存储上传的CSV文件，这些任务在Web请求期间需要太长时间才能完成。 幸运的是，Goravel提供了一个解决方案，允许你创建可以在后台运行的队列任务。 通过这种方式，将耗时的任务移至队列，你的应用程序可以更快地响应Web请求，并为用户提供更好的体验。 要实现此功能，我们使用
`facades.Queue()`。

Goravel的队列配置选项保存在应用程序的`config/queue.go`配置文件中。 Goravel
支持两种驱动：`redis`和`sync`。

### 连接对比 队列

在深入了解Goravel队列之前，理解"连接"和"队列"之间的区别很重要。 在
配置文件`config/queue.go`中，你会找到一个用于`connections`配置的数组。 此选项指定
到后端队列服务（如Redis）的连接。 然而,每个队列连接可以有多个"队列",它们
可以被视为不同的堆栈或排队作业的堆。

需要注意的是,队列配置文件中的每个连接配置示例都包含一个`queue`
属性。 当作业被发送到给定连接时,此属性是作业将被分派到的默认队列。 简单来说,如果你分派一个作业而没有明确定义它应该被分派到哪个队列,
该作业将被放置在连接配置的queue属性中定义的队列中。

```go
// 这个作业被发送到默认连接的默认队列
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).Dispatch()

// 这个作业被发送到默认连接的"emails"队列
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).OnQueue("emails").Dispatch()
```

## 创建作业

### 生成作业类

默认情况下,应用程序的所有作业都存储在`app/jobs`目录中。 如果 `app/Jobs` 目录不存在，当你运行 `make:job` Artisan 命令时将会创建它：

```shell
go run . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### 类结构

Job 类非常简单，由两个方法组成：`Signature` 和 `Handle`。 `Signature` 作为任务的唯一标识符，而 `Handle` 在队列处理任务时执行。 此外，任务执行时传递的 `[]queue.Arg{}` 将被传输到 `Handle` 中：

```go
package jobs

type ProcessPodcast struct {
}

// Signature 作业的名称和签名。
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Handle 执行作业。
func (receiver *ProcessPodcast) Handle(args ...any) error {
  return nil
}
```

### 注册 Job

创建 job 后，你需要在 `app/provides/queue_service_provider.go` 中注册它，以便正确调用。

```go
func (receiver *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## 启动队列服务器

在根目录的 `main.go` 中启动队列服务器。

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // 这会引导框架并使其准备就绪。
  bootstrap.Boot()

  // 通过 facades.Queue() 启动队列服务器。
  go func() {
    if err := facades.Queue().Worker().Run(); err != nil {
      facades.Log().Errorf("队列运行错误：%v", err)
    }
  }()

  select {}
}
```

可以在 `facades.Queue().Worker` 方法中传入不同的参数，通过启动多个 `facades.Queue().Worker` 来监控多个队列。

```go
// 无参数，默认监听 `config/queue.go` 中的配置，并发数为 1
go func() {
  if err := facades.Queue().Worker().Run(); err != nil {
    facades.Log().Errorf("队列运行错误: %v", err)
  }
}()

// 监听 redis 链接的 processing 队列，并发数为 10
go func() {
  if err := facades.Queue().Worker(queue.Args{
    Connection: "redis",
    Queue: "processing",
    Concurrent: 10,
  }).Run(); err != nil {
    facades.Log().Errorf("队列运行错误: %v", err)
  }
}()
```

## 调度任务

一旦你编写了任务类，你可以使用任务本身的 `Dispatch` 方法来调度它：

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
    // 做一些处理
  }
}
```

### 同步调度

如果你想立即（同步）调度任务，你可以使用 `DispatchSync` 方法。 使用此方法时，任务不会被加入队列，而是在当前进程中立即执行：

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
    // 执行某些操作
  }
}
```

### 任务链

任务链允许您指定按特定顺序执行的队列任务列表。 如果序列中的任何任务失败，其余任务将不会被执行。 要运行队列任务链，您可以使用 `facades.Queue()` 提供的 `Chain` 方法：

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue.Arg{
      {Type: "int", Value: 1},
    },
  },
  {
    Job: &jobs.Test1{},
    Args: []queue.Arg{
      {Type: "int", Value: 2},
    },
  },
}).Dispatch()
```

### Delayed Dispatching

If you would like to specify that a job should not be immediately processed by a queue worker, you may use the `Delay`
method during job dispatch. For example, let's specify that a job should not be available for processing after 100
seconds of dispatching:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second)).Dispatch()
```

### Customizing The Queue & Connection

#### Dispatching To A Particular Queue

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Dispatching To A Particular Connection

If your application interacts with multiple queue connections, you can use the `OnConnection` method to specify the
connection to which the task is pushed.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

You may chain the `OnConnection` and `OnQueue` methods together to specify the connection and the queue for a job:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processing").Dispatch()
```

## `queue.Arg.Type` Supported Types

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
