# الأحداث

توفر أحداث غورافيل تنفيذ نمط مراقبة بسيط، مما يسمح لك بالاشتراك والاستماع إلى أحداث
مختلفة التي تحدث في التطبيق الخاص بك. يتم تخزين فئات الأحداث عادة في دليل "التطبيقات/الأحداث"، في حين يتم تخزين مستمعي
في "التطبيقات/المستمعين". Don't worry if you don't see these directories in your application as they will
be created for you as you generate events and listeners using Artisan console commands.

الأحداث هي وسيلة رائعة للفصل بين مختلف جوانب طلبك، كحدث واحد يمكن أن يحتوي على مستمعين متعددين من
لا يعتمدون على بعضهم البعض. For example, you may wish to send a Slack notification to your user each
time an order is shipped. بدلاً من ربط رمز معالجة طلبك مع رمز إشعار Slack الخاص بك، يمكنك رفع
حدث 'app\events\OrderShipped' الذي يمكن للمستمع أن يستلمه ويستخدم لإرسال إشعار Slack .

## تسجيل الأحداث والمستمعين

يوفر برنامج 'app\providers\EventServiceServiceprovider' المضمن مع تطبيق Goravel الخاص بك مكان مناسب للتسجيل
جميع مستمعي أحداث تطبيقك. طريقة "الاستماع" تحتوي على مجموعة من جميع الأحداث (المفاتيح) ومستمعي
الخاص بهم (قيم). يمكنك إضافة عدد من الأحداث إلى هذه الصفيفة حسبما يتطلبه تطبيقك. على سبيل المثال، دعونا نضيف حدث
`الطلب الشحن`:

```go
package providers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/facades"

  "goravel/app/events"
  "goravel/app/listeners"
)

type EventServiceProvider struct {
}

...

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
  return map[event.Event][]event.Listener{
    &events.OrderShipped{}: {
      &listeners.SendShipmentNotification{},
    },
  }
}
```

### توليد الأحداث والمستمعين

يمكنك استخدام الأمرين "make:event" و "make:listen" Artisan لإنشاء أحداث ومستمع فرديين:

```go
ابدأ بالتشغيل. ابدأ تشغيل الحرفية :event PodcastProcessed
. ابدأ تشغيل الحرفية :event user/PodcastProcessed

. فن صامع:listener SendPodcastNotification
يتم تشغيله. الحرفي صنع:listener user/SendPodcastNotification
```

## تعريف الأحداث

فئة الحدث هي أساسا حاوية بيانات تحمل المعلومات المتعلقة بالحادث، طريقة 'Handle' من
'event' تمر في الحدث وتعيد '[]'. بنية rg'، التي يمكن استخدامها لمعالجة البيانات. The processed data will
then be passed on to all associated `listeners`. على سبيل المثال، دعونا نفترض حدث `app\events\OrderShipped`:

```go
حزمة الأحداث

استيراد "github.com/goravel/framework/contracts/event"

نوع OrderShipped struct {
}

Fc (مستقبل *OrderShippe) Handle(args []event.Arg) ([]event.Arg, error) {
  return args, nil
}
```

## تعريف المستمعين

بعد ذلك، دعونا نلقي نظرة على المستمع لحدث مثالنا. يستلم مستمعو الأحداث '[]event.Arg` من الحدث
'Handle' طريقة العودة. وفي إطار طريقة 'المعالجة`، يمكنكم القيام بأي إجراءات ضرورية للاستجابة للحدث:

```go
package listeners

import (
  "github.com/goravel/framework/contracts/event"
)

type SendShipmentNotification struct {
}

func (receiver *SendShipmentNotification) Signature() string {
  return "send_shipment_notification"
}

func (receiver *SendShipmentNotification) Queue(args ...any) event.Queue {
  return event.Queue{
    Enable:     false,
    Connection: "",
    Queue:      "",
  }
}

func (receiver *SendShipmentNotification) Handle(args ...any) error {
  return nil
}
```

### إيقاف نشر الحدث

وفي بعض الأحيان، قد ترغب في وقف نشر حدث ما على المستمعين الآخرين. يمكنك فعل ذلك عن طريق إرجاع خطأ من
طريقة 'Handle' للمستمع الخاص بك.

## مستمع الحدث في قائمة الانتظار

Queueing listeners can be beneficial if your listener is going to perform a slow task such as sending an email or making
an HTTP request. قبل استخدام المستمعين في قائمة الإنتظار، تأكد من [تكوين قائمة الإنتظار] (queues) وابدأ عامل الإنتظار
على الخادم أو بيئة التطوير المحلية.

```go
مستمعو الحزمة

...

Fc (مستقبل *إرسال الشحنة) قائمة الانتظار (args ...any) حدث.قائمة الانتظار {
  حدث العودة. ueue{
    تمكين: خاطئ،
    اتصال: "",
    قائمة الانتظار: ""،



func (المستلم *SendShipmentNotification) Handle(args . .any) خطأ {
  اسم := args[0]

  Renl
}
```

### معاملات مستمعي وقاعدة البيانات في قائمة الانتظار

عندما يتم إرسال المستمعين في قائمة الانتظار ضمن معاملات قاعدة البيانات، قد يقوم قائمة الانتظار بمعالجتهم قبل تنفيذ معاملة قاعدة البيانات
. عندما يحدث ذلك، أي تحديثات قمت بها إلى نماذج أو سجلات قاعدة البيانات أثناء معاملة قاعدة البيانات
قد لا تظهر بعد في قاعدة البيانات. بالإضافة إلى ذلك، قد لا توجد في قاعدة البيانات أي نماذج أو سجلات قاعدة بيانات تم إنشاؤها
داخل المعاملة. إذا كان المستمع يعتمد على هذه النماذج، يمكن أن تحدث أخطاء غير متوقعة
عندما تتم معالجة الوظيفة التي ترسل المستمع في قائمة الانتظار. في هذا الوقت، يجب وضع الحدث خارج
معاملات قاعدة البيانات.

## إرسال الأحداث

يمكننا إرسال الأحداث بواسطة أسلوب `facades.Event().Job().Dispatch()`.

```go
package controllers

import (
  "github.com/goravel/framework/contracts/event"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/events"
)

type UserController struct {
}

func (r UserController) Show(ctx http.Context) {
  err := facades.Event().Job(&events.OrderShipped{}, []event.Arg{
    {Type: "string", Value: "Goravel"},
    {Type: "int", Value: 1},
  }).Dispatch()
}
```

## الأنواع المدعومة 'event.Arg.Type'

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
