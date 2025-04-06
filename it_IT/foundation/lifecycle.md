# Richiedi Ciclo Di Vita

Il file `main.go` serve come punto di entrata per tutte le richieste nell'applicazione Goravel. Utilizza la funzione
`bootstrap.Boot()` per inizializzare il framework.

Quindi un'istanza Goravel viene creata da `app := foundation.NewApplication()` in `bootstrap/app.go`.

Dopo di che, usa `app.Boot()` per caricare il [Service Provider](providers) registrato, e `config.Boot()` per
caricare i file di configurazione sotto la cartella di configurazione.

Infine, avvia il server HTTP usando `facades.Route().Run(facades.Config().GetString("app.host"))` in `main.go`.
