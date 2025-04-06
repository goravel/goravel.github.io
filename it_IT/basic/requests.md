# Richieste HTTP

Il metodo `contracts/http/Request` di Goravel può interagire con l'attuale richiesta HTTP elaborata dall'applicazione,
e ottenere l'input e i file inviati insieme.

## Interagire Con La Richiesta

L'istanza `http.Context` viene iniettata automaticamente nel controller:

```go
import "github.com/goravel/framework/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Recupero Percorso Richiesta

```go
path := ctx.Request().Path() // /users
```

### Recupero Url Della Richiesta

```go
url := ctx.Request().Url() // /users?name=Goravel
```

### Recupero Della Richiesta Host

```go
url := ctx.Request().Host()
```

### Recuperare L'Url Della Richiesta Completa

```go
url := ctx.Request().FullUrl() // http://**/users?name=Goravel
```

### Recupero Metodo Richiesta

```go
method := ctx.Request().Method()
```

### Richiedi Intestazioni

```go
header := ctx.Request().Header("X-Header-Name", "default")
headers := ctx.Request().Headers()
```

### Richiedi Indirizzo Ip

```go
ip := ctx.Request().Ip()
```

## Input

### Recupero Tutti I Dati In Ingresso

È possibile recuperare tutti i dati di input della richiesta in arrivo come `map[string]any` utilizzando il metodo `All`, which is a
collection of `json`, `form` and `query`(priority from front to back).

```go
data := ctx.Request().All()
```

### Recupero di un Valore di Rotta

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Ricezione Input Dalla Stringa Di Query

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
nome := ctx.Request().QueryInt64("id")
nome := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
nomi := ctx.Request().QueryArray("names")

// /users?names[a]=goravel1&names[b]=goravel2
nomi := ctx.Request().QueryMap("names")

queries := ctx.Request().Queries()
```

> Nota: Solo i dati Json unidimensionali possono essere ottenuti, altrimenti torneranno vuoti.

### Recupero Di Un Valore In Ingresso

Accedi a tutti gli input dell'utente senza preoccuparti di quale verbo HTTP è stato utilizzato per la richiesta. Recupera l'ordine: `json`,
`form`.

```go
name := ctx.Request().Input("name")
name := ctx.Request().Input("name", "goravel")
name := ctx.Request().InputInt("name")
name := ctx.Request(). nputInt64("nome")
nome := ctx.Request().InputBool("nome")
nome := ctx.Request().InputArray("nome")
nome := ctx.Request().InputMap("nome")
```

### Associa Json/Form

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user User
err := ctx.Request().Bind(&user)
```

```go
var user map[string]any
err := ctx.Request().Bind(&user)
```

### Bind Query

Supporta solo il bind Query alla struttura:

```go
type Test struct {
  ID string `form:"id"`
}
var test Test
err := ctx.Request().BindQuery(&test)
```

## Cookie

### Recupero di un Valore Cookie

Goravel fornisce un modo semplice per lavorare con `cookie`. Usa il metodo `Cookie` nell'istanza `Request` per recuperare un valore `cookie`
, restituirà una stringa vuota se il `cookie` non è presente. Puoi anche definire un valore predefinito nel secondo argomento
.

```go
value := ctx.Request().Cookie("name")
value := ctx.Request().Cookie("name", "default") 
```

## File

### Recupero File

```go
file, err := ctx.Request().File("file")
```

### Salva File

```go
file, err := ctx.Request().File("file")
file.Store("./public")
```

### Ottieni Richiesta Di Origine

```go
request := ctx.Request().Origin()
```

### Allega Dati

```go
ctx.WithValue("utente", "Goravel")
```

### Ottieni Dati

```go
utente := ctx.Value("utente")
```

### Ottieni Contesto

```go
ctx := ctx.Context()
```

## Recupero Personalizzato

Puoi impostare un `recovery` personalizzato chiamando il metodo `Recover` nel file `app/providers/route_service_provider.go`.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Add HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, err error) {
    ctx.Request(). bort()
    // o
    // ctx.Response(). tring(500, "Internal Server Error").Abort()
  })
  ...
}
```
