# Authenticatie

Authenticatie is een onmisbare functie in webtoepassingen, de `facades.Auth()` module van Goravel biedt ondersteuning
voor JWT.

## Configuratie

U kunt de `defaults` guard en meerdere `guards` in het `config/auth.go` bestand configureren om te wisselen tussen verschillende gebruiker
identiteiten in de toepassing.

U kunt de parameters van JWT configureren in het `config/jwt.go` bestand, zoals `secret`, `ttl`, `refresh_ttl`.

### Configureer TTL voor verschillende Guards

Je kunt TTL voor elke Guard afzonderlijk instellen in het `config/auth.go` bestand, als de `jwt.ttl` configuratie niet is ingesteld, wordt standaard
gebruikt.

```go
// config/auth.go
"guards": map[string]any{
  "user": map[string]any{
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## Genereer JWT Token

```shell
uitvoeren . artisan jwt:secret
```

## Genereer Token met behulp van gebruiker

You can generate a token by Model, there is no extra configuration if the model uses `orm.Model`, otherwise, you need to
configure Tag on the model primary key field, for example:

```go
type gebruiker bouwt {
  ID uint `gorm:"primaryKey"`
  Name string
}

var user models. ser
user.ID = 1

token, err := facades.Auth(ctx).Login(&user)
```

## Genereer Token met behulp van ID

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

Via `payload` kan je het volgende krijgen:

1. `Bewaker`: Huidige Bewaking;
2. `Key`: Gebruiker vlag;
3. `Verlopen tijd`: Verlopen tijd;
4. `UitgegingAt`: Uitgegeven tijd;

> Als `err` niet anders is dan `ErrorTokenExpired`, moet de payload leeg zijn.

U kunt beoordelen of de Token verlopen is voor de err:

```go
"fouten"
"github.com/goravel/framework/auth"

errors.Is(err, auth.ErrorTokenExpired)
```

> De token kan normaal worden geparseerd met of zonder de Voorvoegsel van de Beer.

## Gebruiker ophalen

U moet een Token door `Parse` genereren voordat u een gebruiker krijgt, het proces kan worden behandeld in HTTP middleware.

```go
var user models.User
err := facades.Auth(ctx).User(&user) // Moet punt
id, err := facades.Auth(ctx).ID()
```

## Token vernieuwen

U moet een Token door `Parse` genereren voordat u de gebruiker vernieuwt.

```go
token, err := facades.Auth(ctx).Refresh()
```

## Afmelden

```go
err := facades.Auth(ctx).Logout()
```

## Meerdere wachters

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> Wanneer de standaard wachter niet wordt gebruikt, moet de `Guard` methode worden aangeroepen voordat de bovenstaande methoden worden aangeroepen.
