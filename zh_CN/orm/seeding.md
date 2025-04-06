# 数据库：做种中

Goravel包括使用种子结构用数据创建数据库的能力。 所有种子结构都存储在
`database/seeders` 目录中。 默认情况下，`DatabaseSeeder` 结构是为您定义的。

## 写入种子中

要生成种子，请运行 `make:seeder` [Artisan command](../advanced/artisan)。 框架生成的所有种子的
将存储在 `database/seeders` 目录中：

```shell
去运行。个体操者make:seeder UserSeeder
```

默认情况下，探索者结构有两种方法：“签名”和“运行”。 `签名` 方法设定种子的名字，
当执行`db:seed`Artisan 命令时触发`Run`方法。 您可以使用 `Run` 方法来
以任何方式将数据插入到您的数据库中。

为了举例说明，我们可以通过在 `Run` 方法中添加数据库插入语句来自定义`DatabaseSeeder` 结构。

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github.com/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Signature The name and signature of the seeder.
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Run executes the seeder logic.
func (s *DatabaseSeeder) Run() error {
 user := models.User{
  Name: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## 调用额外种子设置

在 `DatabaseSeeder` 结构中，您可以使用 `Call` 方法来执行额外的种子结构。 Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. `Call`方法接受了一个应执行的探索者结构数组：

```go
// Run executes the seeder logic.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework 还提供一个 `CallOnce` 方法，在`db:seed` 命令中只能执行一次搜索器：

```go
// Run executes the seeder logic.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## 正在运行种子程序

您可以运行 `db:seed` Artisan 命令来创建您的数据库。 默认情况下，`db:seed`命令运行
`database/seeders/database_seeder.go`文件，这反过来又可以调用其他种子类。 然而，您可以使用
`--seeder` 选项来指定一个特定的搜索器类来单独运行：

```shell
开始运行。个体操者db:seed
```

如果你想要在运行 `db:seed' 命令时执行其他种子, 你可以在
`app/providers/database_service_provider.go\` 中注册寻找者:

```go
// app/providers/database_service_provider.go
func (receiver *DatabaseServiceProvider) Boot(app foundation.Application) Student
 facades.Seeder().Registrter([]seeder.Seeder.Seeder@un.
  &seeders. atabaseSeeder{},
        &seeders. UserSeeder{},
        &seeders. hotoSeeder{},
 })
}

然后运行。手艺人——种子--seeder=UserSeeder PhotoSeeker // 探索者签名
```

您还可以使用 `migrate:fresh` 和 `migrate:refresh` 命令与`--seed`
选项一起种子你的数据库。 这将丢弃所有表格并重新运行所有您的迁移。 This command is useful for completely re-building
your database. "--seeder" 选项可以用于指定要运行的特定搜索器：

```shell
去运行。手艺人迁移:fresh --seed

来运行手工艺人迁移:fresh --seeder=UserSeeder

去运行。 个工匠迁移:刷新--seed

运行。个工匠迁移:刷新--seeder=UserSeeder
```

### 强制种子在生产中运行

某些种子操作可能会导致您更改或丢失数据。 In order to protect you from running seeding commands
against your production database, you will be prompted for confirmation before the seeders are executed in the
`production` environment. 要强制种子在没有提示的情况下运行，请使用 "--force " 标志：

```shell
开始运行。个工匠db:seed --force
```
