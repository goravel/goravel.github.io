# Erste Schritte

Goravel macht es Entwicklern einfach, mit Datenbanken unter Verwendung von `facades.Orm()` zu interagieren. Derzeit bietet es offizielle
Unterstützung für die folgenden vier Datenbanken:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL-Server 2017+

Bevor du startest, konfiguriere die Datenbank in `.env` und bestätige die `default` Konfiguration in `config/database.go`.

# Konfiguration

Um Datenbanken zu konfigurieren, navigieren Sie zu `config/database.go`. Hier kannst du alle Datenbankverbindungen anpassen und
eine `default` Verbindung auswählen. Die Konfiguration in dieser Datei basiert auf den Umgebungsvariablen des Projekts und
zeigt verschiedene Datenbankkonfigurationen, die Goravel unterstützt.

### DSN

Du kannst DSN auch verwenden, um dich direkt mit der Datenbank zu verbinden, konfiguriere einfach das Feld `dsn` in der Konfigurationsdatei:

```go
"postgres": Karte[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Verbindungen lesen & schreiben

Manchmal kannst du eine Datenbankverbindung für `SELECT` Anweisungen und eine andere für `INSERT`, `UPDATE` und
`DELETE` Anweisungen verwenden. Goravel macht dies zu einem Kinderspiel.

Um zu sehen, wie Lese-/Schreib-Verbindungen konfiguriert werden sollen, werfen Sie einen Blick auf dieses Beispiel:

```go
import "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "Lesen": []Datenbank. onfig{
      {Host: "192.168.1. ", Port: 3306, Datenbank: "forge", Benutzername: "root", Passwort: "123123"},
    },
    "write": []Datenbank. onfig{
      {Host: "192.168.1. ", Port: 3306, Datenbank: "forge", Benutzername: "root", Passwort: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "Zeichensatz": "utf8mb4",
    "loc": "Lokal",
  },
}
```

Wir haben das Konfigurationsarray um zwei neue Schlüssel aktualisiert - `read` und `write`. Die `read` Verbindung wird
`192.168.1.1` als Host verwenden, während die `write` Verbindung `192.168.1.2` verwendet. Beide Verbindungen teilen den gleichen
-Datenbank-Präfix, Zeichensatz und andere Optionen, die im mysql-Hauptarray angegeben sind. Falls mehrere Werte im
`host` Konfigurations-Array vorhanden sind, wird zufällig ein Datenbank-Host für jede Anfrage ausgewählt.

### Verbindungspool

Sie können einen Verbindungspool in der Konfigurationsdatei konfigurieren, eine vernünftige Konfiguration der Verbindungspool-Parameter
kann die Gleichwährungsleistung erheblich verbessern:

| Schlüssel                                                                        | Aktion                                   |
| -------------------------------------------------------------------------------- | ---------------------------------------- |
| pool.max_idle_conns    | Maximale Leerlaufverbindungen            |
| pool.max_open_conns    | Max. offene Verbindungen |
| pool.conn_max_idletime | Maximale Leerlaufzeit der Verbindungen   |
| pool.conn_max_lifetime | Maximale Lebensdauer der Verbindungen    |

### Schema

Postgres und Sqlserver unterstützen das Konfigurieren von Schema. Postgres können das Schema direkt in der Konfigurationsdatei festlegen, während
Sqlserver das Schema durch die Methode `TableName` im Modell angeben muss.

#### Postgres

```go
"connections": map[string]any{
  "postgres": map[string]any{
    "driver": "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### Sqlserver

```go
func (r *User) TableName() string {
  return "goravel.users"
}
```

### Datenbankinformationen abrufen

Du kannst den Befehl `db:show` verwenden, um alle Tabellen in der Datenbank anzuzeigen.

```bash
go run . artisan db:show
```

Du kannst auch den Befehl `db:table` verwenden, um die Struktur einer bestimmten Tabelle anzuzeigen.

```bash
go run . artisan db:table
go run . artisan db:table Benutzer
```

## Modelldefinition

Um ein benutzerdefiniertes Modell zu erstellen, verweisen Sie auf die Modelldatei `app/models/user.go`, die im Framework enthalten ist. Die `struct`
in `app/models/user.go` enthält zwei eingebettete Frameworks: `orm.Model` und `orm.SoftDeletes`. Diese Frameworks definieren
`id`, `created_at`, `updated_at` und `deleted_at` Eigenschaften. Mit `orm.SoftDeletes` können Sie die weiche
Löschung für das Modell aktivieren.

### Modellkonvention

1. Das Modell ist mit einem großen Buck benannt;
2. Verwenden Sie die Pluralform des Modells "Schlangennaming" als Tabellenname;

Zum Beispiel lautet der Modellname `UserOrder`, und der Tabellenname `user_orders`.

### Modell erstellen

Benutze den Befehl `make:model` um ein Modell zu erstellen:

```shell
go run . handwerklicher make:model User
go run . handwerklicher make:model user/user
```

Erstellte Modelldatei befindet sich in `app/models/user.go`-Datei, der Inhalt lautet wie folgt:

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Name String
  Avatar String
  orm.SoftDeletes
}
```

Wenn du das Modellfeld auf `any` setzen möchtest, musst du einen zusätzlichen Tag hinzufügen: \`gorm:"type:text":

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Detail alle `gorm:"type:text"`
  orm.SoftDeletes
}
```

Weitere Details zur Tagnutzung finden Sie unter: <https://gorm.io/docs/models.html>.

### Tabellenname angeben

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Name string
  Avatar string
  orm. oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### Datenbankverbindungen

Standardmäßig verwenden alle Modelle die für Ihre Anwendung konfigurierte Datenbankverbindung. Wenn du eine
unterschiedliche Verbindung angeben möchtest, die bei der Interaktion mit einem bestimmten Modell verwendet werden soll du musst eine `Connection` Methode im
Modell definieren.

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Name string
  Avatar string
  orm. oftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## facades.Orm() verfügbare Funktionen

| Name             | Aktion                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Verbindung       | [Datenbank verbinden](#specify-database-connection)                                            |
| TB               | [Generische Datenbankschnittstelle sql.DB](#generic-database-interface-sql-db) |
| Abfrage          | [Datenbank Instanzen](#get-database-instance)                                                  |
| Transaktion      | [Transaction](#transaction)                                                                    |
| Widerrufskontext | [Inject Kontext](#inject-context)                                                              |

## facades.Orm().Query() verfügbare Funktionen

| Funktionen              | Aktion                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Beginnen                | [Transaktion beginnen](#transaction)                                                                               |
| Übertragen              | [Transaktion übertragen](#transaction)                                                                             |
| Anzahl                  | [Count](#count)                                                                                                    |
| Anlegen                 | [Create](#create)                                                                                                  |
| Cursor                  | [Cursor](#cursor)                                                                                                  |
| Löschen                 | [Delete](#delete)                                                                                                  |
| Unterschiedlich         | [Wiederholung filtern](#filter-repetition)                                                                         |
| Fahrer                  | [Get Driver](#get-driver)                                                                                          |
| Exec                    | [natives Update ausfhren](#execute-native-update-sql)                                                              |
| Existiert               | [Exists](#exists)                                                                                                  |
| Suchen                  | [Abfrage einer oder mehrerer Zeilen nach ID](#query-one-or-multiple-lines-by-id)                                   |
| FindOrFail              | [Nicht gefunden Rückgabefehler](#not-found-return-error)                                                           |
| Erster                  | [Eine Zeile abfragen](#query-one-line)                                                                             |
| Erster                  | [Daten per Rückruf abfragen oder zurücksenden](#query-one-line)                                                    |
| FirstOrCreate           | [Modelle abrufen oder erstellen](#retrieving-or-creating-models)                                                   |
| FirstOrNeu              | [Abrufen oder neue Modelle](#retrieving-or-creating-models)                                                        |
| FirstOrFail             | [Fehler nicht gefunden](#not-found-error)                                                                          |
| Erzwingen löschen       | [Löschen erzwingen](#delete)                                                                                       |
| Erhalten                | [Abfrage mehrerer Zeilen](#query-multiple-lines)                                                                   |
| Gruppe                  | [Group](#group-by--having)                                                                                         |
| Habe                    | [Having](#group-by-having)                                                                                         |
| Beitreten               | [Join](#join)                                                                                                      |
| Limit                   | [Limit](#limit)                                                                                                    |
| LockForUpdate           | [Pessimistische Sperre](#pessimistic-locking)                                                                      |
| Modell                  | [Gib ein Modell an](#specify-table-query)                                                                          |
| Versatz                 | [Offset](#offset)                                                                                                  |
| Sortierung              | [Order](#order)                                                                                                    |
| Bestellung nach         | [Order](#order)                                                                                                    |
| OrderByDesc             | [Order](#order)                                                                                                    |
| Unzufällige Reihenfolge | [Order](#order)                                                                                                    |
| Orwohin                 | [OrWhere](#where)                                                                                                  |
| OrwhereNotIn            | [OrWhereNotIn](#where)                                                                                             |
| OrWhereNull             | [OrWhereNull](#where)                                                                                              |
| OrwhereIn               | [OrWhereIn](#where)                                                                                                |
| Paginieren              | [Paginate](#paginate)                                                                                              |
| Stempeln                | [Abfrage einer einzelnen Spalte](#query-single-column)                                                             |
| Rohe                    | [native SQL]ausführen (#execute-native-sql) |
| Wiederherstellen        | [Restore](#restore)                                                                                                |
| Rollback                | [Transaktion rückgängig machen](#transaction)                                                                      |
| Speichern               | [Aktualisiere ein existierendes Modell](#update-a-existing-model)                                                  |
| Leise speichern         | [Ein einzelnes Modell ohne Ereignisse speichern](#saving-a-single-model-without-events)                            |
| Scannen                 | [struct](#execute-native-sql)                                                                                      |
| Bereiche                | [Scopes](#scopes)                                                                                                  |
| Auswählen               | [Felder angeben](#specify-fields)                                                                                  |
| SharedLock              | [Pessimistische Sperre](#pessimistic-locking)                                                                      |
| Sum                     | [Sum](#sum)                                                                                                        |
| Tisch                   | [Tabelle angeben](#specify-table-query)                                                                            |
| ToSql                   | [Get SQL](#get-sql)                                                                                                |
| ToRawSql                | [Get SQL](#get-sql)                                                                                                |
| Aktualisieren           | [Eine einzelne Spalte aktualisieren](#update-a-single-column)                                                      |
| UpdateOrCreate          | [Aktualisieren oder erstellen](#update-or-create)                                                                  |
| Wo                      | [Where](#where)                                                                                                    |
| Woher zwischen          | [WhereBetween](#where)                                                                                             |
| Wohin NotBetween        | [WhereNotBetween](#where)                                                                                          |
| WhereNotIn              | [WhereNotIn](#where)                                                                                               |
| Null                    | [WhereNull](#where)                                                                                                |
| Ins                     | [WhereIn](#where)                                                                                                  |
| Ohne, Termine           | [Ereignisse mutieren](#muting-events)                                                                              |
| Ausgenommen             | [Abfrage soft delete data](#query-soft-delete-data)                                                                |

## Abfrage-Builder

### Kontext einfügen

```go
facades.Orm().WithContext(ctx)
```

### Datenbankverbindung angeben

Wenn mehrere Datenbankverbindungen in `config/database.go` definiert sind, kannst du sie über die `Connection` Funktion
von `facades.Orm()` verwenden. Der Verbindungsname sollte an `Connection` übergeben werden, der in
`config/database.go` konfiguriert ist:

```go
facades.Orm().Connection("mysql")
```

### Generische Datenbankschnittstelle sql.DB

Generische Datenbankschnittstelle sql.DB, dann nutzen Sie die Funktionalität, die sie bereitstellt:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Schließen
db. lose()

// Gibt Datenbankstatistiken
db.Stats()

// SetMaxIdleConns legt die maximale Anzahl der Verbindungen im Pool der unbeschäftigten Verbindung
db fest. etMaxIdleConns(10)

// SetMaxOpenConns legt die maximale Anzahl offener Verbindungen zur Datenbank
db fest. etMaxOpenConns(100)

// SetConnMaxLifetime legt die maximale Zeit fest, die eine Verbindung wiederverwendet werden kann
db.SetConnMaxLifetime(time.Stour)
```

### Datenbankinstanz abrufen

Vor jeder spezifischen Datenbankoperation ist es notwendig, eine Instanz der Datenbank zu erhalten.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Auswählen

#### Eine Zeile abfragen

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

Manchmal möchten Sie eine andere Aktion ausführen, wenn keine Ergebnisse gefunden werden. Die `FirstOr` Methode gibt eine einzelne
Modellinstanz zurück oder, wenn keine Ergebnisse gefunden werden, die angegebene Schließung aus. Sie können Werte auf Modell im Schließen setzen:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Eine oder mehrere Zeilen per ID abfragen

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var users []models. ser
facades.Orm().Query().Find(&users []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Nicht gefunden Rückgabewert

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Wenn der Primärschlüssel der Benutzertabelle `string` ist, musst du beim Aufruf den Primärschlüssel angeben

`Suchen` Methode

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a";
```

#### Mehrere Zeilen abfragen

```go
var users []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### Modelle abrufen oder erstellen

Die Methode `FirstOrCreate` sucht nach einem Datensatz mit den angegebenen Spalten/Wert-Paaren. Wenn das Modell nicht
in der Datenbank gefunden werden kann, erzeugt es einen neuen Datensatz mit den Attributen aus dem Zusammenführen des ersten Arguments mit dem optionalen
zweiten Argument.

Ebenso versucht die `FirstOrNew` Methode, einen Datensatz in der Datenbank basierend auf den angegebenen Attributen zu finden. However,
if it is not found, a new instance of the model is returned. Es ist wichtig zu beachten, dass dieses neue Modell noch nicht
in der Datenbank gespeichert wurde und Sie dazu manuell die `Save`-Methode aufrufen müssen.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

var user models. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Fehler nicht gefunden

Wenn das angeforderte Element nicht gefunden wird, erzeugt die Methode `First` keinen Fehler. Um einen Fehler zu erzeugen, verwende die
`FirstOrFail` Methode:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Wo

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
facades.Orm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Query().OrWhereIn("name", []any{"a"})
```

### Limit

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Versatz

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Sortierung

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sortieren asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

Fassaden. rm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). her("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Paginieren

```go
var users []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &users &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Einzelne Spalte abfragen

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Tabellenabfrage angeben

Wenn Sie einige Aggregatdaten abfragen wollen, müssen Sie eine bestimmte Tabelle angeben.

Ein Modell angeben

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Tabelle angeben

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // alle Datensätze abrufen, ob gelöscht oder nicht
```

### Get SQL

SQL mit Platzhalter holen:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = $1 AND "users"."deleted_at" IST NULL
```

SQL mit Wert erhalten:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = 1 AND "users"."deleted_at" IST NULL
```

Die Methoden können nach `ToSql` und `ToRawSql` aufgerufen werden: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Speichern`, `Sum`, `Update`.

### Anzahl

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### Felder angeben

`Select` erlaubt es dir, festzulegen, welche Felder du aus der Datenbank abrufen möchtest. Standardmäßig ruft das ORM alle Felder ab.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Gruppieren durch & haben

```go
type Result struct {
  Name string
  Total int
}

var result
facades.Orm().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Beitreten

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN email ON emails.user_id = users.id;
```

### Anlegen

```go
user := models.User{Name: "tom", Age: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT INTO Benutzer (Name, Alter, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// Modellereignisse
err := Fassaden nicht auslösen. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Trigger model events
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### Mehrere erstellen

```go
users := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("users"). reate(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). uery().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` und `updated_at` werden automatisch ausgefüllt.

### Cursor

Kann verwendet werden, um den Speicherverbrauch Ihrer Anwendung deutlich zu senken, wenn Zehntausende von
Eloquent Modelleinträge durchlaufen. Beachte, die `Cursor` Methode kann gleichzeitig mit `With` verwendet werden bitte
benutze [Lazy Eager Loading](./relationships#lazy-eager-loading), um die Beziehung in der `for` Logik zu laden.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var user models. ser
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### Modell speichern

#### Aktualisiere ein vorhandenes Modell

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Spalten aktualisieren

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(models. ser{Name: "hallo", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hallo", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> Beim Aktualisieren mit `struct` wird Orm nur Felder aktualisieren, die nicht null sind. Möglicherweise solltest du `map` verwenden, um Attribute zu aktualisieren oder
> verwende `Select`, um zu aktualisierende Felder anzugeben. Beachte, dass `struct` nur `Model` sein kann, wenn du mit nicht
> `Model` aktualisieren möchtest, musst du `. able("users")`, das Feld `updated_at` kann jedoch nicht automatisch zum
> aktualisiert werden.

#### Aktualisieren oder erstellen

Abfrage mit `name`, falls nicht vorhanden, erstellt mit `name`, `avatar`, falls vorhanden, Update `avatar` basierend auf `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` IS NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IST NULL AND `id` = 1;
```

### Löschen

Löschen nach Modell, die Anzahl der Datensätze, die von der Anweisung betroffen sind, wird von der Methode zurückgegeben:

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

Mehrere löschen

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE FROM `users` WHERE name = 'tom';
```

Willst du erzwingen eine Soft-Lösch-Daten zu löschen.

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete() 
 facades.ForceDelete()
```

Sie können Datensätze mit Modellverknüpfungen über `Select` löschen:

```go
// Benutzerkonto löschen, wenn Benutzer
facades.Orm().Query().Select("Account").Delete(&user)

// Bestellungen und CreditCards des Benutzers löschen, wenn Benutzer
facades.Orm().Query().Select("Bestellungen", "CreditCards"). elete(&user)

// Alle untergeordneten Verbindungen des Benutzers löschen, wenn der Benutzer
facades.Orm().Query().Select(orm.Associations). elete(&user)

// Löschen Sie alle Benutzerkonten beim Löschen von Benutzern
facades.Orm().Query().Select("Account").Delete(&users)
```

Hinweis: Die Verbindungen werden nur gelöscht, wenn der Primärschlüssel des Datensatzes nicht leer ist, und Orm verwendet diese primären
Schlüssel als Bedingungen, um die zugehörigen Datensätze zu löschen:

```go
// Benutzer löschen, der name='goravel', aber nicht das Konto des Benutzers
facades.Orm().Query().Select("Account").Where("name = ?", "goravel"). elete(&models.User{})

// Benutzer löschen, der name='goravel' und id = 1 hat und das Benutzerkonto der
Fassaden löscht. rm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// User that id = 1 löschen und Account des Benutzers
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

Wenn Batch ohne Bedingungen ausgeführt wird, macht ORM das nicht und gibt einen Fehler zurück. Sie müssen also einige
Bedingungen hinzufügen oder native SQL verwenden.

### Abfrage Soft Löschen Daten

```go
var user models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Wiederholung filtern

```go
var Benutzer []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### Fahrer holen

```go
driver := facades.Orm().Query().Driver()

// Treiber
beurteilen, wenn Treiber == orm.DriverMysql {}
```

### Native SQL ausführen

```go
type Result struct {
  ID int
  Name string
  Age int
}

var result Result
facades. rm().Query().Raw("SELECT id, name, age FROM users WHERE name = ?", "tom").Scan(&result)
```

### Native Update SQL ausführen

Die Anzahl der Datensätze, die von der Anweisung betroffen sind, wird von der Methode zurückgegeben:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE Benutzer")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Existiert

```go
var existiert bool
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Exists(&exists)
```

### Wiederherstellen

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transaktion

Du kannst eine Transaktion über die `Transaction` Funktion ausführen.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

return facades.Orm().Transaction(func(tx orm.Query) error {
  var user models.User

  return tx.Find(&user, user.ID)
})
```

Sie können den Transaktionsfluss auch manuell selbst steuern:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Bereiche

Ermöglicht Ihnen die Angabe häufig verwendeter Abfragen, die beim Aufruf der Methode referenziert werden können.

```go
func Paginator(Seitenstring, Limit-String) func(methods orm.Query) orm. uery {
  return func(query orm.Query) orm.Abfrage {
    Seite, _ := strconv. toi(page)
    limit, _ := strconv. toi(limit)
    offset := (page - 1) * limit

    return query. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator ist eine benutzerdefinierte Funktion: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### Rohe Ausdrücke

Du kannst die `db.Raw` Methode verwenden, um Felder zu aktualisieren:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Pessimistisches Sperren

Der Query Builder enthält auch ein paar Funktionen, die dir helfen, "pessimistische Sperrung" zu erreichen, wenn du deine `select`
Anweisungen ausführst.

Um eine Anweisung mit einer "shared lock" auszuführen, können Sie die `SharedLock` Methode aufrufen. Eine gemeinsame Sperre verhindert, dass die ausgewählten
Zeilen geändert werden, bis Ihre Transaktion durchgeführt wurde:

```go
var users []models.User
facades.Orm().Query().Where("Votes", ">", 100).SharedLock().Get(&users)
```

Alternativ können Sie die `LockForUpdate` Methode verwenden. Eine "for update"-Sperre verhindert, dass die ausgewählten Datensätze
geändert oder mit einer anderen Freigabesperre ausgewählt werden:

```go
var users []models.User
facades.Orm().Query().Where("votes", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
var sum int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Ereignisse

Orm Modelle versenden mehrere Ereignisse, so dass du in die folgenden Momente im Lebenszyklus eines Modells eingreifen kannst: `Eingeschoben`,
`Erstellen`, `Created`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

Das `Retrieved` Event wird versandt, wenn ein existierendes Modell aus der Datenbank abgerufen wird. Wenn ein neues Modell für
zum ersten Mal gespeichert wird, werden die `Creating` und `Created` Ereignisse versendet. Die `Updating` / `Updated` Ereignisse werden verschickt, wenn
ein existierendes Modell modifiziert wird und die `Save` Methode aufgerufen wird. Die `Saving` / `Saved` Ereignisse werden verschickt, wenn ein Modell
erstellt oder aktualisiert wird - auch wenn die Attribute des Modells nicht geändert wurden. Ereignisnamen, die mit `-ing` enden werden
versendet, bevor Änderungen am Modell fortgesetzt werden, während Ereignisse, die mit `-ed` enden, versendet werden, nachdem die
Änderungen am Modell fortbestehen.

Um mit dem Hören von Modellereignissen zu beginnen, definiere eine `DispatchesEvents` Methode auf deinem Modell. Diese Eigenschaft ordnet verschiedene Punkte
des Lebenszyklus des Modells Ihren eigenen Event-Klassen zu.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

Typ User struct {
 orm. odel
 Name string
}

func (u *User) DispatchesEvents() map[contractsorm.EventType]func(contractsorm. vent) error {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreating: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) Fehler {
   return nil
  },
  contractsorm.EventGespeichert: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. vent) Fehler {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm. ventDeleting: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm. ventDeleted: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm.EventForceDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventForceDeleted: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm.EventRetrieved: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm. ventWiederhergestellt: func(event contractsorm.Event) Fehler {
   return nil
  },
  contractsorm.EventWiederherstellung: func(event contractsorm.Event) Fehler {
   return nil
  },
 }
}
```

> Notiz: Registrieren Sie sich einfach die Veranstaltungen, die Sie benötigen. Modellereignisse werden bei Stapeloperationen über Orm nicht versandt.

### Beobachter

#### Definiere Beobachter

Wenn Sie auf viele Ereignisse auf einem bestimmten Modell hören du kannst Beobachter verwenden, um alle deine Zuhörer in einer einzigen
-Klasse zu gruppieren. Observer-Klassen haben Methodennamen, die die Eloquent-Ereignisse widerspiegeln, auf die Sie hören möchten. Jede dieser Methoden
erhält das betroffene Modell als einziges Argument. Der `make:observer` Artisan Befehl ist der einfachste Weg, eine
neue Beobachterklasse zu erstellen:

```shell
go run . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

Dieser Befehl wird den neuen Beobachter in dein `app/observers` Verzeichnis setzen. Wenn dieses Verzeichnis nicht existiert, wird Artisan
es für Sie erstellen. Dein frischer Beobachter wird wie folgt aussehen:

```go
Paketbeobachter

Import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

Typ UserObserver struct{}

func (u *UserObserver) Erstellt (Event Orm. vent) Fehler {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) Fehler {
 return nil
}

func (u *UserObserver) Deleted(event orm. vent) Fehler {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) Fehler {
 return nil
}
```

Der Template-Beobachter enthält nur einige Ereignisse, Sie können andere Ereignisse nach Ihren Bedürfnissen hinzufügen.

Um einen Beobachter zu registrieren, musst du die `Observe` Methode auf dem Modell aufrufen, das du beobachten möchtest. Du kannst
Beobachter in der `Boot` Methode des `app/providers/event_service_provider.go::Boot` Service Providers deiner Anwendung registrieren:

```go
Paket Provider

Import (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

Typ EventServiceProvider struct {
}

func (Empfänger *EventServiceProvider) Register(app foundation. pplication) {
 facades.Event().Register(Receiver. isten())
}

func (Empfänger *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

Func (Empfänger *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Notiz: Wenn du `DispatchesEvents` und `Observer` gleichzeitig festlegst, wird nur `DispatchesEvents` angewandt.

#### Parameter im Observer

Der Parameter `event` wird an alle Beobachter übergeben:

| Methode      | Aktion                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kontext      | Erhalte Kontext, der von `facades.Orm().WithContext()` bestanden hat                                                                             |
| Getattribut  | Holen Sie sich den geänderten Wert, wenn nicht geändert, den ursprünglichen Wert, wenn es keinen ursprünglichen Wert gibt, geben Sie Null zurück |
| GetOriginal  | Erhalte den ursprünglichen Wert, wenn es keinen ursprünglichen Wert gibt, null zurückgeben                                                       |
| IsDirty      | Legen Sie fest, ob das Feld geändert wurde                                                                                                       |
| IsClean      | IsDirty umgekehrt                                                                                                                                |
| Abfrage      | Erhalten Sie eine neue Abfrage, die mit einer Transaktion verwendet werden kann                                                                  |
| SetAttribute | Neuen Wert für ein Feld setzen                                                                                                                   |

### Muting Ereignisse

Manchmal müssen Sie vorübergehend alle von einem Modell abgefeuerten Ereignisse "stummschalten". Du kannst dies mit der
`WithoutEvents` Methode erreichen:

```go
var user models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Ein einzelnes Modell ohne Events speichern

Manchmal können Sie ein bestimmtes Modell "speichern" wollen, ohne Ereignisse zu versenden. Du kannst dies mit der
`SaveQuietly` Methode erreichen:

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
