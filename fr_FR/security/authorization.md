# Autorisation

Goravel offers built-in [authentication](./authentication) services and an easy-to-use authorization feature to
manage user actions on resources. Même si un utilisateur est authentifié, il peut ne pas avoir l'autorité de modifier ou de supprimer
certains modèles Eloquent ou enregistrements de base de données. Goravel's authorization feature allows for a systematic way of managing
these authorization checks.

Il y a deux façons d'autoriser des actions dans Goravel : [gates](#gates) et [policies](#policies). Imaginez des portes et des politiques
similaires aux routes et contrôleurs. Les portes sont basées sur des fermetures et fournissent une approche simple à l’autorisation
, alors que les politiques regroupent la logique autour d’une ressource spécifique, similaire aux contrôleurs. Cette documentation va
d'abord couvrir les portes et ensuite entrer dans les politiques.

Il n'est pas nécessaire d'utiliser exclusivement des portes ou des politiques lors de la construction d'une application. La plupart des applications utiliseront une combinaison
des deux, ce qui est parfaitement acceptable !

## Portes

### Portes d'écriture

Les portes servent de fermetures qui vérifient si un utilisateur est autorisé à effectuer une action spécifique. Ils sont généralement configurés
dans la méthode `app/providers/auth_service_provider.go` du fichier `Boot` en utilisant la façade de Gate.

Dans ce scénario, nous établirons une porte pour vérifier si un utilisateur peut modifier un modèle Post en comparant son ID à
l'user_id du créateur du post.

```go
Prestataires de package

import (
  "context"

  contractsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (receiver *AuthServiceProvider) Register(app foundation. pplication) {

}

func (receiver *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Define("update-post",
    func(ctx context.Context, arguments map[string]any) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(modèles. ost)

      if user.ID == post.UserID {
        return access. ewAllowResponse()
      } autre {
        retourne l'accès. ewDenyResponse("erreur")
      }
    },
  )
}
```

### Autorisation des actions

Pour autoriser une action en utilisant des portes, vous devez utiliser les méthodes `Allows` ou `Denies` fournies par la façade de la porte:

```go
contrôleurs de paquets

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

Vous pouvez autoriser plusieurs actions simultanément en utilisant les méthodes `Any` ou `None`.

```go
if facades.Gate(). ny([]string{"update-post", "delete-post"}, mapper[string]any{
  "post": post,
}) {
  // L'utilisateur peut mettre à jour ou supprimer le post.
}

si des façades. ate().None([]string{"update-post", "delete-post"}, mapper[string]any{
  "post": post,
}) {
  // L'utilisateur ne peut pas mettre à jour ou supprimer le message.
}
```

### Réponses de la porte

La méthode `Allows` retourne une valeur booléenne. Pour obtenir la réponse d'autorisation complète, utilisez la méthode `Inspect`.

```go
réponse := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // L'action est autorisée...
} else {
    fmt.Println(response.Message())
}
```

### Intercepter les vérifications des portes

Parfois, vous pouvez accorder toutes les capacités à un utilisateur spécifique. Vous pouvez définir une fermeture en utilisant la méthode `Before`,
qui s'exécute avant toute autre vérification d'autorisation :

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Si la fermeture `Avant` renvoie un résultat non-nul, ce résultat sera considéré comme le résultat de la vérification d'autorisation.

La méthode `After` peut être utilisée pour définir une fermeture qui sera exécutée après toutes les autres vérifications d'autorisation.

```go
facades.Gate().After(func(ctx context.Context, ability string, arguments map[string]any, result contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Avis: Le résultat de retour de `After` ne sera appliqué que lorsque `facades.Gate().Define` renvoie nil.

### Contexte d'injection

Le `context` sera passé aux méthodes `Before`, `After`, et `Define`.

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## Politiques

### Générer des politiques

Vous pouvez utiliser la commande Artisan `make:policy` pour générer une politique. La politique générée sera enregistrée dans le répertoire
`app/policies`. Si le répertoire n'existe pas dans votre application, Goravel le créera pour vous.

```go
allez exécuter. artisan make:policy PostPolicy
allez exécuter. artisan make:policy user/PostPolicy
```

### Politiques d'écriture

Définissons une méthode `Update` sur `PostPolicy` pour vérifier si un `User` peut mettre à jour un `Post`.

```go
politiques de paquet

import (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  contractsaccess "github. om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx contexte. ontext, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("Vous ne possédez pas ce post.")
  }
}
```

Ensuite, nous pouvons enregistrer la politique à `app/providers/auth_service_provider.go`:

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

Lorsque vous travaillez à autoriser différentes actions, vous pouvez ajouter plus de méthodes à votre politique. Par exemple, vous pouvez créer des méthodes
`View` ou `Delete` pour autoriser diverses actions liées au modèle. N'hésitez pas à nommer les méthodes de votre politique comme vous le voyez
adapté.
