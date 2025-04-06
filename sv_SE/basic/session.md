# Session

Sessionen gör det möjligt för dig att lagra användarinformation över flera förfrågningar, vilket ger en staty upplevelse inom
inneboende statslösa HTTP-protokollet. Denna användarinformation lagras ständigt på serversidan. Goravel erbjuder ett enat
gränssnitt för att interagera med olika ihållande lagringsdrivrutiner.

## Konfiguration

`session` -konfigurationsfilen finns på `config/session.go`. Standarddrivrutinen är `file`, som lagrar sessioner
i katalogen `storage/framee/sessions` . Goravel låter dig skapa en anpassad `session`-drivrutin genom att implementera
gränssnittet `contracts/session/driver` .

### Registrera Middleware

Som standard startar Goravel inte en session automatiskt. Det ger dock middleware för att starta en session. Du kan
registrera sessionen middleware i `app/http/kernel. o` fil att tillämpa den på alla rutter, eller så kan du lägga till den till
specifika rutter:

```go
import (
  "github.com/goravel/framework/contracts/http"
  "github.com/goravel/frameing/session/middleware"
)

func (kernel Kernel) Middleware() []http.Middleware {
  return []http.Middleware{
    middleware.StartSession(),
  }
}
```

## Interagerar med sessionen

### Hämtar data

Du kan använda `Get`-metoden för att hämta data från sessionen. Om värdet inte finns kommer `nil` att returneras.

```go
värde := ctx.Request().Session().Get("key")
```

Du kan också skicka ett standardvärde som det andra argumentet till `Get`-metoden. Detta värde kommer att returneras om den
angivna nyckeln inte finns i sessionen:

```go
värde := ctx.Request().Session().Get("key", "default")
```

### Hämtar alla data

Om du vill hämta all data från sessionen kan du använda `All`-metoden:

```go
data := ctx.Request().Session().All()
```

### Hämtar en delmängd av data

Om du vill hämta en delmängd av sessionsdata kan du använda `Only`-metoden:

```go
data := ctx.Request().Session().Endast ([]string{"username", "email"})
```

### Bestämma om ett föremål finns i sessionen

För att avgöra om ett objekt finns i sessionen kan du använda `Has`-metoden. `Has`-metoden returnerar `true` om
-objektet är närvarande och inte `nil`:

```go
om ctx.Request().Session().Has("användare") {
    //
}
```

För att avgöra om ett objekt är närvarande och även om det är `nil`, kan du använda `Exists`-metoden:

```go
om ctx.Request().Session().Exister("användare") {
    //
}
```

För att avgöra om ett objekt inte finns i sessionen kan du använda `Missing`-metoden:

```go
om ctx.Request().Session().Saknar ("användare") {
    //
}
```

### Lagrar data

Du kan använda `Put`-metoden för att lagra data i sessionen:

```go
ctx.Request().Session().Put("key", "värde")
```

### Hämtar och tar bort data

Om du vill hämta ett objekt från sessionen och sedan ta bort det, kan du använda `Pull`-metoden:

```go
värde := ctx.Request().Session().Pull("key")
```

### Tar bort data

Metoden `Forget` kan användas för att ta bort en bit data från sessionen. Om du vill ta bort all data från
sessionen kan du använda `Flush`-metoden:

```go
ctx.Request().Session().Glöm ("användarnamn", "e-post")

ctx.Request().Session().Flush()
```

### Återskapa sessions-ID

Regenerering av sessions-ID görs ofta för att förhindra skadliga användare från att utnyttja en session fixation attack
på din ansökan. Du kan regenerera sessions-ID med hjälp av `Regenerate`-metoden:

```go
ctx.Request().Session().Regenerate()
```

Om du vill regenerera sessions-ID och glömma all data som fanns i sessionen kan du använda `Invalidate`
metoden:

```go
ctx.Request().Session().Invalidate()
```

Då måste du spara den nya sessionen till cookien:

