# الهجرات

عندما يتعاون أشخاص متعددون لتطوير التطبيقات، من الأهمية بمكان أن يكون لدينا بنية قاعدة بيانات موحدة للمزامنة
. وبدون هذا، يمكن أن تكون هناك فوضى لأن البيانات الفردية للجميع لن تتطابق. ترحيل قاعدة البيانات هو
الحل لهذه المشكلة. The database structure is version-controlled to ensure its consistency within all
developers.

## الإعدادات

وتخزن ملفات ترحيل قاعدة البيانات في دليل "قاعدة البيانات/الهجرات". يمكنك تكوين قاعدة البيانات
معلومات الاتصال في ملف \`config/database.go'. Currently, there are two drivers available for migrations: Go
language migration and SQL migration. ومع ذلك، ستتم إزالة ترحيل SQL في الإصدارات المقبلة.

```go
// السائقين المتاحين: "الافتراضي"، "sql"
"الهجرات": map[string]any{
  "السائق": "الافتراضي"،
  // يمكنك تجميع اسم جدول الهجرات
  "الجدول": "الهجرات"،
}،
```

## إنشاء عمليات هجرة

استخدم الأمر \`make:migration' لإنشاء الهجرة:

```shell
إذهب للتشغيل. صانع حرفي:migration create_users_table
```

سيؤدي هذا الأمر إلى إنشاء ملفات هجرة في دليل "قاعدة البيانات/الهجرات". سيبدأ كل ملف من ملفات الترحيل بطابع زمني
الذي سيستخدمه Goravel لتحديد أمر التنفيذ لملفات الترحيل.

### إنشاء سريع

استخدم `create_users_table' لإنشاء جدول يحتوي على البنية التحتية لـ `المستخدمين':

```
^create_(\w+)_table$
^create_(\w+)$
```

استخدم `add_avatar_to_users_table` لإنشاء بنية تلقائية لإضافة الحقول إلى جدول 'المستخدمين\`:

```
_(to<unk> from<unk> in)_(\w+)_table$
_(to<unk> from<unk> in)_(\w+)$
```

وإذا لم تكن الشروط المذكورة أعلاه متطابقة، فإن الإطار سينشئ ملف هجرة فارغ.

## هيكل الهجرة

### انتقل إلى نقل اللغة

يحتوي هيكل الترحيل على طريقتين: 'أعلى` و 'أسفل`. يتم استخدام طريقة "الارتفاع" لإضافة جداول جديدة أو أعمدة أو فهرسات
إلى قاعدة البيانات، بينما يتم استخدام طريقة "أسفل" للتراجع عن العمليات التي تقوم بها طريقة "أعلى". In these
two methods, you can use `facades.Schema()` to create and operate database tables. وللاطلاع على الأساليب المتاحة، انظر
[documentation](#tables). ستنشئ الترحيل التالي جدول "المستخدمين":

```go
ترحيل الحزمة

