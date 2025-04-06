# 验证

Goravel 提供了几种不同的方法来验证应用程序的传入数据。 最常见的是使用所有传入 HTTP 请求上可用的
`Validate` 方法。 Goravel 包含各种方便的验证
规则。

## 验证快速入门

让我们仔细看一个完整的示例，了解如何验证表单并向用户返回错误消息。 这个
概述将为您提供使用 Goravel 验证传入请求数据的一般理解。

### 定义路由

首先，让我们假设我们在 `routes/web.go` 文件中定义了以下路由：

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

`GET` 路由显示用于创建新博客文章的表单。 使用 `POST` 路由将新帖子存储到数据库中。

### 创建控制器

接下来，让我们看一个简单的控制器，它处理这些路由的传入请求。 我们暂时将 `Store` 方法保留为空：

```go
package controllers

import (
  "github.com/goravel/framework/contracts/http"
)

type PostController struct {
  // 依赖服务
}

func NewPostController() *PostController {
  return &PostController{
    // 注入服务
  }
}

func (r *PostController) Create(ctx http.Context) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### 编写验证逻辑

现在我们准备在 `Store` 方法中填写验证新博客文章的逻辑。

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request().Validate(map[string]string{
    "title": "required|max_len:255",
    "body": "required",
    "code": "required|regex:^\d{4,6}$",
  })
}
```

### 嵌套属性

如果传入的 HTTP 请求包含"嵌套"字段数据，您可以在验证规则中使用"点"语法来指定这些字段：

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "required|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### 切片验证

如果传入的 HTTP 请求包含"数组"字段数据，您可以在验证规则中使用 `*` 语法来指定这些字段：

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## 表单请求验证

### 创建表单请求

对于更复杂的验证场景，您可能希望创建一个"表单请求"。 表单请求是封装了自己的验证和授权逻辑的自定义请求类。 要创建表单请求类，您可以使用 `make:request` Artisan CLI 命令：

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

生成的表单请求类将被放置在 `app/http/requests` 目录中。 如果该目录不存在，
在运行 `make:request` 命令时将会创建它。 Goravel 生成的每个表单请求都有六个方法：
`Authorize`、`Rules`。 此外，你可以自定义 `Filters`、`Messages`、`Attributes` 和 `PrepareForValidation`
方法来进行进一步的操作。

`Authorize` 方法负责确定当前认证用户是否可以执行请求所代表的操作，
而 `Rules` 方法返回应该应用于请求数据的验证规则：

```go
package requests

import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http.Context) error {
  return nil
}

func (r *StorePostRequest) Rules(ctx http.Context) map[string]string {
  return map[string]string{
    // 键与传入的键一致。
    "name": "required|max_len:255",
  }
}

func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Messages(ctx http.Context) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http.Context) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
  return nil
}
```

那么，验证规则是如何被评估的呢？ 你只需要在控制器方法中类型提示请求即可。 传入的表单请求在控制器方法被调用之前就会被验证，这意味着你不需要在控制器中添加任何验证逻辑：

然后你可以在控制器中使用 `ValidateRequest` 方法来验证请求：

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

查看[可用验证规则](#available-validation-rules)部分了解更多规则。

> 请注意，由于`form`传递的值默认为`string`类型，请求中的所有字段也应该是`string`类型，否则请使用`JSON`传递值。

### 授权表单请求

表单请求类还包含一个`Authorize`方法。 在此方法中，你可以确定已认证的用户是否实际有权更新给定资源。 例如，你可以确定用户是否实际拥有他们尝试更新的博客评论。 在这个方法中，你很可能会与你的[授权门和策略](../security/authorization)进行交互：

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment models.Comment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors.New("未找到评论")
  }

  if !facades.Gate().Allows("update", map[string]any{
    "comment": comment,
  }) {
    return errors.New("无法更新评论")
  }

  return nil
}
```

`error` 将被传递给 `ctx.Request().ValidateRequest` 的返回值。

### 过滤输入数据

你可以通过改进表单请求的 `Filters` 方法来格式化输入数据。 此方法应返回一个
`属性/过滤器`的映射：

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### 自定义错误消息

你可以通过重写 `Messages` 方法来自定义表单请求使用的错误消息。 此方法应
返回一个属性/规则对及其对应错误消息的数组：

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title.required": "标题是必需的",
    "body.required": "消息是必需的",
  }
}
```

### 自定义验证属性

