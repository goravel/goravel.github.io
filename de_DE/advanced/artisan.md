# Artisan Console

Artisan ist das CLI-Werkzeug, das Goravel für die Interaktion mit der Kommandozeile enthält. Sie können darauf mit
`facades.Artisan()` zugreifen. Dieses Tool hat mehrere nützliche Befehle, die Ihnen bei der Entwicklung Ihrer Anwendung helfen können.
Benutzen Sie den folgenden Befehl, um alle verfügbaren Befehle anzuzeigen.

```shell
go run . Handwerksliste
```

Jeder Befehl hat auch eine "Hilfe"-Funktion, die die mit dem Befehl verbundenen Argumente und Optionen zeigt und erklärt. Um
den Hilfe-Bildschirm zu sehen, fügen Sie einfach "Hilfe" vor dem Befehlsnamen hinzu.

```shell
go run . Handwerkliche Hilfe migrieren
```

Anstatt zu wiederholen `go run . artisan ...` Befehl, du solltest einen Alias zu deiner Shell-Konfiguration mit dem
Terminal-Befehl unten hinzufügen:

```shell
echo -e "\r\nAlias artisan=\"go run . artisan\"" >>~/.zshrc
```

Dann kannst du einfach deine Befehle wie folgt ausführen:

```shell
artisan make:controller DemoController
```

Du kannst das `artisan` Shell-Skript wie folgt verwenden:

```shell
./Handwerksmake:Controller DemoController
```

### Generiere Befehle

Du kannst den Befehl `make:command` verwenden, um einen neuen Befehl im `app/console/commands` Verzeichnis zu erstellen. Keine Sorge, wenn
dieses Verzeichnis in deiner Anwendung nicht existiert, wird es beim ersten Aufruf des `make:command` Befehls erstellt:

```shell
go run . artisan make:command SendEmails
go run . artisan make:command user/SendEmails
```

### Befehlsstruktur

Nach der Generierung des Befehls weisen Sie den Unterschriften- und Beschreibungseigenschaften des Bauwerks geeignete Werte zu. Die
`Handle` Methode wird aufgerufen, wenn dein Befehl ausgeführt wird. Sie müssen Ihre Logik in diese Methode implementieren.

```go
-Paketbefehle

Import (
  "github.com/goravel/framework/contracts/console"
  "github. om/goravel/framework/contracts/console/command"
)

Typ SendEmails struct {
}

// Signatur Name und Signatur des Befehls Konsolen.
func (Empfänger *SendEmails) Signature() string {
  return "send:emails"
}

// Beschreibung Die Konsolenkommandobeschreibung.
func (Empfänger *SendEmails) Description() string {
  return "Send emails"
}

// Erweitern der Konsolen-Befehlserweiterung.
func (Empfänger *Senden) Extend() Befehl. xtend {
  return command.Extend{}
}

// Den Befehl der Konsole ausführen.
func (Empfänger *Senden) Handle(ctx console.Context) Fehler {
  return nil
}
```

## Befehls-I/O

### Retrieving Input

Wenn du Konsolenbefehle schreibst, ist es typisch, Benutzereingaben über `arguments` oder `options` zu sammeln. Mit Goravel, ist es
extrem einfach, die Argumente und Optionen des Benutzers abzurufen.

#### Argumente

Folgen Sie den Argumenten nach dem Befehl:

```shell
go run . Handwerksversand:emails NAME EMAIL
```

Get arguments:

```go
func (Empfänger *SendEmails) Handle(ctx console.Context) Fehler {
  name := ctx.Argument(0)
  email := ctx.Argument(1)
  all := ctx.Arguments()

  return nil
}
```

#### Optionen

Optionen, wie Argumente, sind eine andere Form der Benutzereingabe. Optionen werden von zwei Bindestrichen (--) vorgenommen, wenn sie über die Befehlszeile
bereitgestellt werden.

Definition：

