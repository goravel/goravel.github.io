# Lokalisering

Gorfels lokaliseringsfunktioner ger ett bekvämt sätt att hämta strängar på olika språk, vilket gör det enkelt att
stödja flera språk i din applikation. Språksträngar lagras i filer i katalogen 'lang', och
Goravel stöder två sätt att organisera språkfiler:

Varje språk har sin egen fil:

```
/lang
  en.json
  cn.json
```

Eller, när det finns för många översättningar, kan de kategoriseras:

```
/lang
  /sv
    user.json
  /cn
    user.json
```

## Konfigurera Locale

Standardspråket för programmet lagras i konfigurationsalternativet `locale` i konfigurationsfilen `config/app.go`
Du kan ändra detta värde som behövs för att passa din applikations krav.

Du kan också använda `SetLocale`-metoden som tillhandahålls av appfasaden för att ändra standardspråket för en enda `HTTP`
begäran vid runtime:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "sv")

    returnera ctx.Response()
})
```

Du kan konfigurera en "reserv lokal" som kommer att användas när det aktuella språket inte innehåller den givna översättningen
sträng. Precis som standardspråket är reservspråket också konfigurerat i konfigurationsfilen `config/app.go`.

```
"fallback_locale": "en",
```

### Fastställande av aktuell lokal

Du kan använda `CurrentLocale` och` IsLocale`-metoderna för att bestämma den aktuella `locale` eller kontrollera om `locale` är ett
givet värde.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "sv") {}
```

### Definiera översättningssträngar

I språkfiler kan du definiera strukturer på en nivå eller på flera nivåer:

```
// lang/en.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}
```

### Hämtar översättningssträngar

Du kan använda `facades.Lang(ctx).Get()` -metoden för att hämta översättningssträngar från språkfiler. Om språkfilen
innehåller flera nivåer, kan du använda `. för att ansluta dem, och om språkfilen är i flera nivåer av
-mappar, kan du använda `/\` för att ansluta dem.

Till exempel:

```
// lang/sv. son
{
  "namn": "Det är ditt namn",
  "obligatoriskt": {
    "user_id": "UserID krävs"
  }
}

fasader. ang(ctx).Get("namn")
fasades.Lang(ctx).Get("required.user_id")

// lang/sv/roll/user. son
{
  "namn": "Det är ditt namn",
  "obligatorisk": {
    "user_id": "UserID krävs"
  }
}

fasader. ang(ctx).Get("roll/user.name")
fasader.Lang(ctx).Get("roll/user.required.user_id")
```

#### Ersätter parametrar i översättningssträngar

Du kan definiera platshållare i översättningssträngar. Alla platshållare har prefixet `:`. Du kan till exempel använda en
platshållare för att definiera ett välkomstmeddelande:

```
{
  "welcome": "Welcome, :name"
}
```

Att ersätta platshållare när du hämtar en översättningssträng, du kan skicka ett översättningsalternativ med ersättningskarta
som den andra parametern till `fasaderna. ang(ctx).Get()` metod:

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Ersätt: karta[string]string{
    "name": "Goravel",
  },
})
```

#### Pluralisering

Pluralization är ett komplext problem, därför att olika språk har olika pluraliseringsregler. Men Goravel kan
hjälpa dig att översätta strängar baserat på pluraliseringsreglerna du definierar. Genom att använda `<unk> `-tecknet kan du
skilja mellan de singulära och plurala formerna av en sträng:

```
{
  "äpplen": "Det finns ett äpple Det finns många äpplen"
}
```

Du kan även skapa mer komplexa pluraliseringsregler genom att ange översättningssträngar för flera värdeområden:

```
{
  "äpplen": "{0} Det finns none<unk> [1,19] Det finns någon [20,*] Det finns många"
}
```

Efter att ha definierat en översättningssträng med pluraliseringsalternativ kan du använda `fasades.Lang(ctx).Choice()` -metoden till
hämta linjen för en given `count`. I detta exempel, eftersom räkningen är större än 1, är pluralformen av
översättningssträngen returnerad:

```
fasader.Lang(ctx).Val ("messages.apples", 10)
```

Du kan också definiera platshållarattribut i pluraliseringssträngar. Genom att skicka en array som den tredje parametern till
`fasades.Lang(ctx).Choice()` metod kan du ersätta dessa platshållare:

```
"minutes_ago": "{1} :value minute ago<unk> [2,*] :value minutes ago",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Ersätt: karta[string]string{
    "value": "5",
  },
})
```
