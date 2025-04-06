# Journalisation

Afin de comprendre l'état de l'application en cours d'exécution, Goravel fournit un service de log puissant qui peut enregistrer des messages de log
et des erreurs système vers un fichier ou d'autres canaux à travers des `façades. og()`.

## Configuration

Pour configurer différents canaux de log, des configurations personnalisées peuvent être faites dans `config/logging.go`.

`Goravel` utilise le canal `stack` pour enregistrer les logs par défaut, `stack` permet de transmettre les logs à plusieurs canaux.

La configuration `print` dans les pilotes `single` et `daily` peut contrôler la sortie du journal sur la console.

## Chauffeurs de canaux disponibles

| Nom         | Libellé                     |
| ----------- | --------------------------- |
| `pile`      | Autoriser plusieurs canaux  |
| `single`    | Fichier journal unique      |
| `quotidien` | Un fichier journal par jour |
| `custom`    | Lecteur personnalisé        |

### Contexte d'injection

```go
facades.Log().WithContext(ctx)
```

## Écrire les messages du journal

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof().args)
facades.Log().Warning(message)
facades.Log().Warningf().args)
façades. og().Error(message)
facades.Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message, args)
```

### Écrire sur un canal spécifique

Parfois, vous voudrez peut-être enregistrer des messages vers un canal autre que le canal par défaut de l'application :

```go
facades.Log().Channel("single").Info(message)
```

Si vous voulez écrire sur plusieurs canaux en même temps, vous pouvez utiliser la méthode `Stack`:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Méthodes de chaîne

Goravel fournit des méthodes de chaîne pratiques, qui facilitent l'insertion d'informations plus utiles dans le journal :

```go
facades.Log().User("John").Debug(message)
```

| Méthode                                       | Action                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Code                                          | Définit un code ou un slug qui décrit le journal.                                                   |
| Indice                                        | Définit un indice pour un débogage plus rapide.                                                     |
| Dans                                          | Définissez la catégorie de fonctionnalité ou le domaine dans lequel l'entrée de log est pertinente. |
| Propriétaire                                  | Utile à des fins d'alerte.                                                                          |
| Demander                                      | Fournit une requête http.Request.                                                   |
| Réponse                                       | Fournit une réponse http.Response.                                                  |
| Tags                                          | Ajouter plusieurs tags, décrivant la fonctionnalité renvoyant une erreur.                           |
| Utilisateur                                   | Définit l'utilisateur associé à l'entrée du journal.                                                |
| Avec                                          | Ajouter des paires clé-valeur au contexte de l'entrée du journal.                                   |
| format@@0 WithTrace | Ajouter des informations de pile à l'entrée du journal.                                             |

## Créer un canal personnalisé

Si vous voulez définir un canal complètement personnalisé, vous pouvez spécifier le type de pilote `custom` dans le fichier de configuration `config/logging.go`
.
Ensuite, incluez une option `via` pour implémenter une structure `framework\contracts\log\Logger` :

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Implémenter le pilote

Implémenter l'interface `framework\contracts\log\Logger`.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Gérer le chemin de configuration des canaux ici
  Handle(channel string) (Hook, error)
}
```

peuvent être stockées dans le dossier `app/extensions` (modifiable). Exemple:

```go
les extensions de paquet

import (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Gérer le chemin de configuration des canaux ici
func (logger *Logger) Handle(channel string) (log. ook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Niveaux de niveau de monitoring
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Exécute la logique quand déclenche
func (h *Hook) Fire(log d'entrée. ntry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entrée. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
