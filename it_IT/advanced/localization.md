# Localizzazione

Le caratteristiche di localizzazione di Goravel forniscono un modo conveniente per recuperare le stringhe in varie lingue, rendendo facile
supportare più lingue nella tua applicazione. Le stringhe di lingua sono memorizzate in file nella directory `lang`, e
Goravel supporta due modi per organizzare i file di lingua:

Ogni lingua ha il proprio file:

```
/lang
  en.json
  cn.json
```

Oppure, quando ci sono troppe traduzioni, possono essere categorizzate:

```
/lang
  /en
    user.json
  /cn
    user.json
```

## Configurare la localizzazione

La lingua predefinita dell'applicazione è memorizzata nell'opzione di configurazione `locale` nel file di configurazione `config/app.go`
. Puoi modificare questo valore come necessario per soddisfare i requisiti della tua applicazione.

Puoi anche usare il metodo `SetLocale` fornito dall'App Facade per modificare la lingua predefinita per una singola richiesta `HTTP`
al momento dell'esecuzione:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

È possibile configurare una "cartella di ritorno" che verrà utilizzata quando la lingua corrente non contiene la stringa di traduzione
data. Come la lingua predefinita, anche la lingua di ripiego è configurata nel file di configurazione `config/app.go`.

```
"fallback_locale": "en",
```

### Determinazione della localizzazione attuale

Puoi usare i metodi `CurrentLocale` e `IsLocale` per determinare l'attuale `locale` o controllare se il `locale` è un valore dato
.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "en") {}
```

### Definire Stringhe Di Traduzione

Nei file di lingua, è possibile definire strutture a livello singolo o multi-livello:

```
// lang/en.json
{
  "name": "È il tuo nome",
  "required": {
    "user_id": "UserID is required"
  }
}
```

### Recupero Stringhe Di Traduzione

Puoi usare il metodo `facades.Lang(ctx).Get()` per recuperare le stringhe di traduzione dai file di lingua. Se il file della lingua
contiene più livelli, puoi usare `. per collegarli, e se il file di lingua è in più livelli di
cartelle, puoi usare `/\` per collegarle.

Per esempio:

```
// lang/en. son
{
  "name": "È il tuo nome",
  "required": {
    "user_id": "UserID è richiesto"
  }
}

facciate. ang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user. son
{
  "name": "È il tuo nome",
  "required": {
    "user_id": "UserID is required"
  }
}

facciate. ang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Sostituire i parametri nelle stringhe di traduzione

È possibile definire segnaposto nelle stringhe di traduzione. Tutti i segnaposto hanno il prefisso `:`. Ad esempio, puoi usare un segnaposto
per definire un messaggio di benvenuto:

```
{
  "welcome": "Benvenuto, :name"
}
```

Per sostituire i segnaposti quando si recupera una stringa di traduzione, è possibile passare un'opzione di traduzione con la mappa di sostituzione
come secondo parametro alle `facciate. metodo ang(ctx).Get()`:

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Replace: map[string]string{
    "name": "Goravel",
  },
})
```

#### Plurizzazione

La pluralizzazione è un problema complesso perché lingue diverse hanno diverse regole di pluralizzazione. Tuttavia, Goravel può
aiutarti a tradurre stringhe in base alle regole di pluralizzazione che definisci. Utilizzando il carattere `<unk> `, puoi distinguere
tra le forme singolari e plurali di una stringa:

```
{
  "mele": "C'è una mela<unk> Ci sono molte mele"
}
```

È anche possibile creare regole di pluralizzazione più complesse specificando le stringhe di traduzione per più intervalli di valori:

```
{
  "apples": "{0} Non ci sono nessuno<unk> [1,19] Ci sono qualcuno<unk> [20,*] Ci sono molti"
}
```

Dopo aver definito una stringa di traduzione con opzioni di pluralizzazione, è possibile utilizzare il metodo `facades.Lang(ctx).Choice()` per
recuperare la riga per un dato `count`. In questo esempio, perché il conteggio è maggiore di 1, viene restituita la forma plurale della stringa di traduzione
:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

È anche possibile definire gli attributi segnaposto nelle stringhe di pluralizzazione. Passando un array come terzo parametro al metodo
`facades.Lang(ctx).Choice()`, è possibile sostituire questi segnaposti:

```
"minutes_ago": "{1} :value minute ago<unk> [2,*] :value minutes ago",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Replace: map[string]string{
    "value": "5",
  },
})
```
