# Weergaven

Natuurlijk is het niet praktisch om alle tekststrings van HTML-documenten rechtstreeks terug te geven van uw routes en controllers.
Gelukkig bieden weergaven een handige manier om al onze HTML in afzonderlijke bestanden te plaatsen. Bekijkt de controller /
toepassingslogica van uw presentatielogica en wordt opgeslagen in de `resources/views` map.

## Aanmaken & renderen weergaven

Wanneer je de Goravel standaard template `html/template` gebruikt, kun je bezoeken creëren door een bestand met de `.tmpl`
extensie toe te voegen in de applicatie `resources/views` map.

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Hello, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Na het aanmaken van de weergave, kunt u de 'Bekijk' methode gebruiken om de weergave te retourneren van een route of controller in de applicatie:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  retourneer ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Geneste weergave mappen

Weergaven kunnen ook worden genest binnen de submappen van de `resources/views` map. Bijvoorbeeld, als je weergave
wordt opgeslagen op `resources/views/admin/profiel. mpl`, je kunt het terugsturen vanaf een van de routes of controllers van je applicatie, noteer
dat de weergave moet worden gedefinieerd als `define "admin/profiel. mpl"` zoals hieronder getoond:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Welkom op het Admin Panel</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### Aanmaken van de eerste beschikbare weergave

Met de `First` methode kun je de eerste weergave gebruiken die bestaat in een groot aantal weergaven van de weergaven. Dit kan handig zijn als uw
toepassing of pakket het mogelijk maakt om weergaven aan te passen of te overschrijven:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### Bepalen of een weergave bestaat

Als u moet bepalen of een weergave bestaat, kunt u de `facades.View()` methode gebruiken:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Gegevens doorgeven aan weergaven

Zoals je hebt gezien in de vorige voorbeelden, kan je een reeks gegevens doorgeven aan weergaven om die gegevens beschikbaar te maken voor de weergave.
Let op: het formaat van de doorgegeven gegevens moet worden gewijzigd volgens de gebruikte template driver in het volgende
voorbeeld, met behulp van het standaard `html/template` driver:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  retourneer ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Gegevens delen met alle weergaven

Soms moet u gegevens delen met alle weergaven die door uw applicatie worden weergegeven. Je kunt dit doen met de
`Share` methode in `facades.View()`. Normaal gesproken moet je oproepen plaatsen naar de `Share` methode binnen een service provider's
`Boot` methode. U bent vrij om ze toe te voegen aan de `app/providers/app_service_provider.go` klasse of genereer een aparte
service provider om ze te wonen:

```go
package providers

import (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider bouwt {
}

func (ontvanger *AppServiceProvider) Register(app foundation. pplication) {
}

func (ontvanger *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