Goravel 的许多内置验证规则错误消息包含一个 `:attribute` 占位符。 如果您希望验证消息中的 `:attribute` 占位符被替换为自定义属性名称，您可以通过重写 `Attributes` 方法来指定自定义名称。 此方法应返回一个属性/名称对的数组：

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "电子邮件地址",
  }
}
```

### 准备验证输入

如果您需要在应用验证规则之前准备或清理请求中的任何数据，您可以使用 `PrepareForValidation` 方法：

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
  if name, exist := data.Get("name"); exist {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## 手动创建验证器

如果你不想在请求上使用 `Validate` 方法，你可以使用 `facades.Validator` 手动创建一个验证器实例。 门面的 `Make` 方法生成一个新的验证器实例：

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation().Make(
    map[string]any{
      "name": "Goravel",
    },
    map[string]string{
      "title": "required|max_len:255",
      "body":  "required",
    })

  if validator.Fails() {
    // 返回失败
  }

  var user models.User
  err := validator.Bind(&user)
  ...
}
```

传递给 `Make` 方法的第一个参数是要验证的数据，可以是 `map[string]any` 或 `struct`。
第二个参数是要应用于数据的验证规则数组。

### 自定义错误消息

If needed, you may provide custom error messages that a validator instance should use instead of the default error
messages provided by Goravel. You may pass the custom messages as the third argument to the `Make` method (also
applicable to `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "required": "The :attribute field is required.",
}))
```

### Specifying A Custom Message For A Given Attribute

Sometimes you may wish to specify a custom error message only for a specific attribute. You may do so using "dot"
notation. Specify the attribute's name first, followed by the rule (also applicable to `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "email.required": "We need to know your email address!",
}))
```

### Specifying Custom Attribute Values

Many of Goravel's built-in error messages include an `:attribute` placeholder that is replaced with the name of the
field or attribute under validation. To customize the values used to replace these placeholders for specific fields, you
may pass an array of custom attributes as the third argument to the `Make` method (also applicable to
`ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### Format Data Before Validation

