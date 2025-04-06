# جدولة المهمة

في الماضي، قد تحتاج إلى إنشاء إدخال تكوين كرون لكل مهمة تحتاج إلى جدولة على الخادم الخاص بك.
ومع ذلك، يمكن أن يصبح هذا النهج ألم بسرعة لأن الجدول الزمني للمهمة الخاص بك ليس في التحكم في المصادر، ويجب عليك أن تصل إلى SSH
في الخادم الخاص بك لعرض أو إضافة/تحرير إدخالات كرون.

يوفر جدولة الأوامر لجورافيل طريقة جديدة لإدارة المهام المجدولة على الخادم الخاص بك. With the scheduler, you
can easily and clearly define your command schedule within your Goravel application. باستخدام الجدول، تحتاج فقط
لإنشاء إدخال كرون واحد على الخادم الخاص بك.

## تعريف الجداول الزمنية

لجدولة المهام لتطبيقك، يمكنك تعريفها في طريقة 'Schedule' في 'app\console\kernel.go\`. Let's
consider an example to understand this better. In this case, we want to schedule a closure that will run every day at
midnight. في إطار هذا الإغلاق، سنقوم بتنفيذ استعلام قاعدة البيانات لمسح الجدول:

```go
وحدة تحكم الطرد

استيراد (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"

  "goravel/app/models"


من نوع Kernel struct {
}

func (kernel Kernel) Schedule() []schedu. حدث {
  العودة []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().حيث ("1 = 1").Delete(&models.User{})
    }).Daily(),

}
```

### جدولة الأوامر الحرفية

بالإضافة إلى جدولة الإغلاقات، يمكنك أيضًا جدولة [الأوامر الحرفية](./artisan). على سبيل المثال، يمكنك
استخدام طريقة "الأمر" لجدولة أمر حرفي إما باستخدام اسم الأمر أو الصف الدراسي.

```go
وحدة تحكم الطرد

استيراد (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"



من نوع Kernel بنيت {


Fc (kernel *Kernel) Schedule() []schedu. الحدث {
  العودة []schedule.Event{
    facades.Schedule().command("send:emails name").Daily(),

}
```

### مستوى قطع الأشجار

