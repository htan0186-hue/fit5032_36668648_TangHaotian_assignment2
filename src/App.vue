<template>
  <div class="app-shell" :class="{ 'large-text': accessibility.largeText, 'high-contrast': accessibility.highContrast }">
    <a class="skip-link" href="#top">Skip to main content</a>
    <header class="site-header">
      <nav class="nav-bar" aria-label="Main navigation">
        <a class="brand" href="#top" aria-label="SilverLink home">
          <span class="brand-mark" aria-hidden="true">S</span>
          <span>
            <strong>SilverLink</strong>
            <small>Local support, clearly explained</small>
          </span>
        </a>
        <div class="nav-links">
          <a href="#services">Find Support</a>
          <a href="#activities">Activities</a>
          <a href="#plan">My Plan</a>
          <a href="#account">Account</a>
          <a href="#ratings">Ratings</a>
          <a href="#advanced">A3 Tools</a>
          <a href="#map">Map</a>
          <a href="#innovation">Innovation</a>
          <a v-if="isAdmin" href="#admin">Admin</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="nav-account" aria-label="Account status">
          <span v-if="currentUser">Signed in as {{ currentUser.role }}</span>
          <a v-else href="#account">Sign in</a>
          <button v-if="currentUser" class="text-button" type="button" @click="logout">
            Log out
          </button>
        </div>
      </nav>
    </header>

    <main id="top">
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="hero-content">
          <p class="eyebrow">For older adults, families and carers</p>
          <h1 id="hero-title">Find trusted local help without searching everywhere.</h1>
          <p class="hero-copy">
            SilverLink brings support services, accessible activities and simple next
            steps together for older people who want to stay independent and connected.
          </p>
          <div class="hero-actions" aria-label="Primary actions">
            <a class="button primary" href="#services">Browse support</a>
            <a class="button secondary" href="#activities">View activities</a>
          </div>
        </div>

        <div class="hero-panel" aria-label="Today on SilverLink">
          <div class="panel-topline">
            <span>Today</span>
            <strong>{{ totalListings }} options available</strong>
          </div>
          <div class="support-illustration" aria-hidden="true">
            <div class="sun"></div>
            <div class="path"></div>
            <div class="person one"></div>
            <div class="person two"></div>
            <div class="bench"></div>
          </div>
          <ul class="quick-stats" aria-label="SilverLink summary">
            <li>
              <strong>{{ services.length }}</strong>
              <span>local services</span>
            </li>
            <li>
              <strong>{{ events.length }}</strong>
              <span>activities</span>
            </li>
            <li>
              <strong>{{ savedPlan.length }}</strong>
              <span>saved items</span>
            </li>
            <li>
              <strong>{{ users.length }}</strong>
              <span>demo users</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="section intro-grid" aria-label="SilverLink priorities">
        <article>
          <span class="icon-circle">A</span>
          <h2>Accessible by design</h2>
          <p>
            Large touch targets, clear labels, high contrast and simple page structure
            support people with low digital confidence.
          </p>
        </article>
        <article>
          <span class="icon-circle">B</span>
          <h2>Dynamic information</h2>
          <p>
            Services and activities are rendered from JavaScript data structures, then
            filtered and saved through Vue state.
          </p>
        </article>
        <article>
          <span class="icon-circle">✓</span>
          <h2>Guided forms</h2>
          <p>
            Registration and enquiry forms provide immediate validation feedback before
            anything is stored.
          </p>
        </article>
      </section>

      <section id="account" class="section account-section" aria-labelledby="account-title">
        <div class="section-heading">
          <p class="eyebrow">Account Access</p>
          <h2 id="account-title">Sign in to save, register and manage details</h2>
          <p>
            SilverLink includes Category C account registration, login, profile
            management and role-based access with verified session claims instead
            of trusting editable browser storage for roles.
          </p>
        </div>

        <div v-if="!currentUser" class="auth-layout">
          <form class="form-panel auth-card" novalidate @submit.prevent="login">
            <h3>Log in</h3>
            <p class="muted">Admin demo: admin@silverlink.test / AdminPass123</p>
            <label>
              <span>Email *</span>
              <input
                v-model.trim="loginForm.email"
                type="email"
                autocomplete="email"
                :aria-invalid="Boolean(authErrors.loginEmail)"
              />
              <small v-if="authErrors.loginEmail" class="error">{{ authErrors.loginEmail }}</small>
            </label>
            <label>
              <span>Password *</span>
              <input
                v-model="loginForm.password"
                type="password"
                autocomplete="current-password"
                :aria-invalid="Boolean(authErrors.loginPassword)"
              />
              <small v-if="authErrors.loginPassword" class="error">
                {{ authErrors.loginPassword }}
              </small>
            </label>
            <button class="button primary full" type="submit">Log in</button>
          </form>

          <form class="form-panel auth-card" novalidate @submit.prevent="registerUser">
            <h3>Create member account</h3>
            <p class="muted">New accounts are created with the member role.</p>
            <label>
              <span>Full name *</span>
              <input
                v-model.trim="registerForm.name"
                type="text"
                autocomplete="name"
                :aria-invalid="Boolean(authErrors.registerName)"
              />
              <small v-if="authErrors.registerName" class="error">
                {{ authErrors.registerName }}
              </small>
            </label>
            <label>
              <span>Email *</span>
              <input
                v-model.trim="registerForm.email"
                type="email"
                autocomplete="email"
                :aria-invalid="Boolean(authErrors.registerEmail)"
              />
              <small v-if="authErrors.registerEmail" class="error">
                {{ authErrors.registerEmail }}
              </small>
            </label>
            <label>
              <span>Password *</span>
              <input
                v-model="registerForm.password"
                type="password"
                autocomplete="new-password"
                :aria-invalid="Boolean(authErrors.registerPassword)"
              />
              <small v-if="authErrors.registerPassword" class="error">
                {{ authErrors.registerPassword }}
              </small>
            </label>
            <label>
              <span>Confirm password *</span>
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                autocomplete="new-password"
                :aria-invalid="Boolean(authErrors.confirmPassword)"
              />
              <small v-if="authErrors.confirmPassword" class="error">
                {{ authErrors.confirmPassword }}
              </small>
            </label>
            <button class="button primary full" type="submit">Create account</button>
          </form>

          <article class="form-panel auth-card external-auth-card">
            <h3>External authentication</h3>
            <p class="muted">
              Firebase Authentication REST integration for A3 BR D.1. Add
              <code>VITE_FIREBASE_API_KEY</code> in `.env` to enable the external provider.
            </p>
            <label>
              <span>Firebase email</span>
              <input
                v-model.trim="externalAuthForm.email"
                type="email"
                autocomplete="email"
                :aria-invalid="Boolean(authErrors.externalEmail)"
              />
              <small v-if="authErrors.externalEmail" class="error">
                {{ authErrors.externalEmail }}
              </small>
            </label>
            <label>
              <span>Firebase password</span>
              <input
                v-model="externalAuthForm.password"
                type="password"
                autocomplete="current-password"
                :aria-invalid="Boolean(authErrors.externalPassword)"
              />
              <small v-if="authErrors.externalPassword" class="error">
                {{ authErrors.externalPassword }}
              </small>
            </label>
            <button class="button secondary full" type="button" @click="externalFirebaseLogin">
              Continue with Firebase Auth
            </button>
          </article>
        </div>

        <div v-else class="account-dashboard">
          <article class="profile-summary">
            <span class="tag">{{ currentUser.role }}</span>
            <span class="tag subtle">{{ currentUser.authModeLabel }}</span>
            <h3>Welcome, {{ currentUser.name }}</h3>
            <p>{{ currentUser.email }}</p>
            <p class="muted">
              Your account controls access to saved plans, activity registration and
              role-specific tools. Admin access requires a verified session claim.
            </p>
          </article>

          <form class="form-panel profile-form" novalidate @submit.prevent="updateAccount">
            <h3>Manage account</h3>
            <label>
              <span>Display name *</span>
              <input
                v-model.trim="accountForm.name"
                type="text"
                autocomplete="name"
                :aria-invalid="Boolean(authErrors.accountName)"
              />
              <small v-if="authErrors.accountName" class="error">{{ authErrors.accountName }}</small>
            </label>
            <label>
              <span>Phone</span>
              <input v-model.trim="accountForm.phone" type="tel" autocomplete="tel" />
            </label>
            <label>
              <span>Accessibility preferences</span>
              <textarea
                v-model.trim="accountForm.preferences"
                rows="4"
                placeholder="Example: large-print information, phone reminders, step-free venues"
              ></textarea>
            </label>
            <button class="button primary full" type="submit">Update account</button>
          </form>
        </div>

        <p v-if="authMessage" class="success" role="status">{{ authMessage }}</p>
      </section>

      <section id="services" class="section feature-section" aria-labelledby="services-title">
        <div class="section-heading">
          <p class="eyebrow">Find Support</p>
          <h2 id="services-title">Browse local services</h2>
          <p>
            Filter services by category or suburb. Each result is generated from the
            SilverLink service dataset.
          </p>
        </div>

        <div class="filter-bar" aria-label="Service filters">
          <label>
            <span>Category</span>
            <select v-model="selectedCategory">
              <option value="All">All categories</option>
              <option v-for="category in serviceCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </label>
          <label>
            <span>Search suburb or service</span>
            <input
              v-model.trim="serviceSearch"
              type="search"
              placeholder="Try Clayton or transport"
              aria-label="Search services"
            />
          </label>
        </div>

        <div class="card-grid" aria-live="polite">
          <article v-for="service in filteredServices" :key="service.id" class="listing-card">
            <div class="card-header">
              <span class="tag">{{ service.category }}</span>
              <span>{{ service.suburb }}</span>
            </div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.summary }}</p>
            <dl class="details-list">
              <div>
                <dt>Cost</dt>
                <dd>{{ service.cost }}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{{ service.phone }}</dd>
              </div>
              <div>
                <dt>Verified</dt>
                <dd>{{ service.verifiedDate }}</dd>
              </div>
            </dl>
            <div class="chip-row" aria-label="Accessibility features">
              <span v-for="item in service.accessibility" :key="item">{{ item }}</span>
            </div>
            <div class="rating-summary" aria-label="Service rating summary">
              <strong>{{ getAverageRating('service', service.id) }}</strong>
              <span>{{ getRatingCount('service', service.id) }} ratings</span>
            </div>
            <form
              v-if="currentUser"
              class="rating-form"
              novalidate
              @submit.prevent="submitRating(service, 'service')"
            >
              <label>
                <span>Rate this service</span>
                <select
                  v-model.number="ratingForms[getRatingKey('service', service.id)].score"
                  :aria-invalid="Boolean(ratingErrors[getRatingKey('service', service.id)])"
                >
                  <option value="0">Choose rating</option>
                  <option v-for="score in ratingScale" :key="score" :value="score">
                    {{ score }} out of 5
                  </option>
                </select>
              </label>
              <label>
                <span>Optional comment</span>
                <input
                  v-model.trim="ratingForms[getRatingKey('service', service.id)].comment"
                  type="text"
                  maxlength="180"
                  placeholder="Short feedback"
                />
              </label>
              <small v-if="ratingErrors[getRatingKey('service', service.id)]" class="error">
                {{ ratingErrors[getRatingKey('service', service.id)] }}
              </small>
              <button class="button compact ghost" type="submit">Submit rating</button>
            </form>
            <button class="button compact" type="button" @click="saveItem(service, 'service')">
              Save to My Plan
            </button>
          </article>
        </div>

        <p v-if="filteredServices.length === 0" class="empty-state">
          No service matches that filter yet. Try another category or suburb.
        </p>
      </section>

      <section id="activities" class="section feature-section alt" aria-labelledby="activities-title">
        <div class="section-heading">
          <p class="eyebrow">Activities</p>
          <h2 id="activities-title">Register interest in community activities</h2>
          <p>
            Activity cards are dynamically rendered from event data. The registration
            form demonstrates required-field, email, phone and selection validation.
          </p>
        </div>

        <div class="activity-layout">
          <div class="activity-list">
            <article
              v-for="event in events"
              :key="event.id"
              class="event-card"
              :class="{ selected: registration.eventId === event.id }"
            >
              <div>
                <p class="date-pill">{{ formatDate(event.date) }} · {{ event.time }}</p>
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
                <p class="muted">{{ event.location }} · {{ event.places }} places</p>
                <div class="chip-row">
                  <span v-for="item in event.accessibility" :key="item">{{ item }}</span>
                </div>
                <div class="rating-summary" aria-label="Activity rating summary">
                  <strong>{{ getAverageRating('event', event.id) }}</strong>
                  <span>{{ getRatingCount('event', event.id) }} ratings</span>
                </div>
                <form
                  v-if="currentUser"
                  class="rating-form inline"
                  novalidate
                  @submit.prevent="submitRating(event, 'event')"
                >
                  <label>
                    <span>Rate this activity</span>
                    <select
                      v-model.number="ratingForms[getRatingKey('event', event.id)].score"
                      :aria-invalid="Boolean(ratingErrors[getRatingKey('event', event.id)])"
                    >
                      <option value="0">Choose rating</option>
                      <option v-for="score in ratingScale" :key="score" :value="score">
                        {{ score }} out of 5
                      </option>
                    </select>
                  </label>
                  <label>
                    <span>Optional comment</span>
                    <input
                      v-model.trim="ratingForms[getRatingKey('event', event.id)].comment"
                      type="text"
                      maxlength="180"
                      placeholder="Short feedback"
                    />
                  </label>
                  <small v-if="ratingErrors[getRatingKey('event', event.id)]" class="error">
                    {{ ratingErrors[getRatingKey('event', event.id)] }}
                  </small>
                  <button class="button compact ghost" type="submit">Submit rating</button>
                </form>
              </div>
              <div class="event-actions">
                <button class="button compact" type="button" @click="chooseEvent(event.id)">
                  Select
                </button>
                <button class="button compact ghost" type="button" @click="saveItem(event, 'event')">
                  Save
                </button>
              </div>
            </article>
          </div>

          <form v-if="currentUser" class="form-panel" novalidate @submit.prevent="submitRegistration">
            <h3>Activity registration form</h3>
            <p class="muted">Fields marked with * are required.</p>

            <label>
              <span>Activity *</span>
              <select v-model="registration.eventId" :aria-invalid="Boolean(errors.eventId)">
                <option value="">Choose an activity</option>
                <option v-for="event in events" :key="event.id" :value="event.id">
                  {{ event.title }}
                </option>
              </select>
              <small v-if="errors.eventId" class="error">{{ errors.eventId }}</small>
            </label>

            <label>
              <span>Full name *</span>
              <input
                v-model.trim="registration.name"
                type="text"
                autocomplete="name"
                :aria-invalid="Boolean(errors.name)"
              />
              <small v-if="errors.name" class="error">{{ errors.name }}</small>
            </label>

            <label>
              <span>Email *</span>
              <input
                v-model.trim="registration.email"
                type="email"
                autocomplete="email"
                :aria-invalid="Boolean(errors.email)"
              />
              <small v-if="errors.email" class="error">{{ errors.email }}</small>
            </label>

            <label>
              <span>Phone *</span>
              <input
                v-model.trim="registration.phone"
                type="tel"
                autocomplete="tel"
                placeholder="Example: 0391234567"
                :aria-invalid="Boolean(errors.phone)"
              />
              <small v-if="errors.phone" class="error">{{ errors.phone }}</small>
            </label>

            <label>
              <span>Accessibility or support needs</span>
              <textarea
                v-model.trim="registration.supportNeeds"
                rows="4"
                placeholder="Optional: wheelchair access, large-print notes, phone reminder..."
              ></textarea>
            </label>

            <button class="button primary full" type="submit">Submit registration</button>
            <p v-if="successMessage" class="success" role="status">{{ successMessage }}</p>
          </form>
          <aside v-else class="locked-panel" aria-labelledby="activity-lock-title">
            <h3 id="activity-lock-title">Member access required</h3>
            <p>
              Visitors can browse activities, but registration is available after
              signing in or creating a member account.
            </p>
            <a class="button primary" href="#account">Sign in to register</a>
          </aside>
        </div>
      </section>

      <section id="plan" class="section plan-section" aria-labelledby="plan-title">
        <div class="section-heading">
          <p class="eyebrow">My Plan</p>
          <h2 id="plan-title">Saved services and activities</h2>
          <p>
            This list uses Vue state and Local Storage so saved items remain after a
            page refresh on the same browser.
          </p>
        </div>

        <div v-if="savedPlan.length" class="saved-list">
          <article v-for="item in savedPlan" :key="item.savedId" class="saved-item">
            <div>
              <span class="tag">{{ item.type }}</span>
              <h3>{{ item.name || item.title }}</h3>
              <p>{{ item.summary || item.description }}</p>
            </div>
            <button class="button compact ghost" type="button" @click="removeSavedItem(item.savedId)">
              Remove
            </button>
          </article>
        </div>
        <p v-else class="empty-state">No saved items yet. Save a service or activity to build a simple plan.</p>
      </section>

      <section id="ratings" class="section ratings-section" aria-labelledby="ratings-title">
        <div class="section-heading">
          <p class="eyebrow">Ratings</p>
          <h2 id="ratings-title">Community feedback summary</h2>
          <p>
            Members can rate a specific service or activity. SilverLink calculates
            and displays the average score for each item.
          </p>
        </div>

        <div class="rating-overview">
          <article v-for="summary in ratingSummaries" :key="summary.key" class="rating-overview-card">
            <span class="tag">{{ summary.type }}</span>
            <h3>{{ summary.name }}</h3>
            <strong>{{ summary.average }}</strong>
            <p>{{ summary.count }} ratings submitted</p>
          </article>
        </div>
      </section>

      <section id="advanced" class="section advanced-section" aria-labelledby="advanced-title">
        <div class="section-heading">
          <p class="eyebrow">A3 Advanced Web Application</p>
          <h2 id="advanced-title">Interactive tables, email, serverless and export tools</h2>
          <p>
            These tools cover BR D and E with searchable tables, serverless email
            handling, CSV/PDF-style exports and deployment-ready Netlify functions.
          </p>
        </div>

        <div class="advanced-grid">
          <article class="tool-panel">
            <h3>Service directory table</h3>
            <div class="table-controls" aria-label="Service table controls">
              <label>
                <span>Global search</span>
                <input v-model.trim="serviceTable.search" type="search" placeholder="Search services" />
              </label>
              <label>
                <span>Category filter</span>
                <select v-model="serviceTable.category">
                  <option value="">All categories</option>
                  <option v-for="category in serviceCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </label>
              <label>
                <span>Suburb filter</span>
                <input v-model.trim="serviceTable.suburb" type="search" placeholder="Column search" />
              </label>
            </div>
            <div class="admin-table-wrap interactive-table-wrap">
              <table class="admin-table interactive-table">
                <caption>
                  Services table with sorting, search, column search and pagination
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(serviceTable, 'name')">
                        Service {{ getSortMark(serviceTable, 'name') }}
                      </button>
                    </th>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(serviceTable, 'category')">
                        Category {{ getSortMark(serviceTable, 'category') }}
                      </button>
                    </th>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(serviceTable, 'suburb')">
                        Suburb {{ getSortMark(serviceTable, 'suburb') }}
                      </button>
                    </th>
                    <th scope="col">Cost</th>
                    <th scope="col">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in pagedServiceRows" :key="row.id">
                    <td>{{ row.name }}</td>
                    <td>{{ row.category }}</td>
                    <td>{{ row.suburb }}</td>
                    <td>{{ row.cost }}</td>
                    <td>{{ row.verifiedDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-bar" aria-label="Service table pagination">
              <button class="button compact ghost" type="button" @click="previousPage(serviceTable)" :disabled="serviceTable.page === 1">
                Previous
              </button>
              <span>Page {{ serviceTable.page }} of {{ servicePageCount }}</span>
              <button class="button compact ghost" type="button" @click="nextPage(serviceTable, servicePageCount)" :disabled="serviceTable.page === servicePageCount">
                Next
              </button>
            </div>
          </article>

          <article class="tool-panel">
            <h3>Activity registration table</h3>
            <div class="table-controls" aria-label="Activity table controls">
              <label>
                <span>Global search</span>
                <input v-model.trim="activityTable.search" type="search" placeholder="Search activities" />
              </label>
              <label>
                <span>Category filter</span>
                <select v-model="activityTable.category">
                  <option value="">All categories</option>
                  <option v-for="category in activityCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </label>
              <label>
                <span>Location filter</span>
                <input v-model.trim="activityTable.location" type="search" placeholder="Column search" />
              </label>
            </div>
            <div class="admin-table-wrap interactive-table-wrap">
              <table class="admin-table interactive-table">
                <caption>
                  Activities table with sorting, search, column search and pagination
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(activityTable, 'title')">
                        Activity {{ getSortMark(activityTable, 'title') }}
                      </button>
                    </th>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(activityTable, 'category')">
                        Category {{ getSortMark(activityTable, 'category') }}
                      </button>
                    </th>
                    <th scope="col">
                      <button type="button" class="sort-button" @click="sortTable(activityTable, 'date')">
                        Date {{ getSortMark(activityTable, 'date') }}
                      </button>
                    </th>
                    <th scope="col">Location</th>
                    <th scope="col">Places</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in pagedActivityRows" :key="row.id">
                    <td>{{ row.title }}</td>
                    <td>{{ row.category }}</td>
                    <td>{{ row.date }}</td>
                    <td>{{ row.location }}</td>
                    <td>{{ row.places }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-bar" aria-label="Activity table pagination">
              <button class="button compact ghost" type="button" @click="previousPage(activityTable)" :disabled="activityTable.page === 1">
                Previous
              </button>
              <span>Page {{ activityTable.page }} of {{ activityPageCount }}</span>
              <button class="button compact ghost" type="button" @click="nextPage(activityTable, activityPageCount)" :disabled="activityTable.page === activityPageCount">
                Next
              </button>
            </div>
          </article>
        </div>

        <div class="advanced-grid">
          <form class="tool-panel" novalidate @submit.prevent="sendEmailWithAttachment">
            <h3>Email with attachment</h3>
            <p class="muted">
              Uses a Netlify serverless function. Without an email API key, the function
              validates and returns a safe demo response for recording.
            </p>
            <label>
              <span>Recipient email *</span>
              <input v-model.trim="emailForm.to" type="email" :aria-invalid="Boolean(advancedErrors.emailTo)" />
              <small v-if="advancedErrors.emailTo" class="error">{{ advancedErrors.emailTo }}</small>
            </label>
            <label>
              <span>Subject *</span>
              <input v-model.trim="emailForm.subject" type="text" />
            </label>
            <label>
              <span>Message *</span>
              <textarea v-model.trim="emailForm.message" rows="4"></textarea>
            </label>
            <label>
              <span>Attachment</span>
              <input type="file" @change="handleAttachment" />
            </label>
            <button class="button primary full" type="submit">Send email request</button>
            <p v-if="advancedMessage" class="success" role="status">{{ advancedMessage }}</p>
          </form>

          <article class="tool-panel">
            <h3>Data export and serverless check</h3>
            <p class="muted">
              Export app data to CSV or open a print-ready report for PDF saving.
              The CSV export also has a matching serverless function.
            </p>
            <div class="export-actions">
              <button class="button primary" type="button" @click="exportCsv">Export CSV</button>
              <button class="button secondary" type="button" @click="openPrintableReport">Open PDF report</button>
              <button class="button secondary" type="button" @click="callServerlessExport">Test serverless export</button>
            </div>
            <p class="muted">{{ serverlessStatus }}</p>
          </article>
        </div>
      </section>

      <section id="map" class="section map-section" aria-labelledby="map-title">
        <div class="section-heading">
          <p class="eyebrow">Map And Location</p>
          <h2 id="map-title">Find nearby SilverLink support</h2>
          <p>
            The map supports category filtering, marker selection, user-location
            simulation and distance calculation for real service and activity points.
          </p>
        </div>

        <div class="map-layout">
          <div class="map-panel" aria-label="SilverLink location map">
            <button
              v-for="location in filteredMapLocations"
              :key="location.id"
              class="map-marker"
              type="button"
              :class="{ active: selectedMapLocation?.id === location.id }"
              :style="getMarkerStyle(location)"
              @click="selectMapLocation(location)"
            >
              <span>{{ location.type === 'service' ? 'S' : 'A' }}</span>
            </button>
          </div>
          <aside class="tool-panel map-details">
            <label>
              <span>Search map</span>
              <input v-model.trim="mapSearch" type="search" placeholder="Search name or suburb" />
            </label>
            <label>
              <span>Category</span>
              <select v-model="mapCategory">
                <option value="">All categories</option>
                <option v-for="category in mapCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </label>
            <label>
              <span>Your current area</span>
              <select v-model="userArea">
                <option v-for="area in userAreas" :key="area.name" :value="area.name">
                  {{ area.name }}
                </option>
              </select>
            </label>
            <div v-if="selectedMapLocation" class="selected-location">
              <span class="tag">{{ selectedMapLocation.type }}</span>
              <h3>{{ selectedMapLocation.name }}</h3>
              <p>{{ selectedMapLocation.suburb || selectedMapLocation.location }}</p>
              <strong>{{ selectedDistance }} km from {{ userArea }}</strong>
            </div>
            <div class="nearest-list">
              <h3>Nearest options</h3>
              <ol>
                <li v-for="location in nearestLocations" :key="location.id">
                  {{ location.name }} - {{ getDistanceFromUser(location).toFixed(1) }} km
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section id="innovation" class="section innovation-section" aria-labelledby="innovation-title">
        <div class="section-heading">
          <p class="eyebrow">Innovation Features F.1</p>
          <h2 id="innovation-title">Four UX improvements for SilverLink</h2>
          <p>
            Selected F.1 features: admin dashboard, interactive charts, booking
            calendar, offline support, and a smart recommendation assistant.
          </p>
        </div>

        <div class="innovation-grid">
          <article class="tool-panel">
            <h3>Interactive service chart</h3>
            <div class="bar-chart" aria-label="Service category chart">
              <div v-for="bar in categoryChartData" :key="bar.label" class="bar-row">
                <span>{{ bar.label }}</span>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ width: bar.percent + '%' }"></div>
                </div>
                <strong>{{ bar.count }}</strong>
              </div>
            </div>
          </article>

          <article class="tool-panel">
            <h3>Booking calendar</h3>
            <div class="calendar-grid" aria-label="Activity booking calendar">
              <button
                v-for="event in events"
                :key="event.id"
                class="calendar-event"
                type="button"
                @click="chooseEvent(event.id)"
              >
                <strong>{{ formatDate(event.date) }}</strong>
                <span>{{ event.title }}</span>
              </button>
            </div>
          </article>

          <article class="tool-panel">
            <h3>Offline support</h3>
            <p>
              Status:
              <strong :class="isOnline ? 'online-text' : 'offline-text'">
                {{ isOnline ? 'Online' : 'Offline' }}
              </strong>
            </p>
            <label>
              <span>Offline note draft</span>
              <textarea v-model.trim="offlineDraft" rows="5" placeholder="Saved automatically in this browser"></textarea>
            </label>
          </article>

          <article class="tool-panel">
            <h3>Accessibility controls</h3>
            <label class="toggle-row">
              <input v-model="accessibility.largeText" type="checkbox" />
              <span>Use larger text</span>
            </label>
            <label class="toggle-row">
              <input v-model="accessibility.highContrast" type="checkbox" />
              <span>Use high contrast mode</span>
            </label>
            <p class="muted">
              Supports WCAG-oriented usability with keyboard focus, labelled controls
              and user-controlled visual preferences.
            </p>
          </article>

          <article class="tool-panel">
            <h3>Smart recommendation assistant</h3>
            <label>
              <span>What do you need help with?</span>
              <select v-model="recommendationNeed">
                <option value="transport">Transport to appointments</option>
                <option value="digital">Technology confidence</option>
                <option value="social">Social connection</option>
                <option value="home">Home assistance</option>
              </select>
            </label>
            <div class="recommendation-result">
              <strong>{{ recommendedItem?.name }}</strong>
              <p>{{ recommendedItem?.summary }}</p>
              <button class="button compact" type="button" @click="saveItem(recommendedItem, 'service')">
                Save recommendation
              </button>
            </div>
          </article>
        </div>
      </section>

      <section id="admin" class="section admin-section" aria-labelledby="admin-title">
        <div class="section-heading">
          <p class="eyebrow">Admin Access</p>
          <h2 id="admin-title">Role-protected administration area</h2>
          <p>
            This section demonstrates role-based authorization. Only users with the
            admin role can view management statistics and member records.
          </p>
        </div>

        <div v-if="isAdmin" class="admin-dashboard">
          <article class="metric-card">
            <strong>{{ services.length }}</strong>
            <span>services managed</span>
          </article>
          <article class="metric-card">
            <strong>{{ events.length }}</strong>
            <span>events managed</span>
          </article>
          <article class="metric-card">
            <strong>{{ memberCount }}</strong>
            <span>member accounts</span>
          </article>
          <article class="metric-card">
            <strong>{{ savedPlan.length }}</strong>
            <span>saved plan items</span>
          </article>
          <article class="metric-card">
            <strong>{{ ratings.length }}</strong>
            <span>submitted ratings</span>
          </article>

          <div class="admin-table-wrap">
            <table class="admin-table">
              <caption>
                Registered users
              </caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>{{ user.phone || 'Not provided' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="admin-table-wrap">
            <table class="admin-table">
              <caption>
                Recent ratings
              </caption>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Type</th>
                  <th scope="col">Score</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rating in ratings" :key="rating.id">
                  <td>{{ getTargetName(rating.targetType, rating.targetId) }}</td>
                  <td>{{ rating.targetType }}</td>
                  <td>{{ rating.score }} / 5</td>
                  <td>{{ rating.comment || 'No comment' }}</td>
                </tr>
                <tr v-if="ratings.length === 0">
                  <td colspan="4">No ratings submitted yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="locked-panel">
          <h3>Admin role required</h3>
          <p>
            Sign in with an administrator account to view management tools. Member
            accounts can still save plans and register for activities.
          </p>
          <a class="button primary" href="#account">Go to account access</a>
        </div>
      </section>

      <section id="contact" class="section contact-section" aria-labelledby="contact-title">
        <div>
          <p class="eyebrow">Help And Contact</p>
          <h2 id="contact-title">Prefer to speak to someone?</h2>
          <p>
            SilverLink always keeps a non-digital pathway visible. Users can call,
            print details or ask a family supporter to help compare options.
          </p>
        </div>
        <div class="contact-card">
          <strong>Phone support</strong>
          <a href="tel:0391234000">03 9123 4000</a>
          <span>Monday to Friday, 9:00 AM - 5:00 PM</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { events, serviceCategories, services } from './data/silverlinkData'

const STORAGE_KEY = 'silverlink-saved-plan'
const USERS_KEY = 'silverlink-users'
const SESSION_KEY = 'silverlink-current-user'
const RATINGS_KEY = 'silverlink-ratings'
const OFFLINE_DRAFT_KEY = 'silverlink-offline-draft'
const ACCESSIBILITY_KEY = 'silverlink-accessibility'
const TABLE_PAGE_SIZE = 10
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000
const TRUSTED_ADMIN_EMAILS = ['admin@silverlink.test']
const LOCAL_AUTH_PROVIDER = 'local-demo'
const FIREBASE_AUTH_PROVIDER = 'firebase-auth'

const defaultUsers = [
  {
    id: 'user-admin',
    name: 'SilverLink Admin',
    email: 'admin@silverlink.test',
    passwordHash: '790f48e3ba51e2d0762e7d4a74d4076a62cfb34d44e3dfbc43798fe9ff399602',
    role: 'admin',
    phone: '0391234000',
    preferences: 'High contrast dashboard and clear member records.'
  }
]

const ratingScale = [1, 2, 3, 4, 5]
const selectedCategory = ref('All')
const serviceSearch = ref('')
const savedPlan = ref(loadSavedPlan())
const users = ref(loadUsers())
const ratings = ref(loadRatings())
const currentSession = ref(loadSession())
const successMessage = ref('')
const authMessage = ref('')
const errors = reactive({})
const authErrors = reactive({})
const ratingErrors = reactive({})
const ratingForms = reactive(createRatingForms())

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const externalAuthForm = reactive({
  email: '',
  password: ''
})

const accountForm = reactive({
  name: '',
  phone: '',
  preferences: ''
})

const registration = reactive({
  eventId: '',
  name: '',
  email: '',
  phone: '',
  supportNeeds: ''
})

const serviceTable = reactive({
  search: '',
  category: '',
  suburb: '',
  sortKey: 'name',
  sortDirection: 'asc',
  page: 1
})

const activityTable = reactive({
  search: '',
  category: '',
  location: '',
  sortKey: 'date',
  sortDirection: 'asc',
  page: 1
})

const emailForm = reactive({
  to: '',
  subject: 'SilverLink information pack',
  message: 'Please find the attached SilverLink support information.',
  attachment: null
})

const advancedErrors = reactive({})
const advancedMessage = ref('')
const serverlessStatus = ref('Serverless function not tested yet.')
const mapSearch = ref('')
const mapCategory = ref('')
const userArea = ref('Clayton')
const selectedMapLocation = ref(null)
const isOnline = ref(navigator.onLine)
const offlineDraft = ref(localStorage.getItem(OFFLINE_DRAFT_KEY) || '')
const recommendationNeed = ref('transport')
const accessibility = reactive(loadAccessibility())

const userAreas = [
  { name: 'Clayton', lat: -37.915, lng: 145.13 },
  { name: 'Oakleigh', lat: -37.899, lng: 145.088 },
  { name: 'Dandenong', lat: -37.987, lng: 145.215 },
  { name: 'Glen Waverley', lat: -37.879, lng: 145.164 }
]

const totalListings = computed(() => services.length + events.length)
const currentUser = computed(() => {
  const user = users.value.find((item) => item.id === currentSession.value.userId)

  if (!user || !currentSession.value.claims.verified || currentSession.value.expiresAt <= Date.now()) {
    return null
  }

  return decorateSessionUser(user, currentSession.value.claims)
})
const isAdmin = computed(() => currentUser.value?.role === 'admin' && currentUser.value?.claimsVerified)
const memberCount = computed(() => users.value.filter((user) => user.role === 'member').length)
const ratingSummaries = computed(() => [
  ...services.map((service) => ({
    key: getRatingKey('service', service.id),
    type: 'service',
    name: service.name,
    average: getAverageRating('service', service.id),
    count: getRatingCount('service', service.id)
  })),
  ...events.map((event) => ({
    key: getRatingKey('event', event.id),
    type: 'activity',
    name: event.title,
    average: getAverageRating('event', event.id),
    count: getRatingCount('event', event.id)
  }))
])
const activityCategories = computed(() => [...new Set(events.map((event) => event.category))])
const mapLocations = computed(() => [
  ...services.map((service) => ({ ...service, type: 'service' })),
  ...events.map((event) => ({
    ...event,
    type: 'activity',
    name: event.title,
    suburb: event.location
  }))
])
const mapCategories = computed(() => [...new Set(mapLocations.value.map((location) => location.category))])
const filteredServiceRows = computed(() => {
  const query = serviceTable.search.toLowerCase()
  const suburb = serviceTable.suburb.toLowerCase()
  const rows = services.filter((service) => {
    const globalMatch =
      !query ||
      [service.name, service.category, service.suburb, service.cost, service.summary]
        .join(' ')
        .toLowerCase()
        .includes(query)
    const categoryMatch = !serviceTable.category || service.category === serviceTable.category
    const suburbMatch = !suburb || service.suburb.toLowerCase().includes(suburb)
    return globalMatch && categoryMatch && suburbMatch
  })

  return sortRows(rows, serviceTable.sortKey, serviceTable.sortDirection)
})
const filteredActivityRows = computed(() => {
  const query = activityTable.search.toLowerCase()
  const location = activityTable.location.toLowerCase()
  const rows = events.filter((event) => {
    const globalMatch =
      !query ||
      [event.title, event.category, event.location, event.description]
        .join(' ')
        .toLowerCase()
        .includes(query)
    const categoryMatch = !activityTable.category || event.category === activityTable.category
    const locationMatch = !location || event.location.toLowerCase().includes(location)
    return globalMatch && categoryMatch && locationMatch
  })

  return sortRows(rows, activityTable.sortKey, activityTable.sortDirection)
})
const servicePageCount = computed(() => Math.max(1, Math.ceil(filteredServiceRows.value.length / TABLE_PAGE_SIZE)))
const activityPageCount = computed(() => Math.max(1, Math.ceil(filteredActivityRows.value.length / TABLE_PAGE_SIZE)))
const pagedServiceRows = computed(() => paginateRows(filteredServiceRows.value, serviceTable.page))
const pagedActivityRows = computed(() => paginateRows(filteredActivityRows.value, activityTable.page))
const filteredMapLocations = computed(() => {
  const query = mapSearch.value.toLowerCase()

  return mapLocations.value.filter((location) => {
    const queryMatch =
      !query ||
      [location.name, location.suburb, location.category].join(' ').toLowerCase().includes(query)
    const categoryMatch = !mapCategory.value || location.category === mapCategory.value
    return queryMatch && categoryMatch
  })
})
const currentUserArea = computed(() => userAreas.find((area) => area.name === userArea.value) || userAreas[0])
const selectedDistance = computed(() =>
  selectedMapLocation.value ? getDistanceFromUser(selectedMapLocation.value).toFixed(1) : '0.0'
)
const nearestLocations = computed(() =>
  [...filteredMapLocations.value]
    .sort((a, b) => getDistanceFromUser(a) - getDistanceFromUser(b))
    .slice(0, 4)
)
const categoryChartData = computed(() => {
  const counts = serviceCategories.map((category) => ({
    label: category,
    count: services.filter((service) => service.category === category).length
  }))
  const max = Math.max(...counts.map((item) => item.count), 1)
  return counts.map((item) => ({ ...item, percent: Math.max(8, (item.count / max) * 100) }))
})
const recommendedItem = computed(() => {
  const categoryMap = {
    transport: 'Transport',
    digital: 'Digital Support',
    social: 'Social Connection',
    home: 'Home Help'
  }
  const category = categoryMap[recommendationNeed.value]
  return services.find((service) => service.category === category) || services[0]
})

const filteredServices = computed(() => {
  const query = serviceSearch.value.toLowerCase()

  return services.filter((service) => {
    const categoryMatch =
      selectedCategory.value === 'All' || service.category === selectedCategory.value
    const searchMatch =
      !query ||
      service.name.toLowerCase().includes(query) ||
      service.suburb.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)

    return categoryMatch && searchMatch
  })
})

watch(
  savedPlan,
  (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  { deep: true }
)

watch(
  users,
  (items) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(items))
  },
  { deep: true }
)

watch(
  ratings,
  (items) => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(items))
  },
  { deep: true }
)

