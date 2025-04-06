# Pruebas HTTP

Al construir aplicaciones web, a menudo necesitará probar si sus peticiones HTTP funcionan correctamente de principio a fin.
Goravel's testing tools make this straightforward - you can simulate requests and verify responses without setting up
complex test environments.

## Hacer Solicitudes

La prueba de los endpoints HTTP en Goravel utiliza un patrón simple. Comience con el método `Http` de su `TestCase`, que necesita
un parámetro `*testing.T` para las afirmaciones. Esto le da un objeto de solicitud (`framework/contracts/testing.TestRequest`)
que maneja todos los verbos HTTP comunes como `Get`, `Post` y `Put`.

En lugar de hacer llamadas HTTP reales, estos métodos simulan internamente el ciclo de peticiones de la aplicación. Cada solicitud
devuelve un objeto de respuesta (`framework/contracts/testing.TestResponse`) con métodos para comprobar los resultados.

Aquí hay un ejemplo básico:

```go
func (s *ExampleTestSuite) TestIndex() {
 respuesta, err := s.Http(s.T()).Get("/users/1")
 s.Nil(err)
 response.AssertStatus(200)
}
```

### Personalizar cabeceras de solicitud

Puedes personalizar las cabeceras de la petición usando `WithHeader` para un solo encabezado o `WithHeaders` para múltiples cabeceras:

```go
func (s *ExampleTestSuite) TestIndex() {
    // Encabezado único
    respuesta, err := s.Http(s.T()). ithHeader("X-Custom-Header", "Value").Get("/users/1")
    
    // Múltiples cabeceras
    respuesta, err := s. ttp(s.T()). ithHeaders(map[string]string{
        "X-Custom-Header": "Value",
        "Aceptar": "application/json",
    }). et("/usuarios/1")
}
```

### Cookies

Puede utilizar el método `WithCookie` o `WithCookies` para establecer el valor de las cookies antes de hacer una solicitud.

```go
func (s *ExampleTestSuite) TestIndex() {
 respuesta, err := s.Http(s.T()).WithCookie("name", "krishan"). et("/users/1")

 // o use WithHeaders para múltiples Encabezados
 respuesta, err := s. ttp(s.T()). ithHeader(map[string]string{
        "name": "krishan",
        "lang": "es",
    }). et("/usuarios/1")
}
```

### Consesion

Puede establecer los datos a la sesión utilizando el método `WithSession`:

```go
func (s *ExampleTestSuite) TestIndex() {
 respuesta, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}).Get("/users/1")
}
```

### Respuestas de depuración

Después de hacer la solicitud, puedes usar el método `Session`, `Headers`, `Content`, `Cookies` o `Json` para comprobar los datos devueltos por
la solicitud.

```go
func (s *ExampleTestSuite) TestIndex() {
 respuesta, err := s.Http(s.T()).WithSession(map[string]any{"role": "admin"}). et("/users/1")
 
 content, err := response.Content()
 
 cookies := respuesta. ookies()
 
 cabeceras := response.Headers()
 
 json, err := respuesta. son() // cuerpo de respuesta analizado como json(map[string]any)
 
 session, err := respuesta. ession() // devuelve todos los valores almacenados en la sesión actual de solicitud
}
```

## Construyendo cuerpo

Para métodos como `Post`, `Put`, `Delete` etc. Goravel acepta `io.Reader` como segundo argumento. To simplify building
payloads, the framework provides utility methods for constructing request bodies.

```go
import "github.com/goravel/framework/support/http"

func (s *ExampleTestSuite) TestIndex() {
    builder := http.NewBody(). etField("name", "krishan")
    
    cuerpo, err := constructor. uild()

    respuesta, err := s. ttp(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", body)
}
```

## Probando APIs Json

Goravel proporciona varios ayudantes para probar las respuestas de la API JSON de forma eficaz. Intenta desarmar el cuerpo de respuesta en
a Go `map[string]any`. Si falla, las afirmaciones asociadas también fallarán.

```go
func (s *ExampleTestSuite) TestIndex() {
    respuesta, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertJson(map[string]any{
   "created": true,
        })
}
```

Para acceder directamente al JSON sin marshall, utiliza el método `Json` en el `TestResponse`. Esto le permite inspeccionar elementos
individuales del cuerpo de respuesta.

```go
json, err := response.Json()
s.Nil(err)
s.True(json["created"])
```

:::tip
The `AssertJson` method checks whether the response contains all the specified values, even if the response includes
additional fields. No requiere una coincidencia exacta a menos que utilice `AssertExactJson`.
:::

### Validar partidas JSON exactas

Si necesita verificar que la respuesta coincide exactamente con su JSON esperado (sin campos extra o faltantes), utilice el método
`AssertExactJson`.

```go
func (s *ExampleTestSuite) TestIndex() {
    respuesta, err := s.Http(s.T()).WithHeader("Content-Type", body.ContentType()).Post("/users", nil)
 s. il(err)
 
 response.AssertStatus(201).
  AssertExactJson(map[string]any{
   "created": true,
        })
}
```

### Fluent JSON Testing

