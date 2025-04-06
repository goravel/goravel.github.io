# استجابة HTTP

يمكنك استخدام 'ctx.Response()' لاستجابة HTTP في المراقب المالي.

## سلسلة

```go
استيراد "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "مرحبا غورافل")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx.Response().Json(http.StatusOK, struct {
  ID       uint `json:"id"`
  Name     string `json:"name"`
}{
  Id:      1,
  Front:   "Goravel",
})
```

## إرجاع مخصص

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## ملف الاستجابة

```go
استيراد "net/http"

ctx.Response().File("./public/logo.png")
```

## تحميل الملف

```go
استيراد "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## إرفاق رأس

```go
استيراد "github.com/goravel/framework/contracts/http"

ctx.Response().Header("محتوى"، "Goravel").String(http.StatusOK، "مرحبا غورافل")
```

## كوكي

### تعيين ملف تعريف الارتباط

استخدم طريقة "كوكي" في مثيل "الرد" لتعيين "كوكي". طريقة 'cookie' تقبل نموذج 'http.Cookie'
الذي يسمح لك بتعيين خيارات ملفات تعريف الارتباط المختلفة.

```go
استيراد (
  "time"
  "github.com/goravel/framework/contracts/http"


ctx.Response().Cookie()-p. ookie{
  الاسم: "الاسم"،
  القيمة: "Goravel"،
  المسار: "/"،
  النطاق: "goravel. ev",
  تنتهي صلاحيته: time.Now().Add.(24 * time.Hour),
  Secure: true,
  HttpOnly: true,
})
```

### ملفات تعريف الارتباط منتهية الصلاحية

استخدم طريقة 'WithoutCookie' لإزالة ملفات تعريف الارتباط.

```go
ctx.Response().WithoutCookie("الاسم")
```

## نجاح الإرجاع

```go
ctx.Response().Success().String("مرحبًا بمرحباً")
ctx.Response().Success().Json(http.Json{
  "مرحباً": "Goravel",
})
```

## رمز مخصص

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## تدفق الإرجاع

```go
ctx.Response().Stream(http.StatusCreated, function(w { p. خطأ treamWwriter) {
  البيانات:= []سلسلة{"a", "b", "c"}
  لـ _، البند := نطاق البيانات {
    إذا _، الخطأ := w. rite([]byte((البند + "\n")); err != صفر {
      return err
    }

    if err := w. لوش(); err != صفر {
      return err
    }

    time.Sleep(1 * وقت. ثانية)


  refl
})
```

## إعادة توجيه

```go
ctx.Response().Redirect(http.StatusMovedPermanly، "https://goravel.dev")
```

## لا يوجد محتوى

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## الحصول على رد

يمكنك الحصول على جميع المعلومات من `ctx.Response()`، التي يشيع استخدامها في وسط HTTP:

```go
الأصل := ctx.Response().الأصل ()
```

'الأصلي' يحتوي على بعض الطرق كما هو مبين أدناه：

| الطريقة | اجراء                       |
| ------- | --------------------------- |
| الجسم   | الحصول على بيانات الاستجابة |
| رأس     | احصل على رأس الاستجابة      |
| الحجم   | الحصول على حجم الاستجابة    |
| الحالة  | الحصول على حالة الاستجابة   |
