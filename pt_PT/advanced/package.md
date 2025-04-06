# Desenvolvimento de pacotes

As embalagens são a principal maneira de adicionar funcionalidade ao Goravel. Esses pacotes podem conter rotas, controladores e configurações
que são especificamente projetadas para melhorar um aplicativo do Goravel. Este guia se concentra no desenvolvimento de pacotes específicos de
Goravel.

Aqui está um exemplo para a construção de um pacote
terceiros: [goravel/exemplo-pacote](https://github.com/goravel/example-package)

## Criando um pacote

Você pode usar facilmente um template de pacote usando o comando Artisan:

```shell
ir executar . artisan fazer: pacote sms
```

Os arquivos criados são salvos por padrão na pasta raiz `pacotes`, você pode usar a opção `--root` para personalizar:

```shell
vá executar . artisan make:package --root=pkg sms
```

## Prestadores de serviços

[Service provider](../foundation/providers) atua como a ponte entre seu pacote e o Goravel.
Eles normalmente estão localizados na raiz do pacote como um arquivo `service_provider.go`. Sua função principal é vincular itens
ao contêiner de serviço de Goravel e guiar Goravel nos recursos do pacote de carregamento.

## Utilização

Registre o `ServiceProvider` do pacote em `config/app.go::providers`, depois exporte `facades` para a aplicação.
Para passos detalhados, consulte [goravel/exemplo-pacote](https://github.com/goravel/example-package).

## Recursos

### Configuração

Normalmente, você precisará publicar o arquivo de configuração do seu pacote no diretório `config` da aplicação. This will
allow users of your package to easily override your default configuration options. To allow your configuration files to
be published, call the `Publishes` method from the `Boot` method of your service provider, the first parameter is the
package name, and the second parameter is the mapping between the current package file path and the project path:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms.go"),
  })
}
```

### Rotas

Se houver [routes](../basic/routing) no seu pacote, você pode usar `app.MakeRoute()` para resolver
`facades.Route()`, depois adicionar as rotas ao projeto:

```go
func (receptor *ServiceProvider) Boot(app foundation.Application) {
 route := app.MakeRoute()
 route.Get("sms", ***)
}
```

### Migrações

Se houver [migrations](../orm/migrations) no seu pacote, você pode publicá-los pelo método `Publicações`:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "migrations": app.DatabasePath("migrations"),
  })
}
```

## Comandos

Você pode registrar o comando `Artisan` pelo método `Commands`, você pode executar os comandos
usando [Artisan CLI](../advanced/artisan) depois de registrá-los.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
 app.Commands([]console.Command{
  commands.NewSmsCommand(),
 })
}
```

## Ativos Públicos

Seu pacote pode ter ativos como JavaScript, CSS e imagens. Para publicar estes conteúdos no diretório `public`
do aplicativo, use o método `Publishes` do provedor de serviços:

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "public": app.PublicPath("vendor"),
  })
}
```

## Publicando Grupos de Arquivos

If you want to publish specific groups of package assets and resources separately, you can use tags when calling the
`Publishes` method from the package's service provider. Isso permite que você dê aos usuários a opção de publicar certos arquivos
, como arquivos de configuração, sem ter que publicar todos os arquivos do pacote. Para ilustrar, você pode definir dois
publicar grupos para o pacote `sms` (`sms-config` and `sms-migrations`) usando tags no método `Boot` do provedor de serviços
de pacote.

```go
func (receiver *ServiceProvider) Boot(app foundation.Application) {
  app.Publishes("github.com/goravel/example-package", map[string]string{
    "config/sms.go": app.ConfigPath("sms. o"),
  }, "sms-config")
  app.Publishes("github.com/goravel/exemplo-package", map[string]string{
    "migrations": app. atabasePath("migrações"),
  }, "sms-migrações")
}
```

## Publicar Recursos

No projeto, Você pode publicar os recursos registrados em um pacote usando o comando `vendor:publish` Artisan:

```shell
ir executar . artisan vendor:publish --package={You package name}
```

O comando pode usar as seguintes opções:

| Nome da Opção | Alias | Acão                                                                                                                                                                                                                                                                                            |
| ------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --pacote      | -O    | O nome do pacote, pode ser um pacote remoto: `github.com/goravel/example-package`, e também pode ser um pacote local: `. pacotes/exemplo-pacote-exemplo`, note que quando estiver usando um nome de pacote local, ele precisa começar com `./`. |
| Etiqueta      | -t    | Grupo de Recursos                                                                                                                                                                                                                                                                               |
| --force       | -no   | Sobrescrever quaisquer arquivos existentes                                                                                                                                                                                                                                                      |
| -existente    | -e    | Publicar e substituir apenas os arquivos que já foram publicados                                                                                                                                                                                                                                |
