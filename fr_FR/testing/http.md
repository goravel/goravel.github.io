# Tests HTTP

Lors de la construction d'applications web, vous devrez souvent tester si vos requêtes HTTP fonctionnent correctement du début à la fin.
Goravel's testing tools make this straightforward - you can simulate requests and verify responses without setting up
complex test environments.

## Faire des demandes

Le test de points de terminaison HTTP à Goravel utilise un motif simple. Commencez avec la méthode `Http` de votre `TestCase`, qui a besoin de
un paramètre `*testing.T` pour les assertions. Cela vous donne un objet de requête (`framework/contracts/testing.TestRequest`)
qui gère tous les verbes HTTP communs comme `Get`, `Post` et `Put`.

Au lieu de faire de vrais appels HTTP, ces méthodes simulent le cycle de requête de votre application en interne. Chaque requête
retourne un objet de réponse (`framework/contracts/testing.TestResponse`) avec des méthodes pour vérifier les résultats.

Voici un exemple de base :

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Personnaliser les en-têtes de la requête

Vous pouvez personnaliser les en-têtes de requête en utilisant soit `WithHeader` pour un seul en-tête, soit `WithHeaders` pour plusieurs en-têtes :

```go
func (s *ExampleTestSuite) TestIndex() {
    // en-tête unique
    réponse, err := s.Http(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Plusieurs en-têtes
    réponse, errr := s. ttp(s.T()). ithHeaders(map[string]string{
        "X-Custom-Header": "Valeur",
        "Accepter": "application/json",
    }). et("/users/1")
}
```

### Cookies

Vous pouvez utiliser la méthode `WithCookie` ou `WithCookies` pour définir la valeur des cookies avant de faire une demande.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 // ou utilisez WithHeaders pour plusieurs en-têtes
 réponse, errr := s. ttp(s.T()). ithHeader(map[string]string{
        "name": "krishan",
        "lang": "en",
    }). et("/users/1")
}
```

### Avec la session

Vous pouvez définir les données à la session en utilisant la méthode `WithSession`:

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Réponses de débogage

Après avoir fait la requête, vous pouvez utiliser la méthode `Session`, `Headers`, `Content`, `Cookies` ou `Json` pour vérifier les données retournées depuis
la requête.

```go
func (s *ExampleTestSuite) TestIndex() {
 response, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}). et("/users/1")
 
 contenu, err := response.Content()
 
 cookies := réponse. ookies()
 
 en-têtes := response.Headers()
 
 json, err := réponse. son() // corps de réponse analysé comme json(map[string]any)
 
 session, err := réponse. ession() // retourne toutes les valeurs stockées dans la session de requête courante
}
```

## Corps du Bâtiment

Pour la méthode comme `Post`, `Put`, `Delete` etc. Goravel accepte `io.Reader` comme second argument. Pour simplifier la construction des blocs
, le framework fournit des méthodes utilitaires pour construire des organes de requête.

```go
import "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("name", "krishan")
    
    corps, erreur := constructeur. uild()

    réponse, erreur := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## Test des API Json

Goravel fournit plusieurs aides pour tester efficacement les réponses de l'API JSON. Il tente de démarteler le corps de la réponse en
une `carte[string]n'importe qui`. Si le non-marquage échoue, les assertions associées échoueront également.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": true,
        })
}
```

Pour accéder au JSON non marshalled directement, utilisez la méthode `Json` sur `TestResponse`. Cela vous permet d'inspecter les éléments
individuels du corps de réponse.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
The `AssertJson` method checks whether the response contains all the specified values, even if the response includes
additional fields. Il ne nécessite pas de correspondance exacte à moins que vous n'utilisiez `AssertExactJson`.
:::

### Affectation des correspondances JSON exactes

Si vous devez vérifier que la réponse correspond exactement à votre JSON attendu (avec aucun champ supplémentaire ou manquant), utilisez la méthode
`AssertExactJson`.

```go
func (s *ExampleTestSuite) TestIndex() {
    response, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Goravel facilite la réalisation d'assertions courantes sur les réponses JSON. En utilisant la méthode `AssertFluentJson`, vous pouvez passer
une fermeture qui fournit une instance de `framework/contracts/testing.AssertableJSON`. This instance allows you to check
specific values or conditions in the JSON response returned by your request.

Par exemple, vous pouvez utiliser la méthode `Where` pour affirmer qu'une valeur particulière existe dans la réponse JSON, et la méthode
`Missing` pour s'assurer qu'un attribut n'est pas présent.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex() {
    response, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (json contractstesting.AssertableJSON) {
   json.Where("id", float64(1)).
    Où("name", "bowen").
    WhereNot("lang", "fr").
    Manquant ("mot de passe")
        })
}
```

### Asserting Attribut Présence / Absence

Si vous voulez vérifier si un attribut est présent ou manquant, Goravel le rend simple avec les méthodes `Has` et `Missing`
.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("nom d'utilisateur").
            Manquant ("mot de passe")
})
```

