# Opslag van bestanden

De Goravel biedt eenvoudige drivers voor het werken met lokale bestandssystemen, Amazon S3, Aliyun OSS, Tencent COS, Minio en
Cloudinary. Nog beter, schakelen tussen deze opslagopties tussen je lokale ontwikkelmachine en productie
server is verbazingwekkend eenvoudig omdat de API hetzelfde blijft voor elk systeem. Goravel komt met een `local` chauffeur, voor andere
chauffeurs, controleer het bijbehorende onafhankelijke extensiepakket:

| Chauffeur  | Koppeling                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| S3         | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS        | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS        | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Minio      | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Cloudinair | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Configuratie

Goravel's bestandssysteemconfiguratiebestand bevindt zich in `config/filesystems.go`. Binnen dit bestand kunt u alle
van uw bestandssysteem "schijf" configureren, elke schijf staat voor een bepaalde opslagstuurprogramma en opslaglocatie.

> Je kunt zoveel schijven configureren als je wilt en mogelijk meerdere schijven hebben die hetzelfde stuurprogramma gebruiken.

### De Lokale Driver

Bij gebruik van het `local` driver, alle bestandsoperaties zijn relatief ten opzichte van de `root` map gedefinieerd in je `filesystems`
configuratiebestand. Standaard is deze waarde ingesteld op de `storage/app` map. Daarom zou de volgende methode
schrijven naar `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "Contents")
```

### De openbare schijf

De `Publiek`` schijf opgenomen in uw applicatie's`filesystems
`configuratiebestand is bedoeld voor bestanden die openbaar toegankelijk zullen zijn. Standaard gebruikt het`public
`disk het`local`stuurprogramma en slaat de bestanden op in`storage/app/public\`. Als u dit bestand vanaf het web wilt bezoeken,
kunt u een bestandsroutering aanmaken:

```go
facades.Route().Static("storage", "./storage/app/public")
```

## Verkrijg Schijf Instanties

De `Opslag` facade kan gebruikt worden voor interactie met een van uw geconfigureerde schijven. U kunt bijvoorbeeld de `Put`
methode op de façade gebruiken om een avatar op de standaard schijf op te slaan. Als je methoden oproept op de `Storage` facade zonder eerst
de `Disk` methode aanroept, zal de methode automatisch worden doorgegeven aan de standaard schijf:

```go
facades.Storage().Put("avatars/1.png", "Contents")
```

Als je applicatie meerdere schijven gebruikt, gebruik de `Disk` methode op de `Storage` facade om met
bestanden op een bepaalde schijf te werken:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## Context van injectie

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## Bestanden ophalen

De `Get` methode kan worden gebruikt om de inhoud van een bestand op te halen. De inhoud van de onbewerkte tekenreeksen van het bestand wordt geretourneerd door
de methode. Vergeet niet dat alle bestandspaden relatief moeten zijn ten opzichte van de 'root' locatie van de schijf:

```go
Inhoud := facades.Storage().Get("file.jpg")
```

De `Bestaat` methode kan worden gebruikt om te bepalen of een bestand bestaat op de schijf:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

De `Missing` methode kan worden gebruikt om te bepalen of er een bestand ontbreekt op de schijf:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### Bestand URL 's

U kunt de `Url` methode gebruiken om de URL van een bepaald bestand te krijgen. Als je de `local` driver gebruikt, dit zal meestal
zijn en een `/storage` naar het opgegeven pad zetten en een relatieve URL teruggeven naar het bestand. Als u gebruik maakt van de `s3` driver, zal de
volledig gekwalificeerde externe URL worden geretourneerd:

```go
url := facades.Storage().Url("file.jpg")
```

> Bij gebruik van de `local` driver, is de return value van `Url` niet de URL gecodeerd. Om deze reden raden we u aan om altijd
> uw bestanden op te slaan met namen die geldige URL's maken.

#### Tijdelijke URL's

Met behulp van de `TemporaryUrl` methode kunt u tijdelijke URL's maken aan bestanden die zijn opgeslagen met behulp van de niet-lokale driver. Deze methode
accepteert een pad en een 'Tijds'-instantie die aangeeft wanneer de URL moet verlopen:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Metadata bestand

Naast het lezen en schrijven van bestanden kan Goravel ook informatie geven over de bestanden zelf:

```go
size := facades.Storage().Size("file.jpg")
```

De 'LastModified' methode retourneert de laatst gewijzigde tijd van het bestand:

```go
tijd, err := facades.Storage().LastModified("file.jpg")
```

Het MIME-type van een bepaald bestand kan worden verkregen via de `MimeType` methode:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Ook de `NewFile` methode kan gebruiken:

```go
import "github.com/goravel/framework/filesystem"

