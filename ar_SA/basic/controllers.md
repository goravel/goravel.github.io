# المتحكمون

بدلاً من تحديد كل منطق معالجة الطلبات في شكل إغلاق في مسار منفصل، يمكن استخدام وحدة تحكم
من أجل التكامل. يتم تخزين المتحكمين في دليل "app/http/controllers".

## تعريف المتحكمين

وفيما يلي مثال على مراقب أساسي:

```go
تحكم الطرد

استيراد (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"


نوع المراقب المالي للمستخدمين الذي تم هيكله {
  // / الخدمات التبعية


func NewUserController() *UserController {
  Re&UserController{
    ///Inject Services




func (r *UserController) Show(ctx. ontext) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "مرحبا": "Goravel",
  })
}
```

تعريف الطريق:

```go
طرق الحزمة

الاستيراد (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"


func Api() {
  مستخدم مراقب := مسائل. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### إنشاء وحدة تحكم

```shell
قم بتشغيل. تصنيع حرفي:controller UserController
قم بتشغيله حرفيا:controller user/UserController
```

## مراقبو الموارد

إذا كنت تفكر في كل نموذج Eloquent في تطبيقك كمورد من المعتاد تنفيذ نفس مجموعات الإجراءات
ضد كل مورد في تطبيقك. على سبيل المثال، تخيل أن تطبيقك يحتوي على نموذج 'صورة' و نموذج
'Movie'. من المحتمل أن يتمكن المستخدمون من إنشاء هذه الموارد أو قراءتها أو تحديثها أو حذفها.

بسبب حالة الاستخدام الشائعة هذه، يقوم توجيه مورد Goravel بتعيين الإنشاء النموذجي، القراءة، قم بتحديث وحذف ("CRUD")
مسارات إلى وحدة تحكم ذات سطر واحد من الكود. للبدء، يمكننا استخدام خيار الأمر الفني 'make:controlller'
\`--resource' لإنشاء وحدة تحكم بسرعة للتعامل مع هذه الإجراءات:

```shell
تشغيل . تصنيع حرفي:controller - مصور الموارد
```

سيؤدي هذا الأمر إلى إنشاء وحدة تحكم في `app/http/controllers/photo_controller.go`. سيحتوي المتحكم على طريقة
لكل عملية من عمليات الموارد المتاحة. بعد ذلك، يمكنك تسجيل مسار مورد يشير إلى وحدة التحكم
:

```go
facades.Route().Resource("phototos", Controllers.NewPhotoController())
```

| فعل       | URI               | اجراء  |
| --------- | ----------------- | ------ |
| احصل      | `/photos`         | الفهرس |
| نقطة      | `/photos`         | المتجر |
| احصل      | `/photos/{photo}` | إظهار  |
| PUT/PATCH | `/photos/{photo}` | تحديث  |
| حذف       | `/photos/{photo}` | تدمير  |
