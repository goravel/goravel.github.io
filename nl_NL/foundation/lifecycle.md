# Lifecycle aanvragen

Het `main.go` bestand dient als invoerpunt voor alle aanvragen in de Goravel applicatie. Het maakt gebruik van de
`bootstrap.Boot()` functie om het framework te initialiseren.

Vervolgens wordt een Goravel instantie gemaakt door `app := foundation.NewApplication()` in `bootstrap/app.go`.

Na dit gebruik `app.Boot()` om de [Service Provider](providers) geregistreerd, en `config.Boot()` om
de configuratiebestanden onder de config directory te laden.

Begin tot slot de HTTP-server met het gebruik van `facades.Route().Run(facades.Config().GetString("app.host")` in `main.go`.
