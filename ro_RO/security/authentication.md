# Autentificare

Autentificarea este o caracteristică indispensabilă în Aplicațiile web, modulul `facades.Auth()` al Goravel oferă suport
pentru JWT.

## Configurare

Puteți configura paza `defaults` și mai multe `guards` în fișierul `config/auth.go` pentru a schimba identitatea utilizatorului
din aplicație.

Puteți configura parametrii JWT în fișierul `config/jwt.go`, cum ar fi `secret`, `ttl`, `refresh_ttl`.

### Configurați TTL pentru diferite Gardieni

Puteți seta TTL pentru fiecare Gardian separat în fișierul `config/auth.go`, dacă nu este setat, configurația `jwt.ttl` este folosită
în mod implicit.

```go
// config/auth.go
"guards": harta[string]any{
  "user": harta[string]orice {
    "driver": "jwt",
++ "ttl": 60,
  },
},
```

## Generează JWT Token

```shell
mergi să alergi . artizan jwt:secret
```

## Generează Token Folosind Utilizator

Puteți genera un token prin model, nu există nici o configurație suplimentară dacă modelul folosește \`orm. odel", în caz contrar, trebuie să configurați
eticheta pe modelul câmpului principal de cheie, de exemplu:

```go
type User struct {
  ID uint `gorm:"primaryKey"`
  Numele
}

modele var de utilizator. ser
utilizator.ID = 1

token, err := facades.Auth(ctx).Login(&utilizator)
```

## Generează Token Folosind ID-ul

```go
token, err := facades.Auth(ctx).LoginUsingID(1)
```

## Parse Token

```go
payload, err := facades.Auth(ctx).Parse(token)
```

Prin `payload` puteţi obţine:

1. `Guard`: Garda curentă;
2. `Cheie`: Steagul utilizatorului;
3. `ExpireAt`: Timp de expirare;
4. `EmedAt`: Timp eliberat;

> Dacă `err` nu este nil altul decât `ErrorTokenExpired`, payload ar trebui să fie nil.

Puteți judeca dacă Token-ul a expirat de eroare:

```go
"errors"
"github.com/goravel/framework/auth"

errors.Is(err, auth.ErrorTokenExpired)
```

> Tokenul poate fi analizat în mod normal, cu sau fără prefixul purtătorului.

## Obține utilizator

Trebuie să generați un Token de către `Parse` înainte de a obține un utilizator, procesul poate fi manipulat în HTTP middleware.

```go
var modele de utilizator.Utilizator
err := facades.Auth(ctx).User(&user) // Trebuie punctul
id, err := facades.Auth(ctx).ID()
```

## Reîmprospătare jeton

Trebuie să generați un Token de către `Parse` înainte de a reîmprospăta utilizatorul.

```go
token, err := facades.Auth(ctx).Refresh()
```

## Deconectare

```go
err := faades.Auth(ctx).Deconectare ()
```

## Garanții multiple

```go
token, err := facades.Auth(ctx).Guard("admin").LoginUsingID(1)
err := facades.Auth(ctx).Guard("admin").Parse(token)
token, err := facades.Auth(ctx).Guard("admin").User(&user)
```

> Când garda implicită nu este folosită, metoda `Gardian` trebuie apelată înainte de a apela metodele de mai sus.
