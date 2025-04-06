# Migrations

Lorsque plusieurs personnes collaborent pour développer des applications, il est crucial d'avoir une structure de base de données standardisée pour la synchronisation
. Sans cela, il pourrait y avoir un chaos dans la mesure où les données individuelles de chacun ne correspondent pas. Database migration is
the solution to this problem. La structure de la base de données est contrôlée par la version pour assurer sa cohérence au sein de tous les développeurs
.

## Configuration

Les fichiers de migration de la base de données sont stockés dans le dossier `database/migrations`. Vous pouvez configurer les informations de connexion à la base de données
dans le fichier `config/database.go`. Currently, there are two drivers available for migrations: Go
language migration and SQL migration. Cependant, la migration SQL sera supprimée dans les futures versions.

```go
// Drivers: "default", "sql"
"migrations": map[string]any{
  "driver": "default",
  // Vous pouvez cumstomiser le nom de la table des migrations
  "table": "migrations",
},
```

## Créer des migrations

Utilisez la commande `make:migration` pour créer la migration :

```shell
exécutez . artisan make:migration create_users_table
```

Cette commande va générer des fichiers de migration dans le dossier `database/migrations`. Chaque fichier de migration commencera par un horodatage
que Goravel utilisera pour déterminer l'ordre d'exécution des fichiers de migration.

### Créer rapidement

Utilisez `create_users_table` pour générer automatiquement une table contenant l'infrastructure de `users`:

```
^create_(\w+)_table$
^create_(\w+)$
```

Utilisez `add_avatar_to_users_table` pour générer automatiquement une structure pour ajouter des champs à la table `users`:

```
_(à|depuis|en)_(\w+)_table$
_(à|depuis|en)_(\w+)$
```

Si les conditions ci-dessus ne sont pas identiques, le framework générera un fichier de migration vide.

## Structure de migration

### Migration des langues

