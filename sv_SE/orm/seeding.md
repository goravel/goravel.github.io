# Databas: sådd

Goravel inkluderar möjligheten att seed din databas med data som använder seed struct. Alla fröstrukturer lagras i katalogen
`database/seeders` . Som standard är en `DatabaseSeeder`-struktur definierad för dig.

## Skriva frön

För att generera en seeder, kör `make:seeder` [Artisan kommandot](../advanced/artisan). Alla seeders
som genereras av ramverket kommer att lagras i katalogen `database/seeders` :

```shell
gå kör. hantverkare make:seeder UserSeeder
```

Som standard har en seeder struct två metoder: `Signatur` och `Run`. `Signatur`-metoden anger namnet på seeder,
medan `Run`-metoden utlöses när `db:seed` Artisan-kommandot körs. Du kan använda `Run`-metoden till
infoga data i din databas på något sätt du föredrar.

För att illustrera, kan vi anpassa `DatabaseSeeder` struct genom att lägga till en databas infoga uttalande till `Run`-metoden.

```go
package seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/frameing/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Signatur Fröns namn och signatur.
func (s *DatabaseSeeder) Signatur() sträng {
 returnera "DatabaseSeeder"
}

// Kör kör seeder logik.
func (s *DatabaseSeeder) Run() fel {
 användare: = modeller. ser{
  Namn: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Ringer ytterligare frön

Inom `DatabaseSeeder` -strukturen kan du använda `Call`-metoden för att köra ytterligare seed structs. Genom att använda `Call`
metoden kan du bryta upp din databas som sådde i flera filer så att ingen enskild seeder struct blir för
stor. `Call`-metoden accepterar en matris av seeder-strukturer som ska köras:

```go
// Kör kör seeder logik.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Samtal ([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework ger också en `CallOnce`-metod, en seeder kommer endast att köras en gång i kommandot `db:seed`:

```go
// Kör kör seeder logik.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Löpande frön

Du kan köra kommandot `db:seed` Artisan för att seed din databas. Som standard kör `db:seed`-kommandot
`database/seeders/database_seeder.go`-filen, som i sin tur kan åberopa andra fröklasser. Du kan dock använda alternativet
`--seeder` för att ange en specifik seeder-klass för att köras individuellt:

```shell
gå kör. hantverkare db:seed
```

Om du vill köra andra seeders när du kör kommandot `db:seed`, kan du registrera seeder i
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

go run . artisan db:seed --seeder=UserSeeder PhotoSeeder // Signaturen av seeder
```

Du kan också seed din databas med kommandot `migrate:fresh` och `migrate:refresh` i kombination med alternativet `--seed`
som kommer att släppa alla tabeller och åter köra alla dina migrationer. Detta kommando är användbart för att helt bygga om
din databas. Alternativet `--seeder` kan användas för att ange en specifik seeder att köra:

```shell
gå kör. hantverkare migrerar: färsk --seed

gå kör. hantverkare migrerar: färsk --seed --seeder=UserSeeder

gå kör. hantverkare migrerar:uppdatera --seed

kör . hantverkare migrerar:uppdatera --seed --seeder=UserSeeder
```

### Tvinga frön att köra i produktion

Vissa sådd operationer kan orsaka att du ändrar eller förlorar data. För att skydda dig från att köra sådd kommandon
mot din produktionsdatabas, du kommer att bli ombedd att få bekräftelse innan frön körs i
`production`-miljön. För att tvinga fröna att köra utan en prompt, använd flaggan `--force`:

```shell
gå kör. hantverkare db:seed --kraft
```
