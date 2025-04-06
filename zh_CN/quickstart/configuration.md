# 配置

Goravel 框架的所有配置文件都存储在 `config` 目录中。 您可以查看具体说明并根据项目需求灵活配置。

## 环境配置

在不同环境中运行应用程序通常需要不同的配置。 例如，您可能希望在本地开启调试模式，但在生产环境中不需要。

因此，框架在根目录提供了 `.env.example` 文件。 在开始开发之前，您需要复制此文件，将其重命名为 `.env`，并根据项目需求修改 `.env` 文件中的配置项。

请注意，`.env` 文件不应添加到版本控制中，因为当多人协作时，不同开发人员可能使用不同的配置，而且不同部署环境的配置也不同。

此外，如果入侵者获取了您的代码仓库访问权限，将存在敏感配置泄露的风险。 如果你想添加一个新的配置项，你可以将其添加到`.env.example`文件中，以同步所有开发人员的配置。

## 获取环境配置

使用以下方法获取`.env`文件中的配置项：

```go
// 第一个参数是配置键，第二个参数是默认值
facades.Config().Env("APP_NAME", "goravel")
```

## 访问配置值

你可以在应用程序的任何地方使用全局`facades.Config()`函数轻松访问`config`目录中的配置值。 访问配置值可以使用"."语法。 你还可以指定一个默认值，如果配置选项不存在，则返回默认值：

```go
// 通过断言获取配置
facades.Config().Get("app.name", "goravel")

// 获取字符串类型的配置
facades.Config().GetString("app.name", "goravel")

// 获取整数类型的配置
facades.Config().GetInt("app.int", 1)

// 获取布尔类型的配置
facades.Config().GetBool("app.debug", true)
```

## 设置配置

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## 获取项目信息

您可以使用 `artisan about` 命令查看框架版本、配置等信息。

```bash
go run . artisan about
```
