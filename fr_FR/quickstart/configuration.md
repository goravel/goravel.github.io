# Configuration

Tous les fichiers de configuration du framework Goravel sont stockés dans le répertoire `config`. Vous pouvez consulter les instructions
spécifiques et les configurer de manière flexible en fonction des besoins du projet.

## Configuration de l'environnement

Exécuter des applications dans des environnements différents nécessite généralement des configurations différentes. Par exemple, vous pouvez vouloir
activer le mode débogage localement mais ne pas en avoir besoin dans l'environnement de production.

Par conséquent, le framework fournit le fichier `.env.example` dans le répertoire racine. Vous devez copier ce fichier, le renommer
en `.env` avant de commencer le développement, et modifier les éléments de configuration dans le `. nv` fichier selon les besoins de votre projet
.

Notez que le `. le fichier nv` ne doit pas être ajouté au contrôle de version, car lorsque plusieurs personnes collaborent, différents développeurs
peuvent utiliser des configurations différentes, et différentes configurations d'environnement de déploiement sont différentes.

En outre, si un intrus accède à votre dépôt de code, il y aura un risque d'exposer la configuration
sensible. Si vous voulez ajouter un nouvel élément de configuration, vous pouvez l'ajouter au fichier `.env.example` pour synchroniser la configuration
de tous les développeurs.

## Récupérer la configuration de l'environnement

Utilisez la méthode suivante pour obtenir les éléments de configuration dans le fichier `.env`:

```go
// Le premier paramètre est la clé de configuration, et le second paramètre est la valeur par défaut
facades.Config().Env("APP_NAME", "goravel")
```

## Accéder aux valeurs de configuration

Vous pouvez facilement utiliser la fonction globale `facades.Config()` n'importe où dans l'application pour accéder aux valeurs de configuration
dans le répertoire `config`. L'accès à la valeur de configuration peut utiliser la syntaxe "." Vous pouvez également spécifier une valeur
par défaut, si l'option de configuration n'existe pas, la valeur par défaut est retournée :

```go
// Récupère la configuration via assertion
facades.Config().Get("app.name", "goravel")

// Récupère la configuration du type de chaîne de caractères
facades.Config().GetString("app. ame", "goravel")

// Récupère la configuration du type
facades.Config().GetInt("app. nt", 1)

// Récupère la configuration du type bool
facades.Config().GetBool("app.debug", true)
```

## Configurer la configuration

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", mapper[string]any{"case3": "value3"})
```

## Obtenir des informations sur le projet

Vous pouvez utiliser la commande `artisan about` pour voir la version du framework , la configuration, etc.

```bash
allez exécuter. artisan à propos de
```
