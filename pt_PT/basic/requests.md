# Solicitações HTTP

O método `contracts/http/Request` de Goravel pode interagir com a atual solicitação HTTP processada pela aplicação,
e obter a entrada e os arquivos enviados juntos.

## Interagindo com o pedido

A instância `http.Context` é automaticamente injetada no controlador:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Recuperando o caminho do pedido

```go
path := ctx.Request().Path() // /users
```

### Recuperando a URL requisitada

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Recuperando o pedido HOST

```go
url := ctx.Request().Host()
```

### Recuperando a URL do pedido completo

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Recuperando o método de solicitação

```go
Método := ctx.Request().Method()
```

### Cabeçalhos de solicitação

```go
header := ctx.Request().Header("X-Header-Name", "default")
headers := ctx.Request().Headers()
```

### Solicitar endereço IP

```go
ip := ctx.Request().Ip()
```

## Input

### Recuperando todos os dados de entrada

Você pode recuperar todos os dados de entrada da solicitação de entrada como `map[string]qualquer` usando o método `All`, que é uma coleção
de `json`, `form` e `query`(prioridade da frente para trás).

```go
dados := ctx.Request().All()
```

### Recuperar um Valor de Rota

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Recuperando a entrada da string de consulta

```go
// /users?name=goravel
name := ctx.Request().Query("nome")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
nome := ctx.Request().QueryInt64("id")
nome := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
names := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
names := ctx.Request().QueryMap("names")

queries := ctx.Request().Queries()
```

> Nota: Apenas dados de JSON unidimensional podem ser obtidos, caso contrário, eles retornarão vazios.

### Recuperar um valor de entrada

Acesso a todos os dados de usuário sem se preocupar sobre qual verbo HTTP foi usado para a solicitação. Recuperar a ordem: `json`,
`formulário`.

```go
name := ctx.Request().Input("nome")
nome := ctx.Request().Input("nome", "goravel")
nome := ctx.Request().InputInt("nome")
nome := ctx.Request(). nputInt64("nome")
nome := ctx.Request().InputBool("nome")
nome := ctx.Request().InputArray("nome")
nome := ctx.Request().InputMap("nome")
```

### Vincular Json/Forma

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user user
err := ctx.Request().Bind(&user)
```

```go
var mapa do usuário[string]qualquer
err := ctx.Request().Bind(&user)
```

### Vincular consulta

Apenas suporta vincular a consulta à estrutura:

```go
type Teste struct {
  ID string `form:"id"`
}
var test Test
err := ctx.Request().BindQuery(&test)
```

## Biscoito

### Recuperar um Valor de Cookie

Goravel fornece uma maneira simples de trabalhar com `cookie`. Use o método `Cookie` na instância `Request` para obter um valor
`cookie`, retornará uma seqüência vazia se o `cookie` não estiver presente. You can also define a default value in the
second argument.

```go
valor := ctx.Request().Cookie("nome")
valor := ctx.Request().Cookie("nome", "padrão") 
```

## Arquivo

### Recuperando arquivo

```go
arquivo, err := ctx.Request().File("arquivo")
```

### Salvar Arquivo

```go
arquivo, err := ctx.Request().File("arquivo")
arquivo.Store("./public")
```

### Obter Pedido de Origem

```go
pedido := ctx.Request().Origin()
```

### Anexar dados

```go
ctx.WithValue("usuário", "Goravel")
```

### Obter dados

```go
usuário := ctx.Value("usuário")
```

### Obter contexto

```go
ctx := ctx.Context()
```

## Recuperação personalizada

Você pode definir um `recuperação` personalizado chamando o método `Recuperar` no arquivo `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Adiciona HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // ou
    // ctx.Response(). tentando(500, "Erro interno do servidor").Abort()
  })
  ...
}
```
