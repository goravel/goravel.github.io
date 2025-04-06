# Autorisatie

Goravel biedt ingebouwde [authentication](./authentication) diensten en een eenvoudig te gebruiken autorisatiefunctie voor
beheer gebruikersacties op bronnen. Even if a user is authenticated, they may not have the authority to modify or delete
certain Eloquent models or database records. De autorisatie functie van Goravel maakt een systematische manier mogelijk om
deze autorisatie controles te beheren.

Er zijn twee manieren om acties te autoriseren in Goravel: [gates](#gates) en [policies](#policies). Stel je de poorten en het
beleid voor die vergelijkbaar zijn met routes en controleurs. Poorten zijn gebaseerd op sluitingen en bieden een eenvoudige aanpak voor
autorisatie, terwijl beleidsgroep logica rond een specifieke hulpbron, vergelijkbaar met controllers. Deze documentatie zal
eerste cover poorten bevatten en vervolgens delven in beleid.

Het is niet nodig om poorten of beleid te gebruiken bij het bouwen van een applicatie. De meeste applicaties gebruiken een
combinatie van beide, wat perfect acceptabel is!

## Poorten

### Schrijfpoort

Poorten dienen als sluitingen die controleren of een gebruiker gemachtigd is om een specifieke actie uit te voeren. Ze zijn vaak ingesteld
in de `app/providers/auth_service_provider.go` methode van het bestand met de `Boot` facade.

In dit scenario, we zullen een poort instellen om te controleren of een gebruiker een bepaald Post model kan wijzigen door zijn ID te vergelijken met
de user_id van de maker van het bericht.

```go
package providers

import (
  "context"

  contractsaccess "github.com/goravel/framework/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider bouwt {
}

func (ontvanger *AuthServiceProvider) Register(app foundation. pplicatie{

}

func (ontvanger *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Define("update-post",
    functie(ctx context.Context, argumenten kaart[string]elke) contracten. esponse {
      gebruiker := ctx.Value("user").(models.User)
      post := argumenten["post"].(modellen. ost)

      als user.ID == post.UserID {
        retourneer toegang. ewAllowResponse()
      } anders {
        retour. ewDenyResponse("fout")
      }
    },
  )
}
```

### Autoriseer acties

Om een actie te autoriseren met behulp van gates, moet je de `Allows` of `Denies` methodes gebruiken die door de Poort facade:

```go
pakket controllers

import (
  "github.com/goravel/framework/facades"
)

type UserController {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", map[string]any{
    "post": post,
  }) {
    
  }
}
```

Je kunt meerdere acties tegelijk met de methodes 'Any' of 'None' autoriseren.

```go
if facades.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // De gebruiker kan het bericht bijwerken of verwijderen. .
}

als het aantoonbaar is. ate().None([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // De gebruiker kan het bericht niet bijwerken of verwijderen. .
}
```

### Poort antwoorden

De 'Toestaan' methode geeft een Booleaanse waarde terug. Om het volledige autorisatie antwoord te krijgen, gebruik de `Inspect` methode.

```go
response := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // De actie is geautoriseerd...
} anders {
    fmt.Println(response.Message())
}
```

### Intercepting Poort Controles

Soms kun je alle vaardigheden aan een specifieke gebruiker geven. U kunt een sluiting definiëren met behulp van de 'Before' methode,
die wordt uitgevoerd voordat andere autorisatie controles uitvoeren:

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user"). model.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Als de 'Voor'-sluiting een niet-nil resultaat oplevert, zal dat resultaat worden beschouwd als het resultaat van de autorisatie check.

De `After` methode kan worden gebruikt om een sluiting te definiëren die zal worden uitgevoerd na alle andere autorisatie controles.

```go
facades.Gate().After(func(ctx context.Context, ability string, argumentenmap[string]ene, resultaatcontractsaccess.Response) contractsaccess.Response {
  gebruiker := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Let op: Het geretourneerde resultaat van `After` zal alleen toegepast worden wanneer `facades.Gate().Define` zal terugkeren.

### Context van injectie

De `context` zal worden doorgegeven aan de `Before`, `After`, en `Define` methoden.

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## Beleid

### Beleid genereren

Je kunt het `make:policy` Artisan commando gebruiken om een beleid te genereren. Het gegenereerde beleid zal worden opgeslagen in de
`app/policy` directory. Als de map niet bestaat in uw applicatie, zal Goravel deze voor u aanmaken.

```go
uitvoeren . artisan make:policy PostPolicy
ga uit. artisan make:policy user/PostPolicy
```

### Beslissingen schrijven

Laten we een `Update` methode op `PostPolicy` definiëren om te controleren of een `User` een `Post` kan updaten.

```go
Pakket beleid

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts ts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, argumenten kaart[string]een) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := argumenten["post"].(models.Post)

  als gebruiker. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("Je bezit dit bericht niet.")
  }
}
```

Dan kunnen we het beleid registreren bij `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", beleids.NewPostPolicy().Update)
```

Terwijl je werkt aan het autoriseren van verschillende acties, kun je meer methoden toevoegen aan je beleid. Bijvoorbeeld, u kunt
`View` of `Delete` methoden maken om verschillende modelgerelateerde acties toe te staan. Voel je vrij om je beleidsmethoden te noemen zoals je
wilt.
