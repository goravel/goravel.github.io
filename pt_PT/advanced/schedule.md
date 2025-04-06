# Agendamento de tarefas

No passado, você pode precisar criar uma entrada na configuração cron para cada tarefa que precisava agendar no seu servidor.
No entanto, esta abordagem pode tornar-se rapidamente uma dor, uma vez que a sua agenda de tarefas não está no controlo fonte. e você tem que fazer SSH
no seu servidor para ver ou editar entradas do CRON .

O agendador de comandos de Goravel oferece uma nova abordagem para gerenciar tarefas agendadas no seu servidor. Com o agendador, você
pode definir com facilidade e clareza sua agenda de comando dentro do aplicativo do Goravel. Usando o agendador, você só precisa de
para criar uma única entrada cron no seu servidor.

## Definindo calendários

Para agendar tarefas para sua aplicação, você pode defini-las no método `Agenda` em `app\console\kernel.go`. Vamos
considerar um exemplo para entender melhor. Neste caso, queremos agendar um encerramento que será executado todos os dias à
meia-noite. Dentro deste fechamento, executaremos uma consulta ao banco de dados para limpar uma tabela:

```go
console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github. om/goravel/framework/facades"

  "goravel/app/models"
)

tipo Kernel struct {
}

func (kernel Kernel) Agenda() []schedule. vent {
  return []schedule.Event{
    facades.Schedule().Call(func() {
      facades. rm().Query().Where("1 = 1").Deletar(&models.User{})
    }).Daily(),
  }
}
```

### Agendando comandos artísticos

Além de agendar encerramentos, você também pode agendar [comandos do artista](./artisan). Por exemplo, você pode
usar o método `Command` para agendar um comando Artisan usando o nome ou a classe do comando.

```go
package console

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/schedule"
  "github.com/goravel/framework/facades"
)

type Kernel struct {
}

func (kernel *Kernel) Schedule() []schedule.Event {
  return []schedule.Event{
    facades.Schedule().Command("send:emails name").Daily(),
  }
}
```

### Nível de Registro

Quando o `app.debug` é `true`, o console irá imprimir todos os logs. Caso contrário, apenas logs de nível `erro` serão impressos.

### Opções de Frequência Agendada

Já vimos alguns exemplos de como você pode configurar uma tarefa para ser executada em intervalos específicos. However, there are many
more task schedule frequencies avaibable to assign to tasks:

| 方法                        | 描述                                                       |
| ------------------------- | -------------------------------------------------------- |
| `.Cron("* * * * *")`      | Executar a tarefa em um cronograma do cron personalizado |
| `.EveryMinute()`          | Executar a tarefa a cada minuto                          |
| `.EveryTwoMinutes()`      | Executar a tarefa a cada dois minutos                    |
| `.EveryThreeMinutes()`    | Executar a tarefa a cada três minutos                    |
| `.EveryFourMinutes()`     | Execute a tarefa a cada quatro minutos                   |
| `.EveryFiveMinutes()`     | Execute a tarefa a cada cinco minutos                    |
| `.EveryTenMinutes()`      | Executar a tarefa a cada dez minutos                     |
| `.EveryQuinteenMinutes()` | Execute a tarefa a cada quinze minutos                   |
| `.EveryThirtyMinutes()`   | Execute a tarefa a cada trinta minutos                   |
| `.Hourly()`               | Executar a tarefa a cada hora                            |
| `.HourlyAt(17)`           | Execute a tarefa a cada hora em 17 minutos após a hora   |
| `.EveryTwoHours()`        | Executar a tarefa a cada duas horas                      |
| `.EveryThreeHours()`      | Executar a tarefa a cada três horas                      |
| `.EveryFourHours()`       | Execute a tarefa a cada quatro horas                     |
| `.EverySixHours()`        | Executar a tarefa a cada seis horas                      |
| `.Daily()`                | Execute a tarefa todos os dias à meia-noite              |
| `.DailyAt("13:00")`       | Executar a tarefa todos os dias às 13h00                 |

### Impedir sobreposições de tarefas

Por padrão, as tarefas agendadas continuarão a ser executadas mesmo se uma instância anterior ainda estiver em execução. Para evitar isso, use os
seguintes métodos:

| 方法                       | 描述                                   |
| ------------------------ | ------------------------------------ |
| `.SkipIfStillRunning()`  | Ignorar se ainda estiver em execução |
| `.DelayIfStillRunning()` | Atraso se ainda estiver em execução  |

```go
facades.Agenda().Command("send:emails name").EveryMinute().SkipIfStillRunning()
facades.Agenda().Command("send:emails nome").EveryMinute().DelayIfStillRunning()
```

### Executando Tarefas em Um Servidor

> Para usar este recurso, seu aplicativo deve estar usando o memcached, dynamodb ou o driver de cache redis como o padrão
> driver de cache. Além disso, todos os servidores devem comunicar com o mesmo servidor de cache central.

If your application's scheduler runs on multiple servers, you can ensure that a scheduled job is executed on only one of
them. Por exemplo, digamos que você tem uma tarefa agendada que gera um novo relatório todas as sextas à noite. Se a tarefa
agendador roda em três servidores funcionários, a tarefa agendada será executada nos três servidores e criará o relatório três
vezes. Isto não é ideal!

Para evitar isso, use o método `OnOneServer` ao definir a tarefa agendada, que garantirá que a tarefa rode
em apenas um servidor. O primeiro servidor a receber a tarefa irá garantir uma trava atômica no trabalho. impedindo outros servidores
de executar a mesma tarefa ao mesmo tempo:

```go
facades.Agenda().Command("relatório").Diário().OnOneServer()
```

Agendar encerramentos devem ser atribuídos um nome se eles forem destinados a serem executados em um servidor:

```go
facades.Agenda().Call(func() {
  fmt.Println("goravel")
}).Daily().OnOneServer().Name("goravel")
```

## Executando o Agendador

Agora que aprendemos a definir tarefas agendadas, vamos discutir como executá-las de fato em nosso servidor.

Adicione `go facades.Schedule().Run()` ao arquivo raiz `main.go`.

```go
pacote

import main (
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Isso inicializa o framework e o deixa pronto para uso.
  bootstrap.Boot()

  // Comece a agendar por facades.Schedule
  go facades.Schedule().Run()

  selecione {}
}
```

## Parando o Agendador

Você pode chamar o método `Desligar` para encerrar graciosamente o agendamento. Este método esperará que todas as tarefas
sejam concluídas antes de encerrar.

```go
// main.go
bootstrap.Boot()

// Cria um canal para ouvir sinais
sair := make(chan os.Signal)
sinal. otify(sair, syscall.SIGINT, syscall.SIGTERM)

// Iniciar agendamento por facades.Schedule
go facades.Agenda(). un()

// Ouça o sinal do SO
go func() {
  <-sair
  se err := facades. chedule().Shutdown(); err != nil {
    facades. og().Errorf("Agendar erro de encerramento: %v", err)
  }

  os.Exit(0)
}()

selecione {}
```
