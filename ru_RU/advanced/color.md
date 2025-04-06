# Цвет

Пакет `color` содержит набор функций для раскрашивания вывода терминала
с помощью библиотеки [PTerm](https://github.com/pterm/pterm).

## Конкретный цвет

Пакет предоставляет методы создания принтеров для определенного цвета. These methods allow you to easily colorize terminal
output.

- `color.Red()`
- `color.Green()`
- `color.Yellow()`
- `color.Blue()`
- `color.Magenta()`
- `color.Cyan()`
- `color.White()`
- `color.Black()`
- `color.Gray()`
- `color.Default()`

### Методы принтера

`contracts/support.Printer` предоставляет следующие методы для печати или форматирования текста цветом:

- `Print` - Печать текста
- `Println` - Печать текста с новой строкой
- `Printf` - Печать текста
- `Sprint` - Вернуть цветной текст
- `Sprintln` - Вернуть цветной текст с новой строкой
- `Sprintf` - Возвращаемый цветной текст

```go
импортируйте "github.com/goravel/framework/support/color"

color.Blue().Println("Привет, Goravel!")
color.Green().Printf("Привет, %s!", "Goravel")
```

## Пользовательский цвет

### `color.New`

Функция `color.New` создает новый цветной принтер. Этот объект можно использовать для раскрашивания вывода терминала.

```go
импортируйте "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Привет, Goravel!")
```