watch(
  currentSession,
  (session) => {
    if (session.userId && session.claims.verified && session.expiresAt > Date.now()) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  },
  { deep: true }
)

watch(
  currentUser,
  (user) => {
    if (!user) {
      accountForm.name = ''
      accountForm.phone = ''
      accountForm.preferences = ''
      return
    }

    accountForm.name = user.name
    accountForm.phone = user.phone || ''
    accountForm.preferences = user.preferences || ''
  },
  { immediate: true }
)

watch(
  () => [serviceTable.search, serviceTable.category, serviceTable.suburb],
  () => {
    serviceTable.page = 1
  }
)

watch(
  () => [activityTable.search, activityTable.category, activityTable.location],
  () => {
    activityTable.page = 1
  }
)

watch(offlineDraft, (value) => {
  localStorage.setItem(OFFLINE_DRAFT_KEY, sanitizeText(value))
})

watch(
  accessibility,
  (value) => {
    localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(value))
  },
  { deep: true }
)

onMounted(async () => {
  await migrateLegacyPasswords()
  migrateStoredRatings()
  syncCurrentSession()
  selectedMapLocation.value = filteredMapLocations.value[0] || null
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

function emptySession() {
  return {
    userId: '',
    issuedAt: 0,
    expiresAt: 0,
    sessionProof: '',
    claims: {
      role: 'visitor',
      provider: '',
      issuedAt: 0,
      expiresAt: 0,
      verified: false
    }
  }
}

function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY)

    if (!stored) {
      return emptySession()
    }

    if (!stored.trim().startsWith('{')) {
      localStorage.removeItem(SESSION_KEY)
      return emptySession()
    }

    const parsed = JSON.parse(stored)

    if (!isValidSessionShape(parsed) || parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return emptySession()
    }

    return {
      userId: sanitizeText(parsed.userId),
      issuedAt: Number(parsed.issuedAt),
      expiresAt: Number(parsed.expiresAt),
      sessionProof: sanitizeText(parsed.sessionProof),
      claims: sanitiseClaims(parsed.claims)
    }
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return emptySession()
  }
}

