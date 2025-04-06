# Kompilieren

## Befehl kompilieren

Das Goravel-Projekt kann mit dem folgenden Befehl kompiliert werden:

```
// Wählen Sie das zu kompilierende System
go run . artisan build

// Geben Sie das System an, um es zu kompilieren
go run . artisan build --os=linux
go run . artisan build -o=linux

// Statische Kompilierung
go run . artisan build --static
go run . artisan build -s

// Geben Sie den Dateinamen
go run an. artisan build --name=goravel
go run . artisan build -n=goravel
```

## Manuelle Kompilierung

### Normale Kompilierung

```shell
gehe Build .
```

#### Deploy-Server

Die folgenden Dateien und Ordner müssen während des Bereitstellens auf den Server hochgeladen werden:

```
./main // Die resultierende Binärdatei
.env
./Datenbank
./public
./storage
./resources kompilieren
```

### Statische Kompilierung

Das Paket durch regelmäßige Kompilierung muss sich auch auf die Unterstützung der Bereitstellungsumgebung verlassen die statisch
kompilierten Dateien können ohne Umgebungskonfiguration frei auf der angegebenen Plattform ausgeführt werden.

```shell
go build --ldflags "-extldflags -static" -o main .
```

### Cross-Kompilierung

Die Kompilierung wird nach Plattform unterschieden. Sie müssen eine passende Kompilierungsmethode entsprechend der
Situation auswählen.

```shell
// Compile Linux environment
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compile Windows environment
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compile Mac environment
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Docker

Goravel has a default `Dockerfile` and `docker-compose.yml` file, you can use it directly, note that `APP_HOST` should
be `0.0.0.0` at this time.

```shell
docker build .
```

### Docker komponieren

Sie können den Dienst auch schnell mit dem folgenden Befehl starten:

```shell
docker-compose build
docker-compose up
```

> Notiz: Wenn Sie externen Zugriff benötigen, müssen Sie APP_HOST auf 0.0.0 ändern

## Paketgröße verkleinern

Das Kommentieren des ungenutzten `ServiceProvider` in `config/app.go::providers` wird das Paketvolumen effektiv reduzieren.
