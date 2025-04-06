# Séance

Session enables you to store user information across multiple requests, providing a stateful experience within the
inherently stateless HTTP protocol. Les informations de cet utilisateur sont stockées de manière persistante sur le serveur. Goravel offre une interface
unifiée pour interagir avec divers pilotes de stockage persistants.

## Configuration

Le fichier de configuration `session` est situé dans `config/session.go`. Le pilote par défaut est `file`, qui stocke les sessions
dans le répertoire `storage/framework/sessions`. Goravel vous permet de créer un driver `session` personnalisé en implémentant
l'interface `contracts/session/driver`.

### Enregistrer Middleware

Par défaut, Goravel ne démarre pas automatiquement une session. Cependant, il fournit un middleware pour démarrer une session. Vous pouvez
enregistrer le middleware de session dans le `app/http/kernel. o` fichier pour l'appliquer à toutes les routes, ou vous pouvez l'ajouter à
routes spécifiques :

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Interagir avec la session

### Récupération des données

Vous pouvez utiliser la méthode `Get` pour récupérer les données de la session. Si la valeur n'existe pas, `nil` sera retourné.

```go
valeur := ctx.Request().Session().Get("key")
```

Vous pouvez également passer une valeur par défaut comme second argument à la méthode `Get`. Cette valeur sera retournée si la clé
spécifiée n'existe pas dans la session:

```go
valeur := ctx.Request().Session().Get("key", "default")
```

### Récupération de toutes les données

Si vous souhaitez récupérer toutes les données de la session, vous pouvez utiliser la méthode `Tout` :

```go
données := ctx.Request().Session().All()
```

### Récupération d'un sous-ensemble de données

Si vous souhaitez récupérer un sous-ensemble de données de session, vous pouvez utiliser la méthode `Only`:

```go
data := ctx.Request().Session().Unique([]string{"username", "email"})
```

### Déterminer si un élément existe dans la session

Pour déterminer si un élément est présent dans la session, vous pouvez utiliser la méthode `Has`. La méthode `Has` retourne `true` si l'élément
est présent et n'est pas `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Pour déterminer si un élément est présent et même s'il est `nil`, vous pouvez utiliser la méthode `Exists` :

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Pour déterminer si un élément n'est pas présent dans la session, vous pouvez utiliser la méthode `Missing` :

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Stockage des données

Vous pouvez utiliser la méthode `Put` pour stocker des données dans la session:

```go
ctx.Request().Session().Put("key", "value")
```

### Récupération et suppression des données

Si vous souhaitez récupérer un élément de la session puis le supprimer, vous pouvez utiliser la méthode `Pull`:

```go
valeur := ctx.Request().Session().Pull("clé")
```

### Suppression des données

La méthode `Forget` peut être utilisée pour supprimer un morceau de données de la session. Si vous souhaitez supprimer toutes les données de
la session, vous pouvez utiliser la méthode `Flush`:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### Regénération de l'ID de session

La régénération de l'identifiant de session est souvent effectuée afin d'empêcher les utilisateurs malveillants d'exploiter une attaque de fixation de session
sur votre application. Vous pouvez régénérer l'ID de session en utilisant la méthode `Regenerate` :

```go
ctx.Request().Session().Regenerate()
```

Si vous souhaitez régénérer l'ID de session et oublier toutes les données qui étaient dans la session, vous pouvez utiliser la méthode `Invalidate`
:

```go
ctx.Request().Session().Invalidate()
```

Ensuite, vous devez enregistrer la nouvelle session dans le cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Nom: ctx.Request().Session().GetName(),
  Valeur: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Path: facades.Config().GetString("session. ath"),
  Domaine : facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Flasher les données

Les données Flash sont des données de session qui ne seront disponibles que lors de la requête HTTP suivante, puis seront supprimées.
Les données Flash sont utiles pour stocker des messages temporaires tels que des messages d'état. You may use the `Flash` method to store
flash data in the session:

```go
ctx.Request().Session().Flash("statut", "Tâche réussie!")
```

Si vous souhaitez conserver vos données flash pour une requête supplémentaire, vous pouvez utiliser la méthode `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Si vous souhaitez conserver des données flash spécifiques pour une requête supplémentaire, vous pouvez utiliser la méthode `Keep` :

```go
ctx.Request().Session().Keep("status", "username")
```

Si vous souhaitez conserver des données spécifiques pour une utilisation immédiate, vous pouvez utiliser la méthode `Now` :

```go
ctx.Request().Session().Now("statut", "Tâche réussie!")
```

## Interagir avec le gestionnaire de session

### Construire une session personnalisée

Utilisez la façade `Session` pour construire une session personnalisée. La façade `Session` fournit la méthode `BuildSession`, qui prend
une instance de pilote et un ID de session optionnel si vous voulez spécifier un ID de session personnalisé :

```go
importer "github.com/goravel/framework/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Ajouter des pilotes de session personnalisés

#### Implémenter le moteur

Pour implémenter un pilote de session personnalisé, le pilote doit implémenter l'interface `contracts/session/driver`.

```go
// Le pilote est l'interface pour les gestionnaires de sessions.
type interface Driver {
  // Ferme le gestionnaire de session.
  Erreur Close()
  // Détruit la session avec l'identifiant donné.
  Erreur Destroy(id string)
  // Gc effectue la collecte des déchets sur le gestionnaire de session avec la durée de vie maximale donnée.
  Erreur Gc(maxLifetime int)
  // Ouvre une session avec le chemin et le nom donnés.
  Erreur Open(path string, name string)
  // Lit les données de session associées à l'ID donné.
  Read(id string) (string, error)
  // Write writes the session data associated with the given ID.
  Erreur d'écriture (id string, data string)
}
```

#### Inscription du chauffeur

Après avoir implémenté le pilote, vous devez l'enregistrer à Goravel. Vous pouvez le faire en utilisant la méthode `Extend` de la
`facades.Session`. Vous devriez appeler la méthode `Extend` dans la méthode `boot` de `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Une fois le chauffeur enregistré, vous pouvez l'utiliser en définissant l'option `driver` dans le fichier de configuration de session à
`redis` ou en définissant la variable d'environnement `SESSION_DRIVER` à `redis`.

### Récupération de l'instance du pilote

Utilisez la méthode `Driver` pour récupérer l'instance du pilote depuis le gestionnaire de session. Il accepte un nom de pilote optionnel, si
n'est pas fourni, il renvoie l'instance de pilote par défaut :

```go
driver, errr := facades.Session().Driver("fichier")
```

### Démarrage d'une nouvelle session

```go
session := facades.Session().BuildSession(driver)
session.Start()
```

### Enregistrement des données de la session

```go
session := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Attacher la session à la requête

```go
session := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Vérification si la demande a une session

```go
if ctx.Request().HasSession() {
    //
}
```
