# 迁移

当多人协作开发应用程序时，它非常重要的是有一个标准化的
同步数据库结构。 不这样做，就可能出现混乱，因为每个人的数据都不会匹配。 数据库迁移是
解决这个问题的方法。 数据库结构是由版本控制的，以确保它在所有的
开发者中的一致性。

## 配置

数据库迁移文件存储在 `database/migrations` 目录中。 您可以在“config/database.go”文件中配置数据库
连接信息。 目前，有两个迁移驱动程序可用：Go
语言迁移和 SQL 迁移。 但是，将在未来版本中删除SQL迁移。

```go
// 可用驱动器: "default", "sql"
"migrations": map[string]anyn
  "driver": "default",
  // 您可以累积迁移表名
  "table": "migrations",
},
```

## 创建迁移

使用 `make:migration` 命令来创建迁移：

```shell
去运行。个体人make:migration create_users_table
```

此命令将在 `database/migrations` 目录中生成迁移文件。 每个迁移文件将以一个
时间戳开头，Goravel 将用来决定迁移文件的执行顺序。

### 快速创建

使用 "create_users_table" 自动生成包含"users"基础结构的表格：

```
^create_(\w+)_table$
^create_(\w+)$
```

使用 "add_avatar_to_users_table" 自动生成一个结构以添加字段到 "users" 表：

```
_(to|from|in)_(\w+)_table$
_(to|from|in)_(\w+)$
```

如果上述条件不匹配，框架将生成一个空的迁移文件。

## 迁移结构

### 转到语言迁移

