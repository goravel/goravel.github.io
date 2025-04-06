# بدء العمل

وتعتمد وظيفة الاختبار لغورافيل على عنصر الاختبار الرسمي للجولانغ، وتمديد وحدة الاختبار لدعم اختبار التكامل
وتحسين قوة التطبيق.

## البيئة

### ملف بيئة مخصص

بشكل افتراضي، يتم استخدام ملف `.env` في الدليل الجذر لحقن معلومات التكوين أثناء الاختبار. إذا كنت
تريد استخدام مختلف ملفات `.env` لحزم مختلفة، يمكنك إنشاء `. ملف nv` في دليل الحزمة، و
الاختبار سوف يقرأ هذا الملف أولاً.

```
- /app
- /config
- ...
- /test
  - /feature
    - .env
    - user_test.go
- .env
```

بالإضافة إلى ذلك، يمكنك إنشاء ملف `.env.testing' في جذر مشروعك. سيتم استخدام هذا الملف بدلاً من
`. ملف nv`عند تشغيل الخيار`go test`مع الخيار`--env\`، لاحظ أن هذا الخيار يحتاج إلى اتباع دليل الاختبار،
على سبيل المثال:

```shell
اذهب إلى الاختبار ./... --env=.env.اختبار
اذهب إلى الاختبار ./... -e=.env.testing
```

### بنية \`TestCase'

هناك بنية "TestCase" في غورفل، وستوفر Struct بعض طرق الاختبار المناسبة في المستقبل، في
إضافة هناك طريقة 'init' في الملف نفسه، وهذه الطريقة توجه تسجيل التطبيق Goravel
قبل إجراء الاختبار. يمكنك تضمين أي منطق ضروري في هذه الطريقة يجب تنفيذه قبل الاختبار.

## إنشاء الاختبارات

لإنشاء حالة اختبار جديدة، استخدم الأمر "make:test" Artisan:

```shell
إذهب إلى تشغيل. ميزة حرفية:اختبار/اختبار المستخدم
```

يتم كتابة حالاتنا الاختبارية باستخدام خاصية حزمة [stretchr/testify](https://github.com/stretchr/testify)
بشكل افتراضي. This function enables us to configure pre-test, post-test, sub-test, and assertion, among other
things, which results in more organized test cases. وللحصول على مزيد من المعلومات، يرجى الرجوع إلى الوثائق الرسمية.

```go
package feature

import (
  "testing"

  "github.com/stretchr/testify/suite"

  "goravel/tests"
)

type ExampleTestSuite struct {
  suite.Suite
  tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
  suite.Run(t, new(ExampleTestSuite))
}

// SetupTest will run before each test in the suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest will run after each test in the suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  s.True(true)
}
```

## اختبار قاعدة البيانات

وتستطيع مصانع نماذج غورافيل والبذور بسهولة إنشاء سجلات لقواعد البيانات لاختبار نموذج التطبيق.

### المصانع

إذا كنت تجري الاختبارات، قد يكون من الضروري إضافة بعض السجلات إلى قاعدة البيانات الخاصة بك قبل تشغيل الاختبار. You
don't have to manually input the values of each column for the test data creation. مع Goravel، يمكنك تعيين سمات افتراضية
للنماذج الخاصة بك عبر [factories](../orm/factories).

```go
تطبيق نماذج المستخدم.المستخدم
: = facades.Orm().Factory().Create(&user)
```

### بذور قيد التشغيل

إذا كنت ترغب في استخدام [بذور قاعدة البيانات](../orm/seeding) لتعبئة قاعدة البيانات الخاصة بك أثناء اختبار الميزة، يمكنك
استدعاء طريقة 'Seed'. بشكل افتراضي، ستنفذ طريقة "البذرة" "DatabaseSeeder"، التي يجب أن تنفذ كل
البذور الأخرى الخاصة بك. وبدلا من ذلك، يمكنك تمرير مستخرج محدد تم تركيبه إلى طريقة "البذرة":

```go
ميزة الحزمة

