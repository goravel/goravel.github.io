# Validação

Goravel fornece várias abordagens diferentes para validar os dados de entrada do seu aplicativo. É mais comum usar o método
`Validate` disponível em todas as solicitações HTTP recebidas. Goravel inclui uma ampla variedade de regras de validação
de conveniência.

## Validação Rápida

Vamos dar uma olhada mais de perto em um exemplo completo de como validar um formulário e devolver mensagens de erro ao usuário. This
overview will provide you with a general understanding of how to validate incoming request data using Goravel.

### Definindo as Rotas

Primeiro, vamos supor que nós temos as seguintes rotas definidas em nosso arquivo `routes/web.go`:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

A rota `GET` exibe um formulário para criar um novo post de blog. A rota 'POST' armazena a nova postagem no banco de dados.

### Criando o Controller

Em seguida, vamos dar uma olhada em um controlador simples que lida com solicitações de entrada para essas rotas. Vamos deixar o método `Store`
vazio por enquanto:

```go
controladores

import (
  "github. om/goravel/framework/contracts/http"
)

type PostController struct {
  // Serviços Dependentes
}

func NewPostController() *PostController {
  return &PostController{
    // Inject services
  }
}

func (r *PostController) Create(ctx http. ontext) {

}

função(r *PostController) Store(ctx http.Context) {

}
```

### Escrever a lógica de validação

