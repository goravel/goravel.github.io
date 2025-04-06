# Relações

É comum que as tabelas do banco de dados sejam interconectadas. Por exemplo, um post de blog pode ter muitos comentários, ou um pedido pode
ser vinculado ao usuário que o fez. `Orm` simplifica o gerenciamento e tratamento de tais relações, e pode lidar com
várias relações comuns:

- [Um para mês](#one-to-one)
- [Um para Muito](#one-to-many)
- [Muitos para Muitos](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Definindo Relacionamentos

### Um por Um

Um relacionamento a um é um tipo muito básico de relação com a base de dados. Por exemplo, um modelo `Usuário` pode ser associado
com um modelo `Telefone`.

```go
type usuário struct {
  orm. odel
  Name string
  Phone *Phone
}

type Phone struct {
  orm. odel
  ID de usuário
  string de nome
}
```

Ao usar `Orm`, ele atribui automaticamente a chave estrangeira para a relação baseada no nome do modelo pai. For
instance, the `Phone` model is assumed to have a `UserID` foreign key by default. However, if you wish to change this
convention, you can add a `foreignKey` tag to the `Phone` field in `User` model. (Isso também se aplica a outras relações
. )

```go
type usuário struct {
  orm. odel
  Name string
  Phone *Phone `gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm. odel
  String Nome de Usuário
  String do Nome
}
```

Além disso, ao usar `Orm`, presume-se que a chave estrangeira deve corresponder à coluna de chave primária do pai.
Isso significa que `Orm` irá procurar o valor da coluna `ID` do usuário na coluna `UserId` do registro `Telefone`. Se você
deseja usar um valor de chave primária diferente de `ID`, você pode adicionar uma referência "Tag" ao campo `Telefone` no modelo `Usuário`. Para
fazer isso, simplesmente passe um terceiro argumento para o método `hasOne`. (Outras configurações de relacionamento são semelhantes)

```go
type usuário struct {
  orm. odel
  String de nome
  Telefone *gorm:"foreignKey:UserName; eferences:name"`
}

tipo de telefone struct {
  orm. odel
  String Nome de Usuário
  String do Nome
}
```

#### Definindo o Inverso do Relacionamento

Nós podemos acessar o modelo `Telefone` a partir do nosso modelo `Usuário`. Now, we need to establish a relationship on `Phone` model that
allows us to access the phone's owner. Para fazer isso, nós podemos definir um campo `Usuário` no modelo `Telefone`.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  ID de usuário
  String do nome
  Usuário *Usuário
}
```

### Um para muitos

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child
models. Por exemplo, um post de blog pode ter um número infinito de comentários. Como todas as outras relações `Orm`,
um-a-muitos são definidas definindo um campo no seu modelo `Orm`:

```go
digite a postagem struct {
  orm. odel
  Nome string
  Comentários []*Comentário
}

tipo Comentário struct {
  orm. odel
  PostID
  String de Nome
}
```

Lembre-se, `Orm` irá determinar automaticamente a coluna de chave estrangeira adequada para o modelo `Comentário`. Por convenção, Orm
receberá o nome de "cap case" do modelo pai e sufixo com `ID`. Então, neste exemplo, a Orm assumirá a coluna
estrangeira no modelo `Comentário` é `PostID`.

### Um para muitos (Inverso) / Belongs Para

Agora que podemos acessar todos os comentários de um post, vamos definir um relacionamento para permitir que um comentário acesse sua postagem
pai. Para definir a inversa de uma relação `One to Many`, defina um método de relacionamento no modelo filho que chama
o método `belongsTo`:

```go
digite a postagem struct {
  orm. odel
  Nome string
  Comentários []*Comentário
}

tipo Comentário struct {
  orm. odel
  PostID int
  string de nome
  Post *Post
}
```

## Muitos para muitos relacionamentos

Relações quase muitas são um pouco mais complicadas do que as relações `One To One` e `One To Many`. Um exemplo de uma relação
many-to-many é um usuário que tem muitas funções e essas funções também são compartilhadas por outros usuários na aplicação
. Por exemplo, um usuário pode ser atribuído ao papel de "Autor" e "Editor"; no entanto, essas funções também podem ser
atribuídas a outros usuários. Portanto, um usuário tem muitos papéis e um papel tem muitos usuários.

### Estrutura da mesa

Para definir essa relação, são necessárias três tabelas de banco de dados: `users`, `roles`, and `role_user`. A tabela 'role_user'
pode ser personalizada e contém colunas 'user_id' e 'role_id'. Esta tabela é usada como uma tabela intermediária
ligando usuários e papéis.

Lembre-se, como uma função pode pertencer a muitos usuários, nós não podemos simplesmente colocar uma coluna `user_id` na tabela `cargos`. Isto
significa que uma função só poderia pertencer a um único usuário. Para fornecer suporte para os papéis atribuídos a
vários usuários, a tabela `role_user` é necessária. Podemos resumir a estrutura de tabela da relação assim:

```
usuários
  id - inteiro
  name - string

roles
  id - inteiro
  name - string

role_user
  user_id - inteiro
  role_id - inteiro
```

### Estrutura do modelo

Podemos definir um campo `Cargos` no modelo `Usuário`:

```go
type usuário struct {
  orm. odel
  Name string
  Funções []*Role `gorm:"many2many:role_user"`
}

type role struct {
  orm. odel
  String de Nome
}
```

### Definindo o Inverso do Relacionamento

Para definir a inversa da relação, apenas defina um campo `Usuários` no modelo `Papel` e anexe uma tag.

```go
type usuário struct {
  orm. odel
  Name string
  Funções []*Role `gorm:"many2many:role_user"`
}

type role struct {
  orm. odel
  String de nome
  Usuários []*Usuário `gorm:"many2many:role_user"`
}
```

### Tabela intermediária personalizada

Em geral, a chave estrangeira da tabela intermediária é nomeada por "caso da cobra" do nome do modelo mãe, você pode substituir
eles por `joinForeignKey`, `joinReferences`:

```go
type usuário struct {
  orm. odel
  String de nome
  Funções []*Função `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
} Cargo de tipo

struct {
  orm. odel
  String de Nome
}
```

Estrutura da tabela:

```
usuários
  id - número inteiro
  nome - string

roles
  id - número inteiro
  nome - string

role_user
  user_name - nome inteiro
  papel - número inteiro 
 - número inteiro
```

## Polimórfico

Uma relação polimórfica permite que o modelo filho pertença a mais de um tipo de modelo usando uma única associação.
Por exemplo, imagine que você está criando um aplicativo que permite que os usuários compartilhem posts de blog e vídeos. Em tal aplicação
, um modelo `Comentário` pode pertencer tanto aos modelos `Post` quanto `Video`.

### Estrutura da tabela

Uma relação polimórfica é semelhante a uma relação normal; no entanto, o modelo filho pode pertencer a mais de um tipo de
usando uma única associação. For example, a blog `Post` and a `User` may share a polymorphic relation to an `Image`
model. O uso de uma relação polimórfica permite que você tenha uma única tabela de imagens exclusivas que podem ser associadas a publicações
e usuários. Primeiro, vamos examinar a estrutura da tabela:

```
postagens
  id - número inteiro
  nome - string

videos
  id - número inteiro
  nome - string

images
  id - número
  url - string
  imageable_id - número inteiro
  imageable_type - string

comments
  id - número inteiro
  - texto
  commentable_id - inteiro
  commentable_type - string
```

Observe as colunas `imageable_id` e `imageable_type` na tabela `images`. A coluna `imageable_id` conterá o valor
ID do post ou do usuário, enquanto a coluna `imageable_type` conterá o nome da classe do modelo pai. A coluna
`imageable_type` é usada por Orm para determinar qual "tipo" do modelo pai retornado ao acessar a relação
`imageable`. A tabela de `comentários` é similar.

### Estrutura do modelo

Em seguida, vamos examinar as definições de modelo necessárias para construir essa relação:

```go
digite a postagem struct {
  orm. odel
  Name string
  Imagem *Image `gorm:"polymorphic:Imageable"`
  Comentários []*Comment `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm. odel
  Name string
  Imagem *Image `gorm:"polymorphic:Imageable"`
  Comentários []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  String de Nome
  ImageableID uint
  ImageableType
}

type Comment struct {
  orm. odel
  String de Nome
  CommentableID uint
  CommentableType string
}
```

Você pode mudar o valor polimórfico através da etiqueta `polimorficValue`, como:

```go
type Post struct {
  orm.Model
  Name string
  Imagem *Imagem `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Consultando associações

Por exemplo, imagine uma aplicação de blog em que um modelo `User` tem muitos modelos associados `Post`:

```go
type usuário struct {
  orm. odel
  Name string
  Posts []*Post
}

type Post struct {
  orm. odel
  ID de usuário
  string de nome
}
```

### Criar ou atualizar associações

Você pode usar os métodos `Select`, `Omit` para controlar a criação e atualização de associações. Estes dois métodos não podem ser
usados ao mesmo tempo e as funções de controle associadas são aplicáveis apenas a `Criar`, `Atualizar`, `Salvar`:

```go
user := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Crie todas as associações filhas enquanto cria facturas
do usuário. rm().Query().Select(orm.Associations).Create(&user)

// Apenas criar Postagem ao criar um Usuário. Nota: Se você não usar `orm.Associations`, mas personalizar associações filhas específicas separadamente, todos os campos no modelo pai também devem ser listados neste momento.
facades.Orm().Query().Select("Nome", "Posts"). reate(&user)

// Ao criar um usuário, ignore o Post, mas crie todas as outras associações infantis
facades.Orm().Query(). mit("Posts").Create(&user)

// Ao criar o Usuário, ignore o campo Nome, mas crie todas as facturas das associações filhas
. rm().Query().Omit("Nome").Criar(&user)

// Quando criar um usuário, ignorar campo Nome e todas associações de crianças
facades.Orm().Query().Omit("Nome", orm.Associations).Create(&user)
```

### Localizar associações

```go
// Encontre todos os registros relacionados à correspondência
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Encontre associações com condições
facades.Orm().Query().Model(&user).Where("nome = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Acrescentar associações

Acrescentar novas associações para `Many To Many`, `One To Many`, substituir a associação atual para `One To One`,
`One To One(revers)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Substituir Associações

Substituir associações atuais por associações novas:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Excluir associações

Remova a relação entre argumentos e origens se existir, exclua apenas a referência, Não vai apagar os objetos de
DB, a chave estrangeira deve ser NULL:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Limpar associações

Remova todas as referências entre a fonte e a associação, não excluirá essas associações:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Contagem Associada

Retornar a contagem das associações atuais:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Contagem com condições
facades.Orm().Query().Model(&user).Where("nome = ?", "goravel").Association("Posts").Count()
```

### Dados do Lote

```go
// Encontre todos os papéis para todos os usuários
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Exclua o Usuário A das fachadas de todos os posts
. rm().Query().Model(&users).Association("Posts").Delete(&userA)

// Obtenha uma contagem distinta de facturas de posts
de todos os usuários. rm().Query().Model(&users).Association("Posts"). ount()

// Para `Append`, `Replace` com dados em lote, o comprimento dos argumentos precisa ser igual ao comprimento dos dados ou retornará um erro
usuários var = []models. ser{user1, user2, user3}

// Temos 3 usuários, adicionar usuário à equipe do usuário 1, Acrescentar usuário B à equipe do usuário 2, acrescentar usuário B e userC às fachadas do usuário
. rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]models. ser{userA, userB, userC})

// Redefinir a equipe do usuário para o userA, redefinir a equipe do usuário 2 para o userB, redefinir a equipe do usuário 3 para o userA, userB e userC
facades. rm().Query().Model(&users).Association("Equipe").Replace(&userA, &userB, &[]models.Usuário{userA, userB, userC})
```

## Carregamento Ansioso

As conveniências de carregamento mais antigas para consultar vários modelos e aliviar o problema da consulta "N + 1". Para ilustrar o problema de consulta N +
1, considere um modelo `Book` que "pertence" um modelo `Author`:

```go
type autor struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  String de nome
  Autor *Autor
}
```

Agora, vamos recuperar todos os livros e seus autores:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Para recuperar todos os livros na tabela do banco de dados juntamente com seus autores, o código do laço executa uma consulta para cada livro.
Isto significa que para uma coleção de 25 livros, o laço executaria 26 consultas - uma para a coleção de livros e mais 25
para pegar o autor de cada livro.

No entanto, podemos simplificar este processo por meio de uma grande carregamento. Usando o método `With`, podemos especificar quais relacionamentos
precisam ser carregados ansiosamente e reduzir o número de consultas para apenas dois.

```go
var livros models.Book
facades.Orm().Query().With("Autor").Find(&books)

for _, livro := intervalo livros {
  fmt.Println(book.Author)
}
```

Para esta operação, somente duas consultas serão executadas - uma consulta para recuperar todos os livros e uma consulta para obter autores
para todos os livros:

```sql
selecione * de `livros`; U

selecione * de `autos` onde `id` está (1, 2, 3, 4, 5, ...);
```

### Carregando Múltiplos Relacionamentos Agente

Às vezes você pode precisar de carregar com ansiedade vários relacionamentos diferentes. Para fazer isso, basta chamar o método `With` várias
vezes:

```go
var book models.Book
facades.Orm().Query().With("Autor").With("Publisher").Find(&book)
```

### Carregamento Aninhado Por Aninhamento

Para ansiar por carregar as relações de um relacionamento, você pode usar a sintaxe "ponto". Por exemplo, vamos carregar todos os autores
do livro e todos os contatos pessoais do autor:

```go
var book models.Book
facades.Orm().Query().With("Autor.Contatos").Localizar(&livro)
```

### Restrição de carregamentos de Águas

Às vezes você pode querer carregar um relacionamento, mas também especificar condições adicionais de consulta para a consulta
de carregamento ansioso. Você pode fazer isso abaixo:

```go
import "github.com/goravel/framework/contracts/database/orm"

var models.Book
facades.Orm().Query().With("Autor", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Autor", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Neste exemplo, Orm irá apenas carregar ansiosamente os posts onde a coluna `nome` do post é igual à palavra `autor`.

### Carregamento Preguiçoso Eager

Às vezes você precisará carregar um relacionamento depois que o modelo pai já tenha sido recuperado. Por exemplo, este
pode ser útil se você precisa dinamicamente decidir se quer carregar modelos relacionados:

```go
var livros models.Book
facades.Orm().Query(). ind(&books)

for _, book := intervalo de livros {
  se someCondition {
    err := facades. rm().Query().Load(&book, "Autor")
  }
}
```

Se você precisar definir restrições adicionais de consulta sobre o carregamento dos aviões, você pode usar o código abaixo:

```go
import "github.com/goravel/framework/contracts/database/orm"

var models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). (&book)

facades.Orm().Query().Load(&book, "Autor", func(query orm.Query) orm.Query {
  return query.Where("nome = ?", "author")
}).Find(&book)
```

Para carregar uma relação somente quando ela não tiver sido carregada, utilize o método `LoadMissing`:

```go
facades.Orm().Query().LoadMissing(&book, "Autor")
```
