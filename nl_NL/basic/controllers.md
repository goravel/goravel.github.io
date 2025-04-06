# Regelsystemen

In plaats van alle aanvraag-verwerkingslogica te definiëren in de vorm van een sluiting op een aparte route, kan een controller worden gebruikt
voor integratie. De controllers worden opgeslagen in de map `app/http/controllers`.

## Definieer regelaars

Het volgende is een voorbeeld van een basiscontroller:

```go
package controllers

import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
)

type UserController struct {
  // Dependent services
}

func NewUserController() *UserController {
  return &UserController{
    // Inject services
  }
}

func (r *UserController) Show(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "Hello": "Goravel",
  })
}
```

De route gedefinieerd:

```go
package routes

import (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Controller aanmaken

```shell
uitvoeren . artisan make:controller UserController
ga uit. artisan make:controller gebruiker/UserController
```

## Grondstof Controllers

Als je aan elk Eloquent model in je applicatie denkt als een "bron" het is typisch om dezelfde sets
acties uit te voeren tegen elke bron in je applicatie. Stel je bijvoorbeeld voor dat je applicatie een `Photo` model en een
`Movie` model bevat. Waarschijnlijk kunnen gebruikers deze bronnen maken, lezen, bijwerken of verwijderen.

Because of this common use case, Goravel resource routing assigns the typical create, read, update, and delete ("CRUD")
routes to a controller with a single line of code. Om te beginnen, kunnen we de `make:controller` Artisan commando
`--resource` optie gebruiken om snel een controller aan te maken voor deze acties:

```shell
uitvoeren . artisan make:controller --resource PhotoController
```

Deze opdracht zal een controller genereren op `app/http/controllers/photo_controller.go`. De controller zal een
methode bevatten voor elk van de beschikbare resource operaties. Vervolgens kunt u een resource route registreren die naar de
controller verwijst:

```go
facades.Route().Resource("foto's", controllers.NewPhotoController())
```

| Werkwoord   | URI               | actie      |
| ----------- | ----------------- | ---------- |
| KRIJG       | `/foto's`         | Indexeren  |
| POSTE       | `/foto's`         | Winkel     |
| KRIJG       | `/foto's/{photo}` | Weergeven  |
| VOORKOMEN   | `/foto's/{photo}` | Vernieuwen |
| VERWIJDEREN | `/foto's/{photo}` | Vernietig  |
