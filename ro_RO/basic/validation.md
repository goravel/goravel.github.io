# Validare

Goravel oferă mai multe abordări diferite pentru a valida datele de intrare ale aplicației dvs. Cel mai frecvent este să utilizaţi metoda
`Validate` disponibilă la toate cererile HTTP primite. Goravel include o mare varietate de reguli de validare convenabilă
.

## Validare rapidă

Să aruncăm o privire mai atentă la un exemplu complet de validare a unui formular și de returnare a mesajelor de eroare către utilizator. Acest rezumat
vă va oferi o înțelegere generală despre cum să validați datele din solicitarea de primire folosind Goravel.

### Definirea rutelor

În primul rând, să presupunem că avem următoarele rute definite în fișierul nostru `rutes/web.go`:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

Ruta `GET` afişează un formular pentru crearea unui nou post de blog. Ruta `POST` stochează noul post în baza de date.

### Crearea controlorului

Apoi, hai să aruncăm o privire la un simplu controlor care se ocupă de cererile primite către aceste rute. Vom lăsa metoda `Store`
goală deocamdată:

```go
controlerele de pachete

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

### Scrierea logicii de validare

Acum suntem gata să completăm metoda `Store` cu logica pentru a valida noul post de blog.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(harta[string]string{
    "title": "required<unk> max_len:255",
    "body": "required",
    "cod": "Necesar:regex:^\d{4,6}$",
  })
}
```

### Atribute imbricate

If the incoming HTTP request contains "nested" field data, you may specify these fields in your validation rules using
the "dot" syntax:

```go
validator, err := ctx.Request().Validate(harta[string]string{
  "title": "required<unk> max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Validare secţiune

If the incoming HTTP request contains "array" field data, you may specify these fields in your validation rules using
the `*` syntax:

```go
validator, err := ctx.Request().Validate(harta[string]string{
  "tags.*": "required",
})
```

## Validare solicitare formular

### Crearea de cereri de formular

Pentru scenarii de validare mai complexe, ați putea dori să creați o „solicitare de formular”. Cererile de formular sunt clase de cereri personalizate
care încorporează propria lor logică de validare și autorizare. Pentru a crea o clasă de solicitări de formulare, puteţi utiliza comanda
`make:request` Artisan CLI:

```go
mergi să rulezi . artizan:request StorePostRequest
mergi să rulezi . artizan:request user/StorePostRequest
```

Formularul de cerere generat va fi plasat în folderul `app/http/requests`. Dacă acest director nu există,
va fi creat când rulați comanda `make:request`. Fiecare cerere de formular generată de Goravel are şase metode:
`Authorize`, `Rules`. În plus, puteţi personaliza metodele `Filtre`, `Messages`, `Atributes` şi `PrepareForValidation`
pentru operaţii ulterioare.

Metoda `Authorize` este responsabilă pentru a determina dacă utilizatorul autentificat în prezent poate efectua acțiunea
reprezentată de cerere, în timp ce metoda `Reguli` returnează regulile de validare care ar trebui să se aplice datelor
solicitării:

```go
pachetele solicită

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Numele de caractere `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. eroare) eroare {
  return nil
}

func (r *StorePostRequest) Reguli (ctx http. ontext) harta[string]string {
  return map[string]string{
    // Cheile sunt compatibile cu cheile primite.
    "nume": "required<unk> max_len:255",
  }
}

func (r *StorePostRequest) Filtre (ctx http. ontext) mapa[string]{
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Messages(ctx http. ontext) harta[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. eroarea {
  return nil
}
```

Deci, cum sunt evaluate regulile de validare? Tot ce trebuie să faci este să indici cererea pe metoda de control. Solicitarea formularului de intrare
este validată înainte de apelarea metodei controlerului, însemnând că nu este nevoie să aglomerați controlerul
cu vreo logică de validare:

