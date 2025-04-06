# Convalida

Goravel fornisce diversi approcci per convalidare i dati in entrata della tua applicazione. È più comune usare il metodo `Validate`
disponibile su tutte le richieste HTTP in arrivo. Goravel include una vasta gamma di convenienti regole di convalida
.

## Avvio Rapido Di Convalida

Diamo un'occhiata più da vicino a un esempio completo di come convalidare un modulo e restituire messaggi di errore all'utente. Questa panoramica
ti fornirà una comprensione generale di come convalidare i dati di richiesta in arrivo utilizzando Goravel.

### Definire Le Itinerari

In primo luogo, supponiamo che abbiamo i seguenti percorsi definiti nel nostro file `routes/web.go`:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

Il percorso `GET` mostra un modulo per creare un nuovo post sul blog. Il percorso `POST` memorizza il nuovo post nel database.

### Creazione Del Controllore

Successivamente, diamo un'occhiata a un semplice controllore che gestisce le richieste in arrivo per questi percorsi. Lasceremo il metodo `Store`
vuoto per ora:

```go
package controllers

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

### Scrittura La Logica Di Convalida

Ora siamo pronti a riempire il nostro metodo `Store` con la logica di convalidare il nuovo post del blog.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required<unk> max_len:255",
    "body": "required",
    "codice": "required<unk> regex:^\d{4,6}$",
  })
}
```

### Attributi Nestati

Se la richiesta HTTP in arrivo contiene dati di campo "annidati", è possibile specificare questi campi nelle regole di convalida utilizzando
la sintassi "dot":

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "required<unk> max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Convalida A Fette

Se la richiesta HTTP in arrivo contiene dati di campo "array", è possibile specificare questi campi nelle regole di convalida utilizzando
la sintassi `*`:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Convalida Richiesta Modulo

### Creazione Richieste Di Modulo

Per scenari di convalida più complessi, potresti voler creare una "richiesta di modulo". Le richieste di modulo sono classi di richiesta personalizzate
che incapsulano la propria logica di convalida e autorizzazione. Per creare una classe di richiesta di moduli, puoi usare il comando CLI Artisan
`make:request`:

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

La classe generata di richiesta del modulo verrà inserita nella directory `app/http/requests`. Se questa directory non esiste,
verrà creata quando esegui il comando `make:request`. Ogni richiesta di modulo generata da Goravel ha sei metodi:
`Authorize`, `Rules`. Inoltre, puoi personalizzare i metodi `Filtri`, `Messaggi`, `Attributes` e `PrepareForValidation`
per ulteriori operazioni.

Il metodo `Authorize` è responsabile per determinare se l'utente attualmente autenticato può eseguire l'azione
rappresentata dalla richiesta, mentre il metodo `Rules` restituisce le regole di convalida che dovrebbero applicarsi ai dati
della richiesta:

```go
package requests

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) errore {
  return nil
}

func (r *StorePostRequest) Rules(ctx http. ontext) map[string]string {
  return map[string]string{
    // Le chiavi sono coerenti con le chiavi in arrivo.
    "name": "required<unk> max_len:255",
  }
}

func (r *StorePostRequest) Filtri(ctx http. ontext) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Messaggi(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ontext, data validation.Data) errore {
  return nil
}
```

Quindi, come vengono valutate le regole di convalida? Tutto quello che devi fare è suggerire la richiesta sul tuo metodo di controller. La richiesta di modulo
viene convalidata prima di chiamare il metodo del controller, significa che non hai bisogno di ingombrare il tuo controller
con alcuna logica di convalida:

Quindi puoi usare il metodo `ValidateRequest` per convalidare la richiesta nel controller:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Controlla più regole nella sezione [Regole di convalida disponibili](#available-validation-rules).

> Nota che poiché `form` i valori passati <unk> <unk> sono di tipo `string` per impostazione predefinita, tutti i campi nella richiesta dovrebbero essere di tipo
> `string`, altrimenti usa `JSON` per superare i valori.

### Richiesta Modulo Autorizzazione

La classe di richiesta del modulo contiene anche un metodo `Authorize`. All'interno di questo metodo, è possibile determinare se l'utente autenticato
ha effettivamente l'autorità di aggiornare una determinata risorsa. Ad esempio, è possibile determinare se un utente possiede effettivamente un commento del blog
che stanno tentando di aggiornare. Molto probabilmente, interagirai con
i tuoi [cancelli di autorizzazione e politiche](../security/authorization) all'interno di questo metodo:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment models. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors. ew("nessun commento trovato")
  }

  se !facades.Gate(). llows("update", map[string]any{
    "comment": commento,
  }) {
    return errors. ew("can't update comment")
  }

  return nil
}
```

`error` verrà passato al valore di ritorno di `ctx.Request().ValidateRequest`.

### Filtro Dati Di Ingresso

È possibile formattare i dati di input migliorando il metodo `Filtri` della richiesta del modulo. Questo metodo dovrebbe restituire una mappa di
`attribute/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### Personalizzazione Dei Messaggi Di Errore

