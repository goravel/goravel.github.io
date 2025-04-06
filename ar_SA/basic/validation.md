# المصادقة

يوفر Goravel عدة نُهج مختلفة للتحقق من صحة البيانات الواردة لتطبيقك. من الأكثر شيوعاً استخدام طريقة
'Validate' المتوفرة على جميع طلبات HTTP الواردة. يتضمن Goravel مجموعة واسعة من قواعد التحقق المريحة

## بدء سريع للتحقق

دعونا نلقي نظرة أدق على مثال كامل لكيفية التحقق من صحة النموذج وإرجاع رسائل الخطأ إلى المستخدم. This
overview will provide you with a general understanding of how to validate incoming request data using Goravel.

### تعريف الطرق

أولا، دعونا نفترض أن الطرق التالية محددة في ملفنا \`routes/web.go':

```go
استيراد "goravel/app/http/controllers"

post-Controller := controlllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

يعرض مسار "GET" استمارة لإنشاء مشاركة مدونة جديدة. ويخزن مسار "POST" الوظيفة الجديدة في قاعدة البيانات.

### إنشاء المراقب المالي

بعد ذلك، دعونا نلقي نظرة على وحدة تحكم بسيطة تتعامل مع الطلبات الواردة إلى هذه الطرق. سنترك طريقة "المتجر"
فارغة الآن:

```go
تحكم الحزمة

استيراد (
  "github. om/goravel/framework/contracts/http"


type PostController struct {
  // Dependent Services


func NewPostController() *PostController {
  return &PostController{
    // Inject Services




func (r *PostController) Create(ctx SUp. ontext) {

}

func (r *PostController) متجر (tx http.Context) {

}
```

### كتابة منطق التحقق

نحن الآن مستعدون لملء طريقة "المتجر" الخاصة بنا بالمنطق للتحقق من صحة مشاركة المدونة الجديدة.

```go
مربع (r *PostController) متجر (tx http.Context) {
  المصادق، الخطأ := ctx.request). alidate(map[string]string{
    "title": "required<unk> max_len:255",
    "body": "مطلوب",
    "الرمز": "مطلوب: ^\d{4,6}$",
  })
}
```

### السمات المتداخلة

If the incoming HTTP request contains "nested" field data, you may specify these fields in your validation rules using
the "dot" syntax:

```go
محقق، err := ctx.request().Validate(map[string]string{
  "title": "required<unk> max_len:255",
  "author.name": "مطلوب"،
  "author.description": "مطلوب"،
})
```

### التحقق من الجليد

If the incoming HTTP request contains "array" field data, you may specify these fields in your validation rules using
the `*` syntax:

```go
المصادق، الخطأ := ctx.request().Validate(map[string]string{
  "علامات.*": "مطلوب"،
})
```

## التحقق من طلب النموذج

### إنشاء طلبات النموذج

بالنسبة لسيناريوهات التحقق الأكثر تعقيدا، قد ترغب في إنشاء "طلب استمارة". طلبات الاستمارة هي فئات طلب مخصصة
التي تتضمن منطق التحقق والتصريح الخاص بها. لإنشاء صف طلب نموذجي، يمكنك استخدام الأمر
\`make:request' Artisan CLI:

```go
ابدأ بالتشغيل. اعمل الحرفية على:request StorePostRequest
. ابدأ تشغيل الحرفية على:request user/StorePostRequest
```

سيتم وضع فئة طلب النموذج التي تم إنشاؤها في دليل "app/http/requests". إذا كان هذا الدليل غير موجود،
سيتم إنشاؤه عند تشغيل الأمر `make:request'. ولكل طلب من طلبات الاستمارة التي أنشأتها غورافيل ست أساليب:
`إذن`، `القواعد`. بالإضافة إلى ذلك، يمكنك تخصيص طرق 'المرشحات` و 'الرسائل` و 'السمات و 'التأهب` و 'التأهب\`
لمزيد من العمليات.

The `Authorize` method is responsible for determining if the currently authenticated user can perform the action
represented by the request, while the `Rules` method returns the validation rules that should apply to the request's
data:

```go
طلب الحزمة

استيراد (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"


type StorePostRequest struct {
  Name string `form:"name"` json:"name"`
}

func (r *StorePostrequest) Authorize(tx A/Cp. ontext) خطأ {
  return nil
}

