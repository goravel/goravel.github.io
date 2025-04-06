# Dienst-Container

Der Goravel Service Container ist ein leistungsstarkes Werkzeug, um Klassenabhängigkeiten zu verwalten und Abhängigkeitseinspritzungen durchzuführen. Es
enthält alle Module von Goravel und erlaubt es dir, deine eigenen Dienste an Container zu binden und sie bei Bedarf zu lösen.
Der Service Container bietet eine mächtige Unterstützung für Drittpakete rund um Goravel.

## Bindung

### Einfache Bindungen

Fast alle Ihre Service-Container-Bindungen werden bei [Service-Providers](./providers) registriert.
Innerhalb eines Dienstleisters hast du immer Zugriff auf den Container über den `app` Parameter, dann eine Bindung
mit der `Bind` Methode registrieren den `key` übergeben, den wir zusammen mit einer Schließung registrieren möchten, die eine Instanz der
Klasse zurückgibt:

```go
-Paketroute

importieren (
 "github.com/goravel/framework/contracts/foundation"
)

const Binding = "goravel. oute"

Typ ServiceProvider struct {
}

func (route *ServiceProvider) Registrieren (app foundation. pplication) {
 app.Bind(Binding, func(app foundation.Application) (any, error) {
  return NewRoute(app. akeConfig()), nil
 })
}

func (route *ServiceProvider) Boot(app foundation.Application) {

}
```

Wie bereits erwähnt, interagieren Sie in der Regel mit dem Container innerhalb der Dienstleister; allerdings, wenn du möchtest, dass
mit dem Container außerhalb eines Dienstleisters interagiert, kannst du dies über die "App"-Fassade tun:

```go
facades.App().Bind("key", func(app foundation.Application) (any, error) {
    ...
})
```

### Ein Singleton binden

Die `Singleton` Methode bindet eine Klasse oder Schnittstelle in den Container, der nur einmal aufgelöst werden soll. Sobald eine
Singleton-Bindung aufgelöst ist, wird dieselbe Objektinstanz bei späteren Aufrufen in den Container zurückgegeben:

```go
app.Singleton(Schlüssel, func(app foundation.Application) (any, error) {
    return NewGin(app.MakeConfig()), nil
})
```

### Bindende Instanzen

Du kannst auch eine existierende Objektinstanz mit der `Instance` Methode in den Container binden. Die angegebene Instanz wird bei späteren Aufrufen immer
in den Container zurückgeschickt:

```go
app.Instance(Schlüssel, Instanz)
```

### Verbinden mit Parameter

Wenn du zusätzliche Parameter benötigst, um den Service-Provider zu erstellen, kannst du die `BindWith` Methode verwenden, um die Parameter
an die Schließung zu übergeben:

```go
app.BindWith(Binding, func(app foundation.Application, parameters map[string]any) (any, error) {
    return NewRoute(app.MakeConfig()), nil
})
```

## Lösen

### Die `Make` Methode

Du kannst die `Make` Methode verwenden, um eine Klasseninstanz aus dem Container zu lösen. The `Make` method accepts the `key` you
wish to resolve:

```go
instanz, err := app.Make(key)
```

Wenn du außerhalb eines Dienstanbieters an einem Ort deines Codes bist, der keinen Zugriff auf die `app` Variable hat, du
kann die `App` Fassade verwenden, um eine Klasseninstanz aus dem Container zu lösen:

```go
instanz, err := facades.App().Make(key)
```

### Die `MakeWith` Methode

Wenn einige der Abhängigkeiten deiner Klasse nicht über den Container aufgelöst werden können, du kannst sie injizieren, indem du sie als
assoziatives Array in die `MakeWith` Methode übergibst:

```go
instinktiv, err := app.MakeWith(Schlüssel, Karte[string]jeden{"id": 1})
```

### Andere Methoden

Das Framework bietet einige praktische Methoden, um verschiedene Fassaden schnell zu lösen: `MakeArtisan`, `MakeAuth`,
`MakeCache`, `MakeConfig`, `MakeCrypt`, `MakeEvent`, `MakeGate`, `MakeGrpc`, `MakeHash`, `MakeLog`, `MakeMail`,
`MakeOrm`, `MakeQueue`, `MakeRateLimiter`, `MakeRoute`, `MakeSchedule`, `MakeStorage`, `MakeValidation`.
