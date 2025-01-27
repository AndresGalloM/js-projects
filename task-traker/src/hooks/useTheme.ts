import { useEffect, useState } from 'react'

const mediaScheme = window.matchMedia('(prefers-color-scheme: dark)')

export const useTheme = () => {
  const [ theme, setTheme ] = useState(() => {
    const userPrefersDark = mediaScheme.matches
    const theme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light')
    return theme
  })

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const changePreferMedia = () => {
    setTheme(mediaScheme.matches ? 'dark' : 'light')
  }

  useEffect(() => {
    mediaScheme.addEventListener('change', changePreferMedia)

    return () => {
      mediaScheme.removeEventListener('change', changePreferMedia)
    }
  }, [])

  localStorage.setItem('theme', theme)
  document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark')

  return { theme, changeTheme }
}