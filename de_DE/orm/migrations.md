# Migrationen

Wenn mehrere Personen zusammenarbeiten, um Anwendungen zu entwickeln, ist es entscheidend, eine standardisierte Datenbankstruktur für die
Synchronisation zu haben. Andernfalls könnte es Chaos geben, da die individuellen Daten aller nicht übereinstimmen. Database migration is
the solution to this problem. Die Datenbankstruktur wird versionsgesteuert um ihre Konsistenz bei allen
Entwicklern zu gewährleisten.

## Konfiguration

Die Migrationsdateien der Datenbank werden im Verzeichnis `database/migrations` gespeichert. Du kannst die Datenbank
Verbindungsdaten in der `config/database.go` Datei konfigurieren. Derzeit stehen zwei Treiber für Migration zur Verfügung: Go
Sprachmigration und SQL-Migration. Allerdings wird die SQL-Migration in zukünftigen Versionen entfernt.

```go
// Verfügbare Treiber: "default", "sql"
"migrations": Karte[string]any{
  "driver": "default",
  // Sie können den Tabellennamen der Migrationen
  "Tabelle": "Migrationen",
},
```

## Migrationen erstellen

Benutze den Befehl `make:migration` um die Migration zu erstellen:

```shell
go run . artisan make:migration create_users_table
```

Dieser Befehl generiert Migrationsdateien im `database/migrations` Verzeichnis. Jede Migrationsdatei beginnt mit einem
Zeitstempel, den Goravel zur Bestimmung der Ausführungsreihenfolge der Migrationsdateien verwenden wird.

### Schnell erstellen

Verwende `create_users_table` um automatisch eine Tabelle mit der Infrastruktur von `users` zu erstellen:

```
^create_(\w+)_table$
^create_(\w+)$
```

Verwende `add_avatar_to_users_table` um automatisch eine Struktur zu generieren, um Felder zur `users` Tabelle hinzuzufügen:

```
_(to|von|in)_(\w+)_table$
_(to|von|in)_(\w+)$
```

Wenn die oben genannten Bedingungen nicht übereinstimmen, erzeugt das Framework eine leere Migrationsdatei.

## Migrationsstruktur

### Sprachmigration gehen

