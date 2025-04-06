# Validierung

Goravel bietet verschiedene Ansätze zur Validierung der eingehenden Daten Ihrer Anwendung. Es ist am häufigsten, die
`Validate` Methode zu verwenden, die für alle eingehenden HTTP-Anfragen verfügbar ist. Goravel enthält eine große Auswahl an praktischen Validierungsregeln
.

## Validierungs-Schnellstart

Schauen wir uns ein vollständiges Beispiel an, wie man ein Formular validiert und Fehlermeldungen an den Benutzer zurückgibt. Diese Übersicht
gibt Ihnen ein allgemeines Verständnis dafür, wie Sie eingehende Anfragedaten mithilfe von Goravel überprüfen können.

### Definition der Routen

Nehmen wir zuerst an, dass die folgenden Routen in unserer Datei "routes/web.go" definiert sind:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

Die `GET` Route zeigt ein Formular zum Erstellen eines neuen Blogeintrags. Die `POST` Route speichert den neuen Beitrag in der Datenbank.

### Controller erstellen

Dann werfen wir einen Blick auf einen einfachen Controller, der eingehende Anfragen an diese Routen bearbeitet. Wir werden die `Store`
Methode jetzt leer lassen:

```go
Paket Controller

Import (
  "github. om/goravel/framework/contracts/http"
)

Typ PostController struct {
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

### Die Validierungslogik schreiben

Jetzt sind wir bereit, unsere `Store`-Methode mit der Logik auszufüllen, um den neuen Blog-Beitrag zu validieren.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required|max_len:255",
    "body": "required",
    "code": "required|regex:^\d{4,6}$",
  })
}
```

### Verschachtelte Attribute

Wenn die eingehende HTTP-Anfrage "verschachtelte" Felddaten enthält, können Sie diese Felder in Ihren Validierungsregeln mit
der Syntax "Punkt" festlegen:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "required|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Slice-Validierung

Wenn die eingehende HTTP-Anfrage "array" Felddaten enthält, können Sie diese Felder in Ihren Validierungsregeln mit
der `*` Syntax festlegen:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Formularanfrageüberprüfung

### Formularanfragen erstellen

Für komplexere Validierungsszenarien können Sie eine "Formularanfrage" erstellen. Formularanfragen sind benutzerdefinierte Anfrageklassen
, die ihre eigene Validierungs- und Autorisierungslogik zusammenfassen. Um eine Formularanfrage Klasse zu erstellen, kannst du den
`make:request` Artisan CLI Befehl verwenden:

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/Store PostRequest
```

Die generierte Formular-Request-Klasse wird im `app/http/requests` Verzeichnis abgelegt. Wenn dieses Verzeichnis nicht existiert, wird
erzeugt, wenn du den `make:request` Befehl ausführst. Jede von Goravel generierte Formularanfrage hat sechs Methoden:
`Authorize`, `Rules`. Zusätzlich kannst du die Methoden `Filters`, `Messages`, `Attributes` und `PrepareForValidation`
für weitere Operationen anpassen.

Die `Authorize` Methode ist verantwortlich für die Feststellung ob der aktuell authentifizierte Benutzer die Aktion
ausführen kann, die durch die Anfrage repräsentiert wird während die `Rules` Methode die Validierungsregeln zurückgibt, die für die
der Anfrage gelten sollten:

```go
Paket fordert

Import an (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

Typ StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) Fehler {
  return nil
}

func (r *StorePostRequest) Regeln (ctx http. ontext) map[string]string {
  return map[string]string{
    // Die Schlüssel sind konsistent mit den eingehenden Schlüsseln.
    "name": "required|max_len:255",
  }
}

