# Respuesta HTTP

Puedes usar `ctx.Response()` para la respuesta HTTP en el Controlador.

## Cadena

```go
importar "github.com/goravel/framework/contracts/http"

ctx.Response().String(http.StatusOK, "Hola Goravel")
```

## JSON

```go
import (
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Json(http.StatusOK, http.Json{
  "Hello": "Goravel",
})

ctx. esponse().Json(http. tatusOK, struct {
  ID uint `json:"id"`
  Nombre cadena `json:"name"`
}{
  Id: 1,
  Front: "Goravel",
})
```

## Devolución personalizada

```go
ctx.Response().Data(http.StatusOK, "text/html; charset=utf-8", []byte("<b>Goravel</b>"))
```

## Respuesta

```go
importar "net/http"

ctx.Response().File("./public/logo.png")
```

## Descargar archivo

```go
importar "net/http"

ctx.Response().Download("./public/logo.png", "1.png")
```

## Adjuntar cabecera

```go
importar "github.com/goravel/framework/contracts/http"

ctx.Response().Header("Content", "Goravel").String(http.StatusOK, "Hola Goravel")
```

## Galleta

### Establecer cookie

Usa el método `Cookie` en la instancia de `response` para establecer una `cookie`. El método `Cookie` acepta una instancia `http.Cookie`
, que le permite configurar varias opciones de cookie.

```go
import (
  "tiempo"
  "github.com/goravel/framework/contracts/http"
)

ctx.Response().Cookie(http. ookie{
  Nombre: "nombre",
  Valor: "Goravel",
  Path: "/",
  Domain: "goravel. ev",
  Caduca: time.Now().Add(24 * time.Hour),
  Seguro: true,
  HttpOnly: true,
})
```

### Expirar Cookie

Usa el método `WithoutCookie` para remover una cookie.

```go
ctx.Response().WithoutCookie("nombre")
```

## Devolución Exitosa

```go
ctx.Response().Success().String("Hola Goravel")
ctx.Response().Success().Json(http.Json{
  "Hola": "Goravel",
})
```

## Código personalizado

```go
ctx.Response().Status(http.StatusOK).Json(http.Json{
  "hola": "Goravel",
})
```

## Flujo de retorno

```go
ctx.Response().Stream(http.StatusCreated, func(w http. error treamWriter) {
  data := []string{"a", "b", "c"}
  for _, item := rango de datos {
    if _, err := w. rite([]byte(item + "\n")); err != nil {
      return err
    }

    if err := w. lush(); err != nil {
      return err
    }

    time.Sleep(1 * vez. segundo)
  }

  return nil
})
```

## Redirigir

```go
ctx.Response().Redirect(http.StatusMovedPermanly, "https://goravel.dev")
```

## Sin contenido

```go
ctx.Response().NoContent()
ctx.Response().NoContent(http.StatusOk)
```

## Obtener respuesta

Puedes obtener toda la información de `ctx.Response()`, que es comúnmente usada en HTTP middleware:

```go
origin := ctx.Response().Origin()
```

`origin` contiene algunos métodos como se muestra a continuación：

| Método   | Accin                         |
| -------- | ----------------------------- |
| Cuerpo   | Obtener datos de respuesta    |
| Cabecera | Obtener cabecera de respuesta |
| Tamaño   | Obtener tamaño de respuesta   |
| Estado   | Obtener estado de respuesta   |
