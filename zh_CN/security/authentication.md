# 认证

认证是WebApplications不可或缺的功能，Goravel的 `facades.Auth()` 模块为 JWT提供
支持。

## 配置

您可以在`config/auth.go`文件中配置`defaults`和多个`guards`来切换应用程序中不同的用户
身份。

您可以在“config/jwt.go”文件中配置JWT的参数，如`secret`、`ttl`、`refresh_ttl`。

### 配置不同护卫的 TTL

您可以在“config/auth.go”文件中单独设置每个护卫队的TTL，如果没有设置，默认情况下使用
。

```go
// config/auth.go
"guards": map[string]anyo.
  "user": map[string]anyow
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## 生成 JWT 令牌

```shell
去运行.个工匠jwt:secret
```

## 使用用户生成令牌

You can generate a token by Model, there is no extra configuration if the model uses `orm.Model`, otherwise, you need to
configure Tag on the model primary key field, for example:

```go
键入用户结构。\n
  ID uint `gorm:"primararyKey""
  名称字符串


var 用户模型。 ser
user.ID = 1

token, err := facades.Auth(ctx).Login(&user)
```

## 使用ID生成令牌

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

你可以通过 `payload` 获取：

1. “防护：现任卫队”；
2. `Key`: 用户标志;
3. “有效期”： 过期时间；
4. “签发At”：签发时间；

> 如果`err` 不是 `ErrorTokenExpired`，那么payload 应该为 nil。

您可以判断令牌是否因错误过期：

```go
"错误"
"github.com/goravel/framework/auth"

错误.Is(err, auth.ErrorTokenExpired)
```

> 代币通常可以使用或不使用持卡人前缀进行解析。

## 获取用户

您需要通过 `Parse` 生成一个令牌，然后才能获得用户，此过程可以在 HTTP middleware中处理。

```go
var user models.User
err := facades.Auth(ctx).User(&user) // 必须点
id, err := facades.Auth(ctx).ID()
```

## 刷新令牌

在刷新用户之前，您需要通过 "Parse" 生成一个令牌。

```go
token, err := facades.Auth(ctx).刷新()
```

## 注销

```go
err := facades.Auth(ctx).Logout()
```

## 多个卫士

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> 当未使用默认护卫时，在调用上述方法之前，必须调用 `Guard` 方法。
