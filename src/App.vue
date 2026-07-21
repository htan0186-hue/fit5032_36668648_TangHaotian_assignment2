<template>
  <div class="app-shell">
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
            SilverLink now includes the first half of Category C: local account
            registration, login, profile management and role-based access.
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
        </div>

        <div v-else class="account-dashboard">
          <article class="profile-summary">
            <span class="tag">{{ currentUser.role }}</span>
            <h3>Welcome, {{ currentUser.name }}</h3>
            <p>{{ currentUser.email }}</p>
            <p class="muted">
              Your account controls access to saved plans, activity registration and
              role-specific tools.
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
import { computed, reactive, ref, watch } from 'vue'
import { events, serviceCategories, services } from './data/silverlinkData'

const STORAGE_KEY = 'silverlink-saved-plan'
const USERS_KEY = 'silverlink-users'
const SESSION_KEY = 'silverlink-current-user'

const defaultUsers = [
  {
    id: 'user-admin',
    name: 'SilverLink Admin',
    email: 'admin@silverlink.test',
    password: 'AdminPass123',
    role: 'admin',
    phone: '0391234000',
    preferences: 'High contrast dashboard and clear member records.'
  }
]

const selectedCategory = ref('All')
const serviceSearch = ref('')
const savedPlan = ref(loadSavedPlan())
const users = ref(loadUsers())
const currentUserId = ref(localStorage.getItem(SESSION_KEY) || '')
const successMessage = ref('')
const authMessage = ref('')
const errors = reactive({})
const authErrors = reactive({})

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

const totalListings = computed(() => services.length + events.length)
const currentUser = computed(() => users.value.find((user) => user.id === currentUserId.value))
const isAdmin = computed(() => currentUser.value?.role === 'admin')
const memberCount = computed(() => users.value.filter((user) => user.role === 'member').length)

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

watch(currentUserId, (userId) => {
  if (userId) {
    localStorage.setItem(SESSION_KEY, userId)
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
})

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

function loadSavedPlan() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    const hasAdmin = parsed.some((user) => user.role === 'admin')
    return hasAdmin ? parsed : [...defaultUsers, ...parsed]
  } catch {
    return [...defaultUsers]
  }
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
  successMessage.value = `Thanks ${sanitizeText(registration.name)}. Your interest in ${selectedEvent.title} has been recorded.`

  registration.eventId = ''
  registration.name = ''
  registration.email = ''
  registration.phone = ''
  registration.supportNeeds = ''
}

function login() {
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

  const user = users.value.find(
    (item) => item.email === email && item.password === loginForm.password
  )

  if (!user) {
    authErrors.loginPassword = 'Email or password is incorrect.'
    authMessage.value = ''
    return
  }

  currentUserId.value = user.id
  loginForm.email = ''
  loginForm.password = ''
  authMessage.value = `Welcome back, ${user.name}.`
}

function registerUser() {
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
    password: registerForm.password,
    role: 'member',
    phone: '',
    preferences: ''
  }

  users.value.push(newUser)
  currentUserId.value = newUser.id
  registerForm.name = ''
  registerForm.email = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  authMessage.value = 'Your member account has been created.'
}

function updateAccount() {
  clearAuthErrors()

  if (!accountForm.name) {
    authErrors.accountName = 'Display name is required.'
    authMessage.value = ''
    return
  }

  users.value = users.value.map((user) =>
    user.id === currentUserId.value
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
  currentUserId.value = ''
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

function sanitizeText(value) {
  return value.replace(/[<>]/g, '')
}

function normaliseEmail(value) {
  return value.trim().toLowerCase()
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}
</script>
