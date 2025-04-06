# Katalogens struktur

Standard filstruktur kan göra dig bättre starta projekt avancemang, och du kan också lägga till nya mappar fritt, men
ändrar inte standardmapparna.

## Root-katalog

### `app` katalog

`app` innehåller kärnkoden för programmet. Nästan all logik i programmet kommer att vara i denna mapp.

### `bootstrap` Directory

Katalogen `bootstrap` innehåller ramverkets startfil `app.go`.

### `config` katalog

Katalogen `config` innehåller alla konfigurationsfiler i programmet. Det är bäst att bläddra igenom dessa filer och
bekanta dig med alla tillgängliga alternativ.

### `databas` katalog

Katalogen `database` innehåller databasmigreringsfiler.

### `public` katalog

`public`-katalogen innehåller några statiska resurser, såsom bilder, certifikat etc.

### `resources` katalog

`resources`-katalogen innehåller din [views](../basic/views) samt dina råa, okompilerade tillgångar som
CSS eller JavaScript.

### `routes` Katalog

Katalogen `routes` innehåller alla ruttdefinitioner av programmet.

### `lagring`-katalog

`storage`-katalogen innehåller `logs`-katalogen, och `logs`-katalogen innehåller applikationens loggfiler.

### `tests` Katalog

`tests`-katalogen innehåller dina automatiska tester.

## `app` katalog

### `konsol` Katalog

`console`-katalogen innehåller alla anpassade `Artisan`-kommandon i applikationen och uppstartsfilen
`kernel. o`, som kan registreras i den här filen [Schemaläggning](../advanced/schedule)

### `http` katalog

Katalogen `http` innehåller styrenheter, mellanprogram, etc., och nästan alla förfrågningar som går in i programmet via
Web behandlas här.

### `grpc` Katalog

Katalogen `grpc` innehåller styrenheter, mellanprogram, etc., och nästan alla förfrågningar som går in i programmet via
Grpc behandlas här.

### `models` Katalog

`models`-katalogen innehåller alla datamodeller.

### `providers` Katalog

`providers`-katalogen innehåller alla [tjänsteleverantörer](../foundation/providers) i
-programmet. Tjänsteleverantören vägleder programmet att svara på inkommande förfrågningar genom bindande tjänster, registrera
för händelser, eller utföra andra uppgifter.
