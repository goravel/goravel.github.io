# Requêtes HTTP

La méthode `contracts/http/Request` de Goravel peut interagir avec la requête HTTP courante traitée par l'application,
et obtenir les entrées et les fichiers soumis ensemble.

## Interagir avec la requête

L'instance `http.Context` est automatiquement injectée dans le contrôleur:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Récupération du chemin de la requête

```go
chemin := ctx.Request().Path() // /users
```

### Récupération de l'URL de la requête

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Récupération de l'HOST de la requête

```go
url := ctx.Request().Host()
```

### Récupération de l'URL de la requête complète

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Récupération de la méthode de requête

```go
méthode := ctx.Request().Method()
```

### En-têtes de la requête

```go
header := ctx.Request().Header("X-Header-Name", "default")
headers := ctx.Request().Headers()
```

### Demander une adresse IP

```go
ip := ctx.Request().Ip()
```

## Input

### Récupération de toutes les données d'entrée

Vous pouvez récupérer toutes les données d'entrée de la requête en tant que `map[string]any` en utilisant la méthode `All`, qui est une collection
de `json`, `form` et `query`(priorité de front à back).

```go
données := ctx.Request().All()
```

### Récupération d'une valeur de route

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Récupération de l'entrée dans la chaîne de requête

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
name := ctx.Request().QueryInt64("id")
name := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
noms := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
noms := ctx.Request().QueryMap("names")

requêtes := ctx.Request().Queries()
```

> Note: Seules les données Json unidimensionnelles peuvent être obtenues, sinon elles retourneront vides.

### Récupération d'une valeur d'entrée

Accédez à toutes les entrées de l'utilisateur sans vous soucier du verbe HTTP utilisé pour la requête. Récupérer l'ordre : `json`,
`form`.

```go
name := ctx.Request().Input("name")
name := ctx.Request().Input("name", "goravel")
name := ctx.Request().InputInt("name")
name := ctx.Request(). nputInt64("name")
name := ctx.Request().InputBool("name")
name := ctx.Request().InputArray("name")
name := ctx.Request().InputMap("name")
```

### Lier Json/Forme

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user User
err := ctx.Request().Bind(&user)
```

```go
var user map[string]any
err := ctx.Request().Bind(&user)
```

### Requête de liaison

Ne prend en charge que la requête de liaison au struct:

```go
type Test struct {
  ID string `form:"id"`
}
var test Test
err := ctx.Request().BindQuery(&test)
```

## Cookie

### Récupération d'une valeur de cookie

Goravel fournit un moyen simple de travailler avec `cookie`. Utilisez la méthode `Cookie` sur l'instance `Request` pour récupérer une valeur
`cookie`, retournera une chaîne vide si le `cookie` n'est pas présent. Vous pouvez également définir une valeur par défaut dans l'argument
seconde.

```go
valeur := ctx.Request().Cookie("name")
valeur := ctx.Request().Cookie("name", "default") 
```

## Fichier

### Récupération du fichier

```go
fichier, erreur := ctx.Request().Fichier ("fichier")
```

### Enregistrer le fichier

```go
file, err := ctx.Request().File("file")
file.Store("./public")
```

### Obtenir la requête Origin

```go
requête := ctx.Request().Origin()
```

### Joindre des données

```go
format@@0 ctx.WithValue("user", "Goravel")
```

### Récupérer les données

```go
utilisateur := ctx.Value("utilisateur")
```

### Obtenir le contexte

```go
ctx := ctx.Context()
```

## Récupération personnalisée

Vous pouvez définir un `recovery` personnalisé en appelant la méthode `Recover` dans le fichier `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Ajouter un middleware HTTP
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, error) {
    ctx.Request(). bort()
    // ou
    // ctx.Response(). tring(500, "Erreur de serveur interne").Abort()
  })
  ...
}
```
