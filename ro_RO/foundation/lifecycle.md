# Solicită Lifecycle

Fișierul `main.go` servește ca punct de intrare pentru toate cererile din aplicația Goravel. Utilizează funcția
`bootstrap.Boot()` pentru a inițializa framework-ul.

Apoi o instanță Goravel este creată de `app := foundation.NewApplication()` în `bootstrap/app.go`.

After this, use `app.Boot()` to load the [Service Provider](providers) registered, and `config.Boot()` to
load the configuration files under the config directory.

În cele din urmă, porniți serverul HTTP folosind `facades.Route().Run(facades.Config().GetString("app.host"))` în `main.go`.
