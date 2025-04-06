# Artisan Console

Artisan es la herramienta CLI que viene con Goravel para interactuar con la línea de comandos. Puedes acceder a él usando
`facades.Artisan()`. Esta herramienta tiene varios comandos útiles que pueden ayudarte en el desarrollo de tu aplicación.
Utilice el siguiente comando para ver todos los comandos disponibles.

```shell
go run . artisan list
```

Cada comando también tiene una función de "ayuda" que muestra y explica los argumentos y opciones asociadas con el comando. Para
ver la pantalla de ayuda, simplemente añade "help" antes del nombre del comando.

```shell
go run . artisan help migrate
```

En lugar de repetir `go run . Comando artisan ...`, puedes añadir un alias a tu configuración de shell con el comando
terminal de abajo:

```shell
echo -e "\r\nalias artisan=\"go run . artisan\"" >>~/.zshrc
```

Entonces puedes ejecutar tus comandos de esta manera:

```shell
DemoController de compás
```

También puedes usar el script de shell `artisan` de esta manera:

```shell
./artisan make:controlador DemoController
```

### Generar Comandos

Puedes usar el comando `make:command` para crear un nuevo comando en el directorio `app/console/commands`. No te preocupes si
este directorio no existe en tu aplicación, se creará la primera vez que ejecutes el comando `make:command`:

```shell
ve a ejecutar. artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Estructura de comandos

Después de generar el comando, asigne valores adecuados a las propiedades de firma y descripción de la estructura. El método
`Handle` será llamado cuando tu comando sea ejecutado. Necesita implementar su lógica en este método.

```go
comandos de paquete

import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Firma El nombre y firma del comando de consola.
func (receptor *SendEmails) Signature() string {
  return "send:emails"
}

// Descripción La descripción del comando de la consola.
func (receptor *SendEmails) Description() string {
  return "Send emails"
}

// Extiende el comando de consola extendido.
func (receptor *SendEmails) Comando Extend(). xtend {
  return command.Extend{}
}

