# 任务调度

在过去，您可能需要为服务器上需要调度的每个任务创建一个 cron 配置条目。
然而，这种方法可能很快变得麻烦，因为您的任务计划不在源代码控制中，而且您必须 SSH
到服务器上查看或添加/编辑 cron 条目。

Goravel 的命令调度器为管理服务器上的计划任务提供了一种全新的方法。 使用调度器，您
可以在 Goravel 应用程序中轻松清晰地定义命令计划。 使用调度器，您只需
在服务器上创建一个 cron 条目。

## 定义调度

要为您的应用程序调度任务，您可以在 `app\console\kernel.go` 中的 `Schedule` 方法中定义它们。 让我们
考虑一个例子来更好地理解这一点。 在这个例子中，我们想要调度一个闭包，它将在每天午夜运行。 在这个闭包内，我们将执行一个数据库查询来清空一个表：

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

type Kernel struct {
}

func (kernel Kernel) Schedule() []schedule.Event {
  return []schedule.Event{
    facades.Schedule().Call(func() {
      facades.Orm().Query().Where("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### 调度 Artisan 命令

除了调度闭包，你还可以调度 [Artisan 命令](./artisan)。 例如，你可以使用 `Command` 方法通过命令的名称或类来调度 Artisan 命令。

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github.com/goravel/framework/facades"
)

type Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule.Event {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### 日志级别

当 `app.debug` 为 `true` 时，控制台将打印所有日志。 否则，只会打印 `error` 级别的日志。

### 调度频率选项

我们已经看到了一些如何配置任务在指定间隔运行的例子。 然而，还有许多其他可用于分配给任务的任务调度频率：

| 方法                       | 描述                             |
| ------------------------ | ------------------------------ |
| `.Cron("* * * * *")`     | 按自定义cron计划运行任务                 |
| `.EveryMinute()`         | 每分钟运行任务                        |
| `.EveryTwoMinutes()`     | 每两分钟运行任务                       |
| `.EveryThreeMinutes()`   | 每三分钟运行任务                       |
| `.EveryFourMinutes()`    | 每四分钟运行任务                       |
| `.EveryFiveMinutes()`    | 每五分钟运行任务                       |
| `.EveryTenMinutes()`     | 每十分钟运行任务                       |
| `.EveryFifteenMinutes()` | 每十五分钟运行任务                      |
| `.EveryThirtyMinutes()`  | 每三十分钟运行一次任务                    |
| `.Hourly()`              | 每小时运行一次任务                      |
| `.HourlyAt(17)`          | 每小时的第17分钟运行任务                  |
| `.EveryTwoHours()`       | 每两小时运行一次任务                     |
| `.EveryThreeHours()`     | 每三小时运行一次任务                     |
| `.EveryFourHours()`      | 每四小时运行一次任务                     |
| `.EverySixHours()`       | 每六小时运行一次任务                     |
| `.Daily()`               | 每天午夜运行任务                       |
| `.DailyAt("13:00")`      | 每天在 13:00 运行任务 |

### 防止任务重叠

默认情况下，即使先前的实例仍在运行，计划任务也将继续运行。 要防止这种情况，请使用
以下方法：

| 方法                       | 描述        |
| ------------------------ | --------- |
| `.SkipIfStillRunning()`  | 如果仍在运行则跳过 |
| `.DelayIfStillRunning()` | 如果仍在运行则延迟 |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### 在一台服务器上运行任务

> 要使用此功能，您的应用程序必须使用memcached、dynamodb或redis缓存驱动程序作为默认缓存驱动程序。 此外，所有服务器必须与同一个中央缓存服务器通信。

如果您的应用程序的调度程序在多台服务器上运行，您可以确保计划的作业只在其中一台服务器上执行。 例如，假设你有一个计划任务，每周五晚上生成一份新报告。 如果任务调度器在三台工作服务器上运行，那么这个计划任务将在所有三台服务器上运行，并创建三次报告。 这并不理想！

为了防止这种情况，在定义计划任务时使用`OnOneServer`方法，这将确保任务只在一台服务器上运行。 第一个接收到任务的服务器将获得该任务的原子锁，防止其他服务器同时执行相同的任务：

```go
facades.Schedule().Command("report:generate").Daily().OnOneServer()
```

如果计划闭包intended to be run on one server，必须为其指定一个名称：

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## 运行调度器

现在我们已经学会了如何定义计划任务，让我们讨论一下如何在服务器上实际运行它们。

在根 `main.go` 文件中添加 `go facades.Schedule().Run()`。

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // 这会引导框架并使其准备就绪。
  bootstrap.Boot()

  // 通过 facades.Schedule 启动调度
  go facades.Schedule().Run()

  select {}
}
```

## 停止调度器

您可以调用 `Shutdown` 方法来优雅地关闭调度器。 此方法将等待所有任务完成后再关闭。

```go
// main.go
bootstrap.Boot()

// 创建一个通道来监听操作系统信号
quit := make(chan os.Signal)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

// 通过 facades.Schedule 启动调度
go facades.Schedule().Run()

// 监听操作系统信号
go func() {
  <-quit
  if err := facades.Schedule().Shutdown(); err != nil {
    facades.Log().Errorf("调度关闭错误：%v", err)
  }

  os.Exit(0)
}()

select {}
```
