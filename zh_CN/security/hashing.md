# 哈希

Goravel 的 `facades.Hash()` 提供安全的 Argon2id 和 Bcrypt 哈希算法，用于存储用户密码。 如果您正在使用
Goravel 应用程序启动套件之一，默认情况下将使用 Argon2id 进行注册和身份验证。

## 配置

应用程序的默认哈希驱动程序在应用程序的 `config/hashing.go` 配置文件中配置。 目前支持几种驱动程序：Argon2id 和 Bcrypt。

## 基本用法

### 哈希密码

您可以通过调用 `facades.Hash()` 的 `Make` 方法来哈希密码：

```go
password, err := facades.Hash().Make(password)
```

### 验证密码是否匹配哈希值

Hash facade 提供的 `Check` 方法允许您验证给定的明文字符串是否与给定的哈希值相对应：

```go
if facades.Hash().Check('plain-text', hashedPassword) {
    // 密码匹配...
}
```

### 确定密码是否需要重新哈希

Hash facade 提供的 `NeedsRehash` 方法允许你确定自密码被哈希后，哈希器使用的工作因子是否已经改变。 一些应用程序选择在应用程序的认证过程中执行此检查：

```go
if facades.Hash().NeedsRehash(hashed) {
     hashed = facades.Hash().Make('plain-text');
}
```
