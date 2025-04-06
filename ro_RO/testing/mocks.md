# Piatră

## Descriere

Toate funcţiile Goravel sunt implementate folosind `facades`, şi toate `faţades` sunt compuse din interfeţe. Deci cu funcția mock
din [stretchr/testify](http://github.com/stretchr/testify), Goravel poate livra o experiență excepțională de testare
.

## Mock facades.App

```go
șirul func Current Locale() {
  return facades.App().Current Locale(context. ackground())
}

func TestCurrent Locale(t *testing.T) {
  mockFactory := mock.Factory()
  mockApp := mockFactory. pp()
  mockApp.On("Current Locale", context.Background().Return("en").Once()

  assert.Equal(t, "en", Current Locale())
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
  mockFactory := mock. actoria()
  mockArticle := mockFactory.Artisan()
  mockArticle.On("Call", "list").Once()

  asert. otPanics(t, func() {
    ArtisanCall()
  })

  mockArticle.AssertExpectations(t)
}
```

## Piatră fațade.Auth

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
  mockAuth. n("Deconectare", http.Background()).Return(nil).Once()
  err := Auth()

  assert.Nil(t, err)

  mockAuth.AssertExpectations(t)
}
```

## Piatră fațades.Cache

```go
import "github.com/goravel/framework/testing/mock"

func Cache() string {
  if err := facades. ache().Put("name", "goravel", 1*time.Minute); err != nil {
    fmt. rintln("cache.put.error", eroare)
  }

  return facades.Cache().Get("name", "test").(string)
}

func TestCache(t *testing.T) {
  mockFactory := mock. actoria()
  mockCache := mockFactory.Cache()
  
  mockCache.On("Put", "goravel", mock.Anything).Return(nil).Once()
  mockCachCache. n("Get", "name", "test").Return("Goravel").Once()

  res := Cache()
  assert.Equal(t, res, "Goravel")

  mockCache.AssertExpectations(t)
}
```

## Piatră fațade.Config

```go
import "github.com/goravel/framework/testing/mock"

func Config() string {
  return facades.Config().GetString("app.name", "test")
}

func TestConfig(t *testing.T) {
  mockFactory := mock.Factory()
  mockConfig := mockFactory.Config()
  mockConfig.On("GetString", "app.name", "test").Return("Goravel").Once()

  res := Config()
  assert.Equal(t, res, "Goravel")

  mockConfig.AssertExpectations(t)
}
```

## Piatră fațades.Crypt

```go
import (
  "testing"

  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
)

