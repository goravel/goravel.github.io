# Fabbriche

Durante il test della tua applicazione o la semina del tuo database, potrebbe essere necessario inserire prima alcuni record nel tuo database
. Invece di inserire manualmente i valori per ogni colonna, Goravel ti permette di definire un insieme di attributi
predefiniti per ciascuno dei tuoi modelli creando fabbriche di modelli.

To see an example of how to write a factory, you can check out the `user_factory.go` file located in your application's
`database/factories` directory.

```go
package factories

type UserFactory struct {
}

// Definizione Definisci lo stato predefinito della modalità.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

Come puoi vedere, nella loro forma più basilare, le fabbriche sono strutture che hanno un metodo `Definizione`. Il metodo restituisce il set predefinito
di valori di attributi che dovrebbero essere utilizzati quando si crea un modello con la fabbrica. Per generare un intervallo di dati casuali
, puoi fare affidamento su [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Generazione Fabbriche

Per creare una fabbrica, esegui il comando `make:factory` Artisan:

```
go run . artigianale make:fabbrica PostFactory
```

La nuova fabbrica `struct` verrà inserita nella cartella `database/factories`.

### Model & Factory Discovery Conventions

Dopo aver definito una fabbrica, è possibile utilizzare il metodo `Factory()` nel modello per associare la fabbrica al modello:

```go
package models

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/factories"
)

type User struct {
  orm. odel
  Nome stringa
  Stringa Avatar
  orm. oftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Creazione Di Modelli Utilizzando Fabbriche

### Modelli Istanzianti

Possiamo usare il metodo `Make` per creare modelli senza persistenti nel database:

```go
var user models.User
err := facades.Orm().Factory().Make(&user)
```

Puoi creare una collezione di molti modelli usando il metodo `Count`:

```go
var users []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Se vuoi sovrascrivere alcuni dei valori predefiniti dei tuoi modelli, puoi passare `map[string]any` al metodo `Make`
. Solo gli attributi specificati saranno sostituiti mentre il resto degli attributi rimane impostato ai loro valori predefiniti
come specificato dalla fabbrica:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Modelli Permanenti

Il metodo `Create` crea e salva le istanze del modello nel database usando il metodo `Save` di Orm.

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Puoi sovrascrivere gli attributi del modello predefinito della fabbrica passando `map[string]qualsiasi` degli attributi al metodo `Create`
:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Ignora Evento Modello

Ci può essere [model event](../orm/quickstart#events) definito sul modello, puoi ignorare questi eventi con il metodo
`CreateQuietly`:

```go
var user models.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