// Ejecuta el comando de consola.
func (receptor *SendEmails) Handle(ctx console.Context) error {
  return nil
}
```

## Comando E/S

### Retrieving Input

Cuando escribes comandos de consola, es típico recoger la entrada del usuario a través de `arguments` o `options`. Con Goravel, es
extremadamente fácil recuperar los argumentos y opciones que el usuario proporciona.

#### Argumentos

Seguir los argumentos después del comando:

```shell
go run . artisan send:emails NAME EMAIL
```

Get arguments:

```go
func (receptor *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Opciones

Las opciones, como los argumentos, son otra forma de entrada de usuario. Las opciones tienen el prefijo de dos guiones (--) cuando se proporcionan
a través de la línea de comandos.

Definición：

```go
func (receiver *ListCommand) Extend() command.Extend {
  return command.Extend{
    Flags: []command.Flag{
      &command.StringFlag{
        Name:    "lang",
        Value:   "default",
        Aliases: []string{"l"},
        Usage:   "language for the greeting",
      },
    },
  }
}
```

Obtener：

```go
func (receptor *ListCommand) error Handle(ctx console.Context) {
  lang := ctx.Option("lang")

  return nil
}
```

Uso：

```shell
go run . artisan emails --lang Chinese
go run. artisan emails -l Chinese
```

Aviso: Cuando se utilizan tanto argumentos como opciones, defina las opciones antes de los argumentos. Ejemplo:

```shell
// Derecho
go run . artisan emails --lang=Chinese name
// Wrong
go run . artisan emails name --lang=Chinese name
```

Excepto `command.StringFlag`, también podemos usar otro tipo `Flag` y `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Prompación para la entrada

#### Preguntas

Además de argumentos y opciones, también se puede pedir al usuario una entrada durante la ejecución de un comando. El método
`Ask` le pedirá al usuario con la pregunta dada y devolverá su respuesta:

```go
func (receptor *SendEmails) error Handle(ctx console.Context) {
  email, err := ctx.Ask("¿Cuál es tu dirección de correo electrónico?")
  
  return err
}
```

Además, puede pasar opciones al método `Ask` como segundo argumento opcional:

```go
func (receptor *SendEmails) error Handle(ctx console.Context) {
    name, err := ctx.Ask("¿Cuál es tu nombre?", consola. skOption{
        Predeterminado: "Krishan",
    })
    
    return err
}

// Opciones disponibles
type AskOption struct {
    // Por defecto el valor predeterminado de la entrada.
    Cadena por defecto
    // Descripción la descripción de la entrada.
    Descripción cadena
    // Linea el número de líneas de la entrada. use para múltiples líneas de texto)
    líneas int
    // Limita el límite de caracteres para la entrada.
    Limit int
    // Múltiples determina si la entrada es una sola línea o múltiples líneas texto
    Multiple bool
    // Posiciona el marcador de posición de entrada.
    cadena de marcador de posición
    // Muestra el mensaje del intérprete. use for single line input)
    Prompt string
    // Validar la función de validación de entrada.
    Validar función (cadena) error
}
```

A veces puede que necesite ocultar la entrada del usuario, como cuando solicite una contraseña. Puedes usar el método `Mobiliario` para
ocultar la entrada del usuario:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    password, err := ctx.Secret("What is the password?", console.SecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors.New("password length should be at least 8")
            }
            return nil
        },
    })
    
    return err
}

// Available options
type SecretOption struct {
    // Default the default value for the input.
    Default string
    // Description the input description.
    Description string
    // Limit the character limit for the input.
    Limit int
    // Placeholder the input placeholder.
    Placeholder string
    // Validate the input validation function.
    Validate func(string) error
}
```

#### Confirmando Acciones

Si necesita pedir al usuario que confirme una acción antes de proceder, puede utilizar el método `Confirm`. Por defecto, este método
devolverá `false` a menos que el usuario seleccione la opción afirmativa.

```go
if answer, _ := ctx.Confirm("Do you want to continue?"); !answer {
    // ...
}
```

También puede pasar un segundo argumento al método `Confirmar` para personalizar el valor predeterminado, etiqueta de los botones afirmativos y
negativos:

```go
if answer, _ := ctx.Confirm("¿Quieres continuar?", consola. onfirmOption; ! nswer {
 Default : true,
 Afirmativo : "Sí",
 Negative : "No",
}) {
    // . .
}

// Opciones disponibles
type ConfirmOption struct {
    // Etiqueta afirmativa para el botón afirmativo.
    Cadena
    // Por defecto el valor por defecto para la entrada.
    bool por defecto
    // Descripción de la descripción de la entrada.
    Descripción cadena
    // Etiqueta negativa para el botón negativo.
    cadena negativa
}
```

#### Preguntas de selección única

Si necesita pedir al usuario que seleccione una opción de una lista de opciones, puede utilizar el método `Choice`. El método `Choice`
retornará el valor de la opción seleccionada:

```go
question := "¿Cuál es tu lenguaje de programación favorito?"
options := []consola. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleccionado: true},
}
color, err := ctx. hoice(pregunta, opciones)
```

Además, puede pasar opciones al método `Choice` como segundo argumento opcional:

```go
question := "¿Cuál es tu lenguaje de programación favorito?"
options := []consola. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleccionado: true},
}

color, err := ctx. hoice(pregunta, opciones, consola. hoiceOption{
    Por defecto: "go",
})

// Opciones disponibles
type ChoiceOption struct {
    // Predeterminado el valor predeterminado para la entrada.
    Cadena Predeterminada
    // Descripción de la descripción de la entrada.
    Description string
    // Validar la función de validación de entrada.
    Error de función de validación (cadena)
}
```

#### Selección múltiple de preguntas

Si necesita pedir al usuario que seleccione varias opciones de una lista de opciones, puede utilizar el método `MultiSelect`. El método
`MultiSelect` retornará los valores de las opciones seleccionadas:

```go
question := "¿Cuáles son tus lenguajes de programación favoritos?"
options := []consola. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleccionado: true},
}
colores, err := ctx. ultiSelect(preguntas, opciones)
```

Además, puede pasar opciones al método `MultiSelect` como segundo argumento opcional:

```go
question := "¿Cuáles son tus lenguajes de programación favoritos?"
options := []consola. hoice{
    {Key: "go", Valor: "Go"},
    {Key: "php", Valor: "PHP"},
    {Key: "python", Valor: "Python"},
    {Key: "cpp", Valor: "C++", Seleccionado: true},
}

colores, err := ctx. ultiSelect(pregunta, opciones, consola. ultiSelectOption{
    Predeterminado: []string{"go", "php"},
})

// Opciones disponibles
tipo MultiSelectOption struct {
    // Predeterminado el valor predeterminado para la entrada.
    Default []string
    // Descripción de la descripción de la entrada.
    Descripción cadena
    // Filtrable determina si las opciones pueden ser filtradas, escribe `/` para iniciar el filtro.
    bool filtrable
    // Limita el número de opciones que pueden ser seleccionadas.
    Límite int
    // Validar la función de validación de entrada.
    Validar función ([]cadena) error
}
```

### Salida de escritura

A veces puede que necesite escribir salida en la consola. Goravel proporciona varios métodos para ayudarte a escribir salida
a la consola. Cada uno de los métodos tiene su salida coloreada apropiada. Por ejemplo, `Error` mostrará el texto
en rojo.

```go
func (receptor *SendEmails) error Handle(ctx console.Context) {
  ctx. omment("Este es un mensaje de comentario")
  ctx.Info("Este es un mensaje de información")
  ctx. rror("Este es un mensaje de error")
  ctx.Line("Este es un mensaje de línea")
  ctx. arning("Este es un mensaje de advertencia")
  return nil
}
```

Puedes usar el método `NewLine` para escribir una nueva línea en la consola:

```go
// escribir una línea en blanco única
ctx.NewLine()

// escribir múltiples líneas en blanco
ctx.NewLine(2)
```

#### Barras de progreso

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. Puedes usar el método `WithProgressBar` para mostrar una barra de progreso.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

A veces puede que necesite actualizar la barra de progreso manualmente. Puede utilizar el método `CreateProgressBar` para actualizar la barra de progreso
:

```go
users := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range users {
    // process user
    bar. dvance()
 
 // duerme durante un tiempo para simular el procesamiento de tiempo 
    . leep(time.Millisegundo * 50)
}

err = bar.Finish()
```

#### Spinner

Si necesita mostrar un spinner mientras se ejecuta una tarea, puede utilizar el método `Spinner`.

```go
err := ctx.Spinner("Cargando...", consola. pinnerOption{
    Action: func() error {
        // cuando detener el spinner
        tiempo. leep(2 * time.Segundo)
        return nil
    },
})
```

## Categoría

Puede establecer un conjunto de comandos a la misma categoría, conveniente en `go run . Lista de companes`:

```go
// Extiende el comando extendido.
func (receptor *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## Ordenes de registro

Todos tus comandos de consola necesitan ser registrados dentro de la función `Commands` en `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Ejecutar comandos programáticamente

A veces puedes desear ejecutar un comando Artisan fuera de la CLI, puedes usar el método `Call` en las `facades
. rtisan()` para operar esto.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinese name") // Con argumentos y opciones
})
```