func Crypt(șirul str) (șir, eroare) {
 res, err := facades. rypt().EncryptString(str)
 dacă err != nil {
  return "", err
 }

 fațade returnate. rypt().DecryptString(res)
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

## Mock-ează fațades.Eveniment

```go
import "github.com/goravel/framework/testing/mock"

func Event() error {
  return facades.Event().Job(&events.TestEvent{}, []contractevent rg{
    {Type: "string", value: "abcc"},
    {Type: "int", Value: 1234},
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

## Piatră fațade.Poartă

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
 mockGate. n("Allows", "update-post", map[string]any{
  "post": "test",
 }). eturn(true).Once()

 assert.True(t, Gate())

 mockGate.AssertExpectations(t)
}
```

## Mock facades.Grpc

```go

importă (
  "context"
  "erori"
  "testează"

  "github. om/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "google. olang.org/grpc"
  "github.com/goravel/framework/facades"
)

func Grpc() (*grpc.ClientConn, error) {
  return facades.Grpc().Client(context. ackground(), "user")
}

func TestGrpc(t *testing.T) {
  mockFactory := mock. actoria()
  mockGrpc := mockFactory.Grpc()
  mockGrpc.On("Client", context.Background(), "utilizator"). eturn(nil, errors.New("error")).Once()
  conn, err := Grpc()

  assert. il(t, conn)
  assert.EqualError(t, eroare, "error")

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

## Piatră fațade.Jurnal

`facades.Log()` nu implementează mock, foloseşte `fmt` în loc de însemnările reale, uşor de depanat în timpul testării.

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

## Piatră fațades.Mail

```go
import "github.com/goravel/framework/testing/mock"

func Mail() error {
  return facades.Mail().From(mail. rom{Adresa: "example@example.com", nume: "example"}).
    To([]string{"example@example.com"}).
    Content(mail. ontent{Subiect: "Subiect", Html: "<h1>Hello Goravel</h1>"}).
    Trimit()
}

func TestMail(t *testing. ) {
  mockFactory := mock.Factory()
  mockMail := mockFactory. Email()
  mockMail.On("Din", mail.From{Adresa: "example@example.com", Nume: "example"}).Return(mockMail)
  mockMail.On("To", []string{"example@example.com"}).Return(mockMail)
  mockMail.On("Content", mail. ontent{Subiect: "Subiect", Html: "<h1>Hello Goravel</h1>"}).Return(mockMail)
  mockMail.On("Send").Return(nil)

  assert.Nil(t, Mail())

  mockMail.AssertExpectations(t)
}
```

## Mock facades.Orm

```go
import "github.com/goravel/framework/testing/mock"

func Orm() error {
  if err := facades.Orm().Query().Create(&Test{}); err != nil {
    return err
  }

  var test Test
  return facades.Orm().Query().Where("id = ?", 1).Find(&test)
}

func TestOrm(t *testing.T) {
  mockFactory := mock.Factory()
  mockOrm := mockFactory.Orm()
  mockOrmQuery := mockFactory.OrmQuery()
  mockOrm.On("Query").Return(mockOrmQuery)

  mockOrmQuery.On("Create", mock.Anything).Return(nil).Once()
  mockOrmQuery.On("Where", "id = ?", 1).Return(mockOrmDB).Once()
  mockOrmQuery.On("Find", mock.Anything).Return(nil).Once()

  assert.Nil(t, Orm())

  mockOrm.AssertExpectations(t)
  mockOrmQuery.AssertExpectations(t)
}

func Transaction() error {
  return facades.Orm().Transaction(func(tx contractorm.Transaction) error {
    var test Test
    if err := tx.Create(&test); err != nil {
      return err
    }

    var test1 Test
    return tx.Where("id = ?", test.ID).Find(&test1)
  })
}

func TestTransaction(t *testing.T) {
  mockFactory := mock.Factory()
  mockOrm := mockFactory.Orm()
  mockOrmTransaction := mockFactory.OrmTransaction()
  mockOrm.On("Transaction", mock.Anything).Return(func(txFunc func(tx orm.Transaction) error) error {
    return txFunc(mockOrmTransaction)
  })

  var test Test
  mockOrmTransaction.On("Create", &test).Return(func(test2 interface{}) error {
    test2.(*Test).ID = 1

    return nil
  }).Once()
  mockOrmTransaction.On("Where", "id = ?", uint(1)).Return(mockOrmTransaction).Once()
  mockOrmTransaction.On("Find", mock.Anything).Return(nil).Once()

  assert.Nil(t, Transaction())

  mockOrm.AssertExpectations(t)
  mockOrmTransaction.AssertExpectations(t)
}

func Begin() error {
  tx, _ := facades.Orm().Query().Begin()
  user := models.User{Name: "Goravel"}
  if err := tx.Create(&user); err != nil {
    return tx.Rollback()
  } else {
    return tx.Commit()
  }
}
```

## Piatră fațade.Coadă

```go
import "github.com/goravel/framework/testing/mock"

func Queue() error {
  return facades.Queue().Job(&jobs.TestSyncJob{}, []coadă. rg{}).Dispatch()
}

func TestQueue(t *testing.T) {
  mockFactory := mock.Factory()
  mockQueue := mockFactory. ueue()
  mockTask := mockFactory.QueueTask()
  mockQueue.On("Job", mock.Anything, mock.Anything).Return(mockTask).Once()
  mockTask. n("Dispatch").Return(nil).Once()

  assert.Nil(t, Queu())

  mockQueue.AssertExpectations(t)
  mockTask.AssertExpectations(t)
}
```

## Piatră fațades.Depozitare

```go
import (
  "context"
  "testare"

  "github.com/goravel/framework/filesystem"
  "github. om/goravel/framework/testing/mock"
  "github.com/goravel/framework/facades"
)

func Storage() (șir, eroare) {
  , _ := filesystem. ewFile("1.txt")

  return facades.Storage().WithContext(context.Background()).PutFile("fișier", fișier)
}

func Storage(t *testing. ) {
  mockFactory := mock.Factory()
  mockStorage := mockFactory. torage()
  mockDriver := mockFactory.StorageDriver()
  mockStorage.On("WithContext", context.Background())).Return(mockDriver).Once()
  fișier, _ := filesystem.NewFile("1.txt")
  mockDriver.On("PutFile", "fișier"). eturn("", nil).Once()
  , err := Storage()

  assert.Equal(t, "", path)
  assert. il(t, eroare)

  mockStorage.AssertExpectations(t)
  mockDriver.AssertExpectations(t)
}

```

## Piatră fațades.Validare

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github. om/goravel/framework/facades"
)

func Validation() șir {
  validator, _ := facades.Validation(). ake(harta[string]string{
    "a": "b",
  }, Harta[string]string{
    "a": "required",
  }) Erori
  := validator. erori de returnare rrors()

  . ne("a")
}

func TestValidation(t *testing.T) {
  mockFactory := mock. actoria()
  mockValidation := mockFactory.Validation()
  mockValidator := mockFactory. idator()
  mockErrors := mockFactory.ValidationErrors()
  mockValidation. n("Make", map[string]string{
    "a": "b",
  }, harta[string]string{
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

## Piatră fațades.Vezi

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github. om/goravel/framework/facades"
)

func View() bool {
  return facades.View().Exists(welcome. mpl")
}

func TestView(t *testing.T) {
  mockFactory := mock.Factory()
  mockView := mockFactory.View()
 mockView. n("Exists", "welcome.tmpl").Return(true).Once()

 assert.True(t, View())

 mockView.AssertExpectations(t)
}
```
