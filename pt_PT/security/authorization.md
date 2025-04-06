# Autorização

Goravel oferece serviços internos [authentication](./authentication) e um recurso de autorização fácil de usar para
gerenciar as ações dos usuários nos recursos. Mesmo que um usuário seja autenticado, ele pode não ter autoridade para modificar ou excluir
certos modelos ou registros do banco de dados. O recurso de autorização do Goravel permite uma forma sistemática de gerenciar
estas verificações de autorização.

Há duas maneiras de autorizar ações em Goravel: [gates](#gates) e [policies](#policies). Imagine portas e políticas
semelhantes a rotas e controladores. Os portões são baseados em encerramentos e fornecem uma abordagem simples para
autorização, enquanto a lógica do grupo de políticas em torno de um recurso específico, similar aos controladores. This documentation will
first cover gates and then delve into policies.

Não é necessário usar portas exclusivas ou políticas para criar uma aplicação. A maioria das aplicações usará uma combinação
de ambos, o que é perfeitamente aceitável!

## Portões

### Portões de escrita

Os portões servem como fechamentos que verificam se um usuário está autorizado a executar uma ação específica. Eles são comumente configurados
no método `app/providers/auth_service_provider.go` do arquivo `Boot` usando a fachada do portão.

Neste cenário, vamos estabelecer um portão para verificar se um usuário pode modificar um modelo de Post em particular, comparando seu ID com
o user_id do criador do post.

```go
provedores

import (
  "context"

  contractsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

função(receptor *AuthServiceProvider) Registrador(base de aplicativos. pplication) {

}

função(receptor *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Define("update-post",
    func(ctx context.Context, argumentos mapeiam[string]qualquer) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(models. ost)

      if user.ID == post.UserID {
        retorno de acesso. ewAllowResponse()
      } else {
        return access. ewDenyResponse("erro")
      }
    },
  )
}
```

### Autorizando ações

Para autorizar uma ação usando portões, você deve usar os métodos `Allows` or `Denies` fornecidos pelo rosto do portão:

```go
controladores de package

import (
  "github.com/goravel/framework/facades"
)

type UserController struct {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

Você pode autorizar várias ações simultaneamente usando os métodos `Any` ou `None`.

```go
if facades.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // O usuário pode atualizar ou excluir o post. .
}

se a factura. ate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // O usuário não pode atualizar ou excluir o post. .
}
```

### Respostas do Portão

O método `Allows` retorna um valor booleano. Para obter a resposta de autorização completa, use o método `Inspect`.

```go
resposta := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // A ação é autorizada...
} else {
    fmt.Println(response.Message())
}
```

### Interceptando Verificações de Portão

Às vezes, você pode querer conceder todas as habilidades para um usuário específico. Você pode definir uma fechamento usando o método `Antes`,
que é executado antes de quaisquer outras verificações de autorização:

```go
facades.Gate().Before(func(ctx context.Context, string de habilidade, argumentos map[string]any) contractsaccess.Response {
  user := ctx.Value("usuário"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Se o fechamento 'Antes' retornar um resultado não-nil, esse resultado será considerado o resultado da verificação de autorização.

O método `após` pode ser usado para definir um fechamento que será executado após todas as outras verificações de autorização.

```go
facades.Gate().After(func(ctx context.Context, string de habilidade, argumentos map[string]any, result contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("usuário").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Aviso: O resultado de retorno de `após` será aplicado somente quando `facades.Gate().Define` retorna nilo.

### Injetar Contexto

O `context` será passado para o `Before`, `After`, e os métodos `Define`.

```go
facades.Gate().WithContext(ctx).Allows("update-post", mapa[string]any{
  "post": post,
})
```

## Políticas

### Gerando Políticas

Você pode usar o comando `make:policy` do Artisan para gerar uma política. A política gerada será salva no diretório
`app/polices`. Se o diretório não existir em seu aplicativo, Goravel irá criá-lo para você.

```go
go run . artisan make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### Políticas de escrita

Vamos definir um método `Atualizar` no `PostPolicy` para verificar se um `Usuário` pode atualizar um `Post`.

```go
package policies

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if usuário. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("Você não é o dono desta publicação.")
  }
}
```

Em seguida, podemos registrar a política em `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", políticasNewPostPolicy().Update)
```

Conforme você trabalha na autorização de diferentes ações, você pode adicionar mais métodos à sua política. Por exemplo, você pode criar métodos
`Exibir` ou `Deletar` para autorizar várias ações relacionadas ao modelo. Sinta-se à vontade para nomear seus métodos de política conforme você vê
como quiser.
