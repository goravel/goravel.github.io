# Cycle de vie de la requête

Le fichier `main.go` sert de point d'entrée pour toutes les requêtes de l'application Goravel. Il utilise la fonction
`bootstrap.Boot()` pour initialiser le framework.

Puis une instance Goravel est créée par `app := foundation.NewApplication()` dans `bootstrap/app.go`.

Après cela, utilisez `app.Boot()` pour charger le [Service Provider](providers) enregistré, et `config.Boot()` à
charger les fichiers de configuration dans le répertoire de configuration.

Enfin, démarrez le serveur HTTP en utilisant `facades.Route().Run(facades.Config().GetString("app.host"))` dans `main.go`.
