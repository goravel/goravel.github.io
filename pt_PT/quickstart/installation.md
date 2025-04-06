# Instalação

## Requisitos do Servidor

- Golang >= 1.21

## Instalação

### Usando Goravel Installer

Inicialize o instalador de acordo com o [documentation](https://github.com/goravel/installer) e, em seguida, inicialize um novo projeto
Goravel usando o seguinte comando:

```shell
// Digite o diretório onde você deseja instalar o projeto
goravel novo blog
```

### Instalação manual

```shell
// Baixar framework
git clone --depth=1 https://github.com/goravel/goravel.git && rm -rf goravel/. it*

// Instale dependências
cd goravel && go mod tidy

// Crie . nv environment configuration file
cp .env.example .env

// Gera aplicação chave
go run . artisan key:generate
```

## Iniciar serviço HTTP

### Iniciar o serviço de acordo com o arquivo .env na pasta raiz

```shell
vá correr .
```

### Especificar o arquivo .env para iniciar o serviço

```shell
vá executar . --env=./.env
```

### Iniciar Serviço Usando Variáveis de Ambiente

```shell
APP_ENV=produção APP_DEBUG=verdadeiro é executado.
```

### Live reload

Instalar [cosmtrek/air](https://github.com/cosmtrek/air), Goravel tem um arquivo de configuração embutido que pode ser usado
diretamente:

```
ar
```

Se você estiver usando o sistema Windows, será necessário modificar o `.air. arquivo oml` no diretório raiz e adicione o sufixo `.exe`
para as seguintes duas linhas:

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "go build -o ./storage/temp/main.exe ."
```

## Configuração

### Arquivos de configuração

Todos os arquivos de configuração da estrutura do Goravel são colocados no diretório `config`. All configuration items have
annotations, you can adjust them according to your needs.

### Gerar chave da aplicação

Você precisa gerar a chave de aplicativo após o Goravel ser instalado localmente. Executando o comando abaixo, uma string 32-bit
será gerada na chave `APP_KEY` no arquivo `.env`. Essa chave é usada principalmente para criptografia de dados e descriptografia.

```shell
ir executar . artisan chave: gerar
```

### Gerar Token JWT

Você precisa gerar o Token JWT se usar [Authentication](../security/authentication).

```shell
ir executar . artisan jwt:secret
```
