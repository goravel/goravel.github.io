# Validering

Goravel ger flera olika metoder för att validera din applikations inkommande data. Det är vanligast att använda
`Validate`-metoden tillgänglig på alla inkommande HTTP-förfrågningar. Goravel innehåller ett brett utbud av bekväm validering
regler.

## Validering Snabbstart

Vi tittar närmare på ett komplett exempel på hur man validerar ett formulär och returnerar felmeddelanden till användaren. Denna
översikt ger dig en allmän förståelse för hur du validerar inkommande förfrågningsdata med Goravel.

### Definiera rutter

Låt oss först anta att vi har följande vägar definierade i vår `routes/web.go`-fil:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

Rutten `GET` visar ett formulär för att skapa ett nytt blogginlägg. Rutten `POST` lagrar det nya inlägget i databasen.

### Skapar styrenheten

Låt oss sedan ta en titt på en enkel styrenhet som hanterar inkommande förfrågningar till dessa vägar. Vi lämnar `Store`
-metoden tom för tillfället:

```go
paketstyrningar

import (
  "github. om/goravel/framework/contracts/http"
)

type PostController struct {
  // Dependent services
}

func NewPostController() *PostController {
  return &PostController{
    // Inject services
  }
}

func (r *PostController) Create(ctx http. ontext) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### Skriva valideringen Logik

Nu är vi redo att fylla i vår `Store`-metod med logiken för att validera det nya blogginlägget.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(karta[string]string{
    "title": "required<unk> max_len:255",
    "body": "required",
    "kod": "required<unk> regex:^\d{4,6}$",
  })
}
```

### Kapslade attribut

Om den inkommande HTTP-begäran innehåller "nested" fältdata, kan du ange dessa fält i dina valideringsregler med hjälp av
"dot" syntax:

```go
validator, err := ctx.Request().Validate(karta[string]string{
  "title": "required<unk> max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Slice Validering

Om den inkommande HTTP-begäran innehåller "array" fältdata, kan du ange dessa fält i dina valideringsregler med hjälp av
syntaxen `*` :

```go
validator, err := ctx.Request().Validate(karta[string]string{
  "tags.*": "required",
})
```

## Validering av formulärbegäran

### Skapar formulär förfrågningar

För mer komplexa valideringsscenarier, kanske du vill skapa en "formulärbegäran". Formulärförfrågningar är anpassade förfrågningsklasser
som kapslar in deras egen validerings- och auktoriseringslogik. För att skapa en formulärbegäransklass kan du använda kommandot
`make:request` Artisan CLI:

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

Klassen för genererade formulärförfrågningar kommer att placeras i katalogen `app/http/requests` . Om denna katalog inte finns kommer
att skapas när du kör kommandot `make:request`. Varje formulärbegäran som genereras av Goravel har sex metoder:
`Authorize`, `Rules`. Dessutom kan du anpassa `Filters`, `Messages`, `Attributes` och `PrepareForValidation`
metoder för ytterligare operationer.

`Authorize`-metoden är ansvarig för att avgöra om den för närvarande autentiserade användaren kan utföra åtgärden
representerad av begäran, medan `Rules`-metoden returnerar de valideringsregler som ska gälla för begärans
-data:

```go
paketförfrågningar

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

