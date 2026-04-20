'use client'

import { useTheme } from './ThemeProvider'

export default function DarkModeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="dark-mode-btn">
      {theme === 'dark'
        ? <i className="fas fa-sun" style={{ color: '#f59e0b' }} />
        : <i className="fas fa-moon" style={{ color: '#3b82f6' }} />}
    </button>
  )
}
