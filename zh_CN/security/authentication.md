# 身份验证

身份验证是Web应用程序中不可或缺的功能，Goravel的`facades.Auth()`模块提供了对JWT的支持。

## 配置

您可以在`config/auth.go`文件中配置`defaults`守卫和多个`guards`，以在应用程序中切换不同的用户身份。

您可以在`config/jwt.go`文件中配置JWT的参数，如`secret`、`ttl`、`refresh_ttl`。

### 为不同的Guards配置TTL

您可以在`config/auth.go`文件中为每个Guard单独设置TTL，如果未设置，则默认使用`jwt.ttl`配置。

```go
// config/auth.go
"guards": map[string]any{
  "user": map[string]any{
    "driver": "jwt",
++  "ttl": 60,
  },
},
```

## 生成JWT令牌

```shell
go run . artisan jwt:secret
```

## 使用用户生成令牌

您可以通过Model生成令牌，如果模型使用`orm.Model`，则无需额外配置，否则，您需要在模型的主键字段上配置Tag，例如：

```go
type User struct {
  ID uint `gorm:"primaryKey"`
  Name string
}

var user models.User
user.ID = 1

token, err := facades.Auth(ctx).Login(&user)
```

## 使用ID生成令牌

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## 解析令牌

```go
payload, err := facades.Auth(ctx).Parse(token)
```

通过`payload`您可以获取：

1. `Guard`：当前Guard；
2. `Key`：用户标识；
3. `ExpireAt`：过期时间；
4. `IssuedAt`：签发时间；

> 如果`err`不是`nil`且不是`ErrorTokenExpired`，则payload应为nil。

你可以通过err判断Token是否过期：

```go
"errors"
"github.com/goravel/framework/auth"

errors.Is(err, auth.ErrorTokenExpired)
```

> 无论有没有Bearer前缀，Token都可以正常解析。

## 获取用户

在获取用户之前，你需要通过`Parse`生成一个Token，这个过程可以在HTTP中间件中处理。

```go
var user models.User
err := facades.Auth(ctx).User(&user) // 必须是指针
id, err := facades.Auth(ctx).ID()
```

## 刷新Token

在刷新用户之前，你需要通过`Parse`生成一个Token。

```go
token, err := facades.Auth(ctx).Refresh()
```

## 登出

```go
err := facades.Auth(ctx).Logout()
```

## 多重守卫

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> 当不使用默认守卫时，必须在调用上述方法之前调用 `Guard` 方法。
