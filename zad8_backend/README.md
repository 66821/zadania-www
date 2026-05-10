# Zadanie 8 – Backend

Projekt pokazuje komunikację frontendu z backendem oraz zapis danych poza przeglądarką użytkownika.

## Uruchomienie

```bash
npm install
npm start
```

Następnie otwórz:

```txt
http://localhost:3000
```

## Gdzie trafiają dane?

Po wysłaniu formularza dane są wysyłane metodą POST na endpoint:

```txt
/api/contact
```

Serwer zapisuje je w pliku:

```txt
data/submissions.json
```

## Uwaga

Do folderu `public` skopiuj swoje zdjęcie z wcześniejszych zadań:

```txt
2026-03-15 23.48.12.jpg
```
