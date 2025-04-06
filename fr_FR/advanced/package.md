# Développement du paquet

Les paquets sont le principal moyen d'ajouter des fonctionnalités à Goravel. Ces paquets peuvent contenir des routes, des contrôleurs et des configurations
qui sont spécifiquement conçues pour améliorer une application Goravel. This guide focuses on developing
Goravel-specific packages.

Voici un exemple de construction d'un paquet
tiers : [goravel/example-package](https://github.com/goravel/example-package)

## Création d'un package

Vous pouvez facilement créer un modèle de package en utilisant la commande Artisan :

```shell
exécutez . artisan make:package sms
```

Les fichiers créés sont enregistrés par défaut dans le dossier `packages` de la racine, vous pouvez utiliser l'option `--root` pour personnaliser :

```shell
exécutez . artisan make:package --root=pkg sms
```

## Fournisseurs de services

(../foundation/providers) servent de passerelle entre votre colis et Goravel.
Ils sont généralement situés à la racine du paquet en tant que fichier `service_provider.go`. Leur fonction principale est de lier les éléments
au conteneur de service de Goravel et de guider Goravel dans le chargement des ressources du paquet.

## Usage

Enregistrez le `ServiceProvider` dans le paquet vers `config/app.go::providers`, puis exportez `facades` vers l'application.
Pour des étapes détaillées, reportez-vous à [goravel/example-package] (https://github.com/goravel/example-package).

## Ressource

### Configuration

Généralement, vous devrez publier le fichier de configuration de votre paquet dans le répertoire `config` de l'application. This will
allow users of your package to easily override your default configuration options. Pour autoriser la publication de vos fichiers de configuration à
, appelez la méthode `Publishes` de la méthode `Boot` de votre fournisseur de services, le premier paramètre est le nom du paquet
et le second paramètre est le mappage entre le chemin du fichier du paquet actuel et le chemin du projet :

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Routes

S'il y a [routes](../basic/routing) dans votre paquet, vous pouvez utiliser `app.MakeRoute()` pour résoudre
`facades.Route()`, puis ajouter les routes au projet:

```go
func (récepteur *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)

```

### Migrations

S'il y a [migrations](../orm/migrations) dans votre paquet, vous pouvez les publier par la méthode `Publishes`:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Commandes

Vous pouvez enregistrer la commande `Artisan` par la méthode `Commands`, vous pouvez exécuter les commandes
en utilisant [Artisan CLI](../advanced/artisan) après les avoir enregistrées.

```go
func (récepteur *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Actifs publics

Votre package peut avoir des ressources telles que JavaScript, CSS et images. Pour publier ces ressources dans le répertoire `public`
de l'application, utilisez la méthode `Publishes` du fournisseur de service:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Publication des groupes de fichiers

Si vous voulez publier séparément des groupes spécifiques d'actifs et de ressources de paquets, vous pouvez utiliser des balises lorsque vous appelez la méthode
`Publishes` du fournisseur de services du paquet. Cela vous permet de donner aux utilisateurs la possibilité de publier certains fichiers
, comme des fichiers de configuration, sans avoir à publier tous les actifs du paquet. Pour illustrer vous pouvez définir deux groupes
pour publier le paquet `sms` (`sms-config` et `sms-migrations`) en utilisant les balises dans la méthode `Boot` du fournisseur de services du paquet
.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("migrations"),
  }, "sms-migrations")
}
```

## Publier des ressources

Dans le projet, vous pouvez publier les ressources enregistrées dans un paquet en utilisant la commande Artisan `vendor:publish` :

```shell
exécutez . artisan vendor:publish --package={You package name}
```

La commande peut utiliser les options suivantes :

| Nom de l’option | Alias | Action                                                                                                                                                                                                                                                                                       |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --package       | -p    | Le nom du paquet, peut être un paquet distant : `github.com/goravel/example-package`, et peut aussi être un paquet local : `. packages/example-package`, notez que lorsque vous utilisez un nom de paquet local, il doit commencer par `./`. |
| --tag           | -t    | Groupe de ressources                                                                                                                                                                                                                                                                         |
| --force         | -f    | Écraser tous les fichiers existants                                                                                                                                                                                                                                                          |
| --existing      | -e    | Publier et écraser uniquement les fichiers qui ont déjà été publiés                                                                                                                                                                                                                          |
