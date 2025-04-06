# توجيه

ويمكن تشغيل وحدة مسارات Goravel بواسطة `facades.Route()`.

## سائق HTTP

تستخدم Goravel [gin](https://github.com/gin-gonic/gin) كمشغل HTTP الافتراضي الخاص بها. لاستخدام مشغلات أخرى، قم بتكوينها في
ملف \`config/http.go'. الافتراضي الرسمي يدعم [gin](https://github.com/gin-gonic/gin)
و [fiber](https://github.com/gofiber/fiber).

| سائق    | رابط                                                                                                 |
| ------- | ---------------------------------------------------------------------------------------------------- |
| Gin     | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| الألياف | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## ملف المسار الافتراضي

لتحديد ملفات المسار، ببساطة انتقل إلى دليل '/routes'. بشكل افتراضي، يستخدم الإطار مسار العينة
الموجود في `/routes/web.go`. لإنشاء ربط المسار، يتم تسجيل طريقة 'Web()' في ملف
'app/providers/route_service_provider.go'.

إذا كنت بحاجة إلى إدارة أكثر دقة، يمكنك إضافة ملفات توجيه إلى دليل '/routes' وتسجيلها في ملف
'app/providers/route_service_provider.go'.

## بدء خادم HTTP

ابدأ خادم HTTP في 'main.go' في الدليل الجذر عن طريق الاتصال بـ 'facades.Route().Run()`. This will automatically
fetch the `route.host\` configuration.

```go
استيراد الحزمة الرئيسية

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"


ch() mainformat@@3
  // هذا التمهيد هو جاهز للاستخدام.
  التمهيدات. oot()

  // ابدأ خادم Pip بواسطة facades.Route).
  اذهب إلى الوظيفة () {
    إذا حدث خطأ := واجهات. oute().Run(); خطأ!= صفر {
      واجهة. og().Errorf("طريق تشغيل الخطأ: %v", err)
    }
  
 }()

  اختر {}
}
```

## بدء خادم HTTPS

يرجى إكمال تكوين `http.tls` في `config/http.go` قبل استخدام HTTPS، و `facades.Route().RunTLS()`
ستبدأ طريقة تشغيل خادم HTTPS وفقا للتكوين ذي الصلة:

```go
// main.go
if err := facades.Route().RunTLS(); err != nl {
  facades.Log().Errorf("طريق تشغيل خطأ: %v", err)
}
```

يمكنك أيضا استخدام طريقة 'facades.Route().RunTLSWithCert()' لتخصيص المضيف والشهادة.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nl {
  facades.Log().Errorf("طريق التشغيل خطأ: %v", err)

```

## إغلاق خادم HTTP/HTTPS

يمكنك إغلاق خادم HTTP/HTTPS عن طريق الاتصال بطريقة "إيقاف التشغيل"، التي ستنتظر حتى تتم معالجة جميع الطلبات
قبل الإغلاق.

```go
//main.go
bootstrap.Boot()

// إنشاء قناة للاستماع إلى إشارات نظام التشغيل
الإقلاع عن التدخين:= make(chan os.Signal)
signal.Notify(quit, syscall. IGINT، syscall.SIGTERM)

/// ابدأ خادم Logp بواسطة facades.Route.
اذهب إلى وظيفة () {
  إذا حدث خطأ := facades.Route().Run(); err != nl {
    facades.Log. rrrorf("مسار تشغيل الخطأ: %v", err)
  }
}()

// Listten لإشارة OS
اذهب إلى الدالة () {
  <-quit
  إذا حدث خطأ := واجهة. oute().Shutdown(); خطأ!= صفر {
    facades.Log. rrorf("خطأ طريق الإغلاق: %v", err)
  }

  os.Exit(0)
}()

اختر {}
```

### طرق التوجيه

