# Fabriker

När du testar din applikation eller skickar din databas, kan det vara nödvändigt att infoga några poster i din databas
i förväg. Istället för att manuellt mata in värden för varje kolumn, Goravel låter dig definiera en uppsättning
standardattribut för var och en av dina modeller genom att skapa modellfabriker.

För att se ett exempel på hur man skriver en fabrik kan du kolla in filen `user_factory.go` som finns i applikationens
`database/factories`-katalog.

```go
package factories

type UserFactory struct {
}

// Definition Definiera modellens standardtillstånd.
func (f *UserFactory) Definition() karta[string]någon {
  returkarta[string]any{
    "Namn": "Goravel",
  }
}
```

Som ni kan se är fabriker i deras mest grundläggande form strukturer som har en `Definition`-metod. Metoden returnerar
standarduppsättning attributvärden som ska användas när man skapar en modell med fabriken. För att generera ett utbud av
slumpmässig data kan du lita på [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Genererar fabriker

För att skapa en fabrik, kör kommandot `make:factory` Artisan:

```
gå kör. hantverkare make:factory PostFactory
```

Den nya fabriken `struct` kommer att placeras i din `database/factories`-katalog.

### Model & Factory Discovery konventioner

Efter att ha definierat en fabrik kan du använda `Factory()` -metoden i modellen för att binda fabriken till modellen:

```go
paketmodeller

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framee/database/orm"

  "goravel/databas/factories"
)

typ Användarstruktur {
  orm. odel
  Namnsträng
  Avatar sträng
  orm. oftTar bort
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Skapa modeller med fabriker

### Instantisera modeller

Vi kan använda `Make`-metoden för att skapa modeller utan att kvarstå dem i databasen:

```go
var användarmodeller.Användare
err := fasader.Orm().Factory().Make(&user)
```

Du kan skapa en samling av många modeller med hjälp av `Count`-metoden:

```go
var users []models.User
err := fasader.Orm().Factory().Count(2).Make(&användare)
```

Om du vill åsidosätta några av standardvärdena för dina modeller, kan du skicka `map[string]any` till `Make`
metoden. Endast de angivna attributen kommer att ersättas medan resten av attributen förblir inställda till sina standard
-värden som anges av fabriken:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Bestående modeller

`Create`-metoden skapar och sparar modellinstanser till databasen med Orms `Save`-metod.

```go
var användarmodeller.Användare
err := fasader.Orm().Factory().Create(&user)

var användare []models.User
err := fasader.Orm().Factory().Count(2).Create(&users)
```

Du kan åsidosätta fabrikens standardmodellattribut genom att skicka `map[string]någon` av attributen till `Create`
metoden:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Ignorera modellhändelse

Det kan finnas [model event](../orm/quickstart#events) definierad på modellen, du kan ignorera dessa händelser med
`CreateQuietly`-metoden:

```go
var användarmodeller.Användare
err := fasader.Orm().Factory().CreateQuietly(&user)
```
