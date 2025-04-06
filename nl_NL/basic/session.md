# Sessie

Sessie stelt u in staat gebruikersinformatie op te slaan over meerdere verzoeken, waarmee u een statelijke ervaring binnen het
inherente stateloze HTTP-protocol. Deze gebruikersinformatie wordt permanent opgeslagen op de serverzijde. Goravel biedt een
uniforme interface voor interactie met verschillende blijvende drivers.

## Configuratie

Het `session` configuratiebestand is te vinden op `config/session.go`. De standaard driver is `file`, welke sessies
opslaat in de `storage/framework/sessions` map. Goravel geeft je de mogelijkheid om een aangepaste 'sessie' driver te maken door
de `contracts/session/driver` interface te implementeren.

### Registreer Middleware

Standaard start Goravel niet automatisch een sessie. Het zorgt echter wel voor tussentijds werk om een zitting te beginnen. You can
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

## Interactie met de sessie

### Gegevens ophalen

Je kunt de `Get` methode gebruiken om gegevens op te halen van de sessie. Als de waarde niet bestaat, zal `nil` worden geretourneerd.

```go
waarde := ctx.Request().Session().Get("sleutel")
```

U kunt ook een standaard waarde als het tweede argument aan de `Get` methode doorgeven. Deze waarde wordt teruggegeven als de opgegeven
sleutel niet bestaat in de sessie:

```go
waarde := ctx.Request().Session().Get("sleutel", "standaard")
```

### Alle gegevens ophalen

Als u alle gegevens wilt ophalen van de sessie, kunt u de `Alle` methode gebruiken:

```go
data := ctx.Request().Session().All()
```

### Ophalen van een subset gegevens

Als je een subset van de sessie gegevens wilt ophalen, kan je de `Alleen` methode gebruiken:

```go
data := ctx.Request().Session().Only([]string{"username", "email"})
```

### Bepalen of een item in de sessie is

Om te bepalen of een item aanwezig is in de sessie, kunt u de `Has` methode gebruiken. De `Has` methode retourneert `true` als het
item aanwezig is en niet `nil` is:

```go
if ctx.Request().Session().Has("user") {
    //
}
```

Om te bepalen of een item aanwezig is en zelfs als het `nil` is, kan je de `Exists` methode gebruiken:

```go
if ctx.Request().Session().Exists("user") {
    //
}
```

Om te bepalen of een item niet aanwezig is in de sessie, kunt u de 'Missing'-methode gebruiken:

```go
if ctx.Request().Session().Missing("user") {
    //
}
```

### Data opslaan

Je kunt de `Put` methode gebruiken om gegevens op te slaan in de sessie:

```go
ctx.Request().Session().Put("sleutel", "waarde")
```

### Gegevens ophalen en verwijderen

Als u een item wilt ophalen uit de sessie en het vervolgens wilt verwijderen, kunt u de `Pull` methode gebruiken:

```go
waarde := ctx.Request().Session().Pull("sleutel")
```

### Gegevens verwijderen

De `Vergeten` methode kan worden gebruikt om een deel van de gegevens van de sessie te verwijderen. Als u alle gegevens van
de sessie wilt verwijderen, kunt u de 'Flush' methode gebruiken:

```go
ctx.Request().Session().Forget("username", "email")

ctx.Request().Session().Flush()
```

### De sessie-ID opnieuw genereren

Het opnieuw genereren van de sessie-ID wordt vaak gedaan om te voorkomen dat kwaadwillende gebruikers misbruik maken van een sessie-fixation aanval
op uw applicatie. Je kunt het sessie-ID opnieuw genereren met behulp van de `Regenerate` methode:

```go
ctx.Request().Session().Regenerate()
```

Als je de sessie-ID opnieuw wilt genereren en alle gegevens wilt vergeten die in de sessie waren, kan je de `Invalidate`
methode gebruiken:

```go
ctx.Request().Session().Invalidate()
```

Vervolgens moet je de nieuwe sessie opslaan op het cookie:

