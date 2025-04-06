# Проверка

Goravel предоставляет несколько различных подходов к проверке входящих данных вашего приложения. Наиболее часто используется метод
`Validate` для всех входящих HTTP-запросов. Goravel includes a wide variety of convenient validation
rules.

## Проверка Quickstart

Давайте более подробно рассмотрим полный пример проверки формы и возврата сообщений об ошибках пользователю. Этот обзор
даст вам общее представление о том, как проверить входящие запросы с помощью Goravel.

### Определение маршрутов

Сначала предположим, что в нашем файле `routes/web.go` определены следующие маршруты:

```go
импортировать "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

Маршрут «GET» отображает форму для создания новой записи в блоге. Маршрут `POST` хранит новый пост в базе данных.

### Создание контроллера

Далее давайте рассмотрим простой контроллер, который обрабатывает входящие запросы к этим маршрутам. We'll leave the `Store`
method empty for now:

```go
контроллеры пакета

импорт (
  "github. om/goravel/framework/contracts/http"
)

type PostController struct {
  // Dependent services
}

func NewPostController() *PostController {
  return &PostController{
    // Inject services
  }
}

func (r *PostController) Create(ctx http. ontext) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### Написание логики проверки

Теперь мы готовы заполнить наш метод `Store` логикой, чтобы проверить новую запись блога.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required|max_len:255",
    "body": "required",
    "code": "required|regex:^\d{4,6}$",
  })
}
```

### Вложенные атрибуты

Если входящий HTTP запрос содержит данные "вложенных", вы можете указать эти поля в правилах проверки используя синтаксис
"точка":

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "required|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Проверка маски

Если входящий HTTP запрос содержит данные массива, вы можете указать эти поля в правилах проверки используя
синтаксис `*`:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Запрос формы

### Создание запросов формы

Для более сложных сценариев проверки вы можете создать "запрос формы". Form requests are custom request classes
that encapsulate their own validation and authorization logic. To create a form request class, you may use the
`make:request` Artisan CLI command:

```go
выполнить . artisan make:request StorePostRequest
перейти к запуску . artisan make:request user/StorePostRequest
```

Сгенерированный класс запроса формы будет помещен в папку `app/http/requests`. Если этот каталог не существует, то
будет создан при запуске команды `make:request`. Каждая заявка на форму, созданная Горавелем, состоит из шести методов:
`Authorize`, `Rules`. In addition, you can customize the `Filters`, `Messages`, `Attributes` and `PrepareForValidation`
methods for further operations.

The `Authorize` method is responsible for determining if the currently authenticated user can perform the action
represented by the request, while the `Rules` method returns the validation rules that should apply to the request's
data:

```go
запросы пакетов

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) ошибка {
  return nil
}

func (r *StorePostRequest) Rules(ctx http. ontext) карта[string]string {
  return map[string]string{
    // Ключи совместимы с входящими ключами.
    "name": "required|max_len:255",
  }
}

func (r *StorePostRequest) Filters(ctx http. ontext) карта[string]строка {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Messages(ctx http. ontext) карта[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) карта[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ошибка validation.Data) {
  return nil
}
```

Как оцениваются правила валидации? Все, что вам нужно сделать, это набрать по запросу метод контроллера. The
incoming form request is validated before the controller method is called, meaning you do not need to clutter your
controller with any validation logic:

Затем вы можете использовать метод `ValidateRequest` для проверки запроса в контроллере:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  ошибки, err := ctx.Request().ValidateRequest(&storePost)
}
```

Проверьте дополнительные правила в разделе [Доступные правила подтверждения](#available-validation-rules).

> Обратите внимание, что поскольку `form` передал значения типа `string` по умолчанию, все поля в запросе также должны быть типа
> `string`, в противном случае используйте `JSON` для передачи значений.

### Авторизация запросов формы

Класс запроса формы также содержит метод `Authorize`. С помощью этого метода вы можете определить, действительно ли авторизованный пользователь
имеет право обновить данный ресурс. For example, you may determine if a user actually owns a
blog comment they are attempting to update. Most likely, you will interact with
your [authorization gates and policies](../security/authorization) within this method:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment models. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors. ew("комментарий не найден")
  }

  если !facades.Gate(). llows("update", map[string]any{
    "comment": комментарий,
  }) {
    return errors. ew("Нельзя обновлять комментарий")
  }

  обратный номер
}
```

`error` будет передан возвращаемому значению `ctx.Request().ValidateRequest`.

### Фильтр входных данных

Вы можете отформатировать входные данные, улучшив метод «Фильтры» запроса формы. Этот метод должен возвращать карту
`attribute/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### Настройка сообщений об ошибках