function isValidSessionShape(session) {
  return Boolean(
    session &&
      typeof session.userId === 'string' &&
      Number.isFinite(Number(session.issuedAt)) &&
      Number.isFinite(Number(session.expiresAt)) &&
      typeof session.sessionProof === 'string' &&
      session.sessionProof.length >= 64 &&
      session.claims &&
      session.claims.verified === true &&
      Number(session.expiresAt) > Number(session.issuedAt)
  )
}

function sanitiseClaims(claims = {}) {
  return {
    role: claims.role === 'admin' ? 'admin' : claims.role === 'member' ? 'member' : 'visitor',
    provider: sanitizeText(claims.provider || ''),
    issuedAt: Number(claims.issuedAt || 0),
    expiresAt: Number(claims.expiresAt || 0),
    verified: Boolean(claims.verified)
  }
}

async function createSessionForUser(user, provider, proofSource = '') {
  const issuedAt = Date.now()
  const expiresAt = issuedAt + SESSION_DURATION_MS
  const claims = await resolveVerifiedClaims(user, provider, issuedAt, expiresAt)

  currentSession.value = {
    userId: user.id,
    issuedAt,
    expiresAt,
    sessionProof: await hashPassword(`${user.id}:${provider}:${proofSource}:${issuedAt}`),
    claims
  }
}

