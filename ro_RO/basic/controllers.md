# Controlori

În loc să definească toate logicile de procesare a cererii sub forma unei închideri pe o rută separată, un controler poate fi folosit
pentru integrare. Controlerele sunt stocate în folderul `app/http/controllers`.

## Definire controlori

Următorul exemplu este cel al unui operator de bază:

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

Definiţia traseului:

```go
rutele de import

(
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userler := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Crează controler

```shell
mergi să rulezi . artizan:controller UserController
mergi să rulezi . artizan:controller user/UserController
```

## Controlori de resurse

Dacă vă gândiți la fiecare model Eloquent din aplicația dvs. ca la o "resursă", este tipic să efectuezi aceleași seturi de acțiuni
împotriva fiecărei resurse din aplicația ta. De exemplu, imaginați-vă că aplicația dumneavoastră conține un model `Photo` și un model
`Movie`. Este posibil ca utilizatorii să creeze, citească, actualizeze sau să șteargă aceste resurse.

Din cauza acestui caz de utilizare obișnuită, dirijarea resurselor Goravel atribuie creația tipică, citire, actualizați și ștergeți ("CRUD")
rutele către un controler cu o singură linie de cod. Pentru a începe, putem folosi opțiunea `make:controller` a comenzii Artizane
`--resource` pentru a crea rapid un controller pentru a gestiona aceste acțiuni:

```shell
mergi să rulezi . artizan:controller --resource PhotoController
```

Această comandă va genera un controller la `app/http/controllers/photo_controller.go`. Controlorul va conține o metodă
pentru fiecare dintre operațiunile de resurse disponibile. Apoi, puteți înregistra o rută de resurse care indică către controlerul
:

```go
facades.Route().Resource("fotografii", controllers.NewPhotoController())
```

| Verb         | URI                   | Acțiune     |
| ------------ | --------------------- | ----------- |
| OBȚINE       | `/fotografii`         | Indice      |
| POS          | `/fotografii`         | Magazin     |
| OBȚINE       | `/fotografii/{photo}` | Afișare     |
| PLICUR/PLATĂ | `/fotografii/{photo}` | Actualizare |
| Şterge       | `/fotografii/{photo}` | Distruge    |
