# تطوير الحزمة

الحزم هي الطريقة الرئيسية لإضافة وظيفة إلى غورافل. These packages may contain routes, controllers, and
configurations that are specifically designed to enhance a Goravel application. This guide focuses on developing
Goravel-specific packages.

هنا مثال لبناء حزمة طرف ثالث
: [goravel/example-package](https://github.com/goravel/example-package)

## إنشاء حزمة

يمكنك بسهولة إنشاء قالب حزمة باستخدام أمر Artisan:

```shell
إذهب للتشغيل. صنع حرفي:package sms
```

يتم حفظ الملفات التي تم إنشاؤها بشكل افتراضي في مجلد "الحزم" الجذر ، يمكنك استخدام خيار `--Root` لتخصيص:

```shell
إذهب للتشغيل. صنع:package --root=pkg sms
```

## مزودي الخدمات

[مزودي الخدمات](../foundation/providers) يعملون كجسر بين الحزمة و Goravel.
وهي تقع عادة في جذر الطرد كملف 'service_provider.go'. وظيفتهم الرئيسية هي ربط العناصر
في حاوية خدمة Goravel، وتوجيه Goravel في تحميل موارد الحزمة.

## الاستخدام

سجل 'ServiceProvider' في الحزمة إلى 'config/app.go::providers'، ثم قم بتصدير 'facades' إلى التطبيق.
وللاطلاع على الخطوات التفصيلية، يرجى الرجوع إلى [goravel/example-package](https://github.com/goravel/example-package).

## الموارد

### الإعدادات

عادةً ، ستحتاج إلى نشر ملف تكوين الحزمة الخاص بك إلى دليل 'config\` الخاص بالتطبيق. This will
allow users of your package to easily override your default configuration options. للسماح لملفات الإعدادات الخاصة بك إلى
أن تنشر، اتصل بطريقة 'Publishes' من طريقة 'Boot' لمزود الخدمة الخاص بك، المعلمة الأولى هي اسم الحزمة
والمعلمة الثانية هي التعيين بين مسار ملف الحزمة الحالي ومسار المشروع:

```go
الفونك (المستلم *Serviceproviders ) Boot(app Foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### المسارات

إذا كان هناك [routes](../basic/routing) في الحزمة الخاصة بك، يمكنك استخدام `app.MakeRoute()` لحل
`facades.Route()`، ثم إضافة المسارات إلى المشروع:

```go
مربع (المستلم *Serviceمقدمي الخدمة) Boot(appation.Application) {
 المسار := app.MakeRoute()
 route.Get("sms", ***)
}
```

### الهجرات

إذا كان هناك [migrations](../orm/migrations) في الحزمة الخاصة بك، يمكنك نشرها بطريقة 'Publishes':

```go
الفونك (المستلم *Serviceproviders ) Boot(app Foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "الهجرات": app.DatabasePath("migations"),
  })
}
```

## الأوامر

يمكنك تسجيل الأمر 'حرفي' بطريقة 'الأوامر' ، يمكنك تشغيل الأوامر
باستخدام [Artisan CLI](../advanced/artisanبعد تسجيلها.

```go
مربع (المستلم *Serviceprovider) Boot(app Foundation.Application) {
 app.commands([]console.command{
  commands.NewSmscommand(),
 })
}
```

## الأصول العامة

قد يكون للحزمة الخاصة بك أصول مثل جافا سكريبت و CSS و الصور. لنشر هذه الأصول إلى دليل 'public\`
الخاص بالتطبيق، استخدم طريقة 'Publishes' الخاصة بمقدم الخدمات:

```go
الفونك (المستلم *Serviceproviders ) Boot(app Foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## نشر مجموعات الملفات

إذا كنت ترغب في نشر مجموعات محددة من أصول الحزمة والموارد بشكل منفصل، يمكنك استخدام العلامات عند الاتصال بطريقة
'Publishes' من موفر خدمة الحزمة. هذا يسمح لك بإعطاء المستخدمين خيار نشر بعض الملفات
، مثل ملفات الإعدادات ، دون الحاجة إلى نشر جميع أصول الحزمة. التوضيح، يمكنك تحديد مجموعتين
نشر مجموعات لحزمة 'sms' ('sms-config' و 'sms-migrations') باستخدام العلامات في طريقة 'Boot' من مزود خدمة الحزمة
.

```go
الفونك (المستلم *ServiceProvider) Boot(app Foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migations": تطبيق. atabasePath("الهجرات")،
  }, "sms-Migations")
}
```

## نشر الموارد

في المشروع، يمكنك نشر الموارد المسجلة في حزمة باستخدام الأمر الفني 'vendor:publish' Artisan:

```shell
ابدأ التشغيل. بائع حرفي:published --package={You package name}
```

يمكن أن يستخدم الأمر الخيارات التالية:

| اسم الخيار | Alias | اجراء                                                                                                                                                                                                                                        |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --حزمة     | -س    | اسم الحزمة، يمكن أن يكون حزمة بعيدة: `github.com/goravel/example-package`، ويمكن أيضا أن يكون حزمة محلية: `. الحزم/مثال-حزمة`، لاحظ أنه عند استخدام اسم الحزمة المحلية، يجب أن يبدأ مع `./`. |
| --وسم      | -t    | مجموعة المصدر                                                                                                                                                                                                                                |
| --القوة    | -f    | الكتابة فوق أي ملفات موجودة                                                                                                                                                                                                                  |
| --موجود    | -س    | نشر واستبدال الملفات التي تم نشرها بالفعل                                                                                                                                                                                                    |