func (r *StorePostrequest) قواعد (tx { p. ontext) خريطة[string]سلسلة {
  خريطة العودة[string]سلسلة{
    // المفاتيح متسقة مع المفاتيح الواردة.
    "name": "required<unk> max_len:255",

}

func (r *StorePostrequest) Filters(ctx. ontext) خريطة[string]سلسلة {
  خريطة العودة[string]سلسلة{
    "الاسم": "trim",



func (r *StorePostrequest) Messages(ctx /SBp. ontext) map[string]string {
  Remap[string]string{}
}

func (r * StorePostrequest) Attributes(ctx iopp. ontext) map[string]string {
  Remap[string]string{}


func (r * StorePostrequest) PrepareValidation(ctx i. على النص، التحقق من صحة البيانات.البيانات) خطأ {
  return nil
}
```

إذن، كيف يتم تقييم قواعد التحقق؟ كل ما عليك فعله هو كتابة تلميح الطلب على طريقة وحدة التحكم الخاصة بك. تم التحقق من طلب النموذج
الوارد قبل تسمية طريقة وحدة التحكم، يعني أنك لست بحاجة إلى تفكيك وحدة التحكم
الخاصة بك مع أي منطق التحقق من صحة:

ثم يمكنك استخدام طريقة 'Validaterequest' للتحقق من صحة الطلب في وحدة التحكم:

```go
تفكيك (r *PostController) مخزن (tx http.Context) {
  var storePost requests.StorePostRequest
  الأخطاء، الخطأ := ctx.request().Validaterequest(&storePost)
}
```

تحقق من المزيد من القواعد في قسم [قواعد التحقق المتاحة](#available-validation-rules).

> لاحظ أنه منذ تمرير القيم 'form`<unk> <unk> are من نوع 'string' بشكل افتراضي، جميع الحقول في الطلب يجب أن تكون أيضا من نوع`سلسلة'، وإلا فالرجاء استخدام \`JSON' لتمرير القيم.

### تخويل طلبات النموذج

نوع الطلب يحتوي أيضا على طريقة 'إذن\`. ضمن هذه الطريقة، يمكنك تحديد ما إذا كان المستخدم المصادق
لديه في الواقع الصلاحية لتحديث مورد معين. على سبيل المثال، قد تحدد ما إذا كان المستخدم يمتلك بالفعل تعليق مدونة
يحاول تحديثها. على الأرجح، سوف تتفاعل مع
[بوابات التفويض وسياساتك](../security/authorization) ضمن هذه الطريقة:

```go
تفكيك (r *StorePostrequest) تفويض الخطأ (tx http.Context) {
  var Commodels. omment
  facades.Orm().Query().First(&comment)
  if comment.ID =0 {
    خطأ في الإرجاع. ew("لا يوجد تعليق")
  }

  إذا !facades.Gate. llows("تحديث", map[string]any{
    "تعليق": تعليق،
  }) {
    خطأ في الإرجاع. ew("لا يمكن تحديث التعليق")


  Rerefl
}
```

سيتم نقل "خطأ" إلى قيمة الإرجاع لـ \`ctx.request().Validaterequest.

### تصفية بيانات الإدخال

يمكنك تنسيق بيانات الإدخال عن طريق تحسين طريقة `المرشحات` لطلب النموذج. يجب أن تعيد هذه الطريقة خريطة من
`attribute/filter`:

```go
Fters(ctx http.Context) map[string]string {
  Remap[string]string{
    "الاسم": "trim",
  }
}
```

### تخصيص رسائل الخطأ

يمكنك تخصيص رسائل الخطأ المستخدمة في طلب النموذج عن طريق تجاوز طريقة "الرسائل". يجب أن تقوم هذه الطريقة
بإرجاع مجموعة من السمات / أزواج القواعد ورسائل الخطأ المقابلة:

```go
تموج (r *StorePostrequest) الرسائل()[string]سلسلة{
  خريطة إرجاع[string]سلسلة{
    "العنوان.
    "body.required": "رسالة مطلوبة"،

}
```

### تخصيص سمات التحقق

العديد من رسائل خطأ قاعدة Goravel's المدمجة في Goravel's تحتوي على عنصر تحويل ':attribute'. إذا كنت ترغب في استبدال العنصر النائب
':attribute' لرسالة التحقق الخاصة بك باسم سمة مخصصة، يمكنك تحديد الأسماء المخصصة
عن طريق تجاوز طريقة \`السمات'. يجب أن تعيد هذه الطريقة مجموعة من السمة / زواج الاسم:

```go
مالك (r *StorePostrequest) سمات الخريطة[string]سلسلة {
  العودة[string]string{
    "البريد الإلكتروني": "عنوان البريد الإلكتروني"،
  }
}
```

### إعداد الإدخال للتحقق

إذا كنت بحاجة إلى إعداد أو تصحيح أي بيانات من الطلب قبل تطبيق قواعد التحقق الخاصة بك، فيمكنك استخدام طريقة
`التأهب`:

```go
مربع (r *StorePostrequest) PrepareValidation(ctx http.Contexation.Data) خطأ {
  إذا كان الاسم، موجود := البيانات. et("name"); هناك {
    Redata.Set("name", name.(string)+"1")
  }
  Renl
}
```

## إنشاء المدققين يدويا

إذا كنت لا ترغب في استخدام طريقة "Validate" بناء على الطلب، فيمكنك إنشاء مثيل متحقق يدوياً باستخدام
`facades.Validator`. وتولّد طريقة "مفعول" الواجهة مثالاً جديداً للمصادقة:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation().Make(
    map[string]any{
      "name": "Goravel",
    },
    map[string]string{
      "title": "required|max_len:255",
      "body":  "required",
    })

  if validator.Fails() {
    // Return fail
  }

  var user models.User
  err := validator.Bind(&user)
  ...
}
```

أول حجة مرسلة إلى طريقة "Make" هي البيانات قيد التحقق والتي يمكن أن تكون "map[string]any" أو "struct".
أما الحجة الثانية فهي مجموعة من قواعد التحقق التي ينبغي تطبيقها على البيانات.

### تخصيص رسائل الخطأ

عند الحاجة، يمكنك تقديم رسائل خطأ مخصصة التي يجب أن يستخدمها مثيل متحقق بدلاً من الخطأ الافتراضي
الرسائل المقدمة من Goravel. يمكنك نقل الرسائل المخصصة بوصفها الحجة الثالثة إلى طريقة 'Make' (أيضًا
ينطبق على 'ctx.request().Validate()\`:

```go
المصادق، الخطأ := facades.Validation().Make(input, rules validation.Messages(map[string]string{
  "المطلوب": "حقل :attribute مطلوب.",
}))
```

### تحديد رسالة مخصصة للسمة المعطاة

في بعض الأحيان قد ترغب في تحديد رسالة خطأ مخصصة فقط لسمة معينة. يمكنك فعل ذلك باستخدام "dot"
تعليق. حدد اسم السمة أولا، متبوعا بالقاعدة (تنطبق أيضا على `ctx.request().Validate()`):

```go
المصادق، الخطأ := facades.Validation().Make(input, Rulation.Messages(map[string]string{
  "email.required": "نحن بحاجة إلى معرفة عنوان بريدك الإلكتروني!",
}))
```

### تحديد قيم السمات المخصصة

العديد من رسائل الأخطاء المدمجة في Goravel's تتضمن العنصر النائب `:attribute' الذي يتم استبداله باسم الحقل
أو السمة قيد التحقق. To customize the values used to replace these placeholders for specific fields, you
may pass an array of custom attributes as the third argument to the `Make`method (also applicable to`ctx.Request().Validate()\`):

```go
المصادق، الخطأ := facades.Validation().Make(input, Rulation.Attributes(map[string]string{
  "البريد الإلكتروني": "البريد الإلكتروني"،
}))
```

### تنسيق البيانات قبل التحقق

يمكنك تنسيق البيانات قبل التحقق من صحة البيانات من أجل التحقق من صحة البيانات أكثر مرونة، ويمكنك تمرير طريقة
تنسيق البيانات كعامل ثالث إلى طريقة "Make" (ينطبق أيضًا على ctx. equest().Validate()\`:

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http.Context) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation.PrepareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      if name, exist := data.Get("name"); exist {
        return data.Set("name", name)
      }

      return nil
    }))

  ...
}
```

## العمل مع الإدخال المصادق عليه

بعد التحقق من صحة طلب البيانات الوارد باستخدام طلبات الاستمارة أو حالات المصادقة التي تم إنشاؤها يدويًا، مازلت تريد
ربط بيانات الطلب بـ \`هيكل'، هناك طريقتان للقيام بذلك:

1. استخدم طريقة "بيند"، وهذا سيربط جميع البيانات الواردة، بما في ذلك البيانات غير المصادقة عليها:

```go
المصادقة على المصادقة، الخطأ := ctx.request().Validate(القواعد)
var user models.user
err := المصادقة. ind(&user)

محقق المصادقة، الخطأ := facades.Validation().Make(input, rules)
var user models.user
err := validator.Bind(&user)
```

2. البيانات الواردة مربوطة تلقائياً بالنموذج عند استخدام طلب المصادقة:

```go
var storePost requests.StorePostRequest
خطأ، الخطأ := ctx.request().Validaterequest(&storePost)
fmt.Println(storePost.Name)
```

## العمل مع رسائل الخطأ

### استرداد رسالة خطأ واحدة للحقل (عشوائي)

```go
المصادقة ، الخطأ := ctx.request().Validate(القواعد)
المصادقة ، الخطأ := facades.Validation().Make(input, rules)

رسالة := validator.Errors().One("البريد الإلكتروني")
```

### استرداد جميع رسائل الخطأ للحقل

```go
الرسائل := صحيح.Errors().Get("البريد الإلكتروني")
```

### استرداد جميع رسائل الخطأ لجميع الحقول

```go
الرسائل := صحيح.Errors().All()
```

### تحديد إذا كانت رسائل الخطأ موجودة لحقل

```go
if validator.Errors().Has("البريد الإلكتروني") {
  //
}
```

## قواعد التحقق المتاحة

فيما يلي قائمة بجميع قواعد التحقق المتاحة ووظائفها:

| الاسم                                                      | الوصف                                                                                                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `مطلوب`                                                    | قيمة التحقق مطلوبة ولا يمكن أن تكون قيمة صفر. على سبيل المثال، نوع الحقل هو 'bool\`، قيمة المرور هي 'false'، لا يمكن اجتياز التحقق من الصحة.               |
| `مطلوبة_if`                                                | `مطلوبة_if:anotherfield,value,...` يجب أن يكون الحقل قيد التحقق حاضراً وليس فارغاً إذا كان الحقل الآخر مساوياً لأي قيمة.                                                   |
| `مطلوبة_unless`                                            | `required_unless:anotherfield,value،...` يجب أن يكون الحقل قيد التحقق حاضراً وليس فارغاً ما لم يكن حقل آخر مساوياً لأي قيمة.                                               |
| `مطلوبة_مع`                                                | `مطلوب_مع:foo,bar,...` يجب أن يكون الحقل قيد التحقق موجوداً وليس فارغاً فقط إذا كان أي من الحقول المحددة الأخرى موجودة.                                                    |
| `مطلوب_مع _كل`                                             | `required_with_all:foo,bar,...` يجب أن يكون الحقل قيد التحقق حاضراً وليس فارغاً فقط إذا كانت جميع الحقول المحددة الأخرى موجودة.                                            |
| `مطلوبة_دون إبعاد`                                         | `مطلوبة_without:foo,bar,...` يجب أن يكون الحقل قيد التحقق حاضراً وألا يكون فارغاً فقط عند عدم وجود أي من الحقول الأخرى المحددة.                                            |
| 'مطلوب_مع _الكل' | `required_without_all:foo,bar,...` يجب أن يكون الحقل قيد التحقق حاضراً وليس فارغاً فقط عندما تكون جميع الحقول المحددة الأخرى غير موجودة.                                   |
| `int`                                                      | قيمة التحقق هي نوع 'intX' 'uintX' والتحقق من حجم الدعم. eg: `int` `int:2` `int:2,12`. إشعار: [نقاط لاستخدام القواعد](#int) |
| `uint`                                                     | قيمة التحقق هي نوع 'uint(uintX)`، 'القيمة >= 0`                                                                                                                         |
| `bool`                                                     | قيمة التحقق هي سلسلة بولي (`true`: "1", "on", "نعم", "true", `false`: "0", "off", "no", "false").                       |
| `سلسلة`                                                    | قيمة التحقق هي نوع السلسلة، والتحقق من حجم الدعم. eg:`string` `string:2` `string:2,12`                                                                     |
| `float`                                                    | قيمة التحقق هي نوع 'float(floatX)'                                                                                                                                      |
| `شريحة`                                                    | قيمة التحقق هي نوع الشريحة (`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                     |
| 'in\`                                                      | `in:foo,bar,…` تحقق مما إذا كانت القيمة في التعداد المعطى                                                                                                                                  |
| `not_in`                                                   | `not_in:foo,bar,…` تحقق مما إذا كانت القيمة غير موجودة في التعداد المعطى                                                                                                                   |
| `starts_with`                                              | "starts_with:foo" تحقق مما إذا كانت قيمة سلسلة الإدخال تبدأ بسلسلة فرعية معينة                                                                        |
| `ends_with`                                                | 'ends_with:foo' تحقق مما إذا كانت قيمة سلسلة الإدخال تنتهي بسلسلة فرعية معينة                                                                         |
| `بين`                                                      | 'between:min,max' تحقق من أن القيمة عدد وداخل نطاق معين                                                                                                                    |
| `حد أقصى`                                                  | قيمة التحقق `max:value' أقل أو يساوي القيمة المعينة (`intX` `uintX` `floatX\`)                                                                                                             |
| `دقيقة`                                                    | 'min:value' قيمة التحقق أكبر من أو يساوي القيمة المعينة ('intX' `uintX' `floatX')                                                                       |
| `eq`                                                       | 'eq:value' تحقق من أن قيمة الإدخال تساوي القيمة المعطاة                                                                                                                    |
| `ne`                                                       | 'ne:value' تحقق من أن قيمة الإدخال لا تساوي القيمة المعطاة                                                                                                                 |
| `lt`                                                       | قيمة التحقق `lt:value' أقل من القيمة المعطاة. (`intX' `uintX' `floatX')                                                                                                                    |
| `gt`                                                       | 'gt:value' قيمة التحقق أكبر من القيمة المعينة ('intX' `uintX' `floatX')                                                                                 |
| `len`                                                      | 'len:value' طول قيمة التحقق يساوي الحجم المعين ('سلسلة' 'slice' 'map')                                                                                  |
| `min_len`                                                  | 'min_len:value' تحقق من الحد الأدنى لطول القيمة هو الحجم المعين ('سلسلة' 'slice' 'map\`)                                           |
| `max_len`                                                  | 'max_len:value' تحقق من الحد الأقصى لطول القيمة هو الحجم المعين ('سلسلة' 'slice' 'map\`)                                           |
| `email`                                                    | قيمة التحقق هي سلسلة عنوان البريد الإلكتروني                                                                                                                                               |
| 'صفيف\`                                                    | قيمة التحقق هي المصفوفة، نوع الشريحة                                                                                                                                                       |
| `خريطة`                                                    | قيمة التحقق هي نوع الـ MAP                                                                                                                                                                 |
| `eq_field`                                                 | 'eq_field:field' تحقق من أن قيمة الحقل تساوي قيمة حقل آخر                                                                                             |
| `ne_field`                                                 | "ne_field:field" تحقق من أن قيمة الحقل لا تساوي قيمة حقل آخر                                                                                          |
| `gt_field`                                                 | 'gt_field:field' تحقق من أن قيمة الحقل أكبر من قيمة حقل آخر                                                                                           |
| `gte_field`                                                | 'gte_field:field' تحقق من أن قيمة الحقل أكبر أو تساوي قيمة حقل آخر                                                                                    |
| `lt_field`                                                 | 'lt_field:field' تحقق من أن قيمة الحقل أقل من قيمة حقل آخر                                                                                            |
| `lte_field`                                                | 'lte_field:field' تحقق مما إذا كانت قيمة الحقل أقل أو تساوي قيمة حقل آخر                                                                              |
| `ملف`                                                      | تحقق إذا كان ملف تم تحميله                                                                                                                                                                 |
| `image`                                                    | تحقق مما إذا كان ملف صورة مرفوع ودعمها لاحقة التحقق                                                                                                                                        |
| `التاريخ`                                                  | تحقق من قيمة الحقل هو سلسلة التاريخ                                                                                                                                                        |
| `gt_date`                                                  | 'gt_date:value' تحقق من أن قيمة الإدخال أكبر من سلسلة التاريخ المعينة                                                                                 |
| `lt_date`                                                  | "lt_date:value" تحقق من أن قيمة الإدخال أقل من سلسلة التاريخ المعينة                                                                                  |
| `gte_date`                                                 | 'gte_date:value' تحقق من أن قيمة الإدخال أكبر من أو يساوي سلسلة التاريخ المعينة                                                                       |
| `lte_date`                                                 | 'lte_date:value' تحقق من أن قيمة الإدخال أقل من أو يساوي سلسلة التاريخ المعينة                                                                        |
| ألفا                                                       | تحقق من أن القيمة تحتوي على أحرف أبجدية فقط                                                                                                                                                |
| `alpha_num`                                                | تحقق من أن الأحرف والأرقام فقط متضمنة                                                                                                                                                      |
| `ألفا_داش`                                                 | تحقق لتضمينها فقط الأحرف والأرقام والشرطات ( -) والشرطات السفلية ( _ )                                                          |
| `json`                                                     | قيمة التحقق هي سلسلة JSON                                                                                                                                                                  |
| `عدد`                                                      | قيمة التحقق هي سلسلة `>= 0`                                                                                                                                                                |
| `full_url`                                                 | قيمة التحقق هي سلسلة URL كاملة(يجب أن تبدأ مع http,https)                                                                                                               |
| `ip`                                                       | قيمة التحقق هي سلسلة IP(v4 أو v6)                                                                                                                                       |
| \`ipv4'                                                    | قيمة التحقق هي سلسلة IPv4                                                                                                                                                                  |
| `ipv6`                                                     | قيمة التحقق هي سلسلة IPv6                                                                                                                                                                  |
| `regex`                                                    | تحقق مما إذا كانت القيمة يمكن أن تمر بالتحقق العادي                                                                                                                                        |

### نقاط لاستخدام القواعد

#### تلميح

عند استخدام 'ctx.request().Validate(rules)' للتحقق من صحة صحة البيانات، سيتم تحليل بيانات نوع 'int' الواردة بواسطة
'json. nmarshal`إلى نوع`float64\`، الذي سيؤدي إلى فشل التحقق من صحة القاعدة الواردة.

**الحلول**

الخيار 1: إضافة [`validation.PrepareForValidation`](#format-data-before-validation)، تنسيق البيانات قبل التحقق من صحة البيانات
؛

الخيار 2: استخدام `facades.Validation().Make()` للتحقق من صحة القاعدة؛

## قواعد التحقق المخصصة

يوفر Goravel مجموعة متنوعة من قواعد التحقق المفيدة؛ ومع ذلك، قد ترغب في تحديد بعض من قواعد التحقق الخاصة بك. طريقة واحدة من قواعد التحقق المخصصة
هي استخدام كائنات القاعدة. لإنشاء عنصر قاعدة جديد، يمكنك ببساطة استخدام أمر Artisan
\`make:rule'.

على سبيل المثال، إذا كنت ترغب في التحقق من أن سلسلة هي حرف رئيسي، فيمكنك إنشاء قاعدة بهذا الأمر. Goravel سوف
ثم حفظ هذه القاعدة الجديدة في دليل "app/rules". If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
قم بتشغيل. مارست الحرفية:rule Uppercase
تشغيل. مارست الحرفية:rule user/Uppercase
```

بعد إنشاء القاعدة، نحتاج إلى تعريف سلوكها. كائن القاعدة له طريقتان: `تصريح` و `رسالة`. وتتلقى طريقة المرور
جميع البيانات، بما في ذلك البيانات التي سيتم التحقق من صحتها ومعلمات التحقق. يجب أن يرجع
`true` أو `false` اعتماداً على ما إذا كانت قيمة السمة صالحة. يجب أن ترجع طريقة "الرسالة" رسالة الخطأ
للتحقق التي يجب استخدامها عند فشل عملية التحقق.

```go
package rules

import (
  "strings"

  "github.com/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Signature The name of the rule.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes Determine if the validation rule passes.
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val.(string)
}

// Message Get the validation error message.
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

ثم تحتاج إلى تسجيل القاعدة في طريقة "القواعد" في ملف "app/providers/validation_service_provider.go"، و
يمكن استخدام القاعدة مثل القواعد الأخرى:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades.Validation().AddRules(receiver.rules()); err != nil {
    facades.Log().Errorf("add rules error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation.Rule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## فلاتر التحقق المتوفرة

| الاسم                          | الوصف                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | تحويل القيمة (سلسلة/intX/floatX) إلى `int' نوع `v.FilterRule("id", "int")\`                                       |
| `uint/toUint`                  | تحويل القيمة (سلسلة/intX/floatX) إلى 'uint' نوع 'v.FilterRule("id", "uint")'                                      |
| `int64/toInt64`                | تحويل القيمة (سلسلة/intX/floatX) إلى `int64' نوع `v.FilterRule("id", "int64")\`                                   |
| `float/toFloat`                | تحويل القيمة (سلسلة/intX/floatX) إلى نوع 'float'                                                                                                     |
| `bool/toBool`                  | تحويل قيمة السلسلة إلى البول. (`true`: "1", "on", "نعم", "true", `false`: "0", "off", "no", "false") |
| `trim/trimSpace`               | تنظيف أحرف المساحة البيضاء على كلا جانبي السلسلة                                                                                                                        |
| `ltrim/trimLeft`               | تنظيف أحرف المساحة البيضاء على الجانب الأيسر من السلسلة                                                                                                                 |
| `rtrim/trimRight`              | تنظيف أحرف المساحة البيضاء على الجوانب اليمنى من السلسلة                                                                                                                |
| `int/integer`                  | تحويل القيمة (سلسلة/intX/floatX) إلى `int' نوع `v.FilterRule("id", "int")\`                                       |
| `حالة منخفضة/منخفضة`           | تحويل السلسلة إلى أحرف صغيرة                                                                                                                                            |
| `uppercase/uppercase`          | تحويل السلسلة إلى الحروف الكبيرة                                                                                                                                        |
| `lcFirst/low erFirst`          | تحويل الحرف الأول من سلسلة إلى حروف صغيرة                                                                                                                               |
| `ucFirst/upperFirst`           | تحويل الحرف الأول من سلسلة إلى حرف كبير                                                                                                                                 |
| `ucWord/upperWord`             | تحويل الحرف الأول لكل كلمة إلى حرف كبير                                                                                                                                 |
| `camel/camelCase`              | تحويل السلسلة إلى نمط تسمية الجمال                                                                                                                                      |
| `snake/snakeCase`              | تحويل السلسلة إلى نمط تسمية الثعبان                                                                                                                                     |
| `escapeJs/escapeJS`            | هرّب من سلسلة JS.                                                                                                                                       |
| `escapeHtml/escapeHTML`        | الهروب من سلسلة HTML.                                                                                                                                   |
| `str2ints/strToInts`           | تحويل السلسلة إلى إشارة شريحة `[]int`                                                                                                                                   |
| `str2time/strToTime`           | تحويل سلسلة التاريخ إلى `time.Time`.                                                                                                                    |
| `str2arr/str2array/strToArray` | تحويل السلسلة إلى شريحة سلسلة `[]سلسلة`                                                                                                                                 |

## عامل تصفية مخصص

توفر Goravel مجموعة متنوعة من الفلاتر المفيدة، على كل حال، قد ترغب في تحديد بعض من فلاتك الخاصة. لإنشاء قاعدة جديدة
كائن، يمكنك ببساطة استخدام الأمر الفني `make:filter`. دعونا نستخدم هذا الأمر لإنشاء قاعدة تحول سلسلة
إلى عدد صحيح. هذه القاعدة مدمجة بالفعل في الإطار، نحن فقط ننشئها كمثال. Goravel سوف تحفظ
هذا الفلتر الجديد في دليل "app/filters". إذا كان هذا الدليل غير موجود، سيقوم Goravel بإنشائه عند تشغيل
الأمر الفني لإنشاء القاعدة:

```go
إذهب إلى التشغيل. تشغيل الحرفي: تصفية ToInt
// أو
. يعمل الحرفي: filter user/ToInt
```

فلتر واحد يحتوي على طريقتين: "التوقيع" و "Handle". وتحدد طريقة "التوقيع" اسم المرشح. طريقة
`Handle` تؤدي منطق التصفية المحدد:

```go
package filters

import (
  "strings"

  "github.com/spf13/cast"
  "github.com/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Signature The signature of the filter.
func (receiver *ToInt) Signature() string {
  return "ToInt"
}

// Handle defines the filter function to apply.
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast.ToString(val)
  }
}
```

ثم تحتاج إلى تسجيل الفلتر إلى طريقة 'التصفية' في ملف 'app/providers/validation_service_provider.go'، و
و الفلتر يمكن استخدامه مثل الآخرين:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades.Validation().AddFilters(receiver.filters()); err != nil {
    facades.Log().Errorf("add filters error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation.Filter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