```go
ctx.Response().Cookie(http.Cookie{
  Namn: ctx.Request().Session().GetName(),
  Värde: ctx.Request().Session(). etID(),
  MaxAge: fasader.Config().GetInt("session.lifetime") * 60,
  Sökväg: fasader.Config().GetString("session. ath"),
  Domän: fasader.Config().GetString("session.domain"),
  Secure: fasader.Config().GetBool("session. ecure"),
  HttpOnly: facades.Config().GetBool("session.http_only"),
  SameSite: facades.Config().GetString("session.same_site"),
})
```

### Blixt data

Flash-data är sessionsdata som endast kommer att vara tillgängliga under den efterföljande HTTP-begäran, och sedan kommer att raderas.
Flash-data är användbart för att lagra tillfälliga meddelanden som statusmeddelanden. Du kan använda `Flash`-metoden för att lagra
flashdata i sessionen:

```go
ctx.Request().Session().Flash("status", "Uppgiften lyckades!")
```

Om du vill behålla dina flashdata för ytterligare en begäran kan du använda `Reflash`-metoden:

```go
ctx.Request().Session().Reflash()
```

Om du vill behålla specifik flashdata för en ytterligare begäran kan du använda `Keep`-metoden:

```go
ctx.Request().Session().Keep("status", "användarnamn")
```

Om du vill behålla specifika data runt för omedelbar användning kan du använda `Now`-metoden:

```go
ctx.Request().Session().Now("status", "Uppgiften lyckades!")
```

## Interagera med sessionshanteraren

### Bygger en anpassad session

Använd fasaden `Session` för att bygga en anpassad session. Fasaden `Session` ger `BuildSession` -metoden, som tar
en förarinstans och ett valfritt sessions-ID om du vill ange ett anpassat sessions-ID:

```go
importera "github.com/goravel/frameing/facades"

session := facades.Session().BuildSession(driver, "sessionID")
```

### Lägg till anpassade sessions-drivrutiner

#### Implementera föraren

För att implementera en anpassad session-drivrutin måste drivrutinen implementera gränssnittet `contracts/session/driver`.

```go
// Driver is the interface for Session handlers.
type Driver interface {
  // Stäng sessionshanteraren.
  Close() fel
  // Destroy förstör sessionen med det givna ID.
  Destroy(id string) fel
  // Gc utför sophämtning på sessionshanteraren med den angivna maximala livslängden.
  Gc(maxLifetime int) fel
  // Öppna en session med given sökväg och namn.
  Open(sökvägsträning, namnsträng) fel
  // Läser sessionsdata som associeras med det angivna ID.
  Läs(ID-sträng) (sträng, fel)
  // Skriv skriver sessionsdata som associeras med det angivna ID.
  Skriv(id sträng, datasträng) fel
}
```

#### Registrerar föraren

Efter genomförandet av föraren, måste du registrera den i Goravel. Du kan göra detta med `Extend`-metoden i
`facades.Session`. Du bör anropa `Extend`-metoden i `boot`-metoden för `app/providers/app_service_provider.go`:

```go
importera "github.com/goravel/framework/contracts/session"

facades.Session().Extend("redis", func() session.Driver {
  return &RedisDriver{}
})
```

När föraren är registrerad, du kan använda den genom att ställa in `driver` -alternativet i sessionskonfigurationsfilen till
`redis` eller genom att ställa in miljövariabeln `SESSION_DRIVER` till `redis`.

### Hämtar förarinstans

Använd `Driver`-metoden för att hämta taxiförarinstansen från sessionshanteraren. Det accepterar ett valfritt förarnamn, om
inte anges, det returnerar standardförarens instans:

```go
förare, err := fasader.Session().Driver("fil")
```

### Startar en ny session

```go
session := facades.Session().BuildSession(driver)
session.Start()
```

### Sparar sessionsdata

```go
session := facades.Session().BuildSession(driver)
session.Start()
session.Save()
```

### Bifoga sessionen till förfrågan

```go
session := facades.Session().BuildSession(driver)
session.Start()
ctx.Request().SetSession(session)
```

### Kontrollerar om begäran har session

```go
om ctx.Request().HasSession() {
    //
}
```
