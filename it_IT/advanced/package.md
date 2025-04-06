# Sviluppo Pacchetto

I pacchetti sono il modo principale di aggiungere funzionalità a Goravel. Questi pacchetti possono contenere percorsi, controller e configurazioni
specificamente progettate per migliorare un'applicazione Goravel. Questa guida si concentra sullo sviluppo di pacchetti
Goravel-specifici.

Ecco un esempio per costruire un pacchetto
di terze parti: [goravel/example-package](https://github.com/goravel/example-package)

## Creare Un Pacchetto

È possibile creare facilmente un modello di pacchetto utilizzando il comando Artigiano:

```shell
go run . artigiano make:package sms
```

I file creati sono salvati per impostazione predefinita nella cartella `packages` root, puoi usare l'opzione `--root` per personalizzare:

```shell
go run . artisan make:package --root=pkg sms
```

## Fornitori Di Servizi

[Service providers](../foundation/providers) funge da ponte tra il tuo pacchetto e Goravel.
In genere si trovano nella radice del pacchetto come file `service_provider.go`. La loro funzione principale è quella di legare gli elementi
nel contenitore di servizio di Goravel e guidare Goravel nel caricamento delle risorse del pacchetto.

## Utilizzo

Registra il `ServiceProvider` nel pacchetto in `config/app.go::providers`, quindi esporta `facades` nell'applicazione.
Per i passaggi dettagliati, fare riferimento a [goravel/example-package](https://github.com/goravel/example-package).

## Risorse

### Configurazione

In genere, dovrai pubblicare il file di configurazione del tuo pacchetto nella directory `config` dell'applicazione. This will
allow users of your package to easily override your default configuration options. Per consentire la pubblicazione dei file di configurazione
, chiama il metodo `Publishes` dal metodo `Boot` del tuo fornitore di servizi, il primo parametro è il nome del pacchetto
, e il secondo parametro è la mappatura tra il percorso del file del pacchetto corrente e il percorso del progetto:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Itinerari

Se ci sono [routes](../basic/routing) nel tuo pacchetto, puoi usare `app.MakeRoute()` per risolvere
`facades.Route()`, quindi aggiungi i percorsi al progetto:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migrazioni

Se ci sono [migrations](../orm/migrations) nel tuo pacchetto, puoi pubblicarli con il metodo `Publishes`:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Comandi

Puoi registrare il comando `Artisan` con il metodo `Commands`, puoi eseguire i comandi
usando [CLI](../advanced/artisan) dopo averli registrati.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Attività Pubbliche

Il tuo pacchetto può avere risorse come JavaScript, CSS e immagini. Per pubblicare questi asset nella directory `public`
dell'applicazione, utilizza il metodo `Publishes` del provider di servizi:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Pubblicazione Gruppi Di File

Se si desidera pubblicare gruppi specifici di risorse e risorse del pacchetto separatamente, puoi usare i tag quando chiami il metodo
`Publishes` dal provider di servizi del pacchetto. Questo ti permette di dare agli utenti la possibilità di pubblicare alcuni file
, come i file di configurazione, senza dover pubblicare tutti gli asset del pacchetto. Per illustrare, puoi definire due gruppi
per il pacchetto `sms` (`sms-config` e `sms-migrations`) usando tag nel metodo `Boot` del provider di servizi
.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app. atabasePath("migrazioni"),
  }, "sms-migrations")
}
```

## Pubblica Risorse

Nel progetto, è possibile pubblicare le risorse registrate in un pacchetto utilizzando il comando Artigianale `vendor:publish`:

```shell
go run . artisan vendor:publish --package={You package name}
```

Il comando può utilizzare le seguenti opzioni:

| Nome Opzione | Alias | Azione                                                                                                                                                                                                                                                                                                |
| ------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --package    | -p    | Il nome del pacchetto, può essere un pacchetto remoto: `github.com/goravel/example-package`, e può anche essere un pacchetto locale: `. packages/example-package`, notare che quando si utilizza un nome di pacchetto locale, deve iniziare con `./`. |
| --tag        | -t    | Gruppo Risorse                                                                                                                                                                                                                                                                                        |
| --force      | -f    | Sovrascrivi qualsiasi file esistente                                                                                                                                                                                                                                                                  |
| --existing   | -e    | Pubblica e sovrascrive solo i file che sono già stati pubblicati                                                                                                                                                                                                                                      |
