<template>
  <main class="min-h-screen bg-gray-950">
    <!-- Nav -->
    <nav class="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 no-print">
      <div class="max-w-3xl mx-auto px-5 h-12 flex items-center justify-end gap-2">
        <!-- Desktop links -->
        <div class="hidden sm:flex gap-5 text-xs font-medium text-gray-400">
          <a v-for="section in sections" :key="section.id" :href="`#${section.id}`"
            class="hover:text-accent transition-colors capitalize">
            {{ section.label }}
          </a>
        </div>

        <div class="flex items-center gap-1">
          <!-- Print button -->
          <button
            @click="print"
            class="hidden sm:flex w-8 h-8 items-center justify-center text-gray-400 hover:text-accent transition-colors"
            aria-label="Print / Save as PDF"
            title="Print / Save as PDF"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>

          <!-- Theme toggle -->
          <ThemeToggle />

          <!-- Hamburger (mobile only) -->
          <button
            class="sm:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
            @click="menuOpen = !menuOpen"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
          >
            <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile dropdown -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="menuOpen" class="sm:hidden border-t border-gray-800/60 bg-gray-950/95">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="block px-5 py-3 text-sm text-gray-400 hover:text-accent hover:bg-gray-800/40 transition-colors capitalize border-b border-gray-800/40 last:border-0"
            @click="menuOpen = false"
          >
            {{ section.label }}
          </a>
        </div>
      </Transition>
    </nav>

    <!-- Loading -->
    <div v-if="pending" class="max-w-3xl mx-auto px-5 py-24 flex flex-col items-center gap-4 text-gray-500">
      <svg class="w-6 h-6 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span class="text-sm">Loading CV…</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="max-w-3xl mx-auto px-5 py-24 text-center text-gray-500">
      <p class="text-sm">Could not load CV data. Please try again later.</p>
    </div>

    <!-- Content -->
    <div v-else-if="cv" class="max-w-3xl mx-auto px-5 py-12 flex flex-col gap-14">

      <div v-reveal>
        <CvHeader :basics="cv.basics" />
      </div>

      <section id="about" v-reveal>
        <h2 class="section-heading">About</h2>
        <p class="text-gray-300 leading-relaxed">{{ cv.basics.summary }}</p>
      </section>

      <div v-reveal><CvExperience :experience="cv.experience" /></div>
      <div v-reveal><CvCertifications :certifications="cv.certifications" /></div>
      <div v-reveal><CvProjects :projects="cv.projects" /></div>
      <div v-reveal><CvEducation :education="cv.education" /></div>
      <div v-reveal><CvLanguages :languages="cv.languages" /></div>
      <div v-reveal><CvSkills :skills="cv.skills" /></div>

      <!-- Footer -->
      <footer class="border-t border-gray-800 pt-8 flex flex-col items-center gap-2 text-xs text-gray-600">
        <span>
          Last updated {{ cv.meta.lastUpdated }} ·
          <a href="https://github.com/mika-makela/mika-makela.github.io" target="_blank" class="hover:text-accent transition-colors">Source on GitHub</a>
        </span>
        <span>
          Built by
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">Claude Sonnet 4.6</a>
          using
          <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">Nuxt 3</a>,
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">Vue 3</a>,
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">Tailwind CSS</a>
          &amp; deployed via
          <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">GitHub Pages</a>
        </span>
      </footer>
    </div>

    <!-- Floating widgets (no-print) -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 no-print">
      <CvQrCode v-if="cv" :basics="cv.basics" />

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <button
          v-if="showTop"
          @click="scrollToTop"
          class="w-11 h-11 rounded-full bg-surface border border-gray-700 hover:border-accent/60 hover:bg-gray-800 flex items-center justify-center shadow-lg shadow-black/40 transition-colors duration-200"
          aria-label="Back to top"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCv } from '~/composables/useCv'

const { data: cv, pending, error } = await useCv()

const menuOpen = ref(false)
const showTop = ref(false)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const print = () => window.print()

onMounted(() => {
  window.addEventListener('scroll', () => {
    showTop.value = window.scrollY > 300
  })
})

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
  { id: 'skills', label: 'Skills' },
]

const SITE_URL = 'https://mika-makela.github.io'
const decodeB64 = (b64: string) => { try { return atob(b64) } catch { return '' } }
const title = cv.value ? `${cv.value.basics.name} — ${cv.value.basics.headline}` : 'CV'
const description = cv.value?.basics.summary ?? ''
const avatar = cv.value?.basics.avatar ?? ''

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: SITE_URL },
    { property: 'og:image', content: avatar },
    { property: 'profile:first_name', content: 'Mika' },
    { property: 'profile:last_name', content: 'Mäkelä' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: avatar },
  ],
  link: [
    { rel: 'canonical', href: SITE_URL },
  ],
  script: cv.value ? [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: cv.value.basics.name,
      jobTitle: cv.value.basics.headline,
      url: SITE_URL,
      image: avatar,
      email: decodeB64(cv.value.basics.email),
      telephone: decodeB64(cv.value.basics.phone),
      description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cv.value.basics.location.split(',')[0].trim(),
        addressCountry: 'FI',
      },
      sameAs: cv.value.basics.social.map(s => s.url),
      knowsAbout: cv.value.skills.flatMap(g => g.items),
      knowsLanguage: cv.value.languages.map(l => l.language),
      alumniOf: cv.value.education.map(e => ({
        '@type': 'EducationalOrganization',
        name: e.institution,
      })),
      hasCredential: cv.value.certifications.map(c => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: c.issuer,
      })),
      worksFor: cv.value.experience.find(e => e.current)
        ? { '@type': 'Organization', name: cv.value.experience.find(e => e.current)!.company }
        : undefined,
    }),
  }] : [],
})
</script>