Apoi puteţi utiliza metoda `ValidateRequest` pentru a valida cererea în controller:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  , err := ctx.Request().ValidateRequest(&storePost)
}
```

Verifică mai multe reguli în secțiunea [Reguli de validare disponibile](#available-validation-rules).

> Țineți cont că de când `form` a trecut valorile <unk> sunt de tip `șir` implicit, toate câmpurile în cerere ar trebui să fie de tipul
> , altfel vă rugăm să folosiți `JSON` pentru a trece valorile.

### Autorizare Cereri Formular

Clasa de cereri de formular conține, de asemenea, o metodă `Authorize`. În cadrul acestei metode, puteți determina dacă utilizatorul autentificat
are autoritatea de a actualiza o resursă dată. De exemplu, poți determina dacă un utilizator deține de fapt un comentariu de blog
pe care încearcă să îl actualizeze. Cel mai probabil, veți interacționa cu
[porțile de autorizare și politicile](../security/authorization) în cadrul acestei metode:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) eroare {
  var comment models. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors. ew("niciun comentariu nu a fost găsit")
  }

  dacă !facades.Gate(). llows("update", map[string]any{
    "comment": comentariu,
  }) {
    erori de returnare. ew("cannot update comment")
  }

  return nil
}
```

`error` va fi trecut la valoarea de returnare a `ctx.Request().ValidateRequest`.

### Filtrează datele de intrare

Puteţi formata datele de intrare prin îmbunătăţirea metodei `Filtre` a solicitării formularului. This method should return an map of
`attribute/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}
```

### Personalizarea mesajelor de eroare

Puteţi personaliza mesajele de eroare folosite de solicitarea formularului prin suprascrierea metodei `Messages`. This method should
return an array of attribute / rule pairs and their corresponding error messages:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. ecvidee": "este necesar un titlu",
    "body.required": "este necesar un mesaj",
  }
}
```

### Personalizând atributele de validare

Multe dintre mesajele de eroare incluse la regula de validare a Goravel conțin un substituent `:attribute`. Dacă doriţi ca substituentul
`:attribute` al mesajului de validare să fie înlocuit cu un nume de atribut personalizat, puteți specifica numele personalizate
prin suprascrierea metodei `Atribute`. Această metodă ar trebui să returneze o serie de atribuiri / perechi de nume:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "adresa de e-mail",
  }

```

### Pregătirea intrărilor pentru validare

Dacă trebuie să pregătești sau să sanitizezi orice date din cerere înainte de a aplica regulile de validare, poți folosi metoda
`PrepareForValidation`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) error {
  if name, exist := data.Get("name"); exist {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Crearea manuală de validatori

Dacă nu doriţi să utilizaţi metoda `Validate` în cerere, puteţi crea o instanţă de validare manual folosind
`facades.Validator`. Metoda `Make` a fațadei generează o nouă instanță de validare:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    harta[string]any{
      "name": "Goravel",
    },
    harta[string]string{
      "title": "required<unk> max_len:255",
      "body": "required",
    })

  dacă validatorul. Urlet() {
    // Returnare fail
  }

  var modele de utilizator. ser
  err := validator.Bind(&user)
  ...
}
```

Primul argument transmis la metoda `Make` este datele validate care pot fi `map[string]any` sau `struct`.
Al doilea argument este o serie de norme de validare care trebuie aplicate datelor.

### Personalizarea mesajelor de eroare

Dacă este necesar, puteți furniza mesaje de eroare personalizate pe care o instanță de validare ar trebui să le utilizeze în locul erorii implicite
mesajelor furnizate de Goravel. Puteţi trece mesajele personalizate ca al treilea argument la metoda `Make` (de asemenea
aplicabil la `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(harta[string]string{
  "required": "Câmpul :attribute este necesar.",
}))
```

### Specificarea unui mesaj personalizat pentru un atribut dat

Uneori poate doriți să specificați un mesaj de eroare personalizat numai pentru un anumit atribut. Poți face acest lucru folosind notația "punct"
. Specificați mai întâi numele atributului, urmat de regulă [se aplică și lui `ctx.Request().Validate()`:

```go
validator, err := facades.Validation().Make(input, rules, validation.Messages(harta[string]string{
  "email.required": "Trebuie să îți cunoști adresa de e-mail!",
}))
```

### Specificarea valorilor atributului Personalizat

Multe dintre mesajele de eroare încorporate ale Goravel includ un substituent `:attribute` care este înlocuit cu numele câmpului
sau atributul în curs de validare. Pentru a personaliza valorile folosite pentru a înlocui acești substituenți pentru anumite câmpuri, dumneavoastră
poate trece o serie de atribute personalizate ca al treilea argument la metoda `Make` (se aplică şi la
`ctx. echest().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules validation.Attributes(map[string]string{
  "email": "adresa de e-mail",
}))
```

### Formatați datele înainte de validare

Puteți formata datele înainte de a valida datele pentru o validare mai flexibilă, și puteți trece metoda
de formatare a datelor ca al treilea parametru la metoda `Make` (se aplică și la `ctx. echest().Validate()`):

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

## Lucrând cu intrare validată

After validating incoming request data using form requests or manually created validator instances, you still want to
bind the request data to a `struct`, there are two ways to do this:

1. Utilizaţi metoda `Bind`, aceasta va lega toate datele primite, inclusiv datele nevalidate:

```go
validator, err := ctx.Request().Validate(reguli)
var user models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(input, ruli)
var modele de utilizator.Utilizator
err := validator.Bind(&user)
```

2. Datele de intrare sunt legate automat de formular atunci când utilizați solicitarea de validare:

```go
var storePost requests.StorePostRequest
err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Lucrând cu mesaje de eroare

