# Installation

## Serverkrav

- Golang >= 1.21

## Installation

### Använder Goravel Installer

Initiera installationsprogrammet enligt [documentation](https://github.com/goravel/installer) och initiera sedan ett
nytt Goravel-projekt med följande kommando:

```shell
// Ange katalogen där du vill installera projektet
goravel ny blogg
```

### Manuell installation

```shell
// Hämta ramverk
git clone --depth=1 https://github.com/goravel/goravel.git && rm -rf goravel/. it*

// Installera beroenden
cd goravel && go mod tidy

// Create . nv miljö konfigurationsfil
cp .env.example .env

// Generera applikationsnyckeln
go run . hantverksnyckel:generate
```

## Starta HTTP-tjänst

### Starta tjänsten enligt .env fil i rotkatalogen

```shell
gå kör.
```

### Ange .env fil att starta tjänsten

```shell
kör . --env=./.env
```

### Starta tjänsten med hjälp av miljövariabler

```shell
APP_ENV=production APP_DEBUG=true go run .
```

### Live reload

Installera [cosmtrek/air](https://github.com/cosmtrek/air), Goravel har en inbyggd konfigurationsfil som kan användas
direkt:

```
luft
```

Om du använder Windows-systemet, måste du ändra `.air. oml`-filen i rotkatalogen och lägg till `.exe`
suffix till följande två rader:

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "go build -o ./storage/temp/main.exe ."
```

## Konfiguration

### Konfigurationsfiler

Alla konfigurationsfiler i Goravels ramverk placeras i `config`-katalogen. Alla konfigurationsobjekt har
anteckningar, du kan justera dem efter dina behov.

### Skapa applikationsnyckel

Du måste generera applikationsnyckeln efter att Goravel är installerad lokalt. Kör kommandot nedan, kommer en 32-bitars sträng
att genereras på `APP_KEY`-nyckeln i `.env`-filen. Denna nyckel används främst för datakryptering och dekryptering.

```shell
gå kör. hantverksnyckel:generera
```

### Generera JWT-token

Du måste generera JWT-token om du använder [Authentication](../security/authentication).

```shell
gå springa. hantverkare jwt:secret
```
