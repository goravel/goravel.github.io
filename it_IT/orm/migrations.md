# Migrazioni

Quando più persone collaborano per sviluppare applicazioni, è fondamentale avere una struttura di database standardizzata per la sincronizzazione
. Senza questo, ci potrebbe essere caos come i dati individuali di tutti non corrispondono. La migrazione del database è
la soluzione a questo problema. La struttura del database è controllata dalla versione per assicurarne la coerenza all'interno di tutti gli sviluppatori
.

## Configurazione

I file di migrazione del database sono memorizzati nella directory `database/migrations`. È possibile configurare le informazioni di connessione del database
nel file `config/database.go`. Attualmente, ci sono due driver disponibili per le migrazioni: Go
migrazione lingua e SQL. Tuttavia, la migrazione SQL sarà rimossa nelle versioni future.

```go
// Drivers disponibili: "default", "sql"
"migrations": map[string]any{
  "driver": "default",
  // È possibile cumstomize il nome della tabella delle migrazioni
  "table": "migrazioni",
},
```

## Crea Migrazioni

Usa il comando `make:migration` per creare la migrazione:

```shell
go run . artisan make:migration create_users_table
```

Questo comando genererà file di migrazione nella directory `database/migrations`. Ogni file di migrazione inizierà con un timestamp
, che Goravel userà per determinare l'ordine di esecuzione dei file di migrazione.

### Crea Rapidamente

Usa `create_users_table` per generare automaticamente una tabella contenente l'infrastruttura di `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Usa `add_avatar_to_users_table` per generare automaticamente una struttura per aggiungere campi alla tabella `users`:

```
_(to<unk> from<unk> in)_(\w+)_table$
_(to<unk> from<unk> in)_(\w+)$
```

Se le condizioni di cui sopra non sono corrispondenti, il framework genererà un file di migrazione vuoto.

## Struttura Della Migrazione

### Go Language Migration