typ StorePostRequest struct {
  Namnsträng `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) fel {
  return nil
}

func (r *StorePostRequest) Rules(ctx http. ontext) karta[string]sträng {
  returkarta[string]string{
    // Nycklarna är förenliga med inkommande nycklar.
    "name": "required<unk> max_len:255",
  }
}

func (r *StorePostRequest) Filters(ctx http. ontext) karta[string]sträng {
  returkarta[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Meddelanden(ctx http. ontext) karta[string]sträng {
  returnera karta[string]string{}
}

func (r *StorePostRequest) Attribut (ctx http. ontext) karta[string]sträng {
  returnera karta[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ontext, validering av data.Data) fel {
  return nil
}
```

Så, hur utvärderas valideringsreglerna? Allt du behöver göra är att typantyda begäran på din styrenhet. Begäran om inkommande formulär
valideras innan styrenhetsmetoden anropas, vilket innebär att du inte behöver skräpa din
controller med någon valideringslogg:

Då kan du använda `ValidateRequest`-metoden för att validera begäran i styrenheten:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Kontrollera fler regler i avsnittet [Tillgängliga regler för validering](#available-validation-rules) .

> Observera att sedan `form` passerade värden <unk> <unk> är av `string`-typ som standard, alla fält i begäran bör också vara av
> `string`-typ, annars måste du använda `JSON` för att klara värden.

### Auktoriserar formulärförfrågningar

Formulärens begärandelsklass innehåller också en `Authorize`-metod. Inom denna metod kan du avgöra om den autentiserade
-användaren faktiskt har behörighet att uppdatera en given resurs. Till exempel kan du avgöra om en användare faktiskt äger en
blogg kommentar de försöker uppdatera. Troligtvis kommer du att interagera med
dina [behörighetsgrindar och policyer](../security/authorization) inom denna metod:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var kommentar modeller. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    returnera fel. ew("no comment is found")
  }

  if !facades.Gate(). llows("update", karta[string]any{
    "comment": kommentar,
  }) {
    returfel. ew("kan inte uppdatera kommentar")
  }

  return nil
}
```

`error` kommer att skickas till returvärdet av `ctx.Request().ValidateRequest`.

### Filtrera indata

Du kan formatera indata genom att förbättra `Filters`-metoden för formulärbegäran. Denna metod bör returnera en karta över
`attribut/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  returnera kartan[string]string{
    "name": "trim",
  }
}
```

### Anpassa felmeddelanden

Du kan anpassa felmeddelanden som används av formulärbegäran genom att åsidosätta `Meddelanden` -metoden. Denna metod bör
returnera en array av attribut / regelpar och deras motsvarande felmeddelanden:

```go
func (r *StorePostRequest) Meddelanden() karta[string]sträng {
  returnera karta[string]string{
    "title. equired": "En titel krävs",
    "body.required": "Ett meddelande krävs",
  }
}
```

### Anpassa valideringsattribut

Många av Goravels inbyggda valideringsregelfelmeddelanden innehåller en `:attribute`-platshållare. Om du vill att
`:attribute`-platshållaren för ditt valideringsmeddelande ska ersättas med ett anpassat attributnamn, du kan ange
anpassade namn genom att åsidosätta `Attributes`-metoden. Denna metod bör returnera en array av attribut / namn par:

```go
func (r *StorePostRequest) Attribut() karta[string]sträng {
  returnera karta[string]string{
    "e-post": "e-postadress",
  }
}
```

### Förbereder indata för validering

Om du behöver förbereda eller sanera data från begäran innan du tillämpar dina valideringsregler, kan du använda
`PrepareForValidation`-metoden:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) fel {
  om namn, finns := data. et("name"); exist {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Skapar validerare manuellt

Om du inte vill använda `Validate`-metoden på begäran, kan du skapa en validator instans manuellt med hjälp av
`facades.Validator`. Fasadens `Make`-metod genererar en ny valideringsinstans:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := fasader.Validering(). ake(
    karta[string]any{
      "name": "Goravel",
    },
    karta[string]string{
      "title": "required<unk> max_len:255",
      "body": "required",
    })

  if validator. ails() {
    // Return fail
  }

  var användarmodeller. ser
  err := validator.Bind(&användare)
  ...
}
```

Det första argumentet som skickades till `Make`-metoden är data under validering som kan vara `map[string]any` eller `struct`.
Det andra argumentet är en rad valideringsregler som ska tillämpas på uppgifterna.

### Anpassa felmeddelanden

Om det behövs, kan du ge anpassade felmeddelanden som en validerare instans bör använda istället för standardfelet
meddelanden som tillhandahålls av Goravel. Du kan skicka anpassade meddelanden som det tredje argumentet till `Make`-metoden (även
som är tillämplig på `ctx.Request().Validate()`):

```go
validator, err := fasader.Validering().Make(input, regler, validering.Meddelanden(karta[string]string{
  "required": ":attribute fältet krävs.",
}))
```

### Specificera ett anpassat meddelande för ett givet attribut

