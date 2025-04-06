# Frases

Goravel fornece uma biblioteca de manipulação de strings fluente que permite que você manipule facilmente as strings. Textos fluentes
permite que você combine várias operações de seqüência de caracteres através de encadeamento de métodos, onde a maioria dos métodos retorna uma instância
de `suporte/str. tentando`, permitindo que você colete métodos adicionais. Para obter o valor final da string após aplicar as operações
encadeadas, você pode chamar o método `String`, que retorna o valor subjacente da `string`.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().Lower().UpperFirst().String() // "Goravel"
```

## Métodos disponíveis

### `De`

O método `Of` cria uma nova instância fluente de string a partir de uma determinada string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel")
```

### Depois

O método `após` retorna a porção de uma string que aparece depois de um valor especificado. Se o valor for uma string vazia
ou não existir dentro da string original, a string completa será retornada.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").After("Hello").String() // " World!"
```

### `AfterLast`

O método `AfterLast` retorna a porção de uma cadeia que aparece após a última ocorrência de um valor especificado. Se
o valor é uma string vazia ou não existe dentro da string original, a string completa é retornada.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").AfterLast(".").String() // "dev"
```

### `Anexo`

O método `Append` anexa o valor especificado ao final da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").Append(" Han").String() // "Bowen Han"
```

### `Basename`

O método `Basename` retorna o componente de nome no final de um caminho, opcionalmente removendo um sufixo especificado do nome
base.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Basename().String() // "str"

str.Of("framework/support/str.go").Basename(".go").String() // "str"
```

### `Antes`

O método `Before` retorna a porção de uma string que aparece antes de um valor especificado. Se o valor for uma string
vazia ou não existir dentro da string original, a string completa será retornada.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World!").Before("World").String() // "Olá "
```

### `AntesLast`

O método `BeforeLast` retorna a porção de uma cadeia que aparece antes da última ocorrência de um valor especificado. Se
o valor é uma string vazia ou não existe dentro da string original, a string completa é retornada.

```go
import "github.com/goravel/framework/support/str"

str.Of("docs.goravel.dev").BeforeLast(".").String() // "docs.goravel"
```

### Between

O método `Between` retorna a porção de uma string entre dois valores dados.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] World!").Between("[", "]").String() // "Olá"
```

### `BetweenFirst`

O método `BetweenFirst` retorna a porção de uma string entre a primeira ocorrência de dois valores dados.

```go
import "github.com/goravel/framework/support/str"

str.Of("[Hello] [World]!").BetweenFirst("[", "]").String() // "Olá"
```

### `Camel`

O método `Camel` converte a string para `camelCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello_world").Camel().String() // "helloWorld"
```

### `CharAt`

O método `CharAt` retorna o caractere no índice dado. Se o índice estiver fora dos limites, uma string vazia será
retornada.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").CharAt(1) // "o"
```

### `ChopEnd`

O método `ChopEnd` remove o(s) valor(es) indicado(s) do final da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.com").ChopEnd(".dev", ".com").String() // https://goravel
```

### `ChopStart`

O método `ChopStart` remove o(s) valor(es) dado(s) do início da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("https://goravel.dev").ChopStart("http://", "https://").String() // goravel.dev
```

### `Contém`

O método `Contains` determina se a string dada contém o valor dado. O método diferencia maiúsculas de minúsculas. Se vários valores
forem fornecidos, eles retornarão `true` se a string contiver algum dos valores.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Contains("Gor") // true

str.Of("Hello World").Contains("Gor", "Hello") // true
```

### `ContémTudo`

O método 'ContainsAll' determina se a string dada contém todos os valores fornecidos. O método diferencia maiúsculas de minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ContainsAll("Hello", "World") // true

str.Of("Hello World").ContainsAll("Hello", "Gor") // false
```

### `Dirname`

O método `Dirname` retorna a parte pai de um caminho.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname().String() // "framework/support"
```

Opcionalmente, você pode fornecer o nível do diretório para cortar a partir do caminho.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework/support/str").Dirname(2).String() // "framework"
```

### `EndsWith`

O método 'EndsWith' determina se a string determinada termina com o valor dado. O método diferencia maiúsculas de minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel") // true
```

