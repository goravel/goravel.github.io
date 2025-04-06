# Visningar

Naturligtvis är det inte praktiskt att returnera hela HTML-dokumentsträngar direkt från dina rutter och styrenheter.
Tack och lov, vyer ger ett bekvämt sätt att placera alla våra HTML i separata filer. Vyer separerar din styrenhet /
applikationslogik från din presentation logik och lagras i `resources/views`-katalogen.

## Skapa & Rendera vyer

När du använder Goravels standardmall `html/template`, kan du skapa vyer genom att lägga till en fil med `.tmpl`
tillägget i applikationens `resources/views`-katalog.

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Hej, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Efter att du skapat vyn kan du använda `View`-metoden för att returnera vyn från en rutt eller styrenhet i applikationen:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Inkapslade vykataloger

Visningar kan också vara kapslade i underkataloger i katalogen `resources/views`. Till exempel, om din vy lagras
på `resources/views/admin/profile. mpl`, du kan returnera den från en av applikationens rutter eller kontrollanter, notera
att vyn måste definieras som `define "admin/profile. mpl"` som visas nedan:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Välkommen till Admin Panel</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", karta[string]any{
  "name": "Goravel",
})
```

### Skapa den första tillgängliga vyn

Med hjälp av `First`-metoden kan du använda den första vyn som finns i en given samling vyer. Detta kan vara användbart om din
applikation eller paket tillåter vyer att anpassas eller skrivas om:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, karta[string]any{
  "name": "Goravel",
})
```

### Bestämma om en vy finns

Om du behöver bestämma om en vy finns, kan du använda `facades.View()` -metoden:

```go
om fasader.View().Exist("welcome.tmpl") {
  // ...
}
```

## Skicka data till visningar

Som du såg i de tidigare exemplen, kan du skicka en rad data till vyer för att göra dessa data tillgängliga för vyn.
Vänligen notera, formatet på de passerade data måste ändras enligt mallen drivrutinen som används, i följande
exempel, med standard-`html/template`-drivrutinen:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Dela data med alla vyer

Ibland kan du behöva dela data med alla vyer som återges av din applikation. Du kan göra det med hjälp av
`Share`-metoden i `facades.View()`. Vanligtvis bör du placera samtal till `Share`-metoden inom en tjänsteleverantörs
`Boot`-metod. Du kan lägga till dem till klassen `app/providers/app_service_provider.go` eller generera en separat
tjänsteleverantör för att hysa dem:

```go
paketleverantörer

import (
 "github.com/goravel/frameing/contracts/foundation"
    "github. om/goravel/frameing/facades"
)

type AppServiceProvider struct {
}

func (receiver *AppServiceProvider) Register(app foundation. pplication) {
}

func (receiver *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
