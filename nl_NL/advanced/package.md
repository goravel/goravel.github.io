# Pakket ontwikkeling

Pakketten zijn de primaire manier om functionaliteit toe te voegen aan Goravel. Deze pakketten kunnen routes, controllers en
configuraties bevatten die specifiek ontworpen zijn om een Goravel applicatie te verbeteren. Deze handleiding richt zich op het ontwikkelen van
Goravel-specifieke pakketten.

Hier is een voorbeeld voor het bouwen van een derde partij
pakket: [goravel/example-package](https://github.com/goravel/example-package)

## Een pakket maken

Je kunt eenvoudig een package template maken met behulp van de Artisan opdracht:

```shell
uitvoeren . artisan make:package sms
```

De aangemaakte bestanden worden standaard opgeslagen in de root `packages` map, je kan `--root` optie gebruiken om het aan te passen:

```shell
uitvoeren . artisan make:package --root=pkg sms
```

## Service providers

[Service providers](../foundation/providers) fungeert als de brug tussen uw pakket en Goravel.
Ze bevinden zich meestal in de hoofdmap van het pakket als een `service_provider.go` bestand. Hun belangrijkste functie is het koppelen van
items aan Goravel's service container en Goravel bij het laden van pakketbronnen.

## Gebruik

Registreer de `ServiceProvider` in het pakket naar `config/app.go:providers`, exporteer dan `facades` naar de applicatie.
Voor gedetailleerde stappen, ga naar [goravel/example-package](https://github.com/goravel/example-package).

## Hulpmiddelen

### Configuratie

Meestal moet je het configuratiebestand van je pakket publiceren naar de `config` map van de applicatie. Dit zal
toestaan dat gebruikers van uw pakket eenvoudig uw standaard configuratieopties overschrijven. Om configuratiebestanden
te laten worden gepubliceerd, roep je de 'Publicatie' methode op van de 'Boot' methode van je serviceprovider, de eerste parameter is de naam van het pakket
en de tweede parameter is de mapping tussen het huidige bestandspad van het pakket en het projectpad:

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", kaart[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Routes

Als er [routes](../basic/routing) in je pakket zitten, kun je `app.MakeRoute()` gebruiken om
`facades.Route()` op te lossen en de routes naar het project toevoegen:

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migraties

Als er [migrations](../orm/migrations) in je pakket zit, kun je ze publiceren via de `Publicaties` methode:

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", kaart[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Opdrachten

Je kunt het `Artisan` commando registreren door de `Commands` methode, je kunt de commando's
uitvoeren met [Artisan CLI](../advanced/artisan) nadat je ze hebt geregistreerd.

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Openbare activa

Je pakket kan assets hebben zoals JavaScript, CSS en afbeeldingen. Om deze assets te publiceren naar de `publiek`
directory, gebruik de service provider `Publishes` methode:

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", kaart[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Publiceren van bestandsgroepen

Als u specifieke groepen van pakketproducten en bronnen apart wilt publiceren, je kan tags gebruiken om de
'Publishes' methode aan te roepen van de service provider van het pakket. Dit stelt je in staat gebruikers de optie te geven om bepaalde
bestanden, zoals configuratiebestanden, te publiceren, zonder alle activa van het pakket te hoeven publiceren. Om te illustreren, je kan twee
publiceren groepen voor het `sms-config` pakket (`sms-config` en `sms-migrations`) met behulp van tags in de `Boot` methode van het
pakket provider.

```go
func (ontvanger *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("migraties"),
  }, "sms-migrations")
}
```

## Publiceer bronnen

In het project kun je bronnen publiceren die geregistreerd zijn in een pakket met behulp van `vendor:publish` Artisan commando:

```shell
ga uitvoeren. artisan vendor:publiceren --package={You package name}
```

Het commando kan de volgende opties gebruiken:

| Optie naam  | Alias | actie                                                                                                                                                                                                                                                                                             |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --pakket    | -p    | De pakketnaam kan een remote pakket zijn: `github.com/goravel/example-package`, en kan ook een lokaal pakket zijn: `. packages/example-package`, houd er rekening mee dat wanneer je een lokale pakketnaam gebruikt, deze moet beginnen met `./`. |
| --label     | -t    | Resource groep                                                                                                                                                                                                                                                                                    |
| --team      | -f    | Overschrijf bestaande bestanden                                                                                                                                                                                                                                                                   |
| --bestaande | -e    | Publiceer en overschrijf alleen de bestanden die al gepubliceerd zijn                                                                                                                                                                                                                             |
