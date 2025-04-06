# اختبارات HTTP

عند بناء تطبيقات الويب، غالبا ما تحتاج إلى اختبار إذا كان HTTP الخاص بك يطلب العمل بشكل صحيح من البداية إلى النهاية.
أدوات اختبار غورافيل تجعل هذا مباشرة-يمكنك محاكاة الطلبات والتحقق من الاستجابات دون إعداد بيئات اختبار معقدة
.

## تقديم طلبات

اختبار نقاط نهاية HTTP في Goravel يستخدم نمط بسيط. ابدأ بطريقة `Http` من `TestCase`، التي تحتاج إلى
معلمة `*testing.T` للتأكيدات. هذا يعطيك عنصر طلب (`framework/contracts/testing.Testrequest`)
يتعامل مع جميع الأفعال الشائعة لـ HTTP مثل `Get` و `Post` و `Put`.

بدلاً من إجراء مكالمات HTTP حقيقية، هذه الأساليب تحاكي دورة طلب التطبيق الخاص بك داخلياً. كل طلب
يرجع عنصر استجابة ('framework/contracts/testting.TestResponse\`) مع طرق للتحقق من النتائج.

إليك مثال أساسي:

```go
تفكيك (s *exampleTestSuite) TestIndex() {
 رد، err := s.Http(s.T().Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### تخصيص ترويسات الطلب

يمكنك تخصيص رؤوس الطلبات باستخدام "سحب رأس واحد" لرأس واحد أو "انسحب" لرؤوس متعددة:

```go
func (s *ExampleTestSuite) TestIndex() {
    // Single header
    response, err := s.Http(s.T()).WithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Multiple headers
    response, err := s.Http(s.T()).WithHeaders(map[string]string{
        "X-Custom-Header": "Value",
        "Accept": "application/json",
    }).Get("/users/1")
}
```

### الكعكات

يمكنك استخدام طريقة 'WithCookie' أو 'WithCookies' لتعيين قيمة ملفات تعريف الارتباط قبل تقديم الطلب.

```go
مربع (s *exampleTestSuite) TestIndex() {
 رد، err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 / / أو استخدم Wowheaders لتعدد الترويسات
 إجابة، الخطأ := s. ttp(s.T()). ithheader(map[string]string{
        "الاسم": "كريشان"،
        "lang": "en",
    }). et("/users/1")
}
```

### انسحاب

يمكنك تعيين البيانات إلى الجلسة باستخدام طريقة "الانسحاب":

```go
تفكيك (s *exampleTestSuite) TestIndex() {
 رد، err := s.Http(s.T()).WithSession(map[string]أي{"role": "admin"}).Get("/users/1")
}
```

### تصحيح الاستجابات

بعد تقديم الطلب، يمكنك استخدام أسلوب "الدورة" أو "الرؤوس" أو "المحتوى" أو "ملفات تعريف الارتباط" أو "Json" للتحقق من البيانات المرسلة من
الطلب.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
 
 content, err := response.Content()
 
 cookies := response.Cookies()
 
 headers := response.Headers()
 
 json, err := response.Json() // response body parsed as json(map[string]any)
 
 session, err := response.Session() // returns all values stored in the current request session
}
```

## جسم البناء

للطريقة مثل 'Post`، 'Put`، 'حذف`إلخ. وتقبل غورافيل حجة`io.Reader\` كحجة ثانية. لتبسيط بناء
الحمولات ، يوفر الإطار أساليب مفيدة لبناء هيئات الطلبات.

```go
استيراد "github.com/goravel/framework/support/http"

func (s *exampleTestSuite) TestIndex() {
    وحدة الإنشاء := http.NewBody(). etField("name", "krishan")
    
    bodr := builder. الرد البري ()

    ، الخطأ := s. ttp(s.T().Withheader("Content-Type", body.ContentType().Post("/users", body)
}
```

## اختبار تطبيقات Json

توفر غورافيل عدة مساعدين لاختبار استجابة JSON API بشكل فعال. إنها تحاول تفكيك جسم الاستجابة إلى
اذهب إلى 'خريطة[string]أي\`. وإذا فشلت هذه التأكيدات دون جدوى، فإنها ستفشل أيضا.

```go
مربع (s *exampleTestSuite) TestIndex() {
    رد، مرر := s.Http(s.T()).Withheader("Content-Type", body.ContentType().Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "إنشاء": true,
        })
}
```

للوصول مباشرة إلى JSON غير المحصورة، استخدم طريقة 'Json' على 'TestResponse'. هذا يتيح لك فحص العناصر الفردية
في هيئة الاستجابة.

```go
json, err := response.Json() ()
s.Nil(err)
s.True(json["created"])
```

:::tip
The `AssertJson` method checks whether the response contains all the specified values, even if the response includes
additional fields. إنها لا تتطلب تطابق دقيق ما لم تستخدم \`AssertExactJson'.
:::

### تأكيد تطابق JSON بالضبط

إذا كنت بحاجة إلى التحقق من أن الاستجابة تطابق بالضبط JSON المتوقع (بدون حقول إضافية أو مفقودة)، استخدم طريقة
\`AssertExactJson'.

```go
مربع (s *exampleTestSuite) TestIndex() {
    رد، مرر := s.Http(s.T()).Withheader("Content-Type", body.ContentType().Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "إنشاء": صحيح،
        })
}
```

### Fluent JSON Testing

غورافيل تجعل من السهل القيام بتأكيدات بطلاقة على ردود JSON. باستخدام طريقة `AssertFluentJson'، يمكنك اجتياز
إغلاق يوفر مثالا لـ `framework/contracts/testing.AssertableJSON\`. هذا المثيل يسمح لك بالتحقق
من القيم أو الشروط المحددة في استجابة JSON التي تم إرجاعها عن طريق طلبك.

على سبيل المثال، يمكنك استخدام طريقة "أين" للتأكيد على وجود قيمة معينة في استجابة JSON، وأسلوب
`مفقود` لضمان عدم وجود السمة.

```go
استيراد contractstesting "github.com/goravel/framework/contracts/testing"

func (s *exampleTestSuite) TestIndex() {
    الرد، err := s. ttp(s.T().Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (json contractstesting.AssertableJSON) {
   json.Where("id", float64(1)).
    حيث ("الاسم"، "bowen").
    أين "lang"، "en").
    مفقودة ("كلمة المرور")
        })
}
```

### تأكيد وجود السمة / غياب

إذا كنت ترغب في التحقق مما إذا كانت السمة موجودة أو مفقودة، فإن غورافيل يجعلها بسيطة مع طرق 'Has\` و 'Missing'
.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("username").
            Missing("password")
})
```