You can format the data before validating the data for more flexible data validation, and you can pass the method of
formatting the data as the third parameter to the `Make` method (also applicable to `ctx.Request().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http.Context) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation.PrepareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      if name, exist := data.Get("name"); exist {
        return data.Set("name", name)
      }

      return nil
    }))

  ...
}
```

## Working With Validated Input

After validating incoming request data using form requests or manually created validator instances, you still want to
bind the request data to a `struct`, there are two ways to do this:

1. Use the `Bind` method, this will bind all incoming data, including unvalidated data:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator.Bind(&user)

validator, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. The incoming data is automatically bound to the form when you use request for validation:

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Working With Error Messages

### Retrieving one Error Message For A Field (Random)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### Retrieving All Error Messages For A Field

```go
messages := validator.Errors().Get("email")
```

### Retrieving All Error Messages For All Fields

```go
messages := validator.Errors().All()
```

### Determining If Error Messages Exist For A Field

```go
if validator.Errors().Has("email") {
  //
}
```

## Available Validation Rules

Below is a list of all available validation rules and their function:

| Name                   | Description                                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `required`             | Check value is required and cannot be zero value. For example, field type is `bool`, the passing value is `false`, it can not pass the validation.                  |
| `required_if`          | `required_if:anotherfield,value,...` The field under validation must be present and not empty if the anotherField field is equal to any value.                                      |
| `required_unless`      | `required_unless:anotherfield,value,...` The field under validation must be present and not empty unless the anotherField field is equal to any value.                              |
| `required_with`        | `required_with:foo,bar,...` The field under validation must be present and not empty only if any of the other specified fields are present.                                         |
| `required_with_all`    | `required_with_all:foo,bar,...` The field under validation must be present and not empty only if all of the other specified fields are present.                                     |
| `required_without`     | `required_without:foo,bar,...` The field under validation must be present and not empty only when any of the other specified fields are not present.                                |
| `required_without_all` | `required_without_all:foo,bar,...` The field under validation must be present and not empty only when all of the other specified fields are not present.                            |
| `int`                  | Check value is `intX` `uintX` type, and support size checking. eg: `int` `int:2` `int:2,12`. Notice: [Points for using rules](#int) |
| `uint`                 | Check value is `uint(uintX)` type, `value >= 0`                                                                                                                                                     |
| `bool`                 | Check value is bool string(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                                |
| `string`               | Check value is string type, and support size checking. eg:`string` `string:2` `string:2,12`                                                                         |
| `float`                | Check value is `float(floatX)` type                                                                                                                                                                 |
| `slice`                | Check value is slice type(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                |
| `in`                   | `in:foo,bar,…` Check if the value is in the given enumeration                                                                                                                                       |
| `not_in`               | `not_in:foo,bar,…` Check if the value is not in the given enumeration                                                                                                                               |
| `starts_with`          | `starts_with:foo` Check if the input string value is starts with the given sub-string                                                                                                               |
| `ends_with`            | `ends_with:foo` Check if the input string value is ends with the given sub-string                                                                                                                   |
| `between`              | `between:min,max` Check that the value is a number and is within the given range                                                                                                                    |
| `max`                  | `max:value` Check value is less than or equal to the given value(`intX` `uintX` `floatX`)                                                                                        |
| `min`                  | `min:value` Check value is greater than or equal to the given value(`intX` `uintX` `floatX`)                                                                                     |
| `eq`                   | `eq:value` Check that the input value is equal to the given value                                                                                                                                   |
| `ne`                   | `ne:value` Check that the input value is not equal to the given value                                                                                                                               |
| `lt`                   | `lt:value` Check value is less than the given value(`intX` `uintX` `floatX`)                                                                                                     |
| `gt`                   | `gt:value` Check value is greater than the given value(`intX` `uintX` `floatX`)                                                                                                  |
| `len`                  | `len:value` Check value length is equals to the given size(`string` `array` `slice` `map`)                                                                                       |
| `min_len`              | `min_len:value` Check the minimum length of the value is the given size(`string` `array` `slice` `map`)                                                                          |
| `max_len`              | `max_len:value` Check the maximum length of the value is the given size(`string` `array` `slice` `map`)                                                                          |
| `email`                | Check value is email address string                                                                                                                                                                 |
| `array`                | Check value is array, slice type                                                                                                                                                                    |
| `map`                  | Check value is a MAP type                                                                                                                                                                           |
| `eq_field`             | `eq_field:field` Check that the field value is equals to the value of another field                                                                                                                 |
| `ne_field`             | `ne_field:field` Check that the field value is not equals to the value of another field                                                                                                             |
| `gt_field`             | `gt_field:field` Check that the field value is greater than the value of another field                                                                                                              |
| `gte_field`            | `gte_field:field` Check that the field value is greater than or equal to the value of another field                                                                                                 |
| `lt_field`             | `lt_field:field` Check that the field value is less than the value of another field                                                                                                                 |
| `lte_field`            | `lte_field:field` Check if the field value is less than or equal to the value of another field                                                                                                      |
| `file`                 | Verify if it is an uploaded file                                                                                                                                                                    |
| `image`                | Check if it is an uploaded image file and support suffix check                                                                                                                                      |
| `date`                 | Check the field value is date string                                                                                                                                                                |
| `gt_date`              | `gt_date:value` Check that the input value is greater than the given date string                                                                                                                    |
| `lt_date`              | `lt_date:value` Check that the input value is less than the given date string                                                                                                                       |
| `gte_date`             | `gte_date:value` Check that the input value is greater than or equal to the given date string                                                                                                       |
| `lte_date`             | `lte_date:value` Check that the input value is less than or equal to the given date string                                                                                                          |
| `alpha`                | Verify that the value contains only alphabetic characters                                                                                                                                           |
| `alpha_num`            | Check that only letters, numbers are included                                                                                                                                                       |
| `alpha_dash`           | Check to include only letters, numbers, dashes ( - ), and underscores ( _ )                                                              |
| `json`                 | Check value is JSON string                                                                                                                                                                          |
| `number`               | Check value is number string `>= 0`                                                                                                                                                                 |
| `full_url`             | Check value is full URL string(must start with http,https)                                                                                                                       |
| `ip`                   | Check value is IP(v4 or v6) string                                                                                                                                               |
| `ipv4`                 | Check value is IPv4 string                                                                                                                                                                          |
| `ipv6`                 | Check value is IPv6 string                                                                                                                                                                          |
| `regex`                | Check if the value can pass the regular verification                                                                                                                                                |

### Points For Using Rules

#### int

When using `ctx.Request().Validate(rules)` for validation, the incoming `int` type data will be parsed by
`json.Unmarshal` into `float64` type, which will cause the int rule validation to fail.

**Solutions**

Option 1: Add [`validation.PrepareForValidation`](#format-data-before-validation), format the data before validating the
data;

Option 2: Use `facades.Validation().Make()` for rule validation;

## Custom Validation Rules

Goravel provides a variety of helpful validation rules; however, you may wish to specify some of your own. One method of
registering custom validation rules is using rule objects. To generate a new rule object, you can simply use the
`make:rule` Artisan command.

For instance, if you want to verify that a string is uppercase, you can create a rule with this command. Goravel will
then save this new rule in the `app/rules` directory. If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
go run . artisan make:rule Uppercase
go run . artisan make:rule user/Uppercase
```

After creating the rule, we need to define its behavior. A rule object has two methods: `Passes` and `Message`. The
Passes method receives all data, including the data to be validated and the validation parameters. It should return
`true` or `false` depending on whether the attribute value is valid. The `Message` method should return the error
message for validation that should be used when the validation fails.

```go
package rules

import (
  "strings"

  "github.com/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Signature The name of the rule.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes Determine if the validation rule passes.
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val.(string)
}

// Message Get the validation error message.
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

Then you need to register the rule to the `rules` method in the `app/providers/validation_service_provider.go` file, and
the rule can be used like other rules:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades.Validation().AddRules(receiver.rules()); err != nil {
    facades.Log().Errorf("add rules error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation.Rule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Available Validation Filters

| Name                           | Description                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Convert value(string/intX/floatX) to `int` type `v.FilterRule("id", "int")`                                                                          |
| `uint/toUint`                  | Convert value(string/intX/floatX) to `uint` type `v.FilterRule("id", "uint")`                                                                        |
| `int64/toInt64`                | Convert value(string/intX/floatX) to `int64` type `v.FilterRule("id", "int64")`                                                                      |
| `float/toFloat`                | Convert value(string/intX/floatX) to `float` type                                                                                                    |
| `bool/toBool`                  | Convert string value to bool. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false") |
| `trim/trimSpace`               | Clean up whitespace characters on both sides of the string                                                                                                              |
| `ltrim/trimLeft`               | Clean up whitespace characters on left sides of the string                                                                                                              |
| `rtrim/trimRight`              | Clean up whitespace characters on right sides of the string                                                                                                             |
| `int/integer`                  | Convert value(string/intX/floatX) to `int` type `v.FilterRule("id", "int")`                                                                          |
| `lower/lowercase`              | Convert string to lowercase                                                                                                                                             |
| `upper/uppercase`              | Convert string to uppercase                                                                                                                                             |
| `lcFirst/lowerFirst`           | Convert the first character of a string to lowercase                                                                                                                    |
| `ucFirst/upperFirst`           | Convert the first character of a string to uppercase                                                                                                                    |
| `ucWord/upperWord`             | Convert the first character of each word to uppercase                                                                                                                   |
| `camel/camelCase`              | Convert string to camel naming style                                                                                                                                    |
| `snake/snakeCase`              | Convert string to snake naming style                                                                                                                                    |
| `escapeJs/escapeJS`            | Escape JS string.                                                                                                                                       |
| `escapeHtml/escapeHTML`        | Escape HTML string.                                                                                                                                     |
| `str2ints/strToInts`           | Convert string to int slice `[]int`                                                                                                                                     |
| `str2time/strToTime`           | Convert date string to `time.Time`.                                                                                                                     |
| `str2arr/str2array/strToArray` | Convert string to string slice `[]string`                                                                                                                               |

## Custom filter

Goravel provides a variety of helpful filters, however, you may wish to specify some of your own. To generate a new rule
object, you can simply use the `make:filter` Artisan command. Let's use this command to generate a rule that converts a
string to an integer. This rule is already built into the framework, we just create it as an example. Goravel will save
this new filter in the `app/filters` directory. If this directory does not exist, Goravel will create it when you run
the Artisan command to create the rule:

```go
go run . artisan make:filter ToInt
// or
go run . artisan make:filter user/ToInt
```

One filter contains two methods: `Signature` and `Handle`. The `Signature` method sets the name of the filter. The
`Handle` method performs the specific filtering logic:

```go
package filters

import (
  "strings"

  "github.com/spf13/cast"
  "github.com/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Signature The signature of the filter.
func (receiver *ToInt) Signature() string {
  return "ToInt"
}

// Handle defines the filter function to apply.
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast.ToString(val)
  }
}
```

Then you need to register the filter to the `filters` method in the `app/providers/validation_service_provider.go` file,
and the filter can be used like others:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades.Validation().AddFilters(receiver.filters()); err != nil {
    facades.Log().Errorf("add filters error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation.Filter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