```go
ctx.Response().Cookie(http.Cookie{
  Naam: ctx.Request().Session().GetName(),
  Waarde: ctx.Request().Session(). etID(),
  MaxAge: facades.Config().GetInt("session.lifetime") * 60,
  Path: facades.Config().GetString("sessie. ath"),
  Domain: facades.Config().GetString("session.domain"),
  Secure: facades.Config().GetBool("sessie. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Flash Data

Flash-gegevens zijn sessiegegevens die alleen beschikbaar zijn tijdens het daaropvolgende HTTP-verzoek en zullen vervolgens worden verwijderd.
Flash data is handig voor het opslaan van tijdelijke berichten zoals statusberichten. Je kunt de `Flash` methode gebruiken om
flashgegevens op te slaan in de sessie:

```go
ctx.Request().Session().Flash("status", "Taak was succesvol!")
```

Als je je flitsgegevens rond wilt houden voor een aanvullend verzoek, kan je de `Reflash` methode gebruiken:

```go
ctx.Request().Session().Reflash()
```

Als je specifieke flitsgegevens wilt bewaren voor een aanvullend verzoek, kan je de `Keep` methode gebruiken:

```go
ctx.Request().Session().Keep("status", "username")
```

Als u specifieke gegevens wilt bewaren voor onmiddellijk gebruik, kunt u de 'Nu' methode gebruiken:

```go
ctx.Request().Session().Now("status", "Taak was succesvol!")
```

## Interactie met sessiemanager

### Een aangepaste sessie opbouwen

Gebruik de `Session` facade om een aangepaste sessie te maken. De `Session` facade biedt de `BuildSession` methode. welke
een stuurprogramma nodig heeft en een optionele sessie-ID als u een aangepaste sessie-ID wilt specificeren.

```go
importeer "github.com/goravel/framework/facades"

sessie := facades.Session().BuildSession(driver, "sessionID")
```

### Aangepaste Sessie Drivers toevoegen

#### Implementeer de chauffeur

Om een aangepaste sessiedriver te implementeren moet de `contracts/session/driver` interface implementeren.

```go
// Driver is de interface voor Sessie handlers.
type Driver interface {
  // Sluiten sluit de sessie handler.
  Close() fout
  // Vernietigen vernietigt de sessie met het gegeven ID.
  Verestroy(id string) fout
  // Gc voert het garbagecollection uit op de sessie-handler met de gegeven maximale levensduur.
  Gc(maxLifetime int) error
  // Open opent een sessie met het opgegeven pad en de naam.
  Open(path string, naam string) fout
  // Lees het lezen van de sessie data gekoppeld aan het gegeven ID.
  Lead(id string) (string, error)
  // Schrijft de sessiedata die gekoppeld zijn aan het opgegeven ID.
  Write(id string, data string) fout
}
```

#### Registreren van de chauffeur

Na het implementeren van de chauffeur moet u het registreren in Goravel. Je kunt dit doen met de `Extend` methode van de
`facades.Session`. Je moet de `Extend` methode in de `boot` methode van `app/providers/app_service_provider.go`:

```go
import "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

Zodra de chauffeur is geregistreerd, je kunt het gebruiken door de optie `driver` in het sessie configuratiebestand op
`redis` in te stellen of door de `SESSION_DRIVER` omgevingsvariabele op `redis` in te stellen.

### Chauffeur instantie ophalen

Gebruik de `Driver` methode om de stuurprogramma instantie op te halen van sessie manager. Het accepteert een optionele naam van de driver als
niet wordt opgegeven, het geeft de standaard driver instantie terug:

```go
driver, err := facades.Session().Driver("file")
```

### Een nieuwe sessie starten

```go
sessie := facades.Session().BuildSession(driver)
session.Start()
```

### Sessie-gegevens opslaan

```go
sessie := facades.Session().BuildSession(driver)
session.Start()
session.Save() ()
```

### De sessie aan de Aanvraag koppelen

```go
sessie := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Controleren of het verzoek sessie heeft

```go
if ctx.Request().HasSession() {
    //
}
```
