# Per Iniziare

Goravel rende facile per gli sviluppatori interagire con i database usando `facades.Orm()`. Attualmente, fornisce il supporto ufficiale
per le seguenti quattro banche dati:

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- SQL Server 2017+

Prima di iniziare, configura il database in `.env` e conferma la configurazione `default` in `config/database.go`.

# Configurazione

Per configurare i database, vai a `config/database.go`. Qui puoi personalizzare tutte le connessioni del database e
scegliere una connessione `default`. La configurazione in questo file si basa sulle variabili di ambiente del progetto e
mostra varie configurazioni di database che Goravel supporta.

### DSN

Puoi anche usare DSN per connetterti direttamente al database, basta configurare il campo `dsn` nel file di configurazione:

```go
"postgres": mappa[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Lettura E Scrittura Delle Connessioni

A volte potresti voler usare una connessione al database per le istruzioni `SELECT`, e un'altra per le istruzioni `INSERT`, `UPDATE`, e
`DELETE`. Goravel rende questa una brezza.

Per vedere come devono essere configurate le connessioni di lettura/scrittura, guardiamo a questo esempio:

```go
import "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "read": []database. onfig{
      {Host: "192.168.1. ", Porta: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database. onfig{
      {Host: "192.168.1. ", Porta: 3306, Database: "forge", Nome utente: "root", Password: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "porta": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Abbiamo aggiornato l'array di configurazione con due nuove chiavi - `read` e `write`. La connessione `read` userà
`192.168.1.1` come host, mentre la connessione `write` userà `192.168.1.2`. Entrambe le connessioni condivideranno lo stesso prefisso
del database, set di caratteri e altre opzioni specificate nell'array principale di mysql. Nel caso di valori multipli nell'array di configurazione
`host`, un host del database verrà selezionato in modo casuale per ogni richiesta.

### Pool Di Connessione

È possibile configurare un pool di connessione nel file di configurazione, una configurazione ragionevole dei parametri di pool di connessione
può migliorare notevolmente le prestazioni della convaluta:

| Chiave                                                                           | Azione                                        |
| -------------------------------------------------------------------------------- | --------------------------------------------- |
| pool.max_idle_conns    | Numero massimo di connessioni inattive        |
| pool.max_open_conns    | Max connessioni aperte                        |
| pool.conn_max_idletime | Massimo tempo di inattività delle connessioni |
| pool.conn_max_lifetime | Connessioni vita massima                      |

### Schema

Postgres e Sqlserver supportano la configurazione di Schema. Postgres può impostare direttamente lo schema nel file di configurazione, mentre Sqlserver
deve specificare lo schema attraverso il metodo `TableName` nel modello.

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

### Ottieni Informazioni Database

Puoi usare il comando `db:show` per visualizzare tutte le tabelle nel database.

```bash
go run . artisan db:show
```

Puoi anche usare il comando `db:table` per visualizzare la struttura di una tabella specifica.

```bash
go run . artisan db:table
go run . artisan db:table users
```

## Definizione Modello

Per creare un modello personalizzato, fare riferimento al file modello `app/models/user.go` che è incluso nel framework. Il file `struct`
in `app/models/user.go` contiene due quadri incorporati: `orm.Model` e `orm.SoftDeletes`. Questi quadri definiscono rispettivamente le proprietà
`id`, `created_at`, `updated_at`, e `deleted_at`. Con `orm.SoftDeletes`, è possibile abilitare la cancellazione soft
per il modello.

### Modello Di Convenzione

1. Il modello è chiamato con una grande gobba;
2. Utilizzare la forma plurale del modello "nome del serpente" come il nome della tabella;

Ad esempio, il nome del modello è `UserOrder`, e il nome della tabella è `user_orders`.

### Crea Modello

Usa il comando `make:model` per creare un modello:

```shell
go run . artisan make:model User
go run . artisan make:model user/User
```

Il file del modello creato si trova nel file `app/models/user.go`, il contenuto è il seguente:

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nome stringa
  Stringa Avatar
  orm.SoftDeletes
}
```

Se si desidera impostare il campo del modello su `any`, è necessario aggiungere un ulteriore Tag: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Dettaglio qualsiasi `gorm:"type:text"`
  orm.SoftDeletes
}
```

Ulteriori dettagli sull'utilizzo del tag sono disponibili all'indirizzo: <https://gorm.io/docs/models.html>.

### Specifica Nome Tabella

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nome stringa
  Stringa Avatar
  orm. oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### Connessioni Database

Per impostazione predefinita, tutti i modelli utilizzano la connessione predefinita al database configurata per l'applicazione. Se si desidera specificare una connessione
distinta da usare quando si interagisce con un particolare modello, devi definire un metodo `Connection` sul modello
.

```go
package models

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Nome stringa
  Stringa Avatar
  orm. oftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## facades.Orm() funzioni disponibili

| Nome           | Azione                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Connessione    | [Specifica Connessione Database](#specify-database-connection)                          |
| DB             | [Generic Database Interface sql.DB](#generic-database-interface-sql-db) |
| Interrogazione | [Ottieni Istanza Database](#get-database-instance)                                      |
| Transazione    | [Transaction](#transaction)                                                             |
| Contestuale    | [Inject Context](#inject-context)                                                       |

## facades.Orm().Query() funzioni disponibili

| Funzioni       | Azione                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Inizia         | [Iniziare la transazione](#transaction)                                                 |
| Commit         | [Commit transaction](#transaction)                                                      |
| Conteggio      | [Count](#count)                                                                         |
| Crea           | [Create](#create)                                                                       |
| Cursor         | [Cursor](#cursor)                                                                       |
| Elimina        | [Delete](#delete)                                                                       |
| Distinto       | [Ripetizione Filtro](#filter-repetition)                                                |
| Driver         | [Get Driver](#get-driver)                                                               |
| Exec           | [Esegui aggiornamento nativo SQL](#execute-native-update-sql)                           |
| Esiste         | [Exists](#exists)                                                                       |
| Trova          | [Interroga una o più righe per ID](#query-one-or-multiple-lines-by-id)                  |
| FindOrFail     | [Errore di restituzione non trovato](#not-found-return-error)                           |
| Primo          | [Query una riga](#query-one-line)                                                       |
| Primo          | [Interroga o restituisce i dati tramite callback](#query-one-line)                      |
| FirstorCreate  | [Recupero O Creazione Di Modelli](#retrieving-or-creating-models)                       |
| FirstOrNew     | [Recupero O Nuovi Modelli](#retrieving-or-creating-models)                              |
| FirstOrFail    | [Errore Non Trovato](#not-found-error)                                                  |
| ForceElimina   | [Forza eliminazione](#delete)                                                           |
| Ottieni        | [Interroga più righe](#query-multiple-lines)                                            |
| Gruppo         | [Group](#group-by--having)                                                              |
| Avendo         | [Having](#group-by-having)                                                              |
| Entra          | [Join](#join)                                                                           |
| Limite         | [Limit](#limit)                                                                         |
| LockForUpdate  | [Blocco Pessimistico](#pessimistic-locking)                                             |
| Modello        | [Specificare un modello](#specify-table-query)                                          |
| Scostamento    | [Offset](#offset)                                                                       |
| Ordine         | [Order](#order)                                                                         |
| OrdineBy       | [Order](#order)                                                                         |
| OrderByDesc    | [Order](#order)                                                                         |
| InRandomOrder  | [Order](#order)                                                                         |
| OrWhere        | [OrWhere](#where)                                                                       |
| OrWhereNotIn   | [OrWhereNotIn](#where)                                                                  |
| OrWhereNull    | [OrWhereNull](#where)                                                                   |
| OrWhereIn      | [OrWhereIn](#where)                                                                     |
| Paginato       | [Paginate](#paginate)                                                                   |
| Pluck          | [Query singola colonna](#query-single-column)                                           |
| Grezzo         | [Execute native SQL](#execute-native-sql)                                               |
| Ripristina     | [Restore](#restore)                                                                     |
| Rollback       | [Transazione Rollback](#transaction)                                                    |
| Salva          | [Aggiorna un modello esistente](#update-a-existing-model)                               |
| SaveQuietly    | [Salvataggio di un singolo modello senza eventi](#saving-a-single-model-without-events) |
| Scansione      | [Scansiona struttura](#execute-native-sql)                                              |
| Ambiti         | [Scopes](#scopes)                                                                       |
| Seleziona      | [Specificare I Campi](#specify-fields)                                                  |
| SharedLock     | [Blocco Pessimistico](#pessimistic-locking)                                             |
| Sum            | [Sum](#sum)                                                                             |
| Tabella        | [Specificare una tabella](#specify-table-query)                                         |
| ToSql          | [Get SQL](#get-sql)                                                                     |
| ToRawSql       | [Get SQL](#get-sql)                                                                     |
| Aggiorna       | [Aggiorna una singola colonna](#update-a-single-column)                                 |
| UpdateOrCreate | [Aggiorna o crea](#update-or-create)                                                    |
| Dove           | [Where](#where)                                                                         |
| DoveTra        | [WhereBetween](#where)                                                                  |
| DoveNotTra     | [WhereNotBetween](#where)                                                               |
| WhereNotIn     | [WhereNotIn](#where)                                                                    |
| DoveNull       | [WhereNull](#where)                                                                     |
| DoveIn         | [WhereIn](#where)                                                                       |
| WithoutEvents  | [Muting events](#muting-events)                                                         |
| Ritirato       | [Query soft delete data](#query-soft-delete-data)                                       |

## Costruttore Di Query

### Inietta Contesto

```go
facades.Orm().WithContext(ctx)
```

### Specifica Connessione Database

Se più connessioni di database sono definite in `config/database.go`, puoi usarle tramite la funzione `Connection`
di `facades.Orm()`. Il nome di connessione passato a `Connection` dovrebbe essere una delle connessioni configurate in
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### Interfaccia generica database sql.DB

Interfaccia generica di database sql.DB, quindi utilizzare la funzionalità che fornisce:

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Chiudi
db. lose()

// Restituisce le statistiche del database
db.Stats()

// SetMaxIdleConns imposta il numero massimo di connessioni nel pool di connessione inattivo
db. etMaxIdleConns(10)

// SetMaxOpenConns imposta il numero massimo di connessioni aperte al database
db. etMaxOpenConns(100)

// SetConnMaxLifetime imposta la quantità massima di tempo in cui una connessione può essere riutilizzata
db.SetConnMaxLifetime(time.Hour)
```

### Ottieni Istanza Database

Prima di ogni operazione specifica del database, è necessario ottenere un'istanza del database.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Seleziona

#### Interroga una riga

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

A volte potresti voler eseguire qualche altra azione se non vengono trovati risultati. Il metodo `FirstOr` restituirà una singola istanza di modello
oppure, se non vengono trovati risultati, eseguirà la chiusura specificata. È possibile impostare valori a modello in chiusura:

```go
facades.Orm().Query().Dove("name", "first_user").FirstOr(&user, func() error {
  user.Name = "goravel"

  return nil
})
```

#### Interroga una o più righe per ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var users []models. ser
facades.Orm().Query().Find(&users []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Errore di ritorno non trovato

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Quando la chiave primaria della tabella utente è di tipo `string`, è necessario specificare la chiave primaria durante la chiamata

Metodo `Trova`

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a";
```

#### Interroga più righe

```go
var users []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### Recupero O Creazione Di Modelli

Il metodo `FirstOrCreate` cerca un record di database usando le coppie di colonna/valore specificate. Se il modello non può essere
trovato nel database, crea un nuovo record con gli attributi dalla fusione del primo argomento con il secondo argomento opzionale
.

Allo stesso modo, il metodo `FirstOrNew` cerca anche di individuare un record nel database in base agli attributi forniti. Tuttavia,
se non viene trovato, viene restituita una nuova istanza del modello. È importante notare che questo nuovo modello non è ancora stato salvato
nel database e devi chiamare manualmente il metodo `Salva` per farlo.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Dove("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:59.913','tom','avatar');

modelli utente var. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, models. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Errore Non Trovato

Quando l'elemento richiesto non viene trovato, il metodo `First` non genera un errore. Per generare un errore, usa il metodo
`FirstOrFail`:

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Dove

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
facades. rm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Query().OrWhereIn("name", []any{"a"})
```

### Limite

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Scostamento

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Ordine

```go
var users []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades. rm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Dove("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDINE BY sort desc;

facades.Orm().Query(). qui("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Paginato

```go
var users []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &users &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Query Singola Colonna

```go
var age []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Specifica Interrogazione Tabella

Se si desidera interrogare alcuni dati aggregati, è necessario specificare una tabella specifica.

Specifica un modello

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Specifica una tabella

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // ottieni tutti i record, cancellati o meno
```

### Get SQL

Ottieni SQL con segnaposto:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = $1 AND "users"."deleted_at" IS NULL
```

Ottieni SQL con valore:

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = 1 AND "users"."deleted_at" IS NULL
```

I metodi possono essere chiamati dopo `ToSql` e `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Conteggio

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### Specifica Campi

`Select` consente di specificare quali campi recuperare dal database, di default ORM recupera tutti i campi.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Raggruppa Per & Avere

```go
type Result struct {
  Name string
  Total int
}

var result Result
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Entra

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("left join emails on emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Crea

```go
utente := models.User{Name: "tom", Età: 18}
err := facades.Orm().Query(). reate(&user)
// INSERIRE NEGLI utenti (nome, età, created_at, updated_at) VALORI ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// Not trigger model events
err := facades. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Trigger model events
err := facades. rm().Query().Model(&models.User{}).Create(map[string]any{
  "name": "Goravel",
})
```

### Creazione multipla

```go
users := []models.User{{Name: "tom", Età: 18}, {Name: "tim", Età: 19}}
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

> `created_at` e `updated_at` saranno riempiti automaticamente.

### Cursor

Può essere utilizzato per ridurre significativamente il consumo di memoria della tua applicazione quando si iterano attraverso decine di migliaia di record di modello
Eloquent. Nota, il metodo `Cursor` può essere utilizzato contemporaneamente con `With`, per favore
usa [Lazy Eager Loading](./relationships#lazy-eager-loading) per caricare la relazione nella logica `for`.

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

### Salva Modello

#### Aggiorna un modello esistente

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Aggiorna colonne

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(models. ser{Name: "hello", Age: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`=',`hello',`age`=18 WHERE `name` = 'tom';
```

> Quando si aggiorna con `struct`, Orm aggiornerà solo campi diversi da zero. Potresti voler usare `map` per aggiornare gli attributi o
> usa `Select` per specificare i campi da aggiornare. Nota che `struct` può essere `Model`, se vuoi aggiornare con `Model`, non
> devi usare `. able("users")`, tuttavia, il campo `updated_at` non può essere aggiornato automaticamente in questo momento
> .

#### Aggiorna o crea

Interroga per `name`, se non esiste, crea per `name`, `avatar`, se esiste, aggiorna `avatar` basato su `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` IS NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' DOVE gli utenti`.`deleted_at` È NULL E `id` = 1;
```

### Elimina

Eliminare per modello, il numero di righe interessate dall'istruzione viene restituito dal metodo:

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). here("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` WHERE `users`.`id` = 1;

num := res.RowsAffected
```

Eliminazione multipla

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE FROM `users` WHERE name = 'tom';
```

Vuoi forzare l'eliminazione di un soft-delete dati.

```go
facades.Orm().Query().Dove("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Dove("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete()
```

È possibile eliminare i record con associazioni di modelli tramite `Select`:

```go
// Elimina l'account dell'utente quando si elimina l'utente
facades.Orm().Query().Select("Account").Delete(&user)

// Elimina ordini e carte di credito dell'utente quando si elimina l'utente
facades.Orm().Query().Select("Ordini", "Carte di Credit"). elete(&user)

// Elimina tutte le associazioni figlie di utente quando elimina l'utente
facades.Orm().Query().Select(orm.Associations). elete(&user)

// Elimina tutti gli account degli utenti quando si eliminano gli utenti
facades.Orm().Query().Select("Account").Delete(&users)
```

Nota: Le associazioni saranno eliminate solo se la chiave primaria del record non è vuota, e Orm utilizza queste chiavi
primarie come condizioni per eliminare i record associati:

```go
// Elimina l'utente che nome='goravel', ma non elimina l'account dell'utente
facades.Orm().Query().Select("Account").Dove("name = ?", "goravel"). elete(&models.User{})

// Elimina l'utente che nome='goravel' e id = 1, ed elimina l'account delle facciate dell'utente
. rm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// Elimina l'utente che id = 1 ed elimina l'account di quell'utente
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

Se esegui cancella batch senza alcuna condizione, ORM non lo fa e restituisce un errore. Quindi devi aggiungere alcune condizioni
o usare SQL nativo.

### Query Soft Elimina Dati

```go
var user models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Ripetizione Filtro

```go
var users []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### Ottieni Il Driver

```go
driver := facades.Orm().Query().Driver()

// driver del giudice
if driver == orm.DriverMysql {}
```

### Esegui SQL Nativo

```go
type Result struct {
  ID int
  Name string
  Age int
}

var result Result
facades. rm().Query().Raw("ID SELECT, nome, età dagli utenti DOVE nome = ?", "tom").Scan(&result)
```

### Esegui Aggiornamento Nativo Sql

Il numero di righe interessate dall'istruzione è restituito con il metodo:

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Esiste

```go
var exists bool
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Exists(&exists)
```

### Ripristina

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Transazione

Puoi eseguire una transazione con la funzione `Transaction`.

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

Puoi anche controllare manualmente il flusso della transazione:

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Ambiti

Consente di specificare le query comunemente usate che possono essere referenziate quando viene chiamato il metodo.

```go
func Paginator(stringa di pagina, limite stringa) func(methods orm.Query) orm. uery {
  return func(query orm.Query) orm.Query {
    page, _ := strconv. toi(pagina)
    limit, _ := strconv. toi(limit)
    offset := (page - 1) * limit

    return query. ffset(offset).Limit(limit)
  }
}

// scopes.Paginator è una funzione personalizzata: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes(scopes.Paginator(page, limit)).Find(&entries)
```

### Espressioni Grezze

Puoi usare il metodo `db.Raw` per aggiornare i campi:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Blocco Pessimistico

Il costruttore di query include anche alcune funzioni per aiutarti a ottenere il "blocco pessimistico" quando esegui le tue istruzioni `select`
.

Per eseguire un'istruzione con un "blocco condiviso", puoi chiamare il metodo `SharedLock`. Un blocco condiviso impedisce alle righe
selezionate di essere modificate fino al momento in cui la transazione viene effettuata:

```go
var users []models.User
facades.Orm().Query().Where("votes", ">", 100).SharedLock().Get(&users)
```

In alternativa, puoi usare il metodo `LockForUpdate`. Un blocco "for update" impedisce che i record selezionati siano
modificati o siano selezionati con un altro blocco condiviso:

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

## Eventi

I modelli orm inviano diversi eventi, permettendoti di agganciare i seguenti momenti in un ciclo di vita di un modello: `Recuperato`,
`Creazione`, `Created`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

L'evento `Recuperato` invierà quando un modello esistente viene recuperato dal database. Quando un nuovo modello viene salvato per
la prima volta, gli eventi `Creating` e `Created` verranno inviati. Gli eventi `Updating` / `Updated` invieranno quando
verrà modificato un modello esistente e viene chiamato il metodo `Save`. Gli eventi `Saving` / `Saved` invieranno quando un modello
viene creato o aggiornato - anche se gli attributi del modello non sono stati modificati. I nomi degli eventi che terminano con `-ing` sono inviati
prima che le modifiche al modello siano persistenti, mentre gli eventi che terminano con `-ed` vengono spediti dopo che le modifiche
al modello sono persistenti.

Per iniziare ad ascoltare gli eventi del modello, definisci un metodo `DispatchesEvents` sul tuo modello. Questa proprietà mappa vari punti
del ciclo di vita del modello per le tue classi di eventi.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm. odel
 Name string
}

func (u *User) DispatchesEvents() map[contractsorm.EventType]func(contractsorm. vent) error {
 return map[contractsorm.EventType]func(contractsorm.Event) error{
  contractsorm. ventCreating: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. vent) error {
   return nil
  },
  contractsorm.EventUpdated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventForceDeleting: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm. ventForceDeleted: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventRetrieved: func(event contractsorm.Event) error {
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

> Nota: Basta registrare gli eventi di cui hai bisogno. Gli eventi del modello non vengono spediti quando si fa operazioni in batch attraverso Orm.

### Osservatori

#### Definizione Di Osservatori

Se stai ascoltando molti eventi su un dato modello, puoi usare gli osservatori per raggruppare tutti i tuoi ascoltatori in una singola classe
. Le classi di osservatori hanno nomi di metodi che riflettono gli eventi Eloquent che si desidera ascoltare. Ognuno di questi metodi
riceve il modello interessato come unico argomento. Il comando `make:observer` Artigiano è il modo più semplice per creare una nuova classe di osservatori
:

```shell
go run . artisan make:observer UserObserver
go run . artisan make:observer user/UserObserver
```

Questo comando posizionerà il nuovo osservatore nella tua cartella `app/observers`. Se questa directory non esiste, Artigiano
la creerà per te. Il tuo osservatore fresco assomiglierà a quanto segue:

```go
osservatori del pacchetto

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Created(event orm. vent) errore {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) errore {
 return nil
}

func (u *UserObserver) Deleted(event orm. vent) errore {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) errore {
 return nil
}
```

L'osservatore del modello contiene solo alcuni eventi, è possibile aggiungere altri eventi in base alle proprie esigenze.

Per registrare un osservatore, è necessario chiamare il metodo `Observe` sul modello che si desidera osservare. Puoi registrare osservatori
nel metodo `Boot` del fornitore di servizi `app/providers/event_service_provider.go::Boot`:

```go
pacchetti provider

import (
 "github. om/goravel/framework/facades"

 "goravel/app/models"
 "goravel/app/observers"
)

type EventServiceProvider struct {
}

func (receiver *EventServiceProvider) Register(app foundation. pplication) {
 facades.Event().Register(receiver. isten())
}

func (receiver *EventServiceProvider) Boot(app foundation.Application) {
 facades.Orm().Observe(models.User{}, &observers. serObserver{})
}

func (receiver *EventServiceProvider) listen() map[event.Event][]event.Listener {
 return map[event.Event][]event.Listener{}
}
```

> Nota: Se imposti `DispatchesEvents` e `Observer` allo stesso tempo, saranno applicati solo `DispatchesEvents`.

#### Parametro in osservatore

Il parametro `event` verrà passato a tutti gli osservatori:

| Metodo         | Azione                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Contesto       | Ottieni il contesto passato da `facades.Orm().WithContext()`                                                                  |
| GetAttribute   | Ottieni il valore modificato, se non modificato, ottieni il valore originale, se non c'è un valore originale, restituisci nil |
| GetOriginale   | Ottieni il valore originale, se non c'è un valore originale, restituisci nil                                                  |
| IsDirty        | Determinare se il campo è modificato                                                                                          |
| IsClean        | IsDirty inverso                                                                                                               |
| Interrogazione | Ottieni una nuova Query che può essere utilizzata con la transazione                                                          |
| SetAttribute   | Imposta un nuovo valore per un campo                                                                                          |

### Mutare Gli Eventi

Potrebbe occasionalmente essere necessario "mutare" temporaneamente tutti gli eventi sparati da un modello. È possibile ottenere questo con il metodo
`WithoutEvents`:

```go
var user models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Salvataggio Di Un Modello Singolo Senza Eventi

A volte si può desiderare di "salvare" un dato modello senza spedire alcun evento. Puoi farlo con il metodo
`SaveQuietly`:

```go
var user models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
