# Chiffrement

Les services de cryptage de Goravel fournissent une interface simple et pratique pour chiffrer et déchiffrer du texte via OpenSSL
en utilisant le cryptage AES-256. Toutes les valeurs chiffrées de Goravel sont signées en utilisant un code d'authentification de message (GMAC) donc
que leur valeur sous-jacente ne peut pas être modifiée ou altérée une fois chiffrée.

## Configuration

Avant d'utiliser le crypteur de Goravel, vous devez définir l'option de configuration `key` dans votre fichier de configuration `config/app.go`
. Cette option est pilotée par la variable d'environnement `APP_KEY`. Utilisez le `go run . la commande artisan key:generate` vers
génère la valeur de cette variable car la commande `key:generate` utilisera le générateur sécurisé d'octets aléatoires de Golang vers
pour créer une clé cryptographique sécurisée pour votre application.

## Utiliser le crypteur

### Chiffrement d'une valeur

Pour chiffrer une valeur, vous pouvez utiliser la méthode `EncryptString` dans `facades.Crypt()`. Cette méthode crypte les valeurs à l'aide du chiffrement
OpenSSL et AES-256-GCM. De plus, toutes les valeurs chiffrées sont signées avec un code d'authentification de message (GMAC)
pour éviter le déchiffrement par des utilisateurs malveillants qui tentent de falsifier les données.

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### Décryptage d'une valeur

Vous pouvez utiliser la méthode `DecryptString` de `facades.Crypt()` pour déchiffrer les valeurs. Si la valeur ne peut pas être correctement déchiffrée
, par exemple lorsque le code d'authentification du message est invalide, une erreur sera retournée.

```go
str, err := facades.Crypt().DecryptString(secret)
```
