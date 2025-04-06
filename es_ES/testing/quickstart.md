# Comenzando

The testing function of Goravel relies on Golang's official test component, extending unit testing to support
integration testing and improve application robustness.

## Entorno

### Archivo de entorno personalizado

Por defecto, el archivo `.env` en el directorio raíz se utiliza para inyectar información de configuración durante la prueba. If you
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

Además, puedes crear un archivo `.env.testing` en la raíz de tu proyecto. Este archivo se utilizará en lugar de la
`. archivo nv` al ejecutar `go test` con la opción `--env`, ten en cuenta que esta opción necesita seguir el directorio de pruebas,
por ejemplo:

```shell
ir a prueba ./... --env=.env.testing
ir prueba ./... -e=.env.testing
```

### Estructura de `TestCase`

Hay una estructura de `TestCase` en Goravel, y la estructura proporcionará algunos métodos de prueba convenientes en el futuro, en
, hay un método `init` en el mismo archivo, este método guía el registro de la aplicación Goravel
antes de ejecutar la prueba. Puede incluir cualquier lógica necesaria en este método que necesita ser ejecutado antes de la prueba.

## Creando pruebas

Para crear un nuevo caso de prueba, usa el comando Artisan 'make:test':

```shell
go run . artisan make:test feature/UserTest
```

