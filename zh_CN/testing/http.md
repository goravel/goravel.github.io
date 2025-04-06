# HTTP 测试

当构建网页应用程序时，您常常需要测试您的 HTTP 请求是否从开始到完成正常工作。
Goravel的测试工具使这个直截了当——你可以模拟请求和验证响应，而无需设置
复杂的测试环境。

## 提出请求

测试Goravel中的 HTTP 端点使用简单的模式。 从你的 `TestCase`中的 `Http` 方法开始, 这个方法需要
一个 `*testing.T` 参数来进行断言。 这会给您一个请求对象 (`framework/contracts/testing.TestRequest`)
来处理所有常见的 HTTP 动词，如`Get`、`Post`和`Put`。

这些方法不是进行真正的 HTTP 调用，而是在内部模拟您的应用程序的请求周期。 每个请求
返回一个响应对象(`framework/contracts/testing.TestResponse`)，并返回检查结果的方法。

下面是一个基本示例：

```go
func (s *ExampleTestSuite) TestIndex() Power
 响应, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### 自定义请求标题

您可以自定义请求头使用单个标题的 "Wouheader" 或多个标题的 "Wouheaders" ：

```go
func (s *exampleTestSuite) TestIndex() Power
    // single header
    response, err := s.Http(s.T())。 ithheader("X-Custom-Header", "Value").Get("/users/1")
    
    // 多个headers
    响应, err := s. ttp(s.T())。 ithHeaders(map[string]string_
        "X-Custom-Header": "Value",
        "接受": "application/json",
    }). et("/users/1")
}
```

### Cookie

您可以使用 "WithCookie" 或 "WithCookies" 方法在提出请求之前设置 cookies 值。

```go
func (s *ExampleTestSuite) TestIndex() Power
 response, err := s.Http(s.T().WithCookie("name", "krishan"). et("/users/1")

 // 或多个Headers
 响应，err := s。 ttp(s.T())。 ithHeader(map[string]string_
        "name": "krishan",
        "lang": "en",
    }). et("/users/1")
}
```

### 取消会话

您可以使用 "WiSession" 方法设置数据到会话中：

```go
func (s *ExampleTestSuite) TestIndex() Power
 响应, err := s.Http(s.T().Withessession(map[string]any{"role": "admin"}).Get("/users/1")

```

### 调试响应

在提出请求后，您可以使用 `Session`、`Headers`、`Content`、`Cookies` 或 `Json` 方法来检查从
请求返回的数据。

```go
func (s *ExampleTestSuite) TestIndex() Power
 响应, err := s.Http(s.T().Withessession(map[string]任何{"role": "admin"}). et("/users/1")
 
 contents, err := response.Content()
 
 cookies := response. ookies()
 
 headers := response.Headers()
 
 json, err := response。 Son() // 响应机构解析为json(map[string]any)
 
 session, err := response。 ession() // 返回当前请求会话中存储的所有值
}
```

## 建筑体

方法如`Post`、`Put`、`Delete`等。 Goravel接受`io.Reader`作为第二个参数。 为了简化建筑物
有效载荷，框架提供了构建请求实体的实用方法。

```go
import "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody().SetField("name", "krishan")
    
    body, err := builder.Build()

    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## 测试 Json APIs

Goravel提供了几个助手来有效测试 JSON API 反应。 它试图将响应体拆分为
一个去地图[string]。 如果取消调用失败，相关的断言也将失败。

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": true,
        })
}
```

若要直接访问未marshalled JSON，请使用 `TestResponse` 上的 `Json` 方法。 这让您可以检查响应体中的单个
元素。

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
`AssertJson`方法检查响应是否包含所有指定值，即使响应包含了
附加字段。 除非您使用 `AssertExactJson` ，否则它不需要精确匹配。
:::

### 声明精彩的 JSON 匹配

如果您需要验证响应是否与您所期望的 JSON 完全匹配(没有额外的或缺失的字段)，请使用
`AssertExactJson` 方法。

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Goravel很容易对JSON的反应进行流畅的断言。 使用 `AssertFluentJson` 方法，你可以通过
一个关闭提供一个 `framework/contracts/testing.AssertableJSON` 的实例。 此实例允许您在您的请求返回的 JSON 响应中检查
特定值或条件。

例如，您可以使用 `Where ` 方法来断言在JSON 响应中存在某个特定值。 和
`Missing` 方法确保属性不存在。

```go
导入 contractstetting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex()
    response, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201)。
  AssertFluentJson(func (json contractstetting.AssertableJSON) power
   json.Where("id", float64(1)))。
    在哪里("name", "bowen").
    Where Not("lang", "en").
    缺失("密码")
        })
}
```

### 描述属性存在/不存在

如果您想要检查属性是否存在或丢失，Goravel使用`Has`和`Missing`
方法使其变得简单。

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstetting.AssertableJSON) w
        json.Has(“username”).
            Missing("password")
})
```

您还可以同时使用 `HasAll` 和 `MissingAll` 来断言是否存在多个属性。

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstetting.AssertableJSON) w
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

