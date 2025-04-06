# Artisan Console

艺术家是Goravel与命令行交互的 CLI 工具。 您可以使用
`facades.Artisan()` 访问它。 此工具有几个有用的命令，可以帮助您开发您的应用程序。
使用以下命令查看所有可用的命令。

```shell
前往运行。手工列表
```

每个命令还有一个“帮助”功能，显示和解释与命令相关的参数和选项。 若要
请看帮助屏幕，只需在命令名称前添加"帮助"。

```shell
去运行。手工人员帮助迁移
```

而不是重复“去跑”。 艺人...\`命令, 你可能想要在你的 shell 配置中添加一个别名, 和
以下终端命令:

```shell
echo -e "\r\n别名工匠=\"去运行。artisan\"" >~/.zshrc
```

然后你可以简单地运行你的命令，就像这样：

```shell
手工匠：控制器降序器
```

您也可以使用 `artisan`shell 脚本，如：

```shell
./艺人make:controller
```

### 生成命令

您可以使用 `make:command` 命令在 `app/console/commands` 目录中创建一个新的命令。 如果
此目录不存在于您的应用程序中，它将被创建，第一次运行"make:command"命令：

```shell
开始运行。个体操者make:command SendEmails
来运行。个体操者make:command user/SendEmails
```

### 命令结构

生成您的命令后，给结构的签名和描述属性分配合适的值。 当你的命令被执行时，将调用
`Handle` 方法。 您需要在这个方法中实现您的逻辑。

```go
package commands

import (
  "github.com/goravel/framework/contracts/console"
  "github.com/goravel/framework/contracts/console/command"
)

type SendEmails struct {
}

// Signature The name and signature of the console command.
func (receiver *SendEmails) Signature() string {
  return "send:emails"
}

// Description The console command description.
func (receiver *SendEmails) Description() string {
  return "Send emails"
}

// Extend The console command extend.
func (receiver *SendEmails) Extend() command.Extend {
  return command.Extend{}
}

// Handle Execute the console command.
func (receiver *SendEmails) Handle(ctx console.Context) error {
  return nil
}
```

## 命令 I/O

### Retrieving Input

当你写控制台命令时，通常是通过“参数”或“选项”来收集用户输入。 With Goravel, it's
extremely easy to retrieve the arguments and options that the user provides.

#### 参数

按照命令后的参数：

```shell
去运行。手工人员发送：电子邮件名称电子邮件
```

Get arguments:

```go
func (receiver *SendEmails) Handle(ctx console.Context) 错误。
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### 备选方案

选项和参数一样，是另一种形式的用户输入。 当通过命令行提供
时，选项由两个连字(--)预设。

Definition：

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

获取：

```go
func (receiver *ListCommand) Handle(ctx console.Context text) Erreur
  lang := ctx.Option("lang")

  return nil

```

使用：

```shell
go run . artisan emails --lang Chinese
go run . artisan emails -l Chinese
```

注意：当使用参数和选项时，定义参数之前的选项。 示例：

```shell
// Right
go run . artisan emails --lang=Chinese name
// Wrong
go run . artisan emails name --lang=Chinese name
```

除了`command.StringFlag`, 我们也可以使用其他类型的`Flag`和`Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`.

### 提示输入

#### 提问问题

除了参数和选项外，您还可以在执行命令时提示用户输入信息。
`Ask` 方法将促使用户使用给定的问题并返回他们的响应：

```go
func (receiver *SendEmails) Handle(ctx console.Context) 错误。
  email, err := ctx.Ask("什么是您的电子邮件地址？")
  
  return
}
```

此外，您可以将选项传递到 "Ask" 方法作为可选的第二个参数：

```go
func (receiver *SendEmails) Handle(ctx console.Context) 错误。
    name, err := ctx.Ask("什么是你的名字？", 控制台。 skOptionint
        Default: "Krishan",
    (
 })
    
    return
}

// 可用选项
类型 AskOption struct P.
    // 默认输入的默认值。
    默认字符串
    // 输入描述。
    描述字符串
    // 行输入的行数。 用于多行文本)
    行int
    // 限制输入的字符限制。
    Limit int
    // Multiple determines 是否输入单行或多行文本
    Multibool
    // 占位符输入占位符。
    占位符字符串
    // 提示即时消息。 用于单行输入的提示)
    提示字符串
    // 验证输入验证功能。
    验证函数(字符串) 错误
}
```

有时您可能需要隐藏用户输入，例如当提示密码时。 You can use the `Secret` method to
hide the user input:

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

