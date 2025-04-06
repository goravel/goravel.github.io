# Baza de date: Seeding

Goravel include capacitatea de a semăna baza ta de date cu ajutorul seed-ului. Toate şirurile secrete sunt stocate în folderul
`bază de date/seeders`. În mod implicit, este definit pentru dvs. un `DatabaseSeeder`.

## Scrierea de Seederi

Pentru a genera un seeder, rulați `make:seeder` [comanda Artizan](../advanced/artisan). Toți seederii
generați de cadru vor fi stocați în directorul `bază de date/seeders`:

```shell
mergi să rulezi . artizan:seeder UserSeeder
```

În mod implicit, un spectator lovit are două metode: `Signature` și `Run`. Metoda `Signature` stabileşte numele seederului,
în timp ce metoda `Run` este declanşată atunci când comanda Artizană `db:seed` este executată. Puteţi utiliza metoda `Run` pentru a
insera date în baza ta de date în orice mod preferaţi.

Pentru a ilustra, putem personaliza `DatabaseSeeder` şters prin adăugarea unei declaraţii de inserare a bazei de date la metoda `Run`.

```go
pachetele seeders

import (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

type DatabaseSeeder struct {
}

// Semnează numele şi semnătura seederului. Şirul de caractere
func (s *DatabaseSeeder) {
 return "DatabaseSeeder"
}

// Rulează executarea logicii pentru spectatori.
func (s *DatabaseSeeder) Run() error {
 user := modele. Ser{
  Nume: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Apelare Seederi Adiționali

În interiorul `DatabaseSeeder`, puteţi folosi metoda `Call` pentru a executa şubrezile de seminţe suplimentare. Folosind metoda `Call`
îți permite să împarți baza de date seeding-ul în mai multe fișiere, astfel încât nici un singur spectator lovit să nu fie prea
mare. Metoda `Apelează` acceptă o serie de şovăieli care ar trebui executate:

```go
// Execută execută destinatarul logic.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Cadrul oferă, de asemenea, o metodă `CallOnce`, un căutător va fi executat o singură dată în comanda `db:seed`:

```go
// Execută execută un obiect logic.
func (s *DatabaseSeeder) Run() error {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Seederi care rulează

Poți rula comanda `db:seed` Artizan pentru a seed baza ta de date. În mod implicit, comanda `db:seed` execută fișierul
`database/seeders/database_seeder.go`, care poate invoca alte clase de seeder. Cu toate acestea, puteți folosi opțiunea
`--seeder` pentru a specifica o anumită clasă de spectatori pentru a rula individual:

```shell
mergi să alergi . artizan db:seed
```

Dacă doriți să executați alți seederi atunci când rulați comanda `db:seed`, puteți înregistra observatorul în
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

mergi să rulezi . artizan db:seed --seeder=UserSeeder PhotoSeeder // Semnătura spectatorului
```

De asemenea, puteți secreta baza de date folosind comanda `migrate:fresh` și `migrate:refresh` în combinație cu opțiunea `--seed`
care va arunca toate mesele și va re-rula toate migrațiile. Această comandă este utilă pentru a reconstrui complet
baza ta de date. Opţiunea "--seeder" poate fi folosită pentru a specifica un anumit solicitant care să ruleze:

```shell
mergi să rulezi . artizan migrate:fresh --seed

mergi să rulezi . artizan migrate:fresh --seed --seeder=UserSeeder

mergi să rulezi . migrare artizan:refresh --seed

mergi să rulezi . artizan migrate:refresh --seed --seeder=UserSeeder
```

### Forțarea Seederilor pentru a rula în producție

Unele operații de însămânțare pot duce la modificarea sau pierderea datelor. Pentru a te proteja de rularea comenzilor de seeding
împotriva producției bazei de date, vi se va solicita confirmarea înainte ca seederii să fie executați în mediul `production`
. Pentru a forţa seederii să ruleze fără o promptitudine, folosiţi steagul `--force`:

```shell
mergi să rulezi . artizan db:seed --force
```
