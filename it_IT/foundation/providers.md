# Fornitori Di Servizi

La cosa più importante nell'operazione di avvio del kernel è caricare il `ServiceProvider`. Tutti i file `ServiceProvider` dell'applicazione
sono configurati nell'array `providers` in `config/app.go`.

In primo luogo, il kernel chiamerà il metodo `Register` di tutti i provider di servizi. Dopo aver registrato tutti i provider di servizi
, il kernel chiamerà nuovamente il metodo `Boot` di tutti i `ServiceProvider`.

Il `ServiceProvider` è la chiave del ciclo di vita di Goravel. Permettono al framework di contenere vari componenti,
come routing, database, coda, cache, ecc.

Puoi anche personalizzare il tuo provider, può essere memorizzato in `app/providers` e registrato nell'array
`providers` in `config/app.go`.

Il framework viene fornito con un provider di servizi vuoto `app/providers/app_service_provider.go` dove è possibile implementare la semplice logica di avvio
. Nei progetti più grandi, hai la possibilità di creare nuovi fornitori di servizi per un controllo più preciso.
