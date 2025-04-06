# المقاطع

يوفر Goravel مكتبة للتلاعب بالسلاسل بطلاقة تمكنك من التلاعب بالسلاسل بسهولة. تتيح لك السلاسل المتدفقة
الجمع بين عمليات سلاسل متعددة من خلال سلسلة الطريقة، حيث ترجع معظم الطرق مثيل
من \`الدعم/السلسلة. تعاقب ، يسمح لك بتسلسل طرق إضافية. للحصول على قيمة السلسلة النهائية بعد تطبيق العمليات المتسلسلة
، يمكنك استدعاء طريقة "String" ، التي ترجع قيمة "السلسلة" الأساسية.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## الطرق المتاحة

### `Of`

وتنشئ طريقة "Of" مثالاً جديداً لسلسلة طلاء من سلسلة معينة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `بعد`

وتعيد الطريقة 'التالية\` الجزء من سلسلة تظهر بعد قيمة محددة. إذا كانت القيمة سلسلة فارغة
أو غير موجودة داخل السلسلة الأصلية، يتم إرجاع السلسلة الكاملة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم!").After("مرحبا") .String() // " العالم!"
```

### `ما بعد النهاء`

وتعيد طريقة 'ما بعد النهاء\` الجزء من السلسلة الذي يظهر بعد آخر حدث بقيمة محددة. إذا كان
القيمة سلسلة فارغة أو غير موجودة داخل السلسلة الأصلية، يتم إرجاع السلسلة الكاملة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() /"dev"
```

### `تذييل`

وتضيف طريقة "الملحق" القيمة المحددة إلى نهاية السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### \`Basename'

طريقة 'Basename' ترجع عنصر اسم المسار إلى مسار ما، وإلغاء لاحقة محددة من اسم القاعدة
اختياريا.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() /"str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `سابقا`

الطريقة "السابقة" تعيد الجزء من سلسلة تظهر قبل قيمة محددة. إذا كانت القيمة فارغة
سلسلة أو غير موجودة داخل السلسلة الأصلية، يتم إرجاع السلسلة الكاملة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم!").Before("World").String() // "مرحبا"
```

### `سابقا`

وتعيد طريقة 'Beforelast\` الجزء من السلسلة الذي يظهر قبل آخر حدث بقيمة محددة. إذا كان
القيمة سلسلة فارغة أو غير موجودة داخل السلسلة الأصلية، يتم إرجاع السلسلة الكاملة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() /"docs.goravel"
```

### `Between`

وتعيد طريقة "بيتويين" الجزء من سلسلة بين قيمتين معينتين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() /"مرحبا"
```

### `BetweenFirst`

وتعيد طريقة "BetweenFirst" الجزء من سلسلة ما بين أول حدث لقيمتين معينتين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "مرحبا"
```

### `كاميل`

طريقة "Camel" تحول السلسلة إلى `camelCase`.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

طريقة "CharAt" تعيد الشخصية إلى فهرس معين. إذا كان الفهرس خارج الحدود ، فسيتم إرجاع سلسلة فارغة من نوع
.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

طريقة "ChopEnd" تزيل القيمة المعينة من نهاية السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() //https://goravel
```

### `ChopStart`

طريقة "ChopStart" تزيل القيمة المعينة من بداية السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() //goravel.dev
```

### \`المحتويات

وتحدد طريقة "المحتويات" ما إذا كانت السلسلة المعينة تحتوي على القيمة المعينة. الطريقة حساسة لحالة الأحرف. إذا تم توفير قيم
متعددة، فإنه سوف يعيد 'true' إذا كانت السلسلة تحتوي على أي من القيم.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("مرحبًا بالعالم").Contains("Gor", "Hello") // true
```

### `ContainsAll`

وتحدد طريقة "ContainsAll" ما إذا كانت السلسلة المعينة تحتوي على جميع القيم المحددة. الطريقة حساسة لحالة الأحرف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحباً بالعالم").ContainsAll("مرحباً"، "العالم") //true

str.Of("مرحباً بالعالم").ContainsAll("مرحباً") // false
```

### `الإسم`

طريقة "التسمية" تعيد الجزء الأصلي من المسار.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() /"framework/support"
```

اختيارياً، يمكنك توفير مستوى الدليل للتقليم من المسار.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() /"framework"
```

### `EndsWith`

وتحدد طريقة "Endswith" ما إذا كانت السلسلة المعينة تنتهي بالقيمة المحددة. الطريقة حساسة لحالة الأحرف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

يمكنك تمرير قيم متعددة إلى الطريقة لتحديد ما إذا كانت السلسلة تنتهي بأي من القيم.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### 'بالضبط\`

وتحدد طريقة "بالضبط" ما إذا كانت السلسلة المعينة مساوية تماما للقيمة المعينة. الطريقة حساسة لحالة الأحرف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `باستثناء `

وتستخرج الطريقة "باستثناء " مقتطفات من السلسلة التي تتطابق مع أول حدث للقيمة المعينة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("هذا صباحاً جميلاً").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() /"...is صبيحة جميلة...
```

