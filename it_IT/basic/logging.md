# Registrazione

Al fine di capire lo stato di esecuzione dell'applicazione, Goravel fornisce un potente servizio di log che può registrare i messaggi di log
e gli errori di sistema su un file o altri canali attraverso `facciate. og()`.

## Configurazione

Per configurare vari canali di log, le configurazioni personalizzate possono essere fatte in `config/logging.go`.

`Goravel` utilizza il canale `stack` per registrare i log di default, `stack` consente di inoltrare i log a più canali.

La configurazione `print` nei driver `single` e `daily y` può controllare l'output del log nella console.

## Driver di canale disponibili

| Nome     | Descrizione              |
| -------- | ------------------------ |
| `stack`  | Consenti canali multipli |
| `single` | File di log singolo      |
| `dayy`   | Un file di log al giorno |
| `custom` | Unità personalizzata     |

### Inietta Contesto

```go
facades.Log().WithContext(ctx)
```

## Scrivi messaggi di registro

```go
facades.Log().Debug(message)
facades.Log().Debugf(message, args)
facades.Log().Info(message)
facades.Log().Infof(message, args)
facades.Log().Warning(message)
facades.Log().Warningf(message, args)
facades. og().Error(message)
facades.Log().Errorf(messaggio, args)
facades.Log().Fatal(message)
facades.Log().Fatalf(messaggio, args)
facades.Log().Panic(message)
facades.Log().Panicf(messaggio, args)
```

### Scrivi su un canale specifico

A volte, potresti voler registrare i messaggi su un canale diverso dal canale predefinito dell'applicazione:

```go
facades.Log().Channel("single").Info(messaggio)
```

Se vuoi scrivere su più canali allo stesso tempo, puoi usare il metodo `Stack`:

```go
facades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Metodi Catena

Goravel fornisce comodi metodi a catena, che rendono facile inserire informazioni più utili nel registro:

```go
facades.Log().User("John").Debug(message)
```

| Metodo       | Azione                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| Codice       | Imposta un codice o uno slug che descrive il registro.                                    |
| Suggerimento | Imposta un suggerimento per un debug più veloce.                                          |
| In           | Imposta la categoria di funzionalità o il dominio in cui è rilevante la voce di registro. |
| Proprietario | Utile per scopi di allerta.                                                               |
| Richiesta    | Fornisce un http.Request.                                                 |
| Risposta     | Fornisce un http.Response.                                                |
| Etichette    | Aggiungi più tag, descrivendo la funzione che restituisce un errore.                      |
| Utente       | Imposta l'utente associato alla voce di registro.                                         |
| Con          | Aggiungi coppie chiave-valore al contesto della voce di registro.                         |
| WithTrace    | Aggiungi informazioni sullo stack alla voce di registro.                                  |

## Crea un canale personalizzato

Se vuoi definire un canale completamente personalizzato, puoi specificare il tipo di driver `custom` nel file di configurazione `config/logging.go`
.
Quindi include un'opzione `via` per implementare una struttura `framework\contracts\log\Logger`:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Implementa Il Driver

Implementa l'interfaccia `framework\contracts\log\Logger`.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Handle pass channel config path here
  Handle(channel string) (Hook, error)
}
```

i file possono essere memorizzati nella cartella `app/extensions` (modificabile). Esempio:

```go
package extensions

import (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Handle pass channel config path qui
func (logger *Logger) Handle(channel string) (log. ook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Livelli livello di monitoraggio
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.WarningLevel,
    log. rrorLevel,
    log.FatalLevel,
    log. anicLevel,
  }
}

// Fire execute logic when trigger
func (h *Hook) Fire(entry log. ntry) error {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