bestand, err := filesystem.NewFile("./logo.png")
grootte, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Bestandspaden

Om een pad te krijgen voor een specifiek bestand, kunt u de 'Path'-methode gebruiken. Bij het gebruik van de `local` driver zal
je het absolute pad naar het bestand geven. Als je echter een driver zoals `s3` gebruikt, zal de methode je
het relatieve pad van het bestand in de bucket geven:

```go
path := facades.Storage().Path("file.jpg")
```

## Bestanden opslaan

De `Put` methode kan worden gebruikt om de bestandsinhoud op te slaan op een schijf. Onthoud, alle bestandspaden moeten relatief worden opgegeven ten opzichte van
de "root" locatie geconfigureerd voor de schijf:

```go
err := facades.Storage().Put("file.jpg", contents)
```

Je kunt ook `PutFile` en `PutFileAs` gebruiken om bestanden direct op de schijf op te slaan:

```go
import "github.com/goravel/framework/filesystem"

// Genereer automatisch een unieke ID voor bestandsnaam...
bestand, err := filesystem.NewFile("./logo.png")
pad := facades.Storage(). utFile("fotos", bestand)

// Handmatig een bestandsnaam...
bestand, err := filesystem.NewFile("./logo.png")
pad := facades.Storage().PutFileAs("fotos", bestand, "photo.jpg")
```

Er zijn een paar belangrijke dingen te melden over de 'PutFile'-methode. Merk op dat we alleen een mapnaam hebben opgegeven en
geen bestandsnaam. Standaard zal de `PutFile` methode een unieke ID genereren om te dienen als bestandsnaam. De bestandsextensie
zal worden bepaald door het onderzoeken van het MIME-type van het bestand. Het pad naar het bestand zal geretourneerd worden door de `PutFile`
methode zodat u het pad kunt opslaan, inclusief de gegenereerde bestandsnaam, in uw database.

### Bestanden kopiëren en verplaatsen

De `Kopiëren` methode kan worden gebruikt om een bestaand bestand te kopiëren naar een nieuwe locatie op de schijf, terwijl de `Move` methode
kan worden gebruikt om een bestaand bestand te hernoemen of te verplaatsen naar een nieuwe locatie:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Bestand Uploads

In webapplicaties is een van de meest voorkomende gebruiksgevallen voor het opslaan van bestanden het opslaan van door gebruiker geüploade bestanden zoals foto's
en documenten. Goravel maakt het gemakkelijk om geüploade bestanden op te slaan met behulp van de `Store` methode op een geüploade bestandsinstantie.
Roep de `Store` methode aan met het pad waarheen u het geüploade bestand wilt opslaan:

```go
func (r *UserController) Show(ctx http.Context) {
  bestand, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Er zijn een paar belangrijke dingen te melden over dit voorbeeld. Merk op dat we alleen een mapnaam hebben gespecificeerd, niet een
bestandsnaam. Standaard zal de `Store` methode een unieke ID genereren om te dienen als bestandsnaam. De bestandsextensie zal
worden bepaald door het onderzoeken van het MIME-type van het bestand. Het pad naar het bestand zal geretourneerd worden door de methode 'Opslaan', zodat
het pad kan opslaan inclusief de gegenereerde bestandsnaam, in uw database.

Je kunt ook de `PutFile` methode op de `Storage` façade aanroepen om dezelfde bestandsopslag te gebruiken als het voorbeeld
hierboven:

```go
import "github.com/goravel/framework/filesystem"

bestand, err := filesystem.NewFile("./logo.png")
pad := facades.Storage().PutFile("fotos", bestand)
```

### Een bestandsnaam opgeven

Als u niet wilt dat een bestandsnaam automatisch wordt toegewezen aan uw opgeslagen bestand, kunt u de `StoreAs` methode gebruiken. welke
het pad, de bestandsnaam en de (optioneel) schijf ontvangt als argumenten:

```go
bestand, err := ctx.Request().File("avatar")
path, err := file.StoreAs("avatars", "naam")
```

U kunt ook de `PutFileAs` methode op de opslagfacade gebruiken, die dezelfde bestandsopslag zal uitvoeren als het bovenstaande voorbeeld
:

```go
import "github.com/goravel/framework/filesystem"

