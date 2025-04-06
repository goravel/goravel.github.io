# HTTP тесты

При создании веб-приложений вам часто приходится тестировать корректную работу HTTP-запросов от начала до конца.
Goravel's testing tools make this straightforward - you can simulate requests and verify responses without setting up
complex test environments.

## Запрашивать

Тестирование конечных точек HTTP в Горавеле использует простой шаблон. Start with the `Http` method from your `TestCase`, which needs
a `*testing.T` parameter for assertions. This gives you a request object (`framework/contracts/testing.TestRequest`)
that handles all common HTTP verbs like `Get`, `Post`, and `Put`.

Вместо реальных HTTP-звонков, эти методы моделируют внутренний цикл запросов вашего приложения. Each request
returns a response object (`framework/contracts/testing.TestResponse`) with methods to check the results.

Вот основной пример:

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Настройка заголовков запросов

Вы можете настроить заголовки запросов, используя `WithHeader` для одного заголовка или `WithHeaders` для нескольких заголовков:

```go
func (s *ExampleTestSuite) TestIndex() {
    // Один заголовок
    ответ, err := s.Http(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Несколько заголовков
    ответ, err := s. ttp(s.T()). ithHeaders(map[string]string{
        "X-Custom-Header": "Значение",
        "Принять": "application/json",
    }). et("/users/1")
}
```

### Печенье

Вы можете использовать метод `WithCookie` или `WithCookies` для установки значения cookies перед выполнением запроса.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 // or use WithHeaders for multiple Headers
 response, err := s. ttp(s.T()). ithHeader(map[string]string{
        "name": "krishan",
        "lang": "ru",
    }). et("/users/1")
}
```

### Снятие

Вы можете установить сеанс в метод «WithSession»:

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Отладка ответов

After making request you may use `Session`, `Headers`, `Content`, `Cookies` or `Json` method to check data returned from
the request.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}). et("/users/1")
 
 содержание, err := response.Content()
 
 cookies := response. ookies()
 
 заголовки := response.Headers()
 
 json, err := response. son() // тело ответа, анализируемое как json(map[string]любое)
 
 сессии, err := ответ. ession() // возвращает все значения, сохраненные в текущем сеансе запроса
}
```

## Построение тела

Для такого метода, как `Post`, `Put`, `Delete` и т. д. Горавель принимает «io.Reader» в качестве второго аргумента. Для упрощения построения
полезных нагрузок фреймворк предоставляет полезные методы для построения тел запроса.

```go
импорт "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("name", "krishan")
    
    body, err := builder. uild()

    ответ, err := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## Тестирование Json API

Goravel предоставляет несколько помощников для тестирования JSON API ответов. It attempts to unmarshal the response body into
a Go `map[string]any`. В случае неудачного разбора, соответствующие утверждения также будут проваливаться.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": true,
        })
}
```

Для прямого доступа к JSON без маршала, используйте метод `Json` в разделе `TestResponse`. This lets you inspect individual
elements of the response body.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
The `AssertJson` method checks whether the response contains all the specified values, even if the response includes
additional fields. Это не требует полного совпадения, если вы не используете `AssertExactJson`.
:::

### Утверждение точных JSON матчей

Если вам нужно убедиться, что ответ соответствует вашему ожидаемому JSON точно (без дополнительных или отсутствующих полей), используйте метод
`AssertExactJson`.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Горавель упрощает выполнение беглых утверждений на JSON ответы. Используя метод `AssertFluentJson`, вы можете передать
замыкание, которое обеспечивает экземпляр `framework/contracts/testing.AssertableJSON`. This instance allows you to check
specific values or conditions in the JSON response returned by your request.

For example, you can use the `Where` method to assert that a particular value exists in the JSON response, and the
`Missing` method to ensure that an attribute is not present.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex() {
    response, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (json contractstesting.AssertableJSON) {
   json.Where("id", float64(1)).
    Where("name", "bowen").
    WhereNot("lang", "ru").
    Отсутствует("пароль")
        })
}
```

### Атрибут присутствия / Отсутствия

If you want to check whether an attribute is present or missing, Goravel makes it simple with the `Has` and `Missing`
methods.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("username").
            Отсутствует ("пароль")
})
```

Вы также можете одновременно утверждать наличие или отсутствие нескольких атрибутов, используя `HasAll` и `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Если вам нужно только проверить наличие хотя бы одного атрибута из списка, используйте метод «HasAny».

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### Scoping JSON Collection Assertions

Когда ответ содержит коллекцию объектов под именованным ключом, вы можете использовать различные методы для установки его структуры
и содержания.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    элементов := []Item{
        {ID: 1},
        {ID: 2},
    }
    возвращает ctx. esponse().Json(200, map[string]{
  "items": items,
    })
}
```

