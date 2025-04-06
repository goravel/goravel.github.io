# HTTP-test

När du bygger webbapplikationer måste du ofta testa om dina HTTP-förfrågningar fungerar korrekt från början till slut.
Goravel's testing tools make this straightforward - you can simulate requests and verify responses without setting up
complex test environments.

## Gör förfrågningar

Testa HTTP-slutpunkter i Goravel använder ett enkelt mönster. Börja med `Http`-metoden från din `TestCase`, som behöver
en `*testing.T`-parameter för påståenden. Detta ger dig ett förfrågningsobjekt (`framee/contracts/testing.TestRequest`)
som hanterar alla vanliga HTTP-verb som `Get`, `Post` och `Put`.

Istället för att göra riktiga HTTP-samtal, dessa metoder simulera din applikations begäran cykel internt. Varje begäran
returnerar ett svarsobjekt (`framee/contracts/testing.TestResponse`) med metoder för att kontrollera resultaten.

Här är ett grundläggande exempel:

```go
func (s *ExempelTestSuite) TestIndex() {
 response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Anpassa förfrågningsrubriker

Du kan anpassa förfrågningsrubriker med antingen `WithHeader` för ett enda huvud eller `WithHeaders` för flera rubriker:

```go
func (s *ExempelTestSuite) TestIndex() {
    // Single header
    response, err := s.Http(s.T()). ithHeader("X-Custom-Header", "Värde").Get("/users/1")
    
    // Flera headers
    svar, err := s. ttp(s.T()). ithHeaders(karta[string]string{
        "X-Custom-Header": "Value",
        "Acceptera": "application/json",
    }). et("/users/1")
}
```

### Cookies

Du kan använda antingen `WithCookie` eller `WithCookies`-metoden för att ställa in cookie-värde innan du gör en begäran.

```go
func (s *ExempelTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithCookie("namn", "krishan"). et("/users/1")

 // eller använd WithHeaders för flera Headers
 respons, err := s. ttp(s.T()). ithHeader(karta[string]string{
        "namn": "krishan",
        "lang": "sv",
    }). et("/users/1")
}
```

### Med Session

Du kan ställa in data till sessionen med hjälp av `WithSession`-metoden:

```go
func (s *ExempelTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(karta[string]any{"roll": "admin"}).Get("/users/1")
}
```

### Felsöka svar

Efter begäran kan du använda `Session`, `Headers`, `Content`, `Cookies` eller `Json` metod för att kontrollera data som returneras från
begäran.

```go
func (s *ExempelTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(karta[string]any{"roll": "admin"}). et("/users/1")
 
 innehåll, err := response.Content()
 
 cookies := response. ookies()
 
 headers := response.Headers()
 
 json, err := respons. son() // responskropp tolkad som json (karta[string]any)
 
 session, err := respons. ession() // returnerar alla värden som lagras i den aktuella sessionen
}
```

## Bygger kropp

För metod som `Post`, `Put`, `Radera` etc. Goravel accepterar `io.Reader` som andra argument. För att förenkla byggandet av
nyttolaster tillhandahåller ramverket användningsmetoder för att konstruera förfrågningsorgan.

```go
importera "github.com/goravel/frameing/support/http"

