# Utveckling av paket

Paket är det primära sättet att lägga till funktionalitet till Goravel. Dessa paket kan innehålla rutter, styrenheter och
konfigurationer som är speciellt utformade för att förbättra en Goravel applikation. Denna guide fokuserar på att utveckla
Goravel-specifika paket.

Här är ett exempel för att bygga ett
-paket från tredje part: [goravel/example-package](https://github.com/goravel/example-package)

## Skapar ett paket

Du kan enkelt skapa en paketmall med kommandot Artisan:

```shell
gå kör. hantverkare make:paket sms
```

De skapade filerna sparas som standard i rot`packages`-mappen, du kan använda `--root` alternativet för att anpassa:

```shell
gå springa . hantverkare make:package --root=pkg sms
```

## Tjänsteleverantörer

[Tjänsteleverantörer](../foundation/providers) fungerar som brygga mellan ditt paket och Goravel.
De finns vanligtvis i roten av paketet som en `service_provider.go`-fil. Deras huvudsakliga funktion är att binda
objekt till Gorfels servicebehållare och vägleda Goravel i inläsning av paketresurser.

## Användning

Registrera `ServiceProvider` i paketet till `config/app.go::providers`, exportera sedan `facades` till programmet.
För detaljerade steg, se [goravel/example-package](https://github.com/goravel/example-package).

## Resurser

### Konfiguration

Vanligtvis måste du publicera paketets konfigurationsfil till programmets `config`-katalog. Detta kommer
tillåta användare av ditt paket att enkelt åsidosätta dina standardinställningar. För att tillåta dina konfigurationsfiler till
ska publiceras, anropa `Publishes`-metoden från `Boot`-metoden för din tjänsteleverantör, den första parametern är paketnamnet
och den andra parametern är mappningen mellan den aktuella paketfilens sökväg och projektvägen:

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", karta[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Rutter

Om det finns [routes](../basic/routing) i ditt paket kan du använda `app.MakeRoute()` för att lösa
`facades.Route()`, lägg sedan till rutterna till projektet:

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migreringar

Om det finns [migrations](../orm/migrations) i ditt paket kan du publicera dem med `Publishes`-metoden:

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", karta[string]string{
    "migrationer": app.DatabasePath("migrationer"),
  })
}
```

## Kommandon

Du kan registrera `Artisan`-kommandot med `Commands`-metoden, du kan köra kommandona
med [Artisan CLI](../advanced/artisan) efter registrering av dem.

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  kommandon.NewSmsCommand(),
 })
}
```

## Offentliga tillgångar

Ditt paket kan ha tillgångar som JavaScript, CSS och bilder. För att publicera dessa tillgångar till applikationens `public`
-katalog, använd tjänsteleverantörens `Publicer`-metod:

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", karta[string]string{
    "public": app.PublicPath("leverantör"),
  })
}
```

## Publicerar filgrupper

Om du vill publicera specifika grupper av pakettillgångar och resurser separat, du kan använda taggar när du anropar
`Publishes`-metoden från paketets tjänsteleverantör. Detta låter dig ge användare möjlighet att publicera vissa
-filer, som konfigurationsfiler, utan att behöva publicera alla paketets tillgångar. För att illustrera, du kan definiera två
publicera grupper för `sms`-paketet (`sms-config` och `sms-migrations`) med hjälp av taggar i `Boot`-metoden för
-paketets tjänsteleverantör.

```go
func (receiver *Serviceleverantör) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", karta[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", karta[string]string{
    "migrationer": app. atabasePath("migrationer"),
  }, "sms-migrationer")
}
```

## Publicera resurser

I projektet kan du publicera de resurser som registrerats i ett paket med hjälp av kommandot `vendor:publish` Artisan:

```shell
kör . hantverkare säljare: publicera --package={You package name}
```

Kommandot kan använda följande alternativ:

| Alternativ namn | Alias | Åtgärd                                                                                                                                                                                                                                                                 |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --paket         | -s    | Paketnamn, kan vara ett fjärrpaket: `github.com/goravel/example-package`, och kan även vara ett lokalt paket: `. packages/example-package`, notera att när man använder ett lokalt paketnamn måste det börja med `./`. |
| --tagg          | -t    | Resursgrupp                                                                                                                                                                                                                                                            |
| --kraft         | -f    | Skriv över befintliga filer                                                                                                                                                                                                                                            |
| --befintlig     | -e    | Publicera och skriva över endast de filer som redan har publicerats                                                                                                                                                                                                    |
