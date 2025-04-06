# Solicitar ciclo de vida

O arquivo `main.go` serve como o ponto de entrada para todas as requisições no aplicativo Goravel. Ele utiliza a função
`bootstrap.Boot()` para inicializar o framework.

Em seguida, uma instância do Goravel é criada por `app := foundation.NewApplication()` em `bootstrap/app.go`.

Depois disso, use o `app.Boot()` para carregar o [Provedor de Serviço](providers) registrado e `config.Boot()` para
carregar os arquivos de configuração sob o diretório de configuração.

Finalmente, inicie o servidor HTTP usando `facades.Route().Run(facades.Config().GetString("app.host"))` em `main.go`.
