export const useTheme = () => {
  const isDark = useState('isDark', () => true)

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle('light', !dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    isDark.value = dark
  }

  const toggle = () => apply(!isDark.value)

  onMounted(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    apply(dark)
  })

  return { isDark, toggle }
}
