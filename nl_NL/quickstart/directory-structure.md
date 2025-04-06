# Map structuur

De standaard bestandsstructuur kan ervoor zorgen dat je project sneller begint, en je kunt ook gratis nieuwe mappen toevoegen, maar
wijzig de standaard mappen niet.

## Root map

### `app` map

`app` bevat de kerncode van het programma. Bijna alle logica in het programma zal in deze map staan.

### `bootstrap` Directory

De `bootstrap` map bevat het startbestand `app.go`.

### `config` map

De `config` folder bevat alle configuratiebestanden van de toepassing. It is best to browse through these files and
familiarize yourself with all the available options.

### `database` map

De `database` map bevat database migratiebestanden.

### `publiek` map

De `public` map bevat statische bronnen, zoals afbeeldingen, certificaten, enz.

### `resources` map

De `resources` map bevat je [views](../basic/views) en je rame, niet gecompileerde assets zoals
CSS of JavaScript.

### 'routes' map

De `routes` directory bevat alle route definities van de toepassing.

### `opslag` map

De `storage` map bevat de `logs` map en de `logs` map bevat de logbestanden.

### `tests` map

De `tests` map bevat uw geautomatiseerde tests.

## `app` map

### `console` map

De `console` map bevat alle aangepaste `Artisan` commando's van de applicatie en het console boot file
`kernel. o`, die kan worden geregistreerd in dit bestand [Taak Planning](../advanced/schedule)

### `http` map

De `http` map bevat controllers, middleware, enz., en bijna alle verzoeken die de toepassing via de
Web invoeren, worden hier verwerkt.

### `grpc` map

De `grpc` map bevat controllers, middleware, enz., en bijna alle verzoeken die de toepassing via de
Grpc worden hier verwerkt.

### `models` map

De `models` map bevat alle data modellen.

### `providers` map

De `providers` map bevat alle [Service Providers](../foundation/providers) in het
-programma. De service provider leidt de applicatie om te reageren op inkomende verzoeken door bindende diensten,
te registreren voor afspraken of andere taken.
