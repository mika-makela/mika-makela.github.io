<template>
  <ClientOnly>
    <div
      class="group hidden sm:flex flex-col items-end gap-2"
      role="complementary"
      aria-label="Contact QR code"
    >
      <!-- Expanded QR panel — visible on hover -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div
          v-if="hovered && qrDataUrl"
          class="bg-surface border border-gray-700 rounded-xl p-3 shadow-xl shadow-black/50 flex flex-col items-center gap-2"
        >
          <div class="bg-white rounded-lg p-2">
            <img :src="qrDataUrl" alt="Scan to save contact" class="block w-36 h-36" />
          </div>
          <p class="text-xs text-gray-500">Scan to save contact</p>
        </div>
      </Transition>

      <!-- Trigger button -->
      <button
        class="w-11 h-11 rounded-full bg-surface border border-gray-700 hover:border-accent/60 flex items-center justify-center shadow-lg shadow-black/40 transition-colors duration-200 hover:bg-gray-800"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @click="hovered = !hovered"
        aria-label="Show QR code"
      >
        <svg class="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2" />
          <rect x="14" y="14" width="3" height="3" rx="0.5" stroke-width="2" />
          <rect x="19" y="14" width="2" height="2" rx="0.5" stroke-width="2" fill="currentColor" stroke="none" />
          <rect x="19" y="19" width="2" height="2" rx="0.5" stroke-width="2" fill="currentColor" stroke="none" />
          <rect x="14" y="19" width="3" height="2" rx="0.5" stroke-width="2" />
        </svg>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import type { Basics } from '~/composables/useCv'

const props = defineProps<{ basics: Basics }>()
const qrDataUrl = ref('')
const hovered = ref(false)

const buildVCard = (basics: Basics): string => {
  const email = atob(basics.email)
  const phone = atob(basics.phone)
  const parts = basics.name.split(' ')
  const last = parts.at(-1) ?? ''
  const first = parts.slice(0, -1).join(' ')
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last};${first};;;`,
    `FN:${basics.name}`,
    `EMAIL:${email}`,
    `TEL:${phone}`,
    `URL:${basics.website}`,
    `ADR:;;${basics.location};;;;`,
    'END:VCARD',
  ].join('\n')
}

onMounted(async () => {
  if (!props.basics?.email) return
  qrDataUrl.value = await QRCode.toDataURL(buildVCard(props.basics), {
    width: 160,
    margin: 1,
    color: { dark: '#0d1117', light: '#ffffff' },
  })
})
</script>