Agora estamos prontos para preencher nosso método `Store` com a lógica para validar o novo post.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required^\\max_len:255",
    "body": "obrigatório",
    "code": "required├regex:^\d{4,6}$",
  })
}
```

### Atributos Aninhados

Se a solicitação HTTP recebida contiver dados de campo "nested", você pode especificar esses campos em suas regras de validação usando
a sintaxe "dot":

```go
validador, err := ctx.Request().Validate(map[string]string{
  "title": "required¡max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Validação da fatia

Se a solicitação HTTP recebida contiver dados de campo "array", você pode especificar estes campos em suas regras de validação usando
a sintaxe `*`:

```go
validador, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Validação de Formulário

### Criando Requisições de Formulário

Para cenários de validação mais complexos, você pode criar uma "solicitação de formulário". Solicitações de formulários são classes personalizadas
que encapsulam suas próprias lógicas de validação e autorização. Para criar uma classe de solicitação de formulário, você pode usar o comando
`make:request` Artisan CLI:

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

A classe de solicitação de formulário gerada será colocada no diretório `app/http/requests`. Se esta pasta não existir,
ela será criada quando você executar o comando `make:request`. Cada solicitação de formulário gerada por Goravel tem seis métodos:
`Autorizar`, `Regras`. Além disso, você pode personalizar os métodos `Filtros`, `Messages`, `Attributes` e `PrepareForValidation`
para futuras operações.

O método `Authorize` é responsável por determinar se o usuário autenticado atualmente pode executar a ação
representada pela solicitação, enquanto o método 'Regras' retorna as regras de validação que devem se aplicar aos dados
da requisição:

```go
package requests

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

tipo StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. erro ontext) {
  return nil
}

func (r *StorePostRequest) Rules(ctx http. ontext) map[string]string {
  return map[string]string{
    // As chaves são consistentes com as chaves recebidas.
    "name": "required├max_len:255",
  }
}

função(r *StorePostRequest) Filtros(ctx http. ontext) mapa[string]string {
  retornar mapa[string]string{
    "name": "trim",
  }
}

função(r *StorePostRequest) Mensages(ctx http. mapa ontext)[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. mapa[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. notexto, erro de validação de dados.Data) {
  return nil
}
```

Então, como são avaliadas as regras de validação? Tudo o que você precisa fazer é fazer tipo-dica da solicitação no seu método de controle. A solicitação de formulário recebida
é validada antes que o método de controle seja chamado, Quer dizer que você não precisa bagunçar o controlador
com qualquer lógica de validação:

Então você pode usar o método `ValidateRequest` para validar a solicitação no controlador:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Verificar mais regras na seção [Regras de validação disponíveis](#available-validation-rules).

> Observe que, desde que `form` passaram valores 「are de tipo `string` por padrão, todos os campos na solicitação também devem ter
> tipo `string`, caso contrário, por favor, use `JSON` para passar valores.

### Solicitações de formulário de autorização

A classe de solicitação de formulário também contém um método `Authorize`. Dentro desse método, você pode determinar se o usuário
autenticado tem autoridade para atualizar um determinado recurso. Por exemplo, você pode determinar se um usuário realmente possui um comentário do blog
que ele está tentando atualizar. Provavelmente, você interagirá com
as [portas e políticas de autorização](../security/authorization) dentro deste método:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) erro {
  var comment models.
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    erros de retorno. ew("nenhum comentário foi encontrado")
  }

  se !facades.Gate(). llows("update", map[string]any{
    "comment": comentário,
  }) {
    erros de retorno. ew("não pode atualizar o comentário")
  }

  return nil
}
```

`error` será passado para o valor de retorno de `ctx.Request().ValidateRequest`.

### Filtrar dados de entrada

Você pode formatar os dados de entrada melhorando o método `Filtros` da solicitação de formulário. Este método deve retornar um mapa do
`atributo/filtro`:

```go
func (r *StorePostRequest) Filtro(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### Personalizando as mensagens de erro

Você pode personalizar as mensagens de erro usadas pela solicitação de formulário substituindo o método `Messages`. This method should
return an array of attribute / rule pairs and their corresponding error messages:

```go
func (r *StorePostRequest) mapa Messages()[string]string {
  return map[string]string{
    "title. equired": "Um título é obrigatório",
    "corpo.required": "Uma mensagem é necessária",
  }
}
```

### Personalizando os atributos de validação

Muitas das mensagens de erro de regra de validação de Goravel contêm um placeholder `:attribute`. Se você quiser que o espaço reservado
`:attribute` da sua mensagem de validação seja substituído por um nome de atributo personalizado, você pode especificar os nomes
personalizados substituindo o método `Atributos`. Este método deve retornar uma matriz de pares de atributos/nomes:

```go
func (r *StorePostRequest) mapa[string]string {
  return map[string]string{
    "email": "email address",
  }
}
```

### Preparando a entrada para validação

Se você precisa preparar ou anitizar qualquer dado do pedido antes de aplicar as regras de validação, você pode usar o método
`PrepareForValidation`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, erro validation.Data) {
  if name, exist := data. et("nome"); existe {
    return data.Set("nome", name.(string)+"1")
  }
  return nil
}
```

## Criando validadores manualmente

Se você não quiser usar o método `Validate` na solicitação, você pode criar uma instância de validador manualmente usando o
`facades.Validator`. O método `Make` da fachada gera uma nova instância de validador:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    mapa[string]qualquer{
      "nome": "Goravel",
    },
    mapa[string]string{
      "title": "required¡max_len:255",
      "corpo": "obrigatório",
    })

  se validador ails() {
    // Return fail
  }

  var models. ser
  err := validator.Bind(&user)
  ...
}
```

O primeiro argumento passado para o método `Make` é o dos dados sob validação que pode ser `map[string]any` ou `struct`.
O segundo argumento é um conjunto de regras de validação a serem aplicadas aos dados.

### Personalizando as mensagens de erro

Se necessário, você pode fornecer mensagens de erro personalizadas que uma instância de validador deve usar ao invés das mensagens de erro padrão
fornecidas por Goravel. Você pode passar as mensagens personalizadas como o terceiro argumento para o método `Make` (também
aplicável a `ctx.Request().Validate()`):

```go
validador, err := facades.Validation().Make(entrada, regras, validation.Messages(mapa[string]string{
  "required": "The :attribute field is required.",
}))
```

### Especificar uma mensagem personalizada para um dado atributo

Às vezes você pode querer especificar uma mensagem de erro personalizada apenas para um atributo específico. Você pode fazer isso usando a notação "dot"
notação. Especifique o nome do atributo primeiro, seguido da regra (também aplicável a `ctx.Request().Validate()`):

```go
validador, err := facades.Validation().Make(entrada, regras, validation.Messages(mapa[string]string{
  "email.required": "Precisamos saber seu endereço de e-mail!",
}))
```

### Especificando os valores dos atributos personalizados

Muitas das mensagens de erro integradas de Goravel incluem um espaço reservado `:attribute` que é substituído pelo nome do campo
ou atributo sob validação. Para personalizar os valores usados para substituir esses espaços reservados para campos específicos, você
pode passar um array de atributos personalizados como o terceiro argumento para o método `Make` (também aplicável a
`ctx. equest().Validate()`):

```go
validador, err := facades.Validation().Make(entrada, regras, validation.Attributes(mapa[string]string{
  "email": "email address",
}))
```

### Formatar dados antes da validação

Você pode formatar os dados antes de validar os dados para validação mais flexível, e você pode passar o método de formatação
dos dados como o terceiro parâmetro para o método `Make` (também aplicável ao `ctx. equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(entrada, regras,
    validação. erro repareForValidation(func(ctx http.Context, data validationcontract.Data) {
      se nome, existe := dados. et("nome"); existe {
        dados de retorno. et("nome", nome)
      }

      return nil
    }))

  . .
}
```

## Trabalhando com entrada validada

Depois de validar os dados de solicitação de entrada usando solicitações de formulário ou instâncias de validador manualmente criadas, você ainda quer
vincular os dados da solicitação a um `estrutur`, existem duas maneiras de fazer isso:

1. Use o método `Bind`, isto irá vincular todos os dados de entrada, incluindo dados não validados:

```go
validador, err := ctx.Request().Validate(rules)
var models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(input, rules)
var models.User
err := validator.Bind(&user)
```

2. Os dados de entrada são automaticamente associados ao formulário quando você usa a solicitação para validação:

```go
var storePost requests.StorePostRequest
erros, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Trabalhando com mensagens de erros