Der Migrationsstrukt enthält zwei Methoden: `Up` und `Down`. Die `Up` Methode wird verwendet, um neue Tabellen, Spalten oder
Indizes zur Datenbank hinzuzufügen, während die `Down` Methode benutzt wird, um die Operationen der `Up` Methode rückgängig zu machen. In diesen
zwei Methoden kannst du `facades.Schema()` verwenden, um Datenbanktabellen zu erstellen und zu bedienen. Für verfügbare Methoden siehe
die [documentation](#tables). Die folgende Migration wird eine `Benutzer`-Tabelle erstellen:

```go
-Paketmigrationen

importieren (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

Typ M20241207095921CreateUsersTable struct {
}

// Signatur Die eindeutige Signatur für die Migration.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Hochlauf der Migrationen.
func (r *M20241207095921CreateUsersTable) Up() error {
 if !facades. chema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   tabelle. imestamps()
  })
 }

 return nil
}

// Down Reverse the migrations.
func (r *M20241207095921CreateUsersTable) Down() error {
 return facades.Schema().DropIfExists("users")
}
```

#### Migrationsverbindung festlegen

Wenn die Migration mit einer anderen Datenbankverbindung als der Standard-Datenbankverbindung der Anwendung interagiert, sollten Sie
die Methode `Connection` der Migration verwenden:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### SQL-Migration

Der Migrationsbefehl generiert zwei Migrationsdateien: `***.up.sql` und `***.down.sql`, entsprechend der Ausführung und
Rollbacks. Sie können SQL-Anweisungen direkt in diese beiden Dateien schreiben.

```sql
-- ***.up. ql
TABLE `users` ERSTELLEN (
  `id` bigint(20) unsigniert NICHT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `users`;
```

## Migrationen registrieren

Wenn du Go Sprachmigrationen verwendest, musst du die Migrationsdateien in der `database/kernel.go` Datei registrieren, nachdem die
Migrationsdateien generiert wurden:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

SQL-Migrationen müssen nicht registriert werden, da das Framework die SQL-Dateien automatisch im
`database/migrations` Verzeichnis scannt.

## Migrationen ausführen

Um alle deine ausstehenden Migrationen auszuführen, führen Sie den `migrate` Artisan Befehl aus:

```shell
go run . Handwerkliche Migration
```

Wenn du sehen möchtest, welche Migrationen bisher durchgeführt wurden, kannst du den `migrate:status` Artisan Befehl verwenden:

```shell
go run . handwerkliche migrate:status
```

## Migrationen rückgängig machen

Um die letzte Migration rückgängig zu machen, benutzen Sie den `rollback` Artisan Befehl. Dieser Befehl rollt den letzten "Batch" der
Migrationen zurück, die mehrere Migrationsdateien enthalten können:

```shell
go run . handwerkliche Migrate:rollback
```

Du kannst eine begrenzte Anzahl von Migrationen zurücksetzen, indem du die `step` Option für den `rollback` Befehl angibst. Zum Beispiel wird der folgende Befehl
die letzten fünf Migrationen zurückrollen:

```shell
go run . handwerkliche Migrate:rollback --step=5
```

Der Befehl `migrate:reset` wird alle Migrationsbewegungen deiner Anwendung rückgängig machen:

```shell
go run . handwerkliche Migrate:reset
```

### Rückrollen & Migrieren mit einem einzigen Kommando

Der Befehl `migrate:refresh` wird alle deine Migrationen zurückrollen und dann den `migrate` Befehl ausführen. Dieser Befehl
erstellt Ihre gesamte Datenbank effektiv neu:

```shell
go run . handwerkliche Migrate:refresh
```

Du kannst eine begrenzte Anzahl von Migrationen zurücksetzen und erneut migrieren, indem du die `step` Option dem `refresh` Befehl zur Verfügung stellst.
Zum Beispiel wird der folgende Befehl zurückrollen und die letzten fünf Migrationen neu migrieren:

```shell
go run . artisan migrate:refresh --step=5
```

### Alle Tabellen ablegen & migrieren

Der Befehl `migrate:fresh` wird alle Tabellen aus der Datenbank ablegen und dann den Befehl `migrate` ausführen:

```shell
go run . artisan migrate:fresh
```

## Tabellen

### Tabelle erstellen

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Prüfen ob Tabelle / Spalte vorhanden ist

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Datenbankverbindung

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### Tabelle aktualisieren

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Tabelle umbenennen / Ablegen

```go
facades.Schema().Rename("users", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("users")

```

## Spalten

### Verfügbare Spaltentypen

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| BigIncrements       | BigInteger         | Boolean               | Char                        |
| Datum               | Datumszeit         | Datum-TZ              | Dezimalzahl                 |
| Doppelt             | [Enum](#enum)      | Schweben              | [ID](#id)                   |
| Erhöhungen          | Ganzzahl           | IntegerIncrements     | Json                        |
| Erhöhungen          | LongText           | Mittlere Inkremente   | MediumInteger               |
| Mittlerer Text      | SmallIncrements    | SmallInteger          | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | String             | Text                  | Zeit                        |
| TimeTz              | Zeitstempel        | Zeitstempel           | Zeitstempel                 |
| Zeitstempel         | UnsignedBigInteger | TinyIncrements        | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

Erstelle ein `Enum`-Feld, das in `Mysql` gemäß dem Typ in `[]any` gespeichert werden kann, aber in `Postgres`, `Sqlite` und
`Sqlserver` Datenbanken, es ist ein `String` Typ.

```go
table.Enum("difficulty", []any{"easy", "hard"})
Tabelle.Enum("num", []irgend{1, 2})
```

#### ID

Die `ID` Methode ist ein Alias für die `BigIncrements` Methode. Standardmäßig wird diese Methode eine `id`-Spalte erstellen; aber,
, wenn Sie der Spalte einen anderen Namen zuweisen möchten, können Sie den Spaltennamen übergeben:

```go
table.ID()
Tabelle.ID("user_id")
```

#### SoftDeletes

Die `SoftDeletes` Methode fügt eine nullable `deleted_at` `TIMESTAMP` Spalte hinzu. Diese Spalte soll den Zeitstempel
`deleted_at` speichern, der für die Orm "soft delete" Funktion erforderlich ist:

```go
table.SoftDeletes()
```

#### Eigene Spalte

Wenn du Spaltentypen verwendest, die das Framework noch nicht unterstützt, kannst du die `Column`-Methode verwenden, um den Feldtyp
anzupassen:

```go
table.Column("Geometrie", "Geometrie")
```

### Spaltenmodifikatoren

Zusätzlich zu den oben aufgeführten Spaltentypen können Sie beim Hinzufügen einer Spalte zu einer Datenbanktabelle auch "Modifikatoren" zu der Spalte
hinzufügen. Um zum Beispiel eine Spalte "nullable" zu erlauben, kannst du die "Nullable"-Methode verwenden:

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

Die folgende Tabelle enthält alle verfügbaren Spaltenmodifikatoren:

| Geändert                     | Beschreibung                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`           | Legt eine ganzzahlige Spalte als Auto-Inkrementierung fest (Primärschlüssel)                                                            |
| `.Comment("mein Kommentar")` | Fügt der Spalte einen Kommentar (MySQL / PostgreSQL) hinzu                                                                              |
| `.Standard(Wert)`            | Legt den Standardwert für die Spalte fest                                                                                                                  |
| `.Nullable()`                | Erlaubt NULL-Werte in die Spalte einzufügen                                                                                                                |
| `.Unsignned()`               | Setzt eine Ganzzahl-Spalte als UNSIGNED (nur MySQL)                                                                                     |
| `.UseCurrent()`              | Setzt eine Zeitstempelspalte um CURRENT_TIMESTAMP als Standardwert zu verwenden                                                       |
| `.UseCurrentOnUpdate()`      | Setzt eine Zeitstempel-Spalte, um CURRENT_TIMESTAMP zu verwenden, wenn der Datensatz aktualisiert wird (nur MySQL) |

### Spalte ablegen

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Indizes

### Index erstellen

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Primärschlüssel
  Tabelle hinzufügen. rimary("id")
  // Primärschlüssel
  Tabelle.Primary("id", "name")

  // Eindeutigen Index
  Tabelle hinzufügen. nique("name")
  table.Unique("name", "age")

  // Normaler Index
  table.Index("name")
  Tabelle hinzufügen. ndex("name", "age")

  // Volltextindex
  Tabelle.FullText("name")
  Tabelle.FullText("name", "age")
})
```

### Index umbenennen

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Index ablegen

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_unique")
  table.DropIndex("name")
  table.DropIndexByName("name_index")
  table.DropFullText("name")
  table.DropFullTextByName("name_fulltext")
})
```

### Fremdschlüssel erstellen

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### Fremdschlüssel ablegen

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
