# Migreringar

När flera personer samarbetar för att utveckla applikationer är det viktigt att ha en standardiserad databasstruktur för
synkronisering. Utan detta skulle det kunna finnas kaos eftersom allas individuella data inte kommer att matcha upp. Databasmigrering är
lösningen på problemet. Databasstrukturen är versionskontrollerad för att säkerställa dess konsekvens inom alla
utvecklare.

## Konfiguration

Databasens migreringsfiler lagras i katalogen 'databas/migration'. Du kan konfigurera databasen
anslutningsinformation i filen 'config/database.go'. För närvarande finns det två drivrutiner för migrering: Gå
språkmigrering och SQL-migrering. SQL-migreringen kommer dock att tas bort i framtida versioner.

```go
// Tillgängliga drivrutiner: "default", "sql"
"migrationer": karta[string]any{
  "driver": "default",
  // Du kan cumstomize tabellen namn på migrationer
  "tabell": "migrationer",
},
```

## Skapa migreringar

Använd kommandot `make:migration` för att skapa migrering:

```shell
gå kör. hantverkare make:migration create_users_table
```

Detta kommando kommer att generera migreringsfiler i katalogen 'databas/migration'. Varje migreringsfil kommer att börja med en
tidsstämpel som Goravel kommer att använda för att bestämma körordningen för migreringsfilerna.

### Skapa snabbt

Använd `create_users_table` för att automatiskt generera en tabell som innehåller infrastrukturen för `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Använd `add_avatar_to_users_table` för att automatiskt generera en struktur för att lägga till fält till 'users' tabellen:

```
_(to<unk> from<unk> in)_(\w+)_table$
_(to<unk> from<unk> in)_(\w+)$
```

Om ovanstående villkor inte stämmer överens kommer ramverket att generera en tom migreringsfil.

## Migrering struktur

### Gå till språkmigrering

Migrationsstrukturen innehåller två metoder: `Up` och `Down`. `Up`-metoden används för att lägga till nya tabeller, kolumner eller
index till databasen, medan `Down`-metoden används för att ångra operationerna som utförs med `Up`-metoden. I dessa
två metoder kan du använda `facades.Schema()` för att skapa och driva databastabeller. För tillgängliga metoder, se
the [documentation](#tables). Följande migrering kommer att skapa en `användare` tabell:

```go
paketmigrationer

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/frameing/facades"
)

typ M20241207095921CreateUsersTable struct {
}

// Signatur Den unika signaturen för migrationen.
func (r *M20241207095921CreateUsersTable) Signatur() sträng {
 returnera "20241207095921_create_users_table"
}

// Upp Kör migrationerna.
func (r *M20241207095921CreateUsersTable) Up() fel {
 om !fasader. chema().HasTable("användare") {
  returfasader.Schema().Skapa("användare", funktion(tabellschema.Blueprint) {
   tabellen. D()
   tabell.String("namn").Nullable()
   tabell.String("e-post").Nullable()
   tabell. imestamps()
  })
 }

 return nil
}

// Down the migrationen.
func (r *M20241207095921CreateUsersTable) Down() fel {
 returnera fasader.Schema().DropIfExists("användare")
}
```

#### Ställ in migreringsanslutning

Om migreringen kommer att interagera med en databasanslutning annat än applikationens standarddatabaskoppling, bör du
använda migrationens `Connection`-metod:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  returnera "connection-name"
}
```

### SQL migrering

Migreringskommandot kommer att generera två migreringsfiler: `***.up.sql` och `***.down.sql`, vilket motsvarar exekvering och
rollback, respektive. Du kan skriva SQL-satser direkt i dessa två filer.

```sql
-- ***.up. ql
SKAPA TABLE `users` (
  `id` bigint(20) osignerad INTE NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` tidsstämpel NULL DEFAULT NULL,
  `updated_at` tidsstämpel NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `users`;
