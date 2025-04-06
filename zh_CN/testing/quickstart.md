# 开始使用

Goravel的测试功能依赖于Golang的官方测试组件，扩展了单元测试以支持集成测试，提高应用程序的健壮性。

## 环境

### 自定义环境文件

默认情况下，测试过程中使用根目录下的`.env`文件注入配置信息。 如果您想为不同的包使用不同的`.env`文件，可以在包目录中创建一个`.env`文件，测试将优先读取这个文件。

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

此外，您可以在项目根目录创建一个`.env.testing`文件。 在使用`--env`选项运行`go test`时，将使用这个文件代替`.env`文件，注意这个选项需要跟在测试目录后面，例如：

```shell
go test ./... --env=.env.testing
go test ./... -e=.env.testing
```

### `TestCase` 结构体

Goravel 中有一个 `TestCase` 结构体，该结构体将来会提供一些便捷的测试方法。此外，在同一文件中还有一个 `init` 方法，该方法指导在运行测试之前注册 Goravel 应用程序。 您可以在此方法中包含任何需要在测试之前执行的必要逻辑。

## 创建测试

要创建新的测试用例，请使用 `make:test` Artisan 命令：

```shell
go run . artisan make:test feature/UserTest
```

默认情况下，我们的测试用例使用 [stretchr/testify](https://github.com/stretchr/testify) 包的 suite 函数编写。 这个函数使我们能够配置测试前、测试后、子测试和断言等内容，从而使测试用例更加有组织。 欲了解更多信息，请参阅官方文档。

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

// SetupTest 将在套件中的每个测试之前运行。
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest 将在套件中的每个测试之后运行。
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  s.True(true)
}
```

## 数据库测试

Goravel模型工厂和种子可以轻松为应用程序的模型创建测试数据库记录。

### 工厂

如果你正在进行测试，可能需要在运行测试之前向数据库添加一些记录。 你不必手动输入测试数据创建的每个列的值。 使用Goravel，你可以通过[工厂](../orm/factories)为你的模型设置默认属性。

```go
var user models.User
err := facades.Orm().Factory().Create(&user)
```

### 运行种子程序

如果您想在功能测试期间使用[数据库种子程序](../orm/seeding)来填充数据库，您可以调用`Seed`方法。 默认情况下，`Seed`方法将执行`DatabaseSeeder`，它应该执行所有其他种子程序。 或者，您可以将特定的种子程序结构传递给`Seed`方法：

```go
package feature

import (
 "testing"

 "github.com/stretchr/testify/suite"

 "goravel/database/seeders"
 "goravel/tests"
)

type ExampleTestSuite struct {
 suite.Suite
 tests.TestCase
}

func TestExampleTestSuite(t *testing.T) {
 suite.Run(t, new(ExampleTestSuite))
}

// SetupTest 将在套件中的每个测试之前运行。
func (s *ExampleTestSuite) SetupTest() {
}

// TearDownTest 将在套件中的每个测试之后运行。
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
  // 运行 DatabaseSeeder...
 s.Seed()

  // 运行多个特定的种子程序...
 s.Seed(&seeders.UserSeeder{}, &seeders.PhotoSeeder{})
}
```

### 使用 Docker

当使用`go test`时，多个包会并行测试。 因此，在测试用例中刷新使用本地数据库的数据库可能会影响其他并行的测试用例。 为了解决这个问题，Goravel提供了基于Docker的测试。 使用Docker，可以创建一个数据库镜像，并在不同的包中独立使用。

> 由于Docker镜像对Windows系统的支持有限，目前Docker测试只能在非Windows环境中运行。

#### 初始化Docker

你可以使用`Database`方法基于默认数据库连接初始化一个数据库镜像，或者你可以向这个方法传递数据库连接名来初始化其他数据库镜像：

```go
database, err := facades.Testing().Docker().Database()
database, err := facades.Testing().Docker().Database("postgres")
```

默认支持的数据库镜像：

| 数据库        | 镜像链接                                                                                                                                               | 版本  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| MySQL      | [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)              | 最新  |
| PostgreSQL | [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)        | 最新  |
| SQL Server | [https://hub.docker.com/r/microsoft/mssql-server](https://hub.docker.com/r/microsoft/mssql-server) | 最新  |
| SQlite     | [https://hub.docker.com/r/nouchka/sqlite3](https://hub.docker.com/r/nouchka/sqlite3)               | 最新版 |

你也可以使用`Image`方法来自定义镜像：

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

#### 构建镜像

镜像初始化后，你可以使用`Build`方法来构建镜像：

```go
err := database.Build()
```

此时，你可以使用`docker ps`命令查看镜像已经在系统上运行，并且可以通过`Config`方法获取数据库的配置信息，以方便连接调试：

```go
config := database.Config()
```

#### 运行种子程序

如果你希望在测试期间使用[种子程序](../orm/seeding)来填充数据库，你可以调用`Seed`方法。
默认情况下，`Seed`方法将执行`DatabaseSeeder`，它应该执行你的所有其他种子程序。
或者，你可以向`Seed`方法传递一个特定的种子程序结构体：

```go
err := database.Seed()
err := database.Seed(&seeders.UserSeeder{})
```

#### 刷新数据库

由于同一包中的测试用例是按顺序执行的，在单个测试用例运行后刷新数据库不会产生负面影响，我们可以使用`Fresh`方法：

```go
err := database.Fresh()
```

你也可以使用`RefreshDatabase`方法：

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

// SetupTest 将在套件中的每个测试之前运行。
func (s *ExampleTestSuite) SetupTest() {
  s.RefreshDatabase()
}

// TearDownTest 将在套件中的每个测试之后运行。
func (s *ExampleTestSuite) TearDownTest() {
}

func (s *ExampleTestSuite) TestIndex() {
}
```

#### 卸载镜像

子包中的测试用例执行完毕后，镜像将在一小时内自动卸载，您也可以使用 `Shutdown` 方法手动卸载镜像。

```go
err := database.Shutdown()
```

#### 示例

我们可以在子包中创建一个 `TestMain` 方法，并添加测试用例的前置逻辑：

```go
// tests/feature/main_test.go
package feature

import (
  "fmt"
  "os"
  "testing"

  "github.com/goravel/framework/facades"

  "goravel/database/seeders"
)

func TestMain(m *testing.M) {
  database, err := facades.Testing().Docker().Database()
  if err != nil {
    panic(err)
  }

  if err := database.Build(); err != nil {
    panic(err)
  }

  if err := database.Seed(); err != nil {
    panic(err)
  }

  // 执行测试用例
  exit := m.Run()

  // 在所有测试用例运行完毕后卸载镜像
  if err := database.Clear(); err != nil {
    panic(err)
  }

  os.Exit(exit)
}
```

> 有关 TestMain 方法的更多用法，请参阅[官方文档](https://pkg.go.dev/testing#hdr-Main)。
