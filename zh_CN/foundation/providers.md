# 服务商

内核启动操作中最重要的事情是加载 `ServiceProvider'。 
应用程序下的所有 `ServiceProvider`都在`config/app.go`中的 `providers\` 数组中配置。

首先，内核将调用所有服务提供者的“注册”方法。 在所有服务提供商都已注册了
后，内核将再次调用所有 `ServiceProvider` 的`Boot` 方法。

`ServiceProvider`是Goravel生命周期的钥匙。 它们允许框架包含各种组件，
例如路由、数据库、队列、缓存等。

You can also customize your own provider, it can be stored under `app/providers` and registered in the `providers` array
in `config/app.go`.

框架包含一个空白的服务提供商`app/providers/app_service_provider.go`，您可以在这里实现简单的
引导逻辑。 在更大的项目中，您可以选择创建新的服务提供商来进行更精确的控制。
