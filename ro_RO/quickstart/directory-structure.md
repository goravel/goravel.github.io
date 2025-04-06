# Structura Directoarelor

Structura implicită a fișierului vă poate face să începeți mai bine avansarea proiectului, și puteți adăuga dosare noi în mod liber, dar
nu modifica dosarele implicite.

## Director rădăcină

### Directorul `app`

`app` conţine codul de bază al programului. Aproape toată logica din program va fi în acest dosar.

### `bootstrap` Directory

Directorul `bootstrap` conţine fişierul de pornire framework `app.go`.

### `config` Director

Directorul `config` conţine toate fişierele de configurare ale aplicaţiei. Cel mai bine este să răsfoiţi prin aceste fişiere şi
familiarizaţi-vă cu toate opţiunile disponibile.

### Directorul `bază de date`

Directorul `bază de date` conţine fişierele de migrare din baza de date.

### `public` Director

Directorul `public` conţine unele resurse statice, cum ar fi imagini, certificate etc.

### `resources` Director

Directorul `resources` conține [views](../basic/views) precum și activele brute, neconcompilate, cum ar fi
CSS sau JavaScript.

### `routes` Director

Directorul `rute` conţine toate definiţiile rutelor aplicaţiei.

### Directorul `storage`

Directorul `storage` conţine folderul `logs`, iar folderul `logs` conţine fişierele jurnal ale aplicaţiei.

### Directorul `tests`

Directorul `tests` conţine testele automate.

## Directorul `app`

### Director `console`

Directorul `consolă` conţine toate comenzile personalizate `Artisan` ale aplicaţiei, şi fişierul de boot de consolă
\`kernel. o", care poate fi înregistrat în acest fişier [Task Scheduling](../advanced/schedule)

### Directorul `http`

Directorul `http` conţine controleri, middleware, etc., şi aproape toate cererile care introduc aplicaţia prin intermediul
Web sunt procesate aici.

### Directorul `grpc`

Directorul `grpc` conține controleri, middleware, etc., și aproape toate cererile care introduc aplicația prin intermediul
Grpc sunt procesate aici.

### Director `models`

Directorul `modele` conține toate modelele de date.

### `providers` Director

Directorul `furnizori` conţine toţi [furnizorii de servicii](../foundation/providers) în programul
. Furnizorul de servicii ghidează aplicația pentru a răspunde la cererile primite de la servicii de asociere, înregistrând
pentru evenimente sau efectuând orice alte sarcini.
