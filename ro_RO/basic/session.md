# Sesiune

Sesiunea vă permite să stocați informații de utilizator în mai multe solicitări, oferind o experiență statuoasă în cadrul protocolului HTTP
în mod inerent statut. Aceste informaţii de utilizator sunt stocate în mod constant în partea de server. Goravel oferă o interfață
unificată pentru interacțiunea cu diverși conducători de stocare persistenți.

## Configurare

Fișierul de configurare `session` este localizat la `config/session.go`. Șoferul implicit este `file`, care stochează sesiunile
în directorul `stocage/framework/sessions`. Goravel vă permite să creaţi un şofer `session` personalizat implementând
interfaţa `contracts/session/driver`.

### Înregistrare Middleware

În mod implicit, Goravel nu începe o sesiune automat. Cu toate acestea, oferă middleware pentru a începe o sesiune. You can
register the session middleware in the `app/http/kernel.go` file to apply it to all routes, or you can add it to
specific routes:

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

## Interacționează cu sesiunea

### Preluarea datelor

Puteți utiliza metoda `Get` pentru a prelua datele din sesiune. Dacă valoarea nu există, `nil` va fi returnată.

```go
valoare := ctx.Request().Session().Get("key")
```

Puteți, de asemenea, să treceți o valoare implicită ca al doilea argument la metoda `Get`. Această valoare va fi returnată dacă cheia specificată
nu există în sesiune:

```go
valoare := ctx.Request().Session().Get("key", "default")
```

### Preluarea tuturor datelor

Dacă doriţi să preluaţi toate datele din sesiune, puteţi utiliza metoda `Toate`:

```go
date := ctx.Request().Session().All()
```

### Preluarea unui subset de date

Dacă doriți să recuperați un subset al datelor sesiunii, puteți utiliza metoda `Only`:

```go
date := ctx.Request().Session().Only([]string{"username", "email"})
```

### Determinare Dacă un articol există în sesiune

Pentru a determina dacă un articol este prezent în sesiune, puteţi utiliza metoda `Has`. Metoda `Has` returnează `true` dacă elementul
este prezent şi nu este `nil`:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Pentru a determina dacă un articol este prezent şi chiar dacă este `nil`, puteţi utiliza metoda `Exists`:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Pentru a determina dacă un element nu este prezent în sesiune, puteţi utiliza metoda "Lipsă":

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Stocarea datelor

Poți folosi metoda `Put` pentru a stoca date în sesiune:

```go
ctx.Request().Session().Put("key", "value")
```

### Preluarea și ștergerea datelor

Dacă doriți să recuperați un articol din sesiune și apoi să îl ștergeți, puteți utiliza metoda `Pull`:

```go
valoare := ctx.Request().Session().Pull("key")
```

### Ștergere date

Metoda `Uit` poate fi folosită pentru a elimina o bucată de date din sesiune. Dacă doriţi să ştergeţi toate datele de la
sesiunea puteţi utiliza metoda `Flush`:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### Regenerare ID sesiune

Regenerarea ID-ului sesiunii se face adesea pentru a împiedica utilizatorii răuvoitori să exploateze o sesiune de atac de fixare
pe aplicația ta. Puteţi regenera ID-ul sesiunii folosind metoda `Regenerate`:

```go
ctx.Request().Session().Regenerate()
```

Dacă doriţi să regeneraţi ID-ul sesiunii şi să uitaţi toate datele care au fost în sesiune, puteţi utiliza metoda `Invalidate`
:

```go
ctx.Request().Sesiune ().Invalidate()
```

Apoi, trebuie să salvați noua sesiune în cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Nume: ctx.Request().Session().GetName(),
  Valoare: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Path: facades.Config().GetString("session. ath"),
  Domeniu: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("session. ecură"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Date flash

Datele flash sunt date de sesiune care vor fi disponibile numai în timpul solicitării HTTP ulterioare, și apoi vor fi șterse.
Datele flash sunt utile pentru stocarea mesajelor temporare, cum ar fi mesajele de stare. Poți folosi metoda `Flash` pentru a stoca date de tip
la sesiune:

```go
ctx.Request().Session().Flash("status", "Sarcina a a avut succes!")
```

Dacă doriţi să păstraţi datele flash pentru o solicitare suplimentară, puteţi utiliza metoda `Reflash`:

```go
ctx.Request().Session().Reflash()
```

Dacă doriţi să păstraţi date flash specifice în jur pentru o solicitare suplimentară, puteţi utiliza metoda `Keep`:

```go
ctx.Request().Session().Keep("status", "username")
```

Dacă doriţi să păstraţi date specifice pentru utilizare imediată, puteţi utiliza metoda `Now`:

```go
ctx.Request().Session().Now("status", "Sarcina a a avut succes!")
```

## Interacționează cu Manager Sesiune

### Construiește o Sesiune Personalizată

Folosește fațada `Sesiunea` pentru a construi o sesiune personalizată. Fereastra `Sesiunea` furnizează metoda `BuildSSesiune`, care ia
o instanță de șofer partener și un ID opțional de sesiune dacă doriți să specificați un ID de sesiune personalizat:

```go
import "github.com/goravel/framework/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Adaugă șoferi de sesiune personalizați

#### Implementarea șoferului

Pentru a implementa un șofer de sesiune personalizat, șoferul trebuie să implementeze interfața `contracte/sesiune/șoferi`.

```go
// Driver este interfața pentru gestionarii sesiunii.
tip interfață Driver {
  // Închide închide gestionarul de sesiuni.
  Close() eroare
  // Distruge sesiunea cu ID-ul dat.
  Eroare Destroy(id string)
  // Gc efectuează colectarea gunoiului în gestionarul de sesiuni, cu o durată de viață maximă.
  Gc(maxLifetime int) eroare
  // Deschideți o sesiune cu o anumită cale și nume.
  Eroare Open(șir traiectorie, șir de nume)
  // Citiți datele sesiunii asociate cu ID-ul dat.
  Citește (id șir) (șir, eroare)
  // Scrie datele sesiunii asociate cu ID-ul dat. Eroare
  Scrie (șir de caractere, șir de date)
}
```

#### Înregistrarea șoferului

După implementarea șoferului, trebuie să îl înregistrați în Goravel. Puteţi face acest lucru folosind metoda `Extinde` a lui
`facades.Session`. Ar trebui să apelaţi la metoda `Extend` în metoda `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Odată ce șoferul este înregistrat, o puteți folosi setând opțiunea `driver` în fișierul de configurare al sesiunii la
`redis` sau setând variabila de mediu `SESSION_DRIVER` la `redis`.

### Preluarea instanței șoferului

Folosiți metoda `Driver` pentru a prelua instanța șoferului de la managerul de sesiuni. Acceptă un nume opțional de șofer, dacă
nu este furnizat, returnează instanța implicită de șofer:

```go
șofer, err := facades.Session().Driver("file")
```

### Începe o nouă sesiune

```go
Sesiune := facades.Session().BuildSession(driver)
session.Start()
```

### Se salvează datele sesiunii

```go
Sesiune := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Atașarea sesiunii la cerere

```go
Sesiune := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(sesiune)
```

### Se verifică dacă cererea are sesiune

```go
if ctx.Request().HasSession() {
    //
}
```