### Preluarea unui mesaj de eroare pentru un câmp (Random)

```go
validator, err := ctx.Request().Validate(reguli)
validator, err := facades.Validation().Make(input, reguli)

mesaj := validator.Errors().One("email")
```

### Preluarea tuturor mesajelor de eroare pentru un câmp

```go
mesaje := validator.Errors().Get("email")
```

### Preluarea tuturor mesajelor de eroare pentru toate câmpurile

```go
mesaje := validator.Errors().All()
```

### Determinarea mesajelor de eroare Exist pentru un câmp

```go
if validator.Errors().Has("email") {
  //
}
```

## Reguli de validare disponibile

Mai jos este o listă a tuturor regulilor de validare disponibile și a funcției lor:

| Nume                   | Descriere                                                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `required`             | Verifica valoarea este necesara si nu poate fi valoarea zero. De exemplu, tipul de câmp este `bool`, valoarea pasului este `false`, nu poate trece validarea.                                              |
| `required_if`          | `required_if:anotherfield,value,...` Câmpul de validare trebuie să fie prezent și nu gol dacă câmpul de alt câmp este egal cu orice valoare.                                                                               |
| `required_unless`      | `required_unless:anotherfield,value,...` Câmpul de validare trebuie să fie prezent și să nu fie gol decât dacă câmpul alt câmp este egal cu orice valoare.                                                                 |
| `required_cu`          | `required_cu:foo,bar,...` Câmpul de validare trebuie să fie prezent și nu gol doar dacă sunt prezente oricare dintre celelalte câmpuri specificate.                                                                        |
| `required_with_all`    | `required_with_all:foo,bar,...` Câmpul de validare trebuie să fie prezent și nu gol doar dacă sunt prezente toate celelalte câmpuri specificate.                                                                           |
| `required_without`     | `required_without:foo,bar,...` Câmpul validat trebuie să fie prezent și nu gol doar atunci când oricare dintre celelalte câmpuri specificate nu este prezent.                                                              |
| `required_without_all` | `required_without_all:foo,bar,...` Câmpul de validare trebuie să fie prezent și nu gol doar atunci când nu sunt prezente toate celelalte câmpuri specificate.                                                              |
| `int`                  | Valoarea de verificare este de tip `intX` uintX`şi acceptă dimensiunea de verificare. eg:`int` `int:2` `int:2,12\`. Observație: [Puncte pentru utilizarea regulilor](#int) |
| `uint`                 | Valoarea de verificare este de tip `uint(uintX)`, `value >= 0`                                                                                                                                                                             |
| `bool`                 | Check value is bool string(`true`: "1", "on", "da", "true", "false\`: "0", "off", "nu", "false").                                                                       |
| `string`               | Verifica valoarea este tip sir si suport pentru verificare. eg:`string` `string:2` `string:2,12`                                                                                                           |
| `float`                | Valoarea de verificare este de tip `float(floatX)`                                                                                                                                                                                         |
| `slice`                | Verifică valoarea este tipul de slice `[]intX` `[]uintX` `[]byte` `[]byte` `[]string`)                                                                                                                                                     |
| `in`                   | `in:foo,bar,…` Verifică dacă valoarea este în lista dată                                                                                                                                                                                   |
| `not_in`               | `not_in:foo,bar,…` Verifică dacă valoarea nu este în enumerarea dată                                                                                                                                                                       |
| `starts_cu`            | `starts_cu:foo` Verifică dacă valoarea șirului de intrare este pornită cu sub-șirul dat                                                                                                                                                    |
| `ends_cu`              | `ends_cu:foo` Verifică dacă valoarea șirului de intrare se termină cu sub-șirul dat                                                                                                                                                        |
| `între`                | `între:min,max` Verifică dacă valoarea este un număr şi este în intervalul dat                                                                                                                                                             |
| `max`                  | `max:value` Valoarea de verificare este mai mică sau egală cu valoarea dată(`intX` `uintX` `floatX`)                                                                                                                    |
| `min`                  | `min:value` Valoarea de verificare este mai mare sau egală cu valoarea dată(`intX` `uintX` `floatX`)                                                                                                                    |
| `eq`                   | `eq:value` Verifică dacă valoarea de intrare este egală cu valoarea dată                                                                                                                                                                   |
| `ne`                   | `ne:value` Verifică dacă valoarea de intrare nu este egală cu valoarea dată                                                                                                                                                                |
| `lt`                   | `lt:value` Valoarea de verificare este mai mică decât valoarea dată(`intX` `uintX` `floatX`)                                                                                                                            |
| `gt`                   | `gt:value` Valoarea de verificare este mai mare decât valoarea dată (`intX` `uintX` `floatX`)                                                                                                                           |
| `len`                  | `len:value` Verifică lungimea valorii este egală cu mărimea dată (`string` `slice` `map`)                                                                                                                               |
| `min_len`              | `min_len:value` Verifică lungimea minimă a valorii este dimensiunea dată (`string` `array` `slice` `map`)                                                                                                               |
| `max_len`              | `max_len:value` Verifică lungimea maximă a valorii este dimensiunea dată (`string` `array` `slice` `map`)                                                                                                               |
| `email`                | Valoarea de verificare este şirul adresei de e-mail                                                                                                                                                                                        |
| `array`                | Valoarea de verificare este array, tip de felie                                                                                                                                                                                            |
| `map`                  | Valoarea de verificare este un tip MAP                                                                                                                                                                                                     |
| `eq_field`             | `eq_field:field` Verifică dacă valoarea câmpului este egală cu valoarea altui câmp                                                                                                                                                         |
| `ne_field`             | `ne_field:field` Verifică dacă valoarea câmpului nu este egală cu valoarea altui câmp                                                                                                                                                      |
| `gt_field`             | `gt_field:field` Verifică dacă valoarea câmpului este mai mare decât valoarea altui câmp                                                                                                                                                   |
| `gte_field`            | `gte_field:field` Verifică dacă valoarea câmpului este mai mare sau egală cu valoarea unui alt câmp                                                                                                                                        |
| `lt_field`             | `lt_field:field` Verifică dacă valoarea câmpului este mai mică decât valoarea altui câmp                                                                                                                                                   |
| `lte_field`            | `lte_field:field` Verifică dacă valoarea câmpului este mai mică sau egală cu valoarea unui alt câmp                                                                                                                                        |
| `file`                 | Verifică dacă este un fișier încărcat                                                                                                                                                                                                      |
| `image`                | Verificați dacă este un fișier încărcat cu imagine și verificați sufixul de suport                                                                                                                                                         |
| `dată`                 | Verifică valoarea câmpului este șir dată                                                                                                                                                                                                   |
| `gt_date`              | `gt_date:value` Verifică dacă valoarea de intrare este mai mare decât șirul de dată dat                                                                                                                                                    |
| `lt_date`              | `lt_date:value` Verifică dacă valoarea de intrare este mai mică decât șirul de dată dat                                                                                                                                                    |
| `gte_date`             | `gte_date:value` Verifică dacă valoarea de intrare este mai mare sau egală cu șirul de dată dat                                                                                                                                            |
| `lte_date`             | `lte_date:value` Verifică dacă valoarea de intrare este mai mică sau egală cu șirul de dată dat                                                                                                                                            |
| `Alpha`                | Verificați dacă valoarea conține doar caractere alfabetice                                                                                                                                                                                 |
| `alpha_num`            | Verifică dacă sunt doar litere, numerele sunt incluse                                                                                                                                                                                      |
| `alpha_dash`           | Bifați pentru a include doar litere, numere, cratime ( - ) și sublinieri ( _ )                                                                                                  |
| `json`                 | Valoarea de verificare este șir JSON                                                                                                                                                                                                       |
| `număr`                | Valoarea de verificare este şirul de numere `>= 0`                                                                                                                                                                                         |
| `full_url`             | Valoarea de verificare este URL-ul complet (trebuie să înceapă cu http,https)                                                                                                                                           |
| `ip`                   | Valoarea de verificare este șirul IP(v4 sau v6)                                                                                                                                                                         |
| `ipv4`                 | Valoarea de verificare este un șir IPv4                                                                                                                                                                                                    |
| `ipv6`                 | Valoarea de verificare este șir IPv6                                                                                                                                                                                                       |
| `regex`                | Verifică dacă valoarea poate trece de verificarea regulată                                                                                                                                                                                 |

### Reguli de utilizare puncte

#### Indică

Când folosiți `ctx.Request().Validate(reguli)` pentru validare, datele de tip `int` vor fi analizate de
`json. nmarshal" de tip `float64\`, care va cauza validarea regulii de int să eșueze.

