# Roteamento

O módulo de roteamento de Goravel pode ser operado por `facades.Route()`.

## Driver HTTP

Goravel usa [gin](https://github.com/gin-gonic/gin) como seu driver HTTP padrão. Para usar outros drivers, configure-os em
o arquivo `config/http.go`. O padrão oficial suporta [gin](https://github.com/gin-gonic/gin)
e [fiber](https://github.com/gofiber/fiber).

| Motorista | Vincular                                                                                             |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Gin       | [https://github.com/goravel/gin](https://github.com/goravel/gin)     |
| Fibra     | [https://github.com/goravel/fiber](https://github.com/goravel/fiber) |

## Arquivo de roteamento padrão

Para definir arquivos de roteamento, basta navegar para o diretório `/routes`. Por padrão, a estrutura utiliza uma rota amostra
localizada em `/routes/web.go`. Para estabelecer a vinculação de roteamento, o método `func Web()` é registrado no arquivo
`app/providers/route_service_provider.go`.

Se você precisar de uma gestão mais precisa, você pode adicionar arquivos de roteamento ao diretório `/routes` e registrá-los no arquivo
`app/providers/route_service_provider.go`.

## Iniciar servidor HTTP

Inicie o servidor HTTP em `main.go` no diretório raiz chamando `facades.Route().Run()`. Isto irá automaticamente
buscar a configuração `route.host` .

```go
pacote

import main (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Isso inicializa o framework e o deixa pronto para uso. Inicialização
  . oot()

  // Iniciar servidor http por facades.Route().
  go func() {
    se err := facades. oute().Run(); err != nil {
      facades. og().Errorf("erro de execução da rota: %v", err)
    }
  }()

  selecione {}
}
```

## Iniciar servidor HTTPS

Por favor, complete a configuração de `http.tls` em `config/http.go` antes de usar HTTPS, o método `facades.Route().RunTLS()`
iniciará o servidor HTTPS de acordo com a configuração relevante:

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

Você também pode usar o método `facades.Route().RunTLSWithCert()` para personalizar o host e o certificado.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

## Fechar Servidor HTTP/HTTPS

Você pode fechar graciosamente o servidor HTTP/HTTPS chamando o método `Shutdown`, que esperará que todas as solicitações sejam
processadas antes de fechar.

```go
// main.go
bootstrap.Boot()

// Cria um canal para ouvir sinais
sair := make(chan os.Signal)
signal.Notify(Sair, syscall. IGINT, syscall.SIGTERM)

// Iniciar servidor http por facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Erro ao executar rota: %v", err)
  }
}()

// Ouça o sinal de SO
go func() {
  <-sair
  se err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("erro de desligamento da rota: %v", err)
  }

  os.Exit(0)
}()

selecione {}
```

### Métodos de roteamento

| Métodos     | Acão                                        |
| ----------- | ------------------------------------------- |
| grupo       | [Grupo de Routing](#group-routing)          |
| Prefixo     | [Prefixo de roteamento](#routing-prefix)    |
| ServeHTTP   | [Avaliação de teste](#testing-routing)      |
| Receber     | [Routing básico](#basic-routing)            |
| Publicar    | [Routing básico](#basic-routing)            |
| Colocar     | [Routing básico](#basic-routing)            |
| excluir     | [Routing básico](#basic-routing)            |
| Atualização | [Routing básico](#basic-routing)            |
| Opções      | [Routing básico](#basic-routing)            |
| Qualquer    | [Routing básico](#basic-routing)            |
| Recurso     | [Roteamento de recursos](#resource-routing) |
| Estático    | [Roteamento de arquivos](#file-routing)     |
| StaticFile  | [Roteamento de arquivos](#file-routing)     |
| StaticFS    | [Roteamento de arquivos](#file-routing)     |
| Mediador    | [Middleware](#middleware)                   |

## Roteamento básico

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Hello": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
facades. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Roteamento de Recursos

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// função GET /resource
(c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// DELETE /resource/{id}
função(c *ResourceController) Destroy(ctx http.Context) {}
```

## Roteamento do Grupo

```go
facades.Rote().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Prefixo de roteamento

```go
facades.Route().Prefix("usuários").Get("/", userController.Show)
```

## Roteamento de arquivos

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Parâmetros de roteamento

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Detalhe [Request](./requests)

## Mediador

```go
import "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Detalhe [Middleware](./middlewares)

## Rotas de Retorno

Usando o método `Fallback`, você pode definir uma rota que será executada quando nenhum outro caminho estiver de acordo com a solicitação
recebida.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "não encontrado")
})
```

## Taxa Limitada

### Definindo limites de taxa

Goravel inclui serviços de taxa-limitador poderosos e personalizáveis que você pode utilizar para restringir a quantidade de tráfego
para uma determinada rota ou grupo de rotas. To get started, you should define rate limiter configurations that meet your
application's needs. Typically, this should be done within the `configureRateLimiting` method of your application's
`app/providers/route_service_provider.go` class.

Limitadores de taxa são definidos usando o método `facades.RateLimiter()` do `For`. O método `For` aceita um nome de limitador de taxa
e um fechamento que retorna a configuração de limite que deve ser aplicada às rotas atribuídas ao limitador de taxa.
O nome do limitador de tarifa pode ser qualquer string que você desejar:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (receiver *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Se a solicitação de entrada exceder o limite de taxa especificada, uma resposta com um código de estado HTTP de 429 será automaticamente
retornado pelo Goravel. Se você quiser definir sua própria resposta que deve ser retornada por um limite de tarifa, você pode usar
o método de resposta:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Como callbacks limitador de taxa recebem a instância de solicitação HTTP recebida, você pode criar o limite de taxa apropriada
dinamicamente com base na solicitação de entrada ou usuário autenticado:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Suponha
  se is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Taxa de segmentação Limites

Às vezes você pode querer limitar a taxa de segmento por algum valor arbitrário. For example, you may wish to allow users to
access a given route 100 times per minute per IP address. Para fazer isso, você pode usar o método `Por` ao construir
seu limite de câmbio:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

Para ilustrar esse recurso usando outro exemplo, podemos limitar o acesso à rota para 100 vezes por minuto por
autenticado usuário ID ou 10 vezes por minuto por endereço IP para os convidados:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Limites de Taxa Múltipla

Se necessário, você pode retornar um array de limites de taxa para uma determinada configuração de limitador de taxa. Cada limite de taxa será
avaliado para a rota com base na ordem que eles estão posicionados dentro da matriz:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Anexando Limitadores de Taxa de Rotas

Limitadores de taxa podem ser anexados a rotas ou grupos de rota usando o intermediário de aceleração. O middleware de acelerador aceita
o nome do limitador de taxa que você deseja atribuir ao roteamento:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", function (ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
 }) })
```

## Compartilhamento de recursos entre origens (CORS)

Goravel tem CORS habilitado por padrão, a configuração pode ser modificada em `config/cors.go`.

> Para mais informações nos cabeçalhos CORS e CORS, consulte
> a [documentação da web MDN no CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