يمكنك أيضا تأكيد وجود أو عدم وجود سمات متعددة في وقت واحد باستخدام `هاسال' و `مفقود\`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password d"})
})
```

إذا كنت بحاجة فقط للتحقق من وجود سمة واحدة على الأقل من القائمة، استخدم طريقة "HasAny".

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### استكشاف تأكيدات مجموعة JSON

عندما يحتوي الرد على مجموعة من الأشياء تحت مفتاح مسمى ، يمكنك استخدام طرق مختلفة لتأكيد بنيته
والمحتوى.

```go
اكتب العنصر بنيت {
    ID int `json:"id"`


facades.Route().Get("/", func(ctx http.Context) ± p. سبونس {
    عناصر := []التيم{
        {ID: 1}،
        {ID: 2},
    }
    Rectx. esponse().Json(200، الخريطة[string]{
  "البنود": البنود،
    })
}
```

يمكنك استخدام طريقة "العداد" للتحقق من عدد العناصر في المجموعة. لتأكيد خصائص العنصر
الأول، استخدم طريقة 'أولا`، التي توفر مثالا على 'AssertableJson`. Similarly, the `Each` method allows you
to iterate over all elements and assert their properties individually. Alternatively, the `HasWithScope` method combines
the functionality of `First` and `Count`, allowing you to assert both the first element and its contents while providing
an `AssertableJson` instance for scoped assertions.

```go
// العد و الأول
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesing. ssertableJSON) {
        json.Count("items", 2).
            أولاً ("البنود"، وظيفة (عقد متعاقد). ssertableJSON) {
                json. هنا ("id", 1)
            })
    })

// / كل
الرد. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json. ount("البنود")، 2)
            Each("items", func(json contractstesing. ssertableJSON) {
                json. إجابة("
            })
    })

