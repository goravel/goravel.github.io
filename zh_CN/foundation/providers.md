# 服务提供者

内核启动操作中最重要的是加载 `ServiceProvider`。 应用程序下的所有 `ServiceProvider` 都在 `config/app.go` 的 `providers` 数组中配置。

首先，内核将调用所有服务提供者的 `Register` 方法。 在所有服务提供者注册完成后，内核将再次调用所有 `ServiceProvider` 的 `Boot` 方法。

`ServiceProvider` 是 Goravel 生命周期的关键。 它们使框架能够包含各种组件，如路由、数据库、队列、缓存等。

你也可以自定义自己的提供者，它可以存储在 `app/providers` 下，并在 `config/app.go` 的 `providers` 数组中注册。

框架自带一个空白的服务提供者 `app/providers/app_service_provider.go`，你可以在其中实现简单的启动逻辑。 在更大的项目中，你可以选择创建新的服务提供者以实现更精确的控制。
