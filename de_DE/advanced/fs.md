# Datei-Speicher

Der Goravel bietet einfache Treiber für die Arbeit mit lokalen Dateisystemen, Amazon S3, Aliyun OSS, Tencent COS, Minio und
Cloudinary. Noch besser zwischen diesen Speicheroptionen zwischen Ihrer lokalen Entwicklermaschine und dem
-Server zu wechseln ist erstaunlich einfach, da die API für jedes System gleich bleibt. Goravel kommt mit einem `local`-Treiber, für andere
-Treiber, bitte überprüfen Sie das entsprechende unabhängige Erweiterungspaket:

| Fahrer    | Link                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| S3        | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS       | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS       | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Mine      | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Cloudinär | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Konfiguration

Goravel's Dateisystem-Konfigurationsdatei befindet sich unter `config/filesystems.go`. In dieser Datei können Sie alle
Ihres Dateisystems "Festplatten" konfigurieren. Jede Festplatte repräsentiert einen bestimmten Speichertreiber und Speicherort.

> Sie können so viele Festplatten konfigurieren, wie Sie möchten, und können sogar mehrere Festplatten haben, die den gleichen Treiber verwenden.

### Der lokale Treiber

Wenn du den `local` Treiber verwendest, sind alle Dateioperationen relativ zum `root`-Verzeichnis, das in deiner `filesystems`
Konfigurationsdatei definiert ist. Standardmäßig wird dieser Wert auf das Verzeichnis `storage/app` gesetzt. Daher würde die folgende Methode
in `storage/app/example.txt` schreiben:

```go
facades.Storage().Put("example.txt", "Inhalte")
```

### Der öffentliche Datenträger

Die `public`` Diskette, die in der Konfigurationsdatei
deiner Anwendung enthalten ist, ist für Dateien gedacht, die öffentlich zugänglich sein werden. Standardmäßig verwendet die `public
`Festplatte den`local`Treiber und speichert seine Dateien in`storage/app/public\`. Wenn Sie diese Datei aus dem Internet besuchen möchten,
können Sie ein Dateirouting erstellen:

```go
facades.Route().Static("Storage", "./storage/app/public")
```

## Disk-Instanzen erhalten

Die `Storage` Fassade kann verwendet werden, um mit einer deiner konfigurierten Festplatten zu interagieren. Zum Beispiel kannst du die Methode `Put`
auf der Fassade verwenden, um einen Avatar auf der Standarddiskette zu speichern. Wenn du Methoden an der `Storage` Fassade ohne erste
aufrufst, wird die Methode automatisch an die Standarddisk übergeben:

```go
facades.Storage().Put("avatars/1.png", "Inhalte")
```

Wenn Ihre Anwendung mit mehreren Festplatten interagiert, du kannst die `Disk` Methode in der `Storage` Fassade verwenden, um mit
Dateien auf einer bestimmten Festplatte zu arbeiten:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Inhalte")
```

## Kontext einfügen

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Inhalte")
```

## Dateien werden abgerufen

Die `Get`-Methode kann verwendet werden, um den Inhalt einer Datei abzurufen. Der Rohzeicheninhalt der Datei wird von
die Methode zurückgegeben. Denken Sie daran, dass alle Dateipfade relativ zum `root` der Festplatte angegeben werden sollten:

```go
content := facades.Storage().Get("file.jpg")
```

Die `Exists` Methode kann verwendet werden, um festzustellen, ob eine Datei auf der Festplatte existiert:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

Die `Fehlende` Methode kann verwendet werden, um festzustellen, ob eine Datei auf der Festplatte fehlt:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### Datei-URLs

Du kannst die `Url` Methode verwenden, um die URL für eine bestimmte Datei zu erhalten. Wenn du den `local` Treiber verwendest, dies wird normalerweise
nur `/storage` dem angegebenen Pfad voranstellen und eine relative URL zur Datei zurückgeben. Wenn du den `s3`-Treiber verwendest, wird die
voll qualifizierte entfernte URL zurückgegeben:

```go
url := facades.Storage().Url("file.jpg")
```

> Wenn der `local` Treiber verwendet wird, ist der Rückgabewert von `Url` nicht URL-kodiert. Aus diesem Grund empfehlen wir, Ihre Dateien immer
> mit Namen zu speichern, die gültige URLs erstellen.

#### Temporäre URLs

Mit der `TemporaryUrl` Methode können Sie temporäre URLs für Dateien erstellen, die mit dem nicht-lokalen Treiber gespeichert werden. Diese Methode
akzeptiert einen Pfad und eine `Time`-Instanz, die angibt, wann die URL ablaufen soll:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Datei-Metadaten

Neben dem Lesen und Schreiben von Dateien kann Goravel auch Informationen über die Dateien selbst bereitstellen:

```go
size := facades.Storage().Size("file.jpg")
```

Die `LastModified` Methode gibt die letzte modifizierte Zeit der Datei zurück:

```go
time, err := facades.Storage().LastModified("file.jpg")
```

Der MIME-Typ einer gegebenen Datei kann über die `MimeType` Methode abgerufen werden:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Auch die `NewFile` Methode verwenden:

```go
import "github.com/goravel/framework/filesystem"

