# Начало работы

Goravel позволяет разработчикам взаимодействовать с базами данных с помощью `facades.Orm()`. Currently, it provides official
support for the following four databases:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Перед началом настройте базу данных в файле `.env` и подтвердите конфигурацию `default` в файле `config/database.go`.

# Конфигурация

Для настройки баз данных перейдите в `config/database.go`. Здесь вы можете настроить все подключения к базе данных и
выберите соединение `default`. The configuration in this file relies on the project's environment variables and
showcases various database configurations that Goravel supports.

### DSN

Вы также можете использовать DSN для прямого подключения к базе данных, просто настройте поле `dsn` в конфигурационном файле:

```go
"postgres": map[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Чтение и запись подключений

Иногда вы хотите использовать одно соединение с базой данных для операторов `SELECT`, а другое - для операторов `INSERT`, `UPDATE` и
`DELETE`. Горавель делает это бризом.

Чтобы увидеть, как должны быть настроены соединения чтения/записи, посмотрим на этот пример:

```go
импорт "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "read": []-база данных. onfig{
      {Host: "192.168.1. ", Порт: 3306, База данных: "forge", Логин: "root", Пароль: "123123"},
    },
    "write": []database. onfig{
      {Host: "192.168.1. ", Порт: 3306, База данных: "forge", Имя пользователя: "root", Пароль: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Мы обновили массив конфигурации двумя новыми ключами - `read` и `write`. Соединение `read` будет использовать
`192.168.1.1` в качестве хоста, в то время как подключение `write` будет использовать `192.168.1.2`. Both connections will share the same
database prefix, character set, and other options specified in the main mysql array. В случае нескольких значений в массиве конфигурации
`host` для каждого запроса будет случайным образом выбран хост базы данных.

### Пул подключений

You can configure a connection pool in the configuration file, reasonable configuration of connection pool parameters
can greatly improve concurrency performance:

| Спецификация                                                                     | Действие                                  |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| pool.max_idle_conns    | Максимальное число простоев               |
| pool.max_open_conns    | Макс. открытых соединений |
| pool.conn_max_idletime | Максимальное время простоя соединений     |
| pool.conn_max_lifetime | Максимальное время жизни подключений      |

### Схема

Postgres и Sqlserver поддерживают настройку Схемы. Postgres могут напрямую установить схему в конфигурационном файле, в то время как
Sqlserver должен указать схему с помощью метода `TableName` в модели.

#### Postgres

```go
"connections": map[string]any{
  "postgres": map[string]any{
    "driver": "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### Sqlserver

```go
func (r *User) TableName() string {
  return "goravel.users"
}
```

### Получить информацию о базе данных

Вы можете использовать команду `db:show` для просмотра всех таблиц в базе данных.

```bash
перейти к бегу . artisan db:show
```

Вы также можете использовать команду `db:table` для просмотра структуры конкретной таблицы.

```bash
перейти к бегу . artisan db:table
запускать . artisan db:table пользователей
```

## Определение модели

Для создания пользовательской модели обратитесь к файлу модели `app/models/user.go`, который включен в фреймворк. The `struct`
in `app/models/user.go` contains two embedded frameworks: `orm.Model` and `orm.SoftDeletes`. Эти фреймворки определяют свойства
`id`, `created_at`, `updated_at`, и `deleted_at` соответственно. С помощью `orm.SoftDeletes` вы можете включить мягкое
удаление для модели.

### Типовая конвенция

1. Модель названа с большой влажностью;
2. Использовать множественную форму модели "названия змеи" в качестве названия таблицы;

Например, название модели `UserOrder`, а название таблицы `user_orders`.

### Создать модель

Используйте команду `make:model` для создания модели:

```shell
перейти к запуску . artisan make:model User
go run . artisan make:model user/User
```

Файл созданной модели находится в файле `app/models/user.go`, его содержимое выглядит следующим образом:

```go
модели пакетов

import (
  "github.com/goravel/framework/database/orm"
)

тип User struct {
  orm. odel
  Имя строка
  Аватар строка
  orm.SoftDeletes
}
```

Если вы хотите установить поле модели в `any`, вам нужно добавить дополнительный тег: \`gorm:"type:text":

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Подробно о `gorm:"type:text"`
  orm.SoftDeletes
}
```

Подробнее об использовании тегов можно найти здесь: <https://gorm.io/docs/models.html>.

### Укажите название таблицы

```go
модели пакетов

import (
  "github.com/goravel/framework/database/orm"
)

тип User struct {
  orm. odel
  Имя строка
  Аватар строка
  или м. oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### Соединения с базой данных

По умолчанию все модели используют соединение с базой данных по умолчанию, настроенное для вашего приложения. Если вы хотите указать отдельную связь
для взаимодействия с конкретной моделью, нужно определить метод `Connection` в модели
.

```go
модели пакетов

import (
  "github.com/goravel/framework/database/orm"
)

тип User struct {
  orm. odel
  Имя строка
  Аватар строка
  или м. oftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## функции facades.Orm()

| Наименование       | Действие                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Подключение        | [Укажите соединение с базой данных](#specify-database-connection)                                |
| БД                 | [Универсальный интерфейс базы данных sql.DB](#generic-database-interface-sql-db) |
| Запрос             | [Получить экземпляр базы данных](#get-database-instance)                                         |
| Транзакция         | [Transaction](#transaction)                                                                      |
| Выход из контекста | [Inject Context](#inject-context)                                                                |

## facades.Orm().Query() доступные функции

| Функции             | Действие                                                                      |
| ------------------- | ----------------------------------------------------------------------------- |
| Начать              | [Начать транзакцию](#transaction)                                             |
| Коммит              | [Зафиксировать транзакцию](#transaction)                                      |
| Счетчик             | [Count](#count)                                                               |
| Создать             | [Create](#create)                                                             |
| Cursor              | [Cursor](#cursor)                                                             |
| Удалить             | [Delete](#delete)                                                             |
| Различия            | [Повтор фильтров](#filter-repetition)                                         |
| Водитель            | [Get Driver](#get-driver)                                                     |
| Раз                 | [Выполнить собственное обновление SQL](#execute-native-update-sql)            |
| Существуют          | [Exists](#exists)                                                             |
| Найти               | [Запрос одной или нескольких строк по ID](#query-one-or-multiple-lines-by-id) |
| Неудачный поиск     | [Не найдена ошибка возврата](#not-found-return-error)                         |
| Первое              | [Запросить одну линию](#query-one-line)                                       |
| Сперва              | [Запрашивать или возвращать данные через обратный вызов](#query-one-line)     |
| Первое создание     | [Получение или создание моделей](#retrieving-or-creating-models)              |
| Первый Новый        | [Получение новых моделей](#retrieving-or-creating-models)                     |
| Первый Удар         | [Не найдена ошибка](#not-found-error)                                         |
| Удалить             | [Принудительно удалить](#delete)                                              |
| Приобрести          | [Запрос нескольких строк](#query-multiple-lines)                              |
| Группа              | [Group](#group-by--having)                                                    |
| Имея                | [Having](#group-by-having)                                                    |
| Присоединиться      | [Join](#join)                                                                 |
| Лимит               | [Limit](#limit)                                                               |
| LockForUpdate       | [Пессимистическая блокировка](#pessimistic-locking)                           |
| Модель              | [Укажите модель](#specify-table-query)                                        |
| Смещение            | [Offset](#offset)                                                             |
| Заказ               | [Order](#order)                                                               |
| Заказ по            | [Order](#order)                                                               |
| OrderByDesc         | [Order](#order)                                                               |
| Случайный порядок   | [Order](#order)                                                               |
| Где                 | [OrWhere](#where)                                                             |
| Где нет             | [OrWhereNotIn](#where)                                                        |
| OrWhereNull         | [OrWhereNull](#where)                                                         |
| Где                 | [OrWhereIn](#where)                                                           |
| Язык                | [Paginate](#paginate)                                                         |
| Застрял             | [Запросить один столбец](#query-single-column)                                |
| Сырье               | [Выполнить родной SQL](#execute-native-sql)                                   |
| Восстановить        | [Restore](#restore)                                                           |
| Rollback            | [Откат транзакции](#transaction)                                              |
| Сохранить           | [Обновить существующую модель](#update-a-existing-model)                      |
| СохранитьQuietly    | [Сохранение одной модели без событий](#saving-a-single-model-without-events)  |
| Сканировать         | [Сканировать](#execute-native-sql)                                            |
| Области             | [Scopes](#scopes)                                                             |
| Выбрать             | [Указать поля](#specify-fields)                                               |
| Общая блокировка    | [Пессимистическая блокировка](#pessimistic-locking)                           |
| Sum                 | [Sum](#sum)                                                                   |
| Таблица             | [Укажите таблицу](#specify-table-query)                                       |
| ToSql               | [Get SQL](#get-sql)                                                           |
| ToRawSql            | [Get SQL](#get-sql)                                                           |
| Обновить            | [Обновить один столбец](#update-a-single-column)                              |
| Обновить OrCreate   | [Обновить или создать](#update-or-create)                                     |
| Где                 | [Where](#where)                                                               |
| Где                 | [WhereBetween](#where)                                                        |
| В промежутке        | [WhereNotBetween](#where)                                                     |
| Где нет             | [WhereNotIn](#where)                                                          |
| ГдеNull             | [WhereNull](#where)                                                           |
| Где                 | [WhereIn](#where)                                                             |
| Выход из событий    | [Отключение событий](#muting-events)                                          |
| Выведено из корзины | [Запрос мягких данных удаления](#query-soft-delete-data)                      |

## Построитель запросов

### Вставить контекст

```go
facades.Orm().WithContext(ctx)
```

### Укажите соединение с базой данных

Если несколько подключений к базе данных определены в `config/database.go`, их можно использовать с помощью функции `Connection`
из `facades.Orm()`. Имя подключения передано в `Connection` должно быть одним из соединений, настроенных в
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### Универсальный интерфейс базы данных sql.DB

Общий интерфейс базы данных sql.DB, затем используйте функциональность, которую она предоставляет:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Закрытие
db. lose()

// Возвращает статистику базы данных
db.Stats()

// SetMaxIdleConns устанавливает максимальное количество соединений в пуле бездействия
db. etMaxIdleConns(10)

// SetMaxOpenConns устанавливает максимальное количество открытых подключений к базе данных
db. etMaxOpenConns(100)

// SetConnMaxLifetime устанавливает максимальное количество времени, которое может быть использовано соединением
db.SetConnMaxLifetime(time.Hour)
```

### Получить экземпляр базы данных

Перед каждой конкретной операцией в базе данных необходимо получить экземпляр базы данных.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Выбрать

#### Запросить одну строку

```go
модели пользователей var.
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

Иногда вы хотите выполнить какое-то другое действие, если ничего не найдено. Метод `FirstOr` возвращает экземпляр одной модели
или, если результатов не найдено, выполните данные замыкания. Вы можете установить модели в замыкании:

```go
facades.Orm().Query().Where("имя", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Запрос одной или нескольких строк по ID

```go
модели пользователей var.
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

вар пользователей []модели. ser
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Ошибка возврата не найдена

```go
модели пользователей вар. Пользователь
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Когда основной ключом таблицы пользователя является тип «string», необходимо указать первичный ключ при вызове

Метод `Find`

```go
модели пользователей var.
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a";
```

#### Запрашивать несколько строк

```go
var users []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### Получение или создание моделей

Метод `FirstOrCreate` ищет запись в базе данных, используя пары столбцов/значений. Если модель не может быть
найдена в базе данных, создаёт новую запись с атрибутами из объединения первого аргумента с дополнительным аргументом
.

Аналогично, метод `FirstOrNew` также пытается найти запись в базе данных на основе данных атрибутов. Однако,
если он не найден, возвращается новый экземпляр модели. It's important to note that this new model has not been
saved to the database yet and you need to manually call the `Save` method to do so.

```go
модели пользователей var.
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 И `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

var user models. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, модели. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 И `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Ошибка не найдена

Если запрошенный элемент не найден, метод `First` не генерирует ошибку. To generate an error, use the
`FirstOrFail` method:

```go
модели пользователей var. User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Где

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
facades. rm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Query().OrWhereIn("name", []any{"a"})
```

### Лимит

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Смещение

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Заказ

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades. rm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). here("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Язык

```go
var пользователей []models.User
вар всего int64
facades.Orm().Query(). aginate(1, 10, &users, &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Запросить один столбец

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Укажите запрос к таблицам

Если вы хотите получить некоторые агрегированные данные, необходимо указать конкретную таблицу.

Укажите модель

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Укажите таблицу

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // get all records, whether deleted or not
```

### Get SQL

Получить SQL с заполнителем:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// ПОЛУЧИТЬ * ИЗ "users" WHERE "id" = $1 И "users"."deleted_at" НЕЛЬКО
```

Получить SQL со значением:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = 1 И "users"."deleted_at" НЕ НОЛЬ
```

Методы можно вызывать после `ToSql` и `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Счетчик

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### Укажите поля

`Select` позволяет указать, какие поля для извлечения из базы данных, по умолчанию ORM получает все поля.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Группировать по & иметь

```go
type Result struct {
  Name string
  Total int
}

var result Result
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Присоединиться

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join email on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Создать

```go
пользователя := models.User{Name: "tom", Age: 18}
err := facades.Orm().Query(). reate(&user)
// ИНSERT INTO пользователей (имя, возраст, created_at, updated_at) VALUES ("то", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// Не запускать события модели
err := фасады. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Trigger model events
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Горавел",
})
```

### Создание нескольких

```go
пользователей := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users"). reate(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). uery().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` и `updated_at` будут заполнены автоматически.

### Cursor

Может быть использовано для существенного уменьшения потребления памяти вашего приложения при итерации через десятки тысяч
Eloquent моделей записей. Обратите внимание, что метод «Курсор» может быть использован одновременно с «With», пожалуйста
используйте [Lazy Eager Loading](./relationships#lazy-eager-loading) для загрузки связей в логике `for`.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var user models. ser
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### Сохранить модель

#### Обновить существующую модель

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query().Save(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Обновить столбцы

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(models. ser{Name: "hello", Возраст: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> При обновлении с помощью `struct`, Orm будет обновлять только не-нулевые поля. Вы можете использовать `map` для обновления атрибутов или
> используйте `Select` для указания полей для обновления. Обратите внимание, что `struct` может быть `Model`, если вы хотите обновить не
> `Model`, вам нужно использовать `. able("users")`, однако, поле `updated_at` не может быть автоматически обновлено в это время
> .

#### Обновить или создать

Запрос по `name`, если не существует, создайте по `name`, `avatar`, если существует, обновите `avatar` на основе `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` Является NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL AND `id` = 1;
```

### Удалить

Исключить моделью, количество строк, затронутых утверждением, возвращается методом:

```go
модели пользователей вара.Пользователь
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

Удаление нескольких

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// УДАЛИТЬ FROM `users` WHERE name = 'tom';
```

Хотите принудительно удалить данные с помощью софт-удаления.

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete()
```

Вы можете удалить записи с модельными ассоциациями через `Select`:

```go
// Удаление учетной записи пользователя при удалении пользователя
facades.Orm().Query().Select("Account").Delete(&user)

// Удаление заказов и CreditCards пользователя при удалении пользователя
facades.Orm().Query().Select("Orders", "CreditCards"). elete(&user)

// Удаляем все дочерние ассоциации пользователя при удалении пользователя
facades.Orm().Query().Select(orm.Associations). elete(&user)

// Удаляем учётную запись пользователей при удалении пользователей
facades.Orm().Query().Select("Account").Удалить(&users)
```

Note: The associations will be deleted only if the primary key of the record is not empty, and Orm uses these primary
keys as conditions to delete associated records:

```go
// Удаляем пользователя с именем ='goravel', но не удаляем учётную запись пользователя
facades.Orm().Query().Select("Account").Where("name = ?", "goravel"). elete(&models.User{})

// Удаляем пользователя с имя='goravel' и id = 1, удаляем учётную запись пользователя
фасадов. rm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// Удаляем пользователя, который id = 1 и удаляем учётную запись этого пользователя
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

Если выполнить пакетное удаление без каких-либо условий, ORM не делает это и возвращает ошибку. Итак, вы должны добавить некоторые условия
или использовать родной SQL.

### Запрос софт удалить данные

```go
модели пользователей вара.Пользователь
facades.Orm().Query().WithTrashed().First(&user)
```

### Фильтр повторения

```go
вар пользователей []модели.Пользователь
facades.Orm().Query().Distinct("name").Find(&users)
```

### Получить водителя

```go
драйвер := facades.Orm().Query().Driver()

// Драйвер судьи
if driver == orm.DriverMysql {}
```

### Выполнить базовый SQL

```go
type Result struct {
  ID int
  Name string
  Age int
}

var result Result
facades. rm().Query().Raw("SELECT id, name, age FROM WHERE name = ?", "tom").Scan(&result)
```

### Выполнить базовое обновление SQL

Количество строк в выписке возвращается методом:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Существуют

```go
var существует bool
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Exists(&exists)
```

### Восстановить

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Транзакция

Вы можете выполнить транзакцию с помощью функции `Transaction`.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

return facades.Orm().Transaction(func(tx orm.Query) error {
  var user models.User

  return tx.Find(&user, user.ID)
})
```

Вы также можете вручную контролировать поток транзакции самостоятельно:

```go
tx, err := facades.Orm().Query().Begin()
пользователя := models.User{Name: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Области

Позволяет указать часто используемые запросы, на которые можно ссылаться при вызове метода.

```go
func Paginator(page string, limit string) function (methods orm.Query) orm. uery {
  return func(query orm.Query) orm.Query {
    page, _ := strconv. toi(page)
    limit, _ := strconv. toi(limit)
    смещение := (page - 1) * limit

    return query. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator это пользовательская функция: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### Сырые выражения

Вы можете использовать метод `db.Raw` для обновления поля:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Праздничная блокировка

Конструктор запросов также включает несколько функций, которые помогут вам достичь "пессимистической блокировки" при выполнении ваших операторов `select`
.

Чтобы выполнить оператор «общей блокировкой», вы можете вызвать метод «SharedLock». Общая блокировка предотвращает изменение выбранных
строк до тех пор, пока не будет произведена транзакция:

```go
var пользователей []models.User
facades.Orm().Query().Where("votes", ">", 100).SharedLock().Get(&users)
```

Кроме того, вы можете использовать метод `LockForUpdate`. A "for update" lock prevents the selected records from being
modified or from being selected with another shared lock:

```go
var пользователей []models.User
facades.Orm().Query().Where("votes", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
Сумма var int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## События

Модели Orm отправляют несколько событий, позволяя вам заходить в следующие моменты жизненного цикла модели: `Retrieved`,
`Creating`, `Создано`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

Событие «Получено» будет отправлено, когда существующая модель будет извлечена из базы данных. Когда новая модель будет сохранена для
в первый раз, события `Creating` и `Created` будут отправлены. События «Обновить» / «Обновить» будут появляться при изменении
существующей модели и вызове метода «Сохранить». The `Saving` / `Saved` events will dispatch when a model
is created or updated - even if the model's attributes have not been changed. Event names ending with `-ing` are
dispatched before any changes to the model are persisted, while events ending with `-ed` are dispatched after the
changes to the model are persisted.

Чтобы начать слушать моделирование событий, определите метод «DispatchesEvents» в вашей модели. This property maps various points
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

> Примечание: Просто зарегистрируйте все необходимые события. События модели не отправляются при выполнении пакетных операций через Orm.

### Наблюдатели

#### Определение Наблюдателей

Если вы слушаете много событий на данной модели, вы можете использовать наблюдателей для группировки всех ваших слушателей в один класс
. Observer classes have method names that reflect the Eloquent events you wish to listen for. Each of these methods
receives the affected model as their only argument. Команда `make:observer` - это самый простой способ создать
новый класс наблюдателей:

```shell
go run . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

Эта команда поместит нового наблюдателя в папку `app/observers`. Если эта директория не существует, режиссер
создаст её для вас. Ваш свежий наблюдатель будет выглядеть следующим образом:

```go
пакетные наблюдатели

импорт (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

тип UserObserver struct{}

func (u *UserObserver) Created(event orm. vent) ошибка {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) error {
 return nil
}

func (u *UserObserver) Deleted(event orm. ошибка {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) ошибка {
 return nil
}
```

Наблюдатель от шаблона содержит только некоторые события, вы можете добавить другие события в соответствии с вашими потребностями.

Для регистрации наблюдателя необходимо вызвать метод `Observe` на модели, которую вы хотите наблюдать. You may register
observers in the `Boot` method of your application's `app/providers/event_service_provider.go::Boot` service provider:

```go
поставщики пакетов

импорт (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

type EventServiceProvider struct {
}

func (receiver *EventServiceProvider) Register(app foundation. pplication) {
 facades.Event().Register(receiver. isten())
}

func (receiver *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Примечание: Если вы установите `DispatchesEvents` и `Observer` одновременно, будет применяться только `DispatchesEvents`.

#### Параметр в наблюдателе

Параметр `event` будет передан всем наблюдателям:

| Метод              | Действие                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Контекст           | Получить контекст, передаваемый `facades.Orm().WithContext()`                                                                      |
| Получение атрибута | Получить измененное значение, если не было изменено, получить исходное значение, если исходное значение отсутствует, возвращает nl |
| Оригинал           | Получить исходное значение, если исходное значение отсутствует, возвращает номер                                                   |
| Грязь              | Определяет, изменяется ли поле                                                                                                     |
| IsClean            | IsDirty обратная                                                                                                                   |
| Запрос             | Получите новый запрос, который можно использовать с транзакцией                                                                    |
| SetAttribute       | Установить новое значение для поля                                                                                                 |

### События мутации

Иногда может потребоваться временно "заглушать" все события, запущенные моделью. Достичь этого можно с помощью метода
`WithoutEvents`:

```go
модели пользователей вара.Пользователь
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Сохранение одной модели без событий

Иногда вы можете захотеть «сохранить» заданную модель без отправки событий. You may accomplish this with the
`SaveQuietly` method:

```go
модели вар. Пользователь
err := facades.Orm().Query().FindOrFail(&user, 1)
пользователь.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
