# Ficha

## Descripción

Todas las funciones de Goravel se implementan usando `facades`, y todas las `facades` se componen de interfaces. Así que con la función
simulada de [stretchr/testify](http://github.com/stretchr/testify), Goravel puede ofrecer una experiencia
excepcional de pruebas.

## Mock facades.App

```go
func CurrentLocale() string {
  return facades.App().CurrentLocale(contexto. ackground())
}

func TestCurrentLocale(t *testing.T) {
  mockFactory := mock.Factory()
  mockApp := mockFactory. pp()
  mockApp.On("CurrentLocale", context.Background()).Return("es").Once()

  assert.Equal(t, "en", CurrentLocale())
  mockApp.AssertExpectations(t)
}
```

## Mock facades.Artisan

```go
import "github.com/goravel/framework/testing/mock"

func ArtisanCall() {
  facades.Artisan().Call("list")
}

func TestArtisan(t *testing.T) {
  mockFactory := mock. actory()
  mockArticle := mockFactory.Artisan()
  mockArticle.On("Call", "list").Once()

  assert. otPanics(t, func() {
    ArtisanCall()
  })

  mockArticle.AssertExpectations(t)
}
```

## Fichas simuladas.Auth

```go
import (
  "testing"

  "github.com/goravel/framework/http"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
  "github.com/goravel/framework/facades"
)

func Auth() error {
  return facades.Auth().Logout(http. ackground())
}

func TestAuth(t *testing.T) {
  mockFactory := mock.Factory()
  mockAuth := mockFactory.Auth()
  mockAuth. n("Logout", http.Background()).Return(nil).Once()
  err := Auth()

  assert.Nil(t, err)

  mockAuth.AssertExpectations(t)
}
```

## Mock facades.Caché

```go
importar "github.com/goravel/framework/testing/mock"

func Cache() string {
  if err := facades. ache().Put("name", "goravel", 1*time.Minute); err != nil {
    fmt. rintln("cache.put.error", err)
  }

  return facades.Cache().Get("name", "test").(string)
}

func TestCache(t *testing.T) {
  mockFactory := mock. actory()
  mockCache := mockFactory.Cache()
  
  mockCache.On("Put", "name", "goravel", mock.Anything).Return(nil).Once()
  mockCache. n("Get", "name", "test").Return("Goravel").Once()

  res := Cache()
  assert.Equal(t, res, "Goravel")

  mockCache.AssertExpectations(t)
}
```

## Fichas simuladas.Config

```go
import "github.com/goravel/framework/testing/mock"

func Config() string {
  return facades.Config(). etString("app.name", "test")
}

func TestConfig(t *testing.T) {
  mockFactory := mock. actory()
  mockConfig := mockFactory.Config()
  mockConfig.On("GetString", "app.name", "test").Return("Goravel"). nce()

  res := Config()
  assert.Equal(t, res, "Goravel")

  mockConfig.AssertExpectations(t)
}
```

## Fichas simuladas.Crypt

```go
import (
  "testing"

  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
)

func Crypt(str string) (string, error) {
 res, err := facades. rypt().EncryptString(str)
 if err != nil {
  return "", err
 }

 return facades. rypt().DecryptString(res)
}

func TestCrypt(t *testing. ) {
  mockFactory := mock.Factory()
 mockCrypt := mockFactory.Crypt()
 mockCrypt.On("EncryptString", "Goravel").Return("test", nil).Once()
 mockCrypt.On("DecryptString", "test"). eturn("Goravel", nil).Once()

 res, err := Crypt("Goravel")
 assert.Equal(t, "Goravel", res)
 assert.Nil(t, err)

 mockCrypt.AssertExpectations(t)
}
```

## Fichas simuladas.Evento

```go
importar "github.com/goravel/framework/testing/mock"

func Event() error {
  return facades.Event().Job(&events.TestEvent{}, []contractevent. rg{
    {Type: "string", Value: "abcc"},
    {Type: "int", Valor: 1234},
  }). ispatch()
}

func TestEvent(t *testing.T) {
  mockFactory := mock. actory()
  mockEvent := mockFactory.Event()
  mockTask := mockFactory.EventTask()
  mockEvent.On("Job", mock.Anything, mock.Anything).Return(mockTask). nce()
  mockTask.On("Dispatch").Return(nil).Once()

  assert.Nil(t, Event())

  mockEvent.AssertExpectations(t)
  mockTask.AssertExpectations(t)
}
```

## Fichas simuladas.Puerta

```go
import (
  "testing"

  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
)

func Gate() bool {
 return facades.Gate(). llows("update-post", map[string]any{
  "post": "test",
 })
}

func TestGate(t *testing. ) {
  mockFactory := mock.Factory()
 mockGate := mockFactory.Gate()
 mockGate. n("Allows", "update-post", mapa[string]any{
  "post": "test",
 }). eturn(true).Once()

 assert.True(t, Gate())

 mockGate.AssertExpectations(t)
}
```

## Mock facades.Grpc

```go

import (
  "context"
  "errors"
  "testing"

  "github. om/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "google. olang.org/grpc"
  "github.com/goravel/framework/facades"
)

func Grpc() (*grpc.ClientConn, error) {
  return facades.Grpc().Client(contexto. ackground(), "user")
}

func TestGrpc(t *testing.T) {
  mockFactory := mock. actory()
  mockGrpc := mockFactory.Grpc()
  mockGrpc.On("Client", context.Background(), "user"). eturn(nil, errors.New("error")).Once()
  conn, err := Grpc()

  assert. il(t, conn)
  assert.EqualError(t, err, "error")

  mockGrpc.AssertExpectations(t)
}
```

## Mock facades.Hash

```go
import (
  "errors"
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "google. olang.org/grpc"
  "github.com/goravel/framework/facades"
)

func Hash() (string, error) {
 return facades.Hash(). ake("Goravel")
}

func TestHash(t *testing.T) {
  mockFactory := mock.Factory()
  mockHash := mockFactory.Hash()
 mockHash.On("Make", "Goravel"). eturn("test", nil).Once()

 res, err := Hash()
 assert.Equal(t, "test", res)
 assert.Nil(t, err)

 mockHash.AssertExpectations(t)
}
```

## Mock facades.Lang

```go
func Lang() string {
  return facades.Lang(context.Background()).Get("name")
}

func TestLang(t *testing. ) {
  mockFactory := mock.Factory()
  mockLang := mockFactory. ang()
  mockLang.On("Get", "name").Return("Goravel").Once()

  assert.Equal(t, "Goravel", Lang())
  mockLang.AssertExpectations(t)
}
```

## Fichas simuladas.Log

`facades.Log()` no implementa mock, usa `fmt` en lugar de la salida real del registro, fácil de depurar durante la prueba.

```go
import "github.com/goravel/framework/testing/mock"

func Log() {
  facades.Log().Debug("test")
}

func TestLog(t *testing.T) {
  mockFactory := mock.Factory()
  mockFactory.Log()

  Log()
}
```

## Mock facades.Mail

```go
importar "github.com/goravel/framework/testing/mock"

func Mail() error {
  return facades.Mail().From(mail. rom{Address: "example@example.com", Nombre: "example"}).
    To([]string{"example@example.com"}).
    Content(mail. ontent{Asunto: "Tema", Html: "<h1>Hola Goravel</h1>"}).
    Send()
}

func TestMail(t *testing. ) {
  mockFactory := mock.Factory()
  mockMail := mockFactory. ail()
  mockMail.On("De", mail.From{Address: "example@example.com", Nombre: "example"}).Return(mockMail)
  mockMail.On("To", []string{"example@example.com"}).Return(mockMail)
  mockMail.On("Content", correo. ontent{Asunto: "Tema", Html: "<h1>Hola Goravel</h1>"}).Return(mockMail)
  mockMail.On("Enviar").Return(nil)

  assert.Nil(t, Mail())

  mockMail.AssertExpectations(t)
}
```

## Mock facades.Orm

```go
import "github.com/goravel/framework/testing/mock"

func Orm() error {
  if err := facades.Orm().Query(). reate(&Test{}); err != nil {
    return err
  }

  var test Test
  return facades. rm().Query().Where("id = ?", 1).Find(&test)
}

func TestOrm(t *testing. ) {
  mockFactory := mock.Factory()
  mockOrm := mockFactory.Orm()
  mockOrmQuery := mockFactory. rmQuery()
  mockOrm.On("Query").Return(mockOrmQuery)

  mockOrmQuery.On("Create", mock.Anything).Return(nil). nce()
  mockOrmQuery.On("Where", "id = ?", 1).Return(mockOrmDB).Once()
  mockOrmQuery.On("Find", mock. nything).Return(nil).Once()

  assert.Nil(t, Orm())

  mockOrm.AssertExpectations(t)
  mockOrmQuery. ssertExpectations(t)
}

func Transaction() error {
  return facades.Orm().Transaction(func(tx contractorm. error {
    var test Test
    if err := tx. reate(&test); err != nil {
      return err
    }

    var test1 Test
    return tx.Where("id = ?", test.ID). ind(&test1)
  })
}

func TestTransaction(t *testing.T) {
  mockFactory := mock.Factory()
  mockOrm := mockFactory. rm()
  mockOrmTransaction := mockFactory.OrmTransaction()
  mockOrm.On("Transaction", mock.Anything). eturn(func(función txFunc (orm tx. ransaction) error) error {
    return txFunc(mockOrmTransaction)
  })

  var test Test
  mockOrmTransaction. n("Create", &test).Return(func(test2 interface{}) error {
    test2.(*Test).ID = 1

    return nil
  }). nce()
  mockOrmTransaction.On("Where", "id = ?", uint(1)).Return(mockOrmTransaction).Once()
  mockOrmTransaction.On("Buscar", mock. nything).Return(nil).Once()

  assert.Nil(t, Transaction())

  mockOrm.AssertExpectations(t)
  mockOrmTransaction. ssertExpectations(t)
}

func Begin() error {
  tx, _ := facades. rm().Query().Begin()
  user := models.User{Nombre: "Goravel"}
  if err := tx. reate(&user); err != nil {
    return tx. ollback()
  } else {
    return tx.Commit()
  }
}
```

## Fichas simuladas.Cola

```go
importar "github.com/goravel/framework/testing/mock"

func Queue() error {
  return facades.Queue().Job(&jobs.TestSyncJob{}, []queue. rg{}).Dispatch()
}

func TestQueue(t *testing.T) {
  mockFactory := mock.Factory()
  mockQueue := mockFactory. ueue()
  mockTask := mockFactory.QueueTask()
  mockQueue.On("Job", mock.Anything, mock.Anything).Return(mockTask).Once()
  mockTask. n("Dispatch").Return(nil).Once()

  assert.Nil(t, Queue())

  mockQueue.AssertExpectations(t)
  mockTask.AssertExpectations(t)
}
```

## Fichas simuladas. Almacenamiento

```go
import (
  "context"
  "testing"

  "github.com/goravel/framework/filesystem"
  "github. om/goravel/framework/testing/mock"
  "github.com/goravel/framework/facades"
)

func Storage() (string, error) {
  file, _ := filesystem. ewFile("1.txt")

  return facades.Storage().WithContext(context.Background()).PutFile("file", file)
}

func TestStorage(t *testing. ) {
  mockFactory := mock.Factory()
  mockStorage := mockFactory. torage()
  mockDriver := mockFactory.StorageDriver()
  mockStorage.On("WithContext", context.Background()).Return(mockDriver).Once()
  file, _ := filesystem.NewFile("1.txt")
  mockDriver.On("PutFile", "file", file). eturn("", nil).Once()
  ruta, err := Storage()

  assert.Equal(t, "", ruta)
  assert. il(t, err)

  mockStorage.AssertExpectations(t)
  mockDriver.AssertExpectations(t)
}

```

## Fichas simuladas.Validación

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github. om/goravel/framework/facades"
)

