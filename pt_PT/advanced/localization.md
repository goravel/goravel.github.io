# Traduções

Os recursos de localização de Goravels fornecem uma maneira conveniente para recuperar textos em vários idiomas, facilitando o
suporte a vários idiomas em seu aplicativo. Sequências de idiomas são armazenadas em arquivos no diretório `lang` e
Goravel suporta duas maneiras de organizar arquivos de idioma:

Cada idioma tem seu próprio arquivo:

```
/lang
  en.json
  cn.json
```

Ou, quando há muitas traduções, elas podem ser categorizadas:

```
/lang
  /en
    user.json
  /cn
    user.json
```

## Configurando a localidade

O idioma padrão da aplicação é armazenado na opção de configuração `locale` no arquivo de configuração `config/app.go`.
Você pode modificar este valor conforme o necessário para atender aos requisitos da sua aplicação.

Você também pode usar o método `SetLocale` fornecido pela Facade de Aplicativos para modificar a língua padrão para um único `HTTP`
pedido no tempo de execução:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

Você pode configurar uma "falha" que será usada quando o idioma atual não contém a tradução
dada string A. Como o idioma padrão, o idioma de retorno também está configurado no arquivo de configuração `config/app.go`.

```
"fallback_locale": "en",
```

### Determinar a localidade atual

Você pode usar os métodos `CurrentLocale` e `IsLocale` para determinar o atual `locale` ou verificar se o `locale` é um valor
dado.

```
localidade := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "pt") {}
```

### Definindo frases de tradução

Em arquivos de idioma, você pode definir estruturas de nível único ou multi-nível:

```
// lang/en.json
{
  "name": "É o seu nome",
  "required": {
    "user_id": "UserID é necessário"
  }
}
```

### Recuperando frases de tradução

Você pode usar o método `facades.Lang(ctx).Get()` para recuperar sequências de caracteres de tradução dos arquivos de idioma. If the language
file contains multiple levels, you can use `.` to connect them, and if the language file is in multiple levels of
folders, you can use `/` to connect them.

Por exemplo:

```
// lang/en. son
{
  "name": "É seu nome",
  "required": {
    "user_id": "UserID é obrigatório"
  }
}

facades. ang(ctx).Get("nome")
facades.Lang(ctx).Get("required.user_id")

// lang/en/role/user. son
{
  "name": "É o seu nome",
  "required": {
    "user_id": "UserID é obrigatório"
  }
}

facades. ang(ctx).Get("papel/user.name")
facades.Lang(ctx).Get("papel/user.required.user_id")
```

#### Substituindo parâmetros nas frases de tradução

Você pode definir espaços reservados na tradução de frases. Todos os espaços reservados possuem o prefixo `:`. Por exemplo, você pode usar um espaço reservado
para definir uma mensagem de boas-vindas:

```
{
  "bemvindo": "Bem-vindo(a), :name"
}
```

Para substituir espaços reservados ao recuperar uma frase de tradução, você pode passar uma opção de tradução com o mapa
de substituição como o segundo parâmetro para as `facades. ang(ctx).Get()` método:

```
facades.Lang(ctx).Get("bem-vindo", translation.Option{
  Replace: mapa[string]string{
    "name": "Goravel",
  },
})
```

#### Pluração

A pluralização é um problema complexo, porque as diferentes línguas têm várias regras de pluralização. No entanto, Goravel pode
ajudá-lo a traduzir sequências de caracteres com base nas regras de pluralização que você definiu. Usando o caracter `£`, você pode diferenciar
entre as formas singulares e plurais de uma string:

```
{
  "maçã": "Há uma maçã... Há muitas maçãs"
}
```

Você pode até mesmo criar regras de pluralização mais complexas especificando sequências de caracteres de tradução para múltiplas faixas de valor:

```
{
  "maçã": "{0} Não há nenhum![1,19] Existem algumas,*] Existem muitos"
}
```

Depois de definir uma string de tradução com opções de pluralização, você pode usar o método `facades.Lang(ctx).Choice()` para
recuperar a linha por um dado `count`. Neste exemplo, porque a contagem é maior que 1, a forma plural da frase de tradução
é retornada:

```
facades.Lang(ctx).Choice("mensagens.maçãs", 10)
```

Você também pode definir atributos de espaço reservado na pluralização de frases. Passando um array como terceiro parâmetro para o método
`facades.Lang(ctx).Choice()`, você pode substituir esses placeholders:

```
"minutes_ago": "{1} :value minuto agoe,[2,*] :valor minutos atrás",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Replace: map[string]string{
    "value": "5",
  },
})
```
