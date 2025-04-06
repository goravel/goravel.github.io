# Kryptering

Goravels krypteringstjänster ger ett enkelt, bekvämt gränssnitt för kryptering och dekryptering av text via OpenSSL
med AES-256-kryptering. Alla Gorfels krypterade värden är signerade med ett meddelande autentiseringskod (GMAC) så
att deras underliggande värde inte kan ändras eller manipuleras med en gång krypterad.

## Konfiguration

Before using Goravel's encrypter, you must set the `key` configuration option in your `config/app.go` configuration
file. Det här alternativet drivs av miljövariabeln `APP_KEY`. Använd `go run. artisan key:generate` kommandot till
genererar denna variabels värde eftersom kommandot `key:generate` kommer att använda Golangs säkra slumpmässiga bytes generator till
skapa en säker kryptografisk nyckel för din applikation.

## Använda Krypteraren

### Krypterar ett värde

För att kryptera ett värde kan du använda `EncryptString`-metoden i `facades.Crypt()`. Denna metod krypterar värden med hjälp av
OpenSSL och AES-256-GCM-chiffer. Dessutom, alla krypterade värden är signerade med en meddelandeautentiseringskod (GMAC)
för att förhindra dekryptering av skadliga användare som försöker manipulera data.

```go
Hemligt, err := fasader.Krypt().KryptString("goravel")
```

### Dekrypterar ett värde

Du kan använda `DecryptString`-metoden från `facades.Crypt()` för att dekryptera värden. Om värdet inte kan dekrypteras korrekt
som när meddelandets autentiseringskod är ogiltig, kommer ett fel att returneras.

```go
str, err := fasader.Krypt().DekryptString(hemlig)
```
