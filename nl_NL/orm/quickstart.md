# Aan de slag

Goravel maakt het makkelijk voor ontwikkelaars om met databases te communiceren met `facades.Orm()`. Momenteel biedt het officiële
ondersteuning voor de volgende vier databases:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Voordat je begint, configureer de database in `.env` en bevestig de `default` configuratie in `config/database.go`.

# Configuratie

Om database te configureren, ga naar `config/database.go`. Dit is waar je alle database verbindingen kunt aanpassen en
een 'standaard' verbinding kan kiezen. De configuratie in dit bestand is afhankelijk van de omgevingsvariabelen van het project en
toont verschillende database configuraties die Goravel ondersteunt.

### DSN

Je kunt DSN ook gebruiken om direct met de database te verbinden, configureer het `dsn` veld in het configuratiebestand:

```go
"postgres": map[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Lees & schrijf connecties

Soms kunt u één database verbinding gebruiken voor `SELECT` verklaringen, en een andere voor `INSERT`, `UPDATE`, en
`DELETE` verklaringen. Goravel maakt dit een brood.

Om te zien hoe lezen/schrijven verbindingen moeten worden geconfigureerd, laten we dit voorbeeld bekijken:

```go
importeer "github.com/goravel/framework/contracts/database"

// config/database. o
"verbindingen": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "lezen": []database. onfig{
      {Host: "192.168.1. ", Poort: 3306, Database: "forge", gebruikersnaam: "root", Wachtwoord: "123123"},
    },
    "write": []database. onfig{
      {Host: "192.168.1. ", Poort: 3306, Database: "forge", gebruikersnaam: "root", Wachtwoord: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "gebruikersnaam": config.Env("DB_USERNAME", ""),
    "wachtwoord: config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Lokaal",
  },
}
```

We hebben de configuratie array bijgewerkt met twee nieuwe sleutels - `read` en `write`. De `gelezen` verbinding gebruikt
`192.168.1.1` als de host, terwijl de `write` verbinding `192.168.1.2` zal gebruiken. Beide verbindingen hebben dezelfde
database voorvoegsel, tekenset en andere opties opgegeven in de mysql array. In het geval van meerdere waarden in de
`host` configuratie array, wordt een database host voor elke aanvraag willekeurig geselecteerd.

### Vragenset voor verbinding

Je kunt een connectie pool configureren in het configuratiebestand, een redelijke configuratie van de connectie parameters
kan concurrency prestaties aanzienlijk verbeteren:

| Sleutel                                                                          | actie                                       |
| -------------------------------------------------------------------------------- | ------------------------------------------- |
| pool.max_idle_conns    | Maximale inactieve verbindingen             |
| pool.max_open_conns    | Maximale open verbindingen                  |
| pool.conn_max_idletime | Max. inactieve verbindingen |
| pool.conn_max_lifetime | Verbindingen max levensduur                 |

### Schema

Postgres en Sqlserver ondersteuning voor het configureren van Schema. Postgres kan de Schema rechtstreeks instellen in het configuratiebestand, terwijl
Sqlserver de Schema moet specificeren via de 'TableName' methode in het model.

#### Postgres

```go
"connecties": map[string]any{
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

### Verkrijg Database Informatie

Je kan het `db:show` commando gebruiken om alle tabellen in de database te bekijken.

```bash
uitvoeren . artisan db:show
```

Je kunt ook het `db:table` commando gebruiken om de structuur van een specifieke tabel te bekijken.

```bash
uitvoeren . artisan db:table
go run . artisan db:table gebruikers
```

## Model definitie

Om een aangepast model te maken, raadpleeg het model bestand `app/models/user.go` dat is opgenomen in de framework. De `struct`
in `app/models/user.go` bevat twee ingesloten frameworks: `orm.Model` en `orm.SoftDeletes`. Deze frameworks definiëren respectievelijk
`id`, `created_at`, `updated_at`, en `deleted_at` eigenschappen. Met `orm.SoftDeletes`, kunt u zachte
verwijderen inschakelen voor het model.

### Model conventie

1. Het model heet met een grote hump;
2. Gebruik de meervoudsvorm van het model "naam van de slangen" als de naam van de tafel;

Bijvoorbeeld, de modelnaam is `UserOrder`, en de tabelnaam is `user_orders`.

### Model aanmaken

Gebruik het `make:model` commando om een model te maken:

```shell
uitvoeren . artisan make:model gebruiker
ga uitvoeren. artisan make:model gebruiker/gebruiker
```

Gemaakte modelbestand is te vinden in `app/models/user.go` bestand, de inhoud is als volgt:

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type Gebruiker struct {
  orm. odel
  Naam string
  Avatar string
  orm.SoftDeletes
}
```

Als u het model wilt instellen op `any`, dan moet u een extra tag toevoegen: `gorm:"type:text"`:

```go
type gebruiker bouwt {
  orm.Model
  Naam string
  Avatar string
  Details elk `gorm:"type:text"`
  orm.SoftDeletes
}
```

Meer label-gebruiksdetails kunnen worden gevonden op: <https://gorm.io/docs/models.html>.

### Geef tabelnaam op

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type Gebruiker struct {
  orm. odel
  tekenreeks
  Avatar tekenreeks
  of . oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### Database verbindingen

Standaard maken alle modellen gebruik van de standaard database verbinding geconfigureerd voor uw applicatie. Als u een
specifieke verbinding wilt specificeren die moet worden gebruikt bij interactie met een bepaald model, je moet een `Connectie` methode op het
model definiëren.

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type Gebruiker struct {
  orm. odel
  tekenreeks
  Avatar tekenreeks
  of . oftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## facades.Orm() beschikbare functies

| naam                    | actie                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Verbindingsinstellingen | [Specificeer Database Connection](#specify-database-connection)                         |
| DB                      | [Generic Database Interface sql.DB](#generic-database-interface-sql-db) |
| Zoekopdracht            | [Get Database Instance](#get-database-instance)                                         |
| Transactie              | [Transaction](#transaction)                                                             |
| Opname                  | [Injectie context](#inject-context)                                                     |

## facades.Orm().Query() beschikbare functies

| Functies                | actie                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Beginnen                | [Begin transactie](#transaction)                                                     |
| Vastleggen              | [Commit transactie](#transaction)                                                    |
| Tel                     | [Count](#count)                                                                      |
| Aanmaken                | [Create](#create)                                                                    |
| Cursor                  | [Cursor](#cursor)                                                                    |
| Verwijderen             | [Delete](#delete)                                                                    |
| Onderscheid             | [Filter Repetitie](#filter-repetition)                                               |
| Chauffeur               | [Get Driver](#get-driver)                                                            |
| Exec                    | [Voer native update SQL uit](#execute-native-update-sql)                             |
| Bestaat                 | [Exists](#exists)                                                                    |
| Zoeken                  | [Vraag één of meerdere regels op ID](#query-one-or-multiple-lines-by-id)             |
| FindOrFail              | [Niet gevonden retour fout](#not-found-return-error)                                 |
| Eerste                  | [Vraag één regel](#query-one-line)                                                   |
| Voorafgaand             | [Query of return data via callback](#query-one-line)                                 |
| FirstOrCreate           | [Ophalen of aanmaken van modellen](#retrieving-or-creating-models)                   |
| FirstOrNew              | [Ophalen of nieuwe modellen](#retrieving-or-creating-models)                         |
| FirstOrFail             | [Niet gevonden fout](#not-found-error)                                               |
| Forceer                 | [Forceer verwijderen](#delete)                                                       |
| Verkrijg                | [Query multiple lines](#query-multiple-lines)                                        |
| Groeperen               | [Group](#group-by--having)                                                           |
| hebben                  | [Having](#group-by-having)                                                           |
| Deelnemen               | [Join](#join)                                                                        |
| Limiet                  | [Limit](#limit)                                                                      |
| LockForUpdate           | [Pessimistische Locking](#pessimistic-locking)                                       |
| Model                   | [Specificeer een model](#specify-table-query)                                        |
| Verschuiving            | [Offset](#offset)                                                                    |
| Bestelling              | [Order](#order)                                                                      |
| BestellingDoor          | [Order](#order)                                                                      |
| OrderByDesc             | [Order](#order)                                                                      |
| Onwillekeurige volgorde | [Order](#order)                                                                      |
| Bestemming              | [OrWhere](#where)                                                                    |
| OrWhereNotIn            | [OrWhereNotIn](#where)                                                               |
| OrWhereNull             | [OrWhereNull](#where)                                                                |
| OrWhereIn               | [OrWhereIn](#where)                                                                  |
| Pagineren               | [Paginate](#paginate)                                                                |
| Plug-in                 | [Query single column](#query-single-column)                                          |
| Onbewerkte              | [Execute native SQL](#execute-native-sql)                                            |
| Herstellen              | [Restore](#restore)                                                                  |
| Rollback                | [Rollback transactie](#transaction)                                                  |
| Opslaan                 | [Update een bestaand model](#update-a-existing-model)                                |
| SaveQuietly             | [Opslaan van één model zonder gebeurtenissen](#saving-a-single-model-without-events) |
| Scannen                 | [Scan struct](#execute-native-sql)                                                   |
| Toepassingsgebieden     | [Scopes](#scopes)                                                                    |
| Selecteren              | [Specificeer velden](#specify-fields)                                                |
| Gedeelde Slot           | [Pessimistische Locking](#pessimistic-locking)                                       |
| Sum                     | [Sum](#sum)                                                                          |
| Tabel                   | [Specificeer een tafel](#specify-table-query)                                        |
| ToSql                   | [Get SQL](#get-sql)                                                                  |
| ToRawSql                | [Get SQL](#get-sql)                                                                  |
| Vernieuwen              | [Update a single column](#update-a-single-column)                                    |
| Aanmaken                | [Update of create](#update-or-create)                                                |
| Waar                    | [Where](#where)                                                                      |
| Waartussen              | [WhereBetween](#where)                                                               |
| Waar NotTussen          | [WhereNotBetween](#where)                                                            |
| Waar NotIn              | [WhereNotIn](#where)                                                                 |
| Waar Null               | [WhereNull](#where)                                                                  |
| Waar in                 | [WhereIn](#where)                                                                    |
| WondertEvenementen      | [Muting events](#muting-events)                                                      |
| Teruggetrokken          | [Query soft delete data](#query-soft-delete-data)                                    |

## Query Bouwer

### Context van injectie

```go
facades.Orm().WithContext(ctx)
```

### Specificeer Database Connectie

Als meerdere database verbindingen zijn gedefinieerd in `config/database.go`, kan je ze gebruiken via de `Connection` functie
van `facades.Orm()`. De connectie naam doorgegeven aan `Connection` moet een van de verbindingen geconfigureerd zijn in
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### Generieke Database Interface sql.DB

Algemene database interface sql.DB, gebruik dan de functionaliteit die het biedt:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Sluit
db. lose()

// Retourneert database statistieken
db.Stats()

// SetMaxIdleConns stelt het maximale aantal verbindingen in de inactieve verbindingspool
db. etMaxIdleConns(10)

// SetMaxOpenConns stelt het maximum aantal open verbindingen in naar de database
db. etMaxOpenConns(100)

// SetConnMaxLifetime stelt de maximale tijd in die een verbinding mag worden hergebruikt
db.SetConnMaxLifetime(time.Hour)
```

### Download Database Instance

Voor elke specifieke database operatie is het noodzakelijk om een exemplaar van de database te verkrijgen.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Selecteren

#### Vraag één regel aan

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER DOOR `users`.`id` LIMIT 1;
```

Soms kunt u een andere actie uitvoeren als er geen resultaten worden gevonden. De `FirstOr` methode zal een enkele
model-instantie retourneren of, als er geen resultaten worden gevonden, de gegeven sluiting uitvoeren. Je kunt waarden instellen op model in sluiting:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() fout {
  user.Name = "goravel"

  return nil
})
```

#### Zoek één of meerdere regels per ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * VROM `users` WHERE `users`.`id` = 1;

var users []models. ser
facades.Orm().Query().Find(&gebruikers, []int{1,2,3})
// SELECT * VROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Geen retour fout gevonden

```go
var gebruikersmodels.User
err := facades.Orm().Query().FindOrFail(&gebruiker, 1)
```

#### Wanneer de primaire sleutel van de gebruiker tabel een `string` type is, moet je de primaire sleutel opgeven bij het aanroepen van de gebruiker

`Zoek` methode

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * VROM `users` WHERE `users`.`uuid` = "a";
```

#### Query meerdere regels

```go
var users []models.User
facades.Orm().Query().here("id in ?", []int{1,2,3}).Get(&users)
// SELECT * VROM `users` WHERE id in (1,2,3);
```

#### Ophalen of Modellen creëren

De `FirstOrCreate` methode zoekt naar een database record met behulp van de gespecificeerde kolom/waarde paren. Als het model niet
gevonden kan worden in de database, het maakt een nieuw record aan met de attributen door het samenvoegen van het eerste argument met het tweede argument
.

Evenzo probeert de `FirstOrNew` methode een record te vinden in de database gebaseerd op de gegeven attributen.
als het niet wordt gevonden, wordt er een nieuw exemplaar van het model teruggegeven. Het is belangrijk om op te merken dat dit nieuwe model nog niet
opgeslagen is in de database en je moet de 'Opslaan' methode handmatig aanroepen om dit te doen.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * VROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER DOOR `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, modellen. ser{Avatar: "avatar"})
// GESELECT * VAN `users` WHERE `gender` = 1 EN `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913',','avatar');