Goravel hace que sea fácil realizar afirmaciones fluidas sobre las respuestas JSON. Utilizando el método `AssertFluentJson`, puede pasar
un cierre que proporciona una instancia de `framework/contracts/testing.AssertableJSON`. Esta instancia le permite comprobar
valores o condiciones específicos en la respuesta JSON devuelta por su solicitud.

Por ejemplo, puede utilizar el método `Where` para verificar que existe un valor particular en la respuesta JSON, y el método
`Missing` para asegurarse de que un atributo no está presente.

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

func (s *ExampleTestSuite) TestIndex() {
    respuesta, err := s. ttp(s.T()).Get("/users/1")
 s.Nil(err)
 
 response.AssertStatus(201).
  AssertFluentJson(func (json contractstesting.AssertableJSON) {
   json.Where("id", float64(1)).
    Dónde("nombre", "bowen").
    WhereNot("lang", "es").
    Falta ("contraseña")
        })
}
```

### Validar Presencia de Atributo / Ausencia

Si quieres comprobar si un atributo está presente o está ausente, Goravel lo hace simple con los métodos `Has` y `Missing`
.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has("username").
            Missing("password")
})
```

También puede afirmar la presencia o ausencia de múltiples atributos a la vez usando `HasAll` y `MissingAll`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
        json.Has([]string{"username", "email"}).
            MissingAll([]string{"verified", "password"})
})
```

Si solo necesita comprobar la presencia de al menos un atributo de una lista, utilice el método `HasAny`.

```go
response.AssertStatus(201).
    AssertFluentJson(func (json contractstesting.AssertableJSON) {
  json.HasAny([]string{"username", "email"})
})
```

### Asignación de aserciones de colección JSON

Cuando una respuesta contiene una colección de objetos bajo una clave nombrada, puede utilizar varios métodos para afirmar su estructura
y su contenido.

```go
type Item struct {
    ID int `json:"id"`
}

facades.Route().Get("/", func(ctx http.Context) http. esponse {
    items := []Item{
        {ID: 1},
        {ID: 2},
    }
    devolver ctx. esponse().Json(200, mapa[string]{
  "items": items,
    })
}
```

Puede utilizar el método `Count` para verificar el número de elementos en la colección. Para asertar propiedades del primer elemento
, utiliza el método `First`, el cual proporciona una instancia de `AssertableJson`. Del mismo modo, el método `Each` le permite
iterar sobre todos los elementos y afirmar sus propiedades individualmente. Alternativamente, el método `HasWithScope` combina
la funcionalidad de `Primero` y `Count`, permitiéndote afirmar tanto el primer elemento como su contenido, proporcionando
una instancia de `AssertableJson` para aserciones con escape.

```go
// Contar y Primero
response.AssertStatus(200).
    AssertFluentJson(func(json contractstesting. ssertableJSON) {
        json.Count("items", 2).
            Primero("items", func(json contractstesting. ssertableJSON) {
                json. aquí("id", 1)
            })
    })

// Cada respuesta
. SsertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json. ount("items", 2).
            Each("items", func(json contractstesting. ssertableJSON) {
                json. as("id")
            })
    })

// HasWithScope
respuesta. ssertStatus(200).
    AssertFluentJson(func(json contractstesting.AssertableJSON) {
        json.HasWithScope("items", 2, func(json contractstesting. ssertableJSON) {
            json. aquí("id", 1)
        })
})
```

## Asserciones disponibles

### Respuesta de afirmaciones

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

### Asertar Aceptado

Verifica que la respuesta tiene un código de estado HTTP `202 aceptado`:

```go
response.AssertAccepted()
```

### Solicitud de notificación incorrecta

Verifica que la respuesta tiene un código de estado HTTP `400 Bad Request`:

```go
respuesta.AssertBadRequest()
```

### Conflicto de aserción

Verifica que la respuesta tiene un código de estado HTTP `409 Conflict`:

```go
respuesta.AssertConflict()
```

### Galleta de Assert

Verifica que la respuesta contiene una cookie con el nombre y valor especificados:

```go
response.AssertCookie("nombre", "valor")
```

### AssertCookieExpirado

Verifica que la cookie especificada ha caducado:

```go
response.AssertCookieExpired("nombre")
```

### Falta la cookie de aserción

Verifica que la respuesta no contiene una cookie con el nombre especificado:

```go
response.AssertCookieMissing("nombre")
```

### No ha expirado la cookie de verificación

Verifica que la cookie especificada no ha expirado:

```go
response.AssertCookieNoteExpired("nombre")
```

### Asertar creado

Verifica que la respuesta tiene un código de estado HTTP `201 Created`:

```go
response.AssertCreated()
```

### AssertDontSee

Verifica que la respuesta no contiene los valores especificados. El segundo parámetro (opcional) determina si a
caracteres especiales de escape en los valores antes de comprobar. Si no se proporciona, el valor predeterminado es verdadero.

```go
response.AssertDontSee([]string{"<div>"}, false) // No escapar caracteres especiales
```

### AssertExactJson

Afirma que la respuesta JSON coincide exactamente con el `map[string]proporcionado cual`:

```go
response.AssertExactJson(map[string]any{"created": true})
```

### AssertFluentJson

Verifica la respuesta JSON usando una interfaz fluida:

```go
import contractstesting "github.com/goravel/framework/contracts/testing"

