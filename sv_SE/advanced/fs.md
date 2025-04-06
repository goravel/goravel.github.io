# Lagring av filer

Goravel ger enkla drivrutiner för att arbeta med lokala filsystem, Amazon S3, Aliyun OSS, Tencent COS, Minio och
Cloudinary. Ännu bättre, växla mellan dessa lagringsalternativ mellan din lokala utvecklingsmaskin och produktion
-servern är otroligt enkel eftersom API:et förblir detsamma för varje system. Goravel levereras med en `local`-drivrutin, för andra
-drivrutiner, vänligen kontrollera motsvarande oberoende tilläggspaket:

| Förare       | Länk                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| S3           | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS          | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS          | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Minio        | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Molnliknande | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Konfiguration

Goravels konfigurationsfil för filsystem finns på `config/filesystems.go`. I den här filen kan du konfigurera alla
i ditt filsystem "diskar", varje disk representerar en viss lagringsdrivrutin och lagringsplats.

> Du kan konfigurera så många diskar som du vill och kan även ha flera diskar som använder samma drivrutin.

### Den lokala föraren

När du använder `local`-drivrutinen är alla filoperationer relativa till `root`-katalogen definierad i dina `filesystems`
konfigurationsfil. Som standard är detta värde satt till katalogen `storage/app` . Därför skulle följande metod
skriva till `storage/app/example.txt`:

```go
fasader.Lagring().Put("example.txt", "Innehåll")
```

### Den offentliga disken

Den `public`` disken som ingår i din applikation's`filesystems
`konfigurationsfilen är avsedd för filer som kommer att vara offentligt tillgängliga. Som standard använder disken`public
`den lokala drivrutinen och lagrar sina filer i`storage/app/public\`. Om du vill besöka dessa filer från webben,
kan du skapa en filroutning:

```go
facades.Route().Static("lagring", "./lagring/app/public")
```

## Hämtar diskinstanser

Fasaden `Storage` kan användas för att interagera med någon av dina konfigurerade diskar. Till exempel kan du använda `Put`
-metoden på fasaden för att lagra en avatar på standarddisken. Om du anropar metoder på `Storage`-fasaden utan att först
anropa `Disk`-metoden, kommer metoden automatiskt att skickas till standarddisken:

```go
facades.Storage().Put("avatars/1.png", "Innehåll")
```

Om din applikation interagerar med flera diskar, du kan använda `Disk`-metoden på `Storage`-fasaden för att arbeta med
-filer på en viss disk:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Innehåll")
```

