# Commencer

Goravel facilite l'interaction avec les bases de données en utilisant `facades.Orm()`. Actuellement, il fournit le support officiel
pour les quatre bases de données suivantes :

- MySQL 5.7+
- PostgreSQL 9.6+
- SQLite 3.8.8+
- Serveur SQL 2017+

Avant de commencer, configurez la base de données dans `.env` et confirmez la configuration `default` dans `config/database.go`.

# Configuration

Pour configurer les bases de données, accédez à `config/database.go`. C'est là que vous pouvez personnaliser toutes les connexions à la base de données et
choisir une connexion `default`. La configuration de ce fichier repose sur les variables d'environnement du projet et
présente diverses configurations de base de données supportées par Goravel.

### DSN

Vous pouvez également utiliser DSN pour vous connecter directement à la base de données, il suffit de configurer le champ `dsn` dans le fichier de configuration :

```go
"postgres": map[string]any{
  "driver": "postgres",
++ "dsn": "postgres://user:password@localhost:5432/dbname?sslmode=disable",
  ...
}
```

### Connexions en lecture et écriture

Parfois, vous pouvez utiliser une connexion à une base de données pour les requêtes `SELECT`, et une autre pour les instructions `INSERT`, `UPDATE`, et
`DELETE`. Goravel fait de cela une brise.

Pour voir comment les connexions en lecture/écriture doivent être configurées, regardons cet exemple :

```go
import "github.com/goravel/framework/contracts/database"

// config/database. o
"connections": map[string]any{
  "mysql": map[string]any{
    "driver": "mysql",
    "lu" : []base de données. onfig{
      {Host: "192.168.1. ", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "write": []database. onfig{
      {Host: "192.168.1. ", Port: 3306, Database: "forge", Username: "root", Password: "123123"},
    },
    "host": config. nv("DB_HOST", "127.0.0.1"),
    "port": config.Env("DB_PORT", 3306),
    "database": config. nv("DB_DATABASE", "forge"),
    "username": config.Env("DB_USERNAME", ""),
    "password": config. nv("DB_PASSWORD", ""),
    "charset": "utf8mb4",
    "loc": "Local",
  },
}
```

Nous avons mis à jour le tableau de configuration avec deux nouvelles clés - `read` et `write`. La connexion `read` utilisera
`192.168.1.1` comme hôte, tandis que la connexion `write` utilisera `192.168.1.2`. Les deux connexions partageront le même préfixe de la base de données
, le jeu de caractères et d'autres options spécifiées dans le tableau mysql principal. Dans le cas de plusieurs valeurs dans le tableau de configuration
`host`, un hôte de base de données sera sélectionné aléatoirement pour chaque requête.

### Pool de connexion

Vous pouvez configurer un pool de connexions dans le fichier de configuration, une configuration raisonnable des paramètres du pool de connexions
peut grandement améliorer les performances simultanées:

| Clés                                                         | Action                                    |
| ------------------------------------------------------------ | ----------------------------------------- |
| max_inactifs_conns | Nombre maximum de connexions inactives    |
| max_open_conns     | Nombre maximum de connexions ouvertes     |
| Temps max d'inactivité                                       | Temps maximum d'inactivité des connexions |
| Durée de vie maximale du pool                                | Durée de vie max des connexions           |

### Schéma

Postgres et Sqlserver supportent la configuration Schema. Postgres peut directement définir le Schéma dans le fichier de configuration, tandis que
Sqlserver doit spécifier le Schéma via la méthode `TableName` dans le modèle.

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
func (r *User) Chaîne TableName() {
  retourne "goravel.users"
}
```

### Obtenir des informations sur la base de données

Vous pouvez utiliser la commande `db:show` pour afficher toutes les tables dans la base de données.

```bash
exécutez . artisan db:show
```

Vous pouvez également utiliser la commande `db:table` pour afficher la structure d'une table spécifique.

```bash
aller exécuter. artisan db:table
go run . artisan db:table users
```

## Définition du modèle

Pour créer un modèle personnalisé, reportez-vous au fichier de modèle `app/models/user.go` qui est inclus dans le cadre. Le `struct`
dans `app/models/user.go` contient deux frameworks: `orm.Model` et `orm.SoftDeletes`. Ces frameworks définissent les propriétés
`id`, `created_at`, `updated_at` et `deleted_at` respectivement. Avec `orm.SoftDeletes`, vous pouvez activer la suppression soft
pour le modèle.

### Modèle de convention

1. Le modèle est nommé avec une grosse bosse ;
2. Utiliser la forme plurielle du modèle "nom de serpent" comme nom de la table ;

Par exemple, le nom du modèle est `UserOrder`, et le nom de la table est `user_orders`.

### Créer un modèle

Utilisez la commande `make:model` pour créer un modèle:

```shell
exécutez . artisan make:model User
go run . artisan make:model user/User
```

Le fichier modèle créé est situé dans le fichier `app/models/user.go`, le contenu est le suivant :

```go
modèle de paquet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Chaîne de nom
  Chaîne d'avatar
  orm.SoftDeletes
}
```

Si vous voulez définir le champ du modèle à `any`, vous devez ajouter un tag supplémentaire: `gorm:"type:text"`:

```go
type User struct {
  orm.Model
  Name string
  Avatar string
  Détail n'importe quel `gorm:"type:text"`
  orm.SoftDeletes
}
```

Plus de détails sur l'utilisation des balises peuvent être trouvés dans: <https://gorm.io/docs/models.html>.

### Spécifier le nom de la table

```go
modèle de paquet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Chaîne de nom
  Chaîne d'avatar
  orme. oftDeletes
}