**Soluții**

Opţiunea 1: Adăugaţi [`validation.PrepareForidation`](#format-data-before-validation), formataţi datele înainte de a valida datele
;

Opțiunea 2: Utilizați `facades.Validation().Make()` pentru validarea regulilor;

## Reguli de validare personalizate

Goravel oferă o varietate de reguli utile de validare; cu toate acestea, este posibil să doriţi să specificaţi unele dintre regulile dumneavoastră de validare. O metodă de înregistrare
a regulilor personalizate de validare este utilizarea obiectelor regulate. Pentru a genera un obiect nou de regulă, puteți folosi pur și simplu comanda
`make:rule` Artizan.

De exemplu, dacă doriţi să verificaţi dacă un şir de caractere este superior, puteţi crea o regulă cu această comandă. Goravel will
then save this new rule in the `app/rules` directory. If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
mergi să rulezi . artizan:rule Uppercase
mergi să rulezi . artizan make:rule user/Uppercase
```

După crearea regulii, trebuie să îi definim comportamentul. Un obiect de regulă are două metode: `Passes` şi `Message`. Metoda
Passes primește toate datele, inclusiv datele ce urmează a fi validate și parametrii de validare. Ar trebui să returneze
`true` sau `false` în funcție de valabilitatea valorii atributului. Metoda `Message` ar trebui să returneze mesajul de eroare
pentru validare care ar trebui să fie utilizat atunci când validarea eșuează.

```go
regulile de import

(
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Semnează numele regulii. Șirul de caractere
func (receptor *Uppercase) {
  returnează "uppercase"
}

// Passes Determină dacă regula de validare trece.
func (destinatar *Uppercase) Passes(validare date.Data, val, opțiuni ...any) bool {
  return strings.ToUpper(val.(string)) == val. string)
}

// Mesajul primește mesajul de eroare de validare. Şirul de mesaje de tip
func (receptor *Uppercase) {
  returnează ":attribute trebuie să fie cu majuscule".
}

```

Apoi trebuie să înregistrați regula la metoda `reguli` în fișierul `app/providers/validation_service_provider.go`, și
regula poate fi folosită ca și alte reguli:

```go
furnizorii de pachete

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receptor *ValidationServiceProvider) Register() {

}

