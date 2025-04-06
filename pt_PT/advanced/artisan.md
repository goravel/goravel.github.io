# Artisan Console

Artesão é a ferramenta CLI que vem com Goravel para interagir com a linha de comando. Você pode acessá-lo usando
`facades.Artisan()`. Esta ferramenta tem vários comandos úteis que podem ajudá-lo no desenvolvimento de seu aplicativo.
Utilize o seguinte comando para ver todos os comandos disponíveis.

```shell
ir executar lista de artistas
```

Cada comando também tem um recurso "ajuda" que mostra e explica os argumentos e opções associados ao comando. Para
ver a tela de ajuda, basta adicionar "ajuda" antes do nome do comando.

```shell
vá correr . artisan ajudar a migrar
```

Em vez de repetir `vá executar . comando ...`, talvez você queira adicionar um alias à sua configuração do shell com o comando
terminal abaixo:

```shell
echo -e "\r\nartista alias =\"go run . artisan\"" >>~/.zshrc
```

Então você pode simplesmente executar comandos como este:

```shell
artisan make:controller DemoController
```

Você também pode usar o script shell `artisan` como este:

```shell
./artisan make:controller DemoController
```

### Gerando Comandos

Você pode usar o comando `make:command` para criar um novo comando no diretório `app/console/commands`. Não se preocupe se
esse diretório não existe em seu aplicativo, ele será criado na primeira vez que você executar o comando `make:command`:

```shell
vá executar . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Estrutura do Comando

Depois de gerar seu comando, atribua valores adequados para a assinatura e descrição das propriedades da estrutura. The
`Handle` method will be called when your command is executed. Você precisa implementar sua lógica nesse método.

```go
pacote de comandos

import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

tipo SendEmails struct {
}

// Assinatura O nome e assinatura do comando do console.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Descrição da descrição do comando do console.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Estenda o comando do console extend.
função(recebedor *EnviarEmails) comando Extend(). xtend {
  return command.Extend{}
}

