# تسجيل

من أجل فهم حالة تشغيل التطبيق، يوفر Goravel خدمة تسجيل قوية يمكنها تسجيل
رسائل التسجيل وأخطاء النظام إلى ملف أو قنوات أخرى من خلال 'واجهات'. og()\`.

## الإعدادات

لتكوين قنوات تسجيل مختلفة، يمكن تكوين تكوينات مخصصة في `config/logging.go`.

يستخدم "Goravel" قناة "stack" لتسجيل السجلات بشكل افتراضي، يسمح "stack" بإعادة السجلات إلى قنوات متعددة.

يمكن لتكوين "print" في مشغل "single" و "daily" التحكم في إخراج السجل إلى وحدة التحكم.

## مشغلات القنوات المتاحة

| الاسم    | الوصف                 |
| -------- | --------------------- |
| `مكدس`   | السماح بقنوات متعددة  |
| `وحيد`   | ملف السجل الفردي      |
| `يوميا`  | ملف سجل واحد في اليوم |
| `custom` | محرك قرص مخصص         |

### حقن السياق

```go
facades.Log().WithContext(ctx)
```

## كتابة رسائل السجل

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
. og().Error(message)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### الكتابة إلى قناة محددة

في بعض الأحيان، قد ترغب في تسجيل الرسائل إلى قناة أخرى غير القناة الافتراضية للتطبيق:

```go
facades.Log().Channel("single").Info(message)
```

إذا كنت ترغب في الكتابة إلى قنوات متعددة في نفس الوقت، يمكنك استخدام طريقة "تكديس":

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## طرق السلسلة

ويوفر Goravel أساليب سلسلة مناسبة، تجعل من السهل إدراج معلومات أكثر فائدة في السجل:

```go
facades.Log().User("John").Debug(message)
```

| الطريقة  | اجراء                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------- |
| الكود    | تعيين رمز أو مسبار يصف السجل. (Automatic Translation)        |
| تلميح    | تعيين تلميح لتصحيح أخطاء أسرع.                                                  |
| في       | تعيين فئة أو نطاق الميزة التي يكون فيها إدخال السجل ذا صلة بالموضوع.            |
| المالك   | مفيد لأغراض التنبيه.                                                            |
| طلب      | يوفر http.request.                                              |
| الرد     | يوفر http.Response.                                             |
| الوسوم   | إضافة وسوم متعددة، وصف الميزة لإرجاع خطأ.                                       |
| المستخدم | تعيين المستخدم المرتبط بإدخال السجل. (Automatic Translation) |
| مع       | أضف أزواج القيمة الرئيسية إلى سياق إدخال السجل.                                 |
| السحب    | إضافة معلومات مكدس إلى إدخال السجل.                                             |

## إنشاء قناة مخصصة

إذا كنت ترغب في تحديد قناة مخصصة بالكامل، يمكنك تحديد نوع مشغل 'custom' في ملف 'config/logging.go\`ثم قم بإدراج خيار 'via' لتنفيذ بنية 'framework\contracts\log\Logger':

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### تشغيل السائق

تنفيذ واجهة 'Frame\contracts\log\Logger'.

```go
// framework/contracts/log/Logger
حزمة سجل

نوع واجهة تسجيل التسجيل {
  / / مسار تكوين قناة المرور باليد هنا
  Handle(سلسلة القناة) (Hook, خطأ)
}
```

يمكن تخزين الملفات في مجلد "app/extensions" (تعديل). مثال:

```go
package extensions

import (
  "fmt"

  "github.com/goravel/framework/contracts/log"
)

type Logger struct {
}

// Handle pass channel config path here
func (logger *Logger) Handle(channel string) (log.Hook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Levels monitoring level
func (h *Hook) Levels() []log.Level {
  return []log.Level{
    log.DebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log.ErrorLevel,
    log.FatalLevel,
    log.PanicLevel,
  }
}

// Fire execute logic when trigger
func (h *Hook) Fire(entry log.Entry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry.Context(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
