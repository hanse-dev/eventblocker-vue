# Appointment Booking System

An appointment management system developed with Vue.js and SQLite.

## Technical requirements

- Frontend: Vue.js 3
- Backend: Node.js with Express
- Database: SQLite with Prisma
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
   - [x] Select and integrate UI framework (e.g. Vuetify)

2. Admin Interface
  - [x] Login page (simple version)
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
   - [x] Install and configure Vuetify
3. [x] Set up the backend structure:
   - [x] Configure SQLite database
   - [x] Install Prisma
   - [x] Create database models
   - [x] Set up initial API routes
4. [ ] Implement the database schema
5. [ ] Create the first API endpoints
6. [ ] Create basic frontend layout and components

## TODO List

## High Priority
- [ ] Test all API endpoints with error cases

## Medium Priority
- [ ] Add TypeScript support
- [ ] Add comprehensive documentation
- [ ] Add unit tests for components
- [ ] Add integration tests for API endpoints
- [ ] Add end-to-end tests
- [ ] Add proper logging system
- [ ] Implement rate limiting for API endpoints
- [ ] Add API documentation using Swagger/OpenAPI

## Low Priority
- [ ] Add dark mode support
- [ ] Add internationalization support
- [ ] Add accessibility improvements
- [ ] Add performance monitoring
- [ ] Add analytics tracking
- [ ] Add export functionality for appointments
- [ ] Add bulk operations for appointments

## Completed
- [x] Implement JWT authentication
- [x] Create centralized API service
- [x] Add notification system
- [x] Add loading states
- [x] Add input validation
- [x] Add proper error handling for network failures
- [x] Add loading indicators for all async operations
- [x] Implement input validation for all forms
- [x] Implement proper configuration management

## Future Features
- Calendar view for appointments
- Mobile app
- SMS notifications
- E-mail notifications
- Repeating appointments
- Waiting list for booked appointments
- User management
- Later extensions
