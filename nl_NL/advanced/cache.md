# Cachegeheugen

Goravel biedt een uitbreidbare cache module die kan worden beheerd met `facades.Cache()`. Goravel komt met een `memory`
chauffeur, voor andere chauffeurs, controleer de bijbehorende onafhankelijke extensiepakketten:

| Chauffeur | Koppeling                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Redis     | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Configuratie

Maak alle aangepaste configuraties in `config/cache.go`.

## Cache gebruik

### Context van injectie

```go
facades.Cache().WithContext(ctx)
```

### Toegang tot meerdere cachewinkels

Je hebt toegang tot verschillende cache-opslagplaatsen via de `Store` methode. De sleutel die doorgegeven wordt aan de methode 'Opslaan' zou moeten overeenkomen met
één van de winkels in de "winkel" configuratie array in uw cache-configuratiebestand:

```go
waarde := facades.Cache().Store("redis").Get("foo")
```

### Items ophalen uit de cache

```go
value := facades.Cache().Get("goravel", "default")
waarde := facades.Cache().GetBool("goravel", true)
waarde := facades.Cache().GetInt("goravel", 1)
waarde := facades.Cache().GetString("goravel", "standaard")
```

Je kan een `func` als standaard waarde invoeren. If the specified data does not exist in the cache, the result of `func` will
be returned. Met de tijdelijke sluitingsmethode kunt u standaard waarden uit de database of andere externe
diensten verkrijgen. Noteer de sluitingsstructuur `func() elke `.

```go
waarde := facades.Cache().Get("goravel", func() elke {
    return "default"
})
```

### Controleren op Item Bestaat

```go
bool := facades.Cache().Has("goravel")
```

### Waarden verhogen / verkleinen

De `Increment` en `Decrement` methoden kunnen worden gebruikt om de waarde van gehele items in de cache aan te passen. Beide methoden
accepteren een optioneel tweede argument dat aangeeft met welk bedrag de waarde moet worden verhoogd of verlaagd:

```go
facades.Cache().Increment("sleutel")
facades.Cache().Increment("sleutel", amount)
facades.Cache().Decrement("sleutel")
facades.Cache().Decrement("sleutel", amount)
```

### Ophalen & opslaan

Soms kan je gegevens uit de cache ophalen en wanneer het opgevraagde cache-item niet bestaat. het programma kan
een standaardwaarde voor je opslaan.

```go
waarde, err := facades.Cache().Remember("goravel", 5*time.tweede func() (any, error) {
    return "goravel", nil
})
```

Als de gegevens die u wilt niet bestaan in de cache, zal de sluiting die is doorgegeven aan de `Remember` methode worden uitgevoerd, en dan
het resultaat zal worden geretourneerd en geplaatst in de cache.

Je kunt de `RememberForever` methode gebruiken om gegevens op te halen uit de cache of het permanent op te slaan:

```go
waarde, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Ophalen & Verwijderen

```go
waarde := facades.Cache().Pull("goravel", "standaard")
```

### Items opslaan in de cache

```go
err := facades.Cache().Put("goravel", "waarde", 5*time.Second)
```

Indien de verlooptijd van de cache is ingesteld op `0`, zal de cache voor altijd geldig zijn:

```go
err := facades.Cache().Put("goravel", "waarde", 0)
```

### Winkel indien niet aanwezig

De `Add` methode slaat alleen gegevens op als deze niet in de cache staan. Het retourneert `true` als opslag succesvol is en `false` als
dit niet is.

```go
bool := facades.Cache().Add("goravel", "waarde", 5*time.Second)
```

### Voorwerpen voor altijd opslaan

De `Forever` methode kan worden gebruikt om gegevens permanent op te slaan in de cache. Omdat deze gegevens niet zullen verlopen, moeten
handmatig uit de cache worden verwijderd via de `Forget` methode:

```go
bool := facades.Cache().Voorwaarts ("goravel", "waarde")
```

### Items uit de cache verwijderen

```go
bool := facades.Cache().Forget("goravel")
```

Je kunt de `Flush` methode gebruiken om alle caches te legen:

```go
bool := facades.Cache().Flush()
```

## Atomic sloten

### Vergrendelingen beheren

Atoomsloten laten manipulatie van verdeelde sloten toe zonder zich zorgen te maken over de rassenomstandigheden. Je kunt vergrendelingen maken en
beheren met de 'Vergrendeling' methode:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Lock verworven gedurende 10 seconden...

    lock.Release()
}
```

