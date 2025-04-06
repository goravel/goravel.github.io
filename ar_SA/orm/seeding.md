# قاعدة البيانات: البذور

يتضمن Goravel القدرة على إنشاء قاعدة البيانات الخاصة بك باستخدام البذور التي تم بناؤها. يتم تخزين جميع هياكل البذور في دليل
`قاعدة البيانات/seeders`. بشكل افتراضي، يتم تعريف هيكل "قاعدة البيانات" لك.

## كتابة البذور

لإنشاء بذرة، قم بتشغيل `make:seeder` [Artisan command](../advanced/artisan). سيتم تخزين جميع البذور
التي تم إنشاؤها بواسطة الإطار في دليل "قاعدة البيانات/البذور":

```shell
اذهب للتشغيل. صناعة:seeder UserSeeder
```

وبشكل افتراضي، يكون للمخترق طريقتين: `التوقيع` و`تشغيل`. طريقة "التوقيع" تعين اسم السيارة،
بينما يتم تشغيل طريقة "تشغيل" عندما يتم تنفيذ الأمر الفني "db:seed". يمكنك استخدام طريقة "تشغيل" إلى
إدراج البيانات في قاعدة البيانات الخاصة بك بأي طريقة تفضلها.

لتوضيح ذلك، يمكننا تخصيص هيكل قاعدة البيانات بإضافة بيان إلى طريقة "تشغيل".

```go
بذور الحزمة

استيراد (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"


من نوع Seeder بنيت construction@@


// توقيع اسم البذرة والتوقيع عليها.
Fc (s *DatabaseSeeder) Signature() string {
 Reder "DatabaseSeeder"


// تشغيل ينفذ منطق المنشأ.
مربع (s *DatabaseSeeder) أخطاء تشغيل () {
 المستخدم := النموذجات. ser{
  الاسم: "goravel",
 }
 Refacades.Orm().Query().Create(&user)
}
```

## استدعاء بذور إضافية

في إطار بنية "DatabaseSeeder"، يمكنك استخدام طريقة "Call" لتنفيذ هياكل بذور إضافية. Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. وتقبل طريقة "المكالمة" مجموعة من هياكل العشاق التي ينبغي تنفيذها:

```go
// تشغيل ينفذ منطق السخرة.
func (s *DatabaseSeeder) Run() خطأ {
 Refacades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

ويوفر الإطار أيضاً طريقة "CallOnce"، ولن يتم تنفيذ المستكشف إلا مرة واحدة في الأمر `db:seed`:

```go
// تشغيل ينفذ منطق السخرة.
func (s *DatabaseSeeder) Run() خطأ {
 Refacades.Seeder().Callonce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## بذور قيد التشغيل

يمكنك تشغيل الأمر الفني `db:seed` لبذر قاعدة البيانات الخاصة بك. بشكل افتراضي، يدير الأمر `db:seed` ملف
`database/seeders/database_seeder.go'، الذي قد يستدعي بدوره فئات بذور أخرى. ومع ذلك، يمكنك استخدام خيار
`--seeder\` لتحديد فئة معينة من المستكشف لتشغيلها فردياً:

```shell
اذهب للتشغيل. حرفي db:seed
```

إذا كنت ترغب في تنفيذ البذور الأخرى عند تشغيل الأمر `db:seed'، يمكنك تسجيل المرشد في
`app/providers/database_service_provider.go\`:

```go
// app/providers/database_service_provider.go
func (المتلقي *DatabaseServiceprovider) Boot(app Foundation.Application) {
 facades.Seeder().register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders. hotoSeeder{},
 })


يتم تشغيله. حرفي db:seed --seeder=UserSeeder PhotoSeeder // توقيع السخر
```

يمكنك أيضًا إنشاء قاعدة البيانات الخاصة بك باستخدام الأمر `migrate:fresh` و `migrate:refresh` مع خيار `--seed`
، الذي سوف يسقط جميع الجداول ويعيد تشغيل جميع الهجرات الخاصة بك. هذا الأمر مفيد لإعادة بناء قاعدة البيانات
بالكامل. يمكن استخدام خيار `-seeder` لتحديد جهة محددة لتشغيل:

```shell
انتقل إلى تشغيل. ترجم حرفي:fresh --seed

انتقل إلى تشغيل. ترجم حرفي:fresh --seed --seeder=UserSeeder

. ترحيل حرفي: تحديث --seed

يتم تشغيله. ترحيل حرفي:refresh --seed --seeder=UserSeeder
```

### إجبار البذور على تشغيل الإنتاج

قد تتسبب بعض عمليات البذور في تغيير أو فقدان البيانات. من أجل حمايتك من تشغيل أوامر البذور
ضد قاعدة بيانات الإنتاج الخاصة بك، سيتم مطالبتك بالتأكيد قبل أن يتم تنفيذ البذور في بيئة 'إنتاج`. لإجبار البذور على العمل دون طلب، استخدم علم`-force':

```shell
تشغيل . حرفي db:seed --إجبار
```
