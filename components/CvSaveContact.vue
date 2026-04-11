<template>
  <ClientOnly>
    <button
      class="w-11 h-11 rounded-full bg-surface border border-gray-700 hover:border-accent/60 flex items-center justify-center shadow-lg shadow-black/40 transition-colors duration-200 hover:bg-gray-800 group"
      @click="saveContact"
      aria-label="Save contact"
      title="Save contact"
    >
      <svg class="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 10v6m-3-3h6" />
      </svg>
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Basics } from '~/composables/useCv'

const props = defineProps<{ basics: Basics }>()

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

const saveContact = async () => {
  const vcard = buildVCard(props.basics)
  const filename = `${props.basics.name.replace(/\s+/g, '_')}.vcf`
  const blob = new Blob([vcard], { type: 'text/vcard' })
  const file = new File([blob], filename, { type: 'text/vcard' })

  // Try Web Share API with file (mobile)
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: props.basics.name })
      return
    }
  } catch (err: any) {
    // AbortError = user cancelled share sheet, ignore silently
    if (err?.name === 'AbortError') return
    // Any other error falls through to download
  }

  // Fallback: trigger .vcf download
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
</script>
