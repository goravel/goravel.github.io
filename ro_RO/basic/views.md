# Vizualizări

Desigur, nu este practic să returnezi întregi șiruri de documente HTML direct de pe rutele și controlorii tăi.
Din fericire, vizualizările oferă o modalitate convenabilă de a plasa tot codul HTML în fișiere separate. Vizualizările separă logica aplicației controlerului/
de logica prezentărilor și sunt stocate în directorul `resources/views`.

## Creare & Redare Vizualizări

Când utilizaţi şablonul implicit al Goravel `html/template`, puteţi crea vizualizări prin adăugarea unui fişier cu extensia `.tmpl`
în directorul `resources/views`.

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

După crearea vederii, puteţi utiliza metoda `View` pentru a returna vizualizarea de pe o rută sau un controller din aplicaţie:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Dosare vizualizare imbricate

Vizualizările pot fi, de asemenea, imbricate în subdirectoarele directorului `resources/views`. De exemplu, în cazul în care vizualizarea este stocată
la \`resources/views/admin/profil. Locuri de muncă, puteți să îl returnați de pe una dintre rutele sau controlorii aplicației, nota
că vizualizarea trebuie să fie definită ca "admin/profil. Locuri "aşa cum sunt prezentate mai jos:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Welcome to the Admin Panel</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", harta[string]any{
  "name": "Goravel",
})
```

### Se creează prima vizualizare disponibilă

Folosind metoda `First`, puteţi utiliza prima vedere care există într-o anumită serie de vizualizări. Acest lucru poate fi util dacă aplicația dvs.
sau pachetul permite ca vizualizările să fie personalizate sau suprascrise:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### Determinare Dacă A View Existes

Dacă trebuie să determinați dacă există o vizualizare, puteți utiliza metoda `facades.View()`:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Transmiterea datelor către vizualizări

După cum aţi văzut în exemplele anterioare, puteţi transmite o serie de date pentru a le face disponibile pentru vizualizare.
Rețineți că formatul datelor pasate trebuie să se modifice în funcție de șablonul de șablon folosit, în următorul exemplu
folosind șoferul implicit `html/template`:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Partajează date cu toate vizualizările

Ocazional, este posibil să fie nevoie să împărtășiți date cu toate punctele de vedere care sunt afișate de cererea dvs. Puteţi face acest lucru folosind metoda
`Share` în `facades.View()`. De obicei, ar trebui să plasați apeluri către metoda `Share` în cadrul metodei
a furnizorului de servicii. Aveți libertatea de a le adăuga în clasa `app/providers/app_service_provider.go` sau de a genera un furnizor de servicii
separat pentru a le găzdui:

```go
furnizorii de pachete

import (
 "github.com/goravel/framework/contracts/fundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (destinatar *AppServiceProvider) Register(fundația aplicației. pplication) {
}

func (receptor *AppServiceProvider) Boot(app fundation.Application) {
    facades.View().Share("key", "value")
}
```
