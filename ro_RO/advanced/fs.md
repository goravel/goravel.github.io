# Spațiu de stocare

Goravel oferă șoferi simpli pentru a lucra cu sisteme locale de fișiere, Amazon S3, Aliyun OSS, Tencent COS, Minio și
Cloudinar. Și mai bine; comutarea între aceste opțiuni de stocare între calculatorul de dezvoltare locală și serverul de producție
este uimitor de simplu, deoarece API rămâne același pentru fiecare sistem. Goravel vine cu un șofer `local`, pentru alți șoferi
verificați pachetul independent de extindere corespunzător:

| Șofer     | Link-ul                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| S3        | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS       | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS       | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Minio     | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Cloudinar | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Configurare

Fișierul de configurare a sistemului Goravel este localizat la `config/filesystems.go`. În cadrul acestui fişier, puteţi configura toate
din "discuri" sistemului de fişiere, fiecare disc reprezintă un anumit şofer de stocare şi o anumită locaţie de stocare.

> Puteți configura câte discuri doriți și puteți avea mai multe discuri care folosesc același șofer.

### Șofer local

Când folosiți șoferul `local`, toate operațiunile fișierului sunt relative la directorul `root` definit în fișierul de configurare
`filesystems`. În mod implicit, această valoare este setată la folderul `storage/app`. Prin urmare, următoarea metodă ar scrie
în `storage/app/exemple.txt`:

```go
fațades.Storage().Put("example.txt", "Contents")
```

### Discul Public

Discul `public`` inclus în aplicația ta `s`filesstems
este destinat fișierelor care vor fi accesibile publicului. În mod implicit, discul `public
' folosește șoferul `local` și stochează fișierele sale în `stocage/app/public`. Dacă doriți să vizitați acest fișier de pe web,
puteți crea o rutare a fișierului:

```go
fațades.Route().Static("storage", "./storage/app/public")
```

## Obținerea instanțelor discului

Fața `Storage` poate fi folosită pentru a interacționa cu oricare dintre dischetele configurate. De exemplu, puteți utiliza metoda `Put`
pe fațadă pentru a stoca un avatar pe discul implicit. Dacă apelați metode pe fațada `Storage` fără primul
apelând metoda `Disk`, metoda va fi transmisă automat pe discul implicit:

```go
fațades.Storage().Put("avatars/1.png", "Contents")
```

Dacă cererea dumneavoastră interacționează cu mai multe discuri, puteți folosi metoda `Disk` pe fațada `Storage` pentru a lucra cu fișierele
pe un anumit disc:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Conținuturi")
```

## Injectare context

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Conținuturi")
```

## Preluare fişiere

Metoda `Get` poate fi folosită pentru a prelua conținutul unui fișier. Conținutul brut al fișierului va fi returnat de
metoda. Amintiţi-vă, toate căile fişierelor ar trebui specificate relativ la locaţia `root` a discului:

```go
Conținutul := faades.Storage().Get("file.jpg")
```

Metoda `Exists` poate fi folosită pentru a determina dacă există un fişier pe disc:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

Metoda `Lipsă` poate fi folosită pentru a determina dacă un fişier lipseşte de pe disc:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### URL-uri fișier

Puteţi utiliza metoda `Url` pentru a obţine URL-ul pentru un fişier dat. Dacă folosiți șoferul `local`, în mod tipic
doar prefixați `/storage` la calea dată și returnați un URL relativ la fișier. Dacă utilizați șoferul `s3`, adresa
complet calificată la distanță va fi returnată:

```go
url := facades.Storage().Url("file.jpg")
```

> Când se utilizează driverul `local`, valoarea de returnare a lui `Url` nu este codată URL-ul. Din acest motiv, recomandăm întotdeauna
> stocarea fișierelor tale folosind nume care vor crea adrese URL valide.

#### URL-uri temporare

Folosind metoda `TemporaryUrl`, puteţi crea URL-uri temporare pentru fişierele stocate folosind şoferul non-local. Această metodă
acceptă o cale şi o instanţă `Time` specificând când URL-ul ar trebui să expireze:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)

```

### Fișiere metadate

Pe lângă lectura și scrierea dosarelor, Goravel poate furniza, de asemenea, informații despre dosarele propriu-zise:

```go
size := facades.Storage().Size("file.jpg")
```

Metoda `LastModified` returnează ultima dată modificată a fișierului:

```go
timp, err := facades.Storage().LastModified("file.jpg")
```

Tipul MIME al unui fişier dat poate fi obţinut prin metoda `MimeType`:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

De asemenea, se poate folosi metoda `NewFile`:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModied, err := fișier.LastModified()
mime, err := file.MimeType()
```

