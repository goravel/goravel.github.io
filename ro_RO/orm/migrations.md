# Migrații

Când mai mulți oameni colaborează pentru a dezvolta aplicații, este esențial să ai o structură standardizată a bazei de date pentru sincronizarea
. Fără asta, ar putea fi haos pentru că datele individuale ale tuturor nu se potrivesc. Migrarea bazei de date este
soluţia la această problemă. Structura bazei de date este controlată de versiuni pentru a asigura consecvența sa în cadrul tuturor dezvoltatorilor
.

## Configurare

Fișierele migrării în baza de date sunt stocate în directorul `bază/migrări`. Puteți configura baza de date
de conectare în fișierul `config/database.go`. Currently, there are two drivers available for migrations: Go
language migration and SQL migration. Cu toate acestea, migrarea SQL va fi eliminată în versiunile viitoare.

```go
// Șoferi disponibili: "implicit", "sql"
"migrări": harta[string]orice {
  "driver": "implicit",
  // Puteți cumstomiza numele tabelului de migrații
  "tabel": "migrații",
},
```

## Creați Migrații

Folosiți comanda `make:migration` pentru a crea migrația:

```shell
mergi să rulezi . artizan:migration create_users_table
```

Această comandă va genera fişiere de migrare în folderul `bază de date/migrări`. Fiecare fișier de migrare va începe cu o marcă de timp
pe care Goravel o va folosi pentru a determina ordinea de execuție a dosarelor de migrare.

### Creează rapid

Folosiți `create_users_table` pentru a genera automat un tabel care conține infrastructura lui `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Folosiți `add_avatar_to_users_table` pentru a genera automat o structură pentru adăugarea de câmpuri la tabelul `users`:

```
_(to<unk> from)_(\w+)_table$
_(to<unk> din)_(\w+)$
```

Dacă condițiile de mai sus nu sunt potrivite, cadrul va genera un fișier de migrare gol.

## Structura de migrare

### Mergeți la migrarea limbii

Migraţia lovită conţine două metode: `Up` şi `Down`. Metoda `Up` este folosită pentru a adăuga noi tabele, coloane sau indici
în baza de date, în timp ce metoda `Down` este folosită pentru a anula operaţiunile efectuate prin metoda `Up`. In these
two methods, you can use `facades.Schema()` to create and operate database tables. Pentru metodele disponibile, vezi
[documentation](#tables). Următoarea migrare va crea un tabel \`utilizatori":

```go
package migrations

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github.com/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Signature The unique signature for the migration.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Up Run the migrations.
func (r *M20241207095921CreateUsersTable) Up() error {
 if !facades.Schema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table.ID()
   table.String("name").Nullable()
   table.String("email").Nullable()
   table.Timestamps()
  })
 }

 return nil
}

// Down Reverse the migrations.
func (r *M20241207095921CreateUsersTable) Down() error {
 return facades.Schema().DropIfExists("users")
}
```

#### Setare conexiune de migrare

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
func (r *M20241207095921CreateUsersTable) Șirul de conexiune {
  return "connection-name"
}
```

### Migrare SQL

Comanda de migrare va genera două fișiere de migrare: `***.up.sql` și `***.down.sql`, corespunzând execuției și respectiv
rollback, respectiv. Puteți scrie extrasele SQL direct în aceste două fișiere.

```sql
-- ***.up. ql
CREAZA TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timp NULL DEFAULT NULL,
  CIER PRIMAR (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `utilizatori";
```

## Înregistrează migrările

Când utilizați migrările de limbă, trebuie să înregistrați fișierele de migrare în fișierul `bază/kernel.go` după ce fișierele de migrare
sunt generate:

```go
// bază de date/kernel.go
func (kernel Kernel) Migration() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

Migrările SQL nu trebuie să fie înregistrate, deoarece cadrul va scana automat fișierele SQL din directorul
`database/migrations`.

## Rulează migrațiile

Pentru a rula toate migrațiile tale nesoluționate, execută comanda `migrate` Artisan:

```shell
mergi să folosești . artizan migrate
```

Dacă doriţi să vedeţi ce migrări au rulat până acum, puteţi utiliza comanda `migrate:status` Artisan:

```shell
mergi să folosești . artizan:status
```

## Migrațiile înapoi de rulare

Pentru a întoarce înapoi ultima migrare, folosiți comanda `rollback` Artizan. Această comandă returnează ultimul "lot" de migrații
care poate include fișiere multiple de migrare:

```shell
mergi să folosești . artizan migrate:rollback
```

Poți da înapoi un număr limitat de migrații furnizând opțiunea `step` la comanda `rollback`. De exemplu,
următoarea comandă va da înapoi ultimele cinci migrații:

```shell
mergi să rulezi . migrare artizan:rollback --step=5
```

Comanda `migrate:reset` va întoarce înapoi toate migrările aplicației tale:

```shell
mergi să rulezi . artizan:reset
```

### Rotiți Înapoi și Migrați folosind o singură comandă

Comanda `migrate:refresh` va da înapoi toate migrațiile tale și apoi va executa comanda `migrate`. Această comandă
recreează efectiv întreaga ta bază de date:

