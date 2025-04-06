# Färg

`color`-paketet ger en uppsättning funktioner för att färga utgången från terminalen
med hjälp av [PTerm](https://github.com/pterm/pterm) biblioteket.

## Specifik färg

Paketet innehåller metoder för att skapa skrivare för specifika färger. Dessa metoder gör att du enkelt kan färga terminal
utgång.

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

### Skrivare metoder

En `contracts/support.Printer` ger följande metoder för att skriva ut eller formatera text med färg:

- `Print` - Skriv ut text
- `Println` - Skriv ut text med en ny rad
- `Printf` - Skriv ut formaterad text
- `Sprint` - Retur färgad text
- `Sprintln` - Returfärgad text med en ny rad
- `Sprintf` - Returformaterad färgad text

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hej, Goravel!")
color.Green().Printf("Hej, %s!", "Goravel")
```

## Anpassad färg

### `color.New`

Funktionen `color.New` skapar en ny färgskrivare. Du kan använda detta objekt för att färga utgången av terminalen.

```go
import "github.com/goravel/framey/support/color"

color.New(color.FgRed).Println("Hej, Goravel!")
```
