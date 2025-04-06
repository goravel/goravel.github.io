# HTTP Testen

Bij het maken van webapplicaties moet u vaak testen of uw HTTP-verzoeken van begin tot eind goed werken.
De testtools van Goravels maken dit eenvoudig - je kunt verzoeken simuleren en antwoorden verifiëren zonder
complexe testomgevingen op te zetten.

## Maak verzoeken

Het testen van HTTP eindpunten in Goravel gebruikt een eenvoudig patroon. Begin met de `Http` methode van uw `TestCase`, die
een `*testing.T` parameter nodig heeft voor asserties. Dit geeft je een verzoek-object (`framework/contracts/testing.TestRequest`)
dat alle gebruikelijke HTTP-werkwoorden zoals `Get`, `Post`, en `Put`.

In plaats van echte HTTP-oproepen te doen, simuleren deze methoden de aanvraagcyclus van uw applicatie intern. Elke aanvraag
geeft een reactie object (`framework/contracts/testing.TestResponse`) met methoden om de resultaten te controleren.

Hier is een simpel voorbeeld:

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Aanvraag headers aanpassen

Je kunt aanvraagheaders aanpassen door `WithHeader` te gebruiken voor een enkele header of `WithHeaders` voor meerdere headers:

```go
func (s *ExampleTestSuite) {
    // Enkele header
    response, err := s.Http(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Meerdere headers
    response, err := s. ttp(s.T()). ithHeaders(map[string]string{
        "X-Custom-Header": "Waarde",
        "Accepteren": "application/json",
    }). et("/users/1")
}
```

### Koekjes

U kunt de `WithCookie` of de `WithCookies` methode gebruiken om de waarde van cookies in te stellen voordat u een verzoek doet.

```go
func (s *ExampleTestSuite) {
 respons, err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 // of gebruik WithHeaders voor meerdere Headers
 respons, err := s. ttp(s.T()). ithHeader(map[string]string{
        "naam": "krishan",
        "lang": "en",
    }). et("/users/1")
}
```

### Opname

U kunt de gegevens instellen op de sessie met behulp van de methode `WithSession`:

```go
func (s *VoorbeeldTestSuite) TestIndex() {
 respons, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Foutopsporing antwoorden

Na het doen van een verzoek kunt u `Session`, `Headers`, `Content`, `Cookies` of `Json` methode gebruiken om gegevens van
het verzoek te bekijken.

```go
func (s *VoorbeeldTestSuite) {
 reactie, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}). et("/users/1")
 
 inhoud, err := response.Content()
 
 cookies := antwoord. ookies()
 
 headers := response.Headers()
 
 json, err := antwoord. son() // reactie lichaam geparseerd als json(kaart[string]any)
 
 sessie, err := antwoord. ession() // retourneert alle waarden die zijn opgeslagen in de huidige sessie
}
```

## Bouwen body

Voor methode zoals `Post`, `Put`, `Delete` etc. Goravel accepteert `io.Reader` als tweede argument. Om de bouw van
van betaalapparatuur te vereenvoudigen, biedt het framework hulpmethoden voor het bouwen van aanvraaglichamen.

```go
importeer "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("naam", "krishan")
    
    body err := builder. uild()

    antwoord, err := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## Testen van Json API's

Goravel biedt verschillende helpers om JSON API-antwoorden effectief te testen. Het probeert de reactie-inhoud te unmarshal in
a Go `map[string]any`. Als het ongemarsheren mislukt, zullen ook de bijbehorende beweringen mislukken.

```go
func (s *ExampleTestSuite) TestIndex() {
    respons, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "aangemaakt": waar,
        })
}
```