### Recuperar uma mensagem de erro para um campo (Aleatório)

```go
validador, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### Recuperar todas as mensagens de erro para um campo

```go
mensagens := validator.Errors().Get("email")
```

### Recuperar todas as mensagens de erro para todos os campos

```go
mensagens := validator.Errors().All()
```

### Determinar se as mensagens de erro existem para um campo

```go
if validator.Errors().Has("email") {
  //
}
```

## Regras de validação disponíveis

Abaixo está uma lista de todas as regras de validação disponíveis e sua função:

| Nome:   | Descrição:                                                                                                                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'Obrigatório'           | O valor de verificação é necessário e não pode ser valor zero. Por exemplo, o tipo de campo é `bool`, o valor de passagem é `false`, ele não pode passar a validação. |
| `obrigatório_se`        | `required_if:anotherfield,value,...` O campo sob validação deve estar presente e não vazio se o outro campo é igual a qualquer valor.                                                 |
| `obrigatório_sem menos` | `required_unless:outrofield,value,...` O campo sob validação deve estar presente e não vazio a menos que o outro campo é igual a qualquer valor.                                      |
| `obrigatório_com`       | `required_with:foo,bar,...` O campo sob validação deve estar presente e não vazio somente se algum dos outros campos especificados estiver presente.                                  |
| `obrigatório_com_todos` | `required_with_all:foo,bar,...` O campo sob validação deve estar presente e não vazio somente se todos os outros campos especificados estiverem presentes.                            |
| `necessário_sem`        | `required_without:foo,bar,...` O campo sob validação deve estar presente e não vazio somente quando nenhum dos outros campos especificados não está presente.                         |
| `obrigatório_sem_todos` | `required_without_all:foo,bar,...` O campo sob validação deve estar presente e não vazio somente quando todos os outros campos especificados não estão presentes.                     |
| Dica                    | O valor de verificação é o tipo 'intX' e tamanho de suporte. eg: `int` `int:2` `int:2,12`. Aviso: [Pontos por usar as regras](#int)   |
| `uint`                  | Verifique o valor é o tipo `uint(uintX)`, `value >= 0`                                                                                                                                                |
| `bool`                  | Valor de verificação é bool string(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                          |
| string\`                | O valor de verificação é um tipo string e tamanho do suporte. eg:`string` `string:2` `string:2,12`                                                                    |
| float\`                 | Verifique o valor é o tipo 'float(floatX)'                                                                                                                                         |
| fatiar                  | Verificar valor é tipo de fatia(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                            |
| `em`                    | `in:foo,bar,…` Verifique se o valor está na enumeração determinada                                                                                                                                    |
| `não_em`                | `not_in:foo,bar,…` Verifique se o valor não está na enumeração determinada                                                                                                                            |
| `começar_com`           | `starts_with:foo` Verifique se o valor da cadeia de caracteres de entrada começa com a sub-string dada                                                                                                |
| `ends_com`              | `ends_with:foo` Verifique se o valor da cadeia de caracteres de entrada está terminando com a subcadeia dada                                                                                          |
| entre                   | `entreween:min,max` Verifique se o valor é um número e está dentro do intervalo determinado                                                                                                           |
| max\`                   | `max:value` O valor da verificação é menor ou igual ao valor fornecido(`intX` `uintX` `floatX`)                                                                                    |
| Min                     | `min:value` O valor da verificação é maior ou igual ao valor fornecido (`intX` `uintX` `floatX`)                                                                                   |
| `eq`                    | `eq:value` Verifique se o valor de entrada é igual ao valor dado                                                                                                                                      |
| `ne`                    | `ne:value` Verifique se o valor de entrada não é igual ao valor dado                                                                                                                                  |
| `lt`                    | `lt:value` Verifique o valor é menor do que o valor fornecido (`intX` `uintX` `floatX`)                                                                                            |
| `gt`                    | `gt:value` O valor de verificação é maior do que o valor fornecido (`intX` `uintX` `floatX`)                                                                                       |
| `len`                   | `len:value` Verifique o tamanho do valor é igual ao tamanho dado (`string` `array` `slice` `map`)                                                                                  |
| `min_len`               | `min_len:value` Verifique o tamanho mínimo do valor é o tamanho dado (`string` `array` `slice` `map`)                                                                              |
| `max_len`               | `max_len:value` Verifique o tamanho máximo do valor é o tamanho fornecido (`string` `array` `slice` `map`)                                                                         |
| `email`                 | Verificar valor é a cadeia de endereço de e-mail                                                                                                                                                      |
| `array`                 | Verificar valor é matriz, tipo de recorte                                                                                                                                                             |
| `mapa`                  | Valor de verificação é um tipo de MAP                                                                                                                                                                 |
| `eq_field`              | 'eq_field:field' Verifique que o valor do campo é igual ao valor de outro campo                                                                                  |
| `ne_field`              | 'ne_field:field' Verifique que o valor do campo não é igual ao valor de outro campo                                                                              |
| `gt_field`              | 'gt_field:field' Verifique que o valor do campo é maior que o valor de outro campo                                                                               |
| `gte_field`             | 'gte_field:field' Verifique que o valor do campo é maior ou igual ao valor de outro campo                                                                        |
| `lt_field`              | 'lt_field:field' Verifique que o valor do campo é menor que o valor de outro campo                                                                               |
| `lte_field`             | 'lte_field:field' Verifique se o valor do campo é menor ou igual ao valor de outro campo                                                                         |
| `arquivo`               | Verifique se é um arquivo carregado                                                                                                                                                                   |
| `image`                 | Verificar se é um arquivo de imagem carregado e sufixo do sufixo de suporte                                                                                                                           |
| Data                    | Verifique se o valor do campo é string de data                                                                                                                                                        |
| `gt_date`               | `gt_date:value` Verifique se o valor de entrada é maior do que o dado string de data                                                                                                                  |
| `lt_date`               | `lt_date:value` Verifique se o valor de entrada é menor do que a determinada string de data                                                                                                           |
| `gte_date`              | `gte_date:value` Verifique se o valor de entrada é maior ou igual à string de data determinada                                                                                                        |
| `lte_date`              | `lte_date:value` Verifique se o valor de entrada é menor ou igual à determinada string de data                                                                                                        |
| `alfa`                  | Verifique se o valor contém apenas caracteres alfabéticos                                                                                                                                             |
| `alpha_num`             | Verifique se apenas letras, números estão incluídos                                                                                                                                                   |
| `alpha_dash`            | Marque para incluir apenas letras, números, traços ( - ) e sublinhados ( _ )                                                               |
| `json`                  | O valor de verificação é JSON                                                                                                                                                                         |
| `número`                | O valor de verificação é a string de número `>= 0`                                                                                                                                                    |
| url\`                   | Verificar o valor é sequência de URL completa(deve começar com http,https)                                                                                                         |
| `ip`                    | Valor de verificação é sequência de caracteres de IP(v4 ou v6)                                                                                                                     |
| `ipv4`                  | Valor de verificação é cadeia IPv4                                                                                                                                                                    |
| `ipv6`                  | Valor de verificação é string IPv6                                                                                                                                                                    |
| `regex`                 | Verificar se o valor pode passar na verificação normal                                                                                                                                                |

### Pontos para o uso de regras

#### int

Ao usar `ctx.Request().Validate(rules)` para validação, os dados de tipo `int` recebidos serão analisados por
`json. nmarshal` para o tipo 'float64', que fará com que a validação da inta regra falhe.

**Soluções**

Opção 1: Adicionar [`validation.PrepareForValidation`](#format-data-before-validation), formatar os dados antes de validar os dados
;

Opção 2: Use `facades.Validation().Make()` para validação da regra;

## Regras de validação personalizadas

Goravel fornece uma variedade de regras de validação úteis; no entanto, você pode desejar especificar algumas suas próprias. One method of
registering custom validation rules is using rule objects. Para gerar um novo objeto de regra, você pode simplesmente usar o comando
`make:rule` Artisan.

Por exemplo, se você quiser verificar que uma seqüência de caracteres é maiúscula, você pode criar uma regra com esse comando. Goravel irá
então salvar esta nova regra no diretório `app/rules`. If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
go run . artisan make:rule Maiúsculas
go run . artisan make:rule user/Uppercase
```

