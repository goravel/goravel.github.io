# Autenticação

A autenticação é um recurso indispensável em Aplicativos Web, o módulo `facades.Auth()` do Goravel fornece suporte
para JWT.

## Configuração

Você pode configurar `defaults` guard e múltiplos `guards` no arquivo `config/auth.go` para alternar diferentes usuários
identidades na aplicação.

Você pode configurar os parâmetros do JWT no arquivo `config/jwt.go`, como `secret`, `ttl`, `refresh_ttl`.

### Configurar TTL para diferentes Guardas

Você pode definir o TTL para cada Guarda separadamente no arquivo `config/auth.go`, se não estiver definido, a configuração `jwt.ttl` é usada
por padrão.

```go
// config/auth.go
"guard": mapa[string]qualquer{
  "user": mapa[string]qualquer{
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## Gerar Token JWT

```shell
ir executar . artisan jwt:secret
```

## Gerar token usando usuário

You can generate a token by Model, there is no extra configuration if the model uses `orm.Model`, otherwise, you need to
configure Tag on the model primary key field, for example:

```go
type User struct {
  ID utita `gorm:"primaryKey"`
  Name string
}

var models de usuário. ser
user.ID = 1

token, err := facades.Auth(ctx).Login(&user)
```

## Gerar Token usando ID

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

Através do `payload` você pode obter:

1. `Guard`: Guarda Atual;
2. `Chave`: Sinalizador do usuário;
3. `ExpireAt`: Expira o tempo;
4. `IssuedAt`: Tempo emitido;

> Se o `err` não é nulo além do `ErrorTokenExpired`, o payload deve ser nulo.

Você pode avaliar se o Token expirou por erro:

```go
"errors"
"github.com/goravel/framework/auth"

errors.Is(err, auth.ErrorTokenExpired)
```

> O token pode ser analisado normalmente com ou sem o prefixo do portador.

## Obter Usuário

Você precisa gerar um Token por `Parse` antes de obter um usuário, o processo pode ser tratado em um middleware HTTP.

```go
var user models.User
err := facades.Auth(ctx).User(&user) // Deve apontar
id, err := facades.Auth(ctx).ID()
```

## Atualizar o Token

Você precisa gerar um Token por 'Analisar' antes de atualizar o usuário.

```go
token, err := facades.Auth(ctx).Refresh()
```

## Desconectar

```go
err := facades.Auth(ctx).Logout()
```

## Múltiplos guardas

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> Quando a guarda padrão não for usada, o método `Guard` deve ser chamado antes de chamar os métodos acima.
