<template>
  <section id="experience">
    <h2 class="section-heading">Experience</h2>

    <div class="flex flex-col gap-4">
      <article v-for="job in experience" :key="`${job.company}-${job.startDate}`" class="card group">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <h3 class="font-semibold text-white text-lg leading-tight">{{ job.role }}</h3>
            <p class="text-accent text-sm font-medium mt-0.5">
              {{ job.company }}
              <span class="text-gray-500 font-normal"> · {{ job.location }}</span>
            </p>
          </div>
          <span class="text-xs text-gray-500 whitespace-nowrap mt-1 sm:mt-0.5 font-mono">
            {{ formatDateRange(job.startDate, job.endDate, job.current) }}
          </span>
        </div>

        <p class="text-gray-400 text-sm leading-relaxed">{{ job.description }}</p>

        <ul v-if="job.highlights?.length" class="mt-3 flex flex-col gap-1.5">
          <li
            v-for="h in job.highlights"
            :key="h"
            class="text-sm text-gray-400 flex items-start gap-2"
          >
            <span class="text-accent mt-1 shrink-0">▸</span>
            {{ h }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Experience } from '~/composables/useCv'
import { formatDateRange } from '~/composables/useCv'
defineProps<{ experience: Experience[] }>()
</script>
