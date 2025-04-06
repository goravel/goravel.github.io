# Просмотров

Разумеется, нецелесообразно возвращать все строки HTML-документов непосредственно из ваших маршрутов и контроллеров.
К счастью, все виды обеспечивают удобный способ размещения всех наших HTML в отдельных файлах. Просмотров отделяет ваш контроллер /
от логики презентации и хранится в папке `resources/views`.

## Создание и рендеринг видов

При использовании шаблона по умолчанию Goravel `html/template`, вы можете создать представления, добавив файл с расширением `.tmpl`
в каталоге `resources/views`.

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

После создания представления, вы можете использовать метод `View` для возврата вида из маршрута или контроллера в приложении:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Вложенные каталоги просмотра

Также могут быть вложены в подкаталоги папки `resources/views`. Например, если ваш вид хранится
в `resources/views/admin/profile. mpl, вы можете вернуть его из маршрута или контроллеров вашего приложения, заметьте
, что представление необходимо определить как "определить "admin/profile. mpl"`, как показано ниже:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Добро пожаловать в Панель Администратора</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Горавел",
})
```

### Создание первого доступного просмотра

Используя метод `First`, вы можете использовать первый вид, который существует в заданном массиве представлений. Это может быть полезно, если ваше приложение
или пакет позволяет настраивать или перезаписывать представления:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Горавел",
})
```

### Определяет, существует ли представление

Если вам нужно определить, существует ли представление, вы можете использовать метод `facades.View()`:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Передача данных для просмотра

Как вы видели в предыдущих примерах, вы можете передавать массив данных для просмотра в доступном виде.
Обратите внимание, что формат передаваемых данных должен быть изменен в соответствии с используемым драйвером шаблона. в следующем примере
, используя стандартный драйвер `html/template`:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Обмен данными со всеми просмотрами

Иногда вам может потребоваться обмен данными со всеми представлениями, которые отображаются вашим приложением. Вы можете сделать это, используя метод
`Share` в `facades.View()`. Обычно вы должны помещать вызовы в метод «Поделиться» в метод «Поделиться» поставщика услуг
метод «Boot». Вы можете добавить их в класс `app/providers/app_service_provider.go` или создать отдельного поставщика услуг
для их размещения:

```go
поставщики пакетов

импорт (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (receiver *AppServiceProvider) Register(app found). pplication) {
}

func (receiver *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
