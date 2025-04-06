# Artisan Console

Исполнитель - это инструмент CLI, который поставляется с Goravel для взаимодействия с командной строкой. Вы можете получить доступ к нему используя
`facades.Artisan()`. Этот инструмент имеет несколько полезных команд, которые помогут вам в разработке вашего приложения.
Используйте следующую команду для просмотра всех доступных команд.

```shell
создать список ремесленников
```

Каждая команда также имеет функцию "help", которая показывает и объясняет аргументы и параметры, связанные с командой. Чтобы
увидеть окно справки, просто добавьте "help" перед именем команды.

```shell
мигрировать с помощью кустарника
```

Вместо того чтобы повторять `go run . artisan ...`, вы можете добавить псевдоним в конфигурацию оболочки с помощью команды
terminal ниже:

```shell
echo -e "\r\nалиас artisan=\"go run . artisan\"" >>~/.zshrc
```

Затем вы можете просто выполнить свои команды вроде этого:

```shell
ремесленный:контроллер DemoController
```

Вы также можете использовать скрипт оболочки `artisan`:

```shell
./artisan make:controller DemoController
```

### Создание команд

Вы можете использовать команду `make:command` для создания новой команды в папке `app/console/commands`. Не беспокойтесь, если
этот каталог не существует в вашем приложении, он будет создан при первом запуске команды `make:command`:

```shell
go run . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Структура команд

После генерации вашей команды, назначьте подходящие значения свойствам подписи и описания структуры. При выполнении команды будет вызываться метод
`Handle`. Вам нужно реализовать свою логику в этом методе.

```go
файл команд

импорт (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

тип SendEmails struct {
}

// Имя и подпись консольной команды.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Описание консольной команды.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Расширяем команду консоли extend.
func (receiver *SendEmails) Extend() команда. xtend {
  return command.Extend{}
}

// Обработка консольной команды.
func (ресивер *SendEmails) Handle(ctx console.Context) ошибка {
  return nil
}
```

## Команда I/O

### Retrieving Input

Когда вы пишете консольные команды, обычно собирают входные данные пользователя через `arguments` или `options`. With Goravel, it's
extremely easy to retrieve the arguments and options that the user provides.

#### Аргументы

Следуйте аргументам после команды:

```shell
запустить . artisan send:emails NAME EMAIL
```

Get arguments:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Варианты

Параметры, такие как аргументы, являются другой формой пользовательского ввода. Опции префикса определяются двумя дефисами (--), когда они предоставляются
через командную строку.

Определение：

```go
func (receiver *ListCommand) Extend() command.Extend {
  return команда. xtend{
    Flags: []command.Flag{
      &command. tringFlag{
        Имя: "lang",
        Значение: "default",
        Псевдонимы: []string{"l"},
        Использование: "язык приветствия",
      },
    },
  }
}
```

Получить：

```go
func (receiver *ListCommand) Handle(ctx console.Context) error {
  lang := ctx.Option("lang")

  return nil
}
```

Использование：

```shell
бежать . artisan письма --lang Chinese
ищите запустить . кустарные письма -l Chinese
```

Внимание: при использовании аргументов и опций определяйте параметры перед аргументами. Например:

```shell
// Правый
выполнять . artisan email --lang=Китайское имя
// Неверное
go run . artisan email name --lang=Китайское имя
```

Кроме `command.StringFlag`, мы также можем использовать другой тип `Flag` и `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Запрос для ввода

#### Задать вопросы

В дополнение к аргументам и опциям вы можете также запрашивать у пользователя входную информацию во время выполнения команды. Метод
`Ask` попросит пользователя ответить на заданный вопрос:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  email, err := ctx.Ask("Каков ваш адрес электронной почты?")
  
  return err
}
```

Кроме того, вы можете передать параметры методу `Ask` в качестве необязательного второго аргумента:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    name, err := ctx.Ask("Как ваше имя?", консоль. skOption{
        По умолчанию: "Кришан",
    })
    
    return err
}

// Доступные параметры
type AskOption struct {
    // Значение по умолчанию для ввода.
    Строка по умолчанию
    // Описание входного описания.
    Строка описания
    // Строка количества строк для ввода. use for multiple lines text)
    Lines int
    // Ограничение на число символов ввода.
    Limit int
    // Множество определяет, является ли входная строка одной или нескольких строк текстом
    Multiple bool
    // Заполнитель входного плейсхолдера.
    Строка с меткой
    // Запрашиваемое сообщение. use for single line input)
    Prompt string
    // Проверка функции проверки входных данных.
    Ошибка проверки функции (строка)
}
```

Иногда вам нужно скрыть ввод пользователя, например при запросе пароля. Вы можете использовать метод `Secret` для
скрыть ввод пользователя:

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
    password, err := ctx.Secret("Что такое пароль?", консоль. ecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors. ew("длина пароля должна быть по крайней мере 8")
            }
            возвращает номер
        },
    })
    
    return err
}

