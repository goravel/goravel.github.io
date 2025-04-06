# Routage

Le module de routage Goravel peut être opéré par `facades.Route()`.

## Pilote HTTP

Goravel utilise [gin](https://github.com/gin-gonic/gin) comme pilote HTTP par défaut. Pour utiliser d'autres pilotes, configurez-les dans
le fichier `config/http.go`. La valeur par défaut officielle supporte [gin](https://github.com/gin-gonic/gin)
et [fiber](https://github.com/gofiber/fiber).

| Chauffeur | Lier                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| Gin       | [https://github.com/goravel/gin](https://github.com/fr/goravel/gin)     |
| Fibre     | [https://github.com/goravel/fiber](https://github.com/fr/goravel/fiber) |

## Fichier de routage par défaut

Pour définir des fichiers de routage, il suffit de naviguer dans le répertoire `/routes`. Par défaut, le framework utilise un exemple de route
situé dans `/routes/web.go`. Pour établir une liaison de routage, la méthode `func Web()` est enregistrée dans le fichier
`app/providers/route_service_provider.go`.

Si vous avez besoin d'une gestion plus précise, vous pouvez ajouter des fichiers de routage au répertoire `/routes` et les enregistrer dans le fichier
`app/providers/route_service_provider.go`.

## Démarrer le serveur HTTP

Démarrez le serveur HTTP dans `main.go` à la racine en appelant `facades.Route().Run()`. Cela va automatiquement
récupérer la configuration `route.host`.

```go
import du paquet principal

(
  "github. om/goravel/framework/facades"

  "goravel/bootstrap"
)

func main() {
  // Ce bootstrap le framework et le prépare à l'emploi.
  bootstrap. oot()

  // Démarre le serveur http par facades.Route().
  go func() {
    if err := facades. oute().Run(); err != nil {
      façades. og().Errorf("Erreur de routage : %v", err)
    }
  }()

  select {}
}
```

## Démarrer le serveur HTTPS

Veuillez compléter la configuration de `http.tls` dans `config/http.go` avant d'utiliser HTTPS, la méthode `facades.Route().RunTLS()`
démarrera le serveur HTTPS selon la configuration appropriée :

```go
// main.go
if err := facades.Route().RunTLS(); err != nil {
  facades.Log().Errorf("Route run error: %v", err)
}
```

Vous pouvez également utiliser la méthode `facades.Route().RunTLSWithCert()` pour personnaliser l'hôte et le certificat.

```go
// main.go
if err := facades.Route().RunTLSWithCert("127.0.0.1:3000", "ca.pem", "ca.key"); err != nil {
  facades.Log().Errorf("Erreur d'exécution de la route : %v", err)

```

## Fermer le serveur HTTP/HTTPS

Vous pouvez gracieusement fermer le serveur HTTP/HTTPS en appelant la méthode `Shutdown`, qui attendra que toutes les requêtes soient traitées
avant de fermer.

```go
// main.go
bootstrap.Boot()

// Créer un canal pour écouter les signaux
quit := make(chan os.Signal)
signal.Notify(quit, syscall. IGINT, syscall.SIGTERM)

// Démarre le serveur http par facades.Route().
go func() {
  if err := facades.Route().Run(); err != nil {
    facades.Log(). rrorf("Erreur d'exécution de la route : %v", err)
  }
}()

// Écoute le signal
go func() {
  <-quit
  if err := facades. oute().Shutdown(); err != nil {
    facades.Log(). rrorf("Erreur d'arrêt de la route : %v", err)
  }

  os.Exit(0)
}()

sélectionnez {}
```

### Méthodes de routage

| Méthodes        | Action                                      |
| --------------- | ------------------------------------------- |
| Groupes         | [Routage du groupe](#group-routing)         |
| Préfixe         | [Préfixe de routage](#routing-prefix)       |
| ServeHTTP       | [Routage de test](#testing-routing)         |
| Obtenir         | [Routage de base](#basic-routing)           |
| Poster          | [Routage de base](#basic-routing)           |
| Mettre en place | [Routage de base](#basic-routing)           |
| Supprimez       | [Routage de base](#basic-routing)           |
| Patch           | [Routage de base](#basic-routing)           |
| Options         | [Routage de base](#basic-routing)           |
| N'importe quel  | [Routage de base](#basic-routing)           |
| Ressource       | [Routage des ressources](#resource-routing) |
| Statique        | [Routage des fichiers](#file-routing)       |
| StaticFile      | [Routage des fichiers](#file-routing)       |
| StaticFS        | [Routage des fichiers](#file-routing)       |
| Middleware      | [Middleware](#middleware)                   |

## Routage de base

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(http.StatusOK, http. son{
    "Bonjour": "Goravel",
  })
})
facades.Route().Post("/", userController.Show)
façades. oute().Put("/", userController.Show)
facades.Route().Delete("/", userController.Show)
facades.Route().Patch("/", userController.Show)
facades.Route().Options("/", userController.Show)
facades.Route().Any("/", userController.Show)
```

## Routage des ressources

```go
import "github.com/goravel/framework/contracts/http"

resourceController := NewResourceController()
facades.Route(). esource("/resource", resourceController)

type ResourceController struct{}
func NewResourceController () *ResourceController {
  return &ResourceController{}
}
// GET /resource
func (c *ResourceController) Index(ctx http. ontext) {}
// GET /resource/{id}
func (c *ResourceController) Show(ctx http.Context) {}
// POST /resource
func (c *ResourceController) Store(ctx http. ontext) {}
// PUT /resource/{id}
func (c *ResourceController) Update(ctx http. ontext) {}
// SUPPRIMER /resource/{id}
func (c *ResourceController) Destroy(ctx http.Context) {}
```

## Routage de groupe

```go
facades.Route().Group(func(router route.Router) {
  router.Get("group/{id}", func(ctx http.Context) http.Response {
    return ctx.Response().Success().String(ctx.Request().Query("id", "1"))
  })
})
```

## Préfixe de routage

```go
facades.Route().Préfixe ("utilisateurs").Get("/", userController.Show)
```

## Routage des fichiers

```go
import "net/http"

facades.Route().Static("static", "./public")
facades.Route().StaticFile("static-file", "./public/logo.png")
facades.Route().StaticFS("static-fs", http.Dir("./public"))
```

## Paramètres de routage

```go
facades.Route().Get("/input/{id}", func(ctx http.Context) http.Response {
  return ctx.Response().Success().Json(http.Json{
    "id": ctx.Request().Input("id"),
  })
})
```

Détail [Request](./requests)

## Middleware

```go
importer "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Cors()).Get("users", userController.Show)
```

Détail [Middleware](./middlewares)

## Routes de secours

En utilisant la méthode `Fallback`, vous pouvez définir une route qui sera exécutée quand aucune autre route ne correspond à la requête
entrante.

```go
facades.Route().Fallback(func(ctx http.Context) http.Response {
  return ctx.Response().String(404, "not found")
})
```

## Limitation des taux

### Définition des limites de taux

Goravel inclut des services puissants et personnalisables de limitation de débit que vous pouvez utiliser pour restreindre la quantité de trafic
pour un itinéraire ou un groupe de routes. To get started, you should define rate limiter configurations that meet your
application's needs. Généralement, cela devrait être fait dans la méthode `configureRateLimiting` de la classe
`app/providers/route_service_provider.go` de votre application.

Les limiteurs de taux sont définis à l'aide de la méthode `facades.RateLimiter()` `For`. La méthode `For` accepte un nom de limiteur de débit
et une fermeture qui renvoie la configuration de limite qui devrait s'appliquer aux routes qui sont assignées au limiteur de débit.
Le nom du limiteur de débit peut être n'importe quelle chaîne que vous souhaitez:

```go
import (
  contractshttp "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/facades"
  "github. om/goravel/framework/http/limit"
)

func (récepteur *RouteServiceProvider) configureRateLimiting() {
  facades. ateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
    return limit.PerMinute(1000)
  })
}
```

Si la requête entrante dépasse la limite de débit spécifiée, une réponse avec un code de statut HTTP 429 sera automatiquement
retournée par Goravel. If you would like to define your own response that should be returned by a rate limit, you may use
the response method:

```go
facades.RateLimiter().For("global", func(ctx http.Context) http.Limit {
  return limit.PerMinute(1000).Response(func(ctx http.Context) {
    ctx.Request().AbortWithStatus(http.StatusTooManyRequests)
  })
})
```

Étant donné que les callbacks de limiteur de débit reçoivent l'instance de requête HTTP entrante, vous pouvez construire la limite de débit appropriée
dynamiquement en fonction de la requête entrante ou de l'utilisateur authentifié :

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  // Suppose
  if is_vip() {
    return limit.PerMinute(100)
  }

  return nil
})
```

#### Limites de taux de segmentation

Parfois, vous pouvez vouloir segmenter des limites de débit par une valeur arbitraire. Par exemple, vous pouvez autoriser les utilisateurs à
à accéder à un itinéraire donné 100 fois par minute par adresse IP. Pour cela, vous pouvez utiliser la méthode `By` lors de la construction de
votre limite de débit :

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limite {
  if is_vip() {
    return limit.PerMinute(100).By(ctx.Request().Ip())
  }

  return nil
})
```

To illustrate this feature using another example, we can limit access to the route to 100 times per minute per
authenticated user ID or 10 times per minute per IP address for guests:

```go
facades.RateLimiter().For("global", func(ctx contractshttp.Context) contractshttp.Limit {
  if userID != 0 {
    return limit.PerMinute(100).By(userID)
  }

  return limit.PerMinute(10).By(ctx.Request().Ip())
})
```

#### Limites de taux multiples

Si nécessaire, vous pouvez retourner un tableau de limites de débit pour une configuration de limiteur de débit donnée. Each rate limit will be
evaluated for the route based on the order they are placed within the array:

```go
facades.RateLimiter().ForWithLimits("login", func(ctx contractshttp.Context) []contractshttp.Limit {
  return []contractshttp.Limit{
    limit.PerMinute(500),
    limit.PerMinute(100).By(ctx.Request().Ip()),
  }
})
```

### Attachement des limiteurs de taux à des routes

Les limiteurs de tarifs peuvent être attachés à des routes ou à des groupes d'itinéraires en utilisant le middleware de l'accélérateur. Le middleware de gaz accepte
le nom du limiteur de taux que vous souhaitez assigner à la route:

```go
import github.com/goravel/framework/http/middleware

facades.Route().Middleware(middleware.Throttle("global")).Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().Json(200, http.Json{
    "Hello": "Goravel",
  })
})
```

## Partage de ressources inter-origines (CORS)

Goravel a CORS activé par défaut, la configuration peut être modifiée dans `config/cors.go`.

> Pour plus d'informations sur les entêtes CORS et CORS, veuillez consulter
> la [documentation web MDN sur CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#The_HTTP_response_headers).
