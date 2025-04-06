# Validatie

Goravel biedt verschillende benaderingen voor het valideren van de inkomende gegevens van je applicatie. Het meest voorkomende is om de
`Validate` methode te gebruiken die beschikbaar is voor alle inkomende HTTP-verzoeken. Goravel bevat een grote verscheidenheid aan handige validatie
regels.

## Validatie Quickstart

Laten we een kijkje nemen naar een compleet voorbeeld van hoe je een formulier kunt valideren en foutberichten aan de gebruiker kunt retourneren. Dit
overzicht zal u een algemeen inzicht geven in hoe u inkomende aanvraaggegevens kunt valideren via Goravel.

### De Routes definiëren

Laten we eerst aannemen dat we de volgende routes gedefinieerd hebben in ons `routes/web.go` bestand:

```go
importeer "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

De `GET` route toont een formulier voor het maken van een nieuwe blogpost. De `POST` route slaat het nieuwe bericht in de database op.

### De Controller aanmaken

Laten we vervolgens een kijkje nemen naar een simpel regelsysteem dat inkomende verzoeken naar deze routes behandelt. We laten de `winkel`
methode leeg voor nu:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/http"
)

type PostController struct {
  // Dependent services
}

func NewPostController() *PostController {
  return &PostController{
    // Inject services
  }
}

func (r *PostController) Create(ctx http.Context) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### Schrijven van de validatie Logica

Nu zijn we klaar om onze 'Store'-methode in te vullen met de logica om de nieuwe blogpost te valideren.

```go
func (r *PostController) Opslag (ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "verplicht: max_len:255",
    "body": "vereist",
    "code": "Benodigd regex:^\d{4,6}$",
  })
}
```

### Geneste attributen

Als het inkomende HTTP-verzoek gegevens "genedige" veld bevat, kunt u deze velden opgeven in uw validatieregels met behulp van
de "dot" syntaxis:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "requiredDraw max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Slice Validatie

Als het inkomende HTTP-verzoek "array" veldgegevens bevat, kunt u deze velden opgeven in uw validatieregels met behulp van
de `*` syntaxis:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "vereist",
})
```

## Validatie formulieraanvraag

### Aanmaken formulierverzoeken

Voor meer complexe validatiescenario's wilt u misschien een "formulieraanvraag" maken. Formulierverzoeken zijn aangepaste verzoekklassen
die hun eigen validatie en autorisatiedrigie omvatten. Om een formulierverzoek klasse te maken, kunt u de
`make:request` Artisan CLI commando gebruiken:

```go
start . artisan make:request StorePostRequest
ga uit. artisan make:request user/StorePostRequest
```

De gegenereerde vragenklasse zal worden geplaatst in de `app/http/requests` map. Als deze map niet bestaat,
zal het worden gemaakt wanneer je het `make:request` commando uitvoert. Elk formulier dat is gegenereerd door Goravel heeft zes methoden:
`Authorize`, `Rules`. Daarnaast kunt u de `Filters`, `Messages`, `Attributes` en `PrepareForValidation`
methoden voor verdere handelingen aanpassen.

De `Authorize` methode is verantwoordelijk om te bepalen of de momenteel geauthenticeerde gebruiker de actie
kan uitvoeren die wordt weergegeven door het verzoek. terwijl de 'Regels' methode de validatieregels herstelt die moeten worden toegepast op de
gegevens van de aanvraag:

```go
pakketverzoeken

import (
  "github.com/goravel/framework/contracts/http"
  "github.

type StorePostRequest bouwt {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) fout {
  return nil
}

func (r *StorePostRequest) Regels(ctx http. ontext) kaart[string]string {
  return map[string]string{
    // De toetsen zijn gelijk aan de inkomende sleutels.
    "naam": "benodigd max_len:255",
  }


func (r *StorePostRequest) Filters(ctx http. ontext) kaart[string]string {
  return map[string]string{
    "name": "bijsnijden",
  }
}

func (r *StorePostRequest) Messages(ctx http. ontext) kaart[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) kaart[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ontext, data validation.Data) fout {
  return nil
}
```

Dus, hoe worden de validatieregels beoordeeld? Het enige wat u hoeft te doen is het type hint op uw controller methode. The
incoming form request is validated before the controller method is called, meaning you do not need to clutter your
controller with any validation logic:

