# Registro

Para entender o status da execução do aplicativo, Goravel fornece um poderoso serviço de log que pode gravar mensagens
de registro e erros de sistema em um arquivo ou outro canal em 'facades'. og()\`.

## Configuração

Para configurar vários canais de log, configurações personalizadas podem ser feitas em `config/logging.go`.

`Goravel` usa o canal `stack` para registrar os logs por padrão, `stack` permite que os logs sejam encaminhados para vários canais.

A configuração `print` em `single` e `daily` drivers podem controlar a saída de log para o console.

## Drivers de canal disponíveis

| Nome: | Descrição: |
| --------------------- | -------------------------- |
| `pilha`               | Permitir múltiplos canais  |
| `canto`               | Arquivo de log único       |
| `diário`              | Um arquivo de log por dia  |
| `personalizado`       | Unidade personalizada      |

### Injetar Contexto

```go
facades.Log().WithContext(ctx)
```

## Escrever mensagens de log

```go
facades.Log().Debug(message)
facades.Log().Debugf(mensagem, args)
facades.Log().Info(message)
facades.Log().Infof(mensagem, args)
facades.Log().Warning(message)
facades.Log().Warningf(mensagem, args)
facades. og().Error(message)
facades.Log().Errorf(mensagem, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(mensagem, args)
facades.Log().Panic(message)
facades.Log().Panicf(mensagem, args)
```

### Escreva para um canal específico

Às vezes, você pode querer gravar mensagens em um canal que não seja o canal padrão do aplicativo:

```go
facades.Log().Canal("single").Info(mensagem)
```

Se você quer escrever em vários canais ao mesmo tempo, você pode usar o método `Stack`:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(mensagem)
```

## Métodos de Cadeia

Goravel fornece métodos convenientes de cadeia, que facilitam a inserção de informações mais úteis no log:

```go
facades.Log().User("John").Debug(message)
```

| Método       | Acão                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| Código       | Defina um código ou slug que descreva o log.                                          |
| Sugestão     | Definir uma dica para uma depuração mais rápida.                                      |
| Entrada      | Defina a categoria de funcionalidade ou domínio no qual a entrada do log é relevante. |
| Proprietário | Útil para fins de alerta.                                                             |
| Pedir        | Suprimentos de um http.Request.                                       |
| Resposta     | Fornece uma http.Response.                                            |
| Etiquetas    | Adicione múltiplas tags, descrevendo o recurso que está retornando um erro.           |
| Usuário      | Defina o usuário associado à entrada de log.                                          |
| com          | Adicionar pares chave-valor ao contexto da entrada de log.                            |
| Retirada     | Adicionar informações da pilha à entrada de log.                                      |

## Criar um canal personalizado

Se você quiser definir um canal completamente personalizado, você pode especificar o tipo de driver `custom` no arquivo de configuração `config/logging.go`
.
Em seguida, inclua a opção `via` para implementar uma `framework\contracts\log\Logger`:

```go
// config/logging.go
"custom": mapa[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Motorista da implementação

Implementar a interface `framework\contracts\log\Logger`.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Handle pass channel config path here
  Handle(channel string) (Hook, error)
}
```

arquivos podem ser armazenados na pasta `app/extensions` (modificável). Exemplo:

```go
pacote extensões

importação (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Handle pass channel config path here
func (logger *Logger) Handle(channel string) (log. ook, erro) {
  return &Hook{}, nil
}

type Hook struct {
}

// Nível de monitoramento
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Execução de Fogo ao disparar
func (h *Hook) Fire(log de entradas. erro {
  fmt.Printf("context= level=%v%v time=%v message=%s", entrada. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
