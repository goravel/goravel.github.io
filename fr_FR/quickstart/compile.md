# Compiler

## Compile la commande

Le projet Goravel peut être compilé avec la commande suivante :

```
// Sélectionnez le système pour compiler
aller exécuter . artisan build

// Spécifiez le système pour compiler
go run . artisan build --os=linux
go run . artisan build -o=linux

// Static compilation
go run . artisan build --static
go run . artisan build -s

// Spécifie le nom du fichier de sortie
go run . artisan build --name=goravel
allez exécuter. artisan build -n=goravel
```

## Compilation manuelle

### Compilation régulière

```shell
aller à la compilation .
```

#### Déployer le serveur

Les fichiers et dossiers suivants doivent être téléchargés sur le serveur pendant le déploiement:

```
./main // Compiler le fichier binaire
.env
./database
./public
./storage
./resources
```

### Compilation statique

Le paquet par compilation régulière doit également compter sur le support de l'environnement de déploiement, les fichiers compilés statiquement
peuvent être librement mis en œuvre sur la plate-forme spécifiée sans configuration d'environnement.

```shell
go build --ldflags "-extldflags -static" -o main .
```

### Compilation croisée

La compilation est différenciée par plate-forme, vous devez sélectionner une méthode de compilation correspondante en fonction de la situation de déploiement
.

```shell
// Compiler l'environnement Linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compiler l'environnement Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compiler l'environnement Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Docker

Goravel a un fichier `Dockerfile` et `docker-compose.yml` par défaut, vous pouvez l'utiliser directement, notez que `APP_HOST` devrait
être `0.0.0` pour le moment.

```shell
construction de docker .
```

### Composition Docker

Vous pouvez également démarrer rapidement le service avec la commande suivante :

```shell
docker-compose la version
docker-compose vers le haut
```

> Note: Si vous avez besoin d'un accès externe, vous devez changer APP_HOST à 0.0.0.0

## Réduire la taille du paquet

Commenter le `ServiceProvider` inutilisé dans `config/app.go::providers` réduira efficacement le volume de l'emballage.