Dan kun je de `ValidateRequest` methode gebruiken om het verzoek te valideren in het controller:

```go
func (r *PostController) Opslag (ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Bekijk meer regels in de sectie format@@0 (#available-validation-rules).

> Merk op dat sinds `form` doorgegeven waarden standaard van `string` type zijn, alle velden in het verzoek moeten ook
> `string` type zijn, anders gebruik `JSON` om waarden door te geven.

### Formulierverzoeken autoriseren

De formulier request class bevat ook een 'Authorize' methode. Binnen deze methode kun je bepalen of de geauthenticeerde
gebruiker de bevoegdheid heeft om een bepaalde bron bij te werken. U kunt bijvoorbeeld bepalen of een gebruiker daadwerkelijk eigenaar is van een
blogcommentaar die zij proberen te updaten. Zeer waarschijnlijk, zal je communiceren met
uw [autorisatie poorten en beleid](../security/authorization) binnen deze methode:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment modellen. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    geeft fouten. ("geen reactie is gevonden")
  }

  als !facades.Gate(). llows("update", kaart[string]any{
    "comment": commentaar,
  }) {
    geeft fouten. ew("kan de reactie niet updaten")
  }

  retour nil
}
```

`error` zal worden doorgegeven aan de retourwaarde van `ctx.Request().ValidateRequest`.

### Invoergegevens filteren

U kunt de invoergegevens formatteren door de `Filters` methode van het formulier te verbeteren. Deze methode moet een kaart van
`attribute/filter` retourneren:

```go
func (r *StorePostRequest) Filters(ctx http.Context) kaart[string]string {
  retourneer kaart[string]string{
    "name": "trim",
  }
}
```

### Aanpassen van de foutmeldingen

U kunt de foutmeldingen die gebruikt worden door het formulier te wijzigen door de 'Berichten'-methode te overschrijven. Deze methode zou
een reeks van attribuut/regelparen en hun bijbehorende foutberichten moeten retourneren:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. equired": "Een titel is vereist",
    "body.required": "Een bericht is vereist",
  }
}
```

### Aanpassen van de Validatie Attributen

Veel van Goravel's ingebouwde validatie regel foutmeldingen bevatten een `:attribute` placeholder. Als u wilt dat de
`:attribute` plaatsaanduiding van uw validatie bericht wordt vervangen door een aangepaste attribuut naam u kunt aangepaste namen van
opgeven door de `Attributes` methode te overschrijven. Deze methode zou een array van attribuut / naam paren moeten retourneren:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "email adres",
  }
}
```

### Invoer voorbereiden voor validatie

