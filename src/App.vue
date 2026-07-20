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
          <a href="#contact">Contact</a>
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

          <form class="form-panel" novalidate @submit.prevent="submitRegistration">
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

const selectedCategory = ref('All')
const serviceSearch = ref('')
const savedPlan = ref(loadSavedPlan())
const successMessage = ref('')
const errors = reactive({})

const registration = reactive({
  eventId: '',
  name: '',
  email: '',
  phone: '',
  supportNeeds: ''
})

const totalListings = computed(() => services.length + events.length)

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

function loadSavedPlan() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function chooseEvent(eventId) {
  registration.eventId = eventId
}

function saveItem(item, type) {
  const savedId = `${type}-${item.id}`
  const alreadySaved = savedPlan.value.some((saved) => saved.savedId === savedId)

  if (!alreadySaved) {
    savedPlan.value.push({ ...item, type, savedId })
  }
}

function removeSavedItem(savedId) {
  savedPlan.value = savedPlan.value.filter((item) => item.savedId !== savedId)
}

function submitRegistration() {
  clearErrors()

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

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

function sanitizeText(value) {
  return value.replace(/[<>]/g, '')
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}
</script>
