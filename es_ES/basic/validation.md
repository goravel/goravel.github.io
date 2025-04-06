# Validación

Goravel proporciona varios enfoques para validar los datos entrantes de la aplicación. Es más común usar el método
`Validate` disponible en todas las solicitudes HTTP entrantes. Goravel incluye una amplia variedad de reglas de validación
convenientes.

## Inicio rápido de validación

Echemos un vistazo más de cerca a un ejemplo completo de cómo validar un formulario y devolver mensajes de error al usuario. Este resumen
le proporcionará una comprensión general de cómo validar los datos de la solicitud entrante usando Goravel.

### Definir las rutas

Primero, asumamos que tenemos las siguientes rutas definidas en nuestro archivo `routes/web.go`:

```go
import "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Creis)
facades.Route().Post("/post", postController.Store)
```

La ruta `GET` muestra un formulario para crear una nueva entrada en el blog. La ruta `POST` almacena el nuevo post en la base de datos.

### Creando el controlador

A continuación, echemos un vistazo a un controlador simple que gestiona las peticiones entrantes a estas rutas. Dejaremos el método `Store`
vacío por ahora:

```go
los controladores de paquete

importar (
  "github. om/goravel/framework/contracts/http"
)

type PostController struct {
  // Dependent services
}

func NewPostController() *PostController {
  return &PostController{
    // Inyectar servicios
  }
}

func (r *PostController) Create(ctx http. ontext) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### Escribir la lógica de validación

Ahora estamos listos para rellenar nuestro método `Store` con la lógica para validar la nueva entrada del blog.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required|max_len:255",
    "body": "required",
    "código": "requerido|regex:^\d{4,6}$",
  })
}
```

### Atributos anidados

Si la solicitud HTTP entrante contiene datos de campo "anidados", puede especificar estos campos en sus reglas de validación usando
la sintaxis de "puntos":

```go
validadator, err := ctx.Request().Validate(map[string]string{
  "title": "required|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Validación de corte

Si la solicitud HTTP entrante contiene datos de campo "array", puedes especificar estos campos en tus reglas de validación usando
la sintaxis `*`:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Validación de solicitud de formulario

### Crear Solicitudes de Formulario

Para escenarios de validación más complejos, puede que desee crear una "solicitud de formulario". Las solicitudes de formulario son clases de solicitudes personalizadas
que encapsulan su propia lógica de validación y autorización. Para crear una clase form request, puedes usar el comando
`make:request` Artisan CLI:

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

La clase de solicitud de formulario generada se colocará en el directorio `app/http/requests`. Si este directorio no existe,
se creará cuando ejecutes el comando `make:request`. Cada solicitud de formulario generada por Goravel tiene seis métodos:
`Authorize`, `Rules`. Además, puedes personalizar los métodos `Filters`, `Mensajes`, `Attributes` y `PrepareForValidation`
para futuras operaciones.

El método `Authorize` es responsable de determinar si el usuario actualmente autenticado puede realizar la acción
representada por la solicitud, mientras que el método `Rules` retorna las reglas de validación que deben aplicarse a los datos
de la petición:

```go
solicitudes de paquete

importar (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) error {
  return nil
}

func (r *StorePostRequest) Reglas(ctx http. ontext) mapear[string]string {
  return map[string]string{
    // Las claves son consistentes con las claves entrantes.
    "nombre": "requerido|max_len:255",
  }
}

