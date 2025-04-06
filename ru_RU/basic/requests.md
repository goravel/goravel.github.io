# HTTP запросы

Метод `contracts/http/Request` Goravel может взаимодействовать с текущим HTTP-запросом, обработанным приложением,
и получать входы и файлы, отправленные вместе.

## Взаимодействие с запросом

Экземпляр `http.Context` автоматически вводится в контроллер:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Получение пути запроса

```go
путь := ctx.Request().Path() // /users
```

### Получение URL запроса

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Получение запроса HOST

```go
url := ctx.Request().Host()
```

### Получение полного запроса URL

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Получение метода запроса

```go
метод := ctx.Request().Method()
```

### Заголовки запроса

```go
заголовок := ctx.Request().Заголовок ("X-Header-Name", "default")
заголовки := ctx.Request().Headers()
```

### IP-адрес запроса

```go
ip := ctx.Request().Ip()
```

## Input

### Получение всех входных данных

Вы можете получить все входные данные входящего запроса как `map[string]any` используя метод `Все`, , которая является
коллекцией `json`, `form` и `query`(приоритет с передней на задний план).

```go
данные := ctx.Request().All()
```

### Получение значения маршрута

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Получение ввода из строки запроса

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
name := ctx.Request().QueryInt64("id")
name := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
names := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
names := ctx.Request().QueryMap("names")

queries := ctx.Request().Queries()
```

> Примечание: Можно получить только одномерные данные JSS, в противном случае они будут возвращены пусто.

### Получение входного значения

Доступ ко всем вводу пользователя без беспокойства о том, какой глагол HTTP был использован для запроса. Получение ордера: `json`,
`form`.

```go
name := ctx.Request().Input("name")
name := ctx.Request().Input("name", "goravel")
name := ctx.Request().InputInputInt("name")
name := ctx.Request(). nputInt64("имя")
имя := ctx.Request().InputBool("имя")
имя := ctx.Request().InputArray("имя")
имя := ctx.Request().InputMap("имя")
```

### Привязка Json/Form

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user
err := ctx.Request().Bind(&user)
```

```go
var user map[string]any
err := ctx.Request().Bind(&user)
```

### Привязать запрос

Поддерживать только привязку к строке:

```go
type Test struct {
  ID string `form:"id"`
}
var test
err := ctx.Request().BindQuery(&test)
```

## Печенье

### Получение значения Cookie

Горавель предоставляет простой способ работы с `cookie`. Используйте метод `Cookie` на копии `Request` для получения
`cookie`, будет возвращать пустую строку если `cookie` не присутствует. You can also define a default value in the
second argument.

```go
значение := ctx.Request().Cookie("имя")
значение := ctx.Request().Cookie("имя", "по умолчанию") 
```

## Файл

### Получение файла

```go
, err := ctx.Request().Файл("файл")
```

### Сохранить файл

```go
файл, err := ctx.Request().File("file")
file.Store("./public")
```

### Получить запрос об отправителе

```go
request := ctx.Request().Origin()
```

### Прикрепить данные

```go
ctx.WithValue("Пользователь", "Горавель")
```

### Получить данные

```go
пользователь := ctx.Value("пользователь")
```

### Получить контекст

```go
ctx := ctx.Context()
```

## Пользовательское восстановление

Вы можете установить пользовательский метод `recovery`, вызвав метод `Recover` в файле `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Добавляем HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // or
    // ctx.Response(). tring(500, "Внутренняя ошибка сервера").Abort()
  })
  ...
}
```
