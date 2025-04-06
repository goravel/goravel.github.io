# Primeiros passos

Goravel facilita aos desenvolvedores interagir com bancos de dados usando `facades.Orm()`. Atualmente, ele fornece suporte
oficial para os seguintes quatro bancos de dados:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Antes de começar, configure o banco de dados no `.env` e confirme a configuração `default` em `config/database.go`.

# Configuração

Para configurar os bancos de dados, navegue para `config/database.go`. Aqui é onde você pode personalizar todas as conexões do banco de dados e
escolher uma conexão `padrão`. A configuração neste arquivo depende das variáveis de ambiente do projeto e
mostra várias configurações de banco de dados que Goravel suporta.

### DSN

Você também pode usar o DSN para conectar ao banco de dados diretamente, apenas configure o campo `dsn` no arquivo de configuração:

```go
"postgres": mapa[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Conexões de Leitura e Gravação

Às vezes você pode querer usar uma conexão de banco de dados para instruções `SELECT` e outra para instruções `INSERT`, `UPDATE`, e
`DELETE`. O boné dá uma brisa a isso.

Para ver como as conexões de leitura/gravação devem ser configuradas, vamos olhar este exemplo:

```go
import "github.com/goravel/framework/contracts/database"

// config/database.go
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "read": []database.Config{
      {Host: "192.168.1.1", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database.Config{
      {Host: "192.168.1.2", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "host": config.Env("DB_HOST", "127.0.0.1"),
    "port":     config.Env("DB_PORT", 3306),
    "database": config.Env("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config.Env("DB_PASSWORD", ""),
    "charset":  "utf8mb4",
    "loc":      "Local",
  },
}
```

Nós atualizamos a matriz de configuração com duas novas chaves - `read` e `write`. A conexão `ler` usará
`192.168.1.1` como host, enquanto a conexão `write` usará `192.168.1.2`. Ambas as conexões compartilharão o mesmo prefixo
do banco de dados, conjunto de caracteres e outras opções especificadas na matriz principal do mysql. No caso de vários valores no array de configuração
`host`, um host de banco de dados será selecionado aleatoriamente para cada solicitação.

### Conjunto de Conexão

Você pode configurar um pool de conexão no arquivo de configuração, uma configuração razoável dos parâmetros da pool de conexão
pode melhorar muito o desempenho da mesma moeda:

| Chave                                                                            | Acão                                    |
| -------------------------------------------------------------------------------- | --------------------------------------- |
| pool.max_idle_conns    | Máximo de conexões ociosas              |
| pool.max_open_conns    | Máximo de conexões abertas              |
| pool.conn_max_idletime | Tempo máximo de ociosidade das conexões |
| pool.conn_max_lifetime | Vida máxima para conexões               |

### Esquema

Suporte a Postgres e Sqlserver configuração de Esquema. Os Postgres podem definir o Schema diretamente no arquivo de configuração, enquanto o
Sqlserver precisa especificar o Schema através do método `TableName` no modelo.

#### Postgres

```go
"connections": mapa[string]any{
  "postgres": mapa[string]any{
    "driver": "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### Sqlserver

```go
func (r *User) TableName() string {
  return "goravel.users"
}
```

### Obter Informações do Banco de Dados

Você pode usar o comando `db:show` para ver todas as tabelas no banco de dados.

```bash
ir executar . artisan db:show
```

Você também pode usar o comando `db:table` para ver a estrutura de uma tabela específica.

```bash
vá executar . artisan db:table
go run . artisan db:table users
```

## Definição do modelo

Para criar um modelo personalizado, consulte o arquivo de modelo `app/models/user.go` que está incluído no framework. O `struct`
em `app/models/user.go` contém duas frameworks embutidos: `orm.Model` e `orm.SoftDeletes`. Estes frameworks definem
`id`, `created_at`, `updated_at`, e `deleted_at` propriedades respectivamente. Com `orm.SoftDeletes`, você pode habilitar o soft
deletion para o modelo.

### Convenção Modelo

1. O modelo é nomeado com uma grande coruja;
2. Use a forma plural do modelo "nome de serpente" como o nome da tabela;

Por exemplo, o nome do modelo é `UserOrder`, e o nome da tabela é `user_orders`.

### Criar Modelo

Use o comando `make:model` para criar um modelo:

```shell
vá executar . artisan make:model User
go run . artisan make:model user/User
```

Arquivo modelo criado está localizado no arquivo `app/models/user.go`, o conteúdo é o seguinte:

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nome
  String do Avatar
  orm.SoftDeletes
}
```

Se você quiser definir o campo modelo para `qualquer`, você precisa adicionar uma tag adicional: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Detail any `gorm:"type:text"`
  orm.SoftDeletes
}
```

Mais detalhes de uso da tag podem ser encontrados em: <https://gorm.io/docs/models.html>.

### Especificar Nome da Tabela

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Texto
  Texto do Avatar
  orm. oftDeleta
}

função (r *Usuário) TableName() string {
  return "goravel_user"
}
```

### Conexões do Banco de Dados

Por padrão, todos os modelos utilizam a conexão padrão do banco de dados configurada para o seu aplicativo. Se você deseja especificar uma conexão
distinta a ser usada ao interagir com um modelo específico, você precisa definir um método `Conexão` no modelo
.

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Texto
  Texto do Avatar
  orm. oftDeleta
}

função(r *Usuário) Connection() string {
  return "postgres"
}
```

## facades.Orm() funções disponíveis

| Nome: | Acão                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Ligação               | [Especificar conexão do banco de dados](#specify-database-connection)                             |
| BD                    | [Interface Genérica de Banco de Dados sql.DB](#generic-database-interface-sql-db) |
| Requisição            | [Obter instância de banco de dados](#get-database-instance)                                       |
| Transação             | [Transaction](#transaction)                                                                       |
| WithContext           | [Contexto de Injeto](#inject-context)                                                             |

## facades.Orm().Query() funções disponíveis

| Funções                | Acão                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| Começar                | [Começar a transação](#transaction)                                           |
| Comprometa-se          | [Transação de commit](#transaction)                                           |
| Quantidade             | [Count](#count)                                                               |
| Crio                   | [Create](#create)                                                             |
| Cursor                 | [Cursor](#cursor)                                                             |
| excluir                | [Delete](#delete)                                                             |
| Distinto               | [Repetição de filtro](#filter-repetition)                                     |
| Motorista              | [Get Driver](#get-driver)                                                     |
| Sec                    | [Executar atualização nativa SQL](#execute-native-update-sql)                 |
| Existe                 | [Exists](#exists)                                                             |
| Localizar              | [Consultar uma ou várias linhas por ID](#query-one-or-multiple-lines-by-id)   |
| FindOrFail             | [Erro de retorno não encontrado](#not-found-return-error)                     |
| Primeiro               | [Consulta uma linha](#query-one-line)                                         |
| Primeiro ou            | [Consultar ou retornar dados através de callback](#query-one-line)            |
| PrimeirOrCreate        | [Recuperar ou Criando modelos](#retrieving-or-creating-models)                |
| PrimeiroNovo           | [Recuperando ou Novos modelos](#retrieving-or-creating-models)                |
| PrimeiroOrFalhou       | [Erro não encontrado](#not-found-error)                                       |
| Forçar                 | [Forçar exclusão](#delete)                                                    |
| Receber                | [Consulta múltiplas linhas](#query-multiple-lines)                            |
| grupo                  | [Group](#group-by--having)                                                    |
| Ter                    | [Having](#group-by-having)                                                    |
| Juntar-se              | [Join](#join)                                                                 |
| Limitar                | [Limit](#limit)                                                               |
| LockForUpdate          | [Bloqueio de Pês](#pessimistic-locking)                                       |
| Modelo                 | [Especifique um modelo](#specify-table-query)                                 |
| Deslocamento           | [Offset](#offset)                                                             |
| Encomenda              | [Order](#order)                                                               |
| Ordenado               | [Order](#order)                                                               |
| OrderByDesc            | [Order](#order)                                                               |
| Ordem Aleatória        | [Order](#order)                                                               |
| OrOnde                 | [OrWhere](#where)                                                             |
| OrWhereNoin            | [OrWhereNotIn](#where)                                                        |
| OrWhereNull            | [OrWhereNull](#where)                                                         |
| OrWhereIn              | [OrWhereIn](#where)                                                           |
| Paginar                | [Paginate](#paginate)                                                         |
| Talento                | [Consulta única coluna](#query-single-column)                                 |
| RAW                    | [Executar SQL nativo](#execute-native-sql)                                    |
| RESTAURAR              | [Restore](#restore)                                                           |
| Rollback               | [Transação de reversão](#transaction)                                         |
| Guardar                | [Atualizar um modelo existente](#update-a-existing-model)                     |
| Silenciosamente        | [Salvando um único modelo sem eventos](#saving-a-single-model-without-events) |
| Escanear               | [Procurar estrutura](#execute-native-sql)                                     |
| Âmbitos                | [Scopes](#scopes)                                                             |
| Selecionar             | [Especificar Campos](#specify-fields)                                         |
| Compartilhado          | [Bloqueio de Pês](#pessimistic-locking)                                       |
| Sum                    | [Sum](#sum)                                                                   |
| Classificações         | [Especifique uma tabela](#specify-table-query)                                |
| ToSql                  | [Get SQL](#get-sql)                                                           |
| ToRawSql               | [Get SQL](#get-sql)                                                           |
| Atualização            | [Atualizar uma única coluna](#update-a-single-column)                         |
| Criar                  | [Atualizar ou criar](#update-or-create)                                       |
| Onde                   | [Where](#where)                                                               |
| Onde                   | [WhereBetween](#where)                                                        |
| OndeEntre              | [WhereNotBetween](#where)                                                     |
| Onde                   | [WhereNotIn](#where)                                                          |
| Ondemnulo              | [WhereNull](#where)                                                           |
| Onde                   | [WhereIn](#where)                                                             |
| SemSemEventosSemeações | [Eventos de mutação](#muting-events)                                          |
| Descartado             | [Query soft delete data](#query-soft-delete-data)                             |

## Construtor de Consultas

### Injetar Contexto

```go
facades.Orm().WithContext(ctx)
```

### Especificar Conexão do Banco

Se várias conexões de banco de dados forem definidas em `config/database.go`, você pode usá-las através da função `Connection`
de `facades.Orm()`. O nome da conexão passado para `Conexão` deve ser uma das conexões configuradas em
`config/database.go`:

```go
facades.Orm().Conexão("mysql")
```

### Interface de banco de dados genérico sql.DB

Interface genérica do banco de dados sql.DB, em seguida, utilize a funcionalidade que ele fornece:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Fechar
db. format@@0 // lose()

// Retorna estatísticas do banco de dados
db.Stats()

// SetMaxIdleConns define o número máximo de conexões no pool de conexão ociosa
db. etMaxIdleConns(10)

// SetMaxOpenConns define o número máximo de conexões abertas para o banco de dados
db. etMaxOpenConns(100)

// SetConnMaxLifetime define a quantidade máxima de tempo que uma conexão pode ser reutilizada
db.SetConnMaxLifetime(time.Hour)
```

### Obter Instância do Banco de Dados

Antes de cada operação da base de dados específica, é necessário obter uma instância do banco de dados.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Selecionar

#### Consultar uma linha

```go
var models.User
facades.Orm().Query().First(&user)
// SELECT * PARTIR DE `users` ORDER PELO `users`.`id` LIMIT 1;
```

Às vezes você pode querer realizar outra ação se nenhum resultado for encontrado. O método `FirstOr` retornará uma instância de modelo
única ou, se nenhum resultado for encontrado, execute o fechamento dado. Você pode definir valores para o modelo em fechamento:

```go
facades.Orm().Query().Where("nome", "primeiro_usuário").FirstOr(&user, func() erro {
  user.Name = "goravel"

  return nil
})
```

#### Consultar uma ou várias linhas por ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var usuários []models. ser
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Erro de devolução não encontrado

```go
var models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Quando a chave primária da tabela de usuário é o tipo `string`, você precisa especificar a chave primária ao ligar

Método `Localizar`

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECIONE * FROM `users` WHERE `users`.`uuid` = "a";
```

#### Consultar várias linhas

```go
var usuários []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECIONE * PARTIR DE `users` WHERE id em (1,2,3);
```

#### Recuperar ou Criando Modelos

O método `FirstOrCreate` busca um registro de banco de dados usando os pares especificados de coluna / valor. Se o model não puder ser
encontrado no banco de dados, ele cria um novo registro com os atributos de mesclar o primeiro argumento com o segundo argumento
opcional.

Da mesma forma, o método `FirstOrNew` também tenta localizar um registro no banco de dados com base nos atributos dados. No entanto,
se não for encontrada, uma nova instância do modelo é retornada. É importante notar que esse novo modelo ainda não foi
salvo no banco de dados e você precisa chamar manualmente o método `Salvar` para fazer isso.

```go
var modeles de usuário.Usuário
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECIONE * DE `users` WHERE `gender` = 1 E `users`. nome` = 'tom' ORDER PY `users`.`id` LIMIT 1;
// INSERIR INSERIR `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECIONE * DE `users` WHERE `gender` = 1 E `users`.`name` = 'tom' ORDER POR `users`. id` LIMIT 1;
// INSERIR INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

modelos de usuário. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECIONE * DE `users` WHERE `gender` = 1 E `users`. nome` = 'tom' ORDER PY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECIONE * DE `users` WHERE `gender` = 1 E `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Erro Não Encontrado

Quando o item solicitado não é encontrado, o método `Primeiro` não gera um erro. Para gerar um erro, use o método
`FirstOrFail`:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Onde

```go
facades.Orm().Query().Where("nome", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("nome = ?", "tom")
facades.Orm().Query().WhereBetween("", 1, 10)
facades.Orm().Query().WhereNotBetween("idade", 1, 10)
facades.Orm().Query().WhereNotIn("nome", []any{"a"})
facades. rm().Query().WhereNull("nome")
facades.Orm().Query().WhereIn("nome", []any{"a"})

facades.Orm().Query().OrWhere("nome = ?", "tom")
facades.Orm().Query().OrWhereIn("nome", []qual{"a"})
facades.Orm().Query().OrWhereNull("nome")
facades.Orm().Query().OrWhereIn("nome", []any{"a"})
```

### Limitar

```go
var usuários []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECIONE * DE `users` WHERE name = 'tom' LIMIT 3;
```

### Deslocamento

```go
var usuários []models.User
facades.Orm().Query().Where("nome = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECIONE * DE `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Encomenda

```go
var usuários []models.Usuário
facades.Orm().Query().Where("nome = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECIONE * DE `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades. rm().Query().Where("nome = ?", "tom").OrderBy("sort").Get(&users)
// SELECIONE * DE `users` WHERE name = 'tom' ORDER sort asc;

facades.Orm().Query().Where("nome = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECIONE * DE `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECIONE * DE `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). aqui("nome = ?", "tom").InRandomOrder().Get(&users)
// SELECIONE * DE `users` WHERE name = 'tom' ORDER POR RAND();
```

### Paginar

```go
var usuários []models.User
var total int64
facades.Orm().Query(). aginado(1, 10, usuários, &total)
// SELECT count(*) ROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Consultar Coluna Única

```go
var age []int64
facades.Orm().Query().Model(&models.User{}).Pluck("idade", &ages)
// SELECT `idade` FROM `usuários`;
```

### Especificar consulta da tabela

Se quiser consultar alguns dados agregados, você precisará especificar uma tabela específica.

Especificar um modelo

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) DE `users` WHERE deleted_at IS NULL;
```

Especificar uma tabela

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // obtenha todos os registros, sejam excluídos ou não
```

### Get SQL

Obter SQL com placeholder:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * DE "usuários" WHERE "id" = $1 E "users"."deleted_at" É NULL
```

Obter SQL com valor:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * DE "usuários" WHERE "id" = 1 E "usuários"."deleted_at" É NULL
```

Os métodos podem ser chamados depois de `ToSql` e `ToRawSql`: `Contagem`, `Criar`, `Deletar`, `Encontrar`, `Ob`, `Pluck`,
`Salvar`, `Sum`, `Update`.

### Quantidade

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) DE `users` WHERE name = 'tom';
```

### Especificar Campos

`Select` permite que você especifique quais campos você deseja recuperar do banco de dados, por padrão o ORM recupera todos os campos.

```go
facades.Orm().Query().Select("nome", "idade").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Agrupar Por & Ter

```go
type Resultado struct {
  string de nome
  Total int
}

var resultado
facades.Orm().Query().Model(&models.User{}). ele(("nome, soma(idade) no total").Grupo("nome").Having("nome = ?", "tom").Get(&result)
// SELECIONE nome, sum(idade) como total DE `usuários` GRUPO POR nome `nome` CAVING = "tom";
```

### Juntar-se

```go
type Resultado struct {
  Name string
  Email string
}

var resultado
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join emails em emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Crio

```go
usuário := models.User{Name: "tom", Idade, 18}
err := facades.Orm().Query(). reate(&user)
// INSERIR usuários INTO (nome, idade, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00");

// Não ativa eventos do modelo
err := facades. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Trigger eventos de modelo
err := facades. rm().Query().Model(&models.User{}).Create(mapa[string]qual{
  "name": "Goravel",
})
```

### Criação múltipla

```go
Usuários := []models.User{{Nome: "tom", Idade 18}, {Nome: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("usuários"). reate(&[]mapa[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). uery().Model(&models.User{}).Criar(&[]mapa[string]qual{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` e `updated_at` serão preenchidos automaticamente.

### Cursor

Pode ser usado para reduzir significativamente o consumo de memória do seu aplicativo ao iterar através de dezenas de milhares de registros de modelos
Eloquent. Note, o método `Cursor` pode ser usado com `With` ao mesmo tempo, por favor
use [Carregamento Perigoso Eager](./relationships#lazy-eager-loading) para carregar a relação na lógica `for`.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := intervalo cursor {
  var models de usuário. ser
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(usuário)
}
```

### Salvar modelo

#### Atualizar um modelo existente

```go
var modeles de usuário.Usuário
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Atualizar Colunas

```go
facades.Orm().Query().Model(&models.User{}).Onde("nome", "tom").Update("nome", "olá")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

fac.Orm().Query().Model(&models.User{}).Where("nome", "tom").Update(modelos. ser{Name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Wherename", "tom").Update(mapa[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age=18 WHERE `name` = 'tom';
```

> Ao atualizar com `struct`, Orm só atualizará campos que não sejam de zero. Você pode querer usar `map` para atualizar os atributos ou
> use `Select` para especificar campos para atualizar. Note that `struct` can only be `Model`, if you want to update with non
> `Model`, you need to use `.Table("users")`, however, the `updated_at` field cannot be updated automatically at this
> time.

#### Atualizar ou criar

Consulta por `nome`, se não existir, crie por `nome`, `avatar`, se existir, atualize `avatar` com base em `nome`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECIONE * DE `users` WHERE `users`.`name` = 'name' E `users`.`deleted_at` É NULL ORDER POR `users`. id` LIMIT 1;
// INSERIR INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' Usuários WHERE `.`deleted_at` É NULL E `id` = 1;
```

### excluir

Excluindo por modelo, o número de linhas afetadas pela declaração é retornado pelo método:

```go
var modeles de usuário.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE o FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

Exclusão múltipla

```go
facades.Orm().Query().Where("nome = ?", "tom").Delete(&models.User{})
// EXCLUIR DE `users` WHERE name = 'tom';
```

Deseja forçar o apagamento de dados soft-delete.

```go
facades.Orm().Query().Where("nome", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("nome", "tom").ForceDelete()
facades.Orm().Query().Table("usuários").Where("nome", "tom").ForceDelete()
```

Você pode excluir registros com associações de modelo através de `Select`:

```go
// Delete Account of user when deleting user
facades.Orm().Query().Select("Account").Delete(&user)

// Delete Orders and CreditCards of user when deleting user
facades.Orm().Query().Select("Orders", "CreditCards").Delete(&user)

// Delete all child associations of user when deleting user
facades.Orm().Query().Select(orm.Associations).Delete(&user)

// Delete all Account of users when deleting users
facades.Orm().Query().Select("Account").Delete(&users)
```

Nota: As associações serão excluídas somente se a chave primária do registro não estiver vazia, e Orm usa estas chaves
primárias como condições para excluir registros associados:

```go
// Exclua o usuário que nome='goravel', mas não exclui a conta do usuário
facades.Orm().Query().Select("Conta").Where("nome = ?", "goravel"). elete(&models.User{})

// Excluir usuário que nome='goravel' e id = 1, e excluir conta de usuário
facades. rm().Query().Select("Conta").Where("nome = ?", "goravel").Delete(&models.User{ID: 1})

// Exclua usuário que ajuda = 1 e exclui a conta daquele usuário
facades.Orm().Query().Select("Conta").Delete(&models.User{ID: 1})
```

Se o lote de execução excluir sem quaisquer condições, ORM não faz isso e retorna um erro. Então você deve adicionar algumas condições
ou usar SQL nativo.

### Consultar exclusão dos dados

```go
var models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Filtro de Repetição

```go
var usuários []models.User
facades.Orm().Query().Distinct("nome").Localizar(&users)
```

### Obter motorista

```go
driver := facades.Orm().Query().Driver()

// Juiz driver
if driver == orm.DriverMysql {}
```

### Executar SQL nativo

```go
type Resultado struct {
  ID int
  Name string
  Ie int
}

var resultado
facades. rm().Query().Raw("SELECT id, name, idade DE usuários WHERE name = ?", "tom").Scan(&resultado)
```

### Executar SQL de atualização nativa

O número de linhas afetadas pela declaração é devolvido pelo método:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Existe

```go
var existe bool
facades.Orm().Query().Model(&models.User{}).Onde("nome", "tom").Exists(&existe)
```

### RESTAURAR

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transação

Você pode executar uma transação pela função `Transação`.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

return facades.Orm().Transaction(func(tx orm.Query) erro {
  var models.User

  return tx.Find(&user, user.ID)
})
```

Você também pode controlar manualmente o fluxo da transação:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
se err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Âmbitos

Permite que você especifique consultas usadas comumente que podem ser referenciadas quando o método é chamado.

```go
Função Paginadora (string da página, string com limite de string) (método orm.Query). uery {
  return function (query orm.Query) orm.Query {
    page, _ := strconv. toi(página)
    limite, _ := strconv. toi(limite)
    offset := (página - 1) * limite

    consulta de retorno. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator é uma função personalizada: function (ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit).Find(&entries)
```

### Expressões Cruas

Você pode usar o método `db.Raw` para atualizar os campos:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL E `id` = 1;
```

### Travamento Pes├tic

O construtor de consultas também inclui algumas funções para ajudar a alcançar o "bloqueio pessimista" ao executar suas instruções `select`
.

Para executar uma declaração com um "bloqueio compartilhado", você pode chamar o método `SharedLock`. Um bloqueio compartilhado impede que as linhas
selecionadas sejam modificadas até que sua transação seja realizada:

```go
var usuários []models.Usuário
facades.Orm().Query().Where("voes", ">", 100).SharedLock().Get(&users)
```

Como alternativa, você pode usar o método `LockForUpdate`. Uma trava "for update" impede que os registros selecionados sejam
modificados ou selecionados com outro bloqueio compartilhado:

```go
var usuários []models.Usuário
facades.Orm().Query().Where("voes", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
soma int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Eventos

Orm models enviam vários eventos, permitindo que você entre nos seguintes momentos no ciclo de vida de um modelo: `Recuperado`,
`Criar`, `Criado`, `Atualizando`, `Atualizado`, `Salvando`, `Salvar`, `Excluindo`, `Excluindo`, `Excluindo`, `ForçandoDeletando`, `Forçado`,
`Restaurando`, `restaurando`.

O evento `Recuperado` será despachado quando um modelo existente for recuperado do banco de dados. Quando um novo modelo for salvo para
pela primeira vez, os eventos `Criar` e `Criar` serão despachados. Os eventos `Atualização` / `Atualizado` irão despachar quando
um modelo existente for modificado e o método `Salvar` for chamado. Os eventos `Salvar` / `Salvar` irão despachar quando um modelo
for criado ou atualizado - mesmo que os atributos do modelo não tenham sido alterados. Os nomes de eventos que terminam com '-ing' são
enviados antes que qualquer alteração no modelo seja persistida, enquanto eventos que terminam com '-ed' são enviados após as mudanças
no modelo são persistentes.

Para começar a ouvir eventos de modelo, defina um método `DispatchesEvents` no seu modelo. Esta propriedade mapeia vários pontos
do ciclo de vida do modelo para suas próprias classes de eventos.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm. odel
 String de Nome
}

função(u *Usuário) DespachesEvents() map[contractsorm.EventType]func(contractsorm. erro {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreating: func(event contractsorm.Event) erro {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) erro {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. erro {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. erro {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventexcluindo: erro de contrato (evento contractsorm.Event) {
   return nil
  },
  contratos. ventexcluído: função(event contractsorm.Event) erro {
   return nil
  },
  contractsorm.EventForceDeleting: erro (event contractsorm.Event) {
   return nil
  },
  contractsorm. ventForceDeletado: erro (event contractsorm.Event) {
   return nil
  },
  contrato.EventRetrieved: func(event contractsorm.Event) erro {
   return nil
  },
  contratos. ventRestored: func(contrato do evento.Evento) erro {
   return nil
  },
  contrato.EventRestoring: func(erro de contrato do evento.Evento) {
   return nil
  },
 }
}
```

> Nota: Apenas registre os eventos que você precisa. Eventos do modelo não são enviados ao realizar operações em lote através de Orm.

### Observadores

#### Definindo Observadores

Se você está ouvindo muitos eventos em um determinado modelo, você pode usar observadores para agrupar todos os seus ouvintes em uma única classe
. Classes observadoras têm nomes de métodos que refletem os eventos Eloquentes que você deseja ouvir. Cada um desses métodos
recebe o modelo afetado como seu único argumento. The `make:observer` Artisan command is the easiest way to create a
new observer class:

```shell
vá rodar . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

Este comando colocará o novo observador no diretório `app/observers`. Se esta pasta não existir, Artisan
irá criá-la para você. Seu novo observador vai se parecer com o seguinte:

```go
package observers

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Created(event orm. erro {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) error {
 return nil
}

(u *UserObserver) excluído(event orm. erro {
 return nil
}

função(u *UserObserver) forçadoDeletado(event orm.Event) erro {
 return nil
}
```

O modelo de observador só contém alguns eventos, você pode adicionar outros eventos de acordo com suas necessidades.

Para registrar um observador, você precisa chamar o método `Observar` no modelo que você deseja observar. Você pode registrar
observadores no método `Boot` do `app/providers/event_service_provider.go::Boot` provedor de serviços da sua aplicação:

```go
provedores de pacote

importar (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

tipo EventServiceProvider struct {
}

func (receiver *EventServiceProvider) Registrador(app foundation. pplication) {
 facades.Event().Register(receiver. isten())
}

função(receptor *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

função(receptor *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Nota: Se você definir `DispatchesEvents` e `Observer` ao mesmo tempo, somente `DispatchesEvents` serão aplicados.

#### Parâmetro no Observador

O parâmetro `event` será passado para todos os observadores:

| Método        | Acão                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Contexto      | Obtém o contexto passado por `facades.Orm().WithContext()`                                                         |
| Atributo      | Obter o valor modificado, se não modificado, obter o valor original, se não houver valor original, nulo de retorno |
| ObterOriginal | Obtenha o valor original, se não houver valor original, retorne nula                                               |
| Sujo          | Determinar se o campo é modificado                                                                                 |
| IsClean       | Inversa IsDirty                                                                                                    |
| Requisição    | Obtenha uma nova consulta, que pode ser usada por transação                                                        |
| SetAttribute  | Definir um novo valor para um campo                                                                                |

### Eventos de Mutação

Você pode ocasionalmente precisar ativar temporariamente todos os eventos disparados por um modelo. Você pode conseguir isso usando o método
`WithoutEvents`:

```go
var models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Salvando um Modelo Único Sem Eventos

Às vezes você pode querer "salvar" um determinado modelo sem despachar quaisquer eventos. Você pode conseguir isso com o método
`SaveQuietly`:

```go
var modeles de usuário.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
