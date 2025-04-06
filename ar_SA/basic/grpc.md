# عشب

يمكن تشغيل وحدة Grpc بواسطة `facades.Grpc()`.

## المتحكمون

يمكن تعريف المتحكمين في دليل `/app/grpc/controlllers`.

```go
استيراد // app/grpc/controlllers
حزم التحكم

(
  "سياق"
  "net/http"

  "github. om/goravel/grpc/protos"


type UserController struct {


func NewUserController() *UserController {
  Re&UserController{}


func (r *UserController) Show(tx). ontext, req *protos.Userrequest) (protoBook *protos.UserResponse, err خطأ) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nl
}
```

## تحديد المسار

يمكن تعريف جميع ملفات المسارات في دليل `/routes'، مثل `/routes/grpc.go`. ثم ربط المسارات في ملف
`app/providers/grpc_service_provider.go'.

```go
/routes/grpc.go
طرق الحزمة

الاستيراد (
  "github.com/goravel/grpc/protos"
  "github.com/goravel/framework/facades"

  "goravel/app/grpc/controllers"


func Grpc() {
  protos.RegisterUserserver(facades.Grpc().Server.Server.NewUserController())
}
```

### تسجيل مسار

تسجيل مسار في ملف 'app/providers/grpc_service_provider.go' بعد تحديد المسار.

```go
// app/providers/grpc_service_provider. o
موفري الحزمة

استيراد (
  "goravel/routes"


من النوع GrpcServiceProمزود البنية {
}

Fc (توجيه * GrpcServiceproviders ) Register() {



Fc (توجيه * GrpcServiceprovider) Boot() {
  طرق rpc()
}
```

## بدء خادم Grpc

بدء تشغيل Grpc في ملف 'main.go'.

```go
انتقل إلى وظيفة () {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host"))); err != nl {
    facades.Log().Errorf("Grpc run error: %v", err)

}()
```

## اعتراض

يمكن تعريف الاعتراض في مجلد "app/grpc/inteceptors"، ثم يتم تسجيله في "app/grpc/kernel.go\`.

**اعتراض الخادم**

يمكنك تعيين طريقة "app/grpc/kernel.go:UnaryServerInterceptors" في طريقة "app/grpc/kernel.go:UnaryServerInterceptors". وعلى سبيل المثال:

```go
// app/grpc/kernel.go
الاستيراد (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"


Fc (kernel *Kernel) UnaryServerInterceptors() []grpc.UnaryServerInterceptor {
  العودة []grpc.unaryServerInterceptor{
    interceptors.Server,
  }
}
```

**اعتراض العميل**

يمكنك تعيين طريقة اعتراض العميل في طريقة \`app/grpc/kernel.go:UnaryClientInterceptorGroups'، يمكن للطريقة تجميع
اعتراض. على سبيل المثال، "interceptors.Client" مدرج ضمن مجموعة "trace".

```go
//app/grpc/kernel.go
الاستيراد (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"


Fc (kernel *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. NaryClientInterceptor {
  map[string][]grpc.unaryClientInterceptor{
    "تتبع": {
      interceptors.Client,
    },
  }
}
```

يمكن تطبيق مجموعة "تعقب" على عنصر التكوين \`grpc.clits. المعترضين، بهذه الطريقة، سيكون العميل
يطبق على جميع المعترضين تحت المجموعة. وعلى سبيل المثال:

```go
تكوين الحزمة

استيراد (
  "github.com/goravel/framework/facades"


init() func /7/Add.
  config := facades.Config
  config. dd(“grpc”, خريطة[string]واجهة{}{
    // Gpc تكوين
    //
    // تكوين مضيف الخادم
    "المضيف": تكوين. nv("GRPC_HOST", ""),

    // تكوين مضيف العميل الخاص بك واعتراضه.
    /// يمكن أن يكون اسم المجموعة لـ UnaryClientInterceptorGroups في app/grpc/kernel.go.
    "العملاء": الخريطة[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "interceptors": []string{"Trace"},
      },
    },
  })
}
```