Vous pouvez également affirmer la présence ou l'absence d'attributs multiples à la fois en utilisant `HasAll` et `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Si vous avez seulement besoin de vérifier la présence d'au moins un attribut d'une liste, utilisez la méthode `HasAny`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### Assertions de collections JSON de portée

Lorsqu'une réponse contient une collection d'objets sous une clé nommée, vous pouvez utiliser diverses méthodes pour affirmer sa structure
et son contenu.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    items := []Item{
        {ID: 1},
        {ID: 2},
    }
    retourner ctx. esponse().Json(200, map[string]{
  "items": items,
    })
}
```

Vous pouvez utiliser la méthode `Count` pour vérifier le nombre d'éléments dans la collection. Pour affirmer les propriétés du premier élément
, utilisez la méthode `First`, qui fournit une instance de `AssertableJson`. De même, la méthode `Each` vous permet
d'itérer sur tous les éléments et d'affirmer leurs propriétés individuellement. Alternativement, la méthode `HasWithScope` combine
les fonctionnalités de `First` et `Count`, vous permettant d'affirmer à la fois le premier élément et son contenu tout en fournissant
une instance `AssertableJson` pour les assertions étendues.

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

## Assertions disponibles

### Assertions de réponse

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

### Accepté

Affecte que la réponse a un code de statut HTTP `202 Accepted` :

```go
AssertAccepted()
```

### AssertBadRequête

Assure que la réponse a un code de statut HTTP `400 Bad Request` :

```go
AssertBadRequest()
```

### Conflit d'Assert

Affecte que la réponse a un code de statut HTTP `409 Conflict` :

```go
AssertConflict()
```

### AssertCookie

Assure que la réponse contient un cookie avec le nom et la valeur spécifiés :

```go
AssertCookie("nom", "valeur")
```

### Ce cookie a expiré

Vérifie que le cookie spécifié a expiré:

```go
Le cookie de réponse a expiré ("nom")
```

### AssertCookie manquant

Affecte que la réponse ne contient pas de cookie avec le nom spécifié :

```go
AssertCookie manquant ("nom")
```

### Ce cookie n\'a pas expiré

Vérifie que le cookie spécifié n'a pas expiré:

```go
AssertCookie non expiré ("nom")
```

### Assert créé

Affecte que la réponse a un code de statut HTTP `201 Created` :

```go
AssertCreated()
```

### AssertDontSee

Affecte que la réponse ne contient pas les valeurs spécifiées. Le deuxième paramètre (optionnel) détermine si à
échappez les caractères spéciaux dans les valeurs avant de vérifier. S'il n'est pas fourni, la valeur par défaut est true.

```go
response.AssertDontSee([]string{"<div>"}, false) // N'échappe pas aux caractères spéciaux
```

### AssertExactJson

Asserts que la réponse JSON correspond exactement à la `carte[string]fournie`:

```go
AssertExactJson (mapper[string]any{"created": true})
```

### AssertFluentJson

Asserte la réponse JSON en utilisant une interface courante:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### Recommandé

Affecte que la réponse a un code de statut HTTP `403 Forbidden` :

```go
AssertForbidden()
```

### Assert(s) trouvé(s)

Affecte que la réponse a un code de statut HTTP `302 Found` :

```go
AssertFound()
```

### AssertGone