response.AssertFluentJson(func(json contractstesting.AssertableJSON) {
     json.Where("created", true)
})
```

### Asertar prohibido

Verifica que la respuesta tiene un código de estado HTTP `403 Forbidden`:

```go
respuesta.AssertForbidden()
```

### AsertFound

Verifica que la respuesta tiene un código de estado HTTP `302 Found`:

```go
respuesta.AssertFound()
```

### AsertGone

Verifica que la respuesta tiene un código de estado HTTP `410 Gone`:

```go
response.AssertGone()
```

### Cabecera de aserción

Verifica que la respuesta contiene la cabecera especificada con el valor dado:

```go
response.AssertHeader("Content Type", "application/json")
```

### Faltan cabeceras de aserción

Verifica que la respuesta no contiene la cabecera especificada:

```go
response.AssertHeaderMissing("Encabezado-personalizado")
```

### Error de servidor interno

Verifica que la respuesta tiene un código de estado HTTP de error `500 Internal Server`:

```go
response.AssertInternalServerError()
```

### AssertJson

Verifica que la respuesta JSON contiene el fragmento proporcionado:

```go
response.AssertJson(map[string]any{"created": true})
```

### Valoración de Jsonno

Verifica que las claves o valores especificados faltan en el JSON de respuesta:

```go
response.AssertJsonMissing(map[string]any{"created": false})
```

### Método de verificación no permitido

Verifica que la respuesta tiene un código de estado HTTP `405 Method Not Allowed`:

```go
response.AssertMethodNoPermitido()
```

### Movido de Assert Permanentemente

Verifica que la respuesta tiene un código de estado HTTP `301 Moved Permanently`:

```go
response.AssertMovedMovedly()
```

### AssertNoContent

Verifica que la respuesta tiene un código de estado HTTP `204 Sin contenido`:

```go
response.AssertNoContent()
```

### AssertNotAcceptable

Verifica que la respuesta tiene un código de estado HTTP `406 Not Acceptable`:

```go
respuesta.AssertNotAcceptable()
```

### No se ha encontrado

Verifica que la respuesta tiene un código de estado HTTP `404 Not Found`:

```go
respuesta.AssertNotFound()
```

### No se ha modificado

Verifica que la respuesta tiene un código de estado HTTP `304 Not Modified`:

```go
response.Assert no modificado()
```

### Vale

Verifica que la respuesta tiene un código de estado HTTP `200 OK`:

```go
response.AssertOk()
```

### Contenido parcial

Verifica que la respuesta tiene un código de estado HTTP \`206 Contenido Parcial:

```go
respuesta.AssertPartialContent()
```

### Pago requerido

Verifica que la respuesta tiene un código de estado HTTP `402 Payment Requerred`:

```go
response.AssertPaymentRequired()
```

### Tiempo de espera de solicitud

Verifica que la respuesta tiene un código de estado HTTP `408 Request Timeout`:

```go
respuesta.AssertRequestTimeout()
```

### Ver aserción

Verifica que la respuesta contiene los valores especificados. El segundo parámetro (opcional) determina si escapar
caracteres especiales en los valores antes de comprobar. Si no se proporciona, el valor predeterminado es `true`.

```go
response.AssertSee([]string{"<div>"}, false) // No escapar caracteres especiales
```

### Ver en el pedido

Verifica que la respuesta contiene los valores especificados en el orden dado. El segundo parámetro (opcional) determina
si escapar caracteres especiales en los valores antes de comprobar. Si no se proporciona, el valor predeterminado es `true`.

```go
response.AssertSeeInOrder([]string{"First", "Segundo"}, false) // No escapar caracteres especiales
```

### AssertServerError

Verifica que la respuesta tiene un error del servidor (>= 500 , < 600) código de estado HTTP:

```go
response.AssertServerError()
```

### AssertServiceUnavailable

Verifica que la respuesta tiene un código de estado HTTP `503 Service Unavailable`:

```go
response.AssertServiceUnavailable()
```

### AssertStatus

Verifica que la respuesta tiene el código de estado HTTP especificado:

```go
response.AssertStatus(200)
```

### Asertar con éxito

Verifica que la respuesta tiene un código de estado HTTP exitoso (2xx):

```go
respuesta.AssertSuccessful()
```

### Redirigir temporalmente

Verifica que la respuesta tiene un código de estado HTTP `307 Redirección temporal`:

```go
response.AssertTemporaryRedirect()
```

### Solicitudes de verificación

Verifica que la respuesta tiene un código de estado HTTP `429 Demasiadas peticiones`:

```go
response.AssertTooManyRequests()
```

### AsertUnauthorized

Verifica que la respuesta tiene un código de estado HTTP `401 Unauthorized`:

```go
respuesta.AssertUnauthorized()
```

### Verificar entidad no procesada

Verifica que la respuesta tiene un código de estado HTTP `422 Entidad Inprocesable`:

```go
respuesta.AssertUnprocessableEntity()
```
