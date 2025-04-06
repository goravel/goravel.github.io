# طوابير

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Fortunately, Goravel offers a solution by allowing you to create queued jobs that
can run in the background. وبهذه الطريقة، عن طريق نقل المهام التي تستغرق وقتا طويلا إلى قائمة الانتظار، يمكن لتطبيقك أن يستجيب لطلبات الويب
أسرع بكثير، ويوفر تجربة مستخدم أفضل للعملاء الخاص بك. لتنفيذ هذه الميزة، نستخدم
`facades.Queue()`.

يتم حفظ خيارات تكوين قائمة الانتظار الخاصة بـ Goravelفي ملف تهيئة 'config/queue.go' الخاص بتطبيقك. Goravel
يدعم سائقين: `redis` و `sync`.

### الاتصالات Vs. طوابير

قبل الخوض في طوابير غورافيل ، من المهم فهم الفرق بين "الاتصالات" و"الإنتظار". في
ملف الإعداد، `config/queue.go`، ستجد صفيفا لتكوين `الاتصالات`. يحدد هذا الخيار
الاتصالات إلى خدمة قائمة الانتظار الخلفية مثل Redis. ومع ذلك، فإن كل اتصال في قائمة الانتظار يمكن أن يحتوي على "طوابع" متعددة، يمكن اعتبار
كأكوام أو أكوام مختلفة من الوظائف في قائمة الانتظار.

من الضروري ملاحظة أن كل مثال من أمثلة تكوين الاتصال في ملف تكوين قائمة الانتظار يتضمن سمة 'قائمة الانتظار\`
هذه السمة هي قائمة الانتظار الافتراضية التي سيتم إرسال الوظائف إليها عند إرسالها إلى اتصال
معين. بعبارات أبسط إذا أرسلتم وظيفة دون أن تحددوا بوضوح قائمة الانتظار التي ينبغي إرسالها إليها،
سيتم وضع المهمة في قائمة الانتظار المحددة في سمة قائمة الانتظار من تكوين الاتصال.

```go
// This job is sent to the default connection's default queue
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).Dispatch()

// This job is sent to the default connection's "emails" queue
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}).OnQueue("emails").Dispatch()
```

## إنشاء الوظائف

### توليد فئات الوظائف

بشكل افتراضي، يتم تخزين جميع الوظائف لتطبيقك في دليل "app/jobs". إذا لم يكن دليل 'app/Jobs\`
موجودا، فسيتم إنشاؤه عند تشغيل الأمر الفني 'make:job' Artisan:

```shell
ابدأ بالتشغيل. ابدأ تشغيل الحرفي:job ProcessPodcast
. الحرفية صنع:job user/ProcessPodcast
```

### بنية الصف الدراسي

ففئات الوظائف بسيطة جداً، وتتألف من طريقتين: "التوقيع" و"المعالجة". 'التوقيع' يعمل كمعرف مميز للمهمة
بينما 'Handle' ينفذ عند معالجة قائمة الانتظار للمهمة. بالإضافة إلى ذلك، فإن `[]que.Arg{}` قد اجتاز
عندما يتم تنفيذ المهمة سيتم نقلها إلى `Handle`:

```go
وظائف الحزمة

اكتب بنية ProprocessPodcast {


// توقيع اسم الوظيفة والتوقيع عليها.
Fc (الاستقبال *ProcessPodcast) Signature() string {
  return "process_podcast"


// Handle Execute the job.
مربع (مستلم *ProcessPodcast) Handle(args ...any) خطأ {
  return nil
}
```

### تسجيل الوظيفة

بعد إنشاء الوظيفة، تحتاج إلى تسجيلها في `app/provides/queue_service_provider.go`، بحيث يمكن تسميتها
بشكل صحيح.

```go
الفلك (المستلم *QueueServiceProvider) Jobs() []queue.Job {
  العودة []queue.Job{
    &jobs.Test{},
  }
}
```

## بدء خادم قائمة الانتظار

ابدأ خادم قائمة الانتظار في 'main.go' في الدليل الجذري.

