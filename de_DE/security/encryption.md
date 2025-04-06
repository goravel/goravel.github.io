# Verschlüsselung

Goravels Verschlüsselungsdienste bieten eine einfache, bequeme Schnittstelle zum Verschlüsseln und Entschlüsseln von Text über OpenSSL
mit AES-256-Verschlüsselung. Alle von Goravel verschlüsselten Werte werden mit einem Nachrichtenauthentifizierungscode (GMAC) signiert, so dass
nicht verändert oder manipuliert werden kann, sobald sie verschlüsselt sind.

## Konfiguration

Bevor du Goravels Verschlüsselung verwendest, musst du die `key` Konfigurationsoption in deiner `config/app.go` Konfigurationsdatei
setzen. Diese Option wird von der Umgebungsvariable `APP_KEY` angetrieben. Benutzen Sie den `go run . artisan key:generate` Befehl zu
generiert den Wert dieser Variable, da der `key:generate` Befehl Golangs sicheren Zufallsgenerator zu
verwendet und einen sicheren kryptographischen Schlüssel für deine Anwendung erstellt.

## Verwendung des Verschlüsselers

### Verschlüssele einen Wert

Um einen Wert zu verschlüsseln, kannst du die Methode `EncryptString` in `facades.Crypt()` verwenden. Diese Methode verschlüsselt Werte mit dem
OpenSSL und AES-256-GCM Chiffre. Zusätzlich alle verschlüsselten Werte werden mit einem Nachrichtenauthentifizierungscode (GMAC)
signiert, um die Entschlüsselung durch böswillige Benutzer zu verhindern, die versuchen, die Daten zu manipulieren.

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### Einen Wert entschlüsseln

Du kannst die `DecryptString` Methode von `facades.Crypt()` verwenden, um Werte zu entschlüsseln. Wenn der Wert nicht korrekt
entschlüsselt werden kann, z. B. wenn der Authentifizierungscode ungültig ist, wird ein Fehler zurückgegeben.

```go
str, err := facades.Crypt().DecryptString(secret)
```
