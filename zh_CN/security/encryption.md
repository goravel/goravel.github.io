# 加密

Goravel 的加密服务提供了一个简单、方便的接口，通过 OpenSSL 使用 AES-256 加密来加密和解密文本。 Goravel 的所有加密值都使用消息认证码（GMAC）进行签名，以确保加密后的底层值不会被修改或篡改。

## 配置

在使用 Goravel 的加密器之前，您必须在 `config/app.go` 配置文件中设置 `key` 配置选项。 此选项由 `APP_KEY` 环境变量驱动。 使用 `go run .` artisan key:generate`命令生成此变量的值，因为`key:generate\` 命令将利用 Golang 的安全随机字节生成器为您的应用程序创建一个安全的加密密钥。

## 使用加密器

### 加密值

要加密一个值，您可以使用 `facades.Crypt()` 中的 `EncryptString` 方法。 此方法使用OpenSSL和AES-256-GCM密码对值进行加密。 此外,所有加密值都使用消息认证码(GMAC)进行签名,以防止恶意用户通过篡改数据来尝试解密。

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### 解密值

您可以使用`facades.Crypt()`的`DecryptString`方法来解密值。 如果无法正确解密该值,例如当消息认证码无效时,将返回错误。

```go
str, err := facades.Crypt().DecryptString(secret)
```