بالإضافة إلى ذلك، يمكنك استخدام خيار "Omission" لتغيير السلسلة المستخدمة للإشارة إلى المقتطف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("هذا صباح جميل").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...) هو صباح جميل (...)"
```

### `انفجار`

وتقسم طريقة "التفجير" السلسلة إلى مجموعة من السلاسل باستخدام المحدد المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Explode(") // []string{"مرحباً"، "World"}
```

### `إنهاء`

وتكفل طريقة "الإنهاء" أن تنتهي السلسلة المعينة بالقيمة المحددة. إذا كانت السلسلة تنتهي بالفعل مع القيمة،
لن تتم إضافتها مرة أخرى.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() /"framework/"

str.Of("framework/").Finish("/").String() /"framework/"
```

### `العنوان`

وتحول طريقة "العنوان" السلسلة إلى عنوان رئيسي.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("bowen_han").headline().String() // "Bowen Han"

str.Of("HelloWorld").headline().String() // "مرحبا بالعالم"
```

### `Is`

وتحدد طريقة 'Is\` ما إذا كانت السلسلة المعينة مطابقة للنمط المعين. الطريقة حساسة لحالة الأحرف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("foo123").Is("Bar*", "baz*", "foo*") // true
```

### `IsEmpty`

وتحدد طريقة 'IsEmpty' ما إذا كانت السلسلة المعينة فارغة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

وتحدد طريقة 'IsNotEmpty' ما إذا كانت السلسلة المعينة غير فارغة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

وتحدد طريقة 'IsAscii' ما إذا كانت السلسلة المعينة تحتوي فقط على أحرف ASCII.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> <unk> ").IsAscii() // false
```

### `IsSlice`

وتحدد طريقة 'IsSlice\` ما إذا كانت السلسلة المعينة شريحة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() /true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

وتحدد طريقة 'IsMap\` ما إذا كانت السلسلة المعينة خريطة أم لا.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() /true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

وتحدد طريقة 'IsUlid\` ما إذا كانت السلسلة المعينة هي سلسلة ULID.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z6Z6Z1Z1Z1Z6Z1Z6Z1Z6Z6Z6Z6Z6Z6Z1Z6Z6Z6Z6Z6Z6Z1Z6Z6Z6Z6Z1Z6Z6Z6Z6Z1Z6").IsUlid() // false

str.Of("krishan").IsUlid()
```

### `IsUuid`

وتحدد طريقة 'IsUuid\` ما إذا كانت السلسلة المعينة عبارة عن جهاز UUUID.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-4466554400").IsUuid() /true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

ويحول أسلوب "كيباب" السلسلة إلى `كيباب-case`.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

وتحول طريقة "LcFirst" الحرف الأول للسلسلة إلى الحروف الدنيا.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() /"goravel Framework"
```

### `الطول`

طريقة "الطول" تعيد طول السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `تحديد`

وتقتصر طريقة "التقييد" السلسلة إلى الطول المحدد.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("هذا صباح جميل").Limit(7).String() // "هذا هو..."
```

اختيارياً، يمكنك تقديم الحجة الثانية لتغيير السلسلة المستخدمة للإشارة إلى التخلص.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("هذا صباح جميل").Limit(7, " (**)".String() / "هذا (**)"
```

### `أسفل`

ويحول الأسلوب 'الأدنى\` السلسلة إلى الأصغر حجما.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Llow ().String() // "goravel"
```

### `LTrim`

فطريقة "Ltrim" تقطع الجانب الأيسر من السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel"

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `أقنع`

طريقة 'Mask' تخفي السلسلة بحرف قناع معين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() /"kri**********************"**"
```

عند الحاجة، يمكنك تقديم رقم سلبي لطريقة قناع التي توعز للطريقة للبدء في الإقناع من نهاية السلسلة

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() /"kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() /"kris**************"
```

### `تطابق`

طريقة "المطابقة" تحدد ما إذا كانت السلسلة المعينة تطابق التعبير العادي المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("هذه سلسلة (اختبار)").Match(`\([^)]+\)`.String() /(اختبار)
```

### `MatchAll`

طريقة "MatchAll" تحدد ما إذا كانت السلسلة المعينة تطابق جميع التعبيرات العادية المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

وتحدد طريقة "IsMatch" ما إذا كانت السلسلة المعينة تطابق (أي من) التعبير العادي المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحباً، Goravel!").IsMatch(`(?i)goravel`، `goravel!(.*)`) // true
```

### `NewLine`

طريقة "NewLine" تضيف حرف خط جديد إلى السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

طريقة "PadBoth" تبدد كلا جانبي السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() /"__Hello___"
```

