# 入门

Goravel 使开发人员可以轻松地使用 `facades.Orm()` 与数据库进行交互。 目前，它官方支持以下四种数据库：

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

在开始之前，请在 `.env` 中配置数据库，并确认 `config/database.go` 中的 `default` 配置。

# 配置

要配置数据库，请导航到 `config/database.go`。 在这里，您可以自定义所有数据库连接并选择一个 `default` 连接。 此文件中的配置依赖于项目的环境变量，并展示了Goravel支持的各种数据库配置。

### DSN

你也可以使用DSN直接连接数据库，只需在配置文件中配置`dsn`字段：

```go
"postgres": map[string]any{
  "driver":   "postgres",
++  "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### 读写连接

有时你可能希望对`SELECT`语句使用一个数据库连接，而对`INSERT`、`UPDATE`和`DELETE`语句使用另一个连接。 Goravel使这变得轻而易举。 Goravel makes this a breeze.

让我们看一个例子来了解如何配置读/写连接：

```go
import "github.com/goravel/framework/contracts/database"

// config/database.go
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "read": []database.Config{
      {Host: "192.168.1.1", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database.Config{
      {Host: "192.168.1.2", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "host": config.Env("DB_HOST", "127.0.0.1"),
    "port":     config.Env("DB_PORT", 3306),
    "database": config.Env("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config.Env("DB_PASSWORD", ""),
    "charset":  "utf8mb4",
    "loc":      "Local",
  },
}
```

We have updated the configuration array with two new keys - `read` and `write`. The `read` connection will use
`192.168.1.1` as the host, while the `write` connection will use `192.168.1.2`. Both connections will share the same
database prefix, character set, and other options specified in the main mysql array. In case of multiple values in the
`host` configuration array, a database host will be selected randomly for each request.

### 连接池

您可以在配置文件中配置连接池，合理配置连接池参数
可以大大提高并发性能：

| 键                                                                                | 作用       |
| -------------------------------------------------------------------------------- | -------- |
| pool.max_idle_conns    | 最大空闲连接数  |
| pool.max_open_conns    | 最大打开连接数  |
| pool.conn_max_idletime | 连接最大空闲时间 |
| pool.conn_max_lifetime | 连接最大生存时间 |

### Schema

Postgres and SQL Server support configuring Schema. Postgres 和 SQL Server 支持配置 Schema。 Postgres 可以直接在配置文件中设置 Schema，而 SQL Server 需要通过模型中的 `TableName` 方法指定 Schema。

#### Postgres

```go
"connections": map[string]any{
  "postgres": map[string]any{
    "driver":   "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### SQL Server

```go
func (r *User) TableName() string {
  return "goravel.users"
}
```

### 获取数据库信息

您可以使用 `db:show` 命令查看数据库中的所有表。

```bash
go run . artisan db:show
```

您还可以使用 `db:table` 命令查看特定表的结构。

```bash
go run . artisan db:table
go run . artisan db:table users
```

## 模型定义

To create a custom model, refer to the model file `app/models/user.go` that is included in the framework. 要创建自定义模型，请参考框架中包含的模型文件 `app/models/user.go`。 `app/models/user.go` 中的 `struct` 包含两个嵌入式框架：`orm.Model` 和 `orm.SoftDeletes`。 这些框架分别定义了 `id`、`created_at`、`updated_at` 和 `deleted_at` 属性。 通过 `orm.SoftDeletes`，您可以为模型启用软删除功能。 These frameworks define
`id`, `created_at`, `updated_at`, and `deleted_at` properties respectively. With `orm.SoftDeletes`, you can enable soft
deletion for the model.

### 模型约定

1. 模型使用大驼峰命名；
2. 使用模型的复数形式"蛇形命名"作为表名；

例如，模型名称为 `UserOrder`，表名为 `user_orders`。

### 创建模型

使用 `make:model` 命令创建模型：

```shell
go run . artisan make:model User
go run . artisan make:model user/User
```

创建的模型文件位于 `app/models/user.go` 文件中，内容如下：

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm.Model
  Name   string
  Avatar string
  orm.SoftDeletes
}
```

如果你想将模型字段设置为 `any`，你需要添加一个额外的标签：`gorm:"type:text"`：

```go
type User struct {
  orm.Model
  Name   string
  Avatar string
  Detail any `gorm:"type:text"`
  orm.SoftDeletes
}
```

更多标签使用详情可以在这里找到：<https://gorm.io/docs/models.html>。

### 指定表名

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm.Model
  Name   string
  Avatar string
  orm.SoftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### 数据库连接

默认情况下，所有模型都使用为应用程序配置的默认数据库连接。 如果你希望在与特定模型交互时指定一个不同的连接，你需要在模型上定义一个 `Connection` 方法。 If you wish to specify a
distinct connection to be used when interacting with a particular model, you need to define a `Connection` method on the
model.

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm.Model
  Name   string
  Avatar string
  orm.SoftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## facades.Orm() 可用函数

| 名称          | 操作                                                                   |
| ----------- | -------------------------------------------------------------------- |
| Connection  | [指定数据库连接](#specify-database-connection)                              |
| DB          | [通用数据库接口 sql.DB](#generic-database-interface-sql-db) |
| Query       | [获取数据库实例](#get-database-instance)                                    |
| Transaction | [事务](#transaction)                                                   |
| WithContext | [注入上下文](#inject-context)                                             |

## facades.Orm().Query() 可用函数

| Functions       | 操作                                                   |
| --------------- | ---------------------------------------------------- |
| Begin           | [开始事务](#transaction)                                 |
| Commit          | [提交事务](#transaction)                                 |
| Count           | [计数](#count)                                         |
| Create          | [创建](#create)                                        |
| Cursor          | [游标](#cursor)                                        |
| Delete          | [删除](#delete)                                        |
| Distinct        | [过滤重复](#filter-repetition)                           |
| Driver          | [获取驱动程序](#get-driver)                                |
| Exec            | [执行原生更新 SQL](#execute-native-update-sql)             |
| Exists          | [存在](#exists)                                        |
| Find            | [通过 ID 查询一行或多行](#query-one-or-multiple-lines-by-id)  |
| FindOrFail      | [未找到返回错误](#not-found-return-error)                   |
| First           | [查询一行](#query-one-line)                              |
| FirstOr         | [通过回调查询或返回数据](#query-one-line)                       |
| FirstOrCreate   | [检索或创建模型](#retrieving-or-creating-models)            |
| FirstOrNew      | [检索或新建模型](#retrieving-or-creating-models)            |
| FirstOrFail     | [未找到错误](#not-found-error)                            |
| ForceDelete     | [强制删除](#delete)                                      |
| Get             | [查询多行](#query-multiple-lines)                        |
| Group           | [分组](#group-by--having)                              |
| Having          | [Having](#group-by-having)                           |
| Join            | [连接](#join)                                          |
| Limit           | [限制](#limit)                                         |
| LockForUpdate   | [悲观锁](#pessimistic-locking)                          |
| Model           | [指定模型](#specify-table-query)                         |
| Offset          | [偏移量](#offset)                                       |
| Order           | [排序](#order)                                         |
| OrderBy         | [排序](#order)                                         |
| OrderByDesc     | [排序](#order)                                         |
| InRandomOrder   | [订单](#order)                                         |
| OrWhere         | [查询条件](#where)                                       |
| OrWhereNotIn    | [查询条件](#where)                                       |
| OrWhereNull     | [查询条件](#where)                                       |
| OrWhereIn       | [查询条件](#where)                                       |
| Paginate        | [分页](#paginate)                                      |
| Pluck           | [查询单列](#query-single-column)                         |
| Raw             | [执行原生SQL](#execute-native-sql)                       |
| Restore         | [恢复](#restore)                                       |
| Rollback        | [回滚事务](#transaction)                                 |
| Save            | [更新已存在的模型](#update-a-existing-model)                 |
| SaveQuietly     | [不使用事件保存单个模型](#saving-a-single-model-without-events) |
| Scan            | [扫描结构体](#execute-native-sql)                         |
| Scopes          | [作用域](#scopes)                                       |
| Select          | [指定字段](#specify-fields)                              |
| SharedLock      | [悲观锁定](#pessimistic-locking)                         |
| Sum             | [求和](#sum)                                           |
| Table           | [指定表格](#specify-table-query)                         |
| ToSql           | [获取 SQL](#get-sql)                                   |
| ToRawSql        | [获取 SQL](#get-sql)                                   |
| Update          | [更新单个列](#update-a-single-column)                     |
| UpdateOrCreate  | [更新或创建](#update-or-create)                           |
| Where           | [查询条件](#where)                                       |
| WhereBetween    | [查询条件](#where)                                       |
| WhereNotBetween | [查询条件](#where)                                       |
| WhereNotIn      | [查询条件](#where)                                       |
| WhereNull       | [查询条件](#where)                                       |
| WhereIn         | [查询条件](#where)                                       |
| WithoutEvents   | [静音事件](#muting-events)                               |
| WithTrashed     | [查询软删除数据](#query-soft-delete-data)                   |

## 查询构建器

### 注入上下文

```go
facades.Orm().WithContext(ctx)
```

### 指定数据库连接

如果在 `config/database.go` 中定义了多个数据库连接，你可以通过 `facades.Orm()` 的 `Connection` 函数来使用它们。 传递给 `Connection` 的连接名应该是 `config/database.go` 中配置的连接之一： The connection name passed to `Connection` should be one of the connections configured in
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### 通用数据库接口 sql.DB

通用数据库接口 sql.DB，然后使用它提供的功能：

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Close
db.Close()

// 返回数据库统计信息
db.Stats()

// SetMaxIdleConns 设置空闲连接池中的最大连接数
db.SetMaxIdleConns(10)

// SetMaxOpenConns 设置打开数据库的最大连接数
db.SetMaxOpenConns(100)

// SetConnMaxLifetime 设置连接可以重用的最长时间
db.SetConnMaxLifetime(time.Hour)
```

### 获取数据库实例

在进行每个具体的数据库操作之前，需要获取数据库的实例。

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Select

#### 查询单行

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

Sometimes you may wish to perform some other action if no results are found. 有时您可能希望在未找到结果时执行其他操作。 `FirstOr` 方法将返回单个模型实例，如果未找到结果，则执行给定的闭包。 您可以在闭包中设置模型的值： You can set values to model in closure:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### 通过ID查询单行或多行

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var users []models.User
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### 未找到返回错误

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### 当用户表的主键为`string`类型时，调用时需要指定主键

`Find`方法

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a"；
```

#### 查询多行

```go
var users []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### 检索或创建模型

The `FirstOrCreate` method searches for a database record using the specified column/value pairs. `FirstOrCreate`方法使用指定的列/值对搜索数据库记录。 如果在数据库中找不到该模型，它会通过合并第一个参数和可选的第二个参数的属性创建一个新记录。

Similarly, the `FirstOrNew` method also tries to locate a record in the database based on the attributes given. However,
if it is not found, a new instance of the model is returned. 同样，`FirstOrNew`方法也尝试根据给定的属性在数据库中定位记录。 但是，如果没有找到，则返回模型的新实例。 请注意，这个新模型尚未保存到数据库中，您需要手动调用 `Save` 方法来执行保存操作。

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32.556','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### 未找到错误

当请求的项目未找到时，`First` 方法不会生成错误。 要生成错误，请使用 `FirstOrFail` 方法： To generate an error, use the
`FirstOrFail` method:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Where

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
facades.Orm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Query().OrWhereIn("name", []any{"a"})
```

### Limit

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Offset

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Order

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sort asc").Order("id desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades.Orm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom").OrderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").OrderByDesc("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Paginate

```go
var users []models.User
var total int64
facades.Orm().Query().Paginate(1, 10, &users, &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### 查询单列

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### 指定表查询

如果您想查询一些聚合数据，需要指定一个具体的表。

指定模型

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

指定表

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // get all records, whether deleted or not
```

### 获取 SQL

获取带占位符的 SQL：

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = $1 AND "users"."deleted_at" IS NULL
```

获取带值的 SQL：

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = 1 AND "users"."deleted_at" IS NULL
```

以下方法可以在 `ToSql` 和 `ToRawSql` 之后调用：`Count`、`Create`、`Delete`、`Find`、`First`、`Get`、`Pluck`、
`Save`、`Sum`、`Update`。

### Count

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### 指定字段

`Select` 允许您指定从数据库中检索哪些字段，默认情况下 ORM 会检索所有字段。

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### 分组和 Having

```go
type Result struct {
  Name  string
  Total int
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Join

```go
type Result struct {
  Name  string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users.name, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Create

```go
user := models.User{Name: "tom", Age: 18}
err := facades.Orm().Query().Create(&user)
// INSERT INTO users (name, age, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// 不触发模型事件
err := facades.Orm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// 触发模型事件
err := facades.Orm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### 多条创建

```go
users := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users").Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm().Query().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` 和 `updated_at` 将自动填充。

### 游标

当迭代处理数万条 Eloquent 模型记录时，可以显著减少应用程序的内存消耗。 注意，`Cursor` 方法可以与 `With` 同时使用，请在 `for` 逻辑中使用[延迟预加载](./relationships#lazy-eager-loading)来加载关联关系。 Note, the `Cursor` method can be used with `With` at the same time, please
use [Lazy Eager Loading](./relationships#lazy-eager-loading) to load relationship in the `for` logic.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var user models.User
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### 保存模型

#### 更新现有模型

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query().Save(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### 更新列

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(models.User{Name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> When updating with `struct`, Orm will only update non-zero fields. You might want to use `map` to update attributes or
> use `Select` to specify fields to update. 使用 `struct` 更新时，Orm 只会更新非零字段。 你可能想使用 `map` 来更新属性或使用 `Select` 来指定要更新的字段。 注意，`struct` 只能是 `Model`，如果你想使用非 `Model` 进行更新，你需要使用 `.Table("users")`，但是此时 `updated_at` 字段无法自动更新。

#### 更新或创建

通过 `name` 查询，如果不存在，则通过 `name`、`avatar` 创建，如果存在，则基于 `name` 更新 `avatar`：

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` IS NULL ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08.869',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL AND `id` = 1;
```

### Delete

通过模型删除，该方法返回受语句影响的行数：

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}).Where("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

多重删除

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE FROM `users` WHERE name = 'tom';
```

想要强制删除软删除的数据。

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete()
```

你可以通过 `Select` 删除带有模型关联的记录：

```go
// 删除用户时删除用户的账户
facades.Orm().Query().Select("Account").Delete(&user)

// 删除用户时删除用户的订单和信用卡
facades.Orm().Query().Select("Orders", "CreditCards").Delete(&user)

// 删除用户时删除用户的所有子关联
facades.Orm().Query().Select(orm.Associations).Delete(&user)

// 删除用户时删除用户的所有账户
facades.Orm().Query().Select("Account").Delete(&users)
```

注意：只有在记录的主键不为空时，关联才会被删除，Orm 使用这些主键作为条件来删除关联记录：

```go
// 删除名称为'goravel'的用户，但不删除用户的账户
facades.Orm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{})

// 删除名称为'goravel'且id为1的用户，并删除用户的账户
facades.Orm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// 删除id为1的用户并删除该用户的账户
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

如果在没有任何条件的情况下执行批量删除，ORM 不会执行该操作并返回错误。 因此，你必须添加一些条件，或使用原生 SQL。 So you have to add some
conditions, or use native SQL.

### 查询软删除数据

```go
var user models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### 过滤重复

```go
var users []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### 获取驱动程序

```go
driver := facades.Orm().Query().Driver()

// 判断驱动程序
if driver == orm.DriverMysql {}
```

### 执行原生 SQL

```go
type Result struct {
  ID   int
  Name string
  Age  int
}

var result Result
facades.Orm().Query().Raw("SELECT id, name, age FROM users WHERE name = ?", "tom").Scan(&result)
```

### 执行原生更新 SQL

该方法返回语句影响的行数：

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Exists

```go
var exists bool
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Exists(&exists)
```

### Restore

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transaction

你可以通过 `Transaction` 函数执行事务。

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

...

return facades.Orm().Transaction(func(tx orm.Query) error {
  var user models.User

  return tx.Find(&user, user.ID)
})
```

你也可以手动控制事务的流程：

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx.Create(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Scopes

允许你指定常用的查询，可以在调用方法时引用。

```go
func Paginator(page string, limit string) func(methods orm.Query) orm.Query {
  return func(query orm.Query) orm.Query {
    page, _ := strconv.Atoi(page)
    limit, _ := strconv.Atoi(limit)
    offset := (page - 1) * limit

    return query.Offset(offset).Limit(limit)
  }
}

// scopes.Paginator is a custom function: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### 原始表达式

你可以使用 `db.Raw` 方法来更新字段：

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### 悲观锁定

查询构建器还包括一些函数，帮助你在执行 `select` 语句时实现 "悲观锁定"。

To execute a statement with a "shared lock", you may call the `SharedLock` method. 要使用 "共享锁" 执行语句，你可以调用 `SharedLock` 方法。 共享锁防止所选择的行在你的事务提交之前被修改：

```go
var users []models.User
facades.Orm().Query().Where("votes", ">", 100).SharedLock().Get(&users)
```

Alternatively, you may use the `LockForUpdate` method. 或者，你可以使用 `LockForUpdate` 方法。 "用于更新" 锁防止所选择的记录在被修改或通过另一个共享锁被选择：

```go
var users []models.User
facades.Orm().Query().Where("votes", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
var sum int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## 事件

Orm 模型分派几个事件，允许你在模型生命周期的以下时刻插入： `Retrieved`, `Creating`, `Created`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`, `Restored`, `Restoring`。

The `Retrieved` event will dispatch when an existing model is retrieved from the database. When a new model is saved for
the first time, the `Creating` and `Created` events will dispatch. The `Updating` / `Updated` events will dispatch when
an existing model is modified and the `Save` method is called. The `Saving` / `Saved` events will dispatch when a model
is created or updated - even if the model's attributes have not been changed. Event names ending with `-ing` are
dispatched before any changes to the model are persisted, while events ending with `-ed` are dispatched after the
changes to the model are persisted.

要开始监听模型事件，在你的模型上定义一个 `DispatchesEvents` 方法。 此属性将模型生命周期的各个点映射到你自己的事件类。 This property maps various points
of the model's lifecycle to your own event classes.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm.Model
 Name    string
}

func (u *User) DispatchesEvents() map[contractsorm.EventType]func(contractsorm.Event) error {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm.EventCreating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRetrieved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestored: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestoring: func(event contractsorm.Event) error {
   return nil
  },
 }
}
```

> Note: Just register the events you need. 注意：只注册你需要的事件。 在通过 Orm 进行批量操作时，不会触发模型事件。

### 观察者

#### 定义观察者

If you are listening to many events on a given model, you may use observers to group all of your listeners into a single
class. Observer classes have method names that reflect the Eloquent events you wish to listen for. Each of these methods
receives the affected model as their only argument. The `make:observer` Artisan command is the easiest way to create a
new observer class:

```shell
go run . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

此命令将在你的 `app/observers` 目录中放置新的观察者。 如果该目录不存在，Artisan 将为你创建它。 你的新观察者看起来像以下内容： If this directory does not exist, Artisan
will create it for you. Your fresh observer will look like the following:

```go
package observers

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Created(event orm.Event) error {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) error {
 return nil
}

func (u *UserObserver) Deleted(event orm.Event) error {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) error {
 return nil
}
```

模板观察者仅包含一些事件，你可以根据需要添加其他事件。

To register an observer, you need to call the `Observe` method on the model you wish to observe. 要注册一个观察者，你需要在你希望观察的模型上调用 `Observe` 方法。 你可以在应用程序的 `app/providers/event_service_provider.go::Boot` 服务提供者的 `Boot` 方法中注册观察者：

```go
package providers

import (
 "github.com/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

type EventServiceProvider struct {
}

func (receiver *EventServiceProvider) Register(app foundation.Application) {
 facades.Event().Register(receiver.listen())
}

func (receiver *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers.UserObserver{})
}

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> 注意：如果你同时设置 `DispatchesEvents` 和 `Observer`，只会应用 `DispatchesEvents`。

#### 观察者中的参数

`event` 参数将被传递给所有观察者：

| 方法           | 动作                                       |
| ------------ | ---------------------------------------- |
| Context      | 获取由 `facades.Orm().WithContext()` 传递的上下文 |
| GetAttribute | 获取修改后的值，如果未修改，则获取原始值，如果没有原始值，则返回 nil     |
| GetOriginal  | 获取原始值，如果没有原始值，则返回 nil                    |
| IsDirty      | 确定字段是否被修改                                |
| IsClean      | 已更改的相反                                   |
| Query        | 获取一个新的查询，可以与事务一起使用                       |
| SetAttribute | 为字段设置新值                                  |

### 静音事件

你可能偶尔需要暂时 "静音" 一个模型触发的所有事件。 你可以使用 `WithoutEvents` 方法来实现： You may achieve this using the
`WithoutEvents` method:

```go
var user models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### 在不触发事件的情况下保存单个模型

有时你可能希望在不触发任何事件的情况下 "保存" 给定的模型。 你可以通过 `SaveQuietly` 方法来实现： You may accomplish this with the
`SaveQuietly` method:

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
