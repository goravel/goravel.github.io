# Loggar

För att förstå status för ansökan, Goravel ger en kraftfull loggtjänst som kan spela in
loggmeddelanden och systemfel till en fil eller andra kanaler genom `fasader. og() `.

## Konfiguration

För att konfigurera olika loggkanaler kan anpassade konfigurationer göras i `config/logging.go`.

`Goravel` använder `stack` kanal för att spela in loggar som standard, `stack` låter loggar vidarebefordras till flera kanaler.

`print`-konfigurationen i `single` och `daily`-drivrutiner kan styra loggutdata till konsolen.

## Tillgängliga kanaldrivrutiner

| Namn       | Beskrivning          |
| ---------- | -------------------- |
| `stack`    | Tillåt flera kanaler |
| `singel`   | En loggfil           |
| `dagligen` | En loggfil per dag   |
| `anpassad` | Anpassad enhet       |

### Injektionskontext

```go
fasader.Log().WithContext(ctx)
```

## Skriv loggmeddelanden

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
fasader. og().Fel (meddelande)
fasader.Logg().Fel (meddelande, arg)
fasader.Logg().Fatal(meddelande)
fasader.Logg().Fatalf(meddelande, arg)
fasader.Logg().Panic(meddelande)
fasader.Logg().Panicf(meddelandet, arg)
```

### Skriv till en specifik kanal

Ibland kanske du vill spela in meddelanden till en annan kanal än applikationens standardkanal:

```go
facades.Log().Channel("singel").Info(meddelande)
```

Om du vill skriva till flera kanaler samtidigt, kan du använda `Stack`-metoden:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Kedjemetoder

Goravel ger praktiska kedjemetoder, som gör det enkelt att infoga mer användbar information i loggen:

```go
facades.Log().Användare ("John").Avlus(meddelande)
```

| Metod     | Åtgärd                                                                                   |
| --------- | ---------------------------------------------------------------------------------------- |
| Kod       | Ange en kod eller slug som beskriver loggen.                             |
| Tips      | Ange en ledtråd för snabbare felsökning.                                 |
| I         | Ange vilken funktionskategori eller domän som loggposten är relevant i.  |
| Ägare     | Användbart för att varna ändamål.                                        |
| Begäran   | Levererar en http.Request.                               |
| Svar      | Levererar en http.Response.                              |
| Taggar    | Lägg till flera taggar, som beskriver funktionen som returnerar ett fel. |
| Användare | Ange användaren som är associerad med loggposten.                        |
| Med       | Lägg till nyckelvärde par till sammanhanget för loggposten.              |
| MedTrace  | Lägg till stackinformation till loggposten.                              |

## Skapa en anpassad kanal

Om du vill definiera en helt anpassad kanal kan du ange drivrutinen `custom` i konfigurationsfilen `config/logging.go`
.
Inkludera sedan ett `via`-alternativ för att implementera en `framework\contracts\log\Logger`-struktur:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Implementera förare

Implementera `framework\contracts\log\Logger`-gränssnittet.

```go
// framee/contracts/log/Logger
package log

type Logger-gränssnitt {
  // Hantera pass-kanal config path here
  Hantera(kanal sträng) (Hook, error)
}
```

filer kan lagras i mappen 'app/extensions' (modifierbar). Exempel:

```go
pakettillägg

import (
  "fmt"

  "github. om/goravel/framey/contracts/log"
)

type Logger struct {
}

// Hantera pass kanal config path here
func (logger *Logger) Handtag(kanal sträng) (log. ook, fel) {
  returnera &Hook{}, nil
}

type Hook struct {
}

// Nivåer övervakningsnivå
func (h *Hook) Nivåer () []log. evel {
  returnera []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Fire kör logik när trigger
func (h *Hook) Fire(entry log. ntry) fel {
  fmt.Printf("context=%v level=%v time=%v message=%s", post. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