### Căi Fişiere

Pentru a obţine calea pentru un anumit fişier, puteţi utiliza metoda `Path`. When using the `local` driver, this will
provide you with the absolute path to the file. However, if you are using a driver like `s3`, the method will give you
the file's relative path within the bucket:

```go
Calea := faades.Storage().Path("file.jpg")
```

## Stocarea fişierelor

Metoda `Put` poate fi folosită pentru a stoca conținutul fișierului pe un disc. Ține minte, toate căile fișierelor ar trebui specificate relativ la
locația "root" configurată pentru disc:

```go
err := facades.Storage().Put("file.jpg", conținuturi)
```

Puteţi folosi, de asemenea, `PutFile` şi `PutFileAs` pentru a salva fişiere direct pe disc:

```go
import "github.com/goravel/framework/filesystem"

// Generează automat un ID unic pentru numele fișierului...
fișier, err := filesystem.NewFile("./logo.png")
path := facades.Storage(). utFile("fotografii", fișier)

// specificați manual un nume de fișier...
fișier, err := filesystem.NewFile("./logo.png") calea
:= faades.Storage().PutFileAs("fotografii", fișier, "photo.jpg")
```

Există câteva lucruri importante de remarcat despre metoda `PutFile`. Țineți cont că am specificat doar un nume de director și
nu un nume de fișier. În mod implicit, metoda `PutFile` va genera un ID unic pentru a servi ca nume de fișier. Extensia
a fișierului va fi determinată prin examinarea tipului MIME al fișierului. Calea către fișier va fi returnată prin metoda `PutFile`
pentru a putea stoca calea, inclusiv numele de fișier generat, în baza ta de date.

### Copiere & mutare fişiere

Metoda `Copy` poate fi folosită pentru a copia un fişier existent într-o locaţie nouă de pe disc, în timp ce metoda `Mișcare` poate fi
folosită pentru a redenumi sau muta un fișier existent într-o locație nouă:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Încărcări fișiere

În aplicaţiile web, unul dintre cele mai frecvente cazuri de utilizare pentru stocarea fişierelor este stocarea fişierelor încărcate cu utilizator, cum ar fi fotografiile
şi documentele. Goravel face ca stocarea fişierelor încărcate să fie foarte uşoară folosind metoda `Store` într-o instanţă de fişier încărcat.
Apelează metoda `Store` cu calea pe care dorești să stochezi fișierul încărcat:

```go
func (r *UserController) Show(ctx http.Context) {
  fişier, err := ctx.Request().File("avatar")
  traiectorie, err := file.Store("avatar")
}
```

Există câteva lucruri importante de remarcat în legătură cu acest exemplu. Țineți cont că am specificat doar un nume de director, nu un nume de fișier
. În mod implicit, metoda `Store` va genera un ID unic pentru a servi ca nume de fișier. The file's extension will
be determined by examining the file's MIME type. The path to the file will be returned by the `Store` method so you can
store the path, including the generated filename, in your database.

De asemenea, poți apela metoda `PutFile` pe fațada `Storage` pentru a efectua aceeași operațiune de stocare a fișierului ca exemplul
de mai sus:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("fotografii", fișier)
```

### Numele fișierului este specificat

Dacă nu doriți ca numele fișierului să fie atribuit automat fișierului stocat, puteți utiliza metoda `StoreAs`, pe care
primește calea către numele fișierului, și discul (opțional) ca argumente:

```go
fișier, err := ctx.Request().File("avatar")
calea, err := file.StoreAs("avatars", "name")
```

Puteți folosi, de asemenea, metoda `PutFileAs` pe fațada de stocare, care va efectua aceeași operațiune de stocare a fișierului ca și exemplul
de mai sus:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("fotografii", fișier, "name")
```

> Dacă numele fișierului specificat de `StoreAs` și `PutFileAs` nu are un sufix, sufixul este adăugat automat bazat pe
> pe MIME al fișierului; În caz contrar, numele fişierului specificat este folosit direct.

### Specificarea unui disc

În mod implicit, metoda `Store` a fișierului încărcat va folosi discul implicit. Dacă doriţi să specificaţi un alt disc,
vă rugăm să folosiţi metoda `Disk`:

