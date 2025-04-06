# Datenbank: Verteilen

Goravel beinhaltet die Möglichkeit, Ihre Datenbank mit Daten mit Seed-Strukturierung zu versehen. Alle Seed-Strukturen werden im
`database/seeders` Verzeichnis gespeichert. Standardmäßig ist ein `DatabaseSeeder` struct für Sie definiert.

## Schreibe Seeders

Um einen Seeder zu generieren, führen Sie den `make:seeder` [Artisan Befehl](../advanced/artisan). Alle vom Framework generierten Seeder
werden im `database/seeders` Verzeichnis gespeichert:

```shell
go run . artisan make:seeder UserSeeder
```

Standardmäßig hat ein Seederstrukt zwei Methoden: `Signature` und `Run`. Die `Signature` Methode legt den Namen des Seeders fest,
während die `Run` Methode ausgelöst wird, wenn der `db:seed` Artisan Befehl ausgeführt wird. Du kannst die `Run` Methode verwenden, um
Daten in deine Datenbank in beliebiger Weise einzufügen.

Um zu veranschaulichen, können wir den `DatabaseSeeder` strukt anpassen, indem wir eine Datenbank-Insert-Anweisung zur `Run` Methode hinzufügen.

```go
Paket seeders

importieren (
 "github.com/goravel/framework/contracts/database/seeder"
 "github. om/goravel/framework/facades"

 "goravel/app/models"
)

Typ DatabaseSeeder struct {
}

// Signatur Name und Signatur des Seeders.
func (s *DatabaseSeeder) signature() string {
 return "DatabaseSeeder"
}

// Führt die seeder Logik aus.
func (s *DatabaseSeeder) Run() error {
 user := models. ser{
  Name: "goravel",
 }
 return facades.Orm().Query().Create(&user)
}
```

## Anruf weiterer Seeder

Innerhalb der `DatabaseSeeder` Struktur kannst du die `Call`-Methode verwenden, um zusätzliche Seedstrukte auszuführen. Mit der Methode `Call`
kannst du deine Datenbank in mehrere Dateien aufteilen, so dass kein einzelner Seederstrukt zu
groß wird. Die `Call` Methode akzeptiert ein Array von Seeder Strukturen, die ausgeführt werden sollten:

```go
// Führt die seeder Logik aus.
func (s *DatabaseSeeder) Run() Fehler {
 return facades.Seeder().Call([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

Framework stellt auch eine `CallOnce` Methode zur Verfügung, ein Seeder wird nur einmal im `db:seed` Befehl ausgeführt:

```go
// Führt die seeder Logik aus.
func (s *DatabaseSeeder) Run() Fehler {
 return facades.Seeder().CallOnce([]seeder.Seeder{
  &UserSeeder{},
 })
}
```

## Laufende Seeder

Du kannst den `db:seed` Artisan Befehl ausführen, um deine Datenbank zu seeden. Standardmäßig führt der Befehl `db:seed` die
`database/seeders/database_seeder.go` Datei aus, die wiederum andere Seed-Klassen aufrufen kann. Du kannst jedoch die
`--seeder` Option verwenden, um eine bestimmte Seeder-Klasse zu spezifizieren, um einzeln auszuführen:

```shell
go run . artisan db:seed
```

Wenn du andere Seeder ausführen möchtest, wenn du den Befehl `db:seed` ausführst, kannst du den Seeder unter
`app/providers/database_service_provider.go` registrieren:

```go
// app/providers/database_service_provider.go
func (Empfänger *DatabaseServiceProvider) Boot(app foundation.Application) {
 facades.Seeder().Register([]seeder.Seeder{
  &seeders. atabaseSeeder{},
        &seeders.UserSeeder{},
        &seeder. hotoSeeder{},
 })
}

Go run . artisan db:seed --seeder=UserSeeder PhotoSeeder // Die Signatur des Seeders
```

Du kannst deine Datenbank auch mit dem Befehl `migrate:fresh` und `migrate:refresh` in Kombination mit der `--seed`
Option seed`Seed verseuchen, die alle Tabellen fallen lassen und alle Migrationen neu ausführen. This command is useful for completely re-building
your database. Die`--seeder\` Option kann verwendet werden, um einen bestimmten Seeder anzugeben:

```shell
go run . artisan migrate:fresh --seed

go run . artisan migrate:fresh --seed --seeder=UserSeeder

go run . artisan migrate:refresh --seed

go run . artisan migrate:refresh --seed --seeder=UserSeeder
```

### Seeder erzwingen in der Produktion zu starten

Einige Seeding-Operationen können dazu führen, dass Sie Daten ändern oder verlieren. Um Sie vor der Ausführung von Seeding-Befehlen
gegen Ihre Produktionsdatenbank zu schützen, Sie werden zur Bestätigung aufgefordert, bevor die Seeder in der
`production` Umgebung ausgeführt werden. Um die Seeder zu zwingen, ohne Eingabeaufforderung zu laufen, benutze das `--force` Flag:

```shell
go run . artisan db:seed --force
```
