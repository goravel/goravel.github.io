# Fabrici

Atunci când testezi aplicația sau seeding baza de date, ar putea fi necesar să introduci câteva înregistrări în baza de date
în prealabil. În loc de valori de introducere manuală pentru fiecare coloană, Goravel vă permite să definiți un set de atribute
implicite pentru fiecare dintre modelele dvs prin crearea de modele de fabrici.

To see an example of how to write a factory, you can check out the `user_factory.go` file located in your application's
`database/factories` directory.

```go
fabricile

tip UserFactory struct {
}

// Definiție Definiție stării implicite a modelului.
func (f *UserFactory) Definition() harta[string]orice {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

După cum puteţi vedea, în forma lor de bază, fabricile sunt şubrezi care au o metodă `Definiţie`. Metoda returnează setul implicit
de atribute care ar trebui folosite la crearea unui model cu fabrica. Pentru a genera o gamă de date
aleatoare, te poți baza pe [brianvo/gofakeit](https://github.com/brianvoe/gofakeit).

## Generare fabrici

Pentru a crea o fabrică, rulați comanda `make:facty` Artizanal:

```
rulați . artizan:factory PostFactory
```

Noua fabrică `struct` va fi plasată în folderul `bază de date/fabrici`.

### Modelul și convențiile privind descoperirea uzinelor

După ce definiți o fabrică, puteți utiliza metoda `Factory()` din model pentru a lega fabrica de model:

```go
modelele de pachet

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/bază de date/fabrici"
)

type Utilizator struct {
  orm. odel
  Denumire şir de caractere
  Avatar
  orm. oftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Crearea de modele folosind fabrici

### Modele de Instantializare

Putem folosi metoda `Make` pentru a crea modele fără a le perpetua în baza de date:

```go
var modele de utilizator.Utilizator
err := facades.Orm().Factory().Make(&user)
```

Puteţi crea o colecţie de multe modele folosind metoda `Count`:

```go
var users []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Dacă doriţi să suprascrieţi unele dintre valorile implicite ale modelelor dvs., puteţi trece `map[string]any` la metoda `Make`
. Doar atributele specificate vor fi înlocuite în timp ce restul atributelor rămân setate la valorile lor implicite
specificate de fabrică:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Modele persistente

Metoda `Creează` creează şi salvează exemple de exemple în baza de date folosind metoda lui Orm `Save`.

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Puteţi suprascrie atributele modelului implicit al fabricii prin trecerea lui `map[string]any` al atributelor la metoda `Create`
:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Ignoră evenimentul model

Poate fi definit [model eveniment](../orm/quickstart#events) pe model, puteți ignora aceste evenimente cu metoda
`CreateQuietly`:

```go
var modele de utilizator.Utilizator
err := facades.Orm().Factory().CreateQuietly(&user)
```
