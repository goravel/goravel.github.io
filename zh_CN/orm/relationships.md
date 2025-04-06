# 关系

数据库表被互联是常见的。 例如，博客帖子可能有许多评论，或者订单可能为
链接到放置它的用户。 `Orm`简化了这种关系的管理和处理，它可以处理
各种共同关系：

- [One To One](#one-to-one)
- [One To Many](#one-to-many)
- [Many To Many](#Many-To-Many)
- [Polymorphic](#polymorphic)

## 定义关系

### 一对一的

一对一的关系是非常基本的数据库关系。 例如，一个 `User` 模型可能与一个 `Phone` 模型相关联的
。

```go
请输入用户结构是否正确，
  orm。 odel
  名称字符串
  电话 *Phone
}

类型 Phone struct v.
  orm. odel
  UserID uint
  name string
}
```

当使用 "Orm" 时，它会自动将外键分配到基于父模型名称的关系。 为
例如，`Phone` 模型默认有一个 `UserID` 外键。 然而，如果你想要更改此
约定，你可以在 `User` 模式中添加 `foreignKey` 标签。 (这也适用于其他
关系。)

```go
请输入用户结构是否正确，
  orm。 odel
  命名字符串
  Phone *Phone `gorm:"foreignKey:UserName"
}

类型 Phone struct 然后Power
  orm. odel
  用户名字符串
  名称字符串
}
```

此外，在使用 `Orm` 时，假定外键应该与父键列的主键相符。
这意味着`Orm`将在`Phone`记录的`UserId`列中搜索用户的`ID`列。 If you
wish to use a primary key value other than `ID`, you can add a "Tag" reference to the `Phone` field in `User` model. To
do this, simply pass a third argument to the `hasOne` method. (其它关系设置类似。)

```go
type User struct {
  orm.Model
  Name  string
  Phone   *Phone `gorm:"foreignKey:UserName;references:name"`
}

type Phone struct {
  orm.Model
  UserName string
  Name   string
}
```

#### 定义反向关系

我们可以从我们的 `User` 模型访问`Phone` 模型。 现在，我们需要在 `Phone` 模型上建立关系，
允许我们访问手机的拥有者。 为此，我们可以在 `Phone` 模式中定义一个 `User` 字段。

```go
键入用户结构。
  orm.Model
  name string
}

type Phone struct power
  orm. odel
  UserID uint
  name
  User *User
}
```

### 一对多

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child
models. 例如，博客文章可能有无限数量的评论。 像所有其他的`Orm`关系一样，
一对多的关系是通过定义你的`Orm`模型上的一个字段来定义的：

```go
type Post struct {
  orm.Model
  Name   string
  Comments []*Comment
}

type Comment struct {
  orm.Model
  PostID   uint
  Name   string
}
```

记住，`Orm`会自动决定`Comment`模型的外键列. 根据惯例，Orm
将使用父模型的“hump case”名称，并将其后缀为“ID”。 因此，在这个示例中，Orm将假定`Comment`模型上的
外国密钥列是 \`PostID'。

### 一对多(反向) / 属于：

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent
post. 定义`One to Many`关系的反向，定义子模型上的关系方法，叫做
\`归属'方法：

```go
type Post struct {
  orm.Model
  Name   string
  Comments []*Comment
}

type Comment struct {
  orm.Model
  PostID   uint
  Name   string
  Post   *Post
}
```

## 许多和多个关系

多对多的关系比`One to One`和`One to Many`的关系稍微复杂。 一个
多对许多关系的一个例子是一个拥有许多角色的用户，这些角色也被其他用户在
应用程序中共享。 例如，用户可以被分配为“作者”和“编辑”角色； 然而，这些角色也可能是
分配给其他用户。 因此，一个用户有许多角色，一个角色有许多用户。

### 表格结构

为了界定这种关系，需要三个数据库表：“用户”、“角色”和“role_user”。 "role_user" 表
可以自定义，并包含 "user_id" 和 "role_id" 列。 此表被用作中间表
连接用户和角色。

记住，因为一个角色可能属于许多用户，我们不能简单地将“user_id”列在角色表中。 此
将意味着角色只能属于一个用户。 为了支持分配给
多个用户的角色，需要"role_user" 表。 我们可以总结这种关系的桌面结构：

```
用户
  id - 整数
  名称 - 字符串

角色
  id - 整数
  名称 - 字符串

role_user
  user_id - 整数
  role_id - 整数
