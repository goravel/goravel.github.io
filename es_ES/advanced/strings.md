# Cadenas

Goravel proporciona una librería fluida de manipulación de cadenas que te permite manipular fácilmente cadenas. Fluent Strings
le permite combinar múltiples operaciones de string a través de cadena de métodos, donde la mayoría de los métodos devuelven una instancia
de `support/str. tring`, le permite encadenar métodos adicionales. Para obtener el valor final de la cadena después de aplicar las operaciones cadenadas
, puede llamar al método `String`, que devuelve el valor subyacente `string`.

```go
importar "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower())[video] pperFirst().String() // "Goravel"
```

## Métodos disponibles

### `De`

El método `Of` crea una nueva instancia de cadena de fluido desde una cadena determinada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `Después`

El método `After` devuelve la porción de una cadena que aparece después de un valor especificado. Si el valor es una cadena vacía
o no existe dentro de la cadena original, se devuelve la cadena completa.

```go
importar "github.com/goravel/framework/support/str"

str.Of("¡Hola Mundo!").After("Hola").String() // " Mundo!"
```

### `Después`

El método `AfterLast` devuelve la porción de una cadena que aparece después de la última ocurrencia de un valor especificado. Si
el valor es una cadena vacía o no existe dentro de la cadena original, se devuelve la cadena completa.

```go
importar "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### 'Agregar'

El método `Append` añade el valor especificado al final de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Nombre base`

El método `Basename` devuelve el componente del nombre final de una ruta, eliminando opcionalmente un sufijo especificado del nombre base
.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `antes`

El método `Before` devuelve la porción de una cadena que aparece antes de un valor especificado. Si el valor es una cadena
vacía o no existe dentro de la cadena original, se devuelve la cadena completa.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola Mundo!").Before("Mundo").String() // "Hola "
```

### `Más adelante`

El método `BeforeLast` devuelve la porción de una cadena que aparece antes de la última ocurrencia de un valor especificado. Si
el valor es una cadena vacía o no existe dentro de la cadena original, se devuelve la cadena completa.

```go
importar "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

El método `Between` devuelve la porción de una cadena entre dos valores dados.

```go
importar "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hola"
```

### `BetweenFirst`

El método `BetweenFirst` devuelve la porción de una cadena entre la primera aparición de dos valores dados.

```go
importar "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hola"
```

### `Camelo`

El método `Camel` convierte la cadena a `camelCase`.

```go
importar "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "holaWorld"
```

### `CharAt`

El método `CharAt` devuelve el carácter en el índice dado. If the index is out of bounds, an empty string will be
returned.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

El método `ChopEnd` elimina el/los valor(es) dados del final de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

El método `ChopStart` elimina el/los valor(es) dados del inicio de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Contiene`

El método `Contains` determina si la cadena dada contiene el valor dado. El método es sensible a mayúsculas y minúsculas. Si se proporcionan múltiples valores
, devolverá `true` si la cadena contiene alguno de los valores.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `Contiene Todo`

El método `ContainsAll` determina si la cadena dada contiene todos los valores dados. El método es sensible a mayúsculas y minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola World").ContainsAll("Hello", "World") // true

str.Of("Hola World").ContainsAll("Hello", "Gor") // false
```

### `NombredelDir`

El método `Dirname` devuelve la porción padre de una ruta.

```go
importar "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

Opcionalmente, puede proporcionar el nivel de directorio para recortar de la ruta.

```go
importar "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

El método `EndsWith` determina si la cadena dada termina con el valor dado. El método es sensible a mayúsculas y minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Puede pasar varios valores al método para determinar si la cadena termina con cualquiera de los valores.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exacta`

El método `Exactly` determina si la cadena dada es exactamente igual al valor dado. El método es sensible a mayúsculas y minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Excepto`

El método `Except` extrae un extracto de la cadena que coincide con la primera ocurrencia del valor dado.

```go
importar "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is a beautiful morn...
```

Adicionalmente, puede usar la opción `Omission` para cambiar la cadena que se utiliza para indicar el extracto.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explotar`

El método `Explode` divide la cadena en una matriz de cadenas usando el delimitador dado.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola World").Explode(" ") // []string{"Hello", "World"}
```

### `Finalizar`

El método `Finish` asegura que la cadena dada termina con el valor dado. Si la cadena ya termina con el valor,
no se añadirá de nuevo.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Encabezado`

El método `Headline` convierte la cadena en un headline.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hola Mundo"
```