func (receptor *ValidationServiceProvider) Boot() {
  dacă err := facades. alidare().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider)() []validare. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Filtre de validare disponibile

| Nume                           | Descriere                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `int/toInt`                    | Convertește valoare(string/intX/floatX) în `int` type `v.FilterRule("id", "int")`                                                                           |
| `uint/toUint`                  | Converti value(string/intX/floatX) in `uint` type `v.FilterRule("id", "uint")`                                                                              |
| `int64/toInt64`                | Convertește valoare(string/intX/floatX) în `int64` tip `v.FilterRule("id", "int64")`                                                                        |
| `float/toFloat`                | Convertește valoarea (string/intX/floatX) în tipul `float`                                                                                                  |
| `bool/toBool`                  | Convertește valoarea șirului în bool. (`true`: "1", "on", "da", "true", `false`: "0", "off", "nu", "false") |
| `trim/trimSpace`               | Curățați spațiul alb pe ambele laturi ale șirului                                                                                                                              |
| `ltrim/trimLeft`               | Curăță caracterele din spațiul alb de pe laturile din stânga ale șirului                                                                                                       |
| `rtrim/trimRight`              | Curăță caracterele din spațiul alb pe laturile drepte ale șirului                                                                                                              |
| `int/integer`                  | Convertește valoare(string/intX/floatX) în `int` type `v.FilterRule("id", "int")`                                                                           |
| `lowercase`                    | Convertește șirul la litere mici                                                                                                                                               |
| `upper/uppercase`              | Convertește șirul în majuscule                                                                                                                                                 |
| `lcFirst/lowerFirst`           | Convertește primul caracter al unui șir în litere mici                                                                                                                         |
| `ucFirst/upperFirst`           | Convertește primul caracter al unui șir în majuscule                                                                                                                           |
| `ucWord/upperWord`             | Convertește primul caracter al fiecărui cuvânt în majusculă                                                                                                                    |
| `cămilel/camelCase`            | Convertește șirul în stilul de denumire a cămilei                                                                                                                              |
| `snake/snakeCase`              | Convertește șirul la stilul de denumire a șarpilor                                                                                                                             |
| `escapeJs/escapeJS`            | Șirul Escape JS.                                                                                                                                               |
| `escapeHtml/escapeHTML`        | Scade codul HTML.                                                                                                                                              |
| `str2ints/strToInts`           | Convertește șirul la int felia `[]int`                                                                                                                                         |
| `str2time/strToTime`           | Convertește șirul datei la `time.Time`.                                                                                                                        |
| `str2arr/str2array/strToArray` | Convertește șirul în șir de caractere `[]string`                                                                                                                               |

