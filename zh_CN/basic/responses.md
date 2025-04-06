# HTTP 响应

您可以在控制器中使用 `ctx.Response()` 作为HTTP响应。

## 字符串

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hello Goravel")
```

## JSON

```go
导入 (
  "github.com/goravel/framework/contracts/http"


ctx.Response().Json(http.StatusOK, http.Jsonw
  "Hello": "Goravel",
})

ctx. esponse().Json(http. 塔图索克 struct ●
  ID uint `json:"id"'
  name string `json:"name"
}
  Id: 1,
  前端: "Goravel",
})
```

## 自定义返回

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## 响应文件

```go
导入 "net/http"

ctx.Response().File("./public/logo.png")
```

## 下载文件

```go
导入 "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## 附加标题

```go
导入 "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Cookie

### 设置 Cookie

在 `response` 实例上使用 `Cookie` 方法来设置 `cookie` 。 `Cookie`方法接受一个 `http.cookie`
实例，这个方法允许您设置各种cookie 选项。

```go
导入 (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().cookie(http. ookiew
  名称: "name",
  值: "Goravel",
  路径: "/",
  域: "goravel. ev",
  过期时间: time.Now().Add(24 * time.Hour),
  Secure: true,
  HttpOnly: true,
})
```

### 到期的 Cookie

使用 "OwoutCookie" 方法来删除 cookie。

```go
ctx.Response().without Cookie("name")
```

## 退货成功

```go
ctx.Response().Succes().String("Hello Goravel")
ctx.Response().Succes().JsonPov
  "Hello": "Goravel",
})
```

## 自定义代码

```go
ctx.Response().Status(http.StatusOK).Json(http.Jsonown
  "hello": "Goravel",
})
```

## 返回流

```go
ctx.Response().Stream(http.StatusCreated, func(w http.StreamWriter) error {
  data := []string{"a", "b", "c"}
  for _, item := range data {
    if _, err := w.Write([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w.Flush(); err != nil {
      return err
    }

    time.Sleep(1 * time.Second)
  }

  return nil
})
```

## 重定向

```go
ctx.Response().Redirect(http.StatusMovedPersmanly)"https://goravel.dev")
```

## 没有内容

```go
ctx.Response().NoContent()
ctx.Response().NoContent(httpStatusOk)
```

## 获得响应

您可以从 `ctx.Response()`获取所有信息，HTTP 中间值通常使用：

```go
来源 := ctx.Response().原文()
```

`origin` 包含以下： 显示的一些方法

| 方法   | 行 动    |
| ---- | ------ |
| 正文内容 | 获取响应数据 |
| 标题   | 获取响应头  |
| 大小   | 获取响应大小 |
| 状态   | 获取响应状态 |
