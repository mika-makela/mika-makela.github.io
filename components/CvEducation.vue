<template>
  <section id="education">
    <h2 class="section-heading">Education</h2>

    <div class="flex flex-col gap-4">
      <article v-for="edu in education" :key="`${edu.institution}-${edu.startDate}`" class="card">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div>
            <h3 class="font-semibold text-white">{{ edu.degree }} in {{ edu.field }}</h3>
            <p class="text-accent text-sm font-medium mt-0.5">{{ edu.institution }}</p>
          </div>
          <span class="text-xs text-gray-500 whitespace-nowrap mt-1 sm:mt-0.5 font-mono">
            {{ formatYear(edu.startDate) }} — {{ formatYear(edu.endDate) }}
          </span>
        </div>

        <div class="flex flex-wrap gap-3 mt-3 text-sm text-gray-400">
          <span v-if="edu.grade" class="flex items-center gap-1.5">
            <span class="text-accent">✦</span> {{ edu.grade }}
          </span>
          <span v-if="edu.notes">{{ edu.notes }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Education } from '~/composables/useCv'
defineProps<{ education: Education[] }>()

const formatYear = (d: string) => d?.split('-')[0] ?? ''
</script>
