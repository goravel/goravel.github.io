# Строки

Горавель предоставляет библиотеку свободно манипулирования струнами, которая позволяет легко манипулировать строками. Fluent Strings
позволяет комбинировать несколько строковых операций через цепочку методов, где большинство методов возвращает экземпляр
из `support/str. tring`, давая вам цепь дополнительных методов. Чтобы получить окончательное значение строки после применения операций с цепочкой
, вы можете вызвать метод `String`, который возвращает лежащее в его основе значение `string`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Доступные методы

### `Of`

Метод `Of` создает новый беглый экземпляр строки из заданной строки.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### `После`

Метод «После» возвращает часть строки, которая появляется после указанного значения. Если значение является пустой строкой
или не существует в исходной строке, то возвращается полная строка.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // " Мир!"
```

### `AfterLast`

Метод `AfterLast` возвращает часть строки, которая появляется после последнего вхождения указанного значения. Если
значение является пустой строкой или не существует в исходной строке, то возвращается полная строка.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Добавить`

Метод «Добавить» добавляет указанное значение к концу строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Базовое имя`

Метод «Basename» возвращает конечный компонент имени пути, при желании удаляя указанный суффикс из имени базы
.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### «Раньше

Метод `Bore` возвращает часть строки, которая появляется перед указанным значением. Если значение является пустой строкой
или не существует в исходной строке, то возвращается полная строка.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Привет"
```

### `Досрочка`

Метод `BeforeLast` возвращает часть строки, которая появляется до последнего вхождения указанного значения. Если
значение является пустой строкой или не существует в исходной строке, то возвращается полная строка.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### `Between`

Метод «Between» возвращает часть строки между двумя заданными значениями.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Hello"
```

### `BetweenFirst`

Метод «BetweenFirst» возвращает часть строки между первым вхождением двух заданных значений.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Hello"
```

### `Камель`

Метод `Camel` преобразует строку в `camelCase`.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

Метод `CharAt` возвращает символ по заданному индексу. If the index is out of bounds, an empty string will be
returned.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `Чопэнд`

Метод 'ChopEnd' удаляет заданное значение из конца строки.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

Метод `ChopStart` удаляет заданное значение из начала строки.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### «Содержит»

Метод «Содержит» определяет, содержит ли данная строка заданное значение. Метод чувствителен к регистру. Если представлено несколько значений
, то они будут возвращены `true`, если строка содержит любые значения.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `Содержит все`

Метод «ContainsAll» определяет, содержит ли данная строка все заданные значения. Метод чувствителен к регистру.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirname`

Метод «Dirname» возвращает родительскую часть пути.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

При необходимости вы можете указать уровень каталога для обрезания из пути.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

Метод «EndsWith» определяет, заканчивается ли заданная строка заданным значением. Метод чувствителен к регистру.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Методу можно передать несколько значений, чтобы определить, заканчивается ли строка любым из значений.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Ровно`

Метод «Точно» определяет, соответствует ли данная строка заданному значению. Метод чувствителен к регистру.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Исключить`

Метод «Исключение» извлекает выдержку из строки, которая соответствует первому вхождению данного значения.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...is a beautiful morn...
```

Кроме того, вы можете использовать параметр `Omission` для изменения строки, используемой для указания выдержки.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a beautiful morning").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)is a beautiful morn(...)"
```

### `Explode`

Метод `Explode` разбивает строку на массив строк, используя заданный разделитель.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Hello", "World"}
```

### `Закончить`

Метод `Finish` гарантирует, что данная строка заканчивается с заданным значением. Если строка уже заканчивается со значением, то
не будет добавлено снова.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Заголовк`

Метод `Headline` преобразует строку в заголовки.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `Я`

Метод «Is» определяет, соответствует ли данная строка данному шаблону. Метод чувствителен к регистру.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

Метод «IsEmpty» определяет пустую ли указанную строку.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

Метод `IsNotEmpty` определяет, не пустая ли данная строка.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

Метод `IsAscii` определяет, содержит ли данная строка только ASCII символы.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("<unk> <unk> ").IsAscii() // ложь
```

### `IsSlice`

Метод «IsSlice» определяет является ли данная строка ломтиком.