```shell
mergi să folosești . artizan migrate:refresh
```

Puteți să reveniți înapoi și să re-migrați un număr limitat de migrații furnizând opțiunea `pas` la comanda `refresh`.
De exemplu, următoarea comandă va reveni și va re-migra ultimele cinci migrații:

```shell
accesați . migrare artizan:refresh --step=5
```

### Şterge toate tabelele şi migrează

Comanda `migrate:fresh` va scoate toate tabelele din baza de date și apoi va executa comanda `migrate`:

```shell
mergi să mergi . artisan migrate:fresh
```

## Tabele

### Creare tabel

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Verifica daca tabelul / Existenta Coloana

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Conexiune Baza de date

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### Actualizare tabel

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Redenumire / Drop Table

```go
faades.Schema().Rename("utilizatori", "new_users")
facades.Schema().Drop("users")
faades.Schema().DropIfExists("users")

```

## Coloane

### Tipuri de coloane disponibile

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| Creșteri            | BigInteger         | Boolean               | Car                         |
| Data                | DataOra            | DatTimeTz             | Zecimal                     |
| Dublu               | [Enum](#enum)      | Plutitoare            | [ID](#id)                   |
| Creșteri            | Întreg             | IntegerIncremente     | Json                        |
| Creșteri            | LongText           | Creșteri medii        | MediumInteger               |
| Text mediu          | Mici incremente    | Integer Mic           | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | Şir                | Text                  | Timp                        |
| Tz-ul               | Ora                | Marcaje de timp       | TimpTz                      |
| Ora                 | UnsignedBigInteger | TinyIncrements        | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

Creați un câmp `Enum` care poate fi stocat în `Mysql` în conformitate cu tipul din `[]any`, dar în bazele de date `Postgres`, `Sqlite`, şi
`Sqlserver`, acesta este de tip `String`.

```go
table.Enum("dificil", []any{"easy", "hard"})
table.Enum("num", []orice{1, 2})
```

#### ID

Metoda `ID` este un alias pentru metoda `BigIncrements`. În mod implicit, această metodă va crea o coloană `id`; cu toate acestea,
dacă doriţi să atribuiţi un nume diferit coloanei, puteţi trece numele coloanei:

```go
table.ID() Tabel
ID("user_id")
```

#### SoftDeletes

Metoda `SoftDeletes` adaugă o coloană nullabilă `deleted_at` `TIMESTAMP`. Această coloană este destinată să stocheze marcajul temporal
`deleted_at` necesar pentru caracteristica Orm "soft delete":

```go
table.SoftDeletes()
```

#### Coloană personalizată

Dacă folosiți tipuri de coloane care nu suportă încă, puteți utiliza metoda `Coloană` pentru a personaliza tipul de câmp
:

```go
table.Coloana ("geometrie", "geometrie")
```

### Modificatori de coloană

În plus față de tipurile de coloană enumerate mai sus, atunci când adăugați o coloană la tabelul bazei de date, puteți adăuga și "modificatori" la
coloana. De exemplu, pentru a permite ca o coloană să fie "nullable", puteţi utiliza metoda `Nullable`:

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

Următorul tabel conține toți modificatorii de coloană disponibili:

| Modificat                     | Descriere                                                                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`            | Setează o coloană cu un întreg ca auto-incrementare (cheie primară)                                                                                        |
| `.Comment("comentariul meu")` | Adaugă un comentariu la coloană (MySQL / PostgreSQL)                                                                                                       |
| `.Default(value)`             | Setează valoarea implicită pentru coloană                                                                                                                                     |
| `.Nullable()`                 | Permite inserarea valorilor NULL în coloană                                                                                                                                   |
| `.Unsigned()`                 | Setează o coloană cu întreg ca UNSIGNED (doar pentru MySQL)                                                                                                |
| `.UseCurrent ()`              | Setează o coloană de marcaj de timp pentru a utiliza CURRENT_TIMESTAMP ca valoare implicită                                                              |
| `.UseCurrent OnUpdate()`      | Setează o coloană de marcaj de timp pentru a utiliza CURRENT_TIMESTAMP atunci când înregistrarea este actualizată (doar pentru MySQL) |

### Pune Coloana

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Indexuri

### Crează Index

```go
facades.Schema().Table("users", functii (table schema.Blueprint) {
  // Add primary key
  .
  // Adaugă tabelul cu cheia primară compusă
  . Primary("id", "name")

  // Adaugă tabelul cu indicele
  unic. tabelul nique("name")
  table.Unique("name", "age")

  // Adaugă un index normal
  . Indexul ("name")
  . ndex("nume", "vârstă")

  // Adaugă indexul complet
  tabele.FullText("name")
  tabel. FullText("nume", "vârstă")
})
```

### Redenumește Index

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Sterge Index

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_uniqu")
  tabele.DropIndex("name")
  table.DropIndexByName("name_index")
  tabele.DropFullText("name")
  table.DropFullTextByName("name_fulltext")
})
```

### Creare cheie externă

```go
facades.Schema().Table("posts", func(tabel schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### Sterge cheia externa

```go
facades.Schema().Table("users", functii (table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropignByName("user_id_foreign")
})
```
