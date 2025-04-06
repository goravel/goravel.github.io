# Configuratie

Alle configuratiebestanden van het Goravel framework worden opgeslagen in de `config` map. U kunt specifieke
instructies bekijken en flexibel configureren aan de hand van projectbehoeften.

## Omgeving configuratie

Lopende toepassingen in verschillende omgevingen vereisen meestal verschillende configuraties. For example, you may want to
turn on the Debug mode locally but don't need it in the production environment.

Daarom geeft het framework het `.env.example` bestand in de hoofdmap. U moet dit bestand kopiëren, de naam
wijzigen naar `.env` voordat u de ontwikkeling start, en wijzig de configuratie items in de `. nv` bestand volgens de behoeften van jouw project
.

Merk op dat de `. nv` bestand mag niet worden toegevoegd aan versiemanagement, want wanneer meerdere mensen samenwerken, verschillende
ontwikkelaars kunnen verschillende configuraties gebruiken en verschillende implementatieomgevingen zijn verschillend.

Bovendien, als een indringer toegang krijgt tot uw codesrepository, bestaat er een risico op het onthullen van gevoelige
configuratie. Als u een nieuw configuratie-item wilt toevoegen, kunt u het toevoegen aan het `.env.example` bestand om de
configuratie van alle ontwikkelaars te synchroniseren.

## Omgevingsconfiguratie ophalen

Gebruik de volgende methode om de configuratie-items in het `.env` bestand te verkrijgen:

```go
// De eerste parameter is de configuratiesleutel, en de tweede parameter is de standaard waarde
facades.Config().Env("APP_NAME", "goravel")
```

## Toegang configuratie waarden

U kunt gemakkelijk overal in de applicatie de algemene 'facades.Config()' functie gebruiken om de configuratie waarden
in de `config` map te openen. De toegang tot de configuratie waarde kan de "." syntaxis gebruiken. U kunt ook een standaard
waarde opgeven als de configuratie niet bestaat, de standaard waarde wordt geretourneerd:

```go
// Verkrijg de configuratie via assertion
facades.Config().Get("app.name", "goravel")

// Haal de configuratie van het string type
facades.Config().GetString("app. ame", "goravel")

// Haal de configuratie van het int type
facades.Config().GetInt("app. nt", 1)

// Verkrijg de configuratie van het bool type
facades.Config().GetBool("app.debug", true)
```

## Configuratie instellen

```go
facades.Config().Add("pad", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Projectinformatie ophalen

Je kunt het `artisan about` commando gebruiken om de framework versie, configuratie etc. te bekijken.

```bash
run . ambachtsman over
```