func (r *StorePostRequest) Filtros (ctx http. ontext) mapa[string]cadenas {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Mensajes(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. error {
  return nil
} en el texto, validación de datos.
```

Entonces, ¿cómo se evalúan las reglas de validación? Todo lo que necesita hacer es type-hint la petición en el método de su controlador. La solicitud de formulario entrante
se valida antes de llamar al método del controlador, lo que significa que no necesitas abarrotar tu controlador
con cualquier lógica de validación:

Luego puede utilizar el método `ValidateRequest` para validar la petición en el controlador:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  errors, err := ctx.Request().ValidateRequest(&storePost)
}
```

Revisa más reglas en la sección [Reglas de validación disponibles](#available-validation-rules).

> Tenga en cuenta que desde que `form` pasó valores de tipo `string` por defecto, todos los campos en la solicitud también deben ser de tipo
> `string`, de lo contrario utilice `JSON` para pasar valores.

### Solicitudes de autorización

La clase form request también contiene un método `Authorize`. Dentro de este método, se puede determinar si el usuario autenticado
realmente tiene la autoridad para actualizar un recurso determinado. For example, you may determine if a user actually owns a
blog comment they are attempting to update. Lo más probable es que interactúes con
tus [puertas de autorización y políticas](../security/authorization) dentro de este método:

```go
func (r *StorePostRequest) Authorize(ctx http.Context) error {
  var comment models. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    return errors. ew("no se ha encontrado ningún comentario")
  }

  if !facades.Gate(). llows("update", map[string]any{
    "comment": comentario,
  }) {
    return errors. ew("cannot update comment")
  }

  return nil
}
```

`error` será pasado al valor de retorno de `ctx.Request().ValidateRequest`.

### Filtrar datos de entrada

Puede formatear los datos de entrada mejorando el método `Filters` de la solicitud de formulario. Este método debe devolver un mapa de
`attribute/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) mapear[string]cadena {
  return map[string]string{
    "name": "trim",
  }
}
```

### Personalizar los mensajes de error

Puede personalizar los mensajes de error utilizados por la solicitud de formulario sobreescribiendo el método `Mensajes`. This method should
return an array of attribute / rule pairs and their corresponding error messages:

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. equivocado": "Se requiere un título",
    "body.required": "Se requiere un mensaje",
  }
}
```

### Personalizar los atributos de validación

Muchos de los mensajes de error de regla de validación incorporados de Goravel contienen un marcador de posición `:attribute`. Si desea que el marcador de posición
`:attribute` de su mensaje de validación sea reemplazado con un nombre de atributo personalizado, puede especificar los nombres personalizados
sobrescribiendo el método `Attributes`. Este método debe devolver un array de pares de atributos / nombres:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "dirección de correo electrónico",
  }
}
```

### Preparando entrada para validación

Si necesita preparar o limpiar cualquier dato de la solicitud antes de aplicar sus reglas de validación, puede utilizar el método
`PrepareForValidation`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, validation.Data) error {
  si el nombre, existe := datos. et("name"); exist {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Creación manual de Validadores

Si no quieres usar el método `Validate` en la solicitud, puedes crear una instancia de validador manualmente usando el
`facades.Validator`. El método `Make` de la facade genera una nueva instancia de validador:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation().Make(
    map[string]any{
      "name": "Goravel",
    },
    map[string]string{
      "title": "required|max_len:255",
      "body":  "required",
    })

  if validator.Fails() {
    // Return fail
  }

  var user models.User
  err := validator.Bind(&user)
  ...
}
```

El primer argumento pasado al método `Make` es los datos a validar, los cuales pueden ser `map[string]any` o `struct`.
El segundo argumento es un array de reglas de validación que se aplicarán a los datos.

### Personalizar los mensajes de error

Si es necesario, puede proporcionar mensajes de error personalizados que una instancia de validador debe utilizar en lugar de los mensajes de error predeterminados
proporcionados por Goravel. Puede pasar los mensajes personalizados como tercer argumento al método `Make` (también
aplicable a `ctx.Request().Validate()`):

```go
validadator, err := facades.Validation().Make(entrada, reglas, validation.Messages(map[string]string{
  "required": "El campo :attribute es requerido.",
}))
```

### Especificar un mensaje personalizado para un atributo dado

A veces se puede especificar un mensaje de error personalizado sólo para un atributo específico. Puedes hacerlo usando la notación "punto"
. Especifique primero el nombre del atributo, seguido por la regla (también aplicable a `ctx.Request().Validate()`):

```go
validadator, err := facades.Validation().Make(input, rules, validation.Messages(map[string]string{
  "email.required": "¡Necesitamos conocer tu dirección de correo electrónico!",
}))
```

### Especificar Valores de Atributo Personalizados

Muchos de los mensajes de error incorporados de Goravel incluyen un marcador de posición `:attribute` que se reemplaza con el nombre del campo
o atributo bajo validación. To customize the values used to replace these placeholders for specific fields, you
may pass an array of custom attributes as the third argument to the `Make` method (also applicable to
`ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(input, rules, validation.Attributes(map[string]string{
  "email": "dirección de correo electrónico",
}))
```

### Formatear datos antes de validación

Puede formatear los datos antes de validar los datos para una validación de datos más flexible, y puede pasar el método de
formateando los datos como el tercer parámetro al método `Make` (también aplicable a `ctx. equest().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
) Func

