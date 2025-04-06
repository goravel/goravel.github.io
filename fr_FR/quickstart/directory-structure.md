# Structure du répertoire

La structure de fichier par défaut peut vous aider à mieux démarrer l'avancement du projet, et vous pouvez également ajouter de nouveaux dossiers librement, mais
ne modifiez pas les dossiers par défaut.

## Répertoire racine

### Répertoire `app`

`app` contient le code de base du programme. Presque toute la logique du programme sera dans ce dossier.

### `bootstrap` Directory

Le dossier `bootstrap` contient le fichier de démarrage du framework `app.go`.

### Dossier `config`

Le dossier `config` contient tous les fichiers de configuration de l'application. Il est préférable de parcourir ces fichiers et
de vous familiariser avec toutes les options disponibles.

### Répertoire `database`

Le dossier `database` contient des fichiers de migration de base de données.

### Répertoire `public`

Le répertoire `public` contient des ressources statiques, telles que les images, les certificats, etc.

### Répertoire `resources`

Le répertoire `resources` contient votre [views](../basic/views) ainsi que vos ressources brutes non compilées telles que
CSS ou JavaScript.

### Répertoire `routes`

Le répertoire `routes` contient toutes les définitions de route de l'application.

### Répertoire `storage`

Le dossier `storage` contient le dossier `logs`, et le dossier `logs` contient les fichiers journaux de l'application.

### Répertoire `tests`

The `tests` directory contains your automated tests.

## Répertoire `app`

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