```go
func (r *UserController) Show(ctx http.Context) {
  fişier, err := ctx.Request().File("avatar")
  traiectorie, err := file.Disk("s3").Store("avatars")
}
```

### Alte informații încărcate despre fișier

If you would like to get the original name and extension of the uploaded file, you may do so using the
`GetClientOriginalName` and `GetClientOriginalExtension` methods:

```go
fișier, err := ctx.Request().File("avatar")

nume := file.GetClientOriginalName()
extensie := file.GetClientOriginalExtension()
```

Cu toate acestea, țineți cont că metodele `GetClientOriginalName` și `GetClientOriginalExtension` sunt considerate nesigure,
ca numele fișierului și extensia pot fi modificate de un utilizator răuvoitor. Din acest motiv, ar trebui să preferați de obicei
metodele `HashName` și `Extension` pentru a obține un nume și o extensie pentru încărcarea unui fișier:

```go
fișier, err := ctx.Request().File("avatar")

nume := fișier.HashName() // Generează un nume unic, aleatoriu...
extensie, err := file.Extension() // Determinați extensia fișierului bazat pe tipul MIME al fișierului...
```

## Ştergere fişiere

Metoda `Delete` acceptă un singur nume de fișier sau o serie de fișiere pentru ștergere:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

Dacă este necesar, puteţi specifica discul de la care fişierul trebuie şters:

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## Directoare

### Obțineți toate fișierele dintr-un director

Metoda `Files` returnează o secţiune din toate fişierele dintr-un anumit director. Dacă doriţi să preluaţi o listă cu toate fişierele
dintr-un anumit director care include toate subdirectoarele, puteţi utiliza metoda `AllFiles`:

```go
fișiere, err := facades.Storage().Disk("s3").Fișiere ("director")
fișiere, err := faades.Storage().Disk("s3").AllFiles("director")
```

### Obține toate dosarele dintr-un director

Metoda `Directories` returnează o felie din toate directoarele dintr-un anumit director. Adițional, poți folosi metoda
pentru a obține o listă cu toate directoarele dintr-un anumit director și toate subdirectoriile sale:

```go
directoare := facades.Storage().Disk("s3").Directories("director")
directoare err := facades.Storage().Disk("s3").AllDirectories("director")
```

### Creează un director

Metoda `MakeDirectory` va crea directorul dat, inclusiv orice subdirectoare necesare:

```go
err := facades.Storage().MakeDirectory(director)
```

### Șterge un director

În cele din urmă, metoda `DeleteDirectory` poate fi folosită pentru a şterge un director şi toate fişierele sale:

```go
err := facades.Storage().DeleteDirectory(director)
```

## Fişiere personalizate

Puteți seta șoferul `custom` în fișierul `config/filesystems.go`.

```go
"custom": map[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Trebuie să implementați interfața `github.com/goravel/framework/contracts/filesystem/Driver` în elementul de configurare
din `via`.

```go
tastați interfața șoferului {
  AllDirectories(path string) ([]string, eroare)
  AllFiles(path string) ([]string, eroare)
  Copy(oldFile, newFile string) error
  Ștergere (fișier ... tring) eroare
  DeleteDirectory(șirul directorului) eroare
  Director (șir de directoare) []string, eroare)
  Exists(șirul de fișiere) bool
  Fișiere (text de traiectorie) ([]string, eroare)
  Get(șir de fișiere) (șir, eroare)
  GetBytes(șir de fișiere) ([]byte, eroare)
  LastModified(șirul de fișiere) (timpul) ime, eroare) eroarea
  MakeDirectory(șirul directorului)
  MimeType(șir de fișiere) (șir, eroare) Eroare
  Șir de fișiere absent
  Move(oldFile, șirul fișierului nou)
  Path(șirul de fișiere) șir
  Put(fișier, șirul de conținut) eroare
  PutFile(șir traiectorie, Fișier sursă) (șir, eroare)
  PutFileAs(text traiectorie, sursă File, şir de nume) (şir, eroare)
  Size(şir de fişiere) (int64, eroare)
  TemporaryUrl(şir fişier, oră. ime) (șir, eroare)
  WithContext(ctx context.Context) Driver
  Url(șirul de fișiere) șirul
}
```

> Notă: Deoarece configurația nu a fost încărcată atunci când șoferul personalizat este înregistrat, vă rugăm să folosiți
> `fațades. onfig().Env` pentru a obține configurația în driver-ul personalizat.