## Filtru personalizat

Goravel oferă o varietate de filtre utile, cu toate acestea, poate doriţi să specificaţi unele dintre filtrele proprii. Pentru a genera un obiect nou regula
puteţi pur şi simplu să utilizaţi comanda `make:filter` Artizan. Hai să folosim această comandă pentru a genera o regulă care convertește un șir
într-un număr întreg. Această regulă este deja încorporată în cadru, noi doar o creăm ca exemplu. Goravel va salva
acest nou filtru în directorul `app/filtre`. Dacă acest director nu există, Goravel îl va crea atunci când executați comanda
Artizan pentru a crea regula:

```go
mergi . artizan make:filtru ToInt
// sau
execută . artizan make:filtru user/ToInt
```

Un filtru conţine două metode: `Signature` şi `Handle`. Metoda `Signature` stabileşte numele filtrului. Metoda
`Handle` efectuează logica specifică de filtrare:

```go
filtrele de pachet

import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Semnătură semnătura filtrului. Șirul de caractere
(receptor *ToInt) {
  return "ToInt"
}

// Handle definește funcția de filtrare care trebuie aplicată.
func (receptor *ToInt) Handle() {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Apoi trebuie să înregistrați filtrul la metoda `filtre` în fișierul `app/providers/validation_service_provider.go`,
și filtrul poate fi folosit ca alții:

```go
furnizorii de pachete

import (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receptor *ValidationServiceProvider) Registrul () {

}

func (receptor *ValidationServiceProvider) Boot() {
  dacă err := facades. alidare().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("add filters error: %+v", err)
  }
}

func (receptor *ValidationServiceProvider) filtre() []validare. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
