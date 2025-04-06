# Cache

Goravel fournit un module de cache extensible qui peut être exploité en utilisant `facades.Cache()`. Goravel est livré avec un pilote `memory`
, pour les autres pilotes, veuillez vérifier les extensions indépendantes correspondantes :

| Chauffeur | Lier                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| Redis     | [https://github.com/goravel/redis](https://github.com/fr/goravel/redis) |

## Configuration

Rendre toutes les configurations personnalisées dans `config/cache.go`.

## Utilisation du cache

### Contexte d'injection

```go
facades.Cache().WithContext(ctx)
```

### Accès à plusieurs caches

Vous pouvez accéder à divers magasins de cache via la méthode `Store`. La clé passée à la méthode `Store` devrait correspondre à
l'un des magasins listés dans le tableau de configuration "boutiques" de votre fichier de configuration de cache :

```go
valeur := facades.Cache().Store("redis").Get("foo")
```

### Récupération des éléments du cache

```go
valeur := facades.Cache().Get("goravel", "default")
valeur := facades.Cache().GetBool("goravel", true)
valeur := facades.Cache().GetInt("goravel", 1)
valeur := facades.Cache().GetString("goravel", "default")
```

Vous pouvez passer une `func` comme valeur par défaut. If the specified data does not exist in the cache, the result of `func` will
be returned. La méthode de fermeture transitoire vous permet d'obtenir des valeurs par défaut à partir de la base de données ou d'autres services
externes. Notez la structure de fermeture `func() any`.

```go
valeur := facades.Cache().Get("goravel", func() n'importe quel {
    retourne "default"
})
```

### Vérification de l'Existence d'Objet

```go
bool := facades.Cache().Has("goravel")
```

### Incrémentation / Décrémentation des valeurs

Les méthodes `Increment` et `Decrement` peuvent être utilisées pour ajuster la valeur des éléments entiers dans le cache. Les deux méthodes
acceptent un second argument facultatif indiquant le montant par lequel incrémenter ou décrémenter la valeur de l'élément :

```go
facades.Cache().Increment("key")
facades.Cache().Increment("key", amount)
facades.Cache().Decrement("key")
facades.Cache().Decrement("key", amount)
```

### Récupérer et stocker

Parfois, vous pouvez vouloir obtenir des données du cache, et lorsque l'élément de cache demandé n'existe pas, le programme peut
stocker une valeur par défaut pour vous.

```go
valeur, err := facades.Cache().Remember("goravel", 5*time.Second, func() (any, error) {
    return "goravel", nil
})
```

Si les données que vous voulez n'existent pas dans le cache, la fermeture passée à la méthode `Remember` sera exécutée, puis
le résultat sera retourné et placé dans la cache.

Vous pouvez utiliser la méthode `RememberForever` pour récupérer les données du cache ou les stocker définitivement:

```go
valeur, err := facades.Cache().RememberForever("goravel", func() (any, error) {
    return "default", nil
})
```

### Récupérer et supprimer

```go
valeur := facades.Cache().Pull("goravel", "default")
```

### Stockage des éléments dans la cache

```go
err := facades.Cache().Put("goravel", "valeur", 5*temps.Second)
```

Si la durée d'expiration du cache est définie à `0`, le cache sera valide pour toujours:

```go
err := facades.Cache().Put("goravel", "value", 0)
```

### Stocker si non présent

La méthode `Add` stocke les données uniquement si ce n'est pas dans le cache. Il retourne `true` si le stockage est réussi et `false` si
ce n'est pas le cas.

```go
bool := facades.Cache().Add("goravel", "value", 5*temps.Second)
```

### Stocker des objets pour toujours

La méthode `Forever` peut être utilisée pour stocker les données de manière persistante dans le cache. Because these data will not expire, they must
be manually deleted from the cache through the `Forget` method:

```go
bool := facades.Cache().Forever("goravel", "valeur")
```

### Retirer des éléments de la cache

```go
bool := facades.Cache().Forget("goravel")
```

Vous pouvez utiliser la méthode `Flush` pour effacer tous les caches:

```go
bool := facades.Cache().Flush()
```

## Verrous Atomic

### Gestion des verrous

Les écluses atomiques permettent de manipuler les écluses distribuées sans se soucier des conditions de la course. Vous pouvez créer et
gérer les verrous en utilisant la méthode `Lock`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)

