# Локализация

Goravel's localization features provide a convenient way to retrieve strings in various languages, making it easy to
support multiple languages in your application. Языковые строки хранятся в файлах в каталоге `lang`, и
Goravel поддерживает два способа организации языковых файлов:

Каждый язык имеет свой файл:

```
/lang
  en.json
  cn.json
```

Или, когда есть слишком много переводов, они могут быть классифицированы:

```
/lang
  /ru
    user.json
  /cn
    user.json
```

## Настройка языка

Язык приложения по умолчанию хранится в опции `locale` в файле конфигурации `config/app.go`
. Вы можете изменить это значение в соответствии с требованиями вашего приложения.

Вы также можете использовать метод `SetLocale`, предоставленный Фасадом приложения, для изменения языка по умолчанию для одного `HTTP`
запроса во время запуска:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "ru")

    return ctx.Response()
})
```

Вы можете настроить "резервную локаль", которая будет использоваться, если текущий язык не содержит данной строки
. Как и язык по умолчанию, резервный язык также настроен в конфигурационном файле `config/app.go`.

```
"fallback_locale": "en",
```

### Определение текущего языка

Вы можете использовать методы `CurrentLocale` и `IsLocale` для определения текущего `locale` или проверьте, является ли `locale`
данным значением.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "ru") {}
```

### Определение строк перевода

В языковых файлах можно определить одноуровневые или многоуровневые структуры:

```
// lang/en.json
{
  "name": "Это ваше имя",
  "required": {
    "user_id": "UserID is required"
  }
}
```

### Получение строк перевода

Вы можете использовать метод `facades.Lang(ctx).Get()` для извлечения строк перевода из языковых файлов. Если файл
содержит несколько уровней, вы можете использовать `. для подключения к ним, и если языковой файл находится на нескольких уровнях папок
, вы можете использовать `/\` для их подключения.

Например:

```
// lang/en. son
{
  "имя": "Это ваше имя",
  "required": {
    "user_id": "UserID требуется"
  }
}

фасады. ang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/ru/role/user. son
{
  "name": "Это ваше имя",
  "required": {
    "user_id": "Требуется идентификатор"
  }
}

фасадов. ang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Замена параметров в строках перевода

Заполнители можно определить в строках перевода. Все заполнители имеют префикс `:`. Например, вы можете использовать плейсхолдер
для определения приветствия:

```
{
  "добро пожаловать": "Добро пожаловать, :name"
}
```

To replace placeholders when retrieving a translation string, you can pass a translation option with the replacement map
as the second parameter to the `facades.Lang(ctx).Get()` method:

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Заменить: map[string]string{
    "name": "Goravel",
  },
})
```

#### Плюрализация

Плюрализация - это сложная проблема, поскольку на различных языках существуют различные правила плюрализации. However, Goravel can
help you translate strings based on the pluralization rules you define. By using the `|` character, you can
differentiate between the singular and plural forms of a string:

```
{
  "яблоки": "Есть один яблок|Есть много яблоков"
}
```

Вы даже можете создать более сложные правила плюрализации, указав строки перевода для нескольких диапазонов значений:

```
{
  "Apples ": "{0} Нет там|[1,19] Есть некоторые|[20,*] Есть многие»
}
```

После определения строки перевода с параметрами плюрализации, вы можете использовать метод `facades.Lang(ctx).Choice()` для
получить строку для данного числа `count`. In this example, because the count is greater than 1, the plural form of the
translation string is returned:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

В строках множественного числа вы также можете определить атрибуты плейсхолдера. Передавая массив в качестве третьего параметра методу
`facades.Lang(ctx).Choice()` вы можете заменить следующие заполнители:

```
"minutes_ago": "{1} :value minute ago|[2,*] :value minutes ago",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Заменить: map[string]string{
    "value": "5",
  },
})
```