### `PadLeft`

طريقة "PadLeft" تبدد الجانب الأيسر من السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

طريقة "PadRight" تبدد الجانب الأيمن من السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### `بيبي`

طريقة "Pipe" تسمح لك بتحويل السلسلة باستخدام إغلاق معين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(function(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `مسبقا`

الطريقة 'Prepend\` تنفق القيمة المعطاة على السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `حذف`

طريقة 'إزالة' تزيل القيمة المعينة (القيم) من السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Remove("World").String() // "مرحبا"

str.Of("مرحبا بالعالم").Remove("World", "Hello").String() // "
```

### `كرر`

طريقة "التكرار" تكرر المقطع عددا معينا من المرات.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `استبدال`

طريقة "الاستبدال" تحل محل القيمة المعطاة في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Replace("World", "Krishan").String() / "مرحبا كريشان"
```

بشكل افتراضي، طريقة "الاستبدال" حساسة لحالة الأحرف. If you would like the method to be case-insensitive, you may pass
`false` as the third argument.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Replace("العالم", "Krishan", false).String() // "مرحبا كريشان"
```

### `استبدال`

طريقة "الاستبدال" لا تحل محل آخر حدث للقيمة المعطاة في السلسلة إلا إذا كانت في نهاية سلسلة
.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").ReplaceEnd("World", "Goravel").String() // "مرحبا Goravel"

str.Of("مرحبا بالعالم").ReplaceEnd("مرحباً", "Goravel").String() // "مرحبا بالعالم"
```

### `استبدال أولاً`

وتحل طريقة "الاستبدال أولا" محل أول حدث للقيمة المعطاة في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").ReplaceFirst("World", "Goravel").String() // "مرحبا جورافيل"
```

### `استبدال`

أما طريقة "الاستبدال" فتحل محل آخر حدث للقيمة المعطاة في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Replacelast("World", "Goravel").String() // "مرحبا جورافيل"
```

### `الاستبدال`

طريقة "ReplaceMatches" تحل محل تطابق التعبير العادي المعطى في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحباً، Goravel!").ReplaceMatches(`goravel!(.*)`، "Krishan") // "Hello، Krishan!"
```

### `استبدال البداية`

طريقة "استبدال Start" لا تحل محل أول حدث للقيمة المعطاة في السلسلة إلا إذا كانت في بداية المقطع
.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").ReplaceStart("مرحباً", "Goravel").String() // "Goravel World"

str.Of("مرحبا بالعالم").ReplaceStart("World", "Goravel").String() // "مرحبا بالعالم"
```

### `RTrim`

إن طريقة "RTrim" تقطع الجانب الأيمن من السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `ثعبة`

طريقة 'Snake' تحول السلسلة إلى 'snake_case\`.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `انقسام`

وتقسم طريقة "التجزئة" السلسلة إلى مجموعة من السلاسل باستخدام المحدد المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Split(") // []string{"مرحباً"، "World"}
```

### `Squish`

يستبدل أسلوب "ساحة" أحرف المساحة البيضاء المتتالية بمسافة واحدة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").Squish().String() // "مرحبا بالعالم"
```

### `بدء`

طريقة "البدء" تضيف مثيل واحد من القيمة المعطاة إلى بداية السلسلة إذا لم تبدأ بالفعل
مع القيمة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() /"/framework"

str.Of("/framework").Start("/").String() /"/framework"
```

### `Startshou`

طريقة "StartsWith" تحدد ما إذا كانت السلسلة المعينة تبدأ بقيمة (أي) معطاة. الطريقة حساسة لحالة الأحرف.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("مرحباً بالعالم").StartsWith("Gor", "مرحبا") // true
```

### `سلسلة`

طريقة "السلسلة" ترجع السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `دراسية`

الطريقة "الدراسية" تحول السلسلة إلى 'StudlyCase\`.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

وتعيد طريقة "Substr" الجزء من السلسلة الذي يبدأ في الفهرس المحدد ويستمر في الطول المحدد.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `مبادلة`

وتستبدل طريقة "المبادلة" القيم المتعددة في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("جولانغ رائع").Swap(map[string]string{
  "Golang": "Go",
  "رائع": "ممتاز",
 }).String() // "اذهب ممتاز"
```

### `علامة`

وتنقل طريقة "تابو" السلسلة إلى الإغلاق المعين وتعيد السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(function(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `اختبار`

طريقة "الاختبار" تحدد ما إذا كانت السلسلة المعينة تطابق التعبير العادي المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحباً، Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

ويحول أسلوب "العنوان" السلسلة إلى `قضية العنوان`.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### \`تريم'

إن طريقة "تريم" تقطع السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "Frame"
```

### `UcFirst`

وتحول طريقة "UcFirst" الحرف الأول للسلسلة إلى الحرف الكبير.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

طريقة 'UcSplit' تقسم السلسلة إلى مجموعة من السلاسل باستخدام أحرف كبيرة.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `ملم`

والطريقة "ما لم" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كان الشرط المعين "زائفاً".

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(function(s *String) bool {
        return false
    }، دالة (s *String) *String {
        Ref("Fallback")
    }).String() // "Fallback Applied"
```

### `أعلى`

الطريقة "العليا" تحول السلسلة إلى الحرف الكبير.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `متى`

والطريقة "عندم" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كان الشرط المعين "صحيحاً".

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String {
    return s.Append(" Han")
}).String() / "Bowen Han"
```

عند اللزوم يمكنك تقديم الحجة الثالثة إلى طريقة "عندم" التي هي إغلاق سيتم تنفيذه عندما يكون شرط
'خطأ\`.

### `WhenConinins`

طريقة "WhenContains" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كان السلسلة المعطاة تحتوي على القيمة
المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحباً بوين").WhenContains("مرحباً"، وظيفة (s *str.String {
    العودة s.Append(" Han")
}).String() // "مرحباً بك Bowen Han"
```

عند اللزوم قد تقدم الحجة الثالثة إلى طريقة "WhenContains" التي هي إغلاق سيتم تنفيذه
عندما لا يحتوي السلسلة على القيمة المحددة.

### `WhenContainsAll`

طريقة "WhenContainsAll" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كان السلسلة المعطاة تحتوي على
جميع القيم المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالبيون").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

عند اللزوم يمكنك تقديم الحجة الثالثة إلى طريقة "WhenContainsAll" التي هي إغلاق سيكون
يتم تنفيذها عندما لا تحتوي السلسلة على جميع القيم المحددة.

### `متى إفراغ`

طريقة "متى كانت فارغة" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعينة فارغة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(function(s *str.String {
    return s.Append("Goravel")
}).String() / "Goravel"
```

### `WhenIsAscii`

طريقة 'WhenIsAscii' تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعطاة تحتوي فقط على أحرف
ASCII.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(function(s *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> <unk> ").WhenIsAscii(function(s *str.String {
    Res.Append(" Framework")
}.String() /"<unk> <unk> "
```

### `whenNotEmpty`

طريقة 'WhenNotEmpty' تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا لم تكن السلسلة المعينة
فارغة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(function(s *str.String {
    return s.Append(" Framework")
}).String() / "Goravel Framework"
```

### `WhenStartswith`

طريقة 'WhenStartsWith' تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا بدأ السلسلة المعطاة
بالقيمة المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا بالعالم").WhenStartsWith("hello", func(s *str.String {
    return s.Title()
}).String() / "مرحبا بالعالم"
```

### `WhenEndsw`

طريقة 'WhendsWith' تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا انتهت السلسلة المعينة بـ
القيمة المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("العالم"، وظيفة (s *str.String) *str.String {
    return s.Title()
}).String() / "مرحبا بالعالم"
```

