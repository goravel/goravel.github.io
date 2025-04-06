# Sessione

La sessione consente di memorizzare le informazioni utente su più richieste, fornendo un'esperienza stateful all'interno del protocollo HTTP
intrinsecamente senza stato. Queste informazioni utente vengono memorizzate in modo persistente sul lato server. Goravel offre un'interfaccia
unificata per interagire con vari driver di archiviazione persistenti.

## Configurazione

Il file di configurazione `session` si trova in `config/session.go`. Il driver predefinito è `file`, che memorizza le sessioni
nella directory `storage/framework/sessions`. Goravel ti permette di creare un driver `session` personalizzato implementando l'interfaccia `contracts/session/driver`
.

### Registra Middleware

Per impostazione predefinita, Goravel non avvia automaticamente una sessione. Tuttavia, fornisce middleware per avviare una sessione. È possibile registrare
il middleware della sessione nel `app/http/kernel. o` file per applicarlo a tutti i percorsi, o puoi aggiungerlo a
percorsi specifici:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/framework/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Interazione Con La Sessione

### Recupero Dati

Puoi usare il metodo `Get` per recuperare i dati dalla sessione. Se il valore non esiste, `nil` verrà restituito.

```go
valore := ctx.Request().Session().Get("key")
```

Puoi anche passare un valore predefinito come secondo argomento al metodo `Get`. Questo valore verrà restituito se la chiave
specificata non esiste nella sessione:

```go
valore := ctx.Request().Session().Get("key", "default")
```

### Recupero Tutti I Dati

Se si desidera recuperare tutti i dati dalla sessione, è possibile utilizzare il metodo `All`:

```go
data := ctx.Request().Session().All()
```

### Recupero di un sottoinsieme di dati

Se si desidera recuperare un sottoinsieme dei dati della sessione, è possibile utilizzare il metodo `Only`:

```go
data := ctx.Request().Session().Only([]string{"username", "email"})
```

### Determinare Se Un Oggetto Esiste Nella Sessione

Per determinare se un elemento è presente nella sessione, puoi usare il metodo `Has`. Il metodo `Has` restituisce `true` se l'elemento
è presente e non è `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Per determinare se un elemento è presente e anche se è `nil`, puoi usare il metodo `Exists`:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Per determinare se un elemento non è presente nella sessione, puoi usare il metodo `Missing`:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Archiviazione Dati

Puoi usare il metodo `Put` per memorizzare i dati nella sessione:

```go
ctx.Request().Session().Put("key", "value")
```

### Recupero Dei Dati E Eliminazione

Se si desidera recuperare un elemento dalla sessione e quindi eliminarlo, è possibile utilizzare il metodo `Pull`:

```go
valore := ctx.Request().Session().Pull("key")
```

### Eliminazione Dati

Il metodo `Forget` può essere utilizzato per rimuovere un pezzo di dati dalla sessione. Se si desidera rimuovere tutti i dati dalla sessione
, è possibile utilizzare il metodo `Flush`:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### Rigenerare L'Id Della Sessione

Rigenerare l'ID di sessione viene spesso fatto al fine di impedire agli utenti dannosi di sfruttare un attacco di fissaggio di sessione
sulla tua applicazione. Puoi rigenerare l'ID della sessione usando il metodo `Rigenerate`:

```go
ctx.Request().Session().Regenerate()
```

Se si desidera rigenerare l'ID della sessione e dimenticare tutti i dati che erano nella sessione, è possibile utilizzare il metodo `Invalidate`
:

```go
ctx.Request().Session().Invalidate()
```

Poi, è necessario salvare la nuova sessione nel cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Name: ctx.Request().Session().GetName(),
  Value: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Path: facades.Config().GetString("session. ath"),
  Dominio: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Dati Flash

I dati Flash sono dati di sessione che saranno disponibili solo durante la successiva richiesta HTTP, e quindi verranno eliminati.
I dati Flash sono utili per memorizzare messaggi temporanei come messaggi di stato. Puoi usare il metodo `Flash` per memorizzare i dati flash
nella sessione:

```go
ctx.Request().Session().Flash("status", "Task was successful!")
```

Se si desidera mantenere i dati flash intorno per una richiesta aggiuntiva, è possibile utilizzare il metodo `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Se si desidera mantenere dati flash specifici in giro per una richiesta aggiuntiva, è possibile utilizzare il metodo `Keep`:

```go
ctx.Request().Session().Keep("status", "username")
```

Se si desidera mantenere dati specifici intorno per un uso immediato, è possibile utilizzare il metodo `Now`:

```go
ctx.Request().Session().Now("status", "Task was successful!")
```

## Interazione Con Gestione Sessione

### Costruire Una Sessione Personalizzata

Usa la facciata `Session` per costruire una sessione personalizzata. La facciata `Session` fornisce il metodo `BuildSession`, che richiede
un'istanza del driver e un ID di sessione opzionale se si desidera specificare un ID di sessione personalizzato:

```go
import "github.com/goravel/framework/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Aggiungi Driver Di Sessione Personalizzati

#### Implementazione Del Driver

Per implementare un driver di sessione personalizzato, il driver deve implementare l'interfaccia `contracts/session/driver`.

```go
// Il driver è l'interfaccia per i gestori di sessione.
type Driver interface {
  // Chiudi chiude il gestore della sessione.
  Close() error
  // Destroy destroys the session with the given ID.
  Errore Destroy(id string)
  // Gc esegue la raccolta immondizia sul gestore della sessione con la durata massima indicata.
  Errore Gc(maxLifetime int)
  // Apri apre una sessione con il percorso e il nome indicati.
  Errore di apertura (stringa percorso, stringa di nome)
  // Leggi legge i dati della sessione associati all'ID specificato.
  Read(id string) (string, error)
  // Scrivi i dati di sessione associati all'ID specificato.
  Errore di scrittura (id string, data string)
}
```

#### Registrazione Del Driver

Dopo aver implementato il conducente, è necessario registrarlo in Goravel. You can do this using `Extend` method of the
`facades.Session`. Dovresti chiamare il metodo `Extend` nel metodo `boot` di `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Una volta registrato il conducente, puoi usarlo impostando l'opzione `driver` nel file di configurazione della sessione su
`redis` o impostando la variabile d'ambiente `SESSION_DRIVER` su `redis`.

### Recupero istanza driver

Usa il metodo `Driver` per recuperare l'istanza del driver dal gestore di sessione. Accetta un nome opzionale del conducente, se
non è fornito, restituisce l'istanza predefinita del conducente:

```go
driver, err := facades.Session().Driver("file")
```

### Avvio Di Una Nuova Sessione

```go
session := facades.Session().BuildSession(driver)
session.Start()
```

### Salvataggio Dei Dati Della Sessione

```go
session := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Allegare la sessione alla richiesta

```go
session := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Verifica se la richiesta ha una sessione

```go
if ctx.Request().HasSession() {
    //
}
```
