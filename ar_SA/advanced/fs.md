# تخزين الملفات

وتوفر غورافيل سائقين بسيطين للعمل مع نظم الملفات المحلية، أمازون S3، أليون OS، تينيست COS Tencent وTencent وMinio و
Cloudinary. حتى الأفضل، التبديل بين خيارات التخزين هذه بين آلة التطوير المحلي الخاص بك والإنتاج
خادم بسيط بشكل مذهل حيث أن API يظل هو نفسه لكل نظام. غورافيل تأتي مع سائق 'محلي\`، للسائقين الآخرين
، يرجى التحقق من حزمة الملحق المستقلة المقابلة:

| سائق  | رابط                                                                                                           |
| ----- | -------------------------------------------------------------------------------------------------------------- |
| S3    | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS   | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| كوب   | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| مصغر  | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| سحابة | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## الإعدادات

يوجد ملف تكوين Goravel's filesystem في `config/filesystems.go`. في هذا الملف، يمكنك تكوين كل
من نظام الملفات الخاص بك "الأقراص"، كل قرص يمثل مشغل تخزين محدد وموقع تخزين.

> يمكنك تكوين أكبر عدد من الأقراص كما تريد، وقد يكون لديك أقراص متعددة تستخدم نفس السائق.

### السائق المحلي

عند استخدام مشغل 'local'، جميع عمليات الملفات تتعلق بالدليل 'root' المحدد في ملف 'filesystems'
الخاص بك. بشكل افتراضي، يتم تعيين هذه القيمة إلى دليل "تخزين/تطبيق". لذلك، فإن الطريقة التالية هي
الكتابة إلى `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "contents")
```

### القرص العام

القرص 'العام` المدرج في ملف إعدادات التطبيق 's's'filesystems
مخصص للملفات التي ستكون متاحة للجمهور. بشكل افتراضي، يستخدم القرص '
العام' سائق 'local' ويخزن ملفاته في 'storage/app/public`. إذا كنت ترغب في زيارة هذا الملف من الويب،
يمكنك إنشاء توجيه للملف:

```go
facades.Route().Static("storage", "./storage/app/public")
```

## الحصول على أمثلة القرص

يمكن استخدام واجهة "التخزين" للتفاعل مع أي من الأقراص المكونة الخاصة بك. على سبيل المثال، يمكنك استخدام طريقة 'Put\`
على الواجهة لتخزين الصورة الرمزية على القرص الافتراضي. إذا كنت تستدعي طرق على واجهة "التخزين" دون اول
اتصل بطريقة "القرص"، فسيتم نقل الطريقة تلقائياً إلى القرص الافتراضي:

```go
facades.Storage().Put("avatars/1.png", "المحتويات")
```

إذا كان طلبك يتفاعل مع أقراص متعددة، يمكنك استخدام طريقة "القرص" على واجهة "التخزين" للعمل مع ملفات
على قرص معين:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "المحتويات")
```

