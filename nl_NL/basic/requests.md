# HTTP Verzoeken

De `contracten/http/Request` methode van Goravel kan interageren met het huidige HTTP-verzoek verwerkt door de toepassing,
en de invoer en bestanden samen ontvangen.

## Interactie met het verzoek

De `http.Context` instantie is automatisch geïnjecteerd in het controller:

```go
importeer "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Ophalen van het verzoekpad

```go
path := ctx.Request().Path() // /users
```

### Ophalen van de verzoek-URL

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Ophalen van de aanvraag HOST

```go
url := ctx.Request().Host()
```

### Ophalen van de volledige verzoek-URL

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### De aanvraagmethode ophalen

```go
methode := ctx.Request().Method()
```

### Aanvraag van headers

```go
header := ctx.Request().Header("X-Header-Naam", "default")
headers := ctx.Request().Headers()
```

### Vraag IP-adres aan

```go
IP := ctx.Request().Ip()
```

## Input

### Alle invoergegevens ophalen

Je kunt alle inkomende verzoekgegevens ophalen als `map[string]any` met behulp van de `All` methode. dit is een
collectie van `json`, `form` en `query`(prioriteit van voren naar back).

```go
data := ctx.Request().All()
```

### Ophalen van een Route Waarde

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Input ophalen van The Query String

```go
// /users?name=goravel
naam := ctx.Request().Query("naam")
naam := ctx.Request().Query("naam", "default")

// /users?id=1
naam := ctx. equest().QueryInt("id")
naam := ctx.Request().QueryInt64("id")
name := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
namen := ctx.Request().QueryArray("namen")

// /users?names[a]=goravel1&names[b]=goravel2
namen := ctx.Request().QueryMapnames")

queries = ctx.Request()
```

> Opmerking: Alleen één dimensionale JSON-gegevens kunnen worden verkregen, anders zal het leeg terugkeren.

### Ophalen van een invoerwaarde

Toegang tot alle gebruikersinvoer zonder dat u zich zorgen maakt over het HTTP-werkwoord dat is gebruikt voor het verzoek. Ophalen volgorde: `json`,
`form`.

```go
naam := ctx.Request().Input("naam")
naam := ctx.Request().Request().Input("name", "goravel")
name := ctx.Request().InputInt("name")
name := ctx.Request(). nputInt64("naam")
naam := ctx.Request().InputBool("naam")
name := ctx.Request().InputArray("naam")
name := ctx.Request().InputMap("naam")
```

### Json/Form Binden

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user User
err := ctx.Request().Bind(&user)
```

```go
var user map[string]any
err := ctx.Request().Bind(&user)
```

### Binden Query

Alleen bind Query ondersteunen om te bouwen:

```go
type Test struct {
  ID string `form:"id"`
}
var test Test
err := ctx.Request().BindQuery(&test)
```

## Koekje

### Ophalen van een Cookie waarde

Goravel biedt een eenvoudige manier om met `cookie` te werken. Gebruik de `Cookie` methode op de `Request` instantie om een
`cookie` waarde op te halen, zal een lege string teruggeven als de `cookie` niet aanwezig is. U kunt ook een standaardwaarde opgeven in het tweede
argument.

```go
waarde := ctx.Request().Cookie("naam")
waarde := ctx.Request().Cookie("naam", "standaard") 
```

## Bestand

### Bestand ophalen

```go
bestand, err := ctx.Request().File("bestand")
```

### Bestand opslaan

```go
bestand, err := ctx.Request().File("bestand")
file.Store("./public")
```

### Krijg Oorsprong Aanvraag

```go
verzoek := ctx.Request().Origin()
```

### Gegevens bijvoegen

```go
ctx.WithValue("gebruiker", "Goravel")
```

### Gegevens ophalen

```go
gebruiker := ctx.Value("gebruiker")
```

### Verkrijg Context

```go
ctx := ctx.Context()
```

## Aangepast herstel

U kunt een aangepaste `recovery` instellen door de `Herstel` methode aan te roepen in de `app/providers/route_service_provider.go` bestand.

```go
// app/providers/route_service_provider.go
func (ontvanger *RouteServiceProvider) Boot(app foundation.Application) {
  // Voeg HTTP middleware
  facades.GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recovery (func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // of
    // ctx.Response(). tring(500, "Interne Server Error").Abort()
  })
  ...
}
```