Você pode passar vários valores para o método para determinar se a string termina com qualquer um dos valores.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").EndsWith("vel", "lie") // true
```

### `Exatamente`

O método `Exactly` determina se a string dada é exatamente igual ao valor dado. O método diferencia maiúsculas de minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Exactly("Goravel") // true
```

### `Except`

O método `Except` extrai um trecho da string que corresponde à primeira ocorrência do valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Esta é uma bela manhã").
 Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
    }).String() // "...é uma bela morada...
```

Além disso, você pode usar a opção `Omission` para alterar a string usada para indicar o resumo.

```go
import "github.com/goravel/framework/support/str"

str.Of("Esta é uma bela manhã").
    Excerpt("beautiful", str.ExcerptOption{
        Radius: 5,
        Omission: "(...)"
    }).String() // "(...)é uma linda morena(...)"
```

### Explodir\`

O método `Explode` divide a string em uma matriz de strings usando o delimitador dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Explode(" ") // []string{"Hello", "World"}
```

### `Terminar`

O método `Finish` garante que a string determinada termine com o valor dado. Se a seqüência de caracteres já terminar com o valor,
ele não será adicionado novamente.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Finish("/").String() // "framework/"

str.Of("framework/").Finish("/").String() // "framework/"
```

### `Headline`

O método `Headline` converte a string em um título.

```go
import "github.com/goravel/framework/support/str"

str.Of("bowen_han").Headline().String() // "Bowen Han"

str.Of("HelloWorld").Headline().String() // "Hello World"
```

### `É`

O método `Is` determina se a string dada corresponde ao padrão indicado. O método diferencia maiúsculas de minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo123").Is("bar*", "baz*", "foo*") // true
```

### `IsEmpty`

O método `IsEmpty` determina se a string informada está vazia.

```go
import "github.com/goravel/framework/support/str"

str.Of("").IsEmpty() // true
```

### `IsNotEmpty`

O método `IsNotEmpty` determina se a cadeia informada não está vazia.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsNotEmpty() // true
```

### `IsAscii`

O método `IsAscii` determina se a string fornecida contém apenas caracteres ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").IsAscii() // true

str.Of("├").IsAscii() // false
```

### `IsSlice`

O método `IsSlice` determina se a string dada é uma fatia.

```go
import "github.com/goravel/framework/support/str"

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsSlice() // true

str.Of(`{"name": "John"}`).IsSlice() // false
```

### `IsMap`

O método `IsMap` determina se a cadeia informada é um mapa.

```go
import "github.com/goravel/framework/support/str"

str.Of(`{"name": "John"}`).IsMap() // true

str.Of(`[{"name": "John"}, {"name": "Alice"}]`).IsMap() // false
```

### `IsUlid`

O método `IsUlid` determina se a cadeia informada é ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6").IsUlid() // true

str.Of("krishan").IsUlid() // false
```

### `IsUuid`

O método `IsUuid` determina se a string dada é um UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").IsUuid() // true

str.Of("krishan").IsUuid() // false
```

### `Kebab`

O método `Kebab` converte a string para `kebab-case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Kebab().String() // "goravel-framework"
```

### `LcFirst`

O método `LcFirst` converte o primeiro caractere da string em minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel Framework").LcFirst().String() // "goravel Framework"
```

### comprimento\`

O método `comprimento` retorna o comprimento da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Length() // 7
```

### `Limitar`

O método `Limit` trunca a string para o comprimento fornecido.

```go
import "github.com/goravel/framework/support/str"

str.Of("Esta é uma bela manhã").Limit(7).String() // "Isto é..."
```

Opcionalmente, você pode fornecer o segundo argumento para alterar a string usada para indicar a truncação.

```go
import "github.com/goravel/framework/support/str"

str.Of("Esta é uma bela manhã").Limit(7, " (**)").String() // "This is (**)"
```

### `Baixo`

O método `Baixo` converte a string em minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("GORAVEL").Lower().String() // "goravel"
```

### `LTrim`

O método `LTrim` corta o lado esquerdo da string.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").LTrim().String() // "Goravel "

str.Of("/framework/").LTrim("/").String() // "framework/"
```