func Validation() string {
  validator, _ := facades.Validation(). ake(map[string]string{
    "a": "b",
  }, map[string]string{
    "a": "required",
  })
  errors := validator. rrors()

  errores de retorno. ne("a")
}

func TestValidation(t *testing.T) {
  mockFactory := mock. actory()
  mockValidation := mockFactory.Validation()
  mockValidator := mockFactory. alidationValidator()
  mockErrors := mockFactory.ValidationErrors()
  mockValidation. n("Make", mapa[string]string{
    "a": "b",
  }, mapa[string]string{
    "a": "required",
  }). eturn(mockValidator, nil).Once()
  mockValidator.On("Errors"). eturn(mockErrors).Once()
  mockErrors.On("One", "a").Return("error").Once()
  err := Validation()

  assert. qual(t, "error", err)

  mockValidation.AssertExpectations(t)
  mockValidator.AssertExpectations(t)
  mockErrors.AssertExpectations(t)
}
```

## Fichas simuladas.Vista

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github. om/goravel/framework/facades"
)

func View() bool {
  return facades.View().Exists("welcome"). mpl")
}

func TestView(t *testing.T) {
  mockFactory := mock.Factory()
  mockView := mockFactory.View()
 mockView. n("Existen", "welcome.tmpl").Return(true).Once()

 assert.True(t, View())

 mockView.AssertExpectations(t)
}
```
