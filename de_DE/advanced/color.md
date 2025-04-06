# Farbe

Das Paket `color` stellt eine Reihe von Funktionen zur Verfügung, um die Ausgabe des Terminals
mit Hilfe der [PTerm](https://github.com/pterm/pterm) Bibliothek einzufärben.

## Spezifische Farbe

Das Paket bietet Methoden zur Erstellung von Druckern für bestimmte Farben. Mit diesen Methoden können Sie einfach die
Ausgabe des Terminals einfärben.

- `color.Red()`
- `color.Green()`
- `color.Yellow()`
- `color.Blue()`
- `color.Magenta()`
- `color.Cyan()`
- `color.White()`
- `color.Black()`
- `color.gray()`
- `color.Standard()`

### Drucker-Methoden

Ein `contracts/support.Printer` bietet folgende Methoden, um Text mit Farbe zu drucken oder zu formatieren:

- `Drucken` - Text drucken
- `Println` - Text mit einer neuen Zeile drucken
- `Printf` - Formatierter Text drucken
- `Sprint` - Gibt gefärbten Text zurück
- `Sprintln` - Gibt gefärbten Text mit einer neuen Zeile zurück
- `Sprintf` - Formatierter Text zurückgeben

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hallo, Goravel!")
color.Green().Printf("Hallo, %s!", "Goravel")
```

## Eigene Farbe

### `color.New`

Die `color.New` Funktion erzeugt einen neuen Farbdrucker. Sie können dieses Objekt verwenden, um die Ausgabe des Terminals einzufärben.

```go
import "github.com/goravel/framework/support/color"

color.Neu(color.FgRed).Println("Hallo, Goravel!")
```
