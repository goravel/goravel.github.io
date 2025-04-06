# Visualizações

Claro, não é prático retornar todos os textos de documentos HTML diretamente de suas rotas e controladores.
Felizmente, as visualizações oferecem uma maneira conveniente de colocar todo o nosso HTML em arquivos separados. Visualizações separam seu controle /
lógica de aplicação da sua lógica de apresentação e são armazenadas no diretório `resources/views`.

## Criando Views & Renderização

Ao usar o template padrão do Goravel `html/template`, você pode criar views adicionando um arquivo com a extensão `.tmpl`
da aplicação no diretório `resources/views`.

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Olá, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Depois de criar a visão, você pode usar o método `Exibir` para retornar a view de uma rota ou controlador no aplicativo:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Diretórios de visualizações aninhados

As visualizações também podem ser aninhadas dentro de subdiretórios do diretório `resources/views`. Por exemplo, se sua visualização for armazenada
em `resources/views/admin/profile. mpl`, você pode retornar de uma das rotas ou controladores da sua aplicação, observe
que a view precisa ser definida como `definir "admin/profile. mpl"` como mostrado abaixo:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Bem-vindo ao painel de administração</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### Criando a primeira visualização disponível

Usando o método `First`, você pode usar a primeira visão que existe em uma determinada matriz de visões. Isso pode ser útil se o seu
aplicativo ou pacote permitir que visualizações sejam personalizadas ou substituídas:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### Determinando Se Uma Vista Existe

Se você precisar determinar se uma visão existe, pode usar o método `facades.View()`:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Passando dados para visualização

Como você viu nos exemplos anteriores, você pode passar uma matriz de dados para a visualização para tornar esses dados disponíveis.
Por favor note que o formato dos dados passados precisa mudar de acordo com o modelo de driver usado, no seguinte
exemplo, usando o driver padrão `html/template`:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Compartilhando dados com todas as visualizações

Às vezes, pode ser necessário compartilhar dados com todas as visualizações renderizadas pela sua aplicação. Você pode fazer isso usando o método
`Compartilhar` em `facades.View()`. Normalmente, você deve fazer chamadas para o método `Compartilhar` dentro do método
do provedor de serviços `Boot`. Você tem a liberdade de adicioná-los à classe `app/providers/app_service_provider.go` ou gerar um provedor
separado para alojá-los:

```go
package providers

import (
 "github.com/goravel/framework/contracts/foundation"
    "github.com/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (receiver *AppServiceProvider) Register(app foundation.Application) {
}

func (receiver *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
