# Contrôleurs

Au lieu de définir toute logique de traitement des requêtes sous la forme d'une fermeture dans une route séparée, un contrôleur peut être utilisé
pour l'intégration. Les contrôleurs sont stockés dans le dossier `app/http/controllers`.

## Définir les contrôleurs

Voici un exemple de contrôleur de base:

```go
contrôleurs de paquets

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/facades"
)

type UserController struct {
  // Services dépendants
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

Définition de la route :

```go


import (
  "github.com/goravel/framework/facades"

  "goravel/app/http/controllers"
)

func Api() {
  userController := controllers. ewUserController()
  facades.Route().Get("/{id}", userController.Show)
}
```

### Créer un contrôleur

```shell
exécutez . artisan make:controller UserController
go run . artisan make:controller user/UserController
```

## Contrôleurs de ressources

Si vous pensez à chaque modèle Eloquent dans votre application comme une "ressource", il est typique d'exécuter les mêmes ensembles d'actions
contre chaque ressource de votre application. Par exemple, imaginez que votre application contient un modèle `Photo` et un modèle
`Movie`. Il est probable que les utilisateurs puissent créer, lire, mettre à jour ou supprimer ces ressources.

À cause de ce cas d'utilisation courant, le routage de ressources Goravel assigne la création, la lecture, mettre à jour et supprimer ("CRUD")
conduit vers un contrôleur avec une seule ligne de code. Pour commencer, nous pouvons utiliser l'option
`--resource` de la commande `make:controller` Artisan pour créer rapidement un contrôleur pour gérer ces actions:

```shell
exécutez . artisan make:controller --resource PhotoController
```

Cette commande va générer un contrôleur à `app/http/controllers/photo_controller.go`. Le contrôleur contiendra une méthode
pour chacune des opérations de ressources disponibles. Ensuite, vous pouvez enregistrer une route de ressource qui pointe vers le contrôleur
:

```go
facades.Route().Ressource("photos", contrôleurs.NewPhotoController())
```

| Verbe       | URI               | Action      |
| ----------- | ----------------- | ----------- |
| OBTENIR     | `/photos`         | Index       |
| POSTER      | `/photos`         | Magasin     |
| OBTENIR     | `/photos/{photo}` | Afficher    |
| PATEZ/PATCH | `/photos/{photo}` | Mise à jour |
| SUPPRIMER   | `/photos/{photo}` | Détruire    |
