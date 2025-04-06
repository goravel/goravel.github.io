# Autorizare

Goravel oferă servicii integrate [authentication](./authentication) și o opțiune de autorizare ușor de utilizat pentru
a gestiona acțiunile utilizatorilor pe resurse. Chiar dacă un utilizator este autentificat, este posibil să nu aibă autoritatea de a modifica sau șterge
anumite modele Eloquent sau date înregistrate. Funcția de autorizare a Goravel permite o metodă sistematică de gestionare
a acestor verificări de autorizare.

Există două modalități de a autoriza acțiuni în Goravel: [gates](#gates) și [policies](#policies). Imaginați-vă politicile de porți și
ca fiind similare cu rutele și controlorii. Porțile se bazează pe închideri și oferă o abordare simplă pentru autorizarea
, în timp ce politicile grupează logica unei resurse specifice, similară cu cea a controlorilor. This documentation will
first cover gates and then delve into policies.

Nu este necesar să folosești exclusiv porți sau politici atunci când construiești o aplicație. Majoritatea aplicaţiilor vor folosi o combinaţie
pentru ambele, ceea ce este perfect acceptabil!

## Porți

### Scrierea porților

Gates servește ca închidere pentru a verifica dacă un utilizator este autorizat să efectueze o anumită acțiune. Acestea sunt setate de comun acord
în metoda `app/providers/auth_service_provider.go` folosind fațada de poartă a fișierului.

În acest scenariu, vom stabili o poartă pentru a verifica dacă un utilizator poate modifica un anumit model Post prin compararea ID-ului său cu
user_id al creatorului de postare.

```go
furnizorii de pachete

import (
  "context"

  contracte "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (destinatar *AuthServiceProvider) Register(fundația aplicației. pplication) {

}

func (receptor *AuthServiceProvider) Boot(app foundation.Application) {
  fațades. ate().Define("update-post",
    func(context.Context, argument map[string]any) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(modele. ost)

      dacă user.ID == post.UserID {
        returnează acces. ewAllowResponse()
      } altfel {
        acces la returnare. ewDenyResponse("error")
      }
    },
  )
}
```

### Autorizarea acțiunilor

Pentru a autoriza o acţiune folosind porţi, ar trebui să utilizaţi metodele `Allows` sau `Denies` furnizate de faţada poartă :

```go
controlerele

import (
  "github.com/goravel/framework/facades"
)

type UserController struct {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

Puteţi autoriza mai multe acţiuni simultan folosind metodele `Any` sau `None`.

```go
if facades.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Utilizatorul poate actualiza sau șterge postul. .
}

dacă fațadele. ate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Utilizatorul nu poate actualiza sau șterge postarea. .
}
```

### Răspunsuri de poartă

Metoda `Allows` returnează o valoare booleană. Pentru a obține răspunsul pentru autorizarea completă, folosiți metoda `Inspectare`.

```go
răspuns := facades.Gate().Inspect("edit-settings", nil);

dacă response.Allowed() {
    // Acţiunea este autorizată...
} altceva {
    fmt.Println(response.Message())
}
```

### Interceptare Gate Checks

Uneori, poate doriți să acordați toate abilitățile unui anumit utilizator. Poți defini o închidere folosind metoda `Before`,
care se execută înaintea oricărui alt control al autorizației:

```go
fațades.Gate().Before(func(ctx context.Context, șir de abilități, argument harta[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

În cazul în care închiderea `Before` returnează un rezultat non-zero, acest rezultat va fi considerat rezultatul verificării autorizaţiei.

Metoda `After` poate fi folosită pentru a defini o închidere care va fi executată după toate celelalte verificări de autorizare.

```go
fațades.Gate().After(func(ctx context.Context, șir de abilități, argument harta[string], rezultat contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Notă: Rezultatul returnării din `After` va fi aplicat numai când `facades.Gate().Define` returnează nil.

### Injectare context

"context" va fi pasat la metodele `Before`, `After`, şi `Define`.

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## Politici

### Politici de generare

Poți folosi comanda `make:policy` Artizan pentru a genera o politică. Politica generată va fi salvată în directorul
`app/policies`. Dacă directorul nu există în aplicația ta, Goravel o va crea pentru dvs.

```go
rulați . artizan:policy PostPolicy
rulați . artizan:policy user/PostPolicy
```

### Politici de scriere

Să definim o metodă `Actualizează` pe `PostPolicy` pentru a verifica dacă un `utilizator` poate actualiza un `Post`.

```go
politicile

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contracte "github". om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, argument hartă[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user. D == post.UserID {
    return access.NewAllowResponse()
  } altfel {
    returnează acces. ewDenyResponse("Nu deții acest post.")
  }
}
```

Apoi putem înregistra politica la `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

Pe măsură ce lucrezi la autorizarea unor acţiuni diferite, poţi adăuga mai multe metode la politica ta. For instance, you can create
`View` or `Delete` methods to authorize various model-related actions. Simte-te liber să denumești metodele tale de politică după cum vezi
potrivit.
