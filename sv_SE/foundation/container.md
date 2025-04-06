# Service Behållare

Goravel service container är ett kraftfullt verktyg för att hantera klassberoenden och utföra beroendeinjektion. Det
innehåller alla moduler i Goravel, och låter dig binda dina egna tjänster till behållare och lösa dem när det behövs.
Tjänsten container ger kraftfullt stöd för tredjepartspaket runt Goravel.

## Bindning

### Enkla bindningar

Nästan alla dina bindningar för behållare kommer att registreras inom [tjänsteleverantörer](./providers).
Inom en tjänsteleverantör har du alltid tillgång till behållaren via `app`-parametern, registrera sedan en bindande
med hjälp av `Bind`-metoden, passerar `key` som vi vill registrera tillsammans med en stängning som returnerar en instans av
klassen:

```go
paketväg

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

type ServiceProvider struct {
}

func (route *ServiceProvider) Register(app foundation. pplication) {
 app.Bind(Bindning, funktion (app foundation.Application) (några, fel) {
  returnera NewRoute (app. akeConfig()), nil
 })
}

func (route *Serviceleverantör) Boot(app foundation.Application) {

}
```

Som nämnts, kommer du vanligtvis att interagera med containern inom tjänsteleverantörer; Men om du vill att
ska interagera med behållaren utanför en tjänsteleverantör kan du göra det via `App`-fasaden:

```go
fasades.App().Bind("key", funktion (app foundation.Application) (någon, fel) {
    ...
})
```

### Bindning av en singel

`Singleton`-metoden binder en klass eller ett gränssnitt till behållaren som endast bör lösas en gång. När en
singleton bindning är löst, samma objektinstans kommer att returneras på efterföljande samtal till behållaren:

```go
app.Singleton(nyckel, funktion (app foundation.Application) (någon, fel) {
    returnera NewGin(app.MakeConfig()), nil
})
```

### Bindande instanser

Du kan också binda en befintlig objektinstans i behållaren med hjälp av `Instance`-metoden. Den givna instansen kommer
alltid att returneras vid efterföljande samtal till behållaren:

```go
app.Instance(nyckel, instans)
```

### Bindning med parameter

Om du behöver några extra parametrar för att konstruera tjänsteleverantören kan du använda `BindWith`-metoden för att skicka
parametrar till stängningen:

```go
app.BindWith(Binding, func(app foundation.Application, parametrar karta[string]any) (någon, fel) {
    returnera NewRoute(app.MakeConfig()), nil
})
```

## Löser

### `Make`-metoden

Du kan använda `Make`-metoden för att lösa en klassinstans från behållaren. `Make`-metoden accepterar `key` du
vill lösa:

```go
exempel, err := app.Make(nyckel)
```

Om du är utanför en tjänsteleverantör på en plats av din kod som inte har tillgång till `app`-variabeln, du
kan använda fasaden `App` för att lösa en klass-instans från behållaren:

```go
exempel, err := fasader.App().Make(nyckel)
```

### `MakeWith`-metoden

Om några av dina klassberoenden inte går att lösa via behållaren, du kan injicera dem genom att skicka dem som en
associativ array till `MakeWith`-metoden, som motsvarar `BindWith`-bindningsmetoden:

```go
exempel, err := app.MakeWith(nyckel, karta[string]any{"id": 1})
```

### Andra metoder

Ramverket ger några praktiska metoder för att snabbt lösa olika fasader: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
