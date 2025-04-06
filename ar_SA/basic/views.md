# المشاهدات

بالطبع، ليس من العملي إرجاع سلاسل مستندات HTML بأكملها مباشرة من مسارك وأجهزة التحكم الخاصة بك.
لحسن الحظ، توفر المشاهدات طريقة مناسبة لوضع كل HTML لدينا في ملفات منفصلة. مشاهدة وحدة التحكم الخاصة بك /
منطق التطبيق عن منطق العرض التقديمي الخاص بك ويتم تخزينها في دليل 'resources/views'.

## إنشاء وتقديم وجهات النظر

عند استخدام قالب Goravel الافتراضي `html/template`، يمكنك إنشاء مشاهدات بإضافة ملف مع امتداد `.tmpl`
في دليل التطبيق \`resources/views'.

```
//resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>مرحبا، {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

بعد إنشاء طريقة العرض، يمكنك استخدام طريقة "عرض" لإعادة العرض من مسار أو وحدة تحكم في التطبيق:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### أدلة العرض المتداخلة

قد تكون الآراء متداخلة أيضا داخل الدلائل الفرعية لدليل 'resources/views'. على سبيل المثال، إذا تم تخزين نظرك
في `resources/views/admin/profile. mpl'، يمكنك إرجاعها من أحد مسارات التطبيق الخاص بك أو التحكم فيه، الملاحظة
أن العرض يحتاج إلى تعريفه على أنه 'تعريف 'admin/profil'. اضاف"` كما هو مبين أدناه:

```go
// resources/views/admin/profile.tmpl
{{ تعريف "admin/profile.tmpl" }}
<h1>مرحبا بكم في فريق المدير</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### إنشاء أول عرض متاح

باستخدام طريقة "أولاً"، يمكنك استخدام طريقة العرض الأولى الموجودة في مجموعة معينة من وجهات النظر. قد يكون هذا مفيدًا إذا كان التطبيق
الخاص بك أو الحزمة يسمح بالمشاهدات لتخصيصها أو الكتابة فوقها:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### تحديد إذا كان العرض موجود

إذا كنت بحاجة إلى تحديد ما إذا كانت طريقة العرض موجودة، يمكنك استخدام طريقة 'facades.View()\`:

```go
إذا واجهت.View().Exist("welcome.tmpl") {
  // ...
}
```

## نقل البيانات إلى المشاهدات

وكما رأيتم في الأمثلة السابقة، يمكنك نقل مجموعة من البيانات إلى المشاهدات لجعل تلك البيانات متاحة للعرض.
يرجى ملاحظة أن تنسيق البيانات التي تم تمريرها يحتاج إلى تغيير وفقا لمشغل القالب المستخدم، في المثال التالي
باستخدام مشغل `html/template` الافتراضي:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### مشاركة البيانات مع جميع المشاهدات

قد تحتاج أحياناً إلى مشاركة البيانات مع جميع المشاهدات التي يقدمها تطبيقك. يمكنك القيام بذلك باستخدام طريقة
`Share` في `facades.View()`. عادةً ، يجب عليك إجراء مكالمات إلى طريقة "المشاركة" ضمن طريقة مزود الخدمة
A\`Boot'. أنت حر في إضافتهم إلى فئة "app/providers/app_service_provider.go" أو إنشاء موفر خدمات
منفصل لإيوائهم:

```go
موفري الحزمة

استيراد (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"


نوع AppServiceProserder struct {


func (المتلقي *AppServiceProvider) Register(مؤسسة التطبيق. التكرار) {
}

func (المتلقي *AppServiceproviders er) Boot(app Foundation.Application) {
    facades.View().Share("key", "value")
}
```
