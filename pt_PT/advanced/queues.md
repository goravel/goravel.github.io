# Filas

When building your web application, there may be tasks, like parsing and storing an uploaded CSV file, that take too
long to complete during a web request. Felizmente, Goravel oferece uma solução, permitindo que você crie tarefas em fila que
podem ser executadas em segundo plano. Desta forma, movendo tarefas com tempo intensivo para uma fila, seu aplicativo pode responder à web
solicita muito mais rápido e oferecer uma melhor experiência de usuário para seus clientes. Para implementar esse recurso, usamos
`facades.Queue()`.

As opções de configuração de fila de Goravel's são salvas no arquivo de configuração `config/queue.go` do seu aplicativo. Goravel
suporta dois drivers: `redis` and `sync`.

### Conexões vs Filas

Antes de entrar nas filas do Goravel, é importante entender a diferença entre "conexões" e "filas". Em
o arquivo de configuração, `config/queue.go`, você encontrará um array para a configuração `connections`. Esta opção especifica
as conexões para serviços de fila de backend como Redis. No entanto, cada conexão de fila pode ter várias "filas", as quais
podem ser pensadas como diferentes pilhas ou pilhas de trabalhos enfileirados.

É essencial notar que cada exemplo de configuração de conexão no arquivo de configuração da fila inclui um atributo `queue`
. Este atributo é a fila padrão para a qual jobs serão enviados quando eles são enviados para uma dada conexão
. In simpler terms, if you dispatch a job without explicitly defining which queue it should be dispatched to,
the job will be placed in the queue defined in the queue attribute of the connection configuration.

```go
// Este trabalho é enviado para a fila padrão da conexão
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{
  {Type: "int", Value: 1},
}). ispatch()

// Este trabalho é enviado para a fila "emails" de conexão padrão
err := facades.Queue(). ob(&jobs.Test{}, []queue.Arg{
  {Type: "int", Valor: 1},
}).OnQueue("emails").Dispatch()
```

## Criando Tarefas

### Gerando aulas de trabalho

Por padrão, todas as tarefas para sua aplicação são armazenadas no diretório `app/jobs`. Se a pasta `app/Jobs`
não existir, ela será criada quando você executar o comando `make:job` Artisan:

```shell
vá executar . artisan make:job ProcessPodcast
go run . artisan make:job user/ProcessPodcast
```

### Estrutura da Classe

Classes de trabalho são muito simples, consistindo de dois métodos: `Assinatura` e `Handle`. `Assinatura` serve como identificador
distinto, enquanto `Manipular` executa quando a fila processa a tarefa. Além disso, o `[]queue.Arg{}` passado
quando a tarefa é executada será transmitida para `Handle`:

```go
package jobs

type ProcessPodcast struct {
}

// Assinatura O nome e a assinatura da tarefa.
func (receiver *ProcessPodcast) Signature() string {
  return "process_podcast"
}

// Handle Execute o job.
função(destinatário *ProcessPodcast) Handle(args ...qualquer) erro {
  return nil
}
```

### Registrar job

Depois de criar o trabalho, você precisa registrá-lo em `app/provides/queue_service_provider.go`, para que ele possa ser chamado de
corretamente.

```go
func (receptor *QueueServiceProvider) Jobs() []queue.Job {
  return []queue.Job{
    &jobs.Test{},
  }
}
```

## Iniciar servidor da fila

Inicie o servidor de fila em `main.go` no diretório raiz.

```go
pacote

import main (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Isso inicializa o framework e o deixa pronto para uso.
  bootstrap.Boot()

  // Inicia o servidor de fila por fachadas. ueue().
  go func() {
    if err := facades. ueue().Worker().Run(); err != nil {
      facades. og().Errorf("erro de execução da fila: %v", err)
    }
  }()

  selecione {}
}
```

Diferentes parâmetros podem ser passados no método `facades.Queue().Worker`, você pode monitorar várias filas iniciando
várias `facades.Queue().Worker`.

```go
// Sem parâmetros, o padrão escuta a configuração no arquivo `config/queue. o`, e o número de concorrência é 1
go func() {
  if err := facades. ueue().Worker().Run(); err != nil {
    facades. og().Errorf("Erro run da fila do erro: %v", err)
  }
}()

// Monitorar fila de processamento para o link redis, e o número de concorrência é 10
go func() {
  se err := facades. ueue().Worker(fila. rgs{
    Conexão: "redis",
    Queue: "processing",
    atual: 10,
  }). un(); err != nil {
    facades.Log().Errorf("Erro de execução da fila do erro: %v", err)
  }
}()
```

## Despachando tarefas

Depois de escrever a classe de tarefas, você pode enviá-la usando o método `Dispatch` na própria tarefa:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"

  "goravel/app/jobs"
)

tipo UserController struct {
}

func (r *UserController) Show(ctx http. ontext) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}). ispatch()
  se err != nil {
    // faz algo
  }
}
```

### Despacho síncrono

Se você deseja despachar uma tarefa imediatamente (sincronizadamente), você pode usar o método `DispatchSync`. Ao usar este método
, o trabalho não será colocado em fila e será executado imediatamente dentro do processo atual:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/queue"
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"

  "goravel/app/jobs"
)

type UserController struct {
}

func (r *UserController) Show(ctx http.Context) {
  err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).DispatchSync()
  if err != nil {
    // do something
  }
}
```

### Cadeia de emprego

A contratação de tarefas permite especificar uma lista de tarefas agendadas a serem executadas em uma ordem específica. Se qualquer trabalho na sequência
falhar, o restante dos trabalhos não será executado. Para executar uma cadeia de trabalho enfileirada, você pode usar o método `Chain` fornecido por
o `facades.Queue()`:

```go
err := facades.Queue().Chain([]queue.Jobs{
  {
    Job: &jobs.Test{},
    Args: []queue. rg{
      {Type: "int", Valor: 1},
    },
  },
  {
    Trabalho: &jobs est1{},
    Args: []fila. rg{
      {Type: "int", Valor: 2},
    },
  },
}).Dispatch()
```

### Despacho atrasado

Se você gostaria de especificar que uma tarefa não deve ser imediatamente processada por um realizador de fila, você pode usar o método `atraso`
durante a despacho do trabalho. Por exemplo, vamos especificar que um trabalho não deve estar disponível para processamento após 100
segundos de envio:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).Delay(time.Now().Add(100*time.Second).Dispatch()
```

### Personalizando a Fila e a Conexão

#### Despachando para uma fila particular

Fazendo push de tarefas para diferentes filas, você pode "categorizar" seus trabalhos na fila e até mesmo priorizar quantos workers você
atribuir a várias filas.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnQueue("processing").Dispatch()
```

#### Despachando para uma conexão particular

Se o seu aplicativo interage com múltiplas conexões de fila, você pode usar o método `OnConnection` para especificar a conexão
para a qual a tarefa é enviada.

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").Dispatch()
```

Você pode encadear os métodos `OnConnection` e `OnQueue` juntos para especificar a conexão e a fila para um trabalho:

```go
err := facades.Queue().Job(&jobs.Test{}, []queue.Arg{}).OnConnection("sync").OnQueue("processando").Dispatch()
```

## Tipos suportados `queue.Arg.Type`

```go
bool
int
int8
int16
int32
int64
uint
uint8
uint16
uint32
uint64
float32
float64
string
[]bool
[]int
[]int8
[]int16
[]int32
[]int64
[]uint
[]uint8
[]uint16
[]uint32
[]uint64
[]float32
[]float64
[]string
```
