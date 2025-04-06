# Teste HTTP

Când se construiesc aplicații web, adesea va trebui să testezi dacă cererile tale HTTP funcționează corect de la început până la finalizare.
Instrumentele de testare ale Goravel fac acest lucru simplu - puteți simula cereri și verifica răspunsurile fără a configura mediul de testare
complex.

## Solicitări

Testarea criteriilor finale HTTP în Goravel utilizează un model simplu. Începe cu metoda `Http` din `TestCase`, care are nevoie de
un parametru `*testing.T` pentru aserțiuni. Aceasta vă oferă un obiect de cerere (`framework/contracts/testing.TestRequest`)
care se ocupă de toate HTTP verbe comune ca `Get`, `Post`, and `Put`.

În loc să facă apeluri reale cu HTTP, aceste metode simulează ciclul intern de cerere al aplicației dvs. Fiecare solicitare
returnează un obiect de răspuns (`framework/contracts/testing.TestResponse`) cu metode de verificare a rezultatelor.

Iată un exemplu de bază:

```go
func (s *ExampleTestSuite) TestIndex() {
 răspuns, err := s.HΠ(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Personalizați antetele solicitărilor

Puteți personaliza antetele solicitărilor folosind fie `WithHeader` pentru un singur antet sau `WithHeaders` pentru mai multe antete:

```go
func (s *ExampleTestSuite) TestIndex() {
    // Răspuns Single header
    , err := s.HΠ(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Multiple headers
    , err := s. s.T()). ithHeaders(harta[string]string{
        "X-Custom-Header": "Valoare",
        "Accept": "aplicație/json",
    }). et("/users/1")
}
```

### Cookie-uri

Puteţi utiliza fie metoda `WithCookie` sau `WithCookies` pentru a seta valoarea cookie-urilor înainte de a face o solicitare.

```go
func (s *ExampleTestSuite) TestIndex() {
 răspuns, err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 // sau folosiți Retrageri pentru mai multe răspunsuri
 err := s. s.T()). ithHeader(harta[string]string{
        "name": "krishan",
        "lang": "ro",
    }). et("/users/1")
}
```

### Retragere

Puteţi seta datele la sesiune folosind metoda `WithSession`:

```go
func (s *ExampleTestSuite) TestIndex() {
 răspuns, err := s.HΠ(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Răspunsuri de depanare

După ce faceți cerere puteți utiliza metoda `Session`, `Headers`, `Content`, `Cookies` sau `Json` pentru a verifica datele returnate de la
solicitarea.

```go
func (s *ExampleTestSuite) TestIndex() {
 răspuns, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}). et("/users/1") Conținutul
 
 , err := response.Content()
 
 cookie-uri := response. ookies()
 
 headers := response.Headers()
 
 json, err := response. son() // răspuns corp analizat ca json(harta[string]any)
 
 , err := response. ession() // returnează toate valorile stocate în solicitarea curentă a sesiunii
}
```

## Corpul clădirii

Pentru metoda ca `Post`, `Put`, `Delete` etc. Goravel acceptă `io.Reader` ca al doilea argument. Pentru a simplifica construcția lui
payload-uri, cadrul oferă metode de utilitate pentru construirea corpurilor de solicitare.

```go
import "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("name", "krishan")
    
    corp, err := builder. () Răspuns

    , err := s. Π(s.T().WithHeader("Content-Type", body.ContentType().Post("/users", body)
}
```

## Testarea API-ului Json

Goravel oferă mai mulți ajutători pentru a testa eficient răspunsurile API-ului JSON. Acesta încearcă să dezgropeze corpul de răspuns în
a Du-te pe `harta[string]oricine`. Dacă detrierea eșuează, aserțiunile asociate vor eșua.

```go
func (s *ExampleTestSuite) TestIndex() {
    răspuns, err := s.HΠ(s.T()).WithHeader("Content-Type", body.ContentType().Post((/users", nil)
 s. il(eroare)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": adevărat,
        })
}
```

Pentru a accesa direct JSON dezlănţuit, utilizaţi metoda `Json` pe `TestResponse`. Acest lucru vă permite să inspectați elementele individuale
ale corpului de răspuns.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
Metoda `AssertJson` verifică dacă răspunsul conține toate valorile specificate, chiar dacă răspunsul include câmpuri adiționale
Nu necesită o potrivire exactă decât dacă folosiți `AssertExactJson`.
:::

### Asserting Meciuri Exact JSON

Dacă trebuie să verificați că răspunsul se potrivește cu JSON așteptat exact (fără câmpuri suplimentare sau lipsă), utilizați metoda
`AssertExactJson`.

```go
func (s *ExampleTestSuite) TestIndex() {
    răspuns, err := s.HΠ(s.T()).WithHeader("Content-Type", body.ContentType().Post((/users", nil)
 s. il(eroare)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Goravel facilitează efectuarea unor afirmaţii fluente privind răspunsurile JSON. Folosind metoda `AssertFluentJson`, poți trece de
o închidere care oferă o instanță de `framework/contracts/testing.AssertableJSON`. Această instanță vă permite să verificați valoarea sau condițiile specifice
în răspunsul JSON returnat de solicitarea dvs.

De exemplu, puteţi utiliza metoda "Unde" pentru a afirma că o anumită valoare există în răspunsul JSON, și metoda
`Missing` pentru a se asigura că un atribut nu este prezent.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (json contractstesting.AssertableJSON) {
   json.Where("id", float64(1)).
    Where("name", "bowen").
    WhereNot("lang", "en").
    Missing("password")
        })
}
```

### Assering atribut Prezență / Absență

Dacă doriți să verificați dacă un atribut este prezent sau lipsește, Goravel îl face simplu cu metodele `Has` și `Missing`
.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("username").
            Missing("password")
})
```

De asemenea, puteţi afirma prezenţa sau absenţa mai multor atribute simultan folosind `HasAll` şi `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Dacă trebuie doar să verificați pentru prezența a cel puțin un atribut dintr-o listă, folosiți metoda `HasAny`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### Realizarea de Asserții JSON

