# Estrutura de diretórios

A estrutura do arquivo padrão pode fazer com que você inicie melhor o projeto e você também pode adicionar novas pastas livremente, mas
não modifique as pastas padrão.

## Diretório raiz

### Diretório `app`

`app` contém o código principal do programa. Quase toda a lógica do programa estará nesta pasta.

### `bootstrap` Directory

O diretório `bootstrap` contém o arquivo de inicialização do framework `app.go`.

### Diretório `config`

O diretório `config` contém todos os arquivos de configuração da aplicação. É melhor navegar por estes arquivos e
familiarizar-se com todas as opções disponíveis.

### Diretório `database`

O diretório `database` contém arquivos de migração de banco de dados.

### Diretório `public`

O diretório `público` contém alguns recursos estáticos, como imagens, certificados, etc.

### Diretório `resources`

O diretório `resources` contém o seu [views](../basic/views) bem como os arquivos raw, não compilados como
CSS ou JavaScript.

### Diretório `routes`

O diretório `routes` contém todas as definições de rota da aplicação.

### Diretório `storage`

O diretório `storage` contém o diretório `logs`, e o diretório `logs` contém os arquivos log do aplicativo.

### Diretório `tests`

O diretório `tests` contém seus testes automatizados.

## Diretório `app`

### Diretório `console`

O diretório `console` contém todos os comandos personalizados `Artisan` do aplicativo, e o arquivo de inicialização do console
`kernel. o`, que pode ser registrado neste arquivo [Agendamento de tarefas](../advanced/schedule)

### Diretório `http`

O diretório `http` contém controladores, middleware, etc., e quase todas as solicitações que entram no aplicativo através da Web
estão processadas aqui.

### Diretório `grpc`

The `grpc` directory contains controllers, middleware, etc., and almost all requests that enter the application via the
Grpc are processed here.

### Diretório `models`

O diretório `models` contém todos os modelos de dados.

### Diretório `providers`

O diretório `provedores` contém todos os [Provedores de Serviço](../foundation/providers) no programa
. O provedor de serviço guia o aplicativo a responder aos pedidos de entrada por meio de serviços vinculativos, registrando
para eventos ou executando outras tarefas.
