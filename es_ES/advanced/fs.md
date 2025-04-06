# Almacenamiento de archivos

Goravel proporciona controladores simples para trabajar con sistemas de archivos locales, Amazon S3, Aliyun OSS, Tencent COS, Minio y
Cloudinary. Aún mejor, Cambiar entre estas opciones de almacenamiento entre su máquina de desarrollo local y producción
servidor es increíblemente simple ya que la API sigue siendo la misma para cada sistema. Goravel viene con un controlador `local`, para otros controladores
, por favor revisa el paquete de extensión independiente correspondiente:

| Conductor  | Enlace                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| T3         | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS        | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS        | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Mini       | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Nubdinario | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Configuración

El archivo de configuración del sistema de archivos de Goravel se encuentra en `config/filesystems.go`. Dentro de este archivo, puede configurar todo
de su sistema de archivos "discos", cada disco representa un controlador de almacenamiento y una ubicación de almacenamiento en particular.

> Puede configurar tantos discos como desee e incluso tener varios discos que utilicen el mismo controlador.

### El conductor local

Al usar el controlador `local`, todas las operaciones de archivo son relativas al directorio `root` definido en tu archivo de configuración `filesystems`
. Por defecto, este valor se establece en el directorio `storage/app`. Por lo tanto, el siguiente método
escribiría a `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "Contents")
```

### El disco público

El disco `public`` incluido en el archivo de configuración `filesystems
`de tu aplicación está destinado a archivos que van a ser de acceso público. Por defecto, el disco`public
`utiliza el controlador`local`y almacena sus archivos en`storage/app/public\`. Si desea visitar este archivo desde la web,
puede crear un enrutamiento de archivos:

```go
facades.Route().Static("storage", "./storage/app/public")
```

## Obteniendo instancias de disco

La fachada `Storage` puede ser usada para interactuar con cualquiera de sus discos configurados. Por ejemplo, se puede utilizar el método `Put`
en la fachada para almacenar un avatar en el disco predeterminado. Si llama a métodos en la facade `Storage` sin antes llamar
al método `Disk`, el método se pasará automáticamente al disco predeterminado:

```go
facades.Storage().Put("avatars/1.png", "Contenidos")
```

Si su aplicación interactúa con varios discos, puedes usar el método `Disk` en la fachada `Storage` para trabajar con archivos
en un disco en particular:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## Inyectar contexto

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## Recuperando archivos

El método `Get` se puede utilizar para recuperar el contenido de un archivo. El contenido de la cadena raw del archivo será devuelto por
el método. Recuerda, todas las rutas de archivos deben especificarse relativas a la ubicación `root` del disco:

```go
contents := facades.Storage().Get("file.jpg")
```

El método `Exists` se puede utilizar para determinar si existe un archivo en el disco:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

El método `Missing` puede ser usado para determinar si un archivo no está en el disco:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### URLs de archivo

Puede utilizar el método `Url` para obtener la URL de un archivo dado. Si estás usando el controlador `local`, esto normalmente
simplemente antepone `/storage` a la ruta dada y devuelve una URL relativa al archivo. If you are using the `s3` driver, the
fully qualified remote URL will be returned:

```go
url := facades.Storage())[video] rl("file.jpg")
```

> Cuando se utiliza el controlador `local`, el valor devuelto de `Url` no está codificado en URL. For this reason, we recommend always
> storing your files using names that will create valid URLs.

#### URLs temporales

Usando el método `TemporaryUrl`, puedes crear URLs temporales para archivos almacenados usando el controlador No local. Este método
acepta una ruta de acceso y una instancia de `Time` que especifica cuándo debe expirar la URL:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Metadatos de archivo

Además de leer y escribir archivos, Goravel también puede proporcionar información sobre los archivos ellos mismos:

```go
size := facades.Storage().Size("file.jpg")
```

El método `LastModified` devuelve la última hora modificada del archivo:

```go
time, err := facades.Storage().LastModified("file.jpg")
```

El tipo MIME de un archivo determinado puede obtenerse mediante el método `MimeType`:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

También puede utilizar el método `NewFile`:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Rutas de archivo

Para obtener la ruta de un archivo específico, puede utilizar el método `Path`. Al usar el controlador `local`, esto le proporcionará
la ruta absoluta al archivo. Sin embargo, si está usando un controlador como `s3`, el método le dará
la ruta relativa del archivo dentro del cubo:

```go
path := facades.Storage().Path("file.jpg")
```

## Almacenando archivos

El método `Put` se puede utilizar para almacenar contenidos de archivos en un disco. Recuerda, todas las rutas de archivos deben especificarse relativas a
la ubicación "root" configurada para el disco:

```go
err := facades.Storage().Put("file.jpg", contenidos)
```

También puedes usar `PutFile` y `PutFileAs` para guardar archivos directamente en el disco:

```go
import "github.com/goravel/framework/filesystem"

