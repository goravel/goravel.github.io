# 加密

Goravel's encryption services provide a simple, convenient interface for encrypting and decrypting text using AES-256
encryption. All of Goravel's encrypted values are signed using a message authentication code (GMAC) so that their
underlying value can not be modified or tampered with once encrypted.

## 配置

在使用 Goravel 的加密器之前，您必须在 `config/app.go` 配置文件中设置 `key` 配置选项。 此选项由 `APP_KEY` 环境变量驱动。 使用 `go run .` artisan key:generate`命令生成此变量的值，因为`key:generate\` 命令将利用 Golang 的安全随机字节生成器为您的应用程序创建一个安全的加密密钥。

## 使用加密器

### 加密值

要加密一个值，您可以使用 `facades.Crypt()` 中的 `EncryptString` 方法。 This method encrypts values using
AES-256-GCM cipher. Additionally, all encrypted values are signed with a message authentication code (GMAC) to prevent
decryption by malicious users who try to tamper with the data.

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### 解密值

您可以使用`facades.Crypt()`的`DecryptString`方法来解密值。 如果无法正确解密该值,例如当消息认证码无效时,将返回错误。

```go
str, err := facades.Crypt().DecryptString(secret)
```
