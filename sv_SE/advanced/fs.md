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
fil, err := ctx.Request().File("avatar")

namn := file.HashName() // Generera ett unikt, slumpmässigt namn...
tillägg, err := file.Extension() // Bestäm filens tillägg baserat på filens MIME-typ...
```

## Tar bort filer

Metoden `Delete` accepterar ett enda filnamn eller en samling filer att ta bort:

```go
err := facades.Storage().Radera ("file.jpg")
err := facades.Storage().Radera ("file.jpg", "file2.jpg")
```

Vid behov kan du ange vilken disk som filen ska tas bort från:

```go
err := fasades.Storage().Disk("s3").Ta bort ("file.jpg")
```

## Kataloger

### Få alla filer inom en katalog

`Files`-metoden returnerar en skiva av alla filer i en given katalog. Om du vill hämta en lista över alla
-filer i en given katalog inklusive alla underkataloger, kan du använda `AllFiles`-metoden:

```go
filer, err := fasades.Storage().Disk("s3").Filer("katalog")
filer, err := facades.Storage().Disk(s3").AllaFiles("katalog")
```

### Hämta alla kataloger inom en katalog

Metoden `Directories` returnerar en skiva av alla kataloger i en given katalog. Dessutom kan du använda metoden
`AllDirectories` för att få en lista över alla kataloger i en given katalog och alla dess underkataloger:

```go
kataloger, err := fasader.Lagring().Diskett ("s3").Kataloger("katalog")
kataloger, err := fasader.Lagring().Diskar ("s3").AllDirectories("katalog")
```

### Skapa en katalog

Metoden `MakeDirectory` kommer att skapa den givna katalogen, inklusive alla nödvändiga underkataloger:

```go
err := fasader.Förvaring().MakeDirectory(katalog)
```

### Ta bort en katalog

Slutligen kan `DeleteDirectory`-metoden användas för att ta bort en katalog och alla dess filer:

```go
err := fasader.Förvaring().RaderaDirectory(katalog)
```

## Anpassade filsystem

Du kan ställa in 'custom' drivrutinen i filen 'config/filesystems.go'.

```go
"custom": karta[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Du måste implementera `github.com/goravel/frameing/contracts/filesystem/Driver` -gränssnittet i `via`
konfigurationsobjekt.

```go
typ Driver interface {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, fel)
  Copy(oldFile, newFile string) error
  Radera (fil ... tring) fel
  DeleteDirectory(katalogsträng) fel
  kataloger (sökvägsträngen) ([]string, fel)
  Befintliga (filsträng) böla
  Filer(sökvägsträngen) ([]sträng, fel)
  Get(filsträng) (sträng, fel)
  GetBytes(filsträng) ([]byte, fel)
  LastModified(filsträng) (tid. ime, error)
  MakeDirectory(katalogsträng) fel
  MimeType(filsträng) (sträng, fel)
  Miss(filsträng) bool
  Move(oldFile, newFilsträng) fel
  Path(filsträng) sträng
  Put(fil, content string) fel
  PutFile(sökvägsträning, källfil) (sträng, fel)
  PutFileAs(sökvägsträning, källfil, namnsträng) (sträng, fel)
  Storlek (filsträng) (int64, fel)
  TemporaryUrl(filsträng, tidpunkt. ime) (sträng, fel)
  WithContext(ctx context.Context) Driver
  Url(filsträng) sträng
}
```

> Obs: Eftersom konfigurationen inte har laddats när den anpassade drivrutinen är registrerad, så använd
> `fasader. onfig().Env` för att erhålla konfigurationen i den anpassade drivrutinen.
