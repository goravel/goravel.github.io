# وحدة تحكم Artisan

Artisan هي أداة CLI التي تأتي مع Goravel للتفاعل مع سطر الأوامر. يمكنك الوصول إليها باستخدام
`facades.Artisan()`. تحتوي هذه الأداة على العديد من الأوامر المفيدة التي يمكن أن تساعدك في تطوير تطبيقك.
استخدم الأمر التالي لعرض جميع الأوامر المتاحة.

```shell
go run . artisan list
```

يحتوي كل أمر أيضًا على ميزة "مساعدة" تعرض وتشرح الوسائط والخيارات المرتبطة بالأمر. لرؤية
شاشة المساعدة، ما عليك سوى إضافة "help" قبل اسم الأمر.

```shell
go run . artisan help migrate
```

بدلاً من تكرار الأمر `go run . artisan ...`، قد ترغب في إضافة اختصار إلى تكوين shell الخاص بك باستخدام
الأمر التالي في الطرفية:

```shell
echo -e "\r\nalias artisan=\"go run . artisan\"" >>~/.zshrc
```

ثم يمكنك ببساطة تشغيل أوامرك بهذه الطريقة:

```shell
artisan make:controller DemoController
```

يمكنك أيضًا استخدام سكريبت `artisan` بهذه الطريقة:

```shell
./artisan make:controller DemoController
```

### إنشاء الأوامر

يمكنك استخدام أمر `make:command` لإنشاء أمر جديد في دليل `app/console/commands`. لا تقلق إذا لم يكن هذا الدليل موجودًا في تطبيقك، سيتم إنشاؤه في المرة الأولى التي تقوم فيها بتشغيل أمر `make:command`:

```shell
go run . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### هيكل الأمر

بعد إنشاء الأمر الخاص بك، قم بتعيين قيم مناسبة لخصائص التوقيع والوصف للهيكل. سيتم استدعاء طريقة
`Handle` عند تنفيذ الأمر الخاص بك. تحتاج إلى تنفيذ المنطق الخاص بك في هذه الطريقة.

```go
package commands

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Signature اسم وتوقيع أمر وحدة التحكم.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Description وصف أمر وحدة التحكم.
func (receiver *SendEmails) Description() string {
  return "إرسال رسائل البريد الإلكتروني"
}

// Extend امتداد أمر وحدة التحكم.
func (receiver *SendEmails) Extend() command.Extend {
  return command.Extend{}
}

// Handle تنفيذ أمر وحدة التحكم.
func (receiver *SendEmails) Handle(ctx console.Context) error {
  return nil
}
```

## إدخال/إخراج الأوامر

### استرجاع المدخلات

عند كتابة أوامر وحدة التحكم، من المعتاد جمع مدخلات المستخدم من خلال `arguments` أو `options`. مع Goravel، من
السهل للغاية استرجاع الوسيطات والخيارات التي يوفرها المستخدم.

#### الوسيطات

اتبع الوسيطات بعد الأمر:

```shell
go run . artisan send:emails NAME EMAIL
```

الحصول على الوسيطات:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### الخيارات

الخيارات، مثل الوسيطات، هي شكل آخر من أشكال إدخال المستخدم. يتم وضع شرطتين (--) قبل الخيارات عندما يتم توفيرها
عبر سطر الأوامر.

التعريف:

```go
func (receiver *ListCommand) Extend() command.Extend {
  return command.Extend{
    Flags: []command.Flag{
      &command.StringFlag{
        Name:    "lang",
        Value:   "default",
        Aliases: []string{"l"},
        Usage:   "لغة التحية",
      },
    },
  }
}
```

الحصول:

```go
func (receiver *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

الاستخدام:

```shell
go run . artisan emails --lang Arabic
go run . artisan emails -l Arabic
```

ملاحظة: عند استخدام كل من الوسيطات والخيارات، قم بتعريف الخيارات قبل الوسيطات. مثال:

```shell
// صحيح
go run . artisan emails --lang=Chinese name
// خطأ
go run . artisan emails name --lang=Chinese name
```

باستثناء `command.StringFlag`، يمكننا أيضًا استخدام أنواع أخرى من `Flag` و `Option*`: `StringSliceFlag`، `BoolFlag`،
`Float64Flag`، `Float64SliceFlag`، `IntFlag`، `IntSliceFlag`، `Int64Flag`، `Int64SliceFlag`.

### طلب الإدخال

#### طرح الأسئلة

بالإضافة إلى الوسيطات والخيارات، يمكنك أيضًا مطالبة المستخدم بإدخال بيانات أثناء تنفيذ الأمر. طريقة
`Ask` ستطلب من المستخدم السؤال المعطى وتعيد استجابتهم:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  email, err := ctx.Ask("ما هو عنوان بريدك الإلكتروني؟")
  
  return err
}
```

بالإضافة إلى ذلك، يمكنك تمرير خيارات إلى طريقة `Ask` كوسيط ثانٍ اختياري:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    name, err := ctx.Ask("ما هو اسمك؟", console.AskOption{
        Default: "Krishan",
    })
    
    return err
}

// الخيارات المتاحة
type AskOption struct {
    // Default القيمة الافتراضية للإدخال.
    Default string
    // Description وصف الإدخال.
    Description string
    // Lines عدد الأسطر للإدخال (يستخدم للنص متعدد الأسطر).
    Lines int
    // Limit حد الأحرف للإدخال.
    Limit int
    // Multiple يحدد ما إذا كان الإدخال سطرًا واحدًا أو نصًا متعدد الأسطر.
    Multiple bool
    // Placeholder العنصر النائب للإدخال.
    Placeholder string
    // Prompt رسالة المطالبة (تستخدم لإدخال سطر واحد).
    Prompt string
    // Validate دالة التحقق من صحة الإدخال.
    Validate func(string) error
}
```

