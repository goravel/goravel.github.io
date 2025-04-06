# Hashing

O Goravel `facades.Hash()` fornece Argon2id e hash Bcrypt seguro para armazenar senhas de usuário. Se você estiver usando
um dos kits de iniciadores de aplicativo do Goravel, o Argon2id será usado para registro e autenticação por padrão.

## Configuração

O hashing padrão para sua aplicação está configurado no arquivo
de configuração `config/hashing.go` da sua aplicação. Atualmente existem vários motoristas suportados: Argon2id e Bcrypt.

## Uso básico

### Senhas de hash

Você pode hash uma senha chamando o método `Make` em `facades.Hash()`:

```go
senhas, err := facades.Hash().Make(senha)
```

### Verificar se uma senha corresponde a um Hash

The `Check` method provided by the Hash facade allows you to verify that a given plain-text string corresponds to a
given hash:

```go
if facades.Hash().Check('plain-text', hashedPassword) {
    // As senhas coincidem...
}
```

### Determinar se uma senha precisa ser Rehashed

O método `NeedsRehash` fornecido pela fachada de hash permite que você determine se o fator de trabalho usado pela pressa
mudou desde que a senha foi hashada. Algumas aplicações optam por realizar esta verificação durante o processo de autenticação
do aplicativo:

```go
if facades.Hash().NeedsRehash(hashed) {
     hashed = facades.Hash().Make('plain-text');
}
```
