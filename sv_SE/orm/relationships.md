# Relationer

Det är vanligt att databastabeller är sammankopplade. Till exempel, ett blogginlägg kan ha många kommentarer, eller en beställning kan
kopplas till användaren som lagt den. `Orm` förenklar hantering och hantering av sådana relationer, och det kan hantera
olika gemensamma relationer:

- [En till en](#one-to-one)
- [En till många](#one-to-many)
- [Många till många](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Definiera relationer

### En till en

En en-till-en relation är en mycket grundläggande typ av databas relation. Till exempel kan en `User`-modell vara associerad
med en `Phone`-modell.

```go
skriv User struct {
  orm. odel
  Name string
  Phone *Phone
}

type Phone struct {
  orm. odel
  UserID uint
  Name string
}
```

När man använder `Orm`, tilldelar den automatiskt den främmande nyckeln till förhållandet baserat på det överordnade modellnamnet. För
till exempel antas `Phone`-modellen ha en `UserID` främmande nyckel som standard. Men om du vill ändra denna
-konvention kan du lägga till en `foreignKey`-tagg till `Phone`-fältet i `User`-modellen. (Detta gäller även för andra
relationer.)

```go
skriv User struct {
  orm. odel
  Name string
  Phone *Phone `gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm. odel
  Användarnamn sträng
  Namn sträng
}
```

Dessutom, när du använder `Orm`, antas det att den utländska nyckeln ska matcha huvudnyckelkolumnen i föräldern.
Detta innebär att `Orm` kommer att söka efter användarens `ID`-kolumnvärde i kolumnen `UserId` i `Phone`-posten. Om du
vill använda ett primärnyckelvärde annat än `ID`, du kan lägga till en "Tag" referens till `Phone`-fältet i `User`-modellen. För att
gör detta, skicka bara ett tredje argument till `hasOne`-metoden. (Andra relationsinställningar är liknande.)

```go
skriv User struct {
  orm. odel
  Namnsträng
  Telefon *Telefon `gorm:"foreignKey:UserName; eferences:name"`
}

type Phone struct {
  orm. odel
  Användarnamn sträng
  Namn sträng
}
```

#### Definiera omvändelsen av relationen

Vi kan komma åt `Phone`-modellen från vår `User`-modell. Nu måste vi etablera en relation på `Phone`-modellen som
ger oss tillgång till telefonens ägare. För att göra detta kan vi definiera ett `User`-fält i `Phone`-modellen.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  UserID uint
  Namnsträng
  Användare *Användare
}
```

### En till många

En en-till-många relation används för att definiera relationer där en enda modell är förälder till en eller flera barn
modeller. Till exempel, ett blogginlägg kan ha ett oändligt antal kommentarer. Liksom alla andra `Orm`-relationer definieras
en-till-många relationer genom att definiera ett fält på din `Orm`-modell:

```go
skriv Post struct {
  orm. odel
  Namnsträng
  Comments []*Comment
}

type Kommentar struct {
  orm. odel
  PostID uint
  Name string
}
```

Kom ihåg att `Orm` automatiskt kommer att bestämma den rätta utländska nyckelkolumnen för `Comment`-modellen. Enligt konventionen, kommer Orm
att ta namnet på den överordnade modellen och suffix den med "ID". So, in this example, Orm will assume the
foreign key column on the `Comment` model is `PostID`.

### En till många (omvänd) / Tillhör till

Nu när vi har tillgång till alla ett inläggs kommentarer, låt oss definiera en relation för att tillåta en kommentar att komma åt sin förälder
inlägg. För att definiera inversen av ett `One To Många`-förhållande, definiera en relationsmetod på barnmodellen som kallar
för `belongsTo`-metoden:

```go
skriv Post struct {
  orm. odel
  Namnsträng
  Comments []*Comment
}

type Kommentar struct {
  orm. odel
  PostID uint
  Name string
  Post *Post
}
```

## Många till många relationer

Mansatt-många relationer är något mer komplicerade än `One To One` och `One To Många`-relationer. Ett exempel på en
many-to-many relation är en användare som har många roller och dessa roller delas också av andra användare i
-applikationen. Till exempel kan en användare tilldelas rollen som "Författare" och "Redigerare"; men dessa roller kan också vara
tilldelas till andra användare. Så en användare har många roller och en roll har många användare.

### Tabell struktur

För att definiera denna relation behövs tre databastabeller: `users`, `roles`, och `role_user`. Tabellen `role_user`
kan anpassas och den innehåller `user_id` och `role_id`-kolumner. Denna tabell används som en mellanliggande tabell
länka användare och roller.

Kom ihåg att eftersom en roll kan tillhöra många användare kan vi inte helt enkelt placera en `user_id`-kolumn på `roles`-tabellen. Detta
skulle innebära att en roll bara kunde tillhöra en enda användare. För att ge stöd för roller som tilldelas
flera användare, behövs tabellen `role_user`. Vi kan sammanfatta relationens tabellstruktur som så:

```
användare
  id - heltal
  namn - sträng

roller
  id - heltal
  namn - sträng

role_user
  user_id - heltal
  role_id - heltal
```

### Modell Struktur

Vi kan definiera ett `Roles`-fält på `User`-modellen:

```go
skriv User struct {
  orm. odel
  Namnsträng
  Roller []*Roll `gorm:"many2many:role_user"`
}

typ Roll struct {
  orm. odel
  Namnsträng
}
```

### Definiera omvändelsen av relationen

För att definiera den inversa av förhållandet, definiera bara ett `Users`-fält i `Role`-modell och lägg till en tagg.

```go
skriv User struct {
  orm. odel
  Namnsträng
  Roller []*Roll `gorm:"many2many:role_user"`
}

typ Roll struct {
  orm. odel
  Namnsträng
  Användare []*Användare `gorm:"many2many:role_user"`
}
```

### Anpassad mellanliggande tabell

I allmänhet den mellanliggande tabellen främmande nyckel namnges av "orm fallet" av förälder modell namn, du kan åsidosätta
dem med `joinForeignKey`, `joinReferences`:

```go
skriv User struct {
  orm. odel
  Namnsträng
  Roller []*Roll `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferenser:Rollnamn"`
}

typ Roll struct {
  orm. odel
  Namnsträng
}
```

Tabell struktur:

```
användare
  id - heltal
  namn - sträng

roller
  id - heltal
  namn - sträng

role_user
  user_name - heltal
  role_name - heltal
```

## Polymorfisk

Ett polymorfiskt förhållande gör det möjligt för barnet att tillhöra mer än en typ av modell med en enda förening.
Till exempel, föreställ dig att du bygger ett program som tillåter användare att dela blogginlägg och videor. I en sådan
-applikation kan en `Comment`-modell tillhöra både `Post` och `Video`-modellerna.

### Tabell struktur

Ett polymorfisk förhållande liknar ett normalt förhållande; barnmodellen kan dock tillhöra mer än en typ av
modell med en enda förening. Till exempel kan en blogg `Post` och en `User` dela en polymorphic relation till en `Image`
modell. Genom att använda en polymorfisk relation kan du ha en enda tabell med unika bilder som kan förknippas med inlägg
och användare. Låt oss först undersöka tabellstrukturen:

```
inlägg
  id - heltal
  namn - sträng

videor
  id - heltal
  namn - sträng

bilder
  id - heltal
  url - sträng
  imageable_id - heltal
  imageable_type - sträng

kommentarer
  id - heltal
  kropp - text
  commentable_id - heltal
  commentable_type - sträng
```

Notera kolumnerna `imageable_id` och `imageable_type` i tabellen. Kolumnen `imageable_id` innehåller värdet
ID för inlägget eller användaren, medan kolumnen `imageable_type` innehåller klassnamnet för den överordnade modellen. Kolumnen
`imageable_type` används av Orm för att bestämma vilken "typ" av överordnad modell som ska återvända när du öppnar relationen
`imageable`. Tabellen `comments` är likartad.

### Modell Struktur

Låt oss därefter undersöka de modelldefinitioner som behövs för att bygga detta förhållande:

```go
skriv Post struct {
  orm. odel
  Namnsträng
  Bild *Bild `gorm:"polymorphic:Imageable"`
  Kommentarer []*Kommentera `gorm:"polymorphic:Commentable"`
}

typ Video struct {
  orm. odel
  Name string
  Image *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  Namnsträng
  ImageableID uint
  ImageableType sträng
}

type Kommentar struct {
  orm. odel
  Namnsträng
  CommentableID uint
  CommentableType string
}
```

Du kan ändra det polymorfiska värdet med `polymorphicValue` Tag, såsom:

```go
typ Post struct {
  orm.Model
  Namnsträng
  Bild *Bild `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Söker associationer

Till exempel, föreställ dig ett bloggprogram där en `User`-modell har många tillhörande `Post`-modeller:

```go
skriv User struct {
  orm. odel
  Namnsträng
  Inlägg []*Inlägg
}

typ Post struct {
  orm. odel
  UserID uint
  Name string
}
```

### Skapa eller uppdatera kopplingar

Du kan använda `Select`, `Omit`-metoderna för att styra skapa och uppdatera associationer. Dessa två metoder kan inte
användas på samma gång och de tillhörande kontrollfunktionerna är endast tillämpliga på `Create`, `Update`, `Save`:

```go
användare := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Skapa alla underorganisationer samtidigt som användare
fasader. rm().Query().Select(orm.Associations).Create(&user)

// Skapa bara inlägg när du skapar användare. Obs: Om du inte använder `orm.Associations`, men anpassa specifika barnföreningar separat, bör alla fält i föräldramodellen också listas just nu.
fasader.Orm().Query().Select("Namn", "inlägg"). reate(&user)

// När du skapar en användare, ignorera inlägget, men skapa alla andra barnföreningar
fasader.Orm().Query(). mit("Inlägg").Create(&user)

// När du skapar användare, ignorera namnfältet, men skapa alla underordnade associationer
fasader. rm().Query().Omit("Namn").Create(&user)

// När du skapar användare, ignorera Namnfältet och alla underordnade associationer
facades.Orm().Query().Omit("Namn", orm.Associations).Create(&user)
```

### Hitta kopplingar

```go
// Hitta alla matchande relaterade poster
var posts []models.Post
facades.Orm().Query().Model(&user).Association("inlägg").Find(&inlägg)

// Hitta associationer med villkor
fasader.Orm().Query().Model(&user).Var("namn = ?", "goravel").Order("id desc").Association("inlägg").Find(&inlägg)
```

### Lägg till kopplingar

Lägg till nya associationer till `Många Till Många`, `En Till Många`, byt ut nuvarande associering till `En Till En`,
`En Till En(Omvändare)`:

```go
facades.Orm().Query().Model(&user).Association("inlägg").Append([]*models.Post{Post1, Post2})

fasades.Orm().Query().Model(&user).Association("inlägg").Append(&models.Post{Name: "goravel"})
```

### Ersätt associationer

Ersätt nuvarande associationer med nya:

```go
facades.Orm().Query().Model(&user).Association("inlägg").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("inlägg").Replace(models.Post{Name: "goravel"}, Post2)
```

### Ta bort kopplingar

Ta bort relationen mellan källa och argument om det finns, ta bara bort referens, kommer inte att ta bort dessa objekt från
DB, den främmande nyckeln måste vara NULL:

```go
facades.Orm().Query().Model(&user).Association("inlägg").Ta bort ([]*modeller.Post{Post1, Post2})

fasades.Orm().Query().Model(&user).Association("inlägg").Ta bort (Post1, Post2)
```

### Rensa kopplingar

Ta bort all referens mellan källa & association, kommer inte ta bort dessa associationer:

```go
facades.Orm().Query().Model(&user).Association("inlägg").Clear()
```

### Antal kopplingar

Ger tillbaka antalet nuvarande associationer:

```go
facades.Orm().Query().Model(&user).Association("Inlägg").Count()

// Räkna med villkoren
facades.Orm().Query().Model(&user).Var("namn = ?", "goravel").Association("inlägg").Count()
```

### Batch-data

```go
// Hitta alla roller för alla användare
facades.Orm().Query().Model(&users).Association("inlägg").Sök(&inlägg)

// Ta bort användare A från alla användares Inlägg
fasader. rm().Query().Model(&users).Association("inlägg").Ta bort (&userA)

// Få tydligt antal av alla användares Inlägg
fasader. rm().Query().Modell(&användare).Association("inlägg"). ount()

// För `Append`, `Replace` med batch-data, längden på argumenten måste vara lika med datans längd annars kommer det att returnera ett fel
var användare = []modeller. Ser{user1, user2, user3}

// Vi har 3 användare, Lägg till userA till användarens team, lägg till userB till user2's team, lägg till userA, userB och userC till user3's team
fasader. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]models. Ser{userA, userB, userC})

