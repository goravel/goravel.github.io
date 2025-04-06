# 字符串

Goravel提供一个流利的字符串操纵库，使您能够轻松地操纵字符串。 Fluent Strings
允许您通过方法链合并多个字符串操作，大多数方法返回实例
"支持/str"。 tring`, 让你为额外的方法连锁。 若要在应用链式的
操作后获得最终字符串值，您可以调用 `String`方法，返回底部的`string\` 值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## 可用方法

### `Of`

`Of`方法从给定字符串创建一个新的流体字符串实例。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `After`

`After` 方法返回一个指定值之后出现的字符串部分。 如果值为空字符串
或在原字符串中不存在，则返回完整字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // World!"
```

### `AfterLast`

`AfterLast` 方法返回指定值最后一次出现后出现的字符串部分。 如果
值为空字符串或在原始字符串中不存在，则返回完整字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Append`

`Append`方法将指定的值附加到字符串的末尾。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basename`

`Basename` 方法返回路径的尾随名称组件，可选择从
基础名称中删除指定的后缀。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Before`

`Before`方法返回在指定值之前出现的字符串部分。 如果值是空的
字符串或在原始字符串中不存在，则返回完整字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Hello "
```

### `BeforeLast`

`BeforeLast`方法返回指定值最后一次出现之前出现的字符串部分。 如果
值为空字符串或在原始字符串中不存在，则返回完整字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeuroLast(".").String() // "docs.goravel"
```

### `Between`

`Between` 方法返回两个给定值之间字符串的部分。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hello"
```

### `BetweenFirst`

`BetweenFirst` 方法返回两个给定值第一次出现之间的字符串部分。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hello"
```

### `Camel`

`Camel` 方法将字符串转换为 `camelCase` 。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

`CharAt` 方法返回给定索引处的字符。 如果索引超出范围，将返回空字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `Chopend`

`ChopEnd`方法会从字符串结尾移除给定的值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

`ChopStart` 方法会从字符串开始删除给定的值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String.String() // goravel.dev
```

### `Contains`

`Contains`方法决定给定的字符串是否包含给定的值。 这个方法是区分大小写的。 如果提供了多个
值，它将返回`true`，如果字符串包含任何一个值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `ContainsAll`

`ContainsAll`方法决定给定的字符串是否包含所有给定的值。 这个方法是区分大小写的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // falsal
```

### `Dirname`

`Dirname`方法返回路径的父部分。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

可选，您可以提供目录级别来从路径中修剪。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

`EndsWith`方法决定给定的字符串是否以给定的值结尾。 这个方法是区分大小写的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWid("vel") // true
```

您可以将多个值传递到方法上，以确定字符串是否以任何一个值结尾。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWid("vel", "lie") // true
```

### `Exactly`

`Exactly`方法决定给定字符串是否完全等于给定值。 这个方法是区分大小写的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `异常`

“异常”方法从匹配给定值的第一次出现的字符串中摘录。

```go
import "github.com/goravel/framework/support/str"

str.Of("这是一个美丽的早晨").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "……is a beautiful morn……
```

此外，您可以使用 'Omission' 选项来更改用于表示摘录的字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("这是一个美丽的早晨").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explode`

`Explode`方法使用给定的分隔符将字符串分割成一个字符串数组。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Hello", "World"}
```

### `终结`

`Finish`方法确保给定的字符串以给定的值结尾。 如果字符串已经以值结尾，
将不会再次添加。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `标题`

`Headline`方法将字符串转换为标题。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `Is`

`Is`方法决定给定的字符串是否匹配给定的模式。 这个方法是区分大小写的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

`IsEmpty` 方法决定给定的字符串是否为空。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

`IsNotEmpty`方法决定给定的字符串是否为空。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

`Isascii`方法决定给定的字符串是否只包含 ASCII 字符。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Isascii() // true

str.Of("fichel").Isascii() // falsal
```

### `IsSlice`

`IsSlice`方法决定给定的字符串是否是分割的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]").IsSlice() // true

