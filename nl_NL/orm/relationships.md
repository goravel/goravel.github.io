# Relaties

Het is gebruikelijk dat databasetabellen onderling verbonden zijn. Een blogpost kan bijvoorbeeld veel opmerkingen hebben, of een bestelling
kan worden gekoppeld aan de gebruiker die deze heeft geplaatst. 'Orm' vereenvoudigt het beheren en omgaan met dergelijke relaties, en het kan omgaan met
verschillende gemeenschappelijke relaties:

- [Één tot één](#one-to-one)
- [Eén Aan Many](#one-to-many)
- [Veel Aan Many](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Relaties definiëren

### Één op één

Een één-op-een-één-relatie is een zeer fundamenteel type databankrelatie. Bijvoorbeeld, een `User` model kan worden geassocieerd
met één `Phone` model.

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Telefoon *Phone
}

type Telefoon {
  of m. odel
  UserID uint
  Name string
}
```

Wanneer je `Orm` gebruikt, wordt de buitenlandse sleutel automatisch toegewezen aan de relatie gebaseerd op de parent modelnaam. Voor
bijvoorbeeld: wordt verondersteld dat het `Phone` model standaard een `UserID` buitenlandse sleutel heeft. Als u deze
conventie echter wilt wijzigen, kunt u een `foreignKey` tag toevoegen aan het `Phone` veld in `User` model. (Dit geldt ook voor andere
relaties.)

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Telefoon *Phone `gorm:"foreignKey:UserName"`
}

type Telefoon {
  orm. odel
  Gebruikersnaam string
  naam string
}
```

Wanneer bovendien `Orm` wordt gebruikt, wordt ervan uitgegaan dat de buitenlandse sleutel moet overeenkomen met de primaire sleutelkolom van het ouder.
Dit betekent dat `Orm` zal zoeken naar de gebruiker `ID` kolomwaarde in de `UserId` kolom van het `Phone` record. Als u
een andere primaire sleutel waarde wil gebruiken dan `ID`, U kunt een "Tag" referentie naar het "Phone" veld toevoegen in het "Gebruiker" model. Om
dit te doen, geef je gewoon een derde argument door aan de `hasOne` methode. (Andere relatieregelingen zijn vergelijkbaar.)

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Telefoon *Phone `gorm:"foreignKey:UserName; eferences:name"`
}

type Phone struct {
  of m. odel
  Gebruikersnaam string
  naam string
}
```

#### Het inverse van de Relatie definiëren

We hebben toegang tot het `Telefoon` model van ons `Gebruiker`-model. Nu moeten we een relatie opbouwen op `Phone` model dat
ons toegang geeft tot de eigenaar van de telefoon. Om dit te doen, kunnen we een `User` veld definiëren in `Phone` model.

```go
type gebruiker bouwt {
  orm.Model
  Name string
}

type Phone struct {
  of m. odel
  GebruikerID uint
  tekenreeks
  Gebruiker *Gebruiker
}
```

### Eén op Vele

Een één-op-veel relatie wordt gebruikt om relaties te definiëren waarbij een enkel model de ouder is van een of meer onderliggende
modellen. Een blogpost kan bijvoorbeeld een oneindig aantal reacties hebben. Zoals alle andere `Orm` relaties,
één-naar-veel relaties worden gedefinieerd door een veld te definiëren op jouw `Orm` model:

```go
type Post bouwt {
  orm. odel
  Naam string
  Commentaar []*Commentaar
}

type Opmerking bouwt {
  orm. odel
  PostID uint
  Naam string
}
```

Vergeet niet dat `Orm` automatisch de juiste vreemde sleutelkolom voor het `Comment` model zal bepalen. Orm
gebruikt de "hump case" naam van het bovenliggende model en achtervoegsel met `ID`. Dus in dit voorbeeld gebruikt Orm de
foreign key kolom op het `Commentaar` model `PostID`.

### Één Aan Veel (Inverse) / Langs naar

Nu we toegang hebben tot alle commentaren van een bericht, kunnen we een relatie definiëren om een commentaar te geven op de hoofdpost
Om het omgekeerde van een `One To Many` relatie te definiëren, definieer een relatie methode op het onderliggende model dat
de `belongsTo` methode noemt:

```go
type Post bouwt {
  orm. odel
  Naam string
  Commentaar []*Commentaar
}

type Opmerking bouwt {
  orm. odel
  PostID uint
  Naam tekenreeks
  Post *Post
}
```

## Veel Tot Veel Relaties

Many-to-many relaties zijn iets ingewikkelder dan `One To One` en `One To Many` relaties. Een voorbeeld van een
manto-many relatie is een gebruiker die veel rollen heeft en die rollen worden ook gedeeld door andere gebruikers in de
applicatie. Bijvoorbeeld, een gebruiker kan de rol van "Auteur" en "Editor" worden toegewezen; Deze rollen kunnen echter ook
aan andere gebruikers worden toegewezen. Een gebruiker heeft dus veel rollen en een rol heeft veel gebruikers.

### Tabel structuur

Om deze relatie te definiëren, zijn drie databasetabellen nodig: `users`, `roles`, en `role_user`. De `role_user` tabel
naamgeving kan aangepast worden en bevat `user_id` en `role_id` kolommen. Deze tabel wordt gebruikt als een tussenliggende tabel
die gebruikers en rollen koppelt.

Vergeet niet dat een rol tot veel gebruikers kan behoren, we kunnen niet simpelweg een `user_id` kolom plaatsen in de `rollen` tabel. Deze
zou betekenen dat een rol slechts tot één enkele gebruiker zou kunnen behoren. Om ondersteuning te bieden voor rollen die worden toegewezen aan
meerdere gebruikers, is de `role_user` tabel nodig. We kunnen de tabel structuur van de relatie als volgt samenvatten:

```
gebruikers
  id - integer
  naam - string

rollen
  id - integer
  naam - string

role_user
  user_id - integer
  role_id - integer
```

### Model Structuur

We kunnen een `Rollen` veld definiëren in `User` model:

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Rollen []*Rol `gorm:"many2many:role_user"`
}

type Rol struct {
  orm. odel
  tekenreeks van de naam
}
```

### Het inverse van de Relatie definiëren

Om het omgekeerde van de relatie te definiëren, definieer je een `Users` veld in `Role` model en voeg een Tag toe.

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Rollen []*Rol `gorm:"many2many:role_user"`
}

