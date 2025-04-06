# Kompilera

## Kompilera kommando

Goravel-projektet kan sammanställas med följande kommando:

```
// Välj systemet för att kompilera
gå kör. hantverkare bygga

// Ange systemet för att kompilera
gå köra . hantverkarbygget --os=linux
går att köra. hantverkarbygg -o=linux

// Statisk sammanställning
gå att köra. hantverkare bygga --static
gå att köra. hantverkare bygga -s

// Ange utdatafilnamnet
gå att köra. hantverkare bygga --name=goravel
gå köra . hantverkare bygga -n=goravel
```

## Manuell sammanställning

### Vanlig sammanställning

```shell
gå och bygg .
```

#### Distribuera server

Följande filer och mappar måste laddas upp till servern under driftsättning:

```
./main // Kompilera den resulterande binära filen
.env
./databas
./public
./storage
./resources
```

### Statisk sammanställning

Paketet genom regelbunden sammanställning måste också förlita sig på stöd från utplaceringsmiljön, de statiskt
kompilerade filerna kan fritt köras på den angivna plattformen utan miljökonfiguration.

```shell
gå och bygg --ldflags "-extldflags -static" -o main .
```

### Kors kompilera

Sammanställning är differentierad med plattform, du måste välja en matchande sammanställning metod enligt utbyggnaden
situation.

```shell
// Kompilera Linuxmiljö
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Kompilera Windows-miljö
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Kompilera Mac-miljö
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Docker

Goravel har en standard `Dockerfile` och `docker-compose.yml`-fil, du kan använda den direkt, notera att `APP_HOST` borde
vara `0.0.0.0` just nu.

```shell
byggmästare .
```

### Docker komponera

Du kan också snabbt starta tjänsten med följande kommando:

```shell
docker-komponera bygga
docker-komponera upp
```

> Obs: Om du behöver extern åtkomst måste du ändra APP_HOST till 0.0.0.0

## Minska paketstorlek

Kommentera den oanvända `ServiceProvider` i `config/app.go::providers` kommer effektivt att minska förpackningsvolymen.
