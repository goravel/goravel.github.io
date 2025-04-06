# Geocutie

Goravel oferă un modul de geocutie care poate fi expandat şi care poate fi operat folosind `facades.Cache()`. Goravel vine cu un `memory`
driver, pentru alţi şoferi, te rugăm să verifici pachetele independente de extensie corespunzătoare:

| Șofer | Link-ul                                                                                              |
| ----- | ---------------------------------------------------------------------------------------------------- |
| Redis | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Configurare

Faceți toate configurațiile personalizate în `config/cache.go`.

## Utilizare cache

### Injectare context

```go
fațades.Cache().WithContext(ctx)
```

### Accesarea mai multor magazine cache

Poți accesa diverse magazine de cache prin metoda `Store`. Cheia pasată la metoda `Store` ar trebui să corespundă cu
unul dintre magazinele listate în array-ul de configurare "magazine" din fișierul de configurare al geocutiei:

```go
valoare := facades.Cache().Store("redis").Get("foo")
```

### Preluarea obiectelor din Cache

```go
valoare := facades.Cache().Get("goravel", "default")
valoare := facades.Cache().GetBool("goravel", true)
:= facades.Cache().GetInt("goravel", 1) Valoarea
:= faades.Cache().GetString("goravel", "implicit")
```

Aveţi posibilitatea să pasaţi "funcţia" ca valoare implicită. Dacă datele specificate nu există în geocutie, rezultatul `func` va fi returnat
Metoda de închidere tranzitorie vă permite să obțineți valorile implicite din baza de date sau alte servicii externe
Țineți cont de structura de închidere `func() oricând`.

```go
valoare := facades.Cache().Get("goravel", func() orice {
    return "default"
})
```

### Verificarea elementului există

```go
bool := faades.Cache().Has("goravel")
```

### Creștere / Valori scăzute

Metodele `Increment` şi `Decrement` pot fi folosite pentru a ajusta valoarea elementelor întregi din geocutie. Ambele metode
acceptă un al doilea argument opțional care indică suma cu care să incrementeze sau să decreteze valoarea elementului:

```go
facades.Cache().Increment("key")
facades.Cache().Increment("key", amount)
faades.Cache().Decrement("key")
faades.Cache().Decrement("key", amount)
```

### Recuperează & Magazin

Sometimes you may want to get data from the cache, and when the requested cache item does not exist, the program can
store a default value for you.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Secundă, funcție () (eroare) {
    return "goravel", nil
})
```

Dacă datele pe care le doriţi nu există în geocutie, închiderea transmisă la metoda `Remember` va fi executată, şi apoi
rezultatul va fi returnat şi plasat în geocutie.

Poți folosi metoda `RememberForever` pentru a prelua date din geocutie sau pentru a le stoca permanent:

```go
value, err := facades.Cache().RememberForever("goravel", func() (orice eroare) {
    return "default", nil
})
```

### Recuperează & Șterge

```go
valoare := facades.Cache().Pull("goravel", "implicit")
```

### Stocarea articolelor în Cache

```go
err := facades.Cache().Put("goravel", "value", 5*time.Secd)
```

Dacă ora de expirare a geocutiei este setată la `0`, cache-ul va fi valabil pentru totdeauna:

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### Stochează dacă nu este prezent

Metoda `Add` stochează datele doar dacă nu sunt în geocutie. Returnează `true` dacă stocarea are succes și `false` dacă
nu este.

```go
bool := facades.Cache().Add("goravel", "value", 5*time.Secundă)
```

### Stocarea articolelor pentru totdeauna

Metoda `Forever` poate fi folosită pentru a stoca date în mod constant în geocutie. Because these data will not expire, they must
be manually deleted from the cache through the `Forget` method:

```go
bool := facades.Cache().Forever("goravel", "value")
```

### Eliminarea articolelor din Cache

```go
bool := facades.Cache().Forget("goravel")
```

Poți folosi metoda `Flush` pentru a șterge toate geocutiile:

```go
bool := facades.Cache().Flush()
```

## Blocări Atomice

### Gestionare blocaje

Blocajele atomice permit manipularea blocajelor distribuite fără să se îngrijoreze din cauza condițiilor de rasă. Puteți crea și
gestiona blocajele folosind metoda `Lock`:

```go
lock := facades.Cache().Lock("foo", 10*time.secondd)

