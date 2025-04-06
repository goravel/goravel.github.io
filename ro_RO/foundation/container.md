# Container serviciu

Recipientul de servicii Goravel este un instrument puternic de gestionare a dependenţelor de clasă şi de efectuare a injecţiei de dependenţă. Acesta
conține toate modulele din Goravel și vă permite să vă asociați propriile servicii la containere și să le rezolvați atunci când este necesar.
Containerul de servicii oferă un sprijin puternic pachetelor terților din jurul Goravel.

## Obligatoriu

### Legături simple

Aproape toate legăturile dvs. cu containerul de servicii vor fi înregistrate în [furnizorii de servicii](./providers).
În cadrul unui furnizor de servicii, aveţi întotdeauna acces la container prin intermediul parametrului `app`, apoi înregistraţi un cod de legare
folosind metoda `Bind`, pasând `key` pe care dorim să îl înregistrăm împreună cu o închidere care returnează o instanță a clasei
:

```go
ruta de import

(
 "github.com/goravel/framework/contracts/fundation"
)

const obligatoriu = "goravel. oute"

type ServiceFurnizor struct {
}

func (route *ServiceProvider) Register(app foundation. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (ruta *ServiceProvider) Boot(app foundation.Application) {

}
```

După cum s-a menționat, de obicei veți interacționa cu containerul în cadrul furnizorilor de servicii; cu toate acestea, dacă doriţi ca
să interacţioneze cu containerul în afara unui furnizor de servicii, puteţi face acest lucru prin intermediul faţadei `App`:

```go
fațades.App().Bind("key", func(app foundation.Application) (oricum, eroare) {
    ...
})
```

### Legarea A Singleton

Metoda `Singleton` leagă o clasă sau o interfață în container, care ar trebui să fie rezolvată o singură dată. Odată rezolvată o legătură cu un
singleton, aceeași instanță a obiectului va fi returnată la apelurile ulterioare în container:

```go
app.Singleton(key, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Instanțe obligatorii

De asemenea, puteţi lega o instanţă de obiect existentă în container folosind metoda `Instance`. The given instance will
always be returned on subsequent calls into the container:

```go
app.Instance(cheie, instanță)
```

### Legare cu parametrul

Dacă aveţi nevoie de nişte parametri suplimentari pentru a construi furnizorul de servicii, puteţi folosi metoda `BindWith` pentru a trece parametrii
la închidere:

```go
app.BindWith(Binding, func(app foundation.Application, parametrii Harta[string]any) (oriu, eroare) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Rezolvare

### Metoda `Make`

Puteţi utiliza metoda `Make` pentru a rezolva o instanţă de clasă din container. The `Make` method accepts the `key` you
wish to resolve:

```go
instance, err := app.Make(key)
```

If you are outside of a service provider in a location of your code that does not have access to the `app` variable, you
may use the `App` facade to resolve a class instance from the container:

```go
exemplu, err := facades.App().Make(key)
```

### Metoda `MakeWith`

Dacă unele din dependențele clasei tale nu pot fi rezolvate prin container, puteţi să le injectaţi transmiţându-le ca array asociat
în metoda `MakeWith`, care corespunde metodei de legare `BindWith`:

```go
exemplu, err := app.MakeWith(key, harta[string]any{"id": 1})
```

### Alte metode

Cadrul oferă câteva metode convenabile pentru a rezolva rapid diverse fațade: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
