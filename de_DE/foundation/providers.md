# Diensteanbieter

Das Wichtigste an der Kernel-Boot-Operation ist, den `ServiceProvider` zu laden. Alle `ServiceProvider` unter der
Anwendung sind im `providers` Array in `config/app.go` konfiguriert.

Zuerst ruft der Kernel die `Register` Methode aller Diensteanbieter auf. Nachdem alle Dienstanbieter
registriert sind, ruft der Kernel erneut die `Boot`-Methode aller `ServiceProvider` auf.

Der "ServiceProvider" ist der Schlüssel zum Lebenszyklus von Goravel. Sie ermöglichen es dem Framework verschiedene Komponenten zu enthalten,
wie Routing, Datenbank, Warteschlange, Cache usw.

Du kannst auch deinen eigenen Provider anpassen. Er kann unter `app/providers` gespeichert und im `providers` array
in `config/app.go` registriert werden.

Das Framework wird mit einem leeren Dienstanbieter `app/providers/app_service_provider.go` ausgeliefert, wo du eine einfache
Boot-Logik implementieren kannst. Bei größeren Projekten haben Sie die Möglichkeit, neue Dienstleister für eine genauere Steuerung zu schaffen.
