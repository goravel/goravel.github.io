# واجهات

`facades` provide a "static" interface for the core functionality of the application and provide a more flexible, more
elegant, and easy-to-test syntax.

جميع 'واجهات غورافيل معرّفة تحت 'github.com/goravel/framework/facades`. يمكننا بسهولة استخدام 'واجهات`:

```go
استيراد "github.com/goravel/framework/facades"

facades.Route().Run(facades.Config().GetString("app.host"))
```

## كيف تعمل الواجهات

'واجهات عادة ما تكون مثالية في مرحلة 'التسجيل' أو 'Boot' من كل وحدة نمطية 'Serverprovider\`.

```go
Fc (تكوين *Serviceprovider) Register() {
  app := Application{}
  facades.Config = app.Init()
}
```

إذا كانت "الواجهة" تستخدم "واجهات أخرى"، فمثلها في مرحلة "Boot" من "Serverserer":

```go
Fc (قاعدة البيانات *Serviceproviders ) Boot() {
  app := Application{}
  facades.DB = app.Init()
}
```

## مرجع صف الواجهة

| واجهة          | مستند                                        |
| -------------- | -------------------------------------------- |
| التطبيق        | [Container](../foundation/container)         |
| Artisan        | [الأمر القديم](../advanced/artisan)          |
| المصادقة       | [Authentication](../security/authentication) |
| مخبئ           | [Cache](../advanced/cache)                   |
| الإعدادات      | [Configuration](../quickstart/configuration) |
| تشفير          | [Encryption](../security/encryption)         |
| الحدث          | [Event](../advanced/events)                  |
| البوابة        | [Authorization](../security/authorization)   |
| عشب            | [Grpc](../basic/grpc)                        |
| التجزئة        | [Hashing](../security/hashing)               |
| سجل            | [Log](../basic/logging)                      |
| البريد         | [Mail](../advanced/mail)                     |
| خام            | [ORM](../orm/quickstart)                     |
| قائمة الانتظار | [Queue](../advanced/queues)                  |
| معدل محدد      | [RateLimiter](../basic/routing)              |
| الطريق         | [Route](../basic/routing)                    |
| مشاهدة         | [Seeder](../orm/seeding)                     |
| الجدول         | [Schedule](../advanced/schedule)             |
| التخزين        | [Storage](../advanced/schedule)              |
| اختبار         | [Testing](../testing/quickstart)             |
| المصادقة       | [Validation](../advanced/schedule)           |