### \`متى بالضبط'

طريقة "متى بدقة" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعينة مساوية بالضبط
للقيمة المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `whenNotfintly`

طريقة 'WhenNotExactly' تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا لم يكن السلسلة المعطاة
مساويا تماما للقيمة المعطاة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `متى`

طريقة "WhenIs" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعينة تطابق النمط
المعين.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

وتنقل طريقة "WhenIsUlid" السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعينة هي سلسلة ULID.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z1Z6Z1Z6Z1Z6Z6Z6Z1Z1Z6Z1Z6Z6").WhenIsUlid(function(s *str.String) *str.String {
    Res.Substr(0, 10)
}).String() // "01E5Z6Z1Z6Z6"
```

### `WhenIsUuid`

وتنقل طريقة 'WhenIsUuid\` السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعطاة عبارة عن جهاز UUID.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-4466554400").WhenIsUuid(func(s *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `وقت الاختبار`

طريقة "الإختبار" تنقل السلسلة إلى الإغلاق المعين وتعيد السلسلة إذا كانت السلسلة المعطاة تطابق
مع التعبير العادي.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" رائع")
}).String() // "goravel framework رائع"
```

### `WordCount`

طريقة "WordCount" تعيد عدد الكلمات في السلسلة.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا، العالم!").WordCount() // 2
```

### `كلمات`

وتحد طريقة "الكلمات" من عدد الكلمات في السلسلة. If necessary, you may provide the second argument to change
the string that is used to indicate the truncation.

```go
استيراد "github.com/goravel/framework/support/str"

str.Of("مرحبا، العالم!").Words(1) // "Hello..."

str.Of("مرحبا، العالم!").Words(1، " (**)// "مرحبا (**)"
```
