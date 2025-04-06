# 包开发

包是向 Goravel 添加功能的主要方式。 这些包可能包含专门设计用于增强 Goravel 应用程序的路由、控制器和配置。 本指南重点介绍开发 Goravel 特定的包。

这里有一个构建第三方包的示例：[goravel/example-package](https://github.com/goravel/example-package)

## 创建包

您可以使用 Artisan 命令轻松创建包模板：

```shell
go run . artisan make:package sms
```

创建的文件默认保存在根目录的 `packages` 文件夹中，您可以使用 `--root` 选项进行自定义：

```shell
go run . artisan make:package --root=pkg sms
```

## 服务提供者

[服务提供者](../foundation/providers)充当您的包和 Goravel 之间的桥梁。
它们通常位于包的根目录中，作为一个 `service_provider.go` 文件。 它们的主要功能是将项目绑定到 Goravel 的服务容器中，并指导 Goravel 加载包资源。

## 用法

在 `config/app.go::providers` 中注册包的 `ServiceProvider`，然后将 `facades` 导出到应用程序。
有关详细步骤，请参阅 [goravel/example-package](https://github.com/goravel/example-package)。

## 资源

### 配置

通常，您需要将包的配置文件发布到应用程序的 `config` 目录中。 这将允许包的用户轻松覆盖您的默认配置选项。 要允许发布您的配置文件，请从服务提供者的 `Boot` 方法中调用 `Publishes` 方法，第一个参数是包名，第二个参数是当前包文件路径和项目路径之间的映射：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### 路由

如果你的包中有[路由](../basic/routing)，你可以使用 `app.MakeRoute()` 来解析 `facades.Route()`，然后将路由添加到项目中：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### 迁移

如果你的包中有[迁移](../orm/migrations)，你可以通过 `Publishes` 方法发布它们：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## 命令

你可以通过 `Commands` 方法注册 `Artisan` 命令，注册后你可以使用 [Artisan CLI](../advanced/artisan) 运行这些命令。

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## 公共资源

你的包可能有 JavaScript、CSS 和图片等资源。 要将这些资源发布到应用程序的 `public` 目录，使用服务提供者的 `Publishes` 方法：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## 发布文件组

如果你想单独发布特定组的包资源，你可以在包的服务提供者中调用 `Publishes` 方法时使用标签。 这使你能够给用户选择发布某些文件，如配置文件，而不必发布包的所有资源。 为了说明，你可以在包的服务提供者的 `Boot` 方法中使用标签为 `sms` 包定义两个发布组（`sms-config` 和 `sms-migrations`）。

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  }, "sms-migrations")
}
```

## 发布资源

在项目中，您可以使用 `vendor:publish` Artisan 命令发布包中注册的资源：

```shell
go run . artisan vendor:publish --package={您的包名}
```

该命令可以使用以下选项：

| 选项名称       | 别名 | 操作                                                                                                       |
| ---------- | -- | -------------------------------------------------------------------------------------------------------- |
| --package  | -p | 包名，可以是远程包：`github.com/goravel/example-package`，也可以是本地包：`./packages/example-package`，注意使用本地包名时需以 `./` 开头。 |
| --tag      | -t | 资源组                                                                                                      |
| --force    | -f | 覆盖任何现有文件                                                                                                 |
| --existing | -e | 仅发布并覆盖已经发布的文件                                                                                            |