Als u de gegevens van het verzoek moet voorbereiden of sanitiseren voordat u uw validatieregels toepast, dan kunt u de
'PrepareForValidatie' methode gebruiken:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) fout {
  als naam, bestaan := data. et("naam"); exist {
    return data.Set("naam", name.(string)+"1")
  }
  return nil
}
```

## Handmatig aanmaken van validators

Als u geen gebruik wilt maken van de `Validate` methode op het verzoek, kunt u een validator-instantie handmatig aanmaken met behulp van de
`facades.Validator`. De `Make` methode van de facade genereert een nieuwe validator:

```go
func (r *PostController) Opslag (ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    kaart[string]any{
      "name": "Goravel",
    },
    kaart[string]string{
      "title": "vereist; max_len:255",
      "body": "vereist",
    })

  als validator. ails() {
    // Retour falen
  }

  var gebruikersmodellen. ser
  err := validator.Bind(&user)
  ...
}
```

Het eerste argument dat doorgegeven is aan de `Make` methode is de data die gevalideerd kan worden door `map[string]any` of `struct`.
Het tweede argument is een hele reeks validatieregels die op de gegevens moeten worden toegepast.

### Aanpassen van de foutmeldingen

If needed, you may provide custom error messages that a validator instance should use instead of the default error
messages provided by Goravel. Je kunt de aangepaste berichten als derde argument doorgeven aan de `Make` methode (ook
van toepassing op `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, regels, validation.Messages(kaart[string]string{
  "required": "Het :attribute veld is vereist.",
}))
```

### Het opgeven van een aangepast bericht voor een gegeven kenmerk

Soms kunt u een foutmelding op maat specificeren voor een specifiek attribuut. Je kunt dit doen met "dot"
notatie. Geef eerst de naam van het attribuut op, gevolgd door de regel (ook van toepassing op `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, regels, validation.Messages(map[string]string{
  "email.required": "We moeten je e-mailadres kennen!",
}))
```

### Aangepaste attribuutwaarden opgeven

Veel van de ingebouwde fouten van Goravels bevatten een `:attribute` placeholder die wordt vervangen door de naam van het
-veld of attribuut onder validatie. Om de waarden aan te passen die gebruikt worden om deze placeholders voor specifieke velden te vervangen, je
kan een reeks aangepaste attributen als derde argument doorgeven aan de `Make` methode (ook van toepassing op
`ctx. equest().Validate()`):

```go
validator, err := facades.Validation().Make(input, regels, validation.Attributes(kaart[string]string{
  "email": "email adres",
}))
```

### Formatteer gegevens voor validatie

U kunt de gegevens formatteren voor het valideren van de gegevens voor flexibelere validatie, en je kunt de methode van
van het formatteren van de gegevens als derde parameter doorgeven aan de `Make` methode (ook van toepassing op `ctx. equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http.Context) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation.PrepareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      if name, exist := data.Get("name"); exist {
        return data.Set("name", name)
      }

      return nil
    }))

  ...
}
```

## Werken met gevalideerde invoer

After validating incoming request data using form requests or manually created validator instances, you still want to
bind the request data to a `struct`, there are two ways to do this:

1. Gebruik de `Bind` methode, dit verbindt alle inkomende gegevens, inclusief niet-gevalideerde gegevens:

```go
validator, err := ctx.Request().Validate(regels)
var models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(input, rules)
var usermodels.User
err := validator.Bind(&user)
```

2. De inkomende gegevens worden automatisch gekoppeld aan het formulier wanneer u het verzoek voor validatie gebruikt:

```go
var storePost requests.StorePostRequest
fouten, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Werken met foutberichten

### Ophalen van één foutmelding voor een veld (Willekeurig)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