استيراد (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"


نوع M20241207095921CreateUserstable struct {


// توقيع التوقيع الفريد للهجرة.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
A)

// Up تشغيل الهجرة.
الفونك (r *M20241207095921CreateUsersTable) أعلى() خطأ {
 إذا كان !واجه. chema().HasTable("المستخدمون") {
  Refacades.Schema().Create("المستخدمون"، وظيفة (الجدول المخطط البياني Blueprint) {
   الجدول. D()
   table.String("الاسم").Nullable()
   table.String("البريد الإلكتروني").Nullable()
   ، الجدول. imestamps()
  })


 refl
}

/// Down Rereverse of the Migations.
فوتوك (r *M20241207095921CreateUsersTable) Down() error {
 Refacades.Schema().DropIfExists("المستخدمون")
}
```

#### تعيين اتصال الهجرة

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
مربع (r *M20241207095921CreateUsersTable) الاتصال() السلسلة {
  العودة "Connection-name"
}
```

### هجرة SQL

سيولد أمر الهجرة ملفين للترحيل: `***.up.sql` و `***.down.sql`، المقابل للتنفيذ و
التراجع، على التوالي. يمكنك كتابة بيانات SQL مباشرة في هذين الملفين.

```sql
-- ***.Up. ql
إنشاء 'مستخدمين' ' (
  'id' كبير(20) لم يتم التوقيع NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULLL
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL NULL,
  مفتاح بريميري (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci؛

-- ***. 'ussql
DROP TABLE 'users';
```

## تسجيل الهجرات

عند استخدام ترحيل اللغة، تحتاج إلى تسجيل ملفات الترحيل في ملف "قاعدة البيانات/kernel.go" بعد إنشاء ملفات الترحيل
:

```go
//database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migations.M20241207095921CreateUsersTable{},
 A}
}
```

لا تحتاج ترحيل SQL إلى تسجيل، لأن الإطار سيقوم تلقائياً بمسح ملفات SQL في دليل "قاعدة البيانات"
A.

## تشغيل عمليات الترحيل

لتشغيل جميع الهجرات المعلقة لديك، قم بتنفيذ الأمر الفني 'migrate' :

```shell
إذهب للتشغيل. هجرة حرفية
```

إذا كنت ترغب في رؤية أي عمليات هجرة تم تنفيذها حتى الآن، يمكنك استخدام الأمر الفني \`migrate:status': Artisan:

```shell
إذهب إلى التشغيل. ترحيل حرفي: الحالة
```

## هجرات الرجوع المتدحرجة

لدحر آخر هجرة، استخدم أمر "التراجع" الفنون. هذا الأمر يعيد آخر "دفعة" من الهجرات
، والتي قد تتضمن ملفات ترحيل متعددة:

```shell
اذهب للتشغيل. ترحيل حرفي: التراجع
```

يمكنك الرجوع إلى عدد محدود من عمليات الترحيل عن طريق تقديم خيار "الخطوة" إلى الأمر "التراجع. For example,
the following command will roll back the last five migrations:

```shell
بدء التشغيل. ترحيل الحرفي:التراجع --step=5
```

الأمر 'migrate:reset' سوف يعيد جميع عمليات هجرة تطبيقك:

```shell
إذهب للتشغيل. ترحيل حرفي:reset
```

### عودة و هجرة باستخدام أمر واحد

الأمر 'migrate:refresh' سوف يعيد جميع الهجرات الخاصة بك ثم ينفذ الأمر 'migrate'. هذا الأمر
يعيد بالفعل إنشاء قاعدة البيانات الخاصة بك بأكملها:

```shell
ابدأ في التشغيل. ترحيل الحرفي: التحديث
```

يمكنك التراجع وإعادة ترحيل عدد محدود من الهجرات عن طريق توفير خيار "الخطوة" لأمر "التحديث".
وعلى سبيل المثال، فإن القيادة التالية ستتراجع عن الهجرات الخمس الأخيرة وتعيد ترحيلها:

```shell
ابدأ التشغيل. ترحيل الحرفي:refresh --step=5
```

### إسقاط جميع الجداول و الترحيل

الأمر 'migrate:fresh' سوف يسقط جميع الجداول من قاعدة البيانات ثم ينفذ الأمر 'migrate':

```shell
اذهب للتشغيل. ترحيل حرفي:fresh
```

## الجداول

### إنشاء جدول

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### تحقق إذا كان الجدول / العمود موجود

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### اتصال بقاعدة البيانات

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### تحديث الجدول

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### إعادة التسمية / إسقاط الجدول

```go
facades.Schema().Rename("المستخدمون", "new_users")
facades.Schema().Drop("المستخدمون")
facades.Schema().DropIfExists("المستخدمون")

```

## الأعمدة

### أنواع الأعمدة المتاحة

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| زيادة               | BigInteger         | Boolean               | تشار                        |
| التاريخ             | التاريخ            | التاريخ تيميتز        | عشري                        |
| مزدوج               | [Enum](#enum)      | عائم                  | [ID](#id)                   |
| زيادة               | عدد صحيح           | زيادة عددية           | Json                        |
| زيادة               | LongText           | زيادة متوسطة          | MediumInteger               |
| النص المتوسط        | الزيادات الصغيرة   | عدد أصغر              | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | سلسلة              | نص                    | الوقت                       |
| TimeTz              | الطابع الزمني      | الطوابع الزمنية       | تايمز                       |
| تايمز               | UnsignedBigInteger | زيادة                 | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

إنشاء حقل 'Enum' الذي يمكن تخزينه في 'Mysql' وفقا للنوع في '[]any'، ولكن في قواعد البيانات `Postgres` و`Sqlite` و
`Sqlserver` ، إنه نوع `String`.

```go
table.Enum.Enum("الصعوبة"، []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

طريقة 'المعرف` هي عبارة عن اسم مستعار لطريقة 'الزيادة الثنائية`. By default, this method will create an `id` column; however,
if you would like to assign a different name to the column, you may pass the column name:

```go
table.ID()
table.ID("user_id")
```

#### SoftDeletes

وتضيف طريقة "SoftDeletes" عمودا `TIMESTAMP` غير قابل للإلغاء. القصد من هذا العمود تخزين
\`حذف_at' الوقت المطلوب لميزة "حذف ناعم" Orm :

```go
الجدول.SoftDeletes()
```

#### عمود مخصص

إذا كنت تستخدم أنواع الأعمدة التي لا يدعمها الإطار حتى الآن، يمكنك استخدام طريقة "العمود" لتخصيص نوع الحقل
:

```go
الجدول - عمود ("الهندسة"، "الهندسة")
```

### تعديل العمود

بالإضافة إلى أنواع الأعمدة المذكورة أعلاه، عند إضافة عمود إلى جدول قاعدة البيانات، يمكنك أيضًا إضافة "تعديلات" إلى
العمود. على سبيل المثال، للسماح بأن يكون العمود "nullable،" يمكنك استخدام طريقة "Nullable":

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

يحتوي الجدول التالي على جميع تعديلات الأعمدة المتاحة:

| معدّل                   | الوصف                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `.AutoZment()`          | تعيين عمود صحيح كزيادة تلقائية (المفتاح الأساسي)                                                     |
| `.Comment("تعليقي")`    | إضافة تعليق إلى العمود (MySQL / PostgreSQL)                                                          |
| `.Default(value)`       | تعيين القيمة الافتراضية للعمود                                                                                          |
| `.Nullable()`           | يسمح بإدخال قيم NULL في العمود                                                                                          |
| `.unsigned()`           | تعيين عمود صحيح كـ UNSIGNED (ميSQL فقط)                                                              |
| `.Usecurrent()`         | تعيين عمود طابع زمني لاستخدام CURRENT_TIMESTAMP كقيمة افتراضية                                     |
| `.UsecurrentOnUpdate()` | يعين العمود الزمني لاستخدام CURRENT_TIMESTAMP عندما يتم تحديث السجل (MySQL فقط) |

### إسقاط العمود

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## الفهارس

### إنشاء فهرس

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // إضافة المفتاح الرئيسي
  الجدول rimary("id")
  // إضافة المفتاح الأساسي المركب
  table.Primary("المعرف"، "name")

  // إضافة فهرس فريد
  . nque("name")
  table.Unique("الاسم"، "age")

  // إضافة المؤشر العادي
  table.Index("الاسم")
  الجدول ndex("الاسم"، "age")

  // إضافة فهرس النص الكامل
  table.FullText("الاسم")
  table.FullText("الاسم"، "age")
})
```

### إعادة تسمية الفهرس

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### فهرس الإسقاط

```go
facades.Schema().Table("المستخدمون", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_unique")
  table.DropIndex("name")
  table.DropIndexByName("name_index")
  table.DropFullT("name")
  table.DropFullTextByyName")
})
```

### إنشاء مفتاح أجنبي

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.unsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### إسقاط المفتاح الأجنبي

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
