# Tillstånd

Goravel erbjuder inbyggda [authentication](./authentication) tjänster och en lättanvänd auktoriseringsfunktion för att
hantera användaråtgärder på resurser. Även om en användare är autentiserad, de kanske inte har behörighet att ändra eller ta bort
vissa Eloquent modeller eller databasposter. Gorfels auktoriseringsfunktion möjliggör ett systematiskt sätt att hantera
dessa auktoriseringskontroller.

Det finns två sätt att godkänna åtgärder i Goravel: [gates](#gates) och [policies](#policies). Föreställ dig portar och
politik som liknar rutter och kontrollanter. Gates är baserade på nedläggningar och ger en enkel strategi för
tillstånd, medan policyer grupp logik runt en specifik resurs, liknande styrenheter. Denna dokumentation kommer
först täcka grindar och sedan gräva i policyer.

Det är inte nödvändigt att enbart använda portar eller policyer när du bygger en applikation. De flesta applikationer kommer att använda en
kombination av båda, vilket är helt acceptabelt!

## Grindar

### Skriva portar

Gates fungerar som stängningar som kontrollerar om en användare har behörighet att utföra en specifik åtgärd. De är vanliga att ställa in
i `app/providers/auth_service_provider.go` filens `Boot`-metod med hjälp av Gate fasaden.

I detta scenario, vi kommer att upprätta en grind för att kontrollera om en användare kan ändra en viss Post modell genom att jämföra dess ID med
user_id för inläggets skapare.

```go
paketleverantörer

import (
  "context"

  contractsaccess "github.com/goravel/frameing/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/frameing/facades"
)

type AuthServiceProvider struct {
}

func (receiver *AuthServiceProvider) Register(app foundation. pplication) {

}

func (receiver *AuthServiceProvider) Boot(app foundation.Application) {
  fasader. ate().Definiera ("update-post",
    func(ctx context.Context, argument karta[string]any) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := argument["post"].(models. Ost)

      om user.ID == post.UserID {
        returnera åtkomst. ewAllowResponse()
      } else {
        returnera tillgång. ewDenyResponse("fel")
      }
    },
  )
}
```

### Auktoriserar åtgärder

För att godkänna en åtgärd med portar bör du använda metoderna `Allows` eller `Denies` som tillhandahålls av Portfasaden:

```go
paketregulatorer

import (
  "github.com/goravel/frameing/facades"
)

typ UserController struct {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", karta[string]any{
    "post": post,
  }) {
    
  }
}
```

Du kan godkänna flera åtgärder samtidigt med hjälp av `Any` eller `Inone`-metoderna.

```go
om fasader.Gate(). ny([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Användaren kan uppdatera eller ta bort inlägget. .
}

om fasader. ate().Ingen([]string{"update-post", "delete-post"}, map[string]any{
  "post": post,
}) {
  // Användaren kan inte uppdatera eller ta bort inlägget. .
}
```

### Gate Responses

`Allows`-metoden returnerar ett booleskt värde. För att få det fullständiga auktoriseringssvaret, använd `Inspect`-metoden.

```go
svar := fasades.Gate().Inspektion ("edit-settings", nil);

if response.Allowed() {
    // Åtgärden är auktoriserad...
} else {
    fmt.Println(response.Message())
}
```

### Avlyssnande Gate Checks

Ibland kan du vilja ge alla förmågor till en specifik användare. Du kan definiera en stängning med hjälp av `Before`-metoden,
som körs innan några andra behörighetskontroller:

```go
fasades.Gate().För(func(ctx context.Context, ability string, argument map[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Om `Before`-stängningen returnerar ett icke-nil resultat kommer det resultatet att anses vara resultatet av auktoriseringskontrollen.

\`Efter"-metoden kan användas för att definiera en stängning som kommer att köras efter alla andra behörighetskontroller.

```go
fasades.Gate().After(func(ctx context.Context, ability string, argument map[string]någon, result contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("användare").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Observera: Returresultatet av `After` kommer endast att tillämpas när `facades.Gate().Definier` returnerar nil.

### Injektionskontext

`context` kommer att överföras till metoderna `Before`, `After` och `Define`.

```go
facades.Gate().WithContext(ctx).Tillåten ("update-post", karta[string]any{
  "post": post,
})
```

## Policyer

### Genererar policyer

Du kan använda kommandot `make:policy` Artisan för att generera en policy. Den genererade policyn sparas i
`app/policy`-katalogen. Om katalogen inte finns i din applikation, kommer Goravel att skapa den åt dig.

```go
go run . hantverkare make:policy PostPolicy
go run . hantverkare make:policy användare/PostPolicy
```

### Skriva policyer

Vi definierar en `Update`-metod på `PostPolicy` för att kontrollera om en `User` kan uppdatera ett `Post`.

```go
paketpolicyer

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/frameing/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context. ontext, argument karta[string]any) contractsaccess.Svar {
  användare := ctx.Value("användare").(models.User)
  inlägg := argument["post"].(models.Post)

  om användare. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("You do not own this post.")
  }
}
```

Sedan kan vi registrera policyn till `app/providers/auth_service_provider.go`:

```go
facades.Gate().Definier("update-post", policys.NewPostPolicy().Update)
```

När du arbetar med att godkänna olika åtgärder, kan du lägga till fler metoder till din policy. Till exempel kan du skapa
`View` eller `Delete`-metoder för att godkänna olika modellrelaterade åtgärder. Känn dig fri att namnge dina policy-metoder som du ser
passa.
