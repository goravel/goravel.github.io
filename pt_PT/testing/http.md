# Testes HTTP

Ao construir aplicações web, muitas vezes você precisará testar se suas solicitações HTTP funcionam corretamente do início ao fim.
As ferramentas de testes de Goravel fazem isso de forma direta - você pode simular solicitações e verificar respostas sem configurar
ambientes de teste complexos.

## Fazer pedidos

Testar os endpoints HTTP no Goravel usa um padrão simples. Comece com o método `Http` do seu `TestCase`, que precisa de
a parâmetro `*testing.T` para asserções. Isto lhe dá um objeto de solicitação (`framework/contracts/testing.TestRequest`)
que lida com todos os verbos HTTP comuns como `Get`, `Post` e `Put`.

Em vez de fazer chamadas HTTP reais, esses métodos simulam o ciclo de solicitação do seu aplicativo internamente. Cada solicitação
retorna um objeto de resposta (`framework/contracts/testing.TestResponse`) com métodos para verificar os resultados.

Aqui está um exemplo básico:

```go
função(s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Personalizar cabeçalhos da solicitação

Você pode personalizar os cabeçalhos de solicitação usando `WithHeader` para um único cabeçalho ou `WithHeaders` para vários cabeçalhos:

```go
func (s *ExampleTestSuite) TestIndex() {
    // Resposta Única
    , err := s.Http(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Múltiplos cabeçalhos
    resposta, err := s. ttp(s.T()). ithHeaders(mapa[string]string{
        "X-Custom-Header": "Valor",
        "Accept": "application/json",
    }). et("/usuários/1")
}
```

### Biscoitos

Você pode usar o método `WithCookie` ou `WithCookies` para definir o valor dos cookies antes de fazer uma solicitação.

```go
função(s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithCookie("nome", "krishan"). et("/users/1")

 // ou use WithHeaders para vários cabeçalhos
 response, err := s. ttp(s.T()). ithHeader(mapa[string]string{
        "name": "krishan",
        "lang": "en",
    }). et("/usuários/1")
}
```

### Encerramento

Você pode definir os dados para a sessão usando o método `WithSession`:

```go
função(s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Respostas de depuração

Depois de fazer a solicitação, você pode usar o método `Session`, `Headers`, `Content`, `Cookies` ou `Json` para verificar os dados retornados por
a solicitação.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
 
 content, err := response.Content()
 
 cookies := response.Cookies()
 
 headers := response.Headers()
 
 json, err := response.Json() // response body parsed as json(map[string]any)
 
 session, err := response.Session() // returns all values stored in the current request session
}
```

## Construindo corpo

Para método como `Post`, `Put`, `Deletar` etc. Goravel aceita `io.Reader` como segundo argumento. Para simplificar a construção de cargas
, o framework fornece métodos utilitários para a construção dos corpos de solicitações.

```go
import "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("nome", "krishan")
    
    corpo, err := construtor. resposta uild()

    , r := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", corpo)
}
```

## Testando APIs Json

Goravel fornece vários auxiliares para testar as respostas da API JSON de forma eficaz. Ele tenta desmarcar o corpo da resposta em
a Go `map[string]any`. Se a arbitragem falhar, as afirmações associadas também falharão.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": true,
        })
}
```

Para acessar o JSON não marshalled diretamente, use o método `Json` no `TestResponse`. Isso permite que você inspecione elementos individuais
do corpo de resposta.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
O método `AssertJson` verifica se a resposta contém todos os valores especificados, mesmo se a resposta inclui
campos adicionais. Ele não requer uma correspondência exata a menos que você use `AssertExactJson`.
:::

### Afirmando correspondências JSON Exatas

Se você precisar verificar se a resposta corresponde ao seu JSON esperado exatamente (sem campos extras ou faltando), use o método
`AssertExactJson`.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Goravel facilita a realização de afirmações fluentes em respostas JSON. Usando o método `AssertFluentJson`, você pode passar
um fechamento que fornece uma instância de `framework/contracts/testing.AssertableJSON`. Esta instância permite que você verifique
valores específicos ou condições na resposta JSON retornada pelo seu pedido.

Por exemplo, você pode usar o método `Onde` para afirmar que um determinado valor existe na resposta JSON, e o método
`faltando` para garantir que um atributo não está presente.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex() {
    response, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (contrato json .AssertableJSON) {
   json.Where("id", float64(1)).
    Onde("nome", "Arcopão").
    Onde("lang", "en").
    Faltando("senha")
        })
}
```

### Atributo de Presença / Ausência

Se você quiser verificar se um atributo está presente ou faltando, Goravel torna simples com os métodos `Has` e` Missing`
.

```go
response.AssertStatus(201).
    AssertFluentJson(func (contractstesting.AssertableJSON) {
        json.Has("username").
            Faltando("password")
})
```

Você também pode afirmar a presença ou ausência de vários atributos de uma vez usando `HasAll` e `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verificed", "password"})
})
```

Se você precisa apenas verificar a presença de pelo menos um atributo de uma lista, use o método `HasAny`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### Patrulha da Coleção JSON

Quando uma resposta contém uma coleção de objetos sob uma chave nomeada, você pode usar vários métodos para verificar sua estrutura
e conteúdo.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    itens := []Item{
        {ID: 1},
        {ID: 2},
    }
    retorno ctx. esponse().Json(200, mapa[string]{
  "itens": itens,
    })
}
```