La structure de migration contient deux méthodes : `Up` et `Down`. La méthode `Up` est utilisée pour ajouter de nouvelles tables, colonnes, ou
à la base de données, alors que la méthode `Down` est utilisée pour annuler les opérations effectuées par la méthode `Up`. In these
two methods, you can use `facades.Schema()` to create and operate database tables. Pour les méthodes disponibles, voir
the [documentation](#tables). La migration suivante va créer une table `users`:

```go
migrations de package

import (
 "github.com/goravel/framework/contracts/database/schema"
 "github. om/goravel/framework/facades"
)

type M202412095921CreateUsersTable struct {
}

// Signature La signature unique pour la migration.
func (r *M20241207095921CreateUsersTable) Signature() string {
 return "20241207095921_create_users_table"
}

// Run the migrations.
func (r *M20241207095921CreateUsersTable) Erreur {
 if !facades. chema().HasTable("users") {
  return facades.Schema().Create("users", func(table schema.Blueprint) {
   table. D()
   table.String("name").Nullable()
   table.String("email").Nullable()
   . imestamps()
  })
 }

 return nil
}

// Bas inverse les migrations.
func (r *M20241207095921CreateUsersTable) Down() erreur {
 return facades.Schema().DropIfExists("users")
}
```

#### Définir la connexion à la migration

If the migration will interact with a database connection other than the application's default database connection, you
should use the migration's `Connection` method:

```go
func (r *M20241207095921CreateUsersTable) Connection() string {
  return "connection-name"
}
```

### Migration SQL

La commande de migration va générer deux fichiers de migration : `***.up.sql` et `***.down.sql`, correspondant respectivement à l'exécution et à l'annulation
. Vous pouvez écrire des requêtes SQL directement dans ces deux fichiers.

```sql
-- ***.up. ql
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  CLÉ PRIMARY (`id`)
) ENGINE=InnoDB DÉFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ***. own.sql
DROP TABLE `utilisateurs`;
```

## Enregistrez les Migrations

Lorsque vous utilisez les migrations de langue Go, vous devez enregistrer les fichiers de migration dans le fichier `database/kernel.go` après la génération des fichiers de migration
:

```go
// database/kernel.go
func (kernel Kernel) Migrations() []schema.Migration {
 return []schema.Migration{
  &migrations.M202412095921CreateUsersTable{},
 }
}
```

Les migrations SQL n'ont pas besoin d'être enregistrées, car le framework va automatiquement analyser les fichiers SQL dans le répertoire
`database/migrations`.

## Exécuter les migrations

Pour exécuter toutes vos migrations en cours, exécutez la commande `migrate` Artisan:

```shell
allez exécuter. Migration d'artisan
```

Si vous souhaitez voir quelles migrations ont été exécutées jusqu'à présent, vous pouvez utiliser la commande Artisan `migrate:status` :

```shell
aller exécuter. artisan migrate:status
```

## Rouler les migrations

Pour annuler la dernière migration, utilisez la commande `rollback` Artisan. Cette commande annule le le dernier "batch" des migrations
, qui peuvent inclure plusieurs fichiers de migration :

```shell
allez exécuter. artisan migrate:rollback
```

Vous pouvez annuler un nombre limité de migrations en fournissant l'option `step` à la commande `rollback`. Par exemple,
la commande suivante annulera les cinq dernières migrations :

```shell
allez exécuter . migrate:rollback --step=5
```

La commande `migrate:reset` annulera toutes les migrations de votre application:

```shell
aller exécuter. artisan migrate:reset
```

### Rouler et Migrer en utilisant une seule commande

La commande `migrate:refresh` annulera toutes vos migrations et exécutera la commande `migrate`. Cette commande
recrée effectivement toute votre base de données :

```shell
allez exécuter. artisan migrate:refresh
```

Vous pouvez annuler et re-migrer un nombre limité de migrations en fournissant l'option `step` à la commande `refresh`.
Par exemple, la commande suivante va revenir en arrière et re-migrer les cinq dernières migrations :

```shell
allez exécuter . artisan migrate:refresh --step=5
```

### Lâcher toutes les tables et migrer

La commande `migrate:fresh` supprimera toutes les tables de la base de données et exécutera la commande `migrate`:

```shell
allez exécuter. artisan migrate:fresh
```

## Tables

### Créer une table

```go
facades.Schema().Create("users", func(table schema.Blueprint) {
  table.ID()
  table.String("name").Nullable()
  table.String("email").Nullable()
  table.Timestamps()
})
```

### Vérifier si la table / colonne existe

```go
if facades.Schema().HasTable("users") {}
if facades.Schema().HasColumn("users", "email") {}
if facades.Schema().HasColumns("users", []string{"name", "email"}) {}
if facades.Schema().HasIndex("users", "email_unique") {}
```

### Connexion à la base de données

```go
facades.Schema().Connection("sqlite").Create("users", func(table schema.Blueprint) {
  table.ID()
})
```

### Mettre à jour la table

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

### Renommer / Supprimer la table

```go
facades.Schema().Renommer ("users", "new_users")
facades.Schema().Drop("users")
facades.Schema().DropIfExists("users")

```

## Colonnes

### Types de colonnes disponibles

|                       |                             |                                                    |                             |
| --------------------- | --------------------------- | -------------------------------------------------- | --------------------------- |
| Incréments importants | BigInteger                  | Boolean                                            | Caractère                   |
| Date                  | DateHeure                   | Date et heure                                      | Décimal                     |
| Double                | [Enum](#enum)               | Flottant                                           | [ID](#id)                   |
| Incréments            | Nombre entier               | Incréments entiers                                 | Json                        |
| Incréments            | LongText                    | Incréments moyens                                  | MediumInteger               |
| Texte moyen           | Incréments de petite taille | Petit entier                                       | [SoftDeletes](#softdeletes) |
| Supprimer les Tz      | Chaîne de caractères        | Texte du texte                                     | Date et heure               |
| TimeTz                | Horodatage                  | Horodatage                                         | Horodatage Tz               |
| Horodatage            | UnsignedBigInteger          | format@@0 TinyIncrements | TinyInteger                 |
| TinyText              | UnsignedInteger             | UnsignedMediumInteger                              | UnsignedSmallInteger        |
| UnsignedTinyInteger   |                             |                                                    |                             |

#### Enum

Crée un champ `Enum` qui peut être stocké dans `Mysql` selon le type dans `[]any`, mais dans les bases de données `Postgres`, `Sqlite`, et
`Sqlserver`, c'est un type `String`.

```go
table.Enum("difficulté", []any{"easy", "hard"})
table.Enum("num", []any{1, 2})
```

#### ID

La méthode `ID` est un alias pour la méthode `BigIncrements`. Par défaut, cette méthode créera une colonne `id`; Cependant,
si vous souhaitez attribuer un nom différent à la colonne, vous pouvez passer le nom de la colonne:

```go
table.ID()
table.ID("user_id")
```

#### Le logiciel supprime

La méthode `SoftDeletes` ajoute une colonne `deleted_at` `TIMESTAMP`. Cette colonne est destinée à stocker l'horodatage
`deleted_at` requis pour la fonction Orm "suppression douce" :

```go
SoftDeletes()
```

#### Colonne personnalisée

Si vous utilisez des types de colonnes que le framework ne supporte pas encore, vous pouvez utiliser la méthode `Colonne` pour personnaliser le type de champ
:

```go
table.Column("géométrie", "géométrie")
```

### Modificateurs de colonnes

En plus des types de colonnes listés ci-dessus, lors de l'ajout d'une colonne à une table de base de données, vous pouvez également ajouter "modificateurs" à
la colonne. Par exemple, pour permettre à une colonne d'être "nullable", vous pouvez utiliser la méthode `Nullable` :

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.String("name").Nullable()
})
```

La table suivante contient tous les modificateurs de colonnes disponibles:

| Modifié                      | Libellé                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.AutoIncrement()`           | Définit une colonne entière comme auto-incrémentation (clé primaire)                                                                             |
| `.Comment("mon commentaire)` | Ajoute un commentaire à la colonne (MySQL / PostgreSQL)                                                                                          |
| `.Default(value)`            | Définit la valeur par défaut de la colonne                                                                                                                          |
| `.Nullable()`                | Permet d'insérer des valeurs NULL dans la colonne                                                                                                                   |
| `.Unsigned()`                | Définit une colonne entière comme UNSIGNED (MySQL uniquement)                                                                                    |
| `.UseCurrent()`              | Définit une colonne timestamp pour utiliser CURRENT_TIMESTAMP comme valeur par défaut                                                          |
| `.UseCurrentOnUpdate()`      | Définit une colonne d'horodatage pour utiliser CURRENT_TIMESTAMP lorsque l'enregistrement est mis à jour (MySQL uniquement) |

### Lâcher la colonne

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropColumn("name")
  table.DropColumn("name", "age")
})
```

## Indexations

### Créer un index

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  // Ajoute la table de la clé primaire
  . rimary("id")
  // Ajoute une clé primaire composite
  table.Primary("id", "name")

  // Ajoute une table d'index
  unique. nique("name")
  table.Unique("name", "age")

  // Ajoute la table normale
  table.Index("name")
  . ndex("name", "age")

  // Ajoute l'index fulltext
  table.FullText("name")
  table.FullText("name", "age")
})
```

### Renommer l'index

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.RenameIndex("users_name_index", "users_name")
})
```

### Indice de Dépose

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropPrimary("id")
  table.DropUnique("name")
  table.DropUniqueByName("name_unique")
  table.DropIndex("name")
  table.DropIndexByName("name")
  table.DropFullText("name")
  table.DropFullTextByName("name_fulltext")
})
```

### Créer une clé étrangère

```go
facades.Schema().Table("posts", func(table schema.Blueprint) {
  table.UnsignedBigInteger("user_id")
  table.Foreign("user_id").References("id").On("users")
})
```

### Abandonner la clé étrangère

```go
facades.Schema().Table("users", func(table schema.Blueprint) {
  table.DropForeign("user_id")
  table.DropForeignByName("user_foreign")
})
```