func (r *StorePostRequest) Filter (ctx http. ontext) Map[string]string {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Nachrichten (ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attribute(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ontext, data validation.Data) Fehler {
  return nil
}
```

Wie werden also die Validierungsregeln bewertet? Alles, was Sie tun müssen, ist die Anfrage auf Ihre Controller-Methode zu tippen. Die
eingehende Formularanfrage wurde vor dem Aufruf der Controller-Methode validiert das bedeutet, dass Sie Ihren
Controller nicht mit einer Validierungslogik versehen müssen:

Dann kannst du die `ValidateRequest` Methode verwenden, um die Anfrage im Controller zu validieren:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Überprüfen Sie weitere Regeln in der [Verfügbare Validierungsregeln](#available-validation-rules) Sektion.

> Beachte, dass die übergebenen Werte standardmäßig von `string` sind, da `form` übergeben wurde, alle Felder in der Anfrage sollten auch vom
> `string` Typ sein, sonst benutze `JSON` um Werte zu übergeben.

### Autorisierungsformularanfragen

Die Formular-Request-Klasse enthält auch eine `Authorize` Methode. Innerhalb dieser Methode können Sie festlegen, ob der authentifizierte
-Benutzer tatsächlich die Berechtigung hat, eine bestimmte Ressource zu aktualisieren. Zum Beispiel können Sie bestimmen, ob ein Benutzer tatsächlich einen
Blog-Kommentar besitzt, den er zu aktualisieren versucht. Höchstwahrscheinlich interagierst du mit
deine [Autorisierungs-Tore und -Polices](../security/authorization) innerhalb dieser Methode:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) Fehler {
  var comment models. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors. ew("Kein Kommentar gefunden")
  }

  wenn !facades.Gate(). llows("update", map[string]any{
    "comment": comment,
  }) {
    return errors. ew("Kann Kommentar nicht aktualisieren")
  }

  zurück Nil
}
```

`error` wird an den Rückgabewert von `ctx.Request().ValidateRequest` übergeben.

### Eingabedaten filtern

Sie können die Eingabedaten formatieren, indem Sie die `Filters` Methode der Formularanforderung verbessern. Diese Methode sollte eine Karte von
`attribute/filter` zurückgeben:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### Anpassen der Fehlermeldungen

Du kannst die Fehlermeldungen, die von der Formularabfrage verwendet werden, anpassen, indem du die `Messages`-Methode überschreibst. Diese Methode sollte
ein Array mit Attribut/Regelpaaren und deren entsprechenden Fehlermeldungen zurückgeben:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. ausgerüstet": "Ein Titel ist erforderlich",
    "body.required": "Eine Nachricht wird benötigt",
  }
}
```

### Anpassen der Validierung-Attribute

Viele von Goravels eingebauten Validierungsregel Fehlermeldungen enthalten einen `:attribute` Platzhalter. Wenn Sie möchten, dass der Platzhalter
`:attribute` Ihrer Validierungsnachricht durch einen benutzerdefinierten Attributnamen ersetzt wird du kannst die
benutzerdefinierten Namen angeben, indem du die `Attributes` Methode überschreibst. Diese Methode sollte ein Array mit Attribut/Namenspaaren zurückgeben:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "email address",
  }
}
```

### Bereite Eingabe für die Validierung vor

