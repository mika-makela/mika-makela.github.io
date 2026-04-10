<template>
  <section id="skills">
    <h2 class="section-heading">Skills</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="group in skills" :key="group.category" class="card">
        <h3 class="text-sm font-semibold text-gray-300 mb-3">{{ group.category }}</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="item in group.items" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SkillGroup } from '~/composables/useCv'
defineProps<{ skills: SkillGroup[] }>()
</script>