```go
импорт "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

Метод `IsMap` определяет является ли данная строка картой.

```go
импорт "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

Метод «IsUlid» определяет, является ли данная строка ULID.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z6Z1Z6Z6Z6Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

Метод «IsUuid» определяет является ли данная строка UUID.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

Метод `Kebab` преобразует строку в `kebab-case`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

Метод «LcFirst» преобразует первый символ строки в строчные буквы.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### «Длиная»

Метод «Длина» возвращает длину строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Лимит`

Метод «Ограничение» урезает строку до заданной длины.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Это красивый morning").Limit(7).String() // "This is..."
```

При необходимости вы можете предоставить второй аргумент для изменения строки, которая используется для обозначения усечения.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("Это красивый утр").Limit(7, " (****)").String() // "Это (****)"
```

### «Нижнее»

Метод «Нижняя строка» преобразует строку в строчные буквы.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

Метод «LTrim» обрезает левую сторону строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### «Маски»

Метод `Mask` замаскирует строку заданным символом.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri**********"
```

If needed, you may provide negative number to mask method which instruct the method to begin masking from the end of the
string.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris********"
```

### `Совпадение`

Метод «Совпадает» определяет, соответствует ли данная строка данному регулярному выражению.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Это (test) string").Match(`\([^)]+\)`).String() // (test)
```

### `Совпадение`

Метод «Соответствие» определяет, соответствует ли данная строка всем заданным регулярным выражениям.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

Метод «IsMatch» определяет, соответствует ли данная строка (любой из них) данному регулярному выражению.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // true
```

### `NewLine`

Метод `NewLine` добавляет к строке символ новой строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

В «PadBoth» используется метод «PadBoth» с обеих сторон строки.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___"
```

### `PadLeft`

Поле `PadLeft` отображает левую сторону строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

В поле `PadRight` используется метод `PadRight` с правой стороны строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### `Pipe`

Метод `Pipe` позволяет преобразовать строку, используя замыкание.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Предстояние`

Метод `Prepend` добавляет заданное значение строке.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Удалить`

Метод `Удалить` удаляет заданное значение из строки.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Hello "

str.Of("Hello World").Remove("World", "Hello").String() // " "
```

### `Повторить`

Метод «повторить» повторяет строку заданное количество раз.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### «Заменить»

Метод «Заменить» заменяет заданное значение в строке.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").Заменить("Мир", "Krishan").String() // "Hello Krishan"
```

По умолчанию метод «Заменить» чувствителен к регистру. Если вы хотите, чтобы метод был нечувствительным к регистру, вы можете передать в качестве третьего аргумента
`false`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("world", "Krishan", false).String() // "Hello Krishan"
```

### `Заменить`

The `ReplaceEnd` method replaces the last occurrence of the given value in the string only if it is at the end of the
string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World" // "Hello World"
```

### `ЗаменитьFirst`

Метод «Заменить первый» заменяет первое вхождение данного значения в строке.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("Мир", "Goravel").String() // "Hello Goravel"
```

### `ЗаменитьLast`

Метод `ReplaceLast` заменяет последнее вхождение заданного значения в строку.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Hello Goravel" // "Hello Goravel"
```

### `Заменные Матчи`

Метод `ReplaceMatches` заменяет совпадения данного регулярного выражения в строке.

```go
import "github.com/goravel/framework/support/str"

str.Of("Привет, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Hello, Krishan!"
```

### `ЗаменитьStart`

Метод `ReplaceStart` заменяет первое вхождение заданного значения в строке только в том случае, если оно находится в начале
строки.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World" // "Hello World"
```

### `RTrim`

Метод 'RTrim' обрезает правую сторону строки.

```go
импортировать "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### `Змея`

Метод `Snake` преобразует строку в `snake_case`.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### `Сплит`

Метод «Split» разбивает строку на массив строк, используя заданный разделитель.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

Метод `Squish` заменяет последовательные пробелы пробелами.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### «Начало»

Метод `Start` добавляет отдельный экземпляр заданного значения в начало строки, если он еще не запускает
со значением.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `НачинаетС`

Метод «StartsWith» определяет, начинается ли данная строка с заданным значением (любыми). Метод чувствителен к регистру.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `Строка`

