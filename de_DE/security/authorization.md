# Autorisierung

Goravel bietet eingebaute [authentication](./authentication) Dienste und eine einfach zu bedienende Autorisierungsfunktion um
Benutzeraktionen auf Ressourcen zu verwalten. Even if a user is authenticated, they may not have the authority to modify or delete
certain Eloquent models or database records. Goravel's authorization feature allows for a systematic way of managing
these authorization checks.

Es gibt zwei Möglichkeiten, Aktionen in Goravel: [gates](#gates) und [policies](#policies). Stellen Sie sich Tore und
Richtlinien ähnlich zu Routen und Controllern. Tores basieren auf Schließungen und bieten einen einfachen Ansatz zur
-Autorisierung, wohingegen Policy-Gruppenlogik um eine bestimmte Ressource ähnlich wie Controller. This documentation will
first cover gates and then delve into policies.

Es ist nicht notwendig, nur Tore oder Richtlinien zu verwenden, um eine Anwendung zu erstellen. Die meisten Anwendungen werden eine
-Kombination aus beidem verwenden, was absolut akzeptabel ist!

## Tore

### Schreibtore

Gates dienen als Schließungen, die überprüfen, ob ein Benutzer berechtigt ist, eine bestimmte Aktion durchzuführen. Sie werden üblicherweise in der `app/providers/auth_service_provider.go` Datei-Methode
unter Verwendung der Gate-Fassade eingerichtet.

In diesem Szenario, wir werden ein Tor einrichten, um zu überprüfen, ob ein Benutzer ein bestimmtes Post-Modell ändern kann, indem er seine ID mit
der user_id des Beitrags-Erstellers vergleicht.

```go
-Paketanbieter

Import (
  "context"

  Contratsaccess "github.com/goravel/framework/contracts/auth/access"
  "github.com/goravel/framework/auth/access"
  "github. om/goravel/framework/facades"
)

type AuthServiceProvider struct {
}

func (Empfänger *AuthServiceProvider) Register(app foundation. pplication) {

}

func (Empfänger *AuthServiceProvider) Boot(app foundation.Application) {
  facades. ate().Definieren ("update-post",
    func(ctx context.Context, arguments map[string]any) contractsaccess. esponse {
      user := ctx.Value("user").(models.User)
      post := arguments["post"].(models. ost)

      if user.ID == post.UserID {
        return access. ewAllowResponse()
      } else {
        return access. ewDenyResponse("error")
      }
    },
  )
}
```

### Autorisierungsaktionen

Um eine Aktion mit Tor zu autorisieren, solltest du die Methoden `Allows` oder `Denies` verwenden, die von der Gate Fassade bereitgestellt werden:

```go
Paket Controller

Import (
  "github.com/goravel/framework/facades"
)

Typ UserController struct {

func (r *UserController) Show(ctx http.Context) http. esponse {
  var post models.Post
  if facades.Gate(). llows("update-post", map[string]any{
    "post": post
  }) {
    
  }
}
```

Du kannst mehrere Aktionen gleichzeitig mit den `Any` oder `None` Methoden autorisieren.

```go
wenn facades.Gate(). ny([]string{"update-post", "delete-post"}, mappe[string]any{
  "post": post,
}) {
  // Der Benutzer kann den Beitrag aktualisieren oder löschen. .
}

wenn Fassaden. ate().Keine([]string{"update-post", "delete-post"}, mappe[string]any{
  "post": post,
}) {
  // Der Benutzer kann den Beitrag nicht aktualisieren oder löschen. .
}
```

### Tore Antworten

Die `Allows` Methode gibt einen booleschen Wert zurück. Um die vollständige Autorisierungsantwort zu erhalten, verwenden Sie die `Inspect` Methode.

```go
antworten := facades.Gate().Inspect("edit-settings", nil);

if response.Allowed() {
    // Die Aktion ist autorisiert...
} else {
    fmt.Println(response.Message())
}
```

### Tore abfangen

Manchmal kann es sein, dass du einem bestimmten Benutzer alle Fähigkeiten gewähren möchtest. Du kannst eine Schließung mit der `Before` Methode definieren,
, die vor jeder anderen Autorisierungsprüfung ausgeführt wird:

```go
facades.Gate().Before(func(ctx context.Context, ability string, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user"). models.User)
  wenn isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

Wenn die `Before` Schließung ein nicht-null-Ergebnis zurückgibt, wird dieses Ergebnis als Ergebnis der Autorisierungsprüfung betrachtet.

Die `After`-Methode kann verwendet werden, um eine Schließung zu definieren, die nach allen anderen Autorisierungsprüfungen ausgeführt wird.

```go
facades.Gate().After(func(ctx context.Context, ability string, arguments map[string]any, result contractsaccess.Response) contractsaccess.Response {
  user := ctx. alue("user").(models.User)
  if isAdministrator(user) {
    return access.NewAllowResponse()
  }

  return nil
})
```

> Hinweis: Das Rückgabewert von `After` wird nur angewendet wenn `facades.Gate().Define` Null zurückgibt.

### Kontext einfügen

Der `context` wird an die `Before`, `After` und `Define` Methoden übergeben.

```go
facades.Gate().WithContext(ctx).Allows("update-post", map[string]any{
  "post": post,
})
```

## Richtlinien

### Erstelle Richtlinien

Du kannst den `make:policy` Artisan Befehl verwenden, um Richtlinien zu generieren. Die generierte Richtlinie wird im
Verzeichnis `app/polices` gespeichert. Wenn das Verzeichnis in Ihrer Anwendung nicht existiert, wird Goravel es für Sie erstellen.

```go
go run . handwerklicher make:policy PostPolicy
go run . artisan make:policy user/PostPolicy
```

### Schreibrichtlinien

Lass uns eine `Update` Methode in `PostPolicy` definieren, um zu überprüfen, ob ein `User` eine `Post` aktualisieren kann.

```go
Paket-Richtlinien

importieren (
  "context"
  "goravel/app/models"

  "github.com/goravel/framework/auth/access"
  Contratsaccess "github. om/goravel/framework/contracts/auth/access"
)

type PostPolicy struct {
}

func NewPostPolicy() *PostPolicy {
  return &PostPolicy{}
}

func (r *PostPolicy) Update(ctx context). ontext, arguments map[string]any) contractsaccess.Response {
  user := ctx.Value("user").(models.User)
  post := arguments["post"].(models.Post)

  if user. D == post.UserID {
    return access.NewAllowResponse()
  } else {
    return access. ewDenyResponse("Sie besitzen diesen Beitrag nicht.")
  }
}
```

Dann können wir die Richtlinie auf `app/providers/auth_service_provider.go` registrieren:

```go
facades.Gate().Define("update-post", policies.NewPostPolicy().Update)
```

Während Sie an der Autorisierung verschiedener Aktionen arbeiten, können Sie Ihrer Richtlinie weitere Methoden hinzufügen. Zum Beispiel kannst du
`View` oder `Delete` Methoden erstellen, um verschiedene modellbezogene Aktionen zu autorisieren. Fühlen Sie sich frei, Ihre Richtlinien-Methoden zu benennen, wie Sie es für
halten.
