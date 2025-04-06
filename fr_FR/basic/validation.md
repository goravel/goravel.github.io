# Validation

Goravel fournit plusieurs approches différentes pour valider les données entrantes de votre application. Il est plus courant d'utiliser la méthode
`Validate` disponible sur toutes les requêtes HTTP entrantes. Goravel inclut une grande variété de règles de validation
pratiques.

## Démarrage rapide de la validation

Examinons de plus près un exemple complet de la façon de valider un formulaire et de renvoyer des messages d'erreur à l'utilisateur. This
overview will provide you with a general understanding of how to validate incoming request data using Goravel.

### Définition des routes

Tout d'abord, supposons que nous ayons les routes suivantes définies dans notre fichier `routes/web.go` :

```go
importez "goravel/app/http/controllers"

postController := controllers.NewPostController()
facades.Route().Get("/post/create", postController.Create)
facades.Route().Post("/post", postController.Store)
```

L'itinéraire `GET` affiche un formulaire de création d'un nouveau blog. La route `POST` stocke le nouveau message dans la base de données.

### Création du contrôleur

Ensuite, jetons un coup d'œil à un contrôleur simple qui gère les requêtes entrantes sur ces routes. Nous laisserons la méthode `Store`
vide pour le moment:

```go
contrôleurs de paquets

import (
  "github". om/goravel/framework/contracts/http"
)

type PostController struct {
  // Services dépendants
}

func NewPostController() *PostController {
  return &PostController{
    // Services d'injection
  }
}

func (r *PostController) Create(ctx http. ontext) {

}

func (r *PostController) Store(ctx http.Context) {

}
```

### Écrire la logique de validation

Maintenant nous sommes prêts à remplir notre méthode `Store` avec la logique pour valider le nouveau billet de blog.

```go
func (r *PostController) Store(ctx http.Context) {
  validator, err := ctx.Request(). alidate(map[string]string{
    "title": "required|max_len:255",
    "body": "required",
    "code": "required|regex:^\d{4,6}$",
  })
}
```

### Attributs imbriqués

Si la requête HTTP entrante contient des données de champ "imbriqué", vous pouvez spécifier ces champs dans vos règles de validation en utilisant
la syntaxe "point" :

```go
validator, err := ctx.Request().Validate(map[string]string{
  "title": "required|max_len:255",
  "author.name": "required",
  "author.description": "required",
})
```

### Validation de Slice

Si la requête HTTP entrante contient des données de champ "tableau", vous pouvez spécifier ces champs dans vos règles de validation en utilisant
la syntaxe `*`:

```go
validator, err := ctx.Request().Validate(map[string]string{
  "tags.*": "required",
})
```

## Validation de la demande de formulaire

### Création des demandes de formulaire

Pour des scénarios de validation plus complexes, vous pouvez créer une "demande de formulaire". Les demandes de formulaire sont des classes de requête personnalisées
qui encapsulent leur propre logique de validation et d'autorisation. Pour créer une classe de demande de formulaire, vous pouvez utiliser la commande Artisan CLI
`make:request` :

```go
go run . artisan make:request StorePostRequest
go run . artisan make:request user/StorePostRequest
```

La classe de requête de formulaire générée sera placée dans le répertoire `app/http/requests`. Si ce répertoire n'existe pas,
sera créé lorsque vous exécutez la commande `make:request`. Chaque demande de formulaire générée par Goravel a six méthodes :
`Authorize`, `Rules`. De plus, vous pouvez personnaliser les méthodes `Filters`, `Messages`, `Attributes` et `PrepareForValidation`
pour les opérations ultérieures.

La méthode `Authorize` est responsable de déterminer si l'utilisateur actuellement authentifié peut effectuer l'action
représentée par la requête. alors que la méthode `Rules` retourne les règles de validation qui doivent s'appliquer aux données
de la requête :

