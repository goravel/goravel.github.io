# 文件存储

Goravel为本地文件系统提供简单的驱动程序。Amazon S3、Aliyun OSS、Tencent COS、Minio 和
云端。 甚至更好， 在本地开发机器与生产
服务器之间切换这些存储选项非常简单，因为每个系统的 API 仍然相同。 Goravel带有一个 `local` 驱动程序。对于其他
驱动程序，请检查相应的独立扩展包：

| 驱动程序       | 链接                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| S3         | [https://github.com/goravel/s3](https://github.com/goravel/s3)               |
| OSS        | [https://github.com/goravel/oss](https://github.com/goravel/oss)             |
| COS        | [https://github.com/goravel/cos](https://github.com/goravel/cos)             |
| Minio      | [https://github.com/goravel/minio](https://github.com/goravel/minio)         |
| Cloudinary | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudina) |

## 配置

Goravel的文件系统配置文件位于`config/filesystems.go`。 在这个文件中，您可以配置文件系统"磁盘"的所有
，每个磁盘代表一个特定的存储驱动器和存储位置。

> 您可以配置尽可能多的磁盘，甚至可能有多个使用相同驱动程序的磁盘。

### 本地驱动

当使用 `local` 驱动器时，所有的文件操作都是在 `filesystems`
配置文件中定义的 `root` 目录下。 默认情况下，此值设置为 `storage/app` 目录。 因此，下面的
写入`storage/app/example.txt`：

```go
Storage().put("example.txt", "Contents")
```

### 公共磁盘

您的应用程序中包含的 `public`` 磁盘's`filesSystems
` 配置文件是为将要公开访问的文件设计的。 默认情况下，`public
`磁盘使用`local`驱动程序，并将其文件存储在`storage/app/public\`中。 如果您想要从网页访问这些文件，
您可以创建一个文件路由：

```go
facades.Route().Static("storage", "./storage/app/public")
```

## 获取磁盘实例

`Storage`外观可以用来与您的任何配置磁盘交互。 例如，您可以在脸部使用 "Put"
方法在默认磁盘上存储头像。 If you call methods on the `Storage` facade without first
calling the `Disk` method, the method will automatically be passed to the default disk:

```go
"avatars/1.png", "Contents")
```

如果您的应用程序与多个磁盘交互， 您可以使用 `Storage` 外观上的 `Disk` 方法来处理特定磁盘上的
文件：

```go
Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## 注入内容

```go
"avatars/1.png", "Contents")
```

## 正在获取文件

`Get`方法可以用于检索文件的内容。 文件的原始字符串内容将通过
的方法返回. 记住，所有文件路径都应该指定相对于磁盘的 "root" 位置：

```go
contents := facades.Storage().Get("file.jpg")
```

`Exists`方法可以用于确定磁盘上是否存在一个文件：

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

`Missing`方法可以用来确定文件是否从磁盘中丢失：

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### 文件 URL

您可以使用 `Url` 方法获取给定文件的 URL。 如果您正在使用 `local` 驱动程序， 这通常是
只会在 `/storage` 之前返回给定的路径并返回一个相对的 URL。 如果您正在使用 `s3` 驱动器，则将返回
完全合格的远程URL：

```go
url := facades.Storage().Url("file.jpg")
```

> 当使用 `local` 驱动器时，`Url` 的返回值不是编码的 URL。 为此原因，我们建议总是
> 使用创建有效URL的名称存储文件。

#### 临时网址

使用 `temporaryUrl` 方法，您可以使用非本地驱动程序创建存储文件的临时URL。 这个方法
接受一个路径和一个“时间”实例，并指定URL何时到期：

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### 文件元数据

除了阅读和撰写文件外，Goravel还可以提供有关这些文件本身的资料：

```go
size := facades.Storage().Size("file.jpg")
```

`LastModified` 方法返回文件最后修改时间：

```go
time, err := facades.Storage().LastModified("file.jpg")
```

给定文件的 MIME 类型可以通过 `MimeType` 方法获取：

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

也可以使用 `NewFile` 方法：

```go
导入 "github.com/goravel/framework/filesystem"

file, err := filesystem. NewFile("./logo.png")
大小, err := file.Size()
LastModified()
mime, err := file.MimeType()
```

### 文件路径

要获取特定文件的路径，您可以使用 "路径" 方法。 当使用 `local` 驱动器时，这将为
提供文件的绝对路径。 然而，如果您使用了类似于“s3”的驱动程序，该方法将给您
文件在bucket中的相对路径：

```go
路径 := facades.Storage().Path("file.jpg")
```

## 正在存储文件

"Put"方法可以用来存储磁盘上的文件内容。 记住，所有文件路径都应该相对于
为磁盘配置的“root”位置指定：

```go
err := facades.Storage().Put("file.jpg", contents)
```

您也可以使用 `PutFile` 和 `PutFileAs` 直接在磁盘上保存文件：

```go
导入 "github.com/goravel/framework/filesystem"

// 自动生成一个文件名唯一的 ID...
文件，err := filesystem.NewFile("./logo.png")
路径:= facades.Storage(). utFile("photos", file)

// 手动指定一个文件名...
file, err := filesystem. NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "photos.jpg")
```

关于“PutFile”方法，有几件重要的事情需要注意。 请注意，我们只指定了目录名称和
文件名。 默认情况下，`PutFile`方法将生成一个唯一的ID作为文件名。 文件的
扩展将通过检查文件的 MIME 类型来确定。 文件的路径将通过 `PutFile`
方法返回，以便您可以存储路径， 包括生成的文件名，在您的数据库中。

### 复制和移动文件

`Copy`方法可以用于复制现有文件到磁盘上的一个新位置， 当`移动`方法可能是
用来重命名或移动现有文件到一个新位置时：

```go
err := facades.Storage().copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Movement("old/file.jpg", "new/file.jpg")
```

### 文件上传

在 web 应用程序中，存储文件的最常用案例之一是存储用户上传的文件，例如照片
和文档。 Goravel使用`Store`方法在上传的文件实例上存储上传的文件非常容易。
使用你想要存储上传文件的路径调用 `Store` 方法：

```go
func (r *UserController) Show(ctx http.Context) Victor
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")

```

关于这个例子有几件重要的事情。 请注意，我们只指定了一个目录名，而不是一个
文件名。 默认情况下，`Store`方法将生成一个唯一的ID作为文件名。 文件的扩展名为
将通过检查文件的 MIME 类型来确定。 The path to the file will be returned by the `Store` method so you can
store the path, including the generated filename, in your database.

您也可以调用 `Storage` 外观上的 `PutFile` 方法来执行与上面的
相同的文件存储操作：

```go
导入 "github.com/goravel/framework/filesystem"

file, err := filesystem. NewFile("./logo.png")
path := facades.Storage().PutFile("photos", file)
```

### 指定文件名

如果你不想将文件名自动分配给你存储的文件，你可以使用 `StoreAs` 方法，
接收路径、文件名和 (可选)磁盘作为其参数：

```go
file, err := ctx.Request().File("avatar")
路径, err := file.StoreAs("avatars", "name")
```

您也可以在存储面上使用 `PutFileAs` 方法，它将执行与上面的
相同的文件存储操作：

```go
导入 "github.com/goravel/framework/filesystem"

file, err := filesystem. NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "name")
```

> 如果由 `StoreAs` 和 `PutFileAs` 指定的文件名没有后缀， 基于文件的
> 后缀被自动添加； 否则，指定的文件名将被直接使用。

### 指定一个磁盘

默认情况下，上传的文件的 `Store` 方法将使用您的默认磁盘。 如果您想要指定另一个磁盘，
请使用 `Disk` 方法：

```go
func (r *UserController) Show(ctx http.Context) Pow.
  file, err := ctx.Request().File("avatar")
  路径, err := file.Disk("s3").Store("avatars")
}
```

### 其他上传的文件信息

如果您想要获取上传文件的原始名称和扩展， 您可以使用
`GetClient原始名称` 和 `GetClient原始扩展` 方法这样做：

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientoriginalName()
extension := file.GetClientExtension()
```

然而，铭记`GetClient原产地名称`和`GetClient原产地扩展`方法被认为不安全。
作为文件名和扩展名可能被恶意用户篡改。 由于这个原因，您通常应该更倾向于使用
的 `HashName` 和 `Extension` 方法来获取指定文件上传的名称和扩展：

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // 生成一个独特的、随机名称...
扩展，err := file.Extension() // 根据文件的 MIME 类型决定文件的扩展...
```

## 正在删除文件

`Delete`方法接受一个文件名或数组文件以删除：

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

如有必要，您可以指定该文件应从以下来源删除的磁盘：

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## 目录

### 获取目录内的所有文件

`Files`方法返回给定目录中所有文件的分割。 如果您想要检索指定目录中所有的
文件列表，包括所有子目录，您可以使用 `AllFiles` 方法：

```go
files, err := facades.Storage().Disk("s3").Files("目录")
files, err := facades.Storage().Disk("s3").AllFiles("directory")
```

### 获取目录中的所有目录

`Directories`方法返回给定目录中所有目录的分割。 此外，您可以使用
`AllDirectories` 方法获取指定目录内所有目录及其所有子目录的列表：

```go
目录，err := facades.Storage().Disk("s3").Directories("目录")
目录，err := facades.Storage().Disk("s3").AllDirectories("directory")
```

### 创建一个目录

`MakeDirectory`方法将创建指定的目录，包括任何需要的子目录：

```go
err := facades.Storage().MakeDirectory(目录)
```

### 删除目录

最后，`DeleteDirectory`方法可以用来删除目录及其所有文件：

```go
err := facades.Storage().DeleteDirectory(目录)
```

## 自定义文件系统

您可以在 `config/filesystems.go` 文件中设置 `custom` 驱动程序。

```go
"custom": map[string]any{
  "driver": "custom",
  "via":    filesystems.NewLocal(),
},
```

您需要在 `via`
配置项中实现 `github.com/goravel/frameworks/filesystem/Driver` 接口。

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

> 注意：由于当自定义驱动程序注册时配置尚未加载，所以请使用
> "facades。 请在自定义驱动器中获取配置。