La struttura di migrazione contiene due metodi: `Up` e `Down`. Il metodo `Up` è usato per aggiungere nuove tabelle, colonne o indici
al database, mentre il metodo `Down` è usato per annullare le operazioni eseguite con il metodo `Up`. In questi due metodi
puoi usare `facades.Schema()` per creare e gestire tabelle di database. Per i metodi disponibili, vedere
la [documentation](#tables). La seguente migrazione creerà una tabella `users`:

```go
package migrations

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Firma La firma unica per la migrazione.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Up Run the migrations.
func (r *M20241207095921CreateUsersTable) Up() error {
 if !facades. chema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   tabella. imestamps()
  })
 }

 ritorno nil
}

// Giù Inverti le migrazioni.
func (r *M20241207095921CreateUsersTable) Down() error {
 return facades.Schema().DropIfExists("users")
}
```

#### Imposta Connessione Migrazione

Se la migrazione interagirà con una connessione al database diversa dalla connessione predefinita al database dell'applicazione,
dovrebbe utilizzare il metodo `Connection` della migrazione:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### Migrazione SQL

Il comando di migrazione genererà due file di migrazione: `***.up.sql` e `***.down.sql`, corrispondenti rispettivamente all'esecuzione e al rollback
. È possibile scrivere istruzioni SQL direttamente in questi due file.

```sql
-- ***.up. ql
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  CHIAVE PRIMARIO (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `users`;
```

## Registra Migrazioni

Quando si utilizza Go migrazioni linguistiche, è necessario registrare i file di migrazione nel file `database/kernel.go` dopo che i file di migrazione
sono generati:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

Le migrazioni SQL non hanno bisogno di essere registrate, poiché il framework esegue automaticamente la scansione dei file SQL nella directory `database/migrations`
.

## Esegui Migrazioni

Per eseguire tutte le tue migrazioni eccezionali, esegui il comando `migrate` Artigiano:

```shell
go run . artisan migrate
```

Se vuoi vedere quali migrazioni sono state effettuate finora, puoi usare il comando `migrate:status` Artigiano:

```shell
go run . artisan migrate:status
```

## Migrazioni Posteriori

Per ripristinare la migrazione più recente, usa il comando `rollback` Artisan. Questo comando torna indietro l'ultimo "batch" di migrazioni
, che può includere file di migrazione multipli:

```shell
go run . artigianale migrate:rollback
```

Puoi rimettere indietro un numero limitato di migrazioni fornendo l'opzione `step` al comando `rollback`. Ad esempio,
il seguente comando tornerà indietro le ultime cinque migrazioni:

```shell
go run . artisan migrate:rollback --step=5
```

Il comando `migrate:reset` tornerà indietro tutte le migrazioni della tua applicazione:

```shell
go run . artigianale migrate:reset
```

### Roll Back & Migrate Usando Un Singolo Comando

Il comando `migrate:refresh` ripristinerà tutte le tue migrazioni ed eseguirà il comando `migrate`. Questo comando
ricrea efficacemente l'intero database:

```shell
go run . artigiano migrate:refresh
```

Puoi eseguire il rollback e ri-migrare un numero limitato di migrazioni fornendo l'opzione `step` al comando `refresh`.
Ad esempio, il seguente comando verrà rimovuto e ri-migrerà le ultime cinque migrazioni:

```shell
go run . artisan migrate:refresh --step=5
```

### Trascina Tutte Le Tabelle E Migra

Il comando `migrate:fresh` eliminerà tutte le tabelle dal database e quindi eseguirà il comando `migrate`:

```shell
go run . artigiano migrato:fresh
```

## Tabelle

### Crea Tabella

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Verifica Se La Tabella / Colonna Esiste

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Connessione Al Database

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### Aggiorna Tabella

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Rinomina / Rilascia Tabella

```go
facades.Schema().Rename("users", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("users")

```

## Colonne

### Tipi Di Colonna Disponibili

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| Incrementi Grandi   | BigInteger         | Boolean               | Char                        |
| Data                | DataOra            | DateTimeTz            | Decimale                    |
| Doppio              | [Enum](#enum)      | Fluttuante            | [ID](#id)                   |
| Incrementi          | Intero             | InteroIncrementi      | Json                        |
| Incrementi          | LongText           | MediumIncrements      | MediumInteger               |
| MediumText          | SmallIncrements    | SmallInteger          | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | Stringa            | Testo                 | Tempo                       |
| Time Tz             | Timestamp          | Timestamp             | Timestamp Tz                |
| TimestampTz         | UnsignedBigInteger | TinyIncrements        | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

Crea un campo `Enum` che può essere memorizzato in `Mysql` in base al tipo in `[]any`, ma nei database `Postgres`, `Sqlite`, e
`Sqlserver`, è un tipo `String`.

```go
table.Enum("difficulty", []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

Il metodo `ID` è un alias per il metodo `BigIncrements`. Per impostazione predefinita, questo metodo creerà una colonna `id`; tuttavia,
se si desidera assegnare un nome diverso alla colonna, è possibile passare il nome della colonna:

```go
table.ID()
table.ID("user_id")
```

#### Soft Deletes

Il metodo `SoftDeletes` aggiunge una colonna `deleted_at` `TIMESTAMP` nullabile. Questa colonna è intesa a memorizzare il timestamp `deleted_at`
richiesto per la funzione "soft delete" di Orm:

```go
table.SoftDeletes()
```

#### Colonna personalizzata

Se stai usando tipi di colonne che il framework non supporta ancora, puoi usare il metodo `Column` per personalizzare il tipo di campo
:

```go
table.Column("geometria", "geometria")
```

### Modificatori Di Colonne

In aggiunta ai tipi di colonna elencati sopra, quando si aggiunge una colonna a una tabella di database, è anche possibile aggiungere "modificatori" a
la colonna. Ad esempio, per consentire a una colonna di essere "nullabile", puoi usare il metodo `Nullable`:

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

La seguente tabella contiene tutti i modificatori della colonna disponibili:

| Modificato                     | Descrizione                                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`             | Imposta una colonna intera come incremento automatico (chiave primaria)                                                          |
| `.Commento("il mio commento")` | Aggiunge un commento alla colonna (MySQL / PostgreSQL)                                                                           |
| `.Default(value)`              | Imposta il valore predefinito per la colonna                                                                                                        |
| `.Nullable()`                  | Consente di inserire valori NULL nella colonna                                                                                                      |
| `.Unsigned()`                  | Imposta una colonna intera come UNSIGNED (solo MySQL)                                                                            |
| `.UseCurrent()`                | Imposta una colonna di timestamp per usare CURRENT_TIMESTAMP come valore predefinito                                           |
| `.UseCurrentOnUpdate()`        | Imposta una colonna di timestamp per usare CURRENT_TIMESTAMP quando il record viene aggiornato (solo MySQL) |

### Colonna A Goccia

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Indici

### Crea Indice

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Add primary key
  table. rimary("id")
  // Aggiungi la tabella della chiave primaria composita
  .Primary("id", "name")

  // Aggiungi la tabella dell'indice unico
  . nique("name")
  table.Unique("name", "age")

  // Aggiungi indice normale
  table.Index("name")
  tabella. ndex("name", "age")

  // Aggiungi indice fulltext
  table.FullText("name")
  table.FullText("name", "age")
})
```

### Rinomina Indice

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Indice Di Caduta

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

### Crea Chiave Esterna

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### Trascina Chiave Esterna

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
