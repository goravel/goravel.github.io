# Installatie

## Server Requirements

- Golang >= 1.21

## Installatie

### Gebruik Goravel Installer

Initialiseer het installatieprogramma volgens de [documentation](https://github.com/goravel/installer), en initialiseer vervolgens een
nieuw Goravel project met behulp van de volgende opdracht:

```shell
// Voer de map in waar u het project
goravel nieuwe blog wilt installeren
```

### Handmatige installatie

```shell
// Download framework
git clone --depth=1 https://github.com/goravel/goravel.git && rm -rf goravel/. *

// Installeer dependencies
cd goravel && go mod tidy

// Create . nv environment configuratiebestand
cp .env.example .env

// Generate application key
go run . artisan key:generate
```

## HTTP Service starten

### Service starten volgens het .env bestand in de Root Directory

```shell
ga uitvoeren .
```

### Specificeer .env bestand om service te starten

```shell
start . --env=./.env
```

### Start Service met Omgevingsvariabelen

```shell
APP_ENV=productie APP_DEBUG=true start .
```

### Live reload

Installeer [cosmtrek/air](https://github.com/cosmtrek/air), Goravel heeft een ingebouwd configuratiebestand dat direct kan worden gebruikt

```
lucht
```

Als je Windows systeem gebruikt, moet je de `.air aanpassen. oml` bestand in de hoofdmap en voeg de `.exe`
suffix toe aan de volgende twee regels:

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "ga build -o ./storage/temp/main.exe ."
```

## Configuratie

### Configuratiebestanden

Alle configuratiebestanden van het Goravel framework zijn geplaatst in de `config` map. Alle configuratie-items hebben
aantekeningen, u kunt ze aanpassen aan uw behoeften.

### Applicatiesleutel genereren

U moet de toepassingssleutel genereren nadat Goravel lokaal is geïnstalleerd. Het uitvoeren van de opdracht hieronder, zal een 32-bit string
worden gegenereerd op de `APP_KEY` sleutel in het `.env` bestand. Deze sleutel wordt voornamelijk gebruikt voor data versleuteling en decodering.

```shell
uitvoeren . artisan sleutel:genereer
```

### Genereer JWT Token

Je moet JWT Token genereren als je [Authentication](../security/authentication) gebruikt.

```shell
uitvoeren . artisan jwt:secret
```