Când un răspuns conține o colecție de obiecte sub o cheie numită, poți folosi diferite metode pentru a aserti structura
și conținutul.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(tx http.Context) http. esponse {
    elemente := []Item{
        {ID: 1},
        {ID: 2},
    }
    return ctx. esponse().Json(200, map[string]{
  "articole": articole,
    })
}
```

Puteţi utiliza metoda `Count` pentru a verifica numărul de elemente din colectare. Pentru a afirma proprietățile primului element
folosiți metoda `First`, care oferă o instanță de `AssertableJson`. Similarly, the `Each` method allows you
to iterate over all elements and assert their properties individually. Alternativ, metoda `HasWithScope` combină
funcţionalitatea `First` şi `Count`, vă permite să afirmați atât primul element, cât și conținutul său în timp ce furnizați
o instanță `AssertableJson` pentru aserțiuni mărunțite.

```go
// Count and First
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.Count("items", 2).
            First("items", func(json contractstesting.AssertableJSON) {
                json.Where("id", 1)
            })
    })

// Each
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.Count("items", 2).
            Each("items", func(json contractstesting.AssertableJSON) {
                json.Has("id")
            })
    })

// HasWithScope
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("items", 2, func(json contractstesting.AssertableJSON) {
            json.Where("id", 1)
        })
    })
