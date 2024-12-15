# Termin-Buchungssystem (Appointment Booking System)

Ein Verwaltungssystem für Termine, entwickelt mit Vue.js und SQLite.

## Technische Anforderungen

- Frontend: Vue.js 3
- Backend: Node.js mit Express
- Datenbank: SQLite
- Sprache: Deutsch

## Hauptfunktionen

1. Admin-Bereich
   - [ ] Termine erstellen
   - [ ] Termine bearbeiten
   - [ ] Termine löschen
   - [ ] Übersicht aller gebuchten Termine
   - [ ] Kalenderansicht der Termine

2. Öffentlicher Bereich
   - [ ] Verfügbare Termine anzeigen
   - [ ] Termine buchen
   - [ ] Buchungsbestätigung per E-Mail (optional)

## Technische To-Do Liste

### Backend-Entwicklung
1. Grundstruktur
   - [ ] Express.js Server aufsetzen
   - [ ] SQLite Datenbank einrichten
   - [ ] API-Routen definieren

2. Datenbank-Schema
   - [ ] Termine-Tabelle erstellen mit Feldern:
     - ID
     - Titel
     - Datum
     - Startzeit
     - Dauer
     - Ort
     - Raum
     - Beschreibung
     - Status (verfügbar/gebucht)
     - Kontaktdaten des Buchenden
     - Preis
     - Sichtbarkeit
     - Maximalanzahl der Buchungen

3. API-Endpunkte
   - [ ] GET /api/termine (alle verfügbaren Termine)
   - [ ] POST /api/termine (neuen Termin erstellen)
   - [ ] PUT /api/termine/:id (Termin aktualisieren)
   - [ ] DELETE /api/termine/:id (Termin löschen)
   - [ ] POST /api/termine/:id/buchen (Termin buchen)

### Frontend-Entwicklung
1. Projekt-Setup
   - [ ] Vue.js Projekt initialisieren
   - [ ] Router einrichten
   - [ ] State Management (Pinia) einrichten
   - [ ] UI-Framework auswählen und einbinden (z.B. Vuetify)

2. Admin-Interface
   - [ ] Login-Seite (einfache Version)
   - [ ] Dashboard-Layout
   - [ ] Formular für Terminerstellung
   - [ ] Terminübersicht mit Filtermöglichkeiten
   - [ ] Information der Buchenden anzeigen
   - [ ] Terminbearbeitungsseite
   - [ ] Terminlöschungs
   - [ ] Kopierfunktion
   - [ ] Exportfunktion

3. Öffentliche Seiten
   - [ ] Startseite mit Terminübersicht
   - [ ] Buchungsformular
   - [ ] Bestätigungsseite

4. Komponenten
   - [ ] Termin-Formular
   - [ ] Termin-Liste
   - [ ] Buchungs-Dialog

## Nächste Schritte
1. Projekt-Setup durchführen
2. Grundlegende Backend-Struktur aufbauen
3. Datenbank-Schema implementieren
4. Erste API-Endpunkte erstellen
5. Frontend-Grundgerüst aufsetzen

## Spätere Erweiterungen
- Benutzerverwaltung
- E-Mail-Benachrichtigungen
- Wiederholende Termine
- Warteliste für ausgebuchte Termine
