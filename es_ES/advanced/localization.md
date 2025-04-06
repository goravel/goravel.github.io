# Localización

Goravel's localization features provide a convenient way to retrieve strings in various languages, making it easy to
support multiple languages in your application. Las cadenas de idioma se almacenan en archivos en el directorio `lang`, y
Goravel soporta dos formas de organizar los archivos de idioma:

Cada idioma tiene su propio archivo:

```
/lang
  en.json
  cn.json
```

O, cuando hay demasiadas traducciones, pueden ser categorizadas:

```
/lang
  /es
    user.json
  /cn
    user.json
```

## Configurar la configuración regional

El idioma por defecto de la aplicación se almacena en la opción de configuración `locale` en el archivo de configuración `config/app.go`
. Puede modificar este valor según sea necesario para satisfacer los requisitos de su aplicación.

También puedes usar el método `SetLocale` proporcionado por la App Facade para modificar el idioma predeterminado para una única solicitud `HTTP`
en tiempo de ejecución:

```
facades.Route().Get("/", func(ctx http.Context) http.Response {
    facades.App().SetLocale(ctx, "en")

    return ctx.Response()
})
```

Puedes configurar un "suplemento secundario" que se utilizará cuando el idioma actual no contenga la cadena
dada. Como el idioma predeterminado, el idioma de reserva también está configurado en el archivo de configuración `config/app.go`.

```
"fallback_locale": "en",
```

### Determinar el idioma actual

You can use the `CurrentLocale` and `IsLocale` methods to determine the current `locale` or check if the `locale` is a
given value.

```
locale := facades.App().CurrentLocale(ctx)
if facades.App().IsLocale(ctx, "es") {}
```

### Definiendo cadenas de traducción

En los archivos de idioma, puede definir estructuras de un solo nivel o de varios niveles:

```
// lang/en.json
{
  "name": "It's your name",
  "required": {
    "user_id": "UserID is required"
  }
}
```

### Recuperando cadenas de traducción

Puede utilizar el método `facades.Lang(ctx).Get()` para recuperar las cadenas de traducción de los archivos de idioma. Si el archivo
de idioma contiene varios niveles, puede usar `. para conectarlos, y si el archivo de idioma está en múltiples niveles de carpetas
, puedes usar `/\` para conectarlos.

Por ejemplo:

```
// lang/en. son
{
  "name": "Es tu nombre",
  "required": {
    "user_id": "UserID es requerid"
  }
}

facades. ang(ctx).Get("name")
facades.Lang(ctx).Get("required.user_id")

// lang/es/role/user. son
{
  "name": "Es tu nombre",
  "required": {
    "user_id": "UserID es requerid"
  }
}

facades. ang(ctx).Get("role/user.name")
facades.Lang(ctx).Get("role/user.required.user_id")
```

#### Reemplazar parámetros en cadenas de traducción

Puede definir marcadores de posición en las cadenas de traducción. Todos los marcadores de posición tienen el prefijo `:`. Por ejemplo, puede utilizar un marcador de posición
para definir un mensaje bienvenido:

```
{
  "welcome": "Welcome, :name"
}
```

Para reemplazar marcadores de posición al recuperar una cadena de traducción, puedes pasar una opción de traducción con el mapa de reemplazo
como el segundo parámetro a las `facades. Método ang(ctx).Get()`:

```
facades.Lang(ctx).Get("welcome", translation.Option{
  Reemplazar: mapa[string]string{
    "name": "Goravel",
  },
})
```

#### Pluralización

La pluralización es un problema complejo porque las diferentes lenguas tienen varias reglas de pluralización. However, Goravel can
help you translate strings based on the pluralization rules you define. Al usar el carácter `|`, puedes diferenciar
entre las formas singulares y plurales de una cadena:

```
{
  "apples": "There is one apple|There are many apples"
}
```

Incluso puede crear reglas de pluralización más complejas especificando cadenas de traducción para múltiples rangos de valores:

```
{
  "apples": "{0} Hay ninguno |[1,19] Hay algunos|[20,*] Hay muchos"
}
```

Después de definir una cadena de traducción con opciones de pluralización, puedes usar el método `facades.Lang(ctx).Choice()` para obtener
recuperar la línea para un `count` dado. En este ejemplo, porque el contador es mayor que 1, se devuelve la forma plural de la cadena
de traducción:

```
facades.Lang(ctx).Choice("messages.apples", 10)
```

También puede definir los atributos del marcador de posición en las cadenas de pluralización. Al pasar un array como tercer parámetro al método
`facades.Lang(ctx).Choice()`, puedes reemplazar estos marcadores de posición:

```
"minutes_ago": "{1} :value hace minuto|[2,*] :value minutes ago",

facades.Lang(ctx).Choice("time.minutes_ago", 5, translation.Option{
  Reemplazar: map[string]string{
    "valor": "5",
  },
})
```
