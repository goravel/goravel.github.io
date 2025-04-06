# Pachet Dezvoltare

Pachetele sunt modalitatea principală de a adăuga funcționalitate la Goravel. Aceste pachete pot conține rute, controlori și configurații
care sunt special concepute pentru a îmbunătăți aplicația Goravel. Acest ghid se concentrează pe dezvoltarea de pachete
Goravelspecific .

Iată un exemplu pentru construirea unui pachet terț
: [goravel/exemplu](https://github.com/goravel/example-package)

## Crearea unui pachet

Puteți utiliza cu ușurință un șablon de pachet folosind comanda Artizan:

```shell
mergi să rulezi . artizan:package sms
```

Fişierele create sunt salvate în mod implicit în folderul rădăcină `pachete`, puteţi utiliza opţiunea `--root` pentru a personaliza:

```shell
mergi să rulezi . artizan:package --root=pkg sms
```

## Furnizori de servicii

[Furnizorii de servicii](../foundation/providers) acționează ca o punte de legătură între pachetul dvs. și Goravel.
Aceştia sunt de obicei localizaţi în rădăcina pachetului ca un fişier `service_provider.go`. Principala lor funcţie este să lege articolele
în containerul de servicii Goravel şi să ghideze Goravel la încărcarea resurselor pachetelor.

## Utilizare

Înregistrați `ServiceProvider` din pachet la `config/app.go::providers`, apoi exportați `facades` în aplicație.
Pentru pași detaliați, consultați [pachetul goravel/exemplu](https://github.com/goravel/example-package).

## Resurse

### Configurare

De obicei, va trebui să publicați fișierul de configurare al pachetului în folderul `config` al aplicației. This will
allow users of your package to easily override your default configuration options. Pentru a permite fișierelor de configurare să fie publicate cu
, apelați la metoda `Publishes` din metoda `Boot` a furnizorului de servicii, primul parametru este numele pachetului
, iar al doilea parametru este maparea dintre calea curentă a fișierului pachet și calea proiectului:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Rute

Dacă există [routes](../basic/routing) în pachet, puteți utiliza `app.MakeRoute()` pentru a rezolva problema
`facades.Route()`, apoi adăugați rutele la proiect:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migrații

Dacă există [migrations](../orm/migrations) în pachet, le puteți publica prin metoda `Publici`:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migration"),
  })
}
```

## Comenzi

Puteţi înregistra comanda `Artisan` după metoda `Commands`, puteţi executa comenzile
folosind [CLI-ul Artizanal](../advanced/artisan) după ce le înregistraţi.

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Bunuri Publice

Pachetul dumneavoastră poate avea elemente precum JavaScript, CSS și imagini. Pentru a publica aceste active în directorul `public`
al aplicaţiei, utilizaţi metoda `Publishes` a furnizorului de servicii:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Grupuri de fişiere publicate

Dacă doriți să publicați separat grupuri specifice de pachete de active și resurse, puteți utiliza etichete atunci când apelați metoda
`Publishes` de la furnizorul de servicii al pachetului. Acest lucru vă permite să oferiți utilizatorilor opțiunea de a publica anumite fișiere
, cum ar fi fișierele de configurare, fără a fi nevoie să publicați toate activele pachetului. Pentru a ilustra, poți defini două
publică grupuri pentru pachetul `sms-config` (`sms-config` și `sms-migrations`) folosind tag-uri în metoda `Boot` a furnizorului de servicii al pachetului
.

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/example-package", harta[string]string{
    "migration": aplicație. atabasePath("migrații"),
  }, "sms-migration")
}
```

## Publică resurse

În proiect, puteți publica resursele înregistrate într-un pachet folosind comanda Artisan `vendor:publish` :

```shell
mergi să rulezi . vendor:publish --package={You package name}
```

Comanda poate utiliza următoarele opțiuni:

| Nume Opțiune | Alias | Acțiune                                                                                                                                                                                                                                                                                                               |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --pachet     | -p    | Numele pachetului poate fi un pachet la distanţă: `github.com/goravel/exemplu-package`, şi de asemenea poate fi un pachet local: `. pachete/exemplu", reţineţi că atunci când se utilizează un nume local al pachetului, trebuie să înceapă cu `./\`. |
| --tag        | -T    | Grup de resurse                                                                                                                                                                                                                                                                                                       |
| --force      | -f    | Suprascrie orice fișier existent                                                                                                                                                                                                                                                                                      |
| --existente  | -e    | Publică şi suprascrie doar fişierele care au fost deja publicate                                                                                                                                                                                                                                                      |
