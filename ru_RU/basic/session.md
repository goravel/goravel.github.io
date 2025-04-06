# Сессия

Сессия позволяет хранить информацию о пользователе по нескольким запросам, обеспечивая штатное впечатление в рамках HTTP-протокола
по своей сути без гражданства. Эта информация о пользователе постоянно хранится на стороне сервера. Goravel offers a
unified interface for interacting with various persistent storage drivers.

## Конфигурация

Конфигурационный файл `session` находится в `config/session.go`. По умолчанию драйвер `file`, который сохраняет сессии
в каталоге `storage/framework/sessions`. Горавель позволяет создать пользовательский драйвер сессии, реализуя
интерфейс `contracts/session/driver`.

### Регистрация Middleware

По умолчанию Горавель не запускает сессию автоматически. Однако он предоставляет middleware для начала сеанса. You can
register the session middleware in the `app/http/kernel.go` file to apply it to all routes, or you can add it to
specific routes:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Взаимодействие с сессией

### Получение данных

Вы можете использовать метод `Get` для извлечения данных из сессии. Если значение не существует, значение «nil» будет возвращено.

```go
значение := ctx.Request().Session().Get("ключ")
```

Вы также можете передать метод `Get` значение по умолчанию в качестве второго аргумента. This value will be returned if the
specified key does not exist in the session:

```go
значение := ctx.Request().Session().Get("ключ", "по умолчанию")
```

### Получение всех данных

Если вы хотите получить все данные из сессии, вы можете использовать метод «Все»:

```go
данные := ctx.Request().Session().All()
```

### Получение подмножества данных

Если вы хотите получить набор данных сеанса, вы можете использовать метод «Только для этого»:

```go
данные := ctx.Request().Session().Только []string{"username", "email"})
```

### Определяет, существует ли элемент в сессии

Чтобы определить, присутствует ли элемент в сессии, вы можете использовать метод «Хас». Метод `Has` возвращает `true`, если элемент
присутствует и не является `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Чтобы определить присутствует ли предмет и даже если он `nil`, вы можете использовать метод `Exists`:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Чтобы определить, нет ли в сессии, вы можете использовать метод «Отсутствует»:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Хранение данных

Вы можете использовать метод `Put` для хранения данных в сессии:

```go
ctx.Request().Session().Put("ключ", "значение")
```

### Получение и удаление данных

Если вы хотите получить элемент из сеанса и удалить его, вы можете использовать метод «Pull»:

```go
значение := ctx.Request().Session().Pull("ключ")
```

### Удаление данных

Метод `Forget` может быть использован для удаления части данных из сессии. If you would like to remove all data from
the session, you can use the `Flush` method:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### Восстановление ID сеанса

Восстановление идентификатора сеанса часто выполняется, чтобы предотвратить использование вредоносными пользователями атаки на фиксацию сеанса
на вашем приложении. Вы можете перегенерировать ID сеанса с помощью метода «Регенерация»:

```go
ctx.Request().Session().Regenerate()
```

If you would like to regenerate the session ID and forget all data that was in the session, you may use the `Invalidate`
method:

```go
ctx.Request().Session().Invalidate()
```

Затем, вы должны сохранить новую сессию в cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Имя: ctx.Request().Session().GetName(),
  Значение: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Путь: facades.Config().GetString("сессии. ath"),
  Домен: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session Выполнение),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Flash-данные

Flash-данные - это данные сеанса, которые будут доступны только при последующем HTTP запросе, а затем будут удалены.
Flash-данные полезны для хранения временных сообщений, таких как статусные сообщения. Вы можете использовать метод `Flash` для хранения данных
в сеансе:

```go
ctx.Request().Session().Flash("статус", "Задача прошла успешно!")
```

Если вы хотите использовать флэш данные для получения дополнительного запроса, используйте метод `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Если вы хотите хранить специфические данные флэш для дополнительного запроса, вы можете использовать метод `Keep`:

```go
ctx.Request().Session().Keep("статус", "имя пользователя")
```

Если вы хотите использовать конкретные данные для немедленного использования, вы можете использовать метод `Now`:

```go
ctx.Request().Session().Сейчас("статус", "Задача прошла успешно!")
```

## Взаимодействие с менеджером сессий

### Построение пользовательского сеанса

Используйте фасад «Сеанса» для создания сеанса. The `Session` facade provides the `BuildSession` method, which takes
a driver instance and an optional session ID if you want to specify a custom session ID:

```go
импортировать "github.com/goravel/framework/facades"

сеанс := facades.Session().BuildSession(драйвер, "sessionID")
```

### Добавить пользовательские драйверы сеансов

#### Реализация драйвера

Для реализации пользовательского драйвера сеансов драйвер должен реализовывать интерфейс «контракты/сессии/драйверы».

```go
// Драйвер - это интерфейс для обработчиков сессий.
тип интерфейса драйвера {
  // Закрытие обработчика сессии.
  Close() error
  // Уничтожение сеанса с заданным ID.
  Ошибка Destroy(id string)
  // Gc выполняет сборку мусора на обработчике сессии с заданным максимальным сроком службы.
  Ошибка Gc(maxLifetime int)
  // Открытие сессии с заданным адресом и именем.
  Ошибка Open(path string, name string)
  // Читаем данные сессии, связанные с данным ID.
  Чтение (id string) (string, error)
  // Записывает данные сессии, связанные с данным ID.
  Ошибка записи (id string, data string)
}
```

#### Регистрация водителя

После реализации драйвера необходимо зарегистрировать его в Горавеле. You can do this using `Extend` method of the
`facades.Session`. Вам следует вызвать метод `Extend` в методе `boot` `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

После регистрации водителя, вы можете использовать его, установив параметр `driver` в файле конфигурации сессии на
`redis` или установив переменную окружения `SESSION_DRIVER` в `redis`.

### Получение экземпляра драйвера

Используйте метод `Driver` для извлечения экземпляра драйвера из менеджера сессии. It accepts an optional driver name, if
not provided, it returns the default driver instance:

```go
driver, err := facades.Session().Driver("файл")
```

### Начать новую сессию

```go
сессия := facades.Session().BuildSession(driver)
session.Start()
```

### Сохранение данных сеанса

```go
сессия := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Присоединение сессии к запросу

```go
сессия := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Проверять, есть ли у запроса сеанс

```go
if ctx.Request().HasSession() {
    //
}
```
