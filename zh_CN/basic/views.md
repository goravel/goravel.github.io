# 视图

当然，直接从您的路由器和控制器返回整个HTML文档字符串是不切实际的。
所幸的是，视图为将我们所有的 HTML 放置在单独文件中提供了方便的方法。 查看您的控制器/
应用程序逻辑和演示逻辑，然后存储在 `resources/views` 目录中。

## 创建和渲染视图

当使用Goravel默认模板`html/template`时，您可以通过在应用程序`resources/views`目录中添加一个 `.tmpl`
扩展文件来创建视图。

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Hello, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

在创建视图后，您可以使用 `View` 方法在应用程序中从路由或控制器返回视图：

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### 嵌套视图目录

视图也可以嵌套于“resources/views”目录的子目录内。 For example, if your view is stored
at `resources/views/admin/profile.tmpl`, you can return it from one of your application's routes or controllers, note
that the view needs to be defined as `define "admin/profile.tmpl"` as shown below:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Welcome to the Admin Panel</h1>
{{ end }}

ctx.Response().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### 创建第一个可用视图

使用 `First` 方法，您可以使用在给定的视图数组中存在的第一个视图。 如果您的
应用程序或包允许自定义或覆盖视图，这可能是有用的：

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### 确定视图是否存在

如果您需要确定是否存在视图，您可以使用 `facades.View()` 方法：

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## 将数据传递到视图

正如你在前面的示例中所看到的那样，你可能会传递一系列数据到视图中以便将该数据提供给视图。
请注意，传递数据的格式需要根据使用的模板驱动程序更改。 在下面的
示例中，使用默认的 `html/template` 驱动器：

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### 与所有视图共享数据

有时，您可能需要与您的应用程序呈现的所有视图共享数据。 您可以使用 `facades.View()` 中的
`Share` 方法这样做。 通常情况下，您应该在服务提供商的
`Boot` 方法中调用`Share` 方法。 您可以自由地将它们添加到`app/providers/app_service_provider.go`类，或者生成一个单独的
服务提供商来容纳它们：

```go
软件包提供商

导入 (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

类型 AppServiceProvider struct own
}

func (receer *AppServiceProvider) Register(应用程序基础)。 Pplication) Power
}

func (receiver *AppServiceProvider) Boot(app foundation.Application) Paper
    facades.View().Share("key", "value")
}
```
