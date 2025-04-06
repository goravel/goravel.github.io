# Furnizori de servicii

Cel mai important lucru din operația de pornire a nucleului este să încărcați `ServiceProvider`. Tot `ServiceProvider` sub aplicația
este configurat în array-ul `providers` din `config/app.go`.

În primul rând, nucleul va apela metoda `Register` a tuturor furnizorilor de servicii. After all service providers have been
registered, the kernel will call the `Boot` method of all `ServiceProvider` again.

`ServiceProvider` este cheia ciclului de viață al Goravel. Ele permit cadrului să conțină diferite componente,
cum ar fi rutarea, baza de date, coada, cache-ul, etc.

De asemenea, puteți personaliza propriul furnizor, acesta poate fi stocat la `app/providers` și înregistrat în `providers` array
în `config/app.go`.

Cadrul vine cu un furnizor de servicii `app/providers/app_service_provider.go` unde poți implementa logica simplă
de pornire. În proiectele mai mari, aveţi opţiunea de a crea noi furnizori de servicii pentru un control mai precis.
