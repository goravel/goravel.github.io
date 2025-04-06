# 面具

`facades` 为应用程序的核心功能提供一个“静态”接口，提供一个更灵活、更高的
优雅和易于测试的语法。

Goravel的所有`facades` 都定义在 `github.com/goravel/framework/facades` 中。 我们可以轻松地使用“facades”：

```go
导入 "github.com/goravel/framework/facades"

facades.Route()Run(facades.Config().GetString("app.host"))
```

## 面孔工作方式

`facades` 通常是在每个模块 `ServerProverProvider` 的 `Register` 或 `Boot` 阶段中实例化的。

```go
func (config *ServiceProvider) Register() Power
  app := Application{}
  facades.Config = app.Init()
}
```

如果`facades`使用其他`facades`，那么它们就会在 `ServerProverer`的 `Boot` 阶段中实例化：

```go
func (database *ServiceProvider) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## 表面类引用

| 面部：     | 文件                                           |
| ------- | -------------------------------------------- |
| 应用      | [Container](../foundation/container)         |
| Artisan | [命令控制台](../advanced/artisan)                 |
| 认证      | [Authentication](../security/authentication) |
| 缓存      | [Cache](../advanced/cache)                   |
| 配置      | [Configuration](../quickstart/configuration) |
| 加密文件    | [Encryption](../security/encryption)         |
| 事件      | [Event](../advanced/events)                  |
| 门       | [Authorization](../security/authorization)   |
| 格尔普克    | [Grpc](../basic/grpc)                        |
| 哈希      | [Hashing](../security/hashing)               |
| 日志      | [Log](../basic/logging)                      |
| 邮件      | [Mail](../advanced/mail)                     |
| Orm     | [ORM](../orm/quickstart)                     |
| 队列      | [Queue](../advanced/queues)                  |
| 率限制器    | [RateLimiter](../basic/routing)              |
| 路由      | [Route](../basic/routing)                    |
| 搜索者     | [Seeder](../orm/seeding)                     |
| 日程安排    | [Schedule](../advanced/schedule)             |
| 存储      | [Storage](../advanced/schedule)              |
| 测试      | [Testing](../testing/quickstart)             |
| 验证      | [Validation](../advanced/schedule)           |