str.Of({"name": "John"}".IsSlice() // falsal
```

### `IsMap`

`IsMap` 方法决定给定的字符串是否是一个地图。

```go
导入 "github.com/goravel/framework/support/str"

str.Of({"name": "John"}").IsMap() // true

str.Of(`[{"name": "Joh"}, {"name": "Alice"}]).IsMap() // falsal
```

### `IsUlid`

`IsUlid` 方法决定给定的字符串是否是一个 ULID。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z6Z1Z6Z6Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // falsal
```

### `IsUuid`

`IsUuid` 方法决定给定的字符串是否是 UUID。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446654400").IsUuid() // true

str.Of("krishan").IsUuid() // falsal
```

### `Kebab`

`Kebab` 方法将字符串转换为 `kebab-case` 。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

`LcFirst` 方法将字符串的第一个字符转换为小写。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### `Length`

`Length` 方法返回字符串的长度。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limit`

`Limit` 方法将字符串截断到给定的长度。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("这是一个美丽的上午").Limit(7).String() // "这是..."
```

可选，您可以提供第二个参数来更改用于表示截断的字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("这是一个美丽的上午").Limit(7, " (**)").String() // "这是(****)"
```

### `Lower`

`Lower` 方法将字符串转换为小写。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

`LTrim`方法修剪字符串左侧。

```go
导入 "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### `Mask`

`Mask` 方法用给定的掩码字符来掩盖字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri********"
```

如果需要，您可以提供负数来掩盖方法，指示该方法从
字符串结束后开始掩盖。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String.String() // "kris****@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris******************"
```

### `匹配`

`Match`方法决定给定的字符串是否匹配给定的正则表达式。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("这是一个 (test) 字符串").Match(`\([^)]+\)`.String() // (test)
```

### `MatchAll`

`MatchAll`方法决定给定的字符串是否匹配所有给定的正则表达式。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

`IsMatch`方法决定给定的字符串是否匹配给定的正则表达式

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch((?i)goravel`, `goravel!(.*)`// true
```

### `NewLine`

`NewLine`方法将一个新行字符添加到字符串中。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

`PadBoth`方法让字符串的两侧平移。

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

`PadLeft`方法向左平移。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

`PadRight` 方法把字符串的右侧推出。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_________"
```

### `Pipe`

`Pipe`方法允许您使用给定的关闭来转换字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Prepend`

`Prepend`方法预置给定的值到字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `移除`

`Remove`方法会从字符串中删除给定的值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String.() // "Hello "

str.Of("Hello World").Remove("World", "Hello").String() // "
```

### `重复`

“重复”方法重复一个给定的字符串次数。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `替换`

替换字符串中给定值的 `替换` 方法。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").替换("World", "Krishan").String() // "Hello Krishan"
```

默认情况下，“替换”方法是区分大小写的。 如果您希望该方法不区分大小写，您可以将 `false` 作为第三个参数传递。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").替换("world", "Krishan", false).String() // "Hello Krishan"
```

### `替换端`

只有在
字符串结束时，`替换端` 方法才能替换给定值在字符串中的最后一次出现。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() / / "Hello World"
```

### `替换第一个`

`替换第一个`方法替换字符串中给定值的第一次出现。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Hello Goravel"
```

### `替换Last`

`替换Last`方法替换字符串中给定值的最后一次出现。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplacLast("World", "Goravel").String() // "Hello Goravel"
```

### `替换Matches`

`替换Matches`方法替换字符串中给定的正则表达式匹配。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").ReplacMatches(`goravel!(.*)`, "Krishan") // "Hello, Krishan!"
```

### `替换Start`

`ReplaceStart` 方法仅在字符串开头存在给定值时才替换字符串中给定值的第一次出现。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplacStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplacStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

`RTrim`方法修剪字符串的右侧。

```go
导入 "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String.String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Snake`

`Snake`方法将字符串转换为 `snake_case` 。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `分割`

`Split`方法将字符串分割成一个数组的字符串，使用给定的分隔符。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

`Squish`方法用一个空格替换连续的空格字符。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Start`

`Start` 方法在字符串开头添加给定值的单个实例，如果它还没有以此值启动
的话。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `StartsWid`

`StartsWOR`方法决定给定字符串是否以(任何)给定值开头。 这个方法是区分大小写的。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWid("Gor") // true

str.Of("Hello World").StartsWid("Gor", "Hello") // true
```

### `String`

`String` 方法返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Studly`

`Studly`方法将字符串转换为 `StudlyCase`。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

`Substr` 方法返回从给定索引开始的字符串部分，然后继续给定长度。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

`Swap` 方法在字符串中交换多个值。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]stringu.
  "Golang": "Go",
  "超棒": "优秀",
 }).String() // "去是优秀"
```

### `Tap`

`Tap`方法将字符串传递到给定的闭合并返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) w
    fmt.Println(s)
}).String() // "Goravel"
```

### `测试`

`Test`方法决定给定的字符串是否匹配给定的正则表达式。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").Test(`goravel!(.*)`// true
```

### `Title`

`Title` 方法将字符串转换为 `Title Case` 。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### `Trim`

`Trim`方法修剪字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

`UcFirst` 方法将字符串的第一个字符转换为大写。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

`UcSplit`方法使用大写字符将字符串分割成一个字符串数组。

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### \`Unles'

`Unles' 方法将字符串传递到给定的闭合，并返回给定条件为false`的字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String *
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Upper`

`Upper` 方法将字符串转换为大写。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `When`

`When` 方法将字符串传递到给定的闭合中，如果给定条件是`true`，则返回字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

如有必要，您可以为 `When` 方法提供第三个参数，该参数是一个闭包，当条件为 `false` 时将执行该闭包。

### `WhenContains`

`WhenContains` 方法将字符串传递到给定的闭合，如果给定的字符串包含给定的
则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String *
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

必要时： 您可以提供第三个参数到 `WhenContains` 方法。当字符串不包含给定值时，这是一个将执行的
的闭合方法。

### `WhenContainsAll`

`WhenContainsAll` 方法将字符串传递到给定的结束，如果给定的字符串包含
所有给定的值，则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, function(s *str.String) *string.String *
    return s.Append(" Han")
}).String() / / "Hello Bowen Han"
```

必要时： 您可以提供第三个参数到 `WhenContainsAll` 方法，当字符串不包含所有给定的值时，将执行
的闭合方法。

### `WhenEmpty`

`WhenEmpty` 方法将字符串传递到给定的闭合，如果给定的字符串为空则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String 然后返回
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsascii`

`WhenIsAscii` 方法将字符串传递到给定的闭合中，如果给定的字符串只包含
ASCII 字符，则返回字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"

str.Of("你好").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "你好"
```

### `WhenNotEmpty`

`WhenNotEmpty` 方法将字符串传递到给定的闭合，如果给定的字符串不是
空，则返回字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsWid`

`WhenStartsWi` 方法将字符串传递到给定的闭合，如果给定的字符串以
开头则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWid(s "hello", func(s *str.String) *string.String *
    return s.Title()
}).String() // "Hello World"
```

### `WhenEndsWid`

如果给定字符串以给定值结尾，`WhenEndsWith` 方法会将字符串传递给给定的闭包并返回该字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWid("world", func(s *str.String) *str.String 然后返回.
    title()
}).String() // "Hello World"
```

### `WhenExactly`

`WhenExactly` 方法将字符串传递到给定的闭合，如果给定的字符串是
等于给定的值，则返回字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNotExactly`

