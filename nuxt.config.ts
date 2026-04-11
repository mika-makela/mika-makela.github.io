export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    head: {
      title: 'Mika Mäkelä — CV',
      meta: [
        { name: 'description', content: 'CV of Mika Mäkelä — Senior Full-Stack Engineer' },
        { name: 'theme-color', content: '#0d1117' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/llms.txt', '/sitemap.xml', '/api/cv'],
    },
  },

  compatibilityDate: '2024-04-03',
})
