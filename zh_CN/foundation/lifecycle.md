# 请求生命周期

`main.go`文件是Goravel应用程序中所有请求的入口点。 它使用
`bootstrap.Boot()` 函数初始化框架。

然后，由 `app := foundation.NewApplication()` 在 `bootstrap/app.go` 中创建一个 Goravel 实例。

After this, use `app.Boot()` to load the [Service Provider](providers) registered, and `config.Boot()` to
load the configuration files under the config directory.

最后，使用 `main.go`中的 `facades.Route().Run(facades.Config().GetString("app.host")` 启动HTTP服务器。
