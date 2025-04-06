# Database: Uploaden

Goravel bevat de mogelijkheid om uw database op te sporen met data met behulp van seed struct. Alle seed constructen worden opgeslagen in de
`database/seeders` map. Standaard is een `DatabaseSeeder` constructie voor jou gedefinieerd.

## Schrijven van seeders

Voer de `make:seeder` [Artisan command](../advanced/artisan) uit voor het genereren van een seeder. Alle seeders
gegenereerd door het framework zal worden opgeslagen in de `database/seeders` map:

```shell
uitvoeren . artisan make:seeder UserSeeder
```

Standaard heeft een seeder bouwer twee methoden: `Signature` en `Run`. De `Signature` methode zet de naam van de seeder,
wanneer de `Run` methode wordt geactiveerd wanneer de `db:seed` commando wordt uitgevoerd. Je kunt de 'Run' methode gebruiken om
data in je database in te voegen op elke manier die je wilt.

Om te illustreren kunnen we de `DatabaseSeeder` structuur aanpassen door een database invoegverklaring toe te voegen aan de `Run` methode.

```go
pakket seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Ondertekening de naam en handtekening van de seeder.
func (s *DatabaseSeeder) Signature() string {
 retourneert "DatabaseSeeder"
}

// Run voert de seeder logica uit.
func (s *DatabaseSeeder) Run() fout {
 gebruiker := models. ser{
  Naam: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Aanvullende seeders bellen

Binnen de `DatabaseSeeder` structuur kunt u de `Call` methode gebruiken om extra seed bouwt uit te voeren. Using the `Call`
method allows you to break up your database seeding into multiple files so that no single seeder struct becomes too
large. De `Call` methode accepteert een array van seeder constructies die uitgevoerd zouden moeten worden:

```go
// Voert de seeder logica uit.
func (s *DatabaseSeeder) Run() fout {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework biedt ook een `CallOnce` methode, een seeder zal slechts één keer worden uitgevoerd in het `db:seed` commando:

```go
// Voert de seeder logica uit.
func (s *DatabaseSeeder) Run() fout {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Lopende Seeders

Je kunt het `db:seed` Artisan commando uitvoeren om je database te seeden. Standaard voert het `db:seed` commando het
`database/seeders/database_seeder.go` bestand uit, dat op zijn beurt andere seed classes kan inroepen. U kunt echter de
`--seeder` optie gebruiken om een specifieke seeder klasse te specificeren om deze individueel uit te voeren:

```shell
uitvoeren . artisan db:seed
```

Als u andere seeders wilt uitvoeren tijdens het uitvoeren van het `db:seed` commando, kunt u de seeder registreren in
`app/providers/database_service_provider.go`:

```go
// app/providers/database_service_provider.go
func (ontvanger *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeders. hotoSeeder{},
 })
}

wordt uitgevoerd. artisan db:seed --seeder=UserSeeder PhotoSeeder // De handtekening van seeder
```

U kunt ook uw database seed met behulp van de `migrate:fresh` en `migrate:refresh` commando in combinatie met de `--seed`
optie, die alle tabellen zal laten vallen en al uw migratie opnieuw zal uitvoeren. Deze opdracht is handig voor het volledig opnieuw opbouwen van
je database. De optie `--seeder` kan worden gebruikt om een specifieke seeder op te geven die moet worden uitgevoerd:

```shell
uitvoeren . artisan migreren:fris --seed

ga uitgevoerd . artisan migrate:fresh --seeder=UserSeeder

ga uit. artisan migrate:refresh --seed

wordt uitgevoerd. artisan migrate:refresh --seeder=UserSeeder
```

### Forceer Seeders om te draaien in productie

Sommige seeding operaties kunnen ervoor zorgen dat u gegevens wijzigt of verliest. Om u te beschermen tegen het uitvoeren van seeding commando's
tegen uw productie database, zal u om bevestiging worden gevraagd voordat de seeders worden uitgevoerd in de 'productie' van de
'productie'. Om de seeders te dwingen om te draaien zonder een prompt, gebruik de `--force` markering:

```shell
uitvoeren . artisan db:seed --forceren
```
