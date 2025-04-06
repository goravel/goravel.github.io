# Compilare

## Compilare comandă

Proiectul Goravel poate fi compilat cu următoarea comandă:

```
// Selectează sistemul pentru a compila
mergi să rulezi . artizan build

// Specifică sistemul pentru a compila
mergi să rulezi . ruleaza . artizan build -os=linux
ruleaza . artizan build -o=linux

// Compilarea statică
ruleaza . build artizan --static
mergi să rulezi . artizan build -s

// Specifică numele fișierului de ieșire
rulează . construcție artizană --name=goravel
rulați . artizan build n=goravel
```

## Compilare manuală

### Compilare regulată

```shell
mergi să construiești .
```

#### Lansează Server

Următoarele fișiere și dosare trebuie să fie încărcate pe server în timpul desfășurării:

```
./main // Compilează fișierul binar rezultat
.env
./database
./public
./storage
./resources
```

### Compilare statică

Pachetul de măsuri elaborate periodic trebuie, de asemenea, să se bazeze pe sprijinul acordat mediului de desfășurare; fișierele compilate static
pot fi puse liber pentru a rula pe platforma specificată fără configurare de mediu.

```shell
mergeţi să construiţi --ldflags "-extldflags -static" la main .
```

### Compilare încrucişată

Compilația este diferențiată pe platformă, trebuie să selectați o metodă de compilare corespunzătoare în funcție de situația de implementare
.

```shell
// Compilează mediul Linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compilează Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compilează mediul Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 mergi să construiești .
```

## Doctor

Goravel has a default `Dockerfile` and `docker-compose.yml` file, you can use it directly, note that `APP_HOST` should
be `0.0.0.0` at this time.

```shell
docker build .
```

### Compunere Docker

De asemenea, poți porni rapid serviciul cu următoarea comandă:

```shell
compunere docker-compose
docker-compose
```

> Notă: Dacă aveți nevoie de acces extern, trebuie să schimbați APP_HOST la 0.0.0.0

## Reduce dimensiunea pachetului

Comentând `ServiceProvider` neutilizat în `config/app.go::providers` va reduce efectiv volumul de ambalare.
