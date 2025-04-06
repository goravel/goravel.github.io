# 加密

Goravel的加密服务为使用 AES-256 加密通过 OpenSSL
加密和解密文本提供了一个简单、方便的接口。 All of Goravel's encrypted values are signed using a message authentication code (GMAC) so
that their underlying value can not be modified or tampered with once encrypted.

## 配置

Before using Goravel's encrypter, you must set the `key` configuration option in your `config/app.go` configuration
file. 此选项由`APP_KEY`环境变量驱动. 使用 "转动运行" 艺人按键:generate`命令到
生成此变量的值，因为`key:generate\`命令将使用Golang的安全随机字节生成器到
为您的应用程序创建一个安全加密钥。

## 使用加密器

### 加密值

要加密一个值，您可以在 `facades.Crypt()` 中使用 `EncryptString` 方法。 此方法使用
OpenSSL 和 AES-256-GCM 密码加密数值。 此外， 所有加密值都用消息认证代码 (GMAC)
签名，以防止恶意用户试图篡改数据。

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### 解密值

您可以使用 `facades.Crypt()` 中的 `DecryptString` 方法解密值。 If the value can not be properly
decrypted, such as when the message authentication code is invalid, an error will be returned.

```go
str, err := facades.Crypt().DecryptString(secret)
```
