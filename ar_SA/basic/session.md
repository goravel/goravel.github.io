# الجلسة

Session enables you to store user information across multiple requests, providing a stateful experience within the
inherently stateless HTTP protocol. يتم تخزين معلومات المستخدم هذه باستمرار على جانب الخادم. توفر Goravel واجهة موحدة من نوع
للتفاعل مع مختلف سائقي التخزين الدائمين.

## الإعدادات

يوجد ملف تكوين `الدورة` في `config/session.go`. المشغل الافتراضي هو `ملف`، الذي يخزن الجلسات
في دليل `تخزين/إطار/دورات`. يسمح لك Goravel بإنشاء سائق مخصص لـ 'الدورة' عن طريق تنفيذ
واجهة 'العقود/الدورة/السائق'.

### تسجيل البرامج المتوسطة

بشكل افتراضي، لا تبدأ غورافيل جلسة تلقائيا. ومع ذلك، فهو يوفر أداة وسيطة لبدء الجلسة. You can
register the session middleware in the `app/http/kernel.go` file to apply it to all routes, or you can add it to
specific routes:

```go
استيراد (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/medileware"


func (kernel Kernel) Middleware() []http.Middleware {
  العودة []http.Middleware{
    medileware.StartSession(),

 A}
```

## التفاعل مع الجلسة

### استرداد البيانات

يمكنك استخدام طريقة 'الحصول على' لاسترداد البيانات من الجلسة. إذا لم تكن القيمة موجودة، سيتم إرجاع 'لا شيء'.

```go
القيمة := ctx.request().Session().Get("المفتاح")
```

يمكنك أيضا نقل قيمة افتراضية كحجة ثانية إلى طريقة 'Get'. سيتم إرجاع هذه القيمة إذا كان المفتاح
المحدد غير موجود في الدورة:

```go
القيمة := ctx.request().Session().Get("key", "default")
```

### استرداد جميع البيانات

إذا كنت ترغب في استرداد جميع البيانات من الجلسة، فيمكنك استخدام طريقة "الكل":

```go
بيانات := ctx.request().Session().All()
```

### استرداد مجموعة فرعية من البيانات

إذا كنت ترغب في استرداد مجموعة فرعية من بيانات الجلسة، فيمكنك استخدام طريقة "فقط":

```go
بيانات := ctx.request().Session().Only([]string{"username", "email"})
```

### تحديد ما إذا كان هناك عنصر في الجلسة

لتحديد ما إذا كان عنصر موجود في الجلسة، يمكنك استخدام طريقة "Has". طريقة 'Has' ترجع 'true' إذا كان العنصر
موجود وليس 'nil':

```go
if ctx.request().Session().Has("user") {
    //
}
```

لتحديد ما إذا كان العنصر موجود وحتى إذا كان 'لا شيء\`، يمكنك استخدام طريقة 'القائمين':

```go
if ctx.request().Session().Exists("user") {
    //
}
```

لتحديد ما إذا كان البند غير موجود في الجلسة، يمكنك استخدام طريقة "مفقودة":

```go
if ctx.request().Session().Missing("user") {
    //
}
```

### تخزين البيانات

يمكنك استخدام طريقة "Put" لتخزين البيانات في الدورة:

```go
ctx.request().Session().Put("key", "value")
```

### استرداد وحذف البيانات

إذا كنت ترغب في استرداد عنصر من الدورة ومن ثم حذفه، فيمكنك استخدام طريقة "سحب":

```go
القيمة := ctx.request().Session().Pull("المفتاح")
```

### حذف البيانات

يمكن استخدام طريقة "النسيج" لإزالة جزء من البيانات من الجلسة. إذا كنت ترغب في إزالة جميع البيانات من
الجلسة، يمكنك استخدام طريقة 'Flush':

```go
ctx.request().Session().Forget("username", "email")

ctx.request().Session().Flush()
```

### إعادة إنشاء معرف الجلسة

عادة ما يتم تجديد معرف الجلسة لمنع المستخدمين الخبيثين من استغلال هجوم تثبيت الجلسة
على التطبيق الخاص بك. يمكنك إعادة إنشاء معرف الجلسة باستخدام طريقة "إعادة الإنشاء":

```go
ctx.request().Session().Regenerate()
```

إذا كنت ترغب في تجديد معرف الجلسة ونسى جميع البيانات التي كانت في الجلسة، فيمكنك استخدام طريقة 'غير صحيح'
:

