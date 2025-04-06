# المصانع

عند اختبار التطبيق الخاص بك أو تشغيل قاعدة البيانات الخاصة بك، قد يكون من الضروري إدراج بعض السجلات في قاعدة البيانات الخاصة بك
مسبقا. بدلا من إدخال قيم يدويا لكل عمود، يسمح لك Goravel بتحديد مجموعة من السمات الافتراضية
لكل من النماذج الخاصة بك عن طريق إنشاء مصانع نموذجية.

To see an example of how to write a factory, you can check out the `user_factory.go` file located in your application's
`database/factories` directory.

```go
مصانع الحزمة

نوع بنية مصنع المستخدم {


/ / تعريف تعريف الحالة الافتراضية للنموذج.
ترميز (f *مصنع المستخدم) تعريف() خريطة[string]أي {
  خريطة العودة[string]أي,
    "الاسم": "Goravel",

}
```

وكما ترون فإن المصانع في أبسط أشكالها هي مصانع ذات أسلوب "التعريف". ترجع هذه الطريقة المجموعة الإفتراضية
من قيم السمة التي يجب استخدامها عند إنشاء نموذج مع المصنع. لإنشاء مجموعة من البيانات
عشوائية، يمكنك الاعتماد على [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## توليد المصانع

لإنشاء مصنع، قم بتشغيل الأمر الفني \`make:factory':

```
تشغيل . مصنع حرفي: مصنع بريد المصنع
```

سيتم وضع "هيكل" المصنع الجديد في دليل "قاعدة البيانات/المصانع" الخاص بك.

### نماذج واتفاقيات اكتشاف المصانع

بعد تحديد المصنع، يمكنك استخدام طريقة "المصنع()" في النموذج لربط المصنع بالنموذج:

```go
package models

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github.com/goravel/framework/database/orm"

  "goravel/database/factories"
)

type User struct {
  orm.Model
  Name   string
  Avatar string
  orm.SoftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## إنشاء نماذج باستخدام المصانع

### نماذج مبسطة

يمكننا استخدام طريقة "Make" لإنشاء نماذج دون استمرارها في قاعدة البيانات:

```go
تطبيق نماذج المستخدم.المستخدم
خطأ:= facades.Orm().Factory().Make(&user)
```

يمكنك إنشاء مجموعة من العديد من النماذج باستخدام طريقة "العداد":

```go
المستخدمين []models.user
err := facades.Orm().Factory().Count(2).Make(&users)
```

إذا كنت ترغب في تجاوز بعض القيم الافتراضية للنماذج الخاصة بك، فيمكنك تمرير 'map[string]any' إلى طريقة 'Make'
. سيتم استبدال السمات المحددة فقط بينما تبقى بقية السمات محددة إلى القيم
الافتراضية الخاصة بها كما يحددها المصنع:

```go
vuser models.user
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### النماذج المستمرة

طريقة "إنشاء" تخلق وتحفظ نماذج نموذجية لقاعدة البيانات باستخدام طريقة "حفظ".

```go
vuser models.user
err := facades.Orm().Factory().Create(&user)

var users []models.user
err := facades.Orm().Factory().Count(2).Create(&users)
```

يمكنك تجاوز سمات نموذج المصنع الافتراضية عن طريق تمرير 'خريطة[string]أي` من السمات إلى طريقة 'إنشاء`
:

```go
vuser models.user
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### تجاهل نموذج الحدث

قد يكون هناك [حدث نموذجي](../orm/quickstart#events) معرف في النموذج، يمكنك تجاهل تلك الأحداث باستخدام طريقة
'إنشاء' :

```go
نماذج المستخدم.المستخدم
خطأ:= facades.Orm().Factory().CreateQuietly(&user)
```
