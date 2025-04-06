# Beziehungen

Es ist üblich, dass Datenbanktabellen miteinander verbunden werden. Zum Beispiel kann ein Blog-Beitrag viele Kommentare haben oder eine Bestellung
kann mit dem Benutzer verknüpft werden, der sie platziert hat. `Orm` vereinfacht die Verwaltung und den Umgang mit solchen Beziehungen, und es kann verschiedene gemeinsame Beziehungen mit
verarbeiten:

- [One To One](#one-to-one)
- [One To Many](#one-to-many)
- [Viele zu viele](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Beziehungen definieren

### Eins zu eins

Eine Ein-zu-Eins-Beziehung ist eine sehr grundlegende Art von Datenbank-Beziehung. Zum Beispiel könnte ein `User` Modell mit einem `Phone` Modell
verknüpft sein.

```go
type User struct {
  orm. odel
  Name String
  Phone *Phone
}

Type Phone struct {
  orm. odel
  UserID uint
  Name String
}
```

Wenn `Orm` verwendet wird automatisch der Beziehung basierend auf dem übergeordneten Modellnamen der Fremdschlüssel zugewiesen. Für
wird angenommen, dass das Modell `Phone` standardmäßig eine `UserID` Fremdschlüssel hat. Wenn du diese
-Konvention jedoch ändern möchtest, kannst du ein `foreignKey`-Tag dem `Phone` Feld im `User`-Modell hinzufügen. (Dies gilt auch für andere
Beziehungen.)

```go
type User struct {
  orm. odel
  Name String
  Phone *Phone `gorm:"foreignKey:UserName"`
}

Typ Phone struct {
  orm. odel
  UserName String
  Name String
}
```

Zusätzlich wird bei Verwendung von `Orm` davon ausgegangen, dass der Fremdschlüssel mit der Spalte des Primärschlüssels übereinstimmt.
Dies bedeutet, dass `Orm` nach dem Wert `ID` des Benutzers in der Spalte `UserId` des `Phone` Datensatzes sucht. Wenn Sie
einen anderen Primärschlüssel als `ID` verwenden möchten, du kannst eine "Tag" Referenz zum `Phone` Feld im `User` Modell hinzufügen. Um
dies zu tun, übergeben Sie einfach ein drittes Argument an die `hasOne` Methode. (Andere Beziehungs-Setups sind ähnlich.)

```go
type User struct {
  orm. odel
  Name String
  Telefon *Telefon `gorm:"foreignKey:UserName; eferences:name"`
}

Telefon struct {
  orm. odel
  UserName String
  Name String
}
```

#### Definieren des Umkehrens der Beziehung

Wir können auf das "Phone"-Modell von unserem "User"-Modell aus zugreifen. Jetzt müssen wir eine Beziehung auf dem Modell `Phone` herstellen, das uns
erlaubt, auf den Besitzer des Telefons zuzugreifen. Um dies zu tun, können wir ein `User`-Feld im `Phone`-Modell definieren.

```go
type User struct {
  orm.Model
  Name string
}

Type Phone struct {
  orm. odel
  UserID uint
  Name String
  Benutzer *User
}
```

### Eins an viele

Eine 1-zu-Viele-Beziehung wird verwendet, um Beziehungen zu definieren, bei denen ein einzelnes Modell als Eltern-Modell zu einem oder mehreren
-Modellen gilt. Zum Beispiel kann ein Blog-Beitrag eine unendliche Anzahl von Kommentaren haben. Wie alle anderen `Orm` Beziehungen werden auch
1-zu-viele Beziehungen durch das Definieren eines Feldes in deinem `Orm`-Modell definiert:

```go
type Post struct {
  orm. odel
  Name String
  Kommentare []*Kommentar
}

Typ Kommentar struct {
  orm. odel
  PostID uint
  Name String
}
```

Denk daran, dass `Orm` automatisch die korrekte Fremdschlüsselspalte für das Modell `Comment` bestimmt. Nach Konvention wird Orm
den Namen des übergeordneten Modells "Buckelfall" annehmen und mit `ID` abspielen. In diesem Beispiel wird Orm also annehmen, dass die Fremdschlüsselspalte
im `Comment`-Modell `PostID` ist.

### One To Many (Inverse) / Gehört zu

Jetzt, da wir auf alle Kommentare eines Beitrags zugreifen können, definieren wir eine Beziehung, um einem Kommentar den Zugriff auf seinen übergeordneten
Beitrag zu ermöglichen. Um das Inverse einer `One To Many` Beziehung zu definieren, definieren Sie eine Beziehungsmethode am Kindmodell, die
die `belongsTo` Methode aufruft:

```go
type Post struct {
  orm. odel
  Name String
  Kommentare []*Kommentar
}

Typ Kommentar struct {
  orm. odel
  PostID uint
  Name String
  Post *Post
}
```

## Viele bis viele Beziehungen

Manto-viele Beziehungen sind etwas komplizierter als `One To One` und `One To Many` Beziehungen. Ein Beispiel für eine
Beziehung ist ein Benutzer, der viele Rollen hat und diese Rollen auch von anderen Benutzern in der
Anwendung geteilt werden. Zum Beispiel kann einem Benutzer die Rolle "Autor" und "Editor" zugewiesen werden; aber diese Rollen können auch anderen Benutzern
zugewiesen werden. So hat ein Benutzer viele Rollen und eine Rolle hat viele Benutzer.

### Tabellenstruktur

Um diese Beziehung zu definieren, werden drei Datenbanktabellen benötigt: `users`, `roles` und `role_user`. Die Benennung der `role_user` Tabelle
kann angepasst werden und enthält `user_id` und `role_id` Spalten. Diese Tabelle wird als Zwischentabelle
benutzt, um Benutzer und Rollen zu verknüpfen.

Denken Sie daran, da eine Rolle vielen Benutzern gehören kann, können wir nicht einfach eine `user_id` Spalte auf die Tabelle `roles` setzen. Diese
würde bedeuten, dass eine Rolle nur einem einzigen Benutzer gehören kann. Um Unterstützung für Rollen bereitzustellen, die
mehreren Benutzern zugewiesen werden, wird die Tabelle `role_user` benötigt. Wir können die Tabellenstruktur der Beziehung wie folgt zusammenfassen:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_id - integer
  role_id - integer 
 role_id - integer
```

### Modellstruktur

Wir können ein `Roles`-Feld im `User` Modell definieren:

```go
type User struct {
  orm. odel
  Name String
  Rollen []*Rolle `gorm:"many2many:role_user"`
}

Typ Rollenstrukt {
  orm. odel
  Name String
}
```

### Definieren des Umkehrens der Beziehung

Um das Inverse der Beziehung zu definieren, definieren Sie einfach ein `Users`-Feld im `Role`-Modell und fügen Sie einen Tag an.

```go
type User struct {
  orm. odel
  Name String
  Rollen []*Rolle `gorm:"many2many:role_user"`
}

Typ Rollenstrukt {
  orm. odel
  Name String
  Benutzer []*Benutzer `gorm:"many2many:role_user"`
}
```

### Benutzerdefinierte Zwischentabelle

Im Allgemeinen wird der Fremdschlüssel der Zwischentabelle durch den "Schlangenfall" des übergeordneten Modellnamens benannt du kannst
durch `joinForeignKey`, `joinReferences` überschreiben:

```go
type User struct {
  orm. odel
  Name String
  Rollen []*Rolle `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

Typ Rolle struct {
  orm. odel
  Name String
}
```

Tabellenstruktur:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_name - integer
  role_name - integer 
 role_name - integer
```

## Polymorph

Eine polymorphe Beziehung erlaubt es dem Kind, mehr als einen Modelltyp mit einer einzigen Zuordnung anzugehören.
Zum Beispiel stellen Sie sich vor, Sie bauen eine Anwendung, die Benutzern erlaubt, Blog-Beiträge und Videos zu teilen. In einer solchen
-Anwendung könnte ein `Comment`-Modell sowohl zu den `Post`- als auch zu `Video`-Modellen gehören.

### Tabellenstruktur

Eine polymorphe Beziehung ist ähnlich einer normalen Beziehung; jedoch kann das Kind-Modell zu mehr als einem
-Modell gehören, indem es eine einzige Zuordnung verwendet. Zum Beispiel kann ein Blog `Post` und ein `User` eine polymorphe Beziehung zu einem `Image`
Modell teilen. Mit einer polymorphen Beziehung können Sie eine einzige Tabelle mit einzigartigen Bildern haben, die mit Beiträgen
und Benutzern assoziiert werden können. Schauen wir uns zuerst die Tabellenstruktur an:

```
posts
  id - integer
  name - string

videos
  id - integer
  name - string

images 

 images
  id - integer
  url - string
  imageable_id - integer
  imageable_type - string

comments
  id - integer
  body - text
  commentable_id - integer
  commentable_type - string - string
```

Beachte die Spalten `imageable_id` und `imageable_type` in der `images` Tabelle. Die Spalte `imageable_id` enthält den
ID-Wert des Beitrags oder Benutzers, während die Spalte `imageable_type` den Klassennamen des übergeordneten Modells enthält. Die Spalte
`imageable_type` wird von Orm verwendet, um festzustellen, welcher "Typ" des übergeordneten Modells zurückgegeben wird, wenn auf die
`imageable` Beziehung zugegriffen wird. Die Tabelle `comments` ist ähnlich.

### Modellstruktur

Als nächstes lassen Sie uns die Modelldefinitionen untersuchen, die notwendig sind, um diese Beziehung aufzubauen:

```go
type Post struct {
  orm. odel
  Name String
  Bild *Bild `gorm:"polymorphic:Image"`
  Kommentare []*Kommentar `gorm:"polymorphic:Commentable"`
}

Typ Video-strukt {
  orm. odel
  Name string
  Bild *Bild `gorm:"polymorphic:Image"`
  Kommentare []*Kommentar `gorm:"polymorphic:Commentable"`
}

Typ Bild strukt {
  orm. odel
  Name string
  ImageableID uint
  ImageableType string
}

type Comment struct {
  orm. odel
  Name String
  CommentableID uint
  CommentableType String
}
```

Du kannst den polymorphen Wert durch das `polymorphicValue` Tag ändern, wie:

```go
type Post struct {
  orm.Model
  Name String
  Bild *Bild `gorm:"polymorphic:Image;polymorphicValue:master"`
}
```

## Verknüpfungen abfragen

Stellen Sie sich zum Beispiel eine Blog-Anwendung vor, in der ein `User`-Modell viele zugehörige `Post`-Modelle hat:

```go
type User struct {
  orm. odel
  Name String
  Posts []*Post
}

Typ Post struct {
  orm. odel
  UserID uint
  Name String
}
```

### Verknüpfungen erstellen oder aktualisieren

Du kannst die `Select`, `Omit`-Methoden verwenden, um das Erstellen und Aktualisieren von Assoziationen zu steuern. Diese beiden Methoden können nicht gleichzeitig
verwendet werden und die zugehörigen Kontrollfunktionen sind nur anwendbar auf `Erstellen`, `Update`, `Speichern`:

```go
user := models.User{Name: "user", Beiträge: []*models.Post{{Name: "post"}}}

// Alle Kindverknüpfungen beim Erstellen von User
Fassaden erstellen. rm().Query().Select(orm.Associations).Create(&user)

// Beitrag nur beim Erstellen eines Benutzers erstellen. Hinweis: Wenn Sie keine `orm.Associations` verwenden, sondern bestimmte Kindverknüpfungen einzeln anpassen, sollten alle Felder des übergeordneten Modells zu diesem Zeitpunkt ebenfalls aufgeführt werden.
facades.Orm().Query().Select("Name", "Posts"). reate(&user)

// Beim Erstellen eines Benutzers ignorieren Sie den Beitrag, aber erstellen Sie alle anderen Kindzuordnungen
facades.Orm().Query(). mit("Posts").Create(&user)

// Beim Erstellen eines Benutzers das Feld Name ignorieren, aber alle Unterverbände
Fassaden erstellen. rm().Query().Omit("Name").Create(&user)

// Beim Erstellen des Benutzers Namensfeld und alle Unterverbände
facades.Orm().Query().Omit("Name", orm.Associations).Create(&user)
```

### Verknüpfungen finden

```go
// Finden Sie alle passenden verknüpften Datensätze
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Suchen Sie Assoziationen mit den Bedingungen
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Verknüpfungen anhängen

Füge neue Assoziationen für `Many To Many`, `One To Many`, ersetzen Sie die aktuelle Assoziation für `One To One`,
`One To One(umgekehrt)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Verknüpfungen ersetzen

Aktuelle Verbindungen durch neue ersetzen:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Verknüpfungen löschen

Entferne die Beziehung zwischen Quelle und Argument, wenn vorhanden, lösche nur die Referenz, löscht diese Objekte nicht von
DB, der Fremdschlüssel muss NULL sein:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Posts").Delete(Post1, Post2)
```

### Verknüpfungen löschen

Entferne alle Verweise zwischen Quelle und Zuordnung, lösche diese Zuordnungen nicht:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Zuordnungen zählen

Gibt die Anzahl der aktuellen Zuordnungen zurück:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Zählen mit den Bedingungen
facades.Orm().Model(&user).Where("name = ?", "goravel").Association("Posts").Count() ).Count()
```

### Stapeldaten

```go
// Finde alle Rollen für alle Benutzer
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Benutzer A löschen von allen Posts
Fassaden. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Erhalte eine unterschiedliche Anzahl von Beiträgen aller Benutzer
Fassaden. rm().Query().Model(&users).Association("Posts"). ount()

// Für `Append`, `Ersetzen` mit Batch-Daten, die Länge der Argumente muss der Länge der Daten entsprechen, sonst gibt es einen Fehler
var users = []models. ser{user1, user2, user3}

// Wir haben 3 Benutzer, fügen userA an user1's Team an fügt userB an das user2's Team an, fügt userA, userB und userC an das user3 Team
Fassaden an. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]modelle. ser{userA, userB, userC})

// Team von user1 auf userA zurücksetzen, Team von user2 auf userB zurücksetzen, Team zurücksetzen auf userA, userB und userC
Fassaden. rm().Query().Model(&users).Association("Team").Replace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Vorzeitiges Laden

Bequemes Laden zum Abfragen mehrerer Modelle und das Abfrageproblem "N + 1" wird erleichtert. Um das Abfrageproblem N +
zu illustrieren, erwäge ein `Buch`-Modell, das "gehört zu" eines `Autor`-Modells:

```go
type Author struct {
  orm.Model
  Name string
}

Type Book struct {
  orm. odel
  AuthorID uint
  Name string
  Autor *Autor
}
```

Lass uns nun alle Bücher und deren Autoren abrufen:

```go
var books models.Book
facades.Orm().Query().Find(&books)

für _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Um alle Bücher in der Datenbanktabelle zusammen mit ihren Autoren abzurufen, führt der Schleifencode eine Abfrage für jedes Buch aus.
Das bedeutet für eine Sammlung von 25 Büchern die Schleife würde 26 Anfragen ausführen - eine für die Sammlung von Büchern und 25
mehr, um den Autor jedes Buches zu erhalten.

Wir können diesen Prozess jedoch mit eifrigem Ladevorgang vereinfachen. Durch die `with` Methode können wir angeben, welche
Beziehungen eifrig geladen werden müssen und reduzieren die Anzahl der Abfragen auf nur zwei.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

für _, book := range books {
  fmt.Println(book.Author)
}
```

For this operation, only two queries will be executed - one query to retrieve all books and one query to retrieve
authors for all of the books:

```sql
wähle * aus `books`;

wähle * von `authors` aus, wo `id` in (1, 2, 3, 4, 5, ...);
```

### Mehrere Beziehungen werden geladen

Manchmal kann es vorkommen, dass Sie mehrere verschiedene Beziehungen laden müssen. Rufen Sie dazu einfach die `with` Methode mehrmals
auf:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Verschachteltes Eager laden

Um die Beziehungen einer Beziehung zu laden, können Sie die "Punkt-Syntax" verwenden. Lass uns zum Beispiel alle
Autoren und alle persönlichen Kontakte des Autors laden:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Einschränken von Eager-Loads

Manchmal kann es vorkommen, dass Sie eine Beziehung laden möchten, aber auch zusätzliche Abfragebedingungen für die
-Abfrage angeben. Sie können dies wie folgt erreichen:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Abfrage {
  return query.Where("name = ?", "author")
}).Find(&book)
```

In diesem Beispiel lädt Orm nur eifrige Beiträge, bei denen die Spalte `name` des Beitrags dem Wort `author` entspricht.

### Lazy Eager laden

Manchmal kann es vorkommen, dass Sie eine Beziehung laden müssen, nachdem das übergeordnete Modell bereits abgerufen wurde. Zum Beispiel kann dieses
nützlich sein, wenn Sie dynamisch entscheiden müssen, ob verwandte Modelle geladen werden sollen:

```go
var books models.Book
facades.Orm().Query(). ind(&books)

for _, book := range books {
  if someCondition {
    err := facades. rm().Query().Lade(&book, "Autor")
  }
}
```

Wenn Sie zusätzliche Abfragebeschränkungen für das Laden der Anfrage festlegen müssen, können Sie den folgenden Code verwenden:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Abfrage {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Um eine Beziehung nur zu laden, wenn sie noch nicht geladen wurde, verwenden Sie die `LoadMissing` Methode:

```go
facades.Orm().Query().LoadMissing(&book, "Autor")
```