var modellen. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * VROM `users` WHERE `gender` = 1 AND `users`. naam` = 'tom' ORDER DOOR `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, modelmodel's. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 EN `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Niet gevonden fout

Wanneer het opgevraagde item niet wordt gevonden, genereert de `First` methode geen fout. Om een fout te genereren, gebruik de
`FirstOrFail` methode:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Waar

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

### Limiet

```go
var users []models.User
facades.Orm().Query().here("naam = ?", "tom").Limit(3).Get(&users)
// SELECT * VROM `users` WHERE naam = 'tom' LIMIT 3;
```

### Verschuiving

```go
var users []models.User
facades.Orm().Query().here("naam = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * VROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Bestelling

```go
gebruikers []modellen.User
facades.Orm().Query().here("naam = ?", "tom").Order("sorteer asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sorteer asc,id desc;

facades. rm().Query().Where("naam = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sorteer;

facades.Orm().Query().Where("naam = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sorteer afmeting;

facades.Orm().Query().Where("naam = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sorteer af;

facades.Orm().Query(). here("naam = ?", "tom").InWillekeurige omOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Pagineren

```go
gebruikers []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &gebruikers, &total)
// SELECT count(*) FROM `users`;
// SELECT * VROM `users` LIMIT 10;
```

### Query enkele kolom

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("leeftijd", &ages)
// SELECT `age` VROM `users`;
```

### Specificeer Tafelzoekopdracht

Als u een aantal totale gegevens wilt opvragen, moet u een specifieke tabel opgeven.

Geef een model op

```go
aantal var int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Tabel opgeven

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // krijgen alle records verwijderd of niet
```

### Get SQL

Download SQL met placeholder:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * VROM "users" WHERE "id" = $1 EN "users"."deleted_at" IS NULL
```

Krijg SQL met waarde:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * VROM "users" WHERE "id" = 1 AND "users"."deleted_at" IS NULL
```

De methoden kunnen opgeroepen worden na `ToSql` en `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Tel

```go
var tel int64
facades.Orm().Query().Table("users").Waar ("naam = ?", "tom").Count(&count)
// SELECT count(*) VROM `users` WHERE name = 'tom';
```

### Specificeer Velden

'Select' kunt u opgeven welke velden uit de database moeten worden opgehaald, standaard worden alle velden opgehaald.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `naam`,`,`age` FROM `users`;
```

### Groepeer op & hebben

```go
type resultaat {
  Name string
  Total int
}

var Resultaat
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("naam = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Deelnemen

```go
type Resultaat bouwt {
  Name string
  Email string
}

var Resultaat
facades.Orm().Query().Model(&models.User{}).Select("gebruikers. ame, emails.emails.email").Join("links toetreden e-mails op emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Aanmaken

```go
gebruiker := models.User{Name: "tom", Age: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT INSERT INTO users (name, age, created_at, updated_at) VALUES ("te", 18, "2022-09-27 22:00:00", "2022-09-27 22:00");

// Niet trigger model gebeurtenissen
err := facades. rm().Query().Table("gebruikers").Create(map[string]any{
  "name": "Goravel",
})

// Trigger model events
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### Meerdere creaties

```go
gebruikers := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
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

> `created_at` en `updated_at` zullen automatisch gevuld worden.

### Cursor

Kan worden gebruikt om het geheugengebruik van uw applicatie aanzienlijk te verminderen bij het herhalen via tienduizenden
Eloquent modelrecords. Note, the `Cursor` method can be used with `With` at the same time, please
use [Lazy Eager Loading](./relationships#lazy-eager-loading) to load relationship in the `for` logic.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for row := range cursor {
  var models. ser
  als err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### Model opslaan

#### Bestaande model bijwerken

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Kolommen bijwerken

```go
facades.Orm().Query().Model(&models.User{}).Waar("naam", "tom").Update("naam", "hallo")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query()Model(&models.User{}).Where(""tom."."Updatemodelsmodel). ser{Name: "hallo", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hallo", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 :07:06.489',`name',`='hello',`=18 ERE WHE `= 'tom;
```

> Tijdens het bijwerken van `struct`, zal Orm alleen niet-nul velden updaten. Je wilt `map` misschien gebruiken om kenmerken bij te werken of
> `Select` te gebruiken om velden op te geven om te updaten. Note that `struct` can only be `Model`, if you want to update with non
> `Model`, you need to use `.Table("users")`, however, the `updated_at` field cannot be updated automatically at this
> time.

#### Bijwerken of aanmaken

Query by `name`, indien niet aanwezig, create by `name`, `avatar`, if exist update `avatar` based `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users`.`name` = 'name' AND `users`.`deleted_at` IS NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL EN `id` = 1;
```

### Verwijderen

Verwijder volgens model, het aantal rijen beïnvloed door de instructie wordt geretourneerd door de methode:

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). Hier ("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE VROM `users` WHERE = 1;

num := res.RowsAffected
```

Meerdere verwijderen

```go
facades.Orm().Query().Waar("naam = ?", "tom").Delete(&models.User{})
// VERLETE FROM `users` WHERE naam = 'tom';
```

Een soft-delete data geforceerd verwijderen.

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("naam", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete()
```

U kunt records verwijderen met modelkoppelingen via `Select`:

```go
// Delete Account of user when deleting user
facades.Orm().Query().Select("Account").Delete(&user)

// Delete Orders and CreditCards of user when deleting user
facades.Orm().Query().Select("Orders", "CreditCards").Delete(&user)

// Delete all child associations of user when deleting user
facades.Orm().Query().Select(orm.Associations).Delete(&user)

// Delete all Account of users when deleting users
facades.Orm().Query().Select("Account").Delete(&users)
```

Opmerking: De associaties worden alleen verwijderd als de primaire sleutel van het record niet leeg is, en Orm gebruikt deze primaire
sleutels als voorwaarden om bijbehorende records te verwijderen:

```go
// Verwijder gebruiker die naam='goravel', maar verwijder de account van gebruiker
facades.Orm().Query().Select("Account").Where("naam = ?", "goravel"). elet(&models.User{})

// Verwijder gebruiker die naam='goravel' en id = 1, en verwijder de account van gebruiker
facades. rm().Query().Select("Account").Where("naam = ?", "goravel").Delete(&models.User{ID: 1})

// Verwijder gebruiker die id = 1 en verwijder de account van die gebruiker
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1} ) )
```

Als het uitvoeren van batch verwijderen zonder voorwaarden doet ORM dat niet en geeft een fout terug. Zodat je een aantal
voorwaarden moet toevoegen, of standaard SQL moet gebruiken.

### Query zaft gegevens verwijderen

```go
gebruikersmodellen. Gebruiker
facades.Orm().Query().WithTrashed().First(&user)
```

### Filter herhaling

```go
gebruikers []modellen.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### Chauffeur ophalen

```go
driver := facades.Orm().Query().Driver()

// Rechter driver
if driver == orm.DriverMysql {}
```

### Native SQL uitvoeren

```go
type resultaat bouwt {
  ID int
  namenstring
  Leeftijd
}

var result Resultaat
facades. rm().Query().Raw("SELECT id, naam, leeftijd VAN gebruikers WHERE name = ?", "tom").Scan(&resultaat)
```

### Native update SQL uitvoeren

Het aantal rijen beïnvloed door de bewering wordt geretourneerd door de methode:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE gebruikers")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Bestaat

```go
var bestaat bool
facades.Orm().Query().Model(&models.User{}).Where("naam", "tom").Exists(&exists)
```

### Herstellen

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transactie

U kunt een transactie uitvoeren door de functie 'Transactie'.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/framework/facades"

  "goravel/app/models"
)

. .

geeft facades.Orm().Transaction(func(tx orm.Query) fout {
  var user models.User

  return tx.Find(&user, user.ID)
})
```

Je kunt ook zelf de stroom van de transactie handmatig controleren:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Toepassingsgebieden

Maakt het mogelijk om veelgebruikte zoekopdrachten te specificeren waarnaar verwezen kan worden wanneer methode wordt aangeroepen.

```go
func Paginator(page string, limit string) functie(methods orm.Query) orm. uery {
  return functie(query orm.Query) orm.Query {
    page, _ := strconv. toi(pagina)
    limiet, _ := strconv. toi(limit)
    offset := (pagina - 1) * limiet

    retourneert query. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator is een aangepaste functie: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit).Find(&entries)
```

### Ruwe expressies

Je kunt de `db.Raw` methode gebruiken om de velden bij te werken:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("leeftijd - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Pessimistische vergrendeling

De query builder bevat ook een paar functies om u te helpen "pessimistische vergrendeling" te bereiken bij het uitvoeren van uw `select`
verklaringen.

Om een statement uit te voeren met een "gedeeld slot" , kan je de "SharedLock" methode noemen. Een gedeelde vergrendeling voorkomt dat de geselecteerde
rijen worden gewijzigd tot uw transactie is vastgelegd:

```go
gebruikers []modellen.User
facades.Orm().Query().here("stemmen", ">", 100).SharedLock().Get(&users)
```

U kunt ook de `LockForUpdate` methode gebruiken. Een "for update" lock voorkomt dat de geselecteerde records worden gewijzigd
of worden geselecteerd met een andere gedeelde lock:

```go
gebruikers []modellen.User
facades.Orm().Query().here("stemmen", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
var som int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Evenementen

Orm modellen versturen verschillende evenementen zodat je op de volgende momenten in de levenscyclus van een model kunt klikken: `Retrieved`,
`Creating`, `Gemaakt`, `Updating`, `Updated`, `Saving`, `Saved`, `Verwijderen`, `Verwijderen`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

Het `Retrieved` evenement zal verzonden worden wanneer een bestaand model wordt opgehaald uit de database. Wanneer een nieuw model wordt opgeslagen voor
de eerste keer, zullen de `Creating` en `Created` events verzenden. De `Updating` / `Updated` evenementen zullen verzonden worden wanneer
een bestaand model wordt gewijzigd en de `Opslaan` methode wordt aangeroepen. De `Saving` / `Saved` events zullen verzonden worden wanneer een model
wordt aangemaakt of bijgewerkt - zelfs als de attributen van het model niet zijn gewijzigd. Event names ending with `-ing` are
dispatched before any changes to the model are persisted, while events ending with `-ed` are dispatched after the
changes to the model are persisted.

Om te beginnen met het luisteren naar modelgebeurtenissen, definieer een `DispatchesEvents` methode op uw model. Deze eigenschap brengt verschillende punten in kaart
van de levenscyclus van het model naar je eigen event klassen.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type gebruiker struct {
 orm. odel
 tekenreeks
}

func (u *User) DispatchesEvents() kaart[contractsorm.EventType]func(contractsorm. vent) error {
 return map[contractsorm.EventType]functie (contractsorm.Event) error{
  contractsorm. ventCreëering: functie(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventAangemaakt: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.Event: functie(event contractsorm.Event) error {
   return nil
  },
  Contractsorm.EventUpdating: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.Event: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventDeleting: functie (event contractsorm.Event) fout {
   return nil
  },
  contractsorm. Toegevoegd: functie (event contractsorm.Event) fout {
   return nil
  },
  contractsorm.EventForceDeleting: func(event contractsorm.Event) fout {
   return nil
  },
  contractsorm. ventForceed: functie (event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRetrieve: functie(event contractsorm.Event) error {
   return nil
  },
  contractsorm. Gestort: functie(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestoring: functie(event contractsorm.Event) error {
   return nil
  },
 }
 } }
```

> Opmerking: registreer gewoon de afspraken die je nodig hebt. Model evenementen worden niet verzonden bij het uitvoeren van partijoperaties via Orm.

### Waarnemers

#### Observers definiëren

Als je naar veel gebeurtenissen op een bepaald model luistert, je kunt waarnemers gebruiken om al je luisteraars te groeperen in één
klas. Observer klassen hebben methode namen die de Eloquente evenementen weerspiegelen waarnaar u wilt luisteren. Elk van deze methoden
ontvangt het getroffen model als hun enige argument. Het `make:observer` commando van Artisan is de makkelijkste manier om een
nieuwe waarnemersklasse te maken:

```shell
uitvoeren . artisan make:observer UserObserver
ga uitvoeren. artisan make:observer user/UserObserver
```

Dit commando zal de nieuwe waarnemer plaatsen in je `app/waarnemer` map. Als deze map niet bestaat, zal Artisan
deze voor jou aanmaken. Je nieuwe waarnemer zal er als volgt uitzien:

```go
package observers

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Gemaakt (event of m. vent) error {
 return nil
}

func (u *UserObserver) Updated (event orm.Event) error {
 return nil
}

func (u *UserObserver) Verwijderd (event orm. vent) fout {
 return nil
}

func (u *UserObserver) Verwijderd (event orm.Event) fout {
 return nil
}
```

De template waarnemer bevat slechts enkele evenementen, u kunt volgens uw wensen andere evenementen toevoegen.

Om een waarnemer te registreren moet je de `Observe` methode aanroepen op het model dat je wilt waarnemen. Je kunt
waarnemers registreren in de `Boot` methode van je applicatie `app/providers/event_service_provider.go::Boot` service provider:

```go
pakketproviders

importeren (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

type EventServiceProvider struct {
}

func (ontvanger *EventServiceProvider) Register(app foundation. pplicatie{
 facades.Event().Register(ontvanger. isten())
}

func (ontvanger *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

func (ontvanger *EventServiceProvider) listen() kaart[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Opmerking: als u `DispatchesEvents` en `Observer` op hetzelfde moment instelt, zal alleen `DispatchesEvents` worden toegepast.

#### Parameter in Observer

De `event` parameter zal worden doorgegeven aan alle waarnemers:

| Methode      | actie                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Context      | Krijg de context die doorgegeven wordt door `facades.Orm().WithContext()`                                                        |
| GetAttribuut | Verkrijg de aangepaste waarde, indien niet gewijzigd, krijg de originele waarde, als er geen originele waarde is, retourneer nil |
| GetOrigineel | De originele waarde, als er geen originele waarde is, retourneer nil                                                             |
| Gezellig     | Bepaal of het veld is gewijzigd                                                                                                  |
| IsClean      | IsDirty omgekeerd                                                                                                                |
| Zoekopdracht | Krijg een nieuwe Query, die kan worden gebruikt met een transactie                                                               |
| SetAttribute | Stel een nieuwe waarde in voor een veld                                                                                          |

### Dempende Events

Het kan zijn dat je alle evenementen die door een model zijn afgevuurd tijdelijk "mute" moet dekken. Je kunt dit bereiken met de
`WithoutEvents` methode:

```go
var user models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Opslaan van een enkel model zonder gebeurtenissen

Soms kun je een bepaald model "opslaan" zonder een gebeurtenis te verzenden. U kunt dit bereiken met de
`SaveQuietly` methode:

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