// Genera automáticamente un ID único para el nombre del archivo...
file, err := filesystem.NewFile("./logo.png")
ruta := facades.Storage(). utFile("photos", file)

// Especificar manualmente un nombre de archivo...
file, err := filesystem.NewFile("./logo.png")
ruta := facades.Storage().PutFileAs("photos", file, "photo.jpg")
```

Hay algunas cosas importantes que tener en cuenta sobre el método `PutFile`. Tenga en cuenta que sólo especificamos un nombre de directorio y
no un nombre de archivo. Por defecto, el método `PutFile` generará un ID único que servirá como nombre de archivo. La extensión
del archivo se determinará examinando el tipo MIME del archivo. La ruta al archivo será devuelta por el método `PutFile`
para que pueda almacenar la ruta, incluyendo el nombre de archivo generado, en su base de datos.

### Copiar y mover archivos

El método `Copiar` se puede utilizar para copiar un archivo existente a una nueva ubicación en el disco, mientras que el método `Mover` puede ser
usado para renombrar o mover un archivo existente a una nueva ubicación:

```go
err := facades.Storage().Copia("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Subir archivos

En aplicaciones web, uno de los casos de uso más comunes para almacenar archivos es almacenar archivos subidos por el usuario como fotos
y documentos. Goravel hace que sea muy fácil almacenar archivos subidos utilizando el método `Store` en una instancia de archivo cargada.
Llamar al método `Store` con la ruta en la que desea almacenar el archivo subido:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  ruth, err := file.Store("avatars")
}
```

Hay algunas cosas importantes que señalar sobre este ejemplo. Tenga en cuenta que sólo especificamos un nombre de directorio, no un nombre de archivoformat@@0
. Por defecto, el método `Store` generará un ID único que servirá como nombre de archivo. La extensión del archivo
se determinará examinando el tipo MIME del archivo. The path to the file will be returned by the `Store` method so you can
store the path, including the generated filename, in your database.

También puedes llamar al método `PutFile` en la facade `Storage` para realizar la misma operación de almacenamiento de archivos que el ejemplo
anterior:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
ruta := facades.Storage().PutFile("photos", file)
```

### Especificar un nombre de archivo

Si no desea que un nombre de archivo sea asignado automáticamente al archivo almacenado, puede utilizar el método `StoreAs`, cuál
recibe la ruta, el nombre del archivo y el disco (opcional) como sus argumentos:

```go
file, err := ctx.Request().File("avatar")
ruta, err := file.StoreAs("avatars", "name")
```

También puede utilizar el método `PutFileAs` en la fachada Storage, que realizará la misma operación de almacenamiento de archivos que el ejemplo
anterior:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
ruta := facades.Storage().PutFileAs("photos", file, "name")
```

> Si el nombre de archivo especificado por `StoreAs` y `PutFileAs` no tiene un sufijo el sufijo se añade automáticamente basado
> en el MIME del archivo; de otra manera, el nombre del archivo especificado se utiliza directamente.

### Especificando un disco

Por defecto, el método `Store` de este archivo subido usará tu disco predeterminado. Si desea especificar otro disco,
utilice el método `Disk`:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  ruth, err := file.Disk("s3").Store("avatars")
}
```

