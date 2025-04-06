# Versleuteling

Goravel's encryptiediensten bieden een eenvoudige, handige interface voor het versleutelen en decoderen van tekst via OpenSSL
met AES-256 encryptie. Alle gecodeerde waarden van Goravel zijn ondertekend met behulp van een berichtauthenticatiecode (GMAC), zodat
hun onderliggende waarde niet kan worden gewijzigd of geknoeid met eenmaal versleuteld.

## Configuratie

Voordat u de encryptie van Goravels kunt gebruiken, moet u de `key` configuratie optie in uw `config/app.go` configuratie
bestand instellen. Deze optie wordt gedreven door de `APP_KEY` omgevingsvariabele. Gebruik `go run . artisan sleutel:generate` commando naar
genereer de waarde van deze variabele, aangezien het `key:generate` commando gebruik zal maken van Golang's veilige, willekeurige bytes generator naar
maak een beveiligde cryptografische sleutel voor uw applicatie.

## De Encrypter gebruiken

### Versleutelen van een waarde

Om een waarde te coderen, kunt u de `EncryptString` methode gebruiken in `facades.Crypt()`. Deze methode versleutelt waarden met behulp van de
OpenSSL en AES-256-GCM codering. Bovendien, alle gecodeerde waarden zijn ondertekend met een verificatiecode (GMAC)
om ontsleuteling door kwaadwillende gebruikers te voorkomen die proberen de gegevens te knoeien.

```go
geheim, err := facades.Crypt().EncryptString("goravel")
```

### Decoderen van een waarde

U kunt de `DecryptString` methode van `facades.Crypt()` gebruiken om waarden te ontsleutelen. If the value can not be properly
decrypted, such as when the message authentication code is invalid, an error will be returned.

```go
str, err := facades.Crypt().DecryptString(secret)
```
