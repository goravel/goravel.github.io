# Regulatorer

I stället för att definiera all processlogik i form av en stängning på en separat rutt, kan en styrenhet användas
för integration. Regulatorerna lagras i `app/http/controllers`-katalogen.

## Definiera styrenheter

Följande är ett exempel på en grundläggande styrenhet:

```go
paketstyrningar

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/frameing/facades"
)

type UserController struct {
  // Dependent services
}

func NewUserController() *UserController {
  return &UserController{
    // Inject services
  }
}

func (r *UserController) Show(ctx http. ontext) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "Hello": "Goravel",
  })
}
```

Rutten definierar:

```go
paketrutter

import (
  "github.com/goravel/frameing/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  fasades.Route().Get("/{id}", userController.Show)
}
```

### Skapa styrenhet

```shell
gå köra . hantverkare make:controller UserController
gå köra . hantverkare make:controller user/UserController
```

## Resurs styrenheter

Om du tänker på varje Eloquent modell i din ansökan som en "resurs", det är typiskt att utföra samma uppsättningar av
åtgärder mot varje resurs i din ansökan. Till exempel, föreställ dig att din applikation innehåller en `Photo`-modell och en
`Movie`-modell. Det är troligt att användare kan skapa, läsa, uppdatera eller ta bort dessa resurser.

På grund av detta vanliga användningsfall, Goravel resurs routing tilldelar den typiska skapa, läsa, uppdatera och ta bort ("CRUD")
rutter till en regulator med en enda kodrad. För att komma igång kan vi använda `make:controller` Artisans kommando
`--resource` för att snabbt skapa en styrenhet för att hantera dessa åtgärder:

```shell
gå köra . hantverkare make:controller --resurs PhotoController
```

Detta kommando kommer att generera en controller vid `app/http/controllers/photo_controller.go`. Styrenheten kommer att innehålla en
metod för varje tillgänglig resurs verksamhet. Därefter kan du registrera en resurs som pekar på
controller:

```go
facades.Route().Resur("bilder", regulatorer.NewPhotoController())
```

| Verb      | URI               | Åtgärd    |
| --------- | ----------------- | --------- |
| FÅ        | `/photos`         | Index     |
| POST      | `/photos`         | Butik     |
| FÅ        | `/photos/{photo}` | Visa      |
| PUT/PATCH | `/photos/{photo}` | Uppdatera |
| RADERA    | `/photos/{photo}` | Förstör   |