في بعض الأحيان قد تحتاج إلى إخفاء إدخال المستخدم، مثل عند طلب كلمة مرور. يمكنك استخدام طريقة `Secret` لإخفاء
إدخال المستخدم:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    password, err := ctx.Secret("ما هي كلمة المرور؟", console.SecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors.New("يجب أن يكون طول كلمة المرور 8 أحرف على الأقل")
            }
            return nil
        },
    })
    
    return err
}

// الخيارات المتاحة
type SecretOption struct {
    // Default القيمة الافتراضية للإدخال.
    Default string
    // Description وصف الإدخال.
    Description string
    // Limit حد الأحرف للإدخال.
    Limit int
    // Placeholder العنصر النائب للإدخال.
    Placeholder string
    // Validate دالة التحقق من صحة الإدخال.
    Validate func(string) error
}
```

#### تأكيد الإجراءات

إذا كنت بحاجة إلى أن تطلب من المستخدم تأكيد إجراء قبل المتابعة، يمكنك استخدام طريقة `Confirm`. بشكل افتراضي، ستعيد هذه الطريقة `false` ما لم يختر المستخدم الخيار الإيجابي.

```go
if answer, _ := ctx.Confirm("هل ترغب في المتابعة؟"); !answer {
    // ...
}
```

يمكنك أيضًا تمرير وسيط ثانٍ إلى طريقة `Confirm` لتخصيص القيمة الافتراضية، وتسمية الأزرار الإيجابية والسلبية:

```go
if answer, _ := ctx.Confirm("هل ترغب في المتابعة؟", console.ConfirmOption; !answer {
 Default : true,
 Affirmative : "نعم",
 Negative : "لا",
}) {
    // ...
}

// الخيارات المتاحة
type ConfirmOption struct {
    // Affirmative تسمية للزر الإيجابي.
    Affirmative string
    // Default القيمة الافتراضية للإدخال.
    Default bool
    // Description وصف الإدخال.
    Description string
    // Negative تسمية للزر السلبي.
    Negative string
}
```

#### أسئلة الاختيار الفردي

إذا كنت بحاجة إلى سؤال المستخدم لاختيار خيار من قائمة الخيارات، يمكنك استخدام طريقة `Choice`. ستقوم طريقة `Choice` بإرجاع قيمة الخيار المحدد:

```go
question := "ما هي لغة البرمجة المفضلة لديك؟"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}
color, err := ctx.Choice(question, options)
```

بالإضافة إلى ذلك، يمكنك تمرير خيارات إلى طريقة `Choice` كوسيط ثانٍ اختياري:

```go
question := "ما هي لغة البرمجة المفضلة لديك؟"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}

color, err := ctx.Choice(question, options, console.ChoiceOption{
    Default: "go",
})

