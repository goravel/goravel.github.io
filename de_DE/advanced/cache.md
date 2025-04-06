# Cache

Goravel stellt ein erweiterbares Cache-Modul zur Verfügung, das mit `facades.Cache()` betrieben werden kann. Goravel kommt mit einem `memory`
-Treiber, für andere Treiber, bitte überprüfen Sie die entsprechenden unabhängigen Erweiterungspakete:

| Fahrer | Link                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Redis  | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Konfiguration

Erstelle alle benutzerdefinierten Konfigurationen in `config/cache.go`.

## Cache-Nutzung

### Kontext einfügen

```go
facades.Cache().WithContext(ctx)
```

### Zugriff auf mehrere Cache-Stores

Du kannst auf verschiedene Cache-Stores über die 'Store'-Methode zugreifen. Der Schlüssel, der an die `Store`-Methode übergeben wurde, sollte mit
einem der Shop-Konfigurations-Arrays in deiner Cache-Konfigurationsdatei übereinstimmen:

```go
value := facades.Cache().Store("redis").Get("foo")
```

### Abrufen von Elementen aus dem Cache

```go
value := facades.Cache().Get("goravel", "default")
value := facades.Cache().GetBool("goravel", true)
value := facades.Cache().GetInt("goravel", 1)
value := facades.Cache().GetString("goravel", "default")
```

Du kannst eine `func` als Standardwert übergeben. Wenn die angegebenen Daten im Cache nicht vorhanden sind, wird das Ergebnis von `func`
zurückgegeben. Die transitive Schließungsmethode erlaubt es Ihnen, Standardwerte aus der Datenbank oder anderen externen
-Diensten zu erhalten. Beachten Sie die Schließungsstruktur `func() any`.

```go
value := facades.Cache().Get("goravel", func() any {
    return "default"
})
```

### Prüfe auf Vorhandene Artikel

```go
bool := facades.Cache().Has("goravel")
```

### Inkrementations- / Dekrementationswerte

Die `Increment` und `Decrement` Methoden können verwendet werden, um den Wert von Integer-Elementen im Cache anzupassen. Beide Methoden
akzeptieren ein optionales zweites Argument, das den Wert angibt, um den der Artikel erhöht oder dekreziert werden soll:

```go
facades.Cache().Increment("key")
facades.Cache().Increment("key", amount)
facades.Cache().Decrement("key")
facades.Cache().Decrement("key", amount)
```

### Abrufen & speichern

Manchmal möchtest du Daten aus dem Cache holen und wenn das angeforderte Cache-Element nicht existiert, das Programm kann
einen Standardwert für Sie speichern.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Zweitens, func() (any, error) {
    return "goravel", nil
})
```

Wenn die gewünschten Daten nicht im Cache vorhanden sind, wird die Schließung an die `Remember`-Methode übergeben, und dann
wird das Ergebnis zurückgegeben und im Cache platziert.

Du kannst die `RememberForever` Methode verwenden, um Daten aus dem Cache zu holen oder dauerhaft speichern:

```go
value, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Abrufen & Löschen

```go
value := facades.Cache().Pull("goravel", "default")
```

### Elemente im Cache speichern

```go
err := facades.Cache().Put("goravel", "value", 5*time.second)
```

Wenn die Ablaufzeit des Caches auf `0` gesetzt ist, wird der Cache für immer gültig sein:

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### Shop, wenn nicht vorhanden

Die `Add` Methode speichert Daten nur, wenn sie nicht im Cache liegen. Es gibt `true` zurück, wenn der Speicher erfolgreich ist und `false` wenn
es nicht ist.

```go
bool := facades.Cache().Add("goravel", "value", 5*time.second)
```

### Elemente für immer speichern

Die `Forever` Methode kann verwendet werden, um Daten dauerhaft im Cache zu speichern. Da diese Daten nicht ablaufen werden, müssen sie
manuell aus dem Cache durch die `Forget`-Methode gelöscht werden:

```go
bool := facades.Cache().Forever("goravel", "Wert")
```

### Entferne Elemente aus dem Cache

```go
bool := facades.Cache().Forget("goravel")
```

