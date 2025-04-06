# Хэширование

«facades.Hash()» обеспечивает безопасный Argon2id и Bcrypt хеширование для хранения паролей пользователей. Если вы используете
один из стартовых наборов приложений Goravel, Argon2id будет использован для регистрации и аутентификации по умолчанию.

## Конфигурация

The default hashing driver for your application is configured in your application's `config/hashing.go` configuration
file. В настоящее время поддерживается несколько драйверов: Argon2id и Bcrypt.

## Базовое использование

### Хэширование паролей

Вы можете хэшировать пароль, выбрав метод `Make` на `facades.Hash()`:

```go
пароль, err := facades.Hash().Make(пароль)
```

### Проверка совпадений пароля с хешем

Метод `Проверка`, предоставляемый фасадом хеша, позволяет убедиться, что данная строка обычного текста соответствует
указанному хэша:

```go
if facades.Hash().Check('plain-text', hashedPassword) {
    // Пароли совпадают...
}
```

### Определяет, необходим ли пароль для восстановления хеширования

The `NeedsRehash` method provided by the Hash facade allows you to determine if the work factor used by the hasher has
changed since the password was hashed. Some applications choose to perform this check during the application's
authentication process:

```go
if facades.Hash().NeedsRehash(хэш) {
     хэшид = facades.Hash().Make('plain-text');
}
```
