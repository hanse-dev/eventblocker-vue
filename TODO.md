# Appointment Booking System

An appointment management system developed with Vue.js and SQLite.

## Technical requirements

- Frontend: Vue.js 3 with Webpack 5
- Backend: Node.js with Express
- Database: SQLite with Prisma
- Language: German

## Main functions

1. Admin area
  - [x] Create appointments
  - [x] Edit appointments
  - [x] Delete appointments
  - [x] Overview of all booked appointments
  - [ ] Calendar view of appointments

2. Public area
  - [x] Show available appointments
  - [x] Book appointments
  - [ ] Booking confirmation by email (optional)

## Technical to-do list

### Backend development
1. Basic structure
   - [x] Set up an Express.js server
   - [x] Set up a SQLite database
   - [x] Define API routes

2. Database Schema
   - [x] Create an events table with fields:
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
   - [x] GET /api/dates (all available dates)
   - [x] POST /api/dates (create new date)
   - [x] PUT /api/dates/:id (update date)
   - [x] DELETE /api/dates/:id (delete date)
   - [x] POST /api/dates/:id/book (book date)

### Frontend development
1. Project setup
   - [x] Initialize Vue.js project
   - [x] Set up router
   - [x] Set up state management (Pinia)
   - [x] Set up Bootstrap 5 for styling
   - [x] Configure Webpack

2. Admin Interface
  - [x] Login page
  - [x] Dashboard layout
  - [x] Form for creating appointments
  - [x] Appointment overview with filter options
  - [x] Display information for the bookers
  - [x] Appointment editing page
  - [x] Appointment deletion
  - [ ] Copy function
  - [ ] Export function

3. Public pages
   - [x] Start page with appointment overview
   - [x] Booking form
   - [x] Confirmation page

4. Components
   - [x] Appointment form
   - [x] Appointment list
   - [x] Booking dialog

## Next steps
1. [x] Set up a monorepo structure
2. [x] Complete frontend setup:
   - [x] Install and configure Vue Router
   - [x] Set up Pinia state management
   - [x] Install and configure Bootstrap 5
3. [x] Set up the backend structure:
   - [x] Configure SQLite database
   - [x] Install Prisma
   - [x] Create database models
   - [x] Set up initial API routes
4. [x] Implement the database schema
5. [x] Create the first API endpoints
6. [x] Create basic frontend layout and components

## Current Tasks
1. [ ] Implement calendar view for appointments
2. [ ] Add export functionality for appointments
3. [ ] Add copy function for appointments
4. [ ] Implement email confirmation system
5. [ ] Add more comprehensive error handling
6. [ ] Improve form validation
7. [ ] Add unit tests
8. [ ] Add end-to-end tests
9. [ ] Optimize performance
10. [ ] Improve accessibility
11. [ ] Add documentation
12. [ ] Add internationalization support
