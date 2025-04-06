# Hachage

Le `facades.Hash()` de Goravel fournit un hachage Argon2id sécurisé et Bcrypt pour stocker les mots de passe de l'utilisateur. Si vous utilisez
l'un des kits de démarrage d'application Goravel, Argon2id sera utilisé par défaut pour l'enregistrement et l'authentification.

## Configuration

Le pilote de hachage par défaut pour votre application est configuré dans le fichier
de configuration `config/hashing.go` de votre application. Il y a actuellement plusieurs pilotes pris en charge : Argon2id et Bcrypt.

## Utilisation de base

### Hachage des mots de passe

Vous pouvez hacher un mot de passe en appelant la méthode `Make` sur les `facades.Hash()`:

```go
mot de passe, erreur := facades.hash().Make(password)
```

### Vérifier qu'un mot de passe correspond à un hachage

La méthode `Check` fournie par la façade Hash vous permet de vérifier qu'une chaîne de texte brut donnée correspond à un hachage
donné:

```go
if facades.Hash().Check('plain-text', hashedPassword) {
    // Les mots de passe correspondent...
}
```

### Déterminer si un mot de passe doit être réinitialisé

La méthode `NeedsRehash` fournie par la façade Hash vous permet de déterminer si le facteur de travail utilisé par le hasher a
changé depuis que le mot de passe a été haché. Certaines applications choisissent d'effectuer cette vérification pendant le processus d'authentification
de l'application :

```go
if facades.Hash().NeedsRehash(hashed) {
     hashed = facades.Hash().Make('plain-text');
}
```