// Доступные параметры
type SecretOption struct {
    // Значение по умолчанию для ввода.
    Строка по умолчанию
    // Описание входного описания.
    Строка описания
    // Ограничение количества символов для ввода.
    Ограничение int
    // Заполнитель входного плейсхолдера.
    Строка Placeholder
    // Проверка функции проверки входных данных.
    Ошибка проверки функции (строка)
}
```

#### Подтверждение действий

Если вам нужно попросить пользователя подтвердить действие, прежде чем продолжить, вы можете использовать метод «Подтвердить». По умолчанию, этот метод
будет возвращать `false`, если пользователь не выбрал опцию утвердительной.

```go
if answer, _ := ctx.Confirm("Хотите продолжить?"); !answer {
    // ...
}
```

Вы также можете передать второй аргумент методу `Подтвердить` для настройки значения по умолчанию, метки аффирмативных и
отрицательных кнопок:

```go
if answer, _ := ctx.Confirm("Do you wish to continue?", консоль. onfirmOption; ! nswer {
 По умолчанию : true,
 Affirmative : "Да",
 Отрицательная : "No",
}) {
    // . .
}

// Доступные варианты
type ConfirmOption struct {
    // Affirmative label for the affirmative button.
    Конструктивная строка
    // Значение по умолчанию для ввода.
    Бул по умолчанию
    // Описание входного описания.
    Строка описания
    // Отрицательный ярлык для отрицательной кнопки.
    Отрицательная строка
}
```

#### Одиночные вопросы

Если вам нужно попросить пользователя выбрать опцию из списка параметров, вы можете воспользоваться методом `Choice`. The `Choice`
method will return the value of the selected option:

```go
question := "What is your favorite programming language?"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}
color, err := ctx.Choice(question, options)
```

Кроме того, вы можете передать параметры методу "Choice" в качестве необязательного второго аргумента:

```go
question := "What is your favorite programming language?"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}

color, err := ctx.Choice(question, options, console.ChoiceOption{
    Default: "go",
})

// Available options
type ChoiceOption struct {
    // Default the default value for the input.
    Default string
    // Description the input description.
    Description string
    // Validate the input validation function.
    Validate func(string) error
}
```

#### Несколько вопросов

Если вам нужно попросить пользователя выбрать несколько параметров из списка параметров, вы можете использовать метод `MultiSelect`. Метод
`MultiSelect` возвращает значения выбранных опций:

```go
question := "What are your favorite programming languages?"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}
colors, err := ctx.MultiSelect(question, options)
```

Кроме того, вы можете передать параметры методу `MultiSelect` в качестве опционального второго аргумента:

```go
question := "What are your favorite programming languages?"
options := []console.Choice{
    {Key: "go", Value: "Go"},
    {Key: "php", Value: "PHP"},
    {Key: "python", Value: "Python"},
    {Key: "cpp", Value: "C++", Selected: true},
}

colors, err := ctx.MultiSelect(question, options, console.MultiSelectOption{
    Default: []string{"go", "php"},
})

// Available options
type MultiSelectOption struct {
    // Default the default value for the input.
    Default []string
    // Description the input description.
    Description string
    // Filterable determines if the choices can be filtered, type `/` to starting filter.
    Filterable bool
    // Limit the number of choices that can be selected.
    Limit int
    // Validate the input validation function.
    Validate func([]string) error
}
```

### Запись вывода

Иногда вам может потребоваться записать вывод в консоль. Goravel предоставляет несколько методов для помощи в написании вывода
в консоли. Каждый метод имеет соответствующий раскрашенный вывод. Например, `Error` будет показывать текст
в красном цвете.

```go
error func (receiver *SendEmails) Handle(ctx console.Context) {
  ctx. omment("Это комментарий сообщение")
  ctx.Info("Это информационное сообщение")
  ctx. rror("Это сообщение об ошибке")
  ctx.Line("Это сообщение строки")
  ctx. arning("Это предупреждающее сообщение")
  возвращает номер
}
```

Вы можете использовать метод `NewLine` для записи новой строки в консоль:

```go
// запись одной пустой строки
ctx.NewLine()

// запись нескольких пустых строк
ctx.NewLine(2)
```

#### Панели прогресса

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. Вы можете использовать метод `WithProgressBar` для отображения индикатора прогресса.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

Иногда может потребоваться обновление индикатора вручную. You can use the `CreateProgressBar` method to update the
progress bar:

```go
пользователей := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range users {
    // обрабатываем пользователя
    bar. dvance()
 
 // sleep for a while to simulate processing 
    time. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Спинер

Если вам нужно отобразить вертушку во время выполнения задачи, вы можете использовать метод «Spinner».

```go
err := ctx.Spinner("Загрузка...", консоль. pinnerOption{
    Action: func() error {
        // когда останавливать вертушку
        времени. leep(2 * time.Second)
        return nil
    },
})
```

## Категория

Вы можете установить набор команд в ту же категорию, удобную в \`go run . ремесленный список:

```go
// Расширьте команду консоли extend.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## Регистрация команд

Все ваши консольные команды должны быть зарегистрированы в функции `Commands` в `app\console\kernel.go`.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Программное выполнение команд

Sometimes you may wish to execute an Artisan command outside of the CLI, you can use the `Call` method on the
`facades.Artisan()` to operate this.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("email --lang Chinese name") // С аргументами и настройками
})
```