func (s *ExempelTestSuite) TestIndex() {
    builder := http.NewBody(). etField("namn", "krishan")
    
    kropp, err := byggare. uild()

    svar, err := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## Testar Json API:er

Goravel ger flera hjälpare för att testa JSON API svar effektivt. Det försöker att unmarshal svarskroppen i
a Go \`map[string]någon. Om undantagstillståndet misslyckas kommer också de tillhörande påståendena att misslyckas.

```go
func (s *ExempelTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 svar.AssertStatus(201).
  AssertJson (karta[string]any{
   "skapade": sant,
        })
}
```

För att komma åt den oslagbara JSON direkt, använd `Json`-metoden på `TestResponse`. Detta låter dig inspektera enskilda
element av responskroppen.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
`AssertJson`-metoden kontrollerar om svaret innehåller alla angivna värden, även om svaret innehåller
ytterligare fält. Det kräver inte en exakt matchning om du inte använder `AssertExactJson`.
:::

### Tillsätter exakta JSON-matchningar

Om du behöver verifiera att svaret matchar din förväntade JSON exakt (med inga extra eller saknade fält), använd
`AssertExactJson` -metoden.

```go
func (s *ExempelTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 svar.AssertStatus(201).
  AssertExactJson (karta[string]any{
   "skapade": sant,
        })
}
```

### Fluent JSON Testing

Goravel gör det enkelt att göra flytande påståenden om JSON-svar. Med hjälp av `AssertFluentJson`-metoden kan du skicka
en stängning som ger en instans av `framee/contracts/testing.AssertableJSON`. Denna instans låter dig kontrollera
specifika värden eller villkor i JSON-svaret som returneras av din begäran.

Till exempel kan du använda `Where`-metoden för att hävda att ett visst värde finns i JSON-svaret, och
`Missing`-metoden för att säkerställa att ett attribut inte är närvarande.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExempelTestSuite) TestIndex() {
    response, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson (func (json contractstesting.AssertableJSON) {
   json.Var("id", float64(1)).
    Var("namn", "bowen").
    WhereNot("lang", "sv").
    saknas("lösenord")
        })
}
```

### Tilldelar attributnärvaro / Frånvaro

Om du vill kontrollera om ett attribut är närvarande eller saknas, gör Goravel det enkelt med `Has` och `Missing`
metoder.

```go
response.AssertStatus(201).
    AssertFluentJson (func (json contractstesting.AssertableJSON) {
        json.Has("användarnamn").
            saknas("lösenord")
})
```

Du kan också hävda närvaron eller frånvaron av flera attribut samtidigt med `HasAll` och` MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Om du bara behöver kontrollera förekomsten av minst ett attribut från en lista, använd `HasAny`-metoden.

```go
response.AssertStatus(201).
    AssertFluentJson (func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"användarnamn", "e-post"})
})
```

### Omfattande JSON-samlingsbidragen

När ett svar innehåller en samling objekt under en namngiven nyckel, kan du använda olika metoder för att hävda sin struktur
och innehåll.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    objekt := []Föremål{
        {ID: 1},
        {ID: 2},
    }
    retur ctx. esponse().Json(200, karta[string]{
  "objekt": objekt,
    })
}
```

Du kan använda `Count`-metoden för att verifiera antalet element i samlingen. För att hävda egenskaper för det första
-elementet, använd `First`-metoden, vilket ger en instans av `AssertableJson`. På samma sätt tillåter `Each`-metoden dig
att iterera över alla element och hävda sina egenskaper individuellt. Alternativt kombinerar `HasWithScope`-metoden
funktionaliteten i `First` och `Count`, låter dig hävda både det första elementet och dess innehåll samtidigt som du tillhandahåller
en `AssertableJson`-instans för omfångade påståenden.

```go
// Count and First
response.AssertStatus(200).
    AssertFluentJson (func(json contractstesting. ssertableJSON) {
        json.Count("föremål", 2).
            Första("föremål", funktion(json kontraktstagande). ssertableJSON) {
                json. här ("id", 1)
            })
    })

// Varje
svar. ssertStatus(200).
    AssertFluentJson (func(json contractstesting.AssertableJSON) {
        json. belopp("objekt", 2).
            varje("objekt", funktion(json kontraktsbestämning). ssertableJSON) {
                json. as("id")
            })
    })

// HasWithScope
svar. ssertStatus(200).
    AssertFluentJson (func(json contractstesting.AssertableJSON) {
        json.HasWithScope("artiklar", 2, func(json contractstesting. ssertableJSON) {
            json. här("id", 1)
        })
})
```

## Tillgängliga Assertions

### Svar Assertions

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

### Tillåten accepterad

Anser att svaret har en `202 Accepted` HTTP-statuskod:

```go
response.AssertAccepted()
```

### AssertBadRequest

Anser att svaret har en `400 Bad Request` HTTP-statuskod:

```go
response.AssertBadRequest()
```

### AssertKonflikt

Anser att svaret har en `409 Conflict` HTTP-statuskod:

```go
response.AssertConflict()
```

### AssertCookie

Anser att svaret innehåller en cookie med det angivna namnet och värdet:

```go
response.AssertCookie("namn", "värde")
```

### AssertCookieUtgången

Anser att den angivna cookien har gått ut:

```go
response.AssertCookieUtgången ("namn")
```

### AssertCookieSaknas

Anser att svaret inte innehåller en cookie med det angivna namnet:

```go
response.AssertCookieMiss("namn")
```

### AssertCookieNotUtgången

Anser att den angivna cookien inte har löpt ut:

```go
response.AssertCookieNotUtgången ("namn")
```

### Assertskapad

Anser att svaret har en `201 Created` HTTP-statuskod:

```go
response.AssertCreated()
```

### AssertDontSee

Anser att svaret inte innehåller de angivna värdena. Den andra parametern (valfritt) avgör om
ska fly specialtecken i värdena innan du kontrollerar. Om den inte tillhandahålls, är den standard sant.