// Handle Execute o comando do console.
função(destinatário *EnviosEmails) erro Handle(ctx console.Context) {
  return nil
}
```

## Comando I/O

### Retrieving Input

Quando você escreve comandos do console, é comum coletar a entrada do usuário através de `arguments` ou `opções`. Com Goravel, é
extremamente fácil recuperar os argumentos e opções que o usuário fornece.

#### Parâmetros

Siga os argumentos após o comando:

```shell
go run . artisan send:emails EMAIL NOME
```

Get arguments:

```go
func (receptor *EnviarEmails) Handle(ctx console.Context) erro {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Opções

Opções, como argumentos, são outra forma de entrada do usuário. As opções são prefixadas por dois hífens (--) quando eles são fornecidas
através da linha de comando.

Definição：

```go
func (receptor *ListCommand) Extend() comando.Extend {
  return command. xtend{
    Bandeiras: []command.Flag{
      &comando. tringFlag{
        Nome: "lang",
        Valor: "default",
        Aliases: []string{"l"},
        Uso: "idioma para a saudação",
      },
    },
  }
}
```

Obter：

```go
função(destinatário *ListCommand) Handle(ctx console.Context) erro {
  lang := ctx.Option("lang")

  return nil
}
```

Uso：

```shell
vá rodar . artisan e-mails --lang Chinês
go run . artisan emails chineses
```

Aviso: Ao usar argumentos e opções, defina as opções antes dos argumentos. Exemplo:

```shell
// Direita
go run . artisan emails --lang=Chinês nome
// Errado
go run . artisan emails name --lang=Chinês nome
```

Exceto `command.StringFlag`, também podemos usar outro tipo `Flag` e `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Solicitando para entrada

#### Fazer perguntas

Além de argumentos e opções, você também pode solicitar entrada ao usuário durante a execução de um comando. O método
`Ask` solicitará ao usuário com a pergunta dada e retornará sua resposta:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  email, err := ctx.Ask("What is your email address?")
  
  return err
}
```

Além disso, você pode passar opções para o método `Ask` como segundo argumento opcional:

```go
func (destinatário *SendEmails) Handle(ctx console.Context) erro {
    name, err := ctx.Ask("Qual é seu nome?", console. skOption{
        Padrão: "Krishan",
    })
    
    return err
}

// Opções
disponíveis do tipo AskOption struct {
    // Padrão o valor padrão para a entrada.
    String Padrão
    // Descrição da descrição de entrada.
    string de descrição
    // Linha o número de linhas para a entrada. use para várias linhas de texto)
    linhas int
    // Limita o limite de caracteres para a entrada.
    Limit int
    // Múltiplos determina se a entrada é uma linha única ou múltiplas linhas de texto
    Múltiplas bool
    // Coloca o placeholder de entrada.
    String Placeholder
    // Prompt a mensagem prompt . usar para entrada de linha única)
    string Prompt
    // Validar a função de validação de entrada. U
    erro de validação de função (string)
}
```

Às vezes você pode precisar ocultar a entrada do usuário, como quando for pedir uma senha. Você pode usar o método `Secret` para
ocultar a entrada do usuário:

```go
func (destinatário *SendEmails) Handle(ctx console.Context) erro {
    password, err := ctx.Secret("Qual é a senha?", console. ecretOption{
        Validado: erro func (s string) {
            if len(s) < 8 {
                erros de retorno. ew("comprimento da senha deve ser pelo menos 8")
            }
            return nil
        },
    })
    
    return err
}

// Opções disponíveis
tipo SecretOption struct {
    // Padrão o valor padrão para a entrada.
    String Padrão
    // Descrição da descrição de entrada.
    String de Descrição
    // Limita o limite de caracteres para a entrada.
    Limit int
    // Coloca o espaço reservado de entrada.
    String placeholder
    // Valide a função de validação de entrada.
    erro de validação de função (string)
}
```

#### Confirmando ações

Se você precisar pedir ao usuário para confirmar uma ação antes de prosseguir, você pode usar o método `Confirmar`. Por padrão, esse
método retornará `false` a menos que o usuário selecione uma opção afirmativa.

```go
if answer _ := ctx.Confirm("Você deseja continuar?"); !answer {
    // ...
}
```

Também é possível passar um segundo argumento para o método `Confirm` para personalizar o valor padrão, rótulo dos botões afirmativos e
negativos:

```go
if answer _ := ctx.Confirm("Deseja continuar?", console. onfirmOption; ! nswer {
 Padrão : true,
 Afirmative : "Sim",
 Negativo : "Não",
}) {
    // . .
}

// Opção de tipo Confirmação
disponível struct {
    // Rótulo afirmativo para o botão afirmativo.
    String Afirmativa
    // Padrão o valor padrão para a entrada.
    bool padrão
    // Descrição da descrição de entrada.
    Texto de Descrição
    // Rótulo negativo para o botão negativo.
    String Negativa
}
```

#### Selecionar Questões Simples

Se você precisar pedir ao usuário para selecionar uma opção de uma lista de opções, você pode usar o método `Choice`. O método `Choice`
retornará o valor da opção selecionada:

```go
pergunta := "Qual é a sua linguagem de programação favorita?"
opções := []console. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleted: true},
}
cor, err := ctx. hoice(pergunta, opções)
```

Além disso, você pode passar opções para o método `Choice` como segundo argumento opcional:

```go
pergunta := "Qual é a sua linguagem de programação favorita?"
opções := []console. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleted: true},
}

cor, err := ctx. hoice(pergunta, opções, console. hoiceOption{
    Padrão: "go",
})

// Opções disponíveis
tipo ChoiceOption struct {
    // Padrão o valor padrão para a entrada.
    String Padrão
    // Descrição da descrição de entrada.
    Description string
    // Valida a função de validação de entrada.
    erro de validação de função (string)
}
```

#### Múltiplas Questões

Se você precisar pedir ao usuário para selecionar várias opções de uma lista de opções, você pode usar o método `MultiSelect`. The
`MultiSelect` method will return the values of the selected options:

```go
Pergunta := "Quais são os seus idiomas de programação favoritos?"
opções := []console. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Value: "C++", Seleted: true},
}
cores, err := ctx. ultiSelect(pergunta, opções)
```

Além disso, você pode passar opções para o método `MultiSelect` como segundo argumento opcional:

```go
question := "What are your favorite programming languages?"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}

colors, err := ctx.MultiSelect(question, options, console.MultiSelectOption{
    Default: []string{"go", "php"},
})

// Available options
type MultiSelectOption struct {
    // Default the default value for the input.
    Default []string
    // Description the input description.
    Description string
    // Filterable determines if the choices can be filtered, type `/` to starting filter.
    Filterable bool
    // Limit the number of choices that can be selected.
    Limit int
    // Validate the input validation function.
    Validate func([]string) error
}
```

### Escrever a saída

Às vezes você pode precisar escrever a saída no console. Goravel fornece vários métodos para ajudá-lo a escrever a saída
no console. Cada um dos métodos tem sua saída colorida apropriada. Por exemplo, `Erro` exibirá o texto
em vermelho.

```go
func (destinatário *EnviarEmails) Handle(ctx console.Context) erro {
  ctx. omment("Esta é uma mensagem de comentário")
  ctx.Info("Esta é uma mensagem informativa")
  ctx. rror("Esta é uma mensagem de erro")
  ctx.Line("Esta é uma mensagem de linha")
  ctx. como("Esta é uma mensagem de aviso")
  return nil
}
```

Você pode usar o método `NewLine` para escrever uma nova linha no console:

```go
// escreve uma linha única em branco
ctx.NewLine()

// escreve múltiplas linhas em branco
ctx.NewLine(2)
```

#### Barras de Progresso

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. Você pode utilizar o método `WithProgressBar` para exibir uma barra de progresso.

```go
Itens := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item qualquer) erro {
    // performTask(item)
    return nil
})
```

Às vezes você pode precisar atualizar a barra de progresso manualmente. Você pode utilizar o método `CreateProgressBar` para atualizar a barra
de progresso:

```go
usuários := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range usuários {
    // processa a barra do usuário
    . dvance()
 
 // dormir por um tempo para simular o processamento 
    tempo. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Girar

Se você precisar mostrar um girar enquanto uma tarefa está em execução, você pode usar o método `Spinner`.

```go
err := ctx.Spinner("Carregando...", console. pinnerOption{
    Action: func() error {
        // quando parar o tempo do spinner
        . leep(2 * tempo.Segundo)
        return nil
    },
})
```

## categoria

Você pode definir um conjunto de comandos para a mesma categoria, conveniente em `ir executar. lista de artesãos`:

```go
// Estenda o comando do console extend.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## Registrar os Comandos

Todos os seus comandos do console precisam ser registrados dentro da função `Comandos` em `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Comandos executados programaticamente

Às vezes você pode querer executar um comando Artisan fora da CLI, você pode usar o método `Call` no
`facades. rtisan()` para operar isso.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinese name") // Com argumentos e opções
})
```
