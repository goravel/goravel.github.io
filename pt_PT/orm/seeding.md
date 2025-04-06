# Banco de dados: Semeando

Goravel inclui a capacidade de semear seu banco de dados com dados usando a estrutura de sementes. Todas as instruções de semente são armazenadas no diretório
`database/seeders`. Por padrão, uma struct `DatabaseSeeder` é definida para você.

## Escrita Sementes

Para gerar uma sementeira, execute o `make:seeder` [comando Artisan](../advanced/artisan). Todos os seeders
gerados pela estrutura serão armazenados no diretório `database/seeders`:

```shell
vá executar . artisan make:seeder UserSeeder
```

Por padrão, uma construção do busder tem dois métodos: `Assinatura` e `Executar`. O método `Signature` define o nome do Seeder,
enquanto o método `Run` é acionado quando o comando `db:seed` do Artisan é executado. Você pode usar o método `Executar` para
inserir dados no seu banco de dados de qualquer forma que você preferir.

Para ilustrar nós podemos personalizar a instrução `DatabaseSeeder`, adicionando uma instrução de inserção do banco de dados ao método `Run`.

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Assinatura do nome e assinatura do sedeador.
função(s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Executar executa a lógica do busder.
func (s *DatabaseSeeder) Run() erro {
 user := models. ser{
  Nome: "goravel",
 }
 facades.Orm().Query().Create(&user)
}
```

## Chamando Sementes Adicionais

Dentro da estrutura `DatabaseSeeder`, você pode usar o método `Call` para executar estruturas de semente adicionais. Usar o método `Call`
permite que você separe seu banco de dados em vários arquivos para que nenhuma construção do busder fique muito
grande. O método `Call` aceita um array of seeder structs que devem ser executados:

```go
// Executar a lógica do seeder.
func (s *DatabaseSeeder) Run() erro {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework também fornece um método `CallOnce`, um busder será executado somente uma vez no comando `db:seed`:

```go
// Executar a lógica do seeder.
func (s *DatabaseSeeder) Run() erro {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Sementes em execução

Você pode executar o comando `db:seed` Artisan para semear seu banco de dados. Por padrão, o comando `db:seed` executa o arquivo
`database/seeders/database_seeder.go`, que pode por sua vez invocar outras classes de sementes. No entanto, você pode usar a opção
`--seeder` para especificar uma classe inferior para executar individualmente:

```shell
vá executar . artisan db:seed
```

Se você quiser executar outros seeders ao executar o comando `db:seed`, você pode registrar o busder em
`app/providers/database_service_provider.go`:

```go
// app/providers/database_service_provider.go
func (receiver *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders. hotoSeeder{},
 })
}

vá executar . artisan db:seed --seeder=UserSeeder PhotoSeeder // A assinatura do busder
```

Você também pode semear o banco de dados usando o comando `migrate:fresh` e `migrate:refresh` em combinação com a opção `--seed`
, o que eliminará todas as tabelas e voltará a rodar todas as suas migrações. Este comando é útil para reconstruir completamente
seu banco de dados. A opção `--seeder` pode ser usada para especificar um buscador específico para executar:

```shell
vá rodar . artisan migrate:fresco --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

vai executar . emigrate do artista:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Forçando Semeadores Para Executar Em Produção

Algumas operações de semeamento podem fazer com que você altere ou perca dados. In order to protect you from running seeding commands
against your production database, you will be prompted for confirmation before the seeders are executed in the
`production` environment. Para forçar os semeadores a executarem sem um prompt, use a bandeira `--force`:

```shell
vá executar . artisan db:seed --force
```
