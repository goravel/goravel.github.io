# Contenitore Di Servizio

Il contenitore di servizio Goravel è un potente strumento per gestire le dipendenze di classe e eseguire l'iniezione di dipendenza.
contiene tutti i moduli di Goravel, e consente di vincolare i propri servizi al contenitore e risolverli quando necessario.
Il contenitore di servizio fornisce un potente supporto per pacchetti di terze parti intorno a Goravel.

## Rilegatura

### Associazioni Semplici

Quasi tutti i tuoi attacchi al contenitore del servizio saranno registrati all'interno di [fornitori di servizi](./providers).
All'interno di un provider di servizi, hai sempre accesso al contenitore tramite il parametro `app`, quindi registra un binding
utilizzando il metodo `Bind`, passando la `key` che vogliamo registrare insieme a una chiusura che restituisce un'istanza della classe
:

```go
pacchetto route

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(app foundation. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Come accennato, in genere interagirà con il contenitore all'interno dei fornitori di servizi; tuttavia, se desideri che
interagisca con il contenitore al di fuori di un fornitore di servizi, puoi farlo tramite la facciata `App`:

```go
facades.App().Bind("key", func(app foundation.Application) (qualsiasi, errore) {
    ...
})
```

### Associare Un Singleton

Il metodo `Singleton` lega una classe o un'interfaccia nel contenitore che dovrebbe essere risolta solo una volta. Una volta risolta un'associazione di singleton
, la stessa istanza dell'oggetto verrà restituita alle successive chiamate nel contenitore:

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Istanze Leganti

Puoi anche associare un'istanza di oggetto esistente nel contenitore usando il metodo `Istance`. L'istanza data sarà
sempre restituito sulle chiamate successive nel contenitore:

```go
app.Instance(key, instance)
```

### Legare Con Il Parametro

Se hai bisogno di alcuni parametri aggiuntivi per costruire il provider di servizi, puoi usare il metodo `BindWith` per passare i parametri
alla chiusura:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Risoluzione

### Il Metodo `Make`

Puoi usare il metodo `Make` per risolvere un'istanza di classe dal contenitore. Il metodo `Make` accetta la `key` che
desideri risolvere:

```go
instance err := app.Make(key)
```

Se sei fuori da un provider di servizi in una posizione del tuo codice che non ha accesso alla variabile `app`, tu
puoi usare la facciata `App` per risolvere un'istanza di classe dal contenitore:

```go
esempio, err := facades.App().Make(key)
```

### Il Metodo `MakeWith`

Se alcune delle dipendenze della tua classe non sono risolvibili tramite il contenitore, puoi iniettarli trasmettendoli come un array associativo
nel metodo `MakeWith`, corrispondente al metodo di associazione `BindWith`:

```go
instance err := app.MakeWith(key, map[string]any{"id": 1})
```

### Altri Metodi

Il framework fornisce alcuni metodi convenienti per risolvere rapidamente varie facciate: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
