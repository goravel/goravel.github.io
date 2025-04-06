# Struttura Cartella

La struttura predefinita del file può farti meglio iniziare l'avanzamento del progetto, e puoi anche aggiungere nuove cartelle liberamente, ma
non modificare le cartelle predefinite.

## Directory Radice

### `app` Directory

`app` contiene il codice principale del programma. Quasi tutta la logica del programma sarà in questa cartella.

### `bootstrap` Directory

La directory `bootstrap` contiene il file di avvio `app.go`.

### `config` Directory

La directory `config` contiene tutti i file di configurazione dell'applicazione. È meglio esplorare questi file e
familiarizzare con tutte le opzioni disponibili.

### `database` Directory

La directory `database` contiene file di migrazione del database.

### `public` Directory

La directory `public` contiene alcune risorse statiche, come immagini, certificati, ecc.

### `resources` Directory

La directory `resources` contiene la tua [views](../basic/views) e le tue risorse grezze e non compilate come
CSS o JavaScript.

### `routes` Directory

La directory `routes` contiene tutte le definizioni degli itinerari dell'applicazione.

### `storage` Directory

La directory `storage` contiene la directory `logs` e la directory `logs` contiene i file di log dell'applicazione.

### `tests` Directory

The `tests` directory contains your automated tests.

## `app` Directory

### `console` Directory

The `console` directory contains all the custom `Artisan` commands of the application, and the console boot file
`kernel.go`, which can be registered in this file [Task Scheduling](../advanced/schedule)

### `http` Directory

The `http` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Web are processed here.

### `grpc` Directory

The `grpc` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Grpc are processed here.

### `models` Directory

The `models` directory contains all data models.

### `providers` Directory

The `providers` directory contains all [Service Providers](../foundation/providers) in the
program. The service provider guides the application to respond to incoming requests by binding services, registering
for events, or performing any other tasks.
