# Compilar

## Compilar comando

El proyecto Goravel puede ser compilado con el siguiente comando:

```
// Seleccione el sistema para compilar
go run. artisan build

// Especifique el sistema para compilar
go run . artisan build --os=linux
go run . artisan build -o=linux

// Compilación estática
go run . artisan build --static
go run . artisan build -s

// Especifica el nombre del archivo de salida
go run . artisan build --name=goravel
go run . artisan build -n=goravel
```

## Compilación manual

### Compilación regular

```shell
vaya a compilar .
```

#### Desplegar servidor

Los siguientes archivos y carpetas deben ser subidos al servidor durante la implementación:

```
./main // Compila el archivo binario resultante
.env
./database
./public
./storage
./resources
```

### Compilación estática

El paquete por compilación regular también necesita contar con el apoyo del entorno de despliegue. los archivos compilados estáticamente
pueden ejecutarse libremente en la plataforma especificada sin configuración de entorno.

```shell
go build --ldflags "-extldflags -static" -o main .
```

### Compilación cruzada

La compilación es diferenciada por la plataforma, necesita seleccionar un método de compilación coincidente de acuerdo a la situación de despliegue
.

```shell
// Compile Linux environment
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compile Windows environment
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compile Mac environment
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Doctor

Goravel tiene un archivo `Dockerfile` y `docker-compose.yml`, puedes usarlo directamente, ten en cuenta que `APP_HOST` debería ser
`0.0.0.0` en este momento.

```shell
build de docker .
```

### Componer Docker

También puedes iniciar el servicio rápidamente con el siguiente comando:

```shell
construcción de docker-compose
docker-compose up
```

> Nota: Si necesita acceso externo, necesita cambiar APP_HOST a 0.0.0.0

## Reducir tamaño del paquete

Comentando el `ServiceProvider` no utilizado en `config/app.go::providers` reducirá efectivamente el volumen de empaque.
