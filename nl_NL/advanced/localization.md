# Lokalisatie

Goravels lokalisatiemogelijkheden bieden een handige manier om tekenreeksen in verschillende talen op te halen, waardoor het gemakkelijk is om
meerdere talen in uw applicatie te ondersteunen. Taal strings worden opgeslagen in bestanden in de `lang` map en
Goravel ondersteunt twee manieren om taalbestanden te organiseren:

Elke taal heeft zijn eigen bestand:

```
/lang
  en.json
  cn.json
```

Of, als er te veel vertalingen zijn, kunnen ze gecategoriseerd worden:

```
/lang
  /en
    user.json
  /cn
    user.json
```

## Lokalisatie configureren

De standaard taal van de applicatie is opgeslagen in de `locale` configuratie optie in het `config/app.go`
configuratiebestand. Je kunt deze waarde aanpassen naar gelang nodig om aan de vereisten van je applicatie te voldoen.

Je kunt ook de 'SetLocale' methode gebruiken die door de App Facade wordt aangeboden om de standaardtaal voor een enkele 'HTTP'
verzoek tijdens het runtime te wijzigen:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    retourneer ctx.Response()
})
```

U kunt een "fallback locale" configureren die zal worden gebruikt wanneer de huidige taal de opgegeven vertaling
string niet bevat. Net als de standaardtaal, is de fallback taal ook geconfigureerd in het `config/app.go` configuratiebestand.

```
"fallback_locale": "en",
```

### Bepaal de huidige lokalisatie

Je kunt de methoden `CurrentLocale` en `IsLocale` gebruiken om de huidige `locale` te bepalen of de `locale` een
gegeven waarde is.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "nl") {}
```

### Vertaaltekenreeksen definiëren

In taalbestanden, kunt u structuren op enkel niveau of meerdere niveaus definiëren:

```
// lang/en.json
{
  "name": "Het is je naam",
  "required": {
    "user_id": "UserID is required"
  }
}
```

### Ophalen Vertaalreeksen

U kunt de `facades.Lang(ctx).Get()` methode gebruiken om vertaalstrings op te halen uit taalbestanden. Als het bestand
meerdere levels bevat, kunt u `. om ze te verbinden, en als het taalbestand zich in meerdere levels van
mappen bevindt, kun je `/\` gebruiken om ze te verbinden.

Bijvoorbeeld:

```
// lang/nl/nl zoon
{
  "name": "Het is jouw naam",
  "vereist": {
    "user_id": "UserID is vereist"
  }
}

facades. ang(ctx).Get("naam")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user. zoon
{
  "name": "Het is jouw naam",
  "vereist": {
    "user_id": "UserID is vereist"
  }
}

facades. ang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Parameters vervangen in vertaalreeksen

U kunt tijdelijke aanduidingen definiëren in vertalingsstrings. Alle placeholders hebben de prefix `:`. U kunt bijvoorbeeld een
aanduiding gebruiken om een welkomstbericht te definiëren:

```
{
  "welkom": "Welkom, :name"
}
```

Om placeholders te vervangen bij het ophalen van een vertaling tekenreeks, je kunt een vertalingsoptie met de vervangende kaart
doorsturen als de tweede parameter naar de `facades. ang(ctx).Get()` methode:

```
facades.Lang(ctx).Get("welkom", translation.Option{
  Vervang: kaart[string]string{
    "name": "Goravel",
  },
})
```

#### Pluralisatie

Pluralisatie is een complex probleem omdat verschillende talen verschillende pluralisatieregels hebben. However, Goravel can
help you translate strings based on the pluralization rules you define. By using the `|` character, you can
differentiate between the singular and plural forms of a string:

```
{
  "appels": "Er is één apple\\quad Er zijn veel appels"
}
```

U kunt zelfs complexere pluralisatieregels maken door vertaaltekenreeksen voor meerdere waardebereiken te specificeren:

```
{
  "appels": "{0} Er zijn geen appels en [1,19] Er zijn sommige, [20,*] Er zijn er veel
}
```

Na het definiëren van een vertalingsreeks met pluralisatie-opties, kunt u de methode `facades.Lang(ctx).Choice()` naar
ophalen voor een gegeven `count`. In dit voorbeeld, omdat het aantal groter dan 1 is, wordt de meervoudsvorm van de
vertaalreeks geretourneerd:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

U kunt ook tijdelijke aanduidingen in pluralisatienderen definiëren. Door het passeren van een array als derde parameter aan de
`facades.Lang(ctx).Choice()` methode, kunt u deze placeholders vervangen:

```
"minutes_ago": "{1} :value minute geleden,[2,*] :value minuten geleden",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Vervanging: map[string]string{
    "waarde": "5",
  },
})
```
