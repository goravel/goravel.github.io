# Миграции

Когда несколько людей сотрудничают в разработке приложений, важно иметь стандартизованную структуру баз данных для синхронизации
. Без этого могут быть хаосы по мере того, как все персональные данные не совпадают. Database migration is
the solution to this problem. Структура базы данных контролируется версией, чтобы обеспечить ее согласованность между всеми разработчиками
.

## Конфигурация

Миграционные файлы базы данных хранятся в каталоге `database/migrations`. Вы можете настроить конфигурацию базы данных
в файле `config/database.go`. В настоящее время для миграции доступны два драйвера: Go
язык миграции и SQL миграция. Однако миграция SQL будет удалена в будущих версиях.

```go
// Доступные драйверы: "default", "sql"
"migrations": map[string]any{
  "driver": "default",
  // Вы можете суммировать имя таблицы миграций
  "table": "migrations",
},
```

## Создать миграцию

Используйте команду `make:migration` для создания миграции:

```shell
перейти к запуску . artisan make:migration create_users_table
```

Эта команда сгенерирует файлы миграции в директории `database/migrations`. Каждый файл миграции будет начинаться с метки времени format@@0 (
), которую Goravel будет использовать для определения порядка выполнения файлов миграции.

### Быстрое создание

Используйте `create_users_table` для автоматического создания таблицы, содержащей инфраструктуру `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Используйте `add_avatar_to_users_table` для автоматической генерации структуры добавления полей в таблицу `users`:

```
_(к|с|в)_(\w+)_table$
_(к|с|в)_(\w+)$
```

Если указанные выше условия не совпадают, фреймворк создаст пустой файл миграции.

## Структура миграции

### Перейти к языковой миграции

Структура миграции содержит два метода: `Up` и `Down`. Метод `Up` используется для добавления новых таблиц, столбцов или
индексов в базу данных, в то время как метод `Down` используется для отмены операций, выполняемых методом `Up`. In these
two methods, you can use `facades.Schema()` to create and operate database tables. For available methods, see
the [documentation](#tables). Следующая миграция создаст таблицу `users`:

```go
миграция пакетов

импорт (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Signature The unique signature for the migration.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Up Run the migrations.
func (r *M20241207095921CreateUsersTable) Up() error {
 if !facades. chema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   таблицы. imestamps()
  })
 }

 return nil
}