```go
ctx.request().Session().Invalidate()
```

ثم تحتاج إلى حفظ الجلسة الجديدة إلى ملفات تعريف الارتباط:

```go
ctx.Response().Cookie(http.Cookie{
  name: ctx.request().Session().GetName(),
  Vvalue: ctx.request().Session. etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  المسار: facades.Config().GetString("الدورة. ث"),
  domain: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("الدورة. كانر")،
  HttpOnly: facades.Config().GetBool("session.http_only")،
  SameSite: facades.Config().GetString("session.same_site")،
})
```

### فلاش البيانات

بيانات الفلاش هي بيانات الجلسة التي ستكون متاحة فقط أثناء طلب HTTP اللاحق، ثم سيتم حذفها.
بيانات الفلاش مفيدة لتخزين الرسائل المؤقتة مثل رسائل الحالة. يمكنك استخدام طريقة "فلاش" لتخزين بيانات الفلاش
في الدورة:

```go
ctx.request().Session().Flash("الحالة"، "المهمة كانت ناجحة!")
```

إذا كنت ترغب في الحفاظ على بياناتك الفلاش للحصول على طلب إضافي، فيمكنك استخدام طريقة "إعادة الفلاش":

```go
ctx.request().Session().Reflash()
```

إذا كنت ترغب في الاحتفاظ ببيانات فلاش محددة للحصول على طلب إضافي، فيمكنك استخدام طريقة "الاحتفاظ":

```go
ctx.request().Session().Keep("الحالة"، "username")
```

إذا كنت ترغب في الاحتفاظ ببيانات محددة للاستخدام الفوري، فيمكنك استخدام طريقة "الآن":

```go
ctx.request().Session().Now("الحالة"، "المهمة كانت ناجحة!")
```

## التفاعل مع مدير الجلسة

### بناء جلسة مخصصة

استخدم واجهة "الدورة" لبناء جلسة مخصصة. The `Session` facade provides the `BuildSession` method, which takes
a driver instance and an optional session ID if you want to specify a custom session ID:

```go
استيراد جلسة "github.com/goravel/framework/facades"

:= facades.Session().BuildSession(driver, "sessionID")
```

### إضافة مشغلات جلسة مخصصة

#### تنفيذ القيادة

لتنفيذ سائق جلسة مخصصة، يجب على السائق تنفيذ واجهة 'العقود/الدورة/السائق'.

```go
// Driver is the interface for Session handlers.
type Driver interface {
  // Close closes the session handler.
  Close() error
  // Destroy destroys the session with the given ID.
  Destroy(id string) error
  // Gc performs garbage collection on the session handler with the given maximum lifetime.
  Gc(maxLifetime int) error
  // Open opens a session with the given path and name.
  Open(path string, name string) error
  // Read reads the session data associated with the given ID.
  Read(id string) (string, error)
  // Write writes the session data associated with the given ID.
  Write(id string, data string) error
}
```

#### تسجيل السائق

بعد تنفيذ السائق، تحتاج إلى تسجيله في غورافل. يمكنك القيام بذلك باستخدام طريقة "التوسيع" ل
`facades.Session`. يجب عليك استدعاء طريقة "Extend" في طريقة "boot" لـ "app/providers/app_service_provider.go\`:

```go
استيراد "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

بمجرد تسجيل السائق، يمكنك استخدامه عن طريق تعيين خيار "السائق" في ملف تكوين الجلسة إلى
`redis` أو عن طريق تعيين متغير البيئة `SESSION_DRIVER` إلى `redis`.

### استرجاع نموذج المشغل

استخدم طريقة "المشغل" لاسترداد نموذج المشغل من مدير الجلسة. يقبل اسم مشغل اختياري، إذا لم يتم تقديم
، فإنه يعيد مثال المشغل الافتراضي:

```go
سائق، err := facades.Session().Driver("ملف")
```

### بدء جلسة جديدة

```go
الجلسة := facades.Session().BuildSession(driver)
session.Start()
```

### حفظ بيانات الجلسة

```go
الجلسة := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### إرفاق الجلسة بالطلب

```go
الجلسة := facades.Session().BuildSession(driver)
session.Start()
ctx.request().SetSession(الدورة)
```

### التحقق مما إذا كان الطلب له جلسة

```go
if ctx.request().HasSession() {
    //
}
```
