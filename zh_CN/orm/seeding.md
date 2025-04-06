# Seeding

Goravel 包含使用种子结构填充数据库的功能。 所有种子结构都存储在 `database/seeders` 目录中。 默认情况下，为您定义了一个 `DatabaseSeeder` 结构。

## 编写种子

要生成种子，请运行 `make:seeder` [Artisan 命令](../advanced/artisan)。 框架生成的所有种子都将存储在 `database/seeders` 目录中：

```shell
go run . artisan make:seeder UserSeeder
```

默认情况下，种子结构有两个方法：`Signature` 和 `Run`。 `Signature` 方法设置种子的名称，而 `Run` 方法在执行 `db:seed` Artisan 命令时触发。 您可以使用 `Run` 方法以任何您喜欢的方式将数据插入到数据库中。

为了说明，我们可以通过在 `Run` 方法中添加数据库插入语句来自定义 `DatabaseSeeder` 结构体。

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github.com/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Signature 种子器的名称和签名。
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Run 执行种子器逻辑。
func (s *DatabaseSeeder) Run() error {
 user := models.User{
  Name: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## 调用其他 Seeder

在 `DatabaseSeeder` 结构体中，你可以使用 `Call` 方法来执行其他种子结构体。 使用 `Call` 方法允许你将数据库种子分解成多个文件，这样就不会让单个种子结构体变得过大。 `Call` 方法接受一个应该被执行的种子结构体数组：

```go
// Run 执行种子器逻辑。
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework 还提供了一个 `CallOnce` 方法，一个 seeder 将只在 `db:seed` 命令中执行一次：

```go
// Run 执行 seeder 逻辑。
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## 运行 Seeders

你可以运行 `db:seed` Artisan 命令来为数据库填充数据。 默认情况下，`db:seed` 命令运行 `database/seeders/database_seeder.go` 文件，该文件可能会调用其他 seed 类。 然而，你可以使用 `--seeder` 选项来指定一个特定的 seeder 类单独运行：

```shell
go run . artisan db:seed
```

如果你想在运行 `db:seed` 命令时执行其他 seeders，你可以在 `app/providers/database_service_provider.go` 中注册 seeder：

```go
// app/providers/database_service_provider.go
func (receiver *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders.DatabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders.PhotoSeeder{},
 })
}

go run . artisan db:seed --seeder=UserSeeder PhotoSeeder // seeder的签名
```

您还可以使用`migrate:fresh`和`migrate:refresh`命令结合`--seed`选项来为数据库填充数据，这将删除所有表并重新运行所有迁移。 此命令对于完全重建数据库非常有用。 `--seeder`选项可用于指定要运行的特定填充器：

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### 强制在生产环境中运行填充器

某些填充操作可能会导致您更改或丢失数据。 为了保护您不会在生产数据库上运行填充命令，在`production`环境中执行填充器之前，系统会提示您进行确认。 要在不提示的情况下强制运行种子程序，请使用 `--force` 标志：

```shell
go run . artisan db:seed --force
```
