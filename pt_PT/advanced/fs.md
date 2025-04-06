# Armazenamento de Arquivo

O Goravel fornece drivers simples para trabalhar com sistemas de arquivos locais, Amazon S3, Aliyun OSS, Tencent COS, Minio and
Cloudinary. Ainda melhor, alternar entre essas opções de armazenamento entre sua máquina de desenvolvimento local e produção
servidor é incrivelmente simples, já que a API permanece a mesma para cada sistema. Goravel vem com um driver `local`, para outros
drivers, por favor, verifique o pacote de extensão independente correspondente:

| Motorista | Vincular                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| S3        | [https://github.com/goravel/s3](https://github.com/goravel/s3)                 |
| OSS       | [https://github.com/goravel/oss](https://github.com/goravel/oss)               |
| COS       | [https://github.com/goravel/cos](https://github.com/goravel/cos)               |
| Mínimo    | [https://github.com/goravel/minio](https://github.com/goravel/minio)           |
| Nuvem     | [https://github.com/goravel/cloudinary](https://github.com/goravel/cloudinary) |

## Configuração

O arquivo de configuração do sistema de arquivos de Goravel está localizado em `config/filesystems.go`. Dentro deste arquivo, você pode configurar todos
de seu sistema de arquivos "discos", cada disco representa um determinado local de armazenamento e armazenamento.

> Você pode configurar quantos discos quiser e pode até ter vários discos que utilizem o mesmo driver.

### O driver local

Ao usar o driver `local`, todas as operações de arquivo são relativas ao diretório `root` definido em seu `filesystems`
arquivo de configuração. Por padrão, esse valor é definido para o diretório `storage/app`. Portanto, o seguinte método
escreveria no `armazenamento/app/exemplo.txt`:

```go
facades.Storage().Put("exemplo.txt", "Conteúdo")
```

### O disco Público

O disco `public`` incluído no arquivo de configuração do seu aplicativo `filesystem
`destina-se a arquivos que serão acessíveis ao público. Por padrão, o disco`public
`usa o driver`local`e armazena seus arquivos em`storage/app/public\`. Se você quiser visitar este arquivo da web,
você pode criar um roteamento de arquivos:

```go
facades.Route().Static("armazenamento", "./armazenamento/app/public")
```

## Obtendo instâncias de disco

A fachada `Armazenamento` pode ser usada para interagir com qualquer um dos seus discos configurados. Por exemplo, você pode usar o método `Put`
na fachada para armazenar um avatar no disco padrão. Se você chamar métodos na fachada `Armazenamento` sem primeiro
chamando o método `Disk`, o método será automaticamente passado para o disco padrão:

```go
facades.Storage().Put("avatars/1.png", "Conteúdo")
```

Se sua aplicação interage com vários discos, você pode usar o método `Disk` na fachada `Storage` para trabalhar com
arquivos em um disco em particular:

```go
facades.Storage().Disk("s3").Put("avatars/1.png", "Conteúdo")
```

## Injetar Contexto

```go
facades.Storage().WithContext(ctx).Put("avatars/1.png", "Conteúdo")
```

## Recuperando arquivos

O método `Get` pode ser usado para recuperar o conteúdo de um arquivo. O conteúdo da cadeia de caracteres do arquivo será retornado pelo
o método. Lembre-se, todos os caminhos de arquivo devem ser especificados em relação ao local do `root` do disco:

```go
conteúdo := facades.Storage().Get("file.jpg")
```

O método `Exists` pode ser usado para determinar se um arquivo existe no disco:

```go
if (facades.Storage().Disk("s3").Exists("file.jpg")) {
    // ...
}
```

O método `Ausente` pode ser usado para determinar se um arquivo está faltando no disco:

```go
if (facades.Storage().Disk("s3").Missing("file.jpg")) {
    // ...
}
```

### URLs do arquivo

Você pode usar o método `Url` para obter a URL de um determinado arquivo. Se você estiver usando o driver `local`, isso tipicamente
apenas precede `/storage` ao caminho dado e retorne uma URL relativa ao arquivo. If you are using the `s3` driver, the
fully qualified remote URL will be returned:

```go
url := facades.Storage().Url("file.jpg")
```

> Ao usar o driver 'local', o valor de retorno de 'Url' não é codificado em URL. Por esta razão, recomendamos sempre
> armazenar seus arquivos usando nomes que criarão URLs válidas.

#### URLs temporárias

Usando o método `TemporaryUrl`, você pode criar URLs temporárias para arquivos armazenados usando o driver não local. Este método
aceita um caminho e uma instância `Horário` especificando quando a URL deve expirar:

```go
url, err := facades.Storage().TemporaryUrl(
    "file.jpg", time.Now().Add(5*time.Minute)
)
```

### Metadados do Arquivo

Além de ler e escrever arquivos, Goravel também pode fornecer informações sobre os próprios arquivos:

```go
size := facades.Storage().Size("file.jpg")
```

O método `LastModified` retorna o último tempo de modificação do arquivo:

```go
time, err := facades.Storage().LastModified("arquivo.jpg")
```

O tipo MIME de um determinado arquivo pode ser obtido através do método `MimeType`:

```go
mime, err := facades.Storage().MimeType("file.jpg")
```

Também pode usar o método `NewFile`:

```go
import "github.com/goravel/framework/filesystem"

arquivo, err := filesystem.NewFile("./logo.png")
size, err := file.Size()
lastModified, err := file.LastModified()
mime, err := file.MimeType()
```

### Caminho dos Arquivos

Para obter o caminho de um arquivo específico, você pode utilizar o método `Path`. When using the `local` driver, this will
provide you with the absolute path to the file. However, if you are using a driver like `s3`, the method will give you
the file's relative path within the bucket:

```go
caminho := facades.Storage().Path("file.jpg")
```

## Armazenando arquivos

O método `Put` pode ser usado para armazenar o conteúdo do arquivo em um disco. Lembre-se, todos os caminhos de arquivo devem ser especificados em relação a
local "root" configurado para o disco:

```go
err := facades.Storage().Put("arquivo.jpg", conteúdo)
```

Você também pode usar `PutFile` e `PutFileAs` para salvar arquivos diretamente no disco:

```go
import "github.com/goravel/framework/filesystem"

// Gera automaticamente um ID único para o nome do arquivo...
arquivo, err := filesystem.NewFile("./logo.png")
caminho := facades.Storage(). utFile("fotos", arquivo)

// Especifique manualmente um nome de arquivo...
arquivo, err := filesystem.NewFile("./logo.png")
caminho := facades.Storage().PutFileAs("fotos", arquivo, "photo.jpg")
```

Há algumas coisas importantes a notar sobre o método `PutFile`. Note que só especificamos um nome de diretório e
não um nome de arquivo. Por padrão, o método `PutFile` irá gerar um ID exclusivo para servir como nome do arquivo. A extensão
do arquivo será determinada examinando o tipo MIME do arquivo. O caminho para o arquivo será retornado pelo método `PutFile`
para que você possa armazenar o caminho, incluindo o nome do arquivo gerado, no seu banco de dados.

### Copiando e Movendo Arquivos

O método `Copiar` pode ser usado para copiar um arquivo existente para um novo local no disco, enquanto o método `Mover` pode ser
usado para renomear ou mover um arquivo existente para um novo local:

```go
err := facades.Storage().Copy("old/file.jpg", "new/file.jpg")

err := facades.Storage().Move("old/file.jpg", "new/file.jpg")
```

### Carregamentos de Arquivos

Em aplicações web, um dos casos de uso mais comuns para armazenar arquivos é armazenar arquivos enviados pelo usuário, como fotos
e documentos. Goravel torna muito fácil armazenar arquivos enviados usando o método `Store` em uma instância de arquivo carregado.
Chamar o método `Loja` com o caminho no qual você deseja armazenar o arquivo carregado:

```go
func (r *UserController) Show(ctx http.Context) {
  file, err := ctx.Request().File("avatar")
  path, err := file.Store("avatars")
}
```

Há algumas coisas importantes a registar neste exemplo. Note que só especificamos um nome de diretório, não um nome
de arquivo. Por padrão, o método `Loja` irá gerar um ID único para servir como nome do arquivo. A extensão do arquivo será
determinada examinando o tipo MIME do arquivo. O caminho para o arquivo será retornado pelo método `Store` para que você possa
armazenar o caminho, incluindo o nome do arquivo gerado, no seu banco de dados.

Você também pode chamar o método `PutFile` na fachada `Storage` para executar a mesma operação de armazenamento de arquivos que o exemplo
acima:

```go
import "github.com/goravel/framework/filesystem"

arquivo, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFile("fotos", file)
```

### Especificando um nome de arquivo

Se você não quiser que um nome de arquivo seja atribuído automaticamente ao seu arquivo armazenado, você pode usar o método `StoreAs`, que
recebe o caminho, o nome do arquivo, e o (opcional) como seus argumentos:

```go
arquivo, err := ctx.Request().File("avatar")
path, err := file.StoreAs("avatars", "nome")
```

Você também pode usar o método `PutFileAs` na factura de armazenamento, que executará a mesma operação de armazenamento de arquivos que o
exemplo acima:

```go
import "github.com/goravel/framework/filesystem"

arquivo, err := filesystem.NewFile("./logo.png")
path := facades.Storage().PutFileAs("fotos", arquivo, "nome")
```

> Se o nome do arquivo especificado pelo 'StoreAs' e 'PutFileAs' não tem sufixo, o sufixo é adicionado automaticamente com base
> no MIME do arquivo; caso contrário, o nome de arquivo especificado é usado diretamente.

### Especificando um disco

Por padrão, o método 'Loja' do arquivo carregado usará o seu disco padrão. Se você gostaria de especificar outro disco,
por favor use o método `Disk`:

```go
func (r *UserController) Show(ctx http.Context) {
  arquivo, err := ctx.Request().File("avatar")
  caminho, err := file.Disk("s3").Store("avatars")
}
```

### Outras informações de arquivo enviadas

If you would like to get the original name and extension of the uploaded file, you may do so using the
`GetClientOriginalName` and `GetClientOriginalExtension` methods:

```go
arquivo, err := ctx.Request().File("avatar")

name := file.GetClientOriginalName()
extensão := file.GetClientOriginalExtension()
```

However, keep in mind that the `GetClientOriginalName` and `GetClientOriginalExtension` methods are considered unsafe,
as the file name and extension may be tampered with by a malicious user. Por este motivo, você normalmente deve preferir
os métodos `HashName` e `Extension` para obter um nome e uma extensão para o upload de determinado arquivo:

```go
arquivo, err := ctx.Request().File("avatar")

name := file.HashName() // Gerar um nome único, aleatório ...
extensão, err := file.Extension() // Determinar a extensão do arquivo com base no tipo MIME do arquivo...
```

## Excluindo arquivos

O método `Deletar` aceita um único nome de arquivo ou uma matriz de arquivos para apagar:

```go
err := facades.Storage().Delete("file.jpg")
err := facades.Storage().Delete("file.jpg", "file2.jpg")
```

Se necessário, você pode especificar o disco que o arquivo deve ser excluído:

```go
err := facades.Armazenamento().Disk("s3").Delete("arquivo.jpg")
```

## Diretórios

### Obter todos os arquivos em um diretório

O método `Arquivos` retorna uma fatia de todos os arquivos em um determinado diretório. Se você deseja recuperar uma lista de todos os arquivos
dentro de um determinado diretório, incluindo todos os subdiretórios, você pode usar o método `AllFiles`:

```go
arquivos, err := facades.Storage().Disk("s3").Files("diretório")
arquivos, err := facades.Storage().Disk("s3").AllFiles("diretório")
```

### Obter todos os diretórios dentro de um diretório

O método `Directories` retorna uma fatia de todos os diretórios dentro de um determinado diretório. Além disso, você pode usar o método
`AllDirectories` para obter uma lista de todos os diretórios dentro de um determinado diretório e de todos os seus subdiretórios:

```go
diretórios, err := facades.Storage().Disk("s3").Directories("diretório")
diretórios, err := facades.Storage().Disk("s3").AllDirectories("diretório")
```

### Criar um diretório

O método `MakeDirectory` criará o diretório dado, incluindo quaisquer subdiretórios necessários:

```go
err := facades.Storage().MakeDirectory(diretório)
```

### Excluir um diretório

Finalmente, o método `DeleteDirectory` pode ser usado para remover um diretório e todos os seus arquivos:

```go
err := facades.Storage().DeleteDirectory(diretório)
```

## Sistemas de arquivos personalizados

Você pode definir o driver `personalizado` no arquivo `config/filesystems.go`.

```go
"custom": mapa[string]any{
  "driver": "custom",
  "via": filesystems.NewLocal(),
},
```

Você precisa implementar a interface `github.com/goravel/framework/contracts/filesystem/Driver` no item de configuração `via`
.

```go
type interface do driver {
  AllDirectories(path string) ([]string, error)
  AllFiles(path string) ([]string, erro)
  Copy(oldFile, newFile string) erro
  Deletar(arquivo ... erro ao tentar
  DeleteDirectory(string de diretório) erro
  Directories(path string) ([]string, erro)
  existe(string do arquivo) bool
  Arquivos(string do caminho) ([]string, erro)
  Get(string do arquivo) (string, erro)
  GetBytes(string do arquivo) ([]byte, erro)
  LastModified(string do arquivo) (tempo. ime, erro)
  erro MakeDirectory(diretório)
  MimeType(file string) (string, string) erro)
  Falta (string de arquivo) bool
  Move(oldFile, newFile string) erro
  String Path(string de arquivo)
  Put(arquivo, erro
  PutFile(string de caminho, arquivo fonte) (string, erro)
  PutFileAs(string de caminho, arquivo de origem, name string) (string, error)
  Size(string do arquivo) (int64, error)
  TemporárioUrl(string do arquivo, horário. ime) (string, erro)
  WithContext(ctx context.Context) Driver
  Url(string de arquivo)
}
```

> Nota: Como a configuração não foi carregada quando o driver personalizado está registrado, por favor use
> `facades. onfig().Env` para obter a configuração no driver personalizado.
