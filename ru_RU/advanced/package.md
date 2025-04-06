# Разработка пакета

Пакеты являются основным способом добавления функций в Goravel. Эти пакеты могут содержать маршруты, контроллеры и
конфигурации, специально разработанные для улучшения приложения Goravel. This guide focuses on developing
Goravel-specific packages.

Вот пример сборки пакета
третьей стороны: [goravel/example-package](https://github.com/goravel/example-package)

## Создание пакета

Вы можете легко использовать для создания шаблона пакета, используя команду Artisan:

```shell
запускать . artisan make:package sms
```

Созданные файлы сохраняются по умолчанию в корневой папке `packages`, вы можете использовать параметр `--root` для настройки:

```shell
запустить . artisan make:package --root=pkg смс
```

## Поставщики услуг

[Поставщики услуг](../foundation/providers) выступают в качестве моста между вашим пакетом и Goravel.
Обычно они расположены в корне пакета как файл `service_provider.go`. Their main function is to bind
items into Goravel's service container and guide Goravel in loading package resources.

## Использование

Зарегистрируйте `ServiceProvider` в пакете в `config/app.go::providers`, затем экспортируйте `facades` в приложение.
Подробные шаги смотрите в [goravel/example-package](https://github.com/goravel/example-package).

## Ресурсы

### Конфигурация

Обычно вам нужно будет опубликовать конфигурационный файл вашего пакета в директорию `config` приложения. This will
allow users of your package to easily override your default configuration options. To allow your configuration files to
be published, call the `Publishes` method from the `Boot` method of your service provider, the first parameter is the
package name, and the second parameter is the mapping between the current package file path and the project path:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Маршруты

Если в вашем пакете есть [routes](../basic/routing), вы можете использовать `app.MakeRoute()`, чтобы разрешить
`facades.Route()`, а затем добавить маршруты к проекту:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Миграции

Если в вашем пакете есть [migrations](../orm/migrations), вы можете опубликовать их методом `Publishes`:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Команды

Вы можете зарегистрировать команду `Artisan` методом `Commands`, вы можете запустить команды
используя [Artisan CLI](../advanced/artisan) после их регистрации.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Публичные активы

Ваш пакет может иметь такие активы, как JavaScript, CSS и изображения. Чтобы опубликовать эти активы в директорию `public`
приложения, используйте метод `Publishes` поставщика услуг:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Публикация групп файлов

Если вы хотите опубликовать конкретные группы пакетов и ресурсов отдельно, можно использовать теги при вызове метода
`Publishes` из поставщика услуг пакета. Это позволяет пользователям публиковать определённые
файлы, такие как конфигурационные файлы, без публикации всех активов пакета. Для иллюстрации, вы можете определить две
опубликовать группы для пакета `sms` (`sms-config` и `sms-migrations`), используя тэги в методе `Boot` поставщика услуг пакета
.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("миграции"),
  }, "sms-миграции")
}
```

## Опубликовать ресурсы

В проекте Вы можете опубликовать зарегистрированные ресурсы в пакете, используя команду `vendor:publish` Artisan:

```shell
выполнить . artisan vendor:publish --package={You package name}
```

Команда может использовать следующие параметры:

| Название опции | Alias | Действие                                                                                                                                                                                                                                                                                         |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| --пакет        | -п    | Имя пакета может быть удаленным пакетом: `github.com/goravel/example-package`, а также может быть локальным пакетом: `. packages/example-package`, обратите внимание, что при использовании имени локального пакета он должен начинаться с `./`. |
| --тег          | -т    | Группа ресурсов                                                                                                                                                                                                                                                                                  |
| --сила         | -f    | Перезаписать существующие файлы                                                                                                                                                                                                                                                                  |
| --существующий | -е    | Опубликовать и перезаписать только те файлы, которые уже были опубликованы                                                                                                                                                                                                                       |