Вы можете настроить сообщения об ошибках, используемых в запросе формы, заменив метод `Messages`. This method should
return an array of attribute / rule pairs and their corresponding error messages:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. так: "Необходим титул",
    "body.required": "Сообщение обязательно",
  }
}
```

### Настройка атрибутов проверки

Многие сообщения об ошибках в правилах проверки Горавела содержат плейсхолдер `:attribute`. Если вы хотите, чтобы поле
`:attribute` было заменено пользовательским именем атрибута, вы можете указать
пользовательские имена, переопределив метод `Attributes`. Этот метод должен возвращать массив пар атрибутов/имени:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "email address",
  }
}
```

### Подготовка ввода для проверки

Если вам нужно подготовить или обезвредить любые данные из запроса, прежде чем применить правила проверки, вы можете использовать метод
`Подготовка к валидации`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, validation.Data) error {
  if name, exist := data. et("name"); существуют {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Создание валидаторов вручную

Если вы не хотите использовать метод `Validate` по запросу, вы можете создать экземпляр валидатора вручную, используя
`facades.Validator`. Метод «Сделать» фасада генерирует новый экземпляр валидатора:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    map[string]any{
      "name": "Горавел",
    },
    map[string]string{
      "title": "required|max_len:255",
      "body": "required",
    })

  если валидатор. ails() {
    // Возврат fail
  }

  var user models. ser
  err := validator.Bind(&user)
  ...
}
```

Первый аргумент, передаваемый методу `Make`, — это данные, находящиеся в процессе проверки, которые могут быть `map[string]any` или `struct`.
Второй аргумент - это массив правил проверки, которые должны применяться к данным.

### Настройка сообщений об ошибках

При необходимости вы можете предоставить пользовательские сообщения об ошибках, которые экземпляр валидатора должен использовать вместо сообщений об ошибке
по умолчанию, предоставленных Goravel. Вы можете передать пользовательские сообщения в качестве третьего аргумента методу `Make` (также
применимый к `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "required": "Поле :attribute является обязательным.",
}))
```

### Укажите пользовательское сообщение для данного атрибута

Иногда вы хотите указать пользовательское сообщение об ошибке только для определенного атрибута. Вы можете сделать это с помощью "точки"
нотации. Сначала укажите имя атрибута, затем правило (также применимо к `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "email.required": "Нам нужно знать ваш адрес электронной почты!",
}))
```

### Значения пользовательских атрибутов

Многие сообщения об ошибках Goravel's включают в себя плейсхолдер `:attribute`, который заменяется именем поля
или атрибута при проверке. To customize the values used to replace these placeholders for specific fields, you
may pass an array of custom attributes as the third argument to the `Make` method (also applicable to
`ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### Форматировать данные перед проверкой