//HasWithScope
. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("items", 2, func(json contractstesing. ssertableJSON) {
            json. هنا ("id", 1)
        })
})
```

## التأكيدات المتوفرة

### تأكيدات الاستجابة

|                                                   |                                                         |                                                         |
| ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| [AssertAccepted](#assertaccepted)                 | [AssertBadRequest](#assertbadrequest)                   | [AssertConflict](#assertconflict)                       |
| [AssertCookie](#assertcookie)                     | [AssertCookieExpired](#assertcookieexpired)             | [AssertCookieMissing](#assertcookiemissing)             |
| [AssertCookieNotExpired](#assertcookienotexpired) | [AssertCreated](#assertcreated)                         | [AssertDontSee](#assertdontsee)                         |
| [AssertExactJson](#assertexactjson)               | [AssertFluentJson](#assertfluentjson)                   | [AssertForbidden](#assertforbidden)                     |
| [AssertFound](#assertfound)                       | [AssertGone](#assertgone)                               | [AssertHeader](#assertheader)                           |
| [AssertHeaderMissing](#assertheadermissing)       | [AssertInternalServerError](#assertinternalservererror) | [AssertJson](#assertjson)                               |
| [AssertJsonMissing](#assertjsonmissing)           | [AssertMethodNotAllowed](#assertmethodnotallowed)       | [AssertMovedPermanently](#assertmovedpermanently)       |
| [AssertNoContent](#assertnocontent)               | [AssertNotAcceptable](#assertnotacceptable)             | [AssertNotFound](#assertnotfound)                       |
| [AssertNotModified](#assertnotmodified)           | [AssertOk](#assertok)                                   | [AssertPartialContent](#assertpartialcontent)           |
| [AssertPaymentRequired](#assertpaymentrequired)   | [AssertRequestTimeout](#assertrequesttimeout)           | [AssertSee](#assertsee)                                 |
| [AssertSeeInOrder](#assertseeinorder)             | [AssertServerError](#assertservererror)                 | [AssertServiceUnavailable](#assertserviceunavailable)   |
| [AssertStatus](#assertstatus)                     | [AssertSuccessful](#assertsuccessful)                   | [AssertTemporaryRedirect](#asserttemporaryredirect)     |
| [AssertTooManyRequests](#asserttoomanyrequests)   | [AssertUnauthorized](#assertunauthorized)               | [AssertUnprocessableEntity](#assertunprocessableentity) |

### تم قبول التأكيد

يؤكد أن الرد يحتوي على رمز حالة HTTP '202 مقبول\`:

```go
response.AssertAccepted()
```

### AssertBadRequest

يؤكد أن الرد يحتوي على رمز حالة HTTP '400 طلب سيئ\`:

```go
الردّ.AssertBadrequest()
```

### تضارب

يؤكد أن الرد يحتوي على رمز حالة HTTP '409' :

```go
الردّ.AssertConflict()
```

### كعكة

يؤكد أن الرد يحتوي على ملف تعريف ارتباط بالاسم والقيمة المحددين:

```go
response.AssertCookie("الاسم"، "القيمة")
```

### منتهية الصلاحية

تأكيد أن ملف تعريف الارتباط المحدد قد انتهى:

```go
response.AssertCookieExred("الاسم")
```

### الأسطر كوكي مفقود

يؤكد أن الرد لا يحتوي على ملف تعريف ارتباط بالاسم المحدد:

```go
response.AssertCookieMissing("الاسم")
```

### منتهية الصلاحية

تأكيد أن ملف تعريف الارتباط المحدد لم ينتهى:

```go
response.AssertCookieNotExendred("الاسم")
```

### تم إنشاء

يؤكد أن الرد يحتوي على رمز حالة HTTP '201' تم إنشاؤه:

```go
response.AssertCreated()
```

### AssertDontSee

يؤكد أن الرد لا يحتوي على القيم المحددة. العامل الثاني (اختياري) يحدد ما إذا كان إلى
هروب الأحرف الخاصة في القيم قبل التحقق. إذا لم يتم تقديمه، فإنه افتراضي إلى "صواب".

```go
response.AssertDontSee([]string{"<div>"}, false) // لا تهرب من الأحرف الخاصة
```

### AssertExactJson

يؤكد أن الرد JSON يطابق بالضبط `الخريطة[string]أي`:

```go
response.AssertExactJson(خريطة[string]أي {"إنشاء": true})
```

### AssertFluentJson

يؤكد استجابة JSON باستخدام واجهة طلاقة:

```go
استيراد contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(funcson contractstesting.AssertableJSON) {
     json.Where("إنشاء", true)
})
```

### تأكيد ممنوع

يؤكد أن الرد يحتوي على رمز حالة HTTP '403 Forbimen':

```go
الردّ.AssertForbidden()
```

### تم العثور على

يؤكد أن الرد يحتوي على رمز حالة HTTP '302':

```go
response.AssertFound()
```

### أكسيرتغون

يؤكد أن الرد يحتوي على رمز حالة HTTP \`410 Gone':

```go
response.AssertGone()
```

### ترويسة

يؤكد أن الرد يحتوي على رأس محدد مع القيمة المعطاة:

```go
response.AssertHeader("نوع المحتوى"، "تطبيق/json")
```

### رأس مفقود

يؤكد أن الرد لا يحتوي على العنوان المحدد:

```go
جواب.AssertHeaderMissing("X-Custom-header")
```

### AssertInternalServerError

يؤكد أن الرد يحتوي على "500 خادم داخلي" خطأ في رمز حالة HTTP:

```go
response.AssertInternalServerError()
```

### اسكندجسون

يؤكد أن الرد JSON يحتوي على الجزء المقدم:

```go
response.AssertJson(map[string]أي {"إنشاء": true})
```

### AssertJsonsing مفقود

يؤكد أن المفاتيح أو القيم المحددة مفقودة في الرد JSON:

```go
response.AssertJsonMissing(الخريطة[string]أي {"إنشاء": false})
```

### AssertMethodNotAled مسموح

يؤكد أن الرد يحتوي على رمز حالة HTTP لـ \`405' طريقة غير مسموحة:

```go
response.AssertMethodNotAlallowed()
```

### AssertMالحركة الدائمة

يؤكد أن الرد يحتوي على رمز حالة HTTP '301 منقول بشكل دائم\`:

```go
الردّ.AssertMovedmanently()
```

### AssertNoContent

يؤكد أن الرد يحتوي على رمز حالة HTTP '204 لا محتوى\`:

```go
response.AssertNoContent()
```

### AssertNotAcceptable

يؤكد أن الرد يحتوي على رمز حالة HTTP '406 غير مقبول\`:

```go
response.AssertNotAcceptable()
```

### AssertNotFجد

يؤكد أن الرد يحتوي على رمز حالة HTTP '404 غير موجود\`:

```go
response.AssertNotFound()
```

### أكستنوتتعديل

يؤكد أن الرد يحتوي على رمز حالة HTTP '304 غير معدل\`:

```go
response.AssertNotModified()
```

### أكستاك

يؤكد أن الرد يحتوي على رمز حالة HTTP '200 OK\`:

```go
response.AssertOk()
```

### المحتوى الجزئي

يؤكد أن الرد يحتوي على '206 محتوى جزئي' رمز حالة HTTP:

```go
الردّ.AssertPartialContent()
```

### AssertPaymentمطلوبة

يؤكد أن الرد يحتوي على رمز حالة HTTP الخاص ب `402 دفع مطلوب`:

```go
response.AssertPaymentRequired()
```

### تأكيد تاسعاتي

يؤكد أن الرد يحتوي على رمز حالة HTTP '408 طلب مهلة\`:

```go
response.AssertRequestTimeout()
```

### مستوطن

يؤكد أن الرد يحتوي على القيم المحددة. المعلمة الثانية (اختياري) تحدد ما إذا كان سيتم التهرب
من الأحرف الخاصة في القيم قبل التحقق. إذا لم يتم تقديمه، فإنه افتراضي إلى 'true'.

```go
response.AssertSee([]string{"<div>"}, false) // لا تهرب من الأحرف الخاصة
```

### أكستسيينور

يؤكد أن الرد يحتوي على القيم المحددة في الترتيب المحدد. المعلمة الثانية (اختيارية) تحدد
ما إذا كانت تريد التهرب من الأحرف الخاصة في القيم قبل التحقق. إذا لم يتم تقديمه، فإنه افتراضي إلى 'true'.

```go
response.AssertSeeInOrder([]string{"أولاً"، "Second"}, false) // لا تهرب من الأحرف الخاصة
```

### AssertServerError

يؤكد أن الرد يحتوي على خطأ في الخادم (>= 500 ، أقل من 600) رمز حالة HTTP:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

يؤكد أن الرد يحتوي على رمز حالة HTTP الخاص بـ "503 خدمة غير متوفرة":

```go
response.AssertServiceUnavailable()
```

### AssertStatus

يؤكد أن الرد يحتوي على رمز حالة HTTP المحدد:

```go
response.AssertStatus(200)
```

### تم التأكيد بنجاح

يؤكد أن الرد يحتوي على رمز حالة HTTP الناجح (2xxx):

```go
response.AssertSuccessful()
```

### إعادة التوجيه

يؤكد أن الرد يحتوي على رمز حالة HTTP '307 إعادة توجيه مؤقت\`:

```go
response.AssertTemporaryRedirect()
```

### AssertTooManyRequests

يؤكد أن الرد يحتوي على رمز حالة HTTP '429 طلبات كثيرة\`:

```go
الردّ.AssertTooManyRequests()
```

### غير مصرح به

يؤكد أن الرد يحتوي على رمز حالة HTTP '401 غير مصرح به\`:

```go
response.Assertunauthorized()
```

### كيان مؤكّد غير قابل للمعالجة

يؤكد أن الرد يحتوي على رمز حالة HTTP `422 كيان لا يمكن معالجته`:

```go
response.AssertunprocessableEntity()
```
