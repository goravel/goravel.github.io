# Cache

Goravel erbjuder en expanderbar cachemodul som kan användas med `facades.Cache()`. Goravel levereras med en `memory`
drivrutin, för andra drivrutiner, vänligen kontrollera motsvarande oberoende tilläggspaket:

| Förare | Länk                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Redis  | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Konfiguration

Gör alla anpassade konfigurationer i `config/cache.go`.

## Cache-användning

### Injektionskontext

```go
fasader.Cache().MedContext(ctx)
```

### Åtkomst till flera cache-butiker

Du kan komma åt olika cachebutiker via `Store`-metoden. Nyckeln som skickats till `Store`-metoden bör motsvara
en av butikerna som listas i konfigurationsarrayen "stores" i din cache-konfigurationsfil:

```go
värde := fasader.Cache().Store("redis").Get("foo")
```

### Hämtar objekt från cachen

```go
värde := fasader.Cache().Get("goravel", "default")
värde := fasader.Cache().GetBool("goravel", true)
värde := fasader.Cache().GetInt("goravel", 1)
värde := fasader.Cache().GetString("goravel", "default")
```

Du kan skicka en `function` som standardvärde. Om den angivna datan inte finns i cachen, kommer resultatet av `func`
returneras. Transitiv stängningsmetod gör att du kan få standardvärden från databasen eller andra externa
tjänster. Notera stängningsstrukturen `func() any`.

```go
värde := fasades.Cache().Get("goravel", func() any {
    return "default"
})
```

### Söker efter objektexistens

```go
Boll:= fasader.Cache().Has("goravel")
```

### Ökning / Minskning av värden

"Ökning" och "Decrement" -metoderna kan användas för att justera värdet på heltalsobjekt i cachen. Båda metoderna
accepterar ett valfritt andra argument som anger beloppet för att öka eller dekretera objektets värde:

```go
fasader.Cache().Increment("key")
fasader.Cache().Increment("key", belopp)
fasader.Cache().Decrement("key")
fasader.Cache().Decrement("key", belopp)
```

### Hämta och lagra

Ibland kanske du vill hämta data från cachen, och när den begärda cachen inte finns, programmet kan
lagra ett standardvärde för dig.

```go
värde, err := fasades.Cache().Kom ihåg ("goravel", 5*time.Second, func() (någon, fel) {
    returnera "goravel", nil
})
```

Om de data du vill inte finns i cachen, stängningen som skickats till `Remember`-metoden kommer att genomföras, och sedan
kommer resultatet att returneras och placeras i cachen.

Du kan använda metoden `RememberForever` för att hämta data från cachen eller lagra den permanent:

```go
värde, err := fasades.Cache().RememberForever("goravel", func() (någon, fel) {
    returnera "default", nil
})
```

### Hämta och ta bort

```go
värde := fasader.Cache().Pull("goravel", "standard")
```

### Lagra objekt i cachen

```go
err := fasader.Cache().Put("goravel", "värde", 5*tid)
```

Om utgångstiden för cachen är satt till `0`, kommer cachen att vara giltig för alltid:

```go
err := fasader.Cache().Put("goravel", "värde", 0)
```

### Lagra om den inte finns

Metoden `Add` lagrar data endast om den inte finns i cachen. Den returnerar `true` om lagringen är framgångsrik och `false` om
är det inte.

```go
Boll:= fasader.Cache().Add("goravel", "värde", 5 * gång.Sekund)
```

### Lagra föremål för evigt

Metoden `Forever` kan användas för att lagra data ihärdigt i cachen. Eftersom dessa data inte går ut, måste de
tas bort manuellt från cachen genom `Forget`-metoden:

```go
Boll:= fasader.Cache().Forever("goravel", "värde")
```

### Ta bort objekt från cachen

```go
bool := facades.Cache().Forget("goravel")
```

Du kan använda `Flush`-metoden för att rensa alla cacher:

```go
Bool := fasader.Cache().Flush()
```

## Atomiska Lås

