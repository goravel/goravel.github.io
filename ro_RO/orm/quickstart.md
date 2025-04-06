# Noțiuni de bază

Goravel facilitează interacțiunea dezvoltatorilor cu bazele de date folosind `facades.Orm()`. În prezent, oferă suport oficial
pentru următoarele patru baze de date:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- Server SQL 2017+

Înainte de a începe, configurați baza de date în `.env` și confirmați configurația `implicită` în `config/database.go`.

# Configurare

Pentru a configura bazele de date, navigați la `config/database.go`. Aici puteți personaliza toate conexiunile bazei de date și
alegeți o conexiune `implicit`. Configurația din acest fișier se bazează pe variabilele de mediu ale proiectului și
afișează diverse configurații ale bazei de date pe care Goravel le sprijină.

### DSN

Puteți, de asemenea, să folosiți DSN pentru a vă conecta direct la baza de date, doar configurați câmpul `dsn` în fișierul de configurare:

```go
"postgres": harta[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=dezactivare",
  ...
}
```

### Citește și Scrie Conexiuni

Uneori este posibil să doriţi să folosiţi o conexiune la baza de date pentru declaraţiile `SELECT`, iar alta pentru declaraţiile `INSERT`, `UPDATE`, şi
`DELETE`. Goravel o face o brizură.

Pentru a vedea cum ar trebui configurate conexiunile de citire/scriere, să ne uităm la acest exemplu:

```go
import "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]any{
  "mysql": harta[string]orice {
    "driver": "mysql",
    "citit": []bază de date. onfig{
      {Gazdă: "192.168.1. ", Port: 3306, Baza de date: "forge", nume de utilizator: "root", parola: "123123"},
    },
    "write": []bază de date. onfig{
      {Gazdă: "192.168.1. ", Port: 3306, Baza de date: "forge", nume de utilizator: "rădăcină", parolă: "123123"},
    },
    "gazdă": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "bază de date": config. nv("DB_DATABASE", "forge"),
    "nume de utilizator": config.Env("DB_USERNAME", ""),
    "parolă": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Am actualizat setarea de configurare cu două chei noi - `citește` și `write`. Conexiunea `citire` va folosi
`192.168.1.1` ca gazdă, în timp ce conexiunea `write` va folosi `192.168.1.2`. Ambele conexiuni vor partaja același prefix
pentru baza de date, setul de caractere și alte opțiuni specificate în arraia principală mysql. În cazul valorilor multiple din arraia de configurare
, o gazdă de baze de date va fi selectată aleatoriu pentru fiecare solicitare.

### Rezervă de conexiuni

Puteți configura un pool de conexiune în fișierul de configurare, configurarea rezonabilă a parametrilor pool de conexiune
poate îmbunătăți foarte mult performanța conmonedei:

| Cheie                                                                            | Acțiune                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------- |
| pool.max_idle_connect  | Maxim conexiuni inactive                     |
| pool.max_open_connect  | Maxim de conexiuni deschise                  |
| pool.conn_max_idletime | Timpul maxim de inactivitate al conexiunilor |
| pool.conn_max_lifetime | Conexiuni pe durata maximă de viață          |

### Schema

Postgres și suport Sqlserver pentru configurarea schemei. Postgres poate seta direct Schema în fișierul de configurare, în timp ce
Sqlserver trebuie să specifice Schema prin metoda `TableName` în model.

#### Postgres

```go
"connections": harta[string]any{
  "postgres": harta[string]any{
    "driver": "postgres",
    ...
    "schema": "goravel",
  },
}
```

#### Sqlserver

```go
șirul func (r *User) TableName() {
  return "goravel.users"
}
```

### Obține Informații Bază de Date

Puteți folosi comanda `db:show` pentru a vizualiza toate tabelele din baza de date.

```bash
mergi să rulezi . artizan db:show
```

Puteți folosi, de asemenea, comanda `db:table` pentru a vedea structura unui anumit tabel.

```bash
mergi să rulezi . artizan db:table
mergi . artizan db:table users
```

## Definiție model

Pentru a crea un model personalizat, consultaţi fişierul model `app/models/user.go` care este inclus în cadru. `struct`
în `app/models/user.go` conține două cadre încorporate: `orm.Model` și `orm.SoftDeletes`. Aceste cadre definesc proprietățile
`id`, `created_at`, `updated_at`, și, respectiv, `deleted_at`. Cu `orm.SoftDeletes`, puteți activa ștergerea soft
pentru model.

### Modelul de convenţie

1. Modelul este numit cu o cocoaşa mare;
2. Utilizați forma plurală a modelului "nume de șarpe" ca nume de tabel;

De exemplu, numele modelului este `UserOrder`, iar numele tabelului este `user_orders`.

### Creează model

Folosește comanda `make:model` pentru a crea un model:

```shell
mergi să rulezi . artizan:model Utilizator
mergi să rulezi . artizan make:model utilizator/utilizator
```

Fișierul model creat este localizat în fișierul `app/models/user.go`, conținutul este următorul:

```go
modelele de pachet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Șir de nume
  Șir de avatar
  orm.SoftDeletes
}
```

Dacă doriți să setați câmpul model la `any`, trebuie să adăugați o etichetă suplimentară: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Numele de șir
  Avatar șir
  Detaliu orice `gorm:"type:text"`
  orm.SoftDeletes
}
```

