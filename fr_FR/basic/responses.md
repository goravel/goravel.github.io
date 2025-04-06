# Réponse HTTP

Vous pouvez utiliser `ctx.Response()` pour une réponse HTTP dans le contrôleur.

## Chaîne de caractères

```go
importer "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Bonjour Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx. esponse().Json(http. tatusOK, struct {
  ID uint `json:"id"`
  Nommer la chaîne `json:"name"`
}{
  Id: 1,
  Face : "Goravel",
})
```

## Retour personnalisé

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Fichier de réponse

```go
importer "net/http"

ctx.Response().File("./public/logo.png")
```

## Télécharger le fichier

```go
import "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Joindre l'en-tête

```go
import "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Bonjour Goravel")
```

## Cookie

### Définir le cookie

Utilisez la méthode `Cookie` sur l'instance `response` pour définir un `cookie`. La méthode `Cookie` accepte une instance `http.Cookie`
, qui vous permet de définir diverses options de cookies.

```go
import (
  "time"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Nom: "name",
  Valeur: "Goravel",
  Path: "/",
  Domaine: "goravel. ev",
  Expire : time.Now().Add(24 * time.Hour),
  Sécurisé : true,
  HttpOnly : true,
})
```

### Cookie d'expiration

Utilisez la méthode `WithoutCookie` pour supprimer un cookie.

```go
Réponse().Sans Cookie("nom")
```

## Retour réussi

```go
ctx.Response().Success().String("Bonjour Goravel")
ctx.Response().Success().Json(http.Json{
  "Hello": "Goravel",
})
```

## Code personnalisé

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hello": "Goravel",
})
```

## Flux de retour

```go
ctx.Response().Stream(http.StatusCreated, func(w http. erreur de traitement {
  data := []string{"a", "b", "b", "c"}
  pour _, item := données d'intervalle {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    temps.Sleep(1 * fois. econd)
  }

  renvoie nil
})
```

## Rediriger

```go
Ctx.Response().Redirect(http.StatusMovedPermanently, "https://goravel.dev")
```

## Aucun contenu

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Obtenir la réponse

Vous pouvez obtenir toutes les informations de `ctx.Response()`, qui est couramment utilisé dans le middleware HTTP:

```go
origine := ctx.Response().Origin()
```

`origin` contient quelques méthodes comme montré ci-dessous：

| Méthode | Action                            |
| ------- | --------------------------------- |
| Corps   | Récupérer les données de réponse  |
| En-tête | Récupérer l'en-tête de la réponse |
| Taille  | Taille de la réponse              |
| Statut  | Obtenir le statut de la réponse   |
