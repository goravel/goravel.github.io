# Logboekregistratie

Om de actieve status van de applicatie te begrijpen Goravel biedt een krachtige logboekdienst die
logberichten en systeemfouten kan opnemen naar een bestand of andere kanalen via `facades. og()`.

## Configuratie

Om log kanalen te configureren, kunnen aangepaste configuraties gemaakt worden in `config/logging.go`.

`Goravel` gebruikt `stack` kanaal om de logs standaard op te nemen, `stack` staat toe om logs doorgestuurd te worden naar meerdere kanalen.

De 'print' configuratie in 'single' en 'daily' drivers kunnen de log-uitvoer in de console beheren.

## Beschikbare railchauffeurs

| naam        | Beschrijving              |
| ----------- | ------------------------- |
| `stapel`    | Meerdere kanalen toestaan |
| `single`    | Enkel logboekbestand      |
| `overdag`   | Eén logbestand per dag    |
| 'aangepast' | Aangepaste schijf         |

### Context van injectie

```go
facades.Log().WithContext(ctx)
```

## Logberichten schrijven

```go
facades.Log().Debug(message)
facades.Log().Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message args)
facades. og().Error(bericht)
facades.Log().Log().Errorf(message, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(message, args)
facades.Log().Panic(message)
facades.Log().Panicf(message args)
```

### Schrijf naar een specifiek kanaal

Soms kunt u berichten opnemen in een ander kanaal dan het standaard kanaal van de applicatie:

```go
facades.Log().Channel("enkel").Info(message)
```

Als je naar meerdere kanalen tegelijkertijd wilt schrijven, kun je de 'Stack' methode gebruiken:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Ketting Methoden

Goravel biedt handige kettmethoden, die het gemakkelijk maken om nuttige informatie in te voegen in de log:

```go
facades.Log().User("John").Debug(message)
```

| Methode      | actie                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- |
| Code         | Stel een code of slug in die de log beschrijft.                              |
| Suggestie    | Stel een hint in om sneller te debuggen.                                     |
| Over         | Stel de feature categorie of domein in waarin de log relevant is.            |
| Eigenaar     | Handig voor waarschuwingsdoeleinden.                                         |
| Aanvragen    | Levert een http.Request.                                     |
| Antwoord     | Levert een http.Response.                                    |
| Labels       | Voeg meerdere tags toe, met een beschrijving van de functie een foutmelding. |
| Gebruiker    | Stel de gebruiker in die geassocieerd is met de log.                         |
| met          | Voeg sleutelwaarde-paren toe aan de context van de logboekvermelding.        |
| Terugtrekken | Voeg stapelinformatie toe aan de log invoer.                                 |

## Een aangepast kanaal maken

Als u een volledig aangepast kanaal wilt definiëren, kunt u het `custom` stuurprogramma type opgeven in het `config/logging.go`
configuratiebestand.
Voeg daarna een `via` optie toe om een `framework\contracts\log\Logger` structuur te implementeren:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Implementeer Chauffeur

Implementeer `framework\contracts\log\Logger` interface.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Handle pass channel config pad hier
  Handle(channel string) (Hook, error)
}
```

bestanden kunnen worden opgeslagen in de `app/extensions` map (modifiable). Voorbeeld:

```go
package extensions

import (
  "fmt"

  "github.com/goravel/framework/contracts/log"
)

type Logger struct {
}

// Handle pass channel config path here
func (logger *Logger) Handle(channel string) (log.Hook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Levels monitoring level
func (h *Hook) Levels() []log.Level {
  return []log.Level{
    log.DebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log.ErrorLevel,
    log.FatalLevel,
    log.PanicLevel,
  }
}

// Fire execute logic when trigger
func (h *Hook) Fire(entry log.Entry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry.Context(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
