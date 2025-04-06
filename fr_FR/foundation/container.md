# Conteneur de service

Le conteneur de service Goravel est un outil puissant pour gérer les dépendances de classes et effectuer l'injection de dépendances. Il
contient tous les modules de Goravel, et vous permet de lier vos propres services à des conteneurs et de les résoudre si nécessaire.
Le conteneur de service fournit un support puissant pour les paquets tiers autour de Goravel.

## Liaison

### Liens simples

Presque toutes vos liaisons de conteneurs de service seront enregistrées auprès de [fournisseurs de services] (./providers).
Au sein d'un prestataire de services, vous avez toujours accès au conteneur via le paramètre `app`, puis enregistrer une liaison
en utilisant la méthode `Bind`, en passant la `key` que nous souhaitons enregistrer avec une fermeture qui renvoie une instance de la classe
:

```go
import de la route du paquet

(
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(fondation d'applications. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Comme mentionné, vous interagissez généralement avec le conteneur au sein des fournisseurs de services ; cependant, si vous souhaitez que
interagisse avec le conteneur en dehors d'un fournisseur de services, vous pouvez le faire via la façade `App` :

```go
facades.App().Bind("key", func(app foundation.Application) (any, error) {
    ...
})
```

### Lier un Singleton

La méthode `Singleton` lie une classe ou une interface dans le conteneur qui ne devrait être résolu qu'une seule fois. Une fois qu'un singleton relié à un singleton
résolu, l'instance de même objet sera retournée lors des appels suivants dans le conteneur :

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Instances de liaison

Vous pouvez également lier une instance d'objet existante dans le conteneur en utilisant la méthode `Instance`. L'instance donnée
sera toujours retournée lors des appels suivants dans le conteneur :

```go
app.Instance(clé, instance)
```

### Lier avec le paramètre

Si vous avez besoin de quelques paramètres supplémentaires pour construire le fournisseur de services, vous pouvez utiliser la méthode `BindWith` pour passer les paramètres
à la fermeture:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Résolution en cours

### La méthode `Make`

Vous pouvez utiliser la méthode `Make` pour résoudre une instance de classe à partir du conteneur. The `Make` method accepts the `key` you
wish to resolve:

```go
instance, err := app.Make(key)
```

Si vous êtes en dehors d'un fournisseur de services à un emplacement de votre code qui n'a pas accès à la variable `app`, vous
pouvez utiliser la façade `App` pour résoudre une instance de classe du conteneur :

```go
instance, err := facades.App().Make(key)
```

### La méthode `MakeWith`

Si certaines des dépendances de votre classe ne sont pas solubles via le conteneur, vous pouvez les injecter en les passant sous la forme d'un tableau associatif
dans la méthode `MakeWith`, correspondant à la méthode de liaison `BindWith`:

```go
instance, err := app.MakeWith(key, map[string]any{"id": 1})
```

### Autres méthodes

Le framework fournit quelques méthodes pratiques pour résoudre rapidement différentes facades: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
