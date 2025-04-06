# طلب دورة حياة

ويعمل الملف 'main.go' كنقطة دخول لجميع الطلبات الواردة في تطبيق غورافل. يستخدم الدالة
`bootstrap.Boot()` لتهيئة الإطار.

ثم يتم إنشاء مثيل Goravel بواسطة `app := foundation.NewApplication()` في `bootstrap/app.go`.

بعد هذا، استخدم 'app.Boot()' لتحميل [مزود الخدمة](providers) المسجل، و 'config.Boot()' إلى
تحميل ملفات التكوين تحت دليل التهيئة.

أخيراً، ابدأ خادم HTTP باستخدام `facades.Route().Run(facades.Config().GetString("app.host")` في `main.go`.
