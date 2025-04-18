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

如果需要，您可以为验证器实例提供自定义错误消息，以替代 Goravel 提供的默认错误消息。 您可以将自定义消息作为第三个参数传递给 `Make` 方法（也适用于 `ctx.Request().Validate()`）：

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "required": "The :attribute field is required.",
}))
```

### 为给定属性指定自定义消息

有时您可能希望仅为特定属性指定自定义错误消息。 您可以使用 "点" 表示法来实现。 首先指定属性名称，然后是规则（也适用于 `ctx.Request().Validate()`）：

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "email.required": "We need to know your email address!",
}))
```

### 指定自定义属性值

Goravel 的许多内置错误消息包含一个 `:attribute` 占位符，该占位符会被替换为正在验证的字段或属性的名称。 要自定义用于替换特定字段的这些占位符的值，您可以将自定义属性数组作为第三个参数传递给 `Make` 方法（也适用于 `ctx.Request().Validate()`）：

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### 验证前格式化数据

您可以在验证数据之前格式化数据以实现更灵活的数据验证，并且可以将格式化数据的方法作为第三个参数传递给 `Make` 方法（也适用于 `ctx.Request().Validate()`）：

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

## 使用验证后的输入

在使用表单请求或手动创建的验证器实例验证传入的请求数据后，如果你仍然想将请求数据绑定到一个 `struct`，有两种方法可以做到这一点：

1. 使用 `Bind` 方法，这将绑定所有传入的数据，包括未经验证的数据：

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator.Bind(&user)

validator, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. 当您使用 request 进行验证时，传入的数据会自动绑定到表单：

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## 处理错误消息

### 获取字段的一个错误消息（随机）

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### 检索字段的所有错误消息

```go
messages := validator.Errors().Get("email")
```

### 检索所有字段的所有错误消息

```go
messages := validator.Errors().All()
```

### 确定字段是否存在错误消息

```go
if validator.Errors().Has("email") {
  //
}
```

## 可用的验证规则

以下是所有可用验证规则及其功能的列表：

