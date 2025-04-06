# Migrações

When multiple people collaborate to develop applications, it's crucial to have a standardized database structure for
synchronization. Sem isso, poderá haver caos, uma vez que os dados individuais de todos não correspondem. A migração da base de dados é
a solução para este problema. The database structure is version-controlled to ensure its consistency within all
developers.

## Configuração

Os arquivos de migração da base de dados são armazenados no diretório `database/migrations`. Você pode configurar a informação de conexão
banco de dados no arquivo `config/database.go`. Atualmente, existem dois motoristas disponíveis para migrações: migração de idiomas vá em
e migração SQL. No entanto, a migração SQL será removida em versões futuras.

```go
// Drivers disponíveis: "default", "sql"
"migrations": map[string]any{
  "driver": "default",
  // Você pode sobrecarregar o nome da tabela das migrações
  "table": "migrações",
},
```

## Criar Migrações

Use o comando `make:migration` para criar a migração:

```shell
go run . artisan make: migration create_users_table
```

Este comando gerará arquivos de migração no diretório `database/migrations`. Cada arquivo de migração começará com um valor
timestamp, que Goravel usará para determinar a ordem de execução dos arquivos de migração.

### Criar rapidamente

Use `create_users_table` para gerar automaticamente uma tabela contendo a infraestrutura de `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Utilize `add_avatar_to_users_table` para gerar automaticamente uma estrutura para adicionar campos à tabela `users`:

```
_(paranamed@@2,de,em)_(\w+)_table$
_(parta de，de,in)_(\w+)$
```

Se as condições acima não forem correspondidas, a estrutura gerará um arquivo de migração vazio.

## Estrutura de Migração

### Migração de Idioma

A construção da migração contém dois métodos: `Up` and `Down`. O método `Up` é usado para adicionar novas tabelas, colunas, ou
índices ao banco de dados, enquanto o método `Baixo` é usado para desfazer as operações realizadas pelo método `Up`. Nestes
dois métodos, você pode usar `facades.Schema()` para criar e operar tabelas de banco de dados. Para os métodos disponíveis, veja
o [documentation](#tables). A migração a seguir criará uma tabela `users`:

```go
package migrations

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

tipo M20241207095921CreateUsersTable struct {
}