### `Is`

El método `Is` determina si la cadena dada coincide con el patrón dado. El método es sensible a mayúsculas y minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

El método `IsEmpty` determina si la cadena dada está vacía.

```go
importar "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // verdadero
```

### `IsNotEmpty`

El método `IsNotEmpty` determina si la cadena dada no está vacía.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // verdadero
```

### `IsAscii`

El método `IsAscii` determina si la cadena dada contiene sólo caracteres ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("mañana").IsAscii() // false
```

### `IsSlice`

El método `IsSlice` determina si la cadena dada es un corte.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

El método `IsMap` determina si la cadena dada es un mapa.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

El método `IsUlid` determina si la cadena dada es un ULID.

```go
importar "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z6Z1Z6Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

El método `IsUuid` determina si la cadena dada es una UUID.

```go
importar "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

El método `Kebab` convierte la cadena a `kebab-case`.

```go
importar "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

El método `LcFirst` convierte el primer carácter de la cadena a minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Longitud`

El método `Length` devuelve la longitud de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Límite`

El método `Limit` trunca la cadena a la longitud dada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").Limit(7).String() // "This is..."
```

Opcionalmente, puede proporcionar el segundo argumento para cambiar la cadena que se utiliza para indicar el truncamiento.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").Limit(7, " (****)").String() // "This is (****)"
```

### `Bajo`

El método `Lower` convierte la cadena a minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

El método `LTrim` recorta el lado izquierdo de la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Máscara`

El método `Mask` enmascara la cadena con el carácter de máscara dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**************"
```

Si es necesario, puedes proporcionar un número negativo al método de máscara que indica al método para comenzar a enmascarar desde el final de la cadena
.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**********"
```

### `Coincide`

El método `Match` determina si la cadena dada coincide con la expresión regular dada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("This is a (test) string").Match(`\([^)]+\)`).String() // (test)
```

### `Coincidir todo`

El método `MatchAll` determina si la cadena dada coincide con todas las expresiones regulares.

```go
importar "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `Coincidir con Is`

El método `IsMatch` determina si la cadena dada coincide (cualquiera de) la expresión regular dada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // verdadero
```

### `NewLine`

El método `NewLine` añade un carácter de nueva línea a la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

El método `PadBoth` pads ambos lados de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

El método `PadLeft` avala el lado izquierdo de la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### \`PadRight

El método \`PadRight pads el lado derecho de la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight (10, "_").String() // "Hello_____"
```

### `Pipe`

El método `Pipe` le permite transformar la cadena usando un cierre determinado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Prepend`

El método `Prepend` antepone el valor dado a la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Eliminar`

El método `Remove` elimina los valores dados de la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hola "

str.Of("Hola World").Remove("World", "Hello").String() // "
```

### `Repetir`

El método `Repeat` repite la cadena un número determinado de veces.

```go
importar "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Reemplazar`

El método `Replace` reemplaza el valor dado en la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").Replace("Mundo", "Krishan").String() // "Hola Krishan"
```

Por defecto, el método `Replace` es sensible a mayúsculas y minúsculas. Si desea que el método sea insensivo de mayúsculas y minúsculas, puede pasar
`false` como tercer argumento.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").Replace("mundo", "Krishan", false).String() // "Hola Krishan"
```

### `Reemplazar fin`

El método `ReplaceEnd` reemplaza la última ocurrencia del valor dado en la cadena sólo si está al final de la cadena
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").ReplaceEnd("World", "Goravel").String() // "Hola Goravel"

str.Of("Hola Mundo").ReplaceEnd("Hello", "Goravel").String() // "Hola Mundo"
```

### `Reemplazar Primero`

El método `ReplaceFirst` reemplaza la primera aparición del valor dado en la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").ReplaceFirst("Mundo", "Goravel").String() // "Hola Goravel"
```

### `Reemplazar último`

El método `ReplaceLast` reemplaza la última ocurrencia del valor dado en la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").ReplaceLast("Mundo", "Goravel").String() // "Hola Goravel"
```

### \`Reemplazar Partidas

El método `ReplaceMatches` reemplaza la expresión regular dada en la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Hola, Krishan!"
```

### `Reemplazar`

El método `ReplaceStart` reemplaza la primera ocurrencia del valor dado en la cadena sólo si está al inicio de
la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hola Mundo"
```

### `RTrim`

El método `RTrim` recorta el lado derecho de la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Serpiente`