| 名称                     | 描述                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `required`             | 检查值是必需的，且不能是零值。 例如，字段类型为`bool`，传递的值为`false`，无法通过验证。                                                                |
| `required_if`          | `required_if:anotherfield,value,...` 如果另一个字段等于任何值，则验证中的字段必须存在且不能为空。                                                |
| `required_unless`      | `required_unless:anotherfield,value,...` 该验证字段必须存在且不能为空，除非另一字段等于任何值。                                               |
| `required_with`        | `required_with:foo,bar,...` 仅当其他指定字段存在时，被验证的字段必须存在且不能为空。                                                           |
| `required_with_all`    | `required_with_all:foo,bar,...` 只有在所有其他指定字段都存在时，正在验证的字段必须存在且不能为空。                                                  |
| `required_without`     | `required_without:foo,bar,...` 仅在未提供其他指定字段时，验证字段必须呈现且不能为空。                                                         |
| `required_without_all` | `required_without_all:foo,bar,...` 仅当所有其他指定字段均不存在时，待验证字段必须存在且不能为空。                                                 |
| `int`                  | 检查值是否为 `intX` `uintX` 类型，并支持大小检查。 例子：`int` `int:2` `int:2,12`。 注意：[使用注意事项](#int)                                   |
| `uint`                 | 检查值是 `uint(uintX)` 类型，`value >= 0`                                                                                 |
| `bool`                 | 检查值是否为布尔字符串（`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false"）。 |
| `string`               | 检查值是字符串类型，并支持大小检查。 例子：`string` `string:2` `string:2,12`                                                            |
| `float`                | 检查值为 `float(floatX)` 类型                                                                                            |
| `slice`                | 检查值是否为切片类型（`[]intX` `[]uintX` `[]byte` `[]string`）                                                                 |
| `in`                   | `in:foo,bar,…` 检查值是否在给定的枚举中                                                                                        |
| `not_in`               | `not_in:foo,bar,…` 检查值是否不在给定的枚举中                                                                                   |
| `starts_with`          | `starts_with:foo` 检查输入字符串值是否以给定子字符串开头                                                                              |
| `ends_with`            | `ends_with:foo` 检查输入字符串值是否以给定的子字符串结尾                                                                               |
| `between`              | `between:min,max` 检查值是否为数字且在给定范围内                                                                                  |
| `max`                  | `max:value` 检查值是否小于或等于给定值（`intX` `uintX` `floatX`）                                                                 |
| `min`                  | `min:value` 检查值是否大于或等于给定值（`intX` `uintX` `floatX`）                                                                 |
| `eq`                   | `eq:value` 检查输入值是否等于给定值                                                                                            |
| `ne`                   | `ne:value` 检查输入值是否不等于给定值                                                                                           |
| `lt`                   | `lt:value` 检查值是否小于给定值（`intX` `uintX` `floatX`）                                                                     |
| `gt`                   | `gt:value` 检查值是否大于给定值(`intX` `uintX` `floatX`)                                                  |
| `len`                  | `len:value` 检查值的长度是否等于给定的大小（`string` `array` `slice` `map`）                                                        |
| `min_len`              | `min_len:value` 检查值的最小长度是否为给定大小（`string` `array` `slice` `map`）                                                    |
| `max_len`              | `max_len:value` 检查值的最大长度是否为给定大小（`string` `array` `slice` `map`）                                                    |
| `email`                | 检查值是否为电子邮件地址字符串                                                                                                    |
| `array`                | 检查值是否为数组，切片类型                                                                                                      |
| `map`                  | 检查值是否为集合类型                                                                                                         |
| `eq_field`             | `eq_field:field` 检查字段值是否等于另一个字段的值                                                                                  |
| `ne_field`             | `ne_field:field` 检查字段值是否不等于另一个字段的值                                                                                 |
| `gt_field`             | `gt_field:field` 检查字段值是否大于另一个字段的值                                                                                  |
| `gte_field`            | `gte_field:field` 检查字段值是否大于或等于另一个字段的值                                                                              |
| `lt_field`             | `lt_field:field` 检查字段值是否小于另一个字段的值                                                                                  |
| `lte_field`            | `lte_field:field` 检查字段值是否小于或等于另一个字段的值                                                                              |
| `file`                 | 验证它是否是一个上传的文件                                                                                                      |
| `image`                | 检查是否上传了图片文件并支持后缀检查                                                                                                 |
| `date`                 | 检查字段值是否为日期字符串                                                                                                      |
| `gt_date`              | `gt_date:value` 检查输入值是否大于给定的日期字符串                                                                                  |
| `lt_date`              | `lt_date:value` 检查输入值是否小于给定的日期字符串                                                                                  |
| `gte_date`             | `gte_date:value` 检查输入值是否大于或等于给定日期字符串                                                                               |
| `lte_date`             | `lte_date:value` 检查输入值是否小于或等于给定的日期字符串                                                                              |
| `alpha`                | 验证值仅包含字母字符                                                                                                         |
| `alpha_num`            | 检查仅包含字母和数字                                                                                                         |
| `alpha_dash`           | 检查仅包含字母、数字、破折号（ - ）和下划线（ _ ）                                                                  |
| `json`                 | 检查值是否为 JSON 字符串                                                                                                    |
| `number`               | 检查值是否为数字字符串 `>= 0`                                                                                                 |
| `full_url`             | 检查值是否为完整的 URL 字符串（必须以 http 或 https 开头）                                                                             |
| `ip`                   | 检查值为 IP（v4 或 v6）字符串                                                                                                |
| `ipv4`                 | 检查值为 IPv4 字符串                                                                                                      |
| `ipv6`                 | 检查值为 IPv6 字符串                                                                                                      |
| `regex`                | 检查值是否可以通过正则表达式验证                                                                                                   |

### 规则使用注意事项

#### int

当使用 `ctx.Request().Validate(rules)` 进行验证时，传入的 `int` 类型数据将被 `json.Unmarshal` 解析为 `float64` 类型，这将导致 int 规则验证失败。

**解决方案**

选项 1：添加 [`validation.PrepareForValidation`](#format-data-before-validation)，在验证数据之前格式化数据；

选项 2：使用 `facades.Validation().Make()` 进行规则验证；

## 自定义验证规则

Goravel 提供了多种有用的验证规则；但是，您可能希望指定一些自己的规则。 注册自定义验证规则的一种方法是使用规则对象。 要生成一个新的规则对象，你可以简单地使用 `make:rule` Artisan 命令。

例如，如果你想验证一个字符串是否为大写，你可以使用这个命令创建一个规则。 Goravel 会将新规则保存在 `app/rules` 目录中。 如果此目录不存在，当您运行 Artisan 命令创建规则时，Goravel 将创建它。

```go
go run . artisan make:rule Uppercase
go run . artisan make:rule user/Uppercase
```

创建规则后，我们需要定义其行为。 规则对象有两个方法：`Passes` 和 `Message`。 `Passes` 方法接收所有数据，包括要验证的数据和验证参数。 它应该返回 `true` 或 `false`，具体取决于属性值是否有效。 `Message` 方法应返回验证失败时应使用的验证错误消息。

```go
package rules

import (
  "strings"

  "github.com/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Signature 规则的名称。
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes 判断验证规则是否通过。
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val.(string)
}

// Message 获取验证错误消息。
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

然后你需要在 `app/providers/validation_service_provider.go` 文件中的 `rules` 方法中注册该规则，并且
该规则可以像其他规则一样使用：

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
    facades.Log().Errorf("添加规则错误：%+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation.Rule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## 可用的验证过滤器

| 名称                             | 描述                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | 将值（string/intX/floatX）转换为`int`类型`v.FilterRule("id", "int")`                                                         |
| `uint/toUint`                  | 将值（string/intX/floatX）转换为`uint`类型 `v.FilterRule("id", "uint")`                                                      |
| `int64/toInt64`                | 将值（string/intX/floatX）转换为 `int64` 类型 `v.FilterRule("id", "int64")`                                                  |
| `float/toFloat`                | 将值（string/intX/floatX）转换为 `float` 类型                                                                                |
| `bool/toBool`                  | 将字符串值转换为布尔值。 （`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false"） |
| `trim/trimSpace`               | 清理字符串两侧的空白字符                                                                                                        |
| `ltrim/trimLeft`               | 清理字符串左侧的空白字符                                                                                                        |
| `rtrim/trimRight`              | 清除字符串右侧的空白字符                                                                                                        |
| `int/integer`                  | 将值（string/intX/floatX）转换为 `int` 类型 `v.FilterRule("id", "int")`                                                      |
| `lower/lowercase`              | 将字符串转换为小写                                                                                                           |
| `upper/uppercase`              | 将字符串转换为大写                                                                                                           |
| `lcFirst/lowerFirst`           | 将字符串的第一个字符转换为小写                                                                                                     |
| `ucFirst/upperFirst`           | 将字符串的第一个字符转换为大写                                                                                                     |
| `ucWord/upperWord`             | 将每个单词的第一个字符转换为大写                                                                                                    |
| `camel/camelCase`              | 将字符串转换为驼峰命名风格                                                                                                       |
| `snake/snakeCase`              | 将字符串转换为蛇形命名风格                                                                                                       |
| `escapeJs/escapeJS`            | 转义 JS 字符串                                                                                                           |
| `escapeHtml/escapeHTML`        | 转义 HTML 字符串                                                                                                         |
| `str2ints/strToInts`           | 将字符串转换为 int 切片 `[]int`                                                                                              |
| `str2time/strToTime`           | 将日期字符串转换为 `time.Time`。                                                                                              |
| `str2arr/str2array/strToArray` | 将字符串转换为字符串切片 `[]string`                                                                                             |

## 自定义过滤器

Goravel提供了多种有用的过滤器，但是，您可能希望指定一些自己的过滤器。 要生成一个新的规则对象，您可以简单地使用 `make:filter` Artisan 命令。 让我们使用这个命令生成一个将字符串转换为整数的规则。 此规则已内置于框架中，我们只是作为示例创建它。 Goravel 将把这个新过滤器保存在 `app/filters` 目录中。 如果此目录不存在，Goravel 将在您运行创建规则的 Artisan 命令时创建它：

```go
go run . artisan make:filter ToInt
// or
go run . artisan make:filter user/ToInt
```

一个过滤器包含两个方法：`Signature ` 和 `Handle` 。 `Signature` 方法设置过滤器的名称。 `Handle` 方法执行特定的过滤逻辑：

```go
package filters

import (
  "strings"

  "github.com/spf13/cast"
  "github.com/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Signature 过滤器的签名。
func (receiver *ToInt) Signature() string {
  return "ToInt"
}

// Handle 定义要应用的过滤器函数。
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast.ToString(val)
  }
}
```

然后你需要在 `app/providers/validation_service_provider.go` 文件中将过滤器注册到 `filters` 方法中，这样就可以像其他过滤器一样使用它了：

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