func (r *User) TableName() string {
  return "goravel_user"
}
```

### Connexions à la base de données

Par défaut, tous les modèles utilisent la connexion par défaut de la base de données configurée pour votre application. Si vous souhaitez spécifier une connexion
distincte à utiliser lors de l'interaction avec un modèle particulier, vous devez définir une méthode `Connection` sur le modèle
.

```go
modèle de paquet

import (
  "github.com/goravel/framework/database/orm"
)

type User struct {
  orm. odel
  Chaîne de nom
  Chaîne d'avatar
  orme. oftDeletes
}

func (r *User) Connection() string {
  return "postgres"
}
```

## facades.Orm() fonctions disponibles

| Nom          | Action                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Raccordement | [Spécifier la connexion à la base de données](#specify-database-connection)                         |
| BD           | [Interface de base de données générique sql.DB](#generic-database-interface-sql-db) |
| Requête      | [Obtenir l'instance de la base de données](#get-database-instance)                                  |
| Opération    | [Transaction](#transaction)                                                                         |
| Contexte     | [Contexte d'injection](#inject-context)                                                             |

## facades.Orm().Query() fonctions disponibles

| Fonctions                     | Action                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commencer                     | [Commencer la transaction](#transaction)                                                                                                                      |
| Valider                       | (#transaction)                                                                                                                             |
| Compter                       | [Count](#count)                                                                                                                                               |
| Créer                         | [Create](#create)                                                                                                                                             |
| Cursor                        | [Cursor](#cursor)                                                                                                                                             |
| Supprimez                     | [Delete](#delete)                                                                                                                                             |
| Distingué                     | [Filtre répétition](#filter-repetition)                                                                                                                       |
| Chauffeur                     | [Get Driver](#get-driver)                                                                                                                                     |
| Exec                          | [Exécuter la mise à jour native SQL](#execute-native-update-sql)                                                                                              |
| Existe                        | [Exists](#exists)                                                                                                                                             |
| Chercher                      | [Requérir une ou plusieurs lignes par ID](#query-one-or-multiple-lines-by-id)                                                                                 |
| Trouver ou échouer            | [Erreur de retour non trouvée](#not-found-return-error)                                                                                                       |
| Premier                       | [Requérir une ligne](#query-one-line)                                                                                                                         |
| Premier ou                    | [Requête ou retour de données via callback] (#query-one-line)                          |
| Première ou première création | [Récupération ou création de modèles](#retrieving-or-creating-models)                                                                                         |
| Premier ou nouveau            | [Récupération ou de nouveaux modèles](#retrieving-or-creating-models)                                                                                         |
| Premier ou échec              | [Erreur non trouvée](#not-found-error)                                                                                                                        |
| Forcer la suppression         | [Forcer la suppression](#delete)                                                                                                                              |
| Obtenir                       | [Requête de plusieurs lignes](#query-multiple-lines)                                                                                                          |
| Groupes                       | [Group](#group-by--having)                                                                                                                                    |
| Avoir                         | [Having](#group-by-having)                                                                                                                                    |
| Rejoindre                     | [Join](#join)                                                                                                                                                 |
| Limite                        | [Limit](#limit)                                                                                                                                               |
| LockForUpdate                 | [Verrouillage pessimistique] (#pessimistic-locking)                                    |
| Modélisation                  | [Spécifier un modèle](#specify-table-query)                                                                                                                   |
| Décalage                      | [Offset](#offset)                                                                                                                                             |
| Commandes                     | [Order](#order)                                                                                                                                               |
| Ordonner par                  | [Order](#order)                                                                                                                                               |
| OrderByDesc                   | [Order](#order)                                                                                                                                               |
| Dans l'ordre aléatoire        | [Order](#order)                                                                                                                                               |
| Ou où                         | [OrWhere](#where)                                                                                                                                             |
| Ou pas dans                   | [OrWhereNotIn](#where)                                                                                                                                        |
| OrWhereNull                   | [OrWhereNull](#where)                                                                                                                                         |
| OuiIn                         | [OrWhereIn](#where)                                                                                                                                           |
| Paginer                       | [Paginate](#paginate)                                                                                                                                         |
| Pousse                        | [Requête d'une seule colonne](#query-single-column)                                                                                                           |
| Brute                         | [Exécuter SQL] (#execute-native-sql)                                                   |
| Restaurer                     | [Restore](#restore)                                                                                                                                           |
| Rollback                      | [Rollback transaction](#transaction)                                                                                                                          |
| Enregistrer                   | (#update-a-existing-model)                                                                                                                 |
| Enregistrer discrètement      | [Enregistrer un modèle unique sans événements] (#saving-a-single-model-without-events) |
| Analyser                      | [Scan struct](#execute-native-sql)                                                                                                                            |
| Portées                       | [Scopes](#scopes)                                                                                                                                             |
| Sélectionner                  | [Spécifier les champs](#specify-fields)                                                                                                                       |
| Verrou partagé                | [Verrouillage pessimistique] (#pessimistic-locking)                                    |
| Sum                           | [Sum](#sum)                                                                                                                                                   |
| Tableau                       | [Spécifier une table](#specify-table-query)                                                                                                                   |
| ToSql                         | [Get SQL](#get-sql)                                                                                                                                           |
| ToRawSql                      | [Get SQL](#get-sql)                                                                                                                                           |
| Mise à jour                   | [Mettre à jour une seule colonne] (#update-a-single-column)                            |
| Mettre à jour ou créer        | [Mettre à jour ou créer](#update-or-create)                                                                                                                   |
| Où se trouve                  | [Where](#where)                                                                                                                                               |
| Où entre-temps                | [WhereBetween](#where)                                                                                                                                        |
| Où, pas entre                 | [WhereNotBetween](#where)                                                                                                                                     |
| N'est pas dans                | [WhereNotIn](#where)                                                                                                                                          |
| OùNull                        | [WhereNull](#where)                                                                                                                                           |
| Où dans                       | [WhereIn](#where)                                                                                                                                             |
| Sans événements               | [Événements muets](#muting-events)                                                                                                                            |
| Retrait de la corbeille       | [Interrogation soft delete data](#query-soft-delete-data)                                                                                                     |

## Constructeur de requêtes

### Contexte d'injection

```go
facades.Orm().WithContext(ctx)
```

### Spécifier la connexion à la base de données

Si plusieurs connexions de base de données sont définies dans `config/database.go`, vous pouvez les utiliser via la fonction `Connection`
de `facades.Orm()`. Le nom de connexion passé à `Connection` devrait être une des connexions configurées dans
`config/database.go`:

```go
facades.Orm().Connection("mysql")
```

### Interface de base de données générique sql.DB

Interface de base de données générique sql.DB, puis utilisez la fonctionnalité qu'elle fournit :

```go
db, err := facades.Orm().DB()
db, err := facades.Orm().Connection("mysql").DB()