Om de ongemarshalled JSON direct te gebruiken, gebruik je de `Json` methode op de `TestResponse`. Hiermee kun je individuele
elementen van de reactie-instantie controleren.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["aangemaakt"])
```

:::tip
De `AssertJson` methode controleert of het antwoord alle opgegeven waarden bevat, zelfs als het antwoord
extra velden bevat. Het vereist geen exacte overeenkomst tenzij je `AssertExactJson` gebruikt.
:::

### Exacte JSON overeenkomsten

Als je moet verifiëren dat de reactie overeenkomt met de verwachte JSON exact (met geen extra of ontbrekende velden), gebruik dan de
`AssertExactJson` methode.

```go
func (s *ExampleTestSuite) TestIndex() {
    respons, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "gemaakt": waar,
        })
}
```

### Fluent JSON Testing

Goravel maakt het gemakkelijk om vloeiende beweringen te doen op JSON reacties. Met behulp van de `AssertFluentJson` methode kan je
een sluiting doorsturen die een instantie van `framework/contracts/testing.AssertableJSON` biedt. Deze instantie staat u toe om
specifieke waarden of condities te controleren in het JSON antwoord geretourneerd door uw verzoek.

U kunt bijvoorbeeld de `here` methode gebruiken om te bevestigen dat er een bepaalde waarde bestaat in het JSON antwoord, en de
`Missing` methode om ervoor te zorgen dat er geen attribuut aanwezig is.

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

### Aanwezigheid van kenmerken / Afwezigheid

Als je wilt controleren of een attribuut aanwezig is of ontbreekt, maakt Goravel het eenvoudig met de `Has` en `Missing`
methoden.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("username").
            Missing("password")
})
```

Je kunt ook de aanwezigheid of afwezigheid bevestigen van meerdere attributen tegelijk met behulp van `HasAll` en `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Als je alleen hoeft te controleren op de aanwezigheid van ten minste één kenmerk van een lijst, gebruik dan de `HasAny` methode.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### JSON collectie opdrachten

Wanneer een antwoord een verzameling objecten onder een met de naam sleutel bevat, kun je verschillende methoden gebruiken om de structuur
en inhoud te doen gelden.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    items := []Item{
        {ID: 1},
        {ID: 2},
    }
    retourneert ctx. esponse().Json(200, kaart[string]{
  "items": items,
    })
}
```

Je kunt de `Count` methode gebruiken om het aantal elementen in de collectie te verifiëren. Om eigenschappen van het eerste
element te bevestigen, gebruik de `First` methode, die een instantie van `AssertableJson` biedt. Op dezelfde manier staat de `Each` methode je
toe om alle elementen over te nemen en hun eigenschappen individueel te bevestigen. Als alternatief combineert de `HasWithScope` methode
de functionaliteit van `First` en `Count`, Stelt je in staat om zowel het eerste element als de inhoud ervan te bevestigen terwijl je
een `AssertableJson` aanbiedt voor scoped assertions.

```go
// Tel en First
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting. ssertableJSON) {
        json.Count("items", 2).
            First("items", func(json contractstesting. ssertableJSON) {
                json. hier("id", 1)
            })
    })

// Elk
antwoord. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json. ount("items", 2).
            Each("items", func(json contractstesting. ssertableJSON) {
                json. as("id")
            })
    })

// HasWithScope
reactie. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("items", 2, func(json contractstesting). ssertableJSON) {
            json. hier("id", 1)
        })
})
```

## Beschikbare Assertions

### Antwoord Assertions

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

### AssertAccepted

Geeft aan dat het antwoord een '202 geaccepteerde' HTTP-statuscode heeft:

```go
reactie.AssertAccepted()
```

### AssertBadRequest

Geeft aan dat het antwoord een HTTP-statuscode `400 Bad Request` heeft.

```go
response.AssertBadRequest()
```

### AssertConflict

Geeft aan dat het antwoord een HTTP-statuscode '409 Conflict' heeft:

```go
reactie.AssertConflict()
```

### AssertCookie

Asserts dat het antwoord een cookie bevat met de opgegeven naam en waarde:

```go
response.AssertCookie("naam", "waarde")
```

### AssertCookieVerlopen

Beoordeel dat het opgegeven cookie is verlopen:

```go
response.AssertCookieVerlopen ("naam")
```

### AssertCookieMissing

Geeft aan dat het antwoord geen cookie bevat met de opgegeven naam:

```go
response.AssertCookieMissing("naam")
```

### AssertCookieNotExpired

Geeft aan dat het opgegeven cookie niet is verlopen:

```go
response.AssertCookieNotExpired("naam")
```

### AssertCreated

Geeft aan dat het antwoord een '201 gemaakt' HTTP-statuscode heeft:

```go
response.AssertCreated()
```

### AssertDontSee

