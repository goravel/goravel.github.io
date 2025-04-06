# Contêiner de serviço

O contêiner de serviço Goravel é uma poderosa ferramenta para gerenciar dependências de classe e executar injeção de dependência. Ele
contém todos os módulos do Goravel, e permite que você vincule seus próprios serviços ao contêiner e os resolva quando necessário.
O contêiner de serviço fornece suporte poderoso para pacotes de terceiros em torno de Goravel.

## Ligação

### Ligações Simples

Quase todos os seus recipientes de serviço serão registrados dentro de [provedores de serviço](./providers).
Dentro de um provedor de serviços, você sempre tem acesso ao contêiner através do parâmetro `app`, em seguida, registre um binding
usando o método `Bind`, passando a `chave` que queremos registrar, juntamente com um fechamento que retorna uma instância da classe
:

```go
package route

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

tipo ServiceProvider struct {
}

func (route *ServiceProvider) Registrador(app foundation. pplication) {
 app.Bind(Iniciando, function (app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

função (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Como mencionado, você normalmente irá interagir com o recipiente nos prestadores de serviços; no entanto, se você quiser que
interaja com o contêiner fora de um provedor de serviços, você pode fazer isso através da fachada 'App':

```go
facades.App().Bind("chave", func(app foundation.Application) (uma, erro) {
    ...
})
```

### Vinculando um Singleton

O método `Singleton` vincula uma classe ou interface ao contêiner que só deve ser resolvida uma vez. Uma vez que uma vinculação
de singleton for resolvida, a mesma instância de objeto será retornada em chamadas subsequentes para o container:

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Instâncias de vínculo

Você também pode vincular uma instância existente de objeto no container usando o método `Instance`. The given instance will
always be returned on subsequent calls into the container:

```go
app.Instance(tecla, instância)
```

### Ligação com parâmetro

Se você precisa de alguns parâmetros extras para construir o provedor de serviços, você pode usar o método `BindWith` para passar
parâmetros para o fechamento:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Resolvendo

### O Método `Make`

Você pode usar o método `Make` para resolver uma instância de classe do contêiner. O método `Make` aceita o `chave` que você
deseja resolver:

```go
exemplo, err := app.Make(key)
```

Se você está fora de um provedor de serviço em um local do seu código que não tem acesso à variável `app`, você
pode usar a fachada `App` para resolver uma instância de classe do container:

```go
instante, err := facades.App().Make(key)
```

### O Método `MakeWith`

Se algumas dependências da sua classe não forem resolvidas através do container, você pode injetá-los passando eles como um array associativo
no método `MakeWith`, correspondente ao método de vinculação `BindWith`:

```go
instância err := app.MakeWith(key, map[string]any{"id": 1})
```

### Outros Métodos

A estrutura fornece alguns métodos convenientes para rapidamente resolver várias facades: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
