# بدء العمل

غورافيل تجعل من السهل على المطورين أن يتفاعلوا مع قواعد البيانات باستخدام 'facades.Orm()\`. وهو يقدم حاليا دعما رسميا
لقواعد البيانات الأربع التالية:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- خادم SQL 2017+

قبل البدء، تكوين قاعدة البيانات في `.env` وتأكيد تكوين `default` في `config/database.go`.

# الإعدادات

لتكوين قواعد البيانات، انتقل إلى `config/database.go`. هذا هو المكان الذي يمكنك فيه تخصيص جميع اتصالات قاعدة البيانات و
اختر اتصال 'افتراضي'. يعتمد التكوين في هذا الملف على المتغيرات البيئية للمشروع و
يعرض مختلف تكوينات قاعدة البيانات التي تدعمها Goravel .

### DSN

يمكنك أيضًا استخدام DSN للاتصال بقاعدة البيانات مباشرة، فقط تكوين الحقل 'dsn' في ملف الإعداد:

```go
"postgres": map[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### قراءة وكتابة الاتصالات

Sometimes you may wish to use one database connection for `SELECT` statements, and another for `INSERT`, `UPDATE`, and
`DELETE` statements. الغورافيل يجعل هذا نوعاً.

لمعرفة كيف ينبغي تكوين اتصالات القراءة/الكتابة، دعونا ننظر إلى هذا المثال:

```go
import "github.com/goravel/framework/contracts/database"