### Máscara

O método `Mask` mascara a string com o caractere de máscara fornecido.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", 3).String() // "kri************"
```

Se necessário, você pode fornecer um número negativo para o método de máscara que instrui o método para começar a máscara do final da sequência de caracteres
.

```go
import "github.com/goravel/framework/support/str"

str.Of("krishan@email.com").Mask("*", -13, 3).String() // "kris***@email.com"

str.Of("krishan@email.com").Mask("*", -13).String() // "kris**********" **"
```

### `Correspondência`

O método `Match` determina se a string dada corresponde à expressão regular fornecida.

```go
import "github.com/goravel/framework/support/str"

str.Of("This is a (test) string").Match(`\([^)]+\)`).String() // (test)
```

### `MatchAll`

O método `MatchAll` determina se o texto fornecido corresponde a todas as expressões regulares fornecidas.

```go
import "github.com/goravel/framework/support/str"

str.Of("abc123def456def").MatchAll(`\d+`) // []string{"123", "456"}
```

### `IsMatch`

O método `IsMatch` determina se a string dada corresponde (qualquer um) à expressão regular dada.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").IsMatch(`(?i)goravel`, `goravel!(.*)`) // verdadeiro
```

### `NewLine`

O método `NewLine` anexa um caractere de nova linha à string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").NewLine(2).Append("Framework").String() // "Goravel\n\nFramework"
```

### `PadBoth`

O método `PadBoth` olha ambos os lados da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadBoth(10, "_").String() // "__Hello___
```

### `PadEsquerda`

O método `PadLeft` bloqueia o lado esquerdo da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadLeft(10, "_").String() // "_____Hello"
```

### `PadRight`

O método `PadRight` vigia o lado direito da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello").PadRight(10, "_").String() // "Hello_____"
```

### Tubulação\`

O método `Pipe` permite que você transforme a string usando um fechamento específico.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Pipe(func(s string) string {
    return s + " Framework"
}).String() // "Goravel Framework"
```

### `Prependente`

O método `Prepend` prepara o valor dado à string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Framework").Prepend("Goravel ").String() // "Goravel Framework"
```

### `Remover`

O método 'Remover' remove o(s) valor(es) indicado(s) da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Remove("World").String() // "Olá "

str.Of("Hello World").Remove("World", "Hello").String() // "
```

### `Repetir`

O método `Repetir` repete a string um determinado número de vezes.

```go
import "github.com/goravel/framework/support/str"

str.Of("a").Repeat(2).String() // "aa"
```

### `Substituir`

O método 'Substituir' substitui o valor dado na string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("World", "Krishan").String() // "Hello Krishan"
```

Por padrão, o método 'Substituir' diferencia maiúsculas de minúsculas. Se você quiser que o método insensível a maiúsculas de minúsculas, você pode passar
`false` como o terceiro argumento.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Replace("world", "Krishan", false).String() // "Hello Krishan"
```

### `SubstituirFim`

O método `ReplaceEnd` substitui a última ocorrência do valor dado na string somente se estiver no final da string
.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceEnd("World", "Goravel").String() // "Hello Goravel"

str.Of("Hello World").ReplaceEnd("Hello", "Goravel").String() // "Hello World"
```

### `SubstituirPrimeiro`

O método `ReplaceFirst` substitui a primeira ocorrência do valor dado na string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceFirst("World", "Goravel").String() // "Hello Goravel"
```

### `SubstituirLast`

O método `SubstituirLast` substitui a última ocorrência do valor dado na string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceLast("World", "Goravel").String() // "Hello Goravel"
```

### `Partidas substituídas`

O método `ReplaceMatches` substitui as partidas da expressão regular dada na string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").ReplaceMatches(`goravel!(.*)`, "Krishan") // "Hello, Kris!"
```

### `SubstituirInicio`

O método `ReplaceStart` substitui a primeira ocorrência do valor dado na string somente se estiver no início de
da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").ReplaceStart("Hello", "Goravel").String() // "Goravel World"

str.Of("Hello World").ReplaceStart("World", "Goravel").String() // "Hello World"
```

