# حاوية الخدمة

وحاوية خدمات غورافيل هي أداة قوية لإدارة حالات التبعية الطبقية وأداء حقن التبعية. إنها
تحتوي على جميع وحدات Goravel، وتسمح لك بربط خدماتك الخاصة بالحاوية وحلها عند الحاجة.
وتوفر حاوية الخدمات دعماً قوياً لحزم أطراف ثالثة حول غورافل.

## ربط

### ربطات بسيطة

سيتم تسجيل جميع ارتباطات حاويات الخدمة الخاصة بك تقريبا داخل [مزودي الخدمات](./providers).
في إطار موفر خدمة، لديك دائماً حق الوصول إلى الحاوية عن طريق معلمة "التطبيق"، ثم قم بتسجيل الربط
باستخدام طريقة "بيند"، اجتياز \`المفتاح' الذي نود تسجيله مع إغلاق يعيد حالة من الفئة
:

```go
مسار الحزمة

الاستيراد (
 "github.com/goravel/framework/contracts/foundation"


Bbinding = "goravel. انطلاق"

نوع بنية خدمة المزود {


func (الطريق *Serviceمقدمي الخدمة) (مؤسسة التطبيق). التكرار) {
 app.Bind(Binding, function(Foundation.Application) (أي خطأ) {
  RewNewRoute(التطبيق. akeConfig())، صفر
 })


func (الطريق *Serviceproviders ) Boot(app Foundation.Application) {

}
```

وكما ذُكر آنفاً، فإنك عادة ما تتفاعل مع الحاوية داخل مقدمي الخدمات؛ مع ذلك، إذا كنت ترغب في أن يتفاعل
مع الحاوية خارج موفر الخدمات، فيمكنك القيام بذلك عبر واجهة `التطبيق`:

```go
facades.App().Bind("key", function(Foundation.Application) (أي خطأ) {
    ...
})
```

### ربط A Singleton

والأسلوب "Singleton" يربط فئة أو واجهة في الحاوية لا ينبغي حلها إلا مرة واحدة. حالما يتم حل الربط من نوع
singleton ، سيتم إرجاع نفس مثيل الكائن في المكالمات اللاحقة إلى الحاوية:

```go
app.Singleton(key, function(app Foundation.Application) (أي خطأ) {
    العودة NewGin(app.MakeConfig()), nl
})
```

### حالات الربط

يمكنك أيضا ربط مثيل كائن موجود في الحاوية باستخدام طريقة "Instance". المثيل المعطى سيكون
دائماً في المكالمات اللاحقة إلى الحاوية:

```go
app.Instance(المفتاح، مثال)
```

### ربط مع المعلمة

إذا كنت بحاجة إلى بعض المعلمات الإضافية لبناء موفر الخدمة، فيمكنك استخدام طريقة "بينداب" لتمرير معلمات
إلى الإغلاق:

```go
app.Bindwith(Binding, func(app Foundation.Application, parameters map[string]any) (أي خطأ) {
    العودة NewRoute(app.MakeConfig(), nl
})
```

## حل

### طريقة "ماكي"

يمكنك استخدام طريقة "Make" لحل نموذج درجة من الحاوية. The `Make` method accepts the `key` you
wish to resolve:

```go
مثال خطأ:= app.Make(المفتاح)
```

If you are outside of a service provider in a location of your code that does not have access to the `app` variable, you
may use the `App` facade to resolve a class instance from the container:

```go
مثال: خطأ:= facades.App().Make(key)
```

### طريقة "ماكيفيو"

If some of your class's dependencies are not resolvable via the container, you may inject them by passing them as an
associative array into the `MakeWith` method, corresponding to the `BindWith` binding method:

```go
مثال خطأ:= app.MakeWith(key, map[string]any{"id": 1})
```

### أساليب أخرى

The framework provides some convenient methods to quickly resolve various facades: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
