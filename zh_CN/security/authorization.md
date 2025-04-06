# 授权

Goravel offers built-in [authentication](./authentication) services and an easy-to-use authorization feature to
manage user actions on resources. 即使用户已经被验证，他们也可能没有权限修改或删除
某些话说话模型或数据库记录。 Goravel的授权功能允许系统地管理
这些授权检查。

在Goravel有两种授权动作的方法： [gates](#gates) 和 [policies](#policies)。 想像门和
策略类似于路由和控制器。 Gates 基于关闭，提供了一个简单的
授权方式，而政策围绕着一个特定的资源组合逻辑，类似于控制器。 This documentation will
first cover gates and then delve into policies.

在构建应用程序时不需要专用门或策略。 大多数应用程序将使用完全可以接受的
组合！

## 门

### 写入门

门是用来验证用户是否被授权执行特定操作的闭口。 他们通常使用 "app/providers/auth_service_provider.go" 文件的 "Boot" 方法来设置
。

在这种情况下， 我们将建立一个门来检查用户是否可以通过比较它的 ID 到
来修改某个帖子创建者的用户_id 来修改特定的帖子模型。

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
        return access.NewDenyResponse("error")
      }
    },
  )
}
```

### 授权操作

要授权一个使用门的动作，您应该使用门面提供的 `Allows` 或 `Denies` 方法：

```go
软件包控制器

导入 (
  "github.com/goravel/framework/facades"
)

类型 UserController struct w

func (r *UserController) Show(ctx http.Context) http. esponse 族群,
  var post models.Post
  if facades.Gate(). lllows("update-post", map[string]any~
    "post": post,
  }) {
    
  }
}
```

您可以同时使用 `Any` 或 `None` 方法授权多个操作。

```go
if facades.Gate().Any([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // The user can update or delete the post...
}

if facades.Gate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // The user can't update or delete the post...
}
```

### 门响应

`allows`方法返回一个布尔值。 要获得完整的授权响应，请使用 `Inspect` 方法。

```go
response := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // The action is authorized...
} else {
    fmt.Println(response.Message())
}
```

### 拦截门检查

有时，您可能希望将所有技能授予特定用户。 您可以使用 `BEfore` 方法定义关闭，
在任何其他授权检查之前运行：

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

如果`Before`关闭返回一个非无结果，这个结果将被视为授权检查的结果。

`After`方法可以用来定义一个将在所有其他授权检查后执行的闭口。

```go
Facades.Gate().After(func(ctx context.Context, ability string,argels map[string]any results contractsaccess.Response) contractsaccess.Response Power
  user := ctx. alue("user")(models.User)
  if isAdministrator(user) v.
    return access.NewallowResponse()
  }

  return nil
})
```

> 注意：只有当`facades.Gate().Define`返回nil时，才会使用 `After` 的返回结果。

### 注入上下文

`context` 将传递给`Before`、`After`和`Define`方法'。

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## 政策

### 生成策略

您可以使用 `make:policy` Artisan 命令来生成策略。 生成的策略将保存在
`app/policies` 目录中。 如果您的应用程序中不存在目录，Goravel将为您创建它。

```go
去运行。个体制造商:policy PostPolicy
来运行个体制造商:policy user/PostPolicy
```

### 写入策略

让我们在 `PostPolicy` 上定义一个 `Update` 方法来检查一个 `User` 是否可以更新 `Post` 。

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
    return access.NewDenyResponse("You do not own this post.")
  }
}
```

然后，我们可以注册"app/providers/auth_service_provider.go"的策略：

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

当你努力授权不同的行动时，你可以在你的政策中添加更多的方法。 例如，您可以创建
`View` 或 `Delete` 方法来授权各种模型相关操作。 当您看到的
适合时，请随意命名您的策略方法。
