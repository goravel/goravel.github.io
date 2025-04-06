# Encriptación

Los servicios de cifrado de Goravel proporcionan una interfaz simple y cómoda para cifrar y descifrar texto a través de OpenSSL
usando el cifrado AES-256. Todos los valores cifrados de Goravel se firman usando un código de autenticación de mensaje (GMAC) para que
su valor subyacente no pueda ser modificado o manipulado una vez cifrado.

## Configuración

Before using Goravel's encrypter, you must set the `key` configuration option in your `config/app.go` configuration
file. Esta opción está impulsada por la variable de entorno `APP_KEY`. Utilice el `go run . El comando artisan key:generate` a
genera el valor de esta variable ya que el comando `key:generate` utilizará el generador seguro de bytes aleatorios de Golang para
crear una clave criptográfica segura para tu aplicación.

## Usando el Cifrado

### Cifrar un valor

Para cifrar un valor, puedes usar el método `EncryptString` en `facades.Crypt()`. Este método encripta valores usando el cifrado
OpenSSL y AES-256-GCM. Adicionalmente, todos los valores cifrados se firman con un código de autenticación de mensaje (GMAC)
para prevenir el descifrado por parte de usuarios maliciosos que intentan manipular los datos.

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### Descifrar un valor

Puedes usar el método `DecryptString` de `facades.Crypt()` para descifrar valores. Si el valor no puede ser correctamente
descifrado, por ejemplo cuando el código de autenticación del mensaje es inválido, se devolverá un error.

```go
str, err := facades.Crypt().DecryptString(secret)
```
