# Relations

Il est courant que les tables de la base de données soient interconnectées. Par exemple, un article de blog peut avoir beaucoup de commentaires, ou une commande peut
être liée à l'utilisateur qui l'a placé. `Orm` simplifies managing and dealing with such relationships, and it can handle
various common relationships:

- [Une à un](#one-to-one)
- [Un à plusieurs](#one-to-many)
- [Beaucoup à plusieurs](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Définition des relations

### Un à un

Une relation individuelle est un type très basique de relation de base de données. Par exemple, un modèle `User` peut être associé à
avec un modèle `Phone`.

```go
type User struct {
  orm. odel
  Name string
  Phone *Phone
}

type Phone struct {
  orm. odel
  UserID uint
  Nommer la chaîne
}
```

Lors de l'utilisation de `Orm`, il assigne automatiquement la clé étrangère à la relation basée sur le nom du modèle parent. Pour une instance
, le modèle `Phone` est supposé avoir une clé étrangère `UserID` par défaut. Cependant, si vous souhaitez modifier cette convention
, vous pouvez ajouter une balise `foreignKey` au champ `Phone` dans le modèle `User`. (Cela s'applique également aux autres relations
. )

```go
type User struct {
  orm. odel
  Name string
  Phone *Phone `gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm. odel
  Chaîne de nom d'utilisateur
  Chaîne de nom
}
```

De plus, lorsque vous utilisez `Orm`, il est supposé que la clé étrangère doit correspondre à la colonne de clé primaire du parent.
Cela signifie que `Orm` recherchera la valeur de la colonne `ID` de l'utilisateur dans la colonne `UserId` de l'enregistrement `Phone`. Si vous
souhaitez utiliser une valeur de clé primaire autre que `ID`, vous pouvez ajouter une référence "Tag" au champ `Phone` dans le modèle `User`. Pour
faites cela, il suffit de passer un troisième argument à la méthode `hasOne`. (Les autres configurations de relations sont similaires.)

```go
type User struct {
  orm. odel
  Nom chaîne
  Téléphone *Téléphone `gorm:"foreignKey:UserName; eferences:name"`
}

type Phone struct {
  orm. odel
  Chaîne de nom d'utilisateur
  Chaîne de nom
}
```

#### Définition de l'inverse de la relation

Nous pouvons accéder au modèle `Phone` à partir de notre modèle `User`. Maintenant, nous devons établir une relation sur le modèle `Phone` que
nous permet d'accéder au propriétaire du téléphone. Pour cela, nous pouvons définir un champ `User` dans le modèle `Phone`.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  UserID uint
  Name string
  User *User
}
```

### Un à plusieurs

Une relation ponctuelle est utilisée pour définir des relations où un modèle unique est le parent d'un ou de plusieurs modèles enfants
. Par exemple, un article de blog peut avoir un nombre infini de commentaires. Comme toutes les autres relations `Orm`,
relations one-to-many sont définies en définissant un champ sur votre modèle `Orm`:

```go
type Post struct {
  orm. odel
  Name string
  Comments []*Commenter
}

type Comment struct {
  orm. odel
  PostID uint
  Nommer la chaîne
}
```

N'oubliez pas que `Orm` déterminera automatiquement la bonne colonne de clé étrangère pour le modèle `Comment`. Par convention, Orm
prendra le nom "bomp case" du modèle parent et le suffixera avec `ID`. Ainsi, dans cet exemple, Orm assumera que la colonne de la clé étrangère
sur le modèle `Comment` est `PostID`.

### Un à plusieurs (Inverse) / Appartient à

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent
post. Pour définir l'inverse d'une relation `One To Many`, définissez une méthode de relation sur le modèle enfant qui appelle
la méthode `belongsTo`:

```go
type Post struct {
  orm. odel
  Name string
  Comments []*Commenter
}

type Comment struct {
  orm. odel
  PostID uint
  Nommer chaîne
  Post *Post
}
```

## Beaucoup à de nombreuses relations

De nombreuses relations sont légèrement plus compliquées que les relations `One To One` et `One To Many`. Un exemple de relation
plusieurs à plusieurs est un utilisateur qui a de nombreux rôles et ces rôles sont également partagés par d'autres utilisateurs de l'application
. For example, a user may be assigned the role of "Author" and "Editor"; however, those roles may also be
assigned to other users as well. Ainsi, un utilisateur a plusieurs rôles et un rôle a beaucoup d'utilisateurs.

### Structure de table

Pour définir cette relation, trois tables de base de données sont nécessaires: `users`, `roles`, et `role_user`. La table
de nommage `role_user` peut être personnalisée et contient les colonnes `user_id` et `role_id`. Cette table est utilisée comme une table intermédiaire
liant les utilisateurs et les rôles.

Rappelez-vous qu'un rôle peut appartenir à de nombreux utilisateurs, nous ne pouvons pas simplement placer une colonne `user_id` dans la table `roles`. Ce
signifierait qu'un rôle ne peut appartenir qu'à un seul utilisateur. Afin de fournir un support pour les rôles assignés à
plusieurs utilisateurs, la table `role_user` est nécessaire. Nous pouvons résumer la structure de table de la relation comme ceci:

```
utilisateurs
  id - nombre entier
  - chaîne

rôles
  id - nom
  entier - chaîne

role_user
  user_id - entier
  role_id - entier
```

### Structure du modèle

Nous pouvons définir un champ `Roles` sur le modèle `User`:

```go
type User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Chaîne de nom
}
```

### Définition de l'inverse de la relation

Pour définir l'inverse de la relation, définissez juste un champ `Users` dans le modèle `Role` et ajoutez un tag.

```go
type User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Chaîne de nom
  Utilisateurs []*Utilisateur `gorm:"many2many:role_user"`
}
```

### Table intermédiaire personnalisée

En général, la clé étrangère de la table intermédiaire est nommée par le "snake case" du nom du modèle parent, vous pouvez remplacer
par `joinForeignKey`, `joinReferences`:

```go
type User struct {
  orm. odel
  Name string
  Rôles []*Rôle `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

type Role struct {
  orm. odel
  Chaîne de nom
}
```

Structure de la table :

```
utilisateurs
  id - nombre entier
  - chaîne

rôles
  id - nom
  entier - chaîne

role_user
  user_name - entier
  role_name - entier
```

## Métamorphose

Une relation polymorphique permet au modèle enfant d'appartenir à plus d'un type de modèle en utilisant une seule association.
Par exemple, imaginez que vous construisiez une application qui permet aux utilisateurs de partager des articles de blog et des vidéos. Dans une telle application
, un modèle `Comment` peut appartenir à la fois aux modèles `Post` et `Video`.

### Structure de la table

Une relation polymorphique est similaire à une relation normale ; cependant, le modèle enfant peut appartenir à plus d'un type de modèle
en utilisant une seule association. Par exemple, un blog `Post` et un `Utilisateur` peuvent partager une relation polymorphique avec un modèle `Image`
. L'utilisation d'une relation polymorphe vous permet d'avoir une seule table d'images uniques qui peut être associée aux messages
et aux utilisateurs. Tout d'abord, examinons la structure de la table :

```
posts
  id - entier
  nom - chaîne

vidéo
  id - nom de l'entier
  nom - chaîne

images
  id - entier
  url - chaîne
  imageable_id - entier
  imageable_type - chaîne

commentaires
  id - entier
  corps - texte
  commentable_id - entier
  commentable_type - chaîne
```

Notez les colonnes `imageable_id` et `imageable_type` sur la table `images`. La colonne `imageable_id` contiendra la valeur
ID du message ou de l'utilisateur, tandis que la colonne `imageable_type` contiendra le nom de la classe du modèle parent. La colonne
`imageable_type` est utilisée par Orm pour déterminer quel "type" du modèle parent retourner lors de l'accès à la relation
`imageable`. La table `commentaires` est similaire.

### Structure du modèle

Ensuite, examinons les définitions de modèles nécessaires pour construire cette relation:

```go
type Post struct {
  orm. odel
  Name string
  Image *Image `gorm:"polymorphic:Imageable"`
  Commentaires []*Comment `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm. odel
  Name string
  Image *Image `gorm:"polymorphic:Imageable"`
  Commentaires []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  Name string
  ImageableID uint
  ImageableType string
}

type Comment struct {
  orm. odel
  Name string
  CommentableID uint
  CommentableType string
}
```

Vous pouvez changer la valeur polymorphique par le tag `polymorphicValue`, tel que:

```go
type Post struct {
  orm.Model
  Name string
  Image *Image `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Interrogation des associations

Par exemple, imaginez une application de blog dans laquelle un modèle `Utilisateur` a de nombreux modèles `Post` associés:

```go
type User struct {
  orm. odel
  Name string
  Posts []*Post
}

type Post struct {
  orm. odel
  UserID uint
  Nommer la chaîne
}
```

### Créer ou mettre à jour des associations

Vous pouvez utiliser les méthodes `Select`, `Omit` pour contrôler la création et la mise à jour des associations. Ces deux méthodes ne peuvent pas être
utilisées en même temps et les fonctions de contrôle associées ne sont applicables qu'à `Create`, `Update`, `Save`:

```go
user := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Créer toutes les associations d'enfants en créant des façades utilisateur
. rm().Query().Select(orm.Associations).Create(&user)

// Créer uniquement un message lors de la création de l'utilisateur. Note: Si vous n'utilisez pas `orm.Associations`, mais que vous personnalisez les associations d'enfants séparément, tous les champs du modèle parent devraient également être listés en ce moment.
facades.Orm().Query().Select("Nom", "Posts"). reate(&user)

// Lors de la création d'un Utilisateur, ignorez le Post, mais créez toutes les autres associations d'enfants
facades.Orm().Query(). mit("Posts").Create(&user)

// Lors de la création de l'utilisateur, ignorez le champ Nom, mais créez toutes les facades
des associations enfants. rm().Query().Omit("Name").Create(&user)

// Lors de la création de l'utilisateur, ignorez le champ Nom et toutes les associations enfants
facades.Orm().Query().Omit("Name", orm.Associations).Create(&user)
```

### Trouver des associations

```go
// Trouver tous les enregistrements correspondants
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Trouver des associations avec les conditions
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Ajouter des associations

Ajouter de nouvelles associations pour `Many To Many`, `One To Many`, remplacer l'association actuelle par `One To One`,
`One To One(inverse)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Remplacer les associations

Remplacer les associations actuelles par les nouvelles :

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Supprimer les associations

Supprimer la relation entre la source et les arguments s'il existe, supprimer seulement la référence, ne supprimera pas ces objets de la base de données
, la clé étrangère doit être NULL :

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Effacer les associations

Supprimer toutes les références entre la source et l'association, ne supprimera pas ces associations :

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Nombre d'associations

Renvoie le nombre d'associations actuelles:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Compter avec les conditions
facades.Orm().Query().Model(&user).Où ("name = ?", "goravel").Association("Postes").Count()
```

### Données par lot

```go
// Trouver tous les rôles pour tous les utilisateurs
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Supprimer l'utilisateur A de tous les postes de l'utilisateur
façades. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Obtenir un nombre distinct de tous les postes d'utilisateurs
façades. rm().Query().Model(&users).Association("Posts"). ount()

// Pour `Ajouter`, `Remplacer` avec des données par lot, la longueur des arguments doit être égale à la longueur des données, sinon elle retournera une erreur
var users = []modèles. ser{user1, user2, user3}

// Nous avons 3 utilisateurs, ajouter un utilisateur à l'équipe de l'utilisateur1 ajouter un utilisateur B à l'équipe de l'utilisateur, ajouter un utilisateur A, un utilisateur et un utilisateur aux façades de l'équipe
de l'utilisateur. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]modèles. ser{userA, userB, userC})

// Rétablir l'équipe de l'utilisateur à l'utilisateurA,réinitialiser l'équipe de l'utilisateur à userB, réinitialiser l'équipe de l'utilisateur à userA, userB et userC
. rm().Query().Model(&users).Association("Team").Replace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Chargement en cours

Aimer les commodités de chargement pour interroger plusieurs modèles, et soulager le problème de requête "N + 1". Pour illustrer le problème de requête N +
1, considérez un modèle `Book` qui "appartient" à un modèle `Auteur` :

```go
type Author struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  chaîne de nom
  Auteur *Auteur
}
```

Maintenant, récupérons tous les livres et leurs auteurs :

```go
var books models.Book
facades.Orm().Query().Find(&books)

pour _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Pour récupérer tous les livres de la table de la base de données avec leurs auteurs, le code de la boucle exécute une requête pour chaque livre.
Cela signifie que pour une collection de 25 livres, la boucle exécuterait 26 requêtes - une pour la collection de livres et 25
de plus pour obtenir l'auteur de chaque livre.

Cependant, nous pouvons simplifier ce processus grâce à un chargement impatient. En utilisant la méthode `With`, nous pouvons spécifier quelles relations
doivent être chargées avec impatience et réduire le nombre de requêtes à seulement deux.

```go
var books models.Book
facades.Orm().Query().With("Auteur").Find(&books)

pour _, book := range books {
  fmt.Println(book.Author)
}
```

Pour cette opération, seulement deux requêtes seront exécutées - une requête pour récupérer tous les livres et une requête pour récupérer
auteurs pour tous les livres :

```sql
select * from `books`;

select * from `authors` where `id` in (1, 2, 3, 4, 5, ...);
```

### Chargement des relations multiples

Parfois, vous pouvez avoir besoin de charger plusieurs relations différentes. Pour ce faire, appelez simplement la méthode `With` plusieurs fois
:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Chargement imbriqué

Pour charger les relations d'une relation, vous pouvez utiliser la syntaxe "points". Par exemple, nous sommes impatients de charger tous les auteurs
du livre et tous les contacts personnels de l'auteur :

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Contraindre les charges des aventuriers

Parfois, vous pouvez vouloir charger une relation, mais aussi spécifier des conditions de requête supplémentaires pour le chargement impatient de la requête
. Vous pouvez accomplir cela comme suit:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Auteur", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Auteur", func(query orm.Query) {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Dans cet exemple, Orm ne chargera que les messages où la colonne `name` du message est égale au mot `author`.

### Chargement paresseux

Parfois, vous pouvez avoir besoin de charger une relation après que le modèle parent a déjà été récupéré. Par exemple, cette
peut être utile si vous avez besoin de décider dynamiquement de charger ou non les modèles associés:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  if someCondition {
    err := facades.Orm().Query().Load(&book, "Author")
  }
}
```

Si vous avez besoin de définir des contraintes de requête supplémentaires sur la requête de chargement désirée, vous pouvez utiliser le code ci-dessous :

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Pour charger une relation seulement quand elle n'a pas déjà été chargée, utilisez la méthode `LoadMissing` :

```go
facades.Orm().Query().LoadMissing(&book, "Auteur")
```