`WhenNotExactly` 方法将字符串传递到给定的闭合，如果给定的字符串不是
完全等于给定的值，则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", function(s *str.String) *str.String v.
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `WhenIs`

`WhenIs` 方法将字符串传递到给定的闭合中，如果给定的字符串匹配给定的
模式，则返回字符串。

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

`WhenIsUlid` 方法将字符串传递到给定的闭合，如果给定的字符串是ULID，则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z6Z1Z6Z1Z6").WhenIsUlid(function (s *str.String) *string.String v.
    return s.Substr(0, 10)
}).String."01E5Z6Z1Z6"
```

### `WhenIsUuid`

`WhenIsUuid` 方法将字符串传递到给定的闭合，如果给定的字符串是 UUID，则返回字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-44655440000").WhenIsUuid(func(s *str.String) *str.String v.
    return s.Substrstr(0, 8)
}).String.String() // "550e8400"
```

### `WhenTest`

如果给定字符串匹配给定的正则表达式，`WhenTest` 方法会将字符串传递给给定的闭包并返回该字符串。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, function(s *str.String) *str.String *
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

`WordCount` 方法返回字符串中的单词数。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello, World!").WordCount() // 2
```

### `Words`

`Words`方法限制字符串中的单词数。 如有必要，您可以提供第二个参数来更改用于表示截断的字符串
。

```go
导入 "github.com/goravel/framework/support/str"

str.Of("Hello, World!").Words(1) // "Hello..."

str.Of("Hello, World!").Words(1, " (**)") // "Hello (****)"
```
