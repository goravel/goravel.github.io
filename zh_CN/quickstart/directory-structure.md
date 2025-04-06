# 目录结构

默认文件结构可以让您更好地启动工程进化， 并且您也可以免费添加新文件夹，但是
不会修改默认文件夹。

## 根目录

### `app` 目录

`app` 包含程序的核心代码。 程序中的几乎所有逻辑都将在此文件夹中。

### `bootstrap` Directory

`bootstrap`目录包含框架启动文件`app.go`。

### `config` 目录

`config`目录包含应用程序的所有配置文件。 最好是浏览这些文件，并且
熟悉所有可用的选项。

### `database` 目录

`database`目录包含数据库迁移文件。

### `public` 目录

`public` 目录包含一些静态资源，如图像、证书等。

### `resources` 目录

`resources` 目录包含您的 [views](../basic/views)以及您的无编译资源，例如
CSS 或 JavaScript。

### `routes` 目录

`routes`目录包含应用程序的所有路由定义。

### `storage` 目录

`storage`目录包含`logs`目录，`logs`目录包含应用程序日志文件。

### `tests`目录

`tests`目录包含您的自动测试。

## `app` 目录

### `console` 目录

`console`目录包含应用程序的所有自定义 `Artisan`命令，以及控制台启动文件
`kernel。 o`, 可以在此文件中注册[任务计划](../advanced/schedule)

### `http`目录

`http`目录包含控制器、中间件等等，几乎所有通过
网页输入应用程序的请求都会在这里处理。

### `grpc`目录

`grpc`目录包含控制器、中间件等等，几乎所有通过
Grpc 输入应用程序的请求都会在这里处理。

### `model` 目录

`model`目录包含所有数据模型。

### `providers` 目录

The `providers` directory contains all [Service Providers](../foundation/providers) in the
program. 服务提供商通过绑定服务指导应用程序响应收到的请求，注册
事件或执行任何其他任务。
