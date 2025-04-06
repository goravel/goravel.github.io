# وهمي

## الوصف

ويتم تنفيذ جميع وظائف غورافيل باستخدام 'facades`، وجميع 'واجهات الوجوه` تتكون من واجهات بينية. إذاً مع الدالة الوهمية
من [مطول/شهادة](http://github.com/stretchr/testify)، يمكن لجورافيل تقديم تجربة استثنائية
.

## Mock facades.App

```go
تمرين currentLocale() سلسلة {
  Refacades.App().currentLocale(سياق. ackground())
}

TestcurrentLocale(t *testing.T) {
  mockFactory := mock.Factory()
  mockApp := mockFactory. ppp()
  mockApp.Onp. ("currentLocale", context.Background()).Return("en").Once()

  assert.Equal(t, "en", currentLocale())
  mockApp.AssertExpectations(t)
 A}
```

## Mock facades.Artisan

```go
استيراد "github.com/goravel/framework/testing/mock"

forc ArtisanCall() {
  facades.Artisan().Call("list")


func TestArtisan(t *testing.T) {
  mockFactory := mock. الفاعل ()
  مقالة := mockFactory.Artisan()
  mockArticle.On("Call", "list").Once()

  تأكيد. otPanics(t, func() {
    ArtisanCall()
  })

  mockArticle.AssertExpectations(t)
}
```

## واجهات وهمية.مصادقة

```go
استيراد (
  "testting"

  "github.com/goravel/framework/http"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"
  "github.com/goravel/framework/facades"


forc Auth() error {
  Refacades.Auth().Logout(@un.org. ackground())


TestAuth(t *testing.T) {
  mockFactory()
  mockAuth := mock.Factory()
  mockAuth. n("Logout", http.Background()().Return(nil).Once()
  err := Auth()

  assert.Nil(t, err)

  mockAuth.AssertExpectations(t)
}
```

## واجهة وهمية.ذاكرة التخزين المؤقت

```go
استيراد "github.com/goravel/framework/testing/mock"

cache() string {
  إذا حدث خطأ := واجهات. ache().Put("name", "goravel", 1*time.Minute); err != nl {
    fmt. rintln("cache.put.error", err)


  Refacades.Cache().Get("name", "test".(string)


func TestCache(t *testing.T) {
  mockFactory := mock. الفاعل ()
  mockCache := mockFactory.Cache()
  
  mockCache.On("Put", "name", "goravel", mock.Anything).Return(nil).Once()
  mockCache. n("Get", "name", "test").Return("Goravel").Once()

  res := Cache()
  assert.Equal(t, res, "Goravel")

  mockCache.AssertExpectations(t)
}
```

## واجهات وهمية.تكوين

```go
استيراد "github.com/goravel/framework/testing/mock"

Configing () string {
  Refacades.Config. etString("app.name", "test")
}

func TestConfig(t *testing.T) {
  mockFactory := mock. actory()
  mockConfig := mockFactory.Config()
  mockConfig.On("GetString", "app.name", "test").Return("Goravel"). nce()

  res := Config()
  assert.Equal(t, "Goravel")

  mockConfig.AssertExpectations(t)
}
```

## واجهات وهمية.Crypt

```go
استيراد (
  "اختبار"

  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"


Crypt(str string) (سلسلة، خطأ) {
 res، الخطأ := الواجهة. rypt().EncryptString(str)
 if err != nl {
  العودة "", err
 }

 واجهات العودة. rypt().DecryptString(res)




 func TestCrypt(t *testting. ) {
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

## واجهات وهمية.حدث

```go
استيراد "github.com/goravel/framework/testing/mock"

func Event() خطأ {
  Refacades.Event().Job(&events.TestEvent{}, []contractevent. rg{
    {النوع: "سلسلة"، القيمة: "abc"},
    {النوع: "int", Vvalue: 1234},
  }). إزابتش()


TestEvent(t *testing.T) {
  mockFactory := mock. ممثل()
  حدث نموذجي := mockFactory.Event()
  mockTask := mockFactory.EventTask()
  mockEvent.On("Job", mock.Anything).Return(mockTask). nce()
  mockTask.On("إرسال").Return(nil).Once()

  assert.Nil(t, Event())

  mockEvent.AssertExpectations(t)
  mockTask.AssertExpectations(t)
}
```

## واجهة وهمية.بوابة

```go
استيراد (
  "اختبار"

  "github.com/goravel/framework/facades"
  "github.com/goravel/framework/testing/mock"
  "github. om/stretchr/testify/assert"


Gate() bool {
 Refacades.Gate. llows("update-post", map[string]any{
  "post": "test",
 })


func TestGate(t *testing. ) {
  mockFactory := mock.Factory()
 mockFactory.Gate()
 mockGate. n("Alallows", "update-post", map[string]any{
  "post": "test",
 }). eturn(true).Once()

 assert.True(t, Gate())

 mockGate.AssertExpectations(t)
}
```

## Mock facades.Grpc

```go

استيراد (
  "سياق"
  "خطأ"
  "اختبار"

  "github. om/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "google. olang.org/grpc"
  "github.com/goravel/framework/facades"


func Grpc() (*grpc.ClientConn، خطأ) {
  Refacades.Grpc().Client(السياق. ackground(), "user")




 func TestGrpc(t *testing.T) {
  mockFactory := mock. الفاعل()
  mockGrpc := mockFactory.Grpc()
  mockGrpc.On("عميل", context.Background(), "user"). eturn(nil, errors.New("error")).Once()
  conn, err := Grpc()

  . il(t, conn)
  assert.EqualError(t, err, "خطأ")

  mockGrpc.AssertExpectations(t)
}
```

## Mock facades.Hash

```go
استيراد (
  "خطأ"
  "اختبار"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "google. olang.org/grpc"
  "github.com/goravel/framework/facades"


func Hash() (سلسلة، خطأ) {
 Refacades.Hash. ake("Goravel")



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
تفكيك Lang() string {
  Refacades.Lang(context.Background()).Get("name")


TestLang(t *testing. ) {
  مصنع المفاتيح := mock.Factory()
  mockLang := mockFactory. ang()
  mockLang.On("Get", "name").Return("Goravel").Once()

  assert.Equal(t, "Goravel", Lang())
  mockLang.AssertExpectations(t)
 A}
```

## السجل الوهمي

'facades.Log()' لا ينفذ moc، استخدم 'fmt' بدلا من إخراج السجل الفعلي، وسهولة التصحيح أثناء الاختبار.

```go
استيراد "github.com/goravel/framework/testing/mock"

سجل ممتعك () {
  facades.Log().Debug("اختبار")


TestLog(t *testing.T) {
  mockFactory := mock.Factory()
  mockFactory.Log()

  Log()
}
```

## واجهات وهمية.البريد

```go
استيراد "github.com/goravel/framework/testing/mock"

Froc Mail() خطأ {
  Refacades.Mail().From(mail). rom{Address: "example@example.com", Name: "example"}).
    To([]string{"example@example.com"}).
    Content(mail). ontent{Subject: "Subject", Html: "<h1>Hello Goravel</h1>"}).
    Send()
}

func TestMail(t *testing. ) {
  مصنع المفاتيح := mock.Factory()
  mockMail := mockFactory. ail()
  mockMail.On("From", mail.From{Address: "example@example.com", name: "example"}).Return(mockMail)
  mockMail.On("To", []string{"example@example.com"}.Return(mockMail)
  mockMail.On("Content", mail. ontent{الموضوع: "الموضوع"، Html: "<h1>Hello Goravel</h1>"}).Ren(mockMail)
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

## واجهات وهمية.قائمة الانتظار

```go
استورد "github.com/goravel/framework/testing/mock"

conc Queue() error {
  Refacades.Queue().Job(&jobs.TestSyncJob{}, []قائمة الإنتظار. rg{}).dispatch()
}

TestQueue(t *testing.T) {
  mockFactory := mock.Factory()
  mockQueue := mockFactory. ueue()
  mockFactory.QueueTask()
  mockQueue.On("Job", mock.Anything, mock.Anything).Return(mockTask).Once()
  mockTask. n("إرسال").Return(nil).Once()

  assert.Nil(t, Queue())

  mockQueue.AssertExpectations(t)
  mockTask.AssertExpectations(t)
 A}
```

## واجهات وهمية.التخزين

```go
استيراد (
  "سياق"
  "اختبار"

  "github.com/goravel/framework/filesystem"
  "github. om/goravel/framework/testing/mock"
  "github.com/goravel/framework/facades"


Chorage() (سلسلة، خطأ) {
  ملف، _ := filesystem. ewFile("1.txt")

  Refacades.Storage().WithContext(context.Background()).PutFile("file", file)



func TestStorage(t *tesing. ) {
  MockFactory := mock.Factory()
  mockStorage := mockFactory. تعذيب()
  mockDriver := mockFactory.StorageDriver()
  mockStorage.On("WithContext", context.Background().Return(mockDriver).Once()
  file, _ := filesystem.NewFile("1.txt")
  mockDriver.On("PutFile", "file", "file". eturn("", nil).Once()
  path ، err := Storage()

  assert.Equal(t, "", path)
  تأكيد. il(t, err)

  mockStorage.AssertExpectations(t)
  mockDriver.AssertExpectations(t)


```

## واجهات وهمية.المصادقة

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github.com/goravel/framework/facades"
)

func Validation() string {
  validator, _ := facades.Validation().Make(map[string]string{
    "a": "b",
  }, map[string]string{
    "a": "required",
  })
  errors := validator.Errors()

  return errors.One("a")
}

func TestValidation(t *testing.T) {
  mockFactory := mock.Factory()
  mockValidation := mockFactory.Validation()
  mockValidator := mockFactory.ValidationValidator()
  mockErrors := mockFactory.ValidationErrors()
  mockValidation.On("Make", map[string]string{
    "a": "b",
  }, map[string]string{
    "a": "required",
  }).Return(mockValidator, nil).Once()
  mockValidator.On("Errors").Return(mockErrors).Once()
  mockErrors.On("One", "a").Return("error").Once()
  err := Validation()

  assert.Equal(t, "error", err)

  mockValidation.AssertExpectations(t)
  mockValidator.AssertExpectations(t)
  mockErrors.AssertExpectations(t)
}
```

## واجهات وهمية.View

```go
import (
  "testing"

  "github.com/goravel/framework/testing/mock"
  "github.com/stretchr/testify/assert"
  "github.com/goravel/framework/facades"
)

func View() bool {
  return facades.View().Exists("welcome.tmpl")
}

func TestView(t *testing.T) {
  mockFactory := mock.Factory()
  mockView := mockFactory.View()
 mockView.On("Exists", "welcome.tmpl").Return(true).Once()

 assert.True(t, View())

 mockView.AssertExpectations(t)
}
```