## حقن السياق

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "المحتويات")
```

## استرداد الملفات

ويمكن استخدام طريقة 'Get' لاسترداد محتويات الملف. سيتم إرجاع محتويات السلسلة الخام من الملف بواسطة
الطريقة. تذكر، يجب تحديد جميع مسارات الملفات بالنسبة إلى موقع "الجذر" في القرص:

```go
محتويات := facades.Storage().Get("file.jpg")
```

يمكن استخدام طريقة "القائمين" لتحديد ما إذا كان الملف موجوداً على القرص:

```go
إذا (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

يمكن استخدام طريقة "مفقودة" لتحديد ما إذا كان الملف مفقوداً من القرص:

```go
إذا (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### رابط الملف

يمكنك استخدام طريقة "Url" للحصول على عنوان URL لملف معين. إذا كنت تستخدم سائق 'local'، هذا عادة
فقط إلحاق `/storage` مسبقاً بالمسار المحدد وإرجاع عنوان URL نسبي إلى الملف. إذا كنت تستخدم \`spi، سيتم إرجاع عنوان URL
المؤهلة بالكامل عن بعد:

```go
رابط := facades.Storage().Url("file.jpg")
```

> عند استخدام مشغل 'local' ، لا يتم ترميز قيمة الإرجاع لـ 'Url' . For this reason, we recommend always
> storing your files using names that will create valid URLs.

#### عناوين URL المؤقتة

باستخدام طريقة "TemporaryUrl"، يمكنك إنشاء عناوين URL مؤقتة للملفات المخزنة باستخدام مشغل غير محلي. هذه الطريقة
تقبل مسار و مثيل "الوقت" يحدد الوقت الذي يجب أن تنتهي فيه صلاحية الرابط:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### بيانات تعريف الملف

وبالإضافة إلى قراءة الملفات وكتابتها، يمكن لجورافيل أيضاً أن تقدم معلومات عن الملفات نفسها:

```go
size := facades.Storage().Size("file.jpg")
```

طريقة "LastModified" ترجع آخر وقت معدّل للملف:

```go
الوقت، الخطأ := facades.Storage().LastModified("file.jpg")
```

يمكن الحصول على نوع MIME من ملف معين من خلال طريقة MimeType:

```go
MimeType، الخطأ := facades.Storage().MimeType("file.jpg")
```

يمكن أيضا استخدام طريقة 'NewFile':

```go
استيراد "github.com/goravel/framework/filesystem"

الملف، err := filesystem.NewFile("./logo.png")
الحجم، err := file.Size()
lastModied, err := file.LastModified()
mime, err := file.MimeType()
```

### مسارات الملف

للحصول على المسار لملف معين، يمكنك استخدام طريقة "المسار". When using the `local` driver, this will
provide you with the absolute path to the file. ومع ذلك، إذا كنت تستخدم مشغل مثل \`s3'، فإن الطريقة ستعطيك
المسار النسبي للملف داخل الدلو :

```go
المسار := facades.Storage().Path("file.jpg")
```

## تخزين الملفات

يمكن استخدام طريقة "Put" لتخزين محتويات الملفات على قرص. تذكر، يجب تحديد جميع مسارات الملفات بالنسبة إلى
موقع "الجذر" المكون للقرص:

```go
err := facades.Storage().Put("file.jpg", contents)
```

يمكنك أيضا استخدام 'PutFile' و 'PutFileAs' لحفظ الملفات مباشرة على القرص:

```go
استيراد "github.com/goravel/framework/filesystem"

// إنشاء معرف فريد لأسماء الملفات...
ملف، err := filesystem.NewFile("./logo.png")
المسار := facades.Storage(). utFile("phototos", file)

// حدد بشكل يدوي اسم الملف...
ملف، err := filesystem.NewFile("./logo.png")
مسار := facades.Storage().PutFileAs("phototos", file, "photo.jpg")
```

وهناك بعض الأمور الهامة التي تجدر ملاحظتها بشأن طريقة "PutFile". لاحظ أننا حددنا فقط اسم الدليل و
ليس اسم الملف. بشكل افتراضي، سوف تقوم طريقة "PutFile" بإنشاء معرف فريد لتكون اسم الملف. سيتم تحديد ملحق الملف
من خلال فحص نوع MIME للملف. سيتم إرجاع المسار إلى الملف بواسطة طريقة 'PutFile'
حتى تتمكن من تخزين المسار، تضمين اسم الملف الذي تم إنشاؤه، في قاعدة البيانات الخاصة بك.

### نسخ ونقل الملفات

يمكن استخدام طريقة "النسخ" لنسخ ملف موجود إلى موقع جديد على القرص، في حين أن طريقة 'نقل\` قد تكون
تستخدم لإعادة تسمية أو نقل ملف موجود إلى موقع جديد:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Movement ("old/file.jpg", "new/file.jpg")
```

### تحميل الملف

في تطبيقات الويب، واحدة من أكثر حالات الاستخدام شيوعا لتخزين الملفات هي تخزين الملفات التي يرفعها المستخدم مثل الصور
والوثائق. Goravel يجعل من السهل جدا تخزين الملفات التي تم تحميلها باستخدام طريقة "المتجر" على مثيل الملفات التي تم تحميلها.
اتصل بطريقة "المتجر" مع المسار الذي ترغب في تخزين الملف الذي تم تحميله:

```go
مربع (r *UserController) Show(tx http.Context) {
  الملف، الخطأ := ctx.request().File("avatar")
  المسار ، الخطأ := file.Store("avatars")
}
```

وهناك بعض الأشياء الهامة التي يمكن ملاحظتها بشأن هذا المثال. Note that we only specified a directory name, not a
filename. بشكل افتراضي، سوف تقوم طريقة "المتجر" بإنشاء معرف فريد لتكون اسم الملف. سيتم تحديد امتداد الملف
عن طريق فحص نوع MIME للملف. سيتم إرجاع المسار إلى الملف بواسطة طريقة "المتجر" حتى تتمكن من تخزين المسار
، تضمين اسم الملف الذي تم إنشاؤه، في قاعدة البيانات الخاصة بك.

يمكنك أيضًا استدعاء طريقة "PutFile" على واجهة "التخزين" لتنفيذ نفس عملية تخزين الملفات مثل المثال
أعلاه:

```go
استيراد "github.com/goravel/framework/filesystem"

الملف، err := filesystem.NewFile("./logo.png")
مسار := facades.Storage().PutFile("phototos", file)
```

### تحديد اسم الملف

إذا كنت لا تريد تعيين اسم الملف تلقائياً إلى الملف المخزن، فيمكنك استخدام طريقة "StoreAs"، الذي يتلقى
المسار، اسم الملف، والقرص (الاختياري) كحجته:

```go
ملف ، خطأ := ctx.request().File("صورة")
مسار ، خطأ := ملف .StoreAs("صفات" ، "name")
```

يمكنك أيضًا استخدام طريقة 'PutFileAs' على واجهة التخزين، التي ستنفذ نفس عملية تخزين الملفات كما في المثال
أعلاه:

```go
استيراد "github.com/goravel/framework/filesystem"

الملف، err := filesystem.NewFile("./logo.png")
مسار := facades.Storage().PutFileAs("phototos", file, "name")
```

> إذا كان اسم الملف المحدد من قبل `StoreAs` و `PutFileAs` لا يحتوي على لاحق، تتم إضافة لاحقة تلقائيًا استناداً إلى
> على MIME للملف؛ خلاف ذلك، يتم استخدام اسم الملف المحدد مباشرة.

### تحديد قرص

بشكل افتراضي، هذا الملف الذي تم تحميله طريقة "المتجر" سوف تستخدم القرص الافتراضي الخاص بك. If you would like to specify another disk,
please use the `Disk` method:

```go
مربع (r *UserController) Show(tx http.Context) {
  الملف، الخطأ := ctx.request().File("avatar")
  المسار ، الخطأ := file.Disk("s3").Store("avatars")
}
```

### معلومات ملف آخر مرفوع

إذا كنت ترغب في الحصول على الاسم الأصلي والملحق للملف الذي تم تحميله، يمكنك القيام بذلك باستخدام طرق
'GetClientOriginalName' و 'GetClientOriginalExtension':

```go
الملف ، خطأ := ctx.request().File("avatar")

اسم := ملف GetClientOriginalName()
امتداد := ملف GetClientOriginalExtension()
```

ومع ذلك، لا يغيب عن البال أن طريقتي 'GetClientOriginalName`و 'GetClientOriginalExtension' تعتبران غير آمنتين،
كـ اسم الملف والإضافة قد يتم التلاعب بهما من قبل مستخدم ضار. For this reason, you should typically prefer
the`HashName`and`Extension\` methods to get a name and an extension for the given file upload:

```go
ملف ، خطأ := ctx.request().File("صورة")

اسم := الملف .HashName() // توليد اسم فريد عشوائي...
ملحق, err := file.Extension() // تحديد ملحق الملف بناء على نوع MIME للملف...
```

## حذف الملفات

طريقة "حذف" تقبل اسم ملف واحد أو مجموعة من الملفات لحذفها:

```go
err := facades.Storage().delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

إذا لزم الأمر، يمكنك تحديد القرص الذي يجب حذف الملف من:

```go
الخطأ := facades.Storage().Disk("s3").delete("file.jpg")
```

## المجلدات

### احصل على كل الملفات ضمن دليل

طريقة "الملفات" ترجع شريحة من جميع الملفات في دليل معين. إذا كنت ترغب في استرداد قائمة بجميع الملفات
داخل دليل معين بما في ذلك جميع الدلائل الفرعية، فيمكنك استخدام طريقة 'كل الملفات\`:

```go
الملفات، خطأ: = facades.Storage().Disk("s3").files("الدليل")
الملفات، الخطأ := facades.Storage().Disk("s3").AllFiles("الدليل")
```

### احصل على جميع الدلائل ضمن دليل

طريقة "الدليل" ترجع شريحة من جميع الأدلة داخل دليل معين. بالإضافة إلى ذلك، يمكنك استخدام طريقة
'AllDirectories' للحصول على قائمة بجميع الدلائل داخل دليل معين وجميع دلائله الفرعية:

```go
الدليلات، الخطأ := facades.Storage().Disk("s3").Directories("الدليل")
الدليل، الخطأ := facades.Storage().Disk("s3").AllDirectories("الدليل")
```

### إنشاء دليل

طريقة "MakeGuidey" ستنشئ الدليل المحدد، بما في ذلك أي أدلة فرعية مطلوبة:

```go
الخطأ := facades.Storage().MakeDirectory(الدليل)
```

### حذف دليل

وأخيرا، يمكن استخدام طريقة "حذف الدليل" لإزالة الدليل وجميع ملفاته:

```go
الخطأ := facades.Storage().deleteDirectory(الدليل)
```

## نظم الملفات المخصصة

يمكنك تعيين مشغل 'custom' في ملف 'config/filesystems.go'.

```go
"custom": map[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

تحتاج إلى تنفيذ واجهة 'github.com/goravel/framework/contracts/filesystem/Driver' في عنصر التشكيل 'via'
.

```go
اكتب واجهة المشغل {
  AllDirectories(مسار سلسلة) ([]سلة، خطأ)
  AllFiles(مسار سلسلة) ([]سلسلة، خطأ)
  Copy(oldFile ، سلسلة ملفات جديدة)
  حذف (ملف... محاولة) خطأ
  حذف الدليل (سلسلة الدليل) خطأ
  دليل (سلسلة المسارات) ([]سلسلة، خطأ)
  Exists(سلسلة الملف)
  الملفات (سلسلة المسار) ([]سلسلة، خطأ)
  Get(ملف سلسلة، خطأ)
  GetBytes(ملف سلسلة) ([]byte, error)
  LastModified(ملف سلسلة) (وقت). تعطي, خطأ)
  خطأ MakeGuide (سلسلة الدليل)
  MimeType(سلسلة الملف) (سلسلة، خطأ)
  مفقودة (سلسلة ملف) bool
  move(oldFile ، سلسلة ملفات جديدة)
  Path(سلسلة الملف) سلسلة
  Put(ملف)، سلسلة المحتوى) خطأ
  PutFile(سلسلة المسار، مصدر الملف) (السلسلة، الخطأ)
  PutFileAs(سلسلة المسار، مصدر الملف اسم سلسلة) (سلسلة، خطأ)
  حجم (سلسلة الملف) (int64, خطأ)
  مؤقتةUrl(سلسلة الملف، الوقت الزمني. ime) (سلسلة، خطأ)
  WithContext(ctx context.Context) Driver
  Url(file) سلسلة
}
```

> ملاحظة: بما أن التكوين لم يتم تحميله عند تسجيل المشغل المخصص، لذا يرجى استخدام
> `واجهات'. onfig().Env` للحصول على التكوين في مشغل مخصص.