```

## Registrera migrationer

När du använder Go language migrationer, måste du registrera migreringsfilerna i `database/kernel.go`-filen efter att
migreringsfilerna genereras:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 returnera []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

SQL-migreringar behöver inte registreras, eftersom ramverket automatiskt kommer att skanna SQL-filerna i
`database/migrations`-katalogen.

## Kör migreringar

För att köra alla dina enastående migreringar, kör `migrate` Artisan-kommandot:

```shell
gå kör. hantverkare migrera
```

Om du vill se vilka migreringar som har körts hittills, kan du använda kommandot `migrate:status` Artisan:

```shell
gå kör. hantverkare migrerar: status
```

## Rullar tillbaka migreringar

För att rulla tillbaka den senaste migrationen, använd kommandot `rollback` Artisan. Detta kommando rullar tillbaka den sista "batch" av
migrationer, som kan innehålla flera migrationsfiler:

```shell
gå springa. hantverkare migrerar: rollback
```

Du kan rulla tillbaka ett begränsat antal migreringar genom att ange `step`-alternativet till `rollback`-kommandot. Till exempel,
följande kommando kommer att rulla tillbaka de senaste fem migrationerna:

```shell
gå springa. hantverkare migrerar: rollback --step=5
```

Kommandot `migrera:reset` kommer att rulla tillbaka alla migreringar av din applikation:

```shell
gå kör. hantverkare migrerar: återställ
```

### Rulla tillbaka och migrera med ett enda kommando

Kommandot `migrate:refresh` kommer att rulla tillbaka alla dina migrationer och sedan köra `migrate`-kommandot. Detta kommando
återskapar effektivt hela din databas:

```shell
gå kör. hantverkare migrerar: uppdatera
```

Du kan rulla tillbaka och åter migrera ett begränsat antal migrationer genom att ange `step`-alternativet till `refresh`-kommandot.
Till exempel kommer följande kommando att rulla tillbaka och åter migrera de senaste fem migrationerna:

```shell
gå kör. hantverkare migrerar: uppdatera --step=5
```

### Släpp alla tabeller och migrera

Kommandot `migrate:fresh` kommer att släppa alla tabeller från databasen och sedan köra `migrate`-kommandot:

```shell
gå kör. hantverkare migrerar: färsk
```

## Tabeller

### Skapa tabell

```go
facades.Schema().Create("användare", funktion(tabellschema.Blueprint) {
  table.ID()
  table.String("namn").Nullable()
  table.String("e-post").Nullable()
  table.Timestamps()
})
```

### Kontrollera om tabellen / kolumn finns

```go
om fasades.Schema().HasTable("användare") {}
if facades.Schema().HasColumn("användare", "e-post") {}
if facades.Schema().Haskolumner("användare", []string{"name", "e-post"}) {}
if facades.Schema().HasIndex("användare", "email_unique") {}
```

### Anslutning till databas

```go
facades.Schema().Anslutning("sqlite").Create("användare", funktion (tabellschema.Blueprint) {
  table.ID()
})
```

### Uppdatera tabell

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.String("namn").Nullable()
})
```

### Döp om / Släpp tabell

```go
fasader.Schema().Byt namn ("användare", "new_users")
fasader.Schema().Drop("användare")
fasader.Schema().DropIfExists("användare")

```

## Kolumner

### Tillgängliga kolumntyper