```

### 模型结构

我们可以在 `User` 模型上定义一个 `Roles` 字段：

```go
type User struct {
  orm.Model
  Name  string
  Roles   []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm.Model
  Name   string
}
```

### 定义反向关系

要定义关系的反向，只需在 `Role` 模型中定义一个 `Users` 字段，并附加一个标签。

```go
type User struct {
  orm.Model
  Name  string
  Roles   []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm.Model
  Name   string
  Users  []*User `gorm:"many2many:role_user"`
}
```

### 自定义中间表

In general, the intermediate table foreign key is named by the "snake case" of the parent model name, you can override
them by `joinForeignKey`, `joinReferences`:

```go
type User struct {
  orm.Model
  Name  string
  Roles   []*Role `gorm:"many2many:role_user;joinForeignKey:UserName;joinReferences:RoleName"`
}

type Role struct {
  orm.Model
  Name   string
}
```

表格结构：

```
用户
  id - 整数
  名称 - 字符串

角色
  id - 整数
  名称 - 字符串

role_user
  user_name - 整数
  role_name - 整数
```

## 多变性

多变关系允许子模型使用单一关联属于多个类型的模型。
例如，您正在构建一个允许用户共享博客文章和视频的应用程序。 在这样一个
应用程序中，一个 `Comment` 模型可能同时属于`Post` 和 `Video` 模型。

### 表格结构

a. 多态关系与正常关系类似； 然而，子模型可以使用单个关联，属于多个类型的
模型。 例如，博客`Post` 和 `User` 可以分享一个与`Image`
模型的多发关系。 使用多发关系允许您有一个单一的独特图像表，可能与帖子
和用户相关联。 首先，请检查表格结构：

```
帖子
  id - 整数
  名称 - 字符串

视频
  id - 整数
  名称 - 字符串

图像
  id - 整数
  url - 字符串
  imageable_id - 整数
  imageable_type - string

comments
  id - 整数
  body - text
  commentable_id - 整数
  commentable_type - 字符串。
```

注意`imageable_id`和`imageable_type`列在`images`表中。 `imageable_id`列将包含帖子或用户的
ID值。 `imageable_type`列将包含父模型的类名。 Orm使用
`imageable_type` 列来确定当访问
`imageable` 关系时返回哪个“type”父模型。 `comments`表相似。

### 模型结构

接下来，让我们检查构建这种关系所需的模型定义：

```go
type Post struct {
  orm.Model
  Name     string
  Image    *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm.Model
  Name     string
  Image    *Image `gorm:"polymorphic:Imageable"`
  Comments []*Comment `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm.Model
  Name          string
  ImageableID   uint
  ImageableType string
}

type Comment struct {
  orm.Model
  Name            string
  CommentableID   uint
  CommentableType string
}
```

您可以使用 `polymorphicValue` 标签来更改多变值，例如：

```go
输入邮政结构&
  orm.Model
  Name
  Image *image `gorm:"polymorphic:Imageable;polymorphicValue:master"
}
```

## 查询关联

例如，想象一个 `User` 模型有许多关联的 `Post` 模型的博客应用程序：

```go
请输入用户结构是否正确，
  orm。 odel
  名称字符串
  帖子 []*Post
}

type Posts struct v.
  orm. odel
  UserID uint
  name string
}
```

### 创建或更新关联

您可以使用 `Select`, `Omit` 方法来控制关联的创建和更新。 这两种方法不能同时使用
，相关的控制函数只适用于`Create`、`Update`、`Save`：

```go
user := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Create all child associations while creating User
facades.Orm().Query().Select(orm.Associations).Create(&user)

// Only create Post while creating User. Note: If you don't use `orm.Associations`, but customize specific child associations separately, all fields in the parent model should also be listed at this time.
facades.Orm().Query().Select("Name", "Posts").Create(&user)

// When creating a User, ignore the Post, but create all other child associations
facades.Orm().Query().Omit("Posts").Create(&user)

// When creating User, ignore Name field, but create all child associations
facades.Orm().Query().Omit("Name").Create(&user)

// When creating User, ignore Name field and all child associations
facades.Orm().Query().Omit("Name", orm.Associations).Create(&user)
```

### 查找关联

```go
// 查找所有匹配相关记录的
var 帖子 []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// 查找条件
facades.Orm().Query().Model(&user).Where("name = ?"goravel").Order("id desc").Association("Posts").Find(&posts) &posts
```

### 附加关联

在“许多人到曼尼”、“一个人到曼尼”中添加新的协会，替换当前的`一对一'，
`一对一(反向)'：

```go
.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{name: "goravel"})
```

### 替换关联

将当前关联替换为新关联：

```go
.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.{name: "goravel"}, Post2)
```

### 删除关联

删除源和参数之间的关系（如果存在的话），只删除该引用 将不会从
数据库删除这些对象，外键必须是 NULL：

```go
.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### 清除关联