type Rol struct {
  orm. odel
  Tekststring
  Gebruikers []*Gebruiker `gorm:"many2many:role_user"`
}
```

### Aangepaste tussenliggende tabel

Over het algemeen is de tussenliggende tabel buitenlandse sleutel vernoemd met de "slang case" van de naam van het bovenliggend model. je kan
overschrijven door `joinForeignKey`, `joinReferences`:

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Naam string
  Rollen []*Rol `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

type rol constructie {
  orm. odel
  tekenreeks van de naam
}
```

Tabel structuur:

```
gebruikers
  id - integer
  naam - string

rollen
  id - integer
  naam - string

role_user
  user_name - integer
  role_name - integer
```

## Polymorfe

Een polymorfe relatie laat toe dat het kind met behulp van één enkele vereniging tot meer dan één type model behoort.
Stel je bijvoorbeeld voor dat je een toepassing bouwt waarmee gebruikers blogposts en video's kunnen delen. In een
applicatie zou een `Commentaar` model tot zowel de `Post` als `Video` modellen kunnen behoren.

### Tabel structuur

Een polymorfe relatie lijkt op een normale relatie; Echter, het kindermodel kan met behulp van één enkele associatie tot meer dan één
model behoren. Bijvoorbeeld, een blog `Post` en een `User` kan een polymorfe relatie met een `Image`
model delen. Met een polymorfische relatie kun je een enkele tabel met unieke afbeeldingen hebben die gekoppeld kunnen worden aan posts
en gebruikers. Laten we eerst de tabelstructuur bekijken:

```
berichten
  -id - integer
  name - string

video
  id - integer
  naam - string

afbeeldingen
  id - integer
  url - string
  imageable_id - integer
  imageable_type - string