// Ping
db.Ping()

// Fermer
db. lose()

// Retourne les statistiques de la base de données
db.Stats()

// SetMaxIdleConns définit le nombre maximum de connexions dans le pool de connexion inactif
db. etMaxIdleConns(10)

// SetMaxOpenConns définit le nombre maximal de connexions ouvertes à la base de données
db. etMaxOpenConns(100)

// SetConnMaxLifetime définit le temps maximum qu'une connexion peut être réutilisée
db.SetConnMaxLifetime(time.Hour)
```

### Obtenir l'instance de la base de données

Avant chaque opération spécifique de base de données, il est nécessaire d'obtenir une instance de la base de données.

```go
facades.Orm().Query()
facades.Orm().Connection("mysql").Query()
facades.Orm().WithContext(ctx).Query()
```

### Sélectionner

#### Requérir une ligne

```go
var user models.User
facades.Orm().Query().First(&user)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1;
```

Parfois, vous pouvez effectuer une autre action si aucun résultat n'est trouvé. La méthode `FirstOr` retournera une seule instance de modèle
ou, si aucun résultat n'est trouvé, exécutera la fermeture donnée. Vous pouvez définir des valeurs sur le modèle dans la fermeture:

```go
facades.Orm().Query().Where("name", "first_user").FirstOr(&user, func() erreur {
  user.Name = "goravel"

  return nil
})
```

#### Requête d'une ou de plusieurs lignes par ID

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
// SELECT * FROM `users` WHERE `users`.`id` = 1;

var users []models. ser
facades.Orm().Query().Find(&users, []int{1,2,3})
// SELECT * FROM `users` WHERE `users`.`id` IN (1,2,3);
```