```go
demandes de package

import (
  "github.com/goravel/framework/contracts/http"
  "github. om/goravel/framework/contracts/validation"
)

type StorePostRequest struct {
  Name string `form:"name" json:"name"`
}

func (r *StorePostRequest) Authorize(ctx http. ontext) erreur {
  return nil
}

func (r *StorePostRequest) Règles(ctx http. ontext) map[string]string {
  return map[string]string{
    // Les clés sont cohérentes avec les clés entrantes.
    "name": "required|max_len:255",
  }
}

func (r *StorePostRequest) Filters(ctx http. ontext) map[string]string {
  return map[string]string{
    "name": "trim",
  }
}

func (r *StorePostRequest) Messages(ctx http. ontext) mapper[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) Attributes(ctx http. ontext) map[string]string {
  return map[string]string{}
}

func (r *StorePostRequest) PrepareForValidation(ctx http. ontext, data validation.Data) erreur {
  return nil
}
```

Alors, comment les règles de validation sont-elles évaluées ? Tout ce que vous avez à faire est d'indiquer la requête sur votre méthode de contrôleur. The
incoming form request is validated before the controller method is called, meaning you do not need to clutter your
controller with any validation logic:

Ensuite, vous pouvez utiliser la méthode `ValidateRequest` pour valider la requête dans le contrôleur:

```go
func (r *PostController) Store(ctx http.Context) {
  var storePost requests.StorePostRequest
  erreurs, erreur:= ctx.Request().ValidateRequest(&storePost)
}
```

