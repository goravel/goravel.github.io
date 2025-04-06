# Instalare

## Cerințele serverului

- Golang >= 1.21

## Instalare

### Folosind Goravel Installer

Inițializați instalatorul în conformitate cu [documentation](https://github.com/goravel/installer) și apoi inițializați un nou proiect Goravel
folosind următoarea comandă:

```shell
// Introduceți directorul unde doriți să instalați blogul nou
goravel
```

### Instalare manuală

```shell
// Descarcă framework
git clone --depth=1 https://github.com/goravel/goravel.git && rm -rf goravel/. it*

// Instalează dependențe
cd goravel && mergi mod tidy

// Creează . fişierul de configurare de mediu
cp .env.example .env

// Generează aplicaţia cheie
mergi să rulezi . artizan:generate
```

## Pornește serviciul HTTP

### Începe serviciul conform fișierului .env în directorul rădăcină

```shell
mergi să fugi .
```

### Specificați fișierul .env pentru a porni serviciul

```shell
rulează . --env=./.env
```

### Începe serviciul folosind Variabile de Mediu

```shell
APP_ENV=production APP_DEBUG=true go go run .
```

### Live reload

Instalați [cosmtrek/air](https://github.com/cosmtrek/air), Goravel are un fișier de configurare încorporat, care poate fi folosit
direct:

```
aer
```

Dacă folosiți sistemul Windows, trebuie să modificați ".air. oml`fișier în directorul rădăcină și adaugă sufixul`.exe\`
la următoarele două linii:

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "go build -o ./storage/temp/main.exe ."
```

## Configurare

### Fișiere de configurare

Toate fisierele de configurare din Goravel framework sunt plasate in folderul `config`. Toate elementele de configurare au adnotări
, le poți ajusta în funcție de nevoile tale.

### Generare cheie aplicație

Trebuie să generați cheia aplicației după ce Goravel este instalat local. Rulând comanda de mai jos, un şir de caractere de 32 biţi
va fi generat pe tasta `APP_KEY` din fişierul `.env`. Această cheie este utilizată în principal pentru criptarea și decriptarea datelor.

```shell
mergi să rulezi . cheie artizan:generate
```

### Generează JWT Token

Trebuie să generați JWT Token dacă folosiți [Authentication](../security/authentication).

```shell
mergi să alergi . artizan jwt:secret
```
