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

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