Depois de criar a regra, precisamos definir o seu comportamento. Um objeto de regra possui dois métodos: `Passes` e `Message`. O método
Passes recebe todos os dados, incluindo os dados a serem validados e os parâmetros de validação. Deve retornar
`true` ou `false` dependendo se o valor do atributo é válido. O método `Mensagem` deve retornar o erro
para validação que deve ser usado quando a validação falhar.

```go
package rules

import (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Assinatura O nome da regra.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes determinam se a regra de validação passa.
função(destinatário *Maior) Passes(validação de dados.Data, aposta de uma, opções ...qualquer) bool {
  return strings.ToUpper(val.(string)) == val. string)
}

// Mensagem Recebe a mensagem de erro de validação.
função(destinatário *Maiúscula) Message() string {
  return "O :attribute deve ser maiúsculo."
}

```

Então você precisa registrar a regra para o método `rules` no arquivo `app/providers/validation_service_provider.go` e
a regra pode ser usada como outras regras:

```go
provedores de pacote

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func(receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("erro adicionar regras erro: %+v", err)
  }
}

função(regra do destinatário *ValidationServiceProvider)() []validação. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Filtros de Validação Disponíveis

| Nome:          | Descrição:                                                                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Converta valor(string/intX/floatX) para `int` tipo `v.FilterRule("id", "int")`                                                                           |
| `uint/toUint`                  | Converter valor(string/intX/floatX) para `uint` tipo `v.FilterRule("id", "uint")`                                                                        |
| `int64/toInt64`                | Converter valor(string/intX/floatX) para `int64` tipo `v.FilterRule("id", "int64")`                                                                      |
| `float/toFloat`                | Converter valor(string/intX/floatX) para `float` tipo                                                                                                    |
| `bool/toBool`                  | Converter valor string para bool. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false") |
| `recortar/trimSpace`           | Limpar caracteres de espaços em branco em ambos os lados da sequência de caracteres                                                                                         |
| `ltrim/trimEsquerda`           | Limpar caracteres de espaço em branco nos lados esquerdo da string                                                                                                          |
| `rtrim/trimRight`              | Limpar caracteres de espaço em branco nos lados direito da string                                                                                                           |
| 'int/inteiro'                  | Converta valor(string/intX/floatX) para `int` tipo `v.FilterRule("id", "int")`                                                                           |
| `inferior/minúscula`           | Converter a cadeia de caracteres para minúsculas                                                                                                                            |
| `upper/uppercase`              | Converter a seqüência de caracteres para maiúsculas                                                                                                                         |
| `lcFirst/lowerFirst`           | Converter o primeiro caractere de uma string em minúsculas                                                                                                                  |
| `ucFirst/upperFirst`           | Converta o primeiro caractere de uma string em maiúsculas                                                                                                                   |
| `ucWord/upperWord`             | Converta o primeiro caractere de cada palavra em maiúsculas                                                                                                                 |
| `camel/camelCase`              | Converter cadeia de caracteres para estilo de nome de camelo                                                                                                                |
| `snake/snakeCase`              | Converter cadeia de caracteres para estilo de nomenclatura das cobras                                                                                                       |
| `escapeJs/escapeJS`            | Escape JS string.                                                                                                                                           |
| `escapeHtml/escapeHTML`        | Escape de string HTML.                                                                                                                                      |
| `str2ints/strToInts`           | Converter cadeia de caracteres para recorte `[]int`                                                                                                                         |
| `str2time/strToTime`           | Converter string de data para `time.Time`.                                                                                                                  |
| `str2arr/str2array/strToArray` | Converter cadeia de caracteres para recorte `[]string`                                                                                                                      |

## Filtro personalizado

Goravel fornece uma variedade de filtros úteis, no entanto, você pode querer especificar alguns de seus próprios filtros. Para gerar uma nova regra
objeto, você pode simplesmente usar o comando `make:filter` Artisan. Vamos usar esse comando para gerar uma regra que converte uma string
em um inteiro. Esta regra já está inserida no quadro, apenas a criamos como exemplo. Goravel vai salvar
este novo filtro no diretório `app/filters`. Se este diretório não existir, o Goravel criará quando você executar o comando
do Artisan para criar a regra:

```go
go run . artisan make:filter ToInt
// ou
go run . artisan make:filter user/ToInt
```

Um filtro contém dois métodos: `Signature` and `Handle`. O método `Assinatura` define o nome do filtro. O método
`Handle` executa a lógica de filtragem específica:

```go
package filters

import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Assinatura A assinatura do filtro.
função(receiver *ToInt) Signature() string {
  return "ToInt"
}

// Identificador define a função de filtro para aplicar.
função(destinatário *Para) Handle() any {
  return func (val qualquer) int {
    return cast. oString(val)
  }
}
```

Então você precisa registrar o filtro no método 'filtros' no arquivo 'app/providers/validation_service_provider.go',
e o filtro podem ser usados como outros:

```go
provedores de pacote

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

função(destinatário *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("adicionar erro de filtros: %+v", err)
  }
}

função(filtros de receptor *ValidationServiceProvider)() []validação. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