dacă (lock.Get()) {
    // Blocare dobândită timp de 10 secunde...

    lock.Release()

```

Metoda `Get` acceptă, de asemenea, o închidere. După ce închiderea este executată, Goravel va elibera automat blocajul:

```go
facades.Cache().Lock("foo").Get(func () {
    // Blocare dobândită timp de 10 secunde și lansată automat...
});
```

Dacă blocarea nu este disponibilă în momentul în care o solicitați, puteți instrui Goravel să aștepte un anumit număr de
secunde. Dacă blocarea nu poate fi obținută în limita de timp specificată, veți returna `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Secundă)
// Blocare dobândită după așteptarea unui maxim de 5 secunde...
dacă (lock.Block(5*time.Second)) {
    lock.Release()
}
```

Exemplul de mai sus poate fi simplificat prin trecerea unei închideri la metoda `Block`. Când se trece o închidere la această metodă,
Goravel va încerca să obțină blocarea pentru numărul specificat de secunde și va elibera automat blocarea
odată ce închiderea a fost executată:

```go
fațades.Cache().Lock("foo", 10*time.Second).Block(5*time.Secundă, func () {
    // Blocare dobândită după așteptarea a maximum 5 secunde...
})
```

Dacă doriţi să eliberaţi un blocaj fără a-i respecta proprietarul curent, puteţi utiliza metoda `ForceRelease`:

```go
fațads.Cache().Lock("processing").ForceLansse();
```

## Adăugare drivere personalizate pentru cache

### Configurare

Dacă doriți să definiți un șofer complet personalizat, puteți specifica tipul de șofer `custom` în fișierul de configurare `config/cache.go`Apoi include o opţiune `via` pentru a implementa o interfaţă `framework/contracts/cache/Driver`:

```go
//config/cache. o
"stores": harta[string]interface{}{
    "memorie": harta[string]orice {
        "driver": "memorie",
    },
    "custom": harta[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Implementează șofer personalizat

Implementați interfața `framework/contracts/cache/Driver`, fișierele pot fi stocate în folderul `app/extensions` (
modificabile).

```go
// framework/contracts/cache/Driver
pachet de cache

import "time"

tip interfață Driver {
    // Adaugă un șofer în cache dacă cheia nu există.
    Suplimentar (sir cheie, valoare inexistent, t time. uraţie) bool
    Decrement (şir cheie, valoare... nt) (int, eroare)
    // Șofer pentru totdeauna un obiect în geocutie pe o perioadă nedeterminată.
    Forever(key string, value any) bool
    // Uită eliminarea unui obiect din geocutie.
    Uitaţi bool
    // Fluxuri Eliminaţi toate obiectele din geocutie.
    Flush() bool
    // Recuperează un obiect din cache cu cheie.
    Get(key string, def . .any) orice
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(șir cheie, def ...int64) int64
    GetString(șir cheie, def ... șir) șirul
    // Verifică că există un element în geocutie.
    Has(key string) bool
    Increment(key string, valoare . .int) (int, eroare)
    Lock(şir cheie, t ...time. uration) Blochează
    // Pune un obiect în geocutie pentru o anumită perioadă de timp.
    Put(sir cheie, valoare inexistent, ora t. uration) eroare
    // Recuperează un obiect din cache și șterge-l.
    Pull(şir cheie, def ... ny) orice
    // Amintiţi-vă să obţineţi un obiect din geocutia sau să executaţi închiderea dată şi să stocaţi rezultatul.
    Amintește-ți (șirul cheie, tonul de timp. uraţie, funcţie de apel invers () (any, eroare)) (eroare)
    // Rememberver obţine pentru totdeauna un obiect din cache, sau execută închiderea dată și stochează rezultatul pentru totdeauna.
    RememberForever(cheie de caractere, funcție de apel invers () (oricare, eroare)) (oricare, eroare)
    WithContext(ctx context.Context) Driver
}
```
