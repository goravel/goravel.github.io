# HTTP-Anfragen

Die Methode `Contrats/http/Request` von Goravel kann mit der aktuellen HTTP-Anfrage interagieren, die von der Anwendung
bearbeitet wird, und die Eingaben und Dateien zusammen abrufen.

## Interagieren mit der Anfrage

Die `http.Context` Instanz wird automatisch in den Controller injiziert:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Den Anfragepfad abrufen

```go
path := ctx.Request().Path() // /users
```

### Abrufen der Anfrage-URL

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Empfange die Anfrage HOST

```go
url := ctx.Request().Host()
```

### Abrufen der vollständigen Anfrage-URL

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Abrufen der Anfragemethode

```go
Methode := ctx.Request().Method()
```

### Anfrage-Header

```go
header := ctx.Request().Header("X-Header-Name", "Standard")
Header := ctx.Request().Headers()
```

### IP-Adresse anfordern

```go
ip := ctx.Request().Ip()
```

## Input

### Alle Eingabedaten abrufen

Du kannst alle Eingangsdaten der eingehenden Anfrage als `Map[string]any` mit der `All` Methode abrufen, das ist eine
Sammlung von `json`, `form` und `query`(Priorität von vorne nach zurück).

```go
Daten := ctx.Request().All()
```

### Rufe einen Routenwert ab

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Abrufen der Eingabe aus dem Abfrage-String

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
name := ctx.Request().QueryInt64("id")
name := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
names := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
names := ctx.Request().QueryMap("names")

Queries := ctx.Request().Queries()
```

> Hinweis: Es können nur eindimensionale Json-Daten abgerufen werden, andernfalls wird sie leer zurückgeben.

### Abrufen eines Eingangswertes

Zugriff auf alle Benutzereingaben, ohne sich Gedanken darüber zu machen, welches HTTP-Verb für die Anfrage verwendet wurde. Bestellung abrufen: `json`,
`form`.

```go
name := ctx.Request().Input("name")
name := ctx.Request().Input("name", "goravel")
name := ctx.Request().InputInt("name")
name := ctx.Request(). nputInt64("name")
name := ctx.Request().InputBool("name")
name := ctx.Request().InputArray("name")
name := ctx.Request().InputMap("name")
```

### Json/Form binden

```go
type User struct {
  Name string `form:"code" json:"code"`
} }

var user User
err := ctx.Request().Bind(&user)
```

```go
var user map[string]irgendein
err := ctx.Request().Bind(&user)
```

### Bindeabfrage

Unterstützt nur Bind Abfrage an struct:

```go
type Test struct {
  ID string `form:"id"`
} }
var test
err := ctx.Request().BindQuery(&test)
```

## Cookie

### Einen Cookie-Wert abrufen

Goravel bietet eine einfache Möglichkeit, mit dem "Cookie" zu arbeiten. Benutze die `Cookie` Methode in der `Request` Instanz um einen
`cookie` Wert zu erhalten, wird eine leere Zeichenkette zurückgeben, wenn der `cookie` nicht vorhanden ist. Sie können auch einen Standardwert im
zweiten Argument festlegen.

```go
value := ctx.Request().Cookie("name")
Wert := ctx.Request().Cookie("name", "default") 
```

## Datei

### Datei wird abgerufen

```go
datei, err := ctx.Request().File("file")
```

### Datei speichern

```go
datei, err := ctx.Request().File("file")
file.Store("./public")
```

### Ursprungsanfrage abrufen

```go
request := ctx.Request().Origin()
```

### Daten anhängen

```go
ctx.WithValue("Benutzer", "Goravel")
```

### Daten abrufen

```go
benutzer := ctx.Value("Benutzer")
```

### Kontext abrufen

```go
ctx := ctx.Context()
```

## Eigene Wiederherstellung

Du kannst eine benutzerdefinierte `recovery` setzen, indem du die `Recover` Methode in der `app/providers/route_service_provider.go` Datei aufrufst.

```go
// app/providers/route_service_provider.go
func (Empfänger *RouteServiceProvider) Boot(app foundation.Application) {
  // HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // oder
    // ctx.Response(). tring(500, "Interner Server-Fehler").Abort()
  })
  ...
}
```