async function resolveVerifiedClaims(user, provider, issuedAt, expiresAt) {
  const localTrustedAdmin =
    provider === LOCAL_AUTH_PROVIDER &&
    TRUSTED_ADMIN_EMAILS.includes(user.email) &&
    user.passwordHash === defaultUsers[0].passwordHash
  const firebaseAdminClaim = provider === FIREBASE_AUTH_PROVIDER && user.claims?.role === 'admin'
  const role = localTrustedAdmin || firebaseAdminClaim ? 'admin' : 'member'

  return {
    role,
    provider,
    issuedAt,
    expiresAt,
    verified: true
  }
}

function decorateSessionUser(user, claims) {
  return {
    ...user,
    role: claims.role,
    claimsVerified: claims.verified,
    authProvider: claims.provider,
    authModeLabel: claims.provider === FIREBASE_AUTH_PROVIDER ? 'Firebase verified' : 'Local verified'
  }
}

function clearSession() {
  currentSession.value = emptySession()
}

function loadSavedPlan() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.map(sanitiseSavedItem).filter(Boolean) : []
  } catch {
    return []
  }
}

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    const cleanUsers = Array.isArray(parsed) ? parsed.map(sanitiseUser).filter(Boolean) : []
    const admin = defaultUsers[0]
    const hasAdmin = cleanUsers.some((user) => user.id === admin.id)
    return hasAdmin
      ? cleanUsers.map((user) =>
          user.id === admin.id
            ? { ...admin, ...user, passwordHash: user.passwordHash || admin.passwordHash, role: 'admin' }
            : user
        )
      : [admin, ...cleanUsers]
  } catch {
    return [...defaultUsers]
  }
}

