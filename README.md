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

### Business Requirement C - In Progress

- C.1: Basic authentication is partially implemented:
  - member account registration
  - login and logout
  - account/profile management
  - persistent local demo session
- C.2: Basic role-based access is implemented:
  - visitors can browse public services and activities
  - logged-in members can save My Plan items and submit activity registrations
  - admins can access the protected Admin area

Admin demo account:

- Email: `admin@silverlink.test`
- Password: `AdminPass123`

C.3 rating and the full C.4 security pass are planned for the next development stage.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