|                     |                    |                       |                             |
| ------------------- | ------------------ | --------------------- | --------------------------- |
| Ökningar            | BigInteger         | Boolean               | Char                        |
| Datum               | Datumtid           | DatumTimeTz           | Decimal                     |
| Dubbel              | [Enum](#enum)      | Flytande              | [ID](#id)                   |
| Ökningar            | Heltal             | IntegerIncrements     | Json                        |
| Ökningar            | LongText           | Medelökning           | MediumInteger               |
| Medeltext           | SmallIncrements    | Mindre heltal         | [SoftDeletes](#softdeletes) |
| SoftDeletesTz       | Sträng             | Text                  | Tid                         |
| TimeTz              | Tidsstämpel        | Tidsstämplar          | TidsstämplarTz              |
| TidsstämplTz        | UnsignedBigInteger | TinyIncrements        | TinyInteger                 |
| TinyText            | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger |                    |                       |                             |

#### Enum

Skapa ett `Enum` fält som kan lagras i `Mysql` enligt typen i `[]any`, men i `Postgres`, `Sqlite`, och
`Sqlserver` databaser, det är en `String`-typ.

```go
table.Enum("svårighet", []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

`ID`-metoden är ett alias för `BigIncrements`-metoden. Som standard kommer denna metod att skapa en `id`-kolumn dock
om du vill tilldela ett annat namn till kolumnen kan du skicka kolumnnamnet:

```go
table.ID()
table.ID("user_id")
```

#### SoftDeletes

`SoftDeletes` -metoden lägger till en `deleted_at` `TIMESTAMP`-kolumn. Denna kolumn är avsedd att lagra den
`deleted_at` tidsstämpel som krävs för funktionen Orm "soft delete":

```go
tabell.SoftDeletes()
```

#### Anpassad kolumn

Om du använder kolumntyper som inte stöder ramverket ännu kan du använda `Column`-metoden för att anpassa
fälttyp:

```go
tabell.Kolumn ("geometri", "geometri")
```

### Kolumn Modifierare

Förutom de kolumntyper som anges ovan, när du lägger till en kolumn till en databastabell, kan du också lägga till "modifierare" till
kolumnen. Till exempel, för att tillåta en kolumn att vara "nullable" kan du använda `Nullable`-metoden:

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.String("namn").Nullable()
})
```

Följande tabell innehåller alla tillgängliga kolumnmodifierare:

| Ändrad                        | Beskrivning                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`            | Anger en heltalskolumn som automatisk inkrementering (primär nyckel)                                                |
| `.Kommentar("min kommentar")` | Lägger till en kommentar till kolumnen (MySQL / PostgreSQL)                                                         |
| `.Standard(värde)`            | Anger standardvärdet för kolumnen                                                                                                      |
| `.Nullable()`                 | Tillåter att NULL-värden infogas i kolumnen                                                                                            |
| `.Avsignerad()`               | Anger en heltalskolumn som endast UNSIGNED (MySQL)                                                                  |
| `.UseCurrent()`               | Anger en tidsstämpel kolumn att använda CURRENT_TIMESTAMP som standardvärde                                       |
| `.UseCurrentOnUpdate()`       | Anger en tidsstämpel kolumn att använda CURRENT_TIMESTAMP när posten uppdateras (MySQL endast) |

### Släpp kolumn

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.DropColumn("namn")
  tabell.DropColumn("namn", "ålder")
})
```

## Index

### Skapa index

```go
fasades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  // Lägg till primärnyckel
  tabellen. rimary("id")
  // Lägg till kompositprimärnyckel
  tabell.Prioritering("id", "namn")

  // Lägg till unikt index
  tabell. nique("namn")
  tabell.Unique("namn", "ålder")

  // Lägg till normalt index
  tabell.Index("namn")
  tabell. ndex("name", "age")

  // Lägg till fulltextindex
  table.FullText("name")
  table.FullText("name", "age")
})
```

### Döp om index

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.RenameIndex("users_name_index", "users_name")
})
```

### Släpp index

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.DropPrimary("id")
  tabell.DropUnique("namn")
  tabell.DropUniqueByName("name_unique")
  tabell.DropIndex("
  tabell.DropIndexByName("name_index")
  tabell.DropFullText("name")
  tabell.DropFullTextByName("name_fulltext")
})
```

### Skapa främmande nyckel

```go
facades.Schema().Tabell("inlägg", funktion(tabellschema.Blueprint) {
  tabell.UnsignedBigInteger("user_id")
  tabell.Foreign("user_id").Referenser("id").On("användare")
})
```

### Släpp främmande nyckel

```go
facades.Schema().Tabell("användare", funktion(tabellschema.Blueprint) {
  tabell.DropForeign("user_id")
  tabell.DropForeignByName("user_id_foreign")
})
```