function loadRatings() {
  try {
    const stored = localStorage.getItem(RATINGS_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.map(sanitiseRating).filter(Boolean) : []
  } catch {
    return []
  }
}

function loadAccessibility() {
  try {
    const stored = localStorage.getItem(ACCESSIBILITY_KEY)
    const parsed = stored ? JSON.parse(stored) : {}
    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast)
    }
  } catch {
    return {
      largeText: false,
      highContrast: false
    }
  }
}

function createRatingForms() {
  const forms = {}

  services.forEach((service) => {
    forms[getRatingKey('service', service.id)] = { score: 0, comment: '' }
  })

  events.forEach((event) => {
    forms[getRatingKey('event', event.id)] = { score: 0, comment: '' }
  })

  return forms
}

function sanitiseSavedItem(item) {
  if (!item || typeof item.savedId !== 'string' || typeof item.type !== 'string') {
    return null
  }

  return {
    ...item,
    savedId: sanitizeText(item.savedId),
    type: item.type === 'event' ? 'event' : 'service',
    name: sanitizeText(item.name || ''),
    title: sanitizeText(item.title || ''),
    summary: sanitizeText(item.summary || ''),
    description: sanitizeText(item.description || '')
  }
}

function sanitiseUser(user) {
  if (!user || typeof user.email !== 'string' || typeof user.id !== 'string') {
    return null
  }

  return {
    id: sanitizeText(user.id),
    name: sanitizeText(user.name || 'SilverLink member'),
    email: normaliseEmail(user.email),
    passwordHash: sanitizeText(user.passwordHash || ''),
    password: typeof user.password === 'string' ? user.password : undefined,
    role: user.role === 'admin' ? 'admin' : 'member',
    phone: sanitizeText(user.phone || ''),
    preferences: sanitizeText(user.preferences || '')
  }
}

