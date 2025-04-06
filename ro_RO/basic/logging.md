# Logare

Pentru a înțelege starea de funcționare a aplicației, Goravel oferă un serviciu de jurnal puternic care poate înregistra
mesaje din jurnal şi erori de sistem unui fişier sau altor canale prin \`faţades. oglinda()".

## Configurare

Pentru a configura diferite canale de jurnale, pot fi făcute configurări personalizate în `config/logging.go`.

`Goravel` foloseşte canalul `stack` pentru a înregistra jurnale în mod implicit, `stack` permite ca jurnalele să fie redirecţionate către canale multiple.

Configurația `print` în `single` și `zilnic` poate controla log-urile de pe consolă.

## Driver canal disponibil

| Nume     | Descriere               |
| -------- | ----------------------- |
| `stack`  | Permite canale multiple |
| `single` | Fişier jurnal unic      |
| `zilnic` | Un fișier jurnal pe zi  |
| `custom` | Unitate personalizată   |

### Injectare context

```go
fațades.Log().WithContext(ctx)
```

## Scrie mesaje din jurnal

```go
fațades.Log().Debug(mesaj)
facades.Log().Debugf(mesaj, args)
faades.Log().Info(mesaj)
facades.Log().Infof(mesaje, args)
faades.Log().Avertizare(mesaj)
faades.Log().Avertizare().Avertizare (mesaje, încărcare) fațade
. og().Error(message)
faades.Log().Errorf(mesaje, args)
faades.Log().fatal(mesaj)
faades.Log().Fatalf(mesaje, args)
faades.Log().Panic(mesaj)
faades.Log().Panicf(mesaj, args)
```

### Scrie într-un canal specific

Uneori, poate doriţi să înregistraţi mesaje într-un alt canal decât canalul implicit al aplicaţiei:

```go
fațades.Log().Channel("single").Info(mesaj)
```

Dacă doriţi să scrieţi pe mai multe canale în acelaşi timp, puteţi utiliza metoda `Stack`:

```go
fațades.Log().Stack([]string{"single", "slack"}).Info(message)
```

## Metode lanț

Goravel oferă metode de lanț convenabile, care facilitează inserarea unor informații mai utile în jurnal:

```go
fațades.Log().User("John").Debug(mesaj)
```

| Metodă     | Acțiune                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cod        | Setați un cod sau slug care descrie jurnalul. (Automatic Translation)                                                  |
| Sugestie   | Setează un indiciu pentru depanare mai rapidă.                                                                                            |
| În         | Setaţi categoria de caracteristici sau domeniu în care înregistrarea de jurnal este relevantă. (Automatic Translation) |
| Proprietar | Util în scopul alertării.                                                                                                                 |
| Solicitare | Furnizează o http.Request.                                                                                                |
| Răspuns    | Furnizează o http.Response.                                                                                               |
| Etichete   | Adăugați mai multe etichete, descriind funcția care returnează o eroare.                                                                  |
| Utilizator | Setaţi utilizatorul asociat cu însemnarea. (Automatic Translation)                                                     |
| Cu         | Adaugă perechi cheie-valoare în contextul intrării în jurnal.                                                                             |
| Retragere  | Adăugați informații stivuitor în însemnare.                                                                                               |

## Creează un canal personalizat

Dacă vrei să definești un canal complet personalizat, poți specifica tipul de șofer `custom` în fișierul de configurare `config/logging.go`Apoi include o opţiune `via` pentru a implementa o structură `framework\contracts\logger`:

```go
// config/logging.go
"custom": map[string]interface{}{
    "driver": "custom",
    "via": &CustomTest{},
},
```

### Instalare șofer

Pune în aplicare interfața `framework\contracts\logger`.

```go
// framework/contracts/log/Logger
package log

type Logger interface {
  // Handle pass canalul config path aici
  Handle(string canal) (Hook, error)
}
```

fișierele pot fi stocate în folderul `app/extensions` (modificabil). Exemplu:

```go
extensii de pachet

import (
  "fmt"

  "github. om/goravel/framework/contracts/log"
)

type Logger struct {
}

// Manipulează calea de configurare a canalului aici
func (logger *Logger) Handle(şin canal) (log. ook, error) {
  return &Hook{}, nil
}

type Hook struct {
}

// Nivel de monitorizare
func (h *Hook) Levels() []log. evel {
  return []log.Level{
    log. ebugLevel,
    log.InfoLevel,
    log.AveringLevel, log
    . rrorLevel,
    log.FatalLevel, log
    . anicLevel,
  }
}

// Fire logică executivă la declanșarea
func (hh *Hook) Fire(jurnal intrări. eroarea ntry) {
  fmt.Printf("context=%v level=%v time=%v message=%s", entry. ontext(), entry.Level(), entry.Time(), entry.Message())

  return nil
}
```
