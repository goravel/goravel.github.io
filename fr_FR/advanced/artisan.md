# Artisan Console

Artisan est l'outil CLI fourni avec Goravel pour interagir avec la ligne de commande. Vous pouvez y accéder en utilisant
`facades.Artisan()`. Cet outil a plusieurs commandes utiles qui peuvent vous aider dans le développement de votre application.
Utilisez la commande suivante pour afficher toutes les commandes disponibles.

```shell
aller exécuter. liste d'artisan
```

Chaque commande a également une fonctionnalité "help" qui montre et explique les arguments et les options associés à la commande. Pour
voir l'écran d'aide, il suffit d'ajouter "help" avant le nom de la commande.

```shell
allez exécuter. migration de l'aide artisanale
```

Au lieu de répéter `go run . artisan ...`, vous pouvez ajouter un alias à la configuration de votre shell avec la commande
terminal ci-dessous:

```shell
echo -e "\r\nalias artisan=\"go run . artisan\"" >>~/.zshrc
```

Ensuite, vous pouvez simplement exécuter vos commandes comme ceci:

```shell
artisan make:controller DemoController
```

Vous pouvez également utiliser le script shell `artisan` comme ceci :

```shell
./artisan make:controller DemoController
```

### Générer des commandes

Vous pouvez utiliser la commande `make:command` pour créer une nouvelle commande dans le répertoire `app/console/commands`. Ne vous inquiétez pas si
ce répertoire n'existe pas dans votre application, il sera créé la première fois que vous exécutez la commande `make:command`:

```shell
exécutez . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Structure de commande

Après avoir généré votre commande, attribuez des valeurs appropriées aux propriétés de signature et de description du struct. La méthode
`Handle` sera appelée lorsque votre commande sera exécutée. Vous devez implémenter votre logique dans cette méthode.

```go
les commandes de paquet

import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Signature Le nom et la signature de la commande console.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Description La description de la commande de la console.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Extension de la commande console.
func (receiver *SendEmails) Extend() commande. xtend {
  return command.Extend{}
}

// Traite la commande console.
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
  return nil
}
```

## E/S de commande

### Retrieving Input

Lorsque vous écrivez des commandes de console, il est typique de collecter les entrées de l'utilisateur via `arguments` ou `options`. Avec Goravel, il est
extrêmement facile de récupérer les arguments et les options fournis par l'utilisateur.

#### Arguments

Suivez les arguments après la commande :

```shell
exécutez . artisan send:emails NOM EMAIL
```

Get arguments:

```go
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Options

Les options, comme les arguments, sont une autre forme de saisie de l'utilisateur. Les options sont préfixées par deux tirets (--) quand elles sont fournies
via la ligne de commande.

Définition：

```go
func (receiver *ListCommand) Extend() command.Extend {
  return commande. xtend{
    Flags: []command.Flag{
      &command. tringFlag{
        Nom: "lang",
        Valeur : "default",
        Alias : []string{"l"},
        Utilisation : "langage pour les salutations",
      },
    },
  }
}
```

Obtenir：

```go
func (récepteur *ListCommand) Handle(ctx console.Context) erreur {
  lang := ctx.Option("lang")

  return nil
}
```

Utilisation：

```shell
aller exécuter. e-mails artisanaux --lang Chinese
aller exécuter. emails artisanaux -l Chinois
```

Remarque : Lorsque vous utilisez à la fois des arguments et des options, définissez les options avant les arguments. Exemple:

```shell
// A droite
aller exécuter . emails artisan --lang=nom chinois
// Mauvais
aller exécuter . email artisan name --lang=nom chinois
```

Sauf `command.StringFlag`, nous pouvons également utiliser d'autres types `Flag` et `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Demande de saisie

#### Poser des questions

En plus des arguments et des options, vous pouvez également demander à l'utilisateur de saisir une valeur lors de l'exécution d'une commande. La méthode
`Ask` demandera à l'utilisateur la question donnée et retournera sa réponse :

```go
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
  email, err := ctx.Ask("Quelle est votre adresse e-mail?")
  
  return err
}
```