function sanitiseRating(rating) {
  if (
    !rating ||
    !['service', 'event'].includes(rating.targetType) ||
    typeof rating.targetId !== 'string' ||
    typeof rating.userId !== 'string'
  ) {
    return null
  }

  const score = Number(rating.score)

  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return null
  }

  return {
    id: sanitizeText(rating.id || `rating-${Date.now()}`),
    targetType: rating.targetType,
    targetId: sanitizeText(rating.targetId),
    userId: sanitizeText(rating.userId),
    score,
    comment: sanitizeReviewComment(rating.comment || '').slice(0, 180),
    createdAt: sanitizeText(rating.createdAt || new Date().toISOString())
  }
}

async function migrateLegacyPasswords() {
  let changed = false
  const migrated = []

  for (const user of users.value) {
    if (user.password && !user.passwordHash) {
      migrated.push({
        ...user,
        passwordHash: await hashPassword(user.password),
        password: undefined
      })
      changed = true
    } else if (user.password) {
      migrated.push({ ...user, password: undefined })
      changed = true
    } else {
      migrated.push(user)
    }
  }

  if (changed) {
    users.value = migrated
  }
}

function syncCurrentSession() {
  const expired = currentSession.value.expiresAt <= Date.now()

  if (currentSession.value.userId && (!currentUser.value || expired)) {
    clearSession()
  }
}

