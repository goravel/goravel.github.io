# التشفير

توفر خدمات التشفير في غورافيل واجهة بسيطة ومريحة لتشفير وفك تشفير النص عن طريق OpenSSL
باستخدام تشفير AES-256. All of Goravel's encrypted values are signed using a message authentication code (GMAC) so
that their underlying value can not be modified or tampered with once encrypted.

## الإعدادات

قبل استخدام تشفير Goravel's ، يجب عليك تعيين خيار التكوين 'key' في ملف إعدادات 'config/app.go'
الخاص بك. هذا الخيار يقوده متغير البيئة "APP_KEY". استخدم \`تشغيل التشغيل'. أمر Arsan key:generate' لـ
إنشاء قيمة هذا المتغير لأن الأمر 'key:generate' سوف يستخدم مولد البايت العشوائي الآمن للجولانج إلى
إنشاء مفتاح تشفير آمن لتطبيقك.

## استخدام التشفير

### تشفير قيمة

لتشفير قيمة، يمكنك استخدام طريقة `EncryptString` في `facades.Crypt()`. هذه الطريقة تشفير القيم باستخدام شفرة
OpenSSL و AES-256-GCM. وبالإضافة إلى ذلك، يتم توقيع جميع القيم المشفرة برمز مصادقة الرسائل (GMAC)
لمنع فك التشفير من قبل المستخدمين الخادعين الذين يحاولون التلاعب بالبيانات.

```go
سري، إخطار:= facades.Crypt().EncryptString("goravel")
```

### فك تشفير قيمة

يمكنك استخدام طريقة 'DecryptString' من 'facades.Crypt()' إلى فك تشفير القيم. إذا كانت القيمة لا يمكن أن تكون بشكل صحيح
فك تشفير، مثل عندما يكون رمز مصادقة الرسالة غير صالح، سيتم إرجاع خطأ.

```go
السلسلة، الخطأ := facades.Crypt().DecryptString(سري)
```