عندما يكون \`app.debug' 'true'، ستطبع وحدة التحكم جميع السجلات. خلاف ذلك، سيتم طباعة سجلات مستوى "الخطأ" فقط.

### جدولة خيارات التردد

لقد رأينا بالفعل بعض الأمثلة عن كيفية تكوين مهمة لتشغيلها في فواصل محددة. ومع ذلك، هناك العديد من
المزيد من ترددات الجدول الزمني للمهام التي يمكن تعيينها للمهام:

| 方法                      | 描述                                                  |
| ----------------------- | --------------------------------------------------- |
| `.Cron("* * * * *")`    | تشغيل المهمة على جدول كرون مخصص                     |
| `.EveryMinute()`        | تشغيل المهمة كل دقيقة                               |
| `.EveryTwoMinutes()`    | تشغيل المهمة كل دقيقتين                             |
| `.EveryThreeMinutes()`  | تشغيل المهمة كل ثلاث دقائق                          |
| `.EveryFourMinutes()`   | تشغيل المهمة كل أربع دقائق                          |
| `.EveryFiveMinutes()`   | تشغيل المهمة كل خمس دقائق                           |
| `.EverytenMinutes()`    | تشغيل المهمة كل عشر دقائق                           |
| `.Every15-Minutes()`    | تشغيل المهمة كل خمس عشرة دقيقة                      |
| `.EveryThirtyMinutes()` | تشغيل المهمة كل ثلاثين دقيقة                        |
| `.ساعة()`               | تشغيل المهمة كل ساعة                                |
| `.HourlyAt(17)`         | قم بتشغيل المهمة كل ساعة بعد 17 دقيقة من الساعة     |
| `.EveryoHours()`        | تشغيل المهمة كل ساعتين                              |
| `.EveryThreeHours()`    | تشغيل المهمة كل ثلاث ساعات                          |
| `.EveryFourHours()`     | تشغيل المهمة كل أربع ساعات                          |
| `.EverySixHours()`      | تشغيل المهمة كل ست ساعات                            |
| `.Daily()`              | تشغيل المهمة كل يوم في منتصف الليل                  |
| `.DailyAt("13:00")`     | تشغيل المهمة كل يوم في الساعة 13:00 |

### منع تداخل المهام

بشكل افتراضي، ستستمر المهام المجدولة في العمل حتى لو كان مثيل سابق لا يزال قيد التشغيل. To prevent this, use the
following methods:

| 方法                       | 描述                                |
| ------------------------ | --------------------------------- |
| `.SkipIfStillRunning()`  | تخطي إذا كان لا يزال قيد التشغيل  |
| `.DelayIfStillRunning()` | تأخير إذا كان لا يزال قيد التشغيل |

```go
facades.Schedule().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Schedule().command("send:emails name").EveryMinute().DelayIfStillRunning()
```

### تشغيل المهام على خادم واحد

> لاستخدام هذه الميزة، يجب أن يستخدم التطبيق الخاص بك مشغل ذاكرة التخزين المؤقت أو الدينامودب أو ذاكرة التخزين المؤقت redis كمشغل ذاكرة التخزين المؤقت
> الافتراضي. بالإضافة إلى ذلك، يجب أن تكون جميع الخوادم متصلة بنفس خادم ذاكرة التخزين المؤقت المركزي.

إذا كان جدولة طلبك يعمل على خوادم متعددة، يمكنك التأكد من أن العمل المجدول يتم تنفيذه على واحد فقط من
منها. على سبيل المثال، دعونا نقول أن لديك مهمة مجدولة تنتج تقريرا جديدا كل ليلة جمعة. If the task
scheduler runs on three worker servers, the scheduled task will run on all three servers and create the report three
times. هذا ليس مثاليا!

لمنع هذا، استخدم طريقة "OnOneServer" عند تحديد المهمة المجدولة، والتي ستتأكد من أن المهمة تعمل
على خادم واحد فقط. الخادم الأول الذي سيتلقى المهمة سيضمن قفلاً ذرياً على العمل، منع الخوادم الأخرى
من تنفيذ نفس المهمة في نفس الوقت:

```go
facades.Schedule().command("report:generate").Daily().OnOneServer()
```

يجب أن يعطى الإغلاقات المجدولة اسماً إذا كان من المزمع تشغيلها على خادم واحد:

```go
facades.Schedule().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## تشغيل الجدولة

الآن بعد أن تعلمنا كيفية تحديد المهام المجدولة، دعونا نناقش كيفية تشغيلها بالفعل على خادمنا.

أضف 'go facades.Schedule().Run()' إلى ملف 'main.go' الجذر.

```go
استيراد الحزمة الرئيسية

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"


ch() mainformat@@3
  // هذا التمهيد هو جاهز للاستخدام.
  bootstrap.Boot()

  // بدء الجدول بواسطة facades.Schedule
  go facades.Schedule().Run()

  اختر {}
}
```

## إيقاف المجدول

يمكنك استدعاء طريقة "إيقاف التشغيل" لإغلاق الجدولة بسهولة. هذه الطريقة ستنتظر جميع المهام ل
اكتمالها قبل إيقاف التشغيل.

```go
//main.go
bootstrap.Boot()

// إنشاء قناة للاستماع إلى إشارات نظام التشغيل
الإقلاع عن التدخين:= make(chan os.Signal)
otify(quit, syscall.SIGINT, syscall.SIGTERM)

// جدول البدء بواسطة facades.Schedule
انتقل إلى facades.Schedule(). un()

// الاستماع لإشارة OS
اذهب إلى الدالة () {
  <-quit
  إذا كان الخطأ := واجهة. chedule().Shutdown(); err != صفر {
    واجهة. og().Errorf("جدولة خطأ الإغلاق: %v", err)


  os.Exit(0)
}()

اختر {}
```
