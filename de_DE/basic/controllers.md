# Controller

Anstatt alle Verarbeitungslogik in Form einer Sperrung auf einer separaten Route zu definieren, kann ein Controller für die Integration
verwendet werden. Die Controller werden im `app/http/controllers` Verzeichnis gespeichert.

## Controller definieren

Das folgende Beispiel ist ein Basis-Controller:

```go
Paket Controller

importieren (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
)

Type UserController struct {
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

Die Route definiert:

```go
Paket Routen

importieren (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := Controller. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Controller erstellen

```shell
go run . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Ressourcen-Controller

Wenn Sie an jedes Eloquent Modell in Ihrer Anwendung als "Ressource" denken es ist typisch, die gleichen
-Aktionen gegen jede Ressource in Ihrer Anwendung durchzuführen. Stellen Sie sich zum Beispiel vor, Ihre Anwendung enthält ein `Photo`-Modell und ein
`Movie`-Modell. Es ist wahrscheinlich, dass Benutzer diese Ressourcen erstellen, lesen, aktualisieren oder löschen können.

Aufgrund dieses gemeinsamen Anwendungsfalls weist Goravel Ressourcen-Routing das typische Erstellungsmerkmal zu, lesen Sie, aktualisieren und löschen ("CRUD")
führt zu einem Controller mit einer einzigen Zeile Code. Um loszulegen, können wir den `make:controller` Artisan Befehl
`--resource` verwenden, um schnell einen Controller zu erstellen, um diese Aktionen zu erledigen:

```shell
go run . artisan make:controller --resource PhotoController
```

Dieser Befehl generiert einen Controller unter `app/http/controllers/photo_controller.go`. Der Controller wird eine
-Methode für jede der verfügbaren Ressourcenoperationen enthalten. Als nächstes können Sie eine Ressourcenroute registrieren, die auf den
Controller verweist:

```go
facades.Route().Resource("Fotos", Controllers.NewPhotoController())
```

| Verb      | URI               | Aktion        |
| --------- | ----------------- | ------------- |
| ERHALTEN  | `/Fotos`          | Index         |
| POST      | `/Fotos`          | Shop          |
| ERHALTEN  | `/photos/{photo}` | Zeigen        |
| PUT/PATCH | `/photos/{photo}` | Aktualisieren |
| LÖSCHEN   | `/photos/{photo}` | Zerstören     |
