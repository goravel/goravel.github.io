# Archiviazione File

Il Goravel fornisce semplici driver per lavorare con filesystem locali, Amazon S3, Aliyun OSS, Tencent COS, Minio e
Cloudinary. Ancora meglio, passare da queste opzioni di archiviazione tra la tua macchina di sviluppo locale e il server di produzione
è incredibilmente semplice in quanto l'API rimane la stessa per ogni sistema. Goravel viene fornito con un driver `local`, per altri driver
, si prega di controllare il pacchetto di estensione indipendente corrispondente:

| Driver      | Link                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| S3          | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS         | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS         | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Minio       | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Cloudinario | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Configurazione

Il file di configurazione del file system di Goravel si trova in `config/filesystems.go`. Within this file, you may configure all
of your filesystem "disks", each disk represents a particular storage driver and storage location.

> È possibile configurare tutti i dischi che si desidera e potrebbe anche avere più dischi che utilizzano lo stesso driver.

### Il Driver Locale

Quando si utilizza il driver `local`, tutte le operazioni di file sono relative alla directory `root` definita nel file di configurazione `filesystems`
. Per impostazione predefinita, questo valore è impostato nella directory `storage/app`. Pertanto, il seguente metodo sarebbe
scrivere in `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "Contents")
```

### Disco Pubblico

Il disco `public`` incluso nel file di configurazione
` della tua applicazione è destinato ai file che saranno accessibili al pubblico. Per impostazione predefinita, il disco `public
` utilizza il driver `local` e memorizza i suoi file in `storage/app/public`. Se si desidera visitare questi file dal web,
è possibile creare un routing di file:

```go
facades.Route().Static("storage", "./storage/app/public")
```

## Ottenere Istanze Disco

La facciata `Storage` può essere usata per interagire con qualsiasi disco configurato. Ad esempio, puoi usare il metodo `Put`
sulla facciata per memorizzare un avatar sul disco predefinito. Se si chiamano metodi sulla facciata `Storage` senza prima
che chiamano il metodo `Disk`, il metodo verrà automaticamente passato al disco predefinito:

```go
facades.Storage().Put("avatars/1.png", "Contents")
```

Se l'applicazione interagisce con più dischi, puoi usare il metodo `Disk` sulla facciata `Storage` per lavorare con i file
su un particolare disco:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## Inietta Contesto

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## Recupero File

Il metodo `Get` può essere utilizzato per recuperare il contenuto di un file. Il contenuto della stringa grezza del file verrà restituito dal metodo
. Ricorda, tutti i percorsi dei file devono essere specificati in relazione alla posizione `root` del disco:

```go
contents := facades.Storage().Get("file.jpg")
```

Il metodo `Exists` può essere usato per determinare se un file esiste sul disco:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

Il metodo `Missing` può essere usato per determinare se un file è mancante dal disco:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### Url File

È possibile utilizzare il metodo `Url` per ottenere l'URL per un dato file. Se stai usando il driver `local`, questo tipicamente
precede solo `/storage` al percorso dato e restituisce un URL relativo al file. Se stai usando il driver `s3`, l'URL remoto completamente qualificato
sarà restituito:

```go
url := facades.Storage().Url("file.jpg")
```

> Quando si utilizza il driver `local`, il valore di ritorno di `Url` non è codificato con URL. Per questo motivo, si consiglia sempre
> memorizzare i file utilizzando nomi che creeranno URL validi.

#### Url Temporanei

Usando il metodo `TemporaryUrl`, è possibile creare URL temporanei per i file archiviati utilizzando il driver non locale. Questo metodo
accetta un percorso e un'istanza `Time` che specifica quando l'URL dovrebbe scadere:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Metadati File

Oltre a leggere e scrivere file, Goravel può anche fornire informazioni sui file stessi:

```go
size := facades.Storage().Size("file.jpg")
```

Il metodo `LastModified` restituisce l'ultima ora modificata del file:

```go
tempo, err := facades.Storage().LastModified("file.jpg")
```

Il tipo MIME di un dato file può essere ottenuto con il metodo `MimeType`:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Inoltre può usare il metodo `NewFile`:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Percorsi File