### Hantera lås

Atomlås tillåter manipulering av distribuerade lås utan att oroa sig för rasförhållanden. Du kan skapa och
hantera lås med hjälp av `Lock`-metoden:

```go
lås := fasader.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Lock förvärvat i 10 sekunder...

    lock.Release()
}
```

`Get`-metoden accepterar också en stängning. När stängningen är utförd släpper Goravel automatiskt låset:

```go
facades.Cache().Lock("foo").Get(func () {
    // Lock förvärvades i 10 sekunder och släpptes automatiskt...
});
```

Om låset inte är tillgängligt just nu kan du instruera Goravel att vänta i ett angivet antal
sekunder. Om låset inte kan förvärvas inom den angivna tidsfristen kommer `false`:

```go
lås := fasader.Cache().Lock("foo", 10*time.Second)
// Lock förvärvat efter att ha väntat högst 5 sekunder...
om (lock.Block(5*time.Second)) {
    lock.Release()
}
```

Exemplet ovan kan förenklas genom att skicka en stängning till `Block`-metoden. När en stängning överförs till denna metod,
Goravel kommer att försöka skaffa låset för det angivna antalet sekunder och kommer automatiskt att släppa låset
när stängningen har utförts:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Lock som förvärvats efter att ha väntat högst 5 sekunder...
})
```

Om du vill släppa ett lås utan att respektera dess nuvarande ägare kan du använda `ForceRelease`-metoden:

```go
fasader.Cache().Lock("bearbetning").ForceRelease();
```

## Lägga till anpassade cache-drivrutiner

### Konfiguration

Om du vill definiera en helt anpassad drivrutin, kan du ange 'custom' drivrutinen i 'config/cache.go'
konfigurationsfilen.
Inkludera sedan ett `via`-alternativ för att implementera ett `framee/contracts/cache/Driver`-gränssnitt:

```go
//config/cache. o
"butiker": karta[string]gränssnitt{}{
    "minne": karta[string]any{
        "drivrutin": "minne",
    },
    "custom": karta[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Implementera anpassad förare

Implementera gränssnittet `framee/contracts/cache/Driver` kan filer lagras i mappen `app/extensions` (
modifierbar).

```go
// framey/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Add Driver an item in the cache if the key does not exist.
    Add(nyckelsträng, värde någon, t tid. uration) Bool
    Decrement(nyckelsträng, värde ... nt) (int, fel)
    // Forever Driver ett objekt i cachen på obestämd tid.
    Forever(key string, value any) bool
    // Glöm Ta bort ett objekt från cachen.
    Glöm (nyckelsträng) Bollen
    // Spola Ta bort alla objekt från cachen.
    Flush() bool
    // Hämta ett objekt från cache med nyckel.
    Get(nyckelsträng, def . .any) valfri
    GetBool(nyckelsträng, def ...bool) Bollen
    GetInt(nyckelsträng, def ... nt) int
    GetInt64(nyckelsträng, def ...int64) int64
    GetString(nyckelsträng, def ... tring) sträng
    // Har Kontrollera att ett objekt finns i cachen.
    Has(key string) bool
    Ökning(key string, value . .int) (int, fel)
    Lås(nyckelsträng, t ...tid. uration) Lås
    // Sätt Driver ett objekt i cachen för en viss tid.
    Putt(nyckelsträng, värde någon, t tid. uration) fel
    // Dra Hämta ett objekt från cachen och ta bort det.
    Pull(nyckelsträng, def ... ny)
    // Kom ihåg Skaffa ett objekt från cachen, eller kör den givna Stängningen och lagra resultatet.
    Kom ihåg (nyckelsträng, ttl-tid. uration, callback func() (någon, fel)) (någon, fel)
    // RememberForever Hämta ett objekt från cachen, eller exekvera den givna Stängningen och lagra resultatet för evigt.
    Kom ihågForever(nyckelsträng, callback func() (någon, fel)) (någon, fel)
    WithContext(ctx context.Context) Driver
}
```
