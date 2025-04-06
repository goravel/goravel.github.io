# 关系

数据库表之间相互关联是很常见的。 例如，一篇博客文章可能有多条评论，或者一个订单可能与下单的用户相关联。 `Orm` 简化了管理和处理这些关系的过程，它可以处理各种常见的关系：

- [一对一](#one-to-one)
- [一对多](#one-to-many)
- [多对多](#Many-To-Many)
- [多态关联](#polymorphic)

## 定义关系

### 一对一

一对一关系是一种非常基本的数据库关系类型。 例如，一个 `User` 模型可能与一个 `Phone` 模型相关联。

```go
type User struct {
  orm.Model
  Name  string
  Phone   *Phone
}

type Phone struct {
  orm.Model
  UserID   uint
  Name   string
}
```

使用 `Orm` 时，它会根据父模型名称自动为关系分配外键。 例如，默认情况下，`Phone` 模型被假定有一个 `UserID` 外键。 但是，如果你想改变这个约定，你可以在 `User` 模型的 `Phone` 字段中添加一个 `foreignKey` 标签。 （这也适用于其他关系。）

```go
type User struct {
  orm.Model
  Name  string
  Phone   *Phone `gorm:"foreignKey:UserName"`
}

type Phone struct {
  orm.Model
  UserName string
  Name   string
}
```

此外，使用 `Orm` 时，假定外键应该匹配父级的主键列。
这意味着 `Orm` 将在 `Phone` 记录的 `UserId` 列中搜索用户的 `ID` 列值。 如果你
希望使用除 `ID` 之外的主键值，你可以在 `User` 模型的 `Phone` 字段中添加 "Tag" 引用。 要
做到这一点，只需向 `hasOne` 方法传递第三个参数。 （其他关系设置类似。）

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

#### 定义关系的反向关联

我们可以从 `User` 模型访问 `Phone` 模型。 现在，我们需要在 `Phone` 模型上建立一个关系，
允许我们访问电话的所有者。 为此，我们可以在 `Phone` 模型中定义一个 `User` 字段。

```go
type User struct {
  orm.Model
  Name  string
}

type Phone struct {
  orm.Model
  UserID   uint
  Name   string
  User   *User
}
```

### 一对多

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child
models. For example, a blog post may have an infinite number of comments. Like all other `Orm` relationships,
one-to-many relationships are defined by defining a field on your `Orm` model:

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

Remember, `Orm` will automatically determine the proper foreign key column for the `Comment` model. By convention, Orm
will take the "hump case" name of the parent model and suffix it with `ID`. So, in this example, Orm will assume the
foreign key column on the `Comment` model is `PostID`.

### One To Many (Inverse) / Belongs To

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent
post. To define the inverse of a `One To Many` relationship, define a relationship method on the child model which calls
the `belongsTo` method:

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

## Many To Many Relationships

Many-to-many relations are slightly more complicated than `One To One` and `One To Many` relationships. An example of a
many-to-many relationship is a user that has many roles and those roles are also shared by other users in the
application. For example, a user may be assigned the role of "Author" and "Editor"; however, those roles may also be
assigned to other users as well. So, a user has many roles and a role has many users.

### Table Structure

To define this relationship, three database tables are needed: `users`, `roles`, and `role_user`. The `role_user` table
naming can be customized and it contains `user_id` and `role_id` columns. This table is used as an intermediate table
linking users and roles.

Remember, since a role can belong to many users, we cannot simply place a `user_id` column on the `roles` table. This
would mean that a role could only belong to a single user. In order to provide support for roles being assigned to
multiple users, the `role_user` table is needed. We can summarize the relationship's table structure like so:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_id - integer
  role_id - integer
```

### Model Structure

We can define a `Roles` field on `User` model:

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

### Defining The Inverse Of The Relationship

To define the inverse of the relationship, just define a `Users` field in `Role` model and append a Tag.

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

### Custom intermediate table

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

Table structure:

```
users
  id - integer
  name - string

roles
  id - integer
  name - string

role_user
  user_name - integer
  role_name - integer
```

## Polymorphic

A polymorphic relationship allows the child model to belong to more than one type of model using a single association.
For example, imagine you are building an application that allows users to share blog posts and videos. In such an
application, a `Comment` model might belong to both the `Post` and `Video` models.

### Table structure

A polymorphic relation is similar to a normal relation; however, the child model can belong to more than one type of
model using a single association. For example, a blog `Post` and a `User` may share a polymorphic relation to an `Image`
model. Using a polymorphic relation allows you to have a single table of unique images that may be associated with posts
and users. First, let's examine the table structure:

```
posts
  id - integer
  name - string

videos
  id - integer
  name - string

images
  id - integer
  url - string
  imageable_id - integer
  imageable_type - string

comments
  id - integer
  body - text
  commentable_id - integer
  commentable_type - string
```

Note the `imageable_id` and `imageable_type` columns on the `images` table. The `imageable_id` column will contain the
ID value of the post or user, while the `imageable_type` column will contain the class name of the parent model. The
`imageable_type` column is used by Orm to determine which "type" of parent model to return when accessing the
`imageable` relation. The `comments` table is similar.

### Model Structure

Next, let's examine the model definitions needed to build this relationship:

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

You can change the polymorphic value by `polymorphicValue` Tag, such as:

```go
type Post struct {
  orm.Model
  Name  string
  Image   *Image `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Querying Associations

For example, imagine a blog application in which a `User` model has many associated `Post` models:

```go
type User struct {
  orm.Model
  Name   string
  Posts  []*Post
}

type Post struct {
  orm.Model
  UserID   uint
  Name     string
}
```

### Create or Update Associations

You can use the `Select`, `Omit` methods to to control the create and update of associations. These two method cannot be
used at the same time and the associated control functions are only applicable to `Create`, `Update`, `Save`:

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

### Find Associations

```go
// Find all matching related records
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Find associations with conditions
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Append Associations

Append new associations for `Many To Many`, `One To Many`, replace current association for `One To One`,
`One To One(revers)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Replace Associations

Replace current associations with new ones:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Replace(models.Post{Name: "goravel"}, Post2)
```

### Delete Associations

Remove the relationship between source & arguments if exists, only delete the reference, won’t delete those objects from
DB, the foreign key must be NULL:

```go
facades.Orm().Query().Model(&user).Association("Posts").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Delete(Post1, Post2)
```

### Clear Associations

Remove all reference between source & association, won’t delete those associations:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Count Associations

Return the count of current associations:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Count with conditions
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Association("Posts").Count()
```

### Batch Data

```go
// Find all roles for all users
facades.Orm().Query().Model(&users).Association("Posts").Find(&posts)

// Delete User A from all user's Posts
facades.Orm().Query().Model(&users).Association("Posts").Delete(&userA)

// Get distinct count of all users' Posts
facades.Orm().Query().Model(&users).Association("Posts").Count()

// For `Append`, `Replace` with batch data, the length of the arguments needs to be equal to the data's length or else it will return an error
var users = []models.User{user1, user2, user3}

// We have 3 users, Append userA to user1's team, append userB to user2's team, append userA, userB and userC to user3's team
facades.Orm().Query().Model(&users).Association("Team").Append(&userA, &userB, &[]models.User{userA, userB, userC})

// Reset user1's team to userA，reset user2's team to userB, reset user3's team to userA, userB and userC
facades.Orm().Query().Model(&users).Association("Team").Replace(&userA, &userB, &[]models.User{userA, userB, userC})
```

## Eager Loading

Eager loading conveniences for querying multiple models, and alleviates the "N + 1" query problem. To illustrate the N +
1 query problem, consider a `Book` model that "belongs to" an `Author` model:

```go
type Author struct {
  orm.Model
  Name  string
}

type Book struct {
  orm.Model
  AuthorID   uint
  Name       string
  Author     *Author
}
```

Now, let's retrieve all books and their authors:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

To retrieve all the books in the database table along with their authors, the loop code executes a query for each book.
This means that for a collection of 25 books, the loop would run 26 queries - one for the collection of books and 25
more to get the author of each book.

However, we can simplify this process using eager loading. By using the `With` method, we can specify which
relationships need to be eagerly loaded and reduce the number of queries to just two.

```go
var books models.Book
facades.Orm().Query().With("Author").Find(&books)

for _, book := range books {
  fmt.Println(book.Author)
}
```

For this operation, only two queries will be executed - one query to retrieve all books and one query to retrieve
authors for all of the books:

```sql
select * from `books`;

select * from `authors` where `id` in (1, 2, 3, 4, 5, ...);
```

### Eager Loading Multiple Relationships

Sometimes you may need to eager load several different relationships. To do so, just call the `With` method multiple
times:

```go
var book models.Book
facades.Orm().Query().With("Author").With("Publisher").Find(&book)
```

### Nested Eager Loading

To eager load a relationship's relationships, you may use "dot" syntax. For example, let's eager load all of the book's
authors and all of the author's personal contacts:

```go
var book models.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Constraining Eager Loads

Sometimes you may wish to eager load a relationship but also specify additional query conditions for the eager loading
query. You can accomplish this as below:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author").Find(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

In this example, Orm will only eager load posts where the post's `name` column equals the word `author`.

### Lazy Eager Loading

Sometimes you may need to eager load a relationship after the parent model has already been retrieved. For example, this
may be useful if you need to dynamically decide whether to load related models:

```go
var books models.Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  if someCondition {
    err := facades.Orm().Query().Load(&book, "Author")
  }
}
```

If you need to set additional query constraints on the eager loading query, you can use the code below:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author").Find(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

To load a relationship only when it has not already been loaded, use the `LoadMissing` method:

```go
facades.Orm().Query().LoadMissing(&book, "Author")
```
