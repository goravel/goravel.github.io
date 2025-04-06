# Файловое хранилище

Goravel предоставляет простые драйверы для работы с локальными файловыми системами, Amazon S3, Aliyun OSS, Tencent COS, Minio и
Cloudinary. Еще лучше, переключение между этими параметрами хранилища между вашей локальной машиной разработки и производством
сервер удивительно прост, так как API остается одинаковым для каждой системы. Goravel поставляется с водителем `local` для других
драйверов, пожалуйста, проверьте соответствующий независимый пакет расширения:

| Водитель | Ссылка                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| S3       | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS      | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| КХП      | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Минио    | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Облачный | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Конфигурация

Файл конфигурации файловой системы Goravel находится в папке `config/filesystems.go`. В этом файле вы можете настроить все
из "дисков файловой системы", каждый диск представляет определенный драйвер хранилища и место хранения.

> Вы можете настроить столько дисков, сколько хотите, и даже иметь несколько дисков, которые используют один и тот же драйвер.

### Локальный драйвер

При использовании драйвера `local` все операции относятся к папке `root`, определенной в конфигурационном файле `filesystems`
. По умолчанию это значение установлено в директории `storage/app`. Therefore, the following method would
write to `storage/app/example.txt`:

```go
facades.Storage().Put("example.txt", "Contents")
```

### Публичный диск

Конфигурационный файл `public`` с файловыми системами
предназначен для файлов, которые будут доступны публично. По умолчанию `public
`диск использует драйвер`local`и сохраняет его файлы в`storage/app/public\`. Если вы хотите посетить эти файлы из веб,
вы можете создать файловую маршрутизацию:

```go
facades.Route().Static("storage", "./storage/app/public")
```

## Получение экземпляров диска

Фасад «Хранилище» может быть использован для взаимодействия с любым из настроенных дисков. Например, вы можете использовать метод `Put`
на фасаде для сохранения аватара на диске по умолчанию. Если вы вызовете методы на фасаде `Storage` без первого
вызова метода `Disk`, метод будет автоматически передан на диск по умолчанию:

```go
facades.Storage().Put("avatars/1.png", "Contents")
```

Если ваше приложение взаимодействует с несколькими дисками, вы можете использовать метод `Disk` на фасаде `Storage` для работы с файлами
на определенном диске:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Contents")
```

## Вставить контекст

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Contents")
```

## Получение файлов

Метод Get`может использоваться для извлечения содержимого файла. Сырье строки файла будет возвращено методом
. Помните, что все пути должны быть указаны относительно расположения`root\` диска:

```go
content := facades.Storage().Get("file.jpg")
```

Метод `Exists` может использоваться для определения наличия файла на диске:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

Метод `Отсутствует` может использоваться для определения отсутствия файла с диска:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### URL файла

Вы можете использовать метод `Url`, чтобы получить URL для данного файла. If you are using the `local` driver, this will typically
just prepend `/storage` to the given path and return a relative URL to the file. Если вы используете `s3` драйвер,
полностью квалифицированный удалённый URL будет возвращен:

```go
url := facades.Storage().Url("file.jpg")
```

> При использовании драйвера «local», возвращаемое значение «Url» не является кодированным URL. For this reason, we recommend always
> storing your files using names that will create valid URLs.

#### Временные URL-адреса

Используя метод `TemporaryUrl`, вы можете создавать временные URL-адреса для файлов, хранящихся в нелокальном драйвере. Этот метод
принимает путь и экземпляр `Time`, указывающий, когда URL должен истекать:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Метаданные файла

Помимо чтения и записи файлов, Горавель может также предоставлять информацию о самих файлах:

```go
size := facades.Storage().Size("file.jpg")
```

Метод `LastModified` возвращает последнее измененное время файла:

```go
time err := facades.Storage().LastModified("file.jpg")
```

MIME тип файла может быть получен методом `MimeType`:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Также можно использовать метод `NewFile`:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Пути к файлам

Чтобы получить путь к определенному файлу, вы можете использовать метод `Пуск`. When using the `local` driver, this will
provide you with the absolute path to the file. Однако, если вы используете драйвер, как `s3`, метод даст вам
относительный путь к файлу внутри контейнера:

```go
путь := facades.Storage().Path("file.jpg")
```

## Хранение файлов

Метод `Put` может использоваться для хранения содержимого файла на диске. Помните, что все пути к файлам должны быть указаны относительно
местоположения "root", настроенного для диска:

```go
err := facades.Storage().Put("file.jpg", contents)
```

Вы также можете использовать `PutFile` и `PutFileAs` для сохранения файлов непосредственно на диске:

```go
импорт "github.com/goravel/framework/filesystem"

// Автоматическая генерация уникального ID для имени файла...
файла, err := filesystem.NewFile("./logo.png")
пути := facades.Storage(). utFile("photos", file)