#### Erreur de retour non trouvée

```go
var models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
```

#### Lorsque la clé primaire de la table utilisateur est de type `string`, vous devez spécifier la clé primaire lors d'un appel

Méthode `Rechercher`

```go
var user models.User
facades.Orm().Query().Find(&user, "uuid=?" ,"a")
// SELECT * FROM `users` WHERE `users`.`uuid` = "a";
```

#### Requête de plusieurs lignes

```go
var utilisateurs []models.User
facades.Orm().Query().Where("id in ?", []int{1,2,3}).Get(&users)
// SELECT * FROM `users` WHERE id in (1,2,3);
```

#### Récupération ou création de modèles

La méthode `FirstOrCreate` recherche un enregistrement de base de données en utilisant les paires de colonnes/valeurs spécifiées. Si le modèle ne peut être
trouvé dans la base de données, il crée un nouvel enregistrement avec les attributs à partir de la fusion du premier argument avec le second argument facultatif
.

De même, la méthode `FirstOrNew` essaie également de localiser un enregistrement dans la base de données en fonction des attributs donnés. Cependant,
si elle n'est pas trouvée, une nouvelle instance du modèle est retournée. It's important to note that this new model has not been
saved to the database yet and you need to manually call the `Save` method to do so.

```go
var user models.User
facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`) VALUES ('2023-09-18 12:51:32. 56','2023-09-18 12:51:32.556','tom');

facades.Orm().Query().Where("gender", 1).FirstOrCreate(&user, models.User{Name: "tom"}, modèles. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`name`,`avatar`) VALUES ('2023-09-18 12:52:59.913','2023-09-18 12:52:52:59.913','tom','avatar');

var user models. ser
facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`. name` = 'tom' ORDER BY `users`.`id` LIMIT 1;

