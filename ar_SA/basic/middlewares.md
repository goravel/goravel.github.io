# البرامج المتوسطة

يوفر البرنامج الأوسط آلية مناسبة للتفتيش على طلبات HTTP التي تدخل تطبيقك وتصفيتها.

## تعريف البرنامج الأوسط

يمكنك إنشاء برنامج وسيط خاص بك في دليل "app/http/medileware"، الهيكل كما يلي.

```go
حزمة الوسيط

استيراد (
  "github.com/goravel/framework/contracts/http"


Auth() http.Middleware {
  وظيفة العودة (tx http.Context) {
    ctx.request().Next()

}
```

### إنشاء برنامج متوسط بأمر

```
قم بتشغيل. يتم تشغيل المصادقة الحرفية:medileware

// دعم المجلدات
. يقوم الحرفي بتشغيل:medileware user/Auth
```

## تسجيل البرامج المتوسطة

### البرامج المتوسطة العالمية

إذا كنت ترغب في تطبيق برنامج وسيط لكل طلب HTTP من التطبيق الخاص بك، تحتاج فقط إلى تسجيل المنتصف في
'Middleware' في 'app/http/kernel. o\` ملف.

```go
استيراد // app/http/kernel.go
حزمة تنبيه

(
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/medileware"


من نوع Kernel struct {
}

Fc (kernel *Kernel) Middleware() []:/p. البرمجيات iddleware {
  العودة []http.Middleware{
    medileware.Auth(),

}
```

### تعيين برنامج متوسط للتوجيه

يمكنك تسجيل المنتصف لبعض المسارات بشكل منفصل:

```go
استيراد "github.com/goravel/framework/http/medileware"

facades.Route().Middleware(medileware.Auth()).Get("users", userController.Show)
```

## طلب إلغاء

في الوسط ، إذا كنت بحاجة إلى مقاطعة الطلب، يمكنك استخدام طريقة "إلغائ".

```go
ctx.request().Abort()
ctx.request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Not Found").Abort()
```
