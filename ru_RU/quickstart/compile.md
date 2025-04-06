# Компиляция

## Команда компиляции

Проект Goravel может быть скомпилирован следующей командой:

```
// Выберите систему для компиляции
запуска. artisan build

// Укажите систему для компиляции
go run . artisan build --os=linux
go run . artisan build -o=linux

// Статическая компиляция
go run . artisan build --static
go run . artisan build -s

// Укажите имя выходного файла
go run . artisan build --name=goravel
идет запуск . artisan build -n=goravel
```

## Ручная компиляция

### Регулярная компиляция

```shell
перейти к сборке .
```

#### Установка сервера

Следующие файлы и папки должны быть загружены на сервер во время установки:

```
./main // Компиляция получаемого бинарного файла
.env
./database
./public
./storage
./resources
```

### Статическая компиляция

The package by regular compilation also needs to rely on the support of the deployment environment, the statically
compiled files can be freely put to run on the specified platform without environment configuration.

```shell
go build --ldflags "-extldflags -static" -o main .
```

### Перекрестная компиляция

Compilation is differentiated by platform, you need to select a matching compilation method according to the deployment
situation.

```shell
// Компилируем среду Linux
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build .

// Компилируем среду Windows
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

// Компилируем среду Mac
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build .
```

## Докер

Goravel has a default `Dockerfile` and `docker-compose.yml` file, you can use it directly, note that `APP_HOST` should
be `0.0.0.0` at this time.

```shell
сборка docker .
```

### Докер Составление

Вы также можете быстро запустить службу следующей командой:

```shell
docker-compose build
docker-compose up
```

> Примечание: Если вам нужен внешний доступ, вам нужно изменить APP_HOST на 0.0.0.0

## Уменьшить размер упаковки

Комментирование неиспользуемого `ServiceProvider` в папке `config/app.go::providers` позволит эффективно уменьшить объем упаковки.
