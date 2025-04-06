# База данных: инициализация

Goravel включает в себя возможность инициализации вашей базы данных с использованием семенной структуры. All seed structs are stored in the
`database/seeders` directory. По умолчанию для вас определена структура `DatabaseSeeder`.

## Написание сеялок

Чтобы сгенерировать seeder, запустите `make:seeder` [Artisan command](../advanced/artisan). Все селекторы
сгенерированные фреймворком будут храниться в папке `database/seeders`:

```shell
запустить . artisan make:seeder UserSeeder
```

По умолчанию, структура сеялки имеет два метода: `Signature` и `Run`. Метод `Signature` задает имя seeder,
пока метод `Run` срабатывает, когда выполняется команда `db:seed` Artisan. Вы можете использовать метод `Выполнить` для
вставки данных в вашу базу данных любым способом, который вы предпочитаете.

Чтобы проиллюстрировать, мы можем настроить структуру «DatabaseSeeder», добавив оператор вставки базы данных в метод «Выполнить».

```go
seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Signature The name and signature of the seeder.
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Запуск выполняет логику seeder.
func (s *DatabaseSeeder) Run() error {
 user := models. ser{
  Name: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Вызов дополнительных селекторов

В структуре `DatabaseSeeder` вы можете использовать метод `Call` для выполнения дополнительных структур seed. Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. Метод «Call» принимает массив диаграмм сидера, который должен быть выполнен:

```go
// Запуск выполняет логику seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework также предоставляет метод `CallOnce`, seeder будет выполняться только один раз в команде `db:seed`:

```go
// Выполнение логики seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Запущенные сиденья

Вы можете запустить команду `db:seed` для инициализации вашей базы данных. По умолчанию команда `db:seed` запускает файл
`database/seeders/database_seeder.go`, который может в свою очередь вызвать другие классы seed. Однако, вы можете использовать опцию
`--seeder`, чтобы указать конкретный seeder класс для индивидуального запуска:

```shell
бегайте . artisan db:seed
```

Если вы хотите выполнить другие ключи при запуске команды `db:seed`, вы можете зарегистрировать seeder в
`app/providers/database_service_provider.go`:

```go
// app/providers/database_service_provider.go
func (receiver *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders. hotoSeeder{},
 })
}

запускается . artisan db:seed --seeder=UserSeeder PhotoSeeder // Подпись seeder
```

Вы также можете основать свою базу данных с помощью команды `migrate:fresh` и `migrate:refresh` в сочетании с опцией `--seed`
, , который будет удалять все таблицы и перезапускать все ваши миграции. Эта команда полезна для полностью пересборки
вашей базы данных. Опция `--seeder` может быть использована для указания конкретного seeder для запуска:

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

запустить . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Принудительные сидящие для бега в производстве

Некоторые операции раздачи могут привести к изменению или потере данных. Чтобы защитить вас от выполнения команд инициализации
от вашей производственной базы данных, вам будет предложено подтвердить перед запуском сеялок в среде
`production`. Чтобы заставить сидящих работать без запроса, используйте флаг `--force`:

```shell
идите бежать . artisan db:seed --force
```