// Assinatura única para a migração.
função (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Execute as migrações.
função (r *M20241207095921CreateUsersTable) erro Up() {
 se !facades. chema().HasTable("usuários") {
  return facades.Schema().Create("usuários", func(esquema de tabela.Blueprint) {
   tabela. D()
   tabela.String("nome").Nullable()
   tabela.String("email").Nullable()
   tabela. imestamps()
  })
 }

 return nil
}

// Baixando o Inverso das migrações.
função(r *M20241207095921CreateUsersTable) erro Down() {
 facades.Schema().DropIfExists("usuários")
}
```

#### Definir Conexão de Migração

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### Migração SQL

O comando de migração gerará dois arquivos de migração: `***.up.sql` e `***.down.sql`, correspondente à execução e
rollback, respectivamente. Você pode escrever instruções SQL diretamente nestes dois arquivos.

```sql
-- ***.up.sql
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***.down.sql
DROP TABLE `users`;
```

## Migrações de registro

Ao usar as migrações de idioma Go você precisa registrar os arquivos de migração no arquivo `database/kernel.go` após os arquivos de migração
serem gerados:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

As migrações SQL não precisam ser registradas, pois o framework irá escanear automaticamente os arquivos SQL no diretório
`database/migrations`.

## Executar Migrações

Para executar todas as suas migrações pendentes, execute o comando `migrate` Artisan:

```shell
ir correr . artisan migrar
```

Se você gostaria de ver quais migrações foram executadas até agora, você pode usar o comando `migrate:status` Artisan:

```shell
ir executar . artista:status
```

## Migrações de Volta Rolante

Para reverter a migração mais recente, use o comando Artisan `rollback`. Este comando retorna o último "lote" de
migrações, que pode incluir vários arquivos de migração:

```shell
vá executar . artista: voltar
```

Você pode reverter um número limitado de migrações, fornecendo a opção `step` para o comando `rollback`. Por exemplo,
o seguinte comando reverterá as últimas cinco migrações:

```shell
ir executar . artisan migrate:rollback --step=5
```

O comando `migrate:reset` reverterá todas as migrações do seu aplicativo:

```shell
vá executar . artista: reset
```

### Rolar de volta e migrar usando um único comando

O comando `migrate:refresh` retornará todas as suas migrações e executará o comando `migrate`. Este comando
efetivamente re-cria todo o seu banco de dados:

```shell
ir executar . artisan migrar:refresh
```

Você pode voltar e migrar novamente um número limitado de migrações, fornecendo a opção `step` para o comando `refresh`.
Por exemplo, o seguinte comando reverterá e migrará novamente as cinco últimas migrações:

```shell
vá executar . artísan migrar:refresh --step=5
```

### Soltar todas as tabelas e migrar

O comando `migrate:fresh` eliminará todas as tabelas do banco de dados e executará o comando `migrate`:

```shell
ir correr . artista:fresca
```

## Tabelas

### Criar tabela

```go
facades.Schema().Criar("usuários", function (table schema.Blueprint) {
  table.ID()
  table.String("nome").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Verifique se a Tabela / Coluna existe

```go
if facades.Schema().HasTable("usuários") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("usuários", []string{"nome", "email"}) {}
if facades.Schema().HasIndex("usuários", "email_unique") {}
```

### Conexão do Banco

```go
facades.Schema().Connection("sqlite").Create("usuários", func(esquema de tabela.Diagrama) {
  table.ID()
})
```

### Atualizar Tabela

```go
facades.Schema().Table("usuários", function (esquema de tabela.Blueprint) {
  table.String("nome").Nullable()
})
```

### Renomear / Soltar a tabela

```go
facades.Schema().Rename("usuários", "novos_usuários")
facades.Schema().Drop("usuários")
facades.Schema().DropIfExists("usuários")

```

## Colunas

### Tipos de coluna disponíveis

|                     |                    |                           |                             |
| ------------------- | ------------------ | ------------------------- | --------------------------- |
| Incrementos         | BigInteger         | Boolean                   | Carro                       |
| Encontro            | Data               | DataTimeTz                | decimal                     |
| Duplo               | [Enum](#enum)      | Flutuante                 | [ID](#id)                   |
| Incrementos         | Inteiro            | Incrementos de Interesses | Json                        |
| Incrementos         | LongText           | MediumIncrementos         | MediumInteger               |
| Texto               | PequenoIncrementos | PequenoInteger            | [SoftDeletes](#softdeletes) |
| Exclusão rápida     | Cordas             | texto                     | Horário                     |
| Tempo               | Timestamp          | Data                      | Tz                          |
| Data                | UnsignedBigInteger | Incrementos               | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger     | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                           |                             |

#### Enum

Crie um campo `Enum` que pode ser armazenado em `Mysql` de acordo com o tipo em `[]any`, mas em bancos de dados `Postgres`, `Sqlite`, e
`Sqlserver`, é um tipo `String`.

```go
table.Enum("dificuldade", []qual{"fácil", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

O método 'ID' é um alias para o método 'BigIncrements'. Por padrão, esse método criará uma coluna 'id'; no entanto,
se você quiser atribuir um nome diferente para a coluna, você pode passar o nome da coluna:

```go
table.ID()
table.ID("user_id")
```

#### Exclusões

O método `SoftDeletes` adiciona uma coluna 'deleted_at' nulável `TIMESTAMP`. Esta coluna destina-se a armazenar o timestamp
`deleted_at` necessário para o recurso de "soft delete":

```go
table.SoftDeletes()
```

#### Coluna personalizada

Se você estiver usando tipos de coluna que o framework ainda não suporta, você pode usar o método `Coluna` para personalizar o tipo de campo
:

```go
table.Column("geometria", "geometria")
```

### Modificadores de coluna

Além dos tipos de coluna listados acima, ao adicionar uma coluna em uma tabela de banco de dados, você também pode adicionar "modificadores" a
a coluna. Por exemplo, para permitir que a coluna seja "nullable", você pode usar o método `Nullable`:

```go
facades.Schema().Table("usuários", function (esquema de tabela.Blueprint) {
  table.String("nome").Nullable()
})
```

A tabela a seguir contém todos os modificadores de coluna disponíveis:

| Modificado                      | Descrição:                                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`              | Define uma coluna inteira como auto incrementação (chave primária)                                                         |
| `.Comentário("meu comentário")` | Adiciona um comentário à coluna (MySQL / PostgreSQL)                                                                       |
| `.Padrão(valor)`                | Define o valor padrão para a coluna                                                                                                           |
| `.Nullable()`                   | Permitir que valores NULL sejam inseridos na coluna                                                                                           |
| `.Unsigned()`                   | Define uma coluna inteira como NÃO SIGNED (somente MySQL)                                                                  |
| `.UseCurrent()`                 | Define uma coluna timestamp para usar CURRENT_TIMESTAMP como o valor padrão                                              |
| `.UseCurrentOnUpdate()`         | Define uma coluna timestamp para usar CURRENT_TIMESTAMP quando o registro é atualizado (apenas MySQL) |

### Descartar Coluna

```go
facades.Schema().Table("usuários", function (table schema.Blueprint) {
  table.DropColumn("nome")
  table.DropColumn("nome", "idade")
})
```

## Índices

### Criar Índice

```go
facades.Schema().Table("users", function (table schema.Blueprint) {
  // Adiciona a tabela
  da chave primária. rimary("id")
  // Adicionar chave primária composta
  table.Primary("id", "name")

  // Adicionar tabela
  exclusiva. nique("nome")
  table.Unique("nome", "idade")

  // Adicionar índice normal
  table.Index("nome")
  tabela. ndex("nome", "idade")

  // Adicione o índice de texto completo
  table.FullText("nome")
  table.FullText("nome", "idade")
})
```

### Renomear Índice

```go
facades.Schema().Table("usuários", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Limpar Índice

```go
facades.Schema().Table("usuários", function (esquema de tabela.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("nome")
  table.DropUniqueByName("nome_único")
  table.DropIndex("nome")
  table.DropIndexByName("name_index")
  table.DropFullText("nome")
  table.DropFullTextByName("name_fulltext")
})
```

### Criar Chave Estrangeira

```go
facades.Schema().Table("posts", function (esquema de tabela.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("usuários")
})
```

### Soltar Chave Estrangeira

```go
facades.Schema().Table("usuários", function (esquema de tabela.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
