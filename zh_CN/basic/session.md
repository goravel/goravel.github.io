# 会议

会话使您能够在多个请求中存储用户信息，在
内在无状态的 HTTP 协议中提供一个状态体验。 此用户信息一直保存在服务器端。 Goravel提供一个
统一接口，用于与各种持久性存储驱动器进行交互。

## 配置

`session`配置文件位于`config/session.go`。 默认驱动程序是 `file`，它在 `storage/framework/sessions` 目录中存储会话
。 Goravel允许您通过实现
的 `contracts/session/driver` 接口来创建一个自定义 `session` 驱动程序。

### 注册中间件

默认情况下，Goravel不会自动开始会话。 然而，它提供了开始会话的中间件. You can
register the session middleware in the `app/http/kernel.go` file to apply it to all routes, or you can add it to
specific routes:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## 与会话互动

### 检索数据

您可以使用 `Get` 方法从会话中检索数据。 如果值不存在，将返回 `nil` 。

```go
值 := ctx.Request().Session().Get("key")
```

您也可以将默认值作为第二个参数传递到 `Get` 方法。 如果
指定的密钥在会话中不存在，此值将返回：

```go
value := ctx.Request().Session().Get("key", "default")
```

### 正在获取所有数据

如果您想要从会话中检索所有数据，您可以使用 `All` 方法：

```go
data := ctx.Request().Session().All()
```

### 检索数据子集

如果您想要检索会话数据的子集，您可以使用“仅限”方法：

```go
data := ctx.Request().Session().Only([]string{"username", "email"})
```

### 确定一个项目是否存在于会话

为了确定某个项目是否存在于会话中，您可以使用 `Has` 方法。 如果
项目存在而不是 `nil`，`Has` 方法返回 `true`：

```go
if ctx.Request().Session().Has("user") {
    //
}
```

为了确定一个项目是否存在，即使它是`nil`, 你也可以使用 `Exists` 方法：

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

为了确定某个项目是否不存在于会话中，您可以使用 `Missing` 方法：

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### 存储数据

您可以使用 `Put ` 方法来存储会话中的数据：

```go
ctx.Request().Session().Put("key", "value")
```

### 检索和删除数据

如果您想从会话中检索一个项目，然后删除它，您可以使用 `Pull` 方法：

```go
值 := ctx.Request().Session().Pull("key")
```

### 正在删除数据

可使用 `Forget` 方法从会话中移除一块数据。 If you would like to remove all data from
the session, you can use the `Flush` method:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### 重新生成会话ID

重生会话 ID 通常是为了防止恶意用户在您的应用程序上利用会话固定攻击
。 您可以使用 "重新生成" 方法重新生成会话 ID：

```go
ctx.Request().Session().Regenerate()
```

如果您想要重新生成会话 ID 并忘记会话中的所有数据，您可以使用 `Invalidate`
方法：

```go
ctx.Request().Session().Invalidate()
```

然后，您需要将新会话保存到 cookie：

```go
ctx.Response().cookie(http.Cookieov
  名称：ctx.Request().Session().GetName(),
  值：ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  路径: facades.Config().GetString("session.lifetime") ("that"),
  域名: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session" 普遍"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### 闪光数据

Flash 数据是会话数据，仅在其后的 HTTP 请求中可用，然后将被删除。
Flash数据有助于存储临时消息，如状态消息。 您可以使用 `Flash` 方法存储会话中的
闪光数据：

```go
ctx.Request().Session().Flash("status", "任务成功!")
```

如果你想要将你的闪光数据保留在一个额外的请求上，你可以使用 "Reflash" 方法：

```go
ctx.Request().Session().Reflash()
```

如果你想要将特定的闪光数据保留在一个额外的请求上，你可以使用 `Keep` 方法：

```go
ctx.Request().Session().Keep("status", "username")
```

如果你想保留特定数据以便立即使用，你可以使用“现在”方法：

```go
ctx.Request().Session().Now("status", "任务成功!")
```

## 与会话管理器互动

### 建立一个自定义会话

使用 "Session" 面来构建自定义会话。 `Session` 面提供`BuildSession` 方法， 需要
驱动程序实例和可选会话ID，如果您想要指定一个自定义会话ID：

```go
导入 "github.com/goravel/framework/facades"

session := facades.Session().Building Session(driver, "sessionID")
```

### 添加自定义会话驱动程序

#### 执行驱动程序

要实现自定义会话驱动程序，驱动程序必须实现 `contracts/session/driver` 接口。

```go
// Driver is the interface for Session handlers.
type Driver interface {
  // Close closes the session handler.
  Close() error
  // Destroy destroys the session with the given ID.
  Destroy(id string) error
  // Gc performs garbage collection on the session handler with the given maximum lifetime.
  Gc(maxLifetime int) error
  // Open opens a session with the given path and name.
  Open(path string, name string) error
  // Read reads the session data associated with the given ID.
  Read(id string) (string, error)
  // Write writes the session data associated with the given ID.
  Write(id string, data string) error
}
```

#### 注册驱动程序

在执行驱动程序后，您需要在Goravel注册它。 您可以使用
"facades.Session" 的扩展方法来做到这一点。 你应该在`app/providers/app_service_provider.go`的boot`方法中调用`Extend\` 方法：

```go
导入 "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver *
  return &RedisDriver{}
})
```

司机注册后， 您可以通过将会话配置文件中的 `driver` 选项设置为
`redis` 或者将`SESSION_DRIVER` 环境变量设置为 `redis` 。

### 检索驱动实例

使用 `Driver` 方法从会话管理器中检索驱动程序实例。 它接受了一个可选的驱动名称。如果
没有提供，它将返回默认的驱动实例：

```go
司机, err := facades.Session().Driver("文件")
```

### 开始新会话

```go
session := facades.Session().Building Session(driver)
session.Start()
```

### 保存会话数据

```go
session := facades.Session(driver)
session.Start()
session.Save()
```

### 将会话附加到请求中

```go
session := facades.Session(driver)
session.Start()
ctx.Request().SetSession(session)
```

### 检查请求是否有会话

```go
if ctx.Request().HasSession() {
    //
}
```