迁移结构包含两个方法：`Up` 和 `Down` 。 `Up`方法用于向数据库添加新的表、 列或
索引。 使用 `Down` 方法来撤消`Up` 方法进行的操作。 在这些
两种方法中，您可以使用 `facades.Schema()` 创建和运行数据库表。 关于可用的方法，请参阅
[documentation](#tables)。 以下迁移将创建 "用户" 表：

```go
package migrations

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github.com/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Signature The unique signature for the migration.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Up Run the migrations.
func (r *M20241207095921CreateUsersTable) Up() error {
 if !facades.Schema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table.ID()
   table.String("name").Nullable()
   table.String("email").Nullable()
   table.Timestamps()
  })
 }

 return nil
}

// Down Reverse the migrations.
func (r *M20241207095921CreateUsersTable) Down() error {
 return facades.Schema().DropIfExists("users")
}
```

#### 设置迁移连接

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
func (r *M20241207095921CreateUsersTable) Connection() string Community
  return "connection-name"
}
```

### SQL 迁移

迁移命令将生成两个迁移文件：`***.up.sql`和`***.down.sql`，分别对应于执行和
回滚。 您可以直接在这两个文件中写入 SQL 语句。

```sql
-- ***.up。 ql
CREATE TABLE `users` (
  `id` bigint(20) unigned not NULL AUTO_INCREMENT,
  `name` varchar(255) COLATE utf8mb4_unicode_ci DEFAULL,
  `email` varchar(255) COLATE utf8mb4_unicode_ci DEFAULLL,
  `created_at` timestamp NULL DEFAULL,
  `updated_at` tiestamp NULL DEFAULLL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLATE=utf8mb4_unicode_ci；

- ***。 own.sql
DROP TABLE 'users' ;
```

## 注册迁移

当使用 Go 语言迁移时，您需要在
迁移文件生成后在 `database/kernel.go` 文件中注册迁移文件：

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration@un.org[]return
 return []schema.Migrationeur
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

SQL 迁移不需要注册，因为框架将自动扫描
`database/migrations` 目录中的 SQL 文件。

## 运行迁移

要运行所有未完成的迁移，请执行 `migrate` Artisan 命令：

```shell
去运行。手工人员迁移
```

如果你想看到到到目前为止有哪些迁移，你可以使用 `migrate:status` Artisan 命令：

```shell
去运行。手艺人迁移:状态
```

## 滚动回移

要回滚最新的迁移，请使用 "回滚" Artisan 命令。 此命令回滚最后一次的
迁移的“批”，可能包含多个迁移文件：

```shell
去运行。手工人员迁移:回滚。
```

你可以通过提供 "step" 选项到 "回滚" 命令来回滚数量有限的迁移。 例如，
以下命令将会回滚最后五个迁移：

```shell
开始运行。手艺人迁移:回滚--step=5
```

`migrate:reset`命令将会回滚你所有的应用程序的迁移：

```shell
去运行。手工人员迁移:重置
```

### 使用单个命令滚动并迁移

`migrate:refresh`命令将会回滚你所有的迁移，然后执行`migrate`命令。 此命令
有效地重新创建整个数据库：

```shell
开始运行。手工人员迁移:刷新
```

你可以回滚并重新迁移数量有限的迁移，提供"步" 选项到 "刷新" 命令。
例如，下面的命令将回滚并重新迁移最后五个迁移：

```shell
开始运行。手艺人迁移:刷新--step=5
```

### 丢弃所有数据表并迁移

`migrate:fresh`命令将从数据库中丢弃所有表格，然后执行 `migrate`命令：

```shell
去运行。手艺人迁移:fresh
```

## 表

### 创建表

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### 检查是否存在表 / 列

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### 数据库连接

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### 更新表

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### 重命名/丢弃表

```go
Schema().Rename("users", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("users")

```

## 列

### 可用列类型

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| 增量                  | BigInteger         | Boolean               | 字符                          |
| 日期                  | 日期时间               | 日期TimeTz              | 小数                          |
| 双精度                 | [Enum](#enum)      | 浮点数                   | [ID](#id)                   |
| 增量                  | 整数                 | 整数增量                  | Json                        |
| 增量                  | LongText           | 中度增量                  | MediumInteger               |
| 中文本                 | 小增量                | 小整数                   | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | 字符串                | 文本                    | 时间                          |
| TimeTz              | 时间戳                | 时间戳                   | 时间戳Tz                       |
| 时间戳Tz               | UnsignedBigInteger | 温度增量                  | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

创建一个 `Enum` 字段，可以按照`[]任何`类型存储在 `Mysql` 中 但在 `Postgres`, `Sqlite`, 和
`Sqlserver`数据库中，它是 `String` 类型。

```go
表格.枚举("难度", []任何{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

`ID`方法是`Bigamendments`方法的一个别名。 默认情况下，这个方法将创建 "id" 列; 然而,
如果你想要给列分配一个不同的名称, 你可以通过列名称:

```go
table.ID()
table.ID("user_id")
```

#### 软删除

`SoftDeletes`方法添加了一个 null `deleted_at` `TIMESTAMP` 栏。 此列旨在保存 Orm "soft delete" 功能所需的
`deleted_at` 时间戳：

```go
Table.SoftDeletes()
```

#### 自定义列

如果您正在使用此框架不支持的列类型，您可以使用 `Column` 方法自定义
字段类型：

```go
table.Column("geometry", "geometry")
```

### 列修改器

In addition to the column types listed above, when adding a column to a database table, you can also add "modifiers" to
the column. 例如，要允许列为“空”，您可以使用 `Nullable` 方法：

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

下表包含所有可用列修饰符：

| 已修改                     | 描述                                                       |
| ----------------------- | -------------------------------------------------------- |
| `.自动增量()`               | 设置一个整数列为自动递增(主键)                      |
| `.comment("我的评论")`      | 在列中添加评论 (MySQL / PostgreSQL)          |
| `.Default(value)`       | 设置列的默认值                                                  |
| `.Nullable()`           | 允许将NULL值插入列                                              |
| `.未签名()`                | 设置一个整数列为UNSIGNED(仅MySQL)              |
| `.UseCurrent()`         | 设置时间戳列作为默认值                                              |
| `.UseCurrentOnUpdate()` | 设置一个时间戳列以在记录更新时使用 CURRENT_TIMESTAMP |

### 拖放列

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## 索引

### 创建索引

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Add primary key
  table.Primary("id")
  // Add composite primary key
  table.Primary("id", "name")

  // Add unique index
  table.Unique("name")
  table.Unique("name", "age")

  // Add normal index
  table.Index("name")
  table.Index("name", "age")

  // Add fulltext index
  table.FullText("name")
  table.FullText("name", "age")
})
```

### 重命名索引

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### 丢弃索引

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_unique")
  table.DropIndex("name")
  table.DropIndexByName("name_index")
  table.DropFullText("name")
  table.DropFullTextByName("name_fulltext")
})
```

### 创建外键

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### 丢弃外键

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
