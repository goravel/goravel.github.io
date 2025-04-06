# Sessão

Sessão permite armazenar informações de usuário em várias solicitações, fornecendo uma experiência de estado dentro do protocolo HTTP
inerentemente apátrida. Essa informação de usuário é armazenada persistentemente no lado do servidor. Goravel offers a
unified interface for interacting with various persistent storage drivers.

## Configuração

O arquivo de configuração `session` está localizado em `config/session.go`. O driver padrão é `file`, que armazena sessões
no diretório `storage/framework/sessions`. Goravel permite que você crie um driver `session` personalizado implementando
a interface `contracts/session/driver`.

### Registrar Middleware

Por padrão, Goravel não inicia uma sessão automaticamente. No entanto, oferece um middleware para iniciar uma sessão. Você pode
registrar o middleware de sessão em `app/http/kernel. o` arquivo para aplicá-lo a todas as rotas, ou você pode adicioná-lo a
rotas específicas:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Interagindo com a sessão

### Recuperando dados

Você pode usar o método `Get` para recuperar dados da sessão. Se o valor não existir, `nil` será retornado.

```go
valor := ctx.Request().Session().Get("chave")
```

Você também pode passar um valor padrão como segundo argumento para o método `Get`. Este valor será retornado se a chave
especificada não existir na sessão:

```go
valor := ctx.Request().Session().Get("chave", "padrão")
```

### Recuperando Todos os Dados

Se você gostaria de recuperar todos os dados da sessão, você pode usar o método `Todos`:

```go
dados := ctx.Request().Session().All()
```

### Recuperando um subconjunto de dados

Se você gostaria de recuperar um subconjunto dos dados da sessão, você pode usar o método `Apenas`:

```go
data := ctx.Request().Session().Apenas([]string{"username", "email"})
```

### Determinar se um Item Existe na Sessão

Para determinar se um item está presente na sessão, você pode usar o método `Has`. O método `Has` retorna `true` se o item
estiver presente e não for `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Para determinar se um item está presente e mesmo se for `nil`, você pode usar o método `Exists`:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Para determinar se um item não está presente na sessão, você pode usar o método `faltando`:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Armazenando dados

Você pode usar o método `Put` para armazenar dados na sessão:

```go
ctx.Request().Session().Put("chave", "valor")
```

### Recuperando e Excluindo Dados

Se você gostaria de recuperar um item da sessão e apagá-lo, você pode usar o método `Pull`:

```go
valor := ctx.Request().Session().Pull("chave")
```

### Excluindo dados

O método `Esquecer` pode ser usado para remover um pedaço de dados da sessão. Se você deseja remover todos os dados de
a sessão, você pode usar o método `Flush`:

```go
ctx.Request().Session().Forget("nome de usuário", "email")

ctx.Request().Session().Flush()
```

### Regerar a ID da sessão

Regerar o ID da sessão é frequentemente feito para impedir que usuários maliciosos explorem um ataque de correção de sessão
no seu aplicativo. Você pode regenerar a ID da sessão usando o método `Regenerar`:

```go
ctx.Request().Session().Regenerate()
```

Se você deseja regenerar o ID da sessão e esquecer todos os dados que estavam na sessão, você pode usar o método `Invalidate`
:

```go
ctx.Request().Session().Invalidate()
```

Em seguida, você precisa salvar a nova sessão no cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Nome: ctx.Request().Session().GetName(),
  Valor: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Caminho: facades.Config().GetString("sessão. ath"),
  Domínio: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("sessão. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Dados Flash

Dados Flash são dados de sessão que só estarão disponíveis durante a solicitação HTTP subsequente e então serão excluídos.
Dados em Flash são úteis para armazenar mensagens temporárias como mensagens de status. Você pode usar o método `Flash` para armazenar
dados flash na sessão:

```go
ctx.Request().Session().Flash("status", "Tarefa foi bem sucedida!")
```

Se você quiser manter seus dados flash ao redor para uma solicitação adicional, você pode usar o método `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Se você gostaria de manter dados flash específicos para uma solicitação adicional, você pode usar o método `Keep`:

```go
ctx.Request().Session().Keep("status", "username")
```

Se você gostaria de manter dados específicos para uso imediato, você pode usar o método `Now`:

```go
ctx.Request().Session().Now("status", "Tarefa foi bem sucedida!")
```

## Interagindo com gestor de sessão

### Construir uma sessão personalizada

Use a fachada `Session` para criar uma sessão personalizada. The `Session` facade provides the `BuildSession` method, which takes
a driver instance and an optional session ID if you want to specify a custom session ID:

```go
import "github.com/goravel/framework/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Adicionar Drivers de Sessão Personalizados

#### Implementando o driver

Para implementar um driver de sessão personalizado, o driver deve implementar a interface `contratos/sessão/driver`.

```go
// Driver is the interface for Session handlers.
type Driver interface {
  // Close closes the session handler.
  Close() error
  // Destroy destroys the session with the given ID.
  Destroy(id string) error
  // Gc performs garbage collection on the session handler with the given maximum lifetime.
  Gc(maxLifetime int) error
  // Open opens a session with the given path and name.
  Open(path string, name string) error
  // Read reads the session data associated with the given ID.
  Read(id string) (string, error)
  // Write writes the session data associated with the given ID.
  Write(id string, data string) error
}
```

#### Registrando o driver

Depois de implementar o motorista, você precisa registrá-lo no Goravel. Você pode fazer isso usando o método `Extend` do
`facades.Sessão`. Você deve chamar o método `Extend` no método `boot` do `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Assim que o motorista estiver registrado, você pode usá-lo definindo a opção `driver` no arquivo de configuração da sessão para
`redis` ou definindo a variável de ambiente `SESSION_DRIVER` como `redis`.

### Recuperando instância do driver

Use o método `Driver` para recuperar a instância do driver no gerenciador de sessão. It accepts an optional driver name, if
not provided, it returns the default driver instance:

```go
driver, err := facades.Session().Driver("arquivo")
```

### Iniciando uma nova sessão

```go
sessão := facades.Session().BuildSession(driver)
session.Start()
```

### Salvando os dados da sessão

```go
sessão := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Anexando a sessão ao pedido

```go
sessão := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(sessão)
```

### Verificando se o pedido tem sessão

```go
if ctx.Request().HasSession() {
    //
}
```
