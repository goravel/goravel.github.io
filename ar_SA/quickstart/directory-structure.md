# هيكل الدليل

هيكل الملف الافتراضي يمكن أن يجعلك تبدأ تقدم المشروع بشكل أفضل، ويمكنك أيضا إضافة مجلدات جديدة بحرية، ولكن
لا تقم بتعديل المجلدات الافتراضية.

## دليل الجذر

### دليل "تطبيق"

يحتوي "تطبيق" على التعليمة البرمجية الأساسية للبرنامج. تقريبا كل المنطق في البرنامج سيكون في هذا المجلد.

### `bootstrap` Directory

يحتوي الدليل `bootstrap` على ملف startup الإطاري `app.go`.

### دليل `config`

يحتوي دليل `config` على جميع ملفات التكوين من التطبيق. من الأفضل التصفح من خلال هذه الملفات و
اطلع على نفسك مع جميع الخيارات المتاحة.

### دليل "قاعدة البيانات"

ويحتوي دليل "قاعدة البيانات" على ملفات ترحيل قواعد البيانات.

### دليل 'عام\`

يحتوي الدليل "العام" على بعض الموارد الثابتة، مثل الصور والشهادات، إلخ.

### دليل 'الموارد'

يحتوي دليل 'الموارد' على [views](../basic/views) فضلا عن أصولك الخام غير المجمعة مثل
CSS أو JavaScript.

### دليل "المسار"

ويتضمن دليل "المسار" جميع تعاريف المسار للتطبيق.

### دليل `التخزين`

يحتوي دليل "التخزين" على دليل "السجلات"، والدليل "السجلات" يحتوي على ملفات سجل التطبيق.

### دليل "الاختبارات"

The `tests` directory contains your automated tests.

## دليل "تطبيق"

### `console` Directory

The `console` directory contains all the custom `Artisan` commands of the application, and the console boot file
`kernel.go`, which can be registered in this file [Task Scheduling](../advanced/schedule)

### `http` Directory

The `http` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Web are processed here.

### `grpc` Directory

The `grpc` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Grpc are processed here.

### `models` Directory

The `models` directory contains all data models.

### `providers` Directory

The `providers` directory contains all [Service Providers](../foundation/providers) in the
program. The service provider guides the application to respond to incoming requests by binding services, registering
for events, or performing any other tasks.
