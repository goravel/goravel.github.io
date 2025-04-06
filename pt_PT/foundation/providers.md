# Prestadores de serviços

A coisa mais importante na operação de inicialização do kernel é carregar o `ServiceProvider`. Todos os `ServiceProvider` sob o aplicativo
estão configurados no array `providers` em `config/app.go`.

Primeiro, o kernel chamará o método 'Registrar' de todos os provedores de serviços. After all service providers have been
registered, the kernel will call the `Boot` method of all `ServiceProvider` again.

O `ServiceProvider` é a chave para o ciclo de vida de Goravel. Eles permitem que o framework contenha vários componentes,
como roteamento, banco de dados, fila, cache, etc.

Você também pode personalizar seu próprio provedor, ele pode ser armazenado em `app/providers` e registrado no array `providers`
no `config/app.go`.

O framework vem com um provedor de serviço em branco `app/providers/app_service_provider.go` onde você pode implementar lógica
simples de boot. Em projetos maiores, você tem a opção de criar novos prestadores de serviços para um controlo mais preciso.
