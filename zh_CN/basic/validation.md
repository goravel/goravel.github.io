# 验证

Goravel提供了几种不同的方法来验证您的应用程序收到的数据。 在所有传入的 HTTP 请求中使用
`Validate` 方法是最常见的。 Goravel包含各种方便的验证规则
。

## 验证快速开始

让我们更仔细地看看如何验证表单并将错误消息退回给用户的完整例子。 此
概括将使您对如何使用 Goravel 验证收到的请求数据有一个一般性了解。

### 定义路由

首先，让我们假设我们在我们的 "routes/web.go" 文件中定义了以下路线：

```go
导入 "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

`GET`路由显示一个表单以创建新博客文章。 "POST" 路由存储数据库中的新帖子。

### 创建控制器

接下来，让我们看看一个简单的控制器来处理传入这些路由的请求。 我们现在将 "Store"
方法留空：

```go
package controllers

import (
  "github.com/goravel/framework/contracts/http"
)

type PostController struct {
  // Dependent services
}

func NewPostController() *PostController {
  return &PostController{
    // Inject services
  }
}

func (r *PostController) Create(ctx http.Context) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### 写入验证日志

现在我们准备用逻辑来验证新博客帖子。

```go
func (r *PostController) Store(ctx http.Context) Power
  validator, err := ctx.Request(). alidate(map[string]stringup.
    "title": "requird|max_len:255",
    "body": "requird",
    "代码": "requird|regex:^\d{4,6}$",
  })
}
```

### 嵌套属性

如果传入的 HTTP 请求包含 "嵌套" 字段数据，您可以使用
在 "dot" 语法在验证规则中指定这些字段：

```go
validator, err := ctx.Request().Validate(map[string]stringu.
  "title": "requird|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### 切片验证

如果传入的 HTTP 请求包含 "数组" 字段数据，您可以使用
的 "\*" 语法在验证规则中指定这些字段：

```go
validator, err := ctx.Request().Validate(map[string]string. v.
  "tags.*": "required",
})
```

## 表单请求验证

### 创建表单请求

对于更复杂的验证场景，您可能希望创建一个“表单请求”。 表单请求是自定义请求类
，包含他们自己的验证和授权逻辑。 要创建一个表单请求类，您可以使用
`make:request` Artisan CLI 命令：

```go
去运行。个体操者make:request StorePostRequest
来运行。个体操者make:request user/StorePostRequest
```

生成的表单请求类将放入`app/http/requests`目录。 如果此目录不存在，
将在运行"make:request"命令时创建。 Goravel生成的每个表单请求有六种方法：
`Authorize`, `Rules`。 此外，您可以定制`Filters`, `Messages`, `Attributes` 和 `PreparreForValidation`
方法来进行进一步操作。

`Authorize`方法负责确定当前已验证的用户是否可以执行请求所代表的动作
而`Rules` 方法返回应适用于请求的
数据的验证规则：

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
    // The keys are consistent with the incoming keys.
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

因此，如何评价审定规则？ 您需要做的只是在您的控制器方法上输入请求。 在调用控制器方法之前验证了
传入表单请求， 您不需要使用任何验证日志来勾结您的
控制器：

然后您可以使用 `ValidateRequest` 方法在控制器中验证请求：

```go
func (r *PostController) Store(ctx http.Context) Power
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)

```

Check more rules in the [Available Validation Rules](#available-validation-rules) section.

> 注意，因为“form”传递的值默认是 `string` 类型， 请求中的所有字段都应该是
> `string` 类型，否则请使用 `JSON` 来传递值。

### 授权表单请求

表单请求类也包含 `Authorize` 方法。 在这个方法中，您可以确定认证的
用户是否真的有权更新给定的资源。 例如，您可以确定用户是否真的拥有他们试图更新的
博客评论。 最有可能，您将在此方法中与
交互您的 [授权门和策略] (../security/authorization) ：

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment models.Comment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors.New("no comment is found")
  }

  if !facades.Gate().Allows("update", map[string]any{
    "comment": comment,
  }) {
    return errors.New("can't update comment")
  }

  return nil
}
```

`error` 将会传递到 `ctx.Request().ValidateRequest` 的返回值。

### 过滤输入数据

