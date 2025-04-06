# Фабрики

При тестировании вашего приложения или инициализации базы данных может потребоваться вставить несколько записей в вашу базу данных
заранее. Вместо вручную вводить значения для каждой колонки, Горавель позволяет вам определить набор атрибутов
по умолчанию для каждой вашей модели, создавая фабрики моделей.

To see an example of how to write a factory, you can check out the `user_factory.go` file located in your application's
`database/factories` directory.

```go
пакетные заводы

тип UserFactory struct {
}

// Определение стандартного состояния модели.
func (f *UserFactory) Definition()[string]any {
  return map[string]any{
    "Name": "Горавел",
  }
}
```

Как видите, в самой базовой форме фабрики являются структурами, которые имеют метод «Определение». Метод возвращает набор значений атрибутов
по умолчанию, который должен использоваться при создании модели с фабрикой. Чтобы сгенерировать диапазон случайных данных
можно положиться на [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Создание фабрик

Чтобы создать фабрику, запустите `make:factory` Artisan команду:

```
идите под рукой ремесленник make:factory PostFactory
```

Новая фабрика `struct` будет размещена в папке `database/factories`.

### Конвенции об открытии образцов и образцов

После определения завода, вы можете использовать метод `Factory()` в модели, чтобы связать фабрику с моделью:

```go
package models

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github.com/goravel/framework/database/orm"

  "goravel/database/factories"
)

type User struct {
  orm.Model
  Name   string
  Avatar string
  orm.SoftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Создание моделей с использованием фабрик

### Создание моделей

Мы можем использовать метод `Make` для создания моделей, не сохраняя их в базе данных:

```go
модели вар. Пользователь
err := facades.Orm().Factory().Make(&user)
```

Вы можете создать коллекцию различных моделей, используя метод «Подсчет»:

```go
вар пользователей []models.Пользователь
err := facades.Orm().Factory().Count(2).Make(&users)
```

Если вы хотите переопределить некоторые значения по умолчанию для ваших моделей, вы можете передать `map[string]any` в метод `Make`
. Only the specified attributes will be replaced while the rest of the attributes remain set to their default
values as specified by the factory:

```go
Модели пользователей var. Пользователь
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Сохраняющиеся модели

Метод «Создать» создает и сохраняет экземпляры моделей в базу данных с использованием метода «Сохранить».

```go
модели пользователей вар. Пользователь
err := facades.Orm().Factory().Create(&user)

пользователей вар []models.Пользователь
err := facades.Orm().Factory().Count(2).Create(&users)
```

Вы можете переопределить атрибуты модели фабрики по умолчанию, передав метод `map[string]any` атрибутов `Create`
:

```go
Модели пользователей var. Пользователь
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Игнорировать событие модели

There may be [model event](../orm/quickstart#events) defined on the model, you can ignore those events with the
`CreateQuietly` method:

```go
модели вар. Пользователь
err := facades.Orm().Factory().CreateQuietly(&user)
```
