# Aufrufe

Natürlich ist es nicht praktisch, ganze HTML-Dokument-Zeichenketten direkt von Ihren Routen und Controllern zurückzugeben.
Glücklicherweise bieten Views eine bequeme Möglichkeit, all unsere HTML-Dateien in separate Dateien zu platzieren. Views trennen deinen Controller /
Anwendungslogik von deiner Präsentationslogik und werden im Verzeichnis `resources/views` gespeichert.

## Erstelle und Rendering-Ansichten

Wenn du das Goravel Standard-Template `html/template` verwendest, kannst du Views erstellen, indem du eine Datei mit der Erweiterung `.tmpl`
im Verzeichnis `resources/views` hinzufügst.

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

Nach dem Erstellen der Ansicht kannst du die `View`-Methode verwenden, um die Ansicht von einer Route oder einem Controller in der Anwendung zurückzugeben:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Schachtelte Ansichtsverzeichnisse

Views können auch in Unterverzeichnissen des `resources/views`-Verzeichnisses verschachtelt werden. Zum Beispiel, wenn Ihre Ansicht
unter `resources/views/admin/profile gespeichert wird. mpl, Sie können es von einer Route oder einem Controller Ihrer Anwendung zurückgeben, beachten Sie
, dass die Ansicht als `definieren "admin/profile" definiert werden muss. mpl"\` wie unten angezeigt:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Willkommen im Admin-Panel</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### Erstelle die erste verfügbare Ansicht

Mit der `First`-Methode kannst du die erste Ansicht verwenden, die in einem gegebenen Array von Ansichten existiert. Dies kann nützlich sein, wenn Ihre
-Anwendung oder Ihr Paket erlaubt, Ansichten anzupassen oder zu überschreiben:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, mappe[string]any{
  "name": "Goravel",
})
```

### Bestimme ob eine Ansicht existiert

Wenn du feststellen musst, ob eine Ansicht existiert, kannst du die `facades.View()` Methode verwenden:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Daten an Views übergeben

Wie Sie in den vorherigen Beispielen gesehen haben, können Sie ein Array von Daten an Views übergeben, um diese Daten der Ansicht zur Verfügung zu stellen.
Bitte beachten Sie, dass das Format der übergebenen Daten entsprechend dem verwendeten Template-Treiber geändert werden muss im folgenden
-Beispiel, unter Verwendung des Standardtreibers `html/template`:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Teilen von Daten mit allen Ansichten

Gelegentlich müssen Sie Daten mit allen Ansichten teilen, die durch Ihre Anwendung dargestellt werden. Du kannst dies mit der
`Share` Methode in `facades.View()` tun. Normalerweise sollten Sie innerhalb der
`Boot`-Methode eines Dienstanbieters die Methode `Share` aufrufen. Sie können diese zur `app/providers/app_service_provider.go` Klasse hinzufügen oder einen separaten
Dienstleister generieren, um sie zu beherbergen:

```go
Paket Provider

importieren (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (Empfänger *AppServiceProvider) Register(app foundation. pplication) {
}

func (Empfänger *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
