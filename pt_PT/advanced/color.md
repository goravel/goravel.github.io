# Cor

O pacote `color` fornece um conjunto de funções para colorir a biblioteca de saída do terminal
usando [PTerm](https://github.com/pterm/pterm).

## Cor específica

O pacote fornece métodos para criar impressoras para cores específicas. Estes métodos permitem a você facilmente colorir a saída do terminal
.

- `color.Red()`
- `color.Green()`
- `color.Yellow()`
- `color.Blue()`
- `color.Magenta()`
- `color.Cyan()`
- `color.White()`
- `color.Black()`
- `color.Cinza()`
- `color.Padrão()`

### Métodos de impressora

Um `contratos/support.Printer` fornece os seguintes métodos para imprimir ou formatar texto com cor:

- `Imprimir` - Imprimir texto
- `Println` - Imprimir texto com uma nova linha
- `Printf` - Imprimir texto formatado
- `Sprint` - Retorna texto colorido
- `Sprintln` - Retorna texto colorido com uma nova linha
- `Sprintf` - Retorna texto colorido formatado

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hello, Goravel!")
color.Green().Printf("Olá, %s!", "Goravel")
```

## Cor personalizada

### color.New\`

A função `color.New` cria uma nova impressora de cores. Você pode usar este objeto para colorir a saída do terminal.

```go
import "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Hello, Goravel!")
```