El método `Snake` convierte la cadena a `snake_case`.

```go
importar "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Dividir`

El método `Split` divide la cadena en una matriz de cadenas usando el delimitador dado.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

El método `Squish` reemplaza los caracteres consecutivos de espacios en blanco por un solo espacio.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola Mundo").Squish().String() // "Hola Mundo"
```

### `Iniciar`

El método `Start` añade una sola instancia del valor dado al principio de la cadena si no inicia ya
con el valor.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `Comienza con`

El método `StartsWith` determina si la cadena dada comienza con (cualquiera) valor(es) dados. El método es sensible a mayúsculas y minúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `Cadena`

El método `String` devuelve la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Estudios`

El método `Studly` convierte la cadena a `StudlyCase`.

```go
importar "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

El método `Substr` devuelve la porción de la cadena que comienza en el índice dado y continúa para la longitud dada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Intercambio`

El método `Swap` cambia varios valores en la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### `Toque`

El método `Tap` pasa la cadena al cierre dado y devuelve la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Pruebas`

El método `Test` determina si la cadena dada coincide con la expresión regular dada.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola, Goravel!").Test(`goravel!(.*)`) // verdadero
```

### `Title`

El método `Title` convierte la cadena a `Title Case`.

```go
importar "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Trim`

El método `Trim` recorta la cadena.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

El método `UcFirst` convierte el primer carácter de la cadena en mayúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("goravel framework"))[video] cFirst().String() // "Goravel framework"
```

### `UcSplit`

El método `UcSplit` divide la cadena en una matriz de cadenas usando caracteres en mayúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `A menos`

El método `Unless` pasa la cadena al cierre dado y devuelve la cadena si la condición dada es `false`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Superior`

El método `Upper` convierte la cadena en mayúsculas.

```go
importar "github.com/goravel/framework/support/str"

str.Of("goravel"))[video] pper().String() // "GORAVEL"
```

### `Cuándo`

El método `When` pasa la cadena al cierre dado y devuelve la cadena si la condición dada es `true`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Si es necesario, puedes proporcionar el tercer argumento al método `When` que es un cierre que se ejecutará cuando la condición
sea `false`.

### `Cuándo`

El método `WhenContains` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada contiene el valor
dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hola Bowen Han"
```

Si es necesario, puedes proporcionar el tercer argumento al método `WhenContains` que es un cierre que se ejecutará
cuando la cadena no contiene el valor dado.

### `WhenContiene Todos`

El método `WhenContainsAll` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada contiene
todos los valores dados.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Si es necesario, puedes proporcionar el tercer argumento al método `WhenContainsAll` que es un cierre que se ejecutará
cuando la cadena no contiene todos los valores dados.

### `Cuando vacío`

El método `WhenEmpty` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada está vacía.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

El método `WhenIsAscii` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada contiene solo caracteres
ASCII.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("mañana").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "mañana"
```

### `Cuando no está vacío`

El método `WhenNotEmpty` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada no está
vacía.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `Cuando empiece con`

El método `WhenStartsWith` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada comienza
con el valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("hola mund").WhenStartsWith("hola", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hola Mundo"
```

### `WhenEndsWith`

El método `WhenEndsWith` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada termina con
el valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("hola mundo").WhenEndsWith("mundo", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hola Mundo"
```

### `WhenExactly`

El método `WhenExactly` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada es exactamente
igual al valor dado.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNottly`

El método `WhenNotExactly` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada no es
exactamente igual al valor dado.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `Cuándo`

El método `WhenIs` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada coincide con el patrón
dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

El método `WhenIsUlid` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada es un ULID.

```go
importar "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z6Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6Z6"
```

### `WhenIsUuid`

El método `WhenIsUuid` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada es una UUID.

```go
importar "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `WhenTest`

El método `WhenTest` pasa la cadena al cierre dado y devuelve la cadena si la cadena dada coincide con la expresión regular
dada.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

El método `WordCount` devuelve el número de palabras en la cadena.

```go
importar "github.com/goravel/framework/support/str"

str.Of("Hola, World!").WordCount() // 2
```

### `Palabras`

El método `Words` limita el número de palabras en la cadena. Si es necesario, puede proporcionar el segundo argumento para cambiar
la cadena que se utiliza para indicar el truncamiento.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hola, World!").Words(1) // "Hola..."

str.Of("Hola, World!").Words(1, " (****)") // "Hola (****)"
```