(r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(input, rules,
    validation. error repareForValidation(func(ctx http.Context, data validationcontract.Data) {
      si el nombre, existen := datos. et("name"); exist {
        return data. et("nombre", name)
      }

      return nil
    }))

  . .
}
```

## Trabajar con entrada validada

After validating incoming request data using form requests or manually created validator instances, you still want to
bind the request data to a `struct`, there are two ways to do this:

1. Usa el método `Bind`, esto enlazará todos los datos entrantes, incluyendo datos no validados:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validator. ind(&user)

validator, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. Los datos entrantes se enlazan automáticamente al formulario cuando se utiliza la solicitud de validación:

```go
var storePost requests.StorePostRequest
errors, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Trabajando con mensajes de error

### Recuperar un mensaje de error para un campo (aleatorio)

```go
validadator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### Recuperar todos los mensajes de error para un campo

```go
mensajes := validator.Errors().Get("email")
```

### Recuperar todos los mensajes de error para todos los campos

```go
mensajes := validator.Errors().All()
```

### Determinar si existen mensajes de error para un campo

```go
if validator.Errors().Has("email") {
  //
}
```

## Reglas de validación disponibles

A continuación se muestra una lista de todas las reglas de validación disponibles y su función:

| Nombre                 | Descripción                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `requerido`            | El valor de la comprobación es necesario y no puede ser cero valor. Por ejemplo, el tipo de campo es `bool`, el valor que pasa es `false`, no puede pasar la validación.           |
| `requerido_si`         | `required_if:anotherfield,value,...` El campo a validar debe estar presente y no estar vacío si el otro campo es igual a cualquier valor.                                                          |
| `requerido_unless`     | `required_unless:anotherfield,value,...` El campo a validar debe estar presente y no estar vacío a menos que otro campo sea igual a cualquier valor.                                               |
| `requerido_con`        | `required_with:foo,bar,...` El campo a validar debe estar presente y no estar vacío sólo si alguno de los otros campos especificados están presentes.                                              |
| `required_with_all`    | `required_with_all:foo,bar,...` El campo a validar debe estar presente y no estar vacío sólo si todos los otros campos especificados están presentes.                                              |
| `requerido_sin`        | `required_without:foo,bar,...` El campo a validar debe estar presente y no estar vacío sólo cuando cualquiera de los otros campos especificados no estén presentes.                                |
| `required_without_all` | `required_without_all:foo,bar,...` El campo a validar debe estar presente y no estar vacío sólo cuando todos los otros campos no estén presentes.                                                  |
| `int`                  | Comprueba que el valor es el tipo `uintX` y soporta la comprobación de tamaño. eg: `int` `int:2` `int:2,12`. Aviso: [Puntos por usar reglas](#int) |
| `uint`                 | Comprueba que el valor es el tipo `uint(uintX)`, `value >= 0`                                                                                                                                                      |
| `bool`                 | Verificar que el valor es una cadena de bool (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                            |
| `string`               | Comprobar el valor es el tipo de cadena y soporta la comprobación de tamaño. eg:`string` `string:2` `string:2,12`                                                                  |
| `flotante`             | El valor de la comprobación es el tipo `float(floatX)`                                                                                                                                                             |
| `cortar`               | El valor de la comprobación es un tipo de porción (`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                      |
| `en`                   | `in:foo,bar,…` Comprueba si el valor está en la enumeración dada                                                                                                                                                   |
| `no_en`                | `no_in:foo,bar,…` Comprueba si el valor no está en la enumeración dada                                                                                                                                             |
| `empieza_con`          | `starts_with:foo` Comprueba si el valor de la cadena de entrada comienza con la subcadena dada                                                                                                                     |
| `termina_con`          | `ends_with:foo` Comprueba si el valor de la cadena de entrada termina con la subcadena dada                                                                                                                        |
| `entre`                | `entre:min,max` Compruebe que el valor es un número y está dentro del rango dado                                                                                                                                   |
| `max`                  | `max:value` Comprobar que el valor es menor o igual al valor dado (`uintX` `floatX`)                                                                                                            |
| `min`                  | `min:value` Comprobar valor es mayor o igual que el valor dado (`intX` `uintX` `floatX`)                                                                                                        |
| `eq`                   | `eq:value` Compruebe que el valor de entrada es igual al valor dado                                                                                                                                                |
| `ne`                   | `ne:value` Compruebe que el valor de entrada no es igual al valor dado                                                                                                                                             |
| `lt`                   | `lt:value` Comprobar valor es menor que el valor dado (`floatX` `intX` `uintX`)                                                                                                                 |
| `gt`                   | `gt:value` Comprobar valor es mayor que el valor dado (`uintX` `floatX` `intX`)                                                                                                                 |
| `len`                  | `len:value` Comprueba que la longitud del valor es igual al tamaño dado (`array` `slice` `map`)                                                                                                 |
| `min_len`              | `min_len:value` Comprueba que la longitud mínima del valor es el tamaño dado (`cadena` `array` `slice` `map`)                                                                                   |
| `max_len`              | `max_len:value` Comprueba que la longitud máxima del valor es el tamaño dado (`array` `slice` `map`)                                                                                            |
| `email`                | El valor de la comprobación es la cadena de correo electrónico                                                                                                                                                     |
| `array`                | Comprobar el valor de la matriz, tipo de porción                                                                                                                                                                   |
| `map`                  | El valor de la comprobación es un tipo MAP                                                                                                                                                                         |
| `eq_campo`             | `eq_field:field` Compruebe que el valor del campo es igual al valor de otro campo                                                                                                                                  |
| `ne_campo`             | `ne_field:field` Compruebe que el valor del campo no es igual al valor de otro campo                                                                                                                               |
| `gt_campo`             | `gt_field:field` Compruebe que el valor del campo es mayor que el valor de otro campo                                                                                                                              |
| `gte_campo`            | `gte_field:field` Compruebe que el valor del campo es mayor o igual al valor de otro campo                                                                                                                         |
| `lt_field`             | `lt_field:field` Compruebe que el valor del campo es menor que el valor de otro campo                                                                                                                              |
| `lte_campo`            | `lte_field:field` Comprueba si el valor del campo es menor o igual al valor de otro campo                                                                                                                          |
| `archivo`              | Verificar si es un archivo subido                                                                                                                                                                                  |
| `image`                | Compruebe si es un archivo de imagen subido y soporte la comprobación del sufijo                                                                                                                                   |
| `fecha`                | Compruebe que el valor del campo es la fecha                                                                                                                                                                       |
| `gt_date`              | `gt_date:value` Comprueba que el valor de entrada es mayor que la fecha dada                                                                                                                                       |
| `lt_date`              | `lt_date:value` Comprueba que el valor de entrada es menor que la fecha dada                                                                                                                                       |
| `gte_date`             | `gte_date:value` Comprueba que el valor de entrada es mayor o igual a la fecha dada                                                                                                                                |
| `lte_date`             | `lte_date:value` Comprueba que el valor de entrada es menor o igual a la fecha dada                                                                                                                                |
| `alfa`                 | Verificar que el valor sólo contiene caracteres alfabéticos                                                                                                                                                        |
| `alpha_num`            | Comprueba que sólo letras, números están incluidos                                                                                                                                                                 |
| `alpha_guion`          | Marca para incluir sólo letras, números, guiones ( - ) y guiones bajos ( _ )                                                                            |
| `json`                 | Comprobar el valor es una cadena JSON                                                                                                                                                                              |
| `número`               | Comprueba que el valor es la cadena de número `>= 0`                                                                                                                                                               |
| `completa_url`         | El valor de la comprobación es una cadena URL completa (debe comenzar con http,https)                                                                                                           |
| `ip`                   | Comprobar el valor es la cadena IP(v4 o v6)                                                                                                                                                     |
| `ipv4`                 | Comprobar que el valor es una cadena IPv4                                                                                                                                                                          |
| `ipv6`                 | Comprobar el valor es la cadena IPv6                                                                                                                                                                               |
| `regex`                | Compruebe si el valor puede pasar la verificación regular                                                                                                                                                          |

