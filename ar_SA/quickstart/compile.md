# تجميع

## أمر التجميع

يمكن تجميع مشروع غورافيل باستخدام الأمر التالي:

```
// حدد النظام لتجميع
قيد التشغيل. بناء حرفي

// حدد النظام لتجميع
يتم تشغيله. يتم تشغيل البناء الحرفي --os=linux
. يتم تشغيل البناء الحرفي -o=linux

// التجميع الثابت
. بناء حرفي --ثابت
يتم تشغيله. يتم تشغيل بناء حرفي -s

// تحديد اسم ملف الإخراج
. بناء حرفي --name=goravel
يتم تشغيله. بناء الحرفي -n=goravel
```

## تجميع يدوي

### تجميع منتظم

```shell
اذهب إلى البناء.
```

#### نشر الخادم

يجب تحميل الملفات والمجلدات التالية إلى الخادم أثناء النشر:

```
./main // تجميع الملف الثنائي الناتج
.env
./databas
./public
./storage
./resources
```

### تجميع ثابت

The package by regular compilation also needs to rely on the support of the deployment environment, the statically
compiled files can be freely put to run on the specified platform without environment configuration.

```shell
اذهب لبناء --ldflags "-extldflags -static" -o main .
```

### تجميع متداخل

التجميع مميز حسب المنصة، تحتاج إلى تحديد طريقة تجميع مطابقة وفقًا لحالة النشر

```shell
// يتم بناء بيئة لينكس المجمعة
CGO_ENABLED=0 GOOS=linux GOARCH=amd64.

// تجميع بيئة ويندوز
CGO_ENABLED=0 GOOS=windows GOARCH=amd64.

// تجميع بيئة Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 ابدأ البناء.
```

## دوكر

Goravel لديه ملف افتراضي 'Dockerfile' و 'docker-compose.yml' ، يمكنك استخدامه مباشرة ، ملاحظة أن 'APP_HOST\` يجب أن يكون
0.0.0' في هذا الوقت.

```shell
ابني المرفأ.
```

### تكوين المرسى

يمكنك أيضًا بدء الخدمة بسرعة مع الأمر التالي:

```shell
إنشاء docker-- تكوين
docker-تكوين
```

> ملاحظة: إذا كنت بحاجة إلى وصول خارجي، تحتاج إلى تغيير APP_HOST إلى 0.0.0

## تقليل حجم الحزمة

التعليق على 'ServiceProvider' غير المستخدمة في 'config/app.go::providers\` سوف يقلل بشكل فعال من حجم صوت التغليف.