#### 确认操作

如果您需要在继续操作之前要求用户确认一个动作，您可以使用 "确认" 方法。 默认情况下，此
方法将返回 `false` ，除非用户选择肯定选项。

```go
如果回答，_ := ctx.confirm("你想要继续吗？"); !reply own
    /...

```

您也可以将第二个参数传递给"确认"方法来自定义默认值、正定性标签和
负面按钮：

```go
if answer, _ := ctx.Confirm("Do you wish to continue?", console.ConfirmOption; !answer {
 Default : true,
 Affirmative : "Yes",
 Negative : "No",
}) {
    // ...
}

// Available options
type ConfirmOption struct {
    // Affirmative label for the affirmative button.
    Affirmative string
    // Default the default value for the input.
    Default bool
    // Description the input description.
    Description string
    // Negative label for the negative button.
    Negative string
}
```

#### 单选问题

如果您需要让用户从选项列表中选择一个选项，您可以使用 "Choice" 方法。 `Choice`
方法将返回选中选项的值：

```go
问题 := “您最喜欢的编程语言是什么？”
选项 := []console。 hoicew
    {Key: "go", 值: "Go"},
    {Key: "php", 值: "PHP"},
    {Key: "python", 值: "Python"},
    {Key: "cpp", 值: "C++", 选择: true},
}
颜色, err := ctx. hoice(问题, 选项)
```

此外，您可以将选项传递到 `Choice` 方法作为可选的第二个参数：

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

#### 多个选择问题

如果您需要让用户从选项列表中选择多个选项，您可以使用 `MultiSelect` 方法。
`MultiSelect` 方法将返回所选选项的值：

```go
问题 := “你最喜欢的编程语言?”
选项 := []console. hoicew
    {Key: "go", 值: "Go"},
    {Key: "php", 值: "PHP"},
    {Key: "python", 值: "Python"},
    {Key: "cpp", 值: "C+", 选择: true},
}
颜色, err := ctx. ultiSelect(问题, 选项)
```

此外，您可以将选项传递到 `MultiSelect` 方法作为可选的第二个参数：

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

### 写入输出

有时，您可能需要将输出写入控制台。 Goravel提供了几种方法来帮助您写入输出
到控制台。 每一种方法都有适当的颜色化输出。 例如，`Error` 将以红色显示文本
。

```go
func (receiver *SendEmails) Handle(ctx console.Context) error {
  ctx.Comment("This is a comment message")
  ctx.Info("This is an info message")
  ctx.Error("This is an error message")
  ctx.Line("This is a line message")
  ctx.Warning("This is a warning message")
  return nil
}
```

您可以使用 `NewLine` 方法将新行写入控制台：

```go
// 写入单行空行
ctx.NewLine()

// 写入多行空白行
ctx.NewLine(2)
```

#### 进度条

For long-running tasks, it is often helpful to provide the user with some indication of how much time the task will
take. 您可以使用 "WewProgressBar" 方法来显示进度栏。

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WiProgressBar(items, func(项目任何) 错误 *
    // performance Task(item)
    return nil
})
```

有时，您可能需要手动更新进度栏。 您可以使用 `CreateProgressBar` 方法来更新
进度条：

```go
用户 := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

for _, user := range users v.
    // process user
    bar. dvance()
 
 // 睡眠时间模拟处理 
    时间。 leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### 旋转器

如果你需要在任务运行时显示旋转器, 你可以使用 `Spinner` 方法。

```go
err := ctx.Spinner("Loading...", console.SpinnerOption{
    Action: func() error {
        // when to stop the spinner
        time.Sleep(2 * time.Second)
        return nil
    },
})
```

## 类别

您可以在同一类别中设置一组命令，方便运行 艺人列表：

```go
// Extend The console command extend.
func (receiver *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Category: "make",
  }
}
```

## 注册命令

您所有的控制台命令都需要在 `app\console\kernel.go` 中的命令中注册。

```go
func (kernel Kernel) Commands() []console.Commando
  return []console.Commandeur
    &commands.SendEmails{},
  }
}
```

## 编程执行命令

有时，你可能想要在 CLI 之外执行一个艺术家命令，你可以在
`facades 上使用 `Call` 方法。 执行此操作的 rtisan()`。

```go
.Route().Get("/", func(c *gin.Context) 然后才能
  facades.Artisan().Call("emails")
  facades.Artisan().Artimsan().Call("emails --lang Chinese name") // 具有参数和选项
})
```