删除源和关联之间的所有引用，不会删除这些关联：

```go
Facades.Orm().Query().Model(&user).Association("Posts").Clle()
```

### 关联计数

返回当前关联的数量：

```go
Facades.Orm().Query().Model(&user).Association("Posts").Count()

// 计数条件
facades.Orm().Query().Model(&user).Where("name = ?"goravel").Association("Posts").Count.Count()
```

### 批量数据

```go
// 查找所有用户的所有角色
facades.Orm().Query().Model(&users).Association("Posts").Find(&ps)

// 从所有用户的帖子中删除用户
面板。 rm().Query().Model(&users).Association("Posts").Delete(&userA)

// 获取所有用户帖子的不同计数
面板。 rm().Query().Model(&users).Association("Posts"). ount()

// 包含批量数据的`Append`、`替换` 参数长度必须等于数据长度，否则它将返回一个错误
var 用户 = []model。 ser{user1, user2, user3}

// 我们有3个用户，向用户1的团队追加用户A。 将 userB 附加到用户2的团队，将用户A、userB 和 userC 附加到用户3的团队
面板。 rm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]models. 服务器{userA, userB, userC}(

// 重置用户1的团队为用户A，重置用户2的团队为用户B，重置用户3的团队为用户A，用户B和用户C
面板。 rm().Query().Model(&users).Association("Team").替换(&userA, &userB, &[]models.User{userA, userB, userC})
```

## 正在加载鹰座

方便加载查询多个模型的便利，并缓解“N + 1”查询问题。 为了说明 N +
1 查询问题，请考虑一个 "属于" 一个 "Author" 模型的 "Book" 模型：

```go
键入作者建构的Pow.
  orm. Model
  name string
}

type Book struct power
  orm. odel
  AuthorID uint
  name
  Author *Author
}
```

现在，让我们检索所有书籍及其作者：

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books own
  var 作者 models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

要与作者一起检索数据库表中的所有书籍，循环代码执行每一本书的查询。
这意味着收藏了25本书籍。 循环将运行26个查询——一个用于收藏书籍，25个
更多用于获取每个书的作者。

然而，我们可以利用急切的负荷来简化这一进程。 通过使用 "Wif " 方法，我们可以指定哪些
关系需要热切加载，并将查询次数减少到仅两个。

```go
var books models.Book
facades.Orm().Query().Wiw("Author").Find(&books)

for _, book := range books corps
  fmt.Println(book.Author)
}
```

用于此操作。 只会执行两个查询——一个查询来检索所有书籍，一个查询来检索所有书籍的
作者：

```sql
从 `books`;

从`authors` 中选择*, 在 `id` 中 (1, 2, 3, 4, 5, ...);
```

### 渴望加载多个关系

有时，你可能需要加载几种不同的关系。 要做到这一点，只需调用 "Wid" 方法多次
：

```go
var book models.Book
facades.Orm().Query().with("Author").with("Publisher").Find(&book)
```

### 嵌套探险家加载中

想要加载关系关系，您可以使用“dot”语法。 例如，让我们热衷于加载书的所有
作者和作者的所有个人联系人：

```go
var book models.Book
facades.Orm().Query().Wid("Author.Contacts").Find(&book)
```

### 限制鹰装载物

Sometimes you may wish to eager load a relationship but also specify additional query conditions for the eager loading
query. 您可以完成以下任务：

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author").Find(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

在此示例中，Orm只希望在帖子`name`列等于`author`的地方加载帖子。

### 延迟进料器加载

有时您可能需要在已经检索到父模型后加载关系。 例如，如果您需要动态地决定是否加载相关的模型，
可能是有用的：

```go
var book models.Book
facades.Orm().Query(). ind(&books)

for _, book := range books power.
  if some Conditione Power
    err := facades. rm().Query().Load(&book, "作者")
  }
}
```

如果您需要对急需加载查询设置额外查询约束，您可以使用下面的代码：

```go
导入 "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", function (query) orm.Query
  return query.Where ("name = ?"author")
}).Find(&book)
```

只在尚未加载时加载关系，请使用 `LoadMissing` 方法：

```go
facades.Orm().Query().LoadMissing(&book, "作者")
```
