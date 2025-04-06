# Begär livscykel

Filen 'main.go' fungerar som startpunkt för alla förfrågningar i Goravel-programmet. Den använder funktionen
`bootstrap.Boot()` för att initiera ramverket.

Sedan skapas en Goravel-instans av `app:= foundation.NewApplication()` i `bootstrap/app.go`.

Efter detta, använd `app.Boot()` för att ladda [Tjänsteleverantör](providers) registrerad, och `config.Boot()` till
ladda konfigurationsfilerna under konfigurationskatalogen.

Slutligen, starta HTTP-servern med `facades.Route().Run(facades.Config().GetString("app.host")` i `main.go`.
