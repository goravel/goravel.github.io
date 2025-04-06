# Отношения

Обычно для подключения таблиц базы данных. For instance, a blog post may have many comments, or an order may
be linked to the user who placed it. `Orm` simplifies managing and dealing with such relationships, and it can handle
various common relationships:

- [Один к одному](#one-to-one)
- [Один для многих](#one-to-many)
- [Много для многих](#Many-To-Many)
- [Polymorphic](#polymorphic)

## Определение связей

### Один к одному

Отношение к одному – это очень базовый тип отношений с базой данных. Например, модель `User` может быть ассоциирована
с одной моделью `Phone`.

```go
тип User struct {
  orm. odel
  Имя строки
  Телефон *Телефон
}

тип Телефон struct {
  orm. odel
  UserID uint
  Строка
}
```

При использовании `Orm` он автоматически присваивает внешний ключ к отношению, основанному на названии родительской модели. For
instance, the `Phone` model is assumed to have a `UserID` foreign key by default. However, if you wish to change this
convention, you can add a `foreignKey` tag to the `Phone` field in `User` model. (This also applies to other
relationships.)

```go
тип User struct {
  orm. odel
  Имя строки
  Телефон *Телефон `gorm:"foreignKey:UserName"`
}

тип Телефон struct {
  orm. odel
  Строка Имя пользователя
  Строка Имя
}
```

Кроме того, при использовании "Orm" предполагается, что внешний ключ должен соответствовать первичной ключевой колонке родителя.
Это означает, что в колонке «Идентификатор пользователя» в столбце «UserId» записи «Телефон». If you
wish to use a primary key value other than `ID`, you can add a "Tag" reference to the `Phone` field in `User` model. To
do this, simply pass a third argument to the `hasOne` method. (Другие настройки отношений аналогичные)

```go
тип User struct {
  orm. odel
  Имя строки
  Телефон: `gorm:"Другой ключ:UserName; eferences:name"`
}

тип Телефон struct {
  orm. odel
  Строка Имя пользователя
  Строка Имя
}
```

#### Определение обратного отношения

Мы можем получить доступ к модели «Телефон» из нашей модели «Пользователь». Теперь нам нужно установить связь с моделью «Телефон», которая
позволяет нам получить доступ к владельцу телефона. Для этого мы можем определить поле `User` в модели `Phone`.

```go
type User struct {
  orm.Model
  Name string
}

type Phone struct {
  orm. odel
  UserID uint
  Строка имени
  Пользователь
}
```

### Один для многих

A one-to-many relationship is used to define relationships where a single model is the parent to one or more child
models. Например, запись в блоге может иметь бесконечное количество комментариев. Подобно всем другим отношениям `Orm`,
отношения определяются определением поля в вашей модели `Orm`:

```go
тип Post struct {
  orm. odel
  Строка имени
  Комментарии []*Комментарий
}

тип Комментарий struct {
  orm. odel
  PostID uint
  Строка
}
```

Помните, что `Orm` автоматически определяет подходящую внешнюю колонку ключа для модели `Comment`. По традиции, Orm
примет имя родительской модели «hump case» и суффикс его с `ID`. Таким образом, в данном примере Orm будет предполагать, что столбец внешнего ключа
в модели `PostID`.

### Один для многих (инвертирование) / относится к

Now that we can access all of a post's comments, let's define a relationship to allow a comment to access its parent
post. To define the inverse of a `One To Many` relationship, define a relationship method on the child model which calls
the `belongsTo` method:

```go
тип Post struct {
  orm. odel
  Строка имени
  Комментарии []*Комментарий
}

тип Комментарий struct {
  orm. odel
  PostID uint
  Строка названия
  Пост
}
```

## Многие к многим отношениям

Отношения во многих отношениях немного сложнее, чем отношения «К одному» и «К многим». Примером отношений
для многих является пользователь, имеющий много ролей, и эти роли также используются другими пользователями в приложении
. For example, a user may be assigned the role of "Author" and "Editor"; however, those roles may also be
assigned to other users as well. Таким образом, у пользователя много ролей, и роль имеет много пользователей.

### Структура таблиц

Для определения этих связей необходимы три таблицы баз данных: `users`, `roles` и `role_user`. The `role_user` table
naming can be customized and it contains `user_id` and `role_id` columns. Эта таблица используется в качестве промежуточной таблицы
с указанием пользователей и ролей.

Помните, так как роль может принадлежать многим пользователям, мы не можем просто поместить столбец `user_id` в таблице `roles`. Этот
означает, что роль может принадлежать только одному пользователю. Чтобы предоставить поддержку назначаемых ролей нескольким пользователям
требуется таблица `role_user`. Мы можем обобщить табличную структуру взаимоотношений следующим образом:

```
пользователи
  id - целое число
  имя - строка

роли
  id - целое число
  - строка

role_user
  user_id - целое число
  role_id - целое число
```

### Структура модели

Мы можем определить поле «Роли» в модели «Пользователь»:

```go
тип User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Имя строки
}
```

### Определение обратного отношения

Чтобы определить обратную связь, просто определите поле `Users` в модели `Role` и добавьте тег.

```go
тип User struct {
  orm. odel
  Name string
  Roles []*Role `gorm:"many2many:role_user"`
}

type Role struct {
  orm. odel
  Имя строки
  Пользователи []*Пользователь `gorm:"many2many:role_user"`
}
```

### Пользовательская промежуточная таблица

In general, the intermediate table foreign key is named by the "snake case" of the parent model name, you can override
them by `joinForeignKey`, `joinReferences`:

```go
тип User struct {
  orm. odel
  Имя строки
  Роли []*Роль `gorm:"many2many:role_user; oinForeignKey:UserName;joinReferences:RoleName"`
}

тип Role struct {
  orm. odel
  Имя строки
}
```

Структура таблиц:

```
пользователи
  id - целое число
  имя - строка

роли
  id - целое число
  - строка

role_user
  user_name - целое число
  роль_имя - целое число
```

## Полиморфический

Полиморфическая связь позволяет дочерней модели принадлежать более чем одному типу модели, использующей одну ассоциацию.
Например, представьте, что вы строите приложение, которое позволяет пользователям делиться записями в блоге и видео. In such an
application, a `Comment` model might belong to both the `Post` and `Video` models.

### Структура таблицы

Полиморфическая связь схожа с обычной зависимостью; однако, детская модель может принадлежать более чем одному типу модели
с использованием одной ассоциации. Например, блог `Post` и `User` могут иметь полиморфическое отношение к модели `Image`
. Использование полиморфического отношения позволяет иметь одну таблицу уникальных изображений, которые могут быть связаны с постами
и пользователями. Сначала давайте рассмотрим структуру таблицы:

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
  body - текст
  commentable_id - integer
  commentable_type - string
```

Обратите внимание на столбцы `imageable_id` и `imageable_type` в таблице `images`. Столбец `imageable_id` будет содержать
ID значение записи или пользователя, в то время как столбец `imageable_type` будет содержать имя класса родительской модели. Столбец
`imageable_type` используется Orm для определения типа "type" родительской модели для возврата при доступе к связи
`imageable`. Таблица `комментариев` аналогична.

### Структура модели

Далее давайте рассмотрим определения моделей, необходимые для построения этой зависимости:

```go
тип Post struct {
  orm. odel
  Имя строки
  Изображение *`gorm:"polymorphic:Imageable"`
  Комментарии []*Комментарий `gorm:"polymorphic:Commentable"`
}

type Video struct {
  orm. odel
  Строка имени
  Изображение `gorm:"polymorphic:Imageable"`
  Комментарии []*Комментарий `gorm:"polymorphic:Commentable"`
}

type Image struct {
  orm. odel
  Строка имени
  ImageableID uint
  ImageableType строка
}

type Comment struct {
  orm. odel
  Имя строки
  CommentableID uint
  CommentableType string
}
```

Вы можете изменить полиморфическое значение по тегу `polymorphicValue`, как:

```go
type Post struct {
  orm.Model
  Name string
  Image `gorm:"polymorphic:Imageable;polymorphicValue:master"`
}
```

## Запрос ассоциаций

Например, представьте себе блог приложение, в котором у модели `User` есть много связанных моделей `Post`:

```go
тип User struct {
  orm. odel
  Строка имени
  Посты []*Пост
}

тип Пост struct {
  orm. odel
  UserID uint
  Строка
}
```

### Создать или обновить ассоциации

Вы можете использовать методы `Select`, `Omit`, чтобы управлять созданием и обновлением ассоциаций. Эти два метода не могут быть
использованы одновременно и связанные функции управления применимы только к `Создать`, `Обновить`, `Сохранить`:

```go
user := models.User{Name: "user", Posts: []*models.Post{{Name: "post"}}}

// Создание всех дочерних ассоциаций при создании User
фасадов. rm().Query().Select(orm.Associations).Create(&user)

// Создание сообщения только при создании пользователя. Примечание: Если вы не используете `orm.Associations`, но настраивайте конкретные детские ассоциации по отдельности, все поля в родительской модели также должны быть перечислены в данный момент.
facades.Orm().Query().Select("Name", "Posts"). reate(&user)

// При создании Пользователя, игнорировать запись, но создать все другие дочерние ассоциации
facades.Orm().Query(). mit("Posts").Create(&user)

// При создании User, игнорировать поле имя, но создать все дочерние ассоциации
фасадов. rm().Query().Omit("Имя").Create(&user)

// При создании User, игнорирование поля имени пользователя и всех дочерних ассоциаций
facades.Orm().Query().Omit("Имя", orm.Associations).Create(&user)
```

### Найти ассоциации

```go
// Find all matching related records
var posts []models.Post
facades.Orm().Query().Model(&user).Association("Posts").Find(&posts)

// Find associations with conditions
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Order("id desc").Association("Posts").Find(&posts)
```

### Добавить ассоциации

Добавить новые ассоциации для `Многие для многих`, `Ещё для многих`, замените текущую ассоциацию для `Ещё для одного`,
`Одна к одному(ревер)`:

```go
facades.Orm().Query().Model(&user).Association("Posts").Append([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Append(&models.Post{Name: "goravel"})
```

### Заменить ассоциации

Заменить нынешние ассоциации новыми ассоциациями:

```go
facades.Orm().Query().Model(&user).Association("Posts").Replace([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Posts").Заменить(models.Post{Name: "goravel"}, Post2)
```

### Удалить ассоциации

Удалить связь между источником и аргументами, если таковые существуют, только удалить ссылку, не будет удалять эти объекты из
DB, внешний ключ должен быть NULL:

```go
facades.Orm().Query().Model(&user).Association("Сообщения").Delete([]*models.Post{Post1, Post2})

facades.Orm().Query().Model(&user).Association("Сообщения").Delete(Post1, Post2)
```

### Очистить ассоциации

Удалить все ссылки между источниками и ассоциациями, не удалять эти ассоциации:

```go
facades.Orm().Query().Model(&user).Association("Posts").Clear()
```

### Кол-во ассоциаций

Возвращает количество текущих ассоциаций:

```go
facades.Orm().Query().Model(&user).Association("Posts").Count()

// Подсчет условий
facades.Orm().Query().Model(&user).Where("name = ?", "goravel").Association("Posts").Count()
```

### Пакетные данные

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

## Загрузка углов

Удобство загрузки файлов для запроса нескольких моделей и смягчения проблемы запроса "N + 1". Чтобы проиллюстрировать N +
1 задачу запроса, рассмотрите модель `Book`, к которой принадлежит модель `Author`:

```go
type Author struct {
  orm.Model
  Name string
}

type Book struct {
  orm. odel
  AuthorID uint
  Строка имени
  Автор *Author
}
```

Теперь давайте получим все книги и их авторы:

```go
Модели библиотек var. Book
facades.Orm().Query().Find(&books)

for _, book := range books {
  var author models.Author
  facades.Orm().Query().Find(&author, book.AuthorID)
}
```

Чтобы получить все книги в таблице базы данных вместе с их авторами, код цикла выполняет запрос для каждой книги.
This means that for a collection of 25 books, the loop would run 26 queries - one for the collection of books and 25
more to get the author of each book.

Тем не менее, мы можем упростить этот процесс с помощью eager загрузки. Используя метод `Взять`, мы можем указать, какие
отношения должны быть с трудом загружены, и уменьшить количество запросов до двух.

```go
модели вар книг.Book
facades.Orm().Query().With("Author").Find(&books)

for _, book := range books {
  fmt.Println(book.Author)
}
```

For this operation, only two queries will be executed - one query to retrieve all books and one query to retrieve
authors for all of the books:

```sql
выберите * из `books`;

выберите * из `authors` где `id` в (1, 2, 3, 4, 5, ...);
```

### Загрузка нескольких отношений

Иногда вам может потребоваться перегрузить несколько различных отношений. Для этого просто позвоните в метод `With` несколько
раз:

```go
модели варя.Book
facades.Orm().Query().With("Author").Снять("Издатель").Find(&book)
```

### Вложенная загрузка углов

Для того чтобы загрузить отношения, вы можете использовать синтаксис "dot". For example, let's eager load all of the book's
authors and all of the author's personal contacts:

```go
модели варя.Book
facades.Orm().Query().With("Author.Contacts").Find(&book)
```

### Ограничительные нагрузки

Sometimes you may wish to eager load a relationship but also specify additional query conditions for the eager loading
query. Вы можете сделать это следующим образом:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().With("Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().With("Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

В этом примере Orm будет только загружать записи, где столбец `name` записи равен слову `author`.

### Лазурная загрузка

Иногда вам может потребоваться загрузить связь после того, как родительская модель уже была получена. Например, этот
может быть полезен, если вам нужно динамически решать, загружать ли связанные модели:

```go
модели вар книг.Book
фасадов.Orm().Query(). ind(&books)

for _, book := range books {
  if someCondition {
    err := facades. rm().Query().Load(&book, "Author")
  }
}
```

Если вам нужно установить дополнительные ограничения по запросу на загрузку запроса, вы можете использовать код ниже:

```go
import "github.com/goravel/framework/contracts/database/orm"

var book models.Book
facades.Orm().Query().Load(&book, "Author", "name = ?", "author"). ind(&book)

facades.Orm().Query().Load(&book, "Author", func(query orm.Query) orm.Query {
  return query.Where("name = ?", "author")
}).Find(&book)
```

Чтобы загрузить связь, только когда она еще не была загружена, используйте метод «LoadMissing»:

```go
facades.Orm().Query().LoadMissing(&book, "Author")
```
