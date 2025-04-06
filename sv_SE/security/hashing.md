# Hashning

Goravel `facades.Hash()` ger säker Argon2id och Bcrypt hashing för lagring av användarlösenord. Om du använder
ett av Goravels startkit kommer Argon2id att användas för registrering och autentisering som standard.

## Konfiguration

Standard-hash-drivrutinen för din applikation är konfigurerad i din applikations `config/hashing.go`-konfigurationsfil
. Det finns för närvarande flera stödda drivrutiner: Argon2id och Bcrypt.

## Grundläggande användning

### Hasha lösenord

Du kan hash ett lösenord genom att anropa `Make`-metoden på `facades.Hash()`:

```go
lösenord, err := fasader.Hash().Make(lösenord)
```

### Verifiera att ett lösenord matchar A Hash

`Check`-metoden som tillhandahålls av Hash-fasaden låter dig verifiera att en given textsträng motsvarar en
given hash:

```go
om fasades.Hash().Check('plain-text', hashedPassword) {
    // Lösenorden matchar ...
}
```

### Bestämma om ett lösenord behöver hämtas om

`NeedsRehash`-metoden som tillhandahålls av Hash-fasaden låter dig avgöra om arbetsfaktorn som används av hasaren har
ändrats sedan lösenordet hashades. Vissa program väljer att utföra denna kontroll under programmets
autentiseringsprocess:

```go
om fasader.Hash().NeedsRehash(hashed) {
     hashed = fasader.Hash().Make('vanlig text');
}
```
