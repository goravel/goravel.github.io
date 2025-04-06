# Localizare

Caracteristicile de localizare ale Goravel oferă un mod convenabil de a prelua șiruri în diferite limbi, facilitând
suporta mai multe limbi în aplicația ta. Şirurile de limbă sunt stocate în fişierele din folderul `lang`, iar
Goravel suportă două moduri de organizare a fişierelor de limbă:

Fiecare limbă are propriul său fișier:

```
/lang
  en.json
  cn.json
```

Sau, atunci când există prea multe traduceri, acestea pot fi clasificate:

```
/lang
  /en
    user.json
  /cn
    user.json
```

## Configurarea localizării

Limba implicită a aplicației este stocată în opțiunea de configurare `locale` din fișierul de configurare `config/app.go`
. Puteţi modifica această valoare după cum este necesar pentru a corespunde cerinţelor aplicaţiei.

De asemenea, puteți utiliza metoda `SetLocale` furnizată de App Facade pentru a modifica limba implicită pentru o singură cerere `HTTP`
la rulare:

```
facades.Route().Get("/", func(tx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

Puteți configura un "fallback locale" care va fi utilizat atunci când limba curentă nu conține un șir de traducere
dat. Ca și limba implicită, limba de rezervă este de asemenea configurată în fișierul de configurare `config/app.go`.

```
"fallback_locale": "en",
```

### Determinarea locației curente

Puteți utiliza metodele `Current Locale` și `IsLocale` pentru a determina `locale` sau verifica dacă `locale` actual este o valoare
dată.

```
local := facades.App().Current Locale(ctx)
if facades.App().IsLocale(ctx, "en") {}
```

### Definirea șirurilor de traducere

În fişierele de limbă, puteţi defini structuri de un singur nivel sau pe mai multe niveluri:

```
// lang/en.json
{
  "name": "Este numele tău",
  "required": {
    "user_id": "UserID este necesar"
  }
}
```

### Preluarea șirurilor de traducere

Puteți folosi metoda `facades.Lang(ctx).Get()` pentru a prelua șirurile de traducere din fișierele de limbă. Dacă fişierul de limbă
conţine mai multe nivele, puteţi utiliza ". pentru a le conecta şi dacă fişierul de limbă este în mai multe nivele
, puteţi utiliza `/` pentru a le conecta.

De exemplu:

```
// lang/en.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}

facades.Lang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}

facades.Lang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Înlocuirea parametrilor în șirurile de traducere

Poți defini substituenți în șiruri de traducere. Toţi substituenţii au prefixul `:`. De exemplu, poți folosi un substituent
pentru a defini un mesaj de bun venit:

```
{
  "welcome": "Welcome, :name"
}
```

Pentru a înlocui substituenții la preluarea unui șir de traducere, poți să treci o opțiune de traducere cu harta
de înlocuire ca al doilea parametru la \`fațades. metoda ang(ctx).Get()":

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Înlocuiți: map[string]string{
    "name": "Goravel",
  },
})
```

#### Pluralizare

Pluralizarea este o problemă complexă deoarece diferitele limbi au diferite norme de pluralizare. However, Goravel can
help you translate strings based on the pluralization rules you define. By using the `|` character, you can
differentiate between the singular and plural forms of a string:

```
{
  "mere": "Există un mere -- sunt multe mere"
}
```

Puteți crea reguli de pluralizare mai complexe prin specificarea șirurilor de traducere pentru mai multe categorii de valori:

```
{
  "mere": "{0} Nu există nici una [1.19] Există [20,*] Sunt multe"
}
```

După definirea unui şir de traduceri cu opţiunile de pluralizare, puteţi utiliza metoda `facades.Lang(ctx).Choice()` pentru a
prelua linia pentru un anumit `count`. În acest exemplu, deoarece numărul este mai mare de 1, forma plural a șirului de traducere
este returnat:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

De asemenea, poți defini atributele substituentului în șirurile de pluralizare. Prin trecerea unui array ca al treilea parametru la metoda
`facades.Lang(ctx).Choice()`, poți înlocui acești substituenți:

```
"minutes_ago": "{1} :value minut ago","[2,*] :value minutes în urmă",

faades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Înlocuiește: harta[string]string{
    "value": "5",
  },
})
```
