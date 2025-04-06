# Поставщики услуг

Самое главное в процессе загрузки ядра — загрузить `ServiceProvider`. All `ServiceProvider` under the
application are configured in the `providers` array in  `config/app.go`.

Во-первых, ядро вызовет метод `Register` всех поставщиков услуг. После того, как все провайдеры услуг были
зарегистрированы, ядро вызовет метод `Boot` для всех `ServiceProvider` снова.

Ключом к жизненному циклу Горавеля является `ServiceProvider`. They enable the framework to contain various components,
such as routing, database, queue, cache, etc.

Вы также можете настроить своего собственного провайдера, он может быть сохранен в разделе `app/providers` и зарегистрирован в массиве `providers`
в файле `config/app.go`.

Фреймворк поставляется с пустой службой `app/providers/app_service_provider.go`, где вы можете реализовать простую логику загрузки
. В более крупных проектах у вас есть возможность создать новых поставщиков услуг для более точного контроля.
