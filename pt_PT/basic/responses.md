# Resposta HTTP

Você pode usar `ctx.Response()` para resposta HTTP no Controller.

## Cordas

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hello Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx. esponse().Json(http. OK, struct {
  ID uint `json:"id"`
  Name string `json:"name"`
}{
  Id: 1,
  Front: "Goravel",
})
```

## Retorno personalizado

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Arquivo de resposta

```go
import "net/http"

ctx.Response().File("./public/logo.png")
```

## Baixar Arquivo

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Anexar Cabeçalho

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hello Goravel")
```

## Biscoito

### Definir Cookie

Use o método `Cookie` na instância `resposta` para definir um `cookie`. O método `Cookie` aceita uma instância `http.Cookie`
, que permite que você defina várias opções de cookie.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Nome: "nome",
  Valor: "Goravel",
  Caminho: "/",
  Domínio: "goravel. ev",
  Expira: time.Now().Add(24 * time.Hour),
  Seguro: true,
  HttpOnly: true,
})
```

### Expira Cookie

Use o método `WithoutCookie` para remover um cookie.

```go
ctx.Response().WithoutCookie("nome")
```

## Retorno com sucesso

```go
ctx.Response().Success().String("Hello Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Código personalizado

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Transmissão de Retorno

```go
ctx.Response().Stream(http.StatusCreated, function (w http. erro do treamWriter) {
  data := []string{"a", "b", "c"}
  for _, item := intervalo de dados {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    time.Sleep(1 * time. econd)
  }

  return nil
})
```

## Redirecionamento

```go
ctx.Response().Redirect(http.StatusMovedPermanentemente, "https://goravel.dev")
```

## Nenhum Conteúdo

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Obter Resposta

Você pode obter todas as informações de `ctx.Response()`, que é comumente usado no middleware HTTP:

```go
origem := ctx.Response().Origin()
```

`origem` contém alguns métodos como mostrado abaixo de：

| Método    | Acão                        |
| --------- | --------------------------- |
| Conteúdo  | Obter dados de resposta     |
| Cabeçalho | Obter cabeçalho de resposta |
| Tamanho   | Obter tamanho da resposta   |
| SItuação  | Obter status da resposta    |
