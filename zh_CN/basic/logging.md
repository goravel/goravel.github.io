# 日志记录

为了了解应用程序的运行状态， Goravel提供了强大的日志服务，可以通过 \`facades 将
日志消息和系统错误记录到文件或其他频道中。 注

## 配置

要配置各种日志通道，可以在 `config/logging.go` 中进行自定义配置。

`Goravel` 默认使用 `stack`频道记录日志，`stack`允许日志转发到多个频道。

`sinle` 和 `daily` 中的`打印` 配置可以控制日志输出到控制台。

## 可用的频道驱动程序

| 名称       | 描述       |
| -------- | -------- |
| `堆栈`     | 允许多个频道   |
| `单声道`    | 单一日志文件   |
| `日间`     | 每天一个日志文件 |
| `custom` | 自定义驱动器   |

### 注入内容

```go
facades.log().Withext(ctx)
```

## 写日志消息

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
facades.Log().Error(message)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### 写入特定频道

有时，您可能想要将消息记录到应用程序的默认频道以外的其他频道：

```go
facades.Log().Channel("单声道").Info(消息)
```

如果你想同时写入多个频道，你可以使用 `Stack` 方法：

```go
facades.Log().Stack([]string{"single", "slack"}).Info(消息)
```

## 链式方法

Goravel提供了方便的链路方法，从而很容易将更有用的信息输入日志：

```go
facades.Log().User("John").Debug(消息)
```

| 方法  | 行 动                               |
| --- | --------------------------------- |
| 代码  | 设置描述日志的代码或slug。                   |
| 提示  | 设置快速调试提示。                         |
| 在   | 设置日志条目相关的特征类别或域。                  |
| 所有者 | 用于警报。                             |
| 请求  | 提供 http.Request。  |
| 答复  | 提供 http.Response。 |
| 标签  | 添加多个标签，描述功能返回了一个错误。               |
| 用户  | 设置与日志条目关联的用户。                     |
| 与   | 将键值对添加到日志条目的上下文中。                 |
| 走路  | 添加堆栈信息到日志条目。                      |

## 创建一个自定义频道

如果你想要定义一个完全自定义的通道，你可以在 "config/logging.go"
配置文件中指定一个自定义的驱动程序类型。
然后包含一个 `via` 选项来实现 `framework\log\Logger` 结构：

```go
// config/logging.go
"custom": map[string]interface{}
    "driver": "custom",
    "via": &CustomTest{},
},
```

### 实现驱动

实现 `framework\contracts\log\Logger` 接口。

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Handle pass channel config path here
  Handle(channel string) (Hook, error)
}
```

文件可以保存在`app/extensions`文件夹中(可修改)。 示例：

```go
package extensions

import (
  "fmt"

  "github.com/goravel/framework/contracts/log"
)

type Logger struct {
}

// Handle pass channel config path here
func (logger *Logger) Handle(channel string) (log.Hook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Levels monitoring level
func (h *Hook) Levels() []log.Level {
  return []log.Level{
    log.DebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log.ErrorLevel,
    log.FatalLevel,
    log.PanicLevel,
  }
}

// Fire execute logic when trigger
func (h *Hook) Fire(entry log.Entry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry.Context(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
