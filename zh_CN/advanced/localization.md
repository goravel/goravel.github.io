# 本地化

Goravel的本地化功能提供了一种方便的方式来检索各种语言的字符串，使得在应用程序中支持多种语言变得容易。 语言字符串存储在`lang`目录的文件中，Goravel支持两种组织语言文件的方式：

每种语言有自己的文件：

```
/lang
  en.json
  cn.json
```

或者，当有太多翻译时，可以进行分类：

```
/lang
  /en
    user.json
  /cn
    user.json
```

## 配置区域设置

应用程序的默认语言存储在`config/app.go`配置文件中的`locale`配置选项中。 您可以根据需要修改此值以适应应用程序的要求。

您还可以使用App Facade提供的`SetLocale`方法在运行时为单个`HTTP`请求修改默认语言：

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

您可以配置一个"回退语言环境"，当当前语言不包含给定的翻译字符串时，将使用该环境。 与默认语言一样，回退语言也在`config/app.go`配置文件中配置。

```
"fallback_locale": "en",
```

### 确定当前语言环境

您可以使用`CurrentLocale`和`IsLocale`方法来确定当前的`locale`或检查`locale`是否为给定值。

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "en") {}
```

### 定义翻译字符串

在语言文件中，您可以定义单级或多级结构：

```
// lang/en.json
{
  "name": "这是你的名字",
  "required": {
    "user_id": "需要UserID"
  }
}
```

### 获取翻译字符串

您可以使用 `facades.Lang(ctx).Get()` 方法从语言文件中获取翻译字符串。 如果语言文件包含多个层级，您可以使用 `.` 连接它们，如果语言文件在多层文件夹中，您可以使用 `/` 连接它们。

例如：

```
// lang/en.json
{
  "name": "这是你的名字",
  "required": {
    "user_id": "需要UserID"
  }
}

facades.Lang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user.json
{
  "name": "这是你的名字",
  "required": {
    "user_id": "需要UserID"
  }
}

facades.Lang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### 替换翻译字符串中的参数

您可以在翻译字符串中定义占位符。 所有占位符都以 `:` 为前缀。 例如，您可以使用占位符来定义欢迎消息：

```
{
  "welcome": "欢迎，:name"
}
```

要在检索翻译字符串时替换占位符，您可以将带有替换映射的翻译选项作为第二个参数传递给 `facades.Lang(ctx).Get()` 方法：

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Replace: map[string]string{
    "name": "Goravel",
  },
})
```

#### 复数化

复数化是一个复杂的问题，因为不同的语言有不同的复数规则。 然而，Goravel 可以帮助您根据您定义的复数规则翻译字符串。 通过使用 `|` 字符，您可以区分字符串的单数和复数形式：

```
{
  "apples": "有一个苹果|有很多苹果"
}
```

您甚至可以通过为多个值范围指定翻译字符串来创建更复杂的复数规则：

```
{
  "apples": "{0} 没有苹果|[1,19] 有一些苹果|[20,*] 有很多苹果"
}
```

定义带有复数选项的翻译字符串后，您可以使用 `facades.Lang(ctx).Choice()` 方法来
根据给定的 `count` 获取对应的行。 在这个例子中，因为计数大于1，所以返回了翻译字符串的复数形式：

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

您还可以在复数化字符串中定义占位符属性。 通过将数组作为第三个参数传递给 `facades.Lang(ctx).Choice()` 方法，您可以替换这些占位符：

```
"minutes_ago": "{1} :value 分钟前|[2,*] :value 分钟前",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Replace: map[string]string{
    "value": "5",
  },
})
```
