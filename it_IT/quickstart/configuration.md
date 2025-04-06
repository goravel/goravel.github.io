# Configurazione

Tutti i file di configurazione del framework Goravel sono memorizzati nella directory `config`. È possibile visualizzare le istruzioni
specifiche e configurarle in modo flessibile in base alle esigenze del progetto.

## Configurazione Ambiente

L'esecuzione di applicazioni in ambienti diversi di solito richiede diverse configurazioni. Ad esempio, potresti voler attivare
la modalità Debug localmente, ma non ne hai bisogno nell'ambiente di produzione.

Pertanto, il framework fornisce il file `.env.example` nella directory principale. È necessario copiare questo file, rinominarlo
in `.env` prima di iniziare lo sviluppo, e modificare gli elementi di configurazione nel `. file nv` secondo le esigenze del tuo progetto
.

Nota che il `. il file nv` non dovrebbe essere aggiunto al controllo di versione, perché quando più persone collaborano, diversi sviluppatori
possono utilizzare configurazioni diverse, e diverse configurazioni di ambiente di distribuzione sono diverse.

Inoltre, se un intruso ottiene l'accesso al tuo repository di codice, ci sarà il rischio di esporre la configurazione
sensibile. Se vuoi aggiungere un nuovo elemento di configurazione, puoi aggiungerlo al file `.env.example` per sincronizzare la configurazione
di tutti gli sviluppatori.

## Recupera Configurazione Ambiente

Usa il seguente metodo per ottenere gli elementi di configurazione nel file `.env`:

```go
// Il primo parametro è la chiave di configurazione, e il secondo parametro è il valore predefinito
facades.Config().Env("APP_NAME", "goravel")
```

## Accedere Ai Valori Di Configurazione

Puoi facilmente utilizzare la funzione globale `facades.Config()` ovunque nell'applicazione per accedere ai valori di configurazione
nella directory `config`. L'accesso al valore di configurazione può utilizzare la sintassi "". È anche possibile specificare un valore predefinito
, se l'opzione di configurazione non esiste, viene restituito il valore predefinito:

```go
// Get the configuration through assertion
facades.Config().Get("app.name", "goravel")

// Get the configuration of the string type
facades.Config().GetString("app.name", "goravel")

// Get the configuration of the int type
facades.Config().GetInt("app.int", 1)

// Get the configuration of the bool type
facades.Config().GetBool("app.debug", true)
```

## Imposta Configurazione

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Ottieni Informazioni Sul Progetto

Puoi usare il comando `artisan about` per visualizzare la versione quadro, la configurazione, ecc.

```bash
vai a correre . artigiano circa
```
