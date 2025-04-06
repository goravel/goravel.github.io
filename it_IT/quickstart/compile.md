# Compila

## Comando di compilazione

Il progetto Goravel può essere compilato con il seguente comando:

```
// Seleziona il sistema per compilare
go run . artisan build

// Specifica il sistema per compilare
go run . artisan build --os=linux
go run . artisan build -o=linux

// Static compilation
go run . artisan build --static
go run . artisan build -s

// Specifica il nome del file di output
go run . artisan build --name=goravel
go run . artisan build -n=goravel
```

## Compilazione manuale

### Compilazione regolare

```shell
andare a costruire.
```

#### Deploy Server

I seguenti file e cartelle devono essere caricati sul server durante la distribuzione:

```
./main // Compila il file binario
.env
./database
./public
./storage
./resources
```

### Compilazione statica

Il pacchetto mediante compilazione regolare deve anche basarsi sul sostegno dell'ambiente di spiegamento, i file compilati staticamente
possono essere messi liberamente per essere eseguiti sulla piattaforma specificata senza configurazione di ambiente.

```shell
go build --ldflags "-extldflags -static" -o main .
```

### Compilazione incrociata

La compilazione è differenziata per piattaforma, è necessario selezionare un metodo di compilazione corrispondente in base alla situazione di distribuzione
.

```shell
// Compila l'ambiente Linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compila l'ambiente Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compila l'ambiente Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Docker

Goravel ha un file `Dockerfile` e `docker-compose.yml`, puoi usarlo direttamente, nota che `APP_HOST` dovrebbe
essere `0.0.0` in questo momento.

```shell
docker build .
```

### Composizione Docker

È inoltre possibile avviare rapidamente il servizio con il seguente comando:

```shell
docker-compose build
docker-compose up
```

> Nota: Se hai bisogno di accesso esterno, devi cambiare APP_HOST a 0.0.0.0

## Riduci dimensione pacco

Commentare il file `ServiceProvider` inutilizzato in `config/app.go::providers` ridurrà efficacemente il volume di imballaggio.
