# Vues

Bien sûr, il n'est pas pratique de renvoyer des chaînes de documents HTML entières directement à partir de vos routes et contrôleurs.
Heureusement, les vues fournissent un moyen pratique de placer tout notre HTML dans des fichiers séparés. Les vues séparent votre contrôleur /
logique d'application de votre logique de présentation et sont stockées dans le répertoire `resources/views`.

## Création et rendu des vues

Lorsque vous utilisez le modèle par défaut Goravel `html/template`, vous pouvez créer des vues en ajoutant un fichier avec l'extension `.tmpl`
dans le répertoire `resources/views` de l'application.

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Hello, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Après avoir créé la vue, vous pouvez utiliser la méthode `View` pour retourner la vue depuis une route ou un contrôleur dans l'application:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Répertoires de vue imbriquée

Les vues peuvent également être imbriquées dans les sous-répertoires du répertoire `resources/views`. Par exemple, si votre vue est stockée
dans `resources/views/admin/profile. mpl`, vous pouvez le retourner à partir d'une des routes ou contrôleurs de votre application, notez
que la vue doit être définie comme `définir "admin/profile. mpl"` comme indiqué ci-dessous:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Bienvenue dans le panneau d'administration</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### Création de la première vue disponible

En utilisant la méthode `First`, vous pouvez utiliser la première vue qui existe dans un tableau de vues donné. Cela peut être utile si votre application
ou votre package autorise les vues à être personnalisées ou écrasées :

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, mapper[string]any{
  "name": "Goravel",
})
```

### Déterminer si une vue existe

Si vous avez besoin de déterminer si une vue existe, vous pouvez utiliser la méthode `facades.View()` :

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Passage des données aux vues

Comme vous l'avez vu dans les exemples précédents, vous pouvez passer un tableau de données aux vues pour rendre ces données disponibles à la vue.
Veuillez noter que le format des données passées doit être modifié en fonction du pilote de modèle utilisé, dans l'exemple
suivant, en utilisant le pilote par défaut `html/template` :

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Partage de données avec toutes les vues

Parfois, vous pourriez avoir besoin de partager des données avec toutes les vues qui sont affichées par votre application. Vous pouvez le faire en utilisant la méthode
`Share` dans `facades.View()`. Généralement, vous devriez passer des appels à la méthode `Share` dans la méthode
`Boot` d'un fournisseur de services. Vous êtes libre de les ajouter à la classe `app/providers/app_service_provider.go` ou de générer un prestataire de services séparé
pour les héberger :

```go
importateurs de paquets

(
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (récepteur *AppServiceProvider) Register(fondation d'applications. pplication) {
}

func (récepteur *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