Wenn du Daten von der Anfrage vorbereiten oder bereinigen musst, bevor du deine Validierungsregeln anwendest, kannst du die
`PrepareForValidation` Methode verwenden:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
  if name, exist := data. et("name"); vorhanden {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Validatoren manuell erstellen

Wenn du die `Validate` Methode nicht verwenden möchtest, kannst du eine Validator Instanz manuell mit dem
`facades.Validator` erstellen. Die `Make` Methode der Fassade erzeugt eine neue Validator-Instanz:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    map[string]any{
      "name": "Goravel",
    },
    Karte[string]string{
      "title": "required|max_len:255",
      "body": "required",
    })

  wenn Validator. ails() {
    // Return fail
  }

  var user models. ser
  err := validator.Bind(&user)
  ...
}
```

Das erste an die `Make` Methode übergebene Argument sind die zu validierenden Daten, die `map[string]any` oder `struct` sein können.
Das zweite Argument ist ein Array von Validierungsregeln, die auf die Daten angewendet werden sollen.

### Anpassen der Fehlermeldungen

Bei Bedarf können Sie benutzerdefinierte Fehlermeldungen angeben, die eine Validator-Instanz anstelle der Standardfehler
Nachrichten von Goravel verwenden soll. Du kannst die benutzerdefinierten Nachrichten als drittes Argument an die `Make` Methode übergeben (auch
anwendbar auf `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(Input, rules validation.Messages(map[string]string{
  "required": "The :attribute field is required.",
}))
```

### Eine benutzerdefinierte Nachricht für ein gegebenes Attribut angeben

Manchmal möchten Sie eine benutzerdefinierte Fehlermeldung nur für ein bestimmtes Attribut angeben. Sie können dies mit "dot"
Notation tun. Geben Sie zuerst den Namen des Attributs an, gefolgt von der Regel (auch anwendbar auf `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(Eingabe, Regeln, Validation.Messages(Karte[string]string{
  "email.required": "Wir müssen Ihre E-Mail-Adresse wissen!",
}))
```

### Eigene Attributwerte angeben

Viele der eingebauten Fehlermeldungen von Goravel enthalten einen Platzhalter `:attribute`, der durch den Namen des
-Feldes oder Attributs ersetzt wird, das unter Überprüfung steht. Um die Werte anzupassen, die zum Ersetzen dieser Platzhalter für bestimmte Felder verwendet werden, du
kann ein Array von benutzerdefinierten Attributen als drittes Argument an die `Make`-Methode übergeben (auch anwendbar auf
`ctx. equest().Validate()`):

```go
validator, err := facades.Validation().Make(Input, rules validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### Daten vor der Validierung formatieren

Sie können die Daten formatieren, bevor Sie die Daten für eine flexiblere Datenvalidierung validieren, und du kannst die Methode
übergeben und die Daten als dritten Parameter an die `Make` Methode übergeben (auch für `ctx anwendbar). equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(Eingabe, Regeln,
    Validierung. repareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      if name, exist := data. et("name"); exist {
        return data. et("name", name)
      }

      gibt Nil
    }))

  zurück. .
}
```

## Arbeiten mit validierter Eingabe

Nach der Validierung der eingehenden Anfragedaten mittels Formularanfragen oder manuell erstellten Validator-Instanzen du möchtest immer noch
die Anfragedaten an einen `struct` binden, es gibt zwei Möglichkeiten, dies zu tun:

1. Benutze die `Bind`-Methode, dies binde alle eingehenden Daten, einschließlich unvalidierter Daten:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(Eingabe, Regeln)
var user models.User
err := validator.Bind(&user)
```

2. Die eingehenden Daten sind bei der Validierung automatisch an das Formular gebunden:

```go
var storePost requests.StorePostRequest
Fehler, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Mit Fehlermeldungen arbeiten

### Eine Fehlermeldung für ein Feld abrufen (zufällig)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(Input, rules)

message := validator.Errors().One("email")
```

### Alle Fehlermeldungen für ein Feld abrufen

```go
nachrichten := validator.Errors().Get("email")
```

### Alle Fehlermeldungen für alle Felder abrufen

```go
nachrichten := validator.Errors().All()
```

### Bestimmt, ob Fehlermeldungen für ein Feld vorhanden sind

```go
if validator.Errors().Has("email") {
  //
}
```

## Verfügbare Validierungsregeln

Unten ist eine Liste aller verfügbaren Validierungsregeln und ihrer Funktion:

| Name                                   | Beschreibung                                                                                                                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "erforderlich"                         | Der Prüfwert ist erforderlich und kann nicht Null sein. Zum Beispiel ist der Feldtyp `bool`, der übergebene Wert ist `false`, er kann die Validierung nicht übergeben.                               |
| `required_if`                          | `required_if:anotherfield,value,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, wenn das anotherField Feld gleich einem Wert ist.                                                        |
| 'required_unless' | `required_unless:anotherfield,value,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, außer das anotherField Feld ist gleich einem Wert.                                                   |
| 'required_mit'    | `required_with:foo,bar,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, wenn eines der anderen angegebenen Felder vorhanden ist.                                                          |
| `required_with_all`                    | `required_with_all:foo,bar,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, wenn alle anderen angegebenen Felder vorhanden sind.                                                          |
| `required_without`                     | `required_without:foo,bar,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, wenn eines der anderen angegebenen Felder nicht vorhanden ist.                                                 |
| `required_without_all`                 | `required_without_all:foo,bar,...` Das zu validierende Feld muss vorhanden sein und darf nicht leer sein, wenn alle anderen angegebenen Felder nicht vorhanden sind.                                                 |
| `int`                                  | Prüfungswert ist `intX` `uintX` Typ und Überprüfung der Größe der Unterstützung. eg: `int` `int:2` `int:2,12`. Hinweis: [Punkte für die Verwendung von Regeln](#int) |
| "uint"                                 | Prüfungswert ist `uint(uintX)` Typ, `value >= 0`                                                                                                                                                                                     |
| "Bool"                                 | Check value is bool string(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                                                                 |
| 'string'                               | Prüfwert ist String-Typ und die Überprüfung der Größe. eg:`string` `string:2` `string:2,12`                                                                                                          |
| "float"                                | Prüfungswert ist `float(floatX)` Typ                                                                                                                                                                                                 |
| 'slice'                                | Prüfungswert ist Slice type(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                                               |
| 'in'                                   | `in:foo,bar,…` Prüfen Sie, ob der Wert in der angegebenen Aufzählung ist                                                                                                                                                             |
| "nicht_in"        | `not_in:foo,bar,…` Prüfen Sie, ob der Wert nicht in der angegebenen Aufzählung ist                                                                                                                                                   |
| "starts_mit"      | `starts_with:foo` Prüfen Sie, ob der Eingabezeichenwert mit dem angegebenen Substring beginnt                                                                                                                                        |
| 'ends_mit'        | "ends_with:foo" Prüfen Sie, ob der Eingabezeichenwert mit dem angegebenen Substring endet                                                                                                       |
| "zwischen"                             | `zwisch:min,max` Überprüfen Sie, ob der Wert eine Zahl ist und sich innerhalb des angegebenen Bereichs befindet                                                                                                                      |
| "max"                                  | `max:value` Prüfwert ist kleiner oder gleich dem angegebenen Wert (`intX` `uintX` `floatX`)                                                                                                                       |
| "min"                                  | `min:value` Prüfwert ist größer oder gleich dem angegebenen Wert (`intX` `uintX` `floatX`)                                                                                                                        |
| "eq"                                   | `eq:value` überprüft, ob der Eingabewert gleich dem angegebenen Wert ist                                                                                                                                                             |
| `ne`                                   | `ne:value` überprüft, ob der Eingabewert nicht dem angegebenen Wert entspricht                                                                                                                                                       |
| `lt`                                   | `lt:value` Prüfwert ist kleiner als der angegebene Wert (`intX` `uintX` `floatX`)                                                                                                                                 |
| `gt`                                   | `gt:value` Prüfwert ist größer als der angegebene Wert (`intX` `uintX` `floatX`)                                                                                                                                  |
| `len`                                  | `len:value` Prüfwertlänge entspricht der angegebenen Größe(`string` `array` `slice` `map`)                                                                                                                        |
| `min_len`                              | `min_len:value` Überprüfen Sie die minimale Länge des Wertes ist die angegebene size(`string` `array` `slice` `map`)                                                                                              |
| `max_len`                              | `max_len:value` Prüfen Sie die maximale Länge des Wertes ist die angegebene size(`string` `array` `slice` `map`)                                                                                                  |
| `email`                                | Überprüfe Wert ist E-Mail-Adressestring                                                                                                                                                                                              |
| 'array'                                | Prüfwert ist Array, Slice-Typ                                                                                                                                                                                                        |
| `map`                                  | Prüfwert ist ein MAP Typ                                                                                                                                                                                                             |
| eq_field\`        | `eq_field:field` Überprüfe, ob der Feldwert dem Wert eines anderen Feldes entspricht                                                                                                                                                 |
| 'ne_field'        | `ne_field:field` Prüfen, ob der Feldwert nicht dem Wert eines anderen Feldes entspricht                                                                                                                                              |
| `gt_field`                             | `gt_field:field` Überprüfe, ob der Feldwert größer als der Wert eines anderen Feldes ist                                                                                                                                             |
| 'gte_field'       | `gte_field:field` überprüft, ob der Feldwert größer oder gleich dem Wert eines anderen Feldes ist                                                                                                                                    |
| `lt_field`                             | `lt_field:field` Überprüfe, ob der Feldwert kleiner als der Wert eines anderen Feldes ist                                                                                                                                            |
| `lte_field`                            | `lte_field:field` Prüfen, ob der Feldwert kleiner oder gleich dem Wert eines anderen Feldes ist                                                                                                                                      |
| `Datei`                                | Überprüfen Sie, ob es eine hochgeladene Datei ist                                                                                                                                                                                    |
| `image`                                | Überprüfen Sie, ob es sich um eine hochgeladene Bilddatei und Suffix handelt                                                                                                                                                         |
| `Datum`                                | Prüfen Sie den Feldwert als Datums-String                                                                                                                                                                                            |
| `gt_date`                              | `gt_date:value` Prüfen Sie, ob der Eingabewert größer ist als der angegebene Datums-String                                                                                                                                           |
| `lt_date`                              | `lt_date:value` Überprüfe, ob der Eingabewert kleiner als der angegebene Datums-String ist                                                                                                                                           |
| `gte_date`                             | `gte_date:value` überprüft, ob der Eingabewert größer oder gleich dem angegebenen Datum ist                                                                                                                                          |
| `lte_date`                             | `lte_date:value` überprüft, ob der Eingabewert kleiner oder gleich dem angegebenen Datum ist                                                                                                                                         |
| `alpha`                                | Überprüfen Sie, dass der Wert nur alphabetische Zeichen enthält                                                                                                                                                                      |
| `alpha_num`                            | Überprüfen Sie, ob nur Buchstaben, Zahlen enthalten sind                                                                                                                                                                             |
| `alpha_dash`                           | Aktivieren um nur Buchstaben, Zahlen, Bindestriche ( - ) und Unterstriche ( _ ) zu enthalten                                                                              |
| `json`                                 | Prüfwert ist JSON-String                                                                                                                                                                                                             |
| `Nummer`                               | Prüfungswert ist Zahlenstring `>= 0`                                                                                                                                                                                                 |
| "full_url"        | Überprüfungswert ist voller URL-String(muss mit http,https) beginnen                                                                                                                                              |
| `ip`                                   | Prüfwert ist IP(v4 oder v6) String                                                                                                                                                                                |
| `ipv4`                                 | Prüfwert ist IPv4 String                                                                                                                                                                                                             |
| `ipv6`                                 | Prüfwert ist IPv6-String                                                                                                                                                                                                             |
| "regex"                                | Überprüfen Sie, ob der Wert die reguläre Verifizierung bestehen kann                                                                                                                                                                 |

### Punkte für das Benutzen von Regeln

#### int

Wenn `ctx.Request().Validate(rules)` zur Validierung verwendet wird, werden die eingehenden `int` Daten von
`json geparst. nmarshal` in den `float64` Typ, wodurch die Intenregel Validierung fehlschlägt.

**Lösungen**

Option 1: Fügen Sie [`validation.PrepareForValidation`](#format-data-before-validation), formatieren Sie die Daten vor der Validierung der
Daten;

Option 2: Benutze `facades.Validation().Make()` für die Überprüfung der Regel;

## Eigene Validierungsregeln

Goravel bietet eine Vielzahl hilfreicher Validierungsregeln; Sie können jedoch einige eigene Regeln angeben. Eine Methode der
Registrierung benutzerdefinierter Validierungsregeln verwendet Regelobjekte. Um ein neues Regelobjekt zu erzeugen, kannst du einfach den
`make:rule` Artisan Befehl verwenden.

Wenn Sie zum Beispiel überprüfen wollen, ob eine Zeichenkette Großbuchstaben ist, können Sie mit diesem Befehl eine Regel erstellen. Goravel wird
und speichert diese neue Regel im `app/rules` Verzeichnis. Wenn dieses Verzeichnis nicht existiert, wird Goravel es erstellen, wenn Sie den Artisan-Befehl
ausführen, um Ihre Regel zu erstellen.

```go
go run . artisan make:rule Großbuchstaben
go run . artisan make:rule user/Großbuchstaben
```

Nach der Erstellung der Regel müssen wir ihr Verhalten definieren. Ein Regelobjekt hat zwei Methoden: `Passes` und `Message`. Die
Pass-Methode empfängt alle Daten, einschließlich der zu validierenden Daten und der Validierungsparameter. Es sollte
`true` oder `false` zurückgeben, abhängig davon, ob der Attributwert gültig ist. Die `Message` Methode sollte die Fehlermeldung
zur Validierung zurückgeben, die verwendet werden soll, wenn die Validierung fehlschlägt.

```go
Paketregeln

Import (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

Typ Uppercase struct {
}

// Signatur Der Name der Regel.
func (Empfänger *Uppercase) Signature() string {
  return "uppercase"
}

// Legt fest, ob die Validierungsregel übergeht.
func (Empfänger *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val. String)
}

// Meldung zur Validierungsfehlermeldung erhalten.
func (Empfänger *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

Dann musst du die Regel bei der `rules` Methode in der `app/providers/validation_service_provider.go` Datei registrieren und
die Regel kann wie andere Regeln verwendet werden:

```go
Paket Provider

importieren (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (Empfänger *ValidationServiceProvider) Register() {

}

func (Empfänger *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules error: %+v", err)
  }
}

func (Receiver *ValidationServiceProvider) rules() []Validierung. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Verfügbare Validierungsfilter

| Name                           | Beschreibung                                                                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Wandle Wert (string/intX/floatX) in `int` Typ `v.FilterRule("id", "int")`                                                                                       |
| `uint/toUint`                  | Wandle Wert (string/intX/floatX) in `uint` Typ `v.FilterRule("id", "uint")`                                                                                     |
| `int64/toInt64`                | Wandle Wert (string/intX/floatX) in `int64` Typ `v.FilterRule("id", "int64")`                                                                                   |
| "float/toFloat"                | Wert (string/intX/floatX) in "float" Typ umwandeln                                                                                                              |
| `bool/toBool`                  | Zeichenkettenwert in Bool konvertieren. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "falsch") |
| 'trim/trimSpace'               | Leerzeichen auf beiden Seiten des Strings aufräumen                                                                                                                                |
| `ltrim/trimLeft`               | Leerzeichen auf der linken Seite des Strings aufräumen                                                                                                                             |
| "rtrim/trimRight"              | Leerzeichen auf der rechten Seite des Strings aufräumen                                                                                                                            |
| "int/integer"                  | Wandle Wert (string/intX/floatX) in `int` Typ `v.FilterRule("id", "int")`                                                                                       |
| "Kleinbuchstaben"              | Zeichenkette in Kleinbuchstaben konvertieren                                                                                                                                       |
| `upper/uppercase`              | Zeichenkette in Großbuchstaben konvertieren                                                                                                                                        |
| `lcFirst/lowerFirst`           | Das erste Zeichen eines Strings in Kleinbuchstaben konvertieren                                                                                                                    |
| "ucFirst/upperFirst"           | Das erste Zeichen einer Zeichenkette in Großbuchstaben konvertieren                                                                                                                |
| "ucWord/upperWord"             | Das erste Zeichen jedes Wortes in Großbuchstaben umwandeln                                                                                                                         |
| `camel/camelCase`              | Zeichenkette in Kamelnamensstil umwandeln                                                                                                                                          |
| `snake/snakeCase`              | Zeichenkette in Stil für Schlangennamen umwandeln                                                                                                                                  |
| `escapeJs/escapeJS`            | Escape JS String.                                                                                                                                                  |
| `escapeHtml/escapeHTML`        | HTML-Zeichenkette ausgeben.                                                                                                                                        |
| `str2ints/strToInts`           | Konvertiere String in Int `[]int`                                                                                                                                                  |
| `str2time/strToTime`           | Datumsstring in `time.Time` konvertieren.                                                                                                                          |
| `str2arr/str2array/strToArray` | String in String `[]string` konvertieren                                                                                                                                           |

## Eigener Filter

Goravel stellt eine Vielzahl hilfreicher Filter zur Verfügung, allerdings können Sie einige Ihrer eigenen Filter angeben. Um eine neue Regel
Objekt zu generieren, kannst du einfach den `make:filter` Artisan Befehl verwenden. Lassen Sie uns diesen Befehl verwenden, um eine Regel zu generieren, die einen
String in eine Ganzzahl konvertiert. Diese Regel ist bereits in den Rahmen eingebaut, wir schaffen sie nur als Beispiel. Goravel wird diesen neuen Filter
im `app/filters` Verzeichnis speichern. Wenn dieses Verzeichnis nicht existiert, wird Goravel es erstellen, wenn Sie
den Artisan-Befehl ausführen, um die Regel zu erstellen:

```go
go run . artisan make:filter ToInt
// oder
go run . artisan make:filter user/ToInt
```

Ein Filter enthält zwei Methoden: `Signature` und `Handle`. Die `Signature` Methode legt den Namen des Filters fest. Die
`Handle` Methode führt die spezifische Filterlogik aus:

```go
Paketfilter

Import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

Typ ToInt struct {
}

// Signatur Die Signatur des Filters.
func (Empfänger *ToInt) Signature() string {
  return "ToInt"
}

// Handle definiert die anzuwendende Filterfunktion.
func (Empfänger *ToInt) Handle() any {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Dann musst du den Filter auf die `filters` Methode in der `app/providers/validation_service_provider.go`-Datei registrieren,
und der Filter kann wie andere verwendet werden:

```go
Paket Provider

importieren (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (Empfänger *ValidationServiceProvider) Register() {

}

func (Empfänger *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("add filter error: %+v", err)
  }
}

func (Receiver *ValidationServiceProvider) filters() []Validierung. ilter {
  return []validation.Filter{
    &filters.Int{},
  }
}
```