Метод `String` возвращает строку.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Студент`

Метод `Studly` преобразует строку в `StudlyCase`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

Метод `Substr` возвращает часть строки, начиная с заданного индекса и продолжая для заданной длины.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### `Swap`

Метод «Swap» изменяет несколько значений в строке.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang is awesome").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### «Тап»

Метод «Tap» передает строку в указанный замыкание и возвращает строку.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### «Тест»

Метод «Тест» определяет, соответствует ли данная строка данному регулярному выражению.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Привет, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

Метод `Title` преобразует строку в `Title Case`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### «Обрезать»

Метод «Обрезать» обрезает строку.

```go
импорт "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework" // "framework"
```

### `UcFirst`

Метод «UcFirst» преобразует первый символ строки в верхний регистр.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

Метод «UcSplit» разделяет строку на массив строк, используя заглавные символы.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Unless`

Метод «Unless» передает строку в заданное закрытие и возвращает строку, если данное условие является «false».

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### «Верхний»

Метод `Upper` преобразует строку в верхние буквы.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### «Когда»

Метод `When` передает строку в заданный замыкание и возвращает строку, если данное условие является `true`.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

При необходимости вы можете предоставить третий аргумент методу `Когда`, который является закрытием, который будет выполняться, когда условие
является `false`.

### `Когда-нибудь содержит`

The `WhenContains` method passes the string to the given closure and returns the string if the given string contains the
given value.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

При необходимости вы можете предоставить третий аргумент методу `WhenContains`, который представляет собой замыкание, которое будет выполнено
если строка не содержит заданного значения.

### `WhenContainsAll`

The `WhenContainsAll` method passes the string to the given closure and returns the string if the given string contains
all of the given values.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

При необходимости вы можете предоставить третий аргумент методу `WhenContainsAll`, который представляет собой замыкание, которое будет
выполнено, если строка не содержит всех заданных значений.

### `Когда-то осталось`

Метод `WhenEmpty` передает строку в заданный замыкание и возвращает строку, если заданная строка пуста.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

Метод `WhenIsAscii` передает строку в заданный замыкание и возвращает строку, если заданная строка содержит только символы
ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("<unk> <unk> ").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "<unk> <unk> "
```

### `Не пусто`

Метод `WhenNotEmpty` передает строку в заданный замыкание и возвращает строку, если заданная строка не
пуста.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsWith`

The `WhenStartsWith` method passes the string to the given closure and returns the string if the given string starts
with the given value.

```go
импортируйте "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `По окончанию`

Метод `WhenEndsWith` передает строку в заданный замыкание и возвращает строку, если заданная строка заканчивается с
заданным значением.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `Откровенное`

Метод `WhenExactly` передает строку в заданный замыкание и возвращает строку, если заданная строка ровно
равным заданному значению.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `Не соответствует действительности`

Метод `WhenNotExactly` передает строку в заданный замыкание и возвращает строку, если заданная строка не
ровно равна заданному значению.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `Когда`

Метод `WhenIs` передает строку к заданному закрытию и возвращает строку, если заданная строка соответствует данному шаблону
.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

Метод `WhenIsUlid` передает строку в заданный замыкание и возвращает строку, если заданная строка является ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z6Z1Z6Z6Z6Z1Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6"
```

### `WhenIsUuid`

Метод `WhenIsUuid` передает строку в заданный замыкание и возвращает строку, если заданная строка является UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### \`Когда-то тест

Метод `WhenTest` передает строку к заданному закрытию и возвращает строку, если заданная строка соответствует
данному регулярному выражению.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" is awesome")
}).String() // "goravel framework is awesome"
```

### `WordCount`

Метод `WordCount` возвращает количество слов в строке.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Здравствуйте, Мир!").WordCount() // 2
```

### `Words`

Метод `Words` ограничивает количество слов в строке. При необходимости вы можете привести второй аргумент для изменения
строки, используемой для обозначения усечения.

```go
импорт "github.com/goravel/framework/support/str"

str.Of("Здравствуйте, Мир!").Words(1) // "Hello..."

str.Of("Hello, World!").Words(1, " (****)") // "Hello (****)"
```