### Puntos por usar reglas

#### int

Cuando se utiliza `ctx.Request().Validate(rules)` para la validación, los datos de tipo `int` entrantes serán analizados por
`json. nmarshal` en el tipo `float64`, que causará que la validación de la regla int falle.

**Soluciones**

Opción 1: Añadir [`validation.PrepareForValidation`](#format-data-before-validation), formatear los datos antes de validar los datos
;

Opción 2: Usa `facades.Validation().Make()` para validar regla;

## Reglas de validación personalizadas

Goravel proporciona una variedad de reglas de validación útiles; sin embargo, puede que desee especificar algunas de las suyas. One method of
registering custom validation rules is using rule objects. Para generar un nuevo objeto de reglas, puedes simplemente usar el comando
`make:rule` Artisan.

Por ejemplo, si desea verificar que una cadena está en mayúsculas, puede crear una regla con este comando. Goravel guardará
luego esta nueva regla en el directorio `app/rules`. If this directory does not exist, Goravel will create it when you
run the Artisan command to create your rule.

```go
go run . artisan make:rule Uppercase
go run . artisan make:rule user/Uppercase
```

Después de crear la regla, necesitamos definir su comportamiento. Un objeto regla tiene dos métodos: `Pases` y `Message`. El método
Passes recibe todos los datos, incluyendo los datos a validar y los parámetros de validación. Debe devolver
`true` o `false` dependiendo de si el valor del atributo es válido. El método `Message` debe devolver el mensaje de error
para la validación que debe utilizarse cuando la validación falla.

```go
reglas de paquete

importar (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Uppercase struct {
}

// Firma El nombre de la regla.
func (receptor *Mayúsculas) Signature() string {
  return "uppercase"
}

// Pasa Determinar si pasa la regla de validación.
func (receptor *mayúscula) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val. string)
}

// Mensaje Obtener el mensaje de error de validación.
func (receptor *Mayúscula) Cadena Message() {
  return "The :attribute debe estar en mayúscula."
}

```

Luego necesitas registrar la regla en el método `rules` en el archivo `app/providers/validation_service_provider.go` y
la regla puede ser usada como otras reglas:

```go
proveedores de paquetes

importar (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receptor *ValidationServiceProvider) Register() {

}

func (receptor *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules error: %+v", err)
  }
}

func (receptor *ValidationServiceProvider) rules() []validación. ule {
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Filtros de validación disponibles

| Nombre                         | Descripción                                                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Convierte valor(cadena/intX/floatX) a `int` tipo `v.FilterRule("id", "int")`                                                                                   |
| `uint/toUint`                  | Convierte el valor (string/intX/floatX) a `uint` tipo `v.FilterRule("id", "uint")`                                                                             |
| `int64/toInt64`                | Convierte valor(string/intX/floatX) a `int64` tipo `v.FilterRule("id", "int64")`                                                                               |
| `float/toFloat`                | Convierte el valor (cadena/intX/floatX) al tipo `float`                                                                                                        |
| `bool/toBool`                  | Convierte el valor de la cadena a bool. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false") |
| `trim/trimSpace`               | Limpiar espacios en blanco en ambos lados de la cadena                                                                                                                            |
| `ltrim/trimLeft`               | Limpiar espacios en blanco en los lados izquierdos de la cadena                                                                                                                   |
| \`rtrim/trimRight              | Limpiar espacios en blanco en los lados derecho de la cadena                                                                                                                      |
| `int/entero`                   | Convierte valor(cadena/intX/floatX) a `int` tipo `v.FilterRule("id", "int")`                                                                                   |
| `minúscula/minúscula`          | Convertir cadena a minúsculas                                                                                                                                                     |
| `mayúscula/mayúscula`          | Convertir cadena a mayúsculas                                                                                                                                                     |
| `lcFirst/lowerFirst`           | Convierte el primer carácter de una cadena a minúsculas                                                                                                                           |
| `ucFirst/upperFirst`           | Convierte el primer carácter de una cadena a mayúsculas                                                                                                                           |
| `ucWord/upperWord`             | Convierte el primer carácter de cada palabra a mayúsculas                                                                                                                         |
| `camel/camelCase`              | Convertir cadena a estilo de nombre de camello                                                                                                                                    |
| `snake/snakeCase`              | Convertir cadena a estilo de nomenclatura snake                                                                                                                                   |
| `escapeJs/escapeJS`            | Cadena JS de huida.                                                                                                                                               |
| `escapeHtml/escapeHTML`        | Escapar cadena HTML.                                                                                                                                              |
| `str2ints/strToInts`           | Convierte la cadena a rebanada `[]int`                                                                                                                                            |
| `str2time/strToTime`           | Convierte la cadena de fecha a `time.Time`.                                                                                                                       |
| `str2arr/str2array/strToArray` | Convierte la cadena a rebanada de cadena `[]string`                                                                                                                               |

## Filtro personalizado

Goravel proporciona una variedad de filtros útiles, sin embargo, puedes especificar algunos de los tuyos. Para generar una nueva regla
objeto, puedes simplemente usar el comando 'make:filter' Artisan. Usemos este comando para generar una regla que convierte una cadena
a un entero. Esta norma ya está incluida en el marco, simplemente la creamos como ejemplo. Goravel guardará
este nuevo filtro en el directorio `app/filters`. Si este directorio no existe, Goravel lo creará cuando ejecutes
el comando Artisan para crear la regla:

```go
go run . artisan make:filter ToInt
// o
go run . artisan make:filter user/ToInt
```

Un filtro contiene dos métodos: `Signature` y `Handle`. El método `Signature` establece el nombre del filtro. El método
`Handle` realiza la lógica de filtrado específica:

```go
filtros de paquete

importar (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Firma La firma del filtro.
func (receptor *ToInt) Signature() string {
  return "ToInt"
}

// Manejar define la función de filtro a aplicar.
func (receptor *ToInt) Handle() cualquier {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Luego necesitas registrar el filtro en el método `filters` en el archivo `app/providers/validation_service_provider.go`,
y el filtro pueden ser usados como otros:

```go
proveedores de paquetes

importar (
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receptor *ValidationServiceProvider) Register() {

}

func (receptor *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("add filter error: %+v", err)
  }
}

func (receptor *ValidationServiceProvider) filters() []validación. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