您可以通过改进表单请求的 `Filters` 方法来格式化输入数据。 这个方法应该返回一个
`attribute/filter` 的地图：

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string
  return[string]string_
    "name ": "trim",
  }
}
```

### 自定义错误消息

您可以通过覆盖 `Messages` 方法自定义表单请求使用的错误消息。 此方法应该为
返回一个属性/规则对数组及其对应的错误信息：

```go
func (r *StorePostRequest) Messages() map[string]string
[string]return map [string] string_
    "title" equired": "A title is required",
    "body.required": "需要一条消息",
  }
}
```

### 自定义验证属性

Goravel的许多内置验证规则错误消息都包含 `:attribute` 占位符。 如果您希望您的验证消息的
`:attribute` 占位符被替换为自定义属性名称， 您可以通过覆盖 `Attributes` 方法指定
自定义名称。 此方法应返回属性/名称对数组：

```go
func (r *StorePostRequest) Attributes() map[string]string Power
  return Map[string]string_
    "email": "email地址",
  }
}
```

### 准备输入验证

如果您需要在应用验证规则之前准备或清理请求中的任何数据，您可以使用
`PrereForValidation` 方法：

```go
func (r *StorePostRequest) PrepareForvalidation(ctx http.Context, data validation.Data) errorn
  如果名字，存在:= data。 et("name"); existe power
    return data.Set("name", name.(string)+"1")

  return nil
}
```

## 手动创建验证程序

如果您不想在请求中使用 `Validate` 方法，您可以手动使用
`facades.Validator` 创建一个验证实例。 面部的`Make`方法生成一个新的验证实例：

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
    // Return fail
  }

  var user models.User
  err := validator.Bind(&user)
  ...
}
```

传递给`Make`方法的第一个参数是正在验证的数据，它可以是 `map[string]any ` 或 `struct`。
第二个参数是要应用于数据的验证规则数组。

### 自定义错误消息

如果需要，您可以提供验证器实例使用的自定义错误消息，而不是默认错误
消息由Goravel提供。 You may pass the custom messages as the third argument to the `Make` method (also
applicable to `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]stringpoor
  "required": "the :attribute 字段是必须的。",
}))
```

### 为给定属性指定一个自定义消息

有时您可能只想为特定属性指定一个自定义错误消息。 您可以使用 "dot"
符号这样做。 首先指定属性的名称, 然后是规则 (也适用于`ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]stringpoor
  "email.required": "我们需要知道您的电子邮件地址!",
}))
```

### 指定自定义属性值

Goravel的许多内置错误消息包含一个 `:attribute` 占位符，它被替换为
字段的名称或正在验证的属性。 为特定字段自定义替换这些占位符的值， 您的
可能会将数组自定义属性作为第三个参数传递到 `Make` 方法(也适用于
`ctx)。 验证()`：

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]stringpoor
  "email": "email address",
}))
```

### 验证前格式化数据

您可以在验证数据之前格式化数据以获得更灵活的数据验证， 并且你可以将
格式化数据作为第三个参数传递到 `Make` 方法(也适用于`ctx)。 验证()`：

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

## 使用已验证的输入

使用表单请求或手动创建验证器实例验证收到的请求数据后， 您仍然想要
将请求数据绑定到 "结构"，有两种方法来这样做：

1. 使用 `Bind` 方法，这将绑定所有传入的数据，包括未经验证的数据：

```go
验证器，err := ctx.Request().Validate(rules)
var user models.User
err := validator。 ind(&user)

validator, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. 当您使用验证请求时，传入的数据会自动绑定到表单上：

