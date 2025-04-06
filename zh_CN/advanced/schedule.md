# 任务计划

在过去，您可能需要为每个需要在服务器上计划的任务创建一个 cron 配置条目。
然而，这种方法可能会很快变成疼痛，因为您的任务计划无法控制在源头。 并且您必须到 SSH
到您的服务器来查看或添加/编辑cron 条目。

Goravel的命令调度程序为管理您服务器上的预定任务提供了新的方法。 通过调度器，您的
可以轻松和明确地在您的 Goravel 应用程序中定义您的命令时间表。 使用调度器，您只需要
在您的服务器上创建一个单独的 cron 条目。

## 定义日程安排

要为你的应用程序安排任务，你可以在 `app\console\kernel.go` 中定义你的 `Schedule` 方法。 让我们
考虑一个例子来更好地理解这个问题。 在这种情况下，我们想安排一个关闭，每天午夜在
运行。 在这个关闭中，我们将执行一个数据库查询来清除表：

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades”

  "goravel/app/models"
)

类型 Kernel structt vow
}

func (kernel Kernel) Schedule() []schedule(] schedul. vent corp,
  return []schedule.Event@un.org.
    facades.Schedule()Call(ffunc() por
      facades. rm().Query().Where("1 = 1").Delete(&models.User{})
    }).Daily(),
  }
}
```

### 计划艺术命令

除了计划关闭外，您还可以计划 [Artisan commands] (./artisan)。 For example, you may
use the `Command` method to schedule an Artisan command using either the command's name or class.

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

当`app.debug`为`true`时，控制台将打印所有日志。 否则，只能打印“错误”级日志。

### Schedule频率选项

我们已经看到了一些示例，说明您可以如何配置一个任务在指定的时间段运行。 然而，还有许多
更多的任务时间表频率可以分配给任务：

| 方法                                                                     | 描述                     |
| ---------------------------------------------------------------------- | ---------------------- |
| `.Cron("* * * * *")`                                                   | 在自定义cron schedule上运行任务 |
| `EveryMinute()`                                                        | 每分钟运行任务                |
| `EveryTwoMinutes()`                                                    | 每两分钟运行任务               |
| `.EveryThreeMinutes()`                                                 | 每三分钟运行任务               |
| `EveryFourMinutes()`                                                   | 每四分钟运行任务               |
| `EveryFiveMinutes()`                                                   | 每5分钟运行任务               |
| `.EveryTenMinutes()`                                                   | 每十分钟运行任务               |
| `Every十五分钟()`                                                          | 每隔15分钟运行任务             |
| `.Every30分钟()`                                                         | 每隔30分钟运行任务             |
| `.hourly()`                                                            | 每小时运行任务                |
| `.hourlyAt(17)`                                                        | 17分钟后运行每小时任务           |
| `EveryTwoHours()`                                                      | 每两小时运行任务               |
| `.EverythreeHours()`                                                   | 每三小时运行任务               |
| `.EveryFourHours()`                                                    | 每四小时运行任务               |
| `.EverySixHours()`                                                     | 每六小时运行任务               |
| `.Daily()`                                                             | 午夜每天运行任务               |
| \`.DailyAt("13:00") | 每天13时运行任务              |

### 防止任务重复

默认情况下，即使先前的实例仍在运行，预定的任务也将继续运行。 要防止这种情况，请使用
以下方法：

| 方法                       | 描述        |
| ------------------------ | --------- |
| `.SkipIfStillRunning()`  | 如果仍在运行则跳过 |
| `.DelayIfStillRunning()` | 如果仍在运行则延迟 |

```go
Schedule().Command("send:emails name").Eyminute().SkipIfStillRunning()
facades.Schedule().Command("send:emails name").Eyminute().DelayIfStillRunning()
```

### 在一个服务器上运行任务

> 要使用此功能，您的应用程序必须使用 memcached, dynamodb, 或 redis cache 驱动作为默认的
> 缓存驱动程序。 此外，所有服务器必须与相同的中央缓存服务器通信。

如果您的应用程序的调度器运行于多个服务器，您可以确保只在其中的一个
上执行预定任务。 例如，让我们说你有一个预定的任务，每星期五晚上生成一个新的报告。 如果任务
调度器运行于三个工人服务器， 预定的任务将在所有三个服务器上运行，并创建三次
报告。 这不是理想的！

为了防止这种情况，在定义预定任务时使用 `OnOneServer` 方法，这将确保任务只能在一个服务器上运行
。 第一个接收任务的服务器将确保工作上的原子锁定， 阻止其他服务器
同时执行相同的任务：

```go
Schedule().Command("report:generate").Daily().OnOneServer()
```

如果预定关闭要在一个服务器上运行，必须指定一个名字：

```go
Facades.Schedule().Call(func() own
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## 运行计划程序

既然我们已经学会了如何定义预定的任务，让我们讨论如何在我们的服务器上实际运行它们。

将 `go facades.Schedule().Run()` 添加到 root `main.go` 文件。

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // 这里引导框架并使其准备好使用。
  bootstrap.Boot()

  // 通过 facades.Schedule 启动调度
  go facades.Schedule().Run()

  select {}
}
```

## 停止调度器

你可以调用 `Shutdown` 方法来宽松地关闭调度器。 这个方法将等待所有任务在
完成后关闭。

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
    facades.Log().Errorf("Schedule Shutdown error: %v", err)
  }

  os.Exit(0)
}()

select {}
```