```go
func (Empfänger *ListCommand) Extend() command.Extend {
  return command. xtend{
    Flags: []command.Flag{
      &Befehl. tringFlag{
        Name: "lang",
        Wert: "default",
        Aliases: []string{"l"},
        Verwendung: "Sprache für die Grüße",
      },
    },
  }
}
```

Erhalte：

```go
func (Empfänger *ListCommand) Handle(ctx console.Context) Fehler {
  lang := ctx.Option("lang")

  return nil
}
```

Nutzung：

```shell
go run . handwerkliche E-Mails --lang Chinesisch
go run . handwerkliche E-Mails -l Chinesisch
```

Hinweis: Wenn Sie Argumente und Optionen verwenden, definieren Sie die Optionen vor den Argumenten. Beispiel:

```shell
// Rechte
go run . Handwerks-E-Mails --lang=chinesischer Name
// Falsch
go run . Handwerks-E-Mails Name --lang=chinesischer Name
```

Außer `command.StringFlag`, können wir auch andere Typen `Flag` und `Option*`: `StringSliceFlag`, `BoolFlag`,
`Float64Flag`, `Float64SliceFlag`, `IntFlag`, `IntSliceFlag`, `Int64Flag`, `Int64SliceFlag`.

### Eingabeanfrage

#### Fragen stellen

Zusätzlich zu den Argumenten und Optionen können Sie den Benutzer auch zur Eingabe während der Ausführung eines Befehls auffordern. Die
`Ask` Methode wird den Benutzer mit der angegebenen Frage auffordern und seine Antwort zurückgeben:

```go
func (Empfänger *SendEmails) Handle(ctx console.Context) Fehler {
  email, err := ctx.Ask("Was ist deine E-Mail-Adresse?")
  
  return err
}
```

Zusätzlich können Optionen als optionales zweites Argument an die `Ask` Methode übergeben werden:

```go
func (Empfänger *SendEmails) Handle(ctx console.Context) Fehler {
    name, err := ctx.Ask("Wie ist dein Name?", Konsole. skOption{
        Standard: "Krishan",
    })
    

}

// Verfügbare Optionen
Typ AskOption struct {
    // Standardwert für die Eingabe.
    Standardstring
    // Beschreibung der Eingabebeschreibung.
    Description string
    // Zeilenanzahl für die Eingabe. für mehrere Zeilen verwenden)
    Zeilen int
    // Zeichenlimit für die Eingabe begrenzen.
    Limit int
    // Multiple ermittelt, ob die Eingabe eine Zeile oder mehrere Zeilen ist
    Multiple-Bool
    // Platzhalter für den Eingabe-Platzhalter.
    Platzhalter-String
    // Aufforderung an die Eingabeaufforderung. für eine einzelne Zeileneingabe verwenden)
    Eingabeaufforderung String
    // Validierung der Eingabe.
    Validate func(string) Fehler
}
```

Manchmal müssen Sie die Benutzereingabe ausblenden, z.B. wenn Sie nach einem Passwort fragen. You can use the `Secret` method to
hide the user input:

```go
func (Empfänger *SendEmails) Handle(ctx console.Context) Fehler {
    Passwort, err := ctx.Secret("Was ist das Passwort?", Konsole. ecretOption{
        Validate: func (s string) error {
            if len(s) < 8 {
                return errors. ew("Passwortlänge sollte mindestens 8")
            }
            Rückgabe Nil
        },
    })
    
    return err
}

// Verfügbare Optionen
Typ SecretOption struct {
    // Standardwert für die Eingabe.
    Standardstring
    // Beschreibung der Eingabebeschreibung.
    Beschreibung String
    // Beschränken Sie das Zeichenlimit für die Eingabe ein.
    Limitiert int
    // Platzhalter für den Eingabe-Platzhalter.
    Platzhalter-String
    // Prüfen Sie die Eingabevalidierung.
    Validate func(string) Fehler
}
```

#### Bestätigungsaktionen