// config/database.go
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "read": []database.Config{
      {Host: "192.168.1.1", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database.Config{
      {Host: "192.168.1.2", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "host": config.Env("DB_HOST", "127.0.0.1"),
    "port":     config.Env("DB_PORT", 3306),
    "database": config.Env("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config.Env("DB_PASSWORD", ""),
    "charset":  "utf8mb4",
    "loc":      "Local",
  },
}
```

لقد قمنا بتحديث مصفوفة التكوين بمفتاح جديد - 'read`و 'الكتابة'. وسيستخدم الاتصال`read`
`192.168.1.1' كمضيف، في حين أن الاتصال `الكتابي` سيستخدم `192.168.1.2`. كلا الاتصالين سيشاركان نفس بادئة قاعدة البيانات
ومجموعة الأحرف والخيارات الأخرى المحددة في صفيفة Mysql الرئيسية. في حالة تعدد القيم في مجموعة إعدادات
'host'، سيتم اختيار مضيف قاعدة البيانات عشوائيا لكل طلب.

### مخزن الاتصال

يمكنك تكوين مجمع اتصال في ملف الإعداد، التكوين المعقول لمعلمات مجمع الاتصال
يمكن أن يحسن أداء التزامن بشكل كبير:

| المفتاح                                                                          | اجراء                           |
| -------------------------------------------------------------------------------- | ------------------------------- |
| pool.max_idle_conns    | الحد الأقصى لاتصالات الخمول     |
| pool.max_open_conns    | الحد الأقصى للاتصالات المفتوحة  |
| pool.conn_max_idletime | الحد الأقصى لوقت الخمول للروابط |
| pool.conn_max_life     | الإتصالات الحد الأقصى لعمر      |

### مخطط

دعم Botgres و Sqlserver لتكوين المخطط. يمكن للمشكلات تعيين المخطط مباشرة في ملف الإعداد، بينما يحتاج
Sqlserver إلى تحديد المخطط من خلال طريقة 'TableName' في النموذج.

#### Postgres

```go
"الاتصالات": خريطة[string]أيًّا،
  "ما بعد": خريطة[string]أيًّا،
    "السائق": "ما بعد"،
    ...
    "مخطط": "goravel"،
  }،
}
```

#### Sqlserver

```go
مربع (r *المستخدم) TableName() سلسلة {
  إرجاع "goravel.users"
}
```

### الحصول على معلومات قاعدة البيانات

يمكنك استخدام الأمر `db:show` لعرض جميع الجداول في قاعدة البيانات.

```bash
اذهب للتشغيل. حرفي db:show
```

يمكنك أيضًا استخدام الأمر 'db:table' لعرض بنية جدول محدد.

```bash
قم بتشغيل. قم بتشغيل Db:table
. مستخدمين حرفيين Db:table
```

## تعريف النموذج

لإنشاء نموذج مخصص، يرجى الرجوع إلى الملف النموذجي `app/models/user.go` المدرج في الإطار. يحتوي `struct`
في `app/models/user.go` على إطارين مضمنين: `orm.Model` و`orm.SoftDeletes`. هذه الأطر تعرف الخصائص
`id`, `created_at`, `updated_at`, and `deleted_at` على التوالي. مع \`orm.SoftDeletes'، يمكنك تمكين الحذف الناعم
للنموذج.

### الاتفاقية النموذجية

1. اسم النموذج مع حبال كبيرة؛
2. استخدام الشكل المعد للنموذج "اسم الثعابين" كإسم الجدول؛

على سبيل المثال، اسم النموذج هو `UserOrder`، واسم الجدول هو `user_orders`.

### إنشاء موديل

استخدم الأمر \`make:model' لإنشاء نموذج:

```shell
ابدأ بالتشغيل. ابدأ تشغيل المستخدم الحرفي: النموذج
. حرفي: نموذجي المستخدم / المستخدم
```

يوجد ملف النموذج الذي تم إنشاؤه في ملف "app/models/user.go"، والمحتوى كما يلي:

```go
نماذج الحزمة

استيراد (
  "github.com/goravel/framework/database/orm"


من نوع المستخدم الذي تم تركيبه {
  orm. Odel
  سلسلة اسم
  مقطع رمزي
  orm.SoftDeletes
}
```

إذا كنت ترغب في تعيين حقل النموذج إلى `أي`، تحتاج إلى إضافة علامة إضافية: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Name   string
  Avatar string
  Detail any `gorm:"type:text"`
  orm.SoftDeletes
}
```

يمكن العثور على المزيد من تفاصيل استخدام العلامات في: <https://gorm.io/docs/models.html>.

### تحديد اسم الجدول

```go
نماذج الحزمة

استيراد (
  "github.com/goravel/framework/database/orm"


من نوع المستخدم الذي تم تركيبه {
  orm. Odel
  سلسلة الاسم
  سلسلة الصورة الرمزية
  عوام. oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### اتصالات قاعدة البيانات

بشكل افتراضي، تستخدم جميع النماذج اتصال قاعدة البيانات الافتراضي الذي تم تكوينه لتطبيقك. إذا كنت ترغب في تحديد اتصال متميز
لاستخدامه عند التفاعل مع نموذج معين، تحتاج إلى تعريف طريقة "الاتصال" على النموذج
.

```go
نماذج الحزمة

استيراد (
  "github.com/goravel/framework/database/orm"


من نوع المستخدم الذي تم تركيبه {
  orm. Odel
  سلسلة الاسم
  سلسلة الصورة الرمزية
  عوام. متكرر حذف
}

func (r *User) Connection() string {
  return "postgres"
}
```

## واجهة المهام المتاحة

| الاسم     | اجراء                                                                                    |
| --------- | ---------------------------------------------------------------------------------------- |
| اتصال     | [تحديد اتصال قاعدة البيانات](#specify-database-connection)                               |
| DB        | [واجهة قاعدة البيانات العامة sql.DB](#generic-database-interface-sql-db) |
| الاستعلام | [احصل على قاعدة البيانات](#get-database-instance)                                        |
| معاملة    | [Transaction](#transaction)                                                              |
| السياق    | [سياق الحقن](#inject-context)                                                            |

## facades.Orm().Query() الوظائف المتاحة

| الدوال         | اجراء                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ابدأ           | [بدء المعاملة](#transaction)                                                                                                               |
| التزم          | [إجراء المعاملة](#transaction)                                                                                                             |
| العد           | [Count](#count)                                                                                                                            |
| إنشاء          | [Create](#create)                                                                                                                          |
| Cursor         | [Cursor](#cursor)                                                                                                                          |
| حذف            | [Delete](#delete)                                                                                                                          |
| مميز           | [تصفية الالتماسات](#filter-repetition)                                                                                                     |
| سائق           | [Get Driver](#get-driver)                                                                                                                  |
| إكستاسي        | [تنفيذ التحديث الأصلي SQL](#execute-native-update-sql)                                                                                     |
| موجود          | [Exists](#exists)                                                                                                                          |
| البحث          | [استبيان سطر واحد أو أكثر بواسطة المعرف](#query-one-or-multiple-lines-by-id)                                                               |
| FindOrFail     | [لم يتم العثور على خطأ إرجاع](#not-found-return-error)                                                                                     |
| الأول          | [استعلام سطر واحد](#query-one-line)                                                                                                        |
| أولاً أو       | [الاستعلام أو إرجاع البيانات من خلال رد المكالمة](#query-one-line)                                                                         |
| أولاً إنشاء    | [استرجاع أو إنشاء نماذج](#retrieving-or-creating-models)                                                                                   |
| أوستورنيو      | [استرجاع أو نماذج جديدة](#retrieving-or-creating-models)                                                                                   |
| الفشل الأول    | [لم يتم العثور على خطأ](#not-found-error)                                                                                                  |
| حذف القوة      | [الإجبار على حذف الحذف] (#delete)                                   |
| احصل           | [الاستعلام خطوط متعددة](#query-multiple-lines)                                                                                             |
| مجموعة         | [Group](#group-by--having)                                                                                                                 |
| وجود           | [Having](#group-by-having)                                                                                                                 |
| الانضمام       | [Join](#join)                                                                                                                              |
| الحد           | [Limit](#limit)                                                                                                                            |
| LockForUpdate  | [القفل المتشائم](#pessimistic-locking)                                                                                                     |
| الموديل        | [حدد نموذج](#specify-table-query)                                                                                                          |
| إزاحة          | [Offset](#offset)                                                                                                                          |
| طلب            | [Order](#order)                                                                                                                            |
| ترتيب          | [Order](#order)                                                                                                                            |
| OrderByDesc    | [Order](#order)                                                                                                                            |
| ترتيب عشوائي   | [Order](#order)                                                                                                                            |
| أوراين         | [OrWhere](#where)                                                                                                                          |
| أوروينوتين     | [OrWhereNotIn](#where)                                                                                                                     |
| OrWhereNull    | [OrWhereNull](#where)                                                                                                                      |
| أوروين         | [OrWhereIn](#where)                                                                                                                        |
| صفحة           | [Paginate](#paginate)                                                                                                                      |
| بلوك           | [عمود استعلام واحد](#query-single-column)                                                                                                  |
| نيء            | [تنفيذ SQL](#execute-native-sql)                                                                                                           |
| إستعادة        | [Restore](#restore)                                                                                                                        |
| Rollback       | [المعاملة الاحتياطية](#transaction)                                                                                                        |
| حفظ            | [تحديث نموذج موجود](#update-a-existing-model)                                                                                              |
| حفظ بهدوء      | [حفظ نموذج واحد بدون أحداث] (#saving-a-single-model-without-events) |
| فحص            | [المسح الضوئي] (#execute-native-sql)                                |
| النطاقات       | [Scopes](#scopes)                                                                                                                          |
| حدد            | [تحديد الحقول](#specify-fields)                                                                                                            |
| قفل مشترك      | [القفل المتشائم](#pessimistic-locking)                                                                                                     |
| Sum            | [Sum](#sum)                                                                                                                                |
| الجدول         | [حدد جدول](#specify-table-query)                                                                                                           |
| ToSql          | [Get SQL](#get-sql)                                                                                                                        |
| ToRawSql       | [Get SQL](#get-sql)                                                                                                                        |
| تحديث          | [تحديث عمود واحد](#update-a-single-column)                                                                                                 |
| تحديث          | [تحديث أو إنشاء](#update-or-create)                                                                                                        |
| أين            | [Where](#where)                                                                                                                            |
| بين            | [WhereBetween](#where)                                                                                                                     |
| حيث            | [WhereNotBetween](#where)                                                                                                                  |
| أين نوتين      | [WhereNotIn](#where)                                                                                                                       |
| حيث فارغ       | [WhereNull](#where)                                                                                                                        |
| أين            | [WhereIn](#where)                                                                                                                          |
| أحداث الانسحاب | [كتم الأحداث](#muting-events)                                                                                                              |
| سحب            | [الاستعلام حذف البيانات الناعمة](#query-soft-delete-data)                                                                                  |

## منشئ الاستعلام

### حقن السياق

```go
facades.Orm().WithContext(ctx)
```

### تحديد اتصال قاعدة البيانات

إذا تم تعريف اتصالات متعددة بقاعدة البيانات في 'config/database.go`، يمكنك استخدامها من خلال دالة 'Connection'
من 'facades.Orm()`. يجب أن يكون اسم الاتصال الذي يتم تمريره إلى 'الاتصال`أحد الاتصالات المكونة في`config/database.go\`:

```go
facades.Orm().Connection("mysql")
```

### واجهة قاعدة البيانات العامة sql.DB

واجهة قاعدة البيانات العامة sql.DB، ثم استخدم الوظيفة التي توفرها:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// إغلاق
db. فقدان ()

// إرجاع بيانات قاعدة البيانات
db.Stats()

// SetMaxIdleConns يحدد الحد الأقصى لعدد الإتصالات في مخزن الإتصال الخامل
db. etMaxIdleConns(10)

/ SetMaxOpenConns يحدد الحد الأقصى لعدد الاتصالات المفتوحة إلى قاعدة البيانات
db. etMaxOpenConns(100)

// SetConnMaxLifetime يحدد الحد الأقصى من الوقت الذي يمكن فيه إعادة استخدام الاتصال
db.SetConnMaxLifetime(time.Hour)
```

### الحصول على مثيل قاعدة البيانات

وقبل كل عملية محددة من عمليات قاعدة البيانات، من الضروري الحصول على مثال على قاعدة البيانات.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### حدد

#### استعلام سطر واحد

```go
vuser models.user
facades.Orm().Query().First(&user)
// SELECT * من `المستخدمين` أوردير من `users`.`id` LMIT 1;
```

في بعض الأحيان قد ترغب في تنفيذ بعض الإجراءات الأخرى إذا لم يتم العثور على نتائج. طريقة "أولاً" سوف ترجع نموذج
واحد أو، إذا لم يتم العثور على نتائج، تنفيذ إغلاق معين. يمكنك تعيين القيم للنموذج في الإغلاق:

```go
facades.Orm().Query().حيث ("name", "first_user").FirstOr(&user, func() خطأ {
  user.Name = "goravel"

  Renl
})
```

#### استفسر عن سطر واحد أو أكثر بواسطة المعرف

```go
var user models.user
facades.Orm().Query().Find(&user, 1)
// SELECT * من `users` WHERE `users`.`id` = 1;

var users []models. انظر
facades.Orm().Query().Find(&users, []int{1,2,3}
// SELECT * من `المستخدمين` إلى `المستخدمين`.`id` في (1,2,3)؛
```

#### لم يتم العثور على خطأ الإرجاع

```go
تطبيق نماذج المستخدم.المستخدم
خطأ:= facades.Orm().Query().FindOrFail(&user, 1)
```

#### عندما يكون المفتاح الأساسي لجدول المستخدم هو نوع "سلسلة"، تحتاج إلى تحديد المفتاح الأساسي عند الاتصال

طريقة 'العثور على\`

```go
var user models.user
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * من `users` WHERE `users`.`uuid` = "a";
```

#### استعلام سطور متعددة

```go
المستخدمين []models.user
facades.Orm().Query().حيث ("معرف في ?", []int{1,2,3}).Get(&users)
// SELECT * من معرف `users` في (1,2,3)؛
```

#### استرداد أو إنشاء نماذج

طريقة "FirstOrCreate" تبحث عن سجل قاعدة بيانات باستخدام العمود/أزواج القيمة المحددة. إذا كان الموديل لا يمكن أن يكون
موجود في قاعدة البيانات، إنه ينشئ سجلاً جديداً مع السمات من دمج الحجة الأولى مع الحجة الثانية الاختيارية
.

وبالمثل فإن طريقة "FirstOrNew" تحاول أيضاً تحديد مكان سجل في قاعدة البيانات استناداً إلى السمات المعطاة. However,
if it is not found, a new instance of the model is returned. It's important to note that this new model has not been
saved to the database yet and you need to manually call the `Save` method to do so.

```go
var user models.user
facades.Orm().Query().حيث ("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * من `users` WHERE `gender` = 1 و `users`. اسم 'tom' ORDER BY 'users`.`id' LIMIT 1;
/INSERT INTO 'users` ('created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().حيث ("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * من `المستخدمين` إلى `gender` = 1 و`users`.`name` = `tom' ORDER BY `users`. id` LMIT 1;
// INSERT INTO `المستخدمين` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

نماذج مستخدم var انظر
facades.Orm().Query().حيث ("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * من `المستخدمين` إلى `gender` = 1 و`المستخدمين`. الاسم = 'tom' ORDER BY `users`.`id' LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * من `المستخدمين` حيث `gender` = 1 و`users`.`name` = `tom' ORDER BY `users`.`id` LIMIT 1؛
```

#### لم يتم العثور على خطأ

عندما لا يتم العثور على العنصر المطلوب، فإن طريقة "أولاً" لا تنشئ خطأ. لإنشاء خطأ، استخدم طريقة
\`FirstOrFail':

```go
vuser models.user
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFوجد
```

### أين

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
facades.Orm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Query().OrWhereIn("name", []any{"a"})
```

### الحد

```go
المستخدمون []models.user
facades.Orm().Query().حيث ("الاسم = ?", "tom").Limit(3).Get(&users)
// SELECT * من 'users` WHERE name = 'tom' LIMIT 3؛
```

### إزاحة

```go
المستخدمين []models.user
facades.Orm().Query().حيث ("الاسم = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * من `المستخدمين' حيث الاسم = 'tom' LIMIT 3 OFFSET 5;
```

### طلب

```go
مستخدمو var []models.user
facades.Orm().Query().here("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// حدد * من "المستخدمين" 'users' WHERE name = 'tom' ORDER BY varic,id desc;

faces. rm().Query().حيث ("الاسم = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * من "المستخدمين" حيث الاسم = 'tom' ORDER BY type asc;

facades.Orm().Query().here("الاسم = ?", "tom"). rderBy("sort", "desc").Get(&users)
// حدد * من 'users` WhERE name = 'tom' ORDER PY desc;

facades.Orm().Query().حيث ("الاسم = ?", "tom").OrderByDesc("sort"). et(&users)
// حدد * من 'users' الاسم = 'tom' ORDER BY desc;

facades.Orm().Query. هنا ("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * من 'مستخدمين 'users` WHERE name = 'tom' ORDER BY RAND();
```

### صفحة

```go
var users []models.User
var total int64
facades.Orm().Query().Paginate(1, 10, &users, &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### استعلام العمود الفردي

```go
عبر الأعمار []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### تحديد استعلام الجدول

إذا كنت ترغب في الاستعلام عن بعض البيانات الإجمالية، تحتاج إلى تحديد جدول محدد.

تحديد نموذج

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users' WHERE حذف_at IS NULL;
```

تحديد جدول

```go
قم بحساب int
facades.Orm().Query().Table("users").Count(&count)
// SELECT العد (*) من `users`; // احصل على جميع السجلات، سواء حذفت أو لم تحذف
```

### Get SQL

احصل على SQL مع العنصر النائب:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * من "المستخدمين" حيث "id" = $1 و"المستخدمين"."حذف_at" ISNULL
```

الحصول على SQL مع القيمة:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * من "المستخدمين" حيث "id" = 1 و "users"."deleted_at" IS NULL
```

ويمكن تسمية الأساليب بعد `ToSql` و`ToRawSql`: `Count`، `Create`، `حذف`، `Find`، `أولاً`، `Get`، `Pluck`،
`Save`، `Sum`، `تحديث`.

### العد

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### تحديد الحقول

"Select" يسمح لك بتحديد الحقول التي سيتم استرجاعها من قاعدة البيانات، بشكل افتراضي تسترجع ORM جميع الحقول.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### مجموعة حسب و

```go
نوع النتيجة بنيت {
  Name string
  Total int
}

var نتيجة
facades.Orm().Query().Model(&models.User{}). elect("الاسم، المجموع (العمر) كالمجموع").Group("الاسم").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) كمجموع 'users` GROUP BY `name` تحمل الاسم = "tom";
```

### الانضمام

```go
نوع النتيجة بنيت {
  اسم السلسلة
  سلسلة البريد الإلكتروني




 نتيجة
facades.Orm().Query().Model(&models.User{}).Select("المستخدمون". لعب, emails.email").Join("إنضم اليسار إلى رسائل البريد الإلكتروني على emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN Eails ON emails.user_id = users.id;
```

### إنشاء

```go
المستخدم := models.User{Name: "tom", Age: 18}
err := facades.Orm().Query. reate(&user)
// INSERT INTO مستخدمين (الاسم، الأعمار، إنشاء_at, تحديث_at) VALUES ("tom", 18, "2022-09-27 22:00:00"، "2022-09-27 22:00")؛

// عدم تشغيل أحداث النموذج
الخطأ := الواجهة. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

/// المنشط النموذجي
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### إنشاء متعدد

```go
المستخدمون := []models.User{{name: "tom", Age: 18}, {name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users"). reate(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm. uery().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> سيتم ملء 'created_at' و 'updated_at' تلقائيا.

### Cursor

يمكن استخدامه لتقليل استهلاك ذاكرة تطبيقك بشكل كبير عند التكرار من خلال عشرات الآلاف من سجلات الطراز
Eloquent. لاحظ أن طريقة "المؤشر" يمكن استخدامها مع "with" في نفس الوقت، الرجاء
استخدام [Lazy Eager loadading](./relationships#lazy-eager-loadingلتحميل العلاقة في منطق 'for'.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var user models.User
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### حفظ الموديل

#### تحديث نموذج موجود

```go
Vuser models.user
facades.Orm().Query().First(&user)

user.Name = "tom"
user.
 user.Age = 100
facades.Orm().Query. ave(&user)
//UPDATE `users` مجموعة `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`=' WHERE `id` = 1؛
```

#### تحديث الأعمدة

```go
facades.Orm().Query().Model(&models.User{}).حيث ("name", "tom").Update("name", "hello")
// UPDATE `users` مجموعة `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Wherename", "tom").Update(models. ser{name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
/UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489`,`name`=',`age`=18 WHERE `name` = 'tom'؛
```

> عند التحديث مع 'هيكل`، سيقوم Orm فقط بتحديث حقول غير الصفر. قد ترغب في استخدام `map`لتحديث السمات أو
> استخدم`Select`لتحديد الحقول للتحديث. لاحظ أن`struct`لا يمكن إلا أن يكون`Model`، إذا كنت ترغب في التحديث مع non
> `Model`، تحتاج إلى استخدام `. غير أنه لا يمكن تحديث حقل "تحديث" تلقائياً في هذا الوقت
> .

#### تحديث أو إنشاء

الاستعلام بواسطة `name'، إذا لم يكن موجودا، إنشاء بواسطة `name'، `avatar'، إذا كان موجودا، تحديث `avatar' استنادًا إلى `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * حيث 'users`.'name' = 'name' = 'name' and 'users`.`حذف_at` NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `المستخدمين` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:0869','08-08-08. 69',NULL,'name','avatar');
//UPDATE 'users` مجموعة 'name'='name',avatar'='avatar',`updated_at'='2023-03-11 10:11:08.881' WHERE users`.`حذف_at` NULL و `id' = 1؛
```

### حذف

حذف بنموذج ، يتم إرجاع عدد الصفوف المتأثرة بالبيان بالطريقة:

```go
vuser models.user
facades.Orm().Query().Find(&user, 1)
s، الخطأ := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). هنا ("id", 1).delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).delete()
// DELETE FROM `users`.`id` = 1;

num := res.RowsAffected
```

حذف متعدد

```go
facades.Orm().Query().حيث ("الاسم = ?", "tom").Delete(&models.User{})
// DELETE من `المستخدمين' WHERE name = 'tom';
```

تريد فرض حذف بيانات غير مألوفة.

```go
v. facades.Orm().Query().here("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").Forcedelete()
```

يمكنك حذف السجلات مع روابط النموذج عن طريق "اختيار":

```go
// حذف حساب المستخدم عند حذف المستخدم
facades.Orm().Query().Select("الحساب").Delete(&user)

// حذف الطلبات و creditCards للمستخدم عند حذف المستخدم
facades.Orm().Query().Select("الطلبات"، "creditCards"). elete(&user)

// حذف جميع الرابطات الفرعية للمستخدم عند حذف المستخدم
facades.Orm().Query().Select(orm.Associations). elete(&user)

/ حذف جميع حسابات المستخدمين عند حذف المستخدمين
facades.Orm().Query().Select("الحساب").حذف(&users)
```

ملاحظة: سيتم حذف الروابط فقط إذا لم يكن المفتاح الرئيسي للسجل فارغاً، ويستخدم Orm هذه المفاتيح الأساسية
كشروط لحذف السجلات المرتبطة:

```go
// حذف المستخدم الذي اسم='goravel', ولكن لا تحذف حساب المستخدم
facades.Orm().Query().Select("الحساب").حيث ("الاسم = ?", "goravel"). elete(&models.User{})

// حذف المستخدم الذي اسمه = 'goravel' و المعرف = 1، وحذف حساب واجهة المستخدم
. rm().Query().Select("الحساب").حيث ("الاسم = ?", "goravel").Delete(&models.user{ID: 1}

// حذف المستخدم المعرف = 1 وحذف حساب ذلك المستخدم
facades.Orm().Query().Select("الحساب").حذف (&models.user{ID: 1})
```

إذا تم تنفيذ الحذف بدون أي شروط، فإن ORM لا يقوم بذلك ويعيد خطأ. So you have to add some
conditions, or use native SQL.

### استعلام حذف البيانات الناعمة

```go
إختر نماذج المستخدم.المستخدم
facades.Orm().Query().WithTrashed().First(&user)
```

### تصفية التكرار

```go
المستخدمين []models.user
facades.Orm().Query().Distinct("name").Find(&users)
```

### احصل على سائق

```go
السائق := facades.Orm().Query().Driver()

// قاضي السائق
إذا كان السائق =orm.DriverMysql {}
```

### تنفيذ SQL الأصلية

```go
نوع النتيجة بنيت {
  ID int
  اسم السلسلة
  Age int


var النتيجة
. rm().Query().Raw(“SELECT id, name, age FROM users WHERE name = ?”, "tom").Scan(&result)
```

### تنفيذ التحديث الأصلي SQL

يتم إرجاع عدد الصفوف التي تأثرت بالبيان بالطريقة:

```go
res, err := facades.Orm().Query().Exec("مستخدمو DROP TABLE")
// DROP TABLE `مستخدمين`;

num := res.RowsAffected
```

### موجود

```go
يوجد var bool
facades.Orm().Query().Model(&models.User{}).حيث ("name", "tom").Exists(&exists)
```

### إستعادة

```go
facades.Orm().Query().WithTrashed().Restore(&models.user{ID: 1})
facades.Orm().Query().Model(&models.user{ID: 1}).WithTrashed().Restore()
//UPDATE `users` مجموعة `حذف_at`=NULL WHERE `id` = 1؛
```

### معاملة

يمكنك تنفيذ معاملة من خلال دالة "المعاملة".

```go
استيراد (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"


. .

Refacades.Orm().Transaction(function(tx orm.Query) خطأ {
  var user models.User

  Retx.Find(&user, user.ID)
})
```

يمكنك أيضًا التحكم يدويًا في تدفق المعاملة بنفسك:

```go
tx, err := facades.Orm().Query().Begin()
المستخدم := models.User{Name: "Goravel"}
إذا حدث خطأ := tx. reate(&user); خطأ!= nl {
  خطأ:= tx.Rollback()
} آخر{
  err := tx.Commit()
}
```

### النطاقات

يسمح لك بتحديد الاستعلامات الشائعة الاستخدام التي يمكن الرجوع إليها عند تسمية الطريقة.

```go
ممزق Paginator(سلسلة الصفحة، سلسلة محدودة) دالة (methodorm.Query) orm. استعلام {
  إعادة دالة (الاستعلام orm.Query) orm.Query {
    صفحة، _ := strconv. حد toi(صفحة)
    ، _ := strconv. toi(limit)
    إزاحة := (صفحة - 1) * حد

    إستعلام العودة. ffset(offset).Limit(limit)



// scopes.Paginator هي وظيفة مخصصة: وظيفة (ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### التعبيرات الخام

يمكنك استخدام طريقة 'db.Raw' لتحديث الحقول:

```go
استيراد "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
//UPDATE `users` مجموعة `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`حذف_at` NULL و`id` = 1؛
```

### قفل متشائم

يتضمن منشئ الاستعلامات أيضًا بعض الدوال لمساعدتك على تحقيق "القفل المتشائم" عند تنفيذ عبارات `select`
الخاصة بك.

لتنفيذ بيان مع "قفل مشترك"، يمكنك أن تسمي طريقة `مشاركة`. القفل المشترك يمنع صفوف
المحددة من التعديل حتى يتم تنفيذ المعاملة الخاصة بك:

```go
المستخدمين []models.user
facades.Orm().Query().حيث ("صوت"، ">"، 100).SharedLock().Get(&users)
```

بدلاً من ذلك، يمكنك استخدام طريقة "LockForUpdate". قفل "للتحديث" يمنع السجلات المحددة من أن تكون
معدلة أو من أن يتم اختيارها مع قفل مشترك آخر:

```go
المستخدمين []models.user
facades.Orm().Query().حيث ("صوت"، ">"، 100).LockForUpdate().Get(&users)
```

### Sum

```go
قيمة المبلغ
إذا حدث خطأ := facades.Orm().Query().Model(models.User{}).Sumr ("id", &sum); err != nl {
  return err
}
fmt.Println(sum)
```

## الأحداث

Orm models dispatch several events, allowing you to hook into the following moments in a model's lifecycle: `Retrieved`,
`Creating`, `Created`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

سيتم إرسال حدث "استرجاع" عندما يتم استرجاع نموذج موجود من قاعدة البيانات. عندما يتم حفظ موديل جديد ل
المرة الأولى، سيتم إرسال الحدثين "إنشاء" و "إنشاء". أحداث "تحديث" / "تحديث" سوف ترسل عندما يتم تعديل النموذج
ويتم تسمية طريقة "حفظ". أحداث "حفظ" / "حفظ" سوف ترسل عندما يتم إنشاء أو تحديث النموذج* حتى إذا لم يتم تغيير سمات النموذج. أسماء الأحداث التي تنتهي بـ \`-ing' هي
 التي ترسل قبل أن تستمر أي تغييرات على النموذج، بينما الأحداث التي تنتهي بـ '-ed' ترسل بعد
 تستمر التغييرات على النموذج.

لبدء الإستماع إلى أحداث نموذجية، حدد طريقة "ارسال" على النموذج الخاص بك. هذه الخاصية تخطط نقاط مختلفة
من دورة حياة النموذج لفصول الحدث الخاصة بك.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm.Model
 Name    string
}

func (u *User) DispatchesEvents() map[contractsorm.EventType]func(contractsorm.Event) error {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm.EventCreating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRetrieved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestored: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestoring: func(event contractsorm.Event) error {
   return nil
  },
 }
}
```

> ملاحظة: فقط قم بتسجيل الأحداث التي تحتاجها. ولا ترسل أحداث نموذجية عند القيام بعمليات دفعة من خلال شركة Orm.

### المراقبون

#### تعريف المراقبين

إذا كنت تستمع إلى العديد من الأحداث على نموذج معين، يمكنك استخدام المراقبين لتجميع جميع المستمعين في صف
واحد. صفوف المراقبين لديها أسماء طرق تعكس أحداث Eloquent التي ترغب في الاستماع إليها. كل من هذه الطرق
يتلقى النموذج المتضرر كحجتهم الوحيدة. The `make:observer` Artisan command is the easiest way to create a
new observer class:

```shell
go run . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

هذا الأمر سوف يضع المراقب الجديد في دليل "app/Observers" الخاص بك. إذا كان هذا الدليل غير موجود، سيقوم Artisan
بإنشائه لك. سيبدو مراقبك الجديد كما يلي:

```go
حزمة المراقبين

استيراد (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"


نوع بنية المراقب UserObsert{}

func (u *UserObserver) تم إنشاؤه (حدث العلم. الحدث) خطأ {
 return nil
}

مربع (u *UserObserver) تم تحديثه (حدث orm.Event) خطأ {
 return nil
}

func (u *UserObserver) تم حذفه (حدث العلم. حدث) خطأ {
 return nil
}

مربع (u *UserObserver) Forcedeleted(الحدث orm.Event) خطأ {
 return nil
}
```

المراقب عن القالب يحتوي فقط على بعض الأحداث، يمكنك إضافة أحداث أخرى وفقا لاحتياجاتك.

لتسجيل مراقب، تحتاج إلى الاتصال بطريقة "المراقبة" على النموذج الذي ترغب في ملاحظته. يمكنك تسجيل
مراقبين بطريقة 'Boot' لمقدم خدمة 'app/providers/event_service_provider.go::Boot':

```go
موفري الحزمة

استيراد (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"



نوع EventServiceProModer struct {


func (المتلقي *EventServiceProvider) Register(مؤسسة التطبيق. التكرار) {
 facades.Event().register(receiver. isten())


func (المتلقي *EventServiceproviders er) Boot(app Foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. سيرفير{})


الفونك (المستلم *EventServiceprovider) يستمع إلى خريطة[event.Event][]event.Listener {
 map[event.Event][]event.Listener{}
}
```

> ملاحظة: إذا قمت بتعيين 'إرسال الأحداث' و 'المراقب' في نفس الوقت، سيتم تطبيق 'إرسال الأحداث' فقط.

#### المعلمة في المراقب

سيتم نقل معلمة "الحدث" إلى جميع المراقبين:

| الطريقة      | اجراء                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| السياق       | احصل على السياق الذي مر بواسطة `facades.Orm().WithContext()`                                               |
| GetAttribute | احصل على القيمة المعدلة، اذا لم يتم تعديلها، احصل على القيمة الأصلية، اذا لم تكن هناك قيمة أصلية، ارجع صفر |
| Getالأصل     | احصل على القيمة الأصلية، إذا لم تكن هناك قيمة أصلية، أرجع صفر                                              |
| أسديرتي      | تحديد ما إذا كان الحقل قد تم تعديله                                                                        |
| IsClean      | إيسديرتي عكس                                                                                               |
| الاستعلام    | احصل على استعلام جديد، والذي يمكن استخدامه مع المعاملة                                                     |
| SetAttribute | تعيين قيمة جديدة لحقل                                                                                      |

### كتم الأحداث

قد تحتاج أحياناً إلى "كتم" جميع الأحداث التي يطلقها نموذج مؤقتاً. يمكنك تحقيق هذا باستخدام طريقة
`انسحابات الأحداث`:

```go
var user models.user
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### حفظ نموذج واحد بدون أحداث

في بعض الأحيان قد ترغب في "حفظ" نموذج معين دون إرسال أي أحداث. يمكنك تحقيق هذا باستخدام طريقة
'حفظ':

```go
vuser models.user
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
