# Appointment Booking System

An appointment management system developed with Vue.js and SQLite.

## Technical requirements

- Frontend: Vue.js 3
- Backend: Node.js with Express
- Database: SQLite
- Language: German

## Main functions

1. Admin area
  - [ ] Create appointments
  - [ ] Edit appointments
  - [ ] Delete appointments
  - [ ] Overview of all booked appointments
  - [ ] Calendar view of appointments

2. Public area
  - [ ] Show available appointments
  - [ ] Book appointments
  - [ ] Booking confirmation by email (optional)

## Technical to-do list

### Backend development
1. Basic structure
   - [x] Set up an Express.js server
   - [ ] Set up a SQLite database
   - [ ] Define API routes

2. Database Schema
   - [ ] Create an events table with fields:
     - ID
     - Title
     - Date
     - Start time
     - Duration
     - Location
     - Room
     - Description
     - Status (available/booked)
     - Contact details of the booker
     - Price
     - Visibility
     - Maximum number of bookings

3. API endpoints
   - [ ] GET /api/dates (all available dates)
   - [ ] POST /api/dates (create new date)
   - [ ] PUT /api/dates/:id (update date)
   - [ ] DELETE /api/dates/:id (delete date)
   - [ ] POST /api/dates/:id/book (book date)

### Frontend development
1. Project setup
   - [x] Initialize Vue.js project
   - [ ] Set up router
   - [ ] Set up state management (Pinia)
   - [ ] Select and integrate UI framework (e.g. Vuetify)

2. Admin Interface
  - [ ] Login page (simple version)
  - [ ] Dashboard layout
  - [ ] Form for creating appointments
  - [ ] Appointment overview with filter options
  - [ ] Display information for the bookers
  - [ ] Appointment editing page
  - [ ] Appointment deletion
  - [ ] Copy function
  - [ ] Export function

3. Public pages
   - [ ] Start page with appointment overview
   - [ ] Booking form
   - [ ] Confirmation page

4. Components
   - [ ] Appointment form
   - [ ] Appointment list
   - [ ] Booking dialog

## Next steps
1. [x] Set up a monorepo structure
2. [ ] Complete frontend setup:
   - Install and configure Vue Router
   - Set up Pinia state management
   - Install and configure Vuetify
3. [ ] Set up the backend structure:
   - Configure SQLite database
   - Create database models
   - Set up initial API routes
4. [ ] Implement the database schema
5. [ ] Create the first API endpoints
6. [ ] Create basic frontend layout and components

## Later extensions
- User management
- E-mail notifications
- Repeating appointments
- Waiting list for booked appointments
