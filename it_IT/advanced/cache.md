# Cache

Goravel fornisce un modulo cache espandibile che può essere gestito utilizzando `facades.Cache()`. Goravel viene fornito con un driver `memory`
, per altri driver, si prega di controllare i pacchetti di estensione indipendenti corrispondenti:

| Driver | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Redis  | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Configurazione

Crea tutte le configurazioni personalizzate in `config/cache.go`.

## Utilizzo Cache

### Inietta Contesto

```go
facades.Cache().WithContext(ctx)
```

### Accesso A Più Negozi Cache

Puoi accedere a vari negozi di cache tramite il metodo `Store`. La chiave passata al metodo `Store` dovrebbe corrispondere a
uno dei negozi elencati nell'array di configurazione dei "negozi" nel file di configurazione della cache:

```go
valore := facades.Cache().Store("redis").Get("foo")
```

### Recupero Oggetti Dalla Cache

```go
value := facades.Cache().Get("goravel", "default")
value := facades.Cache().GetBool("goravel", true)
value := facades.Cache().GetInt("goravel", 1)
value := facades.Cache().GetString("goravel", "default")
```

Puoi passare un `func` come valore predefinito. Se i dati specificati non esistono nella cache, il risultato di `func` verrà restituito
. Il metodo di chiusura transitiva consente di ottenere valori predefiniti dal database o da altri servizi
esterni. Nota la struttura di chiusura `func() any`.

```go
value := facades.Cache().Get("goravel", func() any {
    return "default"
})
```

### Controllo Dell'Esistenza Dell'Oggetto

```go
bool := facades.Cache().Has("goravel")
```

### Incrementazione / Riduzione Dei Valori

I metodi `Increment` e `Decrement` possono essere utilizzati per regolare il valore degli elementi interi nella cache. Entrambi i metodi
accettano un secondo argomento facoltativo che indica l'importo per aumentare o diminuire il valore dell'elemento:

```go
facades.Cache().Increment("key")
facades.Cache().Increment("key", amount)
facades.Cache().Decrement("key")
facades.Cache().Decrement("key", amount)
```

### Recupera E Negozio

A volte potresti voler ottenere dati dalla cache, e quando la cache richiesta non esiste, il programma può
memorizzare un valore predefinito per te.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Second, func() (any, error) {
    return "goravel", nil
})
```

Se i dati che vuoi non esistono nella cache, la chiusura passata al metodo `Remember` verrà eseguita, e poi
il risultato sarà restituito e posizionato nella cache.

È possibile utilizzare il metodo `RememberForever` per recuperare i dati dalla cache o memorizzarli permanentemente:

```go
value, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Recupera E Elimina

```go
valore := facades.Cache().Pull("goravel", "default")
```

### Archiviazione Degli Elementi Nella Cache

```go
err := facades.Cache().Put("goravel", "value", 5*time.Second)
```

Se il tempo di scadenza della cache è impostato a `0`, la cache sarà valida per sempre:

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### Salva Se Non Presente

Il metodo `Add` memorizza i dati solo se non è nella cache. Restituisce `true` se l'archiviazione è riuscita e `false` se
non lo è.

```go
bool := facades.Cache().Add("goravel", "value", 5*time.Second)
```

### Archiviazione Oggetti Per Sempre

Il metodo `Forever` può essere utilizzato per memorizzare i dati in modo persistente nella cache. Poiché questi dati non scadranno, devono essere eliminati manualmente
dalla cache attraverso il metodo `Forget`:

```go
bool := facades.Cache().Forever("goravel", "value")
```

### Rimozione Elementi Dalla Cache

```go
bool := facades.Cache().Forget("goravel")
```

Puoi usare il metodo `Flush` per cancellare tutte le cache:

```go
bool := facades.Cache().Flush()
```

## Blocchi Atomici

### Gestione Dei Blocchi

Le serrature atomiche consentono la manipolazione di serrature distribuite senza preoccuparsi delle condizioni di gara. Puoi creare e gestire i blocchi
usando il metodo `Lock`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Lock acquisito per 10 secondi...

    lock.Release()
}
```

Il metodo `Get` accetta anche una chiusura. Dopo l'esecuzione della chiusura, Goravel rilascerà automaticamente il blocco:

```go
facades.Cache().Lock("foo").Get(func () {
    // Lock ha acquisito per 10 secondi e rilasciato automaticamente...
});
```

Se la serratura non è disponibile al momento in cui lo richiedi, puoi istruire Goravel ad aspettare un numero specificato di
secondi. Se il blocco non può essere acquistato entro il limite di tempo specificato, restituirà `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Lock acquisito dopo un massimo di 5 secondi...
if (lock.Block(5*time.Second)) {
    lock.Release()
}
```

L'esempio di cui sopra può essere semplificato passando una chiusura al metodo `Block`. Quando una chiusura viene passata a questo metodo,
Goravel tenterà di acquisire il blocco per il numero specificato di secondi e rilascerà automaticamente il blocco
una volta che la chiusura è stata eseguita:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Lock acquisito dopo un massimo di 5 secondi...
})
```

Se desideri rilasciare una serratura senza rispettare il suo attuale proprietario, puoi usare il metodo `ForceRelease`:

```go
facades.Cache().Lock("processing").ForceRelease();
```

## Aggiungere Driver Cache Personalizzati

### Configurazione

Se vuoi definire un driver completamente personalizzato, puoi specificare il tipo di driver `custom` nel file di configurazione `config/cache.go`
.
Quindi include un'opzione `via` per implementare un'interfaccia `framework/contracts/cache/Driver`:

```go
//config/cache. o
"stores": map[string]interface{}{
    "memory": map[string]any{
        "driver": "memory",
    },
    "custom": map[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Implementa Il Driver Personalizzato

Implementa l'interfaccia `framework/contracts/cache/Driver`, i file possono essere memorizzati nella cartella `app/extensions` (
modificabile).

```go
// framework/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Add Driver an item in the cache if the key does not exist.
    Aggiungi(stringa chiave, valore qualsiasi, t tempo. uration) bool
    Decrement(chiave stringa, valore ... nt) (int, errore)
    // Per sempre Driver un elemento nella cache a tempo indeterminato.
    Per sempre (chiave stringa, valore qualsiasi) bool
    // Dimentica Rimuovi un elemento dalla cache.
    Forget(key string) bool
    // Flush Rimuovi tutti gli elementi dalla cache.
    Flush() bool
    // Ottieni Recupera un elemento dalla cache per chiave.
    Get(stringa chiave, def . .any) qualsiasi
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... tring) stringa
    // Has Check esiste un elemento nella cache.
    Has(key string) bool
    Increment(key string, value . .int) (int, errore)
    Lock(key string, t ...time. uration) Blocca
    // Metti un elemento del driver nella cache per un dato tempo.
    Put(chiave stringa, valore qualsiasi, t tempo. uration) errore
    // Pull Recupera un elemento dalla cache ed eliminarlo.
    Pull(stringa chiave, def ... ny) qualsiasi
    // Ricorda Ottieni un oggetto dalla cache, o esegui la chiusura data e memorizza il risultato.
    Ricorda(chiave stringa, ttl tempo. uration, callback func() (any, error)) (any, error)
    // RememberForever Ricevi un elemento dalla cache, o eseguire la chiusura data e memorizzare il risultato per sempre.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
