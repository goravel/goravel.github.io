# Solicitar ciclo de vida

El archivo `main.go` sirve como punto de entrada para todas las peticiones en la aplicación Goravel. Utiliza la función
`bootstrap.Boot()` para inicializar el framework.

Entonces una instancia de Goravel es creada por `app := foundation.NewApplication()` en `bootstrap/app.go`.

After this, use `app.Boot()` to load the [Service Provider](providers) registered, and `config.Boot()` to
load the configuration files under the config directory.

Finalmente, inicia el servidor HTTP usando `facades.Route().Run(facades.Config().GetString("app.host"))` en `main.go`.
