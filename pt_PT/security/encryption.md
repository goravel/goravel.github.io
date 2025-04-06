# Encriptação

Os serviços de criptografia do Goravelm fornecem uma interface simples e conveniente para criptografar e descriptografar texto via OpenSSL
usando a criptografia AES-256. Todos os valores criptografados de Goravel são assinados usando um código de autenticação de mensagem (GMAC), então
que seus valores subjacentes não podem ser modificados ou adulterados uma vez criptografados.

## Configuração

Antes de usar o encriptador do Goravel, você deve definir a opção de configuração `chave` na configuração
do arquivo `config/app.go`. Esta opção é conduzida pela variável de ambiente `APP_KEY`. Use o `ir executar. artisan key:generate` command to
generate this variable's value since the `key:generate` command will utilize Golang's secure random bytes generator to
create a secure cryptographic key for your application.

## Usando o Criptografador

### Criptografar Um Valor

Para criptografar um valor, você pode usar o método `EncryptString` em `facades.Crypt()`. Este método criptografa valores usando o
OpenSSL e a cifra AES-256-GCM. Adicionalmente, todos os valores criptografados são assinados com um código de autenticação (GMAC)
para evitar a descriptografia de usuários maliciosos que tentam adulterar os dados.

```go
secreto, err := facades.Crypt().EncryptString("goravel")
```

### Descriptografar um Valor

Você pode usar o método `DecryptString` de `facades.Crypt()` para descriptografar valores. Se o valor não puder ser corretamente
descriptografado, como quando o código de autenticação da mensagem é inválido, um erro será retornado.

```go
str, err := facades.Crypt().DecryptString(secreto)
```
