# 配置

Goravel框架的所有配置文件都保存在`config`目录中。 您可以查看指定的
说明并根据项目需要灵活配置它们。

## 环境配置

在不同环境中运行应用程序通常需要不同的配置。 例如，您可能想要
在本地打开调试模式，但在生产环境中不需要它。

因此，框架提供了根目录中的`.env.example`文件。 You need to copy this file, rename it
to `.env` before you start development, and modify the configuration items in the `.env` file according to your project
needs.

请注意`。 nv`文件不应被添加到版本控制中，因为当多人合作时， 不同的
开发者可能使用不同的配置，不同的部署环境配置是不同的。

此外，如果入侵者能够访问您的代码仓库，则有可能暴露敏感的
配置。 如果你想要添加一个新的配置项, 你可以添加它到 `.env.example` 文件来同步所有开发者的
配置。

## 获取环境配置

使用以下方法获取`.env`文件中的配置项：

```go
// 第一个参数是配置键，第二个参数是默认值
facades.Config().Env("APP_NAME", "goravel")
```

## 访问配置值

您可以轻松地使用应用程序中的全局`facades.Config()`函数来访问`config`目录中的配置值
。 对配置值的访问可以使用“.”语法。 您也可以指定默认的
值，如果配置选项不存在，则返回默认值：

```go
// 通过断言
facades.Config().Get("app.name", "goravel")

// 获取字符串类型
facades.Config().GetString("app. 您可以使用
facades.Config().GetInt("app. - "goravel")

// 获取int 类型
 facades.Config().GetInt("app. nt", 1)

// 获取布尔类型
facades.Config().GetBool("app.debug", true)
```

## 设置配置

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## 获取项目信息

您可以使用 `technologan about` 命令查看框架版本、配置等。

```bash
去运行艺人关于
```
