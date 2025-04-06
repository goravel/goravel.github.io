# Noțiuni de bază

Funcția de testare a Goravel se bazează pe componenta oficială de test a lui Golang, extinzând testarea unității pentru a sprijini testarea integrării
și a îmbunătăți robustețea aplicației.

## Mediul

### Fişier de mediu personalizat

În mod implicit, fişierul `.env` din directorul rădăcină este folosit pentru a injecta informaţiile de configurare în timpul testării. If you
want to use different `.env` files for different packages, you can create a `.env` file in the package directory, and
the test will read this file first.

```
- /app
- /config
- ...
- /test
  - /feature
    - .env
    - user_test.go
- .env
```

În plus, puteţi crea un fişier `.env.testing` la rădăcina proiectului dumneavoastră. Acest fișier va fi folosit în locul lui
". nv`fișier când rulați`go test`cu opțiunea`--env\`, țineți cont că această opțiune trebuie să urmeze directorul de teste,
de exemplu:

```shell
mergi testul ./... --env=.env.test
mergi testul ./... -e=.env.Test
```

### Structura `TestCase`

Există o structură `TestCase` în Goravel, şi Structura va oferi în viitor nişte metode de testare convenabile, în
plus, există o metodă `init` în acelaşi fişier, această metodă ghidează înregistrarea aplicaţiei Goravel
înainte de a rula testul. Puteți include orice logică necesară în această metodă care trebuie executată înainte de test.

## Crearea de teste

Pentru a crea un caz nou de test, folosiți comanda `make:test` Artisan:

```shell
mergi să rulezi . artizan:test caracteristică/Test Utilizator
```