```go
var storePostRepostRequest
错误，err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## 使用错误消息工作

### 正在获取一个字段错误消息 (Random)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### 正在获取一个字段的所有错误消息

```go
message := validator.Errors().Get("email")
```

### 获取所有字段的所有错误消息

```go
message := validator.Errors().All()
```

### 是否为字段发现错误消息

```go
if validator.Errors().Has("email") {
  //
}
```

## 可用的验证规则

下面是所有可用的验证规则及其功能列表：

| 名称                    | 描述                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requird`             | 检查值是必需的，不能是零值。 例如，字段类型是 `bool`，传递值是 `false`，它不能传递验证。                                                                                              |
| `requird_if`          | `requird_if:anotherfield,value,...` 如果另一个字段等于任何值，则验证中的字段必须存在而不是空。                                                                                 |
| `requird_unless`      | `required_unless:anotherfield,value,...` 正在验证中的字段必须存在而不是空，除非对方字段等于任何值。                                                                            |
| `requird_with`        | `requird_with:foo,bar,...`                                                                                                                        |
| `requird_with_all`    | `required_with_all:foo,bar,...`                                                                                                                   |
| `requird_without out` | `requird_with:foo,bar,...`                                                                                                                        |
| `requird_without_all` | `requird_with_all:foo,bar,...`                                                                                                                    |
| `int`                 | 检查值是 `intX` `uintX` 类型，支持大小检查。 eg: `int` `int:2` `int:2,12`. 注意：[使用规则的点](#int)                                    |
| `uint`                | 选中值是 `uint(uintX)` 类型，`value >= 0`                                                                                                                |
| `bool`                | 检查值是布尔值(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false"). |
| `string`              | 检查值是字符串类型，支持大小检查。 eg:`string` `string:2` `string:2,12`                                                                            |
| `float`               | 检查值为 `float(floatX)` 类型                                                                                                                           |
| `slice`               | 检查切片类型(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                 |
| `in`                  | `in:foo,bar,…`检查值是否在给定的枚举中                                                                                                                        |
| `not_in`              | `not_in:foo,bar,…` 检查是否在给定的枚举中                                                                                                                    |
| `starts_with`         | `starts_with:foo`检查输入的字符串值是否以给定的子字符串开始                                                                                                            |
| `ends_with`           | `ends_with:foo`检查输入的字符串值是否以给定的子字符串结束                                                                                                              |
| \`介于'                 | `介于:min,max` 之间检查值是一个数字并且在给定的范围内                                                                                                                  |
| `max`                 | `max:value` 检查值小于或等于给定值(`intX` `uintX` `floatX`)                                                                               |
| `min`                 | `min:value` 检查值大于或等于给定值(`intX` `uintX` `floatX`)                                                                               |
| `eq`                  | `eq:value` 检查输入值等于给定值                                                                                                                             |
| `ne`                  | `ne:value` 检查输入值与给定值不等于                                                                                                                           |
| `lt`                  | `lt:value` 检查值小于给定值(`intX` `uintX` `floatX`)                                                                                   |
| `gt`                  | `gt:value` 检查值大于给定值(`intX` `uintX` `floatX`)                                                                                   |
| `len`                 | `len:value` 检查值长度等于给定大小(`string` `array` `slice` `map`)                                                                        |
| `min_len`             | `min_len:value` 检查给定的大小(`string``array`slice`map`) 最小长度                                                                        |
| `max_len`             | `max_len:value` 检查给定的大小(`string` `array` `slice` `map`)                                                                        |
| `email`               | 检查电子邮件地址字符串                                                                                                                                       |
| `array`               | 检查值为数组，切片类型                                                                                                                                       |
| `map`                 | 检查值是一个 MAP 类型                                                                                                                                     |
| `eq_field`            | `eq_field:field` 检查字段值等于另一个字段的值                                                                                                                   |
| `ne_field`            | `ne_field:field` 请检查字段值不等于另一个字段的值                                                                                                                 |
| `gt_field`            | `gt_field:field` 请检查字段值是否大于另一个字段的值                                                                                                                |
| `gte_field`           | `gte_field:field`检查字段值大于或等于另一个字段的值                                                                                                                |
| `lt_field`            | `lt_field:field` 请检查字段值是否小于另一个字段的值                                                                                                                |
| `lte_field`           | `lte_field:field`检查字段值是否小于或等于另一个字段的值                                                                                                              |
| `file`                | 验证它是否是已上传的文件                                                                                                                                      |
| `image`               | 检查它是否是上传的图像文件，并支持后缀检查                                                                                                                             |
| `date`                | 检查字段值为日期字符串                                                                                                                                       |
| `gt_date`             | `gt_date:value` 请检查输入值是否大于给定的日期字符串                                                                                                                |
| `lt_date`             | `lt_date:value` 请检查输入值是否小于给定的日期字符串                                                                                                                |
| `gte_date`            | `gte_date:value` 检查输入值大于或等于给定的日期字符串                                                                                                               |
| `lte_date`            | `lte_date:value` 检查输入值小于或等于给定的日期字符串                                                                                                               |
| `alpha`               | 验证该值只包含字母字符                                                                                                                                       |
| `alpha_num`           | 检查只包含字母、数字                                                                                                                                        |
| `alpha_dash`          | 选中只包含字母、 数字、 破折号 ( - ), 下划线 ( _ )                                                      |
| `json`                | 检查值为 JSON 字符串                                                                                                                                     |
| `数字`                  | 检查值为数字字符串 `>= 0`                                                                                                                                  |
| `full_url`            | 检查值是完整的 URL 字符串(必须以 http,https 开头)                                                                                             |
| `ip`                  | 检查值为 IP(v4 或 v6) 字符串                                                                                                           |
| `ipv4`                | 检查值为 IPv4 字符串                                                                                                                                     |
| `ipv6`                | 检查值为 IPv6 字符串                                                                                                                                     |
| `regex`               | 检查值是否能够通过常规验证                                                                                                                                     |

### 使用规则的点

#### 整数

When using `ctx.Request().Validate(rules)` for validation, the incoming `int` type data will be parsed by
`json.Unmarshal` into `float64` type, which will cause the int rule validation to fail.

**解决方案**

备选案文1：增加[`validation.PreparreForValidation`](#format-data-before-validation)，在验证
数据之前格式化数据；

备选案文2：使用`facades.Validation().Make()`进行规则审定；

## 自定义验证规则

Goravel提供了各种有用的验证规则；但是，你可能想要指定你自己的一些规则。 一种
注册自定义验证规则的方法正在使用规则对象。 要生成一个新的规则对象，您可以简单地使用
`make:rule` Artisan 命令。

例如，如果你想要验证字符串是大写，你可以使用此命令创建规则。 Goravel will
then save this new rule in the `app/rules` directory. If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
去运行。个体操者make:rule Uppercase
来运行个体操者make:rule user/Uppercase
```

创建规则后，我们需要定义它的行为。 规则对象有两种方法：`Passes` 和 `Message` 。
传递方法接收所有数据，包括要验证的数据和验证参数。 它应该返回
`true` 或 `false` ，这取决于属性值是否有效。 `Message`方法应该返回验证错误
信息，当验证失败时应该使用该信息。

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

## 可用的验证过滤器

| 名称                             | 描述                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | 转换值 (字符串/intX/floatX) 到 `int` 类型 `v.FilterRule("id", "int")`                                                        |
| `uint/toUint`                  | 转换值 (字符串/intX/floatX) 到 `uint` 类型 `v.FilterRule("id", "uint")`                                                      |
| `int64/toInt64`                | 转换值 (字符串/intX/floatX) 到 `int64` 类型 `v.FilterRule("id", "int64")`                                                    |
| `float/toFloat`                | 转换值 (字符串/intX/floatX) 到 `float` 类型                                                                                  |
| `bool/toBool`                  | 将字符串值转换为布尔值。 (`true`: "1", "on", "yes", "true", "false": "0", "off", "no", "false") |
| `trim/trimSpace`               | 清理字符串两侧的空白字符                                                                                                                           |
| `ltrim/trimLeft`               | 清理字符串左侧的空白字符                                                                                                                           |
| `rtrim/trimRight`              | 清理字符串右侧的空白字符                                                                                                                           |
| `int/整数`                       | 转换值 (字符串/intX/floatX) 到 `int` 类型 `v.FilterRule("id", "int")`                                                        |
| `小写/小写`                        | 将字符串转换为小写                                                                                                                              |
| `uper/upercase`                | 将字符串转换为大写                                                                                                                              |
| `lcFirst/lowerFirst`           | 将字符串的第一个字符转换为小写                                                                                                                        |
| `ucFirst/upperFirst`           | 将字符串的第一个字符转换为大写。                                                                                                                       |
| `ucWord/uperWord`              | 将每个单词的第一个字符转换为大写。                                                                                                                      |
| `camel/camelCase`              | 将字符串转换为骆驼命名风格                                                                                                                          |
| `snake/snakeCase`              | 将字符串转换为命名样式                                                                                                                            |
| `escapeJs/escapeJS`            | 转义JS 字符串。                                                                                                                              |
| `escapeHtml/escapeHTML`        | 转义HTML字符串。                                                                                                                             |
| `str2ints/strToInts`           | 将字符串转换为 int slice `[]int`                                                                                                              |
| `str2time/strToTime`           | 将日期字符串转换为 `time.Time`。                                                                                                                 |
| `str2arr/str2array/strToArray` | 将字符串转换为字符串`[]字符串`                                                                                                                      |

## 自定义过滤器

Goravel提供了各种有用的过滤器，但你可能希望指定自己的过滤器。 要生成新规则
对象，您可以简单地使用 `make:filter` Artisan 命令。 让我们使用这个命令生成一个将
字符串转换为整数的规则。 这一规则已经被纳入框架，我们只是树立了一个榜样。 Goravel将在 `app/filters` 目录中保存
此新过滤器。 如果这个目录不存在，Goravel将在你运行
时创建它的Artisan 命令来创建规则：

```go
开始运行。手工操作：过滤器 ToInt
// 或
运行。手工操作：筛选用户/ToInt。
```

一个过滤器包含两个方法: `签名` 和 `Handle` 。 "签名" 方法设置过滤器的名称。
`Handle` 方法执行特定的过滤逻辑：

```go
软件包过滤器

导入 (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation”(
)

类型 ToIntt structt power
}

// 签名过滤器的签名。
func (receiver *Toint) Signature() string Windows
  return "ToInt"
}

// Handle 定义了要应用的过滤函数。
func (receiver *Toint) Handle() any vol.
  return func (val any) int Power
    return case oString(val)
  }
}
```

然后你需要在 `app/providers/validation_service_provider.go` 文件中注册过滤器到 `filters` 方法，
并且过滤器可以像其他方法一样使用：

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
