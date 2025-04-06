# Configuração

Todos os arquivos de configuração da estrutura do Goravel são armazenados no diretório `config`. Você pode visualizar instruções específicas
e configurá-las de forma flexível de acordo com as necessidades do projeto.

## Configuração do Ambiente

Aplicações em diferentes ambientes geralmente requerem configurações diferentes. Por exemplo, você pode querer
ativar o modo de depuração localmente, mas não precisa dele no ambiente de produção.

Portanto, o framework fornece o arquivo `.env.example` no diretório raiz. Você precisa copiar este arquivo, renomeá-lo de
para `.env` antes de você iniciar o desenvolvimento, e modificar os itens de configuração no `. arquivo nv` de acordo com seu projeto
necessário.

Note that the `.env` file should not be added to version control, because when multiple people collaborate, different
developers may use different configurations, and different deployment environment configurations are different.

Além disso, se um intruso ganhar acesso ao seu repositório de código, haverá o risco de expor uma configuração
sensível. Se você quiser adicionar um novo item de configuração, você pode adicioná-lo ao arquivo `.env.example` para sincronizar a configuração
de todos os desenvolvedores.

## Recuperar configuração de ambiente

Use o seguinte método para obter os itens de configuração no arquivo `.env`:

```go
// O primeiro parâmetro é a chave de configuração, e o segundo parâmetro é o valor padrão
facades.Config().Env("APP_NAME", "goravel")
```

## Valores de Acesso

Você pode facilmente usar a função global `facades.Config()` em qualquer lugar da aplicação para acessar os valores de configuração
no diretório `config`. O acesso ao valor de configuração pode usar a sintaxe "." . Você também pode especificar um valor padrão
, se a opção de configuração não existir, o valor padrão é retornado:

```go
// Obter a configuração através da asserção
facades.Config().Get("app.name", "goravel")

// Obter a configuração do tipo
facades.Config().GetString("app. ame", "goravel")

// Obter a configuração do tipo de int
facades.Config().GetInt("app. nt", 1)

// Obter a configuração do tipo bool
facades.Config().GetBool("app.debug", true)
```

## Definir Configuração

```go
facades.Config().Add("caminho", "valor1")
facades.Config().Add("path.with.dot.case1", "valor1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Obter informações do projeto

Você pode usar o comando `artisan about` para visualizar a versão da estrutura, configuração, etc.

```bash
vá executar . artisan sobre
```
