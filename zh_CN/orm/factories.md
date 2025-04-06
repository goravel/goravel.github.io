# 因子

在测试您的应用程序或做种你的数据库时，可能需要事先将一些记录插入你的数据库
中。 不要手动输入每一列的值， Goravel允许您通过创建模型工厂为您的每个模型定义一组默认
属性。

要看到如何写一个工厂的示例，您可以查看位于您应用程序的
`database/factories` 目录中的 `user_factory.go` 文件。

```go
package factories

type UserFactory struct {
}

// Definition Define the model's default state.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

正如你可以看到的那样，在最基本的形式中，工厂是有一个 `Definition` 方法的结构。 该方法返回
默认的属性值集，这些属性值应在与工厂创建模型时使用。 要生成一系列的
随机数据，您可以依靠[brianvoe/gofakeit](https://github.com/brianvoe/gofakeit)。

## 生成因子

要创建一个工厂，请运行 `make:factory` Artisan 命令：

```
去运行。个体制造厂：工厂后厂。
```

新工厂`struct`将被放置在你的数据库/工厂\`目录中。

### 示范和工厂发现公约

在定义工厂后，你可以使用 `Factory()` 方法将工厂绑定到模型中：

```go
包

导入(
  "github.com/goravel/frameworks/database/factory"
  "github. om/goravel/framework/database/orm”

  "goravel/database/factories"


type User structt per cord
  orm. odel
  名称字符串
  Avatar 字符串
  orm. oftDeletes
}

func (u *User) Factory() factory.Factory Paper
  return &factory{}
}
```

## 使用工厂创建模型

### 实例化模型

我们可以使用 `Make` 方法来创建模型，而不会在数据库中坚持它们：

```go
var 用户模型.User
err := facades.Orm().Factory().Make(&user)
```

您可以使用 "计数" 方法创建许多模型集合：

```go
var 用户 []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

如果您想要覆盖您模型的一些默认值，您可以通过 `map[string]任意` 方法到 `Make`
方法。 只有指定的属性将被替换，而其余属性仍然被设置为由工厂指定的默认
值：

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any许)
    "Avatar": "avatar",
})
```

### 持续模式

`Create`方法使用Orm\`保存方法创建和保存模型实例到数据库。

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var 用户 []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

你可以通过 `Create`
方法的 `map[string]任意` 属性来覆盖工厂的默认模型属性：

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]anywab
    "Avatar": "avatar",
})
```

### 忽略模型事件

模型上可能有[模型活动](../orm/quickstart#events)，您可以使用
`CreateQuietly` 方法忽略这些事件：

```go
var 用户模型.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