如果您只需要检查列表中至少一个属性的存在，请使用 `HasAny` 方法。

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstetting.AssertableJSON) w
  json.HasAny[]string{"username", "email"})
})
```

### 调整JSON集合描述

当响应包含一个命名密钥下的对象集合时，您可以使用各种方法来确定其结构
和内容。

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http.Response {
    items := []Item{
        {ID: 1},
        {ID: 2},
    }
    return ctx.Response().Json(200, map[string]{
  "items": items,
    })
}
```

您可以使用 `Count` 方法来验证收藏中的元素数量。 要确定第一个
元素的属性，请使用 `First` 方法，提供一个实例`AssertableJson`。 Similarly, the `Each` method allows you
to iterate over all elements and assert their properties individually. Alternatively, the `HasWithScope` method combines
the functionality of `First` and `Count`, allowing you to assert both the first element and its contents while providing
an `AssertableJson` instance for scoped assertions.

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

## 可用的声明

### 反应陈述

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

### 声明接受

确认响应有一个 `202 接受` HTTP 状态码：

```go
响应.AssertAccepted()
```

### AssertBadRequest

确认响应有一个 `400 Bad Request` HTTP 状态码：

```go
回复.AssertBadRequest()
```

### 声明冲突

确认响应有一个 `409 Conflict` HTTP 状态代码：

```go
回复.AssertConflict()
```

### AssertCookie

确认响应包含指定名称和值的 cookie：

```go
响应.AssertCookie("name", "值")
```

### 自述Cookie已过期

确认指定的 cookie 已过期：

```go
响应.AssertCookieExpired("name")
```

### AssertCookieMissing

确认响应不包含指定名称的 cookie ：

```go
响应.AssertCookieMissing("name")
```

### AssertCookieNot过期的

确认指定的 cookie 尚未过期：

```go
响应.AssertCookieNotExpired("name")
```

### 描述创建

确认响应有一个 `201 创建` HTTP 状态码：

```go
回复.AssertCreated()
```

### AssertDontSee

确认响应不包含指定的值。 The second parameter (optional) determines whether to
escape special characters in the values before checking. 如果没有提供，它将默认为真。

```go
响应.AssertDontSee([]string{"<div>"}, false) // 不要逃脱特殊字符
```

### AssertExactJson

确认JSON响应完全匹配所提供的 "地图[string]任何"：

```go
回复.AssertExactJson(地图[string]任何{"创建": true})
```

### AssertFluentJson

使用流体接口来破坏JSON响应：

```go
Import contractstetting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(funfunc(json contractstesting.AssertableJSON) ow.
     json.Where("created", true)
})
```

### 断言

确认响应有一个 `403 Forbiden` HTTP 状态码：

```go
回复.AssertForbiden()
```

### 已发现

确认响应有一个 `302 Found` HTTP 状态码：

```go
响应.AssertFound()
```

### AssertGone

确认响应有一个 `410 Gone` HTTP 状态码：

```go
response.AssertGone()
```

### 描述标题

确认响应包含给定值的指定头部：

```go
response.AssertHeader("Content-Type", "application/json")
```

### 断言头丢失

确认响应不包含指定的标题：

```go
回复。AssertHeaderMissing("X-自定义头")
```

### AssertInternalServer错误

确认响应有一个 `500 Internal Server` 错误的 HTTP 状态代码：

```go
response.AssertInternalServerError()
```

### AssertJson

确认应对措施包含所提供的碎片：

```go
响应.AssertJson(地图[string]任何{"创建": true})
```

### AssertJson缺失的

确认在响应JSON中缺少指定的键或值：

```go
响应.AssertJsonMissing(地图[string]任何{"创建": false})
```

### 描述方法不允许

确认响应有一个 `405 方法不允许` HTTP 状态码：

```go
回复.AssertMethodNotalled()
```

### 声明永久移动

确认响应有一个 \`301 移动永久' HTTP 状态码：

```go
回复.AssertMovedPermanently()
```

### AssertNoContent

确认响应有一个 `204 No Content` HTTP 状态码：

```go
response.AssertNoContent()
```

### AssertNotAcceptable

确认响应有 `406 不接受` HTTP 状态码：

```go
回复.AssertNotAcceptable()
```

### 断言未发现

确认响应有一个 `404 找不到` HTTP 状态码：

```go
响应.AssertNotFound()
```

### 声明已修改

确认响应有一个 `304 Not Modified` HTTP 状态码：

```go
回复.AssertNotModified()
```

### 声明确认

确认响应有一个 `200 OK` HTTP 状态码：

```go
response.AssertOk()
```

### 描述部分内容

确认响应有一个 `206 Partial Content` HTTP 状态码：

```go
回复.AssertPartialContent()
```

### 需要自述支付

确认响应有一个 `402 付款要求` HTTP 状态码：

```go
响应.AssertPaymentRequireed()
```

### AssertRequest超时

确认响应有一个 `408 Request Timeout` HTTP 状态码：

```go
响应.AssertRequestTimeout()
```

### 断言

确认响应包含指定的值。 第二个参数 (可选) 决定在检查前是否跳过
特殊字符。 如果没有提供，则默认为`true`。

```go
回复.AssertSee([]string{"<div>"}, false) // 不要脱离特殊字符
```

### AssertSeeInOrder

Asserts that the response contains the specified values in the given order. The second parameter (optional) determines
whether to escape special characters in the values before checking. 如果没有提供，则默认为`true`。

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
