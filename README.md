# ViconiaCare – Ambulanter Pflegedienst App

Eine vollständige Web-App für den ambulanten Pflegedienst **ViconiaCare GmbH** gebaut mit:

- **Next.js 15** (App Router)
- **Payload CMS 3** (Headless CMS + Admin UI)
- **MongoDB Atlas** (Datenbank)
- **Tailwind CSS 3**
- **next-intl** (i18n: de, en, tr, ru, uk)
- **Resend** (Transactional Emails)

## Stack-Übersicht

| Schicht | Technologie |
|---|---|
| Frontend | Next.js 15, Tailwind CSS, Radix UI, Lucide Icons |
| CMS / Backend | Payload CMS 3 |
| Datenbank | MongoDB Atlas |
| Auth | Payload built-in + RBAC |
| i18n | next-intl (de, en, tr, ru, uk) |
| E-Mail | Resend |
| Karten | Leaflet + OpenRouteService |
| Kalender/Gantt | FullCalendar + React-Calendar-Timeline |
| Terminbuchung | Cal.com / Cal.eu |

## Erste Schritte

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. .env aus Vorlage anlegen
cp .env.example .env.local
# → .env.local befüllen (MongoDB URI, Payload Secret, etc.)

# 3. Entwicklungsserver starten
npm run dev
```

Die App läuft auf http://localhost:3000  
Das Payload Admin-Panel ist unter http://localhost:3000/admin erreichbar.

## Rollen (RBAC)

| Rolle | Rechte |
|---|---|
| `superadmin` | Voll-CRUD auf alle Ressourcen |
| `admin` | CRUD außer User-Management |
| `editor` | CRUD auf Inhalte/Content |
| `user` | Nur Lesen + eigene Dokumente hochladen |

## Module

- **Landingpage** – Ambulanter Pflegedienst ViconiaCare (Hero, Leistungen, Prozess, Team, Testimonials, Kontakt)
- **Terminbuchung** – Cal.com Integration (Ersttelefonat, Bedarfsanalyse)
- **Admin Dashboard** – KPIs, Patienten, Mitarbeiter
- **Patienten-Dashboard** – Dokumente, Arztberichte verwalten
- **Leistungserfassung** – SGB XI & SGB V konforme Abrechnung
- **Tourenplanung** – Gantt-Timeline + Karte (Leaflet + OpenRouteService)
- **Mitarbeiterverwaltung** – Lohnabrechnung