function migrateStoredRatings() {
  ratings.value = ratings.value.map((rating) => sanitiseRating(rating)).filter(Boolean)
}

function sortRows(rows, key, direction) {
  return [...rows].sort((a, b) => {
    const left = String(a[key] ?? '').toLowerCase()
    const right = String(b[key] ?? '').toLowerCase()
    const result = left.localeCompare(right, undefined, { numeric: true })
    return direction === 'asc' ? result : -result
  })
}

function paginateRows(rows, page) {
  const start = (page - 1) * TABLE_PAGE_SIZE
  return rows.slice(start, start + TABLE_PAGE_SIZE)
}

function sortTable(table, key) {
  if (table.sortKey === key) {
    table.sortDirection = table.sortDirection === 'asc' ? 'desc' : 'asc'
  } else {
    table.sortKey = key
    table.sortDirection = 'asc'
  }
}

function getSortMark(table, key) {
  if (table.sortKey !== key) {
    return ''
  }

  return table.sortDirection === 'asc' ? 'up' : 'down'
}

function previousPage(table) {
  table.page = Math.max(1, table.page - 1)
}

function nextPage(table, pageCount) {
  table.page = Math.min(pageCount, table.page + 1)
}

async function externalFirebaseLogin() {
  clearAuthErrors()
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const email = normaliseEmail(externalAuthForm.email)

  if (!apiKey) {
    authErrors.externalPassword = 'Firebase API key is not configured in .env.'
    return
  }

  if (!email || !isValidEmail(email)) {
    authErrors.externalEmail = 'Enter a valid Firebase email.'
  }

  if (!externalAuthForm.password || externalAuthForm.password.length < 6) {
    authErrors.externalPassword = 'Firebase password must be at least 6 characters.'
  }

  if (Object.keys(authErrors).length > 0) {
    return
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: externalAuthForm.password,
          returnSecureToken: true
        })
      }
    )
    const result = await response.json()

    if (!response.ok) {
      authErrors.externalPassword = result.error?.message || 'Firebase authentication failed.'
      return
    }

    const tokenClaims = parseJwtPayload(result.idToken)
    const existing = users.value.find((user) => user.email === email)
    const externalUser = existing || {
      id: `firebase-${result.localId}`,
      name: sanitizeText(result.displayName || email.split('@')[0]),
      email,
      passwordHash: '',
      role: 'member',
      phone: '',
      preferences: 'External Firebase account',
      claims: {
        role: tokenClaims.role === 'admin' || tokenClaims.admin === true ? 'admin' : 'member'
      }
    }

    if (!existing) {
      users.value.push(externalUser)
    } else {
      users.value = users.value.map((user) =>
        user.id === existing.id
          ? {
              ...user,
              claims: {
                role: tokenClaims.role === 'admin' || tokenClaims.admin === true ? 'admin' : 'member'
              }
            }
          : user
      )
    }

    const sessionUser = users.value.find((user) => user.email === email) || externalUser
    await createSessionForUser(sessionUser, FIREBASE_AUTH_PROVIDER, result.idToken)
    authMessage.value = 'Signed in with Firebase Authentication.'
    externalAuthForm.email = ''
    externalAuthForm.password = ''
  } catch {
    authErrors.externalPassword = 'Unable to reach Firebase Authentication.'
  }
}

function handleAttachment(event) {
  const file = event.target.files?.[0]
  emailForm.attachment = file || null
}

async function sendEmailWithAttachment() {
  advancedErrors.emailTo = ''

  if (!emailForm.to || !isValidEmail(normaliseEmail(emailForm.to))) {
    advancedErrors.emailTo = 'Enter a valid recipient email.'
    advancedMessage.value = ''
    return
  }

  if (!emailForm.subject || !emailForm.message) {
    advancedMessage.value = 'Subject and message are required.'
    return
  }

  const attachment = emailForm.attachment ? await fileToAttachment(emailForm.attachment) : null
  const payload = {
    to: normaliseEmail(emailForm.to),
    subject: sanitizeText(emailForm.subject),
    message: sanitizeText(emailForm.message),
    attachment
  }

  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    advancedMessage.value = result.ok
      ? `Email function completed using ${result.provider} mode.`
      : result.error || 'Email function failed.'
  } catch {
    advancedMessage.value =
      'Local Vite preview cannot run Netlify Functions. Payload is ready for deployed serverless email.'
  }
}

function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      resolve({
        filename: sanitizeText(file.name),
        contentType: sanitizeText(file.type || 'application/octet-stream'),
        size: file.size,
        contentBase64: result.split(',')[1] || ''
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function exportCsv() {
  const rows = services.map((service) => ({
    name: service.name,
    category: service.category,
    suburb: service.suburb,
    cost: service.cost,
    phone: service.phone,
    averageRating: getAverageRating('service', service.id)
  }))
  downloadCsv('silverlink-services.csv', rows)
}

async function callServerlessExport() {
  try {
    const response = await fetch('/.netlify/functions/export-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        columns: ['name', 'category', 'suburb', 'cost'],
        rows: services
      })
    })
    serverlessStatus.value = response.ok
      ? 'Serverless export function responded successfully.'
      : 'Serverless export is protected; configure the admin export token in deployment.'
  } catch {
    serverlessStatus.value =
      'Local Vite preview cannot run Netlify Functions; deploy with Netlify to test serverless export.'
  }
}

