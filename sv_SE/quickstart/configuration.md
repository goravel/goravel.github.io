# Konfiguration

Alla konfigurationsfiler i Goravels ramverk lagras i `config`-katalogen. Du kan se specifika
instruktioner och konfigurera dem flexibelt enligt projektets behov.

## Konfiguration av miljö

Löpande applikationer i olika miljöer kräver vanligtvis olika konfigurationer. Till exempel kanske du vill
aktivera felsökningsläget lokalt men behöver det inte i produktionsmiljön.

Därför ger ramverket `.env.exempel`-filen i rotkatalogen. Du måste kopiera denna fil, byta namn på den
till `.env` innan du startar utvecklingen och ändra konfigurationsobjekten i \`. nv' fil enligt ditt projekt
behov.

Notera att `. nv`-filen bör inte läggas till versionskontroll, eftersom när flera personer samarbetar, olika
utvecklare kan använda olika konfigurationer, och olika konfigurationer för driftsättning är olika.

Dessutom, om en inkräktare får tillgång till ditt kodförråd, kommer det att finnas en risk för att exponera känslig
-konfiguration. Om du vill lägga till ett nytt konfigurationsobjekt kan du lägga till den i filen '.env.example' för att synkronisera
konfigurationen för alla utvecklare.

## Hämta miljökonfiguration

Använd följande metod för att få konfigurationsobjekten i filen `.env`:

```go
// Den första parametern är konfigurationsnyckeln, och den andra parametern är standardvärdet
fasader.Config().Env("APP_NAME", "goravel")
```

## Åtkomst till konfigurationsvärden

Du kan enkelt använda den globala `facades.Config()` -funktionen var som helst i programmet för att komma åt konfigurationsvärdena
i `config`-katalogen. Åtkomst till konfigurationsvärdet kan använda "." syntax. Du kan också ange ett standard
-värde, om konfigurationsalternativet inte finns, är standardvärdet returnerat:

```go
// Hämta konfigurationen genom påståendet
fasades.Config().Get("app.name", "goravel")

// Hämta konfigurationen av strängtypen
fasader.Config().GetString("app. ame", "goravel")

// Hämta konfigurationen av int typ
fasader.Konfig().GetInt("app. nt", 1)

// Hämta konfigurationen av Bolltypen
fasader.Konfig().GetBool("app.debug", true)
```

## Ställ in konfiguration

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Hämta projektinformation

Du kan använda kommandot `artisan about` för att visa ramverksversionen, konfigurationen etc.

```bash
gå springa. hantverkare om
```