De plus, vous pouvez passer des options à la méthode `Ask` en tant que deuxième argument optionnel :

```go
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
    name, err := ctx.Ask("Quel est votre nom?", console. skOption{
        Par défaut: "Krishan",
    })
    
    return err
}

// Options
type AskOption struct {
    // Valeur par défaut pour l'entrée.
    Chaîne
    // Description de la description de l'entrée.
    Description chaîne
    // Ligne le nombre de lignes pour l'entrée. use for multiple lines text)
    Lines int
    // Limite la limite de caractères pour l'entrée.
    Limit int
    // Multiple détermine si l'entrée est une seule ligne ou plusieurs lignes de texte
    Multiple bool
    // Placeholder the input placeholder.
    Placeholder string
    // Invite le message. use for single line input)
    Prompt string
    // Valide la fonction de validation d'entrée.
    Valider l'erreur func(string)
}
```

Parfois, vous pouvez avoir besoin de cacher l'entrée de l'utilisateur, par exemple lorsque vous demandez un mot de passe. Vous pouvez utiliser la méthode `Secret` pour
masquer les entrées de l'utilisateur :

```go
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
    password, err := ctx.Secret("Qu'est-ce que le mot de passe ?", console. ecretOption{
        Validate: func (s string) erreur {
            if len(s) < 8 {
                return errors. ew("La longueur du mot de passe doit être d'au moins 8")
            }
            return nil
        },
    })
    
    return err
}

// Options
type SecretOption struct {
    // Valeur par défaut pour l'entrée.
    Chaîne par défaut
    // Description de la description de l'entrée.
    Description string
    // Limite la limite de caractères pour l'entrée.
    Limit int
    // Placeholder the input placeholder.
    Placeholder string
    // Valide la fonction de validation de l'entrée.
    Valider l'erreur fonction
}
```

#### Confirmation des actions

Si vous devez demander à l'utilisateur de confirmer une action avant de poursuivre, vous pouvez utiliser la méthode `Confirm`. Par défaut, cette méthode
retournera `false` à moins que l'utilisateur ne sélectionne l'option positive.

```go
si réponse, _ := ctx.Confirm("Voulez-vous continuer?"); !answer {
    // ...
}
```

Vous pouvez également passer un second argument à la méthode `Confirm` pour personnaliser la valeur par défaut, le libellé des boutons affirmatifs et
négatifs :

```go
if answer, _ := ctx.Confirm("Do you wish to continue?", console.ConfirmOption; !answer {
 Default : true,
 Affirmative : "Yes",
 Negative : "No",
}) {
    // ...
}

// Available options
type ConfirmOption struct {
    // Affirmative label for the affirmative button.
    Affirmative string
    // Default the default value for the input.
    Default bool
    // Description the input description.
    Description string
    // Negative label for the negative button.
    Negative string
}
```

#### Questions de sélection unique

Si vous devez demander à l'utilisateur de sélectionner une option dans une liste d'options, vous pouvez utiliser la méthode `Choice`. La méthode `Choice`
retournera la valeur de l'option sélectionnée :

```go
question := "Quel est votre langage de programmation favori?"
options := []console. hoice{
    {Key: "go", Value: "Go"},
    {Key: "php", Valeur: "PHP"},
    {Key: "python", Valeur: "Python"},
    {Key: "cpp", Valeur: "C++", Sélectionné: true},
}
couleur, err := ctx. hoice(question, options)
```

De plus, vous pouvez passer des options à la méthode `Choice` en tant que deuxième argument optionnel :

```go
question := "Quel est votre langage de programmation favori?"
options := []console. hoice{
    {Key: "go", Value: "Go"},
    {Key: "php", Valeur: "PHP"},
    {Key: "python", Valeur: "Python"},
    {Key: "cpp", Valeur: "C++", Sélectionné: true},
}

couleur, err := ctx. hoice(question, options, console. hoiceOption{
    Par défaut: "go",
})

// Options disponibles
type ChoiceOption struct {
    // Valeur par défaut pour l'entrée.
    Chaîne par défaut
    // Description de la description de l'entrée.
    Description string
    // Valide la fonction de validation des entrées.
    Valider l'erreur fonction
}
```

