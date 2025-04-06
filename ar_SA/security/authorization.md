# التصريح

يقدم Goravel خدمات مدمجة في [authentication](./authentication) وميزة تفويض سهلة الاستخدام ل
إدارة إجراءات المستخدم على الموارد. حتى إذا تم توثيق المستخدم، قد لا يكون لديهم سلطة تعديل أو حذف
نماذج أو سجلات قواعد البيانات الخاصة بـ Eloquent (Automatic Translation) تتيح ميزة ترخيص غورافيل طريقة منهجية لإدارة فحص الترخيصformat@@0
هذه الترخيص.

هناك طريقتان للإذن باتخاذ إجراءات في غورفل: [gates](#gates) و [policies](#policies). Imagine gates and
policies as similar to routes and controllers. تستند البوابات إلى الإغلاقات وتوفر نهجاً بسيطاً للإذن
في حين أن منطق مجموعة السياسات حول مورد معين، مشابه للمراقبين. This documentation will
first cover gates and then delve into policies.

وليس من الضروري استخدام البوابات أو السياسات حصرا عند بناء التطبيق. معظم التطبيقات ستستخدم مزيجا
من كليهما، وهو مقبول تماما!

## البوابات

### بوابات الكتابة

وتعتبر البوابات بمثابة إغلاق تتحقق مما إذا كان يحق للمستخدم تنفيذ إجراء معين. عادة ما يتم إعدادها
في طريقة 'app/providers/auth_service_provider.go' 'Boot' باستخدام واجهة البوابة.

وفي هذا السيناريو، سوف نقوم بإنشاء بوابة للتحقق مما إذا كان يمكن للمستخدم تعديل نموذج منشور معين عن طريق مقارنة معرفته بـ
المستخدم معرف منشئ المشاركة.

```go
موفري الحزمة

استيراد (
  "سياق"

  contractsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"


نوع AuthServiceProمزود البنية {


func (المتلقي *AuthServiceprovider) Register(مؤسسة التطبيق. التكرار) {

}

func (المتلقي *AuthServiceproviders er) Boot(Foundation .Application) {
  الواجهة. ate().Define("update-post",
    func(ctx context.Context.Context, arguments map[string]any) contractsaccess. esponse {
      مستخدم := ctx.Value("user").(models.User)
      مشاركة := الحجج ["post"].(models. ost)

      if user.ID == post.UserID {
        الوصول إلى العودة. ewAlallowResponse()
      } أخرى {
        الوصول إلى العودة. ewDenyResponse("خطأ")

    },

}
```

### تصريح الإجراءات

للإذن بإجراء باستخدام البوابات، يجب عليك استخدام طرق 'السماح' أو 'الرفض' التي توفرها واجهة البوابة:

```go
وحدات تحكم الحزمة

استيراد (
  "github.com/goravel/framework/facades"


نوع UserController struct {

func (r *UserController) Show(ctx http.Context) named@@. esponse {
  var post models.Post
  if facades.Gate. llows("تحديث", map[string]any{
    "post": post,
  }) {
    
  }
}
```

يمكنك أن تأذن باتخاذ إجراءات متعددة في نفس الوقت باستخدام أساليب "أي واحد" أو "لا شيء".

```go
if facades.Gate().Any([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // The user can update or delete the post...
}

if facades.Gate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // The user can't update or delete the post...
}
```

### استجابات البوابة

طريقة "السماح" تعيد قيمة منطقية. للحصول على إجابة التفويض الكامل، استخدم طريقة "الفحص".

```go
الاستجابة: = facades.Gate().Inspect("edit-settings", nil);

if response.Alallowed() {
    // تم الإذن بالإجراء...
} آخر{
    fmt.Println(response.Message())
}
```

### اعتراض عمليات التحقق من البوابة

في بعض الأحيان، قد ترغب في منح جميع القدرات لمستخدم محدد. يمكنك تحديد الإغلاق باستخدام طريقة 'قبل\`،
التي تعمل قبل أي فحص إذن آخر:

```go
facades.Gate().Before(function(ctx context.Context.Contex، سلسلة القدرة، الحجج[string]أي) العقود، الرد {
  المستخدم := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    Reaccess.NewAllowResponse()


  Renl
})
```

وإذا كان الإغلاق 'السابق\` لا يؤدي إلى أي نتيجة، فإن هذه النتيجة تعتبر نتيجة التحقق من الترخيص.

ويمكن استخدام طريقة "اللاحقة" لتحديد الإغلاق الذي سيتم تنفيذه بعد جميع عمليات التحقق الأخرى من الأذونات.

```go
facades.Gate().After(function(ctx context.Context.Contex، سلسلة القدرة، الحجج[string]أي نتيجة العقود، الاستجابة) العقود، # الاستجابة،
  المستخدم := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    العودة إلى الوصولs.NewAllowResponse()


  refl
})
```

> إشعار: نتيجة الإرجاع "بعد" لن تطبق إلا عند عودة "facades.Gate().Define".

### حقن السياق

وسيتم نقل "السياق" إلى الأساليب `السابقة` و`اللاحقة` و`تعريف`.

```go
facades.Gate().WithContext(ctx).Alallows("update-post", map[string]أي {
  "post": post,
})
```

## السياسات

### توليد السياسات

يمكنك استخدام الأمر الفني "make:policy" لإنشاء سياسة. سيتم حفظ السياسة التي تم إنشاؤها في دليل
"app/policies". إذا كان الدليل غير موجود في التطبيق الخاص بك، سيقوم Goravel بإنشائه لك.

```go
go run . artisan make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### سياسات الكتابة

لنحدد طريقة "تحديث" على "PostPolicy" للتحقق مما إذا كان "المستخدم" يمكنه تحديث "Post".

```go
سياسات الحزمة

استيراد (
  "سياق"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"


type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  Re&PostPolicy{}


func (r *PostPolicy) Update(ctx). ontex، الخريطة[string]أي) العقودtsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := الحجج ["post"].(models.Post)

  اذا كان المستخدم. D == post.UserID {
    العودة الوصولs.NewAllowResponse()
  } أخرى {
    الوصول إلى العودة. ewDenyResponse("أنت لا تمتلك هذا المنشور.")

}
```

ثم يمكننا تسجيل السياسة إلى `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", Policies.NewPostPolicy().Update)
```

وبينما تعمل على الإذن باتخاذ إجراءات مختلفة، يمكنك إضافة المزيد من الطرق إلى سياستك. على سبيل المثال، يمكنك إنشاء أساليب
`عرض` أو `حذف` للسماح باتخاذ إجراءات مختلفة ذات صلة بالنماذج. Feel free to name your policy methods as you see
fit.
