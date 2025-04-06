# Crépuscule

## Libellé

Toutes les fonctions de Goravel sont implémentées à l'aide de `facades`, et toutes les `facades` sont composées d'interfaces. Ainsi, avec la fonction de bouchon
de [stretchr/testify](http://github.com/stretchr/testify), Goravel peut fournir une expérience de test
exceptionnelle.

## Mock facades.App

```go
func CurrentLocale() chaîne {
  return facades.App().CurrentLocale(contexte. ackground())
}

func TestCurrentLocale(t *testing.T) {
  mockFactory := mock.Factory()
  mockApp := mockFactory. pp()
  mockApp.On("CurrentLocale", context.Background()).Return("fr").Once()

  assert.Equal(t, "fr", CurrentLocale())
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

## Façades fictives.Auth

```go
import (
  "testing"

  "github.com/goravel/framework/http"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
  "github.com/goravel/framework/facades"
)

func Auth() erreur {
  return facades.Auth().Logout(http. ackground())
}

func TestAuth(t *testing.T) {
  mockFactory := mock.Factory()
  mockAuth := mockFactory.Auth()
  mockAuth. n("Déconnexion", http.Background()).Return(nil).Once()
  err := Auth()

  assert.Nil(t, err)

  mockAuth.AssertExpectations(t)
}
```

## Masquage des facades.Cache

```go
importez "github.com/goravel/framework/testing/mock"

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

## Façades fictives.Config

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

## Façades fictives.Crypte

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

## Façades fictives.Evénement

```go
importez "github.com/goravel/framework/testing/mock"

func Event() error {
  return facades.Event().Job(&events.TestEvent{}, []contractevent. rg{
    {Type: "string", Value: "abcc"},
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

## Façades ficelles.Porte

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
 mockGate. n("Autorisations", "update-post", mapper[string]any{
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
  return facades.Grpc().Client(context. ackground(), "user")
}

func TestGrpc(t *testing.T) {
  mockFactory := mock. actory()
  mockGrpc := mockFactory.Grpc()
  mockGrpc.On("Client", context.Background(), "user"). eturn(nil, errors.New("error")).Once()
  conn, err := Grpc()

  . il(t, conn)
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

 res, erreur := Hash()
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

## Façades fictives.Log

`facades.Log()` n'implémente pas de mock, utilise `fmt` au lieu de la sortie réelle du journal, facile à déboguer pendant les tests.

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

## Façades ficelles.Mail

```go
importez "github.com/goravel/framework/testing/mock"

func Mail() erreur {
  return facades.Mail().From(mail. rom{Adresse: "exemple@exemple.com", Nom: "exemple"}).
    À ([]string{"exemple@exemple.com"}).
    Content(courriel. ontent{Subject: "Subject", Html: "<h1>Bonjour Goravel</h1>"}).
    Send()
}

func TestMail(t *testing. ) {
  mockFactory := mock.Factory()
  mockMail := mockFactory. ail()
  mockMail.On("From", mail.From{Address: "example@example.com", Nom: "example"}).Return(mockMail)
  mockMail.On("To", []string{"example@example.com"}).Return(mockMail)
  mockMail.On("Contenu", mail. ontent{Subject: "Subject", Html: "<h1>Bonjour Goravel</h1>"}).Return(mockMail)
  mockMail.On("Envoyer").Return(niil)

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

## Face ficelée.File d'attente

```go
import "github.com/goravel/framework/testing/mock"

func Queue() erreur {
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

## Façades fictives.Stockage

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
  mockDriver.On("PutFile", "file", fichier). eturn("", nil).Once()
  path, err := Storage()

  assert.Equal(t, "", chemin)
  assert. il(t, err)

  mockStorage.AssertExpectations(t)
  mockDriver.AssertExpectations(t)
}

```

## Factures fictives.Validation

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
  },[string]string{
    "a": "required",
  })
  erreurs := validateur. rrors()

  erreurs de retour. ne("a")
}

func TestValidation(t *testing.T) {
  mockFactory := mock. actory()
  mockValidation := mockFactory.Validation()
  mockValidator := mockFactory. alidationValidator()
  mockErrors := mockFactory.ValidationErrors()
  mockValidation. n("Make", mapper[string]string{
    "a": "b",
  }, carte[string]string{
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

## Façades fictives.Voir

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github. om/goravel/framework/facades"
)

func View() bool {
  return facades.View().Exists("bienvenue. mpl")
}

func TestView(t *testing.T) {
  mockFactory := mock.Factory()
  mockView := mockFactory.View()
 mockView. n("Existents", "welcome.tmpl").Return(true).Once()

 assert.True(t, View())

 mockView.AssertExpectations(t)
}
```
