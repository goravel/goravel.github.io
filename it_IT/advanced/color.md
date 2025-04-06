# Colore

Il pacchetto `color` fornisce un insieme di funzioni per colorare l'output del terminale
usando la libreria [PTerm](https://github.com/pterm/pterm).

## Colore Specifico

Il pacchetto fornisce metodi per creare stampanti per colori specifici. Questi metodi consentono di colorare facilmente l'output del terminale
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

### Metodi Della Stampante

Un `contracts/support.Printer` fornisce i seguenti metodi per stampare o formattare il testo con il colore:

- `Print` - Stampa testo
- `Println` - Stampa testo con una nuova riga
- `Printf` - Stampa testo formattato
- `Sprint` - Reso testo colorato
- `Sprintln` - Restituisce il testo colorato con una nuova riga
- `Sprintf` - Restituisce testo colorato

```go
importa "github.com/goravel/framework/support/color"

color.Blue().Println("Ciao, Goravel!")
color.Green().Printf("Ciao, %s!", "Goravel")
```

## Colore Personalizzato

### `color.New`

La funzione `color.New` crea una nuova stampante a colori. È possibile utilizzare questo oggetto per colorare l'output del terminale.

```go
import "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Ciao, Goravel!")
```
