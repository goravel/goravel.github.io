# Usines

Lors du test de votre application ou de la mise en ligne de votre base de données, il peut être nécessaire d'insérer quelques enregistrements dans votre base de données
au préalable. Au lieu de saisir manuellement des valeurs pour chaque colonne, Goravel vous permet de définir un ensemble d'attributs
par défaut pour chacun de vos modèles en créant des usines de modèles.

Pour voir un exemple de comment écrire une usine, vous pouvez consulter le fichier `user_factory.go` situé dans le répertoire
`database/factories` de votre application.

```go


type UserFactory struct {
}

// Définition Définition de l'état par défaut du modèle.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

Comme vous pouvez le voir, dans leur forme la plus basique, les usines sont des structures qui ont une méthode `Definition`. La méthode retourne le jeu d'attributs par défaut
qui doit être utilisé lors de la création d'un modèle avec l'usine. To generate a range of
random data, you can rely on [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Générer des usines

Pour créer une usine, exécutez la commande `make:factory` Artisan:

```
allez exécuter . artisan make:factory PostFactory
```

Le nouveau `struct` d'usine sera placé dans votre répertoire `database/factories`.

### Conventions de modélisation et de découverte d'usine

Après avoir défini une usine, vous pouvez utiliser la méthode `Factory()` dans le modèle pour lier l'usine au modèle :

```go
modèle de paquet

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/factories"
)

type User struct {
  orm. odel
  Chaîne de nom
  Chaîne d'avatar
  orm. oftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Créer des modèles en utilisant des usines

### Instanciation des modèles

Nous pouvons utiliser la méthode `Make` pour créer des modèles sans les maintenir dans la base de données:

```go
var models.User
err := facades.Orm().Factory().Make(&user)
```

Vous pouvez créer une collection de nombreux modèles en utilisant la méthode `Count`:

```go
var utilisateurs []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Si vous souhaitez remplacer certaines des valeurs par défaut de vos modèles, vous pouvez passer `mapper[string]any` à la méthode `Make`
. Seuls les attributs spécifiés seront remplacés alors que le reste des attributs restent à leurs valeurs par défaut
telles que spécifiées par l'usine:

```go
var models.User
err := facades.Orm().Factory().Make(&user, mapper[string]any{
    "Avatar": "avatar",
})
```

### Modèles persistants

La méthode `Create` crée et sauvegarde les instances de modèle dans la base de données en utilisant la méthode Orm `Save`.

```go
var models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Vous pouvez remplacer les attributs du modèle par défaut de l'usine en passant `map[string]any` des attributs à la méthode `Create`
:

```go
var models.User
err := facades.Orm().Factory().Create(&user, mapper[string]any{
    "Avatar": "avatar",
})
```

### Ignorer l'événement modèle

Il peut y avoir [un événement modèle](../orm/quickstart#events) défini sur le modèle, vous pouvez ignorer ces événements avec la méthode
`CreateQuietly` :

```go
var models.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