Datei, err := filesystem.NewFile("./logo.png")
Größe, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Dateipfade

Um den Pfad für eine bestimmte Datei zu erhalten, kannst du die `Path`-Methode verwenden. When using the `local` driver, this will
provide you with the absolute path to the file. Wenn Sie jedoch einen Treiber wie `s3` verwenden, wird Ihnen die Methode
den relativen Pfad der Datei innerhalb der Gruppe geben:

```go
path := facades.Storage().Path("file.jpg")
```

## Speichere Dateien

Die Methode `Put` kann verwendet werden, um Dateiinhalte auf einer Festplatte zu speichern. Denken Sie daran, dass alle Dateipfade relativ zu
angegeben werden sollten, der für die Festplatte konfigurierte "Root"-Speicherort:

```go
err := facades.Storage().Put("file.jpg", contents)
```

Du kannst auch `PutFile` und `PutFileAs` verwenden, um Dateien direkt auf der Festplatte zu speichern:

```go
import "github.com/goravel/framework/filesystem"

// Automatisch eine eindeutige ID für Dateinamen generieren...
Datei, err := filesystem.NewFile("./logo.png")
Pfad := facades.Storage(). utFile("Fotos", Datei"

// Manuell einen Dateinamen angeben...
Datei, err := filesystem.NewFile("./logo.png")
Pfad := facades.Storage().PutFileAs("Fotos", Datei, "photo.jpg")
```

Es gibt ein paar wichtige Dinge über die "PutFile"-Methode. Beachten Sie, dass wir nur einen Verzeichnisnamen und
keinen Dateinamen angegeben haben. Standardmäßig wird die `PutFile` Methode eine eindeutige ID erzeugen, die als Dateiname dienen soll. Die
-Erweiterung wird durch die Prüfung des MIME-Typs der Datei bestimmt. Der Pfad zur Datei wird von der `PutFile`
Methode zurückgegeben, damit Sie den Pfad speichern können, einschließlich des generierten Dateinamens in Ihrer Datenbank.

### Dateien kopieren & verschieben

Die `Copy` Methode kann verwendet werden, um eine existierende Datei an einen neuen Speicherort auf der Festplatte zu kopieren, während die `Move` Methode
verwendet werden kann, um eine existierende Datei umzubenennen oder an einen neuen Ort zu verschieben:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("alt/file.jpg", "new/file.jpg")
```

### Datei-Upload

In Webanwendungen ist einer der häufigsten Anwendungsfälle zum Speichern von Dateien das Speichern von von Benutzern hochgeladenen Dateien wie Fotos
und Dokumente. Goravel macht es sehr einfach, hochgeladene Dateien mit der Methode `Store` in einer hochgeladenen Instanz zu speichern.
Rufen Sie die `Store` Methode mit dem Pfad auf, in dem Sie die hochgeladene Datei speichern möchten:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Es gibt ein paar wichtige Dinge an diesem Beispiel anzumerken. Beachten Sie, dass wir nur einen Verzeichnisnamen angegeben haben, keinen
-Dateinamen. Standardmäßig wird die `Store`-Methode eine eindeutige ID erzeugen, die als Dateiname dienen soll. Die Dateiendung wird
durch die Prüfung des MIME-Typs der Datei bestimmt. Der Pfad zur Datei wird von der `Store`-Methode zurückgegeben, damit Sie den Pfad
speichern können, einschließlich des generierten Dateinamens in Ihrer Datenbank.

Du kannst auch die `PutFile` Methode in der `Storage` Fassade aufrufen, um den gleichen Datei-Speichervorgang wie das Beispiel
oben auszuführen:

```go
importiere "github.com/goravel/framework/filesystem"

Datei, err := filesystem.NewFile("./logo.png")
Pfad := facades.Storage().PutFile("photos", Datei)
```

### Dateiname angeben

Wenn du nicht möchtest, dass ein Dateiname automatisch deiner gespeicherten Datei zugewiesen wird, kannst du die `StoreAs` Methode verwenden, welcher
den Pfad, den Dateinamen und die (optionale) Festplatte als Argumente erhält:

```go
datei, err := ctx.Request().File("avatar")
Pfad, err := file.StoreAs("avatars", "name")
```

Du kannst auch die `PutFileAs` Methode in der Speicherfassade verwenden, die den gleichen Dateispeichervorgang wie das Beispiel
ausführt:

```go
importiere "github.com/goravel/framework/filesystem"

