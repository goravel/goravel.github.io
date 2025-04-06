# Cachear

Goravel fornece um módulo de cache expansível que pode ser operado usando `facades.Cache()`. Goravel vem com uma 'memória'
driver, para outros drivers, por favor, verifique os pacotes de extensão independentes:

| Motorista | Vincular                                                                                             |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Redis     | [https://github.com/goravel/redis](https://github.com/goravel/redis) |

## Configuração

Faça todas as configurações personalizadas em `config/cache.go`.

## Uso do Cache

### Injetar Contexto

```go
facades.Cache().WithContext(ctx)
```

### Acessando Múltiplos Lojas de Cache

Você pode acessar vários armazenamentos de cache através do método `Store`. A chave passada para o método `Store` deve corresponder a
uma das lojas listadas na matriz de configuração "stores" no seu arquivo de configuração de cache:

```go
valor := facades.Cache().Store("redis").Get("foo")
```

### Recuperando itens do cache

```go
valor := facades.Cache().Get("goravel", "default")
valor := facades.Cache().GetBool("goravel", true)
valor := facades.Cache().GetInt("goravel", 1)
valor := facades.Cache().GetString("goravel", "default")
```

Você pode passar uma `função` como o valor padrão. Se os dados especificados não existirem no cache, o resultado da 'função' será
retornado. O método transitório de fechamento permite obter valores padrão no banco de dados ou outros serviços
externos. Observe a estrutura de fechamento `func() qualquer`.

```go
valor := facades.Cache().Get("goravel", func() any {
    return "default"
})
```

### Verificando existência de itens

```go
bool := facades.Cache().Has("goravel")
```

### Aumentando / Reduzindo Valores

Os métodos `Increment` e `Decrement` podem ser usados para ajustar o valor dos itens inteiros na cache. Ambos os métodos
aceita um segundo argumento opcional indicando o valor pelo qual incrementar ou decretar o valor do item:

```go
facades.Cache().Increment("chave")
facades.Cache().Increment("chave", quantidade)
facades.Cache().Decrement("chave")
facades.Cache().Decrement("chave", quantidade)
```

### Recuperar e Loja

Às vezes você pode querer obter dados do cache e quando o item de cache solicitado não existir. o programa pode
armazenar um valor padrão para você.

```go
valor, err := facades.Cache().Remember("goravel", 5*time.Second, func() (any, error) {
    return "goravel", nil
})
```

Se os dados que você deseja não existirem no cache, o fechamento passado para o método `Lembre-se` será executado, e então
o resultado será retornado e colocado no cache.

Você pode usar o método `RememberForever` para recuperar dados do cache ou armazená-lo permanentemente:

```go
valor, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Recuperar e Excluir

```go
valor := facades.Cache().Pull("goravel", "padrão")
```

### Armazenar itens no cache

```go
err := facades.Cache().Put("goravel", "valor", 5*tempo.Segundo)
```

Se o tempo de expiração do cache for definido como `0`, o cache será válido para sempre:

```go
err := facades.Cache().Put("goravel", "valor", 0)
```

### Armazenar se não estiver presente

O método 'Add' armazena dados apenas se não estiver no cache. Ele retorna `true` se o armazenamento for bem-sucedido e `false` se
não é.

```go
bool := facades.Cache().Add("goravel", "valor", 5*tempo.Segundo)
```

### Armazenando Itens para Sempre

O método `Forever` pode ser usado para armazenar dados de forma persistente no cache. Because these data will not expire, they must
be manually deleted from the cache through the `Forget` method:

```go
bool := facades.Cache().Forever("goravel", "valor")
```

### Removendo itens do cache

```go
bool := facades.Cache().Forget("goravel")
```

Você pode usar o método `Flush` para limpar todos os caches:

```go
bool := facades.Cache().Flush()
```

## Travas Atômicas

### Gerenciando bloqueios

Os bloqueios atômicos permitem a manipulação de fechaduras distribuídas sem se preocuparem com as condições raciais. Você pode criar e
gerenciar bloqueios usando o método `Bloquear`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Lock adquirido por 10 segundos...

    lock.Release()
}
```

O método `Get` também aceita fechamento. Após a execução do fechamento, o Goravel liberará automaticamente o bloqueio:

```go
facades.Cache().Lock("foo").Get(func () {
    // Travar adquirido por 10 segundos e lançado automaticamente...
});
```

Se o bloqueio não estiver disponível no momento em que você o solicitar, você pode instruir Goravel a esperar por um número especificado de
segundos. Se o bloqueio não puder ser adquirido dentro do limite de tempo especificado, retornará `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Bloqueado adquirido depois de esperar no máximo 5 segundos...
se (lock.Block(5*time.Second)) {
    lock.Release()
}
```

O exemplo acima pode ser simplificado passando um fechamento para o método `Bloco`. Quando se passa um encerramento a este método,
O Goravel tentará adquirir o bloqueio pelo número especificado de segundos e liberará automaticamente o bloqueio
assim que o fechamento for executado:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Lock adquirido depois de esperar um máximo de 5 segundos...
})
```

Se você gostaria de liberar uma trava sem respeitar o seu proprietário atual, você pode usar o método `ForceRelease`:

```go
facades.Cache().Lock("processando").ForceRelease();
```

## Adicionando drivers de cache personalizados

### Configuração

Se você quiser definir um driver completamente personalizado, você pode especificar o tipo de driver `custom` no arquivo de configuração `config/cache.go`
.
Então inclua uma opção `via` para implementar uma interface `framework/contratos/cache/Driver`:

```go
//config/cache.go
"stores": map[string]interface{}{
    "memory": map[string]any{
        "driver": "memory",
    },
    "custom": map[string]interface{}{
        "driver": "custom",
        "via":    &Logger{},
    },
},
```

### Implementar Driver Personalizado

Implementar a interface `framework/contracts/cache/Driver`, arquivos podem ser armazenados na pasta `app/extensions` (
modificável).

```go
// framework/contracts/cache/Driver
package cache

import "time"

type Driver interface {
    // Add Driver an item in the cache if the key does not exist.
    Add(key string, value any, t time.Duration) bool
    Decrement(key string, value ...int) (int, error)
    // Forever Driver an item in the cache indefinitely.
    Forever(key string, value any) bool
    // Forget Remove an item from the cache.
    Forget(key string) bool
    // Flush Remove all items from the cache.
    Flush() bool
    // Get Retrieve an item from the cache by key.
    Get(key string, def ...any) any
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ...int) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ...string) string
    // Has Check an item exists in the cache.
    Has(key string) bool
    Increment(key string, value ...int) (int, error)
    Lock(key string, t ...time.Duration) Lock
    // Put Driver an item in the cache for a given time.
    Put(key string, value any, t time.Duration) error
    // Pull Retrieve an item from the cache and delete it.
    Pull(key string, def ...any) any
    // Remember Get an item from the cache, or execute the given Closure and store the result.
    Remember(key string, ttl time.Duration, callback func() (any, error)) (any, error)
    // RememberForever Get an item from the cache, or execute the given Closure and store the result forever.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context) Driver
}
```
