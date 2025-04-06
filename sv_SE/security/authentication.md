# Autentisering

Autentisering är en oumbärlig funktion i webbapplikationer, `fasades.Auth()` modulen i Goravel ger stöd
för JWT.

## Konfiguration

Du kan konfigurera 'defaults' vakt och flera 'guards' i filen 'config/auth.go' för att byta olika användare
identiteter i programmet.

Du kan konfigurera parametrarna för JWT i filen `config/jwt.go`, som `secret`, `ttl`, `refresh_ttl`.

### Konfigurera TTL för olika vakter

Du kan ställa in TTL för varje vakt separat i filen `config/auth.go`, om den inte är satt, är konfigurationen `jwt.ttl` använd
som standard.

```go
// config/auth.go
"guards": map[string]any{
  "user": map[string]any{
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## Generera JWT-token

```shell
gå springa. hantverkare jwt:secret
```

## Generera token med användare

Du kan generera en token av modell, det finns ingen extra konfiguration om modellen använder `orm. odel`, annars behöver du
konfigurera Tag på modellens primära nyckelfält, till exempel:

```go
type User struct {
  ID uint `gorm:"primaryKey"`
  Namnsträng
}

var användarmodeller. ser
användare.ID = 1

token, err := fasader.Auth(ctx).Inloggning(&användare)
```

## Generera token med ID

```go
token, err := fasader.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

Genom `payload` kan du få:

1. `Guard`: Nuvarande Vakt;
2. `Key`: Användarens flagga
3. `Förfalla`: Förfallodatum
4. `Utfärdad`: Utfärdad tid;

> Om `err` inte är nil annat än `ErrorTokenExpired`, borde nyttolasten vara nil.

Du kan bedöma om token har löpt ut av fel:

```go
"fel"
"github.com/goravel/frameing/auth"

errors.Is(err, auth.ErrorTokenUtgång)
```

> Tecken kan tolkas normalt med eller utan Bearer prefix.

## Hämta användare

Du måste generera en token av `Parse` innan du får en användare, processen kan hanteras i HTTP middleware.

```go
var user models.User
err := facades.Auth(ctx).User(&user) // Must point
id, err := facades.Auth(ctx).ID()
```

## Uppdatera token

Du måste generera en token av `Parse` innan du uppdaterar användaren.

```go
token, err := fasader.Auth(ctx).Refresh()
```

## Utloggning

```go
err := fasader.Auth(ctx).Logout()
```

## Flera vakter

```go
token, err := fasader.Auth(ctx).Guard("admin").LoginUsingID(1)
err := fasader.Auth(ctx).Guard("admin").Parse(token)
token, err := fasader.Auth(ctx).Guard("admin").User(&user)
```

> När standardvakten inte används måste `Guard`-metoden anropas innan ovanstående metoder anropas.
