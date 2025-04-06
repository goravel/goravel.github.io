# 外观

`facades` 为应用程序的核心功能提供了一个"静态"接口，并提供了更灵活、更优雅且易于测试的语法。

Goravel 的所有 `facades` 都定义在 `github.com/goravel/framework/facades` 下。 我们可以轻松使用 `facades`：

```go
import "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## 外观如何工作

`facades` 通常在每个模块 `ServerProvider` 的 `Register` 或 `Boot` 阶段实例化。

```go
func (config *ServiceProvider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

如果 `facades` 使用其他 `facades`，则在 `ServerProvider` 的 `Boot` 阶段实例化它们：

```go
func (database *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## Facade 类参考

| 外观      | 文档                                |
| ------- | --------------------------------- |
| 应用      | [容器](../foundation/container)     |
| Artisan | [命令行控制台](../advanced/artisan)     |
| 认证      | [认证](../security/authentication)  |
| 缓存      | [缓存](../advanced/cache)           |
| 配置      | [配置](../quickstart/configuration) |
| 加密      | [加密](../security/encryption)      |
| 事件      | [事件](../advanced/events)          |
| 门面      | [授权](../security/authorization)   |
| Grpc    | [Grpc](../basic/grpc)             |
| 哈希      | [哈希](../security/hashing)         |
| 日志      | [日志](../basic/logging)            |
| 邮件      | [邮件](../advanced/mail)            |
| ORM     | [ORM](../orm/quickstart)          |
| 队列      | [队列](../advanced/queues)          |
| 速率限制器   | [速率限制器](../basic/routing)         |
| 路由      | [路由](../basic/routing)            |
| 种子      | [种子](../orm/seeding)              |
| 调度      | [调度](../advanced/schedule)        |
| 存储      | [存储](../advanced/schedule)        |
| 测试      | [测试](../testing/quickstart)       |
| 验证      | [验证](../advanced/schedule)        |