Datei, err := filesystem.NewFile("./logo.png")
Pfad := facades.Storage().PutFileAs("Fotos", Datei, "Name")
```

> Wenn der Dateiname von `StoreAs` und `PutFileAs` kein Suffix hat, das Suffix wird automatisch basierend auf
> auf dem MIME der Datei hinzugefügt; andernfalls wird der angegebene Dateiname direkt verwendet.

### Eine Festplatte angeben

Standardmäßig wird die `Store`-Methode dieser hochgeladenen Datei deine Standarddiskette verwenden. If you would like to specify another disk,
please use the `Disk` method:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Andere hochgeladene Dateiinformationen

Wenn Sie den ursprünglichen Namen und die Erweiterung der hochgeladenen Datei erhalten möchten du kannst dies mit den Methoden
`GetClientOriginalName` und `GetClientOriginalExtension` tun:

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extension := file.GetClientOriginalExtension()
```

Denk aber daran, dass die `GetClientOriginalName` und `GetClientOriginalExtension` Methoden als unsicher angesehen werden
als Dateiname und Erweiterung kann von einem böswilligen Benutzer manipuliert werden. Aus diesem Grund solltest du in der Regel
die `HashName` und `Extension` Methoden bevorzugen, um einen Namen und eine Erweiterung für die angegebene Datei hochzuladen:

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // Generiere einen eindeutigen, zufälligen Namen...
Erweiterung, err := file.Extension() // Ermitteln der Dateiendung basierend auf dem MIME Typ der Datei...
```

## Lösche Dateien

Die `Delete` Methode akzeptiert einen einzigen Dateinamen oder ein Array von Dateien zum Löschen:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

Falls erforderlich, können Sie die Festplatte angeben, von der die Datei gelöscht werden soll:

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## Verzeichnisse

### Alle Dateien in einem Verzeichnis abrufen

Die Methode `Files` gibt ein Stück aller Dateien in einem gegebenen Verzeichnis zurück. Wenn du eine Liste aller
Dateien in einem angegebenen Verzeichnis inklusive aller Unterverzeichnisse abrufen möchtest, kannst du die `AllFiles` Methode verwenden:

```go
Dateien, err := facades.Storage().Disk("s3").Dateien("Verzeichnis")
Dateien, err := facades.Storage().Disk("s3").AllFiles("Verzeichnis")
```

### Alle Verzeichnisse in einem Verzeichnis abrufen

Die Methode `Directories` gibt ein Slice aller Verzeichnisse in einem gegebenen Verzeichnis zurück. Zusätzlich kannst du die
`AllDirectories` Methode verwenden, um eine Liste aller Verzeichnisse in einem gegebenen Verzeichnis und allen Unterverzeichnissen zu erhalten:

```go
Verzeichnisse, err := facades.Storage().Disk("s3").Directories("Verzeichnis")
Verzeichnisse, err := facades.Storage().Disk("s3").AllDirectories("Verzeichnis")
```

### Ein Verzeichnis erstellen

Die `MakeDirectory` Methode erstellt das angegebene Verzeichnis, einschließlich aller benötigten Unterverzeichnisse:

```go
err := facades.Storage().MakeDirectory(Verzeichnis)
```

### Verzeichnis löschen

Schließlich kann die Methode "DeleteDirectory" verwendet werden, um ein Verzeichnis und alle seine Dateien zu löschen:

```go
err := facades.Storage().DeleteDirectory(Verzeichnis)
```

## Benutzerdefinierte Dateisysteme

Du kannst den `custom` Treiber in der `config/filesystems.go` Datei setzen.

```go
"custom": map[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Du musst das `github.com/goravel/framework/contracts/filesystem/Driver` Interface in das `via`
Konfigurationselement implementieren.

```go
type Driver interface {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, string, error)
  Copy(oldFile, newFile string) Fehler
  Delete(file ... tring) Fehler
  DeleteDirectory(directory string) Fehler
  Directories(path string) ([]string, error)
  Bestehen(file string) bool
  Dateien(path string) ([]string, error)
  Get(file string) (string, error)
  GetBytes(file string) ([]byte, error)
  LastModified(file string) (time). ime, error)
  MakeDirectory(directory string) Fehler
  MimeType(file string) (string, string, error)
  Missing(file string) bool
  Move(old File, newFile string) error
  Path(file string) string
  Put(file, Inhaltsstring-Fehler
  PutFile(Pfad-String, Quelldatei) (String, Fehler)
  PutFileAs(Pfad-String, Quelldatei, name string) (string, error)
  Size(file string) (int64, error)
  TemporaryUrl(file string, time time). ime) (String, Fehler)
  WithContext(ctx context.Context) Treiber
  Url(file string) string
}
```

> Notiz: Da die Konfiguration nicht geladen wurde, wenn der benutzerdefinierte Treiber registriert ist, verwenden Sie bitte
> `Fassaden. onfig().Env` um die Konfiguration im benutzerdefinierten Treiber zu erhalten.
