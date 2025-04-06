# 颜色

`color` 包提供了一系列函数来使用 [PTerm](https://github.com/pterm/pterm)库来色终端
的输出。

## 特定颜色

软件包提供了为特定颜色创建打印机的方法。 这些方法可以让您轻松地色化终端
输出。

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

### 打印机方法

"contracts/support.Printer" 提供以下方法来打印或格式化带颜色的文本：

- `Print` - 打印文本
- `Println` - 用新行打印文本
- `Printf` - 打印格式化文本
- `Sprint` - 返回彩色文本
- `Sprintln` - 带有新行返回颜色的文本
- `Sprintf` - 返回格式化文本

```go
import "github.com/goravel/framework/support/color"

color.Blue().Println("Hello, Goravel!")
color.Green().Printf("Hello, %s!", "Goravel")
```

## 自定义颜色

### `color.New`

`color.New`函数创建新的颜色打印机。 您可以使用此对象来颜色化终端的输出。

```go
import "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("Hello, Goravel!")
```