bestand, err := filesystem.NewFile("./logo.png")
pad := facades.Storage().PutFileAs("foto's", bestand, "naam")
```

> Als de bestandsnaam opgegeven door `StoreAs` en `PutFileAs` geen achtervoegsel heeft, het achtervoegsel wordt automatisch toegevoegd aan basis
> op de MIME van het bestand; anders wordt de opgegeven bestandsnaam direct gebruikt.

### Een schijf opgeven

Standaard zal de geüploade bestandsmethode 'Opslaan' uw standaard schijf gebruiken. Als u een andere schijf wilt specificeren,
gebruik dan de `Disk` methode:

```go
func (r *UserController) Show(ctx http.Context) {
  bestand, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Andere geüploade bestandsinformatie

Als u de originele naam en extensie van het geüploade bestand wilt krijgen, u kunt dit doen met de
`GetClientOriginalName` en `GetClientOriginalExtension` methoden:

```go
bestand, err := ctx.Request().File("avatar")

naam := file.GetClientOriginalName()
extensie := file.GetClientOriginalExtension()
```

Houd er echter rekening mee dat de `GetClientOriginalName` en `GetClientOriginalExtension` methoden als onveilig worden beschouwd,
omdat de bestandsnaam en extensie kunnen worden gemanipuleerd door een kwaadaardige gebruiker. Om deze reden kunt u de voorkeur geven aan
de `HashName` en `Extension` methoden om een naam en een extensie voor het opgegeven bestand te verkrijgen:

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // Generate a unique, random name...
extension, err := file.Extension() // Determine the file's extension based on the file's MIME type...
```

## Deleting Files

The `Delete` method accepts a single filename or an array of files to delete:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

If necessary, you may specify the disk that the file should be deleted from:

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## Directories

### Get All Files Within A Directory

The `Files` method returns a slice of all of the files in a given directory. If you would like to retrieve a list of all
files within a given directory including all subdirectories, you may use the `AllFiles` method:

```go
files, err := facades.Storage().Disk("s3").Files("directory")
files, err := facades.Storage().Disk("s3").AllFiles("directory")
```

### Get All Directories Within A Directory

The `Directories` method returns a slice of all the directories within a given directory. Additionally, you may use the
`AllDirectories` method to get a list of all directories within a given directory and all of its subdirectories:

```go
directories, err := facades.Storage().Disk("s3").Directories("directory")
directories, err := facades.Storage().Disk("s3").AllDirectories("directory")
```

### Create A Directory

The `MakeDirectory` method will create the given directory, including any needed subdirectories:

```go
err := facades.Storage().MakeDirectory(directory)
```

### Delete A Directory

Finally, the `DeleteDirectory` method may be used to remove a directory and all of its files:

```go
err := facades.Storage().DeleteDirectory(directory)
```

## Custom Filesystems

You can set the `custom` driver in the `config/filesystems.go` file.

```go
"custom": map[string]any{
  "driver": "custom",
  "via":    filesystems.NewLocal(),
},
```

You need to implement the `github.com/goravel/framework/contracts/filesystem/Driver` interface in the `via`
configuration item.

```go
type Driver interface {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, error)
  Copy(oldFile, newFile string) error
  Delete(file ...string) error
  DeleteDirectory(directory string) error
  Directories(path string) ([]string, error)
  Exists(file string) bool
  Files(path string) ([]string, error)
  Get(file string) (string, error)
  GetBytes(file string) ([]byte, error)
  LastModified(file string) (time.Time, error)
  MakeDirectory(directory string) error
  MimeType(file string) (string, error)
  Missing(file string) bool
  Move(oldFile, newFile string) error
  Path(file string) string
  Put(file, content string) error
  PutFile(path string, source File) (string, error)
  PutFileAs(path string, source File, name string) (string, error)
  Size(file string) (int64, error)
  TemporaryUrl(file string, time time.Time) (string, error)
  WithContext(ctx context.Context) Driver
  Url(file string) string
}
```

> Note: Since the configuration has not been loaded when the custom driver is registered, so please use
> `facades.Config().Env` to obtain the configuration in the custom driver.
