# Migraties

Wanneer meerdere mensen samenwerken om applicaties te ontwikkelen, is het cruciaal om een gestandaardiseerde databasestructuur voor
synchronisatie te hebben. Zonder dit zou er chaos kunnen ontstaan aangezien ieders individuele gegevens niet overeenkomen. Database migratie is
de oplossing voor dit probleem. De databasestructuur is versiongecontroleerd om de consistentie binnen alle
ontwikkelaars te waarborgen.

## Configuratie

De database migratie bestanden worden opgeslagen in de `database/migrations` map. U kunt de database
verbindingsinformatie configureren in het `config/database.go` bestand. Momenteel zijn er twee chauffeurs beschikbaar voor migraties: Go
taalmigratie en SQL migratie. De SQL migratie zal in toekomstige versies echter worden verwijderd.

```go
// Beschikbare Drivers: "default", "sql"
"migraties": map[string]any{
  "driver": "default",
  // U kunt de tabelnaam van de migraties
  "tabel": "migraties",
},
```

## Migraties aanmaken

Gebruik het `make:migration` commando om de migratie te maken:

```shell
uitvoeren . artisan make:migratie create_users_table
```

Deze opdracht zal migratiebestanden genereren in de `database/migrations` map. Elk migratiebestand begint met een
tijdstempel, die Goravel zal gebruiken om de uitvoeringsvolgorde van de migratiebestanden te bepalen.

### Snel Maken

Gebruik `create_users_table` om automatisch een tabel te genereren met de infrastructuur van `gebruikers`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Gebruik `add_avatar_to_users_table` om automatisch een structuur te genereren om velden toe te voegen aan de `users` tabel:

```
_(totaxes, van)_(\w+)_table$
_(to₀ van)_(\w+)$
```

Als de bovenstaande voorwaarden niet overeenkomen, zal het kader een leeg migratiebestand genereren.

## Migratie structuur

### Ga taal migratie