Mai multe detalii de utilizare tag-uri pot fi găsite la: <https://gorm.io/docs/models.html>.

### Specificați numele tabelei

```go
modelele de pachet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Șir de nume
  Șir de avatar
  orm. Șirul oftDeletes
}

func (r *User) TableName() {
  return "goravel_user"
}
```

### Conexiuni Baza de date

În mod implicit, toate modelele utilizează conexiunea implicită a bazei de date configurată pentru aplicația ta. Dacă doriți să specificați o conexiune
distinctă care să fie folosită atunci când interacționați cu un anumit model, trebuie să definiți o metodă `Connection` pe modelul
.

```go
modelele de pachet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Șir de nume
  Șir de avatar
  orm. Șirul de conexiuni oftDeletes
}

func (r *User) () {
  return "postgres"
}
```

## fațades.Orm() funcții disponibile

| Nume       | Acțiune                                                                                 |
| ---------- | --------------------------------------------------------------------------------------- |
| Conexiune  | [Specificați conexiunea bazei de date](#specify-database-connection)                    |
| PO         | [Generic Database Interface sql.DB](#generic-database-interface-sql-db) |
| Interogare | [Obține Instanța bazei de date](#get-database-instance)                                 |
| Tranzacție | [Transaction](#transaction)                                                             |
| Retragere  | [Injectare Context](#inject-context)                                                    |

## fațades.Orm().Query() funcții disponibile

| Funcții                   | Acțiune                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Începe                    | [Începe tranzacția](#transaction)                                                   |
| Comite                    | [Tranzacție comitet](#transaction)                                                  |
| Număr                     | [Count](#count)                                                                     |
| Crează                    | [Create](#create)                                                                   |
| Cursor                    | [Cursor](#cursor)                                                                   |
| Ștergere                  | [Delete](#delete)                                                                   |
| Distinct                  | [Repetiție Filtru](#filter-repetition)                                              |
| Șofer                     | [Get Driver](#get-driver)                                                           |
| Exec                      | [Execută native update SQL](#execute-native-update-sql)                             |
| Exista                    | [Exists](#exists)                                                                   |
| Găsește                   | [Interogare una sau mai multe linii prin ID](#query-one-or-multiple-lines-by-id)    |
| Găsire Eșuată             | [Eroare de returnare negăsită](#not-found-return-error)                             |
| Primul                    | [Interogare o linie](#query-one-line)                                               |
| Primul                    | [Query or return data through callback](#query-one-line)                            |
| Prima Oră                 | [Preluarea sau crearea modelelor](#retrieving-or-creating-models)                   |
| FirstOrNew                | [Preluarea sau noi modele](#retrieving-or-creating-models)                          |
| FirstOrFail               | [Eroare negăsită](#not-found-error)                                                 |
| ForțareȘtergeți           | [Ștergere forțată](#delete)                                                         |
| Ia                        | [Interogare linii multiple](#query-multiple-lines)                                  |
| Grup                      | [Group](#group-by--having)                                                          |
| Apariţia                  | [Having](#group-by-having)                                                          |
| Alătură-te                | [Join](#join)                                                                       |
| Limită                    | [Limit](#limit)                                                                     |
| LockForUpdate             | [Localizare pesimistă](#pessimistic-locking)                                        |
| Model                     | [Specificați un model](#specify-table-query)                                        |
| Decalaj                   | [Offset](#offset)                                                                   |
| Comanda                   | [Order](#order)                                                                     |
| Comandă                   | [Order](#order)                                                                     |
| OrderByDesc               | [Order](#order)                                                                     |
| InandomOrdine             | [Order](#order)                                                                     |
| Oracunde                  | [OrWhere](#where)                                                                   |
| Oriunde Notin             | [OrWhereNotIn](#where)                                                              |
| OrWhereNull               | [OrWhereNull](#where)                                                               |
| Oriunde                   | [OrWhereIn](#where)                                                                 |
| Paginat                   | [Paginate](#paginate)                                                               |
| Mânucă                    | [Interogare coloană unică](#query-single-column)                                    |
| Crud                      | [Execută nativ SQL](#execute-native-sql)                                            |
| Restaurează               | [Restore](#restore)                                                                 |
| Rollback                  | [Tranzacție Rollback](#transaction)                                                 |
| Salvează                  | [Actualizează un model existent](#update-a-existing-model)                          |
| SaveQuietly               | [Salvarea unui singur model fără evenimente](#saving-a-single-model-without-events) |
| Scanare                   | [Scanare reușită](#execute-native-sql)                                              |
| Domeniu                   | [Scopes](#scopes)                                                                   |
| Selectare                 | [Specificați câmpuri](#specify-fields)                                              |
| SharedLock                | [Localizare pesimistă](#pessimistic-locking)                                        |
| Sum                       | [Sum](#sum)                                                                         |
| Tabel                     | [Specificați un tabel](#specify-table-query)                                        |
| ToSql                     | [Get SQL](#get-sql)                                                                 |
| ToRawSql                  | [Get SQL](#get-sql)                                                                 |
| Actualizare               | [Actualizează o singură coloană](#update-a-single-column)                           |
| ActualizareOrCreare       | [Actualizare sau creare](#update-or-create)                                         |
| Unde                      | [Where](#where)                                                                     |
| Intre                     | [WhereBetween](#where)                                                              |
| Întrucât: | [WhereNotBetween](#where)                                                           |
| Unde                      | [WhereNotIn](#where)                                                                |
| Unde                      | [WhereNull](#where)                                                                 |
| Oriunde                   | [WhereIn](#where)                                                                   |
| Repetări                  | [Mutare evenimente](#muting-events)                                                 |
| Retras                    | [Query soft delete data](#query-soft-delete-data)                                   |

## Constructor de interogări

### Injectare context

```go
facades.Orm().WithContext(ctx)
```

### Specificați conexiunea bazei de date

Dacă mai multe conexiuni la baza de date sunt definite în `config/database.go`, le puteți folosi prin funcția `Connection`
din `facades.Orm()`. Numele conexiunii transmise către `Connection` ar trebui să fie una dintre conexiunile configurate în
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### Baza de date generică de interfață sql.DB

Interfață generică a bazei de date sql.DB, apoi folosește funcționalitatea furnizată:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Închide
db. lose()

// Statisticile bazei de date Returns
db.Stats()

// SetMaxIdleConns stabilește numărul maxim de conexiuni în grupul de conexiuni inactive
db. etMaxIdleConns(10)

// SetMaxOpenConns stabilește numărul maxim de conexiuni deschise la baza de date
db. etMaxOpenConns(100)

// SetConnMaxLifetime stabilește perioada maximă de timp în care o conexiune poate fi reutilizată
db.SetConnMaxLifetime(oră.ore)
```

### Obține instanța bazei de date

Înainte de fiecare operațiune a bazei de date, este necesar să se obțină o instanță a bazei de date.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Selectare

#### Interogare o linie

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * DE la `users` ORDER de `users`.`id` LIMIT 1;
```

Uneori este posibil să doriți să efectuați o altă acțiune dacă nu sunt găsite rezultate. Metoda `FirstOr` va returna o singură instanță
sau, dacă nu sunt găsite rezultate, va executa închiderea dată. Puteți seta valorile de modelat în închidere:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Interogare una sau mai multe linii prin ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * from `users`.`id` = 1;

var utilizatori []modele. ser
faades.Orm().Query().Find(&useri, []int{1,2,3})
// SELECT * DE la `utilizatori` prin `utilizatori`.`id` IN (1,2,3);
```

#### Eroare de returnare negăsit

```go
var modele de utilizator.Utilizator
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Când cheia primară a tabelului de utilizator este de tip `șir`, trebuie să specificați cheia primară atunci când apelați

Metoda `Find`

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * from `users` WHERE `users`.`uuid` = "a";
```

#### Interogare linii multiple

```go
var users []models.User
facades.Orm().Query().Where("id în ?", []int{1,2,3}).Get(&users)
// SELECT * from `users` WHERE id in (1,2,3);
```

#### Preluarea sau crearea modelelor

Metoda de căutare `FirstOrCreate` pentru o înregistrare a bazei de date folosind perechile de coloane specificate/valori. Dacă modelul nu poate fi
găsit în baza de date, crează o nouă înregistrare cu atributele de la fuzionarea primului argument cu al doilea argument opțional
.

Similar, metoda `FirstOrNew` încearcă, de asemenea, să localizeze o înregistrare în baza de date pe baza atributelor date. Cu toate acestea,
dacă nu este găsit, o nouă instanță a modelului este returnată. Este important să rețineți că acest nou model nu a fost încă salvat
în baza de date și trebuie să apelați manual la metoda `Save` pentru a face acest lucru.

```go
var user models.User
facades.Orm().Query().Where("gen", 1).FirstOrCreate(&user, models.User{Nume: "tom"})
// SELECT * from `users` WHERE `gender` = 1 AND `users`. nume" = 'tom' ORDER de `utilizatori`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

faades.Orm().Query().Where("gen", 1).FirstOrCreate(&user, models.User{Nume: "tom"}, modele. ser{Avatar: "avatar"})
// SELECT * DIN `utilizatori` unde `gen` = 1 AND `users`.`name` = 'tom' ORDER by `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:52:59.913','2023-09-18 12:52:52:59.913','tom','avatar');

var modele de utilizatori. ser
facades.Orm().Query().Where("gen", 1).FirstOrNew(&user, models.User{Nume: "tom"})
// SELECT * from `users` WHERE `gen` = 1 AND `users`. nume" = 'tom' ORDER de `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Nume: "tom"}, modele. ser{Avatar: "avatar"})
// SELECT * DIN `utilizatori` unde `gen` = 1 AND `users`.`name` = 'tom' ORDER by `users`.`id` LIMIT 1;
```

#### Eroare negăsită

Când elementul solicitat nu este găsit, metoda `First` nu generează o eroare. Pentru a genera o eroare, folosiți metoda
`FirstOrFail`:

```go
var modele de utilizator.Utilizator
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrordNotFound
```

### Unde

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

### Limită

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * from `users` when name = 'tom' LIMIT 3;
```

### Decalaj

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * from `users` where name = 'tom' LIMIT 3 OFFSET 5;
```

### Comanda

```go
var users []models.User
facades.Orm().Query().Unde ("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECT * DIN `users` unde numele = 'tom' ORDER pe fiecare asc,id desc;

fațade. rm().Query().Unde ("nume = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * DIN 'users' WHERE = 'tom' ORDER per asc;

faades.Orm().Query().Unde (nume = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * de la `users` al cărui nume = 'tom' ORDER de fiecare dată;

facades.Orm().Query().Unde ("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * DE la `users` unde numele = 'tom' ORDER by click pe jos;

faades.Orm().Query(). aici ("nume = ?", "tom").InRandomOrder().Get(&users)
// SELECT * DIN `users` unde numele = 'tom' ORDUPĂ RAND();
```

### Paginat

```go
var users []models.User
var total int64
facades.Orm().Query(). aginat(1, 10, &utilizatori, &total)
// SELECT numărul(*) de la `utilizatorii";
// SELECT * de la "utilizatori" LIMIT 10;
```

### Interogare singură coloană

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` from `users';
```

### Specificați interogarea tabelelor

Dacă doriți să interogați unele date agregate, trebuie să specificați un anumit tabel.

Specificați un model

```go
număr var int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT număr(*) de la `utilizatori` WHERE șterse_at IS NULL;
```

Specificați un tabel

```go
număr var int
facades.Orm().Query().Table("utilizatori").Count(&count)
// SELECT număr(*) de la `utilizatori"; // obțineți toate înregistrările, fie că sunt șterse sau nu
```

### Get SQL

Obține SQL cu substituent:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * DE la "users" WHERE "id" = $1 AND "users"."deleted_at" IS NULL
```

Obține SQL cu valoarea:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * DE "utilizatori" WHERE "id" = 1 AND "users"."deleted_at" is NULL
```

Metodele pot fi apelate după `ToSql` şi `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Număr

```go
număr var int64
facades.Orm().Query().Table("users").Unde ("name = ?", "tom").Count(&număra)
/ SELECT număr(*) de la `users` unde numele = 'tom';
```

### Specifică Câmpurile

`Select` îți permite să specifici ce câmpuri să extragă din baza de date, în mod implicit ORM preia toate câmpurile.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` de la `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` de la `utilizatori";
```

### Grupează după și după

```go
type Result struct {
  Nume şir
  Total
}

var rezultat rezultat
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) ca total").Group("nume").Having("name = ?", "tom").Get(&result)
// Nume SELECT, sum(age) ca total de la `utilizatori` GROUP by `name` AVÂND nume = "tom";
```

### Alătură-te

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email from `users` LEFT JOIN emails.user_id = users.id;
```

### Crează

```go
user := models.User{Nume: "tom", Vârsta: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT utilizatori INTO (nume, vârstă, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00", "2022-09-27 22:00");

// Nu declanșează evenimentele din model
err := fațade. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Modelul de evenimente
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### Creare multiplă

```go
utilizatori := []models.User{{Name: "tom", Age: 18}, {Nume: "tim", Vârstă: 19}}
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

> `created_at` şi `updated_at` vor fi completate automat.

### Cursor

Poate fi folosit pentru a reduce semnificativ consumul de memorie al aplicației atunci când se repetă prin zeci de mii de
Eloquent model de înregistrări. Note, the `Cursor` method can be used with `With` at the same time, please
use [Lazy Eager Loading](./relationships#lazy-eager-loading) to load relationship in the `for` logic.

```go
cursor, err := facades.Orm().Query().Model(models.User{}).Cursor()
dacă ero!= nil {
  return err
}
pentru rândul := range cursor {
  var user models. ser
  if err := row.Scan(&user); err != nil {
    return err
  }
  fmt.Println(user)
}
```

### Salvare model

#### Actualizează un model existent

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `utilizatorii" SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Actualizare coloane

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `tom';

facades.Orm().Query().Model(&models.User{}).Wherename, "tom.Update(modele. ser{Nume: "hello", Vârstă: 18})
fațades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(harta[string]oricea{"nume": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`,`,`age`=18 WHERE '';
```

> La actualizarea cu `struct`, Orm va actualiza doar câmpurile non-zero. Poate doriţi să utilizaţi `map` pentru a actualiza atributele sau
> utilizaţi `Select` pentru a specifica câmpurile care trebuie actualizate. Țineți cont că `struct` poate fi `Model`, dacă doriți să actualizați cu `Model` non
> , trebuie să folosiți `. able("utilizatori")", totuşi, câmpul `updated_at\` nu poate fi actualizat automat la acest ora
> .

#### Actualizează sau crează

Interogare de `name`, dacă nu există, creați de `name`, `avatar`, dacă există, actualizați `avatar` bazat pe `name`:

```go
fațades.Orm().Query().UpdateOrCreate(&user, models.User{Nume: "name"}, models.User{Avatar: "avatar"})
// SELECT * DE la `utilizatori`.`name` = 'name' AND `users`.`.`deleted_at` este NULL ORDER de `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'nume','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` NULL AND `id` = 1;
```

### Ștergere

Ștergeți după model numărul de rânduri afectat de declarație se returnează prin metodă:

```go
var modele de utilizator.Utilizator
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). aici("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE DIN `users`.`id` = 1;

num := res.RowsAfected
```

Ștergere multiplă

```go
facades.Orm().Query().Unde ("nume = ?", "tom").Delete(&models.User{})
// DELETE DIN `users` WHERE name = 'tom';
```

Doriți să forțați ștergerea unor date de ștergere soft.

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("nume", "tom").ForceDelete()
faades.Orm().Query().Table("users").Where("name", ").ForceDelete()
```

Puteţi şterge înregistrările cu modele de asocieri prin `Select`:

```go
// Ștergeți Contul utilizatorului când ștergeți utilizatorul
facades.Orm().Query().Select("Account").Delete(&user)

// Ștergeți Comenzile și Cardurile de credit ale utilizatorului atunci când ștergeți utilizatorul
facades.Orm().Query().Select("Comenzi", "CreditCards"). elete(user)

// Ștergeți toate asocierile copil de utilizator la ștergerea utilizatorului
faades.Orm().Query().Select(orm.Associations). elete(&user)

// Șterge tot contul utilizatorilor la ștergerea utilizatorilor
facades.Orm().Query().Select("Account").Delete(&users)
```

Notă: Asocierile vor fi șterse numai în cazul în care cheia primară a înregistrării nu este goală, și Orm folosește aceste chei primare
ca condiții pentru a șterge înregistrările asociate:

```go
// Șterge utilizatorul care nume='goravel', dar nu șterge contul utilizatorului
facades.Orm().Query().Select("Account").Unde ("nume = ?", "goravel"). elete(&models.User{})

// Șterge utilizatorul care nume='goravel' și id = 1 și șterge fațadele utilizatorului
. rm().Query().Select("Account").Unde ("name = ?", "goravel").Delete(&models.User{ID: 1})

// Șterge utilizatorul care a înregistrat = 1 și șterge contul acelui utilizator
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

Dacă se execută ștergerea seriei fără nicio condiție, ORM nu face asta și returnează o eroare. Așa că trebuie să adaugi niște condiții
sau să folosești nativ SQL.

### Şterge datele din interogare

```go
var user models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Repetiţie filtru

```go
var users []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### Obține șofer

```go
driver := facades.Orm().Query().Driver()

// Judge driver
if driver == orm.DriverMysql {}
```

### Execută Native SQL

```go
type Result struct {
  ID
  Numele

}

var rezultat rezultat
fațade. rm().Query().Raw("ID-ul SELECT, numele, vârsta de la utilizatori unde numele = ?", "tom").Scan(&rezultat)
```

### Execută Native Update SQL

Numărul de rânduri afectat de declarație se returnează prin metodă:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAfected
```

### Exista

```go
var există bool
facades.Orm().Query().Model(&models.User{}).Unde ("name", "tom").Exists(&există)
```

### Restaurează

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
faades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `ștered_at`=NULL WHERE `id` = 1;
```

### Tranzacție

Puteţi executa o tranzacţie cu funcţia `Transaction`.

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

De asemenea, poți controla manual fluxul tranzacției chiar tu:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Nume: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Domeniu

Vă permite să specificați interogările utilizate în mod curent care pot fi menționate atunci când este apelată metoda.

```go
func Paginator(șir pagină, limită șir) funcție (methods orm.Query) orm. uery {
  return func(query orm.Query) orm.Query {
    page, _ := strconv. toi(pagina) Limita
    , _ := strconv. toi(limit)
    offset := (pagina - 1) * limita

    interogare returnare. ffset(offset).Limit(limit)
  }
}

// scopes.Paginatorul este o funcție personalizată: funcție (ormcontract.Query) ormcontract.Interogarea
facades.Orm().Query().Scopes(scopes.Paginator(pagină, limit)).Find(&entries)
```

### Expresii crude

Puteţi utiliza metoda `db.Raw` pentru a actualiza câmpurile:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:0399' WHERE `users`.`deleted_at` este NULL AND `id` = 1;
```

### Blocare essimistă

Constructorul de interogări include, de asemenea, câteva funcții pentru a vă ajuta să obțineți "blocare pesimistă" atunci când executați `selectează`
declarații.

Pentru a executa o declarație cu o "blocare partajată", puteți apela metoda `SharedLock`. O blocare partajată împiedică modificarea rândurilor
selectate până când tranzacția este angajată:

```go
var users []models.User
facades.Orm().Query().Where("voturi", ">", 100).SharedLock().Get(&users)
```

Alternativ, puteţi utiliza metoda `LockForUpdate`. O blocare "pentru actualizare" împiedică înregistrările selectate să fie modificate
sau să fie selectate cu o altă blocare partajată:

```go
var users []models.User
facades.Orm().Query().Where("voturi", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
var sum
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Evenimente

Modelele de Orm expediază mai multe evenimente, permițându-vă să vă conectați la următoarele momente din ciclul de viață al unui model: `Recrieved`,
`Creating`, `Created`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

Evenimentul `recuperat` se va expedia atunci când un model existent este preluat din baza de date. Când un nou model este salvat pentru
prima dată, evenimentele `Creează` şi `Creat` vor expedia. Evenimentele `Updating` / `Updated` se vor expedia când
un model existent este modificat şi metoda `Save` este apelată. Evenimentele `Saving` / `Saved` se vor expedia atunci când modelul
este creat sau actualizat - chiar dacă atributele modelului nu au fost schimbate. Numele evenimentelor care se termină cu `-ing` sunt
expediate înainte de a persista orice modificare a modelului, în timp ce evenimentele care se termină cu `-ed` sunt expediate după ce modificările
la model sunt persistate.

Pentru a începe să ascultați evenimentele modelului, definiți o metodă `DispatchesEvents` pe modelul dumneavoastră. Această proprietate cartografiază diferite puncte
din ciclul de viață al modelului la clasele tale de evenimente.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm. odel
 Nume șir
}

func (u *User) DispatchesEvents() harta[contractsorm.EventType]funcție. Event) eroare {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreare: funcție (eveniment contractsorm.Eveniment) eroare {
   return nil
  },
  contractsorm.EventCreat: funcție (eveniment contractsorm.Eveniment) eroare {
   return nil
  },
  contractsorm.EventSaving: funcție (contract de eveniment. vent) eroare {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) eroare {
   return nil
  },
  contractsorm.EventUpdating: funcție (eveniment contractant). vent) eroare {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) eroare {
   return nil
  },
  contractant. ventȘtergere: funcție (eveniment contractsorm.Eveniment) eroare {
   return nil
  },
  contractant. ventDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleting: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventForceDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRetrieved: function (event contractsorm.Event) error {
   return nil
  },
  contractsorm. EventRestaurat: funcție (event contractsorm.Event) eroare {
   return nil
  },
  contractsorm.EventRestoring: function (event contractsorm.Event) error {
   return nil
  },
 }
}
```

> Notă: Doar înregistrați evenimentele de care aveți nevoie. Evenimentele de model nu sunt expediate atunci când operații în grup prin Orm.

### Observatori

#### Definirea observatorilor

Dacă ascultați multe evenimente pe un model dat, puteţi utiliza observatori pentru a grupa toţi ascultătorii într-o singură clasă
Clasele de observatori au nume de metode care reflectă evenimentele omogene pe care doriți să le ascultați. Fiecare dintre aceste metode
primește modelul afectat ca fiind singurul lor argument. Comanda Artizană `make:observer` este cel mai ușor mod de a crea o nouă clasă de observatori
:

```shell
rulare . artizan:observer UserObserver
rulați . artizan make:observer user/UserObserver
```

Această comandă va plasa noul observator în folderul `app/observatori`. Dacă acest director nu există, Artisan
o va crea pentru dvs. Noul dvs. observator va arăta în felul următor:

```go
observatori

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Creat (eveniment orm. vent) eroare {
 return nil
}

func (u *UserObserver) Actualizat (event orm.Event) eroare {
 return nil
}

func (u *UserObserver) Ștergere (eveniment orm. vent) eroare {
 return nil
}

func (u *UserObserver) eroarea ForceDeleted(event orm.Event) {
 return nil
}
```

Observatorul de șablon conține doar câteva evenimente, puteți adăuga alte evenimente în funcție de nevoile dvs.

Pentru a înregistra un observator, trebuie să apelați metoda `Observe` pe modelul pe care doriți să îl observați. Puteți înregistra observatori
în metoda `Boot` a aplicației dvs. `app/providers/event_service_provider.go::Boot`:

```go
furnizorii de pachete

de import (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observver"
)

type EventServiceProvider struct {
}

func (receptor *EventServiceProvider) Register(fundația aplicației. pplication) {
 facades.Event().Register(destinatar. isten())
}

func (receptor *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

func (receptor *EventServiceProvider) asculten() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Notă: Dacă setați `DispatchesEvents` și `Observer` în același timp, numai `DispatchesEvents` vor fi aplicate.

#### Parametru în observator

Parametrul `eveniment` va fi transmis tuturor observatorilor:

| Metodă         | Acțiune                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Context        | Obține contextul care a trecut de `facades.Orm().WithContext()`                                                                           |
| Obține atribut | Obțineți valoarea modificată, dacă nu modificați, obțineți valoarea originală, dacă nu există nicio valoare originală, returnați valoarea |
| GetOriginal    | Obține valoarea originală, dacă nu există o valoare originală, returnează nil                                                             |
| Isdirty        | Determină dacă câmpul este modificat                                                                                                      |
| IsClean        | IsDirty invers                                                                                                                            |
| Interogare     | Obțineți o interogare nouă, care poate fi utilizată cu tranzacția                                                                         |
| SetAttribute   | Setați o nouă valoare pentru un câmp                                                                                                      |

### Mut Evenimente

Ocazional, este posibil să fie nevoie să dezactivați temporar toate evenimentele declanșate de un model. Puteţi obţine acest lucru folosind metoda
`WithoutEvents`:

```go
var user models.Utilizator
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Se salvează un singur model fără evenimente

Uneori poate doriți să "salvați" un anumit model fără a expedia evenimente. Puteţi realiza acest lucru cu metoda
`SaveQuietly`:

```go
var modele de utilizator. Utilizator
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