```

## Asserturi Disponibile

### Asserții de răspuns

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

### AssertAcceptat

Asfiră că răspunsul are un cod de stare HTTP `202 acceptat` :

```go
response.AssertAccepted()
```

### AssertBadRequest

Asfiră că răspunsul are codul de stare HTTP `400 Bad Request`:

```go
răspunse.AssertBadRequest()
```

### AssertConflict

Asfircă răspunsul are un cod de stare HTTP `409`Conflict\` :

```go
răspuns.AssertConflict()
```

### AssertCookie

Asser ca raspunsul contine un cookie cu numele si valoarea specificate:

```go
response.AssertCookie("name", "value")
```

### AssertCookieExpirat

Asserte ca cookie-ul specificat a expirat:

```go
response.AssertCookieExpired("nume")
```

### AssertCookieLipsă

Asser ca raspunsul nu contine un cookie cu numele specificat:

```go
Răspunse.AssertCookieMissing("nume")
```

### AssertCookieNotExpirat

Asserturi ca cookie-ul specificat nu a expirat:

```go
response.AssertCookieNotExpired("nume")
```

### AssertCreat

Asfiră că răspunsul are un cod de stare HTTP `201 creat` :

```go
răspuns.AssertCreat()
```

### AssertDontSee

Asfiră că răspunsul nu conține valorile specificate. Al doilea parametru (opțional) determină dacă la
scapă caractere speciale din valori înainte de verificare. Dacă nu este furnizată, este adevărată în mod implicit.

```go
response.AssertDontSee([]string{"<div>"}, falsă) // Nu scăpa de caractere speciale
```

### AssertExactJson

Asfircă răspunsul JSON se potriveşte exact cu `harta[string]oferită`:

```go
response.AssertExactJson(harta[string]any{"created": true})
```

### AssertFluentJson

Asestază răspunsul JSON folosind o interfaţă fluentă:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### AssertForbidden

Asfiră că răspunsul are codul de stare HTTP `403 Forbidden`:

```go
response.AssertForbidden()
```

### AssertGăsit

Assertă că răspunsul are un cod de stare HTTP `302 Found` :

```go
response.AssertFound()
```

### AssertGone

Asfiră că răspunsul are un cod de stare HTTP `410 Gone`:

```go
response.AssertGone()
```

### AssertHeader

Afirmație că răspunsul conține antetul specificat cu valoarea dată:

```go
response.AssertHeader("Conținut-Type", "cerere/json")
```

### AssertHeaderLipsă

Asfiră că răspunsul nu conține antetul specificat:

```go
răspuns.AssertHeaderMissing("X-Custom-Header")
```

### AssertInternalServerEroare

Asfiră că răspunsul are un cod de stare HTTP de eroare `500 Intern` :

```go
response.AssertInternalServerError()
```

### AssertJson

Aduce că răspunsul JSON conţine fragmentul furnizat:

```go
response.AssertJson(harta[string]any{"created": true})
```

### AssertJsonLipsă

Asfiră că cheile sau valorile specificate lipsesc din răspunsul JSON:

```go
response.AssertJsonMissing(harta[string]any{"creat": false})
```

### AssertMethodNotAllowed

Assertă că răspunsul are un cod de stare HTTP `405 Method Not allowed`:

```go
răspunse.AssertMethodNotAllowed()
```

### AssertMovedPermanent

Assertă că răspunsul are codul HTTP `301 Muted Permanently` :

```go
response.AssertMovedPermanently()
```

### AssertNoContent

Asfiră că răspunsul are codul `204 Fără conţinut` HTTP :

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Asfiră că răspunsul are codul de stare HTTP `406 Nu este acceptabil` :

```go
response.AssertNotable()
```

### AssertNotFound

Asfiră că răspunsul are codul de stare HTTP `404 Nu a fost găsit` :

```go
response.AssertNotFound()
```

### AssertNotat

Asfiră că răspunsul are codul de stare HTTP `304 Not Modified`:

```go
răspuns.AssertNotModified()
```

### AssertOk

Asfiră că răspunsul are un cod de stare HTTP `200 OK`:

```go
response.AssertOk()
```

### AssertPartialConținut

Asfiră că răspunsul are un cod de stare HTTP `206 conţinut parţial`:

```go
răspunse.AssertPartialContent()
```

### AssertPaymentNecesar

Assertează că răspunsul are un cod de stare HTTP `402 Payment necesar` :

```go
răspunse.AssertPaymentNecesar()
```

### AssertRequestTimeout

Asfircă răspunsul are codul de stare HTTP `408 Request Timeout`:

```go
răspuns.AssertRequestTimeout()
```

### AssertVezi

Aduce că răspunsul conţine valorile specificate. Al doilea parametru (opțional) determină dacă să scape de
caractere speciale din valori înainte de verificare. Dacă nu este furnizat, acesta este implicit la `true`.

```go
response.AssertSee([]string{"<div>"}, falsă) // Nu scăpa de caractere speciale
```

### AssertSeeInOrder

Afirmație că răspunsul conține valorile specificate în ordinea dată. Al doilea parametru (opțional) determină
dacă să scape de caractere speciale din valori înainte de verificare. Dacă nu este furnizat, acesta este implicit la `true`.

```go
Răspunse.AssertSeeInOrder([]string{"Prima", "Secund"}, false) // Nu scăpa de caractere speciale
```

### AssertServerError

Asserdă că răspunsul are o eroare de server (>= 500, < 600) cod de stare HTTP:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Asfiră că răspunsul are un cod de stare HTTP \`503 Service Unavailable\`\` :

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Asfircă răspunsul are codul de stare HTTP specificat:

```go
response.AssertStatus(200)
```

### AssertSuccesul

Assertează că răspunsul are un cod de stare HTTP cu succes (2xx):

```go
Răspunse.AssertSuccessful()
```

### AssertTemporaryRedirect

Asfiră că răspunsul are un cod `307 Redirecționare temporară` HTTP stare:

```go
răspuns.AssertTemporaryRedirect()
```

### AssertTooManyRequests

Asfiră că răspunsul are codul de stare HTTP `429 Prea multe cereri` :

```go
răspuns.AssertTooManyRequests()
```

### AssertUnautorizat

Assertează că răspunsul are un cod de stare HTTP `401 neautorizat` :

```go
response.AssertUnauthorised ()
```

### AssertUnprocessableEntitate

Asfiră că răspunsul are un cod de stare HTTP `422 Unprocesabil` :

```go
răspuns.AssertUnprocessableEnty()
```
