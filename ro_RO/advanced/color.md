# Culoare

Pachetul `color` oferă un set de funcţii pentru a colora ieşirea terminalului
folosind biblioteca [PTerm](https://github.com/pterm/pterm).

## Culoare specifică

Pachetul oferă metode de creare a imprimantelor pentru culori specifice. Aceste metode vă permit să colorați cu ușurință ieșirea terminalului

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

### Metode imprimantă

Un `contract/support.Printer` oferă următoarele metode de tipărire sau formatare a textului cu culoarea:

- `Print` - Textul de printare
- `Println` - Scrie textul cu o linie nouă
- `Printf` - Tipăreşte textul formatat
- `Sprint` - Text colorat de returnare
- `Sprintln` - Returnează text colorat cu o linie nouă
- `Sprintf` - Returnează text colorat formatat

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hello, Goravel!")
color.Green().Printf("Hello, %s!", "Goravel")
```

## Culoare personalizată

### `color.New`

Funcţia `color.New` creează o imprimantă de culoare nouă. Poți folosi acest obiect pentru a colora ieșirea terminalului.

```go
import "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Hello, Goravel!")
```
