# Запросить жизненный цикл

Файл `main.go` служит отправной точкой для всех запросов в приложении Горавел. Для инициализации фреймворка используется функция
`bootstrap.Boot()`.

Затем экземпляр Goravel создается `app := foundation.NewApplication()` в `bootstrap/app.go`.

После этого используйте `app.Boot()` для загрузки [Service Provider](providers) зарегистрированных и `config.Boot()` для
загрузить конфигурационные файлы в директорию конфигурации.

Наконец, запустите HTTP-сервер используя `facades.Route().Run(facades.Config().GetString("app.host")` в `main.go`.
