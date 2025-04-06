# طلبات HTTP

طريقة 'contracts/http/request' في Goravel يمكن أن تتفاعل مع طلب HTTP الحالي الذي يتم معالجته بواسطة التطبيق،
والحصول على المدخلات والملفات معًا.

## التفاعل مع الطلب

نموذج 'http.Context' يتم حقنه تلقائيا في وحدة التحكم:

```go
استيراد "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### استرداد مسار الطلب

```go
المسار := ctx.request().Path() ///users
```

### استرداد عنوان URL للطلب

```go
الرابط := ctx.request().Url() //users?name=Goravel
```

### استرداد طلب HOST

```go
الرابط := ctx.request().host()
```

### استرداد عنوان URL للطلب الكامل

```go
الرابط := ctx.request().FullUrl() // http://**/users?name=Goravel
```

### استرداد طريقة الطلب

```go
الطريقة: = ctx.request().Method()
```

### ترويسات الطلب

```go
رأس := ctx.request().header("X-header-Name", "ault")
ترويسات := ctx.request().headers()
```

### طلب عنوان IP

```go
ip := ctx.request().Ip()
```

## Input

### استرداد جميع بيانات الإدخال

يمكنك استرداد جميع البيانات المدخلة للطلب الوارد كـ 'map[string]any' باستخدام طريقة 'الكل\`، والتي هي مجموعة
من 'json' و 'form' و 'query' (أولوية من الواجهة إلى الخلف).

```go
بيانات := ctx.request().All()
```

### استرداد قيمة الطريق

```go
///users/{id}
معرف := ctx.request().Route("id")
معرف := ctx.request().RouteInt("id")
معرف := ctx.request().RouteInt64("معرف")
```

### استرداد الإدخال من سلسلة الاستعلام

```go
//users?name=goravel
اسم := ctx.request().Query("name")
اسم := ctx.request().Query("name", "default")

//users?id=1
اسم := ctx. equest().QueryInt("معرف")
اسم := ctx.request().QueryInt64("معرف")
اسم := ctx.request. ueryBool("id")

///users?names=goravel1&names=goravel2
nam:= ctx.request().QueryArray("names")

///users?names[a]=goravel1&name[b]=goravel2
nam:= ctx.request().QueryMap("names")

queries := ctx.request().Queries()
```

> ملاحظة: فقط يمكن الحصول على بيانات Json أحادية البعد، وإلا سوف تعود فارغة.

### استرداد قيمة الإدخال

الوصول إلى جميع مدخلات المستخدم دون القلق حول فعل HTTP الذي تم استخدامه للطلب. استرداد الطلب: `json`,
`form`.

```go
اسم := ctx.request().Input("name")
اسم := ctx.request().Input("name", "goravel")
اسم := ctx.request().InputInt("name")
اسم := ctx.request). nputInt64("الاسم")
اسم := ctx.request().InputBool("الاسم")
اسم := ctx.request().InputArray("الاسم")
اسم := ctx.request().InputMap("الاسم")
```

### ربط Json/Form

```go
اكتب بنية المستخدم {
  Name string `form:"code" json:"code"`


var user
err := ctx.request().Bind(&user)
```

```go
عرض خريطة المستخدم[string]أي
خطأ:= ctx.request().Bind(&user)
```

### اربط استعلام

دعم فقط ربط الاستعلام للبناء:

```go
نوع اختبار تم تركيبه {
  ID string `form:"id"`

var test
err := ctx.request().BindQuery(&test)
```

## كوكي

### استرداد قيمة ملف تعريف الارتباط

يوفر Goravel طريقة بسيطة للعمل مع 'ملفات تعريف الارتباط\`. استخدم طريقة "ملفات تعريف الارتباط" في مثيل "طلب" لاسترداد قيمة
"ملفات تعريف الارتباط"، سوف يعيد سلسلة فارغة إذا لم تكن "ملفات تعريف الارتباط" موجودة. يمكنك أيضا تعريف القيمة الافتراضية في حجة
الثانية.

```go
القيمة := ctx.request().cookie("name")
القيمة := ctx.request().Cookie("الاسم"، "الافتراضي") 
```

## ملف

### استرداد الملف

```go
ملف ، خطأ := ctx.request().File ("ملف")
```

### حفظ الملف

```go
ملف ، خطأ := ctx.request().File("ملف")
file.Store("./public")
```

### الحصول على طلب الأصل

```go
طلب := ctx.request().Origin()
```

### إرفاق البيانات

```go
ctx.WithValue("المستخدم"، "Goravel")
```

### الحصول على البيانات

```go
المستخدم := ctx.Value("المستخدم")
```

### الحصول على السياق

```go
ctx := ctx.Context()
```

## استرداد مخصص

يمكنك تعيين "استرداد" مخصص من خلال الاتصال بطريقة "الاسترداد" في ملف "app/providers/route_service_provider.go".

```go
// app/providers/route_service_provider.go
func (المتلقي *RouteServiceProvider) Boot(appation.Application) {
  // إضافة HTTP medileware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err خطأ) {
    ctx.request. () bort()
    / / أو
    // ctx.Response(). ترينغ (500، "خطأ خادم داخلي").Abort()
  })
  ...
}
```
