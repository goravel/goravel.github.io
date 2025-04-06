# HTTP-förfrågningar

"contracts/http/Request" -metoden för Goravel kan interagera med den aktuella HTTP-begäran som bearbetas av applikationen,
och få indata och filer inskickade tillsammans.

## Interagera med begäran

"http.Context" -instansen injiceras automatiskt i styrenheten:

```go
importera "github.com/goravel/frameing/contracts/http"

facades.Route().Get("/", func(ctx http.Context) {

})
```

### Hämtar sökvägen för begäran

```go
sökväg := ctx.Request().Path() // /users
```

### Hämtar URL för begäran

```go
url := ctx.Begäran ().Url() // /users?name=Goravel
```

### Hämtar begäran HOST

```go
url := ctx.Request().Host()
```

### Hämtar URL för fullständig begäran

```go
url := ctx.Begäran ().FullUrl() // http://**/users?name=Goravel
```

### Hämtar begärningsmetod

```go
metod := ctx.Request().Metod()
```

### Begär rubriker

```go
header := ctx.Request().Header("X-Header-Name", "default")
headers := ctx.Request().Headers()
```

### Begär IP-adress

```go
ip := ctx.Request().Ip()
```

## Input

### Hämtar alla indata

Du kan hämta alla inkommande förfrågningsdata som `map[string]any` med `All`-metoden, vilket är en
samling av `json`, `form` och `query`(prioritet från fram till bak).

```go
data := ctx.Request().All()
```

### Hämtar ett ruttvärde

```go
// /users/{id}
id := ctx.Request().Route("id")
id := ctx.Request().RouteInt("id")
id := ctx.Request().RouteInt64("id")
```

### Hämtar indata från frågan strängen

```go
// /users?name=goravel
name := ctx.Request().Query("name")
name := ctx.Request().Query("name", "default")

// /users?id=1
name := ctx. equest().QueryInt("id")
namn := ctx.Request().QueryInt64("id")
namn := ctx.Request(). ueryBool("id")

// /users?names=goravel1&names=goravel2
namnen := ctx.Request().QueryArray("namn")

// /users?namnen[a]=goravel1&namnen[b]=goravel2
namnen := ctx.Request().QueryMap("namn")

frågor:= ctx.Request().Queries()
```

> Obs: Endast endimensionella Json-data kan erhållas, annars kommer det att returnera tomt.

### Hämtar ett inmatningsvärde

Få tillgång till all användaringång utan att behöva oroa sig för vilket HTTP-verb som användes för begäran. Hämta ordning: `json`,
`form`.

```go
namn := ctx.Request().Input("namn")
namn := ctx.Request().Input("namn", "goravel")
namn := ctx.Request().InputInt("namn")
namn := ctx.Request(). nputInt64("namn")
namn := ctx.Request().InputBool("namn")
namn := ctx.Request().InputArray("namn")
namn := ctx.Request().InputMap("namn")
```

### Bind Json/formulär

```go
type User struct {
  Name string `form:"code" json:"code"`
}

var user User
err := ctx.Request().Bind(&user)
```

```go
var användarkarta[string]alla
err := ctx.Request().Bind(&user)
```

### Bind fråga

Endast stöd binda fråga att strukturera:

```go
typ Test struct {
  ID sträng `form:"id"`
}
var test Test
err := ctx.Request().BindQuery(&test)
```

## Kaka

### Hämtar ett cookie-värde

Goravel ger ett enkelt sätt att arbeta med `cookie`. Använd `Cookie`-metoden på `Request`-instansen för att hämta ett
`cookie`-värde, returnerar en tom sträng om `cookie` inte är närvarande. Du kan också definiera ett standardvärde i
andra argumentet.

```go
värde := ctx.Request().Cookie("namn")
värde := ctx.Request().Cookie("namn", "standard") 
```

## Fil

### Hämtar fil

```go
fil, err := ctx.Request().File("fil")
```

### Spara fil

```go
fil, err := ctx.Request().File("file")
file.Store("./public")
```

### Få Origin begäran

```go
förfrågan := ctx.Request().Origin()
```

### Bifoga data

```go
ctx.WithValue("användare", "Goravel")
```

### Hämta data

```go
användare := ctx.Value("användare")
```

### Hämta kontext

```go
ctx := ctx.Context()
```

## Anpassad återställning

Du kan ställa in en anpassad `recovery` genom att anropa `Recover`-metoden i `app/providers/route_service_provider.go`-filen.

```go
// app/providers/route_service_provider.go
func (receiver *RouteServiceProvider) Boot(app foundation.Application) {
  // Lägg till HTTP middleware
  facades.Route().GlobalMiddleware(http.Kernel{}.Middleware()...
  facades.Route().Recover(func(ctx http.Context, fel) {
    ctx.Request(). bort()
    // eller
    // ctx.Response(). tring(500, "Internt serverfel").Abort()
  })
  ...
}
```