comments
  id - integer
  body - tekst
  commentable_id - integer
  commentable_type - string
```

Noteer de kolommen 'imageable_id' en 'imageable_type' in de 'afbeeldingen' tabel. De kolom `imageable_id` bevat de
ID-waarde van het bericht of de gebruiker, terwijl de kolom `imageable_type` de klassenaam van het bovenliggende model zal bevatten. De
`imageable_type` kolom wordt gebruikt door Orm om te bepalen welk "type" van het bovenliggende model om te retourneren bij de toegang tot de
`imageable` relatie. De `comments` tabel is vergelijkbaar.

### Model Structuur

Laten we vervolgens kijken naar de modeldefinities die nodig zijn om deze relatie op te bouwen:

```go
type Post struct {
  orm.Model
  Name     string
  Image    *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm.Model
  Name     string
  Image    *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm.Model
  Name          string
  ImageableID   uint
  ImageableType string
}

type Comment struct {
  orm.Model
  Name            string
  CommentableID   uint
  CommentableType string
}
```

U kunt de polymorfe waarde wijzigen met `polymorphicValue` Tag, zoals:

```go
type Bericht heeft {
  orm.Model
  Name string
  Afbeelding *Afbeelding `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Querying associaties

Stel je bijvoorbeeld een blog applicatie voor waarin een `User` model veel geassocieerde `Post` modellen heeft:

```go
type Gebruiker heeft {
  orm gemaakt. odel
  Name string
  Posts []*Post
}

type Post struct {
  of m. odel
  UserID uint
  Name string
}
```

### Associaties aanmaken of bijwerken

Je kunt de `Select`, `Omit` methodes gebruiken om het maken en bijwerken van associaties te controleren. Deze twee methode kan niet
worden gebruikt op hetzelfde moment en de bijbehorende controlefuncties zijn alleen van toepassing op `Create`, `Update`, `Opslaan`:

```go
user := models.User{Name: "user", Berichten: []*models.Post{{Name: "post"}}}

// Creëer alle subkoppelingen tijdens het maken van Gebruiker
facades. rm().Query().Select(orm.Associations).Create(&user)

// Alleen Post aanmaken tijdens het maken van gebruiker. Opmerking: als u geen `orm.Associations` gebruikt, maar specifieke subassociaties afzonderlijk aanpassen, moeten alle velden in het bovenliggende model op dit moment ook worden vermeld.
facades.Orm().Query().Select("Naam", "Posts"). reate(&user)

// Wanneer je een gebruiker aanmaakt, negeer de Post, maar maak alle andere onderliggende associaties
facades.Orm().Query(). mit("Posts").Create(&user)

// Wanneer u een gebruiker aanmaakt, negeer naam veld, maar maak alle onderliggende associaties
facades. rm().Query().Omit("Naam").Create(&user)

// Wanneer u een gebruiker aanmaakt, negeer naamveld en alle onderliggende associaties
facades.Orm().Query().Omit("Naam", orm.Associations).Create(&user)
```

### Vind associaties

```go
// Vind alle overeenkomende records
var berichten []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Vind associaties met voorwaarden
facades.Orm().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&)
```

### Voeg associaties toe

Voeg nieuwe associaties toe voor `Veel To Many`, `One To Many`, vervang huidige associatie voor `One To One`,
`One To One(rever)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Vervang associaties

Huidige associaties vervangen door nieuwe:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Naam: "goravel"}, Post2)
```

### Verwijder associaties

Verwijder de relatie tussen bron en argumenten indien aanwezig, alleen de verwijzing, deze objecten niet verwijderen uit
DB, de buitenlandse sleutel moet NULL zijn:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Wis associaties

Verwijder alle verwijzing tussen bron en associatie, zal deze associaties niet verwijderen:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Aantal associaties

Retourneer het aantal huidige associaties:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Aantal met voorwaarden
facades.Orm().Query().Model(&user).Where("naam = ?", "goravel").Association("Posts").Count()
```

### Batch gegevens