Wenn du den Benutzer bitten musst, eine Aktion zu bestätigen, bevor du fortfährst, kannst du die `Confirm` Methode verwenden. Standardmäßig wird diese
-Methode `false` zurückgegeben, es sei denn, der Benutzer wählt affirmative Option.

```go
wenn antwortet, _ := ctx.Confirm("Möchten Sie fortfahren?"); !answer {
    // ...
}
```

Du kannst auch ein zweites Argument an die `Confirm`-Methode übergeben, um den Standardwert anzupassen, das Label der affirmativen und
negativen Buttons:

```go
wenn antwortet, _ := ctx.Confirm("Möchten Sie fortfahren?", Konsole. onfirmOption; ! nswer {
 Standard : true
 Affirmative : "Ja",
 Negativ : "Nein",
}) {
    // . .
}

// Verfügbare Optionen
Typ ConfirmOption struct {
    // Affirmative label for the affirmative button.
    Affirmativer String
    // Standardwert für die Eingabe.
    Standard-Bool
    // Beschreibung der Eingabebeschreibung.
    Beschreibung String
    // Negatives Label für den negativen Button.
    Negativer String
}
```

#### Einzelne Fragen auswählen

Wenn du den Benutzer bitten musst, eine Option aus einer Liste von Optionen auszuwählen, kannst du die `Choice`-Methode verwenden. Die `Choice`
Methode gibt den Wert der gewählten Option zurück:

```go
Frage := "Was ist deine bevorzugte Programmiersprache?"
Optionen := []Konsole. hoice{
    {Key: "go", Wert: "Go"},
    {Key: "php", Wert: "PHP"},
    {Key: "python", Wert: "Python"},
    {Schlüssel: "cpp", Wert: "C++", ausgewählt: true},
}
color, err := ctx. hoice(Frage, Optionen)
```

Zusätzlich können Optionen als optionales zweites Argument an die `Choice`-Methode übergeben werden:

```go
Frage := "Was ist deine bevorzugte Programmiersprache?"
Optionen := []Konsole. hoice{
    {Key: "go", Wert: "Go"},
    {Key: "php", Wert: "PHP"},
    {Key: "python", Wert: "Python"},
    {Schlüssel: "cpp", Wert: "C++", ausgewählt: true},
}

color, err := ctx. hoice(Frage, Optionen, Konsole. hoiceOption{
    Standard: "go",
})

// Verfügbare Optionen
Typ ChoiceOption struct {
    // Standardwert für die Eingabe.
    Standardstring
    // Beschreibung der Eingabebeschreibung.
    Beschreibung String
    // Prüfen Sie die Eingabevalidierung.
    Validate func(string) Fehler
}
```

#### Mehrere Fragen auswählen

Wenn du den Benutzer bitten musst, mehrere Optionen aus einer Liste von Optionen auszuwählen, kannst du die `MultiSelect`-Methode verwenden. Die
`MultiSelect` Methode gibt die Werte der gewählten Optionen zurück:

```go
Frage := "Was sind deine bevorzugten Programmiersprachen?"
Optionen := []Konsole. hoice{
    {Key: "go", Wert: "Go"},
    {Key: "php", Wert: "PHP"},
    {Key: "python", Wert: "Python"},
    {Schlüssel: "cpp", Wert: "C++", ausgewählt: true},
}
Farben, err := ctx. ultiSelect(Frage, Optionen)
```

Zusätzlich können Optionen als optionales zweites Argument an die `MultiSelect`-Methode übergeben werden:

```go
Frage := "Was sind deine bevorzugten Programmiersprachen?"
Optionen := []Konsole. hoice{
    {Key: "go", Wert: "Go"},
    {Key: "php", Wert: "PHP"},
    {Key: "python", Wert: "Python"},
    {Schlüssel: "cpp", Wert: "C++", ausgewählt: true},
}

Farben, err := ctx. ultiSelect(Frage, Optionen, Konsole. ultiSelectOption{
    Standard: []string{"go", "php"},
})

// Verfügbare Optionen
Typ MultiSelectOption struct {
    // Standardwert für die Eingabe.
    Standard []string
    // Beschreibung der Eingabebeschreibung.
    Beschreibung String
    // Filterbar bestimmt, ob die Auswahl gefiltert werden kann, gib `/` ein, um den Filter zu starten.
    Filterbarer Bool
    // Limitiert die Anzahl der auszuwählenden Auswahlen.
    Limit int
    // Validierung der Eingabe.
    Funktionsüberprüfung ([]string) Fehler
}
```

