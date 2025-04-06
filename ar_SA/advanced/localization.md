# التعريب

توفر ميزات توطين Goravel's طريقة مناسبة لاسترداد السلاسل بلغات مختلفة، مما يجعل من السهل على
دعم لغات متعددة في تطبيقك. يتم تخزين سلاسل اللغات في ملفات في دليل 'lang'، و
Goravel يدعم طريقتين لتنظيم ملفات اللغة:

لكل لغة ملفها الخاص:

```
/lang
  en.json
  cn.json
```

أو عندما يكون هناك الكثير من الترجمات، يمكن تصنيفها:

```
/lang
  /en
    user.json
  /cn
    user.json
```

## تكوين الإعدادات المحلية

يتم تخزين اللغة الافتراضية للتطبيق في خيار التكوين 'locale' في ملف التكوين 'config/app.go'
. يمكنك تعديل هذه القيمة حسب الحاجة لتتناسب مع متطلبات طلبك.

You can also use the `SetLocale` method provided by the App Facade to modify the default language for a single `HTTP`
request at runtime:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(tx, "en")

    return ctx.Response()
})
```

يمكنك تكوين "المحلية الاحتياطية" التي سيتم استخدامها عندما لا تحتوي اللغة الحالية على سلسلة الترجمة
المحددة. مثل اللغة الافتراضية، يتم أيضا تكوين لغة الرجوع في ملف تكوين \`config/app.go'.

```
"fallback_locale": "en",
```

### تحديد اللغة الحالية

يمكنك استخدام طريقتي 'currentLocale' و 'IsLocale' لتحديد 'locale' الحالية أو التحقق مما إذا كانت 'locale' قيمة معطاة لـ
.

```
المحلية: = facades.App().currentLocale(ctx)
if facades.App().IsLocale(ctx, "en") {}
```

### تعريف مقاطع الترجمة

في ملفات اللغة، يمكنك تحديد هياكل ذات مستوى واحد أو متعددة المستويات:

```
// lang/en.json
{
  "الاسم": "إنه اسمك"،
  "مطلوب": {
    "user_id": "UserID مطلوب"
  }
}
```

### استرداد مقاطع الترجمة

يمكنك استخدام طريقة 'facades.Lang(ctx).Get()' لاسترداد سلاسل الترجمة من الملفات اللغوية. إذا كان ملف اللغة
يحتوي على مستويات متعددة، يمكنك استخدام `. لتوصيلهم، وإذا كان ملف اللغة في مستويات متعددة من المجلدات
، فيمكنك استخدام `/\` لتوصيلهم.

وعلى سبيل المثال:

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

#### استبدال المعلمات في سلاسل الترجمة

يمكنك تحديد العناصر النائبة في سلاسل الترجمة. جميع العناصر النائبة لديها البادئة `:`. على سبيل المثال، يمكنك استخدام نائب
لتعريف رسالة الترحيب:

```
{
  "مرحباً": "مرحباً، :name"
}
```

لاستبدال العناصر النائبة عند استرداد سلسلة الترجمة، يمكنك تمرير خيار الترجمة مع الخريطة البديلة
كالمعلمة الثانية إلى 'واجهات'. طريقة ang(ctx).Get()\`:

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Replace: map[string]string{
    "name": "Goravel",
  },
})
```

#### تكديس

والتعددية مشكلة معقدة لأن اللغات المختلفة لديها قواعد مختلفة للتعددية. However, Goravel can
help you translate strings based on the pluralization rules you define. باستخدام حرف '<unk> \`، يمكنك التمييز
بين الأشكال الأحادية والمعدلية لسلسلة ما يلي:

```
{
  "التفاح": "هناك تفاحة واحدة وهناك العديد من التفاحات"
}
```

يمكنك حتى إنشاء قواعد تعددية أكثر تعقيداً عن طريق تحديد سلاسل الترجمة لنطاقات قيمة متعددة:

```
{
  "التفاح": "{0} لا يوجد أي شيء<unk> [1,19] هناك بعض <unk> [20,*] هناك كثيراً"
}
```

بعد تحديد سلسلة ترجمة مع خيارات التعددية، يمكنك استخدام طريقة 'facades.Lang(ctx).Choice()' إلى
استرداد السطر لـ 'count\`. في هذا المثال ، لأن العد أكبر من 1 ، يتم إرجاع الشكل المعدود لسلسلة الترجمة
:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

يمكنك أيضا تعريف سمات العنصر النائب في سلاسل التعددية. By passing an array as the third parameter to the
`facades.Lang(ctx).Choice()` method, you can replace these placeholders:

```
"minutes_ago": "{1} :value minute ago<unk> [2,*] :value minutes ago",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Replace: map[string]string{
    "value": "5",
  },
})
```
