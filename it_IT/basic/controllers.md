# Controllori

Invece di definire tutta la logica di trattamento della richiesta sotto forma di chiusura in un percorso separato, un controllore può essere utilizzato
per l'integrazione. I controller sono memorizzati nella directory `app/http/controllers`.

## Definisci Controllori

Il seguente è un esempio di controllore di base:

```go
package controller

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
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

Il percorso definisce:

```go
package route Importazione

(
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Crea Controllore

```shell
go run . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Controllori Di Risorse

Se pensi a ogni modello Eloquent nella tua applicazione come una "risorsa", è tipico eseguire gli stessi set di azioni
contro ogni risorsa nella tua applicazione. Ad esempio, immagina che la tua applicazione contenga un modello `Photo` e un modello `Movie`
. È probabile che gli utenti possano creare, leggere, aggiornare o eliminare queste risorse.

A causa di questo caso di utilizzo comune, Goravel risorsa routing assegna il tipico creare, leggere, aggiornare ed eliminare ("CRUD")
percorre un controller con una singola riga di codice. Per iniziare, possiamo utilizzare l'opzione `make:controller` Artisan Comando
`--resource` per creare rapidamente un controller per gestire queste azioni:

```shell
go run . artisan make:controller --resource PhotoController
```

Questo comando genererà un controller su `app/http/controllers/photo_controller.go`. Il controllore conterrà un metodo
per ciascuna delle operazioni di risorse disponibili. Successivamente, è possibile registrare un percorso di risorse che punta al controller
:

```go
facades.Route().Resource("photos", controllers.NewPhotoController())
```

| Verbo     | URI               | Azione    |
| --------- | ----------------- | --------- |
| OTTA      | `/photos`         | Indice    |
| POST      | `/photos`         | Negozio   |
| OTTA      | `/photos/{photo}` | Mostra    |
| PUT/PATCH | `/photos/{photo}` | Aggiorna  |
| ELIMINA   | `/photos/{photo}` | Distruggi |
