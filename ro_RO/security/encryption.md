# Criptare

Serviciile de criptare Goravel oferă o interfață simplă, convenabilă pentru criptarea și decriptarea textului prin OpenSSL
folosind criptarea AES-256. Toate valorile criptate ale Goravel sunt semnate folosind un cod de autentificare a mesajelor (GMAC) astfel încât
valoarea lor de bază nu poate fi modificată sau falsificată odată criptată.

## Configurare

Înainte de a folosi criptorul Goravel, trebuie să setați opțiunea de configurare `key` în fișierul de configurare
`config/app.go`. Această opţiune este condusă de variabila de mediu `APP_KEY`. Foloseşte "mergi să alergi . artisan key:generate`command to
generate this variable's value since the`key:generate\` command will utilize Golang's secure random bytes generator to
create a secure cryptographic key for your application.

## Utilizarea Encrypterului

### Criptarea unei valori A

Pentru a cripta o valoare, puteți utiliza metoda `EncryptString` în `facades.Crypt()`. Această metodă criptează valorile folosind
OpenSSL şi AES-256-GCM cipher. Suplimentar, toate valorile criptate sunt semnate cu un cod de autentificare a mesajelor (GMAC)
pentru a preveni decriptarea de către utilizatorii răuvoitori care încearcă să manipuleze datele.

```go
secret, err := facades.Crypt().EncryptString("goravel")
```

### Decriptarea unei valori A

Puteți folosi metoda `DecryptString` din `facades.Crypt()` pentru a decripta valorile. Dacă valoarea nu poate fi corect
decriptată, cum ar fi atunci când codul de autentificare al mesajului este invalid, o eroare va fi returnată.

```go
str, err := facades.Crypt().DecryptString(secret)
```