Affecte que la réponse a un code d'état HTTP `410 Gone` :

```go
response.AssertGone()
```

### AssertEn-tête

Affecte que la réponse contient l'en-tête spécifié avec la valeur donnée :

```go
AssertHeader("Content-Type", "application/json")
```

### AssertHeaderManquant

Affecte que la réponse ne contient pas l'en-tête spécifié:

```go
AssertHeaderManquant ("X-Custom-Header")
```

### Erreur de serveur interne

Affecte que la réponse a un code d'état HTTP `500 Internal Server` d'erreur:

```go
response.AssertInternalServerError()
```

### AssertJson

Affecte que le JSON de la réponse contient le fragment fourni :

```go
AssertJson(mapper[string]any{"created": true})
```

### AssertJsonManquant

Asserts que les clés ou valeurs spécifiées sont manquantes dans la réponse JSON :

```go
AssertJsonMissing(mapper[string]any{"created": false})
```

### Cette méthode n'est pas autorisée

Affecte que la réponse a un code de statut HTTP `405 Method Not Allowed` :

```go
AssertMethodNotAllowed()
```

### AssertDéplacement permanent

Affecte que la réponse a un code de statut HTTP `301 déplacé de manière permanente` :

```go
AssertMovedPermanently()
```

### AssertNoContent

Affecte que la réponse a un code d'état HTTP `204 No Content` :

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Affecte que la réponse a un code de statut HTTP `406 Not Acceptable` :

```go
AssertNotAcceptable()
```

### Assert introuvable

Affecte que la réponse a un code de statut HTTP `404 Not Found` :

```go
AssertNotFound()
```

### Assert non modifié

Affecte que la réponse a un code de statut HTTP `304 Not Modified` :

```go
AssertNotModified()
```

### AssertOk

Assure que la réponse a un code de statut HTTP `200 OK`:

```go
response.AssertOk()
```

### Assigner un contenu partiel

Affecte que la réponse a un code d'état HTTP `206 Partial Content` :

```go
AssertPartialContent()
```

### Paiement obligatoire

Affecte que la réponse a un code d'état HTTP `402 Paiement requis` :

```go
AssertPaymentRequired()
```

### Délai d'attente dépassé

Assure que la réponse a un code de statut HTTP `408 Request Timeout` :

```go
AssertRequestTimeout()
```

### AssertVoir

Affecte que la réponse contient les valeurs spécifiées. The second parameter (optional) determines whether to escape
special characters in the values before checking. Si elle n'est pas fournie, la valeur par défaut est `true`.

```go
response.AssertSee([]string{"<div>"}, false) // N'échappez pas les caractères spéciaux
```

### AssertSeeInOrder

Affecte que la réponse contient les valeurs spécifiées dans l'ordre donné. Le deuxième paramètre (optionnel) détermine
s'il faut échapper les caractères spéciaux dans les valeurs avant de vérifier. Si elle n'est pas fournie, la valeur par défaut est `true`.

```go
response.AssertSeeInOrder([]string{"First", "Second"}, false) // N'échappez pas les caractères spéciaux
```

### AssertServerError

Affecte que la réponse a une erreur de serveur (>= 500 , < 600) code de statut HTTP :

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Affecte que la réponse a un code d'état HTTP `503 Service Unavailable` :

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Affecte que la réponse a le code de statut HTTP spécifié:

```go
response.AssertStatus(200)
```

### Succès

Vérifie que la réponse a un code de statut HTTP réussi (2xx) :

```go
AssertSuccessful()
```

### AssertRedirection temporaire

S'assure que la réponse a un code d'état HTTP `307 Temporary Redirect` :

```go
AssertTemporaryRedirect()
```

### AssertTon nombre de demandes

Affecte que la réponse a un code de statut HTTP `429 Too Requests` :

```go
AssertTooManyRequests()
```

### Assigner une autorisation non autorisée

Affecte que la réponse a un code d'état HTTP `401 Unauthorized` :

```go
AssertUnauthorized()
```

### AssertUnprocessable Entity

Affecte que la réponse a un code d'état HTTP `422 Unprocessable Entity` :

```go
AssertUnprocessableEntity()
```