### `RTrim`

O método `RTrim` corta o lado direito da string.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").RTrim().String() // " Goravel"

str.Of("/framework/").RTrim("/").String() // "/framework"
```

### Cobra

O método `Snake` converte a string em `snake_case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").Snake().String() // "goravel_framework"
```

### Dividir

O método `Split` divide a string em uma matriz de strings usando o delimitador dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Split(" ") // []string{"Hello", "World"}
```

### `Squish`

O método `Squish` substitui caracteres de espaços em branco consecutivos por um único espaço.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello World").Squish().String() // "Hello World"
```

### `Iniciar`

O método `Iniciar` adiciona uma única instância do valor dado ao início da string se ele ainda não iniciar
com o valor.

```go
import "github.com/goravel/framework/support/str"

str.Of("framework").Start("/").String() // "/framework"

str.Of("/framework").Start("/").String() // "/framework"
```

### `Começa Com`

O método `StartsWith` determina se a sequência determinada começa com (qualquer) valor indicado(s). O método diferencia maiúsculas de minúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").StartsWith("Gor") // true

str.Of("Hello World").StartsWith("Gor", "Hello") // true
```

### `String`

O método `String` retorna a string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").String() // "Goravel"
```

### `Aluno`

O método `aluno` converte a seqüência de caracteres para `StudlyCase`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel_framework").Studly().String() // "GoravelFramework"
```

### `Substr`

O método `Substr` retorna a parte da string começando no índice dado e continuando para o comprimento dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Substr(1, 3) // "ora"
```

### Alternar

O método `Swap` troca vários valores na string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Golang é incrível").Swap(map[string]string{
  "Golang": "Go",
  "awesome": "excellent",
 }).String() // "Go is excellent"
```

### Toque

O método `Tap` passa a string para o fechamento dado e retorna a string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Tap(func(s string) {
    fmt.Println(s)
}).String() // "Goravel"
```

### `Teste`

O método `Test` determina se a string dada corresponde à expressão regular fornecida.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, Goravel!").Test(`goravel!(.*)`) // true
```

### `Title`

O método `Title` converte a string para `Title Case`.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").Title().String() // "Goravel Framework"
```

### Cortando\`

O método `recortar` corta a string.

```go
import "github.com/goravel/framework/support/str"

str.Of(" Goravel ").Trim().String() // "Goravel"

str.Of("/framework/").Trim("/").String() // "framework"
```

### `UcFirst`

O método `UcFirst` converte o primeiro caractere da string em maiúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").UcFirst().String() // "Goravel framework"
```

### `UcSplit`

O método `UcSplit` divide a string em uma matriz de strings usando caracteres maiúsculos.

```go
import "github.com/goravel/framework/support/str"

str.Of("GoravelFramework").UcSplit() // []string{"Goravel", "Framework"}
```

### `Sem Menos`

O método `Unless` passa a string para o fechamento dado e retorna a string se a condição fornecida for `false`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").Unless(func(s *String) bool {
        return false
    }, func(s *String) *String {
        return Of("Fallback Applied")
    }).String() // "Fallback Applied"
```

### `Superior`

O método `Upper` converte a string para maiúsculas.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel").Upper().String() // "GORAVEL"
```

### `Quando`

O método `When` passa a string para o fechamento dado e retorna a string se a condição fornecida for `true`.

```go
import "github.com/goravel/framework/support/str"

str.Of("Bowen").When(true, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Bowen Han"
```

Se necessário, você pode fornecer o terceiro argumento para o método `When` que é um fechamento que será executado quando a condição
for `false`.

### `WhenContains`

O método `WhenContain` passa a string para o fechamento dado e retorna a string se a string determinada contiver o valor
dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContains("Hello", func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Se necessário, você pode fornecer o terceiro argumento para o método `WhenContains`, que é um fechamento que será executado
quando a string não contém o valor dado.

### `WhenContainsTudo`

O método `WhenContainsAll` passa a string para o fechamento dado e retorna a string se a string dada contiver
todos os valores dados.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello Bowen").WhenContainsAll([]string{"Hello", "Bowen"}, func(s *str.String) *str.String {
    return s.Append(" Han")
}).String() // "Hello Bowen Han"
```

Se necessário, você pode fornecer o terceiro argumento para o método `WhenContainsAll`, que é um fechamento que será
executado quando a string não contém todos os valores dados.

### `WhenEmpty`

O método `WhenEmpty` passa a string para o fechamento dado e retorna a sequência de caracteres se a sequência determinada estiver vazia.

```go
import "github.com/goravel/framework/support/str"

