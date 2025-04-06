# Commencer

The testing function of Goravel relies on Golang's official test component, extending unit testing to support
integration testing and improve application robustness.

## Environnement

### Fichier d'environnement personnalisé

Par défaut, le fichier `.env` du répertoire racine est utilisé pour injecter des informations de configuration pendant les tests. Si vous
voulez utiliser différents fichiers `.env` pour différents paquets, vous pouvez créer un `. nv` dans le dossier du paquet, et
le test lira ce fichier en premier.

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

En outre, vous pouvez créer un fichier `.env.testing` à la racine de votre projet. Ce fichier sera utilisé à la place de
`. fichier nv` lorsque vous exécutez `go test` avec l'option `--env`, notez que cette option doit suivre le répertoire de test,
par exemple:

```shell
go test ./... --env=.env.testing
go test ./... -e=.env.testing
```

### Structure `TestCase`

There is a `TestCase` Struct in Goravel, and the Struct will provide some convenient test methods in the future, in
addition, there is an `init` method in the same file, this method guides the registration of the Goravel application
before running the test. Vous pouvez inclure toute logique nécessaire dans cette méthode qui doit être exécutée avant le test.

## Création de tests

Pour créer un nouveau cas de test, utilisez la commande `make:test` Artisan:

```shell
exécutez . artisan make:test feature/UserTest
```