Você pode usar o método `Contagem` para verificar o número de elementos na coleção. Para fazer asserção de propriedades do primeiro elemento
, use o método `First`, que fornece uma instância de `AssertableJson`. Similarly, the `Each` method allows you
to iterate over all elements and assert their properties individually. Como alternativa, o método `HasWithScope` combina
a funcionalidade de `First` e`Count`, permitindo que você afirme tanto o primeiro elemento e seu conteúdo enquanto fornece
uma instância `AssertableJson` para declarações com escopo.

```go
// Contagem e Primeira
resposta.AssertStatus(200).
    AssertFluentJson(func(json contractstesting. ssertableJSON) {
        json.Count("itens", 2).
            primeiro("itens", função (contrato json. {
                json ssertableJSON. aqui("id", 1)
            })
    })

// Cada
resposta. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json. ount("itens", 2).
            Ensino("itens", func(contratação json. {
                json ssertableJSON. as("id")
            })
    })

// HasWithScope
resposta. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("itos", 2, func(contrato json. {
            json ssertableJSON. aqui("id", 1)
        })
})
```

## Disponível Declarações

### Declarações de resposta

|                                                   |                                                         |                                                         |
| ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| [AssertAccepted](#assertaccepted)                 | [AssertBadRequest](#assertbadrequest)                   | [AssertConflict](#assertconflict)                       |
| [AssertCookie](#assertcookie)                     | [AssertCookieExpired](#assertcookieexpired)             | [AssertCookieMissing](#assertcookiemissing)             |
| [AssertCookieNotExpired](#assertcookienotexpired) | [AssertCreated](#assertcreated)                         | [AssertDontSee](#assertdontsee)                         |
| [AssertExactJson](#assertexactjson)               | [AssertFluentJson](#assertfluentjson)                   | [AssertForbidden](#assertforbidden)                     |
| [AssertFound](#assertfound)                       | [AssertGone](#assertgone)                               | [AssertHeader](#assertheader)                           |
| [AssertHeaderMissing](#assertheadermissing)       | [AssertInternalServerError](#assertinternalservererror) | [AssertJson](#assertjson)                               |
| [AssertJsonMissing](#assertjsonmissing)           | [AssertMethodNotAllowed](#assertmethodnotallowed)       | [AssertMovedPermanently](#assertmovedpermanently)       |
| [AssertNoContent](#assertnocontent)               | [AssertNotAcceptable](#assertnotacceptable)             | [AssertNotFound](#assertnotfound)                       |
| [AssertNotModified](#assertnotmodified)           | [AssertOk](#assertok)                                   | [AssertPartialContent](#assertpartialcontent)           |
| [AssertPaymentRequired](#assertpaymentrequired)   | [AssertRequestTimeout](#assertrequesttimeout)           | [AssertSee](#assertsee)                                 |
| [AssertSeeInOrder](#assertseeinorder)             | [AssertServerError](#assertservererror)                 | [AssertServiceUnavailable](#assertserviceunavailable)   |
| [AssertStatus](#assertstatus)                     | [AssertSuccessful](#assertsuccessful)                   | [AssertTemporaryRedirect](#asserttemporaryredirect)     |
| [AssertTooManyRequests](#asserttoomanyrequests)   | [AssertUnauthorized](#assertunauthorized)               | [AssertUnprocessableEntity](#assertunprocessableentity) |

### Declarado

Afirma que a resposta tem um código de status HTTP `202 Aceito`:

```go
resposta.AssertAceito()
```

### SolicitarAssertBadaRequisição

Afirma que a resposta tem um código de status HTTP '400 Bad Request':

```go
responder.AssertBadRequest()
```

### Conflito

Afirma que a resposta tem um código de status HTTP `409 Conflict`:

```go
resposta.AssertConflict()
```

### Cookie

Afirma que a resposta contém um cookie com o nome e valor especificados:

```go
resposta.AssertCookie("nome", "valor")
```

### Expirado

Afirma-se que o cookie especificado expirou:

```go
resposta.AssertCookieExpired("nome")
```

### Falta

Afirma que a resposta não contém um cookie com o nome especificado:

```go
resposta.AssertCookieFaltando ("nome")
```

### AtribuirCookieNotado

Afirma que o cookie especificado não expirou:

```go
resposta.AssertCookieNotExpired("nome")
```

### Criado

Afirma que a resposta tem um código de status HTTP `201 Created` :

```go
resposta.AssertCreated()
```

### AssertDontSee

Afirma que a resposta não contém os valores especificados. O segundo parâmetro (opcional) determina se o parâmetro
escapa caracteres especiais nos valores antes da verificação. Se não for fornecido, o padrão é true.

```go
response.AssertDontSee([]string{"<div>"}, false) // Não escape de caracteres especiais
```

### AssertExactJson

Afirma que a resposta JSON corresponde exatamente ao `map[string]fornecido qualquer`:

```go
response.AssertExactJson(map[string]any{"created": true})
```

### AssertFluentJson

Afirma a resposta JSON usando uma interface fluente:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("criado", true)
})
```

### Proibido

Afirma que a resposta tem um código de status `403 Forbidden`:

```go
responder.AssertForbidden()
```

### Encontrado

Afirma que a resposta tem um código de status HTTP `302 Found`:

```go
resposta.AssertFound()
```

### AssertWone

Afirma que a resposta tem um código de status HTTP `410 Gone`:

```go
response.AssertGone()
```

### AssertCabeçalho

Afirma que a resposta contém o cabeçalho especificado com o valor fornecido:

```go
resposta.AssertHeader("Content-Type", "application/json")
```

### Falta

Afirma que a resposta não contém o cabeçalho especificado:

```go
resposta.AssertHeaderMissing("X-Personalizado")
```

### Erro

Afirma que a resposta tem um código de status HTTP do erro `500 servidor interno`:

```go
response.AssertInternalServerError()
```

### Json

Afirma que a resposta JSON contém o fragmento fornecido:

```go
resposta.AssertJson(mapa[string]any{"created": true})
```

### Falta

Afirma que as chaves ou valores especificados estão faltando no JSON de resposta:

```go
resposta.AssertJsonMissing(mapa[string]any{"created": false})
```

### Permitido

Afirma que a resposta tem um código de status HTTP '405 método não permitido':

```go
resposta.AssertMethodNotAllowed()
```

### AssertMovedPermanentemente

Afirma que a resposta tem um código de status HTTP `301 Movido Permanentemente`:

```go
resposta.AssertMovedPermanently()
```

### AssertNoContent

Afirma que a resposta tem um código de status HTTP `204 No Content`:

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Afirma que a resposta tem um código de status HTTP '406 não aceitável':

```go
resposta.AssertNotAceitável()
```

### ObservoNão Encontrado

Afirma que a resposta tem um código de status HTTP '404 Não Encontrado':

```go
responder.AssertNotFound()
```

### Modificado

Afirma que a resposta tem um código de status HTTP '304 não modificado':

```go
resposta.AssertNotModificado()
```

### Ok

Afirma que a resposta tem um código de status HTTP `200 OK`:

```go
response.AssertOk()
```

### ConteúdoParcial

Afirma que a resposta tem um código de status HTTP `206 Parcial Content`:

```go
resposta.AssertParalContent()
```

### Necessário

Afirma que a resposta tem um código de status HTTP '402 necessário:

```go
resposta.AssertPaymentRequired()
```

### Tempo limite

Afirma que a resposta tem um código de status HTTP '408 Request Timeout':

```go
resposta.AssertRequestTimeout()
```

### Consulta

Afirma que a resposta contém os valores especificados. O segundo parâmetro (opcional) determina se deseja escapar
caracteres especiais nos valores antes da verificação. Se não for fornecido, o padrão é 'true'.

```go
response.AssertSee([]string{"<div>"}, false) // Não escape de caracteres especiais
```

### Pedido

Afirma que a resposta contém os valores especificados na ordem fornecida. The second parameter (optional) determines
whether to escape special characters in the values before checking. Se não for fornecido, o padrão é 'true'.

```go
response.AssertSeeInOrder([]string{"First", "Second"}, false)  // Do not escape special characters
```

### AssertServerError

Asserts that the response has a server error (>= 500 , < 600) HTTP status code:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Asserts that the response has a `503 Service Unavailable` HTTP status code:

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Asserts that the response has the specified HTTP status code:

```go
response.AssertStatus(200)
```

### AssertSuccessful

Asserts that the response has a successful HTTP status code (2xx):

```go
response.AssertSuccessful()
```

### AssertTemporaryRedirect

Asserts that the response has a `307 Temporary Redirect` HTTP status code:

```go
response.AssertTemporaryRedirect()
```

### AssertTooManyRequests

Asserts that the response has a `429 Too Many Requests` HTTP status code:

```go
response.AssertTooManyRequests()
```

### AssertUnauthorized

Asserts that the response has a `401 Unauthorized` HTTP status code:

```go
response.AssertUnauthorized()
```

### AssertUnprocessableEntity

Asserts that the response has a `422 Unprocessable Entity` HTTP status code:

```go
response.AssertUnprocessableEntity()
```
