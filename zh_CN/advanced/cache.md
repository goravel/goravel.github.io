# 缓存

Goravel提供一个可扩展的缓存模块，可以使用 "facades.Cache()" 来操作。 Goravel带有一个 `memory`
驱动程序，用于其他驱动程序，请检查相应的独立扩展包：

| 驱动程序 | 链接                                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- |
| 雷迪斯  | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## 配置

在“config/cache.go”中创建所有自定义配置。

## 缓存使用

### 注入内容

```go
facades.ache().Withext(ctx)
```

### 访问多个缓存商店

您可以通过 `Store` 方法访问各种缓存存储。 传递到 `Store` 方法的密钥应该对
在您缓存配置文件中列出的 "Stores" 配置数组中的一个商店：

```go
value := facades.Cache().Store("redis").Get("foo")
```

### 从缓存中获取项目

```go
value := facades.Cache().Get("goravel", "default")
value := facades.Cache().GetBool("goravel", true)
value := facades.Cache().GetInt("goravel", 1)
value := facades.Cache().GetString("goravel", "default")
```

您可以将一个 ' function 作为默认值。 如果指定的数据不存在于缓存中，则返回
的结果。 离子关闭方法允许您从数据库或其他外部的
服务获取默认值。 请注意关闭结构`func() 任意`。

```go
value := facades.Cache().Get("goravel", func() any Power
    return "default"
})
```

### 正在检查项目的存在

```go
bool := facades.Cache().Has("goravel")
```

### 增加/减少值

"增量" 和 "Decrement" 方法可以用于调整缓存中整数项的值。 这两种方法
都接受一个可选的第二个参数，表示该项值的增量或减价金额：

```go
facades.Cache().增量("key")
facades.ache().增量("key", amount)
facades.Cache().Decrement("key")
facades.Cache().Decrement("key", amount)
```

### 检索与商店

Sometimes you may want to get data from the cache, and when the requested cache item does not exist, the program can
store a default value for you.

```go
value, err := facades.Cache().Remember("goravel", 5*time.Second, func() (any, error) {
    return "goravel", nil
})
```

如果您想要的数据不存在于缓存中，将执行传递给"记住"方法的关闭， 然后
结果将返回并放入缓存中。

您可以使用 "RememberForever" 方法从缓存中检索数据或永久存储数据：

```go
value, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### 检索并删除

```go
值 := facades.Cache().Pull("goravel", "default")
```

### 在缓存中存储物品

```go
err := facades.Cache().Put("goravel", "value", 5*time.Second)
```

如果缓存过期时间设置为 `0`，缓存将永远有效：

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### 店铺，如果不存在

`Add`方法仅在不在缓存中时存储数据。 如果存储成功，则返回 `true` ，如果
不是成功的 `false` 的话。

```go
bool := facades.Cache().Add("goravel", "value", 5*time.Second)
```

### 永远存储物品

`Forever` 方法可以用来在缓存中持续存储数据。 因为这些数据不会过期，所以必须通过 `Forget` 方法从缓存中手动删除
：

```go
bool := facades.Cache().Forever("goravel", "值")
```

### 从缓存中删除项目

```go
bool := facades.Cache().Forget("goravel")
```

您可以使用 `Flush` 方法来清除所有缓存：

```go
bool := facades.Cache().Flush()
```

## 原子锁

### 管理锁

原子锁允许在不担心种族条件的情况下操纵分布式锁。 您可以使用 `Lock` 方法创建和
管理锁定：

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Lock acquired for 10 seconds...

    lock.Release()
}
```

`Get`方法也接受关闭. 关闭完成后，Goravel会自动释放锁：

```go
facades.Cache().Lock("foo").Get(func () {
    // Lock acquired for 10 seconds and automatically released...
});
```

如果锁在您请求时不可用，您可以指示Goravel等待指定数量的
秒。 如果无法在指定的时间限制内获取锁，将返回 \`false'：

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Lock acquired after waiting a maximum of 5 seconds...
if (lock.Block(5*time.Second)) {
    lock.Release()
}
```

上面的示例可以通过 `Block` 方法的关闭来简化。 当关闭被传递到此方法时，
Goravel将尝试获取指定秒数的锁，并在关闭后自动释放锁

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Lock acquired after waiting a maximum of 5 seconds...
})
```

如果你想要释放一个锁，但不尊重当前的所有者，你可以使用 "ForceRelease" 方法：

```go
facades.Cache().Lock("processing").ForceRelease();
```

## 添加自定义缓存驱动程序

### 配置

如果你想要定义一个完全自定义的驱动程序，你可以在 `config/cache.go`
配置文件中指定 `custom` 类型的驱动程序。
然后包含一个 `via` 选项来实现 `framework/contracts/cache/Driver` 接口：

```go
//config/cache. o
"stores": map[string]interface{}
    "memory": map[string]anyop
        "driver": "memory",
    },
    "custom": map[string]interface{}
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### 实现自定义驱动程序

实现 `framework/contracts/cache/Driver` 接口，文件可以存储在 `app/extensions` 文件夹中 (
可以修改)。

```go
// framework/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Add Driver an item in the cache if the key does not exist.
    Add(key string, value any, t time.Duration) bool
    Decrement(key string, value ...int) (int, error)
    // Forever Driver an item in the cache indefinitely.
    Forever(key string, value any) bool
    // Forget Remove an item from the cache.
    Forget(key string) bool
    // Flush Remove all items from the cache.
    Flush() bool
    // Get Retrieve an item from the cache by key.
    Get(key string, def ...any) any
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ...int) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ...string) string
    // Has Check an item exists in the cache.
    Has(key string) bool
    Increment(key string, value ...int) (int, error)
    Lock(key string, t ...time.Duration) Lock
    // Put Driver an item in the cache for a given time.
    Put(key string, value any, t time.Duration) error
    // Pull Retrieve an item from the cache and delete it.
    Pull(key string, def ...any) any
    // Remember Get an item from the cache, or execute the given Closure and store the result.
    Remember(key string, ttl time.Duration, callback func() (any, error)) (any, error)
    // RememberForever Get an item from the cache, or execute the given Closure and store the result forever.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