// Обратный ход миграции.
func (r *M20241207095921CreateUsersTable) Ошибка Down() {
 return facades.Schema().DropIfExists("пользователи")
}
```

#### Установить соединение миграции

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### Миграция SQL

Команда миграции сгенерирует два файла миграции: `***.up.sql` и `***.down.sql`, что соответствует исполнению и
rollback, соответственно. Вы можете писать операторы SQL непосредственно в эти два файла.

```sql
-- ***.up. ql
СОЗДАТЬ ТАБЛИЦУ `users` (
  `id` bigint(20) без знака НЕ НУЛЬТАТЬ AUTO_INCREMENT,
  `name` varchar(255) ЗАВЕРШИТЕ utf8mb4_unicode_ci ЗАДЕРЖАНИЕ,
  `email` varchar(255) ЗАВЕРШИТЕ utf8mb4_unicode_ci ПОДЛИТЬ НУЛ,
  Метка времени `created_at` NULL DEFAULT NULL,
  timestamp `updated_at` NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
пользователя DROP TABLE `;
```

## Регистрация миграций

При перемещении языка Go вам необходимо зарегистрировать файлы миграции в файле `database/kernel.go` после того, как файлы миграции
создаются:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

Перемещение SQL не нужно регистрировать, так как фреймворк будет автоматически сканировать SQL файлы в директории
`database/migrations`.

## Запустить миграцию

Чтобы запустить все ваши невыполненные миграции, выполните команду «migrate» Artisan:

```shell
мигрировать кустарным
```

Если вы хотите, чтобы узнать, какие переходы выполнялись до сих пор, вы можете использовать команду `migrate:status` Artisan:

```shell
. artisan migrate:status
```

## Откат обратных миграций

Чтобы откатить последнюю версию перехода, используйте команду `rollback` Artisan. Эта команда откачивает последнюю "партию" перехода
, которая может включать в себя несколько файлов миграции:

```shell
сделать бег . artisan migrate:rollback
```

Вы можете откатить ограниченное количество переходов, предоставив опцию `step` к команде `rollback`. Например,
следующая команда вернет назад последние пять миграций:

```shell
перейти к запуску . artisan migrate:rollback --step=5
```

Команда `migrate:reset` откатит все миграции вашего приложения:

```shell
перейти к бегу . artisan migrate:reset
```

### Откат и миграция с помощью одной команды

Команда `migrate:refresh` вернет все ваши миграции, а затем выполнит команду `migrate`. Эта команда
эффективно пересоздаёт вашу базу данных:

```shell
идите бежать . artisan migrate:refresh
```

Вы можете откатиться назад и повторно перенести ограниченное количество миграций, предоставив опцию `step` к команде `refresh`.
Например, следующая команда откатится назад и перепереместит последние пять миграций:

```shell
запустить . artisan migrate:refresh --step=5
```

### Удалить все таблицы и перенести

Команда `migrate:fresh` удалит все таблицы из базы данных, а затем выполнит команду `migrate`:

```shell
идите бежать . artisan migrate:fresh
```

## Таблицы

### Создать таблицу

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Проверьте, если таблица / столбец существует

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Соединение с базой данных

```go
facades.Schema().Connection("sqlite").Create("пользователи", func(table schema.Blueprint) {
  table.ID()
})
```

### Обновить таблицу

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Переименовать / Удалить таблицу

```go
facades.Schema().Rename("пользователи", "new_users")
facades.Schema().Drop("пользователи")
facades.Schema().DropIfExists("пользователи")

```

## Столбцы

### Доступные типы столбцов

|                     |                      |                       |                             |
| ------------------- | -------------------- | --------------------- | --------------------------- |
| Прибавки            | BigInteger           | Boolean               | Чар                         |
| Дата                | Дата                 | Дата и время          | Десятичная                  |
| Двойной             | [Enum](#enum)        | Плавающий             | [ID](#id)                   |
| Приращения          | Целое                | IntegerIncrements     | Json                        |
| Приращения          | LongText             | Средний прирост       | MediumInteger               |
| Средний текст       | Небольшие увеличения | Меньшее число         | [SoftDeletes](#softdeletes) |
| СофтУдалитель       | Строка               | Текст                 | Время                       |
| Таймер              | Отметка времени      | Метки времени         | Метка времени               |
| Метка времени       | UnsignedBigInteger   | TinyIncrements        | TinyInteger                 |
| TinyText            | UnsignedInteger      | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                      |                       |                             |

#### Enum

Создайте поле `Enum`, которое может храниться в `Mysql` в соответствии с типом `[]any`, но в базах данных `Postgres`, `Sqlite`, и
`Sqlserver`, это тип `String`.

```go
table.Enum("трудность", []любое "легкое", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

Метод «ID» является псевдонимом метода «BigIncrements». По умолчанию, этот метод создаст столбец `id`; Однако,
если вы хотите присвоить другое имя столбцу, вы можете передать название столбца:

```go
table.ID()
table.ID("user_id")
```

#### СофтУдалитель

Метод `SoftDeletes` добавляет nullable `deleted_at` `TIMESTAMP`. Этот столбец предназначен для сохранения отметки времени
`deleted_at` для Orm "soft delete":

```go
table.SoftDeletes()
```

#### Пользовательский столбец

Если вы используете типы столбцов, которые фреймворк еще не поддерживается, вы можете использовать метод `Столбец` для настройки типа полей
:

```go
table.Column("геометрия", "геометрия")
```

### Модификаторы столбцов

В дополнение к типам столбцов, перечисленным выше, при добавлении столбца к таблице базы данных, вы также можете добавить "модификаторы" к
столбцу. Например, чтобы разрешить столбец быть «nullable», вы можете использовать метод «Nullable»:

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

Следующая таблица содержит все доступные модификаторы столбцов:

| Изменено                      | Описание                                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.AutoIncrement()`            | Устанавливает целое число столбца как автоматическое увеличение (основной ключ)                                                     |
| `.Comment("Мой комментарий")` | Добавляет комментарий к столбцу (MySQL / PostgreSQL)                                                                                |
| `.Default(значение)`          | Устанавливает значение по умолчанию для столбца                                                                                                        |
| `.Nullable()`                 | Позволяет вставлять NULL значения в столбец                                                                                                            |
| `.Unsigned()`                 | Установить целое число столбца как UNSIGNED (только MySQL)                                                                          |
| `.UseCurrent()`               | Устанавливает столбец с меткой времени для использования по умолчанию CURRENT_TIMESTAMP                                           |
| `.UseCurrentOnUpdate()`       | Устанавливает столбец отметки времени для использования CURRENT_TIMESTAMP при обновлении записи (только MySQL) |

### Удалить столбец

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Индексы

### Создать индекс

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Добавить первичный ключ
  . rimary("id")
  // Добавление композитного первичного ключа
  table.Primary("id", "name")

  // Добавить уникальную таблицу
  . nique("имя")
  table.Unique("имя", "век")

  // Добавить нормальный индекс
  table.Index("имя")
  таблицу. ndex("name", "век")

  // Добавляем полный текст
  таблицу.FullText("имя")
  table.FullText("имя", "век")
})
```

### Переименовать индекс

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Индекс выпадения

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

### Создать внешний ключ

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("пользователи")
})
```

### Удалить внешний ключ

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