### Otra información de archivo subido

Si desea obtener el nombre original y la extensión del archivo subido, puedes hacerlo utilizando los métodos
`GetClientOriginalName` y `GetClientOriginalExtension`:

```go
file, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extensión := file.GetClientOriginalExtension()
```

However, keep in mind that the `GetClientOriginalName` and `GetClientOriginalExtension` methods are considered unsafe,
as the file name and extension may be tampered with by a malicious user. Por esta razón, normalmente debería preferir
los métodos `HashName` y `Extension` para obtener un nombre y una extensión para la subida de archivos dados:

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // Genera un nombre único y aleatorio...
extension, err := file.Extension() // Determinar la extensión del archivo basado en el tipo MIME del archivo...
```

## Eliminando Archivos

El método `Delete` acepta un solo nombre de archivo o una matriz de archivos a eliminar:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

Si es necesario, puede especificar el disco desde el que el archivo debe ser borrado:

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## Directorios

### Obtener todos los archivos dentro de un directorio

El método `Files` devuelve una porción de todos los archivos en un directorio determinado. Si desea recuperar una lista de todos los archivos
dentro de un directorio determinado, incluyendo todos los subdirectorios, puede utilizar el método `AllFiles`:

```go
files, err := facades.Storage().Disk("s3").Files("directorio")
files, err := facades.Storage().Disk("s3").AllFiles("directorio")
```

### Obtener todos los directorios dentro de un directorio

El método `Directories` devuelve una porción de todos los directorios dentro de un directorio determinado. Además, puede utilizar el método
`AllDirectories` para obtener una lista de todos los directorios dentro de un directorio determinado y todos sus subdirectorios:

```go
directories, err := facades.Storage().Disk("s3").Directories("directory")
directorios, err := facades.Storage().Disk("s3").AllDirectories("directory")
```

### Crear un directorio

El método `MakeDirectory` creará el directorio dado, incluyendo cualquier subdirectorio necesario:

```go
err := facades.Storage().MakeDirectory(directory)
```

### Eliminar un directorio

Finalmente, el método `DeleteDirectory` se puede utilizar para eliminar un directorio y todos sus archivos:

```go
err := facades.Storage().DeleteDirectory(directory)
```

## Filesystems personalizados

Puedes establecer el controlador `custom` en el archivo `config/filesystems.go`.

```go
"custom": mapa[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Necesitas implementar la interfaz `github.com/goravel/framework/contracts/filesystem/Driver` en el elemento de configuración `via`
.

```go
type Driver interface {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, error)
  Copy(oldFile, newFile string) error
  Delete(file ... tring) error
  DeleteDirectory(cadena de directorio) error
  Directorios (cadena de ruta) ([]string, error)
  Existe(cadena de archivo) bool
  Files(path string) ([]string, error)
  Get(file string) (string, error)
  GetBytes(file string) ([]byte, error)
  LastModified(file string) (tiempo. ime, error)
  MakeDirectory(string de directorio) error
  MimeType(file string) (string, error)
  Missing(file string) bool
  Move(oldFile, newFile string) error
  Path(file string) string
  Put(file, content string) error
  PutFile(path string, source File) (string, error)
  PutFileAs(path string, source File, name string) (string, error)
  Size(file string) (int64, error)
  TemporaryUrl(file string, time time. ime) (string, error)
  WithContext(ctx context.Context) Driver
  Url(file string) string
}
```

> Nota: Dado que la configuración no ha sido cargada cuando el controlador personalizado está registrado, por favor use
> `facades. onfig().Env` para obtener la configuración en el controlador personalizado.