#### Questions à choix multiple

Si vous devez demander à l'utilisateur de sélectionner plusieurs options à partir d'une liste d'options, vous pouvez utiliser la méthode `MultiSelect`. La méthode
`MultiSelect` retournera les valeurs des options sélectionnées :

```go
question := "Quels sont vos langages de programmation favoris ?"
options := []console. hoice{
    {Key: "go", Value: "Go"},
    {Key: "php", Valeur: "PHP"},
    {Key: "python", Valeur: "Python"},
    {Key: "cpp", Valeur: "C++", Sélectionné: true},
}
couleurs, err := ctx. ultiSelect(question, options)
```

De plus, vous pouvez passer des options à la méthode `MultiSelect` en tant que deuxième argument optionnel :

```go
question := "Quels sont vos langages de programmation favoris ?"
options := []console. hoice{
    {Key: "go", Value: "Go"},
    {Key: "php", Valeur: "PHP"},
    {Key: "python", Valeur: "Python"},
    {Key: "cpp", Valeur: "C++", Sélectionné: true},
}

couleurs, err := ctx. ultiSelect(question, options, console. ultiSelectOption{
    Par défaut: []string{"go", "php"},
})

// Options disponibles
type MultiSelectOption struct {
    // Valeur par défaut pour l'entrée.
    Par défaut []chaîne
    // Description de la description d'entrée.
    Description chaîne
    // Filtrable détermine si les choix peuvent être filtrés, tapez `/` pour démarrer le filtre.
    Filterable bool
    // Limite le nombre de choix qui peuvent être sélectionnés.
    Limit int
    // Valide la fonction de validation des entrées.
    Valider l'erreur func([]string)
}
```

### Sortie d'écriture

Parfois, vous pourriez avoir besoin d'écrire une sortie sur la console. Goravel fournit plusieurs méthodes pour vous aider à écrire la sortie
sur la console. Chacune des méthodes a leur sortie colorisée appropriée. Par exemple, `Error` affichera le texte
en rouge.

```go
func (récepteur *SendEmails) Handle(ctx console.Context) erreur {
  ctx. omment("Ceci est un message de commentaire")
  ctx.Info("Ceci est un message d'information")
  ctx. rror("Ceci est un message d'erreur")
  ctx.Line("Ceci est un message de ligne")
  ctx. arning("Ceci est un message d'avertissement")
  return nil
}
```

Vous pouvez utiliser la méthode `NewLine` pour écrire une nouvelle ligne dans la console :

```go
// écrit une seule ligne vide
ctx.NewLine()

// écrit plusieurs lignes vides
ctx.NewLine(2)
```

#### Barres de progression

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. Vous pouvez utiliser la méthode `WithProgressBar` pour afficher une barre de progression.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

Parfois, vous pouvez avoir besoin de mettre à jour la barre de progression manuellement. Vous pouvez utiliser la méthode `CreateProgressBar` pour mettre à jour la barre de progression
:

```go
utilisateurs := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range users {
    // process user
    bar. dvance()
 
 // veille pendant un certain temps pour simuler le traitement 
    . leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Spinner

Si vous avez besoin d'afficher un spinner pendant l'exécution d'une tâche, vous pouvez utiliser la méthode `Spinner`.

```go
err := ctx.Spinner("Chargement...", console. pinnerOption{
    Action: func() erreur {
        // quand arrêter le temps de rotation
        . leep(2 * time.Second)
        return nil
    },
})
```

## Catégorie

Vous pouvez définir un ensemble de commandes à la même catégorie, pratique dans `go run . liste d'artisan`:

```go
// Prolonger la commande console extend.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
 } } }
```

## Enregistrement des commandes

Toutes les commandes de votre console doivent être enregistrées dans la fonction `Commands` dans `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Exécution programmatique des commandes

Parfois, vous pouvez vouloir exécuter une commande Artisan en dehors du CLI, vous pouvez utiliser la méthode `Call` sur les façades
`. rtisan()` pour utiliser ceci.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinese name") // Avec arguments et options
})
```
