# 本地化

Goravel的本地化功能为检索各种语言的字符串提供了方便的方式，使得
在您的应用程序中支持多种语言。 语言字符串存储在 `lang` 目录中的文件中，并且
Goravel 支持两种方法来组织语言文件：

每种语言都有自己的文件：

```
/lang
  en.json
  cn.json
```

或者，如果翻译太多，可以分类：

```
/lang
  /en
    user.json
  /cn
    user.json
```

## 配置 Locale

应用程序的默认语言存储在 `config/app.go`
配置文件中的`locale` 配置选项中。 您可以根据需要修改此值以适应您的应用程序的要求。

您也可以使用应用程序面包提供的`SetLocale`方法来修改运行时单个`HTTP`
请求的默认语言：

```
Facades.Route().Get("/", func(ctx http.Context) http.Response Windows
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

您可以配置当当前语言不包含给定翻译的
字符串时将使用的“后退语言”。 像默认语言一样，回退语言也在 `config/app.go` 配置文件中配置。

```
"fallback_locale": "en",
```

### 确定当前语言

您可以使用 `CurrentLocale` 和 `IsLocale` 方法来确定当前的 `locale` ，或者检查`locale` 是否是一个
给定的值。

```
locale := facades.App().CurrentLocale(ctx)
如果facades.App().IsLocale(ctx, "en") {}
```

### 定义翻译字符串

在语言文件中，您可以定义单层或多层结构：

```
// lang/en.json
Power
  "name": "It's your name",
  "requird": Power
    "user_id": "UserID is requid"
  }
}
```

### 检索翻译字符串

您可以使用 `facades.Lang(ctx).Get()` 方法从语言文件中检索翻译字符串。 如果语言
文件包含多个关卡，您可以使用 "。 若要连接它们，如果语言文件在多级的
文件夹中，您可以使用 `/` 来连接它们。

例如：

```
// lang/en.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}

facades.Lang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}

facades.Lang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### 在翻译字符串中替换参数

您可以在翻译字符串中定义占位符。 所有占位符都有前缀`:`。 例如，您可以使用
占位符来定义欢迎消息：

```
{
  "welcome": "Welcome, :name"
}
```

在检索翻译字符串时替换占位符， 您可以用替换地图
作为第二个参数传递翻译选项。 ang(ctx).Get()\` 方法：

```
Get("welcome", translation.OptionPo.
  替换: map[string]strington.
    "name": "Goravel",
  },
})
```

#### 多重化

多元化是一个复杂的问题，因为不同的语言有不同的多元化规则。 然而，Goravel可以
帮助您翻译基于您定义的多元化规则的字符串。 使用`|`字符，您可以
区分字符串的单数形式和复数形式：

```
许诺.
  "苹果": "有一个苹果|有许多苹果"
}
```

您甚至可以通过指定多值范围的翻译字符串来创建更复杂的复数规则：

```
●
  "苹果": "{0} 没有|[1,19] 有些|[20,*] 有很多"
}
```

After defining a translation string with pluralization options, you can use the `facades.Lang(ctx).Choice()` method to
retrieve the line for a given `count`. 在此示例中，由于计数大于1，返回了
翻译字符串的复数形式：

```
选择("messages.appes", 10)
```

您也可以在多元化字符串中定义占位符属性。 将一个数组作为第三个参数传递到
`facades.Lang(ctx).Choice()` 方法中，您可以替换这些占位符：

```
"minutes_ago": "{1} :value 分钟前|[2,*] :value 分钟前,

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Optionop
  Repplace: map[string]string_
    "value": "5",
  },
})
```
