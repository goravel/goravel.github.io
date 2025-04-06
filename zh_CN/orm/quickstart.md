# 正在开始

Goravel使用`facades.Orm()`让开发者更容易与数据库交互。 目前，它为以下四个数据库提供官方
支持：

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL 服务器 2017+

在您开始之前，在 `.env` 中配置数据库，并确认`config/database.go` 中的 `default` 设置。

# 配置

要配置数据库，导航到 config/database.go`。 这是您可以自定义所有数据库连接和
选择一个 `default\` 连接。 此文件中的配置依赖于项目的环境变量，
显示Goravel支持的各种数据库配置。

### DSN

您也可以使用 DSN 直接连接到数据库，只需在配置文件中配置 `dsn` 字段：

```go
"postgres": map[string]any{
  "driver":   "postgres",
++  "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### 读取和写入连接

有时，您可能希望使用 `SELECT ` 和 `INSERT`、`UpdatE` 和
`DELETE` 两个数据库连接。 戈拉韦尔使这变成了一种气旋。

要看看如何配置读写连接，让我们看看这个示例：

```go
导入 "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]anyo.
  "mysql": map[string]anyo.
    "driver": "mysql",
    "读取": []database. onfigPo.
      {Host: "192.168.1. ", Port: 3306, Database: "忘记", 用户名: "root", 密码: "123123123"},
    },
    "write": []database. onfigPo.
      {Host: "192.168.1. ", Port: 3306, Database: "forge", 用户名: "root", 密码: "123123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "忘记"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "local": "Local",
  },
}
```

我们更新了配置阵列两个新密钥 - `read` 和 `write` 。 `read`连接将使用
`192.168.1.1` 作为主机，而`write`连接将使用 `192.168.1.2` 。 这两个连接将共享相同的
数据库前缀、字符集和在主mysql 数组中指定的其他选项。 在
`host` 配置数组中出现多个值时，将随机为每个请求选择一个数据库主机。

### 连接库

You can configure a connection pool in the configuration file, reasonable configuration of connection pool parameters
can greatly improve concurrency performance:

| 关键字                               | 行 动      |
| --------------------------------- | -------- |
| 最大idle_conns | 最大空闲连接   |
| 最大打开conns                         | 最大打开连接数  |
| 最大空闲时间                            | 连接最大空闲时间 |
| 最大生存期                             | 连接的最大生存期 |

### 图案

Postgres 和 Sqlserver 支持配置方案。 Postgres可以在配置文件中直接设置Schema，而
Sqlserver需要在模型中通过“TableName”方法指定Schema。

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

#### Sqlserver

```go
func (r *User) TableName() string Community
  return "goravel.users"

```

### 获取数据库信息

您可以使用 "db:show" 命令查看数据库中的所有表。

```bash
去运行。个体操者db:show
```

您也可以使用 "db:table" 命令查看特定表的结构。

```bash
去运行。个体操者db:table
来运行。个体操者db:table 用户
```

## 模型定义

要创建一个自定义模型，请参阅框架中包含的模型文件 `app/models/user.go` 。 `app/models/user.go`中的`struct`
包含两个嵌入框架：`orm.Model`和`orm.SoftDeletes`。 这些框架分别定义
`id`、`created_at`、`updated_at`和`deleted_at`属性'。 使用 `orm.SoftDeletes`，您可以为模型启用软
删除。

### 示范公约

1. 该模型用大湿润命名；
2. 使用模型"snake naming"的复数形式作为表名；

例如，模型名称是 `Userorder` ，表名称是 `user_orders` 。

### 创建模型

使用 `make:model` 命令创建模型：

```shell
去运行。手工操作：make:model User
来运行。手工操作：make:model 用户/用户
```

创建模型文件位于`app/models/user.go`文件中，内容如下：

```go
软件包模型

import(
  "github.com/goravel/framework/database/orm"
)

type User struct own
  orm. odel
  名称字符串
  Avatar 字符串
  orm.SoftDeletes
}
```

如果你想要将模型字段设置为“任何”，你需要添加一个额外的标签："gorm:"type:text""：

```go
键入用户结构&
  orm.Model
  名称字符串
  Avatar 字符串
  详细说明任意`gorm:"type:text"`
  orm.SoftDeletes
}
```

更多标签使用详情可在以下网址找到： <https://gorm.io/docs/models.html>。

### 指定表名称

```go
软件包模型

import(
  "github.com/goravel/framework/database/orm"
)

type User struct own
  orm. odel
  名称字符串
  Avatar 字符串
  orm. oftDeletes
}

func (r *User) TableName() string Windows
  return "goravel_user"
}
```

### 数据库连接

默认情况下，所有模型都使用为您的应用程序配置的默认数据库连接。 If you wish to specify a
distinct connection to be used when interacting with a particular model, you need to define a `Connection` method on the
model.

```go
软件包模型

import(
  "github.com/goravel/framework/database/orm"
)

type User struct own
  orm. odel
  名称字符串
  Avatar 字符串
  orm. oftDeletes
}

func (r *User) Connection() string Community
  return "postgres"
}
```

## Orm() 可用函数

| 名称    | 行 动                                                                                     |
| ----- | --------------------------------------------------------------------------------------- |
| 连接    | [指定数据库连接](#specify-database-connection)                                                 |
| DB    | [Generic Database Interface sql.DB](#generic-database-interface-sql-db) |
| 查询    | [获取数据库实例](#get-database-instance)                                                       |
| 交易    | [Transaction](#transaction)                                                             |
| 在上下文内 | [注入上下文](#inject-context)                                                                |

## Facades.Orm().Query() 可用函数

| 职能            | 行 动                                                             |
| ------------- | --------------------------------------------------------------- |
| 开始            | [Begin transaction](#transaction)                               |
| 提交            | [Commit transaction](#transaction)                              |
| 计数            | [Count](#count)                                                 |
| 创建            | [Create](#create)                                               |
| Cursor        | [Cursor](#cursor)                                               |
| 删除            | [Delete](#delete)                                               |
| 区别            | [Filter Repetition](#filter-repetition)                         |
| 驱动程序          | [Get Driver](#get-driver)                                       |
| Exec          | [执行本地更新 SQL](#execute-native-update-sql)                        |
| 存在            | [Exists](#exists)                                               |
| 查找            | [查询一行或多行的 ID](#query-one-or-multiple-lines-by-id)               |
| FindOrail     | [未找到退货错误](#not-found-return-error)                              |
| 第一页           | [Query one line](#query-one-line)                               |
| 第一次或          | [通过回调查询或返回数据](#query-one-line)                                  |
| 第一个OrCreate   | [Retrieving Or Creating Models](#retrieving-or-creating-models) |
| 第一个OrNew      | [Retrieving Or New Models](#retrieving-or-creating-models)      |
| 第一个Orail      | [Not Found Error](#not-found-error)                             |
| 强制删除          | [Force delete](#delete)                                         |
| 获取            | [查询多行](#query-multiple-lines)                                   |
| 组别            | [Group](#group-by--having)                                      |
| 有             | [Having](#group-by-having)                                      |
| 加入            | [Join](#join)                                                   |
| 限制            | [Limit](#limit)                                                 |
| LockForUpdate | [暂时锁定](#pessimistic-locking)                                    |
| 模型            | [指定一个模型](#specify-table-query)                                  |
| 偏移量           | [Offset](#offset)                                               |
| 订单            | [Order](#order)                                                 |
| 排序方式          | [Order](#order)                                                 |
| OrderByDesc   | [Order](#order)                                                 |
| 随机顺序          | [Order](#order)                                                 |
| Orwhere       | [OrWhere](#where)                                               |
| Orwhere NotIn | [OrWhereNotIn](#where)                                          |
| OrWhereNull   | [OrWhereNull](#where)                                           |
| 在哪里执行         | [OrWhereIn](#where)                                             |
| 分页            | [Paginate](#paginate)                                           |
| 普鲁克           | [查询单列](#query-single-column)                                    |
| 原始文件          | [执行原生SQL](#execute-native-sql)                                  |
| 恢复            | [Restore](#restore)                                             |
| Rollback      | [Rollback transaction](#transaction)                            |
| 保存            | [更新一个现有的模型](#update-a-existing-model)                           |
| 保存静音          | [保存单一模型而不发生事件](#saving-a-single-model-without-events)           |
| 扫描            | [Scan struct](#execute-native-sql)                              |
| 范围            | [Scopes](#scopes)                                               |
| 选择            | [指定字段](#specify-fields)                                         |
| 共享锁           | [暂时锁定](#pessimistic-locking)                                    |
| Sum           | [Sum](#sum)                                                     |
| 表             | [指定一个表](#specify-table-query)                                   |
| ToSql         | [Get SQL](#get-sql)                                             |
| ToRawSql      | [Get SQL](#get-sql)                                             |
| 更新            | [更新单列](#update-a-single-column)                                 |
| 更新 OrCreate   | [更新或创建](#update-or-create)                                      |
| 位置            | [Where](#where)                                                 |
| 在哪里之间         | [WhereBetween](#where)                                          |
| 不在任何位置        | [WhereNotBetween](#where)                                       |
| 不在任何位置        | [WhereNotIn](#where)                                            |
| 空位置           | [WhereNull](#where)                                             |
| 所在位置          | [WhereIn](#where)                                               |
| 退出事件          | [静音事件](#muting-events)                                          |
| 撤销回收站         | [查询软删除数据](#query-soft-delete-data)                              |

## 查询生成器

### 注入内容

```go
facades.Orm().Wide (ctx)
```

### 指定数据库连接

如果在`config/database.go`中定义了多个数据库连接，你可以通过`facades.Orm()`的`Connection`函数
使用这些连接。 传递给`Connection`的连接名称应该是在
`config/database.go`中配置的连接之一：

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

// Returns database statistics
db.Stats()

// SetMaxIdleConns sets the maximum number of connections in the idle connection pool
db.SetMaxIdleConns(10)

// SetMaxOpenConns sets the maximum number of open connections to the database
db.SetMaxOpenConns(100)

// SetConnMaxLifetime sets the maximum amount of time a connection may be reused
db.SetConnMaxLifetime(time.Hour)
```

### 获取数据库实例

在每个特定的数据库操作之前，需要获取数据库的实例。

```go
Facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WiContext(ctx).Query()
```

### 选择

#### 查询一行

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

有时如果找不到结果，您可能希望执行其他操作。 `FirstOr`方法将返回单个的
模型实例，如果没有找到结果，则执行给定的关闭。 您可以在关闭中设置模型值：

```go
Facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error.org/
  user.Name = "goravel"

  return nil
})
```

#### 通过ID查询一条或多条行

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var 用户 []models. ser
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * from `users` WHERE `users`.`id` in (1,2,3);
```

#### 找不到退货错误

```go
var 用户模型.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### 当用户表的主键是 `string` 类型时，调用时需要指定主键

`Find` 方法

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?","a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a";
```

#### 查询多行

```go
var 用户 []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * 来自`users` WHERE id in (1,2,3);
```

#### 正在获取或创建模型

`FirstOrCreate`方法使用指定的列/值对搜索数据库记录。 If the model cannot be
found in the database, it creates a new record with the attributes from merging the first argument with the optional
second argument.

同样，`FirstOrNew`方法也试图根据给定的属性在数据库中找到记录。 然而,
如果找不到, 则返回一个新的模型实例. It's important to note that this new model has not been
saved to the database yet and you need to manually call the `Save` method to do so.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{name: "tom"})
// SELECT * 从`users` 中获取`gender` = 1 and `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32.

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * 从`users` WERE `gender` = 1 and `users`.`name` = 'tom' ORDER BY `users` id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','avatar');

var user model。 ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{name: "tom"})
// SELECT * 来自`users` WHERE `gender` = 1 and `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * 从`users' `gender` = 1 and `users`.`name` = `tom' ORDER BY `users`.`id` LIMIT 1;
```

#### 找不到错误

当找不到请求的项目时，`First`方法不会产生错误。 若要生成错误，请使用
`FirstOrFail` 方法：

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErRecordNot Found
```

### 位置

```go
Facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?"tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().Where NotBetween("age", 1, 10)
facades.Orm().Query().Where NotIn("name", []任何{"a"})
facad rm().Query().Where Null("name")
facades.Orm().Query().Where In("name", []any{"a"})

facades.Orm().Query().Where ("name = ?"tom")
facades.Orm().Query().Orwhere NotIn("name", []any{"a"})
facades.Orm().Query().Orl("name")
facades.Orm().Query().Orwhere In("name"]any"})
```

### 限制

```go
var 用户 []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### 偏移量

```go
var 用户 []models.User
facades.Orm().Query().Where("name = ?"tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### 订单

```go
var 用户 []models.User
facades.Orm().Query().Where("name = ?"tom").Order("sort as").Order("id desc"). et(&users)
// SELECT * FROM "users" WHERE name = "tom" ORDER BY 升序, id 降序;

脸。 rm().Query().Where ("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * 从`users` WHERE name = 'tom' ORDER BY as;

facades.Orm().Query().Where("name = ?"tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY s排序；

facades.Orm().Query().Where ("name = ?"tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY 排序;

facades.Orm().Query(). here("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### 分页

```go
var 用户 []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &users, &total)
// SELECT 计数(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### 查询单列

```go
var age []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### 指定表查询

如果您想要查询某些总合数据，您需要指定一个特定的表。

指定一个模型

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

指定一个表

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // 获取所有记录，无论是否删除
```

### Get SQL

使用占位符获取SQL：

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * 来自"users" = $1 和 "users"."deleted_at" IS NULL
```

获取SQL值：

```go
Facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * 来自 "users" = 1 和 "users"."deleted_at" IS NULL
```

方法可以在“ToSql”和“ToRawSql”之后调用：`Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### 计数

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?"tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### 指定字段

`Select`允许您指定要从数据库中检索的字段。默认情况下，ORM会检索所有字段。

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
/SELECT `name`,`age` FROM `users`;
```

### 按&拥有分组

```go
输入结果结构如下:
  命名字符串
  Total int


var results Results
facades.Orm().Query().Model(&models.User{})。 electt("name, sum(age) as total").Group("name").Having("name = ?"tom").Get(&result)
// SELECT name, sum(age) as total from `users` GROUP BY `name` having name = "tom";
```

### 加入

```go
type Result struct {
  Name  string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users.name, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### 创建

```go
用户 := models.User{name: "tom", Age: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT INTO users (name, age, created_at, updated_at) VALUES("tom", 18, "2022-09-27 22:00:00");

// 不触发模型事件
err := facades. rm().Query().Table("users").Create(map[string]anyo.
  "name": "Goravel",
})

// 触发模型事件
err := facades. rm().Query().Model(&models.User{}).Create(map[string]anyow
  "name": "Goravel",
})
```

### 多次创建

```go
用户 := []models.User{name: "tom", Age: 18}, {name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users"). reate(&[]map[string]anyn
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). ().Model(&models.User{}).Create(&[]map[string]any卷
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` 和 `updated_at` 将自动填写。

### Cursor

可以用来大幅降低应用程序内存消耗，当经由数以万计的
Emart Modern Records。 Note, the `Cursor` method can be used with `With` at the same time, please
use [Lazy Eager Loading](./relationships#lazy-eager-loading) to load relationship in the `for` logic.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
如果是err != nil {
  return err
}
行:= range cursor power
  var user models. ser
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
facades.Orm().Query(). ave(&user)
// 更新`users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`=''WHERE `id`=1;
```

#### 更新列

```go
.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UpdatE `users" SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = ';

facades.Orm().Query().Model(&models.User{}).Where ("name", "tom").Update(models. ser{name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where ("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
// UpdatE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = ';
```

> 当使用 `struct`时，Orm 只能更新非零字段。 您可能想使用 `map` 来更新属性或
> 使用 `Select` 来指定要更新的字段。 请注意，`struct`只能是 `Model`，如果你想要更新non
> `Model`，你需要使用 `。 able("users")`, 但`updated_at`字段不能在这次
> 时间自动更新。

#### 更新或创建

查询`name`, 如果不存在, 通过 `name`, `avatar` 创建, 如果存在, 则更新`avatar` 基于 `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{name: "}, models.User{Avatar: "avatar"})
// SELECT * 从`users` 中得到'。如果`users`.`name` = '和 `users`.`deleted_at` IS NULL ORDER BY `users`。 id` lIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08。 ',NULL,'name','avatar');
// 更新`users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL and `id` = 1;
```

### 删除

按模型删除，受语句影响的行数按方法返回：

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
ress, err := facades.Orm().Query().Delete(&user)
ress, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
ress, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

多次删除

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE 从`users` WHERE name = 'tom';
```

强制删除软删除数据。

```go
.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where ("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where ("name", "tom").ForceDelete() .Where ("tom").ForceDelete()
```

您可以通过 "Select" 删除模型关联的记录：

```go
// 删除用户删除用户
facades.Orm().Query().Select("Account").Delete(&user)

// 删除用户删除用户
facades.Orm().Query().Select("Orders", "creditCards")时的订单和信用卡。 元素(&user)

// 删除删除用户
facades.Orm().Query().Select(orm.Associations) 元素(&user)

// 删除删除用户删除时的所有用户
facades.Orm().Query().Select("Account").Delete(&users)
```

注意：只有当记录的主键不是空的，关联才会被删除。 并且Orm 使用这些主要的
密钥作为删除相关记录的条件：

```go
// Delete user that name='goravel', but don't delete account of user
facades.Orm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{})

// Delete user that name='goravel' and id = 1, and delete account of user
facades.Orm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// Delete user that id = 1 and delete account of that user
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

如果执行批量删除没有任何条件，ORM不会这样做，并且返回错误。 所以您必须添加一些
条件，或者使用原生SQL。

### 查询软删除数据

```go
var 用户
facades.Orm().Query().Withrashed().First(&user)
```

### 过滤器重复

```go
var 用户 []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### 获取驱动程序

```go
驱动程序:= facades.Orm().Query().Driver()

// 法官驱动程序
如果驱动程序== orm.DriverMysql {}
```

### 执行原生SQL

```go
请输入结果结构如下面的
  ID int
  name
  Age int
}

var results 结果
facades。 rm().Query().Raw("SELECT id, name, age FROM users WHERE name = ?", "tom").Scan(&result)
```

### 执行本地更新 SQL

受语句影响的行数由方法返回：

```go
Res, err := facades.Orm().Query().Exec("DROP TABLE 用户")
// DROP TABLE `users`;

num := res.RowsAffected
```

### 存在

```go
var 存在布尔值
facades.Orm().Query().Model(&models.User{}).Where ("name", "tom").Exists(&exists)
```

### 恢复

```go
.Orm().Query().Withrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).Withrashed().Restore()
// UPDATE`users` SET `deleted_at`=NULWHERE `id` = 1;
```

### 交易

您可以通过 `Transaction` 函数执行交易。

```go
导入 (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

return facades.Orm().Transaction(func(tx orm.Query) 錯誤。
  var user models.User

  return tx.Find(&user, user.ID)
})
```

您也可以手动控制交易流量：

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx.Create(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### 范围

允许您指定在调用方法时可以引用的常用查询。

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
导入 "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UpdatE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899" WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### 悲观锁定

查询生成器还包含一些功能，帮助您在执行 "select"
语句时实现"悲观锁定"。

要执行带有“共享锁”的语句，您可以调用 `SharedLock` 方法。 共享锁阻止所选的
行被修改直到您的交易完成：

```go
var 用户 []models.User
facades.Orm().Query().Where("投票", ">", 100).SharedLock().Get(&users)
```

或者，您可以使用 `LockForUpdate` 方法。 A "for update" lock prevents the selected records from being
modified or from being selected with another shared lock:

```go
var 用户 []models.User
facades.Orm().Query().Where("投票", ">", 100).LockForUpdate().Get(&users)
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

Orm 模型传送了几次事件，允许您在模型的生命周期中绑定到以下时刻： `检索`,
`Creating`, `Created`, `Updating`, `Updated`, `Saving`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Recovering`.

当从数据库检索到现有模型时，"检索" 事件将会被发送。 当一个新模型首次保存为
时，`Creating` 和`Created` 事件将会发出。 当
一个现有模型被修改并调用`Save` 方法时，`Updatating` / `Updated` 事件将会被调用。 `Saving` / `Saved` 事件将在模型
创建或更新时发送 - 即使模型属性没有改变。 以`-ing`结尾的事件名称是
发送之前对模型的任何更改都保持不变， 虽然以“-ed”结束的事件是在
对模型的更改持续后发送的。

要开始监听模型事件，请在模型上定义一个 `DispatchesEvents` 方法。 此属性映射模型生命周期的各点
到您自己的事件类。

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

> 注意：只需注册您需要的事件。 当通过Orm进行批量操作时，模型事件不会被发送。

### 观察员

#### 定义观察员

如果您正在聆听某个模式上的许多事件， 您可以使用观察员将您的所有听众分为单个的
类。 观察类的方法名称反映了你想要听到的讨论事件。 每种方法
都收到受影响的模型作为其唯一的参数。 "make:observer" Artisan 命令是创建一个
新观察员类的最简单方式：

```shell
去运行。个体操者make:observer UserObserver
来运行个体操者make:observer user/UserObserver
```

此命令将把新的观察员放置在你的 "app/observers" 目录中。 如果此目录不存在，Artisan
将为您创建它。 你的新观察家看起来像以下：

```go
包

导入(
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

类型 UserObserver struct{}

func (u *UserObserver) 已创建(事件orm)。 vent) 错误 {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) 错误 {
 return nil
}

func (u *UserObserver) 已删除(事件 orm)。 vent) 错误 {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) 错误 {
 return nil
}
```

模板观察家只包含一些事件，您可以根据您的需要添加其他事件。

要注册一个观察者，你需要在你想观察的模型上调用 `Observer` 方法。 您可以在 "App/providers/event_service_provider.go:Boot" 服务提供商的 "Boot" 方法中注册
观察家：

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

> 注意：如果同时设置 `DispatchesEvents` 和 `Observer` ，将只应用 `DispatchesEvents` 。

#### 观察家中的参数

`event`参数将传递给所有观察者：

| 方法                    | 行 动                                       |
| --------------------- | ----------------------------------------- |
| 二. 背景 | 获取通过 `facades.Orm().WiContext()` 传递的上下文内容 |
| 获取属性                  | 获取修改过的值，如果未被修改，获得原始值，如果没有原始值，则返回 nil      |
| 获取原始文件                | 获取原始值，如果没有原始值，返回 nil                      |
| 伊迪尔蒂文                 | 确定是否修改字段                                  |
| IsClean               | 异常反转                                      |
| 查询                    | 获得一个新查询，可以与交易一起使用                         |
| SetAttribute          | 为字段设置一个新值                                 |

### 静音事件

您可能偶尔需要临时“静音”所有由模型触发的事件。 您可以使用
`WoutEvents` 方法实现这一点：

```go
var user models.User
facades.Orm().Query().without Events().Find(&user, 1)
```

#### 保存一个不发生事件的单一模型

有时您可能希望“保存”一个特定的模型而不发送任何事件。 你可以使用
`SaveQuietly` 方法完成这个操作：

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