| الأساليب         | اجراء                              |
| ---------------- | ---------------------------------- |
| مجموعة           | [مسار المجموعة](#group-routing)    |
| بادئة            | [توجيه البادئة](#routing-prefix)   |
| ServeHTTP        | [اختبار الاتجاه](#testing-routing) |
| احصل             | [المسار الأساسي](#basic-routing)   |
| نشر              | [المسار الأساسي](#basic-routing)   |
| وضع              | [المسار الأساسي](#basic-routing)   |
| حذف              | [المسار الأساسي](#basic-routing)   |
| تعديل            | [المسار الأساسي](#basic-routing)   |
| الخيارات         | [المسار الأساسي](#basic-routing)   |
| أي               | [المسار الأساسي](#basic-routing)   |
| المورد           | [مسار الموارد](#resource-routing)  |
| ثابت             | [مسار الملفات](#file-routing)      |
| StaticFile       | [مسار الملفات](#file-routing)      |
| StaticFS         | [مسار الملفات](#file-routing)      |
| البرامج المتوسطة | [Middleware](#middleware)          |

## المسار الأساسي

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, AC.10p. son{
    "مرحباً": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## مسار الموارد

```go
استيراد "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route). المصدر ("/resource") مراقب الموارد):

نوع هيكل مراقبة الموارد {}
مربع مراقب الموارد الجديد () *مراقبة الموارد {
  A &ResourceController{}

/GET /resource
func *ResourceController) (c *ResourceController) (ctx i. ontext) {}
//GET /resource/{id}
func (c *ResourceController) عرض (tx http.Context) {}
// POST /resource
func (c *ResourceController) متجر (tx named@@). ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx }p. ontext) {}
// DELETE /resource/{id}
func (c *ResourceController) تدمير (tx http.Context) {}
```

## مسار المجموعة

```go
facades.Route().Group(function(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.request().Query("id", "1"))
  })
})
```

## بادئة توجيه

```go
facades.Route().Prefix("users").Get("/", userController.Show)
```

## مسار الملف

```go
استيراد "net/http"

facades.Route().Static("ثابت", "./public")
facades.Route().StaticFile("ملف ثابت"، "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## معلمات المسار

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

تفاصيل [Request](./requests)

## البرامج المتوسطة

```go
استيراد "github.com/goravel/framework/http/medileware"

facades.Route().Middleware(medileware.Cors())).Get("users", userController.Show)
```

تفاصيل [Middleware](./middlewares)

## طرق الرجوع

باستخدام طريقة "الخلفية"، يمكنك تحديد مسار سيتم تنفيذه عندما لا يتطابق أي مسار آخر مع طلب
الوارد.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "غير موجود")
})
```

## تحديد السعر

### تعريف حدود معدل

يتضمن Goravel خدمات قوية وقابلة للتخصيص للحد من المعدل الذي يمكنك استخدامه لتقييد كمية حركة المرور
لطريق معين أو مجموعة من الطرق. للبدء، يجب عليك تحديد إعدادات حدود المعدل التي تلبي احتياجات التطبيق
الخاص بك. عادةً ، يجب أن يتم هذا ضمن طريقة 'configureRateLimiting' لتطبيقك
'app/providers/route_service_provider.go'.

يتم تعريف حدود المعدل باستخدام طريقة `facades.RateLimiter()`'s `For`. طريقة "لأجل" تقبل اسم حدود المعدل
وإغلاق يعيد تكوين الحد الذي يجب أن ينطبق على المسارات التي يتم تعيينها لحدود المعدل.
اسم محدد السعر قد يكون أي سلسلة تريدها:

```go
استيراد (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"


func (المتلقي *RouteServiceProvider) configureRateLimiting() {
  . ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    Defit.PerMinute(1000)
  })
}
```

إذا كان الطلب الوارد يتجاوز حد المعدل المحدد، سيكون الرد برمز حالة HTTP 429 تلقائياً
إرجاع بواسطة Goravel. إذا كنت ترغب في تحديد ردّك الخاص الذي يجب إرجاعه بحد السعر، فيمكنك استخدام
طريقة الرد:

```go
facades.RateLimiter().For.("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.request().AbortWithStatus(http.StatusTooManyrequests)
  })
})
```

نظرًا لأن ردود مكالمات الحد تتلقى نموذج طلب HTTP الوارد، يمكنك بناء حد المعدل المناسب
بشكل ديناميكي بناء على الطلب الوارد أو المستخدم المصادق:

```go
facades.RateLimiter().For.("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // افترض
  if is_vip() {
    return Limit.PerMinute(100)


  Renl
})
```

#### حدود معدل التجزئة

أحياناً قد ترغب في تقسيم حدود المعدل ببعض القيمة الاعتباطية. على سبيل المثال، قد ترغب في السماح للمستخدمين بـ
الوصول إلى مسار معين 100 مرة في الدقيقة لكل عنوان IP لتحقيق ذلك، يمكنك استخدام طريقة "By" عند بناء
حد المعدل الخاص بك:

```go
facades.RateLimiter().For.("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return Limit.PerMinute(100).By(ctx.request().Ip())


  refl
})
```

لتوضيح هذه الميزة باستخدام مثال آخر، يمكننا الحد من الوصول إلى المسار إلى 100 مرة في الدقيقة لكل
معرف مستخدم مصادق عليه أو 10 مرات في الدقيقة لكل عنوان IP للضيوف:

```go
facades.RateLimiter().For.("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return Limit.PerMinute(100).By(userID)


  return limit.PerMinute(10).By(ctx.request().Ip())
})
```

#### حدود معدل متعددة

عند الحاجة، يمكنك إرجاع مجموعة من حدود المعدل لتكوين محدد معدل معين. كل حد معدل سيكون
مقيما للمسار بناء على الطلب الذي وضعوه داخل المصفوفة:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  العودة []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.request().Ip(),

})
```

### إرفاق حدود المعدل إلى المسارات

ويمكن إلحاق محددات القيمة بالطرق أو مجموعات الطرق التي تستخدم المنتوجات الوسيطة للخانق. The throttle middleware accepts
the name of the rate limiter you wish to assign to the route:

```go
استيراد github.com/goravel/framework/http/medileware

facades.Route().Middleware(medileware.Throttle("global").Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## تقاسم الموارد عبر المنشأ (CORS)

Goravel لديه CORS مفعل بشكل افتراضي، يمكن تعديل التكوين في `config/cors.go`.

> للحصول على مزيد من المعلومات عن عناوين CORS و CORS ، يرجى الرجوع إلى
> وثائق الويب [MDN على CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