// الخيارات المتاحة
type ChoiceOption struct {
    // Default القيمة الافتراضية للإدخال.
    Default string
    // Description وصف الإدخال.
    Description string
    // Validate دالة التحقق من صحة الإدخال.
    Validate func(string) error
}
```

#### أسئلة الاختيار المتعدد

إذا كنت بحاجة إلى أن تطلب من المستخدم تحديد خيارات متعددة من قائمة الخيارات، يمكنك استخدام طريقة `MultiSelect`. ستقوم طريقة `MultiSelect` بإرجاع قيم الخيارات المحددة:

```go
question := "ما هي لغات البرمجة المفضلة لديك؟"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}
colors, err := ctx.MultiSelect(question, options)
```

بالإضافة إلى ذلك، يمكنك تمرير خيارات إلى طريقة `MultiSelect` كوسيط ثانٍ اختياري:

```go
question := "ما هي لغات البرمجة المفضلة لديك؟"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}

colors, err := ctx.MultiSelect(question, options, console.MultiSelectOption{
    Default: []string{"go", "php"},
})

// الخيارات المتاحة
type MultiSelectOption struct {
    // Default القيمة الافتراضية للإدخال.
    Default []string
    // Description وصف الإدخال.
    Description string
    // Filterable يحدد ما إذا كان يمكن تصفية الخيارات، اكتب `/` لبدء التصفية.
    Filterable bool
    // Limit عدد الخيارات التي يمكن تحديدها.
    Limit int
    // Validate دالة التحقق من صحة الإدخال.
    Validate func([]string) error
}
```

### كتابة المخرجات

في بعض الأحيان قد تحتاج إلى كتابة مخرجات إلى وحدة التحكم. توفر Goravel العديد من الطرق لمساعدتك في كتابة المخرجات
إلى وحدة التحكم. كل طريقة لديها مخرجات ملونة مناسبة. على سبيل المثال، سيعرض `Error` النص
باللون الأحمر.

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  ctx.Comment("هذه رسالة تعليق")
  ctx.Info("هذه رسالة معلومات")
  ctx.Error("هذه رسالة خطأ")
  ctx.Line("هذه رسالة سطر")
  ctx.Warning("هذه رسالة تحذير")
  return nil
}
```

يمكنك استخدام طريقة `NewLine` لكتابة سطر جديد في وحدة التحكم:

```go
// كتابة سطر فارغ واحد
ctx.NewLine()

// كتابة أسطر فارغة متعددة
ctx.NewLine(2)
```

#### أشرطة التقدم

بالنسبة للمهام التي تستغرق وقتًا طويلاً، غالبًا ما يكون من المفيد تزويد المستخدم بمؤشر على المدة التي ستستغرقها المهمة. يمكنك استخدام طريقة `WithProgressBar` لعرض شريط التقدم.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

في بعض الأحيان قد تحتاج إلى تحديث شريط التقدم يدويًا. يمكنك استخدام طريقة `CreateProgressBar` لتحديث شريط التقدم:

```go
users := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar.Start()

for _, user := range users {
    // معالجة المستخدم
    bar.Advance()
 
 // انتظر قليلاً لمحاكاة المعالجة 
    time.Sleep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### المؤشر الدوار

إذا كنت بحاجة إلى عرض مؤشر دوار أثناء تشغيل مهمة، يمكنك استخدام طريقة `Spinner`.

```go
err := ctx.Spinner("جاري التحميل...", console.SpinnerOption{
    Action: func() error {
        // متى يتوقف المؤشر الدوار
        time.Sleep(2 * time.Second)
        return nil
    },
})
```

## الفئة

يمكنك تعيين مجموعة من الأوامر لنفس الفئة، وهو أمر مناسب في `go run . artisan list`:

```go
// توسيع امتداد أمر وحدة التحكم.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## تسجيل الأوامر

يجب تسجيل جميع أوامر وحدة التحكم الخاصة بك ضمن دالة `Commands` في `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## تنفيذ الأوامر برمجياً

في بعض الأحيان قد ترغب في تنفيذ أمر Artisan خارج واجهة سطر الأوامر، يمكنك استخدام طريقة `Call` في
`facades.Artisan()` للقيام بذلك.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinese name") // مع وسيطات وخيارات
})
```
