# Compileren

## Opdracht compileren

Het Goravel project kan worden gecompileerd met het volgende commando:

```
// Selecteer het systeem om
te compileren. Start . artisan build

// Specificeer het systeem om
te compileren ga uit. artisan build --os=linux
go run . artisan build -o=linux

// Statische compilatie
go run . artisan build --statische
go run . artisan build -s

// Specificeer de output file name
go run . artisan build --name=goravel
ga uit. artisan build -n=goravel
```

## Handmatige compilatie

### Normaal compilatie

```shell
ga bouwen .
```

#### Server implementeren

De volgende bestanden en mappen moeten worden geüpload naar de server tijdens de implementatie:

```
./main // Compile het resulterende binaire bestand
.env
./database
./public
./storage
./resources
```

### Statische compilatie

Het pakket door middel van regelmatige compilatie moet ook gebaseerd zijn op de ondersteuning van de werkomgeving. de statisch
gecompileerde bestanden kunnen vrij op het opgegeven platform worden uitgevoerd zonder omgevingsconfiguratie.

```shell
ga bouwen--ldflags "-extldflags -static" -o main .
```

### Cross compileer

Compilatie is gedifferentieerd per platform, u moet een overeenkomende compilatiemethode selecteren volgens de deployment
situatie.

```shell
// Compile Linux environment
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compile Windows environment
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compile Mac omgeving
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 ga build .
```

## Docker

Goravel heeft een standaard `Dockerfile` en `docker-compose.yml` bestand, je kan het direct gebruiken, noteer dat `APP_HOST` moet
op dit moment `0.0.0` zijn.

```shell
docker maken .
```

### Docker opstellen

Je kunt ook snel de service starten met de volgende opdracht:

```shell
docker-compose build
docker-compose omhoog
```

> Opmerking: Als je externe toegang nodig hebt, moet je APP_HOST veranderen naar 0.0.0

## Verkleinen verpakkingsgrootte

Commentaar voor de ongebruikte `ServiceProvider` in `config/app.go:providers` zal het verpakkingsvolume effectief verminderen.