Gaat ervan uit dat het antwoord niet de opgegeven waarden bevat. De tweede parameter (optioneel) bepaalt of
speciale tekens in de waarden ontsnapt voordat het controleert. Als het niet is opgegeven, dan is het onwaar!

```go
response.AssertDontSee([]string{"<div>"}, onwaar) // Speciale tekens niet ontsnappen
```

### AssertExactJson

Geeft aan dat de reactie JSON exact overeenkomt met de opgegeven `map[string]any`:

```go
response.AssertExactJson(map[string]iemand{"gemaakt": true})
```

### AssertFluentJson

Vast de reactie JSON aan met behulp van een vloeiende interface:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### AssertVerboden

Geeft aan dat het antwoord een '403 Forbidden' HTTP-statuscode heeft:

```go
response.AssertForbidden()
```

### AssertFound

Geeft aan dat het antwoord een '302 Found' HTTP-statuscode heeft:

```go
response.AssertFound()
```

### AssertGone

Geeft aan dat het antwoord een '410 Gone' HTTP-statuscode heeft:

```go
response.AssertGone()
```

### AssertHeader

Geeft aan dat het antwoord de gespecificeerde header bevat met de gegeven waarde:

```go
response.AssertHeader("Content-Type", "application/json")
```

### AssertHeaderOntbrekende

Geeft aan dat het antwoord niet de opgegeven header bevat:

```go
response.AssertHeaderMissing("X-Custom-Header")
```

### AssertInternalServerFout

Geeft aan dat het antwoord een `500 Interne Server` fout HTTP status code heeft:

```go
response.AssertInternalServerError()
```

### AssertJson

Geeft aan dat het antwoord JSON de opgegeven fragment bevat:

```go
response.AssertJson(map[string]elk {"gemaakt": true})
```

### AssertJsonMissing

Geeft aan dat de opgegeven sleutels of waarden ontbreken in de reactie JSON:

```go
response.AssertJsonMissing(map[string]iemand{"gemaakt": false})
```

### AssertMethodNotToegestaan

Geeft aan dat het antwoord een '405 Methode niet toegestaan' HTTP-statuscode heeft:

```go
response.AssertMethodNotAllowed()
```

### AssertMovedPermanent

Geeft aan dat het antwoord een `301 Permanent verplaatst` HTTP-statuscode heeft:

```go
response.AssertMovedPermanently()
```

### AssertNoContent

Geeft aan dat het antwoord een HTTP-statuscode heeft `204 No Content`:

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Geeft aan dat het antwoord een '406 Niet Acceptabele' HTTP-statuscode heeft:

```go
response.AssertNotAcceptable()
```

### AssertNotGevonden

Geeft aan dat het antwoord een '404 Not Found' HTTP-statuscode heeft:

```go
response.AssertNotFound()
```

### AssertNotfied

Geeft aan dat het antwoord een HTTP-status '304 Niet gewijzigd' heeft:

```go
response.AssertNotModified()
```

### Oké

Geeft aan dat het antwoord een '200 OK' HTTP-statuscode heeft:

```go
response.AssertOk()
```

### AssertPartialContent

Geeft aan dat het antwoord een '206 Partial Content' HTTP-statuscode heeft:

```go
response.AssertPartialContent()
```

### AssertPaymentVereist

Geeft aan dat het antwoord een `402 Payment Required` HTTP-statuscode heeft:

```go
response.AssertPaymentRequired()
```

### AssertRequestTime-out

Geeft aan dat het antwoord een '408 request Timeout' HTTP-statuscode heeft:

```go
response.AssertRequestTimeout()
```

### AssertSee

Asserts dat het antwoord de opgegeven waarden bevat. De tweede parameter (optioneel) bepaalt of u
speciale tekens in de waarden moet vrijlaten voordat u gaat controleren. Indien niet opgegeven, dan is het standaard `true`.

```go
response.AssertSee([]string{"<div>"}, onwaar) // Speciale tekens niet ontsnappen
```

### AssertSeeInorder

Geeft aan dat het antwoord de opgegeven waarden in de gegeven volgorde bevat. The second parameter (optional) determines
whether to escape special characters in the values before checking. Indien niet opgegeven, dan is het standaard `true`.

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
