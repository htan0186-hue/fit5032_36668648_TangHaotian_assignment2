# SilverLink Assignment 2 Project Analysis

## Project Direction

SilverLink is a Vue 3 web application for older adults, family supporters, carers, and administrators. The app helps users find local support services, browse accessible community activities, save useful options, register interest, rate services or events, and access help through simple digital and non-digital pathways.

The project should continue the Assignment 1 theme:

- Target users: adults aged 65+, older adults with mobility or digital-confidence limitations, and family supporters.
- Core value: one trusted, accessible hub for local services, social activities, practical guides, and contact options.
- Design priorities: plain language, large readable text, high contrast, clear labels, generous touch targets, keyboard access, printable or shareable information, and responsive layouts.

## Assessment Requirements Mapping

### Category A - Foundation

- A.1 Vue.js 3: Build the app with Vue 3 and a clean component structure.
- A.2 Responsive design: Support mobile and desktop widths, especially below 576px and above 1400px, with additional checks for 576-768px and 992-1200px.

### Category B - Validation And Dynamic Data

- B.1 Input validation: Include at least two validation types. Recommended:
  - required fields
  - email format
  - password length
  - confirm password match
  - rating range
- B.2 Dynamic data: Use JavaScript data structures and local persistence:
  - service listings
  - activity/event listings
  - registered users
  - saved plan items
  - ratings and reviews

### Category C - Authentication, Roles, Ratings, Security

- C.1 Authentication:
  - user registration
  - user login
  - account/profile management
- C.2 Role-based access:
  - visitor/guest: browse public services and events
  - member/user: save items, register interest, rate services/events
  - admin: manage service/event data and view dashboard
- C.3 Rating feature:
  - users rate a specific service or event
  - app calculates and displays average rating
- C.4 Security:
  - avoid `v-html` for untrusted content
  - sanitize user-entered display text
  - validate form data before saving
  - prevent unauthorized route access
  - avoid client-side API keys or sensitive secrets

### Category D - Advanced Features

Recommended implementation choices:

- D.1 External authentication: Firebase Authentication is the strongest fit if time permits.
- D.2 Email with attachment: Use an email API or serverless endpoint; for local demo, provide a controlled mock plus production-ready integration notes if needed.
- D.3 Interactive tables: Use at least two tables:
  - service directory table
  - users or event registrations table
  Each table should support sorting, search, per-column filtering, pagination, and max 10 rows per page.
- D.4 Cloud deployment: Deploy to a public hosting platform such as Cloudflare Pages, Firebase Hosting, Netlify, or Vercel.

### Category E - Higher Advanced Features

Recommended implementation choices:

- E.1 Serverless functions:
  - email sending endpoint
  - public data API endpoint
  - export/report generation endpoint
- E.2 Map features:
  - show service/event locations on a map
  - search/filter nearby locations or calculate distance
  - optionally show user location
- E.3 Accessibility:
  - WCAG 2.1 AA focused checks
  - labelled form controls
  - keyboard navigable menus/forms/tables
  - visible focus states
  - sufficient colour contrast
  - alt text for meaningful images
- E.4 Data export:
  - export services, registrations, ratings, or saved plan as CSV
  - optional PDF export for My Plan

### Category F - Innovation

Recommended four UX-focused innovation features:

1. Admin dashboard with summary cards and charts.
2. Appointment or activity booking calendar.
3. Offline-friendly features using Local Storage, draft recovery, and online/offline status.
4. AI-style helper or smart recommendation feature. If real API use is risky for submission, implement a transparent rule-based "guided assistant" and document future AI integration.

## Suggested App Pages

- Home: large entry points for services, activities, guides, and help.
- Find Support: filterable service cards and interactive service table.
- Service Detail: eligibility, cost, accessibility, contact, save, print, rate.
- Activities And Events: list/calendar view, filters, registration form.
- My Plan: saved services/events, notes, print/share/export.
- Guides And Safety: practical guides and online safety content.
- Family And Carers: supporter guidance and consent/privacy messaging.
- Help And Contact: phone help, contact form, language/accessibility options.
- Login/Register: authentication forms with validation.
- Account: user details, saved items, rating history.
- Admin Dashboard: restricted page for data summaries and management tables.

## Data Model Draft

- User:
  - id
  - name
  - email
  - passwordHash or demo password field
  - role
  - accessibilityPreferences
  - savedItemIds
- Service:
  - id
  - name
  - category
  - suburb
  - address
  - phone
  - cost
  - eligibility
  - accessibilityTags
  - verifiedDate
  - ratings
- Event:
  - id
  - title
  - category
  - date
  - location
  - capacity
  - accessibilityTags
  - registrationMethod
  - ratings
- Registration:
  - id
  - eventId
  - userId
  - name
  - email
  - phone
  - accessibilityNeeds
  - status
- Rating:
  - id
  - targetType
  - targetId
  - userId
  - score
  - comment
  - createdAt

## Phased Delivery Plan

### Phase 1 - Project Setup And Core Structure

- Create Vue 3 project.
- Add routing, base layout, responsive navigation, design tokens, and starter data.
- Build Home, Find Support, Activities, and Help pages.

### Phase 2 - A And B Requirements

- Complete responsive layouts.
- Add service/event dynamic rendering.
- Add form validation for registration/contact/login.
- Store useful state in Local Storage.

### Phase 3 - C Requirements

- Add registration/login/account flow.
- Add role-based route protection.
- Add user/admin roles.
- Add rating and average rating display.
- Add basic security measures around input handling and route access.

### Phase 4 - D Requirements

- Add external auth if selected.
- Add email with attachment through serverless/API integration or mockable service.
- Add two interactive data tables.
- Prepare production deployment.

### Phase 5 - E Requirements

- Add serverless functions.
- Add map view with at least two meaningful features.
- Add accessibility audit fixes.
- Add CSV/PDF export.

### Phase 6 - F Requirements And Submission Polish

- Implement four innovation features.
- Write research report.
- Fill submission template.
- Record demo video.
- Check GitHub commits, deployment URL, ZIP contents, and final rubric coverage.

## Initial Technical Recommendation

Use Vue 3 with Vite, Vue Router, Pinia or composables for state, Bootstrap or carefully written responsive CSS, and Local Storage for assignment-safe persistence. Firebase can be introduced later for external authentication and serverless functions if the project timeline allows it.

For fastest reliable progress, first implement A-C completely with high polish. Then add D-E-F features in controlled layers so the basic assignment remains stable even while advanced features are added.