str.Of("").WhenEmpty(func(s *str.String) *str.String {
    return s.Append("Goravel")
}).String() // "Goravel"
```

### `WhenIsAscii`

O método `WhenIsAscii` passa a string para o fechamento dado e retorna a string se a cadeia de caracteres determinada contiver apenas
caracteres ASCII.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}). tring() // "Goravel Framework"

str.Of("£").WhenIsAscii(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "├"
```

### `WhenNotEmpty`

O método `WhenNotEmpty` passa a string para o fechamento dado e retorna a string se a cadeia determinada não for
vazia.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotEmpty(func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenStartsCom`

O método `WhenStartsWith` passa a seqüência de caracteres para o fechamento determinado e retorna a seqüência de caracteres se a determinada sequência de caracteres começar
com o valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenStartsWith("hello", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenFindsCom`

O método `WhenEndsWith` passa a string para o fechamento determinado e retorna a sequência de caracteres se a determinada sequência de caracteres terminar com
o valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("hello world").WhenEndsWith("world", func(s *str.String) *str.String {
    return s.Title()
}).String() // "Hello World"
```

### `WhenExactly`

O método `WhenExactly` passa a string para o fechamento dado e retorna a string se a string determinada é exatamente
igual ao valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel Framework"
```

### `WhenNotExactly`

O método `WhenNotExactly` passa a string para o fechamento dado e retorna a string se a string determinada não for
exatamente igual ao valor dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("Goravel").WhenNotExactly("Goravel", func(s *str.String) *str.String {
    return s.Append(" Framework")
}).String() // "Goravel"
```

### `QuandoIs`

O método `WhenIs` passa a string para a fechamento dada e retorna a string se a string determinada coincidir com o padrão
dado.

```go
import "github.com/goravel/framework/support/str"

str.Of("foo/bar").WhenIs("foo/*", func(s *str.String) *str.String {
    return s.Append("/baz")
}).String() // "foo/bar/baz"
```

### `WhenIsUlid`

O método `WhenIsUlid` passa a cadeia de caracteres para o fechamento determinado e retorna a sequência de caracteres se a sequência determinada for um ULID.

```go
import "github.com/goravel/framework/support/str"

str.Of("01E5Z6Z1Z6Z1Z6Z1Z6Z1Z6Z1Z6").WhenIsUlid(func(s *str.String) *str.String {
    return s.Substr(0, 10)
}).String() // "01E5Z6Z1Z6Z6"
```

### `WhenIsUuid`

O método `WhenIsUuid` passa a string para o fechamento dado e retorna a sequência de caracteres se a sequência de caracteres determinada for uma UUID.

```go
import "github.com/goravel/framework/support/str"

str.Of("550e8400-e29b-41d4-a716-446655440000").WhenIsUuid(func(s *str.String) *str.String {
    return s.Substr(0, 8)
}).String() // "550e8400"
```

### `QuandoTestar`

The `WhenTest` method passes the string to the given closure and returns the string if the given string matches the
given regular expression.

```go
import "github.com/goravel/framework/support/str"

str.Of("goravel framework").WhenTest(`goravel(.*)`, func(s *str.String) *str.String {
    return s.Append(" é awesome")
}).String() // "goravel framework é impressionante"
```

### `WordCount`

O método `WordCount` retorna o número de palavras da string.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, World!").WordCount() // 2
```

### `Palavras`

O método `Words` limita o número de palavras na string. Se necessário, você pode fornecer o segundo argumento para alterar
a string usada para indicar a truncação.

```go
import "github.com/goravel/framework/support/str"

str.Of("Hello, World!").Words(1) // "Olá..."

str.Of("Olá, World!").Words(1, " (**)") // "Olá (****)"
```