bericht := validator.Errors().One("email")
```

### Ophalen van alle foutmeldingen voor een veld

```go
berichten := validator.Errors().Get("e-mail")
```

### Ophalen van alle foutmeldingen voor alle velden

```go
berichten := validator.Errors().All()
```

### Bepalen of foutmelding berichten voorkomen voor een veld

```go
if validator.Errors().Has("email") {
  //
}
```

## Beschikbare validatieregels

Hieronder staat een lijst van alle beschikbare validatieregels en hun functie:

| naam                          | Beschrijving                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'verplicht'                   | Controleer de waarde is verplicht en mag niet nul zijn. Veld type is bijvoorbeeld `bool`, de passende waarde is `false`, het kan niet slagen in de validatie.                             |
| `verplicht_als`               | `required_if:anotherfield,value,...` Het veld onder validatie moet aanwezig zijn en niet leeg zijn als het een ander veld gelijk is aan elke waarde.                                                      |
| `required_unless`             | `required_unless:anotherfield,value,...` Het veld onder validatie moet aanwezig zijn en niet leeg zijn, tenzij het AnotherField gelijk is aan elke waarde.                                                |
| `verplicht_met`               | `required_with:foo,bar,...` Het veld onder validatie moet aanwezig zijn en niet leeg zijn als een van de andere gespecificeerde velden aanwezig zijn.                                                     |
| `required_with_all`           | `required_with_all:foo,bar,...` Het veld onder validatie moet aanwezig zijn en niet alleen leeg zijn als alle andere gespecificeerde velden aanwezig zijn.                                                |
| `required_without`            | `required_without:foo,bar,...` Het veld onder validatie moet aanwezig zijn en niet alleen leeg zijn wanneer een van de andere gespecificeerde velden niet aanwezig zijn.                                  |
| `required_without_all`        | `required_without_all:foo,bar,...` Het veld onder validatie moet aanwezig zijn en niet alleen leeg zijn wanneer alle andere gespecificeerde velden niet aanwezig zijn.                                    |
| `int`                         | Controleer of de waarde `intX` `uintX` type is en support size controle. eg: `int` `int:2` `int:2,12`. Let op: [Punten voor het gebruik van regels](#int) |
| `uint`                        | Controleer de waarde is `uint(uintX)` type, `value >= 0`                                                                                                                                                                  |
| `bool`                        | Controleer waarde is bool string(`true`: "1", "aan", "ja", "true", `false`: "0", "off", "no", "false").                                                |
| `string`                      | Controleer waarde is een tekenreeks en ondersteunt controle op de afmeting. eg:`string` `string:2` `string:2,12`                                                                          |
| `float`                       | Controleer waarde is `float(floatX)` type                                                                                                                                                                                 |
| `slice`                       | Controleer of de waarde een slice type is(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                      |
| `in`                          | `in:foo,bar,…` Controleer of de waarde in de gegeven opsomming staat                                                                                                                                                      |
| 'not_in' | `not_in:foo,bar,…` Controleer of de waarde niet in de gegeven enumeratie staat                                                                                                                                            |
| `starts_met`                  | `starts_with:foo` Controleer of de invoerstring begint met de gegeven sub-string                                                                                                                                          |
| `ends_met`                    | `ends_with:foo` Controleer of de invoerstring is eindigd met de gegeven sub-string                                                                                                                                        |
| 'tussen'                      | `tussen:min,max` Controleer of de waarde een getal is en binnen het gegeven bereik ligt                                                                                                                                   |
| `max`                         | `max:value` Check waarde is kleiner dan of gelijk aan de gegeven waarde(`intX` `uintX` `floatX`)                                                                                                       |
| 'min'                         | `min:value` Check waarde is groter dan of gelijk aan de gegeven waarde(`intX` `uintX` `floatX`)                                                                                                        |
| `eq`                          | `eq:value` Controleer of de invoerwaarde gelijk is aan de gegeven waarde                                                                                                                                                  |
| `Nee`                         | `ne:value` Controleer of de invoerwaarde niet gelijk is aan de gegeven waarde                                                                                                                                             |
| `lt`                          | `lt:value` Check waarde is minder dan de gegeven waarde(`intX` `uintX` `floatX`)                                                                                                                       |
| `gt`                          | `gt:value` Check waarde is groter dan de gegeven waarde(`intX` `uintX` `floatX`)                                                                                                                       |
| `len`                         | `len:value` Check waarde lengte is gelijk aan de gegeven grootte (`string` `array` `slice` `map`)                                                                                                      |
| `min_len`                     | `min_len:value` Check de minimale lengte van de waarde is de gegeven grootte (`string` `array` `slice` `map`)                                                                                          |
| `max_len`                     | `max_len:value` Controleer de maximale lengte van de waarde is de gegeven grootte (`string` `array` `slice` `map`)                                                                                     |
| `email`                       | Controleer waarde is een e-mail adres string                                                                                                                                                                              |
| `array`                       | Controleer waarde is array, slice type                                                                                                                                                                                    |
| `Map`                         | De controlewaarde is een MAP type                                                                                                                                                                                         |
| `eq_field`                    | `eq_field:field` Check of de waarde gelijk is aan de waarde van een ander veld                                                                                                                                            |
| `ne_field`                    | `ne_field:field` Controleer of de waarde van het veld niet gelijk is aan de waarde van een ander veld                                                                                                                     |
| `gt_field`                    | `gt_field:field` Controleer of het veld waarde groter is dan de waarde van een ander veld                                                                                                                                 |
| `gte_field`                   | `gte_field:field` Controleer of de waarde van het veld groter of gelijk is aan de waarde van een ander veld                                                                                                               |
| `lt_field`                    | `lt_field:field` Controleer of de waarde van het veld kleiner is dan de waarde van een ander veld                                                                                                                         |
| `lte_field`                   | `lte_field:field` Controleer of de veldwaarde kleiner of gelijk is aan de waarde van een ander veld                                                                                                                       |
| `bestand`                     | Verifieer of het een geüpload bestand is                                                                                                                                                                                  |
| `image`                       | Controleer of het een geüploade afbeeldingsbestand is en ondersteuning van achtervoegsel controle                                                                                                                         |
| datum                         | Controleer of het veld waarde is een datumreeks                                                                                                                                                                           |
| `gt_date`                     | `gt_date:value` Controleer of de invoer waarde groter is dan de gegeven datum string                                                                                                                                      |
| `lt_date`                     | `lt_date:value` Controleer of de invoerwaarde kleiner is dan de gegeven datum string                                                                                                                                      |
| `gte_date`                    | `gte_date:value` Controleer of de invoer waarde groter of gelijk is aan de gegeven datum string                                                                                                                           |
| `lte_date`                    | `lte_date:value` Controleer of de invoerwaarde kleiner is dan of gelijk is aan de gegeven datum string                                                                                                                    |
| `alfa`                        | Controleer of de waarde alleen alfabetische tekens bevat                                                                                                                                                                  |
| `alpha_num`                   | Controleer of alleen letters, cijfers zijn opgenomen                                                                                                                                                                      |
| `alpha_dash`                  | Aanvinken om alleen letters, cijfers, streepjes (- ) en liggende streepjes (_ ) op te nemen                                                                    |
| `json`                        | Controlewaarde is JSON tekenreeks                                                                                                                                                                                         |
| `nummer`                      | Controleer of de waarde een getal string is `>= 0`                                                                                                                                                                        |
| `full_url`                    | Controle waarde is volledige URL string(moet beginnen met http,https)                                                                                                                                  |
| `ip`                          | Controleer waarde is IP(v4 of v6) string                                                                                                                                                               |
| `ipv4`                        | Controle waarde is IPv4 string                                                                                                                                                                                            |
| `ipv6`                        | Controle waarde is IPv6 string                                                                                                                                                                                            |
| `regex`                       | Controleer of de waarde de regelmatige verificatie kan doorlopen                                                                                                                                                          |

### Punten voor het gebruik van regels

#### Hint

Wanneer je `ctx.Request().Validate(rules)` gebruikt voor validatie, zal de inkomende `int` type gegevens worden verwerkt door
`json. nmarshal` in het 'float64' type, wat ervoor zorgt dat de int regel validatie mislukt.

**Oplossingen**

Optie 1: Voeg [`validation.PrepareForValidation`](#format-data-before-validation), formatteer de gegevens voordat de
gegevens worden gevalideerd;

Optie 2: Gebruik `facades.Validation().Make()` voor validatie van regels;

## Aangepaste validatieregels

Goravel biedt een scala aan handige validatieregels; misschien wilt u er wel een paar opgeven. Een methode van
het registreren van aangepaste validatieregels is het gebruik van regelobjecten. Om een nieuw regel-object te genereren, kun je het
`make:rule` Artisan-commando gebruiken.

Als je bijvoorbeeld wilt verifiëren dat een tekenreeks hoofdzaak is, kun je een regel maken met deze opdracht. Goravel zal
dan deze nieuwe regel opslaan in de `app/rules` map. Als deze map niet bestaat, zal Goravel het maken wanneer je
het Artisan commando uitvoert om je regel te maken.

```go
uitvoeren . artisan make:rule upcase
go run . artisan make:rule user/Uppercase
```

Na het creëren van de regel moeten we het gedrag ervan definiëren. Een regel-object heeft twee methoden: `Passes` en `Message`. De
Passes methode ontvangt alle gegevens, inclusief de te valideren gegevens en de validatie parameters. Het moet
`true` of `false` teruggeven, afhankelijk van of de attribuut waarde geldig is. De `Bericht` methode moet de fout
bericht voor validatie die moet worden gebruikt wanneer de validatie mislukt

```go
pakket regels

