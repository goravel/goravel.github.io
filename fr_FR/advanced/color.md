# Couleur

Le paquet `color` fournit un ensemble de fonctions pour coloriser la sortie du terminal
en utilisant la bibliothèque [PTerm](https://github.com/pterm/pterm).

## Couleur spécifique

Le paquet fournit des méthodes pour créer des imprimantes pour des couleurs spécifiques. Ces méthodes vous permettent de coloriser facilement la sortie du terminal
.

- `color.Red()`
- `color.Green()`
- `color.Yellow()`
- `color.Blue()`
- `color.Magenta()`
- `color.Cyan()`
- `color.White()`
- `color.Black()`
- `color.Gray()`
- `color.Default()`

### Méthodes d'impression

Un `contracts/support.Printer` fournit les méthodes suivantes pour imprimer ou formater du texte avec couleur :

- `Print` - Imprimer du texte
- `Println` - Imprimer du texte avec une nouvelle ligne
- `Printf` - Imprimer le texte formaté
- `Sprint` - Renvoie du texte coloré
- `Sprintln` - Renvoie du texte coloré avec une nouvelle ligne
- `Sprintf` - Renvoie le texte formaté

```go
importez "github.com/goravel/framework/support/color"

color.Blue().Println("Bonjour, Goravel!")
color.Green().Printf("Bonjour, %s!", "Goravel")
```

## Couleur personnalisée

### `color.Nouveau`

La fonction `color.New` crée une nouvelle imprimante couleur. Vous pouvez utiliser cet objet pour coloriser la sortie du terminal.

```go
importez "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Bonjour, Goravel!")
```