### Ausgabe schreiben

Manchmal müssen Sie die Ausgabe auf die Konsole schreiben. Goravel bietet verschiedene Methoden, um Ihnen beim Schreiben von
auf die Konsole zu helfen. Jede der Methoden hat ihre entsprechende farbige Ausgabe. Zum Beispiel wird `Error` den Text
rot anzeigen.

```go
func (Empfänger *SendEmails) Handle(ctx console.Context) Fehler {
  ctx. omment("Dies ist eine Kommentarnachricht")
  ctx.Info("Dies ist eine Infonachricht")
  ctx. rror("Dies ist eine Fehlermeldung")
  ctx.Line("Dies ist eine Zeilenmeldung")
  ctx. arning("Dies ist eine Warnmeldung")
  zurück Nil
}
```

Du kannst die `NewLine` Methode verwenden, um eine neue Zeile auf die Konsole zu schreiben:

```go
// Setzt eine einzelne Leerzeile
ctx.NewLine()

// mehrere Leerzeilen
ctx.NewLine(2)
```

#### Fortschrittsbalken

Bei langwierigen Aufgaben ist es oft hilfreich, dem Benutzer einen Hinweis darauf zu geben, wie lange die Aufgabe
dauern wird. Du kannst die `WithProgressBar` Methode verwenden, um einen Fortschrittsbalken anzuzeigen.

```go
items := []any{"item1", "item2", "item3"}
_, err := ctx.WithProgressBar(items, func(item any) error {
    // performTask(item)
    return nil
})
```

Manchmal müssen Sie den Fortschrittsbalken manuell aktualisieren. Du kannst die `CreateProgressBar` Methode verwenden, um die Fortschrittsleiste
zu aktualisieren:

```go
users := []string{"user1", "user2", "user3"}
bar := ctx.CreateProgressBar(len(users))

err := bar. tart()

für _, user := range users {
    // process user
    bar. dvance()
 
 // schlafen für eine Weile um die Verarbeitung 
    Zeit zu simulieren. leep(time.Millisecond * 50)
}

err = bar.Finish()
```

#### Spinner

Wenn du einen Spinner anzeigen musst, während eine Aufgabe ausgeführt wird, kannst du die "Spinner"-Methode verwenden.

```go
err := ctx.Spinner("Loading...", Konsole. pinnerOption{
    Action: func() error {
        // when to stop the spinner
        time. leep(2 * mal.zweit)
        zurück Nil
    },
})
```

## Kategorie

Sie können eine Reihe von Befehlen auf die gleiche Kategorie setzen, bequem in `go run . handwerkliche Liste`:

```go
// Erweitern der Konsolen-Befehl.
func (Empfänger *ConsoleMakeCommand) Extend() command.Extend {
  return command.Extend{
    Kategorie: "make",
  }
}
```

## Befehle registrieren

Alle Ihre Konsolenbefehle müssen innerhalb der `Commands` Funktion in `app\console\kernel.go` registriert werden.

```go
func (kernel Kernel) Commands() []console.Command {
  return []console.Command{
    &commands.SendEmails{},
  }
}
```

## Programme ausführen Befehle

Manchmal möchtest du einen Artisan-Befehl außerhalb des CLI ausführen, du kannst die `Call` Methode auf den
`Fassaden verwenden. rtisan()` um dies zu betreiben.

```go
facades.Route().Get("/", func(c *gin.Context) {
  facades.Artisan().Call("emails")
  facades.Artisan().Call("emails --lang Chinese name") // Mit Argumenten und Optionen
})
```
