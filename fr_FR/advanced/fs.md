# Stockage des fichiers

Le Goravel fournit des pilotes simples pour travailler avec des systèmes de fichiers locaux, Amazon S3, Aliyun OSS, Tencent COS, Minio et
Cloudinary. Mieux encore, basculer entre ces options de stockage entre votre machine de développement local et votre serveur de production
est incroyablement simple car l'API reste la même pour chaque système. Goravel est livré avec un pilote `local`, pour les autres pilotes
, veuillez vérifier le paquet d'extension indépendant correspondant :

| Chauffeur | Lier                                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| S3        | [https://github.com/goravel/s3](https://github.com/fr/goravel/s3)                 |
| OSS       | [https://github.com/goravel/oss](https://github.com/fr/goravel/oss)               |
| COS       | [https://github.com/goravel/cos](https://github.com/fr/goravel/cos)               |
| Minio     | [https://github.com/goravel/minio](https://github.com/fr/goravel/minio)           |
| Nuageux   | [https://github.com/goravel/cloudinary](https://github.com/fr/goravel/cloudinary) |

## Configuration

Le fichier de configuration du système de fichiers de Goravel est situé dans `config/filesystems.go`. Dans ce fichier, vous pouvez configurer tous les
de votre système de fichiers "disques", chaque disque représente un pilote de stockage et un emplacement de stockage particulier.

> Vous pouvez configurer autant de disques que vous le souhaitez et même avoir plusieurs disques qui utilisent le même pilote.

### Le chauffeur local

Lorsque vous utilisez le pilote `local`, toutes les opérations de fichiers sont relatives au répertoire `root` défini dans votre fichier de configuration `filesystems`
. Par défaut, cette valeur est définie au répertoire `storage/app`. Par conséquent, la méthode suivante devrait
écrire dans `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "Contents")
```

### Le disque public

Le disque `public`` inclus dans le fichier de configuration `filesystems
`de votre application est destiné aux fichiers qui seront accessibles au public. Par défaut, le disque`public
`utilise le pilote`local`et stocke ses fichiers dans`storage/app/public\`. Si vous voulez visiter ces fichiers à partir du web,
vous pouvez créer un routage de fichier :

```go
facades.Route().Static("stockage", "./storage/app/public")
```

## Obtention d'instances de disque

La façade `Storage` peut être utilisée pour interagir avec n'importe lequel de vos disques configurés. Par exemple, vous pouvez utiliser la méthode `Put`
sur la façade pour stocker un avatar sur le disque par défaut. Si vous appelez des méthodes sur la façade `Storage` sans d'abord
appelant la méthode `Disk`, la méthode sera automatiquement passée sur le disque par défaut :

```go
facades.Storage().Put("avatars/1.png", "Contents")
```

Si votre application interagit avec plusieurs disques, vous pouvez utiliser la méthode `Disk` sur la façade `Storage` pour travailler avec des fichiers
sur un disque particulier:

```go
facades.Storage().Disque("s3").Put("avatars/1.png", "Contents")
```

## Contexte d'injection

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## Récupération des fichiers

La méthode `Get` peut être utilisée pour récupérer le contenu d'un fichier. Le contenu de la chaîne brute du fichier sera retourné par
la méthode. Rappelez-vous que tous les chemins de fichiers devraient être spécifiés par rapport à l'emplacement `racine` du disque:

```go
contenu := facades.Storage().Get("file.jpg")
```

La méthode `Exists` peut être utilisée pour déterminer si un fichier existe sur le disque:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

La méthode `Missing` peut être utilisée pour déterminer si un fichier est manquant sur le disque:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### URL du fichier

Vous pouvez utiliser la méthode `Url` pour obtenir l'URL d'un fichier donné. Si vous utilisez le pilote `local`, cela va typiquement
juste ajouter `/storage` au chemin donné et retourner une URL relative au fichier. Si vous utilisez le pilote `s3`, l'URL
entièrement qualifiée à distance sera retournée:

```go
url := facades.Storage().Url("file.jpg")
```

> Lorsque vous utilisez le pilote `local`, la valeur retournée par `Url` n'est pas encodée par URL. Pour cette raison, nous vous recommandons de toujours
> stocker vos fichiers en utilisant des noms qui créeront des URL valides.

#### URLs temporaires

En utilisant la méthode `TemporaryUrl`, vous pouvez créer des URL temporaires pour les fichiers stockés en utilisant le pilote non-local. Cette méthode
accepte un chemin et une instance `Time` spécifiant quand l'URL doit expirer :

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Métadonnées du fichier

En plus de lire et d'écrire des fichiers, Goravel peut également fournir des informations sur les fichiers eux-mêmes:

```go
size := facades.Storage().Size("file.jpg")
```

La méthode `LastModified` retourne la dernière heure de modification du fichier :

```go
temps, err := facades.Storage().LastModified("file.jpg")
```

Le type MIME d'un fichier donné peut être obtenu via la méthode `MimeType` :

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Vous pouvez également utiliser la méthode `NewFile` :

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Chemins du fichier

Pour obtenir le chemin pour un fichier spécifique, vous pouvez utiliser la méthode `Path`. When using the `local` driver, this will
provide you with the absolute path to the file. Cependant, si vous utilisez un pilote comme `s3`, la méthode vous donnera
le chemin relatif du fichier dans le compartiment :

```go
chemin := facades.Storage().Path("file.jpg")
```

## Stockage des fichiers

La méthode `Put` peut être utilisée pour stocker le contenu du fichier sur un disque. N'oubliez pas que tous les chemins de fichiers doivent être spécifiés par rapport à
l'emplacement "racine" configuré pour le disque:

```go
err := facades.Storage().Put("file.jpg", contenu)
```

Vous pouvez également utiliser `PutFile` et `PutFileAs` pour enregistrer les fichiers directement sur le disque:

```go
import "github.com/goravel/framework/filesystem"

// Génère automatiquement un ID unique pour le nom de fichier...
file, err := filesystem.NewFile("./logo.png")
path := facades.Storage(). utFile("photos", file)

// Spécifie manuellement un fichier...
file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "photo.jpg")
```

Il y a quelques choses importantes à noter à propos de la méthode `PutFile`. Notez que nous avons seulement spécifié un nom de répertoire et
pas un nom de fichier. Par défaut, la méthode `PutFile` va générer un ID unique pour servir de nom de fichier. L'extension
du fichier sera déterminée en examinant le type MIME du fichier. Le chemin vers le fichier sera retourné par la méthode `PutFile`
afin que vous puissiez stocker le chemin, y compris le nom de fichier généré, dans votre base de données.

### Copie et déplacement des fichiers

La méthode `Copy` peut être utilisée pour copier un fichier existant vers un nouvel emplacement sur le disque, alors que la méthode `Déplacer` peut être
utilisée pour renommer ou déplacer un fichier existant vers un nouvel emplacement:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Téléchargements de fichiers

Dans les applications Web, l'un des cas d'utilisation les plus courants pour stocker des fichiers est de stocker les fichiers téléchargés par l'utilisateur, tels que les photos
et les documents. Goravel rend très facile de stocker les fichiers téléchargés en utilisant la méthode `Store` sur une instance de fichier téléchargée.
Appeler la méthode `Store` avec le chemin vers lequel vous souhaitez stocker le fichier téléchargé :

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Il y a quelques points importants à noter à propos de cet exemple. Notez que nous avons seulement spécifié un nom de répertoire, pas un nom de fichier
. Par défaut, la méthode `Store` va générer un ID unique pour servir de nom de fichier. L'extension du fichier sera
déterminée en examinant le type MIME du fichier. Le chemin vers le fichier sera retourné par la méthode `Store` afin que vous puissiez
stocker le chemin, y compris le nom de fichier généré, dans votre base de données.

Vous pouvez également appeler la méthode `PutFile` sur la façade `Storage` pour effectuer la même opération de stockage de fichiers que l'exemple
ci-dessus :

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("photos", fichier)
```

### Spécifier un nom de fichier

Si vous ne voulez pas qu'un nom de fichier soit automatiquement assigné à votre fichier stocké, vous pouvez utiliser la méthode `StoreAs`, qui
reçoit le chemin, le nom du fichier, et le disque (optionnel) comme arguments:

```go
file, err := ctx.Request().File("avatar")
path, err := file.StoreAs("avatars", "name")
```

Vous pouvez également utiliser la méthode `PutFileAs` sur la façade de Stockage, qui effectuera la même opération de stockage de fichiers que l'exemple
ci-dessus :

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", fichier, "name")
```

> Si le nom de fichier spécifié par `StoreAs` et `PutFileAs` n'a pas de suffixe, le suffixe est automatiquement ajouté basé sur
> sur la MIME du fichier ; sinon, le nom de fichier spécifié est utilisé directement.

### Spécifier un disque

Par défaut, la méthode `Store` du fichier téléchargé utilisera votre disque par défaut. Si vous souhaitez spécifier un autre disque,
veuillez utiliser la méthode `Disk`:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Autres informations sur le fichier téléchargé

Si vous souhaitez obtenir le nom original et l'extension du fichier téléchargé, vous pouvez le faire en utilisant les méthodes
`GetClientOriginalName` et `GetClientOriginalExtension` :

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extension := file.GetClientOriginalExtension()
```

Cependant, gardez à l'esprit que les méthodes `GetClientOriginalName` et `GetClientOriginalExtension` sont considérées comme non sûres,
en tant que nom de fichier et extension peuvent être altérés par un utilisateur malveillant. Pour cette raison, vous devriez généralement préférer
les méthodes `HashName` et `Extension` pour obtenir un nom et une extension pour le téléchargement de fichier donné:

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // Génère un nom unique, aléatoire...
extension, err := file.Extension() // Détermine l'extension du fichier basée sur le type MIME du fichier...
```

## Suppression des fichiers

La méthode `Delete` accepte un nom de fichier unique ou un tableau de fichiers à supprimer :

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

Si nécessaire, vous pouvez spécifier le disque sur lequel le fichier doit être supprimé :

```go
err := facades.Storage().Disque("s3").Delete("file.jpg")
```

## Répertoires

### Récupérer tous les fichiers dans un répertoire

La méthode `Files` retourne une tranche de tous les fichiers dans un répertoire donné. Si vous souhaitez récupérer une liste de tous les fichiers
dans un répertoire donné, y compris tous les sous-répertoires, vous pouvez utiliser la méthode `AllFiles`:

```go
files, err := facades.Storage().Disque("s3").Files("directory")
files, errr := facades.Storage().Disk("s3").AllFiles("directory")
```

### Récupérer tous les répertoires dans un répertoire

La méthode `Répertoires` retourne une tranche de tous les répertoires dans un répertoire donné. De plus, vous pouvez utiliser la méthode
`AllDirectories` pour obtenir une liste de tous les répertoires dans un répertoire donné et tous ses sous-répertoires:

```go
directories, err := facades.Storage().Disk("s3").Directortories("directory")
directories, err := facades.Storage().Disk("s3").AllDirectories("directory")
```

### Créer un répertoire

La méthode `MakeDirectory` va créer le répertoire donné, y compris tous les sous-répertoires nécessaires:

```go
err := facades.Storage().MakeDirectory(répertoire)
```

### Supprimer un répertoire

Enfin, la méthode `DeleteDirectory` peut être utilisée pour supprimer un répertoire et tous ses fichiers:

```go
err := facades.Storage().DeleteDirectory(directory)
```

## Systèmes de fichiers personnalisés

Vous pouvez définir le pilote `custom` dans le fichier `config/filesystems.go`.

```go
"custom": map[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Vous devez implémenter l'interface `github.com/goravel/framework/contracts/filesystem/Driver` dans l'élément de configuration `via`
.

```go
type Interface Driver {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, error)
  Copy(oldFile, newFile string) erreur
  Delete(file ... tring) erreur
  DeleteDirectory(directory string) error
  Directories(path string) ([]string, error)
  Exists(file string) bool
  Files(path string) ([]string, error)
  Get(file string) (string, error)
  GetBytes(file string) ([]byte, error)
  LastModified(file string) (time). ime, erreur)
  erreur MakeDirectory(chaîne de répertoire)
  MimeType(chaîne de fichier) (chaîne de caractères, error)
  Missing(file string) bool
  Move(oldFile, newFile string) error
  Path(file string) string
  Put(file, content string) erreur
  PutFile(path string, source File) (string, error)
  PutFileAs(path string, source File, name string) (string, error)
  Size(file string) (int64, error)
  TemporaryUrl(file string, time time. ime) (string, error)
  WithContext(ctx context.Context) Driver
  Url(file string) string
}
```

> Note : Puisque la configuration n'a pas été chargée lorsque le pilote personnalisé est enregistré, veuillez donc utiliser
> `facades. onfig().Env` pour obtenir la configuration dans le pilote personnalisé.
