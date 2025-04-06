# 正在散列

Goravel `facades.Hash()` 提供安全的 Argon2id 和 Bcrypt 哈希，用于存储用户密码。 如果您正在使用
一个Goravel 应用程序启动包，Argon2id 将默认用于注册和身份验证。

## 配置

您的应用程序的默认哈希驱动程序已配置在您的应用程序的 `config/hashing.go` 配置文件
中。 目前有几个支持的驱动程序：Argon2id 和 Bcrypt。

## 基本用法

### 哈希密码

您可以在 `facades.Hash()`上调用 `Make` 方法来散列密码：

```go
密码，err := facades.Hash().Make(密码)
```

### 验证密码匹配哈希值

The `Check` method provided by the Hash facade allows you to verify that a given plain-text string corresponds to a
given hash:

```go
if facades.Hash().Check('plain-text', hashedPassword) {
    // The passwords match...
}
```

### 确定是否需要密码重写？

The `NeedsRehash` method provided by the Hash facade allows you to determine if the work factor used by the hasher has
changed since the password was hashed. 一些应用程序选择在应用程序的
身份验证过程中进行此检查：

```go
if facades.Hash().NeedsRehash(hashed) Power
     hashed = facades.Hash().Make('纯文本');

```
