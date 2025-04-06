# 控制器

控制器可以使用
进行整合，而不是以单独路径关闭的形式定义所有请求处理逻辑。 控制器存储在 `app/http/controllers` 目录中。

## 定义控制器

下面是基本控制器的示例：

```go
软件包控制器

导入 (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades”


type UserController struct v.
  // Dependent Services
}

func NewUserController() *UserController
  return &UserController
    // Inject services
  }
}

func (r *UserController) Show(ctx http. http://texttext.Response 然后返回
  return ctx.Response().Succes().Json(http.Jsonw
    "Hello": "Goravel",
  })

```

路线定义：

```go
package routes

import (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers.NewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### 创建控制器

```shell
去运行。个体操者make:controller UserController
来运行个体操者make:controller user/UserController
```

## 资源控制器

如果您认为您的应用程序中的每个讨论模式都是“资源”， 在您的应用程序中对每个资源执行相同的
动作是典型的。 例如，请想象您的应用程序包含 `Photo` 模型和
`Movie` 模型。 用户可能会创建、阅读、更新或删除这些资源。

由于这种常用情况，Goravel资源路由分配典型的创建、阅读， 更新并删除 ("CRUD")
路径到具有单行代码的控制器。 要开始操作，我们可以使用 `make:controller` Artisan command's
`--resource` 选项来快速创建一个控制器来处理这些动作：

```shell
去运行。个体操者make:controller --resource PhotoController
```

此命令将在 `app/http/controllers/phot_controller.go` 中生成一个控制器。 控制器将包含每个可用资源操作的
方法。 接下来，你可以注册一个指向
控制器的资源路线：

```go
Route().Resource("photos", controllers.NewPhotoController())
```

| 动词        | URI               | 行 动 |
| --------- | ----------------- | --- |
| 获取        | `/photos`         | 索引  |
| 帖子        | `/photos`         | 商店  |
| 获取        | `/photos/{photo}` | 显示  |
| PUT/PATCH | `/photos/{photo}` | 更新  |
| 删除        | `/photos/{photo}` | 破坏的 |