```go
// Vind alle rollen voor alle gebruikers
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Verwijder Gebruiker A uit alle posts van gebruiker
facades. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Krijg een duidelijk aantal posts van alle gebruikers
facades. rm()Query().Model(&users).Association("Posts"). ount()

// Voor `Append`, `Replace` met batch data, de lengte van de argumenten moet gelijk zijn aan de lengte van de data, anders geeft het een foutmelding
var gebruikers = []modellen. ser{user1, user2, user3}

// Wij hebben 3 gebruikers, voeg userA toe aan user1's team, Voeg userB toe aan user2's team, voeg userA, userB en userC toe aan user3's team
facades. rm().Query().Model(&users).Association("Team").Append(&userA, &[]modellen. ser{userA, userB, userC})

// Reset user1's team naar userA,reset het team van user2 naar userB, reset het team van gebruiker 3 naar userA, userB en userC
facades. rm().Query().Model(&users).Association("Team").Replace(&userA, &[]models.User{userA, userB, userC})
```

## Eager laden

Eager belastingsgemakken voor het zoeken naar meerdere modellen en verzacht het "N + 1" queryprobleem. Ter illustratie van het N +
1 query probleem, overweeg een `Book` model dat "hoort bij" een `Auteur` model:

```go
typ auteur {
  orm.Model
  Name string
}

type boek {
  of m. odel
  AuteurID uint
  Naam tekenreeks
  Auteur *Auteur
}
```

Laten we nu alle boeken en auteurs ophalen:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var auteurmodels.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Om alle boeken samen met de auteurs op te halen uit de databasetabel voert de luscode een query uit voor elk boek.
Dit betekent dat voor een verzameling van 25 boeken, de lus zou 26 vragen moeten krijgen - één voor de verzameling van boeken en 25
meer om de auteur van elk boek te krijgen.

We kunnen dit proces echter met veel belasting vereenvoudigen. Door gebruik te maken van de `With` methode, kunnen we aangeven welke
relaties enthousiast geladen moeten worden en het aantal queries tot slechts twee reduceren.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

for _, book := range books {
  fmt.Println(book.Author)
}
```

Voor deze operatie Er worden slechts twee query's uitgevoerd - één query om alle boeken op te halen en één query om
auteurs op te halen voor alle boeken:

```sql
selecteer * uit `boeken`;

selecteer * uit `auteurs` waar `id` in (1, 2, 3, 4, 5, ...);
```

### Eager Laden Meerdere Relaties

Soms moet je meerdere verschillende relaties graag laden. Om dit te doen, roep de `With` methode meerdere
keer op:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Geneste ager laden

Om de relaties van een relatie te laden, kunt u "dot" syntaxis gebruiken. Bijvoorbeeld, laten we alle
auteurs van het boek en alle persoonlijke contacten van de auteur laden:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Beperking ager lading

Soms kunt u graag een relatie laden, maar ook aanvullende queryvoorwaarden opgeven voor de eager loading
query. Je kunt dit als hieronder volbrengen:

```go
importeer "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Auteur", func(query orm.Query {
  return query.here("naam = ?", "auteur")
}).Find(&book)
```

In dit voorbeeld zullen Orm alleen maar graag berichten laden waar de 'naam' kolom van de post gelijk is aan het woord 'auteur'.

### Lazy Eager laden

Soms moet je graag een relatie laden nadat het bovenliggende model al is opgehaald. Bijvoorbeeld, deze
kan handig zijn als je dynamisch moet beslissen of je gerelateerde modellen wilt laden:

```go
var books models.Book
facades.Orm().Query(). ind(&boeken)

voor _, boek := range books {
  if someCondition {
    err := facades. rm().Query().Load(&book, "Author")
  }
}
```

Als u extra query beperkingen wilt instellen op de adjunct-zoekopdracht, kunt u de code hieronder gebruiken:

```go
importeer "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Query { 
 return query.here("naam = ?", "auteur")
}).Find(&book)
```

Om een relatie alleen te laden wanneer deze nog niet is geladen, gebruik de `LoadMissing` methode:

```go
facades.Orm().Query().LoadMissing(&book, "Auteur")
```
