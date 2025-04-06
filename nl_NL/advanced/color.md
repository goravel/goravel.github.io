# Kleur

Het `color` pakket biedt een aantal functies om de uitvoer van de terminal
met behulp van [PTerm](https://github.com/pterm/pterm) bibliotheek te kleuren.

## Specifieke kleur

Het pakket biedt methoden om printers voor specifieke kleuren te maken. Met deze methoden kan je gemakkelijk de terminal
uitvoer kleuren.

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

### Printer Methoden

Een `contracts/support.Printer` biedt de volgende methodes aan om tekst te printen of formatteren met kleur:

- `Print` - Print tekst
- `Println` - Print tekst met een nieuwe regel
- `Printf` - Print opgemaakt tekst
- `Sprint` - Retourneer gekleurde tekst
- `Sprintln` - Retourneer gekleurde tekst met een nieuwe regel
- `Sprintf` - Retourneer gekleurde tekst

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hello, Goravel!")
color.Green().Printf("Hello, %s!", "Goravel")
```

## Aangepaste kleur

### `color.Nieuw`

De `color.New` functie maakt een nieuwe kleur printer. Je kunt dit object gebruiken om de uitvoer van de terminal te kleuren.

```go
importeer "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Hello, Goravel!")
```
