export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    // Tell the SSR renderer this directive has no server-side output
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      el.classList.add('reveal')
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.08 }
      )
      observer.observe(el)
    },
  })
})
