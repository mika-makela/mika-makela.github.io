<template>
  <section id="certifications">
    <h2 class="section-heading">Certifications</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <article v-for="cert in certifications" :key="cert.credentialId" class="card flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-semibold text-white leading-snug">{{ cert.name }}</h3>
            <p class="text-accent text-sm font-medium mt-0.5">{{ cert.issuer }}</p>
          </div>
          <a
            :href="cert.credentialUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0 text-xs text-gray-500 hover:text-accent transition-colors border border-gray-700 hover:border-accent/50 rounded-lg px-2 py-1"
          >
            Verify ↗
          </a>
        </div>

        <div class="flex flex-wrap gap-3 text-xs text-gray-500 mt-1 font-mono">
          <span>Issued {{ formatMonth(cert.issued) }}</span>
          <span v-if="cert.expires" :class="isExpiringSoon(cert.expires) ? 'text-amber-400' : ''">
            Expires {{ formatMonth(cert.expires) }}
          </span>
          <span v-else class="text-accent">No expiry</span>
        </div>

        <p class="text-xs text-gray-600 font-mono">ID: {{ cert.credentialId }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Certification } from '~/composables/useCv'
defineProps<{ certifications: Certification[] }>()

const formatMonth = (d: string) => {
  const [year, month] = d.split('-')
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-GB', {
    month: 'short', year: 'numeric',
  })
}

const isExpiringSoon = (expires: string) => {
  const exp = new Date(expires)
  const months = (exp.getFullYear() - new Date().getFullYear()) * 12 + exp.getMonth() - new Date().getMonth()
  return months <= 3
}
</script>