Вы можете использовать метод `Count` для проверки количества элементов в коллекции. Для утверждения свойств первого элемента
используйте метод `First`, который служит примером `AssertableJson`. Similarly, the `Each` method allows you
to iterate over all elements and assert their properties individually. Кроме того, метод `HasWithScope` сочетает в себе
функциональность `First` и `Count`, позволяя вам утверждать как первый элемент, так и его содержимое, предоставляя
экземпляр `AssertableJson` для утверждений в области видимости.

```go
// Count and First
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.Count("items", 2).
            First("items", func(json contractstesting.AssertableJSON) {
                json.Where("id", 1)
            })
    })

// Each
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.Count("items", 2).
            Each("items", func(json contractstesting.AssertableJSON) {
                json.Has("id")
            })
    })

// HasWithScope
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("items", 2, func(json contractstesting.AssertableJSON) {
            json.Where("id", 1)
        })
    })
```

## Доступные Активы

### Ассеты ответа

|                                                   |                                                         |                                                         |
| ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| [AssertAccepted](#assertaccepted)                 | [AssertBadRequest](#assertbadrequest)                   | [AssertConflict](#assertconflict)                       |
| [AssertCookie](#assertcookie)                     | [AssertCookieExpired](#assertcookieexpired)             | [AssertCookieMissing](#assertcookiemissing)             |
| [AssertCookieNotExpired](#assertcookienotexpired) | [AssertCreated](#assertcreated)                         | [AssertDontSee](#assertdontsee)                         |
| [AssertExactJson](#assertexactjson)               | [AssertFluentJson](#assertfluentjson)                   | [AssertForbidden](#assertforbidden)                     |
| [AssertFound](#assertfound)                       | [AssertGone](#assertgone)                               | [AssertHeader](#assertheader)                           |
| [AssertHeaderMissing](#assertheadermissing)       | [AssertInternalServerError](#assertinternalservererror) | [AssertJson](#assertjson)                               |
| [AssertJsonMissing](#assertjsonmissing)           | [AssertMethodNotAllowed](#assertmethodnotallowed)       | [AssertMovedPermanently](#assertmovedpermanently)       |
| [AssertNoContent](#assertnocontent)               | [AssertNotAcceptable](#assertnotacceptable)             | [AssertNotFound](#assertnotfound)                       |
| [AssertNotModified](#assertnotmodified)           | [AssertOk](#assertok)                                   | [AssertPartialContent](#assertpartialcontent)           |
| [AssertPaymentRequired](#assertpaymentrequired)   | [AssertRequestTimeout](#assertrequesttimeout)           | [AssertSee](#assertsee)                                 |
| [AssertSeeInOrder](#assertseeinorder)             | [AssertServerError](#assertservererror)                 | [AssertServiceUnavailable](#assertserviceunavailable)   |
| [AssertStatus](#assertstatus)                     | [AssertSuccessful](#assertsuccessful)                   | [AssertTemporaryRedirect](#asserttemporaryredirect)     |
| [AssertTooManyRequests](#asserttoomanyrequests)   | [AssertUnauthorized](#assertunauthorized)               | [AssertUnprocessableEntity](#assertunprocessableentity) |

### Утверждено

Утверждает, что в ответе присутствует код состояния HTTP `202 Принять`:

```go
response.AssertAccepted()
```

### Запрос на добавление

Утверждает, что в ответе содержится код состояния HTTP `400 Bad Request`:

```go
response.AssertBadRequest()
```

### Утвердить конфликт

Утверждает, что в ответе есть код состояния HTTP 409 Conflict\`:

```go
response.AssertConflict()
```

### Применить печенье

Утверждает, что ответ содержит cookie с указанным именем и значением:

```go
response.AssertCookie("имя", "значение")
```

### Срок действия печенья истек

Утверждает, что срок действия указанного cookie истек:

```go
response.AssertCookieИстек срок действия ("имя")
```

### Отсутствует печенье

Утверждает, что ответ не содержит cookie с указанным именем:

```go
response.AssertCookieMissing("имя")
```

### Срок действия печенья не истёк

Утверждает, что указанный Cookie не истек:

```go
response.AssertCookieNotИстек ("имя")
```

### Утверждено

Утверждает, что в ответе присутствует код состояния HTTP `201 Created`:

```go
response.AssertCreated()
```

### AssertDontSee

Утверждает, что ответ не содержит указанных значений. Второй параметр (опционально) определяет, будет ли
экранировать специальные символы в значениях перед проверкой. Если она не указана, то по умолчанию она истинна.

```go
response.AssertDontSee([]string{"<div>"}, false) // Не экранируйте специальные символы
```

### AssertExactJson

Утверждает, что ответ JSON точно соответствует `map[string]любой`:

```go
response.AssertExactJson(map[string]any{"created": true})
```

### AssertFluentJson

Придает ответ JSON с помощью беглого интерфейса:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### Утвердить запрещено

Утверждает, что в ответе содержится код состояния HTTP `403 Forbidden`:

```go
response.AssertForbidden()
```

### Актив Найден

Утверждает, что в ответе содержится код состояния HTTP `302 Found`:

```go
response.AssertFound()
```

### Усиление

Утверждает, что в ответе содержится код состояния HTTP в формате `410 Gone`:

```go
response.AssertGone()
```

### Заголовок

Утверждает, что ответ содержит указанный заголовок с заданным значением:

```go
response.AssertHeader("Content-Type", "application/json")
```

### Заголовок отсутствует

Утверждает, что ответ не содержит указанного заголовка:

```go
response.AssertHeaderMissing("X-Custom-Header")
```

### AssertInternalServerError

Утверждает, что в ответе содержится код состояния HTTP HTTP при ошибке `500 Internal Server`:

```go
response.AssertInternalServerError()
```

### AssertJson

Утверждает, что ответ JSON содержит предоставленный фрагмент:

```go
response.AssertJson(map[string]any{"created": true})
```

### AssertJsonMissing

Утверждает, что указанные ключи или значения отсутствуют в ответе JSON:

```go
response.AssertJsonMissing(map[string]any{"created": false})
```

### AssertMethodНе разрешено

Утверждает, что в ответе есть код статуса HTTP с методом «405 не допускается»:

```go
response.AssertMethodNotAllowed()
```

### Усиление перемещено навсегда

Утверждает, что в ответе содержится код состояния HTTP `301 перемещен постоянно`:

```go
response.AssertMovedPermanently()
```

### AssertNoContent

Утверждает, что в ответе имеется код состояния HTTP '204 Без содержимого':

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Утверждает, что в ответе содержится код состояния HTTP `406 не принимается`:

```go
response.AssertNotAcceptable()
```

### Активация не найдена

Утверждает, что в ответе содержится код состояния HTTP `404 Не найдена`:

```go
response.AssertNotFound()
```

### Не изменено

Утверждает, что в ответе содержится статус `304 не изменен` HTTP код:

```go
response.AssertNotModified()
```

### Утверждаю

Утверждает, что в ответе присутствует код состояния HTTP из `200 ОК`:

```go
response.AssertOk()
```

### Частичное содержимое

Утверждает, что в ответе имеется код состояния HTTP '206 частичное':

```go
response.AssertPartialContent()
```

### Требуется активация платежа

Утверждает, что в ответе содержится код состояния «402 Платежи» HTTP:

```go
response.AssertPaymentRequired()
```

### Таймаут запроса

Утверждает, что в ответе содержится код состояния HTTP HTTP 408 Request Timeout:

```go
response.AssertRequestTimeout()
```

### Утвердить

Утверждает, что ответ содержит заданные значения. Второй параметр (необязательно) определяет, следует ли экранировать
специальных символов в значениях перед проверкой. Если она не указана, по умолчанию `true`.

```go
response.AssertSee([]string{"<div>"}, false) // Не экранируйте специальные символы
```

### Утвердить Inorder

Asserts that the response contains the specified values in the given order. The second parameter (optional) determines
whether to escape special characters in the values before checking. Если она не указана, по умолчанию `true`.

```go
response.AssertSeeInOrder([]string{"First", "Second"}, false)  // Do not escape special characters
```

### AssertServerError

Asserts that the response has a server error (>= 500 , < 600) HTTP status code:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Asserts that the response has a `503 Service Unavailable` HTTP status code:

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Asserts that the response has the specified HTTP status code:

```go
response.AssertStatus(200)
```

### AssertSuccessful

Asserts that the response has a successful HTTP status code (2xx):

```go
response.AssertSuccessful()
```

### AssertTemporaryRedirect

Asserts that the response has a `307 Temporary Redirect` HTTP status code:

```go
response.AssertTemporaryRedirect()
```

### AssertTooManyRequests

Asserts that the response has a `429 Too Many Requests` HTTP status code:

```go
response.AssertTooManyRequests()
```

### AssertUnauthorized

Asserts that the response has a `401 Unauthorized` HTTP status code:

```go
response.AssertUnauthorized()
```

### AssertUnprocessableEntity

Asserts that the response has a `422 Unprocessable Entity` HTTP status code:

```go
response.AssertUnprocessableEntity()
```
