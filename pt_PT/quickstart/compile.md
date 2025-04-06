# Compilar

## Compilar comando

O projeto Goravel pode ser compilado com o seguinte comando:

```
// Selecione o sistema para compilar
go run . artisan build

// Especifique o sistema para compilar
go run . artisan build --os=linux
go run . artisan build -o=linux

// Compilação estática
go run . build --static
go run . artisan build -s

// Especifique o nome do arquivo de saída
go run . build --name=goravel
vai executar . artisan build -n=goravel
```

## Compilação manual

### Compilação regular

```shell
ir construir.
```

#### Servidor de implantação

Os seguintes arquivos e pastas precisam ser enviados para o servidor durante a implantação:

```
./main // Compilar o arquivo binário resultante
.env
./database
./public
./storage
./recursos
```

### Compilação estática

The package by regular compilation also needs to rely on the support of the deployment environment, the statically
compiled files can be freely put to run on the specified platform without environment configuration.

```shell
vá construir --ldflags "-extldflags -static" -o principal.
```

### Compilação cruzada

Compilation is differentiated by platform, you need to select a matching compilation method according to the deployment
situation.

```shell
// Compilar o ambiente Linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Compilar ambiente Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Compile Mac environment
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Atracador

Goravel has a default `Dockerfile` and `docker-compose.yml` file, you can use it directly, note that `APP_HOST` should
be `0.0.0.0` at this time.

```shell
build do docker.
```

### Composição do Docker

Você também pode iniciar o serviço rapidamente com o seguinte comando:

```shell
docker-compõe a build
docker-compose
```

> Nota: Se você precisa de acesso externo, você precisa alterar o APP_HOST para 0.0.0

## Reduzir tamanho do pacote

Comentar o `ServiceProvider` não utilizado em `config/app.go::providers` reduzirá efetivamente o volume da embalagem.