De `Get` methode accepteert ook een sluiting. Nadat de sluiting is uitgevoerd, zal Goravel de vergrendeling automatisch vrijgeven:

```go
facades.Cache().Lock("foo").Get(func () {
    // Lock verworven voor 10 seconden en automatisch vrijgegeven...
});
```

Als het slot niet beschikbaar is op dit moment dat je het aanvraagt, kan je Goravel instrueren om te wachten tot een bepaald aantal
seconden. Als de vergrendeling niet binnen de opgegeven tijdslimiet kan worden verworven, geeft dit `false` terug:

```go
lock := facades.Cache().Lock("voedsel", 10*time.Second)
// Vergrendeling verkregen na het wachten van maximaal 5 seconden...
als (lock.Block(5*time.Second)) {
    lock.Release()
}
```

Het bovenstaande voorbeeld kan worden vereenvoudigd door een sluiting door te geven aan de `Block` methode. Wanneer een einde wordt gemaakt aan deze methode,
Goravel zal proberen de vergrendeling voor het opgegeven aantal seconden te verkrijgen en zal automatisch de vergrendeling
vrijgeven zodra de sluiting is uitgevoerd:

```go
facades.Cache().Lock("voet", 10*time.Second).Block(5*time.tweede func () {
    // Lock verworven nadat je een maximum van 5 seconden wachtt...
})
```

Als je een slot wilt vrijgeven zonder de huidige eigenaar te respecteren, kun je de `ForceRelease` methode gebruiken:

```go
facades.Cache().Lock("processing").ForceRelease();
```

## Aangepaste Cache Drivers toevoegen

### Configuratie

Als u een volledig aangepaste driver wilt definiëren, kunt u het `custom` stuurprogramma type opgeven in het `config/cache.go`
configuratiebestand.
Voeg vervolgens een 'via' optie toe om een 'framework/contracts/Driver' interface te implementeren:

```go
//config/cache. o
"stores": map[string]interface{}{
    "memory": map[string]any{
        "driver": "geheugen",
    },
    "custom": map[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Implementeer Custom Driver

Implementeer de `framework/contracts/Driver` interface, bestanden kunnen worden opgeslagen in de `app/extensions` map (
modifiable).

```go
// framework/contracts/Cache/Driver
package cache

import "tijd"

type Driver interface {
    // Driver toevoegen een item in de cache als de sleutel niet bestaat.
    Add(key string, waarde any, t time. uration) Bool
    Decrement(sleutelstring, waarde ... nt) (int, error)
    // Eeuwige Driver een item in de cache voor onbepaalde tijd.
    Voorheen (sleutelstring, waarde) bool
    // Verwijder een item uit de cache.
    Vergeten (sleutel string) bool
    // Verwijder alle items uit de cache.
    Flush() bool
    // Haal een item terug van de cache met een sleutel.
    Get(sleuteltekenreeks, def . .any) elk
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... tring) string
    // Heeft Controle een item in de cache.
    Has(sleutelstring) bool
    Increment(sleutelstring, waarde . .int) (int, error)
    Vergrendeling (sleutelreeks, t ...tijd. uration) Lock
    // Put Driver een item in de cache voor een bepaalde tijd.
    Poet(sleutelreeks, waarde maar, tijd t. uratiefout
    // Pull Krijg een item uit de cache en verwijder het.
    Pull(sleutelstring, def ... niet) alle
    // Onthoud een item uit de cache, of voer de gegeven Sluiting uit en sla het resultaat op.
    Onthouden (sleutelreeks, ttl tijd. uration, callback func() (any, error)) (any, error)
    // RememberForever haal een item uit de cache, of voer de gegeven Sluiting uit en sla het resultaat voor altijd op.
    Heronthoud Voorheen (sleutelstring, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