Вы можете отформатировать данные перед проверкой данных для более гибкой проверки данных, и вы можете передать метод формата
в качестве третьего параметра метод `Make` (также применим к методу `ctx. equest().Валидат()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation. ошибка repareForValidation(func(ctx http.Context, validationcontract.Data) {
      если имя, существует := данные. et("name"); существуют {
        возвращающие данные. et("имя", name)
      }

      return nil
    }))

  . .
}
```

## Работа с подтвержденным вводом

After validating incoming request data using form requests or manually created validator instances, you still want to
bind the request data to a `struct`, there are two ways to do this:

1. Используйте метод `Bind`, который свяжет все входящие данные, включая непроверенные данные:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator. ind(&user)

валидатор, err := facades.Validation().Make(input, rules)
var пользовательские модели.User
err := validator.Bind(&user)
```

2. Входящие данные автоматически привязаны к форме, когда вы используете запрос для проверки:

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Работа с сообщениями об ошибках

### Получение одного сообщения об ошибке для поля (Случайный)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

сообщение := validator.Errors().Один ("email")
```

### Получение всех сообщений об ошибках для поля

```go
сообщения := validator.Errors().Get("email")
```

### Получение всех сообщений об ошибках для всех полей

```go
сообщения := validator.Errors().All()
```

### Определяет, существуют ли сообщения об ошибках для поля

```go
if validator.Errors().Has("email") {
  //
}
```

## Доступные правила проверки

Ниже приведен список всех доступных правил проверки и их функции:

| Наименование           | Описание                                                                                                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| «требуется»            | Необходимо проверить значение и не может быть нулевым значением. Например, тип поля является `bool`, передающее значение `false`, оно не может пройти проверку.                      |
| `required_if`          | `required_if:anotherfield,value...` Поле для проверки должно быть заполнено и не пустым, если другое поле равно любому значению.                                                                     |
| `required_unless`      | `required_unless:anotherfield,value...` Поле для проверки должно быть заполнено и не пустым, если поле anotherField не равно любому значению.                                                        |
| `required_with`        | `required_with:foo,bar,...` Поле валидация должно быть заполнено и не должно быть пустым, только если есть какие-либо другие указанные поля.                                                         |
| `required_with_all`    | `required_with_all:foo,bar,...` Поле для проверки должно быть заполнено и не должно быть пустым, только если присутствуют все другие указанные поля.                                                 |
| `required_without`     | `required_without:foo,bar,...` Поле для проверки должно быть заполнено и не должно быть пустым, только когда нет любого из других указанных полей.                                                   |
| `required_without_all` | `required_without_all:foo,bar,...` Поле для проверки должно быть заполнено и не должно быть пустым, только если нет всех других указанных полей.                                                     |
| `int`                  | Проверьте значение `intX` типа `uintX` и проверки размера поддержки. eg: `int` `int:2` `int:2,12`. Примечание: [Точки за использование правил](#int) |
| `uint`                 | Проверьте значение типа `uint(uintX)`, `value >= 0`                                                                                                                                                                  |
| `бул`                  | Проверьте значение bool string(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                                             |
| `строка`               | Проверьте значение типа строки, и поддержите проверку размера файла. eg:`string` `string:2` `string:2,12`                                                                            |
| `float`                | Проверьте значение типа `float(floatX)`                                                                                                                                                                              |
| `slice`                | Проверьте значение типа маски `[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                                                |
| `in`                   | `in:foo,bar,…` Проверьте, является ли значение в заданном перечислении                                                                                                                                               |
| `not_in`               | `not_in:foo,bar,…` Проверьте, нет ли значение в заданном списке                                                                                                                                                      |
| `starts_with`          | `starts_with:foo` Проверьте, начинается ли входное значение с данной подстрокой                                                                                                                                      |
| `ends_with`            | `ends_with:foo` Проверьте, заканчивается ли входное строковое значение заданной подстрокой                                                                                                                           |
| «между»                | `между:min,max` Проверьте, что значение является числом и находится в пределах заданного диапазона                                                                                                                   |
| `max`                  | `max:value` Проверьте значение меньше или равно заданному значению(`intX` `uintX` `floatX`)                                                                                                       |
| `мин`                  | `min:value` Проверьте значение больше или равно заданному значению(`intX` `uintX` `floatX`)                                                                                                       |
| `eq`                   | `eq:value` Проверьте, что входное значение равно заданному значению                                                                                                                                                  |
| `ne`                   | `ne:value` Проверьте, что входное значение не равно заданному значению                                                                                                                                               |
| `lt`                   | `lt:value` Проверьте значение меньше заданного значения(`intX` `uintX` `floatX`)                                                                                                                  |
| `gt`                   | `gt:value` Проверьте значение больше заданного значения(`intX` `uintX` `floatX`)                                                                                                                  |
| `len`                  | `len:value` Длина проверки равна заданному размеру (`string` `array` `slice` `map`)                                                                                                               |
| `min_len`              | `min_len:value` Проверьте минимальную длину значения в заданном размере(`string` `array` `slice` `map`)                                                                                           |
| `max_len`              | `max_len:value` Проверьте максимальную длину значения задаваемого размера (`string` `array` `slice` `map`)                                                                                        |
| `email`                | Проверьте значение электронной почты строки                                                                                                                                                                          |
| `массив`               | Проверить значение массива, тип маски                                                                                                                                                                                |
| «карта»                | Проверка значения типа MAP                                                                                                                                                                                           |
| `eq_field`             | `eq_field:field` Проверьте, что значение поля равно значению другого поля                                                                                                                                            |
| `ne_field`             | `ne_field:field` Проверьте, что значение поля не равно значению другого поля                                                                                                                                         |
| `gt_field`             | `gt_field:field` Проверьте, что значение поля больше значения другого поля                                                                                                                                           |
| `gte_field`            | `gte_field:field` Проверьте, что значение поля больше или равно значению другого поля                                                                                                                                |
| `lt_field`             | `lt_field:field` Проверьте, что значение поля меньше, чем значение другого поля                                                                                                                                      |
| `lte_field`            | `lte_field:field` Проверьте значение поля меньше или равно значению другого поля                                                                                                                                     |
| `файл`                 | Проверьте, является ли это загруженный файл                                                                                                                                                                          |
| `image`                | Проверьте, является ли это загруженный файл изображения и поддерживается проверка суффиксов                                                                                                                          |
| `дата`                 | Проверьте значение поля - строка даты                                                                                                                                                                                |
| `gt_date`              | `gt_date:value` Проверьте, что введенное значение больше заданной строки даты                                                                                                                                        |
| `lt_date`              | `lt_date:value` Проверьте, что входное значение меньше указанного значения даты                                                                                                                                      |
| `gte_date`             | `gte_date:value` Проверьте, что входное значение больше или равно данной строке даты                                                                                                                                 |
| `lte_date`             | `lte_date:value` Проверьте, что входное значение меньше или равно данной строке даты                                                                                                                                 |
| «альфа»                | Проверьте, что значение содержит только алфавитные символы                                                                                                                                                           |
| `alpha_num`            | Проверьте, что только буквы, цифры включены                                                                                                                                                                          |
| `alpha_dash`           | Отметьте, чтобы включить только буквы, цифры, тире ( - ) и подчеркивания ( _ )                                                                            |
| `json`                 | Проверка значения JSON строки                                                                                                                                                                                        |
| `number`               | Проверьте значение числовой строки `>= 0`                                                                                                                                                                            |
| `full_url`             | Проверьте значение полной URL (должен начинаться с http,https)                                                                                                                                    |
| `ip`                   | Проверить значение в строке IP(v4 или v6)                                                                                                                                                         |
| `ipv4`                 | Проверять значение IPv4 строки                                                                                                                                                                                       |
| `ipv6`                 | Проверять значение IPv6 строки                                                                                                                                                                                       |
| `regex`                | Проверьте, может ли значение пройти регулярную проверку                                                                                                                                                              |

### Очки за использование правил

#### инт

При использовании `ctx.Request().Validate(rules)` для проверки входящие данные типа `int` будут обработаны
`json. nmarshal` в тип `float64`, который приведет к ошибке при проверке правил.

**Решения**

Option 1: Add [`validation.PrepareForValidation`](#format-data-before-validation), format the data before validating the
data;

Вариант 2: Используйте `facades.Validation().Make()` для проверки правил;

## Пользовательские правила проверки

Горавель предоставляет различные полезные правила проверки, однако вы можете пожелать указать свои собственные правила. Одним из методов
регистрации пользовательских правил проверки является использование объектов правил. To generate a new rule object, you can simply use the
`make:rule` Artisan command.

Например, если вы хотите проверить, является ли строка заглавной, вы можете создать правило с помощью этой команды. Goravel will
then save this new rule in the `app/rules` directory. Если этот каталог не существует, Goravel создаст его, когда вы
запустите команду Artisan, чтобы создать ваше правило.

```go
go run . artisan make:rule Uppercase
go run . artisan make:rule user/Uppercase
```

После создания правила нам нужно определить его поведение. Объект правила имеет два метода: «Passes» и «Message». Метод
получает все данные, включая проверенные данные и параметры проверки. Возвращает
`true` или `false` в зависимости от того, является ли значение атрибута допустимым. Метод `Message` должен возвращать сообщение об ошибке
для проверки, которое должно быть использовано при сбое проверки.

```go
правила пакета

импортировать (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

тип Uppercase struct {
}

// Имя правила.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes Determine if the validation rule passes.
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val. строка)
}

// Сообщение получить сообщение об ошибке проверки.
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

Затем вам нужно зарегистрировать правило в метод `rules` в файле `app/providers/validation_service_provider.go`, и
правило может быть использовано как другие правила:

```go
поставщики пакетов

импорт (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Доступные фильтры проверки

| Наименование                   | Описание                                                                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Преобразовать значение(string/intX/floatX) в `int` тип `v.FilterRule("id", "int")`                                                                              |
| `uint/toUint`                  | Преобразовать значение(string/intX/floatX) в `uint` тип `v.FilterRule("id", "uint")`                                                                            |
| `int64/toInt64`                | Преобразовать значение(string/intX/floatX) в `int64` тип `v.FilterRule("id", "int64")`                                                                          |
| `float/toFloat`                | Преобразовать значение(string/intX/floatX) в тип `float`                                                                                                        |
| `bool/toBool`                  | Преобразовать строковое значение в bool. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false") |
| `trim/trimSpace`               | Очистить символы пробелов с обеих сторон строки                                                                                                                                    |
| `ltrim/trimLeft`               | Очистить символы пробелов на левой стороне строки                                                                                                                                  |
| `rtrim/trimRight`              | Очистить символы пробелов на правой стороне строки                                                                                                                                 |
| `int/integer`                  | Преобразовать значение(string/intX/floatX) в `int` тип `v.FilterRule("id", "int")`                                                                              |
| `нижний/нижний регистр`        | Преобразовать строку в строчные буквы                                                                                                                                              |
| `вверх/верхний регистр`        | Преобразовать строку в верхний регистр                                                                                                                                             |
| `lcFirst/lowerFirst`           | Преобразовать первый символ строки в строчные буквы                                                                                                                                |
| `ucFirst/upperFirst`           | Преобразовать первый символ строки в верхний регистр                                                                                                                               |
| `ucWord/upperWord`             | Преобразовать первый символ каждого слова в верхний регистр                                                                                                                        |
| `верблюд/верблюжье`            | Преобразовать строку в стиль именования верблюдов                                                                                                                                  |
| `snake/snakeCase`              | Преобразовать строку в стиль именования змеи                                                                                                                                       |
| `escapeJs/escapeJS`            | Escape JS строка.                                                                                                                                                  |
| `escapeHtml/escapeHTML`        | Escape HTML строка.                                                                                                                                                |
| `str2ints/strToInts`           | Преобразовать строку в int slice `[]int`                                                                                                                                           |
| `str2time/strToTime`           | Преобразовать строку даты в `time.Time`.                                                                                                                           |
| `str2arr/str2array/strToArray` | Преобразовать строку в строку `[]string`                                                                                                                                           |

## Пользовательский фильтр

Горавель предоставляет различные полезные фильтры, однако вы можете пожелать указать некоторые из них. Чтобы сгенерировать новое правило
объекта, вы можете просто использовать команду `make:filter` Artisan. Давайте воспользуемся этой командой для создания правила, преобразующего
строку в целое число. Это правило уже включено в фреймворк, мы просто создаем его в качестве примера. Goravel сохранит
этот новый фильтр в папке `app/filters`. Если этот каталог не существует, Goravel создаст его, когда вы запустите
команду Artisan для создания правила:

```go
go run . artisan make:filter ToInt
// или
go run . artisan make:filter user/ToInt
```

Один фильтр содержит два метода: «Подпись» и «Ручная». Метод `Signature` задает имя фильтра. Метод
`Handle` выполняет специальную логику фильтрации:

```go
фильтры пакетов

импорт (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Подпись фильтра.
func (receiver *ToInt) Signature() string {
  return "ToInt"
}

// Handle определяет функцию фильтра для применения.
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Затем необходимо зарегистрировать фильтр в метод `filters` в файле `app/providers/validation_service_provider.go`,
и фильтр может использоваться как другие:

```go
поставщики пакетов

импорт (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("add filter error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
