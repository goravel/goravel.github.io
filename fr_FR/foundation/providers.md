# Fournisseurs de services

La chose la plus importante dans l'opération de démarrage du noyau est de charger le `ServiceProvider`. Tous les `ServiceProvider` sous l'application
sont configurés dans le tableau `providers` dans `config/app.go`.

Tout d'abord, le noyau appellera la méthode `Register` de tous les fournisseurs de services. After all service providers have been
registered, the kernel will call the `Boot` method of all `ServiceProvider` again.

Le `ServiceProvider` est la clé du cycle de vie de Goravel. Ils permettent au framework de contenir différents composants,
tels que le routage, la base de données, la file d'attente, le cache, etc.

Vous pouvez également personnaliser votre propre fournisseur, il peut être stocké dans `app/providers` et enregistré dans le tableau `providers`
dans `config/app.go`.

Le framework est livré avec un fournisseur de service vide `app/providers/app_service_provider.go` où vous pouvez implémenter une logique de démarrage simple
. Dans le cadre de grands projets, vous avez la possibilité de créer de nouveaux fournisseurs de services pour un contrôle plus précis.
