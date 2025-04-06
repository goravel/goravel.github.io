# Relaţii

Este obişnuit ca tabelele bazei de date să fie interconectate. For instance, a blog post may have many comments, or an order may
be linked to the user who placed it. `Orm` simplifică gestionarea şi abordarea unor astfel de relaţii şi se poate ocupa de
diferite relaţii comune:

- [One To One](#one-to-one)
- [Unul pentru mulți](#one-to-many)
- [Mulți pentru mulți](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Definirea relaţiilor

### Unul la unu

O relaţie unu-la-unu este un tip de relaţie de bază a bazei de date. De exemplu, un model `User` ar putea fi asociat
cu un model `Phone`.

```go
type Utilizator lovit {
  orm. odel
  Numele
  Telefon *Phone
}

type Phone struct {
  orm. Adel
  Utilizator ID uint
  Şir de nume
}
```

Când se utilizează `Orm`, aceasta atribuie automat cheia străină relației bazate pe numele modelului părinte. Pentru
exemplu, modelul `Phone` se presupune că are în mod implicit o cheie străină `UserID`. Cu toate acestea, dacă doriţi să schimbaţi această convenţie
puteţi adăuga o etichetă `ignKey` în câmpul `Phone` din modelul `User`. (Acest lucru este valabil și pentru alte relații
cu A.)

```go
type Utilizator lovit {
  orm. odel
  Numele
  Telefon *Telefon `gorm:"ExternKey:UserName"`
}

tip de telefon struct {
  orm. Sirul de nume odel
  Nume de utilizator
  Şir de nume
}
```

În plus, atunci când se folosește `Orm`, se presupune că cheia străină trebuie să se potrivească cu coloana principală a cheii părinte.
Asta înseamnă că `Orm` va căuta valoarea coloanei `ID` a utilizatorului în coloana `UserId` a înregistrării `Phone`. Dacă
dorești să folosești o altă valoare a cheii primare decât `ID`, puteți adăuga o referință "Etichetă" la câmpul `Phone` din modelul `User`. Pentru
fă asta, pur și simplu transmite un al treilea argument metodei `hasOne`. (Alte configurări ale relaţiei sunt similare.)

```go
type Utilizator lovit {
  orm. odel
  Nume șir
  Telefon *Telefon `gorm:"străine:UserName; eferences:name"`
}

type Phone struct {
  orm. Sirul de nume odel
  Nume de utilizator
  Şir de nume
}
```

#### Definire Inversă a relaţiei

Putem accesa modelul `Phone` din modelul nostru `User`. Now, we need to establish a relationship on `Phone` model that
allows us to access the phone's owner. Pentru a face acest lucru, putem defini un câmp `User` în modelul `Phone`.

```go
tastați Utilizator lovit {
  orm.Model
  Numele
}

tastați Telefon {
  orm. uint ID odel

  Nume
  Utilizator *Utilizator
}
```

### Una la multe

O relație unu-la-mulți este folosită pentru a defini relații în care un singur model este părintele unuia sau mai multor modele de copil
. De exemplu, o postare pe blog poate avea un număr infinit de comentarii. Ca toate celelalte relaţii `Orm`,
una la mai multe relaţii sunt definite prin definirea unui câmp pe modelul `Orm`:

```go
scrie Post lovit {
  orm. odel
  Numele
  Comentarii []*Comment
}

type Comment struct {
  orm. odel
  PostID uint
  Nume
}
```

Ține minte, `Orm` va determina automat coloana corectă de taste străine pentru modelul `Comentează`. Prin convenție, Orm
va lua numele "cazului cocoașă" al modelului părinte și îl va înlocui cu `ID`. Deci, în acest exemplu, Orm va presupune coloana de taste externe
de pe modelul `Comentează` este `PostID`.

### Una la Mulți (Inverse) / Belongs către

Acum că putem accesa toate comentariile unui post, haideți să definim o relație pentru a permite unui comentariu să acceseze postarea părintelui
. Pentru a defini inversa unei relații `One To Many`, definiți o metodă de relație pe modelul copil care numește
metoda `aparținând`:

```go
scrie Post lovit {
  orm. odel
  Numele
  Comentarii []*Comment
}

type Comment struct {
  orm. odel
  PostID uint
  Nume
  Post *Post
}
```

## Multe către multe relaţii

Relaţiile dintre multe şi multe sunt puţin mai complicate decât relaţiile `One To One` şi `One To Many`. Un exemplu de relaţie
mult-la-multe este un utilizator care are multe roluri şi aceste roluri sunt împărtăşite şi de alţi utilizatori din aplicaţia
. De exemplu, unui utilizator i se poate atribui rolul de „autor” și „editor”; Totuși, aceste roluri pot fi, de asemenea,
atribuite și altor utilizatori. Deci, un utilizator are multe roluri şi un rol are mulţi utilizatori.

### Structura tabelelor

Pentru a defini această relaţie, sunt necesare trei tabele de bază: `users`, `roles`, şi `role_user`. Numele tabelului
pentru `role_user` poate fi personalizat şi conţine coloane `user_id` şi `role_id`. Acest tabel este folosit ca un tabel intermediar
care leagă utilizatorii şi rolurile.

Amintiți-vă, deoarece un rol poate aparține mai multor utilizatori, nu putem plasa pur și simplu o coloană `user_id` pe tabelul `roluri`. Acest
ar însemna că un rol ar putea aparține doar unui singur utilizator. Pentru a oferi suport pentru rolurile atribuite lui
mai mulți utilizatori, este necesar tabelul `role_user`. Putem rezuma structura de masă a relaţiei astfel:

```
utilizatorii
  id - integer
  nume - şir roluri


  id - număr întreg
  nume - şir

role_user
  user_id - integer
  role_id - număr întreg
```

### Structură model

Putem defini un câmp `Roles` pe modelul `User`:

```go
type Utilizator lovit {
  orm. odel
  Numele
  Roluri []*Rolul `gorm:"many2many:role_user"`
}

tip Role struct {
  orm. odel
  Şir de nume
}
```

### Definire Inversă a relaţiei

Pentru a defini inversul relaţiei, doar definiţi un câmp `Utilizatori` în modelul `Role` şi adăugaţi o Etichetă.

```go
type Utilizator lovit {
  orm. odel
  Numele
  Roluri []*Rolul `gorm:"many2many:role_user"`
}

tip Role struct {
  orm. odel
  Numele de utilizator
  Utilizatori []*Utilizator `gorm:"many2many:role_user"`
}
```

### Tabel intermediar personalizat

În general, cheia străină de masă intermediară este denumită de "cazul de şarpe" al numelui modelului părinte, puteți să le suprascrieți
cu `joinForeignKey`, `joinReferences`:

```go
type Utilizator lovit {
  orm. odel
  Numele
  Roluri []*Rolul `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

type Role struct {
  orm. odel
  Şir de nume
}
```

Structura tabelelor:

```
utilizatorii
  id - integer
  nume - şir roluri


  id - număr întreg
  nume - şir

role_user
  user_name - integer
  role_name - număr întreg
```

## Polimorfism

O relație polimorfică permite modelului de copil să aparțină mai multor tipuri de modele folosind o singură asociație.
De exemplu, imaginați-vă că construiți o aplicație care permite utilizatorilor să partajeze postări de blog și videoclipuri. In such an
application, a `Comment` model might belong to both the `Post` and `Video` models.

### Structura tabelelor

O relaţie polimorfică este similară unei relaţii normale; Totuși, modelul copil poate aparține mai mult de un tip de model
folosind o singură asociere. De exemplu, un blog `Post` şi un `User` pot partaja o relaţie polimorfică cu un model `Image`
. Folosind o relaţie polimorfică vă permite să aveţi un singur tabel de imagini unice care pot fi asociate cu postările
şi utilizatorii. În primul rând, să examinăm structura tabelelor:

```
postări
  id - nume întreg
  - şir

video-uri
  id - nume integer
  - şir

imagini
  id - integer
  url - şir
  imageable_id - integer
  imageable_type - şir

comentarii
  id - integer
  corp - text
  commentable_id - integer
  commentable_type - şir
```

Țineți cont de coloanele `imageable_id` și `imageable_type` din tabelul `images`. Coloana `imageable_id` va conține valoarea
ID-ului postării sau utilizatorului, în timp ce coloana `imageable_type` va conţine numele clasei modelului părinte. Coloana
`imageable_type` este folosită de Orm pentru a determina ce "tip" de model părinte să se întoarcă la accesarea relaţiei `imageable`
. Tabelul `comentarii` este similar.

### Structură model

Apoi, hai să examinăm definițiile modelului necesare pentru a construi această relație:

```go
scrie Post lovit {
  orm. odel
  Numele
  Imaginea *Imaginea `gorm:"polymorphic:Imageable"`
  Comentarii []*Comentariu `gorm:"polymorphic:Commentable"`
}

tip video struct {
  orm. odel
  Nume şir
  Imaginea *Imaginea `gorm:"polymorphic:Imageable"`
  Comentarii []*Comentează `gorm:"polymorphic:Commentable"`
}

tip Image struct {
  orm. odel
  Numele
  ImageableID uint
  ImageableType siing
}

type Comment struct {
  orm. string de nume
  CommentableID uint
  CommentableID uint
  CommentableType string
}
```

Poți schimba valoarea polimorficică cu eticheta `polymorphicValue`, cum ar fi:

```go
type Post construit {
  orm.Model
  Numele
  Imagine *Imaginea `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Interogarea asociațiilor

De exemplu, imaginați-vă o aplicație de blog în care modelul `User` are multe modele asociate `Post`:

```go
type Utilizator lovit {
  orm. odel
  Nume șir
  Postări []*Post
}

type Post struct {
  orm. Adel
  Utilizator ID uint
  Şir de nume
}
```

### Creează sau actualizează asocierile

Puteţi utiliza metodele `Select`, `Omit` pentru a controla crearea şi actualizarea asocierilor. Aceste două metode nu pot fi
folosite în acelaşi timp şi funcţiile de control asociate sunt aplicabile numai la `Create`, `Update`, `Save`:

```go
utilizator := models.User{Nume: "user", postări: []*models.Post{{Name: "post"}}}

// Creați toate asociațiile copil în timp ce creați fațade
ale utilizatorului. rm().Query().Select(orm.Associations).Create(&user)

// Doar crează Post în timpul creării utilizatorului. Notă: Dacă nu utilizați `orm.Associations`, dar personalizați separat, toate câmpurile din modelul părinte ar trebui să fie, de asemenea, listate în acest moment.
facades.Orm().Query().Select("Nume", "Postări"). reate(&user)

// Când creați un utilizator, ignorați postarea, dar creați toate celelalte asociații de copii
fațades.Orm().Query(). mit("Postări").Create(&user)

// Când creați Utilizator, ignorați câmpul nume, dar creați asociații copil
fațade. rm().Query().Omit("Nume").Create(&user)

// La crearea utilizatorului, ignoră câmpul Nume și toate asociațiile de copii
fațades.Orm().Query().Omit("Nume", orm.Associations).Create(&user)
```

### Găsiți asocieri

```go
// Găsiți toate înregistrările corespunzătoare
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&postări)

// Găsiți asociații cu condițiile
facades.Orm().Query().Model(&user).Unde ("nume = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Adăugare asocieri

Adăugați noi asocieri pentru `Many To Many`, `One To Many`, înlocuiți asocierea curentă pentru `One To One`,
`One To One(revers)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

faades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Nume: "goravel"})
```

### Înlocuire Asocieri

Înlocuiește asociațiile actuale cu altele noi:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

faades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Nume: "goravel"}, Post2)
```

### Șterge asocierile

Eliminați relația dintre argumente și sursă dacă există, ștergeți doar referința, nu va șterge acele obiecte din
DB, cheia străină trebuie să fie NULL:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

faades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Șterge asocierile

Elimină toate referințele dintre sursă și asociere, nu va șterge aceste asocieri:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Numără asocieri

Returnează numărul asocierilor actuale:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Numără cu conditiile
facades.Orm().Query().Model(&user).Where("nume = ?", "goravel").Association("Posts").Count()
```

### Date multiple

```go
// Găsiți toate rolurile pentru toți utilizatorii
faades.Orm().Query().Model(&users).Association("Posts").Find(&postări)

// Ștergeți utilizatorul A din fețele postărilor utilizatorului
. rm().Query().Model(&users).Association("Posts").Delete(&userA)

/ Obține un număr distinct de fațade pentru toate postările utilizatorilor
. rm().Query().Model(&users).Association("Posts"). ount()

// Pentru `Append`, `Înlocuiește` cu datele seriei, lungimea argumentelor trebuie să fie egală cu lungimea datelor sau în caz contrar va returna o eroare
var utilizatori = []modele. ser{user1, user2, user3}

// Avem 3 utilizatori, adăugați userA la echipa utilizatorului1, adăugați userB la fațadele utilizatorului, Apenizați utilizatorul, userB și userC la pagina
a utilizatorului. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]modele. ser{userA, userB, userC})

// Resetează echipa utilizatorului la userA,resetează echipa utilizatorului la utilizatorB, resetează echipa utilizatorului la fațadele utilizatorului3 la userA, userB și userC
. rm().Query().Model(&users).Association("Team").Înplace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Încărcare Eager

Facilitățile de încărcare pentru interogarea mai multor modele și ușurează problema de interogare "N + 1". Pentru a ilustra problema N +
1, considerați un model `Book` care "aparține cu" un model `Autor`:

```go
tastați Author struct {
  orm.Model
  Numele
}

tastați Book struct {
  orm. odel
  AuthorID uint
  Nume
  Autor *Author
}
```

Acum, haideți să recuperăm toate cărțile și autorii lor:

```go
var books models.Book
facades.Orm().Query().Find(&books)

pentru _, carte := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Pentru a prelua toate cărțile din tabelul bazei de date împreună cu autorii lor, codul buclei execută o interogare pentru fiecare carte.
Aceasta înseamnă că pentru o colecţie de 25 de cărţi, bucla ar rula 26 de interogări - una pentru colecția de cărți și încă 25
pentru a obține autorul fiecărei cărți.

Cu toate acestea, putem simplifica acest proces folosind încărcarea mai ușoară. Folosind metoda `Reat`, putem specifica care relaţii
trebuie să fie încărcate cu uşurinţă şi să reducem numărul de interogări la doar două.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

pentru _, carte := range books {
  fmt.Println(book.Author)
}
```

Pentru această operațiune, vor fi executate doar două interogări - o singură interogare pentru a prelua toate cărțile și o singură interogare pentru a prelua
autorii pentru toate cărțile:

```sql
selectaţi * din `cărţi";

selectaţi * din `autori` unde `id` din (1, 2, 3, 4, 5, ...);
```

### Incarcare Eager Relatii Multiple

Uneori poate fi nevoie să încărcaţi mai multe relaţii diferite. Pentru a face acest lucru, apelați metoda `With` de mai multe ori
:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Editor").Find(&book)
```

### Încărcare Eager imbricat

Pentru a încărca relațiile unei relații, poți folosi sintaxa "punct". De exemplu, haideţi să încărcăm toţi autorii cărţii
şi toate contactele personale ale autorului:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Constrângerea sarcinilor Eager

Uneori poate doriţi să încărcaţi o relaţie, dar specificaţi de asemenea condiţiile suplimentare de interogare pentru interogarea dorită
. Poți realiza acest lucru mai jos:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Querery {
  return query.Where("name = ?", "author")
}).Find(&book)
```

În acest exemplu, Orm va încărca postările doar în cazul în care coloana `nume` a postării este egală cu cuvântul `autor`.

### Încărcare Eager Lazy

Uneori poate fi necesar să încărcaţi o relaţie după ce modelul părinte a fost deja recuperat. De exemplu, acest
poate fi util dacă trebuie să decideți dinamic dacă să încărcați modele conexe:

```go
var books models.Book
facades.Orm().Query(). ind(&books)

pentru _, carte := range books {
  if someCondition {
    err := facades. rm().Query().Load(&book, "Autor")
  }
}
```

Dacă aveţi nevoie să setaţi constrângeri suplimentare de interogare pentru interogarea de încărcare uşoară, puteţi utiliza codul de mai jos:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "autor")
}).Find(&book)
```

Pentru a încărca o relaţie numai când nu a fost deja încărcată, utilizaţi metoda `LoadMissing`:

```go
facades.Orm().Query().LoadMissing(&book, "Autor")
```
