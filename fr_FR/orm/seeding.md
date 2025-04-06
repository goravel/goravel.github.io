# Base de données : Seeding

Goravel inclut la possibilité d'initier votre base de données avec des données utilisant des graines de struct. Toutes les structures de graines sont stockées dans le répertoire
`database/seeders`. Par défaut, une structure `DatabaseSeeder` est définie pour vous.

## Écrire des graines

Pour générer un seeder, exécutez la commande `make:seeder` [Artisan command](../advanced/artisan). Tous les seeders
générés par le framework seront stockés dans le répertoire `database/seeders` :

```shell
allez exécuter . artisan make:seeder UserSeeder
```

Par défaut, un seeder struct a deux méthodes : `Signature` et `Run`. La méthode `Signature` définit le nom du seeder,
tandis que la méthode `Run` est déclenchée lorsque la commande `db:seed` Artisan est exécutée. Vous pouvez utiliser la méthode `Run` pour
insérer des données dans votre base de données comme vous le souhaitez.

Pour illustrer cela, nous pouvons personnaliser la structure `DatabaseSeeder` en ajoutant une instruction d'insertion de base de données à la méthode `Run`.

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Signature Le nom et la signature du seeder.
func (s *DatabaseSeeder) Signature() string {
 return "DatabaseSeeder"
}

// Exécute la logique du seeder.
func (s *DatabaseSeeder) Run() erreur {
 user := modèles. ser{
  Name: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Appel de seeders supplémentaires

Dans la structure `DatabaseSeeder`, vous pouvez utiliser la méthode `Call` pour exécuter des structures de seed supplémentaires. L'utilisation de la méthode `Call`
vous permet de diviser votre base de données en plusieurs fichiers afin qu'aucune structure de seeder unique ne devienne trop
grande. La méthode `Call` accepte un tableau de structures de seeder qui devraient être exécutées :

```go
// Exécute la logique du seeder.
func (s *DatabaseSeeder) Run() erreur {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework fournit également une méthode `CallOnce`, un seeder ne sera exécuté qu'une seule fois dans la commande `db:seed`:

```go
// Exécute la logique du seeder.
func (s *DatabaseSeeder) Run() erreur {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Exécution des Seeders

Vous pouvez exécuter la commande `db:seed` Artisan pour semer votre base de données. Par défaut, la commande `db:seed` exécute le fichier
`database/seeders/database_seeder.go` qui peut à son tour invoquer d'autres classes de graine. Cependant, vous pouvez utiliser l'option
`--seeder` pour spécifier une classe spécifique de seeder à exécuter individuellement :

```shell
allez tourner. artisan db:seed
```

Si vous voulez exécuter d'autres seeders lorsque vous exécutez la commande `db:seed`, vous pouvez enregistrer le seeder dans
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

go run . artisan db:seed --seeder=UserSeeder PhotoSeeder // La signature du seeder
```

Vous pouvez également seigner votre base de données en utilisant la commande `migrate:fresh` et `migrate:refresh` en combinaison avec l'option `--seed`
qui supprimera toutes les tables et réexécutera toutes vos migrations. Cette commande est utile pour recompiler complètement
votre base de données. L'option `--seeder` peut être utilisée pour spécifier un seeder spécifique à exécuter :

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Forcer les seeders à courir en production

Certaines opérations de seeding peuvent vous causer de modifier ou de perdre des données. Afin de vous protéger contre l'exécution des commandes de seeding
contre votre base de données de production, vous serez invité à confirmer avant que les seeders soient exécutés dans l'environnement
`production`. Pour forcer les seeders à s'exécuter sans prompt, utilisez l'option `--force` :

```shell
go run . artisan db:seed --force
```
