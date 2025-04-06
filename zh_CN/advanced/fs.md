# 文件存储

Goravel 提供了简单的驱动程序，用于处理本地文件系统、Amazon S3、阿里云 OSS、腾讯云 COS、Minio 和 Cloudinary。 更好的是，在本地开发机器和生产服务器之间切换这些存储选项非常简单，因为每个系统的 API 保持一致。 Goravel 自带 `local` 驱动程序，对于其他驱动程序，请查看相应的独立扩展包：

| 驱动程序       | 链接                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| S3         | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS        | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS        | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Minio      | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Cloudinary | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## 配置

Goravel 的文件系统配置文件位于 `config/filesystems.go`。 在此文件中，您可以配置所有文件系统"磁盘"，每个磁盘代表一个特定的存储驱动程序和存储位置。

> 您可以根据需要配置任意数量的磁盘，甚至可以使用相同驱动程序配置多个磁盘。

### 本地驱动程序

当使用 `local` 驱动程序时，所有文件操作都是相对于 `filesystems` 配置文件中定义的 `root` 目录。 默认情况下，该值设置为 `storage/app` 目录。 因此，以下方法将写入 `storage/app/example.txt`：

```go
facades.Storage().Put("example.txt", "Contents")
```

### 公共磁盘

应用程序的 `filesystems` 配置文件中包含的 `public` 磁盘用于存储可公开访问的文件。 默认情况下，`public` 磁盘使用 `local` 驱动程序，并将其文件存储在 `storage/app/public` 中。 如果你想从网页访问这些文件，可以创建一个文件路由：

```go
facades.Route().Static("storage", "./storage/app/public")
```

## 获取磁盘实例

可以使用 `Storage` 门面与任何已配置的磁盘进行交互。 例如，您可以使用门面上的 `Put` 方法在默认磁盘上存储头像。 如果您在调用 `Storage` 门面的方法之前没有先调用 `Disk` 方法，该方法将自动传递给默认磁盘：

```go
facades.Storage().Put("avatars/1.png", "Contents")
```

如果您的应用程序与多个磁盘交互，您可以在 `Storage` 门面上使用 `Disk` 方法来处理特定磁盘上的文件：

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## 注入上下文

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## 检索文件

可以使用 `Get` 方法来检索文件的内容。 该方法将返回文件的原始字符串内容。 请记住，所有文件路径都应相对于磁盘的`root`位置指定：

```go
contents := facades.Storage().Get("file.jpg")
```

`Exists`方法可用于确定文件是否存在于磁盘上：

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

`Missing`方法可用于确定文件是否在磁盘上缺失：

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### 文件URL

您可以使用`Url`方法获取给定文件的URL。 如果您使用的是`local`驱动程序，这通常只会在给定路径前加上`/storage`并返回文件的相对URL。 如果您使用的是 `s3` 驱动程序，将返回完全限定的远程 URL：

```go
url := facades.Storage().Url("file.jpg")
```

> 使用 `local` 驱动时，`Url` 的返回值不会进行 URL 编码。 因此，我们建议始终使用能够创建有效 URL 的名称来存储文件。

#### 临时 URL

使用 `TemporaryUrl` 方法，您可以为使用非本地驱动存储的文件创建临时 URL。 此方法接受一个路径和一个指定 URL 过期时间的 `Time` 实例：

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### 文件元数据

除了读写文件外，Goravel 还可以提供有关文件本身的信息：

```go
size := facades.Storage().Size("file.jpg")
```

`LastModified` 方法返回文件的最后修改时间：

```go
time, err := facades.Storage().LastModified("file.jpg")
```

可以通过 `MimeType` 方法获取给定文件的 MIME 类型：

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

也可以使用 `NewFile` 方法：

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### 文件路径

要获取特定文件的路径，可以使用 `Path` 方法。 当使用 `local` 驱动时，这将为您提供文件的绝对路径。 然而，如果您使用的是像 `s3` 这样的驱动，该方法将给出文件在存储桶中的相对路径：

```go
path := facades.Storage().Path("file.jpg")
```

## 存储文件

The `Put` method may be used to store file contents on a disk. Remember, all file paths should be specified relative to
the "root" location configured for the disk:

```go
err := facades.Storage().Put("file.jpg", contents)
```

You can also use `PutFile` and `PutFileAs` to save files directly on disk:

```go
import "github.com/goravel/framework/filesystem"

// 自动为文件名生成唯一的 ID...
file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("photos", file)

// 手动指定文件名...
file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "photo.jpg")
```

There are a few important things to note about the `PutFile` method. Note that we only specified a directory name and
not a filename. By default, the `PutFile` method will generate a unique ID to serve as the filename. The file's
extension will be determined by examining the file's MIME type. The path to the file will be returned by the `PutFile`
method so you can store the path, including the generated filename, in your database.

### Copying & Moving Files

The `Copy` method may be used to copy an existing file to a new location on the disk, while the `Move` method may be
used to rename or move an existing file to a new location:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### File Uploads

In web applications, one of the most common use cases for storing files is storing user-uploaded files such as photos
and documents. Goravel makes it very easy to store uploaded files using the `Store` method on an uploaded file instance.
Call the `Store` method with the path at which you wish to store the uploaded file:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

There are a few important things to note about this example. Note that we only specified a directory name, not a
filename. By default, the `Store` method will generate a unique ID to serve as the filename. The file's extension will
be determined by examining the file's MIME type. The path to the file will be returned by the `Store` method so you can
store the path, including the generated filename, in your database.

You may also call the `PutFile` method on the `Storage` facade to perform the same file storage operation as the example
above:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("photos", file)
```

### Specifying A File Name

If you do not want a filename to be automatically assigned to your stored file, you may use the `StoreAs` method, which
receives the path, the filename, and the (optional) disk as its arguments:

```go
file, err := ctx.Request().File("avatar")
path, err := file.StoreAs("avatars", "name")
```

You may also use the `PutFileAs` method on the Storage facade, which will perform the same file storage operation as the
example above:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("photos", file, "name")
```

> If the file name specified by `StoreAs` and `PutFileAs` doesn't have a suffix, the suffix is automatically added based
> on the MIME of the file; otherwise, the specified file name is used directly.

### Specifying A Disk

By default, this uploaded file's `Store` method will use your default disk. If you would like to specify another disk,
please use the `Disk` method:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Other Uploaded File Information

If you would like to get the original name and extension of the uploaded file, you may do so using the
`GetClientOriginalName` and `GetClientOriginalExtension` methods:

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extension := file.GetClientOriginalExtension()
```

However, keep in mind that the `GetClientOriginalName` and `GetClientOriginalExtension` methods are considered unsafe,
as the file name and extension may be tampered with by a malicious user. For this reason, you should typically prefer
the `HashName` and `Extension` methods to get a name and an extension for the given file upload:

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
