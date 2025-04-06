# Viste

Naturalmente, non è pratico restituire intere stringhe di documenti HTML direttamente dai tuoi percorsi e controllori.
Per fortuna, le viste offrono un modo conveniente per posizionare tutto il nostro HTML in file separati. Le viste separano la logica dell'applicazione controller /
dalla logica di presentazione e sono memorizzate nella directory `resources/views`.

## Creazione & Rendering Viste

Quando si utilizza il modello predefinito Goravel `html/template`, è possibile creare viste aggiungendo un file con l'estensione `.tmpl`
nella directory `resources/views`.

```
// resources/views/welcome.tmpl
{{ define "welcome.tmpl" }}
<html>
  <body>
  <h1>Ciao, {{ .name }}</h1>
  </body>
</html>
{{ end }}
```

Dopo aver creato la vista, è possibile utilizzare il metodo `View` per restituire la vista da un percorso o un controller nell'applicazione:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Cartelle Di Vista Nested

Le viste possono anche essere annidate nelle sottodirectory della directory `resources/views`. Ad esempio, se la tua vista è memorizzata
su `resources/views/admin/profile. mpl`, puoi restituirlo da uno dei percorsi o controllori della tua applicazione, nota
che la vista deve essere definita come `define "admin/profile. mpl"` come mostrato di seguito:

```go
// resources/views/admin/profile.tmpl
{{ define "admin/profile.tmpl" }}
<h1>Benvenuto nel Pannello Admin</h1>
{{ end }}

ctx. esponse().View().Make("admin/profile.tmpl", map[string]any{
  "name": "Goravel",
})
```

### Creare La Prima Vista Disponibile

Usando il metodo `First`, puoi usare la prima vista che esiste in una data serie di visualizzazioni. Questo può essere utile se l'applicazione o il pacchetto
consente di personalizzare o sovrascrivere le viste:

```go
ctx.Response().View().First([]string{"custom/admin.tmpl", "admin.tmpl"}, map[string]any{
  "name": "Goravel",
})
```

### Determinare Se Una Vista Esiste

Se devi determinare se esiste una vista, puoi usare il metodo `facades.View()`:

```go
if facades.View().Exist("welcome.tmpl") {
  // ...
}
```

## Passaggio Dei Dati Alle Viste

Come si è visto negli esempi precedenti, è possibile passare una serie di dati a visualizzazioni per rendere tali dati disponibili alla vista.
Si prega di notare che il formato dei dati passati deve cambiare in base al driver del modello utilizzato, nel seguente esempio
, usando il driver `html/template` predefinito:

```go
facades.Route().Get("/", func(ctx http.Context) http.Response {
  return ctx.Response().View().Make("welcome.tmpl", map[string]any{
    "name": "Goravel",
  })
})
```

### Condividere I Dati Con Tutte Le Viste

Occasionalmente, potrebbe essere necessario condividere i dati con tutte le visualizzazioni che sono rese dalla tua applicazione. Puoi farlo usando il metodo
`Share` in `facades.View()`. Normalmente, dovresti effettuare chiamate al metodo `Share` all'interno del metodo `Boot` di un fornitore di servizi
. Sei libero di aggiungerli alla classe `app/providers/app_service_provider.go` o di generare un fornitore di servizi
separato per ospitarli:

```go
package provider

import (
 "github.com/goravel/framework/contracts/foundation"
    "github. om/goravel/framework/facades"
)

type AppServiceProvider struct {
}

func (receiver *AppServiceProvider) Register(app foundation. pplication) {
}

func (receiver *AppServiceProvider) Boot(app foundation.Application) {
    facades.View().Share("key", "value")
}
```