Du kannst die `Flush` Methode benutzen, um alle Caches zu löschen:

```go
bool := facades.Cache().Flush()
```

## Atomische Sperren

### Sperren verwalten

Atomische Schlösser ermöglichen die Manipulation verteilter Schlösser ohne sich um die Bedingungen der Rasse Sorgen zu machen. Du kannst Sperren erstellen und
verwalten mit der `Lock` Methode:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // übernommene 10 Sekunden sperren...

    lock.Release()
}
```

Die `Get`-Methode akzeptiert auch eine Schließung. Nachdem die Schließung ausgeführt wurde, wird Goravel die Sperre automatisch freigeben:

```go
facades.Cache().Lock("foo").Get(func () {
    // Wird für 10 Sekunden gesperrt und automatisch freigegeben...
});
```

Wenn das Schloss momentan nicht verfügbar ist, können Sie Goravel anweisen, für eine bestimmte Anzahl von
Sekunden zu warten. Wenn die Sperre innerhalb der angegebenen Frist nicht erreicht werden kann, wird `false` zurückgegeben:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Nach Warten auf maximal 5 Sekunden erworbene Sperren...
if (lock.Block(5*time.Second)) {
    lock.Release()
}
```

Das obige Beispiel kann vereinfacht werden, indem eine Schließung an die `Block`-Methode übergeben wird. When a closure is passed to this method,
Goravel will attempt to acquire the lock for the specified number of seconds and will automatically release the lock
once the closure has been executed:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Zweitens, func () {
    // Nach Warten auf maximal 5 Sekunden erworbene Sperren...
})
```

Wenn du eine Sperre freigeben möchtest, ohne den aktuellen Besitzer zu respektieren, kannst du die `ForceRelease` Methode verwenden:

```go
facades.Cache().Lock("processing").ForceRelease();
```

## Eigene Cache-Treiber hinzufügen

### Konfiguration

If you want to define a completely custom driver, you can specify the `custom` driver type in the `config/cache.go`
configuration file.
Füge dann eine `via` Option hinzu, um eine `Framework/contracts/cache/driver` Schnittstelle zu implementieren:

```go
//config/cache. o
"stores": Karte[string]Schnittstelle{}{
    "memory": Karte[string]any{
        "driver": "memory",
    },
    "custom": map[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Benutzerdefinierter Treiber implementieren

Implementierung der `Framework/contracts/cache/Driver` Schnittstelle, Dateien können im `app/extensions` Ordner gespeichert werden (
veränderbar).

```go
// Framework/contracts/cache/driver
package cache

import "time"

type Driver interface {
    // Add Driver an item in the cache if the key is not existed.
    Hinzufügen (Schlüsselzeichenkette, Wert einer, t Zeit. uration) bool
    Dekrement(Schlüsselzeichen, Wert ... nt) (int, error)
    // Forever Driver ein Element im Cache auf unbestimmte Zeit.
    Forever(Key String, value any) bool
    // Vergessen Sie ein Element aus dem Cache zu entfernen.
    Bool
    // Entferne alle Elemente aus dem Cache.
    Flush() bool
    // Abrufen eines Elements aus dem Cache per Schlüssel.
    Get(Schlüsselzeichen, def . .any) jede
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... tring) string
    // Hat überprüft, dass ein Element im Cache vorhanden ist.
    Has(key string) bool
    Increment(key string, value . .int) (int, error)
    Lock(key string, t ...time). uration) Sperre
    // Treiber für eine bestimmte Zeit in den Cache legen.
    Put(Schlüsselzeichenkette, Wert einer, t Zeit. uration) Fehler
    // Ziehe ein Element aus dem Cache und lösche es.
    Pull(Schlüsselzeichen, def ... nein) jedes
    // Denken Sie daran, ein Element aus dem Cache zu holen oder führen Sie die angegebene Closure aus und speichern Sie das Ergebnis.
    Denken (Schlüsselzeichen, ttl Zeit). uration, callback func() (any, error)) (any, error)
    // RememberForever Get a item from the cache, oder führen Sie die angegebene Closure aus und speichern Sie das Ergebnis für immer.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Treiber
}
```