De migratiestruct bevat twee methoden: `Up` and `Down`. De 'Up' methode wordt gebruikt om nieuwe tabellen, kolommen, of
indexen aan de database toe te voegen, terwijl de `Down` methode wordt gebruikt om de door de `Up` methode uitgevoerde bewerkingen ongedaan te maken. In deze
twee methodes, kunt u `facades.Schema()` gebruiken om database tabellen te maken en te bedienen. Voor beschikbare methoden, zie
de [documentation](#tables). De volgende migratie zal een `gebruikers` tabel maken:

```go
pakket migraties

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

type M20241207095921CreateUsersTable struct {
}

// Handtekening de unieke handtekening voor de migratie.
func (r *M20241207095921CreateUsersTable) Signature() string {
 retourneert "20241207095921_create_users_table"
}

// Omhoog de migratie uitvoeren.
func (r *M20241207095921CreateUsersTable) Up() fout {
 als !facades. chema().HasTable("gebruikers") {
  return facades.Schema().Create("gebruikers", func(tabelschema.Blueprint) {
   tabel. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   tabel. imestamps()
  })
 }

 return nil
}

// Omgekeerd de migratie.
func (r *M20241207095921CreateUsersTabable) Down() fout {
 return facades.Schema().DropIfExists("gebruikers")
}
```

#### Migratie-verbinding instellen

Als de migratie interactie heeft met een andere database verbinding dan de standaard database verbinding van de applicatie, moet u
de 'Connection' methode van de migratie gebruiken:

```go
func (r *M20241207095921CreateUsersTabable) Connection() string {
  retourneer "connection-name"
}
```

### SQL migratie

Het migratie commando zal twee migratie-bestanden genereren: `***.up.sql` en `***.down.sql`, respectievelijk overeenkomstig uitvoering en
terugdraaien. U kunt SQL statements direct in deze twee bestanden schrijven.

```sql
-- ***.up. ql
CREATE TABLE `users` (
  `id` bigint(20) niet ondertekend NIET NULL AUTO_INCREMENT,
  `naam` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `users`;
```

## Registreer migraties

Bij gebruik van Go-taalmigratie, moet je de migratiebestanden registreren in het `database/kernel.go` bestand nadat de
migratie-bestanden zijn gegenereerd:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M20241207095921CreateUsersTable{},
 }
}
```

SQL migratie hoeft niet te worden geregistreerd, omdat het framework automatisch de SQL bestanden in de
`database/migrations` map zal scannen.

## Migraties uitvoeren

Om al je uitstaande migratie uit te voeren, voer je het 'migreren' Artisan commando uit:

```shell
uitvoeren . artiesten migreren
```

Als u wilt zien welke migraties tot nu toe zijn uitgevoerd, kunt u het 'migreren:status' Artisan commando gebruiken:

```shell
uitvoeren . artisan migreren:status
```

## Migraties terugzetten

Om de laatste migratie terug te draaien, gebruik je het 'rollback' Artisan commando. Deze opdracht rolt de laatste "batch" van
migraties, die meerdere migratiebestanden kan bevatten:

```shell
uitvoeren . artisan migreren:terugdraaien
```

U kunt een beperkt aantal migraties terugdraaien door de 'stap' optie te geven aan het 'rollback' commando. Bijvoorbeeld,
het volgende commando zal de laatste vijf migratie terugdraaien:

```shell
uitvoeren . artisan migreren:terugdraaien --stap=5
```

Het `migrate:reset` commando zal alle migratie van jouw applicatie terugdraaien:

```shell
uitvoeren . artisan migreren:reset
```

### Terug en migreren met behulp van een enkel commando

Het `migreren:vernieuw` commando zal al je migraties terugdraaien en vervolgens het `migrate` commando uitvoeren. Dit commando
hermaakt effectief de hele database opnieuw aan:

```shell
ga uit. artisan migratie:refresh
```

U kunt een beperkt aantal migraties terugdraaien en opnieuw migreren door de 'stap' optie te geven naar het 'vernieuwen' commando.
Bijvoorbeeld, de volgende opdracht rolt terug en migreert de laatste vijf migraties:

```shell
uitvoeren . artisan migratie:refresh --step=5
```

### Alle tabellen neerzetten en migreren

Het `migrate:fresh` commando zal alle tabellen uit de database laten vallen en vervolgens het `migrate` commando uitvoeren:

```shell
uitvoeren . artiestenmigratie:vers
```

## Tabellen

### Tabel maken

```go
facades.Schema().Create("gebruikers", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Controleer of tabel / kolom bestaat

```go
if facades.Schema().HasTable("gebruikers") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("gebruikers", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Database verbinding

```go
facades.Schema().Connection("sqlite").Create("gebruikers", func(tabelschema.Blueprint) {
  table.ID()
})
```

### Tabel bijwerken

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  table.String("name").Nullable()
})
```

### Hernoem / Drop tafel

```go
facades.Schema().Rename("gebruikers", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("gebruikers")

```

## Kolommen

### Beschikbare kolomtypen

|                        |                    |                       |                             |
| ---------------------- | ------------------ | --------------------- | --------------------------- |
| BigIncrementen         | BigInteger         | Boolean               | Char                        |
| Datum: | DatumTijd          | DatumTimeTz           | Decimaal                    |
| Dubbel                 | [Enum](#enum)      | Uitlijning            | [ID](#id)                   |
| Verhogingen            | Geheel             | Integerstappen        | Json                        |
| Verhogingen            | LongText           | Mediumverhogingen     | MediumInteger               |
| Middeltekst            | Kleine opstapjes   | KleinGeheel           | [SoftDeletes](#softdeletes) |
| SoftDeletesTz          | Tekenreeks         | Tekstveld             | Tijd                        |
| Tijd                   | Artikeldatering    | Tijdstempels          | TijdstempelTz               |
| Tijdstempels           | UnsignedBigInteger | Tinystappen           | TinyInteger                 |
| TinyText               | UnsignedInteger    | UnsignedMediumInteger | UnsignedSmallInteger        |
| UnsignedTinyInteger    |                    |                       |                             |

#### Enum

Maak een `Enum` veld aan dat in `Mysql` kan worden opgeslagen volgens het type in `[]any`, maar in `Postgres`, `Sqlite`, en
`Sqlserver` databases, is het een `String` type.

```go
table.Enum("moeilijkheid", []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

De `ID` methode is een alias voor de `BigIncrements` methode. Standaard zal deze methode een `id` kolom maken; Echter,
als u een andere naam wilt toewijzen aan de kolom, kunt u de kolomnaam doorgeven:

```go
table.ID()
table.ID("user_id")
```

#### SoftDeletes

De `SoftDeletes` methode voegt een nullable `deleted_at` `TIMESTAMP` kolom toe. Deze kolom is bedoeld om de
`deleted_at` tijdstempel op te slaan die nodig is voor de Orm "soft delete" functie:

```go
table.SoftDeletes()
```

#### Aangepaste kolom

Als u kolomtypen gebruikt die het framework nog niet ondersteunt kunt u de 'Kolom' methode gebruiken om het
veldtype aan te passen:

```go
table.Column("geometrie", "geometrie")
```

### Aanpassers kolommen

Naast de hierboven vermelde kolomtypen, kunt u bij het toevoegen van een kolom aan een database tabel ook "modifiers" toevoegen aan
de kolom. Bijvoorbeeld, om een kolom "nullable" te laten zijn, kunt u de "Nullable" methode gebruiken:

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  table.String("name").Nullable()
})
```

De volgende tabel bevat alle beschikbare kolom modifiers:

| Gewijzigd                     | Beschrijving                                                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`            | Stelt een gehele kolom in als auto-verhoging (primaire sleutel)                                                                          |
| `.Comment("mijn commentaar")` | Voegt een opmerking toe aan de kolom (MySQL / PostgreSQL)                                                                                |
| `.Standaard(waarde)`          | Stelt de standaardwaarde voor de kolom in                                                                                                                   |
| `.Nullable()`                 | Maakt het mogelijk om NULL waardes in de kolom in te voegen                                                                                                 |
| `.Unsigned()`                 | Stelt een geheel getal in als UNSIGNED (alleen MySQL)                                                                                    |
| `.UseCurrent()`               | Stelt een tijdstempel kolom in om CURRENT_TIMESTAMP te gebruiken als standaardwaarde                                                   |
| `.UseCurrentOnUpdate()`       | Stelt een tijdstempel kolom in om CURRENT_TIMESTAMP te gebruiken wanneer het record wordt bijgewerkt (alleen MySQL) |

### Kolom verwijderen

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  table.DropColumn("naam")
  table.DropColumn("naam", "age")
})
```

## Indexen

### Index aanmaken

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  // Voeg primaire sleutel
  tabel toe. rimary("id")
  // Voeg samengestelde primaire sleutel toe
  table.Primary("id", "naam")

  // Voeg unieke index
  tabel toe. nique("naam")
  table.Unique("naam", "ouder")

  // Voeg normale index
  table.Index("naam")
  tabel toe. ndex("naam", "age")

  // Voeg volledige tekst index
  table.FullText("naam")
  table.FullText("name", "age")
})
```

### Index hernoemen

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Laat index vallen

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

### Maak Foreign key

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### Verwijder Foreign Key

```go
facades.Schema().Table("gebruikers", func(tabelschema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_id_foreign")
})
```