import (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Bovencase {
}

// Ondertekening de naam van de regel.
func (ontvanger *Bovencase) Signature() string {
  return "bovencase"
}

// Volgt als de validatieregel passeert.
func (ontvanger *Uppercase) Passes(data validation.Data, val any, opties...any) bool {
  retourneert strings.ToUpper(val.(string)) == val. string)
}

// Bericht Krijg de validatie foutmelding.
func (ontvanger *Upcase) Message() string {
  retourneert "Het :attribute moet hoofdletters zijn."
}

```

Vervolgens moet u de regel registreren op de `rules` methode in de `app/providers/validation_service_provider.go` bestand, en
de regel kan worden gebruikt zoals andere regels:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (ontvanger *ValidationServiceProvider) Register() {

}

func (ontvanger *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("Voeg regels fout: %+v", err)
  }
func

func (ontvanger *ValidationServiceProvider) regels() []validatie. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Beschikbare validatiefilters

| naam                           | Beschrijving                                                                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Converteer value(string/intX/floatX) naar `int` type `v.FilterRule("id", "int")`                                                                          |
| `uint/toUint`                  | Converteer value(string/intX/floatX) naar `uint` type `v.FilterRule("id", "uint")`                                                                        |
| `int64/toInt64`                | Converteer value(string/intX/floatX) naar `int64` type `v.FilterRule("id", "int64")`                                                                      |
| `float/toFloat`                | Converteer waarde(string/intX/floatX) naar 'float' type                                                                                                   |
| `bool/toBool`                  | Converteer string waarde naar bool. (`true`: "1", "on", "ja", "waar", `false`: "0", "uit", "no", "false") |
| 'inpakken/inkortingen'         | Schoon witruimte tekens op aan beide kanten van de string                                                                                                                    |
| `ltrim/trimLeft`               | Schoon witruimte tekens op aan de linkerkant van de string                                                                                                                   |
| `rtrim/trimRight`              | Schoon witruimte tekens op de rechterkant van de string op                                                                                                                   |
| `int/integer`                  | Converteer value(string/intX/floatX) naar `int` type `v.FilterRule("id", "int")`                                                                          |
| `lower/lowercase`              | Converteer tekenreeks naar kleine letters                                                                                                                                    |
| `hoofd/hoofdzakelijk`          | Converteer tekenreeks naar hoofdletters                                                                                                                                      |
| `lcFirst/lowerFirst`           | Converteer het eerste teken van een tekenreeks naar kleine letters                                                                                                           |
| `ucFirst/upperFirst`           | Converteer het eerste teken van een tekenreeks naar hoofdletters                                                                                                             |
| `ucWord/upperWord`             | Zet het eerste teken van elk woord om naar hoofdletters                                                                                                                      |
| `kameel/kameelCase`            | Converteer string naar kameel benamingstijl                                                                                                                                  |
| `snake/snakeCase`              | Converteer tekenreeks naar benamingstijl                                                                                                                                     |
| `escapeJs/escapeJS`            | Ontsnap JS string.                                                                                                                                           |
| `escapeHtml/escapeHTML`        | Escape HTML string.                                                                                                                                          |
| `str2ints/strToInts`           | Converteer string naar int slice `[]int`                                                                                                                                     |
| `str2time/strToTime`           | Converteer datum string naar `time.Time`.                                                                                                                    |
| `str2arr/str2array/strToArray` | Converteer string naar string slice `[]string`                                                                                                                               |

## Aangepast filter

Goravel biedt een verscheidenheid aan nuttige filters, maar misschien wil je er zelf een paar opgeven. Om een nieuwe regel
object te genereren, kun je het `make:filter` Artisan commando gebruiken. Laten we dit commando gebruiken om een regel te genereren die een
tekenreeks naar een geheel getal converteert. Deze regel is al opgenomen in het kader, we creëren ze alleen maar als voorbeeld. Goravel zal
dit nieuwe filter opslaan in de `app/filters` map. Als deze map niet bestaat, zal Goravel het maken wanneer je het Artisan commando
uitvoert om de regel aan te maken:

```go
ga uit. artisan make:filter ToInt
// of
ga uitvoeren. artisan make:filter user/ToInt
```

Eén filter bevat twee methoden: `Signature` en `Handle`. De `Signature` methode stelt de naam van het filter in. De
`Handle` methode voert de specifieke filterlogica:

```go
pakket filters

import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Handtekening de handtekening van het filter.
func (ontvanger *ToInt) Signature() string {
  return "ToInt"
}

// Handle definieert de filterfunctie die van toepassing is.
func (ontvanger *ToInt) Handle() elk {
  retourneer func (val any) int {
    return cast. oString(val)
  }
 } }
```

Vervolgens moet je het filter op de `filters` methode in de `app/providers/validation_service_provider.go` bestand registreren,
en het filter kan worden gebruikt zoals anderen:

```go
package providers

import (
  "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades.Validation().AddFilters(receiver.filters()); err != nil {
    facades.Log().Errorf("add filters error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation.Filter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
