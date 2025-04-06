# 授权

Goravel 提供内置的[身份验证](./authentication)服务和易于使用的授权功能，用于
管理用户对资源的操作。 即使用户已经通过身份验证，他们可能没有权限修改或删除
某些 Eloquent 模型或数据库记录。 Goravel 的授权功能提供了一种系统化的方式来管理
这些授权检查。

在 Goravel 中有两种授权操作的方式：[gates](#gates)和[policies](#policies)。 可以将 gates 和
policies 想象为类似于路由和控制器。 Gates 基于闭包并提供了一种简单的授权方法，而 policies 则围绕特定资源组织逻辑，类似于控制器。 本文档将
首先介绍 gates，然后深入探讨 policies。

在构建应用程序时，没有必要专门使用 gates 或 policies。 大多数应用程序将
同时使用两者的组合，这是完全可以接受的！

## Gates

### 编写门控

门控作为闭包，用于验证用户是否有权执行特定操作。 它们通常在 `app/providers/auth_service_provider.go` 文件的 `Boot` 方法中使用 Gate 门面进行设置。

在这个场景中，我们将建立一个门控来检查用户是否可以修改特定的 Post 模型，方法是比较其 ID 与帖子创建者的 user_id。

```go
package providers

import (
  "context"

  contractsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github.com/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (receiver *AuthServiceProvider) Register(app foundation.Application) {

}

func (receiver *AuthServiceProvider) Boot(app foundation.Application) {
  facades.Gate().Define("update-post",
    func(ctx context.Context, arguments map[string]any) contractsaccess.Response {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(models.Post)

      if user.ID == post.UserID {
        return access.NewAllowResponse()
      } else {
        return access.NewDenyResponse("错误")
      }
    },
  )
}
```

### 授权操作

要使用门控授权操作，您应该使用 Gate 门面提供的 `Allows` 或 `Denies` 方法：

```go
package controllers

import (
  "github.com/goravel/framework/facades"
)

type UserController struct {

func (r *UserController) Show(ctx http.Context) http.Response {
  var post models.Post
  if facades.Gate().Allows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

您可以使用 `Any` 或 `None` 方法同时授权多个操作。

```go
if facades.Gate().Any([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // 用户可以更新或删除帖子...
}

if facades.Gate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // 用户不能更新或删除帖子...
}
```

### 门控响应

`Allows` 方法返回一个布尔值。 要获取完整的授权响应，请使用 `Inspect` 方法。

```go
response := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // 操作已授权...
} else {
    fmt.Println(response.Message())
}
```

### 拦截访问权限检查

有时，您可能希望向特定用户授予所有权限。 您可以使用`Before`方法定义一个闭包，该闭包会在任何其他授权检查之前运行：

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

如果`Before`闭包返回非空结果，该结果将被视为授权检查的结果。

`After`方法可用于定义一个闭包，该闭包将在所有其他授权检查之后执行。

```go
facades.Gate().After(func(ctx context.Context, ability string, arguments map[string]any, result contractsaccess.Response) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> 注意：`After` 的返回结果仅在 `facades.Gate().Define` 返回 nil 时才会被应用。

### 注入上下文

`context` 将被传递给 `Before`、`After` 和 `Define` 方法。

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## 策略

### 生成策略

你可以使用 `make:policy` Artisan 命令来生成策略。 生成的策略将保存在 `app/policies` 目录中。 如果该目录在你的应用程序中不存在，Goravel 将为你创建它。

```go
go run . artisan make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### 编写策略

让我们在 `PostPolicy` 上定义一个 `Update` 方法来检查 `User` 是否可以更新 `Post`。

```go
package policies

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github.com/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context.Context, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user.ID == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access.NewDenyResponse("您不拥有这篇文章。")
  }
}
```

然后我们可以在 `app/providers/auth_service_provider.go` 中注册这个策略：

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

在授权不同操作时，您可以向策略添加更多方法。 例如，您可以创建 `View` 或 `Delete` 方法来授权各种与模型相关的操作。 您可以根据需要自由命名策略方法。