Consultez plus de règles dans la section [Règles de validation disponibles](#available-validation-rules).

> Notez que depuis que `form` a passé des valeurs de type `string` par défaut, tous les champs dans la requête doivent également avoir le type
> `string`, sinon veuillez utiliser `JSON` pour passer des valeurs.

### Autorisation des demandes de formulaire

La classe de demande de formulaire contient également une méthode `Authorize`. Dans cette méthode, vous pouvez déterminer si l'utilisateur
authentifié a effectivement l'autorité de mettre à jour une ressource donnée. For example, you may determine if a user actually owns a
blog comment they are attempting to update. Très probablement, vous interagirez avec
vos [portes d'autorisation et politiques](../security/authorization) dans le cadre de cette méthode :

```go
func (r *StorePostRequest) Authorize(ctx http.Context) erreur {
  var modèle de commentaires. omment
  facades.Orm().Query().First(&comment)
  if comment.ID == 0 {
    retourne des erreurs. ew("Aucun commentaire n'est trouvé")
  }

  if !facades.Gate(). llows("update", map[string]any{
    "comment": commentaire,
  }) {
    return errors. ew("ne peut pas mettre à jour le commentaire")
  }

  return nil
}
```

`error` sera passé à la valeur retournée de `ctx.Request().ValidateRequest`.

### Filtrer les données d'entrée

Vous pouvez formater les données d'entrée en améliorant la méthode `Filters` de la demande de formulaire. Cette méthode devrait retourner une carte de
`attribute/filter`:

```go
func (r *StorePostRequest) Filters(ctx http.Context) map[string]string {
  return map[string]string{
    "name": "trim",
  }
 } }
```

### Personnalisation des messages d'erreur

Vous pouvez personnaliser les messages d'erreur utilisés par la demande de formulaire en remplaçant la méthode `Messages`. Cette méthode devrait
retourner un tableau de paires d'attributs / règles et leurs messages d'erreur correspondants :

```go
func (r *StorePostRequest) Messages() map[string]string {
  return map[string]string{
    "title. equired": "Un titre est requis",
    "body.required": "Un message est requis",
  }
}
```

### Personnalisation des attributs de validation

La plupart des messages d'erreur de la règle de validation intégrée de Goravel contiennent un espace réservé `:attribute`. Si vous souhaitez que le placeholder
`:attribute` de votre message de validation soit remplacé par un nom d'attribut personnalisé, vous pouvez spécifier les noms personnalisés
en écrasant la méthode `Attributes`. Cette méthode devrait retourner un tableau de paires d'attributs / noms:

```go
func (r *StorePostRequest) Attributes() map[string]string {
  return map[string]string{
    "email": "email address",
  }
}
```

### Préparation de la saisie pour la validation

Si vous devez préparer ou nettoyer des données de la requête avant d'appliquer vos règles de validation, vous pouvez utiliser la méthode
`PrepareForValidation`:

```go
func (r *StorePostRequest) PrepareForValidation(ctx http.Context, data validation.Data) erreur {
  if name, exist := data. et("name"); existe {
    return data.Set("name", name.(string)+"1")
  }
  return nil
}
```

## Création manuelle de validateurs

Si vous ne voulez pas utiliser la méthode `Validate` sur la requête, vous pouvez créer une instance de validateur manuellement en utilisant
`facades.Validator`. La méthode `Make` de la façade génère une nouvelle instance de validateur:

```go
func (r *PostController) Store(ctx http.Context) http.Response {
  validator, _ := facades.Validation(). ake(
    carte[string]any{
      "name": "Goravel",
    },
    carte[string]chaîne {
      "title": "required|max_len:255",
      "body": "required",
    })

  si validateur. ails() {
    // Retourne un échec
  }

  var modèles utilisateurs. ser
  err := validator.Bind(&user)
  ...
}
```

Le premier argument passé à la méthode `Make` est les données en cours de validation qui peuvent être `map[string]any` ou `struct`.
Le deuxième argument est un tableau de règles de validation à appliquer aux données.

### Personnalisation des messages d'erreur

If needed, you may provide custom error messages that a validator instance should use instead of the default error
messages provided by Goravel. Vous pouvez passer les messages personnalisés comme troisième argument à la méthode `Make` (également
applicable à `ctx.Request().Validate()`) :

```go
validator, err := facades.Validation().Make(entrée, règles, validation.Messages(map[string]string{
  "required": "Le champ :attribute est obligatoire.",
}))
```

### Spécifier un message personnalisé pour un attribut donné

Parfois, vous pouvez spécifier un message d'erreur personnalisé uniquement pour un attribut spécifique. Vous pouvez le faire en utilisant la notation "point"
. Spécifiez d'abord le nom de l'attribut, suivi de la règle (également applicable à `ctx.Request().Validate()`):

```go
validator, err := facades.Validation().Make(entrée, règles, validation.Messages(map[string]string{
  "email.required": "Nous avons besoin de connaître votre adresse e-mail!",
}))
```

### Spécifier les valeurs d'attributs personnalisés

Beaucoup de messages d'erreur intégrés à Goravel incluent un espace réservé `:attribute` qui est remplacé par le nom du champ
ou de l'attribut en cours de validation. Pour personnaliser les valeurs utilisées pour remplacer ces espaces réservés pour des champs spécifiques, votre
peut passer un tableau d'attributs personnalisés en tant que troisième argument à la méthode `Make` (également applicable à
`ctx. équeste().Validate()`):

```go
validator, err := facades.Validation().Make(entrée, règles, validation.Attributes(map[string]string{
  "email": "email address",
}))
```

### Formater les données avant la validation

Vous pouvez formater les données avant de valider les données pour une validation des données plus flexible, et vous pouvez passer la méthode de
formatant les données en tant que troisième paramètre à la méthode `Make` (également applicable à `ctx. équeste().Validate()`):

```go
import (
  validationcontract "github.com/goravel/framework/contracts/validation"
  "github.com/goravel/framework/validation"
)

func (r *PostController) Store(ctx http. ontext) http.Response {
  validator, err := facades.Validation().Make(entrée, règles,
    validation. repareForValidation(func(ctx http.Context, data validationcontract.Data) erreur {
      si le nom existe, := données. et("name"); existe {
        données retournées. et("nom", nom)
      }

      return nil
    }))

  .
}
```

## Travailler avec une entrée validée

Après validation des données de la requête entrante en utilisant des demandes de formulaire ou des instances de validateur créées manuellement, vous voulez toujours
lier les données de la requête à un `struct`, il y a deux façons de le faire:

1. Utilisez la méthode `Bind`, cela liera toutes les données entrantes, y compris les données non validées:

```go
validator, err := ctx.Request().Validate(rules)
var user models.User
err := validateur. ind(&user)

validateur, err := facades.Validation().Make(input, rules)
var user models.User
err := validator.Bind(&user)
```

2. Les données entrantes sont automatiquement liées au formulaire lorsque vous utilisez la demande de validation :

```go
var storePost requests.StorePostRequest
erreurs, err := ctx.Request().ValidateRequest(&storePost)
fmt.Println(storePost.Name)
```

## Travailler avec les messages d'erreur

### Récupération d'un message d'erreur pour un champ (Aléatoire)

```go
validator, err := ctx.Request().Validate(rules)
validator, err := facades.Validation().Make(input, rules)

message := validator.Errors().One("email")
```

### Récupération de tous les messages d'erreur pour un champ

```go
messages := validator.Errors().Get("email")
```

### Récupération de tous les messages d'erreur pour tous les champs

```go
messages := validator.Errors().All()
```

### Déterminer si des messages d'erreur existent pour un champ

```go
if validator.Errors().Has("email") {
  //
}
```

## Règles de validation disponibles

Ci-dessous une liste de toutes les règles de validation disponibles et de leur fonction :

| Nom                    | Libellé                                                                                                                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requis`               | La valeur de la vérification est requise et ne peut pas être nulle. Par exemple, le type de champ est `bool`, la valeur passante est `false`, il ne peut pas passer la validation.                            |
| `required_if`          | `required_if:anotherfield,value,...` Le champ en cours de validation doit être présent et pas vide si le champ anotherField est égal à n'importe quelle valeur.                                                               |
| `required_unless`      | `required_unless:anotherfield,value,...` Le champ en cours de validation doit être présent et pas vide sauf si le champ anotherField est égal à n'importe quelle valeur.                                                      |
| `required_with`        | `required_with:foo,bar,...` Le champ en cours de validation doit être présent et pas vide seulement si l'un des autres champs spécifiés est présent.                                                                          |
| `required_with_all`    | `required_with_all:foo,bar,...` Le champ en cours de validation doit être présent et pas vide seulement si tous les autres champs sont présents.                                                                              |
| `required_without`     | `required_without:foo,bar,...` Le champ en cours de validation doit être présent et pas vide seulement quand l'un des autres champs spécifiés n'est pas présent.                                                              |
| `required_without_all` | `required_without_all:foo,bar,...` Le champ en validation doit être présent et pas vide seulement quand tous les autres champs spécifiés ne sont pas présents.                                                                |
| `int`                  | Vérifier la valeur est le type `intX` `uintX`, et prendre en charge la vérification de la taille. eg: `int` `int:2` `int:2,12`. Avis: [Points pour utiliser les règles](#int) |
| `uint`                 | La valeur de vérification est le type `uint(uintX)`, `value >= 0`                                                                                                                                                                             |
| `bool`                 | Vérifier la valeur est bool string(`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false").                                                                  |
| `Chaîne`               | La valeur de vérification est le type de chaîne et la vérification de la taille. eg:`string` `string:2` `string:2,12`                                                                                         |
| `float`                | La valeur de vérification est le type `floatX)`                                                                                                                                                                                               |
| `slice`                | Vérifier la valeur est slice type(`[]intX` `[]uintX` `[]byte` `[]string`)                                                                                                                                                  |
| `dans`                 | `in:foo,bar,…` Vérifier si la valeur est dans l'énumération donnée                                                                                                                                                                            |
| `not_in`               | `not_in:foo,bar,…` Vérifier si la valeur n'est pas dans l'énumération donnée                                                                                                                                                                  |
| `commence_avec`        | `starts_with:foo` Vérifier si la valeur de la chaîne d'entrée commence par la sous-chaîne donnée                                                                                                                                              |
| `ends_with`            | `ends_with:foo` Vérifier si la valeur de la chaîne d'entrée se termine par la sous-chaîne donnée                                                                                                                                              |
| `entre`                | `entre:min,max` Vérifiez que la valeur est un nombre et se trouve dans la plage donnée                                                                                                                                                        |
| `max`                  | `max:value` La valeur de vérification est inférieure ou égale à la valeur donnée (`intX` `uintX` `floatX`)                                                                                                                 |
| `min`                  | `min:value` La valeur de vérification est supérieure ou égale à la valeur donnée (`intX` `uintX` `floatX`)                                                                                                                 |
| `eq`                   | `eq:value` Vérifiez que la valeur d'entrée est égale à la valeur donnée                                                                                                                                                                       |
| `ne`                   | `ne:value` Vérifiez que la valeur d'entrée n'est pas égale à la valeur donnée                                                                                                                                                                 |
| `lt`                   | `lt:value` La valeur de vérification est inférieure à la valeur donnée (`intX` `uintX` `floatX`)                                                                                                                           |
| `gt`                   | `gt:value` La valeur de vérification est plus grande que la valeur donnée (`intX` `uintX` `floatX`)                                                                                                                        |
| `len`                  | `len:value` La longueur de la valeur est égale à la taille donnée (`string` `array` `slice` `map`)                                                                                                                         |
| `min_len`              | `min_len:value` Vérifier la longueur minimale de la valeur est la taille donnée (`string` `array` `slice` `map`)                                                                                                           |
| `max_len`              | `max_len:value` Vérifier la longueur maximale de la valeur est la taille donnée (`string` `array` `slice` `map`)                                                                                                           |
| `email`                | La valeur de vérification est une chaîne d'adresse e-mail                                                                                                                                                                                     |
| `tableau`              | La valeur de vérification est un tableau, type de tranche                                                                                                                                                                                     |
| `carte`                | La valeur de vérification est un type MAP                                                                                                                                                                                                     |
| `eq_field`             | `eq_field:field` Vérifiez que la valeur du champ est égale à la valeur d'un autre champ                                                                                                                                                       |
| `ne_field`             | `ne_field:field` Vérifiez que la valeur du champ n'est pas égale à la valeur d'un autre champ                                                                                                                                                 |
| `gt_field`             | `gt_field:field` Vérifiez que la valeur du champ est supérieure à la valeur d'un autre champ                                                                                                                                                  |
| `gte_field`            | `gte_field:field` Vérifiez que la valeur du champ est supérieure ou égale à la valeur d'un autre champ                                                                                                                                        |
| `lt_field`             | `lt_field:field` Vérifiez que la valeur du champ est inférieure à la valeur d'un autre champ                                                                                                                                                  |
| `lte_field`            | `lte_field:field` Vérifier si la valeur du champ est inférieure ou égale à la valeur d'un autre champ                                                                                                                                         |
| `fichier`              | Vérifier si c'est un fichier téléchargé                                                                                                                                                                                                       |
| `image`                | Vérifier s'il s'agit d'un fichier image téléchargé et de vérifier le suffixe de support                                                                                                                                                       |
| `date`                 | Vérifiez que la valeur du champ est la chaîne de date                                                                                                                                                                                         |
| `gt_date`              | `gt_date:value` Vérifiez que la valeur d'entrée est supérieure à la chaîne de date donnée                                                                                                                                                     |
| `lt_date`              | `lt_date:value` Vérifiez que la valeur d'entrée est inférieure à la chaîne de date donnée                                                                                                                                                     |
| `gte_date`             | `gte_date:value` Vérifiez que la valeur d'entrée est supérieure ou égale à la chaîne de date donnée                                                                                                                                           |
| `lte_date`             | `lte_date:value` Vérifiez que la valeur d'entrée est inférieure ou égale à la chaîne de date donnée                                                                                                                                           |
| `alpha`                | Vérifiez que la valeur ne contient que des caractères alphabétiques                                                                                                                                                                           |
| `alpha_num`            | Vérifier que seules les lettres, les chiffres sont inclus                                                                                                                                                                                     |
| `alpha_dash`           | Cochez cette case pour n'inclure que les lettres, chiffres, tirets ( - ), et les tirets bas ( _ )                                                                                  |
| `json`                 | La valeur de vérification est une chaîne JSON                                                                                                                                                                                                 |
| `nombre`               | La valeur de vérification est la chaîne de nombre `>= 0`                                                                                                                                                                                      |
| `full_url`             | La valeur de vérification est pleine chaîne d'URL (doit commencer par http,https)                                                                                                                                          |
| `ip`                   | La valeur de vérification est une chaîne IP(v4 ou v6)                                                                                                                                                                      |
| `ipv4`                 | La valeur de vérification est une chaîne IPv4                                                                                                                                                                                                 |
| `ipv6`                 | La valeur de vérification est une chaîne IPv6                                                                                                                                                                                                 |
| `regex`                | Vérifier si la valeur peut passer la vérification régulière                                                                                                                                                                                   |

### Points pour l'utilisation des règles

#### Indice

Lorsque vous utilisez `ctx.Request().Validate(rules)` pour la validation, les données de type `int` entrantes seront analysées par
`json. nmarshal` dans le type `float64`, ce qui fera échouer la validation de la règle d'ints.

**Solutions**

Option 1 : Ajouter [`validation.PrepareForValidation`](#format-data-before-validation), formater les données avant de valider les données
;

Option 2 : Utiliser `facades.Validation().Make()` pour la validation des règles;

## Règles de validation personnalisées

Goravel fournit une variété de règles de validation utiles; cependant, vous pouvez spécifier certaines de vos propres règles. Une méthode de
enregistrant des règles de validation personnalisées est d'utiliser des objets de règles. Pour générer un nouvel objet de règles, vous pouvez simplement utiliser la commande
`make:rule` Artisan.

Par exemple, si vous voulez vérifier qu'une chaîne de caractères est en majuscule, vous pouvez créer une règle avec cette commande. Goravel va
puis enregistrer cette nouvelle règle dans le dossier `app/rules`. Si ce répertoire n'existe pas, Goravel le créera lorsque vous
exécuterez la commande Artisan pour créer votre règle.

```go
aller exécuter. artisan make:rule Majuscule
go run . artisan make:rule user/Majuscule
```

Après avoir créé la règle, nous devons définir son comportement. Un objet règle a deux méthodes : `Passes` et `Message`. La méthode
Passes reçoit toutes les données, y compris les données à valider et les paramètres de validation. Il devrait retourner
`true` ou `false` selon que la valeur de l'attribut est valide. La méthode `Message` devrait retourner le message d'erreur
pour la validation qui devrait être utilisée lorsque la validation échoue.

```go
règles de paquet

import (
  "strings"

  "github. om/goravel/framework/contracts/validation"
)

type Structure en majuscule {
}

// Signature Le nom de la règle.
func (receiver *Uppercase) Signature() string {
  return "uppercase"
}

// Passes Déterminer si la règle de validation passe.
func (receiver *Uppercase) Passes(data validation.Data, val any, options ...any) bool {
  return strings.ToUpper(val.(string)) == val. string)
}

// Message Obtient le message d'erreur de validation.
func (receiver *Uppercase) Message() string {
  return "The :attribute must be uppercase."
}

```

Ensuite, vous devez enregistrer la règle dans la méthode `rules` dans le fichier `app/providers/validation_service_provider.go` et
la règle peut être utilisée comme d'autres règles :

```go
importateurs de packages

(
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/rules"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddRules(receiver.rules()); err != nil {
    facades.Log(). rrorf("add rules error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) rules() []validation.
  return []validation.Rule{
    &rules.Uppercase{},
  }
}
```

## Filtres de validation disponibles

| Nom                            | Libellé                                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int/toInt`                    | Convertir value(string/intX/floatX) en `int` type `v.FilterRule("id", "int")`                                                                                    |
| `uint/toUint`                  | Convertir value(string/intX/floatX) en `uint` type `v.FilterRule("id", "uint")`                                                                                  |
| `int64/toInt64`                | Convertir value(string/intX/floatX) en `int64` type `v.FilterRule("id", "int64")`                                                                                |
| `float/toFloat`                | Convertir value(string/intX/floatX) en type `float`                                                                                                              |
| `bool/toBool`                  | Convertir la valeur de la chaîne en bool. (`true`: "1", "on", "yes", "true", `false`: "0", "off", "no", "false") |
| `trimSpace`                    | Nettoyer les caractères d'espacement des deux côtés de la chaîne                                                                                                                    |
| `ltrim/trimLeft`               | Nettoyer les caractères d'espacement sur les côtés gauche de la chaîne                                                                                                              |
| `rtrim/trimRight`              | Nettoyer les caractères d'espacement sur les côtés droit de la chaîne                                                                                                               |
| `int/integer`                  | Convertir value(string/intX/floatX) en `int` type `v.FilterRule("id", "int")`                                                                                    |
| `lower/lowercase`              | Convertir la chaîne en minuscule                                                                                                                                                    |
| `upper/uppercase`              | Convertir la chaîne en majuscule                                                                                                                                                    |
| `lcFirst/lowerFirst`           | Convertir le premier caractère d'une chaîne en minuscule                                                                                                                            |
| `ucFirst/upperFirst`           | Convertir le premier caractère d'une chaîne en majuscule                                                                                                                            |
| `ucWord/upperWord`             | Convertir le premier caractère de chaque mot en majuscule                                                                                                                           |
| `camel/camelCase`              | Convertir la chaîne en style de nommage à chameau                                                                                                                                   |
| `snake/snakeCase`              | Convertir la chaîne en style de nommage de serpent                                                                                                                                  |
| `escapeJs/escapeJS`            | Échapper la chaîne JS.                                                                                                                                              |
| `escapeHtml/escapeHTML`        | Échapper la chaîne HTML.                                                                                                                                            |
| `str2ints/strToInts`           | Convertir la chaîne en int `[]int`                                                                                                                                                  |
| `str2time/strToTime`           | Convertir la chaîne de date en `time.Time`.                                                                                                                         |
| `str2arr/str2array/strToArray` | Convertir la chaîne en une chaîne de caractères `[]string`                                                                                                                          |

## Filtre personnalisé

Goravel fournit une variété de filtres utiles, cependant, vous pourriez vouloir spécifier certains de vos propres filtres. Pour générer une nouvelle règle
, vous pouvez simplement utiliser la commande `make:filter` Artisan. Utilisons cette commande pour générer une règle qui convertit une chaîne
en un entier. Cette règle est déjà intégrée dans le cadre, nous ne faisons que la créer à titre d'exemple. Goravel sauvegardera
ce nouveau filtre dans le dossier `app/filters`. Si ce répertoire n'existe pas, Goravel le créera lorsque vous exécuterez
la commande Artisan pour créer la règle :

```go
exécutez . artisan make:filter ToInt
// ou
go run . artisan make:filter user/ToInt
```

Un filtre contient deux méthodes : `Signature` et `Handle`. La méthode `Signature` définit le nom du filtre. La méthode
`Handle` exécute la logique de filtrage spécifique :

```go
filtres de paquet

import (
  "strings"

  "github.com/spf13/cast"
  "github. om/goravel/framework/contracts/validation"
)

type ToInt struct {
}

// Signature La signature du filtre.
func (receiver *ToInt) Signature() {
  return "ToInt"
}

// Handle définit la fonction de filtre à appliquer.
func (receiver *ToInt) Handle() n'importe quel {
  return func (val any) int {
    return cast. oString(val)
  }
}
```

Ensuite, vous devez enregistrer le filtre dans la méthode `filters` dans le fichier `app/providers/validation_service_provider.go`,
et le filtre peuvent être utilisés comme les autres:

```go
importateurs de packages

(
  "github.com/goravel/framework/contracts/validation"
  "github. om/goravel/framework/facades"

  "goravel/app/filters"
)

type ValidationServiceProvider struct {
}

func (receiver *ValidationServiceProvider) Register() {

}

func (receiver *ValidationServiceProvider) Boot() {
  if err := facades. alidation().AddFilters(receiver.filters()); err != nil {
    facades.Log(). rrorf("add filter error: %+v", err)
  }
}

func (receiver *ValidationServiceProvider) filters() []validation. ilter {
  return []validation.Filter{
    &filters.ToInt{},
  }
}
```