Nos cas de tests sont écrits par défaut en utilisant la fonction de suite du paquet [stretchr/testify](https://github.com/stretchr/testify)
. Cette fonction nous permet de configurer le pré-test, le post-test, le sous-test et l'assertion, entre autres choses
, ce qui donne lieu à des cas de test plus organisés. Pour plus d'informations, veuillez vous référer à la documentation officielle.

```go
fonctionnalité de paquet

import (
  "testing"

  "github. om/stretchr/testify/suite"

  "goravel/tests"
)

type ExemppleTestSuite struct {
  suite. uite
  tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
  suite. un(t, new(ExampleTestSuite))
}

// SetupTest s'exécutera avant chaque test de la suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest s'exécutera après chaque test de la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  s.True(true)
}
```

## Test de la base de données

Les usines de modèles Goravel et les Seeders peuvent facilement créer des enregistrements de base de données de test pour le modèle de l'application.

### Usines

Si vous effectuez des tests, il peut être nécessaire d'ajouter des enregistrements à votre base de données avant d'exécuter le test. Vous
n'avez pas à entrer manuellement les valeurs de chaque colonne pour la création des données de test. Avec Goravel, vous pouvez définir des attributs
par défaut pour vos modèles via [factories](../orm/factories).

```go
var models.User
err := facades.Orm().Factory().Create(&user)
```

### Exécution des Seeders

Si vous souhaitez utiliser [les seeders de base de données](../orm/seeding) pour remplir votre base de données lors d'un test de fonctionnalité, vous pouvez
appeler la méthode `Seed`. By default, the `Seed` method will execute the `DatabaseSeeder`, which should execute all of
your other seeders. Alternativement, vous pouvez passer un seeder spécifique struct à la méthode `Seed`:

```go
fonctionnalité de paquet

import (
 "testing"

 "github. om/stretchr/testify/suite"

 "goravel/database/seeders"
 "goravel/tests"
)

type ExemppleTestSuite struct {
 suite. uite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest s'exécutera avant chaque test de la suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest s'exécutera après chaque test de la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  // Exécuter le DatabaseSeeder. .
 s.Seed()

  // Exécute plusieurs seeders...
 s.Seed(&seeders.UserSeeder{}, &seeders.PhotoSeeder{})
}
```

### Utiliser Docker

Lorsque vous utilisez `go test`, plusieurs paquets sont testés en parallèle. Par conséquent, actualiser la base de données dans un cas de test
en utilisant une base de données locale peut potentiellement affecter d'autres cas de tests parallèles. Pour résoudre ce problème, Goravel propose des tests
basés sur Docker. Avec Docker, une image de base de données peut être créée et utilisée indépendamment entre différents paquets.

> Due to the limited support of the Docker image for the windows system, currently, the Docker test can only be run in
> non-windows environments.

#### Lancer Docker

Vous pouvez utiliser la méthode `Database` pour initier une image de base de données basée sur la connexion par défaut de la base de données. ou vous pouvez passer
le nom de la connexion à la base de données à cette méthode pour initier d'autres images de base de données :

```go
database, err := facades.Testing().Docker().Database()
database, err := facades.Testing().Docker().Database("postgres")
```

Les images de la base de données supportées par défaut:

| Base de données | Lien de l'image                                                                                                                                    | Version |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Mysql           | [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)              | Dernier |
| Postgres        | [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)        | Dernier |
| Sqlserver       | [https://hub.docker.com/r/microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server) | Dernier |
| Sqlite          | [https://hub.docker.com/r/nouchka/sqlite3](https://hub.docker.com/r/nouchka/sqlite3)               | Dernier |

Vous pouvez également utiliser la méthode `Image` pour personnaliser l'image:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

database.Image(contractstesting.Image{
  Repository: "mysql",
  Tag: "5.7",
  Env: []string{
    "MYSQL_ROOT_PASSWORD=123123",
    "MYSQL_DATABASE=goravel",
  },
  ExposedPorts: []string{"3306"},

```

#### Créer une image

Une fois l'image lancée, vous pouvez utiliser la méthode `Build` pour construire l'image:

```go
err := database.Build()
```

Pour le moment, vous pouvez utiliser la commande `docker ps` pour voir que l'image est déjà en cours d'exécution sur le système, et vous pouvez
obtenir les informations de configuration de la base de données grâce à la méthode `Config` pour faciliter le débogage de la connexion:

```go
config := database.Config()
```

#### Exécution des Seeders

Si vous souhaitez utiliser [seeder](../orm/seeding) pour remplir la base de données pendant les tests, vous pouvez appeler la méthode `Seed`.
Par défaut, la méthode `Seed` exécutera le `DatabaseSeeder`, qui devrait exécuter tous vos autres seeders.
Alternativement, vous pouvez passer un seeder spécifique struct à la méthode `Seed`:

```go
err := database.Seed()
err := database.Seed(&seeders.UserSeeder{})
```

#### Rafraîchir la base de données

Parce que les cas de test dans le même paquet sont exécutés en série, rafraîchir la base de données après un seul cas de test exécuté
n'aura aucun impact négatif, nous pouvons utiliser la méthode `Fresh` :

```go
err := database.Fresh()
```

Vous pouvez également utiliser la méthode `Rafraîchir Database`:

```go
fonctionnalité de package

import (
 "testing"

 "github.com/stretchr/testify/suite"

 "goravel/tests"
)

type ExemppleTestSuite struct {
 suite. uite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest s'exécutera avant chaque test de la suite.
func (s *ExampleTestSuite) SetupTest() {
  s. efreshDatabase()
}

// TearDownTest s'exécutera après chaque test de la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
}
```

#### Désinstaller l'image

Après l'exécution des tests dans le sous-paquet, l'image sera automatiquement désinstallée dans une heure, vous pouvez
également utiliser la méthode `Shutdown` pour désinstaller l'image manuellement.

```go
err := database.Shutdown()
```

#### Exemple

Nous pouvons créer une méthode `TestMain` dans le sous-paquet et ajouter la pré-logique du cas de test :

```go
// tests/feature/main_test.go
package feature

import (
  "fmt"
  "os"
  "testing"

  "github. om/goravel/framework/facades"

  "goravel/database/seeders"
)

func TestMain(m *testing. ) {
  base de données, err := facades.Testing().Docker(). atabase()
  si erreur ! nil {
    panique
  }

  if err := database. uild(); err != nil {
    panique(err)
  }

  if err := database. eed(); erreur! nil {
    panique(err)
  }

  // Exécute des cas de test
  exit := m. un()

  // Désinstaller l'image après que tous les cas de test aient été exécutés
  si err := base de données. lear(); err != nil {
    panique(err)
  }

  os.Exit(exit)
}
```

> Pour plus d'utilisation de la méthode TestMain, voir [Documentation officielle](https://pkg.go.dev/testing#hdr-Main).
