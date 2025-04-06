# Fabriken

Beim Testen Ihrer Anwendung oder beim Verteilen Ihrer Datenbank ist es möglicherweise notwendig, vorher ein paar Datensätze in Ihre Datenbank
einzufügen. Anstatt Werte für jede Spalte manuell einzugeben, Goravel erlaubt es dir, eine Reihe von Standardattributen
für jedes deiner Modelle zu definieren, indem du Modellfabriken erstellst.

Um ein Beispiel zu sehen, wie man eine Fabrik schreibt, kannst du die Datei `user_factory.go` im Verzeichnis
`database/factories` deiner Anwendung ansehen.

```go
-Paketfabriken

geben UserFactory Struct {
}

// Definiert den Standardzustand des Modells.
func (f *UserFactory) Definition() map[string]any {
  return map[string]any{
    "Name": "Goravel",
  }
}
```

Wie du siehst, sind Fabriken in ihrer grundlegendsten Form Strukturen, die eine `Definition` Methode haben. Die Methode gibt den
Standardsatz von Attributwerten zurück, die beim Erstellen eines Modells mit der Fabrik verwendet werden sollen. Um einen Bereich von
zufälligen Daten zu erzeugen, kannst du dich auf [brianvoe/gofakeit](https://github.com/brianvoe/gofakeit).

## Erzeuge Fabriken

Um eine Fabrik zu erstellen, führe den `make:factory` Artisan Befehl aus:

```
go run . handwerklicher make:factory PostFactory
```

Das neue Fabrik`struct` wird im `database/factories` Verzeichnis abgelegt.

### Modell & Fabrik Discovery Conventions

Nach der Definition einer Fabrik kannst du die `Factory()` Methode im Modell verwenden, um die Fabrik an das Modell zu binden:

```go
package models

import (
  "github.com/goravel/framework/contracts/database/factory"
  "github. om/goravel/framework/database/orm"

  "goravel/database/factories"
)

Typ User struct {
  orm. odel
  Name string
  Avatar string
  orm. oftDeletes
}

func (u *User) Factory() factory.Factory {
  return &factories.UserFactory{}
}
```

## Modelle mit Fabriken erstellen

### Instanziierung von Modellen

Wir können die `Make`-Methode verwenden, um Modelle zu erstellen, ohne sie in der Datenbank zu verzeichnen:

```go
var user models.User
err := facades.Orm().Factory().Make(&user)
```

Du kannst eine Sammlung von vielen Modellen mit der `Count`-Methode erstellen:

```go
var users []models.User
err := facades.Orm().Factory().Count(2).Make(&users)
```

Wenn du einige der Standardwerte deiner Modelle überschreiben möchtest, kannst du `map[string]einige` an die `Make`
Methode übergeben. Nur die angegebenen Attribute werden ersetzt, während der Rest der Attribute auf ihre Standardwerte
gesetzt bleibt, wie von der Fabrik angegeben:

```go
var user models.User
err := facades.Orm().Factory().Make(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Dauerhafte Modelle

Die `Create` Methode erstellt und speichert Model-Instanzen in der Datenbank mit der `Save`-Methode.

```go
var user models.User
err := facades.Orm().Factory().Create(&user)

var users []models.User
err := facades.Orm().Factory().Count(2).Create(&users)
```

Du kannst die Standardmodellattribute der Fabrik überschreiben, indem du `map[string]alle Attribute der `Create\`
Methode übergibst:

```go
var user models.User
err := facades.Orm().Factory().Create(&user, map[string]any{
    "Avatar": "avatar",
})
```

### Modell Ereignis ignorieren

Es könnte [model event](../orm/quickstart#events) auf dem Modell definiert sein, du kannst diese Ereignisse mit der
`CreateQuietly` Methode ignorieren:

```go
var user models.User
err := facades.Orm().Factory().CreateQuietly(&user)
```