Puoi personalizzare i messaggi di errore usati dalla richiesta del modulo sovrascrivendo il metodo `Messages`. Questo metodo dovrebbe
restituire un array di coppie di attributi / regole e i loro messaggi di errore corrispondenti:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. equired": "È richiesto un titolo",
    "body.required": "È richiesto un messaggio",
  }
}
```

### Personalizzare Gli Attributi Di Convalida

Molti messaggi di errore di regola di convalida incorporati di Goravel contengono un segnaposto `:attribute`. Se vuoi che il segnaposto
`:attribute` del tuo messaggio di convalida sia sostituito con un nome di attributo personalizzato, puoi specificare i nomi personalizzati
sovrascrivendo il metodo `Attributes`. Questo metodo dovrebbe restituire un array di coppie attributo / nome:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "email address",
  }
}
```

### Preparazione Input Per La Convalida

Se hai bisogno di preparare o sanificare eventuali dati dalla richiesta prima di applicare le tue regole di convalida, puoi usare il metodo
`PrepareForValidation`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
  if name, exist := data. et("name"); exist {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Creazione Manualmente Dei Validatori

If you do not want to use the `Validate` method on the request, you may create a validator instance manually using the
`facades.Validator`. Il metodo `Make` della facciata genera una nuova istanza di validatore:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    map[string]any{
      "name": "Goravel",
    },
    map[string]string{
      "title": "required<unk> max_len:255",
      "body": "required",
    })

  se validatore. ails() {
    // Return fail
  }

  var user models. ser
  err := validator.Bind(&user)
  ...
}
```

Il primo argomento passato al metodo `Make` sono i dati sotto convalida che possono essere `map[string]any` o `struct`.
Il secondo argomento è una serie di regole di convalida da applicare ai dati.

### Personalizzazione Dei Messaggi Di Errore

Se necessario, è possibile fornire messaggi di errore personalizzati che un'istanza di validatore dovrebbe utilizzare invece dei messaggi di errore
predefiniti forniti da Goravel. Puoi passare i messaggi personalizzati come terzo argomento al metodo `Make` (anche
applicabile a `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "required": "The :attribute field is required.",
}))
```

### Specificare Un Messaggio Personalizzato Per Un Attributo Dato

A volte è possibile specificare un messaggio di errore personalizzato solo per un attributo specifico. Puoi farlo usando la notazione "dot"
. Specifica prima il nome dell'attributo, seguito dalla regola (applicabile anche a `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "email.required": "Abbiamo bisogno di conoscere il tuo indirizzo email!",
}))
```

### Specificare I Valori Attributi Personalizzati

Molti dei messaggi di errore incorporati da Goravel includono un segnaposto `:attribute` che viene sostituito con il nome del campo
o attributo sotto convalida. Per personalizzare i valori usati per sostituire questi segnaposto per campi specifici, tu
puoi passare un array di attributi personalizzati come terzo argomento al metodo `Make` (anche applicabile a
`ctx. equest().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### Formato Dati Prima Della Convalida

