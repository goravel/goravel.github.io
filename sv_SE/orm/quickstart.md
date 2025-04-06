# Kom igång

Goravel gör det enkelt för utvecklare att interagera med databaser med hjälp av `facades.Orm()`. För närvarande ger det officiellt
stöd för följande fyra databaser:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Innan du startar konfigurerar du databasen i `.env` och bekräftar `default` -konfigurationen i `config/database.go`.

# Konfiguration

För att konfigurera databaser, navigera till `config/database.go`. Det är här du kan anpassa alla databasanslutningar och
välj en `default`-anslutning. Konfigurationen i denna fil bygger på projektets miljövariabler och
visar upp olika databaskonfigurationer som Goravel stöder.

### DSN

Du kan också använda DSN för att ansluta till databasen direkt, bara konfigurera `dsn`-fältet i konfigurationsfilen:

```go
"postgres": karta[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Läs och skriv anslutningar

Ibland kanske du vill använda en databasanslutning för `SELECT`-satser, och en annan för `INSERT`, `UPDATE`, och
`DELETE`-satser. Goravel gör detta till en vind.

För att se hur läs-/skriv-anslutningar ska konfigureras, titta på detta exempel:

```go
importera "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": karta[string]any{
  "mysql": karta[string]any{
    "driver": "mysql",
    "read": []databas. onfig{
      {Host: "192.168.1. ", Port: 3306, Databas: "forge", Användarnamn: "root", Lösenord: "123123"},
    },
    "skriv": []databas. onfig{
      {Host: "192.168.1. ", Port: 3306, Databas: "forge", Användarnamn: "root", Lösenord: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "användarnamn": config.Env("DB_USERNAME", ""),
    "lösenord": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Vi har uppdaterat konfigurationsmatrisen med två nya nycklar - `read` och `write`. `read`-anslutningen kommer att använda
`192.168.1.1` som värd, medan `write`-anslutningen kommer att använda `192.168.1.2`. Båda anslutningarna kommer att dela samma
databas prefix, teckenuppsättning, och andra alternativ som anges i den huvudsakliga mysql array. Vid multipla värden i
`host`-konfigurationsmatrisen, kommer en databasvärd att väljas slumpmässigt för varje begäran.

### Anslutning frågebank

Du kan konfigurera en anslutningspool i konfigurationsfilen, rimlig konfiguration av anslutningspoolparametrar
kan avsevärt förbättra prestanda för samvaluta:

| Nyckel                                                                           | Åtgärd                          |
| -------------------------------------------------------------------------------- | ------------------------------- |
| pool.max_idle_conns    | Max antal inaktiva anslutningar |
| pool.max_öppning                            | Max öppna anslutningar          |
| pool.conn_max_idletime | Anslutningar max inaktiv tid    |
| pool.Anslutningstid                                              | Anslutningar max livslängd      |

### Schema

Postgres och Sqlserver stöder konfigurering av Schema. Postgres kan direkt ställa in Schema i konfigurationsfilen, medan
Sqlserver måste ange Schema genom `TableName`-metoden i modellen.

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
func (r *användare) tabellName() sträng {
  returnera "goravel.users"
}
```

### Hämta databasinformation

Du kan använda kommandot `db:show` för att visa alla tabeller i databasen.

```bash
gå kör. hantverkare db:show
```

Du kan också använda kommandot `db:table` för att visa strukturen för en specifik tabell.

```bash
gå kör. hantverkare db:table
gå kör. hantverkare db:table användare
```

## Modell Definition

För att skapa en anpassad modell, se modellfilen `app/models/user.go` som ingår i ramverket. `struct`
i `app/models/user.go` innehåller två inbäddade ramverk: `orm.Model` och `orm.SoftDeletes`. Dessa ramverk definierar
`id`, `created_at`, `updated_at` respektive `deleted_at`-egenskaper. Med `orm.SoftDeletes` kan du aktivera mjuk
radering för modellen.

### Modell konvention

1. Modellen heter med en stor knöl;
2. Använd pluralformen av modellen "ormnamn" som bordsnamn;

Till exempel är modellnamnet `UserOrder`, och tabellnamnet är `user_orders`.

### Skapa modell

Använd kommandot `make:model` för att skapa en modell:

```shell
gå kör. hantverkare make:model User
gå kör. hantverkare make:modell användare/användare
```

Skapad modellfil finns i `app/models/user.go`-filen, innehållet är enligt följande:

```go
paketmodeller

import (
  "github.com/goravel/framework/database/orm"
)

typ User struct {
  orm. odel
  Namnsträng
  Avatar sträng
  orm.SoftDeletes
}
```

Om du vill ställa in modellfältet till `any`, måste du lägga till ytterligare en Tag: `gorm:"type:text"`:

```go
typ User struct {
  orm.Model
  Namnsträng
  Avatar sträng
  Detalj alla `gorm:"type:text"`
  orm.SoftDeletes
}
```

Mer information om tagganvändning hittar du på: <https://gorm.io/docs/models.html>.

### Ange tabellnamn

```go
paketmodeller

import (
  "github.com/goravel/framework/database/orm"
)

typ User struct {
  orm. odel
  Namnsträng
  Avatar sträng
  orm. oftTar bort
}

func (r *användare) tabellName() sträng {
  returnera "goravel_user"
}
```

### Databasanslutningar

Som standard använder alla modeller standardanslutningen som är konfigurerad för din applikation. Om du vill ange en
distinkt anslutning som ska användas när du interagerar med en viss modell, du måste definiera en `Connection`-metod på
-modellen.

```go
paketmodeller

import (
  "github.com/goravel/framework/database/orm"
)

typ User struct {
  orm. odel
  Namnsträng
  Avatar sträng
  orm. oftTar bort
}

func (r *User) Connection() sträng {
  returnera "postgres"
}
```

## facades.Orm() tillgängliga funktioner

| Namn        | Åtgärd                                                                                 |
| ----------- | -------------------------------------------------------------------------------------- |
| Anslutning  | [Ange Databasanslutning](#specify-database-connection)                                 |
| DB          | [Allmänt databasgränssnitt sql.DB](#generic-database-interface-sql-db) |
| Fråga       | [Hämta databasinstans](#get-database-instance)                                         |
| Transaktion | [Transaction](#transaction)                                                            |
| Medkontext  | [Inject Context](#inject-context)                                                      |

## facades.Orm().Query() tillgängliga funktioner

| Funktioner            | Åtgärd                                                                       |
| --------------------- | ---------------------------------------------------------------------------- |
| Börja                 | [Börja transaktionen](#transaction)                                          |
| Inlämning             | [Commit Transaction](#transaction)                                           |
| Antal                 | [Count](#count)                                                              |
| Skapa                 | [Create](#create)                                                            |
| Cursor                | [Cursor](#cursor)                                                            |
| Radera                | [Delete](#delete)                                                            |
| Unik                  | [Filter Repetition](#filter-repetition)                                      |
| Förare                | [Get Driver](#get-driver)                                                    |
| Exec                  | [Utför infödd uppdatering SQL](#execute-native-update-sql)                   |
| Finns                 | [Exists](#exists)                                                            |
| Sök                   | [Fråga en eller flera rader med ID](#query-one-or-multiple-lines-by-id)      |
| FindOrMisslyckades    | [Hittade inte returfel](#not-found-return-error)                             |
| Första                | [Fråga en rad](#query-one-line)                                              |
| FörstaEller           | [Fråga eller returnera data via callback](#query-one-line)                   |
| FirstOrCreate         | [Hämtar eller skapar modeller](#retrieving-or-creating-models)               |
| FirstOrNew            | [Hämtar eller nya modeller](#retrieving-or-creating-models)                  |
| Första OrMisslyckades | [Hittade inte fel](#not-found-error)                                         |
| TvingaTa bort         | [Tvinga rader](#delete)                                                      |
| Hämta                 | [Fråga flera rader](#query-multiple-lines)                                   |
| Grupp                 | [Group](#group-by--having)                                                   |
| Har                   | [Having](#group-by-having)                                                   |
| Gå med                | [Join](#join)                                                                |
| Gräns                 | [Limit](#limit)                                                              |
| LockForUpdate         | [Pessimistisk låsning](#pessimistic-locking)                                 |
| Modell                | [Ange en modell](#specify-table-query)                                       |
| Förskjutning          | [Offset](#offset)                                                            |
| Beställning           | [Order](#order)                                                              |
| Beställning av        | [Order](#order)                                                              |
| OrderByDesc           | [Order](#order)                                                              |
| Slumpmässig ordning   | [Order](#order)                                                              |
| EllerVar              | [OrWhere](#where)                                                            |
| OrWhereNotIn          | [OrWhereNotIn](#where)                                                       |
| OrWhereNull           | [OrWhereNull](#where)                                                        |
| OrWhereIn             | [OrWhereIn](#where)                                                          |
| Sidnr                 | [Paginate](#paginate)                                                        |
| Pluck                 | [Query single column](#query-single-column)                                  |
| Rå                    | [Utför infödda SQL](#execute-native-sql)                                     |
| Återställ             | [Restore](#restore)                                                          |
| Rollback              | [Återupptagningstransaktion](#transaction)                                   |
| Spara                 | [Uppdatera en befintlig modell](#update-a-existing-model)                    |
| SaveQuietly           | [Spara en enda modell utan händelser](#saving-a-single-model-without-events) |
| Skanna                | [Skanna struktur](#execute-native-sql)                                       |
| Omfattningar          | [Scopes](#scopes)                                                            |
| Välj                  | [Ange fält](#specify-fields)                                                 |
| SharedLock            | [Pessimistisk låsning](#pessimistic-locking)                                 |
| Sum                   | [Sum](#sum)                                                                  |
| Tabell                | [Ange en tabell](#specify-table-query)                                       |
| ToSql                 | [Get SQL](#get-sql)                                                          |
| ToRawSql              | [Get SQL](#get-sql)                                                          |
| Uppdatera             | [Uppdatera en enda kolumn](#update-a-single-column)                          |
| UpdateOrCreate        | [Uppdatera eller skapa](#update-or-create)                                   |
| Var                   | [Where](#where)                                                              |
| Mellan                | [WhereBetween](#where)                                                       |
| Varmellanrum          | [WhereNotBetween](#where)                                                    |
| WhereNotIn            | [WhereNotIn](#where)                                                         |
| Varmt                 | [WhereNull](#where)                                                          |
| Vari                  | [WhereIn](#where)                                                            |
| UtomHändelser         | [Muting events](#muting-events)                                              |
| Medkastad             | [Query soft delete data](#query-soft-delete-data)                            |

## Frågebyggare

### Injektionskontext

```go
fasader.Orm().WithContext(ctx)
```

### Ange databasanslutning

Om flera databasanslutningar definieras i `config/database.go`, kan du använda dem genom `Connection`-funktionen
av `facades.Orm()`. Anslutningsnamnet som skickades till `Connection` ska vara en av de anslutningar som konfigurerats i
`config/database.go`:

```go
fasader.Orm().Anslutning ("mysql")
```

### Generisk databasgränssnitt sql.DB

Generiskt databasgränssnitt sql.DB, sedan använda den funktionalitet som den erbjuder:

```go
db, err := fasades.Orm().DB()
db, err := fasades.Orm().Anslutning("mysql").DB()

// Ping
db.Ping()

// Stäng
db. lose()

// Returnerar databasstatistik
db.Stats()

// SetMaxIdleConns sätter det maximala antalet anslutningar i inaktiv anslutningspool
db. etMaxIdleConns(10)

// SetMaxOpenConns sätter det maximala antalet öppna anslutningar till databasen
db. etMaxOpenConns(100)

// SetConnMaxLivstids anger den maximala tiden en anslutning kan återanvändas
db.SetConnMaxLifetime(time.Time)
```

### Hämta databas instans

Innan varje specifik databas drift, är det nödvändigt att få en instans av databasen.

```go
facades.Orm().Query()
fasades.Orm().Anslutning("mysql").Query()
fasades.Orm().WithContext(ctx).Query()
```

### Välj

#### Fråga en rad

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FRÅN `users` ORDER BY `users`.`id` LIMIT 1;
```

Ibland kan du vilja utföra någon annan åtgärd om inga resultat hittas. `FirstOr`-metoden kommer att returnera en enda
modellinstans eller, om inga resultat hittas, exekvera den givna stängningen. Du kan ställa in värden till modell i förslutning:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Fråga en eller flera rader efter ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// VÄLJ * FRÅN `users` WHERE `users`.`id` = 1;

var användare []models. ser
fasader.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FRÅN `users` WHERE `users`.`id` i (1,2,3);
```

#### Kunde inte hitta returfel

```go
var användarmodeller.Användare
err := fasader.Orm().Query().FindOrFail(&user, 1)
```

#### När den primära nyckeln för användartabellen är `string`-typ, måste du ange den primära nyckeln när du ringer

`Find` metod

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// VÄLJ * FRÅN `users` WHERE `users`.`uuid` = "a";
```

#### Fråga flera rader

```go
var users []models.User
facades.Orm().Query().Var("id i ?", []int{1,2,3}).Get(&användare)
// VÄLJ * FRÅN `users` VAR id i (1,2,3);
```

#### Hämtar eller skapar modeller

Metoden `FirstOrCreate` söker efter en databaspost med hjälp av de angivna kolumn/värdeparen. If the model cannot be
found in the database, it creates a new record with the attributes from merging the first argument with the optional
second argument.

På samma sätt försöker `FirstOrNew`-metoden också hitta ett register i databasen baserat på de attribut som anges. Men
om den inte hittas, returneras en ny instans av modellen. Det är viktigt att notera att denna nya modell inte har
sparats i databasen ännu och du måste manuellt anropa `Save`-metoden för att göra det.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// VÄLJ * FRÅN `users` WHERE `gender` = 1 AND `users`. namn` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VÄRDEN ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

fasader.Orm().Query().Var("genus", 1).FirstOrCreate(&user, modeller.User{Namn: "tom"}, modeller. ser{Avatar: "avatar"})
// VÄLJ * FRÅN `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

var användarmodeller. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// VÄLJ * FRÅN `users` WHERE `gender` = 1 AND `users`. namn` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Var("kön", 1).FirstOrNew(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// VÄLJ * FRÅN `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Hittade inte fel

När det begärda objektet inte hittas, genererar inte `First`-metoden ett fel. För att generera ett fel, använd
`FirstOrFail`-metoden:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Var

```go
facades.Orm().Query().Var("namn", "tom")
facades.Orm().Query().Var("namn = 'tom'")
facades.Orm().Query().Var("namn = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
fasader.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("namn", []any{"a"})
fasader. rm().Query().WhereNull("namn")
facades.Orm().Query().WhereIn("namn", []any{"a"})

facades.Orm().Query().OrWhere("namn = ?", "tom")
facades.Orm().Query().OrWhereNotIn("namn", []any{"a"})
facades.Orm().Query().OrWhereNull("namn")
facades.Orm().Query().OrWhereIn("namn", []any{"a"})
```

### Gräns

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// VÄLJ * FRÅN `users` WHERE name = 'tom' LIMIT 3;
```

### Förskjutning

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FRÅN `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Beställning

```go
var users []models.User
facades.Orm().Query().Var("namn = ?", "tom").Order("sortera asc").Order("id desc"). et(&users)
// SELECT * FRÅN `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

fasader. rm().Query().Var("namn = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FRÅN `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Var("namn = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FRÅN `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where("namn = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FRÅN `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). här("namn = ?", "tom").InRandomOrder().Get(&användare)
// SELECT * FRÅN `users` WHERE name = 'tom' ORDER BY RAND();
```

### Sidnr

```go
var användare []modeller.Användare
var totalt int64
fasader.Orm().Query(). aginate(1, 10, &users, &totalt)
// SELECT count(*) FRÅN `users`;
// SELECT * FRÅN `users` LIMIT 10;
```

### Fråga en enda kolumn

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Ange tabellfråga

Om du vill fråga några aggregatdata måste du ange en specifik tabell.

Ange en modell

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FRÅN `users` WHERE deleted_at IS NULL;
```

Ange en tabell

```go
var count int
facades.Orm().Query().Table("användare").Count(&count)
// SELECT count(*) FRÅN `users`; // få alla poster, oavsett om de tas bort eller inte
```

### Get SQL

Skaffa SQL med platshållare:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// VÄLJ * FRÅN "användare" VAR "id" = $1 OCH "användare"."deleted_at" ÄR NULL
```

Få SQL med värde:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// VÄLJ * FRÅN "användare" VAR "id" = 1 OCH "användare"."deleted_at" ÄR NULL
```

Metoderna kan anropas efter `ToSql` och` ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Antal

```go
var count int64
facades.Orm().Query().Tabell("användare").Var("namn = ?", "tom").Count(&count)
// SELECT count(*) FRÅN `users` WHERE name = 'tom';
```

### Ange fält

`Select` låter dig ange vilka fält som ska hämtas från databasen, som standard hämtar ORM alla fält.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Gruppera på & ha

```go
typ Resultat struct {
  Namn sträng
  Total int
}

var resultat
fasader.Orm().Query().Model(&models.User{}). välj ("namn, summa(ålder) som totalt").Grupp("namn").Having("namn = ?", "tom").Get(&result)
// SELECT namn, summa(ålder) som total FRÅN `användare` GROUP BY `name` HAVING name = "tom";
```

### Gå med

```go
typ Resultat struct {
  Namn sträng
  E-post sträng
}

var resultat Resultat
fasader.Orm().Query().Model(&models.User{}).Select("användare. ame, emails.email").Gå med("lämnade gå med e-post på emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FRÅN `användare` VÄNSTER GÅ MED e-post ON emails.user_id = users.id;
```

### Skapa

```go
användare := modeller.Användare{Namn: "tom", Ålder: 18}
err := fasader.Orm().Query(). reate(&user)
// INSERT INTO-användare (namn, ålder, created_at, updated_at) VÄRDEN ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// Utlösa inte modellhändelser
err := fasader. rm().Query().Tabell("användare").Create(karta[string]any{
  "name": "Goravel",
})

// Utlösare modellhändelser
err := fasader. rm().Query().Model(&models.User{}).Create(karta[string]any{
  "name": "Goravel",
})
```

### Skapa flera

```go
användare := []models.User{{Name: "tom", Age: 18}, {Name: "tim", Age: 19}}
err := facades.Orm().Query().Create(&users)

err := facades.Orm().Query().Table("användare"). reate(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})

err := facades.Orm(). uery().Model(&models.User{}).Create(&[]map[string]any{
  {"name": "Goravel"},
  {"name": "Framework"},
})
```

> `created_at` och `updated_at` kommer att fyllas automatiskt.

### Cursor

Kan användas för att avsevärt minska din applikations minnesförbrukning när du itererar genom tiotusentals
Eloquent modellposter. Notera, `Cursor`-metoden kan användas med `With` samtidigt, vänligen
använd [Lazy Eager Loading](./relationships#lazy-eager-loading) för att ladda relationen i `for`-logiken.

```go
markör, err := fasades.Orm().Query().Model(models.User{}).Cursor()
if err != nil {
  return err
}
for rad := range cursor {
  var user models. ser
  om err := rad.Scan(&användare); err != nil {
    return err
  }
  fmt.Println(användare)
}
```

### Spara Modell

#### Uppdatera en befintlig modell

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
fasader.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Uppdatera kolumner

```go
facades.Orm().Query().Model(&models.User{}).Var("namn", "tom").Update("namn", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Var("namn", "tom").Update(modeller. ser{Name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Var("namn", "tom").Update(karta[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> Vid uppdatering med `struct`, kommer Orm endast uppdatera icke-nollfält. Du kanske vill använda `map` för att uppdatera attribut eller
> använd `Select` för att ange fält att uppdatera. Note that `struct` can only be `Model`, if you want to update with non
> `Model`, you need to use `.Table("users")`, however, the `updated_at` field cannot be updated automatically at this
> time.

#### Uppdatera eller skapa

Fråga efter `name`, om det inte finns, skapa efter `name`, `avatar`, om det finns, uppdatera `avatar` baserat på `name`:

```go
facades.Orm().Query().UpdateOrCreate(&användare, modeller.User{Name: "name"}, models.User{Avatar: "avatar"})
// VÄLJ * FRÅN `users` WHERE `users`.`name` = "name" AND `users`.`deleted_at` IS NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VÄRDER ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' VAR användare`.`deleted_at` ÄR NULL OCH `id` = 1;
```

### Radera

Ta bort efter modell, antalet rader som påverkas av uttalandet returneras med metoden:

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Radera (&user)
res, err := facades.Orm().Query().Model(&models.User{}). här("id", 1).Radera ()
res, err := facades.Orm().Query().Tabell("användare").Var("id", 1).Radera ()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsPåverkas
```

Flera ta bort

```go
facades.Orm().Query().Var("namn = ?", "tom").Ta bort (&models.User{})
// DELETE FRÅN `users` WHERE name = 'tom';
```

Vill tvinga bort en soft-delete data.

```go
facades.Orm().Query().Var("namn", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Var("namn", "tom").ForceDelete()
facades.Orm().Query().Table("användare").Var("namn", "tom").ForceDelete()
```

Du kan ta bort poster med modellassociationer via `Select`:

```go
// Ta bort användarkonto när användaren tas bort
facades.Orm().Query().Select("Konto").Ta bort (&användare)

// Ta bort beställningar och kreditkortKort av användaren när användaren tas bort
fasader.Orm().Query().Select("Order", "Kreditkort"). elete(&user)

// Ta bort alla underordnade associationer av användare när du tar bort användare
fasader.Orm().Query().Select(orm.Associations). elete(&användare)

// Ta bort alla användare när användare tas bort
fasader.Orm().Query().Select("Konto").Ta bort (&användare)
```

Obs: Kopplingarna kommer endast att tas bort om den primära nyckeln till posten inte är tom, och Orm använder dessa primära
nycklar som villkor för att ta bort associerade poster:

```go
// Ta bort användare som namn='goravel', men ta inte bort konto för användare
fasader.Orm().Query().Select("Konto").Var("namn = ?", "goravel"). elete(&models.User{})

// Ta bort användare som namn='goravel' och id = 1, och ta bort konto för användare
fasader. rm().Query().Select("Konto").Var("namn = ?", "goravel").Ta bort (&modeller.Användare{ID: 1})

// Ta bort användare som id = 1 och ta bort konto för den användaren
fasader.Orm().Query().Select("Konto").Ta bort (&modeller.Användare{ID: 1})
```

Om köra batch ta bort utan några villkor, ORM inte gör det och returnerar ett fel. Så du måste lägga till några
villkor, eller använda infödda SQL.

### Query Soft Delete Data

```go
var användarmodeller.Användare
fasader.Orm().Query().WithTrashed().First(&user)
```

### Filtrera upprepning

```go
var users []models.User
facades.Orm().Query().Distinct("namn").Find(&användare)
```

### Hämta förare

```go
driver := facades.Orm().Query().Driver()

// Domare driver
om drivrutin == orm.DriverMysql {}
```

### Utför Native SQL

```go
typ Resultat struct {
  ID int
  Namnsträng
  Age int
}

var resultat Resultat
fasader. rm().Query().Raw("VÄLJ ID, namn, ålder FRÅN användare WHERE name = ?", "tom").Scan(&result)
```

### Utför Native Update SQL

Antalet rader som påverkas av uttalandet returneras med metoden:

```go
res, err := fasader.Orm().Query().Exec("DROP TABLE användare")
// DROP TABLE `users`;

num := res.RowsPåverkad
```

### Finns

```go
var exists bool
facades.Orm().Query().Model(&models.User{}).Var("namn", "tom").Exister(&existerar)
```

### Återställ

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
fasader.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transaktion

Du kan utföra en transaktion med `Transaction`-funktionen.

```go
import (
  "github.com/goravel/framework/contracts/database/orm"
  "github.com/goravel/frameing/facades"

  "goravel/app/models"
)

. .

returnera fasader.Orm().Transaktion (func(tx orm.Query) error {
  var användarmodeller.Användare

  returnera tx.Find(&användare, user.ID)
})
```

Du kan också manuellt styra flödet av transaktionen själv:

```go
tx, err := fasades.Orm().Query().Begin()
användare := modeller.Användarnamn{Namn: "Goravel"}
om err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Omfattningar

Låter dig ange vanliga frågor som kan refereras när metoden kallas.

```go
func Paginator(sidsträng, begränsningssträng) funktion (metoder orm.Query) orm. uery {
  retur funktion (fråga orm.Query) orm.Query {
    sida, _ := strconv. toi(sida)
    gräns, _ := strconv. toi(limit)
    offset := (sida - 1) * gräns

    returförfrågan. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator är en anpassad funktion: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### Rå uttryck

Du kan använda `db.Raw`-metoden för att uppdatera fält:

```go
importera "github.com/goravel/frameing/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` är NULL AND `id` = 1;
```

### Pessimistisk låsning

Frågebyggaren innehåller också några funktioner som hjälper dig att uppnå "pessimistisk låsning" när du utför dina `select`
satser.

För att utföra ett uttalande med ett "delat lås" kan du anropa `SharedLock`-metoden. Ett delat lås hindrar de valda
raderna från att ändras tills din transaktion har lämnats in:

```go
var users []models.User
facades.Orm().Query().Where("votes", ">", 100).SharedLock().Get(&users)
```

Alternativt kan du använda `LockForUpdate`-metoden. A "for update" lock prevents the selected records from being
modified or from being selected with another shared lock:

```go
var users []models.User
facades.Orm().Query().Where("röster", ">", 100).LockForUpdate().Get(&användare)
```

### Sum

```go
var sum int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Händelser

Orm-modeller skickar flera händelser så att du kan ansluta dig till följande ögonblick i en modells livscykel: `Hämtad`,
`Creating`, `Skapad`, `Uppdaterande`, `Uppdaterad`, `Sparande`, `Sparad`, `Raderande`, `Raderat`, `ForceDeleting`, `ForceDeleted`,
`Återställande`, `Återställande`.

Händelsen `Hämtad` kommer att skickas när en befintlig modell hämtas från databasen. När en ny modell sparas för
första gången, kommer händelserna `Creating` och` Created` att skickas. Händelserna `Updating` / `Updated` kommer att skickas när
en befintlig modell ändras och metoden `Save` kallas. Händelserna `Saving` / `Saved` kommer att skickas när en modell
skapas eller uppdateras - även om modellens attribut inte har ändrats. Händelsenamn som slutar med `-ing` är
skickas innan några ändringar till modellen är kvar, medan händelser som slutar med `-ed` skickas efter
-ändringarna till modellen kvarstår.

För att börja lyssna på modellhändelser, definiera en `DispatchesEvents`-metod på din modell. Den här egenskapen kartlägger olika punkter
av modellens livscykel till dina egna evenemangsklasser.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
) Typ Användare struct {
 orm. odel
 Namnsträng
}

func (u *User) DispatchesEvents() karta[contractsorm.EventType]func(contractsorm. vent) fel {
 returkarta[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) fel {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) fel {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. vent) fel {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) fel {
   return nil
  },
  contractsorm. venteting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. venteted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceTa bort funktion(event contractsorm.Event) fel {
   return nil
  },
  contractsorm. ventForceDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventHämtat: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventRestored: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRestoring: func(event contractsorm.Event) error {
   return nil
  },
 }
}
```

> Obs: Registrera bara de händelser du behöver. Modellhändelser sänds inte ut vid batchoperationer genom Orm.

### Observatörer

#### Definierar observatörer

Om du lyssnar på många händelser på en viss modell, du kan använda observatörer för att gruppera alla dina lyssnare i en enda
klass. Observatörsklasser har metodnamn som speglar de Eloquent händelser du vill lyssna på. Var och en av dessa metoder
får den drabbade modellen som sitt enda argument. Kommandot `make:observer` Artisan är det enklaste sättet att skapa en
ny observatörsklass:

```shell
gå kör. hantverkare make:observatör UserObserver
gå köra. hantverkare make:observatör användare/UserObserver
```

Detta kommando kommer att placera den nya observatören i din `app/observers`-katalog. Om denna katalog inte finns kommer Artisan
att skapa den åt dig. Din färska observatör kommer att se ut så här:

```go
paketobservatörer

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

typ UserObserver struct{}

func (u *UserObserver) Skapad(event orm. vent) fel {
 return nil
}

func (u *UserObserver) uppdaterad(händelse orm.Event) fel {
 return nil
}

func (u *UserObserver) raderad(händelse orm. vent) fel {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) fel {
 return nil
}
```

Mallobservatören innehåller endast vissa händelser, du kan lägga till andra händelser enligt dina behov.

För att registrera en observatör måste du anropa `Observe`-metoden på den modell du vill observera. Du kan registrera
observatörer i `Boot`-metoden för din applikations `app/providers/event_serviceprovider.go::Boot` tjänsteleverantör:

```go
paketleverantörer

import (
 "github. om/goravel/frameing/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

typ EventServiceProvider struct {
}

func (receiver *EventServiceProvider) Register(app foundation. pplication) {
 fasader.Event().Register(mottagare. isten())
}

func (receiver *EventServiceLeverantör) Boot(app foundation.Application) {
 facades.Orm().Observera(models.User{}, &observatörer. serObserver{})
}

func (receiver *EventServiceProvider) listen() karta[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Obs: Om du anger `DispatchesEvents` och `Observer` samtidigt, kommer endast `DispatchesEvents` att tillämpas.

#### Parameter i Observer

`event`-parametern kommer att skickas till alla observatörer:

| Metod        | Åtgärd                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Kontext      | Få sammanhang som passerade av `facades.Orm().WithContext()`                                                                               |
| GetAttribut  | Hämta det modifierade värdet, om det inte ändras, hämta det ursprungliga värdet, om det inte finns något ursprungligt värde, returnera nil |
| GetOriginal  | Få det ursprungliga värdet, om det inte finns något ursprungligt värde, returnera nil                                                      |
| IsDirty      | Bestäm om fältet är ändrat                                                                                                                 |
| IsClean      | IsDirty omvänd                                                                                                                             |
| Fråga        | Få en ny fråga, som kan användas med transaktion                                                                                           |
| SetAttribute | Ange ett nytt värde för ett fält                                                                                                           |

### Muting händelser

Ibland kan du behöva tillfälligt "tysta" alla händelser som sparats av en modell. Du kan uppnå detta med hjälp av
`Utomhändertagande`-metoden:

```go
var användarmodeller.Användare
fasader.Orm().Query().UtanförHändelser().Sök(&användare, 1)
```

#### Spara en enda modell utan händelser

Ibland kanske du vill "spara" en given modell utan att skicka några händelser. Du kan åstadkomma detta med
`SaveQuietly`-metoden:

```go
var användarmodeller.Användare
err := fasader.Orm().Query().FindOrFail(&user, 1)
användare.Namn = "Goravel"
err := fasader.Orm().Query().SaveQuietly(&user)
```
