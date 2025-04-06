# Middleware

Middleware fournit un mécanisme pratique pour inspecter et filtrer les requêtes HTTP entrant dans votre application.

## Définir le Middleware

Vous pouvez créer votre propre middleware dans le répertoire `app/http/middleware`, la structure est comme suit.

```go
package middleware

import (
  "github.com/goravel/framework/contracts/http"
)

func Auth() http.Middleware {
  return func(ctx http.Context) {
    ctx.Request().Next()
  }
}
```

### Créer un Middleware par commande

```
go run . artisan make:middleware Auth

// Supporte les dossiers imbriqués
go run . artisan make:middleware user/Auth
```

## Enregistrer Middleware

### Middleware Global

Si vous voulez appliquer le middleware pour chaque requête HTTP de votre application, vous devez seulement enregistrer le middleware dans
le `Middleware` dans l'`app/http/kernel. o` fichier.

```go
// app/http/kernel.go
package http

import (
  "github. om/goravel/framework/contracts/http"
  
  "goravel/app/http/middleware"
)

type Kernel struct {
}

func (kernel *Kernel) Middleware() []http. iddleware {
  return []http.Middleware{
    middleware.Auth(),
  }
}
```

### Assigner Middleware pour le routage

Vous pouvez enregistrer séparément le middleware pour certains routages :

```go
importer "github.com/goravel/framework/http/middleware"

facades.Route().Middleware(middleware.Auth()).Get("users", userController.Show)
```

## Abandonner la demande

En middleware, si vous avez besoin d'interrompre la requête, vous pouvez utiliser la méthode `Abort`.

```go
ctx.Request().Abort()
ctx.Request().Abort(http.StatusNotFound)
ctx.Response().String(http.StatusNotFound, "Not Found").Abort()
```
