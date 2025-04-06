# المساعدات

## الطرق المتاحة

### المسارات

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### الوقت

|                                                                                    |                                                                                  |                                                                              |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [carbon.Now()](#carbon-now)                     | [carbon.SetTimezone()](#carbon-settimezone)   | [carbon.Parse()](#carbon-parse)           |
| [carbon.FromTimestamp()](#carbon-fromtimestamp) | [carbon.FromDateTime()](#carbon-fromdatetime) | [carbon.FromDate()](#carbon-fromdate)     |
| [carbon.FromTime()](#carbon-fromtime)           | [carbon.FromStdTime()](#carbon-fromstdtime)   | [carbon.IsTestNow()](#istestnow-fromdate) |
| [carbon.SetTestNow()](#carbon-settestnow)       | [carbon.UnsetTestNow()](#carbon-unsettestnow) |                                                                              |

### تصحيح الأخطاء

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [debug.Dump()](#debug-dump) | [debug.SDump()](#debug-sdump) | [debug.FDump()](#debug-fdump) |

### الخرائط

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)     | [maps.Exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)     | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.Only()](#maps-only)   | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.Where()](#maps-where) |                                                                  |                                                                  |

### تحويل

|                                                                          |                                                                          |                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convert.With()](#convert-with)       | [convert.Transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                                              |

### تجميع

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.Reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.Values()](#collect-values) |                                                                          |                                                                          |

## المسارات

### `path.App()`

تُرجع دالة `path.App()` المسار إلى دليل التطبيق الخاص بتطبيقك. يمكنك أيضًا استخدام دالة `path.App()`
لإنشاء مسار إلى ملف نسبة إلى دليل التطبيق:

```go
import "github.com/goravel/framework/support/path"

path := path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

تُرجع دالة `path.Base()` المسار إلى الدليل الجذر للتطبيق الخاص بك. يمكنك أيضًا استخدام دالة `path.Base()`
لإنشاء مسار إلى ملف معين بالنسبة إلى دليل جذر المشروع:

```go
path := path.Base()
path := path.Base("vendor/bin")
```

### `path.Config()`

تُرجع دالة `path.Config()` المسار إلى دليل التكوين الخاص بتطبيقك. يمكنك أيضًا استخدام
دالة `path.Config()` لإنشاء مسار إلى ملف معين داخل دليل التكوين الخاص بالتطبيق:

```go
path := path.Config()
path := path.Config("app.go")
```

### `path.Database()`

تُرجع دالة `path.Database()` المسار إلى دليل قاعدة البيانات الخاص بتطبيقك. يمكنك أيضًا استخدام
دالة `path.Database()` لإنشاء مسار إلى ملف معين داخل دليل `database`:

```go
path := path.Database()
path := path.Database("factories/user_factory.go")
```

### `path.Storage()`

تُرجع دالة `path.Storage()` المسار إلى دليل التخزين الخاص بتطبيقك. يمكنك أيضًا استخدام دالة
`path.Storage()` لإنشاء مسار إلى ملف معين داخل دليل `storage`:

```go
path := path.Storage()
path := path.Storage("app/file.txt")
```

### `path.Public()`

تُرجع دالة `path.Public()` المسار إلى دليل public الخاص بتطبيقك. يمكنك أيضًا استخدام دالة
`path.Public()` لإنشاء مسار إلى ملف معين داخل دليل `public`:

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

تُرجع دالة `path.Lang()` المسار إلى دليل `lang`. يمكنك أيضًا استخدام دالة `path.Lang()` لإنشاء مسار إلى ملف معين داخل دليل `lang`:

```go
path := path.Lang()
path := path.Lang("en.json")
```

## الوقت

وحدة `carbon` في Goravel هي توسعة من [golang-module/carbon](https://github.com/golang-module/carbon)، الميزة الرئيسية هي تحقيق تتبع الوقت، يرجى الرجوع إلى الوثائق الرسمية للحصول على التفاصيل.

### `carbon.Now()`

الحصول على الوقت الحالي:

```go
import "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

تعيين المنطقة الزمنية:

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

الحصول على كائن `Carbon` من خلال سلسلة نصية:

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

الحصول على كائن `Carbon` بواسطة الطابع الزمني:

```go
carbon.FromTimestamp(1577836800)
```

### `carbon.FromDateTime()`

الحصول على كائن `Carbon` بواسطة التاريخ والوقت:

```go
carbon.FromDateTime(2020, 1, 1, 0, 0, 0)
```

### `carbon.FromDate()`

الحصول على كائن `Carbon` بواسطة التاريخ:

```go
carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

الحصول على كائن `Carbon` بواسطة الوقت:

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

الحصول على كائن `Carbon` بواسطة `time.Time`:

```go
carbon.FromStdTime(time.Now())
```

### `carbon.IsTestNow()`

تحديد ما إذا كان الوقت قيمة اختبار:

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

تعيين الوقت إلى قيمة اختبار:

```go
carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

استعادة الوقت إلى قيمة طبيعية:

```go
carbon.UnsetTestNow()
```

## تصحيح الأخطاء

### `debug.Dump()`

يمكن لـ `debug.Dump()` طباعة أي متغير:

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` يمكنه طباعة أي متغير إلى `io.Writer`:

```go
import "github.com/goravel/framework/support/debug"

debug.FDump(someWriter, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` يمكنه طباعة أي متغير إلى `string`:

```go
import "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## الخرائط

### `maps.Add()`

تقوم دالة `maps.Add()` بإضافة زوج جديد من المفتاح والقيمة إلى الخريطة المعطاة إذا لم يكن المفتاح موجودًا بالفعل في الخريطة:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan"}
maps.Add(mp, "age", 22)
// map[string]any{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
maps.Add(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// map[string]string{"name": "Bowen"}
```

### `maps.Exists()`

تحدد دالة `maps.Exists()` ما إذا كان المفتاح المحدد موجودًا في الخريطة المقدمة:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Krishan", "age": 22}

exists := maps.Exists(mp, "name") // true

exists = maps.Exists(mp, "email") // false
```

### `maps.Forget()`

تقوم دالة `maps.Forget()` بإزالة المفتاح (المفاتيح) المحددة من الخريطة المقدمة:

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

تسترجع دالة `maps.Get()` قيمة المفتاح المحدد من الخريطة المقدمة. إذا لم يكن المفتاح موجودًا، سيتم إرجاع القيمة الافتراضية:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Bowen"}

قيمة := الخرائط. et(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

تحدد دالة 'maps.Has()' ما إذا كان المفتاح (المفتاح) المعطى موجود في الخريطة المقدمة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel", "language": "Go"}

موجود := خرائط. كـ (mp, "name", "language")
/\true

يوجد = maps.Has(mp, "name", "age")
// false
```

### `maps.HasAny()`

تحدد دالة 'maps.HasAny()' ما إذا كان أي من المفاتيح المعينة موجود في الخريطة المقدمة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel", "language": "Go"}

موجود := خرائط. asAny(mp, "name", "age")
/true

يوجد = maps.HasAny(mp, "age", "email")
// false
```

### `maps.Only()`

تسترجع دالة "maps.Only()" المفتاح (المفتاح) المعطى فقط من الخريطة المقدمة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel", "language": "Go"}

newmap := maps. nly(mp, "name")
//map[string]أي{"name": "Goravel"}

newmap = maps.Only(mp, "name", "age")
// map[string]أي{"name": "Goravel"}
```

### `maps.Pull()`

تسترجع دالة 'maps.Pull()' المفتاح المعطى وتزيله من الخريطة المقدمة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel", "language": "Go"}

اسم := الخرائط. ull(mp, "name")
// name = "Goravel"
//mp = الخريطة[string]أي{"اللغة": "Go"}
```

يمكن تقديم قيمة افتراضية كحجة ثالثة لوظيفة "maps.Pull()". سيتم إرجاع هذه القيمة إذا كان المفتاح
غير موجود في الخريطة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel", "language": "Go"}

اسم := الخرائط. ull(mp, "age", "default")
// name = "default"
//mp = map[string]أي{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

تحدد دالة "maps.Set()" المفتاح والقيمة المعطاين في الخريطة المقدمة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]أي {"name": "Goravel"}

maps.Set(mp, "language", "Go")
// map[string]أي {"name": "Goravel", "language": "Go"}
```

### `maps.Where()`

تقوم دالة "maps.Where()" بتصفية الخريطة المقدمة باستخدام المكالمة المعطاة:

```go
استيراد "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newmap := maps. هنا(mp, func(key str, value strol {
    Rekey == "name"
})
// map[string]string{"name": "Goravel"}
```

## تحويل

### `convert.Tap()`

وتنقل دالة 'convert.Tap()' القيمة المعطاة لرد الاتصال المقدم وتعيد القيمة:

```go
استيراد "github.com/goravel/framework/support/convert"

القيمة := convert.Tap("Goravel", func(value string) {
    fmt. rintln(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := convert. ap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// map[string]string{"name": "Goravel", "language": "Go"}
```

### `convert.Transform()`

يحوِّل `convert.Transform()` القيمة المعطاة باستخدام رد الاتصال المقدم ويعيد النتيجة:

```go
استيراد "github.com/goravel/framework/support/convert"

القيمة := convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", func(s string) *foo {
      Re&foo{Name: s}
})
// &foo{name: "foo"}
```

### `convert.With()`

ينفذ 'convert.With()' رد الاتصال المعطى مع القيمة المقدمة ويعيد نتيجة المكالمة:

```go
استيراد "github.com/goravel/framework/support/convert"

قيمة := convert.With("Goravel", func(value string) string {
    Revalue + "Framework"
})
// Goravel Framework
```

### `convert.Default()`

طريقة "convert.Default()" ترجع أولاً القيمة غير الصفرية. إذا كانت جميع القيم صفر، فإنها ترجع قيمة صفر.

```go
استيراد قيمة "github.com/goravel/framework/support/convert"

:= convert.Default("", "foo")
// foo

= transt. fault("بار", "foo")
// بار

قيمة = convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

وتعيد طريقة "convert.Pointer()" مؤشر القيمة المعينة.

```go
استيراد "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## تجميع

### `collect.Count()`

ترجع وظيفة 'collect.Count()' عدد الأصناف في مجموعة معينة:

```go
استيراد "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

أما دالة `collect.CountBy()` فتعد الأحداث التي يكون الأصل فيها صحيحاً:

```go
استيراد "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

الدالة 'collect.Each()' تكرر العناصر في المجموعة المعينة وتمرير كل عنصر إلى مكالمة
معينة:

```go
استيراد "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, indexint) {
    fmt.Println(index+1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

تقوم دالة 'collect.Filter()' بتصفية العناصر في المجموعة باستخدام المكالمة المعطاة:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

الدالة 'collect.GroupBy()' تجمع العناصر الموجودة في المجموعة بنتيجة المكالمة المعينة:

```go
استيراد "github.com/goravel/framework/support/collect"

// استخدم مثال شريحة خريطة معقدة (استخدم مثالا مختلفا)
NewCollection := collect. roupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "الاسم": "Bowen"},
    {"class": "2", "Name": "Krishan"},
}, دالة (خريطة القيمة[string]سلسلة) سلسلة {
    قيمة الإرجاع ["صف"]
})

// map[string][]map[string]string{
// "1": []خريطة[string]سلسلة{{"class": "1", "Name": "Rohan"}}،
// "2": []خريطة[string]سلسلسلة{{"صف": "2"، "الاسم": "Bowen"}، {"class": "2"، "الاسم": "Krishan"}،
/}
```

### `collect.Keys()`

ترجع دالة 'collect.Keys()' جميع مفاتيح العناصر في المجموعة:

```go
استيراد "github.com/goravel/framework/support/collect"

مفاتيح := collect.Keys(map[string]سلسلة {"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

وتحول دالة 'collect.Map()' نوعا من المجموعة إلى نوع آخر باستخدام التكرار المحدد:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string, _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

ترجع دالة 'collect.Max()' القيمة القصوى لمجموعة معينة:

```go
استيراد "github.com/goravel/framework/support/collect"

حد أقصى: = collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

تدمج دالة \`collect.Merge()' الخرائط المعينة في خريطة واحدة:

```go
استيراد "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

ترجع دالة 'collect.Min()' القيمة الدنيا لمجموعة معينة:

```go
استيراد "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.Reverse()`

وتعكس دالة \`collect.Reverse()' العناصر الواردة في المجموعة:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

تعمل دالة 'collect.Shuffle()' على خلط العناصر في المجموعة:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(مثال)
```

### `collect.Split()`

وتقسم دالة \`collect.Split()' مجموعة إلى مجموعات الطول المحدد. إذا كان لا يمكن تقسيم المجموعة
بالتساوي، فإن الجزء الأخير سوف يحتوي على العناصر المتبقية:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// []]int{{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

ترجع وظيفة 'collect.Sum()' مجموع جميع الأصناف في المجموعة:

```go

استيراد "github.com/goravel/framework/support/collect"

مبلغ := collect.Sum([]int{1, 2, 3, 4, 5})

// 15
```

### `collect.Unique()`

طريقة `collect.Unique()` تعيد المجموعة الخالية من التكرار حيث في حالة ازدواجية القيم، سيتم الحفاظ فقط على أول حدث من نوع
:

```go
استيراد "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.Values()`

ترجع دالة 'collect.Values()' جميع قيم المجموعة المعنية:

```go
استيراد "github.com/goravel/framework/support/collect"

القيم := collect.Values(map[string]سلسلة {"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
