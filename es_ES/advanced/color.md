# Color

El paquete `color` proporciona un conjunto de funciones para colorear la salida de la terminal
usando la librería [PTerm](https://github.com/pterm/pterm).

## Color específico

El paquete proporciona métodos para crear impresoras para colores específicos. Estos métodos le permiten colorear fácilmente la salida
terminal.

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

### Métodos de impresora

Un `contracts/support.Printer` proporciona los siguientes métodos para imprimir o formatear texto con color:

- `Imprimir` - Imprimir texto
- `Imprimir` - Imprime texto con una nueva línea
- `Imprimir` - Imprimir texto formateado
- `Sprint` - Devuelve texto de color
- `Sprintln` - Regresa texto coloreado con una nueva línea
- `Sprintf` - Devuelve texto de color formateado

```go
importar "github.com/goravel/framework/support/color"

color.Blue().Println("Hola, Goravel!")
color.Green().Printf("Hola, %s!", "Goravel")
```

## Color personalizado

### `color.Nuevo`

La función `color.New` crea una nueva impresora de color. Puede usar este objeto para colorear la salida del terminal.

```go
importar "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Hola, Goravel!")
```
