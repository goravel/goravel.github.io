# Helpers

## 可用方法

### 路径

|                                                                      |                                                                    |                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [path.App()](#path-app)           | [path.Base()](#path-base)       | [path.Config()](#path-config) |
| [path.Database()](#path-database) | [path.Storage()](#path-storage) | [path.Public()](#path-public) |

### 时间

|                                                                                    |                                                                                  |                                                                              |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [carbon.Now()](#carbon-now)                     | [carbon.SetTimezone()](#carbon-settimezone)   | [carbon.Parse()](#carbon-parse)           |
| [carbon.FromTimestamp()](#carbon-fromtimestamp) | [carbon.FromDateTime()](#carbon-fromdatetime) | [carbon.FromDate()](#carbon-fromdate)     |
| [carbon.FromTime()](#carbon-fromtime)           | [carbon.FromStdTime()](#carbon-fromstdtime)   | [carbon.IsTestNow()](#istestnow-fromdate) |
| [carbon.SetTestNow()](#carbon-settestnow)       | [carbon.UnsetTestNow()](#carbon-unsettestnow) |                                                                              |

### Debug

|                                                                |                                                                  |                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [debug.Dump()](#debug-dump) | [debug.SDump()](#debug-sdump) | [debug.FDump()](#debug-fdump) |

### 地图

|                                                                 |                                                                  |                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [maps.Add()](#maps-add)      | [maps.exists()](#maps-exists) | [maps.Forget()](#maps-forget) |
| [maps.Get()](#maps-get)      | [maps.Has()](#maps-has)       | [maps.HasAny()](#maps-hasany) |
| [maps.only()](#maps-only)    | [maps.Pull()](#maps-pull)     | [maps.Set()](#maps-set)       |
| [maps.where ()](#maps-where) |                                                                  |                                                                  |

### 转换

|                                                                          |                                                                          |                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| [convert.Tap()](#convert-tap)         | [convet.with()](#convert-with)        | [transform()](#convert-transform) |
| [convert.Default()](#convert-default) | [convert.Pointer()](#convert-pointer) |                                                      |

### 收集

|                                                                        |                                                                          |                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [collect.Count()](#collect-count)   | [collect.CountBy()](#collect-countby) | [collect.Each()](#collect-each)       |
| [collect.Filter()](#collect-filter) | [collect.GroupBy()](#collect-groupby) | [collect.Keys()](#collect-keys)       |
| [collect.Map()](#collect-map)       | [collect.Max()](#collect-max)         | [collect.Merge()](#collect-merge)     |
| [collect.Min()](#collect-min)       | [collect.reverse()](#collect-reverse) | [collect.Shuffle()](#collect-shuffle) |
| [collect.Split()](#collect-split)   | [collect.Sum()](#collect-sum)         | [collect.Unique()](#collect-unique)   |
| [collect.value()](#collect-values)  |                                                                          |                                                                          |

## 路径

### `path.App()`

`path.App()`函数返回您的应用程序目录的路径。 您也可以使用 `path.App()`
函数生成相对于应用程序目录的文件路径：

```go
导入 "github.com/goravel/framework/support/path"

path:= path.App()
path := path.App("http/controllers/controller.go")
```

### `path.Base()`

`path.Base()`函数返回您应用程序的根目录的路径。 您也可以使用 `path.Base()`
函数生成相对于项目根目录指定文件的路径：

```go
路径 := path.Base()
路径 := path.Base("vendor/bin")
```

### `path.Config()`

`path.Config()`函数返回您应用程序的配置目录。 您也可以使用
`path.Config()` 函数在应用程序的配置目录中生成到指定文件的路径：

```go
路径:= path.Config()
path := path.Config("app.go")
```

### `path.database()`

`path.Database()` 函数返回应用程序数据库目录的路径。 您也可以使用
`path.Database()` 函数在`database`目录中生成到指定文件的路径：

```go
path := path.Database()
path := path.Database("factories/user_factory.go")
```

### `path.Storage()`

`path.Storage()` 函数返回应用程序存储目录的路径。 您也可以使用
`path.Storage()` 函数生成到 `storage` 目录中给定文件的路径：

```go
path := path.Storage()
path := path.Storage("app/file.txt")
```

### `path.Public()`

`path.public()`函数返回您应用程序的公共目录的路径。 您也可以使用
`path.public()` 函数生成一个路径到 `public` 目录中指定的文件：

```go
path := path.Public()
path := path.Public("css/app.css")
```

### `path.Lang()`

`path.Lang()` 函数返回路径到 `lang` 目录。 您也可以使用 `path.Lang()` 函数为
生成一个路径到 `lang` 目录中指定的文件：

```go
path := path.Lang()
path := path.Lang("en.json")
```

## 时间

Goravel的 `carbon` 模块是由 [golang-module/carbon](https://github.com/golang-module/carbon) 扩展。
的主要特点是实现了时间追溯，详情请参阅官方文件。

### `carbon.Now()`

获取当前时间：

```go
导入 "github.com/goravel/framework/support/carbon"

carbon.Now()
```

### `carbon.SetTimezone()`

设置时区：

```go
carbon.SetTimezone(carbon.UTC)
```

### `carbon.Parse()`

通过字符串获取`Carbon`对象

```go
carbon.Parse("2020-08-05 13:14:15")
```

### `carbon.FromTimestamp()`

通过时间戳获取`Carbon`对象：

```go
无时间戳(1577836800)
```

### `carbon.FromDateTime()`

按日期时间获取 `Carbon` 对象：

```go
carbon.FromDateTime(2020, 1, 0, 0, 0)
```

### `carbon.FromDate()`

按日期获取`Carbon`对象

```go
Carbon.FromDate(2020, 1, 1)
```

### `carbon.FromTime()`

按时间获取 `Carbon` 对象：

```go
carbon.FromTime(0, 0, 0)
```

### `carbon.FromStdTime()`

通过 `time.Time`获取`Carbon` 对象：

```go
Carbon.FromStdTime(time.Now())
```

### `carbon.IsestNow()`

确定时间是否为测试值：

```go
carbon.IsTestNow()
```

### `carbon.SetTestNow()`

设置时间为测试值：

```go
Carbon.SetTestNow(carbon.Now())
```

### `carbon.UnsetTestNow()`

恢复时间为正常值：

```go
carbon.UnsetTestNow()
```

## Debug

### `debug.Dump()`

`debug.Dump()` 可以打印任何变量：

```go
import "github.com/goravel/framework/support/debug"

debug.Dump(myVar1, myVar2, ...)
```

### `debug.FDump()`

`debug.FDump()` 可以打印任何变量到 `io.Writer`：

```go
导入 "github.com/goravel/framework/support/debug"

debug.FDump(some Writer, myVar1, myVar2, ...)
```

### `debug.SDump()`

`debug.SDump()` 可以打印任何变量到 `string`：

```go
导入 "github.com/goravel/framework/support/debug"

debug.SDump(myVar1, myVar2, ...)
```

## 地图

### `maps.Add()`

`maps.Add()` 函数在给定的映射中添加一个新的键值对，如果该键值在映射中不存在：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]任何{"name": "Krishan"}
地图 dd(mp, "age", 22)
// 地图[string]任一{"name": "Krishan", "age": 22}

mp2 := map[string]string{}
maps. dd(mp2, "name", "Bowen")
maps.Add(mp2, "name", "Krishan")
// map[string]string{"name": "Bowen"}
```

### `maps.exists()`

`maps.Exists()`函数决定给定的密钥是否存在于提供的地图中：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]任何{"name": "Krishan", "age": 22}

存在 := maps.Exists(mp, "name") // true

存在 = maps.Exists(mp, "email") // falsal
```

### `maps.Forget()`

`maps.Forget()`函数从提供的映射中移除给定的密钥：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Krishan", "age": "22"}

maps.Forget(mp, "name", "age")
// map[string]string{}
```

### `maps.Get()`

`maps.Get()`函数从提供的地图中检索给定键的值。 如果密钥不存在，则返回
默认值：

```go
import "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Bowen"}

value := maps.Get(mp, "name", "Krishan")
// Bowen

value = maps.Get(mp, "age", 22)
// 22
```

### `maps.Has()`

`maps.Has()`函数决定给定的密钥是否存在于提供的地图中：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]任何{"name": "Goravel", "language": "Go"}

存在:= maps. as(mp, "name", "language")
// true

exists = maps.Hasmp, "name", "age")
// falsal
```

### `maps.HasAny()`

`maps.HasAny()`函数决定给定的键是否存在于提供的地图中：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]任何{"name": "Goravel", "language": "Go"}

存在:= maps. asAny(mp, "name", "age")
// true

exists = maps.HasAny(mp, "age", "email")
// falsal
```

### `maps.only()`

`maps.Only()`函数只从提供的地图中检索给定的密钥：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

newMap := maps. nly(mp, "name")
// 地图[string]任何{"name": "Goravel"}

newMap = maps.Only(mp, "name", "age")
// Map[string]任何{"name": "Goravel"}
```

### `maps.Pull()`

`maps.Pull()`函数检索并从提供的地图中移除给定的键值：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "name")
// name = "Goravel"
// mp = map[string]any{"language": "Go"}
```

默认值可以是 `maps.Pull()` 函数的第三个参数。 如果
键在地图中不存在，此值将返回：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]any{"name": "Goravel", "language": "Go"}

name := maps. ull(mp, "age", "default")
// name = "default"
// mp = map[string]any{"name": "Goravel", "language": "Go"}
```

### `maps.Set()`

`maps.Set()` 函数在提供的地图中设置给定的键值和值：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]任何{"name": "Goravel"}

maps.Set(fmp, "language", "Go")
// map[string]任何{"name": "Goravel", "language": "Go"}
```

### `maps.where ()`

`maps.where ()`函数使用给定回调过滤所提供的地图：

```go
导入 "github.com/goravel/framework/support/maps"

mp := map[string]string{"name": "Goravel", "language": "Go"}

newMap := maps. here(mp, function (key string, value string) bool
    return key == "name"
})
// map[string]string{"name": "Goravel"}
```

## 转换

### `convert.Tap()`

`convert.Tap()`函数传递给定值到提供的回调并返回值：

```go
import "github.com/goravel/framework/support/convert"

value := convert.Tap("Goravel", func(value string) {
    fmt.Println(value + " Framework")
})
// Goravel

mp := map[string]string{"name": "Goravel"}
val := convert.Tap(mp, func(value map[string]string) {
    mp["language"] = "Go"
})
// map[string]string{"name": "Goravel", "language": "Go"}
```

### `convert.transform()`

`convert.Transform()`使用提供的回调转换给给定的值并返回结果：

```go
导入 "github.com/goravel/framework/support/convert"

值:= convert.Transform(1, strconv.Itoa)
// "1"

val := convert. ransform("foo", function(s string) *foo *
      return &foo{Name: s}
})
// &foo{name: "foo"}
```

### `convert.with()`

`convert.with()`执行给定的回调并返回回调结果：

```go
导入 "github.com/goravel/framework/support/convert"

value := convert.with("Goravel", func(value string) string v.
    return value + " Framework"
})
// Goravel Framewel Framework
```

### `convert.Default()`

`convert.Default()` 方法返回第一个非零值。 如果所有值为 0，则返回零值。

```go
导入 "github.com/goravel/framework/support/convert"

value := convert.Default("", "foo")
// foo

value = convert. efault("bar", "foo")
// bar

value = convert.Default(0, 1)
// 1
```

### `convert.Pointer()`

`convert.Pointer()` 方法返回给定值的指针。

```go
import "github.com/goravel/framework/support/convert"

convert.Pointer("foo") // *string("foo")

convert.Pointer(1) // *int(1)
```

## 收集

### `collect.Count()`

`collect.Count()`函数返回给定收藏中的项目数量：

```go
import "github.com/goravel/framework/support/collect"

collect.Count([]string{"Goravel", "Framework"})
// 2
```

### `collect.CountBy()`

`collect.CountBy()`函数计算上游为真实的事件：

```go
import "github.com/goravel/framework/support/collect"

collect.CountBy([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})
// 1
```

### `collect.Each()`

`collect.Each()`函数在给定集合中的项目上重复并将每个项目传递给给定的
回调：

```go
import "github.com/goravel/framework/support/collect"

collect.Each([]string{"Goravel", "Framework"}, func(value string, index int) {
    fmt.Println(index + 1, value)
})
// 1 Goravel
// 2 Framework
```

### `collect.Filter()`

`collect.Filter()`函数使用给定的回调来过滤收藏中的项目：

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Filter([]string{"Goravel", "Framework"}, func(value string) bool {
    return strings.Contains(value, "Goravel")
})

// []string{"Goravel"}
```

### `collect.GroupBy()`

`collect.GroupBy()`函数根据给定回调结果将收藏中的项目分组：

```go
import "github.com/goravel/framework/support/collect"

// use example of complex map slice (use different example)
newCollection := collect.GroupBy([]map[string]string{
    {"class": "1", "Name": "Rohan"},
    {"class": "2", "Name": "Bowen"},
    {"class": "2", "Name": "Krishan"},
}, func(value map[string]string) string {
    return value["class"]
})

// map[string][]map[string]string{
//     "1": []map[string]string{{"class": "1", "Name": "Rohan"}},
//     "2": []map[string]string{{"class": "2", "Name": "Bowen"}, {"class": "2", "Name": "Krishan"}},
// }
```

### `collect.Keys()`

`collect.Keys()`函数返回收藏中所有项目的键值：

```go
导入 "github.com/goravel/framework/support/collect"

keys := collect.Keys(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"name", "language"}
```

### `collect.Map()`

`collect.Map()`函数使用给定的迭代将一种收藏转换为另一种类型：

```go
import "github.com/goravel/framework/support/collect"

newCollection := collect.Map([]string{"Goravel", "Framework"}, func(value string,  _ int) string {
    return strings.ToUpper(value)
})

// []string{"GORAVEL", "FRAMEWORK"}
```

### `collect.Max()`

`collect.Max()` 函数返回给定收藏的最大值：

```go
导入 "github.com/goravel/framework/support/collect"

max := collect.Max([]int{1, 2, 3, 4, 5})
// 5
```

### `collect.Merge()`

`collect.Merge()`函数将给定的地图合并为一个地图：

```go
导入 "github.com/goravel/framework/support/collect"

newMap := collect.Merge(map[string]string{"name": "Goravel"}, map[string]string{"language": "Go"})
// map[string]string{"name": "Goravel", "language": "Go"}

newMap = collect. erge(map[string]string{"name": "Goravel"}, map[string]string{"name": "Framework"})
// map[string]string{"name": "Framework"}
```

### `collect.Min()`

`collect.Min()` 函数返回给定收藏的最小值：

```go
导入 "github.com/goravel/framework/support/collect"

min := collect.Min([]int{1, 2, 3, 4, 5})
// 1
```

### `collect.reverse()`

"collect.Reverse()" 函数将该收藏中的项目倒退：

```go
导入 "github.com/goravel/framework/support/collect"

newCollection := collect.Reverse([]string{"Goravel", "Framework"})

// []string{"Framework", "Goravel"}
```

### `collect.Shuffle()`

`collect.Shuffle()`函数对收藏中的项目进行排序：

```go
导入 "github.com/goravel/framework/support/collect"

newCollection := collect.Shuffle([]int{1, 2, 3, 4, 5})

// []int{3, 1, 5, 2, 4}(实例)
```

### `collect.Split()`

`collect.Split()`函数将收藏分成给定长度的组合。 如果收藏不能均衡拆分
，最终区块将包含其余项目：

```go
导入 "github.com/goravel/framework/support/collect"

newCollection := collect.Split([]int{1, 2, 3, 4, 5}, 2)

// [] []intv.{1, 2}, {3, 4}, {5}}
```

### `collect.Sum()`

`collect.Sum()`函数返回收藏中所有项目的总和：

```go

导入 "github.com/goravel/framework/support/collect"

sum := collect.Sum([]int{1, 2, 3, 4, 5})

/ 15
```

### `collect.Unique()`

`collect.Unque()` 方法返回无重复的收藏，在重复值的情况下，只保留第一次的
出现：

```go
导入 "github.com/goravel/framework/support/collect"

newCollection := collect.Unique([]string{"Goravel", "Framework", "Framework", "Goravel"})

// []string{"Goravel", "Framework"}
```

### `collect.value()`

`collect.Value()` 函数返回给定收藏的所有值：

```go
导入 "github.com/goravel/framework/support/collect"

值 := collect.Value(map[string]string{"name": "Goravel", "language": "Go"})
// []string{"Goravel", "Go"}
```
