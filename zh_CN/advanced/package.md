# 软件包开发

包是添加功能到Goravel的主要方式。 这些软件包可能包含专为增强Goravel应用而设计的路由、控制器和
配置。 本指南的重点是开发
Goravel专用包。

这是构建第三方
包的一个示例：[goravel/example-package](https://github.com/goravel/example-package)

## 创建一个软件包

您可以轻松地使用Artisan 命令创建一个软件包模板：

```shell
去运行。个工匠make:package sms
```

创建的文件默认保存到 root `packes` 文件夹中，您可以使用 `--root` 选项自定义：

```shell
开始运行。个体人make:package --root=pkg sms
```

## 服务商

[服务提供商](../foundation/providers) 充当你的包和Goravel之间的桥梁。
他们通常位于软件包的根目录中，为 `service_provider.go` 文件。 他们的主要功能是将
物品绑定到Goravel的服务容器中，并引导Goravel加载包资源。

## 用法

注册包中的`ServiceProvider`到`config/app.go:providers`, 然后导出`facades` 到应用程序。
详细步骤请参阅[goravel/example-package](https://github.com/goravel/example-package)。

## 资源

### 配置

通常，您需要将您的包配置文件发布到应用程序的 `config` 目录中。 This will
allow users of your package to easily override your default configuration options. 要允许您的配置文件发布为
，请从您的服务提供商的 `Boot` 方法调用`Publishes` 方法。 第一个参数是
软件包名，而第二个参数是当前软件包文件路径和项目路径之间的映射：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) On.
  app.Publishes("github.com/goravel/example-package", map[string]string.
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### 路由

如果你的包中有 [routes](../basic/routing)，你可以使用 `app.MakeRoute()` 来解析
`facades.Route()` ，然后将路由添加到项目：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application)
 route := app.MakeRoute()
 route.Get("sm", ***)
}
```

### 迁移

如果你的包中有 [migrations](../orm/migrations)，你可以通过 `Publishes` 方法发布它们：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) Power
  app.Publishes("github.com/goravel/example-package", map[string]stringu.
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## 命令

You can register `Artisan` command by the `Commands` method, you can run the commands
using [Artisan CLI](../advanced/artisan) after registering them.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## 公共资源

您的软件包可能有诸如JavaScript、CSS 和图像等资产。 若要将这些资源发布到应用程序的 `public`
目录，请使用服务提供商的 `Publishes` 方法：

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) Power
  app.Publishes("github.com/goravel/example-package", map[string]strington.
    "public": app.publicPath("vendor"),
  })
}
```

## 发布文件组

如果您想要单独发布特定的包资产和资源群组， 当从包的服务提供商调用
`Publishes` 方法时，您可以使用标签。 这允许您为用户提供发布特定的
文件的选项，如配置文件，而无需发布所有软件包的资产。 To illustrate, you can define two
publish groups for the `sms` package (`sms-config` and `sms-migrations`) using tags in the `Boot` method of the
package's service provider.

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

在这个项目中，您可以发布一个软件包中注册的资源使用 `vendor:publish` Artisan 命令：

```shell
开始运行。个工匠卖家:发布--package={You package name}
```

命令可以使用以下选项：

| 选项名称      | Alias | 行 动                                                                                                    |
| --------- | ----- | ------------------------------------------------------------------------------------------------------ |
| --package | -p    | 软件包名称，可以是远程软件包：`github.com/goravel/example-package`，也可以是本地软件包：`。 软件包/示例包`, 注意到当使用本地软件包名称时，它需要以 `./`开头。 |
| --tag     | -t    | 资源组                                                                                                    |
| --force   | -f    | 覆盖所有现有文件                                                                                               |
| --existe  | -e    | 仅发布并覆盖已经发布的文件                                                                                          |