Testele noastre sunt scrise folosind funcția suită a pachetului [stretchr/testify](https://github.com/stretchr/testify)
în mod implicit. Această funcție ne permite să configurăm pre-test, post-test, sub-test și aserțiune, printre alte lucruri
care rezultă în cazuri de test mai organizate. Pentru informaţii suplimentare, vă rugăm să consultaţi documentaţia oficială.

```go
package feature

import (
  "testing"

  "github.com/stretchr/testify/suite"

  "goravel/tests"
)

type ExampleTestSuite struct {
  suite.Suite
  tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
  suite.Run(t, new(ExampleTestSuite))
}

// SetupTest will run before each test in the suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest will run after each test in the suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  s.True(true)
}
```

## Testarea bazei de date

Modelul Goravel de fabrici și Seederii pot crea cu ușurință înregistrări de testare a bazei de date pentru modelul aplicației.

### Fabrici

Dacă efectuați teste, ar putea fi necesar să adăugați unele înregistrări în baza de date înainte de a rula testul. You
don't have to manually input the values of each column for the test data creation. Cu Goravel, poți seta atributele
implicite pentru modelele tale via [factories](../orm/factories).

```go
var modele de utilizator.Utilizator
err := facades.Orm().Factory().Create(&user)
```

### Seederi care rulează

Dacă doriţi să utilizaţi [seederi de baze de date](../orm/seeding) pentru a popula baza de date în timpul unui test de funcţie, puteţi
invoca metoda `Seed`. În mod implicit, metoda `Seed` va executa `DatabaseSeeder`, care ar trebui să execute toate
celuilalt seeder. Alternativ, puteţi trece un anumit spectator lovit la metoda `Seed`:

```go
opțiunea de import

(
 "testează"

 "github. om/stretchr/testify/suite"

 "goravel/bază de date/seeders"
 "goravel/tests"
)

type ExampleTesteSuite struct {
 suite. Ia
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest va rula înaintea fiecărui test din suită.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest se va executa după fiecare test din suită.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  // Execută DatabaseSeeder. .
 s.Seed()

  // Execută mai multe seedere specifice
 s.Seed(&seeders.UserSeeder{}, &seeders.PhotoSeeder{})
}
```

### Utilizarea Docker

Când utilizați `go test`, mai multe pachete sunt testate în paralel. Drept rezultat, reîmprospătarea bazei de date într-un caz de test
folosind o bază de date locală poate afecta alte cazuri paralele de testare. Pentru a rezolva această problemă, Goravel oferă testare de la Docker
. Cu Docker, o imagine de bază de date poate fi creată și utilizată independent pe diferite pachete.

> Due to the limited support of the Docker image for the windows system, currently, the Docker test can only be run in
> non-windows environments.

#### Inițiază Docker

Puteţi utiliza metoda `Database` pentru a iniţia o imagine a bazei de date bazată pe conexiunea implicită a bazei de date. sau puteți trimite numele conexiunii la baza de date
acestei metode de inițiere a altor imagini din baza de date:

```go
Baza de date, err := facades.Testing().Docker().Database()
baza de date, err := facades.Testing().Docker().Database("postgres")
```

Imaginile bazei de date sunt acceptate în mod implicit:

| Baza de date | Link-ul imaginii                                                                                                                                   | Versiune |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Mysql        | [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)              | ultima   |
| Postgres     | [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)        | ultima   |
| Sqlserver    | [https://hub.docker.com/r/microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server) | ultima   |
| Sqlite       | [https://hub.docker.com/r/nouchka/sqlite3](https://hub.docker.com/r/nouchka/sqlite3)               | ultima   |

De asemenea, poți folosi metoda `Image` pentru a personaliza imaginea:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

database.Image(contractstesting.Image{
  Repository: "mysql",
  Tag:        "5.7",
  Env: []string{
    "MYSQL_ROOT_PASSWORD=123123",
    "MYSQL_DATABASE=goravel",
  },
  ExposedPorts: []string{"3306"},
})
```

#### Construiește imagine

După ce imaginea a fost inițiată, puteți folosi metoda `Build` pentru a construi imaginea:

```go
err := database.Build()
```

At this time, you can use the `docker ps` command to see that the image is already running on the system, and you can
obtain the configuration information of the database through the `Config` method to facilitate connection debugging:

```go
config := database.Config()
```

#### Seederi care rulează

Dacă doriţi să utilizaţi [seeder](../orm/seeding) pentru a popula baza de date în timpul testării, puteţi apela metoda `Seed`.
În mod implicit, metoda `Seed` va executa `DatabaseSeeder`, care ar trebui să execute toate celelalte seedere.
Alternativ, puteţi trece un anumit spectator lovit la metoda `Seed`:

```go
err := database.Seed()
err := database.Seed(&seeders.UserSeeder{})
```

#### Reîmprospătează baza de date

Deoarece cazurile de testare din același pachet sunt executate în mod serios, reîmprospătarea bazei de date după rularea unui singur test caz
nu va avea impact negativ, putem folosi metoda `Fresh`:

```go
err := bază de date.Fresh()
```

De asemenea, puteţi utiliza metoda `RefreshDatabase`:

```go
caracteristica

de import (
 "testing"

 "github.com/stretchr/testify/suite"

 "goravel/tests"
)

tip ExampleTestSuite struct {
 suite. TestCase
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest va rula înaintea fiecărui test din suite.
func (s *ExampleTestSuite) SetupTest() {
  efreshDatabase()
}

// TearDownTest se va executa după fiecare test din suită.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
}
```

#### Dezinstalează imaginea

After the test cases in the sub-package are executed, the image will be uninstalled automatically in one hour, you can
also use the `Shutdown` method to uninstall the image manually.

```go
err := database.Shutdown()
```

#### Exemplu

Putem crea o metodă `TestMain` în subpachet și adăuga pre-logica pentru testul de bază:

```go
// teste/caracteristici/main_test.go
pachet

import (
  "fmt"
  "os"
  "testing"

  "github. om/goravel/framework/facades"

  "goravel/database/seeders"
)

func TestMain(m *testing. ) {
  bază de date, err := facades.Testing().Docker(). atabase()
  dacă ero! nil {
    panic(err)
  }

  dacă err := bază de date. uild(); err != nil {
    panic(eroare)
  }

  if err := bază de date. ed(); mai tare! nil {
    panic(eroare)
  }

  // Execută testul de ieșire
  := m. un()

  // Dezinstalează imaginea după toate testele efectuate
  dacă err := bază de date. lear(); err != nil {
    panic(err)
  }

  os.Exit(exit)
}
```

> Pentru mai multă utilizare a metodei TestPrincipale, a se vedea [Documentația oficială](https://pkg.go.dev/testing#hdr-Main).