Nuestros casos de prueba están escritos usando la función suite del paquete [stretchr/testify](https://github.com/stretchr/testify)
por defecto. Esta función nos permite configurar pre-test, post-test, sub-test, y aserción, entre otras cosas,
, lo que resulta en casos de prueba más organizados. Para más información, consulte la documentación oficial.

```go
función de paquete

importar (
  "testing"

  "github. om/stretchr/testify/suite"

  "goravel/tests"
)

type ExampleTestSuite struct {
  suite. uite
  tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
  suite. un(t, new(ExampleTestSuite))
}

// SetupTest se ejecutará antes de cada prueba en la suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest se ejecutará después de cada prueba en la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  s.True(true)
}
```

## Prueba de base de datos

Las fábricas de modelos y Seeders de Goravel pueden crear fácilmente registros de base de datos de pruebas para el modelo de la aplicación.

### Fábricas

Si está realizando pruebas, puede ser necesario agregar algunos registros a su base de datos antes de ejecutar la prueba. Usted
no tiene que introducir manualmente los valores de cada columna para la creación de datos de prueba. Con Goravel, puede establecer atributos
predeterminados para sus modelos a través de [factories](../orm/factories).

```go
var user models.User
err := facades.Orm().Factory().Create(&user)
```

### Seeders en ejecución

If you would like to use [database seeders](../orm/seeding) to populate your database during a feature test, you may
invoke the `Seed` method. Por defecto, el método `Seed` ejecutará el `DatabaseSeeder`, el cual debe ejecutar todos los
tus otras seeders. Alternativamente, puedes pasar una estructura específica de seeder al método `Seed`:

```go
función de paquete

importar (
 "testing"

 "github. om/stretchr/testify/suite"

 "goravel/database/seeders"
 "goravel/tests"
)

type ExampleTestSuite struct {
 suite. uite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest se ejecutará antes de cada prueba en la suite.
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest se ejecutará después de cada prueba en la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  // Ejecuta la DatabaseSeeder. .
 s.Seed()

  // Ejecutar múltiples semilleros específicos...
 s.Seed(&seeders.UserSeeder{}, &seeders.Photo Seeder{})
}
```

### Usando Docker

Cuando se utiliza `go test`, varios paquetes son probados en paralelo. Como resultado, actualizar la base de datos en un caso de prueba
usando una base de datos local puede potencialmente afectar otros casos de prueba paralelos. Para abordar esto, Goravel ofrece pruebas
basadas en Docker. Con Docker, una imagen de base de datos puede ser creada y usada de forma independiente a través de diferentes paquetes.

> Debido al soporte limitado de la imagen Docker para el sistema Windows, actualmente, la prueba Docker solo puede ejecutarse en entornos
> no Windows.

#### Iniciar Docker

Puede utilizar el método `Base de datos` para iniciar una imagen de base de datos basada en la conexión de base de datos predeterminada. o puede pasar
el nombre de conexión de base de datos a este método para iniciar otras imágenes de base de datos:

```go
database, err := facades.Testing().Docker().Database()
database, err := facades.Testing().Docker().Database("postgres")
```

Las imágenes de base de datos soportadas por defecto:

| Base de datos | Enlace de imagen                                                                                                                                                                                                                                                                                                                                                 | Versión |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Mysql         | [https://hub.docker.com/_/mysql](https://hub.docker.com/_/(0)[video] ql) | última  |
| Postgres      | [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)                                                                                                                                                                                                                      | última  |
| Sqlserver     | [https://hub.docker.com/r/microsoft/mssql-server](https://hub.docker.com/r/microsoft/msql-server)                                                                                                                                                                                                                | última  |
| Sqlite        | [https://hub.docker.com/r/nouchka/sqlite3](https://hub.docker.com/r/nouchka/sqlite3)                                                                                                                                                                                                                             | última  |

También puede utilizar el método `Imágenes` para personalizar la imagen:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

database.Image(contractstesting.Image{
  Repository: "mañql",
  Etiqueta: "5.7",
  Env: []string{
    "MYSQL_ROOT_PASSWORD=123123",
    "MYSQL_DATABASE=goravel",
  },
  ExposedPorts: []string{"3306"},
})
```

#### Crear imagen

Después de iniciar la imagen, puede utilizar el método `Build` para construir la imagen:

```go
err := database.Build()
```

En este momento, puede usar el comando `docker ps` para ver que la imagen ya está ejecutándose en el sistema, y puede obtener
la información de configuración de la base de datos a través del método `Config` para facilitar la depuración de la conexión:

```go
config := database.Config()
```

#### Seeders en ejecución

Si desea usar [seeder](../orm/seeding) para llenar la base de datos durante la prueba, puede llamar al método `Seed`.
Por defecto, el método `Seed` ejecutará el `DatabaseSeeder`, que debería ejecutar todos tus otros seeders.
Alternativamente, puedes pasar una estructura específica de seeder al método `Seed`:

```go
err := database.Seed()
err := database.Seed(&seeders.UserSeeder{})
```

#### Actualizar base de datos

Debido a que los casos de prueba en el mismo paquete se ejecutan seriamente, actualizar la base de datos después de que un solo caso de prueba ejecute
no tendrá ningún impacto negativo, podemos usar el método `Fresh`:

```go
err := database.Fresh()
```

También puede utilizar el método `RefreshDatabase`:

```go
función de paquete

import (
 "testing"

 "github.com/stretchr/testify/suite"

 "goravel/tests"
)

type ExampleTestSuite struct {
 suite. uite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite. un(t, new(ExampleTestSuite))
}

// SetupTest se ejecutará antes de cada prueba en la suite.
func (s *ExampleTestSuite) SetupTest() {
  s. efreshDatabase()
}

// TearDownTest se ejecutará después de cada prueba en la suite.
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
}
```

#### Desinstalar imagen

Después de que se ejecuten los casos de prueba en el subpaquete, la imagen se desinstalará automáticamente en una hora, puede
también utilizar el método `Shutdown` para desinstalar la imagen manualmente.

```go
err := database.Shutdown()
```

#### Ejemplo

Podemos crear un método `TestMain` en el sub-paquete y añadir la pre-lógica del caso de prueba:

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
  database, err := facades.Testing().Docker(). atabase()
  if err ! nil {
    panic(err)
  }

  if err := database. uild(); err != nil {
    panic(err)
  }

  if err := database. eed(); error! nil {
    panic(err)
  }

  // Ejecuta los casos de prueba
  exit := m. un()

  // Desinstala la imagen después de que todos los casos de prueba hayan sido ejecutados
  if err := database. lear(); err != nil {
    pánico (err)
  }

  os.Exit(exit)
}
```

> Para más uso del método TestMain consulte [Documentación Oficial](https://pkg.go.dev/testing#hdr-Main).