function downloadCsv(filename, rows) {
  const columns = Object.keys(rows[0] || {})
  const csv = [
    columns.join(','),
    ...rows.map((row) =>
      columns.map((column) => `"${String(row[column] ?? '').replaceAll('"', '""')}"`).join(',')
    )
  ].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function openPrintableReport() {
  const html = `
    <html>
      <head>
        <title>SilverLink My Plan Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #1f2a2e; }
          h1 { color: #174a37; }
          li { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>SilverLink My Plan Report</h1>
        <p>Generated from the SilverLink advanced web application.</p>
        <h2>Saved items</h2>
        <ul>
          ${savedPlan.value
            .map((item) => `<li><strong>${sanitizeText(item.name || item.title)}</strong> - ${sanitizeText(item.summary || item.description)}</li>`)
            .join('') || '<li>No saved items yet.</li>'}
        </ul>
        <h2>Ratings</h2>
        <ul>
          ${ratingSummaries.value
            .map((item) => `<li>${sanitizeText(item.name)}: ${sanitizeText(item.average)}</li>`)
            .join('')}
        </ul>
      </body>
    </html>
  `
  const report = window.open('', '_blank')
  if (report) {
    report.document.write(html)
    report.document.close()
    report.focus()
    report.print()
  }
}

function selectMapLocation(location) {
  selectedMapLocation.value = location
}

function getMarkerStyle(location) {
  const bounds = {
    minLat: -38.0,
    maxLat: -37.86,
    minLng: 145.07,
    maxLng: 145.23
  }
  const left = ((location.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100
  const top = ((bounds.maxLat - location.lat) / (bounds.maxLat - bounds.minLat)) * 100
  return {
    left: `${Math.min(94, Math.max(4, left))}%`,
    top: `${Math.min(90, Math.max(8, top))}%`
  }
}

function getDistanceFromUser(location) {
  const origin = currentUserArea.value
  return haversineDistance(origin.lat, origin.lng, location.lat, location.lng)
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const radius = 6371
  const toRadians = (value) => (value * Math.PI) / 180
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function updateOnlineStatus() {
  isOnline.value = navigator.onLine
}

function chooseEvent(eventId) {
  registration.eventId = eventId
}

function saveItem(item, type) {
  if (!currentUser.value) {
    authMessage.value = 'Please sign in before saving items to My Plan.'
    document.getElementById('account')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  const savedId = `${type}-${item.id}`
  const alreadySaved = savedPlan.value.some((saved) => saved.savedId === savedId)

  if (!alreadySaved) {
    savedPlan.value.push({ ...item, type, savedId })
    authMessage.value = `${item.name || item.title} has been saved to My Plan.`
  }
}

function removeSavedItem(savedId) {
  savedPlan.value = savedPlan.value.filter((item) => item.savedId !== savedId)
}

function submitRegistration() {
  clearErrors()

  if (!currentUser.value) {
    successMessage.value = ''
    authMessage.value = 'Please sign in before registering for an activity.'
    document.getElementById('account')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  if (!registration.eventId) {
    errors.eventId = 'Please choose an activity.'
  }

  if (!registration.name) {
    errors.name = 'Full name is required.'
  }

  if (!registration.email) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!registration.phone) {
    errors.phone = 'Phone number is required.'
  } else if (!/^[0-9 +()-]{8,16}$/.test(registration.phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (Object.keys(errors).length > 0) {
    successMessage.value = ''
    return
  }

  const selectedEvent = events.find((event) => event.id === registration.eventId)
  successMessage.value = `Thanks ${sanitizeText(registration.name)}. Your interest in ${sanitizeText(selectedEvent.title)} has been recorded.`

  registration.eventId = ''
  registration.name = ''
  registration.email = ''
  registration.phone = ''
  registration.supportNeeds = ''
}

async function login() {
  clearAuthErrors()
  const email = normaliseEmail(loginForm.email)

  if (!email) {
    authErrors.loginEmail = 'Email is required.'
  } else if (!isValidEmail(email)) {
    authErrors.loginEmail = 'Enter a valid email address.'
  }

  if (!loginForm.password) {
    authErrors.loginPassword = 'Password is required.'
  }

  if (Object.keys(authErrors).length > 0) {
    authMessage.value = ''
    return
  }

  const enteredHash = await hashPassword(loginForm.password)
  const user = users.value.find((item) => {
    const hashMatches = item.passwordHash === enteredHash
    const legacyMatches = item.password === loginForm.password
    return item.email === email && (hashMatches || legacyMatches)
  })

  if (!user) {
    authErrors.loginPassword = 'Email or password is incorrect.'
    authMessage.value = ''
    return
  }

  if (user.password) {
    users.value = users.value.map((item) =>
      item.id === user.id ? { ...item, passwordHash: enteredHash, password: undefined } : item
    )
  }

  await createSessionForUser(user, LOCAL_AUTH_PROVIDER, enteredHash)
  loginForm.email = ''
  loginForm.password = ''
  authMessage.value = `Welcome back, ${user.name}.`
}

async function registerUser() {
  clearAuthErrors()
  const email = normaliseEmail(registerForm.email)

  if (!registerForm.name) {
    authErrors.registerName = 'Full name is required.'
  }

  if (!email) {
    authErrors.registerEmail = 'Email is required.'
  } else if (!isValidEmail(email)) {
    authErrors.registerEmail = 'Enter a valid email address.'
  } else if (users.value.some((user) => user.email === email)) {
    authErrors.registerEmail = 'An account already uses this email.'
  }

  if (!registerForm.password) {
    authErrors.registerPassword = 'Password is required.'
  } else if (registerForm.password.length < 8) {
    authErrors.registerPassword = 'Password must be at least 8 characters.'
  }

  if (!registerForm.confirmPassword) {
    authErrors.confirmPassword = 'Please confirm your password.'
  } else if (registerForm.password !== registerForm.confirmPassword) {
    authErrors.confirmPassword = 'Passwords do not match.'
  }

  if (Object.keys(authErrors).length > 0) {
    authMessage.value = ''
    return
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: sanitizeText(registerForm.name),
    email,
    passwordHash: await hashPassword(registerForm.password),
    role: 'member',
    phone: '',
    preferences: ''
  }

  users.value.push(newUser)
  await createSessionForUser(newUser, LOCAL_AUTH_PROVIDER, newUser.passwordHash)
  registerForm.name = ''
  registerForm.email = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  authMessage.value = 'Your member account has been created.'
}

function submitRating(item, type) {
  if (!currentUser.value) {
    authMessage.value = 'Please sign in before submitting a rating.'
    document.getElementById('account')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  const key = getRatingKey(type, item.id)
  clearRatingError(key)
  const form = ratingForms[key]

  if (!form || !Number.isInteger(form.score) || form.score < 1 || form.score > 5) {
    ratingErrors[key] = 'Choose a rating from 1 to 5.'
    return
  }

  const cleanComment = sanitizeReviewComment(form.comment || '').slice(0, 180)
  const existingIndex = ratings.value.findIndex(
    (rating) =>
      rating.targetType === type &&
      rating.targetId === item.id &&
      rating.userId === currentUser.value.id
  )
  const nextRating = {
    id:
      existingIndex >= 0
        ? ratings.value[existingIndex].id
        : `rating-${type}-${item.id}-${currentUser.value.id}`,
    targetType: type,
    targetId: item.id,
    userId: currentUser.value.id,
    score: form.score,
    comment: cleanComment,
    createdAt: new Date().toISOString()
  }

  if (existingIndex >= 0) {
    ratings.value = ratings.value.map((rating, index) =>
      index === existingIndex ? nextRating : rating
    )
  } else {
    ratings.value.push(nextRating)
  }

  form.score = 0
  form.comment = ''
  authMessage.value = `Your rating for ${sanitizeText(item.name || item.title)} has been saved.`
}

function getRatingKey(type, id) {
  return `${type}-${id}`
}

function getRatingsForTarget(type, id) {
  return ratings.value.filter((rating) => rating.targetType === type && rating.targetId === id)
}

function getRatingCount(type, id) {
  return getRatingsForTarget(type, id).length
}

function getAverageRating(type, id) {
  const targetRatings = getRatingsForTarget(type, id)

  if (targetRatings.length === 0) {
    return 'No rating'
  }

  const total = targetRatings.reduce((sum, rating) => sum + rating.score, 0)
  return `${(total / targetRatings.length).toFixed(1)} / 5`
}

function getTargetName(type, id) {
  if (type === 'service') {
    return services.find((service) => service.id === id)?.name || 'Unknown service'
  }

  return events.find((event) => event.id === id)?.title || 'Unknown activity'
}

function updateAccount() {
  clearAuthErrors()

  if (!currentUser.value) {
    authMessage.value = 'Please sign in before updating account details.'
    return
  }

  if (!accountForm.name) {
    authErrors.accountName = 'Display name is required.'
    authMessage.value = ''
    return
  }

  users.value = users.value.map((user) =>
    user.id === currentUser.value.id
      ? {
          ...user,
          name: sanitizeText(accountForm.name),
          phone: sanitizeText(accountForm.phone),
          preferences: sanitizeText(accountForm.preferences)
        }
      : user
  )
  authMessage.value = 'Account details updated.'
}

function logout() {
  clearSession()
  successMessage.value = ''
  authMessage.value = 'You have been logged out.'
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

function clearAuthErrors() {
  Object.keys(authErrors).forEach((key) => {
    delete authErrors[key]
  })
}

function clearRatingError(key) {
  if (ratingErrors[key]) {
    delete ratingErrors[key]
  }
}

function sanitizeText(value) {
  return String(value)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/[<>]/g, '')
    .trim()
}

function sanitizeReviewComment(value) {
  return sanitizeText(value)
    .replace(/\/?script/gi, '')
    .replace(/\balert\s*\([^)]*\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normaliseEmail(value) {
  return value.trim().toLowerCase()
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parseJwtPayload(token = '') {
  try {
    const [, payload] = token.split('.')

    if (!payload) {
      return {}
    }

    const normalised = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(normalised.padEnd(Math.ceil(normalised.length / 4) * 4, '='))
    return JSON.parse(decoded)
  } catch {
    return {}
  }
}

async function hashPassword(value) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}
</script>