// Вручную указать имя файла...
файла, err := filesystem.NewFile("./logo.png")
путь := facades.Storage().PutFileAs("фото", файл, "photo.jpg")
```

Есть несколько важных моментов, которые нужно обратить внимание на метод `PutFile`. Note that we only specified a directory name and
not a filename. По умолчанию, метод `PutFile` создаст уникальный ID в качестве имени файла. Расширение файла
будет определяться рассмотрением MIME типа файла. Путь к файлу будет возвращен методом `PutFile`
для сохранения пути, включая в вашу базу данных созданное имя файла.

### Копирование и перемещение файлов

Метод `Копировать` может быть использован для копирования существующего файла в новое место на диске, в то время как метод `Move` может быть
используется для переименования или перемещения существующего файла в новое место:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Загрузка файлов

In web applications, one of the most common use cases for storing files is storing user-uploaded files such as photos
and documents. Горавель позволяет легко хранить загруженные файлы, используя метод `Store` на загруженном экземпляре файла.
Вызовите метод `Store` с путем, по которому вы хотите сохранить загруженный файл:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Есть несколько важных моментов, чтобы отметить этот пример. Обратите внимание, что мы только указали имя каталога, а не
имя файла. По умолчанию, метод `Store` создаст уникальный ID в качестве имени файла. The file's extension will
be determined by examining the file's MIME type. The path to the file will be returned by the `Store` method so you can
store the path, including the generated filename, in your database.

Вы также можете вызвать метод `PutFile` на фасаде `Storage`, чтобы выполнить ту же операцию хранения файлов, что и пример
выше:

```go
импортировать "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
путь := facades.Storage().PutFile("photos", file)
```

### Укажите имя файла

Если вы не хотите, чтобы имя файла автоматически назначалось к хранимому файлу, вы можете использовать метод `StoreAs`, который
получает в качестве аргументов путь, имя файла и (необязательно) диск:

```go
файл, err := ctx.Request().File("avatar")
путь, err := file.StoreAs("avatars", "name")
```

You may also use the `PutFileAs` method on the Storage facade, which will perform the same file storage operation as the
example above:

```go
import "github.com/goravel/framework/filesystem"

file, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("фото", файл, "имя")
```

> Если имя файла, указанное `StoreAs` и `PutFileAs` не имеет суффикса, суффикс автоматически добавляется на основе
> MIME файла; в противном случае указанное имя файла используется напрямую.

### Указание диска

По умолчанию этот загруженный файл метод `Store` будет использовать ваш диск по умолчанию. Если вы хотите указать другой диск,
используйте метод `Disk`:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Disk("s3").Store("avatars")
}
```

### Другая загруженная информация

Если вы хотите получить оригинальное имя и расширение загруженного файла, вы можете сделать это, используя методы
`GetClientOriginalName` и `GetClientOriginalExtension`:

```go
, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
расширение := file.GetClientOriginalExtension()
```

However, keep in mind that the `GetClientOriginalName` and `GetClientOriginalExtension` methods are considered unsafe,
as the file name and extension may be tampered with by a malicious user. For this reason, you should typically prefer
the `HashName` and `Extension` methods to get a name and an extension for the given file upload:

```go
file, err := ctx.Request().File("avatar")

name := file.HashName() // Генерировать уникальное, случайное имя...
расширение, err := file.Extension() // Определение расширения файла, основанного на MIME-типе файла...
```

## Удаление файлов

Метод `Delete` принимает имя одного файла или массив файлов для удаления:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

При необходимости вы можете указать диск, из которого должен быть удален файл:

```go
err := facades.Storage().Disk("s3").Delete("file.jpg")
```

## Каталоги

### Получить все файлы внутри папки

Метод `Files` возвращает кусочек всех файлов в заданном каталоге. Если вы хотите получить список всех
файлов в данной директории, включая все поддиректории, вы можете использовать метод `AllFiles`:

```go
файлов, err := facades.Storage().Disk("s3").Файлы("каталог")
файлов, err := facades.Storage().Disk("s3").AllFiles("каталог")
```

### Получить все каталоги внутри A Directory

Метод `Directories` возвращает маску всех каталогов в заданном каталоге. Кроме того, вы можете использовать метод
`AllDirectories` для получения списка всех каталогов в данной папке и всех ее подкаталогах:

```go
каталоги, err := facades.Storage().Disk("s3").Директория("каталог")
каталогов, err := facades.Storage().Disk("s3").AllDirectories("каталог")
```

### Создать каталог

Метод `MakeDirectory` создаст указанный каталог, включая все необходимые подкаталоги:

```go
err := facades.Storage().MakeDirectory(каталог)
```

### Удалить каталог

Наконец, метод `DeleteDirectory` может быть использован для удаления каталога и всех его файлов:

```go
err := facades.Storage().DeleteDirectory(каталог)
```

## Пользовательские файловые системы

Вы можете установить драйвер `custom` в файле `config/filesystems.go`.

```go
"custom": map[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

You need to implement the `github.com/goravel/framework/contracts/filesystem/Driver` interface in the `via`
configuration item.

```go
type Driver interface {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, ошибка)
  Копировать (oldFile, newFile string) ошибка
  Удалить(файл ... tring) ошибка
  DeleteDirectory(directory string)
  Directories(path string) ([]string, error)
  Exists(file string) бул
  Файл (path string) ([]string, ошибка)
  Get(file string) (string, error)
  GetBytes(file string) ([]byte, error)
  LastModified(file string) (time. ime, error)
  MakeDirectory(строка каталога) ошибки
  MimeType(строка файла) (строка, строка, ошибка)
  Отсутствующая (строка файла) бул
  Move(oldFile, newFile string) ошибка
  Path(file string) строка
  Put(file, file, ошибка содержимого)
  PutFile(строка пути, файл источника) (строка, ошибка)
  PutFileAs(строка пути), файл источника, имя строки) (строка, ошибка)
  Размер(строка файла) (int64, ошибка)
  Временная строка(строка файла, время времени. ime) (строка, ошибка)
  WithContext(ctx context.Context) Driver
  Url(file string) string
}
```

> Примечание: поскольку конфигурация не была загружена при регистрации пользовательских драйверов, пожалуйста, используйте
> `facades. onfig().Env`, чтобы получить конфигурацию в пользовательском драйвере.