Ibland kan du ange ett anpassat felmeddelande endast för ett specifikt attribut. Du kan göra det genom att använda "dot"
notation. Ange attributets namn först, följt av regeln (även tillämplig på `ctx.Request().Validate()`):

```go
validator, err := fasader.Validering().Make(input, regler, validering.Meddelanden(karta[string]string{
  "email.required": "Vi behöver veta din e-postadress!",
}))
```

### Specificera anpassade attributvärden

Många av Goravels inbyggda felmeddelanden inkluderar en `:attribute`-platshållare som ersätts med namnet på fältet
eller attribut under validering. För att anpassa de värden som används för att ersätta dessa platshållare för specifika fält, du
kan skicka en rad anpassade attribut som det tredje argumentet till `Make`-metoden (gäller även
`ctx. equest().Validate()`):

```go
validator, err := fasader.Validering().Make(input, regler, validering.Attribut (karta[string]string{
  "e-post": "e-postadress",
}))
```

### Formatera data innan validering

Du kan formatera data innan du validerar data för mer flexibel validering, och du kan skicka metoden för
formatering av data som den tredje parametern till `Make`-metoden (gäller även för `ctx. equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/frameing/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := fasader.Validering().Make(input, regler,
    validering. repareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      om namn, finns := data. et("namn"); finns {
        returdata. et("namn", namn)
      }

      return nil
    }))

  . .
}
```

## Arbetar med validerad indata

Efter validering av inkommande förfrågningsdata med hjälp av formulärförfrågningar eller manuellt skapade valideringsinstanser, du fortfarande vill
binda förfrågningsdata till en `struct`, det finns två sätt att göra detta:

1. Använd `Bind`-metoden, detta kommer att binda alla inkommande data, inklusive ej validerade data:

```go
validator, err := ctx.Request().Validate(regler)
var användarmodeller.Användare
err := validator. ind(&user)

validator, err := fasader.Validering().Make(input, regler)
var användarmodeller.User
err := validator.Bind(&user)
```

2. Inkommande data är automatiskt bunden till formuläret när du använder begäran om validering:

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Arbeta med felmeddelanden

### Hämtar ett felmeddelande för ett fält (Random)

```go
validator, err := ctx.Request().Validate(regler)
validator, err := fasader.Validering().Make(input, regler)

meddelande := validator.Errors().One("email")
```

### Hämtar alla felmeddelanden för ett fält

```go
meddelanden := validator.Errors().Get("e-post")
```

### Hämtar alla felmeddelanden för alla fält

```go
meddelanden := validator.Errors().All()
```

### Bestämma om felmeddelanden finns för ett fält

```go
om validator.Errors().Has("e-post") {
  //
}
```

## Tillgängliga valideringsregler

Nedan följer en lista över alla tillgängliga valideringsregler och deras funktion:

| Namn                            | Beskrivning                                                                                                                                                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `obligatoriskt`                 | Kontrollvärde krävs och kan inte vara noll värde. Till exempel, fälttypen är `bool`, det passerar värdet är `false`, det kan inte skicka valideringen.                                |
| `required_if`                   | `required_if:anotherfield,value,...` Fältet under validering måste vara närvarande och inte tomt om det anotherField fältet är lika med något värde.                                                  |
| `required_unless`               | `required_unless:anotherfield,value,...` Fältet under validering måste vara närvarande och inte tomt om inte annatFältfältet är lika med något värde.                                                 |
| `required_with`                 | `required_with:foo,bar,...` Fältet under validering måste vara närvarande och inte bara tomt om något av de andra angivna fälten är närvarande.                                                       |
| `required_with_all`             | `required_with_all:foo,bar,...` Fältet under validering måste vara närvarande och inte bara tomt om alla andra angivna fält är närvarande.                                                            |
| `required_with`                 | `required_without:foo,bar,...` Fältet under validering måste vara närvarande och inte bara tomt när något av de andra angivna fälten inte är närvarande.                                              |
| `required_without_all`          | `required_without_all:foo,bar,...` Fältet under validering måste vara närvarande och inte bara tomt när alla andra angivna fält inte är närvarande.                                                   |
| `int`                           | Kontrollera värdet är `intX` `uintX` typ och stöd för storlekskontroll. eg: `int` `int:2` `int:2,12`. Observera: [Poäng för att använda regler](#int) |
| `uint`                          | Kontrollera värdet är `uint(uintX)` typ, `värde >= 0`                                                                                                                                                                 |
| `bool`                          | Kontrollera värdet är bollsträng(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                                            |
| `sträng`                        | Kontrollera värdet är strängtyp och stöd storlekskontroll. eg:`string` `string:2` `string:2,12`                                                                                       |
| `float`                         | Kontrollera värdet är `float(floatX)` typ                                                                                                                                                                             |
| `skiva`                         | Kontrollera värdet är skivtyp(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                              |
| `i`                             | `in:foo,bar,…` Kontrollera om värdet är i den angivna uppräkningen                                                                                                                                                    |
| `not_in`                        | `not_in:foo,bar,…` Kontrollera om värdet inte finns i den angivna förteckningen                                                                                                                                       |
| `starts_with`                   | `starts_with:foo` Kontrollera om inmatningssträngens värde börjar med den givna understrängen                                                                                                                         |
| `ends_with`                     | `ends_with:foo` Kontrollera om inmatningssträngens värde slutar med den angivna understrängen                                                                                                                         |
| `mellan`                        | `between:min,max` Kontrollera att värdet är ett tal och ligger inom det givna intervallet                                                                                                                             |
| `max`                           | `max:value` Kontrollvärdet är mindre än eller lika med det angivna värdet(`intX` `uintX` `floatX`)                                                                                                 |
| `min`                           | `min:value` Kontrollvärdet är större än eller lika med det angivna värdet(`intX` `uintX` `floatX`)                                                                                                 |
| `eq`                            | `eq:value` Kontrollera att indatavärdet är lika med det angivna värdet                                                                                                                                                |
| `ne`                            | `ne:value` Kontrollera att inmatningsvärdet inte är lika med det angivna värdet                                                                                                                                       |
| `lt`                            | `lt:value` Kontrollera värdet är mindre än det angivna värdet (`intX` `uintX` `floatX`)                                                                                                            |
| `gt`                            | `gt:value` Kontrollvärdet är större än det angivna värdet(`intX` `uintX` `floatX`)                                                                                                                 |
| `len`                           | `len:value` Kontrollvärdets längd är lika med den angivna storleken(`string` `array` `slice` `map`)                                                                                                |
| `min_len`                       | `min_len:value` Kontrollera den minsta längden på värdet är den angivna storleken(`string` `array` `slice` `map`)                                                                                  |
| `max_len`                       | `max_len:value` Kontrollera den maximala längden på värdet är den angivna storleken(`string` `array` `slice` `map`)                                                                                |
| `email`                         | Kontrollera värdet är e-postadress sträng                                                                                                                                                                             |
| `array`                         | Kontrollera värdet är array, skär typ                                                                                                                                                                                 |
| `map`                           | Kontrollera värdet är en MAP-typ                                                                                                                                                                                      |
| `eq_field`                      | `eq_field:field` Kontrollera att fältvärdet är lika med värdet i ett annat fält                                                                                                                                       |
| 'ne_field' | `ne_field:field` Kontrollera att fältvärdet inte är lika med värdet i ett annat fält                                                                                                                                  |
| `gt_field`                      | `gt_field:field` Kontrollera att fältvärdet är större än värdet på ett annat fält                                                                                                                                     |
| `gte_field`                     | `gte_field:field` Kontrollera att fältvärdet är större än eller lika med värdet i ett annat fält                                                                                                                      |
| `lt_field`                      | `lt_field:field` Kontrollera att fältvärdet är mindre än värdet på ett annat fält                                                                                                                                     |
| `lte_field`                     | `lte_field:field` Kontrollera om fältvärdet är mindre än eller lika med värdet i ett annat fält                                                                                                                       |
| `fil`                           | Kontrollera om det är en uppladdad fil                                                                                                                                                                                |
| `image`                         | Kontrollera om det är en uppladdad bildfil och stöd för suffixkontroll                                                                                                                                                |
| `date`                          | Kontrollera att fältvärdet är datumsträng                                                                                                                                                                             |
| `gt_date`                       | `gt_date:value` Kontrollera att inmatningsvärdet är större än den angivna datumsträngen                                                                                                                               |
| `lt_date`                       | `lt_date:value` Kontrollera att inmatningsvärdet är mindre än den angivna datumsträngen                                                                                                                               |
| `gte_date`                      | `gte_date:value` Kontrollera att inmatningsvärdet är större än eller lika med den angivna datumsträngen                                                                                                               |
| `lte_date`                      | `lte_date:value` Kontrollera att inmatningsvärdet är mindre än eller lika med den angivna datumsträngen                                                                                                               |
| `alfa`                          | Kontrollera att värdet endast innehåller bokstäver                                                                                                                                                                    |
| `alpha_num`                     | Kontrollera att endast bokstäver, siffror ingår                                                                                                                                                                       |
| `alpha_dash`                    | Markera för att endast inkludera bokstäver, siffror, bindestreck ( - ) och understreck ( _ )                                                               |
| `json`                          | Kontrollera värdet är JSON-sträng                                                                                                                                                                                     |
| `nummer`                        | Kontrollera värdet är talsträng `>= 0`                                                                                                                                                                                |
| `full_url`                      | Kontrollvärdet är full URL-sträng (måste börja med http,https)                                                                                                                                     |
| `ip`                            | Kontrollera värdet är IP(v4 eller v6) sträng                                                                                                                                                       |
| `ipv4`                          | Kontrollera värdet är IPv4-sträng                                                                                                                                                                                     |
| `ipv6`                          | Kontrollera värdet är IPv6-sträng                                                                                                                                                                                     |
| `regex`                         | Kontrollera om värdet kan passera den regelbundna verifieringen                                                                                                                                                       |

### Poäng för att använda regler

#### int

När `ctx.Request().Validate(regler)` för validering kommer inkommande `int`-data att tolkas av
`json. nmarshal` i `float64` typ, vilket kommer att orsaka validering av int regel misslyckas.

**Lösningar**

Alternativ 1: Lägg till [`validering.PrepareForValidation`](#format-data-before-validation), formatera data innan validering av
data;

Alternativ 2: Använd `fasader.Validering().Make()` för regelvalidering;

## Anpassade valideringsregler

Goravel ger en mängd användbara valideringsregler, men du kanske vill ange några av dina egna. En metod för att
registrera anpassade valideringsregler är att använda regelobjekt. För att generera ett nytt regelobjekt kan du helt enkelt använda kommandot
`make:rule` Artisan.

Till exempel, om du vill verifiera att en sträng är versal, kan du skapa en regel med detta kommando. Goravel kommer
spara den nya regeln i katalogen `app/rules`. Om denna katalog inte finns kommer Goravel att skapa den när du
kör kommandot Artisan för att skapa din regel.

```go
gå kör. hantverkare make:rule Versalen
gå kör. hantverkare make:rule användare/Versalen
```

Efter att ha skapat regeln måste vi definiera dess beteende. Ett regelobjekt har två metoder: `Passes` och `Message`. Metoden
Passerar tar emot alla data, inklusive data som ska valideras och valideringsparametrarna. Den ska returnera
`true` eller `false` beroende på om attributvärdet är giltigt. Metoden `Message` ska returnera felmeddelandet
för validering som ska användas när valideringen misslyckas.

```go
paketregler

import (
  "strängar"

  "github. om/goravel/frameing/contracts/validation"
)

type Versaler struct {
}

// Signatur Namnet på regeln.
func (receiver *Uppercase) Signatur() sträng {
  returnera "versale"
}

// Passerar Bestäm om valideringsregeln passerar.
func (receiver *Versale) Passes(validering av data.Data, val några, alternativ ...any) bulla {
  retur strängar.ToUpper(val.(string)) == val. string)
}

// Meddelande Få valideringsfelmeddelandet.
func (receiver *Uppercase) Message() string {
  return ":attribute måste vara versal."
}

```

Sedan måste du registrera regeln till `rules`-metoden i `app/providers/validation_service_provider.go`-filen, och
regeln kan användas som andra regler:

```go
paketleverantörer

import (
  "github.com/goravel/frameing/contracts/validation"
  "github. om/goravel/frameing/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := fasader. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules fel: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) regler() []validering. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Tillgängliga valideringsfilter

| Namn                           | Beskrivning                                                                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Konvertera värde(sträng/intX/floatX) till `int` typ `v.FilterRule("id", "int")`                                                                          |
| `uint/toUint`                  | Konvertera värde(sträng/intX/floatX) till `uint` typ `v.FilterRule("id", "uint")`                                                                        |
| `int64/toInt64`                | Konvertera värde(sträng/intX/floatX) till `int64` typ `v.FilterRule("id", "int64")`                                                                      |
| `float/toFloat`                | Konvertera värde(sträng/intX/floatX) till `float`-typ                                                                                                    |
| `bool/toBool`                  | Konvertera strängvärde till bool. (`true`: "1", "på", "ja", "sant", "falsk": "0", "av", "nej", "falskt") |
| `trim/trimSpace`               | Städa upp blanktecken på båda sidor av strängen                                                                                                                             |
| `ltrim/trimLeft`               | Rensa upp blanksteg på vänster sida av strängen                                                                                                                             |
| `rtrim/trimright`              | Städa upp blanksteg på höger sida av strängen                                                                                                                               |
| `int/integer`                  | Konvertera värde(sträng/intX/floatX) till `int` typ `v.FilterRule("id", "int")`                                                                          |
| `gemensamt/gemensamt`          | Konvertera sträng till gemener                                                                                                                                              |
| `versal/versal`                | Konvertera sträng till versaler                                                                                                                                             |
| `lcFirst/lowerFirst`           | Konvertera den första karaktären av en sträng till gemener                                                                                                                  |
| `ucFirst/upperFirst`           | Konvertera den första karaktären av en sträng till versaler                                                                                                                 |
| `ucWord/upperWord`             | Konvertera den första karaktären av varje ord till versaler                                                                                                                 |
| `camel/camelCase`              | Konvertera sträng till kamelnamngivningsstil                                                                                                                                |
| `snake/snakeCase`              | Konvertera sträng till snake namngivningsstil                                                                                                                               |
| `escapeJs/escapeJS`            | Fly JS sträng.                                                                                                                                              |
| `escapeHtml/escapeHTML`        | Fly HTML-sträng.                                                                                                                                            |
| `str2ints/strToInts`           | Konvertera sträng till int slice `[]int`                                                                                                                                    |
| `str2time/strToTime`           | Konvertera datumsträng till `time.Time`.                                                                                                                    |
| `str2arr/str2array/strToArray` | Konvertera sträng till strängskiva `[]string`                                                                                                                               |

## Anpassat filter

Goravel ger en mängd hjälpsamma filter, men du kanske vill ange några av dina egna. För att generera en ny regel
-objekt, kan du helt enkelt använda kommandot `make:filter` Artisan. Vi använder detta kommando för att generera en regel som konverterar en
sträng till ett heltal. Denna regel är redan inbyggd i ramen, vi bara skapar den som ett exempel. Goravel kommer att spara
detta nya filter i katalogen 'app/filter'. Om denna katalog inte finns kommer Goravel att skapa den när du kör
kommandot Artisan för att skapa regeln:

```go
gå kör. hantverkare make:filter ToInt
// eller
gå att köra. hantverkare make:filter användare/ToInt
```

Ett filter innehåller två metoder: `Signatur` och `Handle`. `Signatur`-metoden anger namnet på filtret.
`Handle`-metoden utför den specifika filtreringslogiken:

```go
paketfilter

import (
  "strängar"

  "github.com/spf13/cast"
  "github. om/goravel/framey/contracts/validation"
)

type ToInt struct {
}

// Signatur Filtrets signatur.
func (receiver *ToInt) Signatur() string {
  returnera "ToInt"
}

// Hantera definierar filterfunktionen som ska tillämpas.
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Då måste du registrera filtret till `filter`-metoden i `app/providers/validation_service_provider.go`-filen,
och filtret kan användas som andra:

```go
paketleverantörer

import (
  "github.com/goravel/frameing/contracts/validation"
  "github. om/goravel/frameing/facades"

  "goravel/app/filter"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := fasader. alidation().AddFilters(receiver.filters()); err != nil {
    fasader.Log(). rrorf("add filter fel: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filter() []validering. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
