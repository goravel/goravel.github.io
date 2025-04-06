# Hashing

De Goravel `facades.Hash()` biedt veilige Argon2id en Bcrypt hashing voor het opslaan van gebruikerswachtwoorden. Als je
gebruikt een van de Goravel starter uitrustingen, Argon2id zal standaard worden gebruikt voor registratie en authenticatie.

## Configuratie

De standaard hashing driver voor uw applicatie is geconfigureerd in het `config/hashing.go` configuratie
bestand. Er zijn momenteel verschillende ondersteunde drivers: Argon2id en Bcrypt.

## Basis gebruik

### Hashing wachtwoorden

Je kunt een wachtwoord gebruiken door de `Make` methode aan te roepen op de `facades.Hash()`:

```go
wachtwoord, err := facades.Hash().Make(wachtwoord)
```

### Verifiëren dat een wachtwoord overeenkomt met een Hash

De `Check` methode van Hash facade stelt u in staat om te controleren of een bepaalde platte-tekst overeenkomt met een
gegeven hash:

```go
if facades.Hash().Check('platin-text', hashedPassword) {
    // De wachtwoorden match...
}
```

### Bepaal of een wachtwoord opnieuw moet worden ingevuld

De `NeedsRehash` methode van het Hash facade stelt je in staat om te bepalen of de werkfactor die gebruikt wordt door de hasher
veranderd is sinds het wachtwoord is hashed. Sommige toepassingen kiezen ervoor om deze controle uit te voeren tijdens het
verificatieproces van de applicatie:

```go
if facades.Hash().NeedsRehash(hashed) {
     hashed = facades.Hash().Make('plain-text');
}
```
