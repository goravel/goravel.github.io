# Установка

## Требования к серверу

- Golang >= 1.21

## Установка

### Использование установщика Goravel

Initialize the installer according to the [documentation](https://github.com/goravel/installer), and then initialize a
new Goravel project using the following command:

```shell
// Введите директорию, где вы хотите установить проект
goravel новый блог
```

### Ручная установка

```shell
// Скачать фреймворк
git clone --depth=1 https://github.com/goravel/goravel.git && rm -rf goravel/. it*

// Устанавливаем зависимости
cd goravel && go mod tidy

// Создаём . nv конфигурационный файл окружения
cp .env.example .env

// Генерация ключа приложения
go run . artisan key:generate
```

## Запустить службу HTTP

### Запуск службы в соответствии с файлом .env в корневом каталоге

```shell
идите запустить .
```

### Укажите файл .env для запуска службы

```shell
запустить . --env=./.ruv
```

### Запустить службу с использованием переменных среды

```shell
APP_ENV=production APP_DEBUG=true идет запуск .
```

### Live reload

Install [cosmtrek/air](https://github.com/cosmtrek/air), Goravel has a built-in configuration file that can be used
directly:

```
воздух
```

Если вы используете систему Windows, вам нужно изменить `.air. oml` файл в корневом каталоге и добавьте `.exe`
к следующим двум строкам:

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "go build -o ./storage/temp/main.exe ."
```

## Конфигурация

### Файлы конфигурации

Все конфигурационные файлы среды Goravel находятся в папке `config`. Все элементы конфигурации имеют аннотации
, вы можете настроить их в соответствии с вашими потребностями.

### Сгенерировать ключ приложения

Вам нужно сгенерировать ключ приложения после того, как Goravel установлен локально. При запуске команды ниже будет сгенерирована 32-битная строка
на ключе `APP_KEY` в файле `.env`. Этот ключ используется в основном для шифрования и дешифрования данных.

```shell
запустить . artisan key:generate
```

### Сгенерировать JWT токен

Вам нужно сгенерировать JWT токен если вы используете [Authentication](../security/authentication).

```shell
go run . artisan jwt:secret
```