if (lock.Get()) {
    // Verrouiller acquis pendant 10 secondes...

    lock.Release()
}
```

La méthode `Get` accepte également une fermeture. Une fois la fermeture exécutée, Goravel relâchera automatiquement le verrou :

```go
facades.Cache().Lock("foo").Get(func () {
    // Verrouiller acquis pendant 10 secondes et automatiquement libéré...
});
```

Si le cadenas n'est pas disponible au moment où vous le demandez, vous pouvez demander à Goravel d'attendre un nombre spécifié de
secondes. Si le verrou ne peut pas être acquis dans le délai spécifié, retournera `false`:

```go
lock := facades.Cache().Lock("foo", 10*time.Second)
// Verrouillé acquis après avoir attendu un maximum de 5 secondes...
if (lock.Block(5*time.Second)) {
    lock.Release()
}
```

L'exemple ci-dessus peut être simplifié en passant une fermeture à la méthode `Block`. Lorsqu'une fermeture est passée à cette méthode,
Goravel tentera d'acquérir le verrou pendant le nombre de secondes spécifié et libérera automatiquement le verrou
une fois que la fermeture aura été exécutée:

```go
facades.Cache().Lock("foo", 10*time.Second).Block(5*time.Second, func () {
    // Verrouillé après avoir attendu un maximum de 5 secondes...
})
```

Si vous souhaitez libérer un verrou sans respecter son propriétaire actuel, vous pouvez utiliser la méthode `ForceRelease` :

```go
facades.Cache().Lock("processing").ForceRelease();
```

## Ajout de pilotes de cache personnalisés

### Configuration

Si vous voulez définir un pilote complètement personnalisé, vous pouvez spécifier le type de pilote `custom` dans le fichier de configuration `config/cache.go`
.
Ensuite incluez une option `via` pour implémenter une interface `framework/contracts/cache/Driver` :

```go
//config/cache. o
"stores": map[string]interface{}{
    "memory": map[string]any{
        "driver": "memory",
    },
    "custom": carte[string]interface{}{
        "driver": "custom",
        "via": &Logger{},
    },
},
```

### Implémenter le pilote personnalisé

Implement the `framework/contracts/cache/Driver` interface, files can be stored in the `app/extensions` folder (
modifiable).

```go
// framework/contracts/cache/cache/Driver
package cache

import "time"

type Driver interface {
    // Ajoute un élément dans le cache si la clé n'existe pas.
    Add(key string, value any, t time. uration) bool
    Decrement(chaîne de clés, valeur ... nt) (int, error)
    // Forever Driver un élément dans le cache indéfiniment.
    Forever(chaîne de clés, valeur any) bool
    // Oublier supprimer un élément du cache.
    Forget(chaîne de clé) bool
    // Supprime tous les éléments du cache.
    Flush() bool
    // Récupère un élément du cache par clé.
    Get(key string, def . .any) any
    GetBool(key string, def ...bool) bool
    GetInt(key string, def ... nt) int
    GetInt64(key string, def ...int64) int64
    GetString(key string, def ... chaîne) chaîne
    // A vérifié qu'un élément existe dans le cache.
    Has(chaîne de clé) bool
    Increment(chaîne de clés, valeur . .int) (int, error)
    Lock(key string, t ...time. uration) Verrouiller
    // Mettre un élément dans le cache pour une heure donnée.
    Put(chaîne de clés, valeur tout le temps, t time. uration) erreur
    // Récupérer un élément du cache et le supprimer.
    Pull(chaîne de clés, def ... ny) any
    // Remember Get an item from the cache, or execute the given Closure and store the result.
    Remember(key string, ttl time. uration, callback func() (any, error)) (any, error)
    // RememberForever Récupère un élément du cache, ou exécutez la Closure donnée et stockez le résultat pour toujours.
    RememberForever(key string, callback func() (any, error)) (any, error)
    WithContext(ctx context.Context.Context) Driver
}
```
