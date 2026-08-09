# SilverLink - FIT5032 Assignment 2

SilverLink is a Vue 3 web application for older adults, family supporters and carers. It helps users find local services, browse accessible community activities, save useful options and submit a guided activity registration form.

## Current Requirement Coverage

### Business Requirement A

- A.1: Built with Vue.js 3.
- A.2: Responsive design with layouts for mobile, tablet, desktop and wide desktop widths.

### Business Requirement B

- B.1: Input validation is implemented in the activity registration form:
  - required field validation
  - email format validation
  - phone number validation
  - activity selection validation
- B.2: Dynamic data is displayed from JavaScript data structures:
  - service listing data
  - event listing data
  - service filtering
  - saved My Plan items using Vue state and Local Storage

### Business Requirement C

- C.1: Basic authentication is implemented:
  - member account registration
  - login and logout
  - account/profile management
  - persistent local demo session
- C.2: Role-based access is implemented:
  - visitors can browse public services and activities
  - logged-in members can save My Plan items and submit activity registrations
  - admins can access the protected Admin area
- C.3: Rating is implemented:
  - members can rate individual services and activities
  - the app calculates and displays average ratings
  - admins can view submitted ratings
- C.4: Basic security measures are implemented:
  - no untrusted HTML rendering
  - user-entered text is sanitised before display/storage
  - rating scores and form data are validated
  - role-protected sections prevent unauthorised actions
  - demo passwords are stored as SHA-256 hashes instead of plain text

Admin demo account:

- Email: `admin@silverlink.test`
- Password: `AdminPass123`

## A3 Advanced Requirement Coverage

### Business Requirement D

- D.1: Firebase Authentication REST integration is prepared through `VITE_FIREBASE_API_KEY`.
- D.2: Email with attachment is handled through `netlify/functions/send-email.js`.
- D.3: Two interactive tables are implemented:
  - service directory table
  - activity registration table
  Both support sorting, global search, column search and pagination with a maximum of 10 rows per page.
- D.4: Netlify deployment configuration is included in `netlify.toml`.

### Business Requirement E

- E.1: Serverless functions are implemented for email and data export.
- E.2: Map and location features are implemented:
  - service/activity markers
  - category/search filtering
  - user-area simulation
  - nearest options and distance calculation
- E.3: Accessibility features include labelled controls, keyboard focus styles, skip link, high contrast mode and large text mode.
- E.4: Data export supports CSV download and a print-ready report that can be saved as PDF.

### Business Requirement F

Selected innovation features:

1. Admin dashboard with metrics and management tables.
2. Interactive service category chart.
3. Booking calendar for community activities.
4. Offline/PWA support with draft recovery.
5. Smart recommendation assistant.

## Optional Environment Variables

Create `.env` from `.env.example` when using external services:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
RESEND_API_KEY=your_resend_key
EMAIL_FROM="SilverLink <your-sender@example.com>"
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
