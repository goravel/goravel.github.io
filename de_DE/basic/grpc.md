# Grpc

Grpc Modul kann über `facades.Grpc()` betrieben werden.

## Controller

Controller können im `/app/grpc/controllers` Verzeichnis definiert werden.

```go
// app/grpc/controllers
Paket-Controller

importieren (
  "context"
  "net/http"

  "github. om/goravel/grpc/protos"
)

type UserController struct {
}

func NewUserController() *UserController {
  return &UserController{}
}

func (r *UserController) Show(ctx context). ontext, req *protos.UserRequest) (protoBook *protos.UserResponse, err error) {
  return &protos.UserResponse{
    Code: http.StatusOK,
  }, nil
}
```

## Routing definieren

Alle Routing-Dateien können im `/routes`-Verzeichnis definiert werden, wie z.B. `/routes/grpc.go`. Verbinden Sie Routen in der
`app/providers/grpc_service_provider.go` Datei.

```go
// routes/grpc.go
Paketrouten

Import (
  "github.com/goravel/grpc/protos"
  "github.com/goravel/framework/facades"

  "goravel/app/grpc/controllers"
)

func Grpc() {
  protos.RegisterUserServer(facades.Grpc().Server(), controllers.NewUserController())
}
```

### Routing registrieren

Registrieren Sie das Routing in der `app/providers/grpc_service_provider.go` Datei, nachdem das Routen definiert wurde.

```go
// app/providers/grpc_service_provider. o
Paketanbieter

Import (
  "goravel/routes"
)

Typ GrpcServiceProvider struct {
}

func (Router *GrpcServiceProvider) Register() {

}

func (Router *GrpcServiceProvider) Boot() {
  routes. rpc()
}
```

## Grpc-Server starten

Starten Sie Grpc in der `main.go` Datei.

```go
go func() {
  if err := facades.Grpc().Run(facades.Config().GetString("grpc.host")); err != nil {
    facades.Log().Errorf("Grpc run error: %v", err)
  }
}()
```

## Abfangen

Der Abfangen kann im Ordner `app/grpc/inteceptors` definiert und dann auf `app/grpc/kernel.go` registriert werden.

**Server Abfang**

Sie können die Serverabfangen in der `app/grpc/kernel.go:UnaryServerInterceptors` Methode festlegen. Zum Beispiel:

```go
// app/grpc/kernel.go
Import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (Kernel *Kernel) UnaryServerInterceptors() []grpc.UnaryServerInterceptor {
  return []grpc.UnaryServerInterceptor{
    interceptors.Server,
  }
}
```

**Klient-Abfang**

Sie können das Client-Abfangen in der `app/grpc/kernel.go:UnaryClientInterceptorGroups` Methode festlegen. Die Methode kann
Abfangen gruppieren. Zum Beispiel ist `interceptors.Client` unter der `trace` Gruppe enthalten.

```go
// app/grpc/kernel.go
Import (
  "goravel/app/grpc/interceptors"

  "google.golang.org/grpc"
)

func (Kernel *Kernel) UnaryClientInterceptorGroups() map[string][]grpc. naryClientInterceptor {
  return map[string][]grpc.UnaryClientInterceptor{
    "trace": {
      interceptors.Client,
    },
  }
}
```

die `trace` Gruppe kann auf das Konfigurationselement `grpc.clients angewendet werden. nterceptors`, auf diese Weise wird der Client
auf alle Abfangen unter der Gruppe angewendet. Zum Beispiel:

```go
Paket Konfiguration

Import (
  "github.com/goravel/framework/facades"
)

func init() {
  config := facades.Config
  config. dd("grpc", map[string]interface{}{
    // Grpc Configuration
    //
    // Konfigurieren Sie Ihren Server Host
    "host": config. nv("GRPC_HOST", ""),

    // Konfigurieren Sie Ihren Client Host und Abfang.
    // Interceptors können der Gruppenname von UnaryClientInterceptorGroups in app/grpc/kernel.go sein.
    "clients": map[string]any{
      "user": map[string]any{
        "host": config. nv("GRPC_USER_HOST", ""),
        "port": config. nv("GRPC_USER_PORT", ""),
        "abceptors": []string{"trace"},
      },
    },
  })
}
```
