# Configurare

Toate fişierele de configurare din Goravel framework sunt stocate în folderul `config`. Poți vedea instrucțiunile specifice
și să le configurezi flexibil în funcție de nevoile proiectului.

## Configurare mediu

Funcționarea aplicațiilor în diferite medii necesită, de obicei, configurații diferite. De exemplu, poate doriți să activați
modul de depanare local, dar nu aveți nevoie de el în mediul de producție.

Prin urmare, cadrul furnizează fișierul `.env.example` din directorul rădăcină. Trebuie să copiaţi acest fişier, să-l redenumiţi
la `.env` înainte de a începe dezvoltarea, şi să modificaţi elementele de configurare în `. fişierul nv` în funcţie de proiectul tău
are nevoie.

Ţineţi cont că ". fişierul nv nu ar trebui adăugat la controlul versiunii, pentru că atunci când colaborează mai multe persoane, dezvoltatorii
diferiți pot utiliza configurații diferite, iar configurațiile diferite de implementare a mediului sunt diferite.

În plus, dacă un intruder câștigă acces la depozitul de cod, există riscul de a expune configurația sensibilă
. Dacă doriţi să adăugaţi un nou element de configurare, îl puteţi adăuga în fişierul `.env.example` pentru a sincroniza configuraţia
a tuturor dezvoltatorilor.

## Recuperează Configurarea Mediului

Utilizaţi următoarea metodă pentru a obţine elementele de configurare în fişierul `.env`:

```go
// Primul parametru este cheia de configurare, iar al doilea parametru este valoarea implicită
facades.Config().Env("APP_NAME", "goravel")
```

## Valori de acces de configurare

Puteți utiliza cu ușurință funcția globală `facades.Config()` oriunde în aplicație pentru a accesa configurația valorilor
în folderul `config`. Accesul la valoarea de configurare poate folosi sintaxa "". Puteţi specifica, de asemenea, o valoare
implicită, dacă opţiunea de configurare nu există, valoarea implicită este returnată:

```go
// Obțineți configurația prin assertion
facades.Config().Get("app.name", "goravel")

// Obțineți configurația șirului de caractere de tip
facades.Config().GetString("app. ame", "goravel")

// Obține configurația de tip
faades.Config().GetInt("app. nt", 1)

// Obține configurația boolului tip
fațades.Config().GetBool("app.debug", true)
```

## Setare configurare

```go
facades.Config().Add("path", "value1")
facades.Config().Add("path.with.dot.case1", "value1")
facades.Config().Add("path.with.dot", map[string]any{"case3": "value3"})
```

## Obțineți informații proiect

Poți folosi comanda `artizan despre` pentru a vedea versiunea de cadru, configurarea, etc.

```bash
rulează . artizan despre
```
