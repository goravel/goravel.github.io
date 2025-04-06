# Fabrieken

Bij het testen van uw applicatie of het uploaden van uw database, kan het nodig zijn om vooraf een paar records in uw database
in te voegen. In plaats van handmatig invoeren van waarden voor elke kolom, Goravel geeft je de mogelijkheid om een set standaard
attributen te definiëren voor elk van je modellen door modelfabrieken te creëren.

Om een voorbeeld te zien van hoe je een fabriek schrijft, kun je het `user_factory.go` bestand in de
`database/factories` map van je applicatie bekijken.

```go
pakket fabrieken

type UserFactory struct {
}

// Definitie van het model de standaard staat.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Naam": "Goravel",
  }
}
```

Zoals je kunt zien, zijn fabrieken in hun meest elementaire vorm gebouwd met een 'Definition'-methode. De methode geeft de
standaard set van attribuutwaarden die moet worden gebruikt bij het maken van een model met de fabriek. Om een reeks
willekeurige gegevens te genereren, kunt u vertrouwen op [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Fabrieken genereren

Om een fabriek te maken, voer het `make:factory` Artisan commando uit:

```
uitvoeren . artisan make:factory PostFactory
```

De nieuwe fabriek `struct` zal worden geplaatst in uw `database/factories` map.

### Model & Fabriek Discovery-conventies

Na het definiëren van een fabriek kun je de methode 'Fabriek' gebruiken om de fabriek aan het model te koppelen:

```go
pakket modellen

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/fabrieken"
)

type gebruiker {
  orm maakt. odel
  Naam tekenreeks
  Avatar tekenreeks
  of m. oftDeletes
}

func (u *User) Factory() fabriek.Factory {
  retourneer &factories.UserFactory{}
}
```

## Aanmaken van modellen met behulp van fabrieken

### Geïnstantieerde modellen

We kunnen de `Make` methode gebruiken om modellen te maken zonder ze te blijven vasthouden in de database:

```go
var user models.User
err := facades.Orm().Factory().Make(&user)
```

Je kunt een verzameling van vele modellen maken met de `Count` methode:

```go
gebruikers []modellen.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Als je een aantal van de standaard waarden van je modellen wilt overschrijven, kan je `map[string]any` passeren aan de `Make`
methode. Alleen de opgegeven attributen worden vervangen zolang de rest van de attributen ingesteld blijft op hun standaard
waarden zoals gespecificeerd door de fabriek:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Persisterende Modellen

De `Create` methode maakt en slaat modellen instanties op in de database met behulp van de `Opslaan` methode.

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Je kunt de standaard modelattributen van de fabriek overschrijven door `map[string]any` te passeren van de attributen aan de `Create`
methode:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Negeer Model Event

Er kan [model event] (../orm/quickstart#events) gedefinieerd zijn op het model, je kan deze gebeurtenissen negeren met de
`CreateQuietly` methode:

```go
var user models.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
