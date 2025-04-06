# Service container

De Goravel service container is een krachtig hulpmiddel voor het beheer van afhankelijkheid van klasse en het uitvoeren van afhankelijkheid injecties. Het
bevat alle modules van Goravel, en stelt je in staat om je eigen diensten te binden aan container en op te lossen indien nodig.
De service container biedt krachtige ondersteuning voor derden pakketten rond Goravel.

## Koppelen

### Eenvoudige Bindingen

Bijna al uw service containerbindingen worden geregistreerd bij [serviceproviders](./providers).
Binnen een serviceprovider heb je altijd toegang tot de container via de `app` parameter, registreer dan een bindende
met behulp van de `Bind` methode. het doorgeven van de `sleutel` die we willen registreren samen met een sluiting die een exemplaar van de
-klasse retourneert:

```go
package route

import (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

type ServiceProvider bouwt {
}

func (route *ServiceProvider) Register(app foundation. pplicatie{
 app.Bind(Binding, functie (app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Zoals gezegd, zal je meestal interactie hebben met de container binnen de serviceproviders; Als je
echter interactie wilt met de container buiten een serviceprovider, kan je dit doen via de `App` facade:

```go
facades.App().Bind("sleutel", functie(app foundation.Application) (any, error) {
    ...
})
```

### Binden aan een singleton

De 'Singleton' methode verbindt een class of interface met de container die maar één keer opgelost kan worden. Zodra een
singleton binding is opgelost, zal dezelfde object instantie worden teruggestuurd bij volgende oproepen in de container:

```go
app.Singleton(sleutel, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Bindende instanties

U kunt ook een bestaande object instantie koppelen aan de container met behulp van de `Instance` methode. De ingestelde instantie
zal altijd teruggestuurd worden bij volgende oproepen in de container:

```go
app.Instance(sleutel, instantie)
```

### Binden met parameter

Als u extra parameters nodig heeft om de service provider te bouwen, kunt u de `BindWith` methode gebruiken om
parameters door te geven aan de sluiting:

```go
app.BindWith(Binding, functie(app foundation.Application, parameters kaart[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Oplossen

### De `Make` methode

Je kunt de `Make` methode gebruiken om een class instance uit de container op te lossen. De `Make` methode accepteert de `sleutel` die je
wil oplossen:

```go
bijvoorbeeld err := app.Make(sleutel)
```

Als je buiten een service provider zit op een locatie van je code die geen toegang heeft tot de `app` variabele, jij
mag de `App` facade gebruiken om een class instance van de container op te lossen:

```go
bijvoorbeeld err := facades.App().Make(sleutel)
```

### De `MakeWith` methode

Als sommige afhankelijkheden van je klas niet kunnen worden opgelost met de container, je kan ze injecteren door ze te passeren als een
associatief array in de `MakeWith` methode, overeenkomend met de `BindWith` bindende methode:

```go
bijvoorbeeld: err := app.MakeWith(key, map[string]any{"id": 1})
```

### Andere methoden

Het framework biedt enkele handige methoden om snel verschillende facades op te lossen: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