facades.Orm().Query().Where("gender", 1).FirstOrNew(&user, models.User{Name: "tom"}, modèles. ser{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `gender` = 1 AND `users`.`name` = 'tom' ORDER BY `users`.`id` LIMIT 1;
```

#### Erreur introuvable

Lorsque l'élément demandé n'est pas trouvé, la méthode `First` ne génère pas d'erreur. Pour générer une erreur, utilisez la méthode
`FirstOrFail` :

```go
var user models.User
err := facades.Orm().Query().FirstOrFail(&user)
// err == orm.ErrRecordNotFound
```

### Où se trouve

```go
facades.Orm().Query().Where("name", "tom")
facades.Orm().Query().Where("name = 'tom'")
facades.Orm().Query().Where("name = ?", "tom")
facades.Orm().Query().WhereBetween("age", 1, 10)
facades.Orm().Query().WhereNotBetween("age", 1, 10)
facades.Orm().Query().WhereNotIn("name", []any{"a"})
façades. rm().Query().WhereNull("name")
facades.Orm().Query().WhereIn("name", []any{"a"})

facades.Orm().Query().OrWhere("name = ?", "tom")
facades.Orm().Query().OrWhereNotIn("name", []any{"a"})
facades.Orm().Query().OrWhereNull("name")
facades.Orm().Orm().OrWhereIn("name", []any{"a"})
```

### Limite

```go
var utilisateurs []models.User
facades.Orm().Query().Where("name = ?", "tom").Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3;
```

### Décalage

```go
var utilisateurs []models.User
facades.Orm().Query().Where("name = ?", "tom").Offset(5).Limit(3).Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' LIMIT 3 OFFSET 5;
```

### Commandes

```go
var utilisateurs []models.User
facades.Orm().Query().Where("name = ?", "tom").Order("sort asc").Order("id desc"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc,id desc;

facades. rm().Query().Where("name = ?", "tom").OrderBy("sort").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort asc;

facades.Orm().Query().Where("name = ?", "tom"). rderBy("sort", "desc").Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query().Where ("name = ?", "tom").OrderByDesc("sort"). et(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY sort desc;

facades.Orm().Query(). here("name = ?", "tom").InRandomOrder().Get(&users)
// SELECT * FROM `users` WHERE name = 'tom' ORDER BY RAND();
```

### Paginer

```go
var utilisateurs []models.User
var total int64
facades.Orm().Query(). aginate(1, 10, &users, &total)
// SELECT count(*) FROM `users`;
// SELECT * FROM `users` LIMIT 10;
```

### Requête colonne simple

```go
var ages []int64
facades.Orm().Query().Model(&models.User{}).Pluck("age", &ages)
// SELECT `age` FROM `users`;
```

### Spécifier la requête de table

Si vous voulez interroger des données d'agrégat, vous devez spécifier une table spécifique.

Spécifier un modèle

```go
var count int64
facades.Orm().Query().Model(&models.User{}).Count(&count)
// SELECT count(*) FROM `users` WHERE deleted_at IS NULL;
```

Spécifier une table

```go
var count int
facades.Orm().Query().Table("users").Count(&count)
// SELECT count(*) FROM `users`; // récupère tous les enregistrements, qu'ils soient supprimés ou non
```

### Get SQL

Récupérer SQL avec un placeholder:

```go
facades.Orm().Query().ToSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = $1 AND "users"."deleted_at" IS NULL
```

Obtenir SQL avec la valeur :

```go
facades.Orm().Query().ToRawSql().Get(models.User{})
// SELECT * FROM "users" WHERE "id" = 1 AND "users"."deleted_at" IS NULL
```

Les méthodes peuvent être appelées après `ToSql` et `ToRawSql`: `Count`, `Create`, `Delete`, `Find`, `First`, `Get`, `Pluck`,
`Save`, `Sum`, `Update`.

### Compter

```go
var count int64
facades.Orm().Query().Table("users").Where("name = ?", "tom").Count(&count)
// SELECT count(*) FROM `users` WHERE name = 'tom';
```

### Spécifier les champs

`Select` vous permet de spécifier quels champs récupérer de la base de données, par défaut, l'ORM récupère tous les champs.

```go
facades.Orm().Query().Select("name", "age").Get(&users)
// SELECT `name`,`age` FROM `users`;

facades.Orm().Query().Select([]string{"name", "age"}).Get(&users)
// SELECT `name`,`age` FROM `users`;
```

### Grouper par & Avoir

```go
type Result struct {
  Name string
  Total int
}

var result Result
facades.Orm().Query().Model(&models.User{}). elect("name, sum(age) as total").Group("name").Having("name = ?", "tom").Get(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "tom";
```

### Rejoindre

```go
type Result struct {
  Name string
  Email string
}

var result Result
facades.Orm().Query().Model(&models.User{}).Select("users. ame, emails.email").Join("a quitté les e-mails de jointure sur emails.user_id = users.id").Scan(&result)
// SELECT users.name, emails.email FROM `users` LEFT JOIN emails ON emails.user_id = users.id;
```

### Créer

```go
user := models.User{Name: "tom", Âge: 18}
err := facades.Orm().Query(). reate(&user)
// INSERT INTO users (name, age, created_at, updated_at) VALUES ("tom", 18, "2022-09-27 22:00:00", "2022-09-27 22:00:00");

// Ne pas déclencher les événements de modèle
err := façades. rm().Query().Table("users").Create(map[string]any{
  "name": "Goravel",
})

// Déclencher les événements de modèle
err := facades. rm().Query().Modèle(&models.User{}).Créer(mapper[string]any{
  "name": "Goravel",
})
```

### Création multiple

```go
users := []models.User{{Name: "tom", Âge: 18}, {Name: "tim", Âge: 19}}
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

> `created_at` et `updated_at` seront remplis automatiquement.

### Cursor

Peut être utilisé pour réduire considérablement la consommation de mémoire de votre application lors de l'itération à travers des dizaines de milliers d'enregistrements de modèles
Eloquents. Notez que la méthode `Curseur` peut être utilisée avec `With` en même temps, veuillez
utiliser [Lazy Eager Loading](./relationships#lazy-eager-loading) pour charger la relation dans la logique `for`.

```go
curseur, err := facades.Orm().Query().Model(models.User{}).Cursor()
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

### Enregistrer le modèle

#### Mettre à jour un modèle existant

```go
var user models.User
facades.Orm().Query().First(&user)

user.Name = "tom"
user.Age = 100
facades.Orm().Query(). ave(&user)
// UPDATE `users` SET `created_at`='2023-09-14 16:03:29.454',`updated_at`='2023-09-18 21:05:59.896',`name`='tom',`age`=100,`avatar`='' WHERE `id` = 1;
```

#### Mettre à jour les colonnes

```go
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update("name", "hello")
// UPDATE `users` SET `name`='hello',`updated_at`='2023-09-18 21:06:30.373' WHERE `name` = 'tom';

facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(modèles. ser{Name: "hello", Âge: 18})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Update(map[string]any{"name": "hello", "age": 18})
// UPDATE `users` SET `updated_at`='2023-09-18 21:07:06.489',`name`='hello',`age`=18 WHERE `name` = 'tom';
```

> Lors de la mise à jour avec `struct`, Orm ne mettra à jour que les champs non nuls. Vous pouvez utiliser `map` pour mettre à jour les attributs ou
> utiliser `Select` pour spécifier les champs à mettre à jour. Notez que `struct` ne peut être que `Model`, si vous voulez mettre à jour avec non
> `Model`, vous devez utiliser `. able("users")`, cependant, le champ `updated_at` ne peut pas être mis à jour automatiquement à cette heure
> .

#### Mettre à jour ou créer

Requête par `name`, si elle n'existe pas, créez par `name`, `avatar`, si elle existe, mettez à jour `avatar` sur la base de `name`:

```go
facades.Orm().Query().UpdateOrCreate(&user, models.User{Name: "name"}, models.User{Avatar: "avatar"})
// SELECT * FROM `users` WHERE `users`.`name` = 'name' AND `users`.`deleted_at` IS NULL ORDER BY `users`. id` LIMIT 1;
// INSERT INTO `users` (`created_at`,`updated_at`,`deleted_at`,`name`,`avatar`) VALUES ('2023-03-11 10:11:08.869','2023-03-11 10:11:08. 69',NULL,'name','avatar');
// UPDATE `users` SET `name`='name',avatar`='avatar',`updated_at`='2023-03-11 10:11:08.881' WHERE users`.`deleted_at` IS NULL AND `id` = 1;
```

### Supprimez

Supprimer par modèle, le nombre de lignes affectées par la requête est retourné par la méthode :

```go
var user models.User
facades.Orm().Query().Find(&user, 1)
res, err := facades.Orm().Query().Delete(&user)
res, err := facades.Orm().Query().Model(&models.User{}). ici("id", 1).Delete()
res, err := facades.Orm().Query().Table("users").Where("id", 1).Delete()
// DELETE FROM `users` où `users`.`id` = 1;

num := res.RowsAffected
```

Suppression multiple

```go
facades.Orm().Query().Where("name = ?", "tom").Delete(&models.User{})
// DELETE FROM `users` WHERE name = 'tom';
```

Vous voulez forcer la suppression d'une donnée de suppression logicielle.

```go
facades.Orm().Query().Where("name", "tom").ForceDelete(&models.User{})
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").ForceDelete()
facades.Orm().Query().Table("users").Where("name", "tom").ForceDelete()
```

Vous pouvez supprimer des enregistrements avec des associations de modèles via `Select`:

```go
// Supprimer le compte utilisateur lors de la suppression de l'utilisateur
facades.Orm().Query().Select("Account").Delete(&user)

// Supprimer les commandes et les cartes de crédit de l'utilisateur lors de la suppression de l'utilisateur
facades.Orm().Query().Select("Orders", "CreditCards"). elete(&user)

// Supprime toutes les associations enfants de l'utilisateur lors de la suppression de l'utilisateur
facades.Orm().Query().Select(orm.Associations). elete(&user)

// Supprimer tous les comptes d'utilisateurs lors de la suppression des utilisateurs
facades.Orm().Query().Select("Compte").Supprimer(&users)
```

Note: Les associations ne seront supprimées que si la clé primaire de l'enregistrement n'est pas vide, et Orm utilise ces clés
primaires comme conditions pour supprimer les enregistrements associés:

```go
// Supprime l'utilisateur qui nom='goravel', mais ne supprime pas le compte de l'utilisateur
facades.Orm().Query().Select("Account").Where ("name = ?", "goravel"). elete(&models.User{})

// Supprime l'utilisateur que nom='goravel' et id = 1, et supprime le compte de l'utilisateur
façades. rm().Query().Select("Account").Where("name = ?", "goravel").Delete(&models.User{ID: 1})

// Supprimer l'utilisateur qui id = 1 et supprimer le compte de cet utilisateur
facades.Orm().Query().Select("Account").Delete(&models.User{ID: 1})
```

Si vous exécutez batch delete sans aucune condition, ORM ne le fait pas et renvoie une erreur. Vous devez donc ajouter quelques conditions
ou utiliser un SQL natif.

### Requête Soft Suppression de données

```go
var models.User
facades.Orm().Query().WithTrashed().First(&user)
```

### Filtrer la répétition

```go
var utilisateurs []models.User
facades.Orm().Query().Distinct("name").Find(&users)
```

### Obtenir le chauffeur

```go
driver := facades.Orm().Query().Driver()

// juge le pilote
if driver == orm.DriverMysql {}
```

### Exécuter le SQL natif

```go
type Result struct {
  ID int
  Name string
  Age int
}

var result Result
facades. rm().Query().Raw("SELECT id, name, age FROM utilisateurs WHERE name = ?", "tom").Scan(&result)
```

### Exécuter la mise à jour native SQL

Le nombre de lignes affectées par la requête est retourné par la méthode :

```go
res, err := facades.Orm().Query().Exec("DROP TABLE users")
// DROP TABLE `users`;

num := res.RowsAffected
```

### Existe

```go
var existe bool
facades.Orm().Query().Model(&models.User{}).Where("name", "tom").Exists(&exists)
```

### Restaurer

```go
facades.Orm().Query().WithTrashed().Restore(&models.User{ID: 1})
facades.Orm().Query().Model(&models.User{ID: 1}).WithTrashed().Restore()
// UPDATE `users` SET `deleted_at`=NULL WHERE `id` = 1;
```

### Opération

Vous pouvez exécuter une transaction par la fonction `Transaction`.

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

Vous pouvez également contrôler manuellement le flux de la transaction vous-même :

```go
tx, err := facades.Orm().Query().Begin()
user := models.User{Name: "Goravel"}
if err := tx. reate(&user); err != nil {
  err := tx.Rollback()
} else {
  err := tx.Commit()
}
```

### Portées

Vous permet de spécifier des requêtes couramment utilisées qui peuvent être référencées lorsque la méthode est appelée.

```go
func Paginator(chaîne de page, chaîne de limite) fonction(méthodes orm.Query) orm. uery {
  return func(query orm.Query) orm.Query {
    page, _ := strconv. toile(page)
    limite, _ := strconv. toi(limit)
    offset := (page - 1) * limite

    requête de retour. ffset(offset).Limit(limite)
  }
}

// scopes.Paginator est une fonction personnalisée: func(ormcontract.Query) ormcontract.Query
facades.Orm().Query().Scopes.Paginator(page, limit)).Find(&entries)
```

### Expressions brutes

Vous pouvez utiliser la méthode `db.Raw` pour mettre à jour les champs:

```go
import "github.com/goravel/framework/database/db"

facades.Orm().Query().Model(&user).Update("age", db.Raw("age - ?", 1))
// UPDATE `users` SET `age`=age - 1,`updated_at`='2023-09-14 14:03:20.899' WHERE `users`.`deleted_at` IS NULL AND `id` = 1;
```

### Verrouillage pessimiste

Le constructeur de requêtes inclut également quelques fonctions pour vous aider à atteindre le "verrouillage pessimistique" lors de l'exécution de vos instructions `select`
.

Pour exécuter une instruction avec un "verrou partagé", vous pouvez appeler la méthode `SharedLock`. Un verrou partagé empêche les lignes
sélectionnées d'être modifiées jusqu'à ce que votre transaction soit validée :

```go
var utilisateurs []models.User
facades.Orm().Query().Where("votes", ">", 100).SharedLock().Get(&users)
```

Alternativement, vous pouvez utiliser la méthode `LockForUpdate`. A "for update" lock prevents the selected records from being
modified or from being selected with another shared lock:

```go
var utilisateurs []models.User
facades.Orm().Query().Where("votes", ">", 100).LockForUpdate().Get(&users)
```

### Sum

```go
var somme int
if err := facades.Orm().Query().Model(models.User{}).Sum("id", &sum); err != nil {
  return err
}
fmt.Println(sum)
```

## Évènements

Les modèles Orm envoient plusieurs événements, vous permettant de vous connecter aux moments suivants dans le cycle de vie d'un modèle : `Retrieved`,
`Creating`, `Créé`, `Updating`, `Updated`, `Saving`, `Saved`, `Deleting`, `Deleted`, `ForceDeleting`, `ForceDeleted`,
`Restored`, `Restoring`.

L'événement `Retrieved` enverra lorsqu'un modèle existant est récupéré dans la base de données. Quand un nouveau modèle est sauvegardé pour
la première fois, les événements `Creating` et `Created` seront envoyés. The `Updating` / `Updated` events will dispatch when
an existing model is modified and the `Save` method is called. Les événements `Saving` / `Saved` seront envoyés lorsqu'un modèle
est créé ou mis à jour - même si les attributs du modèle n'ont pas été modifiés. Les noms d'événements se terminant par `-ing` sont
envoyés avant que toute modification du modèle ne soit maintenue, tant que les événements se terminant par `-ed` sont envoyés après la
les changements au modèle sont persistés.

Pour commencer à écouter les événements du modèle, définissez une méthode `DispatchesEvents` sur votre modèle. Cette propriété cartographie différents points
du cycle de vie du modèle à vos propres classes d'événement.

```go
import (
  contractsorm "github.com/goravel/framework/contracts/database/orm"
 "github.com/goravel/framework/database/orm"
)

type User struct {
 orm. odel
 Name string
}

func (u *User) DispatchesEvents() map[contractsorm.EventType]func(contractsorm. vent) erreur {
 retour carte[contractsorm.EventType]func(contractsorm.Event) erreur{
  contractsorm. ventCreating: func(event contractsorm.Event) erreur {
   return nil
  },
  contractsorm.EventCreated: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventSaving: func(event contractsorm. vent) erreur {
   return nil
  },
  contractsorm.EventSaved: func(event contractsorm.Event) error {
   return nil
  },
  contractsorm.EventUpdating: func(event contractsorm. vent) erreur {
   return nil
  },
  contractsorm.EventUpdate: func(événement contractsorm.Event) erreur {
   return nil
  },
  contractsorm. ventDeleting: func(event contractsorm.Event) erreur {
   return nil
  },
  contractsorm. ventDeleed: func(event contractsorm.Event) error {
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

> Note: Il vous suffit d'enregistrer les événements dont vous avez besoin. Les événements de modèles ne sont pas expédiés lorsque vous effectuez des opérations par lots via Orm.

### Observateurs

#### Définition des observateurs

Si vous écoutez plusieurs événements sur un modèle donné, vous pouvez utiliser des observateurs pour regrouper tous vos auditeurs en une seule classe
. Les classes d'observateur ont des noms de méthodes qui reflètent les événements Eloquent que vous souhaitez écouter. Chacune de ces méthodes
reçoit le modèle affecté comme son seul argument. The `make:observer` Artisan command is the easiest way to create a
new observer class:

```shell
exécutez . artisan make:observateur UserObserver
go run . artisan make:observateur user/UserObserver
```

Cette commande placera le nouvel observateur dans votre dossier `app/observers`. Si ce répertoire n'existe pas, Artisan
le créera pour vous. Votre nouvel observateur ressemblera à ce qui suit:

```go
les observateurs du paquet

import (
 "fmt"

 "github.com/goravel/framework/contracts/database/orm"
)

type UserObserver struct{}

func (u *UserObserver) Created(event orm. vent) error {
 return nil
}

func (u *UserObserver) Updated(event orm.Event) error {
 return nil
}

func (u *UserObserver) Deleted(event orm. vent) erreur {
 return nil
}

func (u *UserObserver) ForceDeleted(event orm.Event) erreur {
 return nil
}
```

L'observateur du modèle ne contient que des événements, vous pouvez ajouter d'autres événements en fonction de vos besoins.

Pour enregistrer un observateur, vous devez appeler la méthode `Observe` sur le modèle que vous souhaitez observer. Vous pouvez enregistrer
observateurs dans la méthode `Boot` de votre application `app/providers/event_service_provider.go::Boot` fournisseur de service :

```go
importateurs de paquets

(
 "github". om/goravel/framework/facades"

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

> Note: Si vous définissez `DispatchesEvents` et `Observer` en même temps, seuls `DispatchesEvents` seront appliqués.

#### Paramètre dans l'observateur

Le paramètre `event` sera passé à tous les observateurs :

| Méthode              | Action                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Contexte             | Récupère le contexte qui passe par `facades.Orm().WithContext()`                                                           |
| Attribut d'obtention | Récupère la valeur modifiée, si non modifiée, récupère la valeur originale, s'il n'y a pas de valeur originale, return nil |
| Obtenir l'original   | Récupère la valeur originale, s'il n'y a pas de valeur originale, retourne nil                                             |
| IsDirty              | Détermine si le champ est modifié                                                                                          |
| IsClean              | Inversion IsDirty                                                                                                          |
| Requête              | Obtenir une nouvelle requête, qui peut être utilisée avec la transaction                                                   |
| SetAttribute         | Définir une nouvelle valeur pour un champ                                                                                  |

### Événements en sourdine

Il se peut que vous ayez parfois besoin de « rendre muet » temporairement tous les événements déclenchés par un modèle. Vous pouvez y parvenir en utilisant la méthode
`WithoutEvents` :

```go
var models.User
facades.Orm().Query().WithoutEvents().Find(&user, 1)
```

#### Enregistrer un modèle unique sans événements

Parfois, vous pouvez vouloir "sauvegarder" un modèle donné sans envoyer aucun événement. Vous pouvez accomplir cela avec la méthode
`SaveQuietly`:

```go
var models.User
err := facades.Orm().Query().FindOrFail(&user, 1)
user.Name = "Goravel"
err := facades.Orm().Query().SaveQuietly(&user)
```