// Återställ användarens team till userA,återställ användarens team till userB, återställ användarens team till userA, userB och userC
fasader. rm().Query().Model(&users).Association("Team").Ersättare(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Eager Laddar

Eager lastning bekvämligheter för att fråga flera modeller, och lindrar "N + 1" frågeproblem. För att illustrera N +
1-frågeproblemet, överväga en `Book`-modell som "tillhör" en `Author`-modell:

```go
type Author struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  Namnsträng
  Författare *Författare
}
```

Låt oss nu hämta alla böcker och deras författare:

```go
var books models.Book
facades.Orm().Query().Find(&böcker)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

För att hämta alla böcker i databastabellen tillsammans med sina författare, utför loop-koden en fråga för varje bok.
Detta innebär att för en samling av 25 böcker, loopen skulle köra 26 frågor - en för samlingen av böcker och 25
mer för att få författaren till varje bok.

Vi kan dock förenkla denna process med hjälp av ivrig lastning. Genom att använda `With`-metoden kan vi ange vilka
-relationer som måste laddas ivrigt och minska antalet frågor till bara två.

```go
var böcker modeller.Bok
fasader.Orm().Query().With("Författare").Find(&böcker)

för _, bok := range books {
  fmt.Println(book.Författare)
}
```

För denna åtgärd, bara två frågor kommer att utföras - en fråga för att hämta alla böcker och en fråga för att hämta
författare för alla böcker:

```sql
välj * från `books`;

välj * från `authors` där `id` i (1, 2, 3, 4, 5, ...);
```

### Eager laddar flera relationer

Ibland kan du behöva ivriga ladda flera olika relationer. För att göra det, anropa bara `With`-metoden flera
gånger:

```go
var bokmodeller.Bok
fasader.Orm().Query().With("Författare").With("Utgivare").Find(&book)
```

### Inkapslad Eager Laddar

För att ivriga ladda ett förhållandes relationer kan du använda "dot" syntax. Till exempel, låt oss ivrigt ladda alla bokens
författare och alla författarens personliga kontakter:

```go
var bokmodeller.Bok
fasader.Orm().Query().With("Författare.Kontakter").Find(&book)
```

### Begränsade påfrestningar

Ibland kan du vilja ivra på att ladda en relation men också ange ytterligare frågevillkor för ivriga att ladda
frågan. Du kan åstadkomma detta enligt nedan:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Författare", "namn = ?", "författare"). ind(&book)

facades.Orm().Query().With("Författare", funktion (fråga orm.Query) orm.Query {
  returnera fråga.Var("namn = ?", "författare")
}).Sök(&bok)
```

I det här exemplet kommer Orm endast att lägga in inlägg där inläggets `namn`-kolumn är lika med ordet `författare`.

### Lata ivriga Laddar

Ibland kan du behöva ladda en relation efter att föräldermodellen redan har hämtats. Till exempel kan detta
vara användbart om du behöver dynamiskt bestämma om du ska ladda relaterade modeller:

```go
var böcker modeller.Bok
fasader.Orm().Query(). ind(&böcker)

for _, book := range books {
  if someCondition {
    err := fasader. rm().Query().Load(&book, "Author")
  }
}
```

Om du behöver ställa in ytterligare frågevillkor för inmatningsfrågan kan du använda koden nedan:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Författare", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "författare")
}).Sök(&bok)
```

För att ladda ett förhållande endast när det inte redan har laddats, använd `LoadMissing`-metoden:

```go
fasades.Orm().Query().LoadMissing(&book, "Författare")
```