استيراد (
 "اختبار"

 "github. om/stretchr/testify/suite"

 "goravel/database/seeders"
 "goravel/tests"


نوع مثلTestSuite بنت {
 جناح. uite
 tests.TestCase


func TestexampleTestSuite(t *testing.T) {
 suite. un(t, new(exampleTestSuite))


// SetupTT الاختبار سيتم تشغيله قبل كل اختبار في المجموعة.
تشويش (s *exampleTestSuite) إعداد اختبار () {
}

// TearDownTtest سيتم تشغيله بعد كل اختبار في المجموعة.
مربع (s *exampleTestSuite) TearDownTestSuite) TearDownTtest() {
}

func (s *exampleTestSuite) TestIndex() {
  // تشغيل Seeder. .
 s.seed()

  // تشغيل بذور محددة متعددة...
 s.Seed(&seeders.UserSeeder{}, &seeders.PhotoSeeder{})
}
```

### استخدام Docker

عند استخدام \`اذهب إلى الاختبار'، يتم اختبار حزم متعددة بالتوازي. ونتيجة لذلك، فإن تحديث قاعدة البيانات في حالة اختبار
باستخدام قاعدة بيانات محلية يمكن أن يؤثر على حالات اختبار موازية أخرى. To address this, Goravel offers Docker-based
testing. مع Docker، يمكن إنشاء صورة قاعدة بيانات واستخدامها بشكل مستقل عبر حزم مختلفة.

> بسبب الدعم المحدود لصورة Docker لنظام النوافذ، حاليا، لا يمكن تشغيل اختبار Docker إلا في البيئات
> غير النوافذ.

#### بدء دوبر

يمكنك استخدام طريقة "قاعدة البيانات" لبدء صورة قاعدة البيانات استناداً إلى اتصال قاعدة البيانات الافتراضي، أو يمكنك تمرير إسم اتصال قاعدة البيانات
إلى هذه الطريقة لبدء صور قاعدة بيانات أخرى:

```go
قاعدة البيانات, err := facades.Testing().Docker().Database()
قاعدة البيانات, err := facades.Testing().Docker().Database("postgres")
```

صور قاعدة البيانات المدعومة بشكل افتراضي:

| قاعدة البيانات | رابط الصورة                                                                                                                                        | الإصدار |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Mysql          | [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)              | الأحدث  |
| Postgres       | [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)        | الأحدث  |
| Sqlserver      | [https://hub.docker.com/r/microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server) | الأحدث  |
| Sqlite         | [https://hub.docker.com/r/nouchka/sqlite3](https://hub.docker.com/r/nouchka/sqlite3)               | الأحدث  |

يمكنك أيضا استخدام طريقة "الصورة" لتخصيص الصورة:

```go
استيراد contractstesting "github.com/goravel/framework/contracts/testing"

database.Image(contractstesting.Image{
  Repository: "mysql",
  taag: "5.7",
  Env: []string{
    "MYSQL_ROOT_PASSWORD=123",
    "MYSQL_DATABASE=goravel",
  },
  ExposedPorts: []string{"3306"},
})
```

#### بناء صورة

بعد بدء تشغيل الصورة، يمكنك استخدام طريقة "البناء" لبناء الصورة:

```go
خطأ := قاعدة البيانات.Build()
```

At this time, you can use the `docker ps` command to see that the image is already running on the system, and you can
obtain the configuration information of the database through the `Config` method to facilitate connection debugging:

```go
تكوين := قاعدة البيانات.Config()
```

#### بذور قيد التشغيل

إذا كنت ترغب في استخدام [seeder](../orm/seeding) لتعبئة قاعدة البيانات أثناء الاختبار، يمكنك الاتصال بطريقة "البذرة".
بشكل افتراضي، ستنفذ طريقة "البذرة" "DatabaseSeeder"، التي يجب أن تنفذ جميع البذور الأخرى الخاصة بك.
وبدلا من ذلك، يمكنك تمرير مستخرج محدد تم تركيبه إلى طريقة "البذرة":

```go
err :=database.seed()
err := database.Seed(&seeders.UserSeeder{})
```

#### تحديث قاعدة البيانات

لأن حالات الاختبار في نفس الطرد يتم تنفيذها بشكل متسلسل، تحديث قاعدة البيانات بعد تشغيل حالة اختبار واحدة
لن يكون له تأثير سلبي، يمكننا استخدام طريقة "Fresh":

```go
خطر:= قاعدة البيانات.Fresh()
```

يمكنك أيضًا استخدام طريقة "تحديث قاعدة البيانات":

```go
package feature

import (
 "testing"

 "github.com/stretchr/testify/suite"

 "goravel/tests"
)

type ExampleTestSuite struct {
 suite.Suite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite.Run(t, new(ExampleTestSuite))
}

// SetupTest will run before each test in the suite.
func (s *ExampleTestSuite) SetupTest() {
  s.RefreshDatabase()
}

// TearDownTest will run after each test in the suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
}
```

#### إلغاء تثبيت الصورة

بعد تنفيذ حالات الاختبار في الحزمة الفرعية، سيتم إلغاء تثبيت الصورة تلقائياً في ساعة واحدة، يمكنك
استخدام طريقة "إيقاف التشغيل" لإلغاء تثبيت الصورة يدوياً.

```go
err := قاعدة البيانات.Shutdown()
```

#### مثال

يمكننا إنشاء طريقة "TestMain" في الحزمة الفرعية وإضافة المنطق المسبق لحالة الاختبار:

```go
// tests/feature/main_test.go
package feature

import (
  "fmt"
  "os"
  "testing"

  "github.com/goravel/framework/facades"

  "goravel/database/seeders"
)

func TestMain(m *testing.M) {
  database, err := facades.Testing().Docker().Database()
  if err != nil {
    panic(err)
  }

  if err := database.Build(); err != nil {
    panic(err)
  }

  if err := database.Seed(); err != nil {
    panic(err)
  }

  // Execute test cases
  exit := m.Run()

  // Uninstall the image after all test cases have been run
  if err := database.Clear(); err != nil {
    panic(err)
  }

  os.Exit(exit)
}
```

> لمزيد من استخدام طريقة TestMain ، انظر [الوثائق الرسمية](https://pkg.go.dev/testing#hdr-Main).
