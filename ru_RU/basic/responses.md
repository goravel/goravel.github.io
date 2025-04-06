# Ответ HTTP

Вы можете использовать `ctx.Response()` для ответа HTTP в контроллере.

## Строка

```go
импортировать "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hello Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx. esponse().Json(http. tatusOK, struct {
  ID uint `json:"id"`
  Строка имени `json:"name"`
}{
  Id: 1,
  фронт: "Горавель",
})
```

## Пользовательский возврат

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Файл ответа

```go
импортировать "net/http"

ctx.Response().File("./public/logo.png")
```

## Скачать файл

```go
импортировать "net/http"

ctx.Response().Скачать("./public/logo.png", "1.png")
```

## Прикрепить заголовок

```go
импортировать "github.com/goravel/framework/contracts/http"

ctx.Response().Заголовок ("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Печенье

### Установить Cookie

Используйте метод «Cookie» в копии «response», чтобы установить «cookie». The `Cookie` method accepts a `http.Cookie`
instance, which allows you to set various cookie options.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Название: "name",
  Значение: "Горавел",
  Путь: "/",
  Домен: "goravel. ev",
  Истекает через: time.Now().Add(24 * time.Hour),
  Безопасность: true,
  HttpOnly: true,
})
```

### Истекает печенье

Используйте метод `WithoutCookie` для удаления cookie.

```go
ctx.Response().WithoutCookie("имя")
```

## Успешно возвращено

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Горавел",
})
```

## Пользовательский код

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "Привет": "Горавел",
})
```

## Возврат Потока

```go
ctx.Response().Stream(http.StatusCreated, func(w http). treamWriter) ошибка {
  данных := []string{"a", "b", "c"}
  для _, элемент := range data {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    время.Sleep(1 * раз. и др.)
  }

  обратный номер
})
```

## Перенаправление

```go
ctx.Response().Перенаправление (http.StatusMovedPermanently, "https://goravel.dev")
```

## Нет контента

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Получить ответ

Вся информация может быть получена через файл `ctx.Response()`, который обычно используется в среднем ПО HTTP:

```go
происхождение := ctx.Response().Origin()
```

`origin` содержит некоторые методы, как показано ниже：

| Метод     | Действие                  |
| --------- | ------------------------- |
| Тело      | Получить данные ответа    |
| Заголовок | Получить заголовок ответа |
| Размер    | Получить размер ответа    |
| Статус    | Получить статус ответа    |
