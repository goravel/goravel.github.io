# Fábricas

Ao testar seu aplicativo ou semeando seu banco de dados, pode ser necessário inserir alguns registros no seu banco de dados
previamente. Em vez de inserir manualmente valores para cada coluna, Goravel permite que você defina um conjunto de atributos
padrão para cada um dos seus modelos criando fábricas de modelos.

Para ver um exemplo de como escrever uma fábrica, você pode conferir o arquivo `user_factory.go` localizado no diretório
da sua aplicação `database/factories`.

```go
package factories

type UserFactory struct {
}

// Definition Define the model's default state.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

Como você pode ver, em sua forma mais básica, as fábricas são construções que têm um método `Definição`. O método retorna o conjunto padrão
de valores de atributo que devem ser usados ao criar um modelo com a fábrica. Para gerar um intervalo de
dados aleatórios, você pode depender de [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Gerando Fábricas

Para criar uma fábrica, execute o comando `make:factory` do Artisan:

```
vá rodar . artesãos fez:fábrica PostFábrica
```

O novo diretório `struct` de fábrica será colocado no seu diretório `database/factories`.

### Convenções de Model & Fábrica de Descobertas

Depois de definir uma fábrica, você pode usar o método `Factory()` no modelo para vincular a fábrica ao modelo:

```go
package models

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/factories"
) O tipo

User struct {
  orm. odel
  Texto
  Texto do Avatar
  orm. oftDeleta
}

função(u *Usuário) Factory() fatory.Factory {
  retornou &factories.UserFactory{}
}
```

## Criando Modelos Usando Fábricas

### Instanciando Modelos

Nós podemos usar o método `Make` para criar modelos sem persistir no banco de dados:

```go
var models.User
err := facades.Orm().Factory().Make(&user)
```

Você pode criar uma coleção de muitos modelos usando o método `Count`:

```go
var usuários []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Se você gostaria de substituir alguns dos valores padrão de seus modelos, você pode passar `map[string]any` para o método `Make`
. Apenas os atributos especificados serão substituídos enquanto o resto dos atributos permanecem definidos para seus valores
padrão conforme especificado pela fábrica:

```go
var modeles de usuário.Usuário
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Modelos persistentes

O método `Create` cria e salva instâncias model no banco de dados usando o método `Save` do Orm.

```go
var modeles de usuário.Usuário
err := facades.Orm().Factory().Criar(&user)

var usuários []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Você pode sobrescrever os atributos de modelo padrão da fábrica passando `map[string]qualquer` dos atributos para o método `Create`
:

```go
var models.User
err := facades.Orm().Factory().Criar(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Ignorar Evento Modelo

Pode haver [evento modelo](../orm/quickstart#events) definido no modelo, você pode ignorar os eventos com o método
`CreateQuietly`:

```go
var modeles de usuário.Usuário
err := facades.Orm().Factory().CreateQuietly(&user)
```
