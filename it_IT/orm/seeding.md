# Database: Seeding

Goravel include la possibilità di seminare il database con i dati utilizzando la struttura del seme. Tutte le strutture dei semi sono memorizzate nella directory `database/seeders`
. Per impostazione predefinita, una struttura `DatabaseSeeder` è definita per te.

## Scrittura Seeders

Per generare un seeder, esegui il `make:seeder` [Comando Artigiano](../advanced/artisan). Tutti i semi
generati dal framework saranno memorizzati nella directory `database/seeders`:

```shell
go run . artisan make:seeder UserSeeder
```

Per impostazione predefinita, una struttura seeder ha due metodi: `Signature` e `Run`. Il metodo `Signature` imposta il nome del seeder,
mentre il metodo `Run` viene attivato quando viene eseguito il comando `db:seed`. Puoi usare il metodo `Run` per
inserire i dati nel tuo database in qualsiasi modo preferisci.

Per illustrare, possiamo personalizzare la struttura `DatabaseSeeder` aggiungendo un'istruzione di inserimento del database al metodo `Run`.

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Firma Il nome e la firma del seme.
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Esegui esegue la logica seeder.
func (s *DatabaseSeeder) Run() error {
 user := models. ser{
  Nome: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Chiamate Seeders Aggiuntivi

All'interno della struttura `DatabaseSeeder`, puoi usare il metodo `Call` per eseguire ulteriori seed structs. Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. Il metodo `Call` accetta un array di strutture di ricerca che dovrebbero essere eseguite:

```go
// Esegui esegue la logica seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework fornisce anche un metodo `CallOnce`, un cercatore verrà eseguito solo una volta nel comando `db:seed`:

```go
// Esegui esegue la logica seeder.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Seeders In Esecuzione

Puoi eseguire il comando `db:seed` Artigiano per seminare il tuo database. By default, the `db:seed` command runs the
`database/seeders/database_seeder.go` file, which may in turn invoke other seed classes. Tuttavia, è possibile utilizzare l'opzione `--seeder`
per specificare una classe di ricerca specifica da eseguire singolarmente:

```shell
go run . artisan db:seed
```

Se si desidera eseguire altri seme quando si esegue il comando `db:seed`, è possibile registrare il seeder in
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

go run . artisan db:seed --seeder=UserSeeder PhotoSeeder // La firma del seeder
```

Puoi anche seminare il tuo database usando il comando `migrate:fresh` e `migrate:refresh` in combinazione con l'opzione `--seed`
, che farà cadere tutte le tabelle e rieseguire tutte le vostre migrazioni. Questo comando è utile per ricostruire completamente
il tuo database. L'opzione `--seeder` può essere usata per specificare un cercatore specifico da eseguire:

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Forzare I Seeders A Correre In Produzione

Alcune operazioni di semina possono causare alterazioni o perdita di dati. Per proteggerti dall'esecuzione dei comandi di seeding
contro il tuo database di produzione, ti verrà richiesta conferma prima che i semenzisti vengano eseguiti nell'ambiente `production`
. Per forzare il seme a funzionare senza un prompt, usa il flag `--force`:

```shell
go run . artisan db:seed --force
```