## Injektionskontext

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Innehåll")
```

## Hämtar filer

`Get`-metoden kan användas för att hämta innehållet i en fil. Den råa strängen innehållet i filen kommer att returneras med
metoden. Kom ihåg att alla filsökvägar ska anges i förhållande till diskens `root`-plats:

```go
innehåll := fasader.Lagring().Get("file.jpg")
```

Metoden `Exists` kan användas för att avgöra om en fil finns på disken:

```go
om (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

Metoden `Miss` kan användas för att avgöra om en fil saknas från disken:

```go
om (facades.Storage().Disk("s3").saknas("file.jpg")) {
    // ...
}
```

### Filens URL:er

Du kan använda `Url`-metoden för att få URL för en given fil. Om du använder `local`-drivrutinen, detta kommer typiskt
bara prepend `/storage` till den angivna sökvägen och returnera en relativ URL till filen. Om du använder `s3`-drivrutinen, kommer
fullt kvalificerade fjärr-URL att returneras:

```go
url := fasader.Lagring().Url ("file.jpg")
```

> När du använder `local`-drivrutinen är returvärdet `Url` inte URL-kodat. Av denna anledning rekommenderar vi att alltid
> lagrar dina filer med namn som skapar giltiga URL:er.

#### Tillfälliga URL:er

Med hjälp av `TemporaryUrl`-metoden kan du skapa tillfälliga webbadresser till filer som lagras med hjälp av den icke-lokala drivrutinen. Denna metod
accepterar en sökväg och en `Time`-instans som anger när URL:en ska gå ut:

```go
url, err := fasades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Metadata för fil

Förutom att läsa och skriva filer, Goravel kan också ge information om filerna själva:

```go
size := facades.Storage().Size("file.jpg")
```

Metoden `LastModified` returnerar den senaste modifierade tiden för filen:

```go
tid, err := fasader.Lagring().Senast Ändrad ("file.jpg")
```

MIME-typen av en viss fil kan erhållas via `MimeType`-metoden:

```go
mime, err := fasader.Lagring().MimeType("file.jpg")
```

Kan också använda `NewFile`-metoden:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModifierad, err := file.LastModified()
mime, err := file.MimeType()
```

### Sökvägar för filer

För att få sökvägen för en specifik fil kan du använda `Path`-metoden. När du använder `local`-drivrutinen, kommer detta
ge dig den absoluta sökvägen till filen. Men om du använder en drivrutin som `s3`, kommer metoden att ge dig
filens relativa sökväg inom hinket:

```go
sökväg := fasades.Storage().Path("file.jpg")
```

## Lagrar filer

`Put`-metoden kan användas för att lagra filinnehållet på en disk. Kom ihåg att alla filsökvägar ska anges i förhållande till
den "root"-plats som konfigurerats för disken:

```go
err := fasader.Lagring().Put("file.jpg", innehåll)
```

Du kan också använda `PutFile` och `PutFileAs` för att spara filer direkt på disken:

```go
importera "github.com/goravel/framework/filesystem"

// Generera automatiskt ett unikt ID för filnamn...
fil, err := filesystem.NewFile("./logo.png")
sökväg := facades.Storage(). utFile("foton", fil)

// Ange manuellt ett filnamn...
fil, err := filsystem.NewFile("./logo.png")
sökväg := facades.Storage().PutFileAs("foton", fil, "photo.jpg")
```

Det finns några viktiga saker att notera om `PutFile`-metoden. Observera att vi bara angav ett katalognamn och
inte ett filnamn. Som standard kommer `PutFile`-metoden att generera ett unikt ID för att fungera som filnamn. Filens
tillägg kommer att bestämmas genom att undersöka filens MIME-typ. Sökvägen till filen kommer att returneras med `PutFile`
metoden så att du kan lagra sökvägen, inklusive det genererade filnamnet, i din databas.

### Kopierar och flyttar filer

Metoden `Copy` kan användas för att kopiera en befintlig fil till en ny plats på disken, medan `Move`-metoden kan användas
för att byta namn eller flytta en befintlig fil till en ny plats:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Ladda upp filer

I webbapplikationer lagras en av de vanligaste användningsfallen för att lagra filer som användaren laddat upp filer som foton
och dokument. Goravel gör det mycket enkelt att lagra uppladdade filer med hjälp av `Store`-metoden på en uppladdad filinstans.
Anropa `Store`-metoden med den sökväg där du vill lagra den uppladdade filen:

```go
func (r *UserController) Show(ctx http.Context) {
  fil, err := ctx.Request().File("avatar")
  sökväg, err := file.Store("avatars")
}
```

Det finns några viktiga saker att notera om detta exempel. Observera att vi bara angav ett katalognamn, inte ett
filnamn. Som standard kommer `Store`-metoden att generera ett unikt ID för att fungera som filnamn. Filens tillägg kommer
bestämmas genom att undersöka filens MIME-typ. Sökvägen till filen kommer att returneras med `Store`-metoden så att du kan
lagra sökvägen, inklusive det genererade filnamnet, i din databas.

Du kan också anropa `PutFile`-metoden på `Storage`-fasaden för att utföra samma fillagringsoperation som exemplet
ovan:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
sökväg := facades.Storage().PutFile("photos", fil)
```

### Ange ett filnamn

Om du inte vill att ett filnamn automatiskt ska tilldelas till din lagrade fil, kan du använda `StoreAs`-metoden, som
tar emot sökvägen, filnamnet och disken (valfritt) som dess argument:

```go
fil, err := ctx.Request().File("avatar")
sökväg, err := file.StoreAs("avatars", "namn")
```

Du kan också använda `PutFileAs` -metoden på Storage fasaden, som kommer att utföra samma fillagringsåtgärd som exemplet
ovan:

```go
importera "github.com/goravel/framework/filesystem"

fil, err := filesystem.NewFile("./logo.png")
sökväg := facades.Storage().PutFileAs("foton", fil, "namn")
```

> Om filnamnet som anges av `StoreAs` och `PutFileAs` inte har ett suffix, suffix läggs automatiskt till baserat
> på filens MIME; annars används det angivna filnamnet direkt.

### Specificerar en disk

Som standard kommer denna uppladdade filens `Store`-metod att använda din standarddisk. Om du vill ange en annan disk,
använd `Disk`-metoden:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatarer")
}
```

### Annan uppladdad filinformation

Om du vill få det ursprungliga namnet och tillägget till den uppladdade filen, du kan göra det genom att använda metoderna
`GetClientOriginalName` och `GetClientOriginalExtension`:

```go
fil, err := ctx.Request().File("avatar")

namn := file.GetClientOriginalName()
tillägg := file.GetClientOriginalExtension()
```

Kom dock ihåg att metoderna `GetClientOriginalName` och `GetClientOriginalExtension` anses osäkra,
som filnamn och tillägg kan manipuleras av en skadlig användare. Av denna anledning bör du vanligtvis föredra
`HashName` och` Extension`-metoderna för att få ett namn och ett tillägg för den angivna filuppladdningen:

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
