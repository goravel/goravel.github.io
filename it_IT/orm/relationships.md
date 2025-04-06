# Relazioni

È comune che le tabelle del database siano interconnesse. Per esempio, un post sul blog può avere molti commenti, o un ordine può
essere collegato all'utente che lo ha inserito. `Orm` semplifica la gestione e la gestione di tali relazioni, e può gestire
varie relazioni comuni:

- [One To One](#one-to-one)
- [Uno A Molti](#one-to-many)
- [Molti A Molti](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Definizione Delle Relazioni

### Uno A Uno

Una relazione one-to-one è un tipo molto fondamentale di relazione di database. Ad esempio, un modello `User` potrebbe essere associato
con un modello `Phone`.

```go
type User struct {
  orm. odel
  Name string
  Phone *Phone
}

type Phone struct {
  orm. odel
  UserID uint
  Nome stringa
}
```

Quando si utilizza `Orm`, assegna automaticamente la chiave esterna alla relazione in base al nome del modello padre. Per l'esempio
, si suppone che il modello `Phone` abbia una chiave esterna `UserID` per impostazione predefinita. Tuttavia, se si desidera modificare questa convenzione
, è possibile aggiungere un tag `foreignKey` al campo `Phone` nel modello `User`. (Ciò vale anche per altre relazioni
.)

```go
type User struct {
  orm. odel
  Name string
  Phone *Phone `gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm. odel
  UserName string
  Name string
}
```

Inoltre, quando si utilizza `Orm`, si presume che la chiave esterna debba corrispondere alla colonna principale della chiave del genitore.
Ciò significa che `Orm` cercherà il valore della colonna `ID` dell'utente nella colonna `UserId` del record `Phone`. Se
desidera utilizzare un valore chiave primario diverso da `ID`, puoi aggiungere un riferimento "Tag" al campo `Phone` nel modello `User`. Per
fare questo, basta passare un terzo argomento al metodo `hasOne`. (Altre impostazioni di relazione sono simili.)

```go
type User struct {
  orm. odel
  Stringa di nome
  Telefono *Telefono `gorm:"foreignKey:UserName; eferences:name"`
}

type Phone struct {
  orm. odel
  UserName string
  Name string
}
```

#### Definire L'Inverso Della Relazione

Possiamo accedere al modello `Phone` dal nostro modello `User`. Ora, abbiamo bisogno di stabilire una relazione sul modello `Phone` che
ci permette di accedere al proprietario del telefono. Per fare questo, possiamo definire un campo `User` nel modello `Phone`.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  UserID uint
  Nome stringa
  Utente *Utente
}
```

### Uno A Tanti

Una relazione one-to-many viene utilizzata per definire le relazioni in cui un singolo modello è il genitore di uno o più modelli di figlio
. Ad esempio, un post sul blog può avere un numero infinito di commenti. Come tutte le altre relazioni `Orm`, le relazioni
one-to-many sono definite definendo un campo sul tuo modello `Orm`:

```go
type Post struct {
  orm. odel
  Name string
  Comments []*Comment
}

type Comment struct {
  orm. odel
  PostID uint
  Nome stringa
}
```

Ricorda, `Orm` determinerà automaticamente la corretta colonna della chiave esterna per il modello `Commento`. Per convenzione, Orm
prenderà il nome del "caso gobbo" del modello genitore e lo suffisserà con `ID`. Così, in questo esempio, Orm assumerà la colonna della chiave esterna
sul modello `Commento` è `PostID`.

### Uno A Molti (Inverso) / Appartiene A

Ora che possiamo accedere a tutti i commenti di un post, definiamo una relazione per consentire a un commento di accedere al suo post padre
. Per definire l'inverso di una relazione `One To Many`, definire un metodo di relazione sul modello figlio che chiama
il metodo `belongsTo`:

```go
type Post struct {
  orm. odel
  Name string
  Comments []*Comment
}

type Comment struct {
  orm. odel
  PostID uint
  Nome stringa
  Post *Post
}
```

## Molti A Molte Relazioni

Molte relazioni tra molti sono leggermente più complicate delle relazioni `One To One` e `One To Many`. Un esempio di una relazione
multi-to-many è un utente che ha molti ruoli e questi ruoli sono condivisi anche da altri utenti nell'applicazione
. Ad esempio, a un utente può essere assegnato il ruolo di "Author" e "Editor"; tuttavia, tali ruoli possono anche essere
assegnati anche ad altri utenti. Così, un utente ha molti ruoli e un ruolo ha molti utenti.

### Struttura Della Tabella

Per definire questa relazione, sono necessarie tre tabelle di database: `users`, `roles`, e `role_user`. Il nome della tabella `role_user`
può essere personalizzato e contiene colonne `user_id` e `role_id`. Questa tabella è utilizzata come tabella intermedia
che collega utenti e ruoli.

Ricorda, poiché un ruolo può appartenere a molti utenti, non possiamo semplicemente inserire una colonna `user_id` nella tabella `roles`. Questo
significherebbe che un ruolo potrebbe appartenere solo a un singolo utente. Al fine di fornire supporto per i ruoli assegnati a più utenti
, è necessaria la tabella `role_user`. Possiamo riassumere la struttura della tabella della relazione così:

```
users
  id - nome intero
  - stringa

ruoli
  id - nome intero
  - stringa

role_user
  user_id - integer
  role_id - integer
```

### Struttura Modello

Possiamo definire un campo `Roles` sul modello `User`:

```go
type User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Nome stringa
}
```

### Definire L'Inverso Della Relazione

Per definire l'inverso del rapporto, basta definire un campo `Users` nel modello `<unk> ` e aggiungere un Tag.

```go
type User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Nome stringa
  Utenti []*Utente `gorm:"many2many:role_user"`
}
```

### Tabella intermedia personalizzata

In generale, la chiave esterna della tabella intermedia è nominata dal "caso serpente" del nome del modello madre, puoi sovrascrivere
da `joinForeignKey`, `joinReferences`:

```go
type User struct {
  orm. odel
  Nome stringa
  Ruoli []*Ruolo `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:жName"`
}

type Role struct {
  orm. odel
  Nome stringa
}
```

Struttura della tabella:

```
users
  id - nome intero
  - stringa

ruoli
  id - nome intero
  - stringa

role_user
  user_name - integer
  role_name - integer
```

## Polimorfico

Una relazione polimorfica permette al modello bambino di appartenere a più di un tipo di modello utilizzando una sola associazione.
Ad esempio, immagina che stai costruendo un'applicazione che permette agli utenti di condividere i post del blog e video. In questa applicazione
, un modello `Comment` potrebbe appartenere sia ai modelli `Post` che `Video`.

### Struttura della tabella

Una relazione polimorfica è simile a una relazione normale; tuttavia, il modello figlio può appartenere a più di un tipo di modello
utilizzando un'unica associazione. Ad esempio, un blog `Post` e un `User` possono condividere una relazione polimorfa con un modello `Image`
. L'utilizzo di una relazione polimorfica consente di avere una singola tabella di immagini uniche che possono essere associate ai post
e agli utenti. In primo luogo, esaminiamo la struttura del tavolo:

```
posts
  id - integer
  name - string

videos
  id - integer
  name - string

images
  id - integer
  url - string
  imageable_id - integer
  imageable_type - string

commenti
  id - integer
  body - text
  commentable_id - integer
  commentable_type - string
```

Nota le colonne `imageable_id` e `imageable_type` nella tabella `images`. La colonna `imageable_id` conterrà il valore ID
del post o dell'utente, mentre la colonna `imageable_type` conterrà il nome della classe del modello padre. La colonna
`imageable_type` è usata da Orm per determinare quale "tipo" del modello genitore restituire quando si accede alla relazione
`imageable`. La tabella `comments` è simile.

### Struttura Modello

Successivamente, esaminiamo le definizioni modello necessarie per costruire questa relazione:

```go
type Post struct {
  orm. odel
  Name string
  Image *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm. odel
  Name string
  Image *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  Nome stringa
  ImageableID uint
  ImageableType string
}

type Comment struct {
  orm. odel
  Nome stringa
  CommentabileID uint
  CommentabileTipo stringa
}
```

Puoi cambiare il valore polimorfico con il tag `polymorphicValue`, come:

```go
type Post struct {
  orm.Model
  Name string
  Image *Image `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Associazioni Di Interrogazione

Per esempio, immagina un'applicazione blog in cui un modello `User` ha molti modelli `Post` associati:

```go
type User struct {
  orm. odel
  Name string
  Posts []*Post
}

type Post struct {
  orm. odel
  UserID uint
  Nome stringa
}
```

### Crea o aggiorna associazioni

Puoi usare i metodi `Select`, `Omit` per controllare la creazione e l'aggiornamento delle associazioni. Questi due metodi non possono essere
utilizzati allo stesso tempo e le funzioni di controllo associate sono applicabili solo a `Crea`, `Update`, `Salva`:

```go
utente := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Crea tutte le associazioni figli durante la creazione di facciate utente
. rm().Query().Select(orm.Associations).Create(&user)

// Crea solo Post durante la creazione dell'utente. Nota: Se non si utilizza `orm.Associations`, ma personalizzare le associazioni specifiche dei figli separatamente, tutti i campi del modello genitore dovrebbero anche essere elencati in questo momento.
facades.Orm().Query().Select("Name", "Posts"). reate(&user)

// Quando si crea un Utente, ignora il Post, ma crea tutte le altre associazioni figlie
facades.Orm().Query(). mit("Posts").Create(&user)

// Quando si crea l'utente, ignora il campo Nome, ma crea tutte le facciate
associazioni figlie. rm().Query().Omit("Name").Create(&user)

// Durante la creazione dell'utente, ignora il campo Nome e tutte le associazioni figlie
facades.Orm().Query().Omit("Name", orm.Associations).Create(&user)
```

### Trova Associazioni

```go
// Trova tutti i record correlati corrispondenti
var messaggi []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Trova associazioni con condizioni
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Aggiungi Associazioni

Aggiungi nuove associazioni per `Many To Molti`, `One To Molti`, sostituisci l'associazione corrente per `One To One`,
`One To One(revers)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Sostituisci Associazioni

Sostituire le associazioni attuali con quelle nuove:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Elimina Associazioni

Rimuove la relazione tra sorgente e argomenti se esiste, elimina solo il riferimento, non eliminerà questi oggetti da
DB, la chiave esterna deve essere NULL:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Cancella Associazioni

Rimuovere tutti i riferimenti tra sorgente e associazione, non eliminare quelle associazioni:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Conteggio Associazioni

Restituisce il conteggio delle associazioni correnti:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Count with conditions
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Association("Posts").Count()
```

### Dati Gruppo

```go
// Trova tutti i ruoli per tutti gli utenti
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Elimina utente A da tutti i post dell'utente
facades. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Ottieni un numero distinto di tutti i post
degli utenti. rm().Query().Model(&users).Association("Posts"). ount()

// Per `Append`, `Replace` con i dati batch, la lunghezza degli argomenti deve essere uguale alla lunghezza dei dati altrimenti restituirà un errore
var utenti = []modelli. ser{user1, user2, user3}

// Abbiamo 3 utenti, Aggiungi utenteA al team dell'utente, aggiungi userB al team dell'utente, aggiungi userA, userB e userC alle facciate
del team dell'utente. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]models. ser{userA, userB, userC})

// Reimposta il team dell'utente 1 all'utenteA,ripristina il team dell'utente all'utente2, ripristina il team dell'utente a userA, userB e userC
facciate. rm().Query().Model(&users).Association("Team").Replace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Caricamento Eager

Facilità di caricamento agevole per interrogare più modelli, e allevia il problema di query "N + 1". Per illustrare il problema della query N +
1, considera un modello `Book` a cui "appartiene" un modello `Author`:

```go
type Author struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  Nome stringa
  Autore *Autore
}
```

Ora, recuperiamo tutti i libri e i loro autori:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Per recuperare tutti i libri nella tabella del database insieme ai loro autori, il codice del ciclo esegue una query per ogni libro.
Ciò significa che per una raccolta di 25 libri, il ciclo avrebbe eseguito 26 query - una per la raccolta di libri e 25
più per ottenere l'autore di ogni libro.

Tuttavia, possiamo semplificare questo processo utilizzando il caricamento desideroso. Utilizzando il metodo `With`, possiamo specificare quali relazioni
devono essere caricate con entusiasmo e ridurre il numero di query a solo due.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

for _, book := range books {
  fmt.Println(book.Author)
}
```

Per questa operazione, verranno eseguite solo due query - una per recuperare tutti i libri e una per recuperare gli autori di
per tutti i libri:

```sql
seleziona * da `books`;

seleziona * da `authors` dove `id` in (1, 2, 3, 4, 5, ...);
```

### Carico Interessante Relazioni Multiple

A volte potrebbe essere necessario desiderare di caricare diverse relazioni. Per farlo, basta chiamare il metodo `con` più volte
:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Carico Pregiato

Per caricare le relazioni di una relazione, è possibile utilizzare la sintassi "dot". Ad esempio, cerchiamo di caricare tutti gli autori
del libro e tutti i contatti personali dell'autore:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Vincolante Cariche Eager

A volte si può desiderare di caricare una relazione, ma anche specificare condizioni di query aggiuntive per il caricamento desideroso
query. È possibile realizzare questo come di seguito:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

In questo esempio, Orm caricherà solo i post dove la colonna `name` del post è uguale alla parola `author`.

### Caricamento Pigro

A volte potrebbe essere necessario caricare una relazione dopo che il modello genitore è già stato recuperato. Ad esempio, questo
può essere utile se è necessario decidere dinamicamente se caricare modelli correlati:

```go
var libri models.Book
facades.Orm().Query(). ind(&books)

for _, book := range books {
  if someCondition {
    err := facades. rm().Query().Load(&book, "Author")
  }
}
```

Se è necessario impostare ulteriori vincoli di interrogazione sulla query di caricamento desideroso, è possibile utilizzare il codice qui sotto:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Per caricare una relazione solo quando non è già stata caricata, usa il metodo `LoadMissing`:

```go
facades.Orm().Query().LoadMissing(&book, "Author")
```