```go
package main

import (
  "github.com/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // This bootstraps the framework and gets it ready for use.
  bootstrap.Boot()

  // Start queue server by facades.Queue().
  go func() {
    if err := facades.Queue().Worker().Run(); err != nil {
      facades.Log().Errorf("Queue run error: %v", err)
    }
  }()

  select {}
}
```

يمكن تمرير بارامترات مختلفة في طريقة 'facades.Queue().Worker'، يمكنك مراقبة قوائم الانتظار المتعددة عن طريق بدء
عدة 'facades.Queue().Worker'.

```go
// No parameters, default listens to the configuration in the `config/queue.go`, and the number of concurrency is 1
go func() {
  if err := facades.Queue().Worker().Run(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()

// Monitor processing queue for redis link, and the number of concurrency is 10
go func() {
  if err := facades.Queue().Worker(queue.Args{
    Connection: "redis",
    Queue: "processing",
    Concurrent: 10,
  }).Run(); err != nil {
    facades.Log().Errorf("Queue run error: %v", err)
  }
}()
```

## ارسال الوظائف

بمجرد أن تكون قد قمت بكتابة فئة العمل، يمكنك إرسالها باستخدام طريقة 'الإرسال\` في الوظيفة نفسها:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Dispatch()
  if err != nil {
    // do something
  }
}
```

### إرسال متزامن

إذا كنت ترغب في إرسال وظيفة على الفور (بالتزامن)، فيمكنك استخدام طريقة 'إرسال مزامنة'. عند استخدام طريقة
هذه الوظيفة لن تكون قائمة الانتظار وسيتم تنفيذها فورا ضمن العملية الحالية:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).DispatchSync()
  if err != nil {
    // do something
  }
}
```

### تسلسل الوظائف

التسلسل الوظيفي يسمح لك بتحديد قائمة الوظائف في قائمة الانتظار التي سيتم تنفيذها في ترتيب محدد. إذا فشلت أي وظيفة في التسلسل
، فلن يتم تنفيذ بقية الوظائف. لتشغيل سلسلة العمل في قائمة الانتظار، يمكنك استخدام طريقة "السلسلة" التي يوفرها
"facades.Queue()\`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []قائمة الإنتظار. rg{
      {النوع: "int", Vvalue: 1},
    },
  },
  {
    Job: &jobs. est1{},
    Args: []قائمة الانتظار. rg{
      {النوع: "int", Vvalue: 2},
    },
  },
}).رسالة()
```

### الإرسال المتأخر

إذا كنت ترغب في أن تحدد أنه لا يجب أن يقوم عامل قائمة الانتظار بتجهيز الوظيفة فوراً، يمكنك استخدام طريقة `التأخير`
أثناء إرسال العمل. على سبيل المثال، دعونا نحدد أن الوظيفة لا ينبغي أن تكون متاحة للمعالجة بعد 100
ثانية من الإرسال:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second))).Dispatch()
```

### تخصيص قائمة الانتظار والاتصال

#### إرسال إلى قائمة انتظار خاصة

By pushing jobs to different queues, you may "categorize" your queued jobs and even prioritize how many workers you
assign to various queues.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("المعالجة").Dispatch()
```

#### إرسال إلى اتصال معين

إذا كان تطبيقك يتفاعل مع اتصالات متعددة في قائمة الانتظار، يمكنك استخدام طريقة "OnConnection" لتحديد اتصال
الذي يتم الضغط على المهمة إليه.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("المزامنة").Dispatch()
```

يمكنك سلسلة طرق "OnConnection" و "Onqueue" معاً لتحديد الاتصال وقائمة الانتظار لوظيفة:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("المعالجة").Dispatch()
```

## الأنواع المدعومة \`listeue.Arg.Type'

```go
bool
int
int8
int16
int32
int64
uint
uint8
uint16
uint32
uint64
float32
float64
string
[]bool
[]int
[]int8
[]int16
[]int32
[]int64
[]uint
[]uint8
[]uint16
[]uint32
[]uint64
[]float32
[]float64
[]string
```