```go
response.AssertDontSee([]string{"<div>"}, false) // Undvik inte specialtecken
```

### AssertExactJson

Anser att svaret JSON matchar exakt den angivna `map[string]any`:

```go
response.AssertExactJson (karta[string]any{"created": true})
```

### AssertFluentJson

Tilldelar svaret JSON med hjälp av ett flytande gränssnitt:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson (func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### Förbjuden

Anser att svaret har en `403 Förbjudna` HTTP-statuskod:

```go
response.AssertFörbjuden ()
```

### Tillåten

Anser att svaret har en `302 Found` HTTP-statuskod:

```go
response.AssertFound()
```

### Borta

Anser att svaret har en `410 Gone` HTTP-statuskod:

```go
response.AssertGone()
```

### AssertHeader

Anser att svaret innehåller det angivna huvudet med det angivna värdet:

```go
response.AssertHeader("Content-Type", "application/json")
```

### AssertHeaderMissing

Anser att svaret inte innehåller det angivna huvudet:

```go
svar.AssertHeaderMissa ("X-Custom-Header")
```

### AssertInternalServerError

Anser att svaret har en `500 Internal Server` Error HTTP statuskod:

```go
response.AssertInternalServerError()
```

### AssertJson

Anser att svaret JSON innehåller det medföljande fragmentet:

```go
response.AssertJson(karta[string]any{"created": true})
```

### AssertJsonSaknas

Anser att de angivna nycklarna eller värdena saknas i svaret JSON:

```go
response.AssertJsonMissing(karta[string]any{"created": false})
```

### AssertMethodNotTillåten

Anser att svaret har en `405 Metod ej tillåtet` HTTP-statuskod:

```go
response.AssertMethodNotAllowed()
```

### AssertMovedPermanent

Anser att svaret har en `301 Moved Permanently` HTTP-statuskod:

```go
response.AssertMovedPermanently()
```

### AssertNoContent

Anser att svaret har en `204 No Content` HTTP-statuskod:

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Anser att svaret har en `406 Not Acceptable` HTTP statuskod:

```go
response.AssertNotAcceptable()
```

### AssertNotFound

Anser att svaret har en `404 Not Found` HTTP-statuskod:

```go
response.AssertNotFound()
```

### AssertNotModifierad

Anser att svaret har en `304 Inte Ändrad` HTTP-statuskod:

```go
response.AssertNotModified()
```

### Tilldelad

Anser att svaret har en `200 OK` HTTP-statuskod:

```go
response.AssertOk()
```

### AssertPartiellt innehåll

Anser att svaret har en `206 Partiellt Innehåll` HTTP-statuskod:

```go
response.AssertPartialContent()
```

### PåbetalningKrävs

Anser att svaret har en `402 Payment Required` HTTP-statuskod:

```go
response.AssertPaymentRequired()
```

### TilldelningsförfråganTimeout

Anser att svaret har en `408 Request Timeout` HTTP-statuskod:

```go
response.AssertRequestTimeout()
```

### AssertSee

Anser att svaret innehåller angivna värden. Den andra parametern (valfritt) avgör om man ska komma undan
specialtecken i värdena innan man kontrollerar. Om den inte tillhandahålls, är det standard för `true`.

```go
response.AssertSee([]string{"<div>"}, false) // Undvik inte specialtecken
```

### AssertSeeInOrder

Asserts that the response contains the specified values in the given order. The second parameter (optional) determines
whether to escape special characters in the values before checking. Om den inte tillhandahålls, är det standard för `true`.

```go
response.AssertSeeInOrder([]string{"First", "Second"}, false)  // Do not escape special characters
```

### AssertServerError

Asserts that the response has a server error (>= 500 , < 600) HTTP status code:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Asserts that the response has a `503 Service Unavailable` HTTP status code:

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Asserts that the response has the specified HTTP status code:

```go
response.AssertStatus(200)
```

### AssertSuccessful

Asserts that the response has a successful HTTP status code (2xx):

```go
response.AssertSuccessful()
```

### AssertTemporaryRedirect

Asserts that the response has a `307 Temporary Redirect` HTTP status code:

```go
response.AssertTemporaryRedirect()
```

### AssertTooManyRequests

Asserts that the response has a `429 Too Many Requests` HTTP status code:

```go
response.AssertTooManyRequests()
```

### AssertUnauthorized

Asserts that the response has a `401 Unauthorized` HTTP status code:

```go
response.AssertUnauthorized()
```

### AssertUnprocessableEntity

Asserts that the response has a `422 Unprocessable Entity` HTTP status code:

```go
response.AssertUnprocessableEntity()
```
