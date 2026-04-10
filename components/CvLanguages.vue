<template>
  <section id="languages">
    <h2 class="section-heading">Languages</h2>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="lang in languages"
        :key="lang.language"
        class="card flex items-center gap-3 py-3 px-4"
      >
        <span class="text-white font-medium">{{ lang.language }}</span>
        <span class="text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
          {{ lang.proficiency }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Language } from '~/composables/useCv'
defineProps<{ languages: Language[] }>()
</script>
