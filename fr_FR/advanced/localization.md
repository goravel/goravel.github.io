# Traduction

Goravel's localization features provide a convenient way to retrieve strings in various languages, making it easy to
support multiple languages in your application. Les chaînes de langue sont stockées dans des fichiers dans le répertoire `lang`, et
Goravel prend en charge deux façons d'organiser les fichiers de langue :

Chaque langue a son propre fichier :

```
/lang
  en.json
  cn.json
```

Ou, quand il y a trop de traductions, elles peuvent être catégorisées :

```
/lang
  /en
    user.json
  /cn
    user.json
```

## Configuration de la locale

La langue par défaut de l'application est stockée dans l'option de configuration `locale` dans le fichier de configuration `config/app.go`
. Vous pouvez modifier cette valeur en fonction des exigences de votre application.

Vous pouvez également utiliser la méthode `SetLocale` fournie par la façade d'application pour modifier la langue par défaut pour une seule requête `HTTP`
au moment de l'exécution:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "fr")

    return ctx.Response()
})
```

Vous pouvez configurer une « langue de secours » qui sera utilisée lorsque la langue actuelle ne contient pas la chaîne de traduction
donnée. Comme la langue par défaut, la langue de secours est également configurée dans le fichier de configuration `config/app.go`.

```
"fallback_locale": "en",
```

### Déterminer la locale actuelle

Vous pouvez utiliser les méthodes `CurrentLocale` et `IsLocale` pour déterminer la `locale` actuelle ou vérifier si la `locale` est une valeur
donnée.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "fr") {}
```

### Définition des chaînes de traduction

Dans les fichiers de langue, vous pouvez définir des structures à un ou plusieurs niveaux :

```
// lang/en.json
{
  "name": "C'est votre nom",
  "required": {
    "user_id": "UserID est requis"
  }
}
```

### Récupération des chaînes de traduction

Vous pouvez utiliser la méthode `facades.Lang(ctx).Get()` pour récupérer les chaînes de traduction des fichiers de langue. Si le fichier de langue
contient plusieurs niveaux, vous pouvez utiliser `. pour les connecter, et si le fichier de langue est dans plusieurs niveaux de dossiers
, vous pouvez utiliser `/\` pour les connecter.

Par exemple :

```
// lang/en. fils
{
  "name": "C'est votre nom",
  "required": {
    "user_id": "UserID est requis"
  }
}

façades. ang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/fr/role/user. fils
{
  "name": "C'est votre nom",
  "required": {
    "user_id": "UserID is required"
  }
}

facades. ang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Remplacement des paramètres dans les chaînes de traduction

Vous pouvez définir des espaces réservés dans les chaînes de traduction. Tous les espaces réservés ont le préfixe `:`. Par exemple, vous pouvez utiliser un placeholder
pour définir un message de bienvenue :

```
{
  "bienvenue": "Bienvenue, :name"
}
```

Pour remplacer les espaces réservés lors de la récupération d'une chaîne de traduction, vous pouvez passer une option de traduction avec la carte de remplacement
comme le second paramètre aux `façades. méthode de Get()` :

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Remplace: map[string]string{
    "name": "Goravel",
  },
})
```

#### Pluralisation

La pluralisation est un problème complexe parce que les différentes langues ont différentes règles de pluralisation. Cependant, Goravel peut
vous aider à traduire des chaînes en fonction des règles de pluralisation que vous définissez. En utilisant le caractère `|`, vous pouvez
différencier entre les formes singulières et plurielles d'une chaîne de caractères :

```
{
  "apples": "Il y a une pomme|Il y a beaucoup de pommes"
}
```

Vous pouvez même créer des règles de pluralisation plus complexes en spécifiant des chaînes de traduction pour de multiples plages de valeurs :

```
{
  "apples": "{0} There are none|[1,19] There are some|[20,*] There are many"
}
```

Après avoir défini une chaîne de traduction avec des options de pluralisation, vous pouvez utiliser la méthode `facades.Lang(ctx).Choice()` pour
récupérer la ligne pour un `count` donné. Dans cet exemple, parce que le nombre est supérieur à 1, la forme plurielle de la chaîne de traduction
est retournée :

```
facades.Lang(ctx).Choice("messages.appes", 10)
```

Vous pouvez également définir des attributs placeholder dans les chaînes de pluralisation. En passant un tableau en tant que troisième paramètre à la méthode
`facades.Lang(ctx).Choice()`, vous pouvez remplacer ces marqueurs :

```
"minutes_ago": "{1} :valeur minute il y a |[2,*] :valeur minutes auparavant",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Replace: map[string]string{
    "value": "5",
  },
})
```
