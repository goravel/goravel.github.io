# 服务容器

Goravel服务容器是管理类依赖关系和执行依赖注入的一个强大工具。 It
contains all the modules of Goravel, and allows you to bind your own services to container and resolve them when needed.
服务容器为Goravel周围的第三方包提供强大的支持。

## 绑定中

### 简单绑定

几乎所有您的服务容器绑定都将注册在 [服务提供商] (./providers)。
在服务提供商中，您总是可以通过 `app` 参数访问容器，然后注册一个绑定的
使用 `Bind` 方法， 传递我们想要注册的 `key` 以及返回一个
类实例的闭合：

```go
package route

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel.route"

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(app foundation.Application) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app.MakeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

如上文所述，您通常将与服务提供商内的容器进行互动； 然而，如果您想要
与服务提供商外的容器交互，您可以通过 `App`的面板这样做：

```go
facades.App().Bind("key", function(app foundation.Application) (任何错误) {
    ...
})
```

### 绑定单行符

`Singleton` 方法将类或接口绑定到容器中，容器只能解决一次。 一旦
单独绑定解决，在随后调用到容器时将返回相同的对象实例：

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### 绑定实例

您也可以使用 `Instance` 方法将现有对象实例绑定到容器中。 The given instance will
always be returned on subsequent calls into the container:

```go
应用程序实例(键, 实例)
```

### 绑定参数

If you need some extra parameters to construct the service provider, you can use the `BindWith` method to pass
parameters to the closure:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## 正在解决

### `Make`方法

您可以使用 `Make` 方法来解析容器中的类实例。 `Make`方法接受了您的
想解决的 `key`：

```go
例如，err := app.Make(key)
```

如果您在无法访问`app`变量的代码位置的服务提供商之外， 您的
可以使用 `App` 面来解析容器中的类实例：

```go
例如：err := facades.App().Make(key)
```

### `MakeWid`方法

如果您的类的一些依赖关系无法通过容器解决， 您可以通过将它们作为一个
关联数组传入对 `MakeWi` 方法中，对应的 `BindWith` 绑定方法来注入它们：

```go
例如：err := app.MakeWid(key, map[string]any {"id": 1})
```

### 其他方法

框架提供了一些方便的方法来快速解决各种问题：“MakeArtisan”、“MakeAuth”、“
`MakeCache`、`MakeConfig`、`MakeCrypt`、`MakeEvent`、`MakeEvent`”， `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