Per ottenere il percorso di un file specifico, è possibile utilizzare il metodo `Path`. Quando si utilizza il driver `local`,
ti fornirà il percorso assoluto del file. Tuttavia, se si utilizza un driver come `s3`, il metodo ti darà
il percorso relativo del file all'interno del secchio:

```go
path := facades.Storage().Path("file.jpg")
```

## Archiviazione File

Il metodo `Put` può essere utilizzato per memorizzare i contenuti dei file su un disco. Ricorda, tutti i percorsi dei file devono essere specificati relativi a
la posizione "root" configurata per il disco:

```go
err := facades.Storage().Put("file.jpg", contents)
```

Puoi anche usare `PutFile` e `PutFileAs` per salvare i file direttamente sul disco:

```go
import "github.com/goravel/framework/filesystem"

// Genera automaticamente un ID univoco per il nome file...
, err := filesystem.NewFile("./logo.png")
path := facades.Storage(). utFile("photos", file)

// Specifica manualmente un nome file...
file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "photo.jpg")
```

Ci sono alcune cose importanti da notare sul metodo `PutFile`. Nota che abbiamo specificato solo un nome di directory e
non un nome di file. Per impostazione predefinita, il metodo `PutFile` genererà un ID univoco che servirà come nome del file. L'estensione
del file verrà determinata esaminando il tipo MIME del file. Il percorso del file sarà restituito dal metodo `PutFile`
in modo da poter memorizzare il percorso, incluso il nome del file generato nel tuo database.

### Copia E Spostamento Dei File

Il metodo `Copy` può essere usato per copiare un file esistente in una nuova posizione sul disco, mentre il metodo `Move` può essere
usato per rinominare o spostare un file esistente in una nuova posizione:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Caricamento File

Nelle applicazioni web, uno dei casi di utilizzo più comuni per memorizzare i file è memorizzare i file caricati dall'utente come le foto
e i documenti. Goravel rende molto facile memorizzare i file caricati utilizzando il metodo `Store` su un'istanza di file caricata.
Chiama il metodo `Store` con il percorso in cui desideri memorizzare il file caricato:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Ci sono alcune cose importanti da notare su questo esempio. Nota che abbiamo specificato solo un nome di directory, non un nome di file
. Per impostazione predefinita, il metodo `Store` genererà un ID univoco per servire come nome del file. L'estensione del file sarà
determinata esaminando il tipo MIME del file. Il percorso del file verrà restituito con il metodo `Store` in modo da poter memorizzare
il percorso, incluso il nome del file generato nel tuo database.

Puoi anche chiamare il metodo `PutFile` sulla facciata `Storage` per eseguire la stessa operazione di archiviazione di file come l'esempio
sopra:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("photos", file)
```

### Specificare Un Nome File

Se non vuoi che un nome file venga assegnato automaticamente al tuo file memorizzato, puoi usare il metodo `StoreAs`, quale
riceve il percorso, il nome del file e il disco (opzionale) come argomenti:

```go
file, err := ctx.Request().File("avatar")
path, err := file.StoreAs("avatars", "name")
```

Puoi anche usare il metodo `PutFileAs` sulla facciata Archiviazione, che eseguirà la stessa operazione di archiviazione di file come l'esempio
qui sopra:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "name")
```

> Se il nome del file specificato da `StoreAs` e `PutFileAs` non ha un suffisso, il suffisso viene aggiunto automaticamente in base a
> sul MIME del file; in caso contrario, il nome del file specificato viene usato direttamente.

### Specificare Un Disco

Per impostazione predefinita, il metodo `Store` di questo file caricato userà il disco predefinito. Se si desidera specificare un altro disco,
si prega di utilizzare il metodo `Disco`:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Altre Informazioni Sul File Caricato

Se si desidera ottenere il nome originale e l'estensione del file caricato, puoi farlo usando i metodi
`GetClientOriginalName` e `GetClientOriginalExtension`:

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extension := file.GetClientOriginalExtension()
```

Tuttavia, tieni presente che i metodi `GetClientOriginalName` e `GetClientOriginalExtension` sono considerati non sicuri,
come il nome del file e l'estensione possono essere manomessi da un utente dannoso. Per questo motivo, in genere dovresti preferire
i metodi `HashName` e `Extension` per ottenere un nome e un'estensione per il caricamento del file specificato:

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