È possibile formattare i dati prima di convalidare i dati per una più flessibile convalida dei dati, e puoi passare il metodo di formattazione
dei dati come terzo parametro al metodo `Make` (applicabile anche a `ctx. equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation. repareForValidation(func(ctx http.Context, data validationcontract.Data) error {
      if name, exist := data. et("name"); exist {
        return data. et("nome", nome)
      }

      return nil
    }))

  . .
}
```

## Lavorare Con Input Validato

Dopo aver convalidato i dati di richiesta in arrivo utilizzando richieste di modulo o istanze di validazione create manualmente, vuoi ancora associare
i dati della richiesta a un `struct`, ci sono due modi per fare questo:

1. Usa il metodo `Bind`, questo collegherà tutti i dati in ingresso, inclusi i dati non convalidati:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. I dati in entrata sono automaticamente vincolati al modulo quando si utilizza la richiesta di convalida:

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Lavorare Con I Messaggi Di Errore

### Recupero di un messaggio di errore per un campo (Random)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### Recupero Tutti I Messaggi Di Errore Per Un Campo

```go
messaggi := validator.Errors().Get("email")
```

### Recupero Tutti I Messaggi Di Errore Per Tutti I Campi

```go
messaggi := validator.Errors().All()
```

### Determinare Se I Messaggi Di Errore Esiste Per Un Campo

```go
if validator.Errors().Has("email") {
  //
}
```

## Regole Di Convalida Disponibili

Di seguito è riportato un elenco di tutte le regole di convalida disponibili e la loro funzione:

| Nome                   | Descrizione                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `required`             | Il valore di controllo è richiesto e non può essere pari a zero. Per esempio, il tipo di campo è `bool`, il valore che passa è `false`, non può passare la convalida.                                |
| `required_if`          | `required_if:anotherfield,value,...` Il campo sotto convalida deve essere presente e non vuoto se l'anotherField è uguale a qualsiasi valore.                                                                        |
| `required_unless`      | `required_unless:anotherfield,value,...` Il campo sotto convalida deve essere presente e non vuoto a meno che l'anotherField non sia uguale a qualsiasi valore.                                                      |
| `required_with`        | `required_with:foo,bar,...` Il campo sotto convalida deve essere presente e non vuoto solo se sono presenti altri campi specificati.                                                                                 |
| `required_with_all`    | `required_with_all:foo,bar,...` Il campo sotto convalida deve essere presente e non vuoto solo se sono presenti tutti gli altri campi specificati.                                                                   |
| `required_without`     | `required_without:foo,bar,...` Il campo sotto convalida deve essere presente e non vuoto solo quando uno degli altri campi specificati non sono presenti.                                                            |
| `required_without_all` | `required_without_all:foo,bar,...` Il campo sotto convalida deve essere presente e non vuoto solo quando tutti gli altri campi specificati non sono presenti.                                                        |
| `int`                  | Il valore di verifica è il tipo `intX` `uintX` e il controllo della dimensione del supporto. eg: `int` `int:2` `int:2,12`. Avviso: [Punti per usare le regole](#int) |
| `uint`                 | Il valore di verifica è `uint(uintX)` tipo, `value >= 0`                                                                                                                                                                             |
| `bool`                 | Il valore di verifica è stringhe bool (`true`: "1", "on", "sì", "true", `false`: "0", "off", "no", "false").                                                      |
| `string`               | Il valore di controllo è il tipo di stringa e il controllo della dimensione del supporto. eg:`string` `string:2` `string:2,12`                                                                       |
| `float`                | Il valore di controllo è il tipo `float(floatX)`                                                                                                                                                                                     |
| `slice`                | Il valore di verifica è il tipo di slice (`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                                 |
| `in`                   | `in:foo,bar,…` Verifica se il valore è nell'enumerazione data                                                                                                                                                                        |
| `not_in`               | `not_in:foo,bar,…` Verifica se il valore non è nell'enumerazione data                                                                                                                                                                |
| `starts_with`          | `starts_with:foo` Verifica se il valore della stringa in ingresso è iniziato con la sotto-stringa data                                                                                                                               |
| `ends_with`            | `ends_with:foo` Verifica se il valore della stringa in ingresso termina con la sotto-stringa data                                                                                                                                    |
| `tra`                  | `tra: min,max` Verificare che il valore sia un numero e rientri nell'intervallo indicato                                                                                                                                             |
| `max`                  | `max:value` Verifica che il valore sia inferiore o uguale al valore dato (`intX` `uintX` `floatX`)                                                                                                                |
| `min`                  | `min:value` Verifica che il valore sia maggiore o uguale al valore dato (`intX` `uintX` `floatX`)                                                                                                                 |
| `eq`                   | `eq:value` Verifica che il valore in ingresso sia uguale al valore dato                                                                                                                                                              |
| `ne`                   | `ne:value` Verifica che il valore in ingresso non sia uguale al valore dato                                                                                                                                                          |
| `lt`                   | `lt:value` Il valore di verifica è inferiore al valore dato (`intX` `uintX` `floatX`)                                                                                                                             |
| `gt`                   | `gt:value` Il valore di verifica è maggiore del valore dato (`intX` `uintX` `floatX`)                                                                                                                             |
| `len`                  | `len:value` La lunghezza del valore di controllo è uguale alla dimensione data (`string` `array` `slice` `map`)                                                                                                   |
| `min_len`              | `min_len:value` Controlla la lunghezza minima del valore è la dimensione data (`string` `array` `slice` `map`)                                                                                                    |
| `max_len`              | `max_len:value` Controlla la lunghezza massima del valore è la dimensione data (`string` `array` `slice` `map`)                                                                                                   |
| `email`                | Il valore di verifica è la stringa di indirizzo email                                                                                                                                                                                |
| `array`                | Il valore di controllo è array, tipo di fetta                                                                                                                                                                                        |
| `map`                  | Il valore di controllo è un tipo MAP                                                                                                                                                                                                 |
| `eq_field`             | `eq_field:field` Verifica che il valore del campo sia uguale al valore di un altro campo                                                                                                                                             |
| `ne_field`             | `ne_field:field` Verifica che il valore del campo non sia uguale al valore di un altro campo                                                                                                                                         |
| `gt_field`             | `gt_field:field` Verifica che il valore del campo sia maggiore del valore di un altro campo                                                                                                                                          |
| `gte_field`            | `gte_field:field` Verifica che il valore del campo sia maggiore o uguale al valore di un altro campo                                                                                                                                 |
| `lt_field`             | `lt_field:field` Verifica che il valore del campo sia inferiore al valore di un altro campo                                                                                                                                          |
| `lte_field`            | `lte_field:field` Verifica se il valore del campo è inferiore o uguale al valore di un altro campo                                                                                                                                   |
| `file`                 | Verifica se è un file caricato                                                                                                                                                                                                       |
| `image`                | Verifica se è un file di immagine caricato e supporta il controllo suffisso                                                                                                                                                          |
| `date`                 | Controlla il valore del campo è la stringa di data                                                                                                                                                                                   |
| `gt_date`              | `gt_date:value` Verifica che il valore in ingresso sia maggiore della stringa data specificata                                                                                                                                       |
| `lt_date`              | `lt_date:value` Verifica che il valore in ingresso sia inferiore alla stringa data specificata                                                                                                                                       |
| `gte_date`             | `gte_date:value` Verifica che il valore di input sia maggiore o uguale alla stringa data specificata                                                                                                                                 |
| `lte_date`             | `lte_date:value` Verifica che il valore in ingresso sia inferiore o uguale alla stringa data specificata                                                                                                                             |
| `alpha`                | Verifica che il valore contenga solo caratteri alfabetici                                                                                                                                                                            |
| `alpha_num`            | Controlla che siano inclusi solo lettere, numeri                                                                                                                                                                                     |
| `alpha_dash`           | Spunta la casella per includere solo lettere, numeri, trattini ( - ), e trattini bassi ( _ )                                                                              |
| `json`                 | Il valore di controllo è la stringa JSON                                                                                                                                                                                             |
| `number`               | Il valore di controllo è la stringa numero `>= 0`                                                                                                                                                                                    |
| `full_url`             | Il valore di controllo è la stringa di URL completa (deve iniziare con http,https)                                                                                                                                |
| `ip`                   | Il valore di controllo è la stringa IP(v4 o v6)                                                                                                                                                                   |
| `ipv4`                 | Il valore di controllo è la stringa IPv4                                                                                                                                                                                             |
| `ipv6`                 | Il valore di controllo è la stringa IPv6                                                                                                                                                                                             |
| `regex`                | Verifica se il valore può superare la verifica regolare                                                                                                                                                                              |

### Punti Per L'Uso Delle Regole

#### int

Quando si utilizza `ctx.Request().Validate(rules)` per la convalida, i dati di tipo `int` in arrivo verranno analizzati da
`json. nmarshal` nel tipo `float64`, che causerà il fallimento della convalida della regola int.

**Soluzioni**

Opzione 1: aggiungere [`validation.PrepareForValidation`](#format-data-before-validation), formattare i dati prima di convalidare i dati
;

Opzione 2: Usa `facades.Validation().Make()` per la convalida delle regole;

## Regole Di Convalida Personalizzate

Goravel fornisce una varietà di utili regole di convalida; tuttavia, si può desiderare di specificare alcune delle proprie. Un metodo di
che registra le regole di convalida personalizzate è quello di utilizzare gli oggetti delle regole. Per generare un nuovo oggetto di regola, puoi semplicemente usare il comando Artigiano
`make:rule`.

Per esempio, se si desidera verificare che una stringa sia in maiuscolo, è possibile creare una regola con questo comando. Goravel salverà
questa nuova regola nella directory `app/rules`. Se questa directory non esiste, Goravel la creerà quando
esegui il comando Artigiano per creare la tua regola.

```go
go run . artisan make:rule Uppercase
go run . artisan make:rule user/Uppercase
```

Dopo aver creato la regola, dobbiamo definirne il comportamento. Un oggetto regola ha due metodi: `Passes` e `Message`. Il metodo
Passes riceve tutti i dati, compresi i dati da convalidare e i parametri di convalida. Dovrebbe restituire
`true` o `false` a seconda che il valore dell'attributo sia valido. Il metodo `Message` dovrebbe restituire il messaggio di errore
per la convalida che dovrebbe essere utilizzato quando la convalida fallisce.

```go
pacchetto regole

import (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Firma Il nome della regola.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes Determina se la regola di convalida passa.
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val. stringa)
}

// Messaggio Ricevi il messaggio di errore di convalida.
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

Quindi devi registrare la regola nel metodo `rules` nel file `app/providers/validation_service_provider.go` e
la regola può essere usata come altre regole:

```go
package provider

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("aggiungi regole errore: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Filtri Di Convalida Disponibili

| Nome                           | Descrizione                                                                                                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Converti value(string/intX/floatX) in `int` type `v.FilterRule("id", "int")`                                                                                    |
| `uint/toUint`                  | Converti value(string/intX/floatX) in `uint` type `v.FilterRule("id", "uint")`                                                                                  |
| `int64/toInt64`                | Converti value(string/intX/floatX) in `int64` tipo `v.FilterRule("id", "int64")`                                                                                |
| `float/toFloat`                | Converti valore (string/intX/floatX) in tipo `float`                                                                                                            |
| `bool/toBool`                  | Converte il valore della stringa in bool. (`true`: "1", "on", "sì", "true", `false`: "0", "off", "no", "falso") |
| `trim/trimSpace`               | Pulisci i caratteri dello spazio bianco su entrambi i lati della stringa                                                                                                           |
| `ltrim/trimLeft`               | Pulisci i caratteri dello spazio bianco sui lati sinistro della stringa                                                                                                            |
| `rtrim/trimRight`              | Pulisci i caratteri dello spazio bianco sul lato destro della stringa                                                                                                              |
| `int/integer`                  | Converti value(string/intX/floatX) in `int` type `v.FilterRule("id", "int")`                                                                                    |
| `lower/lowercase`              | Converti stringa in minuscolo                                                                                                                                                      |
| `upper/uppercase`              | Converti la stringa in maiuscolo                                                                                                                                                   |
| `lcFirst/lowerFirst`           | Converte il primo carattere di una stringa in minuscolo                                                                                                                            |
| `ucFirst/upperFirst`           | Converte il primo carattere di una stringa in maiuscolo                                                                                                                            |
| `ucWord/upperWord`             | Converte il primo carattere di ogni parola in maiuscolo                                                                                                                            |
| `camel/camelCase`              | Converti stringa in stile nome cammello                                                                                                                                            |
| `snake/snakeCase`              | Converti la stringa in stile nome serpente                                                                                                                                         |
| `escapeJs/escapeJS`            | Fuga la stringa JS.                                                                                                                                                |
| `escapeHtml/escapeHTML`        | Esci dalla stringa HTML.                                                                                                                                           |
| `str2ints/strToInts`           | Converti stringa in int slice `[]int`                                                                                                                                              |
| `str2time/strToTime`           | Converti la stringa della data in `time.Time`.                                                                                                                     |
| `str2arr/str2array/strToArray` | Converti stringa in stringa `[]string`                                                                                                                                             |

## Filtro personalizzato

Goravel fornisce una varietà di filtri utili, tuttavia, si può desiderare di specificare alcuni dei vostri propri. Per generare un nuovo oggetto
, puoi semplicemente usare il comando `make:filter` Artigiano. Usiamo questo comando per generare una regola che converte una stringa
in un numero intero. Questa regola è già stata inserita nel quadro, basta crearla a titolo di esempio. Goravel salverà
questo nuovo filtro nella directory `app/filters`. Se questa directory non esiste, Goravel la creerà quando esegui
il comando Artigiano per creare la regola:

```go
go run . artisan make:filter ToInt
// or
go run . artisan make:filter user/ToInt
```

Un filtro contiene due metodi: `Signature` e `Handle`. Il metodo `Signature` imposta il nome del filtro. Il metodo `Handle`
esegue la logica di filtraggio specifica:

```go
package filters

import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Firma La firma del filtro.
func (receiver *ToInt) Signature() string {
  return "ToInt"
}

// Handle definisce la funzione filtro da applicare.
func (receiver *ToInt) Handle() any {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Quindi è necessario registrare il filtro nel metodo `filters` nel file `app/providers/validation_service_provider.go`,
e il filtro può essere usato come altri:

```go
package provider

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("aggiungi filtri errore: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
